import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { convertUSDToKES, formatCurrency } from '../../utils/currencyConverter';
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

const AttendeesStep = ({ 
  onNext, 
  onPrev, 
  purchaserInfo, 
  handlePurchaserChange, 
  attendees, 
  handleAttendeeChange, 
  errors, 
  selectedTickets, 
  promoCodeValidation, 
  termsAccepted, 
  setTermsAccepted, 
  paymentInfo, 
  handlePaymentChange 
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pt-4 sm:pt-6 pb-8 sm:pb-10 max-w-7xl mx-auto px-3 sm:px-4">
      <div>
        <div className="flex flex-col gap-4">
          {/* Purchaser Information */}
          <div className="p-4 sm:p-6 bg-white border border-paan-blue rounded-lg shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold text-paan-dark-blue mb-2">Purchaser Information</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">The purchaser receives the receipt and support emails.</p>
            <form className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <FormInput
                  label="Full Name"
                  id="fullName"
                  name="fullName"
                  value={purchaserInfo.fullName}
                  onChange={handlePurchaserChange}
                  error={errors.fullName}
                  placeholder="Enter your full name"
                  required
                />
                <FormInput
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  value={purchaserInfo.email}
                  onChange={handlePurchaserChange}
                  error={errors.email}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  type="tel"
                  value={purchaserInfo.phone}
                  onChange={handlePurchaserChange}
                  error={errors.phone}
                  placeholder="Enter your phone number"
                  required
                />
                <FormInput
                  label="Company / Organization"
                  id="organization"
                  name="organization"
                  value={purchaserInfo.organization}
                  onChange={handlePurchaserChange}
                  error={errors.organization}
                  placeholder="Enter your organization"
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="attending"
                  name="attending"
                  checked={purchaserInfo.attending}
                  onChange={handlePurchaserChange}
                  className="mr-2"
                />
                <label htmlFor="attending" className="text-[#172840] text-sm font-medium">
                  I'm also attending
                </label>
              </div>
            </form>
          </div>

          {/* Attendees */}
          <div className="p-4 sm:p-6 bg-white border border-paan-blue rounded-lg shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold text-paan-dark-blue mb-2">Attendees</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              Each ticket must be assigned to a person. You can edit names later from your confirmation email.
            </p>
            
            {attendees.map((attendee, index) => (
              <motion.div 
                key={index} 
                className="py-3 sm:py-4 my-3 sm:my-4 border border-paan-blue p-3 sm:p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h3 className="font-semibold text-paan-dark-blue py-1 sm:py-2 text-sm sm:text-base">
                  Attendee {index + 1} — {attendee.ticketType}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <FormInput
                    label="Full Name"
                    id={`attendee${index}Name`}
                    value={attendee.name || ''}
                    onChange={(e) => handleAttendeeChange(index, 'name', e.target.value)}
                    error={errors[`attendee${index}Name`]}
                    placeholder="Enter attendee's full name"
                    required
                  />
                  <FormInput
                    label="Email"
                    id={`attendee${index}Email`}
                    type="email"
                    value={attendee.email || ''}
                    onChange={(e) => handleAttendeeChange(index, 'email', e.target.value)}
                    error={errors[`attendee${index}Email`]}
                    placeholder="Enter attendee's email"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <FormInput
                    label="Job/ Role"
                    id={`attendee${index}Role`}
                    value={attendee.role || ''}
                    onChange={(e) => handleAttendeeChange(index, 'role', e.target.value)}
                    error={errors[`attendee${index}Role`]}
                    placeholder="Enter job/role"
                    required
                  />
                  <FormInput
                    label="Company / Organization"
                    id={`attendee${index}Org`}
                    value={attendee.organization || ''}
                    onChange={(e) => handleAttendeeChange(index, 'organization', e.target.value)}
                    error={errors[`attendee${index}Org`]}
                    placeholder="Enter organization"
                    required
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Documents & Support */}
          <div className="p-6 bg-white border border-paan-blue rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-paan-dark-blue mb-2">Documents & Support (optional)</h2>
            <p className="text-gray-600 mb-4">The purchaser receives the receipt and support emails.</p>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Need a visa letter?"
                  id="visaLetter"
                  name="visaLetter"
                  placeholder="Enter your full name"
                />
                <FormInput
                  label="Passport Name"
                  id="passportName"
                  name="passportName"
                  placeholder="Enter passport name"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Nationality"
                  id="nationality"
                  name="nationality"
                  placeholder="Enter your nationality"
                />
                <FormInput
                  label="Invoice details (optional)"
                  id="invoiceDetails"
                  name="invoiceDetails"
                  placeholder="Enter invoice details"
                />
              </div>
            </form>
          </div>

          {/* Terms & Preferences */}
          <div className="p-6 bg-white border border-paan-blue rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-paan-dark-blue mb-4">Terms & Preferences</h2>
            <form>
              <div className="space-y-3">
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    name="terms" 
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className={`mr-3 mt-1 ${errors.terms ? 'border-red-500' : ''}`}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I accept the <a href="/terms-and-conditions" className="text-paan-blue hover:underline">terms & conditions</a> and <a href="/privacy-policy" className="text-paan-blue hover:underline">privacy policy</a> <span className="text-red-500">*</span>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
                )}
                <div className="flex items-start">
                  <input type="checkbox" id="updates" name="updates" className="mr-3 mt-1" />
                  <label htmlFor="updates" className="text-sm text-gray-700">
                    Send me summit updates (optional)
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between mt-4 sm:mt-6 gap-3 sm:gap-0">
            <button
              onClick={onPrev}
              className="bg-paan-blue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-paan-blue/90 transition-colors text-sm sm:text-base"
            >
              Back to Tickets
            </button>
            <button
              onClick={onNext}
              className="bg-paan-dark-blue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-paan-blue transition-colors text-sm sm:text-base"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <div>
        <div className="p-4 sm:p-6 bg-white border border-paan-blue rounded-lg shadow-sm sticky top-40">
          <div className="flex justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-paan-dark-blue">Your Selection</h2>
            <p className="font-normal text-paan-red text-xs sm:text-sm">Early Bird active</p>
          </div>
          <div className="space-y-2 mb-3 sm:mb-4">
            {selectedTickets.map((ticket, index) => (
              <div key={index} className="flex justify-between text-sm sm:text-base">
                <span>{ticket.name} × {ticket.quantity}</span>
                <span>${ticket.price * ticket.quantity}</span>
              </div>
            ))}
            <hr className="my-2"/>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Subtotal</span>
              <span>${selectedTickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0)}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Promo</span>
              <span className="text-green-600">
                {promoCodeValidation?.valid ? `-$${promoCodeValidation.promoCode.discountAmount}` : '-$0'}
              </span>
            </div>
            <div className="flex justify-between font-bold text-base sm:text-lg">
              <span>Total</span>
              <span>${promoCodeValidation?.valid 
                ? selectedTickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0) - promoCodeValidation.promoCode.discountAmount
                : selectedTickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0)
              }</span>
            </div>
          </div>
          
          {/* Payment Method Preview */}
          <div className="mb-4">
            <h3 className="font-semibold text-paan-dark-blue mb-2">Payment Method</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="card-attendees" 
                  name="method" 
                  value="card" 
                  checked={paymentInfo.method === 'card'}
                  onChange={handlePaymentChange}
                  className="mr-2" 
                />
                <label htmlFor="card-attendees" className="text-sm">Credit/Debit Card</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="bank-attendees" 
                  name="method" 
                  value="bank" 
                  checked={paymentInfo.method === 'bank'}
                  onChange={handlePaymentChange}
                  className="mr-2" 
                />
                <label htmlFor="bank-attendees" className="text-sm">Bank Transfer/Invoice</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="mpesa-attendees" 
                  name="method" 
                  value="mpesa" 
                  checked={paymentInfo.method === 'mpesa'}
                  onChange={handlePaymentChange}
                  className="mr-2" 
                />
                <label htmlFor="mpesa-attendees" className="text-sm">Mobile Money (Mpesa)</label>
              </div>
              {paymentInfo.method === 'mpesa' && (
                <div className="ml-6 mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-700">
                    <strong>Note:</strong> Payment will be processed in Kenyan Shillings (KES). 
                    The amount will be automatically converted from USD to KES.
                  </p>
                  {selectedTickets.length > 0 && (
                    <p className="text-xs text-blue-700 mt-2">
                      <strong>Amount in KES:</strong> {formatCurrency(
                        convertUSDToKES(
                          promoCodeValidation?.valid 
                            ? selectedTickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0) - promoCodeValidation.promoCode.discountAmount
                            : selectedTickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0)
                        ),
                        'KES'
                      )}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeesStep;
