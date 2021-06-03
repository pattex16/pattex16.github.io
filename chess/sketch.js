var black = "#68a053"
var white = "#e7eecd"

var pieces;

function preload(){
  pieces = {black : {},white : {}};
  let l = ["pawn","king","bishop","knight","queen","rook"];
  for (f in l){
    pieces.black[l[f]] = loadImage("pieces/black/"+ l[f] +".png");
    pieces.white[l[f]] = loadImage("pieces/white/"+ l[f] +".png");
  }
}

class Grid{
  constructor(w,h){
    this.w = w;
    this.h = h;
  }

  update(){
    this.dx = width / this.w;
    this.dy = height / this.h;
    noStroke();
    for (let x = 0; x < this.w; x++)
      for (let y = 0; y < this.h ; y++){
        if (x % 2 == y % 2)
          fill(black);
        else
          fill(white);
        rect(this.dx*x,this.dy*y,this.dx,this.dy);
      }
  }
}

class Piece{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.g = g;
  }
}

class Pawn extends Piece{
  constructor(x,y){
    super(x,y);
    this.wasMoved = false;
  }
  where(){
    let l = [];
    if (!this.wasMoved)
      l.push([this.x+2,this.y]);
    l.push([this.x+1,this.y]);
    return l;
  }
  update(){
    image(pieces.white.pawn,this.x * width/this.g.w,(-this.y + this.g.h -1) * height/this.g.h,width/this.g.w,height/this.g.h);
  }
}

var g;
var p1;

function setup() {
  createCanvas(512, 512);
  stroke(0);
  g = new Grid(8,8);

  p1 = new Pawn(3,1);
}

function draw() {
  background(255);
  g.update();
  p1.update();
}
