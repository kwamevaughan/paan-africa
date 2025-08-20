import { supabase } from './supabase';

// API configuration
const API_CONFIG = {
  behance: {
    baseUrl: 'https://api.behance.net/v2',
    apiKey: process.env.BEHANCE_API_KEY,
    rateLimit: 1000,
  },
  instagram: {
    baseUrl: 'https://graph.instagram.com',
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    rateLimit: 200,
  },
  tiktok: {
    baseUrl: 'https://open.tiktokapis.com',
    clientKey: process.env.TIKTOK_CLIENT_KEY,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET,
    rateLimit: 100,
  },
  twitter: {
    baseUrl: 'https://api.twitter.com/2',
    bearerToken: process.env.TWITTER_BEARER_TOKEN,
    rateLimit: 300,
  },
  news: {
    adweek: {
      baseUrl: 'https://www.adweek.com/api',
      apiKey: process.env.ADWEEK_API_KEY,
    },
  },
};

// Rate limiting utility
class RateLimiter {
  constructor(limit, windowMs = 3600000) { // 1 hour default
    this.limit = limit;
    this.windowMs = windowMs;
    this.requests = [];
  }

  async checkLimit() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    if (this.requests.length >= this.limit) {
      const oldestRequest = this.requests[0];
      const waitTime = this.windowMs - (now - oldestRequest);
      throw new Error(`Rate limit exceeded. Try again in ${Math.ceil(waitTime / 1000)} seconds.`);
    }
    
    this.requests.push(now);
    return true;
  }
}

// Initialize rate limiters
const rateLimiters = {
  behance: new RateLimiter(API_CONFIG.behance.rateLimit),
  instagram: new RateLimiter(API_CONFIG.instagram.rateLimit),
  tiktok: new RateLimiter(API_CONFIG.tiktok.rateLimit),
  twitter: new RateLimiter(API_CONFIG.twitter.rateLimit),
};

// Generic API request function
async function makeApiRequest(url, options = {}, platform) {
  if (platform && rateLimiters[platform]) {
    await rateLimiters[platform].checkLimit();
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request error for ${platform}:`, error);
    throw error;
  }
}

// Behance API integration
export async function fetchBehanceTrends() {
  try {
    const url = `${API_CONFIG.behance.baseUrl}/projects?api_key=${API_CONFIG.behance.apiKey}&sort=appreciations&time=week&field=graphic-design`;
    const data = await makeApiRequest(url, {}, 'behance');

    const trends = data.projects.map(project => ({
      title: project.name,
      description: project.description,
      image_url: project.covers?.original || project.covers?.max_808,
      source_url: project.url,
      author_name: project.owners?.[0]?.display_name,
      author_handle: project.owners?.[0]?.username,
      author_avatar: project.owners?.[0]?.images?.['138'],
      likes_count: project.stats?.appreciations || 0,
      views_count: project.stats?.views || 0,
      comments_count: project.stats?.comments || 0,
      tags: project.fields || [],
      published_at: new Date(project.published_on * 1000),
      source_id: 'behance',
    }));

    return trends;
  } catch (error) {
    console.error('Error fetching Behance trends:', error);
    return [];
  }
}

// Instagram API integration
export async function fetchInstagramTrends() {
  try {
    // Note: Instagram API requires business account and app review
    const url = `${API_CONFIG.instagram.baseUrl}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count&access_token=${API_CONFIG.instagram.accessToken}`;
    const data = await makeApiRequest(url, {}, 'instagram');

    const trends = data.data
      .filter(post => post.media_type === 'IMAGE' || post.media_type === 'VIDEO')
      .map(post => ({
        title: post.caption?.split('\n')[0] || 'Instagram Post',
        description: post.caption,
        image_url: post.media_url || post.thumbnail_url,
        video_url: post.media_type === 'VIDEO' ? post.media_url : null,
        source_url: post.permalink,
        likes_count: post.like_count || 0,
        comments_count: post.comments_count || 0,
        published_at: new Date(post.timestamp),
        source_id: 'instagram',
      }));

    return trends;
  } catch (error) {
    console.error('Error fetching Instagram trends:', error);
    return [];
  }
}

// TikTok API integration
export async function fetchTikTokTrends() {
  try {
    // Note: TikTok API requires app approval and specific permissions
    const url = `${API_CONFIG.tiktok.baseUrl}/v2/video/query/?fields=["id","title","cover_image_url","video_description","create_time","like_count","comment_count","share_count","view_count"]`;
    
    const response = await makeApiRequest(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await getTikTokAccessToken()}`,
      },
      body: JSON.stringify({
        query: 'creative design africa',
        max_count: 20,
      }),
    }, 'tiktok');

    const trends = response.data?.videos?.map(video => ({
      title: video.title || 'TikTok Video',
      description: video.video_description,
      image_url: video.cover_image_url,
      video_url: video.video_url,
      likes_count: video.like_count || 0,
      comments_count: video.comment_count || 0,
      shares_count: video.share_count || 0,
      views_count: video.view_count || 0,
      published_at: new Date(video.create_time * 1000),
      source_id: 'tiktok',
    })) || [];

    return trends;
  } catch (error) {
    console.error('Error fetching TikTok trends:', error);
    return [];
  }
}

