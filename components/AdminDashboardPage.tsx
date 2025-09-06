import React, { useState, useEffect, useMemo } from 'react';
import { Delivery, DeliveryStatus } from '../types';
import { getAllDeliveries } from '../services/deliveryService';
import PackageIcon from './icons/PackageIcon';
import TruckIcon from './icons/TruckIcon';
import CheckCircle2Icon from './icons/CheckCircle2Icon';

interface AdminDashboardPageProps {
    onViewDelivery: (deliveryId: string) => void;
}

const StatCard: React.FC<{ icon: React.FC<any>, title: string, value: number | string, color?: string }> = ({ icon: Icon, title, value, color = 'gray' }) => {
    const colorClasses: {[key: string]: string} = {
        gray: 'bg-gray-100 text-gray-600',
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        yellow: 'bg-yellow-100 text-yellow-600',
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

const ALL_STATUSES: DeliveryStatus[] = ['Pending Pickup', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled'];

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onViewDelivery }) => {
    const [allDeliveries, setAllDeliveries] = useState<Delivery[]>([]);
    const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<DeliveryStatus | 'All'>('All');

    useEffect(() => {
        const fetchDeliveries = async () => {
            setIsLoading(true);
            const data = await getAllDeliveries();
            setAllDeliveries(data);
            setFilteredDeliveries(data);
            setIsLoading(false);
        };
        fetchDeliveries();
    }, []);

    useEffect(() => {
        if (filter === 'All') {
            setFilteredDeliveries(allDeliveries);
        } else {
            setFilteredDeliveries(allDeliveries.filter(d => d.status === filter));
        }
    }, [filter, allDeliveries]);
    
    const deliveryStats = useMemo(() => {
        const total = allDeliveries.length;
        const pending = allDeliveries.filter(d => d.status === 'Pending Pickup').length;
        const inTransit = allDeliveries.filter(d => ['Picked Up', 'In Transit', 'Out for Delivery'].includes(d.status)).length;
        return { total, pending, inTransit };
    }, [allDeliveries]);
    
    const StatusBadge: React.FC<{ status: DeliveryStatus }> = ({ status }) => {
        const colorClasses = {
            'Pending Pickup': 'bg-yellow-100 text-yellow-800', 'Picked Up': 'bg-blue-100 text-blue-800',
            'In Transit': 'bg-cyan-100 text-cyan-800', 'Out for Delivery': 'bg-indigo-100 text-indigo-800',
            'Delivered': 'bg-green-100 text-green-800', 'Cancelled': 'bg-red-100 text-red-800',
        };
        return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[status]}`}>{status}</span>;
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">System-Wide Deliveries</h1>
                <p className="mt-1 text-sm text-gray-600">Overview of all deliveries in the system.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={PackageIcon} title="Total Deliveries" value={deliveryStats.total} />
                <StatCard icon={CheckCircle2Icon} title="Pending Pickup" value={deliveryStats.pending} color="yellow" />
                <StatCard icon={TruckIcon} title="In Transit" value={deliveryStats.inTransit} color="blue" />
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                 {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading all deliveries...</div>
                ) : (
                    <>
                        <div className="p-4 border-b flex items-center gap-4">
                            <label htmlFor="status-filter" className="text-sm font-medium">Filter by status:</label>
                             <select 
                                id="status-filter"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value as any)}
                                className="bg-white border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="All">All</option>
                                {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="overflow-x-auto">
                           <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Merchant</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredDeliveries.map((delivery) => (
                                        <tr key={delivery.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-mono">{delivery.id}</td>
                                            <td className="px-6 py-4 text-sm"><StatusBadge status={delivery.status} /></td>
                                            <td className="px-6 py-4 text-sm">{delivery.merchantName}</td>
                                            <td className="px-6 py-4 text-sm">{delivery.agentName || 'Unassigned'}</td>
                                            <td className="px-6 py-4 text-sm">{delivery.originAddress} &rarr; {delivery.destinationAddress}</td>
                                            <td className="px-6 py-4 text-right text-sm font-medium">
                                                <button onClick={() => onViewDelivery(delivery.id)} className="text-green-600 hover:text-green-900">Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredDeliveries.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="text-center py-8 text-gray-500">No deliveries match the current filter.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboardPage;