// AC Impedance and Phase Explorer — series R, XL, XC, impedance triangle, and voltage/current timing
// CANVAS_HEIGHT: 645
// Layout: drawHeight 450 + five control rows (4 sliders × 35 + select/buttons row + 15) = 645.
// Sliders and readouts work immediately. "Quiz me" hides |Z|, φ, I, and the timing
// for the current slider setting and asks the learner to predict them first.

let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 195;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 200;
let defaultTextSize = 16;

const FREQ_HZ = 60;
const presets = [
  { name: 'Example circuits…' },
  { name: 'Chapter example: R 20, XL 37.7, XC 26.5', r: 20, xl: 37.7, xc: 26.5, v: 120 },
  { name: 'Net capacitive: R 20, XL 10, XC 25', r: 20, xl: 10, xc: 25, v: 120 },
  { name: 'Resonant: R 20, XL 20, XC 20', r: 20, xl: 20, xc: 20, v: 120 },
  { name: 'Resistive heater: R 24, no reactance', r: 24, xl: 0, xc: 0, v: 120 }
];

let rSlider;
let xlSlider;
let xcSlider;
let vSlider;
let presetSelect;
let quizButton;
let checkButton;
let doneButton;
let zInput;
let phiInput;
let timingSelect;

let mode = 'explore';   // 'explore' | 'quiz' | 'revealed'
let attempts = [0, 0, 0];
let resolved = [false, false, false];
let correctCount = 0;
let quizCount = 0;
let feedback = 'Drag the sliders. Impedance, angle, and timing update immediately.';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  rSlider = createSlider(5, 50, 20, 0.5);
  xlSlider = createSlider(0, 50, 37.7, 0.1);
  xcSlider = createSlider(0, 50, 26.5, 0.1);
  vSlider = createSlider(24, 240, 120, 12);
  presetSelect = createSelect();
  presets.forEach((p, i) => presetSelect.option(p.name, i));
  quizButton = createButton('Quiz me');
  checkButton = createButton('Check');
  doneButton = createButton('Back to exploring');
  zInput = createInput('', 'number');
  phiInput = createInput('', 'number');
  timingSelect = createSelect();
  ['Choose…', 'Lagging', 'Leading', 'In phase'].forEach(o => timingSelect.option(o));
  [rSlider, xlSlider, xcSlider, vSlider, presetSelect, quizButton, checkButton, doneButton, zInput, phiInput, timingSelect]
    .forEach(c => c.parent(document.querySelector('main')));

  [rSlider, xlSlider, xcSlider, vSlider].forEach(s => s.input(slidersChanged));
  presetSelect.changed(applyPreset);
  quizButton.mousePressed(startQuiz);
  checkButton.mousePressed(checkAnswers);
  doneButton.mousePressed(backToExploring);
  zInput.attribute('step', '0.1');
  zInput.attribute('aria-label', 'Predicted impedance magnitude in ohms');
  phiInput.attribute('step', '0.1');
  phiInput.attribute('aria-label', 'Predicted phase angle in degrees');

  updateControlVisibility();
  positionControls();
  describe('An impedance triangle built from resistance and net reactance, with voltage and current waveforms showing whether current leads or lags voltage, controlled by sliders for R, XL, XC, and source voltage.', LABEL);
}

function circuitState() {
  const r = Number(rSlider.value());
  const xl = Number(xlSlider.value());
  const xc = Number(xcSlider.value());
  const v = Number(vSlider.value());
  const x = xl - xc;
  const z = sqrt(r * r + x * x);
  const phi = degrees(atan2(x, r));
  const i = v / z;
  const timing = abs(x) < 0.05 ? 'In phase' : (x > 0 ? 'Lagging' : 'Leading');
  return { r, xl, xc, v, x, z, phi, i, timing };
}

