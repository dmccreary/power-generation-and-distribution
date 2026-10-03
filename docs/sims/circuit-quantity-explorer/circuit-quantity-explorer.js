// Circuit Quantity Explorer — slider-driven Ohm's law and charge-transfer model
// CANVAS_HEIGHT: 585
// Layout: drawHeight 430 + four control rows (4 × 35 + 15) = 585.
// Sliders and the readout work immediately. "Quiz me" hides the results for the
// current slider setting and asks the learner to predict I and Q first.

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 155;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

let voltageSlider;
let resistanceSlider;
let timeSlider;
let closedCheckbox;
let quizButton;
let checkButton;
let doneButton;
let currentInput;
let chargeInput;

let mode = 'explore';   // 'explore' | 'quiz' | 'revealed'
let attempts = [0, 0];
let resolved = [false, false];
let correctCount = 0;
let quizCount = 0;
let feedback = 'Drag the sliders. Current and charge update immediately.';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  voltageSlider = createSlider(0, 48, 24, 1);
  resistanceSlider = createSlider(1, 24, 12, 1);
  timeSlider = createSlider(1, 10, 1, 1);
  closedCheckbox = createCheckbox(' Switch closed', true);
  quizButton = createButton('Quiz me on these values');
  checkButton = createButton('Check');
  doneButton = createButton('Back to exploring');
  currentInput = createInput('', 'number');
  chargeInput = createInput('', 'number');
  [voltageSlider, resistanceSlider, timeSlider, closedCheckbox, quizButton, checkButton, doneButton, currentInput, chargeInput]
    .forEach(control => control.parent(document.querySelector('main')));

  [voltageSlider, resistanceSlider, timeSlider].forEach(slider => slider.input(slidersChanged));
  closedCheckbox.changed(slidersChanged);
  quizButton.mousePressed(startQuiz);
  checkButton.mousePressed(checkAnswers);
  doneButton.mousePressed(backToExploring);
  currentInput.attribute('step', '0.01');
  currentInput.attribute('aria-label', 'Predicted current in amperes');
  chargeInput.attribute('step', '0.01');
  chargeInput.attribute('aria-label', 'Predicted transferred charge in coulombs');

  updateControlVisibility();
  positionControls();
  describe('An ideal circuit with sliders for voltage, resistance, and time and a switch. It shows current from Ohm’s law and charge from Q equals current times time, with an optional prediction quiz.', LABEL);
}

function draw() {
  updateCanvasSize();
  drawRegions();
  drawTitle();
  const model = currentModel();
  drawCircuit(model);
  drawReadout(model);
  drawFeedback();
  drawControlLabels();
}

function currentModel() {
  return {
    state: closedCheckbox.checked() ? 'Closed' : 'Open',
    voltage: Number(voltageSlider.value()),
    resistance: Number(resistanceSlider.value()),
    time: Number(timeSlider.value())
  };
}

function resultsVisible() {
  return mode !== 'quiz';
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
  textSize(26);
  text('Circuit Quantity Explorer', canvasWidth / 2, 12);
  textSize(16);
  text(mode === 'quiz' ? 'Predict before the results are revealed' : 'Idealized model: I = V/R and Q = I·t', canvasWidth / 2, 46);
}

function drawCircuit(model) {
  const left = max(65, canvasWidth * 0.16);
  const right = min(canvasWidth - 65, canvasWidth * 0.84);
  const top = 105;
  const bottom = 265;
  const gap = 38;

  stroke('midnightblue');
  strokeWeight(4);
  noFill();
  line(left, top, right - 100, top);
  line(right - 40, top, right, top);
  line(right, top, right, bottom);
  line(right, bottom, left, bottom);
  line(left, bottom, left, 205);
  line(left, 155, left, top);

  // Resistor.
  beginShape();
  vertex(right - 100, top);
  vertex(right - 90, top - 14);
  vertex(right - 75, top + 14);
  vertex(right - 60, top - 14);
  vertex(right - 45, top + 14);
  vertex(right - 40, top);
  endShape();

  // Source plates.
  stroke('firebrick');
  strokeWeight(3);
  line(left - 18, 155, left + 18, 155);
  line(left - 11, 205, left + 11, 205);
  stroke('midnightblue');
  line(left, 155, left, 168);
  line(left, 192, left, 205);

  // Switch.
  const sx = (left + right) / 2;
  stroke('darkorange');
  strokeWeight(4);
  line(sx - gap, bottom, sx - 8, bottom);
  circle(sx - 8, bottom, 7);
  circle(sx + gap, bottom, 7);
  if (model.state === 'Closed') {
    line(sx - 5, bottom, sx + gap, bottom);
  } else {
    line(sx - 5, bottom - 2, sx + gap - 5, bottom - 30);
  }

  fill('black');
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  textAlign(LEFT, CENTER);
  text(`Source: ${model.voltage.toFixed(1)} V`, left + 16, 180);
  textAlign(CENTER, CENTER);
  text(`Resistor: ${model.resistance.toFixed(1)} Ω`, right - 70, 78);
  text(`${model.state} circuit`, sx + 12, 300);

  if (resultsVisible()) {
    const current = model.state === 'Closed' ? model.voltage / model.resistance : 0;
    if (current > 0) {
      fill('royalblue');
      triangle(sx - 20, top - 12, sx - 20, top + 12, sx + 2, top);
      noStroke();
      fill('black');
      textAlign(CENTER, TOP);
      text('Conventional current', sx - 15, top + 16);
    }
  }
}

