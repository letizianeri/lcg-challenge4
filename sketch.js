let table;
let currentRow = 0;
let droneImg;

function preload() {
  table = loadTable('assets/drone_alfa_data.csv', 'csv', 'header');
  droneImg = loadImage('assets/drone.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20);
  noFill();
  frameRate(60);
}

function draw() {
  background(15);

  let rows = table.getRowCount();

  // scia
  stroke(100, 200, 255, 150);
  noFill();
  beginShape();
  for (let i = 0; i < currentRow; i++) {
    let x = table.getNum(i, 'x_pos');
    let y = table.getNum(i, 'y_pos');
    let px = map(x, -1, 1, 100, width - 100);
    let py = map(y, -3, 0, height - 100, 100);
    vertex(px, py);
  }
  endShape();

  // drone
  if (currentRow < rows) {
    let x = table.getNum(currentRow, 'x_pos');
    let y = table.getNum(currentRow, 'y_pos');
    let z = table.getNum(currentRow, 'z_pos');

    let px = map(x, -1, 1, 100, width - 100);
    let py = map(y, -3, 0, height - 100, 100);
    let size = map(z, -0.2, 0.2, 20, 80); // dimensione in base all'altitudine

    imageMode(CENTER);
    image(droneImg, px, py, size, size);

    // testo
    fill(255);
    textAlign(LEFT);
    textSize(14);
    text(`step: ${currentRow}`, 20, 30);
    text(`altitude (z): ${z.toFixed(3)}`, 20, 50);
  }

  // avanzamento
  currentRow += 1;
  if (currentRow >= rows) {
    noLoop(); //ferma l'animazione alla fine
  }
}
