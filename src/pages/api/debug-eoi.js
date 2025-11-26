export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Only allow in development or with a secret key
  if (process.env.NODE_ENV === 'production' && req.query.secret !== process.env.DEBUG_SECRET) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const envCheck = {
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_SERVICE_ACCOUNT: process.env.GOOGLE_SERVICE_ACCOUNT ? 'SET' : 'NOT SET',
    GOOGLE_DRIVE_FOLDER_ID: process.env.GOOGLE_DRIVE_FOLDER_ID ? 'SET' : 'NOT SET',
    SMTP_HOST: process.env.SMTP_HOST ? 'SET' : 'NOT SET',
    SMTP_PORT: process.env.SMTP_PORT ? 'SET' : 'NOT SET',
    SMTP_EMAIL: process.env.SMTP_EMAIL ? 'SET' : 'NOT SET',
    SMTP_PASSWORD: process.env.SMTP_PASSWORD ? 'SET' : 'NOT SET',
    EMAIL_SECURE: process.env.EMAIL_SECURE,
  };

  // Test Google Drive credentials
  let googleDriveTest = 'NOT TESTED';
  try {
    if (process.env.GOOGLE_SERVICE_ACCOUNT) {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
      googleDriveTest = credentials.client_email ? 'VALID' : 'INVALID - Missing client_email';
    } else {
      googleDriveTest = 'NOT SET';
    }
  } catch (error) {
    googleDriveTest = `INVALID - ${error.message}`;
  }

  // Test SMTP configuration
  let smtpTest = 'NOT TESTED';
  try {
    if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
      smtpTest = 'CONFIGURED';
    } else {
      smtpTest = 'INCOMPLETE - Missing required SMTP variables';
    }
  } catch (error) {
    smtpTest = `ERROR - ${error.message}`;
  }

  res.status(200).json({
    message: 'EOI Debug Information',
    environment: envCheck,
    tests: {
      googleDrive: googleDriveTest,
      smtp: smtpTest
    },
    timestamp: new Date().toISOString(),
    recommendations: [
      'Check that all required environment variables are set in production',
      'Verify Google Drive service account credentials are valid',
      'Ensure SMTP configuration is correct',
      'Check server logs for detailed error messages',
      'Test file upload limits and timeouts'
    ]
  });
} 