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
    constructor(creator, model, xRot, yRot, zRot, xPos, yPos){
        super(creator, model);


        this._xRot = xRot;
        this._yRot = yRot;
        this._zRot = zRot;

        this._xPos = xPos;
        this._yPos = yPos;


        let gridWidth = 10;
        let gridHeight = 10;



        for(var y = gridHeight/2; y >= -gridHeight/2; y--){
            for(var x = -gridWidth/2; x <= gridWidth/2; x++){
                if(y == gridHeight/2 || y == -gridHeight/2){
                    this._points.push(new CanvasPoint(x, y, "00FFFF"))
                }else if(x == gridWidth/2 || x == -gridWidth/2){
                    this._points.push(new CanvasPoint(x, y, "00FFFF"))
                }
            }
        }

        // iterate through points and rotate

        //console.log(this._xRot + " ," + radiansToDegree(this._xRot) + "° " + "------------------------------")
        // rotata

        let points_rotated = []
        //constole.log("Rotating 4 Points:")
        for(let i = 0; i < this._points.length; i++){
            let point = this._points[i];
            //constole.log("point to rotate:" + point.x + ', ' + point.y);

            let result = rotatePoints3Dim3Axes( [point.x, point.y, 0, 1], xRot, yRot, zRot);
            let result_formatted = [result[0]._data[0], result[0]._data[1], result[0]._data[2], result[0]._data[3]]

            //constole.log("result" + JSON.stringify(result_formatted))

            points_rotated.push(result_formatted)

        }



    /*    let xDiff = Math.abs(points_rotated[0][0]- points_rotated[1][0])/2 + points_rotated[0][1];

        console.log("Before moving")
        console.log(points_rotated)

        console.log("XDiff:" + xDiff)


        // move centero
        for(let i = 0; i < this._points.length; i++){
            points_rotated[i][0]  = points_rotated[i][0] -  xDiff
        }


*/
        //constole.log("View projection")
        for(let i = 0; i < this._points.length; i++){
            let point = points_rotated[i]

            let result = viewMatrix( point);
            let result_formatted = [result[0]._data[0], result[0]._data[1], result[0]._data[2], result[0]._data[3]]

            //constole.log("result" + JSON.stringify(result_formatted))

            points_rotated[i] = result_formatted

        }
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

        //constole.log("AFTER PROJECTION OF POINTS")
        //constole.log(this._points)

        // scaleus to biggus
        for(let i = 0; i < this._points.length; i++){
            let point = this._points[i];
            let result = scalePoint2D([point.x, point.y], 100)



            this._points[i]  = new CanvasPoint(result[0]._data[0], result[0]._data[1], point.color)

        }

       //benis offset
        //constole.log("OFFSET")
        let xOffset = 800 + xPos
        let yOffset = 3000 + yPos
        for(let i = 0; i < this._points.length; i++){
            let point = this._points[i]
            this._points[i] = new CanvasPoint( point.x + xOffset, point.y + yOffset, point.color);
        }

        //constole.log("AFTER MOVING BACK")
        //constole.log(this._points)
    }

    execute (){

        this._model.addGrid(new CanvasGrid(this._points))
    }

    unExecute(){

    }

}

export default AddGridCommand;