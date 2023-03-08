class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 1;
    this.growing = true;
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
  }

  grow() {
    if (this.growing) {
      if(this.r<10)
      this.r += 0.05;
    }
  }

  edge() {
    return (this.r + this.x > width || this.x - this.r < 0 || this.r + this.y > height || this.y - this.r < 0);
  }

  draw() {
    stroke(this.red,this.green,this.blue);
    noFill();
    ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
  }
}