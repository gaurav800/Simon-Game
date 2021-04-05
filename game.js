var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["green", "red", "yellow", "blue"];
var levelCount = 0;
var started = false;

//Waiting for a keystroke to start the game
$(document).on("keydown", function() {
  $(".play-button").slideUp();
  if (!started) {
    $("h1").text("Level " + levelCount);
    setTimeout(nextSequence,1000);
    started = true;
  }
});

//Waiting for user to click the Play Button
$(".play-button").on("click",function(){
  $(".play-button").slideUp();
  if (!started) {
    $("h1").text("Level " + levelCount);
    setTimeout(nextSequence,1000);
    started = true;
  }
});


//User clicking the buttons and the buttons getting stored in the array userClickedPattern
$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  // Checking the asnwer after everytime the user clicks the buttons
  checkAnswer(userClickedPattern.length-1);
});

//Functin for generating CPU clicks
function nextSequence() {
  // Reseting the userClicked Pattern every level
  userClickedPattern = [];

  //Incrementing the game level
  levelCount++;
  $("h1").text("Level " + levelCount);

  // The computer pressing the buttons
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

//Answer checker
function checkAnswer(level){
    if (gamePattern[level]===userClickedPattern[level]){
      console.log("Success");
      console.log(gamePattern.length);
      console.log(userClickedPattern.length);
      if(gamePattern.length===userClickedPattern.length){
        console.log("HHEHEHRHEHHRE");
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }else{
      gameOver();
    }

}

//Game Over display
function gameOver(){
  $("h1").text("Game Over, press any key to restart");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  playSound("wrong");
  resetAll();
}

//Function to reset variables and start the game again
function resetAll(){
  started = false;
  gamePattern=[];
  levelCount=0;
  $(".play-button").text("Play again").slideDown();
}

//Function for playing sounds
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

//Function for user-click animations
function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}
