import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const Hero = ({ sectionRefs, handleScroll, timeLeft }) => {
  return (
    <>
      <motion.div
        className="relative h-[60vh] sm:h-[70vh] md:h-[75vh] w-full" 
        id="home"
        ref={sectionRefs.home}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Full background image with parallax effect */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero.png')",
            filter: "brightness(0.5)"
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Gradient overlay for better text readability */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
               
        {/* Content overlay */}
        <div className="relative h-full flex items-end pb-4 sm:pb-6 md:pb-8 lg:pb-10">
          <div className="mx-auto max-w-6xl w-full px-3 sm:px-4">
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.h1 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold uppercase text-paan-yellow mb-3 sm:mb-4 md:mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Register for PAAN Summit 2026
              </motion.h1>            
              <motion.div 
                className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3 sm:mb-4 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <SeminarLocationAndDate />
              </motion.div>
              <motion.p 
                className="text-xs sm:text-sm md:text-base font-semibold text-paan-red mb-2 sm:mb-3 md:mb-4 leading-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                Limited early-bird discounts available.
              </motion.p>
              <motion.div 
                className="text-xs sm:text-sm md:text-base font-normal text-white mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <p className="mb-2">Early-bird price increases in:</p>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <div className="bg-paan-dark-blue/80 px-3 py-2 rounded-lg text-center min-w-[60px]">
                    <div className="text-lg sm:text-xl font-bold">{timeLeft.days}</div>
                    <div className="text-xs">days</div>
                  </div>
                  <div className="bg-paan-dark-blue/80 px-3 py-2 rounded-lg text-center min-w-[60px]">
                    <div className="text-lg sm:text-xl font-bold">{timeLeft.hours}</div>
                    <div className="text-xs">hours</div>
                  </div>
                  <div className="bg-paan-dark-blue/80 px-3 py-2 rounded-lg text-center min-w-[60px]">
                    <div className="text-lg sm:text-xl font-bold">{timeLeft.minutes}</div>
                    <div className="text-xs">mins</div>
                  </div>
                  <div className="bg-paan-dark-blue/80 px-3 py-2 rounded-lg text-center min-w-[60px]">
                    <div className="text-lg sm:text-xl font-bold">{timeLeft.seconds}</div>
                    <div className="text-xs">secs</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const SeminarLocationAndDate = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:map-marker" className="text-red-500 flex-shrink-0" width="16" height="16" />
        <span className="break-words sm:whitespace-nowrap">Sarit Centre, Nairobi, Kenya - <strong>21–22 April 2026</strong></span>
      </div>
      
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:user-group" className="text-red-500 flex-shrink-0" width="16" height="16" />
        <span className="whitespace-nowrap">500+ In Person</span>
      </div>
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:globe" className="text-red-500 flex-shrink-0" width="16" height="16" />
        <span className="whitespace-nowrap">2,000+ Streaming</span>
      </div>
    </div>
  );
};

export default Hero;
