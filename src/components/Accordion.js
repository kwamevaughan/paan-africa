import { useState } from 'react';

const Accordion = ({ items, className = "" }) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const PlusIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="transition-transform duration-300"
    >
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );

  const MinusIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="transition-transform duration-300"
    >
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
            aria-expanded={openItems.has(index)}
            aria-controls={`accordion-content-${index}`}
          >
            <h3 className="font-semibold text-gray-800 text-lg pr-4">
              {item.title}
            </h3>
            <div className="flex-shrink-0">
              {openItems.has(index) ? (
                <MinusIcon />
              ) : (
                <PlusIcon />
              )}
            </div>
          </button>
          
          <div
            id={`accordion-content-${index}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openItems.has(index) 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 py-4 bg-white border-t border-gray-100">
              {typeof item.content === 'string' ? (
                <p className="text-gray-700 leading-relaxed">
                  {item.content}
                </p>
              ) : (
                <div className="text-gray-700 leading-relaxed">
                  {item.content}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
