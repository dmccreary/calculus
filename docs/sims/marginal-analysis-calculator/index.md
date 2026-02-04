---
title: Marginal Analysis Calculator
description: Interactive visualization for calculating and interpreting marginal cost, revenue, and profit for economic decision-making using derivatives
image: /sims/marginal-analysis-calculator/marginal-analysis-calculator.png
---

# Marginal Analysis Calculator

<iframe src="main.html" height="640px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit with p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

This visualization demonstrates the economic application of derivatives through **marginal analysis**. By showing cost, revenue, and profit functions alongside their marginal (derivative) values, students connect the abstract concept of "slope at a point" with practical business decision-making.

The three graphs display:

- **Cost function** $C(x)$ - total cost of producing $x$ units
- **Revenue function** $R(x)$ - total revenue from selling $x$ units
- **Profit function** $P(x) = R(x) - C(x)$ - total profit at production level $x$

### The Mathematical Models

**Cost Function (Quadratic):**
$$C(x) = ax^2 + bx + c$$

Where $c$ represents fixed costs and the quadratic term models increasing marginal costs due to factors like overtime, equipment strain, or diminishing efficiency.

**Revenue Function:**
$$R(x) = px - qx^2$$

The quadratic term accounts for price reductions needed to sell larger quantities (the law of diminishing marginal revenue).

**Profit Function:**
$$P(x) = R(x) - C(x)$$

### Marginal Functions (Derivatives)

The **marginal** values represent the rate of change - how much each quantity changes per additional unit produced:

- **Marginal Cost:** $MC = C'(x) = 2ax + b$
- **Marginal Revenue:** $MR = R'(x) = p - 2qx$
- **Marginal Profit:** $MP = P'(x) = MR - MC$

!!! quote "Delta Moment"
    "See those tangent lines on each graph? Their slopes tell the whole story! When the profit tangent is tilted up, making more stuff increases profit. When it's flat - that's the sweet spot where I maximize profit!"

### The Golden Rule of Economics

**Produce where MC = MR**

At this point:
- $MP = MR - MC = 0$ (profit tangent line is horizontal)
- $P(x)$ reaches its maximum
- Producing one more unit would cost more than it earns

## How to Use

1. **Production Slider**: Adjust the production level from 0 to 1000 units
2. **Display Mode**: Toggle between showing marginal tangent lines, total functions, or both
3. **Find Optimal**: Automatically animate to the profit-maximizing production level
4. **Info Panel**: View real-time calculations of MC, MR, MP and total values

### What to Observe

- The **tangent lines** rotate as production changes, visualizing the marginal values
- The **profit zone** (green shading) shows where revenue exceeds cost
- The **star marker** indicates the optimal production point
- The **decision indicator** tells you whether to increase or decrease production

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. **Calculate** marginal cost, marginal revenue, and marginal profit given cost and revenue functions (Bloom Level 3: Apply)
2. **Interpret** marginal values as slopes of tangent lines on economic graphs
3. **Apply** the MC = MR rule to find optimal production levels
4. **Explain** why profit is maximized when marginal profit equals zero

### Prerequisite Knowledge

- Understanding of derivatives as rates of change
- Ability to find derivatives of polynomial functions
- Basic understanding of cost, revenue, and profit concepts

### Suggested Activities

1. **Predict and Verify**: Before using the "Find Optimal" button, have students calculate where MC = MR algebraically, then verify with the simulation.

2. **What-If Analysis**: Discuss how changes in fixed costs (parameter c) affect the break-even points but not the optimal production level.

3. **Real-World Connection**: Research actual business scenarios where marginal analysis guides production decisions.

4. **Graphical Reasoning**: When is the profit function increasing? Decreasing? Connect this to the sign of MP.

### Discussion Questions

1. Why does the optimal production point occur where MC = MR rather than where profit equals revenue?

2. If marginal cost is always positive but marginal revenue becomes negative at high quantities, what does this tell us about the market?

3. How would the graphs change if there were no fixed costs (c = 0)?

4. What business situations might cause the cost function to be cubic rather than quadratic?

!!! quote "Delta's Economic Adventure"
    "Every extra widget I make has a cost (MC) and earns money (MR). As long as MR > MC, I'm adding to my profit pile! But the moment MC catches up to MR... that's my signal to stop. Economics meets calculus!"

### Assessment Questions

1. Given $C(x) = 0.001x^2 + 5x + 1000$ and $R(x) = 15x - 0.002x^2$, find the optimal production level.

2. At $x = 300$ units, if MC = \$8/unit and MR = \$12/unit, should the company increase or decrease production? Explain using marginal profit.

3. Explain geometrically why the profit curve has a horizontal tangent at the point where MC = MR.

## Technical Notes

The simulation uses these default parameters:
- Cost: $C(x) = 0.00005x^2 + 0.02x + 500$
- Revenue: $R(x) = 0.15x - 0.00003x^2$

The optimal production is found by solving $MC = MR$:
$$2(0.00005)x + 0.02 = 0.15 - 2(0.00003)x$$
$$0.0001x + 0.00006x = 0.13$$
$$x = \frac{0.13}{0.00016} \approx 813 \text{ units}$$

## Embedding

```html
<iframe src="https://dmccreary.github.io/calculus/sims/marginal-analysis-calculator/main.html"
        height="640px" width="100%" scrolling="no"></iframe>
```

## References

- [Marginal Cost - Wikipedia](https://en.wikipedia.org/wiki/Marginal_cost)
- [Marginal Revenue - Wikipedia](https://en.wikipedia.org/wiki/Marginal_revenue)
- [Profit Maximization - Wikipedia](https://en.wikipedia.org/wiki/Profit_maximization)
- [Derivative Applications in Economics - Khan Academy](https://www.khanacademy.org/economics-finance-domain/microeconomics)
