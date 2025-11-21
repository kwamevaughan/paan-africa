import { convertUSDToKES, formatCurrency } from '../../utils/currencyConverter';
import FormTextarea from '../common/FormTextarea';

const PaymentStep = ({ 
  onNext, 
  onPrev, 
  paymentInfo, 
  handlePaymentChange, 
  selectedTickets, 
  errors, 
  isSubmitting, 
  promoCode, 
  setPromoCode, 
  promoCodeValidation, 
  setPromoCodeValidation, 
  handlePromoCodeValidation, 
  isValidatingPromo 
}) => {
  const totalAmount = selectedTickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0);
  
  const generateInvoice = () => {
    const invoiceData = {
      totalAmount,
      selectedTickets,
      paymentInfo,
      bankDetails: {
        payableTo: "KCB Bank Ltd",
        accountNo: "1340474921",
        accountName: "Zidipay Africa Limited",
        branch: "Sarit Centre",
        swiftCode: "KCBLKENX",
        bankCode: "01291",
        country: "Kenya",
        city: "Nairobi"
      }
    };
    
    const invoiceWindow = window.open('', '_blank', 'width=900,height=700');
    invoiceWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>PAAN Summit 2026 - Invoice</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: #f8fafc; 
            color: #1a202c; 
            line-height: 1.6;
          }
          .invoice-container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
            box-shadow: 0 10px 25px rgba(0,0,0,0.1); 
            border-radius: 12px;
            overflow: hidden;
          }
          .header { 
            background: linear-gradient(135deg, #172840 0%, #84C1D9 100%);
            color: white; 
            padding: 40px 30px; 
            text-align: center;
            position: relative;
          }
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
          }
          .logo-container { position: relative; z-index: 1; margin-bottom: 20px; }
          .logo { width: 120px; height: 60px; margin: 0 auto 15px; background: white; border-radius: 8px; padding: 10px; display: flex; align-items: center; justify-content: center; }
          .logo img { max-width: 100%; max-height: 100%; object-fit: contain; }
          .company-name { font-size: 28px; font-weight: 700; margin-bottom: 8px; text-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .invoice-title { font-size: 24px; font-weight: 600; margin-bottom: 8px; opacity: 0.95; }
          .invoice-date { font-size: 16px; opacity: 0.9; }
          .content { padding: 40px 30px; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 20px; font-weight: 600; color: #84C1D9; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0; }
          .bank-details { background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 25px; border-radius: 12px; border-left: 4px solid #172840; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          .bank-details h4 { color: #84C1D9; font-size: 18px; margin-bottom: 15px; font-weight: 600; }
          .bank-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
          .bank-row:last-child { border-bottom: none; }
          .bank-label { font-weight: 600; color: #4a5568; }
          .bank-value { color: #2d3748; font-weight: 500; }
          .ticket-table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
          .ticket-table th { background: linear-gradient(135deg, #84C1D9 0%, #172840 100%); color: white; padding: 15px 12px; text-align: left; font-weight: 600; font-size: 14px; }
          .ticket-table td { padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
          .ticket-table tr:hover { background: #f8fafc; }
          .ticket-table tr:last-child td { border-bottom: none; }
          .total-section { background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #10b981; }
          .total-amount { font-size: 24px; font-weight: 700; color: #84C1D9; text-align: center; }
          .footer { background: #172840; color: white; padding: 30px; text-align: center; }
          .footer h3 { font-size: 20px; margin-bottom: 10px; font-weight: 600; }
          .footer p { opacity: 0.9; margin-bottom: 5px; }
          .contact-info { margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.2); }
          .contact-info a { color: #60a5fa; text-decoration: none; font-weight: 500; }
          .contact-info a:hover { text-decoration: underline; }
          @media print { body { background: white; } .invoice-container { box-shadow: none; } }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <div class="logo-container">
              <div class="logo">
                <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/paan-summit-logo.svg?updatedAt=1757505542572" alt="PAAN Summit Logo" />
              </div>
              <div class="company-name">PAAN AFRICA</div>
              <div class="invoice-title">PAAN Summit 2026 - Invoice</div>
              <div class="invoice-date">Invoice Date: ${new Date().toLocaleDateString()}</div>
            </div>
          </div>
          <div class="content">
            <div class="section">
              <h3 class="section-title">Payment Instructions</h3>
              <p style="margin-bottom: 20px; color: #4a5568;">Please make payment to the following bank account to complete your registration:</p>
              <div class="bank-details">
                <h4>Bank Transfer Details</h4>
                <div class="bank-row"><span class="bank-label">Bill Payable to:</span><span class="bank-value">${invoiceData.bankDetails.payableTo}</span></div>
                <div class="bank-row"><span class="bank-label">Account No:</span><span class="bank-value">${invoiceData.bankDetails.accountNo}</span></div>
                <div class="bank-row"><span class="bank-label">Account Name:</span><span class="bank-value">${invoiceData.bankDetails.accountName}</span></div>
                <div class="bank-row"><span class="bank-label">Branch:</span><span class="bank-value">${invoiceData.bankDetails.branch}</span></div>
                <div class="bank-row"><span class="bank-label">Swift Code:</span><span class="bank-value">${invoiceData.bankDetails.swiftCode}</span></div>
                <div class="bank-row"><span class="bank-label">Bank Code:</span><span class="bank-value">${invoiceData.bankDetails.bankCode}</span></div>
                <div class="bank-row"><span class="bank-label">Country:</span><span class="bank-value">${invoiceData.bankDetails.country}</span></div>
                <div class="bank-row"><span class="bank-label">City:</span><span class="bank-value">${invoiceData.bankDetails.city}</span></div>
              </div>
            </div>
            <div class="section">
              <h3 class="section-title">Ticket Details</h3>
              <table class="ticket-table">
                <thead><tr><th>Ticket Type</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr></thead>
                <tbody>
                  ${selectedTickets.map(ticket => `
                    <tr>
                      <td>${ticket.name}</td>
                      <td>${ticket.quantity}</td>
                      <td>$${ticket.price}</td>
                      <td>$${ticket.price * ticket.quantity}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <div class="total-section">
                <div class="total-amount">Total Amount: $${totalAmount}</div>
              </div>
            </div>
          </div>
          <div class="footer">
            <h3>Thank you for registering for PAAN Summit 2026!</h3>
            <p>We look forward to seeing you at Africa's premier creative and tech leadership conference.</p>
            <div class="contact-info">
              <p>For any questions or support, contact us at:</p>
              <p><a href="mailto:secretariat@paan.africa">secretariat@paan.africa</a></p>
              <p>Visit us at: <a href="https://paan.africa">paan.africa</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    invoiceWindow.document.close();
    invoiceWindow.print();
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pt-4 sm:pt-6 pb-8 sm:pb-10 max-w-7xl mx-auto px-3 sm:px-4">
      <div>
        <div className="p-4 sm:p-6 bg-white border border-paan-blue rounded-lg shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-paan-dark-blue mb-3 sm:mb-4">Payment Method</h2>
          <form>
            <div className="space-y-4">
              <div>
                <input 
                  type="radio" 
                  id="card" 
                  name="method" 
                  value="card" 
                  checked={paymentInfo.method === 'card'}
                  onChange={handlePaymentChange}
                  className="mr-2" 
                />
                <label htmlFor="card" className="font-medium text-paan-dark-blue text-sm sm:text-base">Credit/Debit Card</label>
                {paymentInfo.method === 'card' && (
                  <div className="ml-4 sm:ml-6 mt-2">
                    <p className="text-xs sm:text-sm text-gray-600">
                      You will be redirected to Paystack's secure payment page to enter your card details.
                    </p>
                  </div>
                )}
              </div>
              <div>
                <input 
                  type="radio" 
                  id="bank" 
                  name="method" 
                  value="bank" 
                  checked={paymentInfo.method === 'bank'}
                  onChange={handlePaymentChange}
                  className="mr-2" 
                />
                <label htmlFor="bank" className="font-medium text-paan-dark-blue text-sm sm:text-base">Bank Transfer/Invoice</label>
                {paymentInfo.method === 'bank' && (
                  <div className="ml-4 sm:ml-6 mt-2 space-y-2">
                    <FormTextarea
                      name="invoiceDetails"
                      value={paymentInfo.invoiceDetails}
                      onChange={handlePaymentChange}
                      placeholder="Enter any additional invoice details or reference"
                      rows={3}
                      error={errors.invoiceDetails}
                    />
                    <button
                      type="button"
                      onClick={generateInvoice}
                      className="mt-2 px-4 py-2 bg-paan-blue text-white rounded-lg hover:bg-paan-dark-blue transition-colors"
                    >
                      Generate Invoice
                    </button>
                  </div>
                )}
              </div>
              <div>
                <input 
                  type="radio" 
                  id="mpesa" 
                  name="method" 
                  value="mpesa" 
                  checked={paymentInfo.method === 'mpesa'}
                  onChange={handlePaymentChange}
                  className="mr-2" 
                />
                <label htmlFor="mpesa" className="font-medium text-paan-dark-blue text-sm sm:text-base">Mobile Money (Mpesa)</label>
                {paymentInfo.method === 'mpesa' && (
                  <div className="ml-4 sm:ml-6 mt-2 space-y-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs sm:text-sm text-blue-700 mb-2">
                        <strong>Note:</strong> Payment will be processed in Kenyan Shillings (KES) via Mpesa. 
                        The amount will be automatically converted from USD to KES.
                      </p>
                      <p className="text-xs sm:text-sm text-blue-700">
                        You will be redirected to Paystack's secure payment page to complete the Mpesa transaction.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div>
        <div className="p-4 sm:p-6 bg-white border border-paan-blue rounded-lg shadow-sm">
          <div className="flex justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-paan-dark-blue">Order Summary</h2>
            <p className="font-normal text-paan-red text-xs sm:text-sm">Early Bird active</p>
          </div>
          <div className="space-y-2 mb-3 sm:mb-4">
            {selectedTickets.map((ticket, index) => (
              <div key={index} className="flex justify-between text-sm sm:text-base">
                <span>{ticket.name} × {ticket.quantity}</span>
                <span>${ticket.price * ticket.quantity}</span>
              </div>
            ))}
            <hr />
            <div className="flex justify-between text-sm sm:text-base">
              <span>Subtotal</span>
              <span>${totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Promo</span>
              <span className="text-green-600">
                {promoCodeValidation?.valid ? `-$${promoCodeValidation.promoCode.discountAmount}` : '-$0'}
              </span>
            </div>
            <div className="flex justify-between font-bold text-base sm:text-lg">
              <span>Total</span>
              <span>
                {paymentInfo.method === 'mpesa' 
                  ? formatCurrency(
                      convertUSDToKES(
                        promoCodeValidation?.valid 
                          ? totalAmount - promoCodeValidation.promoCode.discountAmount 
                          : totalAmount
                      ),
                      'KES'
                    )
                  : `$${promoCodeValidation?.valid ? totalAmount - promoCodeValidation.promoCode.discountAmount : totalAmount}`
                }
              </span>
            </div>
            {paymentInfo.method === 'mpesa' && (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                <p>Original amount: ${promoCodeValidation?.valid ? totalAmount - promoCodeValidation.promoCode.discountAmount : totalAmount} USD</p>
              </div>
            )}
          </div>
          
          {/* Promo Code Section */}
          <div className="mb-3 sm:mb-4">
            <form onSubmit={handlePromoCodeValidation}>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handlePromoCodeValidation(e);
                    }
                  }}
                  placeholder="Have a promo code?"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-paan-blue rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent text-sm sm:text-base"
                />
                <div className="flex gap-2">
                  <button 
                    type="submit"
                    disabled={isValidatingPromo || !promoCode.trim()}
                    className="bg-paan-dark-blue text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-paan-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isValidatingPromo ? 'Validating...' : 'Apply'}
                  </button>
                  {promoCode.trim() && (
                    <button 
                      type="button"
                      onClick={() => {
                        setPromoCode('');
                        setPromoCodeValidation(null);
                      }}
                      className="bg-gray-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base"
                      title="Clear promo code"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </form>
            {promoCodeValidation && (
              <div className={`mt-2 p-3 rounded-lg ${
                promoCodeValidation.valid 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center">
                  <div className={`mr-2 ${
                    promoCodeValidation.valid ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {promoCodeValidation.valid ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className={`text-sm font-medium ${
                    promoCodeValidation.valid ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {promoCodeValidation.valid 
                      ? `${promoCodeValidation.promoCode.description} - Save $${promoCodeValidation.promoCode.discountAmount}`
                      : promoCodeValidation.error
                    }
                  </p>
                </div>
                {!promoCodeValidation.valid && promoCodeValidation.error === 'Promo code does not exist' && (
                  <p className="text-xs text-red-600 mt-1">
                    Please check the code and try again, or contact support if you believe this is an error.
                  </p>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
            <button
              onClick={onPrev}
              className="bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              Back to Details
            </button>
            <button
              onClick={onNext}
              disabled={isSubmitting}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-colors text-sm sm:text-base ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-paan-red text-white hover:bg-red-600'
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Complete Purchase'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
