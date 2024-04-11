import CanvasPoint from "./ModelComponents/CanvasPoint.js";
import CanvasLine from "./ModelComponents/CanvasLine.js";
import DefaultCommand from "../Commands/DefaultCommand.js";
import Popup from "./ModelComponents/Popup.js";


class Model {
    // Points that should be drawn on the image
    canvasPoints = [];
    // Lines that should be drawn on the image
    canvasLines = [];
    // Popup which can be used for receiving user input values.
    popup = null;

    // Pointer to the current (last executed) command.
    currentCommand = null;

    constructor() {
        this.currentCommand = new DefaultCommand(null, this);
        this.popup = new Popup();
    }

    // Adds a given point to the list i.e. onto the image.
    addPoint(x, y, color) {
        this.canvasPoints.push(new CanvasPoint(x, y, color));
    }

    // Removes the given point from the image
    removePoint(x, y, color) {
        let index = this.canvasPoints.findIndex(point => point.x === x && point.y === y && point.color === color);
        if (index !== -1) {
            this.canvasPoints.splice(index, 1);
        }
    }

    // Adds a given line to the list i.e. onto the image.
    addLine(points, color) {
        this.canvasLines.push(new CanvasLine(points, color));
    }

    // removes the given line from the image
    removeLine(points, color) {
        let index = this.canvasLines.findIndex(line => line.points === points && line.color === color);
        if (index !== -1) {
            this.canvasLines.splice(index, 1);
        }
    }

    // Opens the popup showing the given values
    addPopup(header, description, value, callback) {
        this.popup.show(header, description, value, callback);
    }

    // Closes and clears the popup
    removePopup() {
        this.popup.clear();
    }

    // Executes the given command
    do(command) {
        // The new command is set as the next command of the previous command, to keep the comand history.
        this.currentCommand.setNext(command);
        command.setPrevious(this.currentCommand);
        this.currentCommand = command;

        command.execute();
    }

    // Undoes the last command
    undo() {
        // This ensures that the Default command is always present and wont be undone, so the command history is always kept.
        if (this.currentCommand instanceof DefaultCommand)
            return;

        // The last command is undone and the previous command is set as the current command.
        var undoneCommand = this.currentCommand;
        this.currentCommand.unExecute();
        this.currentCommand = this.currentCommand.getPrevious();
        return undoneCommand;
    }


    // Redoes the chronological "next" command
    redo(){
        // If the current command also has a "next" command, it is executed.
        if(this.currentCommand === null || this.currentCommand.getNext() === null)
            return;

        this.do(this.currentCommand.getNext());
    }

    // These functions could later be used to export or import the model into XML
    export() {
    }

    import() {
    }
}

export default Model;