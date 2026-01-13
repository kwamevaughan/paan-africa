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
    // Check if it's Christmas season (December 24th - January 1st)
    const checkChristmasSeason = () => {
      const now = new Date();
      const month = now.getMonth(); // 0-11 (0 = January)
      const day = now.getDate();
      
      // December 24th to December 31st, or January 1st
      const isDecember = month === 11 && day >= 24; // December 24th onwards
      const isEarlyJanuary = month === 0 && day <= 1; // January 1st
      
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

