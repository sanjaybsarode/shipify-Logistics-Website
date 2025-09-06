import React, { useState, useMemo } from 'react';
import RefreshCcwIcon from './icons/RefreshCcwIcon';

// --- Helper Functions ---
const num = (v: any): number => {
    const n = typeof v === 'string' ? parseFloat(v) : v;
    return isFinite(n) ? n : 0;
};
const knots_to_mps = (knots: number): number => knots * 0.514444;

const initialState = {
    vessel: { loa: 150, breadth: 25, draft: 8, freeboard: 6 },
    environment: { windSpeed_knots: 30, currentSpeed_knots: 2 },
    mooring: { mbl: 500, numLines: 12, safetyFactor: 1.5 },
};

const MooringCalculatorPage: React.FC = () => {
    const [vessel, setVessel] = useState(initialState.vessel);
    const [environment, setEnvironment] = useState(initialState.environment);
    const [mooring, setMooring] = useState(initialState.mooring);
    
    const handleReset = () => {
        setVessel(initialState.vessel);
        setEnvironment(initialState.environment);
        setMooring(initialState.mooring);
    };

    const updateVessel = (field: keyof typeof vessel, value: string) => setVessel(v => ({...v, [field]: num(value)}));
    const updateEnv = (field: keyof typeof environment, value: string) => setEnvironment(e => ({...e, [field]: num(value)}));
    const updateMooring = (field: keyof typeof mooring, value: string) => setMooring(m => ({...m, [field]: num(value)}));

    const results = useMemo(() => {
        const { loa, breadth, draft, freeboard } = vessel;
        const { windSpeed_knots, currentSpeed_knots } = environment;
        const { mbl, numLines, safetyFactor } = mooring;
        
        // --- Constants ---
        const RHO_AIR = 1.225; // kg/m^3
        const RHO_WATER = 1025; // kg/m^3
        const Cw_long = 0.8; // Wind coeff longitudinal
        const Cw_trans = 1.2; // Wind coeff transverse
        const Cc_long = 0.1; // Current coeff longitudinal
        const Cc_trans = 0.8; // Current coeff transverse

        // --- Area Calculations ---
        const A_wind_long = breadth * freeboard; // Simplified
        const A_wind_trans = loa * freeboard;
        const A_current_long = breadth * draft;
        const A_current_trans = loa * draft;
        
        // --- Force Calculations (in Newtons) ---
        const v_wind_mps = knots_to_mps(windSpeed_knots);
        const v_current_mps = knots_to_mps(currentSpeed_knots);

        const F_wind_long = 0.5 * Cw_long * RHO_AIR * Math.pow(v_wind_mps, 2) * A_wind_long;
        const F_wind_trans = 0.5 * Cw_trans * RHO_AIR * Math.pow(v_wind_mps, 2) * A_wind_trans;
        const F_current_long = 0.5 * Cc_long * RHO_WATER * Math.pow(v_current_mps, 2) * A_current_long;
        const F_current_trans = 0.5 * Cc_trans * RHO_WATER * Math.pow(v_current_mps, 2) * A_current_trans;
        
        const total_force_long_kN = (F_wind_long + F_current_long) / 1000;
        const total_force_trans_kN = (F_wind_trans + F_current_trans) / 1000;
        
        // --- Mooring Capacity ---
        const line_swl_kN = mbl / (safetyFactor > 0 ? safetyFactor : 1);
        const total_capacity_kN = line_swl_kN * numLines;
        
        // Simplified check: assuming half lines for each direction
        const capacity_long_kN = total_capacity_kN / 2;
        const capacity_trans_kN = total_capacity_kN / 2;

        const util_long = capacity_long_kN > 0 ? (total_force_long_kN / capacity_long_kN) * 100 : Infinity;
        const util_trans = capacity_trans_kN > 0 ? (total_force_trans_kN / capacity_trans_kN) * 100 : Infinity;

        const isSafe = util_long <= 100 && util_trans <= 100;

        return {
            F_wind_long_kN: F_wind_long / 1000,
            F_wind_trans_kN: F_wind_trans / 1000,
            F_current_long_kN: F_current_long / 1000,
            F_current_trans_kN: F_current_trans / 1000,
            total_force_long_kN,
            total_force_trans_kN,
            line_swl_kN,
            total_capacity_kN,
            util_long,
            util_trans,
            isSafe,
        };
    }, [vessel, environment, mooring]);

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Mooring Line Calculator</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500">Calculate environmental forces and check the adequacy of your mooring arrangement.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                        {/* INPUTS */}
                        <div className="lg:col-span-3 space-y-6">
                             <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-gray-800">Inputs</h3>
                                    <button onClick={handleReset} className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
                                        <RefreshCcwIcon className="h-4 w-4"/> Reset
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-700">Vessel Particulars</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                            <Input label="LOA (m)" type="number" value={vessel.loa} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateVessel('loa', e.target.value)} />
                                            <Input label="Breadth (m)" type="number" value={vessel.breadth} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateVessel('breadth', e.target.value)} />
                                            <Input label="Draft (m)" type="number" value={vessel.draft} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateVessel('draft', e.target.value)} />
                                            <Input label="Freeboard (m)" type="number" value={vessel.freeboard} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateVessel('freeboard', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="border-t pt-6">
                                        <h4 className="font-semibold text-gray-700">Environmental Conditions</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                            <Input label="Wind Speed (knots)" type="number" value={environment.windSpeed_knots} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEnv('windSpeed_knots', e.target.value)} />
                                            <Input label="Current Speed (knots)" type="number" value={environment.currentSpeed_knots} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEnv('currentSpeed_knots', e.target.value)} />
                                        </div>
                                    </div>
                                     <div className="border-t pt-6">
                                        <h4 className="font-semibold text-gray-700">Mooring Line Specification</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                                            <Input label="Line MBL (kN)" type="number" value={mooring.mbl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateMooring('mbl', e.target.value)} />
                                            <Input label="Total Lines" type="number" value={mooring.numLines} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateMooring('numLines', e.target.value)} />
                                            <Input label="Safety Factor" type="number" value={mooring.safetyFactor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateMooring('safetyFactor', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>

                        {/* RESULTS */}
                        <div className="lg:col-span-2 sticky top-24">
                            <div className="bg-slate-800 text-white p-6 md:p-8 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold mb-4 border-b border-slate-600 pb-2">Calculation Results</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-green-300">Environmental Forces</h4>
                                        <ResultRow label="Wind Force (Longitudinal)" value={`${results.F_wind_long_kN.toFixed(2)} kN`} />
                                        <ResultRow label="Wind Force (Transverse)" value={`${results.F_wind_trans_kN.toFixed(2)} kN`} />
                                        <ResultRow label="Current Force (Longitudinal)" value={`${results.F_current_long_kN.toFixed(2)} kN`} />
                                        <ResultRow label="Current Force (Transverse)" value={`${results.F_current_trans_kN.toFixed(2)} kN`} />
                                    </div>
                                    <div className="border-t border-slate-600 pt-4">
                                         <ResultRow label="Total Longitudinal Force" value={`${results.total_force_long_kN.toFixed(2)} kN`} isBold={true} />
                                         <ResultRow label="Total Transverse Force" value={`${results.total_force_trans_kN.toFixed(2)} kN`} isBold={true} />
                                    </div>
                                     <div className="border-t border-slate-600 pt-4">
                                        <h4 className="font-semibold text-green-300">Mooring Analysis</h4>
                                        <ResultRow label="Line SWL" value={`${results.line_swl_kN.toFixed(2)} kN`} />
                                        <ResultRow label="Utilization (Longitudinal)" value={`${results.util_long.toFixed(1)} %`} />
                                        <ResultRow label="Utilization (Transverse)" value={`${results.util_trans.toFixed(1)} %`} />
                                    </div>
                                    <div className={`mt-4 p-3 rounded-md text-center font-bold text-lg ${results.isSafe ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                        MOORING STATUS: {results.isSafe ? 'SAFE' : 'UNSAFE'}
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-4 text-center">Disclaimer: This calculator is for preliminary estimation only, based on simplified assumptions (e.g., forces are perpendicular, lines are evenly distributed). It is not a substitute for professional mooring analysis software or expert judgment.</p>
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

const ResultRow: React.FC<{label: string, value: string, isBold?: boolean}> = ({label, value, isBold}) => (
    <div className={`flex justify-between text-sm ${isBold ? 'mt-2' : ''}`}>
        <span className={`text-slate-300 ${isBold ? 'font-bold' : ''}`}>{label}:</span>
        <span className={`font-mono text-white ${isBold ? 'font-extrabold text-lg' : 'font-semibold'}`}>{value}</span>
    </div>
);


export default MooringCalculatorPage;