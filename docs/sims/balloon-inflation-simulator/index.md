---
title: Balloon Inflation Simulator
description: An interactive MicroSim that helps students compare how the rate of radius change varies with different radii and volume flow rates, discovering the inverse relationship between dr/dt and r squared.
image: /sims/balloon-inflation-simulator/balloon-inflation-simulator.png
og:image: /sims/balloon-inflation-simulator/balloon-inflation-simulator.png
twitter:image: /sims/balloon-inflation-simulator/balloon-inflation-simulator.png
quality_score: 85
social:
   cards: false
---

# Balloon Inflation Simulator

<iframe src="main.html" height="640px" width="100%" scrolling="no" style="border: none;"></iframe>

[Run the Balloon Inflation Simulator Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

This interactive simulation helps students discover why the rate of radius change (dr/dt) decreases as a balloon inflates, even when air flows in at a constant rate. The key insight is the **inverse square relationship** between dr/dt and the balloon's radius.

### What You'll See

- An **animated expanding balloon** that grows as air flows in
- **Volume flow visualization** showing air entering the balloon
- **Three synchronized graphs** showing:
    - V(t): Volume increasing over time
    - r(t): Radius increasing over time (but with decreasing slope)
    - dr/dt: Rate of radius change decreasing over time
- **Current values panel** displaying V, r, dV/dt, dr/dt, and surface area

### The Key Formula

$$\frac{dr}{dt} = \frac{dV/dt}{4\pi r^2}$$

This formula reveals why the balloon radius grows more slowly as the balloon gets bigger:

- The volume flow rate (dV/dt) stays constant (you're blowing air in at the same rate)
- But the surface area (4 pi r squared) keeps increasing
- So the same amount of air has to spread over more surface area
- Result: the radius increases more slowly as the balloon grows

!!! quote "Delta Moment"
    "Watch what happens as I inflate this balloon! At first, a little puff of air makes a big difference. But as the balloon gets bigger, that same puff barely moves the surface. It's like trying to stretch a bigger and bigger rubber band with the same force!"

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/balloon-inflation-simulator/main.html"
        height="640px"
        width="100%"
        scrolling="no"
        style="border: none;">
</iframe>
```

## Lesson Plan

### Learning Objective

Students will compare how the rate of radius change varies with different radii and volume flow rates, discovering the inverse relationship.

**Bloom's Taxonomy Level:** Analyze (L4)
**Bloom's Verbs:** Compare, Analyze, Discover

### Grade Level

High School (Grades 11-12) - AP Calculus AB/BC

### Duration

15-20 minutes

### Prerequisites

- Understanding of related rates concepts
- Familiarity with the chain rule
- Volume formula for a sphere: V = (4/3) pi r cubed
- Surface area formula: A = 4 pi r squared

### Warm-Up Questions

Before starting the simulation, ask students:

1. If you blow air into a balloon at a constant rate, does the radius increase at a constant rate?
2. Why might the rate of radius change depend on the current size of the balloon?
3. What happens to the surface area as the balloon grows?

### Activities

#### Activity 1: Initial Exploration (5 minutes)

1. Click **Play** and watch the balloon inflate
2. Focus on the **dr/dt graph** (purple) - what shape does it have?
3. Compare to the **r(t) graph** (blue) - how does the slope change?
4. Discuss: Why does dr/dt decrease even though dV/dt is constant?

#### Activity 2: Varying Flow Rate (5 minutes)

1. Reset the simulation
2. Set dV/dt to 50 cm cubed per second and run
3. Reset and set dV/dt to 150 cm cubed per second
4. Compare: Does the dr/dt graph have the same shape? Does it start higher or lower?
5. Conclusion: Higher flow rate means faster initial growth, but the decrease pattern is the same

#### Activity 3: Mathematical Analysis (5 minutes)

Starting from V = (4/3) pi r cubed, derive the relationship:

1. Differentiate both sides with respect to time t
2. dV/dt = 4 pi r squared times dr/dt (using chain rule)
3. Solve for dr/dt: dr/dt = (dV/dt) / (4 pi r squared)
4. Verify: This explains why dr/dt decreases as r increases (inverse square)

#### Activity 4: Connection to Surface Area (5 minutes)

1. Notice that 4 pi r squared is the surface area formula
2. Interpretation: The rate of radius change depends on how much surface area the new air must "stretch"
3. Physical intuition: Same air flow, bigger surface means smaller thickness increase

### Discussion Questions

1. At what point is dr/dt largest? (When r is smallest, at the start)
2. Does dr/dt ever reach zero while inflating? (No, but it approaches zero as r grows)
3. If you doubled the flow rate, how would the dr/dt graph change? (It would be exactly twice as tall at every point)
4. Real balloons eventually pop. What physical factor does this simulation ignore? (Elastic limit, pressure changes)

### Assessment

**Quick Check:** If a balloon has radius 5 cm and air flows in at 100 cm cubed per second, calculate dr/dt.

*Solution:* dr/dt = 100 / (4 pi times 25) = 100 / (100 pi) approximately equals 0.318 cm/s

**Extension Problem:** Two identical balloons start at different sizes (r = 2 cm and r = 4 cm). If air flows into both at the same rate, which balloon's radius grows faster? By what factor?

*Solution:* The smaller balloon grows faster. The ratio of rates is (4 squared) / (2 squared) = 4. The small balloon's radius increases 4 times faster!

### Related Rates Connection

This simulation connects directly to classic related rates problems:

- **Given:** dV/dt (constant rate of volume increase)
- **Find:** dr/dt (rate of radius change)
- **Key insight:** dr/dt depends on current r, creating a non-constant rate of change

This is why students must set up the equation first, then substitute values - unlike simpler problems where rates are constant.

## References

- [Khan Academy: Related Rates](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-contextual-applications-new/ab-4-4/v/related-rates-intro)
- [Paul's Online Math Notes: Related Rates](https://tutorial.math.lamar.edu/classes/calcI/relatedrates.aspx)
- [p5.js Reference](https://p5js.org/reference/)
