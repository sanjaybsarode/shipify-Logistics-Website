import React, { useState, useMemo, useEffect } from 'react';
import { Tariff } from '../types';
import Header from './Header';
import SearchBar from './SearchBar';
import TariffDetailView from './TariffDetailView';
import ShipIcon from './icons/ShipIcon';
import PlaneIcon from './icons/PlaneIcon';
import { TariffType } from '../types';

interface TariffSearchPageProps {
  allTariffs: Tariff[];
}

const TariffSearchPage: React.FC<TariffSearchPageProps> = ({ allTariffs }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTariffId, setSelectedTariffId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'All' | TariffType>('All');

  const filteredTariffs = useMemo(() => {
    if (!searchTerm) {
      return [];
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return allTariffs.filter(tariff => {
      const typeMatch = filterType === 'All' || tariff.type === filterType;
      if (!typeMatch) {
          return false;
      }

      return (
        tariff.name.toLowerCase().includes(lowercasedFilter) ||
        tariff.country.toLowerCase().includes(lowercasedFilter) ||
        tariff.code.toLowerCase().includes(lowercasedFilter)
      );
    });
  }, [searchTerm, allTariffs, filterType]);

  // Auto-select the first result when the search term changes
  useEffect(() => {
    if (filteredTariffs.length > 0) {
      setSelectedTariffId(filteredTariffs[0].id);
    } else {
      setSelectedTariffId(null);
    }
  }, [filteredTariffs]);

  const selectedTariff = useMemo(() => {
    if (!selectedTariffId) return null;
    return allTariffs.find(t => t.id === selectedTariffId) || null;
  }, [selectedTariffId, allTariffs]);
  
  const hasSearched = searchTerm.length > 0;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const FilterButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-150 ease-in-out ${
            isActive
                ? 'bg-green-600 text-white shadow'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
        }`}
    >
        {label}
    </button>
  );

  return (
    <div className="bg-slate-50 font-sans">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
        
        <div className="mb-8 flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Filter by type:</span>
            <FilterButton
                label="All"
                isActive={filterType === 'All'}
                onClick={() => setFilterType('All')}
            />
            <FilterButton
                label="Sea Ports"
                isActive={filterType === TariffType.SEA}
                onClick={() => setFilterType(TariffType.SEA)}
            />
            <FilterButton
                label="Airports"
                isActive={filterType === TariffType.AIR}
                onClick={() => setFilterType(TariffType.AIR)}
            />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Search Results */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border h-full">
              <div className="p-4 border-b">
                <h3 className="font-bold text-lg">
                  {hasSearched ? `${filteredTariffs.length} Results Found` : 'Search Results'}
                </h3>
              </div>
              <div className="max-h-[70vh] overflow-y-auto">
                {hasSearched ? (
                  filteredTariffs.length > 0 ? (
                    <ul>
                      {filteredTariffs.map(tariff => {
                        const Icon = tariff.type === TariffType.SEA ? ShipIcon : PlaneIcon;
                        const isActive = tariff.id === selectedTariffId;
                        return (
                          <li key={tariff.id}>
                            <button 
                              onClick={() => setSelectedTariffId(tariff.id)}
                              className={`w-full text-left p-4 border-l-4 transition-colors duration-150 ${isActive ? 'border-green-500 bg-green-50' : 'border-transparent hover:bg-gray-50'}`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className={`h-6 w-6 flex-shrink-0 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                                <div>
                                  <p className={`font-semibold ${isActive ? 'text-green-800' : 'text-gray-800'}`}>{tariff.name}</p>
                                  <p className="text-sm text-gray-500">{tariff.country} - {tariff.code}</p>
                                </div>
                              </div>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <p>No tariffs match your search.</p>
                    </div>
                  )
                ) : (
                   <div className="p-6 text-center text-gray-500">
                      <p>Enter a port name, country, or code to begin.</p>
                   </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Tariff Details */}
          <div className="lg:col-span-2">
            {selectedTariff ? (
              <TariffDetailView tariff={selectedTariff} />
            ) : (
              <div className="flex items-center justify-center bg-white rounded-lg shadow-md border h-full min-h-[50vh]">
                <div className="text-center p-6 text-gray-500">
                   <h3 className="text-xl text-gray-600">
                    {hasSearched ? 'No Results Found' : 'Select a Tariff'}
                   </h3>
                   <p>
                    {hasSearched ? 'No tariffs match your search criteria.' : 'Search results will appear here.'}
                   </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TariffSearchPage;