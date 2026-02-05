---
title: Riemann Sums and the Fundamental Theorem
description: Connecting areas and antiderivatives through Riemann sums and the FTC
generated_by: claude skill chapter-content-generator
date: 2026-02-03 15:33:00
version: 0.03
---

# Riemann Sums and the Fundamental Theorem

## Summary

This chapter develops the definite integral through Riemann sums and presents the Fundamental Theorem of Calculus, which connects differentiation and integration. Students will learn left, right, midpoint, and trapezoidal approximations, then understand the definite integral as the limit of Riemann sums. Both parts of the FTC are covered: Part 1 shows that the derivative of an accumulation function is the integrand, and Part 2 provides the evaluation theorem for computing definite integrals. After completing this chapter, students will understand the deep connection between derivatives and integrals.

## Concepts Covered

This chapter covers the following 24 concepts from the learning graph:

1. Riemann Sum
2. Left Riemann Sum
3. Right Riemann Sum
4. Midpoint Riemann Sum
5. Trapezoidal Rule
6. Summation Notation
7. Sigma Notation
8. Index of Summation
9. Limit of Riemann Sum
10. Definite Integral
11. Definite Integral Notat
12. Limits of Integration
13. Fundamental Theorem
14. FTC Part One
15. FTC Part Two
16. Evaluation Theorem
17. Accumulation Function
18. Integral as Function
19. Derivative of Integral
20. FTC Chain Rule
21. Net Change Theorem
22. Net Signed Area
23. Area Under Curve
24. Integral Properties

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Understanding Limits](../02-understanding-limits/index.md)
- [Chapter 6: The Derivative Concept](../06-derivative-concept/index.md)
- [Chapter 20: Basic Antiderivatives](../20-basic-antiderivatives/index.md)
- [Chapter 21: Transcendental Integrals](../21-transcendental-integrals/index.md)

---

## Introduction: The Grand Connection

Welcome to what many mathematicians consider the most beautiful result in all of calculus. You're about to discover something remarkable: the process of finding slopes (differentiation) and the process of finding areas (integration) are not just related—they're **inverse operations**.

This connection isn't obvious at first. What does the slope of a curve have to do with the area underneath it? As it turns out, everything.

!!! quote "Delta Moment"
    "For months I've been doing two things: measuring how steep the ground is under my wheels, and checking my backpack to see how far I've traveled. I never thought those two activities were connected. But they are. They're TWO SIDES OF THE SAME COIN. This chapter is where everything clicks!"

In this chapter, we'll build up the definite integral from scratch using rectangles to approximate areas. Then we'll reveal the Fundamental Theorem of Calculus—the bridge that connects everything you've learned about derivatives to everything you'll learn about integrals.

## Approximating Area: The Rectangle Strategy

Let's start with a concrete problem: How do we find the area under a curve?

For simple shapes like rectangles, triangles, and circles, we have formulas. But what about the area under $y = x^2$ between $x = 0$ and $x = 3$? There's no "curved shape" formula for that.

Here's the key insight: **we can approximate any curved area using rectangles**. Rectangles are easy—the area is just base times height. If we use enough rectangles, we can get as close to the true area as we want.

#### The Big Idea

Imagine slicing the region under a curve into thin vertical strips. Each strip is approximately a rectangle. Add up all the rectangle areas, and you've approximated the total area.

- More rectangles = better approximation
- Infinitely many rectangles = exact area

This process of approximating areas with rectangles has a name: **Riemann sums**, named after the German mathematician Bernhard Riemann.

## Summation Notation: The Language of Adding Things Up

Before we dive into Riemann sums, we need a compact way to write "add up a bunch of terms." That's where **sigma notation** comes in.

!!! tip "Sigma Notation"
    The Greek letter sigma ($\Sigma$) means "sum." The notation:

    $$\sum_{i=1}^{n} a_i = a_1 + a_2 + a_3 + \cdots + a_n$$

    reads as "the sum of $a_i$ from $i = 1$ to $n$."

The components of sigma notation are:

| Component | Name | Role |
|-----------|------|------|
| $\Sigma$ | Sigma (summation sign) | "Add up all the terms" |
| $i$ | Index of summation | Counter variable |
| $1$ | Lower limit | Starting value of $i$ |
| $n$ | Upper limit | Ending value of $i$ |
| $a_i$ | General term | The pattern being summed |

**Examples:**

- $\sum_{i=1}^{5} i = 1 + 2 + 3 + 4 + 5 = 15$

- $\sum_{i=1}^{4} i^2 = 1^2 + 2^2 + 3^2 + 4^2 = 1 + 4 + 9 + 16 = 30$

- $\sum_{k=0}^{3} 2^k = 2^0 + 2^1 + 2^2 + 2^3 = 1 + 2 + 4 + 8 = 15$

Note that the index variable can be any letter ($i$, $k$, $j$, etc.)—it's just a placeholder.

#### Diagram: Sigma Notation Visualizer

<iframe src="../../sims/sigma-notation-visualizer/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Sigma Notation Visualizer MicroSim</summary>
Type: microsim

Purpose: Build understanding of sigma notation by expanding sums and calculating totals.

Learning Objective: Students will interpret sigma notation and evaluate summations (Bloom Level 2: Understand)

Bloom Taxonomy Verb: interpret, explain, calculate

Visual elements:

- Large sigma notation display with adjustable parameters
- Expansion showing individual terms being added
- Running total accumulator
- Visual blocks representing each term value
- Animation of terms being added together

Interactive controls:

- Slider: Upper limit n (1 to 10)
- Dropdown: Choose formula type (i, i^2, 2i, 2^i, constant)
- Slider: Lower limit start value
- Button: Step through expansion
- Button: Show all at once
- Display: Final sum

Data Visibility Requirements:

