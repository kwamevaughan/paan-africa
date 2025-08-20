-- PAAN Talent Discovery Map - Seed Data
-- Run this after the main schema

-- Insert skill categories
INSERT INTO skill_categories (name, description, color, icon) VALUES
('Design', 'Visual design, graphics, and user experience', '#F25849', 'palette'),
('Development', 'Web, mobile, and software development', '#84C1D9', 'code'),
('Marketing', 'Digital marketing, advertising, and strategy', '#F2B706', 'megaphone'),
('Content', 'Writing, copywriting, and content creation', '#34B6A7', 'edit'),
('Video & Animation', 'Video production, motion graphics, and animation', '#EC5B88', 'film'),
('Strategy', 'Business strategy, consulting, and planning', '#6A4C93', 'lightbulb'),
('Photography', 'Photography, photo editing, and visual media', '#172840', 'camera'),
('Audio', 'Music production, sound design, and voiceover', '#F2B706', 'volume-2');

-- Insert specific skills
INSERT INTO skills (name, category_id) VALUES
-- Design Skills
('Logo Design', (SELECT id FROM skill_categories WHERE name = 'Design')),
('Brand Identity', (SELECT id FROM skill_categories WHERE name = 'Design')),
('UI/UX Design', (SELECT id FROM skill_categories WHERE name = 'Design')),
('Graphic Design', (SELECT id FROM skill_categories WHERE name = 'Design')),
('Web Design', (SELECT id FROM skill_categories WHERE name = 'Design')),
('Print Design', (SELECT id FROM skill_categories WHERE name = 'Design')),
('Packaging Design', (SELECT id FROM skill_categories WHERE name = 'Design')),
('Illustration', (SELECT id FROM skill_categories WHERE name = 'Design')),
('Icon Design', (SELECT id FROM skill_categories WHERE name = 'Design')),
('Mobile App Design', (SELECT id FROM skill_categories WHERE name = 'Design')),

-- Development Skills
('Frontend Development', (SELECT id FROM skill_categories WHERE name = 'Development')),
('Backend Development', (SELECT id FROM skill_categories WHERE name = 'Development')),
('Full Stack Development', (SELECT id FROM skill_categories WHERE name = 'Development')),
('Mobile App Development', (SELECT id FROM skill_categories WHERE name = 'Development')),
('WordPress Development', (SELECT id FROM skill_categories WHERE name = 'Development')),
('E-commerce Development', (SELECT id FROM skill_categories WHERE name = 'Development')),
('API Development', (SELECT id FROM skill_categories WHERE name = 'Development')),
('DevOps', (SELECT id FROM skill_categories WHERE name = 'Development')),
('React Development', (SELECT id FROM skill_categories WHERE name = 'Development')),
('Vue.js Development', (SELECT id FROM skill_categories WHERE name = 'Development')),

-- Marketing Skills
('Digital Marketing Strategy', (SELECT id FROM skill_categories WHERE name = 'Marketing')),
('Social Media Marketing', (SELECT id FROM skill_categories WHERE name = 'Marketing')),
('SEO', (SELECT id FROM skill_categories WHERE name = 'Marketing')),
('PPC Advertising', (SELECT id FROM skill_categories WHERE name = 'Marketing')),
('Email Marketing', (SELECT id FROM skill_categories WHERE name = 'Marketing')),
('Influencer Marketing', (SELECT id FROM skill_categories WHERE name = 'Marketing')),
('Marketing Analytics', (SELECT id FROM skill_categories WHERE name = 'Marketing')),
('Conversion Optimization', (SELECT id FROM skill_categories WHERE name = 'Marketing')),
('Brand Strategy', (SELECT id FROM skill_categories WHERE name = 'Marketing')),
('Growth Hacking', (SELECT id FROM skill_categories WHERE name = 'Marketing')),

