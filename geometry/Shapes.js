function range(start,end,step=1){
  t = []
  if (end == null){
    end = start
    start = 1
  }
  if ( ((end > start) & (step > 0)) | ((end < start) & (step < 0)))
    for (let i = start; i< end;  i+=step)
      t.push(i)
  return t
}

function grt(a,b){
  return (a>=b) ? a : b
}

function sml(a,b){
  return (a<=b) ? a : b
}

m = {
  x : function() {return mouseX-width/2},
  y : function() {return -mouseY+height/2}
}

class Point{
  constructor(x,y){
    this.type = "Point"
    this.x = x
    this.y = y
  }
  update(x=this.x,y=this.y){
    this.x = x
    this.y = y
  }
  distance(shape){
    if (shape.type == "Segment" | shape.type == "Line"){
      let l = shape
      return this.distance(l.getPerp(new Point(this.x,this.y)).intersect(l))
    }
    else if (shape.type == "Point"){
      let p = shape
      return Math.sqrt( (this.x - p.x)*(this.x - p.x) + (this.y - p.y)*(this.y - p.y))
    }
  }
  isCloserThan(p,d){
    if (this.distance(p) <= d)
      return true
    else
      return false
  }
  isAligned(p1,p2,error=0.00001){
    if (((p1.x - p2.x <= error) | (p2.x - p1.x <= error)) & ((p1.x - this.x <= error) | (this.x - p1.x <= error)))
      return true
    else{
      if (((p2.y-p1.y)/(p2.x-p1.x) - (p1.y-this.y)/(p1.x-this.x) <= error) | (p1.y-this.y)/(p1.x-this.x) - ((p2.y-p1.y)/(p2.x-p1.x) <= error))
        return true
      else
        return false
    }
  }
  isCongruent(p,error=0.00001){
    if ((this.x - p.x <= error | p.x - this.x <= error) & (this.u - p.y <= error | p.y - this.y <= error) )
      return true
    else
      return false
  }
  belongsTo(shape,error=0.00001){
    let result = false
    switch (shape.type){
      case "Segment":
        let s = shape
        if ((this.y - s.getPointAt(this.x).y <= error) | (s.getPointAt(this.x).y - this.y  <= error))
          result= true
        else
          result= false
        break
      case "Line":
        let l = shape
        if ((this.y - l.getPointAt(this.x).y <= error) | (l.getPointAt(this.x).y - this.y <= error))
          result= true
        else
          result= false
        break
      default:
        result = false
        break
    }
    return result
  }
  show(tag=false,col=[255,0,0,255],size=5){
    fill(col[0],col[1],col[2],col[3])
    noStroke()
    ellipse(this.x + width/2 , -1* this.y + height/2 ,size,size)
    if (tag){
      textAlign(LEFT)
      textSize(size * 2 + "px")
      noStroke()
      fill(col[0],col[1],col[2],col[3])
      text("(" + this.x + ";" + this.y + ")",this.x + width/2, -this.y + height/2)
    }
  }
}

Center = new Point(0,0)

