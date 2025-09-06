
import React, { useMemo, useState } from "react";

/**
 * ⚓ Sea Fastening / Lashing Calculator (TSX)
 * - Mirrors your Excel UI structure
 * - Separate Transverse & Longitudinal sets (own MSL & angle)
 * - Friction considered against sliding per direction
 * - PLACEHOLDERS for motion force equations so you can wire the exact sheet formulas
 *
 * Styling: TailwindCSS
 */

// ----------------- Helpers -----------------
const deg2rad = (d: number) => (d * Math.PI) / 180;
const kNtoN = (kN: number) => kN * 1000;
const tonsToN = (tons: number, g: number) => tons * 1000 * g;

function lashingComponents(allowableN: number, angleDeg: number) {
  const a = deg2rad(angleDeg);
  const V = allowableN * Math.sin(a);
  const H = allowableN * Math.cos(a);
  return { V, H };
}

function bearingCapacity(sigmaB: number, faceWidthMM: number, faceHeightMM: number) {
  const A = Math.max(faceWidthMM, 0) * Math.max(faceHeightMM, 0); // mm^2
  return sigmaB * A; // N (σ * A)
}

function weldCapacitySimple(allowStress: number, throatMM: number, lengthMM: number) {
  // Simple fillet weld capacity ~ σ_allow * throat * total length (N)
  return allowStress * Math.max(throatMM, 0) * Math.max(lengthMM, 0);
}

function utilization(demand: number, capacity: number) {
  if (capacity <= 0) return { util: Infinity, ok: false };
  const u = demand / capacity;
  return { util: u, ok: u <= 1 };
}

function roundFmt(n: number) {
  if (!Number.isFinite(n)) return "—";
  return Math.round(n).toLocaleString();
}

