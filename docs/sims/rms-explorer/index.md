---
title: RMS Explorer
description: Change the amplitude, frequency, and phase of a sine wave, square it, and see that only amplitude changes the RMS value.
status: built
quality_score: 90
social:
   cards: false
---

# RMS Explorer

<iframe src="main.html" height="642px" width="100%" scrolling="no"></iframe>

[Run the RMS Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

[Open the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

The top plot shows a sine wave v(t). The bottom plot shows the same wave squared, v²(t), which is never negative. The RMS value is the square root of the average (mean) of that squared wave. Check the box to shade the area under v²(t); the dashed green line marks its mean, and the square root of that mean is the RMS voltage.

## How to Use

1. Move the **amplitude** slider and watch V_RMS change in proportion to A.
2. Move the **frequency** slider. The wave repeats more often, but the RMS value does not change.
3. Move the **phase** slider. The wave slides left or right, but the RMS value does not change.
4. Turn on the **shade area** checkbox and compare the shaded area with the dashed mean line. The mean is the height of a rectangle with the same area.

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/power-generation-and-distribution/sims/rms-explorer/main.html"
        height="642px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Learners will explain which sine-wave parameters affect the RMS value, using the square-mean-root steps in the definition.

### Prerequisites

- Sine waves, amplitude, frequency, and phase
- Peak and RMS values

### Suggested Activity

1. Predict, then test: which of amplitude, frequency, and phase change V_RMS?
2. Set the amplitude to 170 V and confirm V_RMS is about 120 V.
3. Double the amplitude and observe that V_RMS doubles while the mean of v² quadruples.
4. Turn on shading and explain why squaring removes the cancellation between positive and negative half-cycles.

### Assessment

Learners state that V_RMS = A/√2 for a sine wave, that frequency and phase do not affect it, and that average power in a resistor scales with the square of the amplitude.

## References

1. [Chapter 1: Electrical Foundations](../../chapters/01-electrical-foundations/index.md) - Definition of RMS and the sine-wave relationship.
2. [p5.js Reference](https://p5js.org/reference/) - Documentation for the interactive graphics library.
