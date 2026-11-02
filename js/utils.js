
/* -----------------------------------------------------------------------
  ATTACK
  ------------------------------------------------------------------------ */
// attacker's weapon box vs defender's hurtbox
function hitIntersect({ hit1, hit2 }) {
  const w = hit1.weapon;
  const body = hit2.hurtbox;
  return (
    w.position.x + w.width >= body.x &&
    w.position.x <= body.x + body.width &&
    w.position.y + w.height >= body.y &&
    w.position.y <= body.y + body.height
  );
}


/* -----------------------------------------------------------------------
  BOUNDARIES
  ------------------------------------------------------------------------ */
function bodyBox(fighter) {
  const left = fighter.position.x - fighter.offset.x + fighter.hurtbox.offset.x;
  const top = fighter.position.y - fighter.offset.y + fighter.hurtbox.offset.y;
  return {
    left, right: left + fighter.hurtbox.width,
    top, bottom: top + fighter.hurtbox.height,
  };
}

// keep fighter's body inside canvas
function keepOnScreen(fighter) {
  const body = bodyBox(fighter);
  if (body.left < 0) fighter.position.x -= body.left;
  else if (body.right > canvas.width) fighter.position.x -= body.right - canvas.width;
}

// prevent overlapping of fighters
function separateFighters(a, b) {
  const boxA = bodyBox(a);
  const boxB = bodyBox(b);

  const overlapX = Math.min(boxA.right, boxB.right) - Math.max(boxA.left, boxB.left);
  const overlapY = Math.min(boxA.bottom, boxB.bottom) - Math.max(boxA.top, boxB.top);
  if (overlapX <= 0 || overlapY <= 0) return;

  const aIsLeft = boxA.left + boxA.right <= boxB.left + boxB.right;
  const [left, right] = aIsLeft ? [a, b] : [b, a];
  const leftBox = aIsLeft ? boxA : boxB;
  const rightBox = aIsLeft ? boxB : boxA;

  // share push
  let pushLeft = overlapX /2;
  let pushRight = overlapX /2;
  const roomLeft = leftBox.left;
  const roomRight = canvas.width - rightBox.right;
  
  if (pushLeft > roomLeft) { pushRight += pushLeft - roomLeft; pushLeft = roomLeft; }
  if (pushRight > roomRight) { pushLeft += pushRight - roomRight; pushRight = roomRight; }

  left.position.x -= pushLeft;
  right.position.x += pushRight;
}

function applyBoundaries(a, b) {
  keepOnScreen(a);
  keepOnScreen(b);
  separateFighters(a, b);
  // refresh hit/hurt boxes so facing & hit detection use corrected positions
  a.updateHitboxes();
  b.updateHitboxes();
}


/* -----------------------------------------------------------------------
  GAME END
  ------------------------------------------------------------------------ */
let gameOver = false
const END_BUTTONS_DELAY = 1500 // menu btns delay

function determineWinner({player1, player2, timerId}) {

  if (gameOver) return
  gameOver = true
  
  clearTimeout(timerId)
  document.querySelector('#tie').style.display = 'flex'

  if (player1.health === player2.health) {
      document.querySelector('#tie').innerHTML = 'Tie'
    } else if (player1.health > player2.health) {
      document.querySelector('#tie').innerHTML = 'Player 1 Wins'
    } else if (player2.health > player1.health) {
      document.querySelector('#tie').innerHTML = 'Player 2 Wins'
    }

    setTimeout(showEndButtons, END_BUTTONS_DELAY)
}

function showEndButtons() {
 const box = document.createElement('div')
 box.id = 'endButtons'

  const rematch = document.createElement('button')
  rematch.className = 'end-btn'
  rematch.type = 'button'
  rematch.textContent = 'REMATCH'
  rematch.addEventListener('click', () => location.reload())

  const menu = document.createElement('button')
  menu.className = 'end-btn'
  menu.type = 'button'
  menu.textContent = 'MENU'
  menu.addEventListener('click', () => {
    location.href = 'index.html'
  })

  box.append(rematch, menu)
  document.querySelector('#outterDiv').appendChild(box)
  rematch.focus()
}

let timer = 60
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