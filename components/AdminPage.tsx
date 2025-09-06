


import React, { useState, useEffect } from 'react';
import { Tariff } from '../types';
import { 
    getContainerPrices, 
    updateContainerPrices, 
    ContainerPrices,
    getGeneralCargoRates,
    updateGeneralCargoRates,
    GeneralCargoRates,
    getODCRates,
    updateODCRates,
    ODCRates
} from '../services/pricingService';
import AdminView from './AdminView';
import TariffList from './TariffList';
import TariffDetailModal from './TariffDetailModal';

interface AdminPageProps {
  onAddTariff: (tariff: Omit<Tariff, 'id'>) => void;
  allTariffs: Tariff[];
}

const AdminPage: React.FC<AdminPageProps> = ({ onAddTariff, allTariffs }) => {
    const [containerPrices, setContainerPrices] = useState<ContainerPrices | null>(null);
    const [generalCargoRates, setGeneralCargoRates] = useState<GeneralCargoRates | null>(null);
    const [odcRates, setOdcRates] = useState<ODCRates | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null);

    useEffect(() => {
        setContainerPrices(getContainerPrices());
        setGeneralCargoRates(getGeneralCargoRates());
        setOdcRates(getODCRates());
    }, []);

    const handleContainerPriceChange = (containerType: keyof ContainerPrices, value: string) => {
        const newPrice = parseFloat(value);
        if (containerPrices && !isNaN(newPrice)) {
            setContainerPrices({
                ...containerPrices,
                [containerType]: { ...containerPrices[containerType], pricePerNm: newPrice }
            });
        }
    };
    
    const handleGeneralCargoRateChange = (field: keyof GeneralCargoRates, value: string) => {
        const numValue = parseFloat(value);
        if (generalCargoRates && !isNaN(numValue)) {
            setGeneralCargoRates({ ...generalCargoRates, [field]: numValue });
        }
    };

    const handleOdcRateChange = (field: keyof ODCRates, value: string) => {
        const numValue = parseFloat(value);
        if (odcRates && !isNaN(numValue)) {
            setOdcRates({ ...odcRates, [field]: numValue });
        }
    };
    
    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        let success = true;
        if (containerPrices) success = success && updateContainerPrices(containerPrices);
        if (generalCargoRates) success = success && updateGeneralCargoRates(generalCargoRates);
        if (odcRates) success = success && updateODCRates(odcRates);

        if (success) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }
    };

    if (!containerPrices || !generalCargoRates || !odcRates) {
        return <div>Loading admin settings...</div>;
    }

    const PriceInput: React.FC<{label: string, value: any, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, value, onChange}) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input type="number" value={value} onChange={onChange}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 py-2 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    placeholder="0.00" step="0.01" min="0" />
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Application Settings</h1>
                <p className="mt-1 text-sm text-gray-600">
                    Manage your application's data and settings from one central location.
                </p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left Column: Forms */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Section 1: Add Tariff */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <AdminView onAddTariff={onAddTariff} />
                    </div>
                    
                    {/* Section 2: Pricing */}
                    <form onSubmit={handleSaveChanges} className="bg-white p-6 rounded-lg shadow-sm border space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">Container Pricing</h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(containerPrices).map(([key, { label, pricePerNm }]) => (
                                    <PriceInput key={key} label={`${label} ($/NM)`} value={pricePerNm}
                                        onChange={(e) => handleContainerPriceChange(key as keyof ContainerPrices, e.target.value)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">General & ODC Cargo Pricing</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-800">General Cargo</h3>
                                    <PriceInput label="Price per FRT/NM" value={generalCargoRates.pricePerFrtPerNm} 
                                        onChange={(e) => handleGeneralCargoRateChange('pricePerFrtPerNm', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-800">ODC (&gt;40t)</h3>
                                    <PriceInput label="Base Price per FRT/NM" value={odcRates.pricePerFrtPerNm}
                                        onChange={(e) => handleOdcRateChange('pricePerFrtPerNm', e.target.value)}
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Surcharge Weight Threshold (MT)</label>
                                        <input type="number" value={odcRates.weightSurchargeThresholdMT} 
                                            onChange={(e) => handleOdcRateChange('weightSurchargeThresholdMT', e.target.value)}
                                            className="block w-full rounded-md border-gray-300 py-2 px-3 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                        />
                                    </div>
                                    <PriceInput label="Surcharge per Ton Over Threshold" value={odcRates.surchargePerTonOverThreshold}
                                        onChange={(e) => handleOdcRateChange('surchargePerTonOverThreshold', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 mt-6">
                            {showSuccess && <p className="text-green-600 text-sm">Prices saved successfully!</p>}
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                            >
                                Save All Pricing Changes
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Right Column: Manage Tariffs */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
                   <TariffList 
                        tariffs={allTariffs} 
                        onTariffSelect={setSelectedTariff}
                        selectedTariffId={selectedTariff?.id || null}
                    />
                </div>
            </div>

            {selectedTariff && (
                <TariffDetailModal 
                    tariff={selectedTariff} 
                    onClose={() => setSelectedTariff(null)} 
                />
            )}
        </div>
    );
};

export default AdminPage;