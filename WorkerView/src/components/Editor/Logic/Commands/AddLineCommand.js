import Command from "../Command.js";
import * as MathUtils from "../Utils/MathUtils.js";

// This command can be used for drawing a line in the model canvas.
// Additionally, a popup can be opened, which could be used for asking the user for the length of the drawn line.
class AddLineCommand extends Command {

    // Two dimentional array of points [[x1,y1],[x2,y2]...], which form a multi-point-line in the specified order.
    _points;

    // Boolean value which states if a popup should be displayed.
    _popup;
    // The header text of the popup.
    _header;
    // The text inside the popup.
    _description;
    // The text that is displayed next to the input field of the popup
    _value;

    // Callback which will be executed when the popup is closed by the user.
    // Could be used to return the inserted value.
    _callback;

    // Constructor for initialising the attributes. As not every line has a popup, all the popup refering attributes are assgined a default value.
    constructor(creator, model, points, drawPoints = false, drawLabel = false, length = "", popup= false, header = "", description = "", value = "", callback) {
        super(creator, model);
        this._points = points;
        this._drawPoints = drawPoints;
        this._drawLabel = drawLabel;
        this._length = length;
        this._popup = popup;
        this._header = header;
        this._description = description;
        this._value = value;

        this._callback = callback;
    }


    // This is the execute method of this command.
    // For executing this command, simply a line with the according points is added to the model.
    // Also, it is checked if a popup should be displayed. If so, the values are handed over to the model, which will then open the popup.
    execute() {
        super.execute();
        // If there is a popup opened, it should be closed. Normally this shouldn't be the case anyways but with the undo/redo functionality there are scenarios where it could happen.
        this._model.removePopup();

        this._model.addLine(this._points,"00ff00");

        if(this._drawPoints)
            this._model.addPoint(this._points[1][0], this._points[1][1], "00ff00")
        if(this._drawLabel){
            let middlePoint = MathUtils.getMidpoint(this._points[0], this._points[1]);
            this._model.addLabel(middlePoint, this._length);
        }
        if(this._popup)
            this._model.addPopup(this._header, this._description, this._value, this._callback);
    }

    // For unexecuting, the line is removed from the model again, and the popup (if present) too.
    unExecute() {
        super.unExecute();

        this._model.removeLine(this._points, "00ff00");
        if(this._drawPoints)
            this._model.removePoint(this._points[1][0], this._points[1][1], "00ff00")
        if(this._drawLabel){
            let middlePoint = MathUtils.getMidpoint(this._points[0], this._points[1]);
            this._model.removeLabel(middlePoint, this._length);
        }
        if(this._popup)
            this._model.removePopup();
    }

    // This method can be used to access a specific point of this line.
    getPoint(index) {
        return this._points[index];
    }

}

export default AddLineCommand;