-- Content Skills
('Copywriting', (SELECT id FROM skill_categories WHERE name = 'Content')),
('Content Strategy', (SELECT id FROM skill_categories WHERE name = 'Content')),
('Blog Writing', (SELECT id FROM skill_categories WHERE name = 'Content')),
('Technical Writing', (SELECT id FROM skill_categories WHERE name = 'Content')),
('Social Media Content', (SELECT id FROM skill_categories WHERE name = 'Content')),
('Script Writing', (SELECT id FROM skill_categories WHERE name = 'Content')),
('Grant Writing', (SELECT id FROM skill_categories WHERE name = 'Content')),
('Translation', (SELECT id FROM skill_categories WHERE name = 'Content')),
('Editing & Proofreading', (SELECT id FROM skill_categories WHERE name = 'Content')),
('Creative Writing', (SELECT id FROM skill_categories WHERE name = 'Content')),

-- Video & Animation Skills
('Video Editing', (SELECT id FROM skill_categories WHERE name = 'Video & Animation')),
('Motion Graphics', (SELECT id FROM skill_categories WHERE name = 'Video & Animation')),
('2D Animation', (SELECT id FROM skill_categories WHERE name = 'Video & Animation')),
('3D Animation', (SELECT id FROM skill_categories WHERE name = 'Video & Animation')),
('Video Production', (SELECT id FROM skill_categories WHERE name = 'Video & Animation')),
('Documentary Film', (SELECT id FROM skill_categories WHERE name = 'Video & Animation')),
('Commercial Video', (SELECT id FROM skill_categories WHERE name = 'Video & Animation')),
('Explainer Videos', (SELECT id FROM skill_categories WHERE name = 'Video & Animation')),
('Live Streaming', (SELECT id FROM skill_categories WHERE name = 'Video & Animation')),
('Visual Effects', (SELECT id FROM skill_categories WHERE name = 'Video & Animation')),

-- Strategy Skills
('Business Strategy', (SELECT id FROM skill_categories WHERE name = 'Strategy')),
('Market Research', (SELECT id FROM skill_categories WHERE name = 'Strategy')),
('Business Development', (SELECT id FROM skill_categories WHERE name = 'Strategy')),
('Management Consulting', (SELECT id FROM skill_categories WHERE name = 'Strategy')),
('Financial Planning', (SELECT id FROM skill_categories WHERE name = 'Strategy')),
('Product Strategy', (SELECT id FROM skill_categories WHERE name = 'Strategy')),
('Digital Transformation', (SELECT id FROM skill_categories WHERE name = 'Strategy')),
('Operations Consulting', (SELECT id FROM skill_categories WHERE name = 'Strategy')),
('Change Management', (SELECT id FROM skill_categories WHERE name = 'Strategy')),
('Innovation Consulting', (SELECT id FROM skill_categories WHERE name = 'Strategy')),

-- Photography Skills
('Portrait Photography', (SELECT id FROM skill_categories WHERE name = 'Photography')),
('Product Photography', (SELECT id FROM skill_categories WHERE name = 'Photography')),
('Event Photography', (SELECT id FROM skill_categories WHERE name = 'Photography')),
('Fashion Photography', (SELECT id FROM skill_categories WHERE name = 'Photography')),
('Food Photography', (SELECT id FROM skill_categories WHERE name = 'Photography')),
('Architectural Photography', (SELECT id FROM skill_categories WHERE name = 'Photography')),
('Stock Photography', (SELECT id FROM skill_categories WHERE name = 'Photography')),
('Photo Retouching', (SELECT id FROM skill_categories WHERE name = 'Photography')),
('Drone Photography', (SELECT id FROM skill_categories WHERE name = 'Photography')),
('Wedding Photography', (SELECT id FROM skill_categories WHERE name = 'Photography')),

