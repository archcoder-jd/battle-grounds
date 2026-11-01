
// start screen
(function () {
  'use strict';

  const startButton = document.getElementById('startButton');
  const startScreen = document.getElementById('startScreen');
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');

  /* ---------- STARFIELD BACKGROUND ---------- */
  let stars = [];
  const STAR_COUNT = 120;

  function resizeCanvas() {
    const dpr = 1; // keep it chunky: no high-DPI smoothing
    canvas.width = Math.floor(window.innerWidth / 3) * dpr;
    canvas.height = Math.floor(window.innerHeight / 3) * dpr;
    stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.15 + Math.random() * 0.6,
      color: ['#f4f1de', '#ffd166', '#06d6a0', '#ff4d6d'][Math.floor(Math.random() * 4)],
    }));
  }

  function drawStars() {
    ctx.fillStyle = '#0b0a1f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const s of stars) {
      ctx.fillStyle = s.color;
      ctx.fillRect(Math.floor(s.x), Math.floor(s.y), 1, 1);

      s.y += s.speed;
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }
    }

    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  requestAnimationFrame(drawStars);

  /* ---------- START BUTTON ---------- */
  let starting = false;

  function startGame() {
    if (starting) return;
    starting = true;

    startButton.disabled = true;
    startButton.textContent = 'STARTING';
    startScreen.classList.add('is-starting');

    // hook for game
    document.dispatchEvent(new CustomEvent('battlegrounds:start'));

    setTimeout(() => {
      window.location.href = 'game.html';
    }, 400);
  }

  startButton.addEventListener('click', startGame);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') startGame();
  });
})();