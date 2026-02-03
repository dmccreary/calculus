# Creating Delta: The Calculus Course Mascot

**Date:** 2026-02-03
**Purpose:** Design a course mascot for the AP Calculus intelligent textbook, similar to Gyra in the control systems course.

---

## Session Log

### User Prompt 1

> I want to make this calculus class fun. Please help me design a "course mascot" that students could relate to similar to the Gyra robot in the course on control systems @../control-systems/. Here is the description of Gyra for that course from the @../control-systes/CLAUDE.md file: [Gyra specification included]

### Claude Response 1

Proposed **Delta (Δ)** as the mascot—a small, adventurous creature who lives in a landscape of mathematical curves. Key points:

- Name comes from the symbol Δ—the foundation of calculus (change)
- Experiences calculus physically: climbing slopes, sliding into valleys
- Core framing: derivative = slope under Delta's feet, integral = total distance traveled

Initial concept mapping:

| Calculus Concept | Delta's Experience |
|------------------|-------------------|
| Derivative | How steep is the ground under Delta's feet right now? |
| Integral | Total distance Delta has traveled along the curve |
| Limits | Delta approaching a point, getting infinitely closer |
| Critical points | Where Delta's path goes flat |
| Local maximum | Delta standing on a hilltop |
| Local minimum | Delta at the bottom of a valley |

Asked clarifying questions about target audience, character type, and tone.

---

### User Prompt 2

> Answer 1: Definatly high school students taking AP Calc. Answer 2: How about a triangular robot that loves to explore the hills and valleys of curved mountains. 3: Tone is fun-loving, optomistic, positive energy, curious, sometimes skeptical (in a good way), a jokester that loves puns and mini-games, loves sidequests, encouraging and someone that can relate to the challenges of learning calculus but positive that calculus is a superpower that will help students become better critical thinkers and understand the world around them.

### Claude Response 2

Developed full character design for Delta:

**Physical Description:**
- Equilateral triangle body (teal #009688) that can tilt to show slope
- Expressive LED eyes (orange #FF5722) near the apex
- Small treaded wheels at base vertices
- Glowing slope indicator along one edge (green #00E676)
- Retractable measuring arms for rise/run
- Small backpack for "accumulated data" (integral journal)
- Wobbling antenna

**Personality:**
- Boundlessly curious
- Pun enthusiast
- Healthy skeptic
- Sidequest lover
- Encouraging coach
- Calculus evangelist

**Catchphrases:**
- "Let's take this one infinitesimal step at a time!"
- "Change is my whole personality. Literally."
- "Things are looking up!" (on positive slopes)
- "Time for a limit break!"

Complete concept-to-Delta-framing table with 25+ mappings.

---

### User Prompt 3

> yes do all 4

(Referring to: 1. Create delta.md spec, 2. Design sample admonitions, 3. Sketch Chapter 1 intro, 4. Add to CLAUDE.md)

### Claude Response 3

Created all requested files:

**Files Created/Modified:**

1. `docs/appendix/delta.md` - Full 127-line specification
2. `docs/css/extra.css` - Added Delta Moment styling with teal accent and SVG icon
3. `docs/js/extra.js` - Added JavaScript to detect "Delta" in quote admonition titles
4. `docs/chapters/01-foundations-of-calculus/index.md` - Added "Meet Your Guide" section with Delta's introduction
5. `mkdocs.yml` - Added Appendix section with Delta link
6. `CLAUDE.md` - Full project guidance file with Delta guidelines

**Sample Delta Moments for various chapters:**

Chapter 2 (Limits):
```markdown
!!! quote "Delta Moment"
    "Imagine I'm walking toward a wall. I take a step that covers half the remaining
    distance. Then another half. Then another. I get *infinitely close* but never
    quite touch it. That's a limit—and honestly, it's a little frustrating. But
    also... kind of beautiful?"
```

Chapter 6 (Derivatives):
```markdown
!!! quote "Delta Thinks Out Loud"
    "Okay, so the slope between two points is easy—rise over run. But what if I
    want the slope at *exactly one point*? How do I do rise over run when there's
    no... run? This is going to require some sneaky limit stuff, isn't it?"
```

---

### User Prompt 4

> please create a detailed description of delta so that I can generate a high-resoluion image of her using an image generation model like OpenAI DALL·E (gpt-image-1)

### Claude Response 4

Provided comprehensive image generation prompts:

**Primary Prompt (comprehensive version):**
- Detailed physical description with hex color codes
- Body shape, eyes, wheels, slope indicator, arms, backpack, antenna
- Pose description (slightly tilted)
- Background (mathematical landscape with curves)
- Style direction (Pixar-like, educational, approachable)

**Color Reference Table:**

| Element | Color | Hex Code |
|---------|-------|----------|
| Body | Teal | #009688 |
| Eyes | Orange | #FF5722 |
| Slope indicator | Green glow | #00E676 |
| Wheels | Dark gray | #555555 |
| Background curve | Purple gradient | #7B1FA2 to #4A148C |

**Pose Variations:**
1. Neutral/Welcoming - for main mascot image
2. Climbing - for derivatives chapter
3. Thinking - for problem-solving sections
4. Celebrating - for achievement moments
5. In a Valley - for minima sections

---

### User Prompt 5

> please remove all the extra trailing spaces in @docs/prompts/delta.md

### Claude Response 5

File didn't exist initially. After user created it, cleaned up trailing whitespace.

---

### User Prompt 6

> log this entire session includinng my prompts to logs/creating-delta.md

### Claude Response 6

Created this log file.

---

## Files Created in This Session

| File | Purpose |
|------|---------|
| `docs/appendix/delta.md` | Full mascot specification |
| `docs/prompts/delta.md` | Image generation prompt |
| `CLAUDE.md` | Project guidance with Delta guidelines |
| `logs/creating-delta.md` | This session log |

## Files Modified in This Session

| File | Changes |
|------|---------|
| `docs/css/extra.css` | Added Delta Moment admonition styling |
| `docs/js/extra.js` | Added Delta detection for quote admonitions |
| `docs/chapters/01-foundations-of-calculus/index.md` | Added Delta introduction |
| `mkdocs.yml` | Added Appendix navigation |

---

## Key Design Decisions

1. **Name: Delta (Δ)** - The Greek letter for change, which is the foundation of calculus
2. **Shape: Triangle** - Literally embodies the Δ symbol; can tilt to show derivatives
3. **Personality: Fun + Encouraging** - Appropriate for high school audience; treats mistakes as progress
4. **Physical Features:**
   - Slope indicator makes derivatives visible
   - Backpack represents integral (accumulated data)
   - Wheels allow traversing curves
   - Tilted pose shows current derivative
5. **Tone: Puns + Sidequests** - Keeps learning light; encourages exploration

## Delta's Core Philosophy

> "Calculus isn't about memorizing formulas—it's about seeing change. Once you learn to see it, you'll notice it everywhere: in how your car accelerates, how populations grow, how medicine dissolves in your bloodstream, how a song builds to a crescendo. I'm just a little triangle robot, but calculus? Calculus is a superpower. And you're about to unlock it."
