---
title: Three-Phase Systems and Power-System Representation
description: Single-phase and three-phase power, line and phase voltage, wye and delta connections, the four stages of the power system, per-unit quantities, and single-line diagrams.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 09:56:09
version: 1.11
---

# Three-Phase Systems and Power-System Representation

## Summary

This chapter extends AC fundamentals into single-phase and three-phase systems and introduces the visual language of power-system design. Students examine phase sequence, load balance, line and phase voltage, wye and delta connections, system stages, per-unit quantities, and one-line symbols. They will be able to interpret basic single-line diagrams and relate them to the path of electrical power.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Power System Components | 618 |
| Generation Stage | 91 |
| Transmission Stage | 60 |
| Distribution Stage | 265 |
| Utilization Stage | 190 |
| Single-Phase Power | 35 |
| Three-Phase Power | 34 |
| Phase Sequence | 2 |
| Balanced Load | 2 |
| Line Voltage | 6 |
| Phase Voltage | 6 |
| Single-Line Diagram | 11 |
| Per-Unit System | 1 |
| Unbalanced Load | 1 |
| Wye Connection | 3 |
| Delta Connection | 2 |
| One-Line Symbols | 3 |
| Neutral Conductor | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Electrical Foundations](../01-electrical-foundations/index.md)
- [Chapter 2: AC Circuits and Power Factor](../02-ac-circuits-power-factor/index.md)

---

