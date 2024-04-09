import {applyMatrixToPoints} from "./Utils/MathUtils.js";

class LordImmerScaler {

    static _matrix = null;

    static changeMatrix(m) {
        this._matrix = m;
    }

    static transformToRealWorld(x, y) {
        if(this._matrix == null) return null;
        const transformedPoint = applyMatrixToPoints(this._matrix, [x, y, 1])
        return [transformedPoint[0].get([0])/transformedPoint[0].get([2]), transformedPoint[0].get([1])/transformedPoint[0].get([2])];
    }

}

export default LordImmerScaler;