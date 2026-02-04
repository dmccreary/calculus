---
title: Implicit Tangent Line Explorer
description: Interactive exploration of tangent lines to curves defined by implicit equations, including circles, ellipses, hyperbolas, and the Folium of Descartes.
quality_score: 92
image: /sims/implicit-tangent/implicit-tangent.png
og:image: /sims/implicit-tangent/implicit-tangent.png
twitter:image: /sims/implicit-tangent/implicit-tangent.png
social:
   cards: false
---
# Implicit Tangent Line Explorer

<iframe src="main.html" height="552px" scrolling="no"></iframe>

[Run the Implicit Tangent Line Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Implicit Tangent Line Explorer MicroSim with the p5.js editor](https://editor.p5js.org/)

Place the following line in your website to include this in your course.

```html
<iframe src="https://dmccreary.github.io/calculus/sims/implicit-tangent/main.html" height="552px" scrolling="no"></iframe>
```

## Description

This MicroSim allows students to explore tangent lines at various points on curves defined by implicit equations. Unlike explicit functions where y = f(x), implicit curves are defined by equations like F(x, y) = 0, requiring implicit differentiation to find the slope.

**Key Features:**

- **Multiple Curve Types**: Explore four classic implicit curves:
    - Circle: x^2 + y^2 = r^2
    - Ellipse: x^2/a^2 + y^2/b^2 = 1
    - Hyperbola: x^2/a^2 - y^2/b^2 = 1
    - Folium of Descartes: x^3 + y^3 = 3axy
- **Draggable Point**: Click and drag a point along the curve to see how the tangent line changes
- **Real-Time Calculations**: Watch the derivative dy/dx and tangent line equation update instantly
- **Step-by-Step Derivation**: Toggle the calculation panel to see the implicit differentiation process
- **Normal Line Option**: Toggle visibility of the normal (perpendicular) line
- **Adjustable Parameters**: Use sliders to change curve parameters (radius, semi-axes, etc.)
- **Vertical Tangent Warning**: The sim automatically detects and displays when dy/dx is undefined

!!! quote "Delta Moment"
    "Implicit curves are sneaky! I can't just look at y = something to find my tilt. Instead, I have to use the chain rule on BOTH x and y, then solve for dy/dx. It's like solving a mystery where x and y are both suspects!"

## Lesson Plan

### Learning Objective

Students will find tangent lines to curves defined by implicit equations (Bloom Level 3: Apply).

### Grade Level

High School (AP Calculus AB/BC)

### Duration

20-25 minutes

### Prerequisites

- Understanding of derivatives and the chain rule
- Knowledge of point-slope form of a line
- Basic familiarity with conic sections

### Warm-Up Activity (3 minutes)

1. Ask students: "What makes an implicit equation different from an explicit function?"
2. Review the formula: dy/dx = -(dF/dx) / (dF/dy) for F(x,y) = 0
3. Discuss why we need this approach (y might not be solvable explicitly)

### Exploration Activity (15 minutes)

#### Part 1: Circle (5 minutes)

1. **Start with the Circle**: x^2 + y^2 = r^2
   - Click "Show Steps" to reveal the derivation
   - Note: dy/dx = -x/y (ratio of coordinates!)
   - Drag the point around the circle
   - At (r, 0): tangent is vertical (undefined slope)
   - At (0, r): tangent is horizontal (slope = 0)
   - At (r/sqrt(2), r/sqrt(2)): slope = -1 (45 degrees)

2. **Verify Geometrically**:
   - Toggle "Normal: ON" to see the normal line
   - Notice: The normal line always passes through the center!
   - Why? The radius is always perpendicular to the tangent

#### Part 2: Ellipse (4 minutes)

1. **Switch to Ellipse**: x^2/a^2 + y^2/b^2 = 1
   - Adjust sliders: try a = 3, b = 2
   - dy/dx = -(b^2 * x) / (a^2 * y)
   - Drag to the endpoints (a, 0) and (0, b)
   - Compare slopes at symmetric points

2. **Discussion**: How does the ellipse's eccentricity affect tangent slopes?

#### Part 3: Hyperbola (3 minutes)

1. **Switch to Hyperbola**: x^2/a^2 - y^2/b^2 = 1
   - Note: curve has two branches
   - dy/dx = (b^2 * x) / (a^2 * y)
   - The negative sign disappears! Why?

#### Part 4: Folium of Descartes (3 minutes)

1. **Switch to Folium**: x^3 + y^3 = 3axy
   - This exotic curve has a loop!
   - Find points where the tangent is horizontal (dy/dx = 0)
   - Find points where the tangent is vertical
   - Use "Random Point" to explore different locations

### Practice Problems (5 minutes)

Have students predict (without looking at the panel):

1. For circle x^2 + y^2 = 4, what is dy/dx at (1, sqrt(3))?
2. Where on the circle does the tangent line have slope = 1?
3. For ellipse x^2/9 + y^2/4 = 1, find dy/dx at (3/sqrt(2), sqrt(2))

Then verify using the MicroSim.

### Discussion Questions

1. Why does implicit differentiation require the chain rule?
2. What does it mean geometrically when dy/dx is undefined?
3. How do the tangent and normal lines relate for a circle centered at the origin?
4. Can implicit curves have more than one y-value for a given x? How does this affect tangent lines?

### Assessment

Students should be able to:

- Apply the implicit differentiation formula: dy/dx = -(dF/dx)/(dF/dy)
- Identify when tangent lines are horizontal or vertical
- Calculate partial derivatives dF/dx and dF/dy for polynomial expressions
- Write tangent line equations in point-slope form

### Extension Activities

1. **Find Inflection Points**: Where does the concavity of the circle change from the perspective of the tangent line?
2. **Asymptote Investigation**: For the Folium, there's an oblique asymptote at x + y + a = 0. Use the MicroSim to explore what happens to tangent lines as the curve approaches this asymptote.
3. **Self-Intersection**: The Folium passes through the origin but has two different tangent lines there. Can you explain why?

## The Mathematics of Implicit Differentiation

For a curve defined by F(x, y) = 0, we differentiate both sides with respect to x:

$$\frac{d}{dx}[F(x, y)] = \frac{d}{dx}[0]$$

Using the chain rule:

$$\frac{\partial F}{\partial x} + \frac{\partial F}{\partial y} \cdot \frac{dy}{dx} = 0$$

Solving for dy/dx:

$$\frac{dy}{dx} = -\frac{\partial F/\partial x}{\partial F/\partial y} = -\frac{F_x}{F_y}$$

This formula works whenever F_y is not equal to zero. When F_y = 0 but F_x is not equal to zero, we have a vertical tangent line.

## References

- [Implicit Differentiation on Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-2-new/ab-3-2/a/implicit-differentiation-review)
- [Implicit Curves - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/ImplicitDiff.aspx)
- [The Folium of Descartes - MacTutor History of Mathematics](https://mathshistory.st-andrews.ac.uk/Curves/Foliumd/)
