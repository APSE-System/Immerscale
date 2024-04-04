class CanvasPoint {
    x;
    y;
    color;

    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

class CanvasLine {
    startPoint;
    endPoint;
    color;

    constructor(startPoint, endPoint, color) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.color = color;
    }
}

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
            this.currentCommand.unExecute();
            this.currentCommand = this.currentCommand.getPrevious();
        }
    }
}
export default Model;