class Segment{
  constructor(p1,p2){
    this.type = "Segment"
    this.p1 = p1
    this.p2 = p2
    this.calculate()
  }
  update(p1=this.p1,p2=this.p2){
    this.p1 = p1
    this.p2 = p2
    this.calculate()
  }
  translate(v){
    this.p1.x = this.p1.x + v.x
    this.p2.x = this.p2.x + v.x
    this.p1.y = this.p1.y + v.y
    this.p2.y = this.p2.y + v.y
    this.update()
  }
  rotate(p,theta){
    //TODO
    this.update()
  }
  calculate(){
    this.y2 = grt(this.p1.y,this.p2.y)
    this.y1 = sml(this.p1.y,this.p2.y)
    this.x2 = grt(this.p1.x,this.p2.x)
    this.x1 = sml(this.p1.x,this.p2.x)
    this.mx = (this.p1.x + this.p2.x)/2
    this.my = (this.p1.y + this.p2.y)/2
    this.len = this.p1.distance(this.p2)
    this.isParallelToY = (this.x1 == this.x2) ? true : false
    this.isParallelToX = (this.y1 == this.y2) ? true : false
    if (this.isParallelToY){
      this.m = Infinity
      this.q = undefined
      this.theta = Math.PI/2
    }
    else
      this.m = (this.p2.y-this.p1.y)/(this.p2.x-this.p1.x)
    this.q = this.p1.y - (this.m * this.p1.x)
    this.theta = Math.atan(this.m)
  }
  getMidpoint(){
    this.calculate()
    return new Point(this.mx,this.my)
  }
  getParallel(p){
    return new Line(p,this.theta)
  }
  getPerp(p){
    if (this.m == 0)
      return new Line(p,Math.PI/2)
    else if (this.m == Math.PI/2)
      return new Line(p,0)
    else
      return new Line(p,Math.atan(-1/this.m))
  }
  getAx(){
    return this.getPerp(this.getMidpoint())
  }
  belongsTo(l){
    if ((l.m == this.m) & (l.q == this.q))
      return true
    else
      return false
  }
  show(showPoints=false,col=[0,0,0,255],size=2,tag=false){
    stroke(col[0],col[1],col[2],col[3])
    strokeWeight(size)
    line(this.p1.x+width/2,-this.p1.y+height/2  ,this.p2.x+width/2, -this.p2.y+height/2)
    if (showPoints){
      this.p1.show()
      this.p2.show()
    }
    if (tag){
      textAlign(LEFT)
      textSize(size * 5 + "px")
      noStroke()
      fill(col[0],col[1],col[2],col[3])
      text("lenght:" + this.len + "\ntheta:" + this.theta,this.mx + width/2, -this.my + height/2)
    }
  }
  getPointAt(x){
    return new Point(x,this.m * x + this.q)
  }
  isParallel(l){
    if (this.m == l.m)
      return true
    else
      return false
  }
  getAngleBetween(l){
    undefined
  }
  intersect(shape){
    let l = shape
    let x = (l.q - this.q)/(this.m-l.m)
    if (this.isParallel(l))
      return undefined
    else{
      if (this.isParallelToY & !l.isParallelToY)
        return l.getPointAt(this.p1.x)
      if (l.isParallelToY & !this.isParallelToY)
        return this.getPointAt(l.p1.x)
      else
        return new Point(x,this.getPointAt(x).y)
    }
  }
  makeLine(){
    return new Line(this.p1,this.theta)
  }
}

class Line extends Segment{
  constructor(p,theta){
    var width = 1920
    var height = 1080
    if ((Math.PI/2) == theta  | -(Math.PI/2) == theta){
      var p1 = new Point( p.x,height/2)
      var p2 = new Point( p.x,-height/2)
    }
    else {
      let m = Math.tan(theta)
      let q = p.y - (m * p.x)
      var p1 = new Point( -width/2, m * -width/2 + q )
      var p2 = new Point( width/2, m * width/2 + q )
    }
    super(p1,p2)
    this.type = "Line"
  }
  getMidpoint(){
    return undefined
  }
}

