import * as MathUtils from "../Utils/MathUtils.js";
import AddPointCommand from "../Commands/AddPointCommand.js";
import LordImmerScaler from "../LordImmerScaler.js";
import MeasurementTool from "../MeasurementTool.js";
import AddAreaCommand from "../Commands/AddAreaCommand.js"

// This tools enables selecting a rectangular reference measure.
class PolygonMeasurementTool extends MeasurementTool {
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
        // setting the text and the icon which will be displayed in the tool sidebar along with the tooltip, css class and toast message
        super(model, "Measure Polygon", "pi pi-box", "Measure the area of a Polygon", "polygon", "Measure the area of an object by selecting the outer points of a polygon.");
    }


    onClick(x, y) {

        // This tool should not be usable if no reference is set
        if(!LordImmerScaler._referenceSet){
            document.dispatchEvent(new CustomEvent("deselectTool"));
            return;
        }

        // Checking how many points were already specified by the user and adding new commands accordingly.
        if (this._pointCount == 0) {
            // The first command is simply adding a point to the user selected coordinates.
            this._model.do(new AddPointCommand(this, this._model, x, y));
        }
        else if (this._pointCount == 1) {
            var pointsCopy = this._points.slice(0);
            pointsCopy.push([x,y]);
            this._model.do(new AddAreaCommand(this, this._model, pointsCopy, this.calculateArea(pointsCopy)));
        }   
        else {
            var pointsCopy = this._points.slice(0);
            pointsCopy.push([x,y]);
            this._model.do(new AddAreaCommand(this, this._model, pointsCopy, this.calculateArea(pointsCopy)));
            this.measurementCompleted();
            this._finished = true;
        }
    }

    // will mark the current polygon as complete and go to the next area
    onRightClick() {    
        this._model.setPointPreview(false);
        this._model.setAreaPreview(false);
        this.reset();
    }

    onMouseMove(x, y) {
        this._model.updateCurrentMousePosition(x, y);
    }

    onMouseLeave() {
        this._model.updateCurrentMousePosition(0, 0);
    }

    // reset values
    reset() {
        this._first = null;
        this._pointCount = 0;    
        this._points = [];
        this._finished = false;
    }

    // This function is called during the execution of the commands created by this tool.
    updateExecute(command) {
        if (command instanceof AddPointCommand) {
            // If there is no point set yet, the counter is incremented and the reference to the first point is set.
            this._first = command;
            this._pointCount = 1;
            this._points = []
            this._points.push([command.getX(), command.getY()]);
            this._model.setPointPreview(true);
            this._model.setAreaPreview(false);
        } else {
            // As long as not all the points are specified, the counter is simply incremented.
            this._pointCount++;
            this._points= command.getPoints();
            this._model.setAreaPreview(true);
        }
    }

    // This function is called during the unexecution of the commands created by this tool.
    updateUnExecute(command) {
        if (this._pointCount >= 3) {
            // If not all points have been set, the counter is simply decremented.
            this._pointCount--;
            this._points.pop();
            this._model.setAreaPreview(true);
            this._model.setPointPreview(true);
        } else if(this._pointCount == 2) {
            this._pointCount--;
            this._model.setAreaPreview(false);
            // this._model.setPointPreview(true);
        } else if(this._pointCount == 1) {
            this._finished = false;
            this._model.setAreaPreview(false);
            this._model.setPointPreview(false);
            this._pointCount--;
            this._points.pop();
            this._first = null;
        }
    }

    // Calculates the area based on the currently selected points
    calculateArea(points){
        let realWorldPoints = [];
        for (var i = 0; i < points.length; i++){
            realWorldPoints.push(LordImmerScaler.transformToRealWorld(points[i][0], points[i][1]));
        }
        return MathUtils.getPolygonArea(realWorldPoints);
    }

    // For deselecting this tool, all the already exeuted commands are undone (ONLY WHEN THE TOOL IS NOT FINISHED YET)
    deselect() {
        super.deselect();
        this._model.setAreaPreview(false);
        if (this._finished) {
            this.reset();
            return;
        }
      
        // Undoes all the commands done by this tool if it is not yet finished
        while(this._pointCount > 0) {
            this._model.undo();
        }
    }
}

export default PolygonMeasurementTool;