let input;
let img;

function setup() {
  createCanvas(600,600);
  background(2*16+1);
  textAlign(CENTER);
  fill(255);
  text("insert an image",width/2,height/2);
  input = createFileInput(handleFile);
  input.position(0, 0);
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
    resizeCanvas(img.width / img.height * height , height );
    // w / h = x / height
    // h = w / height * x
    // x = h / w * height
    image(img, 0, 0, width, height);

    loadPixels();


    let d = pixelDensity();
    for (let i = 0; i < d; i++) {
      for (let j = 0; j < d; j++) {
        // loop over
        index = 4 * ((d + j) * width * d + (d + i));
        pixels[index] = pixels[index];
        pixels[index+1] = pixels[index+1]-50;
        pixels[index+2] = pixels[index+2];
        pixels[index+3] = pixels[index+3];
      }
    }

    updatePixels();
  } else {
    img = null;
  }
}
