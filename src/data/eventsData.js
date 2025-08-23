// data/eventsData.js
export const eventsData = {
  upcoming: [
    {
      id: 1,
      title: "Hard-Won Lessons for the Next Generation of Agency Founders",
      date: "2025-08-27",
      time: "02:00 PM - 04:00 PM",
      location: "Virtual Event",
      venue: "Online",
      description: "Join us for an exclusive webinar featuring insights from successful agency founders who have navigated the challenges of building and scaling creative agencies in Africa. Learn from their experiences, mistakes, and strategies for success.",
      image: "/assets/images/agencynomics.webp",
      category: "Webinar",
      price: "Free",
      registrationUrl: "https://us06web.zoom.us/webinar/register/WN_Y5nr_QuWRniBqtBpxi7vBw#/registration",
      status: "upcoming",
      featured: true
    },
    {
      id: 2,
      title: "PAAN Creative Summit 2025",
      date: "2025-03-15",
      time: "09:00 AM - 06:00 PM",
      location: "Nairobi, Kenya",
      venue: "KICC Conference Center",
      description: "Join us for the biggest creative industry gathering in Africa. Network with top agencies, freelancers, and clients. Features keynote speakers, workshops, and networking sessions.",
      image: "/assets/images/summit-image.webp",
      category: "Summit",
      price: "Free for Members",
      registrationUrl: "/summit",
      status: "upcoming",
      featured: true
    },
    {
      id: 3,
      title: "Digital Marketing Masterclass",
      date: "2025-02-20",
      time: "02:00 PM - 05:00 PM",
      location: "Lagos, Nigeria",
      venue: "Victoria Island Business Hub",
      description: "Learn advanced digital marketing strategies from industry experts. Perfect for agencies and freelancers looking to expand their service offerings.",
      image: "/assets/images/webinar-image.webp",
      category: "Workshop",
      price: "$50",
      registrationUrl: "#",
      status: "upcoming",
      featured: false
    },
    {
      id: 4,
      title: "Freelancer Success Workshop",
      date: "2025-02-28",
      time: "10:00 AM - 04:00 PM",
      location: "Cape Town, South Africa",
      venue: "Cape Town Convention Center",
      description: "Essential skills and strategies for freelancers to build successful businesses. Topics include client acquisition, pricing strategies, and business development.",
      image: "/assets/images/freelancer-hero.webp",
      category: "Workshop",
      price: "Free",
      registrationUrl: "#",
      status: "upcoming",
      featured: false
    },
    {
      id: 5,
      title: "Agency Growth Strategies",
      date: "2025-03-05",
      time: "01:00 PM - 06:00 PM",
      location: "Accra, Ghana",
      venue: "Accra Business Center",
      description: "Discover proven strategies for scaling your agency. Learn about team management, client retention, and sustainable growth practices.",
      image: "/assets/images/agency-hero-bg.webp",
      category: "Seminar",
      price: "$75",
      registrationUrl: "#",
      status: "upcoming",
      featured: false
    }
  ],
  past: [
    {
      id: 5,
      title: "PAAN Creative Summit 2024",
      date: "2024-11-15",
      time: "09:00 AM - 06:00 PM",
      location: "Nairobi, Kenya",
      venue: "KICC Conference Center",
      description: "Our inaugural creative summit brought together over 500 professionals from across Africa. Featured 20+ speakers and 15 workshops.",
      image: "/assets/images/summit-image.webp",
      category: "Summit",
      price: "Completed",
      registrationUrl: "#",
      status: "past",
      featured: true,
      attendees: 500,
      speakers: 20
    },
    {
      id: 6,
      title: "Web3 & Creative Industries",
      date: "2024-10-20",
      time: "02:00 PM - 05:00 PM",
      location: "Virtual Event",
      venue: "Online",
      description: "Explored the intersection of Web3 technology and creative industries. Discussed NFTs, blockchain, and the future of digital art.",
      image: "/assets/images/webinar-image.webp",
      category: "Webinar",
      price: "Completed",
      registrationUrl: "#",
      status: "past",
      featured: false,
      attendees: 150
    },
    {
      id: 7,
      title: "Client-Agency Relationship Workshop",
      date: "2024-09-15",
      time: "10:00 AM - 04:00 PM",
      location: "Johannesburg, South Africa",
      venue: "Sandton Convention Center",
      description: "Focused on building stronger relationships between clients and agencies. Covered communication strategies and project management best practices.",
      image: "/assets/images/client-slider-img-1.webp",
      category: "Workshop",
      price: "Completed",
      registrationUrl: "#",
      status: "past",
      featured: false,
      attendees: 80
    },
    {
      id: 8,
      title: "Creative Leadership Forum",
      date: "2024-08-30",
      time: "01:00 PM - 06:00 PM",
      location: "Cairo, Egypt",
      venue: "Cairo International Conference Center",
      description: "Leadership development for creative professionals. Topics included team building, innovation management, and strategic thinking.",
      image: "/assets/images/leadership-img.webp",
      category: "Forum",
      price: "Completed",
      registrationUrl: "#",
      status: "past",
      featured: false,
      attendees: 120
    }
  ]
};

export const eventCategories = [
  "All Events",
  "Summit",
  "Workshop",
  "Webinar",
  "Seminar",
  "Forum"
];

export const eventLocations = [
  "All Locations",
  "Nairobi, Kenya",
  "Lagos, Nigeria",
  "Cape Town, South Africa",
  "Accra, Ghana",
  "Johannesburg, South Africa",
  "Cairo, Egypt",
  "Virtual Event"
];
