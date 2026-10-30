// canvas setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

// player physics
const gravity = 0.7;

class PlayerSprite {
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

class EnemySprite {
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

// players
const player = new PlayerSprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const enemy = new EnemySprite({
  position: {
    x: 800,
    y: 200,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

console.log(player);

// controls
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

function hitIntersect({ hit1, hit2 }) {
  return (
    hit1.weapon.position.x + hit1.weapon.width >= hit2.position.x &&
    hit1.weapon.position.x <= hit2.position.x + hit2.width &&
    hit1.weapon.position.y + hit1.weapon.height >= hit2.position.y &&
    hit1.weapon.position.y <= hit2.position.y + hit2.height
  );
}

// animation
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -2;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 2;
  }

  // enemy
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -2;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 2;
  }

  // detect intersect
  if (
    hitIntersect({
      hit1: player,
      hit2: enemy,
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    console.log("player attacked");
  }

  if (
    hitIntersect({
      hit1: enemy,
      hit2: player,
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    console.log("enemy attacked");
  }
}
animate();

// eventListeners
window.addEventListener("keydown", (event) => {
  // console.log(event.key)
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      player.velocity.y = -20;
      break;
    case " ":
      player.attack();
      break;

    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -20;
      break;
    case "ArrowDown":
      enemy.isAttacking = true;
      break;
  }
  // console.log(event.key);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
  }

  // enemy
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
  // console.log(event.key);
});
