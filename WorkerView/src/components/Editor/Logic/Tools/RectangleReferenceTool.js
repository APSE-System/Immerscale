import * as MathUtils from "../Utils/MathUtils.js";
import AddPointCommand from "../Commands/AddPointCommand.js";
import LordImmerScaler from "../LordImmerScaler.js";
import ReferenceTool from "../ReferenceTool.js";
import AddLineCommand from "../Commands/AddLineCommand.js";

// This tools enables selecting a rectangular reference measure.
class RectangleReferenceTool extends ReferenceTool {
    // The first command executed by this tool.
    _first = null;
    // The amout of points that the user has already selected in the image.
    _pointCount = 0;

    // The length of the first side which is specified by the user.
    _firstLength = -1;
    // The length of the second side which is specified by the user. As the reference is rectangular, only two sides have to be specified, as the other two have the same sizes.
    _secondLenght = -1;

    // Boolean value which specifies whether the tool has completed it's purpose or not.
    _finished = false;

    // This callback is just for storing purposes and is accessed by a vue component for tool selection purposes.
    callback;

    constructor(model) {
        // setting the text and the icon which will be displayed in the tool sidebar
        // also optionally add a tooltip and a css class (the css class has the prefix tool-), lastly you can add a toast message when clicking the tool
        super(model, "Rectangle Reference", "pi pi-stop", "description", "rectangle", "toast from rectangle");
    }


    onClick(x, y) {
        // Extracting the first and second line from the "first" reference, to keep the upcoming if statements shorter.
        let firstLine = null;
        let secondLine = null;
        if(this._first != null){
            firstLine = this._first.getNext();
            if(firstLine != null){
                secondLine = firstLine.getNext();
            }
        }

        // Checking how many points were already specified by the user and adding new commands accordingly.
        if (this._pointCount == 0) {
            // The first command is simply adding a point to the user selected coordinates.
            this._model.do(new AddPointCommand(this, this._model, x, y));
            this._model.setFirstPoint(x, y);
        } else if (this._pointCount == 1) {
            // The second step draws a line from the first point to the newly selected point.
            // Also, a popup is opened so the user can specify the size of this side.
            // The value of the side is returned via the callback.
            this._model.do(new AddLineCommand(this, this._model, [[this._first.getX(), this._first.getY()], [x, y]], true, false, null, true, "Length Input", "Please insert the length of this edge.", "Length in cm", (length)=>{this._firstLength = length;}));
        } else if (this._pointCount == 2) {
            // The third step draws a line from the second point to the newly selected point.
            // Also, a popup is opened so the user can specify the size of this side.
            // The value of the side is returned via the callback.
            this._model.do(new AddLineCommand(this, this._model, [[firstLine.getPoint(1)[0], firstLine.getPoint(1)[1]], [x, y]], true, false, null, true, "Length Input", "Please insert the length of this edge.", "Length in cm", (length)=>{this._secondLenght = length;}, true));
        } else if (this._pointCount == 3) {
            // The last step adds a line from the last point over the newly selected point to the first point.
            // Therefore, this step completes the selected rectangel.
            this._model.do(new AddLineCommand(this, this._model, [[secondLine.getPoint(1)[0], secondLine.getPoint(1)[1]], [x, y], [this._first.getX(), this._first.getY()]], true, false, null, false));
        }
    }

    // can be used in the future for more features
    onRightClick() {
        console.log('Right Click');
    }

    onMouseMove(x, y) {
        if(this._finished) return;
        
        this._model.updateCurrentMousePosition(x, y);
    }

    onMouseLeave() {
        this._model.updateCurrentMousePosition(0,0);
    }

    // This function is called during the execution of the commands created by this tool.
    updateExecute(command) {
        if (this._pointCount == 0) {
            // If there is no point set yet, the counter is incremented and the reference to the first point is set.
            this._first = command;
            this._pointCount++;
        } else if (this._pointCount == 1) {
            this._pointCount++;
            this._model.resetFirstPoint();
            // this updates the popup value of the command, so it can be displayed as a suggestion if you redo the command
            command.updatePopup(this._firstLength);
        } else if (this._pointCount == 2) {
            // As long as not all the points are specified, the counter is simply incremented.
            this._pointCount++;
            this._model.resetFirstPoint();
            // this updates the popup value of the command, so it can be displayed as a suggestion if you redo the command
            command.updatePopup(this._secondLenght);
        } else {
            // If all the four points are specified, the reference is set and the tool is finished.
            this.setReference()
            this._finished = true;
            this._model.updateCurrentMousePosition(0, 0);
            this._model.resetFirstPoint();
            this._pointCount++;
        }
    }

    // This function is called during the unexecution of the commands created by this tool.
    updateUnExecute(point) {
        if (this._pointCount == 4) {
            // If all four points were already set, the matrix is set to null again.
            this._pointCount--;
            LordImmerScaler.changeMatrix(null);
            this._finished = false;
        } else if (this._pointCount == 3) {
            // If not all points have been set, the counter is simply decremented.
            this._pointCount--;
        } else if (this._pointCount == 2) {
            this._pointCount--;
            this._model.setFirstPoint(this._first.getX(), this._first.getY())
        } else {
            this._first = null;
            this._model.resetFirstPoint();
            this._pointCount--;
        }
    }

    // This function calculates the transformation matrix based on the user input and sets it in the Lord.
    setReference() {

        // Generating the "Source" array which is the coordinates of all the specified points.
        var src = [];
        var secondLine = this._first.getNext().getNext();
        var thirdLine = secondLine.getNext();

        src.push([this._first.getX(), this._first.getY()]);
        src.push([secondLine.getPoint(0)[0], secondLine.getPoint(0)[1]]);
        src.push([secondLine.getPoint(1)[0], secondLine.getPoint(1)[1]]);
        src.push([thirdLine.getPoint(1)[0], thirdLine.getPoint(1)[1]]);

        // Generating the "destination" array which is the coordinates of the reference in the real world which match to the source points.
        // These coordinates can be calculated based on the edge lengths specified by the user.
        var dst = [[0, 0], [0, this._firstLength], [this._secondLenght, this._firstLength], [this._secondLenght, 0]];

        // The source and the destination points are used to calculate the transformation matrix and finally setting it.
        LordImmerScaler.changeMatrix(MathUtils.calculatePerspectiveMatrix(src, dst));
    }

    // For deselecting this tool, all the already exeuted commands are undone (ONLY WHEN THE TOOL IS NOT FINISHED YET)
    deselect() {
        super.deselect();
        if (this._finished) return;

        this._model.resetFirstPoint();

        // Undoes all the commands done by this tool if it is not yet finished
        while(this._pointCount > 0) {
            this._model.undo();
        }

        // while (tmp != this._first || tmp == null) {
        //     tmp = this._model.undo();
        //     console.log(tmp)
        // }
    }


}

export default RectangleReferenceTool;