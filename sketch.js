var database; 
var dog, sadDog, happyDog, foodS, foodStock;
var fedTime, lastFed, feed, addFood, foodObj;
function preload()
{
  sadDog = loadImage("images/dogImg1.png");
  happyDog = loadImage("images/dogImg.png");
  
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  foodObj = new Food()
  dog = createSprite(700,300,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  feed = createButton("Feed The Dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood = createButton("Add Food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
}


function draw() {  
background(46,139,87);
  
  //add styles here
 if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
   dog.addImage(happyDog);
 }
 
 drawSprites();
 fill(255,255,254);
 stroke("black");
 text("Food Remaining "+foodS, 180,450);
}
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function writeStock (x) {
  if(x<=0 ){
    x = 0;
  }
else{
  x = x-1;
}
database.ref('/'). update({
  food:x
})
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
