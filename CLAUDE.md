# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MkDocs Material intelligent textbook for an AP Calculus course designed for high school students seeking college credit. It features:
- Learning graphs with 200 concepts and dependency relationships
- Interactive MicroSims using p5.js and other JavaScript libraries
- MathJax for LaTeX equation rendering
- Taxonomy-based concept classification
- A fun, encouraging tone appropriate for high school students

## Open Source Tools Only

This course uses only free, open-source tools.

**Rationale:** Our audience is high school students worldwide who may not have access to expensive commercial software. By using open-source tools and browser-based simulations, we ensure every student can fully participate regardless of their economic situation or institutional affiliation.

**In practice:**
- MicroSims use JavaScript (p5.js, vis-network, Chart.js) which runs in any browser
- Examples use Python when computation is needed
- Never assume students have access to paid software

## Tone and Content Guidelines

The voice is **fun, encouraging, and conversational**—warm, welcoming, and never intimidating. Use contractions naturally, address readers directly with "you" and inclusive "we," and acknowledge that math can be challenging while reassuring students they'll master it. Frame calculus mastery as gaining a "superpower" that helps you understand the world and become a better critical thinker.

Humor should be **playful with puns and wordplay**, sprinkled throughout (1-2 jokes per major section). Use relatable everyday analogies, pop culture references when natural, and celebrate small victories. Never mock the student—affectionately mock the difficulty of the subject instead.

Keep explanations **active and energetic**. Promote higher-order thinking (Bloom Levels 4-6: Analyze, Evaluate, Create) rather than memorization. Avoid excessive exclamation points, forced jokes that interrupt flow, and condescending phrases.

## Delta: The Narrative Anchor

**Delta** is the course mascot—a small, curious, triangular robot who explores the hills and valleys of mathematical curves. Her name comes from the Greek letter Δ (delta), the symbol for change. She's enthusiastic, loves puns, and believes calculus is a superpower.

> **Before generating chapter content**, read the full Delta specification at `docs/appendix/delta.md` to understand her personality, physical description, and role in the textbook.

### Framing Concepts Through Delta

When appropriate, frame major calculus topics as part of Delta's exploration. Students aren't just learning theory—they're helping Delta navigate mathematical landscapes:

| Calculus Concept | Delta Framing |
|------------------|---------------|
| Derivative | "How steep is the ground under my wheels *right now*?" |
| Derivative = 0 | "Whoa, I'm perfectly level! Something interesting is happening here..." |
| Positive derivative | "Climbing! Things are looking up!" (tilts upward) |
| Negative derivative | "Wheee, downhill!" (tilts downward) |
| Second derivative | "Am I climbing *faster* or *slower* than before?" |
| Concave up | "This hill is getting steeper—I'm working harder!" |
| Concave down | "Phew, the climb is easing up." |
| Inflection point | "The *vibe shift*—the feel of this curve just changed." |
| Local maximum | Standing on a peak: "I'm on top of the world! ...well, this part of it." |
| Local minimum | In a valley: "Cozy down here! Nowhere to go but up." |
| Integral | "Let me check my backpack—how far have I traveled total?" |
| Definite integral | "Distance from point A to point B, all logged!" |
| Fundamental Theorem | "WAIT. My tilt and my journey are connected?! This changes everything!" |
| Limit | "Getting closer... closer... what's it approaching?" |
| Continuity | "Can I walk here smoothly, or is there a gap I'd fall through?" |
| Asymptote | "I can get infinitely close but never quite touch it!" |
| Chain rule | "Slopes within slopes—Inception style!" |
| Optimization | "Finding THE peak, not just a local hill!" |

### Delta's Personality in Writing

When Delta "speaks" or her perspective is shared:
- **Curious and enthusiastic** about exploring new curves
- **Pun-loving** with a weakness for math wordplay
- **Encouraging** even after mistakes ("Wrong answer? Just eliminated one possibility!")
- **Skeptical in a good way** ("Wait, are we *sure* infinity works like that?")
- **Never blames the student**—treats every struggle as part of the adventure

### Delta Moments

Add **"Delta Moments"** as short narrative asides when a concept has a natural physical interpretation. Use a quote admonition with "Delta" in the title:

