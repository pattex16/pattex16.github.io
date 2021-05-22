var greenDice;
var redDice;

var r;
var t;


class Triangle{
  constructor(x1,y1,x2,y2,x3,y3){
    this.x1 = x1;
    this.x2 = x2;
    this.x3 = x3;
    this.y1 = y1;
    this.y2 = y2;
    this.y3 = y3;
  }

  setStartingPoint(x,y){
    this.x = x;
    this.y = y;
  }

  update(r,m){
    var v;
    var a;
    var b;

    if (r == 1 || r == 2){
      this.drawDot();
      a = createVector(this.x, this.y);
      b = createVector(this.x1,this.y1);

      v = b.sub(a);

      this.x += v.mult(m).x;
      this.y += v.mult(m).y;
    }

    if (r == 3 || r == 4){
      this.drawDot();
      a = createVector(this.x, this.y);
      b = createVector(this.x2,this.y2);

      v = b.sub(a);
      this.x += v.mult(m).x;
      this.y += v.mult(m).y;
    }

    if (r == 5 || r == 6){
      this.drawDot();
      a = createVector(this.x, this.y);
      b = createVector(this.x3,this.y3);

      v = b.sub(a);
      this.x += v.mult(m).x;
      this.y += v.mult(m).y;
    }

    ellipse(this.x1,this.y1,10,10);
    ellipse(this.x2,this.y2,10,10);
    ellipse(this.x3,this.y3,10,10);

    image(redDice[0],this.x1,this.y1,25,25);
    image(redDice[1],this.x1 + 30,this.y1,25,25);

    image(redDice[2],this.x2,this.y2,25,25);
    image(redDice[3],this.x2 + 30,this.y2,25,25);

    image(redDice[4],this.x3,this.y3,25,25);
    image(redDice[5],this.x3 + 30,this.y3,25,25);
  }

  drawDot(){
    ellipse(this.x,this.y,2,2);
  }
}

function preload(){
  greenDice = [];
  for (let i = 1 ; i <= 6 ; i++)
    greenDice.push(loadImage("green/green" + i + ".png"));

  redDice = [];
  for (let i = 1 ; i <= 6 ; i++)
    redDice.push(loadImage("red/red" + i + ".png"));
}

function setup() {
  createCanvas(600,600);
  background(2*2*16+2);
  noStroke();
  ellipseMode(CENTER);
  t = new Triangle(width/2,height/4,width/4,3*height/4,3*width/4,3*height/4);
  t.setStartingPoint(width/2,height/2);

}

function draw() {
  // background(4*16+2);
  newRoll();
  t.update(r,0.45);
}

function newRoll(){
  r = floor(random(6));
  image(greenDice[r],width/4-50-75,3*width/4+75,50,50);
}
