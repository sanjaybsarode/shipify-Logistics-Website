
import React, { useState } from 'react';
import { VesselData } from '../types';
import { searchVessels } from '../services/trackingService';
import VesselIcon from './icons/VesselIcon';

interface VesselTrackingPageProps {
    onViewVesselProfile: (imo: string) => void;
}

const VesselTrackingPage: React.FC<VesselTrackingPageProps> = ({ onViewVesselProfile }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<VesselData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm) return;

        setIsLoading(true);
        setError(null);
        setSearchResults([]);
        setHasSearched(true);

        try {
            const data = await searchVessels(searchTerm);
            if (data.length > 0) {
                // If only one result, navigate directly to its profile
                if (data.length === 1) {
                    onViewVesselProfile(data[0].imo);
                } else {
                    setSearchResults(data);
                }
            } else {
                setError(`No vessels found for '${searchTerm}'.`);
            }
        } catch (err) {
            setError('An error occurred during the vessel search.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Vessel Search
                        </h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500">
                            Enter a vessel's name or IMO number. If multiple results are found, you can select one to view its detailed profile.
                        </p>
                    </div>

                    <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="e.g., Maersk Honam, 9495237"
                                className="flex-grow block w-full bg-white border border-gray-300 rounded-md py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !searchTerm}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-md transition-colors"
                            >
                                {isLoading ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </form>
                    
                    {isLoading && (
                         <div className="text-center p-6 bg-gray-50 rounded-lg">
                            <p className="text-gray-600">Searching for vessel...</p>
                        </div>
                    )}
                    
                    {error && (
                         <div className="text-center text-red-700 bg-red-50 p-6 rounded-lg">
                            <p className="font-semibold">Search Error</p>
                            <p className="text-sm mt-1">{error}</p>
                        </div>
                    )}

                    {!isLoading && searchResults.length > 1 && (
                        <div className="bg-gray-50 p-4 rounded-lg shadow-md border">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 p-2">Multiple results found. Please select a vessel:</h2>
                            <ul className="bg-white border border-gray-200 rounded-md divide-y divide-gray-200 max-h-96 overflow-y-auto">
                                {searchResults.map(vessel => (
                                    <li key={vessel.imo}>
                                        <button onClick={() => onViewVesselProfile(vessel.imo)} className="w-full text-left p-4 hover:bg-gray-100 transition flex items-center gap-4">
                                            <VesselIcon className="h-8 w-8 text-green-600 flex-shrink-0"/>
                                            <div>
                                                <p className="font-bold text-green-700">{vessel.name}</p>
                                                <p className="text-sm text-gray-500">IMO: {vessel.imo} | Type: {vessel.type}</p>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                     {!isLoading && !error && hasSearched && searchResults.length === 0 && (
                        <div className="text-center text-gray-500 p-6 bg-gray-50 rounded-lg">
                            <p>Your search did not return any results.</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default VesselTrackingPage;
