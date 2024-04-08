import model from "../Model/Model.js";
import Command from "../Command.js";

class AddPointCommand extends Command {

    _x;
    _y;

    _popup;
    _header;
    _description;
    _value;

    _callback;

    constructor(creator, model, x, y, popup=false, header = "", description = "", value = "", callback) {
        super(creator, model);
        this._x = x;
        this._y = y;
        this._popup = popup;
        this._header = header;
        this._description = description;
        this._value = value;

        this._callback = callback;
    }


    execute() {
        super.execute();

        this._model.addPoint(this._x, this._y, "00ff00", this._popup, this._header, this._description, this._value, this._callback);
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