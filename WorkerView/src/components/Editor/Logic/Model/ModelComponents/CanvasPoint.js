
// This class acts as a datastructure to store the information needed by the vue component to display a Line.
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

export default CanvasPoint;
