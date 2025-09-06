import React, { useState, useMemo } from 'react';
import { Tariff } from '../types';
import SortIcon from './icons/SortIcon';

interface TariffListProps {
  tariffs: Tariff[];
  onTariffSelect: (tariff: Tariff) => void;
  selectedTariffId: string | null;
}

type SortKey = 'name' | 'code' | 'country';
type SortDirection = 'asc' | 'desc';

const TariffList: React.FC<TariffListProps> = ({ tariffs, onTariffSelect, selectedTariffId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDirection('asc');
    }
  };

  const sortedAndFilteredTariffs = useMemo(() => {
    const filtered = tariffs.filter(tariff => {
      const lowercasedFilter = searchTerm.toLowerCase();
      return (
        tariff.name.toLowerCase().includes(lowercasedFilter) ||
        tariff.country.toLowerCase().includes(lowercasedFilter) ||
        tariff.code.toLowerCase().includes(lowercasedFilter)
      );
    });

    return [...filtered].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [tariffs, searchTerm, sortBy, sortDirection]);

  const SortableHeader: React.FC<{ sortKey: SortKey, label: string }> = ({ sortKey, label }) => (
    <th
      scope="col"
      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center gap-1">
        {label}
        {sortBy === sortKey && <SortIcon direction={sortDirection} />}
      </div>
    </th>
  );

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Manage Existing Tariffs</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tariffs by name, code, or country..."
        className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 mb-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <div className="flex-grow overflow-y-auto border-t">
        <div className="align-middle inline-block min-w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <SortableHeader sortKey="name" label="Name" />
                <SortableHeader sortKey="code" label="Code" />
                <SortableHeader sortKey="country" label="Country" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedAndFilteredTariffs.map(tariff => (
                <tr 
                    key={tariff.id} 
                    className={`hover:bg-gray-50 cursor-pointer transition-colors ${selectedTariffId === tariff.id ? 'bg-green-50' : ''}`}
                    onClick={() => onTariffSelect(tariff)}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{tariff.name}</div>
                    <div className="text-xs text-gray-500">{tariff.type}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-mono">{tariff.code}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{tariff.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sortedAndFilteredTariffs.length === 0 && (
            <p className="text-center text-gray-500 py-8">No tariffs match your search.</p>
        )}
      </div>
    </div>
  );
};

export default TariffList;