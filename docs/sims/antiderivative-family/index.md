---
title: Family of Antiderivatives
description: Interactive visualization showing how different values of the constant C produce a family of parallel antiderivative curves. All antiderivatives of a function differ only by a constant.
quality_score: 90
image: /sims/antiderivative-family/antiderivative-family.png
og:image: /sims/antiderivative-family/antiderivative-family.png
twitter:image: /sims/antiderivative-family/antiderivative-family.png
social:
   cards: false
---
# Family of Antiderivatives

<iframe src="main.html" height="590px" scrolling="no"></iframe>

[Run the Family of Antiderivatives Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Family of Antiderivatives with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim visualizes one of the most important ideas in integral calculus: **why do we add "+ C" when finding antiderivatives?**

When you find an antiderivative (indefinite integral) of a function f(x), there isn't just one answer - there's a whole **family** of functions that all work. This simulation shows that family:

- **Top panel (purple curves)**: Multiple antiderivatives F(x) + C, each with a different value of C
- **Bottom panel (green curve)**: The original function f(x) that all these curves are antiderivatives of
- **Orange tangent lines**: At any x-value, ALL the purple curves have the same slope

**The key insight**: Adding C to a function shifts it vertically, but it doesn't change the slope at any point. Since the derivative measures slope, all these shifted curves have the same derivative.

!!! quote "Delta Moment"
    "Look at all these curves - they're like siblings! They all have the same shape, just living at different heights. When I measure my tilt at any spot, it's identical on every curve. That's why they all differentiate back to the same function. The '+ C' is like choosing which floor of the building to live on - it doesn't change how steep the stairs are!"

## How to Use

1. **Move the x slider** to explore different points and see how tangent lines stay parallel
2. **Adjust the number of curves** to see more or fewer members of the family
3. **Switch between function families** to see how this principle applies to different functions:
   - **x^2 family**: F(x) = x^2/2 + C, with derivative f(x) = x
   - **x^3 family**: F(x) = x^3/3 + C, with derivative f(x) = x^2
   - **sin(x) family**: F(x) = -cos(x) + C, with derivative f(x) = sin(x)
4. **Toggle the derivative panel** on/off to focus on just the antiderivative family

## Key Observations

### Why the "+ C"?

When you take the derivative of F(x) + C, the constant C disappears:

$$\frac{d}{dx}[F(x) + C] = F'(x) + 0 = f(x)$$

This means if F(x) is ONE antiderivative of f(x), then F(x) + C is also an antiderivative for ANY constant C.

### Visual Evidence

Watch the tangent lines as you move the x slider:
- All orange tangent lines at the same x-value are **perfectly parallel**
- The slope shown in the info box is the **same for all curves**
- This confirms that adding C doesn't change the derivative

### The Complete Picture

$$\int f(x)\,dx = F(x) + C$$

The "+ C" represents the fact that we don't know which specific antiderivative we need without additional information (like an initial condition).

## Embed This MicroSim

Place the following line in your website to include this MicroSim:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/antiderivative-family/main.html" height="590px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Explain** why antiderivatives include "+ C" (Bloom Level 2: Understand)
2. **Interpret** the family of antiderivatives as vertical shifts of each other
3. **Visualize** that all antiderivatives of a function have the same derivative
4. **Connect** the constant of integration to initial value problems

### Prerequisite Knowledge

- Understanding of derivatives as slopes
- Familiarity with tangent lines
- Basic knowledge of polynomial and trigonometric functions
- Concept of antiderivative/indefinite integral

### Activity Sequence (15-20 minutes)

#### Part 1: Discovery with x^2 Family (5 minutes)

1. Start with the x^2 family and 5 curves showing
2. Ask: "What do you notice about all these curves?"
3. Move the x slider and observe the tangent lines
4. Key questions:
   - "Are all the tangent lines parallel at the same x-value?"
   - "What is the slope when x = 2? Is it the same for all curves?"
   - "Why would adding a constant not change the slope?"

#### Part 2: Connecting to Derivatives (5 minutes)

1. Turn ON the derivative panel
2. Point out: "All these purple curves differentiate to the same green curve"
3. Move to x = 1 and compare the slope display to the value on the green curve
4. Discuss: "When we take the derivative, the constant disappears"
5. Write on board: d/dx[F(x) + C] = F'(x) + 0 = f(x)

#### Part 3: Exploring Other Families (5 minutes)

1. Switch to x^3 family - "Does the same principle hold?"
2. Switch to sin(x) family - "What about trigonometric functions?"
3. For each, verify that tangent lines remain parallel regardless of C

#### Part 4: The Big Picture (5 minutes)

1. Discuss: "Why do we write + C when finding antiderivatives?"
2. Connect to initial value problems: "If we know f(0) = 5, we can find the specific C"
3. Preview: "In definite integrals, the C will cancel out"

### Assessment

Have students complete this quick check:

1. Why do all antiderivatives of a function form a "family" of curves?
2. If F(x) = x^3 + 7 and G(x) = x^3 - 2, what is F'(x)? What is G'(x)?
3. Sketch three members of the family of antiderivatives of f(x) = 2x.
4. If we know that F(1) = 5 and F(x) is an antiderivative of f(x) = 2x, find the specific value of C.

### Extensions

- Solve initial value problems: Given f'(x) = 2x and f(0) = 3, find f(x)
- Explore why definite integrals don't have a "+ C"
- Investigate what happens to the family when f(x) = 0 (all constant functions)
- Connect to physics: If velocity v(t) is given, why might different objects have different position functions s(t)?

!!! quote "Delta's Pun Corner"
    "Adding C is like choosing your starting point on a roller coaster. You might begin higher or lower, but the ups and downs feel exactly the same. It's all relative... or should I say, all *derivative*!"

## References

- [Khan Academy: The constant of integration](https://www.khanacademy.org/math/ap-calculus-ab/ab-integration-new/ab-6-8/v/constant-of-integration)
- [3Blue1Brown: Integration and the fundamental theorem of calculus](https://www.3blue1brown.com/lessons/integration)
- AP Calculus AB/BC Course Description: Unit 6 - Integration and Accumulation of Change
