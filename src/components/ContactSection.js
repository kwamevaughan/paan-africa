import { Icon } from "@iconify/react";
import Link from "next/link";
import ContactForm from "./ContactForm";
import { useAppTranslations } from '../hooks/useTranslations';

export default function ContactSection() {
  const { t } = useAppTranslations();
  
  return (
    <div className="mx-auto max-w-6xl mt-20 relative">
      <div className="absolute -bottom-9 -left-6 w-20 h-20 bg-[#F2B706] rounded-full z-0"></div>
      <div className="absolute bottom-4 left-56 w-11 h-11 bg-[#F25849] rounded-full z-0"></div>
      <section className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 items-center mt-10">
        <div className="relative col-span-1 sm:col-span-1 flex flex-col gap-10">
          <div>
            <h2 className="text-3xl font-medium mb-4">{t('homepage.contact.title')}</h2>
            <p className="text-gray-500">
              {t('homepage.contact.description')}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-4">{t('homepage.contact.directContact')}</h2>
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
                  {t('homepage.contact.email')}
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-2 pb-4">
              <Link
                href="https://www.google.com/maps?q=The+Westwood+Office,+6th+Floor+6A,+Comply+Guide+Advisory,+Westlands,+Nairobi,+Kenya"
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
                  {t('homepage.contact.address')}
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
