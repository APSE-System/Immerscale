class CanvasPoint {
    x;
    y;
    color;

    popup;
    header;
    description;
    value;

    callback;

    constructor(x, y, color, popup, header, description, value, callback) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.popup = popup;
        this.header = header;
        this.description = description;
        this.value = value;

        this.callback = callback;
    }
}

export default CanvasPoint;
