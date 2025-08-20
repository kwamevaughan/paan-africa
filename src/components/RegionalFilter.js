import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const RegionalFilter = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const regions = [
    { code: null, name: 'All Regions', color: '#6B7280' },
    { code: 'WA', name: 'West Africa', color: '#FF6B6B' },
    { code: 'EA', name: 'East Africa', color: '#4ECDC4' },
    { code: 'SA', name: 'Southern Africa', color: '#45B7D1' },
    { code: 'NA', name: 'North Africa', color: '#96CEB4' },
    { code: 'CA', name: 'Central Africa', color: '#FFEAA7' },
  ];

  const selectedRegion = regions.find(r => r.code === value) || regions[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-paan-red focus:border-paan-red transition-all duration-300 hover:scale-105 font-medium"
      >
        <Icon icon="mdi:earth" className="w-4 h-4 text-paan-blue" />
        <span className="text-sm font-medium text-paan-dark-blue">{selectedRegion.name}</span>
        <Icon icon="mdi:chevron-down" className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <div className="py-1">
            {regions.map((region) => (
              <button
                key={region.code || 'all'}
                onClick={() => {
                  onChange(region.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                  value === region.code ? 'bg-paan-red/10 text-paan-red' : 'text-gray-700'
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: region.color }}
                ></div>
                <span className="text-sm font-medium">{region.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionalFilter;
