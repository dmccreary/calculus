---
title: Curve Sketching
description: Learn systematic curve sketching using derivative analysis, connecting f, f-prime, and f-double-prime to create accurate function graphs
generated_by: claude skill chapter-content-generator
date: 2026-02-03 06:49:00
version: 0.03
---

# Curve Sketching

## Summary

This chapter synthesizes all derivative information to create complete curve sketches. Students will learn a systematic approach to analyzing functions that includes domain, intercepts, symmetry, asymptotes, intervals of increase/decrease, local extrema, concavity, and inflection points. The chapter emphasizes the connections between f, f', and f'' graphs and how to determine one from another. After completing this chapter, students will be able to sketch accurate graphs of functions using calculus techniques and analyze given graphs to extract derivative information.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

1. Curve Sketching
2. Complete Curve Analysis
3. f f Prime f Dbl Prime
4. Graph from Derivative
5. Derivative from Graph
6. Connecting Three Graphs
7. Domain Analysis
8. Intercept Analysis
9. Symmetry Analysis
10. Asymptote Analysis
11. Increasing Decreasing
12. Local Extrema Analysis
13. Concavity Analysis
14. Inflection Analysis

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Asymptotes and End Behavior](../05-asymptotes-and-end-behavior/index.md)
- [Chapter 16: Mean Value Theorem and Extrema](../16-mean-value-theorem-and-extrema/index.md)
- [Chapter 17: Derivative Tests and Concavity](../17-derivative-tests-and-concavity/index.md)

---

## Introduction: Seeing the Whole Picture

You've spent the last several chapters learning powerful individual tools: finding where functions increase and decrease, locating critical points, testing for local extrema, analyzing concavity, and identifying inflection points. Now it's time to combine all these skills into a unified process that lets you sketch the graph of almost any function—without relying on a graphing calculator.

Think of it like this: each derivative tool is an instrument in an orchestra. Playing them one at a time gives you isolated sounds, but playing them together creates a symphony. Curve sketching is your chance to conduct the whole orchestra.

!!! quote "Delta Moment"
    "I've been exploring curves piece by piece—checking my tilt here, my acceleration there. But now? Now I get to see the ENTIRE landscape before I even set foot on it. It's like having a map of every hill, valley, and flat spot before the adventure begins!"

This chapter teaches you a systematic checklist that professional mathematicians use. By following these steps, you'll be able to take any function and reveal its complete shape: where it lives, where it crosses axes, whether it's symmetric, where it shoots off to infinity, where it rises and falls, where it peaks and dips, and where it changes its curvature.

---

## The Complete Curve Analysis Checklist

Before we dive into each step, here's the master checklist you'll use for curve sketching. This isn't just a random list—it's arranged in a logical order where each step builds on the previous ones.

| Step | What to Find | Key Questions |
|------|--------------|---------------|
| 1 | Domain | Where does the function exist? |
| 2 | Intercepts | Where does it cross the axes? |
| 3 | Symmetry | Is there a pattern we can exploit? |
| 4 | Asymptotes | Where does it blow up or level off? |
| 5 | First Derivative | Where is it increasing or decreasing? |
| 6 | Critical Points | Where might extrema occur? |
| 7 | Local Extrema | Which critical points are peaks or valleys? |
| 8 | Second Derivative | Where is it concave up or down? |
| 9 | Inflection Points | Where does concavity change? |
| 10 | Plot Key Points | Put it all together on a graph! |

Let's explore each step in detail.

---

## Step 1: Domain Analysis

Every curve analysis starts with the same question: where does this function actually exist?

The **domain** is the set of all x-values for which the function is defined. Some functions live everywhere on the number line, while others have gaps, holes, or forbidden zones.

### Common Domain Restrictions

Here are the usual suspects that limit a function's domain:

- **Division by zero**: If the denominator equals zero, the function doesn't exist there
- **Square roots of negatives**: Can't take the square root of a negative number (in real numbers)
- **Logarithms of non-positives**: Can't take $\ln(x)$ when $x \leq 0$
- **Even roots of negatives**: Fourth roots, sixth roots, etc. have the same restriction as square roots

### Example: Finding Domain

Consider the function:

$f(x) = \frac{\sqrt{x+2}}{x-1}$

To find the domain, we need two conditions:

1. Inside the square root must be non-negative: $x + 2 \geq 0$, so $x \geq -2$
2. Denominator can't be zero: $x - 1 \neq 0$, so $x \neq 1$

Combining these: **Domain: $[-2, 1) \cup (1, \infty)$**

!!! tip "Pro Tip"
    Always find the domain first! There's no point analyzing what happens at $x = 5$ if your function doesn't exist there.

---

## Step 2: Intercept Analysis

Once you know where the function lives, the next step is finding where it crosses the coordinate axes.

### Y-Intercept

The **y-intercept** is where the graph crosses the vertical axis. This happens when $x = 0$.

To find it: calculate $f(0)$ (if 0 is in the domain).

### X-Intercepts

