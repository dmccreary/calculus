---
title: Mean Value Theorem and Extrema
description: Understanding the MVT, Rolle's Theorem, EVT, and critical points for finding extrema
generated_by: claude skill chapter-content-generator
date: 2026-02-03 16:51:00
version: 0.03
---

# Mean Value Theorem and Extrema

## Summary

This chapter introduces fundamental theorems connecting derivatives to function behavior. Students will learn the Mean Value Theorem and its special case, Rolle's Theorem, understanding the conditions required and their geometric interpretations. The Extreme Value Theorem guarantees extrema on closed intervals, and students will learn to distinguish between global and local extrema. The chapter also introduces critical points where derivatives equal zero or don't exist. After completing this chapter, students will understand the theoretical foundation for finding maximum and minimum values.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

1. Mean Value Theorem
2. MVT Statement
3. MVT Conditions
4. MVT Conclusion
5. Rolle's Theorem
6. Rolle's Conditions
7. MVT Applications
8. Average vs Instant MVT
9. Extreme Value Theorem
10. EVT Statement
11. EVT Conditions
12. Global Maximum
13. Global Minimum
14. Local Maximum
15. Local Minimum
16. Critical Point
17. Critical Number

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Continuity](../04-continuity/index.md)
- [Chapter 7: Differentiability](../07-differentiability/index.md)
- [Chapter 8: Basic Derivative Rules](../08-basic-derivative-rules/index.md)

---

## Introduction: Connecting Average and Instantaneous

Here's a puzzle: if you drive 120 miles in exactly 2 hours, you know your average speed was 60 mph. But did you ever *actually* travel at exactly 60 mph during the trip? Common sense says yes—at some point, you must have been going exactly 60 mph. But can we prove it mathematically?

This is precisely what the Mean Value Theorem does. It guarantees that somewhere in your journey, your instantaneous speed matched your average speed. This seemingly simple observation turns out to be one of the most powerful tools in calculus.

!!! quote "Delta Moment"
    "Okay, so I rolled from point A to point B, and my average tilt was, say, 3 degrees. The Mean Value Theorem says that somewhere along the way, I was tilted at EXACTLY 3 degrees. Not approximately—exactly! That's wild."

In this chapter, we'll explore three foundational theorems that connect derivatives to function behavior:

- **Rolle's Theorem** — When a function starts and ends at the same height, it must have a horizontal tangent somewhere
- **Mean Value Theorem** — The average rate of change equals the instantaneous rate somewhere
- **Extreme Value Theorem** — Continuous functions on closed intervals always have maximum and minimum values

These theorems provide the theoretical foundation for everything that follows: finding extrema, optimization, and understanding what derivatives tell us about function behavior.

## Rolle's Theorem: The Foundation

Before tackling the Mean Value Theorem, let's start with a simpler version that captures the key insight.

Imagine throwing a ball straight up. It leaves your hand, rises, and returns to your hand at the same height. At the very top of its path, the ball has zero velocity—it's momentarily stationary. This is Rolle's Theorem in action.

### Statement of Rolle's Theorem

Let $f$ be a function that satisfies three conditions:

1. **Continuous on $[a, b]$** — No gaps or jumps in the closed interval
2. **Differentiable on $(a, b)$** — Smooth with a well-defined tangent at every interior point
3. **$f(a) = f(b)$** — The function starts and ends at the same value

Then there exists at least one number $c$ in the open interval $(a, b)$ such that:

$$f'(c) = 0$$

In other words, the function has at least one horizontal tangent line between $a$ and $b$.

### Understanding Rolle's Conditions

Each condition in Rolle's Theorem is essential. Let's see why:

| Condition | What It Ensures | What Happens If Violated |
|-----------|-----------------|-------------------------|
| Continuous on $[a, b]$ | No gaps in the graph | Function could jump over where $f'(c) = 0$ would occur |
| Differentiable on $(a, b)$ | Smooth curve throughout | Could have a corner at the max/min instead of horizontal tangent |
| $f(a) = f(b)$ | Starts and ends at same height | Function might not need to "turn around" |

