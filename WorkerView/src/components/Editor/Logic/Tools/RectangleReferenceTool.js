import * as MathUtils from "../Utils/MathUtils.js";
import AddPointCommand from "../Commands/AddPointCommand.js";
import SetSizeCommand from "../Commands/SetSizeCommand.js";
import ReferenceResultCommand from "../Commands/ReferenceResultCommand.js";
import LordImmerScaler from "../LordImmerScaler.js";
import ReferenceTool from "../ReferenceTool.js";

class RectangleReferenceTool extends ReferenceTool {
    _first = [];
    _pointCount = 0;

    _width = -1;
    _height = -1;

    _finished = false;

    constructor(model) {
        super(model, "Rectangle Reference", "pi-icon");
    }


    // It is likely that this will be split up in different methods to handle the according events...
    onClick(x, y) {
        if (this._pointCount < 4) {
            this._model.do(new AddPointCommand(this, this._model, x, y));
        } else if (this._width != -1 && this._height != -1) {
            this._model.do(new ReferenceResultCommand())
        }
    }

    onValueEntered(size) {
        if (this._pointCount > 3) {
            this._model.do(new SetSizeCommand(this, model, size));
        }
    }

    updateExecute(command) {
        if (this._pointCount == 0) {
            this._first = command;
            this._pointCount++;
        } else if (this._pointCount < 4) {
            this._pointCount++;

            //// Show window for entering sizes

        } else if (this._width == -1) {
            this._width = command.getSize();
        } else if (this._height == -1) {
            this._height = command.getSize();
        } else {
            this.setReference()
            this._finished = true;
        }
    }

    updateUnExecute(point) {
        if (this._height != -1) {
            this._height = -1;
            this._finished = false;
        } else if (this._width != -1) {
            this._width = -1;
        } else if (this._pointCount >= 1) {
            //// Close window for entering sizes


            this._pointCount--;
        } else {
            this._first = null;
        }
    }

    setReference() {
        var src = [];
        var point = this._first;
        for (let i = 0; i < 4; i++) {
            src.push([point.getX(), point.getY()]);
            point = point.getNext();
        }

        var dst = [[0, 0], [0, this._height], [this._width, this._height], [this._width, 0]];

        LordImmerScaler.changeMatrix(MathUtils.calculatePerspectiveMatrix(src, dst));
    }

    deselect() {
        super.deselect();
        if(this._finished) return;
        while(this._model.undo() != this._first){
            // Undoes all the commands done by this tool if it is not yet finished
        }
    }


}

export default RectangleReferenceTool;