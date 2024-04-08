class CanvasPoint {
    x;
    y;
    color;

    popup;
    header;
    description;
    value;

    constructor(x, y, color, popup, header, description, value) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.popup = popup;
        this.header = header;
        this.description = description;
        this.value = value;
    }
}

export default CanvasPoint;
