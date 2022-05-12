var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600, windowWidth,);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 6;


  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.4;
  ghost.addImage("ghost", ghostImg);
  
  
}

function draw() {
  background(0);

  if (gameState === "play") {
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 5;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 5;
    }
    
    
    ghost.velocityY = ghost.velocityY + 0.3;
    spawnDoors();

    edges= createEdgeSprites();
    ghost.collide(edges);

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }

    drawSprites();
  }
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  
}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 60 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15,climber.width,2);
    invisibleBlock.visible = false;
    door.x = Math.round(random(100,360));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 6;
    climber.velocityY = 6;
    invisibleBlock.velocityY = 6;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    //invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}