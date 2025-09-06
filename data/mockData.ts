
import { User, Delivery } from '../types';

export const MOCK_USERS: User[] = [
    { id: 'user-1', name: 'Global Imports Inc.', email: 'merchant@example.com', role: 'Merchant' },
    { id: 'user-2', name: 'John Doe', email: 'agent@example.com', role: 'Agent' },
    { id: 'user-3', name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
    { id: 'user-4', name: 'Sanjay Sarode', email: 'sanjaybsarode@gmail.com', role: 'Admin' },
];

export const MOCK_DELIVERIES: Delivery[] = [
    {
        id: 'DEL-001',
        merchantId: 'user-1',
        merchantName: 'Global Imports Inc.',
        agentId: 'user-2',
        agentName: 'John Doe',
        status: 'In Transit',
        originAddress: '123 Warehouse Rd, Shanghai, China',
        destinationAddress: '456 Market St, New York, USA',
        recipientName: 'Jane Smith',
        recipientPhone: '555-1234',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        statusHistory: [
            { status: 'Pending Pickup', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
            { status: 'Picked Up', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
            { status: 'In Transit', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
        ],
    },
    {
        id: 'DEL-002',
        merchantId: 'user-1',
        merchantName: 'Global Imports Inc.',
        agentId: 'user-2',
        agentName: 'John Doe',
        status: 'Delivered',
        originAddress: '789 Factory Ln, Hamburg, Germany',
        destinationAddress: '101 Business Blvd, London, UK',
        recipientName: 'Peter Jones',
        recipientPhone: '555-5678',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        statusHistory: [
            { status: 'Pending Pickup', timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() },
            { status: 'Picked Up', timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString() },
            { status: 'In Transit', timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
            { status: 'Out for Delivery', timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString() },
            { status: 'Delivered', timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString() },
        ],
    },
    {
        id: 'DEL-003',
        merchantId: 'user-1',
        merchantName: 'Global Imports Inc.',
        agentId: null,
        agentName: null,
        status: 'Pending Pickup',
        originAddress: '321 Port Ave, Singapore',
        destinationAddress: '555 Commerce Way, Tokyo, Japan',
        recipientName: 'Yuki Tanaka',
        recipientPhone: '555-8765',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        statusHistory: [
            { status: 'Pending Pickup', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
        ],
    },
];