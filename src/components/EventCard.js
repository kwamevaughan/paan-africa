import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useState } from 'react';

const EventCard = ({ event, isPast = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPasscode = () => {
    if (event.zoomPasscode) {
      navigator.clipboard.writeText(event.zoomPasscode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Summit': 'bg-paan-red text-white',
      'Workshop': 'bg-paan-blue text-paan-dark-blue',
      'Webinar': 'bg-paan-green text-white',
      'Seminar': 'bg-paan-maroon text-white',
      'Forum': 'bg-paan-purple text-white'
    };
    return colors[category] || 'bg-gray-200 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group event-card-hover">
      {/* Event Image */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {event.featured && (
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
            <span className="bg-paan-yellow text-paan-dark-blue px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-md">
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
          <span className={`${getCategoryColor(event.category)} px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-md`}>
            {event.category}
          </span>
        </div>
        {isPast && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-paan-dark-blue px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-sm">
              Past Event
            </span>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-4 sm:p-6">
        {/* Event Title */}
        <h3 className="text-lg sm:text-xl font-bold text-paan-dark-blue mb-3 line-clamp-2 group-hover:text-paan-red transition-colors duration-300">
          {event.title}
        </h3>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Icon icon="mdi:calendar" className="w-4 h-4 mr-2 text-paan-red flex-shrink-0" />
            <span className="text-xs sm:text-sm">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Icon icon="mdi:clock-outline" className="w-4 h-4 mr-2 text-paan-red flex-shrink-0" />
            <span className="text-xs sm:text-sm">{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Icon icon="mdi:map-marker" className="w-4 h-4 mr-2 text-paan-red flex-shrink-0" />
            <span className="text-xs sm:text-sm">{event.location}</span>
          </div>
          {event.venue && (
            <div className="flex items-center text-gray-600">
              <Icon icon="mdi:office-building" className="w-4 h-4 mr-2 text-paan-red flex-shrink-0" />
              <span className="text-xs sm:text-sm">{event.venue}</span>
            </div>
          )}
        </div>

        {/* Event Description */}
        <p className="text-gray-700 text-xs sm:text-sm mb-4 line-clamp-3">
          {event.description}
        </p>

        {/* Past Event Stats */}
        {isPast && event.attendees && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg gap-2">
            <div className="flex items-center">
              <Icon icon="mdi:account-group" className="w-4 h-4 mr-1 text-paan-blue flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-600">{event.attendees} attendees</span>
            </div>
            {event.speakers && (
              <div className="flex items-center">
                <Icon icon="mdi:microphone" className="w-4 h-4 mr-1 text-paan-blue flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-600">{event.speakers} speakers</span>
              </div>
            )}
          </div>
        )}

        {/* Price and CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-paan-dark-blue font-semibold text-sm sm:text-base">
            {event.price}
          </div>
          {isPast ? (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 bg-paan-red text-white hover:bg-paan-red/90 hover:scale-105 flex items-center justify-center gap-1"
                >
                  {event.registrationUrl.includes('youtube.com') ? (
                    <>
                      <Icon icon="mdi:youtube" className="w-3 h-3 sm:w-4 sm:h-4" />
                      Watch
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:play-circle" className="w-3 h-3 sm:w-4 sm:h-4" />
                      Watch Recording
                    </>
                  )}
                </a>
              )}
              <Link
                href={`/events/${event.id}`}
                className="px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 bg-gray-200 text-gray-600 hover:bg-gray-300 text-center"
              >
                Details
              </Link>
            </div>
          ) : (
            <Link
              href={event.registrationUrl || `/events/${event.id}`}
              target={event.registrationUrl && event.registrationUrl.startsWith('http') ? '_blank' : '_self'}
              rel={event.registrationUrl && event.registrationUrl.startsWith('http') ? 'noopener noreferrer' : ''}
              className="px-4 sm:px-6 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 bg-paan-red text-white hover:bg-paan-red/90 hover:scale-105 w-full sm:w-auto text-center"
            >
              Register Now
            </Link>
          )}
        </div>

        {/* Zoom Passcode for Past Events */}
        {isPast && event.zoomPasscode && (
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
            <span className="font-semibold text-[#172840] text-xs sm:text-sm">Passcode:</span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm">{event.zoomPasscode}</span>
              <button
                onClick={handleCopyPasscode}
                className="px-2 py-1 rounded hover:bg-gray-200 transition text-[#F25849] font-bold flex items-center gap-1 focus:outline-none"
                title="Copy passcode"
                type="button"
              >
                <Icon icon="mdi:content-copy" className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="sr-only">Copy</span>
              </button>
              {copied && (
                <span className="text-green-600 text-xs transition-opacity duration-200">Copied!</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
