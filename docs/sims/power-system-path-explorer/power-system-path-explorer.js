// Power System Path Explorer — predict, correct once, then inspect the revealed path
// CANVAS_HEIGHT: 677
// Layout: drawHeight 540 + controlHeight 135 (three control rows) + 2 for the border.
//
// Phase 'predict': learner orders the four stages and matches four role cards.
//   One correction attempt is allowed; the full answer is then revealed.
// Phase 'reveal':   the ordered path is drawn; click a stage/arrow (or use the
//   Inspect menu) to read its meaning, then answer the process-heater question.

let canvasWidth = 400;
let drawHeight = 540;
let controlHeight = 135;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let labelWidth = 105;            // width reserved for control-row labels
let defaultTextSize = 16;
let rowHeight = 40;

// ---------- Content (from Chapter 1, "The Electric Power System") ----------
const stages = ['Generation', 'Transmission', 'Distribution', 'Utilization'];
const stageFill = ['#b7d8f6', '#fde6a8', '#cdebcf', '#e4d1f4'];
const stageStroke = ['#24476e', '#755a00', '#2e6f40', '#68408a'];

// Role cards are deliberately NOT in stage order so card order gives nothing away.
const roleCards = [
  { id: 'A', stage: 2, text: 'Uses substations, feeders, and distribution transformers to deliver power locally.' },
  { id: 'B', stage: 0, text: 'Converts an input energy source into electrical energy supplied to the system.' },
  { id: 'C', stage: 3, text: 'Converts electrical energy into the customer’s useful output.' },
  { id: 'D', stage: 1, text: 'Transfers bulk electric power over long distances at high voltage.' }
];

const stageInfo = [
  'Converts an input energy source into electrical energy. Generation supplies energy; a transformer changes voltage but does not create energy.',
  'Transfers bulk power over long distances at high voltage. It links generating regions and major load centers before local delivery.',
  'Uses substations, feeders, and distribution transformers for local delivery. It routes power from the bulk system toward customer services.',
  'The customer load: equipment converts electrical energy into heat, light, motion, cooling, or information processing.'
];

const connections = [
  { label: 'Step-up transformer',
    text: 'A step-up transformer commonly raises AC voltage so the same power moves with lower current and lower I²R conductor loss.' },
  { label: 'Receiving substation',
    text: 'A receiving or distribution substation switches circuits and reduces voltage for local feeders.' },
  { label: 'Service voltage',
    text: 'Distribution transformers and service conductors provide a service voltage suited to customer equipment.' }
];

// ---------- State ----------
let phase = 'predict';           // 'predict' | 'reveal'
let submissions = 0;
let orderOK = [null, null, null, null];
let roleOK = [null, null, null, null];
let firstOrderScore = 0;
let firstRoleScore = 0;
let feedback = 'Pick a stage for each position and a stage for each role card, then submit. You may revise freely until you submit.';
let selected = -1;               // 0-3 stage, 10-12 connection, -1 none
let heaterAnswered = false;
let heaterFeedback = '';

// ---------- Controls ----------
let orderSelects = [];
let roleSelects = [];
let submitButton;
let resetButton;
let inspectSelect;
let heaterSelect;
let heaterButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create every control before layoutControls() positions them.
  for (let i = 0; i < 4; i++) {
    orderSelects.push(makeStageSelect('Stage at position ' + (i + 1)));
    roleSelects.push(makeStageSelect('Stage for role card ' + roleCards[i].id));
  }

  submitButton = createButton('Submit prediction');
  submitButton.parent(document.querySelector('main'));
  submitButton.mousePressed(submitPrediction);

  resetButton = createButton('Reset');
  resetButton.parent(document.querySelector('main'));
  resetButton.mousePressed(resetActivity);

  inspectSelect = createSelect();
  inspectSelect.parent(document.querySelector('main'));
  inspectSelect.option('Choose a stage or arrow', '-1');
  stages.forEach((s, i) => inspectSelect.option(s, String(i)));
  connections.forEach((c, i) => inspectSelect.option('Arrow: ' + c.label, String(10 + i)));
  inspectSelect.changed(() => { selected = int(inspectSelect.value()); });
  inspectSelect.attribute('aria-label', 'Inspect a stage or connection');

  heaterSelect = makeStageSelect('Stage for the 9.60 kW process heater');

  heaterButton = createButton('Check');
  heaterButton.parent(document.querySelector('main'));
  heaterButton.mousePressed(checkHeater);

  layoutControls();
  updateControlVisibility();

  describe('Activity: order generation, transmission, distribution and utilization, and match four role cards to the stages. After submitting, a vertical flow diagram shows the path with the transformer or substation on each arrow, and a question asks which stage a process heater belongs to.', FALLBACK);
}

