// Current and Magnetic Field Explorer — right-hand rule and field magnitude
// CANVAS_HEIGHT: 615
// Layout: drawHeight 460 + four control rows (4 × 35 + 15) = 615.

let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 155;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 230;
let defaultTextSize = 16;

const fieldCases = [
  { current: 5, direction: 'Out of page', distance: 1, circulation: 'Counterclockwise', magnitude: 100,
    reason: 'Right thumb points out of the page; curled fingers circulate counterclockwise.' },
  { current: 5, direction: 'Into page', distance: 1, circulation: 'Clockwise', magnitude: 100,
    reason: 'Reversing current reverses circulation but leaves magnitude unchanged.' },
  { current: 10, direction: 'Out of page', distance: 1, circulation: 'Counterclockwise', magnitude: 200,
    reason: 'Doubling current at fixed distance doubles field magnitude.' },
  { current: 5, direction: 'Out of page', distance: 2, circulation: 'Counterclockwise', magnitude: 50,
    reason: 'Doubling distance at fixed current halves field magnitude.' }
];

let caseIndex = 0;
let directionResolved = false;
let magnitudeResolved = false;
let magnitudeAttempts = 0;
let directionFirstScore = 0;
let magnitudeFirstScore = 0;
let feedback = 'Choose a circulation direction and calculate the field before revealing it.';
let directionSelect;
let magnitudeInput;
let submitButton;
let nextButton;
let currentSlider;
let distanceSlider;
let currentDirectionSelect;
let comparisonSelect;
let comparisonButton;
let exploring = false;
let previousExploreMagnitude = null;
let actualComparison = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  directionSelect = createSelect();
  directionSelect.parent(document.querySelector('main'));
  directionSelect.option('Choose direction', '');
  directionSelect.option('Clockwise');
  directionSelect.option('Counterclockwise');
  magnitudeInput = createInput('', 'number');
  magnitudeInput.parent(document.querySelector('main'));
  magnitudeInput.attribute('step', '0.1');
  magnitudeInput.attribute('aria-label', 'Predicted magnetic field magnitude in microteslas');
  submitButton = createButton('Check prediction');
  submitButton.parent(document.querySelector('main'));
  submitButton.mousePressed(checkFieldCase);
  nextButton = createButton('Next case');
  nextButton.parent(document.querySelector('main'));
  nextButton.mousePressed(nextFieldCase);
  nextButton.hide();

  currentSlider = createSlider(1, 10, 5, 1);
  distanceSlider = createSlider(1, 10, 1, 1);
  currentDirectionSelect = createSelect();
  currentDirectionSelect.option('Out of page');
  currentDirectionSelect.option('Into page');
  comparisonSelect = createSelect();
  comparisonSelect.option('Predict change', '');
  comparisonSelect.option('Increased');
  comparisonSelect.option('Decreased');
  comparisonSelect.option('Stayed the same');
  comparisonButton = createButton('Check');
  [currentSlider, distanceSlider, currentDirectionSelect, comparisonSelect, comparisonButton].forEach(control => {
    control.parent(document.querySelector('main'));
    control.hide();
  });
  currentSlider.input(exploreChanged);
  distanceSlider.input(exploreChanged);
  currentDirectionSelect.changed(exploreChanged);
  comparisonButton.mousePressed(checkComparison);

  positionControls();
  describe('An ideal long straight conductor activity for applying the right-hand grip rule and calculating magnetic field magnitude from current and distance.', LABEL);
}

