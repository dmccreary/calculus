---
title: Optimization
description: Apply derivative techniques to solve optimization problems - finding maximum or minimum values in real-world contexts
generated_by: chapter-content-generator skill v0.03
date: 2026-02-03
---

# Optimization

!!! quote "Delta Says"
    "This is it - the moment calculus becomes a superpower you can actually *use*!
    All those derivatives we've been calculating? They were training for this:
    finding THE best answer, not just *a* good one. Maximum profit! Minimum cost!
    Largest area! This is optimization, and honestly, it's why I got into calculus
    in the first place."

## Summary

This chapter applies derivative techniques to solve optimization problems—finding maximum or minimum values in real-world contexts. Students will learn to set up optimization problems by identifying the objective function to be optimized and constraint equations that limit the domain. Classic problems include maximizing area, minimizing cost, maximizing volume, and finding closest points. The chapter emphasizes verifying solutions and considering practical domain restrictions. After completing this chapter, students will be able to solve applied optimization problems systematically.

## Why Optimization Matters

Optimization is everywhere. Businesses want to maximize profit and minimize costs. Engineers design bridges that use minimum material while supporting maximum loads. Doctors calculate optimal drug dosages. Nature itself optimizes—soap bubbles minimize surface area, and light takes the path of least time.

When you learn optimization, you're not just solving math problems. You're gaining a tool that professionals in virtually every field use daily:

- **Business**: Maximize profit given production constraints
- **Engineering**: Minimize material use while meeting safety requirements
- **Medicine**: Find optimal drug dosages to maximize effectiveness
- **Architecture**: Design spaces that maximize usable area
- **Logistics**: Minimize shipping costs or travel time

!!! quote "Delta Moment"
    "You know how I'm always looking for flat spots on curves? That's because
    flat spots—where my tilt equals zero—are where the magic happens. They're
    potential peaks and valleys. In optimization, we're *deliberately* hunting
    for the best peak or the lowest valley. It's like competitive hiking!"

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

1. Optimization
2. Optimization Problem
3. Objective Function
4. Constraint Equation
5. Primary Equation
6. Setting Up Optimization
7. Maximizing Area
8. Minimizing Distance
9. Minimizing Cost
10. Maximizing Volume
11. Fencing Problem
12. Box Problem
13. Can Problem
14. Closest Point Problem
15. Maximum Profit
16. Applied Optimization
17. Verifying Maximum
18. Verifying Minimum
19. Second Deriv Verify
20. Endpoint Consideration
21. Practical Domain

## Prerequisites

This chapter builds on concepts from:

- [Chapter 16: Mean Value Theorem and Extrema](../16-mean-value-theorem-and-extrema/index.md)
- [Chapter 17: Derivative Tests and Concavity](../17-derivative-tests-and-concavity/index.md)
- [Chapter 18: Curve Sketching](../18-curve-sketching-and-graphing/index.md)

---

## What Is Optimization?

**Optimization** is the process of finding the best possible value of a function—either its maximum or minimum—within a given set of constraints. An **optimization problem** asks you to find the input that produces the largest or smallest output.

Every optimization problem has two key components:

- **Objective function**: The quantity you want to maximize or minimize
- **Constraints**: Limitations or restrictions on the variables

For example, if you're building a fence around a garden with a fixed amount of fencing material, the area of the garden is your objective function (you want to maximize it), and the total length of fencing available is your constraint.

| Real-World Scenario | Objective Function | Constraint |
|--------------------|--------------------|------------|
| Farmer building a pen | Area (maximize) | Total fencing available |
| Company producing goods | Profit (maximize) | Production capacity |
| Shipping company | Distance (minimize) | Must visit all locations |
| Packaging designer | Material used (minimize) | Must hold specific volume |

---

## The Anatomy of an Optimization Problem

Let's break down the pieces that make up every optimization problem.

### The Objective Function

The **objective function** is the mathematical expression for the quantity you want to optimize. It's what you'll eventually take the derivative of to find critical points.

#### Objective Function

The objective function $f(x)$ represents the quantity to be maximized or minimized.

where:

- $f(x)$ is the function expressing your goal
- $x$ is the independent variable (sometimes there are multiple variables)

**Examples of objective functions:**

- Area: $A = xy$ or $A = \pi r^2$
- Volume: $V = lwh$ or $V = \pi r^2 h$
- Distance: $D = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$
- Cost: $C = (\text{materials}) + (\text{labor}) + (\text{overhead})$
- Profit: $P = R - C$ (revenue minus cost)

### The Constraint Equation

A **constraint equation** expresses a limitation or fixed relationship between variables. Constraints come from the physical situation—limited resources, fixed relationships, or practical boundaries.

#### Constraint Equation

A constraint equation relates the variables with a fixed condition:

$g(x, y) = k$

where:

