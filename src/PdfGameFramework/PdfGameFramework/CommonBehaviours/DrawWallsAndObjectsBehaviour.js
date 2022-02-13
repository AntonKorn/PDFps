function createDrawWallsAndObjectsBehaviour(
    linesLayerService,
    matrixLayerService,
    canvasWidth,
    canvasHeight,
    linesCanvasWidth,
    linesCanvasMaxHeight) {

    var lastColumn = 0;
    var fieldOfView = Math.PI / 6;
    var columnsPerUpdate = linesCanvasWidth;

    function update(scene, updateDuration) {
        if (scene.player && scene.map) {
            var player = scene.player;
            var map = scene.map;

            x = lastColumn % linesCanvasWidth;
            var lastUpdateColumn = x + columnsPerUpdate;

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
        }
    }

    return ({
        update: update
    });
}