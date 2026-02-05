---
title: Higher-Order Derivatives and Motion
description: Second and higher-order derivatives with applications to velocity, acceleration, and motion analysis
generated_by: claude skill chapter-content-generator
date: 2026-02-03 10:15:00
version: 0.03
---

# Higher-Order Derivatives and Motion

## Summary

This chapter explores second and higher-order derivatives and their applications to motion. Students will learn notation for higher derivatives, understand the physical interpretations of velocity, acceleration, and jerk, and analyze motion problems. The chapter emphasizes the relationship between position, velocity, and acceleration functions, including determining when an object is speeding up or slowing down. After completing this chapter, students will be able to solve straight-line motion problems using derivatives.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Higher-Order Derivative
2. Second Derivative
3. Third Derivative
4. nth Derivative
5. Second Deriv Notation
6. f Double Prime
7. d2y dx2 Notation
8. Velocity from Position
9. Acceleration
10. Jerk
11. Position Velocity Accel
12. Speed vs Velocity
13. Direction of Motion
14. Speeding Up Slowing
15. Higher Trig Derivatives

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: The Derivative Concept](../06-derivative-concept/index.md)
- [Chapter 8: Basic Derivative Rules](../08-basic-derivative-rules/index.md)
- [Chapter 9: Product, Quotient, and Transcendental Derivatives](../09-product-quotient-transcendental-derivatives/index.md)

---

## Introduction: Beyond the First Derivative

You've mastered finding derivatives, which tell you how fast a function is changing at any instant. But here's a question: what if that rate of change is itself changing? When you accelerate in a car, your speed (a rate of change) is increasing. How do we measure that mathematically?

The answer is to take the derivative of the derivative. Just as the first derivative tells you how the original function changes, the second derivative tells you how the first derivative changes. This simple idea opens up a whole new world of applications, especially in physics.

!!! quote "Delta Moment"
    "The first derivative tells me my tilt—how steep the ground is under my wheels. But the *second* derivative? That tells me whether I'm climbing faster or slower than before. Am I working harder, or is the hill easing up?"

In this chapter, we'll explore higher-order derivatives and their most important application: describing motion. By the end, you'll understand why physicists love calculus so much.

## Higher-Order Derivatives

A **higher-order derivative** is what you get when you take the derivative of a derivative. Since a derivative is itself a function, we can differentiate it again and again.

- The **first derivative** $f'(x)$ tells us the rate of change of $f$.
- The **second derivative** $f''(x)$ tells us the rate of change of $f'$—how fast the slope is changing.
- The **third derivative** $f'''(x)$ tells us the rate of change of $f''$.
- And so on!

Each derivative gives us new information about how the function behaves. The first derivative describes direction and steepness. The second derivative describes curvature and concavity. Higher derivatives reveal increasingly subtle patterns in how the function changes.

| Derivative Order | What It Measures |
|-----------------|------------------|
| First ($f'$) | Rate of change of $f$ (slope) |
| Second ($f''$) | Rate of change of slope (curvature) |
| Third ($f'''$) | Rate of change of curvature |
| Fourth ($f^{(4)}$) | Rate of change of third derivative |

## The Second Derivative

The **second derivative** is the most important higher-order derivative. It's the derivative of the first derivative:

