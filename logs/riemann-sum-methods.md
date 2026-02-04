# Four Riemann Sum Methods Comparison MicroSim Generation Log

## Generation Details

- **MicroSim Name**: riemann-sum-methods
- **Chapter**: 22 - Riemann Sums and the Fundamental Theorem
- **Start Time**: 2026-02-04 14:58:41
- **End Time**: 2026-02-04 15:05:36
- **Duration**: ~7 minutes (parallel generation with 7 other MicroSims)

## Specification

- **Type**: microsim
- **Purpose**: Compare all four approximation methods (left, right, midpoint, trapezoidal) on the same function
- **Learning Objective**: Students will evaluate which Riemann sum method provides the best approximation for a given function (Bloom Level 5: Evaluate)
- **Bloom Taxonomy Verb**: evaluate, compare, judge, assess
- **Implementation**: p5.js with four-panel display and interactive comparison

## Files Created

| File | Description |
|------|-------------|
| `riemann-sum-methods.js` | Main p5.js JavaScript implementation |
| `main.html` | HTML shell with p5.js CDN |
| `index.md` | Documentation with lesson plan |
| `metadata.json` | Dublin Core metadata |

## Instructional Design Check

- **Bloom Level**: Evaluate (L5)
- **Bloom Verb**: evaluate, compare, judge, assess
- **Recommended Pattern**: Sorting/ranking activities with feedback
- **Specification Alignment**: Aligned - comparison table with error highlighting and best method indicator
- **Rationale**: Students evaluate which method is best by comparing errors

## Features Implemented

- Main graph with selected method visualization
- Mini preview panels for all four methods
- Comparison table with error values
- Best method highlighted in green
- Radio button selection for main view
- n slider for number of subintervals (2-100)

## Quality Validation

- [x] Canvas height math correct (drawHeight + controlHeight)
- [x] updateCanvasSize() called first in setup()
- [x] windowResized() function implemented
- [x] describe() function for accessibility
- [x] All controls positioned below drawHeight
