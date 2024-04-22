// This class acts as a datastructure to store the information needed by the vue component to display a Label

class CanvasLabel {
    // The x and y coordinates of the label.
    x;
    y;

    // the text that is displayed in the label
    length;

    constructor(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length;
    }
}

export default CanvasLabel;