!!! warning "Sharp Corners Don't Count"
    The function $f(x) = |x|$ on $[-1, 1]$ satisfies $f(-1) = f(1) = 1$ and is continuous, but it's not differentiable at $x = 0$. The highest point is at $x = 0$, but there's no horizontal tangent—just a sharp corner. This is why differentiability matters.

### Geometric Interpretation

Think of Rolle's Theorem this way: if you start at some height, wander around, and return to exactly the same height, you must have turned around somewhere. At that turning point, you were momentarily horizontal.

#### Diagram: Rolle's Theorem Visualizer

<iframe src="../../sims/rolles-theorem/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Rolle's Theorem Visualizer MicroSim</summary>
Type: microsim

Purpose: Allow students to explore Rolle's Theorem by manipulating functions that satisfy its conditions and seeing where the horizontal tangent occurs.

Learning Objective: Students will explain the geometric meaning of Rolle's Theorem and verify its conditions (Bloom Level 2: Understand)

Bloom Taxonomy Verb: explain, interpret, verify

Visual elements:

- Coordinate plane with a smooth curve
- Two endpoints marked with dots at $(a, f(a))$ and $(b, f(b))$
- Horizontal dashed line connecting the equal endpoints
- The point $c$ where $f'(c) = 0$ marked with a special marker
- Tangent line at $c$ shown horizontally
- Text display showing f(a), f(b), and f'(c)

Interactive controls:

- Dropdown to select function: parabola, sine wave, cubic polynomial
- Sliders to adjust the interval endpoints $a$ and $b$
- Slider to morph the function while maintaining $f(a) = f(b)$
- Toggle: Show/hide the tangent line at c
- Button: "Find all critical points" to show multiple solutions when they exist

Data Visibility Requirements:

- Stage 1: Show the function with endpoints highlighted
- Stage 2: Display f(a) and f(b) values to verify equality
- Stage 3: Animate search for where tangent is horizontal
- Stage 4: Mark point c and show f'(c) = 0
- Final: Display complete verification of all three conditions

Behavior:

- When f(a) ≠ f(b), display message "Rolle's conditions not satisfied"
- Animate the tangent line sliding along the curve to find horizontal positions
- When multiple critical points exist, highlight all of them
- Show verification checklist: Continuous ✓, Differentiable ✓, f(a)=f(b) ✓

Instructional Rationale: Direct visualization of the theorem in action helps students understand why each condition matters. Seeing the tangent line become horizontal builds geometric intuition.

Implementation: p5.js with smooth animations
</details>

### Example: Applying Rolle's Theorem

**Example:** Show that $f(x) = x^3 - 3x$ has a horizontal tangent somewhere in the interval $[-\sqrt{3}, \sqrt{3}]$.

**Solution:** Let's verify the three conditions:

1. **Continuous?** Yes—$f(x) = x^3 - 3x$ is a polynomial, continuous everywhere
2. **Differentiable?** Yes—polynomials are differentiable everywhere
3. **$f(a) = f(b)$?** Check:
   - $f(-\sqrt{3}) = (-\sqrt{3})^3 - 3(-\sqrt{3}) = -3\sqrt{3} + 3\sqrt{3} = 0$
   - $f(\sqrt{3}) = (\sqrt{3})^3 - 3(\sqrt{3}) = 3\sqrt{3} - 3\sqrt{3} = 0$

All conditions satisfied! Rolle's Theorem guarantees at least one $c$ in $(-\sqrt{3}, \sqrt{3})$ where $f'(c) = 0$.

To find $c$: $f'(x) = 3x^2 - 3 = 3(x^2 - 1) = 3(x-1)(x+1)$

Setting $f'(c) = 0$: $c = -1$ or $c = 1$

Both values are in the interval $(-\sqrt{3}, \sqrt{3}) \approx (-1.73, 1.73)$, confirming Rolle's Theorem.

## The Mean Value Theorem

Now we're ready for the main event. The Mean Value Theorem (MVT) generalizes Rolle's Theorem to functions that don't necessarily start and end at the same height.

### Statement of the Mean Value Theorem

Let $f$ be a function that satisfies two conditions:

