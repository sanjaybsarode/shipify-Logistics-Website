


export interface ContainerPriceInfo {
    label: string;
    pricePerNm: number;
}

export interface ContainerPrices {
    '20_standard': ContainerPriceInfo;
    '40_standard': ContainerPriceInfo;
    '40_high_cube': ContainerPriceInfo;
    '20_refrigerated': ContainerPriceInfo;
}

export interface GeneralCargoRates {
    pricePerFrtPerNm: number;
}

export interface ODCRates {
    pricePerFrtPerNm: number;
    weightSurchargeThresholdMT: number;
    surchargePerTonOverThreshold: number;
}

const PRICING_STORAGE_KEY = 'container_pricing';
const GENERAL_CARGO_PRICING_KEY = 'general_cargo_pricing';
const ODC_PRICING_KEY = 'odc_pricing';


const DEFAULT_PRICES: ContainerPrices = {
    '20_standard': { label: "20' Standard", pricePerNm: 0.15 },
    '40_standard': { label: "40' Standard", pricePerNm: 0.25 },
    '40_high_cube': { label: "40' High Cube", pricePerNm: 0.28 },
    '20_refrigerated': { label: "20' Refrigerated", pricePerNm: 0.40 },
};

const DEFAULT_GENERAL_CARGO_RATES: GeneralCargoRates = {
    pricePerFrtPerNm: 0.08,
};

const DEFAULT_ODC_RATES: ODCRates = {
    pricePerFrtPerNm: 0.12,
    weightSurchargeThresholdMT: 40,
    surchargePerTonOverThreshold: 500, // A flat fee per ton over 40MT
};


// Function to get prices from localStorage or return defaults
export const getContainerPrices = (): ContainerPrices => {
    try {
        const storedPrices = localStorage.getItem(PRICING_STORAGE_KEY);
        if (storedPrices) {
            // Basic validation to ensure the structure matches
            const parsed = JSON.parse(storedPrices);
            if (Object.keys(parsed).every(k => k in DEFAULT_PRICES)) {
                 return parsed;
            }
        }
    } catch (error) {
        console.error("Failed to parse pricing from localStorage:", error);
    }
    return DEFAULT_PRICES;
};

// Function to update prices in localStorage
export const updateContainerPrices = (newPrices: ContainerPrices): boolean => {
    try {
        localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(newPrices));
        return true;
    } catch (error) {
        console.error("Failed to save pricing to localStorage:", error);
        return false;
    }
};

// --- General Cargo Rates ---
export const getGeneralCargoRates = (): GeneralCargoRates => {
    try {
        const stored = localStorage.getItem(GENERAL_CARGO_PRICING_KEY);
        if (stored) {
            const parsed = JSON.parse(stored) as any;
             // Backwards compatibility for old property name
            if (parsed.pricePerTonPerNm) {
                parsed.pricePerFrtPerNm = parsed.pricePerTonPerNm;
                delete parsed.pricePerTonPerNm;
            }
            if ('pricePerFrtPerNm' in parsed) {
                return parsed;
            }
        }
    } catch (error) { console.error("Failed to parse general cargo pricing", error); }
    return DEFAULT_GENERAL_CARGO_RATES;
};

export const updateGeneralCargoRates = (newRates: GeneralCargoRates): boolean => {
    try {
        localStorage.setItem(GENERAL_CARGO_PRICING_KEY, JSON.stringify(newRates));
        return true;
    } catch (error) {
        console.error("Failed to save general cargo pricing", error);
        return false;
    }
};

// --- ODC Rates ---
export const getODCRates = (): ODCRates => {
    try {
        const stored = localStorage.getItem(ODC_PRICING_KEY);
        if (stored) {
            const parsed = JSON.parse(stored) as any;
            // Backwards compatibility for old property name
            if (parsed.pricePerTonPerNm) {
                parsed.pricePerFrtPerNm = parsed.pricePerTonPerNm;
                delete parsed.pricePerTonPerNm;
            }
            if ('pricePerFrtPerNm' in parsed && 'weightSurchargeThresholdMT' in parsed) {
                return parsed;
            }
        }
    } catch (error) { console.error("Failed to parse ODC pricing", error); }
    return DEFAULT_ODC_RATES;
};

export const updateODCRates = (newRates: ODCRates): boolean => {
    try {
        localStorage.setItem(ODC_PRICING_KEY, JSON.stringify(newRates));
        return true;
    } catch (error) {
        console.error("Failed to save ODC pricing", error);
        return false;
    }
};