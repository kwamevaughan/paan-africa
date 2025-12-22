import { createContext, useContext, useState, useEffect } from 'react';

const ChristmasContext = createContext();

export const useChristmas = () => {
  const context = useContext(ChristmasContext);
  if (!context) {
    throw new Error('useChristmas must be used within a ChristmasProvider');
  }
  return context;
};

export const ChristmasProvider = ({ children }) => {
  const [isChristmasMode, setIsChristmasMode] = useState(false);

  useEffect(() => {
    // Check if it's Christmas season (December 1st - January 6th)
    const checkChristmasSeason = () => {
      const now = new Date();
      const month = now.getMonth(); // 0-11 (0 = January)
      const day = now.getDate();
      
      // December 1st to December 31st, or January 1st to January 6th
      const isDecember = month === 11; // December
      const isEarlyJanuary = month === 0 && day <= 6; // January 1-6
      
      setIsChristmasMode(isDecember || isEarlyJanuary);
    };

    checkChristmasSeason();
  }, []);

  const toggleChristmasMode = () => {
    setIsChristmasMode(prev => !prev);
  };

  return (
    <ChristmasContext.Provider value={{ isChristmasMode, toggleChristmasMode }}>
      {children}
    </ChristmasContext.Provider>
  );
};

