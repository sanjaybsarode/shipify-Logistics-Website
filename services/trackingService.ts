
import { VesselData } from '../types';

// Expanded mock data with more details for the Vessel Profile page.
const MOCK_DATA: VesselData[] = [
    {
      imo: '9495237', name: 'Maersk Honam', flag: 'Singapore', type: 'Container Ship', callsign: 'S6CI5', length: 353, breadth: 54, grossTonnage: 153153, deadweight: 162100, yearBuilt: 2017, photoUrl: 'https://photos.marinetraffic.com/ais/showphoto.aspx?shipid=4991376',
      lat: 4.28, lon: 105.7, speed: 18.5, course: 45, status: 'Underway using engine', destination: 'SUEZ CANAL', eta: '2024-08-15T12:00:00Z', lastReport: '2024-07-29T10:05:00Z'
    },
    {
      imo: '9784271', name: 'Maersk Mc-Kinney Moller', flag: 'Denmark', type: 'Container Ship', callsign: 'OWJE2', length: 399, breadth: 59, grossTonnage: 194849, deadweight: 194153, yearBuilt: 2013, photoUrl: 'https://photos.marinetraffic.com/ais/showphoto.aspx?shipid=911135',
      lat: 34.5, lon: -15.2, speed: 20.1, course: 270, status: 'Underway using engine', destination: 'ROTTERDAM', eta: '2024-08-05T06:00:00Z', lastReport: '2024-07-29T10:15:00Z'
    },
    {
      imo: '9897013', name: 'MSC Gulsun', flag: 'Panama', type: 'Container Ship', callsign: '3FOC4', length: 400, breadth: 62, grossTonnage: 232618, deadweight: 224986, yearBuilt: 2019, photoUrl: 'https://photos.marinetraffic.com/ais/showphoto.aspx?shipid=19888938',
      lat: 1.15, lon: 103.5, speed: 15.2, course: 310, status: 'Underway using engine', destination: 'TANJUNG PELEPAS', eta: '2024-07-30T22:00:00Z', lastReport: '2024-07-29T09:55:00Z'
    },
    {
      imo: '9708679', name: 'MSC Oscar', flag: 'Panama', type: 'Container Ship', callsign: '3FBT8', length: 395, breadth: 59, grossTonnage: 192237, deadweight: 197362, yearBuilt: 2015, photoUrl: 'https://photos.marinetraffic.com/ais/showphoto.aspx?shipid=1701332',
      lat: 36.8, lon: 5.5, speed: 19.8, course: 88, status: 'Underway using engine', destination: 'PORT SAID', eta: '2024-08-02T18:00:00Z', lastReport: '2024-07-29T10:01:00Z'
    },
    {
      imo: '9321483', name: 'Ever Given', flag: 'Panama', type: 'Container Ship', callsign: 'H3RC', length: 400, breadth: 59, grossTonnage: 219079, deadweight: 199629, yearBuilt: 2018, photoUrl: 'https://photos.marinetraffic.com/ais/showphoto.aspx?shipid=11306639',
      lat: 29.9, lon: 32.5, speed: 0, course: 180, status: 'Moored', destination: 'SUEZ CANAL', eta: 'N/A', lastReport: '2024-07-29T08:30:00Z'
    },
    {
      imo: '9247455', name: 'TI Europe', flag: 'Belgium', type: 'Crude Oil Tanker', callsign: 'ONDI', length: 380, breadth: 68, grossTonnage: 234006, deadweight: 441585, yearBuilt: 2002, photoUrl: 'https://photos.marinetraffic.com/ais/showphoto.aspx?shipid=140660',
      lat: 26.5, lon: 53.2, speed: 12.0, course: 110, status: 'Underway using engine', destination: 'FUJAIRAH', eta: '2024-08-01T14:00:00Z', lastReport: '2024-07-29T09:40:00Z'
    }
];

export const searchVessels = async (query: string): Promise<VesselData[]> => {
  const cleanQuery = query ? query.trim() : '';
  if (!cleanQuery) {
    return [];
  }
  
  await new Promise(resolve => setTimeout(resolve, 500));
  const lowerCaseQuery = cleanQuery.toLowerCase();
  const results = MOCK_DATA.filter(vessel => {
    const vesselName = vessel.name.toLowerCase();
    return vessel.imo === cleanQuery || vesselName.includes(lowerCaseQuery);
  });
  
  return results;
};

export const getVesselByImo = async (imo: string): Promise<VesselData | null> => {
  if (!imo) return null;
  await new Promise(resolve => setTimeout(resolve, 300));
  const vessel = MOCK_DATA.find(v => v.imo === imo);
  return vessel || null;
}
