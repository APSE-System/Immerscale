import CanvasPoint from "./ModelComponents/CanvasPoint.js";
import CanvasLine from "./ModelComponents/CanvasLine.js";
import defaultCommand from "../Commands/DefaultCommand.js";
import DefaultCommand from "../Commands/DefaultCommand.js";


class Model {
    canvasPoints = [];
    canvasLines = [];

    currentCommand = null;

    constructor() {
        this.currentCommand = new defaultCommand(null, this);
    }

    addPoint(x, y, color) {
        this.canvasPoints.push(new CanvasPoint(x, y, color));
    }

    removePoint(x, y, color) {
        let index = this.canvasPoints.findIndex(point => point.x === x && point.y === y && point.color === color);
        if (index !== -1) {
            this.canvasPoints.splice(index, 1);
        }
    }

    addLine(startX, startY, endX, endY, color) {
        this.canvasLines.push(new CanvasLine(new CanvasPoint(startX, startY), new CanvasPoint(endX, endY), color));
    }

    removeLine(startX, startY, endX, endY, color) {
        let index = this.canvasLines.findIndex(line => line.startPoint.x === startX && line.startPoint.y === startY && line.endPoint.x === endX && line.endPoint.y === endY && line.color === color);
        if (index !== -1) {
            this.canvasLines.splice(index, 1);
        }
    }

    do(command) {
        this.currentCommand.setNext(command);
        command.setPrevious(this.currentCommand);
        this.currentCommand = command;

        command.execute();
    }

    undo() {
        if (this.currentCommand instanceof DefaultCommand) {
            return;
        }

        var undoneCommand = this.currentCommand;
        this.currentCommand.unExecute();
        this.currentCommand = this.currentCommand.getPrevious();
        return undoneCommand;
    }

    redo() {
        if (this.currentCommand === null || this.currentCommand.getNext() === null)
            return

        this.do(this.currentCommand.getNext())
    }

    export() {
    }

    import() {
    }
}

export default Model;