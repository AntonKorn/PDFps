function createLinesLayerService(linesCanvasWidth, linesCanvasMaxHeight) {
    var linesScreenState = [];

    function fillInitialLinesScreenState() {
        for (var x = 0; x < linesCanvasWidth; x++) {
            var columnState = { height: 0, color: color.transparent };
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
        if (state.color != color.blue || state.height != height) {
            if (state.color != color.transparent) {
                if (state.color == color.green) {
                    var greenFieldName = 'ln_' + x + '_' + state.height + '_1';
                    getField(greenFieldName).display = display.hidden;
                } else if (state.height != height) {
                    var blueFieldName = 'ln_' + x + '_' + state.height + '_0';
                    getField(blueFieldName).display = display.hidden;
                }
            }

            var blueFieldName = 'ln_' + x + '_' + height + '_0';
            getField(blueFieldName).display = display.visible;

            state.color = color.blue;
            state.height = height;
        }
    }

    function setGreenLine(x, height) {
        var state = linesScreenState[x];
        if (state.color != color.green || state.height != height) {
            if (state.color != color.transparent) {
                if (state.color == color.blue) {
                    var blueFieldName = 'ln_' + x + '_' + state.height + '_0';
                    getField(blueFieldName).display = display.hidden;
                } else if (state.height != height) {
                    var greenFieldName = 'ln_' + x + '_' + state.height + '_1';
                    getField(greenFieldName).display = display.hidden;
                }
            }

            var greenFieldName = 'ln_' + x + '_' + height + '_1';
            getField(greenFieldName).display = display.visible;

            state.color = color.green;
            state.height = height;
        }
    }

    function setTransparentLine(x) {
        var state = linesScreenState[x];
        if (state.color != color.green) {
            if (state.color != color.transparent) {
                if (state.color == color.blue) {
                    var blueFieldName = 'ln_' + x + '_' + state.height + '_0';
                    getField(blueFieldName).display = display.hidden;
                } else {
                    var greenFieldName = 'ln_' + x + '_' + state.height + '_1';
                    getField(greenFieldName).display = display.hidden;
                }
            }

            state.color = color.transparent;
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