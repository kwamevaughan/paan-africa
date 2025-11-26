import { motion } from "framer-motion";

const StepBar = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Contact Info' },
    { id: 2, name: 'Select Tickets' },
    { id: 3, name: 'Attendee Details' },
    { id: 4, name: 'Payment' }
  ];

  return (
    <motion.div 
      className="w-full py-4 sm:py-6 px-3 sm:px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Line connecting steps */}
          <motion.div 
            className="absolute top-4 sm:top-5 left-[12px] sm:left-[24px] right-[12px] sm:right-[24px] h-1 bg-paan-dark-blue rounded-full origin-left hidden sm:block"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: currentStep > 1 ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          
          {steps.map((step, index) => (
            <motion.div 
              key={step.id} 
              className="flex flex-col items-center relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold border-2 ${
                  step.id <= currentStep
                    ? 'bg-paan-dark-blue text-white border-paan-dark-blue'
                    : 'bg-white text-gray-500 border-gray-300'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {step.id}
              </motion.div>
              <motion.span
                className={`mt-1 sm:mt-2 text-xs font-medium text-center max-w-[70px] sm:max-w-none ${
                  step.id <= currentStep ? 'text-paan-dark-blue' : 'text-gray-500'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              >
                {step.name}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StepBar;
