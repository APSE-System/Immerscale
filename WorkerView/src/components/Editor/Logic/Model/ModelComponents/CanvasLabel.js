// This class acts as a datastructure to store the information needed by the vue component to display a Label

class CanvasLabel {
    // The x and y coordinates of the label.
    x;
    y;

    // the text that is displayed in the label
    value;

    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
    }
}

export default CanvasLabel;