function makeStageSelect(ariaLabel) {
  const sel = createSelect();
  sel.parent(document.querySelector('main'));
  sel.option('Choose', '');
  stages.forEach(s => sel.option(s, s));
  sel.attribute('aria-label', ariaLabel);
  return sel;
}

function draw() {
  updateCanvasSize();

  // Drawing region
  noStroke();
  fill('aliceblue');
  rect(0, 0, width, drawHeight);
  // Control region
  fill('white');
  rect(0, drawHeight, width, controlHeight);
  stroke('silver');
  noFill();
  rect(0, 0, width - 1, height - 1);
  noStroke();

  // Title
  fill('black');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(fitTextSize('Power System Path Explorer', width - 2 * margin, 30, 20));
  text('Power System Path Explorer', width / 2, 10);
  textStyle(NORMAL);
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);

  if (phase === 'predict') {
    drawPredictPhase();
  } else {
    drawRevealPhase();
  }
  drawControlLabels();
}

// ======================= Predict phase =======================

function drawPredictPhase() {
  fill('#172033');
  textAlign(CENTER, TOP);
  text('Predict the path from energy conversion to useful output.', width / 2, 48);

  // Four ordered slots (no arrows until the path is revealed)
  const gap = 12;
  const slotW = (width - 2 * margin - 3 * gap) / 4;
  const slotY = 78;
  const slotH = 58;
  for (let i = 0; i < 4; i++) {
    const x = margin + i * (slotW + gap);
    const choice = orderSelects[i].value();
    drawResultBox(x, slotY, slotW, slotH, orderOK[i], choice ? stageFill[stages.indexOf(choice)] : 'white');
    fill('#172033');
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(fitTextSize(choice || 'Choose', slotW - 8, 16, 11));
    text(choice || 'Choose', x + slotW / 2, slotY + slotH * 0.62);
    textStyle(NORMAL);
    textSize(14);
    text('Position ' + (i + 1) + markFor(orderOK[i]), x + slotW / 2, slotY + 14);
    textSize(defaultTextSize);
  }

  // Role cards in a 2 x 2 grid
  const cardW = (width - 2 * margin - gap) / 2;
  const cardH = 92;
  const cardY0 = 154;
  for (let i = 0; i < 4; i++) {
    const x = margin + (i % 2) * (cardW + gap);
    const y = cardY0 + floor(i / 2) * (cardH + gap);
    drawResultBox(x, y, cardW, cardH, roleOK[i], 'white');
    fill('#172033');
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    const choice = roleSelects[i].value();
    text('Role ' + roleCards[i].id + markFor(roleOK[i]) + (choice ? ' → ' + choice : ''), x + 8, y + 6);
    textStyle(NORMAL);
    textWrap(WORD);
    textSize(fitWrapped(roleCards[i].text, cardW - 16, cardH - 30));
    text(roleCards[i].text, x + 8, y + 28, cardW - 16, cardH - 30);
    textSize(defaultTextSize);
  }

  // Feedback panel
  const fy = cardY0 + 2 * (cardH + gap) + 2;
  fill('white');
  stroke('silver');
  rect(margin, fy, width - 2 * margin, drawHeight - fy - 12, 6);
  noStroke();
  fill('#172033');
  textAlign(LEFT, TOP);
  textWrap(WORD);
  textSize(fitWrapped(feedback, width - 2 * margin - 20, drawHeight - fy - 36));
  text(feedback, margin + 10, fy + 8, width - 2 * margin - 20, drawHeight - fy - 28);
  textSize(defaultTextSize);
}

