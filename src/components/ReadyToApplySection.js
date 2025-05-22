import React from 'react';

export default function ReadyToApplySection() {
  return (
    <div className="bg-[#F25849] relative overflow-hidden px-8 lg:px-16 py-16">
      {/* Main content */}
      <section className="relative mx-auto max-w-6xl py-16">
        {/* Left side images - closer to content */}
        <div className="absolute left-1/4 -translate-x-20 top-16">
          <img src="/assets/images/user-1.png" alt="Decorative" className="h-14 w-14 rounded-full object-cover shadow-lg border-2 border-white" />
        </div>
        <div className="absolute left-1/4 -translate-x-32 top-1/3 -translate-y-6">
          <img src="/assets/images/user-2.png" alt="Decorative" className="h-12 w-12 rounded-full object-cover shadow-lg border-2 border-white" />
        </div>
        <div className="absolute left-1/4 -translate-x-24 top-1/2">
          <img src="/assets/images/user-3.png" alt="Decorative" className="h-16 w-16 rounded-full object-cover shadow-lg border-2 border-white" />
        </div>
        <div className="absolute left-1/4 -translate-x-40 bottom-1/3 translate-y-10">
          <img src="/assets/images/user-4.png" alt="Decorative" className="h-12 w-12 rounded-full object-cover shadow-lg border-2 border-white" />
        </div>
        <div className="absolute left-1/4 -translate-x-20 bottom-8">
          <img src="/assets/images/user-5.png" alt="Decorative" className="h-14 w-14 rounded-full object-cover shadow-lg border-2 border-white" />
        </div>
        
        {/* Right side images - closer to content */}
        <div className="absolute right-1/4 translate-x-20 top-16">
          <img src="/assets/images/user-6.png" alt="Decorative" className="h-14 w-14 rounded-full object-cover shadow-lg border-2 border-white" />
        </div>
        <div className="absolute right-1/4 translate-x-32 top-1/3 -translate-y-6">
          <img src="/assets/images/user-7.png" alt="Decorative" className="h-12 w-12 rounded-full object-cover shadow-lg border-2 border-white" />
        </div>
        <div className="absolute right-1/4 translate-x-24 top-1/2">
          <img src="/assets/images/user-8.png" alt="Decorative" className="h-16 w-16 rounded-full object-cover shadow-lg border-2 border-white" />
        </div>
        <div className="absolute right-1/4 translate-x-40 bottom-1/3 translate-y-6">
          <img src="/assets/images/user-9.png" alt="Decorative" className="h-12 w-12 rounded-full object-cover shadow-lg border-2 border-white" />
        </div>
        <div className="absolute right-1/4 translate-x-20 bottom-8">
          <img src="/assets/images/user-10.png" alt="Decorative" className="h-14 w-14 rounded-full object-cover shadow-lg border-2 border-white" />
        </div>
        
        <div className="text-center px-4 relative">
          <h2 className="font-bold text-4xl text-dark mb-6">Ready To Apply?</h2>
          <p className="text-dark mb-8 max-w-xl mx-auto text-lg">
            Top African agencies are actively hiring PAAN-certified freelancers this quarter. 
            Your perfect client is waiting – don't let them find someone else.
          </p>
          <button
            type="submit"
            onClick={() => window.location.href = 'https://membership.paan.africa/freelancers'}
            className="bg-slate-900 text-white py-2 px-14 rounded-full hover:bg-orange-600 transition duration-300 font-medium text-lg"
          >
            Apply Now
          </button>  
        </div>
      </section>
    </div>
  );
}