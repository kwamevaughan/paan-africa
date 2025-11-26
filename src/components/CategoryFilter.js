import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const CategoryFilter = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { id: null, name: 'All Categories', icon: '🎨', color: '#6B7280' },
    { id: 'visual-design', name: 'Visual Design', icon: '🎨', color: '#FF6B6B' },
    { id: 'digital-marketing', name: 'Digital Marketing', icon: '📢', color: '#4ECDC4' },
    { id: 'brand-identity', name: 'Brand Identity', icon: '💼', color: '#45B7D1' },
    { id: 'ui-ux-design', name: 'UI/UX Design', icon: '📱', color: '#96CEB4' },
    { id: 'print-design', name: 'Print Design', icon: '📄', color: '#FFEAA7' },
    { id: 'motion-graphics', name: 'Motion Graphics', icon: '🎬', color: '#DDA0DD' },
    { id: 'photography', name: 'Photography', icon: '📷', color: '#98D8C8' },
    { id: 'illustration', name: 'Illustration', icon: '🖌️', color: '#F7DC6F' },
  ];

  const selectedCategory = categories.find(c => c.id === value) || categories[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <Icon icon="mdi:palette" className="w-4 h-4 text-paan-blue" />
        <span className="text-sm font-medium text-gray-700">{selectedCategory.name}</span>
        <Icon icon="mdi:chevron-down" className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <div className="py-1">
            {categories.map((category) => (
              <button
                key={category.id || 'all'}
                onClick={() => {
                  onChange(category.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                  value === category.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