- Stage 1: Show the sigma notation
- Stage 2: Show first term with its value
- Stage 3: Add subsequent terms one by one
- Stage 4: Show running total
- Stage 5: Display final sum

Behavior:

- Terms animate into the total
- Visual blocks stack to show accumulation
- Clear connection between notation and meaning
- Practice mode with random problems

Instructional Rationale: Students often struggle with sigma notation because they don't connect the compact notation to the expansion. Seeing terms added one by one builds fluency.

Implementation: p5.js with animated term expansion and visual blocks
</details>

### Useful Summation Formulas

Certain sums appear so often that we have closed-form formulas for them:

#### Sum of First n Integers

$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$

#### Sum of First n Squares

$$\sum_{i=1}^{n} i^2 = \frac{n(n+1)(2n+1)}{6}$$

#### Sum of First n Cubes

$$\sum_{i=1}^{n} i^3 = \left[\frac{n(n+1)}{2}\right]^2$$

These formulas will help us evaluate Riemann sums without manually adding hundreds of terms.

## Left Riemann Sums

Now let's use rectangles to approximate area. We'll start with the **left Riemann sum**.

Consider finding the area under $f(x)$ from $x = a$ to $x = b$.

**Setup:**

1. Divide $[a, b]$ into $n$ equal subintervals
2. Width of each subinterval: $\Delta x = \frac{b - a}{n}$
3. For each rectangle, use the **left endpoint** to determine the height

The left endpoints are: $x_0 = a$, $x_1 = a + \Delta x$, $x_2 = a + 2\Delta x$, ..., $x_{n-1} = a + (n-1)\Delta x$

!!! tip "Left Riemann Sum Formula"
    $$L_n = \sum_{i=0}^{n-1} f(x_i) \cdot \Delta x = \sum_{i=0}^{n-1} f(a + i \cdot \Delta x) \cdot \Delta x$$

    where:

    - $L_n$ is the left Riemann sum with $n$ rectangles
    - $\Delta x = \frac{b-a}{n}$ is the width of each rectangle
    - $f(x_i)$ is the height of the $i$th rectangle (using left endpoint)

**Example:** Approximate $\int_0^2 x^2 \, dx$ using $n = 4$ left rectangles.

Step 1: Calculate $\Delta x = \frac{2 - 0}{4} = 0.5$

Step 2: Find left endpoints: $x_0 = 0$, $x_1 = 0.5$, $x_2 = 1$, $x_3 = 1.5$

Step 3: Calculate heights: $f(0) = 0$, $f(0.5) = 0.25$, $f(1) = 1$, $f(1.5) = 2.25$

Step 4: Sum the rectangle areas:
$$L_4 = (0)(0.5) + (0.25)(0.5) + (1)(0.5) + (2.25)(0.5) = 1.75$$

The true value turns out to be $\frac{8}{3} \approx 2.67$, so our approximation is an underestimate (because $x^2$ is increasing on this interval).

## Right Riemann Sums

The **right Riemann sum** uses the right endpoint of each subinterval to determine rectangle heights.

!!! tip "Right Riemann Sum Formula"
    $$R_n = \sum_{i=1}^{n} f(x_i) \cdot \Delta x = \sum_{i=1}^{n} f(a + i \cdot \Delta x) \cdot \Delta x$$

**Example:** Using the same function and interval ($\int_0^2 x^2 \, dx$ with $n = 4$):

Right endpoints: $x_1 = 0.5$, $x_2 = 1$, $x_3 = 1.5$, $x_4 = 2$

Heights: $f(0.5) = 0.25$, $f(1) = 1$, $f(1.5) = 2.25$, $f(2) = 4$

$$R_4 = (0.25)(0.5) + (1)(0.5) + (2.25)(0.5) + (4)(0.5) = 3.75$$

This time we got an overestimate!

!!! quote "Delta Moment"
    "Here's the pattern: when I'm climbing uphill (function increasing), left rectangles miss the tops of the curve—underestimate! Right rectangles poke above—overestimate! It flips when I'm going downhill."

#### Diagram: Left vs Right Riemann Sums

<iframe src="../../sims/left-right-riemann/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Left vs Right Riemann Sums MicroSim</summary>
Type: microsim

Purpose: Compare left and right Riemann sum approximations visually and numerically.

Learning Objective: Students will distinguish between left and right Riemann sums and explain when each overestimates or underestimates (Bloom Level 4: Analyze)

Bloom Taxonomy Verb: compare, distinguish, analyze

Visual elements:

- Graph of function with shaded region under curve
- Left Riemann rectangles (one color, e.g., blue with transparency)
- Right Riemann rectangles (another color, e.g., orange with transparency)
- Toggle to show one or both at once
- Numerical display of both approximations
- Visual indicator of over/underestimate

Interactive controls:

- Slider: Number of rectangles n (2 to 50)
- Dropdown: Choose function (x^2, sin(x), e^x, linear, decreasing function)
- Slider: Adjust interval [a, b]
- Toggle: Show left only / right only / both overlapped
- Display: L_n value, R_n value, difference, true value (if computable)

Behavior:

- Rectangles update in real-time as n changes
- Excess or deficit areas highlighted
- As n increases, both approximations converge
- Clear visual of which approximation is larger

Instructional Rationale: Side-by-side comparison reveals the relationship between function behavior (increasing/decreasing) and over/underestimates. Increasing n shows convergence.

Implementation: p5.js with overlay rectangles and numerical displays
</details>

## Midpoint Riemann Sums

The **midpoint Riemann sum** uses the midpoint of each subinterval for the height. This often gives better approximations than left or right sums.

!!! tip "Midpoint Riemann Sum Formula"
    $$M_n = \sum_{i=1}^{n} f(\bar{x}_i) \cdot \Delta x$$

    where $\bar{x}_i = a + \left(i - \frac{1}{2}\right)\Delta x$ is the midpoint of the $i$th subinterval.

