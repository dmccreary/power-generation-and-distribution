// AC Power Triangle and Power Factor Calculator — P, Q, S, PF, φ, and leading/lagging direction
// CANVAS_HEIGHT: 580
// Layout: drawHeight 450 + three control rows (2 sliders × 35 + select/buttons row + 10) = 580.
// Sliders and readouts work immediately. "Quiz me" hides S, PF, φ, and direction
// for the current slider setting and asks the learner to predict them first.

let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 190;
let defaultTextSize = 16;

const presets = [
  { name: 'Example loads…' },
  { name: 'Inductive: 8 kW, +6 kvar (chapter)', p: 8, q: 6 },
  { name: 'Capacitive: 8 kW, −6 kvar', p: 8, q: -6 },
  { name: 'Unity: 12 kW, 0 kvar', p: 12, q: 0 },
  { name: 'Motor: 15 kW, +8 kvar', p: 15, q: 8 }
];

let pSlider;
let qSlider;
let presetSelect;
let quizButton;
let checkButton;
let doneButton;
let sInput;
let pfInput;
let phiInput;
let dirSelect;

let mode = 'explore';   // 'explore' | 'quiz' | 'revealed'
let attempts = [0, 0, 0, 0];
let resolved = [false, false, false, false];
let correctCount = 0;
let quizCount = 0;
let feedback = 'Drag the sliders. The triangle, power factor, and direction update immediately.';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  pSlider = createSlider(1, 20, 8, 0.5);
  qSlider = createSlider(-15, 15, 6, 0.5);
  presetSelect = createSelect();
  presets.forEach((p, i) => presetSelect.option(p.name, i));
  quizButton = createButton('Quiz me');
  checkButton = createButton('Check');
  doneButton = createButton('Back to exploring');
  sInput = createInput('', 'number');
  pfInput = createInput('', 'number');
  phiInput = createInput('', 'number');
  dirSelect = createSelect();
  ['Choose…', 'Lagging', 'Leading', 'Unity'].forEach(o => dirSelect.option(o));
  [pSlider, qSlider, presetSelect, quizButton, checkButton, doneButton, sInput, pfInput, phiInput, dirSelect]
    .forEach(c => c.parent(document.querySelector('main')));

  [pSlider, qSlider].forEach(s => s.input(slidersChanged));
  presetSelect.changed(applyPreset);
  quizButton.mousePressed(startQuiz);
  checkButton.mousePressed(checkAnswers);
  doneButton.mousePressed(backToExploring);
  sInput.attribute('step', '0.01');
  sInput.attribute('aria-label', 'Predicted apparent power in kilovolt-amperes');
  pfInput.attribute('step', '0.001');
  pfInput.attribute('aria-label', 'Predicted power factor');
  phiInput.attribute('step', '0.1');
  phiInput.attribute('aria-label', 'Predicted phase angle in degrees');

  updateControlVisibility();
  positionControls();
  describe('A power triangle with real power P along the horizontal leg, reactive power Q along the vertical leg, and apparent power S as the hypotenuse, with sliders for P and Q, and readouts for power factor and leading or lagging direction.', LABEL);
}

function loadState() {
  const p = Number(pSlider.value());
  const q = Number(qSlider.value());
  const s = sqrt(p * p + q * q);
  const pf = p / s;
  const phi = degrees(atan2(q, p));
  const dir = abs(q) < 0.05 ? 'Unity' : (q > 0 ? 'Lagging' : 'Leading');
  return { p, q, s, pf, phi, dir };
}

function draw() {
  updateCanvasSize();
  drawRegions();
  drawTitle();
  const m = loadState();
  drawTriangle(m);
  drawReadout(m);
  if (mode === 'quiz') drawQuizPanel(m); else drawShareBar(m);
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
  text('AC Power Triangle and Power Factor', canvasWidth / 2, 8);
  textSize(14);
  text(mode === 'quiz' ? 'Predict before the results are revealed' : 'Illustrative AC load: S² = P² + Q²', canvasWidth / 2, 38);
}

function hidden() { return mode === 'quiz'; }

