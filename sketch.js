var numberino = 1;
var numberin = 50;
var numberi = 0.5;
var number;
var shape = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  frameRate(60);
  smooth();
  normalMaterial();
  number = round(random(5, 100));
  for (let i = 0; i < number; i++) {
    shape[i] = new randoShape();
  }
}

function draw() {
  // store current mouse location in a 3D space
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;

  // light and appearance setup
  //ambientLight(100);
  //pointLight(100, 100, 100, locX, locY, 500);
  //noStroke();
  //stroke(lerpColor(color("#ea0043"), color("#0fefca"), frameCount / 120));

  randomAnimation(numberino);

  // mild movement based on the stored mouse location
  rotateX(locX / 50);
  rotateY(locY / 50);
  rotateZ(numberino / 50);
  translate(locX / 10, locY / 10, 0);

  // display the generated array of randoShape objects
  for (let i = 0; i < number; i++) {
    shape[i].display();
  }
}

// generate a random shape, including its main movement based on frameCount
class randoShape {
  constructor() {
    this.x = random(-width / 7.5, width / 7.5);
    this.y = random(-height / 7.5, height / 7.5);
    this.scale = random(0.5, 1);
    this.xRot = random(0.5);
    this.yRot = random(0.5);
    this.timer = 3000;
  }

  display() {
    push();
    rotateX(frameCount * this.xRot);
    rotateY(frameCount * this.yRot);
    translate(this.x, this.y);
    scale(this.scale);
    //plane(windowHeight / 10, numberin);
    //box(windowHeight / 10, numberin, numberin);
    //sphere(numberin);
    torus(windowHeight / 10, numberin, 50, 50);
    pop();
  }
}

function mouseClicked() {
  // generate a random specular material
  //specularMaterial(
  //  lerpColor(
  //    color(getRandomInt(1, 255), getRandomInt(1, 255), getRandomInt(1, 255)),
  //    color(getRandomInt(1, 255), getRandomInt(1, 255), getRandomInt(1, 255)),
  //    random(0.25, 0.75)
  //  )
  //);

  // generate a new set of random parameters
  numberino = getRandomInt(-10, 10);
  numberin = getRandomInt(50, 100);
  numberi = Math.random();
}

// generate multiple shapes in a 3D space - not used
function randomShapes() {
  circle(windowWidth / 4, windowHeight / 4, numberin);
  torus(windowWidth / 8, numberin, numberin, numberin);
}

// generate a random animation
function randomAnimation(rotation) {
  rotate(rotation * 0.125);
  rotateX((0.125 * numberin) / 100000);
  rotateY((0.125 * numberin) / 100000);
  rotateZ((0.125 * numberin) / 100000);
  translate(
    (0.25 * numberin) / 1000,
    (0.5 * numberin) / 1000,
    (0.75 * numberin) / 1000
  );
}

// generate a random integer from range, inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyTyped() {
  if (key === "s") {
    saveCanvas("myCanvas", "jpg");
  }
}
