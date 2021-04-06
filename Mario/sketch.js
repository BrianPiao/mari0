var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario, mario_running, mario_collided;
var ground, invisibleGround, groundImage;

var coinGroup, coinImage;
var obstaclesGroup, obstacle2, obstacle1, obstacle3;
var score = 0;
var life = 3;

var  restart;
function preload(){

 mario_running = loadAnimation("Capture1.png","Capture3.png","Capture4.png");
 mario_collided = loadImage("mariodead.png");   
 coinImage = loadImage("coin.png");
 gameOverImage = loadImage("gameOver.png");
 obstacle1Image = loadImage("obstacle1.png");
 obstacle2Image = loadImage("obstacle2.png");
 obstacle3Image = loadImage("obstacle3.png");
 backgImage = loadImage("backg.jpg");
 restartImg = loadImage("restart.png");
  

}
function setup(){
createCanvas(800,400)
ground = createSprite(0,330,1200,10);
ground.x = ground.width / 2

backg = createSprite(0,120,10,10)
backg.addImage(backgImage);

mario = createSprite(width/width+40,height/2,10,10);
mario.addAnimation("running",mario_running);
mario.scale = 0.5
restart = createSprite(300, 140);
restart.addImage(restartImg);

restart.scale = 0.5;

restart.visible = false;

coinGroup = new Group();
obstaclesGroup = new Group();
score = 0;
}

function draw() {
background(0);

textSize(20);
fill(255);
text("Score: " + score, 500, 40);
text("Life: " + life, 500, 60);
drawSprites();
if (gameState === PLAY) {
    if(score >= 0) {
        ground.velocityX = -6;
    } else {
        ground.velocityX = -(6 + 3 * score / 100)
    }


if (keyDown("space") && mario.y >= 320) {
    mario.velocityY = -15;
}

mario.velocityY = mario.velocityY + 0.8
if (backg.x < 0) {
    backg.x = backg.width / 2;
}

mario.collide(ground);
spawnObstacles()
spawnCoin();

if (obstaclesGroup.isTouching(mario)) {
    life = life - 1;
    gameState = END

}
if (coinGroup.isTouching(mario)) {
    score = score + 1;
    coinSound.play();
    coinGroup[0].destroy();
}

 } else if (gameState === END){
restart.visible = true;
text("restart", 280,170 );
mario.addAnimation("collided", mario_collided);


ground.velocityX = 0;
ground.velocityY = 0;
obstaclesGroup.setVelocityXEach(0);

mario.changeAnimation("collided", mario_collided);
mario.scale = 0.35;

obstaclesGroup.setLifetimeEach(-1);
coinGroup.setLifetimeEach(-1);
   
   
    if (mousePressedOver(restart)) {
     // if (life > 0) {
        reset();
     // }
    }
} 

}



function spawnCoin() {
    if (frameCount % 120 === 0){
        var coin = createSprite(900,120,40,10);
        coin.y = Math.round(random(120,220));
        coin.addImage(coinImage);
        coin.scale = 0.1;
        coin.velocityX = -3;
        coin.lifetime = 200
        coin.depth = mario.depth;
        mario.depth = mario.depth + 1

        coinGroup.add(coin);
    }
}

function spawnObstacles() {
    if (frameCount % 60 === 0) { 
        var obstacle = createSprite(600,304,10,40);
        var rand = Math.round(random(1,3));
        switch (rand) {
        case 1:
            obstacle.addImage(obstacle1Image);
            break;
        case 2:
            obstacle.addImage(obstacle2Image);
            break;
        case 3:
            obstacle.addImage(obstacle3Image);
            break;
         }

         obstacle.velocityX = -(6);

         obstacle.scale = 0.2;
         obstacle.lifetime = 300;
         obstaclesGroup.add(obstacle);
    }
}

function reset() {

  gameState = PLAY;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  coinGroup.destroyEach();

  mario.changeAnimation("running", mario_running);
  mario.scale = 0.5;

  score = 0;
 
}
