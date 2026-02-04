---
generated_by: Claude Opus 4.5
date: 2026-02-03
version: 0.03
---

# Related Rates and Linear Approximation

## Summary

This chapter covers two major applications of derivatives: related rates and linear approximation. Students will learn to set up and solve related rates problems by identifying relationships between changing quantities and using implicit differentiation. Classic problems include ladder, balloon, shadow, and conical tank scenarios. The chapter also covers linear approximation using tangent lines and introduces differentials. After completing this chapter, students will be able to solve real-world rate problems and approximate function values.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Related Rates
2. Related Rates Setup
3. Implicit in Context
4. Rate Variables
5. Related Rates Diagram
6. Ladder Problem
7. Balloon Problem
8. Shadow Problem
9. Conical Tank Problem
10. Distance Rate Problem
11. Linear Approximation
12. Tangent Line Approx
13. Linearization Formula
14. Error in Approximation
15. Differential
16. dy Notation
17. dx Notation
18. Differential Approx
19. Marginal Analysis
20. Marginal Cost

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: The Derivative Concept](../06-derivative-concept/index.md)
- [Chapter 10: The Chain Rule](../10-chain-rule/index.md)
- [Chapter 11: Implicit Differentiation](../11-implicit-differentiation/index.md)

---

## Introduction: When Variables Change Together

In the real world, quantities rarely change in isolation. When you blow up a balloon, its radius, surface area, and volume all increase simultaneously. When a ladder slides down a wall, the height on the wall decreases while the distance from the base increases. These quantities are *related*—and their rates of change are related too.

!!! quote "Delta Moment"
    "If *this* is changing, and *that* depends on *this*... they're in it together! My favorite kind of math problems are the ones where everything is connected. Change one thing, and you've changed everything."

This chapter introduces two powerful applications of derivatives. In the first part, we'll tackle **related rates** problems—situations where multiple quantities change with time, and we need to find how fast one quantity changes given information about the others. In the second part, we'll explore **linear approximation** and **differentials**—techniques that let us use tangent lines to estimate function values and understand how small changes in inputs affect outputs.

---

## Part 1: Related Rates

### What Are Related Rates?

**Related rates** problems involve two or more quantities that are changing with respect to time and are connected by some equation. The goal is to find the rate of change of one quantity when you know the rate(s) of change of the other(s).

The key insight is this: if two variables $x$ and $y$ are both functions of time $t$, and they're related by some equation, then their derivatives with respect to time are also related. We find this relationship using implicit differentiation with respect to $t$.

#### The Related Rates Strategy

Here's the general approach to solving any related rates problem:

| Step | Action |
|------|--------|
| 1 | **Draw a diagram** and label all quantities that vary with time |
| 2 | **Identify the rates** you know and the rate you need to find |
| 3 | **Write an equation** relating the quantities (not the rates!) |
| 4 | **Differentiate implicitly** with respect to time $t$ |
| 5 | **Substitute** known values and solve for the unknown rate |

!!! warning "Common Mistake"
    Don't substitute specific values into your equation before differentiating! The variables need to remain variable so you can take derivatives. Only substitute values after you've differentiated.

### Rate Variables

In related rates problems, we use **rate variables** to represent how fast each quantity changes. If $x$ is a quantity that depends on time, then:

$$\frac{dx}{dt} = \text{the rate of change of } x \text{ with respect to time}$$

where:

- $\frac{dx}{dt}$ is read "dee-x dee-t" or "the derivative of x with respect to t"
- Positive values mean $x$ is increasing
- Negative values mean $x$ is decreasing

Common rate variables you'll encounter:

| Quantity | Rate Variable | Typical Units |
|----------|---------------|---------------|
| Radius $r$ | $\frac{dr}{dt}$ | cm/sec, ft/min |
| Volume $V$ | $\frac{dV}{dt}$ | cm³/sec, gal/min |
| Area $A$ | $\frac{dA}{dt}$ | m²/sec, ft²/hr |
| Distance $s$ | $\frac{ds}{dt}$ | m/sec, mph |
| Angle $\theta$ | $\frac{d\theta}{dt}$ | rad/sec |

### Implicit Differentiation in Context

Remember implicit differentiation from Chapter 11? We use it when we can't easily solve for one variable in terms of another. In related rates, we have a similar situation: we can't easily express one variable purely in terms of $t$, because we don't know the explicit functions.

When you have an equation like $x^2 + y^2 = 25$ where both $x$ and $y$ depend on $t$, you differentiate each term with respect to $t$ using the chain rule:

