import React, { useState } from 'react';
import { Tariff, TariffType } from '../types';

interface AdminViewProps {
  onAddTariff: (tariff: Omit<Tariff, 'id'>) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ onAddTariff }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [country, setCountry] = useState('');
  const [type, setType] = useState<TariffType>(TariffType.SEA);
  const [details, setDetails] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const isFormValid = name && code && country && details;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    onAddTariff({
      name,
      code,
      country,
      type,
      details,
    });

    // Reset form and show success message
    setName('');
    setCode('');
    setCountry('');
    setType(TariffType.SEA);
    setDetails('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Tariff</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Port/Airport Name</label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                required
            />
            </div>
            <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Code (e.g., SGSIN)</label>
            <input
                id="code"
                type="text"
                value={code}
                onChange={e => setCode(e.target.value)}
                className="block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                required
            />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input
                id="country"
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                required
            />
            </div>
            <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
                id="type"
                value={type}
                onChange={e => setType(e.target.value as TariffType)}
                className="block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            >
                <option value={TariffType.SEA}>Sea Port</option>
                <option value={TariffType.AIR}>Airport</option>
            </select>
            </div>
        </div>
        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Tariff Details</label>
          <textarea
            id="details"
            value={details}
            onChange={e => setDetails(e.target.value)}
            rows={8}
            className="block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition font-mono text-sm"
            placeholder="Enter the full tariff text here..."
            required
          />
        </div>
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
            {showSuccess && <p className="text-green-600 text-sm">Tariff saved successfully!</p>}
            <button
                type="submit"
                disabled={!isFormValid}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
                Save Tariff
            </button>
        </div>
      </form>
    </div>
  );
};

export default AdminView;