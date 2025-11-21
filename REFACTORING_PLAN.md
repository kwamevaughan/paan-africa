# Summit Page Refactoring Plan

## Current State
- `src/pages/summit.js` is 2265 lines - too long and hard to maintain
- Mix of logic, data, and UI in one file

## Existing Components (Already Created)
- ✅ Hero.js
- ✅ StepBar.js
- ✅ ContactInfoStep.js
- ✅ TicketsStep.js
- ✅ AttendeesStep.js
- ✅ PaymentStep.js

## Components to Create

### 1. AboutSection.js ✅ CREATED
- About the Summit content
- Image with gradient overlays
- Register button

### 2. ObjectivesSection.js
- 4 objective cards with icons
- Grid layout

### 3. AtAGlanceSection.js  
- Stats cards (500+ attendees, 20+ countries, etc.)
- Countdown timer

### 4. TracksSection.js
- 7 track cards with images
- Track descriptions and tags

### 5. SpeakersSection.js
- Speaker carousel
- Speaker cards with hover effects
- Navigation arrows

### 6. SessionsSection.js
- Special features carousel
- Session cards

### 7. AwardsSection.js
- 3 award circles
- Awards ring SVG

### 8. TicketsSection.js
- Ticket pricing cards
- Mobile and desktop views
- Registration button

### 9. PartnersSection.js
- Partner logos marquee
- Sliding animation

### 10. TravelSection.js
- Venue information
- Travel support
- FAQ accordion

### 11. WhoShouldJoinSection.js
- 10 participant type cards
- Grid layout

### 12. StatsSection.js
- Count-up animation
- 4 stat cards

### 13. MarqueeSection.js
- Two marquees (left and right)
- Participant types

## Data to Extract

### speakers.js (data file)
```javascript
export const speakers = [
  { id, name, title, image, linkedin },
  ...
];
```

### sessions.js (data file)
```javascript
export const sessions = [
  { id, title, description, image, icon, category },
  ...
];
```

### tracks.js (data file)
```javascript
export const tracks = [
  { id, title, description, image, features },
  ...
];
```

## Refactored Structure

```
src/
├── pages/
│   └── summit.js (main page - orchestrates components)
├── components/
│   └── summit/
│       ├── Hero.js ✅
│       ├── AboutSection.js ✅
│       ├── ObjectivesSection.js
│       ├── AtAGlanceSection.js
│       ├── TracksSection.js
│       ├── SpeakersSection.js
│       ├── SessionsSection.js
│       ├── AwardsSection.js
│       ├── TicketsSection.js
│       ├── PartnersSection.js
│       ├── TravelSection.js
│       ├── WhoShouldJoinSection.js
│       ├── StatsSection.js
│       └── MarqueeSection.js
└── data/
    └── summit/
        ├── speakers.js
        ├── sessions.js
        └── tracks.js
```

## Benefits
1. **Maintainability**: Each section is self-contained
2. **Reusability**: Components can be reused
3. **Testing**: Easier to test individual components
4. **Performance**: Can lazy load sections
5. **Collaboration**: Multiple devs can work on different sections

## Implementation Steps
1. ✅ Create AboutSection.js
2. Extract data to separate files
3. Create remaining section components
4. Update summit.js to import and use components
5. Test all sections
6. Remove old code
7. Commit and push

## Estimated Reduction
- From: 2265 lines
- To: ~200 lines (main page) + components
- Reduction: ~90%
