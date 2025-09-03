# Creative Trends Dashboard Setup Guide

## Overview

The PAAN Creative Trends Dashboard is a comprehensive platform that aggregates and displays trending design styles, viral campaigns, popular hashtags, and industry news from various sources across Africa. This guide will help you set up and deploy the dashboard.

## Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- API keys for various platforms (Behance, Instagram, Twitter, etc.)
- Vercel or similar hosting platform

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Keys for Data Sources
BEHANCE_API_KEY=your_behance_api_key
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
TIKTOK_ACCESS_TOKEN=your_tiktok_access_token
TWITTER_BEARER_TOKEN=your_twitter_bearer_token
NEWS_API_KEY=your_news_api_key

# Cron Job Security
CRON_SECRET_TOKEN=your_secure_cron_token

# Optional: Additional API Keys
ADWEEK_API_KEY=your_adweek_api_key
```

## Database Setup

1. **Run the Database Schema**
   ```sql
   -- Execute the schema from database/creative-trends-schema.sql
   -- This will create all necessary tables and sample data
   ```

2. **Verify Tables Created**
   - `data_sources`
   - `trend_categories`
   - `design_trends`
   - `viral_campaigns`
   - `trending_hashtags`
   - `creative_news`
   - `regions`
   - `featured_insights`
   - `trend_analytics`
   - `user_trend_interactions`

## API Setup

### 1. Behance API
- Visit [Behance Developer Portal](https://www.behance.net/dev)
- Create a new app
- Get your API key
- Add to environment variables

### 2. Instagram API
- Requires Facebook Developer Account
- Create a Facebook App
- Configure Instagram Basic Display API
- Get access token through OAuth flow
- Note: Requires app review for production use

### 3. Twitter API
- Visit [Twitter Developer Portal](https://developer.twitter.com/)
- Create a new app
- Apply for Elevated access
- Generate Bearer Token
- Add to environment variables

### 4. TikTok API
- Visit [TikTok for Developers](https://developers.tiktok.com/)
- Create a new app
- Configure permissions
- Generate access token
- Add to environment variables

### 5. News API
- Visit [NewsAPI.org](https://newsapi.org/)
- Sign up for free account
- Get API key
- Add to environment variables

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Run Database Migrations**
   ```bash
   # Execute the SQL schema in your Supabase SQL editor
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access Dashboard**
   ```
   http://localhost:3000/trends-dashboard
   ```

## Cron Job Setup

### Option 1: Vercel Cron Jobs (Recommended)

Add to your `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/aggregate-trends",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

### Option 2: External Cron Service

Use services like:
- [Cron-job.org](https://cron-job.org/)
- [EasyCron](https://www.easycron.com/)
- [SetCronJob](https://www.setcronjob.com/)

Configure to call:
```
POST https://your-domain.com/api/cron/aggregate-trends
Headers: Authorization: Bearer your_cron_secret_token
```

### Option 3: GitHub Actions

Create `.github/workflows/aggregate-trends.yml`:

```yaml
name: Aggregate Trends
on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:  # Manual trigger

jobs:
  aggregate:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger aggregation
        run: |
          curl -X POST https://your-domain.com/api/cron/aggregate-trends \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET_TOKEN }}"
```

## Deployment

### Vercel Deployment

1. **Connect Repository**
   ```bash
   vercel --prod
   ```

2. **Set Environment Variables**
   - Go to Vercel Dashboard
   - Navigate to your project
   - Go to Settings > Environment Variables
   - Add all required environment variables

3. **Deploy**
   ```bash
   git push origin main
   ```

### Manual Deployment

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

## Features

### 1. Real-time Data Aggregation
- Automatic fetching from multiple platforms
- Rate limiting and error handling
- Data normalization and storage

### 2. Interactive Dashboard
- Tabbed interface for different content types
- Real-time statistics and metrics
- Regional and category filtering

### 3. Visual Components
- Trend cards with engagement metrics
- Hashtag cloud visualization
- Analytics charts and graphs
- Campaign highlight sections

### 4. Engagement Features
- Like and share functionality
- Bookmark trends
- User interaction tracking

## Customization

### Adding New Data Sources

1. **Update API Configuration**
   ```javascript
   // In src/lib/trends-api.js
   const API_CONFIG = {
     // Add your new source
     newSource: {
       baseUrl: 'https://api.newsource.com',
       apiKey: process.env.NEW_SOURCE_API_KEY,
       rateLimit: 100,
     },
   };
   ```

2. **Create Fetch Function**
   ```javascript
   export async function fetchNewSourceTrends() {
     // Implementation
   }
   ```

3. **Update Main Aggregation**
   ```javascript
   // In aggregateAllTrends function
   const newSourceTrends = await fetchNewSourceTrends();
   results.design_trends.push(...newSourceTrends);
   ```

### Customizing Visual Elements

1. **Trend Cards**
   - Modify `src/components/TrendCard.js`
   - Add new card types
   - Customize styling

2. **Analytics Charts**
   - Update `src/components/AnalyticsChart.js`
   - Add new chart types
   - Customize metrics

3. **Filters**
   - Modify `src/components/RegionalFilter.js`
   - Update `src/components/CategoryFilter.js`
   - Add new filter types

## Monitoring and Analytics

### 1. Error Tracking
- Monitor API failures
- Track rate limit hits
- Log aggregation errors

### 2. Performance Monitoring
- Track aggregation duration
- Monitor database performance
- Monitor API response times

### 3. Usage Analytics
- Track user interactions
- Monitor popular trends
- Analyze regional preferences

## Troubleshooting

### Common Issues

1. **API Rate Limits**
   - Check rate limit configurations
   - Implement exponential backoff
   - Monitor API usage

2. **Database Connection**
   - Verify Supabase credentials
   - Check network connectivity
   - Monitor connection pool

3. **Missing Data**
   - Check API keys are valid
   - Verify API endpoints
   - Monitor error logs

### Debug Mode

Enable debug logging:

```javascript
// In src/lib/trends-api.js
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('API Request:', url);
  console.log('Response:', data);
}
```

## Security Considerations

1. **API Key Management**
   - Use environment variables
   - Rotate keys regularly
   - Monitor for unauthorized access

2. **Rate Limiting**
   - Implement proper rate limiting
   - Monitor for abuse
   - Set appropriate limits

3. **Data Privacy**
   - Anonymize user data
   - Comply with GDPR
   - Secure data transmission

## Performance Optimization

1. **Caching**
   - Implement Redis caching
   - Cache API responses
   - Cache database queries

2. **Database Optimization**
   - Add proper indexes
   - Optimize queries
   - Monitor query performance

3. **CDN**
   - Use CDN for static assets
   - Optimize images
   - Enable compression

## Support

For issues and questions:
- Check the troubleshooting section
- Review API documentation
- Contact PAAN support team

## License

This project is licensed under the MIT License - see the LICENSE file for details.
















