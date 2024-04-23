import model from "../Model/Model.js";
import CanvasPoint from "../Model/ModelComponents/CanvasPoint.js";
import Command from "../Command.js";
import CanvasGrid from "../Model/ModelComponents/CanvasGrid.js";
import {
    degreeToRadians,
    projectPointTo2D,
    radiansToDegree, rotatePoints3Dim3Axes,
    scalePoint2D,
    viewMatrix
} from "../Utils/MathUtils.js";

class AddGridCommand extends Command{

    _points = [];
    _xRot = 0
    _yRot = 0;
    _zRot = 0;

    _xPos = 0
    _yPos = 0
    
    _gridWidth = 0;
    _gridHeight = 0;
    
    constructor(creator, model, xRot, yRot, zRot, xPos, yPos){
        super(creator, model);

        this._xRot = xRot;
        this._yRot = yRot;
        this._zRot = zRot;

        this._xPos = xPos;
        this._yPos = yPos;

        this._gridWidth = 10;
        this._gridHeight = 10;

        // Generate the grid
        this.generateGridPoints()

        // Retrieve the right projection fitting to the specified angles
        let points_rotated = this.rotatePoints(this._points)
        let points_positioned = this.positionCamera(points_rotated)
        this.projectOnGrid(points_positioned)

        // Position the grid with the fitting scale in the  middle of the canvas
        this.scaleGrid()
        this.offsetGrid()

    }

    generateGridPoints(){
        for(var y = -this._gridHeight/2; y <= this._gridHeight/2; y++){
            for(var x = -this._gridWidth/2; x <= this._gridWidth/2; x++){
                if(y === this._gridHeight/2 || y === -this._gridHeight/2){
                    this._points.push(new CanvasPoint(x, y, "FF0000"))
                }else if(x === this._gridWidth/2 || x === -this._gridWidth/2){
                    this._points.push(new CanvasPoint(x, y, "FF0000"))
                }
            }
        }
    }

    rotatePoints(points){
        let points_rotated = []

        for(let i = 0; i < points.length; i++){
            let point = points[i];

            let result = rotatePoints3Dim3Axes( [point.x, point.y, 0, 1], this._xRot, this._yRot, this._zRot);
            let result_formatted = [result[0]._data[0], result[0]._data[1], result[0]._data[2], result[0]._data[3]]

            points_rotated.push(result_formatted)
        }

        return points_rotated;
    }

    positionCamera(points){
        let points_positioned = []
        for(let i = 0; i < this._points.length; i++){
            let point = points[i]

            let result = viewMatrix( point);
            let result_formatted = [result[0]._data[0], result[0]._data[1], result[0]._data[2], result[0]._data[3]]

            points_positioned.push(result_formatted)
        }

        return points_positioned;
    }

    projectOnGrid(points){
        for(let i = 0; i < this._points.length; i++){
            let point = points[i]

            let result = projectPointTo2D(point)

            this._points[i] = new CanvasPoint( result[0]._data[0]/ result[0]._data[3],  result[0]._data[1]/result[0]._data[3], this._points[i].color);
        }
    }

    scaleGrid(){
        for(let i = 0; i < this._points.length; i++){
            let point = this._points[i];
            let result = scalePoint2D([point.x, point.y], 200)

            this._points[i]  = new CanvasPoint(result[0]._data[0], result[0]._data[1], point.color)
        }
    }

    offsetGrid(){
        //let xOffset = (this._model.width/2) + this._xPos
        let xOffset =  + this._xPos
        //let yOffset = (this._model.height/2) + this._yPos
        let yOffset =  this._yPos
        for(let i = 0; i < this._points.length; i++){
            let point = this._points[i]
            this._points[i] = new CanvasPoint( point.x + xOffset, point.y + yOffset, point.color);
        }
    }


    execute (){
        this._model.addGrid(new CanvasGrid(this._points, this._gridWidth, this._gridHeight));
    }

    unExecute(){
        this._model.addGrid(null)
    }


    getReferencePoints(){
        let refPoints =[]

        refPoints.push(this._points[0])
        refPoints.push(this._points[this._gridWidth-1])
        refPoints.push(this._points[this._points.length-1])
        refPoints.push(this._points[this._points.length-this._gridWidth])

        return  refPoints;
    }

}

export default AddGridCommand;