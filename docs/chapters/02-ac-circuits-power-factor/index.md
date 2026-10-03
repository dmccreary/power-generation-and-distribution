---
title: AC Circuits and Power Factor
description: Impedance, phase angle, resistive and reactive loads, the AC power triangle, and leading or lagging power factor.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 08:22:00
version: 1.11
---

# AC Circuits and Power Factor

## Summary

This chapter develops the behavior of AC circuits and the different forms of power they exchange. Students connect impedance and reactance to resistive, inductive, and capacitive loads, then use the power triangle to interpret real, reactive, and apparent power. By the end, they will be able to explain and calculate leading, lagging, and overall power factor.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Capacitance | 35 |
| Inductance | 43 |
| Resistive Load | 61 |
| Impedance | 644 |
| Phase Angle | 121 |
| Reactance | 59 |
| Real Power | 60 |
| Inductive Load | 30 |
| Capacitive Load | 28 |
| Reactive Power | 26 |
| Apparent Power | 21 |
| Power Triangle | 10 |
| Power Factor | 9 |
| Leading Power Factor | 1 |
| Lagging Power Factor | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Electrical Foundations](../01-electrical-foundations/index.md)

---

!!! mascot-welcome "From Waveforms to Equipment Ratings"
    ![Relay waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    AC power calculations explain why two loads drawing the same current can perform different amounts of useful work—and why that difference matters to conductors, transformers, and utility service. By the end, you will be able to read that behavior from impedance and the power triangle; let's follow the flow!

Chapter 1 treated an ideal resistive load with voltage and current aligned. Real AC systems also contain motors, transformers, cables, capacitors, and electronic equipment that store energy temporarily in magnetic or electric fields. That storage shifts the timing of current relative to voltage and changes the current required to deliver a given amount of useful power.

The key progression is

1. identify how a load stores or dissipates energy,
2. express its opposition to AC as impedance,
3. determine the phase angle between voltage and current, and
4. translate that angle into real power, reactive power, apparent power, and power factor.

## AC Timing and Phase Angle

Two sinusoidal quantities can have the same frequency but reach corresponding points at different times. **Phase angle**, written \(\phi\), measures that displacement. One complete cycle is \(360^\circ\) or \(2\pi\) radians. A quarter-cycle displacement is \(90^\circ\), and a half-cycle displacement is \(180^\circ\).

Using voltage as the reference, write

\[
v(t)=V_{\text{peak}}\sin(\omega t)
\]

\[
i(t)=I_{\text{peak}}\sin(\omega t-\phi)
\]

where \(\omega=2\pi f\) is angular frequency in radians per second. A positive \(\phi\) in this convention means current reaches corresponding points later than voltage, so current **lags** voltage. A negative \(\phi\) means current reaches them earlier, so current **leads** voltage.

At \(60\ \text{Hz}\), one cycle takes \(16.67\ \text{ms}\). A \(30^\circ\) displacement is one-twelfth of a cycle, so its time displacement is

\[
\Delta t=\frac{30^\circ}{360^\circ}(16.67\ \text{ms})=1.389\ \text{ms}
\]

This timing interpretation makes phase concrete: an angle describes a fraction of a repeating cycle, not a separate kind of voltage or current.

!!! mascot-thinking "Phase Is Timing"
    ![Relay thinking about AC timing](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A phasor angle is a compact way to record timing between sinusoids of the same frequency. When the signs become confusing, return to the waveforms and ask which one reaches its peak first.

## Resistance, Inductance, and Capacitance

A **resistive load** converts electrical energy into heat, light, mechanical output, or another nonrecoverable form in the ideal circuit model. For a pure resistor, voltage and current are in phase: \(\phi=0^\circ\). Its opposition is resistance \(R\), measured in ohms, and its current is \(I=V/R\) when RMS values are used consistently.

### Worked Example: Pure Resistive Load

An ideal \(120\ \text{V RMS}\) heater has \(R=24.0\ \Omega\). Its current is

\[
I=\frac{120\ \text{V}}{24.0\ \Omega}=5.00\ \text{A}
\]

Voltage and current cross zero and reach their peaks together. The heater's power factor is 1.00, so all of its apparent power becomes real power in the ideal model.

**Inductance** is the property by which a changing current establishes a changing magnetic field and induces a voltage that opposes the change in current. Its symbol is \(L\), and its unit is the henry (H). An ideal inductor stores energy in its magnetic field and later returns that energy to the circuit:

\[
E_L=\frac{1}{2}LI^2
\]

An **inductive load** has net inductive behavior. Motors and transformers require magnetic fields, so they commonly draw inductive current. For a pure inductor, current lags voltage by \(90^\circ\). Real inductive equipment also has winding resistance and useful real-power demand, so its lag is normally less than \(90^\circ\).

**Capacitance** is the property by which separated charge stores energy in an electric field. Its symbol is \(C\), and its unit is the farad (F). An ideal capacitor stores

\[
E_C=\frac{1}{2}CV^2
\]

A **capacitive load** has net capacitive behavior. For a pure capacitor, current leads voltage by \(90^\circ\). Capacitor banks intentionally provide capacitive behavior that can offset part of an inductive load's reactive demand. Cables and electronic input filters also contribute capacitance.

The following table reinforces the energy and phase behavior just described.

| Ideal element | Energy behavior | Current relative to voltage | Phase angle \(\phi\) |
|---|---|---|---:|
| Resistor | Converts energy to a nonrecoverable form | In phase | \(0^\circ\) |
| Inductor | Stores and returns magnetic-field energy | Lags | \(+90^\circ\) |
| Capacitor | Stores and returns electric-field energy | Leads | \(-90^\circ\) |

## Reactance

**Reactance** is opposition to AC caused by energy storage rather than energy dissipation. Like resistance, reactance is measured in ohms. Unlike an ideal resistance, an ideal reactance depends on frequency and shifts the phase between voltage and current.

Inductive reactance is

\[
X_L=2\pi fL
\]

As frequency increases, an inductor opposes current more strongly because its magnetic field must change more rapidly. For \(L=0.100\ \text{H}\) at \(60.0\ \text{Hz}\),

\[
X_L=2\pi(60.0\ \text{Hz})(0.100\ \text{H})=37.7\ \Omega
\]

Capacitive reactance is

\[
X_C=\frac{1}{2\pi fC}
\]

As frequency increases, a capacitor opposes current less because it repeatedly charges and discharges over shorter intervals. For \(C=100\ \mu\text{F}\) at \(60.0\ \text{Hz}\),

\[
X_C=\frac{1}{2\pi(60.0\ \text{Hz})(100\times10^{-6}\ \text{F})}=26.5\ \Omega
\]

The opposite frequency trends are useful checks. If a calculated \(X_L\) decreases when frequency rises, or a calculated \(X_C\) increases, the formula was likely entered incorrectly.

!!! mascot-tip "Use the Frequency Trend as a Check"
    ![Relay sharing a reactance tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Remember “L rises, C falls”: inductive reactance rises with frequency, while capacitive reactance falls. Predict the direction before calculating so a reciprocal error cannot hide behind a plausible-looking number.

## Impedance

**Impedance** is the total opposition an AC circuit presents to current, combining resistance and reactance. Its symbol is \(Z\), and its unit is the ohm. Because resistance and reactance represent effects separated by \(90^\circ\), they cannot be added as ordinary scalar magnitudes. Complex notation preserves both magnitude and phase:

\[
Z=R+jX
\]

where \(j=\sqrt{-1}\) and the net reactance of a series RLC circuit is

\[
X=X_L-X_C
\]

The sign of \(X\) identifies the net load behavior. Positive \(X\) is inductive, negative \(X\) is capacitive, and \(X=0\) is purely resistive at that operating frequency. Impedance magnitude and angle are

\[
|Z|=\sqrt{R^2+X^2}
\]

\[
\phi=\tan^{-1}\left(\frac{X}{R}\right)
\]

For a series circuit, RMS current magnitude is

\[
I=\frac{V}{|Z|}
\]

These equations turn the physical load behavior into a calculation chain: frequency determines reactance, reactance combines with resistance to form impedance, and impedance determines current magnitude and phase.

### Worked Example: Series RLC Impedance

At \(60.0\ \text{Hz}\), a series circuit has \(R=20.0\ \Omega\), \(L=0.100\ \text{H}\), and \(C=100\ \mu\text{F}\). The preceding calculations give \(X_L=37.7\ \Omega\) and \(X_C=26.5\ \Omega\), so

\[
X=37.7-26.5=11.2\ \Omega
\]

\[
Z=20.0+j11.2\ \Omega
\]

\[
|Z|=\sqrt{(20.0)^2+(11.2)^2}=22.9\ \Omega
\]

\[
\phi=\tan^{-1}\left(\frac{11.2}{20.0}\right)=29.2^\circ
\]

The positive angle identifies a net inductive circuit, so current lags voltage. With \(120\ \text{V RMS}\), current magnitude is

\[
I=\frac{120\ \text{V}}{22.9\ \Omega}=5.24\ \text{A}
\]

The angle comes from the ratio of reactance to resistance, while the current magnitude comes from the full impedance magnitude. Dividing by resistance alone would overstate the current.

!!! mascot-warning "Do Not Add Ohms as Plain Numbers"
    ![Relay giving an impedance warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common mistake is to write \(|Z|=R+X_L-X_C\), which ignores the right-angle relationship between resistance and reactance. First find net reactance, then combine it with resistance using \(|Z|=\sqrt{R^2+X^2}\).

Before the activity, note that **net inductive** means \(X_L>X_C\), **net capacitive** means \(X_C>X_L\), and **resonant** in this series model means \(X_L=X_C\), leaving \(Z=R\). In the activity, drag the sliders to see how resistance and reactance combine into impedance magnitude, phase angle, and leading or lagging current, then use **Quiz me** to test your own prediction.

#### Diagram: AC Impedance and Phase Explorer


<iframe src="../../sims/ac-impedance-phase-explorer/main.html" width="100%" height="647px" scrolling="no"></iframe>
[Run AC Impedance and Phase Explorer Fullscreen](../../sims/ac-impedance-phase-explorer/main.html)
[Run AC Impedance and Phase Explorer Fullscreen](../../sims/ac-impedance-phase-explorer/main.html)

<details markdown="1">
<summary>AC Impedance and Phase Explorer</summary>
Type: microsim
**sim-id:** ac-impedance-phase-explorer<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Template:** https://github.com/dmccreary/microsims/tree/main/docs/sims/analog-circuit<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate impedance magnitude and phase angle for a series R, L, C circuit and classify current as leading, lagging, or in phase with voltage.

**Prerequisites:** resistance, inductive reactance, capacitive reactance, impedance, phase angle, net inductive, net capacitive, resonant, leading current, lagging current, and in-phase current, all defined in the preceding prose.

**Evidence of Mastery:** In quiz mode the learner submits \(|Z|\), \(\phi\), and the current timing for the slider setting they chose. Magnitude is correct within ±0.1 Ω, angle within ±0.1°, and timing must match the sign of net reactance, with at most two attempts per answer. The running score “Quiz: n of 3k correct” covers k quizzes. Mastery is every answer correct within two attempts across at least three quizzes that include one net-inductive, one net-capacitive, and one resonant setting. Freely adjusting the sliders is not evidence.

**Misconceptions:** (1) Resistance and reactance magnitudes add directly. (2) Capacitive and inductive reactance always reinforce each other. (3) Positive phase angle means current leads voltage. (4) Equal inductive and capacitive reactance makes total impedance zero even when resistance is present.

**Instructional Rationale:** Sliders let the learner see impedance as the hypotenuse of a right triangle whose vertical leg changes sign with net reactance, and see the same angle as a timing shift between two waveforms. The optional quiz keeps Apply-level calculation: the learner must combine the components, compute the angle, and interpret its sign before the results are revealed, for any values they choose.

**Content:** The ideal series AC model runs at a fixed 60 Hz. An impedance triangle is drawn with resistance \(R\) as the horizontal leg, net reactance \(X=X_L-X_C\) as the vertical leg (up for inductive, down for capacitive), impedance \(|Z|\) as the hypotenuse, and the angle \(\phi\). The triangle auto-scales to fit. A readout lists \(X_L\), \(X_C\), \(X\), \(|Z|\), \(\phi\), RMS current \(I\), and whether the circuit is net inductive, capacitive, or resistive. Below the triangle, two cycles of voltage (blue) and current (red) are drawn at equal height, with a message such as “Current lags voltage by 29.2° (1.35 ms).” The activity labels all values “ideal series AC model.”

Controls are always visible in the control region:

| Control | Type | Minimum | Maximum | Step | Default | Unit |
|---|---|---:|---:|---:|---:|---|
| Resistance \(R\) | p5.js slider | 5 | 50 | 0.5 | 20 | Ω |
| Inductive reactance \(X_L\) | p5.js slider | 0 | 50 | 0.1 | 37.7 | Ω |
| Capacitive reactance \(X_C\) | p5.js slider | 0 | 50 | 0.1 | 26.5 | Ω |
| RMS source voltage \(V\) | p5.js slider | 24 | 240 | 12 | 120 | V |
| Example circuits | p5.js select | — | — | — | “Example circuits…” | — |
| Quiz me | p5.js button | — | — | — | — | — |

The Example circuits menu offers the chapter example (R 20, \(X_L\) 37.7, \(X_C\) 26.5), a net-capacitive circuit (20, 10, 25), a resonant circuit (20, 20, 20), and a resistive heater (24, 0, 0). Quiz mode replaces the waveform panel with two numeric inputs (\(|Z|\) in Ω, \(\phi\) in degrees), a timing select (Lagging, Leading, In phase), and a Check button; it hides the hypotenuse, angle, current, and waveforms, and locks the other controls. A Back to exploring button appears after a quiz is resolved.

**Provenance:** The default setting reproduces the worked example in “Impedance” (\(X_L=37.7\ \Omega\), \(X_C=26.5\ \Omega\), \(|Z|=22.9\ \Omega\), \(\phi=29.2^\circ\), \(I=5.24\ \text{A}\) at 120 V). Other presets and slider ranges are illustrative and labeled “ideal series AC model.” The formulas come from this chapter. The linked Analog Circuit MicroSim is a code template only.

**Rules:** \(X=X_L-X_C\); \(|Z|=\sqrt{R^2+X^2}\); \(\phi=\operatorname{atan2}(X,R)\) in degrees; \(I=V/|Z|\). If \(X>0\), timing is Lagging; if \(X<0\), Leading; if \(|X|<0.05\ \Omega\), In phase. Because \(R\ge5\ \Omega\), \(|Z|\) never reaches zero. Values are shown to 0.1 (current to 0.01 A). Quiz tolerances are ±0.1 Ω and ±0.1°.

**Learner Activity:**

1. The learner drags the sliders, or picks an example circuit, and watches the triangle, readouts, and waveforms update.
2. The learner compares a net-inductive setting (current lags) with a net-capacitive setting (current leads) and finds the resonant setting where \(|Z|=R\).
3. The learner presses Quiz me. Results are hidden and the controls lock.
4. The learner enters \(|Z|\), \(\phi\), and the timing, then presses Check. Each answer is scored separately with up to two attempts.
5. After all three answers are resolved, the results and waveforms are revealed. The learner presses Back to exploring, or moves a slider, to continue.

**Feedback:** In exploration, the message line states the sign rule: positive \(X\) means current lags, negative means current leads. In quiz mode, correct feedback is “Correct: |Z| = <value> Ω,” “Correct: φ = <value>°,” or “Correct: Current is <timing>.” A first incorrect answer includes a hint (combine R and X as \(\sqrt{R^2+X^2}\), not \(R+X\); \(\phi=\operatorname{atan2}(X,R)\); the sign of \(X\) sets the timing). After the second incorrect attempt, the correct value is shown and the answer counts as missed.

**Starting State:** The chapter example is loaded (\(R=20.0\ \Omega\), \(X_L=37.7\ \Omega\), \(X_C=26.5\ \Omega\), \(V=120\ \text{V}\)), showing \(|Z|=22.9\ \Omega\), \(\phi=29.2^\circ\), \(I=5.24\ \text{A}\), and current lagging.

**Chapter Anchors:** The chapter's series RLC example gives \(X_L=37.7\ \Omega\), \(X_C=26.5\ \Omega\), net \(X=11.2\ \Omega\), \(|Z|=22.9\ \Omega\), \(\phi=29.2^\circ\), and \(I=5.24\ \text{A}\) at \(120\ \text{V RMS}\).
</details>

## Three Forms of AC Power

Instantaneous power is \(p(t)=v(t)i(t)\). When sinusoidal voltage and current are out of phase, part of that instantaneous power moves from the source to a load's field and later returns to the source. The average over a complete cycle separates useful net energy transfer from this back-and-forth exchange.

**Real power** \(P\) is the average rate at which electrical energy is converted to useful work, heat, light, or other net output. For a single-phase sinusoidal circuit,

\[
P=VI\cos\phi
\]

where \(V\) and \(I\) are RMS values. Real power is measured in watts (W) or kilowatts (kW). The factor \(\cos\phi\) accounts for the portion of voltage-current product that produces net energy transfer.

### Worked Example: Real Power

A single-phase motor draws \(20.0\ \text{A}\) from \(240\ \text{V}\) at \(\phi=36.87^\circ\) lagging. Because \(\cos36.87^\circ=0.800\),

\[
P=(240\ \text{V})(20.0\ \text{A})(0.800)=3840\ \text{W}=3.84\ \text{kW}
\]

The product \(VI\) is larger than real power because the current includes both an in-phase component and a reactive component.

**Reactive power** \(Q\) measures the rate of energy exchange with electric and magnetic fields. It is measured in volt-amperes reactive (var) or kilovolt-amperes reactive (kvar):

\[
Q=VI\sin\phi
\]

Under the sign convention used here, inductive loads have positive \(Q\), while capacitive loads have negative \(Q\). Reactive power does not represent net energy consumption over a complete cycle, but it still requires current and therefore affects conductors, transformers, generators, and voltage regulation.

For the motor example, \(\sin36.87^\circ=0.600\), so

\[
Q=(240\ \text{V})(20.0\ \text{A})(0.600)=2880\ \text{var}=2.88\ \text{kvar}
\]

**Apparent power** \(S\) is the product of RMS voltage and RMS current without the phase correction:

\[
S=VI
\]

It is measured in volt-amperes (VA) or kilovolt-amperes (kVA). Apparent power represents the total electrical loading that source and distribution equipment must carry. For the same motor,

\[
S=(240\ \text{V})(20.0\ \text{A})=4800\ \text{VA}=4.80\ \text{kVA}
\]

The three results are consistent: \(3.84\ \text{kW}\), \(2.88\ \text{kvar}\), and \(4.80\ \text{kVA}\).

!!! mascot-warning "Keep the Units Attached"
    ![Relay giving an AC power warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Watts, vars, and volt-amperes are not interchangeable labels for the same number. Keep kW, kvar, and kVA attached throughout the calculation so the physical role of each component remains visible.

## The Power Triangle

The **power triangle** organizes real, reactive, and apparent power as perpendicular components. Real power forms one leg, reactive power forms the other, and apparent power is the hypotenuse. Their magnitudes satisfy

\[
S^2=P^2+Q^2
\]

The same phase angle \(\phi\) that describes voltage-current timing also appears between \(P\) and \(S\):

\[
\cos\phi=\frac{P}{S}
\]

\[
\tan\phi=\frac{Q}{P}
\]

For inductive loads, \(Q>0\) and \(\phi>0\). For capacitive loads, \(Q<0\) and \(\phi<0\). Apparent power magnitude \(S\) remains nonnegative in both cases.

### Worked Example: Reading a Power Triangle

Suppose an inductive load consumes \(P=8.00\ \text{kW}\) and exchanges \(Q=6.00\ \text{kvar}\). Apparent power is

\[
S=\sqrt{(8.00\ \text{kW})^2+(6.00\ \text{kvar})^2}=10.0\ \text{kVA}
\]

The phase angle is

\[
\phi=\tan^{-1}\left(\frac{6.00}{8.00}\right)=36.87^\circ
\]

If the reactive power were \(-6.00\ \text{kvar}\) instead, \(S\) would still be \(10.0\ \text{kVA}\), but \(\phi=-36.87^\circ\) and the load would be net capacitive. The sign controls direction; the squared magnitude controls the hypotenuse.

!!! mascot-encourage "Separate Magnitude from Direction"
    ![Relay offering encouragement](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    The power triangle often takes two passes because \(S\) is a magnitude while \(Q\) can be positive or negative. Calculate the triangle's size first, then use the sign of \(Q\) to decide leading or lagging behavior.

## Power Factor

**Power factor** is the ratio of real power to apparent power:

\[
\text{PF}=\frac{P}{S}
\]

For sinusoidal voltage and current with a single phase angle,

\[
\text{PF}=\cos\phi
\]

Power factor is dimensionless and normally reported between 0 and 1, along with “leading” or “lagging” when the direction matters. The magnitude indicates how effectively apparent power is converted to real power. A value of 1.00 means \(P=S\) and \(Q=0\). A value of 0.80 means 80 percent of the apparent-power magnitude appears as real power, not that the equipment is 80 percent energy efficient.

For the \(8\)-\(6\)-\(10\) triangle,

\[
\text{PF}=\frac{8.00\ \text{kW}}{10.0\ \text{kVA}}=0.800
\]

A **lagging power factor** means current lags voltage and the net reactive power is inductive. Motors and transformers commonly operate at lagging power factor. A **leading power factor** means current leads voltage and the net reactive power is capacitive. Capacitor banks can move a facility from a strongly lagging condition toward unity; excessive capacitance can produce a leading condition.

The words leading and lagging do not change the power-factor magnitude. Both \(+36.87^\circ\) and \(-36.87^\circ\) have \(|\cos\phi|=0.800\). The direction must come from the sign of phase angle, reactive power, or net reactance.

The following table summarizes the sign relationships after they have been developed.

| Net load | Net reactance \(X\) | Reactive power \(Q\) | Current timing | Power-factor description |
|---|---:|---:|---|---|
| Resistive | \(0\) | \(0\) | In phase | Unity |
| Inductive | Positive | Positive | Current lags voltage | Lagging |
| Capacitive | Negative | Negative | Current leads voltage | Leading |

!!! mascot-thinking "One Angle Connects Two Models"
    ![Relay thinking about impedance and power](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    The impedance triangle and power triangle use the same phase angle: \(\tan\phi=X/R\) and \(\tan\phi=Q/P\). That shared angle is the bridge from circuit properties to equipment loading.

Before the next activity, note that **unity power factor** means \(\text{PF}=1.00\), and **power-factor direction** means Leading, Lagging, or Unity. In the activity, drag the sliders to see how real and reactive power set apparent power, power factor, and direction, then use **Quiz me** to predict them before they are revealed.

#### Diagram: AC Power Triangle and Power Factor Calculator


<iframe src="../../sims/ac-power-triangle-calculator/main.html" width="100%" height="582px" scrolling="no"></iframe>
[Run AC Power Triangle and Power Factor Calculator Fullscreen](../../sims/ac-power-triangle-calculator/main.html)
[Run AC Power Triangle and Power Factor Calculator Fullscreen](../../sims/ac-power-triangle-calculator/main.html)

<details markdown="1">
<summary>AC Power Triangle and Power Factor Calculator</summary>
Type: microsim
**sim-id:** ac-power-triangle-calculator<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Template:** https://github.com/dmccreary/circuits/tree/main/docs/sims/power-triangle<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate apparent power, power-factor magnitude, phase angle, and power-factor direction from real and reactive power for AC loads.

**Prerequisites:** real power, reactive power, apparent power, power triangle, power factor, phase angle, leading power factor, lagging power factor, and unity power factor, all defined in the preceding prose.

**Evidence of Mastery:** In quiz mode the learner submits \(S\), PF, \(\phi\), and Leading, Lagging, or Unity for the slider setting they chose. \(S\) is correct within ±0.01 kVA, PF within ±0.001, angle within ±0.1°, and direction must match the sign of \(Q\), with at most two attempts per answer. The running score “Quiz: n of 4k correct” covers k quizzes. Mastery is every answer correct within two attempts across at least three quizzes that include one positive-\(Q\), one negative-\(Q\), and one zero-\(Q\) setting. Freely adjusting the sliders is not evidence.

**Misconceptions:** (1) Reactive power is always positive. (2) kW, kvar, and kVA can be substituted for one another. (3) PF alone reveals leading or lagging direction. (4) A power factor of 0.80 is the same as 80 percent energy efficiency.

**Instructional Rationale:** Sliders let the learner watch the triangle's legs and hypotenuse change and see that positive and negative \(Q\) give the same \(S\) and PF but opposite direction. The share bar shows PF as the fraction of apparent power that is real power, which addresses the efficiency misconception. The optional quiz keeps Apply-level calculation by requiring a prediction before the results appear.

**Content:** A power triangle is drawn with real power \(P\) as the horizontal leg, reactive power \(Q\) as the vertical leg (up for positive, down for negative), apparent power \(S\) as the hypotenuse, and the angle \(\phi\). The triangle auto-scales. A readout lists \(P\), \(Q\), \(S\), PF, \(\phi\), and direction. A bar shows the percentage of \(S\) that is real power, with a note that PF alone never gives direction and that 0.8 PF is not 80 percent efficiency. The sign convention is \(Q>0\) for inductive loads, \(Q<0\) for capacitive loads, and \(Q=0\) for unity power factor. The activity labels all values “illustrative AC load.”

Controls are always visible in the control region:

| Control | Type | Minimum | Maximum | Step | Default | Unit |
|---|---|---:|---:|---:|---:|---|
| Real power \(P\) | p5.js slider | 1 | 20 | 0.5 | 8 | kW |
| Reactive power \(Q\) | p5.js slider | −15 | 15 | 0.5 | 6 | kvar |
| Example loads | p5.js select | — | — | — | “Example loads…” | — |
| Quiz me | p5.js button | — | — | — | — | — |

The Example loads menu offers 8 kW with +6 kvar (the chapter example), 8 kW with −6 kvar, 12 kW with 0 kvar, and 15 kW with +8 kvar. Quiz mode replaces the share bar with numeric inputs for \(S\) (kVA), PF, and \(\phi\) (degrees), a direction select (Lagging, Leading, Unity), and a Check button; it hides \(S\), PF, \(\phi\), direction, and the hypotenuse, and locks the other controls. A Back to exploring button appears after a quiz is resolved.

**Provenance:** The default setting and the negative-\(Q\) preset come from the worked example in “The Power Triangle.” The 12 kW unity load, the 15 kW motor (matching Review Problem 4), and the slider ranges are illustrative and labeled “illustrative AC load.” Equations and sign conventions come from this chapter. The linked Power Triangle Visualization is a code template only.

**Rules:** \(S=\sqrt{P^2+Q^2}\); \(\text{PF}=P/S\); \(\phi=\operatorname{atan2}(Q,P)\) in degrees. If \(Q>0\), direction is Lagging; if \(Q<0\), Leading; if \(|Q|<0.05\ \text{kvar}\), Unity. Because \(P\ge1\ \text{kW}\), \(S\) never reaches zero. PF is displayed to three decimals, \(S\) to two, and \(\phi\) to one. Quiz tolerances are ±0.01 kVA, ±0.001 PF, and ±0.1°.

**Learner Activity:**

1. The learner drags the sliders, or picks an example load, and watches the triangle, readout, and share bar update.
2. The learner compares +6 kvar with −6 kvar at the same \(P\) and observes equal \(S\) and PF but opposite angle and direction, then sets \(Q=0\) to reach unity.
3. The learner presses Quiz me. Results are hidden and the controls lock.
4. The learner enters \(S\), PF, \(\phi\), and direction, then presses Check. Each answer is scored separately with up to two attempts.
5. After all four answers are resolved, the results are revealed. The learner presses Back to exploring, or moves a slider, to continue.

**Feedback:** In exploration, the message line reminds the learner that \(Q>0\) is inductive and lagging, \(Q<0\) is capacitive and leading, and \(S\) is always positive. In quiz mode, correct feedback is “Correct: S = <value> kVA,” “Correct: PF = <value>,” “Correct: φ = <value>°,” or “Correct: Direction: <direction>.” A first incorrect answer includes a hint (\(S=\sqrt{P^2+Q^2}\); \(\text{PF}=P/S\); \(\phi=\operatorname{atan2}(Q,P)\); the sign of \(Q\) sets direction). After the second incorrect attempt, the correct value is shown and the answer counts as missed.

**Starting State:** The chapter example is loaded (\(P=8.0\ \text{kW}\), \(Q=+6.0\ \text{kvar}\)), showing \(S=10.00\ \text{kVA}\), \(\text{PF}=0.800\), \(\phi=36.9^\circ\), and a Lagging direction.

**Chapter Anchors:** The chapter's power-triangle example gives \(P=8.00\ \text{kW}\), \(Q=\pm6.00\ \text{kvar}\), \(S=10.0\ \text{kVA}\), \(\text{PF}=0.800\), and \(\phi=\pm36.87^\circ\); it defines positive \(Q\) as lagging and negative \(Q\) as leading. Review Problem 4 (15.0 kW, +8.00 kvar) gives \(S=17.0\ \text{kVA}\) and \(\text{PF}=0.882\).
</details>

## Why Power Factor Matters to Designers

For a given single-phase real-power requirement and voltage,

\[
I=\frac{P}{V\,\text{PF}}
\]

Lower power factor therefore requires more current to deliver the same real power. That additional current increases conductor loss, voltage drop, and the kVA loading of upstream equipment. Power factor does not directly tell energy efficiency, but poor power factor can make the delivery system operate less effectively.

### Worked Example: Current at Two Power Factors

A single-phase load requires \(10.0\ \text{kW}\) at \(240\ \text{V}\). At \(\text{PF}=0.800\) lagging,

\[
I=\frac{10{,}000\ \text{W}}{(240\ \text{V})(0.800)}=52.1\ \text{A}
\]

At unity power factor,

\[
I=\frac{10{,}000\ \text{W}}{(240\ \text{V})(1.00)}=41.7\ \text{A}
\]

The real-power output is unchanged, but the lower-power-factor case requires \(10.4\ \text{A}\) more current. A designer must account for that current when evaluating conductors, transformers, switchgear, and utility demand requirements.

Power-factor correction commonly adds capacitance near inductive loads so part of the inductive reactive demand is supplied locally. Correction should be based on measured or calculated operating conditions rather than a goal of “as much capacitance as possible.” Loads vary, and overcorrection can create a leading condition or interact poorly with system resonance and harmonics. Detailed capacitor sizing appears later in the book.

!!! mascot-tip "Ask Which Quantity Must Stay Fixed"
    ![Relay sharing a power-factor tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When comparing power-factor cases, state what is held constant—usually real power and voltage. That one sentence makes the current comparison unambiguous and prevents accidental comparison of different loads.

## Integrated AC Circuit Example

Return to the series RLC example supplied by \(120\ \text{V RMS}\). It has \(|Z|=22.9\ \Omega\), \(I=5.24\ \text{A}\), and \(\phi=29.2^\circ\) lagging. Apparent power is approximately

\[
S=VI=(120)(5.24)=629\ \text{VA}
\]

Power factor is

\[
\text{PF}=\cos29.2^\circ=0.873\ \text{lagging}
\]

Real and reactive power are then

\[
P=S\cos\phi=(629)(0.873)=549\ \text{W}
\]

\[
Q=S\sin\phi=(629)\sin29.2^\circ=307\ \text{var}
\]

The same angle appears in every layer of the analysis. The impedance angle says current lags because the circuit is net inductive. The power triangle says reactive power is positive. The power factor reports how much of the apparent-power magnitude becomes real power. These are different views of one operating state.

## Key Takeaways

- Phase angle expresses the timing displacement between voltage and current at the same frequency.
- Resistance dissipates energy; ideal inductance and capacitance store and return field energy.
- Inductive reactance rises with frequency, while capacitive reactance falls with frequency.
- Impedance combines resistance and net reactance as \(Z=R+j(X_L-X_C)\).
- Net inductive loads draw lagging current; net capacitive loads draw leading current.
- Real power in watts produces net energy transfer, reactive power in vars describes field-energy exchange, and apparent power in VA describes total source and conductor loading.
- The power triangle satisfies \(S^2=P^2+Q^2\), and power factor is \(P/S=\cos\phi\).
- Lower power factor requires more current to deliver the same real power at the same voltage.

## Review Problems

1. Calculate \(X_L\) for \(L=80.0\ \text{mH}\) at \(60.0\ \text{Hz}\).
2. Calculate \(X_C\) for \(C=150\ \mu\text{F}\) at \(60.0\ \text{Hz}\).
3. A series circuit has \(R=30.0\ \Omega\), \(X_L=40.0\ \Omega\), and \(X_C=0\). Calculate \(|Z|\), \(\phi\), and current from a \(120\ \text{V RMS}\) source.
4. A load has \(P=15.0\ \text{kW}\) and \(Q=+8.00\ \text{kvar}\). Calculate \(S\), PF, phase angle, and power-factor direction.
5. Explain why a capacitor can reduce current in a facility with a lagging inductive load even though the capacitor itself draws current.

??? question "Check your answers"
    1. \(X_L=2\pi(60.0)(0.0800)=30.2\ \Omega\).
    2. \(X_C=1/[2\pi(60.0)(150\times10^{-6})]=17.7\ \Omega\).
    3. \(|Z|=\sqrt{30.0^2+40.0^2}=50.0\ \Omega\); \(\phi=\tan^{-1}(40.0/30.0)=53.13^\circ\); \(I=120/50.0=2.40\ \text{A}\), lagging.
    4. \(S=\sqrt{15.0^2+8.00^2}=17.0\ \text{kVA}\); \(\text{PF}=15.0/17.0=0.882\); \(\phi=\tan^{-1}(8.00/15.0)=28.07^\circ\); lagging because \(Q>0\).
    5. The capacitor supplies negative reactive power that offsets part of the load's positive inductive reactive power. With less net \(|Q|\), apparent power and source current fall for the same real power and voltage.

!!! mascot-celebration "AC Power Relationships Connected"
    ![Relay celebrating the completed chapter](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now move from R, L, and C through impedance and phase angle to kW, kvar, kVA, and power factor. That chain is the foundation for sizing AC equipment and diagnosing why current is higher than useful power alone would suggest.
