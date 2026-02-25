import { generatePDFTicket } from '../../lib/pdfTicketGenerator';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { ticketData } = req.body;

    if (!ticketData) {
      return res.status(400).json({
        success: false,
        message: 'Missing ticket data'
      });
    }

    // Generate the PDF ticket
    const pdfBuffer = await generatePDFTicket(ticketData);

    // Set response headers for PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="paan-summit-ticket-${ticketData.ticketId}.pdf"`);
    
    // Send the PDF buffer
    res.status(200).send(pdfBuffer);

  } catch (error) {
    console.error('Error generating PDF ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate PDF ticket',
      error: error.message
    });
  }
}
