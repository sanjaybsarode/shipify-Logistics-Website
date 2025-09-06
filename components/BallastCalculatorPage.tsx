import React, { useState, useMemo } from 'react';
import TrashIcon from './icons/TrashIcon';
import PlusIcon from './icons/PlusIcon';
import RefreshCcwIcon from './icons/RefreshCcwIcon';

// Helper to handle numeric inputs safely
const num = (v: string | number) => {
    const n = typeof v === 'string' ? parseFloat(v) : v;
    return isFinite(n) ? n : 0;
};

// Initial state for a single weight item
const createWeightItem = (name: string) => ({
    id: Date.now() + Math.random(),
    name,
    weight: 0,
    lcg: 0,
    tcg: 0,
    vcg: 0,
});

const initialState = {
    vessel: { name: 'Sample Barge', lbp: 120, breadth: 30, lightship: 4500, lcg: 65, tcg: 0, vcg: 8 },
    hydrostatics: { waterDensity: 1.025, tpc: 25, mctc: 350, lcf: 62, km_t: 15, km_l: 180 },
    cargo: [ { id: 1, name: 'Main Module', weight: 1500, lcg: 60, tcg: 2, vcg: 15 } ],
    ballast: [ { id: 2, name: 'FWT(P)', weight: 50, lcg: 113, tcg: -7.6, vcg: 1 } ],
};


