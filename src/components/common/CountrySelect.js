import { useState, useEffect } from 'react';
import Select from 'react-select';

const CountrySelect = ({ 
  label, 
  id, 
  name, 
  value, 
  onChange, 
  error, 
  required = false,
  className = ""
}) => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load countries from JSON file
    fetch('/assets/misc/countries.json')
      .then(res => res.json())
      .then(data => {
        const countryOptions = data.map(country => ({
          value: country.name,
          label: `${country.emoji} ${country.name}`,
          code: country.code
        }));
        setCountries(countryOptions);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error loading countries:', err);
        setIsLoading(false);
      });
  }, []);

  const selectedOption = countries.find(c => c.value === value) || null;

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: error ? '#ef4444' : state.isFocused ? '#172840' : '#84C1D9',
      borderRadius: '0.5rem',
      padding: '0.25rem 0.5rem',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(23, 40, 64, 0.1)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#172840' : '#84C1D9'
      },
      minHeight: '44px',
      fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#172840' 
        : state.isFocused 
        ? '#DAECF3' 
        : 'white',
      color: state.isSelected ? 'white' : '#172840',
      padding: '10px 12px',
      cursor: 'pointer',
      fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
      '&:active': {
        backgroundColor: '#172840'
      }
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      zIndex: 50
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
      fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#172840',
      fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem'
    }),
    input: (provided) => ({
      ...provided,
      color: '#172840',
      fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem'
    })
  };

  const handleSelectChange = (selectedOption) => {
    // Create a synthetic event to match the expected onChange signature
    const syntheticEvent = {
      target: {
        name: name,
        value: selectedOption ? selectedOption.value : ''
      }
    };
    onChange(syntheticEvent);
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[#172840] text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        id={id}
        name={name}
        value={selectedOption}
        onChange={handleSelectChange}
        options={countries}
        styles={customStyles}
        placeholder="Select your country..."
        isSearchable
        isLoading={isLoading}
        isClearable
        className="react-select-container"
        classNamePrefix="react-select"
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default CountrySelect;