function draw() {
  updateCanvasSize();
  drawRegions();
  const model = exploring ? exploreModel() : fieldCases[caseIndex];
  drawHeader(model);
  drawField(model);
  drawEquationPanel(model);
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

function drawHeader(model) {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(25);
  text(exploring ? 'Current and Magnetic Field — Exploration' : `Current and Magnetic Field — Case ${caseIndex + 1} of 4`, canvasWidth / 2, 12);
  textSize(16);
  text(`I = ${model.current.toFixed(1)} A ${model.direction.toLowerCase()} • observation point r = ${model.distance.toFixed(1)} cm`, canvasWidth / 2, 47);
}

function fieldIsVisible() {
  return exploring || (directionResolved && magnitudeResolved);
}

function drawField(model) {
  const cx = canvasWidth * 0.42;
  const cy = 225;
  const radii = [58, 100, 142];
  stroke(fieldIsVisible() ? 'royalblue' : 'lightgray');
  strokeWeight(2);
  noFill();
  radii.forEach(radius => circle(cx, cy, radius * 2));

  if (fieldIsVisible()) {
    const clockwise = model.direction === 'Into page';
    radii.forEach((radius, i) => {
      const angle = i === 0 ? -0.4 : i === 1 ? 1.2 : 2.7;
      drawTangentArrow(cx, cy, radius, angle, clockwise);
    });
  }

  fill('white');
  stroke('black');
  strokeWeight(3);
  circle(cx, cy, 54);
  if (model.direction === 'Out of page') {
    fill('firebrick');
    noStroke();
    circle(cx, cy, 13);
  } else {
    stroke('firebrick');
    strokeWeight(4);
    line(cx - 10, cy - 10, cx + 10, cy + 10);
    line(cx + 10, cy - 10, cx - 10, cy + 10);
  }
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(15);
  text(model.direction, cx, cy + 36);

  const pointRadius = map(model.distance, 1, 10, 58, 142);
  const px = cx + pointRadius;
  fill('darkorange');
  noStroke();
  circle(px, cy, 13);
  fill('black');
  noStroke();
  textAlign(LEFT, BOTTOM);
  text('measurement point', px + 18, cy - 12);
}

function drawTangentArrow(cx, cy, radius, angle, clockwise) {
  const x = cx + cos(angle) * radius;
  const y = cy + sin(angle) * radius;
  const tangent = angle + (clockwise ? HALF_PI : -HALF_PI);
  push();
  translate(x, y);
  rotate(tangent);
  fill('royalblue');
  noStroke();
  triangle(10, 0, -7, -7, -7, 7);
  pop();
}

function drawEquationPanel(model) {
  const visible = fieldIsVisible();
  const magnitude = calculateMicrotesla(model.current, model.distance);
  const panelX = canvasWidth > 650 ? canvasWidth * 0.72 : canvasWidth * 0.69;
  const panelW = min(250, canvasWidth - panelX - 18);
  if (panelW < 150) return;
  fill('white');
  stroke('silver');
  rect(panelX, 112, panelW, 220, 10);
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(17);
  text('Ideal long conductor', panelX + 14, 126);
  textSize(15);
  text('B = μ₀I / (2πr)', panelX + 14, 162);
  text('μ₀ = 4π × 10⁻⁷ T·m/A', panelX + 14, 193);
  text(`r = ${(model.distance / 100).toFixed(3)} m`, panelX + 14, 224);
  if (visible) {
    text(`B = ${magnitude.toFixed(1)} μT`, panelX + 14, 260);
    text(`Direction: ${model.direction === 'Out of page' ? 'counterclockwise' : 'clockwise'}`, panelX + 14, 293, panelW - 25, 38);
  } else {
    text('Magnitude and field direction are hidden until you predict.', panelX + 14, 260, panelW - 25, 58);
  }
}

function calculateMicrotesla(current, distanceCm) {
  return 20 * current / distanceCm;
}

function drawFeedback() {
  fill(feedback.startsWith('Correct') ? 'darkgreen' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  text(feedback, 22, 370, canvasWidth - 44, 72);
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  if (!exploring) {
    text('Field circulation:', 18, drawHeight + 18);
    text('Magnitude B:', 18, drawHeight + 53);
    text('μT', 300, drawHeight + 53);
    text(`First attempt: ${directionFirstScore}/4 directions, ${magnitudeFirstScore}/4 magnitudes`, 18, drawHeight + 123);
  } else {
    text(`Current: ${currentSlider.value()} A`, 18, drawHeight + 18);
    text(`Distance: ${distanceSlider.value()} cm`, 18, drawHeight + 53);
    text('Current direction:', 18, drawHeight + 88);
    text('Field magnitude change:', 18, drawHeight + 123);
  }
}

function checkFieldCase() {
  if (exploring) return;
  const item = fieldCases[caseIndex];
  const messages = [];
  if (!directionResolved) {
    if (!directionSelect.value()) {
      messages.push('Choose clockwise or counterclockwise.');
    } else {
      directionResolved = true;
      if (directionSelect.value() === item.circulation) {
        directionFirstScore += 1;
        messages.push(`Correct: the right-hand grip rule gives ${item.circulation.toLowerCase()}.`);
      } else {
        messages.push(`${item.reason} Correct direction: ${item.circulation}.`);
      }
    }
  }

  if (!magnitudeResolved) {
    if (magnitudeInput.value() === '') {
      messages.push('Enter a magnitude in μT.');
    } else {
      magnitudeAttempts += 1;
      const correct = abs(Number(magnitudeInput.value()) - item.magnitude) <= 0.5;
      if (correct) {
        magnitudeResolved = true;
        if (magnitudeAttempts === 1) magnitudeFirstScore += 1;
        messages.push(`Correct: B = 20I/r(cm) = ${item.magnitude.toFixed(1)} μT.`);
      } else if (magnitudeAttempts >= 2) {
        magnitudeResolved = true;
        messages.push(`B = 20(${item.current.toFixed(1)})/${item.distance.toFixed(1)} = ${item.magnitude.toFixed(1)} μT. ${item.reason}`);
      } else {
        messages.push(`Try the magnitude again. Convert centimeters to meters before using B = μ₀I/(2πr).`);
      }
    }
  }

  feedback = messages.join(' ');
  if (directionResolved && magnitudeResolved) {
    submitButton.hide();
    nextButton.html(caseIndex === fieldCases.length - 1 ? 'Open exploration' : 'Next case');
    nextButton.show();
  }
}

function nextFieldCase() {
  if (caseIndex < fieldCases.length - 1) {
    caseIndex += 1;
    directionResolved = false;
    magnitudeResolved = false;
    magnitudeAttempts = 0;
    directionSelect.selected('');
    magnitudeInput.value('');
    feedback = 'Choose a circulation direction and calculate the field before revealing it.';
    submitButton.show();
    nextButton.hide();
  } else {
    enterFieldExploration();
  }
}

function enterFieldExploration() {
  exploring = true;
  directionSelect.hide();
  magnitudeInput.hide();
  submitButton.hide();
  nextButton.hide();
  currentSlider.show();
  distanceSlider.show();
  currentDirectionSelect.show();
  comparisonSelect.show();
  comparisonButton.show();
  previousExploreMagnitude = calculateMicrotesla(currentSlider.value(), distanceSlider.value());
  feedback = 'Change one quantity, predict the magnitude change, then check your comparison.';
  positionControls();
}

function exploreModel() {
  return {
    current: Number(currentSlider.value()),
    distance: Number(distanceSlider.value()),
    direction: currentDirectionSelect.value()
  };
}

function exploreChanged() {
  const newMagnitude = calculateMicrotesla(Number(currentSlider.value()), Number(distanceSlider.value()));
  if (previousExploreMagnitude !== null) {
    actualComparison = newMagnitude > previousExploreMagnitude + 0.01 ? 'Increased'
      : newMagnitude < previousExploreMagnitude - 0.01 ? 'Decreased' : 'Stayed the same';
  }
  previousExploreMagnitude = newMagnitude;
  comparisonSelect.selected('');
  feedback = 'The field updated. Predict whether its magnitude increased, decreased, or stayed the same.';
}

function checkComparison() {
  if (!comparisonSelect.value() || actualComparison === null) {
    feedback = 'Change a quantity, then choose a magnitude comparison.';
    return;
  }
  feedback = comparisonSelect.value() === actualComparison
    ? `Correct: the field magnitude ${actualComparison.toLowerCase()}.`
    : `The field magnitude ${actualComparison.toLowerCase()}. B is proportional to I and inversely proportional to r.`;
}

function positionControls() {
  if (!exploring) {
    directionSelect.position(180, drawHeight + 5);
    directionSelect.size(190, 30);
    magnitudeInput.position(180, drawHeight + 40);
    magnitudeInput.size(105, 24);
    submitButton.position(18, drawHeight + 76);
    nextButton.position(18, drawHeight + 76);
  } else {
    const sliderWidth = max(120, canvasWidth - sliderLeftMargin - margin);
    currentSlider.position(sliderLeftMargin, drawHeight + 5);
    distanceSlider.position(sliderLeftMargin, drawHeight + 40);
    currentDirectionSelect.position(sliderLeftMargin, drawHeight + 75);
    comparisonSelect.position(190, drawHeight + 110);
    comparisonSelect.size(120, 30);
    comparisonButton.position(320, drawHeight + 110);
    comparisonButton.size(65, 30);
    currentSlider.size(sliderWidth);
    distanceSlider.size(sliderWidth);
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