class Triangle{
  constructor(p1=new Point(0,0),p2=new Point(0,0),p3=new Point(0,0)){
    this.type = "Triangle"
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
    this.l1 = new Segment(this.p1,this.p2)
    this.l2 = new Segment(this.p2,this.p3)
    this.l3 = new Segment(this.p3,this.p1)
    this.calculate()
  }
  calculate(){
    this.perimeter = this.l1.len + this.l2.len + this.l3.len
    let p = this.perimeter/2
    this.area = Math.sqrt( p * (p-this.l1.len) * (p-this.l2.len) * (p-this.l3.len))
    this.equilateral = this.isEquilateral()
    this.isosceles = this.isIsosceles()

    this.m1 = new Segment(this.p1,this.l2.getMidpoint())
    this.m2 = new Segment(this.p2,this.l3.getMidpoint())
    this.m3 = new Segment(this.p3,this.l1.getMidpoint())

    this.a1 = new Segment(this.l1.getMidpoint(), this.getCircumcenter())
    this.a2 = new Segment(this.l2.getMidpoint(), this.getCircumcenter())
    this.a3 = new Segment(this.l3.getMidpoint(), this.getCircumcenter())

    this.h1 = new Segment(this.p1,this.l2.getPerp(this.p1).intersect(this.l2))
    this.h2 = new Segment(this.p2,this.l3.getPerp(this.p2).intersect(this.l3))
    this.h3 = new Segment(this.p3,this.l1.getPerp(this.p3).intersect(this.l1))

  }
  translate(v){
    this.p1.x = this.p1.x + v.x
    this.p2.x = this.p2.x + v.x
    this.p3.x = this.p3.x + v.x
    this.p1.y = this.p1.y + v.y
    this.p2.y = this.p2.y + v.y
    this.p3.y = this.p3.y + v.y
    this.calculate()
  }
  getGravity(){
    return new Point((this.p1.x + this.p2.x + this.p3.x) / 3 ,(this.p1.y + this.p2.y+this.p3.y)/3)
  }
  getCircumcenter(){
    return this.l1.getAx().intersect(this.l2.getAx())
  }
  getOrtho(){
    return this.h1.intersect(this.h2)
  }
  isIsosceles(error=0.00001){
    if ((this.l1.len - this.l2.len <= error | this.l2.len - this.l1.len <= error)| (this.l2.len - this.l3.len <=error | this.l3.len - this.l2.len <=error) | (this.l3.len - this.l1.len <= error | this.l1.len - this.l3.len <= error))
      return true
    else
      return false
  }
  isEquilateral(error=0.00001){
    if ((this.l1.len - this.l2.len <= error | this.l2.len - this.l1.len <= error) & (this.l2.len - this.l3.len <=error | this.l3.len - this.l2.len <=error))
      return true
    else
      return false
  }
  show(paint=false,paintCol=[255,0,0,86],showPoints=false,col=[0,0,0,255],size=2,tag=false,lineTag=false){
    if (paint){
      fill(paintCol[0],paintCol[1],paintCol[2],paintCol[3])
      stroke(col[0],col[1],col[2],col[3])
      strokeWeight(size)
      triangle( this.p1.x + width/2 , -this.p1.y + height/2,this.p2.x + width/2 , -this.p2.y + height/2, this.p3.x + width/2 , -this.p3.y + height/2)
    }
    else {
      this.l1.show(showPoints,col,size,lineTag)
      this.l2.show(showPoints,col,size,lineTag)
      this.l3.show(showPoints,col,size,lineTag)
    }
    if (tag){
      this.calculate()
      textAlign(LEFT)
      textSize(size * 5 + "px")
      noStroke()
      fill(col[0],col[1],col[2],col[3])
      text("perimeter:" + this.perimeter + "\narea:" + this.area,this.getGravity().x + width/2, -this.getGravity().y + height/2)
    }
  }
}

Axis = {
  x : new Line(Center,0),
  y : new Line(Center,Math.PI/2),
  show : function(){this.x.show(false,[255,0,0,255]);this.y.show(false,[0,0,255,255])}
}
function cls(){
  background(255)
  stroke(0)
  noFill()
  strokeWeight(2)
  Axis.show()
}

class Circle{
  constructor(c=Center,r=0){
    this.c = c
    this.r = r
    this.update()
  }
  update(c=this.c,r=this.r){
    this.type = "Circle"
    this.c = c
    this.r = r
    this.d = 2 * this.r
    this.circ = this.d * Math.PI
    this.area = this.r * this.r * Math.PI
    this.error = 0.00001
    if (this.r - this.error <= 0 | this.error - this.r <=0){
      this.isUndefined = true
      return new Point(this.c.x,this.c.y)
    }
  }
  compass(p,t){
    this.r = t.distance(p)/2
    this.c = new Segment(t,p).getMidpoint()
    this.update()
  }
  intersect(shape){
    if (shape.type == "Segment" | shape.type == "Line"){
      let l = shape
      let x1 = (-l.q*l.m)*(-Math.sqrt(l.q*l.q*l.m*(l.m-1) - l.q*l.q + this.r*this.r*(l.m + 1) )/(l.q + 1))
      let x2 = (-l.q*l.m)*(Math.sqrt(l.q*l.q*l.m*(l.m-1) - l.q*l.q + this.r*this.r*(l.m + 1) )/(l.q + 1))
      let points = [new Point(x1,l.getPointAt(x1)).y, new Point(x1,l.getPointAt(x2)).y]
      return points
    }
  }
  show(paint=false,paintCol=[255,0,0,86],showPoints=false,col=[0,0,0,255],size=2,tag=false){
    ellipseMode(RADIUS)
    if (paint)
      fill(paintCol[0],paintCol[1],paintCol[2],paintCol[3])
    else
      noFill()
    if (showPoints)
      c.show(tag,col)
    strokeWeight(size)
    stroke(col[0],paintCol[1],paintCol[2],paintCol[3])
    ellipse(this.c.x + width/2, -this.c.y + height/2, this.r,this.r)
    if (tag){
      textAlign(LEFT)
      textSize(size * 2 + "px")
      noStroke()
      fill(col[0],col[1],col[2],col[3])
      text("circ: " + this.circ + "\narea:" + this.area,this.c.x + width/2, -this.y + height/2 + size * 4)
    ellipseMode(CENTER)
    }
  }
}
