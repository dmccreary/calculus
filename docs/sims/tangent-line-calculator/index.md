---
title: Tangent Line Calculator
description: Given a function and a point, this MicroSim shows the step-by-step calculation of the tangent line equation, connecting symbolic and graphical representations.
quality_score: 90
image: /sims/tangent-line-calculator/tangent-line-calculator.png
og:image: /sims/tangent-line-calculator/tangent-line-calculator.png
twitter:image: /sims/tangent-line-calculator/tangent-line-calculator.png
social:
   cards: false
---
# Tangent Line Calculator

<iframe src="main.html" height="482px" scrolling="no"></iframe>

[Run the Tangent Line Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Tangent Line Calculator MicroSim with the p5.js editor](https://editor.p5js.org/)

Place the following line in your website to include this in your course.

```html
<iframe src="https://dmccreary.github.io/calculus/sims/tangent-line-calculator/main.html" height="482px" scrolling="no"></iframe>
```

## Description

This MicroSim helps students understand how to calculate the equation of a tangent line at a specific point on a function. It provides both a visual representation showing the function and its tangent line, and a step-by-step calculation panel that walks through the process.

**Key Features:**

- **Function Selection**: Choose from six common functions including polynomials (x^2, x^3), transcendental functions (sin(x), e^x), and rational/radical functions (sqrt(x), 1/x)
- **Point Selection**: Use the slider to select any x-coordinate from -4 to 4
- **Visual Feedback**: See the tangent point highlighted in red and the tangent line drawn through it
- **Step-by-Step Calculation**: Toggle the calculation panel to see:
    1. The point coordinates (a, f(a))
    2. The slope calculation f'(a)
    3. The point-slope form: y - f(a) = f'(a)(x - a)
    4. The simplified slope-intercept form: y = mx + b

!!! quote "Delta Moment"
    "See that red line? It's like I'm balancing a perfectly flat surfboard on top of the curve right at that point. The slope of my board IS the derivative. Move me around and watch how my tilt changes!"

## Lesson Plan

### Learning Objective

Students will apply the derivative to write tangent line equations (Bloom Level 3: Apply).

### Grade Level

High School (AP Calculus AB/BC)

### Duration

15-20 minutes

### Prerequisites

- Understanding of derivatives and differentiation rules
- Knowledge of point-slope form of a line
- Familiarity with slope-intercept form

### Warm-Up Activity (3 minutes)

1. Ask students: "What does the derivative tell us about a function at a specific point?"
2. Review the point-slope form: y - y1 = m(x - x1)

### Exploration Activity (10 minutes)

1. **Start Simple**: Select f(x) = x^2 and set x = 1
   - Click "Show Steps" to reveal the calculation
   - Discuss: What is the slope at x = 1? (Answer: 2)
   - Verify the tangent line equation: y = 2x - 1

2. **Compare Points**: Keep f(x) = x^2 but move the slider
   - At x = 0, what is the tangent line? (y = 0, horizontal!)
   - At x = 2, what is the slope? (4, steeper!)
   - At x = -1, what happens? (slope is -2, going downward)

3. **Try Other Functions**: Switch to sin(x)
   - At x = 0, what is the tangent line? (y = x, slope = 1)
   - At x = pi/2 (approximately 1.57), what is the slope? (nearly 0)

4. **Explore Edge Cases**: Try sqrt(x)
   - Why can't we find a tangent at x = 0?
   - What happens to the slope as x approaches 0 from the right?

### Practice Problems (5 minutes)

Without looking at the calculation panel, have students:

1. Predict the tangent line equation for f(x) = x^3 at x = 2
2. Find where f(x) = x^2 has a horizontal tangent line
3. For f(x) = e^x at x = 0, calculate the tangent line equation

Then verify using the MicroSim.

### Discussion Questions

1. Why does the tangent line to x^2 at x = 0 have zero slope?
2. How does the tangent line relate to "instantaneous rate of change"?
3. What geometric property makes the tangent line unique at each point?

### Assessment

Students should be able to:

- Calculate f(a) for a given point
- Evaluate f'(a) using derivative rules
- Write the tangent line in point-slope form
- Simplify to slope-intercept form

## References

- [Tangent Lines on Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new/ab-2-1/a/tangent-lines-review)
- [Derivatives and Tangent Lines - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/Tangents.aspx)
