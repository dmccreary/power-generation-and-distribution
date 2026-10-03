---
title: AC Impedance and Phase Explorer
description: Combine resistance and net reactance into impedance, find the phase angle, and see whether current leads or lags voltage.
status: built
quality_score: 90
image: /sims/ac-impedance-phase-explorer/ac-impedance-phase-explorer.png
og:image: /sims/ac-impedance-phase-explorer/ac-impedance-phase-explorer.png
twitter:image: /sims/ac-impedance-phase-explorer/ac-impedance-phase-explorer.png
social:
   cards: false
---

# AC Impedance and Phase Explorer

<iframe src="main.html" height="647px" width="100%" scrolling="no"></iframe>

[Run the AC Impedance and Phase Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

[Open the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

Sliders for resistance, inductive reactance, capacitive reactance, and source voltage drive an impedance triangle, a numeric readout, and a voltage and current waveform plot. The same angle appears as the triangle's angle and as the timing shift between the two waveforms.

## How to Use

1. Drag the **XL** and **XC** sliders and watch net reactance X change sign.
2. Notice that positive X makes current lag and negative X makes current lead.
3. Pick **Resonant** in the example menu to see |Z| equal R.
4. Press **Quiz me** to hide the results, enter |Z|, φ, and the timing, and press **Check**. Two attempts per answer, then the answer is shown.

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/power-generation-and-distribution/sims/ac-impedance-phase-explorer/main.html"
        height="647px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Learners will calculate impedance magnitude and phase angle for a series R, L, C circuit and classify current as leading, lagging, or in phase.

### Prerequisites

- Resistance, inductive reactance, and capacitive reactance
- Phase angle and leading or lagging current

### Suggested Activity

1. Load the chapter example and confirm |Z| = 22.9 Ω and φ = 29.2°.
2. Raise XC above XL and describe what happens to the angle and the waveforms.
3. Set XL = XC and explain why |Z| = R and not zero.
4. Take three quizzes: net inductive, net capacitive, and resonant.

### Assessment

Mastery is every quiz answer correct within two attempts across three quizzes that include inductive, capacitive, and resonant settings.

## References

1. [Chapter 2: AC Circuits and Power Factor](../../chapters/02-ac-circuits-power-factor/index.md) - Equations and worked examples used by the activity.
2. [p5.js Reference](https://p5js.org/reference/) - Documentation for the interactive graphics library.