function drawReadout(model) {
  const current = model.state === 'Closed' ? model.voltage / model.resistance : 0;
  const charge = current * model.time;
  const boxW = min(560, canvasWidth - 50);
  const x = (canvasWidth - boxW) / 2;
  fill('white');
  stroke('silver');
  rect(x, 322, boxW, 66, 8);
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(17);
  if (mode === 'quiz') {
    text(`Given: ${model.voltage} V, ${model.resistance} Ω, ${model.time} s, switch ${model.state.toLowerCase()}`, canvasWidth / 2, 336);
    textSize(15);
    textAlign(LEFT, CENTER);
    text('I (A):', x + 12, 366);
    text('Q (C):', x + 12 + min(150, boxW * 0.32), 366);
  } else if (model.state === 'Closed') {
    text(`I = V/R = ${model.voltage} / ${model.resistance} = ${current.toFixed(2)} A`, canvasWidth / 2, 337);
    text(`Q = I·t = ${current.toFixed(2)} × ${model.time} = ${charge.toFixed(2)} C`, canvasWidth / 2, 366);
  } else {
    text('Open switch: no complete path, so I = 0 A', canvasWidth / 2, 337);
    text(`Q = I·t = 0 × ${model.time} = 0 C`, canvasWidth / 2, 366);
  }
}

function drawFeedback() {
  fill(feedback.startsWith('Correct') ? 'darkgreen' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  text(feedback, 25, 396, canvasWidth - 50, 32);
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text(`Voltage: ${voltageSlider.value()} V`, 18, drawHeight + 22);
  text(`Resistance: ${resistanceSlider.value()} Ω`, 18, drawHeight + 57);
  text(`Time: ${timeSlider.value()} s`, 18, drawHeight + 92);
  if (quizCount > 0) {
    textAlign(RIGHT, CENTER);
    textSize(13);
    text(`Quiz: ${correctCount} of ${quizCount * 2} correct`, canvasWidth - margin, drawHeight + 142);
  }
}

function slidersChanged() {
  if (mode === 'explore') feedback = 'Try the switch: an open circuit forces I = 0 and Q = 0.';
  if (mode === 'revealed') backToExploring();
}

function startQuiz() {
  mode = 'quiz';
  attempts = [0, 0];
  resolved = [false, false];
  quizCount += 1;
  currentInput.value('');
  chargeInput.value('');
  feedback = 'Calculate I with Ohm’s law, then Q = I·t. Sliders are locked during the quiz.';
  updateControlVisibility();
}

function checkAnswers() {
  const model = currentModel();
  const current = model.state === 'Closed' ? model.voltage / model.resistance : 0;
  const expected = [current, current * model.time];
  const fields = [currentInput, chargeInput];
  const names = ['I', 'Q'];
  const units = ['A', 'C'];
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
      messages.push(`Correct: ${names[i]} = ${expected[i].toFixed(2)} ${units[i]}.`);
    } else if (attempts[i] >= 2) {
      resolved[i] = true;
      messages.push(`${names[i]} = ${expected[i].toFixed(2)} ${units[i]}.`);
    } else {
      messages.push(`${names[i]} needs another try.`);
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
  feedback = 'Drag the sliders. Current and charge update immediately.';
  updateControlVisibility();
}

function updateControlVisibility() {
  const quiz = mode === 'quiz';
  [voltageSlider, resistanceSlider, timeSlider, closedCheckbox.elt.querySelector('input')].forEach(el => {
    const c = el.elt || el;
    if (quiz) c.setAttribute('disabled', ''); else c.removeAttribute('disabled');
  });
  if (quiz) { checkButton.show(); currentInput.show(); chargeInput.show(); quizButton.hide(); doneButton.hide(); }
  else { checkButton.hide(); currentInput.hide(); chargeInput.hide(); quizButton.show(); doneButton.hide(); }
  if (mode === 'revealed') { quizButton.show(); doneButton.show(); }
}

function positionControls() {
  const sliderWidth = max(120, canvasWidth - sliderLeftMargin - margin);
  [voltageSlider, resistanceSlider, timeSlider].forEach((slider, i) => {
    slider.position(sliderLeftMargin, drawHeight + 10 + i * 35);
    slider.size(sliderWidth);
  });
  closedCheckbox.position(margin - 7, drawHeight + 112);
  quizButton.position(sliderLeftMargin, drawHeight + 112);
  doneButton.position(sliderLeftMargin + 175, drawHeight + 112);

  const boxW = min(560, canvasWidth - 50);
  const x = (canvasWidth - boxW) / 2;
  const gap = min(150, boxW * 0.32);
  currentInput.position(x + 12 + 43, drawHeight - 76);
  currentInput.size(min(80, gap - 55), 22);
  chargeInput.position(x + 12 + gap + 43, drawHeight - 76);
  chargeInput.size(min(80, gap - 55), 22);
  checkButton.position(x + 12 + 2 * gap + 15, drawHeight - 76);
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
