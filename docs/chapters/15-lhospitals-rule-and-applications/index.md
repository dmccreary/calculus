---
title: L'Hospital's Rule and Contextual Applications
description: Master L'Hospital's Rule for indeterminate forms and interpret derivatives in economics, biology, and physics contexts
generated_by: claude skill chapter-content-generator
date: 2026-02-03 15:32:00
version: 0.03
---

# L'Hospital's Rule and Contextual Applications

## Summary

This chapter covers L'Hospital's Rule for evaluating indeterminate forms and interpreting derivatives in real-world contexts. Students will learn to apply L'Hospital's Rule to 0/0 and infinity/infinity forms, as well as convert other indeterminate forms (0·∞, 1^∞, etc.) to apply the rule. The chapter also emphasizes understanding derivative units and interpreting rates of change in economics, biology, and physics contexts. After completing this chapter, students will be able to evaluate complex limits and explain what derivatives mean in applications.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

1. Marginal Revenue
2. Marginal Profit
3. Economics Interpretation
4. Units of Derivative
5. Rate Interpretation
6. Derivative in Context
7. Population Rate
8. Temperature Rate
9. Concentration Rate
10. L'Hospital's Rule
11. L'Hospital Conditions
12. Zero Over Zero Apply
13. Inf Over Inf Apply
14. Indeterminate Products
15. Zero Times Infinity
16. Indeterminate Powers
17. One to Infinity
18. Repeated L'Hospital
19. Verify L'Hospital

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Evaluating Limits](../03-evaluating-limits/index.md)
- [Chapter 8: Basic Derivative Rules](../08-basic-derivative-rules/index.md)
- [Chapter 14: Related Rates and Linear Approximation](../14-related-rates-and-linear-approximation/index.md)

---

## Introduction: When Math Gets Weird

You've learned plenty of techniques for evaluating limits—factoring, rationalizing, using the Squeeze Theorem. But sometimes you encounter limits that seem to defy all your tricks. You plug in the value and get $\frac{0}{0}$ or $\frac{\infty}{\infty}$, and no amount of algebraic manipulation seems to help.

That's where L'Hospital's Rule comes in. It's a remarkably elegant technique that transforms impossible-looking limits into manageable ones using derivatives. And the best part? It often works in just one or two steps.

!!! quote "Delta Moment"
    "When I first saw $\frac{0}{0}$, my circuits nearly fried. But then I learned L'Hospital's Rule, and now I call it my *secret weapon*. When division fails, derivatives save the day!"

But calculus isn't just about clever limit tricks. The second half of this chapter explores what derivatives actually *mean* in real-world contexts. When an economist talks about "marginal revenue" or a biologist discusses "population growth rate," they're using derivatives—and understanding the units and interpretation is just as important as computing the answer.

---

## Part 1: L'Hospital's Rule

### The Big Idea: Derivatives to the Rescue

L'Hospital's Rule (pronounced "Low-pee-TAHL") gives us a powerful way to evaluate limits that result in indeterminate forms. The rule is named after Guillaume de l'Hospital, a French mathematician who published it in 1696—though it was actually discovered by his teacher, Johann Bernoulli.

!!! tip "L'Hospital's Rule"
    If $\lim_{x \to c} f(x) = 0$ and $\lim_{x \to c} g(x) = 0$ (or both approach $\pm\infty$), and if $\lim_{x \to c} \frac{f'(x)}{g'(x)}$ exists, then:

    $$\lim_{x \to c} \frac{f(x)}{g(x)} = \lim_{x \to c} \frac{f'(x)}{g'(x)}$$

In plain English: when you have $\frac{0}{0}$ or $\frac{\infty}{\infty}$, you can take the derivative of the top and the derivative of the bottom separately, then try the limit again.

### L'Hospital's Conditions: When Can You Use It?

Before applying L'Hospital's Rule, you must verify that the conditions are met. Using it incorrectly can give you completely wrong answers!

**The Three Conditions:**

