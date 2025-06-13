import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  try {
    // Fetch the latest sitemap from the database
    const { data, error } = await supabase
      .from('sitemap')
      .select('content')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('Error fetching sitemap:', error);
      return res.status(500).json({ error: 'Failed to fetch sitemap' });
    }

    if (!data) {
      return res.status(404).json({ error: 'Sitemap not found' });
    }

    // Set the content type to XML
    res.setHeader('Content-Type', 'application/xml');
    
    // Send the sitemap content
    res.status(200).send(data.content);
  } catch (error) {
    console.error('Error serving sitemap:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 