import { aggregateAllTrends } from '../../../lib/trends-api';

export default async function handler(req, res) {
  // Verify the request is from a legitimate cron service
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.CRON_SECRET_TOKEN;
  
  if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Invalid or missing authorization token'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
      message: 'Only POST requests are allowed'
    });
  }

  try {
    console.log('Starting automated trend aggregation...');
    
    const startTime = Date.now();
    const results = await aggregateAllTrends();
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`Trend aggregation completed in ${duration}ms`);

    // Log aggregation results
    const summary = {
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      design_trends_count: results.design_trends.length,
      viral_campaigns_count: results.viral_campaigns.length,
      trending_hashtags_count: results.trending_hashtags.length,
      creative_news_count: results.creative_news.length,
      total_items: Object.values(results).reduce((sum, arr) => sum + arr.length, 0)
    };

    console.log('Aggregation summary:', summary);

    res.status(200).json({
      success: true,
      message: 'Trend aggregation completed successfully',
      data: summary,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in automated trend aggregation:', error);
    
    res.status(500).json({
      success: false,
      error: 'Aggregation failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
