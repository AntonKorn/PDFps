try {

    var canvasWidth = 80;
    var canvasHeight = 60;
    var fieldOfView = Math.PI / 3;

    var playerX = 10;
    var playerY = 5;
    var playerAngle = 2;

    var angleDelta = 0;

    var updateDuration = 500;
    app.setInterval("physicsUpdate()", updateDuration);
    app.setTimeOut("fillInitialScreenState()", 10);

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

    var columnsPerUpdate = canvasWidth;
    var lastColumn = 0;

    var screenState = [];

    var greenColor = "green";
    var blueColor = "blue";
    var transparentColor = "transp";

    function fillInitialScreenState() {
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
        x = lastColumn % canvasWidth;
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

                var ceilingY = Math.floor(canvasHeight / 2 - canvasHeight / distance);
                var floorY = canvasHeight - ceilingY;
            }

            //app.alert(x + " " + distance + " " + horizontalIncrement);

            for (var y = 0; y < canvasHeight; y++) {
                if (y > ceilingY && y < floorY) {
                    if (isBlueWallHit) {
                        setBlue(x, y);
                    } else {
                        setGreen(x, y);
                    }
                } else {
                    setTransparent(x, y);
                }
            }
        }

        lastColumn = x;
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