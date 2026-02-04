# Nested Chain Unwrap MicroSim Generation Log

## Generation Details

- **Start Time:** 2026-02-04 00:15:09
- **End Time:** 2026-02-04 00:17:55
- **Duration:** ~2 minutes 46 seconds
- **Generator:** Claude Opus 4.5 via microsim-generator skill

## MicroSim Specification

- **Name:** nested-chain-unwrap
- **Purpose:** Visualize how nested compositions are differentiated layer by layer using repeated chain rule applications
- **Learning Objective:** Students will apply the chain rule to nested composite functions (Bloom Level 4: Analyze)
- **Bloom Taxonomy:** Level 4 - Analyze
- **Bloom Verbs:** analyze, deconstruct, examine

## Files Generated

| File | Description | Size |
|------|-------------|------|
| `script.js` | p5.js visualization code with onion diagram and chain builder | ~11 KB |
| `main.html` | Standalone HTML wrapper | ~500 B |
| `index.md` | MkDocs lesson page with documentation | ~5 KB |
| `metadata.json` | Dublin Core metadata for faceted search | ~800 B |

## Implementation Details

### Visual Elements
- **Onion layer diagram:** Concentric rings showing nested functions from outside (outer function) to inside (inner function)
- **Color-coded layers:** Each layer has a distinct color (orange=outer, green=middle, blue=inner)
- **Layer labels:** Each ring shows the layer number and function (e.g., "L1: sin(u)")
- **Derivative chain panel:** Shows the derivative of each peeled layer and builds up the multiplication chain
- **Progress bar:** Visual indicator of how many layers have been peeled

### Interactive Controls
- **Function dropdown:** 7 preset nested functions at various depths
- **Depth indicator badge:** Visual badge showing 2-layer, 3-layer functions
- **"Peel Layer" button:** Reveals one derivative factor at a time, working outside-in
- **"Show All" button:** Reveals complete solution instantly
- **"Reset" button:** Clears all peeled layers to start over

### Preset Functions (by complexity)
1. sqrt(ln(x)) - 2 layers
2. (x^3 + 1)^4 - 2 layers
3. cos(sin(x)) - 2 layers
4. sin(e^(x^2)) - 3 layers
5. e^(cos(x^2)) - 3 layers
6. ln(tan(2x)) - 3 layers
7. sin^3(x^2) - 3 layers

### Instructional Design
- **Onion metaphor:** Makes the layer-by-layer process concrete and memorable
- **Visual multiplication chain:** Shows how derivative factors accumulate
- **Outside-in ordering:** Emphasizes correct differentiation direction (many students incorrectly start from inside)
- **Substitution emphasis:** Shows both the abstract derivative and the substituted form

## Technical Notes

- Canvas-based controls following project guidelines (no p5.js DOM elements)
- Responsive width using `updateCanvasSize()` pattern
- Clean separation of drawing, state, and control logic
- Unicode characters for mathematical notation (superscripts, square root, multiplication dot)

## Quality Checks

- [x] Uses `updateCanvasSize()` as first step in setup()
- [x] Canvas-based controls only (no createButton/createSlider)
- [x] chartTop >= 50 for title + subtitle
- [x] Proper color contrast for accessibility
- [x] All preset functions mathematically correct
- [x] Final answers verified
- [x] Responsive to window resize

## References Used

- Existing MicroSim patterns from `multi-rule-builder` and `power-rule-explorer`
- Project CLAUDE.md guidelines for p5.js MicroSims
- AP Calculus chain rule curriculum standards
