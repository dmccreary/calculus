# FTC Part 2 Step-by-Step Evaluator MicroSim Generation Log

## Generation Details

- **MicroSim Name**: ftc-part2-evaluator
- **Chapter**: 22 - Riemann Sums and the Fundamental Theorem
- **Start Time**: 2026-02-04 14:58:41
- **End Time**: 2026-02-04 15:05:36
- **Duration**: ~7 minutes (parallel generation with 7 other MicroSims)

## Specification

- **Type**: microsim
- **Purpose**: Walk through the FTC Part 2 evaluation process step by step
- **Learning Objective**: Students will apply FTC Part 2 to evaluate definite integrals (Bloom Level 3: Apply)
- **Bloom Taxonomy Verb**: apply, calculate, evaluate
- **Implementation**: p5.js with step reveal and graph visualization

## Files Created

| File | Description |
|------|-------------|
| `ftc-part2-evaluator.js` | Main p5.js JavaScript implementation |
| `main.html` | HTML shell with p5.js CDN |
| `index.md` | Documentation with lesson plan |
| `metadata.json` | Dublin Core metadata |

## Instructional Design Check

- **Bloom Level**: Apply (L3)
- **Bloom Verb**: apply, calculate, evaluate
- **Recommended Pattern**: Calculator with step-through solutions
- **Specification Alignment**: Aligned - step-by-step evaluation procedure with graph showing shaded area
- **Rationale**: Step reveal allows students to practice before seeing solution

## Features Implemented

- Problem bank with 5 different integrals
- 5-step evaluation process for each problem
- Graph showing function with shaded area
- Area intensifies as steps are revealed
- Theorem reminder box
- Problem dropdown for selection

## Quality Validation

- [x] Canvas height math correct (drawHeight + controlHeight)
- [x] updateCanvasSize() called first in setup()
- [x] windowResized() function implemented
- [x] describe() function for accessibility
- [x] All controls positioned below drawHeight
