import RectangleReferenceTool from "./Tools/RectangleReferenceTool.js";
import ReferenceTool from "./ReferenceTool.js";

class Controller{

    _model;
    _currentTool = null;

    _referenceTools = [];
    _measurementTools = [];

    constructor(model){
        this._model = model;
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

    undo(){
        this._model.undo()
    }

    redo(){
        this._model.redo()
    }

    W() {
        this._currentTool.rotateXBackward()
    }

    Wnt() {
        this._currentTool.rotateXForward()
    }

    A() {
        this._currentTool.rotateZBackward()
    }

    Ant() {
        this._currentTool.rotateZForward()
    }

    J() {
        this._currentTool.rotateYBackward()
    }

    Jnt() {
        this._currentTool.rotateYForward()
    }

}

export default Controller;