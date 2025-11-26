const FormCheckbox = ({ 
  id, 
  name, 
  checked, 
  onChange, 
  label, 
  error,
  className = ""
}) => {
  return (
    <div className={className}>
      <div className="flex items-start">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className={`mr-3 mt-1 ${error ? 'border-red-500' : ''}`}
        />
        <label htmlFor={id} className="text-sm text-gray-700">
          {label}
        </label>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormCheckbox;
