import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const EventCard = ({ event, isPast = false }) => {
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
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {event.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-paan-yellow text-paan-dark-blue px-3 py-1 rounded-full text-xs font-bold shadow-md">
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`${getCategoryColor(event.category)} px-3 py-1 rounded-full text-xs font-bold shadow-md`}>
            {event.category}
          </span>
        </div>
        {isPast && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-paan-dark-blue px-4 py-2 rounded-full font-bold">
              Past Event
            </span>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Event Title */}
        <h3 className="text-xl font-bold text-paan-dark-blue mb-3 line-clamp-2 group-hover:text-paan-red transition-colors duration-300">
          {event.title}
        </h3>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Icon icon="mdi:calendar" className="w-4 h-4 mr-2 text-paan-red" />
            <span className="text-sm">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Icon icon="mdi:clock-outline" className="w-4 h-4 mr-2 text-paan-red" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Icon icon="mdi:map-marker" className="w-4 h-4 mr-2 text-paan-red" />
            <span className="text-sm">{event.location}</span>
          </div>
          {event.venue && (
            <div className="flex items-center text-gray-600">
              <Icon icon="mdi:office-building" className="w-4 h-4 mr-2 text-paan-red" />
              <span className="text-sm">{event.venue}</span>
            </div>
          )}
        </div>

        {/* Event Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>

        {/* Past Event Stats */}
        {isPast && event.attendees && (
          <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Icon icon="mdi:account-group" className="w-4 h-4 mr-1 text-paan-blue" />
              <span className="text-sm text-gray-600">{event.attendees} attendees</span>
            </div>
            {event.speakers && (
              <div className="flex items-center">
                <Icon icon="mdi:microphone" className="w-4 h-4 mr-1 text-paan-blue" />
                <span className="text-sm text-gray-600">{event.speakers} speakers</span>
              </div>
            )}
          </div>
        )}

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="text-paan-dark-blue font-semibold">
            {event.price}
          </div>
          <Link
            href={`/events/${event.id}`}
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
              isPast
                ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                : 'bg-paan-red text-white hover:bg-paan-red/90 hover:scale-105'
            }`}
          >
            {isPast ? 'View Details' : 'Register Now'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
