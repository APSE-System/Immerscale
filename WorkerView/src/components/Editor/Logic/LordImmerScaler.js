import {applyMatrixToPoints} from "./Utils/MathUtils.js";


// This class contains the resulting matrix of the reference tool and can be used by the measuring tool to transform coordinates.
class LordImmerScaler {

    // Transformation matrix that can be used to transform image coordinates to real world coordinates.
    static _matrix = null;

    // Boolean value which specifies whether a reference has been set or not.
    static _referenceSet = false;


    // This funciton sets the matrix to the given one.
    static changeMatrix(m) {
        this._matrix = m;
        this._referenceSet = this._matrix != null;
        document.dispatchEvent(new CustomEvent("referenceSet", { detail: this._referenceSet }));
    }

    // This function transfrom the given image coordinates in real world coordinates.
    static transformToRealWorld(x, y) {
        if(this._matrix == null) return null;
        // Applying the matrix to the point
        const transformedPoint = applyMatrixToPoints(this._matrix, [x, y, 1])
        // As the result is in homogeneous coordinates, they have to be transformed back into cartesian before they are returned:
        return [transformedPoint[0].get([0])/transformedPoint[0].get([2]), transformedPoint[0].get([1])/transformedPoint[0].get([2])];
    }

}

export default LordImmerScaler;