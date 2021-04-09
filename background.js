const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;
l = [];
k = 0;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(0);
  mouseX = width/2;
  mouseY = height/2;
  noFill();

}
function draw(){
  colorMode(HSB, 100);
  b1 = color(k,100,100);
  k+=0.1;
  if (k > 100)
    k = 0;
  colorMode(RGB,255);
  b2 = color(255);
  setGradient(0, 0, width, height, b2, b1, Y_AXIS);

  // if (frameCount % 30 == 0){
  //   if (l.length > 10)
  //     l.splice(0,1);
  //   l.push(new Ball(1))
  // }

  // for (i of l){
  //   i.update();
  // }

}
function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

class Ball{
  constructor(size)
  {
    this.size = size;
    this.x = mouseX;
    this.y = mouseY;
  }
  setX(x){
    this.x = x;
  }
  setY(y){
    this.y = y;
  }
  update(){
    this.size += 2;
    stroke(80,1000000/(this.size * this.size));
    ellipse(this.x,this.y,this.size,this.size)
  }
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
