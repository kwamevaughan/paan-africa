"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import TicketPurchaseForm from "./TicketPurchaseForm";

const TicketPurchaseButton = ({ 
  variant = "primary", 
  size = "md", 
  className = "",
  children 
}) => {
  const [showForm, setShowForm] = useState(false);

  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 cursor-pointer relative border-0 outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 pointer-events-auto";
  
  const variants = {
    primary: "bg-paan-red text-white hover:bg-paan-red/90 shadow-lg hover:shadow-xl transform hover:-translate-y-1",
    secondary: "bg-transparent border-2 border-paan-red text-paan-red hover:bg-paan-red hover:text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1",
    outline: "bg-transparent border border-paan-dark-blue text-paan-dark-blue hover:bg-paan-dark-blue hover:text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1",
    yellow: "bg-paan-yellow text-paan-dark-blue hover:bg-paan-yellow/90 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-full font-semibold",
    md: "px-6 py-3 text-base rounded-full font-semibold",
    lg: "px-8 py-4 text-lg rounded-full font-semibold"
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.replace(/\s+/g, ' ').trim();

  return (
    <>
      <button
        onClick={() => {
          console.log("TicketPurchaseButton clicked");
          setShowForm(true);
        }}
        className={buttonClasses}
        type="button"
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
      >
        {children || (
          <>
            <Icon icon="mdi:ticket" className="w-5 h-5" />
            Buy Ticket
          </>
        )}
      </button>

      {showForm && (
        <TicketPurchaseForm onClose={() => setShowForm(false)} />
      )}
    </>
  );
};

export default TicketPurchaseButton;
