import RectangleReferenceTool from "./Tools/RectangleReferenceTool.js";
import ReferenceTool from "./ReferenceTool.js";

class Controller{

    _currentTool = null;

    _referenceTools = [];
    _measurementTools = [];

    constructor(model){
        this._model = model;
        this._currentTool = new RectangleReferenceTool(this._model);
    }

    addTool(tool){
        if(tool instanceof ReferenceTool){
            this._referenceTools.push(tool)
        }else{
            this._measurementTools.push(tool)
        }

        return ()=>{
            this._currentTool.deselect();
            this._currentTool = tool;
            this._currentTool.select();
        }
    }

    onClick(x, y){
        this._currentTool.onClick(x, y)
    }

    undo(){
        this._model.undo()
    }

    redo(){
        this._model.redo()
    }

}

export default Controller;