---
title: Derivative Tests and Concavity
description: Learn to classify critical points and analyze function shape using first and second derivative tests
generated_by: chapter-content-generator skill v0.03
date: 2026-02-03
draft: true
---

# Derivative Tests and Concavity

## Summary

This chapter develops techniques for classifying critical points and analyzing function shape. Students will learn the first derivative test using sign charts to determine where functions increase or decrease and to classify local extrema. The second derivative test provides an alternative method using concavity. Students will also learn to find inflection points and use the candidates test for finding absolute extrema on closed intervals. After completing this chapter, students will be able to fully analyze function behavior using derivative information.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

1. Where f Prime Zero
2. Where f Prime DNE
3. First Derivative Test
4. Sign Chart
5. Increasing Function
6. Decreasing Function
7. Monotonicity
8. Sign Change Analysis
9. Second Derivative Test
10. Concavity
11. Concave Up
12. Concave Down
13. Inflection Point
14. Point of Inflection
15. Candidates Test
16. Closed Interval Method
17. Endpoint Extrema

## Prerequisites

This chapter builds on concepts from:

- [Chapter 13: Higher-Order Derivatives and Motion](../13-higher-order-derivatives-and-motion/index.md)
- [Chapter 16: Mean Value Theorem and Extrema](../16-mean-value-theorem-and-extrema/index.md)

---

## Introduction: Reading the Landscape

You've already discovered that critical points are the "interesting spots" on a function's graph - places where the derivative equals zero or doesn't exist. But finding critical points is only half the battle. The real question is: **what kind of critical point is it?**

!!! quote "Delta Moment"
    "I found a flat spot on this curve - my tilt is exactly zero! But am I standing on a mountaintop, sitting in a valley, or just passing through a saddle? Time to investigate!"

In this chapter, you'll develop powerful tools to classify critical points and fully understand a function's shape. By the end, you'll be able to sketch accurate graphs and solve optimization problems with confidence.

## Increasing and Decreasing Functions

Before we can classify critical points, we need to understand what makes a function go up or down. This might seem obvious when you look at a graph, but we need precise mathematical criteria.

### What "Increasing" Really Means

A function $f$ is **increasing** on an interval if, whenever you move right along the x-axis, the function values go up. More formally:

$f \text{ is increasing on } (a, b) \text{ if } f(x_1) < f(x_2) \text{ whenever } a < x_1 < x_2 < b$

A function $f$ is **decreasing** on an interval if, whenever you move right, the function values go down:

$f \text{ is decreasing on } (a, b) \text{ if } f(x_1) > f(x_2) \text{ whenever } a < x_1 < x_2 < b$

!!! quote "Delta Moment"
    "When I'm on an increasing part of a curve, I'm climbing - things are looking up! When I'm decreasing, I'm coasting downhill. Wheee!"

### The Derivative Connection

Here's the beautiful link between derivatives and increasing/decreasing behavior:

| Condition | Function Behavior |
|-----------|-------------------|
| $f'(x) > 0$ on an interval | $f$ is increasing on that interval |
| $f'(x) < 0$ on an interval | $f$ is decreasing on that interval |
| $f'(x) = 0$ on an interval | $f$ is constant on that interval |

This makes perfect sense! When the slope is positive, the function climbs. When the slope is negative, it falls.

### Monotonicity

A function that is entirely increasing or entirely decreasing on an interval is called **monotonic** on that interval. Monotonic functions are wonderfully predictable - they never change direction.

- **Monotonically increasing**: Always going up (like $f(x) = x^3$ on $(0, \infty)$)
- **Monotonically decreasing**: Always going down (like $f(x) = e^{-x}$ on $(-\infty, \infty)$)

## Critical Points: Where the Action Happens

Critical points occur where $f'(x) = 0$ or where $f'(x)$ does not exist. Let's examine both cases carefully.

### Where f'(x) = 0

When the derivative equals zero, the tangent line is horizontal. The function has momentarily "paused" its climb or descent. This could indicate:

- A local maximum (hilltop)
- A local minimum (valley)
- Neither (a horizontal inflection point)

**Example:** For $f(x) = x^3 - 3x$

