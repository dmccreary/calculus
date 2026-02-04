# FTC Connection Visualization MicroSim Generation Log

## Generation Details

- **MicroSim Name**: ftc-connection
- **Chapter**: 22 - Riemann Sums and the Fundamental Theorem
- **Start Time**: 2026-02-04 14:58:41
- **End Time**: 2026-02-04 15:05:36
- **Duration**: ~7 minutes (parallel generation with 7 other MicroSims)

## Specification

- **Type**: microsim
- **Purpose**: Show how FTC Part 1 and Part 2 are two sides of the same relationship
- **Learning Objective**: Students will analyze the relationship between differentiation and integration through the Fundamental Theorem (Bloom Level 4: Analyze)
- **Bloom Taxonomy Verb**: analyze, connect, distinguish, relate
- **Implementation**: p5.js with three synchronized panels and dual-theorem view

## Files Created

| File | Description |
|------|-------------|
| `ftc-connection.js` | Main p5.js JavaScript implementation |
| `main.html` | HTML shell with p5.js CDN |
| `index.md` | Documentation with lesson plan |
| `metadata.json` | Dublin Core metadata |

## Instructional Design Check

- **Bloom Level**: Analyze (L4)
- **Bloom Verb**: analyze, connect, distinguish, relate
- **Recommended Pattern**: Network explorer showing relationships
- **Specification Alignment**: Aligned - three panels with arrows showing integration/differentiation relationship
- **Rationale**: Synchronized panels help students see the inverse relationship

## Features Implemented

- Panel 1: f(x) - the integrand with shaded accumulation
- Panel 2: F(x) - the antiderivative with marked points
- Panel 3: Connection showing slope of F equals f(x)
- Arrows showing integration (downward) and differentiation (upward)
- View mode selector (Part 1 focus, Part 2 focus, Both)
- FTC statements display with current values

## Quality Validation

- [x] Canvas height math correct (drawHeight + controlHeight)
- [x] updateCanvasSize() called first in setup()
- [x] windowResized() function implemented
- [x] describe() function for accessibility
- [x] All controls positioned below drawHeight
