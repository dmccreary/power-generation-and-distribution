---
title: Electrical Power and Energy Calculator
description: Calculate electric power and accumulated electrical energy for ideal resistive loads while distinguishing watts from kilowatt-hours.
status: built
quality_score: 95
image: /sims/electrical-power-energy-calculator/electrical-power-energy-calculator.png
og:image: /sims/electrical-power-energy-calculator/electrical-power-energy-calculator.png
twitter:image: /sims/electrical-power-energy-calculator/electrical-power-energy-calculator.png
social:
   cards: false
---

# Electrical Power and Energy Calculator

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run the Electrical Power and Energy Calculator Fullscreen](./main.html){ .md-button .md-button--primary }

[Open the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

This calculator separates electric power, the rate of energy conversion, from electrical energy accumulated over time. Sliders for voltage, current, and operating time update a flow diagram (V × I → power → energy) and two bars right away, and a note explains which quantity changed.

## How to Use

Drag the voltage, current, and time sliders, or pick an **Example load**. Press **Double the time** to see that power stays the same while energy doubles. To test yourself, press **Quiz me**: the results are hidden and the sliders lock until you enter power in watts and energy in kilowatt-hours and press **Check**. You have two attempts per value, then the answer is shown.

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/power-generation-and-distribution/sims/electrical-power-energy-calculator/main.html"
        height="602px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Learners will calculate electric power in watts or kilowatts and electrical energy in kilowatt-hours for ideal resistive operating cases.

### Prerequisites

- Voltage and current
- Electric power and the watt
- Electrical energy, kilowatt, and kilowatt-hour
- Operating time in hours

### Suggested Activity

1. Ask learners to label every answer with a unit before entering it.
2. Compare a power bar with an energy bar and discuss why the scales represent different physical quantities.
3. In exploration mode, double time while holding voltage and current fixed, then explain the result.

### Assessment

Mastery is six correct calculated values out of six within two attempts each. The prediction question checks whether learners can distinguish an unchanged rate from accumulated energy.

## References

1. [Chapter 1: Electrical Foundations](../../chapters/01-electrical-foundations/index.md) - Power, energy, unit conversions, and worked values used by the activity.
2. [p5.js Reference](https://p5js.org/reference/) - Documentation for the interactive graphics library.