$f'(x) = 3x^2 - 3 = 3(x^2 - 1) = 3(x+1)(x-1)$

Setting $f'(x) = 0$: $x = -1$ or $x = 1$

These are the critical points where the tangent line is horizontal.

### Where f'(x) Does Not Exist (DNE)

The derivative might fail to exist at points where:

- The function has a **corner** (sharp turn)
- The function has a **cusp** (pointed tip)
- The function has a **vertical tangent**
- The function is **discontinuous**

**Example:** For $f(x) = |x|$

The derivative doesn't exist at $x = 0$ because the left and right slopes disagree (-1 from the left, +1 from the right). This sharp corner is still a critical point - and in fact, it's a local minimum!

| Type of Critical Point | Visual Appearance | Example |
|------------------------|-------------------|---------|
| $f'(x) = 0$ | Horizontal tangent | Smooth hilltop or valley |
| Corner | Sharp angle | $y = |x|$ at $x = 0$ |
| Cusp | Pointed peak | $y = x^{2/3}$ at $x = 0$ |
| Vertical tangent | Straight up | $y = x^{1/3}$ at $x = 0$ |

## Sign Charts: Your Analysis Toolkit

A **sign chart** is a visual tool for tracking where a function or its derivative is positive, negative, or zero. It's like a map showing Delta where the hills and valleys are.

### Building a Sign Chart

To create a sign chart for $f'(x)$:

