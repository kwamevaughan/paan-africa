import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Disable default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to upload file to Supabase Storage
async function uploadFile(file, folder = 'profiles') {
  try {
    const fileExtension = path.extname(file.originalFilename);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = `${folder}/${fileName}`;

    // Read file data
    const fileData = fs.readFileSync(file.filepath);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('talent-assets')
      .upload(filePath, fileData, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('talent-assets')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('File upload error:', error);
    return null;
  }
}

// Helper function to validate skills
async function validateSkills(skillNames) {
  if (!Array.isArray(skillNames) || skillNames.length === 0) {
    return [];
  }

  const { data: skills, error } = await supabase
    .from('skills')
    .select('id, name')
    .in('name', skillNames);

  if (error) {
    console.error('Skills validation error:', error);
    return [];
  }

  return skills;
}

// Helper function to get or create city
async function getOrCreateCity(cityName, countryName) {
  try {
    // First, get the country
    const { data: country, error: countryError } = await supabase
      .from('countries')
      .select('id')
      .eq('name', countryName)
      .single();

    if (countryError || !country) {
      throw new Error(`Country not found: ${countryName}`);
    }

    // Check if city exists
    const { data: existingCity, error: cityError } = await supabase
      .from('cities')
      .select('id')
      .eq('name', cityName)
      .eq('country_id', country.id)
      .single();

    if (existingCity) {
      return existingCity.id;
    }

    // Create new city (you might want to get coordinates from a geocoding service)
    const { data: newCity, error: createError } = await supabase
      .from('cities')
      .insert({
        name: cityName,
        country_id: country.id,
        latitude: 0, // You should implement geocoding
        longitude: 0
      })
      .select('id')
      .single();

    if (createError) {
      throw new Error(`Failed to create city: ${createError.message}`);
    }

    return newCity.id;
  } catch (error) {
    console.error('City lookup/creation error:', error);
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse form data
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB
      maxFiles: 11, // 1 avatar + 10 portfolio images
    });

    const [fields, files] = await form.parse(req);

    // Extract form data
    const profileData = {
      full_name: fields.full_name?.[0],
      username: fields.username?.[0],
      email: fields.email?.[0],
      phone: fields.phone?.[0],
      user_type: fields.user_type?.[0],
      tagline: fields.tagline?.[0],
      bio: fields.bio?.[0],
      country: fields.country?.[0],
      city: fields.city?.[0],
      website: fields.website?.[0],
      linkedin: fields.linkedin?.[0],
      twitter: fields.twitter?.[0],
      instagram: fields.instagram?.[0],
      company_name: fields.company_name?.[0],
      company_size: fields.company_size?.[0],
      founded_year: fields.founded_year?.[0] ? parseInt(fields.founded_year[0]) : null,
      skills: fields.skills ? JSON.parse(fields.skills[0]) : [],
      portfolio_description: fields.portfolio_description?.[0]
    };

    // Validate required fields
    if (!profileData.full_name || !profileData.username || !profileData.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if username already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', profileData.username)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Upload avatar if provided
    let avatarUrl = null;
    if (files.avatar_files && files.avatar_files[0]) {
      avatarUrl = await uploadFile(files.avatar_files[0], 'avatars');
    }

    // Upload portfolio images if provided
    let portfolioUrls = [];
    if (files.portfolio_files) {
      const portfolioFiles = Array.isArray(files.portfolio_files) 
        ? files.portfolio_files 
        : [files.portfolio_files];
      
      for (const file of portfolioFiles) {
        const url = await uploadFile(file, 'portfolio');
        if (url) portfolioUrls.push(url);
      }
    }

    // Get city ID
    const cityId = await getOrCreateCity(profileData.city, profileData.country);
    if (!cityId) {
      return res.status(400).json({ error: 'Invalid city or country' });
    }

    // Validate skills
    const validSkills = await validateSkills(profileData.skills);

    // Create user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: uuidv4(), // Generate UUID for profile
        email: profileData.email,
        full_name: profileData.full_name,
        username: profileData.username,
        user_type: profileData.user_type,
        phone: profileData.phone,
        bio: profileData.bio,
        tagline: profileData.tagline,
        avatar_url: avatarUrl,
        city_id: cityId,
        website: profileData.website,
        linkedin: profileData.linkedin,
        twitter: profileData.twitter,
        instagram: profileData.instagram,
        company_name: profileData.company_name,
        company_size: profileData.company_size,
        founded_year: profileData.founded_year,
        status: 'pending' // Requires approval
      })
      .select()
      .single();

    if (profileError) {
      console.error('Profile creation error:', profileError);
      return res.status(500).json({ error: 'Failed to create profile' });
    }

    // Add user skills
    if (validSkills.length > 0) {
      const skillInserts = validSkills.map(skill => ({
        profile_id: profile.id,
        skill_id: skill.id,
        proficiency_level: 3, // Default proficiency
        is_primary: false
      }));

      const { error: skillsError } = await supabase
        .from('profile_skills')
        .insert(skillInserts);

      if (skillsError) {
        console.error('Skills insertion error:', skillsError);
      }
    }

    // Create portfolio items if images were uploaded
    if (portfolioUrls.length > 0) {
      const portfolioInserts = portfolioUrls.map((url, index) => ({
        profile_id: profile.id,
        title: `Portfolio Item ${index + 1}`,
        description: profileData.portfolio_description || '',
        image_url: url,
        display_order: index,
        is_public: true
      }));

      const { error: portfolioError } = await supabase
        .from('portfolio_items')
        .insert(portfolioInserts);

      if (portfolioError) {
        console.error('Portfolio creation error:', portfolioError);
      }
    }

    // Send notification email (you can implement this)
    // await sendNotificationEmail(profileData.email, profile.id);

    return res.status(201).json({
      success: true,
      message: 'Profile submitted successfully',
      profile: {
        id: profile.id,
        full_name: profile.full_name,
        username: profile.username,
        status: profile.status
      }
    });

  } catch (error) {
    console.error('Profile submission error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Helper function to send notification email
async function sendNotificationEmail(email, profileId) {
  // Implement email notification logic here
  // You can use nodemailer or any email service
  console.log(`Sending notification email to ${email} for profile ${profileId}`);
}