function draw() {
  updateCanvasSize();
  drawRegions();
  drawTitle();
  const m = circuitState();
  drawTriangle(m);
  drawReadout(m);
  if (mode === 'quiz') drawQuizPanel(m); else drawWaveforms(m);
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
  textSize(24);
  text('AC Impedance and Phase Explorer', canvasWidth / 2, 8);
  textSize(14);
  text(mode === 'quiz' ? 'Predict before the results are revealed' : `Ideal series AC model at ${FREQ_HZ} Hz`, canvasWidth / 2, 38);
}

function hidden() { return mode === 'quiz'; }

// ----- impedance triangle (left half of the top section) -----
function drawTriangle(m) {
  const areaX = 20;
  const areaW = canvasWidth * 0.5 - 30;
  const originX = areaX + 28;
  const originY = 160;   // R axis; positive X goes up, negative X goes down
  const s = min(4, (areaW - 50) / max(m.r, 1), 68 / max(abs(m.x), 1));

  fill('white');
  stroke('silver');
  rect(areaX, 62, areaW + 20, 190, 8);

  const px = originX + m.r * s;
  const py = originY - m.x * s;

  // baseline for the resistance axis
  stroke('lightgray');
  strokeWeight(1);
  line(originX - 6, originY, originX + (areaW - 40), originY);

  // resistance leg
  stroke('seagreen');
  strokeWeight(3);
  line(originX, originY, px, originY);
  // reactance leg
  stroke(m.x >= 0 ? 'darkorange' : 'purple');
  line(px, originY, px, py);
  // impedance hypotenuse
  if (!hidden()) {
    stroke('midnightblue');
    line(originX, originY, px, py);
    noFill();
    stroke('midnightblue');
    strokeWeight(1.5);
    const arcR = 26;
    arc(originX, originY, arcR * 2, arcR * 2, m.x >= 0 ? -radians(m.phi) : 0, m.x >= 0 ? 0 : -radians(m.phi));
    noStroke();
    fill('midnightblue');
    textSize(12);
    textAlign(LEFT, CENTER);
    text('φ', originX + arcR + 3, originY - (m.x >= 0 ? 8 : -8));
  }

  noStroke();
  textSize(12);
  fill('seagreen');
  textAlign(CENTER, TOP);
  text(`R = ${m.r.toFixed(1)}`, originX + m.r * s / 2, originY + (m.x >= 0 ? 4 : -16));
  fill(m.x >= 0 ? 'darkorange' : 'purple');
  textAlign(LEFT, CENTER);
  text(`X = ${m.x.toFixed(1)}`, min(px + 4, areaX + areaW - 40), (originY + py) / 2);
  if (!hidden()) {
    fill('midnightblue');
    textAlign(CENTER, CENTER);
    text('|Z|', (originX + px) / 2 - 8 * (m.x >= 0 ? 1 : -1), (originY + py) / 2 - 8);
  }
  fill('dimgray');
  textSize(11);
  textAlign(LEFT, BOTTOM);
  text('Impedance triangle (auto-scaled)', areaX + 6, 78);
}

