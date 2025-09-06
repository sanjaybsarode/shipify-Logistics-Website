
import { Tariff } from '../types';
import { TARIFF_DATA } from '../data/tariffs';

const TARIFF_STORAGE_KEY = 'custom_tariffs';

// Function to get custom tariffs from localStorage
const getCustomTariffs = (): Tariff[] => {
  try {
    const storedTariffs = localStorage.getItem(TARIFF_STORAGE_KEY);
    if (storedTariffs) {
      return JSON.parse(storedTariffs);
    }
  } catch (error) {
    console.error("Failed to parse custom tariffs from localStorage:", error);
  }
  return [];
};

// Function to get all tariffs (base + custom)
export const getTariffs = (): Tariff[] => {
  const customTariffs = getCustomTariffs();
  // Combine and remove duplicates, giving preference to custom ones if IDs clash
  const combined = [...customTariffs, ...TARIFF_DATA];
  const uniqueTariffs = Array.from(new Map(combined.map(item => [item.id, item])).values());
  return uniqueTariffs;
};

// Function to add a new tariff
export const addTariff = (newTariffData: Omit<Tariff, 'id'>): Tariff => {
  const customTariffs = getCustomTariffs();
  
  const newTariff: Tariff = {
    ...newTariffData,
    id: `${newTariffData.code}-${Date.now()}` // Generate a simple unique ID
  };

  const updatedTariffs = [...customTariffs, newTariff];
  
  try {
    localStorage.setItem(TARIFF_STORAGE_KEY, JSON.stringify(updatedTariffs));
  } catch (error) {
    console.error("Failed to save new tariff to localStorage:", error);
    // Even if saving fails, we can proceed with the in-memory update
  }

  return newTariff;
};
