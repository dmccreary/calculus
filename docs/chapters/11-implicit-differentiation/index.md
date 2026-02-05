---
title: Implicit Differentiation
description: Finding derivatives when y cannot be easily solved for as an explicit function of x
generated_by: claude skill chapter-content-generator
date: 2026-02-03 12:00:00
version: 0.03
---

# Implicit Differentiation

## Summary

This chapter introduces implicit differentiation, a technique for finding derivatives when y cannot be easily solved for as an explicit function of x. Students will learn to differentiate both sides of an equation with respect to x, treating y as an implicit function, and solve for dy/dx. The chapter also covers finding second derivatives implicitly and introduces the inverse function theorem. After completing this chapter, students will be able to find tangent lines to curves defined by implicit equations.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

1. Implicit Function
2. Implicit Equation
3. Implicit Differentiation
4. dy dx Implicitly
5. Treating y as Function
6. Implicit Chain Rule
7. Solving for dy dx
8. Second Deriv Implicit
9. Tangent Line Implicit
10. Inverse Function Thm
11. Derivative of Inverse
12. Inverse Deriv Formula

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Calculus](../01-foundations-of-calculus/index.md)
- [Chapter 8: Basic Derivative Rules](../08-basic-derivative-rules/index.md)
- [Chapter 10: The Chain Rule](../10-chain-rule/index.md)

---

## Introduction: When y Plays Hide and Seek

So far, we've differentiated functions where $y$ is explicitly written in terms of $x$—formulas like $y = x^2$, $y = \sin(x)$, or $y = e^{2x}$. These are called **explicit functions** because $y$ is isolated on one side, explicitly telling us its value for any $x$.

But what happens when $y$ refuses to be isolated? Consider the equation of a circle:

$$x^2 + y^2 = 25$$

Try solving for $y$, and you get $y = \pm\sqrt{25 - x^2}$—that pesky $\pm$ means this isn't even a function in the traditional sense! Yet the circle clearly has tangent lines at every point. How do we find their slopes?

!!! quote "Delta Moment"
    "Sometimes I can't see the whole path ahead, but I can still feel the slope under my wheels! Even when the equation looks tangled, I know there's a tilt at every point."

