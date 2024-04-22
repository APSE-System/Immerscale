import ReferenceTool from "../ReferenceTool.js";
import command from "../Command.js";
import AddGridCommand from "../Commands/AddGridCommand.js";
import {degreeToRadians} from "../Utils/MathUtils.js";

class GridReferenceTool extends ReferenceTool{


    _xRot = 0;
    _yRot = 0;
    _zRot = 0;

    _xPos = 0
    _yPos = 0

    constructor(model) {
        // setting the text and the icon which will be displayed in the tool sidebar
        // also optionally add a tooltip and a css class (the css class has the prefix tool-), lastly you can add a toast message when clicking the tool
        super(model, "Grid Reference", "pi pi-table", "description", "grid", "toast from grid");
    }

    onClick(x, y) {
        
    }


    updateExecute(command) {
        super.updateExecute(command);
    }

    updateUnExecute(command) {
        super.updateUnExecute(command);
    }

    select() {
        super.select();
        this.apply()


    }

    // For deselecting this tool, all the already executed commands are undone (ONLY WHEN THE TOOL IS NOT FINISHED YET)
    deselect() {
        super.deselect();
        if (this._finished) return;
    }

    rotateXBackward() {
        this._xRot -= 2;
        this.apply()
    }

    rotateXForward() {
        this._xRot += 2;
        this.apply()
    }

    rotateZBackward() {
        this._zRot -= 2;
        this.apply()
    }

    rotateZForward() {
        this._zRot += 2;
        this.apply()
    }

    rotateYBackward() {
        this._yRot -= 2;
        this.apply()
    }

    rotateYForward() {
        this._yRot += 2;
        this.apply()
    }

    apply(){
        this._model.do(new AddGridCommand(this, this._model,degreeToRadians(this._xRot), degreeToRadians(this._yRot), degreeToRadians(this._zRot), this._xPos, this._yPos));
    }

    moveDown(){
        this._yPos += 5;
        this.apply()
    }
    moveUp(){
        this._yPos -= 5;
        this.apply()
    }

    moveRight(){
        this._xPos += 5;
        this.apply()
    }

    moveLeft(){
        this._xPos -= 5;
        this.apply()
    }




}

export default GridReferenceTool;