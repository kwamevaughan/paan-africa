# Complete Refactoring Plan for purchase-ticket.js

## Current Status
- **Current file size**: 1,912 lines
- **Target file size**: ~400-500 lines (main page logic only)
- **Reduction needed**: ~1,400 lines

## Components Already Extracted ✅
1. **ContactInfoStep.js** (~130 lines) - Step 1 contact form
2. **TicketsStep.js** (~280 lines) - Step 2 ticket selection
3. **FormInput.js** (~30 lines) - Reusable form input component

## Components to Extract 🔄

### High Priority (Large Components)
1. **AttendeesStep.js** (~514 lines, lines 836-1350)
   - Purchaser information form
   - Attendee details forms
   - Documents & support section
   - Terms & preferences
   - Order summary sidebar

2. **PaymentStep.js** (~540 lines, lines 1351-1891)
   - Payment method selection
   - Invoice generation
   - Promo code validation
   - Order summary
   - Payment buttons

3. **Hero.js** (~80 lines)
   - Hero section with countdown timer
   - Can be reused across summit pages

### Medium Priority (Reusable Components)
4. **StepBar.js** (~60 lines, lines 45-105)
   - Progress indicator
   - Reusable for any multi-step form

5. **OrderSummary.js** (~100 lines)
   - Ticket summary display
   - Total calculation
   - Promo code display
   - Used in both Attendees and Payment steps

6. **FormTextarea.js** (~30 lines)
   - Reusable textarea component
   - Similar to FormInput

7. **FormCheckbox.js** (~25 lines)
   - Reusable checkbox component

### Low Priority (Utility Components)
8. **SeminarLocationAndDate.js** (~20 lines, lines 1892-1912)
   - Location and date display
   - Reusable across summit pages

9. **CountdownTimer.js** (~40 lines)
   - Extracted from Hero
   - Reusable countdown component

## Estimated Final Structure

```
paan-africa/src/pages/summit/purchase-ticket.js (~450 lines)
├── Imports and setup (~50 lines)
├── Main SummitPage component (~300 lines)
│   ├── State management
│   ├── Validation logic
│   ├── Event handlers
│   ├── useEffects
│   └── JSX structure
└── Export (~5 lines)

paan-africa/src/components/summit/
├── ContactInfoStep.js (130 lines) ✅
├── TicketsStep.js (280 lines) ✅
├── AttendeesStep.js (450 lines) 🔄
├── PaymentStep.js (480 lines) 🔄
├── Hero.js (80 lines) 🔄
├── StepBar.js (60 lines) 🔄
├── OrderSummary.js (100 lines) 🔄
└── SeminarLocationAndDate.js (20 lines) 🔄

paan-africa/src/components/common/
├── FormInput.js (30 lines) ✅
├── FormTextarea.js (30 lines) 🔄
└── FormCheckbox.js (25 lines) 🔄
```

## Benefits of Full Refactoring

### Code Organization
- **Maintainability**: Each component has single responsibility
- **Testability**: Easier to write unit tests for isolated components
- **Reusability**: Form components can be used across the app
- **Readability**: Main file focuses on business logic, not UI details

### Performance
- **Code splitting**: Components can be lazy-loaded
- **Smaller bundles**: Better initial load time
- **Easier debugging**: Isolated components are easier to debug

### Developer Experience
- **Faster development**: Reusable components speed up new features
- **Less duplication**: DRY principle applied
- **Better collaboration**: Multiple developers can work on different components

## Implementation Steps

### Phase 1: Extract Reusable Form Components (30 min)
1. Create FormTextarea.js
2. Create FormCheckbox.js
3. Update existing components to use them

### Phase 2: Extract Large Step Components (1 hour)
1. Extract AttendeesStep.js
2. Extract PaymentStep.js
3. Update imports in main file

### Phase 3: Extract Utility Components (30 min)
1. Extract StepBar.js
2. Extract OrderSummary.js
3. Extract Hero.js
4. Extract SeminarLocationAndDate.js

### Phase 4: Testing & Cleanup (30 min)
1. Test all steps work correctly
2. Remove unused code
3. Update documentation
4. Run diagnostics

## Expected Results

- **Main file**: 1,912 → ~450 lines (76% reduction)
- **New components**: 9 reusable components
- **Code duplication**: Reduced by ~60%
- **Maintainability**: Significantly improved

## Next Actions

Run this command to start Phase 2:
```bash
# This will be done programmatically
```

Would you like me to proceed with the full refactoring?
