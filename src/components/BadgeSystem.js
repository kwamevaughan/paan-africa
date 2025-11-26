import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

// Badge definitions with enhanced criteria and visuals
const BADGE_DEFINITIONS = {
  'verified': {
    id: 'verified',
    name: 'Verified Creative',
    description: 'Profile verified by PAAN team',
    icon: 'lucide:shield-check',
    color: '#34B6A7',
    gradient: 'from-emerald-400 to-teal-500',
    rarity: 'common',
    criteria: { verification_required: true }
  },
  'top_rated': {
    id: 'top_rated',
    name: 'Top Rated',
    description: '4.5+ star rating with 10+ reviews',
    icon: 'lucide:star',
    color: '#F2B706',
    gradient: 'from-yellow-400 to-amber-500',
    rarity: 'rare',
    criteria: { min_rating: 4.5, min_reviews: 10 }
  },
  'rising_star': {
    id: 'rising_star',
    name: 'Rising Star',
    description: 'New talent with exceptional early reviews',
    icon: 'lucide:trending-up',
    color: '#EC5B88',
    gradient: 'from-pink-400 to-rose-500',
    rarity: 'rare',
    criteria: { account_age_months: 6, min_rating: 4.8 }
  },
  'portfolio_master': {
    id: 'portfolio_master',
    name: 'Portfolio Master',
    description: '10+ high-quality portfolio items',
    icon: 'lucide:image',
    color: '#84C1D9',
    gradient: 'from-blue-400 to-cyan-500',
    rarity: 'uncommon',
    criteria: { min_portfolio_items: 10 }
  },
  'quick_responder': {
    id: 'quick_responder',
    name: 'Quick Responder',
    description: 'Responds within 24 hours',
    icon: 'lucide:clock',
    color: '#F25849',
    gradient: 'from-red-400 to-orange-500',
    rarity: 'common',
    criteria: { avg_response_time_hours: 24 }
  },
  'client_favorite': {
    id: 'client_favorite',
    name: 'Client Favorite',
    description: 'High repeat client rate',
    icon: 'lucide:heart',
    color: '#EC5B88',
    gradient: 'from-pink-400 to-purple-500',
    rarity: 'rare',
    criteria: { repeat_clients: 3 }
  },
  'award_winner': {
    id: 'award_winner',
    name: 'Award Winner',
    description: 'Recognized for exceptional work',
    icon: 'lucide:award',
    color: '#F2B706',
    gradient: 'from-yellow-400 to-yellow-600',
    rarity: 'epic',
    criteria: { manual_award: true }
  },
  'community_leader': {
    id: 'community_leader',
    name: 'Community Leader',
    description: 'Active PAAN community contributor',
    icon: 'lucide:users',
    color: '#6A4C93',
    gradient: 'from-purple-400 to-indigo-500',
    rarity: 'rare',
    criteria: { community_contributions: 10 }
  },
  'specialist': {
    id: 'specialist',
    name: 'Specialist',
    description: 'Expert in specific skill area',
    icon: 'lucide:target',
    color: '#172840',
    gradient: 'from-gray-600 to-slate-700',
    rarity: 'uncommon',
    criteria: { skill_proficiency: 5, years_experience: 5 }
  },
  'global_reach': {
    id: 'global_reach',
    name: 'Global Reach',
    description: 'Works with international clients',
    icon: 'lucide:globe',
    color: '#34B6A7',
    gradient: 'from-teal-400 to-emerald-500',
    rarity: 'rare',
    criteria: { international_clients: 5 }
  },
  'innovation_pioneer': {
    id: 'innovation_pioneer',
    name: 'Innovation Pioneer',
    description: 'Early adopter of new technologies',
    icon: 'lucide:zap',
    color: '#F25849',
    gradient: 'from-orange-400 to-red-500',
    rarity: 'epic',
    criteria: { innovation_score: 8 }
  },
  'mentor': {
    id: 'mentor',
    name: 'Mentor',
    description: 'Helps other creatives grow',
    icon: 'lucide:graduation-cap',
    color: '#6A4C93',
    gradient: 'from-purple-400 to-violet-500',
    rarity: 'rare',
    criteria: { mentorship_hours: 50 }
  }
};