1. **Indeterminate form required**: Direct substitution must give $\frac{0}{0}$ or $\frac{\pm\infty}{\pm\infty}$
2. **Differentiable functions**: Both $f(x)$ and $g(x)$ must be differentiable near $c$
3. **Limit must exist**: $\lim_{x \to c} \frac{f'(x)}{g'(x)}$ must exist (or be $\pm\infty$)

| Scenario | Can Use L'Hospital? |
|----------|---------------------|
| $\frac{0}{0}$ | Yes |
| $\frac{\infty}{\infty}$ | Yes |
| $\frac{0}{\infty}$ | No (this equals 0) |
| $\frac{\infty}{0}$ | No (this is $\pm\infty$) |
| $\frac{5}{0}$ | No (this is infinite, not indeterminate) |
| $\frac{3}{7}$ | No (nothing indeterminate here) |

!!! warning "Common Mistake"
    L'Hospital's Rule is NOT the quotient rule! You differentiate the numerator and denominator *separately*, not using the quotient rule formula. The quotient rule is for finding the derivative of a quotient; L'Hospital's Rule is for evaluating *limits* of quotients.

---

### Zero Over Zero: The Classic Case

The most common application of L'Hospital's Rule is the $\frac{0}{0}$ form.

**Example 1:** Find $\lim_{x \to 0} \frac{\sin x}{x}$

**Step 1:** Check for indeterminate form.
$$\frac{\sin(0)}{0} = \frac{0}{0} \quad \checkmark$$

**Step 2:** Apply L'Hospital's Rule—differentiate top and bottom separately.
$$\lim_{x \to 0} \frac{\sin x}{x} = \lim_{x \to 0} \frac{\frac{d}{dx}[\sin x]}{\frac{d}{dx}[x]} = \lim_{x \to 0} \frac{\cos x}{1}$$

**Step 3:** Evaluate the new limit.
$$= \frac{\cos 0}{1} = \frac{1}{1} = 1$$

This confirms what we proved geometrically in Chapter 3: $\lim_{x \to 0} \frac{\sin x}{x} = 1$.

**Example 2:** Find $\lim_{x \to 2} \frac{x^2 - 4}{x - 2}$

**Step 1:** Check: $\frac{4 - 4}{2 - 2} = \frac{0}{0}$ $\checkmark$

**Step 2:** Apply L'Hospital's Rule:
$$\lim_{x \to 2} \frac{x^2 - 4}{x - 2} = \lim_{x \to 2} \frac{2x}{1} = 4$$

Compare this to factoring: $\frac{x^2 - 4}{x - 2} = \frac{(x+2)(x-2)}{x-2} = x + 2 \to 4$. Same answer, different route!

<details markdown="1">
<summary>#### Diagram: L'Hospital's Rule Visualizer</summary>

Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Illustrate

Learning Objective: Students will illustrate how L'Hospital's Rule transforms indeterminate limits by comparing the original ratio with the ratio of derivatives.

Visual elements:

- Split display showing $f(x)/g(x)$ on top and $f'(x)/g'(x)$ on bottom
- Both functions plotted on coordinate planes
- Point approaching the target x-value with real-time ratio calculation
- Side-by-side numerical display: "Original ratio" and "Derivative ratio"
- Highlighting when both ratios approach the same limit

Interactive controls:

- Example selector: "sin(x)/x", "(e^x - 1)/x", "(x^2 - 4)/(x - 2)", "Custom"
- Slider: x-value approaching target
- Toggle: "Show f(x) and g(x)" / "Show f'(x) and g'(x)" / "Show both"
- Button: "Animate approach"
- Display: Current ratio values

Behavior:

- As x approaches target, both ratios converge to the same limit
- Visual evidence that derivatives "resolve" the indeterminate form
- Red warning if conditions not met
- Step-by-step differentiation shown

Instructional Rationale: Seeing both the original and derivative ratios approach the same value builds intuition for why L'Hospital's Rule works.

Implementation: p5.js with canvas-based controls
</details>

---

### Infinity Over Infinity: Another Flavor

L'Hospital's Rule also works when both numerator and denominator approach infinity.

