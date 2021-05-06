const Direction = {
  North: 1,
  South: -1,
  East: 2,
  West: -2
}

class Grid{
  constructor(w,h){
    this.w = w;
    this.h = h;
  }
  draw(){
    stroke(0);
    for (let i = 0; i < this.w; i++)
      line(width / this.w * i, 0, width / this.w * i, height);

    for (let i = 0; i < this.h; i++)
      line(0, height / this.h * i, width, height / this.h * i);
  }
}

class Dot{
  constructor(g,x,y){
    this.x = x;
    this.y = y;
    this.w = g.w;
    this.h = g.h;
  }
  show(){
    fill("#212121");
    rect(this.x * width / this.w, this.y * height / this.h,width / this.w, height / this.h);
  }
}

class Player{
  constructor(g,a,x,y){
    this.x = x;
    this.y = y;
    this.dots = [new Dot(g,this.x-2,this.y),new Dot(g,this.x-1,this.y),new Dot(g,this.x,this.y)];
    document.getElementById("points").innerText=this.dots.length;
    this.g = g;
    this.h = this.g.h;
    this.w = this.g.w;
    this.d = Direction.East;
  }

  keepInBounds(){
    if (this.y >= this.h)
      this.y = 0;
    if (this.y < 0)
      this.y = this.h-1;
    if (this.x >= this.w)
      this.x = 0;
    if (this.x < 0)
      this.x = this.w-1;
  }

  update(){
    switch(keyCode){
      case UP_ARROW:
        if (this.d != Direction.South)
          this.d = Direction.North;
        break;
      case DOWN_ARROW:
        if (this.d != Direction.North)
          this.d = Direction.South;
        break;
      case LEFT_ARROW:
        if (this.d != Direction.East)
          this.d = Direction.West;
        break;
      case RIGHT_ARROW:
        if (this.d != Direction.West)
          this.d = Direction.East;
        break;
    }

    switch (this.d){
      case Direction.North:
        this.y-=1;
        break;
      case Direction.South:
        this.y+=1;
        break;
      case Direction.East:
        this.x+=1;
        break;
      case Direction.West:
        this.x-=1;
        break;
    }

    this.keepInBounds();

    this.dots.push(new Dot(this.g,this.x,this.y));
    this.dots.shift();

    if (this.x == a.x && this.y == a.y){
      this.dots.push(new Dot(this.g,this.x,this.y));
      document.getElementById("points").innerText=this.dots.length-3;
      a.randomize();
      if (this.dots.length >= maxScore)
        maxScore = this.dots.length;
    }

    for (let i = 1; i < this.dots.length-2; i++){
      if (this.x == this.dots[i].x && this.y == this.dots[i].y){
        alert("GAME OVER, score: " + this.dots.length + ", max score: " + maxScore + " press OK to play again!");
        setup();
      }
    }

  }

  show(){
    this.update();
    this.dots.forEach(function(d){d.show()});
    document.getElementById("points").innerText=this.dots.length;
  }
}

class Apple{
  constructor(g){
    this.w = g.w;
    this.h = g.h;
    this.randomize();
  }
  randomize(){
    this.x = floor(random(0,this.w));
    this.y = floor(random(0,this.h));
  }
  show(){
    fill("YELLOW");
    rect(this.x * width / this.w, this.y * height / this.h,width / this.w, height / this.h);
  }
}

class Finger{
  constructor(p){
    this.p = p;
  }
  refresh(){
    this.x = mouseX-width/2;
    this.y = -mouseY+height/2;
  }
  update(){
    this.refresh();
    if (this.y>this.x && this.y>-this.x){
      if (this.p.d != Direction.South)
        this.p.d = Direction.North;
    }
    if (!(this.y>this.x) && this.y>-this.x){
      if (this.p.d != Direction.West)
        this.p.d = Direction.East;
    }
    if (!(this.y>this.x) && !(this.y>-this.x)){
      if (this.p.d != Direction.North)
        this.p.d = Direction.South;
    }
    if (this.y>this.x && !(this.y>-this.x)){
      if (this.p.d != Direction.East)
        this.p.d = Direction.West;
    }
  }
}

var g;
var p;
var f;
var img;
var ats;
var maxScore = 0;

function preload(){
  img = loadImage("./arrows.png");
}

function setup() {
  createCanvas(512, 512);
  g = new Grid(16,16);
  a = new Apple(g);
  p = new Player(g,a,8,8);
  f = new Finger(p);
}

function draw() {
  if (frameCount % 8 == 0){
    background("#8ab4f8");
    g.draw();
    p.show();
    a.show();
    stroke(2*16+1,36);
    line(0,0,width,height);
    line(width,0,0,height);
    
    if (frameCount < 2.5*60){
      tint(255,2550*4/(frameCount));
      image(img,0,0);
    }
  }
  if(mouseIsPressed)
    f.update();
}
