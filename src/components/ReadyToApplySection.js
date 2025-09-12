import React from "react";
import Image from "next/image";
import { useAppTranslations } from '../hooks/useTranslations';

export default function ReadyToApplySection() {
  const { t } = useAppTranslations();
  
  return (
    <div className="bg-[#F25849] relative overflow-hidden px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16">
      {/* Main content */}
      <section className="relative mx-auto max-w-6xl py-8 sm:py-12 lg:py-16">
        {/* Left side images - hidden on mobile, visible on tablet+ */}
        <div className="hidden md:block absolute left-1/4 -translate-x-20 top-16">
          <Image
            src="/assets/images/user-1.webp"
            alt="Decorative"
            className="rounded-full object-cover shadow-lg border-2 border-white animate-float1"
            width={56}
            height={56}
          />
        </div>
        <div className="hidden md:block absolute left-1/4 -translate-x-32 top-1/3 -translate-y-6">
          <Image
            src="/assets/images/user-2.webp"
            alt="Decorative"
            className="rounded-full object-cover shadow-lg border-2 border-white animate-float2"
            width={48}
            height={48}
          />
        </div>
        <div className="hidden lg:block absolute left-1/4 -translate-x-24 top-1/2">
          <Image
            src="/assets/images/user-3.webp"
            alt="Decorative"
            className="rounded-full object-cover shadow-lg border-2 border-white animate-float3"
            width={64}
            height={64}
          />
        </div>
        <div className="hidden md:block absolute left-1/4 -translate-x-40 bottom-1/3 translate-y-10">
          <Image
            src="/assets/images/user-4.webp"
            alt="Decorative"
            className="rounded-full object-cover shadow-lg border-2 border-white animate-float4"
            width={48}
            height={48}
          />
        </div>
        <div className="hidden md:block absolute left-1/4 -translate-x-20 bottom-8">
          <Image
            src="/assets/images/user-5.webp"
            alt="Decorative"
            className="rounded-full object-cover shadow-lg border-2 border-white animate-float5"
            width={56}
            height={56}
          />
        </div>

        {/* Right side images - hidden on mobile, visible on tablet+ */}
        <div className="hidden md:block absolute right-1/4 translate-x-20 top-16">
          <Image
            src="/assets/images/user-6.webp"
            alt="Decorative"
            className="rounded-full object-cover shadow-lg border-2 border-white animate-float1-delay"
            width={56}
            height={56}
          />
        </div>
        <div className="hidden md:block absolute right-1/4 translate-x-32 top-1/3 -translate-y-6">
          <Image
            src="/assets/images/user-7.webp"
            alt="Decorative"
            className="rounded-full object-cover shadow-lg border-2 border-white animate-float2-delay"
            width={48}
            height={48}
          />
        </div>
        <div className="hidden lg:block absolute right-1/4 translate-x-24 top-1/2">
          <Image
            src="/assets/images/user-8.webp"
            alt="Decorative"
            className="rounded-full object-cover shadow-lg border-2 border-white animate-float3-delay"
            width={64}
            height={64}
          />
        </div>
        <div className="hidden md:block absolute right-1/4 translate-x-40 bottom-1/3 translate-y-6">
          <Image
            src="/assets/images/user-9.webp"
            alt="Decorative"
            className="rounded-full object-cover shadow-lg border-2 border-white animate-float4-delay"
            width={48}
            height={48}
          />
        </div>
        <div className="hidden md:block absolute right-1/4 translate-x-20 bottom-8">
          <Image
            src="/assets/images/user-10.webp"
            alt="Decorative"
            className="rounded-full object-cover shadow-lg border-2 border-white animate-float5-delay"
            width={56}
            height={56}
          />
        </div>

        <div className="text-center px-4 relative">
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-dark mb-4 sm:mb-6">
            {t('freelancers.readyToApply.title')}
          </h2>
          <p className="text-dark mb-6 sm:mb-8 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            {t('freelancers.readyToApply.description')}
          </p>
          <button
            type="submit"
            onClick={() => {
              if (window.fbq) window.fbq('track', 'ApplyNowClick');
              window.location.href =
                "https://membership.paan.africa/freelancers"
            }}
            className="bg-slate-900 text-white py-3 px-8 sm:py-2 sm:px-14 rounded-full hover:bg-orange-600 transition duration-300 font-medium text-base sm:text-lg w-full sm:w-auto"
          >
            {t('freelancers.readyToApply.ctaButton')}
          </button>
        </div>
      </section>
    </div>
  );
}