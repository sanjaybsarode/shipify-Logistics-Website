import React, { useState, useMemo } from 'react';
import { Tariff, Quote, CargoType } from '../types';
import { getDistanceInNauticalMiles } from '../utils/distance';
import { getContainerPrices, ContainerPrices, getGeneralCargoRates, getODCRates } from '../services/pricingService';

type ContainerTypeValue = keyof ContainerPrices;

interface FreightQuotePageProps {
    seaPorts: Tariff[];
    onRequestQuote: (quote: Quote) => void;
}

const FreightQuotePage: React.FC<FreightQuotePageProps> = ({ seaPorts, onRequestQuote }) => {
    const [cargoType, setCargoType] = useState<CargoType>('Container');
    
    // State for Container form
    const [originPortId, setOriginPortId] = useState(() => seaPorts.length > 0 ? seaPorts[0].id : '');
    const [destinationPortId, setDestinationPortId] = useState(() => seaPorts.length > 1 ? seaPorts[1].id : '');
    const [containerType, setContainerType] = useState<ContainerTypeValue>('20_standard');
    const [containerPrices] = useState<ContainerPrices>(getContainerPrices());

    // State for General Cargo / ODC form
    const [weight, setWeight] = useState(50); // in MT
    const [length, setLength] = useState(12); // in m
    const [width, setWidth] = useState(2.5); // in m
    const [height, setHeight] = useState(2.5); // in m

    // Fetch rates for GC and ODC
    const [generalCargoRates] = useState(getGeneralCargoRates());
    const [odcRates] = useState(getODCRates());

    const quoteResult = useMemo((): Quote | null => {
        const originPort = seaPorts.find(p => p.id === originPortId);
        const destinationPort = seaPorts.find(p => p.id === destinationPortId);

        if (!originPort || !destinationPort || originPort.id === destinationPort.id) {
            return null;
        }

        const distance = getDistanceInNauticalMiles(originPort.lat!, originPort.lon!, destinationPort.lat!, destinationPort.lon!);

        if (cargoType === 'Container') {
            const priceInfo = containerPrices[containerType];
            const price = distance * priceInfo.pricePerNm;
            return {
                cargoType: 'Container',
                originName: originPort.name,
                destinationName: destinationPort.name,
                distance: Math.round(distance),
                price: Math.round(price),
                containerLabel: priceInfo.label,
                containerPricePerNm: priceInfo.pricePerNm,
                priceBreakdown: `Based on ${priceInfo.label} at $${priceInfo.pricePerNm}/NM`
            };
        }
        
        if (cargoType === 'GeneralCargo' || cargoType === 'ODC') {
             if (weight <= 0) return null;

             const volume = length * width * height; // CBM
             const chargeableWeight = Math.max(weight, volume); // FRT

             const rates = cargoType === 'GeneralCargo' ? generalCargoRates : odcRates;
             const basePrice = distance * chargeableWeight * rates.pricePerFrtPerNm;
             let surcharge = 0;
             
             let frtBreakdown = `Chargeable FRT: max(Volume: ${volume.toFixed(2)} CBM, Weight: ${weight} MT) = ${chargeableWeight.toFixed(2)} FRT`;
             let priceBreakdown = `${frtBreakdown}\nPrice: ${chargeableWeight.toFixed(2)} FRT * $${rates.pricePerFrtPerNm}/FRT/NM`;
             
             // Surcharge is based on ACTUAL weight for ODC
             if (cargoType === 'ODC' && weight > odcRates.weightSurchargeThresholdMT) {
                 const overweight = weight - odcRates.weightSurchargeThresholdMT;
                 surcharge = overweight * odcRates.surchargePerTonOverThreshold;
                 priceBreakdown += `\nODC Surcharge: (${overweight.toFixed(1)} MT over threshold) * $${odcRates.surchargePerTonOverThreshold}/Ton`;
             }

             const finalPrice = basePrice + surcharge;

             return {
                cargoType,
                originName: originPort.name,
                destinationName: destinationPort.name,
                distance: Math.round(distance),
                price: Math.round(finalPrice),
                cargoWeight: weight,
                cargoLength: length,
                cargoWidth: width,
                cargoHeight: height,
                volume: volume,
                chargeableWeight: chargeableWeight,
                priceBreakdown
            };
        }

        return null;

    }, [originPortId, destinationPortId, containerType, seaPorts, containerPrices, cargoType, weight, length, width, height, generalCargoRates, odcRates]);
    
    const SelectField = ({ label, value, onChange, options, disabledOption = '' }: { label:string; value:string; onChange:(val:string)=>void; options:Tariff[]; disabledOption?:string }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            >
                {options.map(port => (
                    <option key={port.id} value={port.id} disabled={port.id === disabledOption}>
                        {port.name}, {port.country}
                    </option>
                ))}
            </select>
        </div>
    );
    
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Instant Freight Quote
                        </h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500">
                           Select your cargo type, route, and specifications to get an instant, estimated quote.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Form Section */}
                        <div className="lg:col-span-3 bg-gray-50 p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
                            <div className="space-y-6">
                                {/* Cargo Type Selector */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Cargo Type</label>
                                    <div className="grid grid-cols-3 gap-2 rounded-lg bg-gray-200 p-1">
                                        {(['Container', 'GeneralCargo', 'ODC'] as CargoType[]).map(type => (
                                            <button 
                                                key={type}
                                                onClick={() => setCargoType(type)}
                                                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${cargoType === type ? 'bg-white text-green-700 shadow' : 'text-gray-600 hover:bg-white/50'}`}
                                            >
                                                {type === 'GeneralCargo' ? 'General' : type === 'ODC' ? 'ODC (>40t)' : type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <SelectField label="Origin Port" value={originPortId} onChange={setOriginPortId} options={seaPorts} disabledOption={destinationPortId} />
                                <SelectField label="Destination Port" value={destinationPortId} onChange={setDestinationPortId} options={seaPorts} disabledOption={originPortId} />
                                
                                {/* Conditional Form Inputs */}
                                {cargoType === 'Container' && (
                                     <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Container Type</label>
                                        <select
                                            value={containerType}
                                            onChange={(e) => setContainerType(e.target.value as ContainerTypeValue)}
                                            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            {Object.entries(containerPrices).map(([key, { label }]) => (
                                                <option key={key} value={key}>{label}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {(cargoType === 'GeneralCargo' || cargoType === 'ODC') && (
                                    <div className="space-y-4 pt-2 border-t">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Weight (MT)</label>
                                                <input type="number" value={weight} onChange={e => setWeight(parseFloat(e.target.value) || 0)} className="w-full bg-white border border-gray-300 rounded-md p-2" min="0"/>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Length (m)</label>
                                                <input type="number" value={length} onChange={e => setLength(parseFloat(e.target.value) || 0)} className="w-full bg-white border border-gray-300 rounded-md p-2" min="0"/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Width (m)</label>
                                                <input type="number" value={width} onChange={e => setWidth(parseFloat(e.target.value) || 0)} className="w-full bg-white border border-gray-300 rounded-md p-2" min="0"/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Height (m)</label>
                                                <input type="number" value={height} onChange={e => setHeight(parseFloat(e.target.value) || 0)} className="w-full bg-white border border-gray-300 rounded-md p-2" min="0"/>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="lg:col-span-2">
                            <div className="bg-slate-800 text-white p-6 md:p-8 rounded-lg shadow-lg h-full sticky top-24">
                                <h3 className="text-xl font-bold mb-4 border-b border-slate-600 pb-2">Your Instant Quote</h3>
                                {quoteResult ? (
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-slate-300">Route:</p>
                                        <p className="text-lg font-semibold">{quoteResult.originName} to {quoteResult.destinationName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-300">Estimated Sea Distance:</p>
                                        <p className="text-lg font-semibold text-white">{quoteResult.distance.toLocaleString()} NM</p>
                                    </div>
                                    <div className="pt-4 border-t border-slate-600">
                                        <p className="text-md text-green-300">Estimated Freight Price:</p>
                                        <p className="text-4xl font-extrabold text-green-400 my-1">
                                            ${quoteResult.price.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-slate-400 whitespace-pre-wrap">
                                            {quoteResult.priceBreakdown}
                                        </p>
                                    </div>

                                    <div className="pt-4">
                                        <button 
                                            onClick={() => onRequestQuote(quoteResult)}
                                            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-sm hover:bg-green-600 transition-colors"
                                        >
                                            Request Official Quote
                                        </button>
                                    </div>

                                </div>
                                ) : (
                                <div className="text-center text-slate-400 pt-10">
                                    <p>Select a valid route and enter cargo details to generate a quote.</p>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                     <div className="text-center mt-12 text-sm text-gray-500">
                        <p className="font-semibold">Disclaimer:</p>
                        <p className="max-w-2xl mx-auto">
                            This quote is an estimate for port-to-port ocean freight charges only. It does not include terminal handling charges, customs fees, duties, taxes, or land transport. Prices are subject to change.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreightQuotePage;