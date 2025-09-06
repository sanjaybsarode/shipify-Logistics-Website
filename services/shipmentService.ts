
import { Shipment } from '../types';

// Mock data for the customer shipment dashboard.
const MOCK_SHIPMENTS: Shipment[] = [
    {
        id: 'SHP-7741A',
        status: 'In Transit',
        origin: 'Shanghai, China',
        destination: 'Rotterdam, Netherlands',
        etd: '2024-07-15T08:00:00Z',
        eta: '2024-08-18T14:00:00Z',
        vesselName: 'Maersk Honam',
        vesselImo: '9495237'
    },
    {
        id: 'SHP-8209B',
        status: 'In Transit',
        origin: 'Singapore, Singapore',
        destination: 'Los Angeles, USA',
        etd: '2024-07-20T16:00:00Z',
        eta: '2024-08-10T22:00:00Z',
        vesselName: 'MSC Gulsun',
        vesselImo: '9897013'
    },
    {
        id: 'SHP-3141C',
        status: 'Delivered',
        origin: 'Hamburg, Germany',
        destination: 'New York, USA',
        etd: '2024-06-10T11:00:00Z',
        eta: '2024-06-25T09:00:00Z',
        vesselName: 'Maersk Mc-Kinney Moller',
        vesselImo: '9784271'
    },
    {
        id: 'SHP-9852D',
        status: 'At Origin',
        origin: 'Jebel Ali, UAE',
        destination: 'Mundra, India',
        etd: '2024-08-05T18:00:00Z',
        eta: '2024-08-12T10:00:00Z',
        vesselName: 'MSC Oscar',
        vesselImo: '9708679'
    },
     {
        id: 'SHP-1105E',
        status: 'Customs Hold',
        origin: 'Busan, South Korea',
        destination: 'Long Beach, USA',
        etd: '2024-07-01T05:00:00Z',
        eta: '2024-07-18T13:00:00Z',
        vesselName: 'Ever Given',
        vesselImo: '9321483'
    }
];

/**
 * Simulates fetching a user's shipments from an API.
 * @returns A promise that resolves to an array of Shipments.
 */
export const getShipments = async (): Promise<Shipment[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 700));
    return MOCK_SHIPMENTS;
};
