
import React from 'react';
import MapView from './MapView';

const LiveMapPage: React.FC = () => {
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Global Vessel Map
                        </h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500">
                            Explore live marine traffic from around the world. Pan and zoom to view vessel positions in real-time.
                        </p>
                    </div>
                    <div className="rounded-lg shadow-2xl overflow-hidden border border-gray-200 h-[75vh]">
                        <MapView latitude={20} longitude={0} zoom={2} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveMapPage;