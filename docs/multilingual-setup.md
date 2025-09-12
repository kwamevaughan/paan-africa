# Multilingual Setup Guide

## Overview
This application now supports multiple languages with English as the default language and French as a secondary language. The system uses Next.js built-in internationalization features for optimal performance and SEO.

## Features
- **Language Detection**: Automatically detects user's preferred language
- **SEO-Friendly URLs**: Language-specific URLs (e.g., `/en/about`, `/fr/about`)
- **Professional Language Switcher**: Dropdown in header with flags and language names
- **Server-Side Rendering**: Fast loading and better SEO
- **Fallback Support**: Graceful fallback to default language

## Supported Languages
- **English (en)**: Default language
- **French (fr)**: Secondary language

## File Structure
```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.js          # Locale-specific layout
│   │   └── page.js            # Locale-specific home page
│   └── layout.js              # Root layout (redirects to default)
├── components/
│   └── LanguageSwitcher.js    # Language switcher component
├── hooks/
│   └── useTranslations.js     # Translation hook
├── i18n.js                    # Internationalization config
├── messages/
│   ├── en.json               # English translations
│   └── fr.json               # French translations
└── middleware.js              # Language routing middleware
```

## How to Use

### 1. Adding New Translations
To add new text content, update both language files:

**English (`src/messages/en.json`):**
```json
{
  "newSection": {
    "title": "New Section Title",
    "description": "New section description"
  }
}
```

**French (`src/messages/fr.json`):**
```json
{
  "newSection": {
    "title": "Titre de la Nouvelle Section",
    "description": "Description de la nouvelle section"
  }
}
```

### 2. Using Translations in Components
```jsx
import { useTranslations } from 'next-intl';

const MyComponent = () => {
  const t = useTranslations();
  
  return (
    <div>
      <h1>{t('newSection.title')}</h1>
      <p>{t('newSection.description')}</p>
    </div>
  );
};
```

### 3. Using the Custom Hook
```jsx
import { useAppTranslations } from '../hooks/useTranslations';

const MyComponent = () => {
  const { t, tn } = useAppTranslations();
  
  return (
    <div>
      <h1>{tn('newSection', 'title')}</h1>
      <p>{t('newSection.description')}</p>
    </div>
  );
};
```

## Adding New Languages

### 1. Update Configuration
Add the new language to `src/i18n.js`:
```javascript
export const locales = ['en', 'fr', 'es']; // Add Spanish
export const localeNames = {
  en: 'English',
  fr: 'Français',
  es: 'Español' // Add Spanish name
};
export const localeFlags = {
  en: '🇺🇸',
  fr: '🇫🇷',
  es: '🇪🇸' // Add Spanish flag
};
```

### 2. Create Translation File
Create `src/messages/es.json` with Spanish translations.

### 3. Update Middleware
The middleware automatically handles new languages from the configuration.

## URL Structure
- **English**: `/en/` (default)
- **French**: `/fr/`
- **Root**: `/` (redirects to `/en/`)

## Best Practices
1. **Always use translation keys** instead of hardcoded text
2. **Keep translation keys organized** by feature/section
3. **Test both languages** when adding new content
4. **Use descriptive key names** for better maintainability
5. **Provide fallbacks** for missing translations

## Troubleshooting

### Language Switcher Not Working
- Check that `next-intl` is properly installed
- Verify middleware configuration
- Ensure locale files exist and are valid JSON

### Translations Not Loading
- Check file paths in `src/app/[locale]/layout.js`
- Verify JSON syntax in translation files
- Check browser console for errors

### SEO Issues
- Ensure all pages have proper `lang` attributes
- Verify that language-specific URLs are accessible
- Check sitemap generation includes all locales

## Performance Considerations
- Translation files are loaded on-demand
- Server-side rendering ensures fast initial load
- Language detection is handled efficiently
- Minimal bundle size impact

## Future Enhancements
- **Language Persistence**: Save user's language preference
- **Auto-detection**: Detect language from browser settings
- **RTL Support**: Add support for right-to-left languages
- **Translation Management**: Admin interface for managing translations
