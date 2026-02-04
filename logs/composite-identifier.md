# Composite Function Identifier MicroSim Generation Log

## Timestamps
- **Start**: 2026-02-04 00:15:08
- **End**: 2026-02-04 00:18:10
- **Duration**: ~3 minutes

## MicroSim Specification

| Field | Value |
|-------|-------|
| **Name** | composite-identifier |
| **Type** | MicroSim |
| **Purpose** | Train students to recognize composite functions and identify the inside and outside functions |
| **Learning Objective** | Students will identify composite functions and decompose them into inside and outside functions |
| **Bloom's Level** | Analyze (L4) |
| **Bloom's Verbs** | Analyze, Distinguish, Deconstruct |
| **Implementation** | p5.js with canvas-based controls |

## Files Generated

| File | Description |
|------|-------------|
| `composite-identifier.js` | Main p5.js script with interactive quiz functionality |
| `main.html` | Standalone HTML wrapper for fullscreen viewing |
| `index.md` | MkDocs page with iframe, lesson plan, and documentation |
| `metadata.json` | Dublin Core metadata for faceted search |

## Features Implemented

### Visual Elements
- Function display area showing composite function expressions
- Two labeled input boxes: "Inside Function g(x)" and "Outside Function f(u)"
- Visual layer diagram showing function structure from inside to outside
- Color-coded feedback (green for correct, orange for partial, red for incorrect)
- Score tracking display

### Interactive Controls (All Canvas-Based)
- Three difficulty level buttons: Simple, Medium, Nested
- "New Function" button generates random composite from selected difficulty
- "Check Answer" button validates user input against correct answers
- "Show Solution" button reveals correct decomposition with explanation
- "Clear" button resets input fields
- Tab key toggles between input fields
- Enter key submits answer

### Problem Library (24 Problems Total)
**Simple (8 problems)**:
- cos(x^3), e^(2x+1), (5x-1)^7, sin(4x), ln(x^2), (x+3)^4, tan(2x), e^(x^2)

**Medium (8 problems)**:
- cos(x^2+1), sqrt(3x-2), ln(sin(x)), e^(cos(x)), (x^2-4)^5, sin(e^x), 1/(x^2+1), tan(x^3)

**Nested (8 problems)**:
- sin(cos(x)), e^(sin(x^2)), (cos(2x))^3, ln(x^2+e^x), sqrt(1+sin(x)), (e^x+1)^4, cos(ln(x)), e^(x^2+2x)

### Instructional Design
- Progressive difficulty allows confidence building
- Immediate feedback corrects misconceptions quickly
- Layer diagram provides visual representation of composition structure
- Solution explanations include natural language descriptions
- Delta Moment quote adds narrative connection

## Technical Notes

- Uses canvas-based controls per CLAUDE.md guidelines (no DOM elements like createButton)
- Responsive width with updateCanvasSize() called first in setup()
- Expression normalization for flexible answer validation
- Keyboard input handling for text entry
- Tab navigation between input fields

## Quality Validation

- [x] Canvas-based controls only (no p5.js DOM functions)
- [x] Responsive width design
- [x] updateCanvasSize() first in setup()
- [x] Immediate feedback on answers
- [x] Progressive difficulty levels
- [x] Visual layer diagram
- [x] Score tracking
- [x] Comprehensive lesson plan in index.md
- [x] Dublin Core metadata in metadata.json

## Instructional Rationale

Active identification practice is essential before students can successfully apply the chain rule. The most common error in chain rule application is failing to correctly identify what constitutes the "inside" versus "outside" function. This MicroSim addresses that prerequisite skill with:

1. **Immediate feedback** - Students discover errors right away
2. **Visual layer diagrams** - Abstract concepts become concrete
3. **Progressive difficulty** - Students build confidence before tackling complex cases
4. **Multiple representations** - Seeing the same structure in different functions builds pattern recognition
