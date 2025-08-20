-- PAAN Talent & Agency Discovery Map Database Schema
-- Designed for Supabase PostgreSQL

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Countries table
CREATE TABLE countries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    code VARCHAR(3) NOT NULL UNIQUE, -- ISO 3166-1 alpha-3
    flag_url VARCHAR(500),
    region VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cities table
CREATE TABLE cities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    population INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(name, country_id)
);

-- Skills/Services categories
CREATE TABLE skill_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7), -- Hex color for UI
    icon VARCHAR(100), -- Icon name/class
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Individual skills/services
CREATE TABLE skills (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category_id UUID REFERENCES skill_categories(id) ON DELETE CASCADE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User types enum
CREATE TYPE user_type AS ENUM ('creative', 'agency', 'client');

-- Profile status enum
CREATE TYPE profile_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');

-- User profiles (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE,
    user_type user_type NOT NULL DEFAULT 'creative',
    status profile_status NOT NULL DEFAULT 'pending',
    
    -- Contact information
    phone VARCHAR(20),
    website VARCHAR(500),
    linkedin VARCHAR(500),
    twitter VARCHAR(500),
    instagram VARCHAR(500),
    
    -- Profile details
    bio TEXT,
    tagline VARCHAR(200),
    avatar_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    
    -- Location
    city_id UUID REFERENCES cities(id),
    address TEXT,
    timezone VARCHAR(50),
    
    -- Agency-specific fields
    company_name VARCHAR(255),
    company_size VARCHAR(50),
    founded_year INTEGER,
    registration_number VARCHAR(100),
    
    -- Verification and badges
    is_verified BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    verification_date TIMESTAMP WITH TIME ZONE,
    
    -- Engagement metrics
    profile_views INTEGER DEFAULT 0,
    contact_requests INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    rating_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User skills junction table
CREATE TABLE profile_skills (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
    years_experience INTEGER,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(profile_id, skill_id)
);

-- Portfolio items
CREATE TABLE portfolio_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    project_url VARCHAR(500),
    
    -- Project details
    client_name VARCHAR(255),
    project_type VARCHAR(100),
    completion_date DATE,
    
    -- Media and assets
    gallery_images TEXT[], -- Array of image URLs
    video_url VARCHAR(500),
    
    -- Engagement
    likes_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    
    -- Visibility
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio skills junction (which skills were used in each project)
CREATE TABLE portfolio_skills (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    portfolio_item_id UUID REFERENCES portfolio_items(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(portfolio_item_id, skill_id)
);

-- Reviews and ratings
CREATE TABLE reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    reviewee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    project_title VARCHAR(255),
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(reviewer_id, reviewee_id) -- One review per reviewer-reviewee pair
);

-- Contact requests/inquiries
CREATE TABLE contact_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    budget_range VARCHAR(100),
    project_timeline VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending', -- pending, read, replied, archived
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE,
    replied_at TIMESTAMP WITH TIME ZONE
);

-- Badges system
CREATE TABLE badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100),
    color VARCHAR(7),
    criteria JSONB, -- Flexible criteria for earning badges
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User badges junction
CREATE TABLE profile_badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_visible BOOLEAN DEFAULT TRUE,
    UNIQUE(profile_id, badge_id)
);

-- Search and analytics
CREATE TABLE profile_views (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    viewed_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    viewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    viewer_ip INET,
    user_agent TEXT,
    referrer VARCHAR(500),
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_profiles_user_type ON profiles(user_type);
CREATE INDEX idx_profiles_status ON profiles(status);
CREATE INDEX idx_profiles_city ON profiles(city_id);
CREATE INDEX idx_profiles_verified ON profiles(is_verified);
CREATE INDEX idx_profiles_featured ON profiles(is_featured);
CREATE INDEX idx_profiles_last_active ON profiles(last_active);

CREATE INDEX idx_cities_country ON cities(country_id);
CREATE INDEX idx_cities_location ON cities(latitude, longitude);

CREATE INDEX idx_profile_skills_profile ON profile_skills(profile_id);
CREATE INDEX idx_profile_skills_skill ON profile_skills(skill_id);
CREATE INDEX idx_profile_skills_primary ON profile_skills(is_primary);

CREATE INDEX idx_portfolio_profile ON portfolio_items(profile_id);
CREATE INDEX idx_portfolio_featured ON portfolio_items(is_featured);
CREATE INDEX idx_portfolio_public ON portfolio_items(is_public);

CREATE INDEX idx_contact_requests_recipient ON contact_requests(recipient_id);
CREATE INDEX idx_contact_requests_sender ON contact_requests(sender_id);
CREATE INDEX idx_contact_requests_status ON contact_requests(status);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profile policies
CREATE POLICY "Public profiles are viewable by everyone" 
    ON profiles FOR SELECT 
    USING (status = 'approved');

CREATE POLICY "Users can view their own profile" 
    ON profiles FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
    ON profiles FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
    ON profiles FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Portfolio policies
CREATE POLICY "Public portfolios are viewable by everyone" 
    ON portfolio_items FOR SELECT 
    USING (is_public = true AND EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = portfolio_items.profile_id 
        AND profiles.status = 'approved'
    ));

CREATE POLICY "Users can manage their own portfolio" 
    ON portfolio_items FOR ALL 
    USING (auth.uid() = profile_id);

-- Contact request policies
CREATE POLICY "Users can view their own contact requests" 
    ON contact_requests FOR SELECT 
    USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Authenticated users can send contact requests" 
    ON contact_requests FOR INSERT 
    WITH CHECK (auth.uid() = sender_id);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_updated_at 
    BEFORE UPDATE ON portfolio_items 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update profile rating
CREATE OR REPLACE FUNCTION update_profile_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE profiles 
    SET rating = (
        SELECT AVG(rating)::DECIMAL(3,2) 
        FROM reviews 
        WHERE reviewee_id = COALESCE(NEW.reviewee_id, OLD.reviewee_id)
    ),
    rating_count = (
        SELECT COUNT(*) 
        FROM reviews 
        WHERE reviewee_id = COALESCE(NEW.reviewee_id, OLD.reviewee_id)
    )
    WHERE id = COALESCE(NEW.reviewee_id, OLD.reviewee_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Trigger for rating updates
CREATE TRIGGER update_rating_on_review_change
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_profile_rating();