// Badge rarity styling
const RARITY_STYLES = {
  common: {
    border: 'border-gray-300',
    glow: 'shadow-sm',
    animation: ''
  },
  uncommon: {
    border: 'border-green-300',
    glow: 'shadow-md shadow-green-100',
    animation: 'animate-pulse'
  },
  rare: {
    border: 'border-blue-300',
    glow: 'shadow-lg shadow-blue-100',
    animation: 'animate-pulse'
  },
  epic: {
    border: 'border-purple-300',
    glow: 'shadow-xl shadow-purple-100',
    animation: 'animate-bounce'
  }
};

// Individual badge component
const Badge = ({ 
  badge, 
  size = 'md', 
  showTooltip = true, 
  showName = false, 
  earned = true,
  earnedDate = null 
}) => {
  const badgeData = BADGE_DEFINITIONS[badge.id] || BADGE_DEFINITIONS[badge];
  if (!badgeData) return null;

  const rarityStyle = RARITY_STYLES[badgeData.rarity] || RARITY_STYLES.common;
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  };

  return (
    <div className="relative group">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`
          ${sizeClasses[size]} 
          ${rarityStyle.border} 
          ${rarityStyle.glow}
          ${earned ? 'opacity-100' : 'opacity-30 grayscale'}
          bg-gradient-to-br ${badgeData.gradient}
          rounded-full border-2 flex items-center justify-center
          cursor-pointer transition-all duration-200
          ${rarityStyle.animation}
        `}
      >
        <Icon 
          icon={badgeData.icon} 
          className={`${iconSizes[size]} text-white`}
        />
        
        {/* Rarity indicator for epic badges */}
        {badgeData.rarity === 'epic' && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border border-white animate-pulse" />
        )}
      </motion.div>

      {/* Badge name below */}
      {showName && (
        <p className="text-xs text-center mt-1 text-gray-600 font-medium">
          {badgeData.name}
        </p>
      )}

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
          <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap max-w-48">
            <div className="font-semibold">{badgeData.name}</div>
            <div className="text-gray-300 mt-1">{badgeData.description}</div>
            {earnedDate && (
              <div className="text-gray-400 mt-1 text-xs">
                Earned {new Date(earnedDate).toLocaleDateString()}
              </div>
            )}
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Badge collection/showcase component
const BadgeShowcase = ({ userBadges = [], size = 'md', maxDisplay = 6 }) => {
  const displayBadges = userBadges.slice(0, maxDisplay);
  const remainingCount = userBadges.length - maxDisplay;

  if (userBadges.length === 0) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <Icon icon="lucide:award" className="w-4 h-4" />
        <span className="text-sm">No badges earned yet</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {displayBadges.map((badge, index) => (
        <Badge
          key={badge.id || index}
          badge={badge}
          size={size}
          earned={badge.earned !== false}
          earnedDate={badge.earned_at}
        />
      ))}
      
      {remainingCount > 0 && (
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full border-2 border-gray-200">
          <span className="text-xs font-medium text-gray-600">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
};

// Progress tracker for badge criteria
const BadgeProgress = ({ badgeId, userStats = {} }) => {
  const badge = BADGE_DEFINITIONS[badgeId];
  if (!badge || !badge.criteria) return null;

  const calculateProgress = () => {
    const criteria = badge.criteria;
    let progress = 0;
    let total = 0;

    Object.keys(criteria).forEach(key => {
      total++;
      const required = criteria[key];
      const current = userStats[key] || 0;

      if (typeof required === 'boolean') {
        if (current === required) progress++;
      } else if (typeof required === 'number') {
        if (current >= required) progress++;
      }
    });

    return { progress, total, percentage: total > 0 ? (progress / total) * 100 : 0 };
  };

  const { progress, total, percentage } = calculateProgress();
  const isCompleted = progress === total;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge badge={badgeId} size="sm" showTooltip={false} earned={isCompleted} />
          <span className="text-sm font-medium text-gray-700">{badge.name}</span>
        </div>
        <span className="text-xs text-gray-500">{progress}/{total}</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            isCompleted 
              ? `bg-gradient-to-r ${badge.gradient}` 
              : 'bg-gray-400'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <p className="text-xs text-gray-600">{badge.description}</p>
    </div>
  );
};

// Badge grid for profile pages
const BadgeGrid = ({ userBadges = [], allBadges = false }) => {
  const badgesToShow = allBadges 
    ? Object.values(BADGE_DEFINITIONS)
    : userBadges;

  const earnedBadgeIds = userBadges.map(b => b.id);

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {badgesToShow.map((badge) => {
        const earned = allBadges ? earnedBadgeIds.includes(badge.id) : true;
        const earnedBadge = userBadges.find(b => b.id === badge.id);
        
        return (
          <div key={badge.id} className="text-center">
            <Badge
              badge={badge}
              size="lg"
              showName={true}
              earned={earned}
              earnedDate={earnedBadge?.earned_at}
            />
          </div>
        );
      })}
    </div>
  );
};