$$f''(x) = \frac{d}{dx}\left[f'(x)\right]$$

To find the second derivative, simply differentiate twice: find $f'(x)$ first, then differentiate that result to get $f''(x)$.

**Example:** Find the first and second derivatives of $f(x) = x^4 - 3x^2 + 5x$.

Step 1: Find the first derivative using the power rule:

$$f'(x) = 4x^3 - 6x + 5$$

Step 2: Differentiate again to find the second derivative:

$$f''(x) = 12x^2 - 6$$

The first derivative $f'(x) = 4x^3 - 6x + 5$ tells us the slope at any point. The second derivative $f''(x) = 12x^2 - 6$ tells us how that slope is changing.

#### Diagram: Second Derivative Explorer

<iframe src="../../sims/second-derivative-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Second Derivative Explorer MicroSim Specification</summary>
Type: microsim

Purpose: Visualize the relationship between a function, its first derivative, and its second derivative.

Learning Objective: Students will analyze how the second derivative relates to the curvature of the original function (Bloom Level 4: Analyze)

Bloom Taxonomy Verb: analyze, connect, interpret

Visual elements:

- Three stacked panels showing $f(x)$, $f'(x)$, and $f''(x)$
- Synchronized moving point across all three graphs
- Tangent line on the original function
- Color-coding: blue for original, green for first derivative, red for second derivative
- Concavity indicators on the original function

Interactive controls:

- Slider: Move point along x-axis
- Dropdown: Select function from presets ($x^3$, $x^4 - 3x^2$, $\sin(x)$)
- Toggle: Show/hide second derivative panel
- Display: Current values of $f(x)$, $f'(x)$, $f''(x)$

Behavior:

- When $f''(x) > 0$: original curve is concave up, first derivative increasing
- When $f''(x) < 0$: original curve is concave down, first derivative decreasing
- When $f''(x) = 0$: possible inflection point

Instructional Rationale: Seeing all three functions simultaneously helps students understand the chain of relationships. The synchronized point makes abstract connections concrete.

Implementation: p5.js with three-panel display
</details>

## The Third Derivative and Beyond

We can keep differentiating! The **third derivative** is the derivative of the second derivative:

$$f'''(x) = \frac{d}{dx}\left[f''(x)\right]$$

And in general, the **nth derivative** is found by differentiating $n$ times.

**Example:** Find the first four derivatives of $f(x) = x^5$.

$$f(x) = x^5$$

$$f'(x) = 5x^4$$

$$f''(x) = 20x^3$$

$$f'''(x) = 60x^2$$

$$f^{(4)}(x) = 120x$$

Notice the pattern: each derivative reduces the power by 1 until eventually we get a constant, then zero. For $f(x) = x^5$:

$$f^{(5)}(x) = 120$$

$$f^{(6)}(x) = 0$$

Once we hit zero, all subsequent derivatives remain zero.

!!! tip "Key Observation"
    For a polynomial of degree $n$, the $(n+1)$th derivative and all higher derivatives are zero. The degree decreases by 1 with each differentiation until nothing is left.

## Notation for Higher Derivatives

Mathematicians use several notation systems for higher derivatives. You need to recognize all of them since different textbooks and contexts prefer different styles.

### Prime Notation (Lagrange)

For the second derivative, we use two prime marks:

$$f''(x) \quad \text{read as "f double prime of x"}$$

For the third derivative:

$$f'''(x) \quad \text{read as "f triple prime of x"}$$

Beyond three primes, this gets unwieldy, so we switch to:

$$f^{(4)}(x), \quad f^{(5)}(x), \quad f^{(n)}(x)$$

The parentheses around the number distinguish it from an exponent. $f^{(4)}(x)$ is the fourth derivative, not $f(x)$ raised to the fourth power.

### Leibniz Notation

In Leibniz notation, the second derivative of $y$ with respect to $x$ is written:

$$\frac{d^2y}{dx^2} \quad \text{read as "d two y dx squared"}$$

For higher derivatives:

$$\frac{d^3y}{dx^3}, \quad \frac{d^4y}{dx^4}, \quad \frac{d^ny}{dx^n}$$

The operator form works similarly:

$$\frac{d^2}{dx^2}[f(x)] \quad \text{means "take the second derivative of } f(x) \text{"}$$

!!! warning "Notation Alert"
    In $\frac{d^2y}{dx^2}$, the exponents are positioned differently: the 2 in the numerator is on the $d$, while the 2 in the denominator is on the entire $dx$. This notation evolved from the historical development of calculus and isn't meant to be treated as a fraction in the usual sense.

### Summary of Notation

| Order | Prime Notation | Leibniz Notation |
|-------|---------------|------------------|
| First | $f'(x)$ or $y'$ | $\frac{dy}{dx}$ |
| Second | $f''(x)$ or $y''$ | $\frac{d^2y}{dx^2}$ |
| Third | $f'''(x)$ or $y'''$ | $\frac{d^3y}{dx^3}$ |
| Fourth | $f^{(4)}(x)$ | $\frac{d^4y}{dx^4}$ |
| nth | $f^{(n)}(x)$ | $\frac{d^ny}{dx^n}$ |

## Motion: Where Physics Meets Calculus

Now for the fun part! The most natural application of higher-order derivatives is describing motion. When an object moves along a straight line, its position, velocity, and acceleration are all connected by derivatives.

!!! quote "Delta Moment"
    "My position tells you *where* I am. My velocity tells you *where I'm headed*. My acceleration tells you *how my journey is changing*. They're all connected—each one is the derivative of the one before!"

### Position Function

The **position function** $s(t)$ (or sometimes $x(t)$) gives the location of an object at time $t$. Position is measured from some reference point, often in meters, feet, or other distance units.

### Velocity from Position

**Velocity** is the rate of change of position with respect to time. It tells us how fast the position is changing and in which direction.

$$v(t) = s'(t) = \frac{ds}{dt}$$

where:

- $v(t)$ is velocity at time $t$
- $s(t)$ is position at time $t$
- $\frac{ds}{dt}$ is the rate of change of position with respect to time

Velocity can be positive (moving in the positive direction), negative (moving in the negative direction), or zero (momentarily at rest).

**Example:** A particle's position is given by $s(t) = t^3 - 6t^2 + 9t + 2$ meters, where $t$ is in seconds. Find the velocity at $t = 2$ seconds.

Step 1: Find the velocity function by differentiating position:

$$v(t) = s'(t) = 3t^2 - 12t + 9$$

Step 2: Evaluate at $t = 2$:

$$v(2) = 3(2)^2 - 12(2) + 9 = 12 - 24 + 9 = -3 \text{ m/s}$$

The negative velocity means the particle is moving in the negative direction at $t = 2$ seconds.

### Acceleration

**Acceleration** is the rate of change of velocity. It tells us how fast the velocity is changing.

$$a(t) = v'(t) = s''(t) = \frac{d^2s}{dt^2}$$

where:

- $a(t)$ is acceleration at time $t$
- $v'(t)$ is the derivative of velocity
- $s''(t)$ is the second derivative of position

Positive acceleration means velocity is increasing. Negative acceleration means velocity is decreasing (sometimes called deceleration in everyday language, though physicists just call it negative acceleration).

**Continuing our example:** Find the acceleration at $t = 2$ seconds.

$$a(t) = v'(t) = 6t - 12$$

$$a(2) = 6(2) - 12 = 12 - 12 = 0 \text{ m/s}^2$$

At $t = 2$, the acceleration is zero, meaning the velocity isn't changing at that instant.

### Jerk

The **third derivative of position** is called **jerk**. It measures how quickly acceleration changes.

$$j(t) = a'(t) = s'''(t) = \frac{d^3s}{dt^3}$$

Why do we care about jerk? Because it's what you *feel*. When you're in a car with constant acceleration, you feel pressed into your seat, but it's smooth. When acceleration suddenly changes (high jerk), you feel a sudden "jerk"—hence the name!

Engineers designing elevators, roller coasters, and vehicles work hard to minimize jerk because it creates discomfort. A smooth ride has low jerk values.

**Completing our example:** Find the jerk for $s(t) = t^3 - 6t^2 + 9t + 2$.

$$j(t) = a'(t) = 6 \text{ m/s}^3$$

The jerk is constant (6 m/s³) for this motion, meaning the acceleration increases at a steady rate.

#### Diagram: Position-Velocity-Acceleration Relationship

<iframe src="../../sims/motion-analysis/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Motion Analysis MicroSim Specification</summary>
Type: microsim

Purpose: Show the relationship between position, velocity, and acceleration for a moving object.

Learning Objective: Students will connect position, velocity, and acceleration through derivatives (Bloom Level 4: Analyze)

Bloom Taxonomy Verb: analyze, interpret, connect

Visual elements:

- Four panels: Position vs time, Velocity vs time, Acceleration vs time, Animation of moving particle
- Animated particle on a number line showing actual motion
- Synchronized time marker across all graphs
- Current values displayed: $s(t)$, $v(t)$, $a(t)$

Interactive controls:

- Play/Pause animation button
- Time slider for manual control
- Dropdown: Select motion scenario (polynomial, sinusoidal, custom)
- Speed control for animation
- Reset button

Behavior:

- When $v > 0$: particle moves right, velocity graph positive
- When $v < 0$: particle moves left, velocity graph negative
- When $a > 0$: velocity graph increasing
- When $a < 0$: velocity graph decreasing
- Particle trace shows path history

Instructional Rationale: Seeing the actual motion alongside the mathematical graphs creates powerful connections. Students can pause at any moment and verify that derivatives match the graph behaviors.

Implementation: p5.js with animated particle and synchronized graphs
</details>

## The Position-Velocity-Acceleration Chain

Here's the beautiful pattern that connects everything:

$$\text{Position} \xrightarrow{\text{differentiate}} \text{Velocity} \xrightarrow{\text{differentiate}} \text{Acceleration} \xrightarrow{\text{differentiate}} \text{Jerk}$$

Or symbolically:

$$s(t) \xrightarrow{d/dt} v(t) \xrightarrow{d/dt} a(t) \xrightarrow{d/dt} j(t)$$

| Function | Symbol | What It Measures | Units (if position in meters, time in seconds) |
|----------|--------|------------------|----------------------------------------------|
| Position | $s(t)$ | Where the object is | meters (m) |
| Velocity | $v(t) = s'(t)$ | How fast position changes | meters per second (m/s) |
| Acceleration | $a(t) = s''(t)$ | How fast velocity changes | meters per second squared (m/s²) |
| Jerk | $j(t) = s'''(t)$ | How fast acceleration changes | meters per second cubed (m/s³) |

## Speed vs. Velocity: An Important Distinction

In everyday language, "speed" and "velocity" are often used interchangeably. In physics and calculus, they mean different things!

- **Velocity** $v(t)$ is a signed quantity. It can be positive or negative, indicating direction.
- **Speed** $|v(t)|$ is the absolute value of velocity. It's always non-negative.

$$\text{Speed} = |v(t)| = |s'(t)|$$

Speed tells you how fast you're going without regard to direction. Velocity tells you both how fast AND which way.

**Example:** If $v(t) = -15$ m/s:

- Velocity is $-15$ m/s (moving in the negative direction)
- Speed is $|-15| = 15$ m/s (moving at 15 m/s)

!!! tip "When Does Direction Matter?"
    For many practical problems, we want to know if an object is moving "forward" or "backward" (positive or negative direction). Velocity gives us this information; speed does not.

## Direction of Motion

The **direction of motion** is determined by the sign of velocity:

- If $v(t) > 0$: Object is moving in the positive direction (usually right or up)
- If $v(t) < 0$: Object is moving in the negative direction (usually left or down)
- If $v(t) = 0$: Object is momentarily at rest (might be changing direction!)

When velocity equals zero, the object has stopped—at least for that instant. This is often when the object changes direction.

**Example:** For $v(t) = t^2 - 4t + 3 = (t-1)(t-3)$:

- $v(t) = 0$ when $t = 1$ or $t = 3$
- For $0 < t < 1$: $v(t) > 0$ (moving positive)
- For $1 < t < 3$: $v(t) < 0$ (moving negative)
- For $t > 3$: $v(t) > 0$ (moving positive again)

The object changes direction at $t = 1$ (from positive to negative) and again at $t = 3$ (from negative to positive).

#### Diagram: Direction and Speed Analyzer

<iframe src="../../sims/direction-of-motion-analyzer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Direction of Motion Analyzer MicroSim Specification</summary>
Type: microsim

Purpose: Analyze when an object is moving in the positive vs negative direction and when it changes direction.

Learning Objective: Students will determine direction of motion from velocity function (Bloom Level 4: Analyze)

Bloom Taxonomy Verb: analyze, determine, interpret

Visual elements:

- Number line with animated particle
- Velocity graph with positive region shaded one color, negative another
- Direction arrows appearing on the number line
- Timeline showing intervals of positive/negative motion
- Markers at points where $v(t) = 0$

Interactive controls:

- Input: Position function or velocity function
- Dropdown: Preset motion scenarios
- Play/Pause for animation
- Toggle: Show velocity sign regions

Behavior:

- Particle moves right when velocity is positive
- Particle moves left when velocity is negative
- Particle stops momentarily when velocity is zero
- Clear visual indication of direction changes

Instructional Rationale: Connecting the sign of velocity to physical direction of motion helps students understand why velocity is a signed quantity.

Implementation: p5.js with animated particle
</details>

## Speeding Up vs. Slowing Down

Here's where things get interesting! An object is:

- **Speeding up** when velocity and acceleration have the **same sign**
- **Slowing down** when velocity and acceleration have **opposite signs**

This makes sense if you think about it:

- If you're moving right ($v > 0$) and accelerating right ($a > 0$), you speed up.
- If you're moving right ($v > 0$) but accelerating left ($a < 0$), you slow down.
- If you're moving left ($v < 0$) and accelerating left ($a < 0$), you speed up (in the negative direction).
- If you're moving left ($v < 0$) but accelerating right ($a > 0$), you slow down.

| Velocity Sign | Acceleration Sign | Speed Is... |
|--------------|-------------------|-------------|
| Positive | Positive | Increasing (speeding up) |
| Positive | Negative | Decreasing (slowing down) |
| Negative | Positive | Decreasing (slowing down) |
| Negative | Negative | Increasing (speeding up) |

!!! quote "Delta Moment"
    "If I'm rolling forward and my acceleration pushes me forward too, I go faster. But if acceleration pushes against my motion, I slow down. It's all about whether velocity and acceleration are working together or fighting each other!"

**Example:** A particle moves along a line with position $s(t) = t^3 - 9t^2 + 24t$ for $t \geq 0$. When is the particle speeding up?

Step 1: Find velocity and acceleration.

$$v(t) = s'(t) = 3t^2 - 18t + 24 = 3(t^2 - 6t + 8) = 3(t-2)(t-4)$$

$$a(t) = v'(t) = 6t - 18 = 6(t-3)$$

Step 2: Find where each equals zero.

- $v(t) = 0$ when $t = 2$ or $t = 4$
- $a(t) = 0$ when $t = 3$

Step 3: Create a sign chart.

| Interval | $v(t)$ sign | $a(t)$ sign | Same/Opposite | Speeding up? |
|----------|-------------|-------------|---------------|--------------|
| $0 < t < 2$ | + | - | Opposite | Slowing down |
| $2 < t < 3$ | - | - | Same | Speeding up |
| $3 < t < 4$ | - | + | Opposite | Slowing down |
| $t > 4$ | + | + | Same | Speeding up |

The particle is speeding up on the intervals $(2, 3)$ and $(4, \infty)$.

#### Diagram: Speeding Up/Slowing Down Analyzer

<iframe src="../../sims/speed-change-analyzer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Speed Change Analyzer MicroSim Specification</summary>
Type: microsim

Purpose: Visualize when an object is speeding up vs slowing down based on velocity and acceleration signs.

Learning Objective: Students will determine when an object speeds up or slows down (Bloom Level 4: Analyze)

Bloom Taxonomy Verb: analyze, determine, evaluate

Visual elements:

- Three graphs: position, velocity, acceleration
- Color-coded regions: green when speeding up, red when slowing down
- Animated particle with speed indicator (size or color intensity)
- Sign comparison display showing $v$ and $a$ signs

Interactive controls:

- Slider: Time control
- Play/Pause animation
- Dropdown: Select position function
- Toggle: Show sign comparison table

Behavior:

- When $v$ and $a$ same sign: particle speeds up, indicator grows
- When $v$ and $a$ opposite sign: particle slows down, indicator shrinks
- Clear visual feedback on the relationship

Instructional Rationale: The sign comparison table alongside the animated motion helps students internalize the speeding up/slowing down rule.

Implementation: p5.js with color-coded indicators
</details>

## Higher Derivatives of Trigonometric Functions

Trigonometric functions have beautiful patterns when differentiated repeatedly. Let's explore these patterns.

### Derivatives of Sine

Starting with $f(x) = \sin(x)$:

$$f(x) = \sin(x)$$
$$f'(x) = \cos(x)$$
$$f''(x) = -\sin(x)$$
$$f'''(x) = -\cos(x)$$
$$f^{(4)}(x) = \sin(x)$$

After four derivatives, we're back to $\sin(x)$! The pattern cycles with period 4:

$$\sin(x) \rightarrow \cos(x) \rightarrow -\sin(x) \rightarrow -\cos(x) \rightarrow \sin(x) \rightarrow \cdots$$

### Derivatives of Cosine

For $g(x) = \cos(x)$:

$$g(x) = \cos(x)$$
$$g'(x) = -\sin(x)$$
$$g''(x) = -\cos(x)$$
$$g'''(x) = \sin(x)$$
$$g^{(4)}(x) = \cos(x)$$

Again, the pattern repeats every 4 derivatives.

### Finding the nth Derivative

Because of this cycling, we can find any derivative of sine or cosine by looking at the remainder when $n$ is divided by 4.

For $\frac{d^n}{dx^n}[\sin(x)]$, compute $n \mod 4$:

| $n \mod 4$ | Result |
|------------|--------|
| 0 | $\sin(x)$ |
| 1 | $\cos(x)$ |
| 2 | $-\sin(x)$ |
| 3 | $-\cos(x)$ |

**Example:** Find $\frac{d^{43}}{dx^{43}}[\sin(x)]$.

Since $43 = 4 \times 10 + 3$, we have $43 \mod 4 = 3$.

Therefore, $\frac{d^{43}}{dx^{43}}[\sin(x)] = -\cos(x)$.

!!! tip "Why This Pattern?"
    The cycling happens because $\frac{d}{dx}[\sin x] = \cos x$ and $\frac{d}{dx}[\cos x] = -\sin x$. After four steps, the two negative signs cancel out, bringing us back to the start.

### Exponential Functions Stay the Same

As a contrast, recall that $\frac{d}{dx}[e^x] = e^x$. So all higher derivatives of $e^x$ are also $e^x$:

$$\frac{d^n}{dx^n}[e^x] = e^x \quad \text{for all } n \geq 1$$

This makes $e^x$ unique—it's the only function (up to constant multiples) that equals its own derivative!

## Worked Examples: Complete Motion Analysis

Let's put everything together with a complete motion analysis problem.

**Problem:** A particle moves along a horizontal line with position function $s(t) = 2t^3 - 15t^2 + 24t + 5$ for $t \geq 0$, where $s$ is in feet and $t$ is in seconds.

Find:
(a) The velocity and acceleration functions
(b) When the particle is at rest
(c) When the particle changes direction
(d) When the particle is speeding up
(e) The total distance traveled in the first 5 seconds

**Solution:**

**(a) Velocity and acceleration:**

$$v(t) = s'(t) = 6t^2 - 30t + 24 = 6(t^2 - 5t + 4) = 6(t-1)(t-4)$$

$$a(t) = v'(t) = 12t - 30 = 6(2t - 5)$$

**(b) When is the particle at rest?**

Set $v(t) = 0$:

$$6(t-1)(t-4) = 0$$

$$t = 1 \text{ or } t = 4 \text{ seconds}$$

**(c) When does the particle change direction?**

The particle changes direction when velocity changes sign. Check the sign of $v(t)$ in each interval:

- For $0 < t < 1$: $v(t) > 0$ (moving right)
- For $1 < t < 4$: $v(t) < 0$ (moving left)
- For $t > 4$: $v(t) > 0$ (moving right)

The particle changes direction at $t = 1$ and $t = 4$ seconds.

**(d) When is the particle speeding up?**

Find where $a(t) = 0$: $6(2t - 5) = 0 \Rightarrow t = 2.5$

Create a sign chart:

| Interval | $v(t)$ | $a(t)$ | Speeding up? |
|----------|--------|--------|--------------|
| $(0, 1)$ | + | - | No (slowing) |
| $(1, 2.5)$ | - | - | Yes |
| $(2.5, 4)$ | - | + | No (slowing) |
| $(4, \infty)$ | + | + | Yes |

**The particle speeds up on $(1, 2.5) \cup (4, \infty)$.**

**(e) Total distance in first 5 seconds:**

Since direction changes at $t = 1$ and $t = 4$, we calculate displacement in each segment and take absolute values:

$$s(0) = 5$$
$$s(1) = 2(1) - 15(1) + 24(1) + 5 = 2 - 15 + 24 + 5 = 16$$
$$s(4) = 2(64) - 15(16) + 24(4) + 5 = 128 - 240 + 96 + 5 = -11$$
$$s(5) = 2(125) - 15(25) + 24(5) + 5 = 250 - 375 + 120 + 5 = 0$$

Distance traveled:

$$|s(1) - s(0)| + |s(4) - s(1)| + |s(5) - s(4)|$$
$$= |16 - 5| + |-11 - 16| + |0 - (-11)|$$
$$= 11 + 27 + 11 = 49 \text{ feet}$$

!!! note "Distance vs. Displacement"
    **Displacement** from $t = 0$ to $t = 5$ is $s(5) - s(0) = 0 - 5 = -5$ feet.
    **Total distance traveled** is 49 feet (sum of absolute displacements).
    The particle ended up only 5 feet from where it started, but it traveled much farther!

## Practical Applications

Higher-order derivatives appear throughout physics and engineering:

- **Free Fall:** Position is $s(t) = -\frac{1}{2}gt^2 + v_0t + s_0$, velocity is $v(t) = -gt + v_0$, acceleration is $a(t) = -g$ (constant).

- **Simple Harmonic Motion:** Position is $s(t) = A\cos(\omega t)$. Velocity is $v(t) = -A\omega\sin(\omega t)$. Acceleration is $a(t) = -A\omega^2\cos(\omega t) = -\omega^2 s(t)$. The acceleration is proportional to position!

- **Projectile Motion:** Second derivatives tell us about gravitational acceleration.

- **Economics:** The first derivative of a cost function is marginal cost. The second derivative tells us if marginal cost is increasing or decreasing.

## Summary: The Derivative Tower

Let's visualize the complete picture:

| Level | Function | Physical Meaning | Units |
|-------|----------|------------------|-------|
| Base | $s(t)$ | Position | m |
| 1st derivative | $s'(t) = v(t)$ | Velocity | m/s |
| 2nd derivative | $s''(t) = a(t)$ | Acceleration | m/s² |
| 3rd derivative | $s'''(t) = j(t)$ | Jerk | m/s³ |

## Key Takeaways

- **Higher-order derivatives** are found by differentiating repeatedly. The second derivative is the derivative of the first derivative.

- **Notation:** Prime notation uses $f'$, $f''$, $f'''$, $f^{(n)}$. Leibniz notation uses $\frac{dy}{dx}$, $\frac{d^2y}{dx^2}$, etc.

- **Velocity** is the first derivative of position: $v(t) = s'(t)$

- **Acceleration** is the second derivative of position: $a(t) = s''(t) = v'(t)$

- **Jerk** is the third derivative of position: $j(t) = s'''(t)$

- **Speed** is the absolute value of velocity: $|v(t)|$

- **Direction of motion** is determined by the sign of velocity

- An object is **speeding up** when $v$ and $a$ have the same sign, and **slowing down** when they have opposite signs

- **Trigonometric derivatives** cycle with period 4: $\sin \to \cos \to -\sin \to -\cos \to \sin$

??? question "Check Your Understanding: A ball is thrown upward with position $s(t) = -16t^2 + 48t + 4$ feet. When is the ball speeding up?"

    Step 1: Find velocity and acceleration.

    $v(t) = -32t + 48$
    $a(t) = -32$ (constant negative—gravity!)

    Step 2: Find when velocity is zero.

    $-32t + 48 = 0 \Rightarrow t = 1.5$ seconds

    Step 3: Analyze signs.

    - For $0 < t < 1.5$: $v(t) > 0$ and $a(t) < 0$ → opposite signs → slowing down
    - For $t > 1.5$: $v(t) < 0$ and $a(t) < 0$ → same signs → speeding up

    **Answer:** The ball is speeding up for $t > 1.5$ seconds (after it reaches the peak and starts falling back down).

    This makes physical sense: on the way up, gravity slows the ball. After the peak, gravity speeds the ball up as it falls.

[See Annotated References](./references.md)
