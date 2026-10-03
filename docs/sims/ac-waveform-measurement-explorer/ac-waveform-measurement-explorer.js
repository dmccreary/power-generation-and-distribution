// AC Waveform Measurement Explorer — period, RMS, and instantaneous value
// CANVAS_HEIGHT: 650
// Layout: drawHeight 460 + five control rows (5 × 35 + 15) = 650.

let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 190;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 230;
let defaultTextSize = 16;

const waveCases = [
  { frequency: 60, peak: 169.7, period: 16.67, rms: 120.0,
    reason: 'Period is the reciprocal of frequency; sine-wave RMS is peak divided by √2.' },
  { frequency: 50, peak: 325.3, period: 20.00, rms: 230.0,
    reason: 'A lower frequency produces a longer period; peak and RMS are not equal.', relation: 'Longer' },
  { frequency: 400, peak: 39.60, period: 2.50, rms: 28.00,
    reason: 'Convert seconds to milliseconds after taking 1/f; squaring in RMS prevents cancellation.', relation: 'Shorter' }
];

let caseIndex = 0;
let attempts = [0, 0];
let resolved = [false, false];
let score = 0;
let feedback = 'Calculate period and RMS voltage before the waveform measurements are revealed.';
let periodInput;
let rmsInput;
let submitButton;
let nextButton;
let relationSelect;
let relationButton;
let frequencySlider;
let peakSlider;
let phaseSlider;
let markerSlider;
let modeSelect;
let exploring = false;
let relationPending = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  periodInput = createInput('', 'number');
  periodInput.parent(document.querySelector('main'));
  periodInput.attribute('step', '0.01');
  periodInput.attribute('aria-label', 'Predicted period in milliseconds');
  rmsInput = createInput('', 'number');
  rmsInput.parent(document.querySelector('main'));
  rmsInput.attribute('step', '0.1');
  rmsInput.attribute('aria-label', 'Predicted RMS voltage');
  submitButton = createButton('Check values');
  submitButton.parent(document.querySelector('main'));
  submitButton.mousePressed(checkWaveCase);
  nextButton = createButton('Next waveform');
  nextButton.parent(document.querySelector('main'));
  nextButton.mousePressed(nextWaveCase);
  nextButton.hide();

  relationSelect = createSelect();
  relationSelect.parent(document.querySelector('main'));
  relationSelect.option('Choose period change', '');
  relationSelect.option('Shorter');
  relationSelect.option('Longer');
  relationButton = createButton('Check change');
  relationButton.parent(document.querySelector('main'));
  relationButton.mousePressed(checkRelation);
  relationSelect.hide();
  relationButton.hide();

  frequencySlider = createSlider(10, 400, 60, 10);
  peakSlider = createSlider(10, 400, 170, 10);
  phaseSlider = createSlider(0, 360, 0, 15);
  markerSlider = createSlider(0, 100, 25, 1);
  modeSelect = createSelect();
  modeSelect.option('Ideal sine wave');
  modeSelect.option('Constant DC');
  [frequencySlider, peakSlider, phaseSlider, markerSlider, modeSelect].forEach(control => {
    control.parent(document.querySelector('main'));
    control.hide();
  });
  [frequencySlider, peakSlider, phaseSlider, markerSlider].forEach(control => control.input(hideExploreExplanation));
  modeSelect.changed(hideExploreExplanation);

  positionControls();
  describe('A challenge-first waveform plot for calculating period and RMS voltage, then exploring frequency, peak voltage, phase, and instantaneous value.', LABEL);
}

