
import React, { useState, useEffect } from 'react';
import { Delivery, User, DeliveryStatus } from '../types';
import { getDeliveryById } from '../services/deliveryService';

interface DeliveryDetailPageProps {
    deliveryId: string;
    user: User;
    onBack: () => void;
}

const DeliveryDetailPage: React.FC<DeliveryDetailPageProps> = ({ deliveryId, user, onBack }) => {
    const [delivery, setDelivery] = useState<Delivery | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDelivery = async () => {
            setIsLoading(true);
            const data = await getDeliveryById(deliveryId);
            if (data) {
                // Basic authorization check
                if (user.role === 'Admin' || user.id === data.merchantId || user.id === data.agentId) {
                    setDelivery(data);
                } else {
                    setError("You are not authorized to view this delivery.");
                }
            } else {
                setError("Delivery not found.");
            }
            setIsLoading(false);
        };
        fetchDelivery();
    }, [deliveryId, user]);
    
    if (isLoading) return <div className="p-8 text-center">Loading delivery details...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
    if (!delivery) return null;
    
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="max-w-4xl mx-auto">
                    <button onClick={onBack} className="mb-6 text-sm text-green-600 hover:text-green-800 font-semibold">
                        &larr; Back to Dashboard
                    </button>
                    
                    <header className="bg-gray-50 p-6 rounded-lg shadow-md border mb-8">
                        <p className="text-sm font-mono text-gray-500">Order ID: {delivery.id}</p>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-1">
                            Delivery Details
                        </h1>
                        <p className="mt-2 text-lg">Current Status: <span className="font-bold text-green-700">{delivery.status}</span></p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Delivery Info */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Information</h3>
                             <p><strong>Merchant:</strong> {delivery.merchantName}</p>
                            <p><strong>Agent:</strong> {delivery.agentName || 'Not Assigned'}</p>
                            <p><strong>Origin:</strong> {delivery.originAddress}</p>
                            <p><strong>Destination:</strong> {delivery.destinationAddress}</p>
                            <p><strong>Recipient:</strong> {delivery.recipientName} ({delivery.recipientPhone})</p>
                            <p><strong>Created On:</strong> {new Date(delivery.createdAt).toLocaleString()}</p>
                        </div>

                        {/* Status History */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Status History</h3>
                            <ul className="border-l-2 border-green-500 pl-4 space-y-6">
                                {delivery.statusHistory.map((history, index) => (
                                    <li key={index} className="relative">
                                        <div className="absolute -left-[2.8rem] top-1 h-4 w-4 bg-green-500 rounded-full border-4 border-white"></div>
                                        <p className="font-bold text-gray-800">{history.status}</p>
                                        <p className="text-sm text-gray-500">{new Date(history.timestamp).toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryDetailPage;