1. Find all critical points (where $f'(x) = 0$ or DNE)
2. Place these points on a number line
3. Test one x-value in each interval between critical points
4. Mark each interval with + (positive) or - (negative)
5. Mark critical points with 0 or DNE

**Example:** Create a sign chart for $f(x) = x^3 - 12x$

**Step 1:** Find $f'(x) = 3x^2 - 12 = 3(x^2 - 4) = 3(x-2)(x+2)$

**Step 2:** Critical points: $x = -2$ and $x = 2$

**Step 3:** Test points in each interval:

- For $x = -3$: $f'(-3) = 3(9) - 12 = 15 > 0$ (positive)
- For $x = 0$: $f'(0) = -12 < 0$ (negative)
- For $x = 3$: $f'(3) = 3(9) - 12 = 15 > 0$ (positive)

**Step 4:** The sign chart looks like:

```
        -2          2
    +    |    -     |    +
   ←-----•---------•-----→
         0          0
```

This tells us $f$ is increasing on $(-\infty, -2)$, decreasing on $(-2, 2)$, and increasing on $(2, \infty)$.

#### Diagram: Sign Chart Analysis Tool

<iframe src="../../sims/sign-chart-builder/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Sign Chart Builder MicroSim</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, execute

Learning Objective: Students will be able to construct sign charts for derivatives and use them to determine intervals of increase and decrease.

Canvas layout:

- Top area: Function input and derivative display
- Middle area: Interactive number line for sign chart
- Bottom area: Summary of intervals

Visual elements:

- Number line with draggable critical point markers
- Color-coded regions (green for positive/increasing, red for negative/decreasing)
- Test point indicators showing derivative evaluation
- Function graph preview showing correspondence between sign chart and graph behavior

Interactive controls:

- Dropdown: Select from preset functions or enter custom function
- Clickable regions on number line to add test points
- Button: "Check My Work" to verify sign chart
- Toggle: Show/hide corresponding graph

Default parameters:

- Function: $f(x) = x^3 - 3x$
- Display range: x from -4 to 4

Behavior:

- When user places critical points, system verifies correctness
- Clicking in an interval prompts user to determine sign
- Color feedback shows correct/incorrect sign determination
- Graph overlay shows increasing (green) and decreasing (red) portions

Instructional Rationale: This Apply-level MicroSim uses step-by-step interaction to build procedural fluency. Students construct the sign chart themselves rather than passively viewing, reinforcing the connection between derivative sign and function behavior.
</details>

## The First Derivative Test

Now we're ready for the main event! The **First Derivative Test** uses sign changes in $f'(x)$ to classify critical points.

### The Test

At a critical point $c$:

| If $f'(x)$... | Then at $x = c$... |
|---------------|-------------------|
| Changes from + to - | Local maximum |
| Changes from - to + | Local minimum |
| Doesn't change sign | Neither (not an extremum) |

!!! quote "Delta Moment"
    "Here's my trick: If I was climbing (+) and then start descending (-), I must have just passed over a peak! If I was going down (-) and start climbing (+), I just came through a valley. Simple as that!"

### Sign Change Analysis

**Sign change analysis** is the process of examining how the derivative's sign changes across critical points. This is the heart of the First Derivative Test.

**Complete Example:** Classify the critical points of $f(x) = x^4 - 4x^3$

**Step 1:** Find the derivative.

$f'(x) = 4x^3 - 12x^2 = 4x^2(x - 3)$

**Step 2:** Find critical points.

Setting $f'(x) = 0$: $4x^2(x - 3) = 0$

$x = 0$ or $x = 3$

**Step 3:** Build the sign chart.

Test points:

- $x = -1$: $f'(-1) = 4(1)(-4) = -16 < 0$
- $x = 1$: $f'(1) = 4(1)(-2) = -8 < 0$
- $x = 4$: $f'(4) = 4(16)(1) = 64 > 0$

```
        0          3
    -    |    -    |    +
   ←-----•--------•-----→
         0         0
```

**Step 4:** Apply the First Derivative Test.

- At $x = 0$: Sign goes from - to - (no change) → **Neither max nor min**
- At $x = 3$: Sign goes from - to + → **Local minimum**

!!! tip "Why No Maximum at x = 0?"
    Even though $f'(0) = 0$, the function keeps decreasing on both sides. The graph merely "flattens out" momentarily before continuing downward. It's like a brief rest stop on a long descent.

### Worked Example with Graph

Let's thoroughly analyze $f(x) = 2x^3 - 9x^2 + 12x - 3$.

**Find f'(x):**

$f'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x-1)(x-2)$

**Critical points:** $x = 1$ and $x = 2$

**Sign chart:**

| Interval | Test Point | $f'(x)$ Value | Sign |
|----------|------------|---------------|------|
| $(-\infty, 1)$ | $x = 0$ | $6(−1)(−2) = 12$ | + |
| $(1, 2)$ | $x = 1.5$ | $6(0.5)(−0.5) = −1.5$ | − |
| $(2, \infty)$ | $x = 3$ | $6(2)(1) = 12$ | + |

**Classification:**

- At $x = 1$: + to − → **Local maximum**, $f(1) = 2 - 9 + 12 - 3 = 2$
- At $x = 2$: − to + → **Local minimum**, $f(2) = 16 - 36 + 24 - 3 = 1$

## Concavity: The Shape of the Curve

Knowing where a function increases and decreases tells us a lot, but there's more to the story. Two increasing functions can look very different depending on their **concavity** - whether they curve up like a smile or down like a frown.

### Concave Up

A function is **concave up** on an interval when it curves upward - like a bowl that could hold water. Mathematically:

$f \text{ is concave up when } f''(x) > 0$

!!! quote "Delta Moment"
    "When I'm on a concave up section, the hill is getting steeper as I climb. I'm working harder with every step! It's like the curve is pulling up on me."

Key features of concave up regions:

- The graph lies above its tangent lines
- The slope is increasing (getting more positive or less negative)
- The second derivative is positive
- Think: "holds water" or "smiling"

### Concave Down

A function is **concave down** on an interval when it curves downward - like an upside-down bowl. Mathematically:

$f \text{ is concave down when } f''(x) < 0$

!!! quote "Delta Moment"
    "On a concave down section, even though I might still be climbing, each step is easier than the last. The curve is curving away from me, like I'm cresting a hill."

Key features of concave down regions:

- The graph lies below its tangent lines
- The slope is decreasing (getting less positive or more negative)
- The second derivative is negative
- Think: "spills water" or "frowning"

### Comparing Concavity

| Property | Concave Up | Concave Down |
|----------|------------|--------------|
| Second derivative | $f''(x) > 0$ | $f''(x) < 0$ |
| Slope behavior | Increasing | Decreasing |
| Graph relative to tangent | Above | Below |
| Visual shape | ∪ (cup) | ∩ (cap) |
| Memory aid | "Smile" | "Frown" |

#### Diagram: Concavity Explorer

<iframe src="../../sims/concavity-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Concavity Explorer MicroSim</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: explain, compare, contrast

Learning Objective: Students will be able to visually distinguish concave up and concave down regions and connect them to the sign of the second derivative.

Data Visibility Requirements:

- Stage 1: Show function graph with labeled regions
- Stage 2: Show tangent lines at multiple points within each region
- Stage 3: Show second derivative value at cursor position
- Stage 4: Show slope values at cursor position demonstrating increase/decrease

Canvas layout:

- Main area: Function graph with movable tangent line
- Bottom strip: Second derivative graph aligned with function
- Side panel: Current values display

Visual elements:

- Function curve with color-coded concavity (blue for concave up, orange for concave down)
- Draggable point with tangent line that follows the curve
- Second derivative graph below, shaded to show positive/negative regions
- Vertical line connecting both graphs at current x-position

Interactive controls:

- Drag point along curve to see tangent line change
- Dropdown: Select different functions to explore
- Toggle: Show/hide second derivative graph
- Toggle: Show/hide tangent line slope values

Default parameters:

- Function: $f(x) = x^3 - 3x$
- Display range: x from -3 to 3

Behavior:

- As point moves, tangent line rotates
- Slope readout shows how slope increases (concave up) or decreases (concave down)
- Color of current region highlighted on both graphs
- Annotations appear explaining the current concavity

Instructional Rationale: This Understand-level MicroSim emphasizes the visual connection between the shape of the curve, the behavior of tangent lines, and the sign of the second derivative. Step-through exploration with concrete data (slope values) builds conceptual understanding.
</details>

## Inflection Points: Where the Vibe Shifts

An **inflection point** (also called a **point of inflection**) is where the concavity changes - the curve switches from smiling to frowning or vice versa.

### Finding Inflection Points

To find inflection points:

1. Find $f''(x)$
2. Set $f''(x) = 0$ and solve (also note where $f''(x)$ DNE)
3. Check that concavity actually changes at these points

!!! warning "Important Check"
    Just because $f''(c) = 0$ doesn't guarantee an inflection point! You must verify that $f''(x)$ changes sign at $x = c$.

!!! quote "Delta Moment"
    "An inflection point is where I feel the *vibe shift*. I was pushing harder and harder, then suddenly it starts getting easier - or the other way around. Something fundamental changed about this curve!"

### Example: Finding Inflection Points

Find the inflection points of $f(x) = x^4 - 6x^2 + 8x + 1$

**Step 1:** Find derivatives.

$f'(x) = 4x^3 - 12x + 8$

$f''(x) = 12x^2 - 12 = 12(x^2 - 1) = 12(x-1)(x+1)$

**Step 2:** Set $f''(x) = 0$.

$12(x-1)(x+1) = 0$

$x = -1$ or $x = 1$

**Step 3:** Check for sign change in $f''(x)$.

| Interval | Test Point | $f''(x)$ | Concavity |
|----------|------------|----------|-----------|
| $(-\infty, -1)$ | $x = -2$ | $12(3) = 36 > 0$ | Up |
| $(-1, 1)$ | $x = 0$ | $12(-1) = -12 < 0$ | Down |
| $(1, \infty)$ | $x = 2$ | $12(3) = 36 > 0$ | Up |

Concavity changes at both $x = -1$ and $x = 1$, so **both are inflection points**.

The inflection points are $(-1, f(-1)) = (-1, -6)$ and $(1, f(1)) = (1, 4)$.

### Why Inflection Points Matter

Inflection points are significant because they mark:

- Where the rate of change switches from speeding up to slowing down (or vice versa)
- The steepest or gentlest point on a curve (locally)
- Important transitions in real-world phenomena (population growth slowing, epidemic peak rate)

## The Second Derivative Test

The **Second Derivative Test** provides an alternative method for classifying critical points. Instead of checking sign changes in $f'$, we evaluate $f''$ directly at the critical point.

### The Test

If $f'(c) = 0$, then:

| If $f''(c)$... | Then at $x = c$... | Reason |
|----------------|-------------------|--------|
| $f''(c) < 0$ | Local maximum | Concave down (hilltop) |
| $f''(c) > 0$ | Local minimum | Concave up (valley) |
| $f''(c) = 0$ | Test inconclusive | Use First Derivative Test |

!!! quote "Delta Moment"
    "At a critical point, I'm perfectly level. But am I at a peak or in a valley? I check the second derivative! If $f'' < 0$, I'm on a concave down section - must be a hilltop. If $f'' > 0$, I'm in a concave up bowl - valley time!"

### Example: Using the Second Derivative Test

Classify the critical points of $f(x) = x^3 - 6x^2 + 9x + 2$.

**Step 1:** Find derivatives.

$f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x-1)(x-3)$

