function setup() {
  createCanvas(512, 512);
  background(255);

  noLoop();
  loadPixels();
  for (let x = 0 ; x < 512*512*4*4 ; x++)
    pixels[x] = random(255);
  updatePixels();
}
function draw() {
}
