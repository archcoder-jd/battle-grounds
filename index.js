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

// players
const player1 = new PlayerSprite({
  position: {
    x: 400,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const player2 = new EnemySprite({
  position: {
    x: 600,
    y: 200,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

console.log(player1);

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

function determineWinner({player1, player2, timerId}) {
  clearTimeout(timerId)
  document.querySelector('#tie').style.display = 'flex'

  if (player1.health === player2.health) {
      document.querySelector('#tie').innerHTML = 'Tie'
    } else if (player1.health > player2.health) {
      document.querySelector('#tie').innerHTML = 'Player 1 Wins'
    } else if (player2.health > player1.health) {
      document.querySelector('#tie').innerHTML = 'Player 2 Wins'
    }
}

let timer = 10
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0) {
    determineWinner({player1, player2, timerId})
  }
}
decreaseTimer()
console.log(decreaseTimer)

// animation
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player1.update();
  player2.update();

  player1.velocity.x = 0;
  player2.velocity.x = 0;

  // player1
  if (keys.a.pressed && player1.lastKey === "a") {
    player1.velocity.x = -2;
  } else if (keys.d.pressed && player1.lastKey === "d") {
    player1.velocity.x = 2;
  }

  // player2
  if (keys.ArrowLeft.pressed && player2.lastKey === "ArrowLeft") {
    player2.velocity.x = -2;
  } else if (keys.ArrowRight.pressed && player2.lastKey === "ArrowRight") {
    player2.velocity.x = 2;
  }

  // detect intersect
  if (
    hitIntersect({
      hit1: player1,
      hit2: player2,
    }) &&
    player1.isAttacking
  ) {
    player1.isAttacking = false;
    player2.health -= 20
    document.querySelector('#p2hDecrease').style.width = player2.health + '%'
    console.log("player1 attacked");
  }

  if (
    hitIntersect({
      hit1: player2,
      hit2: player1,
    }) &&
    player2.isAttacking
  ) {
    player2.isAttacking = false;
    player1.health -= 20
    document.querySelector('#p1hDecrease').style.width = player1.health + '%'
    console.log("player2 attacked");
  }

  // determin winner
  if (player2.health <= 0 || player1.health <= 0) {
    determineWinner({player1, player2, timerId})
  }
}
animate();

// eventListeners
window.addEventListener("keydown", (event) => {
  // console.log(event.key)
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player1.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player1.lastKey = "a";
      break;
    case "w":
      player1.velocity.y = -20;
      break;
    case " ":
      player1.attack();
      break;

    // player2
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      player2.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      player2.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      player2.velocity.y = -20;
      break;
    case "ArrowDown":
      player2.attack();
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

  // player2
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
