import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const AnalyticsChart = ({ data }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('trend_views');

  const periods = [
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
  ];

  const metrics = [
    { id: 'trend_views', label: 'Trend Views', color: 'blue' },
    { id: 'campaign_shares', label: 'Campaign Shares', color: 'green' },
    { id: 'hashtag_usage', label: 'Hashtag Usage', color: 'purple' },
    { id: 'engagement_rate', label: 'Engagement Rate', color: 'orange' },
  ];

  const getMetricColor = (metricId) => {
    const metric = metrics.find(m => m.id === metricId);
    return metric?.color || 'blue';
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const calculateGrowth = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  // Mock data for demonstration - replace with real data from props
  const mockTimeSeriesData = [
    { date: '2024-01-01', trend_views: 1200, campaign_shares: 450, hashtag_usage: 890, engagement_rate: 12.5 },
    { date: '2024-01-02', trend_views: 1350, campaign_shares: 520, hashtag_usage: 920, engagement_rate: 13.2 },
    { date: '2024-01-03', trend_views: 1100, campaign_shares: 380, hashtag_usage: 750, engagement_rate: 11.8 },
    { date: '2024-01-04', trend_views: 1600, campaign_shares: 680, hashtag_usage: 1100, engagement_rate: 15.1 },
    { date: '2024-01-05', trend_views: 1450, campaign_shares: 590, hashtag_usage: 980, engagement_rate: 13.8 },
    { date: '2024-01-06', trend_views: 1800, campaign_shares: 720, hashtag_usage: 1250, engagement_rate: 16.2 },
    { date: '2024-01-07', trend_views: 1700, campaign_shares: 650, hashtag_usage: 1150, engagement_rate: 15.5 },
  ];

  const currentData = mockTimeSeriesData[mockTimeSeriesData.length - 1];
  const previousData = mockTimeSeriesData[mockTimeSeriesData.length - 2];
  const currentValue = currentData?.[selectedMetric] || 0;
  const previousValue = previousData?.[selectedMetric] || 0;
  const growth = calculateGrowth(currentValue, previousValue);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Insights</h2>
        <p className="text-gray-600">Track performance and discover patterns in creative trends</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:calendar" className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Time Period:</span>
            </div>
            <div className="flex space-x-2">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:filter" className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Metric:</span>
            </div>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {metrics.map((metric) => (
                <option key={metric.id} value={metric.id}>
                  {metric.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(currentValue)}
              </p>
            </div>
            <div className={`p-2 rounded-lg bg-${getMetricColor(selectedMetric)}-100`}>
              <Icon icon="mdi:chart-line" className={`w-6 h-6 text-${getMetricColor(selectedMetric)}-600`} />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            {growth >= 0 ? (
              <Icon icon="mdi:trending-up" className="w-4 h-4 text-green-600" />
            ) : (
              <Icon icon="mdi:trending-down" className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-sm font-medium ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growth >= 0 ? '+' : ''}{growth}%
            </span>
            <span className="text-sm text-gray-500">vs previous period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Trends</p>
              <p className="text-2xl font-bold text-gray-900">
                {data?.summary?.totalTrends || 0}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-blue-100">
              <Icon icon="mdi:chart-bar" className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Active trends tracked</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Engagement</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(data?.summary?.totalEngagement || 0)}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-green-100">
              <Icon icon="mdi:trending-up" className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Likes, shares, comments</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Growth Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {data?.summary?.growthRate || 0}%
              </p>
            </div>
            <div className="p-2 rounded-lg bg-purple-100">
              <Icon icon="mdi:trending-up" className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Overall trend growth</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {metrics.find(m => m.id === selectedMetric)?.label} Over Time
          </h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full bg-${getMetricColor(selectedMetric)}-500`}></div>
            <span className="text-sm text-gray-600">Current Period</span>
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="relative h-64">
          <div className="flex items-end justify-between h-full space-x-2">
            {mockTimeSeriesData.map((dataPoint, index) => {
              const value = dataPoint[selectedMetric];
              const maxValue = Math.max(...mockTimeSeriesData.map(d => d[selectedMetric]));
              const height = (value / maxValue) * 100;
              
              return (
                <motion.div
                  key={dataPoint.date}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex-1 bg-${getMetricColor(selectedMetric)}-500 rounded-t-lg relative group`}
                  style={{ minHeight: '4px' }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {formatNumber(value)}
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            {mockTimeSeriesData.map((dataPoint) => (
              <span key={dataPoint.date} className="flex-1 text-center">
                {new Date(dataPoint.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Top Categories */}
      {data?.summary?.topCategories && data.summary.topCategories.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.summary.topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-medium text-gray-900">{category.name}</span>
                </div>
                <span className="text-sm text-gray-600">{category.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regional Breakdown */}
      {data?.summary?.topRegions && data.summary.topRegions.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Performance</h3>
          <div className="space-y-4">
            {data.summary.topRegions.map((region, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-900">{region.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${region.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{region.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsChart;