**Example 3:** Find $\lim_{x \to \infty} \frac{3x^2 + 5x}{7x^2 - 2}$

**Step 1:** Check: As $x \to \infty$, both top and bottom $\to \infty$. This is $\frac{\infty}{\infty}$ $\checkmark$

**Step 2:** Apply L'Hospital's Rule:
$$\lim_{x \to \infty} \frac{3x^2 + 5x}{7x^2 - 2} = \lim_{x \to \infty} \frac{6x + 5}{14x}$$

**Step 3:** Still $\frac{\infty}{\infty}$! Apply again:
$$= \lim_{x \to \infty} \frac{6}{14} = \frac{3}{7}$$

**Example 4:** Find $\lim_{x \to \infty} \frac{\ln x}{x}$

**Step 1:** As $x \to \infty$, $\ln x \to \infty$ and $x \to \infty$. This is $\frac{\infty}{\infty}$ $\checkmark$

**Step 2:** Apply L'Hospital's Rule:
$$\lim_{x \to \infty} \frac{\ln x}{x} = \lim_{x \to \infty} \frac{1/x}{1} = \lim_{x \to \infty} \frac{1}{x} = 0$$

This tells us that $x$ grows much faster than $\ln x$—a fact that's important for analyzing algorithm efficiency in computer science!

---

### Repeated L'Hospital: When Once Isn't Enough

Sometimes one application of L'Hospital's Rule gives you another indeterminate form. No problem—just apply it again!

**Example 5:** Find $\lim_{x \to 0} \frac{1 - \cos x}{x^2}$

**Step 1:** Check: $\frac{1 - 1}{0} = \frac{0}{0}$ $\checkmark$

**Step 2:** Apply L'Hospital once:
$$\lim_{x \to 0} \frac{1 - \cos x}{x^2} = \lim_{x \to 0} \frac{\sin x}{2x}$$

**Step 3:** Check: $\frac{0}{0}$ again! Apply L'Hospital a second time:
$$= \lim_{x \to 0} \frac{\cos x}{2} = \frac{1}{2}$$

**Example 6:** Find $\lim_{x \to \infty} \frac{e^x}{x^3}$

**Round 1:** $\frac{\infty}{\infty}$ $\to$ $\lim_{x \to \infty} \frac{e^x}{3x^2}$

**Round 2:** $\frac{\infty}{\infty}$ $\to$ $\lim_{x \to \infty} \frac{e^x}{6x}$

**Round 3:** $\frac{\infty}{\infty}$ $\to$ $\lim_{x \to \infty} \frac{e^x}{6} = \infty$

This shows that $e^x$ grows faster than *any* polynomial—exponential growth dominates polynomial growth!

!!! quote "Delta Moment"
    "I applied L'Hospital four times on one problem! At first I thought I was going in circles, but each round got me closer to the answer. Persistence pays off!"

---

### Verifying L'Hospital: Check Your Work

Always verify that L'Hospital's Rule was applicable and that your answer makes sense.

**Verification Checklist:**

1. Did you confirm the indeterminate form ($\frac{0}{0}$ or $\frac{\infty}{\infty}$)?
2. Did you differentiate numerator and denominator separately (not quotient rule)?
3. Is the final limit value reasonable?
4. Can you verify with a different method (factoring, graph, table)?

**Bad Example:** What if someone tries to use L'Hospital on $\lim_{x \to 0} \frac{x^2 + 1}{x}$?

Check: $\frac{0 + 1}{0} = \frac{1}{0}$ — this is NOT indeterminate! The limit doesn't exist (vertical asymptote).

If you incorrectly apply L'Hospital: $\lim_{x \to 0} \frac{2x}{1} = 0$ — WRONG!

---

### Indeterminate Products: 0 Times Infinity

What about limits like $\lim_{x \to 0^+} x \ln x$? As $x \to 0^+$, we have $x \to 0$ and $\ln x \to -\infty$. That's $0 \cdot (-\infty)$—an indeterminate product!

**Strategy:** Convert to a quotient so you can use L'Hospital's Rule.

