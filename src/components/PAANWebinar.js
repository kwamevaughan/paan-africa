import React, { useState } from 'react';
import TicketPurchaseButton from './TicketPurchaseButton';

const PAANWebinar = () => {
  return (
    <>
      <div className='w-full pb-4'>
        <div className='bg-[#F25849] grid grid-cols-1 lg:grid-cols-2 min-h-[400px] relative rounded-md'>
          {/* Live Webinar Badge */}
          <div className='absolute top-4 right-4 bg-[#172840] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10'>
            LIVE WEBINAR
          </div>
          {/* Image Section */}
          <div className='flex items-center justify-center p-4 lg:p-6 h-full'>
            <img 
              src="/assets/images/webinar-image.png" 
              width={0} 
              height={0} 
              alt="PAAN Portal Dashboard" 
              className="rounded-lg w-full max-w-sm lg:max-w-md object-cover h-full" 
            />
          </div>
          
          {/* Content Section */}
          <div className='flex flex-col justify-center p-4 lg:p-6 space-y-4'>
            <div>
              <h2 className='text-2xl lg:text-3xl font-bold text-[#172840] mb-3'>
                AI for Client Retention & Growth
              </h2>
              
              <div className='flex flex-col sm:flex-row gap-4 mb-4'>
                <div className='flex items-center gap-2 text-[#172840]'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Virtual
                </div>
                <div className='flex items-center gap-2 text-[#172840]'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                  July 2, 2025
                </div>
                <div className='flex items-center gap-2 text-[#172840]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m0 2a1 1 0 0 1 .993.883L13 7v4.586l2.707 2.707a1 1 0 0 1-1.32 1.497l-.094-.083l-3-3a1 1 0 0 1-.284-.576L11 12V7a1 1 0 0 1 1-1"/></g></svg>
                  12PM EAT
                </div>
              </div>
              
              <p className='text-[#172840] mb-4 leading-relaxed'>
                Discover how account managers can use AI to strengthen client relationships, save time, and unlock new opportunities.
              </p>
            </div>

            {/* Features List */}
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#172840] flex-shrink-0">
                  <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                </svg>
                <p className='text-[#172840] font-medium'>Insights from PAAN & AMS</p>
              </div>
              
              <div className='flex items-center gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#172840] flex-shrink-0">
                  <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                </svg>
                <p className='text-[#172840] font-medium'>Use cases for agencies</p>
              </div>
              
              <div className='flex items-center gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#172840] flex-shrink-0">
                  <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                </svg>
                <p className='text-[#172840] font-medium'>Live Q&A session</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className='pt-4'>
              <TicketPurchaseButton 
                variant="primary" 
                size="md"
                className="bg-[#172840] hover:bg-[#84C1D9] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 group text-base"
              >
                Register Now
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current group-hover:translate-x-1 transition-transform">
                  <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"/>
                </svg>
              </TicketPurchaseButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PAANWebinar;