/**
 * Estimates the sea route distance between two points on the earth.
 * It calculates the great-circle (straight-line) distance and then applies a heuristic
 * multiplier to account for the fact that sea routes are not straight lines and must
 * navigate around landmasses. This provides a more realistic estimate than a direct line.
 *
 * @param lat1 Latitude of the first point.
 * @param lon1 Longitude of the first point.
 * @param lat2 Latitude of the second point.
 * @param lon2 Longitude of the second point.
 * @returns The estimated sea route distance in nautical miles.
 */
export const getDistanceInNauticalMiles = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const rLat1 = toRad(lat1);
  const rLat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;

  // Convert kilometers to nautical miles
  const directDistanceNm = distanceKm * 0.539957;

  // Apply a heuristic multiplier to approximate the actual sea route distance.
  // Real sea routes are longer than straight lines due to coastlines, canals, etc.
  // A multiplier of 1.2 (20% longer) is a common industry approximation.
  const SEA_ROUTE_MULTIPLIER = 1.2;
  const estimatedSeaDistanceNm = directDistanceNm * SEA_ROUTE_MULTIPLIER;

  return estimatedSeaDistanceNm;
};