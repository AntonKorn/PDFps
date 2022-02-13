function createMatrixLayerService(canvasWidth, canvasHeight) {
    var screenState = [];

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

    return ({
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        initialise: fillInitialScreenState,
        setGreen: setGreen,
        setBlue: setBlue,
        setTransparent: setTransparent
    });
}
