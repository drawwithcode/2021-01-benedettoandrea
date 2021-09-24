// random number A (animations)
var randNumA = 1;

// random number B (randoShape size)
var randNumB = 50;

// random number C (colours and fx)
var randNumC = 0.5;

// array
var arrayNum;
var shape = [];

function setup() {
  // envi setup
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  frameRate(60);
  smooth();
  normalMaterial();

  // initialise an array of randoShape objects (the range is arbitrary)
  arrayNum = getRandomInt(5, 100);
  for (let i = 0; i < arrayNum; i++) {
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
  constructor() {
    this.x = random(-width / 7.5, width / 7.5);
    this.y = random(-height / 7.5, height / 7.5);
    this.scale = random(0.5, 0.75);
    this.xRot = random(0.5);
    this.yRot = random(0.5);
  }

  display() {
    push();
    rotateX(frameCount * this.xRot);
    rotateY(frameCount * this.yRot);
    translate(this.x, this.y);
    scale(this.scale);
    //plane(windowHeight / 10, randNumB);
    //box(windowHeight / 10, randNumB, randNumB);
    //sphere(randNumB);
    torus(windowHeight / 10, randNumB, 50, 50);
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
  randNumA = getRandomInt(-10, 10);
  randNumB = getRandomInt(50, 100);
  //randNumC = Math.random();

  // generate a new array of randoShape objects
  shape = [];
  arrayNum = getRandomInt(5, 100);
  for (let i = 0; i < arrayNum; i++) {
    shape[i] = new randoShape();
  }
}

// generate a random animation
function randomAnimation(animationValue) {
  rotateX((frameCount * animationValue) / 100);
  rotateY((frameCount * animationValue) / 100);
  rotateZ((frameCount * animationValue) / 100);
  translate(animationValue * 10, animationValue * 10, animationValue * 10);
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

function keyTyped() {
  if (key == "r") {
    frameCount = 0;
  }
}
