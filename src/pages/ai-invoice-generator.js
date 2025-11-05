import { useState } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import SEO from "@/components/SEO";
import Header from "@/layouts/standard-header";
import Footer from "@/layouts/footer";
import ScrollToTop from "@/components/ScrollToTop";
import jsPDF from 'jspdf';

const AIInvoiceGeneratorPage = () => {
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
    paymentMethods: [],
    logo: null
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedInvoice, setGeneratedInvoice] = useState(null);
  const [activeTab, setActiveTab] = useState('form');

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
        if (data.fallback) {
          toast.success('Invoice generated using template (AI service temporarily unavailable)', { id: toastId });
        } else {
          toast.success('Invoice generated successfully!', { id: toastId });
        }
      } else {
        throw new Error(data.message || 'Failed to generate invoice');
      }
    } catch (error) {
      console.error('Error generating invoice:', error);
      
      // Handle specific error cases
      if (error.message && error.message.includes('temporarily unavailable')) {
        toast.error('AI service is temporarily unavailable due to high demand. Please try again in a few minutes.', { id: toastId });
      } else if (error.message && error.message.includes('timed out')) {
        toast.error('Request timed out. Please try again with shorter descriptions.', { id: toastId });
      } else {
        toast.error(error.message || 'Failed to generate invoice. Please try again.', { id: toastId });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          logo: reader.result
        }));
        toast.success('Logo uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoRemove = () => {
    setFormData(prev => ({
      ...prev,
      logo: null
    }));
    toast.success('Logo removed');
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
      paymentMethods: [],
      logo: null
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

  const exportAsPDF = async () => {
    if (!generatedInvoice) return;
    const doc = new jsPDF();
    const lineHeight = 8;
    let y = 20;

    // Add logo if available
    if (formData.logo) {
      try {
        // Detect image format from data URL
        let imageFormat = 'PNG';
        if (formData.logo.includes('data:image/jpeg') || formData.logo.includes('data:image/jpg')) {
          imageFormat = 'JPEG';
        } else if (formData.logo.includes('data:image/png')) {
          imageFormat = 'PNG';
        }

        // Create an image element to get actual dimensions for aspect ratio
        const getImageDimensions = () => {
          return new Promise((resolve) => {
            // Use window.Image to avoid conflict with Next.js Image component
            const img = new window.Image();
            let resolved = false;
            
            const resolveDimensions = (width, height) => {
              if (!resolved) {
                resolved = true;
                resolve({ width: width || 150, height: height || 150 });
              }
            };
            
            img.onload = () => {
              resolveDimensions(img.naturalWidth, img.naturalHeight);
            };
            img.onerror = () => {
              // If image fails to load, use default square dimensions
              resolveDimensions(150, 150);
            };
            
            // Set timeout to prevent waiting forever
            setTimeout(() => {
              if (!resolved) {
                resolveDimensions(150, 150);
              }
            }, 1000);
            
            img.src = formData.logo;
            
            // If image is already loaded, resolve immediately
            if (img.complete && img.naturalWidth > 0) {
              resolveDimensions(img.naturalWidth, img.naturalHeight);
            }
          });
        };

        const dimensions = await getImageDimensions();
        
        // Logo dimensions: 35mm width max, maintain aspect ratio
        const maxWidth = 35; // mm
        const maxHeight = 35; // mm
        
        // Calculate dimensions maintaining aspect ratio
        const aspectRatio = dimensions.width / dimensions.height;
        let logoWidth, logoHeight;
        
        if (aspectRatio > 1) {
          // Landscape: width is limiting factor
          logoWidth = maxWidth;
          logoHeight = maxWidth / aspectRatio;
        } else {
          // Portrait or square: height is limiting factor
          logoHeight = maxHeight;
          logoWidth = maxHeight * aspectRatio;
        }
        
        // Add logo to PDF
        doc.addImage(formData.logo, imageFormat, 20, y, logoWidth, logoHeight);
        y += logoHeight + lineHeight;
      } catch (error) {
        console.error('Error adding logo to PDF:', error);
        // Continue without logo if there's an error
      }
    }

    // Header
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('INVOICE', 105, y, { align: 'center' });
    y += lineHeight * 2;

    // Invoice Details
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Invoice Number: ${generatedInvoice.invoiceDetails.invoiceNumber}`, 20, y);
    doc.text(`Date: ${generatedInvoice.invoiceDetails.invoiceDate}`, 120, y);
    y += lineHeight;
    doc.text(`Due Date: ${generatedInvoice.invoiceDetails.dueDate}`, 20, y);
    y += lineHeight * 2;

    // Business and Client Info
    doc.setFont(undefined, 'bold');
    doc.text('FROM:', 20, y);
    doc.text('BILL TO:', 120, y);
    y += lineHeight;
    
    doc.setFont(undefined, 'normal');
    doc.text(formData.businessName || 'N/A', 20, y);
    doc.text(formData.clientName || 'N/A', 120, y);
    y += lineHeight;
    
    if (formData.businessEmail) {
      doc.text(formData.businessEmail, 20, y);
    }
    if (formData.clientEmail) {
      doc.text(formData.clientEmail, 120, y);
    }
    y += lineHeight;
    
    if (formData.businessPhone) {
      doc.text(formData.businessPhone, 20, y);
    }
    y += lineHeight * 2;

    // Services Table Header
    doc.setFont(undefined, 'bold');
    doc.text('SERVICES PROVIDED:', 20, y);
    y += lineHeight;
    
    // Table headers
    doc.text('Description', 20, y);
    doc.text('Qty', 120, y);
    doc.text('Rate', 140, y);
    doc.text('Amount', 170, y);
    y += lineHeight;
    
    // Draw line under headers
    doc.line(20, y, 190, y);
    y += lineHeight;

    // Services
    doc.setFont(undefined, 'normal');
    formData.services.forEach(service => {
      if (service.description) {
        const description = service.description.length > 40 ? 
          service.description.substring(0, 37) + '...' : service.description;
        doc.text(description, 20, y);
        doc.text(service.quantity.toString(), 120, y);
        doc.text(`${formData.currency} ${service.rate.toFixed(2)}`, 140, y);
        doc.text(`${formData.currency} ${service.amount.toFixed(2)}`, 170, y);
        y += lineHeight;
      }
    });

    y += lineHeight;

    // Financial Summary
    const subtotal = formData.services.reduce((sum, service) => sum + (service.amount || 0), 0);
    const discountAmount = (subtotal * (formData.discount || 0)) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * (formData.taxRate || 0)) / 100;
    const total = taxableAmount + taxAmount;

    doc.setFont(undefined, 'bold');
    doc.text('FINANCIAL SUMMARY:', 20, y);
    y += lineHeight;
    
    doc.setFont(undefined, 'normal');
    doc.text(`Subtotal:`, 20, y);
    doc.text(`${formData.currency} ${subtotal.toFixed(2)}`, 170, y);
    y += lineHeight;
    
    if (formData.discount > 0) {
      doc.text(`Discount (${formData.discount}%):`, 20, y);
      doc.text(`-${formData.currency} ${discountAmount.toFixed(2)}`, 170, y);
      y += lineHeight;
    }
    
    if (formData.taxRate > 0) {
      doc.text(`Tax (${formData.taxRate}%):`, 20, y);
      doc.text(`${formData.currency} ${taxAmount.toFixed(2)}`, 170, y);
      y += lineHeight;
    }
    
    // Total line
    doc.line(20, y, 190, y);
    y += lineHeight;
    doc.setFont(undefined, 'bold');
    doc.text('TOTAL:', 20, y);
    doc.text(`${formData.currency} ${total.toFixed(2)}`, 170, y);
    y += lineHeight * 2;

    // Payment Information
    doc.setFont(undefined, 'bold');
    doc.text('PAYMENT INFORMATION:', 20, y);
    y += lineHeight;
    
    doc.setFont(undefined, 'normal');
    doc.text(`Payment Terms: ${formData.paymentTerms || 'Not specified'}`, 20, y);
    y += lineHeight;
    
    if (formData.paymentMethods && formData.paymentMethods.length > 0) {
      doc.text(`Payment Methods: ${formData.paymentMethods.join(', ')}`, 20, y);
      y += lineHeight;
    }
    
    if (formData.notes) {
      y += lineHeight;
      doc.setFont(undefined, 'bold');
      doc.text('ADDITIONAL NOTES:', 20, y);
      y += lineHeight;
      doc.setFont(undefined, 'normal');
      const notesLines = doc.splitTextToSize(formData.notes, 170);
      doc.text(notesLines, 20, y);
      y += lineHeight * notesLines.length;
    }

    y += lineHeight * 2;

     // Footer
     doc.setFont(undefined, 'bold');
     doc.text('THANK YOU FOR YOUR BUSINESS!', 105, y, { align: 'center' });
     y += lineHeight;
     doc.setFont(undefined, 'normal');
     doc.text(formData.businessName || 'N/A', 105, y, { align: 'center' });
     y += lineHeight * 4;

     // PAAN Credits at the very bottom in small text
     doc.setTextColor(128, 128, 128); // Gray color
     doc.setFontSize(8);
     doc.setFont(undefined, 'normal');
     doc.text('Generated with PAAN AI Invoice Generator | paan.africa', 105, y, { align: 'center' });

    doc.save(`PAAN_Invoice_${formData.invoiceNumber || 'Invoice'}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const exportAsWord = () => {
    if (!generatedInvoice) return;
    
    // Create a clean Word document format
    const subtotal = formData.services.reduce((sum, service) => sum + (service.amount || 0), 0);
    const discountAmount = (subtotal * (formData.discount || 0)) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * (formData.taxRate || 0)) / 100;
    const total = taxableAmount + taxAmount;

    const content = `INVOICE

Invoice Number: ${generatedInvoice.invoiceDetails.invoiceNumber}
Date: ${generatedInvoice.invoiceDetails.invoiceDate}
Due Date: ${generatedInvoice.invoiceDetails.dueDate}

FROM:
${formData.businessName || 'N/A'}
${formData.businessEmail ? `Email: ${formData.businessEmail}` : ''}
${formData.businessPhone ? `Phone: ${formData.businessPhone}` : ''}
${formData.businessAddress ? formData.businessAddress : ''}

BILL TO:
${formData.clientName || 'N/A'}
${formData.clientEmail ? `Email: ${formData.clientEmail}` : ''}
${formData.clientAddress ? formData.clientAddress : ''}

SERVICES PROVIDED:
${formData.services.map((service, index) => 
  `${index + 1}. ${service.description || 'Service description not provided'}
     Quantity: ${service.quantity}
     Rate: ${formData.currency} ${service.rate.toFixed(2)}
     Amount: ${formData.currency} ${service.amount.toFixed(2)}`
).join('\n\n')}

FINANCIAL SUMMARY:
Subtotal: ${formData.currency} ${subtotal.toFixed(2)}
${formData.discount > 0 ? `Discount (${formData.discount}%): -${formData.currency} ${discountAmount.toFixed(2)}` : ''}
${formData.taxRate > 0 ? `Tax (${formData.taxRate}%): ${formData.currency} ${taxAmount.toFixed(2)}` : ''}
TOTAL: ${formData.currency} ${total.toFixed(2)}

PAYMENT INFORMATION:
Payment Terms: ${formData.paymentTerms || 'Not specified'}
${formData.paymentMethods && formData.paymentMethods.length > 0 ? `Payment Methods: ${formData.paymentMethods.join(', ')}` : ''}

${formData.notes ? `ADDITIONAL NOTES:\n${formData.notes}` : ''}

THANK YOU FOR YOUR BUSINESS!
${formData.businessName || 'N/A'}

POWERED BY PAAN AFRICA
Generated with PAAN AI Invoice Generator | paan.africa`;

    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PAAN_Invoice_${formData.invoiceNumber || 'Invoice'}_${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totals = calculateTotals();

  return (
    <>
      <SEO
        title="PAAN FREE AI Invoice Generator | Create Professional Invoices Instantly"
        description="Generate professional, client-ready invoices in seconds with PAAN's free AI-powered invoice generator. Perfect for agencies, freelancers, and businesses across Africa."
        keywords="AI invoice generator, professional invoices, invoice template, business invoicing, PAAN AI tools, African business tools, free invoice generator"
      />

      <Header navLinkColor="text-white" />

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
        {/* Hero Section */}
        <div className="relative bg-paan-dark-blue text-white pt-24 pb-16 overflow-hidden z-10">
          {/* Background Pattern Overlay */}
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Icon icon="fa-solid:file-invoice-dollar" className="w-16 h-16 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                Generate <span className='text-paan-red'>Professional Invoices</span> in <span className='text-paan-yellow'>Seconds</span>
              </h1>
              <p className="text-md md:text-xl text-white/95 max-w-4xl mx-auto leading-relaxed mb-8 font-light">
                Create polished, client-ready invoices with AI. Perfect for agencies,<br/> freelancers, and businesses across Africa.
              </p>
            </div>
          </div>
        </div>

        {/* AI Bot Image between hero and main content */}
        <div className="mx-auto max-w-full md:max-w-5xl flex justify-start md:justify-left -mt-24 md:-mt-40 relative z-20 px-4 md:px-0">
          <Image
            src="/assets/images/ai-bot.svg"
            width={220}
            height={220}
            alt="PAAN AI Bot"
            className="drop-shadow-xl w-[120px] h-[120px] md:w-[220px] md:h-[220px]"
          />
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-full md:max-w-5xl px-2 md:px-4 mb-10 md:mb-20 mt-2 md:mt-4">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100">
            {/* Tabs */}
            <div className="flex flex-col md:flex-row border-b border-gray-100">
              <button
                onClick={() => setActiveTab("form")}
                className={`flex-1 py-4 md:py-6 px-4 md:px-8 text-left transition-all duration-300 cursor-default ${
                  activeTab === "form"
                    ? "bg-paan-blue text-paan-dark-blue shadow-lg"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <h4 className='font-semibold'>Invoice Details</h4>
                <p className='font-light text-sm'>Fill in your business and client information.</p>
              </button>
              {generatedInvoice && (
                <button
                  onClick={() => setActiveTab("invoice")}
                  className={`flex-1 py-4 md:py-6 px-4 md:px-8 text-center font-semibold text-base md:text-lg transition-all duration-300 ${
                    activeTab === "invoice"
                      ? "bg-gradient-to-r from-paan-red to-paan-yellow text-white shadow-lg"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  }`}
                >
                  <Icon
                    icon="fa-solid:file-invoice"
                    className="w-5 h-5 md:w-6 md:h-6 inline mr-3"
                  />
                  Generated Invoice
                </button>
              )}
            </div>

            {/* Content */}
            <div className="p-4 md:p-12">
              {activeTab === "form" && (
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                  {/* Business Information */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <Icon icon="fa-solid:building" className="w-6 h-6 md:w-7 md:h-7 mr-3 text-[#F25849]" />
                      Your Business Information
                    </h3>
                    
                    {/* Logo Upload Section */}
                    <div className="mb-6 md:mb-8">
                      <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
                        Business Logo
                      </label>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                        {formData.logo ? (
                          <div className="relative">
                            <div className="w-[150px] h-[150px] border-2 border-gray-300 rounded-2xl overflow-hidden bg-white flex items-center justify-center shadow-md">
                              <img
                                src={formData.logo}
                                alt="Business Logo"
                                className="object-contain max-w-full max-h-full"
                                style={{ width: '150px', height: '150px' }}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={handleLogoRemove}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                              title="Remove logo"
                            >
                              <Icon icon="fa-solid:times" className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-[150px] h-[150px] border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center bg-gray-50">
                            <Icon icon="fa-solid:image" className="w-10 h-10 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1 w-full md:w-auto">
                          <label className="cursor-pointer inline-flex items-center px-5 md:px-6 py-3 md:py-4 bg-white border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-[#F25849] transition-all duration-300 shadow-md hover:shadow-lg">
                            <Icon icon="fa-solid:upload" className="w-5 h-5 mr-2 md:mr-3 text-gray-600" />
                            <span className="text-base md:text-lg font-medium text-gray-700">
                              {formData.logo ? 'Change Logo' : 'Upload Logo'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleLogoChange}
                              className="hidden"
                            />
                          </label>
                          <p className="text-sm md:text-base text-gray-500 mt-2 md:mt-3">
                            Recommended size: 150x150px. Max file size: 5MB
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="relative group">
                        <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                          Business Name <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#F25849]/20 focus:border-[#F25849] focus:outline-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                          required
                        />
                      </div>
                      <div className="relative group">
                        <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                          Business Email
                        </label>
                        <input
                          type="email"
                          name="businessEmail"
                          value={formData.businessEmail}
                          onChange={handleInputChange}
                          className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#F25849]/20 focus:border-[#F25849] focus:outline-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                        />
                      </div>
                      <div className="relative group">
                        <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                          Business Phone
                        </label>
                        <input
                          type="tel"
                          name="businessPhone"
                          value={formData.businessPhone}
                          onChange={handleInputChange}
                          className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#F25849]/20 focus:border-[#F25849] focus:outline-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                        />
                      </div>
                      <div className="relative group">
                        <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                          Currency
                        </label>
                        <div className="relative">
                          <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                            className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#F25849]/20 focus:border-[#F25849] focus:outline-none text-base md:text-md bg-white transition-all duration-300 appearance-none hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                          >
                            {currencies.map((currency) => (
                              <option key={currency} value={currency}>{currency}</option>
                            ))}
                          </select>
                          <Icon
                            icon="fa-solid:chevron-down"
                            className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-6">
                      <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                        Business Address
                      </label>
                      <textarea
                        name="businessAddress"
                        value={formData.businessAddress}
                        onChange={handleInputChange}
                        className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#F25849]/20 focus:border-[#F25849] focus:outline-none resize-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl min-h-[120px]"
                        rows="4"
                      />
                    </div>
                  </div>

                  {/* Client Information */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8 rounded-2xl shadow-lg border border-blue-200">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <Icon icon="fa-solid:user" className="w-6 h-6 md:w-7 md:h-7 mr-3 text-[#84C1D9]" />
                      Client Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="relative group">
                        <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                          Client Name <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="clientName"
                          value={formData.clientName}
                          onChange={handleInputChange}
                          className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#84C1D9]/20 focus:border-[#84C1D9] focus:outline-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                          required
                        />
                      </div>
                      <div className="relative group">
                        <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                          Client Email
                        </label>
                        <input
                          type="email"
                          name="clientEmail"
                          value={formData.clientEmail}
                          onChange={handleInputChange}
                          className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#84C1D9]/20 focus:border-[#84C1D9] focus:outline-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                        />
                      </div>
                    </div>
                    <div className="mt-4 md:mt-6">
                      <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                        Client Address
                      </label>
                      <textarea
                        name="clientAddress"
                        value={formData.clientAddress}
                        onChange={handleInputChange}
                        className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#84C1D9]/20 focus:border-[#84C1D9] focus:outline-none resize-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl min-h-[120px]"
                        rows="4"
                      />
                    </div>
                  </div>

                  {/* Invoice Details */}
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 md:p-8 rounded-2xl shadow-lg border border-yellow-200">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <Icon icon="fa-solid:file-invoice" className="w-6 h-6 md:w-7 md:h-7 mr-3 text-[#F2B706]" />
                      Invoice Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div className="relative group">
                        <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                          Invoice Number <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="invoiceNumber"
                          value={formData.invoiceNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#F2B706]/20 focus:border-[#F2B706] focus:outline-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                          required
                        />
                      </div>
                      <div className="relative group">
                        <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                          Invoice Date
                        </label>
                        <input
                          type="date"
                          name="invoiceDate"
                          value={formData.invoiceDate}
                          onChange={handleInputChange}
                          className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#F2B706]/20 focus:border-[#F2B706] focus:outline-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                        />
                      </div>
                      <div className="relative group">
                        <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                          Due Date
                        </label>
                        <input
                          type="date"
                          name="dueDate"
                          value={formData.dueDate}
                          onChange={handleInputChange}
                          className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#F2B706]/20 focus:border-[#F2B706] focus:outline-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 md:p-8 rounded-2xl shadow-lg border border-green-200">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
                        <Icon icon="fa-solid:list" className="w-6 h-6 md:w-7 md:h-7 mr-3 text-green-600" />
                        Services & Items
                      </h3>
                      <button
                        type="button"
                        onClick={addService}
                        className="bg-green-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-2xl hover:bg-green-700 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl text-base md:text-lg font-semibold"
                      >
                        <Icon icon="fa-solid:plus" className="w-5 h-5" />
                        Add Service
                      </button>
                    </div>
                    
                    {formData.services.map((service, index) => (
                      <div key={index} className="bg-white p-4 md:p-6 rounded-2xl mb-4 border border-green-200 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-800 text-lg md:text-xl">Service {index + 1}</h4>
                          {formData.services.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeService(index)}
                              className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50"
                            >
                              <Icon icon="fa-solid:trash" className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                          <div className="md:col-span-2 relative group">
                            <label className="block text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-3">
                              Description
                            </label>
                            <input
                              type="text"
                              value={service.description}
                              onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                              className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 focus:outline-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                              placeholder="Service description"
                            />
                          </div>
                          <div className="relative group">
                            <label className="block text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-3">
                              Quantity
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={service.quantity}
                              onChange={(e) => handleServiceChange(index, 'quantity', parseInt(e.target.value) || 1)}
                              className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 focus:outline-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                            />
                          </div>
                          <div className="relative group">
                            <label className="block text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-3">
                              Rate ({formData.currency})
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={service.rate}
                              onChange={(e) => handleServiceChange(index, 'rate', parseFloat(e.target.value) || 0)}
                              className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 focus:outline-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4 text-right">
                          <span className="text-xl md:text-2xl font-bold text-gray-800 bg-green-50 px-4 py-2 rounded-xl">
                            Amount: {formData.currency} {service.amount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Financial Details */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 md:p-8 rounded-2xl shadow-lg border border-purple-200">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <Icon icon="fa-solid:calculator" className="w-6 h-6 md:w-7 md:h-7 mr-3 text-purple-600" />
                      Financial Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div className="relative group">
                        <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
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
                          className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                        />
                      </div>
                      <div className="relative group">
                        <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
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
                          className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                        />
                      </div>
                      <div className="relative group">
                        <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                          Payment Terms
                        </label>
                        <div className="relative">
                          <select
                            name="paymentTerms"
                            value={formData.paymentTerms}
                            onChange={handleInputChange}
                            className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none text-base md:text-md bg-white transition-all duration-300 appearance-none hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                          >
                            {paymentTermsOptions.map((term) => (
                              <option key={term} value={term}>{term}</option>
                            ))}
                          </select>
                          <Icon
                            icon="fa-solid:chevron-down"
                            className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Payment Methods */}
                    <div className="mt-6">
                      <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        Payment Methods
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {paymentMethodsOptions.map((method) => (
                          <label key={method} className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-white/50 transition-colors">
                            <input
                              type="checkbox"
                              checked={formData.paymentMethods.includes(method)}
                              onChange={() => handlePaymentMethodChange(method)}
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-5 h-5"
                            />
                            <span className="text-base md:text-lg text-gray-700 font-medium">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Totals Summary */}
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-300">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <Icon icon="fa-solid:receipt" className="w-6 h-6 md:w-7 md:h-7 mr-3 text-gray-600" />
                      Invoice Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-lg md:text-xl">
                        <span className="font-semibold">Subtotal:</span>
                        <span className="font-bold">{formData.currency} {totals.subtotal.toFixed(2)}</span>
                      </div>
                      {formData.discount > 0 && (
                        <div className="flex justify-between text-lg md:text-xl text-green-600">
                          <span className="font-semibold">Discount ({formData.discount}%):</span>
                          <span className="font-bold">-{formData.currency} {totals.discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      {formData.taxRate > 0 && (
                        <div className="flex justify-between text-lg md:text-xl">
                          <span className="font-semibold">Tax ({formData.taxRate}%):</span>
                          <span className="font-bold">{formData.currency} {totals.taxAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xl md:text-2xl font-bold border-t-2 border-gray-400 pt-3">
                        <span>Total:</span>
                        <span className="text-[#F25849]">{formData.currency} {totals.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="relative group">
                    <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any additional notes or terms for the client"
                      className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#F25849]/20 focus:border-[#F25849] focus:outline-none resize-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl min-h-[120px]"
                      rows="4"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 md:pt-8 flex flex-col md:flex-row gap-4 md:gap-6 justify-start">
                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full md:w-auto bg-paan-red text-white py-3 md:py-4 px-6 rounded-full font-semibold hover:from-[#D6473C] hover:via-[#E6A800] hover:to-[#6BA8C4] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 shadow-2xl hover:shadow-3xl hover:scale-[1.02] transform active:scale-[0.98]"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Generating Invoice...
                        </>
                      ) : (
                        <>
                          <Icon
                            icon="fa-solid:file-invoice-dollar"
                            className="w-8 h-8 animate-pulse"
                          />
                          Generate Professional Invoice
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {activeTab === "invoice" && generatedInvoice && (
                <div className="space-y-10">
                  {/* Summary */}
                  <div className="bg-gradient-to-r from-[#84C1D9]/10 to-[#84C1D9]/5 p-8 rounded-2xl border-l-4 border-[#84C1D9] shadow-lg">
                    <h3 className="font-bold text-[#172840] text-2xl mb-4 flex items-center">
                      <Icon
                        icon="fa-solid:lightbulb"
                        className="w-7 h-7 mr-3 text-[#84C1D9]"
                      />
                      Invoice Summary
                    </h3>
                    <p className="text-gray-700 text-xl leading-relaxed">
                      {generatedInvoice.summary}
                    </p>
                  </div>

                  {/* Invoice Details */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="font-bold text-gray-800 text-2xl mb-6 flex items-center">
                      <Icon
                        icon="fa-solid:clipboard-list"
                        className="w-7 h-7 mr-3 text-[#F25849]"
                      />
                      Invoice Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl">
                      <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                        <Icon
                          icon="fa-solid:file-invoice"
                          className="w-6 h-6 mr-3 text-[#F25849]"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">
                            Invoice Number
                          </div>
                          <div className="text-gray-600">
                            {generatedInvoice.invoiceDetails.invoiceNumber}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                        <Icon
                          icon="fa-solid:calendar"
                          className="w-6 h-6 mr-3 text-[#F2B706]"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">
                            Date
                          </div>
                          <div className="text-gray-600">
                            {generatedInvoice.invoiceDetails.invoiceDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                        <Icon
                          icon="fa-solid:clock"
                          className="w-6 h-6 mr-3 text-[#84C1D9]"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">
                            Due Date
                          </div>
                          <div className="text-gray-600">
                            {generatedInvoice.invoiceDetails.dueDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                        <Icon
                          icon="fa-solid:dollar-sign"
                          className="w-6 h-6 mr-3 text-[#F2B706]"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">
                            Currency
                          </div>
                          <div className="text-gray-600">
                            {generatedInvoice.invoiceDetails.currency}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                   {/* Export Section */}
                   <div>
                     <div className="flex items-center justify-center mb-6">
                       <h3 className="font-bold text-gray-800 text-2xl flex items-center">
                         <Icon
                           icon="fa-solid:file-invoice"
                           className="w-7 h-7 mr-3 text-[#F25849]"
                         />
                         Export Your Invoice
                       </h3>
                     </div>
                     <div className="flex justify-center">
                       <div className="relative group">
                         <button
                           type="button"
                           className="px-8 py-4 bg-gradient-to-r from-[#F2B706] to-[#E6A800] hover:from-[#E6A800] hover:to-[#D99A00] text-white rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl text-lg font-semibold"
                         >
                           <Icon icon="mdi:download" className="w-6 h-6" />
                           Export Invoice
                         </button>
                         <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-all duration-300 z-10 transform scale-95 group-hover:scale-100">
                           <div className="py-2">
                             <button
                               onClick={exportAsPDF}
                               className="w-full text-left px-6 py-4 hover:bg-gray-50 flex items-center gap-3 text-gray-800 transition-colors duration-200 rounded-t-xl"
                             >
                               <Icon
                                 icon="mdi:file-pdf-box"
                                 className="w-5 h-5 text-red-500"
                               />
                               Export as PDF
                             </button>
                             <button
                               onClick={exportAsWord}
                               className="w-full text-left px-6 py-4 hover:bg-gray-50 flex items-center gap-3 text-gray-800 transition-colors duration-200 rounded-b-xl"
                             >
                               <Icon
                                 icon="mdi:file-word-box"
                                 className="w-5 h-5 text-blue-500"
                               />
                               Export as Word
                             </button>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 pt-6 md:pt-8">
                    <button
                      onClick={handleReset}
                      className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 md:py-4 px-6 rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 text-base md:text-xl font-semibold shadow-lg hover:shadow-xl"
                    >
                      Create New Invoice
                    </button>
                    <button
                      onClick={() => setActiveTab("form")}
                      className="flex-1 bg-gradient-to-r from-[#172840] to-[#0F1A2A] text-white py-3 md:py-4 px-6 rounded-2xl hover:from-[#0F1A2A] hover:to-[#172840] transition-all duration-300 text-base md:text-xl font-semibold shadow-lg hover:shadow-xl"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </main>
      <ScrollToTop />
    </>
  );
};

export default AIInvoiceGeneratorPage;
