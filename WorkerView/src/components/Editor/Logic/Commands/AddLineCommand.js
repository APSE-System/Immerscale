import model from "../Model/Model.js";
import Command from "../Command.js";

class AddLineCommand extends Command {

    _points;

    _popup;
    _header;
    _description;
    _value;

    _callback;

    constructor(creator, model, points, popup= false, header = "", description = "", value = "", callback) {
        super(creator, model);
        this._points = points;
        this._popup = popup;
        this._header = header;
        this._description = description;
        this._value = value;

        this._callback = callback;
    }


    execute() {
        super.execute();

        this._model.addLine(this._points,"00ff00", this._popup, this._header, this._description, this._value, this._callback);
    }

    unExecute() {
        super.unExecute();

        this._model.removeLine(this._points, "00ff00");
    }


    getPoint(index) {
        return this._points[index];
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