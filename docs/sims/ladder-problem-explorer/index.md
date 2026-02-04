---
title: Ladder Problem Explorer
description: Interactive visualization of the classic related rates ladder problem, showing how the rate of change of height depends on base position and sliding speed
image: /sims/ladder-problem-explorer/ladder-problem-explorer.png
---

# Ladder Problem Explorer

<iframe src="main.html" height="580px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit with p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

The sliding ladder problem is one of the most classic related rates problems in calculus. A ladder of fixed length $L$ leans against a wall. The base slides away from the wall at a constant rate $\frac{db}{dt}$. What is the rate at which the top of the ladder slides down the wall?

This simulation lets you see the answer visually and understand *why* the top speeds up as it approaches the ground.

### The Mathematical Setup

The ladder, wall, and ground form a right triangle with:

- $b$ = distance from wall to base of ladder (horizontal leg)
- $h$ = height of top of ladder (vertical leg)
- $L$ = ladder length (hypotenuse, constant)

The Pythagorean theorem gives us the constraint:

$$b^2 + h^2 = L^2$$

### Finding the Related Rate

To find $\frac{dh}{dt}$, we differentiate both sides with respect to time $t$:

$$\frac{d}{dt}(b^2 + h^2) = \frac{d}{dt}(L^2)$$

$$2b\frac{db}{dt} + 2h\frac{dh}{dt} = 0$$

Solving for $\frac{dh}{dt}$:

$$\frac{dh}{dt} = -\frac{b}{h} \cdot \frac{db}{dt}$$

### The Key Insight

Notice that $\frac{dh}{dt}$ depends on the ratio $\frac{b}{h}$. As the ladder slides:

- When $h$ is large (ladder nearly vertical), $\frac{b}{h}$ is small, so the top moves slowly
- When $h$ is small (ladder nearly horizontal), $\frac{b}{h}$ is large, so the top moves quickly
- As $h \to 0$, the speed $|\frac{dh}{dt}| \to \infty$

!!! quote "Delta Moment"
    "Watch that orange arrow grow as the ladder falls! The closer I get to the ground, the faster I'm moving. It's like the math is shouting 'SPEEEEED!' at me. That negative sign means I'm heading down, and the -b/h ratio tells me exactly how fast."

## How to Use

1. **Ladder Length L**: Adjust the total length of the ladder (6 to 15 feet)
2. **Base Speed db/dt**: Set how fast the base slides away from the wall (0.5 to 4 ft/sec)
3. **Base Position b**: Manually position the base to see instantaneous values
4. **Play/Pause**: Watch the ladder slide in real-time
5. **Reset**: Return to starting configuration

### What to Observe

- The **green arrow** shows the constant base velocity (db/dt)
- The **orange arrow** shows the top velocity (dh/dt) - watch it grow!
- The **data panel** updates with current positions and rates
- The **equation panel** shows the calculation with substituted values
- The **Pythagorean check** confirms $b^2 + h^2 = L^2$ at all times

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. **Apply** the related rates procedure to the ladder problem (Bloom Level 3)
2. **Calculate** dh/dt given b, h, L, and db/dt using implicit differentiation
3. **Explain** why the top of the ladder speeds up as it approaches the ground
4. **Verify** solutions using the Pythagorean constraint

### Prerequisite Knowledge

- Implicit differentiation
- Chain rule for derivatives
- Pythagorean theorem
- Understanding of rate of change

### Suggested Activities

1. **Prediction First**: Before pressing Play, ask students to predict: will the top move at constant speed, speed up, or slow down? Why?

2. **Critical Position**: At what position is |dh/dt| = |db/dt|? (Answer: when b = h, i.e., when the ladder makes a 45-degree angle)

3. **Numerical Exploration**: Set L = 10, db/dt = 2. Calculate dh/dt when b = 3, 6, and 9. Verify with the simulation.

4. **Limit Investigation**: What happens mathematically as b approaches L? What does this mean physically?

5. **Parameter Sensitivity**: How does changing L affect dh/dt at a fixed position? How does changing db/dt affect it?

### Discussion Questions

1. Why is dh/dt negative? What does the sign tell us about direction?

2. The formula shows $\frac{dh}{dt} = -\frac{b}{h} \cdot \frac{db}{dt}$. Why does the ratio b/h matter more than the individual values?

3. In real life, what would prevent the infinite speed predicted as h approaches 0?

4. How would this problem change if the ground were frictionless? (The ladder couldn't stay in contact with both surfaces.)

### Assessment Questions

1. A 13-foot ladder leans against a wall. The base is 5 feet from the wall and sliding away at 2 ft/sec. How fast is the top sliding down?
   - *Solution*: h = 12, dh/dt = -(5/12)(2) = -5/6 ft/sec

2. At what height is the top of the ladder when |dh/dt| = 3|db/dt|?
   - *Solution*: When b/h = 3, so h = b/3. Combined with $b^2 + h^2 = L^2$, solve for h.

3. A 10-foot ladder has its base sliding at 1 ft/sec. At what position b is the top falling at 2 ft/sec?
   - *Solution*: Need b/h = 2 with $b^2 + h^2 = 100$. Substituting h = b/2: $b^2 + b^2/4 = 100$, so $b = 4\sqrt{5} \approx 8.94$ ft.

## Embedding

```html
<iframe src="https://dmccreary.github.io/calculus/sims/ladder-problem-explorer/main.html"
        height="580px" width="100%" scrolling="no"></iframe>
```

## References

- [Related Rates - Wikipedia](https://en.wikipedia.org/wiki/Related_rates)
- [Implicit Differentiation - Wikipedia](https://en.wikipedia.org/wiki/Implicit_function#Implicit_differentiation)
- [Pythagorean Theorem - Wikipedia](https://en.wikipedia.org/wiki/Pythagorean_theorem)
