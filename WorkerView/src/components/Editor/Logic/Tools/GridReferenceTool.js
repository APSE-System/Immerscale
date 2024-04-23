import ReferenceTool from "../ReferenceTool.js";
import command from "../Command.js";
import AddGridCommand from "../Commands/AddGridCommand.js";
import { calculatePerspectiveMatrix, degreeToRadians, getDistance} from "../Utils/MathUtils.js";
import AddLineCommand from "../Commands/AddLineCommand.js";
import AddPointCommand from "../Commands/AddPointCommand.js";
import LordImmerScaler from "../LordImmerScaler.js";

class GridReferenceTool extends ReferenceTool{


    _xRot = 0;
    _yRot = 0;
    _zRot = 0;

    _xPos = 0
    _yPos = 0

    constructor(model) {
        // setting the text and the icon which will be displayed in the tool sidebar
        // also optionally add a tooltip and a css class (the css class has the prefix tool-), lastly you can add a toast message when clicking the tool
        super(model, "Grid Reference", "pi pi-table", "description", "grid", "toast from grid");
    }

    _pointCount = 0;
    _firstPoint = [];
    _secondPoint = [];
    _firstLength = -1;

    _lastGridCommand = null;

    onClick(x, y) {


        if(this._pointCount == 0){
            this._model.do(new AddPointCommand(this, this._model, x, y));
        }else if(this._pointCount == 1){
            this._secondPoint = [x,y];
            this._model.do(new AddLineCommand(this, this._model, [[this._firstPoint[0], this._firstPoint[1]], [x, y]], true, false, null, true, "Length Input", "Please insert the length of this edge.", "Length in cm", (length)=>{this._firstLength = length; this.setReference();}));
        }

    }


    updateExecute(command) {
        if (this._pointCount == 0) {
            // If there is no point set yet, the counter is incremented and the reference to the first point is set.
            this._firstPoint = [command._x, command._y];
            this._pointCount++;
        }
    }

    updateUnExecute(command) {
        super.updateUnExecute(command);
    }

    select() {
        super.select();
        this.apply()
    }


    // This function calculates the transformation matrix based on the user input and sets it in the Lord.
    setReference() {

        // Generating the "Source" array which is the coordinates of all the specified points.
        var src = [];

        var point1 = this._lastGridCommand._points[0]
        var point2 = this._lastGridCommand._points[10]
        var point3 = this._lastGridCommand._points[39]
        var point4 = this._lastGridCommand._points[29]

        src.push([point1.x, point1.y]);
        src.push([point2.x, point2.y]);
        src.push([point3.x, point3.y]);
        src.push([point4.x, point4.y]);

        // Generating the "destination" array which is the coordinates of the reference in the real world which match to the source points.
        // These coordinates can be calculated based on the edge lengths specified by the user.
        var dst = [[0, 100], [100, 100], [100, 0], [0, 0]];

        // Entzerrt aber ohne skalierung:
        var entzerrt_ohne_scale = calculatePerspectiveMatrix(src, dst)

        LordImmerScaler.changeMatrix(entzerrt_ohne_scale, 1);


        var Point1_entzerrt_os = LordImmerScaler.transformToRealWorld(this._firstPoint[0], this._firstPoint[1]);
        var Point2_entzerrt_os = LordImmerScaler.transformToRealWorld(this._secondPoint[0], this._secondPoint[1]);

        var distanceFalse = getDistance(Point1_entzerrt_os, Point2_entzerrt_os)

        var scaleFactor = this._firstLength / distanceFalse

        // The source and the destination points are used to calculate the transformation matrix and finally setting it.
        LordImmerScaler.changeMatrix(entzerrt_ohne_scale, scaleFactor);
    }


    // For deselecting this tool, all the already executed commands are undone (ONLY WHEN THE TOOL IS NOT FINISHED YET)
    deselect() {
        super.deselect();
        if (this._finished) return;
    }

    rotateXBackward() {
        this._xRot -= 2;
        this.apply()
    }

    rotateXForward() {
        this._xRot += 2;
        this.apply()
    }

    rotateZBackward() {
        this._zRot -= 2;
        this.apply()
    }

    rotateZForward() {
        this._zRot += 2;
        this.apply()
    }

    rotateYBackward() {
        this._yRot -= 2;
        this.apply()
    }

    rotateYForward() {
        this._yRot += 2;
        this.apply()
    }

    apply(){

        this._lastGridCommand = new AddGridCommand(this, this._model,degreeToRadians(this._xRot), degreeToRadians(this._yRot), degreeToRadians(this._zRot), this._xPos, this._yPos)

        this._model.do(this._lastGridCommand);
    }

    moveDown(){
        this._yPos += 5;
        this.apply()
    }
    moveUp(){
        this._yPos -= 5;
        this.apply()
    }

    moveRight(){
        this._xPos += 5;
        this.apply()
    }

    moveLeft(){
        this._xPos -= 5;
        this.apply()
    }




}

export default GridReferenceTool;