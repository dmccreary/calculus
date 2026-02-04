# Power Rule Integration MicroSim Generation Log

## Generation Details

- **MicroSim Name:** power-rule-integration
- **Directory:** /Users/dan/Documents/ws/calculus/docs/sims/power-rule-integration/
- **Start Time:** 2026-02-04 14:27:26
- **End Time:** 2026-02-04 14:30:06
- **Duration:** ~2 minutes 40 seconds

## Files Created

1. **script.js** - p5.js implementation with canvas-based controls
   - Bidirectional diagram showing derivative/integral relationship
   - Slider for exponent n (range -3 to 6)
   - Direction toggle between integration and differentiation
   - Step-through calculation with 4 stages
   - Graph preview showing both f(x) and F(x)
   - Numerical verification display
   - Special case handling for n = -1

2. **main.html** - Standalone HTML page
   - Links p5.js from CDN
   - Minimal styling for clean display

3. **metadata.json** - Dublin Core metadata
   - Bloom Level 3: Apply
   - Keywords: power rule, integration, antiderivative, exponent
   - Prerequisites: power-rule-derivatives, antiderivatives, exponent-rules

4. **index.md** - MkDocs documentation page
   - iframe embedding
   - Description of the power rule for integration
   - How to use instructions
   - Visual features explanation
   - Delta Moment quote
   - Complete lesson plan with activities
   - Discussion questions
   - Assessment questions
   - Common mistakes table

## Features Implemented

- [x] Two-way diagram showing derivative and integral operations
- [x] Left side: function F(x) = x^(n+1)/(n+1)
- [x] Right side: derivative f(x) = x^n
- [x] Arrow going right (derivative): "multiply by n+1, subtract 1 from exponent"
- [x] Arrow going left (integral): "add 1 to exponent, divide by n+1"
- [x] Graphs showing both functions
- [x] Slider: Choose exponent n (range -3 to 6, excluding -1 handling)
- [x] Toggle: Show derivative direction / integral direction
- [x] Button: Step through the calculation
- [x] Display: Current formula and numerical verification
- [x] Stage 1: Show x^n with specific n value
- [x] Stage 2: Show "add 1 to exponent" giving x^(n+1)
- [x] Stage 3: Show "divide by new exponent" giving x^(n+1)/(n+1)
- [x] Stage 4: Verify by differentiating back to x^n
- [x] Special case message for n = -1

## Technical Notes

- Uses p5.js canvas-based controls (no DOM elements)
- Responsive design with updateCanvasSize()
- Purple theme accent color consistent with textbook
- Animation phase for pulsing current step highlight
- Fade-in animations for step reveals
