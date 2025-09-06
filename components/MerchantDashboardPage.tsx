import React, { useState, useEffect } from 'react';
import { Delivery, User, DeliveryStatus } from '../types';
import { getDeliveriesForMerchant } from '../services/deliveryService';
import PackageIcon from './icons/PackageIcon';
import TruckIcon from './icons/TruckIcon';
import CheckCircle2Icon from './icons/CheckCircle2Icon';


interface MerchantDashboardPageProps {
    user: User;
    onViewDelivery: (deliveryId: string) => void;
    onCreateDelivery: () => void;
}

const StatCard: React.FC<{ icon: React.FC<any>, title: string, value: number | string, color?: string }> = ({ icon: Icon, title, value, color = 'gray' }) => {
    const colorClasses: {[key: string]: string} = {
        gray: 'bg-gray-100 text-gray-600',
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
            <div className={`p-3 rounded-full ${colorClasses[color]}`}>
                <Icon className="h-6 w-6" />
            </div>
        </div>
    );
};


const MerchantDashboardPage: React.FC<MerchantDashboardPageProps> = ({ user, onViewDelivery, onCreateDelivery }) => {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDeliveries = async () => {
            setIsLoading(true);
            const data = await getDeliveriesForMerchant(user.id);
            setDeliveries(data);
            setIsLoading(false);
        };
        fetchDeliveries();
    }, [user.id]);
    
    const deliveryStats = React.useMemo(() => {
        const total = deliveries.length;
        const inTransit = deliveries.filter(d => ['In Transit', 'Picked Up', 'Out for Delivery'].includes(d.status)).length;
        const delivered = deliveries.filter(d => d.status === 'Delivered').length;
        return { total, inTransit, delivered };
    }, [deliveries]);

    const StatusBadge: React.FC<{ status: DeliveryStatus }> = ({ status }) => {
        const colorClasses = {
            'Pending Pickup': 'bg-yellow-100 text-yellow-800',
            'Picked Up': 'bg-blue-100 text-blue-800',
            'In Transit': 'bg-cyan-100 text-cyan-800',
            'Out for Delivery': 'bg-indigo-100 text-indigo-800',
            'Delivered': 'bg-green-100 text-green-800',
            'Cancelled': 'bg-red-100 text-red-800',
        };
        return (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        My Deliveries
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Welcome, {user.name}. Manage your deliveries here.
                    </p>
                </div>
                <button 
                    onClick={onCreateDelivery}
                    className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center gap-2"
                >
                    <PackageIcon className="h-5 w-5" />
                    Create New Delivery
                </button>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={PackageIcon} title="Total Deliveries" value={deliveryStats.total} />
                <StatCard icon={TruckIcon} title="In Transit" value={deliveryStats.inTransit} color="blue" />
                <StatCard icon={CheckCircle2Icon} title="Completed" value={deliveryStats.delivered} color="green" />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading your deliveries...</div>
                ) : deliveries.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">You have not created any deliveries yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {deliveries.map((delivery) => (
                                    <tr key={delivery.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">{delivery.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><StatusBadge status={delivery.status} /></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="font-semibold">{delivery.originAddress} &rarr; {delivery.destinationAddress}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(delivery.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => onViewDelivery(delivery.id)} className="text-green-600 hover:text-green-900">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MerchantDashboardPage;