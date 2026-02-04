---
title: Average Rate of Change Explorer
description: An interactive MicroSim that allows students to explore average rate of change by dragging two points along a curve and observing the secant line and slope calculation update in real-time.
quality_score: 90
image: /sims/average-rate-change/screenimage.png
og:image: /sims/average-rate-change/screenimage.png
twitter:image: /sims/average-rate-change/screenimage.png
social:
   cards: false
---
# Average Rate of Change Explorer

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Average Rate of Change Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This interactive visualization helps students understand the concept of **average rate of change** by allowing them to:

1. **Drag points A and B** along different mathematical curves
2. **See the secant line** connecting the two points update in real-time
3. **Observe the slope calculation** showing the rise over run formula with actual values
4. **Visualize rise and run** with color-coded segments (blue for rise, red for run)

### Features

- **Three selectable functions**: Parabola (x^2), Cubic (x^3 - 3x), and Sine wave
- **Draggable points**: Click and drag points A and B to any position on the curve
- **Real-time calculation**: The average rate of change formula updates instantly
- **Visual aids**: Dashed lines show the rise (vertical change) and run (horizontal change)
- **Coordinate display**: See the exact (x, y) coordinates of each point

## Embedding This MicroSim

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/average-rate-change/main.html" height="482px" width="100%" scrolling="no"></iframe>
```

## How to Use

1. **Select a function** using the buttons at the bottom (x^2, x^3 - 3x, or sin(x))
2. **Drag point A** (red) to your desired starting position on the curve
3. **Drag point B** (blue) to your desired ending position
4. **Observe**:
   - The green secant line connecting the points
   - The blue dashed "rise" segment (vertical change)
   - The red dashed "run" segment (horizontal change)
   - The calculation box showing the exact formula and result

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

- **Calculate** the average rate of change between two points on a curve using the formula (f(b) - f(a))/(b - a)
- **Demonstrate** understanding of average rate of change as the slope of a secant line
- **Connect** the algebraic formula to its geometric interpretation (rise over run)

### Warm-Up (5 minutes)

Ask students:
- What does "rate of change" mean in everyday language?
- How would you describe how fast something is changing if you only know two data points?

### Guided Exploration (15 minutes)

1. **Start with f(x) = x^2**
   - Place A at x = 1 and B at x = 3
   - Calculate the average rate of change by hand
   - Verify using the MicroSim

2. **Explore what happens when points get closer**
   - Keep A at x = 1, move B toward x = 1
   - What do you notice about the secant line?
   - This previews the concept of instantaneous rate of change (derivatives!)

3. **Compare different functions**
   - Try the same x-values on f(x) = x^3 - 3x
   - Why is the average rate of change different?

### Independent Practice (10 minutes)

Have students complete these tasks:

1. Find two points on f(x) = x^2 where the average rate of change equals 0
2. Find two points on f(x) = sin(x) where the average rate of change is negative
3. Challenge: Can you find points where the secant line is horizontal?

### Discussion Questions

- How does the steepness of the secant line relate to the calculated value?
- What happens to the average rate of change as the two points get closer together?
- Why is this called "average" rate of change?

### Assessment

Students can demonstrate understanding by:

- Predicting the sign (positive/negative) of the rate of change before calculating
- Explaining why moving points changes the slope
- Connecting this concept to real-world examples (speed, population growth, etc.)

## Mathematical Background

The **average rate of change** of a function f(x) between two points a and b is given by:

$$\text{Average Rate of Change} = \frac{f(b) - f(a)}{b - a} = \frac{\Delta y}{\Delta x}$$

This is equivalent to:
- The slope of the **secant line** connecting the points (a, f(a)) and (b, f(b))
- The "rise over run" between the two points

### Connection to Calculus

The average rate of change is foundational to understanding **derivatives**. As the distance between points A and B approaches zero, the average rate of change approaches the **instantaneous rate of change** (the derivative):

$$f'(a) = \lim_{b \to a} \frac{f(b) - f(a)}{b - a}$$

!!! quote "Delta Moment"
    "See how the secant line tilts as I drag point B closer to A? That tilt is approaching
    my instantaneous slope - my derivative! It's like zooming in until the curve looks
    like a straight line."

## References

- [Khan Academy: Average Rate of Change](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new/ab-2-1/v/average-rate-of-change-worked-example)
- [AP Calculus AB: Average Rate of Change](https://apcentral.collegeboard.org/)