This is where **implicit differentiation** comes to the rescue. It's a powerful technique that lets us find $\frac{dy}{dx}$ even when $y$ can't be (or doesn't need to be) explicitly solved for in terms of $x$.

## Implicit Functions and Equations

Let's establish some vocabulary before diving in.

### Explicit vs. Implicit Functions

An **explicit function** is one where $y$ is expressed directly in terms of $x$:

| Explicit Function | Form |
|-------------------|------|
| $y = x^3 - 4x$ | $y$ alone on the left |
| $y = \ln(x + 1)$ | Direct formula for $y$ |
| $f(x) = e^{2x}\sin(x)$ | Function notation |

An **implicit function** is defined by an equation relating $x$ and $y$, where $y$ isn't isolated:

| Implicit Equation | Why It's Implicit |
|-------------------|-------------------|
| $x^2 + y^2 = 25$ | Can't solve cleanly for $y$ |
| $x^3 + y^3 = 6xy$ | $y$ appears in multiple terms |
| $\sin(xy) = x + y$ | $y$ is inside a function |
| $e^y + y = x$ | Can't isolate $y$ algebraically |

The term "implicit" means the relationship between $x$ and $y$ is *implied* by the equation rather than stated directly.

### Why Implicit Equations Matter

Implicit equations describe many important curves:

- **Circles:** $x^2 + y^2 = r^2$
- **Ellipses:** $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$
- **Hyperbolas:** $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$
- **Cardioids, lemniscates, and other exotic curves**

These shapes appear everywhere—in physics, engineering, economics, and nature. We need to analyze them without requiring an explicit formula for $y$.

#### Diagram: Implicit Curve Gallery

<iframe src="../../sims/implicit-curves/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Implicit Curve Gallery MicroSim</summary>
Type: microsim

Purpose: Display various curves defined by implicit equations and allow students to explore how tangent lines behave at different points.

Learning Objective: Students will recognize that implicit equations define curves where tangent lines exist even when y cannot be explicitly solved for x (Bloom Level 2: Understand)

Bloom Taxonomy Verb: identify, describe, recognize

Visual elements:

- Coordinate grid with multiple implicit curves displayed
- Curves include: circle, ellipse, hyperbola, folium of Descartes, lemniscate
- Movable point that follows the selected curve
- Tangent line displayed at the current point
- Equation of the curve shown in the corner
- dy/dx value displayed at current point

Interactive controls:

- Dropdown to select curve type
- Click/drag to move point along curve
- Checkbox to show/hide tangent line
- Slider to adjust curve parameters (radius, eccentricity, etc.)
- "Random Point" button

Behavior:

- Point snaps to curve when dragged
- Tangent line updates in real-time
- dy/dx value updates as point moves
- Shows that tangent exists even at points where y isn't a function of x

Instructional Rationale: Seeing tangent lines on implicit curves builds intuition that derivatives exist even without explicit formulas.

Implementation: p5.js with implicit curve plotting using marching squares algorithm
</details>

## The Big Idea: Treating y as a Function

Here's the key insight behind implicit differentiation:

!!! tip "The Core Principle"
    Even if we can't solve for $y$ explicitly, we **assume** $y$ is some function of $x$ and differentiate accordingly.

When we write $y$, we're thinking of it as $y(x)$—a function whose formula we might not know, but which still follows the rules of calculus.

This means whenever we differentiate a term containing $y$, we must use the **chain rule**. The variable $y$ is the "inside function," and $x$ is the ultimate variable.

$$\frac{d}{dx}[y] = \frac{dy}{dx}$$

$$\frac{d}{dx}[y^2] = 2y \cdot \frac{dy}{dx}$$

$$\frac{d}{dx}[y^3] = 3y^2 \cdot \frac{dy}{dx}$$

$$\frac{d}{dx}[\sin(y)] = \cos(y) \cdot \frac{dy}{dx}$$

Notice the pattern: differentiate with respect to $y$, then multiply by $\frac{dy}{dx}$.

## The Implicit Chain Rule

This is the chain rule applied when $y$ is the inside function.

!!! tip "Implicit Chain Rule"
    If $y = y(x)$ is a function of $x$, then for any expression $f(y)$:

    $$\frac{d}{dx}[f(y)] = f'(y) \cdot \frac{dy}{dx}$$

Let's build a reference table:

| Expression | Derivative with Respect to $x$ |
|------------|-------------------------------|
| $y$ | $\frac{dy}{dx}$ |
| $y^n$ | $ny^{n-1} \cdot \frac{dy}{dx}$ |
| $e^y$ | $e^y \cdot \frac{dy}{dx}$ |
| $\ln(y)$ | $\frac{1}{y} \cdot \frac{dy}{dx}$ |
| $\sin(y)$ | $\cos(y) \cdot \frac{dy}{dx}$ |
| $\cos(y)$ | $-\sin(y) \cdot \frac{dy}{dx}$ |

But what about mixed terms like $xy$? Use the product rule:

$$\frac{d}{dx}[xy] = \frac{d}{dx}[x] \cdot y + x \cdot \frac{d}{dx}[y] = 1 \cdot y + x \cdot \frac{dy}{dx} = y + x\frac{dy}{dx}$$

## Implicit Differentiation: The Method

Here's the step-by-step process:

**Step 1:** Start with the implicit equation.

**Step 2:** Differentiate both sides with respect to $x$.

- Treat $y$ as a function of $x$
- Use the chain rule on every $y$ term (multiply by $\frac{dy}{dx}$)
- Use product rule for terms like $xy$

**Step 3:** Collect all terms containing $\frac{dy}{dx}$ on one side.

**Step 4:** Factor out $\frac{dy}{dx}$.

**Step 5:** Solve for $\frac{dy}{dx}$.

### Example 1: The Circle

Find $\frac{dy}{dx}$ for $x^2 + y^2 = 25$.

**Step 1:** Start with $x^2 + y^2 = 25$

**Step 2:** Differentiate both sides with respect to $x$:

$$\frac{d}{dx}[x^2] + \frac{d}{dx}[y^2] = \frac{d}{dx}[25]$$

$$2x + 2y\frac{dy}{dx} = 0$$

**Step 3-5:** Solve for $\frac{dy}{dx}$:

$$2y\frac{dy}{dx} = -2x$$

$$\frac{dy}{dx} = -\frac{x}{y}$$

That's it! The derivative is $\frac{dy}{dx} = -\frac{x}{y}$.

Notice this answer contains both $x$ AND $y$. This is typical for implicit differentiation—and it makes sense because the slope depends on where you are on the curve.

!!! note "Why the Answer Contains Both Variables"
    At the point $(3, 4)$ on the circle, the slope is $-\frac{3}{4}$.

    At the point $(3, -4)$ (also on the circle), the slope is $-\frac{3}{-4} = \frac{3}{4}$.

    Same $x$, different $y$, different slopes. The formula $-\frac{x}{y}$ captures this.

### Example 2: A Cubic Curve

Find $\frac{dy}{dx}$ for $x^3 + y^3 = 6xy$.

**Step 2:** Differentiate both sides:

$$3x^2 + 3y^2\frac{dy}{dx} = 6\left(y + x\frac{dy}{dx}\right)$$

(On the right, we used the product rule on $6xy$)

**Step 3:** Expand and collect $\frac{dy}{dx}$ terms:

$$3x^2 + 3y^2\frac{dy}{dx} = 6y + 6x\frac{dy}{dx}$$

$$3y^2\frac{dy}{dx} - 6x\frac{dy}{dx} = 6y - 3x^2$$

**Step 4:** Factor:

$$\frac{dy}{dx}(3y^2 - 6x) = 6y - 3x^2$$

**Step 5:** Solve:

$$\frac{dy}{dx} = \frac{6y - 3x^2}{3y^2 - 6x} = \frac{2y - x^2}{y^2 - 2x}$$

### Example 3: Exponential and Logarithmic

Find $\frac{dy}{dx}$ for $e^y + y = x$.

**Step 2:** Differentiate:

$$e^y \cdot \frac{dy}{dx} + \frac{dy}{dx} = 1$$

**Step 4:** Factor:

$$\frac{dy}{dx}(e^y + 1) = 1$$

**Step 5:** Solve:

$$\frac{dy}{dx} = \frac{1}{e^y + 1}$$

#### Diagram: Implicit Differentiation Step-by-Step

<iframe src="../../sims/implicit-diff-steps/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Implicit Differentiation Step-by-Step MicroSim</summary>
Type: microsim

Purpose: Walk students through the implicit differentiation process with visual highlighting of each step.

Learning Objective: Students will apply implicit differentiation systematically to find dy/dx (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, execute, implement

Visual elements:

- Original equation displayed at top
- Step-by-step work area showing:
  1. Differentiate each term (highlight y terms in color)
  2. Show chain rule application on each y term
  3. Collect dy/dx terms (move to one side)
  4. Factor out dy/dx
  5. Final answer
- Color coding: x terms in blue, y terms in green, dy/dx in red
- Animated transitions between steps

Interactive controls:

- "Next Step" button to advance
- "Show All Steps" button
- Preset equations to choose from
- Input field for custom equation
- "Reset" button

Preset equations:

- $x^2 + y^2 = 25$
- $x^3 + y^3 = 6xy$
- $xy = 1$
- $\sin(x + y) = y$
- $e^{xy} = x - y$

Behavior:

- Each step highlights what's happening
- Chain rule applications are explicitly shown
- Algebraic manipulations animated
- Final answer boxed

Instructional Rationale: Explicit step-by-step visualization helps students internalize the procedure before practicing on their own.

Implementation: p5.js with text rendering and color highlighting
</details>

## Solving for dy/dx: Algebraic Strategies

The "solving for $\frac{dy}{dx}$" step can get algebraically tricky. Here are patterns to watch for.

### Pattern 1: dy/dx Appears Once

If $\frac{dy}{dx}$ appears in only one term, just isolate it:

**Example:** From $2x + 2y\frac{dy}{dx} = 0$

$$\frac{dy}{dx} = -\frac{x}{y}$$

### Pattern 2: dy/dx Appears Multiple Times

Collect all $\frac{dy}{dx}$ terms on one side, factor it out:

**Example:** From $3y^2\frac{dy}{dx} - 6x\frac{dy}{dx} = 6y - 3x^2$

$$\frac{dy}{dx}(3y^2 - 6x) = 6y - 3x^2$$

$$\frac{dy}{dx} = \frac{6y - 3x^2}{3y^2 - 6x}$$

### Pattern 3: Nested Inside a Function

Sometimes $\frac{dy}{dx}$ appears inside a more complex expression. Differentiate carefully:

**Example:** $\sin(x + y) = y$

$$\cos(x + y) \cdot \frac{d}{dx}[x + y] = \frac{dy}{dx}$$

$$\cos(x + y) \cdot \left(1 + \frac{dy}{dx}\right) = \frac{dy}{dx}$$

$$\cos(x + y) + \cos(x + y)\frac{dy}{dx} = \frac{dy}{dx}$$

$$\cos(x + y) = \frac{dy}{dx} - \cos(x + y)\frac{dy}{dx}$$

$$\cos(x + y) = \frac{dy}{dx}(1 - \cos(x + y))$$

$$\frac{dy}{dx} = \frac{\cos(x + y)}{1 - \cos(x + y)}$$

## Finding Tangent Lines to Implicit Curves

One of the most useful applications of implicit differentiation is finding tangent lines.

!!! tip "Tangent Line to Implicit Curve"
    To find the tangent line at a point $(a, b)$ on an implicit curve:

    1. Verify that $(a, b)$ satisfies the original equation
    2. Find $\frac{dy}{dx}$ using implicit differentiation
    3. Evaluate $\frac{dy}{dx}$ at $(a, b)$ to get the slope $m$
    4. Use point-slope form: $y - b = m(x - a)$

### Example: Tangent to a Circle

Find the tangent line to $x^2 + y^2 = 25$ at the point $(3, 4)$.

**Step 1:** Verify: $3^2 + 4^2 = 9 + 16 = 25$ ✓

**Step 2:** We found $\frac{dy}{dx} = -\frac{x}{y}$

**Step 3:** At $(3, 4)$: $m = -\frac{3}{4}$

**Step 4:** Tangent line: $y - 4 = -\frac{3}{4}(x - 3)$

Simplifying: $y = -\frac{3}{4}x + \frac{25}{4}$

Or in standard form: $3x + 4y = 25$

!!! quote "Delta Moment"
    "I'm rolling along the circle, and at the point (3, 4), my tilt is exactly -3/4. Downhill to the right! The tangent line shows exactly which direction I'm headed at that instant."

### Example: Tangent to a Folium

The **folium of Descartes** is defined by $x^3 + y^3 = 6xy$. Find the tangent line at $(3, 3)$.

**Step 1:** Verify: $27 + 27 = 54$ and $6(3)(3) = 54$ ✓

**Step 2:** We found $\frac{dy}{dx} = \frac{2y - x^2}{y^2 - 2x}$

**Step 3:** At $(3, 3)$:

$$m = \frac{2(3) - 9}{9 - 6} = \frac{6 - 9}{3} = \frac{-3}{3} = -1$$

**Step 4:** Tangent line: $y - 3 = -1(x - 3)$, so $y = -x + 6$

#### Diagram: Tangent Line Explorer

<iframe src="../../sims/implicit-tangent/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Implicit Tangent Line Explorer MicroSim</summary>
Type: microsim

Purpose: Allow students to explore tangent lines at various points on implicit curves interactively.

Learning Objective: Students will find tangent lines to curves defined by implicit equations (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, calculate, demonstrate

Visual elements:

- Coordinate grid with implicit curve displayed
- Draggable point on the curve
- Tangent line drawn at the point
- Display panel showing:
  - Current point coordinates $(x, y)$
  - Value of $\frac{dy}{dx}$ at the point
  - Equation of the tangent line
  - Step-by-step calculation (collapsible)

Interactive controls:

- Dropdown to select curve type
- Click/drag point along curve
- Input fields for specific coordinates
- "Random Point" button
- Toggle to show/hide normal line
- Parameter sliders for adjustable curves

Preset curves:

- Circle: $x^2 + y^2 = r^2$
- Ellipse: $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$
- Hyperbola
- Folium of Descartes

Behavior:

- Point stays on curve when dragged
- Tangent line updates in real-time
- All calculations update live
- Shows vertical tangent warning when dy/dx undefined

Instructional Rationale: Interactive exploration builds understanding of how tangent lines behave at different points, including edge cases.

Implementation: p5.js with real-time implicit curve evaluation
</details>

## Second Derivatives Implicitly

Sometimes we need the second derivative $\frac{d^2y}{dx^2}$ of an implicit function. The process is:

1. Find $\frac{dy}{dx}$ using implicit differentiation
2. Differentiate $\frac{dy}{dx}$ with respect to $x$ (implicitly again!)
3. Substitute the expression for $\frac{dy}{dx}$ to eliminate it from the answer

### Example: Second Derivative of a Circle

For $x^2 + y^2 = 25$, we found $\frac{dy}{dx} = -\frac{x}{y}$.

Now differentiate $\frac{dy}{dx}$ with respect to $x$:

$$\frac{d^2y}{dx^2} = \frac{d}{dx}\left[-\frac{x}{y}\right]$$

Use the quotient rule:

$$= -\frac{y \cdot 1 - x \cdot \frac{dy}{dx}}{y^2}$$

$$= -\frac{y - x\frac{dy}{dx}}{y^2}$$

Now substitute $\frac{dy}{dx} = -\frac{x}{y}$:

$$= -\frac{y - x\left(-\frac{x}{y}\right)}{y^2}$$

$$= -\frac{y + \frac{x^2}{y}}{y^2}$$

$$= -\frac{\frac{y^2 + x^2}{y}}{y^2}$$

$$= -\frac{y^2 + x^2}{y^3}$$

Since we're on the circle where $x^2 + y^2 = 25$:

$$\frac{d^2y}{dx^2} = -\frac{25}{y^3}$$

This tells us about the concavity of the circle! When $y > 0$ (top half), the curve is concave down. When $y < 0$ (bottom half), concave up.

!!! note "Why Second Derivatives Matter"
    The second derivative tells us about concavity and acceleration. For the circle, this confirms what we see geometrically—the top half curves downward, the bottom half curves upward.

## The Inverse Function Theorem

Implicit differentiation is closely related to finding derivatives of inverse functions. Here's the connection.

### Motivation: What's the Derivative of an Inverse?

If $f$ and $g$ are inverse functions, then $f(g(x)) = x$ and $g(f(x)) = x$.

What's the relationship between $f'$ and $g'$?

Let's use implicit differentiation on $f(g(x)) = x$:

$$\frac{d}{dx}[f(g(x))] = \frac{d}{dx}[x]$$

$$f'(g(x)) \cdot g'(x) = 1$$

$$g'(x) = \frac{1}{f'(g(x))}$$

This is the **Inverse Function Theorem** (for derivatives).

!!! tip "Inverse Function Theorem"
    If $f$ is a differentiable function with inverse $f^{-1}$, and if $f'(f^{-1}(x)) \neq 0$, then:

    $$\frac{d}{dx}[f^{-1}(x)] = \frac{1}{f'(f^{-1}(x))}$$

    Or equivalently, if $y = f^{-1}(x)$, then $x = f(y)$, and:

    $$\frac{dy}{dx} = \frac{1}{\frac{dx}{dy}}$$

The formula says: **The derivative of the inverse is the reciprocal of the derivative of the original function.**

### Understanding the Formula Geometrically

Think about the graphs of $f$ and $f^{-1}$. They're reflections of each other across the line $y = x$.

If the graph of $f$ is steep (large slope), then its reflection $f^{-1}$ is shallow (small slope). If $f$ has slope 3, then $f^{-1}$ has slope $\frac{1}{3}$ at the corresponding point.

This reciprocal relationship is exactly what the theorem states.

#### Diagram: Inverse Function Derivative Visualizer

<iframe src="../../sims/inverse-derivative/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Inverse Function Derivative Visualizer MicroSim</summary>
Type: microsim

Purpose: Show geometrically why the derivative of an inverse function is the reciprocal of the original derivative.

Learning Objective: Students will explain the relationship between the derivative of a function and the derivative of its inverse (Bloom Level 2: Understand)

Bloom Taxonomy Verb: explain, interpret, illustrate

Visual elements:

- Split view or overlaid graphs
- Left/blue: Graph of $f(x)$ with a point and tangent line
- Right/orange: Graph of $f^{-1}(x)$ with corresponding point and tangent line
- Line $y = x$ shown as reference
- Slope values displayed for both tangent lines
- Shows that slopes are reciprocals

Interactive controls:

- Function selector (several invertible functions)
- Draggable point on $f$
- Corresponding point on $f^{-1}$ moves automatically
- Toggle to show/hide line $y = x$
- Animation mode to sweep point along curve

Functions available:

- $f(x) = x^2$ (restricted to $x \geq 0$), inverse $\sqrt{x}$
- $f(x) = x^3$, inverse $\sqrt[3]{x}$
- $f(x) = e^x$, inverse $\ln(x)$
- $f(x) = \sin(x)$ (restricted), inverse $\arcsin(x)$

Display shows:

- At point $(a, b)$ on $f$: slope = $f'(a)$
- At point $(b, a)$ on $f^{-1}$: slope = $\frac{1}{f'(a)}$
- Verification: product of slopes = 1

Instructional Rationale: Geometric visualization makes the reciprocal relationship intuitive and memorable.

Implementation: p5.js with dual graph display
</details>

## Derivatives of Inverse Functions: The Formula

Let's derive a more explicit formula. If $y = f^{-1}(x)$, then $f(y) = x$.

Differentiate implicitly:

$$f'(y) \cdot \frac{dy}{dx} = 1$$

$$\frac{dy}{dx} = \frac{1}{f'(y)}$$

Since $y = f^{-1}(x)$:

$$\frac{d}{dx}[f^{-1}(x)] = \frac{1}{f'(f^{-1}(x))}$$

This is the **Inverse Derivative Formula**.

### Example 1: Derivative of Square Root

Let $f(x) = x^2$ (for $x \geq 0$), so $f^{-1}(x) = \sqrt{x}$.

Using the formula:

$$\frac{d}{dx}[\sqrt{x}] = \frac{d}{dx}[f^{-1}(x)] = \frac{1}{f'(f^{-1}(x))} = \frac{1}{2\sqrt{x}}$$

where we used $f'(x) = 2x$ and $f^{-1}(x) = \sqrt{x}$.

This matches what we know: $\frac{d}{dx}[\sqrt{x}] = \frac{1}{2\sqrt{x}}$ ✓

### Example 2: Derivative of Natural Log

Let $f(x) = e^x$, so $f^{-1}(x) = \ln(x)$.

$$\frac{d}{dx}[\ln(x)] = \frac{1}{f'(f^{-1}(x))} = \frac{1}{e^{\ln(x)}} = \frac{1}{x}$$

This also matches our known result! ✓

### Example 3: A Specific Inverse

If $f(x) = x^3 + x$, and we want to find $(f^{-1})'(2)$.

We can't find $f^{-1}$ explicitly, but we can find its derivative at $x = 2$.

First, we need to find $a$ such that $f(a) = 2$, i.e., $a^3 + a = 2$.

By inspection, $a = 1$ works: $1 + 1 = 2$ ✓

Now use the formula:

$$(f^{-1})'(2) = \frac{1}{f'(f^{-1}(2))} = \frac{1}{f'(1)}$$

Since $f'(x) = 3x^2 + 1$, we have $f'(1) = 3 + 1 = 4$.

Therefore: $(f^{-1})'(2) = \frac{1}{4}$

!!! tip "Strategy for $(f^{-1})'(b)$"
    To find $(f^{-1})'(b)$:

    1. Find $a$ such that $f(a) = b$
    2. Calculate $f'(a)$
    3. The answer is $(f^{-1})'(b) = \frac{1}{f'(a)}$

## Application: Derivatives of Inverse Trig Functions

The inverse function theorem gives us a systematic way to find derivatives of inverse trigonometric functions.

### Derivative of Arcsin

Let $y = \arcsin(x)$, so $\sin(y) = x$ where $-\frac{\pi}{2} \leq y \leq \frac{\pi}{2}$.

Differentiate implicitly:

$$\cos(y) \cdot \frac{dy}{dx} = 1$$

$$\frac{dy}{dx} = \frac{1}{\cos(y)}$$

Now we need $\cos(y)$ in terms of $x$. Since $\sin(y) = x$ and $y$ is in $[-\frac{\pi}{2}, \frac{\pi}{2}]$ (where cosine is non-negative):

$$\cos(y) = \sqrt{1 - \sin^2(y)} = \sqrt{1 - x^2}$$

Therefore:

$$\frac{d}{dx}[\arcsin(x)] = \frac{1}{\sqrt{1 - x^2}}$$

### Derivative of Arctan

Let $y = \arctan(x)$, so $\tan(y) = x$ where $-\frac{\pi}{2} < y < \frac{\pi}{2}$.

Differentiate implicitly:

$$\sec^2(y) \cdot \frac{dy}{dx} = 1$$

$$\frac{dy}{dx} = \frac{1}{\sec^2(y)} = \cos^2(y)$$

Using the identity $\sec^2(y) = 1 + \tan^2(y) = 1 + x^2$:

$$\frac{dy}{dx} = \frac{1}{1 + x^2}$$

Therefore:

$$\frac{d}{dx}[\arctan(x)] = \frac{1}{1 + x^2}$$

### Summary: Inverse Trig Derivatives

| Function | Derivative |
|----------|------------|
| $\arcsin(x)$ | $\frac{1}{\sqrt{1-x^2}}$ |
| $\arccos(x)$ | $-\frac{1}{\sqrt{1-x^2}}$ |
| $\arctan(x)$ | $\frac{1}{1+x^2}$ |
| $\text{arccot}(x)$ | $-\frac{1}{1+x^2}$ |
| $\text{arcsec}(x)$ | $\frac{1}{|x|\sqrt{x^2-1}}$ |
| $\text{arccsc}(x)$ | $-\frac{1}{|x|\sqrt{x^2-1}}$ |

!!! quote "Delta's Pun Corner"
    "Why was the inverse function so confident? Because it knew its derivative was just the reciprocal of the original—no need to reinvent the wheel, just flip it!"

## Common Mistakes to Avoid

When working with implicit differentiation, watch out for these pitfalls.

**Mistake 1: Forgetting the chain rule on $y$ terms**

- Wrong: $\frac{d}{dx}[y^2] = 2y$
- Right: $\frac{d}{dx}[y^2] = 2y\frac{dy}{dx}$

**Mistake 2: Forgetting the product rule on $xy$ terms**

- Wrong: $\frac{d}{dx}[xy] = y$
- Right: $\frac{d}{dx}[xy] = y + x\frac{dy}{dx}$

**Mistake 3: Not substituting back when finding second derivatives**

After finding $\frac{d^2y}{dx^2}$, replace any remaining $\frac{dy}{dx}$ with its expression.

**Mistake 4: Getting confused about what to differentiate**

Remember: you're always differentiating with respect to $x$. The variable $y$ is just shorthand for "some function of $x$."

## Practice Problems

**Problem 1:** Find $\frac{dy}{dx}$ for $x^2 - xy + y^2 = 7$.

Differentiate: $2x - (y + x\frac{dy}{dx}) + 2y\frac{dy}{dx} = 0$

$2x - y - x\frac{dy}{dx} + 2y\frac{dy}{dx} = 0$

$\frac{dy}{dx}(2y - x) = y - 2x$

$$\frac{dy}{dx} = \frac{y - 2x}{2y - x}$$

**Problem 2:** Find $\frac{dy}{dx}$ for $\sin(xy) = x$.

Differentiate: $\cos(xy) \cdot (y + x\frac{dy}{dx}) = 1$

$y\cos(xy) + x\cos(xy)\frac{dy}{dx} = 1$

$\frac{dy}{dx} = \frac{1 - y\cos(xy)}{x\cos(xy)}$

**Problem 3:** Find the tangent line to $x^2 + xy + y^2 = 3$ at $(1, 1)$.

First verify: $1 + 1 + 1 = 3$ ✓

Differentiate: $2x + y + x\frac{dy}{dx} + 2y\frac{dy}{dx} = 0$

At $(1, 1)$: $2 + 1 + \frac{dy}{dx} + 2\frac{dy}{dx} = 0$

$3\frac{dy}{dx} = -3$, so $\frac{dy}{dx} = -1$

Tangent line: $y - 1 = -1(x - 1)$, so $y = -x + 2$

**Problem 4:** Find $(f^{-1})'(3)$ if $f(x) = x^3 + 2x$.

Find $a$ where $f(a) = 3$: $a^3 + 2a = 3$. By inspection, $a = 1$.

$f'(x) = 3x^2 + 2$, so $f'(1) = 5$.

$(f^{-1})'(3) = \frac{1}{f'(1)} = \frac{1}{5}$

## Summary: Implicit Differentiation Toolkit

### The Process

1. **Differentiate both sides** with respect to $x$
2. **Apply the chain rule** to all $y$ terms (multiply by $\frac{dy}{dx}$)
3. **Collect** all $\frac{dy}{dx}$ terms on one side
4. **Factor out** $\frac{dy}{dx}$
5. **Solve** for $\frac{dy}{dx}$

### Key Formulas

| Concept | Formula |
|---------|---------|
| Implicit Chain Rule | $\frac{d}{dx}[f(y)] = f'(y) \cdot \frac{dy}{dx}$ |
| Product with $y$ | $\frac{d}{dx}[xy] = y + x\frac{dy}{dx}$ |
| Inverse Derivative | $(f^{-1})'(x) = \frac{1}{f'(f^{-1}(x))}$ |
| Reciprocal Form | $\frac{dy}{dx} = \frac{1}{\frac{dx}{dy}}$ |

### When to Use Implicit Differentiation

- Equation can't be easily solved for $y$
- Finding tangent lines to circles, ellipses, and other implicit curves
- Deriving derivatives of inverse functions
- When the explicit formula for $y$ is messy

## Key Takeaways

- An **implicit function** is defined by an equation relating $x$ and $y$ without isolating $y$

- **Implicit differentiation** treats $y$ as a function of $x$ and uses the chain rule on every $y$ term

- The answer $\frac{dy}{dx}$ typically contains **both $x$ and $y$**—you need a specific point to get a numerical slope

- **Tangent lines** to implicit curves: find $\frac{dy}{dx}$, evaluate at the point, use point-slope form

- **Second derivatives** require differentiating $\frac{dy}{dx}$ implicitly and substituting

- The **Inverse Function Theorem** says $(f^{-1})'(x) = \frac{1}{f'(f^{-1}(x))}$—the derivative of the inverse is the reciprocal

- This theorem lets us derive formulas for **inverse trig derivatives** systematically

??? question "Check Your Understanding: Find $\frac{dy}{dx}$ for $e^{xy} = x + y$"
    Differentiate both sides with respect to $x$:

    $$e^{xy} \cdot \frac{d}{dx}[xy] = 1 + \frac{dy}{dx}$$

    $$e^{xy} \cdot \left(y + x\frac{dy}{dx}\right) = 1 + \frac{dy}{dx}$$

    Expand:

    $$ye^{xy} + xe^{xy}\frac{dy}{dx} = 1 + \frac{dy}{dx}$$

    Collect $\frac{dy}{dx}$ terms:

    $$xe^{xy}\frac{dy}{dx} - \frac{dy}{dx} = 1 - ye^{xy}$$

    Factor:

    $$\frac{dy}{dx}(xe^{xy} - 1) = 1 - ye^{xy}$$

    Solve:

    $$\frac{dy}{dx} = \frac{1 - ye^{xy}}{xe^{xy} - 1}$$

    **Answer:** $\frac{dy}{dx} = \frac{1 - ye^{xy}}{xe^{xy} - 1}$

[See Annotated References](./references.md)