$$0 \cdot \infty \text{ form} \implies \text{rewrite as } \frac{0}{1/\infty} \text{ or } \frac{\infty}{1/0}$$

**Example 7:** Find $\lim_{x \to 0^+} x \ln x$

**Step 1:** Identify form: $0 \cdot (-\infty)$ — indeterminate product

**Step 2:** Rewrite as a quotient:
$$x \ln x = \frac{\ln x}{1/x}$$

As $x \to 0^+$: $\ln x \to -\infty$ and $1/x \to \infty$. Now we have $\frac{-\infty}{\infty}$ $\checkmark$

**Step 3:** Apply L'Hospital's Rule:
$$\lim_{x \to 0^+} \frac{\ln x}{1/x} = \lim_{x \to 0^+} \frac{1/x}{-1/x^2} = \lim_{x \to 0^+} \frac{1/x \cdot x^2}{-1} = \lim_{x \to 0^+} (-x) = 0$$

So $\lim_{x \to 0^+} x \ln x = 0$. The zero "wins" against the infinity!

<details markdown="1">
<summary>#### Diagram: Zero Times Infinity Converter</summary>

Type: infographic

Bloom Level: Apply (L3)
Bloom Verb: Convert

Learning Objective: Students will convert indeterminate products into quotient form suitable for L'Hospital's Rule.

Visual elements:

- Flowchart showing conversion strategies
- "0 times infinity" box at top
- Two branches: "Put 0 in denominator" → $\frac{\infty}{1/0}$ and "Put infinity in denominator" → $\frac{0}{1/\infty}$
- Examples under each branch
- Tips for choosing which conversion works better

Content:

Converting $0 \cdot \infty$:

| Original Form | Method 1 | Method 2 |
|---------------|----------|----------|
| $x \ln x$ as $x \to 0^+$ | $\frac{\ln x}{1/x}$ | $\frac{x}{1/\ln x}$ |
| $x e^{-x}$ as $x \to \infty$ | $\frac{x}{e^x}$ | $\frac{e^{-x}}{1/x}$ |

Tip: Choose the conversion that makes the derivative simpler!

Implementation: Static SVG with labeled arrows and color-coded paths
</details>

---

### Indeterminate Powers: 1 to Infinity and Friends

Exponential expressions can produce their own indeterminate forms:

- $1^\infty$ (one to the infinity)
- $0^0$ (zero to the zero)
- $\infty^0$ (infinity to the zero)

These look determinate but aren't! Consider:

- $(1 + \frac{1}{n})^n \to e$ as $n \to \infty$ (not 1!)
- $x^{1/\ln x} \to e$ as $x \to 0^+$ (not 0!)

**Strategy:** Use logarithms to convert to a product, then apply previous techniques.

**Example 8:** Find $\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x$ — The Famous $e$ Limit

**Step 1:** Let $y = \left(1 + \frac{1}{x}\right)^x$

**Step 2:** Take the natural log:
$$\ln y = x \ln\left(1 + \frac{1}{x}\right)$$

**Step 3:** As $x \to \infty$: $x \to \infty$ and $\ln(1 + \frac{1}{x}) \to \ln(1) = 0$.

This is $\infty \cdot 0$ — an indeterminate product!

**Step 4:** Rewrite as a quotient:
$$\ln y = \frac{\ln(1 + 1/x)}{1/x}$$

As $x \to \infty$: $\frac{0}{0}$ $\checkmark$

**Step 5:** Apply L'Hospital's Rule:

Let $u = 1 + \frac{1}{x}$, so $\frac{d}{dx}[\ln u] = \frac{1}{u} \cdot (-\frac{1}{x^2}) = \frac{-1}{x^2(1 + 1/x)}$

And $\frac{d}{dx}[\frac{1}{x}] = -\frac{1}{x^2}$

$$\lim_{x \to \infty} \frac{\ln(1 + 1/x)}{1/x} = \lim_{x \to \infty} \frac{-1/(x^2(1 + 1/x))}{-1/x^2} = \lim_{x \to \infty} \frac{1}{1 + 1/x} = 1$$

