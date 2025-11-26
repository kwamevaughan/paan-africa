import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Header from '@/layouts/standard-header';
import Footer from '@/layouts/footer';
import SEO from '@/components/SEO';

const PaymentSuccessPage = () => {
  const router = useRouter();
  const { reference, type } = router.query;
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    if (reference && type) {
      // You could fetch payment details from your backend here
      setPaymentDetails({
        reference,
        type,
        timestamp: new Date().toLocaleString()
      });
    }
  }, [reference, type]);

  const getSuccessMessage = () => {
    switch (type) {
      case 'masterclass':
        return {
          title: 'Masterclass Registration Successful',
          message: 'Your masterclass registration has been confirmed and payment processed successfully.',
          nextSteps: [
            'Check your email for confirmation and joining instructions',
            'You\'ll receive session details 24 hours before the masterclass',
            'Prepare any questions you\'d like to ask during the session',
            'Test your internet connection and Zoom setup'
          ],
          returnLink: '/masterclasses',
          returnText: 'Browse More Masterclasses'
        };
      case 'summit':
        return {
          title: 'Summit Ticket Purchase Successful',
          message: 'Your PAAN Summit 2026 ticket has been confirmed and payment processed successfully.',
          nextSteps: [
            'Check your email for ticket confirmation',
            'You\'ll receive venue details closer to the event',
            'Follow us on social media for updates',
            'Mark your calendar: April 21-22, 2026 in Nairobi, Kenya'
          ],
          returnLink: '/summit',
          returnText: 'Back to Summit'
        };
      default:
        return {
          title: 'Payment Successful',
          message: 'Your payment has been processed successfully.',
          nextSteps: [
            'Check your email for confirmation',
            'You\'ll receive further details shortly'
          ],
          returnLink: '/',
          returnText: 'Back to Home'
        };
    }
  };

  const successInfo = getSuccessMessage();

  return (
    <>
      <SEO
        title="Payment Successful | PAAN"
        description="Your payment has been processed successfully. Thank you for your purchase."
      />
      
      <Header />
      
      <div className='relative'>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            {/* Success Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-10 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-200">
                <Icon icon="mdi:check-circle-outline" className="w-9 h-9 text-green-600" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                {successInfo.title}
              </h1>
              <p className="text-gray-600 text-base max-w-xl mx-auto">
                {successInfo.message}
              </p>
            </div>

            {/* Payment Details */}
            <div className="px-8 py-8">
              {paymentDetails && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Transaction Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-600">Reference Number:</span>
                      <span className="font-mono text-sm text-gray-900 font-medium">{paymentDetails.reference}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-600">Transaction Type:</span>
                      <span className="capitalize text-sm text-gray-900 font-medium">{paymentDetails.type}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-600">Processed At:</span>
                      <span className="text-sm text-gray-900">{paymentDetails.timestamp}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className="inline-flex items-center gap-1.5 text-sm">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-green-700 font-medium">Confirmed</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Next Steps */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Next Steps</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="space-y-3">
                    {successInfo.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#F25849] text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href={successInfo.returnLink}
                  className="flex-1 bg-[#F25849] text-white px-6 py-3.5 rounded-lg font-medium text-sm text-center hover:bg-[#D6473C] transition-colors duration-200 shadow-sm"
                >
                  {successInfo.returnText}
                </Link>
                <Link
                  href="/contact-us"
                  className="flex-1 bg-white text-gray-700 px-6 py-3.5 rounded-lg font-medium text-sm text-center hover:bg-gray-50 transition-colors duration-200 border border-gray-300"
                >
                  Contact Support
                </Link>
              </div>

              {/* Additional Info */}
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200 mb-8">
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:information-outline" className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1.5">Email Confirmation</p>
                    <p className="leading-relaxed">If you don't receive a confirmation email within 10 minutes, please check your spam folder or contact us at <a href="mailto:secretariat@paan.africa" className="text-blue-900 underline font-medium hover:text-blue-800">secretariat@paan.africa</a>.</p>
                  </div>
                </div>
              </div>

              {/* Additional Resources */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Additional Resources</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:email-outline" className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5 text-sm">Email Support</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">For any questions or concerns, reach out to our team at <a href="mailto:secretariat@paan.africa" className="text-[#F25849] hover:underline">secretariat@paan.africa</a></p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:file-document-outline" className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5 text-sm">Receipt & Invoice</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">Your payment receipt and invoice have been sent to your registered email address.</p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:account-circle-outline" className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5 text-sm">Account Access</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">You can view your transaction history and manage your registrations from your account dashboard.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      </div>
    </>
  );
};

export default PaymentSuccessPage;