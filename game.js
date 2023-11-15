const buttonColours = ["red", "blue", "green", "yellow"];
const wrongSound = new Audio("./assets/sounds/wrong.mp3");
let gamePattern = [];
let userClickedPattern = [];
let heading = $("h1");
let level = 0;

$(document).keydown(function (e) {
  if (heading[0].innerHTML == "Press A Key to Start") {
    nextSequence();
  }
});

function animatePress() {
  $(`#${userChosenColorId}`).addClass("pressed");
  setTimeout(function () {
    $(`#${userChosenColorId}`).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  const randomSound = new Audio(`./assets/sounds/${randomChosenColour}.mp3`);
  $(`#${randomChosenColour}`).fadeOut(300);
  $(`#${randomChosenColour}`).fadeIn(300);
  randomSound.play();
  heading[0].innerHTML = `Level ${level}`;
  gamePattern.push(randomChosenColour);
  console.log(gamePattern, userClickedPattern);
  return gamePattern;
}

const userChosenColor = $("[type]").click(function () {
  userChosenColorId = $(this).attr("id");
  const userChosenSound = new Audio(`./assets/sounds/${userChosenColorId}.mp3`);
  $(`#${userChosenColorId}`).fadeOut(100);
  animatePress();
  $(`#${userChosenColorId}`).fadeIn(100);
  userChosenSound.play();
  userClickedPattern.push(userChosenColorId);
  if (userClickedPattern[gamePattern.length - 1]) {
    checkAnswer();
  }
  console.log(gamePattern, userClickedPattern);
});

function checkAnswer(currentLevel) {
  if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
    console.log("success");
    level++;
    userClickedPattern = [];
    setTimeout(() => {
      nextSequence();
    }, 500);
  } else {
    wrongSound.play();
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    heading[0].innerHTML = "Game Over, Press Any Key to Restart";
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $(document).keydown(function (e) {
      nextSequence();
    });
  }
}