**Example:** For $\int_0^2 x^2 \, dx$ with $n = 4$:

Midpoints: $\bar{x}_1 = 0.25$, $\bar{x}_2 = 0.75$, $\bar{x}_3 = 1.25$, $\bar{x}_4 = 1.75$

Heights: $f(0.25) = 0.0625$, $f(0.75) = 0.5625$, $f(1.25) = 1.5625$, $f(1.75) = 3.0625$

$$M_4 = (0.0625 + 0.5625 + 1.5625 + 3.0625)(0.5) = 2.625$$

This is much closer to the true value of $\frac{8}{3} \approx 2.67$!

## The Trapezoidal Rule

Instead of rectangles, we can use **trapezoids**. A trapezoid connects the left and right endpoints with a straight line, capturing more of the curve's shape.

The area of a trapezoid is $\frac{1}{2}(b_1 + b_2)h$, where $b_1$ and $b_2$ are the parallel sides.

!!! tip "Trapezoidal Rule Formula"
    $$T_n = \frac{\Delta x}{2}\left[f(x_0) + 2f(x_1) + 2f(x_2) + \cdots + 2f(x_{n-1}) + f(x_n)\right]$$

    Or equivalently:

    $$T_n = \frac{L_n + R_n}{2}$$

    The trapezoidal sum is the average of the left and right sums!

**Example:** For $\int_0^2 x^2 \, dx$ with $n = 4$:

We already found $L_4 = 1.75$ and $R_4 = 3.75$.

$$T_4 = \frac{1.75 + 3.75}{2} = 2.75$$

Even closer to $2.67$!

| Method | Approximation | Error |
|--------|---------------|-------|
| Left ($L_4$) | 1.75 | 0.92 |
| Right ($R_4$) | 3.75 | 1.08 |
| Midpoint ($M_4$) | 2.625 | 0.04 |
| Trapezoidal ($T_4$) | 2.75 | 0.08 |
| True value | 2.667 | 0 |

Notice that midpoint and trapezoidal methods tend to be more accurate than left and right methods.

#### Diagram: Four Riemann Sum Methods Comparison

<iframe src="../../sims/riemann-sum-methods/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Four Riemann Sum Methods Comparison MicroSim</summary>
Type: microsim

Purpose: Compare all four approximation methods (left, right, midpoint, trapezoidal) on the same function.

Learning Objective: Students will evaluate which Riemann sum method provides the best approximation for a given function (Bloom Level 5: Evaluate)

Bloom Taxonomy Verb: evaluate, compare, judge, assess

Visual elements:

- Main graph showing function and selected approximation method
- Four small preview graphs showing all methods simultaneously
- Numerical comparison table with all values
- Error bars or accuracy indicators
- Highlight of best approximation

Interactive controls:

- Slider: Number of subintervals n (2 to 100)
- Radio buttons: Select which method to show in main view
- Toggle: Show all methods overlapped
- Dropdown: Choose function
- Adjustable interval [a, b]
- Display: Calculated values for each method and true integral (when known)

Data Visibility Requirements:

- Show setup: function, interval, n value
- Show each method's approximation
- Show true value (computed or provided)
- Show absolute error for each method
- Rank methods by accuracy

Behavior:

- Methods update simultaneously as n changes
- Best method highlighted
- Error shrinks visibly as n increases
- Different functions favor different methods

Instructional Rationale: Direct comparison builds intuition for choosing approximation methods. Students see that no method is universally best—it depends on function shape.

Implementation: p5.js with four-panel display and interactive comparison
</details>

## The Limit of Riemann Sums: Defining the Definite Integral

Here's the crucial insight: as we use more and more rectangles (letting $n \to \infty$), all four methods converge to the same value—the **exact area** under the curve.

This leads to the definition of the definite integral.

!!! tip "Definition: Definite Integral"
    If $f$ is continuous on $[a, b]$, the **definite integral** of $f$ from $a$ to $b$ is:

    $$\int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i^*) \cdot \Delta x$$

    where $\Delta x = \frac{b-a}{n}$ and $x_i^*$ is any point in the $i$th subinterval.

This is a **limit of Riemann sums**. As the rectangles get infinitely thin, the approximation becomes exact.

The notation tells us:

| Symbol | Name | Meaning |
|--------|------|---------|
| $\int$ | Integral sign | Sum of infinitely many infinitesimal pieces |
| $a$ | Lower limit of integration | Starting x-value |
| $b$ | Upper limit of integration | Ending x-value |
| $f(x)$ | Integrand | Function being integrated |
| $dx$ | Differential | Indicates integration variable |

!!! quote "Delta Moment"
    "When the rectangles get infinitely thin, they perfectly trace the curve beneath my wheels. The sum of infinitely many infinitely thin rectangles—that's the definite integral. It's not an approximation anymore. It's the EXACT area!"

### Definite Integral as Net Signed Area

Important: the definite integral computes **net signed area**, not just area.

- When $f(x) > 0$: the area counts as **positive**
- When $f(x) < 0$: the area counts as **negative**

The definite integral adds these signed areas together.

**Example:** For $f(x) = x$ from $-2$ to $2$:

- From $-2$ to $0$: The region is below the x-axis, contributing $-2$ to the integral
- From $0$ to $2$: The region is above the x-axis, contributing $+2$ to the integral
- Total: $\int_{-2}^{2} x \, dx = -2 + 2 = 0$

The positive and negative areas cancel!

#### Diagram: Net Signed Area Visualizer

<iframe src="../../sims/net-signed-area/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Net Signed Area Visualizer MicroSim</summary>
Type: microsim

Purpose: Demonstrate that definite integrals compute net signed area, with regions below the x-axis contributing negatively.

