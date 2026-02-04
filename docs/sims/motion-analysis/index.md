---
title: Motion Analysis
description: Interactive visualization showing the relationship between position, velocity, and acceleration for a moving object with synchronized graphs and animated particle.
image: /sims/motion-analysis/motion-analysis.png
---

# Motion Analysis: Position, Velocity, and Acceleration

<iframe src="main.html" height="560px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This visualization demonstrates one of the most fundamental relationships in calculus: how **derivatives connect position, velocity, and acceleration**. You are seeing the same motion represented four different ways simultaneously:

1. **Position s(t)** - Where the particle is at any time t
2. **Velocity v(t) = s'(t)** - How fast position is changing (the first derivative)
3. **Acceleration a(t) = v'(t) = s''(t)** - How fast velocity is changing (the second derivative)
4. **Animated particle** - The actual motion on a number line

!!! quote "Delta Moment"
    "See that particle moving back and forth? Every time you watch it, you're witnessing calculus in action! The slope of my position graph IS my velocity. And when that velocity graph gets steeper or flatter? That's acceleration doing its thing!"

## The Derivative Connection

The key insight is understanding what derivatives *mean* in terms of motion:

| If you have... | Take the derivative to get... |
|----------------|-------------------------------|
| Position s(t) | Velocity v(t) = s'(t) |
| Velocity v(t) | Acceleration a(t) = v'(t) |

### Reading the Graphs

**Velocity from Position:**

- When the position graph is **increasing**, velocity is **positive** (particle moves right)
- When the position graph is **decreasing**, velocity is **negative** (particle moves left)
- When the position graph is **flat** (slope = 0), the particle is **momentarily stationary**

**Acceleration from Velocity:**

- When velocity is **increasing**, acceleration is **positive**
- When velocity is **decreasing**, acceleration is **negative**
- Positive acceleration doesn't mean speeding up! It means velocity is becoming *more positive*

!!! warning "Common Misconception"
    Many students think positive acceleration always means the particle is speeding up. Not true! If the particle is moving left (v < 0) and a > 0, the particle is actually *slowing down* its leftward motion.

## How to Use

1. **Play/Pause**: Start or stop the animation
2. **Time Slider**: Manually scrub through time to examine specific moments
3. **Scenario Buttons**: Switch between different motion types
4. **Speed Control**: Adjust how fast the animation runs
5. **Reset**: Return to t = 0

### What to Observe

- Watch the **synchronized markers** on all three graphs move together
- Notice how the particle changes direction when **velocity crosses zero**
- See how the velocity graph gets steeper or flatter based on **acceleration**
- The **velocity arrow** on the particle shows direction and relative speed

## Motion Scenarios

| Scenario | Position Formula | Key Features |
|----------|-----------------|--------------|
| Polynomial | s(t) = t^3/30 - t^2/2 + 2t | Changes direction, varying acceleration |
| Sinusoidal | s(t) = 5sin(t/2) | Periodic back-and-forth motion |
| Quadratic | s(t) = -t^2/5 + 2t | Constant negative acceleration (like gravity) |
| Exponential Decay | s(t) = 8(1 - e^(-t/3)) | Approaches a limit, slowing down |

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. **Explain** that velocity is the derivative of position (Bloom Level 2: Understand)
2. **Explain** that acceleration is the derivative of velocity (Bloom Level 2: Understand)
3. **Analyze** what graph behaviors indicate about motion direction and speed changes (Bloom Level 4: Analyze)
4. **Interpret** the sign of velocity and acceleration to predict motion behavior (Bloom Level 4: Analyze)
5. **Connect** mathematical derivatives to physical motion (Bloom Level 4: Analyze)

### Prerequisite Knowledge

- Basic understanding of derivatives as rates of change
- Familiarity with function graphs
- Concept of slope

### Guided Exploration (20 minutes)

**Activity 1: Direction of Motion**

1. Select the **Polynomial** scenario
2. Play the animation and watch where velocity is positive vs negative
3. Pause at different moments and verify:
   - When v > 0, is the particle moving right?
   - When v < 0, is the particle moving left?
   - When v = 0, what is the particle doing?

**Activity 2: Understanding Acceleration**

1. Select the **Sinusoidal** scenario
2. Find moments where:
   - Acceleration is positive but the particle is slowing down
   - Acceleration is negative but the particle is speeding up
3. Explain why "positive acceleration" doesn't always mean "speeding up"

**Activity 3: Constant Acceleration**

1. Select the **Quadratic** scenario
2. Notice the acceleration graph is a horizontal line
3. What does constant negative acceleration look like in terms of motion?
4. How does this relate to objects in free fall?

### Discussion Questions

1. At what points on the position graph does the particle change direction?
2. If you only had the acceleration graph, could you determine the exact position at t = 5? Why or why not?
3. What would the graphs look like for a particle moving at constant velocity?
4. How is this visualization different from (or similar to) what you see in physics class?

### Assessment Questions

1. At t = 3 in the polynomial scenario, the velocity is negative and decreasing. Is the particle speeding up or slowing down? Explain.

2. If s(t) = t^2 - 4t + 3, find v(t) and a(t). At what time does the particle change direction?

3. Sketch what the three graphs would look like for a particle that:
   - Starts at rest
   - Accelerates to the right
   - Then moves at constant velocity

4. Why is it impossible to determine the particle's position from just the acceleration function without additional information?

## Embedding

```html
<iframe src="https://dmccreary.github.io/calculus/sims/motion-analysis/main.html"
        height="560px" width="100%" scrolling="no"></iframe>
```

## References

- [Derivative - Wikipedia](https://en.wikipedia.org/wiki/Derivative)
- [Kinematics - Wikipedia](https://en.wikipedia.org/wiki/Kinematics)
- [Motion Graphs - Physics Classroom](https://www.physicsclassroom.com/class/1DKin/Lesson-4/The-Meaning-of-Shape-for-a-p-t-Graph)
- AP Calculus AB/BC Curriculum Framework - Applications of Derivatives
