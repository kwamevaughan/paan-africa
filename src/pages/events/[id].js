import { useRouter } from 'next/router';
import SEO from "@/components/SEO";
import Header from "../../layouts/header";
import Footer from "../../layouts/footer";
import EventDetail from "@/components/EventDetail";
import { eventsData } from "@/data/eventsData";
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Image from 'next/image';

const EventDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Find the event by ID
  const allEvents = [...eventsData.upcoming, ...eventsData.past];
  const event = allEvents.find(e => e.id === parseInt(id));
  const isPast = eventsData.past.some(e => e.id === parseInt(id));

  if (!event) {
    return (
      <>
        <SEO 
          title="Event Not Found - PAAN Africa"
          description="The requested event could not be found."
        />
        <div className='relative'>
        <Header navLinkColor="text-gray-950" />
        
                 <div className="pt-32 pb-16 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <Icon icon="mdi:alert-circle" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                The event you're looking for doesn't exist or has been removed.
              </p>
              <Link
                href="/events"
                className="bg-paan-red hover:bg-paan-red/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
              >
                Back to Events
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title={`${event.title} - PAAN Africa`}
        description={event.description}
        keywords={`${event.title}, ${event.category}, PAAN events, ${event.location}`}
      />

      <div className='relative'>
      
      <Header navLinkColor="text-gray-950" />
      
             {/* Breadcrumb */}
       <div className="pt-32 pb-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-paan-red transition-colors">
              Home
            </Link>
            <Icon icon="mdi:chevron-right" className="w-4 h-4" />
            <Link href="/events" className="hover:text-paan-red transition-colors">
              Events
            </Link>
            <Icon icon="mdi:chevron-right" className="w-4 h-4" />
            <span className="text-paan-dark-blue font-medium">{event.title}</span>
          </nav>
        </div>
      </div>

      {/* Event Detail Content */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <EventDetail event={event} isPast={isPast} />
        </div>
      </div>

      {/* Related Events */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-paan-dark-blue text-center mb-12">
            Related Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allEvents
              .filter(e => e.id !== event.id && e.category === event.category)
              .slice(0, 3)
              .map((relatedEvent) => (
                <div key={relatedEvent.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-paan-dark-blue mb-2 line-clamp-2">
                      {relatedEvent.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {new Date(relatedEvent.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <Link
                      href={`/events/${relatedEvent.id}`}
                      className="text-paan-red hover:text-paan-red/80 font-semibold text-sm transition-colors"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/events"
              className="bg-paan-dark-blue hover:bg-paan-dark-blue/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              View All Events
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      </div>
    </>
  );
};

export default EventDetailPage;
