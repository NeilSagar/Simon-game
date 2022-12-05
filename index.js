var buttonColors = ['green', 'red', 'yellow', 'blue'];
var randomNumber = 0;

var audioBlue = new Audio("sounds/blue.mp3");
var audioGreen = new Audio("sounds/green.mp3");
var audioRed = new Audio("sounds/red.mp3");
var audioYellow = new Audio("sounds/yellow.mp3");
var audioWrong = new Audio("sounds/wrong.mp3");
var audioLocation;
var nextColor = '';
var sequence = [];
var sequenceIndex = 0;
var level = 0;

// animate and sound function
function animateAndSound(color) {

  $("." + color).toggleClass("pressed");
  setTimeout(function() {
    $("." + color).toggleClass("pressed");
  }, 200);
  audioLocation = "sounds/" + color + ".mp3";
  var audio = new Audio(audioLocation);
  audio.play();
}

function wrong(color) {
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").toggleClass("wrong");
  $("." + color).toggleClass("pressed");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  setTimeout(function() {
    $("body").toggleClass("wrong");
    $("." + color).toggleClass("pressed");
  }, 200);
  sequenceIndex = -1;
  $(".beginRestart").text("Restart");
}

// nextSequence function
function nextSequence() {
  if (sequenceIndex != -1) {
    randomNumber = Math.floor(Math.random() * 4);
    nextColor = buttonColors[randomNumber];
    // console.log(nextColor);
    level++;
    $("h1").text("Level " + level);

    animateAndSound(nextColor);

    sequence.push(nextColor);
    console.log(sequence);
  }
}

// check and action function
function checkAndAct(color) {
  if (sequenceIndex !=-1) {
     if(color===sequence[sequenceIndex])
     {
       animateAndSound(color);
       sequenceIndex++;
     }
     else{
       wrong(color);
     }
  }

  if (sequenceIndex !=-1&&sequenceIndex==sequence.length) {

    sequenceIndex=0;
    return true;
  }
  return false;
}

$("body").on("keydown", function(e) {
  if (e.key == 'A' && sequence.length === 0) {
    nextSequence();
  }
})
$(".beginRestart").click(function(){
  if (sequence.length === 0) {
    nextSequence();
    $(".beginRestart").text("playing...");
  }
  else if(sequenceIndex==-1){
    sequenceIndex=0;
    sequence=[];
    level=0;
    nextColor='';
  }
})

$(".red").click(function() {

  if(checkAndAct("red"))
  setTimeout(nextSequence, 500);

});
$(".green").click(function() {
  if(checkAndAct("green"))
  setTimeout(nextSequence, 500);
});
$(".blue").click(function() {
  if(checkAndAct("blue"))
  setTimeout(nextSequence, 500);
});
$(".yellow").click(function() {
  if(checkAndAct("yellow"))
  setTimeout(nextSequence, 500);
});


  $("body").keydown(function(){
    if(sequenceIndex==-1)
    {
      sequenceIndex=0;
      sequence=[];
      level=0;
      nextColor='';
      $("h1").text("Press A Key to Start");
  }
  })
