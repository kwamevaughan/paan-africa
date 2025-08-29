import { useState, useEffect } from 'react';
import SEO from "@/components/SEO";
import Header from "../layouts/header";
import Footer from "@/layouts/footer";
import EventCard from "@/components/EventCard";
import { eventsData, eventCategories, eventLocations } from "@/data/eventsData";
import { Icon } from '@iconify/react';
import Image from 'next/image';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [filteredEvents, setFilteredEvents] = useState(eventsData.upcoming);

  useEffect(() => {
    let events = activeTab === 'upcoming' ? eventsData.upcoming : eventsData.past;
    
    if (selectedCategory !== 'All Events') {
      events = events.filter(event => event.category === selectedCategory);
    }
    
    if (selectedLocation !== 'All Locations') {
      events = events.filter(event => event.location === selectedLocation);
    }
    
    setFilteredEvents(events);
  }, [activeTab, selectedCategory, selectedLocation]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCategory('All Events');
    setSelectedLocation('All Locations');
  };

  return (
    <>
      <SEO 
        title="Events - PAAN Africa"
        description="Discover upcoming and past events from PAAN Africa. Join our creative industry gatherings, workshops, and networking sessions across Africa."
        keywords="PAAN events, creative industry events, Africa events, workshops, summits, networking"
      />
      <div className='relative'>
      
      <Header navLinkColor="text-gray-950" />
      
             {/* Hero Section */}
       <section className="relative pt-32 pb-16 bg-gradient-to-br from-paan-dark-blue via-paan-blue to-paan-dark-blue overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/assets/images/pattern-bg-1.webp"
            alt="Background Pattern"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              PAAN <span className="text-paan-yellow">Events</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Join Africa's creative community at our industry-leading events, workshops, and networking sessions
            </p>
            
            {/* Event Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-paan-yellow mb-2">
                  {eventsData.upcoming.length}
                </div>
                <div className="text-white/90">Upcoming Events</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-paan-yellow mb-2">
                  {eventsData.past.length}
                </div>
                <div className="text-white/90">Past Events</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-paan-yellow mb-2">
                  5+
                </div>
                <div className="text-white/90">Cities Across Africa</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
            <div className="flex bg-white rounded-full p-2 shadow-lg mb-6 sm:mb-0">
              <button
                onClick={() => handleTabChange('upcoming')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-paan-red text-white shadow-md'
                    : 'text-gray-600 hover:text-paan-red'
                }`}
              >
                <Icon icon="mdi:calendar-clock" className="w-5 h-5 inline mr-2" />
                Upcoming Events
              </button>
              <button
                onClick={() => handleTabChange('past')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'past'
                    ? 'bg-paan-red text-white shadow-md'
                    : 'text-gray-600 hover:text-paan-red'
                }`}
              >
                <Icon icon="mdi:calendar-check" className="w-5 h-5 inline mr-2" />
                Past Events
              </button>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent filter-transition"
              >
                {eventCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent filter-transition"
              >
                {eventLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isPast={activeTab === 'past'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Icon icon="mdi:calendar-remove" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No events found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or check back later for new events.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-paan-dark-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Updated with PAAN Events
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Never miss an opportunity to connect with Africa's creative community. Subscribe to our newsletter for event updates and industry insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://membership.paan.africa/"
              className="bg-paan-red hover:bg-paan-red/90 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Join the Network
            </a>
            <a
              href="/summit"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-paan-dark-blue px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            >
              Learn About Summit 2025
            </a>
          </div>
        </div>
        <Footer />
      </section>
      </div>
    </>
  );
};

export default EventsPage;