// ----- power triangle (left part of the top section) -----
function drawTriangle(m) {
  const areaX = 20;
  const areaW = canvasWidth * 0.5 - 30;
  const originX = areaX + 20;
  const originY = 160;
  const s = min(8, (areaW - 45) / m.p, 68 / max(abs(m.q), 1));

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(areaX, 62, areaW + 20, 190, 8);

  const px = originX + m.p * s;
  const py = originY - m.q * s;

  stroke('lightgray');
  line(originX - 6, originY, originX + areaW - 40, originY);

  stroke('seagreen');
  strokeWeight(3);
  line(originX, originY, px, originY);
  stroke(m.q >= 0 ? 'darkorange' : 'purple');
  line(px, originY, px, py);
  if (!hidden()) {
    stroke('midnightblue');
    line(originX, originY, px, py);
    noFill();
    strokeWeight(1.5);
    const arcR = 28;
    arc(originX, originY, arcR * 2, arcR * 2, m.q >= 0 ? -radians(m.phi) : 0, m.q >= 0 ? 0 : -radians(m.phi));
    noStroke();
    fill('midnightblue');
    textSize(12);
    textAlign(LEFT, CENTER);
    text('φ', originX + arcR + 3, originY - (m.q >= 0 ? 8 : -8));
    textAlign(CENTER, CENTER);
    text('S', (originX + px) / 2 - 9 * (m.q >= 0 ? 1 : -1), (originY + py) / 2 - 9);
  }

  noStroke();
  textSize(12);
  fill('seagreen');
  textAlign(CENTER, TOP);
  text(`P = ${m.p.toFixed(1)} kW`, originX + m.p * s / 2, originY + (m.q >= 0 ? 4 : -16));
  fill(m.q >= 0 ? 'darkorange' : 'purple');
  textAlign(LEFT, CENTER);
  text(`Q = ${m.q.toFixed(1)}`, min(px + 4, areaX + areaW - 26), (originY + py) / 2);
  fill('dimgray');
  textSize(11);
  textAlign(LEFT, BOTTOM);
  text('Power triangle (auto-scaled)', areaX + 6, 78);
}

// ----- numeric readout (right part of the top section) -----
function drawReadout(m) {
  const x0 = canvasWidth * 0.5 + 8;
  const w = canvasWidth - x0 - 14;
  fill('white');
  stroke('silver');
  rect(x0 - 8, 62, w + 14, 190, 8);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  const lines = [
    [`P = ${m.p.toFixed(1)} kW  (real)`, 'seagreen'],
    [`Q = ${m.q.toFixed(1)} kvar  (reactive)`, m.q >= 0 ? 'darkorange' : 'purple']
  ];
  if (hidden()) {
    lines.push(['S = ?', 'gray'], ['PF = ?', 'gray'], ['φ = ?', 'gray'], ['Direction: ?', 'gray']);
  } else {
    lines.push(
      [`S = √(P²+Q²) = ${m.s.toFixed(2)} kVA`, 'midnightblue'],
      [`PF = P/S = ${m.pf.toFixed(3)}`, 'midnightblue'],
      [`φ = atan(Q/P) = ${m.phi.toFixed(1)}°`, 'midnightblue'],
      [m.dir === 'Unity' ? 'Unity: current in phase' : `${m.dir}: current ${m.dir === 'Lagging' ? 'lags' : 'leads'} voltage`, 'black']
    );
  }
  lines.forEach((l, i) => {
    fill(l[1]);
    text(l[0], x0, 72 + i * 28, w);
  });
}

// ----- how much of S is real power -----
function drawShareBar(m) {
  const top = 262;
  fill('white');
  stroke('silver');
  rect(20, top, canvasWidth - 40, 138, 8);
  const bx = 36;
  const bw = canvasWidth - 72;
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(13);
  text('Share of apparent power that is real power (PF)', bx, top + 10);
  stroke('silver');
  fill('whitesmoke');
  rect(bx, top + 32, bw, 24, 4);
  noStroke();
  fill('seagreen');
  rect(bx, top + 32, bw * m.pf, 24, 4);
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(13);
  text(`${(m.pf * 100).toFixed(1)}% of ${m.s.toFixed(2)} kVA is real: ${m.p.toFixed(1)} kW`, bx + 6, top + 44);

  textAlign(LEFT, TOP);
  textSize(12);
  fill('dimgray');
  const note = m.dir === 'Unity'
    ? 'Q = 0, so S = P and PF = 1.000.'
    : `Same S and PF for +Q and −Q: only the sign of Q (${m.dir.toLowerCase()}) tells direction.`;
  text(note, bx, top + 68, bw);
  const current = m.dir === 'Unity' ? '' : 'PF alone never tells leading from lagging, and 0.8 PF is not 80% efficiency.';
  text(current, bx, top + 98, bw);
}

