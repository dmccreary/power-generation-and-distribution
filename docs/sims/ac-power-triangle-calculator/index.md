---
title: AC Power Triangle and Power Factor Calculator
description: Build a power triangle from real and reactive power and read apparent power, power factor, phase angle, and leading or lagging direction.
status: built
quality_score: 90
image: /sims/ac-power-triangle-calculator/ac-power-triangle-calculator.png
og:image: /sims/ac-power-triangle-calculator/ac-power-triangle-calculator.png
twitter:image: /sims/ac-power-triangle-calculator/ac-power-triangle-calculator.png
social:
   cards: false
---

# AC Power Triangle and Power Factor Calculator

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run the AC Power Triangle and Power Factor Calculator Fullscreen](./main.html){ .md-button .md-button--primary }

[Open the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

Sliders for real power P and reactive power Q draw a power triangle and report apparent power S, power factor, phase angle, and direction. A bar shows what share of apparent power is real power.

## How to Use

1. Drag the **P** and **Q** sliders and watch the triangle and S change.
2. Compare +Q with −Q at the same P: S and PF match, direction does not.
3. Set Q = 0 to reach unity power factor.
4. Press **Quiz me** to hide the results, enter S, PF, φ, and direction, and press **Check**. Two attempts per answer, then the answer is shown.

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/power-generation-and-distribution/sims/ac-power-triangle-calculator/main.html"
        height="582px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Learners will calculate apparent power, power factor, phase angle, and direction from real and reactive power.

### Prerequisites

- Real, reactive, and apparent power
- Power triangle and power factor

### Suggested Activity

1. Load the chapter example (8 kW, +6 kvar) and confirm S = 10 kVA and PF = 0.800.
2. Switch to −6 kvar and explain what changes and what does not.
3. Discuss why PF = 0.8 does not mean 80% efficiency.
4. Take three quizzes: positive Q, negative Q, and zero Q.

### Assessment

Mastery is every quiz answer correct within two attempts across three quizzes that include positive, negative, and zero reactive power.

## References

1. [Chapter 2: AC Circuits and Power Factor](../../chapters/02-ac-circuits-power-factor/index.md) - Equations and worked examples used by the activity.
2. [p5.js Reference](https://p5js.org/reference/) - Documentation for the interactive graphics library.
