---
title: Direction of Motion Analyzer
description: Interactive MicroSim analyzing when an object moves in positive vs negative direction based on the sign of velocity, showing how direction changes occur when v(t) = 0.
quality_score: 90
image: /sims/direction-of-motion-analyzer/direction-of-motion-analyzer.png
og:image: /sims/direction-of-motion-analyzer/direction-of-motion-analyzer.png
twitter:image: /sims/direction-of-motion-analyzer/direction-of-motion-analyzer.png
social:
   cards: false
---
# Direction of Motion Analyzer

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run the Direction of Motion Analyzer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Direction of Motion Analyzer with the p5.js editor](https://editor.p5js.org/)

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/direction-of-motion-analyzer/main.html" height="582px" scrolling="no"></iframe>
```

## Description

This MicroSim helps students understand the fundamental connection between the sign of velocity and the direction of motion. A particle moves along a number line while a velocity graph shows when the velocity is positive, negative, or zero.

**Key Visual Elements:**

- **Number Line with Animated Particle**: Watch the particle move right (positive direction) or left (negative direction) based on velocity
- **Velocity Graph**: Shows v(t) with positive regions shaded green and negative regions shaded red
- **Direction Arrows**: Appear on the number line showing current direction of motion
- **Zero Markers**: Orange markers indicate points where v(t) = 0 (direction changes)
- **Interval Timeline**: Shows intervals of positive and negative motion at a glance

**The Key Insight**: When velocity is positive, the object moves right (increasing position). When velocity is negative, the object moves left (decreasing position). When velocity equals zero, the object momentarily stops and may change direction.

!!! quote "Delta Moment"
    "See how I stop and reverse when my velocity hits zero? That's the moment of truth - my tilt goes from positive to negative (or vice versa). It's like doing a U-turn on a mathematical road!"

## How to Use

1. **Select a Scenario**: Choose from four preset motion scenarios with different behaviors
2. **Play/Pause Animation**: Watch the particle move along the number line in real-time
3. **Click on Velocity Graph**: Jump to any time by clicking on the graph
4. **Drag to Scrub**: Drag left/right on the velocity graph to manually control time
5. **Toggle Velocity Regions**: Show or hide the colored positive/negative regions
6. **Adjust Speed**: Use the slider to control animation speed

**Keyboard Shortcuts:**

- **Spacebar**: Play/Pause animation
- **R**: Reset to beginning

## Preset Scenarios

| Scenario | Behavior | Direction Changes |
|----------|----------|-------------------|
| **Parabolic Motion** | Object thrown upward, slows, stops, returns | 1 (at peak) |
| **Cubic Motion** | More complex path with two reversals | 2 |
| **Sinusoidal Motion** | Oscillates back and forth | 3 (in range) |
| **Linear Motion** | Constant positive velocity | 0 (never changes) |

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Analyze** the relationship between velocity sign and direction of motion
2. **Determine** when an object changes direction by finding where v(t) = 0
3. **Interpret** velocity graphs to predict motion behavior
4. **Connect** mathematical sign (positive/negative) to physical direction

### Bloom's Taxonomy Level

**Analyze (Level 4)**: Students analyze velocity functions to determine and interpret direction of motion.

### Conceptual Foundation

The direction of motion depends entirely on the sign of velocity:

| Velocity | Direction | Position |
|----------|-----------|----------|
| v(t) > 0 | Moving right (+) | Increasing |
| v(t) < 0 | Moving left (-) | Decreasing |
| v(t) = 0 | Momentarily stopped | Not changing |

**Why velocity must equal zero at direction changes:**
If an object is moving right and then moves left, at some instant it must have been moving neither right nor left. By the Intermediate Value Theorem, a continuous velocity function must pass through zero when changing sign.

### Suggested Activities

**Activity 1: Prediction Practice (5 minutes)**

Before running each scenario:

- Look at the velocity function formula
- Predict: Will the object ever stop? When?
- Predict: How many times will it change direction?
- Run the animation to check predictions

**Activity 2: Graph-to-Motion Translation (10 minutes)**

For each scenario:

1. Pause the animation
2. Look at the velocity graph shape
3. Describe in words what the motion will look like
4. Verify by running the animation

**Activity 3: Create Your Own Scenario (10 minutes)**

Challenge questions:

- What velocity function would make an object move right, stop twice, and end moving left?
- What function creates exactly three direction changes in 0 < t < 6?
- Can an object change direction without the velocity graph crossing zero?

### Discussion Questions

1. **Why does the particle stop when v(t) = 0?**
   - Zero velocity means zero rate of position change

2. **Can velocity equal zero without a direction change?**
   - Yes! Consider v(t) = t^2 at t = 0 (touches zero but doesn't change sign)

3. **How do we find direction change times algebraically?**
   - Solve v(t) = 0, then check if sign actually changes

4. **What's the difference between "stopped" and "changing direction"?**
   - Stopped is instantaneous; direction change requires sign change in velocity

### Assessment

Ask students to analyze a new velocity function (not one of the presets):

Given v(t) = t^2 - 4t + 3 = (t-1)(t-3):

1. When does the object stop?
2. During what intervals is it moving right? Left?
3. How many direction changes occur?
4. Sketch the motion on a number line.

**Success Criteria**: Students correctly identify zeros at t = 1 and t = 3, determine intervals of positive motion (0,1) and (3,infinity), negative motion (1,3), and identify two direction changes.

### Prerequisites

- Understanding of derivatives as rates of change
- Concept of velocity as derivative of position
- Familiarity with function graphs and sign analysis

### Time Required

15-20 minutes for full exploration and discussion

### Common Misconceptions

1. **"Negative velocity means slowing down"** - No, negative velocity means moving in the negative direction. Slowing down depends on whether speed (|v|) is decreasing.

2. **"Zero velocity means the object stops forever"** - Zero velocity at an instant means stopped at that instant. The object typically continues moving afterward.

3. **"Direction changes whenever v = 0"** - Only if the sign of v actually changes (not just touches zero).

## Mathematical Background

For a position function s(t):

- **Velocity**: v(t) = s'(t)
- **Moving right**: v(t) > 0 means s(t) is increasing
- **Moving left**: v(t) < 0 means s(t) is decreasing
- **Direction change**: v(t) = 0 AND v changes sign

!!! quote "Delta's Tip"
    "Remember: my tilt IS my velocity. Positive tilt means climbing right, negative tilt means sliding left. When my tilt hits zero, I'm perfectly level - even if just for an instant!"

## References

- [Khan Academy: Interpreting direction of motion](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-6/v/interpreting-direction-of-motion)
- [Paul's Online Math Notes: Velocity and Acceleration](https://tutorial.math.lamar.edu/classes/calci/velocity_acceleration.aspx)
- AP Calculus AB/BC Course Description: Unit 4 - Contextual Applications of Differentiation
