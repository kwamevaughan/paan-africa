import React, { useState } from 'react';

const Steps = () => {
  const [hoveredStep, setHoveredStep] = useState(null);
  
  const steps = [
    {
      number: 1,
      title: "Apply",
      description: "Submit your partnership inquiry here."
    },
    {
      number: 2,
      title: "Align",
      description: "PAAN evaluates your solution's fit with agency and client needs."
    },
    {
      number: 3,
      title: "Activate",
      description: "Launch co-branded campaigns, workshops, or licensing deals."
    },
    {
      number: 4,
      title: "Grow",
      description: "Track adoption, revenue, and market insights"
    }
  ];
  
  return (
    <div className="mb-20 relative bg-gray-200 py-16">
      <section className="relative">
        <h2 className="text-2xl text-center font-medium mb-8">How it Works</h2>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start relative">
            
            {/* Continuous line through circles */}
            <div className="hidden md:block absolute top-8 left-0 right-0 w-full">
              <div className="h-1 bg-[#F25849]" style={{ margin: '0 12.5%', width: '75%' }} />
            </div>
            
            {/* Steps */}
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="flex flex-col items-center mb-8 md:mb-0 relative w-full md:w-1/4"
                onMouseEnter={() => setHoveredStep(step.number)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div 
                  className={`flex items-center justify-center w-16 h-16 rounded-full bg-[#F25849] text-white text-xl font-bold mb-3 relative z-9 transition-transform duration-300 ${hoveredStep === step.number ? 'transform scale-110' : ''}`}
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-medium mb-2 text-center">{step.title}</h3>
                <p className="text-sm text-center px-4">{step.description}</p>
              </div>
            ))}
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Steps;