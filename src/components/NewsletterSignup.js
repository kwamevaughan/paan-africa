// NewsletterSignup.js
import { useState } from 'react';

const NewsletterSignup = () => {
  // State to manage email input
  const [email, setEmail] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription email:', email);
    // Add your newsletter subscription logic here (e.g., API call)
    setEmail(''); // Clear the input after submission
  };

  return (
    <div className="text-white rounded-lg relative overflow-hidden">
      {/* Background Pattern (simplified as a CSS background) */}
      <div />

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-normal mb-4">
          Sign up for our newsletter
        </h3>
        <p className="text-gray-200 font-normal mb-6">
          Stay connected. Get insights, trend reports, and event invites delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="yourmail@email.com"
            className="w-full sm:w-auto flex-1 border-b border-gray-400 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors duration-300"
            required
          />
          <button
            type="submit"
            className="bg-[#F25849] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;