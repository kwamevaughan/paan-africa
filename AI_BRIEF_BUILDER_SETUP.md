# PAAN AI Brief Builder Setup Guide

## Overview
The PAAN AI Brief Builder is a powerful tool that uses OpenAI's GPT-4 model to generate comprehensive creative briefs for marketing and creative projects. This feature has been successfully integrated into the PAAN homepage.

## Features
- **AI-Powered Brief Generation**: Uses OpenAI's GPT-4 to create professional creative briefs
- **Comprehensive Form**: Collects project type, industry, target audience, goals, budget, and timeline
- **Professional Output**: Generates structured briefs with project overview, audience analysis, creative direction, deliverables, success metrics, budget considerations, and risk assessment
- **Export Options**: Copy to clipboard or download as text file
- **User-Friendly Interface**: Tabbed interface with form and results views

## Setup Instructions

### 1. Install Dependencies
The OpenAI package has been added to `package.json`. Run:
```bash
npm install
```

### 2. Environment Variables
Add the following environment variable to your `.env.local` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env.local` file

### 4. API Endpoint
The AI Brief Builder API endpoint is located at:
```
/api/ai-brief-builder
```

### 5. Component Location
The React component is located at:
```
src/components/AIBriefBuilder.js
```

## How It Works

### Frontend (React Component)
- **Form Collection**: Collects project details through a user-friendly form
- **Validation**: Ensures required fields are filled
- **API Integration**: Sends data to the backend API
- **Results Display**: Shows generated brief with copy/download options

### Backend (API Endpoint)
- **Input Validation**: Validates required fields
- **OpenAI Integration**: Uses GPT-4 to generate comprehensive briefs
- **Error Handling**: Provides meaningful error messages
- **Response Format**: Returns structured data with brief and summary

### AI Prompt Structure
The AI is prompted to create briefs with the following sections:
1. Project Overview
2. Target Audience Analysis
3. Creative Direction
4. Deliverables & Timeline
5. Success Metrics
6. Budget Considerations
7. Risk Assessment

## Usage

### For Users
1. Navigate to the PAAN homepage
2. Scroll to the "PAAN AI Brief Builder" section
3. Fill in the project details form
4. Click "Generate Creative Brief"
5. Review the generated brief
6. Copy or download the brief as needed

### For Developers
The component can be imported and used in other parts of the application:

```javascript
import AIBriefBuilder from "@/components/AIBriefBuilder";

// Use in your component
<AIBriefBuilder />
```

## Error Handling

The system handles various error scenarios:
- **Missing API Key**: Shows "AI service is currently unavailable"
- **API Quota Exceeded**: Shows "AI service is temporarily unavailable due to high demand"
- **Invalid API Key**: Shows "AI service configuration error"
- **Network Errors**: Shows "An error occurred while generating your brief"

## Security Considerations

1. **API Key Protection**: The OpenAI API key is stored server-side only
2. **Input Validation**: All user inputs are validated before processing
3. **Rate Limiting**: Consider implementing rate limiting for production use
4. **Error Messages**: Generic error messages don't expose sensitive information

## Cost Considerations

- **OpenAI API Costs**: GPT-4 usage incurs costs per token
- **Token Usage**: Each brief generation uses approximately 2000-3000 tokens
- **Cost Optimization**: Consider implementing usage limits or user authentication

## Future Enhancements

Potential improvements for the AI Brief Builder:
1. **User Authentication**: Require login to use the tool
2. **Usage Limits**: Implement daily/monthly usage limits
3. **Brief Templates**: Add industry-specific templates
4. **Collaboration**: Allow teams to share and edit briefs
5. **Integration**: Connect with project management tools
6. **Analytics**: Track usage and popular project types

## Troubleshooting

### Common Issues

1. **"AI service is currently unavailable"**
   - Check if OPENAI_API_KEY is set in environment variables
   - Verify the API key is valid

2. **"Failed to generate brief"**
   - Check network connectivity
   - Verify OpenAI API is accessible
   - Check browser console for detailed errors

3. **Form validation errors**
   - Ensure all required fields are filled
   - Check field formats (email, etc.)

### Debug Mode
The API includes comprehensive error logging. Check server logs for detailed error information.

## Support

For technical support or questions about the AI Brief Builder:
1. Check the browser console for error messages
2. Review server logs for API errors
3. Verify environment variable configuration
4. Test with a simple project brief first

---

**Note**: This feature requires an active OpenAI API key and internet connectivity to function properly. 