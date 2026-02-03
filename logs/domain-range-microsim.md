# Domain and Range Visualizer MicroSim - Session Log

**Date:** 2026-02-03
**Session:** Chapter 1 content generation + first MicroSim implementation

## Overview

Created the Domain and Range Visualizer MicroSim for Chapter 1 (Foundations of Calculus). This MicroSim helps students interpret domain and range graphically by showing function graphs with highlighted number lines.

## Design Philosophy

### Control Region Interaction > Hover Interaction

**Key Decision:** Students should interact with controls in the control region rather than relying on hover interactions.

**Rationale:**
1. **Deliberate learning** - Slider interaction requires intentional movement, encouraging students to think about x-values they want to explore
2. **Mobile-friendly** - Hover doesn't work on touch devices; sliders work everywhere
3. **Accessibility** - Slider controls are more accessible for screen readers and keyboard navigation
4. **Reproducibility** - Students can set specific x-values (like x = 2.5) precisely with a slider
5. **Clear mental model** - The control region is the "input" area, the drawing region shows "output"
6. **Classroom use** - Teachers can say "move the slider to x = 3" rather than "hover over the point where x equals 3"

The original specification included hover interaction, but we replaced it with a slider control for better pedagogical outcomes.

## Files Created

```
docs/sims/domain-range-visualizer/
├── domain-range-visualizer.js  (12.7 KB - p5.js visualization)
├── main.html                   (688 B - HTML shell)
├── index.md                    (3.8 KB - documentation + lesson plan)
└── metadata.json               (2.0 KB - Dublin Core metadata)
```

## Technical Specifications

### Canvas Dimensions
- **drawHeight:** 400px (visualization area)
- **controlHeight:** 85px (two rows of controls)
- **canvasHeight:** 485px
- **iframeHeight:** 487px (canvas + 2px border)

### Control Layout
| Row | Controls |
|-----|----------|
| 1 | Function selector dropdown, Show Domain checkbox, Show Range checkbox |
| 2 | x-value slider (-5 to 5, step 0.1) with label |

### Functions Included
| Function | Domain | Range |
|----------|--------|-------|
| f(x) = x² | All real numbers | y ≥ 0 |
| f(x) = √x | x ≥ 0 | y ≥ 0 |
| f(x) = 1/x | x ≠ 0 | y ≠ 0 |
| f(x) = sin(x) | All real numbers | −1 ≤ y ≤ 1 |

## Features Implemented

### Visual Elements
- Coordinate plane with grid lines
- Function graph (blue)
- Domain number line below graph (green highlight)
- Range number line left of graph (blue highlight)
- Moveable point on curve (orange)
- Dashed lines connecting point to axes
- Coordinate display box showing (x, y)
- Info box showing domain/range in mathematical notation

### Interactive Features
- **Function selector** - Switch between 4 function types
- **x-value slider** - Move point along the curve
- **Show/Hide toggles** - Toggle domain and range highlights
- **Smart domain clamping** - Slider adjusts when switching to functions with restricted domains

### Edge Case Handling
- **Domain holes** - Open circles shown on domain line (e.g., x ≠ 0 for 1/x)
- **Range holes** - Open circles shown on range line
- **Infinity arrows** - Indicate unbounded domain/range
- **Off-graph values** - Arrow indicator + "(off graph)" label when y exceeds visible range
- **Undefined values** - "f(x) is undefined" message when point hits domain restriction

## Instructional Design

### Bloom's Taxonomy
- **Level:** Understand (L2)
- **Verb:** Interpret

### Learning Objective
Students will interpret domain and range graphically, connecting algebraic restrictions to visual representations on the coordinate plane.

### Why Slider > Hover for This Objective
For an "interpret" learning objective, students benefit from:
1. Controlling the pace of exploration
2. Being able to return to specific x-values
3. Seeing the relationship between input (x) and output (y) as cause and effect
4. Having a concrete "handle" on the abstract concept of domain

## Files Modified

- `mkdocs.yml` - Added MicroSim to navigation
- `docs/sims/index.md` - Added to MicroSims list
- `docs/chapters/01-foundations-of-calculus/index.md` - Updated iframe height to 487px

## Iteration History

1. **Initial creation** - Hover-based interaction per specification
2. **Revision** - Added x-value slider, increased control height from 50px to 85px
3. **Final** - Removed hover dependency, slider is primary interaction method

## Testing Notes

Test the MicroSim at: `http://127.0.0.1:8000/calculus/sims/domain-range-visualizer/`

Key test cases:
- [ ] Slider moves point smoothly along curve
- [ ] Domain/range highlights update correctly for each function
- [ ] Switching to √x clamps negative x-values to 0
- [ ] Switching to 1/x avoids x = 0
- [ ] Off-graph indicator appears for large |x| values on x²
- [ ] Responsive design works at different widths

## Future Enhancements

Potential improvements for later iterations:
- Add more functions (logarithmic, absolute value, piecewise)
- "Quiz mode" - show function, student identifies domain/range
- Animation mode - auto-sweep x-value to show full domain/range
- Touch-drag on the point itself (in addition to slider)
