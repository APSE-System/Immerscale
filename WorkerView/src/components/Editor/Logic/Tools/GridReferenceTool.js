import ReferenceTool from "../ReferenceTool.js";
import command from "../Command.js";
import AddGridCommand from "../Commands/AddGridCommand.js";

class GridReferenceTool extends ReferenceTool{



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

        this._model.do(new AddGridCommand(this, this._model));


    }

    // For deselecting this tool, all the already executed commands are undone (ONLY WHEN THE TOOL IS NOT FINISHED YET)
    deselect() {
        super.deselect();
        if (this._finished) return;



    }

}

export default GridReferenceTool;