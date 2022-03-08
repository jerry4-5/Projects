var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

$(document).keypress(function() {
  if (!started) {
    clearArray(gamePattern);
    clearArray(userClickedPattern);
    $("h1").text("Level " + level);
    newSequence();
    started = true;
  }
});



function newSequence() {
  level++;

  $("h1").text("Level " + level);

  var randomNumber = Math.floor((Math.random() * 4));

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}



function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


$(".btn").click(function() {
  var userClickedButton = $(this).attr("id");
  userClickedPattern.push(userClickedButton);
  playSound(userClickedButton);
  animatePress(userClickedButton);
  console.log(userClickedPattern);
  if (gamePattern[userClickedPattern.length - 1] === userClickedPattern[userClickedPattern.length - 1]) {
    newfunc(userClickedPattern.length);
  } else {
    playSound("wrong");
    $("h1").text("Oops! Press any key to start again");
    gameEnd();
    started = false;
    level = 0;
  }
});

function playSound(randomChosenColor) {
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}

function gameEnd() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}


function newfunc(count) {
  if (count === level) {
    clearArray(userClickedPattern);
    setTimeout(function() {
      newSequence();
    }, 1500);
  }
}

function clearArray(array) {
  while (array.length) {
    array.pop();
  }
}