$$\frac{d}{dt}[x^2] + \frac{d}{dt}[y^2] = \frac{d}{dt}[25]$$

$$2x \cdot \frac{dx}{dt} + 2y \cdot \frac{dy}{dt} = 0$$

Notice how each term involving a variable picks up a derivative with respect to $t$. This is the chain rule in action: $\frac{d}{dt}[x^2] = 2x \cdot \frac{dx}{dt}$.

### The Importance of Diagrams

A **related rates diagram** is essential for understanding the problem and writing the correct equation. Your diagram should:

- Show the geometric situation clearly
- Label all quantities that change with time as variables (not numbers!)
- Indicate which quantities are constant
- Note the given rates with arrows showing direction of change

#### Diagram: Related Rates Problem Setup

<details markdown="1">
<summary>Related Rates Problem Setup Infographic Specification</summary>

Type: infographic

Bloom Level: Understand (L2)
Bloom Verb: Interpret

Learning Objective: Students will interpret related rates scenarios by identifying changing quantities, constants, and their relationships in a diagram.

Visual Elements:

- Split view showing two examples: ladder problem and balloon problem
- For ladder: wall, ground, ladder with labels h (height), b (base), L (constant length)
- Arrows showing direction of change for h and b
- Rate labels: dh/dt (decreasing, arrow down), db/dt (increasing, arrow right)
- For balloon: sphere with radius r, arrows pointing outward
- Rate label: dr/dt (increasing)
- Text callouts explaining what to label and why

Instructional Rationale: Clear diagrams prevent errors in equation setup, the most common source of mistakes in related rates problems.

Canvas size: 700x400px, responsive
Implementation: Static infographic (SVG or PNG)

</details>

---

## Classic Related Rates Problems

Now let's work through the classic related rates scenarios you'll encounter on the AP exam. Each one has its own geometric relationship to master.

### The Ladder Problem

The **ladder problem** is the most famous related rates scenario. A ladder of fixed length leans against a wall. As the base slides away from the wall, the top slides down.

**Setup:** A 10-foot ladder leans against a vertical wall. The base slides away from the wall at 2 ft/sec. How fast is the top of the ladder sliding down when the base is 6 feet from the wall?

**Step 1: Draw and label**

Let $b$ = distance from base of ladder to wall (in feet)
Let $h$ = height of top of ladder on wall (in feet)
Let $L$ = length of ladder = 10 feet (constant)

**Step 2: Identify rates**

Given: $\frac{db}{dt} = 2$ ft/sec (positive because base is moving away)
Find: $\frac{dh}{dt}$ when $b = 6$ feet

**Step 3: Write the equation**

The ladder, wall, and ground form a right triangle. By the Pythagorean theorem:

$$b^2 + h^2 = L^2 = 100$$

**Step 4: Differentiate with respect to $t$**

$$\frac{d}{dt}[b^2] + \frac{d}{dt}[h^2] = \frac{d}{dt}[100]$$

$$2b \cdot \frac{db}{dt} + 2h \cdot \frac{dh}{dt} = 0$$

**Step 5: Substitute and solve**

First, find $h$ when $b = 6$: $6^2 + h^2 = 100$, so $h^2 = 64$, thus $h = 8$ feet.

Now substitute: $2(6)(2) + 2(8)\frac{dh}{dt} = 0$

$$24 + 16\frac{dh}{dt} = 0$$

$$\frac{dh}{dt} = -\frac{24}{16} = -\frac{3}{2} \text{ ft/sec}$$

The negative sign confirms the top is sliding *down* at $\frac{3}{2}$ ft/sec.

#### Diagram: Ladder Problem Explorer

<iframe src="../../sims/ladder-problem-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Ladder Problem Explorer MicroSim Specification</summary>

Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Learning Objective: Students will calculate the rate of change of the ladder's height given different positions and sliding speeds of the base.

Visual Elements:

- Animated ladder sliding along a wall
- Right triangle clearly shown with labeled sides b, h, L
- Real-time display of b, h, db/dt, and dh/dt values
- Speed visualization showing velocity vectors at top and bottom
- Equation display showing the relationship and its derivative

Interactive Controls:

- Slider for ladder length L (6 to 15 feet)
- Slider for base sliding speed db/dt (0.5 to 4 ft/sec)
- Play/Pause button for animation
- Reset button
- Slider to manually position the base

Data Displays:

