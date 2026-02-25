import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import path from 'path';
import fs from 'fs';

// Register fonts once
let fontsRegistered = false;

function registerFonts() {
  if (fontsRegistered) return;
  
  try {
    // Try multiple possible font locations
    const possiblePaths = [
      // Development: relative to this file
      path.join(__dirname, 'fonts'),
      // Production: relative to process.cwd()
      path.join(process.cwd(), 'src', 'lib', 'fonts'),
      // Vercel serverless: relative to function root
      path.join(process.cwd(), '.next', 'server', 'chunks', 'fonts'),
      // Alternative: from public folder
      path.join(process.cwd(), 'public', 'fonts'),
    ];
    
    let fontDir = null;
    for (const dir of possiblePaths) {
      if (fs.existsSync(dir)) {
        fontDir = dir;
        console.log('✓ Found font directory:', dir);
        break;
      }
    }
    
    if (!fontDir) {
      throw new Error('Font directory not found in any expected location');
    }
    
    // Register Inter Regular
    const regularPath = path.join(fontDir, 'Inter-Regular.ttf');
    if (fs.existsSync(regularPath)) {
      GlobalFonts.registerFromPath(regularPath, 'Inter');
      console.log('✓ Inter Regular registered from:', regularPath);
    } else {
      console.error('Inter-Regular.ttf not found at:', regularPath);
    }
    
    // Register Inter Bold
    const boldPath = path.join(fontDir, 'Inter-Bold.ttf');
    if (fs.existsSync(boldPath)) {
      GlobalFonts.registerFromPath(boldPath, 'Inter-Bold');
      console.log('✓ Inter Bold registered from:', boldPath);
    } else {
      console.error('Inter-Bold.ttf not found at:', boldPath);
    }
    
    console.log('✓ Font registration complete');
    console.log('Available fonts:', GlobalFonts.families);
    fontsRegistered = true;
  } catch (error) {
    console.error('Error registering fonts:', error.message);
    console.error('Stack:', error.stack);
    console.error('⚠ Text may not render correctly without fonts');
  }
}

/**
 * Generate a ticket image for PAAN Summit 2026
 * @param {Object} ticketData - Ticket information
 * @param {string} ticketData.name - Attendee name
 * @param {string} ticketData.email - Attendee email
 * @param {string} ticketData.ticketType - Type of ticket
 * @param {string} ticketData.ticketId - Unique ticket ID
 * @param {string} ticketData.registrationNo - Registration number
 * @param {string} ticketData.issuedOn - Issue date
 * @returns {Promise<Buffer>} - PNG image buffer
 */
