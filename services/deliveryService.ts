import { Delivery, DeliveryStatus, User } from '../types';
import { MOCK_DELIVERIES, MOCK_USERS } from '../data/mockData';

const DELIVERY_STORAGE_KEY = 'shipify_deliveries';

const getDeliveriesFromStorage = (): Delivery[] => {
    try {
        const stored = localStorage.getItem(DELIVERY_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        } else {
            // If no data, initialize with mock data
            localStorage.setItem(DELIVERY_STORAGE_KEY, JSON.stringify(MOCK_DELIVERIES));
            return MOCK_DELIVERIES;
        }
    } catch (error) {
        console.error("Failed to access deliveries in localStorage", error);
        return MOCK_DELIVERIES; // Fallback
    }
};

const saveDeliveriesToStorage = (deliveries: Delivery[]) => {
    try {
        localStorage.setItem(DELIVERY_STORAGE_KEY, JSON.stringify(deliveries));
    } catch (error) {
        console.error("Failed to save deliveries to localStorage", error);
    }
};

export const getAllDeliveries = async (): Promise<Delivery[]> => {
    await new Promise(res => setTimeout(res, 300)); // Simulate network delay
    return getDeliveriesFromStorage();
};

export const getDeliveriesForMerchant = async (merchantId: string): Promise<Delivery[]> => {
    await new Promise(res => setTimeout(res, 300));
    const all = getDeliveriesFromStorage();
    return all.filter(d => d.merchantId === merchantId);
};

export const getDeliveriesForAgent = async (agentId: string): Promise<Delivery[]> => {
    await new Promise(res => setTimeout(res, 300));
    const all = getDeliveriesFromStorage();
    // This now returns all deliveries; filtering for assigned/unassigned happens in the component
    return all;
};

export const getDeliveryById = async (id: string): Promise<Delivery | null> => {
     await new Promise(res => setTimeout(res, 200));
    const all = getDeliveriesFromStorage();
    return all.find(d => d.id === id) || null;
}

export const createDelivery = async (
    merchant: User,
    originAddress: string,
    destinationAddress: string,
    recipientName: string,
    recipientPhone: string
): Promise<Delivery> => {
    await new Promise(res => setTimeout(res, 500));
    const all = getDeliveriesFromStorage();
    const newDelivery: Delivery = {
        id: `DEL-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
        merchantId: merchant.id,
        merchantName: merchant.name,
        agentId: null, // Unassigned initially
        agentName: null,
        status: 'Pending Pickup',
        originAddress,
        destinationAddress,
        recipientName,
        recipientPhone,
        createdAt: new Date().toISOString(),
        statusHistory: [{ status: 'Pending Pickup', timestamp: new Date().toISOString() }],
    };
    const updated = [newDelivery, ...all];
    saveDeliveriesToStorage(updated);
    return newDelivery;
};

export const updateDeliveryStatus = async (
    deliveryId: string,
    newStatus: DeliveryStatus,
    agent?: User
): Promise<Delivery | null> => {
    await new Promise(res => setTimeout(res, 400));
    const all = getDeliveriesFromStorage();
    const index = all.findIndex(d => d.id === deliveryId);

    if (index === -1) return null;

    const deliveryToUpdate = { ...all[index] };
    deliveryToUpdate.status = newStatus;
    deliveryToUpdate.statusHistory.push({ status: newStatus, timestamp: new Date().toISOString() });

    // Assign agent if one is making the update and it's currently unassigned
    if (agent && !deliveryToUpdate.agentId && newStatus === 'Picked Up') {
        deliveryToUpdate.agentId = agent.id;
        deliveryToUpdate.agentName = agent.name;
    }

    all[index] = deliveryToUpdate;
    saveDeliveriesToStorage(all);
    return deliveryToUpdate;
};