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

    if (!imageBuffer || imageBuffer.length === 0) {
      throw new Error('Generated image buffer is empty');
    }

    // Ensure it's a proper Node.js Buffer
    const buffer = Buffer.isBuffer(imageBuffer) ? imageBuffer : Buffer.from(imageBuffer);

    // Set response headers for image
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    // Send the image buffer
    return res.status(200).end(buffer);

  } catch (error) {
    console.error('Error generating ticket:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate ticket image',
      error: error.message
    });
  }
}
