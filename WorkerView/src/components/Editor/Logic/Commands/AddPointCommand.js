import Command from "../Command.js";

class AddPointCommand extends Command {

    // Coordinates of the point
    _x;
    _y;


    constructor(creator, model, x, y) {
        super(creator, model);
        this._x = x;
        this._y = y;
    }

    // When this command is executed, the according point is added to the model.
    execute() {
        super.execute();

        this._model.addPoint(this._x, this._y, "00ff00");
    }

    // For unexecuting, the point is removed from the model again.
    unExecute() {
        super.unExecute();

        this._model.removePoint(this._x, this._y, "00ff00");
    }


    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }

}

export default AddPointCommand;