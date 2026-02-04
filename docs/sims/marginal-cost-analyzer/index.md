---
title: Marginal Cost Analyzer
description: Interactive MicroSim that calculates and interprets marginal cost as the derivative of the cost function, comparing it to actual cost differences across different cost models.
quality_score: 90
image: /sims/marginal-cost-analyzer/marginal-cost-analyzer.png
og:image: /sims/marginal-cost-analyzer/marginal-cost-analyzer.png
twitter:image: /sims/marginal-cost-analyzer/marginal-cost-analyzer.png
social:
   cards: false
---
# Marginal Cost Analyzer

<iframe src="main.html" height="620px" width="100%" scrolling="no"></iframe>

[Run the Marginal Cost Analyzer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Marginal Cost Analyzer with the p5.js editor](https://editor.p5js.org/)

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/marginal-cost-analyzer/main.html" height="620px" scrolling="no"></iframe>
```

## Description

This MicroSim demonstrates one of the most important real-world applications of derivatives: **marginal cost analysis**. In economics and business, the marginal cost is the cost of producing one additional unit, and it turns out to be precisely the derivative of the total cost function.

**The Core Insight**: If C(x) represents the total cost of producing x units, then:

- **Marginal Cost** = C'(x) = the derivative of the cost function
- **Actual cost of next unit** = C(x+1) - C(x) = the discrete difference

The marginal cost C'(x) is an excellent approximation of the actual cost difference, and this approximation gets better as production scales increase.

!!! quote "Delta Moment"
    "When I roll along a cost curve, my tilt tells me how fast costs are changing. That tilt IS the marginal cost. And here's the cool part - it's almost exactly what you'd pay for the next unit!"

## How to Use

1. **Adjust Production Level**: Drag the "Units" slider to see how marginal cost changes at different production levels
2. **Change Cost Model**: Click the "Model" button to switch between Linear, Quadratic, and Cubic cost functions
3. **Toggle View**: Switch between viewing the Cost function C(x) and the Marginal Cost function C'(x)
4. **Modify Coefficients**: Use the a, b, c sliders to experiment with different cost structures:
   - **a**: Fixed costs (costs you pay even with zero production)
   - **b**: Variable cost per unit (linear component)
   - **c**: Rate at which costs accelerate (quadratic component)
5. **Compare**: Watch the bar chart to see how closely marginal cost approximates the actual cost of the next unit

## Understanding the Display

### Left Panel: Graph

- **Cost View**: Shows C(x) with a tangent line at current production. The tangent line's slope equals the marginal cost.
- **Marginal Cost View**: Shows C'(x) directly, making trends easier to see.

### Top Right: Bar Chart Comparison

Compares two values at the current production level:

- **C'(x)**: The marginal cost (derivative)
- **Delta C**: The actual cost difference C(x+1) - C(x)

### Middle Right: Data Table

Shows x, C(x), C'(x), and Delta C for values around your current production level. Watch how closely the marginal cost matches the actual cost difference.

### Bottom Right: Business Insights Panel

Real business intelligence derived from the math:

- **MC Trend**: Is marginal cost increasing (diseconomies of scale) or decreasing (economies of scale)?
- **Average Cost**: Total cost divided by units produced
- **MC vs Average**: When MC < Average Cost, average cost is falling - keep producing.

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Calculate** marginal cost as the derivative of a cost function (Bloom Level 3)
2. **Interpret** what marginal cost tells us about production decisions (Bloom Level 2)
3. **Compare** marginal cost to actual cost differences and explain why they're similar (Bloom Level 4)
4. **Apply** marginal cost analysis to make business recommendations (Bloom Level 3)

### Bloom's Taxonomy Level

**Apply (Level 3)**: Students calculate marginal cost, interpret its business meaning, and compare to actual costs.

### Suggested Activities

**Activity 1: Discovery (10 minutes)**

With the default quadratic model:

1. Set x = 10. Calculate C'(10) by hand using the power rule. Does it match the display?
2. Calculate C(11) - C(10) by hand. How close is it to C'(10)?
3. Move to x = 30. Repeat. Is the approximation better or worse at higher production?

**Activity 2: Cost Model Exploration (10 minutes)**

Compare the three cost models:

1. **Linear**: What happens to marginal cost as production increases? Why?
2. **Quadratic (c > 0)**: Does marginal cost increase or decrease? What business situation does this model?
3. **Quadratic (c < 0)**: Set c = -0.2. What happens to marginal cost? Is this realistic long-term?

**Activity 3: Business Decision Making (15 minutes)**

Scenario: You sell widgets for $25 each.

1. With the default settings, find the production level where marginal cost equals $25. This is the profit-maximizing quantity. Why?
2. If you produce below this level, should you make more or fewer widgets? Use the marginal cost to explain.
3. If you produce above this level, what happens to profit on each additional unit?

**Activity 4: Real-World Application (10 minutes)**

Discussion questions:

1. Why might a factory experience increasing marginal costs (c > 0)? Think about overtime, equipment wear, supply constraints.
2. Why might digital goods have decreasing marginal costs? Think about Netflix or Spotify.
3. How does understanding marginal cost help businesses set prices?

### Prerequisites

- Understanding of derivatives and the power rule
- Basic familiarity with cost concepts (fixed vs. variable costs)
- Ability to interpret graphs

### Assessment

**Quick Check**: Given C(x) = 200 + 15x + 0.3x^2:

1. What is the marginal cost function C'(x)?
2. What is the marginal cost at x = 20 units?
3. Calculate C(21) - C(20). How close is it to your answer in #2?
4. At what production level is marginal cost equal to $27?

**Success Criteria**: Students correctly apply the power rule to find C'(x) = 15 + 0.6x, evaluate it at specific points, and explain why the derivative approximates the discrete difference.

### Time Required

35-45 minutes for full exploration and discussion

## The Math Behind Marginal Cost

For a cost function C(x):

| Cost Model | C(x) | Marginal Cost C'(x) |
|------------|------|---------------------|
| Linear | a + bx | b (constant) |
| Quadratic | a + bx + cx^2 | b + 2cx |
| Cubic | a + bx + cx^2 + dx^3 | b + 2cx + 3dx^2 |

**Why does C'(x) approximate C(x+1) - C(x)?**

By definition of the derivative:
$$C'(x) = \lim_{h \to 0} \frac{C(x+h) - C(x)}{h}$$

When h = 1 (producing one more unit):
$$C(x+1) - C(x) \approx C'(x) \cdot 1 = C'(x)$$

The approximation improves as the "unit" becomes small relative to total production - exactly what happens at scale.

## References

- [Khan Academy: Marginal Cost and Derivatives](https://www.khanacademy.org/economics-finance-domain/microeconomics)
- [Paul's Online Math Notes: Business Applications](https://tutorial.math.lamar.edu/classes/calci/businessapps.aspx)
- AP Calculus AB/BC Course Description: Applications of Derivatives
