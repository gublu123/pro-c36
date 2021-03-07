var dog,sadDog,happyDog;

var foodObj, addFoods, foodS = 0;

var database;

var fedTime, lastFed;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  foodObj = new Food(80, 100);

}

function draw() {
  background(46,139,87);

  foodObj.display();

  drawSprites();
}

//function to read food Stock


//function to update food stock and last fed time
function feedDog()
{
  dog.addImage(happyDog);

  if(foodObj.getFoodStock() <= 0)
  {
    foodObj.upateFoodStock(foodObj.getFoodStock()*0);
  }
  else
  {
    foodObj.upateFoodStock(foodObj.getFoodStock()-1);
  }

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
}

//function to add food in stock
function addFoods()
{
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}