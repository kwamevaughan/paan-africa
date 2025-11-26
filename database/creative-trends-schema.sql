-- PAAN Creative Trends Dashboard Database Schema
-- Designed for Supabase PostgreSQL

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Data sources/platforms
CREATE TABLE data_sources (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    platform_type VARCHAR(50) NOT NULL, -- 'social_media', 'design_platform', 'news', 'awards'
    api_endpoint VARCHAR(500),
    api_key_required BOOLEAN DEFAULT FALSE,
    rate_limit_per_hour INTEGER,
    last_fetch_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trend categories
CREATE TABLE trend_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7), -- Hex color for UI
    icon VARCHAR(100),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trending design styles
CREATE TABLE design_trends (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category_id UUID REFERENCES trend_categories(id),
    source_id UUID REFERENCES data_sources(id),
    
    -- Visual content
    image_url VARCHAR(500),
    video_url VARCHAR(500),
    gallery_images TEXT[],
    
    -- Engagement metrics
    likes_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    
    -- Trend analysis
    trend_score DECIMAL(5,2) DEFAULT 0.00, -- Calculated based on engagement
    growth_rate DECIMAL(5,2) DEFAULT 0.00, -- Percentage growth over time
    peak_date TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    tags TEXT[],
    color_palette TEXT[], -- Array of hex colors
    style_keywords TEXT[],
    
    -- Source information
    source_url VARCHAR(500),
    author_name VARCHAR(255),
    author_handle VARCHAR(100),
    author_avatar VARCHAR(500),
    
    -- Regional relevance
    regions TEXT[], -- Array of African regions
    countries TEXT[], -- Array of country codes
    
    -- Visibility and curation
    is_featured BOOLEAN DEFAULT FALSE,
    is_curated BOOLEAN DEFAULT FALSE,
    curator_notes TEXT,
    
    -- Timestamps
    published_at TIMESTAMP WITH TIME ZONE,
    discovered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Viral campaigns
CREATE TABLE viral_campaigns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    brand_name VARCHAR(255),
    agency_name VARCHAR(255),
    
    -- Campaign details
    campaign_type VARCHAR(100), -- 'social_media', 'tv', 'print', 'digital', 'outdoor'
    industry VARCHAR(100),
    target_audience VARCHAR(255),
    
    -- Visual content
    hero_image VARCHAR(500),
    video_url VARCHAR(500),
    campaign_images TEXT[],
    
    -- Performance metrics
    reach_count BIGINT DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0.00,
    viral_score DECIMAL(5,2) DEFAULT 0.00,
    sentiment_score DECIMAL(3,2) DEFAULT 0.00, -- -1 to 1
    
    -- Social media metrics
    likes_count BIGINT DEFAULT 0,
    shares_count BIGINT DEFAULT 0,
    comments_count BIGINT DEFAULT 0,
    views_count BIGINT DEFAULT 0,
    
    -- Hashtags and mentions
    hashtags TEXT[],
    mentions TEXT[],
    
    -- Source information
    source_id UUID REFERENCES data_sources(id),
    source_url VARCHAR(500),
    original_post_url VARCHAR(500),
    
    -- Regional data
    regions TEXT[],
    countries TEXT[],
    languages TEXT[],
    
    -- Campaign timeline
    launch_date DATE,
    end_date DATE,
    peak_viral_date TIMESTAMP WITH TIME ZONE,
    
    -- Curation
    is_featured BOOLEAN DEFAULT FALSE,
    is_curated BOOLEAN DEFAULT FALSE,
    curator_notes TEXT,
    featured_reason VARCHAR(255),
    
    -- Timestamps
    published_at TIMESTAMP WITH TIME ZONE,
    discovered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trending hashtags
CREATE TABLE trending_hashtags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    hashtag VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    description TEXT,
    
    -- Usage metrics
    post_count BIGINT DEFAULT 0,
    reach_count BIGINT DEFAULT 0,
    engagement_count BIGINT DEFAULT 0,
    growth_rate DECIMAL(5,2) DEFAULT 0.00,
    
    -- Trend analysis
    trend_score DECIMAL(5,2) DEFAULT 0.00,
    peak_usage_date TIMESTAMP WITH TIME ZONE,
    trending_duration_hours INTEGER DEFAULT 0,
    
    -- Categorization
    category VARCHAR(100),
    related_hashtags TEXT[],
    
    -- Regional data
    top_regions TEXT[],
    top_countries TEXT[],
    
    -- Source platforms
    source_platforms TEXT[], -- Array of platform names
    platform_breakdown JSONB, -- Detailed breakdown by platform
    
    -- Visual representation
    color VARCHAR(7),
    icon VARCHAR(100),
    
    -- Curation
    is_featured BOOLEAN DEFAULT FALSE,
    is_curated BOOLEAN DEFAULT FALSE,
    curator_notes TEXT,
    
    -- Timestamps
    first_seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brand/advertising news
CREATE TABLE creative_news (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    summary TEXT,
    content TEXT,
    
    -- News categorization
    category VARCHAR(100), -- 'industry_news', 'campaign_launch', 'award_win', 'merger_acquisition'
    industry VARCHAR(100),
    tags TEXT[],
    
    -- Source information
    source_id UUID REFERENCES data_sources(id),
    source_url VARCHAR(500),
    author_name VARCHAR(255),
    author_title VARCHAR(255),
    
    -- Visual content
    featured_image VARCHAR(500),
    images TEXT[],
    
    -- Engagement metrics
    read_time_minutes INTEGER,
    social_shares INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    
    -- Relevance scoring
    relevance_score DECIMAL(3,2) DEFAULT 0.00, -- 0 to 1
    africa_relevance_score DECIMAL(3,2) DEFAULT 0.00,
    
    -- Regional focus
    regions TEXT[],
    countries TEXT[],
    mentioned_brands TEXT[],
    mentioned_agencies TEXT[],
    
    -- Curation
    is_featured BOOLEAN DEFAULT FALSE,
    is_curated BOOLEAN DEFAULT FALSE,
    curator_notes TEXT,
    featured_reason VARCHAR(255),
    
    -- Timestamps
    published_at TIMESTAMP WITH TIME ZONE,
    discovered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Regional trend filters
CREATE TABLE regions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL UNIQUE,
    description TEXT,
    countries TEXT[], -- Array of country codes
    color VARCHAR(7),
    icon VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Featured insights (curated by PAAN editors)
CREATE TABLE featured_insights (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    content TEXT NOT NULL,
    
    -- Insight type
    insight_type VARCHAR(100), -- 'trend_analysis', 'campaign_breakdown', 'industry_report', 'expert_opinion'
    
    -- Visual content
    hero_image VARCHAR(500),
    images TEXT[],
    video_url VARCHAR(500),
    
    -- Related content
    related_trends UUID[], -- Array of design_trends IDs
    related_campaigns UUID[], -- Array of viral_campaigns IDs
    related_hashtags TEXT[], -- Array of hashtags
    related_news UUID[], -- Array of creative_news IDs
    
    -- Author information
    author_name VARCHAR(255),
    author_title VARCHAR(255),
    author_avatar VARCHAR(500),
    author_bio TEXT,
    
    -- Engagement
    read_time_minutes INTEGER,
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    
    -- Publishing
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    featured_until TIMESTAMP WITH TIME ZONE,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    slug VARCHAR(255) UNIQUE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics and tracking
CREATE TABLE trend_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date DATE NOT NULL,
    metric_type VARCHAR(50) NOT NULL, -- 'trend_views', 'campaign_shares', 'hashtag_usage'
    metric_value BIGINT NOT NULL,
    region_code VARCHAR(10),
    category_id UUID REFERENCES trend_categories(id),
    source_id UUID REFERENCES data_sources(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User interactions with trends
CREATE TABLE user_trend_interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content_type VARCHAR(50) NOT NULL, -- 'design_trend', 'viral_campaign', 'hashtag', 'news', 'insight'
    content_id UUID NOT NULL,
    interaction_type VARCHAR(50) NOT NULL, -- 'view', 'like', 'share', 'bookmark', 'click'
    interaction_data JSONB, -- Additional data about the interaction
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_design_trends_category ON design_trends(category_id);
CREATE INDEX idx_design_trends_source ON design_trends(source_id);
CREATE INDEX idx_design_trends_trend_score ON design_trends(trend_score DESC);
CREATE INDEX idx_design_trends_featured ON design_trends(is_featured);
CREATE INDEX idx_design_trends_published ON design_trends(published_at DESC);
CREATE INDEX idx_design_trends_regions ON design_trends USING GIN(regions);
CREATE INDEX idx_design_trends_countries ON design_trends USING GIN(countries);

CREATE INDEX idx_viral_campaigns_source ON viral_campaigns(source_id);
CREATE INDEX idx_viral_campaigns_viral_score ON viral_campaigns(viral_score DESC);
CREATE INDEX idx_viral_campaigns_featured ON viral_campaigns(is_featured);
CREATE INDEX idx_viral_campaigns_launch_date ON viral_campaigns(launch_date DESC);
CREATE INDEX idx_viral_campaigns_regions ON viral_campaigns USING GIN(regions);
CREATE INDEX idx_viral_campaigns_hashtags ON viral_campaigns USING GIN(hashtags);

CREATE INDEX idx_trending_hashtags_trend_score ON trending_hashtags(trend_score DESC);
CREATE INDEX idx_trending_hashtags_featured ON trending_hashtags(is_featured);
CREATE INDEX idx_trending_hashtags_hashtag ON trending_hashtags(hashtag);
CREATE INDEX idx_trending_hashtags_regions ON trending_hashtags USING GIN(top_regions);

CREATE INDEX idx_creative_news_source ON creative_news(source_id);
CREATE INDEX idx_creative_news_featured ON creative_news(is_featured);
CREATE INDEX idx_creative_news_published ON creative_news(published_at DESC);
CREATE INDEX idx_creative_news_relevance ON creative_news(relevance_score DESC);
CREATE INDEX idx_creative_news_regions ON creative_news USING GIN(regions);

CREATE INDEX idx_featured_insights_published ON featured_insights(published_at DESC);
CREATE INDEX idx_featured_insights_published_status ON featured_insights(is_published, published_at DESC);
CREATE INDEX idx_featured_insights_slug ON featured_insights(slug);

CREATE INDEX idx_trend_analytics_date ON trend_analytics(date);
CREATE INDEX idx_trend_analytics_metric ON trend_analytics(metric_type, date);

CREATE INDEX idx_user_interactions_user ON user_trend_interactions(user_id);
CREATE INDEX idx_user_interactions_content ON user_trend_interactions(content_type, content_id);
CREATE INDEX idx_user_interactions_type ON user_trend_interactions(interaction_type);

-- Row Level Security (RLS) Policies
ALTER TABLE design_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE viral_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE trending_hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE creative_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_trend_interactions ENABLE ROW LEVEL SECURITY;

-- Public read access for all trend data
CREATE POLICY "Public read access for design trends" 
    ON design_trends FOR SELECT 
    USING (true);

CREATE POLICY "Public read access for viral campaigns" 
    ON viral_campaigns FOR SELECT 
    USING (true);

CREATE POLICY "Public read access for trending hashtags" 
    ON trending_hashtags FOR SELECT 
    USING (true);

CREATE POLICY "Public read access for creative news" 
    ON creative_news FOR SELECT 
    USING (true);

CREATE POLICY "Public read access for featured insights" 
    ON featured_insights FOR SELECT 
    USING (is_published = true);

-- User interaction policies
CREATE POLICY "Users can view their own interactions" 
    ON user_trend_interactions FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create interactions" 
    ON user_trend_interactions FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_design_trends_updated_at 
    BEFORE UPDATE ON design_trends 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_viral_campaigns_updated_at 
    BEFORE UPDATE ON viral_campaigns 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_creative_news_updated_at 
    BEFORE UPDATE ON creative_news 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_featured_insights_updated_at 
    BEFORE UPDATE ON featured_insights 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate trend score based on engagement
CREATE OR REPLACE FUNCTION calculate_trend_score(
    likes_count INTEGER,
    shares_count INTEGER,
    views_count INTEGER,
    comments_count INTEGER,
    growth_rate DECIMAL
)
RETURNS DECIMAL AS $$
BEGIN
    RETURN (
        (likes_count * 1) + 
        (shares_count * 3) + 
        (views_count * 0.1) + 
        (comments_count * 2) + 
        (growth_rate * 10)
    )::DECIMAL(5,2);
END;
$$ language 'plpgsql';

-- Insert sample data sources
INSERT INTO data_sources (name, platform_type, api_endpoint, api_key_required, rate_limit_per_hour) VALUES
('Behance', 'design_platform', 'https://api.behance.net/v2', true, 1000),
('Instagram', 'social_media', 'https://graph.instagram.com', true, 200),
('TikTok', 'social_media', 'https://open.tiktokapis.com', true, 100),
('Adweek', 'news', 'https://www.adweek.com/api', false, 100),
('Cannes Lions', 'awards', 'https://www.canneslions.com/api', false, 50),
('Loeries', 'awards', 'https://www.theloeries.com/api', false, 50),
('Twitter', 'social_media', 'https://api.twitter.com/2', true, 300),
('Pinterest', 'social_media', 'https://api.pinterest.com/v5', true, 100);

-- Insert sample trend categories
INSERT INTO trend_categories (name, description, color, icon, display_order) VALUES
('Visual Design', 'Graphic design, typography, and visual aesthetics', '#FF6B6B', 'palette', 1),
('Digital Marketing', 'Social media campaigns and digital advertising', '#4ECDC4', 'megaphone', 2),
('Brand Identity', 'Logo design, brand guidelines, and corporate identity', '#45B7D1', 'briefcase', 3),
('UI/UX Design', 'User interface and user experience design', '#96CEB4', 'smartphone', 4),
('Print Design', 'Traditional print media and publications', '#FFEAA7', 'file-text', 5),
('Motion Graphics', 'Animation, video, and dynamic content', '#DDA0DD', 'video', 6),
('Photography', 'Photography styles and techniques', '#98D8C8', 'camera', 7),
('Illustration', 'Digital and traditional illustration', '#F7DC6F', 'brush', 8);

-- Insert sample regions
INSERT INTO regions (name, code, description, countries, color, icon) VALUES
('West Africa', 'WA', 'West African creative scene', ARRAY['NGA', 'GHA', 'SEN', 'CIV', 'MLI'], '#FF6B6B', 'map-pin'),
('East Africa', 'EA', 'East African creative scene', ARRAY['KEN', 'TZA', 'UGA', 'ETH', 'RWA'], '#4ECDC4', 'map-pin'),
('Southern Africa', 'SA', 'Southern African creative scene', ARRAY['ZAF', 'NAM', 'BWA', 'ZWE', 'MOZ'], '#45B7D1', 'map-pin'),
('North Africa', 'NA', 'North African creative scene', ARRAY['EGY', 'MAR', 'TUN', 'DZA', 'LBY'], '#96CEB4', 'map-pin'),
('Central Africa', 'CA', 'Central African creative scene', ARRAY['CMR', 'GAB', 'CAF', 'TCD', 'COD'], '#FFEAA7', 'map-pin');
