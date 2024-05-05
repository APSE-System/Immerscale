import ReferenceTool from "../ReferenceTool.js";
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

    // The rotation of the grid in all three dimensions in degrees.
    _xRot = 0;
    _yRot = 0;
    _zRot = 0;

    // Position of the center of the grid.
    _xPos = 0;
    _yPos = 0;

    // The overall scale and the x and y scale of the grid in percent.
    _scale = 100;
    _scaleX = 100.0;
    _scaleY = 100.0;


    // The amount of points that the user has set.
    _pointCount = 0;
    // True if the grid has been set as fixed by the user.
    _gridSet = false;
    // X and Y coordinate of the first point set by the user.
    _firstPoint = [];
    // X and Y coordinate of the second point set by the user.
    _secondPoint = [];
    // Length of the reference specified by the user.
    _length = -1;

    // This is true when the user is currently dragging the grid.
    _dragging = false;

    // Reference to the last executed grid command.
    _lastGridCommand = null;

    constructor(model) {
        // setting the text and the icon which will be displayed in the tool sidebar
        // also optionally add a tooltip and a css class (the css class has the prefix tool-), lastly you can add a toast message when clicking the tool
        super(model, "Gitternetz Referenz", "pi pi-table", "Referenz anhand einer bekannten Länge und paralleler Linien im Bild", "grid", "Wählen Sie eine bekannte Referenzlänge und legen Sie das Gitternetz  auf parallele Linien im Bild.");
    }


    onClick(x, y) {
        // If the grid is not set yet, no clicks should be registered
        if (!this._gridSet) return;

        // The first set point should generate a new point command, while the second point should draw a line and trigger setting the reference.
        if (this._pointCount === 0) {
            this._model.do(new AddPointCommand(this, this._model, x, y));
        } else if (this._pointCount === 1) {
            this._secondPoint = [x, y];
            this._model.do(new AddLineCommand(this, this._model, [[this._firstPoint[0], this._firstPoint[1]], [x, y]], true, false, null, true, "Länge angeben", "Geben Sie die Länge der Strecke an.", "Länge in cm", (length) => {
                this._length = length;
                this.setReference();
            }, ));
        }
    }

    // This method is called when a command of this tool is executed
    updateExecute(command) {
        if (this._pointCount === 0 && this._gridSet) {
            // If there is no point set yet, the counter is incremented and the coordinates of the first point are stored.
            this._firstPoint = [command._x, command._y];
            this._pointCount++;
            this._model.setPointPreview(true);
        } else if (this._pointCount === 1) {
            // If the first point is already set, this tool is finished.
            command.updatePopup(this._length);
            this._pointCount++;
            this._model.addGrid(null);
            this._finished = true;
            this._model.setPointPreview(false);
        }
    }

    // This method is called when a command of this tool is unexecuted.
    updateUnExecute(command) {
        if (this._pointCount === 2) {
            // If the second point is remove again, the tool was already finished and the reference has to be unset again in the lord.
            this._pointCount--;
            this._finished = false;
            LordImmerScaler.changeMatrix(null);
            this._model.setPointPreview(true);
        } else if (this._pointCount === 1) {
            // If the first point is removed, the user has to go back to the grid rotation part.
            this._pointCount--;
            this._gridSet = false;
            this.applyGridCommand();
            document.dispatchEvent(new CustomEvent("GridToolSelected"));
            this._model.setPointPreview(false);
        }
    }

    select() {
        super.select();

        // Initialize the position of a grid in a way that it is drawn in the center of the photo.
        this._xPos = this._model.width / 2;
        this._yPos = this._model.height / 2;

        // Show the grid
        this.applyGridCommand()

        // Open the controls sidebar
        document.dispatchEvent(new CustomEvent("GridToolSelected"));
    }


    // This function calculates the transformation matrix based on the user input and sets it in the Lord.
    setReference() {
        // Generating the "Source" array which is the coordinates of four points of the grid which form a square.
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
        // These coordinates can be calculated based on the scale of the grid, as the real world scale will be applied afterwards
        // and it is only important that the aspectratio is kept.
        var dst = [[0, this._scaleY], [this._scaleX, this._scaleY], [this._scaleX, 0], [0, 0]];

        // Transforms the points but not with the real world scale:
        var transformed_without_scale = calculatePerspectiveMatrix(src, dst)
        LordImmerScaler.changeMatrix(transformed_without_scale, 1);

        // Transform the first and the second point:
        var Point1_transformed_wo_scale = LordImmerScaler.transformToRealWorld(this._firstPoint[0], this._firstPoint[1]);
        var Point2_transformed_wo_scale = LordImmerScaler.transformToRealWorld(this._secondPoint[0], this._secondPoint[1]);

        // Get the distance of the two transformed points. They are perspectively correct, but the real world scale is missing.
        var distanceFalse = getDistance(Point1_transformed_wo_scale, Point2_transformed_wo_scale);

        // Retrieving the scale factor by deviding the real length specified by the user through the just calculated length.
        var scaleFactor = this._length / distanceFalse

        // Set the correct scale factor in the lord
        LordImmerScaler.changeMatrix(transformed_without_scale, scaleFactor);
    }


    // For deselecting this tool, all the already executed commands are undone (ONLY WHEN THE TOOL IS NOT FINISHED YET)
    deselect() {
        this._model.setPointPreview(false);
        if (this._finished) return;

        super.deselect();
        // Close the control sidebar
        document.dispatchEvent(new CustomEvent("GridToolUnselected"));
    }

    // Creates a new grid based on the transformations the user specified in the controls.
    applyGridCommand() {
        if (this._pointCount === 0) {
            this._lastGridCommand = new AddGridCommand(this, this._model, degreeToRadians(this._xRot), degreeToRadians(this._yRot), degreeToRadians(this._zRot), this._xPos, this._yPos, this._scale, this._scaleX, this._scaleY);
            this._model.do(this._lastGridCommand);
        }
    }

    // If the user is dragging the grid, this method is used to update the grids position.
    onMouseMove(x, y) {
        // used for the preview
        this._model.updateCurrentMousePosition(x, y);

        if (this._gridSet || !this._dragging) return;

        this._xPos = x;
        this._yPos = y;
        this.applyGridCommand()
    }

    onMouseLeave() {
        // this will stop the preview
        this._model.updateCurrentMousePosition(0,0);
    }

    onMouseUp() {
        this._dragging = false;
    }

    // This method is used for activating the dragging
    onMouseDown(x, y) {
        if (this._gridSet) return;

        // The dragging should only work if the user grabs the grid near a radius of the center of the grid.
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