
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