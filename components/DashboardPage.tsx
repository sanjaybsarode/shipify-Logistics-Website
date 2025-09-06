
import React, { useState, useEffect } from 'react';
import { Shipment, ShipmentStatus } from '../types';
import { getShipments } from '../services/shipmentService';

interface DashboardPageProps {
    onViewVesselProfile: (imo: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onViewVesselProfile }) => {
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchShipments = async () => {
            setIsLoading(true);
            const data = await getShipments();
            setShipments(data);
            setIsLoading(false);
        };
        fetchShipments();
    }, []);

    const StatusBadge: React.FC<{ status: ShipmentStatus }> = ({ status }) => {
        const colorClasses = {
            'In Transit': 'bg-blue-100 text-blue-800',
            'Delivered': 'bg-green-100 text-green-800',
            'At Origin': 'bg-yellow-100 text-yellow-800',
            'Customs Hold': 'bg-red-100 text-red-800',
        };
        return (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                            Shipment Dashboard
                        </h1>
                        <p className="mt-2 text-lg text-gray-500">
                            Welcome, Demo User. Here is an overview of your current and past shipments.
                        </p>
                    </header>
                    
                    <div className="bg-white rounded-lg shadow-md border overflow-hidden">
                        {isLoading ? (
                            <div className="p-8 text-center text-gray-500">Loading shipments...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipment ID</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vessel</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {shipments.map((shipment) => (
                                            <tr key={shipment.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">{shipment.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><StatusBadge status={shipment.status} /></td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="font-semibold">{shipment.origin} &rarr; {shipment.destination}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.vesselName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(shipment.eta).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {shipment.status === 'In Transit' && (
                                                        <button 
                                                            onClick={() => onViewVesselProfile(shipment.vesselImo)}
                                                            className="text-green-600 hover:text-green-900">
                                                            Track Vessel
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
