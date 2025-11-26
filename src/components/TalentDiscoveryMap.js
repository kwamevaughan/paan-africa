import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Custom hook for map data
const useMapData = () => {
  const [profiles, setProfiles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from Supabase
    const fetchData = async () => {
      try {
        // This would be replaced with actual Supabase calls
        const mockProfiles = [
          {
            id: '1',
            full_name: 'Kemi Adebayo',
            user_type: 'creative',
            tagline: 'Brand Designer & Visual Storyteller',
            avatar_url: '/assets/images/user-1.webp',
            city_name: 'Lagos',
            country_name: 'Nigeria',
            latitude: 6.5244,
            longitude: 3.3792,
            skills: ['Logo Design', 'Brand Identity', 'UI/UX Design'],
            rating: 4.8,
            rating_count: 23,
            is_verified: true,
            is_featured: true
          },
          {
            id: '2',
            full_name: 'Liftup Agency',
            user_type: 'agency',
            tagline: 'Elevating brands through creative excellence',
            avatar_url: '/assets/images/avatars/liftup-avatar.svg',
            city_name: 'Cairo',
            country_name: 'Egypt',
            latitude: 30.0444,
            longitude: 31.2357,
            skills: ['Brand Identity', 'Digital Marketing Strategy', 'Logo Design', 'Social Media Marketing', 'UI/UX Design', 'Content Strategy'],
            rating: 4.8,
            rating_count: 24,
            is_verified: true,
            is_featured: true,
            company_name: 'Liftup Agency',
            company_size: '25-50 employees',
            founded_year: 2018
          },
          {
            id: '3',
            full_name: 'Aquila East Africa',
            user_type: 'agency',
            tagline: 'Empowering brands across East Africa',
            avatar_url: '/assets/images/avatars/aquila-avatar.svg',
            city_name: 'Nairobi',
            country_name: 'Kenya',
            latitude: -1.2921,
            longitude: 36.8219,
            skills: ['Digital Marketing Strategy', 'Social Media Marketing', 'Content Strategy', 'SEO', 'PPC Advertising', 'Marketing Analytics'],
            rating: 4.9,
            rating_count: 18,
            is_verified: true,
            is_featured: true,
            company_name: 'Aquila East Africa',
            company_size: '10-25 employees',
            founded_year: 2020
          },
          {
            id: '4',
            full_name: 'Ahmed Hassan',
            user_type: 'creative',
            tagline: 'Motion Graphics & Video Editor',
            avatar_url: '/assets/images/user-3.webp',
            city_name: 'Cairo',
            country_name: 'Egypt',
            latitude: 30.0444,
            longitude: 31.2357,
            skills: ['Motion Graphics', 'Video Editing', '2D Animation'],
            rating: 4.7,
            rating_count: 18,
            is_verified: false,
            is_featured: false
          },
          {
            id: '5',
            full_name: 'Grace Mwangi',
            user_type: 'creative',
            tagline: 'Content Strategist & Copywriter',
            avatar_url: '/assets/images/user-4.webp',
            city_name: 'Nairobi',
            country_name: 'Kenya',
            latitude: -1.2921,
            longitude: 36.8219,
            skills: ['Copywriting', 'Content Strategy', 'Social Media Content'],
            rating: 4.6,
            rating_count: 32,
            is_verified: true,
            is_featured: true
          }
        ];

        const mockSkills = [
          'Logo Design', 'Brand Identity', 'UI/UX Design', 'Web Design',
          'Digital Marketing Strategy', 'Social Media Marketing', 'SEO',
          'Motion Graphics', 'Video Editing', '2D Animation',
          'Copywriting', 'Content Strategy', 'Social Media Content',
          'Web Development', 'Mobile App Development', 'Brand Strategy',
          'PPC Advertising', 'Marketing Analytics'
        ];

        const mockCountries = [
          { name: 'Nigeria', code: 'NGA' },
          { name: 'South Africa', code: 'ZAF' },
          { name: 'Kenya', code: 'KEN' },
          { name: 'Ghana', code: 'GHA' },
          { name: 'Egypt', code: 'EGY' },
          { name: 'Morocco', code: 'MAR' }
        ];

        setProfiles(mockProfiles);
        setSkills(mockSkills);
        setCountries(mockCountries);
      } catch (error) {
        console.error('Error fetching map data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { profiles, skills, countries, loading };
};

// Filter panel component
const FilterPanel = ({ filters, setFilters, skills, countries, isOpen, setIsOpen }) => {
  const handleSkillToggle = (skill) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleCountryToggle = (country) => {
    setFilters(prev => ({
      ...prev,
      countries: prev.countries.includes(country)
        ? prev.countries.filter(c => c !== country)
        : [...prev.countries, country]
    }));
  };

  const clearFilters = () => {
    setFilters({
      userType: 'all',
      skills: [],
      countries: [],
      isVerified: false,
      isFeatured: false
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 w-80 h-full bg-white shadow-2xl z-[1000] overflow-y-auto"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Filter Talents</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon icon="lucide:x" className="w-5 h-5" />
              </button>
            </div>

            {/* User Type Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">User Type</h4>
              <div className="space-y-2">
                {['all', 'creative', 'agency'].map(type => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value={type}
                      checked={filters.userType === type}
                      onChange={(e) => setFilters(prev => ({ ...prev, userType: e.target.value }))}
                      className="text-paan-blue focus:ring-paan-blue"
                    />
                    <span className="capitalize text-gray-700">{type === 'all' ? 'All' : type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Verification Filters */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Status</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.isVerified}
                    onChange={(e) => setFilters(prev => ({ ...prev, isVerified: e.target.checked }))}
                    className="text-paan-green focus:ring-paan-green"
                  />
                  <span className="text-gray-700">Verified Only</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.isFeatured}
                    onChange={(e) => setFilters(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="text-paan-yellow focus:ring-paan-yellow"
                  />
                  <span className="text-gray-700">Featured Only</span>
                </label>
              </div>
            </div>

            {/* Skills Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {skills.map(skill => (
                  <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.skills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="text-paan-blue focus:ring-paan-blue"
                    />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Countries Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Countries</h4>
              <div className="space-y-2">
                {countries.map(country => (
                  <label key={country.code} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.countries.includes(country.name)}
                      onChange={() => handleCountryToggle(country.name)}
                      className="text-paan-blue focus:ring-paan-blue"
                    />
                    <span className="text-sm text-gray-700">{country.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Profile card component for popup
const ProfileCard = ({ profile }) => {
  return (
    <div className="p-4 min-w-[300px]">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={profile.avatar_url}
            alt={profile.full_name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {profile.is_verified && (
            <div className="absolute -top-1 -right-1 bg-paan-green text-white rounded-full p-1">
              <Icon icon="lucide:check" className="w-3 h-3" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-bold text-gray-900">{profile.full_name}</h4>
            {profile.user_type === 'agency' && (
              <span className="bg-paan-yellow text-white text-xs px-2 py-1 rounded-full">
                Agency
              </span>
            )}
            {profile.is_featured && (
              <span className="bg-paan-green text-white text-xs px-2 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-2">{profile.tagline}</p>
          
          {profile.user_type === 'agency' && profile.company_size && (
            <div className="flex items-center space-x-1 mb-2">
              <Icon icon="lucide:building" className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{profile.company_size} • Founded {profile.founded_year}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-1 mb-3">
            <Icon icon="lucide:map-pin" className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{profile.city_name}, {profile.country_name}</span>
          </div>
          
          {profile.rating > 0 && (
            <div className="flex items-center space-x-1 mb-3">
              <Icon icon="lucide:star" className="w-4 h-4 text-paan-yellow fill-current" />
              <span className="text-sm font-medium">{profile.rating}</span>
              <span className="text-sm text-gray-500">({profile.rating_count} reviews)</span>
            </div>
          )}
          
          <div className="flex flex-wrap gap-1 mb-3">
            {profile.skills.slice(0, 3).map(skill => (
              <span
                key={skill}
                className="bg-paan-blue/10 text-paan-blue text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
            {profile.skills.length > 3 && (
              <span className="text-xs text-gray-500">+{profile.skills.length - 3} more</span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button className="flex-1 bg-paan-blue text-white py-2 px-3 rounded-lg text-sm hover:bg-paan-blue/90 transition-colors">
              View Profile
            </button>
            <button className="flex-1 border border-paan-blue text-paan-blue py-2 px-3 rounded-lg text-sm hover:bg-paan-blue/10 transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom marker icons
const createCustomIcon = (userType, isVerified, isFeatured) => {
  if (typeof window === 'undefined') return null;
  
  const L = require('leaflet');
  
  const iconColor = userType === 'agency' ? '#F2B706' : '#84C1D9';
  const iconSize = userType === 'agency' ? 'w-12 h-12' : 'w-10 h-10';
  const iconHtml = `
    <div class="relative">
      <div class="${iconSize} rounded-full border-4 border-white shadow-lg flex items-center justify-center" style="background-color: ${iconColor}">
        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          ${userType === 'agency' 
            ? '<path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"/>'
            : '<path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>'
          }
        </svg>
      </div>
      ${isVerified ? '<div class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"><svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg></div>' : ''}
      ${isFeatured ? '<div class="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center"><svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg></div>' : ''}
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: userType === 'agency' ? [48, 48] : [40, 40],
    iconAnchor: userType === 'agency' ? [24, 48] : [20, 40],
    popupAnchor: [0, -40],
    properties: {
      'data-agency': userType === 'agency' ? 'true' : 'false'
    }
  });
};

// Main map component
const TalentDiscoveryMap = () => {
  const { profiles, skills, countries, loading } = useMapData();
  const [filters, setFilters] = useState({
    userType: 'all',
    skills: [],
    countries: [],
    isVerified: false,
    isFeatured: false
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Filter profiles based on current filters
  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile => {
      // User type filter
      if (filters.userType !== 'all' && profile.user_type !== filters.userType) {
        return false;
      }

      // Skills filter
      if (filters.skills.length > 0) {
        const hasMatchingSkill = filters.skills.some(skill => 
          profile.skills.includes(skill)
        );
        if (!hasMatchingSkill) return false;
      }

      // Countries filter
      if (filters.countries.length > 0 && !filters.countries.includes(profile.country_name)) {
        return false;
      }

      // Verification filter
      if (filters.isVerified && !profile.is_verified) {
        return false;
      }

      // Featured filter
      if (filters.isFeatured && !profile.is_featured) {
        return false;
      }

      return true;
    });
  }, [profiles, filters]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-paan-blue border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading talent map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      {/* Map Container */}
      <div className="w-full h-full">
        <MapContainer
          center={[0, 20]} // Centered on Africa
          zoom={3}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {filteredProfiles.map(profile => (
            <Marker
              key={profile.id}
              position={[profile.latitude, profile.longitude]}
              icon={createCustomIcon(profile.user_type, profile.is_verified, profile.is_featured)}
            >
              <Popup>
                <ProfileCard profile={profile} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="absolute top-4 left-4 bg-white shadow-lg rounded-lg p-3 hover:shadow-xl transition-shadow z-[1001]"
      >
        <Icon icon="lucide:filter" className="w-5 h-5 text-gray-700" />
      </button>

      {/* Results Counter */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg z-[1001]">
        <span className="text-sm font-medium text-gray-700">
          {filteredProfiles.length} talents found
        </span>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-[1001] max-w-xs">
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-paan-blue border-2 border-white shadow-sm"></div>
            <span className="text-xs text-gray-700">Creative</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-paan-yellow border-2 border-white shadow-sm"></div>
            <span className="text-xs text-gray-700">Agency</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500 border border-white"></div>
            <span className="text-xs text-gray-700">Verified</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 border border-white"></div>
            <span className="text-xs text-gray-700">Featured</span>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        skills={skills}
        countries={countries}
        isOpen={isFilterOpen}
        setIsOpen={setIsFilterOpen}
      />

      {/* Overlay when filter is open */}
      {isFilterOpen && (
        <div
          className="absolute inset-0 bg-black/50 z-[999]"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default TalentDiscoveryMap;
