"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mat4 = exports.preTransforms = void 0;
const Mat3_1 = require("./Mat3");
const Quat_1 = require("./Quat");
const utils_1 = require("./utils");
const Vec3_1 = require("./Vec3");
exports.preTransforms = Object.freeze([
    Object.freeze([1, 0, 0, 1]),
    Object.freeze([0, 1, -1, 0]),
    Object.freeze([-1, 0, 0, -1]),
    Object.freeze([0, -1, 1, 0]),
]);
/**
 * @en Mathematical 4x4 matrix.
 * @zh 表示四维（4x4）矩阵。
 */
class Mat4 {
    constructor(m00 = 1, m01 = 0, m02 = 0, m03 = 0, m04 = 0, m05 = 1, m06 = 0, m07 = 0, m08 = 0, m09 = 0, m10 = 1, m11 = 0, m12 = 0, m13 = 0, m14 = 0, m15 = 1) {
        //super();
        if (typeof m00 === 'object') {
            this.m00 = m00.m00;
            this.m01 = m00.m01;
            this.m02 = m00.m02;
            this.m03 = m00.m03;
            this.m04 = m00.m04;
            this.m05 = m00.m05;
            this.m06 = m00.m06;
            this.m07 = m00.m07;
            this.m08 = m00.m08;
            this.m09 = m00.m09;
            this.m10 = m00.m10;
            this.m11 = m00.m11;
            this.m12 = m00.m12;
            this.m13 = m00.m13;
            this.m14 = m00.m14;
            this.m15 = m00.m15;
        }
        else {
            this.m00 = m00;
            this.m01 = m01;
            this.m02 = m02;
            this.m03 = m03;
            this.m04 = m04;
            this.m05 = m05;
            this.m06 = m06;
            this.m07 = m07;
            this.m08 = m08;
            this.m09 = m09;
            this.m10 = m10;
            this.m11 = m11;
            this.m12 = m12;
            this.m13 = m13;
            this.m14 = m14;
            this.m15 = m15;
        }
    }
    /**
     * @en Clone a matrix and save the results to out matrix
     * @zh 获得指定矩阵的拷贝
     */
    static clone(a) {
        return new Mat4(a.m00, a.m01, a.m02, a.m03, a.m04, a.m05, a.m06, a.m07, a.m08, a.m09, a.m10, a.m11, a.m12, a.m13, a.m14, a.m15);
    }
    /**
     * @en Copy a matrix into the out matrix
     * @zh 复制目标矩阵
     */
    static copy(out, a) {
        out.m00 = a.m00;
        out.m01 = a.m01;
        out.m02 = a.m02;
        out.m03 = a.m03;
        out.m04 = a.m04;
        out.m05 = a.m05;
        out.m06 = a.m06;
        out.m07 = a.m07;
        out.m08 = a.m08;
        out.m09 = a.m09;
        out.m10 = a.m10;
        out.m11 = a.m11;
        out.m12 = a.m12;
        out.m13 = a.m13;
        out.m14 = a.m14;
        out.m15 = a.m15;
        return out;
    }
    /**
     * @en Sets a matrix with the given values and save the results to out matrix
     * @zh 设置矩阵值
     */
    static set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
        out.m00 = m00;
        out.m01 = m01;
        out.m02 = m02;
        out.m03 = m03;
        out.m04 = m10;
        out.m05 = m11;
        out.m06 = m12;
        out.m07 = m13;
        out.m08 = m20;
        out.m09 = m21;
        out.m10 = m22;
        out.m11 = m23;
        out.m12 = m30;
        out.m13 = m31;
        out.m14 = m32;
        out.m15 = m33;
        return out;
    }
    /**
     * @en return an identity matrix.
     * @zh 将目标赋值为单位矩阵
     */
    static identity(out) {
        out.m00 = 1;
        out.m01 = 0;
        out.m02 = 0;
        out.m03 = 0;
        out.m04 = 0;
        out.m05 = 1;
        out.m06 = 0;
        out.m07 = 0;
        out.m08 = 0;
        out.m09 = 0;
        out.m10 = 1;
        out.m11 = 0;
        out.m12 = 0;
        out.m13 = 0;
        out.m14 = 0;
        out.m15 = 1;
        return out;
    }
    /**
     * @en Transposes a matrix and save the results to out matrix
     * @zh 转置矩阵
     */
    static transpose(out, a) {
        // If we are transposing ourselves we can skip a few steps but have to cache some values
        if (out === a) {
            const a01 = a.m01;
            const a02 = a.m02;
            const a03 = a.m03;
            const a12 = a.m06;
            const a13 = a.m07;
            const a23 = a.m11;
            out.m01 = a.m04;
            out.m02 = a.m08;
            out.m03 = a.m12;
            out.m04 = a01;
            out.m06 = a.m09;
            out.m07 = a.m13;
            out.m08 = a02;
            out.m09 = a12;
            out.m11 = a.m14;
            out.m12 = a03;
            out.m13 = a13;
            out.m14 = a23;
        }
        else {
            out.m00 = a.m00;
            out.m01 = a.m04;
            out.m02 = a.m08;
            out.m03 = a.m12;
            out.m04 = a.m01;
            out.m05 = a.m05;
            out.m06 = a.m09;
            out.m07 = a.m13;
            out.m08 = a.m02;
            out.m09 = a.m06;
            out.m10 = a.m10;
            out.m11 = a.m14;
            out.m12 = a.m03;
            out.m13 = a.m07;
            out.m14 = a.m11;
            out.m15 = a.m15;
        }
        return out;
    }
    /**
     * @en Inverts a matrix. When matrix is not invertible the matrix will be set to zeros.
     * @zh 矩阵求逆，注意，在矩阵不可逆时，会返回一个全为 0 的矩阵。
     */
    static invert(out, a) {
        const a00 = a.m00;
        const a01 = a.m01;
        const a02 = a.m02;
        const a03 = a.m03;
        const a10 = a.m04;
        const a11 = a.m05;
        const a12 = a.m06;
        const a13 = a.m07;
        const a20 = a.m08;
        const a21 = a.m09;
        const a22 = a.m10;
        const a23 = a.m11;
        const a30 = a.m12;
        const a31 = a.m13;
        const a32 = a.m14;
        const a33 = a.m15;
        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;
        // Calculate the determinant
        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (det === 0) {
            out.m00 = 0;
            out.m01 = 0;
            out.m02 = 0;
            out.m03 = 0;
            out.m04 = 0;
            out.m05 = 0;
            out.m06 = 0;
            out.m07 = 0;
            out.m08 = 0;
            out.m09 = 0;
            out.m10 = 0;
            out.m11 = 0;
            out.m12 = 0;
            out.m13 = 0;
            out.m14 = 0;
            out.m15 = 0;
            return out;
        }
        det = 1.0 / det;
        out.m00 = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        out.m01 = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out.m02 = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out.m03 = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        out.m04 = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        out.m05 = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out.m06 = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out.m07 = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        out.m08 = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        out.m09 = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        out.m10 = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        out.m11 = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        out.m12 = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        out.m13 = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        out.m14 = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        out.m15 = (a20 * b03 - a21 * b01 + a22 * b00) * det;
        return out;
    }
    /**
     * @en Calculates the determinant of a matrix
     * @zh 矩阵行列式
     */
    static determinant(a) {
        const a00 = a.m00;
        const a01 = a.m01;
        const a02 = a.m02;
        const a03 = a.m03;
        const a10 = a.m04;
        const a11 = a.m05;
        const a12 = a.m06;
        const a13 = a.m07;
        const a20 = a.m08;
        const a21 = a.m09;
        const a22 = a.m10;
        const a23 = a.m11;
        const a30 = a.m12;
        const a31 = a.m13;
        const a32 = a.m14;
        const a33 = a.m15;
        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;
        // Calculate the determinant
        return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    }
    /**
     * @en Multiply two matrices and save the results to out matrix
     * @zh 矩阵乘法
     */
    static multiply(out, a, b) {
        const a00 = a.m00;
        const a01 = a.m01;
        const a02 = a.m02;
        const a03 = a.m03;
        const a10 = a.m04;
        const a11 = a.m05;
        const a12 = a.m06;
        const a13 = a.m07;
        const a20 = a.m08;
        const a21 = a.m09;
        const a22 = a.m10;
        const a23 = a.m11;
        const a30 = a.m12;
        const a31 = a.m13;
        const a32 = a.m14;
        const a33 = a.m15;
        // Cache only the current line of the second matrix
        let b0 = b.m00;
        let b1 = b.m01;
        let b2 = b.m02;
        let b3 = b.m03;
        out.m00 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out.m01 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out.m02 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out.m03 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b.m04;
        b1 = b.m05;
        b2 = b.m06;
        b3 = b.m07;
        out.m04 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out.m05 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out.m06 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out.m07 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b.m08;
        b1 = b.m09;
        b2 = b.m10;
        b3 = b.m11;
        out.m08 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out.m09 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out.m10 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out.m11 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b.m12;
        b1 = b.m13;
        b2 = b.m14;
        b3 = b.m15;
        out.m12 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out.m13 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out.m14 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out.m15 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return out;
    }
    /**
     * @en Transform a matrix with the given vector and save results to the out matrix
     * @zh 在给定矩阵变换基础上加入变换
     */
    static transform(out, a, v) {
        const x = v.x;
        const y = v.y;
        const z = v.z;
        if (a === out) {
            out.m12 = a.m00 * x + a.m04 * y + a.m08 * z + a.m12;
            out.m13 = a.m01 * x + a.m05 * y + a.m09 * z + a.m13;
            out.m14 = a.m02 * x + a.m06 * y + a.m10 * z + a.m14;
            out.m15 = a.m03 * x + a.m07 * y + a.m11 * z + a.m15;
        }
        else {
            const a00 = a.m00;
            const a01 = a.m01;
            const a02 = a.m02;
            const a03 = a.m03;
            const a10 = a.m04;
            const a11 = a.m05;
            const a12 = a.m06;
            const a13 = a.m07;
            const a20 = a.m08;
            const a21 = a.m09;
            const a22 = a.m10;
            const a23 = a.m11;
            const a30 = a.m12;
            const a31 = a.m13;
            const a32 = a.m14;
            const a33 = a.m15;
            out.m00 = a00;
            out.m01 = a01;
            out.m02 = a02;
            out.m03 = a03;
            out.m04 = a10;
            out.m05 = a11;
            out.m06 = a12;
            out.m07 = a13;
            out.m08 = a20;
            out.m09 = a21;
            out.m10 = a22;
            out.m11 = a23;
            out.m12 = a00 * x + a10 * y + a20 * z + a.m12;
            out.m13 = a01 * x + a11 * y + a21 * z + a.m13;
            out.m14 = a02 * x + a12 * y + a22 * z + a.m14;
            out.m15 = a03 * x + a13 * y + a23 * z + a.m15;
        }
        return out;
    }
    /**
     * @en Transform a matrix with the given translation vector and save results to the out matrix
     * @zh 在给定矩阵变换基础上加入新位移变换
     */
    static translate(out, a, v) {
        console.warn('function changed');
        if (a === out) {
            out.m12 += v.x;
            out.m13 += v.y;
            out.m14 += v.z;
        }
        else {
            out.m00 = a.m00;
            out.m01 = a.m01;
            out.m02 = a.m02;
            out.m03 = a.m03;
            out.m04 = a.m04;
            out.m05 = a.m05;
            out.m06 = a.m06;
            out.m07 = a.m07;
            out.m08 = a.m08;
            out.m09 = a.m09;
            out.m10 = a.m10;
            out.m11 = a.m11;
            out.m12 += v.x;
            out.m13 += v.y;
            out.m14 += v.z;
            out.m15 = a.m15;
        }
        return out;
    }
    /**
     * @en Multiply a matrix with a scale matrix given by a scale vector and save the results into the out matrix
     * @zh 在给定矩阵变换基础上加入新缩放变换
     */
    static scale(out, a, v) {
        const x = v.x;
        const y = v.y;
        const z = v.z;
        out.m00 = a.m00 * x;
        out.m01 = a.m01 * x;
        out.m02 = a.m02 * x;
        out.m03 = a.m03 * x;
        out.m04 = a.m04 * y;
        out.m05 = a.m05 * y;
        out.m06 = a.m06 * y;
        out.m07 = a.m07 * y;
        out.m08 = a.m08 * z;
        out.m09 = a.m09 * z;
        out.m10 = a.m10 * z;
        out.m11 = a.m11 * z;
        out.m12 = a.m12;
        out.m13 = a.m13;
        out.m14 = a.m14;
        out.m15 = a.m15;
        return out;
    }
    /**
     * @en Rotates the transform by the given angle and save the results into the out matrix
     * @zh 在给定矩阵变换基础上加入新旋转变换
     * @param rad Angle of rotation (in radians)
     * @param axis axis of rotation
     */
    static rotate(out, a, rad, axis) {
        let x = axis.x;
        let y = axis.y;
        let z = axis.z;
        let len = Math.sqrt(x * x + y * y + z * z);
        if (Math.abs(len) < utils_1.EPSILON) {
            return null;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const t = 1 - c;
        const a00 = a.m00;
        const a01 = a.m01;
        const a02 = a.m02;
        const a03 = a.m03;
        const a10 = a.m04;
        const a11 = a.m05;
        const a12 = a.m06;
        const a13 = a.m07;
        const a20 = a.m08;
        const a21 = a.m09;
        const a22 = a.m10;
        const a23 = a.m11;
        // Construct the elements of the rotation matrix
        const b00 = x * x * t + c;
        const b01 = y * x * t + z * s;
        const b02 = z * x * t - y * s;
        const b10 = x * y * t - z * s;
        const b11 = y * y * t + c;
        const b12 = z * y * t + x * s;
        const b20 = x * z * t + y * s;
        const b21 = y * z * t - x * s;
        const b22 = z * z * t + c;
        // Perform rotation-specific matrix multiplication
        out.m00 = a00 * b00 + a10 * b01 + a20 * b02;
        out.m01 = a01 * b00 + a11 * b01 + a21 * b02;
        out.m02 = a02 * b00 + a12 * b01 + a22 * b02;
        out.m03 = a03 * b00 + a13 * b01 + a23 * b02;
        out.m04 = a00 * b10 + a10 * b11 + a20 * b12;
        out.m05 = a01 * b10 + a11 * b11 + a21 * b12;
        out.m06 = a02 * b10 + a12 * b11 + a22 * b12;
        out.m07 = a03 * b10 + a13 * b11 + a23 * b12;
        out.m08 = a00 * b20 + a10 * b21 + a20 * b22;
        out.m09 = a01 * b20 + a11 * b21 + a21 * b22;
        out.m10 = a02 * b20 + a12 * b21 + a22 * b22;
        out.m11 = a03 * b20 + a13 * b21 + a23 * b22;
        // If the source and destination differ, copy the unchanged last row
        if (a !== out) {
            out.m12 = a.m12;
            out.m13 = a.m13;
            out.m14 = a.m14;
            out.m15 = a.m15;
        }
        return out;
    }
    /**
     * @en Transform a matrix with a given angle around X axis and save the results to the out matrix
     * @zh 在给定矩阵变换基础上加入绕 X 轴的旋转变换
     * @param rad Angle of rotation (in radians)
     */
    static rotateX(out, a, rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const a10 = a.m04;
        const a11 = a.m05;
        const a12 = a.m06;
        const a13 = a.m07;
        const a20 = a.m08;
        const a21 = a.m09;
        const a22 = a.m10;
        const a23 = a.m11;
        if (a !== out) { // If the source and destination differ, copy the unchanged rows
            out.m00 = a.m00;
            out.m01 = a.m01;
            out.m02 = a.m02;
            out.m03 = a.m03;
            out.m12 = a.m12;
            out.m13 = a.m13;
            out.m14 = a.m14;
            out.m15 = a.m15;
        }
        // Perform axis-specific matrix multiplication
        out.m04 = a10 * c + a20 * s;
        out.m05 = a11 * c + a21 * s;
        out.m06 = a12 * c + a22 * s;
        out.m07 = a13 * c + a23 * s;
        out.m08 = a20 * c - a10 * s;
        out.m09 = a21 * c - a11 * s;
        out.m10 = a22 * c - a12 * s;
        out.m11 = a23 * c - a13 * s;
        return out;
    }
    /**
     * @en Transform a matrix with a given angle around Y axis and save the results to the out matrix
     * @zh 在给定矩阵变换基础上加入绕 Y 轴的旋转变换
     * @param rad Angle of rotation (in radians)
     */
    static rotateY(out, a, rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const a00 = a.m00;
        const a01 = a.m01;
        const a02 = a.m02;
        const a03 = a.m03;
        const a20 = a.m08;
        const a21 = a.m09;
        const a22 = a.m10;
        const a23 = a.m11;
        if (a !== out) { // If the source and destination differ, copy the unchanged rows
            out.m04 = a.m04;
            out.m05 = a.m05;
            out.m06 = a.m06;
            out.m07 = a.m07;
            out.m12 = a.m12;
            out.m13 = a.m13;
            out.m14 = a.m14;
            out.m15 = a.m15;
        }
        // Perform axis-specific matrix multiplication
        out.m00 = a00 * c - a20 * s;
        out.m01 = a01 * c - a21 * s;
        out.m02 = a02 * c - a22 * s;
        out.m03 = a03 * c - a23 * s;
        out.m08 = a00 * s + a20 * c;
        out.m09 = a01 * s + a21 * c;
        out.m10 = a02 * s + a22 * c;
        out.m11 = a03 * s + a23 * c;
        return out;
    }
    /**
     * @en Transform a matrix with a given angle around Z axis and save the results to the out matrix
     * @zh 在给定矩阵变换基础上加入绕 Z 轴的旋转变换
     * @param rad Angle of rotation (in radians)
     */
    static rotateZ(out, a, rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const a00 = a.m00;
        const a01 = a.m01;
        const a02 = a.m02;
        const a03 = a.m03;
        const a10 = a.m04;
        const a11 = a.m05;
        const a12 = a.m06;
        const a13 = a.m07;
        // If the source and destination differ, copy the unchanged last row
        if (a !== out) {
            out.m08 = a.m08;
            out.m09 = a.m09;
            out.m10 = a.m10;
            out.m11 = a.m11;
            out.m12 = a.m12;
            out.m13 = a.m13;
            out.m14 = a.m14;
            out.m15 = a.m15;
        }
        // Perform axis-specific matrix multiplication
        out.m00 = a00 * c + a10 * s;
        out.m01 = a01 * c + a11 * s;
        out.m02 = a02 * c + a12 * s;
        out.m03 = a03 * c + a13 * s;
        out.m04 = a10 * c - a00 * s;
        out.m05 = a11 * c - a01 * s;
        out.m06 = a12 * c - a02 * s;
        out.m07 = a13 * c - a03 * s;
        return out;
    }
    /**
     * @en Sets the out matrix with a translation vector
     * @zh 计算位移矩阵
     */
    static fromTranslation(out, v) {
        out.m00 = 1;
        out.m01 = 0;
        out.m02 = 0;
        out.m03 = 0;
        out.m04 = 0;
        out.m05 = 1;
        out.m06 = 0;
        out.m07 = 0;
        out.m08 = 0;
        out.m09 = 0;
        out.m10 = 1;
        out.m11 = 0;
        out.m12 = v.x;
        out.m13 = v.y;
        out.m14 = v.z;
        out.m15 = 1;
        return out;
    }
    /**
     * @en Sets the out matrix with a scale vector
     * @zh 计算缩放矩阵
     */
    static fromScaling(out, v) {
        out.m00 = v.x;
        out.m01 = 0;
        out.m02 = 0;
        out.m03 = 0;
        out.m04 = 0;
        out.m05 = v.y;
        out.m06 = 0;
        out.m07 = 0;
        out.m08 = 0;
        out.m09 = 0;
        out.m10 = v.z;
        out.m11 = 0;
        out.m12 = 0;
        out.m13 = 0;
        out.m14 = 0;
        out.m15 = 1;
        return out;
    }
    /**
     * @en Sets the out matrix with rotation angle
     * @zh 计算旋转矩阵
     */
    static fromRotation(out, rad, axis) {
        let x = axis.x;
        let y = axis.y;
        let z = axis.z;
        let len = Math.sqrt(x * x + y * y + z * z);
        if (Math.abs(len) < utils_1.EPSILON) {
            return null;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const t = 1 - c;
        // Perform rotation-specific matrix multiplication
        out.m00 = x * x * t + c;
        out.m01 = y * x * t + z * s;
        out.m02 = z * x * t - y * s;
        out.m03 = 0;
        out.m04 = x * y * t - z * s;
        out.m05 = y * y * t + c;
        out.m06 = z * y * t + x * s;
        out.m07 = 0;
        out.m08 = x * z * t + y * s;
        out.m09 = y * z * t - x * s;
        out.m10 = z * z * t + c;
        out.m11 = 0;
        out.m12 = 0;
        out.m13 = 0;
        out.m14 = 0;
        out.m15 = 1;
        return out;
    }
    /**
     * @en Calculates the matrix representing a rotation around the X axis
     * @zh 计算绕 X 轴的旋转矩阵
     */
    static fromXRotation(out, rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        // Perform axis-specific matrix multiplication
        out.m00 = 1;
        out.m01 = 0;
        out.m02 = 0;
        out.m03 = 0;
        out.m04 = 0;
        out.m05 = c;
        out.m06 = s;
        out.m07 = 0;
        out.m08 = 0;
        out.m09 = -s;
        out.m10 = c;
        out.m11 = 0;
        out.m12 = 0;
        out.m13 = 0;
        out.m14 = 0;
        out.m15 = 1;
        return out;
    }
    /**
     * @en Calculates the matrix representing a rotation around the Y axis
     * @zh 计算绕 Y 轴的旋转矩阵
     */
    static fromYRotation(out, rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        // Perform axis-specific matrix multiplication
        out.m00 = c;
        out.m01 = 0;
        out.m02 = -s;
        out.m03 = 0;
        out.m04 = 0;
        out.m05 = 1;
        out.m06 = 0;
        out.m07 = 0;
        out.m08 = s;
        out.m09 = 0;
        out.m10 = c;
        out.m11 = 0;
        out.m12 = 0;
        out.m13 = 0;
        out.m14 = 0;
        out.m15 = 1;
        return out;
    }
    /**
     * @en Calculates the matrix representing a rotation around the Z axis
     * @zh 计算绕 Z 轴的旋转矩阵
     */
    static fromZRotation(out, rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        // Perform axis-specific matrix multiplication
        out.m00 = c;
        out.m01 = s;
        out.m02 = 0;
        out.m03 = 0;
        out.m04 = -s;
        out.m05 = c;
        out.m06 = 0;
        out.m07 = 0;
        out.m08 = 0;
        out.m09 = 0;
        out.m10 = 1;
        out.m11 = 0;
        out.m12 = 0;
        out.m13 = 0;
        out.m14 = 0;
        out.m15 = 1;
        return out;
    }
    /**
     * @en Calculates the transform representing the combination of a rotation and a translation
     * @zh 根据旋转和位移信息计算矩阵
     */
    static fromRT(out, q, v) {
        const x = q.x;
        const y = q.y;
        const z = q.z;
        const w = q.w;
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const xy = x * y2;
        const xz = x * z2;
        const yy = y * y2;
        const yz = y * z2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        out.m00 = 1 - (yy + zz);
        out.m01 = xy + wz;
        out.m02 = xz - wy;
        out.m03 = 0;
        out.m04 = xy - wz;
        out.m05 = 1 - (xx + zz);
        out.m06 = yz + wx;
        out.m07 = 0;
        out.m08 = xz + wy;
        out.m09 = yz - wx;
        out.m10 = 1 - (xx + yy);
        out.m11 = 0;
        out.m12 = v.x;
        out.m13 = v.y;
        out.m14 = v.z;
        out.m15 = 1;
        return out;
    }
    /**
     * @en Extracts the translation from the matrix, assuming it's composed in order of scale, rotation, translation
     * @zh 提取矩阵的位移信息, 默认矩阵中的变换以 S->R->T 的顺序应用
     */
    static getTranslation(out, mat) {
        out.x = mat.m12;
        out.y = mat.m13;
        out.z = mat.m14;
        return out;
    }
    /**
     * @en Extracts the scale vector from the matrix, assuming it's composed in order of scale, rotation, translation
     * @zh 提取矩阵的缩放信息, 默认矩阵中的变换以 S->R->T 的顺序应用
     */
    static getScaling(out, mat) {
        const m00 = m3_1.m00 = mat.m00;
        const m01 = m3_1.m01 = mat.m01;
        const m02 = m3_1.m02 = mat.m02;
        const m04 = m3_1.m03 = mat.m04;
        const m05 = m3_1.m04 = mat.m05;
        const m06 = m3_1.m05 = mat.m06;
        const m08 = m3_1.m06 = mat.m08;
        const m09 = m3_1.m07 = mat.m09;
        const m10 = m3_1.m08 = mat.m10;
        out.x = Math.sqrt(m00 * m00 + m01 * m01 + m02 * m02);
        out.y = Math.sqrt(m04 * m04 + m05 * m05 + m06 * m06);
        out.z = Math.sqrt(m08 * m08 + m09 * m09 + m10 * m10);
        // account for refections
        if (Mat3_1.Mat3.determinant(m3_1) < 0) {
            out.x *= -1;
        }
        return out;
    }
    /**
     * @en Extracts the rotation from the matrix, assuming it's composed in order of scale, rotation, translation
     * @zh 提取矩阵的旋转信息, 默认输入矩阵不含有缩放信息，如考虑缩放应使用 `toRTS` 函数。
     */
    static getRotation(out, mat) {
        const trace = mat.m00 + mat.m05 + mat.m10;
        let S = 0;
        if (trace > 0) {
            S = Math.sqrt(trace + 1.0) * 2;
            out.w = 0.25 * S;
            out.x = (mat.m06 - mat.m09) / S;
            out.y = (mat.m08 - mat.m02) / S;
            out.z = (mat.m01 - mat.m04) / S;
        }
        else if ((mat.m00 > mat.m05) && (mat.m00 > mat.m10)) {
            S = Math.sqrt(1.0 + mat.m00 - mat.m05 - mat.m10) * 2;
            out.w = (mat.m06 - mat.m09) / S;
            out.x = 0.25 * S;
            out.y = (mat.m01 + mat.m04) / S;
            out.z = (mat.m08 + mat.m02) / S;
        }
        else if (mat.m05 > mat.m10) {
            S = Math.sqrt(1.0 + mat.m05 - mat.m00 - mat.m10) * 2;
            out.w = (mat.m08 - mat.m02) / S;
            out.x = (mat.m01 + mat.m04) / S;
            out.y = 0.25 * S;
            out.z = (mat.m06 + mat.m09) / S;
        }
        else {
            S = Math.sqrt(1.0 + mat.m10 - mat.m00 - mat.m05) * 2;
            out.w = (mat.m01 - mat.m04) / S;
            out.x = (mat.m08 + mat.m02) / S;
            out.y = (mat.m06 + mat.m09) / S;
            out.z = 0.25 * S;
        }
        return out;
    }
    /**
     * @en Extracts the scale, rotation and translation from the matrix, assuming it's composed in order of scale, rotation, translation
     * @zh 提取旋转、位移、缩放信息， 默认矩阵中的变换以 S->R->T 的顺序应用
     */
    static toRTS(m, q, v, s) {
        s.x = Vec3_1.Vec3.set(v3_1, m.m00, m.m01, m.m02).length();
        m3_1.m00 = m.m00 / s.x;
        m3_1.m01 = m.m01 / s.x;
        m3_1.m02 = m.m02 / s.x;
        s.y = Vec3_1.Vec3.set(v3_1, m.m04, m.m05, m.m06).length();
        m3_1.m03 = m.m04 / s.y;
        m3_1.m04 = m.m05 / s.y;
        m3_1.m05 = m.m06 / s.y;
        s.z = Vec3_1.Vec3.set(v3_1, m.m08, m.m09, m.m10).length();
        m3_1.m06 = m.m08 / s.z;
        m3_1.m07 = m.m09 / s.z;
        m3_1.m08 = m.m10 / s.z;
        const det = Mat3_1.Mat3.determinant(m3_1);
        if (det < 0) {
            s.x *= -1;
            m3_1.m00 *= -1;
            m3_1.m01 *= -1;
            m3_1.m02 *= -1;
        }
        Quat_1.Quat.fromMat3(q, m3_1); // already normalized
        Vec3_1.Vec3.set(v, m.m12, m.m13, m.m14);
    }
    /**
     * @en Compose a matrix from scale, rotation and translation, applied in order.
     * @zh 根据旋转、位移、缩放信息计算矩阵，以 S->R->T 的顺序应用
     */
    static fromRTS(out, q, v, s) {
        const x = q.x;
        const y = q.y;
        const z = q.z;
        const w = q.w;
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const xy = x * y2;
        const xz = x * z2;
        const yy = y * y2;
        const yz = y * z2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        const sx = s.x;
        const sy = s.y;
        const sz = s.z;
        out.m00 = (1 - (yy + zz)) * sx;
        out.m01 = (xy + wz) * sx;
        out.m02 = (xz - wy) * sx;
        out.m03 = 0;
        out.m04 = (xy - wz) * sy;
        out.m05 = (1 - (xx + zz)) * sy;
        out.m06 = (yz + wx) * sy;
        out.m07 = 0;
        out.m08 = (xz + wy) * sz;
        out.m09 = (yz - wx) * sz;
        out.m10 = (1 - (xx + yy)) * sz;
        out.m11 = 0;
        out.m12 = v.x;
        out.m13 = v.y;
        out.m14 = v.z;
        out.m15 = 1;
        return out;
    }
    /**
     * @en Compose a matrix from scale, rotation and translation, applied in order, from a given origin
     * @zh 根据指定的旋转、位移、缩放及变换中心信息计算矩阵，以 S->R->T 的顺序应用
     * @param q Rotation quaternion
     * @param v Translation vector
     * @param s Scaling vector
     * @param o transformation Center
     */
    static fromRTSOrigin(out, q, v, s, o) {
        const x = q.x;
        const y = q.y;
        const z = q.z;
        const w = q.w;
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const xy = x * y2;
        const xz = x * z2;
        const yy = y * y2;
        const yz = y * z2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        const sx = s.x;
        const sy = s.y;
        const sz = s.z;
        const ox = o.x;
        const oy = o.y;
        const oz = o.z;
        out.m00 = (1 - (yy + zz)) * sx;
        out.m01 = (xy + wz) * sx;
        out.m02 = (xz - wy) * sx;
        out.m03 = 0;
        out.m04 = (xy - wz) * sy;
        out.m05 = (1 - (xx + zz)) * sy;
        out.m06 = (yz + wx) * sy;
        out.m07 = 0;
        out.m08 = (xz + wy) * sz;
        out.m09 = (yz - wx) * sz;
        out.m10 = (1 - (xx + yy)) * sz;
        out.m11 = 0;
        out.m12 = v.x + ox - (out.m00 * ox + out.m04 * oy + out.m08 * oz);
        out.m13 = v.y + oy - (out.m01 * ox + out.m05 * oy + out.m09 * oz);
        out.m14 = v.z + oz - (out.m02 * ox + out.m06 * oy + out.m10 * oz);
        out.m15 = 1;
        return out;
    }
    /**
     * @en Sets the out matrix with the given quaternion
     * @zh 根据指定的旋转信息计算矩阵
     */
    static fromQuat(out, q) {
        const x = q.x;
        const y = q.y;
        const z = q.z;
        const w = q.w;
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const yx = y * x2;
        const yy = y * y2;
        const zx = z * x2;
        const zy = z * y2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        out.m00 = 1 - yy - zz;
        out.m01 = yx + wz;
        out.m02 = zx - wy;
        out.m03 = 0;
        out.m04 = yx - wz;
        out.m05 = 1 - xx - zz;
        out.m06 = zy + wx;
        out.m07 = 0;
        out.m08 = zx + wy;
        out.m09 = zy - wx;
        out.m10 = 1 - xx - yy;
        out.m11 = 0;
        out.m12 = 0;
        out.m13 = 0;
        out.m14 = 0;
        out.m15 = 1;
        return out;
    }
    /**
     * @en Calculates the matrix representing the given frustum
     * @zh 根据指定的视锥体信息计算矩阵
     * @param left The X coordinate of the left side of the near projection plane in view space.
     * @param right The X coordinate of the right side of the near projection plane in view space.
     * @param bottom The Y coordinate of the bottom side of the near projection plane in view space.
     * @param top The Y coordinate of the top side of the near projection plane in view space.
     * @param near Z distance to the near plane from the origin in view space.
     * @param far Z distance to the far plane from the origin in view space.
     */
    static frustum(out, left, right, bottom, top, near, far) {
        const rl = 1 / (right - left);
        const tb = 1 / (top - bottom);
        const nf = 1 / (near - far);
        out.m00 = (near * 2) * rl;
        out.m01 = 0;
        out.m02 = 0;
        out.m03 = 0;
        out.m04 = 0;
        out.m05 = (near * 2) * tb;
        out.m06 = 0;
        out.m07 = 0;
        out.m08 = (right + left) * rl;
        out.m09 = (top + bottom) * tb;
        out.m10 = (far + near) * nf;
        out.m11 = -1;
        out.m12 = 0;
        out.m13 = 0;
        out.m14 = (far * near * 2) * nf;
        out.m15 = 0;
        return out;
    }
    /**
     * @en Calculates perspective projection matrix
     * @zh 计算透视投影矩阵
     * @param fovy Vertical field-of-view in degrees.
     * @param aspect Aspect ratio
     * @param near Near depth clipping plane value.
     * @param far Far depth clipping plane value.
     */
    static perspective(out, fov, aspect, near, far, isFOVY = true, minClipZ = -1, projectionSignY = 1, orientation = 0) {
        const f = 1.0 / Math.tan(fov / 2);
        const nf = 1 / (near - far);
        const x = isFOVY ? f / aspect : f;
        const y = (isFOVY ? f : f * aspect) * projectionSignY;
        const preTransform = exports.preTransforms[orientation];
        out.m00 = x * preTransform[0];
        out.m01 = x * preTransform[1];
        out.m02 = 0;
        out.m03 = 0;
        out.m04 = y * preTransform[2];
        out.m05 = y * preTransform[3];
        out.m06 = 0;
        out.m07 = 0;
        out.m08 = 0;
        out.m09 = 0;
        out.m10 = (far - minClipZ * near) * nf;
        out.m11 = -1;
        out.m12 = 0;
        out.m13 = 0;
        out.m14 = far * near * nf * (1 - minClipZ);
        out.m15 = 0;
        return out;
    }
    /**
     * @en Calculates orthogonal projection matrix
     * @zh 计算正交投影矩阵
     * @param left Left-side x-coordinate.
     * @param right Right-side x-coordinate.
     * @param bottom Bottom y-coordinate.
     * @param top Top y-coordinate.
     * @param near Near depth clipping plane value.
     * @param far Far depth clipping plane value.
     */
    static ortho(out, left, right, bottom, top, near, far, minClipZ = -1, projectionSignY = 1, orientation = 0) {
        const lr = 1 / (left - right);
        const bt = 1 / (bottom - top) * projectionSignY;
        const nf = 1 / (near - far);
        const x = -2 * lr;
        const y = -2 * bt;
        const dx = (left + right) * lr;
        const dy = (top + bottom) * bt;
        const preTransform = exports.preTransforms[orientation];
        out.m00 = x * preTransform[0];
        out.m01 = x * preTransform[1];
        out.m02 = 0;
        out.m03 = 0;
        out.m04 = y * preTransform[2];
        out.m05 = y * preTransform[3];
        out.m06 = 0;
        out.m07 = 0;
        out.m08 = 0;
        out.m09 = 0;
        out.m10 = nf * (1 - minClipZ);
        out.m11 = 0;
        out.m12 = dx * preTransform[0] + dy * preTransform[2];
        out.m13 = dx * preTransform[1] + dy * preTransform[3];
        out.m14 = (near - minClipZ * far) * nf;
        out.m15 = 1;
        return out;
    }
    /**
     * @en
     * Calculates the matrix with the view point information, given by eye position, target center and the up vector.
     * Note that center to eye vector can't be zero or parallel to the up vector
     * @zh
     * 根据视点计算矩阵，注意 `eye - center` 不能为零向量或与 `up` 向量平行
     * @param eye The source point.
     * @param center The target point.
     * @param up The vector describing the up direction.
     */
    static lookAt(out, eye, center, up) {
        const eyex = eye.x;
        const eyey = eye.y;
        const eyez = eye.z;
        const upx = up.x;
        const upy = up.y;
        const upz = up.z;
        const centerx = center.x;
        const centery = center.y;
        const centerz = center.z;
        let z0 = eyex - centerx;
        let z1 = eyey - centery;
        let z2 = eyez - centerz;
        let len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;
        let x0 = upy * z2 - upz * z1;
        let x1 = upz * z0 - upx * z2;
        let x2 = upx * z1 - upy * z0;
        len = 1 / Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        x0 *= len;
        x1 *= len;
        x2 *= len;
        const y0 = z1 * x2 - z2 * x1;
        const y1 = z2 * x0 - z0 * x2;
        const y2 = z0 * x1 - z1 * x0;
        out.m00 = x0;
        out.m01 = y0;
        out.m02 = z0;
        out.m03 = 0;
        out.m04 = x1;
        out.m05 = y1;
        out.m06 = z1;
        out.m07 = 0;
        out.m08 = x2;
        out.m09 = y2;
        out.m10 = z2;
        out.m11 = 0;
        out.m12 = -(x0 * eyex + x1 * eyey + x2 * eyez);
        out.m13 = -(y0 * eyex + y1 * eyey + y2 * eyez);
        out.m14 = -(z0 * eyex + z1 * eyey + z2 * eyez);
        out.m15 = 1;
        return out;
    }
    /**
     * @en Calculates the inverse transpose of a matrix and save the results to out matrix
     * @zh 计算逆转置矩阵
     */
    static inverseTranspose(out, a) {
        const a00 = a.m00;
        const a01 = a.m01;
        const a02 = a.m02;
        const a03 = a.m03;
        const a10 = a.m04;
        const a11 = a.m05;
        const a12 = a.m06;
        const a13 = a.m07;
        const a20 = a.m08;
        const a21 = a.m09;
        const a22 = a.m10;
        const a23 = a.m11;
        const a30 = a.m12;
        const a31 = a.m13;
        const a32 = a.m14;
        const a33 = a.m15;
        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;
        // Calculate the determinant
        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        out.m00 = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        out.m01 = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        out.m02 = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        out.m03 = 0;
        out.m04 = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out.m05 = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out.m06 = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        out.m07 = 0;
        out.m08 = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out.m09 = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out.m10 = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        out.m11 = 0;
        out.m12 = 0;
        out.m13 = 0;
        out.m14 = 0;
        out.m15 = 1;
        return out;
    }
    /**
     * @en Transform a matrix object to a flat array
     * @zh 矩阵转数组
     * @param ofs Array Start Offset
     */
    static toArray(out, m, ofs = 0) {
        out[ofs + 0] = m.m00;
        out[ofs + 1] = m.m01;
        out[ofs + 2] = m.m02;
        out[ofs + 3] = m.m03;
        out[ofs + 4] = m.m04;
        out[ofs + 5] = m.m05;
        out[ofs + 6] = m.m06;
        out[ofs + 7] = m.m07;
        out[ofs + 8] = m.m08;
        out[ofs + 9] = m.m09;
        out[ofs + 10] = m.m10;
        out[ofs + 11] = m.m11;
        out[ofs + 12] = m.m12;
        out[ofs + 13] = m.m13;
        out[ofs + 14] = m.m14;
        out[ofs + 15] = m.m15;
        return out;
    }
    /**
     * @en Generates or sets a matrix with a flat array
     * @zh 数组转矩阵
     * @param ofs Array Start Offset
     */
    static fromArray(out, arr, ofs = 0) {
        out.m00 = arr[ofs + 0];
        out.m01 = arr[ofs + 1];
        out.m02 = arr[ofs + 2];
        out.m03 = arr[ofs + 3];
        out.m04 = arr[ofs + 4];
        out.m05 = arr[ofs + 5];
        out.m06 = arr[ofs + 6];
        out.m07 = arr[ofs + 7];
        out.m08 = arr[ofs + 8];
        out.m09 = arr[ofs + 9];
        out.m10 = arr[ofs + 10];
        out.m11 = arr[ofs + 11];
        out.m12 = arr[ofs + 12];
        out.m13 = arr[ofs + 13];
        out.m14 = arr[ofs + 14];
        out.m15 = arr[ofs + 15];
        return out;
    }
    /**
     * @en Adds two matrices and save the results to out matrix
     * @zh 逐元素矩阵加法
     */
    static add(out, a, b) {
        out.m00 = a.m00 + b.m00;
        out.m01 = a.m01 + b.m01;
        out.m02 = a.m02 + b.m02;
        out.m03 = a.m03 + b.m03;
        out.m04 = a.m04 + b.m04;
        out.m05 = a.m05 + b.m05;
        out.m06 = a.m06 + b.m06;
        out.m07 = a.m07 + b.m07;
        out.m08 = a.m08 + b.m08;
        out.m09 = a.m09 + b.m09;
        out.m10 = a.m10 + b.m10;
        out.m11 = a.m11 + b.m11;
        out.m12 = a.m12 + b.m12;
        out.m13 = a.m13 + b.m13;
        out.m14 = a.m14 + b.m14;
        out.m15 = a.m15 + b.m15;
        return out;
    }
    /**
     * @en Subtracts matrix b from matrix a and save the results to out matrix
     * @zh 逐元素矩阵减法
     */
    static subtract(out, a, b) {
        out.m00 = a.m00 - b.m00;
        out.m01 = a.m01 - b.m01;
        out.m02 = a.m02 - b.m02;
        out.m03 = a.m03 - b.m03;
        out.m04 = a.m04 - b.m04;
        out.m05 = a.m05 - b.m05;
        out.m06 = a.m06 - b.m06;
        out.m07 = a.m07 - b.m07;
        out.m08 = a.m08 - b.m08;
        out.m09 = a.m09 - b.m09;
        out.m10 = a.m10 - b.m10;
        out.m11 = a.m11 - b.m11;
        out.m12 = a.m12 - b.m12;
        out.m13 = a.m13 - b.m13;
        out.m14 = a.m14 - b.m14;
        out.m15 = a.m15 - b.m15;
        return out;
    }
    /**
     * @en Multiply each element of a matrix by a scalar number and save the results to out matrix
     * @zh 矩阵标量乘法
     */
    static multiplyScalar(out, a, b) {
        out.m00 = a.m00 * b;
        out.m01 = a.m01 * b;
        out.m02 = a.m02 * b;
        out.m03 = a.m03 * b;
        out.m04 = a.m04 * b;
        out.m05 = a.m05 * b;
        out.m06 = a.m06 * b;
        out.m07 = a.m07 * b;
        out.m08 = a.m08 * b;
        out.m09 = a.m09 * b;
        out.m10 = a.m10 * b;
        out.m11 = a.m11 * b;
        out.m12 = a.m12 * b;
        out.m13 = a.m13 * b;
        out.m14 = a.m14 * b;
        out.m15 = a.m15 * b;
        return out;
    }
    /**
     * @en Adds two matrices after multiplying each element of the second operand by a scalar number. And save the results to out matrix.
     * @zh 逐元素矩阵标量乘加: A + B * scale
     */
    static multiplyScalarAndAdd(out, a, b, scale) {
        out.m00 = a.m00 + (b.m00 * scale);
        out.m01 = a.m01 + (b.m01 * scale);
        out.m02 = a.m02 + (b.m02 * scale);
        out.m03 = a.m03 + (b.m03 * scale);
        out.m04 = a.m04 + (b.m04 * scale);
        out.m05 = a.m05 + (b.m05 * scale);
        out.m06 = a.m06 + (b.m06 * scale);
        out.m07 = a.m07 + (b.m07 * scale);
        out.m08 = a.m08 + (b.m08 * scale);
        out.m09 = a.m09 + (b.m09 * scale);
        out.m10 = a.m10 + (b.m10 * scale);
        out.m11 = a.m11 + (b.m11 * scale);
        out.m12 = a.m12 + (b.m12 * scale);
        out.m13 = a.m13 + (b.m13 * scale);
        out.m14 = a.m14 + (b.m14 * scale);
        out.m15 = a.m15 + (b.m15 * scale);
        return out;
    }
    /**
     * @en Returns whether the specified matrices are equal.
     * @zh 矩阵等价判断
     */
    static strictEquals(a, b) {
        return a.m00 === b.m00 && a.m01 === b.m01 && a.m02 === b.m02 && a.m03 === b.m03
            && a.m04 === b.m04 && a.m05 === b.m05 && a.m06 === b.m06 && a.m07 === b.m07
            && a.m08 === b.m08 && a.m09 === b.m09 && a.m10 === b.m10 && a.m11 === b.m11
            && a.m12 === b.m12 && a.m13 === b.m13 && a.m14 === b.m14 && a.m15 === b.m15;
    }
    /**
     * @en Returns whether the specified matrices are approximately equal.
     * @zh 排除浮点数误差的矩阵近似等价判断
     */
    static equals(a, b, epsilon = utils_1.EPSILON) {
        // TAOCP vol.2, 3rd ed., s.4.2.4, p.213-225
        // defines a 'close enough' relationship between u and v that scales for magnitude
        return (Math.abs(a.m00 - b.m00) <= epsilon * Math.max(1.0, Math.abs(a.m00), Math.abs(b.m00))
            && Math.abs(a.m01 - b.m01) <= epsilon * Math.max(1.0, Math.abs(a.m01), Math.abs(b.m01))
            && Math.abs(a.m02 - b.m02) <= epsilon * Math.max(1.0, Math.abs(a.m02), Math.abs(b.m02))
            && Math.abs(a.m03 - b.m03) <= epsilon * Math.max(1.0, Math.abs(a.m03), Math.abs(b.m03))
            && Math.abs(a.m04 - b.m04) <= epsilon * Math.max(1.0, Math.abs(a.m04), Math.abs(b.m04))
            && Math.abs(a.m05 - b.m05) <= epsilon * Math.max(1.0, Math.abs(a.m05), Math.abs(b.m05))
            && Math.abs(a.m06 - b.m06) <= epsilon * Math.max(1.0, Math.abs(a.m06), Math.abs(b.m06))
            && Math.abs(a.m07 - b.m07) <= epsilon * Math.max(1.0, Math.abs(a.m07), Math.abs(b.m07))
            && Math.abs(a.m08 - b.m08) <= epsilon * Math.max(1.0, Math.abs(a.m08), Math.abs(b.m08))
            && Math.abs(a.m09 - b.m09) <= epsilon * Math.max(1.0, Math.abs(a.m09), Math.abs(b.m09))
            && Math.abs(a.m10 - b.m10) <= epsilon * Math.max(1.0, Math.abs(a.m10), Math.abs(b.m10))
            && Math.abs(a.m11 - b.m11) <= epsilon * Math.max(1.0, Math.abs(a.m11), Math.abs(b.m11))
            && Math.abs(a.m12 - b.m12) <= epsilon * Math.max(1.0, Math.abs(a.m12), Math.abs(b.m12))
            && Math.abs(a.m13 - b.m13) <= epsilon * Math.max(1.0, Math.abs(a.m13), Math.abs(b.m13))
            && Math.abs(a.m14 - b.m14) <= epsilon * Math.max(1.0, Math.abs(a.m14), Math.abs(b.m14))
            && Math.abs(a.m15 - b.m15) <= epsilon * Math.max(1.0, Math.abs(a.m15), Math.abs(b.m15)));
    }
    /**
     * @en Clone a new matrix from the current matrix.
     * @zh 克隆当前矩阵。
     */
    clone() {
        return new Mat4(this.m00, this.m01, this.m02, this.m03, this.m04, this.m05, this.m06, this.m07, this.m08, this.m09, this.m10, this.m11, this.m12, this.m13, this.m14, this.m15);
    }
    set(m00 = 1, m01 = 0, m02 = 0, m03 = 0, m04 = 0, m05 = 1, m06 = 0, m07 = 0, m08 = 0, m09 = 0, m10 = 1, m11 = 0, m12 = 0, m13 = 0, m14 = 0, m15 = 1) {
        if (typeof m00 === 'object') {
            this.m01 = m00.m01;
            this.m02 = m00.m02;
            this.m03 = m00.m03;
            this.m04 = m00.m04;
            this.m05 = m00.m05;
            this.m06 = m00.m06;
            this.m07 = m00.m07;
            this.m08 = m00.m08;
            this.m09 = m00.m09;
            this.m10 = m00.m10;
            this.m11 = m00.m11;
            this.m12 = m00.m12;
            this.m13 = m00.m13;
            this.m14 = m00.m14;
            this.m15 = m00.m15;
            this.m00 = m00.m00;
        }
        else {
            this.m01 = m01;
            this.m02 = m02;
            this.m03 = m03;
            this.m04 = m04;
            this.m05 = m05;
            this.m06 = m06;
            this.m07 = m07;
            this.m08 = m08;
            this.m09 = m09;
            this.m10 = m10;
            this.m11 = m11;
            this.m12 = m12;
            this.m13 = m13;
            this.m14 = m14;
            this.m15 = m15;
            this.m00 = m00;
        }
        return this;
    }
    /**
     * @en Returns whether the specified matrices are approximately equal.
     * @zh 判断当前矩阵是否在误差范围内与指定矩阵相等。
     * @param other Comparative matrix
     * @param epsilon The error allowed. It`s should be a non-negative number.
     * @return Returns `true' when the elements of both matrices are equal; otherwise returns `false'.
     */
    equals(other, epsilon = utils_1.EPSILON) {
        return (Math.abs(this.m00 - other.m00) <= epsilon * Math.max(1.0, Math.abs(this.m00), Math.abs(other.m00))
            && Math.abs(this.m01 - other.m01) <= epsilon * Math.max(1.0, Math.abs(this.m01), Math.abs(other.m01))
            && Math.abs(this.m02 - other.m02) <= epsilon * Math.max(1.0, Math.abs(this.m02), Math.abs(other.m02))
            && Math.abs(this.m03 - other.m03) <= epsilon * Math.max(1.0, Math.abs(this.m03), Math.abs(other.m03))
            && Math.abs(this.m04 - other.m04) <= epsilon * Math.max(1.0, Math.abs(this.m04), Math.abs(other.m04))
            && Math.abs(this.m05 - other.m05) <= epsilon * Math.max(1.0, Math.abs(this.m05), Math.abs(other.m05))
            && Math.abs(this.m06 - other.m06) <= epsilon * Math.max(1.0, Math.abs(this.m06), Math.abs(other.m06))
            && Math.abs(this.m07 - other.m07) <= epsilon * Math.max(1.0, Math.abs(this.m07), Math.abs(other.m07))
            && Math.abs(this.m08 - other.m08) <= epsilon * Math.max(1.0, Math.abs(this.m08), Math.abs(other.m08))
            && Math.abs(this.m09 - other.m09) <= epsilon * Math.max(1.0, Math.abs(this.m09), Math.abs(other.m09))
            && Math.abs(this.m10 - other.m10) <= epsilon * Math.max(1.0, Math.abs(this.m10), Math.abs(other.m10))
            && Math.abs(this.m11 - other.m11) <= epsilon * Math.max(1.0, Math.abs(this.m11), Math.abs(other.m11))
            && Math.abs(this.m12 - other.m12) <= epsilon * Math.max(1.0, Math.abs(this.m12), Math.abs(other.m12))
            && Math.abs(this.m13 - other.m13) <= epsilon * Math.max(1.0, Math.abs(this.m13), Math.abs(other.m13))
            && Math.abs(this.m14 - other.m14) <= epsilon * Math.max(1.0, Math.abs(this.m14), Math.abs(other.m14))
            && Math.abs(this.m15 - other.m15) <= epsilon * Math.max(1.0, Math.abs(this.m15), Math.abs(other.m15)));
    }
    /**
     * @en Returns whether the specified matrices are equal.
     * @zh 判断当前矩阵是否与指定矩阵相等。
     * @param other Comparative matrix
     * @return Returns `true' when the elements of both matrices are equal; otherwise returns `false'.
     */
    strictEquals(other) {
        return this.m00 === other.m00 && this.m01 === other.m01 && this.m02 === other.m02 && this.m03 === other.m03
            && this.m04 === other.m04 && this.m05 === other.m05 && this.m06 === other.m06 && this.m07 === other.m07
            && this.m08 === other.m08 && this.m09 === other.m09 && this.m10 === other.m10 && this.m11 === other.m11
            && this.m12 === other.m12 && this.m13 === other.m13 && this.m14 === other.m14 && this.m15 === other.m15;
    }
    /**
     * @en Returns a string representation of a matrix.
     * @zh 返回当前矩阵的字符串表示。
     * @return 当前矩阵的字符串表示。
     */
    toString() {
        return `[\n${this.m00}, ${this.m01}, ${this.m02}, ${this.m03},\n${this.m04}, ${this.m05}, ${this.m06}, ${this.m07},\n${this.m08}, ${this.m09}, ${this.m10}, ${this.m11},\n${this.m12}, ${this.m13}, ${this.m14}, ${this.m15}\n`
            + ']';
    }
    /**
     * @en set the current matrix to an identity matrix.
     * @zh 将当前矩阵设为单位矩阵。
     * @return `this`
     */
    identity() {
        this.m00 = 1;
        this.m01 = 0;
        this.m02 = 0;
        this.m03 = 0;
        this.m04 = 0;
        this.m05 = 1;
        this.m06 = 0;
        this.m07 = 0;
        this.m08 = 0;
        this.m09 = 0;
        this.m10 = 1;
        this.m11 = 0;
        this.m12 = 0;
        this.m13 = 0;
        this.m14 = 0;
        this.m15 = 1;
        return this;
    }
    /**
     * @en set the current matrix to an zero matrix.
     * @zh 将当前矩阵设为 0矩阵。
     * @return `this`
     */
    zero() {
        this.m00 = 0;
        this.m01 = 0;
        this.m02 = 0;
        this.m03 = 0;
        this.m04 = 0;
        this.m05 = 0;
        this.m06 = 0;
        this.m07 = 0;
        this.m08 = 0;
        this.m09 = 0;
        this.m10 = 0;
        this.m11 = 0;
        this.m12 = 0;
        this.m13 = 0;
        this.m14 = 0;
        this.m15 = 0;
        return this;
    }
    /**
     * @en Transposes the current matrix.
     * @zh 计算当前矩阵的转置矩阵。
     */
    transpose() {
        const a01 = this.m01;
        const a02 = this.m02;
        const a03 = this.m03;
        const a12 = this.m06;
        const a13 = this.m07;
        const a23 = this.m11;
        this.m01 = this.m04;
        this.m02 = this.m08;
        this.m03 = this.m12;
        this.m04 = a01;
        this.m06 = this.m09;
        this.m07 = this.m13;
        this.m08 = a02;
        this.m09 = a12;
        this.m11 = this.m14;
        this.m12 = a03;
        this.m13 = a13;
        this.m14 = a23;
        return this;
    }
    /**
     * @en Inverts the current matrix. When matrix is not invertible the matrix will be set to zeros.
     * @zh 计算当前矩阵的逆矩阵。注意，在矩阵不可逆时，会返回一个全为 0 的矩阵。
     */
    invert() {
        const a00 = this.m00;
        const a01 = this.m01;
        const a02 = this.m02;
        const a03 = this.m03;
        const a10 = this.m04;
        const a11 = this.m05;
        const a12 = this.m06;
        const a13 = this.m07;
        const a20 = this.m08;
        const a21 = this.m09;
        const a22 = this.m10;
        const a23 = this.m11;
        const a30 = this.m12;
        const a31 = this.m13;
        const a32 = this.m14;
        const a33 = this.m15;
        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;
        // Calculate the determinant
        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (det === 0) {
            this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            return this;
        }
        det = 1.0 / det;
        this.m00 = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        this.m01 = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        this.m02 = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        this.m03 = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        this.m04 = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        this.m05 = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        this.m06 = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        this.m07 = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        this.m08 = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        this.m09 = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        this.m10 = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        this.m11 = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        this.m12 = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        this.m13 = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        this.m14 = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        this.m15 = (a20 * b03 - a21 * b01 + a22 * b00) * det;
        return this;
    }
    /**
     * @en Calculates the determinant of the current matrix.
     * @zh 计算当前矩阵的行列式。
     * @return 当前矩阵的行列式。
     */
    determinant() {
        const a00 = this.m00;
        const a01 = this.m01;
        const a02 = this.m02;
        const a03 = this.m03;
        const a10 = this.m04;
        const a11 = this.m05;
        const a12 = this.m06;
        const a13 = this.m07;
        const a20 = this.m08;
        const a21 = this.m09;
        const a22 = this.m10;
        const a23 = this.m11;
        const a30 = this.m12;
        const a31 = this.m13;
        const a32 = this.m14;
        const a33 = this.m15;
        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;
        // Calculate the determinant
        return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    }
    /**
     * @en Adds the current matrix and another matrix to the current matrix.
     * @zh 矩阵加法。将当前矩阵与指定矩阵的相加，结果返回给当前矩阵。
     * @param mat the second operand
     */
    add(mat) {
        this.m00 += mat.m00;
        this.m01 += mat.m01;
        this.m02 += mat.m02;
        this.m03 += mat.m03;
        this.m04 += mat.m04;
        this.m05 += mat.m05;
        this.m06 += mat.m06;
        this.m07 += mat.m07;
        this.m08 += mat.m08;
        this.m09 += mat.m09;
        this.m10 += mat.m10;
        this.m11 += mat.m11;
        this.m12 += mat.m12;
        this.m13 += mat.m13;
        this.m14 += mat.m14;
        this.m15 += mat.m15;
        return this;
    }
    /**
     * @en Subtracts another matrix from the current matrix.
     * @zh 计算矩阵减法。将当前矩阵减去指定矩阵的结果赋值给当前矩阵。
     * @param mat the second operand
     */
    subtract(mat) {
        this.m00 -= mat.m00;
        this.m01 -= mat.m01;
        this.m02 -= mat.m02;
        this.m03 -= mat.m03;
        this.m04 -= mat.m04;
        this.m05 -= mat.m05;
        this.m06 -= mat.m06;
        this.m07 -= mat.m07;
        this.m08 -= mat.m08;
        this.m09 -= mat.m09;
        this.m10 -= mat.m10;
        this.m11 -= mat.m11;
        this.m12 -= mat.m12;
        this.m13 -= mat.m13;
        this.m14 -= mat.m14;
        this.m15 -= mat.m15;
        return this;
    }
    /**
     * @en Multiply the current matrix with another matrix.
     * @zh 矩阵乘法。将当前矩阵左乘指定矩阵的结果赋值给当前矩阵。
     * @param mat the second operand
     */
    multiply(mat) {
        const a00 = this.m00;
        const a01 = this.m01;
        const a02 = this.m02;
        const a03 = this.m03;
        const a10 = this.m04;
        const a11 = this.m05;
        const a12 = this.m06;
        const a13 = this.m07;
        const a20 = this.m08;
        const a21 = this.m09;
        const a22 = this.m10;
        const a23 = this.m11;
        const a30 = this.m12;
        const a31 = this.m13;
        const a32 = this.m14;
        const a33 = this.m15;
        // Cache only the current line of the second matrix
        let b0 = mat.m00;
        let b1 = mat.m01;
        let b2 = mat.m02;
        let b3 = mat.m03;
        this.m00 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.m01 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.m02 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.m03 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = mat.m04;
        b1 = mat.m05;
        b2 = mat.m06;
        b3 = mat.m07;
        this.m04 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.m05 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.m06 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.m07 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = mat.m08;
        b1 = mat.m09;
        b2 = mat.m10;
        b3 = mat.m11;
        this.m08 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.m09 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.m10 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.m11 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = mat.m12;
        b1 = mat.m13;
        b2 = mat.m14;
        b3 = mat.m15;
        this.m12 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.m13 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.m14 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.m15 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return this;
    }
    /**
     * @en Multiply each element of the current matrix by a scalar number.
     * @zh 矩阵数乘。将当前矩阵与指定标量的数乘结果赋值给当前矩阵。
     * @param scalar amount to scale the matrix's elements by
     */
    multiplyScalar(scalar) {
        this.m00 *= scalar;
        this.m01 *= scalar;
        this.m02 *= scalar;
        this.m03 *= scalar;
        this.m04 *= scalar;
        this.m05 *= scalar;
        this.m06 *= scalar;
        this.m07 *= scalar;
        this.m08 *= scalar;
        this.m09 *= scalar;
        this.m10 *= scalar;
        this.m11 *= scalar;
        this.m12 *= scalar;
        this.m13 *= scalar;
        this.m14 *= scalar;
        this.m15 *= scalar;
        return this;
    }
    /**
     * @en Translate the current matrix by the given vector
     * @zh 将当前矩阵左乘位移矩阵的结果赋值给当前矩阵，位移矩阵由各个轴的位移给出。
     * @param vec vector to translate by
     */
    translate(vec) {
        console.warn('function changed');
        this.m12 += vec.x;
        this.m13 += vec.y;
        this.m14 += vec.z;
        return this;
    }
    /**
     * @en Multiply the current matrix with a scale vector.
     * @zh 将当前矩阵左乘缩放矩阵的结果赋值给当前矩阵，缩放矩阵由各个轴的缩放给出。
     * @param vec vector to scale by
     */
    scale(vec) {
        const x = vec.x;
        const y = vec.y;
        const z = vec.z;
        this.m00 *= x;
        this.m01 *= x;
        this.m02 *= x;
        this.m03 *= x;
        this.m04 *= y;
        this.m05 *= y;
        this.m06 *= y;
        this.m07 *= y;
        this.m08 *= z;
        this.m09 *= z;
        this.m10 *= z;
        this.m11 *= z;
        return this;
    }
    /**
     * @en Rotates the current matrix by the given angle around the given axis
     * @zh 将当前矩阵左乘旋转矩阵的结果赋值给当前矩阵，旋转矩阵由旋转轴和旋转角度给出。
     * @param rad Angle of rotation (in radians)
     * @param axis Axis of rotation
     */
    rotate(rad, axis) {
        let x = axis.x;
        let y = axis.y;
        let z = axis.z;
        let len = Math.sqrt(x * x + y * y + z * z);
        if (Math.abs(len) < utils_1.EPSILON) {
            return null;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const t = 1 - c;
        const a00 = this.m00;
        const a01 = this.m01;
        const a02 = this.m02;
        const a03 = this.m03;
        const a10 = this.m04;
        const a11 = this.m05;
        const a12 = this.m06;
        const a13 = this.m07;
        const a20 = this.m08;
        const a21 = this.m09;
        const a22 = this.m10;
        const a23 = this.m11;
        // Construct the elements of the rotation matrix
        const b00 = x * x * t + c;
        const b01 = y * x * t + z * s;
        const b02 = z * x * t - y * s;
        const b10 = x * y * t - z * s;
        const b11 = y * y * t + c;
        const b12 = z * y * t + x * s;
        const b20 = x * z * t + y * s;
        const b21 = y * z * t - x * s;
        const b22 = z * z * t + c;
        // Perform rotation-specific matrix multiplication
        this.m00 = a00 * b00 + a10 * b01 + a20 * b02;
        this.m01 = a01 * b00 + a11 * b01 + a21 * b02;
        this.m02 = a02 * b00 + a12 * b01 + a22 * b02;
        this.m03 = a03 * b00 + a13 * b01 + a23 * b02;
        this.m04 = a00 * b10 + a10 * b11 + a20 * b12;
        this.m05 = a01 * b10 + a11 * b11 + a21 * b12;
        this.m06 = a02 * b10 + a12 * b11 + a22 * b12;
        this.m07 = a03 * b10 + a13 * b11 + a23 * b12;
        this.m08 = a00 * b20 + a10 * b21 + a20 * b22;
        this.m09 = a01 * b20 + a11 * b21 + a21 * b22;
        this.m10 = a02 * b20 + a12 * b21 + a22 * b22;
        this.m11 = a03 * b20 + a13 * b21 + a23 * b22;
        return this;
    }
    /**
     * @en Returns the translation vector component of a transformation matrix.
     * @zh 从当前矩阵中计算出位移变换的部分，并以各个轴上位移的形式赋值给出口向量。
     * @param out Vector to receive translation component.
     */
    getTranslation(out) {
        out.x = this.m12;
        out.y = this.m13;
        out.z = this.m14;
        return out;
    }
    /**
     * @en Returns the scale factor component of a transformation matrix
     * @zh 从当前矩阵中计算出缩放变换的部分，并以各个轴上缩放的形式赋值给出口向量。
     * @param out Vector to receive scale component
     */
    getScale(out) {
        const m00 = m3_1.m00 = this.m00;
        const m01 = m3_1.m01 = this.m01;
        const m02 = m3_1.m02 = this.m02;
        const m04 = m3_1.m03 = this.m04;
        const m05 = m3_1.m04 = this.m05;
        const m06 = m3_1.m05 = this.m06;
        const m08 = m3_1.m06 = this.m08;
        const m09 = m3_1.m07 = this.m09;
        const m10 = m3_1.m08 = this.m10;
        out.x = Math.sqrt(m00 * m00 + m01 * m01 + m02 * m02);
        out.y = Math.sqrt(m04 * m04 + m05 * m05 + m06 * m06);
        out.z = Math.sqrt(m08 * m08 + m09 * m09 + m10 * m10);
        // account for refections
        if (Mat3_1.Mat3.determinant(m3_1) < 0) {
            out.x *= -1;
        }
        return out;
    }
    /**
     * @en Returns the rotation factor component of a transformation matrix
     * @zh 从当前矩阵中计算出旋转变换的部分，并以四元数的形式赋值给出口四元数。
     * @param out Vector to receive rotation component
     */
    getRotation(out) {
        const trace = this.m00 + this.m05 + this.m10;
        let S = 0;
        if (trace > 0) {
            S = Math.sqrt(trace + 1.0) * 2;
            out.w = 0.25 * S;
            out.x = (this.m06 - this.m09) / S;
            out.y = (this.m08 - this.m02) / S;
            out.z = (this.m01 - this.m04) / S;
        }
        else if ((this.m00 > this.m05) && (this.m00 > this.m10)) {
            S = Math.sqrt(1.0 + this.m00 - this.m05 - this.m10) * 2;
            out.w = (this.m06 - this.m09) / S;
            out.x = 0.25 * S;
            out.y = (this.m01 + this.m04) / S;
            out.z = (this.m08 + this.m02) / S;
        }
        else if (this.m05 > this.m10) {
            S = Math.sqrt(1.0 + this.m05 - this.m00 - this.m10) * 2;
            out.w = (this.m08 - this.m02) / S;
            out.x = (this.m01 + this.m04) / S;
            out.y = 0.25 * S;
            out.z = (this.m06 + this.m09) / S;
        }
        else {
            S = Math.sqrt(1.0 + this.m10 - this.m00 - this.m05) * 2;
            out.w = (this.m01 - this.m04) / S;
            out.x = (this.m08 + this.m02) / S;
            out.y = (this.m06 + this.m09) / S;
            out.z = 0.25 * S;
        }
        return out;
    }
    /**
     * @en Resets the matrix values by the given rotation quaternion, translation vector and scale vector
     * @zh 重置当前矩阵的值，使其表示指定的旋转、缩放、位移依次组合的变换。
     * @param q Rotation quaternion
     * @param v Translation vector
     * @param s Scaling vector
     * @return `this`
     */
    fromRTS(q, v, s) {
        const x = q.x;
        const y = q.y;
        const z = q.z;
        const w = q.w;
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const xy = x * y2;
        const xz = x * z2;
        const yy = y * y2;
        const yz = y * z2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        const sx = s.x;
        const sy = s.y;
        const sz = s.z;
        this.m00 = (1 - (yy + zz)) * sx;
        this.m01 = (xy + wz) * sx;
        this.m02 = (xz - wy) * sx;
        this.m03 = 0;
        this.m04 = (xy - wz) * sy;
        this.m05 = (1 - (xx + zz)) * sy;
        this.m06 = (yz + wx) * sy;
        this.m07 = 0;
        this.m08 = (xz + wy) * sz;
        this.m09 = (yz - wx) * sz;
        this.m10 = (1 - (xx + yy)) * sz;
        this.m11 = 0;
        this.m12 = v.x;
        this.m13 = v.y;
        this.m14 = v.z;
        this.m15 = 1;
        return this;
    }
    /**
     * @en Resets the current matrix from the given quaternion.
     * @zh 重置当前矩阵的值，使其表示指定四元数表示的旋转变换。
     * @param q Rotation quaternion
     * @return `this`
     */
    fromQuat(q) {
        const x = q.x;
        const y = q.y;
        const z = q.z;
        const w = q.w;
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const yx = y * x2;
        const yy = y * y2;
        const zx = z * x2;
        const zy = z * y2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        this.m00 = 1 - yy - zz;
        this.m01 = yx + wz;
        this.m02 = zx - wy;
        this.m03 = 0;
        this.m04 = yx - wz;
        this.m05 = 1 - xx - zz;
        this.m06 = zy + wx;
        this.m07 = 0;
        this.m08 = zx + wy;
        this.m09 = zy - wx;
        this.m10 = 1 - xx - yy;
        this.m11 = 0;
        this.m12 = 0;
        this.m13 = 0;
        this.m14 = 0;
        this.m15 = 1;
        return this;
    }
}
exports.Mat4 = Mat4;
Mat4.IDENTITY = Object.freeze(new Mat4());
const v3_1 = new Vec3_1.Vec3();
const m3_1 = new Mat3_1.Mat3();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0NC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlscy9NYXRocy9NYXQ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUE4QjtBQUM5QixpQ0FBOEI7QUFFOUIsbUNBQWtDO0FBQ2xDLGlDQUE4QjtBQUVqQixRQUFBLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLENBQUMsQ0FBQztJQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRyxDQUFDLENBQUMsQ0FBQztJQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ2pDLENBQUMsQ0FBQztBQUVIOzs7R0FHRztBQUVILE1BQWEsSUFBSTtJQXE3Q2IsWUFDSSxNQUFxQixDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQ2pELEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQ2xDLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQ2xDLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBRWxDLFVBQVU7UUFDVixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUN6QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDL0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQy9FLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUMvRSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDbEY7YUFBTTtZQUNILElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLElB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RUFBRSxHQUFXLEVBQUUsR0FBVyxFQUNsRCxHQUFXLEVBQUUsR0FBVyxFQUFFLEdBQVcsRUFBRSxHQUFXLEVBQ2xELEdBQVcsRUFBRSxHQUFXLEVBQUUsR0FBVyxFQUFFLEdBQVc7UUFFbEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDM0QsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDM0QsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDM0QsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDM0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBMEIsR0FBUTtRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQTBCLEdBQVEsRUFBRSxDQUFNO1FBQzdELHdGQUF3RjtRQUN4RixJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDWCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDakgsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDZCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2QsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDZCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDZCxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNkLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ2pCO2FBQU07WUFDSCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDbkI7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUEwQixHQUFRLEVBQUUsQ0FBTTtRQUMxRCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQzNFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDM0UsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMzRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRTNFLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWxDLDRCQUE0QjtRQUM1QixJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVoRixJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDWCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNuRCxPQUFPLEdBQUcsQ0FBQztTQUNkO1FBQ0QsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFFaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRXBELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxXQUFXLENBQTBCLENBQU07UUFDckQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMzRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQzNFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDM0UsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUUzRSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVsQyw0QkFBNEI7UUFDNUIsT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFNO1FBQ3BFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDM0UsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMzRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQzNFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFFM0UsbURBQW1EO1FBQ25ELElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDL0QsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBRXBELEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQy9DLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUVwRCxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMvQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFFcEQsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDL0MsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3BELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQXFELEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBVTtRQUNwRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFO1lBQ1gsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQ3ZEO2FBQU07WUFDSCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQzNFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDM0UsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUMzRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBRTNFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQzNELEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQzNELEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBRTNELEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUM5QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxH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QUMsR0FBRyxDQUFDLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV4RixrREFBa0Q7UUFDbEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFFNUMsb0VBQW9FO1FBQ3BFLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUNYLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FB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QUMsQ0FBQyxHQUFHLENBQUM7UUFDbEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNsQixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDbEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNsQixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFFbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsZ0VBQWdFO1lBQzdFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDbkI7UUFFRCw4Q0FBOEM7UUFDOUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFNUIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsR0FBVztRQUN4RSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNsQixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDbEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNsQixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDbEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNsQixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRWxCLG9FQUFvRTtRQUNwRSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDWCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQ25CO1FBRUQsOENBQThDO1FBQzlDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdB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QyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLGFBQWEsQ0FBMEIsR0FBUSxFQUFFLEdBQVc7UUFDdEUsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakQsOENBQThDO1FBQzlDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2IsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsYUFBYSxDQUEwQixHQUFRLEVBQUUsR0FBVztRQUN0RSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqRCw4Q0FBOEM7UUFDOUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2IsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQXFELEdBQVEsRUFBRSxDQUFPLEVBQUUsQ0FBVTtRQUNsRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNsQixHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDbEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDbEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxD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QUFHLElBQUksR0FBRyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25DO2FBQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDMUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0gsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUNwQjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQXFELENBQU0sRUFBRSxDQUFPLEVBQUUsQ0FBVSxFQUFFLENBQVU7UUFDM0csQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsTUFBTSxHQUFHLEdBQUcsV0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFDM0UsV0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxxQkFBcUI7UUFDN0MsV0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBcUQsR0FBUSxFQUFFLENB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ZixNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWYsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDL0IsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDekIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDbEUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDbEUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDbEUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFWixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUEwQixHQUFRLEVBQUUsQ0FBTztRQUM3RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDdEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNsQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUVaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNsQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNsQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUVaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNsQixHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDbEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUN0QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUVaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcs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UUFDOUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNiLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FDZixHQUFRLEVBQUUsSUFBWSxFQUFFLEtBQWEsRUFBRSxNQUFjLEVBQUUsR0FBVyxFQUFFLElBQVksRUFBRSxHQUFXLEVBQzdGLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxlQUFlLEdBQUcsQ0FBQyxFQUFFLFdBQVcsR0FBRyxDQUFDO1FBRW5ELE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMs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LENBQUM7UUFDM0UsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMzRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQzNFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFFM0UsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFFbEMsNEJBQTRCO1FBQzVCLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWhGLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDTixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFFaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUVaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRVosR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFWixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBUSxHQUFRLEVBQUUsQ0FBWSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3hELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDckIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDckIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDckIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDdEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN0QixHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDdEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN0QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBMEIsR0FBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNuRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDeEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDeEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFNO1FBQy9ELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTTtRQUNwRSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQVM7UUFDN0UsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsb0JBQW9CLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTSxFQUFFLEtBQWE7UUFDL0YsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNsQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDbEMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNsQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDbEMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNsQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDbEMsR0FB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QUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUMxRixDQUFDO0lBQ04sQ0FBQztJQThIRDs7O09BR0c7SUFDSSxLQUFLO1FBQ1IsT0FBTyxJQUFJLElBQUksQ0FDWCxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUN0QyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUN0QyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUN0QyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUN6QyxDQUFDO0lBQ04sQ0FBQztJQXFCTSxHQUFHLENBQUUsTUFBcUIsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUN6RCxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUNsQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUNsQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNsQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUN6QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDL0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQy9FLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUMvRSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDbEY7YUFBTTtZQUNILElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQy9ELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQy9ELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQy9ELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ2xFO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBRSxLQUFXLEVBQUUsT0FBTyxHQUFHLGVBQU87UUFDekMsT0FBTyxDQUNILElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQy9GLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3hHLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxZQUFZLENBQUUsS0FBVztRQUM1QixPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUc7ZUFDcEcsSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRztlQUNwRyxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHO2VBQ3BHLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNoSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFFBQVE7UUFDWCxPQUFPLE1BQ0gsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFDL0MsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFDL0MsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFDL0MsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSTtjQUNqRCxHQUFHLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFFBQVE7UUFDWCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksSUFBSTtRQUNQLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFNBQVM7UUFDWixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDVCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3ZGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdkYsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN2RixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBRXZGLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWxDLDRCQUE0QjtRQUM1QixJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVoRixJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pELE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVoQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFckQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxXQUFXO1FBQ2QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN2RixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3ZGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdkYsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUV2RixNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVsQyw0QkFBNEI7UUFDNUIsT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEdBQUcsQ0FBRSxHQUFTO1FBQ2pCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFFBQVEsQ0FBRSxHQUFTO1FBQ3RCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFFBQVEsQ0FBRSxHQUFTO1FBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdkYsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN2RixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3ZGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFdkYsbURBQW1EO1FBQ25ELElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQUMsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDdkUsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBRXJELEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUVyRCxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUN2RCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFFckQsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDdkQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksY0FBYyxDQUFFLE1BQWM7UUFDakMsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxTQUFTLENBQUUsR0FBUztRQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUUsR0FBUztRQUNuQixNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFFLEdBQVcsRUFBRSxJQUFVO1FBQ2xDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUUvQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFM0MsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGVBQU8sRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDZCxDQUFDLElBQUksR0FBRyxDQUFDO1FBQ1QsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNULENBQUMsSUFBSSxHQUFHLENBQUM7UUFFVCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVoQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3ZGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdkYsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUV2RixnREFBZ0Q7UUFDaEQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEYsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEYsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEYsa0RBQWtEO1FBQ2xELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFH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QUcsQ0FBQyxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQzthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZELENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4RCxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNqQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckM7YUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUM1QixDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENB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QUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRWIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRWIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRWIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFYixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOztBQW5qRUwsb0JBb2pFQztBQW5qRWlCLGFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztBQXFqRXZELE1BQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7QUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hdDMgfSBmcm9tIFwiLi9NYXQzXCI7XHJcbmltcG9ydCB7IFF1YXQgfSBmcm9tIFwiLi9RdWF0XCI7XHJcbmltcG9ydCB7IElNYXQ0TGlrZSwgSVZlYzNMaWtlIH0gZnJvbSBcIi4vdHlwZS1kZWZpbmVcIjtcclxuaW1wb3J0IHsgRVBTSUxPTiB9IGZyb20gXCIuL3V0aWxzXCI7XHJcbmltcG9ydCB7IFZlYzMgfSBmcm9tIFwiLi9WZWMzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgcHJlVHJhbnNmb3JtcyA9IE9iamVjdC5mcmVlemUoW1xyXG4gICAgT2JqZWN0LmZyZWV6ZShbMSwgIDAsICAwLCAgMV0pLCAvLyBTdXJmYWNlVHJhbnNmb3JtLklERU5USVRZXHJcbiAgICBPYmplY3QuZnJlZXplKFswLCAgMSwgLTEsICAwXSksIC8vIFN1cmZhY2VUcmFuc2Zvcm0uUk9UQVRFXzkwXHJcbiAgICBPYmplY3QuZnJlZXplKFstMSwgIDAsICAwLCAtMV0pLCAvLyBTdXJmYWNlVHJhbnNmb3JtLlJPVEFURV8xODBcclxuICAgIE9iamVjdC5mcmVlemUoWzAsIC0xLCAgMSwgIDBdKSwgLy8gU3VyZmFjZVRyYW5zZm9ybS5ST1RBVEVfMjcwXHJcbl0pO1xyXG5cclxuLyoqXHJcbiAqIEBlbiBNYXRoZW1hdGljYWwgNHg0IG1hdHJpeC5cclxuICogQHpoIOihqOekuuWbm+e7tO+8iDR4NO+8ieefqemYteOAglxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBNYXQ0IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgSURFTlRJVFkgPSBPYmplY3QuZnJlZXplKG5ldyBNYXQ0KCkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENsb25lIGEgbWF0cml4IGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXhcclxuICAgICAqIEB6aCDojrflvpfmjIflrprnn6npmLXnmoTmi7fotJ1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjbG9uZSA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAoYTogT3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXQ0KFxyXG4gICAgICAgICAgICBhLm0wMCwgYS5tMDEsIGEubTAyLCBhLm0wMyxcclxuICAgICAgICAgICAgYS5tMDQsIGEubTA1LCBhLm0wNiwgYS5tMDcsXHJcbiAgICAgICAgICAgIGEubTA4LCBhLm0wOSwgYS5tMTAsIGEubTExLFxyXG4gICAgICAgICAgICBhLm0xMiwgYS5tMTMsIGEubTE0LCBhLm0xNSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENvcHkgYSBtYXRyaXggaW50byB0aGUgb3V0IG1hdHJpeFxyXG4gICAgICogQHpoIOWkjeWItuebruagh+efqemYtVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvcHkgPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBvdXQubTAwID0gYS5tMDA7XHJcbiAgICAgICAgb3V0Lm0wMSA9IGEubTAxO1xyXG4gICAgICAgIG91dC5tMDIgPSBhLm0wMjtcclxuICAgICAgICBvdXQubTAzID0gYS5tMDM7XHJcbiAgICAgICAgb3V0Lm0wNCA9IGEubTA0O1xyXG4gICAgICAgIG91dC5tMDUgPSBhLm0wNTtcclxuICAgICAgICBvdXQubTA2ID0gYS5tMDY7XHJcbiAgICAgICAgb3V0Lm0wNyA9IGEubTA3O1xyXG4gICAgICAgIG91dC5tMDggPSBhLm0wODtcclxuICAgICAgICBvdXQubTA5ID0gYS5tMDk7XHJcbiAgICAgICAgb3V0Lm0xMCA9IGEubTEwO1xyXG4gICAgICAgIG91dC5tMTEgPSBhLm0xMTtcclxuICAgICAgICBvdXQubTEyID0gYS5tMTI7XHJcbiAgICAgICAgb3V0Lm0xMyA9IGEubTEzO1xyXG4gICAgICAgIG91dC5tMTQgPSBhLm0xNDtcclxuICAgICAgICBvdXQubTE1ID0gYS5tMTU7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIGEgbWF0cml4IHdpdGggdGhlIGdpdmVuIHZhbHVlcyBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XHJcbiAgICAgKiBAemgg6K6+572u55+p6Zi15YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0IDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+ICAoXHJcbiAgICAgICAgb3V0OiBPdXQsXHJcbiAgICAgICAgbTAwOiBudW1iZXIsIG0wMTogbnVtYmVyLCBtMDI6IG51bWJlciwgbTAzOiBudW1iZXIsXHJcbiAgICAgICAgbTEwOiBudW1iZXIsIG0xMTogbnVtYmVyLCBtMTI6IG51bWJlciwgbTEzOiBudW1iZXIsXHJcbiAgICAgICAgbTIwOiBudW1iZXIsIG0yMTogbnVtYmVyLCBtMjI6IG51bWJlciwgbTIzOiBudW1iZXIsXHJcbiAgICAgICAgbTMwOiBudW1iZXIsIG0zMTogbnVtYmVyLCBtMzI6IG51bWJlciwgbTMzOiBudW1iZXIsXHJcbiAgICApIHtcclxuICAgICAgICBvdXQubTAwID0gbTAwOyBvdXQubTAxID0gbTAxOyBvdXQubTAyID0gbTAyOyBvdXQubTAzID0gbTAzO1xyXG4gICAgICAgIG91dC5tMDQgPSBtMTA7IG91dC5tMDUgPSBtMTE7IG91dC5tMDYgPSBtMTI7IG91dC5tMDcgPSBtMTM7XHJcbiAgICAgICAgb3V0Lm0wOCA9IG0yMDsgb3V0Lm0wOSA9IG0yMTsgb3V0Lm0xMCA9IG0yMjsgb3V0Lm0xMSA9IG0yMztcclxuICAgICAgICBvdXQubTEyID0gbTMwOyBvdXQubTEzID0gbTMxOyBvdXQubTE0ID0gbTMyOyBvdXQubTE1ID0gbTMzO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gcmV0dXJuIGFuIGlkZW50aXR5IG1hdHJpeC5cclxuICAgICAqIEB6aCDlsIbnm67moIfotYvlgLzkuLrljZXkvY3nn6npmLVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpZGVudGl0eSA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQpIHtcclxuICAgICAgICBvdXQubTAwID0gMTtcclxuICAgICAgICBvdXQubTAxID0gMDtcclxuICAgICAgICBvdXQubTAyID0gMDtcclxuICAgICAgICBvdXQubTAzID0gMDtcclxuICAgICAgICBvdXQubTA0ID0gMDtcclxuICAgICAgICBvdXQubTA1ID0gMTtcclxuICAgICAgICBvdXQubTA2ID0gMDtcclxuICAgICAgICBvdXQubTA3ID0gMDtcclxuICAgICAgICBvdXQubTA4ID0gMDtcclxuICAgICAgICBvdXQubTA5ID0gMDtcclxuICAgICAgICBvdXQubTEwID0gMTtcclxuICAgICAgICBvdXQubTExID0gMDtcclxuICAgICAgICBvdXQubTEyID0gMDtcclxuICAgICAgICBvdXQubTEzID0gMDtcclxuICAgICAgICBvdXQubTE0ID0gMDtcclxuICAgICAgICBvdXQubTE1ID0gMTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFRyYW5zcG9zZXMgYSBtYXRyaXggYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IG1hdHJpeFxyXG4gICAgICogQHpoIOi9rOe9ruefqemYtVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRyYW5zcG9zZSA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcclxuICAgICAgICBpZiAob3V0ID09PSBhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGEwMSA9IGEubTAxOyBjb25zdCBhMDIgPSBhLm0wMjsgY29uc3QgYTAzID0gYS5tMDM7IGNvbnN0IGExMiA9IGEubTA2OyBjb25zdCBhMTMgPSBhLm0wNzsgY29uc3QgYTIzID0gYS5tMTE7XHJcbiAgICAgICAgICAgIG91dC5tMDEgPSBhLm0wNDtcclxuICAgICAgICAgICAgb3V0Lm0wMiA9IGEubTA4O1xyXG4gICAgICAgICAgICBvdXQubTAzID0gYS5tMTI7XHJcbiAgICAgICAgICAgIG91dC5tMDQgPSBhMDE7XHJcbiAgICAgICAgICAgIG91dC5tMDYgPSBhLm0wOTtcclxuICAgICAgICAgICAgb3V0Lm0wNyA9IGEubTEzO1xyXG4gICAgICAgICAgICBvdXQubTA4ID0gYTAyO1xyXG4gICAgICAgICAgICBvdXQubTA5ID0gYTEyO1xyXG4gICAgICAgICAgICBvdXQubTExID0gYS5tMTQ7XHJcbiAgICAgICAgICAgIG91dC5tMTIgPSBhMDM7XHJcbiAgICAgICAgICAgIG91dC5tMTMgPSBhMTM7XHJcbiAgICAgICAgICAgIG91dC5tMTQgPSBhMjM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0Lm0wMCA9IGEubTAwO1xyXG4gICAgICAgICAgICBvdXQubTAxID0gYS5tMDQ7XHJcbiAgICAgICAgICAgIG91dC5tMDIgPSBhLm0wODtcclxuICAgICAgICAgICAgb3V0Lm0wMyA9IGEubTEyO1xyXG4gICAgICAgICAgICBvdXQubTA0ID0gYS5tMDE7XHJcbiAgICAgICAgICAgIG91dC5tMDUgPSBhLm0wNTtcclxuICAgICAgICAgICAgb3V0Lm0wNiA9IGEubTA5O1xyXG4gICAgICAgICAgICBvdXQubTA3ID0gYS5tMTM7XHJcbiAgICAgICAgICAgIG91dC5tMDggPSBhLm0wMjtcclxuICAgICAgICAgICAgb3V0Lm0wOSA9IGEubTA2O1xyXG4gICAgICAgICAgICBvdXQubTEwID0gYS5tMTA7XHJcbiAgICAgICAgICAgIG91dC5tMTEgPSBhLm0xNDtcclxuICAgICAgICAgICAgb3V0Lm0xMiA9IGEubTAzO1xyXG4gICAgICAgICAgICBvdXQubTEzID0gYS5tMDc7XHJcbiAgICAgICAgICAgIG91dC5tMTQgPSBhLm0xMTtcclxuICAgICAgICAgICAgb3V0Lm0xNSA9IGEubTE1O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEludmVydHMgYSBtYXRyaXguIFdoZW4gbWF0cml4IGlzIG5vdCBpbnZlcnRpYmxlIHRoZSBtYXRyaXggd2lsbCBiZSBzZXQgdG8gemVyb3MuXHJcbiAgICAgKiBAemgg55+p6Zi15rGC6YCG77yM5rOo5oSP77yM5Zyo55+p6Zi15LiN5Y+v6YCG5pe277yM5Lya6L+U5Zue5LiA5Liq5YWo5Li6IDAg55qE55+p6Zi144CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaW52ZXJ0IDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgY29uc3QgYTAwID0gYS5tMDA7IGNvbnN0IGEwMSA9IGEubTAxOyBjb25zdCBhMDIgPSBhLm0wMjsgY29uc3QgYTAzID0gYS5tMDM7XHJcbiAgICAgICAgY29uc3QgYTEwID0gYS5tMDQ7IGNvbnN0IGExMSA9IGEubTA1OyBjb25zdCBhMTIgPSBhLm0wNjsgY29uc3QgYTEzID0gYS5tMDc7XHJcbiAgICAgICAgY29uc3QgYTIwID0gYS5tMDg7IGNvbnN0IGEyMSA9IGEubTA5OyBjb25zdCBhMjIgPSBhLm0xMDsgY29uc3QgYTIzID0gYS5tMTE7XHJcbiAgICAgICAgY29uc3QgYTMwID0gYS5tMTI7IGNvbnN0IGEzMSA9IGEubTEzOyBjb25zdCBhMzIgPSBhLm0xNDsgY29uc3QgYTMzID0gYS5tMTU7XHJcblxyXG4gICAgICAgIGNvbnN0IGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMDtcclxuICAgICAgICBjb25zdCBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XHJcbiAgICAgICAgY29uc3QgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwO1xyXG4gICAgICAgIGNvbnN0IGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMTtcclxuICAgICAgICBjb25zdCBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XHJcbiAgICAgICAgY29uc3QgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyO1xyXG4gICAgICAgIGNvbnN0IGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMDtcclxuICAgICAgICBjb25zdCBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XHJcbiAgICAgICAgY29uc3QgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwO1xyXG4gICAgICAgIGNvbnN0IGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMTtcclxuICAgICAgICBjb25zdCBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XHJcbiAgICAgICAgY29uc3QgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XHJcbiAgICAgICAgbGV0IGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcclxuXHJcbiAgICAgICAgaWYgKGRldCA9PT0gMCkge1xyXG4gICAgICAgICAgICBvdXQubTAwID0gMDsgb3V0Lm0wMSA9IDA7IG91dC5tMDIgPSAwOyBvdXQubTAzID0gMDtcclxuICAgICAgICAgICAgb3V0Lm0wNCA9IDA7IG91dC5tMDUgPSAwOyBvdXQubTA2ID0gMDsgb3V0Lm0wNyA9IDA7XHJcbiAgICAgICAgICAgIG91dC5tMDggPSAwOyBvdXQubTA5ID0gMDsgb3V0Lm0xMCA9IDA7IG91dC5tMTEgPSAwO1xyXG4gICAgICAgICAgICBvdXQubTEyID0gMDsgb3V0Lm0xMyA9IDA7IG91dC5tMTQgPSAwOyBvdXQubTE1ID0gMDtcclxuICAgICAgICAgICAgcmV0dXJuIG91dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGV0ID0gMS4wIC8gZGV0O1xyXG5cclxuICAgICAgICBvdXQubTAwID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XHJcbiAgICAgICAgb3V0Lm0wMSA9IChhMDIgKiBiMTAgLSBhMDEgKiBiMTEgLSBhMDMgKiBiMDkpICogZGV0O1xyXG4gICAgICAgIG91dC5tMDIgPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcclxuICAgICAgICBvdXQubTAzID0gKGEyMiAqIGIwNCAtIGEyMSAqIGIwNSAtIGEyMyAqIGIwMykgKiBkZXQ7XHJcbiAgICAgICAgb3V0Lm0wNCA9IChhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcpICogZGV0O1xyXG4gICAgICAgIG91dC5tMDUgPSAoYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3KSAqIGRldDtcclxuICAgICAgICBvdXQubTA2ID0gKGEzMiAqIGIwMiAtIGEzMCAqIGIwNSAtIGEzMyAqIGIwMSkgKiBkZXQ7XHJcbiAgICAgICAgb3V0Lm0wNyA9IChhMjAgKiBiMDUgLSBhMjIgKiBiMDIgKyBhMjMgKiBiMDEpICogZGV0O1xyXG4gICAgICAgIG91dC5tMDggPSAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldDtcclxuICAgICAgICBvdXQubTA5ID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XHJcbiAgICAgICAgb3V0Lm0xMCA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xyXG4gICAgICAgIG91dC5tMTEgPSAoYTIxICogYjAyIC0gYTIwICogYjA0IC0gYTIzICogYjAwKSAqIGRldDtcclxuICAgICAgICBvdXQubTEyID0gKGExMSAqIGIwNyAtIGExMCAqIGIwOSAtIGExMiAqIGIwNikgKiBkZXQ7XHJcbiAgICAgICAgb3V0Lm0xMyA9IChhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDYpICogZGV0O1xyXG4gICAgICAgIG91dC5tMTQgPSAoYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwKSAqIGRldDtcclxuICAgICAgICBvdXQubTE1ID0gKGEyMCAqIGIwMyAtIGEyMSAqIGIwMSArIGEyMiAqIGIwMCkgKiBkZXQ7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXRyaXhcclxuICAgICAqIEB6aCDnn6npmLXooYzliJflvI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkZXRlcm1pbmFudCA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAoYTogT3V0KTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBhMDAgPSBhLm0wMDsgY29uc3QgYTAxID0gYS5tMDE7IGNvbnN0IGEwMiA9IGEubTAyOyBjb25zdCBhMDMgPSBhLm0wMztcclxuICAgICAgICBjb25zdCBhMTAgPSBhLm0wNDsgY29uc3QgYTExID0gYS5tMDU7IGNvbnN0IGExMiA9IGEubTA2OyBjb25zdCBhMTMgPSBhLm0wNztcclxuICAgICAgICBjb25zdCBhMjAgPSBhLm0wODsgY29uc3QgYTIxID0gYS5tMDk7IGNvbnN0IGEyMiA9IGEubTEwOyBjb25zdCBhMjMgPSBhLm0xMTtcclxuICAgICAgICBjb25zdCBhMzAgPSBhLm0xMjsgY29uc3QgYTMxID0gYS5tMTM7IGNvbnN0IGEzMiA9IGEubTE0OyBjb25zdCBhMzMgPSBhLm0xNTtcclxuXHJcbiAgICAgICAgY29uc3QgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xyXG4gICAgICAgIGNvbnN0IGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMDtcclxuICAgICAgICBjb25zdCBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTA7XHJcbiAgICAgICAgY29uc3QgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xyXG4gICAgICAgIGNvbnN0IGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMTtcclxuICAgICAgICBjb25zdCBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTI7XHJcbiAgICAgICAgY29uc3QgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xyXG4gICAgICAgIGNvbnN0IGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMDtcclxuICAgICAgICBjb25zdCBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzA7XHJcbiAgICAgICAgY29uc3QgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xyXG4gICAgICAgIGNvbnN0IGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMTtcclxuICAgICAgICBjb25zdCBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcclxuICAgICAgICByZXR1cm4gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIE11bHRpcGx5IHR3byBtYXRyaWNlcyBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XHJcbiAgICAgKiBAemgg55+p6Zi15LmY5rOVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbXVsdGlwbHkgPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIGNvbnN0IGEwMCA9IGEubTAwOyBjb25zdCBhMDEgPSBhLm0wMTsgY29uc3QgYTAyID0gYS5tMDI7IGNvbnN0IGEwMyA9IGEubTAzO1xyXG4gICAgICAgIGNvbnN0IGExMCA9IGEubTA0OyBjb25zdCBhMTEgPSBhLm0wNTsgY29uc3QgYTEyID0gYS5tMDY7IGNvbnN0IGExMyA9IGEubTA3O1xyXG4gICAgICAgIGNvbnN0IGEyMCA9IGEubTA4OyBjb25zdCBhMjEgPSBhLm0wOTsgY29uc3QgYTIyID0gYS5tMTA7IGNvbnN0IGEyMyA9IGEubTExO1xyXG4gICAgICAgIGNvbnN0IGEzMCA9IGEubTEyOyBjb25zdCBhMzEgPSBhLm0xMzsgY29uc3QgYTMyID0gYS5tMTQ7IGNvbnN0IGEzMyA9IGEubTE1O1xyXG5cclxuICAgICAgICAvLyBDYWNoZSBvbmx5IHRoZSBjdXJyZW50IGxpbmUgb2YgdGhlIHNlY29uZCBtYXRyaXhcclxuICAgICAgICBsZXQgYjAgPSBiLm0wMDsgbGV0IGIxID0gYi5tMDE7IGxldCBiMiA9IGIubTAyOyBsZXQgYjMgPSBiLm0wMztcclxuICAgICAgICBvdXQubTAwID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XHJcbiAgICAgICAgb3V0Lm0wMSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xyXG4gICAgICAgIG91dC5tMDIgPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcclxuICAgICAgICBvdXQubTAzID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XHJcblxyXG4gICAgICAgIGIwID0gYi5tMDQ7IGIxID0gYi5tMDU7IGIyID0gYi5tMDY7IGIzID0gYi5tMDc7XHJcbiAgICAgICAgb3V0Lm0wNCA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xyXG4gICAgICAgIG91dC5tMDUgPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcclxuICAgICAgICBvdXQubTA2ID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XHJcbiAgICAgICAgb3V0Lm0wNyA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xyXG5cclxuICAgICAgICBiMCA9IGIubTA4OyBiMSA9IGIubTA5OyBiMiA9IGIubTEwOyBiMyA9IGIubTExO1xyXG4gICAgICAgIG91dC5tMDggPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcclxuICAgICAgICBvdXQubTA5ID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XHJcbiAgICAgICAgb3V0Lm0xMCA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xyXG4gICAgICAgIG91dC5tMTEgPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcclxuXHJcbiAgICAgICAgYjAgPSBiLm0xMjsgYjEgPSBiLm0xMzsgYjIgPSBiLm0xNDsgYjMgPSBiLm0xNTtcclxuICAgICAgICBvdXQubTEyID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XHJcbiAgICAgICAgb3V0Lm0xMyA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xyXG4gICAgICAgIG91dC5tMTQgPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcclxuICAgICAgICBvdXQubTE1ID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBUcmFuc2Zvcm0gYSBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gdmVjdG9yIGFuZCBzYXZlIHJlc3VsdHMgdG8gdGhlIG91dCBtYXRyaXhcclxuICAgICAqIEB6aCDlnKjnu5nlrprnn6npmLXlj5jmjaLln7rnoYDkuIrliqDlhaXlj5jmjaJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2Zvcm0gPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHY6IFZlY0xpa2UpIHtcclxuICAgICAgICBjb25zdCB4ID0gdi54OyBjb25zdCB5ID0gdi55OyBjb25zdCB6ID0gdi56O1xyXG4gICAgICAgIGlmIChhID09PSBvdXQpIHtcclxuICAgICAgICAgICAgb3V0Lm0xMiA9IGEubTAwICogeCArIGEubTA0ICogeSArIGEubTA4ICogeiArIGEubTEyO1xyXG4gICAgICAgICAgICBvdXQubTEzID0gYS5tMDEgKiB4ICsgYS5tMDUgKiB5ICsgYS5tMDkgKiB6ICsgYS5tMTM7XHJcbiAgICAgICAgICAgIG91dC5tMTQgPSBhLm0wMiAqIHggKyBhLm0wNiAqIHkgKyBhLm0xMCAqIHogKyBhLm0xNDtcclxuICAgICAgICAgICAgb3V0Lm0xNSA9IGEubTAzICogeCArIGEubTA3ICogeSArIGEubTExICogeiArIGEubTE1O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGEwMCA9IGEubTAwOyBjb25zdCBhMDEgPSBhLm0wMTsgY29uc3QgYTAyID0gYS5tMDI7IGNvbnN0IGEwMyA9IGEubTAzO1xyXG4gICAgICAgICAgICBjb25zdCBhMTAgPSBhLm0wNDsgY29uc3QgYTExID0gYS5tMDU7IGNvbnN0IGExMiA9IGEubTA2OyBjb25zdCBhMTMgPSBhLm0wNztcclxuICAgICAgICAgICAgY29uc3QgYTIwID0gYS5tMDg7IGNvbnN0IGEyMSA9IGEubTA5OyBjb25zdCBhMjIgPSBhLm0xMDsgY29uc3QgYTIzID0gYS5tMTE7XHJcbiAgICAgICAgICAgIGNvbnN0IGEzMCA9IGEubTEyOyBjb25zdCBhMzEgPSBhLm0xMzsgY29uc3QgYTMyID0gYS5tMTQ7IGNvbnN0IGEzMyA9IGEubTE1O1xyXG5cclxuICAgICAgICAgICAgb3V0Lm0wMCA9IGEwMDsgb3V0Lm0wMSA9IGEwMTsgb3V0Lm0wMiA9IGEwMjsgb3V0Lm0wMyA9IGEwMztcclxuICAgICAgICAgICAgb3V0Lm0wNCA9IGExMDsgb3V0Lm0wNSA9IGExMTsgb3V0Lm0wNiA9IGExMjsgb3V0Lm0wNyA9IGExMztcclxuICAgICAgICAgICAgb3V0Lm0wOCA9IGEyMDsgb3V0Lm0wOSA9IGEyMTsgb3V0Lm0xMCA9IGEyMjsgb3V0Lm0xMSA9IGEyMztcclxuXHJcbiAgICAgICAgICAgIG91dC5tMTIgPSBhMDAgKiB4ICsgYTEwICogeSArIGEyMCAqIHogKyBhLm0xMjtcclxuICAgICAgICAgICAgb3V0Lm0xMyA9IGEwMSAqIHggKyBhMTEgKiB5ICsgYTIxICogeiArIGEubTEzO1xyXG4gICAgICAgICAgICBvdXQubTE0ID0gYTAyICogeCArIGExMiAqIHkgKyBhMjIgKiB6ICsgYS5tMTQ7XHJcbiAgICAgICAgICAgIG91dC5tMTUgPSBhMDMgKiB4ICsgYTEzICogeSArIGEyMyAqIHogKyBhLm0xNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBUcmFuc2Zvcm0gYSBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gdHJhbnNsYXRpb24gdmVjdG9yIGFuZCBzYXZlIHJlc3VsdHMgdG8gdGhlIG91dCBtYXRyaXhcclxuICAgICAqIEB6aCDlnKjnu5nlrprnn6npmLXlj5jmjaLln7rnoYDkuIrliqDlhaXmlrDkvY3np7vlj5jmjaJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2xhdGUgPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHY6IFZlY0xpa2UpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ2Z1bmN0aW9uIGNoYW5nZWQnKTtcclxuICAgICAgICBpZiAoYSA9PT0gb3V0KSB7XHJcbiAgICAgICAgICAgIG91dC5tMTIgKz0gdi54O1xyXG4gICAgICAgICAgICBvdXQubTEzICs9IHYueTtcclxuICAgICAgICAgICAgb3V0Lm0xNCArPSB2Lno7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0Lm0wMCA9IGEubTAwOyBvdXQubTAxID0gYS5tMDE7IG91dC5tMDIgPSBhLm0wMjsgb3V0Lm0wMyA9IGEubTAzO1xyXG4gICAgICAgICAgICBvdXQubTA0ID0gYS5tMDQ7IG91dC5tMDUgPSBhLm0wNTsgb3V0Lm0wNiA9IGEubTA2OyBvdXQubTA3ID0gYS5tMDc7XHJcbiAgICAgICAgICAgIG91dC5tMDggPSBhLm0wODsgb3V0Lm0wOSA9IGEubTA5OyBvdXQubTEwID0gYS5tMTA7IG91dC5tMTEgPSBhLm0xMTtcclxuICAgICAgICAgICAgb3V0Lm0xMiArPSB2Lng7XHJcbiAgICAgICAgICAgIG91dC5tMTMgKz0gdi55O1xyXG4gICAgICAgICAgICBvdXQubTE0ICs9IHYuejtcclxuICAgICAgICAgICAgb3V0Lm0xNSA9IGEubTE1O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIE11bHRpcGx5IGEgbWF0cml4IHdpdGggYSBzY2FsZSBtYXRyaXggZ2l2ZW4gYnkgYSBzY2FsZSB2ZWN0b3IgYW5kIHNhdmUgdGhlIHJlc3VsdHMgaW50byB0aGUgb3V0IG1hdHJpeFxyXG4gICAgICogQHpoIOWcqOe7meWumuefqemYteWPmOaNouWfuuehgOS4iuWKoOWFpeaWsOe8qeaUvuWPmOaNolxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNjYWxlIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCB2OiBWZWNMaWtlKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHYueDsgY29uc3QgeSA9IHYueTsgY29uc3QgeiA9IHYuejtcclxuICAgICAgICBvdXQubTAwID0gYS5tMDAgKiB4O1xyXG4gICAgICAgIG91dC5tMDEgPSBhLm0wMSAqIHg7XHJcbiAgICAgICAgb3V0Lm0wMiA9IGEubTAyICogeDtcclxuICAgICAgICBvdXQubTAzID0gYS5tMDMgKiB4O1xyXG4gICAgICAgIG91dC5tMDQgPSBhLm0wNCAqIHk7XHJcbiAgICAgICAgb3V0Lm0wNSA9IGEubTA1ICogeTtcclxuICAgICAgICBvdXQubTA2ID0gYS5tMDYgKiB5O1xyXG4gICAgICAgIG91dC5tMDcgPSBhLm0wNyAqIHk7XHJcbiAgICAgICAgb3V0Lm0wOCA9IGEubTA4ICogejtcclxuICAgICAgICBvdXQubTA5ID0gYS5tMDkgKiB6O1xyXG4gICAgICAgIG91dC5tMTAgPSBhLm0xMCAqIHo7XHJcbiAgICAgICAgb3V0Lm0xMSA9IGEubTExICogejtcclxuICAgICAgICBvdXQubTEyID0gYS5tMTI7XHJcbiAgICAgICAgb3V0Lm0xMyA9IGEubTEzO1xyXG4gICAgICAgIG91dC5tMTQgPSBhLm0xNDtcclxuICAgICAgICBvdXQubTE1ID0gYS5tMTU7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBSb3RhdGVzIHRoZSB0cmFuc2Zvcm0gYnkgdGhlIGdpdmVuIGFuZ2xlIGFuZCBzYXZlIHRoZSByZXN1bHRzIGludG8gdGhlIG91dCBtYXRyaXhcclxuICAgICAqIEB6aCDlnKjnu5nlrprnn6npmLXlj5jmjaLln7rnoYDkuIrliqDlhaXmlrDml4vovazlj5jmjaJcclxuICAgICAqIEBwYXJhbSByYWQgQW5nbGUgb2Ygcm90YXRpb24gKGluIHJhZGlhbnMpXHJcbiAgICAgKiBAcGFyYW0gYXhpcyBheGlzIG9mIHJvdGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcm90YXRlIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlciwgYXhpczogVmVjTGlrZSkge1xyXG4gICAgICAgIGxldCB4ID0gYXhpcy54OyBsZXQgeSA9IGF4aXMueTsgbGV0IHogPSBheGlzLno7XHJcblxyXG4gICAgICAgIGxldCBsZW4gPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KTtcclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGxlbikgPCBFUFNJTE9OKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGVuID0gMSAvIGxlbjtcclxuICAgICAgICB4ICo9IGxlbjtcclxuICAgICAgICB5ICo9IGxlbjtcclxuICAgICAgICB6ICo9IGxlbjtcclxuXHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7XHJcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKHJhZCk7XHJcbiAgICAgICAgY29uc3QgdCA9IDEgLSBjO1xyXG5cclxuICAgICAgICBjb25zdCBhMDAgPSBhLm0wMDsgY29uc3QgYTAxID0gYS5tMDE7IGNvbnN0IGEwMiA9IGEubTAyOyBjb25zdCBhMDMgPSBhLm0wMztcclxuICAgICAgICBjb25zdCBhMTAgPSBhLm0wNDsgY29uc3QgYTExID0gYS5tMDU7IGNvbnN0IGExMiA9IGEubTA2OyBjb25zdCBhMTMgPSBhLm0wNztcclxuICAgICAgICBjb25zdCBhMjAgPSBhLm0wODsgY29uc3QgYTIxID0gYS5tMDk7IGNvbnN0IGEyMiA9IGEubTEwOyBjb25zdCBhMjMgPSBhLm0xMTtcclxuXHJcbiAgICAgICAgLy8gQ29uc3RydWN0IHRoZSBlbGVtZW50cyBvZiB0aGUgcm90YXRpb24gbWF0cml4XHJcbiAgICAgICAgY29uc3QgYjAwID0geCAqIHggKiB0ICsgYzsgY29uc3QgYjAxID0geSAqIHggKiB0ICsgeiAqIHM7IGNvbnN0IGIwMiA9IHogKiB4ICogdCAtIHkgKiBzO1xyXG4gICAgICAgIGNvbnN0IGIxMCA9IHggKiB5ICogdCAtIHogKiBzOyBjb25zdCBiMTEgPSB5ICogeSAqIHQgKyBjOyBjb25zdCBiMTIgPSB6ICogeSAqIHQgKyB4ICogcztcclxuICAgICAgICBjb25zdCBiMjAgPSB4ICogeiAqIHQgKyB5ICogczsgY29uc3QgYjIxID0geSAqIHogKiB0IC0geCAqIHM7IGNvbnN0IGIyMiA9IHogKiB6ICogdCArIGM7XHJcblxyXG4gICAgICAgIC8vIFBlcmZvcm0gcm90YXRpb24tc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXHJcbiAgICAgICAgb3V0Lm0wMCA9IGEwMCAqIGIwMCArIGExMCAqIGIwMSArIGEyMCAqIGIwMjtcclxuICAgICAgICBvdXQubTAxID0gYTAxICogYjAwICsgYTExICogYjAxICsgYTIxICogYjAyO1xyXG4gICAgICAgIG91dC5tMDIgPSBhMDIgKiBiMDAgKyBhMTIgKiBiMDEgKyBhMjIgKiBiMDI7XHJcbiAgICAgICAgb3V0Lm0wMyA9IGEwMyAqIGIwMCArIGExMyAqIGIwMSArIGEyMyAqIGIwMjtcclxuICAgICAgICBvdXQubTA0ID0gYTAwICogYjEwICsgYTEwICogYjExICsgYTIwICogYjEyO1xyXG4gICAgICAgIG91dC5tMDUgPSBhMDEgKiBiMTAgKyBhMTEgKiBiMTEgKyBhMjEgKiBiMTI7XHJcbiAgICAgICAgb3V0Lm0wNiA9IGEwMiAqIGIxMCArIGExMiAqIGIxMSArIGEyMiAqIGIxMjtcclxuICAgICAgICBvdXQubTA3ID0gYTAzICogYjEwICsgYTEzICogYjExICsgYTIzICogYjEyO1xyXG4gICAgICAgIG91dC5tMDggPSBhMDAgKiBiMjAgKyBhMTAgKiBiMjEgKyBhMjAgKiBiMjI7XHJcbiAgICAgICAgb3V0Lm0wOSA9IGEwMSAqIGIyMCArIGExMSAqIGIyMSArIGEyMSAqIGIyMjtcclxuICAgICAgICBvdXQubTEwID0gYTAyICogYjIwICsgYTEyICogYjIxICsgYTIyICogYjIyO1xyXG4gICAgICAgIG91dC5tMTEgPSBhMDMgKiBiMjAgKyBhMTMgKiBiMjEgKyBhMjMgKiBiMjI7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XHJcbiAgICAgICAgaWYgKGEgIT09IG91dCkge1xyXG4gICAgICAgICAgICBvdXQubTEyID0gYS5tMTI7XHJcbiAgICAgICAgICAgIG91dC5tMTMgPSBhLm0xMztcclxuICAgICAgICAgICAgb3V0Lm0xNCA9IGEubTE0O1xyXG4gICAgICAgICAgICBvdXQubTE1ID0gYS5tMTU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFRyYW5zZm9ybSBhIG1hdHJpeCB3aXRoIGEgZ2l2ZW4gYW5nbGUgYXJvdW5kIFggYXhpcyBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byB0aGUgb3V0IG1hdHJpeFxyXG4gICAgICogQHpoIOWcqOe7meWumuefqemYteWPmOaNouWfuuehgOS4iuWKoOWFpee7lSBYIOi9tOeahOaXi+i9rOWPmOaNolxyXG4gICAgICogQHBhcmFtIHJhZCBBbmdsZSBvZiByb3RhdGlvbiAoaW4gcmFkaWFucylcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByb3RhdGVYIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQpO1xyXG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhyYWQpO1xyXG4gICAgICAgIGNvbnN0IGExMCA9IGEubTA0O1xyXG4gICAgICAgIGNvbnN0IGExMSA9IGEubTA1O1xyXG4gICAgICAgIGNvbnN0IGExMiA9IGEubTA2O1xyXG4gICAgICAgIGNvbnN0IGExMyA9IGEubTA3O1xyXG4gICAgICAgIGNvbnN0IGEyMCA9IGEubTA4O1xyXG4gICAgICAgIGNvbnN0IGEyMSA9IGEubTA5O1xyXG4gICAgICAgIGNvbnN0IGEyMiA9IGEubTEwO1xyXG4gICAgICAgIGNvbnN0IGEyMyA9IGEubTExO1xyXG5cclxuICAgICAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcclxuICAgICAgICAgICAgb3V0Lm0wMCA9IGEubTAwO1xyXG4gICAgICAgICAgICBvdXQubTAxID0gYS5tMDE7XHJcbiAgICAgICAgICAgIG91dC5tMDIgPSBhLm0wMjtcclxuICAgICAgICAgICAgb3V0Lm0wMyA9IGEubTAzO1xyXG4gICAgICAgICAgICBvdXQubTEyID0gYS5tMTI7XHJcbiAgICAgICAgICAgIG91dC5tMTMgPSBhLm0xMztcclxuICAgICAgICAgICAgb3V0Lm0xNCA9IGEubTE0O1xyXG4gICAgICAgICAgICBvdXQubTE1ID0gYS5tMTU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXHJcbiAgICAgICAgb3V0Lm0wNCA9IGExMCAqIGMgKyBhMjAgKiBzO1xyXG4gICAgICAgIG91dC5tMDUgPSBhMTEgKiBjICsgYTIxICogcztcclxuICAgICAgICBvdXQubTA2ID0gYTEyICogYyArIGEyMiAqIHM7XHJcbiAgICAgICAgb3V0Lm0wNyA9IGExMyAqIGMgKyBhMjMgKiBzO1xyXG4gICAgICAgIG91dC5tMDggPSBhMjAgKiBjIC0gYTEwICogcztcclxuICAgICAgICBvdXQubTA5ID0gYTIxICogYyAtIGExMSAqIHM7XHJcbiAgICAgICAgb3V0Lm0xMCA9IGEyMiAqIGMgLSBhMTIgKiBzO1xyXG4gICAgICAgIG91dC5tMTEgPSBhMjMgKiBjIC0gYTEzICogcztcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBUcmFuc2Zvcm0gYSBtYXRyaXggd2l0aCBhIGdpdmVuIGFuZ2xlIGFyb3VuZCBZIGF4aXMgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gdGhlIG91dCBtYXRyaXhcclxuICAgICAqIEB6aCDlnKjnu5nlrprnn6npmLXlj5jmjaLln7rnoYDkuIrliqDlhaXnu5UgWSDovbTnmoTml4vovazlj5jmjaJcclxuICAgICAqIEBwYXJhbSByYWQgQW5nbGUgb2Ygcm90YXRpb24gKGluIHJhZGlhbnMpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcm90YXRlWSA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKTtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MocmFkKTtcclxuICAgICAgICBjb25zdCBhMDAgPSBhLm0wMDtcclxuICAgICAgICBjb25zdCBhMDEgPSBhLm0wMTtcclxuICAgICAgICBjb25zdCBhMDIgPSBhLm0wMjtcclxuICAgICAgICBjb25zdCBhMDMgPSBhLm0wMztcclxuICAgICAgICBjb25zdCBhMjAgPSBhLm0wODtcclxuICAgICAgICBjb25zdCBhMjEgPSBhLm0wOTtcclxuICAgICAgICBjb25zdCBhMjIgPSBhLm0xMDtcclxuICAgICAgICBjb25zdCBhMjMgPSBhLm0xMTtcclxuXHJcbiAgICAgICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXHJcbiAgICAgICAgICAgIG91dC5tMDQgPSBhLm0wNDtcclxuICAgICAgICAgICAgb3V0Lm0wNSA9IGEubTA1O1xyXG4gICAgICAgICAgICBvdXQubTA2ID0gYS5tMDY7XHJcbiAgICAgICAgICAgIG91dC5tMDcgPSBhLm0wNztcclxuICAgICAgICAgICAgb3V0Lm0xMiA9IGEubTEyO1xyXG4gICAgICAgICAgICBvdXQubTEzID0gYS5tMTM7XHJcbiAgICAgICAgICAgIG91dC5tMTQgPSBhLm0xNDtcclxuICAgICAgICAgICAgb3V0Lm0xNSA9IGEubTE1O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxyXG4gICAgICAgIG91dC5tMDAgPSBhMDAgKiBjIC0gYTIwICogcztcclxuICAgICAgICBvdXQubTAxID0gYTAxICogYyAtIGEyMSAqIHM7XHJcbiAgICAgICAgb3V0Lm0wMiA9IGEwMiAqIGMgLSBhMjIgKiBzO1xyXG4gICAgICAgIG91dC5tMDMgPSBhMDMgKiBjIC0gYTIzICogcztcclxuICAgICAgICBvdXQubTA4ID0gYTAwICogcyArIGEyMCAqIGM7XHJcbiAgICAgICAgb3V0Lm0wOSA9IGEwMSAqIHMgKyBhMjEgKiBjO1xyXG4gICAgICAgIG91dC5tMTAgPSBhMDIgKiBzICsgYTIyICogYztcclxuICAgICAgICBvdXQubTExID0gYTAzICogcyArIGEyMyAqIGM7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVHJhbnNmb3JtIGEgbWF0cml4IHdpdGggYSBnaXZlbiBhbmdsZSBhcm91bmQgWiBheGlzIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIHRoZSBvdXQgbWF0cml4XHJcbiAgICAgKiBAemgg5Zyo57uZ5a6a55+p6Zi15Y+Y5o2i5Z+656GA5LiK5Yqg5YWl57uVIFog6L2055qE5peL6L2s5Y+Y5o2iXHJcbiAgICAgKiBAcGFyYW0gcmFkIEFuZ2xlIG9mIHJvdGF0aW9uIChpbiByYWRpYW5zKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJvdGF0ZVogPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7XHJcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKHJhZCk7XHJcbiAgICAgICAgY29uc3QgYTAwID0gYS5tMDA7XHJcbiAgICAgICAgY29uc3QgYTAxID0gYS5tMDE7XHJcbiAgICAgICAgY29uc3QgYTAyID0gYS5tMDI7XHJcbiAgICAgICAgY29uc3QgYTAzID0gYS5tMDM7XHJcbiAgICAgICAgY29uc3QgYTEwID0gYS5tMDQ7XHJcbiAgICAgICAgY29uc3QgYTExID0gYS5tMDU7XHJcbiAgICAgICAgY29uc3QgYTEyID0gYS5tMDY7XHJcbiAgICAgICAgY29uc3QgYTEzID0gYS5tMDc7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XHJcbiAgICAgICAgaWYgKGEgIT09IG91dCkge1xyXG4gICAgICAgICAgICBvdXQubTA4ID0gYS5tMDg7XHJcbiAgICAgICAgICAgIG91dC5tMDkgPSBhLm0wOTtcclxuICAgICAgICAgICAgb3V0Lm0xMCA9IGEubTEwO1xyXG4gICAgICAgICAgICBvdXQubTExID0gYS5tMTE7XHJcbiAgICAgICAgICAgIG91dC5tMTIgPSBhLm0xMjtcclxuICAgICAgICAgICAgb3V0Lm0xMyA9IGEubTEzO1xyXG4gICAgICAgICAgICBvdXQubTE0ID0gYS5tMTQ7XHJcbiAgICAgICAgICAgIG91dC5tMTUgPSBhLm0xNTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cclxuICAgICAgICBvdXQubTAwID0gYTAwICogYyArIGExMCAqIHM7XHJcbiAgICAgICAgb3V0Lm0wMSA9IGEwMSAqIGMgKyBhMTEgKiBzO1xyXG4gICAgICAgIG91dC5tMDIgPSBhMDIgKiBjICsgYTEyICogcztcclxuICAgICAgICBvdXQubTAzID0gYTAzICogYyArIGExMyAqIHM7XHJcbiAgICAgICAgb3V0Lm0wNCA9IGExMCAqIGMgLSBhMDAgKiBzO1xyXG4gICAgICAgIG91dC5tMDUgPSBhMTEgKiBjIC0gYTAxICogcztcclxuICAgICAgICBvdXQubTA2ID0gYTEyICogYyAtIGEwMiAqIHM7XHJcbiAgICAgICAgb3V0Lm0wNyA9IGExMyAqIGMgLSBhMDMgKiBzO1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFNldHMgdGhlIG91dCBtYXRyaXggd2l0aCBhIHRyYW5zbGF0aW9uIHZlY3RvclxyXG4gICAgICogQHpoIOiuoeeul+S9jeenu+efqemYtVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21UcmFuc2xhdGlvbiA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHY6IFZlY0xpa2UpIHtcclxuICAgICAgICBvdXQubTAwID0gMTtcclxuICAgICAgICBvdXQubTAxID0gMDtcclxuICAgICAgICBvdXQubTAyID0gMDtcclxuICAgICAgICBvdXQubTAzID0gMDtcclxuICAgICAgICBvdXQubTA0ID0gMDtcclxuICAgICAgICBvdXQubTA1ID0gMTtcclxuICAgICAgICBvdXQubTA2ID0gMDtcclxuICAgICAgICBvdXQubTA3ID0gMDtcclxuICAgICAgICBvdXQubTA4ID0gMDtcclxuICAgICAgICBvdXQubTA5ID0gMDtcclxuICAgICAgICBvdXQubTEwID0gMTtcclxuICAgICAgICBvdXQubTExID0gMDtcclxuICAgICAgICBvdXQubTEyID0gdi54O1xyXG4gICAgICAgIG91dC5tMTMgPSB2Lnk7XHJcbiAgICAgICAgb3V0Lm0xNCA9IHYuejtcclxuICAgICAgICBvdXQubTE1ID0gMTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFNldHMgdGhlIG91dCBtYXRyaXggd2l0aCBhIHNjYWxlIHZlY3RvclxyXG4gICAgICogQHpoIOiuoeeul+e8qeaUvuefqemYtVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21TY2FsaW5nIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgdjogVmVjTGlrZSkge1xyXG4gICAgICAgIG91dC5tMDAgPSB2Lng7XHJcbiAgICAgICAgb3V0Lm0wMSA9IDA7XHJcbiAgICAgICAgb3V0Lm0wMiA9IDA7XHJcbiAgICAgICAgb3V0Lm0wMyA9IDA7XHJcbiAgICAgICAgb3V0Lm0wNCA9IDA7XHJcbiAgICAgICAgb3V0Lm0wNSA9IHYueTtcclxuICAgICAgICBvdXQubTA2ID0gMDtcclxuICAgICAgICBvdXQubTA3ID0gMDtcclxuICAgICAgICBvdXQubTA4ID0gMDtcclxuICAgICAgICBvdXQubTA5ID0gMDtcclxuICAgICAgICBvdXQubTEwID0gdi56O1xyXG4gICAgICAgIG91dC5tMTEgPSAwO1xyXG4gICAgICAgIG91dC5tMTIgPSAwO1xyXG4gICAgICAgIG91dC5tMTMgPSAwO1xyXG4gICAgICAgIG91dC5tMTQgPSAwO1xyXG4gICAgICAgIG91dC5tMTUgPSAxO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0cyB0aGUgb3V0IG1hdHJpeCB3aXRoIHJvdGF0aW9uIGFuZ2xlXHJcbiAgICAgKiBAemgg6K6h566X5peL6L2s55+p6Zi1XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVJvdGF0aW9uIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcmFkOiBudW1iZXIsIGF4aXM6IFZlY0xpa2UpIHtcclxuICAgICAgICBsZXQgeCA9IGF4aXMueDsgbGV0IHkgPSBheGlzLnk7IGxldCB6ID0gYXhpcy56O1xyXG4gICAgICAgIGxldCBsZW4gPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KTtcclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGxlbikgPCBFUFNJTE9OKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGVuID0gMSAvIGxlbjtcclxuICAgICAgICB4ICo9IGxlbjtcclxuICAgICAgICB5ICo9IGxlbjtcclxuICAgICAgICB6ICo9IGxlbjtcclxuXHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7XHJcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKHJhZCk7XHJcbiAgICAgICAgY29uc3QgdCA9IDEgLSBjO1xyXG5cclxuICAgICAgICAvLyBQZXJmb3JtIHJvdGF0aW9uLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxyXG4gICAgICAgIG91dC5tMDAgPSB4ICogeCAqIHQgKyBjO1xyXG4gICAgICAgIG91dC5tMDEgPSB5ICogeCAqIHQgKyB6ICogcztcclxuICAgICAgICBvdXQubTAyID0geiAqIHggKiB0IC0geSAqIHM7XHJcbiAgICAgICAgb3V0Lm0wMyA9IDA7XHJcbiAgICAgICAgb3V0Lm0wNCA9IHggKiB5ICogdCAtIHogKiBzO1xyXG4gICAgICAgIG91dC5tMDUgPSB5ICogeSAqIHQgKyBjO1xyXG4gICAgICAgIG91dC5tMDYgPSB6ICogeSAqIHQgKyB4ICogcztcclxuICAgICAgICBvdXQubTA3ID0gMDtcclxuICAgICAgICBvdXQubTA4ID0geCAqIHogKiB0ICsgeSAqIHM7XHJcbiAgICAgICAgb3V0Lm0wOSA9IHkgKiB6ICogdCAtIHggKiBzO1xyXG4gICAgICAgIG91dC5tMTAgPSB6ICogeiAqIHQgKyBjO1xyXG4gICAgICAgIG91dC5tMTEgPSAwO1xyXG4gICAgICAgIG91dC5tMTIgPSAwO1xyXG4gICAgICAgIG91dC5tMTMgPSAwO1xyXG4gICAgICAgIG91dC5tMTQgPSAwO1xyXG4gICAgICAgIG91dC5tMTUgPSAxO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgbWF0cml4IHJlcHJlc2VudGluZyBhIHJvdGF0aW9uIGFyb3VuZCB0aGUgWCBheGlzXHJcbiAgICAgKiBAemgg6K6h566X57uVIFgg6L2055qE5peL6L2s55+p6Zi1XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVhSb3RhdGlvbiA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIHJhZDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7IGNvbnN0IGMgPSBNYXRoLmNvcyhyYWQpO1xyXG5cclxuICAgICAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXHJcbiAgICAgICAgb3V0Lm0wMCA9IDE7XHJcbiAgICAgICAgb3V0Lm0wMSA9IDA7XHJcbiAgICAgICAgb3V0Lm0wMiA9IDA7XHJcbiAgICAgICAgb3V0Lm0wMyA9IDA7XHJcbiAgICAgICAgb3V0Lm0wNCA9IDA7XHJcbiAgICAgICAgb3V0Lm0wNSA9IGM7XHJcbiAgICAgICAgb3V0Lm0wNiA9IHM7XHJcbiAgICAgICAgb3V0Lm0wNyA9IDA7XHJcbiAgICAgICAgb3V0Lm0wOCA9IDA7XHJcbiAgICAgICAgb3V0Lm0wOSA9IC1zO1xyXG4gICAgICAgIG91dC5tMTAgPSBjO1xyXG4gICAgICAgIG91dC5tMTEgPSAwO1xyXG4gICAgICAgIG91dC5tMTIgPSAwO1xyXG4gICAgICAgIG91dC5tMTMgPSAwO1xyXG4gICAgICAgIG91dC5tMTQgPSAwO1xyXG4gICAgICAgIG91dC5tMTUgPSAxO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgbWF0cml4IHJlcHJlc2VudGluZyBhIHJvdGF0aW9uIGFyb3VuZCB0aGUgWSBheGlzXHJcbiAgICAgKiBAemgg6K6h566X57uVIFkg6L2055qE5peL6L2s55+p6Zi1XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVlSb3RhdGlvbiA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIHJhZDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7IGNvbnN0IGMgPSBNYXRoLmNvcyhyYWQpO1xyXG5cclxuICAgICAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXHJcbiAgICAgICAgb3V0Lm0wMCA9IGM7XHJcbiAgICAgICAgb3V0Lm0wMSA9IDA7XHJcbiAgICAgICAgb3V0Lm0wMiA9IC1zO1xyXG4gICAgICAgIG91dC5tMDMgPSAwO1xyXG4gICAgICAgIG91dC5tMDQgPSAwO1xyXG4gICAgICAgIG91dC5tMDUgPSAxO1xyXG4gICAgICAgIG91dC5tMDYgPSAwO1xyXG4gICAgICAgIG91dC5tMDcgPSAwO1xyXG4gICAgICAgIG91dC5tMDggPSBzO1xyXG4gICAgICAgIG91dC5tMDkgPSAwO1xyXG4gICAgICAgIG91dC5tMTAgPSBjO1xyXG4gICAgICAgIG91dC5tMTEgPSAwO1xyXG4gICAgICAgIG91dC5tMTIgPSAwO1xyXG4gICAgICAgIG91dC5tMTMgPSAwO1xyXG4gICAgICAgIG91dC5tMTQgPSAwO1xyXG4gICAgICAgIG91dC5tMTUgPSAxO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgbWF0cml4IHJlcHJlc2VudGluZyBhIHJvdGF0aW9uIGFyb3VuZCB0aGUgWiBheGlzXHJcbiAgICAgKiBAemgg6K6h566X57uVIFog6L2055qE5peL6L2s55+p6Zi1XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVpSb3RhdGlvbiA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIHJhZDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7IGNvbnN0IGMgPSBNYXRoLmNvcyhyYWQpO1xyXG5cclxuICAgICAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXHJcbiAgICAgICAgb3V0Lm0wMCA9IGM7XHJcbiAgICAgICAgb3V0Lm0wMSA9IHM7XHJcbiAgICAgICAgb3V0Lm0wMiA9IDA7XHJcbiAgICAgICAgb3V0Lm0wMyA9IDA7XHJcbiAgICAgICAgb3V0Lm0wNCA9IC1zO1xyXG4gICAgICAgIG91dC5tMDUgPSBjO1xyXG4gICAgICAgIG91dC5tMDYgPSAwO1xyXG4gICAgICAgIG91dC5tMDcgPSAwO1xyXG4gICAgICAgIG91dC5tMDggPSAwO1xyXG4gICAgICAgIG91dC5tMDkgPSAwO1xyXG4gICAgICAgIG91dC5tMTAgPSAxO1xyXG4gICAgICAgIG91dC5tMTEgPSAwO1xyXG4gICAgICAgIG91dC5tMTIgPSAwO1xyXG4gICAgICAgIG91dC5tMTMgPSAwO1xyXG4gICAgICAgIG91dC5tMTQgPSAwO1xyXG4gICAgICAgIG91dC5tMTUgPSAxO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgdHJhbnNmb3JtIHJlcHJlc2VudGluZyB0aGUgY29tYmluYXRpb24gb2YgYSByb3RhdGlvbiBhbmQgYSB0cmFuc2xhdGlvblxyXG4gICAgICogQHpoIOagueaNruaXi+i9rOWSjOS9jeenu+S/oeaBr+iuoeeul+efqemYtVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21SVCA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHE6IFF1YXQsIHY6IFZlY0xpa2UpIHtcclxuICAgICAgICBjb25zdCB4ID0gcS54OyBjb25zdCB5ID0gcS55OyBjb25zdCB6ID0gcS56OyBjb25zdCB3ID0gcS53O1xyXG4gICAgICAgIGNvbnN0IHgyID0geCArIHg7XHJcbiAgICAgICAgY29uc3QgeTIgPSB5ICsgeTtcclxuICAgICAgICBjb25zdCB6MiA9IHogKyB6O1xyXG5cclxuICAgICAgICBjb25zdCB4eCA9IHggKiB4MjtcclxuICAgICAgICBjb25zdCB4eSA9IHggKiB5MjtcclxuICAgICAgICBjb25zdCB4eiA9IHggKiB6MjtcclxuICAgICAgICBjb25zdCB5eSA9IHkgKiB5MjtcclxuICAgICAgICBjb25zdCB5eiA9IHkgKiB6MjtcclxuICAgICAgICBjb25zdCB6eiA9IHogKiB6MjtcclxuICAgICAgICBjb25zdCB3eCA9IHcgKiB4MjtcclxuICAgICAgICBjb25zdCB3eSA9IHcgKiB5MjtcclxuICAgICAgICBjb25zdCB3eiA9IHcgKiB6MjtcclxuXHJcbiAgICAgICAgb3V0Lm0wMCA9IDEgLSAoeXkgKyB6eik7XHJcbiAgICAgICAgb3V0Lm0wMSA9IHh5ICsgd3o7XHJcbiAgICAgICAgb3V0Lm0wMiA9IHh6IC0gd3k7XHJcbiAgICAgICAgb3V0Lm0wMyA9IDA7XHJcbiAgICAgICAgb3V0Lm0wNCA9IHh5IC0gd3o7XHJcbiAgICAgICAgb3V0Lm0wNSA9IDEgLSAoeHggKyB6eik7XHJcbiAgICAgICAgb3V0Lm0wNiA9IHl6ICsgd3g7XHJcbiAgICAgICAgb3V0Lm0wNyA9IDA7XHJcbiAgICAgICAgb3V0Lm0wOCA9IHh6ICsgd3k7XHJcbiAgICAgICAgb3V0Lm0wOSA9IHl6IC0gd3g7XHJcbiAgICAgICAgb3V0Lm0xMCA9IDEgLSAoeHggKyB5eSk7XHJcbiAgICAgICAgb3V0Lm0xMSA9IDA7XHJcbiAgICAgICAgb3V0Lm0xMiA9IHYueDtcclxuICAgICAgICBvdXQubTEzID0gdi55O1xyXG4gICAgICAgIG91dC5tMTQgPSB2Lno7XHJcbiAgICAgICAgb3V0Lm0xNSA9IDE7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gRXh0cmFjdHMgdGhlIHRyYW5zbGF0aW9uIGZyb20gdGhlIG1hdHJpeCwgYXNzdW1pbmcgaXQncyBjb21wb3NlZCBpbiBvcmRlciBvZiBzY2FsZSwgcm90YXRpb24sIHRyYW5zbGF0aW9uXHJcbiAgICAgKiBAemgg5o+Q5Y+W55+p6Zi155qE5L2N56e75L+h5oGvLCDpu5jorqTnn6npmLXkuK3nmoTlj5jmjaLku6UgUy0+Ui0+VCDnmoTpobrluo/lupTnlKhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRUcmFuc2xhdGlvbiA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBWZWNMaWtlLCBtYXQ6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gbWF0Lm0xMjtcclxuICAgICAgICBvdXQueSA9IG1hdC5tMTM7XHJcbiAgICAgICAgb3V0LnogPSBtYXQubTE0O1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEV4dHJhY3RzIHRoZSBzY2FsZSB2ZWN0b3IgZnJvbSB0aGUgbWF0cml4LCBhc3N1bWluZyBpdCdzIGNvbXBvc2VkIGluIG9yZGVyIG9mIHNjYWxlLCByb3RhdGlvbiwgdHJhbnNsYXRpb25cclxuICAgICAqIEB6aCDmj5Dlj5bnn6npmLXnmoTnvKnmlL7kv6Hmga8sIOm7mOiupOefqemYteS4reeahOWPmOaNouS7pSBTLT5SLT5UIOeahOmhuuW6j+W6lOeUqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFNjYWxpbmcgPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogVmVjTGlrZSwgbWF0OiBPdXQpIHtcclxuICAgICAgICBjb25zdCBtMDAgPSBtM18xLm0wMCA9IG1hdC5tMDA7XHJcbiAgICAgICAgY29uc3QgbTAxID0gbTNfMS5tMDEgPSBtYXQubTAxO1xyXG4gICAgICAgIGNvbnN0IG0wMiA9IG0zXzEubTAyID0gbWF0Lm0wMjtcclxuICAgICAgICBjb25zdCBtMDQgPSBtM18xLm0wMyA9IG1hdC5tMDQ7XHJcbiAgICAgICAgY29uc3QgbTA1ID0gbTNfMS5tMDQgPSBtYXQubTA1O1xyXG4gICAgICAgIGNvbnN0IG0wNiA9IG0zXzEubTA1ID0gbWF0Lm0wNjtcclxuICAgICAgICBjb25zdCBtMDggPSBtM18xLm0wNiA9IG1hdC5tMDg7XHJcbiAgICAgICAgY29uc3QgbTA5ID0gbTNfMS5tMDcgPSBtYXQubTA5O1xyXG4gICAgICAgIGNvbnN0IG0xMCA9IG0zXzEubTA4ID0gbWF0Lm0xMDtcclxuICAgICAgICBvdXQueCA9IE1hdGguc3FydChtMDAgKiBtMDAgKyBtMDEgKiBtMDEgKyBtMDIgKiBtMDIpO1xyXG4gICAgICAgIG91dC55ID0gTWF0aC5zcXJ0KG0wNCAqIG0wNCArIG0wNSAqIG0wNSArIG0wNiAqIG0wNik7XHJcbiAgICAgICAgb3V0LnogPSBNYXRoLnNxcnQobTA4ICogbTA4ICsgbTA5ICogbTA5ICsgbTEwICogbTEwKTtcclxuICAgICAgICAvLyBhY2NvdW50IGZvciByZWZlY3Rpb25zXHJcbiAgICAgICAgaWYgKE1hdDMuZGV0ZXJtaW5hbnQobTNfMSkgPCAwKSB7IG91dC54ICo9IC0xOyB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBFeHRyYWN0cyB0aGUgcm90YXRpb24gZnJvbSB0aGUgbWF0cml4LCBhc3N1bWluZyBpdCdzIGNvbXBvc2VkIGluIG9yZGVyIG9mIHNjYWxlLCByb3RhdGlvbiwgdHJhbnNsYXRpb25cclxuICAgICAqIEB6aCDmj5Dlj5bnn6npmLXnmoTml4vovazkv6Hmga8sIOm7mOiupOi+k+WFpeefqemYteS4jeWQq+aciee8qeaUvuS/oeaBr++8jOWmguiAg+iZkee8qeaUvuW6lOS9v+eUqCBgdG9SVFNgIOWHveaVsOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFJvdGF0aW9uIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IFF1YXQsIG1hdDogT3V0KSB7XHJcbiAgICAgICAgY29uc3QgdHJhY2UgPSBtYXQubTAwICsgbWF0Lm0wNSArIG1hdC5tMTA7XHJcbiAgICAgICAgbGV0IFMgPSAwO1xyXG5cclxuICAgICAgICBpZiAodHJhY2UgPiAwKSB7XHJcbiAgICAgICAgICAgIFMgPSBNYXRoLnNxcnQodHJhY2UgKyAxLjApICogMjtcclxuICAgICAgICAgICAgb3V0LncgPSAwLjI1ICogUztcclxuICAgICAgICAgICAgb3V0LnggPSAobWF0Lm0wNiAtIG1hdC5tMDkpIC8gUztcclxuICAgICAgICAgICAgb3V0LnkgPSAobWF0Lm0wOCAtIG1hdC5tMDIpIC8gUztcclxuICAgICAgICAgICAgb3V0LnogPSAobWF0Lm0wMSAtIG1hdC5tMDQpIC8gUztcclxuICAgICAgICB9IGVsc2UgaWYgKChtYXQubTAwID4gbWF0Lm0wNSkgJiYgKG1hdC5tMDAgPiBtYXQubTEwKSkge1xyXG4gICAgICAgICAgICBTID0gTWF0aC5zcXJ0KDEuMCArIG1hdC5tMDAgLSBtYXQubTA1IC0gbWF0Lm0xMCkgKiAyO1xyXG4gICAgICAgICAgICBvdXQudyA9IChtYXQubTA2IC0gbWF0Lm0wOSkgLyBTO1xyXG4gICAgICAgICAgICBvdXQueCA9IDAuMjUgKiBTO1xyXG4gICAgICAgICAgICBvdXQueSA9IChtYXQubTAxICsgbWF0Lm0wNCkgLyBTO1xyXG4gICAgICAgICAgICBvdXQueiA9IChtYXQubTA4ICsgbWF0Lm0wMikgLyBTO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Lm0wNSA+IG1hdC5tMTApIHtcclxuICAgICAgICAgICAgUyA9IE1hdGguc3FydCgxLjAgKyBtYXQubTA1IC0gbWF0Lm0wMCAtIG1hdC5tMTApICogMjtcclxuICAgICAgICAgICAgb3V0LncgPSAobWF0Lm0wOCAtIG1hdC5tMDIpIC8gUztcclxuICAgICAgICAgICAgb3V0LnggPSAobWF0Lm0wMSArIG1hdC5tMDQpIC8gUztcclxuICAgICAgICAgICAgb3V0LnkgPSAwLjI1ICogUztcclxuICAgICAgICAgICAgb3V0LnogPSAobWF0Lm0wNiArIG1hdC5tMDkpIC8gUztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBTID0gTWF0aC5zcXJ0KDEuMCArIG1hdC5tMTAgLSBtYXQubTAwIC0gbWF0Lm0wNSkgKiAyO1xyXG4gICAgICAgICAgICBvdXQudyA9IChtYXQubTAxIC0gbWF0Lm0wNCkgLyBTO1xyXG4gICAgICAgICAgICBvdXQueCA9IChtYXQubTA4ICsgbWF0Lm0wMikgLyBTO1xyXG4gICAgICAgICAgICBvdXQueSA9IChtYXQubTA2ICsgbWF0Lm0wOSkgLyBTO1xyXG4gICAgICAgICAgICBvdXQueiA9IDAuMjUgKiBTO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBFeHRyYWN0cyB0aGUgc2NhbGUsIHJvdGF0aW9uIGFuZCB0cmFuc2xhdGlvbiBmcm9tIHRoZSBtYXRyaXgsIGFzc3VtaW5nIGl0J3MgY29tcG9zZWQgaW4gb3JkZXIgb2Ygc2NhbGUsIHJvdGF0aW9uLCB0cmFuc2xhdGlvblxyXG4gICAgICogQHpoIOaPkOWPluaXi+i9rOOAgeS9jeenu+OAgee8qeaUvuS/oeaBr++8jCDpu5jorqTnn6npmLXkuK3nmoTlj5jmjaLku6UgUy0+Ui0+VCDnmoTpobrluo/lupTnlKhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0b1JUUyA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAobTogT3V0LCBxOiBRdWF0LCB2OiBWZWNMaWtlLCBzOiBWZWNMaWtlKSB7XHJcbiAgICAgICAgcy54ID0gVmVjMy5zZXQodjNfMSwgbS5tMDAsIG0ubTAxLCBtLm0wMikubGVuZ3RoKCk7XHJcbiAgICAgICAgbTNfMS5tMDAgPSBtLm0wMCAvIHMueDtcclxuICAgICAgICBtM18xLm0wMSA9IG0ubTAxIC8gcy54O1xyXG4gICAgICAgIG0zXzEubTAyID0gbS5tMDIgLyBzLng7XHJcbiAgICAgICAgcy55ID0gVmVjMy5zZXQodjNfMSwgbS5tMDQsIG0ubTA1LCBtLm0wNikubGVuZ3RoKCk7XHJcbiAgICAgICAgbTNfMS5tMDMgPSBtLm0wNCAvIHMueTtcclxuICAgICAgICBtM18xLm0wNCA9IG0ubTA1IC8gcy55O1xyXG4gICAgICAgIG0zXzEubTA1ID0gbS5tMDYgLyBzLnk7XHJcbiAgICAgICAgcy56ID0gVmVjMy5zZXQodjNfMSwgbS5tMDgsIG0ubTA5LCBtLm0xMCkubGVuZ3RoKCk7XHJcbiAgICAgICAgbTNfMS5tMDYgPSBtLm0wOCAvIHMuejtcclxuICAgICAgICBtM18xLm0wNyA9IG0ubTA5IC8gcy56O1xyXG4gICAgICAgIG0zXzEubTA4ID0gbS5tMTAgLyBzLno7XHJcbiAgICAgICAgY29uc3QgZGV0ID0gTWF0My5kZXRlcm1pbmFudChtM18xKTtcclxuICAgICAgICBpZiAoZGV0IDwgMCkgeyBzLnggKj0gLTE7IG0zXzEubTAwICo9IC0xOyBtM18xLm0wMSAqPSAtMTsgbTNfMS5tMDIgKj0gLTE7IH1cclxuICAgICAgICBRdWF0LmZyb21NYXQzKHEsIG0zXzEpOyAvLyBhbHJlYWR5IG5vcm1hbGl6ZWRcclxuICAgICAgICBWZWMzLnNldCh2LCBtLm0xMiwgbS5tMTMsIG0ubTE0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDb21wb3NlIGEgbWF0cml4IGZyb20gc2NhbGUsIHJvdGF0aW9uIGFuZCB0cmFuc2xhdGlvbiwgYXBwbGllZCBpbiBvcmRlci5cclxuICAgICAqIEB6aCDmoLnmja7ml4vovazjgIHkvY3np7vjgIHnvKnmlL7kv6Hmga/orqHnrpfnn6npmLXvvIzku6UgUy0+Ui0+VCDnmoTpobrluo/lupTnlKhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tUlRTIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcTogUXVhdCwgdjogVmVjTGlrZSwgczogVmVjTGlrZSkge1xyXG4gICAgICAgIGNvbnN0IHggPSBxLng7IGNvbnN0IHkgPSBxLnk7IGNvbnN0IHogPSBxLno7IGNvbnN0IHcgPSBxLnc7XHJcbiAgICAgICAgY29uc3QgeDIgPSB4ICsgeDtcclxuICAgICAgICBjb25zdCB5MiA9IHkgKyB5O1xyXG4gICAgICAgIGNvbnN0IHoyID0geiArIHo7XHJcblxyXG4gICAgICAgIGNvbnN0IHh4ID0geCAqIHgyO1xyXG4gICAgICAgIGNvbnN0IHh5ID0geCAqIHkyO1xyXG4gICAgICAgIGNvbnN0IHh6ID0geCAqIHoyO1xyXG4gICAgICAgIGNvbnN0IHl5ID0geSAqIHkyO1xyXG4gICAgICAgIGNvbnN0IHl6ID0geSAqIHoyO1xyXG4gICAgICAgIGNvbnN0IHp6ID0geiAqIHoyO1xyXG4gICAgICAgIGNvbnN0IHd4ID0gdyAqIHgyO1xyXG4gICAgICAgIGNvbnN0IHd5ID0gdyAqIHkyO1xyXG4gICAgICAgIGNvbnN0IHd6ID0gdyAqIHoyO1xyXG4gICAgICAgIGNvbnN0IHN4ID0gcy54O1xyXG4gICAgICAgIGNvbnN0IHN5ID0gcy55O1xyXG4gICAgICAgIGNvbnN0IHN6ID0gcy56O1xyXG5cclxuICAgICAgICBvdXQubTAwID0gKDEgLSAoeXkgKyB6eikpICogc3g7XHJcbiAgICAgICAgb3V0Lm0wMSA9ICh4eSArIHd6KSAqIHN4O1xyXG4gICAgICAgIG91dC5tMDIgPSAoeHogLSB3eSkgKiBzeDtcclxuICAgICAgICBvdXQubTAzID0gMDtcclxuICAgICAgICBvdXQubTA0ID0gKHh5IC0gd3opICogc3k7XHJcbiAgICAgICAgb3V0Lm0wNSA9ICgxIC0gKHh4ICsgenopKSAqIHN5O1xyXG4gICAgICAgIG91dC5tMDYgPSAoeXogKyB3eCkgKiBzeTtcclxuICAgICAgICBvdXQubTA3ID0gMDtcclxuICAgICAgICBvdXQubTA4ID0gKHh6ICsgd3kpICogc3o7XHJcbiAgICAgICAgb3V0Lm0wOSA9ICh5eiAtIHd4KSAqIHN6O1xyXG4gICAgICAgIG91dC5tMTAgPSAoMSAtICh4eCArIHl5KSkgKiBzejtcclxuICAgICAgICBvdXQubTExID0gMDtcclxuICAgICAgICBvdXQubTEyID0gdi54O1xyXG4gICAgICAgIG91dC5tMTMgPSB2Lnk7XHJcbiAgICAgICAgb3V0Lm0xNCA9IHYuejtcclxuICAgICAgICBvdXQubTE1ID0gMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDb21wb3NlIGEgbWF0cml4IGZyb20gc2NhbGUsIHJvdGF0aW9uIGFuZCB0cmFuc2xhdGlvbiwgYXBwbGllZCBpbiBvcmRlciwgZnJvbSBhIGdpdmVuIG9yaWdpblxyXG4gICAgICogQHpoIOagueaNruaMh+WumueahOaXi+i9rOOAgeS9jeenu+OAgee8qeaUvuWPiuWPmOaNouS4reW/g+S/oeaBr+iuoeeul+efqemYte+8jOS7pSBTLT5SLT5UIOeahOmhuuW6j+W6lOeUqFxyXG4gICAgICogQHBhcmFtIHEgUm90YXRpb24gcXVhdGVybmlvblxyXG4gICAgICogQHBhcmFtIHYgVHJhbnNsYXRpb24gdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0gcyBTY2FsaW5nIHZlY3RvclxyXG4gICAgICogQHBhcmFtIG8gdHJhbnNmb3JtYXRpb24gQ2VudGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVJUU09yaWdpbiA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHE6IFF1YXQsIHY6IFZlY0xpa2UsIHM6IFZlY0xpa2UsIG86IFZlY0xpa2UpIHtcclxuICAgICAgICBjb25zdCB4ID0gcS54OyBjb25zdCB5ID0gcS55OyBjb25zdCB6ID0gcS56OyBjb25zdCB3ID0gcS53O1xyXG4gICAgICAgIGNvbnN0IHgyID0geCArIHg7XHJcbiAgICAgICAgY29uc3QgeTIgPSB5ICsgeTtcclxuICAgICAgICBjb25zdCB6MiA9IHogKyB6O1xyXG5cclxuICAgICAgICBjb25zdCB4eCA9IHggKiB4MjtcclxuICAgICAgICBjb25zdCB4eSA9IHggKiB5MjtcclxuICAgICAgICBjb25zdCB4eiA9IHggKiB6MjtcclxuICAgICAgICBjb25zdCB5eSA9IHkgKiB5MjtcclxuICAgICAgICBjb25zdCB5eiA9IHkgKiB6MjtcclxuICAgICAgICBjb25zdCB6eiA9IHogKiB6MjtcclxuICAgICAgICBjb25zdCB3eCA9IHcgKiB4MjtcclxuICAgICAgICBjb25zdCB3eSA9IHcgKiB5MjtcclxuICAgICAgICBjb25zdCB3eiA9IHcgKiB6MjtcclxuXHJcbiAgICAgICAgY29uc3Qgc3ggPSBzLng7XHJcbiAgICAgICAgY29uc3Qgc3kgPSBzLnk7XHJcbiAgICAgICAgY29uc3Qgc3ogPSBzLno7XHJcblxyXG4gICAgICAgIGNvbnN0IG94ID0gby54O1xyXG4gICAgICAgIGNvbnN0IG95ID0gby55O1xyXG4gICAgICAgIGNvbnN0IG96ID0gby56O1xyXG5cclxuICAgICAgICBvdXQubTAwID0gKDEgLSAoeXkgKyB6eikpICogc3g7XHJcbiAgICAgICAgb3V0Lm0wMSA9ICh4eSArIHd6KSAqIHN4O1xyXG4gICAgICAgIG91dC5tMDIgPSAoeHogLSB3eSkgKiBzeDtcclxuICAgICAgICBvdXQubTAzID0gMDtcclxuICAgICAgICBvdXQubTA0ID0gKHh5IC0gd3opICogc3k7XHJcbiAgICAgICAgb3V0Lm0wNSA9ICgxIC0gKHh4ICsgenopKSAqIHN5O1xyXG4gICAgICAgIG91dC5tMDYgPSAoeXogKyB3eCkgKiBzeTtcclxuICAgICAgICBvdXQubTA3ID0gMDtcclxuICAgICAgICBvdXQubTA4ID0gKHh6ICsgd3kpICogc3o7XHJcbiAgICAgICAgb3V0Lm0wOSA9ICh5eiAtIHd4KSAqIHN6O1xyXG4gICAgICAgIG91dC5tMTAgPSAoMSAtICh4eCArIHl5KSkgKiBzejtcclxuICAgICAgICBvdXQubTExID0gMDtcclxuICAgICAgICBvdXQubTEyID0gdi54ICsgb3ggLSAob3V0Lm0wMCAqIG94ICsgb3V0Lm0wNCAqIG95ICsgb3V0Lm0wOCAqIG96KTtcclxuICAgICAgICBvdXQubTEzID0gdi55ICsgb3kgLSAob3V0Lm0wMSAqIG94ICsgb3V0Lm0wNSAqIG95ICsgb3V0Lm0wOSAqIG96KTtcclxuICAgICAgICBvdXQubTE0ID0gdi56ICsgb3ogLSAob3V0Lm0wMiAqIG94ICsgb3V0Lm0wNiAqIG95ICsgb3V0Lm0xMCAqIG96KTtcclxuICAgICAgICBvdXQubTE1ID0gMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIHRoZSBvdXQgbWF0cml4IHdpdGggdGhlIGdpdmVuIHF1YXRlcm5pb25cclxuICAgICAqIEB6aCDmoLnmja7mjIflrprnmoTml4vovazkv6Hmga/orqHnrpfnn6npmLVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tUXVhdCA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIHE6IFF1YXQpIHtcclxuICAgICAgICBjb25zdCB4ID0gcS54OyBjb25zdCB5ID0gcS55OyBjb25zdCB6ID0gcS56OyBjb25zdCB3ID0gcS53O1xyXG4gICAgICAgIGNvbnN0IHgyID0geCArIHg7XHJcbiAgICAgICAgY29uc3QgeTIgPSB5ICsgeTtcclxuICAgICAgICBjb25zdCB6MiA9IHogKyB6O1xyXG5cclxuICAgICAgICBjb25zdCB4eCA9IHggKiB4MjtcclxuICAgICAgICBjb25zdCB5eCA9IHkgKiB4MjtcclxuICAgICAgICBjb25zdCB5eSA9IHkgKiB5MjtcclxuICAgICAgICBjb25zdCB6eCA9IHogKiB4MjtcclxuICAgICAgICBjb25zdCB6eSA9IHogKiB5MjtcclxuICAgICAgICBjb25zdCB6eiA9IHogKiB6MjtcclxuICAgICAgICBjb25zdCB3eCA9IHcgKiB4MjtcclxuICAgICAgICBjb25zdCB3eSA9IHcgKiB5MjtcclxuICAgICAgICBjb25zdCB3eiA9IHcgKiB6MjtcclxuXHJcbiAgICAgICAgb3V0Lm0wMCA9IDEgLSB5eSAtIHp6O1xyXG4gICAgICAgIG91dC5tMDEgPSB5eCArIHd6O1xyXG4gICAgICAgIG91dC5tMDIgPSB6eCAtIHd5O1xyXG4gICAgICAgIG91dC5tMDMgPSAwO1xyXG5cclxuICAgICAgICBvdXQubTA0ID0geXggLSB3ejtcclxuICAgICAgICBvdXQubTA1ID0gMSAtIHh4IC0geno7XHJcbiAgICAgICAgb3V0Lm0wNiA9IHp5ICsgd3g7XHJcbiAgICAgICAgb3V0Lm0wNyA9IDA7XHJcblxyXG4gICAgICAgIG91dC5tMDggPSB6eCArIHd5O1xyXG4gICAgICAgIG91dC5tMDkgPSB6eSAtIHd4O1xyXG4gICAgICAgIG91dC5tMTAgPSAxIC0geHggLSB5eTtcclxuICAgICAgICBvdXQubTExID0gMDtcclxuXHJcbiAgICAgICAgb3V0Lm0xMiA9IDA7XHJcbiAgICAgICAgb3V0Lm0xMyA9IDA7XHJcbiAgICAgICAgb3V0Lm0xNCA9IDA7XHJcbiAgICAgICAgb3V0Lm0xNSA9IDE7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgbWF0cml4IHJlcHJlc2VudGluZyB0aGUgZ2l2ZW4gZnJ1c3R1bVxyXG4gICAgICogQHpoIOagueaNruaMh+WumueahOinhumUpeS9k+S/oeaBr+iuoeeul+efqemYtVxyXG4gICAgICogQHBhcmFtIGxlZnQgVGhlIFggY29vcmRpbmF0ZSBvZiB0aGUgbGVmdCBzaWRlIG9mIHRoZSBuZWFyIHByb2plY3Rpb24gcGxhbmUgaW4gdmlldyBzcGFjZS5cclxuICAgICAqIEBwYXJhbSByaWdodCBUaGUgWCBjb29yZGluYXRlIG9mIHRoZSByaWdodCBzaWRlIG9mIHRoZSBuZWFyIHByb2plY3Rpb24gcGxhbmUgaW4gdmlldyBzcGFjZS5cclxuICAgICAqIEBwYXJhbSBib3R0b20gVGhlIFkgY29vcmRpbmF0ZSBvZiB0aGUgYm90dG9tIHNpZGUgb2YgdGhlIG5lYXIgcHJvamVjdGlvbiBwbGFuZSBpbiB2aWV3IHNwYWNlLlxyXG4gICAgICogQHBhcmFtIHRvcCBUaGUgWSBjb29yZGluYXRlIG9mIHRoZSB0b3Agc2lkZSBvZiB0aGUgbmVhciBwcm9qZWN0aW9uIHBsYW5lIGluIHZpZXcgc3BhY2UuXHJcbiAgICAgKiBAcGFyYW0gbmVhciBaIGRpc3RhbmNlIHRvIHRoZSBuZWFyIHBsYW5lIGZyb20gdGhlIG9yaWdpbiBpbiB2aWV3IHNwYWNlLlxyXG4gICAgICogQHBhcmFtIGZhciBaIGRpc3RhbmNlIHRvIHRoZSBmYXIgcGxhbmUgZnJvbSB0aGUgb3JpZ2luIGluIHZpZXcgc3BhY2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJ1c3R1bSA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGxlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIHRvcDogbnVtYmVyLCBuZWFyOiBudW1iZXIsIGZhcjogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgcmwgPSAxIC8gKHJpZ2h0IC0gbGVmdCk7XHJcbiAgICAgICAgY29uc3QgdGIgPSAxIC8gKHRvcCAtIGJvdHRvbSk7XHJcbiAgICAgICAgY29uc3QgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xyXG5cclxuICAgICAgICBvdXQubTAwID0gKG5lYXIgKiAyKSAqIHJsO1xyXG4gICAgICAgIG91dC5tMDEgPSAwO1xyXG4gICAgICAgIG91dC5tMDIgPSAwO1xyXG4gICAgICAgIG91dC5tMDMgPSAwO1xyXG4gICAgICAgIG91dC5tMDQgPSAwO1xyXG4gICAgICAgIG91dC5tMDUgPSAobmVhciAqIDIpICogdGI7XHJcbiAgICAgICAgb3V0Lm0wNiA9IDA7XHJcbiAgICAgICAgb3V0Lm0wNyA9IDA7XHJcbiAgICAgICAgb3V0Lm0wOCA9IChyaWdodCArIGxlZnQpICogcmw7XHJcbiAgICAgICAgb3V0Lm0wOSA9ICh0b3AgKyBib3R0b20pICogdGI7XHJcbiAgICAgICAgb3V0Lm0xMCA9IChmYXIgKyBuZWFyKSAqIG5mO1xyXG4gICAgICAgIG91dC5tMTEgPSAtMTtcclxuICAgICAgICBvdXQubTEyID0gMDtcclxuICAgICAgICBvdXQubTEzID0gMDtcclxuICAgICAgICBvdXQubTE0ID0gKGZhciAqIG5lYXIgKiAyKSAqIG5mO1xyXG4gICAgICAgIG91dC5tMTUgPSAwO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeFxyXG4gICAgICogQHpoIOiuoeeul+mAj+inhuaKleW9seefqemYtVxyXG4gICAgICogQHBhcmFtIGZvdnkgVmVydGljYWwgZmllbGQtb2YtdmlldyBpbiBkZWdyZWVzLlxyXG4gICAgICogQHBhcmFtIGFzcGVjdCBBc3BlY3QgcmF0aW9cclxuICAgICAqIEBwYXJhbSBuZWFyIE5lYXIgZGVwdGggY2xpcHBpbmcgcGxhbmUgdmFsdWUuXHJcbiAgICAgKiBAcGFyYW0gZmFyIEZhciBkZXB0aCBjbGlwcGluZyBwbGFuZSB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBwZXJzcGVjdGl2ZSA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAoXHJcbiAgICAgICAgb3V0OiBPdXQsIGZvdjogbnVtYmVyLCBhc3BlY3Q6IG51bWJlciwgbmVhcjogbnVtYmVyLCBmYXI6IG51bWJlcixcclxuICAgICAgICBpc0ZPVlkgPSB0cnVlLCBtaW5DbGlwWiA9IC0xLCBwcm9qZWN0aW9uU2lnblkgPSAxLCBvcmllbnRhdGlvbiA9IDAsXHJcbiAgICApIHtcclxuICAgICAgICBjb25zdCBmID0gMS4wIC8gTWF0aC50YW4oZm92IC8gMik7XHJcbiAgICAgICAgY29uc3QgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xyXG5cclxuICAgICAgICBjb25zdCB4ID0gaXNGT1ZZID8gZiAvIGFzcGVjdCA6IGY7XHJcbiAgICAgICAgY29uc3QgeSA9IChpc0ZPVlkgPyBmIDogZiAqIGFzcGVjdCkgKiBwcm9qZWN0aW9uU2lnblk7XHJcbiAgICAgICAgY29uc3QgcHJlVHJhbnNmb3JtID0gcHJlVHJhbnNmb3Jtc1tvcmllbnRhdGlvbl07XHJcblxyXG4gICAgICAgIG91dC5tMDAgPSB4ICogcHJlVHJhbnNmb3JtWzBdO1xyXG4gICAgICAgIG91dC5tMDEgPSB4ICogcHJlVHJhbnNmb3JtWzFdO1xyXG4gICAgICAgIG91dC5tMDIgPSAwO1xyXG4gICAgICAgIG91dC5tMDMgPSAwO1xyXG4gICAgICAgIG91dC5tMDQgPSB5ICogcHJlVHJhbnNmb3JtWzJdO1xyXG4gICAgICAgIG91dC5tMDUgPSB5ICogcHJlVHJhbnNmb3JtWzNdO1xyXG4gICAgICAgIG91dC5tMDYgPSAwO1xyXG4gICAgICAgIG91dC5tMDcgPSAwO1xyXG4gICAgICAgIG91dC5tMDggPSAwO1xyXG4gICAgICAgIG91dC5tMDkgPSAwO1xyXG4gICAgICAgIG91dC5tMTAgPSAoZmFyIC0gbWluQ2xpcFogKiBuZWFyKSAqIG5mO1xyXG4gICAgICAgIG91dC5tMTEgPSAtMTtcclxuICAgICAgICBvdXQubTEyID0gMDtcclxuICAgICAgICBvdXQubTEzID0gMDtcclxuICAgICAgICBvdXQubTE0ID0gZmFyICogbmVhciAqIG5mICogKDEgLSBtaW5DbGlwWik7XHJcbiAgICAgICAgb3V0Lm0xNSA9IDA7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIG9ydGhvZ29uYWwgcHJvamVjdGlvbiBtYXRyaXhcclxuICAgICAqIEB6aCDorqHnrpfmraPkuqTmipXlvbHnn6npmLVcclxuICAgICAqIEBwYXJhbSBsZWZ0IExlZnQtc2lkZSB4LWNvb3JkaW5hdGUuXHJcbiAgICAgKiBAcGFyYW0gcmlnaHQgUmlnaHQtc2lkZSB4LWNvb3JkaW5hdGUuXHJcbiAgICAgKiBAcGFyYW0gYm90dG9tIEJvdHRvbSB5LWNvb3JkaW5hdGUuXHJcbiAgICAgKiBAcGFyYW0gdG9wIFRvcCB5LWNvb3JkaW5hdGUuXHJcbiAgICAgKiBAcGFyYW0gbmVhciBOZWFyIGRlcHRoIGNsaXBwaW5nIHBsYW5lIHZhbHVlLlxyXG4gICAgICogQHBhcmFtIGZhciBGYXIgZGVwdGggY2xpcHBpbmcgcGxhbmUgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgb3J0aG8gPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKFxyXG4gICAgICAgIG91dDogT3V0LCBsZWZ0OiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCB0b3A6IG51bWJlciwgbmVhcjogbnVtYmVyLCBmYXI6IG51bWJlcixcclxuICAgICAgICBtaW5DbGlwWiA9IC0xLCBwcm9qZWN0aW9uU2lnblkgPSAxLCBvcmllbnRhdGlvbiA9IDAsXHJcbiAgICApIHtcclxuICAgICAgICBjb25zdCBsciA9IDEgLyAobGVmdCAtIHJpZ2h0KTtcclxuICAgICAgICBjb25zdCBidCA9IDEgLyAoYm90dG9tIC0gdG9wKSAqIHByb2plY3Rpb25TaWduWTtcclxuICAgICAgICBjb25zdCBuZiA9IDEgLyAobmVhciAtIGZhcik7XHJcblxyXG4gICAgICAgIGNvbnN0IHggPSAtMiAqIGxyO1xyXG4gICAgICAgIGNvbnN0IHkgPSAtMiAqIGJ0O1xyXG4gICAgICAgIGNvbnN0IGR4ID0gKGxlZnQgKyByaWdodCkgKiBscjtcclxuICAgICAgICBjb25zdCBkeSA9ICh0b3AgKyBib3R0b20pICogYnQ7XHJcbiAgICAgICAgY29uc3QgcHJlVHJhbnNmb3JtID0gcHJlVHJhbnNmb3Jtc1tvcmllbnRhdGlvbl07XHJcblxyXG4gICAgICAgIG91dC5tMDAgPSB4ICogcHJlVHJhbnNmb3JtWzBdO1xyXG4gICAgICAgIG91dC5tMDEgPSB4ICogcHJlVHJhbnNmb3JtWzFdO1xyXG4gICAgICAgIG91dC5tMDIgPSAwO1xyXG4gICAgICAgIG91dC5tMDMgPSAwO1xyXG4gICAgICAgIG91dC5tMDQgPSB5ICogcHJlVHJhbnNmb3JtWzJdO1xyXG4gICAgICAgIG91dC5tMDUgPSB5ICogcHJlVHJhbnNmb3JtWzNdO1xyXG4gICAgICAgIG91dC5tMDYgPSAwO1xyXG4gICAgICAgIG91dC5tMDcgPSAwO1xyXG4gICAgICAgIG91dC5tMDggPSAwO1xyXG4gICAgICAgIG91dC5tMDkgPSAwO1xyXG4gICAgICAgIG91dC5tMTAgPSBuZiAqICgxIC0gbWluQ2xpcFopO1xyXG4gICAgICAgIG91dC5tMTEgPSAwO1xyXG4gICAgICAgIG91dC5tMTIgPSBkeCAqIHByZVRyYW5zZm9ybVswXSArIGR5ICogcHJlVHJhbnNmb3JtWzJdO1xyXG4gICAgICAgIG91dC5tMTMgPSBkeCAqIHByZVRyYW5zZm9ybVsxXSArIGR5ICogcHJlVHJhbnNmb3JtWzNdO1xyXG4gICAgICAgIG91dC5tMTQgPSAobmVhciAtIG1pbkNsaXBaICogZmFyKSAqIG5mO1xyXG4gICAgICAgIG91dC5tMTUgPSAxO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW5cclxuICAgICAqIENhbGN1bGF0ZXMgdGhlIG1hdHJpeCB3aXRoIHRoZSB2aWV3IHBvaW50IGluZm9ybWF0aW9uLCBnaXZlbiBieSBleWUgcG9zaXRpb24sIHRhcmdldCBjZW50ZXIgYW5kIHRoZSB1cCB2ZWN0b3IuXHJcbiAgICAgKiBOb3RlIHRoYXQgY2VudGVyIHRvIGV5ZSB2ZWN0b3IgY2FuJ3QgYmUgemVybyBvciBwYXJhbGxlbCB0byB0aGUgdXAgdmVjdG9yXHJcbiAgICAgKiBAemhcclxuICAgICAqIOagueaNruinhueCueiuoeeul+efqemYte+8jOazqOaEjyBgZXllIC0gY2VudGVyYCDkuI3og73kuLrpm7blkJHph4/miJbkuI4gYHVwYCDlkJHph4/lubPooYxcclxuICAgICAqIEBwYXJhbSBleWUgVGhlIHNvdXJjZSBwb2ludC5cclxuICAgICAqIEBwYXJhbSBjZW50ZXIgVGhlIHRhcmdldCBwb2ludC5cclxuICAgICAqIEBwYXJhbSB1cCBUaGUgdmVjdG9yIGRlc2NyaWJpbmcgdGhlIHVwIGRpcmVjdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb29rQXQgPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBleWU6IFZlY0xpa2UsIGNlbnRlcjogVmVjTGlrZSwgdXA6IFZlY0xpa2UpIHtcclxuICAgICAgICBjb25zdCBleWV4ID0gZXllLng7XHJcbiAgICAgICAgY29uc3QgZXlleSA9IGV5ZS55O1xyXG4gICAgICAgIGNvbnN0IGV5ZXogPSBleWUuejtcclxuICAgICAgICBjb25zdCB1cHggPSB1cC54O1xyXG4gICAgICAgIGNvbnN0IHVweSA9IHVwLnk7XHJcbiAgICAgICAgY29uc3QgdXB6ID0gdXAuejtcclxuICAgICAgICBjb25zdCBjZW50ZXJ4ID0gY2VudGVyLng7XHJcbiAgICAgICAgY29uc3QgY2VudGVyeSA9IGNlbnRlci55O1xyXG4gICAgICAgIGNvbnN0IGNlbnRlcnogPSBjZW50ZXIuejtcclxuXHJcbiAgICAgICAgbGV0IHowID0gZXlleCAtIGNlbnRlcng7XHJcbiAgICAgICAgbGV0IHoxID0gZXlleSAtIGNlbnRlcnk7XHJcbiAgICAgICAgbGV0IHoyID0gZXlleiAtIGNlbnRlcno7XHJcblxyXG4gICAgICAgIGxldCBsZW4gPSAxIC8gTWF0aC5zcXJ0KHowICogejAgKyB6MSAqIHoxICsgejIgKiB6Mik7XHJcbiAgICAgICAgejAgKj0gbGVuO1xyXG4gICAgICAgIHoxICo9IGxlbjtcclxuICAgICAgICB6MiAqPSBsZW47XHJcblxyXG4gICAgICAgIGxldCB4MCA9IHVweSAqIHoyIC0gdXB6ICogejE7XHJcbiAgICAgICAgbGV0IHgxID0gdXB6ICogejAgLSB1cHggKiB6MjtcclxuICAgICAgICBsZXQgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xyXG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQoeDAgKiB4MCArIHgxICogeDEgKyB4MiAqIHgyKTtcclxuICAgICAgICB4MCAqPSBsZW47XHJcbiAgICAgICAgeDEgKj0gbGVuO1xyXG4gICAgICAgIHgyICo9IGxlbjtcclxuXHJcbiAgICAgICAgY29uc3QgeTAgPSB6MSAqIHgyIC0gejIgKiB4MTtcclxuICAgICAgICBjb25zdCB5MSA9IHoyICogeDAgLSB6MCAqIHgyO1xyXG4gICAgICAgIGNvbnN0IHkyID0gejAgKiB4MSAtIHoxICogeDA7XHJcblxyXG4gICAgICAgIG91dC5tMDAgPSB4MDtcclxuICAgICAgICBvdXQubTAxID0geTA7XHJcbiAgICAgICAgb3V0Lm0wMiA9IHowO1xyXG4gICAgICAgIG91dC5tMDMgPSAwO1xyXG4gICAgICAgIG91dC5tMDQgPSB4MTtcclxuICAgICAgICBvdXQubTA1ID0geTE7XHJcbiAgICAgICAgb3V0Lm0wNiA9IHoxO1xyXG4gICAgICAgIG91dC5tMDcgPSAwO1xyXG4gICAgICAgIG91dC5tMDggPSB4MjtcclxuICAgICAgICBvdXQubTA5ID0geTI7XHJcbiAgICAgICAgb3V0Lm0xMCA9IHoyO1xyXG4gICAgICAgIG91dC5tMTEgPSAwO1xyXG4gICAgICAgIG91dC5tMTIgPSAtKHgwICogZXlleCArIHgxICogZXlleSArIHgyICogZXlleik7XHJcbiAgICAgICAgb3V0Lm0xMyA9IC0oeTAgKiBleWV4ICsgeTEgKiBleWV5ICsgeTIgKiBleWV6KTtcclxuICAgICAgICBvdXQubTE0ID0gLSh6MCAqIGV5ZXggKyB6MSAqIGV5ZXkgKyB6MiAqIGV5ZXopO1xyXG4gICAgICAgIG91dC5tMTUgPSAxO1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGludmVyc2UgdHJhbnNwb3NlIG9mIGEgbWF0cml4IGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXhcclxuICAgICAqIEB6aCDorqHnrpfpgIbovaznva7nn6npmLVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnZlcnNlVHJhbnNwb3NlIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgY29uc3QgYTAwID0gYS5tMDA7IGNvbnN0IGEwMSA9IGEubTAxOyBjb25zdCBhMDIgPSBhLm0wMjsgY29uc3QgYTAzID0gYS5tMDM7XHJcbiAgICAgICAgY29uc3QgYTEwID0gYS5tMDQ7IGNvbnN0IGExMSA9IGEubTA1OyBjb25zdCBhMTIgPSBhLm0wNjsgY29uc3QgYTEzID0gYS5tMDc7XHJcbiAgICAgICAgY29uc3QgYTIwID0gYS5tMDg7IGNvbnN0IGEyMSA9IGEubTA5OyBjb25zdCBhMjIgPSBhLm0xMDsgY29uc3QgYTIzID0gYS5tMTE7XHJcbiAgICAgICAgY29uc3QgYTMwID0gYS5tMTI7IGNvbnN0IGEzMSA9IGEubTEzOyBjb25zdCBhMzIgPSBhLm0xNDsgY29uc3QgYTMzID0gYS5tMTU7XHJcblxyXG4gICAgICAgIGNvbnN0IGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMDtcclxuICAgICAgICBjb25zdCBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XHJcbiAgICAgICAgY29uc3QgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwO1xyXG4gICAgICAgIGNvbnN0IGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMTtcclxuICAgICAgICBjb25zdCBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XHJcbiAgICAgICAgY29uc3QgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyO1xyXG4gICAgICAgIGNvbnN0IGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMDtcclxuICAgICAgICBjb25zdCBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XHJcbiAgICAgICAgY29uc3QgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwO1xyXG4gICAgICAgIGNvbnN0IGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMTtcclxuICAgICAgICBjb25zdCBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XHJcbiAgICAgICAgY29uc3QgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XHJcbiAgICAgICAgbGV0IGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcclxuXHJcbiAgICAgICAgaWYgKCFkZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRldCA9IDEuMCAvIGRldDtcclxuXHJcbiAgICAgICAgb3V0Lm0wMCA9IChhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDkpICogZGV0O1xyXG4gICAgICAgIG91dC5tMDEgPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcclxuICAgICAgICBvdXQubTAyID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XHJcbiAgICAgICAgb3V0Lm0wMyA9IDA7XHJcblxyXG4gICAgICAgIG91dC5tMDQgPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcclxuICAgICAgICBvdXQubTA1ID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XHJcbiAgICAgICAgb3V0Lm0wNiA9IChhMDEgKiBiMDggLSBhMDAgKiBiMTAgLSBhMDMgKiBiMDYpICogZGV0O1xyXG4gICAgICAgIG91dC5tMDcgPSAwO1xyXG5cclxuICAgICAgICBvdXQubTA4ID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XHJcbiAgICAgICAgb3V0Lm0wOSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xyXG4gICAgICAgIG91dC5tMTAgPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcclxuICAgICAgICBvdXQubTExID0gMDtcclxuXHJcbiAgICAgICAgb3V0Lm0xMiA9IDA7XHJcbiAgICAgICAgb3V0Lm0xMyA9IDA7XHJcbiAgICAgICAgb3V0Lm0xNCA9IDA7XHJcbiAgICAgICAgb3V0Lm0xNSA9IDE7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVHJhbnNmb3JtIGEgbWF0cml4IG9iamVjdCB0byBhIGZsYXQgYXJyYXlcclxuICAgICAqIEB6aCDnn6npmLXovazmlbDnu4RcclxuICAgICAqIEBwYXJhbSBvZnMgQXJyYXkgU3RhcnQgT2Zmc2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdG9BcnJheSA8T3V0PiAob3V0OiBPdXQsIG06IElNYXQ0TGlrZSwgb2ZzID0gMCkge1xyXG4gICAgICAgIG91dFtvZnMgKyAwXSA9IG0ubTAwO1xyXG4gICAgICAgIG91dFtvZnMgKyAxXSA9IG0ubTAxO1xyXG4gICAgICAgIG91dFtvZnMgKyAyXSA9IG0ubTAyO1xyXG4gICAgICAgIG91dFtvZnMgKyAzXSA9IG0ubTAzO1xyXG4gICAgICAgIG91dFtvZnMgKyA0XSA9IG0ubTA0O1xyXG4gICAgICAgIG91dFtvZnMgKyA1XSA9IG0ubTA1O1xyXG4gICAgICAgIG91dFtvZnMgKyA2XSA9IG0ubTA2O1xyXG4gICAgICAgIG91dFtvZnMgKyA3XSA9IG0ubTA3O1xyXG4gICAgICAgIG91dFtvZnMgKyA4XSA9IG0ubTA4O1xyXG4gICAgICAgIG91dFtvZnMgKyA5XSA9IG0ubTA5O1xyXG4gICAgICAgIG91dFtvZnMgKyAxMF0gPSBtLm0xMDtcclxuICAgICAgICBvdXRbb2ZzICsgMTFdID0gbS5tMTE7XHJcbiAgICAgICAgb3V0W29mcyArIDEyXSA9IG0ubTEyO1xyXG4gICAgICAgIG91dFtvZnMgKyAxM10gPSBtLm0xMztcclxuICAgICAgICBvdXRbb2ZzICsgMTRdID0gbS5tMTQ7XHJcbiAgICAgICAgb3V0W29mcyArIDE1XSA9IG0ubTE1O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gR2VuZXJhdGVzIG9yIHNldHMgYSBtYXRyaXggd2l0aCBhIGZsYXQgYXJyYXlcclxuICAgICAqIEB6aCDmlbDnu4Tovaznn6npmLVcclxuICAgICAqIEBwYXJhbSBvZnMgQXJyYXkgU3RhcnQgT2Zmc2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbUFycmF5IDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYXJyLCBvZnMgPSAwKSB7XHJcbiAgICAgICAgb3V0Lm0wMCA9IGFycltvZnMgKyAwXTtcclxuICAgICAgICBvdXQubTAxID0gYXJyW29mcyArIDFdO1xyXG4gICAgICAgIG91dC5tMDIgPSBhcnJbb2ZzICsgMl07XHJcbiAgICAgICAgb3V0Lm0wMyA9IGFycltvZnMgKyAzXTtcclxuICAgICAgICBvdXQubTA0ID0gYXJyW29mcyArIDRdO1xyXG4gICAgICAgIG91dC5tMDUgPSBhcnJbb2ZzICsgNV07XHJcbiAgICAgICAgb3V0Lm0wNiA9IGFycltvZnMgKyA2XTtcclxuICAgICAgICBvdXQubTA3ID0gYXJyW29mcyArIDddO1xyXG4gICAgICAgIG91dC5tMDggPSBhcnJbb2ZzICsgOF07XHJcbiAgICAgICAgb3V0Lm0wOSA9IGFycltvZnMgKyA5XTtcclxuICAgICAgICBvdXQubTEwID0gYXJyW29mcyArIDEwXTtcclxuICAgICAgICBvdXQubTExID0gYXJyW29mcyArIDExXTtcclxuICAgICAgICBvdXQubTEyID0gYXJyW29mcyArIDEyXTtcclxuICAgICAgICBvdXQubTEzID0gYXJyW29mcyArIDEzXTtcclxuICAgICAgICBvdXQubTE0ID0gYXJyW29mcyArIDE0XTtcclxuICAgICAgICBvdXQubTE1ID0gYXJyW29mcyArIDE1XTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEFkZHMgdHdvIG1hdHJpY2VzIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXhcclxuICAgICAqIEB6aCDpgJDlhYPntKDnn6npmLXliqDms5VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhZGQgPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIG91dC5tMDAgPSBhLm0wMCArIGIubTAwO1xyXG4gICAgICAgIG91dC5tMDEgPSBhLm0wMSArIGIubTAxO1xyXG4gICAgICAgIG91dC5tMDIgPSBhLm0wMiArIGIubTAyO1xyXG4gICAgICAgIG91dC5tMDMgPSBhLm0wMyArIGIubTAzO1xyXG4gICAgICAgIG91dC5tMDQgPSBhLm0wNCArIGIubTA0O1xyXG4gICAgICAgIG91dC5tMDUgPSBhLm0wNSArIGIubTA1O1xyXG4gICAgICAgIG91dC5tMDYgPSBhLm0wNiArIGIubTA2O1xyXG4gICAgICAgIG91dC5tMDcgPSBhLm0wNyArIGIubTA3O1xyXG4gICAgICAgIG91dC5tMDggPSBhLm0wOCArIGIubTA4O1xyXG4gICAgICAgIG91dC5tMDkgPSBhLm0wOSArIGIubTA5O1xyXG4gICAgICAgIG91dC5tMTAgPSBhLm0xMCArIGIubTEwO1xyXG4gICAgICAgIG91dC5tMTEgPSBhLm0xMSArIGIubTExO1xyXG4gICAgICAgIG91dC5tMTIgPSBhLm0xMiArIGIubTEyO1xyXG4gICAgICAgIG91dC5tMTMgPSBhLm0xMyArIGIubTEzO1xyXG4gICAgICAgIG91dC5tMTQgPSBhLm0xNCArIGIubTE0O1xyXG4gICAgICAgIG91dC5tMTUgPSBhLm0xNSArIGIubTE1O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU3VidHJhY3RzIG1hdHJpeCBiIGZyb20gbWF0cml4IGEgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IG1hdHJpeFxyXG4gICAgICogQHpoIOmAkOWFg+e0oOefqemYteWHj+azlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN1YnRyYWN0IDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBvdXQubTAwID0gYS5tMDAgLSBiLm0wMDtcclxuICAgICAgICBvdXQubTAxID0gYS5tMDEgLSBiLm0wMTtcclxuICAgICAgICBvdXQubTAyID0gYS5tMDIgLSBiLm0wMjtcclxuICAgICAgICBvdXQubTAzID0gYS5tMDMgLSBiLm0wMztcclxuICAgICAgICBvdXQubTA0ID0gYS5tMDQgLSBiLm0wNDtcclxuICAgICAgICBvdXQubTA1ID0gYS5tMDUgLSBiLm0wNTtcclxuICAgICAgICBvdXQubTA2ID0gYS5tMDYgLSBiLm0wNjtcclxuICAgICAgICBvdXQubTA3ID0gYS5tMDcgLSBiLm0wNztcclxuICAgICAgICBvdXQubTA4ID0gYS5tMDggLSBiLm0wODtcclxuICAgICAgICBvdXQubTA5ID0gYS5tMDkgLSBiLm0wOTtcclxuICAgICAgICBvdXQubTEwID0gYS5tMTAgLSBiLm0xMDtcclxuICAgICAgICBvdXQubTExID0gYS5tMTEgLSBiLm0xMTtcclxuICAgICAgICBvdXQubTEyID0gYS5tMTIgLSBiLm0xMjtcclxuICAgICAgICBvdXQubTEzID0gYS5tMTMgLSBiLm0xMztcclxuICAgICAgICBvdXQubTE0ID0gYS5tMTQgLSBiLm0xNDtcclxuICAgICAgICBvdXQubTE1ID0gYS5tMTUgLSBiLm0xNTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIE11bHRpcGx5IGVhY2ggZWxlbWVudCBvZiBhIG1hdHJpeCBieSBhIHNjYWxhciBudW1iZXIgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IG1hdHJpeFxyXG4gICAgICogQHpoIOefqemYteagh+mHj+S5mOazlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG11bHRpcGx5U2NhbGFyIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBudW1iZXIpIHtcclxuICAgICAgICBvdXQubTAwID0gYS5tMDAgKiBiO1xyXG4gICAgICAgIG91dC5tMDEgPSBhLm0wMSAqIGI7XHJcbiAgICAgICAgb3V0Lm0wMiA9IGEubTAyICogYjtcclxuICAgICAgICBvdXQubTAzID0gYS5tMDMgKiBiO1xyXG4gICAgICAgIG91dC5tMDQgPSBhLm0wNCAqIGI7XHJcbiAgICAgICAgb3V0Lm0wNSA9IGEubTA1ICogYjtcclxuICAgICAgICBvdXQubTA2ID0gYS5tMDYgKiBiO1xyXG4gICAgICAgIG91dC5tMDcgPSBhLm0wNyAqIGI7XHJcbiAgICAgICAgb3V0Lm0wOCA9IGEubTA4ICogYjtcclxuICAgICAgICBvdXQubTA5ID0gYS5tMDkgKiBiO1xyXG4gICAgICAgIG91dC5tMTAgPSBhLm0xMCAqIGI7XHJcbiAgICAgICAgb3V0Lm0xMSA9IGEubTExICogYjtcclxuICAgICAgICBvdXQubTEyID0gYS5tMTIgKiBiO1xyXG4gICAgICAgIG91dC5tMTMgPSBhLm0xMyAqIGI7XHJcbiAgICAgICAgb3V0Lm0xNCA9IGEubTE0ICogYjtcclxuICAgICAgICBvdXQubTE1ID0gYS5tMTUgKiBiO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQWRkcyB0d28gbWF0cmljZXMgYWZ0ZXIgbXVsdGlwbHlpbmcgZWFjaCBlbGVtZW50IG9mIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciBudW1iZXIuIEFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXguXHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg55+p6Zi15qCH6YeP5LmY5YqgOiBBICsgQiAqIHNjYWxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbXVsdGlwbHlTY2FsYXJBbmRBZGQgPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgc2NhbGU6IG51bWJlcikge1xyXG4gICAgICAgIG91dC5tMDAgPSBhLm0wMCArIChiLm0wMCAqIHNjYWxlKTtcclxuICAgICAgICBvdXQubTAxID0gYS5tMDEgKyAoYi5tMDEgKiBzY2FsZSk7XHJcbiAgICAgICAgb3V0Lm0wMiA9IGEubTAyICsgKGIubTAyICogc2NhbGUpO1xyXG4gICAgICAgIG91dC5tMDMgPSBhLm0wMyArIChiLm0wMyAqIHNjYWxlKTtcclxuICAgICAgICBvdXQubTA0ID0gYS5tMDQgKyAoYi5tMDQgKiBzY2FsZSk7XHJcbiAgICAgICAgb3V0Lm0wNSA9IGEubTA1ICsgKGIubTA1ICogc2NhbGUpO1xyXG4gICAgICAgIG91dC5tMDYgPSBhLm0wNiArIChiLm0wNiAqIHNjYWxlKTtcclxuICAgICAgICBvdXQubTA3ID0gYS5tMDcgKyAoYi5tMDcgKiBzY2FsZSk7XHJcbiAgICAgICAgb3V0Lm0wOCA9IGEubTA4ICsgKGIubTA4ICogc2NhbGUpO1xyXG4gICAgICAgIG91dC5tMDkgPSBhLm0wOSArIChiLm0wOSAqIHNjYWxlKTtcclxuICAgICAgICBvdXQubTEwID0gYS5tMTAgKyAoYi5tMTAgKiBzY2FsZSk7XHJcbiAgICAgICAgb3V0Lm0xMSA9IGEubTExICsgKGIubTExICogc2NhbGUpO1xyXG4gICAgICAgIG91dC5tMTIgPSBhLm0xMiArIChiLm0xMiAqIHNjYWxlKTtcclxuICAgICAgICBvdXQubTEzID0gYS5tMTMgKyAoYi5tMTMgKiBzY2FsZSk7XHJcbiAgICAgICAgb3V0Lm0xNCA9IGEubTE0ICsgKGIubTE0ICogc2NhbGUpO1xyXG4gICAgICAgIG91dC5tMTUgPSBhLm0xNSArIChiLm0xNSAqIHNjYWxlKTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFJldHVybnMgd2hldGhlciB0aGUgc3BlY2lmaWVkIG1hdHJpY2VzIGFyZSBlcXVhbC5cclxuICAgICAqIEB6aCDnn6npmLXnrYnku7fliKTmlq1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzdHJpY3RFcXVhbHMgPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGEubTAwID09PSBiLm0wMCAmJiBhLm0wMSA9PT0gYi5tMDEgJiYgYS5tMDIgPT09IGIubTAyICYmIGEubTAzID09PSBiLm0wM1xyXG4gICAgICAgICAgICAmJiBhLm0wNCA9PT0gYi5tMDQgJiYgYS5tMDUgPT09IGIubTA1ICYmIGEubTA2ID09PSBiLm0wNiAmJiBhLm0wNyA9PT0gYi5tMDdcclxuICAgICAgICAgICAgJiYgYS5tMDggPT09IGIubTA4ICYmIGEubTA5ID09PSBiLm0wOSAmJiBhLm0xMCA9PT0gYi5tMTAgJiYgYS5tMTEgPT09IGIubTExXHJcbiAgICAgICAgICAgICYmIGEubTEyID09PSBiLm0xMiAmJiBhLm0xMyA9PT0gYi5tMTMgJiYgYS5tMTQgPT09IGIubTE0ICYmIGEubTE1ID09PSBiLm0xNTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBSZXR1cm5zIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBtYXRyaWNlcyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbC5cclxuICAgICAqIEB6aCDmjpLpmaTmta7ngrnmlbDor6/lt67nmoTnn6npmLXov5HkvLznrYnku7fliKTmlq1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBlcXVhbHMgPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uID0gRVBTSUxPTikge1xyXG4gICAgICAgIC8vIFRBT0NQIHZvbC4yLCAzcmQgZWQuLCBzLjQuMi40LCBwLjIxMy0yMjVcclxuICAgICAgICAvLyBkZWZpbmVzIGEgJ2Nsb3NlIGVub3VnaCcgcmVsYXRpb25zaGlwIGJldHdlZW4gdSBhbmQgdiB0aGF0IHNjYWxlcyBmb3IgbWFnbml0dWRlXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgTWF0aC5hYnMoYS5tMDAgLSBiLm0wMCkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMDApLCBNYXRoLmFicyhiLm0wMCkpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEubTAxIC0gYi5tMDEpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTAxKSwgTWF0aC5hYnMoYi5tMDEpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0wMiAtIGIubTAyKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0wMiksIE1hdGguYWJzKGIubTAyKSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5tMDMgLSBiLm0wMykgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMDMpLCBNYXRoLmFicyhiLm0wMykpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEubTA0IC0gYi5tMDQpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTA0KSwgTWF0aC5hYnMoYi5tMDQpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0wNSAtIGIubTA1KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0wNSksIE1hdGguYWJzKGIubTA1KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5tMDYgLSBiLm0wNikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMDYpLCBNYXRoLmFicyhiLm0wNikpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEubTA3IC0gYi5tMDcpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTA3KSwgTWF0aC5hYnMoYi5tMDcpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0wOCAtIGIubTA4KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0wOCksIE1hdGguYWJzKGIubTA4KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5tMDkgLSBiLm0wOSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMDkpLCBNYXRoLmFicyhiLm0wOSkpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEubTEwIC0gYi5tMTApIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTEwKSwgTWF0aC5hYnMoYi5tMTApKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0xMSAtIGIubTExKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0xMSksIE1hdGguYWJzKGIubTExKSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5tMTIgLSBiLm0xMikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMTIpLCBNYXRoLmFicyhiLm0xMikpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEubTEzIC0gYi5tMTMpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTEzKSwgTWF0aC5hYnMoYi5tMTMpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0xNCAtIGIubTE0KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0xNCksIE1hdGguYWJzKGIubTE0KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5tMTUgLSBiLm0xNSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMTUpLCBNYXRoLmFicyhiLm0xNSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMCByb3cgMCBvZiB0aGUgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteesrCAwIOWIl+esrCAwIOihjOeahOWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbTAwOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVmFsdWUgYXQgY29sdW1uIDAgcm93IDEgb2YgdGhlIG1hdHJpeC5cclxuICAgICAqIEB6aCDnn6npmLXnrKwgMCDliJfnrKwgMSDooYznmoTlhYPntKDjgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG0wMTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFZhbHVlIGF0IGNvbHVtbiAwIHJvdyAyIG9mIHRoZSBtYXRyaXguXHJcbiAgICAgKiBAemgg55+p6Zi156ysIDAg5YiX56ysIDIg6KGM55qE5YWD57Sg44CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtMDI6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMCByb3cgMyBvZiB0aGUgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteesrCAwIOWIl+esrCAzIOihjOeahOWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbTAzOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVmFsdWUgYXQgY29sdW1uIDEgcm93IDAgb2YgdGhlIG1hdHJpeC5cclxuICAgICAqIEB6aCDnn6npmLXnrKwgMSDliJfnrKwgMCDooYznmoTlhYPntKDjgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG0wNDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFZhbHVlIGF0IGNvbHVtbiAxIHJvdyAxIG9mIHRoZSBtYXRyaXguXHJcbiAgICAgKiBAemgg55+p6Zi156ysIDEg5YiX56ysIDEg6KGM55qE5YWD57Sg44CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtMDU6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMSByb3cgMiBvZiB0aGUgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteesrCAxIOWIl+esrCAyIOihjOeahOWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbTA2OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVmFsdWUgYXQgY29sdW1uIDEgcm93IDMgb2YgdGhlIG1hdHJpeC5cclxuICAgICAqIEB6aCDnn6npmLXnrKwgMSDliJfnrKwgMyDooYznmoTlhYPntKDjgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG0wNzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFZhbHVlIGF0IGNvbHVtbiAyIHJvdyAwIG9mIHRoZSBtYXRyaXguXHJcbiAgICAgKiBAemgg55+p6Zi156ysIDIg5YiX56ysIDAg6KGM55qE5YWD57Sg44CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtMDg6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMiByb3cgMSBvZiB0aGUgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteesrCAyIOWIl+esrCAxIOihjOeahOWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbTA5OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVmFsdWUgYXQgY29sdW1uIDIgcm93IDIgb2YgdGhlIG1hdHJpeC5cclxuICAgICAqIEB6aCDnn6npmLXnrKwgMiDliJfnrKwgMiDooYznmoTlhYPntKDjgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG0xMDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFZhbHVlIGF0IGNvbHVtbiAyIHJvdyAzIG9mIHRoZSBtYXRyaXguXHJcbiAgICAgKiBAemgg55+p6Zi156ysIDIg5YiX56ysIDMg6KGM55qE5YWD57Sg44CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtMTE6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMyByb3cgMCBvZiB0aGUgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteesrCAzIOWIl+esrCAwIOihjOeahOWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbTEyOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVmFsdWUgYXQgY29sdW1uIDMgcm93IDEgb2YgdGhlIG1hdHJpeC5cclxuICAgICAqIEB6aCDnn6npmLXnrKwgMyDliJfnrKwgMSDooYznmoTlhYPntKDjgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG0xMzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFZhbHVlIGF0IGNvbHVtbiAzIHJvdyAyIG9mIHRoZSBtYXRyaXguXHJcbiAgICAgKiBAemgg55+p6Zi156ysIDMg5YiX56ysIDIg6KGM55qE5YWD57Sg44CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtMTQ6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMyByb3cgMyBvZiB0aGUgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteesrCAzIOWIl+esrCAzIOihjOeahOWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbTE1OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG90aGVyOiBNYXQ0KTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoXHJcbiAgICAgICAgbTAwPzogbnVtYmVyLCBtMDE/OiBudW1iZXIsIG0wMj86IG51bWJlciwgbTAzPzogbnVtYmVyLFxyXG4gICAgICAgIG0wND86IG51bWJlciwgbTA1PzogbnVtYmVyLCBtMDY/OiBudW1iZXIsIG0wNz86IG51bWJlcixcclxuICAgICAgICBtMDg/OiBudW1iZXIsIG0wOT86IG51bWJlciwgbTEwPzogbnVtYmVyLCBtMTE/OiBudW1iZXIsXHJcbiAgICAgICAgbTEyPzogbnVtYmVyLCBtMTM/OiBudW1iZXIsIG0xND86IG51bWJlciwgbTE1PzogbnVtYmVyKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoXHJcbiAgICAgICAgbTAwOiBNYXQ0IHwgbnVtYmVyID0gMSwgbTAxID0gMCwgbTAyID0gMCwgbTAzID0gMCxcclxuICAgICAgICBtMDQgPSAwLCBtMDUgPSAxLCBtMDYgPSAwLCBtMDcgPSAwLFxyXG4gICAgICAgIG0wOCA9IDAsIG0wOSA9IDAsIG0xMCA9IDEsIG0xMSA9IDAsXHJcbiAgICAgICAgbTEyID0gMCwgbTEzID0gMCwgbTE0ID0gMCwgbTE1ID0gMSxcclxuICAgICkge1xyXG4gICAgICAgIC8vc3VwZXIoKTtcclxuICAgICAgICBpZiAodHlwZW9mIG0wMCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgdGhpcy5tMDAgPSBtMDAubTAwOyB0aGlzLm0wMSA9IG0wMC5tMDE7IHRoaXMubTAyID0gbTAwLm0wMjsgdGhpcy5tMDMgPSBtMDAubTAzO1xyXG4gICAgICAgICAgICB0aGlzLm0wNCA9IG0wMC5tMDQ7IHRoaXMubTA1ID0gbTAwLm0wNTsgdGhpcy5tMDYgPSBtMDAubTA2OyB0aGlzLm0wNyA9IG0wMC5tMDc7XHJcbiAgICAgICAgICAgIHRoaXMubTA4ID0gbTAwLm0wODsgdGhpcy5tMDkgPSBtMDAubTA5OyB0aGlzLm0xMCA9IG0wMC5tMTA7IHRoaXMubTExID0gbTAwLm0xMTtcclxuICAgICAgICAgICAgdGhpcy5tMTIgPSBtMDAubTEyOyB0aGlzLm0xMyA9IG0wMC5tMTM7IHRoaXMubTE0ID0gbTAwLm0xNDsgdGhpcy5tMTUgPSBtMDAubTE1O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubTAwID0gbTAwOyB0aGlzLm0wMSA9IG0wMTsgdGhpcy5tMDIgPSBtMDI7IHRoaXMubTAzID0gbTAzO1xyXG4gICAgICAgICAgICB0aGlzLm0wNCA9IG0wNDsgdGhpcy5tMDUgPSBtMDU7IHRoaXMubTA2ID0gbTA2OyB0aGlzLm0wNyA9IG0wNztcclxuICAgICAgICAgICAgdGhpcy5tMDggPSBtMDg7IHRoaXMubTA5ID0gbTA5OyB0aGlzLm0xMCA9IG0xMDsgdGhpcy5tMTEgPSBtMTE7XHJcbiAgICAgICAgICAgIHRoaXMubTEyID0gbTEyOyB0aGlzLm0xMyA9IG0xMzsgdGhpcy5tMTQgPSBtMTQ7IHRoaXMubTE1ID0gbTE1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDbG9uZSBhIG5ldyBtYXRyaXggZnJvbSB0aGUgY3VycmVudCBtYXRyaXguXHJcbiAgICAgKiBAemgg5YWL6ZqG5b2T5YmN55+p6Zi144CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9uZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXQ0KFxyXG4gICAgICAgICAgICB0aGlzLm0wMCwgdGhpcy5tMDEsIHRoaXMubTAyLCB0aGlzLm0wMyxcclxuICAgICAgICAgICAgdGhpcy5tMDQsIHRoaXMubTA1LCB0aGlzLm0wNiwgdGhpcy5tMDcsXHJcbiAgICAgICAgICAgIHRoaXMubTA4LCB0aGlzLm0wOSwgdGhpcy5tMTAsIHRoaXMubTExLFxyXG4gICAgICAgICAgICB0aGlzLm0xMiwgdGhpcy5tMTMsIHRoaXMubTE0LCB0aGlzLm0xNSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFNldHMgdGhlIG1hdHJpeCB3aXRoIGFub3RoZXIgb25lJ3MgdmFsdWUuXHJcbiAgICAgKiBAemgg6K6+572u5b2T5YmN55+p6Zi15L2/5YW25LiO5oyH5a6a55+p6Zi155u4562J44CCXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgU3BlY2lmaWVkIG1hdHJpeC5cclxuICAgICAqIEByZXR1cm4gdGhpc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IChvdGhlcjogTWF0NCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0IHRoZSBtYXRyaXggd2l0aCB2YWx1ZXMgb2YgYWxsIGVsZW1lbnRzXHJcbiAgICAgKiBAemgg6K6+572u5b2T5YmN55+p6Zi15oyH5a6a5YWD57Sg5YC844CCXHJcbiAgICAgKiBAcmV0dXJuIHRoaXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCAoXHJcbiAgICAgICAgbTAwPzogbnVtYmVyLCBtMDE/OiBudW1iZXIsIG0wMj86IG51bWJlciwgbTAzPzogbnVtYmVyLFxyXG4gICAgICAgIG0wND86IG51bWJlciwgbTA1PzogbnVtYmVyLCBtMDY/OiBudW1iZXIsIG0wNz86IG51bWJlcixcclxuICAgICAgICBtMDg/OiBudW1iZXIsIG0wOT86IG51bWJlciwgbTEwPzogbnVtYmVyLCBtMTE/OiBudW1iZXIsXHJcbiAgICAgICAgbTEyPzogbnVtYmVyLCBtMTM/OiBudW1iZXIsIG0xND86IG51bWJlciwgbTE1PzogbnVtYmVyKTtcclxuXHJcbiAgICBwdWJsaWMgc2V0IChtMDA6IE1hdDQgfCBudW1iZXIgPSAxLCBtMDEgPSAwLCBtMDIgPSAwLCBtMDMgPSAwLFxyXG4gICAgICAgIG0wNCA9IDAsIG0wNSA9IDEsIG0wNiA9IDAsIG0wNyA9IDAsXHJcbiAgICAgICAgbTA4ID0gMCwgbTA5ID0gMCwgbTEwID0gMSwgbTExID0gMCxcclxuICAgICAgICBtMTIgPSAwLCBtMTMgPSAwLCBtMTQgPSAwLCBtMTUgPSAxKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBtMDAgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubTAxID0gbTAwLm0wMTsgdGhpcy5tMDIgPSBtMDAubTAyOyB0aGlzLm0wMyA9IG0wMC5tMDM7IHRoaXMubTA0ID0gbTAwLm0wNDtcclxuICAgICAgICAgICAgdGhpcy5tMDUgPSBtMDAubTA1OyB0aGlzLm0wNiA9IG0wMC5tMDY7IHRoaXMubTA3ID0gbTAwLm0wNzsgdGhpcy5tMDggPSBtMDAubTA4O1xyXG4gICAgICAgICAgICB0aGlzLm0wOSA9IG0wMC5tMDk7IHRoaXMubTEwID0gbTAwLm0xMDsgdGhpcy5tMTEgPSBtMDAubTExOyB0aGlzLm0xMiA9IG0wMC5tMTI7XHJcbiAgICAgICAgICAgIHRoaXMubTEzID0gbTAwLm0xMzsgdGhpcy5tMTQgPSBtMDAubTE0OyB0aGlzLm0xNSA9IG0wMC5tMTU7IHRoaXMubTAwID0gbTAwLm0wMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm0wMSA9IG0wMTsgdGhpcy5tMDIgPSBtMDI7IHRoaXMubTAzID0gbTAzOyB0aGlzLm0wNCA9IG0wNDtcclxuICAgICAgICAgICAgdGhpcy5tMDUgPSBtMDU7IHRoaXMubTA2ID0gbTA2OyB0aGlzLm0wNyA9IG0wNzsgdGhpcy5tMDggPSBtMDg7XHJcbiAgICAgICAgICAgIHRoaXMubTA5ID0gbTA5OyB0aGlzLm0xMCA9IG0xMDsgdGhpcy5tMTEgPSBtMTE7IHRoaXMubTEyID0gbTEyO1xyXG4gICAgICAgICAgICB0aGlzLm0xMyA9IG0xMzsgdGhpcy5tMTQgPSBtMTQ7IHRoaXMubTE1ID0gbTE1OyB0aGlzLm0wMCA9IG0wMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gUmV0dXJucyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgbWF0cmljZXMgYXJlIGFwcHJveGltYXRlbHkgZXF1YWwuXHJcbiAgICAgKiBAemgg5Yik5pat5b2T5YmN55+p6Zi15piv5ZCm5Zyo6K+v5beu6IyD5Zu05YaF5LiO5oyH5a6a55+p6Zi155u4562J44CCXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgQ29tcGFyYXRpdmUgbWF0cml4XHJcbiAgICAgKiBAcGFyYW0gZXBzaWxvbiBUaGUgZXJyb3IgYWxsb3dlZC4gSXRgcyBzaG91bGQgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLlxyXG4gICAgICogQHJldHVybiBSZXR1cm5zIGB0cnVlJyB3aGVuIHRoZSBlbGVtZW50cyBvZiBib3RoIG1hdHJpY2VzIGFyZSBlcXVhbDsgb3RoZXJ3aXNlIHJldHVybnMgYGZhbHNlJy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGVxdWFscyAob3RoZXI6IE1hdDQsIGVwc2lsb24gPSBFUFNJTE9OKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy5tMDAgLSBvdGhlci5tMDApIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTAwKSwgTWF0aC5hYnMob3RoZXIubTAwKSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMDEgLSBvdGhlci5tMDEpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTAxKSwgTWF0aC5hYnMob3RoZXIubTAxKSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMDIgLSBvdGhlci5tMDIpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTAyKSwgTWF0aC5hYnMob3RoZXIubTAyKSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMDMgLSBvdGhlci5tMDMpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTAzKSwgTWF0aC5hYnMob3RoZXIubTAzKSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMDQgLSBvdGhlci5tMDQpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTA0KSwgTWF0aC5hYnMob3RoZXIubTA0KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMDUgLSBvdGhlci5tMDUpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTA1KSwgTWF0aC5hYnMob3RoZXIubTA1KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMDYgLSBvdGhlci5tMDYpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTA2KSwgTWF0aC5hYnMob3RoZXIubTA2KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMDcgLSBvdGhlci5tMDcpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTA3KSwgTWF0aC5hYnMob3RoZXIubTA3KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMDggLSBvdGhlci5tMDgpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTA4KSwgTWF0aC5hYnMob3RoZXIubTA4KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMDkgLSBvdGhlci5tMDkpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTA5KSwgTWF0aC5hYnMob3RoZXIubTA5KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMTAgLSBvdGhlci5tMTApIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTEwKSwgTWF0aC5hYnMob3RoZXIubTEwKSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMTEgLSBvdGhlci5tMTEpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTExKSwgTWF0aC5hYnMob3RoZXIubTExKSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMTIgLSBvdGhlci5tMTIpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTEyKSwgTWF0aC5hYnMob3RoZXIubTEyKSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMTMgLSBvdGhlci5tMTMpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTEzKSwgTWF0aC5hYnMob3RoZXIubTEzKSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMTQgLSBvdGhlci5tMTQpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTE0KSwgTWF0aC5hYnMob3RoZXIubTE0KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMTUgLSBvdGhlci5tMTUpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTE1KSwgTWF0aC5hYnMob3RoZXIubTE1KSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFJldHVybnMgd2hldGhlciB0aGUgc3BlY2lmaWVkIG1hdHJpY2VzIGFyZSBlcXVhbC5cclxuICAgICAqIEB6aCDliKTmlq3lvZPliY3nn6npmLXmmK/lkKbkuI7mjIflrprnn6npmLXnm7jnrYnjgIJcclxuICAgICAqIEBwYXJhbSBvdGhlciBDb21wYXJhdGl2ZSBtYXRyaXhcclxuICAgICAqIEByZXR1cm4gUmV0dXJucyBgdHJ1ZScgd2hlbiB0aGUgZWxlbWVudHMgb2YgYm90aCBtYXRyaWNlcyBhcmUgZXF1YWw7IG90aGVyd2lzZSByZXR1cm5zIGBmYWxzZScuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdHJpY3RFcXVhbHMgKG90aGVyOiBNYXQ0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubTAwID09PSBvdGhlci5tMDAgJiYgdGhpcy5tMDEgPT09IG90aGVyLm0wMSAmJiB0aGlzLm0wMiA9PT0gb3RoZXIubTAyICYmIHRoaXMubTAzID09PSBvdGhlci5tMDNcclxuICAgICAgICAgICAgJiYgdGhpcy5tMDQgPT09IG90aGVyLm0wNCAmJiB0aGlzLm0wNSA9PT0gb3RoZXIubTA1ICYmIHRoaXMubTA2ID09PSBvdGhlci5tMDYgJiYgdGhpcy5tMDcgPT09IG90aGVyLm0wN1xyXG4gICAgICAgICAgICAmJiB0aGlzLm0wOCA9PT0gb3RoZXIubTA4ICYmIHRoaXMubTA5ID09PSBvdGhlci5tMDkgJiYgdGhpcy5tMTAgPT09IG90aGVyLm0xMCAmJiB0aGlzLm0xMSA9PT0gb3RoZXIubTExXHJcbiAgICAgICAgICAgICYmIHRoaXMubTEyID09PSBvdGhlci5tMTIgJiYgdGhpcy5tMTMgPT09IG90aGVyLm0xMyAmJiB0aGlzLm0xNCA9PT0gb3RoZXIubTE0ICYmIHRoaXMubTE1ID09PSBvdGhlci5tMTU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdHJpeC5cclxuICAgICAqIEB6aCDov5Tlm57lvZPliY3nn6npmLXnmoTlrZfnrKbkuLLooajnpLrjgIJcclxuICAgICAqIEByZXR1cm4g5b2T5YmN55+p6Zi155qE5a2X56ym5Liy6KGo56S644CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b1N0cmluZyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBbXFxuJHtcclxuICAgICAgICAgICAgdGhpcy5tMDB9LCAke3RoaXMubTAxfSwgJHt0aGlzLm0wMn0sICR7dGhpcy5tMDN9LFxcbiR7XHJcbiAgICAgICAgICAgIHRoaXMubTA0fSwgJHt0aGlzLm0wNX0sICR7dGhpcy5tMDZ9LCAke3RoaXMubTA3fSxcXG4ke1xyXG4gICAgICAgICAgICB0aGlzLm0wOH0sICR7dGhpcy5tMDl9LCAke3RoaXMubTEwfSwgJHt0aGlzLm0xMX0sXFxuJHtcclxuICAgICAgICAgICAgdGhpcy5tMTJ9LCAke3RoaXMubTEzfSwgJHt0aGlzLm0xNH0sICR7dGhpcy5tMTV9XFxuYFxyXG4gICAgICAgICAgICArICddJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBzZXQgdGhlIGN1cnJlbnQgbWF0cml4IHRvIGFuIGlkZW50aXR5IG1hdHJpeC5cclxuICAgICAqIEB6aCDlsIblvZPliY3nn6npmLXorr7kuLrljZXkvY3nn6npmLXjgIJcclxuICAgICAqIEByZXR1cm4gYHRoaXNgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpZGVudGl0eSAoKSB7XHJcbiAgICAgICAgdGhpcy5tMDAgPSAxO1xyXG4gICAgICAgIHRoaXMubTAxID0gMDtcclxuICAgICAgICB0aGlzLm0wMiA9IDA7XHJcbiAgICAgICAgdGhpcy5tMDMgPSAwO1xyXG4gICAgICAgIHRoaXMubTA0ID0gMDtcclxuICAgICAgICB0aGlzLm0wNSA9IDE7XHJcbiAgICAgICAgdGhpcy5tMDYgPSAwO1xyXG4gICAgICAgIHRoaXMubTA3ID0gMDtcclxuICAgICAgICB0aGlzLm0wOCA9IDA7XHJcbiAgICAgICAgdGhpcy5tMDkgPSAwO1xyXG4gICAgICAgIHRoaXMubTEwID0gMTtcclxuICAgICAgICB0aGlzLm0xMSA9IDA7XHJcbiAgICAgICAgdGhpcy5tMTIgPSAwO1xyXG4gICAgICAgIHRoaXMubTEzID0gMDtcclxuICAgICAgICB0aGlzLm0xNCA9IDA7XHJcbiAgICAgICAgdGhpcy5tMTUgPSAxO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIHNldCB0aGUgY3VycmVudCBtYXRyaXggdG8gYW4gemVybyBtYXRyaXguXHJcbiAgICAgKiBAemgg5bCG5b2T5YmN55+p6Zi16K6+5Li6IDDnn6npmLXjgIJcclxuICAgICAqIEByZXR1cm4gYHRoaXNgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB6ZXJvICgpIHtcclxuICAgICAgICB0aGlzLm0wMCA9IDA7XHJcbiAgICAgICAgdGhpcy5tMDEgPSAwO1xyXG4gICAgICAgIHRoaXMubTAyID0gMDtcclxuICAgICAgICB0aGlzLm0wMyA9IDA7XHJcbiAgICAgICAgdGhpcy5tMDQgPSAwO1xyXG4gICAgICAgIHRoaXMubTA1ID0gMDtcclxuICAgICAgICB0aGlzLm0wNiA9IDA7XHJcbiAgICAgICAgdGhpcy5tMDcgPSAwO1xyXG4gICAgICAgIHRoaXMubTA4ID0gMDtcclxuICAgICAgICB0aGlzLm0wOSA9IDA7XHJcbiAgICAgICAgdGhpcy5tMTAgPSAwO1xyXG4gICAgICAgIHRoaXMubTExID0gMDtcclxuICAgICAgICB0aGlzLm0xMiA9IDA7XHJcbiAgICAgICAgdGhpcy5tMTMgPSAwO1xyXG4gICAgICAgIHRoaXMubTE0ID0gMDtcclxuICAgICAgICB0aGlzLm0xNSA9IDA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVHJhbnNwb3NlcyB0aGUgY3VycmVudCBtYXRyaXguXHJcbiAgICAgKiBAemgg6K6h566X5b2T5YmN55+p6Zi155qE6L2s572u55+p6Zi144CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0cmFuc3Bvc2UgKCkge1xyXG4gICAgICAgIGNvbnN0IGEwMSA9IHRoaXMubTAxOyBjb25zdCBhMDIgPSB0aGlzLm0wMjsgY29uc3QgYTAzID0gdGhpcy5tMDM7IGNvbnN0IGExMiA9IHRoaXMubTA2OyBjb25zdCBhMTMgPSB0aGlzLm0wNzsgY29uc3QgYTIzID0gdGhpcy5tMTE7XHJcbiAgICAgICAgdGhpcy5tMDEgPSB0aGlzLm0wNDtcclxuICAgICAgICB0aGlzLm0wMiA9IHRoaXMubTA4O1xyXG4gICAgICAgIHRoaXMubTAzID0gdGhpcy5tMTI7XHJcbiAgICAgICAgdGhpcy5tMDQgPSBhMDE7XHJcbiAgICAgICAgdGhpcy5tMDYgPSB0aGlzLm0wOTtcclxuICAgICAgICB0aGlzLm0wNyA9IHRoaXMubTEzO1xyXG4gICAgICAgIHRoaXMubTA4ID0gYTAyO1xyXG4gICAgICAgIHRoaXMubTA5ID0gYTEyO1xyXG4gICAgICAgIHRoaXMubTExID0gdGhpcy5tMTQ7XHJcbiAgICAgICAgdGhpcy5tMTIgPSBhMDM7XHJcbiAgICAgICAgdGhpcy5tMTMgPSBhMTM7XHJcbiAgICAgICAgdGhpcy5tMTQgPSBhMjM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gSW52ZXJ0cyB0aGUgY3VycmVudCBtYXRyaXguIFdoZW4gbWF0cml4IGlzIG5vdCBpbnZlcnRpYmxlIHRoZSBtYXRyaXggd2lsbCBiZSBzZXQgdG8gemVyb3MuXHJcbiAgICAgKiBAemgg6K6h566X5b2T5YmN55+p6Zi155qE6YCG55+p6Zi144CC5rOo5oSP77yM5Zyo55+p6Zi15LiN5Y+v6YCG5pe277yM5Lya6L+U5Zue5LiA5Liq5YWo5Li6IDAg55qE55+p6Zi144CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbnZlcnQgKCkge1xyXG4gICAgICAgIGNvbnN0IGEwMCA9IHRoaXMubTAwOyBjb25zdCBhMDEgPSB0aGlzLm0wMTsgY29uc3QgYTAyID0gdGhpcy5tMDI7IGNvbnN0IGEwMyA9IHRoaXMubTAzO1xyXG4gICAgICAgIGNvbnN0IGExMCA9IHRoaXMubTA0OyBjb25zdCBhMTEgPSB0aGlzLm0wNTsgY29uc3QgYTEyID0gdGhpcy5tMDY7IGNvbnN0IGExMyA9IHRoaXMubTA3O1xyXG4gICAgICAgIGNvbnN0IGEyMCA9IHRoaXMubTA4OyBjb25zdCBhMjEgPSB0aGlzLm0wOTsgY29uc3QgYTIyID0gdGhpcy5tMTA7IGNvbnN0IGEyMyA9IHRoaXMubTExO1xyXG4gICAgICAgIGNvbnN0IGEzMCA9IHRoaXMubTEyOyBjb25zdCBhMzEgPSB0aGlzLm0xMzsgY29uc3QgYTMyID0gdGhpcy5tMTQ7IGNvbnN0IGEzMyA9IHRoaXMubTE1O1xyXG5cclxuICAgICAgICBjb25zdCBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XHJcbiAgICAgICAgY29uc3QgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwO1xyXG4gICAgICAgIGNvbnN0IGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcclxuICAgICAgICBjb25zdCBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XHJcbiAgICAgICAgY29uc3QgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExO1xyXG4gICAgICAgIGNvbnN0IGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcclxuICAgICAgICBjb25zdCBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XHJcbiAgICAgICAgY29uc3QgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwO1xyXG4gICAgICAgIGNvbnN0IGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcclxuICAgICAgICBjb25zdCBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzE7XHJcbiAgICAgICAgY29uc3QgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxO1xyXG4gICAgICAgIGNvbnN0IGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxyXG4gICAgICAgIGxldCBkZXQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XHJcblxyXG4gICAgICAgIGlmIChkZXQgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXQoMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZXQgPSAxLjAgLyBkZXQ7XHJcblxyXG4gICAgICAgIHRoaXMubTAwID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XHJcbiAgICAgICAgdGhpcy5tMDEgPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcclxuICAgICAgICB0aGlzLm0wMiA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xyXG4gICAgICAgIHRoaXMubTAzID0gKGEyMiAqIGIwNCAtIGEyMSAqIGIwNSAtIGEyMyAqIGIwMykgKiBkZXQ7XHJcbiAgICAgICAgdGhpcy5tMDQgPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcclxuICAgICAgICB0aGlzLm0wNSA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xyXG4gICAgICAgIHRoaXMubTA2ID0gKGEzMiAqIGIwMiAtIGEzMCAqIGIwNSAtIGEzMyAqIGIwMSkgKiBkZXQ7XHJcbiAgICAgICAgdGhpcy5tMDcgPSAoYTIwICogYjA1IC0gYTIyICogYjAyICsgYTIzICogYjAxKSAqIGRldDtcclxuICAgICAgICB0aGlzLm0wOCA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xyXG4gICAgICAgIHRoaXMubTA5ID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XHJcbiAgICAgICAgdGhpcy5tMTAgPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcclxuICAgICAgICB0aGlzLm0xMSA9IChhMjEgKiBiMDIgLSBhMjAgKiBiMDQgLSBhMjMgKiBiMDApICogZGV0O1xyXG4gICAgICAgIHRoaXMubTEyID0gKGExMSAqIGIwNyAtIGExMCAqIGIwOSAtIGExMiAqIGIwNikgKiBkZXQ7XHJcbiAgICAgICAgdGhpcy5tMTMgPSAoYTAwICogYjA5IC0gYTAxICogYjA3ICsgYTAyICogYjA2KSAqIGRldDtcclxuICAgICAgICB0aGlzLm0xNCA9IChhMzEgKiBiMDEgLSBhMzAgKiBiMDMgLSBhMzIgKiBiMDApICogZGV0O1xyXG4gICAgICAgIHRoaXMubTE1ID0gKGEyMCAqIGIwMyAtIGEyMSAqIGIwMSArIGEyMiAqIGIwMCkgKiBkZXQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIHRoZSBjdXJyZW50IG1hdHJpeC5cclxuICAgICAqIEB6aCDorqHnrpflvZPliY3nn6npmLXnmoTooYzliJflvI/jgIJcclxuICAgICAqIEByZXR1cm4g5b2T5YmN55+p6Zi155qE6KGM5YiX5byP44CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXRlcm1pbmFudCAoKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBhMDAgPSB0aGlzLm0wMDsgY29uc3QgYTAxID0gdGhpcy5tMDE7IGNvbnN0IGEwMiA9IHRoaXMubTAyOyBjb25zdCBhMDMgPSB0aGlzLm0wMztcclxuICAgICAgICBjb25zdCBhMTAgPSB0aGlzLm0wNDsgY29uc3QgYTExID0gdGhpcy5tMDU7IGNvbnN0IGExMiA9IHRoaXMubTA2OyBjb25zdCBhMTMgPSB0aGlzLm0wNztcclxuICAgICAgICBjb25zdCBhMjAgPSB0aGlzLm0wODsgY29uc3QgYTIxID0gdGhpcy5tMDk7IGNvbnN0IGEyMiA9IHRoaXMubTEwOyBjb25zdCBhMjMgPSB0aGlzLm0xMTtcclxuICAgICAgICBjb25zdCBhMzAgPSB0aGlzLm0xMjsgY29uc3QgYTMxID0gdGhpcy5tMTM7IGNvbnN0IGEzMiA9IHRoaXMubTE0OyBjb25zdCBhMzMgPSB0aGlzLm0xNTtcclxuXHJcbiAgICAgICAgY29uc3QgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xyXG4gICAgICAgIGNvbnN0IGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMDtcclxuICAgICAgICBjb25zdCBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTA7XHJcbiAgICAgICAgY29uc3QgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xyXG4gICAgICAgIGNvbnN0IGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMTtcclxuICAgICAgICBjb25zdCBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTI7XHJcbiAgICAgICAgY29uc3QgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xyXG4gICAgICAgIGNvbnN0IGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMDtcclxuICAgICAgICBjb25zdCBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzA7XHJcbiAgICAgICAgY29uc3QgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xyXG4gICAgICAgIGNvbnN0IGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMTtcclxuICAgICAgICBjb25zdCBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcclxuICAgICAgICByZXR1cm4gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEFkZHMgdGhlIGN1cnJlbnQgbWF0cml4IGFuZCBhbm90aGVyIG1hdHJpeCB0byB0aGUgY3VycmVudCBtYXRyaXguXHJcbiAgICAgKiBAemgg55+p6Zi15Yqg5rOV44CC5bCG5b2T5YmN55+p6Zi15LiO5oyH5a6a55+p6Zi155qE55u45Yqg77yM57uT5p6c6L+U5Zue57uZ5b2T5YmN55+p6Zi144CCXHJcbiAgICAgKiBAcGFyYW0gbWF0IHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkIChtYXQ6IE1hdDQpIHtcclxuICAgICAgICB0aGlzLm0wMCArPSBtYXQubTAwO1xyXG4gICAgICAgIHRoaXMubTAxICs9IG1hdC5tMDE7XHJcbiAgICAgICAgdGhpcy5tMDIgKz0gbWF0Lm0wMjtcclxuICAgICAgICB0aGlzLm0wMyArPSBtYXQubTAzO1xyXG4gICAgICAgIHRoaXMubTA0ICs9IG1hdC5tMDQ7XHJcbiAgICAgICAgdGhpcy5tMDUgKz0gbWF0Lm0wNTtcclxuICAgICAgICB0aGlzLm0wNiArPSBtYXQubTA2O1xyXG4gICAgICAgIHRoaXMubTA3ICs9IG1hdC5tMDc7XHJcbiAgICAgICAgdGhpcy5tMDggKz0gbWF0Lm0wODtcclxuICAgICAgICB0aGlzLm0wOSArPSBtYXQubTA5O1xyXG4gICAgICAgIHRoaXMubTEwICs9IG1hdC5tMTA7XHJcbiAgICAgICAgdGhpcy5tMTEgKz0gbWF0Lm0xMTtcclxuICAgICAgICB0aGlzLm0xMiArPSBtYXQubTEyO1xyXG4gICAgICAgIHRoaXMubTEzICs9IG1hdC5tMTM7XHJcbiAgICAgICAgdGhpcy5tMTQgKz0gbWF0Lm0xNDtcclxuICAgICAgICB0aGlzLm0xNSArPSBtYXQubTE1O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFN1YnRyYWN0cyBhbm90aGVyIG1hdHJpeCBmcm9tIHRoZSBjdXJyZW50IG1hdHJpeC5cclxuICAgICAqIEB6aCDorqHnrpfnn6npmLXlh4/ms5XjgILlsIblvZPliY3nn6npmLXlh4/ljrvmjIflrprnn6npmLXnmoTnu5PmnpzotYvlgLznu5nlvZPliY3nn6npmLXjgIJcclxuICAgICAqIEBwYXJhbSBtYXQgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdWJ0cmFjdCAobWF0OiBNYXQ0KSB7XHJcbiAgICAgICAgdGhpcy5tMDAgLT0gbWF0Lm0wMDtcclxuICAgICAgICB0aGlzLm0wMSAtPSBtYXQubTAxO1xyXG4gICAgICAgIHRoaXMubTAyIC09IG1hdC5tMDI7XHJcbiAgICAgICAgdGhpcy5tMDMgLT0gbWF0Lm0wMztcclxuICAgICAgICB0aGlzLm0wNCAtPSBtYXQubTA0O1xyXG4gICAgICAgIHRoaXMubTA1IC09IG1hdC5tMDU7XHJcbiAgICAgICAgdGhpcy5tMDYgLT0gbWF0Lm0wNjtcclxuICAgICAgICB0aGlzLm0wNyAtPSBtYXQubTA3O1xyXG4gICAgICAgIHRoaXMubTA4IC09IG1hdC5tMDg7XHJcbiAgICAgICAgdGhpcy5tMDkgLT0gbWF0Lm0wOTtcclxuICAgICAgICB0aGlzLm0xMCAtPSBtYXQubTEwO1xyXG4gICAgICAgIHRoaXMubTExIC09IG1hdC5tMTE7XHJcbiAgICAgICAgdGhpcy5tMTIgLT0gbWF0Lm0xMjtcclxuICAgICAgICB0aGlzLm0xMyAtPSBtYXQubTEzO1xyXG4gICAgICAgIHRoaXMubTE0IC09IG1hdC5tMTQ7XHJcbiAgICAgICAgdGhpcy5tMTUgLT0gbWF0Lm0xNTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBNdWx0aXBseSB0aGUgY3VycmVudCBtYXRyaXggd2l0aCBhbm90aGVyIG1hdHJpeC5cclxuICAgICAqIEB6aCDnn6npmLXkuZjms5XjgILlsIblvZPliY3nn6npmLXlt6bkuZjmjIflrprnn6npmLXnmoTnu5PmnpzotYvlgLznu5nlvZPliY3nn6npmLXjgIJcclxuICAgICAqIEBwYXJhbSBtYXQgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtdWx0aXBseSAobWF0OiBNYXQ0KSB7XHJcbiAgICAgICAgY29uc3QgYTAwID0gdGhpcy5tMDA7IGNvbnN0IGEwMSA9IHRoaXMubTAxOyBjb25zdCBhMDIgPSB0aGlzLm0wMjsgY29uc3QgYTAzID0gdGhpcy5tMDM7XHJcbiAgICAgICAgY29uc3QgYTEwID0gdGhpcy5tMDQ7IGNvbnN0IGExMSA9IHRoaXMubTA1OyBjb25zdCBhMTIgPSB0aGlzLm0wNjsgY29uc3QgYTEzID0gdGhpcy5tMDc7XHJcbiAgICAgICAgY29uc3QgYTIwID0gdGhpcy5tMDg7IGNvbnN0IGEyMSA9IHRoaXMubTA5OyBjb25zdCBhMjIgPSB0aGlzLm0xMDsgY29uc3QgYTIzID0gdGhpcy5tMTE7XHJcbiAgICAgICAgY29uc3QgYTMwID0gdGhpcy5tMTI7IGNvbnN0IGEzMSA9IHRoaXMubTEzOyBjb25zdCBhMzIgPSB0aGlzLm0xNDsgY29uc3QgYTMzID0gdGhpcy5tMTU7XHJcblxyXG4gICAgICAgIC8vIENhY2hlIG9ubHkgdGhlIGN1cnJlbnQgbGluZSBvZiB0aGUgc2Vjb25kIG1hdHJpeFxyXG4gICAgICAgIGxldCBiMCA9IG1hdC5tMDA7IGxldCBiMSA9IG1hdC5tMDE7IGxldCBiMiA9IG1hdC5tMDI7IGxldCBiMyA9IG1hdC5tMDM7XHJcbiAgICAgICAgdGhpcy5tMDAgPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcclxuICAgICAgICB0aGlzLm0wMSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xyXG4gICAgICAgIHRoaXMubTAyID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XHJcbiAgICAgICAgdGhpcy5tMDMgPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcclxuXHJcbiAgICAgICAgYjAgPSBtYXQubTA0OyBiMSA9IG1hdC5tMDU7IGIyID0gbWF0Lm0wNjsgYjMgPSBtYXQubTA3O1xyXG4gICAgICAgIHRoaXMubTA0ID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XHJcbiAgICAgICAgdGhpcy5tMDUgPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcclxuICAgICAgICB0aGlzLm0wNiA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xyXG4gICAgICAgIHRoaXMubTA3ID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XHJcblxyXG4gICAgICAgIGIwID0gbWF0Lm0wODsgYjEgPSBtYXQubTA5OyBiMiA9IG1hdC5tMTA7IGIzID0gbWF0Lm0xMTtcclxuICAgICAgICB0aGlzLm0wOCA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xyXG4gICAgICAgIHRoaXMubTA5ID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XHJcbiAgICAgICAgdGhpcy5tMTAgPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcclxuICAgICAgICB0aGlzLm0xMSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xyXG5cclxuICAgICAgICBiMCA9IG1hdC5tMTI7IGIxID0gbWF0Lm0xMzsgYjIgPSBtYXQubTE0OyBiMyA9IG1hdC5tMTU7XHJcbiAgICAgICAgdGhpcy5tMTIgPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcclxuICAgICAgICB0aGlzLm0xMyA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xyXG4gICAgICAgIHRoaXMubTE0ID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XHJcbiAgICAgICAgdGhpcy5tMTUgPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBNdWx0aXBseSBlYWNoIGVsZW1lbnQgb2YgdGhlIGN1cnJlbnQgbWF0cml4IGJ5IGEgc2NhbGFyIG51bWJlci5cclxuICAgICAqIEB6aCDnn6npmLXmlbDkuZjjgILlsIblvZPliY3nn6npmLXkuI7mjIflrprmoIfph4/nmoTmlbDkuZjnu5PmnpzotYvlgLznu5nlvZPliY3nn6npmLXjgIJcclxuICAgICAqIEBwYXJhbSBzY2FsYXIgYW1vdW50IHRvIHNjYWxlIHRoZSBtYXRyaXgncyBlbGVtZW50cyBieVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbXVsdGlwbHlTY2FsYXIgKHNjYWxhcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tMDAgKj0gc2NhbGFyO1xyXG4gICAgICAgIHRoaXMubTAxICo9IHNjYWxhcjtcclxuICAgICAgICB0aGlzLm0wMiAqPSBzY2FsYXI7XHJcbiAgICAgICAgdGhpcy5tMDMgKj0gc2NhbGFyO1xyXG4gICAgICAgIHRoaXMubTA0ICo9IHNjYWxhcjtcclxuICAgICAgICB0aGlzLm0wNSAqPSBzY2FsYXI7XHJcbiAgICAgICAgdGhpcy5tMDYgKj0gc2NhbGFyO1xyXG4gICAgICAgIHRoaXMubTA3ICo9IHNjYWxhcjtcclxuICAgICAgICB0aGlzLm0wOCAqPSBzY2FsYXI7XHJcbiAgICAgICAgdGhpcy5tMDkgKj0gc2NhbGFyO1xyXG4gICAgICAgIHRoaXMubTEwICo9IHNjYWxhcjtcclxuICAgICAgICB0aGlzLm0xMSAqPSBzY2FsYXI7XHJcbiAgICAgICAgdGhpcy5tMTIgKj0gc2NhbGFyO1xyXG4gICAgICAgIHRoaXMubTEzICo9IHNjYWxhcjtcclxuICAgICAgICB0aGlzLm0xNCAqPSBzY2FsYXI7XHJcbiAgICAgICAgdGhpcy5tMTUgKj0gc2NhbGFyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFRyYW5zbGF0ZSB0aGUgY3VycmVudCBtYXRyaXggYnkgdGhlIGdpdmVuIHZlY3RvclxyXG4gICAgICogQHpoIOWwhuW9k+WJjeefqemYteW3puS5mOS9jeenu+efqemYteeahOe7k+aenOi1i+WAvOe7meW9k+WJjeefqemYte+8jOS9jeenu+efqemYteeUseWQhOS4qui9tOeahOS9jeenu+e7meWHuuOAglxyXG4gICAgICogQHBhcmFtIHZlYyB2ZWN0b3IgdG8gdHJhbnNsYXRlIGJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0cmFuc2xhdGUgKHZlYzogVmVjMykge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignZnVuY3Rpb24gY2hhbmdlZCcpO1xyXG4gICAgICAgIHRoaXMubTEyICs9IHZlYy54O1xyXG4gICAgICAgIHRoaXMubTEzICs9IHZlYy55O1xyXG4gICAgICAgIHRoaXMubTE0ICs9IHZlYy56O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIE11bHRpcGx5IHRoZSBjdXJyZW50IG1hdHJpeCB3aXRoIGEgc2NhbGUgdmVjdG9yLlxyXG4gICAgICogQHpoIOWwhuW9k+WJjeefqemYteW3puS5mOe8qeaUvuefqemYteeahOe7k+aenOi1i+WAvOe7meW9k+WJjeefqemYte+8jOe8qeaUvuefqemYteeUseWQhOS4qui9tOeahOe8qeaUvue7meWHuuOAglxyXG4gICAgICogQHBhcmFtIHZlYyB2ZWN0b3IgdG8gc2NhbGUgYnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNjYWxlICh2ZWM6IFZlYzMpIHtcclxuICAgICAgICBjb25zdCB4ID0gdmVjLng7IGNvbnN0IHkgPSB2ZWMueTsgY29uc3QgeiA9IHZlYy56O1xyXG4gICAgICAgIHRoaXMubTAwICo9IHg7XHJcbiAgICAgICAgdGhpcy5tMDEgKj0geDtcclxuICAgICAgICB0aGlzLm0wMiAqPSB4O1xyXG4gICAgICAgIHRoaXMubTAzICo9IHg7XHJcbiAgICAgICAgdGhpcy5tMDQgKj0geTtcclxuICAgICAgICB0aGlzLm0wNSAqPSB5O1xyXG4gICAgICAgIHRoaXMubTA2ICo9IHk7XHJcbiAgICAgICAgdGhpcy5tMDcgKj0geTtcclxuICAgICAgICB0aGlzLm0wOCAqPSB6O1xyXG4gICAgICAgIHRoaXMubTA5ICo9IHo7XHJcbiAgICAgICAgdGhpcy5tMTAgKj0gejtcclxuICAgICAgICB0aGlzLm0xMSAqPSB6O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFJvdGF0ZXMgdGhlIGN1cnJlbnQgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIGdpdmVuIGF4aXNcclxuICAgICAqIEB6aCDlsIblvZPliY3nn6npmLXlt6bkuZjml4vovaznn6npmLXnmoTnu5PmnpzotYvlgLznu5nlvZPliY3nn6npmLXvvIzml4vovaznn6npmLXnlLHml4vovazovbTlkozml4vovazop5Lluqbnu5nlh7rjgIJcclxuICAgICAqIEBwYXJhbSByYWQgQW5nbGUgb2Ygcm90YXRpb24gKGluIHJhZGlhbnMpXHJcbiAgICAgKiBAcGFyYW0gYXhpcyBBeGlzIG9mIHJvdGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByb3RhdGUgKHJhZDogbnVtYmVyLCBheGlzOiBWZWMzKSB7XHJcbiAgICAgICAgbGV0IHggPSBheGlzLng7IGxldCB5ID0gYXhpcy55OyBsZXQgeiA9IGF4aXMuejtcclxuXHJcbiAgICAgICAgbGV0IGxlbiA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMobGVuKSA8IEVQU0lMT04pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZW4gPSAxIC8gbGVuO1xyXG4gICAgICAgIHggKj0gbGVuO1xyXG4gICAgICAgIHkgKj0gbGVuO1xyXG4gICAgICAgIHogKj0gbGVuO1xyXG5cclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKTtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MocmFkKTtcclxuICAgICAgICBjb25zdCB0ID0gMSAtIGM7XHJcblxyXG4gICAgICAgIGNvbnN0IGEwMCA9IHRoaXMubTAwOyBjb25zdCBhMDEgPSB0aGlzLm0wMTsgY29uc3QgYTAyID0gdGhpcy5tMDI7IGNvbnN0IGEwMyA9IHRoaXMubTAzO1xyXG4gICAgICAgIGNvbnN0IGExMCA9IHRoaXMubTA0OyBjb25zdCBhMTEgPSB0aGlzLm0wNTsgY29uc3QgYTEyID0gdGhpcy5tMDY7IGNvbnN0IGExMyA9IHRoaXMubTA3O1xyXG4gICAgICAgIGNvbnN0IGEyMCA9IHRoaXMubTA4OyBjb25zdCBhMjEgPSB0aGlzLm0wOTsgY29uc3QgYTIyID0gdGhpcy5tMTA7IGNvbnN0IGEyMyA9IHRoaXMubTExO1xyXG5cclxuICAgICAgICAvLyBDb25zdHJ1Y3QgdGhlIGVsZW1lbnRzIG9mIHRoZSByb3RhdGlvbiBtYXRyaXhcclxuICAgICAgICBjb25zdCBiMDAgPSB4ICogeCAqIHQgKyBjOyBjb25zdCBiMDEgPSB5ICogeCAqIHQgKyB6ICogczsgY29uc3QgYjAyID0geiAqIHggKiB0IC0geSAqIHM7XHJcbiAgICAgICAgY29uc3QgYjEwID0geCAqIHkgKiB0IC0geiAqIHM7IGNvbnN0IGIxMSA9IHkgKiB5ICogdCArIGM7IGNvbnN0IGIxMiA9IHogKiB5ICogdCArIHggKiBzO1xyXG4gICAgICAgIGNvbnN0IGIyMCA9IHggKiB6ICogdCArIHkgKiBzOyBjb25zdCBiMjEgPSB5ICogeiAqIHQgLSB4ICogczsgY29uc3QgYjIyID0geiAqIHogKiB0ICsgYztcclxuXHJcbiAgICAgICAgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cclxuICAgICAgICB0aGlzLm0wMCA9IGEwMCAqIGIwMCArIGExMCAqIGIwMSArIGEyMCAqIGIwMjtcclxuICAgICAgICB0aGlzLm0wMSA9IGEwMSAqIGIwMCArIGExMSAqIGIwMSArIGEyMSAqIGIwMjtcclxuICAgICAgICB0aGlzLm0wMiA9IGEwMiAqIGIwMCArIGExMiAqIGIwMSArIGEyMiAqIGIwMjtcclxuICAgICAgICB0aGlzLm0wMyA9IGEwMyAqIGIwMCArIGExMyAqIGIwMSArIGEyMyAqIGIwMjtcclxuICAgICAgICB0aGlzLm0wNCA9IGEwMCAqIGIxMCArIGExMCAqIGIxMSArIGEyMCAqIGIxMjtcclxuICAgICAgICB0aGlzLm0wNSA9IGEwMSAqIGIxMCArIGExMSAqIGIxMSArIGEyMSAqIGIxMjtcclxuICAgICAgICB0aGlzLm0wNiA9IGEwMiAqIGIxMCArIGExMiAqIGIxMSArIGEyMiAqIGIxMjtcclxuICAgICAgICB0aGlzLm0wNyA9IGEwMyAqIGIxMCArIGExMyAqIGIxMSArIGEyMyAqIGIxMjtcclxuICAgICAgICB0aGlzLm0wOCA9IGEwMCAqIGIyMCArIGExMCAqIGIyMSArIGEyMCAqIGIyMjtcclxuICAgICAgICB0aGlzLm0wOSA9IGEwMSAqIGIyMCArIGExMSAqIGIyMSArIGEyMSAqIGIyMjtcclxuICAgICAgICB0aGlzLm0xMCA9IGEwMiAqIGIyMCArIGExMiAqIGIyMSArIGEyMiAqIGIyMjtcclxuICAgICAgICB0aGlzLm0xMSA9IGEwMyAqIGIyMCArIGExMyAqIGIyMSArIGEyMyAqIGIyMjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gUmV0dXJucyB0aGUgdHJhbnNsYXRpb24gdmVjdG9yIGNvbXBvbmVudCBvZiBhIHRyYW5zZm9ybWF0aW9uIG1hdHJpeC5cclxuICAgICAqIEB6aCDku47lvZPliY3nn6npmLXkuK3orqHnrpflh7rkvY3np7vlj5jmjaLnmoTpg6jliIbvvIzlubbku6XlkITkuKrovbTkuIrkvY3np7vnmoTlvaLlvI/otYvlgLznu5nlh7rlj6PlkJHph4/jgIJcclxuICAgICAqIEBwYXJhbSBvdXQgVmVjdG9yIHRvIHJlY2VpdmUgdHJhbnNsYXRpb24gY29tcG9uZW50LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VHJhbnNsYXRpb24gKG91dDogVmVjMykge1xyXG4gICAgICAgIG91dC54ID0gdGhpcy5tMTI7XHJcbiAgICAgICAgb3V0LnkgPSB0aGlzLm0xMztcclxuICAgICAgICBvdXQueiA9IHRoaXMubTE0O1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFJldHVybnMgdGhlIHNjYWxlIGZhY3RvciBjb21wb25lbnQgb2YgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXhcclxuICAgICAqIEB6aCDku47lvZPliY3nn6npmLXkuK3orqHnrpflh7rnvKnmlL7lj5jmjaLnmoTpg6jliIbvvIzlubbku6XlkITkuKrovbTkuIrnvKnmlL7nmoTlvaLlvI/otYvlgLznu5nlh7rlj6PlkJHph4/jgIJcclxuICAgICAqIEBwYXJhbSBvdXQgVmVjdG9yIHRvIHJlY2VpdmUgc2NhbGUgY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTY2FsZSAob3V0OiBWZWMzKSB7XHJcbiAgICAgICAgY29uc3QgbTAwID0gbTNfMS5tMDAgPSB0aGlzLm0wMDtcclxuICAgICAgICBjb25zdCBtMDEgPSBtM18xLm0wMSA9IHRoaXMubTAxO1xyXG4gICAgICAgIGNvbnN0IG0wMiA9IG0zXzEubTAyID0gdGhpcy5tMDI7XHJcbiAgICAgICAgY29uc3QgbTA0ID0gbTNfMS5tMDMgPSB0aGlzLm0wNDtcclxuICAgICAgICBjb25zdCBtMDUgPSBtM18xLm0wNCA9IHRoaXMubTA1O1xyXG4gICAgICAgIGNvbnN0IG0wNiA9IG0zXzEubTA1ID0gdGhpcy5tMDY7XHJcbiAgICAgICAgY29uc3QgbTA4ID0gbTNfMS5tMDYgPSB0aGlzLm0wODtcclxuICAgICAgICBjb25zdCBtMDkgPSBtM18xLm0wNyA9IHRoaXMubTA5O1xyXG4gICAgICAgIGNvbnN0IG0xMCA9IG0zXzEubTA4ID0gdGhpcy5tMTA7XHJcbiAgICAgICAgb3V0LnggPSBNYXRoLnNxcnQobTAwICogbTAwICsgbTAxICogbTAxICsgbTAyICogbTAyKTtcclxuICAgICAgICBvdXQueSA9IE1hdGguc3FydChtMDQgKiBtMDQgKyBtMDUgKiBtMDUgKyBtMDYgKiBtMDYpO1xyXG4gICAgICAgIG91dC56ID0gTWF0aC5zcXJ0KG0wOCAqIG0wOCArIG0wOSAqIG0wOSArIG0xMCAqIG0xMCk7XHJcbiAgICAgICAgLy8gYWNjb3VudCBmb3IgcmVmZWN0aW9uc1xyXG4gICAgICAgIGlmIChNYXQzLmRldGVybWluYW50KG0zXzEpIDwgMCkgeyBvdXQueCAqPSAtMTsgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gUmV0dXJucyB0aGUgcm90YXRpb24gZmFjdG9yIGNvbXBvbmVudCBvZiBhIHRyYW5zZm9ybWF0aW9uIG1hdHJpeFxyXG4gICAgICogQHpoIOS7juW9k+WJjeefqemYteS4reiuoeeul+WHuuaXi+i9rOWPmOaNoueahOmDqOWIhu+8jOW5tuS7peWbm+WFg+aVsOeahOW9ouW8j+i1i+WAvOe7meWHuuWPo+Wbm+WFg+aVsOOAglxyXG4gICAgICogQHBhcmFtIG91dCBWZWN0b3IgdG8gcmVjZWl2ZSByb3RhdGlvbiBjb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJvdGF0aW9uIChvdXQ6IFF1YXQpIHtcclxuICAgICAgICBjb25zdCB0cmFjZSA9IHRoaXMubTAwICsgdGhpcy5tMDUgKyB0aGlzLm0xMDtcclxuICAgICAgICBsZXQgUyA9IDA7XHJcblxyXG4gICAgICAgIGlmICh0cmFjZSA+IDApIHtcclxuICAgICAgICAgICAgUyA9IE1hdGguc3FydCh0cmFjZSArIDEuMCkgKiAyO1xyXG4gICAgICAgICAgICBvdXQudyA9IDAuMjUgKiBTO1xyXG4gICAgICAgICAgICBvdXQueCA9ICh0aGlzLm0wNiAtIHRoaXMubTA5KSAvIFM7XHJcbiAgICAgICAgICAgIG91dC55ID0gKHRoaXMubTA4IC0gdGhpcy5tMDIpIC8gUztcclxuICAgICAgICAgICAgb3V0LnogPSAodGhpcy5tMDEgLSB0aGlzLm0wNCkgLyBTO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHRoaXMubTAwID4gdGhpcy5tMDUpICYmICh0aGlzLm0wMCA+IHRoaXMubTEwKSkge1xyXG4gICAgICAgICAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHRoaXMubTAwIC0gdGhpcy5tMDUgLSB0aGlzLm0xMCkgKiAyO1xyXG4gICAgICAgICAgICBvdXQudyA9ICh0aGlzLm0wNiAtIHRoaXMubTA5KSAvIFM7XHJcbiAgICAgICAgICAgIG91dC54ID0gMC4yNSAqIFM7XHJcbiAgICAgICAgICAgIG91dC55ID0gKHRoaXMubTAxICsgdGhpcy5tMDQpIC8gUztcclxuICAgICAgICAgICAgb3V0LnogPSAodGhpcy5tMDggKyB0aGlzLm0wMikgLyBTO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tMDUgPiB0aGlzLm0xMCkge1xyXG4gICAgICAgICAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHRoaXMubTA1IC0gdGhpcy5tMDAgLSB0aGlzLm0xMCkgKiAyO1xyXG4gICAgICAgICAgICBvdXQudyA9ICh0aGlzLm0wOCAtIHRoaXMubTAyKSAvIFM7XHJcbiAgICAgICAgICAgIG91dC54ID0gKHRoaXMubTAxICsgdGhpcy5tMDQpIC8gUztcclxuICAgICAgICAgICAgb3V0LnkgPSAwLjI1ICogUztcclxuICAgICAgICAgICAgb3V0LnogPSAodGhpcy5tMDYgKyB0aGlzLm0wOSkgLyBTO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgdGhpcy5tMTAgLSB0aGlzLm0wMCAtIHRoaXMubTA1KSAqIDI7XHJcbiAgICAgICAgICAgIG91dC53ID0gKHRoaXMubTAxIC0gdGhpcy5tMDQpIC8gUztcclxuICAgICAgICAgICAgb3V0LnggPSAodGhpcy5tMDggKyB0aGlzLm0wMikgLyBTO1xyXG4gICAgICAgICAgICBvdXQueSA9ICh0aGlzLm0wNiArIHRoaXMubTA5KSAvIFM7XHJcbiAgICAgICAgICAgIG91dC56ID0gMC4yNSAqIFM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFJlc2V0cyB0aGUgbWF0cml4IHZhbHVlcyBieSB0aGUgZ2l2ZW4gcm90YXRpb24gcXVhdGVybmlvbiwgdHJhbnNsYXRpb24gdmVjdG9yIGFuZCBzY2FsZSB2ZWN0b3JcclxuICAgICAqIEB6aCDph43nva7lvZPliY3nn6npmLXnmoTlgLzvvIzkvb/lhbbooajnpLrmjIflrprnmoTml4vovazjgIHnvKnmlL7jgIHkvY3np7vkvp3mrKHnu4TlkIjnmoTlj5jmjaLjgIJcclxuICAgICAqIEBwYXJhbSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cclxuICAgICAqIEBwYXJhbSB2IFRyYW5zbGF0aW9uIHZlY3RvclxyXG4gICAgICogQHBhcmFtIHMgU2NhbGluZyB2ZWN0b3JcclxuICAgICAqIEByZXR1cm4gYHRoaXNgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmcm9tUlRTIChxOiBRdWF0LCB2OiBWZWMzLCBzOiBWZWMzKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHEueDsgY29uc3QgeSA9IHEueTsgY29uc3QgeiA9IHEuejsgY29uc3QgdyA9IHEudztcclxuICAgICAgICBjb25zdCB4MiA9IHggKyB4O1xyXG4gICAgICAgIGNvbnN0IHkyID0geSArIHk7XHJcbiAgICAgICAgY29uc3QgejIgPSB6ICsgejtcclxuXHJcbiAgICAgICAgY29uc3QgeHggPSB4ICogeDI7XHJcbiAgICAgICAgY29uc3QgeHkgPSB4ICogeTI7XHJcbiAgICAgICAgY29uc3QgeHogPSB4ICogejI7XHJcbiAgICAgICAgY29uc3QgeXkgPSB5ICogeTI7XHJcbiAgICAgICAgY29uc3QgeXogPSB5ICogejI7XHJcbiAgICAgICAgY29uc3QgenogPSB6ICogejI7XHJcbiAgICAgICAgY29uc3Qgd3ggPSB3ICogeDI7XHJcbiAgICAgICAgY29uc3Qgd3kgPSB3ICogeTI7XHJcbiAgICAgICAgY29uc3Qgd3ogPSB3ICogejI7XHJcbiAgICAgICAgY29uc3Qgc3ggPSBzLng7XHJcbiAgICAgICAgY29uc3Qgc3kgPSBzLnk7XHJcbiAgICAgICAgY29uc3Qgc3ogPSBzLno7XHJcblxyXG4gICAgICAgIHRoaXMubTAwID0gKDEgLSAoeXkgKyB6eikpICogc3g7XHJcbiAgICAgICAgdGhpcy5tMDEgPSAoeHkgKyB3eikgKiBzeDtcclxuICAgICAgICB0aGlzLm0wMiA9ICh4eiAtIHd5KSAqIHN4O1xyXG4gICAgICAgIHRoaXMubTAzID0gMDtcclxuICAgICAgICB0aGlzLm0wNCA9ICh4eSAtIHd6KSAqIHN5O1xyXG4gICAgICAgIHRoaXMubTA1ID0gKDEgLSAoeHggKyB6eikpICogc3k7XHJcbiAgICAgICAgdGhpcy5tMDYgPSAoeXogKyB3eCkgKiBzeTtcclxuICAgICAgICB0aGlzLm0wNyA9IDA7XHJcbiAgICAgICAgdGhpcy5tMDggPSAoeHogKyB3eSkgKiBzejtcclxuICAgICAgICB0aGlzLm0wOSA9ICh5eiAtIHd4KSAqIHN6O1xyXG4gICAgICAgIHRoaXMubTEwID0gKDEgLSAoeHggKyB5eSkpICogc3o7XHJcbiAgICAgICAgdGhpcy5tMTEgPSAwO1xyXG4gICAgICAgIHRoaXMubTEyID0gdi54O1xyXG4gICAgICAgIHRoaXMubTEzID0gdi55O1xyXG4gICAgICAgIHRoaXMubTE0ID0gdi56O1xyXG4gICAgICAgIHRoaXMubTE1ID0gMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gUmVzZXRzIHRoZSBjdXJyZW50IG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBxdWF0ZXJuaW9uLlxyXG4gICAgICogQHpoIOmHjee9ruW9k+WJjeefqemYteeahOWAvO+8jOS9v+WFtuihqOekuuaMh+WumuWbm+WFg+aVsOihqOekuueahOaXi+i9rOWPmOaNouOAglxyXG4gICAgICogQHBhcmFtIHEgUm90YXRpb24gcXVhdGVybmlvblxyXG4gICAgICogQHJldHVybiBgdGhpc2BcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZyb21RdWF0IChxOiBRdWF0KSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHEueDsgY29uc3QgeSA9IHEueTsgY29uc3QgeiA9IHEuejsgY29uc3QgdyA9IHEudztcclxuICAgICAgICBjb25zdCB4MiA9IHggKyB4O1xyXG4gICAgICAgIGNvbnN0IHkyID0geSArIHk7XHJcbiAgICAgICAgY29uc3QgejIgPSB6ICsgejtcclxuXHJcbiAgICAgICAgY29uc3QgeHggPSB4ICogeDI7XHJcbiAgICAgICAgY29uc3QgeXggPSB5ICogeDI7XHJcbiAgICAgICAgY29uc3QgeXkgPSB5ICogeTI7XHJcbiAgICAgICAgY29uc3QgenggPSB6ICogeDI7XHJcbiAgICAgICAgY29uc3QgenkgPSB6ICogeTI7XHJcbiAgICAgICAgY29uc3QgenogPSB6ICogejI7XHJcbiAgICAgICAgY29uc3Qgd3ggPSB3ICogeDI7XHJcbiAgICAgICAgY29uc3Qgd3kgPSB3ICogeTI7XHJcbiAgICAgICAgY29uc3Qgd3ogPSB3ICogejI7XHJcblxyXG4gICAgICAgIHRoaXMubTAwID0gMSAtIHl5IC0geno7XHJcbiAgICAgICAgdGhpcy5tMDEgPSB5eCArIHd6O1xyXG4gICAgICAgIHRoaXMubTAyID0genggLSB3eTtcclxuICAgICAgICB0aGlzLm0wMyA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMubTA0ID0geXggLSB3ejtcclxuICAgICAgICB0aGlzLm0wNSA9IDEgLSB4eCAtIHp6O1xyXG4gICAgICAgIHRoaXMubTA2ID0genkgKyB3eDtcclxuICAgICAgICB0aGlzLm0wNyA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMubTA4ID0genggKyB3eTtcclxuICAgICAgICB0aGlzLm0wOSA9IHp5IC0gd3g7XHJcbiAgICAgICAgdGhpcy5tMTAgPSAxIC0geHggLSB5eTtcclxuICAgICAgICB0aGlzLm0xMSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMubTEyID0gMDtcclxuICAgICAgICB0aGlzLm0xMyA9IDA7XHJcbiAgICAgICAgdGhpcy5tMTQgPSAwO1xyXG4gICAgICAgIHRoaXMubTE1ID0gMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHYzXzEgPSBuZXcgVmVjMygpO1xyXG5jb25zdCBtM18xID0gbmV3IE1hdDMoKTsiXX0=