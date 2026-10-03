---
title: Power System Path Explorer
description: Reconstruct the path from generation through transmission and distribution to utilization, then inspect each stage and connection.
status: built
quality_score: 95
image: /sims/power-system-path-explorer/power-system-path-explorer.png
og:image: /sims/power-system-path-explorer/power-system-path-explorer.png
twitter:image: /sims/power-system-path-explorer/power-system-path-explorer.png
social:
   cards: false
---

# Power System Path Explorer

<iframe src="main.html" height="677px" width="100%" scrolling="no"></iframe>

[Run the Power System Path Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit this MicroSim in the p5.js editor](https://editor.p5js.org/) — paste `power-system-path-explorer.js` into a new sketch.

## About This MicroSim

This workflow activity asks learners to reconstruct the four-stage electric power path before revealing it. Learners also match each stage to its role, inspect the transformer and substation connections, and identify where a process load belongs.

## How to Use

Use every stage exactly once in the ordered path and in the role matches. Submit the complete prediction, revise once if needed, and then click each stage or arrow in the revealed diagram (or use the Inspect menu, which works from the keyboard) to read its full role or connection meaning.

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/power-generation-and-distribution/sims/power-system-path-explorer/main.html"
        height="677px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Learners will summarize the electric power path by ordering generation, transmission, distribution, and utilization and matching each stage to its system role.

### Prerequisites

- Electric power systems
- Generation, transmission, distribution, and utilization
- Step-up and step-down transformers
- Substations, feeders, services, and loads

### Suggested Activity

1. Have learners submit the sequence and roles without referring back to the chapter.
2. After reveal, trace the purpose of each voltage transformation along the path.
3. Use the process-heater question to distinguish utilization from distribution.

### Assessment

Mastery is all four stages in order and at least three of four roles correct on the first submission. The process-load check supplies a final transfer question.

## References

1. [Chapter 1: Electrical Foundations](../../chapters/01-electrical-foundations/index.md) - Stage definitions and connection meanings used by the activity.
2. [p5.js Reference](https://p5js.org/reference/) - Library used to draw the activity and its controls.