function drawQuizPanel(m) {
  const top = 262;
  fill('white');
  stroke('silver');
  rect(20, top, canvasWidth - 40, 138, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(13);
  text(`Given: P = ${m.p.toFixed(1)} kW, Q = ${m.q.toFixed(1)} kvar`, 32, top + 18);
  textSize(14);
  const c2 = canvasWidth / 2 + 4;
  text('S (kVA):', 32, top + 52);
  text('φ (°):', c2, top + 52);
  text('PF:', 32, top + 84);
  text('Direction:', c2, top + 84);
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
  text(`Real P: ${Number(pSlider.value()).toFixed(1)} kW`, 18, drawHeight + 22);
  text(`Reactive Q: ${Number(qSlider.value()).toFixed(1)} kvar`, 18, drawHeight + 57);
  if (quizCount > 0) {
    textAlign(RIGHT, CENTER);
    textSize(13);
    text(`Quiz: ${correctCount} of ${quizCount * 4} correct`, canvasWidth - margin, drawHeight + 118);
  }
}

// ----- behavior -----
function slidersChanged() {
  presetSelect.selected('0');
  if (mode === 'explore') feedback = 'Q > 0: inductive, lagging. Q < 0: capacitive, leading. S is always positive.';
  if (mode === 'revealed') backToExploring();
}

function applyPreset() {
  const p = presets[Number(presetSelect.value())];
  if (p.p === undefined) return;
  pSlider.value(p.p);
  qSlider.value(p.q);
  if (mode !== 'explore') backToExploring();
  feedback = `Loaded: ${p.name}.`;
}

function startQuiz() {
  mode = 'quiz';
  attempts = [0, 0, 0, 0];
  resolved = [false, false, false, false];
  quizCount += 1;
  [sInput, pfInput, phiInput].forEach(i => i.value(''));
  dirSelect.selected('Choose…');
  feedback = 'Find S from P and Q, then PF, φ, and direction. Controls are locked.';
  updateControlVisibility();
}

function checkAnswers() {
  const m = loadState();
  const expected = [m.s, m.pf, m.phi, m.dir];
  const raw = [sInput.value(), pfInput.value(), phiInput.value(), dirSelect.value()];
  const tol = [0.01, 0.001, 0.1];
  const names = ['S', 'PF', 'φ', 'Direction'];
  const labels = [`S = ${m.s.toFixed(2)} kVA`, `PF = ${m.pf.toFixed(3)}`, `φ = ${m.phi.toFixed(1)}°`, `Direction: ${m.dir}`];
  const hints = [
    'S = √(P² + Q²), the hypotenuse.',
    'PF = P/S, always between 0 and 1.',
    'φ = atan2(Q, P); the sign of Q sets the sign of φ.',
    'Q > 0 is lagging, Q < 0 is leading, Q = 0 is unity.'
  ];
  const messages = [];
  for (let i = 0; i < 4; i += 1) {
    if (resolved[i]) continue;
    const missing = i < 3 ? (raw[i] === '' || Number.isNaN(Number(raw[i]))) : raw[i] === 'Choose…';
    if (missing) { messages.push(`Answer ${names[i]}.`); continue; }
    attempts[i] += 1;
    const ok = i < 3 ? abs(Number(raw[i]) - expected[i]) <= tol[i] : raw[i] === expected[i];
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
  feedback = 'Drag the sliders. The triangle, power factor, and direction update immediately.';
  updateControlVisibility();
}

function updateControlVisibility() {
  const quiz = mode === 'quiz';
  [pSlider, qSlider, presetSelect].forEach(c => {
    if (quiz) c.attribute('disabled', ''); else c.removeAttribute('disabled');
  });
  if (quiz) {
    checkButton.show(); sInput.show(); pfInput.show(); phiInput.show(); dirSelect.show();
    quizButton.hide(); doneButton.hide();
  } else {
    checkButton.hide(); sInput.hide(); pfInput.hide(); phiInput.hide(); dirSelect.hide();
    quizButton.show(); doneButton.hide();
  }
  if (mode === 'revealed') doneButton.show();
}

function positionControls() {
  const sliderWidth = max(120, canvasWidth - sliderLeftMargin - margin);
  [pSlider, qSlider].forEach((s, i) => {
    s.position(sliderLeftMargin, drawHeight + 10 + i * 35);
    s.size(sliderWidth);
  });
  presetSelect.position(margin - 7, drawHeight + 82);
  quizButton.position(sliderLeftMargin + 60, drawHeight + 82);
  doneButton.position(sliderLeftMargin + 60, drawHeight + 82);

  const c2 = canvasWidth / 2 + 4;
  sInput.position(100, 262 + 40);
  sInput.size(70, 22);
  phiInput.position(c2 + 62, 262 + 40);
  phiInput.size(70, 22);
  pfInput.position(100, 262 + 72);
  pfInput.size(70, 22);
  dirSelect.position(c2 + 78, 262 + 72);
  checkButton.position(100, 262 + 102);
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
