// variables for road
var road, roadImg;
// variables for enemy
var rng, enmy, enmyImg, enmyX = 0, enmyG, isCrashing = false;
// variables for PC
var PC, PCImg, lane = 2;
// variables for score,lives and game state
var score = 0, lives = 5, gameState = 1;

function preload(){
  // loading some images
  roadImg = loadImage("photos/roadImage.png");
  PCImg = loadImage("photos/PC.png");
  enmyImg = loadImage("photos/NPC.png");
}

function setup() {
  createCanvas(400,655);
  // creating a group for enemies
  enmyG = createGroup();
  // creating the road
  road = createSprite(200,655/2,50,50);
  road.addImage(roadImg);
  // creating the PC
  PC = createSprite(205,580,25,25);
  PC.addImage(PCImg);
}

function spawnCars(){

  // Spawning the cars
  if(frameCount % 60 === 0){

    // Getting a random number to suggest the position of the enemy
    rng = Math.round(random(1,3));

    // Positioning of the enemies
    if(rng === 1){
      enmyX = 125;
    }else 
    if(rng === 2){
      enmyX = 205;
    }else 
    if(rng === 3){
      enmyX = 285;
    }
    
    // creating the enemies
    enmy = createSprite(enmyX,-50,25,25);
    enmy.addImage(enmyImg);
    enmy.velocityY = 5 + score/200;
    enmy.lifetime = 150;
    enmyG.add(enmy);
  };

  // hitting the player indication
  if(enmyG.isTouching(PC)){
    isCrashing = true;
  }else{
    isCrashing = false;
  }

}

function draw() {
  background(200);

  // Game state : play
  if(gameState === 2){
    if(frameCount % 2 === 0){
      score++;
    }

    // calling the function spawnCars to get the enemies
    spawnCars();
  
    // giving the road its velocity so that it will look as if the player is moving
    road.y += 5 + score/200;
    // infinite road
    if(road.y > 500){
      road.y = 200;
    };
  
    // crash
    if(isCrashing === true){
      enmyG.destroyEach();
      score -= 50;
      lives -= 1;
    };
  
    drawSprites();

    // displaying the score and number of lives left
    textAlign(CENTER);
    textSize(30);
    fill("red");
    text("Score : " + score,90,35);

    fill("blue");
    text("Lives : " + lives,60,70);
  }
  
  // start the game
  if(gameState === 1){
    textAlign(CENTER);
    textSize(50);
    fill("black")
    text("CAR RACER",200,300)
    textSize(20);
    text("Press SPACE to start",200,375.5)
  };

  // winning
  if(score === 1000){
    gameState = 3;
    clear();
    textAlign(CENTER);
    textSize(40);
    fill("green");
    text("YOU WIN",200,350);
  }

  // losing
  if(lives === 0){
    gameState = 4;
    clear();
    textAlign(CENTER);
    textSize(40);
    fill("red");
    text("YOU LOST",200,350);

    textSize(20);
    fill("black");
    text("Your score was : " + score,200,385);

  }

}

function keyPressed(){

  // changing the lanes
  if(keyIsDown(LEFT_ARROW) && lane !== 1){
    lane--;
    PC.x -= 80;
  };
  if(keyIsDown(RIGHT_ARROW) && lane !== 3){
    lane++;
    PC.x += 80;
  };

  // starting the game
  if(gameState === 1){
    if(keyCode === 32){
      gameState = 2;
    };

  };

}
