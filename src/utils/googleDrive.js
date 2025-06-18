import { google } from 'googleapis';
import fs from 'fs';

// Initialize Google Auth with Service Account
const getServiceAccountCredentials = () => {
  try {
    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT;
    if (!serviceAccountJson) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT environment variable is not set');
    }
    
    const credentials = JSON.parse(serviceAccountJson);
    
    // Ensure private key is properly formatted
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
    }
    
    return credentials;
  } catch (error) {
    console.error('Error parsing Google Service Account credentials:', error);
    throw error;
  }
};

const auth = new google.auth.GoogleAuth({
  credentials: getServiceAccountCredentials(),
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

export async function uploadToGoogleDrive(file, fileName) {
  try {
    // Read file from filepath (formidable stores files temporarily)
    const fileBuffer = fs.readFileSync(file.filepath);
    const mimeType = file.mimetype || 'application/octet-stream';

    // Upload file to Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: mimeType,
        parents: process.env.GOOGLE_DRIVE_FOLDER_ID ? [process.env.GOOGLE_DRIVE_FOLDER_ID] : undefined,
      },
      media: {
        mimeType: mimeType,
        body: fileBuffer,
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