function draw() {
  updateCanvasSize();
  drawRegions();
  const model = activeWave();
  drawHeader(model);
  drawWaveform(model);
  drawMeasurements(model);
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

function activeWave() {
  if (!exploring) return { ...waveCases[caseIndex], phase: 0, marker: 25, mode: 'Ideal sine wave' };
  const frequency = Number(frequencySlider.value());
  const peak = Number(peakSlider.value());
  return {
    frequency,
    peak,
    period: 1000 / frequency,
    rms: modeSelect.value() === 'Constant DC' ? abs(peak) : peak / sqrt(2),
    phase: Number(phaseSlider.value()),
    marker: Number(markerSlider.value()),
    mode: modeSelect.value()
  };
}

function measurementsVisible() {
  return exploring || resolved.every(Boolean);
}

function drawHeader(model) {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(25);
  text(exploring ? 'AC Waveform Measurement — Exploration' : `AC Waveform Measurement — Waveform ${caseIndex + 1} of 3`, canvasWidth / 2, 12);
  textSize(16);
  const modeText = model.mode === 'Constant DC' ? 'Constant DC comparison' : 'Ideal sine-wave case';
  text(`${modeText} • f = ${model.frequency.toFixed(0)} Hz • peak = ${model.peak.toFixed(1)} V`, canvasWidth / 2, 47);
}

function drawWaveform(model) {
  const left = 60;
  const right = canvasWidth - 35;
  const top = 90;
  const bottom = 305;
  const mid = (top + bottom) / 2;
  const amplitude = (bottom - top) * 0.43;

  stroke('lightgray');
  strokeWeight(1);
  for (let i = 0; i <= 8; i += 1) {
    const x = lerp(left, right, i / 8);
    line(x, top, x, bottom);
  }
  line(left, top, left, bottom);
  stroke('dimgray');
  strokeWeight(2);
  line(left, mid, right, mid);
  line(left, top, left, bottom);

  stroke('royalblue');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let x = left; x <= right; x += 2) {
    const fraction = (x - left) / (right - left);
    const value = model.mode === 'Constant DC' ? 1 : sin(TWO_PI * 2 * fraction + radians(model.phase));
    vertex(x, mid - value * amplitude);
  }
  endShape();

  if (measurementsVisible() && model.mode !== 'Constant DC') {
    stroke('darkorange');
    strokeWeight(2);
    drawingContext.setLineDash([7, 5]);
    line(left, mid - amplitude / sqrt(2), right, mid - amplitude / sqrt(2));
    drawingContext.setLineDash([]);
    stroke('darkgreen');
    line(left, bottom + 14, (left + right) / 2, bottom + 14);
    line(left, bottom + 8, left, bottom + 20);
    line((left + right) / 2, bottom + 8, (left + right) / 2, bottom + 20);
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text(`one period = ${model.period.toFixed(2)} ms`, (3 * left + right) / 4, bottom + 24);
    textAlign(LEFT, CENTER);
    text(`RMS = ${model.rms.toFixed(1)} V`, left + 8, mid - amplitude / sqrt(2) - 13);
  }

  if (exploring) {
    const markerX = lerp(left, right, model.marker / 100);
    const fraction = model.marker / 100;
    const instantaneous = model.mode === 'Constant DC' ? model.peak : model.peak * sin(TWO_PI * 2 * fraction + radians(model.phase));
    const markerY = model.mode === 'Constant DC' ? mid - amplitude : mid - (instantaneous / model.peak) * amplitude;
    stroke('firebrick');
    strokeWeight(2);
    line(markerX, top, markerX, bottom);
    fill('firebrick');
    noStroke();
    circle(markerX, markerY, 11);
    fill('black');
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(14);
    const timeMs = (2 * model.period) * fraction;
    text(`t = ${timeMs.toFixed(2)} ms, v(t) = ${instantaneous.toFixed(1)} V`, markerX, top - 5);
  }

  fill('black');
  noStroke();
  textSize(14);
  textAlign(RIGHT, CENTER);
  text('+Vpeak', left - 7, top + 8);
  text('0 V', left - 7, mid);
  text('−Vpeak', left - 7, bottom - 8);
}

function drawMeasurements(model) {
  fill('white');
  stroke('silver');
  rect(40, 355, canvasWidth - 80, 52, 8);
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  if (measurementsVisible()) {
    const message = model.mode === 'Constant DC'
      ? `Constant DC does not reverse; RMS magnitude = constant magnitude = ${model.rms.toFixed(1)} V.`
      : `T = 1/f = ${model.period.toFixed(2)} ms     VRMS = Vpeak/√2 = ${model.rms.toFixed(1)} V`;
    text(message, canvasWidth / 2, 381);
  } else {
    text('Period and RMS annotations remain hidden until both predictions are resolved.', canvasWidth / 2, 381);
  }
}

