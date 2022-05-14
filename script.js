const dinossauro = document.querySelector('.dinossauro');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dinossauro.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dinossauro.style.bottom = position + 'px';
    }
  }, 20);
}

function createArvore() {
  const arvore = document.createElement('div');
  let arvorePosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  arvore.classList.add('arvore');
  background.appendChild(arvore);
  arvore.style.left = arvorePosition + 'px';

  let leftTimer = setInterval(() => {
    if (arvorePosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(arvore);
    } else if (arvorePosition > 0 && arvorePosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">fim</h1>';
    } else {
      arvorePosition -= 10;
      arvore.style.left = arvorePosition + 'px';
    }
  }, 20);

  setTimeout(createArvore, randomTime);
}

createArvore();
document.addEventListener('keyup', handleKeyUp);
