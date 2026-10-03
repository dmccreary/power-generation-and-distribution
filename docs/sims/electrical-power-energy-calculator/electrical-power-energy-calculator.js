// Electrical Power and Energy Calculator — rate versus accumulated energy
// CANVAS_HEIGHT: 600
// Layout: drawHeight 445 + four control rows (4 × 35 + 15) = 600.
// Sliders and the readout work immediately. "Quiz me" hides P and E for the
// current slider setting and asks the learner to predict them first.

let canvasWidth = 400;
let drawHeight = 445;
let controlHeight = 155;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 215;
let defaultTextSize = 16;

const presets = [
  { name: 'Example loads…', voltage: null },
  { name: '24 V, 2 A, 5 h (small DC load)', voltage: 24, current: 2, time: 5 },
  { name: '120 V, 10 A, 2.5 h (heater)', voltage: 120, current: 10, time: 2.5 },
  { name: '480 V, 20 A, 3 h (industrial load)', voltage: 480, current: 20, time: 3 }
];

let voltageSlider;
let currentSlider;
let timeSlider;
let presetSelect;
let doubleTimeButton;
let quizButton;
let checkButton;
let doneButton;
let powerInput;
let energyInput;

let mode = 'explore';   // 'explore' | 'quiz' | 'revealed'
let lastChanged = '';
let attempts = [0, 0];
let resolved = [false, false];
let correctCount = 0;
let quizCount = 0;
let feedback = 'Drag the sliders. Power and energy update immediately.';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  voltageSlider = createSlider(12, 480, 120, 12);
  currentSlider = createSlider(1, 40, 10, 1);
  timeSlider = createSlider(0.5, 8, 2.5, 0.5);
  presetSelect = createSelect();
  presets.forEach((p, i) => presetSelect.option(p.name, i));
  doubleTimeButton = createButton('Double the time');
  quizButton = createButton('Quiz me');
  checkButton = createButton('Check');
  doneButton = createButton('Back to exploring');
  powerInput = createInput('', 'number');
  energyInput = createInput('', 'number');
  [voltageSlider, currentSlider, timeSlider, presetSelect, doubleTimeButton, quizButton, checkButton, doneButton, powerInput, energyInput]
    .forEach(control => control.parent(document.querySelector('main')));

  voltageSlider.input(() => slidersChanged('voltage'));
  currentSlider.input(() => slidersChanged('current'));
  timeSlider.input(() => slidersChanged('time'));
  presetSelect.changed(applyPreset);
  doubleTimeButton.mousePressed(doubleTime);
  quizButton.mousePressed(startQuiz);
  checkButton.mousePressed(checkAnswers);
  doneButton.mousePressed(backToExploring);
  powerInput.attribute('step', '0.01');
  powerInput.attribute('aria-label', 'Predicted electric power in watts');
  energyInput.attribute('step', '0.01');
  energyInput.attribute('aria-label', 'Predicted electrical energy in kilowatt-hours');

  updateControlVisibility();
  positionControls();
  describe('Sliders for voltage, current, and time show electric power in watts and accumulated energy in kilowatt-hours as two bars, with an optional prediction quiz.', LABEL);
}

function draw() {
  updateCanvasSize();
  drawRegions();
  drawTitle();
  const values = activeValues();
  drawFormulaFlow(values);
  drawPowerEnergyComparison(values);
  if (mode === 'quiz') drawQuizLabels();
  drawFeedback();
  drawControlLabels();
}

function drawRegions() {
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(25);
  text('Electrical Power and Energy', canvasWidth / 2, 12);
  textSize(16);
  text(mode === 'quiz' ? 'Predict before the results are revealed' : 'Ideal resistive load: power is a rate, energy accumulates', canvasWidth / 2, 44);
}

function activeValues() {
  const voltage = Number(voltageSlider.value());
  const current = Number(currentSlider.value());
  const time = Number(timeSlider.value());
  const watts = voltage * current;
  return { voltage, current, time, watts, kilowatts: watts / 1000, energy: watts * time / 1000 };
}

function resultsVisible() {
  return mode !== 'quiz';
}

