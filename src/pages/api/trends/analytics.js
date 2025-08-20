import { mockAnalyticsData, mockFeaturedInsights, getMockData } from '../../../lib/mock-data';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { period = '7d', region = null, category = null } = req.query;

      // Calculate date range based on period
      const now = new Date();
      let startDate;
      switch (period) {
        case '24h':
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case '7d':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      }

      // Get mock analytics data
      const analyticsData = mockAnalyticsData;

      // Get mock trending insights
      const insights = {
        mostTalkedAboutCampaigns: getMockData('viral_campaigns').slice(0, 5),
        topTrendingHashtags: getMockData('trending_hashtags').slice(0, 10),
        featuredInsights: mockFeaturedInsights.slice(0, 3)
      };

      res.status(200).json({
        success: true,
        data: {
          analytics: analyticsData,
          insights,
          period,
          region,
          category,
        },
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch analytics',
        message: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed`,
    });
  }
}