Learning Objective: Students will explain how positive and negative areas combine in a definite integral (Bloom Level 2: Understand)

Bloom Taxonomy Verb: explain, interpret, distinguish

Visual elements:

- Graph with regions colored by sign (blue for positive, red for negative)
- Area values displayed for each region
- Running total showing net signed area
- x-axis clearly visible as the dividing line
- Numerical breakdown of contributions

Interactive controls:

- Dropdown: Select function (sine, linear crossing axis, polynomial with roots)
- Slider: Adjust interval [a, b]
- Toggle: Show areas separately vs. combined
- Display: Positive area total, negative area total, net signed area

Behavior:

- Regions above x-axis colored positively
- Regions below x-axis colored negatively
- Clear demonstration of cancellation
- Comparison to total unsigned area option

Instructional Rationale: The signed nature of definite integrals surprises many students. Seeing positive and negative regions with their values builds correct intuition.

Implementation: p5.js with colored regions and area calculations
</details>

## Properties of Definite Integrals

The definite integral satisfies several important properties that follow from the limit definition.

### Property 1: Reversing Limits

$$\int_a^b f(x) \, dx = -\int_b^a f(x) \, dx$$

Switching the limits of integration changes the sign.

### Property 2: Zero Width Interval

$$\int_a^a f(x) \, dx = 0$$

If the interval has no width, the integral is zero (no area).

### Property 3: Constant Multiple

$$\int_a^b k \cdot f(x) \, dx = k \int_a^b f(x) \, dx$$

Constants can be pulled out of definite integrals.

### Property 4: Sum/Difference

$$\int_a^b [f(x) \pm g(x)] \, dx = \int_a^b f(x) \, dx \pm \int_a^b g(x) \, dx$$

Integrals split over sums and differences.

### Property 5: Additivity over Intervals

$$\int_a^b f(x) \, dx + \int_b^c f(x) \, dx = \int_a^c f(x) \, dx$$

You can break an integral into pieces at any interior point.

| Property | Formula | Interpretation |
|----------|---------|----------------|
| Reverse limits | $\int_a^b f = -\int_b^a f$ | Going backwards reverses sign |
| Zero width | $\int_a^a f = 0$ | No width = no area |
| Constant multiple | $\int_a^b kf = k\int_a^b f$ | Scale the area |
| Sum/Difference | $\int_a^b (f \pm g) = \int_a^b f \pm \int_a^b g$ | Add/subtract areas |
| Additivity | $\int_a^c f = \int_a^b f + \int_b^c f$ | Combine adjacent regions |

### Property 6: Comparison Properties

If $f(x) \geq 0$ on $[a, b]$, then $\int_a^b f(x) \, dx \geq 0$

If $f(x) \geq g(x)$ on $[a, b]$, then $\int_a^b f(x) \, dx \geq \int_a^b g(x) \, dx$

Bigger functions have bigger integrals!

## Accumulation Functions: Integrals with Variable Limits

Now for something that seems abstract but leads to the Fundamental Theorem.

What if the upper limit of integration is a variable?

!!! tip "Accumulation Function"
    If $f$ is continuous on $[a, b]$, the **accumulation function** is defined by:

    $$F(x) = \int_a^x f(t) \, dt$$

    This represents the accumulated signed area from $a$ to $x$.

Notice we changed the variable inside the integral from $x$ to $t$ to avoid confusion—$x$ is now the upper limit, not the integration variable.

**What does $F(x)$ represent?**

- $F(x)$ tells us how much area has accumulated from $a$ up to the point $x$
- As $x$ increases, we accumulate more area (if $f > 0$)
- As $x$ increases past regions where $f < 0$, accumulated area decreases

**Example:** Let $F(x) = \int_0^x t^2 \, dt$

- $F(0) = \int_0^0 t^2 \, dt = 0$ (no area yet)
- $F(1) = \int_0^1 t^2 \, dt = \frac{1}{3}$ (area under $y = t^2$ from 0 to 1)
- $F(2) = \int_0^2 t^2 \, dt = \frac{8}{3}$ (area from 0 to 2)

As $x$ grows, $F(x)$ accumulates more and more area.

!!! quote "Delta Moment"
    "The accumulation function is like my travel journal! $F(x)$ tells me the total signed area I've covered from where I started ($a$) to where I am now ($x$). Every step I take adds (or subtracts) a little more to my journal."

#### Diagram: Accumulation Function Explorer

<iframe src="../../sims/accumulation-function/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Accumulation Function Explorer MicroSim</summary>
Type: microsim

Purpose: Visualize how the accumulation function $F(x) = \int_a^x f(t) \, dt$ grows as x moves.

Learning Objective: Students will interpret accumulation functions graphically and explain how they relate to the integrand (Bloom Level 2: Understand)

Bloom Taxonomy Verb: interpret, trace, explain

Visual elements:

- Top panel: Graph of $f(t)$ with shaded region from $a$ to $x$
- Bottom panel: Graph of $F(x)$ being traced out
- Movable vertical line at $x$ showing current position
- Numerical display of current $F(x)$ value
- Delta showing current rate of accumulation

Interactive controls:

- Slider or drag: Move x across the interval
- Dropdown: Choose integrand $f(t)$ (constant, linear, quadratic, sine)
- Slider: Adjust starting point $a$
- Button: Animate x moving across interval
- Toggle: Show instantaneous rate of accumulation

Data Visibility Requirements:

- Show current x position
- Show shaded area representing $F(x)$
- Show numerical value of $F(x)$
- Show how F changes as x moves
- Connect rate of accumulation to $f(x)$ value

Behavior:

- As x increases through positive regions, F(x) rises
- As x increases through negative regions, F(x) falls
- Slope of F(x) at each point equals f(x) at that point
- Clear visual of "accumulated area so far"