The **x-intercepts** (also called **zeros** or **roots**) are where the graph crosses the horizontal axis. These occur where $f(x) = 0$.

To find them: set the function equal to zero and solve for $x$.

### Example: Finding Intercepts

For $f(x) = x^3 - 4x$:

**Y-intercept**: $f(0) = 0^3 - 4(0) = 0$
The graph passes through the origin $(0, 0)$.

**X-intercepts**: Set $x^3 - 4x = 0$
Factor: $x(x^2 - 4) = 0$
Factor more: $x(x-2)(x+2) = 0$
Solutions: $x = -2, 0, 2$

The graph crosses the x-axis at $(-2, 0)$, $(0, 0)$, and $(2, 0)$.

---

## Step 3: Symmetry Analysis

Checking for symmetry can cut your work in half—literally. If a function has symmetry, you only need to analyze half of it, then mirror the rest.

### Types of Symmetry

| Type | Test | What It Means |
|------|------|---------------|
| Even function | $f(-x) = f(x)$ | Symmetric about the y-axis |
| Odd function | $f(-x) = -f(x)$ | Symmetric about the origin |

### Testing for Symmetry

To test: replace every $x$ with $-x$ and simplify.

- If you get the original function back, it's **even**
- If you get the negative of the original, it's **odd**
- If neither, there's **no symmetry**

### Example: Symmetry Test

Test $f(x) = x^3 - 4x$ for symmetry:

$f(-x) = (-x)^3 - 4(-x) = -x^3 + 4x = -(x^3 - 4x) = -f(x)$

Since $f(-x) = -f(x)$, this function is **odd** (origin symmetry).

!!! quote "Delta Thinks Out Loud"
    "If I know the curve is symmetric about the origin, then whatever I see on the right side, I'll see rotated 180 degrees on the left. That's half the exploration done for free!"

---

## Step 4: Asymptote Analysis

Asymptotes are invisible boundary lines that the graph approaches but never quite reaches. They tell us about the function's behavior at extreme values and near undefined points.

### Types of Asymptotes

