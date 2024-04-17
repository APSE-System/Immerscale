import * as MathUtils from "../Utils/MathUtils.js";
import AddPointCommand from "../Commands/AddPointCommand.js";
import LordImmerScaler from "../LordImmerScaler.js";
import MeasurementTool from "../MeasurementTool.js";
import AddLineCommand from "../Commands/AddLineCommand.js";
import AddLabelCommand from "../Commands/AddLabelCommand.js";

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
            this._finished = false;
        } else if (this._pointCount == 1) {
            // The second step draws a line from the first point to the newly selected point.
            this._secondX = x;
            this._secondY = y;
            // Draw the line between the two points, add the second point and a label with the length of the line.
            this._model.do(new AddLineCommand(this, this._model, [[this._firstX, this._firstY], [this._secondX, this._secondY]], true, true, this.measureLength(), false));
            // The tool is finished after the second point is set, all points are reset.
            this._first = null;
            this._firstX = 0;
            this._firstY = 0;
            this._secondX = 0;
            this._secondY = 0;
            this._pointCount = 0;
            this._finished = true;
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

        // if only one point is made remove the point (check the point count so it won't remove other commands)
        if (this._pointCount > 0) {
            this._model.undo();
        }

        // while (this._model.undo() != this._first) {
        //     // Undoes all the commands done by this tool if it is not yet finished
        // }
    }

    measureLength() {
        let point_1 = LordImmerScaler.transformToRealWorld(this._firstX, this._firstY);
        let point_2 = LordImmerScaler.transformToRealWorld(this._secondX, this._secondY);
        return MathUtils.getDistance([point_1[0], point_1[1]],[point_2[0], point_2[1]]).toFixed(2);
    }
}

export default LineLengthMeasurementTool;