1. **Continuous on $[a, b]$** — The closed interval
2. **Differentiable on $(a, b)$** — The open interval

Then there exists at least one number $c$ in $(a, b)$ such that:

$$f'(c) = \frac{f(b) - f(a)}{b - a}$$

In words: the instantaneous rate of change at some point $c$ equals the average rate of change over the entire interval.

!!! tip "The Key Insight"
    The right side, $\frac{f(b) - f(a)}{b - a}$, is the slope of the **secant line** connecting $(a, f(a))$ to $(b, f(b))$. The MVT says somewhere between $a$ and $b$, the tangent line is parallel to this secant line.

### Average vs. Instantaneous: The Core Connection

The Mean Value Theorem bridges the gap between average and instantaneous rates:

| Concept | Formula | Interpretation |
|---------|---------|----------------|
| Average rate of change | $\frac{f(b) - f(a)}{b - a}$ | Overall slope from start to finish |
| Instantaneous rate at $c$ | $f'(c)$ | Slope of tangent line at point $c$ |
| MVT says | These are equal for some $c$ | The tangent somewhere is parallel to the secant |

!!! quote "Delta Moment"
    "If my average tilt over the whole journey was 2 (rising 2 units per horizontal unit), then at some moment during the trip, my instantaneous tilt was exactly 2. Not close to 2—EXACTLY 2. The math demands it!"

### Geometric Picture

Imagine a function's graph between $x = a$ and $x = b$. Draw the secant line connecting the endpoints. The MVT guarantees that somewhere in between, you can draw a tangent line that's perfectly parallel to that secant.

#### Diagram: Mean Value Theorem Explorer

<iframe src="../../sims/mvt-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Mean Value Theorem Explorer MicroSim</summary>
Type: microsim

Purpose: Visualize the Mean Value Theorem by showing the secant line and finding parallel tangent lines.

