let canvas;
canvas = document.getElementById("desktopTouchGameCanvas");

// Check if the Screen Orientation API is available
if (window.screen.orientation && window.screen.orientation.lock) {
    // Lock the screen orientation to landscape
    window.screen.orientation.lock("landscape").catch((err) => {
        console.warn("Orientation lock failed:", err.message);
        // alert("Please rotate your device to landscape for the best experience.");
    });
} else {
    // Fallback for older browsers
    alert("Please rotate your device to landscape for the best experience.");
}

// Optional: Add an event listener to alert the user when orientation changes
window.addEventListener("orientationchange", () => {
    if (window.orientation !== 90 && window.orientation !== -90) {
        alert("This game works best in landscape mode. Please rotate your device.");
    }
});

var drawingSurface = canvas.getContext("2d");

// Dynamically resize the canvas to match its container
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();


// Button Elements
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");
const btnJump = document.getElementById("btn-jump");
const btnRestart = document.getElementById("btn-restart");

// Function to toggle button visibility based on the current stage
function updateButtonVisibility(stage) {
    if (stage === 0 || stage === 5) {
        // Show Restart Button, Hide Navigation Buttons
        btnRestart.style.display = "block";
        btnLeft.style.display = "none";
        btnRight.style.display = "none";
        btnJump.style.display = "none";
    } else if (stage >= 1 && stage <= 4) {
        // Show Navigation Buttons, Hide Restart Button
        btnRestart.style.display = "none";
        btnLeft.style.display = "block";
        btnRight.style.display = "block";
        btnJump.style.display = "block";
    }
}

var spriteObject =
{
    x: 0,
    y: 0,
    width: 100,
    height: 40
};

var ground = 320;
var shape1 = Object.create(spriteObject);
shape1.x = 20;
shape1.y = ground - 40;
shape1.width = 40;
shape1.height = 40;
shape1.vx = 3;
shape1.vy = 0;
shape1.isOnGround = true;
shape1.jumpForce = -12;

const framerate = 30;
let lastSwitchTime = 0;
let currentImage = 1;

var bomb = new Array

for (i = 1; i < 7; i++) {
    bomb[i] = Object.create(spriteObject);
    bomb[i].x = 0;
    bomb[i].y = ground - 28;
    bomb[i].width = 30;
    bomb[i].height = 33;
}


var image1 = new Image();
image1.src = "img/Bpanda06.png";
var imageW1 = new Image();
imageW1.src = "img/BabyPandaWalk01.png";
var imageW2 = new Image();
imageW2.src = "img/BabyPandaWalk02.png";
var image2 = new Image();
image2.src = "img/bomb.png";
var image3 = new Image();
image3.src = "img/arrow.png";
var scene0 = new Image();
scene0.src = "img/stage0.jpg";
var scene1 = new Image();
scene1.src = "img/stage1.jpg";
var scene2 = new Image();
scene2.src = "img/stage2.jpg";
var scene3 = new Image();
scene3.src = "img/stage3.jpg";
var scene4 = new Image();
scene4.src = "img/stage4.jpg";
var scene5 = new Image();
scene5.src = "img/stage5.jpg";


var myAudio = new Audio();
myAudio.src = "sounds/expl.mp3";
var myMusic = new Audio();
myMusic.src = "sounds/PandaGameMusic1.mp3";
var myVictory = new Audio();
myVictory.src = "sounds/victory.wav";
let hasPlayed = false;


var face = true;
var stage = 1;

var RIGHT = 39;
var LEFT = 37;
var SPACE = 32;

var moveLeft = false;
var moveRight = false;
var jump = false;


// Event Listeners for Desktop with touch layout
// Event Listener for Left Button
document.getElementById('btn-left').addEventListener('touchstart', () => {
    moveLeft = true;
});

document.getElementById('btn-left').addEventListener('touchend', () => {
    moveLeft = false;
});

// Event Listener for Right Button
document.getElementById('btn-right').addEventListener('touchstart', () => {
    moveRight = true;
});

document.getElementById('btn-right').addEventListener('touchend', () => {
    moveRight = false;
});

// Event Listener for Jump Button
document.getElementById('btn-jump').addEventListener('touchstart', () => {
    jump = true;
});

