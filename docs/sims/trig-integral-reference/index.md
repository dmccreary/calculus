---
title: Trig Integral Reference
description: Interactive reference showing all six basic trig integrals with visual connections to their derivatives, including quiz mode for self-testing.
quality_score: 90
image: /sims/trig-integral-reference/trig-integral-reference.png
og:image: /sims/trig-integral-reference/trig-integral-reference.png
twitter:image: /sims/trig-integral-reference/trig-integral-reference.png
social:
   cards: false
---
# Trig Integral Reference

<iframe src="main.html" height="582" scrolling="no"></iframe>

[Run the Trig Integral Reference MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Trig Integral Reference MicroSim with the p5.js editor](https://editor.p5js.org/)

Place the following line in your website to include this in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/trig-integral-reference/main.html" height="582" scrolling="no"></iframe>
```

## Description

This interactive reference MicroSim helps students memorize the integrals of all six basic trigonometric forms. Each card shows the integrand and its antiderivative, with color coding to highlight which results have negative signs.

### The Six Basic Trig Integrals

| Integrand | Antiderivative |
|-----------|----------------|
| sin(x) | -cos(x) + C |
| cos(x) | sin(x) + C |
| sec²(x) | tan(x) + C |
| csc²(x) | -cot(x) + C |
| sec(x)tan(x) | sec(x) + C |
| csc(x)cot(x) | -csc(x) + C |

### Derivative-Integral Relationship

The key insight is that integration reverses differentiation. Each of these integrals can be verified by taking the derivative of the antiderivative:

- d/dx[-cos(x)] = sin(x)
- d/dx[sin(x)] = cos(x)
- d/dx[tan(x)] = sec²(x)
- d/dx[-cot(x)] = csc²(x)
- d/dx[sec(x)] = sec(x)tan(x)
- d/dx[-csc(x)] = csc(x)cot(x)

### Color Coding

- **Blue cards**: Antiderivatives that are positive (no negative sign)
- **Red cards**: Antiderivatives that have a negative sign

This color pattern reinforces an important memory aid: the "co-functions" (those starting with "co-" or involving cosecant/cotangent) typically produce negative results when integrated.

## Interactive Features

- **Click cards**: Click any card to reveal or select it for details
- **Hover for tips**: Hover over a card to see a memory aid for that integral
- **Show Verification**: Toggle to display the derivative check for each antiderivative
- **Quiz Mode**: Test yourself by typing the antiderivative before seeing the answer
- **Show All / Hide All**: Quickly reveal or hide all antiderivatives

## Lesson Plan

### Learning Objective

Students will recall the integrals of the six basic trigonometric forms (Bloom Level 1: Remember).

### Grade Level

High School AP Calculus, College Calculus II

### Duration

15-20 minutes for initial learning, then 5 minutes daily for reinforcement

### Prerequisites

- Understanding of trigonometric functions
- Knowledge of basic derivatives
- Introduction to antiderivatives and indefinite integrals

### Activities

#### Activity 1: Introduction to the Relationship (5 minutes)

1. Click each card to reveal all six integrals
2. Toggle "Show Verification" to see how each antiderivative checks out
3. Discuss: Integration is the reverse of differentiation
4. Notice the pattern: taking d/dx of the right side gives you the left side

#### Activity 2: Pattern Recognition (5 minutes)

1. Use "Show All" to display all integrals at once
2. Identify patterns with students:
   - sin/cos are related (integration swaps them with a sign change)
   - sec² integrates to tan (because d/dx[tan] = sec²)
   - csc² integrates to -cot (the "co-" brings a negative)
3. Hover over each card to read the memory aids

#### Activity 3: The Negative Sign Rule (5 minutes)

Discuss why certain integrals have negative signs:

- **Co-function pattern**: Functions involving cosecant or cotangent often produce negative results
- **Verification method**: When unsure, take the derivative of your answer to check

#### Activity 4: Quiz Practice (10 minutes)

1. Click "Quiz Mode" to enter testing mode
2. Click any unrevealed card to attempt it
3. Type your answer (include "+ C" for full credit!)
4. Press Enter to check
5. Track your score and aim for 6/6

### Assessment

- **Formative**: Quiz mode score tracking
- **Summative**: Written quiz - write all 6 integrals from memory in under 2 minutes

### Memory Tips to Share

1. **Verification habit**: Always check your integral by differentiating the answer
2. **Co-function negative**: csc² and csc(x)cot(x) both give negative antiderivatives
3. **Squared functions**: sec² and csc² integrate to tan and -cot (the tangent family)
4. **Product functions**: sec(x)tan(x) and csc(x)cot(x) integrate to sec and -csc

!!! quote "Delta Moment"
    "Integration is like retracing your steps. If I know that taking a derivative got me HERE,
    then integrating takes me back to where I started. These six integrals are just the
    derivative rules read backwards!"

## Connection to Derivatives

This MicroSim pairs naturally with the [Trig Derivatives Flashcards](../trig-derivatives-card/index.md). Students who have mastered the derivatives will find these integrals are simply the reverse process:

| If d/dx[F(x)] = f(x) | Then integral of f(x) dx = F(x) + C |
|----------------------|-------------------------------------|
| d/dx[-cos(x)] = sin(x) | integral of sin(x) dx = -cos(x) + C |
| d/dx[sin(x)] = cos(x) | integral of cos(x) dx = sin(x) + C |
| d/dx[tan(x)] = sec²(x) | integral of sec²(x) dx = tan(x) + C |
| d/dx[-cot(x)] = csc²(x) | integral of csc²(x) dx = -cot(x) + C |
| d/dx[sec(x)] = sec(x)tan(x) | integral of sec(x)tan(x) dx = sec(x) + C |
| d/dx[-csc(x)] = csc(x)cot(x) | integral of csc(x)cot(x) dx = -csc(x) + C |

## References

- [Integrals of Trigonometric Functions - Khan Academy](https://www.khanacademy.org/math/integral-calculus/ic-integration/ic-integral-trig/v/antiderivatives-and-indefinite-integrals)
- [Trig Integration Formulas - Math is Fun](https://www.mathsisfun.com/calculus/integration-rules.html)
- [AP Calculus Curriculum Framework](https://apcentral.collegeboard.org/courses/ap-calculus-ab)
