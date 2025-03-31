// ContactForm.js
import { useState } from 'react';

const ContactForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here (e.g., API call)
  };

  return (
    <div className="bg-[#84C1D9] p-6 rounded-lg shadow-lg -mb-20">
      <h3 className="text-3xl font-medium mb-6">
        Contact Form
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name and Second Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-[#172840] mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border-b border-black bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="secondName" className="block text-[#172840] mb-1">
              Second Name
            </label>
            <input
              type="text"
              id="secondName"
              name="secondName"
              value={formData.secondName}
              onChange={handleChange}
              className="w-full border-b border-black bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300"
              required
            />
          </div>
        </div>

        {/* Email Address and Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-[#172840] mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-black bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-[#172840] mb-1">
              Phone number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-b border-black bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300"
            />
          </div>
        </div>

        {/* Organization */}
        <div>
          <label htmlFor="organization" className="block text-[#172840] mb-1">
            Organization (Optional)
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className="w-full border-b border-black bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-[#172840] mb-1">
            Your message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full border-b border-black bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-[#F25849] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300"
          >
            Join us Today
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;