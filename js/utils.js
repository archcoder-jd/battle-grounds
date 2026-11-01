
// attacker's weapon box vs defender's hurtbox (both in canvas coordinates)
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










// function hitIntersect({ hit1, hit2 }) {
//   return (
//     hit1.weapon.position.x + hit1.weapon.width >= hit2.position.x &&
//     hit1.weapon.position.x <= hit2.position.x + hit2.width &&
//     hit1.weapon.position.y + hit1.weapon.height >= hit2.position.y &&
//     hit1.weapon.position.y <= hit2.position.y + hit2.height
//   );
// }

// function determineWinner({player1, player2, timerId}) {
//   clearTimeout(timerId)
//   document.querySelector('#tie').style.display = 'flex'

//   if (player1.health === player2.health) {
//       document.querySelector('#tie').innerHTML = 'Tie'
//     } else if (player1.health > player2.health) {
//       document.querySelector('#tie').innerHTML = 'Player 1 Wins'
//     } else if (player2.health > player1.health) {
//       document.querySelector('#tie').innerHTML = 'Player 2 Wins'
//     }
// }

// let timer = 10
// let timerId
// function decreaseTimer() {
//   if (timer > 0) {
//     timerId = setTimeout(decreaseTimer, 1000)
//     timer--
//     document.querySelector('#timer').innerHTML = timer
//   }

//   if (timer === 0) {
//     determineWinner({player1, player2, timerId})
//   }
// }
// decreaseTimer()
// console.log(decreaseTimer)