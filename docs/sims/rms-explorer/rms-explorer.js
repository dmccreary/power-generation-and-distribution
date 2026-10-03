// RMS Explorer — amplitude, frequency, and phase vs. the RMS value of a sine wave
// CANVAS_HEIGHT: 640
// Layout: drawHeight 490 + four control rows (4 × 35 + 10) = 640.

let canvasWidth = 400;
let drawHeight = 490;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 200;
let defaultTextSize = 16;

const WINDOW_MS = 100;       // fixed time window; frequencies in 10 Hz steps always show whole cycles
const V_AXIS_MAX = 400;      // fixed voltage axis so amplitude changes are visible
const V2_AXIS_MAX = 160000;  // V_AXIS_MAX squared

let ampSlider;
let freqSlider;
let phaseSlider;
let squareCheckbox;
let lastChanged = '';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  ampSlider = createSlider(10, 400, 170, 10);
  freqSlider = createSlider(10, 120, 60, 10);
  phaseSlider = createSlider(0, 360, 0, 15);
  squareCheckbox = createCheckbox(' Shade the area under the squared wave v²(t)', false);
  [ampSlider, freqSlider, phaseSlider, squareCheckbox].forEach(control => control.parent(document.querySelector('main')));
  ampSlider.input(() => { lastChanged = 'amplitude'; });
  freqSlider.input(() => { lastChanged = 'frequency'; });
  phaseSlider.input(() => { lastChanged = 'phase'; });

  positionControls();
  describe('Two stacked plots of a sine wave and its square, with sliders for amplitude, frequency, and phase. The RMS value depends only on amplitude.', LABEL);
}

function draw() {
  updateCanvasSize();
  drawRegions();
  const amp = ampSlider.value();
  const freq = freqSlider.value();
  const phaseRad = radians(phaseSlider.value());
  const vrms = amp / sqrt(2);

  drawHeader(amp, freq);
  const top = { y: 74, h: 128 };
  const bottom = { y: 250, h: 128 };
  drawVoltagePlot(top, amp, freq, phaseRad, vrms);
  drawSquaredPlot(bottom, amp, freq, phaseRad, vrms);
  drawReadout(amp, vrms);
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

function drawHeader(amp, freq) {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  text('RMS Explorer', canvasWidth / 2, 8);
  textSize(15);
  text(`v(t) = ${amp} sin(2π · ${freq} · t + φ)`, canvasWidth / 2, 38);
}

function plotLeft() { return 75; }
function plotRight() { return canvasWidth - 20; }
function timeToX(ms) { return map(ms, 0, WINDOW_MS, plotLeft(), plotRight()); }

function waveAt(ms, amp, freq, phaseRad) {
  return amp * sin(TWO_PI * freq * ms / 1000 + phaseRad);
}

function drawPlotFrame(p, title, ticks, axisLabel) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(plotLeft(), p.y, plotRight() - plotLeft(), p.h);
  fill('black');
  noStroke();
  textAlign(LEFT, BOTTOM);
  textSize(13);
  text(title, plotLeft(), p.y - 2);
  textAlign(RIGHT, CENTER);
  textSize(11);
  ticks.forEach(t => {
    fill('dimgray');
    text(t.label, plotLeft() - 5, t.y);
    stroke('gainsboro');
    line(plotLeft(), t.y, plotRight(), t.y);
    noStroke();
  });
  push();
  translate(14, p.y + p.h / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  fill('dimgray');
  text(axisLabel, 0, 0);
  pop();
}

function drawVoltagePlot(p, amp, freq, phaseRad, vrms) {
  const mid = p.y + p.h / 2;
  const vToY = v => mid - v / V_AXIS_MAX * (p.h / 2 - 4);
  drawPlotFrame(p, 'Voltage v(t)', [
    { label: '+400', y: vToY(400) }, { label: '0', y: vToY(0) }, { label: '−400', y: vToY(-400) }
  ], 'volts');

  // RMS band
  stroke('seagreen');
  strokeWeight(1.5);
  drawingContext.setLineDash([6, 4]);
  line(plotLeft(), vToY(vrms), plotRight(), vToY(vrms));
  line(plotLeft(), vToY(-vrms), plotRight(), vToY(-vrms));
  drawingContext.setLineDash([]);
  noStroke();
  fill('seagreen');
  textAlign(RIGHT, BOTTOM);
  textSize(12);
  text(`dashed: ±V_RMS = ${vrms.toFixed(1)} V`, plotRight(), p.y - 2);

  noFill();
  stroke('steelblue');
  strokeWeight(3);
  beginShape();
  for (let x = plotLeft(); x <= plotRight(); x += 2) {
    const ms = map(x, plotLeft(), plotRight(), 0, WINDOW_MS);
    vertex(x, vToY(waveAt(ms, amp, freq, phaseRad)));
  }
  endShape();
}

function drawSquaredPlot(p, amp, freq, phaseRad, vrms) {
  const base = p.y + p.h - 4;
  const v2ToY = v2 => base - v2 / V2_AXIS_MAX * (p.h - 8);
  drawPlotFrame(p, 'Squared v²(t), always positive', [
    { label: '160,000', y: v2ToY(160000) }, { label: '80,000', y: v2ToY(80000) }, { label: '0', y: v2ToY(0) }
  ], 'volts²');

  const shade = squareCheckbox.checked();
  if (shade) {
    fill(255, 140, 0, 110);
    noStroke();
    beginShape();
    vertex(plotLeft(), base);
    for (let x = plotLeft(); x <= plotRight(); x += 2) {
      const ms = map(x, plotLeft(), plotRight(), 0, WINDOW_MS);
      const v = waveAt(ms, amp, freq, phaseRad);
      vertex(x, v2ToY(v * v));
    }
    vertex(plotRight(), base);
    endShape(CLOSE);
  }

  noFill();
  stroke('darkorange');
  strokeWeight(2.5);
  beginShape();
  for (let x = plotLeft(); x <= plotRight(); x += 2) {
    const ms = map(x, plotLeft(), plotRight(), 0, WINDOW_MS);
    const v = waveAt(ms, amp, freq, phaseRad);
    vertex(x, v2ToY(v * v));
  }
  endShape();

  if (shade) {
    const meanV2 = vrms * vrms;
    stroke('seagreen');
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);
    line(plotLeft(), v2ToY(meanV2), plotRight(), v2ToY(meanV2));
    drawingContext.setLineDash([]);
    noStroke();
    fill('seagreen');
    textAlign(RIGHT, BOTTOM);
    textSize(12);
    text(`dashed: mean of v² = ${nfc(meanV2, 0)} V²`, plotRight(), p.y - 2);
  }

  fill('dimgray');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text(`time (0 to ${WINDOW_MS} ms)`, (plotLeft() + plotRight()) / 2, p.y + p.h + 2);
}