$f''(x) = 6x - 12$

**Step 2:** Find critical points.

$f'(x) = 0$ when $x = 1$ or $x = 3$

**Step 3:** Apply the Second Derivative Test.

At $x = 1$: $f''(1) = 6(1) - 12 = -6 < 0$ → **Local maximum**

At $x = 3$: $f''(3) = 6(3) - 12 = 6 > 0$ → **Local minimum**

**Step 4:** Find the y-values.

$f(1) = 1 - 6 + 9 + 2 = 6$ → Local max at $(1, 6)$

$f(3) = 27 - 54 + 27 + 2 = 2$ → Local min at $(3, 2)$

### When to Use Which Test?

| Situation | Recommended Test |
|-----------|------------------|
| $f''(x)$ is easy to compute | Second Derivative Test |
| $f''(c) = 0$ | Must use First Derivative Test |
| Need to know behavior between critical points | First Derivative Test |
| Multiple critical points to check | First Derivative Test (one sign chart does all) |
| Just need to classify one critical point | Second Derivative Test |

#### Diagram: First vs Second Derivative Test Comparison

<iframe src="../../sims/derivative-test-comparison/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Derivative Test Comparison MicroSim</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: compare, contrast, differentiate

Learning Objective: Students will be able to compare the First and Second Derivative Tests and choose the appropriate method for classifying critical points.

