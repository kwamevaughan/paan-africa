import React, { useState } from 'react';

const PAANSummit = () => {
  return (
    <>
      <div className='w-full pb-20'>
        <div className='bg-[#84C1D9] grid grid-cols-1 lg:grid-cols-2 min-h-[400px] relative rounded-md'>
          {/* Live Webinar Badge */}
          <div className='absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10'>
            SUMMIT
          </div>
          {/* Image Section */}
          <div className='flex items-center justify-center p-4 lg:p-6 h-full'>
            <img 
              src="/assets/images/summit-image.png" 
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
                  Nairobi, Kenya
                </div>
                <div className='flex items-center gap-2 text-[#172840]'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                  October 22-24, 2025
                </div>
              </div>
              
              <p className='text-[#172840] mb-4 leading-relaxed'>
                Unite with Africa's top creatives and tech leaders to explore bold ideas and build cross-continental partnerships.
              </p>
            </div>

            {/* Features List */}
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#172840] flex-shrink-0">
                  <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                </svg>
                <p className='text-[#172840] font-medium'>Keynotes & Panels</p>
              </div>
              
              <div className='flex items-center gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#172840] flex-shrink-0">
                  <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                </svg>
                <p className='text-[#172840] font-medium'>Networking & Collaboration</p>
              </div>
              
              <div className='flex items-center gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#172840] flex-shrink-0">
                  <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                </svg>
                <p className='text-[#172840] font-medium'>Workshops & Masterclasses</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className='pt-4'>
              <button 
                onClick={() => window.location.href = '/summit'} 
                className="bg-[#172840] hover:bg-[#D6473C] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 group text-base"
              >
                Register Now
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current group-hover:translate-x-1 transition-transform">
                  <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PAANSummit;