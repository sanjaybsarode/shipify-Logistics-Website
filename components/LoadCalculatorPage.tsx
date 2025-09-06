
import React, { useState, useMemo } from 'react';
import { Container, CargoItem } from '../types';
import { CONTAINER_DATA } from '../data/containers';
import BoxIcon from './icons/BoxIcon';
import TrashIcon from './icons/TrashIcon';

const LoadCalculatorPage: React.FC = () => {
    const [selectedContainer, setSelectedContainer] = useState<Container | null>(CONTAINER_DATA[0]);
    const [cargoItems, setCargoItems] = useState<CargoItem[]>([
        { id: `cargo-${Date.now()}`, name: 'Product A', length: 1200, width: 800, height: 1000, weight: 500, quantity: 10 },
    ]);

    const handleAddCargoItem = () => {
        const newItem: CargoItem = {
            id: `cargo-${Date.now()}`,
            name: 'New Product',
            length: 100,
            width: 100,
            height: 100,
            weight: 1,
            quantity: 1,
        };
        setCargoItems([...cargoItems, newItem]);
    };

    const handleUpdateCargoItem = (id: string, field: keyof Omit<CargoItem, 'id'>, value: string | number) => {
        setCargoItems(cargoItems.map(item => {
            if (item.id === id) {
                return { ...item, [field]: typeof value === 'string' ? value : Number(value) || 0 };
            }
            return item;
        }));
    };

    const handleRemoveCargoItem = (id: string) => {
        setCargoItems(cargoItems.filter(item => item.id !== id));
    };

    const calculationResults = useMemo(() => {
        if (!selectedContainer) return null;

        const totalCargoVolume = cargoItems.reduce((total, item) => {
            const itemVolumeM3 = (item.length / 1000) * (item.width / 1000) * (item.height / 1000);
            return total + (itemVolumeM3 * item.quantity);
        }, 0);

        const totalCargoWeight = cargoItems.reduce((total, item) => total + (item.weight * item.quantity), 0);
        
        const volumeUtilization = (totalCargoVolume / selectedContainer.volume) * 100;
        const weightUtilization = (totalCargoWeight / selectedContainer.payload) * 100;

        return {
            totalCargoVolume,
            totalCargoWeight,
            volumeUtilization,
            weightUtilization,
            volumeExceeded: volumeUtilization > 100,
            weightExceeded: weightUtilization > 100,
        };
    }, [selectedContainer, cargoItems]);

    const ProgressBar: React.FC<{label: string, value: number, exceeded: boolean}> = ({label, value, exceeded}) => {
        const displayValue = Math.min(value, 100);
        const barColor = exceeded ? 'bg-red-500' : 'bg-green-500';
        return (
             <div>
                <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-medium text-slate-300">{label}</span>
                    <span className={`text-sm font-bold ${exceeded ? 'text-red-400' : 'text-white'}`}>{value.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2.5">
                    <div className={`${barColor} h-2.5 rounded-full`} style={{ width: `${displayValue}%` }}></div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Load & Stuffing Calculator
                        </h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500">
                           Plan your shipment by selecting a container and adding your cargo items to perform a volumetric and weight analysis.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Cargo Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Container Selection */}
                            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                                <h2 className="text-xl font-bold mb-4 text-gray-800">1. Select Container</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {CONTAINER_DATA.map(container => (
                                        <button 
                                            key={container.id} 
                                            onClick={() => setSelectedContainer(container)}
                                            className={`p-4 rounded-lg border-2 text-center transition ${selectedContainer?.id === container.id ? 'bg-green-100 border-green-500 shadow-lg' : 'bg-white border-gray-300 hover:border-green-400'}`}
                                        >
                                            <span className="font-bold text-gray-900">{container.name}</span>
                                            <span className="text-xs text-gray-500 block">{container.volume} m³ / {(container.payload / 1000).toFixed(1)}t</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Cargo Items List */}
                             <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">2. Define Cargo Items</h2>
                                    <button onClick={handleAddCargoItem} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">
                                        + Add Item
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {cargoItems.map((item, index) => (
                                        <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                                            <div className="md:col-span-6 flex items-center gap-2">
                                                <BoxIcon className="h-5 w-5 text-gray-400"/>
                                                <input 
                                                    type="text" 
                                                    value={item.name} 
                                                    onChange={e => handleUpdateCargoItem(item.id, 'name', e.target.value)} 
                                                    className="font-bold text-gray-800 text-lg w-full p-1 -ml-1 rounded focus:bg-gray-100 focus:outline-none"
                                                />
                                            </div>
                                            {/* Dimensions */}
                                            <div>
                                                <label className="text-xs text-gray-500">Length (mm)</label>
                                                <input type="number" value={item.length} onChange={e => handleUpdateCargoItem(item.id, 'length', e.target.value)} className="w-full border-b p-1 text-sm focus:outline-none focus:border-green-500" />
                                            </div>
                                             <div>
                                                <label className="text-xs text-gray-500">Width (mm)</label>
                                                <input type="number" value={item.width} onChange={e => handleUpdateCargoItem(item.id, 'width', e.target.value)} className="w-full border-b p-1 text-sm focus:outline-none focus:border-green-500" />
                                            </div>
                                             <div>
                                                <label className="text-xs text-gray-500">Height (mm)</label>
                                                <input type="number" value={item.height} onChange={e => handleUpdateCargoItem(item.id, 'height', e.target.value)} className="w-full border-b p-1 text-sm focus:outline-none focus:border-green-500" />
                                            </div>
                                            {/* Weight & Quantity */}
                                             <div>
                                                <label className="text-xs text-gray-500">Weight (kg)</label>
                                                <input type="number" value={item.weight} onChange={e => handleUpdateCargoItem(item.id, 'weight', e.target.value)} className="w-full border-b p-1 text-sm focus:outline-none focus:border-green-500" />
                                            </div>
                                             <div>
                                                <label className="text-xs text-gray-500">Quantity</label>
                                                <input type="number" value={item.quantity} onChange={e => handleUpdateCargoItem(item.id, 'quantity', e.target.value)} className="w-full border-b p-1 text-sm focus:outline-none focus:border-green-500" />
                                            </div>
                                            {/* Actions */}
                                            <div className="text-right">
                                                <button onClick={() => handleRemoveCargoItem(item.id)} className="text-gray-400 hover:text-red-500 p-1 rounded-full">
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Results */}
                        <div className="lg:col-span-1">
                             <div className="bg-slate-800 text-white p-6 md:p-8 rounded-lg shadow-lg h-full sticky top-24">
                                <h3 className="text-xl font-bold mb-4 border-b border-slate-600 pb-2">Calculation Summary</h3>
                                {selectedContainer && calculationResults ? (
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-lg font-semibold text-green-400">{selectedContainer.name}</h4>
                                            <p className="text-sm text-slate-400">Capacity: {selectedContainer.volume} m³ / {selectedContainer.payload.toLocaleString()} kg</p>
                                        </div>
                                        <ProgressBar label="Volume Utilization" value={calculationResults.volumeUtilization} exceeded={calculationResults.volumeExceeded} />
                                        <ProgressBar label="Weight Utilization" value={calculationResults.weightUtilization} exceeded={calculationResults.weightExceeded} />
                                        
                                        <div className="pt-4 border-t border-slate-600">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-300">Total Cargo Volume:</span>
                                                <span className="font-semibold text-white">{calculationResults.totalCargoVolume.toFixed(2)} m³</span>
                                            </div>
                                             <div className="flex justify-between text-sm mt-1">
                                                <span className="text-slate-300">Total Cargo Weight:</span>
                                                <span className="font-semibold text-white">{calculationResults.totalCargoWeight.toLocaleString()} kg</span>
                                            </div>
                                        </div>

                                        {(calculationResults.volumeExceeded || calculationResults.weightExceeded) && (
                                            <div className="p-3 bg-red-500/20 text-red-300 text-sm rounded-md">
                                                <p className="font-bold">Warning!</p>
                                                {calculationResults.volumeExceeded && <p>- Cargo volume exceeds container capacity.</p>}
                                                {calculationResults.weightExceeded && <p>- Cargo weight exceeds container payload.</p>}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center text-slate-400 pt-10">
                                        <p>Select a container to see the calculation summary.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                     <div className="text-center mt-12 text-sm text-gray-500">
                        <p className="font-semibold">Disclaimer:</p>
                        <p className="max-w-3xl mx-auto">
                            This calculator provides a volumetric and weight-based estimate. It does not account for complex stuffing logic, item rotation, or wasted space between items. It should be used as a preliminary planning tool.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadCalculatorPage;
