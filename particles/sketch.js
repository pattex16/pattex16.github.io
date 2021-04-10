function train(x,y){
  train.x = x
  train.y = y
  fill(255,0,0)
  noStroke()
  ellipse(x,y,4,4)
}

class Bullet{
  constructor(x,y,force=10000){
    this.number = (Bullet.number++)
    this.x = x
    this.y = y
    this.force = force
    this.error = 10

    this.track = [[x,y]]
  }

  show(track=false){
    noStroke()
    colorMode(HSB,360)
    fill(map(this.force,-20000,20000,0,120),360,360)
    ellipse(this.x,this.y,4,4)

    colorMode(RGB)
    stroke(255,0,255)
    if (track){
      for (let k = 1 ; k < this.track.length ; k++)
        line(this.track[k][0],this.track[k][1],this.track[k-1][0],this.track[k-1][1])

      if (frameCount % 8)
        this.track.push([this.x,this.y])
    }
  }

  positive(){
    if (this.force > 0) return true
    if (this.force < 0) return false
    if (this.force == 0) return true
  }

  update(objs){
    // for (this.o of objs){
    //   if (this.o != undefined){
    //     if (this.o.number != this.number){
    //       if (Math.abs(this.o.x - this.x) <= 10 && Math.abs(this.o.y - this.y) <= 10){
    //         if (this.positive() && !this.o.positive() || !this.positive() && this.o.positive()){
    //           delete objs[objs.indexOf(this.o)]
    //           delete objs[objs.indexOf(this)]
    //         }
    //       }
    //     }
    //   }
    // }
    for (this.o of objs){
      if (this.o != undefined){
        if (this.o.number != this.number){
          this.v1 = createVector(this.x-this.o.x,this.y-this.o.y)
          this.v1.normalize().mult((this.force+this.o.force)/pow(dist(this.x,this.y,this.o.x,this.o.y),2))

          this.x = this.x + this.v1.x
          this.y = this.y + this.v1.y


          if ((this.o.x - this.x < this.error) && (this.o.y - this.y < this.error)){
            // this.force = this.force + this.o.force
            // this.o.force = this.o.force - this.force
          }
        }
      }
    }
    this.x = this.x - Math.abs(this.force)/pow(this.x-width,2)
    this.x = this.x + Math.abs(this.force)/pow(this.x,2)
    this.y = this.y - Math.abs(this.force)/pow(this.y-height,2)
    this.y = this.y + Math.abs(this.force)/pow(this.y,2)
  }
}

function setup() {
  slider = createSlider(-20000,20000,10000,10)
  slider.position(10,10)
  div = createDiv("new particle's power: " + slider.value())
  div.position(slider.x,slider.y+slider.height+10)
  Bullet.number = 0
  createCanvas(windowWidth, windowHeight);
  last_id = 0

  bs = []
  for (let k = 0 ; k < 5 ; k++)
    for (let i = 0 ; i < 5 ; i++)
      bs.push(new Bullet(width/3 + 50 * i,width/3 + 50 * k,10000))

  ellipseMode(RADIUS)
}

function draw() {
  background(255)
  div.html("new particle's power: " + slider.value())
  for (p of bs){
    if (p != undefined){
      p.show()
      p.update(bs)
    }
  }
}

function mouseClicked() {
  bs.push(new Bullet(mouseX,mouseY,slider.value()))
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight)
}