function drawFeedback() {
  fill(feedback.startsWith('Correct') ? 'darkgreen' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(feedback, 22, 412, canvasWidth - 44, 42);
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  if (!exploring) {
    text('Period T:', 18, drawHeight + 18);
    text('ms', 295, drawHeight + 18);
    text('RMS voltage:', 18, drawHeight + 53);
    text('V', 295, drawHeight + 53);
    text(`Calculated values correct: ${score} of 6`, 18, drawHeight + (relationPending ? 158 : 123));
  } else {
    text(`Frequency: ${frequencySlider.value()} Hz`, 18, drawHeight + 18);
    text(`Peak voltage: ${peakSlider.value()} V`, 18, drawHeight + 53);
    text(`Phase angle: ${phaseSlider.value()}°`, 18, drawHeight + 88);
    text(`Time marker: ${markerSlider.value()}%`, 18, drawHeight + 123);
    text('Comparison mode:', 18, drawHeight + 158);
  }
}

function checkWaveCase() {
  if (exploring) return;
  const item = waveCases[caseIndex];
  const values = [periodInput.value(), rmsInput.value()];
  const entered = values.map(Number);
  const expected = [item.period, item.rms];
  const tolerances = [0.01, 0.1];
  const labels = ['period', 'RMS voltage'];
  const units = ['ms', 'V'];
  const messages = [];
  for (let i = 0; i < 2; i += 1) {
    if (resolved[i]) continue;
    if (values[i] === '') {
      messages.push(`Enter ${labels[i]}.`);
      continue;
    }
    attempts[i] += 1;
    if (abs(entered[i] - expected[i]) <= tolerances[i]) {
      resolved[i] = true;
      score += 1;
      messages.push(`Correct: ${labels[i]} = ${expected[i].toFixed(i === 0 ? 2 : 1)} ${units[i]}.`);
    } else if (attempts[i] >= 2) {
      resolved[i] = true;
      messages.push(`${labels[i]} = ${expected[i].toFixed(i === 0 ? 2 : 1)} ${units[i]}. ${item.reason}`);
    } else {
      messages.push(`Try ${labels[i]} again. ${item.reason}`);
    }
  }
  feedback = messages.join(' ');
  if (resolved.every(Boolean)) {
    submitButton.hide();
    if (caseIndex === 0) {
      nextButton.show();
    } else {
      relationPending = true;
      relationSelect.show();
      relationButton.show();
      feedback += ' Compared with the preceding waveform, is the period shorter or longer?';
    }
  }
}

function checkRelation() {
  const item = waveCases[caseIndex];
  if (!relationSelect.value()) {
    feedback = 'Choose whether the period is shorter or longer than in the preceding waveform.';
    return;
  }
  feedback = relationSelect.value() === item.relation
    ? `Correct: the new period is ${item.relation.toLowerCase()} because T and f are inversely related.`
    : `The period is ${item.relation.toLowerCase()}; T and f are inversely related.`;
  relationSelect.hide();
  relationButton.hide();
  relationPending = false;
  nextButton.html(caseIndex === waveCases.length - 1 ? 'Open exploration' : 'Next waveform');
  nextButton.show();
}

function nextWaveCase() {
  if (caseIndex < waveCases.length - 1) {
    caseIndex += 1;
    attempts = [0, 0];
    resolved = [false, false];
    periodInput.value('');
    rmsInput.value('');
    relationSelect.selected('');
    relationPending = false;
    feedback = 'Calculate period and RMS voltage before the waveform measurements are revealed.';
    submitButton.show();
    nextButton.hide();
  } else {
    enterWaveExploration();
  }
}

function enterWaveExploration() {
  exploring = true;
  periodInput.hide();
  rmsInput.hide();
  submitButton.hide();
  nextButton.hide();
  relationSelect.hide();
  relationButton.hide();
  frequencySlider.show();
  peakSlider.show();
  phaseSlider.show();
  markerSlider.show();
  modeSelect.show();
  feedback = 'Move the time marker to inspect v(t), or compare the sine wave with constant DC.';
  positionControls();
}

function hideExploreExplanation() {
  feedback = modeSelect.value() === 'Constant DC'
    ? 'Constant DC does not reverse direction; its RMS magnitude equals its constant magnitude.'
    : 'The ideal sine-wave measurements update from T = 1/f and VRMS = Vpeak/√2.';
}

function positionControls() {
  if (!exploring) {
    periodInput.position(160, drawHeight + 5);
    periodInput.size(120, 24);
    rmsInput.position(160, drawHeight + 40);
    rmsInput.size(120, 24);
    submitButton.position(18, drawHeight + 76);
    nextButton.position(18, drawHeight + 76);
    relationSelect.position(18, drawHeight + 110);
    relationSelect.size(190, 30);
    relationButton.position(220, drawHeight + 110);
  } else {
    const sliderWidth = max(120, canvasWidth - sliderLeftMargin - margin);
    const controls = [frequencySlider, peakSlider, phaseSlider, markerSlider];
    controls.forEach((control, i) => {
      control.position(sliderLeftMargin, drawHeight + 5 + i * 35);
      control.size(sliderWidth);
    });
    modeSelect.position(sliderLeftMargin, drawHeight + 145);
  }
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
