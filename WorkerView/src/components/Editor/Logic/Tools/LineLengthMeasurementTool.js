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

    // The amount of points that the user has already selected in the image.
    _pointCount = 0;
    
    // Boolean value which specifies whether the tool has completed it's purpose or not.
    _finished = false;

    constructor(model) {
        // setting the text and the icon which will be displayed in the tool sidebar
        // also optionally add a tooltip and a css class (the css class has the prefix tool-), lastly you can add a toast message when clicking the tool
        super(model, "Strecke Messen", "pi pi-arrows-h", "Messe die Strecke zwischen zwei Punkten", "line", "Wählen Sie zwei Punkte aus um den Abstand zwischen ihnen auszumessen.");
    }

    onClick(x, y) {
        // This tool should not be usable if no reference is set
        if(!LordImmerScaler._referenceSet){
            document.dispatchEvent(new CustomEvent("deselectTool"));
            return;
        }

        // Checking how many points were already specified by the user and adding new commands accordingly.
        if (this._pointCount == 0 || this._pointCount == 2) {
            // The first command is simply adding a point to the user selected coordinates.
            this._firstX = x;
            this._firstY = y;
            this._model.setPointPreview(true);
            this._model.do(new AddPointCommand(this, this._model, this._firstX, this._firstY));
        } else if (this._pointCount == 1) {
            // The second step draws a line from the first point to the newly selected point.
            this._secondX = x;
            this._secondY = y;
            // Draw the line between the two points, add the second point and a label with the length of the line.
            this._model.do(new AddLineCommand(this, this._model, [[this._firstX, this._firstY], [this._secondX, this._secondY]], true, true, this.measureLength(), false));
            // The tool is finished after the second point is set, all points are reset.
            this.measurementCompleted();
        }
    }

    // can be used in the future for more features
    onRightClick() {
        console.log('Right Click');
    }

    onMouseMove(x, y) {
        if(this._pointCount != 1) {
            // the mouse position is reset to clear the screen
            this._model.updateCurrentMousePosition(0, 0);
            return;
        } 
        
        this._model.updateCurrentMousePosition(x, y);
    }

    onMouseLeave() {
        // this will stop the preview
        this._model.updateCurrentMousePosition(0,0);
    }

    updateExecute(command) {
        if (this._pointCount == 0 || this._pointCount == 2) {
            // If there is no point set yet, the counter is incremented and the reference to the first point is set.
            this._first = command;
            this._model.setPointPreview(true);
            this._pointCount = 1;
            this._finished = false;
        }
        else if(this._pointCount == 1) {
            this._model.setPointPreview(false);
            this._finished = true;
            this._pointCount++;
        }
    }

    updateUnExecute() {
        if (this._pointCount == 1) {
            // If there is only one point set, the counter is decremented and the reference to the first point is removed.
            this._first = null;
            this._finished = false;
            this._pointCount--;
            this._model.updateCurrentMousePosition(0, 0)
            this._model.setPointPreview(false);
        }
        else if (this._pointCount == 2) {
            this._pointCount--;
            this._finished = false;
            this._model.setPointPreview(true);
        }
    }

    deselect() {
        super.deselect();
        this._model.setPointPreview(false);
        if (this._finished) return;

        // if only one point is made remove the point (check the point count so it won't remove other commands)
        while (this._pointCount > 0) {
            this._model.undo();
        }
    }

    // This function transforms the coordinates of the two points to real world coordinates and calculates the distance between them using the MathUtils.
    measureLength() {
        let point_1 = LordImmerScaler.transformToRealWorld(this._firstX, this._firstY);
        let point_2 = LordImmerScaler.transformToRealWorld(this._secondX, this._secondY);
        return MathUtils.getDistance([point_1[0], point_1[1]],[point_2[0], point_2[1]]).toFixed(2);
    }
}

export default LineLengthMeasurementTool;