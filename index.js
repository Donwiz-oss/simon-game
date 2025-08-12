var color = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var gameLevel = 0;

// button clicks
$(".btn").click(function(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);

    currentButtonSound(userChosenColor);
    colorAnimation(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    userClickedPattern = []; // reset for new level
    gameLevel++;
    $("h1").html("Level " + gameLevel);

    var randomColor = Math.floor(Math.random() * 4);
    var chosenRandomColor = color[randomColor];
    gamePattern.push(chosenRandomColor);
    console.log(gamePattern);

    var animationSpeed = Math.max(100, 520 - (gameLevel * 60));
    $("#" + chosenRandomColor)
        .animate({ opacity: 0 }, animationSpeed)
        .animate({ opacity: 1 }, animationSpeed);
}

$(document).on("keydown", function() {
    if (!started) {
        started = true;
        nextSequence();
    }
});

// check user clicks to game patterns
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("correct");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        new Audio("sounds/wrong.mp3").play();
        $("h1").html("Oops!! You failed!")
        setTimeout(() => {
            startOver()
        }, 2000);
        $(document).on("keydown", function() {
            if (!started) {
                started = true;
                nextSequence();
            }
        })

    };
};

// Sound function
function currentButtonSound(sound) {
    var soundFile = "sounds/" + sound + ".mp3";
    new Audio(soundFile).play();
};

// Color animation
function colorAnimation(key) {
    var activeColor = $("#" + key);
    activeColor.addClass("pressed");
    setTimeout(function(){
        activeColor.removeClass("pressed");
    }, 100);
};

// when player fails 
function startOver() {
    started = false;
    gameLevel = 0;
    gamePattern = [];
    $("h1").html("Press A Key to Start");
};