Canvas layout:

- Left panel: First Derivative Test visualization with sign chart
- Right panel: Second Derivative Test visualization with concavity indicator
- Center: Shared function graph with critical point marker
- Bottom: Summary comparison

Visual elements:

- Function graph with highlighted critical points
- Sign chart for f'(x) in left panel
- f''(c) value display with concavity indication in right panel
- Color-coded classification result (max = red, min = blue, inconclusive = yellow)
- Side-by-side worked solution steps

Interactive controls:

- Dropdown: Select from various functions
- Slider: Move through critical points
- Radio buttons: Choose which test to apply first
- Button: "Show Both Tests" to compare results

Default parameters:

- Function: $f(x) = x^4 - 2x^2$
- Display range: x from -2 to 2

Behavior:

- Selecting a critical point shows both test methods simultaneously
- Highlights which test gives conclusive results
- Indicates when Second Derivative Test is inconclusive ($f'' = 0$)
- Counts computation steps for each method

Instructional Rationale: This Analyze-level MicroSim enables direct comparison between the two classification methods. By seeing both approaches applied to the same critical points, students develop judgment about when each method is more efficient or appropriate.
</details>

## The Candidates Test and Closed Interval Method

When finding **absolute** (global) extrema on a closed interval $[a, b]$, we use the **Candidates Test**, also known as the **Closed Interval Method**.

### Why a Special Method?

On a closed interval, the Extreme Value Theorem guarantees that a continuous function has both an absolute maximum and an absolute minimum. These must occur at either:

- A critical point in the interior $(a, b)$, OR
- One of the endpoints $a$ or $b$

!!! quote "Delta Moment"
    "If I'm confined to walk on a curve from point A to point B, the highest and lowest points I'll reach are either at special spots along the way (critical points) or right at the boundaries where I start and stop!"

### The Method

The **Closed Interval Method** for finding absolute extrema of $f$ on $[a, b]$:

1. Find all critical points of $f$ in the open interval $(a, b)$
2. Evaluate $f$ at each critical point
3. Evaluate $f$ at the endpoints: $f(a)$ and $f(b)$
4. Compare all values: the largest is the absolute maximum, the smallest is the absolute minimum

### Endpoint Extrema

