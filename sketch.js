var PLAY = 1;
var END = 0;
var gameState = PLAY;
var runner, runner_running, runner_collided;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var bulletGroup;
var bulletGroup1;
var astroGroup;
var score=0;
var  restart;
var bgImg,bg,bgsound;
var bulletImg;
var ebulletImg;
var pause;
var dadimg,dad;
localStorage["HighestScore"] = 0;

function preload(){
  dadimg = loadImage("images/dadimg.png");
    runner_running = loadImage("images/supermanreturns.png");
    bulletImg = loadImage("images/b.png");
    ebulletImg = loadImage("images/astronats.png");
    obstacle1 = loadImage("images/spaceship.png");
    obstacle2 = loadImage("images/spaceship3.png");
    obstacle3 = loadImage("images/spaceship4.png");
    obstacle4 = loadImage("images/spaceship3.png");
    obstacle5 = loadImage("images/spaceship4.png");
    obstacle6 = loadImage("images/spaceship.png");
    restartImg = loadImage("images/restartimag.png");
    bgImg = loadImage("images/space.jpg");
    bgsound = loadSound("bgs.mp3");
}

function setup() {
    createCanvas(1000,600);
    bg = createSprite(1000/2,600/2,1000,1000);
    bg.addImage("background",bgImg);
    bg.velocityX = -5;
    bg.x = bg.width/2;

    runner = createSprite(100,600/2,20,50);
    runner.addAnimation("running", runner_running);
    runner.scale = 0.3;
    dad = createSprite(120,1000/2- 130,10,10);
    dad.addImage(dadimg);
    dad.scale = 0.2;

    
    restart = createSprite(1000/2,600/2);
    restart.addImage(restartImg);
    restart.scale = 0.5;
    restart.visible = false;
    
    obstaclesGroup = new Group();
    bulletGroup = new Group();
    bulletGroup1 = new Group();
    astroGroup= new Group();
    score = 0;
}

function draw() {
  background(bgImg);
 
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    bg.velocityX = -(6 + 9*score/100);
    runner.y=mouseY;
    dad.y = mouseY-40;
   
        if( bg.x < 0){
           bg.x =bg.width/2;
           bgsound.play();
        }
        if (keyDown("space")) {
            spawnBullet();
        }
        if (bulletGroup.isTouching(obstaclesGroup)) {
            obstaclesGroup.destroyEach();
            bulletGroup.destroyEach();
        }
   
   spawnObstacles();
   spawnEbullet();
   spawnAstro();

          if(obstaclesGroup.isTouching(runner)|| bulletGroup1.isTouching(runner)|| astroGroup.isTouching(runner)|| bulletGroup .isTouching(astroGroup)){
              gameState = END;
          }
  }

  else if (gameState === END) {
    restart.visible = true;
    bgsound.stop();
    bulletGroup.destroyEach();
    bulletGroup1.destroyEach();
    obstaclesGroup.destroyEach();
    astroGroup.destroyEach();
    runner.velocityY = 0;
    dad.velocityY=0;
    bg.velocityX = 0; 
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    
        if(mousePressedOver(restart)) {
              reset();
        }
  }
  
  drawSprites();

  textSize(25);
  stroke("red");
  strokeWeight(5);
  fill("white");
  text("SCORE: "+ score, width-200,25);
  textSize(25);
  text("HIGH SCORE: "+ localStorage["HighestScore"], 10,25);
    if(frameCount < 100){
         textSize(30);
         text("SAVE ASTRONAUTS AND KILL THE ALIENS", 200,300);
    }
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(1000,random(100,600-100),10,40);
    obstacle.velocityX =  -(6 + 9*score/100);

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
             
    obstacle.scale = 0.2;
    obstacle.lifetime = 1000/obstacle.velocityX;
    obstaclesGroup.add(obstacle);
  }
}


function spawnBullet() {
    var bullet= createSprite(100, 100, 5, 10);
    bullet.addImage(bulletImg);
    bullet.scale = 0.1
    bullet.y =  runner.y - 30;
    bullet.x = runner.x+100;                                           
    bullet.velocityX = 40;
    bullet.lifetime = 1000;
    bulletGroup.add(bullet);
} 


function spawnEbullet() {
  if(frameCount % 10000 === 0 && frameCount > 10000) {
        var bullet= createSprite(1000,random(100,600-100), 20, 10);                                          
        bullet.shapeColor = "yellow";
        bullet.velocityX = -40;
        bullet.lifetime = 1000;
        bulletGroup1.add(bullet);
  } 
}


function spawnAstro() {
  if(frameCount % 150 === 0) {
      var astro= createSprite(1000,random(100,600-100), 20, 10);
      astro.addImage(ebulletImg);                                          
      astro.velocityX =   -(6 + 3*score/100);
      astro.scale = 0.1;
      astro.lifetime = 1000;
      astroGroup.add(astro);
  } 
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  obstaclesGroup.destroyEach();
 
   if(localStorage["HighestScore"]<score){
       localStorage["HighestScore"] = score;
   }

  console.log(localStorage["HighestScore"]);
  text("HighestScore:"+localStorage["HighestScore"],500,100)
  score = 0;

}