function drawReadout(amp, vrms) {
  const y0 = 400;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(margin, y0, canvasWidth - 2 * margin, 76, 6);

  noStroke();
  fill('seagreen');
  textAlign(LEFT, TOP);
  textSize(16);
  text(`V_RMS = √(mean of v²) = A/√2 = ${amp} / 1.414 = ${vrms.toFixed(1)} V`, margin + 10, y0 + 6);

  const rows = [
    ['amplitude', 'Amplitude: CHANGES RMS (V_RMS grows with A; power with A²)'],
    ['frequency', 'Frequency: NO effect on RMS (same average of v²)'],
    ['phase', 'Phase: NO effect on RMS (wave just slides over)']
  ];
  textSize(13);
  rows.forEach((r, i) => {
    const ry = y0 + 28 + i * 16;
    if (lastChanged === r[0]) {
      fill(255, 245, 157);
      rect(margin + 6, ry - 1, canvasWidth - 2 * margin - 12, 16, 3);
    }
    fill(r[0] === 'amplitude' ? 'firebrick' : 'black');
    text(r[1], margin + 10, ry);
  });
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  const rows = [
    [`Amplitude A: ${ampSlider.value()} V`, 0],
    [`Frequency f: ${freqSlider.value()} Hz`, 1],
    [`Phase φ: ${phaseSlider.value()}°`, 2]
  ];
  rows.forEach(r => text(r[0], margin, drawHeight + 22 + r[1] * 35));
}

function positionControls() {
  const sliderWidth = max(80, canvasWidth - sliderLeftMargin - margin);
  [ampSlider, freqSlider, phaseSlider].forEach((s, i) => {
    s.position(sliderLeftMargin, drawHeight + 10 + i * 35);
    s.size(sliderWidth);
  });
  squareCheckbox.position(margin, drawHeight + 10 + 3 * 35);
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
