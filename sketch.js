const circles = [];
let img;
const spots = [];

function preload() {
  img = loadImage('holi.png');
}

function setup() {
  createCanvas(360, 400);
  img.loadPixels();
  for (let y = 0; y < img.height; y += 4) {
    for (let x = 0; x < img.width; x += 4) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      if (r < 1 && g < 1 && b < 1) {
        spots.push(createVector(x, y));
      }
    }
  }
}

function draw() {
  frameRate(15)
  background(0);
  //image(img, 0, 0, width, height)
  let count = 0;
  while (count < 15) {
    let cir = newCircle();
    if (cir !== null) {
      circles.push(cir);
    }
    count++;
  }
  for (let c of circles) {
    if (c.growing) {
      if (c.edge()) {
        c.growing = false;
        break;
      } else {
        for (let o of circles) {
          if (c !== o) {
            let d = dist(c.x, c.y, o.x, o.y);
            if (d - 3 <= c.r + o.r) {
              c.growing = false;
              break;
            }
          }
        }
      }
    }
    c.draw();
    c.grow();
  }
}

function newCircle() {
  /* let x = random(width);
   let y = random(height);*/
  let r = floor(random(spots.length));
  let spot = spots[r];
  let x = spot.x;
  let y = spot.y;

  let valid = true;
  for (let c of circles) {
    let d = dist(x, y, c.x, c.y);
    if (d <= c.r) {
      valid = false;
      break;
    }
  }

  if (valid) {
    return new Circle(x, y);
  }

  return null;
}