// Twitter API integration
export async function fetchTwitterTrends() {
  try {
    const query = encodeURIComponent('(creative OR design OR advertising) (Africa OR African) -is:retweet');
    const url = `${API_CONFIG.twitter.baseUrl}/tweets/search/recent?query=${query}&max_results=20&tweet.fields=created_at,public_metrics,entities&expansions=author_id&user.fields=name,username,profile_image_url`;
    
    const data = await makeApiRequest(url, {
      headers: {
        'Authorization': `Bearer ${API_CONFIG.twitter.bearerToken}`,
      },
    }, 'twitter');

    const users = data.includes?.users || [];
    const userMap = users.reduce((map, user) => {
      map[user.id] = user;
      return map;
    }, {});

    const trends = data.data?.map(tweet => {
      const user = userMap[tweet.author_id];
      return {
        title: tweet.text.split('\n')[0].substring(0, 100),
        description: tweet.text,
        source_url: `https://twitter.com/${user?.username}/status/${tweet.id}`,
        author_name: user?.name,
        author_handle: user?.username,
        author_avatar: user?.profile_image_url,
        likes_count: tweet.public_metrics?.like_count || 0,
        retweets_count: tweet.public_metrics?.retweet_count || 0,
        comments_count: tweet.public_metrics?.reply_count || 0,
        hashtags: tweet.entities?.hashtags?.map(h => h.tag) || [],
        published_at: new Date(tweet.created_at),
        source_id: 'twitter',
      };
    }) || [];

    return trends;
  } catch (error) {
    console.error('Error fetching Twitter trends:', error);
    return [];
  }
}

