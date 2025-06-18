# Expression of Interest (EOI) Troubleshooting Guide

## Issues Identified

### 1. PWA Service Worker Error
**Error**: `bad-precaching-response: bad-precaching-response :: [{"url":"https://paan.africa/_next/app-build-manifest.json","status":404}]`

**Cause**: The PWA service worker is trying to precache files that don't exist in production.

**Solution**: ✅ **FIXED** - Updated `next.config.js` to exclude problematic files from precaching.

### 2. Environment Variables Missing in Production
**Potential Issue**: Required environment variables might not be configured in production.

**Required Variables**:
- `GOOGLE_SERVICE_ACCOUNT` - Google Drive API credentials
- `GOOGLE_DRIVE_FOLDER_ID` - Google Drive folder for uploads
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_EMAIL` - SMTP email address
- `SMTP_PASSWORD` - SMTP password
- `EMAIL_SECURE` - SMTP security setting

**Solution**: ✅ **ADDED** - Debug endpoint at `/api/debug-eoi` to check environment variables.

### 3. File Upload Issues
**Potential Issues**:
- File size limits (currently 10MB per file, 10 files total)
- Timeout issues (increased to 30 seconds)
- Google Drive API authentication problems

**Solution**: ✅ **IMPROVED** - Enhanced error handling and logging in `googleDrive.js`.

## Debugging Steps

### Step 1: Check Environment Variables
Visit: `https://paan.africa/api/debug-eoi?secret=YOUR_DEBUG_SECRET`

This will show you:
- Which environment variables are set
- Google Drive credentials validation
- SMTP configuration status

### Step 2: Check Browser Console
Look for these specific errors:
- Network errors (404, 500, etc.)
- Google Drive API errors
- SMTP connection errors
- File upload errors

### Step 3: Check Server Logs
Look for these log messages:
- `EOI API endpoint called`
- `Environment check:`
- `Google Service Account credentials parsed successfully`
- `Email transporter created`
- `Email sent successfully`

## Common Production Issues

### 1. Missing Environment Variables
**Symptoms**: 500 error with "Server configuration error"
**Solution**: Ensure all required environment variables are set in your hosting platform.

### 2. Google Drive API Issues
**Symptoms**: File uploads fail
**Solutions**:
- Verify service account credentials are valid
- Check Google Drive API is enabled
- Ensure folder ID is correct and accessible

### 3. SMTP Issues
**Symptoms**: Form submits but no email received
**Solutions**:
- Verify SMTP credentials
- Check SMTP server allows connections
- Test SMTP configuration manually

### 4. File Upload Limits
**Symptoms**: Large files fail to upload
**Solutions**:
- Check hosting platform file size limits
- Verify server timeout settings
- Consider reducing file size limits

## Testing the Fix

### 1. Clear Browser Cache
- Clear all browser data
- Hard refresh the page (Ctrl+F5)
- Check if PWA error is resolved

### 2. Test Form Submission
- Fill out the EOI form
- Upload test files
- Submit and check for success message
- Verify email is received

### 3. Monitor Console
- Open browser developer tools
- Check for any remaining errors
- Look for successful API calls

## Deployment Checklist

- [ ] All environment variables are set in production
- [ ] Google Drive API is enabled and configured
- [ ] SMTP server is accessible from production
- [ ] File upload limits are appropriate
- [ ] PWA configuration is updated
- [ ] Service worker cache is cleared
- [ ] Test form submission works

## Emergency Fixes

### If PWA errors persist:
1. Temporarily disable PWA in production:
   ```javascript
   // In next.config.js
   disable: process.env.NODE_ENV === "development" || true,
   ```

### If environment variables are missing:
1. Set them in your hosting platform
2. Restart the application
3. Test the debug endpoint

### If file uploads fail:
1. Check Google Drive API quota
2. Verify service account permissions
3. Test with smaller files first

## Support

If issues persist:
1. Check the debug endpoint output
2. Review server logs
3. Test in development environment
4. Contact hosting provider for server-specific issues 