- Current position: b = ?, h = ?
- Given rate: db/dt = ?
- Calculated rate: dh/dt = ?
- Pythagorean check: b² + h² = L²

Instructional Rationale: Animation helps students see that the top speeds up as it approaches the ground, making the abstract math concrete.

Canvas size: 600x500px, responsive
Implementation: p5.js with canvas-based controls

</details>

!!! quote "Delta Moment"
    "Here's something wild about the ladder problem: the closer the top gets to the ground, the faster it falls! When the base is almost at the wall, dh/dt is tiny. But when the top is about to hit the ground? Whoooosh! The speed approaches infinity (theoretically). Physics is dramatic."

### The Balloon Problem

The **balloon problem** involves a sphere (like a balloon or expanding ripple) whose radius changes over time.

**Setup:** Air is pumped into a spherical balloon at a rate of 100 cm³/sec. How fast is the radius increasing when the radius is 5 cm?

**Step 1: Identify quantities**

Let $r$ = radius of balloon (in cm)
Let $V$ = volume of balloon (in cm³)

**Step 2: Identify rates**

Given: $\frac{dV}{dt} = 100$ cm³/sec
Find: $\frac{dr}{dt}$ when $r = 5$ cm

**Step 3: Write the equation**

Volume of a sphere: $V = \frac{4}{3}\pi r^3$

**Step 4: Differentiate with respect to $t$**

$$\frac{dV}{dt} = \frac{4}{3}\pi \cdot 3r^2 \cdot \frac{dr}{dt} = 4\pi r^2 \frac{dr}{dt}$$

**Step 5: Substitute and solve**

$$100 = 4\pi (5)^2 \frac{dr}{dt} = 100\pi \frac{dr}{dt}$$

$$\frac{dr}{dt} = \frac{100}{100\pi} = \frac{1}{\pi} \approx 0.318 \text{ cm/sec}$$

The radius increases at $\frac{1}{\pi}$ cm/sec when the radius is 5 cm.

!!! tip "Surface Area Connection"
    Notice that $4\pi r^2$ is the surface area of a sphere! This makes sense: the rate of volume increase equals the rate of radius increase times the surface area. Volume flows in through the entire surface.

#### Diagram: Balloon Inflation Simulator

<iframe src="../../sims/balloon-inflation-simulator/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Balloon Inflation Simulator MicroSim Specification</summary>

Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Compare

Learning Objective: Students will compare how the rate of radius change varies with different radii and volume flow rates, discovering the inverse relationship.

Visual Elements:

- Animated expanding sphere (shown as circle in 2D)
- Volume "flow" visualization showing air entering
- Graphs showing V(t), r(t), and dr/dt vs time
- Current values displayed: V, r, dV/dt, dr/dt, surface area

Interactive Controls:

- Slider for dV/dt (volume flow rate): 10 to 200 cm³/sec
- Play/Pause animation
- Reset button
- Speed control for animation

Key Observations Panel:

- Notice: dr/dt decreases as r increases (same air flow, bigger surface)
- Formula: dr/dt = (dV/dt) / (4πr²)
- Surface area at current radius

Instructional Rationale: Visualizing the relationship between volume rate and radius rate builds intuition for why dr/dt decreases as the balloon grows.

Canvas size: 650x450px, responsive
Implementation: p5.js

</details>

### The Shadow Problem

**Shadow problems** involve similar triangles formed by light sources, objects, and their shadows. These are slightly trickier because they involve ratios.

**Setup:** A 6-foot person walks away from a 15-foot street lamp at 4 ft/sec. How fast is the tip of their shadow moving?

**Step 1: Draw and label**

Let $x$ = distance from lamp to person (in feet)
Let $s$ = length of shadow (in feet)
The lamp height is 15 feet; person height is 6 feet.

**Step 2: Identify rates**

Given: $\frac{dx}{dt} = 4$ ft/sec
Find: Rate at which shadow tip moves = $\frac{d}{dt}(x + s)$

**Step 3: Write the equation using similar triangles**

The lamp, the top of the shadow, and the ground form a large triangle. The person, the top of the shadow, and the ground form a similar smaller triangle.

By similar triangles:

$$\frac{15}{x + s} = \frac{6}{s}$$

Cross-multiply: $15s = 6(x + s) = 6x + 6s$

Simplify: $9s = 6x$, so $s = \frac{2}{3}x$

**Step 4: Differentiate with respect to $t$**

$$\frac{ds}{dt} = \frac{2}{3}\frac{dx}{dt} = \frac{2}{3}(4) = \frac{8}{3} \text{ ft/sec}$$

