---
title: Speed Change Analyzer
description: Interactive MicroSim showing when an object speeds up vs slows down based on the signs of velocity and acceleration, with three synchronized graphs and a sign comparison table.
quality_score: 92
image: /sims/speed-change-analyzer/speed-change-analyzer.png
og:image: /sims/speed-change-analyzer/speed-change-analyzer.png
twitter:image: /sims/speed-change-analyzer/speed-change-analyzer.png
social:
   cards: false
---
# Speed Change Analyzer

<iframe src="main.html" height="622px" width="100%" scrolling="no"></iframe>

[Run the Speed Change Analyzer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Speed Change Analyzer with the p5.js editor](https://editor.p5js.org/)

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/speed-change-analyzer/main.html" height="622px" scrolling="no"></iframe>
```

## Description

This MicroSim helps students understand one of the trickiest concepts in kinematics: determining when an object is speeding up versus slowing down. The key insight is that it's not simply about whether velocity or acceleration is positive or negative - it's about whether they have the **same sign** or **opposite signs**.

**Three Synchronized Graphs:**

1. **Position s(t)** - Shows where the object is at each moment (blue curve)
2. **Velocity v(t)** - Shows how fast and in what direction the object is moving (orange curve)
3. **Acceleration a(t)** - Shows how the velocity is changing (purple curve)

**Color-Coded Regions:**

- **Green regions**: Object is speeding up (velocity and acceleration have the same sign)
- **Red regions**: Object is slowing down (velocity and acceleration have opposite signs)

**Animated Particle:**

- Size grows when speeding up, shrinks when slowing down
- Color matches the current state (green or red)
- Arrow shows direction of motion

!!! quote "Delta Moment"
    "Here's the secret: I don't care if I'm going forward or backward - I speed up when my push is in the same direction I'm already moving! Push the same way I'm going? Faster! Push against me? I slow down. Simple as that!"

## The Key Rule

| Velocity | Acceleration | Same Sign? | Result |
|:--------:|:------------:|:----------:|:------:|
| + | + | Yes | Speeding Up |
| - | - | Yes | Speeding Up |
| + | - | No | Slowing Down |
| - | + | No | Slowing Down |

**In plain English:**

- When velocity and acceleration point the **same direction** (both positive or both negative), the object speeds up
- When velocity and acceleration point **opposite directions**, the object slows down

## How to Use

1. **Select a Position Function**: Click one of the four function buttons to explore different motion scenarios
2. **Control Time**: Drag the time slider or click Play to animate
3. **Watch the Particle**: Notice how its size and color change as it speeds up or slows down
4. **Study the Sign Table**: The comparison panel shows the current signs and the resulting behavior
5. **Observe the Colors**: Green regions = speeding up, Red regions = slowing down across all three graphs

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Determine** when an object is speeding up or slowing down given velocity and acceleration information
2. **Analyze** the relationship between the signs of velocity and acceleration
3. **Evaluate** motion scenarios by examining position, velocity, and acceleration graphs simultaneously
4. **Predict** speed changes before they occur based on sign analysis

### Bloom's Taxonomy Level

**Analyze (Level 4)**: Students analyze the relationship between velocity and acceleration signs to determine whether speed is increasing or decreasing.

### Suggested Activities

**Activity 1: Sign Pattern Recognition (5 minutes)**

Before using the simulation, have students predict:

- At t = 0 with the cubic function, is the object speeding up or slowing down? Why?
- What happens at t = 1 and t = 3? What's special about these points?
- When does the object momentarily stop (v = 0)?

**Activity 2: Graph Reading Practice (10 minutes)**

For each function:

1. Pause at various times and identify whether v and a have the same or opposite signs
2. Predict the color of the region before revealing
3. Explain why the particle grows or shrinks at that moment

**Activity 3: Real-World Translation (10 minutes)**

Connect to everyday experiences:

- "A car moving forward (v > 0) while braking (a < 0) is..."
- "A car rolling backward (v < 0) down a hill with gravity pulling it faster (a < 0) is..."
- "A ball thrown upward (v > 0) while gravity pulls down (a < 0) is..."

**Activity 4: Critical Points Investigation (5 minutes)**

Find and discuss:

- Points where v = 0 (direction changes)
- Points where a = 0 (maximum/minimum velocity)
- The transition points between green and red regions

### Common Misconceptions

1. **"Negative acceleration always means slowing down"** - False! A negative acceleration on a negative velocity speeds the object up.

2. **"Speeding up means positive acceleration"** - Only true when velocity is also positive.

3. **"At v = 0, the object isn't accelerating"** - The object can have non-zero acceleration even when momentarily at rest (like a ball at the top of its throw).

### Assessment

Ask students to explain in their own words:

1. What determines whether an object is speeding up or slowing down?
2. Can an object with negative velocity be speeding up? Give an example.
3. At the moment when v = 0, what can we say about whether the object is speeding up or slowing down?

**Success Criteria**: Students correctly identify that it's the relationship between velocity and acceleration signs (same = speeding up, opposite = slowing down) that matters, not the individual signs.

### Prerequisites

- Understanding of position, velocity, and acceleration
- Ability to read and interpret graphs
- Concept of derivatives as rates of change

### Time Required

20-25 minutes for full exploration and discussion

## References

- [Khan Academy: Analyzing motion problems (integral calculus)](https://www.khanacademy.org/math/ap-calculus-ab/ab-applications-of-integration-new/ab-8-2/v/motion-problems-with-integrals)
- [Paul's Online Math Notes: Velocity and Acceleration](https://tutorial.math.lamar.edu/classes/calci/velocityacceleration.aspx)
- AP Calculus AB/BC Course Description: Unit 4 - Contextual Applications of Differentiation