-- Audio Skills
('Music Production', (SELECT id FROM skill_categories WHERE name = 'Audio')),
('Sound Design', (SELECT id FROM skill_categories WHERE name = 'Audio')),
('Voiceover', (SELECT id FROM skill_categories WHERE name = 'Audio')),
('Audio Editing', (SELECT id FROM skill_categories WHERE name = 'Audio')),
('Podcast Production', (SELECT id FROM skill_categories WHERE name = 'Audio')),
('Jingle Creation', (SELECT id FROM skill_categories WHERE name = 'Audio')),
('Audio Branding', (SELECT id FROM skill_categories WHERE name = 'Audio')),
('Live Sound', (SELECT id FROM skill_categories WHERE name = 'Audio')),
('Music Composition', (SELECT id FROM skill_categories WHERE name = 'Audio')),
('Audio Mixing', (SELECT id FROM skill_categories WHERE name = 'Audio'));

-- Insert African countries
INSERT INTO countries (name, code, flag_url, region) VALUES
('Nigeria', 'NGA', 'https://flagcdn.com/ng.svg', 'West Africa'),
('South Africa', 'ZAF', 'https://flagcdn.com/za.svg', 'Southern Africa'),
('Kenya', 'KEN', 'https://flagcdn.com/ke.svg', 'East Africa'),
('Ghana', 'GHA', 'https://flagcdn.com/gh.svg', 'West Africa'),
('Egypt', 'EGY', 'https://flagcdn.com/eg.svg', 'North Africa'),
('Morocco', 'MAR', 'https://flagcdn.com/ma.svg', 'North Africa'),
('Ethiopia', 'ETH', 'https://flagcdn.com/et.svg', 'East Africa'),
('Uganda', 'UGA', 'https://flagcdn.com/ug.svg', 'East Africa'),
('Tanzania', 'TZA', 'https://flagcdn.com/tz.svg', 'East Africa'),
('Angola', 'AGO', 'https://flagcdn.com/ao.svg', 'Central Africa'),
('Algeria', 'DZA', 'https://flagcdn.com/dz.svg', 'North Africa'),
('Sudan', 'SDN', 'https://flagcdn.com/sd.svg', 'North Africa'),
('Cameroon', 'CMR', 'https://flagcdn.com/cm.svg', 'Central Africa'),
('Ivory Coast', 'CIV', 'https://flagcdn.com/ci.svg', 'West Africa'),
('Madagascar', 'MDG', 'https://flagcdn.com/mg.svg', 'East Africa'),
('Burkina Faso', 'BFA', 'https://flagcdn.com/bf.svg', 'West Africa'),
('Mali', 'MLI', 'https://flagcdn.com/ml.svg', 'West Africa'),
('Malawi', 'MWI', 'https://flagcdn.com/mw.svg', 'Southern Africa'),
('Zambia', 'ZMB', 'https://flagcdn.com/zm.svg', 'Southern Africa'),
('Senegal', 'SEN', 'https://flagcdn.com/sn.svg', 'West Africa'),
('Chad', 'TCD', 'https://flagcdn.com/td.svg', 'Central Africa'),
('Somalia', 'SOM', 'https://flagcdn.com/so.svg', 'East Africa'),
('Zimbabwe', 'ZWE', 'https://flagcdn.com/zw.svg', 'Southern Africa'),
('Guinea', 'GIN', 'https://flagcdn.com/gn.svg', 'West Africa'),
('Rwanda', 'RWA', 'https://flagcdn.com/rw.svg', 'East Africa'),
('Benin', 'BEN', 'https://flagcdn.com/bj.svg', 'West Africa'),
('Tunisia', 'TUN', 'https://flagcdn.com/tn.svg', 'North Africa'),
('Burundi', 'BDI', 'https://flagcdn.com/bi.svg', 'East Africa'),
('South Sudan', 'SSD', 'https://flagcdn.com/ss.svg', 'East Africa'),
('Togo', 'TGO', 'https://flagcdn.com/tg.svg', 'West Africa'),
('Sierra Leone', 'SLE', 'https://flagcdn.com/sl.svg', 'West Africa'),
('Libya', 'LBY', 'https://flagcdn.com/ly.svg', 'North Africa'),
('Liberia', 'LBR', 'https://flagcdn.com/lr.svg', 'West Africa'),
('Central African Republic', 'CAF', 'https://flagcdn.com/cf.svg', 'Central Africa'),
('Mauritania', 'MRT', 'https://flagcdn.com/mr.svg', 'West Africa'),
('Eritrea', 'ERI', 'https://flagcdn.com/er.svg', 'East Africa'),
('Gambia', 'GMB', 'https://flagcdn.com/gm.svg', 'West Africa'),
('Botswana', 'BWA', 'https://flagcdn.com/bw.svg', 'Southern Africa'),
('Namibia', 'NAM', 'https://flagcdn.com/na.svg', 'Southern Africa'),
('Gabon', 'GAB', 'https://flagcdn.com/ga.svg', 'Central Africa'),
('Lesotho', 'LSO', 'https://flagcdn.com/ls.svg', 'Southern Africa'),
('Guinea-Bissau', 'GNB', 'https://flagcdn.com/gw.svg', 'West Africa'),
('Equatorial Guinea', 'GNQ', 'https://flagcdn.com/gq.svg', 'Central Africa'),
('Mauritius', 'MUS', 'https://flagcdn.com/mu.svg', 'East Africa'),
('Eswatini', 'SWZ', 'https://flagcdn.com/sz.svg', 'Southern Africa'),
('Djibouti', 'DJI', 'https://flagcdn.com/dj.svg', 'East Africa'),
('Comoros', 'COM', 'https://flagcdn.com/km.svg', 'East Africa'),
('Cape Verde', 'CPV', 'https://flagcdn.com/cv.svg', 'West Africa'),
('São Tomé and Príncipe', 'STP', 'https://flagcdn.com/st.svg', 'Central Africa'),
('Seychelles', 'SYC', 'https://flagcdn.com/sc.svg', 'East Africa');