**Step 5: Find the rate of shadow tip movement**

Shadow tip position = $x + s$

$$\frac{d}{dt}(x + s) = \frac{dx}{dt} + \frac{ds}{dt} = 4 + \frac{8}{3} = \frac{20}{3} \approx 6.67 \text{ ft/sec}$$

#### Diagram: Shadow Problem Similar Triangles

<details markdown="1">
<summary>Shadow Problem Similar Triangles Infographic Specification</summary>

Type: infographic

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will explain how similar triangles arise in shadow problems and how to set up the proportion.

Visual Elements:

- Street scene with lamp post (height 15'), person (height 6'), shadow on ground
- Similar triangles highlighted with matching angle marks
- Labels: lamp height (15), person height (6), distance from lamp (x), shadow length (s)
- Proportion equation displayed: 15/(x+s) = 6/s
- Arrow showing shadow tip movement direction

Instructional Rationale: Clear visualization of similar triangles prevents setup errors in this tricky problem type.

Canvas size: 700x350px, responsive
Implementation: Static infographic

</details>

### The Conical Tank Problem

**Conical tank problems** involve water draining from (or filling) a cone-shaped container. The tricky part is that the radius and height of the water are related by the cone's dimensions.

**Setup:** Water drains from a conical tank (vertex down) at 3 ft³/min. The tank has height 10 ft and top radius 4 ft. How fast is the water level dropping when the water is 5 ft deep?

**Step 1: Identify quantities**

Let $h$ = height of water (in feet)
Let $r$ = radius of water surface (in feet)
Let $V$ = volume of water (in ft³)

**Step 2: Find the relationship between $r$ and $h$**

By similar triangles (comparing water cone to full tank):

$$\frac{r}{h} = \frac{4}{10} = \frac{2}{5}$$

So $r = \frac{2h}{5}$

**Step 3: Write the volume equation**

Volume of cone: $V = \frac{1}{3}\pi r^2 h$

Substitute $r = \frac{2h}{5}$:

$$V = \frac{1}{3}\pi \left(\frac{2h}{5}\right)^2 h = \frac{1}{3}\pi \cdot \frac{4h^2}{25} \cdot h = \frac{4\pi h^3}{75}$$

**Step 4: Differentiate with respect to $t$**

$$\frac{dV}{dt} = \frac{4\pi}{75} \cdot 3h^2 \cdot \frac{dh}{dt} = \frac{4\pi h^2}{25}\frac{dh}{dt}$$

**Step 5: Substitute and solve**

Given: $\frac{dV}{dt} = -3$ ft³/min (negative because draining)

When $h = 5$:

$$-3 = \frac{4\pi (5)^2}{25}\frac{dh}{dt} = 4\pi \frac{dh}{dt}$$

$$\frac{dh}{dt} = \frac{-3}{4\pi} \approx -0.239 \text{ ft/min}$$

The water level drops at about 0.24 ft/min.

#### Diagram: Conical Tank Draining

<iframe src="../../sims/conical-tank-draining/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Conical Tank Draining MicroSim Specification</summary>

Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Learning Objective: Students will calculate how fast water level changes in a conical tank, understanding the relationship between tank dimensions and rate of water level change.

Visual Elements:

- Cross-section view of conical tank (vertex down)
- Water level shown in blue, animated as it drains
- Labels: tank height (H), tank radius (R), water height (h), water radius (r)
- Similar triangles highlighted
- Current values displayed: V, h, r, dV/dt, dh/dt

Interactive Controls:

- Slider for tank height H (5 to 15 ft)
- Slider for tank top radius R (2 to 6 ft)
- Slider for drainage rate dV/dt (-5 to -0.5 ft³/min)
- Play/Pause animation
- Reset button
- Click to set water level

Formulas Displayed:

- r/h = R/H (similar triangles)
- V = (1/3)πr²h in terms of h only
- dh/dt calculation

Instructional Rationale: Seeing the relationship between r and h through similar triangles helps students understand why we eliminate r before differentiating.

Canvas size: 550x500px, responsive
Implementation: p5.js

</details>

### The Distance Rate Problem

**Distance rate problems** involve two objects moving, and we want to find how fast the distance between them changes.

**Setup:** Car A travels north at 60 mph. Car B travels east at 80 mph. Both start from the same intersection. How fast is the distance between them increasing after 2 hours?

**Step 1: Set up coordinates**

