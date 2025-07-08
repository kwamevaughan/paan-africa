import { Icon } from "@iconify/react";
import Link from "next/link";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <div className="mx-auto max-w-6xl mt-20 relative">
      <div className="absolute top-4 -right-2 sm:right-2  w-12 h-12 bg-[#172840] rounded-full z-0"></div>
      <div className="absolute -bottom-9 -left-6 w-20 h-20 bg-[#F2B706] rounded-full z-0"></div>
      <div className="absolute bottom-4 left-56 w-11 h-11 bg-[#F25849] rounded-full z-0"></div>
      <section className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 items-center mt-10">
        <div className="relative col-span-1 sm:col-span-1 flex flex-col gap-10">
          <div>
            <h2 className="text-3xl font-medium mb-4">Get in Touch</h2>
            <p className="text-gray-500">
              Have questions about PAAN, membership, or upcoming events? Reach
              out — we’re here to connect and support your journey.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-4">Direct Contact Info</h2>
            <div className="flex items-center gap-2 pb-4">
              <Link
                href="mailto:secretariat@paan.africa"
                className="flex items-center gap-2 transform translate-y-[-5px] hover:translate-y-[-5px] transition-transform duration-200"
              >
                <Icon
                  icon="material-symbols:call"
                  width="32"
                  height="32"
                  className="flex-shrink-0 bg-[#F25849] p-2 rounded-full text-white"
                />
                <p className="font-medium text-gray-500">
                  secretariat@paan.africa
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-2 pb-4">
              <Link
                href="https://www.google.com/maps?q=7th+Floor,+Mitsumi+Business+Park,+Westlands,+Nairobi,+Kenya"
                target="_blank"
                className="flex items-center gap-2 transform translate-y-[-5px] hover:translate-y-[-10px] transition-transform duration-200"
              >
                <Icon
                  icon="mdi:location"
                  width="32"
                  height="32"
                  className="flex-shrink-0 bg-[#F25849] p-2 rounded-full text-white"
                />
                <p className="font-medium text-gray-500">
                  7th Floor, Mitsumi Business Park, Westlands, Nairobi, Kenya
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 flex flex-col gap-4">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
