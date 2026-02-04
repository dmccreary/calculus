# Speed Change Analyzer MicroSim Generation Log

## Generation Timestamps

- **Start:** 2026-02-04 00:15:09
- **End:** 2026-02-04 00:17:59
- **Duration:** ~2 minutes 50 seconds

## Specification

| Field | Value |
|-------|-------|
| Type | MicroSim |
| Name | speed-change-analyzer |
| Library | p5.js |
| Bloom Level | 4 (Analyze) |
| Bloom Verbs | analyze, determine, evaluate |

## Learning Objective

Students will determine when an object speeds up or slows down based on the signs of velocity and acceleration.

## Visual Elements Implemented

1. **Three stacked graphs**: Position s(t), Velocity v(t), Acceleration a(t)
2. **Color-coded regions**: Green when speeding up (same signs), Red when slowing down (opposite signs)
3. **Animated particle**: Size changes based on speed magnitude, color indicates speeding up/slowing down
4. **Direction indicator**: Arrow inside particle shows direction of motion
5. **Synchronized vertical line**: Shows current time across all three graphs
6. **Sign comparison table**: Displays current v and a values with their signs and the resulting behavior

## Interactive Controls Implemented

1. **Time slider**: Manual control of current time position
2. **Play/Pause button**: Toggle animation
3. **Position function dropdown**: Four function options (Cubic, Quadratic, Sine, Polynomial)
4. **Show/Hide Table toggle**: Toggle visibility of sign comparison table
5. **Legend**: Color key for speeding up vs slowing down regions

## Position Functions

| Name | Formula | Derivative (velocity) | Second Derivative (acceleration) |
|------|---------|----------------------|----------------------------------|
| Cubic | t^3 - 6t^2 + 9t | 3t^2 - 12t + 9 | 6t - 12 |
| Quadratic | -t^2 + 4t | -2t + 4 | -2 |
| Sine | 3sin(t) | 3cos(t) | -3sin(t) |
| Polynomial | t^4/8 - t^2 | t^3/2 - 2t | 3t^2/2 - 2 |

## Files Generated

| File | Description | Size |
|------|-------------|------|
| `speed-change-analyzer.js` | Main p5.js simulation code | ~13 KB |
| `main.html` | Standalone HTML wrapper | ~0.5 KB |
| `index.md` | MkDocs page with lesson plan | ~5 KB |
| `metadata.json` | Dublin Core metadata | ~1 KB |

## Output Directory

`/Users/dan/Documents/ws/calculus/docs/sims/speed-change-analyzer/`

## Key Implementation Details

- Uses canvas-based controls (no p5.js DOM functions) per project guidelines
- Responsive width via `updateCanvasSize()` in setup()
- All three graphs share the same time axis with synchronized vertical line
- Color regions calculated by sampling velocity and acceleration signs
- Particle size dynamically scales based on speed magnitude relative to maximum speed for current function
- Sign table shows real-time values with sign indicators and explains the rule

## Instructional Design Notes

The sign comparison table alongside the animated motion helps students internalize the speeding up/slowing down rule. By seeing the mathematical signs alongside the visual representation (growing/shrinking particle, green/red regions), students can connect the abstract rule to concrete observation.

The four different position functions provide varied examples where:
- Cubic: Has interesting behavior with local max/min, direction changes
- Quadratic: Simple parabolic motion, constant acceleration (always slowing down since a < 0 and v starts positive)
- Sine: Periodic motion, both v and a oscillate
- Polynomial: More complex behavior with multiple inflection points
