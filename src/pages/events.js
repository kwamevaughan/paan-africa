import { useState, useEffect } from 'react';
import SEO from "@/components/SEO";
import Header from "@/layouts/standard-header";
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
       <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-paan-dark-blue via-paan-blue to-paan-dark-blue overflow-hidden">
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {t('events.hero.title')} <span className="text-paan-yellow">{t('events.hero.titleHighlight')}</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed px-2">
              {t('events.hero.description')}
            </p>
            
            {/* Event Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-paan-yellow mb-2">
                  {eventsData.upcoming.length}
                </div>
                <div className="text-sm sm:text-base text-white/90">{t('events.hero.stats.upcomingEvents')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-paan-yellow mb-2">
                  10+
                </div>
                <div className="text-sm sm:text-base text-white/90">{t('events.hero.stats.pastEvents')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-paan-yellow mb-2">
                  20+
                </div>
                <div className="text-sm sm:text-base text-white/90">{t('events.hero.stats.citiesAcrossAfrica')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-8 sm:mb-12 gap-6">
            <div className="flex flex-col sm:flex-row bg-white rounded-full p-1 sm:p-2 shadow-lg w-full sm:w-auto">
              <button
                onClick={() => handleTabChange('all')}
                className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
                  activeTab === 'all'
                    ? 'bg-paan-red text-white shadow-md'
                    : 'text-gray-600 hover:text-paan-red'
                }`}
              >
                <Icon icon="mdi:calendar-month" className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
                <span className="hidden xs:inline">{t('events.tabs.allEvents')}</span>
                <span className="xs:hidden">All</span>
              </button>
              <button
                onClick={() => handleTabChange('upcoming')}
                className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
                  activeTab === 'upcoming'
                    ? 'bg-paan-red text-white shadow-md'
                    : 'text-gray-600 hover:text-paan-red'
                }`}
              >
                <Icon icon="mdi:calendar-clock" className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
                <span className="hidden xs:inline">{t('events.tabs.upcomingEvents')}</span>
                <span className="xs:hidden">Upcoming</span>
              </button>
              <button
                onClick={() => handleTabChange('past')}
                className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
                  activeTab === 'past'
                    ? 'bg-paan-red text-white shadow-md'
                    : 'text-gray-600 hover:text-paan-red'
                }`}
              >
                <Icon icon="mdi:calendar-check" className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
                <span className="hidden xs:inline">{t('events.tabs.pastEvents')}</span>
                <span className="xs:hidden">Past</span>
              </button>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent filter-transition text-sm sm:text-base w-full sm:w-auto"
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
                className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent filter-transition text-sm sm:text-base w-full sm:w-auto"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isPast={activeTab === 'past' ? true : activeTab === 'upcoming' ? false : event.status === 'past'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <Icon icon="mdi:calendar-remove" className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                {t('events.noEventsFound.title')}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 px-4">
                {t('events.noEventsFound.description')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-paan-blue text-paan-dark-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12 sm:pb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-paan-dark-blue mb-4 sm:mb-6">
            {t('events.cta.title')}
          </h2>
          <p className="text-lg sm:text-xl text-paan-dark-blue/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            {t('events.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
            <a
              href="https://membership.paan.africa/"
              className="bg-paan-red hover:bg-paan-red/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
            >
              {t('events.cta.joinNetwork')}
            </a>
            <a
              href="/summit"
              className="bg-transparent border-2 border-paan-dark-blue text-paan-dark-blue hover:border-white hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 w-full sm:w-auto text-center"
            >
              {t('events.cta.learnAboutSummit')}
            </a>
          </div>
        </div>
      </section>
      <Footer />
      </div>
    </>
  );
};

export default EventsPage;
