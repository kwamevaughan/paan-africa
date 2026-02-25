import { useState } from 'react';
import Head from 'next/head';

export default function TestTicketPage() {
  const [formData, setFormData] = useState({
    name: 'john Doe',
    email: 'john@example.com',
    ticketType: 'General Admission',
    sendEmail: false
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [ticketImage, setTicketImage] = useState(null);

  const ticketTypes = [
    'General Admission',
    'VIP Delegate',
    'Agency/Team Pass',
    'Students & Young Creatives',
    'International Delegate',
    'Virtual Access'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGenerateTicket = async () => {
    setLoading(true);
    setResult(null);
    setTicketImage(null);

    try {
      // Generate ticket data
      const ticketData = {
        name: formData.name,
        email: formData.email,
        ticketType: formData.ticketType,
        ticketId: Math.floor(Math.random() * 100000).toString(),
        registrationNo: `PAAN_TEST_${Date.now()}`,
        issuedOn: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit' 
        })
      };

      // Generate ticket image
      const response = await fetch('/api/generate-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketData })
      });

      if (!response.ok) {
        throw new Error('Failed to generate ticket');
      }

      // Convert response to blob and create object URL
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setTicketImage(imageUrl);

      setResult({
        success: true,
        message: 'Ticket generated successfully!',
        ticketData
      });

    } catch (error) {
      console.error('Error generating ticket:', error);
      setResult({
        success: false,
        message: error.message || 'Failed to generate ticket'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendTestEmail = async () => {
    setLoading(true);
    setResult(null);

    try {
      // Prepare test data
      const paymentData = {
        currency: 'USD',
        amount: 6500, // $65 in cents
        status: 'success',
        paidAt: new Date().toISOString()
      };

      const ticketData = {
        name: formData.name,
        email: formData.email,
        phone: '+254 700 000 000',
        country: 'Kenya',
        role: 'Test Role',
        company: 'Test Company',
        ticketType: formData.ticketType,
        currency: 'USD',
        amount: 65,
        features: [
          'Full 2-day access',
          'Exhibitions & keynotes',
          'Digital certificate'
        ]
      };

      const reference = `TEST_${Date.now()}`;

      // Send test email
      const response = await fetch('/api/send-summit-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentData,
          ticketData,
          reference
        })
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          success: true,
          message: `Test email sent successfully to ${formData.email}! Check your inbox.`,
          reference
        });
      } else {
        throw new Error(data.message || 'Failed to send email');
      }

    } catch (error) {
      console.error('Error sending test email:', error);
      setResult({
        success: false,
        message: error.message || 'Failed to send test email'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTicket = () => {
    if (ticketImage) {
      const link = document.createElement('a');
      link.href = ticketImage;
      link.download = `PAAN-Summit-Ticket-${formData.name.replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Head>
        <title>Test Ticket Generation - PAAN Summit</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#172840] to-[#84C1D9] px-6 py-8">
              <h1 className="text-3xl font-bold text-white text-center">
                PAAN Summit Ticket Generator - Test Page
              </h1>
              <p className="text-white/90 text-center mt-2">
                Test ticket generation without real payment
              </p>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Attendee Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent"
                    placeholder="Enter attendee name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Ticket Type */}
                <div>
                  <label htmlFor="ticketType" className="block text-sm font-medium text-gray-700 mb-2">
                    Ticket Type
                  </label>
                  <select
                    id="ticketType"
                    name="ticketType"
                    value={formData.ticketType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent"
                  >
                    {ticketTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={handleGenerateTicket}
                    disabled={loading}
                    className="flex-1 bg-[#84C1D9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6BA8C4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Generating...' : 'Generate Ticket Image'}
                  </button>

                  <button
                    onClick={handleSendTestEmail}
                    disabled={loading}
                    className="flex-1 bg-[#172840] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2C3E50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send Test Email'}
                  </button>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm text-blue-700">
                      <p className="font-semibold mb-1">Testing Options:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Generate Ticket Image:</strong> Creates and displays the ticket (no email sent)</li>
                        <li><strong>Send Test Email:</strong> Generates ticket and sends it to the email address above</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Message */}
              {result && (
                <div className={`mt-6 p-4 rounded-lg ${
                  result.success 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-start">
                    {result.success ? (
                      <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <div className={result.success ? 'text-green-700' : 'text-red-700'}>
                      <p className="font-semibold">{result.success ? 'Success!' : 'Error'}</p>
                      <p className="text-sm mt-1">{result.message}</p>
                      {result.ticketData && (
                        <div className="mt-2 text-xs">
                          <p>Ticket ID: {result.ticketData.ticketId}</p>
                          <p>Registration: {result.ticketData.registrationNo}</p>
                        </div>
                      )}
                      {result.reference && (
                        <div className="mt-2 text-xs">
                          <p>Reference: {result.reference}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Ticket Preview */}
              {ticketImage && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Generated Ticket Preview</h2>
                    <button
                      onClick={handleDownloadTicket}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </button>
                  </div>
                  <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={ticketImage} 
                      alt="Generated Ticket" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <a 
              href="/summit/purchase-ticket" 
              className="text-[#84C1D9] hover:text-[#172840] font-medium"
            >
              ← Back to Purchase Page
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
