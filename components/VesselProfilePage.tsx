
import React, { useState, useEffect } from 'react';
import { VesselData } from '../types';
import { getVesselByImo } from '../services/trackingService';
import MapView from './MapView';

interface VesselProfilePageProps {
    imo: string;
    onBack: () => void;
}

const VesselProfilePage: React.FC<VesselProfilePageProps> = ({ imo, onBack }) => {
    const [vessel, setVessel] = useState<VesselData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVessel = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getVesselByImo(imo);
                if (data) {
                    setVessel(data);
                } else {
                    setError(`Vessel with IMO ${imo} not found.`);
                }
            } catch (err) {
                setError('Failed to fetch vessel data.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchVessel();
    }, [imo]);
    
    const DetailCard: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">{title}</h3>
            <dl className="space-y-3">{children}</dl>
        </div>
    );

    const DataRow: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
        <div className="grid grid-cols-2 gap-2">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="text-sm text-gray-900 font-semibold text-right">{value}</dd>
        </div>
    );

    if (isLoading) return <div className="p-8 text-center">Loading vessel profile...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
    if (!vessel) return null;

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="max-w-7xl mx-auto">
                    <button onClick={onBack} className="mb-6 text-sm text-green-600 hover:text-green-800 font-semibold">
                        &larr; Back to Previous Page
                    </button>
                
                    {/* Header */}
                    <header className="mb-8 p-6 bg-gray-50 rounded-lg shadow-md border flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="w-full md:w-1/3 h-48 md:h-40 rounded-lg overflow-hidden shadow-sm">
                            <img src={vessel.photoUrl} alt={`Photo of ${vessel.name}`} className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex-grow">
                            <p className="text-sm text-gray-500">{vessel.type}</p>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{vessel.name}</h1>
                            <p className="mt-1 font-mono text-gray-600">IMO: {vessel.imo} | Callsign: {vessel.callsign}</p>
                        </div>
                    </header>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Details */}
                        <div className="lg:col-span-1 space-y-8">
                            <DetailCard title="Voyage Information">
                                <DataRow label="Status" value={vessel.status} />
                                <DataRow label="Speed / Course" value={`${vessel.speed} kn / ${vessel.course}°`} />
                                <DataRow label="Destination" value={vessel.destination} />
                                <DataRow label="ETA" value={new Date(vessel.eta).toLocaleString()} />
                                <DataRow label="Last Report" value={new Date(vessel.lastReport).toLocaleString()} />
                            </DetailCard>
                             <DetailCard title="Technical Specs">
                                <DataRow label="Flag" value={vessel.flag} />
                                <DataRow label="Gross Tonnage" value={`${vessel.grossTonnage.toLocaleString()} t`} />
                                <DataRow label="Deadweight" value={`${vessel.deadweight.toLocaleString()} t`} />
                                <DataRow label="Length (L)" value={`${vessel.length} m`} />
                                <DataRow label="Breadth (B)" value={`${vessel.breadth} m`} />
                                <DataRow label="Year Built" value={vessel.yearBuilt} />
                            </DetailCard>
                        </div>
                        {/* Right Column: Map */}
                        <div className="lg:col-span-2 rounded-lg shadow-lg overflow-hidden min-h-[400px] md:min-h-[600px] bg-gray-200">
                             <MapView
                                latitude={vessel.lat}
                                longitude={vessel.lon}
                                zoom={10}
                                vesselName={vessel.name}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VesselProfilePage;
