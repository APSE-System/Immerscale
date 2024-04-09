
class CanvasLine {
    startPoint;
    endPoint;
    color;

    popup;
    header;
    description;
    value;

    callback;

    constructor(startPoint, endPoint, color, popup, header, description, value, callback) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.color = color;

        this.popup = popup;
        this.header = header;
        this.description = description;
        this.value = value;

        this.callback = callback;
    }
}
export default CanvasLine;