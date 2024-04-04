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

        // Vue should be accessed here and a point should be added to the image
    }

    unExecute() {
        super.unExecute();

        // Vue should be accessed here and the point in the image should be removed.
    }

}