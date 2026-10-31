// canvas setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 928;
canvas.height = 597;

c.fillRect(0, 0, canvas.width, canvas.height);

// players physics
const gravity = 0.7;

// background
const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './assets/background/background2.png'
})

// place
const place = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './assets/background/background2.png',
  scale: 2,
  framesMax: 6
})


// players
const player1 = new Fighter1({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: './assets/characters/fighter1/Idle.png',
  framesMax: 11,
  scale: 2,
  offset: {
    x: 100,
    y: 80
  },
  sprites: {
    idle: {
      imageSrc: './assets/characters/fighter1/Idle.png',
      framesMax: 11,
    },
    run: {
      imageSrc: './assets/characters/fighter1/Run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: './assets/characters/fighter1/Jump.png',
      framesMax: 3
    },
    fall: {
      imageSrc: './assets/characters/fighter1/Fall.png',
      framesMax: 3
    }
  }
});

const player2 = new Fighter2({
  position: {
    x: 600,
    y: 0,
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

  background.update()
  // place.update()

  player1.update();
  player2.update();

  player1.velocity.x = 0;
  player2.velocity.x = 0;

  // player1 movement
  if (keys.a.pressed && player1.lastKey === "a") {
    player1.velocity.x = -5;
    player1.switchSprite('run')
  } else if (keys.d.pressed && player1.lastKey === "d") {
    player1.velocity.x = 5;
    player1.switchSprite('run')
  } else {
    player1.switchSprite('idle')
  }

  // jump/fall
  if (player1.velocity.y <0) {
    player1.switchSprite('jump')
  } else if (player1.velocity.y > 0) {
    player1.switchSprite('fall')
  }

  // player2 movement
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
