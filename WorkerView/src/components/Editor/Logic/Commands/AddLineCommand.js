import model from "../Model/Model.js";
import Command from "../Command.js";

class AddLineCommand extends Command {

    _x1;
    _y1;

    _x2;
    _y2;

    _popup;
    _header;
    _description;
    _value;

    _callback;

    constructor(creator, model, x1, y1, x2, y2, popup=false, header = "", description = "", value = "", callback) {
        super(creator, model);
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
        this._popup = popup;
        this._header = header;
        this._description = description;
        this._value = value;

        this._callback = callback;
    }


    execute() {
        super.execute();

        this._model.addLine(this._x1, this._y1, this._x2, this._y2,"00ff00", this._popup, this._header, this._description, this._value, this._callback);
    }

    unExecute() {
        super.unExecute();

        this._model.removeLine(this._x, this._y, "00ff00");
    }


    getX1() {
        return this._x1;
    }

    getY1() {
        return this._y1;
    }

    getX2() {
        return this._x2;
    }

    getY2() {
        return this._y2;
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

export default AddLineCommand;