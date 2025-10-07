import { motion } from 'framer-motion';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Hero = ({ sectionRefs, handleScroll, isFixed, scrollToSection, timeLeft, onApplyNowClick }) => {

  return (
    <>
      <div
        className="relative min-h-screen w-full bg-[#172840] overflow-hidden pt-16 sm:pt-20 lg:pt-24" 
        id="home"
        ref={sectionRefs?.home}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: "url('/assets/images/bg-pattern.svg')"
          }}
        />

        <div className="relative min-h-screen flex mx-auto max-w-7xl">
          <div className="w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 lg:pb-32 flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-10 lg:gap-12 pt-8 sm:pt-12 lg:pt-16">
            {/* Text Content */}
            <motion.div 
              className="flex-1 max-w-3xl text-left space-y-6 sm:space-y-8 w-full"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div 
                className="space-y-3 sm:space-y-4"
                variants={fadeInUp}
              >
                <h1 className="text-xs sm:text-sm text-white uppercase tracking-widest font-light">
                    The Pan-African Creative Excellence Awards
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-[#A57C23] via-[#EBD679] via-[#F9EFA3] via-[#F2E085] to-[#A57C23] bg-clip-text text-transparent">
                    Celebrating Africa's Creative Excellence
                </h2>
                <p className="text-white text-base sm:text-lg lg:text-xl font-light leading-relaxed">
                    The PAAN Awards honor the boldest agencies, visionary brands, and exceptional freelancers shaping a borderless creative Africa.
                </p>  
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 w-full"
                variants={scaleIn}
              >
                <button 
                  onClick={onApplyNowClick}
                  className="bg-[#F25849] border border-[#F25849] text-white py-3.5 sm:py-4 px-6 sm:px-8 rounded-full hover:bg-[#D6473C] transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg font-semibold text-sm sm:text-base w-full sm:w-auto min-h-[48px] active:translate-y-0"
                >
                  Apply Now
                </button>
                <button 
                  onClick={() => scrollToSection?.('categories-section')}
                  className="bg-transparent border-2 border-white text-white py-3.5 sm:py-4 px-6 sm:px-8 rounded-full hover:bg-white hover:text-[#172840] transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg font-semibold text-sm sm:text-base w-full sm:w-auto min-h-[48px] active:translate-y-0"
                >
                  Explore Categories
                </button>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 text-white text-xs sm:text-sm"
                variants={fadeInUp}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#F25849] rounded-full flex-shrink-0"></div>
                  <span>Pan-African Jurors</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#F2B706] rounded-full flex-shrink-0"></div>
                  <span>Transparent Criteria</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#4A90E2] rounded-full flex-shrink-0"></div>
                  <span>Continental Recognition</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <div className="flex-1 max-w-full sm:max-w-md lg:max-w-lg w-full mt-6 lg:mt-0">
              <div className="relative w-full">
                <div className="relative w-full aspect-[4/3] sm:aspect-auto">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/hero.png"
                    alt="PAAN Team - Join Our Dynamic Team"
                    width={600}
                    height={450}
                    className="w-full h-full rounded-xl object-cover shadow-2xl"
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                </div>
                
                {/* Yellow Info Card */}
                <div className="absolute -bottom-4 sm:-bottom-6 left-4 right-4 sm:left-4 sm:right-auto bg-[#F2B706] rounded-lg p-3 sm:p-4 shadow-xl max-w-[320px]">
                  <div className="flex items-start sm:items-center gap-3">
                    <Icon icon="mdi:trophy" className="text-[#172840] flex-shrink-0 mt-0.5 sm:mt-0" width="28" height="28" />
                    <div className="flex flex-col">
                      <h3 className="text-[#172840] font-bold text-sm sm:text-base">Award Categories</h3>
                      <p className="text-[#172840] text-xs sm:text-sm font-medium leading-relaxed">
                        11 categories across agencies & freelancers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;