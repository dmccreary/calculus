# Conical Tank Draining MicroSim Generation Log

## Generation Details

- **Start Time:** 2026-02-04 00:15:10
- **End Time:** 2026-02-04 00:18:10
- **Duration:** 3 minutes
- **Generator:** Claude Opus 4.5 via microsim-generator skill

## MicroSim Specification

| Field | Value |
|-------|-------|
| Name | conical-tank-draining |
| Type | microsim |
| Library | p5.js |
| Purpose | Calculate how fast water level changes in a conical tank |
| Learning Objective | Students will calculate how fast water level changes in a conical tank, understanding the relationship between tank dimensions and rate of water level change |
| Bloom Level | Apply (L3) |
| Bloom Verbs | calculate, apply, understand |

## Visual Elements

- Cross-section view of conical tank (vertex down)
- Water level shown in blue, animated as it drains
- Labels: tank height (H), tank radius (R), water height (h), water radius (r)
- Similar triangles diagram highlighted in corner
- Formula panel displaying derivation steps
- Values panel showing: V, h, r, dV/dt, dh/dt in real-time

## Interactive Controls

| Control | Type | Range | Default | Purpose |
|---------|------|-------|---------|---------|
| H (tank height) | slider | 5-15 ft | 10 ft | Set total tank height |
| R (tank radius) | slider | 2-6 ft | 4 ft | Set tank radius at top |
| dV/dt (drain rate) | slider | -5 to -0.5 ft^3/min | -2 | Set volume drainage rate |
| Play/Pause | button | - | Pause | Toggle animation |
| Reset | button | - | - | Reset to defaults |
| Click tank | interaction | - | - | Set water level by clicking |

## Files Generated

| File | Purpose | Lines |
|------|---------|-------|
| `conical-tank-draining.js` | p5.js simulation code | ~450 |
| `main.html` | Standalone HTML wrapper | 24 |
| `index.md` | MkDocs lesson page with documentation | ~150 |
| `metadata.json` | Dublin Core metadata for search | 75 |

## Key Formulas Displayed

1. **Similar triangles:** r/h = R/H
2. **Volume substituted:** V = (piR^2/3H^2)h^3
3. **Differentiated:** dV/dt = (piR^2/H^2)h^2 * dh/dt
4. **Solved:** dh/dt = (H^2/piR^2h^2) * dV/dt

## Instructional Rationale

The MicroSim emphasizes:
- Similar triangles relationship as the key insight
- Why we eliminate r before differentiating
- Real-time visualization of how dh/dt accelerates as water level drops
- Connection between geometric reasoning and calculus application

## Technical Notes

- Canvas-based controls (no p5.js DOM functions) per project guidelines
- Responsive design with `updateCanvasSize()` in setup
- Animation uses calculated dh/dt scaled by animation speed
- Water level can be set by clicking on tank visualization
- Similar triangles diagram provides visual reinforcement

## Quality Checklist

- [x] Uses canvas-based controls (not createButton/createSlider)
- [x] Calls updateCanvasSize() first in setup()
- [x] Includes Delta Moments in documentation
- [x] Has all required files (js, html, index.md, metadata.json)
- [x] Formula panel shows derivation steps
- [x] Values panel shows real-time calculations
- [x] Animation demonstrates accelerating dh/dt behavior
- [x] Responsive to window resizing