// Outline plus a text mark so correctness is never conveyed by color alone.
function drawResultBox(x, y, w, h, ok, fillColor) {
  strokeWeight(ok === null ? 1 : 3);
  stroke(ok === null ? 'silver' : (ok ? '#2e6f40' : '#b04a10'));
  fill(fillColor);
  rect(x, y, w, h, 6);
  strokeWeight(1);
  noStroke();
}

function markFor(ok) {
  if (ok === null) return '';
  return ok ? ' ✓' : ' ✗';
}

function submitPrediction() {
  const orderValues = orderSelects.map(s => s.value());
  const roleValues = roleSelects.map(s => s.value());
  if ([...orderValues, ...roleValues].some(v => !v)) {
    feedback = 'Complete all four positions and all four role cards before submitting.';
    return;
  }
  if (new Set(orderValues).size < 4 || new Set(roleValues).size < 4) {
    feedback = 'Use each stage exactly once in the sequence and exactly once in the role matches.';
    return;
  }

  submissions++;
  orderOK = orderValues.map((v, i) => v === stages[i]);
  roleOK = roleValues.map((v, i) => stages.indexOf(v) === roleCards[i].stage);

  if (submissions === 1) {
    firstOrderScore = orderOK.filter(Boolean).length;
    firstRoleScore = roleOK.filter(Boolean).length;
  }

  const allCorrect = orderOK.every(Boolean) && roleOK.every(Boolean);
  if (allCorrect) {
    feedback = submissions === 1 ? 'Correct on your first submission!' : 'Correct after your revision.';
    enterReveal();
  } else if (submissions === 1) {
    feedback = 'Score: ' + firstOrderScore + '/4 stages, ' + firstRoleScore + '/4 roles. Revise the items marked ✗ and submit once more. ' + buildHints(orderValues, roleValues);
    submitButton.html('Submit correction');
  } else {
    feedback = 'Here is the complete answer.';
    enterReveal();
  }
}

// Misconception-specific hints that do not give away the whole order.
function buildHints(orderValues, roleValues) {
  const hints = [];
  if (orderValues.indexOf('Distribution') < orderValues.indexOf('Transmission')) {
    hints.push('Bulk transfer happens before local delivery.');
  }
  if (!orderOK[0]) hints.push('Start where an input energy source becomes electrical energy.');
  if (!orderOK[3]) hints.push('End where customer equipment produces a useful output.');
  if (!roleOK.every(Boolean)) hints.push('Transformers change voltage; they do not generate energy.');
  if (roleValues[2] === 'Distribution' || roleValues[0] === 'Utilization') {
    hints.push('Utilization is the load itself, not another word for distribution.');
  }
  return hints.join(' ');
}

// ======================= Reveal phase =======================

function enterReveal() {
  phase = 'reveal';
  selected = -1;
  inspectSelect.selected('-1');
  updateControlVisibility();
}

function revealGeometry() {
  const nodeH = 40;
  const arrowGap = 30;
  const top = 88;
  const nodeW = min(190, width * 0.38);
  const cx = margin + nodeW / 2;
  const infoX = cx + 12 + 175 + 15;   // edge labels end near cx + 12 + 175
  const wide = width - margin - infoX >= 230;
  const nodes = [];
  for (let i = 0; i < 4; i++) {
    nodes.push({ x: margin, y: top + i * (nodeH + arrowGap), w: nodeW, h: nodeH });
  }
  const info = wide
    ? { x: infoX, y: top, w: width - margin - infoX, h: 3 * (nodeH + arrowGap) + nodeH }
    : { x: margin, y: top + 3 * (nodeH + arrowGap) + nodeH + 12, w: width - 2 * margin, h: 90 };
  const heater = { x: margin, y: info.y + info.h + 10, w: width - 2 * margin, h: 0 };
  heater.h = drawHeight - heater.y - 10;
  if (wide) { heater.y = max(heater.y, top + 3 * (nodeH + arrowGap) + nodeH + 12); heater.h = drawHeight - heater.y - 10; }
  return { nodes, cx, wide, info, heater, nodeH, arrowGap };
}

