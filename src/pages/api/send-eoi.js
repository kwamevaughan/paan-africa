import nodemailer from "nodemailer";
import fs from 'fs';
import os from 'os';
import formidable from 'formidable';
import { uploadFileToDrive } from "../../utils/googleDrive";
import { createClient } from '@supabase/supabase-js';

// Disable Next.js body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log('EOI API endpoint called - Method:', req.method);
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Starting form parsing with formidable...');
    const fields = {};
    const files = [];
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 10,
      keepExtensions: true,
      uploadDir: os.tmpdir(),
      filename: (name, ext, part, form) => {
        return `upload_${Date.now()}_${part.originalFilename || 'file'}`;
      }
    });
    const [formFields, formFiles] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parsing error:', err);
          reject(err);
        } else {
          console.log('Form parsed successfully');
          resolve([fields, files]);
        }
      });
    });

    // Helper to normalize field values
    function getFieldValue(field) {
      return Array.isArray(field) ? field[0] : field;
    }
    // Extract form fields
    const name = getFieldValue(formFields.name) || '';
    const email = getFieldValue(formFields.email) || '';
    const agencyName = getFieldValue(formFields.agencyName) || '';
    const country = getFieldValue(formFields.country) || '';
    const opportunities = getFieldValue(formFields.opportunities) || '[]';
    const credentials = getFieldValue(formFields.credentials) || '';

    // Prepare files for upload
    const credentialsFiles = Array.isArray(formFiles.credentialsFiles)
      ? formFiles.credentialsFiles
      : formFiles.credentialsFiles
      ? [formFiles.credentialsFiles]
      : [];
    const experienceFiles = Array.isArray(formFiles.experience)
      ? formFiles.experience
      : formFiles.experience
      ? [formFiles.experience]
      : [];

    // Upload files to Google Drive and collect links
    const driveUploadResults = [];
    for (const file of [...credentialsFiles, ...experienceFiles]) {
      const fileBuffer = fs.readFileSync(file.filepath);
      const base64String = fileBuffer.toString('base64');
      const uploadResult = await uploadFileToDrive(
        name,
        agencyName,
        base64String,
        file.originalFilename || 'file',
        null,
        file.mimetype || 'application/octet-stream'
      );
      driveUploadResults.push({
        name: file.originalFilename,
        url: uploadResult.url
      });
    }

    // Clean up temp files
    for (const file of [...credentialsFiles, ...experienceFiles]) {
      try {
        fs.unlinkSync(file.filepath);
      } catch (err) {
        console.error('Failed to delete temp file:', file.filepath, err);
      }
    }

    // Insert into Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );
    const { error } = await supabase.from('eoi_submissions').insert({
      name,
      email,
      agency_name: agencyName,
      country,
      opportunities: typeof opportunities === 'string' ? JSON.parse(opportunities) : opportunities,
      credentials,
      drive_files: driveUploadResults, // Save Google Drive links
      status: 'pending_email',
      created_at: new Date().toISOString(),
      processed_at: null,
      error_message: null
    });
    if (error) {
      console.error('Error inserting EOI submission:', error);
      return res.status(500).json({ message: 'Failed to save submission', error: error.message });
    }
    return res.status(200).json({ message: 'Your submission was received and will be processed shortly.' });
  } catch (error) {
    console.error('Error processing EOI submission:', error);
    res.status(500).json({ message: 'Error processing form', error: error.message });
  }
} 