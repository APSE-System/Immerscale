import Command from "../Command.js";


// The purpose of this command is to serve as a reset command for the polygoneMeasurementTool
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