import model from "../Model.js";

class AddPointCommand extends Command{

    _x;
    _y;


    constructor(creator, model, x, y) {
        super(creator, model);
        this._x = x;
        this._y = y;
    }

    execute() {
        super.execute();

        this._model.addPoint(this._x, this._y, "#00ff00");
    }

    unExecute() {
        super.unExecute();

        this._model.removePoint(this._x, this._y, "#00ff00");
    }


    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }
}