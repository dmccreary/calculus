---
title: Can Optimizer
description: An interactive MicroSim demonstrating optimization by exploring how cylinder radius affects surface area for a fixed volume, helping students calculate optimal can dimensions.
quality_score: 92
image: /sims/can-optimizer/can-optimizer.png
og:image: /sims/can-optimizer/can-optimizer.png
twitter:image: /sims/can-optimizer/can-optimizer.png
social:
   cards: false
---
# Can Optimizer

<iframe src="main.html" height="510px" scrolling="no"></iframe>

[Run the Can Optimizer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Can Optimizer MicroSim with the p5.js editor](https://editor.p5js.org/)

## Embedding This MicroSim

Place the following line in your website to include this in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/can-optimizer/main.html" height="552px" scrolling="no"></iframe>
```

## Description

This MicroSim demonstrates one of the classic optimization problems in calculus: finding the dimensions of a cylindrical can that minimize the surface area for a given volume. Students explore how changing the radius affects the height (since volume is fixed) and consequently the total surface area.

The MicroSim features:

- **3D Cylinder Visualization**: A rotating 3D cylinder showing the current dimensions with color-coded surface areas (blue for top/bottom circles, orange for the lateral surface)
- **Surface Area Graph**: A real-time plot of S(r) showing how surface area varies with radius, with the optimal point marked in green
- **Interactive Controls**: A slider to adjust radius and an input field to change the volume
- **Data Panel**: Shows all calculated values including the percentage above the minimum surface area
- **Compare Mode**: Displays three cans (tall/thin, optimal, short/wide) to visualize why the optimal dimensions work

### The Math Behind It

For a cylinder with volume V and radius r:

- Height: h = V / (pi r^2)
- Surface Area: S(r) = 2 pi r^2 + 2 pi r h = 2 pi r^2 + 2V/r

To minimize, we take the derivative and set it equal to zero:

- dS/dr = 4 pi r - 2V/r^2 = 0
- Solving: r = (V / (2 pi))^(1/3)

At this optimal radius, the height equals the diameter (h = 2r), creating a "square" profile when viewed from the side.

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Calculate** optimal cylinder dimensions for a given volume constraint
2. **Explain** why the optimal can has height equal to diameter
3. **Apply** derivative techniques to solve real-world optimization problems
4. **Analyze** how changing constraints affects optimal solutions

### Grade Level

High School (Grades 11-12) and AP Calculus

### Prerequisites

- Understanding of derivatives
- Basic knowledge of cylinder geometry (volume and surface area formulas)
- Familiarity with setting derivatives equal to zero to find extrema

### Duration

20-30 minutes

### Activity Sequence

**Part 1: Exploration (5-7 minutes)**

1. Start with default values (V = 1000 cm^3)
2. Move the radius slider from minimum to maximum
3. Observe how the cylinder shape changes and how the surface area responds
4. Find the approximate optimal radius by watching the graph

**Part 2: Mathematical Analysis (8-10 minutes)**

1. Click "Find Optimal" to jump to the optimal radius
2. Record the optimal radius and height
3. Calculate h/2r to verify h = 2r at optimum
4. Derive the formula by hand and verify it matches

**Part 3: Comparative Analysis (5-8 minutes)**

1. Enable "Compare" mode to see three cans side by side
2. Discuss why extremes (tall/thin or short/wide) waste material
3. Change the volume to 500 cm^3 and observe how optimal dimensions scale
4. Notice that the shape (ratio h:r) stays the same regardless of volume

**Part 4: Extension Questions**

1. What if we only need to minimize the lateral surface (open-top can)?
2. How would the answer change if material costs differed for top/bottom vs. sides?
3. Why don't real soup cans exactly match the mathematical optimum?

### Assessment Ideas

- Have students predict the optimal radius for a new volume before using the simulator
- Ask students to explain in writing why the "square profile" minimizes surface area
- Calculate the material savings (percentage) compared to a poorly designed can

### Connection to AP Calculus

This activity directly addresses:

- **Applications of Derivatives**: Using derivatives to solve optimization problems
- **Critical Points**: Finding where derivative equals zero
- **Second Derivative Test**: Verifying minimum (though not shown in MicroSim, can be done analytically)
- **Mathematical Modeling**: Translating a real-world problem into calculus

## References

- [Optimization Problems - AP Calculus](https://apcentral.collegeboard.org/)
- [Calculus: Early Transcendentals by Stewart - Chapter 4.7](https://www.stewartcalculus.com/)
- [The Can Problem - Classic Optimization](https://mathworld.wolfram.com/)
