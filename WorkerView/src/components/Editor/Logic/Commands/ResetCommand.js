import Command from "../Command.js";


// not used
class ResetCommand extends Command{

    constructor(creator, model) {
        super(creator, model);
    }

    execute() {
        super.execute();
    }

    unExecute() {
        super.unExecute();
    }

}

export default ResetCommand;