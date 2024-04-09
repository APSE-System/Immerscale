import * as math from 'mathjs'


// This method calculates a perspective transformatin matrix
// 4 points from a 2D plane (image) are mapped to a 2D plane in the real world\
//
// https://math.stackexchange.com/questions/296794/finding-the-transform-matrix-from-4-projected-points-with-javascript/339033#339033
export function calculatePerspectiveMatrix(src, dst){
    // 1. Step solve the linear system for x to create a matrix that maps pixel to base vectors
    let A = math.matrix([
        [src[0][0], src[0][1], 1],
        [src[1][0], src[1][1], 1],
        [src[2][0], src[2][1], 1]
    ])
    let b = [src[3][0], src[3][1], 1]
    let x_to_pixel = math.lusolve(A, b)

    // 2. Step solve the linear system for y to create a matrix that maps base to real vectors
    A = math.matrix([
        [dst[0][0], dst[0][1], 1],
        [dst[1][0], dst[1][1], 1],
        [dst[2][0], dst[2][1], 1]
    ])
    b = [dst[3][0], dst[3][1], 1]
    let x_to_real = math.lusolve(A, b)

    // 3. Step construct pixel to base vector matrix
    let base_to_pixel_matrix = math.matrix([
        [x_to_pixel.get([0, 0]) * src[0][0], x_to_pixel.get([1, 0]) * src[1][0], x_to_pixel.get([2, 0]) * src[2][0]],
        [x_to_pixel.get([0, 0]) * src[0][1], x_to_pixel.get([1, 0]) * src[1][1], x_to_pixel.get([2, 0]) * src[2][1]],
        [x_to_pixel.get([0, 0]), x_to_pixel.get([1, 0]), x_to_pixel.get([2, 0])]
    ])
    // invert the matrix to get pixel to base matrix
    let pixel_to_base_matrix = math.inv(base_to_pixel_matrix)

    // 4. Step construct base vector to real world matrix
    let base_to_real_matrix = math.matrix([
        [x_to_real.get([0, 0]) * dst[0][0], x_to_real.get([1, 0]) * dst[1][0], x_to_real.get([2, 0]) * dst[2][0]],
        [x_to_real.get([0, 0]) * dst[0][1], x_to_real.get([1, 0]) * dst[1][1], x_to_real.get([2, 0]) * dst[2][1]],
        [x_to_real.get([0, 0]), x_to_real.get([1, 0]), x_to_real.get([2, 0])]
    ])

    // 5.Step construct pixel to real world matrix and return
    return math.multiply(base_to_real_matrix, pixel_to_base_matrix)
}


// This method applies a matrix to a list of points
export function applyMatrixToPoints(matrix, ...points){

    // check if the matrix and the points have the same dimension
    if (matrix.length !== points[0].length){
        console.error("Matrix and points have different dimensions")
        return
    }

    let result = []
    for (let i = 0; i < points.length; i++){
        let point = points[i]
        let new_point = math.multiply(matrix, point)
        result.push(new_point)
    }
    return result
}

export function getDistance(point1, point2){
    return math.norm(math.subtract(point1, point2))
}