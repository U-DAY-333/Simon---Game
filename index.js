var colors = ["red" , "blue" , "green" , "yellow"];
var level = 1;

var gamePattern = [];
var userPattern = [];

$(".btn").click(function()
{
  var currColor = this.id;
  userPattern.push(currColor);
  playSound(currColor);
  animatePress(currColor);
  if( checkAnswer() ) setTimeout( function (){ nextSequence() } , 1000);
})

function playSound(currColor)
{
  var audio = new Audio ("sounds/" + currColor + ".mp3");
  audio.play();
}

function animatePress(currColor)
{
  $("#" + currColor).addClass("pressed");
  setTimeout(function(){$("#"+currColor).removeClass("pressed"); } , 100);
}

function nextSequence()
{
  $("h1").text("Level " + level);
  var randNum = Math.floor(Math.random()*4);
  var gameColor = colors[randNum];
  gamePattern.push(gameColor);
  $("#" + gameColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(gameColor);
  level++;
}

$("body").keypress(function()
{
    if(level == 1) nextSequence();
})

var i = 0;
function checkAnswer()
{

   if(userPattern[i] != gamePattern[i] )
   {
       $("h1").text("Game Over , Press Any Key To Restart");
       playSound("wrong");
       clearIt(gamePattern);
       clearIt(userPattern);
       i = 0; level = 1;
       return false;
   }
   i++;
   if(userPattern.length == gamePattern.length)
   {
     clearIt(userPattern);
     i = 0;
     return true;
   }
    return false;
}

function clearIt(list)
{
  while(list.length) list.pop();
}
