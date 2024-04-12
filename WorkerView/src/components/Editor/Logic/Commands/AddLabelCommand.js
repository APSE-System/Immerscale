import Command from "../Command.js";

// This command can be used for adding a label to the model canvas at a specific position.
class AddLabelCommand extends Command {
    // The x and y coordinates of the label.
    _point;

    // the text that is displayed in the label
    _value;

    constructor(creator, model, point, value) {
        super(creator, model);
        this._point = point;
        this._value = value;
    }

    // This is the execute method of this command.
    execute() {
        super.execute();
        console.log(this._value);
        this._model.addLabel(this._point, this._value);
    }

    // For unexecuting, the label is removed from the model again.
    unExecute() {
        super.unExecute();
        this._model.removeLabel(this._point, this._value);
    }

}

export default AddLabelCommand;