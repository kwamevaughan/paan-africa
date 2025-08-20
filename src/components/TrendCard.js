import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Image from 'next/image';

const TrendCard = ({ trend, type = 'trend' }) => {
  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'campaign':
        return 'mdi:bullhorn';
      case 'news':
        return 'mdi:newspaper';
      case 'hashtag':
        return 'mdi:pound';
      default:
        return 'mdi:trending-up';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'campaign':
        return 'bg-paan-blue text-white';
      case 'news':
        return 'bg-paan-green text-white';
      case 'hashtag':
        return 'bg-paan-purple text-white';
      default:
        return 'bg-paan-yellow text-paan-dark-blue';
    }
  };

  const getTrendScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group event-card-hover"
    >
      {/* Image/Media Section */}
      <div className="relative aspect-video overflow-hidden">
        {trend.image_url || trend.hero_image || trend.featured_image ? (
          <img
            src={trend.image_url || trend.hero_image || trend.featured_image}
            alt={trend.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/assets/images/placeholder-trend.webp';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Icon icon="mdi:image-outline" className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Featured Badge */}
        {trend.is_featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-paan-yellow text-paan-dark-blue px-3 py-1 rounded-full text-xs font-bold shadow-md">
              Featured
            </span>
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-4 right-4">
          <span className={`${getTypeColor()} px-3 py-1 rounded-full text-xs font-bold shadow-md`}>
            <Icon icon={getTypeIcon()} className="w-3 h-3 inline mr-1" />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>

        {/* Trend Score Badge */}
        {trend.trend_score && (
          <div className="absolute bottom-4 right-4">
            <span className="bg-paan-red text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
              {trend.trend_score}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-paan-dark-blue mb-3 line-clamp-2 group-hover:text-paan-red transition-colors duration-300">
          {trend.title}
        </h3>

        {/* Description */}
        {trend.description && (
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
            {trend.description}
          </p>
        )}

        {/* Author Info */}
        {(trend.author_name || trend.brand_name || trend.agency_name) && (
          <div className="flex items-center space-x-2 mb-3">
            {trend.author_avatar && (
              <img
                src={trend.author_avatar}
                alt={trend.author_name}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {trend.author_name || trend.brand_name || trend.agency_name}
              </p>
              {trend.author_handle && (
                <p className="text-xs text-gray-500">@{trend.author_handle}</p>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {trend.tags && trend.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {trend.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {trend.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{trend.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Engagement Metrics */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon icon="mdi:heart" className="w-4 h-4 text-paan-red" />
              <span>{formatNumber(trend.likes_count)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon icon="mdi:eye" className="w-4 h-4 text-paan-blue" />
              <span>{formatNumber(trend.views_count)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon icon="mdi:share-variant" className="w-4 h-4 text-paan-green" />
              <span>{formatNumber(trend.shares_count)}</span>
            </div>
            {trend.comments_count > 0 && (
              <div className="flex items-center space-x-1">
                <Icon icon="mdi:comment" className="w-4 h-4 text-paan-purple" />
                <span>{formatNumber(trend.comments_count)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <Icon icon="mdi:calendar" className="w-4 h-4" />
            <span>{formatDate(trend.published_at)}</span>
          </div>
        </div>

        {/* Campaign-specific metrics */}
        {type === 'campaign' && (trend.viral_score || trend.engagement_rate) && (
          <div className="flex items-center justify-between mb-3 p-2 bg-blue-50 rounded-lg">
            {trend.viral_score && (
              <div className="flex items-center space-x-1">
                <Icon icon="mdi:trending-up" className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">
                  Viral Score: {trend.viral_score}
                </span>
              </div>
            )}
            {trend.engagement_rate && (
              <div className="text-sm text-gray-600">
                {trend.engagement_rate}% engagement
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="text-paan-dark-blue font-semibold">
            {trend.trend_score && `${trend.trend_score}% trending`}
          </div>
          <button
            onClick={() => window.open(trend.source_url, '_blank')}
            className="px-6 py-2 bg-paan-red text-white rounded-full font-semibold text-sm transition-all duration-300 hover:bg-paan-red/90 hover:scale-105 flex items-center gap-2"
          >
            <Icon icon="mdi:external-link" className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default TrendCard;
