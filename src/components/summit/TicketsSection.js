import { Icon } from "@iconify/react";

const TicketsSection = ({ earlyBirdTimeLeft }) => {
  return (
    <div className="bg-white relative py-12 sm:py-16 md:py-20" id="tickets-section">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col text-center mb-6 sm:mb-8 md:mb-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl text-paan-dark-blue font-bold uppercase">Secure Your Spot</h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-paan-dark-blue mb-4 sm:mb-6 md:mb-8 leading-relaxed">Join leading agencies, startups, and creative innovators in the Exhibition Zone. Share your work, connect with investors and partners, and stand out at Africa's most influential creative economy gathering.</p>
        </div>
        
        {/* Mobile Ticket Section */}
        <div className="block sm:hidden">
          <div className="space-y-6">
            {/* Mobile Ticket Cards */}
            <div className="grid grid-cols-1 gap-4">
              {/* Early Bird Pass */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold mb-1">Early Bird Pass</h4>
                    <p className="text-sm opacity-90">Only 100 slots available</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">$65</div>
                    <div className="text-xs opacity-75">per ticket</div>
                  </div>
                </div>
                
                {/* Early Bird Countdown Timer */}
                {earlyBirdTimeLeft && (earlyBirdTimeLeft.days > 0 || earlyBirdTimeLeft.hours > 0 || earlyBirdTimeLeft.minutes > 0 || earlyBirdTimeLeft.seconds > 0) ? (
                  <div className="mb-4 p-3 bg-white/20 rounded-lg">
                    <div className="text-center">
                      <p className="text-xs font-medium mb-2 opacity-90">Early Bird Offer Ends In:</p>
                      <div className="flex justify-center gap-2 text-sm">
                        <div className="bg-white/30 rounded px-2 py-1 min-w-[40px]">
                          <div className="font-bold">{earlyBirdTimeLeft.days}</div>
                          <div className="text-xs opacity-75">Days</div>
                        </div>
                        <div className="bg-white/30 rounded px-2 py-1 min-w-[40px]">
                          <div className="font-bold">{earlyBirdTimeLeft.hours}</div>
                          <div className="text-xs opacity-75">Hrs</div>
                        </div>
                        <div className="bg-white/30 rounded px-2 py-1 min-w-[40px]">
                          <div className="font-bold">{earlyBirdTimeLeft.minutes}</div>
                          <div className="text-xs opacity-75">Min</div>
                        </div>
                        <div className="bg-white/30 rounded px-2 py-1 min-w-[40px]">
                          <div className="font-bold">{earlyBirdTimeLeft.seconds}</div>
                          <div className="text-xs opacity-75">Sec</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 p-3 bg-red-500/30 rounded-lg">
                    <p className="text-center text-sm font-medium">Early Bird Offer Has Ended</p>
                  </div>
                )}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>Full 2-day summit access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>Exhibition showcase & networking lounge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>Digital speaker presentations post-event</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>Save 30% before February 21st, 2026</span>
                  </div>
                </div>
              </div>

              {/* General Admission */}
              <div className="bg-gradient-to-r from-paan-red to-paan-maroon rounded-2xl p-6 text-white shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold mb-1">General Admission</h4>
                    <p className="text-sm opacity-90">Most Popular Standard</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">$95</div>
                    <div className="text-xs opacity-75">per ticket</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-paan-yellow" width="16" height="16" />
                    <span>Full 2-day summit access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-paan-yellow" width="16" height="16" />
                    <span>Networking app & exhibition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-paan-yellow" width="16" height="16" />
                    <span>Digital certificate of participation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-paan-yellow" width="16" height="16" />
                    <span>Access to all keynotes & panels</span>
                  </div>
                </div>
              </div>

              {/* VIP Delegate Pass */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold mb-1">VIP Delegate Pass</h4>
                    <p className="text-sm opacity-90">Exclusive Access</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">$220</div>
                    <div className="text-xs opacity-75">per ticket</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>All Agency Growth benefits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>VIP Networking Cocktail</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>Premium lounge w/ WiFi & refreshments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>Reserved front-row seating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>PAAN Awards Gala</span>
                  </div>
                </div>
              </div>

              {/* Student & Young Creatives */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold mb-1">Student & Young Creatives</h4>
                    <p className="text-sm opacity-90">For students and young professionals</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">$50</div>
                    <div className="text-xs opacity-75">per ticket</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>Full 2 Day access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>Exhibition & networking sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>Student-only networking with recruiters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>Certificate of participation</span>
                  </div>
                </div>
              </div>

              {/* Virtual Access */}
              <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold mb-1">Virtual Access Pass</h4>
                    <p className="text-sm opacity-90">Join from anywhere</p>
                  </div>
                      <div className="text-right">
                        <div className="flex items-baseline gap-2 justify-end mb-1">
                          <span className="text-lg line-through opacity-60">$25</span>
                          <span className="text-xs text-yellow-300 font-medium">Early Bird</span>
                        </div>
                        <div className="text-3xl font-bold">$20</div>
                        <div className="text-xs opacity-75">per ticket</div>
                      </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>Live streaming of keynotes & panels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>Access to a networking platform</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>30-day access to recordings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                    <span>Join from anywhere</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Benefits Overview */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-paan-dark-blue mb-6 text-center">What's Included in Your Ticket</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:calendar-check" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-paan-dark-blue">Full Summit Access</h5>
                      <p className="text-sm text-gray-600">2-day access to all keynotes, panels, and workshops</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:account-group" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-paan-dark-blue">Networking Opportunities</h5>
                      <p className="text-sm text-gray-600">Connect with industry leaders, investors, and fellow creatives</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:certificate" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-paan-dark-blue">Digital Certificate</h5>
                      <p className="text-sm text-gray-600">Certificate of participation for your professional portfolio</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:store" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-paan-dark-blue">Exhibition Access</h5>
                      <p className="text-sm text-gray-600">Explore innovative projects and connect with exhibitors</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:play-circle" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-paan-dark-blue">Post-Event Access</h5>
                      <p className="text-sm text-gray-600">Digital recordings and speaker presentations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:coffee" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-paan-dark-blue">Refreshments</h5>
                      <p className="text-sm text-gray-600">Lunch and refreshments during the summit</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:gift" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-paan-dark-blue">Welcome Kit</h5>
                      <p className="text-sm text-gray-600">Exclusive summit materials and branded items</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:handshake" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-paan-dark-blue">Business Opportunities</h5>
                      <p className="text-sm text-gray-600">Access to deal rooms and partnership opportunities</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Premium Benefits Note */}
              <div className="mt-6 p-4 bg-gradient-to-r from-paan-red/10 to-paan-maroon/10 border border-paan-red/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:crown" className="w-6 h-6 text-paan-red" />
                  <div>
                    <h5 className="font-semibold text-paan-dark-blue">Premium Ticket Benefits</h5>
                    <p className="text-sm text-gray-600">
                      VIP, Agency Growth, and International Delegate passes include additional perks like priority seating, 
                      exclusive networking events, premium lounges, and access to the PAAN Awards Gala.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-paan-dark-blue mb-4">Event Details</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:calendar" className="text-paan-red" width="20" height="20" />
                  <span className="text-sm font-medium">April 21-22, 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:map-marker" className="text-paan-red" width="20" height="20" />
                  <span className="text-sm font-medium">Sarit Centre, Nairobi, Kenya</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:users" className="text-paan-red" width="20" height="20" />
                  <span className="text-sm font-medium">300+ In-Person Attendees</span>
                </div>
              </div>
            </div>

            {/* Registration Button */}
            <div className="pt-4">
              <button 
                onClick={() => window.location.href = '/summit/purchase-ticket'}
                className="bg-paan-red text-white w-full py-4 text-lg font-semibold rounded-full hover:bg-paan-red/90 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:ticket" width="20" height="20" />
                Register Now
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Ticket Badge */}
        <div className="hidden sm:flex justify-center mb-6 sm:mb-8 md:mb-12">
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none">
            <img 
              src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/ticket.svg" 
              alt="PAAN Summit Ticket" 
              className="w-full h-auto"
            />
            
            {/* Content overlay on ticket */}
            <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
              <div className="text-paan-dark-blue w-full flex flex-col sm:flex-row items-center">
                {/* Left part */}
                  <div className="flex-1 text-left pl-2 sm:pl-4 md:pl-6 lg:pl-8 text-white mb-3 sm:mb-4 md:mb-0">
                    <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 md:mb-3">PAAN SUMMIT 2026</h4>
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold mb-3 sm:mb-4 md:mb-6">Ticket Options</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                      <div className="flex flex-col items-left bg-white/20 border border-white rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3">
                        <h4 className="text-xs sm:text-sm font-light">Early Bird: </h4>
                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$65</p>
                      </div>
                      <div className="flex flex-col items-left bg-white/20 border border-white rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3">
                        <h4 className="text-xs sm:text-sm font-light">General: </h4>
                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$95</p>
                      </div>
                      <div className="flex flex-col items-left bg-white/20 border border-white rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3">
                        <h4 className="text-xs sm:text-sm font-light">VIP: </h4>
                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$220</p>
                      </div>
                      <div className="flex flex-col items-left bg-white/20 border border-white rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3">
                        <h4 className="text-xs sm:text-sm font-light">Virtual: </h4>
                        <div className="flex items-baseline gap-1 sm:gap-2">
                          <span className="text-xs sm:text-sm line-through opacity-60">$25</span>
                          <p className="text-lg sm:text-xl md:text-2xl font-bold">$20</p>
                        </div>
                      </div>
                    </div>
                    <ul className="text-xs sm:text-sm font-light space-y-1 sm:space-y-2">
                      <li className="flex items-center gap-1 sm:gap-2 md:gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" className="flex-shrink-0 sm:w-4 sm:h-4">
                          <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                        </svg>
                        Access to all sessions & workshops.
                      </li>
                      <li className="flex items-center gap-1 sm:gap-2 md:gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" className="flex-shrink-0 sm:w-4 sm:h-4">
                          <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                        </svg>
                        Deal Rooms priority (Business/Investor pass).
                      </li> 
                      <li className="flex items-center gap-1 sm:gap-2 md:gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" className="flex-shrink-0 sm:w-4 sm:h-4">
                          <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                        </svg>
                        Networking events, including Creator Crawl
                      </li>
                      <li className="flex items-center gap-1 sm:gap-2 md:gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" className="flex-shrink-0 sm:w-4 sm:h-4">
                          <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                        </svg>
                        Select recordings post‑event
                      </li>
                    </ul>
                  </div>
                
                {/* White vertical dotted line at center - hidden on mobile */}
                <div className="hidden sm:block mx-2 sm:mx-4 md:mx-6 self-center" style={{
                  width: '2px',
                  height: '300px',
                  background: 'repeating-linear-gradient(to bottom, white 0px, white 4px, transparent 4px, transparent 8px)'
                }}></div>
                
                {/* Right part */}
                <div className="flex-1 text-left text-white space-y-1 sm:space-y-2 md:space-y-3 text-xs sm:text-sm pl-2 sm:pl-4 md:pl-6 lg:pl-8">
                  <p className="font-semibold text-xs sm:text-sm md:text-lg">Admit One</p>
                  <p className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">PAAN Summit 2026</p>
                  <p className="font-semibold text-xs sm:text-sm md:text-lg">Seat . TBA</p>

                  <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 mt-3 sm:mt-4 md:mt-6">
                    <button className="bg-paan-yellow text-paan-dark-blue px-2 sm:px-3 py-1 sm:py-2 rounded-full hover:bg-paan-yellow/90 transition-all duration-300 font-medium text-xs sm:text-sm shadow-lg flex items-center justify-center w-fit">April 21-22, 2026</button>
                    <button className="bg-transparent border border-white text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full hover:bg-white hover:text-paan-dark-blue transition-all duration-300 font-medium text-xs sm:text-sm shadow-lg flex items-center justify-center w-fit">Sarit Center, Nairobi, Kenya</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop Registration Button */}
        <div className="hidden sm:flex justify-center">
          <button 
            onClick={() => window.location.href = '/summit/purchase-ticket'}
            className="bg-paan-red text-white px-6 sm:px-8 md:px-12 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg w-full sm:w-auto rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium shadow-lg flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:ticket" width="16" height="16" className="sm:w-5 sm:h-5" />
            View Tickets
          </button>
       </div>
    </section>
  </div>
  );
};

export default TicketsSection;
