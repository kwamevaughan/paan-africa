const FormTextarea = ({ 
  label, 
  id, 
  name, 
  value, 
  onChange, 
  error, 
  placeholder, 
  required = false,
  rows = 3,
  className = ""
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-paan-dark-blue text-sm font-semibold mb-2">
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 transition-all duration-300 resize-none text-sm sm:text-base ${
            error 
              ? 'border-red-400 focus:ring-red-400 focus:border-red-400' 
              : 'border-gray-300 focus:ring-paan-dark-blue focus:border-paan-dark-blue hover:border-paan-blue shadow-sm hover:shadow-md'
          }`}
          placeholder={placeholder}
        />
        {error && (
          <div className="absolute top-3 right-3 pointer-events-none">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1.5 animate-fade-in">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default FormTextarea;
