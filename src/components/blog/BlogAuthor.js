import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const BlogAuthor = ({ author }) => {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/panafricanagencynetwork',
      icon: 'ic:baseline-facebook',
      color: 'group-hover:text-[#1877F2]'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/pan-african-agency-network',
      icon: 'mdi:linkedin',
      color: 'group-hover:text-[#0077B5]'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/pan_african_agency_network',
      icon: 'mingcute:instagram-fill',
      color: 'group-hover:text-[#E4405F]'
    },
    {
      name: 'X',
      url: 'https://x.com/paan_network',
      icon: 'iconoir:x',
      color: 'group-hover:text-black'
    }
  ];

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="bg-gradient-to-r from-paan-dark-blue/5 to-paan-dark-blue/5 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Author Image */}
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-lg">
            <Image
              src="/assets/images/logo.png"
              alt={author}
              fill
              className="object-contain p-2"
            />
          </div>

          {/* Author Info */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-paan-dark-blue mb-2">{author}</h3>
            <p className="text-gray-600 mb-4">
              We're on a mission to transform fragmentation into unity and potential into global influence.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <Icon
                    icon={social.icon}
                    width="24"
                    height="24"
                    className={`text-gray-400 transition-colors duration-300 ${social.color}`}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAuthor; 