- $g(x, y)$ is a function relating the variables
- $k$ is a constant value representing the constraint

**Examples of constraints:**

- Fixed perimeter: $2x + 2y = P$ (for a rectangle)
- Fixed surface area: $2\pi r^2 + 2\pi rh = S$ (for a cylinder)
- Fixed budget: $(\text{cost per item}_1)(x) + (\text{cost per item}_2)(y) = B$

### The Primary Equation

The **primary equation** is the objective function rewritten as a function of a single variable by using the constraint to eliminate one variable. This is the function you'll actually differentiate.

!!! tip "The Key Step"
    Most optimization problems involve two variables initially. The constraint
    lets you express one variable in terms of the other, reducing the problem
    to single-variable calculus—which you already know how to handle!

---

## Setting Up Optimization Problems

Setting up an optimization problem correctly is often the hardest part. Here's a systematic approach:

### The Optimization Problem-Solving Strategy

Follow these steps for any optimization problem:

1. **Read carefully and identify the goal**: What quantity do you want to maximize or minimize?

2. **Draw a diagram**: Visualize the situation and label all relevant quantities with variables.

3. **Write the objective function**: Express the quantity to optimize in terms of your variables.

4. **Write the constraint equation(s)**: Identify the fixed conditions and express them mathematically.

5. **Reduce to one variable**: Use the constraint to eliminate one variable from the objective function.

6. **Determine the practical domain**: What values of the variable make sense in this context?

7. **Find critical points**: Take the derivative, set it equal to zero, and solve.

8. **Verify your answer**: Use the first or second derivative test, and check endpoints if applicable.

9. **Answer the question**: Make sure you're giving the answer that was actually asked for!

#### Diagram: Optimization Problem Setup Flowchart

<iframe src="../../sims/optimization-flowchart/main.html" width="100%" height="500px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Optimization Problem Setup Flowchart</summary>
Type: workflow

Bloom Level: Apply (L3)
Bloom Verb: Execute

Learning Objective: Students will execute the step-by-step process for setting up optimization problems by following a visual workflow that guides them through identifying objectives, constraints, and the path to a solution.

Visual Elements:
- Flowchart with rounded rectangles for process steps
- Diamond shapes for decision points
- Color-coded sections: setup (blue), calculus (green), verification (orange)
- Arrows showing flow direction
- Icons representing each step (pencil for drawing, function symbol for equations)

