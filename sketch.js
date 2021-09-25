// random number A (animations)
var randNumA = 1;

// random number B (randoShape size)
var randNumB = 50;

// shape selector: 1 = torus; 2 = box
var shapeSelect = 1;

// material selector: 1 = normalMaterial; 2 = specularMaterial
var materialSelect = 1;

// array
var arrayNum;
var shape = [];

function setup() {
  // envi setup
  createCanvas(windowWidth, windowHeight, WEBGL).parent("container");
  angleMode(DEGREES);
  frameRate(60);
  smooth();
  background(0);

  // initialise an array of randoShape objects (the range is arbitrary)
  arrayNum = getRandomInt(5, 25);
  for (let i = 0; i < arrayNum; i++) {
    shape[i] = new randoShape();
  }
}

function draw() {
  scale(0.75);

  // store current mouse location in a 3D space
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;

  // light and appearance setup
  ambientLight(100);
  pointLight(100, 100, 100, locX, locY, 500);

  // initial check for materialSelect selection
  if (materialSelect == 1) {
    normalMaterial();
    noStroke();
  }

  randomAnimation(randNumA);

  // mild movement based on the stored mouse location
  rotateX(locX / 50);
  rotateY(locY / 50);
  translate(locX / 10, locY / 10, 0);

  // display the generated array of randoShape objects
  for (let i = 0; i < arrayNum; i++) {
    shape[i].display();
  }
}

// generate a random shape, including its main movement based on frameCount
class randoShape {
  // parameters to build the shape
  constructor() {
    this.x = random(-width / 7.5, width / 7.5);
    this.y = random(-height / 7.5, height / 7.5);
    this.scale = random(0.5, 0.75);
    this.xRot = random(0.5);
    this.yRot = random(0.5);
  }

  // show the defined shape
  display() {
    push();
    rotateX(frameCount * this.xRot);
    rotateY(frameCount * this.yRot);
    translate(this.x, this.y);
    scale(this.scale);
    if (shapeSelect == 1) {
      torus(windowHeight / 10, randNumB, 50, 50);
    } else {
      box(windowHeight / 3, windowHeight / 3, randNumB * 2);
    }
    pop();
  }
}

// generate a random animation
function randomAnimation(animationValue) {
  rotateX((frameCount * animationValue) / 100);
  rotateY((frameCount * animationValue) / 100);
  rotateZ((frameCount * animationValue) / 100);
  translate(animationValue * 5, animationValue * 5, animationValue * 5);
}

// generate a random integer from range, inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

// generate a new set of shapes
function regenerateShapes() {
  // show the array with a random specularMaterial or a normalMaterial
  if (materialSelect == 2) {
    specularMaterial(
      lerpColor(
        color(getRandomInt(1, 255), getRandomInt(1, 255), getRandomInt(1, 255)),
        color(getRandomInt(1, 255), getRandomInt(1, 255), getRandomInt(1, 255)),
        random(0.25, 0.75)
      )
    );
    stroke(
      lerpColor(
        color(getRandomInt(1, 255), getRandomInt(1, 255), getRandomInt(1, 255)),
        color(getRandomInt(1, 255), getRandomInt(1, 255), getRandomInt(1, 255)),
        frameCount / 120
      )
    );
  } else {
    normalMaterial();
    noStroke();
  }

  // generate a new set of random parameters
  randNumA = getRandomInt(-10, 10);
  randNumB = getRandomInt(50, 100);

  // generate a new array of randoShape objects
  shape = [];
  arrayNum = getRandomInt(5, 25);
  for (let i = 0; i < arrayNum; i++) {
    shape[i] = new randoShape();
  }
}

// switch between the two types of shape (torus, box)
function switchType() {
  if (shapeSelect == 1) {
    shapeSelect = 2;
  } else {
    shapeSelect = 1;
  }
}

// switch between the two types of material (normalMaterial, specularMaterial)
function switchColour() {
  if (materialSelect == 1) {
    materialSelect = 2;
  } else {
    materialSelect = 1;
  }
  if (materialSelect == 2) {
    specularMaterial(
      lerpColor(
        color(getRandomInt(1, 255), getRandomInt(1, 255), getRandomInt(1, 255)),
        color(getRandomInt(1, 255), getRandomInt(1, 255), getRandomInt(1, 255)),
        random(0.25, 0.75)
      )
    );
    stroke(
      lerpColor(
        color(getRandomInt(1, 255), getRandomInt(1, 255), getRandomInt(1, 255)),
        color(getRandomInt(1, 255), getRandomInt(1, 255), getRandomInt(1, 255)),
        frameCount / 120
      )
    );
  } else {
    normalMaterial();
    noStroke();
  }
}

function clearBackground() {
  background(0);
}

function saveScreenshot() {
  saveCanvas("myCanvas", "jpg");
}
