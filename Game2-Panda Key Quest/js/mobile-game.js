var canvas = document.getElementById("mobileGameCanvas");
var drawingSurface = canvas.getContext("2d");

// function resizeGame() {
//     const gameContainer = document.querySelector('.mobileScaledContainer');
//     const screenWidth = window.innerWidth;
//     const screenHeight = window.innerHeight;

//     // Original game dimensions
//     const gameWidth = 800;
//     const gameHeight = 600;

//     // Calculate scale factor
//     const scaleX = screenWidth / gameWidth;
//     const scaleY = screenHeight / gameHeight;

//     // Use the smaller scale factor to maintain aspect ratio
//     const scale = Math.min(scaleX, scaleY);

//     // Apply scaling
//     // gameContainer.style.transform = `scale(${scale})`;

//     // Adjust the size of the container to match the scaled game
//     gameContainer.style.width = `${gameWidth}px`;
//     gameContainer.style.height = `${gameHeight}px`;
// }

// // Call resizeGame on window resize
// window.addEventListener('resize', resizeGame);

// // Initial resize
// resizeGame();



// Button Elements
const btnLeftM = document.getElementById("btn-leftM");
const btnRightM = document.getElementById("btn-rightM");
const btnUpM = document.getElementById("btn-upM");
const btnDownM = document.getElementById("btn-downM");
const btnRestartLostM = document.getElementById("btn-restart-lostM");
const btnRestartWinM = document.getElementById("btn-restart-winM");

// Function to toggle button visibility based on the current stage
function updateButtonVisibility(stage) {
    if (stage === 3) {
        // Show Restart Button, Hide Navigation Buttons
        btnRestartLostM.style.display = "block";
        btnRestartWinM.style.display = "none";
        btnLeftM.style.display = "none";
        btnRightM.style.display = "none";
        btnUpM.style.display = "none";
        btnDownM.style.display = "none";
    }
    else if (stage === 1) {
        // Show Navigation Buttons, Hide Restart Button
        btnRestartLostM.style.display = "none";
        btnRestartWinM.style.display = "none";
        btnLeftM.style.display = "block";
        btnRightM.style.display = "block";
        btnUpM.style.display = "block";
        btnDownM.style.display = "block";
    }
    else if (stage === 2) {
        // Show Restart Button, Hide Navigation Buttons
        btnRestartLostM.style.display = "none";
        btnRestartWinM.style.display = "block";
        btnLeftM.style.display = "none";
        btnRightM.style.display = "none";
        btnUpM.style.display = "none";
        btnDownM.style.display = "none";
    }
}


var spriteObject = {
    x: 0,
    y: 0,
    width: 20,
    height: 40
};

var panda = Object.create(spriteObject);
panda.x = 60;
panda.y = 60;
panda.width = 32;
panda.height = 32;
panda.vx = 3
panda.vy = 3;
direction = 'idle'; // Initial direction is idle
frame = 0; // Frame for animation
isMoving = false; // Track movement

let currentFrame = 1;
let lastFrameTime = 0; // Tracks the last time the frame was updated
const frameInterval = 50; // Time in milliseconds between frame changes

var wall = new Array; // Walls
var bomb = new Array; // Bombs
var key = new Array; // Keys

// Walls
for (i = 1; i < 14; i++) {
    wall[i] = Object.create(spriteObject);
}

// Bombs
for (i = 1; i < 6; i++) {
    bomb[i] = Object.create(spriteObject);
    bomb[i].width = 30;
    bomb[i].height = 30;
    bomb[i].vx = -3;
    bomb[i].vy = 0;
}

// Keys
for (i = 1; i < 4; i++) {
    key[i] = Object.create(spriteObject);
    key[i].width = 35;
    key[i].height = 35;
    key[i].face = true;
}

key[1].x = 60;
key[1].y = 510;
key[2].x = 700;
key[2].y = 510;
key[3].x = 700;
key[3].y = 60;


