import * as MathUtils from "../Utils/MathUtils.js";
import AddPointCommand from "../Commands/AddPointCommand.js";
import LordImmerScaler from "../LordImmerScaler.js";
import MeasurementTool from "../MeasurementTool.js";
import AddLineCommand from "../Commands/AddLineCommand.js";

// This tools enables measuring the length of a line between two points.
class LineLengthMeasurementTool extends MeasurementTool {
    // The first command executed by this tool.
    _first = null;
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
            this._model.do(new AddPointCommand(this, this._model, x, y));
            console.log("Point 1 added");
        } else if (this._pointCount == 1) {
            // The second step draws a line from the first point to the newly selected point.
            this._model.do(new AddPointCommand(this, this._model, x, y));
            // Draw the line between the two points
            this._model.do(new AddLineCommand(this, this._model, [[this._first.getX(), this._first.getY()], [x, y]], false));
            // Set the tool to finished
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

}

export default LineLengthMeasurementTool;