```markdown
!!! quote "Delta Moment"
    "See how I'm tilted right now? That tilt IS the derivative. I'm not
    calculating it—I'm *living* it."

!!! quote "Delta's Sidequest"
    Before finding the maximum profit, Delta notices a strange wiggle in the
    cost function. "Hold up—what's happening at x = 3? Let's investigate!"

!!! quote "Delta's Pun Corner"
    "Why did the function go to therapy? It had too many issues...
    at its discontinuities. ...I'll see myself out."
```

**Automatic icon:** Any quote admonition with "Delta" in the title (e.g., "Delta Moment", "Delta's Sidequest", "Delta Says") automatically displays a small Delta robot icon in the upper-right corner and gets a teal accent color. This is handled by `docs/js/extra.js` and `docs/css/extra.css`.

Use Delta Moments sparingly (1-2 per major section maximum). They work best for:
- Making abstract math feel physical
- Showing consequences of choices
- Adding stakes to problem-solving
- Lightening the mood after difficult material

### When NOT to Use Delta

- Don't force Delta into purely algebraic manipulation with no geometric meaning
- Don't overuse puns—one per major section max
- Don't let Delta distract from rigorous proofs
- Don't make Delta the subject of every example; she's one tool among many

### Delta's Recurring Metaphors

Use these consistently throughout the book:
- **Derivative** → "my current tilt" or "slope under my wheels"
- **Integral** → "my travel journal" or "what's in my backpack"
- **Limit** → "sneaking up on a value"
- **dx** → "teeny tiny step"
- **Critical point** → "a flat spot worth investigating"
- **Inflection** → "the vibe shift"
- **Instantaneous rate** → "right NOW rate, not average rate"

## Common Commands

```bash
# Serve locally for development (user runs this in their own terminal)
mkdocs serve

# Build static site
mkdocs build
```

## Local Testing URLs

When testing with `mkdocs serve`, use the repository name in the path:
- MicroSims: `http://127.0.0.1:8000/calculus/sims/<sim-name>/`
- Learning graph viewer: `http://127.0.0.1:8000/calculus/sims/graph-viewer/main.html`

## Architecture

### Learning Graph Pipeline
1. **Course description** (`docs/course-description.md`) → defines scope and Bloom's taxonomy objectives
2. **Concept list** (`docs/learning-graph/concept-list.md`) → 200 concepts extracted from course description
3. **CSV format** (`docs/learning-graph/learning-graph.csv`) → ConceptID, ConceptLabel, Dependencies, TaxonomyID
4. **JSON format** (`docs/learning-graph/learning-graph.json`) → vis-network compatible
5. **Graph viewer** (`docs/sims/graph-viewer/`) → interactive visualization

### MicroSim Structure

About 70% of MicroSims use the p5.js library. When p5.js is used, the goal is to allow it to be edited by the p5.js editor with no changes to the JavaScript file.

MicroSims live in `docs/sims/<sim-name>/` with:

#### All MicroSims Must Have These Files

- `index.md` - MkDocs page with iframe embedding and lesson plan
- `main.html` - standalone HTML file
- `script.js` - JavaScript (p5.js, vis-network, etc.)
- `metadata.json` - JSON Dublin core fields for faceted search
- `screenimage.png` - screenshot for social media previews

### MicroSim Screenshots
Always use `~/.local/bin/bk-capture-screenshot` to capture MicroSim screenshots:
```bash
~/.local/bin/bk-capture-screenshot /path/to/microsim-directory
```

## MkDocs Configuration Notes

- Never use `navigation.tabs` feature (no top navigation tabs)
- Theme uses purple primary color with white accent
- MathJax enabled via `pymdownx.arithmatex` extension
- Extra CSS in `docs/css/extra.css`

## p5.js MicroSim Guidelines

When creating p5.js MicroSims:
- Always call `updateCanvasSize()` as first step in `setup()` to get container width
- Use canvas-based controls (draw buttons/sliders with `rect()`, `text()`, handle with `mousePressed()`/`mouseDragged()`)
- Do NOT use p5.js DOM functions like `createButton()`, `createSlider()` as they have positioning issues in iframes
- Always add an "Edit with the p5.js Editor" link in the index.md

## vis-network Notes

There's a rendering bug with edge labels on perfectly horizontal edges. Use a slight y-offset (e.g., from 480 to 490) to give edges enough angle for labels to render on initial load.
