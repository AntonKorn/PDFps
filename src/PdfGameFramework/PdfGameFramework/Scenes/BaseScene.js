function createBaseScene(
    linesLayerService,
    matrixLayerService,
    canvasWidth,
    canvasHeight,
    linesCanvasWidth,
    linesCanvasMaxHeight) {

    var behaviours = [
        createUpdatePlayerLocationBehaviour(),
        createDrawWallsAndObjectsBehaviour(
            linesLayerService,
            matrixLayerService,
            canvasWidth,
            canvasHeight,
            linesCanvasWidth,
            linesCanvasMaxHeight)
    ];

    player.x = 0;
    player.y = 0;
    player.angle = 0;
    player.speed = 0;
    player.angle = 0;

    var scene = ({
        behaviours: behaviours,
        player: player,
        update: update
    });

    function update(updateDuration) {
        for (var i = 0; i < behaviours.length; i++) {
            behaviours[i].update(scene, updateDuration);
        }
    }

    return scene;
}
