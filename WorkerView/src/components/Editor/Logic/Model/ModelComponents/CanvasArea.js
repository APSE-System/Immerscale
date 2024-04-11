
// This class acts as a datastructure to store the information needed by the vue component to display an area
class CanvasArea {
    points;
    color;

    constructor(points, color) {
        this.points = points;
        this.color = color;
    }
}
export default CanvasArea;