**Step 6:** Since $\ln y \to 1$, we have $y \to e^1 = e$.

$$\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e$$

This is the definition of Euler's number $e \approx 2.71828$!

| Indeterminate Form | Strategy |
|--------------------|----------|
| $1^\infty$ | Let $y = f(x)^{g(x)}$, find $\lim \ln y$, then $e^{\lim \ln y}$ |
| $0^0$ | Same strategy with logarithms |
| $\infty^0$ | Same strategy with logarithms |

---

## Part 2: Derivatives in Context

Calculus wasn't invented just for solving math problems—it was developed to describe how things change in the real world. The second half of this chapter focuses on interpreting what derivatives *mean* in practical applications.

### Units of Derivatives: What Are You Actually Measuring?

The units of a derivative come directly from its definition:

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

The derivative is a *rate*: the units of $f$ divided by the units of $x$.

| If $f$ measures... | And $x$ measures... | Then $f'(x)$ has units... |
|-------------------|---------------------|---------------------------|
| meters | seconds | meters per second (m/s) |
| dollars | items | dollars per item ($/item) |
| population | years | people per year |
| degrees Celsius | minutes | degrees per minute (°C/min) |
| milligrams | hours | milligrams per hour (mg/hr) |

**Example:** If $P(t)$ gives position in meters and $t$ is in seconds, then $P'(t) = v(t)$ is velocity in meters per second (m/s), and $P''(t) = a(t)$ is acceleration in meters per second squared (m/s²).

!!! tip "Unit Analysis Tip"
    Always include units when interpreting derivatives. The units tell you what the number actually means. "$f'(3) = 12$" is incomplete; "$f'(3) = 12$ dollars per item" tells the whole story.

---

### Rate Interpretation: What Does the Number Mean?

Understanding the *sign* and *magnitude* of a derivative tells you about behavior:

- **Positive derivative**: The quantity is increasing
- **Negative derivative**: The quantity is decreasing
- **Large magnitude**: Rapid change
- **Small magnitude**: Slow change
- **Zero derivative**: Momentarily not changing (possible max/min)

**Example:** If temperature $T(t)$ satisfies $T'(5) = -3$ °C/min, this means:

- At $t = 5$ minutes, temperature is *decreasing*
- The rate of decrease is 3 degrees per minute
- In the next minute (approximately), temperature will drop by about 3°C

<details markdown="1">
<summary>#### Diagram: Rate Interpretation Dashboard</summary>

Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Interpret

Learning Objective: Students will interpret derivative values in context by connecting numerical rates to physical meaning.

Visual elements:

- Multiple context scenarios (population, temperature, economics, medicine)
- Graph showing function with tangent line at selected point
- Dashboard displaying: derivative value, units, verbal interpretation
- Animated "what happens next" prediction based on derivative
- Sign indicator (increasing/decreasing arrow)

Interactive controls:

- Context selector: "Population Growth", "Cooling Coffee", "Drug Concentration", "Stock Price"
- Time slider: select point where derivative is evaluated
- Toggle: "Show tangent line" / "Show rate interpretation"
- Button: "Predict next value"

Behavior:

- As time changes, derivative value updates
- Verbal interpretation changes with sign and context
- Prediction shows approximate next value using linear approximation
- Units always displayed prominently

Instructional Rationale: Practicing interpretation across multiple contexts builds transfer skills and emphasizes that derivatives describe change in any measurable quantity.

Implementation: p5.js with canvas-based controls
</details>

---

### Derivative in Context: Real-World Problems

When solving real-world derivative problems, follow this framework:

1. **Identify the variables and their units**
2. **Set up the function** relating quantities
3. **Differentiate** to find the rate of change
4. **Interpret** the answer in context (with units!)

**Example:** A spherical balloon is being inflated. Its volume is $V = \frac{4}{3}\pi r^3$ where $r$ is in centimeters. If the radius is increasing at 2 cm/sec, how fast is the volume increasing when $r = 10$ cm?