**Endpoint extrema** occur when the absolute maximum or minimum is at $x = a$ or $x = b$. This happens frequently! Just because a point is a boundary doesn't make it less important.

### Complete Example

Find the absolute extrema of $f(x) = x^3 - 3x^2 + 1$ on $[-1, 4]$.

**Step 1:** Find critical points in $(-1, 4)$.

$f'(x) = 3x^2 - 6x = 3x(x - 2)$

$f'(x) = 0$ when $x = 0$ or $x = 2$

Both are in $(-1, 4)$. ✓

**Step 2:** Evaluate $f$ at critical points.

$f(0) = 0 - 0 + 1 = 1$

$f(2) = 8 - 12 + 1 = -3$

**Step 3:** Evaluate $f$ at endpoints.

$f(-1) = -1 - 3 + 1 = -3$

$f(4) = 64 - 48 + 1 = 17$

**Step 4:** Compare all candidates.

| x-value | Type | f(x) |
|---------|------|------|
| $x = -1$ | Left endpoint | $-3$ |
| $x = 0$ | Critical point | $1$ |
| $x = 2$ | Critical point | $-3$ |
| $x = 4$ | Right endpoint | $17$ |

**Conclusion:**

- **Absolute maximum:** $17$ at $x = 4$ (right endpoint)
- **Absolute minimum:** $-3$ at $x = -1$ and $x = 2$ (tie!)

Notice that the absolute maximum occurs at an endpoint, not at a critical point. Also notice that the absolute minimum value is achieved at two different x-values.

#### Diagram: Closed Interval Method Visualizer

<iframe src="../../sims/closed-interval-method/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Closed Interval Method MicroSim</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: execute, use, solve

Learning Objective: Students will be able to apply the Closed Interval Method to find absolute extrema on closed intervals.

Canvas layout:

- Main graph area showing function on closed interval
- Side panel with candidate table
- Bottom controls for interval adjustment

Visual elements:

- Function graph with interval boundaries clearly marked
- Draggable interval endpoints
- Highlighted critical points (orange dots)
- Highlighted endpoints (blue squares)
- Annotations showing f(x) value at each candidate
- Absolute max/min indicators (crowns for max, valleys for min)

Interactive controls:

- Dropdown: Select from preset functions
- Sliders: Adjust left endpoint a and right endpoint b
- Button: "Find Candidates" to identify all critical points
- Button: "Evaluate All" to compute function values
- Button: "Identify Extrema" to highlight absolute max/min

Default parameters:

- Function: $f(x) = x^3 - 3x^2 + 1$
- Interval: $[-1, 4]$

Behavior:

- Changing interval updates critical point identification
- Candidates table fills in as user works through steps
- Final step highlights absolute max (green) and min (red) on graph
- Shows cases where extrema occur at endpoints vs critical points

Instructional Rationale: This Apply-level MicroSim provides scaffolded practice with the Closed Interval Method. Students follow the systematic procedure while the visual feedback reinforces understanding of why both critical points and endpoints must be checked.
</details>

## Putting It All Together: Complete Curve Analysis

Now you have all the tools to fully analyze a function's behavior. Here's the complete process.

### The Complete Analysis Checklist

For a thorough analysis of $f(x)$:

1. **Domain:** Where is $f$ defined?
2. **Critical points:** Where is $f'(x) = 0$ or DNE?
3. **Increasing/Decreasing:** Use sign chart for $f'$
4. **Local extrema:** Apply First or Second Derivative Test
5. **Concavity:** Where is $f''(x) > 0$ or $< 0$?
6. **Inflection points:** Where does concavity change?
7. **End behavior:** What happens as $x \to \pm\infty$?
8. **Special points:** Calculate $f$ at key x-values

### Full Example: Complete Analysis

Analyze $f(x) = x^4 - 4x^3 + 10$.

**Step 1: Domain**

All real numbers (polynomial).

**Step 2: First Derivative**

$f'(x) = 4x^3 - 12x^2 = 4x^2(x - 3)$

Critical points: $x = 0$ (from $4x^2 = 0$) and $x = 3$ (from $x - 3 = 0$)

**Step 3: Sign Chart for f'(x)**