-- Insert major African cities with coordinates
INSERT INTO cities (name, country_id, latitude, longitude, population) VALUES
-- Nigeria
('Lagos', (SELECT id FROM countries WHERE code = 'NGA'), 6.5244, 3.3792, 15000000),
('Abuja', (SELECT id FROM countries WHERE code = 'NGA'), 9.0765, 7.3986, 3000000),
('Kano', (SELECT id FROM countries WHERE code = 'NGA'), 12.0022, 8.5920, 3000000),
('Ibadan', (SELECT id FROM countries WHERE code = 'NGA'), 7.3775, 3.9470, 3000000),
('Port Harcourt', (SELECT id FROM countries WHERE code = 'NGA'), 4.8156, 7.0498, 1500000),

-- South Africa
('Cape Town', (SELECT id FROM countries WHERE code = 'ZAF'), -33.9249, 18.4241, 4000000),
('Johannesburg', (SELECT id FROM countries WHERE code = 'ZAF'), -26.2041, 28.0473, 5000000),
('Durban', (SELECT id FROM countries WHERE code = 'ZAF'), -29.8587, 31.0218, 3500000),
('Pretoria', (SELECT id FROM countries WHERE code = 'ZAF'), -25.7479, 28.2293, 2500000),

-- Kenya
('Nairobi', (SELECT id FROM countries WHERE code = 'KEN'), -1.2921, 36.8219, 5000000),
('Mombasa', (SELECT id FROM countries WHERE code = 'KEN'), -4.0435, 39.6682, 1200000),
('Kisumu', (SELECT id FROM countries WHERE code = 'KEN'), -0.1022, 34.7617, 600000),

-- Ghana
('Accra', (SELECT id FROM countries WHERE code = 'GHA'), 5.6037, -0.1870, 2500000),
('Kumasi', (SELECT id FROM countries WHERE code = 'GHA'), 6.6885, -1.6244, 2000000),
('Tamale', (SELECT id FROM countries WHERE code = 'GHA'), 9.4034, -0.8424, 500000),

