import RectangleReferenceTool from "./Tools/RectangleReferenceTool.js";
import ReferenceTool from "./ReferenceTool.js";
import GridReferenceTool from "./Tools/GridReferenceTool.js";

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

    up(){
        this._currentTool.moveUp()
    }
    left(){
        this._currentTool.moveLeft()
    }
    right(){
        this._currentTool.moveRight()
    }
    down(){
        this._currentTool.moveDown()
    }

    dragTo(x, y){
        if(this._currentTool instanceof GridReferenceTool){
            this._currentTool.setOffset(x,y);
        }
    }

    setXRotation(angle){
        if(this._currentTool instanceof GridReferenceTool){
            this._currentTool.setXRotation(angle);
        }
    }

    setYRotation(angle){
        if(this._currentTool instanceof GridReferenceTool){
            this._currentTool.setYRotation(angle);
        }
    }

    setZRotation(angle){
        if(this._currentTool instanceof GridReferenceTool){
            this._currentTool.setZRotation(angle);
        }
    }

    setInput(){
        if(this._currentTool instanceof GridReferenceTool){
            this._currentTool.setGrid();
        }
    }

}

export default Controller;