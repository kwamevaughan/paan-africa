import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function handler(req, res) {
  // Add authentication here if needed
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Regenerate sitemap
    await execAsync('npx next-sitemap');
    res.status(200).json({ message: 'Sitemap regenerated successfully' });
  } catch (error) {
    console.error('Error regenerating sitemap:', error);
    res.status(500).json({ message: 'Error regenerating sitemap', error: error.message });
  }
} 