-- Egypt
('Cairo', (SELECT id FROM countries WHERE code = 'EGY'), 30.0444, 31.2357, 20000000),
('Alexandria', (SELECT id FROM countries WHERE code = 'EGY'), 31.2001, 29.9187, 5000000),

-- Morocco
('Casablanca', (SELECT id FROM countries WHERE code = 'MAR'), 33.5731, -7.5898, 3500000),
('Rabat', (SELECT id FROM countries WHERE code = 'MAR'), 34.0209, -6.8416, 1800000),
('Marrakech', (SELECT id FROM countries WHERE code = 'MAR'), 31.6295, -7.9811, 1000000),

-- Ethiopia
('Addis Ababa', (SELECT id FROM countries WHERE code = 'ETH'), 9.1450, 40.4897, 5000000),

-- Uganda
('Kampala', (SELECT id FROM countries WHERE code = 'UGA'), 0.3476, 32.5825, 1700000),

-- Tanzania
('Dar es Salaam', (SELECT id FROM countries WHERE code = 'TZA'), -6.7924, 39.2083, 6000000),
('Dodoma', (SELECT id FROM countries WHERE code = 'TZA'), -6.1630, 35.7516, 400000),

-- Rwanda
('Kigali', (SELECT id FROM countries WHERE code = 'RWA'), -1.9441, 30.0619, 1200000),

-- Senegal
('Dakar', (SELECT id FROM countries WHERE code = 'SEN'), 14.7167, -17.4677, 3000000),

-- Ivory Coast
('Abidjan', (SELECT id FROM countries WHERE code = 'CIV'), 5.3600, -4.0083, 5000000),

-- Angola
('Luanda', (SELECT id FROM countries WHERE code = 'AGO'), -8.8390, 13.2894, 8000000),

-- Zimbabwe
('Harare', (SELECT id FROM countries WHERE code = 'ZWE'), -17.8252, 31.0335, 1500000),

-- Zambia
('Lusaka', (SELECT id FROM countries WHERE code = 'ZMB'), -15.3875, 28.3228, 2500000),

-- Cameroon
('Douala', (SELECT id FROM countries WHERE code = 'CMR'), 4.0483, 9.7043, 3000000),
('Yaoundé', (SELECT id FROM countries WHERE code = 'CMR'), 3.8480, 11.5021, 3000000),

-- Algeria
('Algiers', (SELECT id FROM countries WHERE code = 'DZA'), 36.7538, 3.0588, 3000000),

-- Tunisia
('Tunis', (SELECT id FROM countries WHERE code = 'TUN'), 36.8065, 10.1815, 2300000),

-- Libya
('Tripoli', (SELECT id FROM countries WHERE code = 'LBY'), 32.8872, 13.1913, 1100000),

-- Botswana
('Gaborone', (SELECT id FROM countries WHERE code = 'BWA'), -24.6282, 25.9231, 250000),

-- Namibia
('Windhoek', (SELECT id FROM countries WHERE code = 'NAM'), -22.5609, 17.0658, 400000),

-- Mauritius
('Port Louis', (SELECT id FROM countries WHERE code = 'MUS'), -20.1654, 57.5017, 150000);