// ----------------- Component -----------------
const SeaFasteningCalculatorPage: React.FC = () => {
  // Global
  const [g, setG] = useState(9.81);
  const [mu, setMu] = useState(0.30);
  const [sf, setSf] = useState(1.5); // safety factor applied to MSL

  // Material Property
  const [tPlate, setTPlate] = useState(22); // mm
  const [Fy, setFy] = useState(235); // N/mm^2 (not used directly in placeholder)
  const [sigmaB, setSigmaB] = useState(211); // N/mm^2
  const [tauAllow, setTauAllow] = useState(95); // N/mm^2
  const [sigmaBS, setSigmaBS] = useState(155); // N/mm^2
  const [weldAllow, setWeldAllow] = useState(140); // N/mm^2 (generic)

  // Cargo Details
  const [cargoTons, setCargoTons] = useState(894);
  const [L, setL] = useState(38.785);
  const [B, setB] = useState(11.35);
  const [H, setH] = useState(12.25);
  const [av, setAv] = useState(0.2); // heave vertical accel (m/s^2) placeholder

  // Wind
  const [windPressure, setWindPressure] = useState(0.8); // kN/m^2 placeholder
  const [windAreaTrans, setWindAreaTrans] = useState(80); // m^2 exposed (transverse)
  const [windAreaLong, setWindAreaLong] = useState(60); // m^2 exposed (longitudinal)

  // Motions (angles as placeholders)
  const [rollDeg, setRollDeg] = useState(20); // deg
  const [pitchDeg, setPitchDeg] = useState(5); // deg

  // Lashing details
  const [mslTrans_kN, setMslTrans_kN] = useState(200);
  const [angleTransDeg, setAngleTransDeg] = useState(45);
  const [mslLong_kN, setMslLong_kN] = useState(200);
  const [angleLongDeg, setAngleLongDeg] = useState(60);

  // Stoppers (face + weld)
  const [stopperFaceW, setStopperFaceW] = useState(200); // mm
  const [stopperFaceH, setStopperFaceH] = useState(150); // mm
  const [stopperWeldThroat, setStopperWeldThroat] = useState(5); // mm
  const [stopperWeldLength, setStopperWeldLength] = useState(300); // mm (sum)

  // Pad-eye details (geometry for bearing / shear / weld checks)
  const [padEyeLugT, setPadEyeLugT] = useState(40); // mm thickness
  const [padEyeHoleD, setPadEyeHoleD] = useState(100); // mm pin/hole dia
  const [padEyeWeldThroat, setPadEyeWeldThroat] = useState(6); // mm
  const [padEyeWeldLength, setPadEyeWeldLength] = useState(450); // mm

  // Wire rope / turnbuckle
  const [ropeMBL_kN, setRopeMBL_kN] = useState(800); // wire rope MBL
  const [turnbuckleMSL_kN, setTurnbuckleMSL_kN] = useState(160); // e.g., MKUUD1 3/4 x 180 (placeholder)

  const res = useMemo(() => {
    // Weight
    const W_N = tonsToN(cargoTons, g);

    // --- Placeholder motion/wind forces (replace with exact sheet equations) ---
    const F_roll_dyn = W_N * Math.sin(deg2rad(rollDeg)); // transverse from roll
    const F_pitch_dyn = W_N * Math.sin(deg2rad(pitchDeg)); // longitudinal from pitch
    const F_heave_dyn = W_N * av; // vertical/heave component (simplified)

    const F_wind_trans = kNtoN(windPressure) * windAreaTrans; // N (kN/m^2 * m^2 -> kN -> N)
    const F_wind_long = kNtoN(windPressure) * windAreaLong;

    // Total directional forces to restrain before friction (sum of components)
    const F_trans_total_raw = F_roll_dyn + F_wind_trans; // N
    const F_long_total_raw = F_pitch_dyn + F_wind_long; // N

    // Friction available against sliding (conservative against each dir)
    const R_fric = mu * Math.max(W_N - F_heave_dyn, 0);

    const F_trans_req = Math.max(0, F_trans_total_raw - R_fric);
    const F_long_req = Math.max(0, F_long_total_raw - R_fric);

    // Lashing allowables per direction (apply SF to MSL)
    const allowTrans = kNtoN(mslTrans_kN) / Math.max(sf, 1e-9);
    const allowLong = kNtoN(mslLong_kN) / Math.max(sf, 1e-9);

    const { H: Ht, V: Vt } = lashingComponents(allowTrans, angleTransDeg);
    const { H: Hl, V: Vl } = lashingComponents(allowLong, angleLongDeg);

    const reqLashTrans = F_trans_req > 0 ? Math.ceil(F_trans_req / Math.max(Ht, 1e-9)) : 0;
    const reqLashLong = F_long_req > 0 ? Math.ceil(F_long_req / Math.max(Hl, 1e-9)) : 0;

    // Residual forces after integer lashings (go to stoppers)
    const residTrans = Math.max(0, F_trans_req - reqLashTrans * Ht);
    const residLong = Math.max(0, F_long_req - reqLashLong * Hl);

    // Stopper capacities (bearing + weld; take min)
    const R_bear_stop = bearingCapacity(sigmaB, stopperFaceW, stopperFaceH);
    const R_weld_stop = weldCapacitySimple(weldAllow, stopperWeldThroat, stopperWeldLength);
    const R_stop_each = Math.min(R_bear_stop, R_weld_stop);

    const reqStopTrans = R_stop_each > 0 ? Math.ceil(residTrans / R_stop_each) : 0;
    const reqStopLong = R_stop_each > 0 ? Math.ceil(residLong / R_stop_each) : 0;

    // Saddles & pedestals – tripping moment (very simplified placeholder)
    // Assume tipping moment Mt ~ F_trans_total_raw * (H/2). Replace with exact.
    const Mt_trans = F_trans_total_raw * (H / 2);
    const R_weld_saddle = weldCapacitySimple(weldAllow, /*throat*/ 6, /*length*/ 1000);
    const uMt = utilization(Mt_trans, R_weld_saddle);

    // Pad-eye checks (indicative placeholders)
    const padEyeShearDemand = Math.max(Ht, Hl); // worst per-lashing horizontal
    const padEyeWeldCap = weldCapacitySimple(weldAllow, padEyeWeldThroat, padEyeWeldLength);
    const padEyeWeldUtil = utilization(padEyeShearDemand, padEyeWeldCap);

    // Bearing on pad eye lug at hole: σ ~ F / (t * d) (very rough). Replace with exact.
    const padEyeBearingCap = sigmaB * (padEyeLugT * padEyeHoleD);
    const padEyeBearUtil = utilization(padEyeShearDemand, padEyeBearingCap);

    // Shear at pad eye net section (rough): capacity ~ τ_allow * (t * (lug width at throat))
    // Without a width input, reuse t*d as indicative area
    const padEyeShearCap = tauAllow * (padEyeLugT * padEyeHoleD);
    const padEyeShearUtil = utilization(padEyeShearDemand, padEyeShearCap);

    // Turnbuckle check – compare allowable per lashing vs turnbuckle MSL/SF
    const allowTurnbuckle = kNtoN(turnbuckleMSL_kN) / Math.max(sf, 1e-9);
    const tbUtilTrans = utilization(Ht, allowTurnbuckle);
    const tbUtilLong = utilization(Hl, allowTurnbuckle);

    return {
      W_N,
      F_roll_dyn,
      F_pitch_dyn,
      F_heave_dyn,
      F_wind_trans,
      F_wind_long,
      F_trans_total_raw,
      F_long_total_raw,
      R_fric,
      F_trans_req,
      F_long_req,
      allowTrans,
      allowLong,
      Ht,
      Hl,
      Vt,
      Vl,
      reqLashTrans,
      reqLashLong,
      residTrans,
      residLong,
      R_bear_stop,
      R_weld_stop,
      R_stop_each,
      reqStopTrans,
      reqStopLong,
      Mt_trans,
      R_weld_saddle,
      uMt,
      padEyeWeldCap,
      padEyeWeldUtil,
      padEyeBearingCap,
      padEyeBearUtil,
      padEyeShearCap,
      padEyeShearUtil,
      allowTurnbuckle,
      tbUtilTrans,
      tbUtilLong,
    };
  }, [
    cargoTons,
    g,
    rollDeg,
    pitchDeg,
    av,
    windPressure,
    windAreaTrans,
    windAreaLong,
    mu,
    mslTrans_kN,
    angleTransDeg,
    mslLong_kN,
    angleLongDeg,
    sf,
    sigmaB,
    stopperFaceW,
    stopperFaceH,
    weldAllow,
    stopperWeldThroat,
    stopperWeldLength,
    H,
    padEyeLugT,
    padEyeHoleD,
    padEyeWeldThroat,
    padEyeWeldLength,
    tauAllow,
    turnbuckleMSL_kN,
  ]);

  return (
    <div className="bg-gray-50">
        <div className="mx-auto max-w-[1200px] p-6 space-y-6">
            <header className="flex items-end justify-between gap-4">
                <div>
                <h1 className="text-3xl font-bold text-gray-900">Sea Fastening / Lashing Calculator</h1>
                <p className="text-md text-gray-500">A comprehensive tool to estimate lashing requirements based on cargo and vessel parameters.</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                <Field label="g (m/s²)" value={g} setValue={setG} step={0.01} />
                <Field label="μ (friction)" value={mu} setValue={setMu} step={0.01} />
                <Field label="Safety Factor" value={sf} setValue={setSf} step={0.1} />
                </div>
            </header>

            {/* Material Property & Cargo Details */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Material Property">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Field label="Plate t (mm)" value={tPlate} setValue={setTPlate} />
                    <Field label="Fy (N/mm²)" value={Fy} setValue={setFy} />
                    <Field label="σb allow (N/mm²)" value={sigmaB} setValue={setSigmaB} />
                    <Field label="τ allow (N/mm²)" value={tauAllow} setValue={setTauAllow} />
                    <Field label="σbs allow (N/mm²)" value={sigmaBS} setValue={setSigmaBS} />
                    <Field label="Weld σ allow (N/mm²)" value={weldAllow} setValue={setWeldAllow} />
                </div>
                </Card>

                <Card title="Cargo Details">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Field label="Weight (tons)" value={cargoTons} setValue={setCargoTons} />
                    <Field label="L (m)" value={L} setValue={setL} />
                    <Field label="B (m)" value={B} setValue={setB} />
                    <Field label="H (m)" value={H} setValue={setH} />
                </div>
                </Card>
            </section>

            {/* Motions & Wind */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Roll Motion Force – Transverse">
                <div className="grid grid-cols-3 gap-3">
                    <Field label="Roll angle (deg)" value={rollDeg} setValue={setRollDeg} />
                    <Readout label="F_roll (N)" value={res.F_roll_dyn} />
                    <Readout label="Heave Fᵥ (N)" value={res.F_heave_dyn} />
                </div>
                </Card>
                <Card title="Pitch Motion Force – Longitudinal">
                <div className="grid grid-cols-3 gap-3">
                    <Field label="Pitch angle (deg)" value={pitchDeg} setValue={setPitchDeg} />
                    <Readout label="F_pitch (N)" value={res.F_pitch_dyn} />
                    <Readout label="Heave Fᵥ (N)" value={res.F_heave_dyn} />
                </div>
                </Card>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Heave Motion">
                <div className="grid grid-cols-3 gap-3">
                    <Field label="aᵥ (m/s²)" value={av} setValue={setAv} step={0.05} />
                    <Readout label="Fᵥ = W·aᵥ (N)" value={res.F_heave_dyn} />
                    <Readout label="Friction R_fric (N)" value={res.R_fric} />
                </div>
                </Card>
                <Card title="Wind Details & Wind Force">
                <div className="grid grid-cols-3 gap-3">
                    <Field label="Wind pressure (kN/m²)" value={windPressure} setValue={setWindPressure} step={0.05} />
                    <Field label="Area Trans (m²)" value={windAreaTrans} setValue={setWindAreaTrans} />
                    <Field label="Area Long (m²)" value={windAreaLong} setValue={setWindAreaLong} />
                    <Readout label="F_wind Trans (N)" value={res.F_wind_trans} />
                    <Readout label="F_wind Long (N)" value={res.F_wind_long} />
                </div>
                </Card>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Total Force – Transverse">
                <div className="grid grid-cols-2 gap-3">
                    <Readout label="Σ (Roll + Wind) (N)" value={res.F_trans_total_raw} />
                    <Readout label="Required after friction (N)" value={res.F_trans_req} />
                </div>
                </Card>
                <Card title="Total Force – Longitudinal">
                <div className="grid grid-cols-2 gap-3">
                    <Readout label="Σ (Pitch + Wind) (N)" value={res.F_long_total_raw} />
                    <Readout label="Required after friction (N)" value={res.F_long_req} />
                </div>
                </Card>
            </section>

            {/* Weld to Saddles & Pedestals – Transverse (Tripping) */}
            <Card title="Weld to Saddles & Pedestals – Transverse (Tripping Moment)">
                <div className="grid grid-cols-4 gap-3">
                <Readout label="Tipping Moment Mt (N·m)" value={res.Mt_trans} />
                <Readout label="Weld Capacity (N)" value={res.R_weld_saddle} />
                <Check label="Utilization" ok={res.uMt.ok} util={res.uMt.util} />
                </div>
            </Card>

            {/* Weld to Stoppers – Transverse & Stopper Capacity – Transverse */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Weld to Stoppers – Transverse">
                <div className="grid grid-cols-3 gap-3">
                    <Field label="Stopper weld throat (mm)" value={stopperWeldThroat} setValue={setStopperWeldThroat} />
                    <Field label="Stopper weld length (mm)" value={stopperWeldLength} setValue={setStopperWeldLength} />
                    <Readout label="Weld capacity (N)" value={res.R_weld_stop} />
                </div>
                </Card>
                <Card title="Stopper Force Capacity – Transverse">
                <div className="grid grid-cols-3 gap-3">
                    <Field label="Stopper face width (mm)" value={stopperFaceW} setValue={setStopperFaceW} />
                    <Field label="Stopper face height (mm)" value={stopperFaceH} setValue={setStopperFaceH} />
                    <Readout label="Bearing cap (N)" value={res.R_bear_stop} />
                    <Readout label="Per-stopper cap (min) (N)" value={res.R_stop_each} />
                    <Readout label="Residual to stoppers (N)" value={res.residTrans} />
                    <Badge label="Required stoppers" value={res.reqStopTrans} />
                </div>
                </Card>
            </section>

            {/* Longitudinal – Welds & Stoppers */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Weld to Saddles & Pedestals – Longitudinal">
                <p className="text-sm text-gray-500">Use same weld allowables or define longitudinal-specific if needed.</p>
                <div className="grid grid-cols-3 gap-3">
                    <Readout label="Allowable per weld (N)" value={res.R_weld_saddle} />
                    <Readout label="Demand sample (N)" value={res.F_long_req} />
                    <Check label="Indicative" ok={res.F_long_req <= res.R_weld_saddle} util={res.F_long_req / Math.max(res.R_weld_saddle, 1)} />
                </div>
                </Card>
                <Card title="Weld to Stoppers – Longitudinal & Stopper details">
                <div className="grid grid-cols-3 gap-3">
                    <Readout label="Residual to stoppers (N)" value={res.residLong} />
                    <Readout label="Per-stopper cap (N)" value={res.R_stop_each} />
                    <Badge label="Required stoppers" value={res.reqStopLong} />
                </div>
                </Card>
            </section>

            {/* Pad-Eye details & Checks */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Pad-Eye details">
                <div className="grid grid-cols-4 gap-3">
                    <Field label="Lug t (mm)" value={padEyeLugT} setValue={setPadEyeLugT} />
                    <Field label="Hole/Pin D (mm)" value={padEyeHoleD} setValue={setPadEyeHoleD} />
                    <Field label="Weld throat (mm)" value={padEyeWeldThroat} setValue={setPadEyeWeldThroat} />
                    <Field label="Weld length (mm)" value={padEyeWeldLength} setValue={setPadEyeWeldLength} />
                </div>
                </Card>
                <Card title="Pad-Eye Checks (Bearing / Shear / Weld)">
                <div className="grid grid-cols-3 gap-3">
                    <Readout label="Weld capacity (N)" value={res.padEyeWeldCap} />
                    <Check label="Weld util" ok={res.padEyeWeldUtil.ok} util={res.padEyeWeldUtil.util} />
                    <Readout label="Bearing cap (N)" value={res.padEyeBearingCap} />
                    <Check label="Bearing util" ok={res.padEyeBearUtil.ok} util={res.padEyeBearUtil.util} />
                    <Readout label="Shear cap (N)" value={res.padEyeShearCap} />
                    <Check label="Shear util" ok={res.padEyeShearUtil.ok} util={res.padEyeShearUtil.util} />
                </div>
                </Card>
            </section>

            <Card title="Lashing & Wire Rope Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border p-4 bg-gray-100/50">
                    <h3 className="font-medium mb-2">Transverse set</h3>
                    <div className="grid grid-cols-3 gap-3">
                    <Field label="MSL (kN)" value={mslTrans_kN} setValue={setMslTrans_kN} />
                    <Field label="Angle (deg)" value={angleTransDeg} setValue={setAngleTransDeg} />
                    <Readout label="Per-lashing Ht (N)" value={res.Ht} />
                    </div>
                    <Badge label="Req. lashings" value={res.reqLashTrans} />
                </div>
                <div className="rounded-xl border p-4 bg-gray-100/50">
                    <h3 className="font-medium mb-2">Longitudinal set</h3>
                    <div className="grid grid-cols-3 gap-3">
                    <Field label="MSL (kN)" value={mslLong_kN} setValue={setMslLong_kN} />
                    <Field label="Angle (deg)" value={angleLongDeg} setValue={setAngleLongDeg} />
                    <Readout label="Per-lashing Hl (N)" value={res.Hl} />
                    </div>
                    <Badge label="Req. lashings" value={res.reqLashLong} />
                </div>
                </div>
            </Card>

            <Card title="Turnbuckle capacity check">
                <div className="grid grid-cols-4 gap-3">
                <Field label="Turnbuckle MSL (kN)" value={turnbuckleMSL_kN} setValue={setTurnbuckleMSL_kN} />
                <Readout label="Allowable per TB (N)" value={res.allowTurnbuckle} />
                <Check label="TB util (Transverse)" ok={res.tbUtilTrans.ok} util={res.tbUtilTrans.util} />
                <Check label="TB util (Longitudinal)" ok={res.tbUtilLong.ok} util={res.tbUtilLong.util} />
                </div>
            </Card>
        </div>
    </div>
  );
};

// ----------------- Small UI components -----------------
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border p-4 shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  setValue,
  step = 0.01,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  step?: number;
}) {
  return (
    <label className="text-sm">
      <span className="text-gray-600">{label}</span>
      <input
        type="number"
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => setValue(+e.target.value)}
        className="mt-1 w-full rounded border p-2 border-gray-300 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
      />
    </label>
  );
}

function Readout({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-sm">
      <div className="text-gray-500">{label}</div>
      <div className="mt-1 font-mono text-gray-900">{roundFmt(value)}</div>
    </div>
  );
}

function Check({ label, ok, util }: { label: string; ok: boolean; util: number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="text-gray-700">{label}</div>
      <div className={`px-2 py-0.5 rounded-full ${ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
        {ok ? "OK" : "FAIL"}
        <span className="ml-1 text-gray-500">({Number.isFinite(util) ? util.toFixed(2) : "∞"})</span>
      </div>
    </div>
  );
}

function Badge({ label, value }: { label: string; value: number }) {
  return (
    <div className="mt-2 flex items-center justify-between">
      <div className="text-sm font-semibold text-gray-800">{label}</div>
      <div className="rounded-full bg-green-600 text-white px-3 py-1 text-sm font-semibold">{value}</div>
    </div>
  );
}

export default SeaFasteningCalculatorPage;
