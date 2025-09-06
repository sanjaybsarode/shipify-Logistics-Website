import React, { useState, useEffect, useMemo } from 'react';
import { Delivery, User, DeliveryStatus } from '../types';
import { getDeliveriesForAgent, updateDeliveryStatus, getAllDeliveries } from '../services/deliveryService';

interface AgentDashboardPageProps {
    user: User;
    onViewDelivery: (deliveryId: string) => void;
}

const AgentDashboardPage: React.FC<AgentDashboardPageProps> = ({ user, onViewDelivery }) => {
    const [allDeliveries, setAllDeliveries] = useState<Delivery[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDeliveries = async () => {
        setIsLoading(true);
        const data = await getAllDeliveries(); // Fetch all to show unassigned
        setAllDeliveries(data);
        setIsLoading(false);
    };
    
    useEffect(() => {
        fetchDeliveries();
    }, [user.id]);
    
    const { myDeliveries, availableDeliveries } = useMemo(() => {
        const my = allDeliveries.filter(d => d.agentId === user.id && d.status !== 'Delivered' && d.status !== 'Cancelled');
        const available = allDeliveries.filter(d => d.agentId === null && d.status === 'Pending Pickup');
        return { myDeliveries: my, availableDeliveries: available };
    }, [allDeliveries, user.id]);

    const handleStatusUpdate = async (deliveryId: string, newStatus: DeliveryStatus) => {
        const updatedDelivery = await updateDeliveryStatus(deliveryId, newStatus, user);
        if (updatedDelivery) {
            setAllDeliveries(prev => prev.map(d => d.id === deliveryId ? updatedDelivery : d));
        }
    };
    
    const getNextAction = (status: DeliveryStatus): { label: string, nextStatus: DeliveryStatus } | null => {
        switch (status) {
            case 'Pending Pickup': return { label: 'Mark as Picked Up', nextStatus: 'Picked Up' };
            case 'Picked Up': return { label: 'Start Transit', nextStatus: 'In Transit' };
            case 'In Transit': return { label: 'Mark for Delivery', nextStatus: 'Out for Delivery' };
            case 'Out for Delivery': return { label: 'Mark as Delivered', nextStatus: 'Delivered' };
            default: return null;
        }
    };
    
    const DeliveryCard: React.FC<{delivery: Delivery}> = ({ delivery }) => {
        const nextAction = getNextAction(delivery.status);
        return (
             <li className="bg-white p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition-shadow">
                <div>
                    <p className="font-mono text-sm font-semibold text-green-700">{delivery.id}</p>
                    <p className="text-sm mt-1"><strong>From:</strong> {delivery.originAddress}</p>
                    <p className="text-sm"><strong>To:</strong> {delivery.destinationAddress}</p>
                    <p className="text-sm mt-1"><strong>Status:</strong> <span className="font-semibold">{delivery.status}</span></p>
                </div>
                <div className="mt-4 sm:mt-0 flex flex-col sm:items-end gap-2">
                    {nextAction && (
                        <button 
                            onClick={() => handleStatusUpdate(delivery.id, nextAction.nextStatus)}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors w-full sm:w-auto text-sm"
                        >
                            {nextAction.label}
                        </button>
                    )}
                    <button onClick={() => onViewDelivery(delivery.id)} className="text-sm text-gray-600 hover:text-black w-full sm:w-auto">
                        View Details
                    </button>
                </div>
            </li>
        )
    }

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600">
                    Welcome, {user.name}. Here are your assigned and available deliveries.
                </p>
            </header>

            {isLoading ? (
                <div className="p-8 text-center text-gray-500">Loading deliveries...</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Available for Pickup ({availableDeliveries.length})</h2>
                        {availableDeliveries.length > 0 ? (
                            <ul className="space-y-4">
                                {availableDeliveries.map(delivery => <DeliveryCard key={delivery.id} delivery={delivery} />)}
                            </ul>
                        ) : (
                            <div className="p-6 text-center text-gray-500 bg-white border rounded-lg">No deliveries are currently available for pickup.</div>
                        )}
                    </div>
                     <div>
                        <h2 className="text-xl font-semibold mb-4">My Active Deliveries ({myDeliveries.length})</h2>
                         {myDeliveries.length > 0 ? (
                            <ul className="space-y-4">
                                {myDeliveries.map(delivery => <DeliveryCard key={delivery.id} delivery={delivery} />)}
                            </ul>
                        ) : (
                            <div className="p-6 text-center text-gray-500 bg-white border rounded-lg">You have no active deliveries.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgentDashboardPage;