var bk, bkImg;
var rock;
var dragon, dragonImg;
var rocks = [];
var max_rocks = 5;
var score = 0;
var gameOver, resetButton;
var gameOverImg, resetButtonImg;
var gameState = "play";

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;


function preload(){

bkImg = loadImage("images/bk_image.png");
dragonImg = loadImage("images/dragon.png");
gameOverImg =  loadImage("images/gameOver.png");
resetButtonImg =  loadImage("images/resetButton.png");
}

function setup(){
createCanvas(500, 700);

engine = Engine.create();
world = engine.world;


 //background image
 //bk = createSprite(165,485,1,1);
 //bk.addImage(bkImg);
 //bk.scale = 0.5;

 gameOver = createSprite(250, 350);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.3;
 gameOver.visible = false;

 resetButton = createSprite(250, 470);
 resetButton.addImage(resetButtonImg);
 resetButton.scale = 0.5;
 resetButton.visible  = false;
      
//creating balloon     
dragon = createSprite(100,650,20,50);
dragon.addImage(dragonImg);
dragon.scale = 0.2;
if(frameCount % 300 === 0){
for (var i = 0; i < max_rocks; i++){
  rocks.push(new Rock(random(0, 400), random(0,400)));
    }
  } 
}

function draw() {
  background("black");
  Engine.update(engine);
  if(gameState  ===  "play"){
    playerControls();
    for (i = 0; i < max_rocks; i++) {
      rocks[i].display();
      rocks[i].update();
      if(rocks[i].body.position.y > height -10){
        rocks[i].score();
        console.log(score);
      }
      if(collide(rocks[i].body, dragon,60) == true){
        dragon.destroy();
        World.remove(world, rocks[i].body);
        gameState = "end"
      }
      
    }
  }else if(gameState === "end"){
    gameOver.visible = true;
    resetButton.visible = true;
    if(mousePressedOver(resetButton)){
      reset();
    }
  }
  
  fill("red");
  textSize(20);
  text("Score:" + score, 400, 50);
  drawSprites(); 
}

function playerControls(){
  if(keyDown("right") && dragon.x< 450){
    dragon.x += 5;
  }
  if(keyDown("left") && dragon.x > 50){
    dragon.x -= 5;
  }
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}

function reset(){
    gameState = "play"
    resetButton.visible = false;
    gameOver.visible  =  false;
    dragon.visible  = true;
    score = 0;
}