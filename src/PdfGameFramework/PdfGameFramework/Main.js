try {

    var canvasWidth = 100;
    var canvasHeight = 100;
    var fieldOfView = Math.PI / 6;

    var playerX = 10;
    var playerY = 5;
    var playerAngle = 1;

    app.setInterval("physicsUpdate()", 50);

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

    function physicsUpdate() {
        for (var x = 0; x < canvasWidth; x++) {

        }
    }

    function leftClicked() {
    }

    function bottomClicked() {
    }

    function topClicked() {
    }

    function rightClicked() {
    }

    function setPixel(x, y) {
        var fieldName = 'mtx_' + x + '_' + y + '_1';
        getField(fieldName).display = display.hidden;
        fieldName = 'mtx_' + x + '_' + y + '_0';
        getField(fieldName).display = display.visible;

    }

    function unsetPixel(x, y) {
        var fieldName = 'mtx_' + x + '_' + y + '_0';
        getField(fieldName).display = display.hidden;
        fieldName = 'mtx_' + x + '_' + y + '_1';
        getField(fieldName).display = display.visible;
    }

    function setGreen(x, y) {
        var fieldName = 'mtx_' + x + '_' + y + '_0';
        getField(fieldName).display = display.hidden;
        fieldName = 'mtx_' + x + '_' + y + '_1';
        getField(fieldName).display = display.visible;
    }

    function setBlue(x, y) {
        var fieldName = 'mtx_' + x + '_' + y + '_1';
        getField(fieldName).display = display.hidden;
        fieldName = 'mtx_' + x + '_' + y + '_0';
        getField(fieldName).display = display.visible;
    }

    function setTransparent(x, y) {
        var fieldName = 'mtx_' + x + '_' + y + '_1';
        getField(fieldName).display = display.hidden;
        fieldName = 'mtx_' + x + '_' + y + '_0';
        getField(fieldName).display = display.hidden;
    }

    function IsMapTileSet(x, y) {
        return map[y][x] == "#" || map[y][x] == "$";
    }

    function IsBlueTileMap(x, y) {
        return map[y][x] == "#";
    }

    function IsCollision(x, y) {
        return IsOutOfBounds(x, y) || IsMapTileSet(x, y);
    }

    function IsOutOfBounds(x, y) {
        return x < 0 || x >= mapWidth || y < 0 || y >= mapHeight;
    }
} catch (e) {
    app.alert(e);
}