Learning Objective: Students will apply the MVT to find values of c where the tangent line is parallel to the secant line (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, calculate, demonstrate

Visual elements:

- Coordinate plane with a smooth curve
- Endpoints $(a, f(a))$ and $(b, f(b))$ marked clearly
- Secant line connecting the endpoints (dashed, in blue)
- Point $c$ that can be dragged along the curve
- Tangent line at the current position of c (solid, in orange)
- Display showing: slope of secant, slope of tangent at c, difference between slopes
- Indicator that lights up when tangent is parallel to secant

Interactive controls:

- Dropdown to select function: quadratic, cubic, sine, square root
- Sliders to adjust interval endpoints a and b
- Draggable point c on the curve
- Button: "Auto-find c" to snap to where MVT is satisfied
- Toggle: Show/hide both lines simultaneously

Data Visibility Requirements:

- Stage 1: Show function with endpoints marked
- Stage 2: Draw secant line and display its slope
- Stage 3: As user drags c, show tangent line and its slope
- Stage 4: Calculate difference |secant slope - tangent slope|
- Final: When difference ≈ 0, highlight that MVT is satisfied

Behavior:

- Real-time calculation of both slopes as user interacts
- Color change when tangent becomes parallel to secant
- "Auto-find" animates c sliding to correct position
- Multiple c values highlighted when function has them

Instructional Rationale: Active manipulation helps students discover the MVT relationship. Seeing numerical slopes converge to equality reinforces the algebraic statement.

Implementation: p5.js with draggable points
</details>

### Why is the MVT True?

Here's an intuitive argument: Take the secant line and imagine "sliding" it down (keeping it parallel) until it just touches the curve. At that point of tangency, the tangent line equals the secant line's slope.

More formally, consider the function:

$$g(x) = f(x) - \left[\frac{f(b) - f(a)}{b - a}\right](x - a) - f(a)$$

This function measures the vertical distance from $f(x)$ to the secant line. You can verify that $g(a) = g(b) = 0$, so Rolle's Theorem applies! There exists $c$ where $g'(c) = 0$, which gives us exactly the MVT conclusion.

### Example: Applying the Mean Value Theorem

**Example:** For $f(x) = x^2$ on the interval $[1, 3]$, find a value $c$ guaranteed by the MVT.

**Solution:**

Step 1: Verify conditions

- Continuous on $[1, 3]$? Yes (polynomial)
- Differentiable on $(1, 3)$? Yes (polynomial)

Step 2: Calculate the average rate of change

$$\frac{f(3) - f(1)}{3 - 1} = \frac{9 - 1}{2} = \frac{8}{2} = 4$$

Step 3: Find $c$ where $f'(c) = 4$

$$f'(x) = 2x$$
$$f'(c) = 2c = 4$$
$$c = 2$$

Since $c = 2$ is in the interval $(1, 3)$, we've verified the MVT. At $x = 2$, the tangent line has slope 4, matching the secant line's slope.

### MVT Applications

The Mean Value Theorem isn't just an abstract result—it has practical applications.

**Application 1: Speed Traps**

If you enter a highway toll section at 2:00 PM and exit 60 miles later at 2:45 PM, your average speed was:

$$\text{Average speed} = \frac{60 \text{ miles}}{0.75 \text{ hours}} = 80 \text{ mph}$$

The MVT guarantees that at some instant during your trip, you were traveling exactly 80 mph. If the speed limit is 65 mph, a ticket could theoretically be justified without ever clocking you directly!

!!! quote "Delta's Sidequest"
    "Wait, so if I roll from one point to another, even if I speed up and slow down, there's ALWAYS a moment where my instantaneous speed matches my average? This explains those highway cameras at toll booths..."

**Application 2: Proving Function Bounds**

The MVT can prove inequalities. For example, to show that $\sin(x) \leq x$ for all $x \geq 0$:

Consider $f(x) = \sin(x)$ on $[0, x]$ where $x > 0$. The MVT gives us:

$$\frac{\sin(x) - \sin(0)}{x - 0} = \cos(c) \text{ for some } c \in (0, x)$$

Since $\cos(c) \leq 1$ for all $c$, we have:

$$\frac{\sin(x)}{x} \leq 1 \implies \sin(x) \leq x$$

**Application 3: Showing Functions Are Constant**

If $f'(x) = 0$ for all $x$ in an interval, then $f$ must be constant on that interval.

Proof: For any two points $a$ and $b$ in the interval, the MVT says:

$$\frac{f(b) - f(a)}{b - a} = f'(c) = 0$$

So $f(b) - f(a) = 0$, meaning $f(b) = f(a)$ for all choices of $a$ and $b$. The function is constant!

## The Extreme Value Theorem

Now we shift focus to finding maximum and minimum values. The Extreme Value Theorem tells us when we're guaranteed to find them.

### Understanding Extrema

First, let's clarify terminology:

**Global (Absolute) Maximum:** The largest value a function achieves over its entire domain (or a specified interval). If $f(c) \geq f(x)$ for all $x$ in the domain, then $f(c)$ is the global maximum.

**Global (Absolute) Minimum:** The smallest value a function achieves. If $f(c) \leq f(x)$ for all $x$ in the domain, then $f(c)$ is the global minimum.

**Local (Relative) Maximum:** A value that's largest compared to nearby points. $f(c)$ is a local maximum if $f(c) \geq f(x)$ for all $x$ near $c$.

**Local (Relative) Minimum:** A value that's smallest compared to nearby points.

| Type | Comparison | Example |
|------|------------|---------|
| Global Maximum | Highest point overall | The summit of Mount Everest |
| Local Maximum | Highest in neighborhood | The top of a small hill |
| Global Minimum | Lowest point overall | The bottom of the ocean |
| Local Minimum | Lowest in neighborhood | A valley between two hills |

!!! quote "Delta Moment"
    "Standing on a local maximum is like being on top of a hill—I'm higher than everything nearby. But a global maximum? That's THE highest point anywhere. I might be on a local peak, looking enviously at a taller mountain in the distance."

#### Diagram: Global vs Local Extrema Visualizer

<iframe src="../../sims/extrema-types/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Global vs Local Extrema Visualizer MicroSim</summary>
Type: microsim

Purpose: Help students distinguish between global and local maxima/minima on a function graph.

Learning Objective: Students will classify extrema as global or local and understand the difference (Bloom Level 4: Analyze)

Bloom Taxonomy Verb: classify, distinguish, compare

Visual elements:

- Coordinate plane with a wavy curve having multiple peaks and valleys
- Different colored markers for each type of extremum:
  - Global maximum: Gold star
  - Local maximum: Orange circle
  - Global minimum: Blue star
  - Local minimum: Light blue circle
- Dashed horizontal lines at global extrema heights
- Labels showing coordinates of each extremum
- Legend explaining the marker colors

Interactive controls:

- Dropdown: Select from preset functions with different extrema patterns
- Toggle: Show/hide global extrema markers
- Toggle: Show/hide local extrema markers
- Slider: Adjust the interval [a, b] being considered
- Button: "Quiz Mode" - hide markers and let student click where they think extrema are

Data Visibility Requirements:

- Stage 1: Show function curve with interval marked
- Stage 2: Identify all critical points
- Stage 3: Classify each as max or min based on sign change
- Stage 4: Determine which are global vs local
- Final: Complete labeling with all extrema marked

Behavior:

- Changing interval can change which points are global extrema
- Hover over any point to see its classification and value
- Quiz mode provides feedback on student classifications
- Endpoints are highlighted when they're extrema

Instructional Rationale: Visual comparison helps students develop intuition for the global/local distinction. The ability to change intervals shows how context affects classification.

Implementation: p5.js with multiple labeled points
</details>

### Statement of the Extreme Value Theorem

The **Extreme Value Theorem (EVT)** states:

If $f$ is **continuous** on a **closed interval** $[a, b]$, then $f$ attains both a global maximum and a global minimum on that interval.

In other words: continuous functions on closed intervals always have highest and lowest points.

### EVT Conditions

Both conditions are essential:

1. **Continuity:** The function must be continuous on the entire closed interval—no holes, jumps, or asymptotes.

2. **Closed Interval:** Both endpoints must be included. Open intervals like $(a, b)$ don't guarantee extrema.

Let's see what goes wrong without these conditions:

| Condition Violated | Example | What Happens |
|-------------------|---------|--------------|
| Not continuous | $f(x) = \frac{1}{x}$ on $[-1, 1]$ | Vertical asymptote at $x = 0$; no finite max/min |
| Open interval | $f(x) = x$ on $(0, 1)$ | Values get arbitrarily close to 0 and 1, but never reach them |
| Half-open | $f(x) = x^2$ on $[0, 1)$ | Minimum at $x = 0$, but no maximum (approaches 1 but never gets there) |

!!! warning "Endpoints Matter!"
    The function $f(x) = x$ on the open interval $(0, 1)$ has no maximum or minimum—values approach 0 and 1 but never reach them. Change it to $[0, 1]$, and suddenly we have a minimum of 0 at $x = 0$ and a maximum of 1 at $x = 1$.

### Why the EVT Works (Intuitive Argument)

Picture a continuous function on a closed interval. The curve starts at $x = a$, ends at $x = b$, and has no breaks in between. As you trace along the curve, the height must achieve some highest value somewhere (either at an interior point or at an endpoint). Similarly for the lowest value.

The continuity ensures no "escapes"—the function can't jump over a potential extremum. The closed interval ensures we include the endpoints, which might themselves be extrema.

#### Diagram: EVT Conditions Explorer

<iframe src="../../sims/evt-conditions/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>EVT Conditions Explorer MicroSim</summary>
Type: microsim

Purpose: Show why both EVT conditions (continuity and closed interval) are necessary by demonstrating counterexamples.

Learning Objective: Students will evaluate whether EVT conditions are satisfied and predict consequences (Bloom Level 5: Evaluate)

Bloom Taxonomy Verb: evaluate, assess, judge

Visual elements:

- Coordinate plane with function graph
- Interval markers showing open/closed endpoints (parentheses vs brackets)
- Potential extrema highlighted when they exist
- Message area explaining why EVT does or doesn't apply
- Checklist showing: Continuous? ✓/✗, Closed interval? ✓/✗

Interactive controls:

- Dropdown: Select scenario (continuous on closed, discontinuous, open interval)
- Sliders to adjust interval endpoints
- Toggle: Open/closed at left endpoint
- Toggle: Open/closed at right endpoint
- Button: "Find extrema" to highlight where max/min would be

Data Visibility Requirements:

- Stage 1: Display function and interval type
- Stage 2: Check continuity condition
- Stage 3: Check closed interval condition
- Stage 4: Predict existence of extrema based on conditions
- Final: Show actual extrema (or explain why they don't exist)

Behavior:

- When both conditions met: clearly mark global max and min
- When continuity violated: show discontinuity and explain failure
- When interval not closed: show how extremum "escapes"
- Animate what happens as we approach missing endpoints

Instructional Rationale: Counterexamples are powerful learning tools. Seeing exactly how and why theorems fail builds deeper understanding of why conditions matter.

Implementation: p5.js with conditional rendering
</details>

## Critical Points: Where Extrema Occur

Now that we know extrema exist (thanks to the EVT), where do we look for them? The answer involves **critical points**.

### What is a Critical Point?

A **critical point** (or **critical number**) of a function $f$ is a value $c$ in the domain of $f$ where either:

1. $f'(c) = 0$ (horizontal tangent), or
2. $f'(c)$ does not exist (corner, cusp, or vertical tangent)

Critical points are the candidates for local extrema. Not every critical point is an extremum, but every interior extremum is a critical point!

!!! note "Critical Point Theorem"
    If $f$ has a local maximum or minimum at $c$, and $f'(c)$ exists, then $f'(c) = 0$.

    Contrapositive: If $f'(c) \neq 0$, then $c$ is not a local extremum.

### Why Critical Points Matter

Think about what happens at a local maximum: the function increases on the way up, then decreases on the way down. At the peak, it's neither increasing nor decreasing—the tangent is horizontal.

Similarly, at a local minimum, the function decreases and then increases. The tangent is horizontal at the bottom.

If the function has a corner or cusp at an extremum, the derivative doesn't exist there—but it's still a critical point by our definition.

| Critical Point Type | Derivative | Possible Extremum? |
|--------------------|------------|-------------------|
| $f'(c) = 0$ | Horizontal tangent | Maybe max, maybe min, maybe neither |
| $f'(c)$ DNE | Corner/cusp/vertical tangent | Maybe max, maybe min, maybe neither |

### Finding Critical Points

To find critical points:

1. Find $f'(x)$
2. Solve $f'(x) = 0$
3. Find where $f'(x)$ doesn't exist (but $f(x)$ does)

**Example:** Find the critical points of $f(x) = x^3 - 6x^2 + 9x + 1$.

**Solution:**

Step 1: Find the derivative
$$f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x - 1)(x - 3)$$

Step 2: Solve $f'(x) = 0$
$$3(x - 1)(x - 3) = 0$$
$$x = 1 \text{ or } x = 3$$

Step 3: Check where $f'(x)$ doesn't exist
$f'(x) = 3x^2 - 12x + 9$ is a polynomial, so it exists everywhere.

**Critical points: $x = 1$ and $x = 3$**

At $x = 1$: $f(1) = 1 - 6 + 9 + 1 = 5$
At $x = 3$: $f(3) = 27 - 54 + 27 + 1 = 1$

So the critical points are $(1, 5)$ and $(3, 1)$.

#### Diagram: Critical Point Finder

<iframe src="../../sims/critical-point-finder/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Critical Point Finder MicroSim</summary>
Type: microsim

Purpose: Help students identify critical points by finding where f'(x) = 0 or f'(x) doesn't exist.

Learning Objective: Students will solve for critical points algebraically and verify them graphically (Bloom Level 3: Apply)

Bloom Taxonomy Verb: solve, calculate, identify

Visual elements:

- Top panel: Graph of f(x)
- Bottom panel: Graph of f'(x)
- Critical points marked on both graphs with vertical dashed lines
- At each critical point: show whether f' = 0 or f' DNE
- Display the derivative formula and calculation
- Horizontal line at y = 0 on derivative graph

Interactive controls:

- Dropdown: Select function (polynomial, rational, absolute value, piecewise)
- Input field: Enter a custom polynomial
- Button: "Find Critical Points" to show step-by-step solution
- Toggle: Show/hide derivative graph
- Slider: Zoom in/out on x-axis

Data Visibility Requirements:

- Stage 1: Show original function
- Stage 2: Calculate and display derivative
- Stage 3: Show derivative graph
- Stage 4: Mark where derivative crosses zero
- Stage 5: Mark where derivative doesn't exist
- Final: List all critical points with coordinates

Behavior:

- Step-by-step solution appears one step at a time
- Critical points on f graph marked with dots
- Corresponding x-intercepts on f' graph highlighted
- For functions with corners, show DNE at those points

Instructional Rationale: Seeing the derivative graph alongside the original function reinforces that f'(x) = 0 corresponds to horizontal tangents on f(x). The algebraic work connects to the geometric picture.

Implementation: p5.js with dual graph display
</details>

### Example: Critical Points with DNE

**Example:** Find the critical points of $f(x) = x^{2/3}$.

**Solution:**

Step 1: Find the derivative
$$f'(x) = \frac{2}{3}x^{-1/3} = \frac{2}{3\sqrt[3]{x}}$$

Step 2: Solve $f'(x) = 0$
The numerator is always 2, never zero. So $f'(x) = 0$ has no solutions.

Step 3: Find where $f'(x)$ doesn't exist
When $x = 0$, the denominator is zero, so $f'(0)$ doesn't exist.

But is $x = 0$ in the domain of $f$? Yes—$f(0) = 0^{2/3} = 0$.

**Critical point: $x = 0$**

This function has a cusp at the origin. Even though the derivative doesn't exist there, it's still a critical point—and in fact, it's a local minimum.

## Putting It All Together: Finding Extrema

We now have the theoretical tools to find extrema on closed intervals. Here's the strategy:

### The Closed Interval Method (Candidates Test)

To find the global maximum and minimum of a continuous function $f$ on $[a, b]$:

1. Find all critical points of $f$ in the interval $(a, b)$
2. Evaluate $f$ at each critical point
3. Evaluate $f$ at the endpoints $a$ and $b$
4. Compare all values: the largest is the global maximum, the smallest is the global minimum

This method is sometimes called the **Candidates Test** because we're testing all the "candidates" for extrema.

!!! tip "Why This Works"
    By the EVT, a global max and min exist. By the Critical Point Theorem, interior extrema can only occur at critical points. The only other possibilities are the endpoints. So we just check everything and pick the winner!

**Example:** Find the global extrema of $f(x) = x^3 - 3x + 2$ on $[-2, 2]$.

**Solution:**

Step 1: Find critical points
$$f'(x) = 3x^2 - 3 = 3(x^2 - 1) = 3(x-1)(x+1)$$
$$f'(x) = 0 \Rightarrow x = -1 \text{ or } x = 1$$

Both are in $(-2, 2)$.

Step 2: Evaluate at critical points

- $f(-1) = (-1)^3 - 3(-1) + 2 = -1 + 3 + 2 = 4$
- $f(1) = (1)^3 - 3(1) + 2 = 1 - 3 + 2 = 0$

Step 3: Evaluate at endpoints

- $f(-2) = (-2)^3 - 3(-2) + 2 = -8 + 6 + 2 = 0$
- $f(2) = (2)^3 - 3(2) + 2 = 8 - 6 + 2 = 4$

Step 4: Compare all values

| Point | $f$ value |
|-------|-----------|
| $x = -2$ | 0 |
| $x = -1$ | 4 |
| $x = 1$ | 0 |
| $x = 2$ | 4 |

**Global maximum: $f(-1) = f(2) = 4$** (achieved at two points!)
**Global minimum: $f(-2) = f(1) = 0$** (also achieved at two points!)

#### Diagram: Candidates Test Calculator

<iframe src="../../sims/candidates-test/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Candidates Test Calculator MicroSim</summary>
Type: microsim

Purpose: Guide students through the closed interval method for finding global extrema, showing each step.

Learning Objective: Students will apply the candidates test to find global extrema on closed intervals (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, execute, implement

Visual elements:

- Function graph with closed interval clearly marked
- Critical points marked with one color
- Endpoints marked with different color
- Horizontal dashed lines at the global max and min values
- Table showing all candidate points and their f values
- Stars on the winning candidates (global max and min)

Interactive controls:

- Function selector dropdown
- Input fields for interval endpoints a and b
- Step-by-step button: "Next Step" to reveal one step at a time
- Button: "Show All" to reveal complete solution
- Toggle: Show/hide derivative to see why critical points matter

Data Visibility Requirements:

- Step 1: Show function and interval
- Step 2: Find and list critical points
- Step 3: Evaluate f at each critical point
- Step 4: Evaluate f at endpoints
- Step 5: Create comparison table
- Step 6: Identify global max and min

Behavior:

- Each step adds information to the display
- Table builds row by row
- Final step highlights maximum and minimum rows
- Graph marks all candidates, then circles the winners

Instructional Rationale: Step-by-step reveal mimics how students should approach these problems. The comparison table organizes information clearly and builds good problem-solving habits.

Implementation: p5.js with progressive disclosure
</details>

### When Critical Points Aren't Extrema

Not every critical point is an extremum. Consider $f(x) = x^3$:

$$f'(x) = 3x^2$$
$$f'(x) = 0 \text{ when } x = 0$$

So $x = 0$ is a critical point. But $f(x) = x^3$ is always increasing! At $x = 0$, the tangent is horizontal, but the function doesn't actually turn around. This is called an **inflection point**—we'll explore these in the next chapter.

!!! quote "Delta Thinks Out Loud"
    "So I'm at a critical point where f'(c) = 0, but how do I know if I'm on a peak, in a valley, or just passing through a flat spot? I need more information... That's what the derivative tests are for, coming up next chapter!"

## Summary: The Theoretical Foundation

Let's recap the powerful theorems we've learned:

### Rolle's Theorem
If $f$ is continuous on $[a, b]$, differentiable on $(a, b)$, and $f(a) = f(b)$, then there exists $c$ in $(a, b)$ where $f'(c) = 0$.

### Mean Value Theorem
If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then there exists $c$ in $(a, b)$ where:
$$f'(c) = \frac{f(b) - f(a)}{b - a}$$

### Extreme Value Theorem
If $f$ is continuous on the closed interval $[a, b]$, then $f$ attains both a global maximum and a global minimum on $[a, b]$.

### Critical Point Theorem
If $f$ has a local extremum at $c$, then either $f'(c) = 0$ or $f'(c)$ does not exist.

These theorems form the theoretical backbone for optimization—finding the best, largest, smallest, most efficient, or most effective values in any context.

## Key Takeaways

- **Rolle's Theorem** guarantees a horizontal tangent when $f(a) = f(b)$ (under continuity and differentiability conditions)

- The **Mean Value Theorem** connects average and instantaneous rates: somewhere the tangent is parallel to the secant

- MVT conditions: continuous on $[a, b]$, differentiable on $(a, b)$

- The **Extreme Value Theorem** guarantees global extrema exist for continuous functions on closed intervals

- EVT conditions: continuous function AND closed interval $[a, b]$

- **Global extrema** are the absolute highest/lowest values; **local extrema** are highest/lowest in a neighborhood

- A **critical point** occurs where $f'(c) = 0$ or $f'(c)$ doesn't exist

- Critical points are the only candidates for interior extrema

- The **Candidates Test**: check critical points and endpoints, compare $f$ values

??? question "Check Your Understanding: If $f(x) = x^4 - 4x^3$ on $[0, 4]$, what are the global maximum and minimum?"
    First, find critical points:

    $f'(x) = 4x^3 - 12x^2 = 4x^2(x - 3)$

    $f'(x) = 0$ when $x = 0$ or $x = 3$

    Both are in $[0, 4]$. Evaluate at critical points and endpoints:

    - $f(0) = 0$
    - $f(3) = 81 - 108 = -27$
    - $f(4) = 256 - 256 = 0$

    **Global maximum:** $f(0) = f(4) = 0$ (achieved at both endpoints!)

    **Global minimum:** $f(3) = -27$ (achieved at interior critical point)

