class RectangleReferenceTool extends Tool{

    _first = [];
    _pointCount = 0;
    _model;

    constructor() {
        super("Rectangle Reference", "pi-icon");
    }

    onMouseClicked(x, y){
        if(this._points.length<3){
            this._model.addCommand(new AddPointCommand(this, model, x, y));
        }else if(this._points.length == 3){
            this._model.addCommand(new AddPointCommand(this, model, x, y));
            // Fourth point is set, now the sizes of the edges have to be specified
        }
    }

    updateExecute(point){
        if(this._pointCount == 0){
            this._first =  point;
            this._pointCount++;
        }else if(this._pointCount < 4){
            this._pointCount++;
        }
    }

    updateUnExecute(point){
        if(this._pointCount == 1){
            this._first = null;
        }else{
            this._pointCount--;
        }
    }


}