-- Insert badges
INSERT INTO badges (name, description, icon, color, criteria) VALUES
('Verified Creative', 'Profile has been verified by PAAN', 'shield-check', '#34B6A7', '{"verification_required": true}'),
('Top Rated', 'Maintains a 4.5+ star rating with 10+ reviews', 'star', '#F2B706', '{"min_rating": 4.5, "min_reviews": 10}'),
('Rising Star', 'New talent with exceptional early reviews', 'trending-up', '#EC5B88', '{"account_age_months": 6, "min_rating": 4.8}'),
('Portfolio Showcase', 'Has 5+ high-quality portfolio items', 'image', '#84C1D9', '{"min_portfolio_items": 5}'),
('Quick Responder', 'Responds to inquiries within 24 hours', 'clock', '#F25849', '{"avg_response_time_hours": 24}'),
('Client Favorite', 'Highly recommended by clients', 'heart', '#EC5B88', '{"repeat_clients": 3}'),
('Award Winner', 'Recognized for exceptional work', 'award', '#F2B706', '{"manual_award": true}'),
('Community Leader', 'Active contributor to PAAN community', 'users', '#6A4C93', '{"community_contributions": 10}'),
('Specialist', 'Expert in a specific skill area', 'target', '#172840', '{"skill_proficiency": 5, "years_experience": 5}'),
('Global Reach', 'Works with clients across multiple continents', 'globe', '#34B6A7', '{"international_clients": 5}'),
('Innovation Pioneer', 'Early adopter of new technologies and trends', 'zap', '#F25849', '{"innovation_score": 8}'),
('Mentor', 'Helps other creatives grow and develop', 'graduation-cap', '#6A4C93', '{"mentorship_hours": 50}');

-- Insert sample agencies
-- Note: These are sample agencies for demonstration purposes
-- In production, these would be created through the user registration process

-- Liftup Agency in Cairo, Egypt
INSERT INTO profiles (
    id,
    email,
    full_name,
    username,
    user_type,
    status,
    phone,
    website,
    linkedin,
    bio,
    tagline,
    company_name,
    company_size,
    founded_year,
    city_id,
    is_verified,
    is_featured,
    rating,
    rating_count,
    profile_views,
    created_at
) VALUES (
    uuid_generate_v4(),
    'hello@liftupagency.com',
    'Liftup Agency',
    'liftupagency',
    'agency',
    'approved',
    '+20 2 1234 5678',
    'https://liftupagency.com',
    'https://linkedin.com/company/liftupagency',
    'Liftup Agency is a full-service creative agency based in Cairo, Egypt. We specialize in brand strategy, digital marketing, and creative design solutions for businesses across the Middle East and Africa. Our team of experienced creatives and strategists work together to deliver innovative campaigns that drive results.',
    'Elevating brands through creative excellence',
    'Liftup Agency',
    '25-50 employees',
    2018,
    (SELECT id FROM cities WHERE name = 'Cairo' AND country_id = (SELECT id FROM countries WHERE code = 'EGY')),
    true,
    true,
    4.8,
    24,
    1250,
    NOW() - INTERVAL '2 years'
);

-- Aquila East Africa in Nairobi, Kenya
INSERT INTO profiles (
    id,
    email,
    full_name,
    username,
    user_type,
    status,
    phone,
    website,
    linkedin,
    bio,
    tagline,
    company_name,
    company_size,
    founded_year,
    city_id,
    is_verified,
    is_featured,
    rating,
    rating_count,
    profile_views,
    created_at
) VALUES (
    uuid_generate_v4(),
    'info@aquilaeastafrica.com',
    'Aquila East Africa',
    'aquilaeastafrica',
    'agency',
    'approved',
    '+254 20 1234 567',
    'https://aquilaeastafrica.com',
    'https://linkedin.com/company/aquilaeastafrica',
    'Aquila East Africa is a leading digital marketing and creative agency serving the East African market. We combine local market insights with international best practices to deliver campaigns that resonate with African audiences. Our expertise spans digital strategy, content creation, and performance marketing.',
    'Empowering brands across East Africa',
    'Aquila East Africa',
    '10-25 employees',
    2020,
    (SELECT id FROM cities WHERE name = 'Nairobi' AND country_id = (SELECT id FROM countries WHERE code = 'KEN')),
    true,
    true,
    4.9,
    18,
    980,
    NOW() - INTERVAL '1 year'
);

