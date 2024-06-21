const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const frame = 10;

window.onload = () => {
  document.addEventListener("keydown", keyPush);

  setInterval(game, 1000 / frame); // fps
};

let positionX = 0,
  positionY = 0;
const gridSize = 20,
  tileCount = 20;

let velocityX = 0,
  velocityY = 0;

let appleX = 15;
appleY = 15;

const trails = [];
let score = 1;

function drawSnake() {
  ctx.fillStyle = "lime";
  trails.forEach((tail) => {
    ctx.fillRect(
      tail.x * gridSize,
      tail.y * gridSize,
      gridSize - 2, // -2: 구분선 표시
      gridSize - 2
    );

    // 뱀이 자신 몸에 부딪히면 게임오버
    if (tail.x === positionX && tail.y === positionY) {
      score = 5;
    }
  });

  // 게임이 진행될 때마다 positionXY를 trail 배열에 삽입
  trails.push({
    x: positionX,
    y: positionY,
  });
  // 단 tails 크기는 tailLength를 넘지 않게
  while (trails.length > score) {
    trails.shift();
  }
}

function createApple() {
  // 사과를 먹었을 경우 사과 위치 랜덤으로 생성하기
  if (appleX === positionX && appleY === positionY) {
    // 뱀 길이 늘이기
    score++;
    // 다음 사과 랜덤 위치 정하기
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(
    appleX * gridSize,
    appleY * gridSize,
    gridSize - 2,
    gridSize - 2
  );
}

function game() {
  // 키를 누른 방향으로 계속 이동
  positionX += velocityX;
  positionY += velocityY;

  // 가장자리 처리
  // 좌/우 또는 위/아래 가장자리 위치를 벗어날 경우 반대쪽에서 나타남
  if (positionX < 0) {
    // 죄측 끝
    positionX = tileCount - 1;
  }
  if (positionX > tileCount - 1) {
    //우측 끝
    positionX = 0;
  }
  if (positionY < 0) {
    positionY = tileCount - 1;
  }
  if (positionY > tileCount - 1) {
    positionY = 0;
  }

  // 배경 그리기
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 뱀 그리기
  drawSnake();

  // 사과 그리기
  createApple();
}

function keyPush(event) {
  switch (event.keyCode) {
    case 37: // left
      velocityX = -1;
      velocityY = 0;
      break;
    case 38: // top
      velocityX = 0;
      velocityY = -1;
      break;
    case 39: // right
      velocityX = 1;
      velocityY = 0;
      break;
    case 40: // down
      velocityX = 0;
      velocityY = 1;
      break;
  }
}
