---
title: Conical Tank Draining
description: Interactive visualization of related rates for water draining from a conical tank, showing similar triangles relationship between radius and height
image: /sims/conical-tank-draining/conical-tank-draining.png
---

# Conical Tank Draining

<iframe src="main.html" height="570px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit with p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

This visualization demonstrates one of the most classic related rates problems in calculus: how fast does the water level drop in a conical tank? The key insight is using similar triangles to eliminate a variable before differentiating.

### The Problem Setup

A conical tank (vertex down) has:

- **H** = tank height (total)
- **R** = tank radius at the top
- Water draining at rate **dV/dt** (negative because volume decreases)

We want to find **dh/dt** - how fast the water level is changing.

### The Similar Triangles Key

The cross-section of a cone creates similar triangles. At any moment, the water forms a smaller cone inside the tank. The ratio of dimensions is constant:

$$\frac{r}{h} = \frac{R}{H}$$

This lets us express the water radius in terms of height:

$$r = \frac{R}{H} \cdot h$$

!!! quote "Delta Moment"
    "See those two triangles? They're like copies at different scales! That's why the ratio r/h always equals R/H. This little relationship is our ticket to solving the whole problem!"

### Deriving the Formula

**Step 1:** Write volume in terms of h only

$$V = \frac{1}{3}\pi r^2 h = \frac{1}{3}\pi \left(\frac{R}{H}h\right)^2 h = \frac{\pi R^2}{3H^2}h^3$$

**Step 2:** Differentiate with respect to time

$$\frac{dV}{dt} = \frac{\pi R^2}{H^2}h^2 \cdot \frac{dh}{dt}$$

**Step 3:** Solve for dh/dt

$$\frac{dh}{dt} = \frac{H^2}{\pi R^2 h^2} \cdot \frac{dV}{dt}$$

### Key Insight

Notice that **dh/dt** depends on **h**! When the tank is nearly full (h is large), the water level drops slowly. When almost empty (h is small), the level drops much faster - even though dV/dt is constant!

!!! quote "Delta's Sidequest"
    "Wait, the water level speeds up as it drains? But the drain rate is constant! Oh, I see - when h is small, there's less surface area, so the same volume loss means more height change. Clever, physics!"

## How to Use

1. **H Slider**: Adjust the total tank height (5-15 ft)
2. **R Slider**: Adjust the tank radius at top (2-6 ft)
3. **dV/dt Slider**: Set the drainage rate (-5 to -0.5 ft^3/min)
4. **Play/Pause**: Start or stop the draining animation
5. **Reset**: Return to default values
6. **Click Tank**: Click anywhere on the tank to set the water level

### What to Observe

- The **blue region** shows current water level
- **Labels** display all dimensions: H, R, h, r
- **Similar triangles diagram** highlights the key relationship
- **Formulas panel** shows the mathematical derivation
- **Values panel** shows real-time calculations including dh/dt
- Watch how **dh/dt accelerates** as water level drops!

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. **Apply** similar triangles to eliminate variables in related rates problems (Bloom Level 3)
2. **Calculate** how fast the water level changes given tank dimensions and drain rate
3. **Understand** why the rate of water level change depends on current water height

### Prerequisite Knowledge

- Volume formula for a cone: $V = \frac{1}{3}\pi r^2 h$
- Similar triangles and proportional relationships
- Chain rule for differentiation
- Basic related rates setup

### Suggested Activities

1. **Predict First**: Before running the simulation, have students predict: Will the water level drop faster when the tank is full or nearly empty? Then verify with the simulation.

2. **Compare Tank Shapes**: Try different H and R combinations. Which tank shape causes the fastest level drop? Why?

3. **Calculate by Hand**: Pause at a specific water height. Calculate dh/dt using the formula, then verify against the displayed value.

4. **Real-World Connection**: Research actual conical tanks (traffic cones filled with water, funnels, rocket fuel tanks). Why might engineers care about this rate?

### Discussion Questions

1. Why must we eliminate r before differentiating?
2. What happens to dh/dt as h approaches 0? Is this physically realistic?
3. How would this problem change if the cone were vertex-up (like an ice cream cone)?
4. If you wanted the water level to drop at a constant rate, what would need to change?

### Assessment Questions

1. A conical tank has H = 12 ft and R = 4 ft. Water drains at 3 ft^3/min. Find dh/dt when h = 6 ft.

2. Explain why the similar triangles relationship r/h = R/H is essential to solving this problem.

3. If the tank radius is doubled while keeping height the same, how does this affect dh/dt?

## Embedding

```html
<iframe src="https://dmccreary.github.io/calculus/sims/conical-tank-draining/main.html"
        height="570px" width="100%" scrolling="no"></iframe>
```

## References

- [Related Rates - Wikipedia](https://en.wikipedia.org/wiki/Related_rates)
- [Similar Triangles - Wikipedia](https://en.wikipedia.org/wiki/Similarity_(geometry))
- [Cone Volume Formula - Wikipedia](https://en.wikipedia.org/wiki/Cone)
