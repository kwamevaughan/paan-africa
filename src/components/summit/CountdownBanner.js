const CountdownBanner = ({ timeLeft }) => {
  return (
    <div className="hidden sm:block relative z-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-lg shadow-2xl py-6 sm:py-8 px-4 sm:px-6 relative overflow-hidden">
          {/* Pattern background layer */}
          <div 
            className="absolute inset-0 rounded-lg opacity-40"
            style={{
              backgroundImage: `url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/counter-pattern.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'repeat'
            }}
          ></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F25849] to-[#172840] rounded-lg opacity-100 mix-blend-overlay"></div>
          
          {/* Content */}
          <div className="text-center relative z-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Seconds' }
              ].map((item, index) => (
                <div key={index} className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{item.value}</div>
                  <div className="text-xs sm:text-sm text-white/80">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownBanner;