// ----- numeric readout (right half of the top section) -----
function drawReadout(m) {
  const x0 = canvasWidth * 0.5 + 8;
  const w = canvasWidth - x0 - 14;
  fill('white');
  stroke('silver');
  rect(x0 - 8, 62, w + 14, 190, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(13);
  const lines = [
    [`XL = 2π(${FREQ_HZ})L = ${m.xl.toFixed(1)} Ω`, 'black'],
    [`XC = 1/(2π${FREQ_HZ}C) = ${m.xc.toFixed(1)} Ω`, 'black'],
    [`X = XL − XC = ${m.x.toFixed(1)} Ω`, m.x >= 0 ? 'darkorange' : 'purple']
  ];
  if (hidden()) {
    lines.push(['|Z| = ?', 'gray'], ['φ = ?', 'gray'], ['I = ?', 'gray']);
  } else {
    lines.push(
      [`|Z| = √(R²+X²) = ${m.z.toFixed(1)} Ω`, 'midnightblue'],
      [`φ = atan(X/R) = ${m.phi.toFixed(1)}°`, 'midnightblue'],
      [`I = V/|Z| = ${m.v}/${m.z.toFixed(1)} = ${m.i.toFixed(2)} A`, 'black']
    );
  }
  lines.forEach((l, i) => {
    fill(l[1]);
    text(l[0], x0, 72 + i * 26, w);
  });
  fill('dimgray');
  textSize(11);
  text(hidden() ? '' : `Net ${m.timing === 'Lagging' ? 'inductive' : m.timing === 'Leading' ? 'capacitive' : 'resistive'}`, x0, 72 + 6 * 26 + 2);
}

// ----- voltage/current waveforms -----
function drawWaveforms(m) {
  const top = 262;
  const h = 130;
  const left = 40;
  const right = canvasWidth - 20;
  const mid = top + h / 2 + 6;
  const amp = h / 2 - 20;

  fill('white');
  stroke('silver');
  rect(20, top, canvasWidth - 40, h + 8, 8);
  stroke('lightgray');
  line(left, mid, right, mid);

  const phiRad = radians(m.phi);
  noFill();
  strokeWeight(2.5);
  stroke('steelblue');
  beginShape();
  for (let x = left; x <= right; x += 2) {
    const th = map(x, left, right, 0, TWO_PI * 2);
    vertex(x, mid - amp * sin(th));
  }
  endShape();
  stroke('firebrick');
  beginShape();
  for (let x = left; x <= right; x += 2) {
    const th = map(x, left, right, 0, TWO_PI * 2);
    vertex(x, mid - amp * sin(th - phiRad));
  }
  endShape();

  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  fill('steelblue');
  text('— voltage v(t)', left, top + 4);
  fill('firebrick');
  text('— current i(t)', left + 100, top + 4);
  fill('black');
  textAlign(RIGHT, TOP);
  const ms = abs(m.phi) / 360 * 1000 / FREQ_HZ;
  const msg = m.timing === 'In phase' ? 'Current is in phase with voltage'
    : `Current ${m.timing === 'Lagging' ? 'lags' : 'leads'} voltage by ${abs(m.phi).toFixed(1)}° (${ms.toFixed(2)} ms)`;
  text(msg, right, top + 4);
  fill('dimgray');
  textSize(10);
  textAlign(CENTER, BOTTOM);
  text('two cycles; both curves drawn at the same height so timing is easy to compare', canvasWidth / 2, top + h + 5);
}

// ----- quiz panel replaces the waveform region -----
function drawQuizPanel(m) {
  const top = 262;
  fill('white');
  stroke('silver');
  rect(20, top, canvasWidth - 40, 138, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(13);
  text(`Given: R = ${m.r.toFixed(1)} Ω, XL = ${m.xl.toFixed(1)} Ω, XC = ${m.xc.toFixed(1)} Ω, V = ${m.v} V`, 32, top + 18);
  textSize(15);
  text('|Z| (Ω):', 32, top + 52);
  text('φ (°):', 32, top + 84);
  text('Current is:', 32, top + 116);
}

function drawFeedback() {
  fill(feedback.startsWith('Correct') ? 'darkgreen' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text(feedback, 25, 402, canvasWidth - 50, 46);
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text(`R: ${Number(rSlider.value()).toFixed(1)} Ω`, 18, drawHeight + 22);
  text(`XL: ${Number(xlSlider.value()).toFixed(1)} Ω`, 18, drawHeight + 57);
  text(`XC: ${Number(xcSlider.value()).toFixed(1)} Ω`, 18, drawHeight + 92);
  text(`Source V: ${vSlider.value()} V`, 18, drawHeight + 127);
  if (quizCount > 0) {
    textAlign(RIGHT, CENTER);
    textSize(13);
    text(`Quiz: ${correctCount} of ${quizCount * 3} correct`, canvasWidth - margin, drawHeight + 183);
  }
}

// ----- behavior -----
function slidersChanged() {
  presetSelect.selected('0');
  if (mode === 'explore') feedback = 'X = XL − XC. Positive X: current lags. Negative X: current leads.';
  if (mode === 'revealed') backToExploring();
}

function applyPreset() {
  const p = presets[Number(presetSelect.value())];
  if (p.r === undefined) return;
  rSlider.value(p.r);
  xlSlider.value(p.xl);
  xcSlider.value(p.xc);
  vSlider.value(p.v);
  if (mode !== 'explore') backToExploring();
  feedback = `Loaded: ${p.name}.`;
}

function startQuiz() {
  mode = 'quiz';
  attempts = [0, 0, 0];
  resolved = [false, false, false];
  quizCount += 1;
  zInput.value('');
  phiInput.value('');
  timingSelect.selected('Choose…');
  feedback = 'Find X = XL − XC, then |Z| and φ, then decide whether current leads or lags. Controls are locked.';
  updateControlVisibility();
}

function checkAnswers() {
  const m = circuitState();
  const expected = [m.z, m.phi, m.timing];
  const raw = [zInput.value(), phiInput.value(), timingSelect.value()];
  const names = ['|Z|', 'φ', 'Timing'];
  const labels = [`|Z| = ${m.z.toFixed(1)} Ω`, `φ = ${m.phi.toFixed(1)}°`, `Current is ${m.timing.toLowerCase()}`];
  const hints = [
    'Combine R and X as √(R² + X²), not R + X.',
    'φ = atan2(X, R); the sign of X sets the sign of φ.',
    'Positive X: lagging. Negative X: leading. Zero: in phase.'
  ];
  const messages = [];
  for (let i = 0; i < 3; i += 1) {
    if (resolved[i]) continue;
    const missing = i < 2 ? (raw[i] === '' || Number.isNaN(Number(raw[i]))) : raw[i] === 'Choose…';
    if (missing) { messages.push(`Answer ${names[i]}.`); continue; }
    attempts[i] += 1;
    const ok = i < 2 ? abs(Number(raw[i]) - expected[i]) <= 0.1 : raw[i] === expected[i];
    if (ok) {
      resolved[i] = true;
      correctCount += 1;
      messages.push(`Correct: ${labels[i]}.`);
    } else if (attempts[i] >= 2) {
      resolved[i] = true;
      messages.push(`${labels[i]}. ${hints[i]}`);
    } else {
      messages.push(`${names[i]} needs another try. ${hints[i]}`);
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
  feedback = 'Drag the sliders. Impedance, angle, and timing update immediately.';
  updateControlVisibility();
}

function updateControlVisibility() {
  const quiz = mode === 'quiz';
  [rSlider, xlSlider, xcSlider, vSlider, presetSelect].forEach(c => {
    if (quiz) c.attribute('disabled', ''); else c.removeAttribute('disabled');
  });
  if (quiz) {
    checkButton.show(); zInput.show(); phiInput.show(); timingSelect.show();
    quizButton.hide(); doneButton.hide();
  } else {
    checkButton.hide(); zInput.hide(); phiInput.hide(); timingSelect.hide();
    quizButton.show(); doneButton.hide();
  }
  if (mode === 'revealed') doneButton.show();
}

function positionControls() {
  const sliderWidth = max(120, canvasWidth - sliderLeftMargin - margin);
  [rSlider, xlSlider, xcSlider, vSlider].forEach((s, i) => {
    s.position(sliderLeftMargin, drawHeight + 10 + i * 35);
    s.size(sliderWidth);
  });
  presetSelect.position(margin - 7, drawHeight + 150);
  quizButton.position(sliderLeftMargin + 60, drawHeight + 150);
  doneButton.position(sliderLeftMargin + 60, drawHeight + 150);
  zInput.position(130, 262 + 40);
  zInput.size(90, 22);
  phiInput.position(130, 262 + 72);
  phiInput.size(90, 22);
  timingSelect.position(130, 262 + 104);
  checkButton.position(250, 262 + 70);
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
