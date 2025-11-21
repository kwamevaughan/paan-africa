/**
 * Utility functions for generating structured data (JSON-LD) for SEO
 */

/**
 * Generate Event schema for search engines
 * @param {Object} eventData - Event information
 * @returns {Object} JSON-LD structured data
 */
export const generateEventSchema = ({
  name,
  alternateName,
  description,
  startDate,
  endDate,
  eventAttendanceMode = 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus = 'https://schema.org/EventScheduled',
  location,
  images = [],
  offers = {},
  performer = {},
  organizer = {},
  audience = {},
  keywords = ''
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    ...(alternateName && { alternateName }),
    description,
    startDate,
    endDate,
    eventAttendanceMode,
    eventStatus,
    location: {
      '@type': 'Place',
      name: location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: location.streetAddress,
        addressLocality: location.city,
        addressRegion: location.region,
        postalCode: location.postalCode,
        addressCountry: location.country
      },
      ...(location.geo && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: location.geo.latitude,
          longitude: location.geo.longitude
        }
      })
    },
    ...(images.length > 0 && { image: images }),
    ...(offers.price !== undefined && {
      offers: {
        '@type': 'Offer',
        url: offers.url,
        price: offers.price,
        priceCurrency: offers.currency || 'USD',
        availability: offers.availability || 'https://schema.org/InStock',
        ...(offers.validFrom && { validFrom: offers.validFrom }),
        ...(offers.description && { description: offers.description })
      }
    }),
    ...(performer.name && {
      performer: {
        '@type': 'Organization',
        name: performer.name,
        ...(performer.url && { url: performer.url })
      }
    }),
    ...(organizer.name && {
      organizer: {
        '@type': 'Organization',
        name: organizer.name,
        ...(organizer.url && { url: organizer.url }),
        ...(organizer.logo && { logo: organizer.logo })
      }
    }),
    ...(audience.audienceType && {
      audience: {
        '@type': 'Audience',
        audienceType: audience.audienceType
      }
    }),
    ...(keywords && { keywords })
  };
};

/**
 * Generate Organization schema
 * @param {Object} orgData - Organization information
 * @returns {Object} JSON-LD structured data
 */
export const generateOrganizationSchema = ({
  name,
  url,
  logo,
  description,
  sameAs = [],
  contactPoint = {}
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    ...(sameAs.length > 0 && { sameAs }),
    ...(contactPoint.telephone && {
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: contactPoint.telephone,
        contactType: contactPoint.contactType || 'customer service',
        ...(contactPoint.email && { email: contactPoint.email })
      }
    })
  };
};
