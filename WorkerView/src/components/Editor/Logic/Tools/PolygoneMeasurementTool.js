import * as MathUtils from "../Utils/MathUtils.js";
import AddPointCommand from "../Commands/AddPointCommand.js";
import LordImmerScaler from "../LordImmerScaler.js";
import MeasurementTool from "../MeasurementTool.js";
import AddAreaCommand from "../Commands/AddAreaCommand.js"

// This tools enables selecting a rectangular reference measure.
class PolygoneMeasurementTool extends MeasurementTool {
    // The first command executed by this tool.
    _first = null;
    // The amout of points that the user has already selected in the image.
    _pointCount = 0;

    // stores the points
    _points = [];

    // Boolean value which specifies whether the tool has completed it's purpose or not.
    _finished = false;

    // This callback is just for storing purposes and is accessed by a vue component for tool selection purposes.
    callback;

    constructor(model) {
        // setting the text and the icon which will be displayed in the tool sidebar
        super(model, "Measure Polygone", "pi pi-expand");
    }


    onClick(x, y) {
        this._points.push([x,y]);

        // Checking how many points were already specified by the user and adding new commands accordingly.
        if (this._pointCount == 0) {
            // The first command is simply adding a point to the user selected coordinates.
            this._model.do(new AddPointCommand(this, this._model, x, y));
        }
        else {
            this._model.do(new AddAreaCommand(this, this._model, this._points, this.calculateArea()));
        }        
    }

    // This function is called during the execution of the commands created by this tool.
    updateExecute(command) {
        if (this._pointCount == 0) {
            // If there is no point set yet, the counter is incremented and the reference to the first point is set.
            this._first = command;
            this._pointCount++;
        } else //if (this._pointCount < 3) {
            // As long as not all the points are specified, the counter is simply incremented.
            this._pointCount++;
    }

    // TODO make unexecute right
    // This function is called during the unexecution of the commands created by this tool.
    updateUnExecute(point) {
        if (this._pointCount >= 1) {
            // If not all points have been set, the counter is simply decremented.
            this._pointCount--;
        } else {
            this._first = null;
        }
    }

    // Calculates the area based on the currently selected points
    calculateArea(){
        let realWorldPoints = [];
        for (var i = 0; i < this._points.length; i++){
            realWorldPoints.push(LordImmerScaler.transformToRealWorld(this._points[i][0], this._points[i][1]));
        }
        return MathUtils.getPolygonArea(realWorldPoints);
    }

    // For deselecting this tool, all the already exeuted commands are undone (ONLY WHEN THE TOOL IS NOT FINISHED YET)
    deselect() {
        super.deselect();
        if (this._finished) return;
        while (this._model.undo() != this._first) {
            // Undoes all the commands done by this tool if it is not yet finished
        }
    }
}

export default PolygoneMeasurementTool;