
import { Fleet } from '../types';

const FLEET_STORAGE_KEY = 'shipify_fleets';

export const getFleets = (): Fleet[] => {
  try {
    const storedFleets = localStorage.getItem(FLEET_STORAGE_KEY);
    return storedFleets ? JSON.parse(storedFleets) : [];
  } catch (error) {
    console.error("Failed to parse fleets from localStorage:", error);
    return [];
  }
};

const saveFleets = (fleets: Fleet[]): boolean => {
  try {
    localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(fleets));
    return true;
  } catch (error) {
    console.error("Failed to save fleets to localStorage:", error);
    return false;
  }
};

export const addFleet = (name: string, key: string): Fleet | null => {
  const fleets = getFleets();
  const newFleet: Fleet = {
    id: `fleet-${Date.now()}`,
    name,
    key,
  };
  const updatedFleets = [...fleets, newFleet];
  if (saveFleets(updatedFleets)) {
    return newFleet;
  }
  return null;
};

export const deleteFleet = (id: string): boolean => {
  const fleets = getFleets();
  const updatedFleets = fleets.filter(fleet => fleet.id !== id);
  return saveFleets(updatedFleets);
};
