# Summit Page Components Usage Guide

## Available Components

### 1. Hero Component
```javascript
import Hero from '@/components/summit/Hero';

<Hero 
  sectionRefs={sectionRefs} 
  handleScroll={handleScroll} 
  isFixed={isFixed} 
  timeLeft={timeLeft} 
  onPartnerClick={() => setShowPartnerModal(true)} 
/>
```

### 2. CountdownBanner
```javascript
import CountdownBanner from '@/components/summit/CountdownBanner';

<CountdownBanner timeLeft={timeLeft} />
```

### 3. AboutSection
```javascript
import AboutSection from '@/components/summit/AboutSection';

<AboutSection sectionRef={sectionRefs.about} />
```

### 4. ObjectivesSection
```javascript
import ObjectivesSection from '@/components/summit/ObjectivesSection';

<ObjectivesSection sectionRef={sectionRefs.objectives} />
```

### 5. AtAGlanceSection
```javascript
import AtAGlanceSection from '@/components/summit/AtAGlanceSection';

<AtAGlanceSection />
```

### 6. TracksSection
```javascript
import TracksSection from '@/components/summit/TracksSection';

<TracksSection sectionRef={sectionRefs.program} />
```

### 7. SpeakersSection
```javascript
import SpeakersSection from '@/components/summit/SpeakersSection';

<SpeakersSection sectionRef={sectionRefs.speakers} />
```

### 8. SessionsSection
```javascript
import SessionsSection from '@/components/summit/SessionsSection';

<SessionsSection sectionRef={sectionRefs.sessions} />
```

### 9. StatsSection
```javascript
import StatsSection from '@/components/summit/StatsSection';

<StatsSection counts={counts} sectionRef={sectionRefs.stats} />
```

## Data Files

### Speakers Data
```javascript
import { speakers } from '@/data/summit/speakers';
```

### Sessions Data
```javascript
import { sessions } from '@/data/summit/sessions';
```

### Tracks Data
```javascript
import { tracks } from '@/data/summit/tracks';
```

## Example: Simplified Summit Page

```javascript
import { useState, useEffect, useRef } from 'react';
import Hero from '@/components/summit/Hero';
import CountdownBanner from '@/components/summit/CountdownBanner';
import AboutSection from '@/components/summit/AboutSection';
import ObjectivesSection from '@/components/summit/ObjectivesSection';
import AtAGlanceSection from '@/components/summit/AtAGlanceSection';
import TracksSection from '@/components/summit/TracksSection';
import SpeakersSection from '@/components/summit/SpeakersSection';
import SessionsSection from '@/components/summit/SessionsSection';
import StatsSection from '@/components/summit/StatsSection';

const SummitPage = () => {
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    objectives: useRef(null),
    program: useRef(null),
    speakers: useRef(null),
    sessions: useRef(null),
    stats: useRef(null),
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [counts, setCounts] = useState({ investorMeetings: 0, ndasSigned: 0, termSheets: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Countdown timer logic
  useEffect(() => {
    const targetDate = new Date('2026-04-21T00:00:00+03:00');
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Count up animation
  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      const targets = { investorMeetings: 150, ndasSigned: 50, termSheets: 10 };
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounts({
          investorMeetings: Math.floor(targets.investorMeetings * progress),
          ndasSigned: Math.floor(targets.ndasSigned * progress),
          termSheets: Math.floor(targets.termSheets * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setCounts(targets);
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <>
      <Hero sectionRefs={sectionRefs} timeLeft={timeLeft} />
      <CountdownBanner timeLeft={timeLeft} />
      <AboutSection sectionRef={sectionRefs.about} />
      <ObjectivesSection sectionRef={sectionRefs.objectives} />
      <AtAGlanceSection />
      <TracksSection sectionRef={sectionRefs.program} />
      <SpeakersSection sectionRef={sectionRefs.speakers} />
      <SessionsSection sectionRef={sectionRefs.sessions} />
      <StatsSection counts={counts} sectionRef={sectionRefs.stats} />
    </>
  );
};

export default SummitPage;
```

## Benefits

1. **Reduced Main File**: From 2265 lines to ~300 lines
2. **Maintainable**: Each section is self-contained
3. **Reusable**: Components can be used elsewhere
4. **Testable**: Easy to test individual sections
5. **Collaborative**: Multiple devs can work on different sections

## Next Steps

1. Create remaining sections (Awards, Tickets, Partners, Travel, etc.)
2. Update main summit.js to use all components
3. Test all sections
4. Remove old code
5. Commit and deploy
