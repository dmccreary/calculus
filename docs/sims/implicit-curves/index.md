# Implicit Curves Explorer

<div id="canvas-container"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
<script src="./script.js"></script>

## About This MicroSim

Many important curves in mathematics cannot be written in the form $y = f(x)$. Instead, they are defined **implicitly** by equations where $x$ and $y$ are mixed together, like:

- **Circle:** $x^2 + y^2 = r^2$
- **Ellipse:** $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$
- **Hyperbola:** $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$
- **Folium of Descartes:** $x^3 + y^3 = 3axy$
- **Lemniscate:** $(x^2 + y^2)^2 = a^2(x^2 - y^2)$

!!! quote "Delta Moment"
    "Wait, you're telling me I can find the slope at any point on this curve, even though
    I can't solve for $y$? That's like knowing the steepness of a hill without having a
    map that shows the elevation!"

## How to Use

1. **Select a Curve:** Use the dropdown menu to choose from five different implicit curves
2. **Move the Point:** Click anywhere on the curve or drag the blue point to explore different locations
3. **Toggle Tangent:** Use the checkbox to show or hide the tangent line
4. **Adjust Parameters:** The slider changes the size/shape parameter of each curve
5. **Random Point:** Click this button to jump to a random location on the curve

## Key Observations

As you explore, notice that:

1. **Tangent lines exist everywhere** (except at special points like cusps or self-intersections)
2. **The derivative $\frac{dy}{dx}$ changes continuously** as you move along the curve
3. **Vertical tangents occur** when $\frac{\partial F}{\partial y} = 0$ (undefined slope)
4. At **every smooth point**, we can find the slope using implicit differentiation

## The Math Behind It

For a curve defined implicitly by $F(x, y) = 0$, we find the slope using:

$$\frac{dy}{dx} = -\frac{\partial F / \partial x}{\partial F / \partial y} = -\frac{F_x}{F_y}$$

This works because we're applying the chain rule to both sides of $F(x, y) = 0$ and solving for $\frac{dy}{dx}$.

!!! tip "Why This Matters"
    Implicit differentiation is a powerful technique because:

    - Many real-world curves (orbits, contour lines, level curves) are naturally implicit
    - It works even when solving for $y$ explicitly is impossible
    - The tangent line captures local behavior regardless of the curve's global complexity

## Lesson Plan

**Learning Objective:** Students will recognize that implicit equations define curves where tangent lines exist even when $y$ cannot be explicitly solved for $x$ (Bloom Level 2: Understand)

### Suggested Activities

1. **Exploration (5 min):** Let students freely explore different curves, noting where tangent lines are horizontal, vertical, or at various angles

2. **Pattern Recognition (5 min):** For the circle, have students identify:
    - Where is $\frac{dy}{dx} = 0$? (horizontal tangent)
    - Where is $\frac{dy}{dx}$ undefined? (vertical tangent)
    - How does the sign of $\frac{dy}{dx}$ relate to whether the point is "going up" or "going down"?

3. **Compare Curves (5 min):** Switch between different curves at the same point (approximately) and discuss how the tangent lines differ

4. **Challenge (5 min):** For the Folium of Descartes, find the point where the curve crosses itself. What happens to the tangent line there?

## Technical Details

This MicroSim uses the **marching squares algorithm** to render implicit curves. The algorithm:

1. Divides the viewing area into a grid of small squares
2. Evaluates $F(x, y)$ at each corner
3. Draws line segments where the sign of $F$ changes (curve crosses the cell)

The tangent line is computed using the gradient $\nabla F = (F_x, F_y)$, which is perpendicular to the curve at every point.

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)