function drawRevealPhase() {
  const g = revealGeometry();

  fill('#172033');
  textAlign(CENTER, TOP);
  textWrap(WORD);
  const status = feedback + ' First-submission score: ' + firstOrderScore + '/4 stages, ' + firstRoleScore + '/4 roles.';
  textSize(fitWrapped(status, width - 2 * margin, 40));
  text(status, margin, 44, width - 2 * margin, 40);
  textSize(defaultTextSize);

  // Arrows with edge labels
  for (let i = 0; i < 3; i++) {
    const y1 = g.nodes[i].y + g.nodeH;
    const y2 = g.nodes[i + 1].y;
    const on = selected === 10 + i;
    stroke(on ? '#a54521' : '#52606d');
    strokeWeight(on ? 4 : 2);
    line(g.cx, y1, g.cx, y2 - 2);
    fill(on ? '#a54521' : '#52606d');
    triangle(g.cx, y2, g.cx - 6, y2 - 10, g.cx + 6, y2 - 10);
    noStroke();
    fill('#172033');
    textAlign(LEFT, CENTER);
    textStyle(on ? BOLD : NORMAL);
    text(connections[i].label, g.cx + 12, (y1 + y2) / 2);
    textStyle(NORMAL);
    strokeWeight(1);
  }

  // Stage nodes
  for (let i = 0; i < 4; i++) {
    const n = g.nodes[i];
    const on = selected === i;
    stroke(stageStroke[i]);
    strokeWeight(on ? 4 : 2);
    fill(stageFill[i]);
    rect(n.x, n.y, n.w, n.h, 8);
    strokeWeight(1);
    noStroke();
    fill('#172033');
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text((i + 1) + '. ' + stages[i], n.x + n.w / 2, n.y + n.h / 2);
    textStyle(NORMAL);
  }

  // Info panel
  fill('white');
  stroke('silver');
  rect(g.info.x, g.info.y, g.info.w, g.info.h, 6);
  noStroke();
  fill('#172033');
  textAlign(LEFT, TOP);
  let head = 'Stage details';
  let body = 'Click a stage or arrow in the diagram, or use the Inspect menu below.';
  if (selected >= 0 && selected < 4) {
    head = stages[selected];
    body = stageInfo[selected];
  } else if (selected >= 10) {
    const c = connections[selected - 10];
    head = c.label;
    body = stages[selected - 10] + ' → ' + stages[selected - 9] + '. ' + c.text;
  }
  textStyle(BOLD);
  text(head, g.info.x + 10, g.info.y + 8, g.info.w - 20, 24);
  textStyle(NORMAL);
  textSize(fitWrapped(body, g.info.w - 20, g.info.h - 40));
  text(body, g.info.x + 10, g.info.y + 34, g.info.w - 20, g.info.h - 40);
  textSize(defaultTextSize);

  // Process-heater transfer question
  fill('white');
  stroke('silver');
  rect(g.heater.x, g.heater.y, g.heater.w, g.heater.h, 6);
  noStroke();
  fill('#172033');
  const q = heaterAnswered
    ? heaterFeedback
    : 'Transfer question: the chapter’s 9.60 kW resistive process heater belongs to which stage? Choose below and press Check.';
  textSize(fitWrapped(q, g.heater.w - 20, g.heater.h - 16));
  text(q, g.heater.x + 10, g.heater.y + 8, g.heater.w - 20, g.heater.h - 16);
  textSize(defaultTextSize);
}

function checkHeater() {
  if (heaterAnswered) return;
  const v = heaterSelect.value();
  if (!v) { heaterFeedback = 'Choose a stage first.'; heaterAnswered = false; return; }
  heaterAnswered = true;
  heaterFeedback = (v === 'Utilization' ? 'Correct: ' : 'Not quite: ') +
    'the heater is utilization because it converts electrical energy into useful process heat.';
  heaterSelect.attribute('disabled', '');
  heaterButton.attribute('disabled', '');
}

