
/* -----------------------------------------------------------------------
  CANVAS SETUP
  ------------------------------------------------------------------------ */
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


/* -----------------------------------------------------------------------
  PLAYERS
  ------------------------------------------------------------------------ */
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
  scale: 1.8,
  offset: {
    x: 100,
    y: 53
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
    },
    attack1: {
      imageSrc: './assets/characters/fighter1/Attack2.png',
      framesMax: 7
    },
    takeHit: {
      imageSrc: './assets/characters/fighter1/TakeHit.png',
      framesMax: 4
    },
    death: {
      imageSrc: './assets/characters/fighter1/Death.png',
      framesMax: 11
    },
  },
  // offsets are measured from the drawn sprite origin (position - offset)
  weapon: {
    offset: { x: 110, y: 90 },
    width: 185,
    height: 50
  },
  // the box that the opponent's weapon can hit, matched to the drawn idle figure
  hurtbox: {
    offset: { x: 131, y: 113 },
    width: 85,
    height: 92
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
  imageSrc: './assets/characters/fighter2/IdleFaceRight.png',
  framesMax: 8,
  scale: 2.1,
  offset: {
    x: -100,
    y: 53
  },
  sprites: {
    idle: {
      imageSrc: './assets/characters/fighter2/IdleFaceRight.png',
      framesMax: 8,
    },
    run: {
      imageSrc: './assets/characters/fighter2/RunFaceRight.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: './assets/characters/fighter2/JumpFaceRight.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './assets/characters/fighter2/FallFaceRight.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './assets/characters/fighter2/Attack1FaceRight.png',
      framesMax: 5
    },
    takeHit: {
      imageSrc: './assets/characters/fighter2/TakeHitFaceRight.png',
      framesMax: 3
    },
    death: {
      imageSrc: './assets/characters/fighter2/Death.png',
      framesMax: 8
    },
  },
  weapon: {
    offset: { x: 40, y: 103 },
    width: 80,
    height: 50,
  },
  hurtbox: {
    offset: { x: 120, y: 116 },
    width: 67,
    height: 88
  }
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


decreaseTimer()
console.log(decreaseTimer)


/* -----------------------------------------------------------------------
  ANIMATION
  ------------------------------------------------------------------------ */
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  background.update()
  // place.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.07)'
  c.fillRect(0, 0, canvas.width, canvas.height)


  player1.update();
  player2.update();

  player1.velocity.x = 0;
  player2.velocity.x = 0;

  // players always face each other (dead fighters keep the way they fell)
  const player1OnRight =
    player1.hurtbox.x + player1.hurtbox.width / 2 >
    player2.hurtbox.x + player2.hurtbox.width / 2;
  if (!player1.dead) player1.flipped = player1OnRight;
  if (!player2.dead) player2.flipped = player1OnRight;

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
    player2.velocity.x = -6;
    player2.switchSprite('run')
  } else if (keys.ArrowRight.pressed && player2.lastKey === "ArrowRight") {
    player2.velocity.x = 6;
    player2.switchSprite('run')
  } else {
    player2.switchSprite('idle')
  }

  // jump/fall
  if (player2.velocity.y <0) {
    player2.switchSprite('jump')
  } else if (player2.velocity.y > 0) {
    player2.switchSprite('fall')
  }

  // detect intersect player1 & take hit
  if (
    hitIntersect({
      hit1: player1,
      hit2: player2,
    }) &&
    player1.isAttacking && player1.framesCurrent === 3
  ) {
    player2.takeHit()
    player1.isAttacking = false;
    // document.querySelector('#p2hDecrease').style.width = player2.health + '%'
    gsap.to('#p2hDecrease', {
      width: player2.health + '%'
    })
    console.log("player1 attacked");
  }

  // if player1 misses
  if (player1.isAttacking && player1.framesCurrent === 3) {
    player1.isAttacking = false
  }

  // detect intersect player2
  if (
    hitIntersect({
      hit1: player2,
      hit2: player1,
    }) &&
    player2.isAttacking && player2.framesCurrent === 1
  ) {
    player1.takeHit()
    player2.isAttacking = false;
    // document.querySelector('#p1hDecrease').style.width = player1.health + '%'
    gsap.to('#p1hDecrease', {
      width: player1.health + '%'
    })
    console.log("player2 attacked");
  }

  // if player2 misses
  if (player2.isAttacking && player2.framesCurrent === 1) {
    player2.isAttacking = false
  }

  // determin winner
  if (player2.health <= 0 || player1.health <= 0) {
    determineWinner({player1, player2, timerId})
  }
}
animate();


/* -----------------------------------------------------------------------
  EVENT-LISTENERS
  ------------------------------------------------------------------------ */
// eventListeners
window.addEventListener("keydown", (event) => {
  // console.log(event.key)
  if (!player1.dead) {
    switch (event.key) {
      // player1
      case "a":
        keys.a.pressed = true;
        player1.lastKey = "a";
        break;
      case "d":
        keys.d.pressed = true;
        player1.lastKey = "d";
        break;
      case "w":
        player1.velocity.y = -20;
        break;
      // attack
      case " ":
        player1.attack();
        break;
    }
  }

  if (!player2.dead) {
    switch (event.key) {
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
    // attack
    case "ArrowDown":
      player2.attack();
      break;
    }
  }
  // console.log(event.key);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    // player1
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
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