export async function generateTicketImage(ticketData) {
  // Register fonts before generating
  registerFonts();
  
  // Canvas dimensions (matching the design aspect ratio)
  const width = 1024;
  const height = 512;
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background gradient (dark blue to light blue)
  const headerGradient = ctx.createLinearGradient(0, 0, width, 0);
  headerGradient.addColorStop(0, '#2C3E50'); // Dark blue-gray
  headerGradient.addColorStop(1, '#5DADE2'); // Light blue
  
  ctx.fillStyle = headerGradient;
  ctx.fillRect(0, 0, width, 140);

  // Light gray background for main content
  ctx.fillStyle = '#E8E8E8';
  ctx.fillRect(0, 140, width, 90);

  // White background for details section
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 230, width, 200);

  // Footer gradient (dark blue to red)
  const footerGradient = ctx.createLinearGradient(0, 430, width, 430);
  footerGradient.addColorStop(0, '#2C3E50'); // Dark blue
  footerGradient.addColorStop(1, '#E74C3C'); // Red
  
  ctx.fillStyle = footerGradient;
  ctx.fillRect(0, 430, width, 82);

  // Load and draw logo
  try {
    const logoPath = path.join(process.cwd(), 'public', 'assets', 'images', 'summit-logo-white.png');
    const logo = await loadImage(logoPath);
    
    // Draw logo on the left side of the header
    const logoWidth = 150;
    const logoHeight = 80;
    const logoX = 60;
    const logoY = 30;
    
    ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
  } catch (error) {
    console.error('Error loading logo:', error.message);
    // Continue without logo if it fails to load
  }

  // Header text - "PAAN SUMMIT 2026" (positioned to the right of logo)
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '48px Inter-Bold';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('PAAN SUMMIT 2026', 230, 80);

  // Subtitle
  ctx.font = '20px Inter';
  ctx.fillText('Africa Borderless Creative Economy Summit', 230, 110);

  // Ticket type section
  ctx.fillStyle = '#1A252F';
  ctx.font = '36px Inter-Bold';
  ctx.textAlign = 'left';
  ctx.fillText((ticketData.ticketType || 'GENERAL ADMISSION').toUpperCase(), 60, 190);

  // Left column - Attendee details
  const leftX = 60;
  let currentY = 270;
  const lineHeight = 35;

  ctx.fillStyle = '#2C3E50';
  ctx.font = '18px Inter-Bold';
  
  // Name
  ctx.fillText('Name:', leftX, currentY);
  ctx.font = '18px Inter';
  ctx.fillText(ticketData.name || 'N/A', leftX + 180, currentY);
  currentY += lineHeight;

  // Ticket ID
  ctx.font = '18px Inter-Bold';
  ctx.fillText('Ticket ID:', leftX, currentY);
  ctx.font = '18px Inter';
  ctx.fillText(ticketData.ticketId || 'N/A', leftX + 180, currentY);
  currentY += lineHeight;

  // Registration No
  ctx.font = '18px Inter-Bold';
  ctx.fillText('Registration No:', leftX, currentY);
  ctx.font = '16px Inter';
  ctx.fillText(ticketData.registrationNo || 'N/A', leftX + 180, currentY);
  currentY += lineHeight;

  // Email
  ctx.font = '18px Inter-Bold';
  ctx.fillText('Email:', leftX, currentY);
  ctx.font = '18px Inter';
  ctx.fillText(ticketData.email || 'N/A', leftX + 180, currentY);
  currentY += lineHeight;

  // Issued On
  ctx.font = '18px Inter-Bold';
  ctx.fillText('Issued On:', leftX, currentY);
  ctx.font = '18px Inter';
  ctx.fillText(ticketData.issuedOn || 'N/A', leftX + 180, currentY);

  // Right column - Event details
  const rightX = width / 2 + 30;
  currentY = 270;

  // Event Dates
  ctx.font = '18px Inter-Bold';
  ctx.fillText('Event Dates:', rightX, currentY);
  ctx.font = '18px Inter';
  ctx.fillText('April 21-22, 2026', rightX + 150, currentY);
  currentY += lineHeight;

  // City
  ctx.font = '18px Inter-Bold';
  ctx.fillText('City:', rightX, currentY);
  ctx.font = '18px Inter';
  ctx.fillText('Nairobi, Kenya', rightX + 150, currentY);
  currentY += lineHeight;

  // Venue
  ctx.font = '18px Inter-Bold';
  ctx.fillText('Venue:', rightX, currentY);
  ctx.font = '18px Inter';
  ctx.fillText('TBA', rightX + 150, currentY);
  currentY += lineHeight + 10;

  // Powered by text
  ctx.font = '14px Inter';
  ctx.fillStyle = '#555555';
  ctx.fillText('Powered by the Pan African Agency Network (PAAN)', rightX, currentY);

  // Footer text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '16px Inter';
  ctx.textAlign = 'center';
  ctx.fillText('This Ticket admits one delegate only. You must present a valid ID matching the name on the ticket.', width / 2, 460);
  ctx.fillText('Access level is based on pass type.', width / 2, 485);

  // Return the image as a buffer
  // @napi-rs/canvas returns a Promise<Buffer> for toBuffer
  const buffer = await canvas.encode('png');
  return buffer;
}

/**
 * Generate ticket data from purchase information
 * @param {Object} purchase - Purchase record
 * @param {Object} attendee - Attendee information
 * @param {string} reference - Payment reference
 * @returns {Object} - Formatted ticket data
 */
export function formatTicketData(purchase, attendee, reference) {
  return {
    name: attendee.name || attendee.full_name || 'N/A',
    email: attendee.email || 'N/A',
    ticketType: attendee.ticket_type || attendee.ticketType || 'General Admission',
    ticketId: attendee.id?.toString() || 'N/A',
    registrationNo: `PAAN_${reference}_${attendee.id || Date.now()}`,
    issuedOn: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    })
  };
}
