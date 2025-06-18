import { google } from 'googleapis';
import { Readable } from 'stream';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

export async function uploadToGoogleDrive(file, fileName) {
  try {
    // Convert file buffer to stream
    const fileStream = new Readable();
    fileStream.push(Buffer.from(file));
    fileStream.push(null);

    // Upload file to Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: file.type || 'application/octet-stream',
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
      },
      media: {
        mimeType: file.type || 'application/octet-stream',
        body: fileStream,
      },
    });

    // Make the file publicly accessible
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Get the file link
    const fileLink = `https://drive.google.com/file/d/${response.data.id}/view`;

    return {
      id: response.data.id,
      link: fileLink,
      name: fileName,
    };
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw error;
  }
} 