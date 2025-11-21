const CountdownBanner = ({ timeLeft }) => {
  return (
    <div className="hidden sm:block relative -mt-8 sm:-mt-12 md:-mt-16 z-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#F25849] to-[#172840] rounded-lg shadow-2xl py-6 sm:py-8 px-4 sm:px-6">
          <div className="text-center">
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
