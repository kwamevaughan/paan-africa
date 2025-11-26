import { motion } from "framer-motion";
import Image from "next/image";

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const AboutSection = ({ sectionRef }) => {
  return (
    <div className="bg-white relative" id="about-us" ref={sectionRef}>
      <section className="relative mx-auto max-w-6xl z-10 px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 py-12 sm:py-16 md:py-20 items-center">
          <motion.div 
            className="flex flex-col gap-4 sm:gap-6 relative z-10 md:pr-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="flex flex-col gap-3 sm:gap-4"
              variants={fadeInLeft}
            >
              <span className="bg-paan-blue text-white rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium w-fit">About</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#172840] uppercase font-bold">About the Summit</h2>
              <h3 className="text-lg sm:text-xl md:text-2xl text-[#172840] font-semibold">A deal-first gathering built for action.</h3>
            </motion.div>
            
            <motion.div 
              className="space-y-3 sm:space-y-4 text-[#172840] text-sm sm:text-base md:text-lg leading-relaxed"
              variants={fadeInLeft}
            >
              <p>
                The Africa Borderless Creative Economy Summit 2026 brings together the continent's most forward-thinking agencies, brands, freelancers, marketing teams, and technology partners to reimagine how Africa's creative industry can scale - together.
              </p>
              <p>
                Over two days of keynotes, data-led panels, strategy labs, awards, showcases, and partnership deal rooms, the summit will unpack how innovation, technology, collaboration, and talent mobility can turn Africa's creativity into a multi-billion-dollar borderless economy.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4 relative z-20"
              variants={scaleIn}
            >
              <button 
                onClick={() => window.location.href = '/summit/purchase-ticket'}
                className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold bg-paan-red text-white hover:bg-paan-red/90 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer relative z-20 w-full sm:w-auto"
              >
                Register Now
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex justify-center lg:justify-end"
            variants={fadeInRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative overflow-hidden w-full max-w-md lg:max-w-none">
              <img 
                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/about-summit.png?updatedAt=1760366803444" 
                alt="PAAN Summit" 
                className="h-64 sm:h-80 md:h-96 lg:h-[45rem] w-full object-cover rounded-lg" 
              />
              <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-gradient-to-b from-white/100 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-gradient-to-t from-white/100 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>
      <Image
        src="/assets/images/bg-pattern.svg"
        width={0}
        height={0}
        alt="Background Pattern"
        className="absolute bottom-0 left-0 w-full h-1/3 object-cover z-0 opacity-10 pointer-events-none"
      />
    </div>
  );
};

export default AboutSection;
