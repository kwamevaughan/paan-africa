import { jsPDF } from 'jspdf';

/**
 * Generate a PDF ticket by embedding the PNG ticket image
 * This ensures the PDF matches the PNG design exactly
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

  // Return PDF as buffer
  return Buffer.from(doc.output('arraybuffer'));
}
