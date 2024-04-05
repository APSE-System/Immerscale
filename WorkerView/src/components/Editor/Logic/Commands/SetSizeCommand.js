import Command from "../Command.js";

class SetSizeCommand extends Command{

    _size;


    constructor(creator, model, size) {
        super(creator, model);
        this._size = size;
    }

    execute() {
        super.execute();

        this._model.addSize();
    }

    unExecute() {
        super.unExecute();

        this._model.removeSize();
    }


}


export default SetSizeCommand;