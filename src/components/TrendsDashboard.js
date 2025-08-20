import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import TrendCard from './TrendCard';
import HashtagCloud from './HashtagCloud';
import AnalyticsChart from './AnalyticsChart';
import CampaignHighlight from './CampaignHighlight';
import RegionalFilter from './RegionalFilter';
import CategoryFilter from './CategoryFilter';

const TrendsDashboard = () => {
  const [activeTab, setActiveTab] = useState('trends');

  // Helper function to get tab icons
  const getTabIcon = (tabId) => {
    const iconMap = {
      trends: 'mdi:trending-up',
      campaigns: 'mdi:bullhorn',
      hashtags: 'mdi:pound',
      news: 'mdi:newspaper',
      analytics: 'mdi:chart-line'
    };
    return iconMap[tabId] || 'mdi:circle';
  };
  const [trends, setTrends] = useState([]);
  const [viralCampaigns, setViralCampaigns] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [news, setNews] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [insights, setInsights] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    region: null,
    category: null,
    period: '7d',
    featured: false,
  });

  // Fetch data on component mount and filter changes
  useEffect(() => {
    fetchDashboardData();
  }, [filters]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDashboardData(true);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async (silent = false) => {
    if (!silent) setLoading(true);
    if (silent) setRefreshing(true);

    try {
      const [trendsRes, campaignsRes, hashtagsRes, newsRes, analyticsRes] = await Promise.all([
        fetch(`/api/trends?type=design_trends&limit=12&region=${filters.region || ''}&category=${filters.category || ''}&featured=${filters.featured}`),
        fetch(`/api/trends?type=viral_campaigns&limit=6&region=${filters.region || ''}`),
        fetch(`/api/trends?type=trending_hashtags&limit=20&region=${filters.region || ''}`),
        fetch(`/api/trends?type=creative_news&limit=8&region=${filters.region || ''}`),
        fetch(`/api/trends/analytics?period=${filters.period}&region=${filters.region || ''}&category=${filters.category || ''}`),
      ]);

      const [trendsData, campaignsData, hashtagsData, newsData, analyticsData] = await Promise.all([
        trendsRes.json(),
        campaignsRes.json(),
        hashtagsRes.json(),
        newsRes.json(),
        analyticsRes.json(),
      ]);

      if (trendsData.success) setTrends(trendsData.data);
      if (campaignsData.success) setViralCampaigns(campaignsData.data);
      if (hashtagsData.success) setHashtags(hashtagsData.data);
      if (newsData.success) setNews(newsData.data);
      if (analyticsData.success) {
        setAnalytics(analyticsData.data.analytics);
        setInsights(analyticsData.data.insights);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchDashboardData(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const tabs = [
    { id: 'trends', label: 'Design Trends', count: trends.length },
    { id: 'campaigns', label: 'Viral Campaigns', count: viralCampaigns.length },
    { id: 'hashtags', label: 'Trending Hashtags', count: hashtags.length },
    { id: 'news', label: 'Industry News', count: news.length },
    { id: 'analytics', label: 'Analytics', count: null },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Creative Trends Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E8EAEC]">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-2 border-paan-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <Image
                  src="/assets/images/logo.webp"
                  alt="PAAN Africa"
                  width={120}
                  height={120}
                  className="w-auto h-auto"
                />
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-paan-dark-blue global-font">
                    Creative Trends
                  </h1>
                  <p className="text-gray-600 mt-1 text-lg">Discover what's trending in African creative industries</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center px-6 py-3 bg-paan-red text-white rounded-xl hover:bg-paan-red/90 disabled:opacity-50 transition-all duration-300 font-semibold hover:scale-105 shadow-lg"
              >
                <Icon icon={refreshing ? "mdi:loading" : "mdi:refresh"} className={`w-5 h-5 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <RegionalFilter
                value={filters.region}
                onChange={(region) => handleFilterChange({ region })}
              />
              <CategoryFilter
                value={filters.category}
                onChange={(category) => handleFilterChange({ category })}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={filters.featured}
                  onChange={(e) => handleFilterChange({ featured: e.target.checked })}
                  className="w-4 h-4 text-paan-red bg-gray-100 border-gray-300 rounded focus:ring-paan-red focus:ring-2"
                />
                <label htmlFor="featured" className="text-paan-dark-blue font-medium cursor-pointer">
                  Featured Only
                </label>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Icon icon="mdi:clock-outline" className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 md:gap-0 md:space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-3 md:px-1 border-b-2 font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-paan-red text-paan-red'
                    : 'border-transparent text-gray-500 hover:text-paan-dark-blue hover:border-gray-300'
                }`}
              >
                <Icon icon={getTabIcon(tab.id)} className="w-5 h-5 mr-2" />
                <span className="whitespace-nowrap">{tab.label}</span>
                {tab.count !== null && (
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs font-bold ${
                    activeTab === tab.id 
                      ? 'bg-paan-red text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'trends' && (
            <motion.div
              key="trends"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Stats Overview - PAAN Style */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4">
                    <div className="flex justify-center items-center mb-4">
                      <div className="w-16 h-16 bg-paan-red/10 rounded-full flex items-center justify-center">
                        <Icon icon="mdi:trending-up" className="w-8 h-8 text-paan-red" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-paan-red mb-2">
                      {trends.length}
                    </div>
                    <div className="text-paan-dark-blue text-sm uppercase font-medium">
                      Total Trends
                    </div>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="flex justify-center items-center mb-4">
                      <div className="w-16 h-16 bg-paan-blue/10 rounded-full flex items-center justify-center">
                        <Icon icon="mdi:eye" className="w-8 h-8 text-paan-blue" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-paan-red mb-2">
                      {trends.reduce((sum, trend) => sum + (trend.views_count || 0), 0).toLocaleString()}
                    </div>
                    <div className="text-paan-dark-blue text-sm uppercase font-medium">
                      Total Views
                    </div>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="flex justify-center items-center mb-4">
                      <div className="w-16 h-16 bg-paan-green/10 rounded-full flex items-center justify-center">
                        <Icon icon="mdi:heart" className="w-8 h-8 text-paan-green" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-paan-red mb-2">
                      {trends.reduce((sum, trend) => sum + (trend.likes_count || 0), 0).toLocaleString()}
                    </div>
                    <div className="text-paan-dark-blue text-sm uppercase font-medium">
                      Total Likes
                    </div>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="flex justify-center items-center mb-4">
                      <div className="w-16 h-16 bg-paan-purple/10 rounded-full flex items-center justify-center">
                        <Icon icon="mdi:share-variant" className="w-8 h-8 text-paan-purple" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-paan-red mb-2">
                      {trends.reduce((sum, trend) => sum + (trend.shares_count || 0), 0).toLocaleString()}
                    </div>
                    <div className="text-paan-dark-blue text-sm uppercase font-medium">
                      Total Shares
                    </div>
                  </div>
                </div>
              </div>

              {/* Trends Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trends.map((trend, index) => (
                  <motion.div
                    key={trend.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TrendCard trend={trend} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'campaigns' && (
            <motion.div
              key="campaigns"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Most Talked About Campaign */}
              {insights.mostTalkedAboutCampaigns?.[0] && (
                <CampaignHighlight campaign={insights.mostTalkedAboutCampaigns[0]} />
              )}

              {/* Campaigns Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {viralCampaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TrendCard trend={campaign} type="campaign" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'hashtags' && (
            <motion.div
              key="hashtags"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <HashtagCloud hashtags={hashtags} />
            </motion.div>
          )}

          {activeTab === 'news' && (
            <motion.div
              key="news"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TrendCard trend={article} type="news" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <AnalyticsChart data={analytics} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TrendsDashboard;
