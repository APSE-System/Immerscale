import * as MathUtils from "../Utils/MathUtils.js";
import AddPointCommand from "../Commands/AddPointCommand.js";
import LordImmerScaler from "../LordImmerScaler.js";
import AddLineCommand from "../Commands/AddLineCommand.js";
import MeasurementTool from "../MeasurementTool.js";
import AddAreaCommand from "../Commands/AddAreaCommand.js"

// This tools enables selecting a rectangular reference measure.
class PolygoneMeasurementTool extends MeasurementTool {
    // The first command executed by this tool.
    _first = null;
    // The amout of points that the user has already selected in the image.
    // TODO this should not be necessary
    _pointCount = 0;

    // stores the points
    // TODO is this right?
    _points = [];

    // The length of the first side which is specified by the user.
    // _firstLength = -1;
    // The length of the second side which is specified by the user. As the reference is rectangular, only two sides have to be specified, as the other two have the same sizes.
    // _secondLenght = -1;

    // Boolean value which specifies whether the tool has completed it's purpose or not.
    // TODO this seems important
    _finished = false;

    // This callback is just for storing purposes and is accessed by a vue component for tool selection purposes.
    callback;

    constructor(model) {
        // setting the text and the icon which will be displayed in the tool sidebar
        super(model, "Measure Polygone", "pi pi-expand");
    }


    onClick(x, y) {
        // Extracting the first and second line from the "first" reference, to keep the upcoming if statements shorter.
        // let firstLine = null;
        // let secondLine = null;
        // if(this._first != null){
        //     firstLine = this._first.getNext();
        //     if(firstLine != null){
        //         secondLine = firstLine.getNext();
        //     }
        // }

        this._points.push([x,y]);


        // Checking how many points were already specified by the user and adding new commands accordingly.
        if (this._pointCount == 0) {
            // The first command is simply adding a point to the user selected coordinates.
            this._model.do(new AddPointCommand(this, this._model, x, y));
        }
        else if(this._pointCount == 1) {
            // The second step draws a line from the first point to the newly selected point.
            this._model.do(new AddLineCommand(this, this._model, [[this._first.getX(), this._first.getY()], [x, y]]));
        }    
        else {
            // TODO make this right
            this._model.do(new AddAreaCommand(this, this._model, this._points));
        }        
    }

    // This function is called during the execution of the commands created by this tool.
    updateExecute(command) {
        if (this._pointCount == 0) {
            // If there is no point set yet, the counter is incremented and the reference to the first point is set.
            this._first = command;
            this._pointCount++;
        } else //if (this._pointCount < 3) {
            // As long as not all the points are specified, the counter is simply incremented.
            this._pointCount++;
        //} //else {
            // If all the four points are specified, the reference is set and the tool is finished.
        //     this.setReference()
        //     this._finished = true;
        //     this._pointCount++;
        // }
    }

    // TODO make unexecute right
    // This function is called during the unexecution of the commands created by this tool.
    updateUnExecute(point) {
        if (this._pointCount == 4) {
            // If all four points were already set, the matrix is set to null again.
            this._pointCount--;
            LordImmerScaler.changeMatrix(null);
            this._finished = false;
        } else if (this._pointCount >= 1) {
            // If not all points have been set, the counter is simply decremented.
            this._pointCount--;
        } else {
            this._first = null;
        }
    }

    // This function calculates the transformation matrix based on the user input and sets it in the Lord.
    // setReference() {

        // Generating the "Source" array which is the coordinates of all the specified points.
        // var src = [];
        // var secondLine = this._first.getNext().getNext();
        // var thirdLine = secondLine.getNext();

        // src.push([this._first.getX(), this._first.getY()]);
        // src.push([secondLine.getPoint(0)[0], secondLine.getPoint(0)[1]]);
        // src.push([secondLine.getPoint(1)[0], secondLine.getPoint(1)[1]]);
        // src.push([thirdLine.getPoint(1)[0], thirdLine.getPoint(1)[1]]);

        // Generating the "destination" array which is the coordinates of the reference in the real world which match to the source points.
        // These coordinates can be calculated based on the edge lengths specified by the user.
        // var dst = [[0, 0], [0, this._firstLength], [this._secondLenght, this._firstLength], [this._secondLenght, 0]];

        // The source and the destination points are used to calculate the transformation matrix and finally setting it.
        // LordImmerScaler.changeMatrix(MathUtils.calculatePerspectiveMatrix(src, dst));
    // }

    // For deselecting this tool, all the already exeuted commands are undone (ONLY WHEN THE TOOL IS NOT FINISHED YET)
    deselect() {
        super.deselect();
        if (this._finished) return;
        while (this._model.undo() != this._first) {
            // Undoes all the commands done by this tool if it is not yet finished
        }
    }


}

export default PolygoneMeasurementTool;


//        // Clear the canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // redraw the image
//       const img = new Image();
//       img.src = "./image.png";
//       onImageLoad();
      
//       // Formel von: https://mathe-vital.de/LinAlg1/18-4.html
//       function measureShape() {
//         if(points.length <= 0) return;
      
//         let result = 0;
      
//         for(let i = 0; i < points.length - 1; i++) {
//           result += det(points[i], points[i+1])
//         }
      
//         result += det(points[points.length - 1], points[0])
      
//         result *= 0.5;
//         result = Math.abs(Math.round( (result)*100)/100    );
//         console.log('the result is: ' + result);
//         displayMeasure(result);
      
//       }
      
//       // this can be done with the math utils?
//       function det(p1, p2) {
//         return (p1.x * p2.y) - (p2.x * p1.y);
//       }
      

//       function displayMeasure(value) {
//         if(value === 0) return;
//         const canvas = document.getElementById('canvas');
//         const ctx = canvas.getContext('2d');
      
//         // Display the number in the center of the polygon
//         const centerX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
//         const centerY = points.reduce((sum, point) => sum + point.y, 0) / points.length;
      
//         ctx.fillStyle = 'white';
//         ctx.font = '50px Arial';
      
//         // Center the text horizontally and vertically
//         const textWidth = ctx.measureText(value).width;
      
//         ctx.fillText(value, centerX - textWidth / 2, centerY + 10);
//       }
            