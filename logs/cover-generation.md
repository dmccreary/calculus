# Session Log: Cover Image Generation

**Date:** 2026-02-03
**Skill:** book-installer > cover-image-generator
**Project:** AP Calculus Intelligent Textbook

---

## Request

Generate a cover image for the AP Calculus textbook.

## Prerequisites Verified

- `mkdocs.yml` exists with `site_name: Calculus`
- `docs/course-description.md` exists with comprehensive content
- `docs/img/` directory created

## User Selection

- **Method chosen:** Local Prompt Only (manual copy to ChatGPT or other AI generator)

## Error Encountered

### Script Not Found

The skill documentation referenced an incorrect path for the generate-cover.sh script:

**Expected path (from skill docs):**
```
~/.claude/skills/claude-skills/src/image-generation/generate-cover.sh
```

**Actual path:**
```
/Users/dan/Documents/ws/claude-skills/src/image-generation/generate-cover.sh
```

**Directory contents at actual location:**
```
/Users/dan/Documents/ws/claude-skills/src/image-generation/
├── generate-cover-openai.py
├── generate-cover.sh
├── generate-logo-openai.py
├── generate-logo.sh
├── open-chatgpt.py
├── README.md
├── test-key.py
└── test-key.sh
```

### Root Cause

The `cover-image-generator.md` reference file in the book-installer skill assumes the claude-skills repository is installed at `~/.claude/skills/claude-skills/`, but it is actually located at `/Users/dan/Documents/ws/claude-skills/`.

### Recommended Fix

Update the skill documentation to either:
1. Use a configurable path variable
2. Search for the script in common locations
3. Update the documented path to match actual installation

## Workaround Applied

Generated the cover image prompt manually based on:
- Book title from mkdocs.yml: "Calculus"
- Course description content: AP Calculus AB/BC curriculum
- Theme colors: Purple primary (from mkdocs.yml palette)

## Generated Prompt

```
Create a professional textbook cover image for "AP Calculus: An Interactive Intelligent Textbook".

Style: Modern, clean, educational, inspiring. Professional academic aesthetic with a sense of discovery and intellectual achievement.

Visual elements to include as a subtle montage background:
- Calculus curves and function graphs (sine waves, parabolas, exponential curves)
- Derivative notation (dy/dx, f'(x)) floating subtly
- Integration symbols (∫) elegantly placed
- Tangent lines touching curves
- Area under curves (shaded regions)
- Limit notation (lim as x approaches)
- Coordinate axes with smooth curves
- Newton and Leibniz era scientific instruments subtly referenced
- Abstract representations of motion and change

Color palette: Deep purple primary (matching MkDocs Material theme), with accents of gold, white, and soft blue. Mathematical elements in lighter tones against darker background.

Composition: Central focus area for title text overlay, with mathematical elements arranged in an aesthetically pleasing pattern around the edges. The design should feel dynamic yet balanced, representing the beauty of calculus.

Mood: Intellectual, inspiring, accessible. Should appeal to high school and college students while conveying mathematical sophistication.

Aspect ratio: 1.91:1 (1200x630 pixels) for social media Open Graph compatibility.

Do NOT include any text in the image - leave space for title overlay.
```

## Next Steps for User

1. Copy the prompt above
2. Paste into ChatGPT (DALL-E), Bing Image Creator, or other AI image generator
3. Download the generated image
4. Save to `docs/img/cover.png`
5. Resize to 1200x630 pixels if needed
6. Optionally update `docs/index.md` with cover image and metadata

## Files Created

- None (prompt provided for manual use)

## Files to Create (user action required)

- `docs/img/cover.png` - Generated cover image (1200x630 pixels)

---

## Issue to Report

The book-installer skill's `references/cover-image-generator.md` should be updated to use the correct script path or implement path discovery.

**Current (incorrect):**
```bash
~/.claude/skills/claude-skills/src/image-generation/generate-cover.sh
```

**Should be:**
```bash
/Users/dan/Documents/ws/claude-skills/src/image-generation/generate-cover.sh
```

Or implement a search:
```bash
SCRIPT=$(find ~/Documents/ws -name "generate-cover.sh" -path "*/image-generation/*" 2>/dev/null | head -1)
```

---

*Session completed with workaround*
