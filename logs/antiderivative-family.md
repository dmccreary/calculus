# Generation Log: antiderivative-family MicroSim

## Generation Details

- **MicroSim Name:** antiderivative-family
- **Directory:** /Users/dan/Documents/ws/calculus/docs/sims/antiderivative-family/
- **Generator:** Claude Code (claude-opus-4-5-20251101)

## Timestamps

- **Start:** 2026-02-04 14:27:26
- **End:** 2026-02-04 14:30:25

## Specification

Type: microsim

Purpose: Visualize how different values of C produce a family of parallel antiderivative curves.

Learning Objective: Students will explain why antiderivatives differ by a constant (Bloom Level 2: Understand)

Bloom Taxonomy Verb: explain, interpret, visualize

Visual elements:
- Multiple parallel curves representing F(x) + C for various values of C
- A single derivative curve f(x) shown below or in a separate panel
- Moving point on each antiderivative showing tangent lines
- All tangent lines at the same x-value have identical slopes
- Display showing current function and its derivative

Interactive controls:
- Slider: Move x-position to see tangent lines
- Slider: Add or remove curves (number of C values shown)
- Dropdown: Choose base antiderivative (e.g., x^2 family, x^3 family, sin x family)
- Toggle: Show/hide derivative curve
- Display: Slope at current x-value (same for all curves)

Behavior:
- All curves move together as a family
- Tangent lines at same x-position are parallel
- Slope display confirms derivatives are identical
- Different C values create vertical shifts only

Implementation: p5.js with multiple curve rendering and tangent line display

## Files Created

1. `script.js` - Main p5.js simulation code
2. `main.html` - Standalone HTML file
3. `index.md` - MkDocs page with lesson plan
4. `metadata.json` - Dublin Core metadata

## Notes

- Uses canvas-based controls (no DOM elements) per project guidelines
- Purple theme consistent with calculus textbook style
- Designed to work in iframe embedding
