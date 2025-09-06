
import React, { useState, useEffect } from 'react';
import { Fleet } from '../types';
import { getFleets, addFleet, deleteFleet } from '../services/fleetService';
import TrashIcon from './icons/TrashIcon';

const MyFleetsPage: React.FC = () => {
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [newFleetName, setNewFleetName] = useState('');
  const [newFleetKey, setNewFleetKey] = useState('');

  useEffect(() => {
    setFleets(getFleets());
  }, []);

  const handleAddFleet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFleetName || !newFleetKey) return;
    const newFleet = addFleet(newFleetName, newFleetKey);
    if (newFleet) {
      setFleets([...fleets, newFleet]);
      setNewFleetName('');
      setNewFleetKey('');
    }
  };

  const handleDeleteFleet = (id: string) => {
    if (window.confirm('Are you sure you want to delete this fleet?')) {
      if (deleteFleet(id)) {
        setFleets(fleets.filter(f => f.id !== id));
      }
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              My Fleets
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500">
              Manage your VesselFinder fleets. Add a fleet using the personal key from your VesselFinder profile. Map viewing requires a registered domain with VesselFinder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Add Fleet Form */}
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Add a New Fleet</h2>
              <form onSubmit={handleAddFleet} className="space-y-4">
                <div>
                  <label htmlFor="fleetName" className="block text-sm font-medium text-gray-700 mb-1">Fleet Name</label>
                  <input
                    id="fleetName"
                    type="text"
                    value={newFleetName}
                    onChange={e => setNewFleetName(e.target.value)}
                    placeholder="e.g., My Company Vessels"
                    className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="fleetKey" className="block text-sm font-medium text-gray-700 mb-1">VesselFinder Fleet Key</label>
                  <input
                    id="fleetKey"
                    type="text"
                    value={newFleetKey}
                    onChange={e => setNewFleetKey(e.target.value)}
                    placeholder="Paste your key here"
                    className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-md transition-colors"
                    disabled={!newFleetName || !newFleetKey}
                  >
                    Save Fleet
                  </button>
                </div>
              </form>
            </div>

            {/* Fleet List */}
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Saved Fleets</h2>
              {fleets.length > 0 ? (
                <ul className="space-y-3">
                  {fleets.map(fleet => (
                    <li key={fleet.id} className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-800">{fleet.name}</p>
                        <p className="text-xs text-gray-500 font-mono">Key: ...{fleet.key.slice(-8)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                            onClick={() => handleDeleteFleet(fleet.id)} 
                            className="text-gray-400 hover:text-red-500 p-1"
                            aria-label={`Delete ${fleet.name} fleet`}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-gray-500 pt-8">
                  <p>You haven't saved any fleets yet.</p>
                  <p>Add one using the form to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFleetsPage;