import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

const PaymentFailurePage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('Payment was not successful');
  const [reference, setReference] = useState('');

  useEffect(() => {
    const { error, reference: ref } = router.query;
    
    if (error) {
      setErrorMessage(decodeURIComponent(error));
    }
    
    if (ref) {
      setReference(ref);
    }
  }, [router.query]);

  const getErrorMessage = () => {
    if (errorMessage.includes('cancelled') || errorMessage.includes('canceled')) {
      return {
        title: 'Payment Cancelled',
        description: 'You cancelled the payment process. No charges were made to your account.',
        icon: 'mdi:cancel',
        color: 'yellow'
      };
    } else if (errorMessage.includes('insufficient')) {
      return {
        title: 'Insufficient Funds',
        description: 'Your payment could not be processed due to insufficient funds in your account.',
        icon: 'mdi:alert-circle',
        color: 'red'
      };
    } else if (errorMessage.includes('expired')) {
      return {
        title: 'Payment Expired',
        description: 'The payment session has expired. Please try again with a fresh payment.',
        icon: 'mdi:clock-alert',
        color: 'red'
      };
    } else {
      return {
        title: 'Payment Failed',
        description: 'We encountered an issue processing your payment. Please try again or contact support.',
        icon: 'mdi:close-circle',
        color: 'red'
      };
    }
  };

  const errorInfo = getErrorMessage();

  return (
    <>
      <SEO
        title="Payment Failed | PAAN Africa"
        description="Your payment could not be processed. Please try again or contact support."
        keywords="payment failed, PAAN Africa, payment error"
      />
      
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PaymentStatus",
              "name": "Payment Failed",
              "description": "Payment could not be processed",
              "status": "Failed"
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className={`${
                errorInfo.color === 'red' ? 'bg-red-100' : 'bg-yellow-100'
              } rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6`}
            >
              <Icon 
                icon={errorInfo.icon} 
                className={`w-12 h-12 ${
                  errorInfo.color === 'red' ? 'text-red-600' : 'text-yellow-600'
                }`} 
              />
            </motion.div>

            {/* Error Message */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              {errorInfo.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-600 mb-8"
            >
              {errorInfo.description}
            </motion.p>

            {/* Reference Number */}
            {reference && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-50 rounded-xl p-4 mb-8"
              >
                <p className="text-sm text-gray-600 mb-2">Reference Number:</p>
                <p className="font-mono text-lg font-semibold text-gray-900">{reference}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Please keep this reference number when contacting support
                </p>
              </motion.div>
            )}

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:refresh" className="w-5 h-5 text-paan-red mt-1" />
                  <span className="text-gray-600">Try the payment again - sometimes it's just a temporary issue</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:credit-card" className="w-5 h-5 text-paan-red mt-1" />
                  <span className="text-gray-600">Check that your card details are correct and your card is active</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:bank" className="w-5 h-5 text-paan-red mt-1" />
                  <span className="text-gray-600">Ensure you have sufficient funds in your account</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:email" className="w-5 h-5 text-paan-red mt-1" />
                  <span className="text-gray-600">Contact support if the problem persists</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => router.back()}
                className="bg-paan-red text-white px-8 py-3 rounded-lg hover:bg-paan-red/90 transition-colors font-medium"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push('/')}
                className="bg-transparent border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Return Home
              </button>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <p className="text-sm text-gray-600 mb-2">Still having trouble?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                <a
                  href="mailto:secretariat@paan.africa"
                  className="text-paan-red hover:text-paan-red/80 transition-colors flex items-center gap-2"
                >
                  <Icon icon="mdi:email" className="w-4 h-4" />
                  secretariat@paan.africa
                </a>
                <a
                  href="tel:+254701850850"
                  className="text-paan-red hover:text-paan-red/80 transition-colors flex items-center gap-2"
                >
                  <Icon icon="mdi:phone" className="w-4 h-4" />
                  +254 701 850 850
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PaymentFailurePage;
