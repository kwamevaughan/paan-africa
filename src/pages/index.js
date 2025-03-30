// pages/index.js
import Image from 'next/image';
import Header from '../layouts/header';

const HomePage = () => {
  return (
    <main className="mx-auto flex max-w-7xl flex-col justify-center gap-6 px-3 pt-6 font-[family-name:var(--font-geist-sans)] sm:gap-12 sm:px-0 sm:pt-0">
      <Header />
      <div className="justify-centersm:items-start row-start-2 flex flex-col items-center gap-8">
        <div className="flex items-center gap-4">
          
          Website under construction...
          {/* prettier-ignore */}
          
        </div>
        
      </div>
    </main>
  );
};

export default HomePage;
