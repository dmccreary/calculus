# Left vs Right Riemann Sums MicroSim Generation Log

## Generation Details

- **MicroSim Name**: left-right-riemann
- **Chapter**: 22 - Riemann Sums and the Fundamental Theorem
- **Start Time**: 2026-02-04 14:58:41
- **End Time**: 2026-02-04 15:05:36
- **Duration**: ~7 minutes (parallel generation with 7 other MicroSims)

## Specification

- **Type**: microsim
- **Purpose**: Compare left and right Riemann sum approximations visually and numerically
- **Learning Objective**: Students will distinguish between left and right Riemann sums and explain when each overestimates or underestimates (Bloom Level 4: Analyze)
- **Bloom Taxonomy Verb**: compare, distinguish, analyze
- **Implementation**: p5.js with overlay rectangles and numerical displays

## Files Created

| File | Description |
|------|-------------|
| `left-right-riemann.js` | Main p5.js JavaScript implementation |
| `main.html` | HTML shell with p5.js CDN |
| `index.md` | Documentation with lesson plan |
| `metadata.json` | Dublin Core metadata |

## Instructional Design Check

- **Bloom Level**: Analyze (L4)
- **Bloom Verb**: compare, distinguish, analyze
- **Recommended Pattern**: Comparison tools, pattern finders
- **Specification Alignment**: Aligned - side-by-side comparison with over/underestimate indicators
- **Rationale**: Comparison view supports analysis of when each method is better

## Features Implemented

- Blue rectangles for left Riemann sum
- Orange rectangles for right Riemann sum
- Toggle between left only, right only, or both overlapped
- Info panel with numerical values and error analysis
- Multiple function options
- Over/underestimate indicator based on function behavior

## Quality Validation

- [x] Canvas height math correct (drawHeight + controlHeight)
- [x] updateCanvasSize() called first in setup()
- [x] windowResized() function implemented
- [x] describe() function for accessibility
- [x] All controls positioned below drawHeight
