import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const CampaignHighlight = ({ campaign }) => {
  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 shadow-sm border border-blue-200"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-yellow-500 rounded-lg">
          <Icon icon="mdi:trophy" className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Most Talked About Campaign This Week</h2>
          <p className="text-gray-600">The viral campaign that's capturing everyone's attention</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Campaign Image/Video */}
        <div className="relative">
          {campaign.hero_image ? (
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <img
                src={campaign.hero_image}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
              {campaign.video_url && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[12px] border-l-blue-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Icon icon="mdi:trending-up" className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-500">Campaign Visual</p>
              </div>
            </div>
          )}
        </div>

        {/* Campaign Details */}
        <div className="space-y-6">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{campaign.title}</h3>
            {campaign.description && (
              <p className="text-gray-600 text-lg leading-relaxed">{campaign.description}</p>
            )}
          </div>

          {/* Brand & Agency Info */}
          <div className="flex items-center space-x-4">
            {campaign.brand_name && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {campaign.brand_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Brand</p>
                  <p className="font-semibold text-gray-900">{campaign.brand_name}</p>
                </div>
              </div>
            )}
            {campaign.agency_name && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-sm">
                    {campaign.agency_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Agency</p>
                  <p className="font-semibold text-gray-900">{campaign.agency_name}</p>
                </div>
              </div>
            )}
          </div>

          {/* Campaign Type & Industry */}
          <div className="flex flex-wrap gap-2">
            {campaign.campaign_type && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {campaign.campaign_type}
              </span>
            )}
            {campaign.industry && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {campaign.industry}
              </span>
            )}
            {campaign.target_audience && (
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                {campaign.target_audience}
              </span>
            )}
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Icon icon="mdi:trending-up" className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Viral Score</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{campaign.viral_score}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Icon icon="mdi:account-group" className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">Engagement Rate</span>
              </div>
              <p className="text-2xl font-bold text-green-600">{campaign.engagement_rate}%</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Icon icon="mdi:eye" className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-600">Reach</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">{formatNumber(campaign.reach_count)}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Icon icon="mdi:earth" className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-600">Sentiment</span>
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {campaign.sentiment_score > 0 ? '+' : ''}{campaign.sentiment_score}
              </p>
            </div>
          </div>

          {/* Social Media Metrics */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Social Media Performance</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Icon icon="mdi:heart" className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-600">Likes</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{formatNumber(campaign.likes_count)}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Icon icon="mdi:share-variant" className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Shares</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{formatNumber(campaign.shares_count)}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Icon icon="mdi:comment" className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Comments</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{formatNumber(campaign.comments_count)}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Icon icon="mdi:eye" className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600">Views</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{formatNumber(campaign.views_count)}</p>
              </div>
            </div>
          </div>

          {/* Hashtags */}
          {campaign.hashtags && campaign.hashtags.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Campaign Hashtags</h4>
              <div className="flex flex-wrap gap-2">
                {campaign.hashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              <span className="font-medium">Launched:</span> {formatDate(campaign.launch_date)}
            </div>
            {campaign.end_date && (
              <div>
                <span className="font-medium">Ended:</span> {formatDate(campaign.end_date)}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 pt-4">
            <button
              onClick={() => window.open(campaign.source_url, '_blank')}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Icon icon="mdi:external-link" className="w-4 h-4" />
              <span>View Campaign</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Icon icon="mdi:share-variant" className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignHighlight;
