import { useState, useEffect } from 'react';
import SEO from "@/components/SEO";
import Header from "../layouts/header";
import Footer from "@/layouts/footer";
import EventCard from "@/components/EventCard";
import { eventsData, eventCategories, eventLocations } from "@/data/eventsData";
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useAppTranslations } from '../hooks/useTranslations';

const EventsPage = () => {
  const { t } = useAppTranslations();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(t('events.filters.allEvents'));
  const [selectedLocation, setSelectedLocation] = useState(t('events.filters.allLocations'));
  const [filteredEvents, setFilteredEvents] = useState([
    ...eventsData.upcoming,
    ...eventsData.past
  ]);

  useEffect(() => {
    let events;
    if (activeTab === 'upcoming') {
      events = eventsData.upcoming;
    } else if (activeTab === 'past') {
      events = eventsData.past;
    } else {
      events = [...eventsData.upcoming, ...eventsData.past];
    }
    
    if (selectedCategory !== t('events.filters.allEvents')) {
      events = events.filter(event => event.category === selectedCategory);
    }
    
    if (selectedLocation !== t('events.filters.allLocations')) {
      events = events.filter(event => event.location === selectedLocation);
    }
    
    setFilteredEvents(events);
  }, [activeTab, selectedCategory, selectedLocation, t]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCategory(t('events.filters.allEvents'));
    setSelectedLocation(t('events.filters.allLocations'));
  };

  return (
    <>
      <SEO 
        title={t('events.seo.title')}
        description={t('events.seo.description')}
        keywords={t('events.seo.keywords')}
      />
      <div className='relative'>
      
      <Header navLinkColor="text-gray-950" />
      
             {/* Hero Section */}
       <section className="relative pt-32 pb-16 bg-gradient-to-br from-paan-dark-blue via-paan-blue to-paan-dark-blue overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/assets/images/pattern-bg-1.webp"
            alt={t('events.altText.backgroundPattern')}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('events.hero.title')} <span className="text-paan-yellow">{t('events.hero.titleHighlight')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {t('events.hero.description')}
            </p>
            
            {/* Event Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-paan-yellow mb-2">
                  {eventsData.upcoming.length}
                </div>
                <div className="text-white/90">{t('events.hero.stats.upcomingEvents')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-paan-yellow mb-2">
                  10+
                </div>
                <div className="text-white/90">{t('events.hero.stats.pastEvents')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-paan-yellow mb-2">
                  20+
                </div>
                <div className="text-white/90">{t('events.hero.stats.citiesAcrossAfrica')}</div>
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
                onClick={() => handleTabChange('all')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'all'
                    ? 'bg-paan-red text-white shadow-md'
                    : 'text-gray-600 hover:text-paan-red'
                }`}
              >
                <Icon icon="mdi:calendar-month" className="w-5 h-5 inline mr-2" />
                {t('events.tabs.allEvents')}
              </button>
              <button
                onClick={() => handleTabChange('upcoming')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-paan-red text-white shadow-md'
                    : 'text-gray-600 hover:text-paan-red'
                }`}
              >
                <Icon icon="mdi:calendar-clock" className="w-5 h-5 inline mr-2" />
                {t('events.tabs.upcomingEvents')}
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
                {t('events.tabs.pastEvents')}
              </button>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent filter-transition"
              >
                <option value="All Events">{t('events.filters.allEvents')}</option>
                {eventCategories.filter(category => category !== 'All Events').map((category) => (
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
                <option value="All Locations">{t('events.filters.allLocations')}</option>
                {eventLocations.filter(location => location !== 'All Locations').map((location) => (
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
                  isPast={activeTab === 'past' ? true : activeTab === 'upcoming' ? false : event.status === 'past'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Icon icon="mdi:calendar-remove" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {t('events.noEventsFound.title')}
              </h3>
              <p className="text-gray-500">
                {t('events.noEventsFound.description')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-paan-blue text-paan-dark-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center pb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-paan-dark-blue mb-6">
            {t('events.cta.title')}
          </h2>
          <p className="text-xl text-paan-dark-blue/90 mb-8 max-w-2xl mx-auto">
            {t('events.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://membership.paan.africa/"
              className="bg-paan-red hover:bg-paan-red/90 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
                             {t('events.cta.joinNetwork')}
            </a>
            <a
              href="/summit"
              className="bg-transparent border-2 border-paan-dark-blue text-paan-dark-blue hover:border-white hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            >
                             {t('events.cta.learnAboutSummit')}
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
