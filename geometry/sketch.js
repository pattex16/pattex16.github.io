function setup() {
  createCanvas(windowWidth, windowHeight);

  input = createInput();
  input.position(0, 0);

  button = createButton('eval');
  button.position(input.x + input.width, 0);
  button.mousePressed(ev);

  visible = []
  invisible = []
}

//da console:
//visible.push(new Circle(Center,100))


function draw() {
  cls()

  visible = visible
  for (o of visible){
    o.show()
  }
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight)
}

function ev(){
  eval(input.value())
  input.value('')
}
