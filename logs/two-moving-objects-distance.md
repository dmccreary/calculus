# Two Moving Objects Distance MicroSim Generation Log

## Generation Details

- **Start Time:** 2026-02-04 00:15:09
- **End Time:** 2026-02-04 00:18:18
- **Duration:** ~3 minutes 9 seconds
- **Generator:** Claude Opus 4.5 via microsim-generator skill

## MicroSim Specification

| Field | Value |
|-------|-------|
| Name | two-moving-objects-distance |
| Type | p5.js MicroSim |
| Bloom Level | 4 (Analyze) |
| Bloom Verbs | examine, analyze, investigate |
| Topic | Related Rates |

## Learning Objective

Students will examine how the rate of distance change between two moving objects depends on their positions and velocities.

## Files Generated

| File | Description |
|------|-------------|
| `two-moving-objects-distance.js` | Main p5.js simulation code |
| `main.html` | Standalone HTML wrapper |
| `index.md` | MkDocs lesson plan page |
| `metadata.json` | Dublin Core metadata for search |

## Key Features Implemented

### Visual Elements
- Top-down coordinate plane view with origin at road intersection
- Two moving cars (A and B) with directional velocity vectors
- Distance line (red dashed) connecting the two cars
- Real-time value display: a, b, d, da/dt, db/dt, dd/dt
- d(t) vs time graph showing distance over simulation

### Interactive Controls
- Car A speed slider (20-100 mph)
- Car B speed slider (20-100 mph)
- Direction buttons for Car A (N/S)
- Direction buttons for Car B (E/W)
- Play/Pause animation button
- Time slider (0-5 hours)
- Reset button

### Observation Panel
- Current time
- Position values (a and b)
- Current distance (d)
- Rate of distance change (dd/dt)
- Status indicator (getting closer/farther/constant)

## Mathematical Model

### Distance Formula
```
d = sqrt(a^2 + b^2)
```

### Rate of Distance Change
```
dd/dt = (a * da/dt + b * db/dt) / d
```

Where:
- `a` = Car A's distance from origin (along y-axis)
- `b` = Car B's distance from origin (along x-axis)
- `da/dt` = Car A's velocity (positive if moving away from origin)
- `db/dt` = Car B's velocity (positive if moving away from origin)

## Implementation Notes

- Uses canvas-based controls (sliders and buttons drawn directly on canvas)
- No p5.js DOM functions used (per project guidelines)
- Responsive width with fixed height of 580px
- Map area on left (60% of width), graph on right
- Scale automatically adjusts based on canvas size
- Color-coded elements: Car A (green), Car B (blue), distance (red)

## Testing Checklist

- [ ] Verify sliders respond to drag interaction
- [ ] Verify direction buttons toggle correctly
- [ ] Verify Play/Pause animation works
- [ ] Verify Reset returns to initial state
- [ ] Verify d(t) graph updates correctly
- [ ] Verify dd/dt calculation is accurate
- [ ] Verify responsive width behavior
- [ ] Capture screenshot with bk-capture-screenshot

## Instructional Rationale

Visualizing relative motion helps students understand that dd/dt depends on both position and velocity. The simulation makes it clear that:

1. The rate of distance change is NOT simply the sum of speeds
2. Position (a and b) affects how much each velocity contributes to dd/dt
3. Direction matters - cars moving toward each other vs. away affects the sign of dd/dt
4. The formula dd/dt = (a * da/dt + b * db/dt) / d emerges naturally from observation
