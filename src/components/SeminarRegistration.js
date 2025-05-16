import { useState } from 'react';

export default function SeminarRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    isPaanMember: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="py-10 relative">
      <section className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Title and Ticket Options */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Secure Your Spot at PAAN Summit 2025</h2>
            </div>
            
            <div className="bg-[#F25849] rounded-lg p-6 text-white shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Ticket Options</h3>
              <div className="">
                <div className="border-orange-400">
                  <h4 className="font-medium text-lg">Members: $100</h4>
                </div>
                <div className="pb-6">
                  <h4 className="font-medium text-lg">Non-Members: $150</h4>
                </div>
               
                <div>
                  <p className="text-xs text-left">Includes access to all sessions, workshops, and networking events during the summit.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/*  Registration Form */}
          <div className="rounded-lg p-6">
            <p className="text-gray-700 mb-6">Join Africa's top creative and tech leaders for three days of inspiration, connection, and transformation. Choose your ticket and register below.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">Official Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-0 border-b border-[#172840] focus:border-orange-500 bg-transparent outline-none py-2"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">Email Address*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-0 border-b border-[#172840] focus:border-orange-500 bg-transparent outline-none py-2"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="organization" className="block text-gray-700 mb-1">Organization*</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full border-0 border-b border-[#172840] focus:border-orange-500 bg-transparent outline-none py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Are you a PAAN Member?*</label>
                  <div className="flex space-x-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isPaanMember"
                        value="yes"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isPaanMember"
                        value="no"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-[#F2B706] text-[#172840] py-3 px-6 rounded-full hover:bg-orange-600 transition duration-300 font-medium"
              >
                Register Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}