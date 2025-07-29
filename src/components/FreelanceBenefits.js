import Image from "next/image";
import Link from "next/link";

export default function FreelanceBenefits() {
  return (
    <div className="mt-4 md:mt-10 mb-6 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[
          {
            img: "/assets/images/icons/live-client.svg",
            title: "Live Client Briefs",
            desc: "Get matched with active briefs from Africa's top agencies & brands."
          },
          {
            img: "/assets/images/icons/upskill.svg",
            title: "Expert-Led Upskilling",
            desc: "Attend masterclasses and workshops led by industry legends."
          },
          {
            img: "/assets/images/icons/support.svg",
            title: "Business & Growth Support",
            desc: "Build systems for pricing, proposals, and managing clients like a pro."
          },
          {
            img: "/assets/images/icons/opportunities.svg",
            title: "Showcase Opportunities",
            desc: "Enter competitions and gain exposure through official PAAN spotlights."
          },
          {
            img: "/assets/images/icons/grants.svg",
            title: "Creative Grants",
            desc: "Apply for funding to pursue bold ideas backed by real partners."
          },
          {
            img: "/assets/images/icons/platform.svg",
            title: "Platform Visibility",
            desc: "Get discovered by clients through the PAAN network and directories."
          }
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[160px] sm:min-h-[180px] text-center"
          >
            <Image
              src={item.img}
              alt={item.title + ' icon'}
              width={40}
              height={40}
              className="mb-3 sm:mb-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            />
            <h3 className="font-bold text-base sm:text-lg mb-2 leading-tight">{item.title}</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8 sm:mt-12 lg:mt-20 px-4 sm:px-0">
        <Link 
          href="https://membership.paan.africa/freelancers" 
          className="bg-paan-red text-white py-3 sm:py-3 md:py-4 px-6 sm:px-8 md:px-10 rounded-full hover:bg-paan-red transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] sm:hover:translate-y-[-5px] font-medium text-sm sm:text-base w-full sm:w-auto text-center inline-block max-w-sm sm:max-w-none"
          onClick={() => { if (window.fbq) window.fbq('track', 'BecomeCertifiedClick'); }}
        >
          Become a Certified PAAN Freelancer
        </Link>
      </div>
    </div>
  );
}