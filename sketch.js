var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running;

var obstacle, obstacleImage, obstacleImage2, obstacleImage3, obstacleGroup;

var sun, sunImage;

var cloud, cloudImage, cloudGroup;

var score = 0;

var Background, BackgroundImage, invisibleGround;

var gameOver, gameOverImage, restart, restartImage;

function preload(){
  
 trex_running = loadImage("trex_Running0.png");
  
 obstacleImage = loadImage("Cactus.png");
 obstacleImage2 = loadImage("Cactus2.png");
 obstacleImage3 = loadImage("Cactus3.png");
  
 sunImage = loadImage("Sun0.png");
  
 cloudImage = loadImage("cloud0.png");
  
 BackgroundImage = loadImage("background0.png"); 
  
 gameOverImage = loadImage("gameOverImage.png");
 restartImage = loadImage("Reset_Button0.png"); 
 
}

function setup(){
  
 createCanvas(windowWidth, windowHeight);
 
 Background = createSprite(250, 250, windowWidth, windowHeight); 
 Background.addImage(BackgroundImage);
 Background.scale = 10;
 Background.velocityX = -3;  
  
 trex = createSprite(50, 450, 10, 10);
 trex.addImage(trex_running);
 trex.scale = 0.25; 
 //trex.debug = true; 
  
 sun = createSprite(550, 100, 10, 10);
 sun.addImage(sunImage); 
 sun.scale = 0.5; 
  
 invisibleGround = createSprite(300, 500, 1000, 10); 
 invisibleGround.visible = false; 
  
 gameOver = createSprite(windowHeight-200, windowWidth-550, 10, 10); 
 gameOver.addImage(gameOverImage);
 gameOver.scale = 0.5;
 gameOver.visible = false; 
  
 restart = createSprite(windowHeight-200, windowWidth-475, 10, 10);
 restart.addImage(restartImage); 
 restart.scale = 0.45;
 restart.visible = false; 
  
 trex.setCollider("circle",0,0,100); 
  
 obstacleGroup = new Group();
 cloudGroup = new Group(); 
  
}

function draw(){
  
 background("lightblue");
  
 text("Score: "+ score, 100,50);
 
 if(gameState === PLAY){
  
   score = score + Math.round(getFrameRate()/60);
    Background.velocityX = -(6 + 3*score/100);
   
  trex.velocityY = trex.velocityY + 1.2; 
   
  if((keyDown("space") && trex.y >= 449) || touches.length > 0) {
    
      trex.velocityY = -20;
    
      touches = [];        
    
  } 
   
   
   if (Background.x < 0){
      Background.x = Background.width/2;
    }
   
   
  trex.collide(invisibleGround); 
  
  spawnClouds();
  spawnObstacles(); 
   
   
 }
  
  if(obstacleGroup.isTouching(trex)){
    
        gameState = END;
    
    
  }
  
   else if (gameState === END) {
     
    gameOver.visible = true;
    restart.visible = true;
    
    Background.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart) || touches.length > 0) {
      
      reset();
      
      touches = [];
      
    }
  
   }
  
 drawSprites(); 
  
}

function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    
    var cloud = createSprite(650,120,40,10);
    cloud.y = Math.round(random(100,400));
    cloud.addImage(cloudImage);
    cloud.scale = 0.75;
    cloud.velocityX = -3;
     
    cloud.lifetime = 300;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  
  if(frameCount % 60 === 0) {
    
    var obstacle = createSprite(600,445,10,40);
    obstacle.setCollider("circle",0,0,40);
    //obstacle.debug = true;
    
    obstacle.velocityX = -(6 + 3*score/100);
    
    var rand = Math.round(random(1,6));
    switch(rand) {
        
      case 1: obstacle.addImage(obstacleImage);
              break;
      case 2: obstacle.addImage(obstacleImage2);
              break;
      case 3: obstacle.addImage(obstacleImage3);
              break;
     
      
    
    }

    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
    
  }

}

function reset() {
  
 gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  score = 0;
  
}