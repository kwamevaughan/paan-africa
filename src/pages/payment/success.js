import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

const PaymentSuccessPage = () => {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { reference, type } = router.query;
    
    if (reference) {
      verifyPayment(reference);
    } else {
      setLoading(false);
    }
  }, [router.query]);

  const verifyPayment = async (reference) => {
    try {
      const response = await fetch('/api/paystack/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference }),
      });

      const result = await response.json();

      if (result.success) {
        setPaymentData(result.data);
      } else {
        setError(result.message || 'Payment verification failed');
      }
    } catch (err) {
      console.error('Payment verification error:', err);
      setError('Failed to verify payment. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const getPaymentTypeInfo = () => {
    if (!paymentData?.metadata) return { title: 'Payment Successful', description: 'Your payment has been processed successfully.' };

    const customFields = paymentData.metadata.custom_fields || [];
    const fieldMap = {};
    customFields.forEach(field => {
      fieldMap[field.variable_name] = field.value;
    });

    if (fieldMap.applicant_type) {
      return {
        title: 'Awards Application Submitted!',
        description: `Your ${fieldMap.applicant_type} application for PAAN Awards has been submitted successfully.`,
        type: 'awards'
      };
    } else if (fieldMap.ticket_type) {
      return {
        title: 'Summit Ticket Purchased!',
        description: `Your ${fieldMap.ticket_type} ticket for PAAN Summit has been confirmed.`,
        type: 'summit'
      };
    }

    return { title: 'Payment Successful', description: 'Your payment has been processed successfully.' };
  };

  const paymentInfo = getPaymentTypeInfo();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon icon="mdi:loading" className="w-8 h-8 animate-spin text-paan-red mx-auto mb-4" />
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-6">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Icon icon="mdi:close-circle" className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Verification Failed</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-paan-red text-white px-6 py-3 rounded-lg hover:bg-paan-red/90 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Payment Successful | PAAN Africa"
        description="Your payment has been processed successfully. Thank you for your purchase."
        keywords="payment success, PAAN Africa, payment confirmation"
      />
      
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PaymentStatus",
              "name": "Payment Successful",
              "description": "Payment has been processed successfully",
              "status": "Completed"
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
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"
            >
              <Icon icon="mdi:check-circle" className="w-12 h-12 text-green-600" />
            </motion.div>

            {/* Success Message */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              {paymentInfo.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-600 mb-8"
            >
              {paymentInfo.description}
            </motion.p>

            {/* Payment Details */}
            {paymentData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-50 rounded-xl p-6 mb-8 text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-mono text-sm">{paymentData.reference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">
                      {paymentData.currency} {(paymentData.amount / 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-semibold capitalize">{paymentData.status}</span>
                  </div>
                  {paymentData.paidAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paid At:</span>
                      <span>{new Date(paymentData.paidAt).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
              <div className="space-y-3 text-left">
                {paymentInfo.type === 'awards' && (
                  <>
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:email" className="w-5 h-5 text-paan-red mt-1" />
                      <span className="text-gray-600">You'll receive a confirmation email with your application details</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:calendar" className="w-5 h-5 text-paan-red mt-1" />
                      <span className="text-gray-600">We'll review your application and notify you of the results</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:trophy" className="w-5 h-5 text-paan-red mt-1" />
                      <span className="text-gray-600">Finalists will be announced on April 22, 2026</span>
                    </div>
                  </>
                )}
                {paymentInfo.type === 'summit' && (
                  <>
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:email" className="w-5 h-5 text-paan-red mt-1" />
                      <span className="text-gray-600">You'll receive your ticket via email shortly</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:calendar" className="w-5 h-5 text-paan-red mt-1" />
                      <span className="text-gray-600">Save the date: April 21-22, 2026 in Nairobi</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:map-marker" className="w-5 h-5 text-paan-red mt-1" />
                      <span className="text-gray-600">Venue details will be shared closer to the event</span>
                    </div>
                  </>
                )}
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
                onClick={() => router.push('/')}
                className="bg-paan-red text-white px-8 py-3 rounded-lg hover:bg-paan-red/90 transition-colors font-medium"
              >
                Return Home
              </button>
              {paymentInfo.type === 'awards' && (
                <button
                  onClick={() => router.push('/paan-awards')}
                  className="bg-transparent border-2 border-paan-red text-paan-red px-8 py-3 rounded-lg hover:bg-paan-red hover:text-white transition-colors font-medium"
                >
                  View Awards
                </button>
              )}
              {paymentInfo.type === 'summit' && (
                <button
                  onClick={() => router.push('/summit')}
                  className="bg-transparent border-2 border-paan-red text-paan-red px-8 py-3 rounded-lg hover:bg-paan-red hover:text-white transition-colors font-medium"
                >
                  View Summit
                </button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessPage;