Instructional Rationale: Understanding accumulation functions is essential for FTC Part 1. Seeing F(x) build up as x moves makes the abstract concrete.

Implementation: p5.js with synchronized dual panels and draggable x-position
</details>

## The Fundamental Theorem of Calculus, Part 1

Now we arrive at the first half of the most important theorem in calculus.

**The Question:** If we have an accumulation function $F(x) = \int_a^x f(t) \, dt$, what is its derivative?

Think about it: $F(x)$ represents accumulated area. $F'(x)$ represents the rate at which area is accumulating. And the rate at which area accumulates depends on the height of the function at that point—which is $f(x)$!

!!! tip "Fundamental Theorem of Calculus, Part 1"
    If $f$ is continuous on $[a, b]$, then the function $F$ defined by:

    $$F(x) = \int_a^x f(t) \, dt$$

    is differentiable on $(a, b)$, and:

    $$F'(x) = \frac{d}{dx}\left[\int_a^x f(t) \, dt\right] = f(x)$$

    **The derivative of an accumulation function is the integrand!**

This is remarkable. It says:

- Start with $f(x)$
- Build the accumulation function by integrating $f$
- Take the derivative of that accumulation function
- You get back $f(x)$!

Integration and differentiation are **inverse operations**.

**Example:** Find $\frac{d}{dx}\left[\int_1^x t^3 \, dt\right]$

By FTC Part 1, the answer is simply $x^3$.

We don't need to evaluate the integral—the derivative just gives back the integrand with $t$ replaced by $x$.

**Example:** Find $\frac{d}{dx}\left[\int_0^x \cos(t^2) \, dt\right]$

By FTC Part 1: $\frac{d}{dx}\left[\int_0^x \cos(t^2) \, dt\right] = \cos(x^2)$

Again, we couldn't even evaluate $\int \cos(t^2) \, dt$ using elementary functions—but we can still differentiate the accumulation function!

!!! quote "Delta's Pun Corner"
    "The Fundamental Theorem is like the undo button for calculus. Integration does something, differentiation undoes it. It's the mathematical Ctrl+Z!"

### FTC Part 1 with Chain Rule

What if the upper limit is not just $x$ but some function of $x$, like $x^2$?

!!! tip "FTC Part 1 with Chain Rule"
    If $F(x) = \int_a^{g(x)} f(t) \, dt$, then:

    $$F'(x) = f(g(x)) \cdot g'(x)$$

    This is FTC Part 1 combined with the chain rule.

**Example:** Find $\frac{d}{dx}\left[\int_0^{x^2} \sin t \, dt\right]$

Here $g(x) = x^2$, so $g'(x) = 2x$.

By FTC Part 1 with chain rule:
$$\frac{d}{dx}\left[\int_0^{x^2} \sin t \, dt\right] = \sin(x^2) \cdot 2x = 2x\sin(x^2)$$

**Example:** Find $\frac{d}{dx}\left[\int_1^{\ln x} e^{t^2} \, dt\right]$

Here $g(x) = \ln x$, so $g'(x) = \frac{1}{x}$.

$$\frac{d}{dx}\left[\int_1^{\ln x} e^{t^2} \, dt\right] = e^{(\ln x)^2} \cdot \frac{1}{x} = \frac{e^{(\ln x)^2}}{x}$$

### When the Lower Limit is Variable

If the lower limit is a function: $\int_{h(x)}^{b} f(t) \, dt$

Use the property $\int_{h(x)}^{b} f(t) \, dt = -\int_b^{h(x)} f(t) \, dt$, then apply FTC Part 1 with chain rule:

$$\frac{d}{dx}\left[\int_{h(x)}^{b} f(t) \, dt\right] = -f(h(x)) \cdot h'(x)$$

#### Diagram: FTC Part 1 Derivative Calculator

<iframe src="../../sims/ftc-part1-calculator/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>FTC Part 1 Derivative Calculator MicroSim</summary>
Type: microsim

Purpose: Practice applying FTC Part 1 with and without chain rule.

