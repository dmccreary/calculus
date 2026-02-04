---
title: Inverse Trig Integral Pattern Matcher
description: Match integrands to their corresponding inverse trigonometric antiderivative types through interactive pattern recognition.
quality_score: 90
---
# Inverse Trig Integral Pattern Matcher

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

This simulation helps you develop pattern recognition skills for inverse trigonometric integrals. Instead of memorizing formulas in isolation, you'll learn to quickly identify which formula applies by recognizing the structural patterns in integrands.

**How to use:**

1. **Look at the integrand** - A random integral appears in the center display
2. **Identify the pattern** - Examine the structure of the integrand
3. **Select a category** - Click on one of the three inverse trig types
4. **Check your answer** - Click "Check" to verify your selection
5. **Review the explanation** - See why the integrand matches that pattern
6. **Continue practicing** - Click "Next" for another problem

**Keyboard shortcuts:**
- Press **1**, **2**, or **3** to select categories
- Press **Enter** to check or advance
- Press **H** to toggle hints
- Press **R** to reset

## The Three Inverse Trig Integral Patterns

### Arcsin Type

$$\int \frac{1}{\sqrt{a^2 - u^2}} \, du = \arcsin\left(\frac{u}{a}\right) + C$$

**Pattern to recognize:** Look for **1 over a square root** where inside the square root you have **a constant minus a squared term**.

Key features:
- Square root in the denominator
- Subtraction under the radical
- Constant term comes first

### Arctan Type

$$\int \frac{1}{a^2 + u^2} \, du = \frac{1}{a}\arctan\left(\frac{u}{a}\right) + C$$

**Pattern to recognize:** Look for **1 over a sum** where you have **a constant plus a squared term**. No square root.

Key features:
- No square root
- Addition of two squared terms
- Denominator only (no radical)

### Arcsec Type

$$\int \frac{1}{u\sqrt{u^2 - a^2}} \, du = \frac{1}{a}\text{arcsec}\left(\frac{|u|}{a}\right) + C$$

**Pattern to recognize:** Look for **a variable times a square root** in the denominator, where the square root contains **a squared variable minus a constant**.

Key features:
- Variable factor outside the square root
- Square root in the denominator
- Variable squared minus constant under the radical

## Lesson Plan

**Learning Objective:** Students will match integrands to their corresponding inverse trig antiderivatives (Bloom Level 4: Analyze)

### Quick Recognition Tips

| If you see... | Think... |
|---------------|----------|
| $\frac{1}{\sqrt{\text{const} - u^2}}$ | Arcsin |
| $\frac{1}{\text{const} + u^2}$ | Arctan |
| $\frac{1}{u\sqrt{u^2 - \text{const}}}$ | Arcsec |

### Common Variations

**Scaled versions** - When you see forms like $\frac{1}{\sqrt{1-4x^2}}$, recognize this as $\frac{1}{\sqrt{1-(2x)^2}}$, which is arcsin type with $u = 2x$.

**Constant multiples** - A factor in front like $\frac{3}{\sqrt{1-x^2}}$ just means you'll have $3\arcsin(x) + C$.

**Different constants** - Forms like $\frac{1}{4+x^2}$ are arctan type with $a = 2$.

### Discussion Questions

1. Why does the arcsin pattern have subtraction under the radical while arcsec has subtraction too but with the opposite order?

2. What makes arctan unique among these three patterns (no square root)?

3. If you see $\frac{1}{\sqrt{x^2 - 9}}$ without the $x$ factor in front, is this an arcsec integral? (Hint: no, this requires a different technique)

!!! quote "Delta Moment"
    "Pattern recognition is like being a detective! When I see an integrand, I first
    ask: 'Is there a square root?' If yes, I check what's inside. Constant minus
    variable? That's my arcsin territory. Variable minus constant WITH a variable
    factor outside? Arcsec zone. No square root at all? Arctan all the way!"

## Progression Strategy

**Easy mode:** Basic forms like $\frac{1}{\sqrt{1-x^2}}$ and $\frac{1}{1+x^2}$

**Medium mode:** Adds scaled forms like $\frac{1}{4+x^2}$ and $\frac{1}{\sqrt{9-x^2}}$

**Hard mode:** Includes combined variations like $\frac{1}{\sqrt{4-9x^2}}$ where both the constant and the variable have coefficients
