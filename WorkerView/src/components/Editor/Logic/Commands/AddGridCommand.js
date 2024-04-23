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

        this.generateGridPoints()
        let points_rotated = this.rotateGridPoints()
        this.positionCamera(points_rotated)
        this.projectGridPoints(points_rotated)
        this.scaleGridPoints()
        this.offsetPoints()

    }

    generateGridPoints(){
        for(var y = this._gridHeight/2; y >= -this._gridHeight/2; y--){
            for(var x = -this._gridWidth/2; x <= this._gridWidth/2; x++){
                if(y === this._gridHeight/2 || y === -this._gridHeight/2){
                    this._points.push(new CanvasPoint(x, y, "FF0000"))
                }else if(x === this._gridWidth/2 || x === -this._gridWidth/2){
                    this._points.push(new CanvasPoint(x, y, "FF0000"))
                }
            }
        }
    }

    rotateGridPoints(){
        let points_rotated = []

        for(let i = 0; i < this._points.length; i++){
            let point = this._points[i];

            let result = rotatePoints3Dim3Axes( [point.x, point.y, 0, 1], this._xRot, this._yRot, this._zRot);
            let result_formatted = [result[0]._data[0], result[0]._data[1], result[0]._data[2], result[0]._data[3]]


            points_rotated.push(result_formatted)

        }

        return points_rotated;
    }

    positionCamera(points_rotated){
        //constole.log("View projection")
        for(let i = 0; i < this._points.length; i++){
            let point = points_rotated[i]

            let result = viewMatrix( point);
            let result_formatted = [result[0]._data[0], result[0]._data[1], result[0]._data[2], result[0]._data[3]]

            //constole.log("result" + JSON.stringify(result_formatted))

            points_rotated[i] = result_formatted

        }
    }

    projectGridPoints(points_rotated){

        //constole.log("After VIEWMATRIX")
        //constole.log(points_rotated)
        // projection erection

        //constole.log("PROJECTION OF POINTS")
        for(let i = 0; i < this._points.length; i++){
            let point = points_rotated[i]


            let result = projectPointTo2D(point )
            //constole.log(result);

            let brightness = ( result[0]._data[2]/ result[0]._data[3])-8

            brightness *= 50

            brightness -= 44
            brightness *= 10

            if(brightness < 9)
                brightness = 10

            if(brightness > 99)
                brightness = 99



            //constole.log(brightness + ", brightness");


            this._points[i] = new CanvasPoint( result[0]._data[0]/ result[0]._data[3],  result[0]._data[1]/result[0]._data[3], "" +brightness + brightness + brightness);
        }
    }

    scaleGridPoints(){
        //constole.log("AFTER PROJECTION OF POINTS")
        //constole.log(this._points)

        // scaleus to biggus
        for(let i = 0; i < this._points.length; i++){
            let point = this._points[i];
            let result = scalePoint2D([point.x, point.y], 200)



            this._points[i]  = new CanvasPoint(result[0]._data[0], result[0]._data[1], point.color)

        }
    }

    offsetPoints(){
        //benis offset
        //constole.log("OFFSET")
        let xOffset = (this._model.width/2) + this._xPos
        let yOffset = (this._model.height/2) + this._yPos
        for(let i = 0; i < this._points.length; i++){
            let point = this._points[i]
            this._points[i] = new CanvasPoint( point.x + xOffset, point.y + yOffset, point.color);
        }
    }


    execute (){

        this._model.addGrid(new CanvasGrid(this._points, this._gridWidth, this._gridHeight));
    }

    unExecute(){

    }

}

export default AddGridCommand;