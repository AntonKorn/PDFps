function createMap() {
    var internalMap = [
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

    var mapWidth = internalMap[0].length;
    var mapHeight = internalMap.length;
    var maxDistance = Math.max(mapWidth, mapHeight);

    function isMapTileSet(x, y) {
        return internalMap[y][x] == "#" || internalMap[y][x] == "$";
    }

    function isBlueTileMap(x, y) {
        return internalMap[y][x] == "#";
    }

    function isCollision(x, y) {
        return isOutOfBounds(x, y) || isMapTileSet(x, y);
    }

    function isOutOfBounds(x, y) {
        return x < 0 || x >= mapWidth || y < 0 || y >= mapHeight;
    }

    return ({
        mapWidth: mapWidth,
        mapHeight: mapHeight,
        maxDistance: maxDistance,
        isMapTileSet: isMapTileSet,
        isBlueTileMap: isBlueTileMap,
        isCollision: isCollision,
        isOutOfBounds: isOutOfBounds
    });
}

var map = createMap();