function changeNote() {
  if (lastChanged === 'time') return 'You changed time: energy changed, but the power rate did not.';
  if (lastChanged === 'voltage' || lastChanged === 'current') return 'You changed V or I: the power rate changed, so energy changed too.';
  return 'Try the time slider: power stays put while energy grows.';
}

function drawFormulaFlow(values) {
  const left = max(35, canvasWidth * 0.07);
  const usable = canvasWidth - left * 2;
  const boxW = min(190, (usable - 40) / 3);
  const gap = (usable - boxW * 3) / 2;
  const xs = [left, left + boxW + gap, left + (boxW + gap) * 2];
  const labels = [
    `${values.voltage} V × ${values.current} A`,
    resultsVisible() ? `${values.watts.toFixed(1)} W\n${values.kilowatts.toFixed(3)} kW` : 'Power\n? W',
    resultsVisible() ? `${values.energy.toFixed(3)} kWh\n${(values.energy * 3.6).toFixed(3)} MJ` : 'Energy\n? kWh'
  ];
  const colors = ['lightsteelblue', 'khaki', 'palegreen'];
  for (let i = 0; i < 3; i += 1) {
    fill(colors[i]);
    stroke('slategray');
    rect(xs[i], 95, boxW, 92, 10);
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(labels[i], xs[i] + boxW / 2, 141);
  }
  stroke('dimgray');
  strokeWeight(3);
  line(xs[0] + boxW, 141, xs[1] - 8, 141);
  line(xs[1] + boxW, 141, xs[2] - 8, 141);
  fill('dimgray');
  noStroke();
  triangle(xs[1] - 8, 134, xs[1] - 8, 148, xs[1], 141);
  triangle(xs[2] - 8, 134, xs[2] - 8, 148, xs[2], 141);
  fill('black');
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(12);
  text('P = VI', (xs[0] + boxW + xs[1]) / 2, 129);
  text(`× ${values.time.toFixed(1)} h`, (xs[1] + boxW + xs[2]) / 2, 129);
}

function drawPowerEnergyComparison(values) {
  const graphLeft = 70;
  const graphRight = canvasWidth - 55;
  const top = 225;
  const maxWidth = max(80, graphRight - graphLeft);
  const pNorm = min(1, values.kilowatts / 10);
  const eNorm = min(1, values.energy / 40);

  fill('white');
  stroke('silver');
  rect(35, 207, canvasWidth - 70, 138, 10);
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(16);
  text('Power rate (full bar = 10 kW)', graphLeft, top + 10);
  text('Energy used (full bar = 40 kWh)', graphLeft, top + 67);
  stroke('silver');
  fill('whitesmoke');
  rect(graphLeft, top + 27, maxWidth, 20, 4);
  rect(graphLeft, top + 84, maxWidth, 20, 4);
  if (resultsVisible()) {
    noStroke();
    fill('goldenrod');
    rect(graphLeft, top + 27, maxWidth * pNorm, 20, 4);
    fill('seagreen');
    rect(graphLeft, top + 84, maxWidth * eNorm, 20, 4);
    fill('black');
    noStroke();
    textAlign(RIGHT, CENTER);
    text(`${values.kilowatts.toFixed(2)} kW`, graphRight, top + 10);
    text(`${values.energy.toFixed(2)} kWh`, graphRight, top + 67);
  }
  if (mode === 'explore') {
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(15);
    text(changeNote(), 25, 360, canvasWidth - 50, 30);
  }
}

function drawQuizLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(15);
  text('P (W):', 40, 377);
  text('E (kWh):', 40 + max(150, canvasWidth * 0.33), 377);
}

