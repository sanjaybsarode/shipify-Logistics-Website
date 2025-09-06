


export enum TariffType {
  SEA = 'Sea Port',
  AIR = 'Airport',
}

export interface Tariff {
  id: string;
  name: string;
  code: string;
  country: string;
  type: TariffType;
  details: string;
  lat?: number;
  lon?: number;
}

export interface VesselData {
  imo: string;
  name: string;
  flag: string;
  type: string;
  callsign: string;
  length: number;
  breadth: number;
  grossTonnage: number;
  deadweight: number;
  yearBuilt: number;
  photoUrl: string;
  lat: number;
  lon: number;
  speed: number;
  course: number;
  status: string;
  destination: string;
  eta: string;
  lastReport: string;
}


export interface Container {
  id: string;
  name: string;
  // Dimensions in millimeters
  length: number;
  width: number;
  height: number;
  // Volume in cubic meters
  volume: number;
  // Payload in kilograms
  payload: number;
}

export interface CargoItem {
  id: string;
  name: string;
  // Dimensions in millimeters
  length: number;
  width: number;
  height: number;
  // Weight in kilograms
  weight: number;
  quantity: number;
}

export interface Fleet {
  id: string;
  name: string;
  key: string; // The VesselFinder personal fleet key
}

export type ShipmentStatus = 'In Transit' | 'Delivered' | 'At Origin' | 'Customs Hold';

export interface Shipment {
    id: string; // e.g., House Bill of Lading number
    status: ShipmentStatus;
    origin: string;
    destination: string;
    etd: string; // Estimated Time of Departure
    eta: string; // Estimated Time of Arrival
    vesselName: string;
    vesselImo: string;
}

export type CargoType = 'Container' | 'GeneralCargo' | 'ODC';

export interface Quote {
    cargoType: CargoType;
    originName: string;
    destinationName: string;
    distance: number;
    price: number;
    
    // Container specific
    containerLabel?: string;
    containerPricePerNm?: number;
    
    // General Cargo / ODC specific
    cargoWeight?: number; // in MT
    cargoLength?: number; // in m
    cargoWidth?: number; // in m
    cargoHeight?: number; // in m
    volume?: number; // in CBM
    chargeableWeight?: number; // FRT
    priceBreakdown?: string;
}

// --- NEW TYPES FOR DELIVERY MANAGEMENT ---

export type UserRole = 'Merchant' | 'Agent' | 'Admin';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export type DeliveryStatus = 'Pending Pickup' | 'Picked Up' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Delivery {
    id: string;
    merchantId: string;
    merchantName: string;
    agentId: string | null;
    agentName: string | null;
    status: DeliveryStatus;
    originAddress: string;
    destinationAddress: string;
    recipientName: string;
    recipientPhone: string;
    createdAt: string;
    statusHistory: { status: DeliveryStatus; timestamp: string }[];
}