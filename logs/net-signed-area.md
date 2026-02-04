# Net Signed Area Visualizer MicroSim Generation Log

## Generation Details

- **MicroSim Name**: net-signed-area
- **Chapter**: 22 - Riemann Sums and the Fundamental Theorem
- **Start Time**: 2026-02-04 14:58:41
- **End Time**: 2026-02-04 15:05:36
- **Duration**: ~7 minutes (parallel generation with 7 other MicroSims)

## Specification

- **Type**: microsim
- **Purpose**: Demonstrate that definite integrals compute net signed area, with regions below the x-axis contributing negatively
- **Learning Objective**: Students will explain how positive and negative areas combine in a definite integral (Bloom Level 2: Understand)
- **Bloom Taxonomy Verb**: explain, interpret, distinguish
- **Implementation**: p5.js with colored regions and area calculations

## Files Created

| File | Description |
|------|-------------|
| `net-signed-area.js` | Main p5.js JavaScript implementation |
| `main.html` | HTML shell with p5.js CDN |
| `index.md` | Documentation with lesson plan |
| `metadata.json` | Dublin Core metadata |

## Instructional Design Check

- **Bloom Level**: Understand (L2)
- **Bloom Verb**: explain, interpret, distinguish
- **Recommended Pattern**: Concrete data visibility, visual distinction
- **Specification Alignment**: Aligned - clear color coding for positive (blue) and negative (red) regions
- **Rationale**: Visual distinction helps students understand signed area concept

## Features Implemented

- Blue regions for positive area (above x-axis)
- Red regions for negative area (below x-axis)
- Info panel showing positive total, negative total, and net signed area
- Multiple function options that cross the x-axis
- Adjustable interval [a, b]
- Clear visual separation at x-axis

## Quality Validation

- [x] Canvas height math correct (drawHeight + controlHeight)
- [x] updateCanvasSize() called first in setup()
- [x] windowResized() function implemented
- [x] describe() function for accessibility
- [x] All controls positioned below drawHeight
