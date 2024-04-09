import model from "../Model/Model.js";
import Command from "../Command.js";

class AddPointCommand extends Command {

    _x;
    _y;


    constructor(creator, model, x, y) {
        super(creator, model);
        this._x = x;
        this._y = y;
    }


    execute() {
        super.execute();

        this._model.addPoint(this._x, this._y, "00ff00");
    }

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


    hasPopup() {
        return this._popup;
    }

    getHeader() {
        return this._header;
    }

    getDescription() {
        return this._description;
    }

    getValueName() {
        return this._value;
    }
}

export default AddPointCommand;