function drawFeedback() {
  fill(feedback.startsWith('Correct') ? 'darkgreen' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  text(feedback, 25, 399, canvasWidth - 50, 40);
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text(`Voltage: ${voltageSlider.value()} V`, 18, drawHeight + 22);
  text(`Current: ${currentSlider.value()} A`, 18, drawHeight + 57);
  text(`Time: ${Number(timeSlider.value()).toFixed(1)} h`, 18, drawHeight + 92);
  if (quizCount > 0) {
    textAlign(RIGHT, CENTER);
    textSize(13);
    text(`Quiz: ${correctCount} of ${quizCount * 2} correct`, canvasWidth - margin, drawHeight + 146);
  }
}

function slidersChanged(which) {
  lastChanged = which;
  presetSelect.selected('0');
  if (mode === 'explore') feedback = 'Power = V × I (watts). Energy = power × time (kilowatt-hours).';
  if (mode === 'revealed') backToExploring();
}

function applyPreset() {
  const p = presets[Number(presetSelect.value())];
  if (p.voltage === null) return;
  voltageSlider.value(p.voltage);
  currentSlider.value(p.current);
  timeSlider.value(p.time);
  lastChanged = '';
  if (mode !== 'explore') backToExploring();
  feedback = `Loaded ${p.name}.`;
}

function doubleTime() {
  timeSlider.value(min(8, Number(timeSlider.value()) * 2));
  slidersChanged('time');
  feedback = 'Time doubled (limit 8 h). Compare the bars: only energy changes.';
}

function startQuiz() {
  mode = 'quiz';
  attempts = [0, 0];
  resolved = [false, false];
  quizCount += 1;
  powerInput.value('');
  energyInput.value('');
  feedback = 'Find P = V × I in watts, then E = (P in kW) × hours. Sliders are locked during the quiz.';
  updateControlVisibility();
}

function checkAnswers() {
  const v = activeValues();
  const expected = [v.watts, v.energy];
  const fields = [powerInput, energyInput];
  const labels = [`P = ${v.watts.toFixed(0)} W`, `E = ${v.energy.toFixed(2)} kWh`];
  const hints = ['Multiply volts by amperes.', 'Convert watts to kilowatts, then multiply by hours.'];
  const names = ['power', 'energy'];
  const messages = [];
  for (let i = 0; i < 2; i += 1) {
    if (resolved[i]) continue;
    const raw = fields[i].value();
    if (raw === '' || Number.isNaN(Number(raw))) {
      messages.push(`Enter ${names[i]}.`);
      continue;
    }
    attempts[i] += 1;
    if (abs(Number(raw) - expected[i]) <= 0.01) {
      resolved[i] = true;
      correctCount += 1;
      messages.push(`Correct: ${labels[i]}.`);
    } else if (attempts[i] >= 2) {
      resolved[i] = true;
      messages.push(`${labels[i]}. ${hints[i]}`);
    } else {
      messages.push(`Try ${names[i]} again. ${hints[i]}`);
    }
  }
  feedback = messages.join(' ');
  if (resolved.every(Boolean)) {
    mode = 'revealed';
    updateControlVisibility();
  }
}

function backToExploring() {
  mode = 'explore';
  feedback = 'Drag the sliders. Power and energy update immediately.';
  updateControlVisibility();
}

function updateControlVisibility() {
  const quiz = mode === 'quiz';
  [voltageSlider, currentSlider, timeSlider, presetSelect, doubleTimeButton].forEach(c => {
    if (quiz) c.attribute('disabled', ''); else c.removeAttribute('disabled');
  });
  if (quiz) { checkButton.show(); powerInput.show(); energyInput.show(); quizButton.hide(); doneButton.hide(); }
  else { checkButton.hide(); powerInput.hide(); energyInput.hide(); quizButton.show(); doneButton.hide(); }
  if (mode === 'revealed') doneButton.show();
}

function positionControls() {
  const sliderWidth = max(120, canvasWidth - sliderLeftMargin - margin);
  [voltageSlider, currentSlider, timeSlider].forEach((slider, i) => {
    slider.position(sliderLeftMargin, drawHeight + 10 + i * 35);
    slider.size(sliderWidth);
  });
  presetSelect.position(margin - 7, drawHeight + 116);
  doubleTimeButton.position(sliderLeftMargin - 20, drawHeight + 116);
  quizButton.position(sliderLeftMargin + 100, drawHeight + 116);
  doneButton.position(sliderLeftMargin - 20, drawHeight + 116);

  const gap = max(150, canvasWidth * 0.33);
  powerInput.position(40 + 52, 445 - 82 + 0);
  powerInput.size(70, 22);
  energyInput.position(40 + gap + 62, 445 - 82 + 0);
  energyInput.size(70, 22);
  checkButton.position(40 + gap + 62 + 85, 445 - 82 + 0);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = Math.floor(container.getBoundingClientRect().width);
}
