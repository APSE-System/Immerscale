import Command from "../Command.js";


// The purpose of this command is to serve as a default command which cannot be undone and is always in the command chain.
// This has the positiver effect, that all the real commands done by the user can be undone and redone, even the very first one.
class DefaultCommand extends Command{

    constructor(creator, model) {
        super(creator, model);
    }

    execute() {
        // Nothing to do here, just a placeholder command.
    }

    unExecute() {
        // Nothing to do here, just a placeholder command.
    }

}

export default DefaultCommand;