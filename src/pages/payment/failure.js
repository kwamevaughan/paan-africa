import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Header from '@/layouts/standard-header';
import Footer from '@/layouts/footer';
import SEO from '@/components/SEO';

const PaymentFailurePage = () => {
  const router = useRouter();
  const { error, reference, type } = router.query;
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    if (reference && type) {
      setPaymentDetails({
        reference,
        type,
        error: decodeURIComponent(error || 'Payment failed'),
        timestamp: new Date().toLocaleString()
      });
    }
  }, [reference, type, error]);

  const getFailureMessage = () => {
    switch (type) {
      case 'masterclass':
        return {
          title: 'Masterclass Registration Failed',
          message: 'We encountered an issue processing your masterclass registration payment.',
          suggestions: [
            'Check your payment method and try again',
            'Ensure you have sufficient funds in your account',
            'Try using a different payment method',
            'Contact your bank if the issue persists'
          ],
          returnLink: '/masterclasses',
          returnText: 'Back to Masterclasses',
          retryText: 'Try Again'
        };
      case 'summit':
        return {
          title: 'Summit Ticket Purchase Failed',
          message: 'We encountered an issue processing your summit ticket payment.',
          suggestions: [
            'Check your payment method and try again',
            'Ensure you have sufficient funds in your account',
            'Try using a different payment method',
            'Contact your bank if the issue persists'
          ],
          returnLink: '/summit',
          returnText: 'Back to Summit',
          retryText: 'Try Again'
        };
      default:
        return {
          title: 'Payment Failed',
          message: 'We encountered an issue processing your payment.',
          suggestions: [
            'Check your payment method and try again',
            'Ensure you have sufficient funds in your account',
            'Try using a different payment method',
            'Contact your bank if the issue persists'
          ],
          returnLink: '/',
          returnText: 'Back to Home',
          retryText: 'Try Again'
        };
    }
  };

  const failureInfo = getFailureMessage();

  const handleRetry = () => {
    // Go back to the previous page to retry payment
    router.back();
  };

  return (
    <>
      <SEO
        title="Payment Failed | PAAN"
        description="Payment processing failed. Please try again or contact support for assistance."
      />
      
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            {/* Failure Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-10 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-200">
                <Icon icon="mdi:alert-circle-outline" className="w-9 h-9 text-red-600" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                {failureInfo.title}
              </h1>
              <p className="text-gray-600 text-base max-w-xl mx-auto">
                {failureInfo.message}
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
                      <span className="text-sm text-gray-600">Error Details:</span>
                      <span className="text-sm text-gray-900 text-right max-w-xs">{paymentDetails.error}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-600">Attempted At:</span>
                      <span className="text-sm text-gray-900">{paymentDetails.timestamp}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestions */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Recommended Actions</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="space-y-3">
                    {failureInfo.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#84C1D9] text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleRetry}
                  className="flex-1 bg-[#F25849] text-white px-6 py-3.5 rounded-lg font-medium text-sm text-center hover:bg-[#D6473C] transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
                >
                  <Icon icon="mdi:refresh" className="w-5 h-5" />
                  {failureInfo.retryText}
                </button>
                <Link
                  href={failureInfo.returnLink}
                  className="flex-1 bg-white text-gray-700 px-6 py-3.5 rounded-lg font-medium text-sm text-center hover:bg-gray-50 transition-colors duration-200 border border-gray-300"
                >
                  {failureInfo.returnText}
                </Link>
              </div>

              {/* Support Info */}
              <div className="mb-8 p-5 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:information-outline" className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-900">
                    <p className="font-semibold mb-1.5">Need Assistance?</p>
                    <p className="leading-relaxed">If you continue to experience issues, please contact our support team at <a href="mailto:secretariat@paan.africa" className="text-amber-900 underline font-medium hover:text-amber-800">secretariat@paan.africa</a> with your payment reference number.</p>
                  </div>
                </div>
              </div>

              {/* Common Issues */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Common Issues & Solutions</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:credit-card-off-outline" className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5 text-sm">Payment Declined</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">Contact your bank to ensure international payments are enabled and you have sufficient funds available.</p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:wifi-off" className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5 text-sm">Network Issues</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">Check your internet connection and try again. Avoid using public WiFi networks for secure payments.</p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:web" className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5 text-sm">Browser Issues</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">Try clearing your browser cache or using a different browser. Ensure JavaScript is enabled in your settings.</p>
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
    </>
  );
};

export default PaymentFailurePage;