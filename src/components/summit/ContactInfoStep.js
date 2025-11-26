import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { Icon } from '@iconify/react';
import FormInput from '../common/FormInput';

const CountrySelect = dynamic(() => import('../common/CountrySelect'), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse">
      <label className="block text-paan-dark-blue text-sm font-semibold mb-2">
        Country <span className="text-red-500 ml-0.5">*</span>
      </label>
      <div className="w-full h-11 bg-gray-100 border border-gray-300 rounded-lg"></div>
    </div>
  )
});

const ContactInfoStep = ({ onNext, purchaserInfo, handlePurchaserChange, errors }) => {
  return (
    <motion.div 
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-6 sm:p-8 lg:p-10 bg-white border border-gray-200 rounded-2xl shadow-xl">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-paan-blue rounded-xl flex items-center justify-center shadow-lg">
              <Icon icon="mdi:account-circle" className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-paan-dark-blue">Let's Get Started</h3>
              <p className="text-gray-500 text-sm sm:text-base mt-1">
                Step 1 of 4 - Contact Information
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-base leading-relaxed">
            Please provide your contact information. This helps us keep you updated about your registration and follow up if needed.
          </p>
        </div>
        
        <form className="space-y-6">
          <FormInput
            label="Full Name"
            id="fullName"
            name="fullName"
            value={purchaserInfo.fullName}
            onChange={handlePurchaserChange}
            error={errors.fullName}
            placeholder="John Doe"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Email Address"
              id="email"
              name="email"
              type="email"
              value={purchaserInfo.email}
              onChange={handlePurchaserChange}
              error={errors.email}
              placeholder="john.doe@example.com"
              required
            />

            <FormInput
              label="Phone Number"
              id="phone"
              name="phone"
              type="tel"
              value={purchaserInfo.phone}
              onChange={handlePurchaserChange}
              error={errors.phone}
              placeholder="+254 700 000 000"
              required
            />
          </div>

          <CountrySelect
            label="Country"
            id="country"
            name="country"
            value={purchaserInfo.country}
            onChange={handlePurchaserChange}
            error={errors.country}
            required
          />

          <div className="pt-8 border-t border-gray-100">
            <div className="bg-blue-50 border border-paan-blue/30 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <Icon icon="mdi:information-outline" className="w-5 h-5 text-paan-blue mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  By continuing, you agree to receive updates about PAAN Summit 2026. We respect your privacy and won't spam you.
                </p>
              </div>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={onNext}
                className="bg-paan-blue text-white px-10 sm:px-12 py-4 rounded-full font-semibold hover:bg-paan-dark-blue transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
              >
                Continue to Ticket Selection
                <Icon icon="mdi:arrow-right" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactInfoStep;
