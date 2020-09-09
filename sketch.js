var player,  player_running;
var ground, groundImg ,invisibleGround;
var bananaImg;
var obstacleImg;
var obstacleGroup;
var foodGroup;
var score=0;
var count=0;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  groundImg=loadImage("jungle.jpg");
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImg=loadImage("banana.png");
obstacleImg=loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  

 ground = createSprite(200,180,400,400);
  ground.addImage("ground",groundImg);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,375,400,10);
  invisibleGround.visible = false;
  
  obstacleGroup=new Group();
  foodGroup=new Group();
  
  player=createSprite(100,370,20,50);
 player.addAnimation("running",player_running);
  player.scale=0.1;
  
  
  score=0;
    count=0;
  
}

function draw() {
  background(220);
  
  if(gameState===PLAY){
    ground.velocityX = -2; 
   if(keyDown("space")) {
    player.velocityY = -10;
  }
  
  player.velocityY = player.velocityY + 0.8;
       
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  edges=createEdgeSprites();
  player.collide(invisibleGround);
  player.collide(edges[2]);
  spawnObstacles();
  spawnFood();
  
 if(foodGroup.isTouching(player)){
   foodGroup.destroyEach();
   score=score+2;
 }
   switch(score){
   case 10: player.scale=0.12;
   break;
   case 20: player.scale=0.14;
   break;
    case 30: player.scale=0.16;
   break;   
    case 40: player.scale=0.18;
   break; 
   default: break;
   }
    
     
  console.log(count);
  if(obstacleGroup.isTouching(player) ){
    player.scale=0.1;
    if (count<1){
    score=0;
    }
     obstacleGroup.destroyEach();
    
        count=count+1;
  }
    
  
   if(count===2){
        gameState=END;
     
      }
    if(gameState===END)
    {
        
  
      ground.velocityX=0;
          player.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    }
    
    
  }
  
  
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : "+score,300,50);
  if(gameState===END)
  {
  stroke("white");
  textSize(50);
  fill("white");
  text("Game Over",100,100);  
  }
  
}

function spawnFood(){
  if(World.frameCount%120===0){
    var banana=createSprite(400,320,40,10);
    banana.addImage(bananaImg);
    banana.scale=0.07;
    banana.y=Math.round(random(120,200));
    banana.velocityX=-3;
    banana.lifetime=134;
    foodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(World.frameCount % 200 === 0) {
    var obstacle = createSprite(400,350,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.15;
    obstacle.lifetime = 70;
    obstacleGroup.add(obstacle);
    
   obstacle.depth = player.depth;
    player.depth = player.depth + 1;
    
  }
}




