import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import TicketPurchaseButton from './TicketPurchaseButton';

const EventDetail = ({ event, isPast = false }) => {
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
    <div className="max-w-4xl mx-auto">
      {/* Event Header */}
      <div className="relative h-96 rounded-xl overflow-hidden mb-8">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-3 mb-4">
            {event.featured && (
              <span className="bg-paan-yellow text-paan-dark-blue px-3 py-1 rounded-full text-sm font-bold">
                Featured
              </span>
            )}
            <span className={`${getCategoryColor(event.category)} px-3 py-1 rounded-full text-sm font-bold`}>
              {event.category}
            </span>
            {isPast && (
              <span className="bg-white text-paan-dark-blue px-3 py-1 rounded-full text-sm font-bold">
                Past Event
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {event.title}
          </h1>
          <p className="text-white/90 text-lg">
            {formatDate(event.date)} • {event.time}
          </p>
        </div>
      </div>

      {/* Event Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-paan-dark-blue mb-6">About This Event</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {event.description}
            </p>
            
            {/* Additional details can be added here */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-paan-dark-blue mb-4">What to Expect</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Icon icon="mdi:check-circle" className="w-5 h-5 text-paan-green mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Networking opportunities with industry professionals</span>
                </li>
                <li className="flex items-start">
                  <Icon icon="mdi:check-circle" className="w-5 h-5 text-paan-green mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Expert-led sessions and workshops</span>
                </li>
                <li className="flex items-start">
                  <Icon icon="mdi:check-circle" className="w-5 h-5 text-paan-green mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Latest industry insights and trends</span>
                </li>
                <li className="flex items-start">
                  <Icon icon="mdi:check-circle" className="w-5 h-5 text-paan-green mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Interactive Q&A sessions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky-sidebar">
            <h3 className="text-xl font-bold text-paan-dark-blue mb-6">Event Details</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <Icon icon="mdi:calendar" className="w-5 h-5 text-paan-red mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-paan-dark-blue">Date</div>
                  <div className="text-gray-600">{formatDate(event.date)}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Icon icon="mdi:clock-outline" className="w-5 h-5 text-paan-red mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-paan-dark-blue">Time</div>
                  <div className="text-gray-600">{event.time}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Icon icon="mdi:map-marker" className="w-5 h-5 text-paan-red mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-paan-dark-blue">Location</div>
                  <div className="text-gray-600">{event.location}</div>
                </div>
              </div>
              
              {event.venue && (
                <div className="flex items-start">
                  <Icon icon="mdi:office-building" className="w-5 h-5 text-paan-red mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-paan-dark-blue">Venue</div>
                    <div className="text-gray-600">{event.venue}</div>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <Icon icon="mdi:currency-usd" className="w-5 h-5 text-paan-red mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-paan-dark-blue">Price</div>
                  <div className="text-gray-600">{event.price}</div>
                </div>
              </div>
            </div>

            {/* Past Event Stats */}
            {isPast && event.attendees && (
              <div className="border-t pt-6 mb-6">
                <h4 className="font-semibold text-paan-dark-blue mb-4">Event Highlights</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Attendees</span>
                    <span className="font-semibold text-paan-dark-blue">{event.attendees}</span>
                  </div>
                  {event.speakers && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Speakers</span>
                      <span className="font-semibold text-paan-dark-blue">{event.speakers}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA Button */}
            {isPast ? (
              <Link
                href="#"
                className="w-full text-center px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-gray-200 text-gray-600 hover:bg-gray-300"
              >
                View Event Summary
              </Link>
            ) : (
              <TicketPurchaseButton 
                variant="primary" 
                size="md"
                className="w-full text-center px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-paan-red text-white hover:bg-paan-red/90 hover:scale-105"
              >
                Register Now
              </TicketPurchaseButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