Steps shown:
1. Read Problem (identify: maximize or minimize?)
2. Draw Diagram (label variables)
3. Write Objective Function (what to optimize)
4. Write Constraint Equation (what is fixed)
5. Reduce to Single Variable (substitute)
6. Determine Practical Domain (what values make sense)
7. Find Critical Points (f'(x) = 0)
8. Decision: "On closed interval?"
   - Yes: Check endpoints AND critical points
   - No: Use derivative test
9. Verify Answer (second derivative or first derivative test)
10. State Final Answer (in context)

Interactive Features:
- Hover over each step to see detailed explanation
- Click step to see example of that step applied to a sample problem
- "Walk Through Example" button animates through all steps

Instructional Rationale: A visual workflow helps students internalize the systematic approach to optimization, reducing the cognitive load of remembering all steps.

Canvas size: 700×500px, responsive
Implementation: p5.js with hover effects
</details>

!!! quote "Delta's Sidequest"
    "The diagram step might seem optional, but trust me—skip it at your peril!
    I once tried to optimize a fencing problem without drawing it first and
    ended up trying to minimize the fence instead of maximize the area.
    A quick sketch saves tons of confusion later."

---

## The Practical Domain

In optimization problems, the **practical domain** (also called the feasible domain) is the set of values that make sense in the real-world context. This is different from the mathematical domain—it's more restrictive because of physical limitations.

### Finding the Practical Domain

Consider these questions to determine the practical domain:

- **Lengths and dimensions**: Must be positive (usually)
- **Quantities**: Often must be non-negative
- **Physical constraints**: What values would make the problem impossible?
- **Upper bounds**: Are there maximum possible values?

**Example**: If you're cutting squares from corners of a 10-inch by 16-inch rectangle to form a box, the side length $x$ of each square must satisfy:

- $x > 0$ (can't cut a negative or zero square)
- $x < 5$ (can't cut more than half the shorter side)

So the practical domain is $0 < x < 5$.

| Situation | Practical Domain Restriction |
|-----------|------------------------------|
| Lengths, widths, heights | $> 0$ |
| Radii, diameters | $> 0$ |
| Number of items produced | $\geq 0$ (often integers) |
| Percentages | $0 \leq x \leq 100$ |
| Fractions | $0 \leq x \leq 1$ |

---

## Classic Optimization Problem: The Fencing Problem

The **fencing problem** is a classic optimization scenario. Let's work through it completely.

### Problem Statement

A farmer has 400 feet of fencing to enclose a rectangular pasture along a river. If no fence is needed along the river, what dimensions will maximize the enclosed area?

### Step 1: Draw a Diagram

```
         River (no fence needed)
    ═══════════════════════════════
    |                             |
  x |                             | x
    |                             |
    └─────────────────────────────┘
                  y
```

### Step 2: Write the Objective Function

We want to maximize the area:

#### Area of Rectangle

$A = xy$

where:

- $A$ is the area (what we want to maximize)
- $x$ is the side perpendicular to the river
- $y$ is the side parallel to the river

### Step 3: Write the Constraint Equation

The fencing constraint is:

$2x + y = 400$

(Two sides of length $x$ plus one side of length $y$, since the river provides the fourth side)

### Step 4: Reduce to One Variable

Solve the constraint for $y$:

$y = 400 - 2x$

Substitute into the objective function:

$A(x) = x(400 - 2x) = 400x - 2x^2$

### Step 5: Determine the Practical Domain

- $x > 0$ (positive length)
- $y > 0 \Rightarrow 400 - 2x > 0 \Rightarrow x < 200$

Practical domain: $0 < x < 200$

### Step 6: Find Critical Points

$A'(x) = 400 - 4x$

Set $A'(x) = 0$:

$400 - 4x = 0$

$x = 100$

### Step 7: Verify Maximum

$A''(x) = -4 < 0$

Since the second derivative is negative, $x = 100$ gives a maximum.

### Step 8: Find the Answer

When $x = 100$:

$y = 400 - 2(100) = 200$

$A = (100)(200) = 20,000$ square feet

**Answer**: The dimensions that maximize the area are 100 feet by 200 feet, enclosing 20,000 square feet.

#### Diagram: Fencing Problem Visualizer

<iframe src="../../sims/fencing-optimizer/main.html" width="100%" height="550px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Fencing Problem Visualizer</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Solve

Learning Objective: Students will solve fencing optimization problems by manipulating dimensions and observing how area changes, connecting visual intuition with calculus-based solutions.

Visual Elements:
- Top section: Bird's eye view of rectangular field next to river
  - River drawn as blue wavy line at top
  - Rectangle shown with labeled dimensions x and y
  - Area displayed prominently
  - Fencing used displayed (should equal constraint)
- Bottom section: Graph of A(x) = 400x - 2x^2
  - Critical point marked with vertical dashed line
  - Current x position shown as movable point
  - Maximum point highlighted

Interactive Controls:
- Slider for x value (0 to 200)
- Input field for total fencing available (default 400)
- "Show Solution" button to reveal optimal dimensions
- Toggle between "Explore Mode" and "Solve Mode"

Data Visibility Requirements:
- Real-time display of: x, y, Area, Fencing used
- Graph updates to show current point
- When at maximum, display "MAXIMUM!" indicator

Instructional Rationale: Connecting the physical rectangle visualization with the parabolic area function helps students see why calculus gives the optimal answer—they can watch the area increase and then decrease.

Canvas size: 700×550px, responsive
Implementation: p5.js with canvas-based slider
</details>

---

## Maximizing Area Problems

**Maximizing area** problems are among the most common optimization scenarios. They typically involve finding dimensions that give the largest possible area subject to some constraint.

### General Approach

1. Identify what shape you're working with
2. Write the area formula for that shape
3. Use the constraint to reduce to one variable
4. Take the derivative and find critical points
5. Verify and interpret

### Example: Rectangular Area with Fixed Perimeter

**Problem**: What dimensions give the largest area for a rectangle with perimeter 100 meters?

**Setup:**

- Let the dimensions be $x$ and $y$
- Constraint: $2x + 2y = 100$, so $y = 50 - x$
- Objective: $A = xy = x(50 - x) = 50x - x^2$
- Domain: $0 < x < 50$

**Solve:**

$A'(x) = 50 - 2x = 0$

$x = 25$

$y = 50 - 25 = 25$

**Conclusion:** The largest rectangle with perimeter 100 is a square with sides of 25 meters!

!!! note "Square Optimality"
    This result is general: among all rectangles with a given perimeter,
    the square has the largest area. This is why many optimization problems
    produce square solutions!

---

## The Box Problem

The **box problem** is another classic optimization scenario that appears in many forms.

### Open-Top Box from a Rectangular Sheet

**Problem**: From a 12-inch by 18-inch piece of cardboard, equal squares are cut from each corner and the sides are folded up to form an open-top box. What size squares should be cut to maximize the volume?

#### Step-by-Step Solution

**Draw the diagram:**

```
    x     18 - 2x    x
   ┌──┬─────────────┬──┐
 x │  │             │  │ x
   ├──┼─────────────┼──┤
   │  │             │  │
12-│  │   (fold up  │  │
2x │  │    sides)   │  │
   │  │             │  │
   ├──┼─────────────┼──┤
 x │  │             │  │ x
   └──┴─────────────┴──┘
```

After folding, the box has:

- Length: $18 - 2x$
- Width: $12 - 2x$
- Height: $x$

**Write the objective function:**

#### Volume of Box

$V = x(18 - 2x)(12 - 2x)$

where:

- $V$ is the volume (to maximize)
- $x$ is the side length of the cut squares
- $18 - 2x$ is the resulting length
- $12 - 2x$ is the resulting width

**Expand:**

$V = x(216 - 36x - 24x + 4x^2)$

$V = x(216 - 60x + 4x^2)$

$V(x) = 4x^3 - 60x^2 + 216x$

**Determine practical domain:**

- $x > 0$
- $12 - 2x > 0 \Rightarrow x < 6$

Domain: $0 < x < 6$

**Find critical points:**

$V'(x) = 12x^2 - 120x + 216$

$= 12(x^2 - 10x + 18)$

Using the quadratic formula:

$x = \frac{10 \pm \sqrt{100 - 72}}{2} = \frac{10 \pm \sqrt{28}}{2} = 5 \pm \sqrt{7}$

$x = 5 - \sqrt{7} \approx 2.35$ or $x = 5 + \sqrt{7} \approx 7.65$

Only $x \approx 2.35$ is in our domain $(0, 6)$.

**Verify maximum:**

$V''(x) = 24x - 120$

$V''(2.35) = 24(2.35) - 120 = 56.4 - 120 = -63.6 < 0$

Confirmed maximum!

**Calculate maximum volume:**

$V(5 - \sqrt{7}) \approx V(2.35) \approx 228.2$ cubic inches

#### Diagram: Box Problem Interactive

<iframe src="../../sims/box-optimizer/main.html" width="100%" height="600px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Box Problem Interactive</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students will examine how the cut size affects box volume by manipulating a 3D visualization and connecting it to the volume function graph.

Visual Elements:
- Left panel: Flat cardboard sheet with cut squares shown
  - Dashed fold lines
  - Color-coded sections (cut squares in gray)
  - Dimensions labeled
- Right panel: 3D rendered box (isometric view)
  - Dimensions labeled on edges
  - Volume displayed
- Bottom panel: Graph of V(x) with current x marked
  - Critical points marked
  - Maximum highlighted

Interactive Controls:
- Slider for x (cut size): 0 to max valid value
- Input fields for cardboard dimensions (default 12×18)
- "Animate Folding" button to show 2D to 3D transition
- "Show Optimal" button
- Toggle between 2D flat view and 3D box view

Animation:
- When x changes, flat view shows squares changing size
- 3D box reshapes in real time
- Volume number updates continuously

Data Visibility Requirements:
- Current dimensions: length, width, height
- Current volume
- Percentage of maximum volume achieved
- Critical points on graph

Instructional Rationale: Seeing the flat sheet transform into a 3D box helps students understand where the volume formula comes from, while the simultaneous graph connects manipulation to calculus.

Canvas size: 800×600px, responsive
Implementation: p5.js with WEBGL for 3D rendering
</details>

---

## The Can Problem (Minimizing Surface Area)

The **can problem** asks: what dimensions minimize the surface area of a cylinder with a fixed volume?

### Problem Statement

Design a cylindrical can to hold 1000 cubic centimeters. What dimensions minimize the amount of material (surface area) needed?

### Solution

**Variables:**

- $r$ = radius of the can
- $h$ = height of the can

**Constraint (fixed volume):**

$V = \pi r^2 h = 1000$

Solve for $h$: $h = \frac{1000}{\pi r^2}$

**Objective function (surface area to minimize):**

#### Surface Area of Cylinder

$S = 2\pi r^2 + 2\pi rh$

where:

- $S$ is the total surface area
- $2\pi r^2$ is the area of the two circular ends
- $2\pi rh$ is the lateral (side) surface area

**Substitute the constraint:**

$S(r) = 2\pi r^2 + 2\pi r \cdot \frac{1000}{\pi r^2}$

$S(r) = 2\pi r^2 + \frac{2000}{r}$

**Practical domain:** $r > 0$

**Find critical points:**

$S'(r) = 4\pi r - \frac{2000}{r^2}$

Set $S'(r) = 0$:

$4\pi r = \frac{2000}{r^2}$

$4\pi r^3 = 2000$

$r^3 = \frac{500}{\pi}$

$r = \sqrt[3]{\frac{500}{\pi}} \approx 5.42$ cm

**Find height:**

$h = \frac{1000}{\pi(5.42)^2} \approx 10.84$ cm

**Verify minimum:**

$S''(r) = 4\pi + \frac{4000}{r^3}$

At $r = 5.42$: $S''(5.42) > 0$, confirming a minimum.

!!! note "Interesting Result"
    Notice that $h \approx 2r$, meaning the optimal can has height equal to its
    diameter! This produces a can where the circular ends together have the same
    area as the curved side.

#### Diagram: Can Optimizer

<iframe src="../../sims/can-optimizer/main.html" width="100%" height="550px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Can Optimizer MicroSim</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Learning Objective: Students will calculate optimal can dimensions by exploring how radius affects surface area while maintaining constant volume.

Visual Elements:
- Left side: 3D cylinder visualization
  - Radius and height labeled
  - Surface area regions color-coded (top/bottom circles vs. lateral surface)
  - Semi-transparent to show internal structure
- Right side: Graph of S(r) surface area function
  - Critical point marked
  - Current radius shown as vertical line
- Bottom: Numerical display panel

Interactive Controls:
- Radius slider (1 to 15 cm)
- Volume input field (default 1000 cm³)
- Toggle to show surface area breakdown
- "Find Optimal" button
- Compare button: show sub-optimal cans alongside optimal

Data Visibility:
- Volume (constant)
- Radius, Height
- Top/bottom area
- Lateral area
- Total surface area
- Percentage above minimum

Instructional Rationale: Visualizing how changing radius makes the can tall and skinny vs. short and wide, while watching surface area change, builds intuition for why an intermediate value minimizes material.

Canvas size: 750×550px, responsive
Implementation: p5.js with WEBGL for 3D
</details>

---

## Minimizing Distance: The Closest Point Problem

The **closest point problem** asks for the point on a curve that is nearest to a given point.

### Problem Statement

Find the point on the parabola $y = x^2$ that is closest to the point $(3, 0)$.

### Solution Using Distance

**Distance formula:**

#### Distance Between Two Points

$D = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$

where:

- $D$ is the distance
- $(x_1, y_1)$ and $(x_2, y_2)$ are the two points

For a point $(x, y)$ on the parabola and the fixed point $(3, 0)$:

$D = \sqrt{(x - 3)^2 + (y - 0)^2}$

Since $y = x^2$ on the parabola:

$D = \sqrt{(x - 3)^2 + x^4}$

!!! tip "Simplifying Trick"
    Minimizing $D$ is equivalent to minimizing $D^2$ (since both are positive
    and the square root function is increasing). This avoids messy derivatives!

**Minimize $D^2$ instead:**

$f(x) = D^2 = (x - 3)^2 + x^4$

**Find critical points:**

$f'(x) = 2(x - 3) + 4x^3 = 2x - 6 + 4x^3$

$f'(x) = 4x^3 + 2x - 6 = 2(2x^3 + x - 3)$

Factor: $2(x - 1)(2x^2 + 2x + 3) = 0$

The quadratic $2x^2 + 2x + 3$ has no real roots (discriminant negative).

So $x = 1$ is the only critical point.

**Verify minimum:**

$f''(x) = 12x^2 + 2$

$f''(1) = 12 + 2 = 14 > 0$ confirms minimum.

**Find the point:**

When $x = 1$: $y = 1^2 = 1$

**Answer:** The closest point on the parabola to $(3, 0)$ is $(1, 1)$.

#### Diagram: Closest Point Finder

<iframe src="../../sims/closest-point-finder/main.html" width="100%" height="500px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Closest Point Finder MicroSim</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Compare

Learning Objective: Students will compare distances from various points on a curve to a fixed point, understanding why the minimum distance occurs at a specific location.

Visual Elements:
- Coordinate plane with curve (selectable: parabola, circle, line)
- Fixed target point (draggable)
- Movable point on the curve
- Line segment showing current distance
- Distance value displayed
- Trace of distance as point moves along curve
- Minimum distance indicator

Interactive Controls:
- Curve selector (y = x², y = x³, x² + y² = 4, y = sin(x))
- Draggable target point
- Point on curve controlled by slider
- "Find Minimum" button to auto-locate closest point
- Toggle to show perpendicular verification (at minimum, line from curve to point is perpendicular to tangent)

Data Visibility:
- Coordinates of point on curve
- Coordinates of target point
- Current distance
- Minimum distance (when found)
- Slope of connecting line vs. slope of tangent (to verify perpendicularity)

Instructional Rationale: Dragging a point along a curve while watching distance change builds intuition for why the derivative equals zero at the minimum distance point.

Canvas size: 650×500px, responsive
Implementation: p5.js
</details>

!!! quote "Delta Moment"
    "Here's something cool about closest point problems: at the closest point,
    the line from the curve to the target point is *perpendicular* to the curve!
    That's because I'm moving along the curve, and if I could get closer by
    moving slightly left or right, I'm not at the minimum yet."

---

## Maximum Profit Problems

**Maximum profit** problems combine economics with calculus. Profit equals revenue minus cost, and we optimize accordingly.

### Key Economic Relationships

#### Profit Function

$P(x) = R(x) - C(x)$

where:

- $P(x)$ is profit as a function of quantity $x$
- $R(x)$ is revenue (money coming in)
- $C(x)$ is cost (money going out)

#### Revenue Function

$R(x) = p \cdot x$

where:

- $R$ is revenue
- $p$ is price per unit
- $x$ is quantity sold

In many problems, price depends on quantity (demand function), so $p = p(x)$.

### Example: Maximizing Profit

**Problem:** A company's cost function is $C(x) = 500 + 10x$ and the demand function is $p = 50 - 0.5x$ (price decreases as quantity increases). Find the production level that maximizes profit.

**Solution:**

Revenue: $R(x) = xp = x(50 - 0.5x) = 50x - 0.5x^2$

Profit: $P(x) = R(x) - C(x) = (50x - 0.5x^2) - (500 + 10x)$

$P(x) = -0.5x^2 + 40x - 500$

**Find critical points:**

$P'(x) = -x + 40 = 0$

$x = 40$

**Verify maximum:**

$P''(x) = -1 < 0$ confirms maximum.

**Calculate profit:**

$P(40) = -0.5(1600) + 40(40) - 500 = -800 + 1600 - 500 = 300$

**Answer:** Maximum profit of $300 occurs when producing 40 units.

| Quantity | Revenue | Cost | Profit |
|----------|---------|------|--------|
| 20 | $800 | $700 | $100 |
| 30 | $1050 | $800 | $250 |
| **40** | **$1200** | **$900** | **$300** |
| 50 | $1250 | $1000 | $250 |
| 60 | $1200 | $1100 | $100 |

#### Diagram: Profit Optimizer

<iframe src="../../sims/profit-optimizer/main.html" width="100%" height="550px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Profit Optimizer MicroSim</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Differentiate

Learning Objective: Students will differentiate between revenue, cost, and profit functions, understanding how their relationships determine the optimal production level.

Visual Elements:
- Graph showing three curves:
  - Revenue R(x) in green
  - Cost C(x) in red
  - Profit P(x) in blue (can toggle on/off)
- Vertical line at current x showing:
  - Revenue value
  - Cost value
  - Profit = gap between R and C
- Shaded region between R and C when profitable
- Break-even points marked
- Maximum profit point highlighted

Interactive Controls:
- Quantity slider (0 to 100)
- Editable cost function parameters
- Editable demand function parameters
- Toggle profit curve visibility
- "Find Maximum Profit" button
- Mode: "Explore" vs. "Challenge" (hide profit curve, ask for optimal x)

Data Visibility:
- At current x: Revenue, Cost, Profit
- Break-even quantities
- Maximum profit point coordinates
- Marginal revenue = Marginal cost line (at maximum)

Instructional Rationale: Seeing profit as the vertical distance between revenue and cost curves, and watching it maximize where the curves have the same slope (MR = MC), connects geometric intuition to calculus.

Canvas size: 750×550px, responsive
Implementation: p5.js with Chart.js for graphing
</details>

---

## Verifying Your Solution

Finding a critical point isn't enough—you must verify that it's actually the type of extreme value you're looking for.

### Verifying Maximum vs. Minimum

There are several methods to verify your answer:

### Method 1: Second Derivative Test

#### Second Derivative Test for Optimization

If $f'(c) = 0$ and $f''(c)$ exists, then:

- $f''(c) < 0 \Rightarrow$ local maximum at $x = c$
- $f''(c) > 0 \Rightarrow$ local minimum at $x = c$

This is the **Second Deriv Verify** method—often the quickest verification approach.

**Example:** For $A(x) = 400x - 2x^2$:

$A''(x) = -4$

Since $A''(x) < 0$ everywhere, any critical point is a maximum.

### Method 2: First Derivative Test

Check the sign of $f'(x)$ on each side of the critical point:

- If $f'$ changes from + to −, it's a maximum
- If $f'$ changes from − to +, it's a minimum

### Method 3: Endpoint Consideration

For problems on a closed interval, check the critical points AND the endpoints.

#### Closed Interval Method

On a closed interval $[a, b]$:

1. Find all critical points in $(a, b)$
2. Evaluate $f$ at each critical point
3. Evaluate $f$ at endpoints $a$ and $b$
4. The largest value is the maximum; smallest is the minimum

!!! warning "Don't Forget Endpoints!"
    **Endpoint consideration** is crucial! The extreme value of a function on
    a closed interval can occur at an endpoint even if there's a critical point
    inside. Always check both!

### Method 4: Physical Reasoning

Sometimes the nature of the problem tells you what type of extreme you have:

- There's clearly a maximum (too much of something is bad)
- There's clearly a minimum (too little is bad)
- The function approaches specific limits at domain boundaries

**Example:** In the fencing problem, as $x \to 0^+$ or $x \to 200^-$, the area approaches 0. Since $A > 0$ for $x \in (0, 200)$, there must be a maximum somewhere in between.

#### Diagram: Verification Methods Comparison

<iframe src="../../sims/verification-methods/main.html" width="100%" height="500px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Verification Methods Comparison</summary>
Type: microsim

Bloom Level: Evaluate (L5)
Bloom Verb: Judge

Learning Objective: Students will judge which verification method is most appropriate for different optimization scenarios and apply the chosen method correctly.

Visual Elements:
- Graph of function with critical points marked
- Three panels showing each verification method:
  1. Second Derivative: Shows f'' value and concavity at critical point
  2. First Derivative: Shows sign chart with +/- regions
  3. Endpoint Check: Shows values at endpoints and critical points
- Color-coded conclusions (green for verified max/min, yellow for inconclusive)

Interactive Controls:
- Function selector (polynomial examples with various behaviors)
- Domain interval inputs
- "Choose Method" dropdown
- "Apply Method" button to show that method's analysis
- "Compare All" button to show all three methods simultaneously

Scenarios included:
1. Clear interior maximum (second derivative works)
2. Maximum at endpoint (must check endpoints)
3. Second derivative = 0 (need first derivative test)
4. Multiple critical points (need careful analysis)

Instructional Rationale: Comparing methods side-by-side helps students develop judgment about when each method is most efficient or necessary.

Canvas size: 700×500px, responsive
Implementation: p5.js
</details>

---

## Applied Optimization: Putting It All Together

**Applied optimization** means using these techniques to solve real-world problems. Let's work through a comprehensive example.

### Example: Designing a Window

**Problem:** A Norman window has the shape of a rectangle topped by a semicircle. If the perimeter is 30 feet, find the dimensions that maximize the area.

**Step 1: Draw and label**

```
        ╭──────────╮
       /            \
      /              \
     │                │
   h │                │ h
     │                │
     └────────────────┘
            2r
```

Let $r$ = radius of semicircle = half the width of rectangle
Let $h$ = height of rectangular part

**Step 2: Write the constraint (perimeter)**

$P = 2h + 2r + \pi r = 30$

(Two heights + width + semicircle circumference)

Solving for $h$:

$h = \frac{30 - 2r - \pi r}{2} = 15 - r - \frac{\pi r}{2}$

**Step 3: Write the objective function (area)**

$A = (\text{rectangle}) + (\text{semicircle}) = 2rh + \frac{1}{2}\pi r^2$

**Step 4: Substitute to get one variable**

$A(r) = 2r\left(15 - r - \frac{\pi r}{2}\right) + \frac{1}{2}\pi r^2$

$A(r) = 30r - 2r^2 - \pi r^2 + \frac{1}{2}\pi r^2$

$A(r) = 30r - 2r^2 - \frac{1}{2}\pi r^2$

$A(r) = 30r - r^2\left(2 + \frac{\pi}{2}\right)$

**Step 5: Find practical domain**

- $r > 0$
- $h > 0 \Rightarrow 15 - r - \frac{\pi r}{2} > 0 \Rightarrow r < \frac{30}{2 + \pi} \approx 5.83$

**Step 6: Find critical points**

$A'(r) = 30 - 2r(2 + \frac{\pi}{2}) = 30 - r(4 + \pi)$

$r = \frac{30}{4 + \pi} \approx 4.20$ feet

**Step 7: Calculate dimensions**

$h = 15 - r - \frac{\pi r}{2} = 15 - r(1 + \frac{\pi}{2})$

$h = 15 - \frac{30}{4 + \pi}(1 + \frac{\pi}{2}) = 15 - \frac{30(1 + \frac{\pi}{2})}{4 + \pi}$

After simplification: $h \approx 4.20$ feet

**Step 8: Verify and interpret**

$A''(r) = -(4 + \pi) < 0$ confirms maximum.

**Answer:** The optimal window has $r \approx 4.20$ feet (width $\approx 8.40$ feet) and $h \approx 4.20$ feet, making the rectangular height equal to the semicircle radius!

!!! note "Beautiful Result"
    The optimal Norman window has the rectangle's height equal to the semicircle's
    radius. This elegant relationship often emerges in optimization—the math
    produces aesthetically pleasing proportions.

---

## Common Optimization Scenarios Summary

Here's a reference table of common optimization problems and their typical setups:

| Problem Type | Objective | Common Constraint | Key Formula |
|-------------|-----------|-------------------|-------------|
| Fencing (3 sides) | Maximize area | Fixed perimeter | $A = xy$, $2x + y = P$ |
| Fencing (4 sides) | Maximize area | Fixed perimeter | $A = xy$, $2x + 2y = P$ |
| Box (open top) | Maximize volume | Fixed sheet size | $V = x(L-2x)(W-2x)$ |
| Can/Cylinder | Minimize surface area | Fixed volume | $S = 2\pi r^2 + 2\pi rh$, $V = \pi r^2 h$ |
| Closest point | Minimize distance | Point on curve | $D^2 = (x-a)^2 + (f(x)-b)^2$ |
| Maximum profit | Maximize $P = R - C$ | Production capacity | $P'(x) = R'(x) - C'(x) = 0$ |
| Minimum cost | Minimize $C(x)$ | Required output | $C'(x) = 0$ |

---

## Problem-Solving Tips

After working through many optimization problems, here are key insights:

### Common Mistakes to Avoid

1. **Forgetting to check the practical domain**: Always verify your answer is in the feasible region
2. **Not verifying max vs. min**: A critical point could be either—always confirm
3. **Ignoring endpoints**: On closed intervals, extrema can occur at endpoints
4. **Solving the wrong problem**: Make sure you answer what was actually asked
5. **Algebraic errors**: Optimization problems often involve complex algebra—check your work

### Strategies That Help

- **Always draw a diagram** first
- **Label everything** with variables
- **Check units** to verify formulas make sense
- **Test special cases**: Does your answer work for simple values?
- **Use symmetry** when it exists—symmetric problems often have symmetric solutions

!!! quote "Delta's Pun Corner"
    "Why do I love optimization problems? Because they really help me
    *maximize* my potential! ...I'll see myself out to the local minimum."

---

## Chapter Summary

You've now mastered the art of optimization—using derivatives to find the best possible solutions. Let's review the key concepts:

### Core Concepts

- **Optimization** finds maximum or minimum values of functions
- **Objective function** is what you want to optimize
- **Constraint equations** express limitations or fixed conditions
- **Practical domain** restricts variables to physically meaningful values

### The Systematic Process

1. Identify the objective and constraints
2. Draw a diagram and label variables
3. Write objective function and constraint equations
4. Use constraints to reduce to one variable
5. Find the practical domain
6. Take derivative and find critical points
7. Verify your answer (second derivative, first derivative, or endpoints)
8. State the answer in context

### Classic Problem Types

- **Fencing problems**: Maximize enclosed area
- **Box problems**: Maximize volume from cut sheets
- **Can problems**: Minimize surface area for fixed volume
- **Closest point problems**: Minimize distance to a curve
- **Profit problems**: Maximize profit (revenue minus cost)

### Verification Methods

- **Second derivative test**: Quickest when $f''(c) \neq 0$
- **First derivative test**: Check sign changes
- **Endpoint consideration**: Required for closed intervals

!!! quote "Delta Says"
    "Optimization is where calculus stops being abstract and starts being
    *useful*. Every time you find a maximum or minimum, you're finding the
    best possible answer to a real question. Biggest area! Least material!
    Maximum profit! This is the superpower I promised you.

    Now go forth and optimize everything! (Within reason. Maybe don't try
    to optimize your breakfast routine. Or do—I won't judge.)"

---

## Concept Checklist

Before moving on, make sure you can:

- [ ] Identify the objective function and constraints in a word problem
- [ ] Set up optimization problems with appropriate diagrams and labels
- [ ] Use constraint equations to reduce problems to one variable
- [ ] Determine the practical domain for optimization problems
- [ ] Find critical points by setting the derivative equal to zero
- [ ] Verify solutions using the second derivative test
- [ ] Verify solutions using the first derivative test
- [ ] Apply the closed interval method when appropriate
- [ ] Solve fencing problems (maximizing area)
- [ ] Solve box problems (maximizing volume)
- [ ] Solve can problems (minimizing surface area)
- [ ] Solve closest point problems (minimizing distance)
- [ ] Solve maximum profit problems
- [ ] Interpret optimization solutions in real-world contexts

---

??? question "Self-Check: Optimization Mastery"
    **Problem:** A manufacturer needs to design a cylindrical can that holds
    500 mL of soup. Material for the top and bottom costs $0.02 per cm²,
    while material for the sides costs $0.01 per cm². What dimensions
    minimize the total cost?

    *Click to reveal solution...*

    **Solution:**

    Let $r$ = radius and $h$ = height.

    Constraint: $V = \pi r^2 h = 500$, so $h = \frac{500}{\pi r^2}$

    Cost function (objective):
    $C = 0.02(2\pi r^2) + 0.01(2\pi r h) = 0.04\pi r^2 + \frac{10}{r}$

    $C'(r) = 0.08\pi r - \frac{10}{r^2} = 0$

    $0.08\pi r^3 = 10$

    $r = \sqrt[3]{\frac{10}{0.08\pi}} \approx 3.41$ cm

    $h = \frac{500}{\pi(3.41)^2} \approx 13.68$ cm

    The optimal can has radius ≈ 3.41 cm and height ≈ 13.68 cm.

    Note: Because the side material costs less than the top/bottom material,
    the optimal can is taller and narrower than the equal-cost case!

[See Annotated References](./references.md)