Let $a$ = distance Car A has traveled north (in miles)
Let $b$ = distance Car B has traveled east (in miles)
Let $d$ = distance between the cars (in miles)

**Step 2: Identify rates**

Given: $\frac{da}{dt} = 60$ mph, $\frac{db}{dt} = 80$ mph
Find: $\frac{dd}{dt}$ when $t = 2$ hours

After 2 hours: $a = 120$ miles, $b = 160$ miles

**Step 3: Write the equation**

By the Pythagorean theorem: $d^2 = a^2 + b^2$

When $a = 120$ and $b = 160$: $d = \sqrt{120^2 + 160^2} = \sqrt{14400 + 25600} = \sqrt{40000} = 200$ miles

**Step 4: Differentiate with respect to $t$**

$$2d\frac{dd}{dt} = 2a\frac{da}{dt} + 2b\frac{db}{dt}$$

$$d\frac{dd}{dt} = a\frac{da}{dt} + b\frac{db}{dt}$$

**Step 5: Substitute and solve**

$$200\frac{dd}{dt} = 120(60) + 160(80) = 7200 + 12800 = 20000$$

$$\frac{dd}{dt} = \frac{20000}{200} = 100 \text{ mph}$$

The distance between the cars increases at 100 mph.

!!! note "The 3-4-5 Triangle"
    Notice that 60, 80, and 100 form a 3-4-5 right triangle (scaled by 20). This isn't a coincidence—the rate of distance change depends on the same triangle as the positions!

#### Diagram: Two Moving Objects Distance

<iframe src="../../sims/two-moving-objects-distance/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Two Moving Objects Distance MicroSim Specification</summary>

Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students will examine how the rate of distance change between two moving objects depends on their positions and velocities.

Visual Elements:

- Top-down view of coordinate plane with origin at intersection
- Two moving objects (cars) with velocity vectors shown
- Distance line between them, updating in real-time
- Values displayed: a, b, d, da/dt, db/dt, dd/dt
- Graph showing d(t) vs time

Interactive Controls:

- Slider for Car A speed (20 to 100 mph)
- Slider for Car B speed (20 to 100 mph)
- Direction controls (N/S/E/W for each car)
- Play/Pause animation
- Time slider (0 to 5 hours)
- Reset button

Observation Panel:

- Current distance
- Current rate of distance change
- Are the cars getting closer or farther apart?

Instructional Rationale: Visualizing relative motion helps students understand that dd/dt depends on both position and velocity.

Canvas size: 600x500px, responsive
Implementation: p5.js

</details>

---

## Part 2: Linear Approximation and Differentials

Now let's shift gears to a different application of derivatives: using tangent lines to approximate function values. This technique has been used for centuries—long before calculators existed!

### Linear Approximation (Tangent Line Approximation)

Near any point where a function is differentiable, the tangent line provides an excellent approximation to the function. This is the idea behind **linear approximation** or **tangent line approximation**.

Here's why it works: If you zoom in close enough on a smooth curve at a point, the curve looks almost like a straight line—and that line is the tangent line!

#### Diagram: Zoom to Linear

<iframe src="../../sims/zoom-to-linear/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Zoom to Linear MicroSim Specification</summary>

Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Demonstrate

Learning Objective: Students will demonstrate that sufficiently zoomed-in views of differentiable functions appear linear, matching the tangent line.

Visual Elements:

- Function curve (e.g., sin(x), x², eˣ)
- Tangent line at selected point
- Zoom control that progressively magnifies the view
- At high zoom levels, curve and tangent line become visually indistinguishable
- Zoom factor displayed

Interactive Controls:

- Function selector dropdown
- Click/drag to select tangent point
- Zoom slider (1x to 100x magnification)
- "Auto-zoom" button that smoothly zooms in
- Reset view button

Instructional Rationale: Viscerally experiencing that curves become linear at small scales builds intuition for why linear approximation works.

Canvas size: 550x450px, responsive
Implementation: p5.js

</details>

### The Linearization Formula

If we want to approximate $f(x)$ near a point $x = a$, we use the tangent line at that point. The equation of the tangent line at $(a, f(a))$ with slope $f'(a)$ is:

$$L(x) = f(a) + f'(a)(x - a)$$

where:

- $L(x)$ is the **linearization** of $f$ at $a$
- $f(a)$ is the function value at the base point
- $f'(a)$ is the slope of the tangent line
- $(x - a)$ is the horizontal distance from the base point

This formula says: "Start at the known point $(a, f(a))$, then travel along the tangent line."

