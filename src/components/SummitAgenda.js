import React, { useState } from 'react';
import Image from 'next/image';

const SummitAgenda = () => {
  const [activeDay, setActiveDay] = useState('day1');

  return (
    <div className="bg-[#F3F9FB] py-12 sm:py-16 md:py-20" id="agenda">          
      <section className="mx-auto max-w-6xl px-4 sm:px-6">            
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a365d] mb-3 sm:mb-4">Summit Agenda</h2>
          <p className="text-base sm:text-lg text-gray-600">Two days of intensive learning, networking, and deal-making</p>
        </div>
        
        <div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <button 
            onClick={() => setActiveDay('day1')}
            className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center gap-2 uppercase ${
              activeDay === 'day1' 
                ? 'bg-[#84C1D9] border border-[#84C1D9] text-white' 
                : 'bg-transparent border border-[#84C1D9] text-[#84C1D9] hover:bg-[#84C1D9] hover:text-white'
            }`}
          >
            Day 1
          </button>
          <button 
            onClick={() => setActiveDay('day2')}
            className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center gap-2 ${
              activeDay === 'day2' 
                ? 'bg-[#84C1D9] border border-[#84C1D9] text-white' 
                : 'bg-transparent border border-[#84C1D9] text-[#84C1D9] hover:bg-[#84C1D9] hover:text-white'
            }`}
          >
            Day 2
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <div className="space-y-4 sm:space-y-6">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/images/day1-1.png"
                alt="Day 1 Morning Sessions"
                width={500}
                height={400}
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                <h3 className="text-lg sm:text-xl font-bold">Morning Sessions</h3>
                <p className="text-xs sm:text-sm">Keynotes & Panels</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/images/day1-2.png"
                alt="Day 1 Afternoon Sessions"
                width={500}
                height={400}
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                <h3 className="text-lg sm:text-xl font-bold">Afternoon Sessions</h3>
                <p className="text-xs sm:text-sm">Deal Rooms & Clinics</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col" style={{ height: '680px' }}>
            {activeDay === 'day1' ? (
              <>
                <div className="bg-[#1a365d] text-white p-4 sm:p-6 flex-shrink-0">
                  <h4 className="text-lg sm:text-xl font-bold">Day 1 – Creativity, Intelligence & Innovation</h4>
                  <p className="text-xs sm:text-sm opacity-90 mt-1">April 21, 2026</p>
                </div>
            
                <div className="p-4 sm:p-6 relative flex-1 overflow-y-auto">
                  {/* Container for timeline items */}
                  <div className="space-y-4 sm:space-y-6 relative">
                    {/* Continuous vertical line that runs through the middle of all circles */}
                    <div className="absolute left-[5px] top-[6px] bottom-[6px] w-0.5 bg-[#ef4444]"></div>
                    
                    {/* Timeline item 1 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">08:30 – 09:15</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Registration & Networking Breakfast</h5>
                      </div>
                    </div>

                    {/* Timeline item 2 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">09:15 – 09:35</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Opening Address: Africa's Creative Decade — Uniting Talent, Technology & Trade</h5>
                      </div>
                    </div>

                    {/* Timeline item 3 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">09:35 – 10:00</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Keynote: The $100 Billion Opportunity — Africa's Borderless Creative Economy</h5>
                      </div>
                    </div>

                    {/* Timeline item 4 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">10:00 – 10:40</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Executive Panel: AI That Pays Back — From Hype to Hard Returns (Agencies + Brands + Tech Partners discuss real AI ROI)</h5>
                      </div>
                    </div>

                    {/* Timeline item 5 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">10:40 – 11:10</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Networking Coffee Break & Partner Demos</h5>
                      </div>
                    </div>

                    {/* Timeline item 6 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">11:10 – 12:00</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">
                          <span className="font-bold">Track 1:</span> AI, Technology & The Future of Creative Work<br/>
                          Session: From Prompt to Profit: Scaling AI in African Agencies & Brands<br/>
                          <span className="font-bold">Track 2:</span> Creative Effectiveness & Media Performance<br/>
                          Session: Creativity That Converts: Data-Driven Campaigns That Win<br/>
                          <span className="font-bold">Track 4:</span> Creator & Freelance Economy<br/>
                          Session: Freelancer to Founder — Building a Sustainable Creative Practice
                        </h5>
                      </div>
                    </div>

                    {/* Timeline item 7 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">12:00 – 13:30</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Networking Lunch + Deal Rooms (Brands ↔ Agencies ↔ Freelancers ↔ Tech)</h5>
                      </div>
                    </div>

                    {/* Timeline item 8 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">13:30 – 14:15</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">
                          <span className="font-bold">Track 3:</span> Data, Analytics & Measurement for Growth<br/>
                          Session: Attribution After Cookies — Africa's Measurement Future<br/>
                          <span className="font-bold">Track 5:</span> Communication, PR & Brand Trust<br/>
                          Session: Crisis Ready: Managing Reputation in Real Time<br/>
                          <span className="font-bold">Track 6:</span> Commerce, Platforms & The Business of Marketing<br/>
                          Session: The Retail Media Revolution: Turning Audiences into Assets
                        </h5>
                      </div>
                    </div>

                    {/* Timeline item 9 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">14:15 – 15:00</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Workshop: Designing Data Dashboards That Drive Business Decisions</h5>
                      </div>
                    </div>

                    {/* Timeline item 10 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">15:00 – 15:30</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Networking Break & Tech Showcase</h5>
                      </div>
                    </div>

                    {/* Timeline item 11 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">15:30 – 16:10</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Fireside Chat: Agency + Tech Partnerships That Drive Results</h5>
                      </div>
                    </div>

                    {/* Timeline item 12 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">16:10 – 17:00</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Panel: Creative Effectiveness in the Age of AI & Attention</h5>
                      </div>
                    </div>

                    {/* Timeline item 13 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">17:10 – 18:00</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Matchmaking Hour & Creative Exchange Lounge</h5>
                      </div>
                    </div>

                    {/* Timeline item 14 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">19:30 – 21:30</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Networking Mixer: "Africa Creates" Night (Live showcases & creative performances)</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-[#1a365d] text-white p-4 sm:p-6 flex-shrink-0">
                  <h4 className="text-lg sm:text-xl font-bold">Day 2 – Execution, Commerce & Collaboration</h4>
                  <p className="text-xs sm:text-sm opacity-90 mt-1">April 22, 2026</p>
                </div>
            
                <div className="p-4 sm:p-6 relative flex-1 overflow-y-auto">
                  {/* Container for timeline items */}
                  <div className="space-y-4 sm:space-y-6 relative">
                    {/* Continuous vertical line that runs through the middle of all circles */}
                    <div className="absolute left-[5px] top-[6px] bottom-[6px] w-0.5 bg-[#ef4444]"></div>
                    
                    {/* Timeline item 1 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">08:45 – 09:10</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Morning Coffee + Recap Video: Day 1 Highlights</h5>
                      </div>
                    </div>

                    {/* Timeline item 2 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">09:10 – 09:40</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Keynote: From Reach to Revenue — The Future of Marketing, Data & Commerce in Africa</h5>
                      </div>
                    </div>

                    {/* Timeline item 3 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">09:40 – 10:20</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Panel: Creator Economy 2.0 — From Influence to Infrastructure</h5>
                      </div>
                    </div>

                    {/* Timeline item 4 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">10:20 – 11:10</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">
                          <span className="font-bold">Track 7:</span> Cross-Border Collaboration & Ecosystem Growth<br/>
                          Session: Operating Across Borders — Tax, IP, and Legal Realities<br/>
                          <span className="font-bold">Track 4:</span> Creator & Freelance Economy<br/>
                          Session: Fair Pay Africa — Pricing Creativity for Value<br/>
                          <span className="font-bold">Track 2:</span> Creative + Media Performance<br/>
                          Session: Short-Form Mastery: Crafting Stories That Stick
                        </h5>
                      </div>
                    </div>

                    {/* Timeline item 5 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">11:10 – 11:40</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Networking Break + Partner Activations</h5>
                      </div>
                    </div>

                    {/* Timeline item 6 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">11:40 – 12:25</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">
                          <span className="font-bold">Track 6:</span> Commerce, Platforms & The Business of Marketing<br/>
                          Session: Chat Commerce & Social Selling: Converting Conversations into Sales<br/>
                          <span className="font-bold">Track 5:</span> Communication, PR & Brand Trust<br/>
                          Session: Influence with Integrity — The New PR-Creator Relationship<br/>
                          <span className="font-bold">Track 1:</span> AI & Technology<br/>
                          Session: Building Smarter Campaign Workflows with Automation
                        </h5>
                      </div>
                    </div>

                    {/* Timeline item 7 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">12:30 – 14:00</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Lunch + Deal Rooms (Round 2: Tech x Agencies x Brands)</h5>
                      </div>
                    </div>

                    {/* Timeline item 8 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">14:00 – 14:45</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">
                          Workshop Series:<br/>
                          • Contracts & IP for Creators & Agencies<br/>
                          • Data Strategy for Marketing Teams<br/>
                          • AI Productivity Tools for Creative Teams
                        </h5>
                      </div>
                    </div>

                    {/* Timeline item 9 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">14:45 – 15:30</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Panel: How In-House Marketing Teams & Agencies Can Co-Create Growth</h5>
                      </div>
                    </div>

                    {/* Timeline item 10 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">15:30 – 16:15</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Fireside Chat: Exporting African Creativity to the World — Scaling Beyond Borders</h5>
                      </div>
                    </div>

                    {/* Timeline item 11 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">16:15 – 17:00</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">Closing Plenary: Africa's Next Creative Frontier — Collaboration as Capital</h5>
                      </div>
                    </div>

                    {/* Timeline item 12 */}
                    <div className="flex items-center relative">
                      <div className="relative">
                        <div className="w-3 h-3 bg-[#ef4444] rounded-full shadow-lg shadow-[#ef4444]/50 flex-shrink-0 z-10 relative"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-[#ef4444] rounded-full opacity-30 animate-ping"></div>
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <div className="text-xs sm:text-sm font-bold text-[#84C1D9] mb-1">19:00 – 21:30</div>
                        <h5 className="text-[#1a365d] text-sm sm:text-base">PAAN Africa Creative Excellence Awards Gala Celebrating excellence in campaigns, creativity, and collaboration across the continent.</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SummitAgenda;