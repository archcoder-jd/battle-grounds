
// background
class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }

  update() {
    this.draw();
  }
}


// fighters
class Fighter1 {
  constructor({ position, velocity, color = "red" }) {
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
    this.weapon.position.x = this.position.x;
    this.weapon.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
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

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
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