bomb[1].x = 700;
bomb[1].y = 60;
bomb[2].x = 700;
bomb[2].y = 510;
bomb[3].x = 480;
bomb[3].y = 210;
bomb[4].x = 480;
bomb[4].y = 360;
bomb[5].x = 200;
bomb[5].y = 510;


// Load images
const images = {
    idle: new Image(),
    up: [new Image(), new Image()],
    down: [new Image(), new Image()],
    left: [new Image(), new Image()],
    right: [new Image(), new Image()],
};

// Assign image sources
images.idle.src = 'img/BabyPandaIdle.png';
images.up[0].src = 'img/BabyPandaWalkUp01.png';
images.up[1].src = 'img/BabyPandaWalkUp02.png';
images.down[0].src = 'img/BabyPandaWalkDown01.png';
images.down[1].src = 'img/BabyPandaWalkDown02.png';
images.left[0].src = 'img/BabyPandaWalkLeft01.png';
images.left[1].src = 'img/BabyPandaWalkLeft02.png';
images.right[0].src = 'img/BabyPandaWalkRight01.png';
images.right[1].src = 'img/BabyPandaWalkRight02.png';

var image1 = new Image();
image1.src = "img/EndImage1.png";
var image2 = new Image();
image2.src = "img/bomb.png";
var image3 = new Image();
image3.src = "img/key.png";
var image4 = new Image();
image4.src = "img/EndImage2.png";

const bambooTile1H = new Image();
bambooTile1H.src = "img/BambooTile1H.png";
const bambooTile1V = new Image();
bambooTile1V.src = "img/BambooTile1H.png";
const greenTile1 = new Image();
greenTile1.src = "img/GreenTile1.png";

let hasPlayed = false;
var myAudio = new Audio();
myAudio.src = "sounds/expl.mp3";
var myGameMusic = new Audio();
myGameMusic.src = "sounds/PandaKeyQuestMusic.mp3";
var myWinAudio = new Audio();
myWinAudio.src = "sounds/myWinAudio.mp3";
var myLoseAudio = new Audio();
myLoseAudio.src = "sounds/myLoseAudio.mp3";

var k;
var flaglife = true;
var stage = 1;
var count = 0;

var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;

var moveUp = false;
var moveDown = false;
var moveLeft = false;
var moveRight = false;

// Event Listeners for Mobile layout
// Event Listener for Left Button
document.getElementById('btn-leftM').addEventListener('touchstart', () => {
    moveLeft = true;
});

document.getElementById('btn-leftM').addEventListener('touchend', () => {
    moveLeft = false;
});

// // Event Listener for Right Button
document.getElementById('btn-rightM').addEventListener('touchstart', () => {
    moveRight = true;
});

document.getElementById('btn-rightM').addEventListener('touchend', () => {
    moveRight = false;
});

// Event Listener for Up Button
document.getElementById('btn-upM').addEventListener('touchstart', () => {
    moveUp = true;
});

document.getElementById('btn-upM').addEventListener('touchend', () => {
    moveUp = false;
});

// Event Listener for Down Button
document.getElementById('btn-downM').addEventListener('touchstart', () => {
    moveDown = true;
});

document.getElementById('btn-downM').addEventListener('touchend', () => {
    moveDown = false;
});



document.addEventListener('keydown', function (event) {
    if (event.key === 'F5' || (event.metaKey && event.key === 'r')) {
        event.preventDefault(); // Prevent default refresh
        location.reload(); // Refresh the page
    }
});

// Event listener for Restart Button
btnRestartLostM.addEventListener("click", () => {
    // Reload the page to restart the game
    location.reload();
});

btnRestartWinM.addEventListener("click", () => {
    // Reload the page to restart the game
    location.reload();
});


update();


