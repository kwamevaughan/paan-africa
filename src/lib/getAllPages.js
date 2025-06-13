import { globby } from 'globby';
import path from 'path';

export async function getAllPages() {
  // Get all pages from the pages directory
  const pages = await globby([
    'src/pages/**/*.{js,jsx,ts,tsx}',
    '!src/pages/_*.{js,jsx,ts,tsx}',
    '!src/pages/api/**/*.{js,jsx,ts,tsx}',
  ]);

  // Convert file paths to routes
  return pages.map(page => {
    // Remove the src/pages prefix and file extension
    const route = page
      .replace(/^src\/pages\//, '')
      .replace(/\.(js|jsx|ts|tsx)$/, '')
      .replace(/\/index$/, '');

    return route;
  });
} 