import model from "../Model/Model.js";
import CanvasPoint from "../Model/ModelComponents/CanvasPoint.js";
import Command from "../Command.js";
import CanvasGrid from "../Model/ModelComponents/CanvasGrid.js";
import {projectPointTo2D, rotatePoints3DimX} from "../Utils/MathUtils.js";

class AddGridCommand extends Command{

    _points;
    _zRot = 0;
    constructor(creator, model, zRot){
        super(creator, model);

        this._zRot = zRot;

       this._points = [
            new CanvasPoint(100, 100, "00FFFF"),
            new CanvasPoint(200, 100, "00FFFF"),
            new CanvasPoint(200, 200, "00FFFF"),
            new CanvasPoint(100, 200, "00FFFF")
        ]

        // iterate through points and rotate

        for(let i = 0; i < this._points.length; i++){
            let point = this._points[i];
            console.log(point.x + ", " + point.y)
            let result = rotatePoints3DimX( [point.x, point.y, 1], zRot);
            console.log(result);

            console.log("erstes ding im abfzuck" + result[0]._data[0])
            let input = [result[0]._data[0], result[0]._data[1], result[0]._data[2], 1]

            result = projectPointTo2D(input )
            console.log(result);

            this._points[i] = new CanvasPoint( result[0]._data[0],  result[0]._data[1], point.color);
        }
    }

    execute (){

        this._model.addGrid(new CanvasGrid(this._points))
    }

    unExecute(){

    }

}

export default AddGridCommand;