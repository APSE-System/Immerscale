import CanvasPoint from "./ModelComponents/CanvasPoint.js";
import CanvasLine from "./ModelComponents/CanvasLine.js";


class Model {
    canvasPoints = [];
    canvasLines = [];

    currentCommand = null;

    addPoint(x, y, color) {
        this.canvasPoints.push(new CanvasPoint(x, y, color));
    }

    removePoint(x, y, color) {
        let index = this.canvasPoints.findIndex(point => point.x === x && point.y === y && point.color === color);
        if (index !== -1) {
            this.canvasPoints.splice(index, 1);
        }
    }

    addLine(points, color, popup, header, description, value, callback) {
        this.canvasLines.push(new CanvasLine(points, color, popup, header, description, value, callback));
    }

    removeLine(points, color) {
        let index = this.canvasLines.findIndex(line => line.points === points && line.color === color);
        if (index !== -1) {
            this.canvasLines.splice(index, 1);
        }
    }

    do(command) {
        if(this.currentCommand === null)
            this.currentCommand = command;
        else{
            this.currentCommand.setNext(command);
            command.setPrevious(this.currentCommand);
            this.currentCommand = command;
        }

        command.execute();
    }

    undo() {
        if(this.currentCommand !== null) {
            var undoneCommand = this.currentCommand;
            this.currentCommand.unExecute();
            this.currentCommand = this.currentCommand.getPrevious();
            return undoneCommand;
        }
    }

    redo(){
        if(this.currentCommand === null || this.currentCommand.getNext() === null)
            return

        this.do(this.currentCommand.getNext())
    }

    export(){}
    import(){}
}
export default Model;