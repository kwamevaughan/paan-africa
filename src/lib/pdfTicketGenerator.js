import { jsPDF } from 'jspdf';
import { createCanvas, loadImage } from 'canvas';
import path from 'path';

/**
 * Generate a professional PDF ticket for PAAN Summit 2026
 * @param {Object} ticketData - Ticket information
 * @returns {Promise<Buffer>} - PDF buffer
 */
export async function generatePDFTicket(ticketData) {
  // Create PDF document (A4 size)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Page 1: Embed the PNG ticket image
  try {
    // Generate the PNG ticket image
    const { generateTicketImage } = await import('./ticketGenerator.js');
    const ticketImageBuffer = await generateTicketImage(ticketData);
    
    // Convert buffer to base64
    const ticketImageBase64 = `data:image/png;base64,${ticketImageBuffer.toString('base64')}`;
    
    // Calculate dimensions to fit the ticket nicely on the page
    // Original ticket is 1024x512 (2:1 ratio)
    const ticketWidth = pageWidth - 20; // 10mm margin on each side
    const ticketHeight = ticketWidth / 2; // Maintain 2:1 ratio
    const xPos = 10;
    const yPos = 40;
    
    // Add title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(23, 40, 64);
    doc.text('PAAN Summit 2026 - Event Ticket', pageWidth / 2, 25, { align: 'center' });
    
    // Add the ticket image
    doc.addImage(ticketImageBase64, 'PNG', xPos, yPos, ticketWidth, ticketHeight);
    
    // Add instructions below the ticket
    const instructionsY = yPos + ticketHeight + 15;
    
    doc.setFillColor(227, 242, 253); // Light blue background
    doc.rect(10, instructionsY, pageWidth - 20, 35, 'F');
    doc.setDrawColor(132, 193, 217);
    doc.setLineWidth(0.5);
    doc.rect(10, instructionsY, pageWidth - 20, 35);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(23, 40, 64);
    doc.text('How to Use Your Ticket', 15, instructionsY + 8);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(44, 62, 80);
    doc.text('1. Print this page or save it to your mobile device', 15, instructionsY + 16);
    doc.text('2. Bring a valid government-issued ID matching the name on the ticket', 15, instructionsY + 23);
    doc.text('3. Present both at the registration desk upon arrival', 15, instructionsY + 30);
    
    // Add footer
    const footerY = pageHeight - 20;
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.setFont('helvetica', 'italic');
    doc.text('For questions or support, contact: secretariat@paan.africa', pageWidth / 2, footerY, { align: 'center' });
    doc.text(`Reference: ${ticketData.registrationNo}`, pageWidth / 2, footerY + 5, { align: 'center' });
    
  } catch (error) {
    console.error('Error embedding ticket image in PDF:', error);
    // Fallback: Create a text-based ticket if image embedding fails
    doc.setFontSize(16);
    doc.setTextColor(231, 76, 60);
    doc.text('Error generating ticket image. Please contact support.', pageWidth / 2, 100, { align: 'center' });
  }

  // Page 2: Event Information & Terms
  doc.addPage();

  // Header
  doc.setFillColor(23, 40, 64);
  doc.rect(0, 0, pageWidth, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Event Information', pageWidth / 2, 18, { align: 'center' });

  // Content
  yPos = 45;
  doc.setTextColor(44, 62, 80);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('About PAAN Summit 2026', 15, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const aboutText = doc.splitTextToSize(
    'The Pan African Agency Network (PAAN) Summit 2026 is Africa\'s premier gathering for creative and tech industry leaders, bringing together agencies, brands, innovators, and policymakers to shape the future of Africa\'s creative economy.',
    pageWidth - 30
  );
  doc.text(aboutText, 15, yPos);
  
  yPos += aboutText.length * 5 + 10;

  // What's Included
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('What\'s Included in Your Ticket', 15, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const included = [
    '✓ Full 2-day access to all keynotes and panel discussions',
    '✓ Access to exhibition hall and brand activations',
    '✓ Networking opportunities via the Summit app',
    '✓ Career lounge access with portfolio reviews',
    '✓ Business matchmaking and partnership opportunities',
    '✓ Digital participation certificate',
    '✓ Access to session materials (where applicable)',
    '✓ On-ground support and help desk assistance'
  ];

  included.forEach(item => {
    doc.text(item, 20, yPos);
    yPos += 7;
  });

  yPos += 5;

  // Important Dates
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Important Dates', 15, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('• Event Dates: April 21-22, 2026', 20, yPos);
  yPos += 7;
  doc.text('• Check-in Opens: 7:00 AM (both days)', 20, yPos);
  yPos += 7;
  doc.text('• Sessions Start: 9:00 AM', 20, yPos);
  yPos += 7;
  doc.text('• Venue: TBA (Details will be shared via email)', 20, yPos);

  yPos += 15;

  // Terms & Conditions
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Terms & Conditions', 15, yPos);
  
  yPos += 10;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  const terms = [
    '1. This ticket is non-transferable and must be presented with a valid government-issued ID.',
    '2. Tickets are non-refundable. Transfers to another person may be allowed with prior approval.',
    '3. The organizers reserve the right to refuse entry or remove attendees who violate event policies.',
    '4. Photography and recording may take place during the event. By attending, you consent to being photographed.',
    '5. The event schedule is subject to change. Updates will be communicated via email.',
    '6. Lost or stolen tickets cannot be replaced. Please keep this ticket secure.',
    '7. For questions or support, contact: secretariat@paan.africa'
  ];

  terms.forEach(term => {
    const termLines = doc.splitTextToSize(term, pageWidth - 30);
    doc.text(termLines, 15, yPos);
    yPos += termLines.length * 5 + 3;
  });

  // Footer
  yPos = pageHeight - 20;
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.setFont('helvetica', 'italic');
  doc.text('For more information, visit www.paan.africa or contact secretariat@paan.africa', pageWidth / 2, yPos, { align: 'center' });
  doc.text(`Reference: ${ticketData.registrationNo}`, pageWidth / 2, yPos + 5, { align: 'center' });

  // Return PDF as buffer
  return Buffer.from(doc.output('arraybuffer'));
}
