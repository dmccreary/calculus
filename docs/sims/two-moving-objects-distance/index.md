---
title: Two Moving Objects Distance
description: Interactive visualization examining how the rate of distance change between two moving objects depends on their positions and velocities
image: /sims/two-moving-objects-distance/two-moving-objects-distance.png
---

# Two Moving Objects Distance

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This visualization helps you examine how the rate of distance change between two moving objects depends on both their positions and velocities. You'll see Car A moving north/south and Car B moving east/west from a common intersection.

### The Setup

- **Car A** travels along a north-south road at speed $v_A$ (mph)
- **Car B** travels along an east-west road at speed $v_B$ (mph)
- Both cars start at the origin (the intersection) at time $t = 0$

### The Distance Formula

If Car A has traveled $a$ miles from the origin and Car B has traveled $b$ miles, the distance between them is:

$$d = \sqrt{a^2 + b^2}$$

### The Key Formula: Rate of Distance Change

The rate at which the distance changes is given by:

$$\frac{dd}{dt} = \frac{a \cdot \frac{da}{dt} + b \cdot \frac{db}{dt}}{d}$$

Where:

- $\frac{da}{dt} = \pm v_A$ (positive if moving away from origin)
- $\frac{db}{dt} = \pm v_B$ (positive if moving away from origin)

!!! quote "Delta Moment"
    "See how dd/dt isn't just about how fast each car is going? It's a weighted combination based on WHERE each car currently is! When both cars move away from the intersection, the distance grows faster than if one were heading back."

## How to Use

1. **Car A Speed Slider**: Set Car A's speed (20-100 mph)
2. **Car B Speed Slider**: Set Car B's speed (20-100 mph)
3. **Direction Buttons**: Choose N/S for Car A and E/W for Car B
4. **Time Slider**: Manually scrub through time (0-5 hours)
5. **Play/Pause**: Animate the motion
6. **Reset**: Return to initial conditions

### What to Observe

- The **distance line** (red dashed) connecting the two cars
- The **velocity vectors** (arrows) showing each car's direction
- The **d(t) graph** showing distance over time
- The **observation panel** showing current values of a, b, d, and dd/dt
- Whether the cars are getting **closer** or **farther apart**

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. **Analyze** how the rate of distance change depends on both position and velocity (Bloom Level 4)
2. **Apply** the related rates formula for distance between two moving objects
3. **Investigate** how direction changes affect dd/dt

### Prerequisite Knowledge

- Pythagorean theorem for distance
- Basic derivatives and rates of change
- Chain rule (helpful but not required)

### Suggested Activities

1. **Symmetric Case**: Set both cars to the same speed going away from the origin. Observe how dd/dt changes over time even though speeds are constant.

2. **Direction Investigation**:
   - Start with Car A going North, Car B going East (both away from origin)
   - Note dd/dt is always positive
   - Change Car A to South (toward origin)
   - How does dd/dt change? When is it zero?

3. **Speed vs Position**:
   - Set Car A at 100 mph, Car B at 20 mph
   - Observe which car's position contributes more to dd/dt
   - Now swap: Car A at 20 mph, Car B at 100 mph
   - How does the d(t) graph change?

4. **Finding the Minimum Distance**: When both cars head toward and then past the intersection, at what time is the distance minimized? (Hint: dd/dt = 0)

### Discussion Questions

1. Why doesn't the distance simply increase at the sum of the two speeds?
2. What happens to dd/dt when one car is very close to the origin?
3. If Car A goes North at 60 mph and Car B goes West at 60 mph, is dd/dt the same as if Car B went East?
4. Can dd/dt ever be greater than the speed of either car? Under what conditions?

### Assessment Questions

1. Car A travels north at 50 mph and Car B travels east at 40 mph. After 2 hours:
   - What is the distance between them?
   - What is dd/dt at that moment?

2. If both cars travel away from the origin at equal speeds $v$, show that $dd/dt = v\sqrt{2}$ always.

3. At $t = 1$ hour, Car A is 60 miles north and Car B is 80 miles east. If Car A travels at 30 mph north and Car B at 40 mph west, is the distance increasing or decreasing?

## Embedding

```html
<iframe src="https://dmccreary.github.io/calculus/sims/two-moving-objects-distance/main.html"
        height="582px" width="100%" scrolling="no"></iframe>
```

## References

- [Related Rates - Wikipedia](https://en.wikipedia.org/wiki/Related_rates)
- [Pythagorean Theorem - Wikipedia](https://en.wikipedia.org/wiki/Pythagorean_theorem)
- [Chain Rule - Wikipedia](https://en.wikipedia.org/wiki/Chain_rule)
