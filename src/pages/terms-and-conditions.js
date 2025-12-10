// pages/terms-and-conditions.js
import Link from 'next/link';
import Header from '../layouts/header';
import Footer from '../layouts/footer';
import SEO from '@/components/SEO';
import ScrollToTop from "@/components/ScrollToTop";

const TermsAndConditions = () => {
  return (
    <>
      <SEO
        title="Terms and Conditions | PAAN Summit 2026"
        description="Read the terms and conditions for PAAN Summit 2026 - Africa's premier creative and tech leadership conference. Learn about registration, payment, cancellation policies, and more."
        keywords="PAAN Summit 2026, terms and conditions, summit registration, creative conference Africa, tech conference terms"
      />
      <main className="min-h-screen flex flex-col relative">
        <Header />
        <div className="flex-grow px-4 py-28 max-w-6xl mx-auto">
          <h1 className="text-4xl font-semibold text-[#172840] mb-6 text-center">
            Terms and Conditions
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            PAAN Summit 2026 - Connected Africa: Marketing. Communication. Design. Innovation.
          </p>

          <section className="space-y-6 text-gray-700">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                About PAAN Summit 2026
              </h2>
              <p>
                The Africa Borderless Creative Economy Summit 2026 brings together the continent's most forward-thinking agencies, brands, freelancers, marketing teams, and technology partners to reimagine how Africa's creative industry can scale — together.
              </p>
              <p className="mt-2">
                Over two days of keynotes, data-led panels, strategy labs, awards, showcases, and partnership deal rooms, the summit will unpack how innovation, technology, collaboration, and talent mobility can turn Africa's creativity into a multi-billion-dollar borderless economy.
              </p>
            </div>

            {/* Summit Tracks */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                Summit Tracks
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#172840] mb-2">1. AI, Technology & The Future of Creative Work</h3>
                  <p className="text-sm text-gray-600 mb-2"><strong>Focus:</strong> How AI, automation, and new technologies are transforming marketing, creative production, and client operations.</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Audience:</strong> Agencies, In-house teams, Freelancers, Tech partners.</p>
                  <p className="text-sm text-gray-600"><strong>Why It Matters:</strong> The shift from hype to ROI — African teams need to operationalize AI responsibly and profitably.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#172840] mb-2">2. Creative Effectiveness, Design & Media Performance</h3>
                  <p className="text-sm text-gray-600 mb-2"><strong>Focus:</strong> Turning creativity, design, and storytelling into measurable business outcomes.</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Audience:</strong> Agencies, Brands, Designers, Marketing Teams.</p>
                  <p className="text-sm text-gray-600"><strong>Why It Matters:</strong> Ideas win attention, but design and execution win results.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#172840] mb-2">3. Data, Analytics & Measurement for Growth</h3>
                  <p className="text-sm text-gray-600 mb-2"><strong>Focus:</strong> How data enables smarter decisions, deeper insights, and accountable results.</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Audience:</strong> Brands, Agencies, Tech partners, Researchers.</p>
                  <p className="text-sm text-gray-600"><strong>Why It Matters:</strong> Africa's digital spend is growing — but data systems remain fragmented.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#172840] mb-2">4. The Creator & Freelance Economy</h3>
                  <p className="text-sm text-gray-600 mb-2"><strong>Focus:</strong> How creators, freelancers, and micro-agencies are reshaping Africa's creative workforce.</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Audience:</strong> Freelancers, Agencies, Brands.</p>
                  <p className="text-sm text-gray-600"><strong>Why It Matters:</strong> Over 10 million freelancers across Africa represent the industry's most flexible and scalable talent force.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#172840] mb-2">5. Communication, PR & Brand Trust</h3>
                  <p className="text-sm text-gray-600 mb-2"><strong>Focus:</strong> Building credible, ethical, and resilient brands in an era of misinformation and activism.</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Audience:</strong> Agencies, In-house PR/Comms teams, Brands.</p>
                  <p className="text-sm text-gray-600"><strong>Why It Matters:</strong> Reputation is now a KPI — and audiences expect authenticity and accountability.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#172840] mb-2">6. Commerce, Platforms & The Business of Marketing</h3>
                  <p className="text-sm text-gray-600 mb-2"><strong>Focus:</strong> How retail media, social commerce, and fintech are shaping the future of marketing and consumer experiences.</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Audience:</strong> Brands, Agencies, Tech partners, In-house marketing teams.</p>
                  <p className="text-sm text-gray-600"><strong>Why It Matters:</strong> Every brand is now a retailer — and every platform is an ad space.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#172840] mb-2">7. Cross-Border Collaboration & Ecosystem Growth</h3>
                  <p className="text-sm text-gray-600 mb-2"><strong>Focus:</strong> Building a borderless creative economy — partnerships, regulation, IP, payments, and policy.</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Audience:</strong> Agencies, Brands, Tech partners, Policy leaders.</p>
                  <p className="text-sm text-gray-600"><strong>Why It Matters:</strong> Growth lies in collaboration — across countries, disciplines, and industries.</p>
                </div>
              </div>
            </div>

            {/* 2-Day Summit Agenda */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                2-Day Summit Agenda
              </h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#172840] mb-4">DAY 1 – Creativity, Intelligence & Innovation</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">08:30 – 09:15</span>
                      <span>Registration & Networking Breakfast</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">09:15 – 09:35</span>
                      <span>Opening Address: Africa's Creative Decade — Uniting Talent, Technology & Trade</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">09:35 – 10:00</span>
                      <span>Keynote: The $100 Billion Opportunity — Africa's Borderless Creative Economy</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">10:00 – 10:40</span>
                      <span>Executive Panel: AI That Pays Back — From Hype to Hard Returns</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">10:40 – 11:10</span>
                      <span>Networking Coffee Break & Partner Demos</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">11:10 – 12:00</span>
                      <span>Track Sessions: AI, Creative Effectiveness, Creator Economy</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">12:00 – 13:30</span>
                      <span>Networking Lunch + Deal Rooms</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">13:30 – 14:15</span>
                      <span>Track Sessions: Data Analytics, Communication, Commerce</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">14:15 – 15:00</span>
                      <span>Workshop: Designing Data Dashboards That Drive Business Decisions</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">15:00 – 15:30</span>
                      <span>Networking Break & Tech Showcase</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">15:30 – 16:10</span>
                      <span>Fireside Chat: Agency + Tech Partnerships That Drive Results</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">16:10 – 17:00</span>
                      <span>Panel: Creative Effectiveness in the Age of AI & Attention</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">17:10 – 18:00</span>
                      <span>Matchmaking Hour & Creative Exchange Lounge</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">19:30 – 21:30</span>
                      <span>Networking Mixer: "Africa Creates" Night (Live showcases & creative performances)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#172840] mb-4">DAY 2 – Execution, Commerce & Collaboration</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">08:45 – 09:10</span>
                      <span>Morning Coffee + Recap Video: Day 1 Highlights</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">09:10 – 09:40</span>
                      <span>Keynote: From Reach to Revenue — The Future of Marketing, Data & Commerce in Africa</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">09:40 – 10:20</span>
                      <span>Panel: Creator Economy 2.0 — From Influence to Infrastructure</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">10:20 – 11:10</span>
                      <span>Track Sessions: Cross-Border Collaboration, Creator Economy, Creative Performance</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">11:10 – 11:40</span>
                      <span>Networking Break + Partner Activations</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">11:40 – 12:25</span>
                      <span>Track Sessions: Commerce, Communication, AI & Technology</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">12:30 – 14:00</span>
                      <span>Lunch + Deal Rooms (Round 2: Tech x Agencies x Brands)</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">14:00 – 14:45</span>
                      <span>Workshop Series: Contracts & IP, Data Strategy, AI Productivity Tools</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">14:45 – 15:30</span>
                      <span>Panel: How In-House Marketing Teams & Agencies Can Co-Create Growth</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">15:30 – 16:15</span>
                      <span>Fireside Chat: Exporting African Creativity to the World — Scaling Beyond Borders</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">16:15 – 17:00</span>
                      <span>Closing Plenary: Africa's Next Creative Frontier — Collaboration as Capital</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold text-[#172840] w-32">19:00 – 21:30</span>
                      <span>PAAN Africa Creative Excellence Awards Gala</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Terms */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                Registration Terms
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Registration is required for all attendees and must be completed through our official registration system.</li>
                <li>All attendees must provide accurate and complete information during registration.</li>
                <li>PAAN reserves the right to verify the identity and credentials of all registrants.</li>
                <li>Registration fees are non-refundable except as specified in our cancellation policy.</li>
                <li>Early bird pricing is available until February 21st, 2026, after which standard pricing applies.</li>
                <li>Group discounts may be available for organizations registering 5 or more attendees.</li>
              </ul>
            </div>

            {/* Payment Terms */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                Payment Terms
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment must be made in full at the time of registration unless prior arrangements have been made.</li>
                <li>We accept credit/debit cards through our secure payment processor (Paystack) and bank transfers.</li>
                <li>For bank transfers, payment must be completed within 7 business days of registration.</li>
                <li>All prices are quoted in USD and include applicable taxes and fees.</li>
                <li>Payment confirmation will be sent via email upon successful transaction.</li>
                <li>Promotional codes and discounts cannot be combined unless otherwise specified.</li>
              </ul>
            </div>

            {/* Cancellation Policy */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                Cancellation Policy
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cancellations made 30 days or more before the event: 75% refund</li>
                <li>Cancellations made 15-29 days before the event: 50% refund</li>
                <li>Cancellations made less than 15 days before the event: No refund</li>
                <li>Refunds will be processed within 14 business days of cancellation request.</li>
                <li>Substitutions (name changes) are allowed up to 7 days before the event at no additional cost.</li>
                <li>In case of event cancellation by PAAN, full refunds will be provided within 30 days.</li>
              </ul>
            </div>

            {/* Code of Conduct */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                Code of Conduct
              </h2>
              <p>All attendees, speakers, sponsors, and staff are expected to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Treat all participants with respect and professionalism</li>
                <li>Maintain a harassment-free environment for all attendees</li>
                <li>Respect intellectual property and confidentiality</li>
                <li>Follow all venue rules and regulations</li>
                <li>Engage in constructive and inclusive discussions</li>
                <li>Report any inappropriate behavior to event staff immediately</li>
              </ul>
              <p className="mt-4">
                Violations of this code of conduct may result in removal from the event without refund.
              </p>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                Intellectual Property
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All content presented at the summit remains the intellectual property of the respective speakers and organizations.</li>
                <li>Recording, photography, or reproduction of presentations without permission is prohibited.</li>
                <li>Attendees may take notes for personal use only.</li>
                <li>Any materials provided to attendees are for personal use and may not be redistributed.</li>
                <li>PAAN reserves the right to use attendee photos and videos for promotional purposes.</li>
              </ul>
            </div>

            {/* Liability */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                Liability and Disclaimer
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>PAAN is not responsible for any loss, damage, or injury that may occur during the event.</li>
                <li>Attendees participate at their own risk and are responsible for their own safety and belongings.</li>
                <li>PAAN reserves the right to change the program, speakers, or venue with reasonable notice.</li>
                <li>In case of force majeure events, PAAN will make reasonable efforts to reschedule or provide alternative arrangements.</li>
                <li>Travel and accommodation arrangements are the responsibility of individual attendees.</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                Contact Information
              </h2>
              <p>
                For questions about these terms and conditions or the summit, please contact us:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> <a href="mailto:secretariat@paan.africa" className="text-[#F25849] hover:underline">secretariat@paan.africa</a>
              </p>
              <p>
                <strong>Website:</strong> <a href="https://paan.africa" className="text-[#F25849] hover:underline">paan.africa</a>
              </p>
              <p className="mt-4 text-sm text-gray-600">
                These terms and conditions are effective as of the date of registration and may be updated from time to time. 
                Updated terms will be posted on our website and communicated to registered attendees.
              </p>
            </div>
          </section>

          {/* Back to Homepage Button */}
          <div className="text-center mt-12">
            <Link href="/">
              <button className="bg-[#F25849] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300">
                Back to Homepage
              </button>
            </Link>
          </div>
        </div>
        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
};

export default TermsAndConditions;
