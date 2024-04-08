import {applyMatrixToPoints} from "./Utils/MathUtils.js";

class LordImmerScaler {

    static _matrix = null;

    static changeMatrix(m) {
        this._instance = m;
    }

    static transformToRealWorld(x, y) {
        if(this._matrix == null) return null;
        console.log("matrix is set:");
        console.log(this._matrix);
        return applyMatrixToPoints(this._matrix, [x, y]);
    }

}

export default LordImmerScaler;