---
title: Circuit Quantity Explorer
description: Calculate current and charge transfer in ideal open and closed resistive circuits, then explore how voltage, resistance, time, and circuit state affect the results.
status: built
quality_score: 95
image: /sims/circuit-quantity-explorer/circuit-quantity-explorer.png
og:image: /sims/circuit-quantity-explorer/circuit-quantity-explorer.png
twitter:image: /sims/circuit-quantity-explorer/circuit-quantity-explorer.png
social:
   cards: false
---

# Circuit Quantity Explorer

<iframe src="main.html" height="587px" width="100%" scrolling="no"></iframe>

[Run the Circuit Quantity Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

[Open the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

This activity links Ohm's law, current as charge flow rate, and the requirement for a complete circuit. Sliders for voltage, resistance, and time and a switch checkbox update the circuit, current, and charge immediately, with the substituted numbers shown in the readout.

## How to Use

Drag the voltage, resistance, and time sliders and watch I = V/R and Q = I·t recalculate. Clear the **Switch closed** checkbox to open the circuit. To test yourself, set any values and press **Quiz me on these values**: the results are hidden and the sliders lock until you enter I and Q and press **Check**. You have two attempts per value, then the answer is shown.

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/power-generation-and-distribution/sims/circuit-quantity-explorer/main.html"
        height="587px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Learners will calculate current and one-second charge transfer for closed and open ideal resistive circuits.

### Prerequisites

- Electric charge, voltage, current, and resistance
- Closed and open circuits
- Ohm's law, \(I=V/R\)
- Charge transfer, \(Q=It\)

### Suggested Activity

1. Have learners solve all three challenges independently before discussing the feedback.
2. In exploration mode, hold voltage fixed and increase resistance; ask learners to explain the direction of the current change.
3. Open the circuit while leaving the displayed source voltage unchanged; discuss why the ideal-model current is zero.

### Assessment

Mastery is six correct values out of six within two attempts per value. Exploration is formative and does not change the score.

## References

1. [Chapter 1: Electrical Foundations](../../chapters/01-electrical-foundations/index.md) - Definitions, equations, and challenge values used by the activity.
2. [p5.js Reference](https://p5js.org/reference/) - Documentation for the interactive graphics library.
