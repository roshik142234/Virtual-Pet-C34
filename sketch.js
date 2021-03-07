var dog, database, foodS, foodStock;
var dog_img, dog_img1;
var x;

function preload(){
  dog_img = loadImage('dogImg.png');
  dog_img1 = loadImage('dogImg1.png')
}

function setup(){
  createCanvas(500, 500);

  dog = createSprite(250, 300, 10, 10);
  dog.addImage("dog", dog_img);
  dog.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw(){
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("dog", dog_img1);
  }

  textSize(20);
  fill ("black");
  text ("Note: Press UP_ARROW key to feed him milk!", 50, 50);
  
  drawSprites();

  text("Food left: " + foodS, 100, 100);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x == 0){
    x = 0;
  }
  else{
    x = x - 1
  }

  database.ref('/').update({
    Food:x
  })
  
}