| Interval | Test Point | Sign of $f'$ | Behavior |
|----------|------------|--------------|----------|
| $(-\infty, 0)$ | $x = -1$ | $4(1)(-4) = -16 < 0$ | Decreasing |
| $(0, 3)$ | $x = 1$ | $4(1)(-2) = -8 < 0$ | Decreasing |
| $(3, \infty)$ | $x = 4$ | $4(16)(1) = 64 > 0$ | Increasing |

**Step 4: Local Extrema (First Derivative Test)**

- At $x = 0$: - to - (no sign change) → Neither
- At $x = 3$: - to + → **Local minimum**

$f(3) = 81 - 108 + 10 = -17$

Local minimum at $(3, -17)$

**Step 5: Second Derivative**

$f''(x) = 12x^2 - 24x = 12x(x - 2)$

Potential inflection points: $x = 0$ and $x = 2$

**Step 6: Concavity Sign Chart**

| Interval | Test Point | Sign of $f''$ | Concavity |
|----------|------------|---------------|-----------|
| $(-\infty, 0)$ | $x = -1$ | $12(-1)(-3) = 36 > 0$ | Up |
| $(0, 2)$ | $x = 1$ | $12(1)(-1) = -12 < 0$ | Down |
| $(2, \infty)$ | $x = 3$ | $12(3)(1) = 36 > 0$ | Up |

**Step 7: Inflection Points**

Both $x = 0$ and $x = 2$ show concavity changes.

$f(0) = 10$ and $f(2) = 16 - 32 + 10 = -6$

Inflection points: $(0, 10)$ and $(2, -6)$

**Step 8: Summary**

| Feature | Location | Value |
|---------|----------|-------|
| Local minimum | $x = 3$ | $-17$ |
| Inflection point | $x = 0$ | $10$ |
| Inflection point | $x = 2$ | $-6$ |
| Increasing | $(3, \infty)$ | |
| Decreasing | $(-\infty, 3)$ | |
| Concave up | $(-\infty, 0) \cup (2, \infty)$ | |
| Concave down | $(0, 2)$ | |

#### Diagram: Complete Curve Analysis Dashboard

<iframe src="../../sims/curve-analysis-dashboard/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Complete Curve Analysis Dashboard MicroSim</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: examine, organize, deconstruct

Learning Objective: Students will be able to synthesize all derivative-based analysis techniques to fully describe a function's behavior.

Canvas layout:

- Main graph area (top): Function with all features marked
- Left panel: f'(x) graph and sign chart
- Right panel: f''(x) graph and concavity information
- Bottom panel: Summary table of all features

Visual elements:

- Function graph with color-coded regions:
  - Increasing (green) vs decreasing (red)
  - Concave up (solid) vs concave down (dashed)
- Critical points marked with circles (filled for extrema, open for neither)
- Inflection points marked with diamonds
- f'(x) and f''(x) graphs shown below with zero crossings highlighted
- Connecting vertical lines showing correspondence between graphs

Interactive controls:

- Function input field or dropdown for preset functions
- Checkboxes to show/hide: critical points, inflection points, concavity shading, derivative graphs
- Step-through mode: reveals analysis features one at a time
- Button: "Generate Summary" produces complete analysis report

Default parameters:

- Function: $f(x) = x^4 - 4x^3 + 10$
- Display range: x from -2 to 5, y from -30 to 20

Behavior:

- Interactive exploration shows how f, f', and f'' relate at any x-value
- Hovering over features shows detailed information
- Step-through mode guides students through the complete analysis process
- Summary table updates dynamically based on computed features

Instructional Rationale: This Analyze-level MicroSim integrates all chapter concepts into a unified dashboard. Students see how increasing/decreasing behavior, concavity, extrema, and inflection points all derive from systematic derivative analysis. The step-through mode scaffolds the complete analysis procedure.
</details>

## Practice Problems

Test your understanding with these problems.

??? question "Problem 1: First Derivative Test"
    Find and classify all critical points of $f(x) = x^3 - 6x^2 + 9x + 1$ using the First Derivative Test.

    **Solution:**

    $f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x-1)(x-3)$

    Critical points: $x = 1$ and $x = 3$

    Sign chart:

    - For $x < 1$: $f'(0) = 9 > 0$ (+)
    - For $1 < x < 3$: $f'(2) = 3(1)(-1) = -3 < 0$ (-)
    - For $x > 3$: $f'(4) = 3(3)(1) = 9 > 0$ (+)

    At $x = 1$: + to - → **Local maximum** at $(1, 5)$

    At $x = 3$: - to + → **Local minimum** at $(3, 1)$

