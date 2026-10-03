---
title: AC Waveform Measurement Explorer
description: Calculate period and RMS voltage from ideal sine-wave frequency and peak voltage, then inspect instantaneous values and a DC comparison.
status: built
quality_score: 95
image: /sims/ac-waveform-measurement-explorer/ac-waveform-measurement-explorer.png
og:image: /sims/ac-waveform-measurement-explorer/ac-waveform-measurement-explorer.png
twitter:image: /sims/ac-waveform-measurement-explorer/ac-waveform-measurement-explorer.png
social:
   cards: false
---

# AC Waveform Measurement Explorer

<iframe src="main.html" height="652px" width="100%" scrolling="no"></iframe>

[Run the AC Waveform Measurement Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

[Open the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

This activity connects frequency and peak voltage to two measured sine-wave quantities: period and RMS voltage. Three challenges hide the annotated graph until learners commit to calculations. Exploration mode adds phase, a movable instantaneous-value marker, and a constant-DC comparison.

## How to Use

Enter the period in milliseconds and RMS voltage for each waveform. After later cases, compare the new period with the preceding one. In exploration mode, change the wave parameters, move the time marker, and switch between an ideal sine wave and constant DC.

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/power-generation-and-distribution/sims/ac-waveform-measurement-explorer/main.html"
        height="652px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Learners will calculate period and RMS value from the frequency and peak value of an ideal sine wave.

### Prerequisites

- Direct current and alternating current
- Sine waves, cycles, and frequency
- Period, peak value, RMS value, and instantaneous value

### Suggested Activity

1. Ask learners to calculate both quantities before submitting each case.
2. Compare 50 Hz, 60 Hz, and 400 Hz waveforms and state the inverse frequency-period relationship.
3. Move the instantaneous-value marker and discuss why negative voltage does not imply zero magnitude.
4. Switch to constant DC and compare its RMS value with its constant magnitude.

### Assessment

Mastery is six correct values out of six within two attempts each. Period-change comparisons check conceptual understanding after each revealed waveform.

## References

1. [Chapter 1: Electrical Foundations](../../chapters/01-electrical-foundations/index.md) - Sine-wave equations and worked values used by the activity.
2. [p5.js Reference](https://p5js.org/reference/) - Documentation for the interactive graphics library.
