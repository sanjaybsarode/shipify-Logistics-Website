import React, { useMemo, useState } from 'react';
import AlertCircleIcon from './icons/AlertCircleIcon';
import CheckCircle2Icon from './icons/CheckCircle2Icon';
import RefreshCcwIcon from './icons/RefreshCcwIcon';

// --- Formula (from user's Excel):
// Rt = { [ (Δ^(2/3) * (v^3 / (120 * 60)) ] + (0.06 * B * D1) } * K    (tonnes)
// BP_eff = (Rt / η) * 100, where η is tug efficiency in percent (e.g., 75)
// If Tow by Stern -> Final BP = BP_eff * 1.2 (20% increase)
// Compare Final BP vs Actual Tug BP to show SATISFIED / NOT SATISFIED.

// Helper number utils
const num = (v: number | string) => {
  const n = typeof v === 'string' ? parseFloat(v) : v;
  return Number.isFinite(n) ? n : 0;
};
const round2 = (v: number) => Math.round(v * 100) / 100;

// Preset weather profiles matching the sheet
const WEATHER_PRESETS = {
  Good: { v: 4, K: 1 },
  Rough: { v: 3, K: 1.5 },
  Extreme: { v: 1, K: 2 },
} as const;

const BollardPullPage: React.FC = () => {
    const initialInputs = {
        bargeName: "Barge",
        L: 120,
        B: 40,
        displacement: 4000,
        D: 6,
        d: 0,
        H: 8,
        D1: 14,
        efficiency: 75,
        towByStern: false,
        actualTugBP: 70,
        v: 3,
        K: 1.5,
        preset: "Rough" as keyof typeof WEATHER_PRESETS | "Custom",
    };
  const [inputs, setInputs] = useState(initialInputs);

  const onField = (key: keyof typeof inputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputs((s) => ({ ...s, [key]: value === '' ? '' : Number(value) }));
  };
  
  const applyPreset = (key: keyof typeof WEATHER_PRESETS | "Custom") => {
    if (key === "Custom") return setInputs((s) => ({ ...s, preset: key }));
    const p = WEATHER_PRESETS[key];
    setInputs((s) => ({ ...s, preset: key, v: p.v, K: p.K }));
  };

  // Core calculation (single scenario)
  const calc = (v: number, K: number) => {
    const Δ = num(inputs.displacement);
    const B = num(inputs.B);
    const D1 = num(inputs.D1);
    const η = Math.max(1e-6, num(inputs.efficiency));

    const term1 = Math.pow(Δ, 2 / 3) * (Math.pow(v, 3) / (120 * 60));
    const term2 = 0.06 * B * D1;
    const Rt = (term1 + term2) * K;
    const BP_eff = (Rt / η) * 100;
    const BP_final = inputs.towByStern ? BP_eff * 1.2 : BP_eff;
    return { term1, term2, Rt, BP_eff, BP_final };
  };

  const scenarios = useMemo(() => {
    const list: Array<{ label: string; v: number; K: number } & ReturnType<typeof calc>> = [];
    (Object.keys(WEATHER_PRESETS) as Array<keyof typeof WEATHER_PRESETS>).forEach((key) => {
      const { v, K } = WEATHER_PRESETS[key];
      list.push({ label: key, v, K, ...calc(v, K) });
    });
    if (inputs.preset === "Custom") list.push({ label: "Custom", v: num(inputs.v), K: num(inputs.K), ...calc(num(inputs.v), num(inputs.K)) });
    return list;
  }, [inputs]);

  const custom = useMemo(() => calc(num(inputs.v), num(inputs.K)), [inputs]);
  
  const status = (bpFinal: number) => {
    const ok = num(inputs.actualTugBP) >= bpFinal;
    return ok ? (
      <div className="flex items-center gap-2 font-semibold text-green-600"><CheckCircle2Icon className="h-5 w-5"/> SATISFIED</div>
    ) : (
      <div className="flex items-center gap-2 font-semibold text-red-600"><AlertCircleIcon className="h-5 w-5"/> NOT SATISFIED</div>
    );
  };

  return (
    <div className="bg-gray-50">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bollard Pull Calculator</h1>
            <p className="text-md text-gray-500">Empirical method with presets for various weather & speed conditions.</p>
          </div>
          <button onClick={() => setInputs(initialInputs)} className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border rounded-md px-3 py-2 hover:bg-gray-100 transition">
            <RefreshCcwIcon className="h-4 w-4"/>Reset
          </button>
        </div>

        {/* Inputs Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Barge & Geometry */}
            <div className="md:col-span-2 space-y-4">
              <label className="block text-sm font-medium text-gray-700">Barge name</label>
              <input value={inputs.bargeName} onChange={(e) => setInputs(s => ({...s, bargeName: e.target.value}))} className="w-full border-b p-1 text-sm focus:outline-none focus:border-green-500" />
              <div className="grid grid-cols-2 gap-4 pt-2">
                <Input label="Length L (m)" value={inputs.L} onChange={onField('L')} />
                <Input label="Breadth B (m)" value={inputs.B} onChange={onField('B')} />
                <Input label="Displacement Δ (t)" value={inputs.displacement} onChange={onField('displacement')} />
                <Input label="Exposed Height D1 (m)" value={inputs.D1} onChange={onField('D1')} />
                <Input label="Depth D (m)" value={inputs.D} onChange={onField('D')} />
                <Input label="Draft d (m)" value={inputs.d} onChange={onField('d')} />
                <Input label="Cargo Height H (m)" value={inputs.H} onChange={onField('H')} />
              </div>
            </div>

            {/* Efficiency & Tow Mode */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Tug efficiency η (%)</label>
              <input type="range" value={inputs.efficiency} min={10} max={100} step={1} onChange={(e) => setInputs(s => ({...s, efficiency: Number(e.target.value)}))} className="w-full" />
              <div className="text-sm text-gray-500 mt-1 text-center">{inputs.efficiency}%</div>
              
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Tow by stern?</label>
                  <p className="text-xs text-gray-500">Adds 20% to final BP</p>
                </div>
                <button onClick={() => setInputs(s => ({...s, towByStern: !s.towByStern}))} className={`w-12 h-6 rounded-full p-1 transition-colors ${inputs.towByStern ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <span className={`block w-4 h-4 rounded-full bg-white transform transition-transform ${inputs.towByStern ? 'translate-x-6' : 'translate-x-0'}`}></span>
                </button>
              </div>
              <Input label="Actual tug BP (t)" value={inputs.actualTugBP} onChange={onField('actualTugBP')} />
            </div>

            {/* Scenario */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Scenario</label>
              <select value={inputs.preset} onChange={(e) => applyPreset(e.target.value as any)} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="Good">Good (v=4 kn, K=1)</option>
                <option value="Rough">Rough (v=3 kn, K=1.5)</option>
                <option value="Extreme">Extreme (v=1 kn, K=2)</option>
                <option value="Custom">Custom</option>
              </select>
              <div className={`grid grid-cols-2 gap-4 pt-2 ${inputs.preset === 'Custom' ? '' : 'opacity-60 pointer-events-none'}`}>
                <Input label="Tow speed v (kn)" value={inputs.v} onChange={onField('v')} />
                <Input label="Weather factor K" value={inputs.K} step={0.1} onChange={onField('K')} />
              </div>
              <div className="rounded-lg border p-3 bg-gray-50">
                <div className="text-xs text-gray-500">Formula</div>
                <div className="text-xs font-mono break-words text-gray-700 mt-1">
                  Rt = ((Δ^(2/3)·v^3/7200) + 0.06·B·D1)·K
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-600">Scenario</th>
                  <th className="text-right p-3 font-medium text-gray-600">v (kn)</th>
                  <th className="text-right p-3 font-medium text-gray-600">K</th>
                  <th className="text-right p-3 font-medium text-gray-600">Term1</th>
                  <th className="text-right p-3 font-medium text-gray-600">Term2</th>
                  <th className="text-right p-3 font-medium text-gray-600">Rt (t)</th>
                  <th className="text-right p-3 font-medium text-gray-600">BP w/ η (t)</th>
                  <th className="text-right p-3 font-medium text-gray-600">Final BP (t)</th>
                  <th className="text-left p-3 font-medium text-gray-600">Status vs Actual ({inputs.actualTugBP} t)</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((s) => (
                  <tr key={s.label} className="border-t">
                    <td className="p-3 font-medium text-gray-800">{s.label}</td>
                    <td className="p-3 text-right text-gray-700">{s.v}</td>
                    <td className="p-3 text-right text-gray-700">{s.K}</td>
                    <td className="p-3 text-right font-mono text-gray-600">{round2(s.term1)}</td>
                    <td className="p-3 text-right font-mono text-gray-600">{round2(s.term2)}</td>
                    <td className="p-3 text-right font-mono text-gray-600">{round2(s.Rt)}</td>
                    <td className="p-3 text-right font-mono text-gray-600">{round2(s.BP_eff)}</td>
                    <td className="p-3 text-right font-bold text-gray-900">{round2(s.BP_final)}</td>
                    <td className="p-3">{status(s.BP_final)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input: React.FC<{label: string, value: any, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, step?: number}> = ({label, value, onChange, step}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type="number" step={step || 'any'} value={value} onChange={onChange} className="w-full border-b p-1 text-sm focus:outline-none focus:border-green-500 bg-transparent" />
    </div>
);

export default BollardPullPage;