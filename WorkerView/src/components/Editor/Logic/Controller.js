import RectangleReferenceTool from "./Tools/RectangleReferenceTool.js";
import ReferenceTool from "./ReferenceTool.js";

class Controller{

    _model;
    _currentTool = null;

    _referenceTools = [];
    _measurementTools = [];

    constructor(model){
        this._model = model;
        document.addEventListener("deselectTool", () => {this._currentTool.deselect(); this._currentTool = null;})
    }

    addTool(tool){
        if(tool instanceof ReferenceTool){
            this._referenceTools.push(tool)
        }else{
            this._measurementTools.push(tool)
        }

        return ()=>{
            if(this._currentTool !== null)
                this._currentTool.deselect();
            console.log("callback executed")
            this._currentTool = tool;
            this._currentTool.select();
        }
    }

    onClick(x, y){
        if(this._currentTool !== null)
            this._currentTool.onClick(x, y)
    }

    onRightClick() {
        if(this._currentTool !== null)
            this._currentTool.onRightClick();
    }

    onMouseMove(x, y) {
        if(this._currentTool !== null)
            this._currentTool.onMouseMove(x, y);
    }

    onMouseLeave() {
        if(this._currentTool !== null)
            this._currentTool.onMouseLeave();
    }

    undo(){
        this._model.undo()
    }

    redo(){
        this._model.redo()
    }

}

export default Controller;