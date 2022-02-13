
var canvasWidth = 50;
var canvasHeight = 50;

var linesCanvasWidth = 100;
var linesCanvasMaxHeight = 60;

var fieldOfView = Math.PI / 6;

player.x = 10;
player.y = 5;
player.angle = 2;

var updateDuration = 100;
app.setInterval("physicsUpdate()", updateDuration);
app.setTimeOut("initialiseMatrixService(); initialiseLinesService()", 10);

var columnsPerUpdate = linesCanvasWidth;
var lastColumn = 0;

var greenColor = "green";
var blueColor = "blue";
var transparentColor = "transp";

var linesLayerService = createLinesLayerService(linesCanvasWidth, linesCanvasMaxHeight);
var matrixLayerService = createMatrixLayerService(canvasWidth, canvasHeight);

function initialiseLinesService() {
    linesLayerService.initialise();
}

function initialiseMatrixService() {
    matrixLayerService.initialise();
}

function physicsUpdate() {
    try {
        x = lastColumn % linesCanvasWidth;
        var lastUpdateColumn = x + columnsPerUpdate;

        if (player.angleDelta != 0) {
            player.angle += player.angleDelta * updateDuration;
        }

        if (player.speed != 0) {
            var nextPlayerX = player.x + Math.sin(player.angle) * player.speed * updateDuration;
            var nextPlayerY = player.y + Math.cos(player.angle) * player.speed * updateDuration;

            if (!map.isCollision(Math.floor(nextPlayerX), Math.floor(nextPlayerY))) {
                player.x = nextPlayerX;
                player.y = nextPlayerY;
            }
        }

        for (var x = 0; x < lastUpdateColumn; x++) {
            var rayAngle = player.angle - fieldOfView / 2 + fieldOfView * x / canvasWidth;
            var distanceIncrement = 0.1;
            var distance = 0;

            var isWallHit = false;
            var isBlueWallHit = true;

            var horizontalIncrement = Math.sin(rayAngle);
            var verticalIncremenent = Math.cos(rayAngle);

            var rayJointX = 0;
            var rayJointY = 0;

            while (!isWallHit && distance < map.maxDistance) {
                distance += distanceIncrement;

                rayJointX = Math.floor(player.x + horizontalIncrement * distance);
                rayJointY = Math.floor(player.y + verticalIncremenent * distance);

                isWallHit = map.isMapTileSet(rayJointX, rayJointY);
                isBlueWallHit = map.isBlueTileMap(rayJointX, rayJointY);

                if (map.isOutOfBounds(rayJointX, rayJointY)) {
                    isWallHit = true;
                    distance = map.maxDistance;
                }

                var height = Math.floor(canvasHeight / distance * 2);
                //var ceilingY = Math.floor(canvasHeight / 2 - canvasHeight / distance);
                //var floorY = canvasHeight - ceilingY;
            }

            if (height >= linesLayerService.linesCanvasMaxHeight) {
                height = linesLayerService.linesCanvasMaxHeight - 1;
            }

            if (isBlueWallHit) {
                linesLayerService.setBlueLine(x, height);
            } else {
                linesLayerService.setGreenLine(x, height);
            }
        }

        lastColumn = x;
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
