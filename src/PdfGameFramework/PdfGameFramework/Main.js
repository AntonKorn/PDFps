try {

    var canvasWidth = 50;
    var canvasHeight = 50;

    var linesCanvasWidth = 80;
    var linesCanvasMaxHeight = 60;

    var fieldOfView = Math.PI / 3;

    var playerX = 10;
    var playerY = 5;
    var playerAngle = 2;

    var angleDelta = 0;

    var updateDuration = 100;
    app.setInterval("physicsUpdate()", updateDuration);
    app.setTimeOut("fillInitialScreenState(); fillInitialLinesScreenState()", 10);

    var map = [
        "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
        "#.......................................................................................#",
        "#.......................................................................................#",
        "#......$$$$$$...........................................................................#",
        "#......#................................................................................#",
        "#......#................................................................................#",
        "#......#....#...........................................................................#",
        "#.........$$$$$$........................................................................#",
        "#.......................................................................................#",
        "#.......................................................................................#",
        "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
    ];

    var mapWidth = map[0].length;
    var mapHeight = map.length;
    var maxDistance = Math.max(mapWidth, mapHeight);

    var columnsPerUpdate = linesCanvasWidth;
    var lastColumn = 0;

    var screenState = [];
    var linesScreenState = [];

    var greenColor = "green";
    var blueColor = "blue";
    var transparentColor = "transp";

    function fillInitialLinesScreenState() {
        for (var x = 0; x < linesCanvasWidth; x++) {
            var columnState = { height: 0, color: transparentColor };
            linesScreenState.push(columnState);

            for (var i = 0; i < linesCanvasMaxHeight; i++) {
                var greenFieldName = 'ln_' + x + '_' + i + '_1';
                getField(greenFieldName).display = display.hidden;

                var blueFieldName = 'ln_' + x + '_' + i + '_0';
                getField(blueFieldName).display = display.hidden;
            }
        }
    }

    function fillInitialScreenState() {
        app.alert("a");
        for (var x = 0; x < canvasWidth; x++) {
            var column = [];
            screenState.push(column);
            for (var y = 0; y < canvasHeight; y++) {
                column.push({ color: transparentColor });

                var greenFieldName = 'mtx_' + x + '_' + y + '_1';
                getField(greenFieldName).display = display.hidden;

                var blueFieldName = 'mtx_' + x + '_' + y + '_0';
                getField(blueFieldName).display = display.hidden;
            }
        }
    }

    function physicsUpdate() {
        try {
            x = lastColumn % linesCanvasWidth;
            var lastUpdateColumn = x + columnsPerUpdate;

            if (angleDelta != 0) {
                playerAngle += angleDelta;
            }

            for (var x = 0; x < lastUpdateColumn; x++) {
                var rayAngle = playerAngle - fieldOfView / 2 + fieldOfView * x / canvasWidth;
                var distanceIncrement = 0.1;
                var distance = 0;

                var isWallHit = false;
                var isBlueWallHit = true;

                var horizontalIncrement = Math.sin(rayAngle);
                var verticalIncremenent = Math.cos(rayAngle);

                var rayJointX = 0;
                var rayJointY = 0;

                while (!isWallHit && distance < maxDistance) {
                    distance += distanceIncrement;

                    rayJointX = Math.floor(playerX + horizontalIncrement * distance);
                    rayJointY = Math.floor(playerY + verticalIncremenent * distance);

                    isWallHit = isMapTileSet(rayJointX, rayJointY);
                    isBlueWallHit = isBlueTileMap(rayJointX, rayJointY);

                    if (isOutOfBounds(rayJointX, rayJointY)) {
                        isWallHit = true;
                        distance = maxDistance;
                    }

                    var height = Math.floor(canvasHeight / distance * 2);
                    //var ceilingY = Math.floor(canvasHeight / 2 - canvasHeight / distance);
                    //var floorY = canvasHeight - ceilingY;
                }

                if (height >= linesCanvasMaxHeight) {
                    height = linesCanvasMaxHeight - 1;
                }

                if (isBlueWallHit) {
                    setBlueLine(x, height);
                } else {
                    setGreenLine(x, height);
                }
            }

            lastColumn = x;
        } catch (e) {
            app.alert(e);
        }
    }

    var cameraSpeed = 0.2;

    function leftClicked() {
        angleDelta = -cameraSpeed;
    }

    function bottomClicked() {
    }

    function topClicked() {
    }

    function rightClicked() {
        angleDelta = cameraSpeed;
    }

    function setGreen(x, y) {
        var state = screenState[x][y];
        if (state.color != greenColor) {
            if (state.color == blueColor) {
                var blueFieldName = 'mtx_' + x + '_' + y + '_0';
                getField(blueFieldName).display = display.hidden;
            }

            var greenFieldName = 'mtx_' + x + '_' + y + '_1';
            getField(greenFieldName).display = display.visible;

            state.color = greenColor;
        }
    }

    function setBlue(x, y) {
        var state = screenState[x][y];
        if (state.color != blueColor) {
            if (state.color == greenColor) {
                var greenFieldName = 'mtx_' + x + '_' + y + '_1';
                getField(greenFieldName).display = display.hidden;
            }

            var blueFieldName = 'mtx_' + x + '_' + y + '_0';
            getField(blueFieldName).display = display.visible;

            state.color = blueColor;
        }
    }

    function setTransparent(x, y) {
        var state = screenState[x][y];
        if (state.color != transparentColor) {
            if (state.color == greenColor) {
                var greenFieldName = 'mtx_' + x + '_' + y + '_1';
                getField(greenFieldName).display = display.hidden;
            }

            if (state.color == blueColor) {
                var blueFieldName = 'mtx_' + x + '_' + y + '_0';
                getField(blueFieldName).display = display.hidden;
            }

            state.color = transparentColor;
        }
    }

    function setBlueLine(x, height) {
        var state = linesScreenState[x];
        if (state.color != blueColor || state.height != height) {
            if (state.color != transparentColor) {
                if (state.color == greenColor) {
                    var greenFieldName = 'ln_' + x + '_' + state.height + '_1';
                    getField(greenFieldName).display = display.hidden;
                } else if (state.height != height) {
                    var blueFieldName = 'ln_' + x + '_' + state.height + '_0';
                    getField(blueFieldName).display = display.hidden;
                }
            }

            var blueFieldName = 'ln_' + x + '_' + height + '_0';
            getField(blueFieldName).display = display.visible;

            state.color = blueColor;
            state.height = height;
        }
    }

    function setGreenLine(x, height) {
        var state = linesScreenState[x];
        if (state.color != greenColor || state.height != height) {
            if (state.color != transparentColor) {
                if (state.color == blueColor) {
                    var blueFieldName = 'ln_' + x + '_' + state.height + '_0';
                    getField(blueFieldName).display = display.hidden;
                } else if (state.height != height) {
                    var greenFieldName = 'ln_' + x + '_' + state.height + '_1';
                    getField(greenFieldName).display = display.hidden;
                }
            }

            var greenFieldName = 'ln_' + x + '_' + height + '_1';
            getField(greenFieldName).display = display.visible;

            state.color = greenColor;
            state.height = height;
        }
    }

    function setTransparentLine(x) {
        var state = linesScreenState[x];
        if (state.color != greenColor) {
            if (state.color != transparentColor) {
                if (state.color == blueColor) {
                    var blueFieldName = 'ln_' + x + '_' + state.height + '_0';
                    getField(blueFieldName).display = display.hidden;
                } else {
                    var greenFieldName = 'ln_' + x + '_' + state.height + '_1';
                    getField(greenFieldName).display = display.hidden;
                }
            }

            state.color = transparentColor;
            state.height = 0;
        }
    }

    function isMapTileSet(x, y) {
        return map[y][x] == "#" || map[y][x] == "$";
    }

    function isBlueTileMap(x, y) {
        return map[y][x] == "#";
    }

    function isCollision(x, y) {
        return IsOutOfBounds(x, y) || isMapTileSet(x, y);
    }

    function isOutOfBounds(x, y) {
        return x < 0 || x >= mapWidth || y < 0 || y >= mapHeight;
    }
} catch (e) {
    app.alert(e);
}