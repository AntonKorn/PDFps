function createLinesLayerService(linesCanvasWidth, linesCanvasMaxHeight) {
    var linesScreenState = [];

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

    return ({
        linesCanvasWidth: linesCanvasWidth,
        linesCanvasMaxHeight: linesCanvasMaxHeight,
        initialise: fillInitialLinesScreenState,
        setBlueLine: setBlueLine,
        setGreenLine: setGreenLine,
        setTransparentLine: setTransparentLine
    });
}