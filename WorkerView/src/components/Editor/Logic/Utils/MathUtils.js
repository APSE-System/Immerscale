import * as math from 'mathjs'


// This method calculates a perspective transformatin matrix
// 4 points from a 2D plane (image) are mapped to a 2D plane in the real world\
//
// https://math.stackexchange.com/questions/296794/finding-the-transform-matrix-from-4-projected-points-with-javascript/339033#339033
export function calculatePerspectiveMatrix(src, dst){
    // 1. Step solve the linear system for x to create a matrix that maps pixel to base vectors
    let A = math.matrix([
        [src[0][0], src[1][0], src[2][0]],
        [src[0][1], src[1][1], src[2][1]],
        [1, 1, 1]
    ])
    let b = [src[3][0], src[3][1], 1]
    let x_to_pixel = math.lusolve(A, b)

    // 2. Step solve the linear system for y to create a matrix that maps base to real vectors
    A = math.matrix([
        [dst[0][0], dst[1][0], dst[2][0]],
        [dst[0][1], dst[1][1], dst[2][1]],
        [1, 1, 1]
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
    if (matrix._size[0] !== points[0].length){
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

export function getDistanceForImmerscaler(point1, point2, scaleX, scaleY){

    let vector = math.subtract(point1, point2)

    console.log("vector", vector)

    vector[0] = vector[0] * scaleX/100
    vector[1] = vector[1] * scaleY/100

    return math.norm(vector)
}

export function getDistance(point1, point2){

    let vector = math.subtract(point1, point2)

    console.log("vector", vector)

    return math.norm(vector)
}

export function rotatePoints3Dim3Axes(points, angleX, angleY, angleZ){
    let rotX = math.matrix([
        [1, 0, 0, 0],
        [0, math.cos(angleX), -math.sin(angleX), 0],
        [0, math.sin(angleX), math.cos(angleX), 0],
        [0, 0, 0, 1]
    ])

    let rotY = math.matrix([
        [math.cos(angleY), 0, math.sin(angleY), 0],
        [0, 1, 0, 0],
        [-math.sin(angleY), 0, math.cos(angleY), 0],
        [0, 0, 0, 1]
    ])
    let rotZ = math.matrix([
        [math.cos(angleZ), -math.sin(angleZ), 0, 0],
        [math.sin(angleZ), math.cos(angleZ), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ])

    let rotation_matrix = math.multiply(math.multiply(rotX, rotY), rotZ);

    return applyMatrixToPoints(rotation_matrix, points)
}

// Method to project a 3D point to a 2D point (perspective projection)
export function projectPointTo2D(points) {
    let scale = 1
    let fov = 30
    let far = 1000
    let near = 0.1

    let projection_matrix = math.matrix([
        [scale, 0, 0, 0],
        [0, scale, 0, 0],
        [0, 0, -far/(far-near), -1],
        [0, 0, (-far*near)/(far-near), 0]])

    return applyMatrixToPoints(projection_matrix, points)
}

export function  scalePoint2D(point, scale) {
    let scale_matrix = math.matrix([
        [scale, 0],
        [0, scale]
    ])

    return applyMatrixToPoints(scale_matrix, point)
}

export function scalePoint3D(point, scaleX, scaleY) {

    // normalize the scale values /100 make sure that 100% is the original size -> 1
    // float conversion is necessary because the scale values are strings


    let scale_matrix = math.matrix([
        [scaleX, 0, 0, 0],
        [0, scaleY, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ])

    return applyMatrixToPoints(scale_matrix, point)
}

// Equation found on: https://mathe-vital.de/LinAlg1/18-4.html
export function getPolygonArea(points) {
    if(points.length <= 0) return;

    let result = 0;

    for(let i = 0; i < points.length - 1; i++) {
        result += getDeterminant(points[i], points[i+1])
    }

    result += getDeterminant(points[points.length - 1], points[0])

    result *= 0.5;
    result = math.abs(math.round( (result)*100)/100    );

    return result;

}

// Calculation of the determinant
function getDeterminant(p1, p2) {
    return (p1[0] * p2[1]) - (p2[0] * p1[1]);
}

export function getMidpoint(point1, point2){
    return math.divide(math.add(point1, point2), 2)
}

export function degreeToRadians(angle){
    return angle*Math.PI/180;
}

export function radiansToDegree(angle){
    return angle*180/Math.PI;
}

export function viewMatrix(point) {
    // Convert arrays to math.js vector format
   let eye = math.matrix([0, 0, -10]);
    let target = math.matrix([0, 0, 0]);
    let up = math.matrix([0, 1, 0]);

    // Compute forward, right, and true up vectors
    let f = math.subtract(target, eye);
    f = math.divide(f, math.norm(f));  // Normalize forward vector

    let r = math.cross(up, f);
    r = math.divide(r, math.norm(r));  // Normalize right vector

    let u = math.cross(f, r);
    u = math.divide(u, math.norm(u));  // Normalize true up vector

    // Create view matrix using vectors and dot products for translation components
    let view =math.matrix( [
        [r.get([0]), r.get([1]), r.get([2]), -math.dot(r, eye)],
        [u.get([0]), u.get([1]), u.get([2]), -math.dot(u, eye)],
        [-f.get([0]), -f.get([1]), -f.get([2]), math.dot(f, eye)],
        [0, 0, 0, 1]
    ]);

    return applyMatrixToPoints(view, point)
}