**Vertical Asymptotes** occur where the function heads toward $\pm\infty$. These typically happen where the denominator equals zero (but the numerator doesn't).

**Horizontal Asymptotes** describe the function's end behavior—what happens as $x \to \pm\infty$.

**Oblique (Slant) Asymptotes** occur when the function approaches a diagonal line as $x \to \pm\infty$ (common when the degree of the numerator is exactly one more than the denominator).

### Finding Vertical Asymptotes

For rational functions $f(x) = \frac{p(x)}{q(x)}$:

1. Find where $q(x) = 0$
2. Check that $p(x) \neq 0$ at those points
3. Those x-values give vertical asymptotes

### Finding Horizontal Asymptotes

Compare the degrees of numerator and denominator:

- **Degree of top < degree of bottom**: $y = 0$ is horizontal asymptote
- **Degrees equal**: $y = \frac{\text{leading coefficient of top}}{\text{leading coefficient of bottom}}$
- **Degree of top > degree of bottom**: No horizontal asymptote (check for oblique)

### Example: Asymptote Analysis

For $f(x) = \frac{2x^2 + 1}{x^2 - 4}$:

**Vertical**: Set denominator to zero: $x^2 - 4 = 0$, so $x = \pm 2$
Check numerator at these points: $2(4) + 1 = 9 \neq 0$
**Vertical asymptotes at $x = -2$ and $x = 2$**

**Horizontal**: Degrees are equal (both are 2), so:
$y = \frac{2}{1} = 2$
**Horizontal asymptote at $y = 2$**

#### Diagram: Asymptote Behavior Visualization

<iframe src="../../sims/asymptote-behavior/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Asymptote Behavior Visualization</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Interpret

Learning Objective: Students will interpret how functions behave near vertical asymptotes and as x approaches infinity, connecting the algebraic analysis to visual graph behavior.

Visual Elements:
- A coordinate plane with gridlines
- A rational function curve that demonstrates both vertical and horizontal asymptotes
- Dashed red lines showing vertical asymptotes
- Dashed blue line showing horizontal asymptote
- A moveable point (Delta character) that travels along the curve
- Text display showing current x and y values

Interactive Controls:
- Slider to move Delta along the curve from left to right
- Dropdown to select different example functions:
  - f(x) = 1/x (basic)
  - f(x) = (2x^2+1)/(x^2-4) (two vertical, one horizontal)
  - f(x) = (x^2-1)/(x-1) (hole, not asymptote)
- Button to toggle asymptote lines on/off

Behavior:
- As Delta approaches a vertical asymptote, y-value display shows increasingly large numbers
- Near horizontal asymptote regions, y-value stays close to asymptote value
- Color coding: curve turns redder near vertical asymptotes, bluer near horizontal asymptote

Instructional Rationale: Step-through exploration is appropriate because students need to see the concrete numerical values change as they approach asymptotes, connecting the abstract limit concept to observable behavior.

Data Visibility Requirements:
- Stage 1: Show function formula and asymptote equations
- Stage 2: As slider moves, show (x, f(x)) values updating
- Stage 3: Near asymptotes, display limit notation: "As x approaches 2, f(x) approaches infinity"

Implementation: p5.js with responsive canvas
</details>

---

## Step 5: Intervals of Increase and Decrease

Now we bring in the first derivative. Remember: the derivative tells us the slope of the function at every point.

### The Key Connection

#### First Derivative Sign Analysis

$f'(x) > 0 \Rightarrow f \text{ is increasing}$

$f'(x) < 0 \Rightarrow f \text{ is decreasing}$

$f'(x) = 0 \Rightarrow f \text{ has a horizontal tangent}$

### The Process

1. Find $f'(x)$
2. Find where $f'(x) = 0$ or undefined (these are critical points)
3. Create a sign chart: test $f'(x)$ in each interval between critical points
4. Determine increasing/decreasing intervals from the signs

### Example: First Derivative Analysis

For $f(x) = x^3 - 3x$:

**Step 1**: $f'(x) = 3x^2 - 3 = 3(x^2 - 1) = 3(x-1)(x+1)$

**Step 2**: Critical points where $f'(x) = 0$: $x = -1$ and $x = 1$

**Step 3**: Sign chart

| Interval | Test Point | $f'(x)$ Sign | Behavior |
|----------|------------|--------------|----------|
| $(-\infty, -1)$ | $x = -2$ | $3(3)(−1) = +$ | Increasing |
| $(-1, 1)$ | $x = 0$ | $3(-1)(1) = -$ | Decreasing |
| $(1, \infty)$ | $x = 2$ | $3(1)(3) = +$ | Increasing |

!!! quote "Delta Moment"
    "So from negative infinity to $x = -1$, I'm climbing uphill. Then from $-1$ to $1$, I'm rolling downhill. And after $x = 1$, I'm climbing again. The critical points are where I switch direction!"

---

## Step 6: Critical Points and Local Extrema Analysis

Critical points are where the action happens—they're the candidates for peaks and valleys.

### Definition of Critical Point

A **critical point** of $f$ occurs at $x = c$ if either:

- $f'(c) = 0$ (horizontal tangent), or
- $f'(c)$ does not exist (corner, cusp, or vertical tangent)

AND $f(c)$ exists (the point must be in the domain).

### From Critical Points to Local Extrema

Not every critical point is an extremum! To classify them, use:

**First Derivative Test**: Check sign changes of $f'$

- If $f'$ changes from $+$ to $-$: **local maximum**
- If $f'$ changes from $-$ to $+$: **local minimum**
- If $f'$ doesn't change sign: **neither** (inflection point with horizontal tangent)

**Second Derivative Test**: Check the value of $f''$

- If $f''(c) > 0$: **local minimum** (concave up)
- If $f''(c) < 0$: **local maximum** (concave down)
- If $f''(c) = 0$: **inconclusive** (use first derivative test)

### Example: Finding Local Extrema

Continuing with $f(x) = x^3 - 3x$:

Critical points: $x = -1$ and $x = 1$

Using the sign chart from Step 5:

- At $x = -1$: $f'$ changes from $+$ to $-$, so **local maximum** at $(-1, f(-1)) = (-1, 2)$
- At $x = 1$: $f'$ changes from $-$ to $+$, so **local minimum** at $(1, f(1)) = (1, -2)$

Let's verify with the second derivative test:

$f''(x) = 6x$

- $f''(-1) = -6 < 0$: confirms **local maximum**
- $f''(1) = 6 > 0$: confirms **local minimum**

#### Diagram: First and Second Derivative Tests Comparison

<iframe src="../../sims/derivative-tests-comparison/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>First and Second Derivative Tests Comparison</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Compare

Learning Objective: Students will compare the First Derivative Test and Second Derivative Test methods for classifying critical points, understanding when each is most efficient and what each reveals about the function.

Visual Elements:
- Top panel: Graph of f(x) with critical points marked
- Middle panel: Graph of f'(x) with zeros highlighted
- Bottom panel: Graph of f''(x) with values at critical points shown
- Critical points on f connected by vertical dashed lines to corresponding points on f' and f''
- Labels showing the classification result from each test

Interactive Controls:
- Function selector dropdown with options:
  - f(x) = x^3 - 3x (standard cubic)
  - f(x) = x^4 - 2x^2 (quartic with three critical points)
  - f(x) = x^3 (inflection at origin, tests inconclusive)
- Toggle buttons to show/hide each graph
- Step-through buttons: "Find f'", "Find critical points", "Apply 1st test", "Apply 2nd test"

Behavior:
- Each step highlights the relevant computation
- For 1st derivative test: animate sign changes with + and - symbols
- For 2nd derivative test: show f''(c) value and its sign
- Special case handling when second derivative test fails

Data Visibility Requirements:
- Stage 1: Show f(x) and f'(x) formulas
- Stage 2: Show critical points with coordinates
- Stage 3: Show sign chart for f' with explicit test point calculations
- Stage 4: Show f''(c) values and conclusions

Instructional Rationale: Side-by-side comparison with explicit step-through allows students to see both methods applied to the same function, developing judgment about when each is preferable.

Implementation: p5.js with three vertically stacked coordinate systems, responsive layout
</details>

---

## Step 7: Concavity Analysis

The second derivative tells us about the shape of the curve—whether it's curving upward like a bowl or downward like a dome.

### The Key Connection

#### Second Derivative and Concavity

$f''(x) > 0 \Rightarrow f \text{ is concave up (opens upward)}$

$f''(x) < 0 \Rightarrow f \text{ is concave down (opens downward)}$

### Visual Intuition

| Concavity | Shape | Delta's Experience |
|-----------|-------|-------------------|
| Concave up | U-shaped, bowl | "The climb is getting steeper!" |
| Concave down | ∩-shaped, dome | "The climb is easing up!" |

### The Process

1. Find $f''(x)$
2. Find where $f''(x) = 0$ or undefined (possible inflection points)
3. Create a sign chart for $f''(x)$
4. Determine concavity from the signs

### Example: Concavity Analysis

For $f(x) = x^3 - 3x$:

$f''(x) = 6x$

$f''(x) = 0$ when $x = 0$

Sign chart:

| Interval | Test Point | $f''(x)$ Sign | Concavity |
|----------|------------|---------------|-----------|
| $(-\infty, 0)$ | $x = -1$ | $-6 < 0$ | Concave down |
| $(0, \infty)$ | $x = 1$ | $6 > 0$ | Concave up |

!!! quote "Delta Thinks Out Loud"
    "Before $x = 0$, I'm on a curve that's bending downward—like going over a hill. After $x = 0$, the curve bends upward—like entering a valley. Something changes right at $x = 0$!"

---

## Step 8: Inflection Point Analysis

An **inflection point** is where the graph changes its concavity—from curving up to curving down, or vice versa.

### Finding Inflection Points

Candidates occur where $f''(x) = 0$ or $f''(x)$ is undefined.

But a candidate is only a true inflection point if $f''(x)$ **actually changes sign** there.

### The Vibe Shift

Delta calls inflection points "vibe shifts" because the feel of the curve changes:

- Before: bending one way
- After: bending the other way

### Example: Inflection Points

From our analysis of $f(x) = x^3 - 3x$:

- Candidate: $x = 0$ (where $f''(x) = 0$)
- Sign change check: $f''$ goes from negative to positive at $x = 0$
- **Inflection point at $(0, f(0)) = (0, 0)$**

This matches our earlier finding that concavity changes at $x = 0$.

---

## The Three Graphs: f, f', and f''

One of the most powerful skills in calculus is understanding how the graphs of a function and its derivatives are connected. This connection goes both ways—you can read properties of $f$ from its derivatives, and you can reconstruct derivative graphs from the original function.

### Connecting the Three Graphs

Here's the complete relationship table:

| Property of $f$ | What $f'$ tells us | What $f''$ tells us |
|-----------------|-------------------|---------------------|
| Increasing | $f' > 0$ | — |
| Decreasing | $f' < 0$ | — |
| Local max | $f' = 0$ and changes $+$ to $-$ | $f'' < 0$ at that point |
| Local min | $f' = 0$ and changes $-$ to $+$ | $f'' > 0$ at that point |
| Concave up | — | $f'' > 0$ |
| Concave down | — | $f'' < 0$ |
| Inflection point | — | $f'' = 0$ and changes sign |
| Steeper slope | — | $f' \text{ increasing}$, so $f'' > 0$ |

### Reading f from f'

When given the graph of $f'(x)$, you can determine properties of $f$:

- **Where $f'$ is above the x-axis**: $f$ is increasing
- **Where $f'$ is below the x-axis**: $f$ is decreasing
- **Where $f'$ crosses the x-axis from above to below**: $f$ has a local maximum
- **Where $f'$ crosses the x-axis from below to above**: $f$ has a local minimum
- **Where $f'$ has a local maximum**: $f$ has an inflection point (steepest uphill)
- **Where $f'$ has a local minimum**: $f$ has an inflection point (steepest downhill)

### Reading f' from f

When given the graph of $f(x)$, you can sketch $f'(x)$:

- **Where $f$ is climbing steeply upward**: $f'$ is positive and large
- **Where $f$ is climbing gently**: $f'$ is positive and small
- **Where $f$ is horizontal**: $f'$ is zero
- **Where $f$ is falling gently**: $f'$ is negative and small (in magnitude)
- **Where $f$ is falling steeply**: $f'$ is negative and large (in magnitude)

#### Diagram: Three Connected Graphs Explorer

<iframe src="../../sims/three-graphs-explorer/main.html" width="100%" height="600px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Three Connected Graphs Explorer</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students will examine the relationships between f, f', and f'' by interacting with all three graphs simultaneously, tracing how features on one graph correspond to features on the others.

Visual Elements:
- Three vertically stacked coordinate planes showing f, f', and f''
- Synchronized vertical cursor line that appears on all three graphs
- Highlighted regions showing:
  - Green shading where f is increasing (matching where f' > 0)
  - Red shading where f is decreasing (matching where f' < 0)
  - Blue dots at local extrema of f (matching zeros of f')
  - Purple dots at inflection points of f (matching zeros of f'' with sign change)
- Labels on each graph identifying key features

Interactive Controls:
- Draggable vertical line that moves across all three graphs simultaneously
- Function selector with pre-built examples:
  - Cubic: f(x) = x^3 - 3x
  - Quartic: f(x) = x^4 - 4x^2
  - Sine: f(x) = sin(x)
  - Rational: f(x) = x/(x^2+1)
- Checkboxes to toggle visibility of each graph
- "Highlight connections" button that animates the relationships

Behavior:
- Moving vertical cursor shows corresponding y-values on all three graphs
- Information panel displays: "At x = [value]: f = [val], f' = [val], f'' = [val]"
- When cursor is at a critical point, panel highlights "f' = 0, so f has horizontal tangent"
- When cursor is at inflection point, panel highlights "f'' = 0 and changes sign"

Data Visibility Requirements:
- Stage 1: Display all three functions algebraically
- Stage 2: Show the specific numerical values at cursor position
- Stage 3: Display verbal interpretation of the relationship

Instructional Rationale: Synchronized exploration with a moveable cursor allows students to trace cause-and-effect between the graphs, building intuition for how derivative information encodes function behavior.

Implementation: p5.js with three linked coordinate systems, responsive design
</details>

---

## Derivative from Graph

A common AP Calculus question gives you the graph of $f$ and asks you to sketch $f'$ or $f''$, or vice versa. Here's how to approach these problems systematically.

### Given f, Sketch f'

**Step-by-step process:**

1. **Identify horizontal tangents**: Mark x-values where $f$ is flat—these become zeros of $f'$
2. **Note increasing regions**: Where $f$ goes up, $f'$ is positive (above x-axis)
3. **Note decreasing regions**: Where $f$ goes down, $f'$ is negative (below x-axis)
4. **Assess steepness**: Steeper sections of $f$ mean larger magnitude values in $f'$
5. **Find inflection points**: Where the slope of $f$ is steepest (or least steep locally)—these become extrema of $f'$

### Given f', Sketch f

**Step-by-step process:**

1. **Identify zeros**: Where $f' = 0$, mark potential local extrema of $f$
2. **Check sign changes**:
   - $+$ to $-$: local maximum of $f$
   - $-$ to $+$: local minimum of $f$
3. **Positive regions**: Where $f' > 0$, draw $f$ increasing
4. **Negative regions**: Where $f' < 0$, draw $f$ decreasing
5. **Magnitude**: Larger values of $|f'|$ mean steeper sections of $f$

### Given f', Sketch f''

Since $f''$ is the derivative of $f'$, treat this like "Given f, sketch f'" but applied to the $f'$ graph:

- Where $f'$ is increasing: $f'' > 0$
- Where $f'$ is decreasing: $f'' < 0$
- Where $f'$ has extrema: $f'' = 0$

!!! example "Practice Problem Setup"
    Given: The graph of $f'(x)$ shows a parabola opening upward with vertex at $(2, -4)$ and x-intercepts at $x = 0$ and $x = 4$.

    **What can we conclude about $f$?**

    - Local max of $f$ at $x = 0$ (since $f'$ changes from $+$ to $-$)
    - Local min of $f$ at $x = 4$ (since $f'$ changes from $-$ to $+$)
    - $f$ is decreasing on $(0, 4)$
    - $f$ is increasing on $(-\infty, 0)$ and $(4, \infty)$
    - Inflection point of $f$ at $x = 2$ (since $f'$ has a minimum there)

---

## Complete Curve Sketching: A Full Example

Let's put everything together with a complete analysis of:

$f(x) = \frac{x^2}{x^2 - 1}$

### Step 1: Domain Analysis

The denominator $x^2 - 1 = (x-1)(x+1) = 0$ when $x = \pm 1$.

**Domain: $(-\infty, -1) \cup (-1, 1) \cup (1, \infty)$**

### Step 2: Intercept Analysis

**Y-intercept**: $f(0) = \frac{0}{-1} = 0$. Point: $(0, 0)$

**X-intercepts**: Set numerator to zero: $x^2 = 0$, so $x = 0$. Point: $(0, 0)$

The only intercept is the origin.

### Step 3: Symmetry Analysis

$f(-x) = \frac{(-x)^2}{(-x)^2 - 1} = \frac{x^2}{x^2 - 1} = f(x)$

Since $f(-x) = f(x)$, the function is **even** (y-axis symmetry).

### Step 4: Asymptote Analysis

**Vertical asymptotes**: At $x = -1$ and $x = 1$ (where denominator is zero, numerator isn't)

To determine behavior near asymptotes:

- As $x \to 1^+$: numerator $\to 1$, denominator $\to 0^+$, so $f(x) \to +\infty$
- As $x \to 1^-$: numerator $\to 1$, denominator $\to 0^-$, so $f(x) \to -\infty$

By symmetry, similar behavior at $x = -1$.

**Horizontal asymptote**: Degrees equal, so $y = \frac{1}{1} = 1$

As $x \to \pm\infty$: $f(x) \to 1$

### Step 5: First Derivative Analysis

Using the quotient rule:

$f'(x) = \frac{2x(x^2-1) - x^2(2x)}{(x^2-1)^2} = \frac{2x^3 - 2x - 2x^3}{(x^2-1)^2} = \frac{-2x}{(x^2-1)^2}$

Critical points: $f'(x) = 0$ when $-2x = 0$, so $x = 0$

Sign chart for $f'(x) = \frac{-2x}{(x^2-1)^2}$:

(Note: $(x^2-1)^2$ is always positive where defined)

| Interval | Sign of $-2x$ | $f'(x)$ Sign | Behavior |
|----------|---------------|--------------|----------|
| $(-\infty, -1)$ | $+$ | $+$ | Increasing |
| $(-1, 0)$ | $+$ | $+$ | Increasing |
| $(0, 1)$ | $-$ | $-$ | Decreasing |
| $(1, \infty)$ | $-$ | $-$ | Decreasing |

### Step 6: Local Extrema

At $x = 0$: $f'$ changes from $+$ to $-$

**Local maximum at $(0, 0)$**

### Step 7: Second Derivative and Concavity

$f'(x) = -2x(x^2-1)^{-2}$

Using the product and chain rules:

$f''(x) = -2(x^2-1)^{-2} + (-2x)(-2)(x^2-1)^{-3}(2x)$

$f''(x) = \frac{-2}{(x^2-1)^2} + \frac{8x^2}{(x^2-1)^3}$

$f''(x) = \frac{-2(x^2-1) + 8x^2}{(x^2-1)^3} = \frac{6x^2 + 2}{(x^2-1)^3}$

The numerator $6x^2 + 2 > 0$ always.

The sign of $f''$ depends on $(x^2-1)^3$:

| Interval | $(x^2-1)^3$ Sign | $f''(x)$ Sign | Concavity |
|----------|------------------|---------------|-----------|
| $(-\infty, -1)$ | $+$ | $+$ | Concave up |
| $(-1, 1)$ | $-$ | $-$ | Concave down |
| $(1, \infty)$ | $+$ | $+$ | Concave up |

### Step 8: Inflection Points

$f''(x)$ changes sign at $x = -1$ and $x = 1$, but these aren't in the domain!

**No inflection points** (the sign change happens at vertical asymptotes, not points on the curve)

### Step 9: Putting It All Together

Summary table:

| Feature | Value/Location |
|---------|---------------|
| Domain | $(-\infty, -1) \cup (-1, 1) \cup (1, \infty)$ |
| Intercepts | $(0, 0)$ only |
| Symmetry | Even (y-axis) |
| Vertical asymptotes | $x = -1$, $x = 1$ |
| Horizontal asymptote | $y = 1$ |
| Increasing | $(-\infty, -1) \cup (-1, 0)$ |
| Decreasing | $(0, 1) \cup (1, \infty)$ |
| Local maximum | $(0, 0)$ |
| Concave up | $(-\infty, -1) \cup (1, \infty)$ |
| Concave down | $(-1, 1)$ |
| Inflection points | None |

#### Diagram: Complete Curve Sketch MicroSim

<iframe src="../../sims/complete-curve-sketch/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Complete Curve Sketch MicroSim</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate

Learning Objective: Students will demonstrate the complete curve sketching process by building the graph step-by-step, adding each feature (intercepts, asymptotes, extrema, concavity) one at a time to see how the pieces combine.

Visual Elements:
- Large coordinate plane showing the curve being built incrementally
- Checklist panel on the right showing completed and remaining steps
- Color-coded features:
  - Black: axes and basic curve
  - Red dashed: vertical asymptotes
  - Blue dashed: horizontal asymptote
  - Green dots: intercepts
  - Orange dot: local maximum
  - Purple shading: regions showing concavity

Interactive Controls:
- "Next Step" button that adds one feature at a time
- "Previous Step" button to go back
- "Show All" button to reveal complete graph
- "Start Over" button to reset
- Function selector dropdown to try different functions:
  - f(x) = x^2/(x^2-1) (current example)
  - f(x) = x^3/(x^2+1)
  - f(x) = (x-1)/(x^2-4)

Behavior:
- Step 1: Draw axes and mark domain restrictions
- Step 2: Plot intercepts with coordinates displayed
- Step 3: Draw vertical asymptotes with arrows showing direction
- Step 4: Draw horizontal asymptote
- Step 5: Add increasing/decreasing arrows on curve skeleton
- Step 6: Mark and label local extrema
- Step 7: Shade concavity regions
- Step 8: Connect all information into smooth curve

Data Visibility Requirements:
- Each step displays the mathematical reasoning
- Summary panel shows all gathered information
- Final step shows completed graph with all features labeled

Instructional Rationale: Building the graph incrementally helps students see curve sketching as a systematic process rather than an overwhelming all-at-once task. Each step reinforces the connection between algebraic analysis and graphical features.

Implementation: p5.js with step-based animation, responsive canvas
</details>

---

## Curve Sketching Strategies

### Tips for Efficiency

1. **Always check domain first**—it affects everything else
2. **Use symmetry to reduce work**—if even or odd, analyze one side and mirror
3. **Factor derivatives completely**—makes sign analysis much easier
4. **Create organized sign charts**—messy work leads to errors
5. **Verify with key points**—plug in a few strategic x-values to confirm

### Common Mistakes to Avoid

- Forgetting to check that critical points are actually in the domain
- Confusing where $f'$ is zero versus where $f'$ changes sign
- Assuming inflection points must be where $f'' = 0$ (they need sign change too!)
- Forgetting that vertical asymptotes aren't inflection points
- Drawing the curve without considering asymptotic behavior

!!! warning "Watch Out!"
    Just because $f''(c) = 0$ doesn't automatically mean there's an inflection point at $x = c$. You must verify that $f''$ actually changes sign there!

---

## Connecting f, f', and f'' Visually

Understanding the relationships between a function and its derivatives is crucial for the AP exam. Let's explore the key visual connections.

### From f to f': The Slope Reader

When you look at the graph of $f$:

- **Steep uphill** $\rightarrow$ **Large positive value** in $f'$
- **Gentle uphill** $\rightarrow$ **Small positive value** in $f'$
- **Flat (horizontal)** $\rightarrow$ **Zero** in $f'$
- **Gentle downhill** $\rightarrow$ **Small negative value** in $f'$
- **Steep downhill** $\rightarrow$ **Large negative value** in $f'$

### From f' to f'': The Slope of the Slope

The same relationship applies from $f'$ to $f''$:

- Where $f'$ is increasing: $f'' > 0$
- Where $f'$ is decreasing: $f'' < 0$
- Where $f'$ is horizontal: $f'' = 0$

### The Chain of Implications

Here's how information flows between the three graphs:

```
f'' > 0  →  f' increasing  →  f concave up
f'' < 0  →  f' decreasing  →  f concave down
f'' = 0 (sign change)  →  f' has extremum  →  f has inflection point
f' > 0  →  f increasing
f' < 0  →  f decreasing
f' = 0 (sign change)  →  f has local extremum
```

#### Diagram: Information Flow Chart

<iframe src="../../sims/derivative-info-flow/main.html" width="100%" height="400px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Derivative Information Flow Chart</summary>
Type: infographic

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will explain how information about function behavior flows from f'' to f' to f, understanding the chain of logical implications.

Visual Elements:
- Three connected boxes representing f, f', and f''
- Arrows showing information flow between boxes
- Each box contains a list of properties
- Hover-activated tooltips showing the logical connection
- Color-coded paths:
  - Green path: positive values chain
  - Red path: negative values chain
  - Blue path: zero crossings chain

Interactive Elements:
- Click on any property to highlight its implications on other graphs
- Hover over arrows to see the verbal explanation
- "Trace Example" button that walks through a specific scenario

Content in boxes:
Box f'':
- f'' > 0
- f'' < 0
- f'' = 0 (with sign change)

Box f':
- f' increasing
- f' decreasing
- f' has extremum
- f' > 0
- f' < 0
- f' = 0 (with sign change)

Box f:
- f concave up
- f concave down
- f has inflection point
- f increasing
- f decreasing
- f has local extremum

Connection Labels:
- "f'' is the derivative of f'" on arrow from f'' to f'
- "f' is the derivative of f" on arrow from f' to f

Implementation: HTML/CSS/JavaScript with SVG diagram
</details>

---

## Practice: Reading Derivative Graphs

One of the most important AP skills is extracting information from derivative graphs. Let's practice the systematic approach.

### Given the Graph of f'

Suppose you're shown that $f'(x)$ has:

- Zeros at $x = -2, 0, 3$
- $f'(x) > 0$ on $(-\infty, -2)$ and $(0, 3)$
- $f'(x) < 0$ on $(-2, 0)$ and $(3, \infty)$

**What can you conclude about $f$?**

Analysis:

| At/On | $f'$ Behavior | $f$ Behavior |
|-------|--------------|--------------|
| $(-\infty, -2)$ | $f' > 0$ | $f$ increasing |
| $x = -2$ | $f' = 0$, changes $+$ to $-$ | Local maximum |
| $(-2, 0)$ | $f' < 0$ | $f$ decreasing |
| $x = 0$ | $f' = 0$, changes $-$ to $+$ | Local minimum |
| $(0, 3)$ | $f' > 0$ | $f$ increasing |
| $x = 3$ | $f' = 0$, changes $+$ to $-$ | Local maximum |
| $(3, \infty)$ | $f' < 0$ | $f$ decreasing |

!!! quote "Delta Moment"
    "I love this game! You show me a graph of speeds, and I can tell you exactly where I'd be climbing, where I'd be descending, and where I'd reach peaks and valleys. It's like reading a trail map!"

---

## Sketching from Limited Information

Sometimes you don't have a formula—you only have information about derivatives. Can you still sketch the function?

### Example: Sketch f Given Only Derivative Information

**Given:**

- $f(0) = 2$
- $f'(x) > 0$ for $x < 1$
- $f'(x) < 0$ for $x > 1$
- $f'(1) = 0$
- $f''(x) < 0$ for all $x$

**Sketch $f$:**

From this information:

1. Start at the point $(0, 2)$
2. The function increases until $x = 1$ (since $f' > 0$ for $x < 1$)
3. The function decreases after $x = 1$ (since $f' < 0$ for $x > 1$)
4. At $x = 1$, there's a local maximum (horizontal tangent, changes from increasing to decreasing)
5. The entire curve is concave down (since $f'' < 0$ everywhere)

This describes a smooth hill with its peak at $x = 1$, always curving downward like an upside-down bowl.

#### Diagram: Sketch from Derivative Info MicroSim

<iframe src="../../sims/sketch-from-info/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Sketch from Derivative Info MicroSim</summary>
Type: microsim

Bloom Level: Create (L6)
Bloom Verb: Construct

Learning Objective: Students will construct function graphs given only derivative information, developing the ability to translate algebraic conditions into visual representations.

Visual Elements:
- Drawing canvas where students sketch their predicted curve
- Information panel listing the given conditions
- Reference axes with grid
- After submission: overlay of correct curve for comparison
- Feedback panel indicating which conditions are satisfied

Interactive Controls:
- Drawing tool to sketch the curve (click and drag)
- "Clear" button to restart
- "Check My Sketch" button to compare against correct answer
- "Hint" button that draws one feature (a point, a tangent line, etc.)
- "New Problem" button for different scenarios

Problem Sets (randomly selected):
1. Starting point, increasing/decreasing intervals, one extremum, concavity
2. Two extrema with concavity change
3. Asymptotic behavior with extremum
4. Inflection point with no extrema

Behavior:
- Drawing tool creates smooth curves from mouse input
- Checking evaluates: Does curve pass through given points? Is it increasing/decreasing in right intervals? Is concavity correct?
- Feedback highlights which conditions passed/failed
- Correct overlay shows one possible valid solution

Instructional Rationale: Having students construct graphs from derivative information reverses the typical "given function, find derivative" direction, building deeper understanding of the relationships.

Implementation: p5.js with drawing functionality and curve comparison algorithm
</details>

---

## Key Takeaways

Let's summarize the essential ideas from this chapter.

### The Complete Curve Analysis Framework

1. **Domain**: Where does $f$ exist?
2. **Intercepts**: Where does $f$ cross the axes?
3. **Symmetry**: Can we exploit even/odd properties?
4. **Asymptotes**: What happens at boundaries and extremes?
5. **First Derivative**: Increasing/decreasing intervals
6. **Critical Points**: Candidates for extrema
7. **Second Derivative**: Concavity
8. **Inflection Points**: Where concavity changes
9. **Assemble**: Combine all information into an accurate sketch

### The Three-Graph Connection

| Looking at... | You can determine... |
|---------------|---------------------|
| $f$ | Where $f'$ is positive/negative/zero; where $f''$ is positive/negative |
| $f'$ | Where $f$ is increasing/decreasing; where $f$ has extrema; where $f''$ is positive/negative |
| $f''$ | Where $f$ is concave up/down; where $f$ has inflection points; where $f'$ is increasing/decreasing |

### Critical Vocabulary

- **Critical point**: Where $f' = 0$ or $f'$ DNE (and $f$ exists)
- **Local extremum**: A peak or valley; requires sign change in $f'$
- **Inflection point**: Where concavity changes; requires sign change in $f''$
- **Concave up**: $f'' > 0$; curve opens upward
- **Concave down**: $f'' < 0$; curve opens downward

!!! quote "Delta's Final Word"
    "Curve sketching is where everything clicks together. Domain tells me where I can go. Asymptotes warn me of cliffs. The first derivative shows me uphill versus downhill. The second derivative tells me if I'm working harder or easier. Critical points are my rest stops, and inflection points are my vibe shifts. Put it all together, and I've got a complete map of the entire journey before I take a single step!"

---

## Looking Ahead

Now that you can analyze and sketch curves completely, you're ready to apply these skills to solve real-world problems. In the next chapter, we'll tackle **optimization**—finding the absolute best solutions by combining curve analysis with practical constraints. Get ready to find maximum profit, minimum cost, and optimal dimensions!

