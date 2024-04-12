import * as MathUtils from "../Utils/MathUtils.js";
import AddPointCommand from "../Commands/AddPointCommand.js";
import LordImmerScaler from "../LordImmerScaler.js";
import MeasurementTool from "../MeasurementTool.js";
import AddLineCommand from "../Commands/AddLineCommand.js";

// This tools enables measuring the length of a line between two points.
class LineLengthMeasurementTool extends MeasurementTool {
    // The first command executed by this tool.
    _first = null;

    // The coordinates of the first and second point selected by the user.
    _firstX = 0;
    _firstY = 0;
    _secondX = 0;
    _secondY = 0;

    // The amout of points that the user has already selected in the image.
    _pointCount = 0;
    
    // Boolean value which specifies whether the tool has completed it's purpose or not.
    _finished = false;

    constructor(model) {
        // setting the text and the icon which will be displayed in the tool sidebar
        super(model, "Line Length", "pi pi-arrows-h");
    }

    onClick(x, y) {
        // Checking how many points were already specified by the user and adding new commands accordingly.
        if (this._pointCount == 0) {
            // The first command is simply adding a point to the user selected coordinates.
            this._firstX = x;
            this._firstY = y;
            this._model.do(new AddPointCommand(this, this._model, this._firstX, this._firstY));
            console.log("Point 1 added");
        } else if (this._pointCount == 1) {
            // The second step draws a line from the first point to the newly selected point.
            this._secondX = x;
            this._secondY = y;
            this._model.do(new AddPointCommand(this, this._model, this._secondX, this._secondY));
            // Draw the line between the two points
            this._model.do(new AddLineCommand(this, this._model, [[this._first.getX(), this._first.getY()], [this._secondX, this._secondY]], false));
            // Set the tool to finished
            let result = this.measureLength();
            console.log(result);
            this._finished = true;
            // Reset the point count and the first point to null for the next use of the tool
            this._first = null;
            this._pointCount = 0;
        }
    }

    updateExecute(command) {
        if (this._pointCount == 0) {
            // If there is no point set yet, the counter is incremented and the reference to the first point is set.
            this._first = command;
            this._pointCount++;
        }
    }

    updateUnExecute() {
        if (this._pointCount == 1) {
            // If there is only one point set, the counter is decremented and the reference to the first point is removed.
            this._first = null;
            this._pointCount--;
        }
        else if (this._pointCount == 2) {
            this._pointCount--;
            this._finished = false;
        }
    }

    deselect() {
        super.deselect();
        if (this._finished) return;
        while (this._model.undo() != this._first) {
            // Undoes all the commands done by this tool if it is not yet finished
        }
    }

    measureLength() {
        let point_1 = LordImmerScaler.transformToRealWorld(this._firstX, this._firstY);
        console.log(point_1);
        let point_2 = LordImmerScaler.transformToRealWorld(this._secondX, this._secondY);
        console.log(point_2);
        return MathUtils.getDistance([[point_1[0], point_1[1]],[point_2[0], point_2[1]]]);
    }

    drawLabel(){
        if(this._finished){
            let point_1 = [this._firstX, this._firstY]
            let point_2 = [this._secondX, this._secondY];
            let length = MathUtils.getDistance([[point_1[0], point_1[1]],[point_2[0], point_2[1]]]);
            this._model.addPopup("Line Length", "The length of the line is: ", length, ()=>{})
        }
    }

}

export default LineLengthMeasurementTool;