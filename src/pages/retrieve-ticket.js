import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../layouts/standard-header';
import Footer from '../layouts/footer';
import SEO from '../components/SEO';

const RetrieveTicketPage = () => {
  const [searchType, setSearchType] = useState('email'); // 'email' or 'registration'
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tickets, setTickets] = useState([]);
  const [downloadingTicket, setDownloadingTicket] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setTickets([]);
    setLoading(true);

    try {
      const response = await fetch('/api/retrieve-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchType,
          searchValue: searchValue.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to retrieve tickets');
      }

      if (data.tickets && data.tickets.length > 0) {
        setTickets(data.tickets);
      } else {
        setError('No tickets found. Please check your information and try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (ticket, format) => {
    setDownloadingTicket(`${ticket.id}-${format}`);
    
    try {
      const endpoint = format === 'pdf' ? '/api/generate-pdf-ticket' : '/api/generate-ticket';
      
      const ticketData = {
        name: ticket.attendee_name,
        email: ticket.attendee_email,
        ticketType: ticket.ticket_type,
        ticketId: ticket.payment_reference.substring(0, 10),
        registrationNo: ticket.payment_reference,
        issuedOn: new Date(ticket.paid_at).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        })
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketData })
      });

      if (!response.ok) {
        throw new Error('Failed to generate ticket');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `PAAN-Summit-2026-Ticket-${ticket.payment_reference}.${format === 'pdf' ? 'pdf' : 'png'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(`Failed to download ${format.toUpperCase()}: ${err.message}`);
    } finally {
      setDownloadingTicket(null);
    }
  };

  const handleResendEmail = async (ticket) => {
    setDownloadingTicket(`${ticket.id}-email`);
    
    try {
      const response = await fetch('/api/resend-ticket-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attendeeId: ticket.id,
          paymentReference: ticket.payment_reference
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend email');
      }

      alert(`Ticket email sent successfully to ${ticket.attendee_email}`);
    } catch (err) {
      setError(`Failed to resend email: ${err.message}`);
    } finally {
      setDownloadingTicket(null);
    }
  };

  return (
    <>
      <SEO
        title="Retrieve Your Ticket - PAAN Summit 2026"
        description="Retrieve your PAAN Summit 2026 ticket using your email or registration number."
      />

      <Header navLinkColor="text-gray-900" />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#172840] mb-4">
              Retrieve Your Ticket
            </h1>
            <p className="text-lg text-gray-600">
              Enter your email address or registration number to download your PAAN Summit 2026 ticket
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <form onSubmit={handleSearch} className="space-y-6">
              {/* Search Type Toggle */}
              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => setSearchType('email')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    searchType === 'email'
                      ? 'bg-[#84C1D9] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Search by Email
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType('registration')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    searchType === 'registration'
                      ? 'bg-[#84C1D9] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Search by Registration No.
                </button>
              </div>

              {/* Search Input */}
              <div>
                <label htmlFor="searchValue" className="block text-sm font-medium text-gray-700 mb-2">
                  {searchType === 'email' ? 'Email Address' : 'Registration Number'}
                </label>
                <input
                  type={searchType === 'email' ? 'email' : 'text'}
                  id="searchValue"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={
                    searchType === 'email'
                      ? 'Enter your email address'
                      : 'Enter your registration number (e.g., PAAN_1234567890_xxxxx)'
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !searchValue.trim()}
                className="w-full bg-[#84C1D9] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#6BA8C4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {loading ? 'Searching...' : 'Retrieve Ticket'}
              </button>
            </form>
          </div>

          {/* Tickets List */}
          {tickets.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#172840] mb-4">
                Your Tickets ({tickets.length})
              </h2>
              
              {tickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#84C1D9]">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Ticket Info */}
                    <div>
                      <h3 className="text-xl font-bold text-[#172840] mb-4">
                        {ticket.attendee_name}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium">{ticket.attendee_email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ticket Type:</span>
                          <span className="font-medium">{ticket.ticket_type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Registration No:</span>
                          <span className="font-mono text-xs">{ticket.payment_reference}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Purchase Date:</span>
                          <span className="font-medium">
                            {new Date(ticket.paid_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Confirmed
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col justify-center space-y-3">
                      <button
                        onClick={() => handleDownload(ticket, 'pdf')}
                        disabled={downloadingTicket === `${ticket.id}-pdf`}
                        className="bg-[#172840] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0f1a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {downloadingTicket === `${ticket.id}-pdf` ? (
                          'Generating...'
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download PDF
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleDownload(ticket, 'png')}
                        disabled={downloadingTicket === `${ticket.id}-png`}
                        className="bg-[#84C1D9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6BA8C4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {downloadingTicket === `${ticket.id}-png` ? (
                          'Generating...'
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Download Image
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleResendEmail(ticket)}
                        disabled={downloadingTicket === `${ticket.id}-email`}
                        className="bg-white text-[#172840] border-2 border-[#172840] px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {downloadingTicket === `${ticket.id}-email` ? (
                          'Sending...'
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Resend Email
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Help Section */}
          <div className="mt-12 bg-blue-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[#172840] mb-3">Need Help?</h3>
            <p className="text-gray-700 mb-4">
              If you're having trouble retrieving your ticket, please contact us:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#84C1D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email: <a href="mailto:secretariat@paan.africa" className="text-[#84C1D9] hover:underline">secretariat@paan.africa</a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#84C1D9] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Make sure to check your spam/junk folder for the original ticket email</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RetrieveTicketPage;