!!! mascot-welcome "From One Circuit to a Whole System"
    ![Relay waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Chapters 1 and 2 followed one voltage and one current. A real power system carries three of each at once, at voltages that change by a factor of ten thousand between the generator and the outlet. By the end, you will be able to read a single-line diagram and explain what every line and symbol on it stands for; let's follow the flow!

Chapter 2 analyzed a single-phase circuit: one voltage, one current, and one phase angle between them. Utilities do not generate or move bulk power that way. They use three voltages of the same frequency, displaced in time, carried on three conductors. This chapter explains why, shows how line and phase quantities relate in the two basic three-phase connections, and then steps back to the whole system: its components, its four stages, and the drawing conventions designers use to describe it.

The chapter has two halves. The first half builds the three-phase model, from single-phase power through wye and delta connections and unbalanced loads. The second half uses that model to describe the power system's stages, to normalize quantities with the per-unit system, and to read single-line diagrams.

## Single-Phase and Three-Phase Power

**Single-phase power** uses one alternating voltage supplied through two conductors, a source conductor and a return. Homes and small commercial loads use it, typically at \(120\ \text{V}\) and \(240\ \text{V}\) in North America. Chapter 2 showed that real power in a single-phase circuit is \(P=VI\cos\phi\). The instantaneous power, however, is not constant. For a resistive load it rises to a peak and falls to zero twice per cycle, so it pulsates at twice the system frequency. A generator or motor driven by single-phase power must absorb that pulsation as vibration.

**Three-phase power** uses three alternating voltages of equal frequency, normally equal magnitude, each displaced from the next by \(120^\circ\), or one-third of a cycle. The three voltages are labeled phase A, phase B, and phase C. With phase A as the reference,

\[
v_A(t)=V_{\text{peak}}\sin(\omega t)
\]

\[
v_B(t)=V_{\text{peak}}\sin(\omega t-120^\circ)
\]

\[
v_C(t)=V_{\text{peak}}\sin(\omega t-240^\circ)
\]

At \(60\ \text{Hz}\), one cycle lasts \(16.67\ \text{ms}\), so a \(120^\circ\) displacement is \(5.56\ \text{ms}\). Phase B therefore reaches each of its peaks \(5.56\ \text{ms}\) after phase A does, and phase C reaches its peaks another \(5.56\ \text{ms}\) later.

Two properties make this arrangement useful. First, when the three phases carry equal currents, their combined instantaneous power is constant rather than pulsating, so three-phase machines run with smoother torque. Second, the three voltages add to zero at every instant, which allows three conductors to do the work that three separate single-phase circuits would need six conductors to do. For the same real power, three-phase delivery needs less conductor material and smaller machines than single-phase delivery.

The following comparison summarizes the two systems.

| Feature | Single-phase | Three-phase |
|---|---|---|
| Voltages | One | Three, displaced \(120^\circ\) |
| Instantaneous power (balanced) | Pulsates at twice the frequency | Constant |
| Conductors for the circuit | Two | Three (or four with a neutral) |
| Typical use | Homes, small loads | Utility transmission, large buildings, industrial motors |

### Phase Sequence

**Phase sequence** is the order in which the phase voltages reach their positive peaks. In the equations above the order is A, then B, then C, written ABC. Swapping any two phase conductors produces the opposite order, ACB. Both sequences have the same voltage magnitudes, but a three-phase induction motor rotates in the opposite direction when its supply sequence is reversed. A designer or installer therefore confirms sequence with a phase-rotation meter before connecting motors, and utilities keep sequence consistent where systems interconnect.

### Balanced Loads and the Sum of Currents

A **balanced load** presents the same impedance in each of the three phases. Under balanced, sinusoidal conditions the three currents have equal magnitude and are displaced by \(120^\circ\), exactly like the voltages, so they also sum to zero. Balance is the normal design intent: it makes the single-phase analysis of Chapter 2 sufficient, because analyzing one phase tells the whole story.

Before the next activity, note that **balanced** here means equal amplitudes and \(120^\circ\) spacing, and that **unbalanced** means any departure from that. The activity shows the three waveforms and their instantaneous sum.

#### Diagram: Three-Phase Waveform Explorer

<details markdown="1">
<summary>Three-Phase Waveform Explorer</summary>
Type: microsim
**sim-id:** three-phase-waveform-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** differentiate<br/>
**Learning Objective:** The learner will differentiate balanced from unbalanced three-phase voltages and ABC from ACB phase sequence by examining three waveforms and their instantaneous sum.

**Prerequisites:** single-phase power, three-phase power, phase sequence, balanced load, unbalanced load, peak voltage, and the \(120^\circ\) displacement, all defined in the preceding prose.

**Evidence of Mastery:** In quiz mode the learner names the phase sequence and states whether the set of voltages is Balanced or Unbalanced for each of six fixed cases. An answer is correct when it matches the Content table. Each answer allows two attempts. Mastery is at least 10 of 12 answers correct within two attempts. Moving sliders in exploration mode is not evidence.

**Misconceptions:** (1) Phases that are \(120^\circ\) apart always sum to zero, regardless of amplitude. (2) Phase sequence changes the voltage magnitudes. (3) Three-phase voltages reach their peaks at the same time. (4) A larger amplitude in one phase simply makes the system stronger instead of unbalanced.

**Instructional Rationale:** Analyze-level work asks the learner to separate a pattern into its parts and compare them. Seeing the dashed sum line stay at zero for equal amplitudes and move away from zero when one amplitude changes lets the learner connect balance to a measurable consequence, and the quiz requires committing to a judgment before the labels return.

**Content:** Three sinusoidal voltage waveforms, \(v_A\), \(v_B\), and \(v_C\), are drawn for two cycles at 60 Hz (33.33 ms). A fourth dashed waveform shows \(v_A+v_B+v_C\). A readout lists the phase sequence, the time in milliseconds at which each phase first reaches its positive peak, and the peak of the sum. For ABC sequence with equal amplitudes, the first positive peaks occur at 4.17 ms (A), 9.72 ms (B), and 15.28 ms (C). For ACB sequence the B and C times swap. The model is labeled “ideal three-phase voltages.”

The six quiz cases appear in this order:

| Case | Sequence | \(V_A\) | \(V_B\) | \(V_C\) | Correct balance | Peak of sum | Why (shown as feedback) |
|---|---|---:|---:|---:|---|---:|---|
| 1 | ABC | 170 V | 170 V | 170 V | Balanced | 0 V | Equal amplitudes spaced \(120^\circ\) cancel at every instant; B peaks after A, then C. |
| 2 | ACB | 170 V | 170 V | 170 V | Balanced | 0 V | The amplitudes are equal, so the sum is zero; C now peaks before B, so the sequence is ACB. |
| 3 | ABC | 170 V | 170 V | 100 V | Unbalanced | 70.0 V | Phase C is smaller, so the three voltages no longer cancel. |
| 4 | ACB | 120 V | 170 V | 170 V | Unbalanced | 50.0 V | Phase A is smaller, so the sum is not zero; C peaks before B. |
| 5 | ABC | 140 V | 140 V | 140 V | Balanced | 0 V | A lower amplitude does not cause imbalance when all three match. |
| 6 | ACB | 170 V | 100 V | 170 V | Unbalanced | 70.0 V | Phase B is smaller; C peaks before B, so the sequence is ACB. |

The adjustable quantities are:

| Quantity | Minimum | Maximum | Step | Default | Unit |
|---|---:|---:|---:|---:|---|
| Phase A peak \(V_A\) | 50 | 200 | 10 | 170 | V |
| Phase B peak \(V_B\) | 50 | 200 | 10 | 170 | V |
| Phase C peak \(V_C\) | 50 | 200 | 10 | 170 | V |

A phase-sequence select offers ABC and ACB, with ABC as the default.

**Provenance:** The waveform equations and the \(120^\circ\) and 5.56 ms values come from this chapter's section “Single-Phase and Three-Phase Power.” Case amplitudes and slider ranges are illustrative and labeled “ideal three-phase voltages.” The peak of the sum for unbalanced cases is the magnitude of the phasor sum of the three voltages.

**Rules:** For ABC, \(v_B\) lags \(v_A\) by \(120^\circ\) and \(v_C\) lags \(v_A\) by \(240^\circ\). For ACB, \(v_C\) lags \(v_A\) by \(120^\circ\) and \(v_B\) lags \(v_A\) by \(240^\circ\). The set is Balanced if and only if \(V_A=V_B=V_C\); otherwise it is Unbalanced. The peak of the sum equals the magnitude of \(V_A+V_B\angle-120^\circ+V_C\angle-240^\circ\) for ABC, with the B and C angles swapped for ACB. Peaks are displayed to 0.1 V and times to 0.01 ms.

**Learner Activity:**

1. The learner sets all three sliders to the same value and watches the dashed sum stay on zero.
2. The learner lowers one slider and watches the sum move away from zero.
3. The learner switches between ABC and ACB and notices that the magnitudes stay the same while the order of the peaks changes.
4. The learner presses Quiz me. The sequence label, balance label, and dashed sum are hidden, and the controls lock.
5. For each of the six cases in order, the learner chooses the sequence and Balanced or Unbalanced and presses Check. A first miss allows one more attempt.
6. After both answers are resolved, the labels and the sum return. The learner continues to the next case, and after case 6 returns to exploration.

**Feedback:** In exploration, a message states whether the current sliders are balanced and what the peak of the sum is. In quiz mode, correct feedback is “Correct: <answer>.” A first incorrect answer states which observation to check, either which phase peaks after A or whether the amplitudes match. After the second incorrect attempt, the correct answer and the case's reason are shown and the answer counts as missed. A score “Quiz: n of 12 correct” is shown.

**Starting State:** All three sliders are at 170 V with ABC sequence. The three waveforms are shown and the dashed sum lies on zero, with the message “Balanced: the three voltages sum to zero at every instant.”

**Chapter Anchors:** The chapter states that phase B reaches its peaks 5.56 ms after phase A at 60 Hz, that the three voltages sum to zero at every instant when balanced, and that swapping two conductors reverses the sequence.
</details>

## Line Voltage, Phase Voltage, and the Two Connections

A three-phase source or load has two sets of terminals worth distinguishing. **Phase voltage** is the voltage across a single winding of a source or a single element of a load. **Line voltage** is the voltage between any two of the three line conductors. Which of the two equals the winding voltage depends on how the three windings are connected.

### Wye Connection

In a **wye connection**, one end of each of the three windings is tied to a common point, the neutral point, and the other ends connect to the three line conductors. The shape drawn this way resembles the letter Y. The voltage from any line conductor to the neutral point is a phase voltage. The voltage between two line conductors spans two windings that are \(120^\circ\) apart, so the phasors subtract and their difference is larger than either one by a factor of \(\sqrt{3}\):

\[
V_L=\sqrt{3}\,V_{\text{ph}}
\qquad\text{and}\qquad
I_L=I_{\text{ph}}
\]

In a wye connection the line current equals the phase current, because each line conductor is in series with one winding. The common North American low-voltage systems are wye systems. A \(480\text{Y}/277\ \text{V}\) service has a line voltage of \(480\ \text{V}\) and a phase voltage of \(480/\sqrt{3}=277\ \text{V}\). A \(208\text{Y}/120\ \text{V}\) service has \(208/\sqrt{3}=120\ \text{V}\) from each line conductor to neutral.

### Neutral Conductor

The **neutral conductor** connects the neutral point of a wye source to loads that need a line-to-neutral voltage, such as \(120\ \text{V}\) receptacles or \(277\ \text{V}\) lighting. It also provides a return path for any current that does not cancel among the three phases. In an ideal balanced circuit with sinusoidal currents the three phase currents sum to zero, so the neutral carries no current. In practice, imbalance and certain electronic loads cause neutral current, and designers must size and protect the neutral with that in mind.

### Delta Connection

In a **delta connection**, the three windings are connected end to end in a closed triangle, and each line conductor attaches at a corner where two windings meet. No neutral point exists. Each winding is connected directly between two line conductors, so

\[
V_L=V_{\text{ph}}
\qquad\text{and}\qquad
I_L=\sqrt{3}\,I_{\text{ph}}
\]

The line current is larger than the phase current by \(\sqrt{3}\), because each line conductor carries the combination of two phase currents that are \(120^\circ\) apart. Delta connections are common in motor windings and in the primary or secondary windings of some transformers.

### Three-Phase Power

For either connection, and for a balanced load, the total power depends only on line quantities:

\[
S=\sqrt{3}\,V_L I_L
\]

\[
P=\sqrt{3}\,V_L I_L\cos\phi
\qquad
Q=\sqrt{3}\,V_L I_L\sin\phi
\]

Here \(\phi\) is the angle between a phase voltage and the current in that same phase, the same angle used in Chapter 2.

The following table summarizes the relationships for a balanced load.

| Quantity | Wye | Delta |
|---|---|---|
| Line voltage | \(\sqrt{3}\,V_{\text{ph}}\) | \(V_{\text{ph}}\) |
| Line current | \(I_{\text{ph}}\) | \(\sqrt{3}\,I_{\text{ph}}\) |
| Neutral point | Available | None |
| Typical low-voltage example | \(480\text{Y}/277\ \text{V}\) | \(480\ \text{V}\) delta |

### Worked Example: Same Resistors, Two Connections

Three identical \(24.0\ \Omega\) resistors are connected to a balanced three-phase source with a line voltage of \(480\ \text{V}\). First connect them in delta. Each resistor sees the full line voltage, so

\[
I_{\text{ph}}=\frac{480\ \text{V}}{24.0\ \Omega}=20.0\ \text{A}
\qquad
I_L=\sqrt{3}(20.0\ \text{A})=34.6\ \text{A}
\]

\[
P=3(480\ \text{V})(20.0\ \text{A})=28.8\ \text{kW}
\]

Now connect the same resistors in wye. Each resistor sees the phase voltage \(480/\sqrt{3}=277.1\ \text{V}\), so

\[
I_{\text{ph}}=I_L=\frac{277.1\ \text{V}}{24.0\ \Omega}=11.55\ \text{A}
\qquad
P=3(277.1\ \text{V})(11.55\ \text{A})=9.60\ \text{kW}
\]

The same resistors on the same source draw three times as much power in delta as in wye. Connection is a design decision, not a drawing convention.

### Worked Example: Three-Phase Motor Power

A three-phase motor on a \(480\ \text{V}\) line draws \(50.0\ \text{A}\) per line at a power factor of \(0.850\) lagging. Then

\[
S=\sqrt{3}(480\ \text{V})(50.0\ \text{A})=41.6\ \text{kVA}
\]

\[
P=S\cos\phi=(41.6\ \text{kVA})(0.850)=35.3\ \text{kW}
\]

\[
Q=S\sin\phi=(41.6\ \text{kVA})(0.527)=21.9\ \text{kvar}
\]

Because the power factor is lagging, \(Q\) is positive, matching the sign convention from Chapter 2.

Before the next activity, note that the activity asks for the line quantities of a source with a given phase voltage and phase current in each connection. In wye the line voltage is the larger value; in delta the line current is the larger value.

#### Diagram: Wye-Delta Voltage Explorer

<details markdown="1">
<summary>Wye-Delta Voltage Explorer</summary>
Type: microsim
**sim-id:** wye-delta-voltage-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate line voltage, line current, and three-phase apparent power from phase voltage and phase current for a balanced wye or delta connection.

**Prerequisites:** line voltage, phase voltage, wye connection, delta connection, neutral conductor, balanced load, and three-phase apparent power, all defined in the preceding prose.

**Evidence of Mastery:** In quiz mode the learner submits the line voltage and line current for the connection, phase voltage, and phase current they selected. Line voltage is correct within ±1 V and line current within ±0.1 A, with at most two attempts per value. The running score “Quiz: n of 2k correct” covers k quizzes. Mastery is every value correct within two attempts across at least three quizzes that include one wye and one delta connection. Moving controls in exploration mode is not evidence.

**Misconceptions:** (1) Line voltage and phase voltage are always equal. (2) The factor \(\sqrt{3}\) applies to voltage in both connections. (3) A delta connection has a neutral point. (4) Connecting the same loads in delta or wye draws the same power.

**Instructional Rationale:** Moving the connection select while holding the phase quantities fixed lets the learner see which line quantity gains the \(\sqrt{3}\) factor, and the phasor drawing shows why. The optional quiz requires the learner to apply the relation before the line quantities are revealed.

**Content:** A phasor drawing shows the three phase voltages. For wye, the three phase-voltage phasors are drawn from a common neutral point \(120^\circ\) apart, and one line voltage is drawn as the difference between two of them. For delta, the three winding voltages form a closed triangle whose sides are the line voltages. A readout lists the connection, \(V_{\text{ph}}\), \(I_{\text{ph}}\), \(V_L\), \(I_L\), and \(S\). The activity labels all values “balanced ideal load.”

The adjustable quantities are:

| Quantity | Type | Minimum | Maximum | Step | Default | Unit |
|---|---|---:|---:|---:|---:|---|
| Phase voltage \(V_{\text{ph}}\) | Slider | 100 | 600 | 10 | 280 | V |
| Phase current \(I_{\text{ph}}\) | Slider | 5 | 100 | 5 | 20 | A |
| Connection | Select | Wye | Delta | — | Wye | — |
| Show neutral conductor | Checkbox | Cleared | Checked | — | Checked | — |

The Example systems select offers three presets: 277 V phase, wye (nominal \(480\text{Y}/277\ \text{V}\)); 120 V phase, wye (nominal \(208\text{Y}/120\ \text{V}\)); and 480 V phase, delta (a \(480\ \text{V}\) delta). The neutral checkbox has an effect only in wye and is disabled in delta, where the tooltip states “A delta connection has no neutral point.”

**Provenance:** The relations, the 480Y/277 V and 208Y/120 V services, and the delta-versus-wye resistor example come from this chapter's sections “Line Voltage, Phase Voltage, and the Two Connections.” Slider ranges are illustrative.

**Rules:** For wye, \(V_L=\sqrt{3}\,V_{\text{ph}}\) and \(I_L=I_{\text{ph}}\). For delta, \(V_L=V_{\text{ph}}\) and \(I_L=\sqrt{3}\,I_{\text{ph}}\). For both, \(S=\sqrt{3}\,V_L I_L\). Voltages are displayed to 1 V, currents to 0.1 A, and \(S\) to 0.1 kVA. Quiz tolerances are ±1 V and ±0.1 A.

**Learner Activity:**

1. The learner switches the connection between wye and delta with the phase quantities fixed and watches the line quantities change.
2. The learner picks each example system and compares the resulting line voltage with the nominal service name.
3. The learner presses Quiz me. Line voltage, line current, and \(S\) are hidden and the controls lock.
4. The learner enters line voltage and line current and presses Check. Each value is scored separately with up to two attempts.
5. After both values are resolved, the results are revealed and the learner presses Back to exploring, or moves a control, to continue.

**Feedback:** In exploration, a message states which line quantity carries the \(\sqrt{3}\) factor for the selected connection. In quiz mode, correct feedback is “Correct: V_L = <value> V” or “Correct: I_L = <value> A.” A first incorrect answer includes a hint: wye multiplies voltage by \(\sqrt{3}\), delta multiplies current by \(\sqrt{3}\). After the second incorrect attempt, the correct value is shown and the answer counts as missed.

**Starting State:** The connection is wye with \(V_{\text{ph}}=280\ \text{V}\) and \(I_{\text{ph}}=20\ \text{A}\), showing \(V_L=485\ \text{V}\), \(I_L=20.0\ \text{A}\), and \(S=16.8\ \text{kVA}\), with the neutral drawn.

**Chapter Anchors:** The chapter states \(V_L=\sqrt{3}V_{\text{ph}}\) for wye, \(I_L=\sqrt{3}I_{\text{ph}}\) for delta, \(480/\sqrt{3}=277\ \text{V}\), \(208/\sqrt{3}=120\ \text{V}\), and that the same three \(24.0\ \Omega\) resistors draw \(28.8\ \text{kW}\) in delta and \(9.60\ \text{kW}\) in wye at \(480\ \text{V}\).
</details>

!!! mascot-warning "Check Which Quantity Gets the Square Root of Three"
    ![Relay giving a connection warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    The factor \(\sqrt{3}\) multiplies voltage in a wye connection and current in a delta connection, never both at once. Before using it, say aloud which connection you are in and which quantity you are converting.

### Unbalanced Loads

An **unbalanced load** has unequal impedances in the three phases, or unequal phase currents for any other reason, such as single-phase loads unevenly spread across the phases. The three line currents then no longer sum to zero. In a wye system with a neutral conductor, the difference flows in the neutral:

\[
\mathbf{I}_N=\mathbf{I}_A+\mathbf{I}_B+\mathbf{I}_C
\]

where the bold symbols are phasors that must be added with their angles, not as plain magnitudes.

### Worked Example: Neutral Current from Unbalance

Phase currents on a wye system are \(\mathbf{I}_A=100\ \text{A}\angle0^\circ\), \(\mathbf{I}_B=80\ \text{A}\angle-120^\circ\), and \(\mathbf{I}_C=60\ \text{A}\angle120^\circ\). In rectangular form,

\[
\mathbf{I}_A=100+j0,\qquad
\mathbf{I}_B=-40-j69.3,\qquad
\mathbf{I}_C=-30+j52.0\ \text{A}
\]

The sum is

\[
\mathbf{I}_N=30.0-j17.3\ \text{A},
\qquad
|\mathbf{I}_N|=\sqrt{30.0^2+17.3^2}=34.6\ \text{A}
\]

Even though no single phase carries more than \(100\ \text{A}\), the neutral carries \(34.6\ \text{A}\). If the three currents had all been \(100\ \text{A}\) at \(120^\circ\) spacing, the neutral current would have been zero.

## The Power System and Its Components

The three-phase model is the language the rest of the power system speaks. Chapter 1 introduced the four stages of the system. This section names the physical **power system components** that make those stages work and gives each stage the voltage levels a designer will meet.

Power system components are the physical devices connected into the path from source to load. They fall into a small number of classes:

- **Sources** convert another form of energy into electrical energy, such as turbine-generators and photovoltaic arrays.
- **Transformers** change voltage level between stages.
- **Lines and cables** carry current between locations, as overhead conductors or underground and insulated cables.
- **Switching and protective devices** open and close circuits and clear faults, such as circuit breakers, disconnect switches, and fuses.
- **Buses** are common conductors where several circuits connect, and are usually located inside substations, switchgear, or panels.
- **Loads** convert electrical energy into useful work, heat, light, or other output.

The following table maps these classes onto the four stages and gives the typical nominal voltages used in North America. Voltages are representative, not universal, and each utility sets its own standard levels.

| Stage | Main components | Typical nominal voltages |
|---|---|---|
| Generation | Generators, generator breakers, step-up transformers | About 11 kV to 25 kV at the generator; stepped up for transmission |
| Transmission | High-voltage lines, switching stations, transmission substations | 115 kV to 765 kV (69 kV and 34.5 kV are often called subtransmission) |
| Distribution | Substation step-down transformers, primary feeders, distribution transformers, secondary conductors | Primary 4 kV to 35 kV (12.47 kV is common); secondary 120/240 V, 208Y/120 V, 480Y/277 V |
| Utilization | Motors, lighting, heating, electronic equipment, building panels | 120 V to 480 V in buildings, higher for large motors |

### Generation Stage

The **generation stage** converts primary energy into three-phase electrical output. A synchronous generator produces three voltages \(120^\circ\) apart, because its three stator windings are physically spaced around the machine. Generator terminal voltage is limited by insulation in the stator slots, so it is typically only about \(11\ \text{kV}\) to \(25\ \text{kV}\). A generator breaker connects the machine to the system, and a step-up transformer raises its voltage to the transmission level. Chapters 7 through 10 treat the machines and energy sources in detail.

### Transmission Stage

The **transmission stage** moves large amounts of power over long distances at high voltage. For a given power, a higher line voltage means a lower line current, and conductor heating falls with the square of current. The worked example below shows how large that effect is.

### Distribution Stage

The **distribution stage** delivers power from substations to customers. A substation transformer steps transmission or subtransmission voltage down to a primary distribution voltage, commonly \(12.47\ \text{kV}\). Primary feeders carry that voltage along streets and into campuses, where distribution transformers step it down again to the service voltages customers use. Chapter 16 develops feeders and equipment in detail.

### Utilization Stage

The **utilization stage** is where customer equipment converts electrical energy into useful output. For the electrical designer this is the stage under design, and every earlier stage appears to the design as a service of a stated voltage, available fault current, and reliability. Motors and large three-phase equipment connect line-to-line, while lighting and receptacle circuits connect line-to-neutral in a wye service.

### Worked Example: Current at Three Voltage Levels

A balanced three-phase load of \(10.0\ \text{MVA}\) is served at three different voltages. Rearranging \(S=\sqrt{3}V_LI_L\), the line current is

\[
I_L=\frac{S}{\sqrt{3}\,V_L}
\]

At a transmission-level \(115\ \text{kV}\):

\[
I_L=\frac{10.0\times10^{6}\ \text{VA}}{\sqrt{3}(115\times10^{3}\ \text{V})}=50.2\ \text{A}
\]

At a distribution primary of \(12.47\ \text{kV}\):

\[
I_L=\frac{10.0\times10^{6}}{\sqrt{3}(12{,}470)}=463\ \text{A}
\]

At a utilization voltage of \(480\ \text{V}\):

\[
I_L=\frac{10.0\times10^{6}}{\sqrt{3}(480)}=12{,}030\ \text{A}
\]

The same \(10.0\ \text{MVA}\) needs about 240 times more current at \(480\ \text{V}\) than at \(115\ \text{kV}\). That is why power travels at high voltage and is lowered only near the customer, and why large buildings are served at the highest voltage practical.

!!! mascot-thinking "Voltage Levels Are a Trade"
    ![Relay thinking about voltage levels](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    High voltage lowers current but demands more insulation and clearance. Low voltage is safer near people but needs far more current for the same power. Every transformer on the path is a place where that trade is made.

## The Per-Unit System

The **per-unit system** expresses each quantity as a fraction of a chosen base value:

\[
\text{quantity}_{\text{pu}}=\frac{\text{actual quantity}}{\text{base quantity}}
\]

A system that passes through several transformers has several voltage levels, so the same quantity has different actual values in different places. Choosing base voltages that follow the transformer ratios makes per-unit values the same on either side of an ideal transformer, which simplifies comparing equipment.

Two bases are chosen freely, the three-phase apparent power base \(S_{\text{base}}\) and the line-to-line voltage base \(V_{\text{base}}\). The others follow:

\[
I_{\text{base}}=\frac{S_{\text{base}}}{\sqrt{3}\,V_{\text{base}}}
\qquad
Z_{\text{base}}=\frac{V_{\text{base}}^{2}}{S_{\text{base}}}
\]

For example, with \(S_{\text{base}}=10.0\ \text{MVA}\) and \(V_{\text{base}}=12.47\ \text{kV}\), \(I_{\text{base}}=463\ \text{A}\) and \(Z_{\text{base}}=15.55\ \Omega\). A feeder carrying \(370\ \text{A}\) is then at \(370/463=0.799\ \text{pu}\), a voltage of \(12.1\ \text{kV}\) is \(0.970\ \text{pu}\), and a \(0.780\ \Omega\) impedance is \(0.0502\ \text{pu}\). Per-unit values near \(1.0\) indicate normal loading and voltage, so a quick scan shows what is unusual.

## Single-Line Diagrams and One-Line Symbols

A **single-line diagram**, also called a one-line diagram, represents a three-phase system with one line for all three phases. It shows how components connect, their ratings, and their voltage levels, without drawing every conductor. A designer, a utility planner, and a protection engineer can all read the same single-line diagram, each looking for different information. A balanced three-phase system can be analyzed from this view because, as the chapter showed, one phase tells the whole story.

**One-line symbols** are the standard shapes that stand for components on a single-line diagram. The following table lists the symbols used in this chapter. Symbol sets differ among standards, such as IEEE and IEC, and among utilities, so a diagram's own legend always governs.

| Component | Typical symbol | What it represents |
|---|---|---|
| Generator | Circle with the letter G | A three-phase source |
| Motor | Circle with the letter M | A three-phase motor load |
| Transformer | Two coupled circles or coils | A change of voltage level |
| Bus | Thick straight line | A common connection point for several circuits |
| Circuit breaker | Small box on the line | A device that opens and closes under load and fault |
| Transmission line or feeder | Plain line | A conductor path between components |
| Load | Arrow | Power taken from the system |

### Worked Example: Reading a Small Single-Line Diagram

Consider this path read from left to right: a generator \(G_1\) at \(13.8\ \text{kV}\); a breaker \(CB_1\); a step-up transformer \(T_1\) rated \(13.8/138\ \text{kV}\); a \(138\ \text{kV}\) line; a step-down transformer \(T_2\) rated \(138/12.47\ \text{kV}\); a distribution feeder at \(12.47\ \text{kV}\); a transformer \(T_3\) rated \(12.47\ \text{kV}/480\text{Y}/277\ \text{V}\); and, at \(480\ \text{V}\), a motor \(M\) and a lighting panel \(L_1\). Every transformer rating names two voltages, and the stage boundaries fall where the voltage changes: generation up to \(T_1\), transmission on the \(138\ \text{kV}\) line, distribution from \(T_2\) through \(T_3\), and utilization at the motor and the lighting load.

Before the next activity, note that each symbol, the voltage at its location, and its stage are all defined above. The activity asks you to identify each component and its stage.

#### Diagram: Single-Line Diagram Explorer

<details markdown="1">
<summary>Single-Line Diagram Explorer</summary>
Type: microsim
**sim-id:** single-line-diagram-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** interpret<br/>
**Learning Objective:** The learner will interpret each symbol on a small single-line diagram by naming the component it represents and the power-system stage it belongs to.

**Prerequisites:** single-line diagram, one-line symbols, generation stage, transmission stage, distribution stage, utilization stage, and the voltage levels in the chapter's table, all defined in the preceding prose.

**Evidence of Mastery:** In quiz mode, a symbol is highlighted and the learner chooses its component name and its stage. An answer is correct when it matches the Content table. Each answer allows two attempts. Mastery is at least 16 of 18 answers correct within two attempts. Clicking symbols in exploration mode is not evidence.

**Misconceptions:** (1) A single line on the diagram means a single conductor. (2) Transformers belong to the transmission stage because they connect lines. (3) The stage is determined by the symbol's shape rather than its voltage and role. (4) Symbols are identical in every diagram regardless of the legend.

**Instructional Rationale:** Understand-level work asks the learner to explain what something means in context. Clicking a symbol to read what it represents and its stage links the shape to its role, and the quiz asks the learner to produce both before the explanation is shown.

**Content:** The diagram shows nine components in left-to-right order: generator \(G_1\), breaker \(CB_1\), step-up transformer \(T_1\), a transmission line, step-down transformer \(T_2\), a distribution feeder, distribution transformer \(T_3\), motor \(M\), and lighting load \(L_1\). A checkbox, Show stages, shades the diagram into the four stages. Clicking a component opens an information box with its name, symbol description, voltage, stage, and one-sentence role. The diagram is labeled “example one-line diagram; symbols follow this chapter's legend.”

| # | Component | Symbol | Voltage | Stage | Role (shown as the information-box text and as feedback) |
|---|---|---|---|---|---|
| 1 | Generator \(G_1\) | Circle with G | 13.8 kV | Generation | Converts mechanical rotation into three-phase electrical output. |
| 2 | Generator breaker \(CB_1\) | Small box | 13.8 kV | Generation | Connects the generator to the system and clears faults. |
| 3 | Step-up transformer \(T_1\) | Two coupled circles | 13.8 kV to 138 kV | Generation | Raises voltage so power can travel long distances at lower current. |
| 4 | Transmission line | Plain line | 138 kV | Transmission | Carries bulk power between locations at high voltage. |
| 5 | Step-down transformer \(T_2\) | Two coupled circles | 138 kV to 12.47 kV | Distribution | Lowers voltage at the substation to a primary distribution level. |
| 6 | Distribution feeder | Plain line | 12.47 kV | Distribution | Carries power from the substation toward customers. |
| 7 | Distribution transformer \(T_3\) | Two coupled circles | 12.47 kV to 480Y/277 V | Distribution | Lowers voltage to the service level customers use. |
| 8 | Motor \(M\) | Circle with M | 480 V | Utilization | Converts electrical energy into mechanical work. |
| 9 | Lighting load \(L_1\) | Arrow | 277 V | Utilization | Converts electrical energy into light. |

**Provenance:** Symbols, voltages, and stage assignments come from this chapter's sections “The Power System and Its Components” and “Single-Line Diagrams and One-Line Symbols.” The nine-component system is illustrative and labeled “example one-line diagram.”

**Rules:** Stage is assigned by the component's role and voltage as listed in the table: the generating-station step-up transformer belongs to Generation, and the substation step-down transformer belongs to Distribution. Quiz components are presented in table order. Each quiz item has two answers, the name from the nine listed names and the stage from the four stage names. The diagram uses one line for all three phases.

**Learner Activity:**

1. The learner clicks each component and reads its information box.
2. The learner turns on Show stages and notices where the stage boundaries fall relative to the transformers.
3. The learner presses Quiz me. Labels and information boxes are hidden, and the first component is highlighted.
4. The learner chooses the component name and the stage and presses Check. Each answer allows two attempts.
5. After both answers are resolved, the label returns and the next component is highlighted. After component 9, the quiz ends and exploration resumes.

**Feedback:** In exploration, the information box states the component's role. In quiz mode, correct feedback is “Correct: <answer>.” A first incorrect answer includes a hint such as “Look at the symbol shape” or “Check where the voltage changes.” After the second incorrect attempt, the correct answer and the role sentence are shown and the answer counts as missed. A score “Quiz: n of 18 correct” is shown.

**Starting State:** The diagram is shown with all nine symbols, no component selected, and the message “Click a symbol to see what it represents.”

**Chapter Anchors:** The chapter's worked example describes the same nine components with \(G_1\) at 13.8 kV, \(T_1\) at 13.8/138 kV, a 138 kV line, \(T_2\) at 138/12.47 kV, a 12.47 kV feeder, \(T_3\) at 12.47 kV/480Y/277 V, a motor, and a lighting panel, and it assigns the stage boundaries as stated.
</details>

!!! mascot-tip "Read a One-Line From Source to Load"
    ![Relay sharing a diagram-reading tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Start at the source, follow the line, and note every voltage change. Each transformer rating tells you where one voltage level ends and the next begins, and the legend tells you what each symbol means.

## Key Takeaways

- Single-phase power pulsates at twice the frequency; balanced three-phase power is constant and uses conductors efficiently.
- Three-phase voltages are \(120^\circ\) apart; swapping two conductors reverses the phase sequence.
- In a wye connection \(V_L=\sqrt{3}V_{\text{ph}}\) and \(I_L=I_{\text{ph}}\); in a delta connection \(V_L=V_{\text{ph}}\) and \(I_L=\sqrt{3}I_{\text{ph}}\).
- A neutral conductor is available only in wye and carries the phasor sum of the phase currents.
- Three-phase power is \(S=\sqrt{3}V_LI_L\) and \(P=\sqrt{3}V_LI_L\cos\phi\).
- The four stages differ in voltage; the same apparent power needs far less current at transmission voltage than at utilization voltage.
- Per-unit values divide actual quantities by base values so that normal operation sits near \(1.0\).
- A single-line diagram draws one line for three phases, and its legend governs the meaning of every symbol.

## Review Problems

1. A balanced wye system has a line voltage of \(208\ \text{V}\). Calculate the phase voltage.
2. A balanced delta load draws a phase current of \(15.0\ \text{A}\). Calculate the line current.
3. A three-phase load on a \(480\ \text{V}\) line draws \(30.0\ \text{A}\) at a power factor of \(0.900\) lagging. Calculate \(S\) and \(P\).
4. Phase currents on a wye system are \(\mathbf{I}_A=50\ \text{A}\angle0^\circ\), \(\mathbf{I}_B=50\ \text{A}\angle-120^\circ\), and \(\mathbf{I}_C=50\ \text{A}\angle120^\circ\). What is the neutral current?
5. Calculate the line current of a \(5.00\ \text{MVA}\) balanced load at \(12.47\ \text{kV}\).
6. Explain why a delta connection draws more power than a wye connection for identical resistors on the same source.

??? question "Check your answers"
    1. \(V_{\text{ph}}=208/\sqrt{3}=120\ \text{V}\).
    2. \(I_L=\sqrt{3}(15.0)=26.0\ \text{A}\).
    3. \(S=\sqrt{3}(480)(30.0)=24.9\ \text{kVA}\); \(P=24.9(0.900)=22.4\ \text{kW}\).
    4. The currents are balanced, so \(\mathbf{I}_N=0\ \text{A}\).
    5. \(I_L=5.00\times10^{6}/[\sqrt{3}(12{,}470)]=231\ \text{A}\).
    6. In delta each resistor sees the full line voltage; in wye each sees only \(1/\sqrt{3}\) of it. Power goes as voltage squared across a resistor, so delta delivers three times the power.

!!! mascot-celebration "Three Phases, One Picture"
    ![Relay celebrating the completed chapter](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now move from one phase to three, convert between line and phase quantities, trace the stages of the power system, and read a single-line diagram. Next chapter, we look at how the whole grid is organized and operated.