??? question "Problem 2: Second Derivative Test"
    Use the Second Derivative Test to classify the critical points of $g(x) = x^4 - 8x^2$.

    **Solution:**

    $g'(x) = 4x^3 - 16x = 4x(x^2 - 4) = 4x(x-2)(x+2)$

    Critical points: $x = -2, 0, 2$

    $g''(x) = 12x^2 - 16$

    - $g''(-2) = 12(4) - 16 = 32 > 0$ → **Local minimum** at $(-2, -16)$
    - $g''(0) = -16 < 0$ → **Local maximum** at $(0, 0)$
    - $g''(2) = 32 > 0$ → **Local minimum** at $(2, -16)$

??? question "Problem 3: Inflection Points"
    Find all inflection points of $h(x) = x^5 - 5x^4$.

    **Solution:**

    $h'(x) = 5x^4 - 20x^3$

    $h''(x) = 20x^3 - 60x^2 = 20x^2(x - 3)$

    Setting $h''(x) = 0$: $x = 0$ or $x = 3$

    Check sign changes:

    - For $x < 0$: $h''(-1) = 20(1)(-4) = -80 < 0$
    - For $0 < x < 3$: $h''(1) = 20(1)(-2) = -40 < 0$
    - For $x > 3$: $h''(4) = 20(16)(1) = 320 > 0$

    At $x = 0$: - to - (no change) → **Not an inflection point**

    At $x = 3$: - to + → **Inflection point** at $(3, -162)$

??? question "Problem 4: Closed Interval Method"
    Find the absolute extrema of $f(x) = x^3 - 6x^2 + 5$ on $[−1, 5]$.

    **Solution:**

    $f'(x) = 3x^2 - 12x = 3x(x - 4)$

    Critical points in $(-1, 5)$: $x = 0$ and $x = 4$

    Evaluate at all candidates:

    | x | Type | f(x) |
    |---|------|------|
    | -1 | Endpoint | $-1 - 6 + 5 = -2$ |
    | 0 | Critical | $5$ |
    | 4 | Critical | $64 - 96 + 5 = -27$ |
    | 5 | Endpoint | $125 - 150 + 5 = -20$ |

    **Absolute maximum:** $5$ at $x = 0$

    **Absolute minimum:** $-27$ at $x = 4$

## Key Takeaways

Let's summarize the essential concepts from this chapter.

### The First Derivative Test

- Find critical points where $f'(x) = 0$ or DNE
- Build a sign chart for $f'(x)$
- Sign change + to - indicates local maximum
- Sign change - to + indicates local minimum
- No sign change means no local extremum

### The Second Derivative Test

- At a critical point $c$ where $f'(c) = 0$:
  - $f''(c) > 0$ → local minimum (concave up)
  - $f''(c) < 0$ → local maximum (concave down)
  - $f''(c) = 0$ → test inconclusive

### Concavity and Inflection Points

- $f''(x) > 0$ → concave up (smile)
- $f''(x) < 0$ → concave down (frown)
- Inflection point: where concavity changes
- Must verify sign change in $f''$

### The Closed Interval Method

For absolute extrema on $[a, b]$:

1. Find critical points in $(a, b)$
2. Evaluate $f$ at critical points and endpoints
3. Largest value = absolute maximum
4. Smallest value = absolute minimum

!!! quote "Delta's Final Thought"
    "Now you can read any curve like a book! You know where I'm climbing, where I'm coasting, where I hit peaks and valleys, and where the whole vibe of the curve shifts. You're officially a curve-analysis expert. Let's go find some functions to explore!"

## Looking Ahead

In the next chapter, you'll apply these analysis skills to **optimization problems** - finding the absolute best values in real-world situations. You'll see how derivatives help us minimize costs, maximize profits, and find the most efficient designs. The tools you've built here are exactly what you need!

[See Annotated References](./references.md)
