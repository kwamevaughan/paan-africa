import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the parallax components with no SSR
const ParallaxProvider = dynamic(
  () => import('react-scroll-parallax').then(mod => ({ default: mod.ParallaxProvider })),
  { ssr: false }
);

const Parallax = dynamic(
  () => import('react-scroll-parallax').then(mod => ({ default: mod.Parallax })),
  { ssr: false }
);

export default function ParallaxSection({ openModal }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Fallback for SSR - render without parallax
    return (
      <div className="relative w-full bg-slate-900 overflow-hidden h-[70vh] min-h-[500px]">
        {/* Static background image for SSR */}
        <div 
          className="absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://ik.imagekit.io/nkmvdjnna/PAAN/contact/contact-parallax.webp')`,
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-slate-900/75 z-10" />
        
        <div className="relative h-full flex mx-auto max-w-6xl z-20">
          <div className="max-w-6xl px-6 md:px-8 py-16 flex flex-col justify-center h-full">
            <div className="max-w-2xl text-left space-y-4">
              <h3 className="text-md text-yellow-400 relative uppercase font-semibold">
                Shape the Future with Us
              </h3>
              <h2 className="text-3xl md:text-4xl text-white relative font-semibold leading-tight">
                This is your moment to co-create<br/> Africa's strongest agency ecosystem.
              </h2>
              <p className="text-white text-base md:text-lg mb-6 font-light max-w-lg">
                The PAAN Ambassador Program is your invitation to be part of something bigger — a united force of leaders building the strongest agency ecosystem Africa has ever seen.
              </p>  
              <button 
                onClick={openModal}
                className="bg-red-500 border border-red-500 text-white py-3 px-8 rounded-full hover:bg-red-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] font-medium text-sm"
              >
                Become an Ambassador
              </button>             
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ParallaxProvider>
      <div className="relative w-full bg-slate-900 overflow-hidden h-[70vh] min-h-[500px]">
        {/* Parallax background image */}
        <Parallax 
          speed={-10}
          className="absolute inset-0 w-full h-[120%]"
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://ik.imagekit.io/nkmvdjnna/PAAN/contact/contact-parallax.webp')`,
            }}
          />
        </Parallax>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-slate-900/75 z-10" />
        
        <div className="relative h-full flex mx-auto max-w-6xl z-20">
          <div className="max-w-6xl px-6 md:px-8 py-16 flex flex-col justify-center h-full">
            <div className="max-w-2xl text-left space-y-4">
              <h3 className="text-3xl text-white relative font-semibold">
                Ready to join Africa's borderless creative economy?
              </h3>
                <div className='flex gap-4'>
                    <button 
                    onClick={()=>window.href='https://membership.paan.africa/'}
                    className="bg-paan-red font-semibold border border-red-500 text-white py-3 px-8 rounded-full hover:bg-red-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] font-medium text-sm"
                    >
                        Join PAAN
                    </button> 
                    <button 
                    onClick={()=>window.location.href='/pricing'}
                    className="bg-paan-blue font-semibold border border-paan-blue text-paan-dark-blue py-3 px-8 rounded-full hover:bg-white hover:border-white transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] font-medium text-sm"
                    >
                        Explore Programs
                    </button> 
                </div>            
            </div>
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
}