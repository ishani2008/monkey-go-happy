
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;
var survivalTime=0;
var bImage,bSprite;
var gameState="play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bImage=loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(400,400);
  bSprite=createSprite(200,200,400,400);
  bSprite.addImage(bImage);
  bSprite.velocityX=-2;
  monkey=createSprite(50,350,20,20);
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1;
  ground=createSprite(200,370,400,20);
  ground.velocityX=-2;
  ground.visible=false;
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
  background("white");
  if (gameState==="play"){
  console.log(monkey.y);
  if (ground.x<200){
    ground.x=ground.width/2;
  }
  if (bSprite.x<200){
    bSprite.x=bSprite.width/2;
  }
 if (keyDown("space")&&monkey.y>328) {
   monkey.velocityY=-10;
 }
  monkey.velocityY=monkey.velocityY+0.8;
  spawnbanana();
  sobstacles();
 
  if (FoodGroup.isTouching(monkey)){
    score=score+2;
    FoodGroup.destroyEach;
  }
  switch(score){
    case 10:monkey.scale=0.12;
      break;
       case 20:monkey.scale=0.14;
      break;
       case 30:monkey.scale=0.16;
      break;
       case 40:monkey.scale=0.18;
      break;
      default:break;
  }
  if (obstacleGroup.isTouching(monkey)){
    monkey.scale=0.08;
    gameState="end";
  }
  }
  if (gameState==="end"){
    bSprite.velocityX=0;
    ground.velocityX=0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
monkey.collide(ground);
 drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime,100,50);
}

function spawnbanana(){
  if (frameCount%80==0){
    banana=createSprite(400,200,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.y=Math.round(random(200,300));
    banana.velocityX=-3;
    banana.lifetime=135;
    FoodGroup.add(banana);
  }
}
function sobstacles(){
  if (frameCount%300==0){
    obstacle=createSprite(400,350,15,15);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-5;
    obstacle.lifetime=80;
    obstacleGroup.add(obstacle);
  }
}





