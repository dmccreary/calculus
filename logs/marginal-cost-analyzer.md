# Marginal Cost Analyzer MicroSim Generation Log

## Generation Summary

| Field | Value |
|-------|-------|
| MicroSim Name | marginal-cost-analyzer |
| Start Time | 2026-02-04 00:15:09 |
| End Time | 2026-02-04 00:18:53 |
| Duration | ~3 minutes 44 seconds |
| Library | p5.js |
| Bloom Level | Apply (Level 3) |
| Bloom Verbs | calculate, interpret, compare |

## Specification

**Purpose**: Calculate and interpret marginal cost as the derivative of the cost function, comparing it to actual cost differences.

**Learning Objective**: Students will calculate and interpret marginal cost as the derivative of the cost function, comparing it to actual cost differences (Bloom Level 3: Apply)

## Files Generated

| File | Path | Size |
|------|------|------|
| JavaScript | `/Users/dan/Documents/ws/calculus/docs/sims/marginal-cost-analyzer/marginal-cost-analyzer.js` | ~25 KB |
| HTML | `/Users/dan/Documents/ws/calculus/docs/sims/marginal-cost-analyzer/main.html` | ~0.5 KB |
| Markdown | `/Users/dan/Documents/ws/calculus/docs/sims/marginal-cost-analyzer/index.md` | ~7 KB |
| Metadata | `/Users/dan/Documents/ws/calculus/docs/sims/marginal-cost-analyzer/metadata.json` | ~1.5 KB |

## Features Implemented

### Visual Elements

1. **Graph of Cost Function C(x)**: Shows the cost curve with grid, axes, and labels
2. **Tangent Line at Selected Production Level**: Orange tangent line showing the slope = marginal cost
3. **Slope Displayed as Marginal Cost**: Labeled annotation on the tangent line
4. **Data Table**: Shows x, C(x), C'(x), and actual cost of next unit for values around current x
5. **Bar Chart Comparison**: Side-by-side bars comparing marginal cost C'(x) to actual difference Delta C

### Interactive Controls

1. **Function Selector** (Model button): Cycles through three cost models:
   - Linear: C(x) = a + bx
   - Quadratic: C(x) = a + bx + cx^2
   - Cubic: C(x) = a + bx + cx^2 + dx^3
2. **Coefficient Sliders**:
   - a slider: Fixed costs (0-500)
   - b slider: Linear coefficient (0-50)
   - c slider: Quadratic coefficient (-1 to 2)
3. **Production Level Slider**: x from 1 to 50 units
4. **View Toggle**: Switch between Cost View C(x) and Marginal Cost View C'(x)

### Business Insights Panel

1. **Current Production Level**: Display of x and total cost C(x)
2. **Marginal Cost**: C'(x) at current level
3. **Actual Next Unit Cost**: C(x+1) - C(x)
4. **Marginal Cost Trend**: Increasing (diseconomies of scale) or Decreasing (economies of scale)
5. **Average Cost**: C(x)/x per unit
6. **MC vs Average Interpretation**: Whether average cost is rising or falling

## Technical Implementation

- **Canvas-based controls**: All sliders and buttons drawn directly on canvas using rect(), text(), circle()
- **Mouse interaction**: mousePressed(), mouseDragged(), mouseReleased() for control interaction
- **Responsive design**: updateCanvasSize() called in setup() and windowResized()
- **No DOM elements**: Avoids createSlider(), createButton() per project guidelines
- **Clean layout**: Graph on left, bar chart and table on upper right, insights panel on right

## Mathematical Functions

| Cost Model | C(x) | C'(x) | C''(x) |
|------------|------|-------|--------|
| Linear | a + bx | b | 0 |
| Quadratic | a + bx + cx^2 | b + 2cx | 2c |
| Cubic | a + bx + cx^2 + dx^3 | b + 2cx + 3dx^2 | 2c + 6dx |

## Testing Notes

- Test URL: `http://127.0.0.1:8000/calculus/sims/marginal-cost-analyzer/main.html`
- Screenshot needed: Run `~/.local/bin/bk-capture-screenshot /Users/dan/Documents/ws/calculus/docs/sims/marginal-cost-analyzer`

## Instructional Rationale

Connecting abstract derivatives to concrete business decisions makes calculus relevant and memorable. Students see that:

1. The derivative C'(x) is not just a mathematical abstraction - it's the marginal cost
2. Marginal cost closely approximates the actual cost of producing one more unit
3. Business decisions (should we produce more?) depend on comparing marginal cost to price
4. The second derivative tells us about economies/diseconomies of scale
