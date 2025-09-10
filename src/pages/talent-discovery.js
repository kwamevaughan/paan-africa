import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';

// Components
import Header from '../layouts/header';
import Footer from '../layouts/footer';
import SEO from '../components/SEO';
import { FeaturedTalent, TalentLeaderboard } from '../components/BadgeSystem';

import MapStyles from '../components/MapStyles';

// Dynamically import Mapbox map to avoid SSR issues
const MapboxMap = dynamic(() => import('../components/MapboxMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-paan-blue border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  )
});

// Stats component
const StatsSection = () => {
  const stats = [
    { label: 'Talented Creatives', value: '2,500+', icon: 'mdi:account-group', color: 'text-paan-blue' },
    { label: 'Creative Agencies', value: '450+', icon: 'mdi:office-building', color: 'text-paan-yellow' },
    { label: 'African Countries', value: '54', icon: 'mdi:map', color: 'text-paan-green' },
    { label: 'Projects Completed', value: '12,000+', icon: 'mdi:briefcase', color: 'text-paan-red' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3 ${stat.color}`}>
            <Icon icon={stat.icon} className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

// Hero section
const HeroSection = ({ onExploreClick }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-paan-dark-blue via-paan-blue to-paan-green pt-16 sm:pt-18 lg:pt-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="/assets/images/africa-map.webp" 
          alt="Africa Map" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Discover Africa's
            <span className="block text-paan-yellow">Creative Powerhouse</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-blue-100"
          >
            Connect with 3,000+ verified creatives and agencies across 54 African countries. 
            Find the perfect talent for your next project or showcase your skills to global clients.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="https://membership.paan.africa/freelancers"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-paan-yellow text-paan-dark-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg inline-block"
            >
              Join the Network
            </a>
            <button
              onClick={onExploreClick}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Explore Talent Map
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Features section
const FeaturesSection = () => {
  const features = [
    {
      icon: 'mdi:map-marker',
      title: 'Geographic Discovery',
      description: 'Find talent by location with our interactive African map. Filter by country, city, or region.',
      color: 'bg-paan-blue'
    },
    {
      icon: 'mdi:magnify',
      title: 'Skill-Based Filtering',
      description: 'Search by specific skills, expertise levels, and service categories to find exact matches.',
      color: 'bg-paan-green'
    },
    {
      icon: 'mdi:shield-check',
      title: 'Verified Profiles',
      description: 'All profiles are manually reviewed and verified by our team for quality assurance.',
      color: 'bg-paan-yellow'
    },
    {
      icon: 'mdi:star',
      title: 'Rating System',
      description: 'Make informed decisions with our comprehensive rating and review system.',
      color: 'bg-paan-red'
    },
    {
      icon: 'mdi:trophy',
      title: 'Achievement Badges',
      description: 'Recognize excellence with our dynamic badge system that highlights top performers.',
      color: 'bg-paan-maroon'
    },
    {
      icon: 'mdi:earth',
      title: 'Global Reach',
      description: 'Connect African talent with global opportunities and vice versa.',
      color: 'bg-paan-purple'
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose PAAN Discovery Map?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The most comprehensive platform for discovering and connecting with African creative talent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon icon={feature.icon} className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Mock data for featured talents and leaderboard
const mockFeaturedTalents = [
  {
    id: '1',
    full_name: 'Kemi Adebayo',
    tagline: 'Brand Designer & Visual Storyteller',
    avatar_url: '/assets/images/user-1.webp',
    cover_image_url: '/assets/images/client-slider-img-1.webp',
    city_name: 'Lagos',
    country_name: 'Nigeria',
    rating: 4.9,
    rating_count: 45,
    is_verified: true,
    user_type: 'creative',
    badges: [
      { id: 'verified', earned_at: '2024-01-15' },
      { id: 'top_rated', earned_at: '2024-02-20' },
      { id: 'portfolio_master', earned_at: '2024-03-10' }
    ]
  },
  {
    id: '2',
    full_name: 'Ahmed Hassan',
    tagline: 'Motion Graphics Specialist',
    avatar_url: '/assets/images/user-2.webp',
    cover_image_url: '/assets/images/client-slider-img-2.webp',
    city_name: 'Cairo',
    country_name: 'Egypt',
    rating: 4.8,
    rating_count: 32,
    is_verified: true,
    user_type: 'creative',
    badges: [
      { id: 'verified', earned_at: '2024-01-20' },
      { id: 'rising_star', earned_at: '2024-02-15' }
    ]
  },
  {
    id: '3',
    full_name: 'Grace Mwangi',
    tagline: 'Content Strategist & Copywriter',
    avatar_url: '/assets/images/user-3.webp',
    cover_image_url: '/assets/images/client-slider-img-3.webp',
    city_name: 'Nairobi',
    country_name: 'Kenya',
    rating: 4.7,
    rating_count: 28,
    is_verified: true,
    user_type: 'creative',
    badges: [
      { id: 'verified', earned_at: '2024-02-01' },
      { id: 'client_favorite', earned_at: '2024-03-05' }
    ]
  },
  {
    id: '4',
    full_name: 'Liftup Agency',
    tagline: 'Elevating brands through creative excellence',
    avatar_url: '/assets/images/avatars/liftup-avatar.svg',
    cover_image_url: '/assets/images/certified-members/liftup/1.png',
    city_name: 'Cairo',
    country_name: 'Egypt',
    rating: 4.8,
    rating_count: 24,
    is_verified: true,
    user_type: 'agency',
    company_name: 'Liftup Agency',
    company_size: '25-50 employees',
    founded_year: 2018,
    badges: [
      { id: 'verified', earned_at: '2023-06-15' },
      { id: 'top_rated', earned_at: '2024-01-10' },
      { id: 'award_winner', earned_at: '2024-02-28' }
    ]
  },
  {
    id: '5',
    full_name: 'Aquila East Africa',
    tagline: 'Empowering brands across East Africa',
    avatar_url: '/assets/images/avatars/aquila-avatar.svg',
    cover_image_url: '/assets/images/certified-members/aquila/1.png',
    city_name: 'Nairobi',
    country_name: 'Kenya',
    rating: 4.9,
    rating_count: 18,
    is_verified: true,
    user_type: 'agency',
    company_name: 'Aquila East Africa',
    company_size: '10-25 employees',
    founded_year: 2020,
    badges: [
      { id: 'verified', earned_at: '2023-09-20' },
      { id: 'rising_star', earned_at: '2024-01-15' },
      { id: 'innovation_pioneer', earned_at: '2024-03-01' }
    ]
  }
];

// Main component
export default function TalentDiscoveryPage() {
  const [activeTab, setActiveTab] = useState('map');

  const scrollToMap = () => {
    document.getElementById('talent-map')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="Talent Discovery Map - Find African Creative Professionals | PAAN"
        description="Discover 3,000+ verified creative professionals and agencies across 54 African countries. Connect with top talent for your next project on PAAN's interactive talent map."
        keywords="African creatives, creative agencies, talent discovery, creative professionals, design talent, marketing agencies, African designers"
        image="https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296"
      />

      <MapStyles />
      
      <div className="relative min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <HeroSection 
          onExploreClick={scrollToMap}
        />

        {/* Stats Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <StatsSection />
          </div>
        </div>

        {/* Features Section */}
        <FeaturesSection />

        {/* Main Content Tabs */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore African Creative Talent
              </h2>
              <p className="text-xl text-gray-600">
                Discover, connect, and collaborate with Africa's best creatives
              </p>
            </div>

                         {/* Tab Navigation */}
             <div className="flex justify-center mb-8">
               <div className="bg-gray-100 p-1 rounded-lg w-full max-w-md overflow-x-auto">
                 <div className="flex space-x-1">
                   {[
                     { id: 'map', label: 'Talent Map', icon: 'mdi:map' },
                     { id: 'featured', label: 'Featured', icon: 'mdi:star' },
                     { id: 'leaderboard', label: 'Top Rated', icon: 'mdi:trophy' }
                   ].map(tab => (
                     <button
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id)}
                       className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 rounded-md transition-colors whitespace-nowrap text-sm sm:text-base ${
                         activeTab === tab.id
                           ? 'bg-white text-paan-blue shadow-sm'
                           : 'text-gray-600 hover:text-gray-900'
                       }`}
                     >
                       <Icon icon={tab.icon} className="w-4 h-4 flex-shrink-0" />
                       <span className="font-medium">{tab.label}</span>
                     </button>
                   ))}
                 </div>
               </div>
             </div>

            {/* Tab Content */}
            <div className="min-h-[600px]">
              {activeTab === 'map' && (
                <div id="talent-map" className="space-y-8">
                  <div className="text-center">
                    <p className="text-gray-600 mb-6">
                      Use the interactive map below to discover talent by location and skills. 
                      Click on pins to view profiles and contact creatives directly.
                    </p>
                  </div>
                  <MapboxMap />
                </div>
              )}

              {activeTab === 'featured' && (
                <FeaturedTalent profiles={mockFeaturedTalents} />
              )}

                             {activeTab === 'leaderboard' && (
                 <div className="space-y-6 md:space-y-8">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                     <TalentLeaderboard profiles={mockFeaturedTalents} category="rating" />
                     <TalentLeaderboard profiles={mockFeaturedTalents} category="reviews" />
                   </div>
                   {/* Additional leaderboards for better content variety */}
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                     <TalentLeaderboard profiles={mockFeaturedTalents.map(p => ({...p, profile_views: Math.floor(Math.random() * 2000) + 500, badges_count: p.badges?.length || 0}))} category="views" />
                     <TalentLeaderboard profiles={mockFeaturedTalents.map(p => ({...p, badges_count: p.badges?.length || 0}))} category="badges" />
                   </div>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-paan-blue to-paan-green">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Join Africa's Creative Network?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Showcase your talent, connect with global clients, and be part of Africa's creative revolution.
              </p>
              <a
                href="https://membership.paan.africa/freelancers"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-paan-yellow text-paan-dark-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg inline-block"
              >
                Join PAAN Discovery
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
