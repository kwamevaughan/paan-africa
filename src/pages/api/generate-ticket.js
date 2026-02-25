import { generateTicketImage, formatTicketData } from '../../lib/ticketGenerator';

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

    // Generate the ticket image
    const imageBuffer = await generateTicketImage(ticketData);

    // Set response headers for image
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename="paan-summit-ticket-${ticketData.ticketId}.png"`);
    
    // Send the image buffer
    res.status(200).send(imageBuffer);

  } catch (error) {
    console.error('Error generating ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate ticket image',
      error: error.message
    });
  }
}
