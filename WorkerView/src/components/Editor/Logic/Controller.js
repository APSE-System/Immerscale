import RectangleReferenceTool from "./Tools/RectangleReferenceTool.js";

class Controller{

    _model;
    _currentTool;

    constructor(model){
        this._model = model;
        this._currentTool = new RectangleReferenceTool(this._model);
    }

    onClick(x, y){
        this._currentTool.onClick(x, y)
    }

}

export default Controller;