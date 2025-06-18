import { google } from 'googleapis';
import fs from 'fs';

// Initialize Google Auth with Service Account
const getServiceAccountCredentials = () => {
  try {
    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT;
    if (!serviceAccountJson) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT environment variable is not set');
    }
    
    console.log('Parsing Google Service Account credentials...');
    const credentials = JSON.parse(serviceAccountJson);
    
    // Ensure private key is properly formatted
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
    }
    
    // Validate required fields
    if (!credentials.client_email || !credentials.private_key) {
      throw new Error('Invalid service account credentials: missing client_email or private_key');
    }
    
    console.log('Google Service Account credentials parsed successfully');
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
    console.log('🚀 Starting Google Drive upload for:', fileName);
    console.log('📋 Input file object:', {
      filepath: file.filepath,
      originalFilename: file.originalFilename,
      size: file.size,
      mimetype: file.mimetype
    });
    
    // Check if file exists
    if (!fs.existsSync(file.filepath)) {
      throw new Error(`File not found: ${file.filepath}`);
    }
    
    // Read file from filepath (formidable stores files temporarily)
    const fileBuffer = fs.readFileSync(file.filepath);
    const mimeType = file.mimetype || 'application/octet-stream';
    
    console.log('📖 File read successfully, size:', fileBuffer.length, 'bytes');
    console.log('📄 MIME type:', mimeType);

    // Upload file to Google Drive
    console.log('☁️ Creating file in Google Drive...');
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

    console.log('✅ File created in Google Drive, ID:', response.data.id);
    console.log('📁 Google Drive response:', response.data);

    // Make the file publicly accessible
    console.log('🔓 Setting file permissions...');
    const permissionResponse = await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
    console.log('✅ Permissions set successfully:', permissionResponse.data);

    // Get the file link
    const fileLink = `https://drive.google.com/file/d/${response.data.id}/view`;

    console.log('🎉 Google Drive upload completed successfully for:', fileName);
    console.log('🔗 File link:', fileLink);
    console.log('📁 File ID:', response.data.id);

    const result = {
      id: response.data.id,
      link: fileLink,
      name: fileName,
    };
    
    console.log('📤 Returning result:', result);
    return result;
  } catch (error) {
    console.error('💥 Error uploading to Google Drive:', error);
    console.error('💥 Error details:', {
      fileName,
      filePath: file.filepath,
      fileSize: file.size,
      mimeType: file.mimetype,
      errorMessage: error.message,
      errorCode: error.code,
      errorStatus: error.status,
      stack: error.stack
    });
    throw error;
  }
} 