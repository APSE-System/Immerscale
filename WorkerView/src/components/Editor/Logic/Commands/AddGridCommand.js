import model from "../Model/Model.js";
import CanvasPoint from "../Model/ModelComponents/CanvasPoint.js";
import Command from "../Command.js";
import CanvasGrid from "../Model/ModelComponents/CanvasGrid.js";

class AddGridCommand extends Command{

    constructor(creator, model){
        super(creator, model);
    }

    execute (){

        let points = [
            new CanvasPoint(100, 100, "00FFFF"),
            new CanvasPoint(200, 100, "00FFFF"),
            new CanvasPoint(200, 200, "00FFFF"),
            new CanvasPoint(100, 200, "00FFFF")
        ]

        this._model.addGrid(new CanvasGrid(points))
    }

    unExecute(){

    }

}

export default AddGridCommand;