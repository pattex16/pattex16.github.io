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

    this.drawDot();

    if (r == 0 || r == 1){
      this.x = getPos([this.x,this.y],[this.x1,this.y1])[0];
      this.y = getPos([this.x,this.y],[this.x1,this.y1])[1];
    }

    else if (r == 2 || r == 3){
      this.x = getPos([this.x,this.y],[this.x2,this.y2])[0];
      this.y = getPos([this.x,this.y],[this.x2,this.y2])[1];
    }

    else{
      this.x = getPos([this.x,this.y],[this.x3,this.y3])[0];
      this.y = getPos([this.x,this.y],[this.x3,this.y3])[1];
    }


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

function getPos (start, end){
  var dx = end[0] - start[0];
  var dy = end[1] - start[1];
  return [start[0] + 0.5 * dx, start[1] + 0.5 * dy];
}

var c;
function setup() {
  createCanvas(600,600);
  background(2*2*16+2);
  noStroke();
  ellipseMode(CENTER);
  t = new Triangle(width/2,3*height/4 - height/2 * Math.sin(PI/3),width/4,3*height/4,3*width/4,3*height/4);
  t.setStartingPoint(width/2,height/2);
  c = document.getElementById("count");
}


function draw() {
  newRoll();
  t.update(r,0.45);
  c.innerText = frameCount;
}

function newRoll(){
  r = floor(random(6));
  image(greenDice[r],width/4-50-75,3*width/4+75,50,50);
}
