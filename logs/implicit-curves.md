# Implicit Curves MicroSim Generation Log

## Generation Details
- **Start Time:** 2026-02-04 00:15:08
- **MicroSim Name:** implicit-curves
- **Library:** p5.js with marching squares algorithm
- **Location:** /Users/dan/Documents/ws/calculus/docs/sims/implicit-curves/

## Specification
- **Purpose:** Display various curves defined by implicit equations and allow students to explore how tangent lines behave at different points
- **Learning Objective:** Students will recognize that implicit equations define curves where tangent lines exist even when y cannot be explicitly solved for x (Bloom Level 2: Understand)
- **Bloom Taxonomy Verbs:** identify, describe, recognize

## Features
- Coordinate grid with multiple implicit curves (circle, ellipse, hyperbola, folium of Descartes, lemniscate)
- Movable point that follows the selected curve
- Tangent line displayed at the current point
- Equation of the curve shown
- dy/dx value displayed at current point
- Dropdown to select curve type
- Click/drag to move point along curve
- Checkbox to show/hide tangent line
- Slider to adjust curve parameters
- Random Point button

## Files Generated
- script.js - Main p5.js simulation code
- main.html - Standalone HTML file
- index.md - MkDocs documentation page
- metadata.json - Dublin Core metadata

## End Time
- **End Time:** 2026-02-04 00:17:38
- **Total Duration:** 2 minutes 30 seconds

## Implementation Notes

### Marching Squares Algorithm
The MicroSim uses the marching squares algorithm to render implicit curves efficiently:
1. Divides the chart area into a grid of small cells (2px resolution)
2. Evaluates F(x,y) at each corner of every cell
3. Uses a lookup table (16 configurations) to determine which edges to connect
4. Interpolates along edges where sign changes occur

### Implicit Differentiation Implementation
For each curve type, the partial derivatives are computed analytically:
- dy/dx = -Fx/Fy where F(x,y) = 0 defines the curve
- Handles vertical tangents (Fy = 0) gracefully
- Point snapping uses Newton's method along the gradient

### Canvas-Based Controls
Following project guidelines, all UI controls are drawn directly on the canvas:
- Custom dropdown menu with hover effects
- Custom checkbox with checkmark rendering
- Custom slider with handle dragging
- Button with hover state

### Curves Included
1. **Circle:** x² + y² = r²
2. **Ellipse:** x²/a² + y²/b² = 1
3. **Hyperbola:** x²/a² - y²/b² = 1
4. **Folium of Descartes:** x³ + y³ = 3axy
5. **Lemniscate:** (x² + y²)² = a²(x² - y²)