**Solution:**
$$\frac{dV}{dt} = \frac{dV}{dr} \cdot \frac{dr}{dt} = 4\pi r^2 \cdot \frac{dr}{dt}$$

At $r = 10$ cm with $\frac{dr}{dt} = 2$ cm/sec:
$$\frac{dV}{dt} = 4\pi (10)^2 (2) = 800\pi \approx 2513 \text{ cm}^3/\text{sec}$$

**Interpretation:** When the radius is 10 cm, the volume is increasing at about 2513 cubic centimeters per second.

---

### Population Rate: Biology Applications

In biology, derivatives describe how populations change over time.

If $P(t)$ represents population at time $t$, then:

- $P'(t)$ = instantaneous growth rate (individuals per unit time)
- $\frac{P'(t)}{P(t)} \times 100\%$ = percent growth rate

**Example:** A bacteria culture grows according to $P(t) = 500e^{0.4t}$, where $t$ is in hours.

$$P'(t) = 500 \cdot 0.4 \cdot e^{0.4t} = 200e^{0.4t}$$

At $t = 3$ hours:
$$P(3) = 500e^{1.2} \approx 1660 \text{ bacteria}$$
$$P'(3) = 200e^{1.2} \approx 664 \text{ bacteria/hour}$$

**Interpretation:** After 3 hours, the population is about 1660 bacteria and is growing at approximately 664 bacteria per hour.

The percent growth rate:
$$\frac{P'(3)}{P(3)} = \frac{200e^{1.2}}{500e^{1.2}} = \frac{200}{500} = 0.4 = 40\%/\text{hour}$$

Note that for exponential functions $P(t) = P_0 e^{kt}$, the percent growth rate equals the constant $k$ (here, 40% per hour).

---

### Temperature Rate: Physics Applications

Newton's Law of Cooling states that the rate of temperature change is proportional to the temperature difference from the environment:

$$\frac{dT}{dt} = -k(T - T_{env})$$

where $T$ is temperature, $T_{env}$ is environmental temperature, and $k > 0$ is a constant.

**Example:** A cup of coffee at 90°C cools in a 20°C room. If $T(t) = 20 + 70e^{-0.1t}$ (temperature in °C, time in minutes), find the cooling rate at $t = 5$ minutes.

$$T'(t) = 70 \cdot (-0.1) \cdot e^{-0.1t} = -7e^{-0.1t}$$

At $t = 5$:
$$T'(5) = -7e^{-0.5} \approx -4.25 \text{ °C/min}$$

**Interpretation:** After 5 minutes, the coffee is cooling at about 4.25 degrees per minute. The negative sign indicates the temperature is *decreasing*.

---

### Concentration Rate: Chemistry and Medicine

In pharmacology, drug concentration in the bloodstream changes over time. The derivative tells us how fast the drug is being absorbed or eliminated.

**Example:** A drug's concentration in mg/L is modeled by $C(t) = 8te^{-0.5t}$ where $t$ is hours after administration.

$$C'(t) = 8e^{-0.5t} + 8t(-0.5)e^{-0.5t} = 8e^{-0.5t}(1 - 0.5t) = 8e^{-0.5t}\left(1 - \frac{t}{2}\right)$$

Setting $C'(t) = 0$:
$$1 - \frac{t}{2} = 0 \implies t = 2 \text{ hours}$$

At $t = 2$ hours:
$$C(2) = 8(2)e^{-1} \approx 5.89 \text{ mg/L}$$

**Interpretation:** The drug concentration peaks at about 5.89 mg/L after 2 hours. Before $t = 2$, concentration is increasing ($C' > 0$); after $t = 2$, concentration is decreasing ($C' < 0$).

---

## Economics Applications: Marginal Analysis

Economics uses derivatives extensively under the name "marginal analysis." The word "marginal" means "derivative" in economics—it describes the change from producing or selling one additional unit.

### Marginal Cost

If $C(x)$ is the total cost to produce $x$ units, then:

$$\text{Marginal Cost} = C'(x)$$

This represents the cost of producing the *next* unit (approximately).

**Example:** A company's cost function is $C(x) = 5000 + 20x + 0.01x^2$ dollars for $x$ units.

$$C'(x) = 20 + 0.02x \text{ dollars/unit}$$

At $x = 500$ units:
$$C'(500) = 20 + 0.02(500) = 30 \text{ dollars/unit}$$

**Interpretation:** When producing 500 units, the 501st unit costs approximately $30 to produce.

### Marginal Revenue

If $R(x)$ is the revenue from selling $x$ units, then:

$$\text{Marginal Revenue} = R'(x)$$

This is the additional revenue from selling one more unit.

**Example:** Revenue is $R(x) = 100x - 0.05x^2$ dollars.

$$R'(x) = 100 - 0.1x \text{ dollars/unit}$$

At $x = 400$ units:
$$R'(400) = 100 - 40 = 60 \text{ dollars/unit}$$

**Interpretation:** When selling 400 units, the 401st unit generates approximately $60 in additional revenue.

### Marginal Profit

Profit is revenue minus cost: $P(x) = R(x) - C(x)$

Therefore:
$$\text{Marginal Profit} = P'(x) = R'(x) - C'(x)$$

**The Golden Rule of Economics:** Maximum profit occurs where marginal revenue equals marginal cost: $R'(x) = C'(x)$, or equivalently, $P'(x) = 0$.

**Example:** Using the functions above:
- $C(x) = 5000 + 20x + 0.01x^2$
- $R(x) = 100x - 0.05x^2$
- $P(x) = R(x) - C(x) = -5000 + 80x - 0.06x^2$

$$P'(x) = 80 - 0.12x = 0$$
$$x = \frac{80}{0.12} \approx 667 \text{ units}$$

**Interpretation:** Profit is maximized at approximately 667 units, where marginal revenue equals marginal cost.

<details markdown="1">
<summary>#### Diagram: Marginal Analysis Calculator</summary>

Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Learning Objective: Students will calculate and interpret marginal cost, revenue, and profit for economic decision-making.

Visual elements:

- Three graphs stacked vertically: Cost, Revenue, and Profit functions
- Tangent lines showing marginal values at selected production level
- Numerical display: MC, MR, MP values with units
- Profit zone highlighted (where R > C)
- Optimal production point marked

Interactive controls:

- Slider: production level x (0 to 1000 units)
- Function editors: modify coefficients of C(x) and R(x)
- Toggle: "Show marginals" / "Show totals" / "Show both"
- Button: "Find optimal production"
- Display: Break-even points, maximum profit point

Behavior:

- Tangent lines update as production level changes
- Marginal values calculated and displayed in real-time
- Visual indication when MC = MR (optimal point)
- Profit function changes color based on profitability

Instructional Rationale: Connecting the graphical tangent line interpretation with numerical marginal values reinforces understanding of derivatives in economic contexts.

Implementation: p5.js with canvas-based controls
</details>

---

### Economics Interpretation: The Big Picture

When interpreting derivatives in economics, always specify:

1. **What quantity** is changing (cost, revenue, profit, demand)
2. **With respect to what** (usually units produced/sold)
3. **The units** (dollars per unit, etc.)
4. **The practical meaning** (what should the business do?)

| Derivative | Meaning | Decision Implication |
|------------|---------|---------------------|
| $MC > MR$ | Cost exceeds revenue for next unit | Produce fewer units |
| $MC < MR$ | Revenue exceeds cost for next unit | Produce more units |
| $MC = MR$ | Marginal profit is zero | Optimal production level |
| $MP > 0$ | Profit increasing | Keep expanding |
| $MP < 0$ | Profit decreasing | Scale back production |

!!! quote "Delta's Sidequest"
    "I visited a widget factory and asked about their marginal cost. The manager said, 'Our 1000th widget costs $15 to make.' I said, 'That's calculus!' She said, 'No, that's just business.' Same thing, different name!"

---

## Summary: Connecting the Ideas

This chapter covered two major themes:

**Theme 1: L'Hospital's Rule** transforms indeterminate limits ($\frac{0}{0}$, $\frac{\infty}{\infty}$) into manageable ones by taking derivatives of the numerator and denominator separately.

**Theme 2: Derivatives in Context** emphasizes that derivatives are rates of change with specific meanings and units in real-world applications.

### L'Hospital's Rule Summary

| Form | Strategy |
|------|----------|
| $\frac{0}{0}$ or $\frac{\infty}{\infty}$ | Apply L'Hospital directly |
| $0 \cdot \infty$ | Convert to quotient first |
| $1^\infty$, $0^0$, $\infty^0$ | Use logarithms, then L'Hospital |
| Repeated indeterminate | Apply L'Hospital multiple times |

### Contextual Derivatives Summary

| Context | Derivative Meaning |
|---------|-------------------|
| Position $\to$ Velocity | Rate of position change (m/s) |
| Cost $\to$ Marginal Cost | Cost of next unit ($/unit) |
| Revenue $\to$ Marginal Revenue | Revenue from next unit ($/unit) |
| Population $\to$ Growth Rate | New individuals per time |
| Temperature $\to$ Cooling Rate | Degrees per time |
| Concentration $\to$ Rate | Change in concentration per time |

---

## Key Takeaways

1. **L'Hospital's Rule** requires checking conditions first—only use it for $\frac{0}{0}$ or $\frac{\infty}{\infty}$.

2. **Differentiate separately**: L'Hospital is NOT the quotient rule.

3. **Convert when needed**: Products ($0 \cdot \infty$) and powers ($1^\infty$) require rewriting before applying L'Hospital.

4. **Verify your answer**: Check that L'Hospital was applicable and the result is reasonable.

5. **Units matter**: The units of $f'(x)$ are always (units of $f$) / (units of $x$).

6. **Marginal = Derivative**: In economics, "marginal" cost/revenue/profit means the derivative.

7. **Interpretation requires context**: A number like "12" is meaningless without units and explanation.

---

## Looking Ahead

With L'Hospital's Rule mastered, you now have powerful tools for evaluating complex limits. In Chapter 16, we'll explore the **Mean Value Theorem** and study how to find **absolute extrema**—the highest and lowest values a function achieves on an interval. These ideas connect derivatives to optimization, which has applications from engineering to economics.

??? question "Check Your Understanding"
    1. When can you NOT use L'Hospital's Rule?
    2. Find $\lim_{x \to 0} \frac{e^x - 1}{x}$ using L'Hospital's Rule.
    3. If $C(x) = 2000 + 15x + 0.02x^2$ is a cost function in dollars, what is the marginal cost at $x = 200$ units? Include units and interpret your answer.
    4. Convert $\lim_{x \to 0^+} x^x$ into a form suitable for L'Hospital's Rule (you don't need to solve it).

??? note "Answers"
    1. You cannot use L'Hospital's Rule when: (a) the form is not indeterminate ($\frac{0}{0}$ or $\frac{\infty}{\infty}$), (b) the functions are not differentiable, or (c) the limit of the ratio of derivatives doesn't exist. For example, $\frac{5}{0}$ is not indeterminate—it's infinite.

    2. Check: $\frac{e^0 - 1}{0} = \frac{0}{0}$ $\checkmark$. Apply L'Hospital: $\lim_{x \to 0} \frac{e^x - 1}{x} = \lim_{x \to 0} \frac{e^x}{1} = e^0 = 1$.

    3. $C'(x) = 15 + 0.04x$. At $x = 200$: $C'(200) = 15 + 0.04(200) = 23$ dollars/unit. Interpretation: When producing 200 units, the 201st unit costs approximately $23 to produce.

    4. This is a $0^0$ form. Let $y = x^x$, so $\ln y = x \ln x$. As $x \to 0^+$, this is $0 \cdot (-\infty)$, which can be rewritten as $\ln y = \frac{\ln x}{1/x}$, giving $\frac{-\infty}{\infty}$. Now L'Hospital's Rule can be applied to find $\lim_{x \to 0^+} \ln y$, and then $\lim_{x \to 0^+} x^x = e^{\lim \ln y}$.
