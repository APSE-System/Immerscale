
class CanvasLine {
    points;
    color;

    popup;
    header;
    description;
    value;

    callback;

    constructor(points, color, popup, header, description, value, callback) {
        this.points = points;
        this.color = color;

        this.popup = popup;
        this.header = header;
        this.description = description;
        this.value = value;

        this.callback = callback;
    }
}
export default CanvasLine;