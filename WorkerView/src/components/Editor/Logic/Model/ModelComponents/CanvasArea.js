
// This class acts as a datastructure to store the information needed by the vue component to display an area
class CanvasArea {
    points;
    color;
    size;

    constructor(points, color, size) {
        this.points = points;
        this.color = color;
        this.size = size;
    }
}
export default CanvasArea;