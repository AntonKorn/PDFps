function createMatrixLayerService(canvasWidth, canvasHeight) {
    var screenState = [];

    function fillInitialScreenState() {
        for (var x = 0; x < canvasWidth; x++) {
            var column = [];
            screenState.push(column);
            for (var y = 0; y < canvasHeight; y++) {
                column.push({ color: color.transparent });

                var greenFieldName = 'mtx_' + x + '_' + y + '_1';
                getField(greenFieldName).display = display.hidden;

                var blueFieldName = 'mtx_' + x + '_' + y + '_0';
                getField(blueFieldName).display = display.hidden;
            }
        }
    }

    function setGreen(x, y) {
        var state = screenState[x][y];
        if (state.color != greenColor) {
            if (state.color == color.blue) {
                var blueFieldName = 'mtx_' + x + '_' + y + '_0';
                getField(blueFieldName).display = display.hidden;
            }

            var greenFieldName = 'mtx_' + x + '_' + y + '_1';
            getField(greenFieldName).display = display.visible;

            state.color = color.green;
        }
    }

    function setBlue(x, y) {
        var state = screenState[x][y];
        if (state.color != color.blue) {
            if (state.color == color.green) {
                var greenFieldName = 'mtx_' + x + '_' + y + '_1';
                getField(greenFieldName).display = display.hidden;
            }

            var blueFieldName = 'mtx_' + x + '_' + y + '_0';
            getField(blueFieldName).display = display.visible;

            state.color = color.blue;
        }
    }

    function setTransparent(x, y) {
        var state = screenState[x][y];
        if (state.color != color.transparent) {
            if (state.color == color.green) {
                var greenFieldName = 'mtx_' + x + '_' + y + '_1';
                getField(greenFieldName).display = display.hidden;
            }

            if (state.color == color.blue) {
                var blueFieldName = 'mtx_' + x + '_' + y + '_0';
                getField(blueFieldName).display = display.hidden;
            }

            state.color = color.transparent;
        }
    }

    return ({
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        initialise: fillInitialScreenState,
        setGreen: setGreen,
        setBlue: setBlue,
        setTransparent: setTransparent
    });
}