-- Add skills for Liftup Agency
INSERT INTO profile_skills (profile_id, skill_id, is_primary, proficiency_level) VALUES
-- Get Liftup Agency profile ID and add their skills
((SELECT id FROM profiles WHERE username = 'liftupagency'), (SELECT id FROM skills WHERE name = 'Brand Identity'), true, 5),
((SELECT id FROM profiles WHERE username = 'liftupagency'), (SELECT id FROM skills WHERE name = 'Digital Marketing Strategy'), true, 5),
((SELECT id FROM profiles WHERE username = 'liftupagency'), (SELECT id FROM skills WHERE name = 'Logo Design'), false, 4),
((SELECT id FROM profiles WHERE username = 'liftupagency'), (SELECT id FROM skills WHERE name = 'Social Media Marketing'), false, 4),
((SELECT id FROM profiles WHERE username = 'liftupagency'), (SELECT id FROM skills WHERE name = 'UI/UX Design'), false, 4),
((SELECT id FROM profiles WHERE username = 'liftupagency'), (SELECT id FROM skills WHERE name = 'Content Strategy'), false, 4);

-- Add skills for Aquila East Africa
INSERT INTO profile_skills (profile_id, skill_id, is_primary, proficiency_level) VALUES
-- Get Aquila East Africa profile ID and add their skills
((SELECT id FROM profiles WHERE username = 'aquilaeastafrica'), (SELECT id FROM skills WHERE name = 'Digital Marketing Strategy'), true, 5),
((SELECT id FROM profiles WHERE username = 'aquilaeastafrica'), (SELECT id FROM skills WHERE name = 'Social Media Marketing'), true, 5),
((SELECT id FROM profiles WHERE username = 'aquilaeastafrica'), (SELECT id FROM skills WHERE name = 'Content Strategy'), false, 4),
((SELECT id FROM profiles WHERE username = 'aquilaeastafrica'), (SELECT id FROM skills WHERE name = 'SEO'), false, 4),
((SELECT id FROM profiles WHERE username = 'aquilaeastafrica'), (SELECT id FROM skills WHERE name = 'PPC Advertising'), false, 4),
((SELECT id FROM profiles WHERE username = 'aquilaeastafrica'), (SELECT id FROM skills WHERE name = 'Marketing Analytics'), false, 4);

-- Update Liftup Agency avatar
UPDATE profiles SET avatar_url = '/assets/images/avatars/liftup-avatar.svg' WHERE username = 'liftupagency';

-- Add sample portfolio items for Liftup Agency
INSERT INTO portfolio_items (profile_id, title, description, image_url, external_url, is_featured, is_public, created_at) VALUES
((SELECT id FROM profiles WHERE username = 'liftupagency'), 'Egyptian Tourism Campaign', 'A comprehensive rebranding campaign for Egyptian tourism, featuring modern design elements that celebrate the country''s rich heritage while appealing to international travelers.', '/assets/images/certified-members/liftup/1.png', 'https://liftupagency.com/work/egyptian-tourism', true, true, NOW() - INTERVAL '6 months'),
((SELECT id FROM profiles WHERE username = 'liftupagency'), 'Tech Startup Brand Identity', 'Complete brand identity design for a Cairo-based fintech startup, including logo, website design, and marketing materials.', '/assets/images/certified-members/liftup/2.png', 'https://liftupagency.com/work/fintech-brand', false, true, NOW() - INTERVAL '4 months'),
((SELECT id FROM profiles WHERE username = 'liftupagency'), 'Fashion E-commerce Platform', 'Digital marketing campaign for a luxury fashion brand, achieving 300% increase in online sales through targeted social media advertising.', '/assets/images/certified-members/liftup/3.png', 'https://liftupagency.com/work/fashion-campaign', false, true, NOW() - INTERVAL '3 months');

-- Update Aquila East Africa avatar
UPDATE profiles SET avatar_url = '/assets/images/avatars/aquila-avatar.svg' WHERE username = 'aquilaeastafrica';

