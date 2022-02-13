
var canvasWidth = 50;
var canvasHeight = 50;

var linesCanvasWidth = 100;
var linesCanvasMaxHeight = 60;

//var fieldOfView = Math.PI / 6;

//player.x = 10;
//player.y = 5;
//player.angle = 2;

var updateDuration = 100;
app.setInterval("physicsUpdate()", updateDuration);
app.setTimeOut("initialiseMatrixService(); initialiseLinesService()", 10);

//var columnsPerUpdate = linesCanvasWidth;
//var lastColumn = 0;

var linesLayerService = createLinesLayerService(linesCanvasWidth, linesCanvasMaxHeight);
var matrixLayerService = createMatrixLayerService(canvasWidth, canvasHeight);

function initialiseLinesService() {
    linesLayerService.initialise();
}

function initialiseMatrixService() {
    matrixLayerService.initialise();
}

var scene = createTestScene(linesLayerService, matrixLayerService, canvasWidth, canvasHeight, linesCanvasWidth, linesCanvasMaxHeight);

function physicsUpdate() {
    try {
        scene.update(updateDuration);
    } catch (e) {
        app.alert(e);
    }
}

var cameraSpeed = 0.001;
var playerSpeed = 0.005;

function leftClicked() {
    if (player.angleDelta < 0) {
        player.angleDelta = 0;
    } else {
        player.angleDelta = -cameraSpeed;
    }
}

function bottomClicked() {
    if (player.speed < 0) {
        player.speed = 0;
    } else {
        player.speed = -playerSpeed;
    }
}

function topClicked() {
    if (player.speed > 0) {
        player.speed = 0;
    } else {
        player.speed = playerSpeed;
    }
}

function rightClicked() {
    if (player.angleDelta > 0) {
        player.angleDelta = 0;
    } else {
        player.angleDelta = cameraSpeed;
    }
}
