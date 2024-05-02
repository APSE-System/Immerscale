import ReferenceTool from "../ReferenceTool.js";
import command from "../Command.js";
import AddGridCommand from "../Commands/AddGridCommand.js";
import {
    calculatePerspectiveMatrix,
    degreeToRadians,
    getDistance
} from "../Utils/MathUtils.js";
import AddLineCommand from "../Commands/AddLineCommand.js";
import AddPointCommand from "../Commands/AddPointCommand.js";
import LordImmerScaler from "../LordImmerScaler.js";

class GridReferenceTool extends ReferenceTool {


    _xRot = 0;
    _yRot = 0;
    _zRot = 0;

    _xPos = 0;
    _yPos = 0;

    _scale = 100;
    _scaleX = 100.0;
    _scaleY = 100.0;


    _pointCount = 0;
    _gridSet = false;
    _firstPoint = [];
    _secondPoint = [];
    _firstLength = -1;

    _dragging = false;

    _lastGridCommand = null;

    constructor(model) {
        // setting the text and the icon which will be displayed in the tool sidebar
        // also optionally add a tooltip and a css class (the css class has the prefix tool-), lastly you can add a toast message when clicking the tool
        super(model, "Gitternetz Referenz", "pi pi-table", "Referenz anhand einer bekannten Länge und paralleler Linien im Bild", "grid", "Wählen Sie eine bekannte Referenzlänge und legen Sie das Gitternetz  auf parallele Linien im Bild.");
    }


    onClick(x, y) {
        // If the grid is not set yet, no clicks should be registered
        if (!this._gridSet) return;

        if (this._pointCount === 0) {
            this._model.do(new AddPointCommand(this, this._model, x, y));
        } else if (this._pointCount === 1) {
            this._secondPoint = [x, y];
            this._model.do(new AddLineCommand(this, this._model, [[this._firstPoint[0], this._firstPoint[1]], [x, y]], true, false, null, true, "Länge angeben", "Geben Sie die Länge der Strecke an.", "Länge in cm", (length) => {
                this._firstLength = length;
                this.setReference();
            }, ));
        }
    }


    updateExecute(command) {
        if (this._pointCount === 0 && this._gridSet) {
            // If there is no point set yet, the counter is incremented and the reference to the first point is set.
            this._firstPoint = [command._x, command._y];
            this._pointCount++;
        } else if (this._pointCount === 1) {
            command.updatePopup(this._firstLength);
            this._pointCount++;
            this._model.addGrid(null);
            this._finished = true;
        }
    }

    updateUnExecute(command) {
        if (this._pointCount === 2) {
            this._pointCount--;
            this._finished = false;
            LordImmerScaler.changeMatrix(null);
        } else if (this._pointCount === 1) {
            this._pointCount--;
            this._gridSet = false;
            this.applyGridCommand();
            document.dispatchEvent(new CustomEvent("GridToolSelected"));
        }
    }

    select() {
        super.select();

        this._xPos = this._model.width / 2;
        this._yPos = this._model.height / 2;

        this.applyGridCommand()

        // Open the controll sidebar
        document.dispatchEvent(new CustomEvent("GridToolSelected"));
    }


    // This function calculates the transformation matrix based on the user input and sets it in the Lord.
    setReference() {
        // Generating the "Source" array which is the coordinates of all the specified points.
        var src = [];

        var refPoints = this._lastGridCommand.getReferencePoints()

        var point1 = refPoints[0]
        var point2 = refPoints[1]
        var point3 = refPoints[2]
        var point4 = refPoints[3]

        src.push([point1.x, point1.y]);
        src.push([point2.x, point2.y]);
        src.push([point3.x, point3.y]);
        src.push([point4.x, point4.y]);

        // Generating the "destination" array which is the coordinates of the reference in the real world which match to the source points.
        // These coordinates can be calculated based on the edge lengths specified by the user.
        var dst = [[0, this._scaleY], [this._scaleX, this._scaleY], [this._scaleX, 0], [0, 0]];

        // Transformed but has no scale yet:
        var transformed_without_scale = calculatePerspectiveMatrix(src, dst)

        LordImmerScaler.changeMatrix(transformed_without_scale, 1);

        // scale the first and the second point as well




        var Point1_transformed_wo_scale = LordImmerScaler.transformToRealWorld(this._firstPoint[0], this._firstPoint[1]);
        var Point2_transformed_wo_scale = LordImmerScaler.transformToRealWorld(this._secondPoint[0], this._secondPoint[1]);

        var distanceFalse = getDistance(Point1_transformed_wo_scale, Point2_transformed_wo_scale);

        var scaleFactor = this._firstLength / distanceFalse

        // The source and the destination points are used to calculate the transformation matrix and finally setting it.
        LordImmerScaler.changeMatrix(transformed_without_scale, scaleFactor);
    }


    // For deselecting this tool, all the already executed commands are undone (ONLY WHEN THE TOOL IS NOT FINISHED YET)
    deselect() {
        if (this._finished) return;

        super.deselect();
        // Close the controll sidebar
        document.dispatchEvent(new CustomEvent("GridToolUnselected"));
    }

    applyGridCommand() {
        if (this._pointCount === 0) {
            this._lastGridCommand = new AddGridCommand(this, this._model, degreeToRadians(this._xRot), degreeToRadians(this._yRot), degreeToRadians(this._zRot), this._xPos, this._yPos, this._scale, this._scaleX, this._scaleY);
            this._model.do(this._lastGridCommand);
        }
    }

    onMouseMove(x, y) {
        if (this._gridSet || !this._dragging) return;

        this._xPos = x;
        this._yPos = y;
        this.applyGridCommand()
    }

    onMouseUp() {
        this._dragging = false;
    }

    onMouseDown(x, y) {
        if (this._gridSet) return;

        var radius = 20;
        var distance = Math.sqrt(Math.pow(x - this._xPos, 2) + Math.pow(y - this._yPos, 2));

        if (distance <= radius) {
            this._dragging = true;
        }
    }

    setXRotation(angle) {
        if (this._gridSet) return;
        this._xRot = angle;
        this.applyGridCommand()
    }

    setYRotation(angle) {
        if (this._gridSet) return;
        this._yRot = angle;
        this.applyGridCommand()
    }

    setZRotation(angle) {
        if (this._gridSet) return;
        this._zRot = angle;
        this.applyGridCommand()
    }

    setScale(scale, scaleX, scaleY) {
        if (this._gridSet) return;
        this._scale = scale;
        this._scaleX = scaleX;
        this._scaleY = scaleY;
        this.applyGridCommand();
    }

    setGrid() {
        this._gridSet = true;
        this._model.addGrid(null)
        document.dispatchEvent(new CustomEvent("GridToolUnselected"));
    }

}

export default GridReferenceTool;