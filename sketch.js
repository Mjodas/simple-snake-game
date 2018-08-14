let playerSnake;
let playerFood;

function setup() {
  createCanvas(200, 200);
  frameRate(10);
  playerSnake = new snake();
  playerFood = new food();
}

function draw() {
  background(0);
  mapConstraints(playerSnake);
  score();
  playerSnake.eatFood(playerFood);
  playerSnake.move();
  playerSnake.drawSnake();
  playerFood.draw();
}

function score() {
  noStroke();
  fill(255);
  text(playerSnake.score, width - 20, 20);
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    playerSnake.changeDir(0, -1);
  } else if (keyCode == DOWN_ARROW) {
    playerSnake.changeDir(0, 1);
  } else if (keyCode == LEFT_ARROW) {
    playerSnake.changeDir(-1, 0);
  } else if (keyCode == RIGHT_ARROW) {
    playerSnake.changeDir(1, 0);
  }
}

function mapConstraints(snake) {
  if (
    snake.snakeX >= width ||
    snake.snakeX < 0 ||
    snake.snakeY >= height ||
    snake.snakeY <= 0
  ) {
    snake.die();
  }
}

class snake {
  constructor() {
    this.snakeX = 30;
    this.snakeY = 30;
    this.snakeR = 10;
    this.dirX = 0;
    this.dirY = 0;
    this.tail = [];
    this.score = 0;
  }

  //resets the snake
  die() {
    this.score = 0;
    this.tail = [];
    this.snakeX = 30;
    this.snakeY = 30;
    this.dirX = 0;
    this.dirY = 0;
  }

  headOnTail() {
    let head = createVector(this.snakeX, this.snakeY);
    for (let i = 0; i < this.tail.length; i++) {
      if (head == this.tail[i]) {
        this.die();
      }
    }
  }

  move() {
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.score >= 1) {
      this.tail[this.score - 1] = createVector(this.snakeX, this.snakeY);
    }

    this.snakeX = this.snakeX + this.dirX;
    this.snakeY = this.snakeY + this.dirY;
    this.headOnTail();
  }

  drawSnake() {
    fill(100, 255, 100);
    for (var i = 0; i < this.tail.length; i++) {
      ellipse(this.tail[i].x, this.tail[i].y, this.snakeR);
    }
    ellipse(this.snakeX, this.snakeY, this.snakeR);
  }

  eatFood(food) {
    let d = dist(this.snakeX, this.snakeY, food.foodX, food.foodY);
    if (d < food.foodR) {
      this.score = this.score + 1;
      food.respawn();
    }
  }

  changeDir(newX, newY) {
    let speed = 10;
    this.dirX = newX * speed;
    this.dirY = newY * speed;
  }
}

class food {
  constructor() {
    this.foodX = random(width);
    this.foodY = random(height);
    this.foodR = 10;
  }

  //Adjusting the coordinates so that the food dosent spawn on edges of the map.
  respawn() {
    this.foodX = random(10, width - 10);
    this.foodY = random(10, height - 10);
  }

  draw() {
    fill(255, 30, 30);
    ellipse(this.foodX, this.foodY, this.foodR);
  }
}
