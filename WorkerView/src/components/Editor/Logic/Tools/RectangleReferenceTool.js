import * as MathUtils from "../Utils/MathUtils.js";
import AddPointCommand from "../Commands/AddPointCommand.js";
import LordImmerScaler from "../LordImmerScaler.js";
import ReferenceTool from "../ReferenceTool.js";
import AddLineCommand from "../Commands/AddLineCommand.js";

class RectangleReferenceTool extends ReferenceTool {
    _first = [];
    _pointCount = 0;

    _firstLength = -1;
    _secondLenght = -1;

    _finished = false;

    callback;

    constructor(model) {
        super(model, "Rectangle Reference", "pi-icon");
    }


    // It is likely that this will be split up in different methods to handle the according events...
    onClick(x, y) {
        if (this._pointCount == 0) {
            this._model.do(new AddPointCommand(this, this._model, x, y));
        } else if (this._pointCount == 1) {
            //this._model.do(new AddPointCommand(this, this._model, x, y, true, "Length Input", "Please insert the length of this edge.", "Length in cm", (length)=>{this._firstLength = length;}));
            this._model.do(new AddLineCommand(this, this._model, this._first.getX(), this._first.getY(), x, y, true, "Length Input", "Please insert the length of this edge.", "Length in cm", (length)=>{this._firstLength = length;}));
        } else if (this._pointCount == 2) {
            //this._model.do(new AddPointCommand(this, this._model, x, y, true, "Length Input", "Please insert the length of this edge.", "Length in cm", (length)=>{this._secondLenght = length;}));
            this._model.do(new AddLineCommand(this, this._model, this._first.getNext().getX2(), this._first.getNext().getY2(), x, y, true, "Length Input", "Please insert the length of this edge.", "Length in cm", (length)=>{this._secondLenght = length;}));
        } else if (this._pointCount == 3) {
            this._model.do(new AddLineCommand(this, this._model, this._first.getNext().getNext().getX2(), this._first.getNext().getNext().getY2(), x, y));
        }
    }

    updateExecute(command) {
        if (this._pointCount == 0) {
            this._first = command;
            this._pointCount++;
        } else if (this._pointCount < 3) {
            this._pointCount++;
        } else {
            this.setReference()
            this._finished = true;
            this._pointCount++;
        }
    }

    updateUnExecute(point) {
        if (this._pointCount == 4) {
            this._pointCount--;
            LordImmerScaler.changeMatrix(null);
            this._finished = false;
        } else if (this._pointCount >= 1) {
            this._pointCount--;
        } else {
            this._first = null;
        }
    }

    setReference() {
        var src = [];

        src.push([this._first.getX(), this._first.getY()]);
        var secondLine = this._first.getNext().getNext();
        src.push([secondLine.getX1(), secondLine.getY1()]);
        src.push([secondLine.getX2(), secondLine.getY2()]);
        src.push([secondLine.getNext().getX2(), secondLine.getNext().getY2()]);

        var dst = [[0, 0], [0, this._firstLength], [this._secondLenght, this._firstLength], [this._secondLenght, 0]];

        LordImmerScaler.changeMatrix(MathUtils.calculatePerspectiveMatrix(src, dst));


        var table_lower_left = [290, 3519, 1]
        var table_lower_right = [2756, 3464, 1]
        var table_upper_right = [2068, 593, 1]
        var table_upper_left = [997, 675, 1]

        var table_points = [table_lower_left, table_lower_right, table_upper_right, table_upper_left]

        var transformed_points = []
        for(let i = 0; i < table_points.length; i++){
            transformed_points.push(LordImmerScaler.transformToRealWorld(table_points[i][0], table_points[i][1]))
        }

        var width = MathUtils.getDistance(transformed_points[0], transformed_points[1])
        var height = MathUtils.getDistance(transformed_points[1], transformed_points[2])

        console.log("Width: " + width)
        console.log("Height: " + height)

    }

    deselect() {
        super.deselect();
        if (this._finished) return;
        while (this._model.undo() != this._first) {
            // Undoes all the commands done by this tool if it is not yet finished
        }
    }


}

export default RectangleReferenceTool;