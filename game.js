
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var flag = false;

var maxScore = 0;

var atleastPlayedOnce = false;

$(document).keypress(function(){
    //alert("keyboard clicked!");
    if(!flag){
        $("#level-title").text("Level " + level);
        nextSequence();
        flag = true;
    }
});


$(".btn" ).click(function() {
  //alert( "one of the four buttons are clicked!" );

  var userChosenColour = $(this).attr("id");

  //alert(userChosenColour);

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);

  //alert(userClickedPattern[0]);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
} );

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        maxScore = Math.max(maxScore,level);
        atleastPlayedOnce = true;
        Startover();
    }
}

function Startover()
{
    if(atleastPlayedOnce){
      $("#previous-score").css("display", "block");
      $("#previous-score").text("Your previous score:"+String(level))
      $("#previous-best").css("display", "block");
      $("#previous-best").text("Your previous best:"+String(maxScore))
      $("#rules").css("display","none");
    }
    level = 0;
    gamePattern = [];
    flag = false;
}

function nextSequence() {
  //alert("call received!");
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
            $("#"+currentColour).removeClass("pressed");
    }, 100);
}