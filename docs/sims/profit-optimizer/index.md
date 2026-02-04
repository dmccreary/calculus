---
title: Profit Optimizer
description: Interactive MicroSim showing the relationship between revenue, cost, and profit functions to help students understand optimal production levels.
quality_score: 85
image: /sims/profit-optimizer/profit-optimizer.png
og:image: /sims/profit-optimizer/profit-optimizer.png
twitter:image: /sims/profit-optimizer/profit-optimizer.png
social:
   cards: false
---
# Profit Optimizer

<iframe src="main.html" height="552px" scrolling="no"></iframe>

[Run the Profit Optimizer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Profit Optimizer MicroSim with the p5.js editor](https://editor.p5js.org/)

## Embedding This MicroSim

Place the following line in your website to include this MicroSim:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/profit-optimizer/main.html" height="552px" scrolling="no"></iframe>
```

## Description

This MicroSim helps students understand the fundamental relationships between **revenue**, **cost**, and **profit** functions in economics and business calculus. By visualizing all three curves simultaneously, students can see how profit is the gap between revenue and cost, and discover why the maximum profit occurs where marginal revenue equals marginal cost.

### Key Concepts Visualized

- **Revenue R(x)**: The green curve shows total revenue as a function of quantity sold. Revenue follows a quadratic pattern because price decreases as quantity increases (demand curve effect).

- **Cost C(x)**: The red curve shows total cost, which includes fixed costs (y-intercept) plus variable costs that increase linearly with quantity.

- **Profit P(x)**: The blue curve shows profit, which is simply R(x) - C(x). The profit curve reveals where the business makes money (P > 0) and where it loses money (P < 0).

- **Break-even Points**: Orange markers show where R(x) = C(x), meaning profit is zero. The shaded green region between break-even points indicates profitable operation.

- **Maximum Profit**: The optimal production quantity occurs where the profit curve peaks, which mathematically is where marginal revenue equals marginal cost (MR = MC).

### Interactive Features

- **Quantity Slider**: Drag to see how revenue, cost, and profit change at different production levels
- **Cost Parameters**: Adjust fixed costs and variable costs to see their effect on profitability
- **Demand Parameters**: Change base price and demand slope to explore different market conditions
- **Explore/Challenge Mode**: Toggle between seeing all information (Explore) or hiding the profit curve to test your understanding (Challenge)
- **Show Profit Toggle**: Turn the profit curve on/off to focus on the R-C relationship
- **Find Max Profit Button**: Automatically jump to the optimal production level

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Differentiate** between revenue, cost, and profit functions graphically and algebraically
2. **Identify** break-even points as intersections of R(x) and C(x)
3. **Explain** why profit is maximized where MR = MC using the derivative
4. **Analyze** how changes in cost structure and demand affect optimal production

### Warm-Up (5 minutes)

1. Ask students: "If you sell more products, will you always make more profit?"
2. Discuss why the answer is "not necessarily" - explore the concept of diminishing returns

### Guided Exploration (15 minutes)

1. Start in **Explore Mode** with default parameters
2. Drag the quantity slider slowly from 0 to 100
3. Observe:
   - Where does profit first become positive? (first break-even point)
   - Where is profit at its maximum? (around x = 70)
   - Where does profit become negative again? (second break-even point)
4. Click "Find Max Profit" and note the values in the info panel

### Mathematical Connection (10 minutes)

1. Explain the economic model:
   - Price function: p(x) = p_0 - mx (price decreases with quantity)
   - Revenue: R(x) = p(x) * x = (p_0 - mx) * x = p_0*x - mx^2
   - Cost: C(x) = a + bx (fixed cost + variable cost)
   - Profit: P(x) = R(x) - C(x)

2. Derive the maximum profit condition:
   - P'(x) = R'(x) - C'(x) = 0
   - This means MR = MC (marginal revenue equals marginal cost)

### Challenge Activity (10 minutes)

1. Switch to **Challenge Mode** (profit curve hidden)
2. Give students these scenarios to solve:
   - "Find the optimal production quantity"
   - "Estimate the maximum profit"
   - "Identify the break-even points"
3. Students record their predictions, then verify with "Show Profit" button

### Extension Activities

- **Parameter Exploration**: What happens to optimal production if fixed costs increase? If variable costs decrease?
- **Real-World Connection**: Research actual demand curves for different products
- **Calculus Connection**: Derive the formulas for break-even points using the quadratic formula

### Assessment Questions

1. If fixed costs increase, what happens to the break-even points?
2. Why is the revenue curve a parabola instead of a straight line?
3. At the maximum profit point, what is the relationship between the slopes of R(x) and C(x)?
4. A business is producing 80 units. The info panel shows R > C. Should they produce more or less? Why?

## References

- [Optimization in Business and Economics](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-contextual-applications-new/ab-4-7/v/optimizing-profit) - Khan Academy
- [Profit Maximization](https://en.wikipedia.org/wiki/Profit_maximization) - Wikipedia
- [Marginal Revenue and Marginal Cost](https://www.investopedia.com/terms/m/marginalcostofproduction.asp) - Investopedia
