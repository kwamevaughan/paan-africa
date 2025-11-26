import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      user_type = 'all',
      skills = '',
      countries = '',
      is_verified = false,
      is_featured = false,
      search = '',
      limit = 50,
      offset = 0,
      sort_by = 'rating',
      sort_order = 'desc'
    } = req.query;

    // Build the base query using the profile_search_view
    let query = supabase
      .from('profile_search_view')
      .select(`
        id,
        full_name,
        username,
        user_type,
        tagline,
        bio,
        avatar_url,
        is_verified,
        is_featured,
        rating,
        rating_count,
        city_name,
        latitude,
        longitude,
        country_name,
        country_code,
        country_flag,
        region,
        skills,
        skill_categories,
        created_at,
        last_active
      `);

    // Apply filters
    if (user_type !== 'all') {
      query = query.eq('user_type', user_type);
    }

    if (is_verified === 'true') {
      query = query.eq('is_verified', true);
    }

    if (is_featured === 'true') {
      query = query.eq('is_featured', true);
    }

    // Text search in name, tagline, or bio
    if (search && search.trim()) {
      query = query.or(`full_name.ilike.%${search}%,tagline.ilike.%${search}%,bio.ilike.%${search}%`);
    }

    // Skills filter
    if (skills && skills.trim()) {
      const skillList = skills.split(',').map(s => s.trim()).filter(Boolean);
      if (skillList.length > 0) {
        // Use overlap operator to check if any of the skills match
        query = query.overlaps('skills', skillList);
      }
    }

    // Countries filter
    if (countries && countries.trim()) {
      const countryList = countries.split(',').map(c => c.trim()).filter(Boolean);
      if (countryList.length > 0) {
        query = query.in('country_name', countryList);
      }
    }

    // Sorting
    const validSortFields = ['rating', 'rating_count', 'created_at', 'last_active', 'full_name'];
    const sortField = validSortFields.includes(sort_by) ? sort_by : 'rating';
    const sortDirection = sort_order === 'asc' ? 'asc' : 'desc';
    
    query = query.order(sortField, { ascending: sortDirection === 'asc' });

    // Pagination
    query = query.range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    const { data: profiles, error, count } = await query;

    if (error) {
      console.error('Search error:', error);
      return res.status(500).json({ error: 'Failed to search profiles' });
    }

    // Get additional data for each profile (badges, portfolio count)
    const profileIds = profiles.map(p => p.id);
    
    // Get badges for all profiles
    const { data: badges } = await supabase
      .from('profile_badges')
      .select(`
        profile_id,
        badge_id,
        earned_at,
        badges (
          name,
          description,
          icon,
          color
        )
      `)
      .in('profile_id', profileIds)
      .eq('is_visible', true);

    // Get portfolio counts
    const { data: portfolioCounts } = await supabase
      .from('portfolio_items')
      .select('profile_id')
      .in('profile_id', profileIds)
      .eq('is_public', true);

    // Organize badges by profile
    const badgesByProfile = {};
    badges?.forEach(badge => {
      if (!badgesByProfile[badge.profile_id]) {
        badgesByProfile[badge.profile_id] = [];
      }
      badgesByProfile[badge.profile_id].push({
        id: badge.badge_id,
        name: badge.badges.name,
        description: badge.badges.description,
        icon: badge.badges.icon,
        color: badge.badges.color,
        earned_at: badge.earned_at
      });
    });

    // Count portfolios by profile
    const portfolioCountsByProfile = {};
    portfolioCounts?.forEach(item => {
      portfolioCountsByProfile[item.profile_id] = (portfolioCountsByProfile[item.profile_id] || 0) + 1;
    });

    // Enhance profiles with additional data
    const enhancedProfiles = profiles.map(profile => ({
      ...profile,
      badges: badgesByProfile[profile.id] || [],
      portfolio_count: portfolioCountsByProfile[profile.id] || 0
    }));

    return res.status(200).json({
      success: true,
      data: enhancedProfiles,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: count
      },
      filters: {
        user_type,
        skills: skills ? skills.split(',').map(s => s.trim()) : [],
        countries: countries ? countries.split(',').map(c => c.trim()) : [],
        is_verified: is_verified === 'true',
        is_featured: is_featured === 'true',
        search
      }
    });

  } catch (error) {
    console.error('Search API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Additional endpoint for getting search suggestions
export async function getSearchSuggestions(req, res) {
  try {
    const { type = 'skills', query = '' } = req.query;

    if (type === 'skills') {
      const { data: skills } = await supabase
        .from('skills')
        .select('name')
        .ilike('name', `%${query}%`)
        .limit(10);

      return res.status(200).json({
        success: true,
        suggestions: skills?.map(s => s.name) || []
      });
    }

    if (type === 'countries') {
      const { data: countries } = await supabase
        .from('countries')
        .select('name')
        .ilike('name', `%${query}%`)
        .limit(10);

      return res.status(200).json({
        success: true,
        suggestions: countries?.map(c => c.name) || []
      });
    }

    return res.status(400).json({ error: 'Invalid suggestion type' });

  } catch (error) {
    console.error('Suggestions API error:', error);
    return res.status(500).json({ error: 'Failed to get suggestions' });
  }
}
