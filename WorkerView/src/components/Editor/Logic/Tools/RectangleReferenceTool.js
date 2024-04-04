class RectangleReferenceTool extends Tool {

    _model;

    _first = [];
    _pointCount = 0;

    _width = -1;
    _height = -1;

    constructor() {
        super("Rectangle Reference", "pi-icon");
    }

    onMouseClicked(x, y) {
        if (this._points.length < 3) {
            this._model.do(new AddPointCommand(this, model, x, y));
        } else if (this._points.length == 3) {
            this._model.do(new AddPointCommand(this, model, x, y));
            // Fourth point is set, now the sizes of the edges have to be specified:
            // Show "Insert size" field
        }
    }

    onValueEntered(size) {
        if (this._points.length > 3) {
            this._model.do(new SetSizeCommand(this, model, size));
        }
    }

    updateExecute(command) {
        if (this._pointCount == 0) {
            this._first = command;
            this._pointCount++;
        } else if (this._pointCount < 4) {
            this._pointCount++;
        } else if (this._width == -1) {
            this._width = command.getSize();
        } else {
            this._height = command.getSize();
        }
    }

    updateUnExecute(point) {
        if (this._height != -1) {
            this._height = -1;
        } else if (this._width != -1) {
            this._width = -1;
        } else if (this._pointCount >= 1) {
            this._pointCount--;
        } else {
            this._first = null;
        }
    }


}