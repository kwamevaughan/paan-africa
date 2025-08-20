import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoicGFhbi1hZnJpY2EiLCJhIjoiY2x4eHh4eHh4eHh4eHh4In0.example';

// Fallback map token for development
const FALLBACK_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

const MapboxMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [profiles, setProfiles] = useState([]);
  const [filters, setFilters] = useState({
    userType: 'all',
    skills: [],
    countries: [],
    isVerified: false,
    isFeatured: false
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const maxRetries = 3;

  // Mock data (replace with API call)
  useEffect(() => {
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
        skills: ['Brand Identity', 'Digital Marketing Strategy', 'Logo Design'],
        rating: 4.8,
        rating_count: 24,
        is_verified: true,
        is_featured: true,
        company_name: 'Liftup Agency',
        company_size: '25-50 employees',
        founded_year: 2018,
        profile: 'https://paan.africa/certified-agencies/liftup'
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
        skills: ['Digital Marketing Strategy', 'Social Media Marketing', 'Content Strategy'],
        rating: 4.9,
        rating_count: 18,
        is_verified: true,
        is_featured: true,
        company_name: 'Aquila East Africa',
        company_size: '10-25 employees',
        founded_year: 2020,
        profile: 'https://paan.africa/certified-agencies/aquila'
      }
    ];
    setProfiles(mockProfiles);
  }, []);

  // Handle component mounting
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted || map.current || !mapContainer.current) return; // Initialize map only once

    console.log('Initializing Mapbox map...');
    console.log('Mapbox token:', mapboxgl.accessToken);

    // Check network connectivity
    if (!navigator.onLine) {
      console.error('No internet connection');
      setMapLoading(false);
      setMapError(true);
      return;
    }

    // Use fallback token if the main token is not available
    const token = (!mapboxgl.accessToken || mapboxgl.accessToken.includes('example')) 
      ? FALLBACK_TOKEN 
      : mapboxgl.accessToken;

    console.log('Using token:', token);

    if (!token) {
      console.error('No Mapbox token available');
      setMapLoading(false);
      setMapError(true);
      return;
    }

    // Set a timeout for map loading
    const mapTimeout = setTimeout(() => {
      console.error('Map loading timeout');
      setMapLoading(false);
      setMapError(true);
    }, 10000); // 10 second timeout

    try {
      console.log('Creating Mapbox map instance...');
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12', // More reliable style
        center: [20, 0], // Centered on Africa
        zoom: 3,
        attributionControl: false,
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: false
      });

      console.log('Map instance created, adding controls...');

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add fullscreen control
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      // Custom map style for PAAN branding
      map.current.on('load', () => {
        console.log('Map loaded successfully!');
        clearTimeout(mapTimeout);
        setMapLoading(false);
        // Add custom sources and layers here if needed
        addMarkers();
      });

      map.current.on('error', (error) => {
        console.error('Mapbox error:', error);
        clearTimeout(mapTimeout);
        setMapLoading(false);
        setMapError(true);
      });

      map.current.on('styleimagemissing', (e) => {
        console.warn('Style image missing:', e.id);
      });

    } catch (error) {
      console.error('Error initializing Mapbox map:', error);
      clearTimeout(mapTimeout);
      setMapLoading(false);
      setMapError(true);
    }

    return () => {
      clearTimeout(mapTimeout);
      if (map.current && !isMounted) {
        console.log('Cleaning up map instance...');
        map.current.remove();
      }
    };
  }, [isMounted, retryCount]);

  const addMarkers = () => {
    if (!map.current || !profiles.length) return;

    console.log('Adding markers for', profiles.length, 'profiles');

    profiles.forEach(profile => {
      // Create custom marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'custom-marker';
      
      // Make markers more visible with solid colors and proper sizing
      const isAgency = profile.user_type === 'agency';
      const markerSize = isAgency ? '56px' : '48px';
      const iconSize = isAgency ? '28px' : '24px';
      
      markerEl.style.width = markerSize;
      markerEl.style.height = markerSize;
      markerEl.style.borderRadius = '50%';
      markerEl.style.border = '4px solid white';
      markerEl.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)';
      markerEl.style.background = isAgency 
        ? '#F2B706' // Solid yellow for agencies
        : '#3B82F6'; // Solid blue for creatives
      markerEl.style.display = 'flex';
      markerEl.style.alignItems = 'center';
      markerEl.style.justifyContent = 'center';
      markerEl.style.cursor = 'pointer';
      markerEl.style.position = 'relative';
      markerEl.style.transition = 'all 0.2s ease';
      markerEl.style.zIndex = isAgency ? '1000' : '999';

      // Add hover effects for better visibility
      markerEl.addEventListener('mouseenter', () => {
        markerEl.style.boxShadow = '0 6px 25px rgba(0,0,0,0.4), 0 3px 12px rgba(0,0,0,0.3)';
      });

      markerEl.addEventListener('mouseleave', () => {
        markerEl.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)';
      });

      // Add icon
      const icon = document.createElement('div');
      icon.style.display = 'flex';
      icon.style.alignItems = 'center';
      icon.style.justifyContent = 'center';
      icon.style.width = iconSize;
      icon.style.height = iconSize;
      
      // Simple SVG icons
      if (isAgency) {
        icon.innerHTML = `
          <svg width="${iconSize}" height="${iconSize}" fill="#172840" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9ZM19 9H14V4H5V21H19V9Z"/>
          </svg>
        `;
      } else {
        icon.innerHTML = `
          <svg width="${iconSize}" height="${iconSize}" fill="#172840" viewBox="0 0 24 24">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
          </svg>
        `;
      }
      markerEl.appendChild(icon);

      // Add verification badge
      if (profile.is_verified) {
        const verifiedBadge = document.createElement('div');
        verifiedBadge.style.position = 'absolute';
        verifiedBadge.style.top = '-6px';
        verifiedBadge.style.right = '-6px';
        verifiedBadge.style.width = '20px';
        verifiedBadge.style.height = '20px';
        verifiedBadge.style.backgroundColor = '#10B981';
        verifiedBadge.style.borderRadius = '50%';
        verifiedBadge.style.border = '3px solid white';
        verifiedBadge.style.display = 'flex';
        verifiedBadge.style.alignItems = 'center';
        verifiedBadge.style.justifyContent = 'center';
        verifiedBadge.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.4)';
        verifiedBadge.innerHTML = `
          <svg width="10" height="10" fill="white" viewBox="0 0 20 20">
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
          </svg>
        `;
        markerEl.appendChild(verifiedBadge);
      }

      // Add featured badge
      if (profile.is_featured) {
        const featuredBadge = document.createElement('div');
        featuredBadge.style.position = 'absolute';
        featuredBadge.style.bottom = '-6px';
        featuredBadge.style.right = '-6px';
        featuredBadge.style.width = '20px';
        featuredBadge.style.height = '20px';
        featuredBadge.style.backgroundColor = '#F59E0B';
        featuredBadge.style.borderRadius = '50%';
        featuredBadge.style.border = '3px solid white';
        featuredBadge.style.display = 'flex';
        featuredBadge.style.alignItems = 'center';
        featuredBadge.style.justifyContent = 'center';
        featuredBadge.style.boxShadow = '0 2px 8px rgba(245, 158, 11, 0.4)';
        featuredBadge.innerHTML = `
          <svg width="10" height="10" fill="white" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        `;
        markerEl.appendChild(featuredBadge);
      }

      // simple popup with minimal content
      const popup = new mapboxgl.Popup({
        offset: 30,
        closeButton: true,
        className: 'custom-popup',
        maxWidth: '300px'
      }).setHTML(`
        <div class="p-4 z-20">
          <div class="flex items-center space-x-3 mb-3">
            <img src="${profile.avatar_url}" alt="${profile.full_name}" class="w-12 h-12 rounded-full object-cover" />
            <div class="flex-1">
              <h4 class="font-bold text-gray-900 text-sm">${profile.full_name}</h4>
              <div class="flex items-center space-x-2 mt-1">
                ${profile.user_type === 'agency' ? '<span class="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">Agency</span>' : '<span class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Creative</span>'}
                ${profile.is_verified ? '<span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">✓ Verified</span>' : ''}
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-600 mb-3">${profile.tagline}</p>
          <div class="flex items-center space-x-2 mb-3 text-sm text-gray-600">
            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
            </svg>
            <span>${profile.city_name}, ${profile.country_name}</span>
          </div>
          ${profile.rating > 0 ? `
            <div class="flex items-center space-x-2 mb-3">
              <div class="flex items-center">
                ${Array.from({ length: 5 }, (_, i) => `
                  <svg class="w-4 h-4 ${i < Math.floor(profile.rating) ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                `).join('')}
              </div>
              <span class="text-sm font-medium">${profile.rating}</span>
            </div>
          ` : ''}
          <div class="flex space-x-2">
            <a href="${profile.user_type === 'agency' ? profile.profile : '#'}" target="_blank" rel="noopener noreferrer" class="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors text-center">
              ${profile.user_type === 'agency' ? 'View Profile' : 'View Profile'}
            </a>
            <button class="flex-1 border border-blue-600 text-blue-600 py-2 px-3 rounded-lg text-sm hover:bg-blue-50 transition-colors">Contact</button>
          </div>
        </div>
      `);

      // Add marker to map with proper positioning
      const marker = new mapboxgl.Marker({
        element: markerEl,
        anchor: 'center'
      })
      .setLngLat([profile.longitude, profile.latitude])
      .setPopup(popup)
      .addTo(map.current);

      // Store marker reference for potential cleanup
      if (!map.current.markers) map.current.markers = [];
      map.current.markers.push(marker);
    });
  };

  const retryMapLoad = () => {
    if (retryCount < maxRetries) {
      console.log(`Retrying map load... Attempt ${retryCount + 1}/${maxRetries}`);
      setRetryCount(prev => prev + 1);
      setMapError(false);
      setMapLoading(true);
      
      // Clean up existing map
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      
      // Retry after a short delay
      setTimeout(() => {
        // This will trigger the useEffect again
        setMapLoading(true);
      }, 1000);
    } else {
      console.error('Max retries reached');
      setMapError(true);
      setMapLoading(false);
    }
  };

  const filteredProfiles = profiles.filter(profile => {
    if (filters.userType !== 'all' && profile.user_type !== filters.userType) return false;
    if (filters.isVerified && !profile.is_verified) return false;
    if (filters.isFeatured && !profile.is_featured) return false;
    if (filters.skills.length > 0 && !filters.skills.some(skill => profile.skills.includes(skill))) return false;
    if (filters.countries.length > 0 && !filters.countries.includes(profile.country_name)) return false;
    return true;
  });

  // Check if Mapbox token is available




  return (
    <div className="relative w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      {/* Static Map Fallback */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/images/africa-map.webp" 
          alt="Africa Map Background" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="w-full h-full relative z-10" 
        style={{ 
          minHeight: '600px',
          position: 'relative',
          zIndex: 1
        }}
      />
      
      {/* Loading Overlay */}
      {mapLoading && !mapError && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[10]">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-paan-blue border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading map...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {mapError && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-[1000]">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:map-marker-alert" className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Map Unavailable</h3>
            <p className="text-gray-600 mb-4">
              We're experiencing issues loading the map. This might be due to network connectivity or Mapbox service issues.
            </p>
            {retryCount < maxRetries ? (
              <div className="space-y-3">
                <button
                  onClick={retryMapLoad}
                  className="bg-paan-red text-white px-6 py-2 rounded-lg hover:bg-paan-red/90 transition-colors mr-2"
                >
                  Try Again ({retryCount + 1}/{maxRetries})
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Refresh Page
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  Maximum retry attempts reached. You can still explore talent using the static map view.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-paan-red text-white px-6 py-2 rounded-lg hover:bg-paan-red/90 transition-colors"
                >
                  Refresh Page
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="absolute top-4 left-4 bg-white shadow-lg rounded-lg p-3 hover:shadow-xl transition-shadow z-[10]"
      >
        <Icon icon="mdi:filter" className="w-5 h-5 text-gray-700" />
      </button>

      {/* Results Counter */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg z-[10]">
        <span className="text-sm font-medium text-gray-700">
          {filteredProfiles.length} talents found
        </span>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-[10] max-w-xs">
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">Legend</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
            <div>
              <span className="text-xs font-semibold text-gray-900">Creative</span>
              <p className="text-xs text-gray-500">Individual professionals</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-yellow-500 border-2 border-white shadow-md"></div>
            <div>
              <span className="text-xs font-semibold text-gray-900">Agency</span>
              <p className="text-xs text-gray-500">Creative agencies & studios</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
            <div>
              <span className="text-xs font-semibold text-gray-900">Verified</span>
              <p className="text-xs text-gray-500">PAAN verified profiles</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-white shadow-md"></div>
            <div>
              <span className="text-xs font-semibold text-gray-900">Featured</span>
              <p className="text-xs text-gray-500">Highlighted profiles</p>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            <strong>Tip:</strong> Hover over markers for details, click to view profile
          </p>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute top-0 left-0 h-full w-80 bg-white shadow-xl z-[1002] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Icon icon="mdi:close" className="w-5 h-5" />
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
                        className="text-blue-600 focus:ring-blue-600"
                      />
                      <span className="capitalize text-gray-700">{type === 'all' ? 'All' : type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Filters */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Status</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.isVerified}
                      onChange={(e) => setFilters(prev => ({ ...prev, isVerified: e.target.checked }))}
                      className="text-green-600 focus:ring-green-600"
                    />
                    <span className="text-gray-700">Verified Only</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.isFeatured}
                      onChange={(e) => setFilters(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      className="text-yellow-600 focus:ring-yellow-600"
                    />
                    <span className="text-gray-700">Featured Only</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => setFilters({
                  userType: 'all',
                  skills: [],
                  countries: [],
                  isVerified: false,
                  isFeatured: false
                })}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay when filter is open */}
      {isFilterOpen && (
        <div
          className="absolute inset-0 bg-black/50 z-[1001]"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default MapboxMap;
