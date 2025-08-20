import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const HashtagCloud = ({ hashtags }) => {
  const [selectedHashtag, setSelectedHashtag] = useState(null);

  // Calculate font sizes based on trend score
  const getFontSize = (score) => {
    if (score >= 80) return 'text-4xl';
    if (score >= 60) return 'text-3xl';
    if (score >= 40) return 'text-2xl';
    if (score >= 20) return 'text-xl';
    return 'text-lg';
  };

  // Calculate colors based on growth rate
  const getColor = (growthRate) => {
    if (growthRate >= 15) return 'text-red-600 hover:text-red-700';
    if (growthRate >= 10) return 'text-orange-600 hover:text-orange-700';
    if (growthRate >= 5) return 'text-yellow-600 hover:text-yellow-700';
    return 'text-blue-600 hover:text-blue-700';
  };

  // Calculate opacity based on post count
  const getOpacity = (postCount) => {
    const maxPosts = Math.max(...hashtags.map(h => h.post_count));
    return Math.max(0.3, postCount / maxPosts);
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Hashtags</h2>
        <p className="text-gray-600">Discover what's trending across African creative communities</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Icon icon="mdi:pound" className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Hashtags</p>
              <p className="text-2xl font-bold text-gray-900">{hashtags.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Icon icon="mdi:account-group" className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(hashtags.reduce((sum, h) => sum + h.post_count, 0))}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon icon="mdi:trending-up" className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Growth</p>
              <p className="text-2xl font-bold text-gray-900">
                {hashtags.length > 0 
                  ? (hashtags.reduce((sum, h) => sum + h.growth_rate, 0) / hashtags.length).toFixed(1)
                  : 0}%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Icon icon="mdi:earth" className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Top Region</p>
              <p className="text-2xl font-bold text-gray-900">
                {hashtags.length > 0 && hashtags[0].top_regions?.[0] 
                  ? hashtags[0].top_regions[0].replace('Africa', '') 
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hashtag Cloud */}
      <div className="bg-white rounded-xl p-8 shadow-sm border">
        <div className="relative min-h-[400px] flex items-center justify-center">
          <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl">
            {hashtags.map((hashtag, index) => (
              <motion.button
                key={hashtag.id || index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: getOpacity(hashtag.post_count), scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.1, 
                  opacity: 1,
                  transition: { duration: 0.2 }
                }}
                onClick={() => setSelectedHashtag(selectedHashtag?.hashtag === hashtag.hashtag ? null : hashtag)}
                className={`font-bold cursor-pointer transition-all duration-300 ${getFontSize(hashtag.trend_score)} ${getColor(hashtag.growth_rate)} ${
                  selectedHashtag?.hashtag === hashtag.hashtag 
                    ? 'ring-4 ring-blue-300 bg-blue-50 px-3 py-2 rounded-lg' 
                    : ''
                }`}
              >
                #{hashtag.hashtag.replace('#', '')}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Hashtag Details */}
      {selectedHashtag && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">
              #{selectedHashtag.hashtag.replace('#', '')}
            </h3>
            <button
              onClick={() => setSelectedHashtag(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Posts</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(selectedHashtag.post_count)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Growth Rate</p>
              <p className="text-2xl font-bold text-green-600">
                +{selectedHashtag.growth_rate}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Trend Score</p>
              <p className="text-2xl font-bold text-blue-600">
                {selectedHashtag.trend_score}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Reach</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatNumber(selectedHashtag.reach_count)}
              </p>
            </div>
          </div>

          {selectedHashtag.description && (
            <div className="mt-4">
              <p className="text-gray-600">{selectedHashtag.description}</p>
            </div>
          )}

          {/* Regional Data */}
          {selectedHashtag.top_regions && selectedHashtag.top_regions.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Top Regions</h4>
              <div className="flex flex-wrap gap-2">
                {selectedHashtag.top_regions.map((region, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Platform Breakdown */}
          {selectedHashtag.source_platforms && selectedHashtag.source_platforms.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Platforms</h4>
              <div className="flex flex-wrap gap-2">
                {selectedHashtag.source_platforms.map((platform, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Hashtags */}
          {selectedHashtag.related_hashtags && selectedHashtag.related_hashtags.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Related Hashtags</h4>
              <div className="flex flex-wrap gap-2">
                {selectedHashtag.related_hashtags.slice(0, 5).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium cursor-pointer hover:bg-purple-200 transition-colors"
                    onClick={() => {
                      const hashtag = hashtags.find(h => h.hashtag === tag);
                      if (hashtag) setSelectedHashtag(hashtag);
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Hashtag List View */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Trending Hashtags</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {hashtags.map((hashtag, index) => (
            <div
              key={hashtag.id || index}
              className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setSelectedHashtag(hashtag)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-blue-600">
                    #{hashtag.hashtag.replace('#', '')}
                  </span>
                  {hashtag.is_featured && (
                    <span className="px-2 py-1 bg-yellow-500 text-white rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span>{formatNumber(hashtag.post_count)} posts</span>
                  <span className="text-green-600">+{hashtag.growth_rate}%</span>
                  <span className="text-blue-600">Score: {hashtag.trend_score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HashtagCloud;