function update() {

    requestAnimationFrame(update, canvas);

    // resizeGame();

    // Update button visibility
    updateButtonVisibility(stage);

    if (stage == 1) {

        wall[1].x = 0;
        wall[1].y = 0;
        wall[1].width = 50;
        wall[1].height = 600;

        wall[2].x = 750;
        wall[2].y = 0;
        wall[2].width = 50;
        wall[2].height = 600;

        wall[3].x = 0;
        wall[3].y = 0;
        wall[3].width = 800;
        wall[3].height = 50;

        wall[4].x = 0;
        wall[4].y = 550;
        wall[4].width = 800;
        wall[4].height = 50;

        wall[5].x = 100;
        wall[5].y = 100;
        wall[5].width = 225;
        wall[5].height = 100;

        wall[6].x = 0;
        wall[6].y = 250;
        wall[6].width = 325;
        wall[6].height = 100;

        wall[7].x = 100;
        wall[7].y = 400;
        wall[7].width = 225;
        wall[7].height = 100;

        wall[8].x = 375;
        wall[8].y = 0;
        wall[8].width = 100;
        wall[8].height = 200;

        wall[9].x = 375;
        wall[9].y = 400;
        wall[9].width = 100;
        wall[9].height = 200;

        wall[10].x = 525;
        wall[10].y = 100;
        wall[10].width = 175;
        wall[10].height = 100;

        wall[11].x = 525;
        wall[11].y = 400;
        wall[11].width = 175;
        wall[11].height = 100;

        wall[12].x = 525;
        wall[12].y = 250;
        wall[12].width = 275;
        wall[12].height = 100;

        wall[13].x = 375;
        wall[13].y = 250;
        wall[13].width = 100;
        wall[13].height = 100;

        if (moveUp && !moveDown) {
            panda.vy = -3;
            panda.direction = 'up';
            panda.isMoving = true;
        }

        if (moveDown && !moveUp) {
            panda.vy = 3;
            panda.direction = 'down';
            panda.isMoving = true;
        }

        if (moveLeft && !moveRight) {
            panda.vx = -3;
            panda.direction = 'left';
            panda.isMoving = true;
        }

        if (moveRight && !moveLeft) {
            panda.vx = 3;
            panda.direction = 'right';
            panda.isMoving = true;
        }

        if (!moveUp && !moveDown) {
            panda.vy = 0;
        }

        if (!moveLeft && !moveRight) {
            panda.vx = 0;
        }

        if (!moveUp && !moveDown && !moveLeft && !moveRight) {
            panda.direction = 'idle';
        }


        panda.x = panda.x + panda.vx;
        panda.y = panda.y + panda.vy;

        for (i = 1; i < 6; i++) {
            bomb[i].x = bomb[i].x + bomb[i].vx;
            bomb[i].y = bomb[i].y + bomb[i].vy;
        }

        if (panda.x + panda.width > canvas.width) {
            panda.x = canvas.width - panda.width;
        }

        if (panda.x < 0) {
            panda.x = 0;
        }

        if (panda.y + panda.height > canvas.height) {
            panda.y = canvas.height - panda.height;
        }

        if (panda.y < 0) {
            panda.y = 0;
        }

        const greenTilePattern1 = drawingSurface.createPattern(greenTile1, 'repeat');
        drawingSurface.fillStyle = greenTilePattern1;
        drawingSurface.fillRect(0, 0, canvas.width, canvas.height);

        const bambooTilePattern1H = drawingSurface.createPattern(bambooTile1H, 'repeat');
        const bambooTilePattern1V = drawingSurface.createPattern(bambooTile1V, 'repeat');

        for (let i = 1; i < 14; i++) {

            if (wall[i].width >= wall[i].height) {
                drawingSurface.fillStyle = bambooTilePattern1H;
                drawingSurface.fillRect(wall[i].x, wall[i].y, wall[i].width, wall[i].height);
            }

            if (wall[i].width < wall[i].height) {
                drawingSurface.fillStyle = bambooTilePattern1V;
                drawingSurface.fillRect(wall[i].x, wall[i].y, wall[i].width, wall[i].height);
            }

            if ((panda.x + panda.width > wall[i].x) && (panda.x <= wall[i].x + wall[i].width) && (panda.y + panda.height >= wall[i].y) && (panda.y <= wall[i].y + wall[i].height)) {
                panda.x = panda.x - panda.vx;
                panda.y = panda.y - panda.vy;
            }
        }


        if (flaglife == true) {

            // Update Panda animation frame
            if (panda.isMoving) {
                const now = performance.now(); // Use high-resolution timer for smooth animations
                if (now - lastFrameTime > frameInterval) {
                    currentFrame = (currentFrame + 1) % 2; // Alternate frames
                    lastFrameTime = now; // Update the last frame time          
                }
            }
            else {
                panda.direction = 'idle'; // Set to idle if not moving
            }


            if (panda.direction === 'idle') {
                drawingSurface.drawImage(images.idle, panda.x, panda.y, panda.width, panda.height);
            } else {
                let currentImage = images[panda.direction][currentFrame];
                drawingSurface.drawImage(currentImage, panda.x, panda.y, panda.width, panda.height);
            }
        }

        for (i = 1; i < 6; i++) {
            drawingSurface.drawImage(image2, bomb[i].x, bomb[i].y, bomb[i].width, bomb[i].height);
        }

        for (i = 1; i < 6; i++) {

            for (j = 1; j < 14; j++) {

                if ((bomb[i].x + bomb[i].width > wall[j].x) && (bomb[i].x <= wall[j].x + wall[j].width) && (bomb[i].y + bomb[i].height >= wall[j].y) && (bomb[i].y <= wall[j].y + wall[j].height)) {
                    bomb[i].x = bomb[i].x - bomb[i].vx;
                    bomb[i].y = bomb[i].y - bomb[i].vy;
                    k = Math.floor(Math.random() * 4);

                    if (k == 0) {
                        bomb[i].vx = 0;
                        bomb[i].vy = 3;
                    }

                    if (k == 1) {
                        bomb[i].vx = 0;
                        bomb[i].vy = -3
                    }

                    if (k == 2) {
                        bomb[i].vx = 3;
                        bomb[i].vy = 0;
                    }

                    if (k == 3) {
                        bomb[i].vx = -3;
                        bomb[i].vy = 0;
                    }
                }
            }
        }

        for (i = 1; i < 4; i++) {

            if (key[i].face == true) {
                drawingSurface.drawImage(image3, key[i].x, key[i].y, key[i].width, key[i].height);
            }
        }

        for (i = 1; i < 6; i++) {
            if ((panda.x + panda.width > bomb[i].x) && (panda.x <= bomb[i].x + bomb[i].width) && (panda.y + panda.height >= bomb[i].y) && (panda.y <= bomb[i].y + bomb[i].height)) {
                flaglife = false;
                myAudio.play();
                stage = 3;
            }
        }

        for (i = 1; i < 4; i++) {
            if ((panda.x + panda.width > key[i].x) && (panda.x <= key[i].x + key[i].width) && (panda.y + panda.height >= key[i].y) && (panda.y <= key[i].y + key[i].height) && key[i].face == true) {
                key[i].face = false;
                count++;
            }
        }

        if (count == 3) {
            stage = 2;
        }

        myGameMusic.play();

    }

    if (stage == 2) {  // 'YOU WIN!' screen
        drawingSurface.drawImage(image4, 0, 0, canvas.width, canvas.height);
        myGameMusic.pause();
            if (!hasPlayed) {
                myWinAudio.play();
                hasPlayed = true;
            }
    }

    if (stage == 3) {   // 'YOU LOST!'  screen
        drawingSurface.drawImage(image1, 0, 0, canvas.width, canvas.height);
        myGameMusic.pause();
            if (!hasPlayed) {
                myLoseAudio.play();
                hasPlayed = true;
            }
    }

}
