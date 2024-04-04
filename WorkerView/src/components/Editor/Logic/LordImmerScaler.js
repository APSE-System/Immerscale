import {applyMatrixToPoints} from "./Utils/MathUtils.js";

class LordImmerScaler {

    static _matrix = null;

    static changeMatrix(m) {
        this._instance = m;
    }

    static transformToRealWorld(x, y) {
        if(this._matrix == null) return null;
        return applyMatrixToPoints(this._matrix, [x, y]);
    }

}