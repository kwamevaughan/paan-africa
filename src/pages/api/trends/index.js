import { getMockData } from '../../../lib/mock-data';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const {
        type = 'design_trends',
        limit = 20,
        offset = 0,
        category = null,
        region = null,
        featured = false,
        refresh = false,
      } = req.query;

      // Get mock data based on type
      let trends = getMockData(type, { category, region, featured });
      
      // Apply limit and offset
      if (limit) {
        trends = trends.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
      }

      res.status(200).json({
        success: true,
        data: trends,
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: trends.length === parseInt(limit),
        },
      });
    } catch (error) {
      console.error('Error fetching trends:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch trends',
        message: error.message,
      });
    }
  } else if (req.method === 'POST') {
    // Manual trigger for trend aggregation (mock data)
    try {
      res.status(200).json({
        success: true,
        message: 'Mock data refresh completed successfully',
        data: {
          design_trends_count: getMockData('design_trends').length,
          viral_campaigns_count: getMockData('viral_campaigns').length,
          trending_hashtags_count: getMockData('trending_hashtags').length,
          creative_news_count: getMockData('creative_news').length,
        },
      });
    } catch (error) {
      console.error('Error in mock data refresh:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to refresh mock data',
        message: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed`,
    });
  }
}