const BallastCalculatorPage: React.FC = () => {
    const [vessel, setVessel] = useState(initialState.vessel);
    const [hydrostatics, setHydrostatics] = useState(initialState.hydrostatics);
    const [cargo, setCargo] = useState(initialState.cargo);
    const [ballast, setBallast] = useState(initialState.ballast);

    const handleReset = () => {
        setVessel(initialState.vessel);
        setHydrostatics(initialState.hydrostatics);
        setCargo(initialState.cargo);
        setBallast(initialState.ballast);
    };
    
    // Generic update handlers
    const updateVessel = (field: keyof typeof vessel, value: string) => setVessel(v => ({...v, [field]: value}));
    const updateHydro = (field: keyof typeof hydrostatics, value: string) => setHydrostatics(h => ({...h, [field]: value}));
    const updateItem = (setter: React.Dispatch<React.SetStateAction<any[]>>, id: number, field: string, value: string) => {
        setter(items => items.map(item => item.id === id ? {...item, [field]: value} : item));
    };
    
    const results = useMemo(() => {
        const allItems = [
            {...vessel, weight: vessel.lightship},
            ...cargo,
            ...ballast
        ].map(item => ({
            weight: num(item.weight),
            lcg: num(item.lcg),
            tcg: num(item.tcg),
            vcg: num(item.vcg),
        }));

        const totalWeight = allItems.reduce((sum, item) => sum + item.weight, 0);
        if (totalWeight === 0) return null;

        const totalLMom = allItems.reduce((sum, item) => sum + item.weight * item.lcg, 0);
        const totalTMom = allItems.reduce((sum, item) => sum + item.weight * item.tcg, 0);
        const totalVMom = allItems.reduce((sum, item) => sum + item.weight * item.vcg, 0);

        const finalLCG = totalLMom / totalWeight;
        const finalTCG = totalTMom / totalWeight;
        const finalVCG = totalVMom / totalWeight;

        const trimMoment = totalWeight * (finalLCG - num(hydrostatics.lcf));
        const totalTrim_cm = trimMoment / num(hydrostatics.mctc);
        const totalTrim_m = totalTrim_cm / 100;
        
        const heelMoment = totalWeight * finalTCG;
        // Simplified heel calculation: Heel Angle (rad) ≈ TCG / GMt. More accurate requires cross curves.
        // Let's use moments. Heel Moment = Disp * TCG * cos(heel). Small angle: Heel Moment = Disp * GZ where GZ = TCG
        // This is complex. A simple approach: Transverse Moment / (Displacement * GMt).
        const gm_t = num(hydrostatics.km_t) - finalVCG;
        const heelAngle_rad = gm_t > 0 ? Math.atan(finalTCG / gm_t) : (finalTCG === 0 ? 0 : Math.PI / 2 * Math.sign(finalTCG));
        const heelAngle_deg = heelAngle_rad * 180 / Math.PI;

        const gm_l = num(hydrostatics.km_l) - finalVCG;
        
        const isStable = gm_t > 0.15; // Common minimum for safety

        return {
            displacement: totalWeight, finalLCG, finalTCG, finalVCG,
            trimMoment, totalTrim_m, heelAngle_deg, gm_t, gm_l, isStable
        };
    }, [vessel, hydrostatics, cargo, ballast]);
    
    const renderWeightList = (
        title: string,
        items: any[],
        setter: React.Dispatch<React.SetStateAction<any[]>>,
    ) => (
         <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <button onClick={() => setter(prev => [...prev, createWeightItem('New Item')])} className="flex items-center gap-1 text-sm bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-md hover:bg-green-200">
                    <PlusIcon className="h-4 w-4" /> Add
                </button>
            </div>
            <div className="space-y-3">
                {items.map((item, index) => (
                     <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end p-3 bg-gray-50 rounded-md border">
                        <div className="md:col-span-2"><Input label="Name" value={item.name} onChange={e => updateItem(setter, item.id, 'name', e.target.value)} /></div>
                        <div><Input label="Weight (t)" type="number" value={item.weight} onChange={e => updateItem(setter, item.id, 'weight', e.target.value)} /></div>
                        <div><Input label="LCG (m)" type="number" value={item.lcg} onChange={e => updateItem(setter, item.id, 'lcg', e.target.value)} /></div>
                        <div><Input label="TCG (m)" type="number" value={item.tcg} onChange={e => updateItem(setter, item.id, 'tcg', e.target.value)} /></div>
                        <div className="flex items-center gap-2">
                           <div className="flex-grow"><Input label="VCG (m)" type="number" value={item.vcg} onChange={e => updateItem(setter, item.id, 'vcg', e.target.value)} /></div>
                            <button onClick={() => setter(i => i.filter(x => x.id !== item.id))} className="text-gray-400 hover:text-red-500 p-1 mb-1">
                                <TrashIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-12 md:py-16">
                 <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Ballast & Stability Calculator</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500">Perform preliminary stability and trim calculations by defining weights and vessel data.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                        {/* INPUTS */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-gray-800">Vessel & Hydrostatics</h3>
                                    <button onClick={handleReset} className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
                                        <RefreshCcwIcon className="h-4 w-4"/> Reset
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <Input label="Vessel Name" value={vessel.name} onChange={e => updateVessel('name', e.target.value)} />
                                    <Input label="LBP (m)" type="number" value={vessel.lbp} onChange={e => updateVessel('lbp', e.target.value)} />
                                    <Input label="Breadth (m)" type="number" value={vessel.breadth} onChange={e => updateVessel('breadth', e.target.value)} />
                                    <Input label="Water Density (t/m³)" type="number" value={hydrostatics.waterDensity} onChange={e => updateHydro('waterDensity', e.target.value)} />
                                    <Input label="Lightship (t)" type="number" value={vessel.lightship} onChange={e => updateVessel('lightship', e.target.value)} />
                                    <Input label="LS LCG (m)" type="number" value={vessel.lcg} onChange={e => updateVessel('lcg', e.target.value)} />
                                    <Input label="LS TCG (m)" type="number" value={vessel.tcg} onChange={e => updateVessel('tcg', e.target.value)} />
                                    <Input label="LS VCG (m)" type="number" value={vessel.vcg} onChange={e => updateVessel('vcg', e.target.value)} />
                                    <Input label="TPC (t/cm)" type="number" value={hydrostatics.tpc} onChange={e => updateHydro('tpc', e.target.value)} />
                                    <Input label="MCTC (t-m/cm)" type="number" value={hydrostatics.mctc} onChange={e => updateHydro('mctc', e.target.value)} />
                                    <Input label="LCF (m)" type="number" value={hydrostatics.lcf} onChange={e => updateHydro('lcf', e.target.value)} />
                                    <Input label="KMt (m)" type="number" value={hydrostatics.km_t} onChange={e => updateHydro('km_t', e.target.value)} />
                                    <Input label="KMl (m)" type="number" value={hydrostatics.km_l} onChange={e => updateHydro('km_l', e.target.value)} />
                                </div>
                            </div>
                            {renderWeightList("Cargo Items", cargo, setCargo)}
                            {renderWeightList("Ballast & Consumables", ballast, setBallast)}
                        </div>

                        {/* RESULTS */}
                        <div className="lg:col-span-2 sticky top-24">
                            <div className="bg-slate-800 text-white p-6 md:p-8 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold mb-4 border-b border-slate-600 pb-2">Calculation Summary</h3>
                                {results ? (
                                    <div className="space-y-4">
                                        <ResultRow label="Total Displacement" value={`${results.displacement.toFixed(2)} t`} />
                                        <ResultRow label="Final LCG" value={`${results.finalLCG.toFixed(3)} m`} />
                                        <ResultRow label="Final TCG" value={`${results.finalTCG.toFixed(3)} m`} />
                                        <ResultRow label="Final VCG" value={`${results.finalVCG.toFixed(3)} m`} />
                                        <ResultRow label="Total Trim" value={`${results.totalTrim_m.toFixed(3)} m (${results.totalTrim_m > 0 ? 'By Stern' : 'By Head'})`} />
                                        <ResultRow label="Heel Angle" value={`${results.heelAngle_deg.toFixed(2)}° (${results.heelAngle_deg > 0 ? 'to STBD' : 'to PORT'})`} />
                                        <div className="pt-4 border-t border-slate-600"/>
                                        <ResultRow label="GMt (Transverse)" value={`${results.gm_t.toFixed(3)} m`} />
                                        <ResultRow label="GMl (Longitudinal)" value={`${results.gm_l.toFixed(3)} m`} />
                                        <div className={`mt-4 p-3 rounded-md text-center font-bold ${results.isStable ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                            VESSEL IS {results.isStable ? 'STABLE' : 'UNSTABLE'}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-slate-400 text-center py-8">Enter weight data to see results.</p>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-4 text-center">Disclaimer: This is a simplified tool for preliminary planning. Do not use for navigation or actual loading operations without professional verification.</p>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    );
};

const Input: React.FC<any> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <input {...props} className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500" />
    </div>
);

const ResultRow: React.FC<{label: string, value: string}> = ({label, value}) => (
    <div className="flex justify-between text-sm">
        <span className="text-slate-300">{label}:</span>
        <span className="font-semibold font-mono text-white">{value}</span>
    </div>
);

export default BallastCalculatorPage;
