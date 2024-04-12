import Command from "../Command.js";

// This command can be used for drawing an area in the model canvas.
// Additionally, a popup can be opened, which could be used for asking the user for the length of the drawn line.
class AddAreaCommand extends Command {

    // Two dimentional array of points [[x1,y1],[x2,y2]...], which form a multi-point-line in the specified order.
    _points;

    // Constructor for initialising the attributes
    constructor(creator, model, points) {
        super(creator, model);
        this._points = points;
    }


    // This is the execute method of this command.
    execute() {
        super.execute();

        this._model.addArea(this._points,"ff0000");
    }

    // For unexecuting, the line is removed from the model again, and the popup (if present) too.
    unExecute() {
        super.unExecute();

        this._model.removeArea(this._points, "ff0000");
    }

    // This method can be used to access a specific point of this area
    getPoint(index) {
        return this._points[index];
    }
}

export default AddAreaCommand;
