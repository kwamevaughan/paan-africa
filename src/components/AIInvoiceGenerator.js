import { useState } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import Image from 'next/image';

const AIInvoiceGenerator = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    currency: 'USD',
    services: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    taxRate: 0,
    discount: 0,
    notes: '',
    paymentTerms: 'Net 30',
    paymentMethods: []
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedInvoice, setGeneratedInvoice] = useState(null);
  const [activeTab, setActiveTab] = useState('form');
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  const currencies = [
    'USD', 'EUR', 'GBP', 'NGN', 'ZAR', 'KES', 'GHS', 'EGP', 'MAD', 'TND', 'DZD', 'XOF', 'XAF'
  ];

  const paymentTermsOptions = [
    'Net 15',
    'Net 30',
    'Net 45',
    'Net 60',
    'Due on Receipt',
    '50% Upfront, 50% on Completion',
    'Custom'
  ];

  const paymentMethodsOptions = [
    'Bank Transfer',
    'Credit Card',
    'PayPal',
    'Stripe',
    'Paystack',
    'Flutterwave',
    'Cash',
    'Check'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value
    };
    
    // Calculate amount if quantity or rate changes
    if (field === 'quantity' || field === 'rate') {
      updatedServices[index].amount = updatedServices[index].quantity * updatedServices[index].rate;
    }
    
    setFormData(prev => ({
      ...prev,
      services: updatedServices
    }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { description: '', quantity: 1, rate: 0, amount: 0 }]
    }));
  };

  const removeService = (index) => {
    if (formData.services.length > 1) {
      setFormData(prev => ({
        ...prev,
        services: prev.services.filter((_, i) => i !== index)
      }));
    }
  };

  const handlePaymentMethodChange = (method) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter(m => m !== method)
        : [...prev.paymentMethods, method]
    }));
  };

  const calculateTotals = () => {
    const subtotal = formData.services.reduce((sum, service) => sum + (service.amount || 0), 0);
    const discountAmount = (subtotal * formData.discount) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * formData.taxRate) / 100;
    const total = taxableAmount + taxAmount;
    
    return {
      subtotal,
      discountAmount,
      taxableAmount,
      taxAmount,
      total
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.businessName || !formData.clientName || !formData.invoiceNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.services.every(service => !service.description.trim())) {
      toast.error('Please add at least one service item');
      return;
    }

    setIsGenerating(true);
    const toastId = toast.loading('Generating your professional invoice...');

    try {
      const response = await fetch('/api/ai-invoice-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedInvoice(data);
        setActiveTab('invoice');
        toast.success('Invoice generated successfully!', { id: toastId });
      } else {
        throw new Error(data.message || 'Failed to generate invoice');
      }
    } catch (error) {
      console.error('Error generating invoice:', error);
      toast.error(error.message || 'Failed to generate invoice. Please try again.', { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setFormData({
      businessName: '',
      businessEmail: '',
      businessPhone: '',
      businessAddress: '',
      clientName: '',
      clientEmail: '',
      clientAddress: '',
      invoiceNumber: '',
      invoiceDate: '',
      dueDate: '',
      currency: 'USD',
      services: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
      taxRate: 0,
      discount: 0,
      notes: '',
      paymentTerms: 'Net 30',
      paymentMethods: []
    });
    setGeneratedInvoice(null);
    setActiveTab('form');
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const downloadInvoice = () => {
    if (!generatedInvoice) return;

    const content = `PAAN AI Generated Invoice

Invoice Details:
- Invoice Number: ${generatedInvoice.invoiceDetails.invoiceNumber}
- Date: ${generatedInvoice.invoiceDetails.invoiceDate}
- Due Date: ${generatedInvoice.invoiceDetails.dueDate}
- Currency: ${generatedInvoice.invoiceDetails.currency}

Business: ${generatedInvoice.invoiceDetails.businessName}
Client: ${generatedInvoice.invoiceDetails.clientName}

Generated on: ${new Date(generatedInvoice.timestamp).toLocaleDateString()}

${generatedInvoice.invoice}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PAAN_Invoice_${formData.invoiceNumber || 'Invoice'}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExport = (type) => {
    setShowExportDropdown(false);
    if (type === 'pdf') {
      // TODO: Implement PDF export
      toast('Export to PDF coming soon!');
    } else if (type === 'word') {
      // TODO: Implement Word export
      toast('Export to Word coming soon!');
    } else if (type === 'txt') {
      downloadInvoice();
    }
  };

  const totals = calculateTotals();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F25849] to-[#F2B706] p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Icon icon="fa-solid:file-invoice-dollar" className="w-8 h-8" />
          <h2 className="text-2xl font-bold">PAAN AI Invoice Generator</h2>
        </div>
        <p className="text-white/90">
          Generate professional invoices powered by AI. Create polished, client-ready invoices in seconds.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
            activeTab === 'form'
              ? 'bg-[#F25849] text-white'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon icon="fa-solid:edit" className="w-5 h-5 inline mr-2" />
          Invoice Details
        </button>
        {generatedInvoice && (
          <button
            onClick={() => setActiveTab('invoice')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'invoice'
                ? 'bg-[#F25849] text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon icon="fa-solid:file-invoice" className="w-5 h-5 inline mr-2" />
            Generated Invoice
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon icon="fa-solid:building" className="w-5 h-5 mr-2 text-[#F25849]" />
                Your Business Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Email
                  </label>
                  <input
                    type="email"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Phone
                  </label>
                  <input
                    type="tel"
                    name="businessPhone"
                    value={formData.businessPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Address
                </label>
                <textarea
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent resize-none"
                  rows="3"
                />
              </div>
            </div>

            {/* Client Information */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon icon="fa-solid:user" className="w-5 h-5 mr-2 text-[#84C1D9]" />
                Client Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Email
                  </label>
                  <input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Address
                </label>
                <textarea
                  name="clientAddress"
                  value={formData.clientAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent resize-none"
                  rows="3"
                />
              </div>
            </div>

            {/* Invoice Details */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon icon="fa-solid:file-invoice" className="w-5 h-5 mr-2 text-[#F2B706]" />
                Invoice Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2B706] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Date
                  </label>
                  <input
                    type="date"
                    name="invoiceDate"
                    value={formData.invoiceDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2B706] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2B706] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Icon icon="fa-solid:list" className="w-5 h-5 mr-2 text-green-600" />
                  Services & Items
                </h3>
                <button
                  type="button"
                  onClick={addService}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Icon icon="fa-solid:plus" className="w-4 h-4" />
                  Add Service
                </button>
              </div>
              
              {formData.services.map((service, index) => (
                <div key={index} className="bg-white p-4 rounded-lg mb-4 border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800">Service {index + 1}</h4>
                    {formData.services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Icon icon="fa-solid:trash" className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        value={service.description}
                        onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Service description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={service.quantity}
                        onChange={(e) => handleServiceChange(index, 'quantity', parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rate ({formData.currency})
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={service.rate}
                        onChange={(e) => handleServiceChange(index, 'rate', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-3 text-right">
                    <span className="text-lg font-semibold text-gray-800">
                      Amount: {formData.currency} {service.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Details */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon icon="fa-solid:calculator" className="w-5 h-5 mr-2 text-purple-600" />
                Financial Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    name="taxRate"
                    value={formData.taxRate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Terms
                  </label>
                  <select
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {paymentTermsOptions.map((term) => (
                      <option key={term} value={term}>{term}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Methods
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {paymentMethodsOptions.map((method) => (
                    <label key={method} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.paymentMethods.includes(method)}
                        onChange={() => handlePaymentMethodChange(method)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Totals Summary */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon icon="fa-solid:receipt" className="w-5 h-5 mr-2 text-gray-600" />
                Invoice Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formData.currency} {totals.subtotal.toFixed(2)}</span>
                </div>
                {formData.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({formData.discount}%):</span>
                    <span>-{formData.currency} {totals.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {formData.taxRate > 0 && (
                  <div className="flex justify-between">
                    <span>Tax ({formData.taxRate}%):</span>
                    <span>{formData.currency} {totals.taxAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total:</span>
                  <span>{formData.currency} {totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any additional notes or terms for the client"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent resize-none"
                rows="3"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-[#F25849] text-white py-3 px-6 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                  Generating Invoice...
                </>
              ) : (
                <>
                  <Icon icon="fa-solid:file-invoice-dollar" className="w-5 h-5" />
                  Generate Professional Invoice
                </>
              )}
            </button>
          </form>
        )}

        {activeTab === 'invoice' && generatedInvoice && (
          <div className="space-y-6">
            {/* Invoice Summary */}
            <div className="bg-[#84C1D9]/10 p-4 rounded-lg border-l-4 border-[#84C1D9]">
              <h3 className="font-semibold text-[#172840] mb-2">Invoice Summary</h3>
              <p className="text-gray-700">{generatedInvoice.summary}</p>
            </div>

            {/* Invoice Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Invoice Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div><strong>Invoice Number:</strong> {generatedInvoice.invoiceDetails.invoiceNumber}</div>
                <div><strong>Date:</strong> {generatedInvoice.invoiceDetails.invoiceDate}</div>
                <div><strong>Due Date:</strong> {generatedInvoice.invoiceDetails.dueDate}</div>
                <div><strong>Currency:</strong> {generatedInvoice.invoiceDetails.currency}</div>
              </div>
            </div>

            {/* Generated Invoice */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Complete Invoice</h3>
                <div className="flex gap-2 relative">
                  <button
                    onClick={() => copyToClipboard(generatedInvoice.invoice)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center gap-1"
                  >
                    <Icon icon="mdi:content-copy" className="w-4 h-4" />
                    Copy
                  </button>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowExportDropdown((prev) => !prev)}
                      className="px-3 py-1 text-sm bg-[#F2B706] hover:bg-[#E6A800] text-white rounded-md transition-colors flex items-center gap-1"
                    >
                      <Icon icon="mdi:download" className="w-4 h-4" />
                      Export
                      <Icon icon="mdi:chevron-down" className="w-4 h-4 ml-1" />
                    </button>
                    {showExportDropdown && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <button
                          onClick={() => handleExport('pdf')}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          PDF
                        </button>
                        <button
                          onClick={() => handleExport('word')}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Word
                        </button>
                        <button
                          onClick={() => handleExport('txt')}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          TXT
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                  {generatedInvoice.invoice}
                </pre>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Create New Invoice
              </button>
              <button
                onClick={() => setActiveTab('form')}
                className="flex-1 bg-[#172840] text-white py-2 px-4 rounded-lg hover:bg-[#0F1A2A] transition-colors"
              >
                Edit Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInvoiceGenerator;
