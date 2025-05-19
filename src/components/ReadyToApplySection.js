import React from 'react';

export default function ReadyToApplySection() {
  return (
    <div className="bg-[#F25849] relative overflow-hidden px-8 lg:px-16">
      {/* Left side images */}
      <div className="absolute left-12 top-12">
        <img src="/assets/images/user-1.png" alt="Decorative" className="h-12 w-12 rounded-full object-cover shadow-lg" />
      </div>
      <div className="absolute left-24 top-32">
        <img src="/assets/images/user-2.png" alt="Decorative" className="h-8 w-8 rounded-full object-cover shadow-lg" />
      </div>
      <div className="absolute left-8 top-48">
        <img src="/assets/images/user-3.png" alt="Decorative" className="h-10 w-10 rounded-full object-cover shadow-lg" />
      </div>
      <div className="absolute left-32 bottom-32">
        <img src="/assets/images/user-4.png" alt="Decorative" className="h-6 w-6 rounded-full object-cover shadow-lg" />
      </div>
      <div className="absolute left-16 bottom-16">
        <img src="/assets/images/user-5.png" alt="Decorative" className="h-10 w-10 rounded-full object-cover shadow-lg" />
      </div>
      
      {/* Right side images */}
      <div className="absolute right-14 top-16">
        <img src="/assets/images/user-6.png" alt="Decorative" className="h-10 w-10 rounded-full object-cover shadow-lg" />
      </div>
      <div className="absolute right-28 top-32">
        <img src="/assets/images/user-7.png" alt="Decorative" className="h-8 w-8 rounded-full object-cover shadow-lg" />
      </div>
      <div className="absolute right-12 top-48">
        <img src="/assets/images/user-8.png" alt="Decorative" className="h-6 w-6 rounded-full object-cover shadow-lg" />
      </div>
      <div className="absolute right-24 bottom-28">
        <img src="/assets/images/user-9.png" alt="Decorative" className="h-10 w-10 rounded-full object-cover shadow-lg" />
      </div>
      <div className="absolute right-16 bottom-12">
        <img src="/assets/images/user-10.png" alt="Decorative" className="h-12 w-12 rounded-full object-cover shadow-lg" />
      </div>
      
      {/* Main content */}
      <section className="relative mx-auto max-w-6xl py-16">
        <div className="text-center px-4">
          <h2 className="font-bold text-3xl text-dark mb-4">Ready To Apply?</h2>
          <p className="text-dark mb-6 max-w-lg mx-auto">
            Top African agencies are actively hiring PAAN-certified freelancers this quarter. 
            Your perfect client is waiting – don't let them find someone else.
          </p>
          <button
            type="submit"
            className="bg-slate-900 text-white py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300 font-medium"
          >
            Apply Now
          </button>  
        </div>
      </section>
    </div>
  );
}