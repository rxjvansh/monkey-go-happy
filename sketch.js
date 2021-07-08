var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var jungle
var gameState="play"
var endState


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  jungle = loadImage("jungle.jpg");


}



function setup() {

  createCanvas(windowWidth, windowHeight)
  background(100);

  var survivalTime = 0;

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1
  ground = createSprite(400, height-60, 900, 1);
  ground.velocityX = -4;
  jungle.x = jungle.width / 2;



  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;



}


function draw() {

  

    imageMode(CENTER);
    image(jungle, width / 2, height / 2, width, height)

  if (gameState==="play"){
   if (ground.x < 0) {
      ground.x = ground.width / 2;
      ground.visible = "false";
    }

    if (keyDown("space")) {
      monkey.velocityY = -12;

    }
    monkey.velocityY = monkey.velocityY + 0.8;

    monkey.collide(ground);
    spawnFood();
    spawnObstacles();

    
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: " + score, 500, 50);

    if (monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach();
      monkey.scale = 0.2
      score=score+2;
    }

    
  if (obstaclesGroup.isTouching(monkey)) {
    
    
    monkey.scale = 0.1
   gameState ="end"
      



  }
drawSprites();
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("Survival Time: " + survivalTime, 100, 50);

}
  if(gameState==="end"){
    textSize(30)
    fill("red")
    text("Game over",250,250)
  }
   
  









}

function spawnFood() {

  if (frameCount % 80 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.velocityX = -5;

    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    banana.addImage(bananaImage);
    banana.scale = 0.09;

    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800, height-90, 10, 40);
    obstacle.velocityX = -6;

    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;

    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}