**Example:** Approximate $\sqrt{4.1}$ using linearization.

Let $f(x) = \sqrt{x}$. We'll use $a = 4$ as our base point since $\sqrt{4} = 2$ is easy to compute.

$f(x) = \sqrt{x} = x^{1/2}$

$f'(x) = \frac{1}{2}x^{-1/2} = \frac{1}{2\sqrt{x}}$

At $a = 4$:

- $f(4) = 2$
- $f'(4) = \frac{1}{2\sqrt{4}} = \frac{1}{4}$

The linearization is:

$$L(x) = 2 + \frac{1}{4}(x - 4)$$

Approximate $\sqrt{4.1}$:

$$L(4.1) = 2 + \frac{1}{4}(4.1 - 4) = 2 + \frac{1}{4}(0.1) = 2 + 0.025 = 2.025$$

The actual value is $\sqrt{4.1} \approx 2.0248...$, so our approximation is excellent!

!!! quote "Delta Moment"
    "Linear approximation is like when I'm on a curve and someone asks 'Where will you be if you take 0.1 more steps?' Instead of tracing the actual curve (hard!), I just extend my current direction (easy!). For small steps, it's almost perfect."

### Error in Approximation

How good is a linear approximation? The **error** is the difference between the actual function value and the approximation:

$$\text{Error} = f(x) - L(x)$$

The error depends on:

- How far $x$ is from $a$ (farther = more error)
- How much the function curves (more curvature = more error)

For small $|x - a|$, the error is approximately proportional to $(x - a)^2$. This means if you halve the distance, the error becomes roughly one-quarter as large.

| Property | Effect on Error |
|----------|-----------------|
| Closer to $a$ | Smaller error |
| Flatter curve (small $|f''|$) | Smaller error |
| Farther from $a$ | Larger error |
| More curved (large $|f''|$) | Larger error |

#### Diagram: Linear Approximation Error Visualizer

<iframe src="../../sims/linear-approx-error/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Linear Approximation Error Visualizer MicroSim Specification</summary>

Type: microsim

Bloom Level: Evaluate (L5)
Bloom Verb: Assess

Learning Objective: Students will assess the accuracy of linear approximations by comparing the approximation to the actual function value and understanding how error varies with distance from the base point.

Visual Elements:

- Function graph with tangent line at point a
- Vertical line segment showing error between f(x) and L(x)
- Error vs distance graph showing how error grows
- Numerical displays: f(x), L(x), error, % error
- Shaded region showing approximation accuracy zone

Interactive Controls:

- Function selector: √x, sin(x), eˣ, ln(x), x²
- Slider to choose base point a
- Slider to choose approximation point x
- Toggle to show/hide error region
- "Animate" button to sweep x across domain

Error Analysis Panel:

- Actual: f(x) = ?
- Approximation: L(x) = ?
- Error: ?
- Relative error: ?%

