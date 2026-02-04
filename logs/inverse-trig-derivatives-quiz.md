# MicroSim Generation Log: Inverse Trig Derivatives Quiz

## Generation Details

| Field | Value |
|-------|-------|
| MicroSim Name | inverse-trig-derivatives-quiz |
| Start Time | 2026-02-04 00:15:09 |
| End Time | 2026-02-04 00:18:19 |
| Duration | ~3 minutes |
| Status | Complete |

## Specification

- **Type**: MicroSim
- **Purpose**: Help students memorize and apply inverse trig derivative formulas
- **Learning Objective**: Students will apply the inverse trigonometric derivative formulas to compute derivatives (Bloom Level 3: Apply)
- **Bloom Taxonomy Verb**: calculate, apply, solve
- **Implementation**: p5.js with card flip animation and quiz logic

## Visual Elements Implemented

- [x] Flashcard-style interface with 6 cards (2x3 grid)
- [x] Six cards showing each inverse trig function (arcsin, arccos, arctan, arccot, arcsec, arccsc)
- [x] Graph of selected function with tangent line at user-selected point
- [x] Derivative formula revealed after quiz attempt

## Interactive Controls Implemented

- [x] Click card to attempt derivative quiz
- [x] Text input area to type answer before reveal
- [x] "Check" button for verification
- [x] "Hint" button for assistance
- [x] Slider to evaluate derivative at specific x-value
- [x] Progress tracker showing 0/6 to 6/6 mastered
- [x] "Reset All" button to clear progress
- [x] "Show Answers" button to reveal all derivatives

## Behavior Implemented

- [x] Cards highlight when selected for graphing
- [x] Click card to open quiz input area
- [x] Incorrect attempts show hint option then reveal answer
- [x] Graph updates to show derivative value at selected point
- [x] Mastery tracking: 3 correct in a row = mastered (green checkmark)
- [x] Wrong answer resets streak to 0
- [x] Progress bar and counter in upper right

## Files Created

| File | Path | Size |
|------|------|------|
| JavaScript | `/Users/dan/Documents/ws/calculus/docs/sims/inverse-trig-derivatives-quiz/inverse-trig-derivatives-quiz.js` | ~18 KB |
| HTML | `/Users/dan/Documents/ws/calculus/docs/sims/inverse-trig-derivatives-quiz/main.html` | ~0.6 KB |
| Markdown | `/Users/dan/Documents/ws/calculus/docs/sims/inverse-trig-derivatives-quiz/index.md` | ~5 KB |
| Metadata | `/Users/dan/Documents/ws/calculus/docs/sims/inverse-trig-derivatives-quiz/metadata.json` | ~1 KB |

## Technical Details

- **Library**: p5.js v1.11.10
- **Canvas Size**: Responsive width, 530px height (450 draw + 80 control)
- **Controls**: Canvas-based (no DOM elements per project guidelines)
- **Graph**: Includes proper handling for split-domain functions (arcsec, arccsc)
- **Input Validation**: Flexible answer matching with common variations

## Instructional Design Notes

- Active recall through quizzing is more effective than passive review
- Immediate feedback corrects misconceptions
- Mastery tracking (3 in a row) ensures genuine memorization
- Pattern recognition emphasized: co-functions are negative
- Graph visualization connects formula to geometric meaning

## Testing Checklist

- [ ] Test all 6 derivative quizzes
- [ ] Verify mastery tracking (3 correct in a row)
- [ ] Test streak reset on wrong answer
- [ ] Check slider evaluation at various x values
- [ ] Verify domain handling for arcsec/arccsc
- [ ] Test responsive canvas sizing
- [ ] Capture screenshot for social media preview

## Notes

- Derivative formulas use both plain text and Unicode symbols for display
- Answer matching is flexible to accept various valid formats
- The co-function pattern (negative derivatives) is highlighted in lesson plan
- Graph properly handles functions with discontinuous domains
