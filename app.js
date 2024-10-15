const otter = document.getElementById('otter');
const stonesContainer = document.getElementById('stones');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');

let score = 0;
let otterPositionX = 0;

function getRandomPosition() {
  const stonesContainerWidth = stonesContainer.offsetWidth;
  const maxLeft = stonesContainerWidth - 50; // Width of the stones
  return Math.floor(Math.random() * (maxLeft + 1));
}

function createStone() {
  const stone = document.createElement('div');
  stone.classList.add('stone');
  stone.style.left = `${getRandomPosition()}px`;
  stonesContainer.appendChild(stone);

  const fallInterval = setInterval(() => {
    const otterPosition = otter.getBoundingClientRect();
    const stonePosition = stone.getBoundingClientRect();

    if (
      stonePosition.bottom >= otterPosition.top &&
      stonePosition.left >= otterPosition.left &&
      stonePosition.right <= otterPosition.right
    ) {
      score++;
      scoreDisplay.innerText = score;
      stone.remove();
      clearInterval(fallInterval);
      if (score === 5) {
        Swal.fire({
          title: '¡Bien ahí!',
          icon: 'success',
          confirmButtonColor: '#6c5b7b', // Color del botón de confirmación
          confirmButtonText: 'Ok',
          backdrop: `
            rgba(0,0,123,0.4)
            url('confetti.gif')
            left top
            no-repeat
          `,
          customClass: {
            title: 'swal-title',
            content: 'swal-text',
            confirmButton: 'swal-button'
          },
          showCloseButton: true, // Muestra el botón de cerrar
        });
      }
    } else if (stonePosition.bottom >= window.innerHeight) {
      stone.remove();
      clearInterval(fallInterval);
    } else {
      stone.style.top = `${stone.offsetTop + 1.9}px`; // Reduce the falling speed
    }
  }, 20);
}

setInterval(createStone, 1500);

// Move otter
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft') {
    otterPositionX -= 10;
    otter.style.left = `${otterPositionX}px`;
    if (otterPositionX < 0) otterPositionX = 0;
  } else if (event.key === 'ArrowRight') {
    const otterWidth = otter.offsetWidth;
    const gameContainerWidth = gameContainer.offsetWidth;
    const maxRight = gameContainerWidth - otterWidth;
    otterPositionX += 10;
    otter.style.left = `${Math.min(otterPositionX, maxRight)}px`;
    if (otterPositionX > maxRight) otterPositionX = maxRight;
  }
});
