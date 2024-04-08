import Command from "../Command.js";

class ReferenceResultCommand extends Command{

    constructor(creator, model, title) {
        super(creator, model);
    }

    execute() {
        super.execute();

        this._model.finishReference();
    }

    unExecute() {
        super.unExecute();

        this._model.unfinishReference();
    }


}
export default ReferenceResultCommand;