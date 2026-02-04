# Chain Rule Steps MicroSim Generation Log

## Generation Metadata

| Field | Value |
|-------|-------|
| Start Time | 2026-02-04 00:15:09 |
| End Time | 2026-02-04 00:17:57 |
| Duration | ~2 minutes 48 seconds |
| Generator | Claude Opus 4.5 |
| Library | p5.js |

## MicroSim Specification

**Name:** chain-rule-steps

**Purpose:** Guide students through the chain rule process with visual highlighting of each step.

**Learning Objective:** Students will apply the chain rule systematically to differentiate composite functions (Bloom Level 3: Apply)

**Bloom Taxonomy Verbs:** apply, execute, implement

## Files Generated

| File | Description | Lines |
|------|-------------|-------|
| `/docs/sims/chain-rule-steps/script.js` | p5.js interactive visualization | ~450 lines |
| `/docs/sims/chain-rule-steps/main.html` | Standalone HTML wrapper | 23 lines |
| `/docs/sims/chain-rule-steps/index.md` | MkDocs documentation page | ~150 lines |
| `/docs/sims/chain-rule-steps/metadata.json` | Dublin Core metadata | 20 lines |

## Features Implemented

### Visual Elements

- [x] Input function displayed prominently in a styled box
- [x] Color-coded inside (orange) and outside (blue) functions
- [x] Five sequential steps with fade-in animation:
  1. Identify inside and outside functions
  2. Derivative of outside (keeping inside unchanged)
  3. Derivative of inside
  4. Multiply step 2 by step 3
  5. Simplified final answer
- [x] Animated bouncing arrow indicating next step
- [x] Pulsing highlight on current step
- [x] Color legend for inside/outside function identification

### Interactive Controls

- [x] "Next Step" button to advance through steps
- [x] "Show All" button for immediate solution
- [x] "Reset" button to start over
- [x] Difficulty selector: Basic, Intermediate, Advanced
- [x] Function preset buttons (4 functions per difficulty level)

### Function Library

**Basic (4 functions):**
- sin(2x)
- (x^2)^3
- e^(3x)
- cos(5x)

**Intermediate (4 functions):**
- sin(x^2)
- (3x+1)^4
- sqrt(x^2+1)
- ln(2x+3)

**Advanced (4 functions):**
- e^(sin(x))
- sin^2(x)
- tan(x^3)
- ln(cos(x))

## Technical Implementation

- Responsive canvas width with minimum 600px for readability
- Canvas-based controls (no p5.js DOM elements per project guidelines)
- Smooth fade animations for step reveals using `fadeProgress` array
- `updateCanvasSize()` called first in setup() per project requirements
- Accessible description provided via p5.js `describe()` function

## Quality Checklist

- [x] No navigation.tabs feature used
- [x] Canvas-based controls only (no createButton/createSlider)
- [x] updateCanvasSize() as first step in setup()
- [x] Drawing region starts below title+subtitle (chartTop consideration)
- [x] Includes Delta Moment quote in documentation
- [x] Lesson plan with learning objectives
- [x] Reference links provided
- [x] iframe embed code included
- [x] Link to p5.js editor

## Instructional Rationale

Breaking the chain rule into explicit steps with visual highlighting helps students internalize the procedure before it becomes automatic. The color coding creates a visual mnemonic: orange for "inside" (warm, hidden inside) and blue for "outside" (cool, the outer wrapper). Sequential reveal encourages active engagement rather than passive reading.

## Notes

- The MicroSim supports 12 total preset functions across three difficulty levels
- Students can work through all 12 functions for comprehensive practice
- The step-by-step approach addresses the common error of forgetting to multiply by the inside derivative
- Real timestamps used throughout this log as per project requirements
