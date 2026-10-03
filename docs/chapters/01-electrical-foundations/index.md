---
title: Electrical Foundations
description: Electrical charge, voltage, current, resistance, power, energy, magnetism, and AC waveform measurements for power-system designers.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 07:59:16
version: 1.11
---

# Electrical Foundations

## Summary

This chapter establishes the electrical quantities and physical ideas used throughout the book. It connects charge, voltage, current, resistance, power, and energy to DC and AC behavior, then introduces magnetic fields, frequency, and waveform measurements. After completing it, students will be able to describe and calculate the basic quantities that underpin power-system equipment.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Electric Charge | 5921 |
| Magnetic Field | 760 |
| Electricity | 2091 |
| Voltage | 1031 |
| Current | 2763 |
| Electric Power System | 643 |
| Resistance | 959 |
| Electric Power | 393 |
| Direct Current | 29 |
| Alternating Current | 1205 |
| Ohm's Law | 244 |
| Electrical Energy | 174 |
| Watt | 64 |
| Frequency | 7 |
| Sine Wave | 124 |
| Kilowatt-Hour | 63 |
| RMS Value | 1 |
| Peak Value | 1 |

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

!!! mascot-welcome "Meet Relay, Your Guide"
    ![Relay waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Hi, I'm Relay, a practical and curious North American beaver who will help you trace electrical energy from source to load. Let's follow the flow!

    1. **Welcome:** I show why each chapter matters.
    2. **Think:** I pause at the mental models behind the equations.
    3. **Tip:** I offer guidance you can use immediately in design calculations.
    4. **Warn:** I flag common mistakes and show how to avoid them.
    5. **Encourage:** I support you when a difficult idea deserves a second pass.
    6. **Celebrate:** I name the specific skills you have mastered.

    If I'm not doing one of those six things, I'm not in the chapter.

Electrical design begins with quantities that cannot be seen directly. A conductor does not visibly fill with volts, and electrons do not race through a feeder at the speed of light. Designers therefore use a compact set of models: **charge** describes an electrical property of matter; **current** describes charge flow; **voltage** describes energy available per unit charge; and **resistance** describes how strongly a path opposes current. Power and energy then connect those circuit quantities to equipment ratings, operating time, and utility bills.

These models work at several scales. The same definitions used for a small control circuit also support calculations for a building service or a generating station. The numerical values and equipment become larger, but the dimensional relationships remain consistent. That consistency is why the foundations deserve careful treatment.

## Electric Charge and Electricity

**Electric charge** is a property of matter that produces electrical forces and participates in electromagnetic interactions. Charge is positive or negative. Protons carry positive charge, electrons carry negative charge, and an object is electrically neutral when its positive and negative charges balance. The SI unit of charge is the **coulomb**, abbreviated C.

The magnitude of the charge on one proton or electron is the **elementary charge**:

\[
e = 1.602\,176\,634 \times 10^{-19}\ \text{C}
\]

An electron carries \(-e\), while a proton carries \(+e\). The small size of \(e\) explains why ordinary circuit currents involve enormous numbers of electrons. Charge is also conserved: it can move from one place to another, but an isolated system does not create or destroy net charge. In circuit analysis, conservation of charge becomes the reason that current entering a junction must be balanced by current leaving it.

**Electricity** is the collection of physical effects associated with electric charge, including charge at rest, charge in motion, electric fields, and the transfer of electrical energy. It is not a substance that gets “used up.” A power source establishes an electric field that pushes charge already present in conductors. Loads then convert electrical energy into light, heat, motion, sound, or information.

Two ideas keep the language precise:

- **Charge** is a property measured in coulombs.
- **Electrical energy** is a capacity to do work, measured in joules or kilowatt-hours.
- **Current** is a rate of charge flow, measured in amperes.
- A conductor supplies mobile charge carriers; the source supplies energy that drives them.

### Worked Example: Counting Charge Carriers

Suppose \(6.00\ \text{C}\) of negative charge passes through a conductor. The number of electrons represented by that charge is

\[
N = \frac{|Q|}{e}
  = \frac{6.00\ \text{C}}{1.602\,176\,634 \times 10^{-19}\ \text{C/electron}}
  \approx 3.75 \times 10^{19}\ \text{electrons}
\]

This is about 37.5 quintillion electrons. The result does not mean those electrons traveled from a generating station to the load. In a metallic circuit, mobile electrons are already distributed throughout the conductors. Closing the circuit establishes an electric field through the system, and charge begins drifting throughout the conducting path.

!!! mascot-thinking "A Useful Mental Model"
    ![Relay thinking about a single-line diagram](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of charge as the material that can move and voltage as the energy-per-charge condition that drives the motion. Keeping those roles separate prevents the common mistake of treating voltage, current, and energy as interchangeable names for electricity.

## Voltage: Electrical Potential Difference

**Voltage** is the difference in electric potential energy per unit charge between two points. It is always measured *between* points, even when one point is an agreed reference called ground. One volt equals one joule per coulomb:

\[
1\ \text{V} = 1\ \frac{\text{J}}{\text{C}}
\]

If a charge \(Q\) moves through a voltage difference \(V\), the associated energy transfer is

\[
\Delta E = VQ
\]

A battery creates a voltage through chemical processes. A generator creates voltage through electromagnetic induction. In both cases, the source separates charge and establishes an electric field. Voltage can exist without sustained current, just as pressure can exist behind a closed valve without flow. Current begins only when a complete conducting path is available.

Voltage polarity communicates direction. Writing \(V_{AB}=+12\ \text{V}\) means point A is 12 volts higher in electric potential than point B. Reversing the reference reverses the sign: \(V_{BA}=-12\ \text{V}\). A voltmeter is therefore connected across two points, not inserted in series with the current path.

### Worked Example: Energy Transferred by a Voltage

A charge of \(2.00\ \text{C}\) moves through a potential difference of \(120\ \text{V}\). The transferred energy is

\[
\Delta E = VQ = (120\ \text{J/C})(2.00\ \text{C}) = 240\ \text{J}
\]

The unit cancellation shows the meaning of the calculation: joules per coulomb multiplied by coulombs gives joules. If the charge moves through a load, the load receives that energy. If an external process moves charge “uphill” inside a source, the source stores or supplies the energy needed to create the potential difference.

## Current: Charge Flow Rate

**Electric current** is the rate at which charge crosses a specified boundary. Average current is

\[
I = \frac{\Delta Q}{\Delta t}
\]

One ampere equals one coulomb per second:

\[
1\ \text{A} = 1\ \frac{\text{C}}{\text{s}}
\]

The more general instantaneous definition is \(i=dq/dt\), which allows current to change continuously with time. Circuit drawings assign a reference arrow to current. A positive calculated value means current flows in the chosen reference direction; a negative value means the actual conventional current is opposite the arrow.

**Conventional current** is defined as the direction positive charge would move—from higher potential toward lower potential through a passive load. In metals, the mobile carriers are negatively charged electrons, so their drift direction is opposite conventional current. Circuit theory still uses conventional current because it gives consistent results for metals, electrolytes, semiconductors, and other charge-transport mechanisms.

### Worked Example: Current from Charge and Time

If \(6.00\ \text{C}\) crosses a conductor boundary in \(3.00\ \text{s}\), the average current is

\[
I = \frac{6.00\ \text{C}}{3.00\ \text{s}} = 2.00\ \text{A}
\]

The earlier charge-carrier calculation showed that \(6.00\ \text{C}\) corresponds to approximately \(3.75\times10^{19}\) electrons. The current calculation describes how quickly that amount crosses the boundary. Charge answers “how much”; current answers “how much per unit time.”

!!! mascot-warning "Current Direction Is a Reference Choice"
    ![Relay giving a stop-and-check warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is to reverse every circuit arrow because electrons drift opposite conventional current. Keep the conventional-current reference used by the drawing; if the computed current is negative, interpret the sign instead of rewriting the physical laws.

## Resistance and Ohm's Law

**Resistance** measures how strongly a component or conducting path opposes current for a given applied voltage. The SI unit is the **ohm**, symbol \(\Omega\). Resistance depends on material, geometry, and temperature. For a uniform conductor,

\[
R = \rho\frac{L}{A}
\]

where \(\rho\) is the material resistivity in ohm-meters, \(L\) is conductor length, and \(A\) is cross-sectional area. A longer path has greater resistance because carriers encounter more material. A larger cross-sectional area has lower resistance because it provides more parallel paths for charge motion.

**Ohm's law** relates voltage, current, and resistance for an ohmic element operating under conditions where its resistance is reasonably constant:

\[
V = IR
\]

The equation can be rearranged without changing its meaning:

\[
I = \frac{V}{R}
\qquad\text{and}\qquad
R = \frac{V}{I}
\]

Ohm's law is a component model, not a universal definition of all electrical behavior. A fixed resistor may be approximately ohmic over its normal range. Lamps, semiconductor devices, arcs, and many other loads can have nonlinear voltage-current relationships. Even an ordinary conductor changes resistance as temperature changes. The designer must decide whether constant \(R\) is a suitable approximation for the operating condition.

The relationships also provide useful directional checks. With resistance fixed, increasing voltage increases current. With voltage fixed, increasing resistance decreases current. With current fixed, a higher resistance requires a higher voltage drop.

### Worked Example: Applying Ohm's Law

A \(12.0\ \Omega\) heating element is connected across \(24.0\ \text{V}\). Assuming its resistance remains constant, its current is

\[
I = \frac{V}{R}
  = \frac{24.0\ \text{V}}{12.0\ \Omega}
  = 2.00\ \text{A}
\]

Now suppose the applied voltage stays at \(24.0\ \text{V}\), but the resistance rises to \(16.0\ \Omega\) as the element warms. The new current is

\[
I = \frac{24.0\ \text{V}}{16.0\ \Omega} = 1.50\ \text{A}
\]

The lower current is consistent with the fixed-voltage directional check. The calculation also shows why using a cold-resistance value may not predict a device's hot operating current.

The following table reinforces the quantities already defined and provides a unit check for circuit calculations.

| Quantity | Symbol | Unit | Operational meaning |
|---|---:|---:|---|
| Electric charge | \(Q\) or \(q\) | coulomb (C) | Amount of charge |
| Voltage | \(V\) or \(v\) | volt (V) | Energy per unit charge |
| Current | \(I\) or \(i\) | ampere (A) | Charge per unit time |
| Resistance | \(R\) | ohm (\(\Omega\)) | Voltage required per unit current |

!!! mascot-tip "Sanity-Check the Direction of Change"
    ![Relay sharing a calculation tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before calculating, predict whether the answer should rise or fall. For \(I=V/R\), more voltage should increase current and more resistance should decrease it; a result that violates that pattern usually signals an algebra or entry error.

Before using the next activity, note that a **closed circuit** provides a continuous conducting path, while an **open circuit** interrupts that path. The activity uses a source voltage, a resistance, and the resulting current to test Ohm's law. It also reports the charge that crosses a boundary in one second, using \(Q=It\).

#### Diagram: Circuit Quantity Explorer


<iframe src="../../sims/circuit-quantity-explorer/main.html" width="100%" height="587px" scrolling="no"></iframe>
[Run Circuit Quantity Explorer Fullscreen](../../sims/circuit-quantity-explorer/main.html)

<details markdown="1">
<summary>Circuit Quantity Explorer</summary>
Type: microsim
**sim-id:** circuit-quantity-explorer<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Template:** https://github.com/dmccreary/automating-instructional-design/tree/main/docs/sims/ohms-law-simulator<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate current and charge transfer for closed and open resistive circuits chosen with the sliders and switch.

**Prerequisites:** electric charge, voltage, current, resistance, closed circuit, open circuit, and Ohm's law, all defined in the preceding sections.

**Evidence of Mastery:** In quiz mode the learner submits current and charge for the slider setting they chose. A value is correct when it is within ±0.01 of the model value in the stated unit, with at most two attempts per value. The running score “Quiz: n of 2k correct” covers k quizzes. Mastery is every value correct on the first or second attempt across at least three quizzes that include one open-circuit case. Freely adjusting the sliders is not evidence.

**Misconceptions:** (1) Increasing resistance increases current when voltage is fixed. (2) Current is consumed by the resistor. (3) One ampere is one volt per second. (4) An open circuit has a small normal load current rather than zero current in the ideal model.

**Instructional Rationale:** The sliders and live readout make direction-of-change relationships visible right away, with the substituted numbers shown so the equation steps are explicit. The optional quiz keeps Apply-level calculation: the learner must predict the results before they are revealed, for any values they choose.

**Content:** The ideal circuit contains one adjustable DC source, one resistor, and a switch that is closed or open. A readout shows voltage \(V\) in volts, resistance \(R\) in ohms, current \(I\) in amperes, and charge \(Q\) in coulombs crossing a boundary during time \(t\). The activity labels itself an idealized model.

Controls are always visible in the control region:

| Control | Type | Minimum | Maximum | Step | Default | Unit |
|---|---|---:|---:|---:|---:|---|
| Source voltage \(V\) | p5.js slider | 0 | 48 | 1 | 24 | V |
| Resistance \(R\) | p5.js slider | 1 | 24 | 1 | 12 | \(\Omega\) |
| Observation time \(t\) | p5.js slider | 1 | 10 | 1 | 1 | s |
| Switch closed | p5.js checkbox | Cleared (open) | Checked (closed) | — | Checked | — |
| Quiz me on these values | p5.js button | — | — | — | — | — |

Quiz mode adds two numeric inputs (current in A, charge in C) and a Check button, and temporarily locks the sliders and checkbox. A Back to exploring button appears after a quiz is resolved.

**Provenance:** Definitions and equations come from this chapter's sections “Electric Charge and Electricity,” “Current: Charge Flow Rate,” and “Resistance and Ohm's Law.” The default 24 V, 12 \(\Omega\), 1 s setting reproduces the chapter's worked value of 2.00 A. Other slider values are illustrative and are labeled “idealized model.” The template is the linked Ohm's Law Circuit Simulator.

**Rules:** For Closed, \(I=V/R\) and \(Q=It\). For Open, \(I=0\) and \(Q=0\), regardless of the displayed source voltage and resistor value. \(R\) never reaches zero, so division by zero cannot occur. Calculated current is displayed to 0.01 A and charge to 0.01 C. Quiz correctness tolerance is ±0.01 in the stated unit.

**Learner Activity:**

1. The learner drags the voltage, resistance, and time sliders and watches the circuit, the substituted equations, and the results update immediately.
2. The learner clears the Switch closed checkbox and sees that current and charge become zero.
3. The learner presses Quiz me on these values. Results are hidden and the sliders lock.
4. The learner enters current and charge and presses Check. Each value is scored separately; a correct value is accepted, and a first miss allows one more attempt.
5. After both values are resolved, the results are revealed. The learner presses Back to exploring, or moves a slider, to continue.

**Feedback:** In exploration, the message line reminds the learner that an open circuit forces \(I=0\) and \(Q=0\). In quiz mode, correct feedback is “Correct: I = <value> A” or “Correct: Q = <value> C.” A first incorrect answer reports that the value needs another try. After the second incorrect attempt, the correct value is shown and the answer counts as missed.

**Starting State:** The circuit is closed with \(V=24\ \text{V}\), \(R=12\ \Omega\), and \(t=1\ \text{s}\), the readout shows \(I=2.00\ \text{A}\) and \(Q=2.00\ \text{C}\), and the message line reads “Drag the sliders. Current and charge update immediately.”

**Chapter Anchors:** The chapter calculates \(24.0\ \text{V}/12.0\ \Omega=2.00\ \text{A}\), defines \(1\ \text{A}=1\ \text{C/s}\), and states that a complete path is required for sustained current.
</details>

## Electric Power and the Watt

**Electric power** is the rate at which electrical energy is transferred or converted. Power answers “how fast is energy changing?” If energy \(E\) is transferred during time \(t\), average power is

\[
P=\frac{\Delta E}{\Delta t}
\]

The SI unit of power is the **watt** (W):

\[
1\ \text{W}=1\ \frac{\text{J}}{\text{s}}
\]

Because voltage is joules per coulomb and current is coulombs per second, their product is joules per second:

\[
P=VI
\]

This dimensional derivation is more than a memory aid:

\[
\left(\frac{\text{J}}{\text{C}}\right)
\left(\frac{\text{C}}{\text{s}}\right)
=\frac{\text{J}}{\text{s}}
=\text{W}
\]

For a resistor obeying Ohm's law, substituting \(V=IR\) produces two additional forms:

\[
P=I^2R
\qquad\text{and}\qquad
P=\frac{V^2}{R}
\]

Choose the form that uses known quantities directly. The equations also reveal different design conditions. With current fixed, resistive heating increases with \(R\). With voltage fixed, power decreases as \(R\) increases. Stating what is held constant is essential; otherwise, the two expressions may appear to contradict each other.

### Worked Example: Power in a Resistive Load

The earlier \(24.0\ \text{V}\), \(12.0\ \Omega\) load drew \(2.00\ \text{A}\). Its power is

\[
P=VI=(24.0\ \text{V})(2.00\ \text{A})=48.0\ \text{W}
\]

Checking with either resistive form gives the same result:

\[
P=I^2R=(2.00\ \text{A})^2(12.0\ \Omega)=48.0\ \text{W}
\]

\[
P=\frac{V^2}{R}=\frac{(24.0\ \text{V})^2}{12.0\ \Omega}=48.0\ \text{W}
\]

Agreement among the three methods is a strong arithmetic check. The watt rating tells how quickly the load converts electrical energy at that operating point; it does not tell how long the load operates.

## Electrical Energy and the Kilowatt-Hour

**Electrical energy** is energy transferred or stored through electrical processes. When power is constant over an interval,

\[
E=Pt
\]

Using watts and seconds gives joules. Power systems and utility billing often involve larger energies and longer operating times, so the practical unit is the **kilowatt-hour (kWh)**:

\[
1\ \text{kWh}=(1000\ \text{W})(3600\ \text{s})=3.6\times10^6\ \text{J}=3.6\ \text{MJ}
\]

A kilowatt-hour is energy, not power. A kilowatt describes a rate at one moment or operating condition; a kilowatt-hour accumulates that rate over time. Two loads can use the same energy with different power profiles. A \(1\ \text{kW}\) load operating for \(4\ \text{h}\) and a \(4\ \text{kW}\) load operating for \(1\ \text{h}\) both use \(4\ \text{kWh}\), although their demand on the system differs.

### Worked Example: Equipment Power and Operating Energy

A single-phase resistive process load operates at \(480\ \text{V}\) and \(20.0\ \text{A}\) for \(3.00\ \text{h}\). Its power is

\[
P=VI=(480\ \text{V})(20.0\ \text{A})=9600\ \text{W}=9.60\ \text{kW}
\]

Its electrical energy use is

\[
E=Pt=(9.60\ \text{kW})(3.00\ \text{h})=28.8\ \text{kWh}
\]

In joules, that same energy is

\[
E=(28.8\ \text{kWh})(3.6\ \text{MJ/kWh})=103.68\ \text{MJ}
\]

The voltage and current values establish the operating power; time converts that power into energy. Actual AC equipment may require power-factor terms introduced in Chapter 2, so this example is explicitly resistive.

!!! mascot-tip "Let Units Diagnose the Setup"
    ![Relay sharing a unit-checking tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Want a quick error check? Multiplying kW by hours must produce kWh, while multiplying volts by amperes produces watts for this resistive case; if the units do not land on the requested quantity, revise the setup before entering numbers.

The next activity connects the rate quantity, power, to the accumulated quantity, energy. All assessment loads are ideal resistive cases, so \(P=VI\) applies directly without a power-factor correction.

#### Diagram: Electrical Power and Energy Calculator


<iframe src="../../sims/electrical-power-energy-calculator/main.html" width="100%" height="602px" scrolling="no"></iframe>
[Run Electrical Power and Energy Calculator Fullscreen](../../sims/electrical-power-energy-calculator/main.html)

<details markdown="1">
<summary>Electrical Power and Energy Calculator</summary>
Type: microsim
**sim-id:** electrical-power-energy-calculator<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Template:** https://github.com/dmccreary/circuits/tree/main/docs/sims/power-triangle<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate electric power in watts and electrical energy in kilowatt-hours for ideal resistive operating cases chosen with the sliders, and explain that time changes energy but not power.

**Prerequisites:** voltage, current, electric power, watt, electrical energy, kilowatt, kilowatt-hour, and operating time, all defined in the preceding sections.

**Evidence of Mastery:** In quiz mode the learner submits power in watts and energy in kilowatt-hours for the slider setting they chose. Power is correct within ±0.01 W and energy within ±0.01 kWh, with at most two attempts per value. The running score “Quiz: n of 2k correct” covers k quizzes. Mastery is every value correct within two attempts across at least three quizzes, including one that uses a different time with the same voltage and current. Freely adjusting the sliders is not evidence.

**Misconceptions:** (1) Kilowatt and kilowatt-hour are interchangeable. (2) Energy is found by dividing power by time. (3) Voltage alone determines load energy. (4) A larger operating time changes the instantaneous power of an unchanged resistive load.

**Instructional Rationale:** The sliders, flow diagram, and paired bars let the learner see the two linked operations at once: voltage and current set a rate, and that rate multiplied by time gives accumulated energy. The Double the time button and the change note make the power-versus-energy distinction concrete. The optional quiz keeps Apply-level calculation by requiring a prediction first.

**Content:** Each ideal resistive load shows voltage, current, and operating time. A flow diagram reads \(V\times I \rightarrow P \rightarrow E\) with live values, showing power in W and kW and energy in kWh and MJ. Two bars compare power rate (full bar 10 kW) with energy used (full bar 40 kWh); values beyond a full bar are clamped and still labeled numerically. A note under the bars states which quantity changed after the learner moves a slider.

Controls are always visible in the control region:

| Control | Type | Minimum | Maximum | Step | Default | Unit |
|---|---|---:|---:|---:|---:|---|
| Voltage \(V\) | p5.js slider | 12 | 480 | 12 | 120 | V |
| Current \(I\) | p5.js slider | 1 | 40 | 1 | 10 | A |
| Operating time \(t\) | p5.js slider | 0.5 | 8.0 | 0.5 | 2.5 | h |
| Example loads | p5.js select | — | — | — | “Example loads…” | — |
| Double the time | p5.js button | — | — | — | — | — |
| Quiz me | p5.js button | — | — | — | — | — |

The Example loads menu offers 24 V, 2 A, 5 h (small DC load); 120 V, 10 A, 2.5 h (heater); and 480 V, 20 A, 3 h (industrial load). Double the time doubles the time slider up to the 8.0 h limit. Quiz mode adds two numeric inputs (power in W, energy in kWh) and a Check button, and temporarily locks all other controls. A Back to exploring button appears after a quiz is resolved. The activity labels all cases “ideal resistive load.”

**Provenance:** Definitions, conversion \(1\ \text{kWh}=3.6\ \text{MJ}\), and the 24 V and 480 V example loads come from this chapter's worked examples. The 120 V load and the slider ranges are illustrative. The template is the linked Power Triangle Visualization, used only as a starting point for formula interaction.

**Rules:** \(P=VI\); \(P_{\text{kW}}=P_{\text{W}}/1000\); \(E_{\text{kWh}}=P_{\text{kW}}t_{\text{h}}\); \(E_{\text{MJ}}=3.6E_{\text{kWh}}\). Slider values are positive, so no zero-energy edge case occurs. Changing time with voltage and current fixed changes energy but not power. Quiz tolerances are ±0.01 W and ±0.01 kWh.

**Learner Activity:**

1. The learner drags the sliders, or picks an example load, and watches the flow diagram and bars update immediately.
2. The learner presses Double the time and observes that power is unchanged while energy doubles; the change note states this.
3. The learner changes voltage or current and observes that power and energy both change.
4. The learner presses Quiz me. Results are hidden and the controls lock.
5. The learner enters power in watts and energy in kilowatt-hours and presses Check. Each value is scored separately with up to two attempts.
6. After both values are resolved, results are revealed. The learner presses Back to exploring, or moves a slider, to continue.

**Feedback:** In exploration, the change note names which quantity changed: “You changed time: energy changed, but the power rate did not,” or “You changed V or I: the power rate changed, so energy changed too.” In quiz mode, correct feedback is “Correct: P = <value> W” or “Correct: E = <value> kWh.” A first incorrect answer includes a hint (“Multiply volts by amperes” for power; “Convert watts to kilowatts, then multiply by hours” for energy). After the second incorrect attempt, the correct value is shown and the answer counts as missed.

**Starting State:** The load is 120 V, 10 A, and 2.5 h, showing 1200 W (1.200 kW), 3.000 kWh (10.800 MJ), and the message “Drag the sliders. Power and energy update immediately.”

**Chapter Anchors:** The chapter calculates 48.0 W for 24.0 V and 2.00 A; calculates 9.60 kW and 28.8 kWh for 480 V, 20.0 A, and 3.00 h; and states that 1 kWh equals 3.6 MJ.
</details>

## The Electric Power System

An **electric power system** is the interconnected equipment and conductors that produce, transfer, distribute, and use electrical energy. A large grid contains many sources and loads operating together, but its basic energy path can be organized into four stages: generation, transmission, distribution, and utilization.

**Generation** converts another form of energy into electrical energy. A turbine-generator may convert thermal, hydraulic, or wind energy first into mechanical rotation and then into electrical output. A photovoltaic array converts solar radiation directly into DC electrical output. The physical conversion varies, but the stage's system role is to supply electrical energy.

**Transmission** moves large amounts of electric power over long distances, generally at high voltage. Raising voltage for a given power reduces current, and lower current reduces conductor heating proportional to \(I^2R\). A **step-up transformer** raises AC voltage near generation, while transmission lines connect generating regions and major load centers.

**Distribution** delivers power from substations through local feeders to customers. A **step-down transformer** reduces voltage to levels suited to distribution and utilization equipment. Distribution includes primary feeders, distribution transformers, secondary conductors, and service connections.

**Utilization** is where customer equipment converts electrical energy into a useful result—lighting, heating, cooling, mechanical work, computation, or another service. A building electrical designer works mainly near this end of the path, but design decisions depend on the upstream system's voltage, fault capacity, reliability, and service requirements.

### Worked Example: Following a 9.60 kW Load Upstream

Consider the \(9.60\ \text{kW}\) resistive process load from the earlier example. At utilization, the load converts electrical energy to process heat. The building distribution system carries power from the service equipment to the feeder serving the load. A utility distribution transformer supplies the building at its service voltage. Distribution feeders carry the combined demand of many customers from a substation, and the transmission network supplies that substation from a mix of generators.

The load does not receive identifiable electrons that traveled intact from one specific generator. Instead, the interconnected system establishes electrical conditions and transfers energy through fields and conductors. Operators continually balance aggregate generation and demand. The power path is therefore both physical—through equipment—and systemic—through a synchronized network.

The following table summarizes the four stages after their functions have been explained.

| Stage | Primary role | Typical conversion or transfer |
|---|---|---|
| Generation | Supply electrical energy | Mechanical, chemical, nuclear, hydraulic, wind, or solar input becomes electrical output |
| Transmission | Move bulk power between regions | High-voltage transfer over long distances |
| Distribution | Deliver power locally | Substation and feeder network reduces voltage and routes power to customers |
| Utilization | Produce the customer's useful result | Electrical energy becomes heat, light, motion, cooling, or information processing |

!!! mascot-thinking "Follow Energy, Not Individual Electrons"
    ![Relay thinking about the power path](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice the shift in scale: circuit equations track local voltage, current, power, and energy, while the power-system model tracks how many devices coordinate those quantities. Follow the energy conversion and equipment path rather than imagining one electron traveling from a distant generator to a building load.

Before using the path activity, a **substation** is a facility that switches circuits and changes voltage levels, and a **feeder** is a distribution circuit that carries power from a substation toward groups of customers. The activity uses those terms to connect the four system stages.

#### Diagram: Power System Path Explorer


<iframe src="../../sims/power-system-path-explorer/main.html" width="100%" height="677px" scrolling="no"></iframe>
[Run Power System Path Explorer Fullscreen](../../sims/power-system-path-explorer/main.html)

<details markdown="1">
<summary>Power System Path Explorer</summary>
Type: workflow
**sim-id:** power-system-path-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** summarize<br/>
**Learning Objective:** The learner will summarize the electric power path by arranging generation, transmission, distribution, and utilization in order and matching each stage to its system role.

**Prerequisites:** electric power system, generation, transmission, distribution, utilization, step-up transformer, step-down transformer, substation, feeder, and load, all defined in the preceding prose.

**Evidence of Mastery:** The learner submits an ordered four-stage path and four role matches before answers are revealed. A stage order or role match is correct when it matches the Content table. Mastery is all four stages in order and at least three of four roles correct on the first submission.

**Misconceptions:** (1) Distribution occurs before transmission. (2) Transformers generate electrical energy. (3) Utilization is another word for distribution. (4) High-voltage transmission is the final voltage delivered directly to ordinary customer equipment.

**Instructional Rationale:** An Understand-level summary requires the learner to predict the sequence and connect each stage to its function before seeing the completed workflow. The ordering and role match make the learner reconstruct the system rather than passively inspect it.

**Content:** The four stage cards and their correct roles are:

| Stage | Correct position | Role text | Why shown as feedback |
|---|---:|---|---|
| Generation | 1 | Converts an input energy source into electrical energy supplied to the system. | Generation supplies electrical energy; a transformer changes voltage but does not create energy. |
| Transmission | 2 | Transfers bulk electric power over long distances at high voltage. | Transmission links generating regions and major load centers before local delivery. |
| Distribution | 3 | Uses substations, feeders, and distribution transformers to deliver power locally. | Distribution routes power from the bulk system toward customer services. |
| Utilization | 4 | Converts electrical energy into the customer's useful output. | Loads use electrical energy for heat, light, motion, cooling, or information processing. |

The connections and their meaning are:

| Connection | Meaning revealed |
|---|---|
| Generation to Transmission | A step-up transformer commonly raises AC voltage so the same power can move with lower current and lower \(I^2R\) conductor loss. |
| Transmission to Distribution | A receiving or distribution substation switches circuits and reduces voltage for local feeders. |
| Distribution to Utilization | Distribution transformers and service conductors provide a service voltage suited to customer equipment. |

Every stage reveals its full role text and feedback reason when selected. Every connection carries its meaning as an edge label and repeats the complete explanation in the stage information panel from which the connection leaves.

**Provenance:** Stage definitions, ordering, role text, and connection meanings come from this chapter's “The Electric Power System” section. The workflow is a conceptual system model, not a drawing of one particular utility.

**Rules:** The only correct stage order is Generation → Transmission → Distribution → Utilization. Each role can be assigned to exactly one stage. A submission is complete only when all four stages are placed and all four roles are assigned. The learner may revise freely before submitting. After submission, incorrect placements remain available for one correction attempt; the complete answer is revealed after that attempt.

**Learner Activity:**

1. The learner predicts the power path by arranging the four stage cards and matching one role to each stage.
2. The learner submits the complete prediction. Correct placements are confirmed; incorrect placements receive misconception-specific feedback without revealing all remaining answers.
3. The learner makes one correction attempt. The complete ordered workflow and connection meanings are then revealed.
4. The learner selects each stage and connection to review its definition and explain where the chapter's 9.60 kW process load belongs.
5. The learner submits “Utilization” for the process load; selecting another stage triggers the explanation that the load converts electrical energy into useful process heat.

**Feedback:** One complete initial submission and one correction attempt. Correct stage feedback is “Correct: <stage> is position <n> because <Why text>.” Incorrect feedback states the relevant misconception from the Misconceptions field and directs the learner to the upstream or downstream function without revealing the complete order on the first attempt. After the correction attempt, all positions and roles are revealed. The process-load question has one attempt; correct feedback is “Correct: the heater is utilization because it converts electrical energy to useful heat,” and incorrect feedback reveals the same explanation. A score reports stages ordered correctly and roles matched correctly on the first submission.

**Starting State:** Four stage cards and four role cards are unassigned. The prompt asks, “Predict the path from energy conversion to the customer's useful output.” No arrows or answers are shown until submission.

**Chapter Anchors:** The chapter defines the sequence as Generation → Transmission → Distribution → Utilization and traces a 9.60 kW resistive process load backward from utilization through building and utility distribution, transmission, and generation.
</details>

## An Integrated Design Calculation

The foundations become most useful when they are treated as one chain rather than separate formulas. Consider an ideal \(240\ \text{V}\) DC resistance heater rated at \(12.0\ \Omega\), operating for \(2.50\ \text{h}\). The calculation proceeds from electrical condition to operating consequence.

First, use Ohm's law to find current:

\[
I=\frac{V}{R}=\frac{240\ \text{V}}{12.0\ \Omega}=20.0\ \text{A}
\]

Second, find electric power:

\[
P=VI=(240\ \text{V})(20.0\ \text{A})=4800\ \text{W}=4.80\ \text{kW}
\]

Third, find operating energy:

\[
E=Pt=(4.80\ \text{kW})(2.50\ \text{h})=12.0\ \text{kWh}
\]

Finally, interpret rather than merely calculate. The \(20.0\ \text{A}\) value affects conductor and protective-device selection. The \(4.80\ \text{kW}\) value describes instantaneous operating demand. The \(12.0\ \text{kWh}\) value contributes to energy consumption and cost. Real design requires code rules, continuous-load treatment, conductor ampacity, overcurrent protection, voltage drop, equipment ratings, and installation conditions beyond this ideal calculation, but the electrical quantities remain the backbone of that work.

!!! mascot-warning "A Model Is Not a Work Permit"
    ![Relay giving a safety warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    These ideal calculations explain system behavior; they do not authorize energized work or replace code-compliant design. Verify equipment data, applicable standards, protective devices, and safe work procedures before applying a result to a real installation.

## Magnetic Fields and Current

A **magnetic field** is a region in which moving electric charges, magnetic materials, and other magnetic fields experience magnetic forces. The field is represented by the vector \(\mathbf{B}\), and its SI unit is the tesla (T). A vector has both magnitude and direction, so a magnetic-field description must say how strong the field is and which way it points.

Moving charge produces a magnetic field. Around a long straight conductor carrying conventional current, the field forms closed loops centered on the conductor. The right-hand grip rule gives the direction: point the right thumb in the conventional-current direction, and the curled fingers show the magnetic-field direction. Reversing current reverses the field direction.

For an ideal, long, straight conductor in free space, the field magnitude at radial distance \(r\) is

\[
B = \frac{\mu_0 I}{2\pi r}
\]

where \(\mu_0=4\pi\times10^{-7}\ \text{T·m/A}\), \(I\) is current, and \(r\) is distance from the conductor. The model shows two important patterns: field magnitude is directly proportional to current and inversely proportional to distance. Doubling \(I\) doubles \(B\); doubling \(r\) halves \(B\).

### Worked Example: Field Near a Straight Conductor

A long straight conductor carries \(5.00\ \text{A}\). At a point \(0.0100\ \text{m}\) from its center, the idealized field magnitude is

\[
B = \frac{(4\pi\times10^{-7}\ \text{T·m/A})(5.00\ \text{A})}{2\pi(0.0100\ \text{m})}
  = 1.00\times10^{-4}\ \text{T}
  = 100\ \mu\text{T}
\]

If current increases to \(10.0\ \text{A}\) at the same distance, the field becomes \(200\ \mu\text{T}\). If the current remains \(5.00\ \text{A}\) and the distance increases to \(0.0200\ \text{m}\), the field becomes \(50.0\ \mu\text{T}\). These values apply to the ideal long-conductor model, not to every conductor geometry.

Magnetic fields are the bridge between circuits and electromechanical power equipment. Motors use current and magnetic fields to produce force and torque. Generators use motion through magnetic fields to induce voltage. Transformers use time-varying magnetic flux to transfer energy between windings. Later chapters will refine these mechanisms, but their common foundation is that electricity and magnetism are coupled aspects of electromagnetism.

The next activity uses **into the page** and **out of the page** to describe current perpendicular to the screen. The learner predicts clockwise or counterclockwise field circulation before the answer is shown.

#### Diagram: Current and Magnetic Field Explorer


<iframe src="../../sims/current-magnetic-field-explorer/main.html" width="100%" height="617px" scrolling="no"></iframe>
[Run Current and Magnetic Field Explorer Fullscreen](../../sims/current-magnetic-field-explorer/main.html)

<details markdown="1">
<summary>Current and Magnetic Field Explorer</summary>
Type: microsim
**sim-id:** current-magnetic-field-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** demonstrate<br/>
**Learning Objective:** The learner will demonstrate how current direction, current magnitude, and distance determine the direction and magnitude of the magnetic field around a long straight conductor by correctly predicting four cases.

**Prerequisites:** conventional current, magnetic field, vector direction, tesla, microtesla, into the page, out of the page, and the right-hand grip rule, all defined in the preceding prose.

**Evidence of Mastery:** For four fixed cases, the learner commits to a circulation direction and a field magnitude before the field is revealed. Direction must match the right-hand grip rule, and magnitude must be within ±0.5 µT of the model. Mastery is all four directions and at least three of four magnitudes correct on the first attempt.

**Misconceptions:** (1) Reversing current changes field strength but not direction. (2) Field magnitude increases with distance. (3) Doubling current has no effect on field magnitude. (4) Electron drift, rather than conventional current, should be used for the right-hand grip rule.

**Instructional Rationale:** Apply-level mastery requires using both the directional rule and the magnitude equation in concrete cases. Prediction before reveal distinguishes reasoned application from passive viewing.

**Content:** The model is a long straight conductor perpendicular to the viewing plane. Conventional current direction is either Out of page or Into page. Field circulation choices are Clockwise and Counterclockwise. Field magnitude is reported in microteslas.

The four cases appear in fixed order:

| Case | Current | Direction | Distance | Correct circulation | Correct magnitude | Reason shown after answer |
|---|---:|---|---:|---|---:|---|
| 1 | 5.00 A | Out of page | 1.00 cm | Counterclockwise | 100 µT | Right thumb points out of the page; curled fingers circulate counterclockwise. |
| 2 | 5.00 A | Into page | 1.00 cm | Clockwise | 100 µT | Reversing current reverses circulation but leaves magnitude unchanged. |
| 3 | 10.0 A | Out of page | 1.00 cm | Counterclockwise | 200 µT | Doubling current at fixed distance doubles field magnitude. |
| 4 | 5.00 A | Out of page | 2.00 cm | Counterclockwise | 50.0 µT | Doubling distance at fixed current halves field magnitude. |

After the four cases, exploration uses current magnitude from 1.00 to 10.0 A in 1.00 A steps with a default of 5.00 A; distance from 1.00 to 10.0 cm in 1.00 cm steps with a default of 1.00 cm; and either current direction, with Out of page as the default. The activity labels the calculation “ideal long straight conductor in free space.”

**Provenance:** The equation, constant, worked values, and directional rule come from this chapter's “Magnetic Fields and Current” section. All values are calculated from the Rules and are illustrative of the idealized model.

**Rules:** \(B=\mu_0 I/(2\pi r)\), where \(\mu_0=4\pi\times10^{-7}\ \text{T·m/A}\); distance is converted from centimeters to meters before calculation; \(1\ \text{T}=10^6\ \mu\text{T}\). Out-of-page conventional current produces counterclockwise circulation; into-page current produces clockwise circulation. Current magnitude and distance are always greater than zero. Magnitudes are displayed to 0.1 µT, and assessment tolerance is ±0.5 µT.

**Learner Activity:**

1. The learner reads case 1, chooses a circulation direction, calculates a magnitude, and submits both predictions.
2. The activity reveals the field and the complete substitution only after submission, then moves to the next case.
3. The learner completes the remaining three cases and compares each result with the preceding case to isolate the effect of one changed quantity.
4. Exploration mode unlocks. Changing a quantity hides the prior explanation, updates the field, and asks the learner to state whether magnitude increased, decreased, or stayed the same.

**Feedback:** Four cases in fixed order, one attempt per direction and two attempts per magnitude. Correct direction: “Correct: the right-hand grip rule gives <direction>.” Incorrect direction: the case-specific Reason is shown and the correct direction is revealed. Correct magnitude: “Correct: <substitution> = <value> µT.” After the second incorrect magnitude, the full substitution is revealed. A score separately reports directions correct on first attempt and magnitudes correct on first attempt.

**Starting State:** Case 1 shows a conductor carrying 5.00 A out of the page at a marked point 1.00 cm away. The field itself is hidden, and the question is “Which way does the field circulate, and what is its magnitude here?”

**Chapter Anchors:** The chapter calculates 100 µT for 5.00 A at 1.00 cm, 200 µT for 10.0 A at 1.00 cm, and 50.0 µT for 5.00 A at 2.00 cm; it states that reversing current reverses field direction.
</details>

## Direct Current and Alternating Current

Current and voltage are often classified by how they behave over time. **Direct current (DC)** maintains one reference direction. Its magnitude may be constant, may contain ripple, or may change during operation; “direct” means the current does not reverse direction under the chosen reference. Batteries, many electronic power supplies, and photovoltaic modules are common DC sources.

A constant \(12\ \text{V}\) battery connected to a \(6\ \Omega\) resistor provides a simple DC example:

\[
I = \frac{12\ \text{V}}{6\ \Omega} = 2\ \text{A}
\]

Under the ideal constant-resistance model, current remains \(2\ \text{A}\) and flows in one conventional direction. If the source voltage slowly falls during discharge, the current magnitude also falls, but the circuit is still DC as long as polarity does not reverse.

**Alternating current (AC)** periodically changes magnitude and reverses direction. Utility power systems use AC because transformers make it practical to change voltage levels efficiently and because rotating generators naturally produce alternating voltage. AC also makes polyphase systems possible, which will be developed in later chapters.

An AC value can be positive, zero, or negative relative to its reference direction. The sign does not mean the load alternates between “having electricity” and “not having electricity.” It means the electrical force and conventional current reverse direction. In a resistive heater, energy is converted to heat during both halves of the cycle because instantaneous power remains nonnegative when voltage and current reverse together.

The following comparison summarizes the behavior already described.

| Feature | Direct current | Alternating current |
|---|---|---|
| Reference direction | Does not reverse | Reverses periodically |
| Typical source | Battery, PV module, rectifier output | Alternator, utility supply |
| Time behavior | Constant or varying magnitude with one polarity | Repeating waveform with positive and negative portions |
| Common design question | What steady value flows? | What are frequency, phase, peak, and RMS values? |

## Sine Waves, Frequency, Peak, and RMS

The most important ideal AC waveform is the **sine wave**.

#### Diagram: Sine Wave Explorer

Adjust the sliders to see how amplitude, frequency, and phase change the shape of a sine wave before working the example below.

<iframe src="https://dmccreary.github.io/learning-python/sims/sine-wave-explorer/main.html" width="100%" height="492px" scrolling="no"></iframe>
[Run Sine Wave Explorer Fullscreen](https://dmccreary.github.io/learning-python/sims/sine-wave-explorer/main.html)

A sinusoidal voltage can be written as

\[
v(t)=V_{\text{peak}}\sin(2\pi ft+\phi)
\]

where \(V_{\text{peak}}\) is peak voltage, \(f\) is frequency in hertz, \(t\) is time in seconds, and \(\phi\) is phase angle. A sine wave changes smoothly, repeats exactly, and is produced naturally by uniform rotation in an ideal generator. Real power-system waveforms contain some distortion, but the sine wave remains the reference model for AC analysis.

**Frequency** is the number of complete cycles per second. Its unit is the hertz (Hz), equal to one cycle per second. The time required for one cycle is the **period** \(T\):

\[
T=\frac{1}{f}
\]

The nominal frequency of the interconnected North American AC power system is \(60\ \text{Hz}\). Its nominal period is therefore

\[
T=\frac{1}{60\ \text{Hz}}=0.01667\ \text{s}=16.67\ \text{ms}
\]

Frequency is a system-wide timing quantity. Generators connected to the same AC system operate in synchronism, and the balance between generation and load influences system frequency. Chapter 4 develops that operational relationship.

The **peak value** is the maximum magnitude reached by a waveform relative to zero. For a symmetric sine wave, the positive peak is \(+V_{\text{peak}}\) and the negative peak is \(-V_{\text{peak}}\). Peak values matter when checking insulation stress, semiconductor blocking voltage, and clearances.

The **root-mean-square (RMS) value** is the DC-equivalent value for average power in a resistor. For any periodic voltage,

\[
V_{\text{RMS}}=\sqrt{\frac{1}{T}\int_0^T v^2(t)\,dt}
\]

For a pure sine wave, this reduces to

\[
V_{\text{RMS}}=\frac{V_{\text{peak}}}{\sqrt{2}}
\qquad\text{and}\qquad
V_{\text{peak}}=\sqrt{2}V_{\text{RMS}}
\]

RMS is not the simple arithmetic average of a symmetric sine wave; that average over a complete cycle is zero. Squaring prevents positive and negative halves from canceling, averaging captures the waveform's overall squared magnitude, and taking the square root returns the original unit.

#### Diagram: RMS Explorer

Change the amplitude, frequency, and phase of a sine wave, then shade the area under the squared wave. Only amplitude changes the RMS value.

<iframe src="https://dmccreary.github.io/power-generation-and-distribution/sims/rms-explorer/main.html" width="100%" height="642px" scrolling="no"></iframe>
[Run RMS Explorer Fullscreen](https://dmccreary.github.io/power-generation-and-distribution/sims/rms-explorer/main.html)

### Worked Example: A 120-Volt Sinusoidal Source

For an ideal \(120\ \text{V RMS}\), \(60\ \text{Hz}\) sine wave, the peak voltage is

\[
V_{\text{peak}}=\sqrt{2}(120\ \text{V})\approx169.7\ \text{V}
\]

Using the rounded peak value \(170\ \text{V}\) in the reverse calculation gives

\[
V_{\text{RMS}}=\frac{170\ \text{V}}{\sqrt{2}}\approx120.2\ \text{V}
\]

At one quarter-cycle with \(\phi=0\), \(t=T/4\), so the sine argument is \(\pi/2\) and the instantaneous voltage reaches its positive peak. At one half-cycle, the voltage crosses zero. At three quarters of a cycle, it reaches the negative peak. These points connect the equation to the plotted waveform.

!!! mascot-encourage "Waveform Notation Takes Two Passes"
    ![Relay offering encouragement](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If peak, RMS, period, and instantaneous value feel crowded together, that is normal. First mark one cycle and its four quarter-cycle points; then attach each quantity to the feature it measures.

Before using the activity, distinguish **instantaneous value**, the value at one specified time, from **RMS value**, a calculation over a complete cycle. The activity uses ideal sine waves and a constant DC comparison. It assesses period and RMS calculations before revealing the plotted result.

#### Diagram: AC Waveform Measurement Explorer


<iframe src="../../sims/ac-waveform-measurement-explorer/main.html" width="100%" height="652px" scrolling="no"></iframe>
[Run AC Waveform Measurement Explorer Fullscreen](../../sims/ac-waveform-measurement-explorer/main.html)

<details markdown="1">
<summary>AC Waveform Measurement Explorer</summary>
Type: microsim
**sim-id:** ac-waveform-measurement-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate period and RMS value from the frequency and peak value of an ideal sine wave with both quantities correct for three waveforms.

**Prerequisites:** direct current, alternating current, sine wave, cycle, frequency, period, peak value, RMS value, and instantaneous value, all defined in the preceding sections.

**Evidence of Mastery:** For three fixed sine waves, the learner submits the period and RMS value before the waveform measurements are revealed. Period is correct within ±0.01 ms and RMS voltage within ±0.1 V. Mastery is six of six values correct within two attempts each. Free exploration and viewing the DC comparison are not evidence.

**Misconceptions:** (1) RMS is the arithmetic average of the positive and negative values. (2) Peak and RMS are equal. (3) Higher frequency increases the period. (4) A negative instantaneous voltage means the waveform has no magnitude or power-transfer capability.

**Instructional Rationale:** Apply-level calculation needs repeated use of \(T=1/f\) and \(V_{\text{RMS}}=V_{\text{peak}}/\sqrt{2}\). Committing values before reveal prevents the graph from functioning as an answer key and connects equations to measurable waveform features.

**Content:** The activity includes an ideal sine-wave mode and a constant DC comparison mode. Sine-wave labels are frequency \(f\), period \(T\), peak voltage \(V_{\text{peak}}\), RMS voltage \(V_{\text{RMS}}\), and instantaneous voltage \(v(t)\). The DC comparison states “A constant DC value does not reverse direction; its RMS magnitude equals its constant magnitude.”

The three assessment waveforms appear in fixed order:

| Waveform | Frequency | Peak voltage | Correct period | Correct RMS voltage | Incorrect-answer reason |
|---|---:|---:|---:|---:|---|
| 1 | 60 Hz | 169.7 V | 16.67 ms | 120.0 V | Period is the reciprocal of frequency; sine-wave RMS is peak divided by \(\sqrt{2}\). |
| 2 | 50 Hz | 325.3 V | 20.00 ms | 230.0 V | A lower frequency produces a longer period; peak and RMS are not equal. |
| 3 | 400 Hz | 39.60 V | 2.50 ms | 28.00 V | Convert seconds to milliseconds after taking \(1/f\); squaring in the RMS definition prevents cancellation. |

Exploration mode provides frequency from 10 to 400 Hz in 10 Hz steps with default 60 Hz, peak voltage from 10 to 400 V in 10 V steps with default 170 V, and phase angle from 0 to 360 degrees in 15-degree steps with default 0 degrees. The plotted interval contains two full cycles. A marker can move through the interval and reports time in milliseconds and instantaneous voltage in volts.

**Provenance:** Equations and the 60 Hz worked values come from this chapter's “Sine Waves, Frequency, Peak, and RMS” section. The 50 Hz and 400 Hz challenge values are illustrative engineering cases calculated from the Rules and must be labeled “ideal sine-wave cases.”

**Rules:** \(T=1/f\); seconds are multiplied by 1000 for milliseconds; \(V_{\text{RMS}}=V_{\text{peak}}/\sqrt{2}\); \(v(t)=V_{\text{peak}}\sin(2\pi ft+\phi)\), with phase converted from degrees to radians. Frequency and peak voltage are always greater than zero. For constant DC magnitude \(V_{DC}\), \(V_{\text{RMS}}=|V_{DC}|\). Assessment tolerances are ±0.01 ms and ±0.1 V.

**Learner Activity:**

1. The learner sees waveform 1's frequency and peak voltage, predicts its period and RMS voltage, and submits both values before the waveform is annotated.
2. The activity checks the values, then reveals one full cycle with zero crossings, positive peak, negative peak, period, and RMS magnitude identified.
3. The learner repeats the process for waveforms 2 and 3. After each reveal, the learner selects whether the new frequency made period shorter or longer than in the preceding case.
4. Exploration mode unlocks. Changing any input hides the prior explanation and updates the waveform, measurements, and movable instantaneous-value marker.
5. The learner switches to constant DC comparison mode and observes that the DC value does not reverse and its RMS magnitude equals its constant magnitude.

**Feedback:** Three waveforms in fixed order, two numeric answers per waveform, two attempts per answer. Correct feedback gives the substitution and unit. Incorrect feedback gives the row's Incorrect-answer reason. After the second incorrect attempt, the correct substitution is revealed and the answer counts as missed. The direction comparison has one attempt; incorrect feedback states that \(T\) and \(f\) are inversely related. A score “Calculated values correct: n of 6” is shown.

**Starting State:** Waveform 1 shows only \(f=60\ \text{Hz}\) and \(V_{\text{peak}}=169.7\ \text{V}\); measurement annotations are hidden. The question is “What are the period in milliseconds and the RMS voltage?”

**Chapter Anchors:** The chapter states a nominal North American frequency of 60 Hz, calculates its period as 16.67 ms, and calculates 169.7 V peak from 120 V RMS for an ideal sine wave.
</details>

## Key Takeaways

- Electric charge is conserved and measured in coulombs; current is the rate of charge flow in amperes.
- Voltage is energy per unit charge, measured between two points in volts.
- Resistance relates voltage and current for an ohmic element through \(V=IR\), subject to the model's operating limits.
- Current creates a magnetic field whose direction follows the right-hand grip rule and whose magnitude depends on current and geometry.
- DC maintains one reference direction; AC periodically reverses, and an ideal AC source is commonly modeled as a sine wave.
- Frequency is cycles per second, period is \(1/f\), peak is maximum magnitude, and RMS expresses a waveform's DC-equivalent heating value.
- Electric power is an energy-transfer rate in watts; electrical energy accumulates power over time and is often measured in kilowatt-hours.
- An electric power system connects generation, transmission, distribution, and utilization into one coordinated energy path.

## Review Problems

1. A conductor carries \(15.0\ \text{C}\) in \(5.00\ \text{s}\). Calculate average current.
2. A \(48.0\ \text{V}\) source is connected to a \(16.0\ \Omega\) resistor. Calculate current and power.
3. A \(2.40\ \text{kW}\) resistive load operates for \(7.50\ \text{h}\). Calculate energy in kWh and MJ.
4. An ideal sine wave has \(V_{\text{peak}}=339.4\ \text{V}\) and \(f=60\ \text{Hz}\). Calculate RMS voltage and period.
5. A long straight conductor's current doubles while observation distance stays fixed. State how field magnitude changes. Then state what happens to field direction if current reverses.
6. Trace electrical energy from a generator to a motor in a commercial building, naming the four power-system stages and one conversion or transfer at each stage.

??? question "Check your answers"
    1. \(I=15.0\ \text{C}/5.00\ \text{s}=3.00\ \text{A}\).
    2. \(I=48.0\ \text{V}/16.0\ \Omega=3.00\ \text{A}\); \(P=(48.0\ \text{V})(3.00\ \text{A})=144\ \text{W}\).
    3. \(E=(2.40\ \text{kW})(7.50\ \text{h})=18.0\ \text{kWh}=64.8\ \text{MJ}\).
    4. \(V_{\text{RMS}}=339.4/\sqrt{2}=240.0\ \text{V}\); \(T=1/60\ \text{s}=16.67\ \text{ms}\).
    5. Field magnitude doubles. Reversing current reverses field circulation.
    6. Generation converts an input source to electrical energy; transmission moves bulk power at high voltage; distribution reduces voltage and routes power locally; utilization converts electrical energy to motor shaft work.

!!! mascot-celebration "Foundations Connected"
    ![Relay celebrating the completed chapter](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now connect charge, voltage, current, resistance, magnetism, waveform measurements, power, and energy to the four-stage power path. That is the calculation language used throughout the rest of the book—build it safe and reliable.