Learning Objective: Students will apply FTC Part 1 to find derivatives of accumulation functions (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, calculate, use

Visual elements:

- Input display showing accumulation function
- Step-by-step solution display
- Graph showing integrand f(t) and shaded accumulation
- Result with chain rule term highlighted when applicable

Interactive controls:

- Dropdown: Choose integrand f(t)
- Input: Upper limit as function of x
- Input: Lower limit (constant or function of x)
- Button: Show solution step-by-step
- Toggle: Include chain rule explanation
- Practice mode with random problems

Data Visibility Requirements:

- Stage 1: Display the integral expression
- Stage 2: Identify the integrand f(t)
- Stage 3: Identify upper/lower limits
- Stage 4: Apply FTC Part 1 (show substitution)
- Stage 5: Apply chain rule if needed
- Stage 6: Simplify final answer

Behavior:

- Clear step-by-step solution
- Chain rule factor highlighted
- Visual connection to accumulation interpretation
- Practice problems with feedback

Instructional Rationale: FTC Part 1 problems follow a pattern. Breaking into explicit steps builds procedural fluency while reinforcing the theorem's meaning.

Implementation: p5.js with step-by-step reveal and practice mode
</details>

## The Fundamental Theorem of Calculus, Part 2

Part 1 told us that the derivative of an accumulation function gives back the integrand. Part 2 gives us a way to **evaluate** definite integrals using antiderivatives.

!!! tip "Fundamental Theorem of Calculus, Part 2 (Evaluation Theorem)"
    If $f$ is continuous on $[a, b]$ and $F$ is any antiderivative of $f$ (i.e., $F'(x) = f(x)$), then:

    $$\int_a^b f(x) \, dx = F(b) - F(a)$$

    We often write this as:

    $$\int_a^b f(x) \, dx = \bigl[F(x)\bigr]_a^b = F(b) - F(a)$$

This is the **Evaluation Theorem**, and it's incredibly powerful. Instead of computing limits of Riemann sums (adding up infinitely many rectangles), we just:

1. Find an antiderivative $F(x)$
2. Evaluate it at the endpoints
3. Subtract: $F(b) - F(a)$

**Example:** Evaluate $\int_0^2 x^2 \, dx$

Step 1: Find an antiderivative: $F(x) = \frac{x^3}{3}$

Step 2: Apply FTC Part 2:
$$\int_0^2 x^2 \, dx = \left[\frac{x^3}{3}\right]_0^2 = \frac{2^3}{3} - \frac{0^3}{3} = \frac{8}{3} - 0 = \frac{8}{3}$$

This is the exact value we were approximating earlier with Riemann sums!

**Example:** Evaluate $\int_0^{\pi} \sin x \, dx$

Antiderivative: $F(x) = -\cos x$

$$\int_0^{\pi} \sin x \, dx = [-\cos x]_0^{\pi} = -\cos(\pi) - (-\cos(0)) = -(-1) - (-1) = 1 + 1 = 2$$

!!! note "No +C Needed!"
    When evaluating definite integrals, we don't need the "+C". Why? Because:

    $$[F(x) + C]_a^b = (F(b) + C) - (F(a) + C) = F(b) - F(a)$$

    The constants cancel!

!!! quote "Delta Moment"
    "FTC Part 2 is a cheat code! Instead of slicing curves into a million rectangles, I just find the antiderivative and plug in two numbers. It's like teleporting instead of walking—same destination, way faster!"

#### The Evaluation Notation

The vertical bar notation $\bigl[F(x)\bigr]_a^b$ means:

- Evaluate $F(x)$ at $x = b$ (upper limit)
- Evaluate $F(x)$ at $x = a$ (lower limit)
- Subtract: (value at top) - (value at bottom)

**More examples:**

$$\int_1^4 (3x^2 - 2x + 1) \, dx = \left[x^3 - x^2 + x\right]_1^4$$
$$= (64 - 16 + 4) - (1 - 1 + 1) = 52 - 1 = 51$$

$$\int_0^{\pi/2} \cos x \, dx = [\sin x]_0^{\pi/2} = \sin\frac{\pi}{2} - \sin 0 = 1 - 0 = 1$$

$$\int_1^e \frac{1}{x} \, dx = [\ln x]_1^e = \ln e - \ln 1 = 1 - 0 = 1$$

#### Diagram: FTC Part 2 Step-by-Step Evaluator

<iframe src="../../sims/ftc-part2-evaluator/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>FTC Part 2 Step-by-Step Evaluator MicroSim</summary>
Type: microsim

Purpose: Walk through the FTC Part 2 evaluation process step by step.

Learning Objective: Students will apply FTC Part 2 to evaluate definite integrals (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, calculate, evaluate

Visual elements:

- Input: Definite integral to evaluate
- Step-by-step solution panels
- Graph showing function with shaded area
- Numerical result highlighted
- Connection to antiderivative graph

Interactive controls:

- Input: Function f(x)
- Input: Lower limit a
- Input: Upper limit b
- Button: Step through solution
- Dropdown: Preset problems for practice
- Display: Each step of the evaluation

Data Visibility Requirements:

- Stage 1: Show the definite integral $\int_a^b f(x) \, dx$
- Stage 2: Find antiderivative F(x)
- Stage 3: Write $[F(x)]_a^b$
- Stage 4: Substitute: $F(b) - F(a)$
- Stage 5: Calculate numerical values
- Stage 6: Final answer

Behavior:

- Steps reveal one at a time
- Graph shows shaded area = numerical answer
- Practice mode with increasing difficulty
- Hint system for common antiderivatives

Instructional Rationale: Explicit step-through builds procedural fluency. Connecting the algebraic result to the graphical area reinforces understanding.

Implementation: p5.js with step reveal and graph visualization
</details>

## The Net Change Theorem

The Fundamental Theorem has an important interpretation in terms of **net change**.

!!! tip "Net Change Theorem"
    If $F'(x) = f(x)$ is continuous on $[a, b]$, then:

    $$\int_a^b F'(x) \, dx = F(b) - F(a)$$

    The integral of a rate of change gives the net change.

This is just FTC Part 2 restated, but the interpretation is powerful:

- If $F'(x)$ represents a **rate** (velocity, growth rate, flow rate, etc.)
- Then $\int_a^b F'(x) \, dx$ represents the **total change** in $F$ from $a$ to $b$

**Applications:**

| Rate Function | Integral Gives |
|---------------|----------------|
| Velocity $v(t)$ | Displacement (net change in position) |
| Acceleration $a(t)$ | Change in velocity |
| Marginal cost | Change in total cost |
| Population growth rate | Change in population |
| Flow rate | Total volume transferred |

**Example:** Water flows into a tank at a rate of $r(t) = 2t + 3$ gallons per minute. How much water flows in during the first 5 minutes?

Total water = $\int_0^5 (2t + 3) \, dt = [t^2 + 3t]_0^5 = (25 + 15) - 0 = 40$ gallons

**Example:** A car's velocity is $v(t) = 3t^2 - 6t + 10$ ft/sec. Find the displacement from $t = 0$ to $t = 4$ seconds.

Displacement = $\int_0^4 (3t^2 - 6t + 10) \, dt = [t^3 - 3t^2 + 10t]_0^4$
$= (64 - 48 + 40) - 0 = 56$ feet

!!! quote "Delta Moment"
    "The Net Change Theorem says: if you want to know how far I traveled, integrate my velocity. If you want to know how much my velocity changed, integrate my acceleration. Rate in, total out!"

## Area Under the Curve

When the function is non-negative on $[a, b]$, the definite integral gives the actual **area** under the curve.

#### Area Between a Curve and the x-axis

$$\text{Area} = \int_a^b f(x) \, dx \quad \text{when } f(x) \geq 0 \text{ on } [a, b]$$

But remember: if $f(x)$ is negative somewhere, the integral gives **net signed area**, which could be less than the total area.

**To find total area (ignoring sign):**

$$\text{Total Area} = \int_a^b |f(x)| \, dx$$

This requires splitting the integral at points where $f(x)$ changes sign.

**Example:** Find the total area bounded by $y = x^2 - 4$ and the x-axis from $x = -3$ to $x = 3$.

First, find where $f(x) = 0$: $x^2 - 4 = 0 \Rightarrow x = \pm 2$

The function is negative on $(-2, 2)$ and positive elsewhere.

Total area = $\int_{-3}^{-2} (x^2 - 4) \, dx + \int_{-2}^{2} |x^2 - 4| \, dx + \int_2^3 (x^2 - 4) \, dx$

Since $x^2 - 4 < 0$ on $(-2, 2)$: $|x^2 - 4| = -(x^2 - 4) = 4 - x^2$

Total area = $\int_{-3}^{-2} (x^2 - 4) \, dx + \int_{-2}^{2} (4 - x^2) \, dx + \int_2^3 (x^2 - 4) \, dx$

Each integral can be evaluated:

- First: $[\frac{x^3}{3} - 4x]_{-3}^{-2} = (-\frac{8}{3} + 8) - (-9 + 12) = \frac{16}{3} - 3 = \frac{7}{3}$
- Second: $[4x - \frac{x^3}{3}]_{-2}^{2} = (8 - \frac{8}{3}) - (-8 + \frac{8}{3}) = \frac{16}{3} + \frac{16}{3} = \frac{32}{3}$
- Third: (By symmetry, same as first) $= \frac{7}{3}$

Total area = $\frac{7}{3} + \frac{32}{3} + \frac{7}{3} = \frac{46}{3}$

Compare to net signed area:
$\int_{-3}^{3} (x^2 - 4) \, dx = [\frac{x^3}{3} - 4x]_{-3}^{3} = (9 - 12) - (-9 + 12) = -3 - 3 = -6$

The net signed area is negative, but the total area is $\frac{46}{3}$ square units.

## Connecting Both Parts: The Big Picture

Let's step back and see how the two parts of the FTC work together.

**FTC Part 1:** Differentiation undoes integration
$$\frac{d}{dx}\left[\int_a^x f(t) \, dt\right] = f(x)$$

**FTC Part 2:** Integration "undoes" differentiation (with evaluation at endpoints)
$$\int_a^b F'(x) \, dx = F(b) - F(a)$$

These two statements are two sides of the same coin:

- Part 1 says: The derivative of an area function is the height function
- Part 2 says: The total of instantaneous rates equals the net change

Together, they reveal that differentiation and integration are **inverse operations**—the two fundamental operations of calculus are intimately connected.

#### Diagram: FTC Connection Visualization

<iframe src="../../sims/ftc-connection/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>FTC Connection Visualization MicroSim</summary>
Type: microsim

Purpose: Show how FTC Part 1 and Part 2 are two sides of the same relationship.

Learning Objective: Students will analyze the relationship between differentiation and integration through the Fundamental Theorem (Bloom Level 4: Analyze)

Bloom Taxonomy Verb: analyze, connect, distinguish, relate

Visual elements:

- Three synchronized panels: f(x), F(x) = antiderivative, and accumulation function
- Arrows showing relationships: derivative connects F to f, integral connects f to F
- FTC Part 1 demonstration: d/dx of shaded area equals f(x)
- FTC Part 2 demonstration: F(b) - F(a) equals shaded area
- Toggle between Part 1 and Part 2 views

Interactive controls:

- Dropdown: Choose function family
- Slider: Move point x (for Part 1 view)
- Slider: Set interval [a, b] (for Part 2 view)
- Radio: Focus on Part 1 / Part 2 / Both
- Animation: Watch both theorems in action simultaneously

Behavior:

- Part 1 view: shows derivative of accumulation equals integrand
- Part 2 view: shows area equals antiderivative difference
- Both views use same underlying function
- Clear visual of inverse relationship

Instructional Rationale: Seeing both parts together reinforces that FTC describes one unified relationship between differentiation and integration, viewed from two perspectives.

Implementation: p5.js with three synchronized panels and dual-theorem view
</details>

## Worked Examples

Let's work through a variety of problems to solidify your understanding.

### Example 1: Riemann Sum Calculation

**Problem:** Calculate the right Riemann sum for $f(x) = x^3$ on $[0, 2]$ with $n = 4$.

**Solution:**

Step 1: Calculate $\Delta x = \frac{2 - 0}{4} = 0.5$

Step 2: Find right endpoints: $x_1 = 0.5$, $x_2 = 1$, $x_3 = 1.5$, $x_4 = 2$

Step 3: Calculate heights:

- $f(0.5) = 0.125$
- $f(1) = 1$
- $f(1.5) = 3.375$
- $f(2) = 8$

Step 4: Sum:
$$R_4 = (0.125 + 1 + 3.375 + 8)(0.5) = 12.5(0.5) = 6.25$$

The true value is $\int_0^2 x^3 \, dx = [\frac{x^4}{4}]_0^2 = 4$, so $R_4 = 6.25$ is an overestimate.

### Example 2: FTC Part 2 Evaluation

**Problem:** Evaluate $\int_1^4 (2\sqrt{x} - \frac{1}{x^2}) \, dx$

**Solution:**

Rewrite: $2\sqrt{x} = 2x^{1/2}$ and $\frac{1}{x^2} = x^{-2}$

Antiderivative: $F(x) = 2 \cdot \frac{x^{3/2}}{3/2} - \frac{x^{-1}}{-1} = \frac{4x^{3/2}}{3} + \frac{1}{x}$

Evaluate:
$$\int_1^4 (2\sqrt{x} - \frac{1}{x^2}) \, dx = \left[\frac{4x^{3/2}}{3} + \frac{1}{x}\right]_1^4$$

At $x = 4$: $\frac{4(8)}{3} + \frac{1}{4} = \frac{32}{3} + \frac{1}{4} = \frac{128 + 3}{12} = \frac{131}{12}$

At $x = 1$: $\frac{4(1)}{3} + 1 = \frac{4}{3} + 1 = \frac{7}{3}$

Result: $\frac{131}{12} - \frac{7}{3} = \frac{131}{12} - \frac{28}{12} = \frac{103}{12}$

### Example 3: FTC Part 1 with Chain Rule

**Problem:** Find $\frac{d}{dx}\left[\int_2^{x^3} \sqrt{1 + t^4} \, dt\right]$

**Solution:**

Let $g(x) = x^3$ (the upper limit as a function of x)

Then $g'(x) = 3x^2$

By FTC Part 1 with chain rule:
$$\frac{d}{dx}\left[\int_2^{x^3} \sqrt{1 + t^4} \, dt\right] = \sqrt{1 + (x^3)^4} \cdot 3x^2 = 3x^2\sqrt{1 + x^{12}}$$

### Example 4: Net Change Application

**Problem:** The population of a bacteria colony grows at a rate of $P'(t) = 200e^{0.1t}$ bacteria per hour. If the initial population is 1000, find the population after 10 hours.

**Solution:**

Net change in population = $\int_0^{10} 200e^{0.1t} \, dt$

$= 200 \cdot \frac{e^{0.1t}}{0.1} \Big|_0^{10} = 2000[e^{0.1t}]_0^{10}$

$= 2000(e^1 - e^0) = 2000(e - 1) \approx 2000(1.718) \approx 3436$

Population after 10 hours = Initial + Net Change = $1000 + 3436 = 4436$ bacteria

## Common Mistakes to Avoid

**Mistake 1: Forgetting to change limits with substitution**

When using u-substitution with definite integrals, either:
- Change the limits to u-values, OR
- Convert back to x and use original limits

Don't mix them!

**Mistake 2: Sign errors with FTC Part 2**

Remember: $[F(x)]_a^b = F(b) - F(a)$, not $F(a) - F(b)$.
Upper limit comes first!

**Mistake 3: Confusing net signed area with total area**

$\int_a^b f(x) \, dx$ gives net signed area. For total area when $f$ crosses the x-axis, you need to split the integral and use absolute values.

**Mistake 4: Missing the chain rule in FTC Part 1**

If the upper limit is not just $x$, you need the chain rule:
$\frac{d}{dx}\left[\int_a^{g(x)} f(t) \, dt\right] = f(g(x)) \cdot g'(x)$

**Mistake 5: Using +C with definite integrals**

Definite integrals evaluate to a number. No +C needed (the constants cancel).

## Summary and Key Takeaways

This chapter covered the essential bridge between differential and integral calculus.

**Riemann Sums:**

- Approximate areas using rectangles (or trapezoids)
- Left, right, midpoint, and trapezoidal methods
- As $n \to \infty$, all methods converge to the exact area

**Definite Integral:**

- $\int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x$
- Represents net signed area under the curve
- Satisfies properties: linearity, additivity over intervals, comparison

**Accumulation Functions:**

- $F(x) = \int_a^x f(t) \, dt$ accumulates signed area
- Represents "total so far" from starting point $a$

**Fundamental Theorem, Part 1:**

- $\frac{d}{dx}\left[\int_a^x f(t) \, dt\right] = f(x)$
- The derivative of an accumulation function is the integrand
- With chain rule: $\frac{d}{dx}\left[\int_a^{g(x)} f(t) \, dt\right] = f(g(x)) \cdot g'(x)$

**Fundamental Theorem, Part 2 (Evaluation Theorem):**

- $\int_a^b f(x) \, dx = F(b) - F(a)$ where $F$ is any antiderivative of $f$
- Converts area problems to antiderivative evaluation
- The definite integral equals the net change in the antiderivative

**Net Change Theorem:**

- $\int_a^b F'(x) \, dx = F(b) - F(a)$
- The integral of a rate gives the total change

!!! quote "Delta Moment"
    "The Fundamental Theorem is where everything clicks. My tilt (derivative) and my travel journal (integral) aren't just related—they're inverse operations! Knowing one tells you about the other. This is the heart of calculus, and now you've got it too."

??? question "Check Your Understanding: Evaluate $\int_0^3 (4x - x^2) \, dx$"
    Antiderivative: $F(x) = 2x^2 - \frac{x^3}{3}$

    Evaluate: $[2x^2 - \frac{x^3}{3}]_0^3 = (18 - 9) - (0 - 0) = 9$

    **Answer: 9**

??? question "Check Your Understanding: Find $\frac{d}{dx}\left[\int_1^{x^2} \cos(t^3) \, dt\right]$"
    Use FTC Part 1 with chain rule.

    Let $g(x) = x^2$, so $g'(x) = 2x$.

    $\frac{d}{dx}\left[\int_1^{x^2} \cos(t^3) \, dt\right] = \cos((x^2)^3) \cdot 2x = 2x\cos(x^6)$

    **Answer: $2x\cos(x^6)$**

??? question "Check Your Understanding: The rate of water leaking from a tank is $r(t) = 10 - 0.5t$ gallons/min. How much water leaks out in the first 10 minutes?"
    Total leaked = $\int_0^{10} (10 - 0.5t) \, dt = [10t - 0.25t^2]_0^{10}$

    $= (100 - 25) - 0 = 75$ gallons

    **Answer: 75 gallons**

[See Annotated References](./references.md)
