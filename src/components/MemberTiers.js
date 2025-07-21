import Image from 'next/image';
import React from 'react';

const MemberTiers = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-16">
      <div className="p-8 rounded-lg w-full max-w-7xl mx-4 relative overflow-hidden">
        
        <div className="sticky top-0 bg-gray-100 py-8 mt-28 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#172840] mb-6">
            PAAN Agency Membership Tiers
          </h1>
          <p className="text-[#172840] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Explore tailored benefits for every agency stage. From visibility and client access to collaboration and growth, each PAAN membership tier offers unique value to help your agency thrive across Africa.
          </p>
        </div>

        <table className="w-full mt-4 relative">
          <thead>
            <tr>
              <th className="p-4 text-center font-semibold text-lg text-[#172840] bg-[#FFFFFF] border border-[#FFFFFF] m-2 text-left w-[200px] h-[100px]">
                Benefit<br/> Category
              </th>
              <th className="p-4 text-center font-semibold text-lg text-white bg-[#172840] m-2 w-[200px] h-[100px]">
                Free
              </th>
              <th className="p-4 text-center font-semibold text-lg text-white bg-[#A1A1A1] m-2 w-[200px] h-[100px]">
                Associate<br/>
                <button
                  className="mt-2 px-4 py-2 bg-paan-red text-white rounded-md shadow hover:bg-paan-blue transition-colors text-sm font-medium"
                  onClick={() => window.open('https://calendly.com/antony-paan/45min', '_blank')}
                >
                  Book a call for pricing
                </button>
              </th>
              <th className="p-4 text-center font-semibold text-lg text-white bg-[#C0614D] m-2 w-[200px] h-[100px]">
                Full<br/>
                <button
                  className="mt-2 px-4 py-2 bg-paan-dark-blue text-white rounded-md shadow hover:bg-paan-blue transition-colors text-sm font-medium"
                  onClick={() => window.open('https://calendly.com/antony-paan/45min', '_blank')}
                >
                  Book a call for pricing
                </button>
              </th>
              <th className="p-4 text-center font-semibold text-lg text-white bg-[#F2B706] border border-[#F2B706] m-2 w-[200px] h-[100px]">
                Gold<br/>
                <button
                  className="mt-2 px-4 py-2 bg-paan-blue text-white rounded-md shadow hover:bg-paan-red transition-colors text-sm font-medium"
                  onClick={() => window.open('https://calendly.com/antony-paan/45min', '_blank')}
                >
                  Book a call for pricing
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50">
              <td colSpan="5" className="p-4 font-bold text-lg text-[#172840] bg-gray-100">
                Market Access & Client Opportunities
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Clients & projects Access(RFPs, Tenders, RFQs, Closed bids)</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to 10% of available opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">40% of available opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">High volume(70%)Pre-qualified leads</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Highest volume(100%) Direct introductions to top-tier clients</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Co-Bidding Opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">30% access to available pool</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">60% access to available pool</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Full accessLead co-bidding</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Regional Expansion & hubs</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to Regional Hubs offices for co-working or client meetings(Nairobi, Cairo, Johanesburg, Lagos)</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to Regional Hubs offices for co-working or client meetings(Nairobi, Cairo, Johannesburg, Lagos). Local operational support.</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to Regional Hubs offices for co-working or client meetings(Nairobi, Cairo, Johannesburg, Lagos). Local Ops support.</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Cross-Border Projects</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to 30% of available cross-border projects</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to 70% of available cross-border projects</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to 100% of available cross-border projects</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="bg-gray-50">
              <td colSpan="5" className="p-4 font-bold text-lg text-[#172840] bg-gray-100">
                Development of new revenue channels
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Access to revenue generating tech reseller programs</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">20% of the opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">60% of the opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">100% of the opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">100% of the opportunities</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Access to non-tech partner programs</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">30% of the opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">60% access to available pool</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">100% of the opportunities</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Exclusive partner product bundles</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">40% of the opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">70% of the opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">100% of the opportunities</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="bg-gray-50">
              <td colSpan="5" className="p-4 font-bold text-lg text-[#172840] bg-gray-100">
                Collaboration & Innovation
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Knowledge & Expertise sharing collaborations (agencies)</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">1–2 collab invites/year</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Full participation</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Lead networks & initiate projects</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">PAAN Certified freelancers</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to 20% of the talent pool</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to 100% of the talent pool</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to 100% of the talent pool</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to 100% of the talent pool</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Agency match-making with clients & collaborating agencies</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">20% access to all exclusive matchmaking opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">50% access to all exclusive matchmaking opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to 100% of the match making opportunities for both clients & collaborative agencies</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">White label your services to other agencies</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-[#A1A1A1]' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Available</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Available</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Mentorship Programs</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-[#A1A1A1]' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-[#C0614D]' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Quarterly 1:1 sessions + thought-leadership roundtables</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="bg-gray-50">
              <td colSpan="5" className="p-4 font-bold text-lg text-[#172840] bg-gray-100">
                Cost Efficiency & Resource Sharing
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Bulk Discounts on software & tools</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Upto 10% of the pre-negotiated value</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Up to 30% of the pre-negotiated value</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Up to 70% of the pre-negotiated value</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">100% of the pre-negotiated value</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Market insights data & reports</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to 30% of all market data & reports</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to 70% of all market data & reports</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to 100% of all market data & reports + exclusive PAAN commissioned reports</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Agency match-making with clients & collaborating agencies</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">20% access to all exclusive matchmaking opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">50% access to all exclusive matchmaking opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to 100% of the match making opportunities for both clients & collaborative agencies</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="bg-gray-50">
              <td colSpan="5" className="p-4 font-bold text-lg text-[#172840] bg-gray-100">
                Credibility & Brand Visibility
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Certification Badge (Displayed on Pitches, Website & any other collaterals)</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                    <Image
                    src="/assets/images/free-badge.png"
                    width={50}
                    height={50}
                    alt="Strategic Collaboration"
                    />
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                    <Image
                    src="/assets/images/full-badge.png"
                    width={50}
                    height={50}
                    alt="Strategic Collaboration"
                    />
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                        <Image
                        src="/assets/images/associate-badge.png"
                        width={50}
                        height={50}
                        alt="Strategic Collaboration"
                        />
                    </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                    <div className="flex justify-center items-center h-full">
                        <Image
                        src="/assets/images/gold-badge.png"
                        width={50}
                        height={50}
                        alt="Strategic Collaboration"
                        />
                    </div>
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Invitation to exclusive Partner events/Global benchmarkings/Global launches</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Low Priority access</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Medium Priority access</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">High Priority access</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Featured Case Studies(Agency Spotlight, Founder spotlight, Impact spotlights)</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">20% access to all exclusive matchmaking opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">50% access to all exclusive matchmaking opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to 100% of the match making opportunities for both clients & collaborative agencies</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Listing on PAAN Directory</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Included</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Included</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Mid Ranking</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">High Ranking for full visibility</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Annual PAAN Summit</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Attend Only</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Attend + Network with local clients in host country</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Booth + Speaking opportunity + network with regional clients</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">VIP Booth + Keynote & Media coverage opportunity + VIP networking with International clients</td>
            </tr>
          </tbody>
        </table>

        <table className="w-full mt-10 relative">
          <thead>
            <tr>
              <th className="p-4 text-center font-semibold text-lg text-[#172840] bg-transparent m-2 text-left w-[200px] h-[100px]">
                Revenue Growth
              </th>
              <th className="p-4 text-center font-semibold text-lg text-white bg-[#172840] m-2 w-[200px] h-[100px]">
                Free Member
              </th>
              <th className="p-4 text-center font-semibold text-lg text-white bg-[#A1A1A1] m-2 w-[200px] h-[100px]">
                Associate
              </th>
              <th className="p-4 text-center font-semibold text-lg text-white bg-[#C0614D] m-2 w-[200px] h-[100px]">
                Full
              </th>
              <th className="p-4 text-center font-semibold text-lg text-white bg-[#F2B706] border border-[#F2B706] m-2 w-[200px] h-[100px]">
                Gold
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Revenue Sharing</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Shared on co-delivered projects</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Shared on co-delivered projects</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Lead & share larger deals</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Subcontracting Opportunities</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-[#A1A1A1]' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Medium Priority access in your country/region</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Exclusive High Priority access in whole continent</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Access to Creative Grants & partner Market development funds</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-[#A1A1A1]' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Medium Priority access in your country/region</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Exclusive High Priority access in whole continent</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="bg-gray-50">
              <td colSpan="5" className="p-4 font-bold text-lg text-[#172840] bg-gray-100">
                Advocacy & Support
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Policy Influence/ Govt events/Advocacy & networking events</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-[#A1A1A1]' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Invitation to key Policy forums & shaping the future of innovation & creative industry in Africa</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Priority Invitation to key Policy forums & shaping the future of innovation & creative industry in Africa - Consideration for Panel speaking opportunities</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Legal & Compliance Access(Regional)</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Templates only(Basic)</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Templates + email support(bronze templates)</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Exclusive High Priority access in whole continent</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Premium advisory + legal alerts + Gold templates</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Crisis Support</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-[#172840]' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-[#A1A1A1]' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
              <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-[#C0614D]' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">24–48 hr PR support window</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="bg-gray-50">
              <td colSpan="5" className="p-4 font-bold text-lg text-[#172840] bg-gray-100">
                    Exclusive Events & Networking
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Webinars</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to non exclusive webinars</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to all exclusive webinars</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to all exclusive webinars</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access to all exclusive webinars</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Regional Workshops</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-[#172840]' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">60% of all regional workshops</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">80% of all regional workshops</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Unlimited access + co-hosting option</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Networking Groups</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Basic Slack/LinkedIn</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Full access</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Full access</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">VIP leadership circles</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="bg-gray-50">
              <td colSpan="5" className="p-4 font-bold text-lg text-[#172840] bg-gray-100">
                Media Access & Talent Competitions Placements
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Access to talent pool from competitions & Pan African placements</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-[#A1A1A1]' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access talent from Pan African creative competitions organized by PAAN</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Access talent from Pan African creative competitions organized by PAAN(top-tier competition winners)</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Media Rate Cards</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Country Rates</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Regional rates</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Pre-negotiated Pan-African rates</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Prenegotiated Pan African rates + first-look deals</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">PAAN Board Of Agencies</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                 </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
               <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-[#A1A1A1]' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
               <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-[#C0614D]' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Agency founder(s) can become a member of the advisory board</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="bg-gray-50">
              <td colSpan="5" className="p-4 font-bold text-lg text-[#172840] bg-gray-100">
                Agency Recognition
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Pan African Awards participation</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                 </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Full participation</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Full participation</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Full participation</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Media features & interviews during summits & Regional events</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                 </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
               <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-[#A1A1A1]' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
               <div className="flex justify-center items-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-[#C0614D]' width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Exclusive invitation</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="bg-gray-50">
              <td colSpan="5" className="p-4 font-bold text-lg text-[#172840] bg-gray-100">
                Mergers & Acquisitions
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center">Buy/Sell/merge your agency</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">
                <div className="flex justify-center items-center h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg>
                 </div>
              </td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Available</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Available</td>
              <td className="p-4 border border-gray-200 w-[200px] h-[100px] text-center">Available</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberTiers;
