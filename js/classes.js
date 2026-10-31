
// background
class Sprite {
  constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0} }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 8;
    this.offset = offset;
  }

  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    )
  }

  animateFrames() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}


// fighters
class Fighter1 extends Sprite {
  constructor({ position, velocity, color = "red", imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0} }) {
    super({ position, imageSrc, scale, framesMax, offset })

    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.weapon = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 3;
  }

  update() {
    this.draw();
    this.animateFrames();
    this.weapon.position.x = this.position.x;
    this.weapon.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height -66) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

class Fighter2 {
  constructor({ position, velocity, color = "blue" }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.weapon = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100
  }

  draw() {
    // character
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // weapon
    if (this.isAttacking) {
      c.fillStyle = "purple";
      c.fillRect(
        this.weapon.position.x,
        this.weapon.position.y,
        this.weapon.width,
        this.weapon.height,
      );
    }
  }

  update() {
    this.draw();
    this.weapon.position.x = this.position.x - 50;
    this.weapon.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height -66) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}