-- Add sample portfolio items for Aquila East Africa
INSERT INTO portfolio_items (profile_id, title, description, image_url, external_url, is_featured, is_public, created_at) VALUES
((SELECT id FROM profiles WHERE username = 'aquilaeastafrica'), 'Kenyan Coffee Brand Launch', 'Digital marketing campaign for a premium Kenyan coffee brand, including social media strategy, influencer partnerships, and e-commerce optimization.', '/assets/images/certified-members/aquila/1.png', 'https://aquilaeastafrica.com/work/coffee-brand', true, true, NOW() - INTERVAL '5 months'),
((SELECT id FROM profiles WHERE username = 'aquilaeastafrica'), 'Safari Tourism Website', 'Complete website redesign and digital marketing strategy for a luxury safari company, resulting in 250% increase in booking inquiries.', '/assets/images/certified-members/aquila/2.png', 'https://aquilaeastafrica.com/work/safari-website', false, true, NOW() - INTERVAL '3 months'),
((SELECT id FROM profiles WHERE username = 'aquilaeastafrica'), 'Mobile Banking App Campaign', 'Performance marketing campaign for a mobile banking app, focusing on user acquisition and engagement across East African markets.', '/assets/images/certified-members/aquila/3.png', 'https://aquilaeastafrica.com/work/banking-campaign', false, true, NOW() - INTERVAL '2 months');

-- Add sample reviews for Liftup Agency
INSERT INTO reviews (reviewer_id, reviewee_id, rating, comment, is_public, created_at) VALUES
(uuid_generate_v4(), (SELECT id FROM profiles WHERE username = 'liftupagency'), 5, 'Exceptional work on our brand redesign. The team at Liftup Agency truly understands the Egyptian market and delivered beyond our expectations.', true, NOW() - INTERVAL '3 months'),
(uuid_generate_v4(), (SELECT id FROM profiles WHERE username = 'liftupagency'), 5, 'Professional, creative, and results-driven. Our tourism campaign saw a 400% increase in engagement. Highly recommended!', true, NOW() - INTERVAL '2 months'),
(uuid_generate_v4(), (SELECT id FROM profiles WHERE username = 'liftupagency'), 4, 'Great collaboration experience. The team is responsive and delivers quality work on time.', true, NOW() - INTERVAL '1 month');

-- Add sample reviews for Aquila East Africa
INSERT INTO reviews (reviewer_id, reviewee_id, rating, comment, is_public, created_at) VALUES
(uuid_generate_v4(), (SELECT id FROM profiles WHERE username = 'aquilaeastafrica'), 5, 'Aquila East Africa transformed our digital presence. Their understanding of the East African market is unmatched.', true, NOW() - INTERVAL '4 months'),
(uuid_generate_v4(), (SELECT id FROM profiles WHERE username = 'aquilaeastafrica'), 5, 'Outstanding results on our coffee brand launch. The team''s creativity and market knowledge are exceptional.', true, NOW() - INTERVAL '3 months'),
(uuid_generate_v4(), (SELECT id FROM profiles WHERE username = 'aquilaeastafrica'), 4, 'Professional service and great communication throughout the project. Delivered excellent results.', true, NOW() - INTERVAL '2 months');

-- Create a view for easy profile searching with location and skills
CREATE VIEW profile_search_view AS
SELECT 
    p.id,
    p.full_name,
    p.username,
    p.user_type,
    p.tagline,
    p.bio,
    p.avatar_url,
    p.is_verified,
    p.is_featured,
    p.rating,
    p.rating_count,
    c.name as city_name,
    c.latitude,
    c.longitude,
    co.name as country_name,
    co.code as country_code,
    co.flag_url as country_flag,
    co.region,
    array_agg(DISTINCT s.name) as skills,
    array_agg(DISTINCT sc.name) as skill_categories,
    p.created_at,
    p.last_active
FROM profiles p
LEFT JOIN cities c ON p.city_id = c.id
LEFT JOIN countries co ON c.country_id = co.id
LEFT JOIN profile_skills ps ON p.id = ps.profile_id
LEFT JOIN skills s ON ps.skill_id = s.id
LEFT JOIN skill_categories sc ON s.category_id = sc.id
WHERE p.status = 'approved'
GROUP BY p.id, c.id, co.id;