// Featured talent component
const FeaturedTalent = ({ profiles = [] }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Featured Talents</h3>
        <p className="text-gray-600">Exceptional creatives making waves across Africa</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <motion.div
            key={profile.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            {/* Featured badge */}
            <div className="relative">
              <img
                src={profile.cover_image_url || profile.avatar_url}
                alt={profile.full_name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  FEATURED
                </span>
              </div>
              <div className="absolute -bottom-6 left-4">
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  className="w-12 h-12 rounded-full border-4 border-white object-cover"
                />
              </div>
            </div>

            <div className="pt-8 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-gray-900">{profile.full_name}</h4>
                  <p className="text-sm text-gray-600">{profile.tagline}</p>
                </div>
                {profile.is_verified && (
                  <Badge badge="verified" size="sm" />
                )}
              </div>

              <div className="flex items-center space-x-1 mb-3">
                <Icon icon="lucide:map-pin" className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {profile.city_name}, {profile.country_name}
                </span>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center space-x-1">
                  <Icon icon="lucide:star" className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{profile.rating}</span>
                </div>
                <div className="text-gray-300">•</div>
                <span className="text-sm text-gray-600">{profile.rating_count} reviews</span>
              </div>

              <BadgeShowcase userBadges={profile.badges || []} size="sm" maxDisplay={4} />

              <div className="mt-4 pt-3 border-t border-gray-100">
                <button className="w-full bg-paan-blue text-white py-2 rounded-lg hover:bg-paan-blue/90 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Leaderboard component
const TalentLeaderboard = ({ profiles = [], category = 'rating' }) => {
  const categories = {
    rating: { label: 'Top Rated', icon: 'lucide:star', key: 'rating' },
    reviews: { label: 'Most Reviewed', icon: 'lucide:message-circle', key: 'rating_count' },
    views: { label: 'Most Viewed', icon: 'lucide:eye', key: 'profile_views' },
    badges: { label: 'Badge Collectors', icon: 'lucide:award', key: 'badges_count' }
  };

  const currentCategory = categories[category] || categories.rating;
  const sortedProfiles = [...profiles].sort((a, b) => b[currentCategory.key] - a[currentCategory.key]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
      <div className="flex items-center space-x-2 mb-4 md:mb-6">
        <Icon icon={currentCategory.icon} className="w-5 h-5 md:w-6 md:h-6 text-paan-blue" />
        <h3 className="text-lg md:text-xl font-bold text-gray-900">{currentCategory.label}</h3>
      </div>

      <div className="space-y-3 md:space-y-4">
        {sortedProfiles.slice(0, 10).map((profile, index) => (
          <div key={profile.id} className="flex items-center space-x-3 md:space-x-4 p-2 md:p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm ${
              index === 0 ? 'bg-yellow-100 text-yellow-800' :
              index === 1 ? 'bg-gray-100 text-gray-800' :
              index === 2 ? 'bg-orange-100 text-orange-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {index + 1}
            </div>

            <img
              src={profile.avatar_url}
              alt={profile.full_name}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm md:text-base truncate">{profile.full_name}</h4>
              <p className="text-xs md:text-sm text-gray-600 truncate">{profile.city_name}, {profile.country_name}</p>
            </div>

            <div className="text-right flex-shrink-0">
              <div className="font-bold text-gray-900 text-sm md:text-base">
                {currentCategory.key === 'rating' ? `${profile[currentCategory.key]}/5` : profile[currentCategory.key]}
              </div>
              <div className="hidden sm:block">
                <BadgeShowcase userBadges={profile.badges || []} size="sm" maxDisplay={3} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export {
  Badge,
  BadgeShowcase,
  BadgeProgress,
  BadgeGrid,
  FeaturedTalent,
  TalentLeaderboard,
  BADGE_DEFINITIONS
};