Instructional Rationale: Quantifying error builds understanding of when linear approximation is (and isn't) appropriate.

Canvas size: 650x500px, responsive
Implementation: p5.js

</details>

---

## Differentials

The language of **differentials** provides another way to think about linear approximation—and it's the notation you'll see in more advanced mathematics and physics.

### What Is a Differential?

When we write $\frac{dy}{dx}$, we treat it as a single symbol meaning "the derivative." But we can also think of $dy$ and $dx$ as separate quantities called **differentials**.

**dx notation**: The differential $dx$ represents a small change in $x$. You choose its value—it's an independent quantity.

$$dx = \Delta x = \text{a small change in } x$$

**dy notation**: Once you choose $dx$, the differential $dy$ is determined by the derivative:

$$dy = f'(x) \cdot dx$$

where:

- $dy$ is the differential of $y$
- $f'(x)$ is the derivative at the current point
- $dx$ is the chosen small change in $x$

### The Difference Between $dy$ and $\Delta y$

Here's a crucial distinction:

- $\Delta y = f(x + dx) - f(x)$ is the **actual change** in $y$ along the curve
- $dy = f'(x) \cdot dx$ is the **approximate change** along the tangent line

For small $dx$, these are nearly equal: $\Delta y \approx dy$

This is exactly what linear approximation tells us, just in different notation!

#### Diagram: dy vs Delta y Comparison

<details markdown="1">
<summary>dy vs Delta y Comparison Infographic Specification</summary>

Type: infographic

Bloom Level: Analyze (L4)
Bloom Verb: Differentiate

Learning Objective: Students will differentiate between the actual change Δy (along the curve) and the differential dy (along the tangent line).

Visual Elements:

- Curve with tangent line at point (x, f(x))
- Horizontal line segment labeled dx (= Δx)
- Vertical segment from curve to x-axis labeled Δy (actual change)
- Vertical segment from tangent line to x-axis labeled dy (approximate change)
- Error = Δy - dy shown as small segment
- Clear labels distinguishing the two

Key Points Highlighted:

- dy = f'(x)·dx (tangent line rise)
- Δy = f(x+dx) - f(x) (actual rise)
- For small dx: Δy ≈ dy

Instructional Rationale: Visual comparison makes the conceptual difference concrete and memorable.

Canvas size: 600x400px, responsive
Implementation: Static infographic

</details>

### Differential Approximation

Using differentials, we can approximate changes in function values:

$$\Delta y \approx dy = f'(x) \cdot dx$$

This means: "The actual change in $y$ is approximately the derivative times the change in $x$."

**Example:** A cube's edge increases from 10 cm to 10.02 cm. Approximately how much does the volume increase?

Let $V = s^3$ where $s$ is the edge length.

$\frac{dV}{ds} = 3s^2$

At $s = 10$:
$\frac{dV}{ds} = 3(10)^2 = 300$

With $ds = 0.02$ cm:
$dV = 300 \cdot 0.02 = 6$ cm³

The volume increases by approximately 6 cm³.

(Exact change: $10.02^3 - 10^3 = 1006.012... - 1000 = 6.012...$ cm³)

!!! tip "When to Use Differentials"
    Differentials are especially useful when:

    - You know how much an input changes and want to estimate the output change
    - You're dealing with measurement error
    - You're working in physics or engineering applications

---

## Applications: Marginal Analysis

One of the most important applications of derivatives and differentials is in **marginal analysis**—the study of how costs, revenues, and profits change when production levels change.

### What Is Marginal Analysis?

In economics, "marginal" means "the change from producing one more unit." If $C(x)$ is the total cost of producing $x$ units, then:

$$\text{Marginal Cost} = C'(x)$$

The marginal cost at production level $x$ approximates the cost of producing one additional unit beyond $x$.

Why the derivative? Because:

$$C(x+1) - C(x) \approx C'(x) \cdot 1 = C'(x)$$

The derivative gives us the instantaneous rate of change, which approximates the actual change over one unit.

### Marginal Cost

**Marginal cost** tells manufacturers how much it costs to produce one more item. It's crucial for decisions like:

- Should we increase production?
- At what production level are costs minimized per unit?
- Where does profit maximize?

**Example:** A company's cost function is $C(x) = 500 + 10x + 0.01x^2$ dollars, where $x$ is the number of units produced.

Marginal cost: $C'(x) = 10 + 0.02x$

At $x = 100$ units:
$C'(100) = 10 + 0.02(100) = 10 + 2 = 12$ dollars per unit

This means producing the 101st unit costs approximately $12.

Let's verify:

- $C(100) = 500 + 1000 + 100 = 1600$
- $C(101) = 500 + 1010 + 102.01 = 1612.01$
- Actual cost of 101st unit: $1612.01 - 1600 = 12.01$

Our marginal cost estimate of $12 was excellent!

#### Diagram: Marginal Cost Analyzer

<iframe src="../../sims/marginal-cost-analyzer/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Marginal Cost Analyzer MicroSim Specification</summary>

Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Learning Objective: Students will calculate and interpret marginal cost as the derivative of the cost function, comparing it to actual cost differences.

Visual Elements:

- Graph of cost function C(x)
- Tangent line at selected production level
- Slope displayed as marginal cost
- Table showing: x, C(x), C'(x), actual cost of next unit
- Bar chart comparing marginal cost to actual cost difference

Interactive Controls:

- Function selector with different cost models:
  - Linear: C(x) = a + bx
  - Quadratic: C(x) = a + bx + cx²
  - Cubic: C(x) = a + bx + cx² + dx³
- Sliders for coefficients
- Slider for production level x
- Toggle between cost view and marginal cost view

Business Insights Panel:

- Marginal cost at current level
- Whether marginal cost is increasing or decreasing
- Optimal production suggestion (where marginal cost equals price)

Instructional Rationale: Connecting abstract derivatives to concrete business decisions makes calculus relevant and memorable.

Canvas size: 700x500px, responsive
Implementation: p5.js with Chart.js for the comparison bar chart

</details>

### Other Marginal Quantities

The same concept applies to revenue and profit:

| Function | Marginal | Interpretation |
|----------|----------|----------------|
| $C(x)$ = Cost | $C'(x)$ = Marginal Cost | Cost of one more unit |
| $R(x)$ = Revenue | $R'(x)$ = Marginal Revenue | Revenue from one more unit |
| $P(x)$ = Profit | $P'(x)$ = Marginal Profit | Profit from one more unit |

Since $P(x) = R(x) - C(x)$, we have $P'(x) = R'(x) - C'(x)$.

**Key insight:** Profit is maximized when marginal revenue equals marginal cost: $R'(x) = C'(x)$

!!! quote "Delta Says"
    "Marginal analysis is derivatives in a business suit! When a company asks 'Should we make one more widget?', they're really asking 'Is the derivative of profit positive?' If marginal revenue exceeds marginal cost, making more means more profit. If not, stop right there."

---

## Chapter Summary

You've now mastered two powerful applications of derivatives!

### Related Rates

- **Related rates** problems involve quantities changing with time that are connected by an equation
- The **5-step strategy**: Draw diagram, identify rates, write equation, differentiate implicitly with respect to $t$, substitute and solve
- **Key relationships**:
  - Pythagorean theorem (ladder, distance problems)
  - Volume formulas (balloon, tank problems)
  - Similar triangles (shadow, tank problems)

### Linear Approximation

- **Linearization** uses the tangent line to approximate function values: $L(x) = f(a) + f'(a)(x - a)$
- Works best when $x$ is close to $a$
- **Error** increases with distance from $a$ and with curvature of the function

### Differentials

- $dx$ is an independent small change in $x$
- $dy = f'(x) \cdot dx$ approximates the change in $y$
- $\Delta y \approx dy$ for small $dx$
- Useful for estimating changes and errors

### Marginal Analysis

- **Marginal cost** $C'(x)$ approximates the cost of one additional unit
- **Marginal revenue** $R'(x)$ approximates the revenue from one additional unit
- Profit maximizes where $R'(x) = C'(x)$

---

## Concept Checklist

Before moving on, make sure you can:

- [ ] Set up and solve related rates problems using the 5-step strategy
- [ ] Draw and label diagrams for related rates scenarios
- [ ] Apply implicit differentiation to find rates of change
- [ ] Solve ladder problems using the Pythagorean theorem
- [ ] Solve balloon problems using volume formulas
- [ ] Set up shadow problems using similar triangles
- [ ] Handle conical tank problems by relating radius and height
- [ ] Find rates of distance change between moving objects
- [ ] Write the linearization of a function at a point
- [ ] Use linear approximation to estimate function values
- [ ] Explain why linear approximation works geometrically
- [ ] Distinguish between $dy$ (differential) and $\Delta y$ (actual change)
- [ ] Use differentials to estimate changes in function values
- [ ] Calculate and interpret marginal cost
- [ ] Explain when profit is maximized using marginal analysis

---

??? question "Self-Check: Related Rates and Linear Approximation"

    **Problem 1:** A spherical snowball melts so that its surface area decreases at 2 cm²/min. How fast is the radius decreasing when the radius is 5 cm?

    *Hint: Surface area of sphere is $A = 4\pi r^2$*

    **Problem 2:** Use linearization to approximate $\sin(0.1)$ using $a = 0$.

    **Problem 3:** If $C(x) = 2000 + 15x + 0.005x^2$ is a cost function, find the marginal cost when 200 units are produced.

    *Click to reveal answers...*

    **Answer 1:**
    $A = 4\pi r^2$

    $\frac{dA}{dt} = 8\pi r \frac{dr}{dt}$

    $-2 = 8\pi(5)\frac{dr}{dt}$

    $\frac{dr}{dt} = \frac{-2}{40\pi} = \frac{-1}{20\pi} \approx -0.016$ cm/min

    The radius decreases at about 0.016 cm/min.

    **Answer 2:**
    $f(x) = \sin(x)$, $f'(x) = \cos(x)$

    At $a = 0$: $f(0) = 0$, $f'(0) = 1$

    $L(x) = 0 + 1(x - 0) = x$

    $\sin(0.1) \approx L(0.1) = 0.1$

    (Actual value: $\sin(0.1) \approx 0.0998$, so our approximation is very close!)

    **Answer 3:**
    $C'(x) = 15 + 0.01x$

    $C'(200) = 15 + 0.01(200) = 15 + 2 = 17$ dollars per unit

    The 201st unit costs approximately $17 to produce.