function mousePressed() {
  if (phase !== 'reveal' || mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > drawHeight) return;
  const g = revealGeometry();
  for (let i = 0; i < 4; i++) {
    const n = g.nodes[i];
    if (mouseX >= n.x && mouseX <= n.x + n.w && mouseY >= n.y && mouseY <= n.y + n.h) {
      selected = i;
    }
  }
  for (let i = 0; i < 3; i++) {
    const y1 = g.nodes[i].y + g.nodeH;
    if (mouseY > y1 && mouseY < g.nodes[i + 1].y && mouseX >= margin && mouseX <= g.cx + 12 + 175) {
      selected = 10 + i;
    }
  }
  inspectSelect.selected(String(selected));
}

// ======================= Reset =======================

function resetActivity() {
  phase = 'predict';
  submissions = 0;
  orderOK = [null, null, null, null];
  roleOK = [null, null, null, null];
  firstOrderScore = 0;
  firstRoleScore = 0;
  selected = -1;
  heaterAnswered = false;
  heaterFeedback = '';
  feedback = 'Pick a stage for each position and a stage for each role card, then submit. You may revise freely until you submit.';
  orderSelects.concat(roleSelects, [heaterSelect]).forEach(s => s.selected(''));
  heaterSelect.removeAttribute('disabled');
  heaterButton.removeAttribute('disabled');
  submitButton.html('Submit prediction');
  updateControlVisibility();
}

// ======================= Layout helpers =======================

function updateControlVisibility() {
  const predicting = phase === 'predict';
  orderSelects.concat(roleSelects, [submitButton]).forEach(c => predicting ? c.show() : c.hide());
  [inspectSelect, heaterSelect, heaterButton].forEach(c => predicting ? c.hide() : c.show());
  resetButton.show();
  layoutControls();
}

function drawControlLabels() {
  fill('#172033');
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  const labels = phase === 'predict'
    ? ['Order 1→4:', 'Roles A–D:', '']
    : ['Inspect:', 'Heater is:', ''];
  for (let r = 0; r < 3; r++) {
    text(labels[r], margin, drawHeight + 12 + r * rowHeight + 15);
  }
  textStyle(NORMAL);
}

function layoutControls() {
  const x0 = margin + labelWidth;
  const avail = max(120, canvasWidth - x0 - margin);
  const gap = 6;
  const sw = (avail - 3 * gap) / 4;
  const rowY = r => drawHeight + 12 + r * rowHeight;
  for (let i = 0; i < 4; i++) {
    orderSelects[i].position(x0 + i * (sw + gap), rowY(0));
    orderSelects[i].size(sw);
    roleSelects[i].position(x0 + i * (sw + gap), rowY(1));
    roleSelects[i].size(sw);
  }
  submitButton.position(margin, rowY(2));
  resetButton.position(phase === 'predict' ? margin + 160 : margin, rowY(2));
  inspectSelect.position(x0, rowY(0));
  inspectSelect.size(min(avail, 300));
  heaterSelect.position(x0, rowY(1));
  heaterSelect.size(min(avail - 80, 180));
  heaterButton.position(x0 + min(avail - 80, 180) + 10, rowY(1));
}

// Largest font size (<= defaultTextSize, >= minSize) at which a single line fits.
function fitTextSize(str, maxW, maxSize, minSize) {
  for (let s = maxSize; s > minSize; s--) {
    textSize(s);
    if (textWidth(str) <= maxW) return s;
  }
  return minSize;
}

// Largest font size (16 down to 12) at which wrapped text fits the box.
function fitWrapped(str, w, h) {
  for (let s = defaultTextSize; s > 12; s--) {
    textSize(s);
    if (wrappedHeight(str, w) <= h) return s;
  }
  return 12;
}

function wrappedHeight(str, w) {
  const words = str.split(' ');
  let lines = 1;
  let line = '';
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (textWidth(test) > w && line) { lines++; line = word; } else { line = test; }
  }
  return lines * textLeading();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  layoutControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    const w = container.offsetWidth;
    if (w !== canvasWidth) {
      canvasWidth = w;
      if (typeof resizeCanvas === 'function' && typeof orderSelects !== 'undefined' && orderSelects.length) {
        resizeCanvas(canvasWidth, canvasHeight);
        layoutControls();
      }
    }
  }
}