document.getElementById('btn-jump').addEventListener('touchend', () => {
    jump = false;
});

//Add keyboard listeners
window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {

        case LEFT:
            moveLeft = true;
            break;

        case RIGHT:
            moveRight = true;
            break;

        case SPACE:
            jump = true;
            break;
    }
}, false);

window.addEventListener("keyup", function (event) {
    switch (event.keyCode) {

        case LEFT:
            moveLeft = false;
            break;

        case RIGHT:
            moveRight = false;
            break;

        case SPACE:
            jump = false;
            break
    }
}, false);

document.addEventListener('keydown', function (event) {
    if (event.key === 'F5' || (event.metaKey && event.key === 'r')) {
        event.preventDefault(); // Prevent default refresh
        location.reload(); // Refresh the page
    }
});

// Event listener for Restart Button
btnRestart.addEventListener("click", () => {
    // Reload the page to restart the game
    location.reload();
});


update();

function update(timestamp) {


    requestAnimationFrame(update);

    resizeCanvas();

    // Update button visibility
    updateButtonVisibility(stage);

    if (face == true) {
        if (moveLeft && !moveRight) {
            shape1.vx = -3;
        }

        if (moveRight && !moveLeft) {
            shape1.vx = 3;
        }

        if (!moveLeft && !moveRight) {
            shape1.vx = 0;
            shape1.gravity = 0.3;
        }

        if (jump && shape1.isOnGround == true) {
            shape1.vy += shape1.jumpForce;
            shape1.isOnGround = false;
        }

        shape1.x = shape1.x + shape1.vx;
        shape1.y = shape1.y + shape1.vy;

        if (shape1.isOnGround == false) {
            shape1.vy += shape1.gravity;
        }

        if (stage > 0 && stage < 5) {
            if (shape1.x + shape1.width > canvas.width) {
                shape1.x = 0;
                stage++;
            }
        }

        if (stage == 5) {
            if (shape1.x + shape1.width > canvas.width) {
                shape1.x = canvas.width - shape1.width;
            }
        }

        if (shape1.x < 0) {
            shape1.vx = 0;
        }

        if (shape1.y + shape1.height > ground) {
            shape1.y = ground - shape1.height;
            shape1.isOnGround = true;
        }

        if (shape1.y < 0) {
            shape1.y = 0;
        }

    }

    // Scenery per stage 
    if (stage == 0) {
        drawingSurface.drawImage(scene0, 0, 0, canvas.width, canvas.height);
        drawingSurface.font = "bold 30px Trebuchet MS";
        drawingSurface.fillStyle = "#FFD700";
        drawingSurface.fillText("Game Over!", 340, 160);
        drawingSurface.fillText("Press F5 to play again.", 262, 200);
        drawingSurface.shadowColor = "rgba(0, 0, 0, 1)";
        drawingSurface.shadowBlur = 10;
        drawingSurface.shadowOffsetX = 5;
        drawingSurface.shadowOffsetY = 5;
        myMusic.pause();
    }

    if (stage == 1) {
        drawingSurface.drawImage(scene1, 0, 0, canvas.width, canvas.height);
        shape1.jumpForce = -10;
    }

    if (stage == 2) {
        drawingSurface.drawImage(scene2, 0, 0, canvas.width, canvas.height);
        shape1.jumpForce = -9;
    }

    if (stage == 3) {
        drawingSurface.drawImage(scene3, 0, 0, canvas.width, canvas.height);
        shape1.jumpForce = -9;
    }

    if (stage == 4) {
        drawingSurface.drawImage(scene4, 0, 0, canvas.width, canvas.height);
        shape1.jumpForce = -8;
    }

    if (stage == 5) {
        drawingSurface.drawImage(scene5, 0, 0, canvas.width, canvas.height);
        if (shape1.x >= 410) {
            face = false;
            drawingSurface.drawImage(image1, 420, shape1.y, shape1.width, shape1.height);
            drawingSurface.font = "bold 30px Trebuchet MS";
            drawingSurface.fillStyle = "#FFD700";
            drawingSurface.fillText("You made it !!", 300, 100);
            drawingSurface.fillText("Press F5 to play again.", 240, 140);
            drawingSurface.shadowColor = "rgba(0, 0, 0, 1)";
            drawingSurface.shadowBlur = 10;
            drawingSurface.shadowOffsetX = 5;
            drawingSurface.shadowOffsetY = 5;
            myMusic.pause();
            if (!hasPlayed) {
                myVictory.play();
                hasPlayed = true;
            }
        }
    }

    if (stage > 0 && stage < 5) {
        drawingSurface.drawImage(image3, 750, 130, 40, 30);
        myMusic.play()
        drawingSurface.font = "bold 30px Trebuchet MS";
        drawingSurface.fillStyle = "#FFD700";
        drawingSurface.shadowColor = "rgba(0, 0, 0, 1)";
        drawingSurface.shadowBlur = 10;
        drawingSurface.shadowOffsetX = 5;
        drawingSurface.shadowOffsetY = 5;
        drawingSurface.fillText("STAGE " + stage, 350, 40);
    }

    // BabyLuckyPanda
    if (face === true) {
        if (shape1.vx === 0) {
            drawingSurface.drawImage(image1, shape1.x, shape1.y, shape1.width, shape1.height);
        }
        else {
            // Timestamp is in msec
            if (Math.round(timestamp / 100) % 2 === 1) {
                currentImage = 1;
            }
            else {
                currentImage = 2;
            }

            if (currentImage === 1) {
                drawingSurface.drawImage(imageW1, shape1.x, shape1.y, shape1.width, shape1.height);
            }
            else {
                drawingSurface.drawImage(imageW2, shape1.x, shape1.y, shape1.width, shape1.height);
            }

        }
    }

    // Bombs
    if (stage == 1) {

        ground = 320;
        for (i = 1; i < 4; i++) {
            drawingSurface.drawImage(image2, bomb[i].x + i * 200 - 30, bomb[i].y, bomb[i].width, bomb[i].height);
            if ((shape1.x + shape1.width > bomb[i].x + i * 200 - 30) && (shape1.x <= bomb[i].x + i * 200 - 30 + bomb[i].width) && (shape1.y + shape1.height >= bomb[i].y) && (shape1.y <= bomb[i].y + bomb[i].height)) {
                face = false;
                myAudio.play();
                stage = 0;
            }
        }
    }

    if (stage == 2) {
        ground = 360;
        for (i = 1; i < 5; i++) {
            bomb[i].y = ground - 28;
            drawingSurface.drawImage(image2, bomb[i].x + i * 150 + 30, bomb[i].y, bomb[i].width, bomb[i].height);
            if ((shape1.x + shape1.width > bomb[i].x + i * 150 + 30) && (shape1.x <= bomb[i].x + i * 150 + 30 + bomb[i].width) && (shape1.y + shape1.height >= bomb[i].y) && (shape1.y <= bomb[i].y + bomb[i].height)) {
                face = false;
                myAudio.play();
                stage = 0;
            }
        }
    }

    if (stage == 3) {
        ground = 360;
        for (i = 1; i < 6; i++) {
            bomb[i].y = ground - 28;
            drawingSurface.drawImage(image2, bomb[i].x + i * 120 + 25, bomb[i].y, bomb[i].width, bomb[i].height);
            if ((shape1.x + shape1.width > bomb[i].x + i * 120 + 25) && (shape1.x <= bomb[i].x + i * 120 + 25 + bomb[i].width) && (shape1.y + shape1.height >= bomb[i].y) && (shape1.y <= bomb[i].y + bomb[i].height)) {
                face = false;
                myAudio.play();
                stage = 0;
            }
        }
    }

    if (stage == 4) {
        ground = 350;
        for (i = 1; i < 7; i++) {
            bomb[i].y = ground - 28;
            drawingSurface.drawImage(image2, bomb[i].x + i * 90 + 90, bomb[i].y, bomb[i].width, bomb[i].height);
            if ((shape1.x + shape1.width > bomb[i].x + i * 90 + 90) && (shape1.x <= bomb[i].x + i * 90 + 90 + bomb[i].width) && (shape1.y + shape1.height >= bomb[i].y) && (shape1.y <= bomb[i].y + bomb[i].height)) {
                face = false;
                myAudio.play();
                stage = 0;
            }
        }
    }

    if (stage == 5) {
        ground = 270;
    }
}
