# FTC Part 1 Calculator MicroSim Generation Log

## Generation Details

- **MicroSim Name**: ftc-part1-calculator
- **Chapter**: 22 - Riemann Sums and the Fundamental Theorem
- **Start Time**: 2026-02-04 14:58:41
- **End Time**: 2026-02-04 15:05:36
- **Duration**: ~7 minutes (parallel generation with 7 other MicroSims)

## Specification

- **Type**: microsim
- **Purpose**: Practice applying FTC Part 1 with and without chain rule
- **Learning Objective**: Students will apply FTC Part 1 to find derivatives of accumulation functions (Bloom Level 3: Apply)
- **Bloom Taxonomy Verb**: apply, calculate, use
- **Implementation**: p5.js with step-by-step reveal and practice mode

## Files Created

| File | Description |
|------|-------------|
| `ftc-part1-calculator.js` | Main p5.js JavaScript implementation |
| `main.html` | HTML shell with p5.js CDN |
| `index.md` | Documentation with lesson plan |
| `metadata.json` | Dublin Core metadata |

## Instructional Design Check

- **Bloom Level**: Apply (L3)
- **Bloom Verb**: apply, calculate, use
- **Recommended Pattern**: Calculator with practice problems and step-through solutions
- **Specification Alignment**: Aligned - step-by-step solution reveal with chain rule highlighting
- **Rationale**: Practice mode with progressive hints supports skill application

## Features Implemented

- Problem bank with 6 different problems
- Step-by-step solution reveal
- Chain rule warning indicator
- Progress tracking with visual dots
- Theorem reminder box at top
- Multiple problem types (simple and chain rule)

## Quality Validation

- [x] Canvas height math correct (drawHeight + controlHeight)
- [x] updateCanvasSize() called first in setup()
- [x] windowResized() function implemented
- [x] describe() function for accessibility
- [x] All controls positioned below drawHeight
