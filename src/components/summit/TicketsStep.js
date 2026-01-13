import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const TicketsStep = ({ selectedTickets, setSelectedTickets, onNext, onPrev, errors }) => {
  const ticketTypes = [
    {
      name: 'General Admission',
      description: 'Access all keynotes, panels, exhibition & networking app.',
      price: 65,
      originalPrice: 95,
      features: ['Full 2-day access', 'Exhibitions & keynotes', 'Digital certificate'],
      category: 'in-person'
    },
    {
      name: 'VIP Delegate',
      description: 'Premium access with exclusive networking opportunities.',
      price: 220,
      originalPrice: 250,
      features: ['Full 2-day access', 'VIP networking lounge', 'Exclusive workshops', 'Digital certificate'],
      category: 'vip'
    },
    {
      name: 'Agency/Team Pass',
      description: 'Special pricing for creative agencies and teams.',
      price: 145,
      originalPrice: 180,
      features: ['Full 2-day access', 'Team networking zone', 'Agency showcase', 'Digital certificate'],
      category: 'in-person'
    },
    {
      name: 'Students & Young Creatives',
      description: 'Special discounted access for students and emerging creatives.',
      price: 50,
      originalPrice: 60,
      features: ['Full 2-day access', 'Student networking', 'Career development sessions', 'Digital certificate'],
      category: 'student'
    },
    {
      name: 'International Delegate',
      description: 'Special pricing for international attendees.',
      price: 250,
      originalPrice: 280,
      features: ['Full 2-day access', 'International networking', 'Global insights sessions', 'Digital certificate'],
      category: 'in-person'
    },
    {
      name: 'Virtual Access',
      description: 'Online access to all summit sessions and content.',
      price: 20,
      originalPrice: 25,
      features: ['Live stream access', 'On-demand recordings', 'Virtual networking', 'Digital certificate'],
      category: 'virtual'
    }
  ];

  const [quantities, setQuantities] = useState(ticketTypes.reduce((acc, t) => ({ ...acc, [t.name]: 1 }), {}));
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'in-person', label: 'In-Person' },
    { id: 'virtual', label: 'Virtual' },
    { id: 'student', label: 'Student' },
    { id: 'vip', label: 'VIP' }
  ];

  const filteredTickets = activeTab === 'all' 
    ? ticketTypes 
    : ticketTypes.filter(ticket => ticket.category === activeTab);

  const totalAmount = selectedTickets.reduce((sum, t) => sum + t.price * t.quantity, 0);
  const totalTickets = selectedTickets.reduce((sum, t) => sum + t.quantity, 0);

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-3 sm:px-4 pb-24"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Tab Navigation */}
      <motion.div 
        className="flex flex-wrap justify-left py-4 gap-2 mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm ${
              activeTab === tab.id
                ? 'bg-paan-dark-blue text-white shadow-lg'
                : 'bg-transparent text-paan-dark-blue border-2 border-paan-dark-blue hover:bg-paan-dark-blue hover:text-white'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Ticket Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        key={activeTab}
      >
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket, index) => {
            const isSelected = selectedTickets.find(s => s.name === ticket.name);
            return (
              <motion.div 
                key={ticket.name} 
                className={`p-4 sm:p-6 rounded-lg border-2 shadow-sm hover:shadow-lg transition-all duration-300 relative ${
                  isSelected 
                    ? 'bg-gradient-to-r from-paan-yellow to-paan-red border-paan-yellow' 
                    : 'bg-white border-gray-200'
                }`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={`absolute -top-2 right-2 sm:right-4 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                    ticket.name === 'General Admission' ? 'bg-paan-red text-white' : 'bg-paan-blue text-white'
                  }`}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                >
                  {ticket.name === 'General Admission' ? 'MOST POPULAR' : 
                   ticket.name === 'Agency/Team Pass' ? 'MEMBER PRICE' :
                   ticket.name === 'Students & Young Creatives' ? 'STUDENT' :
                   ticket.name === 'International Delegate' ? 'PRIORITY' :
                   ticket.name === 'Virtual Access' ? 'ONLINE' :
                   ticket.category === 'vip' ? 'VIP' : 'IN-PERSON'}
                </motion.div>

                <div className="flex flex-col h-full">
                  <div className="mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-paan-dark-blue mb-2">{ticket.name}</h2>
                    <p className="text-paan-dark-blue/80 text-xs sm:text-sm">{ticket.description}</p>
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-gray-500 line-through text-xs sm:text-sm">${ticket.originalPrice}</span>
                      <span className="text-xs text-paan-red font-medium">
                        Save {Math.round((1 - ticket.price / ticket.originalPrice) * 100)}%
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-paan-dark-blue">${ticket.price}</h3>
                    <p className="text-xs text-paan-red mt-1">Early bird pricing (until February 21st, 2026)</p>
                  </div>
                  <div className="mb-4 sm:mb-6">
                    <ul className="space-y-1 text-paan-dark-blue text-xs sm:text-sm">
                      {ticket.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Icon icon="mdi:check" className="w-3 h-3 sm:w-4 sm:h-4 text-paan-green mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between mt-auto gap-3">
                    {!isSelected ? (
                      <>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button
                            onClick={() => setQuantities(prev => ({ ...prev, [ticket.name]: Math.max(1, prev[ticket.name] - 1) }))}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-paan-dark-blue flex items-center justify-center hover:bg-paan-dark-blue hover:text-white transition-colors disabled:opacity-50"
                            disabled={quantities[ticket.name] <= 1}
                          >
                            <Icon icon="mdi:minus" className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <span className="font-semibold text-paan-dark-blue min-w-6 sm:min-w-8 text-center text-sm sm:text-base">
                            {quantities[ticket.name]}
                          </span>
                          <button
                            onClick={() => setQuantities(prev => ({ ...prev, [ticket.name]: Math.min(50, prev[ticket.name] + 1) }))}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-paan-dark-blue flex items-center justify-center hover:bg-paan-dark-blue hover:text-white transition-colors disabled:opacity-50"
                            disabled={quantities[ticket.name] >= 50}
                          >
                            <Icon icon="mdi:plus" className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            const qty = quantities[ticket.name];
                            if (qty > 0) {
                              setSelectedTickets(prev => {
                                const existingIndex = prev.findIndex(s => s.name === ticket.name);
                                if (existingIndex >= 0) {
                                  const newPrev = [...prev];
                                  newPrev[existingIndex] = { name: ticket.name, quantity: qty, price: ticket.price };
                                  return newPrev;
                                }
                                return [...prev, { name: ticket.name, quantity: qty, price: ticket.price }];
                              });
                            }
                          }}
                          className="rounded-full px-4 sm:px-6 py-2 font-medium transition-colors text-sm sm:text-base bg-paan-dark-blue text-white hover:bg-paan-blue"
                        >
                          Select Ticket
                        </button>
                      </>
                    ) : (
                      <div className="w-full flex flex-col gap-2">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <Icon icon="mdi:check-circle" className="w-5 h-5 text-white" />
                            <span className="text-white font-semibold text-sm">Selected: {isSelected.quantity} ticket(s)</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedTickets(prev => prev.filter(s => s.name !== ticket.name));
                          }}
                          className="w-full rounded-full px-4 py-2 font-medium transition-all text-sm bg-white/20 text-white hover:bg-red-500 hover:text-white border border-white/30 flex items-center justify-center gap-2"
                        >
                          <Icon icon="mdi:close-circle" className="w-4 h-4" />
                          Remove Ticket
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500 text-lg">
            No tickets found for this category.
          </div>
        )}
      </motion.div>

      {errors.tickets && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg max-w-4xl mx-auto">
          <p className="text-red-600 text-center">{errors.tickets}</p>
        </div>
      )}

      {/* Sticky Floating Summary Bar - Only shows when tickets are selected */}
      {selectedTickets.length > 0 && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-paan-blue shadow-2xl z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Left side - Summary info */}
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:ticket" className="w-5 h-5 sm:w-6 sm:h-6 text-paan-blue" />
                  <div>
                    <p className="text-xs text-gray-500">Selected Tickets</p>
                    <p className="font-bold text-paan-dark-blue text-sm sm:text-base">{totalTickets} ticket{totalTickets !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div>
                  <p className="text-xs text-gray-500">Total Amount</p>
                  <p className="font-bold text-paan-dark-blue text-lg sm:text-xl">${totalAmount}</p>
                </div>
              </div>

              {/* Right side - Action buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onPrev}
                  className="flex-1 sm:flex-none bg-gray-200 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
                >
                  <Icon icon="mdi:arrow-left" className="w-4 h-4 inline mr-1" />
                  Back
                </button>
                <button
                  onClick={onNext}
                  className="flex-1 sm:flex-none bg-paan-blue text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-paan-dark-blue transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base inline-flex items-center justify-center gap-2"
                >
                  Proceed to Attendee Details
                  <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Detailed Summary Section - Still available for review */}
      {selectedTickets.length > 0 && (
        <motion.div 
          className="mt-4 sm:mt-6 p-4 sm:p-6 bg-white border border-paan-blue rounded-lg max-w-4xl mx-auto shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg sm:text-xl font-bold text-paan-dark-blue mb-3 sm:mb-4">Ticket Summary</h3>
          <div className="space-y-2">
            {selectedTickets.map(ticket => (
              <div key={ticket.name} className="flex justify-between items-center py-2 border-b border-gray-100 text-sm sm:text-base">
                <div className="flex-1">
                  <span className="font-medium">{ticket.name} × {ticket.quantity}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">${ticket.price * ticket.quantity}</span>
                  <button
                    onClick={() => setSelectedTickets(prev => prev.filter(s => s.name !== ticket.name))}
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                    title="Remove ticket"
                  >
                    <Icon icon="mdi:close-circle" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-3 sm:my-4" />
          <div className="flex justify-between font-bold text-base sm:text-lg">
            <span>Total</span>
            <span>${totalAmount}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TicketsStep;