// News API integration
export async function fetchCreativeNews() {
  try {
    // Using a news API service (you can use NewsAPI, GNews, or similar)
    const newsApiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=(creative OR advertising OR design) AND (Africa OR African)&language=en&sortBy=publishedAt&pageSize=20&apiKey=${newsApiKey}`;
    
    const data = await makeApiRequest(url);

    const news = data.articles?.map(article => ({
      title: article.title,
      summary: article.description,
      content: article.content,
      featured_image: article.urlToImage,
      source_url: article.url,
      author_name: article.author,
      published_at: new Date(article.publishedAt),
      source_id: 'news',
      category: 'industry_news',
      tags: extractTags(article.title + ' ' + article.description),
    })) || [];

    return news;
  } catch (error) {
    console.error('Error fetching creative news:', error);
    return [];
  }
}

// Hashtag tracking
export async function fetchTrendingHashtags() {
  try {
    // This would typically come from social media APIs
    // For now, we'll create a mock implementation
    const hashtags = [
      { hashtag: '#AfricanCreatives', post_count: 15420, growth_rate: 15.5 },
      { hashtag: '#DesignAfrica', post_count: 8920, growth_rate: 12.3 },
      { hashtag: '#CreativeNairobi', post_count: 5670, growth_rate: 8.9 },
      { hashtag: '#LagosDesign', post_count: 4320, growth_rate: 7.2 },
      { hashtag: '#SouthAfricanDesign', post_count: 3890, growth_rate: 6.8 },
    ];

    return hashtags.map(tag => ({
      ...tag,
      trend_score: calculateHashtagScore(tag.post_count, tag.growth_rate),
      top_regions: ['West Africa', 'East Africa'],
      top_countries: ['NGA', 'KEN', 'ZAF'],
      source_platforms: ['Instagram', 'Twitter'],
    }));
  } catch (error) {
    console.error('Error fetching trending hashtags:', error);
    return [];
  }
}

// Utility functions
function extractTags(text) {
  const hashtagRegex = /#\w+/g;
  return text.match(hashtagRegex) || [];
}

function calculateHashtagScore(postCount, growthRate) {
  return (postCount * 0.1 + growthRate * 10).toFixed(2);
}

async function getTikTokAccessToken() {
  // Implement TikTok OAuth flow
  // This is a simplified version - you'd need to implement the full OAuth flow
  return process.env.TIKTOK_ACCESS_TOKEN;
}

// Database operations
export async function saveTrendsToDatabase(trends, trendType) {
  try {
    const { data, error } = await supabase
      .from(trendType)
      .upsert(trends, { onConflict: 'source_url' });

    if (error) {
      console.error(`Error saving ${trendType} to database:`, error);
      return false;
    }

    console.log(`Successfully saved ${data?.length || 0} ${trendType} to database`);
    return true;
  } catch (error) {
    console.error(`Error saving ${trendType} to database:`, error);
    return false;
  }
}

// Main aggregation function
export async function aggregateAllTrends() {
  try {
    console.log('Starting trend aggregation...');

    // Fetch data from all sources
    const [behanceTrends, instagramTrends, tiktokTrends, twitterTrends, news, hashtags] = await Promise.allSettled([
      fetchBehanceTrends(),
      fetchInstagramTrends(),
      fetchTikTokTrends(),
      fetchTwitterTrends(),
      fetchCreativeNews(),
      fetchTrendingHashtags(),
    ]);

    // Process successful results
    const results = {
      design_trends: [],
      viral_campaigns: [],
      trending_hashtags: [],
      creative_news: [],
    };

    // Process Behance trends
    if (behanceTrends.status === 'fulfilled') {
      results.design_trends.push(...behanceTrends.value);
    }

    // Process Instagram trends
    if (instagramTrends.status === 'fulfilled') {
      results.design_trends.push(...instagramTrends.value);
    }

    // Process TikTok trends
    if (tiktokTrends.status === 'fulfilled') {
      results.viral_campaigns.push(...tiktokTrends.value);
    }

    // Process Twitter trends
    if (twitterTrends.status === 'fulfilled') {
      results.design_trends.push(...twitterTrends.value);
    }

    // Process news
    if (news.status === 'fulfilled') {
      results.creative_news.push(...news.value);
    }

    // Process hashtags
    if (hashtags.status === 'fulfilled') {
      results.trending_hashtags.push(...hashtags.value);
    }

    // Save to database
    await Promise.allSettled([
      saveTrendsToDatabase(results.design_trends, 'design_trends'),
      saveTrendsToDatabase(results.viral_campaigns, 'viral_campaigns'),
      saveTrendsToDatabase(results.trending_hashtags, 'trending_hashtags'),
      saveTrendsToDatabase(results.creative_news, 'creative_news'),
    ]);

    console.log('Trend aggregation completed successfully');
    return results;
  } catch (error) {
    console.error('Error in trend aggregation:', error);
    throw error;
  }
}

// Get trends from database
export async function getTrendsFromDatabase(options = {}) {
  const {
    trendType = 'design_trends',
    limit = 20,
    offset = 0,
    category = null,
    region = null,
    featured = false,
  } = options;

  try {
    let query = supabase
      .from(trendType)
      .select('*')
      .order('trend_score', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq('category_id', category);
    }

    if (region) {
      query = query.contains('regions', [region]);
    }

    if (featured) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching ${trendType}:`, error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(`Error fetching ${trendType}:`, error);
    return [];
  }
}
