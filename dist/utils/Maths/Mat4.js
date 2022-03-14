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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0NC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlscy9NYXRocy9NYXQ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUE4QjtBQUM5QixpQ0FBOEI7QUFFOUIsbUNBQWtDO0FBQ2xDLGlDQUE4QjtBQUVqQixRQUFBLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLENBQUMsQ0FBQztJQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRyxDQUFDLENBQUMsQ0FBQztJQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ2pDLENBQUMsQ0FBQztBQUVIOzs7R0FHRztBQUVILE1BQWEsSUFBSTtJQXE3Q2IsWUFDSSxNQUFxQixDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQ2pELEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQ2xDLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQ2xDLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBRWxDLFVBQVU7UUFDVixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUN6QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDL0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQy9FLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUMvRSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDbEY7YUFBTTtZQUNILElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLElB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RUFBRSxHQUFXLEVBQUUsR0FBVyxFQUNsRCxHQUFXLEVBQUUsR0FBVyxFQUFFLEdBQVcsRUFBRSxHQUFXLEVBQ2xELEdBQVcsRUFBRSxHQUFXLEVBQUUsR0FBVyxFQUFFLEdBQVc7UUFFbEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDM0QsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDM0QsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDM0QsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDM0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBMEIsR0FBUTtRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQTBCLEdBQVEsRUFBRSxDQUFNO1FBQzdELHdGQUF3RjtRQUN4RixJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDWCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDakgsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDZCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2QsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDZCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDZCxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNkLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ2pCO2FBQU07WUFDSCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDbkI7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUEwQixHQUFRLEVBQUUsQ0FBTTtRQUMxRCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQzNFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDM0UsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMzRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRTNFLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWxDLDRCQUE0QjtRQUM1QixJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVoRixJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDWCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNuRCxPQUFPLEdBQUcsQ0FBQztTQUNkO1FBQ0QsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFFaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRXBELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxXQUFXLENBQTBCLENBQU07UUFDckQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMzRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQzNFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDM0UsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUUzRSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVsQyw0QkFBNEI7UUFDNUIsT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFNO1FBQ3BFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDM0UsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMzRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQzNFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFFM0UsbURBQW1EO1FBQ25ELElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDL0QsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBRXBELEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQy9DLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUVwRCxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMvQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFFcEQsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDL0MsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3BELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQXFELEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBVTtRQUNwRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFO1lBQ1gsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQ3ZEO2FBQU07WUFDSCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQzNFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDM0UsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUMzRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBRTNFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQzNELEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQzNELEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBRTNELEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUM5QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxH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QUMsR0FBRyxDQUFDLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV4RixrREFBa0Q7UUFDbEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFFNUMsb0VBQW9FO1FBQ3BFLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUNYLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FB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QUMsQ0FBQyxHQUFHLENBQUM7UUFDbEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNsQixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDbEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNsQixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFFbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsZ0VBQWdFO1lBQzdFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDbkI7UUFFRCw4Q0FBOEM7UUFDOUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFNUIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsR0FBVztRQUN4RSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNsQixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDbEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNsQixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDbEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNsQixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRWxCLG9FQUFvRTtRQUNwRSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDWCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQ25CO1FBRUQsOENBQThDO1FBQzlDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdB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QyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLGFBQWEsQ0FBMEIsR0FBUSxFQUFFLEdBQVc7UUFDdEUsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakQsOENBQThDO1FBQzlDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2IsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsYUFBYSxDQUEwQixHQUFRLEVBQUUsR0FBVztRQUN0RSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqRCw4Q0FBOEM7UUFDOUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2IsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQXFELEdBQVEsRUFBRSxDQUFPLEVBQUUsQ0FBVTtRQUNsRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNsQixHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDbEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDbEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxD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QUFHLElBQUksR0FBRyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25DO2FBQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDMUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0gsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUNwQjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQXFELENBQU0sRUFBRSxDQUFPLEVBQUUsQ0FBVSxFQUFFLENBQVU7UUFDM0csQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsTUFBTSxHQUFHLEdBQUcsV0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFDM0UsV0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxxQkFBcUI7UUFDN0MsV0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBcUQsR0FBUSxFQUFFLENB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ZixNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWYsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDL0IsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDekIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDbEUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDbEUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDbEUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFWixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUEwQixHQUFRLEVBQUUsQ0FBTztRQUM3RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDdEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNsQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUVaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNsQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNsQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUVaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNsQixHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDbEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUN0QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUVaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcs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UUFDOUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNiLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FDZixHQUFRLEVBQUUsSUFBWSxFQUFFLEtBQWEsRUFBRSxNQUFjLEVBQUUsR0FBVyxFQUFFLElBQVksRUFBRSxHQUFXLEVBQzdGLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxlQUFlLEdBQUcsQ0FBQyxFQUFFLFdBQVcsR0FBRyxDQUFDO1FBRW5ELE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMs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LENBQUM7UUFDM0UsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMzRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQzNFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFFM0UsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFFbEMsNEJBQTRCO1FBQzVCLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWhGLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDTixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFFaEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUVaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRVosR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFWixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBUSxHQUFRLEVBQUUsQ0FBWSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3hELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDckIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDckIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDckIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDdEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN0QixHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDdEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN0QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBMEIsR0FBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNuRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDeEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDeEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFNO1FBQy9ELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTTtRQUNwRSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQVM7UUFDN0UsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsb0JBQW9CLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTSxFQUFFLEtBQWE7UUFDL0YsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNsQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDbEMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNsQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDbEMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNsQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDbEMsR0FB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QUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUMxRixDQUFDO0lBQ04sQ0FBQztJQThIRDs7O09BR0c7SUFDSSxLQUFLO1FBQ1IsT0FBTyxJQUFJLElBQUksQ0FDWCxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUN0QyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUN0QyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUN0QyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUN6QyxDQUFDO0lBQ04sQ0FBQztJQXFCTSxHQUFHLENBQUUsTUFBcUIsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUN6RCxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUNsQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUNsQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNsQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUN6QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDL0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQy9FLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUMvRSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDbEY7YUFBTTtZQUNILElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQy9ELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQy9ELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQy9ELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ2xFO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBRSxLQUFXLEVBQUUsT0FBTyxHQUFHLGVBQU87UUFDekMsT0FBTyxDQUNILElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQy9GLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3hHLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxZQUFZLENBQUUsS0FBVztRQUM1QixPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUc7ZUFDcEcsSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRztlQUNwRyxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHO2VBQ3BHLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNoSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFFBQVE7UUFDWCxPQUFPLE1BQ0gsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFDL0MsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFDL0MsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFDL0MsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSTtjQUNqRCxHQUFHLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFFBQVE7UUFDWCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksSUFBSTtRQUNQLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFNBQVM7UUFDWixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDVCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3ZGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdkYsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN2RixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBRXZGLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWxDLDRCQUE0QjtRQUM1QixJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVoRixJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pELE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVoQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFckQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxXQUFXO1FBQ2QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN2RixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3ZGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdkYsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUV2RixNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVsQyw0QkFBNEI7UUFDNUIsT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEdBQUcsQ0FBRSxHQUFTO1FBQ2pCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFFBQVEsQ0FBRSxHQUFTO1FBQ3RCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFFBQVEsQ0FBRSxHQUFTO1FBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdkYsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN2RixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3ZGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFdkYsbURBQW1EO1FBQ25ELElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQUMsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDdkUsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBRXJELEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUVyRCxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUN2RCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFFckQsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDdkQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksY0FBYyxDQUFFLE1BQWM7UUFDakMsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDbkIsSUFB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UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdkYsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUV2RixnREFBZ0Q7UUFDaEQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEYsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEYsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEYsa0RBQWtEO1FBQ2xELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFH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QUcsQ0FBQyxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQzthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZELENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4RCxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNqQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckM7YUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUM1QixDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENB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QUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRWIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRWIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRWIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFYixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOztBQW5qRUwsb0JBb2pFQztBQW5qRWlCLGFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztBQXFqRXZELE1BQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7QUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hdDMgfSBmcm9tIFwiLi9NYXQzXCI7XG5pbXBvcnQgeyBRdWF0IH0gZnJvbSBcIi4vUXVhdFwiO1xuaW1wb3J0IHsgSU1hdDRMaWtlLCBJVmVjM0xpa2UgfSBmcm9tIFwiLi90eXBlLWRlZmluZVwiO1xuaW1wb3J0IHsgRVBTSUxPTiB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBWZWMzIH0gZnJvbSBcIi4vVmVjM1wiO1xuXG5leHBvcnQgY29uc3QgcHJlVHJhbnNmb3JtcyA9IE9iamVjdC5mcmVlemUoW1xuICAgIE9iamVjdC5mcmVlemUoWzEsICAwLCAgMCwgIDFdKSwgLy8gU3VyZmFjZVRyYW5zZm9ybS5JREVOVElUWVxuICAgIE9iamVjdC5mcmVlemUoWzAsICAxLCAtMSwgIDBdKSwgLy8gU3VyZmFjZVRyYW5zZm9ybS5ST1RBVEVfOTBcbiAgICBPYmplY3QuZnJlZXplKFstMSwgIDAsICAwLCAtMV0pLCAvLyBTdXJmYWNlVHJhbnNmb3JtLlJPVEFURV8xODBcbiAgICBPYmplY3QuZnJlZXplKFswLCAtMSwgIDEsICAwXSksIC8vIFN1cmZhY2VUcmFuc2Zvcm0uUk9UQVRFXzI3MFxuXSk7XG5cbi8qKlxuICogQGVuIE1hdGhlbWF0aWNhbCA0eDQgbWF0cml4LlxuICogQHpoIOihqOekuuWbm+e7tO+8iDR4NO+8ieefqemYteOAglxuICovXG5cbmV4cG9ydCBjbGFzcyBNYXQ0IHtcbiAgICBwdWJsaWMgc3RhdGljIElERU5USVRZID0gT2JqZWN0LmZyZWV6ZShuZXcgTWF0NCgpKTtcblxuICAgIC8qKlxuICAgICAqIEBlbiBDbG9uZSBhIG1hdHJpeCBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XG4gICAgICogQHpoIOiOt+W+l+aMh+WumuefqemYteeahOaLt+i0nVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2xvbmUgPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKGE6IE91dCkge1xuICAgICAgICByZXR1cm4gbmV3IE1hdDQoXG4gICAgICAgICAgICBhLm0wMCwgYS5tMDEsIGEubTAyLCBhLm0wMyxcbiAgICAgICAgICAgIGEubTA0LCBhLm0wNSwgYS5tMDYsIGEubTA3LFxuICAgICAgICAgICAgYS5tMDgsIGEubTA5LCBhLm0xMCwgYS5tMTEsXG4gICAgICAgICAgICBhLm0xMiwgYS5tMTMsIGEubTE0LCBhLm0xNSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ29weSBhIG1hdHJpeCBpbnRvIHRoZSBvdXQgbWF0cml4XG4gICAgICogQHpoIOWkjeWItuebruagh+efqemYtVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29weSA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBvdXQubTAwID0gYS5tMDA7XG4gICAgICAgIG91dC5tMDEgPSBhLm0wMTtcbiAgICAgICAgb3V0Lm0wMiA9IGEubTAyO1xuICAgICAgICBvdXQubTAzID0gYS5tMDM7XG4gICAgICAgIG91dC5tMDQgPSBhLm0wNDtcbiAgICAgICAgb3V0Lm0wNSA9IGEubTA1O1xuICAgICAgICBvdXQubTA2ID0gYS5tMDY7XG4gICAgICAgIG91dC5tMDcgPSBhLm0wNztcbiAgICAgICAgb3V0Lm0wOCA9IGEubTA4O1xuICAgICAgICBvdXQubTA5ID0gYS5tMDk7XG4gICAgICAgIG91dC5tMTAgPSBhLm0xMDtcbiAgICAgICAgb3V0Lm0xMSA9IGEubTExO1xuICAgICAgICBvdXQubTEyID0gYS5tMTI7XG4gICAgICAgIG91dC5tMTMgPSBhLm0xMztcbiAgICAgICAgb3V0Lm0xNCA9IGEubTE0O1xuICAgICAgICBvdXQubTE1ID0gYS5tMTU7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgYSBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXhcbiAgICAgKiBAemgg6K6+572u55+p6Zi15YC8XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzZXQgPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gIChcbiAgICAgICAgb3V0OiBPdXQsXG4gICAgICAgIG0wMDogbnVtYmVyLCBtMDE6IG51bWJlciwgbTAyOiBudW1iZXIsIG0wMzogbnVtYmVyLFxuICAgICAgICBtMTA6IG51bWJlciwgbTExOiBudW1iZXIsIG0xMjogbnVtYmVyLCBtMTM6IG51bWJlcixcbiAgICAgICAgbTIwOiBudW1iZXIsIG0yMTogbnVtYmVyLCBtMjI6IG51bWJlciwgbTIzOiBudW1iZXIsXG4gICAgICAgIG0zMDogbnVtYmVyLCBtMzE6IG51bWJlciwgbTMyOiBudW1iZXIsIG0zMzogbnVtYmVyLFxuICAgICkge1xuICAgICAgICBvdXQubTAwID0gbTAwOyBvdXQubTAxID0gbTAxOyBvdXQubTAyID0gbTAyOyBvdXQubTAzID0gbTAzO1xuICAgICAgICBvdXQubTA0ID0gbTEwOyBvdXQubTA1ID0gbTExOyBvdXQubTA2ID0gbTEyOyBvdXQubTA3ID0gbTEzO1xuICAgICAgICBvdXQubTA4ID0gbTIwOyBvdXQubTA5ID0gbTIxOyBvdXQubTEwID0gbTIyOyBvdXQubTExID0gbTIzO1xuICAgICAgICBvdXQubTEyID0gbTMwOyBvdXQubTEzID0gbTMxOyBvdXQubTE0ID0gbTMyOyBvdXQubTE1ID0gbTMzO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiByZXR1cm4gYW4gaWRlbnRpdHkgbWF0cml4LlxuICAgICAqIEB6aCDlsIbnm67moIfotYvlgLzkuLrljZXkvY3nn6npmLVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGlkZW50aXR5IDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCkge1xuICAgICAgICBvdXQubTAwID0gMTtcbiAgICAgICAgb3V0Lm0wMSA9IDA7XG4gICAgICAgIG91dC5tMDIgPSAwO1xuICAgICAgICBvdXQubTAzID0gMDtcbiAgICAgICAgb3V0Lm0wNCA9IDA7XG4gICAgICAgIG91dC5tMDUgPSAxO1xuICAgICAgICBvdXQubTA2ID0gMDtcbiAgICAgICAgb3V0Lm0wNyA9IDA7XG4gICAgICAgIG91dC5tMDggPSAwO1xuICAgICAgICBvdXQubTA5ID0gMDtcbiAgICAgICAgb3V0Lm0xMCA9IDE7XG4gICAgICAgIG91dC5tMTEgPSAwO1xuICAgICAgICBvdXQubTEyID0gMDtcbiAgICAgICAgb3V0Lm0xMyA9IDA7XG4gICAgICAgIG91dC5tMTQgPSAwO1xuICAgICAgICBvdXQubTE1ID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVHJhbnNwb3NlcyBhIG1hdHJpeCBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XG4gICAgICogQHpoIOi9rOe9ruefqemYtVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdHJhbnNwb3NlIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcbiAgICAgICAgaWYgKG91dCA9PT0gYSkge1xuICAgICAgICAgICAgY29uc3QgYTAxID0gYS5tMDE7IGNvbnN0IGEwMiA9IGEubTAyOyBjb25zdCBhMDMgPSBhLm0wMzsgY29uc3QgYTEyID0gYS5tMDY7IGNvbnN0IGExMyA9IGEubTA3OyBjb25zdCBhMjMgPSBhLm0xMTtcbiAgICAgICAgICAgIG91dC5tMDEgPSBhLm0wNDtcbiAgICAgICAgICAgIG91dC5tMDIgPSBhLm0wODtcbiAgICAgICAgICAgIG91dC5tMDMgPSBhLm0xMjtcbiAgICAgICAgICAgIG91dC5tMDQgPSBhMDE7XG4gICAgICAgICAgICBvdXQubTA2ID0gYS5tMDk7XG4gICAgICAgICAgICBvdXQubTA3ID0gYS5tMTM7XG4gICAgICAgICAgICBvdXQubTA4ID0gYTAyO1xuICAgICAgICAgICAgb3V0Lm0wOSA9IGExMjtcbiAgICAgICAgICAgIG91dC5tMTEgPSBhLm0xNDtcbiAgICAgICAgICAgIG91dC5tMTIgPSBhMDM7XG4gICAgICAgICAgICBvdXQubTEzID0gYTEzO1xuICAgICAgICAgICAgb3V0Lm0xNCA9IGEyMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dC5tMDAgPSBhLm0wMDtcbiAgICAgICAgICAgIG91dC5tMDEgPSBhLm0wNDtcbiAgICAgICAgICAgIG91dC5tMDIgPSBhLm0wODtcbiAgICAgICAgICAgIG91dC5tMDMgPSBhLm0xMjtcbiAgICAgICAgICAgIG91dC5tMDQgPSBhLm0wMTtcbiAgICAgICAgICAgIG91dC5tMDUgPSBhLm0wNTtcbiAgICAgICAgICAgIG91dC5tMDYgPSBhLm0wOTtcbiAgICAgICAgICAgIG91dC5tMDcgPSBhLm0xMztcbiAgICAgICAgICAgIG91dC5tMDggPSBhLm0wMjtcbiAgICAgICAgICAgIG91dC5tMDkgPSBhLm0wNjtcbiAgICAgICAgICAgIG91dC5tMTAgPSBhLm0xMDtcbiAgICAgICAgICAgIG91dC5tMTEgPSBhLm0xNDtcbiAgICAgICAgICAgIG91dC5tMTIgPSBhLm0wMztcbiAgICAgICAgICAgIG91dC5tMTMgPSBhLm0wNztcbiAgICAgICAgICAgIG91dC5tMTQgPSBhLm0xMTtcbiAgICAgICAgICAgIG91dC5tMTUgPSBhLm0xNTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBJbnZlcnRzIGEgbWF0cml4LiBXaGVuIG1hdHJpeCBpcyBub3QgaW52ZXJ0aWJsZSB0aGUgbWF0cml4IHdpbGwgYmUgc2V0IHRvIHplcm9zLlxuICAgICAqIEB6aCDnn6npmLXmsYLpgIbvvIzms6jmhI/vvIzlnKjnn6npmLXkuI3lj6/pgIbml7bvvIzkvJrov5Tlm57kuIDkuKrlhajkuLogMCDnmoTnn6npmLXjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGludmVydCA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBjb25zdCBhMDAgPSBhLm0wMDsgY29uc3QgYTAxID0gYS5tMDE7IGNvbnN0IGEwMiA9IGEubTAyOyBjb25zdCBhMDMgPSBhLm0wMztcbiAgICAgICAgY29uc3QgYTEwID0gYS5tMDQ7IGNvbnN0IGExMSA9IGEubTA1OyBjb25zdCBhMTIgPSBhLm0wNjsgY29uc3QgYTEzID0gYS5tMDc7XG4gICAgICAgIGNvbnN0IGEyMCA9IGEubTA4OyBjb25zdCBhMjEgPSBhLm0wOTsgY29uc3QgYTIyID0gYS5tMTA7IGNvbnN0IGEyMyA9IGEubTExO1xuICAgICAgICBjb25zdCBhMzAgPSBhLm0xMjsgY29uc3QgYTMxID0gYS5tMTM7IGNvbnN0IGEzMiA9IGEubTE0OyBjb25zdCBhMzMgPSBhLm0xNTtcblxuICAgICAgICBjb25zdCBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gICAgICAgIGNvbnN0IGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMDtcbiAgICAgICAgY29uc3QgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwO1xuICAgICAgICBjb25zdCBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XG4gICAgICAgIGNvbnN0IGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMTtcbiAgICAgICAgY29uc3QgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyO1xuICAgICAgICBjb25zdCBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XG4gICAgICAgIGNvbnN0IGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMDtcbiAgICAgICAgY29uc3QgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwO1xuICAgICAgICBjb25zdCBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzE7XG4gICAgICAgIGNvbnN0IGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMTtcbiAgICAgICAgY29uc3QgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgbGV0IGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICAgICAgICBpZiAoZGV0ID09PSAwKSB7XG4gICAgICAgICAgICBvdXQubTAwID0gMDsgb3V0Lm0wMSA9IDA7IG91dC5tMDIgPSAwOyBvdXQubTAzID0gMDtcbiAgICAgICAgICAgIG91dC5tMDQgPSAwOyBvdXQubTA1ID0gMDsgb3V0Lm0wNiA9IDA7IG91dC5tMDcgPSAwO1xuICAgICAgICAgICAgb3V0Lm0wOCA9IDA7IG91dC5tMDkgPSAwOyBvdXQubTEwID0gMDsgb3V0Lm0xMSA9IDA7XG4gICAgICAgICAgICBvdXQubTEyID0gMDsgb3V0Lm0xMyA9IDA7IG91dC5tMTQgPSAwOyBvdXQubTE1ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgZGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgICAgIG91dC5tMDAgPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgICAgICAgb3V0Lm0wMSA9IChhMDIgKiBiMTAgLSBhMDEgKiBiMTEgLSBhMDMgKiBiMDkpICogZGV0O1xuICAgICAgICBvdXQubTAyID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XG4gICAgICAgIG91dC5tMDMgPSAoYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzKSAqIGRldDtcbiAgICAgICAgb3V0Lm0wNCA9IChhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcpICogZGV0O1xuICAgICAgICBvdXQubTA1ID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gICAgICAgIG91dC5tMDYgPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgICAgICAgb3V0Lm0wNyA9IChhMjAgKiBiMDUgLSBhMjIgKiBiMDIgKyBhMjMgKiBiMDEpICogZGV0O1xuICAgICAgICBvdXQubTA4ID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG4gICAgICAgIG91dC5tMDkgPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcbiAgICAgICAgb3V0Lm0xMCA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuICAgICAgICBvdXQubTExID0gKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgKiBkZXQ7XG4gICAgICAgIG91dC5tMTIgPSAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldDtcbiAgICAgICAgb3V0Lm0xMyA9IChhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDYpICogZGV0O1xuICAgICAgICBvdXQubTE0ID0gKGEzMSAqIGIwMSAtIGEzMCAqIGIwMyAtIGEzMiAqIGIwMCkgKiBkZXQ7XG4gICAgICAgIG91dC5tMTUgPSAoYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwKSAqIGRldDtcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdHJpeFxuICAgICAqIEB6aCDnn6npmLXooYzliJflvI9cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGRldGVybWluYW50IDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChhOiBPdXQpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBhMDAgPSBhLm0wMDsgY29uc3QgYTAxID0gYS5tMDE7IGNvbnN0IGEwMiA9IGEubTAyOyBjb25zdCBhMDMgPSBhLm0wMztcbiAgICAgICAgY29uc3QgYTEwID0gYS5tMDQ7IGNvbnN0IGExMSA9IGEubTA1OyBjb25zdCBhMTIgPSBhLm0wNjsgY29uc3QgYTEzID0gYS5tMDc7XG4gICAgICAgIGNvbnN0IGEyMCA9IGEubTA4OyBjb25zdCBhMjEgPSBhLm0wOTsgY29uc3QgYTIyID0gYS5tMTA7IGNvbnN0IGEyMyA9IGEubTExO1xuICAgICAgICBjb25zdCBhMzAgPSBhLm0xMjsgY29uc3QgYTMxID0gYS5tMTM7IGNvbnN0IGEzMiA9IGEubTE0OyBjb25zdCBhMzMgPSBhLm0xNTtcblxuICAgICAgICBjb25zdCBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gICAgICAgIGNvbnN0IGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMDtcbiAgICAgICAgY29uc3QgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwO1xuICAgICAgICBjb25zdCBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XG4gICAgICAgIGNvbnN0IGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMTtcbiAgICAgICAgY29uc3QgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyO1xuICAgICAgICBjb25zdCBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XG4gICAgICAgIGNvbnN0IGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMDtcbiAgICAgICAgY29uc3QgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwO1xuICAgICAgICBjb25zdCBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzE7XG4gICAgICAgIGNvbnN0IGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMTtcbiAgICAgICAgY29uc3QgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgcmV0dXJuIGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gTXVsdGlwbHkgdHdvIG1hdHJpY2VzIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXhcbiAgICAgKiBAemgg55+p6Zi15LmY5rOVXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBtdWx0aXBseSA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIGNvbnN0IGEwMCA9IGEubTAwOyBjb25zdCBhMDEgPSBhLm0wMTsgY29uc3QgYTAyID0gYS5tMDI7IGNvbnN0IGEwMyA9IGEubTAzO1xuICAgICAgICBjb25zdCBhMTAgPSBhLm0wNDsgY29uc3QgYTExID0gYS5tMDU7IGNvbnN0IGExMiA9IGEubTA2OyBjb25zdCBhMTMgPSBhLm0wNztcbiAgICAgICAgY29uc3QgYTIwID0gYS5tMDg7IGNvbnN0IGEyMSA9IGEubTA5OyBjb25zdCBhMjIgPSBhLm0xMDsgY29uc3QgYTIzID0gYS5tMTE7XG4gICAgICAgIGNvbnN0IGEzMCA9IGEubTEyOyBjb25zdCBhMzEgPSBhLm0xMzsgY29uc3QgYTMyID0gYS5tMTQ7IGNvbnN0IGEzMyA9IGEubTE1O1xuXG4gICAgICAgIC8vIENhY2hlIG9ubHkgdGhlIGN1cnJlbnQgbGluZSBvZiB0aGUgc2Vjb25kIG1hdHJpeFxuICAgICAgICBsZXQgYjAgPSBiLm0wMDsgbGV0IGIxID0gYi5tMDE7IGxldCBiMiA9IGIubTAyOyBsZXQgYjMgPSBiLm0wMztcbiAgICAgICAgb3V0Lm0wMCA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuICAgICAgICBvdXQubTAxID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gICAgICAgIG91dC5tMDIgPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgICAgICAgb3V0Lm0wMyA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuXG4gICAgICAgIGIwID0gYi5tMDQ7IGIxID0gYi5tMDU7IGIyID0gYi5tMDY7IGIzID0gYi5tMDc7XG4gICAgICAgIG91dC5tMDQgPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgICAgICAgb3V0Lm0wNSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICAgICAgICBvdXQubTA2ID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XG4gICAgICAgIG91dC5tMDcgPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcblxuICAgICAgICBiMCA9IGIubTA4OyBiMSA9IGIubTA5OyBiMiA9IGIubTEwOyBiMyA9IGIubTExO1xuICAgICAgICBvdXQubTA4ID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gICAgICAgIG91dC5tMDkgPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcbiAgICAgICAgb3V0Lm0xMCA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICAgICAgICBvdXQubTExID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG5cbiAgICAgICAgYjAgPSBiLm0xMjsgYjEgPSBiLm0xMzsgYjIgPSBiLm0xNDsgYjMgPSBiLm0xNTtcbiAgICAgICAgb3V0Lm0xMiA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuICAgICAgICBvdXQubTEzID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gICAgICAgIG91dC5tMTQgPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgICAgICAgb3V0Lm0xNSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBUcmFuc2Zvcm0gYSBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gdmVjdG9yIGFuZCBzYXZlIHJlc3VsdHMgdG8gdGhlIG91dCBtYXRyaXhcbiAgICAgKiBAemgg5Zyo57uZ5a6a55+p6Zi15Y+Y5o2i5Z+656GA5LiK5Yqg5YWl5Y+Y5o2iXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2Zvcm0gPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHY6IFZlY0xpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IHYueDsgY29uc3QgeSA9IHYueTsgY29uc3QgeiA9IHYuejtcbiAgICAgICAgaWYgKGEgPT09IG91dCkge1xuICAgICAgICAgICAgb3V0Lm0xMiA9IGEubTAwICogeCArIGEubTA0ICogeSArIGEubTA4ICogeiArIGEubTEyO1xuICAgICAgICAgICAgb3V0Lm0xMyA9IGEubTAxICogeCArIGEubTA1ICogeSArIGEubTA5ICogeiArIGEubTEzO1xuICAgICAgICAgICAgb3V0Lm0xNCA9IGEubTAyICogeCArIGEubTA2ICogeSArIGEubTEwICogeiArIGEubTE0O1xuICAgICAgICAgICAgb3V0Lm0xNSA9IGEubTAzICogeCArIGEubTA3ICogeSArIGEubTExICogeiArIGEubTE1O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYTAwID0gYS5tMDA7IGNvbnN0IGEwMSA9IGEubTAxOyBjb25zdCBhMDIgPSBhLm0wMjsgY29uc3QgYTAzID0gYS5tMDM7XG4gICAgICAgICAgICBjb25zdCBhMTAgPSBhLm0wNDsgY29uc3QgYTExID0gYS5tMDU7IGNvbnN0IGExMiA9IGEubTA2OyBjb25zdCBhMTMgPSBhLm0wNztcbiAgICAgICAgICAgIGNvbnN0IGEyMCA9IGEubTA4OyBjb25zdCBhMjEgPSBhLm0wOTsgY29uc3QgYTIyID0gYS5tMTA7IGNvbnN0IGEyMyA9IGEubTExO1xuICAgICAgICAgICAgY29uc3QgYTMwID0gYS5tMTI7IGNvbnN0IGEzMSA9IGEubTEzOyBjb25zdCBhMzIgPSBhLm0xNDsgY29uc3QgYTMzID0gYS5tMTU7XG5cbiAgICAgICAgICAgIG91dC5tMDAgPSBhMDA7IG91dC5tMDEgPSBhMDE7IG91dC5tMDIgPSBhMDI7IG91dC5tMDMgPSBhMDM7XG4gICAgICAgICAgICBvdXQubTA0ID0gYTEwOyBvdXQubTA1ID0gYTExOyBvdXQubTA2ID0gYTEyOyBvdXQubTA3ID0gYTEzO1xuICAgICAgICAgICAgb3V0Lm0wOCA9IGEyMDsgb3V0Lm0wOSA9IGEyMTsgb3V0Lm0xMCA9IGEyMjsgb3V0Lm0xMSA9IGEyMztcblxuICAgICAgICAgICAgb3V0Lm0xMiA9IGEwMCAqIHggKyBhMTAgKiB5ICsgYTIwICogeiArIGEubTEyO1xuICAgICAgICAgICAgb3V0Lm0xMyA9IGEwMSAqIHggKyBhMTEgKiB5ICsgYTIxICogeiArIGEubTEzO1xuICAgICAgICAgICAgb3V0Lm0xNCA9IGEwMiAqIHggKyBhMTIgKiB5ICsgYTIyICogeiArIGEubTE0O1xuICAgICAgICAgICAgb3V0Lm0xNSA9IGEwMyAqIHggKyBhMTMgKiB5ICsgYTIzICogeiArIGEubTE1O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFRyYW5zZm9ybSBhIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiB0cmFuc2xhdGlvbiB2ZWN0b3IgYW5kIHNhdmUgcmVzdWx0cyB0byB0aGUgb3V0IG1hdHJpeFxuICAgICAqIEB6aCDlnKjnu5nlrprnn6npmLXlj5jmjaLln7rnoYDkuIrliqDlhaXmlrDkvY3np7vlj5jmjaJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRyYW5zbGF0ZSA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgdjogVmVjTGlrZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ2Z1bmN0aW9uIGNoYW5nZWQnKTtcbiAgICAgICAgaWYgKGEgPT09IG91dCkge1xuICAgICAgICAgICAgb3V0Lm0xMiArPSB2Lng7XG4gICAgICAgICAgICBvdXQubTEzICs9IHYueTtcbiAgICAgICAgICAgIG91dC5tMTQgKz0gdi56O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0Lm0wMCA9IGEubTAwOyBvdXQubTAxID0gYS5tMDE7IG91dC5tMDIgPSBhLm0wMjsgb3V0Lm0wMyA9IGEubTAzO1xuICAgICAgICAgICAgb3V0Lm0wNCA9IGEubTA0OyBvdXQubTA1ID0gYS5tMDU7IG91dC5tMDYgPSBhLm0wNjsgb3V0Lm0wNyA9IGEubTA3O1xuICAgICAgICAgICAgb3V0Lm0wOCA9IGEubTA4OyBvdXQubTA5ID0gYS5tMDk7IG91dC5tMTAgPSBhLm0xMDsgb3V0Lm0xMSA9IGEubTExO1xuICAgICAgICAgICAgb3V0Lm0xMiArPSB2Lng7XG4gICAgICAgICAgICBvdXQubTEzICs9IHYueTtcbiAgICAgICAgICAgIG91dC5tMTQgKz0gdi56O1xuICAgICAgICAgICAgb3V0Lm0xNSA9IGEubTE1O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIE11bHRpcGx5IGEgbWF0cml4IHdpdGggYSBzY2FsZSBtYXRyaXggZ2l2ZW4gYnkgYSBzY2FsZSB2ZWN0b3IgYW5kIHNhdmUgdGhlIHJlc3VsdHMgaW50byB0aGUgb3V0IG1hdHJpeFxuICAgICAqIEB6aCDlnKjnu5nlrprnn6npmLXlj5jmjaLln7rnoYDkuIrliqDlhaXmlrDnvKnmlL7lj5jmjaJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNjYWxlIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCB2OiBWZWNMaWtlKSB7XG4gICAgICAgIGNvbnN0IHggPSB2Lng7IGNvbnN0IHkgPSB2Lnk7IGNvbnN0IHogPSB2Lno7XG4gICAgICAgIG91dC5tMDAgPSBhLm0wMCAqIHg7XG4gICAgICAgIG91dC5tMDEgPSBhLm0wMSAqIHg7XG4gICAgICAgIG91dC5tMDIgPSBhLm0wMiAqIHg7XG4gICAgICAgIG91dC5tMDMgPSBhLm0wMyAqIHg7XG4gICAgICAgIG91dC5tMDQgPSBhLm0wNCAqIHk7XG4gICAgICAgIG91dC5tMDUgPSBhLm0wNSAqIHk7XG4gICAgICAgIG91dC5tMDYgPSBhLm0wNiAqIHk7XG4gICAgICAgIG91dC5tMDcgPSBhLm0wNyAqIHk7XG4gICAgICAgIG91dC5tMDggPSBhLm0wOCAqIHo7XG4gICAgICAgIG91dC5tMDkgPSBhLm0wOSAqIHo7XG4gICAgICAgIG91dC5tMTAgPSBhLm0xMCAqIHo7XG4gICAgICAgIG91dC5tMTEgPSBhLm0xMSAqIHo7XG4gICAgICAgIG91dC5tMTIgPSBhLm0xMjtcbiAgICAgICAgb3V0Lm0xMyA9IGEubTEzO1xuICAgICAgICBvdXQubTE0ID0gYS5tMTQ7XG4gICAgICAgIG91dC5tMTUgPSBhLm0xNTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gUm90YXRlcyB0aGUgdHJhbnNmb3JtIGJ5IHRoZSBnaXZlbiBhbmdsZSBhbmQgc2F2ZSB0aGUgcmVzdWx0cyBpbnRvIHRoZSBvdXQgbWF0cml4XG4gICAgICogQHpoIOWcqOe7meWumuefqemYteWPmOaNouWfuuehgOS4iuWKoOWFpeaWsOaXi+i9rOWPmOaNolxuICAgICAqIEBwYXJhbSByYWQgQW5nbGUgb2Ygcm90YXRpb24gKGluIHJhZGlhbnMpXG4gICAgICogQHBhcmFtIGF4aXMgYXhpcyBvZiByb3RhdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcm90YXRlIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlciwgYXhpczogVmVjTGlrZSkge1xuICAgICAgICBsZXQgeCA9IGF4aXMueDsgbGV0IHkgPSBheGlzLnk7IGxldCB6ID0gYXhpcy56O1xuXG4gICAgICAgIGxldCBsZW4gPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KTtcblxuICAgICAgICBpZiAoTWF0aC5hYnMobGVuKSA8IEVQU0lMT04pIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgeCAqPSBsZW47XG4gICAgICAgIHkgKj0gbGVuO1xuICAgICAgICB6ICo9IGxlbjtcblxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIGNvbnN0IHQgPSAxIC0gYztcblxuICAgICAgICBjb25zdCBhMDAgPSBhLm0wMDsgY29uc3QgYTAxID0gYS5tMDE7IGNvbnN0IGEwMiA9IGEubTAyOyBjb25zdCBhMDMgPSBhLm0wMztcbiAgICAgICAgY29uc3QgYTEwID0gYS5tMDQ7IGNvbnN0IGExMSA9IGEubTA1OyBjb25zdCBhMTIgPSBhLm0wNjsgY29uc3QgYTEzID0gYS5tMDc7XG4gICAgICAgIGNvbnN0IGEyMCA9IGEubTA4OyBjb25zdCBhMjEgPSBhLm0wOTsgY29uc3QgYTIyID0gYS5tMTA7IGNvbnN0IGEyMyA9IGEubTExO1xuXG4gICAgICAgIC8vIENvbnN0cnVjdCB0aGUgZWxlbWVudHMgb2YgdGhlIHJvdGF0aW9uIG1hdHJpeFxuICAgICAgICBjb25zdCBiMDAgPSB4ICogeCAqIHQgKyBjOyBjb25zdCBiMDEgPSB5ICogeCAqIHQgKyB6ICogczsgY29uc3QgYjAyID0geiAqIHggKiB0IC0geSAqIHM7XG4gICAgICAgIGNvbnN0IGIxMCA9IHggKiB5ICogdCAtIHogKiBzOyBjb25zdCBiMTEgPSB5ICogeSAqIHQgKyBjOyBjb25zdCBiMTIgPSB6ICogeSAqIHQgKyB4ICogcztcbiAgICAgICAgY29uc3QgYjIwID0geCAqIHogKiB0ICsgeSAqIHM7IGNvbnN0IGIyMSA9IHkgKiB6ICogdCAtIHggKiBzOyBjb25zdCBiMjIgPSB6ICogeiAqIHQgKyBjO1xuXG4gICAgICAgIC8vIFBlcmZvcm0gcm90YXRpb24tc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgICAgIG91dC5tMDAgPSBhMDAgKiBiMDAgKyBhMTAgKiBiMDEgKyBhMjAgKiBiMDI7XG4gICAgICAgIG91dC5tMDEgPSBhMDEgKiBiMDAgKyBhMTEgKiBiMDEgKyBhMjEgKiBiMDI7XG4gICAgICAgIG91dC5tMDIgPSBhMDIgKiBiMDAgKyBhMTIgKiBiMDEgKyBhMjIgKiBiMDI7XG4gICAgICAgIG91dC5tMDMgPSBhMDMgKiBiMDAgKyBhMTMgKiBiMDEgKyBhMjMgKiBiMDI7XG4gICAgICAgIG91dC5tMDQgPSBhMDAgKiBiMTAgKyBhMTAgKiBiMTEgKyBhMjAgKiBiMTI7XG4gICAgICAgIG91dC5tMDUgPSBhMDEgKiBiMTAgKyBhMTEgKiBiMTEgKyBhMjEgKiBiMTI7XG4gICAgICAgIG91dC5tMDYgPSBhMDIgKiBiMTAgKyBhMTIgKiBiMTEgKyBhMjIgKiBiMTI7XG4gICAgICAgIG91dC5tMDcgPSBhMDMgKiBiMTAgKyBhMTMgKiBiMTEgKyBhMjMgKiBiMTI7XG4gICAgICAgIG91dC5tMDggPSBhMDAgKiBiMjAgKyBhMTAgKiBiMjEgKyBhMjAgKiBiMjI7XG4gICAgICAgIG91dC5tMDkgPSBhMDEgKiBiMjAgKyBhMTEgKiBiMjEgKyBhMjEgKiBiMjI7XG4gICAgICAgIG91dC5tMTAgPSBhMDIgKiBiMjAgKyBhMTIgKiBiMjEgKyBhMjIgKiBiMjI7XG4gICAgICAgIG91dC5tMTEgPSBhMDMgKiBiMjAgKyBhMTMgKiBiMjEgKyBhMjMgKiBiMjI7XG5cbiAgICAgICAgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgbGFzdCByb3dcbiAgICAgICAgaWYgKGEgIT09IG91dCkge1xuICAgICAgICAgICAgb3V0Lm0xMiA9IGEubTEyO1xuICAgICAgICAgICAgb3V0Lm0xMyA9IGEubTEzO1xuICAgICAgICAgICAgb3V0Lm0xNCA9IGEubTE0O1xuICAgICAgICAgICAgb3V0Lm0xNSA9IGEubTE1O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVHJhbnNmb3JtIGEgbWF0cml4IHdpdGggYSBnaXZlbiBhbmdsZSBhcm91bmQgWCBheGlzIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIHRoZSBvdXQgbWF0cml4XG4gICAgICogQHpoIOWcqOe7meWumuefqemYteWPmOaNouWfuuehgOS4iuWKoOWFpee7lSBYIOi9tOeahOaXi+i9rOWPmOaNolxuICAgICAqIEBwYXJhbSByYWQgQW5nbGUgb2Ygcm90YXRpb24gKGluIHJhZGlhbnMpXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByb3RhdGVYIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIGNvbnN0IGExMCA9IGEubTA0O1xuICAgICAgICBjb25zdCBhMTEgPSBhLm0wNTtcbiAgICAgICAgY29uc3QgYTEyID0gYS5tMDY7XG4gICAgICAgIGNvbnN0IGExMyA9IGEubTA3O1xuICAgICAgICBjb25zdCBhMjAgPSBhLm0wODtcbiAgICAgICAgY29uc3QgYTIxID0gYS5tMDk7XG4gICAgICAgIGNvbnN0IGEyMiA9IGEubTEwO1xuICAgICAgICBjb25zdCBhMjMgPSBhLm0xMTtcblxuICAgICAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgICAgICAgIG91dC5tMDAgPSBhLm0wMDtcbiAgICAgICAgICAgIG91dC5tMDEgPSBhLm0wMTtcbiAgICAgICAgICAgIG91dC5tMDIgPSBhLm0wMjtcbiAgICAgICAgICAgIG91dC5tMDMgPSBhLm0wMztcbiAgICAgICAgICAgIG91dC5tMTIgPSBhLm0xMjtcbiAgICAgICAgICAgIG91dC5tMTMgPSBhLm0xMztcbiAgICAgICAgICAgIG91dC5tMTQgPSBhLm0xNDtcbiAgICAgICAgICAgIG91dC5tMTUgPSBhLm0xNTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICAgICAgb3V0Lm0wNCA9IGExMCAqIGMgKyBhMjAgKiBzO1xuICAgICAgICBvdXQubTA1ID0gYTExICogYyArIGEyMSAqIHM7XG4gICAgICAgIG91dC5tMDYgPSBhMTIgKiBjICsgYTIyICogcztcbiAgICAgICAgb3V0Lm0wNyA9IGExMyAqIGMgKyBhMjMgKiBzO1xuICAgICAgICBvdXQubTA4ID0gYTIwICogYyAtIGExMCAqIHM7XG4gICAgICAgIG91dC5tMDkgPSBhMjEgKiBjIC0gYTExICogcztcbiAgICAgICAgb3V0Lm0xMCA9IGEyMiAqIGMgLSBhMTIgKiBzO1xuICAgICAgICBvdXQubTExID0gYTIzICogYyAtIGExMyAqIHM7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVHJhbnNmb3JtIGEgbWF0cml4IHdpdGggYSBnaXZlbiBhbmdsZSBhcm91bmQgWSBheGlzIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIHRoZSBvdXQgbWF0cml4XG4gICAgICogQHpoIOWcqOe7meWumuefqemYteWPmOaNouWfuuehgOS4iuWKoOWFpee7lSBZIOi9tOeahOaXi+i9rOWPmOaNolxuICAgICAqIEBwYXJhbSByYWQgQW5nbGUgb2Ygcm90YXRpb24gKGluIHJhZGlhbnMpXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByb3RhdGVZIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIGNvbnN0IGEwMCA9IGEubTAwO1xuICAgICAgICBjb25zdCBhMDEgPSBhLm0wMTtcbiAgICAgICAgY29uc3QgYTAyID0gYS5tMDI7XG4gICAgICAgIGNvbnN0IGEwMyA9IGEubTAzO1xuICAgICAgICBjb25zdCBhMjAgPSBhLm0wODtcbiAgICAgICAgY29uc3QgYTIxID0gYS5tMDk7XG4gICAgICAgIGNvbnN0IGEyMiA9IGEubTEwO1xuICAgICAgICBjb25zdCBhMjMgPSBhLm0xMTtcblxuICAgICAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgICAgICAgIG91dC5tMDQgPSBhLm0wNDtcbiAgICAgICAgICAgIG91dC5tMDUgPSBhLm0wNTtcbiAgICAgICAgICAgIG91dC5tMDYgPSBhLm0wNjtcbiAgICAgICAgICAgIG91dC5tMDcgPSBhLm0wNztcbiAgICAgICAgICAgIG91dC5tMTIgPSBhLm0xMjtcbiAgICAgICAgICAgIG91dC5tMTMgPSBhLm0xMztcbiAgICAgICAgICAgIG91dC5tMTQgPSBhLm0xNDtcbiAgICAgICAgICAgIG91dC5tMTUgPSBhLm0xNTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICAgICAgb3V0Lm0wMCA9IGEwMCAqIGMgLSBhMjAgKiBzO1xuICAgICAgICBvdXQubTAxID0gYTAxICogYyAtIGEyMSAqIHM7XG4gICAgICAgIG91dC5tMDIgPSBhMDIgKiBjIC0gYTIyICogcztcbiAgICAgICAgb3V0Lm0wMyA9IGEwMyAqIGMgLSBhMjMgKiBzO1xuICAgICAgICBvdXQubTA4ID0gYTAwICogcyArIGEyMCAqIGM7XG4gICAgICAgIG91dC5tMDkgPSBhMDEgKiBzICsgYTIxICogYztcbiAgICAgICAgb3V0Lm0xMCA9IGEwMiAqIHMgKyBhMjIgKiBjO1xuICAgICAgICBvdXQubTExID0gYTAzICogcyArIGEyMyAqIGM7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVHJhbnNmb3JtIGEgbWF0cml4IHdpdGggYSBnaXZlbiBhbmdsZSBhcm91bmQgWiBheGlzIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIHRoZSBvdXQgbWF0cml4XG4gICAgICogQHpoIOWcqOe7meWumuefqemYteWPmOaNouWfuuehgOS4iuWKoOWFpee7lSBaIOi9tOeahOaXi+i9rOWPmOaNolxuICAgICAqIEBwYXJhbSByYWQgQW5nbGUgb2Ygcm90YXRpb24gKGluIHJhZGlhbnMpXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByb3RhdGVaIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIGNvbnN0IGEwMCA9IGEubTAwO1xuICAgICAgICBjb25zdCBhMDEgPSBhLm0wMTtcbiAgICAgICAgY29uc3QgYTAyID0gYS5tMDI7XG4gICAgICAgIGNvbnN0IGEwMyA9IGEubTAzO1xuICAgICAgICBjb25zdCBhMTAgPSBhLm0wNDtcbiAgICAgICAgY29uc3QgYTExID0gYS5tMDU7XG4gICAgICAgIGNvbnN0IGExMiA9IGEubTA2O1xuICAgICAgICBjb25zdCBhMTMgPSBhLm0wNztcblxuICAgICAgICAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgICAgICBpZiAoYSAhPT0gb3V0KSB7XG4gICAgICAgICAgICBvdXQubTA4ID0gYS5tMDg7XG4gICAgICAgICAgICBvdXQubTA5ID0gYS5tMDk7XG4gICAgICAgICAgICBvdXQubTEwID0gYS5tMTA7XG4gICAgICAgICAgICBvdXQubTExID0gYS5tMTE7XG4gICAgICAgICAgICBvdXQubTEyID0gYS5tMTI7XG4gICAgICAgICAgICBvdXQubTEzID0gYS5tMTM7XG4gICAgICAgICAgICBvdXQubTE0ID0gYS5tMTQ7XG4gICAgICAgICAgICBvdXQubTE1ID0gYS5tMTU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgICAgIG91dC5tMDAgPSBhMDAgKiBjICsgYTEwICogcztcbiAgICAgICAgb3V0Lm0wMSA9IGEwMSAqIGMgKyBhMTEgKiBzO1xuICAgICAgICBvdXQubTAyID0gYTAyICogYyArIGExMiAqIHM7XG4gICAgICAgIG91dC5tMDMgPSBhMDMgKiBjICsgYTEzICogcztcbiAgICAgICAgb3V0Lm0wNCA9IGExMCAqIGMgLSBhMDAgKiBzO1xuICAgICAgICBvdXQubTA1ID0gYTExICogYyAtIGEwMSAqIHM7XG4gICAgICAgIG91dC5tMDYgPSBhMTIgKiBjIC0gYTAyICogcztcbiAgICAgICAgb3V0Lm0wNyA9IGExMyAqIGMgLSBhMDMgKiBzO1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgdGhlIG91dCBtYXRyaXggd2l0aCBhIHRyYW5zbGF0aW9uIHZlY3RvclxuICAgICAqIEB6aCDorqHnrpfkvY3np7vnn6npmLVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21UcmFuc2xhdGlvbiA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHY6IFZlY0xpa2UpIHtcbiAgICAgICAgb3V0Lm0wMCA9IDE7XG4gICAgICAgIG91dC5tMDEgPSAwO1xuICAgICAgICBvdXQubTAyID0gMDtcbiAgICAgICAgb3V0Lm0wMyA9IDA7XG4gICAgICAgIG91dC5tMDQgPSAwO1xuICAgICAgICBvdXQubTA1ID0gMTtcbiAgICAgICAgb3V0Lm0wNiA9IDA7XG4gICAgICAgIG91dC5tMDcgPSAwO1xuICAgICAgICBvdXQubTA4ID0gMDtcbiAgICAgICAgb3V0Lm0wOSA9IDA7XG4gICAgICAgIG91dC5tMTAgPSAxO1xuICAgICAgICBvdXQubTExID0gMDtcbiAgICAgICAgb3V0Lm0xMiA9IHYueDtcbiAgICAgICAgb3V0Lm0xMyA9IHYueTtcbiAgICAgICAgb3V0Lm0xNCA9IHYuejtcbiAgICAgICAgb3V0Lm0xNSA9IDE7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgdGhlIG91dCBtYXRyaXggd2l0aCBhIHNjYWxlIHZlY3RvclxuICAgICAqIEB6aCDorqHnrpfnvKnmlL7nn6npmLVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21TY2FsaW5nIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgdjogVmVjTGlrZSkge1xuICAgICAgICBvdXQubTAwID0gdi54O1xuICAgICAgICBvdXQubTAxID0gMDtcbiAgICAgICAgb3V0Lm0wMiA9IDA7XG4gICAgICAgIG91dC5tMDMgPSAwO1xuICAgICAgICBvdXQubTA0ID0gMDtcbiAgICAgICAgb3V0Lm0wNSA9IHYueTtcbiAgICAgICAgb3V0Lm0wNiA9IDA7XG4gICAgICAgIG91dC5tMDcgPSAwO1xuICAgICAgICBvdXQubTA4ID0gMDtcbiAgICAgICAgb3V0Lm0wOSA9IDA7XG4gICAgICAgIG91dC5tMTAgPSB2Lno7XG4gICAgICAgIG91dC5tMTEgPSAwO1xuICAgICAgICBvdXQubTEyID0gMDtcbiAgICAgICAgb3V0Lm0xMyA9IDA7XG4gICAgICAgIG91dC5tMTQgPSAwO1xuICAgICAgICBvdXQubTE1ID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0cyB0aGUgb3V0IG1hdHJpeCB3aXRoIHJvdGF0aW9uIGFuZ2xlXG4gICAgICogQHpoIOiuoeeul+aXi+i9rOefqemYtVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVJvdGF0aW9uIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcmFkOiBudW1iZXIsIGF4aXM6IFZlY0xpa2UpIHtcbiAgICAgICAgbGV0IHggPSBheGlzLng7IGxldCB5ID0gYXhpcy55OyBsZXQgeiA9IGF4aXMuejtcbiAgICAgICAgbGV0IGxlbiA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xuXG4gICAgICAgIGlmIChNYXRoLmFicyhsZW4pIDwgRVBTSUxPTikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZW4gPSAxIC8gbGVuO1xuICAgICAgICB4ICo9IGxlbjtcbiAgICAgICAgeSAqPSBsZW47XG4gICAgICAgIHogKj0gbGVuO1xuXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQpO1xuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MocmFkKTtcbiAgICAgICAgY29uc3QgdCA9IDEgLSBjO1xuXG4gICAgICAgIC8vIFBlcmZvcm0gcm90YXRpb24tc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgICAgIG91dC5tMDAgPSB4ICogeCAqIHQgKyBjO1xuICAgICAgICBvdXQubTAxID0geSAqIHggKiB0ICsgeiAqIHM7XG4gICAgICAgIG91dC5tMDIgPSB6ICogeCAqIHQgLSB5ICogcztcbiAgICAgICAgb3V0Lm0wMyA9IDA7XG4gICAgICAgIG91dC5tMDQgPSB4ICogeSAqIHQgLSB6ICogcztcbiAgICAgICAgb3V0Lm0wNSA9IHkgKiB5ICogdCArIGM7XG4gICAgICAgIG91dC5tMDYgPSB6ICogeSAqIHQgKyB4ICogcztcbiAgICAgICAgb3V0Lm0wNyA9IDA7XG4gICAgICAgIG91dC5tMDggPSB4ICogeiAqIHQgKyB5ICogcztcbiAgICAgICAgb3V0Lm0wOSA9IHkgKiB6ICogdCAtIHggKiBzO1xuICAgICAgICBvdXQubTEwID0geiAqIHogKiB0ICsgYztcbiAgICAgICAgb3V0Lm0xMSA9IDA7XG4gICAgICAgIG91dC5tMTIgPSAwO1xuICAgICAgICBvdXQubTEzID0gMDtcbiAgICAgICAgb3V0Lm0xNCA9IDA7XG4gICAgICAgIG91dC5tMTUgPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBtYXRyaXggcmVwcmVzZW50aW5nIGEgcm90YXRpb24gYXJvdW5kIHRoZSBYIGF4aXNcbiAgICAgKiBAemgg6K6h566X57uVIFgg6L2055qE5peL6L2s55+p6Zi1XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmcm9tWFJvdGF0aW9uIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgcmFkOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7IGNvbnN0IGMgPSBNYXRoLmNvcyhyYWQpO1xuXG4gICAgICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICAgICAgb3V0Lm0wMCA9IDE7XG4gICAgICAgIG91dC5tMDEgPSAwO1xuICAgICAgICBvdXQubTAyID0gMDtcbiAgICAgICAgb3V0Lm0wMyA9IDA7XG4gICAgICAgIG91dC5tMDQgPSAwO1xuICAgICAgICBvdXQubTA1ID0gYztcbiAgICAgICAgb3V0Lm0wNiA9IHM7XG4gICAgICAgIG91dC5tMDcgPSAwO1xuICAgICAgICBvdXQubTA4ID0gMDtcbiAgICAgICAgb3V0Lm0wOSA9IC1zO1xuICAgICAgICBvdXQubTEwID0gYztcbiAgICAgICAgb3V0Lm0xMSA9IDA7XG4gICAgICAgIG91dC5tMTIgPSAwO1xuICAgICAgICBvdXQubTEzID0gMDtcbiAgICAgICAgb3V0Lm0xNCA9IDA7XG4gICAgICAgIG91dC5tMTUgPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBtYXRyaXggcmVwcmVzZW50aW5nIGEgcm90YXRpb24gYXJvdW5kIHRoZSBZIGF4aXNcbiAgICAgKiBAemgg6K6h566X57uVIFkg6L2055qE5peL6L2s55+p6Zi1XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmcm9tWVJvdGF0aW9uIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgcmFkOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7IGNvbnN0IGMgPSBNYXRoLmNvcyhyYWQpO1xuXG4gICAgICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICAgICAgb3V0Lm0wMCA9IGM7XG4gICAgICAgIG91dC5tMDEgPSAwO1xuICAgICAgICBvdXQubTAyID0gLXM7XG4gICAgICAgIG91dC5tMDMgPSAwO1xuICAgICAgICBvdXQubTA0ID0gMDtcbiAgICAgICAgb3V0Lm0wNSA9IDE7XG4gICAgICAgIG91dC5tMDYgPSAwO1xuICAgICAgICBvdXQubTA3ID0gMDtcbiAgICAgICAgb3V0Lm0wOCA9IHM7XG4gICAgICAgIG91dC5tMDkgPSAwO1xuICAgICAgICBvdXQubTEwID0gYztcbiAgICAgICAgb3V0Lm0xMSA9IDA7XG4gICAgICAgIG91dC5tMTIgPSAwO1xuICAgICAgICBvdXQubTEzID0gMDtcbiAgICAgICAgb3V0Lm0xNCA9IDA7XG4gICAgICAgIG91dC5tMTUgPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBtYXRyaXggcmVwcmVzZW50aW5nIGEgcm90YXRpb24gYXJvdW5kIHRoZSBaIGF4aXNcbiAgICAgKiBAemgg6K6h566X57uVIFog6L2055qE5peL6L2s55+p6Zi1XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmcm9tWlJvdGF0aW9uIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgcmFkOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7IGNvbnN0IGMgPSBNYXRoLmNvcyhyYWQpO1xuXG4gICAgICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICAgICAgb3V0Lm0wMCA9IGM7XG4gICAgICAgIG91dC5tMDEgPSBzO1xuICAgICAgICBvdXQubTAyID0gMDtcbiAgICAgICAgb3V0Lm0wMyA9IDA7XG4gICAgICAgIG91dC5tMDQgPSAtcztcbiAgICAgICAgb3V0Lm0wNSA9IGM7XG4gICAgICAgIG91dC5tMDYgPSAwO1xuICAgICAgICBvdXQubTA3ID0gMDtcbiAgICAgICAgb3V0Lm0wOCA9IDA7XG4gICAgICAgIG91dC5tMDkgPSAwO1xuICAgICAgICBvdXQubTEwID0gMTtcbiAgICAgICAgb3V0Lm0xMSA9IDA7XG4gICAgICAgIG91dC5tMTIgPSAwO1xuICAgICAgICBvdXQubTEzID0gMDtcbiAgICAgICAgb3V0Lm0xNCA9IDA7XG4gICAgICAgIG91dC5tMTUgPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSB0cmFuc2Zvcm0gcmVwcmVzZW50aW5nIHRoZSBjb21iaW5hdGlvbiBvZiBhIHJvdGF0aW9uIGFuZCBhIHRyYW5zbGF0aW9uXG4gICAgICogQHpoIOagueaNruaXi+i9rOWSjOS9jeenu+S/oeaBr+iuoeeul+efqemYtVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVJUIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcTogUXVhdCwgdjogVmVjTGlrZSkge1xuICAgICAgICBjb25zdCB4ID0gcS54OyBjb25zdCB5ID0gcS55OyBjb25zdCB6ID0gcS56OyBjb25zdCB3ID0gcS53O1xuICAgICAgICBjb25zdCB4MiA9IHggKyB4O1xuICAgICAgICBjb25zdCB5MiA9IHkgKyB5O1xuICAgICAgICBjb25zdCB6MiA9IHogKyB6O1xuXG4gICAgICAgIGNvbnN0IHh4ID0geCAqIHgyO1xuICAgICAgICBjb25zdCB4eSA9IHggKiB5MjtcbiAgICAgICAgY29uc3QgeHogPSB4ICogejI7XG4gICAgICAgIGNvbnN0IHl5ID0geSAqIHkyO1xuICAgICAgICBjb25zdCB5eiA9IHkgKiB6MjtcbiAgICAgICAgY29uc3QgenogPSB6ICogejI7XG4gICAgICAgIGNvbnN0IHd4ID0gdyAqIHgyO1xuICAgICAgICBjb25zdCB3eSA9IHcgKiB5MjtcbiAgICAgICAgY29uc3Qgd3ogPSB3ICogejI7XG5cbiAgICAgICAgb3V0Lm0wMCA9IDEgLSAoeXkgKyB6eik7XG4gICAgICAgIG91dC5tMDEgPSB4eSArIHd6O1xuICAgICAgICBvdXQubTAyID0geHogLSB3eTtcbiAgICAgICAgb3V0Lm0wMyA9IDA7XG4gICAgICAgIG91dC5tMDQgPSB4eSAtIHd6O1xuICAgICAgICBvdXQubTA1ID0gMSAtICh4eCArIHp6KTtcbiAgICAgICAgb3V0Lm0wNiA9IHl6ICsgd3g7XG4gICAgICAgIG91dC5tMDcgPSAwO1xuICAgICAgICBvdXQubTA4ID0geHogKyB3eTtcbiAgICAgICAgb3V0Lm0wOSA9IHl6IC0gd3g7XG4gICAgICAgIG91dC5tMTAgPSAxIC0gKHh4ICsgeXkpO1xuICAgICAgICBvdXQubTExID0gMDtcbiAgICAgICAgb3V0Lm0xMiA9IHYueDtcbiAgICAgICAgb3V0Lm0xMyA9IHYueTtcbiAgICAgICAgb3V0Lm0xNCA9IHYuejtcbiAgICAgICAgb3V0Lm0xNSA9IDE7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gRXh0cmFjdHMgdGhlIHRyYW5zbGF0aW9uIGZyb20gdGhlIG1hdHJpeCwgYXNzdW1pbmcgaXQncyBjb21wb3NlZCBpbiBvcmRlciBvZiBzY2FsZSwgcm90YXRpb24sIHRyYW5zbGF0aW9uXG4gICAgICogQHpoIOaPkOWPluefqemYteeahOS9jeenu+S/oeaBrywg6buY6K6k55+p6Zi15Lit55qE5Y+Y5o2i5LulIFMtPlItPlQg55qE6aG65bqP5bqU55SoXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRUcmFuc2xhdGlvbiA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBWZWNMaWtlLCBtYXQ6IE91dCkge1xuICAgICAgICBvdXQueCA9IG1hdC5tMTI7XG4gICAgICAgIG91dC55ID0gbWF0Lm0xMztcbiAgICAgICAgb3V0LnogPSBtYXQubTE0O1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEV4dHJhY3RzIHRoZSBzY2FsZSB2ZWN0b3IgZnJvbSB0aGUgbWF0cml4LCBhc3N1bWluZyBpdCdzIGNvbXBvc2VkIGluIG9yZGVyIG9mIHNjYWxlLCByb3RhdGlvbiwgdHJhbnNsYXRpb25cbiAgICAgKiBAemgg5o+Q5Y+W55+p6Zi155qE57yp5pS+5L+h5oGvLCDpu5jorqTnn6npmLXkuK3nmoTlj5jmjaLku6UgUy0+Ui0+VCDnmoTpobrluo/lupTnlKhcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFNjYWxpbmcgPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogVmVjTGlrZSwgbWF0OiBPdXQpIHtcbiAgICAgICAgY29uc3QgbTAwID0gbTNfMS5tMDAgPSBtYXQubTAwO1xuICAgICAgICBjb25zdCBtMDEgPSBtM18xLm0wMSA9IG1hdC5tMDE7XG4gICAgICAgIGNvbnN0IG0wMiA9IG0zXzEubTAyID0gbWF0Lm0wMjtcbiAgICAgICAgY29uc3QgbTA0ID0gbTNfMS5tMDMgPSBtYXQubTA0O1xuICAgICAgICBjb25zdCBtMDUgPSBtM18xLm0wNCA9IG1hdC5tMDU7XG4gICAgICAgIGNvbnN0IG0wNiA9IG0zXzEubTA1ID0gbWF0Lm0wNjtcbiAgICAgICAgY29uc3QgbTA4ID0gbTNfMS5tMDYgPSBtYXQubTA4O1xuICAgICAgICBjb25zdCBtMDkgPSBtM18xLm0wNyA9IG1hdC5tMDk7XG4gICAgICAgIGNvbnN0IG0xMCA9IG0zXzEubTA4ID0gbWF0Lm0xMDtcbiAgICAgICAgb3V0LnggPSBNYXRoLnNxcnQobTAwICogbTAwICsgbTAxICogbTAxICsgbTAyICogbTAyKTtcbiAgICAgICAgb3V0LnkgPSBNYXRoLnNxcnQobTA0ICogbTA0ICsgbTA1ICogbTA1ICsgbTA2ICogbTA2KTtcbiAgICAgICAgb3V0LnogPSBNYXRoLnNxcnQobTA4ICogbTA4ICsgbTA5ICogbTA5ICsgbTEwICogbTEwKTtcbiAgICAgICAgLy8gYWNjb3VudCBmb3IgcmVmZWN0aW9uc1xuICAgICAgICBpZiAoTWF0My5kZXRlcm1pbmFudChtM18xKSA8IDApIHsgb3V0LnggKj0gLTE7IH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gRXh0cmFjdHMgdGhlIHJvdGF0aW9uIGZyb20gdGhlIG1hdHJpeCwgYXNzdW1pbmcgaXQncyBjb21wb3NlZCBpbiBvcmRlciBvZiBzY2FsZSwgcm90YXRpb24sIHRyYW5zbGF0aW9uXG4gICAgICogQHpoIOaPkOWPluefqemYteeahOaXi+i9rOS/oeaBrywg6buY6K6k6L6T5YWl55+p6Zi15LiN5ZCr5pyJ57yp5pS+5L+h5oGv77yM5aaC6ICD6JmR57yp5pS+5bqU5L2/55SoIGB0b1JUU2Ag5Ye95pWw44CCXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRSb3RhdGlvbiA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBRdWF0LCBtYXQ6IE91dCkge1xuICAgICAgICBjb25zdCB0cmFjZSA9IG1hdC5tMDAgKyBtYXQubTA1ICsgbWF0Lm0xMDtcbiAgICAgICAgbGV0IFMgPSAwO1xuXG4gICAgICAgIGlmICh0cmFjZSA+IDApIHtcbiAgICAgICAgICAgIFMgPSBNYXRoLnNxcnQodHJhY2UgKyAxLjApICogMjtcbiAgICAgICAgICAgIG91dC53ID0gMC4yNSAqIFM7XG4gICAgICAgICAgICBvdXQueCA9IChtYXQubTA2IC0gbWF0Lm0wOSkgLyBTO1xuICAgICAgICAgICAgb3V0LnkgPSAobWF0Lm0wOCAtIG1hdC5tMDIpIC8gUztcbiAgICAgICAgICAgIG91dC56ID0gKG1hdC5tMDEgLSBtYXQubTA0KSAvIFM7XG4gICAgICAgIH0gZWxzZSBpZiAoKG1hdC5tMDAgPiBtYXQubTA1KSAmJiAobWF0Lm0wMCA+IG1hdC5tMTApKSB7XG4gICAgICAgICAgICBTID0gTWF0aC5zcXJ0KDEuMCArIG1hdC5tMDAgLSBtYXQubTA1IC0gbWF0Lm0xMCkgKiAyO1xuICAgICAgICAgICAgb3V0LncgPSAobWF0Lm0wNiAtIG1hdC5tMDkpIC8gUztcbiAgICAgICAgICAgIG91dC54ID0gMC4yNSAqIFM7XG4gICAgICAgICAgICBvdXQueSA9IChtYXQubTAxICsgbWF0Lm0wNCkgLyBTO1xuICAgICAgICAgICAgb3V0LnogPSAobWF0Lm0wOCArIG1hdC5tMDIpIC8gUztcbiAgICAgICAgfSBlbHNlIGlmIChtYXQubTA1ID4gbWF0Lm0xMCkge1xuICAgICAgICAgICAgUyA9IE1hdGguc3FydCgxLjAgKyBtYXQubTA1IC0gbWF0Lm0wMCAtIG1hdC5tMTApICogMjtcbiAgICAgICAgICAgIG91dC53ID0gKG1hdC5tMDggLSBtYXQubTAyKSAvIFM7XG4gICAgICAgICAgICBvdXQueCA9IChtYXQubTAxICsgbWF0Lm0wNCkgLyBTO1xuICAgICAgICAgICAgb3V0LnkgPSAwLjI1ICogUztcbiAgICAgICAgICAgIG91dC56ID0gKG1hdC5tMDYgKyBtYXQubTA5KSAvIFM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBTID0gTWF0aC5zcXJ0KDEuMCArIG1hdC5tMTAgLSBtYXQubTAwIC0gbWF0Lm0wNSkgKiAyO1xuICAgICAgICAgICAgb3V0LncgPSAobWF0Lm0wMSAtIG1hdC5tMDQpIC8gUztcbiAgICAgICAgICAgIG91dC54ID0gKG1hdC5tMDggKyBtYXQubTAyKSAvIFM7XG4gICAgICAgICAgICBvdXQueSA9IChtYXQubTA2ICsgbWF0Lm0wOSkgLyBTO1xuICAgICAgICAgICAgb3V0LnogPSAwLjI1ICogUztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEV4dHJhY3RzIHRoZSBzY2FsZSwgcm90YXRpb24gYW5kIHRyYW5zbGF0aW9uIGZyb20gdGhlIG1hdHJpeCwgYXNzdW1pbmcgaXQncyBjb21wb3NlZCBpbiBvcmRlciBvZiBzY2FsZSwgcm90YXRpb24sIHRyYW5zbGF0aW9uXG4gICAgICogQHpoIOaPkOWPluaXi+i9rOOAgeS9jeenu+OAgee8qeaUvuS/oeaBr++8jCDpu5jorqTnn6npmLXkuK3nmoTlj5jmjaLku6UgUy0+Ui0+VCDnmoTpobrluo/lupTnlKhcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRvUlRTIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChtOiBPdXQsIHE6IFF1YXQsIHY6IFZlY0xpa2UsIHM6IFZlY0xpa2UpIHtcbiAgICAgICAgcy54ID0gVmVjMy5zZXQodjNfMSwgbS5tMDAsIG0ubTAxLCBtLm0wMikubGVuZ3RoKCk7XG4gICAgICAgIG0zXzEubTAwID0gbS5tMDAgLyBzLng7XG4gICAgICAgIG0zXzEubTAxID0gbS5tMDEgLyBzLng7XG4gICAgICAgIG0zXzEubTAyID0gbS5tMDIgLyBzLng7XG4gICAgICAgIHMueSA9IFZlYzMuc2V0KHYzXzEsIG0ubTA0LCBtLm0wNSwgbS5tMDYpLmxlbmd0aCgpO1xuICAgICAgICBtM18xLm0wMyA9IG0ubTA0IC8gcy55O1xuICAgICAgICBtM18xLm0wNCA9IG0ubTA1IC8gcy55O1xuICAgICAgICBtM18xLm0wNSA9IG0ubTA2IC8gcy55O1xuICAgICAgICBzLnogPSBWZWMzLnNldCh2M18xLCBtLm0wOCwgbS5tMDksIG0ubTEwKS5sZW5ndGgoKTtcbiAgICAgICAgbTNfMS5tMDYgPSBtLm0wOCAvIHMuejtcbiAgICAgICAgbTNfMS5tMDcgPSBtLm0wOSAvIHMuejtcbiAgICAgICAgbTNfMS5tMDggPSBtLm0xMCAvIHMuejtcbiAgICAgICAgY29uc3QgZGV0ID0gTWF0My5kZXRlcm1pbmFudChtM18xKTtcbiAgICAgICAgaWYgKGRldCA8IDApIHsgcy54ICo9IC0xOyBtM18xLm0wMCAqPSAtMTsgbTNfMS5tMDEgKj0gLTE7IG0zXzEubTAyICo9IC0xOyB9XG4gICAgICAgIFF1YXQuZnJvbU1hdDMocSwgbTNfMSk7IC8vIGFscmVhZHkgbm9ybWFsaXplZFxuICAgICAgICBWZWMzLnNldCh2LCBtLm0xMiwgbS5tMTMsIG0ubTE0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ29tcG9zZSBhIG1hdHJpeCBmcm9tIHNjYWxlLCByb3RhdGlvbiBhbmQgdHJhbnNsYXRpb24sIGFwcGxpZWQgaW4gb3JkZXIuXG4gICAgICogQHpoIOagueaNruaXi+i9rOOAgeS9jeenu+OAgee8qeaUvuS/oeaBr+iuoeeul+efqemYte+8jOS7pSBTLT5SLT5UIOeahOmhuuW6j+W6lOeUqFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVJUUyA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHE6IFF1YXQsIHY6IFZlY0xpa2UsIHM6IFZlY0xpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IHEueDsgY29uc3QgeSA9IHEueTsgY29uc3QgeiA9IHEuejsgY29uc3QgdyA9IHEudztcbiAgICAgICAgY29uc3QgeDIgPSB4ICsgeDtcbiAgICAgICAgY29uc3QgeTIgPSB5ICsgeTtcbiAgICAgICAgY29uc3QgejIgPSB6ICsgejtcblxuICAgICAgICBjb25zdCB4eCA9IHggKiB4MjtcbiAgICAgICAgY29uc3QgeHkgPSB4ICogeTI7XG4gICAgICAgIGNvbnN0IHh6ID0geCAqIHoyO1xuICAgICAgICBjb25zdCB5eSA9IHkgKiB5MjtcbiAgICAgICAgY29uc3QgeXogPSB5ICogejI7XG4gICAgICAgIGNvbnN0IHp6ID0geiAqIHoyO1xuICAgICAgICBjb25zdCB3eCA9IHcgKiB4MjtcbiAgICAgICAgY29uc3Qgd3kgPSB3ICogeTI7XG4gICAgICAgIGNvbnN0IHd6ID0gdyAqIHoyO1xuICAgICAgICBjb25zdCBzeCA9IHMueDtcbiAgICAgICAgY29uc3Qgc3kgPSBzLnk7XG4gICAgICAgIGNvbnN0IHN6ID0gcy56O1xuXG4gICAgICAgIG91dC5tMDAgPSAoMSAtICh5eSArIHp6KSkgKiBzeDtcbiAgICAgICAgb3V0Lm0wMSA9ICh4eSArIHd6KSAqIHN4O1xuICAgICAgICBvdXQubTAyID0gKHh6IC0gd3kpICogc3g7XG4gICAgICAgIG91dC5tMDMgPSAwO1xuICAgICAgICBvdXQubTA0ID0gKHh5IC0gd3opICogc3k7XG4gICAgICAgIG91dC5tMDUgPSAoMSAtICh4eCArIHp6KSkgKiBzeTtcbiAgICAgICAgb3V0Lm0wNiA9ICh5eiArIHd4KSAqIHN5O1xuICAgICAgICBvdXQubTA3ID0gMDtcbiAgICAgICAgb3V0Lm0wOCA9ICh4eiArIHd5KSAqIHN6O1xuICAgICAgICBvdXQubTA5ID0gKHl6IC0gd3gpICogc3o7XG4gICAgICAgIG91dC5tMTAgPSAoMSAtICh4eCArIHl5KSkgKiBzejtcbiAgICAgICAgb3V0Lm0xMSA9IDA7XG4gICAgICAgIG91dC5tMTIgPSB2Lng7XG4gICAgICAgIG91dC5tMTMgPSB2Lnk7XG4gICAgICAgIG91dC5tMTQgPSB2Lno7XG4gICAgICAgIG91dC5tMTUgPSAxO1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENvbXBvc2UgYSBtYXRyaXggZnJvbSBzY2FsZSwgcm90YXRpb24gYW5kIHRyYW5zbGF0aW9uLCBhcHBsaWVkIGluIG9yZGVyLCBmcm9tIGEgZ2l2ZW4gb3JpZ2luXG4gICAgICogQHpoIOagueaNruaMh+WumueahOaXi+i9rOOAgeS9jeenu+OAgee8qeaUvuWPiuWPmOaNouS4reW/g+S/oeaBr+iuoeeul+efqemYte+8jOS7pSBTLT5SLT5UIOeahOmhuuW6j+W6lOeUqFxuICAgICAqIEBwYXJhbSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cbiAgICAgKiBAcGFyYW0gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gcyBTY2FsaW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBvIHRyYW5zZm9ybWF0aW9uIENlbnRlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVJUU09yaWdpbiA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHE6IFF1YXQsIHY6IFZlY0xpa2UsIHM6IFZlY0xpa2UsIG86IFZlY0xpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IHEueDsgY29uc3QgeSA9IHEueTsgY29uc3QgeiA9IHEuejsgY29uc3QgdyA9IHEudztcbiAgICAgICAgY29uc3QgeDIgPSB4ICsgeDtcbiAgICAgICAgY29uc3QgeTIgPSB5ICsgeTtcbiAgICAgICAgY29uc3QgejIgPSB6ICsgejtcblxuICAgICAgICBjb25zdCB4eCA9IHggKiB4MjtcbiAgICAgICAgY29uc3QgeHkgPSB4ICogeTI7XG4gICAgICAgIGNvbnN0IHh6ID0geCAqIHoyO1xuICAgICAgICBjb25zdCB5eSA9IHkgKiB5MjtcbiAgICAgICAgY29uc3QgeXogPSB5ICogejI7XG4gICAgICAgIGNvbnN0IHp6ID0geiAqIHoyO1xuICAgICAgICBjb25zdCB3eCA9IHcgKiB4MjtcbiAgICAgICAgY29uc3Qgd3kgPSB3ICogeTI7XG4gICAgICAgIGNvbnN0IHd6ID0gdyAqIHoyO1xuXG4gICAgICAgIGNvbnN0IHN4ID0gcy54O1xuICAgICAgICBjb25zdCBzeSA9IHMueTtcbiAgICAgICAgY29uc3Qgc3ogPSBzLno7XG5cbiAgICAgICAgY29uc3Qgb3ggPSBvLng7XG4gICAgICAgIGNvbnN0IG95ID0gby55O1xuICAgICAgICBjb25zdCBveiA9IG8uejtcblxuICAgICAgICBvdXQubTAwID0gKDEgLSAoeXkgKyB6eikpICogc3g7XG4gICAgICAgIG91dC5tMDEgPSAoeHkgKyB3eikgKiBzeDtcbiAgICAgICAgb3V0Lm0wMiA9ICh4eiAtIHd5KSAqIHN4O1xuICAgICAgICBvdXQubTAzID0gMDtcbiAgICAgICAgb3V0Lm0wNCA9ICh4eSAtIHd6KSAqIHN5O1xuICAgICAgICBvdXQubTA1ID0gKDEgLSAoeHggKyB6eikpICogc3k7XG4gICAgICAgIG91dC5tMDYgPSAoeXogKyB3eCkgKiBzeTtcbiAgICAgICAgb3V0Lm0wNyA9IDA7XG4gICAgICAgIG91dC5tMDggPSAoeHogKyB3eSkgKiBzejtcbiAgICAgICAgb3V0Lm0wOSA9ICh5eiAtIHd4KSAqIHN6O1xuICAgICAgICBvdXQubTEwID0gKDEgLSAoeHggKyB5eSkpICogc3o7XG4gICAgICAgIG91dC5tMTEgPSAwO1xuICAgICAgICBvdXQubTEyID0gdi54ICsgb3ggLSAob3V0Lm0wMCAqIG94ICsgb3V0Lm0wNCAqIG95ICsgb3V0Lm0wOCAqIG96KTtcbiAgICAgICAgb3V0Lm0xMyA9IHYueSArIG95IC0gKG91dC5tMDEgKiBveCArIG91dC5tMDUgKiBveSArIG91dC5tMDkgKiBveik7XG4gICAgICAgIG91dC5tMTQgPSB2LnogKyBveiAtIChvdXQubTAyICogb3ggKyBvdXQubTA2ICogb3kgKyBvdXQubTEwICogb3opO1xuICAgICAgICBvdXQubTE1ID0gMTtcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXRzIHRoZSBvdXQgbWF0cml4IHdpdGggdGhlIGdpdmVuIHF1YXRlcm5pb25cbiAgICAgKiBAemgg5qC55o2u5oyH5a6a55qE5peL6L2s5L+h5oGv6K6h566X55+p6Zi1XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmcm9tUXVhdCA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIHE6IFF1YXQpIHtcbiAgICAgICAgY29uc3QgeCA9IHEueDsgY29uc3QgeSA9IHEueTsgY29uc3QgeiA9IHEuejsgY29uc3QgdyA9IHEudztcbiAgICAgICAgY29uc3QgeDIgPSB4ICsgeDtcbiAgICAgICAgY29uc3QgeTIgPSB5ICsgeTtcbiAgICAgICAgY29uc3QgejIgPSB6ICsgejtcblxuICAgICAgICBjb25zdCB4eCA9IHggKiB4MjtcbiAgICAgICAgY29uc3QgeXggPSB5ICogeDI7XG4gICAgICAgIGNvbnN0IHl5ID0geSAqIHkyO1xuICAgICAgICBjb25zdCB6eCA9IHogKiB4MjtcbiAgICAgICAgY29uc3QgenkgPSB6ICogeTI7XG4gICAgICAgIGNvbnN0IHp6ID0geiAqIHoyO1xuICAgICAgICBjb25zdCB3eCA9IHcgKiB4MjtcbiAgICAgICAgY29uc3Qgd3kgPSB3ICogeTI7XG4gICAgICAgIGNvbnN0IHd6ID0gdyAqIHoyO1xuXG4gICAgICAgIG91dC5tMDAgPSAxIC0geXkgLSB6ejtcbiAgICAgICAgb3V0Lm0wMSA9IHl4ICsgd3o7XG4gICAgICAgIG91dC5tMDIgPSB6eCAtIHd5O1xuICAgICAgICBvdXQubTAzID0gMDtcblxuICAgICAgICBvdXQubTA0ID0geXggLSB3ejtcbiAgICAgICAgb3V0Lm0wNSA9IDEgLSB4eCAtIHp6O1xuICAgICAgICBvdXQubTA2ID0genkgKyB3eDtcbiAgICAgICAgb3V0Lm0wNyA9IDA7XG5cbiAgICAgICAgb3V0Lm0wOCA9IHp4ICsgd3k7XG4gICAgICAgIG91dC5tMDkgPSB6eSAtIHd4O1xuICAgICAgICBvdXQubTEwID0gMSAtIHh4IC0geXk7XG4gICAgICAgIG91dC5tMTEgPSAwO1xuXG4gICAgICAgIG91dC5tMTIgPSAwO1xuICAgICAgICBvdXQubTEzID0gMDtcbiAgICAgICAgb3V0Lm0xNCA9IDA7XG4gICAgICAgIG91dC5tMTUgPSAxO1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIG1hdHJpeCByZXByZXNlbnRpbmcgdGhlIGdpdmVuIGZydXN0dW1cbiAgICAgKiBAemgg5qC55o2u5oyH5a6a55qE6KeG6ZSl5L2T5L+h5oGv6K6h566X55+p6Zi1XG4gICAgICogQHBhcmFtIGxlZnQgVGhlIFggY29vcmRpbmF0ZSBvZiB0aGUgbGVmdCBzaWRlIG9mIHRoZSBuZWFyIHByb2plY3Rpb24gcGxhbmUgaW4gdmlldyBzcGFjZS5cbiAgICAgKiBAcGFyYW0gcmlnaHQgVGhlIFggY29vcmRpbmF0ZSBvZiB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgbmVhciBwcm9qZWN0aW9uIHBsYW5lIGluIHZpZXcgc3BhY2UuXG4gICAgICogQHBhcmFtIGJvdHRvbSBUaGUgWSBjb29yZGluYXRlIG9mIHRoZSBib3R0b20gc2lkZSBvZiB0aGUgbmVhciBwcm9qZWN0aW9uIHBsYW5lIGluIHZpZXcgc3BhY2UuXG4gICAgICogQHBhcmFtIHRvcCBUaGUgWSBjb29yZGluYXRlIG9mIHRoZSB0b3Agc2lkZSBvZiB0aGUgbmVhciBwcm9qZWN0aW9uIHBsYW5lIGluIHZpZXcgc3BhY2UuXG4gICAgICogQHBhcmFtIG5lYXIgWiBkaXN0YW5jZSB0byB0aGUgbmVhciBwbGFuZSBmcm9tIHRoZSBvcmlnaW4gaW4gdmlldyBzcGFjZS5cbiAgICAgKiBAcGFyYW0gZmFyIFogZGlzdGFuY2UgdG8gdGhlIGZhciBwbGFuZSBmcm9tIHRoZSBvcmlnaW4gaW4gdmlldyBzcGFjZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZydXN0dW0gPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBsZWZ0OiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCB0b3A6IG51bWJlciwgbmVhcjogbnVtYmVyLCBmYXI6IG51bWJlcikge1xuICAgICAgICBjb25zdCBybCA9IDEgLyAocmlnaHQgLSBsZWZ0KTtcbiAgICAgICAgY29uc3QgdGIgPSAxIC8gKHRvcCAtIGJvdHRvbSk7XG4gICAgICAgIGNvbnN0IG5mID0gMSAvIChuZWFyIC0gZmFyKTtcblxuICAgICAgICBvdXQubTAwID0gKG5lYXIgKiAyKSAqIHJsO1xuICAgICAgICBvdXQubTAxID0gMDtcbiAgICAgICAgb3V0Lm0wMiA9IDA7XG4gICAgICAgIG91dC5tMDMgPSAwO1xuICAgICAgICBvdXQubTA0ID0gMDtcbiAgICAgICAgb3V0Lm0wNSA9IChuZWFyICogMikgKiB0YjtcbiAgICAgICAgb3V0Lm0wNiA9IDA7XG4gICAgICAgIG91dC5tMDcgPSAwO1xuICAgICAgICBvdXQubTA4ID0gKHJpZ2h0ICsgbGVmdCkgKiBybDtcbiAgICAgICAgb3V0Lm0wOSA9ICh0b3AgKyBib3R0b20pICogdGI7XG4gICAgICAgIG91dC5tMTAgPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICAgICAgb3V0Lm0xMSA9IC0xO1xuICAgICAgICBvdXQubTEyID0gMDtcbiAgICAgICAgb3V0Lm0xMyA9IDA7XG4gICAgICAgIG91dC5tMTQgPSAoZmFyICogbmVhciAqIDIpICogbmY7XG4gICAgICAgIG91dC5tMTUgPSAwO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4XG4gICAgICogQHpoIOiuoeeul+mAj+inhuaKleW9seefqemYtVxuICAgICAqIEBwYXJhbSBmb3Z5IFZlcnRpY2FsIGZpZWxkLW9mLXZpZXcgaW4gZGVncmVlcy5cbiAgICAgKiBAcGFyYW0gYXNwZWN0IEFzcGVjdCByYXRpb1xuICAgICAqIEBwYXJhbSBuZWFyIE5lYXIgZGVwdGggY2xpcHBpbmcgcGxhbmUgdmFsdWUuXG4gICAgICogQHBhcmFtIGZhciBGYXIgZGVwdGggY2xpcHBpbmcgcGxhbmUgdmFsdWUuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBwZXJzcGVjdGl2ZSA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAoXG4gICAgICAgIG91dDogT3V0LCBmb3Y6IG51bWJlciwgYXNwZWN0OiBudW1iZXIsIG5lYXI6IG51bWJlciwgZmFyOiBudW1iZXIsXG4gICAgICAgIGlzRk9WWSA9IHRydWUsIG1pbkNsaXBaID0gLTEsIHByb2plY3Rpb25TaWduWSA9IDEsIG9yaWVudGF0aW9uID0gMCxcbiAgICApIHtcbiAgICAgICAgY29uc3QgZiA9IDEuMCAvIE1hdGgudGFuKGZvdiAvIDIpO1xuICAgICAgICBjb25zdCBuZiA9IDEgLyAobmVhciAtIGZhcik7XG5cbiAgICAgICAgY29uc3QgeCA9IGlzRk9WWSA/IGYgLyBhc3BlY3QgOiBmO1xuICAgICAgICBjb25zdCB5ID0gKGlzRk9WWSA/IGYgOiBmICogYXNwZWN0KSAqIHByb2plY3Rpb25TaWduWTtcbiAgICAgICAgY29uc3QgcHJlVHJhbnNmb3JtID0gcHJlVHJhbnNmb3Jtc1tvcmllbnRhdGlvbl07XG5cbiAgICAgICAgb3V0Lm0wMCA9IHggKiBwcmVUcmFuc2Zvcm1bMF07XG4gICAgICAgIG91dC5tMDEgPSB4ICogcHJlVHJhbnNmb3JtWzFdO1xuICAgICAgICBvdXQubTAyID0gMDtcbiAgICAgICAgb3V0Lm0wMyA9IDA7XG4gICAgICAgIG91dC5tMDQgPSB5ICogcHJlVHJhbnNmb3JtWzJdO1xuICAgICAgICBvdXQubTA1ID0geSAqIHByZVRyYW5zZm9ybVszXTtcbiAgICAgICAgb3V0Lm0wNiA9IDA7XG4gICAgICAgIG91dC5tMDcgPSAwO1xuICAgICAgICBvdXQubTA4ID0gMDtcbiAgICAgICAgb3V0Lm0wOSA9IDA7XG4gICAgICAgIG91dC5tMTAgPSAoZmFyIC0gbWluQ2xpcFogKiBuZWFyKSAqIG5mO1xuICAgICAgICBvdXQubTExID0gLTE7XG4gICAgICAgIG91dC5tMTIgPSAwO1xuICAgICAgICBvdXQubTEzID0gMDtcbiAgICAgICAgb3V0Lm0xNCA9IGZhciAqIG5lYXIgKiBuZiAqICgxIC0gbWluQ2xpcFopO1xuICAgICAgICBvdXQubTE1ID0gMDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyBvcnRob2dvbmFsIHByb2plY3Rpb24gbWF0cml4XG4gICAgICogQHpoIOiuoeeul+ato+S6pOaKleW9seefqemYtVxuICAgICAqIEBwYXJhbSBsZWZ0IExlZnQtc2lkZSB4LWNvb3JkaW5hdGUuXG4gICAgICogQHBhcmFtIHJpZ2h0IFJpZ2h0LXNpZGUgeC1jb29yZGluYXRlLlxuICAgICAqIEBwYXJhbSBib3R0b20gQm90dG9tIHktY29vcmRpbmF0ZS5cbiAgICAgKiBAcGFyYW0gdG9wIFRvcCB5LWNvb3JkaW5hdGUuXG4gICAgICogQHBhcmFtIG5lYXIgTmVhciBkZXB0aCBjbGlwcGluZyBwbGFuZSB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gZmFyIEZhciBkZXB0aCBjbGlwcGluZyBwbGFuZSB2YWx1ZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG9ydGhvIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChcbiAgICAgICAgb3V0OiBPdXQsIGxlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIHRvcDogbnVtYmVyLCBuZWFyOiBudW1iZXIsIGZhcjogbnVtYmVyLFxuICAgICAgICBtaW5DbGlwWiA9IC0xLCBwcm9qZWN0aW9uU2lnblkgPSAxLCBvcmllbnRhdGlvbiA9IDAsXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IGxyID0gMSAvIChsZWZ0IC0gcmlnaHQpO1xuICAgICAgICBjb25zdCBidCA9IDEgLyAoYm90dG9tIC0gdG9wKSAqIHByb2plY3Rpb25TaWduWTtcbiAgICAgICAgY29uc3QgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuXG4gICAgICAgIGNvbnN0IHggPSAtMiAqIGxyO1xuICAgICAgICBjb25zdCB5ID0gLTIgKiBidDtcbiAgICAgICAgY29uc3QgZHggPSAobGVmdCArIHJpZ2h0KSAqIGxyO1xuICAgICAgICBjb25zdCBkeSA9ICh0b3AgKyBib3R0b20pICogYnQ7XG4gICAgICAgIGNvbnN0IHByZVRyYW5zZm9ybSA9IHByZVRyYW5zZm9ybXNbb3JpZW50YXRpb25dO1xuXG4gICAgICAgIG91dC5tMDAgPSB4ICogcHJlVHJhbnNmb3JtWzBdO1xuICAgICAgICBvdXQubTAxID0geCAqIHByZVRyYW5zZm9ybVsxXTtcbiAgICAgICAgb3V0Lm0wMiA9IDA7XG4gICAgICAgIG91dC5tMDMgPSAwO1xuICAgICAgICBvdXQubTA0ID0geSAqIHByZVRyYW5zZm9ybVsyXTtcbiAgICAgICAgb3V0Lm0wNSA9IHkgKiBwcmVUcmFuc2Zvcm1bM107XG4gICAgICAgIG91dC5tMDYgPSAwO1xuICAgICAgICBvdXQubTA3ID0gMDtcbiAgICAgICAgb3V0Lm0wOCA9IDA7XG4gICAgICAgIG91dC5tMDkgPSAwO1xuICAgICAgICBvdXQubTEwID0gbmYgKiAoMSAtIG1pbkNsaXBaKTtcbiAgICAgICAgb3V0Lm0xMSA9IDA7XG4gICAgICAgIG91dC5tMTIgPSBkeCAqIHByZVRyYW5zZm9ybVswXSArIGR5ICogcHJlVHJhbnNmb3JtWzJdO1xuICAgICAgICBvdXQubTEzID0gZHggKiBwcmVUcmFuc2Zvcm1bMV0gKyBkeSAqIHByZVRyYW5zZm9ybVszXTtcbiAgICAgICAgb3V0Lm0xNCA9IChuZWFyIC0gbWluQ2xpcFogKiBmYXIpICogbmY7XG4gICAgICAgIG91dC5tMTUgPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlblxuICAgICAqIENhbGN1bGF0ZXMgdGhlIG1hdHJpeCB3aXRoIHRoZSB2aWV3IHBvaW50IGluZm9ybWF0aW9uLCBnaXZlbiBieSBleWUgcG9zaXRpb24sIHRhcmdldCBjZW50ZXIgYW5kIHRoZSB1cCB2ZWN0b3IuXG4gICAgICogTm90ZSB0aGF0IGNlbnRlciB0byBleWUgdmVjdG9yIGNhbid0IGJlIHplcm8gb3IgcGFyYWxsZWwgdG8gdGhlIHVwIHZlY3RvclxuICAgICAqIEB6aFxuICAgICAqIOagueaNruinhueCueiuoeeul+efqemYte+8jOazqOaEjyBgZXllIC0gY2VudGVyYCDkuI3og73kuLrpm7blkJHph4/miJbkuI4gYHVwYCDlkJHph4/lubPooYxcbiAgICAgKiBAcGFyYW0gZXllIFRoZSBzb3VyY2UgcG9pbnQuXG4gICAgICogQHBhcmFtIGNlbnRlciBUaGUgdGFyZ2V0IHBvaW50LlxuICAgICAqIEBwYXJhbSB1cCBUaGUgdmVjdG9yIGRlc2NyaWJpbmcgdGhlIHVwIGRpcmVjdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGxvb2tBdCA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGV5ZTogVmVjTGlrZSwgY2VudGVyOiBWZWNMaWtlLCB1cDogVmVjTGlrZSkge1xuICAgICAgICBjb25zdCBleWV4ID0gZXllLng7XG4gICAgICAgIGNvbnN0IGV5ZXkgPSBleWUueTtcbiAgICAgICAgY29uc3QgZXlleiA9IGV5ZS56O1xuICAgICAgICBjb25zdCB1cHggPSB1cC54O1xuICAgICAgICBjb25zdCB1cHkgPSB1cC55O1xuICAgICAgICBjb25zdCB1cHogPSB1cC56O1xuICAgICAgICBjb25zdCBjZW50ZXJ4ID0gY2VudGVyLng7XG4gICAgICAgIGNvbnN0IGNlbnRlcnkgPSBjZW50ZXIueTtcbiAgICAgICAgY29uc3QgY2VudGVyeiA9IGNlbnRlci56O1xuXG4gICAgICAgIGxldCB6MCA9IGV5ZXggLSBjZW50ZXJ4O1xuICAgICAgICBsZXQgejEgPSBleWV5IC0gY2VudGVyeTtcbiAgICAgICAgbGV0IHoyID0gZXlleiAtIGNlbnRlcno7XG5cbiAgICAgICAgbGV0IGxlbiA9IDEgLyBNYXRoLnNxcnQoejAgKiB6MCArIHoxICogejEgKyB6MiAqIHoyKTtcbiAgICAgICAgejAgKj0gbGVuO1xuICAgICAgICB6MSAqPSBsZW47XG4gICAgICAgIHoyICo9IGxlbjtcblxuICAgICAgICBsZXQgeDAgPSB1cHkgKiB6MiAtIHVweiAqIHoxO1xuICAgICAgICBsZXQgeDEgPSB1cHogKiB6MCAtIHVweCAqIHoyO1xuICAgICAgICBsZXQgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xuICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KHgwICogeDAgKyB4MSAqIHgxICsgeDIgKiB4Mik7XG4gICAgICAgIHgwICo9IGxlbjtcbiAgICAgICAgeDEgKj0gbGVuO1xuICAgICAgICB4MiAqPSBsZW47XG5cbiAgICAgICAgY29uc3QgeTAgPSB6MSAqIHgyIC0gejIgKiB4MTtcbiAgICAgICAgY29uc3QgeTEgPSB6MiAqIHgwIC0gejAgKiB4MjtcbiAgICAgICAgY29uc3QgeTIgPSB6MCAqIHgxIC0gejEgKiB4MDtcblxuICAgICAgICBvdXQubTAwID0geDA7XG4gICAgICAgIG91dC5tMDEgPSB5MDtcbiAgICAgICAgb3V0Lm0wMiA9IHowO1xuICAgICAgICBvdXQubTAzID0gMDtcbiAgICAgICAgb3V0Lm0wNCA9IHgxO1xuICAgICAgICBvdXQubTA1ID0geTE7XG4gICAgICAgIG91dC5tMDYgPSB6MTtcbiAgICAgICAgb3V0Lm0wNyA9IDA7XG4gICAgICAgIG91dC5tMDggPSB4MjtcbiAgICAgICAgb3V0Lm0wOSA9IHkyO1xuICAgICAgICBvdXQubTEwID0gejI7XG4gICAgICAgIG91dC5tMTEgPSAwO1xuICAgICAgICBvdXQubTEyID0gLSh4MCAqIGV5ZXggKyB4MSAqIGV5ZXkgKyB4MiAqIGV5ZXopO1xuICAgICAgICBvdXQubTEzID0gLSh5MCAqIGV5ZXggKyB5MSAqIGV5ZXkgKyB5MiAqIGV5ZXopO1xuICAgICAgICBvdXQubTE0ID0gLSh6MCAqIGV5ZXggKyB6MSAqIGV5ZXkgKyB6MiAqIGV5ZXopO1xuICAgICAgICBvdXQubTE1ID0gMTtcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBpbnZlcnNlIHRyYW5zcG9zZSBvZiBhIG1hdHJpeCBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XG4gICAgICogQHpoIOiuoeeul+mAhui9rOe9ruefqemYtVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaW52ZXJzZVRyYW5zcG9zZSA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBjb25zdCBhMDAgPSBhLm0wMDsgY29uc3QgYTAxID0gYS5tMDE7IGNvbnN0IGEwMiA9IGEubTAyOyBjb25zdCBhMDMgPSBhLm0wMztcbiAgICAgICAgY29uc3QgYTEwID0gYS5tMDQ7IGNvbnN0IGExMSA9IGEubTA1OyBjb25zdCBhMTIgPSBhLm0wNjsgY29uc3QgYTEzID0gYS5tMDc7XG4gICAgICAgIGNvbnN0IGEyMCA9IGEubTA4OyBjb25zdCBhMjEgPSBhLm0wOTsgY29uc3QgYTIyID0gYS5tMTA7IGNvbnN0IGEyMyA9IGEubTExO1xuICAgICAgICBjb25zdCBhMzAgPSBhLm0xMjsgY29uc3QgYTMxID0gYS5tMTM7IGNvbnN0IGEzMiA9IGEubTE0OyBjb25zdCBhMzMgPSBhLm0xNTtcblxuICAgICAgICBjb25zdCBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gICAgICAgIGNvbnN0IGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMDtcbiAgICAgICAgY29uc3QgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwO1xuICAgICAgICBjb25zdCBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XG4gICAgICAgIGNvbnN0IGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMTtcbiAgICAgICAgY29uc3QgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyO1xuICAgICAgICBjb25zdCBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XG4gICAgICAgIGNvbnN0IGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMDtcbiAgICAgICAgY29uc3QgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwO1xuICAgICAgICBjb25zdCBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzE7XG4gICAgICAgIGNvbnN0IGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMTtcbiAgICAgICAgY29uc3QgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgbGV0IGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICAgICAgICBpZiAoIWRldCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgICAgIG91dC5tMDAgPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgICAgICAgb3V0Lm0wMSA9IChhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcpICogZGV0O1xuICAgICAgICBvdXQubTAyID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG4gICAgICAgIG91dC5tMDMgPSAwO1xuXG4gICAgICAgIG91dC5tMDQgPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgICAgICAgb3V0Lm0wNSA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xuICAgICAgICBvdXQubTA2ID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XG4gICAgICAgIG91dC5tMDcgPSAwO1xuXG4gICAgICAgIG91dC5tMDggPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcbiAgICAgICAgb3V0Lm0wOSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xuICAgICAgICBvdXQubTEwID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XG4gICAgICAgIG91dC5tMTEgPSAwO1xuXG4gICAgICAgIG91dC5tMTIgPSAwO1xuICAgICAgICBvdXQubTEzID0gMDtcbiAgICAgICAgb3V0Lm0xNCA9IDA7XG4gICAgICAgIG91dC5tMTUgPSAxO1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFRyYW5zZm9ybSBhIG1hdHJpeCBvYmplY3QgdG8gYSBmbGF0IGFycmF5XG4gICAgICogQHpoIOefqemYtei9rOaVsOe7hFxuICAgICAqIEBwYXJhbSBvZnMgQXJyYXkgU3RhcnQgT2Zmc2V0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0b0FycmF5IDxPdXQ+IChvdXQ6IE91dCwgbTogSU1hdDRMaWtlLCBvZnMgPSAwKSB7XG4gICAgICAgIG91dFtvZnMgKyAwXSA9IG0ubTAwO1xuICAgICAgICBvdXRbb2ZzICsgMV0gPSBtLm0wMTtcbiAgICAgICAgb3V0W29mcyArIDJdID0gbS5tMDI7XG4gICAgICAgIG91dFtvZnMgKyAzXSA9IG0ubTAzO1xuICAgICAgICBvdXRbb2ZzICsgNF0gPSBtLm0wNDtcbiAgICAgICAgb3V0W29mcyArIDVdID0gbS5tMDU7XG4gICAgICAgIG91dFtvZnMgKyA2XSA9IG0ubTA2O1xuICAgICAgICBvdXRbb2ZzICsgN10gPSBtLm0wNztcbiAgICAgICAgb3V0W29mcyArIDhdID0gbS5tMDg7XG4gICAgICAgIG91dFtvZnMgKyA5XSA9IG0ubTA5O1xuICAgICAgICBvdXRbb2ZzICsgMTBdID0gbS5tMTA7XG4gICAgICAgIG91dFtvZnMgKyAxMV0gPSBtLm0xMTtcbiAgICAgICAgb3V0W29mcyArIDEyXSA9IG0ubTEyO1xuICAgICAgICBvdXRbb2ZzICsgMTNdID0gbS5tMTM7XG4gICAgICAgIG91dFtvZnMgKyAxNF0gPSBtLm0xNDtcbiAgICAgICAgb3V0W29mcyArIDE1XSA9IG0ubTE1O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBHZW5lcmF0ZXMgb3Igc2V0cyBhIG1hdHJpeCB3aXRoIGEgZmxhdCBhcnJheVxuICAgICAqIEB6aCDmlbDnu4Tovaznn6npmLVcbiAgICAgKiBAcGFyYW0gb2ZzIEFycmF5IFN0YXJ0IE9mZnNldFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZnJvbUFycmF5IDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYXJyLCBvZnMgPSAwKSB7XG4gICAgICAgIG91dC5tMDAgPSBhcnJbb2ZzICsgMF07XG4gICAgICAgIG91dC5tMDEgPSBhcnJbb2ZzICsgMV07XG4gICAgICAgIG91dC5tMDIgPSBhcnJbb2ZzICsgMl07XG4gICAgICAgIG91dC5tMDMgPSBhcnJbb2ZzICsgM107XG4gICAgICAgIG91dC5tMDQgPSBhcnJbb2ZzICsgNF07XG4gICAgICAgIG91dC5tMDUgPSBhcnJbb2ZzICsgNV07XG4gICAgICAgIG91dC5tMDYgPSBhcnJbb2ZzICsgNl07XG4gICAgICAgIG91dC5tMDcgPSBhcnJbb2ZzICsgN107XG4gICAgICAgIG91dC5tMDggPSBhcnJbb2ZzICsgOF07XG4gICAgICAgIG91dC5tMDkgPSBhcnJbb2ZzICsgOV07XG4gICAgICAgIG91dC5tMTAgPSBhcnJbb2ZzICsgMTBdO1xuICAgICAgICBvdXQubTExID0gYXJyW29mcyArIDExXTtcbiAgICAgICAgb3V0Lm0xMiA9IGFycltvZnMgKyAxMl07XG4gICAgICAgIG91dC5tMTMgPSBhcnJbb2ZzICsgMTNdO1xuICAgICAgICBvdXQubTE0ID0gYXJyW29mcyArIDE0XTtcbiAgICAgICAgb3V0Lm0xNSA9IGFycltvZnMgKyAxNV07XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEFkZHMgdHdvIG1hdHJpY2VzIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXhcbiAgICAgKiBAemgg6YCQ5YWD57Sg55+p6Zi15Yqg5rOVXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGQgPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBvdXQubTAwID0gYS5tMDAgKyBiLm0wMDtcbiAgICAgICAgb3V0Lm0wMSA9IGEubTAxICsgYi5tMDE7XG4gICAgICAgIG91dC5tMDIgPSBhLm0wMiArIGIubTAyO1xuICAgICAgICBvdXQubTAzID0gYS5tMDMgKyBiLm0wMztcbiAgICAgICAgb3V0Lm0wNCA9IGEubTA0ICsgYi5tMDQ7XG4gICAgICAgIG91dC5tMDUgPSBhLm0wNSArIGIubTA1O1xuICAgICAgICBvdXQubTA2ID0gYS5tMDYgKyBiLm0wNjtcbiAgICAgICAgb3V0Lm0wNyA9IGEubTA3ICsgYi5tMDc7XG4gICAgICAgIG91dC5tMDggPSBhLm0wOCArIGIubTA4O1xuICAgICAgICBvdXQubTA5ID0gYS5tMDkgKyBiLm0wOTtcbiAgICAgICAgb3V0Lm0xMCA9IGEubTEwICsgYi5tMTA7XG4gICAgICAgIG91dC5tMTEgPSBhLm0xMSArIGIubTExO1xuICAgICAgICBvdXQubTEyID0gYS5tMTIgKyBiLm0xMjtcbiAgICAgICAgb3V0Lm0xMyA9IGEubTEzICsgYi5tMTM7XG4gICAgICAgIG91dC5tMTQgPSBhLm0xNCArIGIubTE0O1xuICAgICAgICBvdXQubTE1ID0gYS5tMTUgKyBiLm0xNTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU3VidHJhY3RzIG1hdHJpeCBiIGZyb20gbWF0cml4IGEgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IG1hdHJpeFxuICAgICAqIEB6aCDpgJDlhYPntKDnn6npmLXlh4/ms5VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHN1YnRyYWN0IDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgb3V0Lm0wMCA9IGEubTAwIC0gYi5tMDA7XG4gICAgICAgIG91dC5tMDEgPSBhLm0wMSAtIGIubTAxO1xuICAgICAgICBvdXQubTAyID0gYS5tMDIgLSBiLm0wMjtcbiAgICAgICAgb3V0Lm0wMyA9IGEubTAzIC0gYi5tMDM7XG4gICAgICAgIG91dC5tMDQgPSBhLm0wNCAtIGIubTA0O1xuICAgICAgICBvdXQubTA1ID0gYS5tMDUgLSBiLm0wNTtcbiAgICAgICAgb3V0Lm0wNiA9IGEubTA2IC0gYi5tMDY7XG4gICAgICAgIG91dC5tMDcgPSBhLm0wNyAtIGIubTA3O1xuICAgICAgICBvdXQubTA4ID0gYS5tMDggLSBiLm0wODtcbiAgICAgICAgb3V0Lm0wOSA9IGEubTA5IC0gYi5tMDk7XG4gICAgICAgIG91dC5tMTAgPSBhLm0xMCAtIGIubTEwO1xuICAgICAgICBvdXQubTExID0gYS5tMTEgLSBiLm0xMTtcbiAgICAgICAgb3V0Lm0xMiA9IGEubTEyIC0gYi5tMTI7XG4gICAgICAgIG91dC5tMTMgPSBhLm0xMyAtIGIubTEzO1xuICAgICAgICBvdXQubTE0ID0gYS5tMTQgLSBiLm0xNDtcbiAgICAgICAgb3V0Lm0xNSA9IGEubTE1IC0gYi5tMTU7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIE11bHRpcGx5IGVhY2ggZWxlbWVudCBvZiBhIG1hdHJpeCBieSBhIHNjYWxhciBudW1iZXIgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IG1hdHJpeFxuICAgICAqIEB6aCDnn6npmLXmoIfph4/kuZjms5VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG11bHRpcGx5U2NhbGFyIDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBudW1iZXIpIHtcbiAgICAgICAgb3V0Lm0wMCA9IGEubTAwICogYjtcbiAgICAgICAgb3V0Lm0wMSA9IGEubTAxICogYjtcbiAgICAgICAgb3V0Lm0wMiA9IGEubTAyICogYjtcbiAgICAgICAgb3V0Lm0wMyA9IGEubTAzICogYjtcbiAgICAgICAgb3V0Lm0wNCA9IGEubTA0ICogYjtcbiAgICAgICAgb3V0Lm0wNSA9IGEubTA1ICogYjtcbiAgICAgICAgb3V0Lm0wNiA9IGEubTA2ICogYjtcbiAgICAgICAgb3V0Lm0wNyA9IGEubTA3ICogYjtcbiAgICAgICAgb3V0Lm0wOCA9IGEubTA4ICogYjtcbiAgICAgICAgb3V0Lm0wOSA9IGEubTA5ICogYjtcbiAgICAgICAgb3V0Lm0xMCA9IGEubTEwICogYjtcbiAgICAgICAgb3V0Lm0xMSA9IGEubTExICogYjtcbiAgICAgICAgb3V0Lm0xMiA9IGEubTEyICogYjtcbiAgICAgICAgb3V0Lm0xMyA9IGEubTEzICogYjtcbiAgICAgICAgb3V0Lm0xNCA9IGEubTE0ICogYjtcbiAgICAgICAgb3V0Lm0xNSA9IGEubTE1ICogYjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQWRkcyB0d28gbWF0cmljZXMgYWZ0ZXIgbXVsdGlwbHlpbmcgZWFjaCBlbGVtZW50IG9mIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciBudW1iZXIuIEFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXguXG4gICAgICogQHpoIOmAkOWFg+e0oOefqemYteagh+mHj+S5mOWKoDogQSArIEIgKiBzY2FsZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbXVsdGlwbHlTY2FsYXJBbmRBZGQgPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgc2NhbGU6IG51bWJlcikge1xuICAgICAgICBvdXQubTAwID0gYS5tMDAgKyAoYi5tMDAgKiBzY2FsZSk7XG4gICAgICAgIG91dC5tMDEgPSBhLm0wMSArIChiLm0wMSAqIHNjYWxlKTtcbiAgICAgICAgb3V0Lm0wMiA9IGEubTAyICsgKGIubTAyICogc2NhbGUpO1xuICAgICAgICBvdXQubTAzID0gYS5tMDMgKyAoYi5tMDMgKiBzY2FsZSk7XG4gICAgICAgIG91dC5tMDQgPSBhLm0wNCArIChiLm0wNCAqIHNjYWxlKTtcbiAgICAgICAgb3V0Lm0wNSA9IGEubTA1ICsgKGIubTA1ICogc2NhbGUpO1xuICAgICAgICBvdXQubTA2ID0gYS5tMDYgKyAoYi5tMDYgKiBzY2FsZSk7XG4gICAgICAgIG91dC5tMDcgPSBhLm0wNyArIChiLm0wNyAqIHNjYWxlKTtcbiAgICAgICAgb3V0Lm0wOCA9IGEubTA4ICsgKGIubTA4ICogc2NhbGUpO1xuICAgICAgICBvdXQubTA5ID0gYS5tMDkgKyAoYi5tMDkgKiBzY2FsZSk7XG4gICAgICAgIG91dC5tMTAgPSBhLm0xMCArIChiLm0xMCAqIHNjYWxlKTtcbiAgICAgICAgb3V0Lm0xMSA9IGEubTExICsgKGIubTExICogc2NhbGUpO1xuICAgICAgICBvdXQubTEyID0gYS5tMTIgKyAoYi5tMTIgKiBzY2FsZSk7XG4gICAgICAgIG91dC5tMTMgPSBhLm0xMyArIChiLm0xMyAqIHNjYWxlKTtcbiAgICAgICAgb3V0Lm0xNCA9IGEubTE0ICsgKGIubTE0ICogc2NhbGUpO1xuICAgICAgICBvdXQubTE1ID0gYS5tMTUgKyAoYi5tMTUgKiBzY2FsZSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFJldHVybnMgd2hldGhlciB0aGUgc3BlY2lmaWVkIG1hdHJpY2VzIGFyZSBlcXVhbC5cbiAgICAgKiBAemgg55+p6Zi1562J5Lu35Yik5patXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzdHJpY3RFcXVhbHMgPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIHJldHVybiBhLm0wMCA9PT0gYi5tMDAgJiYgYS5tMDEgPT09IGIubTAxICYmIGEubTAyID09PSBiLm0wMiAmJiBhLm0wMyA9PT0gYi5tMDNcbiAgICAgICAgICAgICYmIGEubTA0ID09PSBiLm0wNCAmJiBhLm0wNSA9PT0gYi5tMDUgJiYgYS5tMDYgPT09IGIubTA2ICYmIGEubTA3ID09PSBiLm0wN1xuICAgICAgICAgICAgJiYgYS5tMDggPT09IGIubTA4ICYmIGEubTA5ID09PSBiLm0wOSAmJiBhLm0xMCA9PT0gYi5tMTAgJiYgYS5tMTEgPT09IGIubTExXG4gICAgICAgICAgICAmJiBhLm0xMiA9PT0gYi5tMTIgJiYgYS5tMTMgPT09IGIubTEzICYmIGEubTE0ID09PSBiLm0xNCAmJiBhLm0xNSA9PT0gYi5tMTU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFJldHVybnMgd2hldGhlciB0aGUgc3BlY2lmaWVkIG1hdHJpY2VzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsLlxuICAgICAqIEB6aCDmjpLpmaTmta7ngrnmlbDor6/lt67nmoTnn6npmLXov5HkvLznrYnku7fliKTmlq1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGVxdWFscyA8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAoYTogT3V0LCBiOiBPdXQsIGVwc2lsb24gPSBFUFNJTE9OKSB7XG4gICAgICAgIC8vIFRBT0NQIHZvbC4yLCAzcmQgZWQuLCBzLjQuMi40LCBwLjIxMy0yMjVcbiAgICAgICAgLy8gZGVmaW5lcyBhICdjbG9zZSBlbm91Z2gnIHJlbGF0aW9uc2hpcCBiZXR3ZWVuIHUgYW5kIHYgdGhhdCBzY2FsZXMgZm9yIG1hZ25pdHVkZVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgTWF0aC5hYnMoYS5tMDAgLSBiLm0wMCkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMDApLCBNYXRoLmFicyhiLm0wMCkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0wMSAtIGIubTAxKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0wMSksIE1hdGguYWJzKGIubTAxKSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEubTAyIC0gYi5tMDIpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTAyKSwgTWF0aC5hYnMoYi5tMDIpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5tMDMgLSBiLm0wMykgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMDMpLCBNYXRoLmFicyhiLm0wMykpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0wNCAtIGIubTA0KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0wNCksIE1hdGguYWJzKGIubTA0KSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEubTA1IC0gYi5tMDUpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTA1KSwgTWF0aC5hYnMoYi5tMDUpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5tMDYgLSBiLm0wNikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMDYpLCBNYXRoLmFicyhiLm0wNikpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0wNyAtIGIubTA3KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0wNyksIE1hdGguYWJzKGIubTA3KSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEubTA4IC0gYi5tMDgpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTA4KSwgTWF0aC5hYnMoYi5tMDgpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5tMDkgLSBiLm0wOSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMDkpLCBNYXRoLmFicyhiLm0wOSkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0xMCAtIGIubTEwKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0xMCksIE1hdGguYWJzKGIubTEwKSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEubTExIC0gYi5tMTEpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTExKSwgTWF0aC5hYnMoYi5tMTEpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5tMTIgLSBiLm0xMikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMTIpLCBNYXRoLmFicyhiLm0xMikpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0xMyAtIGIubTEzKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0xMyksIE1hdGguYWJzKGIubTEzKSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEubTE0IC0gYi5tMTQpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTE0KSwgTWF0aC5hYnMoYi5tMTQpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5tMTUgLSBiLm0xNSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMTUpLCBNYXRoLmFicyhiLm0xNSkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFZhbHVlIGF0IGNvbHVtbiAwIHJvdyAwIG9mIHRoZSBtYXRyaXguXG4gICAgICogQHpoIOefqemYteesrCAwIOWIl+esrCAwIOihjOeahOWFg+e0oOOAglxuICAgICAqL1xuICAgIHB1YmxpYyBtMDA6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMCByb3cgMSBvZiB0aGUgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXnrKwgMCDliJfnrKwgMSDooYznmoTlhYPntKDjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgbTAxOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVmFsdWUgYXQgY29sdW1uIDAgcm93IDIgb2YgdGhlIG1hdHJpeC5cbiAgICAgKiBAemgg55+p6Zi156ysIDAg5YiX56ysIDIg6KGM55qE5YWD57Sg44CCXG4gICAgICovXG4gICAgcHVibGljIG0wMjogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQGVuIFZhbHVlIGF0IGNvbHVtbiAwIHJvdyAzIG9mIHRoZSBtYXRyaXguXG4gICAgICogQHpoIOefqemYteesrCAwIOWIl+esrCAzIOihjOeahOWFg+e0oOOAglxuICAgICAqL1xuICAgIHB1YmxpYyBtMDM6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMSByb3cgMCBvZiB0aGUgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXnrKwgMSDliJfnrKwgMCDooYznmoTlhYPntKDjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgbTA0OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVmFsdWUgYXQgY29sdW1uIDEgcm93IDEgb2YgdGhlIG1hdHJpeC5cbiAgICAgKiBAemgg55+p6Zi156ysIDEg5YiX56ysIDEg6KGM55qE5YWD57Sg44CCXG4gICAgICovXG4gICAgcHVibGljIG0wNTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQGVuIFZhbHVlIGF0IGNvbHVtbiAxIHJvdyAyIG9mIHRoZSBtYXRyaXguXG4gICAgICogQHpoIOefqemYteesrCAxIOWIl+esrCAyIOihjOeahOWFg+e0oOOAglxuICAgICAqL1xuICAgIHB1YmxpYyBtMDY6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMSByb3cgMyBvZiB0aGUgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXnrKwgMSDliJfnrKwgMyDooYznmoTlhYPntKDjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgbTA3OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVmFsdWUgYXQgY29sdW1uIDIgcm93IDAgb2YgdGhlIG1hdHJpeC5cbiAgICAgKiBAemgg55+p6Zi156ysIDIg5YiX56ysIDAg6KGM55qE5YWD57Sg44CCXG4gICAgICovXG4gICAgcHVibGljIG0wODogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQGVuIFZhbHVlIGF0IGNvbHVtbiAyIHJvdyAxIG9mIHRoZSBtYXRyaXguXG4gICAgICogQHpoIOefqemYteesrCAyIOWIl+esrCAxIOihjOeahOWFg+e0oOOAglxuICAgICAqL1xuICAgIHB1YmxpYyBtMDk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMiByb3cgMiBvZiB0aGUgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXnrKwgMiDliJfnrKwgMiDooYznmoTlhYPntKDjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgbTEwOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVmFsdWUgYXQgY29sdW1uIDIgcm93IDMgb2YgdGhlIG1hdHJpeC5cbiAgICAgKiBAemgg55+p6Zi156ysIDIg5YiX56ysIDMg6KGM55qE5YWD57Sg44CCXG4gICAgICovXG4gICAgcHVibGljIG0xMTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQGVuIFZhbHVlIGF0IGNvbHVtbiAzIHJvdyAwIG9mIHRoZSBtYXRyaXguXG4gICAgICogQHpoIOefqemYteesrCAzIOWIl+esrCAwIOihjOeahOWFg+e0oOOAglxuICAgICAqL1xuICAgIHB1YmxpYyBtMTI6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMyByb3cgMSBvZiB0aGUgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXnrKwgMyDliJfnrKwgMSDooYznmoTlhYPntKDjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgbTEzOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVmFsdWUgYXQgY29sdW1uIDMgcm93IDIgb2YgdGhlIG1hdHJpeC5cbiAgICAgKiBAemgg55+p6Zi156ysIDMg5YiX56ysIDIg6KGM55qE5YWD57Sg44CCXG4gICAgICovXG4gICAgcHVibGljIG0xNDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQGVuIFZhbHVlIGF0IGNvbHVtbiAzIHJvdyAzIG9mIHRoZSBtYXRyaXguXG4gICAgICogQHpoIOefqemYteesrCAzIOWIl+esrCAzIOihjOeahOWFg+e0oOOAglxuICAgICAqL1xuICAgIHB1YmxpYyBtMTU6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yIChvdGhlcjogTWF0NCk7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIG0wMD86IG51bWJlciwgbTAxPzogbnVtYmVyLCBtMDI/OiBudW1iZXIsIG0wMz86IG51bWJlcixcbiAgICAgICAgbTA0PzogbnVtYmVyLCBtMDU/OiBudW1iZXIsIG0wNj86IG51bWJlciwgbTA3PzogbnVtYmVyLFxuICAgICAgICBtMDg/OiBudW1iZXIsIG0wOT86IG51bWJlciwgbTEwPzogbnVtYmVyLCBtMTE/OiBudW1iZXIsXG4gICAgICAgIG0xMj86IG51bWJlciwgbTEzPzogbnVtYmVyLCBtMTQ/OiBudW1iZXIsIG0xNT86IG51bWJlcik7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIG0wMDogTWF0NCB8IG51bWJlciA9IDEsIG0wMSA9IDAsIG0wMiA9IDAsIG0wMyA9IDAsXG4gICAgICAgIG0wNCA9IDAsIG0wNSA9IDEsIG0wNiA9IDAsIG0wNyA9IDAsXG4gICAgICAgIG0wOCA9IDAsIG0wOSA9IDAsIG0xMCA9IDEsIG0xMSA9IDAsXG4gICAgICAgIG0xMiA9IDAsIG0xMyA9IDAsIG0xNCA9IDAsIG0xNSA9IDEsXG4gICAgKSB7XG4gICAgICAgIC8vc3VwZXIoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBtMDAgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLm0wMCA9IG0wMC5tMDA7IHRoaXMubTAxID0gbTAwLm0wMTsgdGhpcy5tMDIgPSBtMDAubTAyOyB0aGlzLm0wMyA9IG0wMC5tMDM7XG4gICAgICAgICAgICB0aGlzLm0wNCA9IG0wMC5tMDQ7IHRoaXMubTA1ID0gbTAwLm0wNTsgdGhpcy5tMDYgPSBtMDAubTA2OyB0aGlzLm0wNyA9IG0wMC5tMDc7XG4gICAgICAgICAgICB0aGlzLm0wOCA9IG0wMC5tMDg7IHRoaXMubTA5ID0gbTAwLm0wOTsgdGhpcy5tMTAgPSBtMDAubTEwOyB0aGlzLm0xMSA9IG0wMC5tMTE7XG4gICAgICAgICAgICB0aGlzLm0xMiA9IG0wMC5tMTI7IHRoaXMubTEzID0gbTAwLm0xMzsgdGhpcy5tMTQgPSBtMDAubTE0OyB0aGlzLm0xNSA9IG0wMC5tMTU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm0wMCA9IG0wMDsgdGhpcy5tMDEgPSBtMDE7IHRoaXMubTAyID0gbTAyOyB0aGlzLm0wMyA9IG0wMztcbiAgICAgICAgICAgIHRoaXMubTA0ID0gbTA0OyB0aGlzLm0wNSA9IG0wNTsgdGhpcy5tMDYgPSBtMDY7IHRoaXMubTA3ID0gbTA3O1xuICAgICAgICAgICAgdGhpcy5tMDggPSBtMDg7IHRoaXMubTA5ID0gbTA5OyB0aGlzLm0xMCA9IG0xMDsgdGhpcy5tMTEgPSBtMTE7XG4gICAgICAgICAgICB0aGlzLm0xMiA9IG0xMjsgdGhpcy5tMTMgPSBtMTM7IHRoaXMubTE0ID0gbTE0OyB0aGlzLm0xNSA9IG0xNTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDbG9uZSBhIG5ldyBtYXRyaXggZnJvbSB0aGUgY3VycmVudCBtYXRyaXguXG4gICAgICogQHpoIOWFi+mahuW9k+WJjeefqemYteOAglxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9uZSAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgTWF0NChcbiAgICAgICAgICAgIHRoaXMubTAwLCB0aGlzLm0wMSwgdGhpcy5tMDIsIHRoaXMubTAzLFxuICAgICAgICAgICAgdGhpcy5tMDQsIHRoaXMubTA1LCB0aGlzLm0wNiwgdGhpcy5tMDcsXG4gICAgICAgICAgICB0aGlzLm0wOCwgdGhpcy5tMDksIHRoaXMubTEwLCB0aGlzLm0xMSxcbiAgICAgICAgICAgIHRoaXMubTEyLCB0aGlzLm0xMywgdGhpcy5tMTQsIHRoaXMubTE1LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXRzIHRoZSBtYXRyaXggd2l0aCBhbm90aGVyIG9uZSdzIHZhbHVlLlxuICAgICAqIEB6aCDorr7nva7lvZPliY3nn6npmLXkvb/lhbbkuI7mjIflrprnn6npmLXnm7jnrYnjgIJcbiAgICAgKiBAcGFyYW0gb3RoZXIgU3BlY2lmaWVkIG1hdHJpeC5cbiAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IChvdGhlcjogTWF0NCk7XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0IHRoZSBtYXRyaXggd2l0aCB2YWx1ZXMgb2YgYWxsIGVsZW1lbnRzXG4gICAgICogQHpoIOiuvue9ruW9k+WJjeefqemYteaMh+WumuWFg+e0oOWAvOOAglxuICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgKFxuICAgICAgICBtMDA/OiBudW1iZXIsIG0wMT86IG51bWJlciwgbTAyPzogbnVtYmVyLCBtMDM/OiBudW1iZXIsXG4gICAgICAgIG0wND86IG51bWJlciwgbTA1PzogbnVtYmVyLCBtMDY/OiBudW1iZXIsIG0wNz86IG51bWJlcixcbiAgICAgICAgbTA4PzogbnVtYmVyLCBtMDk/OiBudW1iZXIsIG0xMD86IG51bWJlciwgbTExPzogbnVtYmVyLFxuICAgICAgICBtMTI/OiBudW1iZXIsIG0xMz86IG51bWJlciwgbTE0PzogbnVtYmVyLCBtMTU/OiBudW1iZXIpO1xuXG4gICAgcHVibGljIHNldCAobTAwOiBNYXQ0IHwgbnVtYmVyID0gMSwgbTAxID0gMCwgbTAyID0gMCwgbTAzID0gMCxcbiAgICAgICAgbTA0ID0gMCwgbTA1ID0gMSwgbTA2ID0gMCwgbTA3ID0gMCxcbiAgICAgICAgbTA4ID0gMCwgbTA5ID0gMCwgbTEwID0gMSwgbTExID0gMCxcbiAgICAgICAgbTEyID0gMCwgbTEzID0gMCwgbTE0ID0gMCwgbTE1ID0gMSkge1xuICAgICAgICBpZiAodHlwZW9mIG0wMCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMubTAxID0gbTAwLm0wMTsgdGhpcy5tMDIgPSBtMDAubTAyOyB0aGlzLm0wMyA9IG0wMC5tMDM7IHRoaXMubTA0ID0gbTAwLm0wNDtcbiAgICAgICAgICAgIHRoaXMubTA1ID0gbTAwLm0wNTsgdGhpcy5tMDYgPSBtMDAubTA2OyB0aGlzLm0wNyA9IG0wMC5tMDc7IHRoaXMubTA4ID0gbTAwLm0wODtcbiAgICAgICAgICAgIHRoaXMubTA5ID0gbTAwLm0wOTsgdGhpcy5tMTAgPSBtMDAubTEwOyB0aGlzLm0xMSA9IG0wMC5tMTE7IHRoaXMubTEyID0gbTAwLm0xMjtcbiAgICAgICAgICAgIHRoaXMubTEzID0gbTAwLm0xMzsgdGhpcy5tMTQgPSBtMDAubTE0OyB0aGlzLm0xNSA9IG0wMC5tMTU7IHRoaXMubTAwID0gbTAwLm0wMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubTAxID0gbTAxOyB0aGlzLm0wMiA9IG0wMjsgdGhpcy5tMDMgPSBtMDM7IHRoaXMubTA0ID0gbTA0O1xuICAgICAgICAgICAgdGhpcy5tMDUgPSBtMDU7IHRoaXMubTA2ID0gbTA2OyB0aGlzLm0wNyA9IG0wNzsgdGhpcy5tMDggPSBtMDg7XG4gICAgICAgICAgICB0aGlzLm0wOSA9IG0wOTsgdGhpcy5tMTAgPSBtMTA7IHRoaXMubTExID0gbTExOyB0aGlzLm0xMiA9IG0xMjtcbiAgICAgICAgICAgIHRoaXMubTEzID0gbTEzOyB0aGlzLm0xNCA9IG0xNDsgdGhpcy5tMTUgPSBtMTU7IHRoaXMubTAwID0gbTAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBSZXR1cm5zIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBtYXRyaWNlcyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbC5cbiAgICAgKiBAemgg5Yik5pat5b2T5YmN55+p6Zi15piv5ZCm5Zyo6K+v5beu6IyD5Zu05YaF5LiO5oyH5a6a55+p6Zi155u4562J44CCXG4gICAgICogQHBhcmFtIG90aGVyIENvbXBhcmF0aXZlIG1hdHJpeFxuICAgICAqIEBwYXJhbSBlcHNpbG9uIFRoZSBlcnJvciBhbGxvd2VkLiBJdGBzIHNob3VsZCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuXG4gICAgICogQHJldHVybiBSZXR1cm5zIGB0cnVlJyB3aGVuIHRoZSBlbGVtZW50cyBvZiBib3RoIG1hdHJpY2VzIGFyZSBlcXVhbDsgb3RoZXJ3aXNlIHJldHVybnMgYGZhbHNlJy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZXF1YWxzIChvdGhlcjogTWF0NCwgZXBzaWxvbiA9IEVQU0lMT04pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMubTAwIC0gb3RoZXIubTAwKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLm0wMCksIE1hdGguYWJzKG90aGVyLm0wMCkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0wMSAtIG90aGVyLm0wMSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMDEpLCBNYXRoLmFicyhvdGhlci5tMDEpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMDIgLSBvdGhlci5tMDIpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTAyKSwgTWF0aC5hYnMob3RoZXIubTAyKSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMubTAzIC0gb3RoZXIubTAzKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLm0wMyksIE1hdGguYWJzKG90aGVyLm0wMykpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0wNCAtIG90aGVyLm0wNCkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMDQpLCBNYXRoLmFicyhvdGhlci5tMDQpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMDUgLSBvdGhlci5tMDUpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTA1KSwgTWF0aC5hYnMob3RoZXIubTA1KSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMubTA2IC0gb3RoZXIubTA2KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLm0wNiksIE1hdGguYWJzKG90aGVyLm0wNikpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0wNyAtIG90aGVyLm0wNykgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMDcpLCBNYXRoLmFicyhvdGhlci5tMDcpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMDggLSBvdGhlci5tMDgpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTA4KSwgTWF0aC5hYnMob3RoZXIubTA4KSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMubTA5IC0gb3RoZXIubTA5KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLm0wOSksIE1hdGguYWJzKG90aGVyLm0wOSkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0xMCAtIG90aGVyLm0xMCkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMTApLCBNYXRoLmFicyhvdGhlci5tMTApKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMTEgLSBvdGhlci5tMTEpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTExKSwgTWF0aC5hYnMob3RoZXIubTExKSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMubTEyIC0gb3RoZXIubTEyKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLm0xMiksIE1hdGguYWJzKG90aGVyLm0xMikpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0xMyAtIG90aGVyLm0xMykgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMTMpLCBNYXRoLmFicyhvdGhlci5tMTMpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMTQgLSBvdGhlci5tMTQpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTE0KSwgTWF0aC5hYnMob3RoZXIubTE0KSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMubTE1IC0gb3RoZXIubTE1KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLm0xNSksIE1hdGguYWJzKG90aGVyLm0xNSkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFJldHVybnMgd2hldGhlciB0aGUgc3BlY2lmaWVkIG1hdHJpY2VzIGFyZSBlcXVhbC5cbiAgICAgKiBAemgg5Yik5pat5b2T5YmN55+p6Zi15piv5ZCm5LiO5oyH5a6a55+p6Zi155u4562J44CCXG4gICAgICogQHBhcmFtIG90aGVyIENvbXBhcmF0aXZlIG1hdHJpeFxuICAgICAqIEByZXR1cm4gUmV0dXJucyBgdHJ1ZScgd2hlbiB0aGUgZWxlbWVudHMgb2YgYm90aCBtYXRyaWNlcyBhcmUgZXF1YWw7IG90aGVyd2lzZSByZXR1cm5zIGBmYWxzZScuXG4gICAgICovXG4gICAgcHVibGljIHN0cmljdEVxdWFscyAob3RoZXI6IE1hdDQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubTAwID09PSBvdGhlci5tMDAgJiYgdGhpcy5tMDEgPT09IG90aGVyLm0wMSAmJiB0aGlzLm0wMiA9PT0gb3RoZXIubTAyICYmIHRoaXMubTAzID09PSBvdGhlci5tMDNcbiAgICAgICAgICAgICYmIHRoaXMubTA0ID09PSBvdGhlci5tMDQgJiYgdGhpcy5tMDUgPT09IG90aGVyLm0wNSAmJiB0aGlzLm0wNiA9PT0gb3RoZXIubTA2ICYmIHRoaXMubTA3ID09PSBvdGhlci5tMDdcbiAgICAgICAgICAgICYmIHRoaXMubTA4ID09PSBvdGhlci5tMDggJiYgdGhpcy5tMDkgPT09IG90aGVyLm0wOSAmJiB0aGlzLm0xMCA9PT0gb3RoZXIubTEwICYmIHRoaXMubTExID09PSBvdGhlci5tMTFcbiAgICAgICAgICAgICYmIHRoaXMubTEyID09PSBvdGhlci5tMTIgJiYgdGhpcy5tMTMgPT09IG90aGVyLm0xMyAmJiB0aGlzLm0xNCA9PT0gb3RoZXIubTE0ICYmIHRoaXMubTE1ID09PSBvdGhlci5tMTU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBtYXRyaXguXG4gICAgICogQHpoIOi/lOWbnuW9k+WJjeefqemYteeahOWtl+espuS4suihqOekuuOAglxuICAgICAqIEByZXR1cm4g5b2T5YmN55+p6Zi155qE5a2X56ym5Liy6KGo56S644CCXG4gICAgICovXG4gICAgcHVibGljIHRvU3RyaW5nICgpIHtcbiAgICAgICAgcmV0dXJuIGBbXFxuJHtcbiAgICAgICAgICAgIHRoaXMubTAwfSwgJHt0aGlzLm0wMX0sICR7dGhpcy5tMDJ9LCAke3RoaXMubTAzfSxcXG4ke1xuICAgICAgICAgICAgdGhpcy5tMDR9LCAke3RoaXMubTA1fSwgJHt0aGlzLm0wNn0sICR7dGhpcy5tMDd9LFxcbiR7XG4gICAgICAgICAgICB0aGlzLm0wOH0sICR7dGhpcy5tMDl9LCAke3RoaXMubTEwfSwgJHt0aGlzLm0xMX0sXFxuJHtcbiAgICAgICAgICAgIHRoaXMubTEyfSwgJHt0aGlzLm0xM30sICR7dGhpcy5tMTR9LCAke3RoaXMubTE1fVxcbmBcbiAgICAgICAgICAgICsgJ10nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBzZXQgdGhlIGN1cnJlbnQgbWF0cml4IHRvIGFuIGlkZW50aXR5IG1hdHJpeC5cbiAgICAgKiBAemgg5bCG5b2T5YmN55+p6Zi16K6+5Li65Y2V5L2N55+p6Zi144CCXG4gICAgICogQHJldHVybiBgdGhpc2BcbiAgICAgKi9cbiAgICBwdWJsaWMgaWRlbnRpdHkgKCkge1xuICAgICAgICB0aGlzLm0wMCA9IDE7XG4gICAgICAgIHRoaXMubTAxID0gMDtcbiAgICAgICAgdGhpcy5tMDIgPSAwO1xuICAgICAgICB0aGlzLm0wMyA9IDA7XG4gICAgICAgIHRoaXMubTA0ID0gMDtcbiAgICAgICAgdGhpcy5tMDUgPSAxO1xuICAgICAgICB0aGlzLm0wNiA9IDA7XG4gICAgICAgIHRoaXMubTA3ID0gMDtcbiAgICAgICAgdGhpcy5tMDggPSAwO1xuICAgICAgICB0aGlzLm0wOSA9IDA7XG4gICAgICAgIHRoaXMubTEwID0gMTtcbiAgICAgICAgdGhpcy5tMTEgPSAwO1xuICAgICAgICB0aGlzLm0xMiA9IDA7XG4gICAgICAgIHRoaXMubTEzID0gMDtcbiAgICAgICAgdGhpcy5tMTQgPSAwO1xuICAgICAgICB0aGlzLm0xNSA9IDE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBzZXQgdGhlIGN1cnJlbnQgbWF0cml4IHRvIGFuIHplcm8gbWF0cml4LlxuICAgICAqIEB6aCDlsIblvZPliY3nn6npmLXorr7kuLogMOefqemYteOAglxuICAgICAqIEByZXR1cm4gYHRoaXNgXG4gICAgICovXG4gICAgcHVibGljIHplcm8gKCkge1xuICAgICAgICB0aGlzLm0wMCA9IDA7XG4gICAgICAgIHRoaXMubTAxID0gMDtcbiAgICAgICAgdGhpcy5tMDIgPSAwO1xuICAgICAgICB0aGlzLm0wMyA9IDA7XG4gICAgICAgIHRoaXMubTA0ID0gMDtcbiAgICAgICAgdGhpcy5tMDUgPSAwO1xuICAgICAgICB0aGlzLm0wNiA9IDA7XG4gICAgICAgIHRoaXMubTA3ID0gMDtcbiAgICAgICAgdGhpcy5tMDggPSAwO1xuICAgICAgICB0aGlzLm0wOSA9IDA7XG4gICAgICAgIHRoaXMubTEwID0gMDtcbiAgICAgICAgdGhpcy5tMTEgPSAwO1xuICAgICAgICB0aGlzLm0xMiA9IDA7XG4gICAgICAgIHRoaXMubTEzID0gMDtcbiAgICAgICAgdGhpcy5tMTQgPSAwO1xuICAgICAgICB0aGlzLm0xNSA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBUcmFuc3Bvc2VzIHRoZSBjdXJyZW50IG1hdHJpeC5cbiAgICAgKiBAemgg6K6h566X5b2T5YmN55+p6Zi155qE6L2s572u55+p6Zi144CCXG4gICAgICovXG4gICAgcHVibGljIHRyYW5zcG9zZSAoKSB7XG4gICAgICAgIGNvbnN0IGEwMSA9IHRoaXMubTAxOyBjb25zdCBhMDIgPSB0aGlzLm0wMjsgY29uc3QgYTAzID0gdGhpcy5tMDM7IGNvbnN0IGExMiA9IHRoaXMubTA2OyBjb25zdCBhMTMgPSB0aGlzLm0wNzsgY29uc3QgYTIzID0gdGhpcy5tMTE7XG4gICAgICAgIHRoaXMubTAxID0gdGhpcy5tMDQ7XG4gICAgICAgIHRoaXMubTAyID0gdGhpcy5tMDg7XG4gICAgICAgIHRoaXMubTAzID0gdGhpcy5tMTI7XG4gICAgICAgIHRoaXMubTA0ID0gYTAxO1xuICAgICAgICB0aGlzLm0wNiA9IHRoaXMubTA5O1xuICAgICAgICB0aGlzLm0wNyA9IHRoaXMubTEzO1xuICAgICAgICB0aGlzLm0wOCA9IGEwMjtcbiAgICAgICAgdGhpcy5tMDkgPSBhMTI7XG4gICAgICAgIHRoaXMubTExID0gdGhpcy5tMTQ7XG4gICAgICAgIHRoaXMubTEyID0gYTAzO1xuICAgICAgICB0aGlzLm0xMyA9IGExMztcbiAgICAgICAgdGhpcy5tMTQgPSBhMjM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBJbnZlcnRzIHRoZSBjdXJyZW50IG1hdHJpeC4gV2hlbiBtYXRyaXggaXMgbm90IGludmVydGlibGUgdGhlIG1hdHJpeCB3aWxsIGJlIHNldCB0byB6ZXJvcy5cbiAgICAgKiBAemgg6K6h566X5b2T5YmN55+p6Zi155qE6YCG55+p6Zi144CC5rOo5oSP77yM5Zyo55+p6Zi15LiN5Y+v6YCG5pe277yM5Lya6L+U5Zue5LiA5Liq5YWo5Li6IDAg55qE55+p6Zi144CCXG4gICAgICovXG4gICAgcHVibGljIGludmVydCAoKSB7XG4gICAgICAgIGNvbnN0IGEwMCA9IHRoaXMubTAwOyBjb25zdCBhMDEgPSB0aGlzLm0wMTsgY29uc3QgYTAyID0gdGhpcy5tMDI7IGNvbnN0IGEwMyA9IHRoaXMubTAzO1xuICAgICAgICBjb25zdCBhMTAgPSB0aGlzLm0wNDsgY29uc3QgYTExID0gdGhpcy5tMDU7IGNvbnN0IGExMiA9IHRoaXMubTA2OyBjb25zdCBhMTMgPSB0aGlzLm0wNztcbiAgICAgICAgY29uc3QgYTIwID0gdGhpcy5tMDg7IGNvbnN0IGEyMSA9IHRoaXMubTA5OyBjb25zdCBhMjIgPSB0aGlzLm0xMDsgY29uc3QgYTIzID0gdGhpcy5tMTE7XG4gICAgICAgIGNvbnN0IGEzMCA9IHRoaXMubTEyOyBjb25zdCBhMzEgPSB0aGlzLm0xMzsgY29uc3QgYTMyID0gdGhpcy5tMTQ7IGNvbnN0IGEzMyA9IHRoaXMubTE1O1xuXG4gICAgICAgIGNvbnN0IGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMDtcbiAgICAgICAgY29uc3QgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwO1xuICAgICAgICBjb25zdCBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTA7XG4gICAgICAgIGNvbnN0IGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMTtcbiAgICAgICAgY29uc3QgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExO1xuICAgICAgICBjb25zdCBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTI7XG4gICAgICAgIGNvbnN0IGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMDtcbiAgICAgICAgY29uc3QgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwO1xuICAgICAgICBjb25zdCBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzA7XG4gICAgICAgIGNvbnN0IGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMTtcbiAgICAgICAgY29uc3QgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxO1xuICAgICAgICBjb25zdCBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgICAgICBsZXQgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gICAgICAgIGlmIChkZXQgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgICAgIHRoaXMubTAwID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XG4gICAgICAgIHRoaXMubTAxID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gICAgICAgIHRoaXMubTAyID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XG4gICAgICAgIHRoaXMubTAzID0gKGEyMiAqIGIwNCAtIGEyMSAqIGIwNSAtIGEyMyAqIGIwMykgKiBkZXQ7XG4gICAgICAgIHRoaXMubTA0ID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gICAgICAgIHRoaXMubTA1ID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gICAgICAgIHRoaXMubTA2ID0gKGEzMiAqIGIwMiAtIGEzMCAqIGIwNSAtIGEzMyAqIGIwMSkgKiBkZXQ7XG4gICAgICAgIHRoaXMubTA3ID0gKGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSkgKiBkZXQ7XG4gICAgICAgIHRoaXMubTA4ID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG4gICAgICAgIHRoaXMubTA5ID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XG4gICAgICAgIHRoaXMubTEwID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XG4gICAgICAgIHRoaXMubTExID0gKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgKiBkZXQ7XG4gICAgICAgIHRoaXMubTEyID0gKGExMSAqIGIwNyAtIGExMCAqIGIwOSAtIGExMiAqIGIwNikgKiBkZXQ7XG4gICAgICAgIHRoaXMubTEzID0gKGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNikgKiBkZXQ7XG4gICAgICAgIHRoaXMubTE0ID0gKGEzMSAqIGIwMSAtIGEzMCAqIGIwMyAtIGEzMiAqIGIwMCkgKiBkZXQ7XG4gICAgICAgIHRoaXMubTE1ID0gKGEyMCAqIGIwMyAtIGEyMSAqIGIwMSArIGEyMiAqIGIwMCkgKiBkZXQ7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIHRoZSBjdXJyZW50IG1hdHJpeC5cbiAgICAgKiBAemgg6K6h566X5b2T5YmN55+p6Zi155qE6KGM5YiX5byP44CCXG4gICAgICogQHJldHVybiDlvZPliY3nn6npmLXnmoTooYzliJflvI/jgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgZGV0ZXJtaW5hbnQgKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGEwMCA9IHRoaXMubTAwOyBjb25zdCBhMDEgPSB0aGlzLm0wMTsgY29uc3QgYTAyID0gdGhpcy5tMDI7IGNvbnN0IGEwMyA9IHRoaXMubTAzO1xuICAgICAgICBjb25zdCBhMTAgPSB0aGlzLm0wNDsgY29uc3QgYTExID0gdGhpcy5tMDU7IGNvbnN0IGExMiA9IHRoaXMubTA2OyBjb25zdCBhMTMgPSB0aGlzLm0wNztcbiAgICAgICAgY29uc3QgYTIwID0gdGhpcy5tMDg7IGNvbnN0IGEyMSA9IHRoaXMubTA5OyBjb25zdCBhMjIgPSB0aGlzLm0xMDsgY29uc3QgYTIzID0gdGhpcy5tMTE7XG4gICAgICAgIGNvbnN0IGEzMCA9IHRoaXMubTEyOyBjb25zdCBhMzEgPSB0aGlzLm0xMzsgY29uc3QgYTMyID0gdGhpcy5tMTQ7IGNvbnN0IGEzMyA9IHRoaXMubTE1O1xuXG4gICAgICAgIGNvbnN0IGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMDtcbiAgICAgICAgY29uc3QgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwO1xuICAgICAgICBjb25zdCBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTA7XG4gICAgICAgIGNvbnN0IGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMTtcbiAgICAgICAgY29uc3QgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExO1xuICAgICAgICBjb25zdCBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTI7XG4gICAgICAgIGNvbnN0IGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMDtcbiAgICAgICAgY29uc3QgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwO1xuICAgICAgICBjb25zdCBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzA7XG4gICAgICAgIGNvbnN0IGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMTtcbiAgICAgICAgY29uc3QgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxO1xuICAgICAgICBjb25zdCBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgICAgICByZXR1cm4gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBBZGRzIHRoZSBjdXJyZW50IG1hdHJpeCBhbmQgYW5vdGhlciBtYXRyaXggdG8gdGhlIGN1cnJlbnQgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXliqDms5XjgILlsIblvZPliY3nn6npmLXkuI7mjIflrprnn6npmLXnmoTnm7jliqDvvIznu5Pmnpzov5Tlm57nu5nlvZPliY3nn6npmLXjgIJcbiAgICAgKiBAcGFyYW0gbWF0IHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqL1xuICAgIHB1YmxpYyBhZGQgKG1hdDogTWF0NCkge1xuICAgICAgICB0aGlzLm0wMCArPSBtYXQubTAwO1xuICAgICAgICB0aGlzLm0wMSArPSBtYXQubTAxO1xuICAgICAgICB0aGlzLm0wMiArPSBtYXQubTAyO1xuICAgICAgICB0aGlzLm0wMyArPSBtYXQubTAzO1xuICAgICAgICB0aGlzLm0wNCArPSBtYXQubTA0O1xuICAgICAgICB0aGlzLm0wNSArPSBtYXQubTA1O1xuICAgICAgICB0aGlzLm0wNiArPSBtYXQubTA2O1xuICAgICAgICB0aGlzLm0wNyArPSBtYXQubTA3O1xuICAgICAgICB0aGlzLm0wOCArPSBtYXQubTA4O1xuICAgICAgICB0aGlzLm0wOSArPSBtYXQubTA5O1xuICAgICAgICB0aGlzLm0xMCArPSBtYXQubTEwO1xuICAgICAgICB0aGlzLm0xMSArPSBtYXQubTExO1xuICAgICAgICB0aGlzLm0xMiArPSBtYXQubTEyO1xuICAgICAgICB0aGlzLm0xMyArPSBtYXQubTEzO1xuICAgICAgICB0aGlzLm0xNCArPSBtYXQubTE0O1xuICAgICAgICB0aGlzLm0xNSArPSBtYXQubTE1O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU3VidHJhY3RzIGFub3RoZXIgbWF0cml4IGZyb20gdGhlIGN1cnJlbnQgbWF0cml4LlxuICAgICAqIEB6aCDorqHnrpfnn6npmLXlh4/ms5XjgILlsIblvZPliY3nn6npmLXlh4/ljrvmjIflrprnn6npmLXnmoTnu5PmnpzotYvlgLznu5nlvZPliY3nn6npmLXjgIJcbiAgICAgKiBAcGFyYW0gbWF0IHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqL1xuICAgIHB1YmxpYyBzdWJ0cmFjdCAobWF0OiBNYXQ0KSB7XG4gICAgICAgIHRoaXMubTAwIC09IG1hdC5tMDA7XG4gICAgICAgIHRoaXMubTAxIC09IG1hdC5tMDE7XG4gICAgICAgIHRoaXMubTAyIC09IG1hdC5tMDI7XG4gICAgICAgIHRoaXMubTAzIC09IG1hdC5tMDM7XG4gICAgICAgIHRoaXMubTA0IC09IG1hdC5tMDQ7XG4gICAgICAgIHRoaXMubTA1IC09IG1hdC5tMDU7XG4gICAgICAgIHRoaXMubTA2IC09IG1hdC5tMDY7XG4gICAgICAgIHRoaXMubTA3IC09IG1hdC5tMDc7XG4gICAgICAgIHRoaXMubTA4IC09IG1hdC5tMDg7XG4gICAgICAgIHRoaXMubTA5IC09IG1hdC5tMDk7XG4gICAgICAgIHRoaXMubTEwIC09IG1hdC5tMTA7XG4gICAgICAgIHRoaXMubTExIC09IG1hdC5tMTE7XG4gICAgICAgIHRoaXMubTEyIC09IG1hdC5tMTI7XG4gICAgICAgIHRoaXMubTEzIC09IG1hdC5tMTM7XG4gICAgICAgIHRoaXMubTE0IC09IG1hdC5tMTQ7XG4gICAgICAgIHRoaXMubTE1IC09IG1hdC5tMTU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBNdWx0aXBseSB0aGUgY3VycmVudCBtYXRyaXggd2l0aCBhbm90aGVyIG1hdHJpeC5cbiAgICAgKiBAemgg55+p6Zi15LmY5rOV44CC5bCG5b2T5YmN55+p6Zi15bem5LmY5oyH5a6a55+p6Zi155qE57uT5p6c6LWL5YC857uZ5b2T5YmN55+p6Zi144CCXG4gICAgICogQHBhcmFtIG1hdCB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKi9cbiAgICBwdWJsaWMgbXVsdGlwbHkgKG1hdDogTWF0NCkge1xuICAgICAgICBjb25zdCBhMDAgPSB0aGlzLm0wMDsgY29uc3QgYTAxID0gdGhpcy5tMDE7IGNvbnN0IGEwMiA9IHRoaXMubTAyOyBjb25zdCBhMDMgPSB0aGlzLm0wMztcbiAgICAgICAgY29uc3QgYTEwID0gdGhpcy5tMDQ7IGNvbnN0IGExMSA9IHRoaXMubTA1OyBjb25zdCBhMTIgPSB0aGlzLm0wNjsgY29uc3QgYTEzID0gdGhpcy5tMDc7XG4gICAgICAgIGNvbnN0IGEyMCA9IHRoaXMubTA4OyBjb25zdCBhMjEgPSB0aGlzLm0wOTsgY29uc3QgYTIyID0gdGhpcy5tMTA7IGNvbnN0IGEyMyA9IHRoaXMubTExO1xuICAgICAgICBjb25zdCBhMzAgPSB0aGlzLm0xMjsgY29uc3QgYTMxID0gdGhpcy5tMTM7IGNvbnN0IGEzMiA9IHRoaXMubTE0OyBjb25zdCBhMzMgPSB0aGlzLm0xNTtcblxuICAgICAgICAvLyBDYWNoZSBvbmx5IHRoZSBjdXJyZW50IGxpbmUgb2YgdGhlIHNlY29uZCBtYXRyaXhcbiAgICAgICAgbGV0IGIwID0gbWF0Lm0wMDsgbGV0IGIxID0gbWF0Lm0wMTsgbGV0IGIyID0gbWF0Lm0wMjsgbGV0IGIzID0gbWF0Lm0wMztcbiAgICAgICAgdGhpcy5tMDAgPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgICAgICAgdGhpcy5tMDEgPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcbiAgICAgICAgdGhpcy5tMDIgPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgICAgICAgdGhpcy5tMDMgPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcblxuICAgICAgICBiMCA9IG1hdC5tMDQ7IGIxID0gbWF0Lm0wNTsgYjIgPSBtYXQubTA2OyBiMyA9IG1hdC5tMDc7XG4gICAgICAgIHRoaXMubTA0ID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gICAgICAgIHRoaXMubTA1ID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gICAgICAgIHRoaXMubTA2ID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XG4gICAgICAgIHRoaXMubTA3ID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG5cbiAgICAgICAgYjAgPSBtYXQubTA4OyBiMSA9IG1hdC5tMDk7IGIyID0gbWF0Lm0xMDsgYjMgPSBtYXQubTExO1xuICAgICAgICB0aGlzLm0wOCA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuICAgICAgICB0aGlzLm0wOSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICAgICAgICB0aGlzLm0xMCA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICAgICAgICB0aGlzLm0xMSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuXG4gICAgICAgIGIwID0gbWF0Lm0xMjsgYjEgPSBtYXQubTEzOyBiMiA9IG1hdC5tMTQ7IGIzID0gbWF0Lm0xNTtcbiAgICAgICAgdGhpcy5tMTIgPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgICAgICAgdGhpcy5tMTMgPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcbiAgICAgICAgdGhpcy5tMTQgPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgICAgICAgdGhpcy5tMTUgPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIE11bHRpcGx5IGVhY2ggZWxlbWVudCBvZiB0aGUgY3VycmVudCBtYXRyaXggYnkgYSBzY2FsYXIgbnVtYmVyLlxuICAgICAqIEB6aCDnn6npmLXmlbDkuZjjgILlsIblvZPliY3nn6npmLXkuI7mjIflrprmoIfph4/nmoTmlbDkuZjnu5PmnpzotYvlgLznu5nlvZPliY3nn6npmLXjgIJcbiAgICAgKiBAcGFyYW0gc2NhbGFyIGFtb3VudCB0byBzY2FsZSB0aGUgbWF0cml4J3MgZWxlbWVudHMgYnlcbiAgICAgKi9cbiAgICBwdWJsaWMgbXVsdGlwbHlTY2FsYXIgKHNjYWxhcjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubTAwICo9IHNjYWxhcjtcbiAgICAgICAgdGhpcy5tMDEgKj0gc2NhbGFyO1xuICAgICAgICB0aGlzLm0wMiAqPSBzY2FsYXI7XG4gICAgICAgIHRoaXMubTAzICo9IHNjYWxhcjtcbiAgICAgICAgdGhpcy5tMDQgKj0gc2NhbGFyO1xuICAgICAgICB0aGlzLm0wNSAqPSBzY2FsYXI7XG4gICAgICAgIHRoaXMubTA2ICo9IHNjYWxhcjtcbiAgICAgICAgdGhpcy5tMDcgKj0gc2NhbGFyO1xuICAgICAgICB0aGlzLm0wOCAqPSBzY2FsYXI7XG4gICAgICAgIHRoaXMubTA5ICo9IHNjYWxhcjtcbiAgICAgICAgdGhpcy5tMTAgKj0gc2NhbGFyO1xuICAgICAgICB0aGlzLm0xMSAqPSBzY2FsYXI7XG4gICAgICAgIHRoaXMubTEyICo9IHNjYWxhcjtcbiAgICAgICAgdGhpcy5tMTMgKj0gc2NhbGFyO1xuICAgICAgICB0aGlzLm0xNCAqPSBzY2FsYXI7XG4gICAgICAgIHRoaXMubTE1ICo9IHNjYWxhcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFRyYW5zbGF0ZSB0aGUgY3VycmVudCBtYXRyaXggYnkgdGhlIGdpdmVuIHZlY3RvclxuICAgICAqIEB6aCDlsIblvZPliY3nn6npmLXlt6bkuZjkvY3np7vnn6npmLXnmoTnu5PmnpzotYvlgLznu5nlvZPliY3nn6npmLXvvIzkvY3np7vnn6npmLXnlLHlkITkuKrovbTnmoTkvY3np7vnu5nlh7rjgIJcbiAgICAgKiBAcGFyYW0gdmVjIHZlY3RvciB0byB0cmFuc2xhdGUgYnlcbiAgICAgKi9cbiAgICBwdWJsaWMgdHJhbnNsYXRlICh2ZWM6IFZlYzMpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdmdW5jdGlvbiBjaGFuZ2VkJyk7XG4gICAgICAgIHRoaXMubTEyICs9IHZlYy54O1xuICAgICAgICB0aGlzLm0xMyArPSB2ZWMueTtcbiAgICAgICAgdGhpcy5tMTQgKz0gdmVjLno7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBNdWx0aXBseSB0aGUgY3VycmVudCBtYXRyaXggd2l0aCBhIHNjYWxlIHZlY3Rvci5cbiAgICAgKiBAemgg5bCG5b2T5YmN55+p6Zi15bem5LmY57yp5pS+55+p6Zi155qE57uT5p6c6LWL5YC857uZ5b2T5YmN55+p6Zi177yM57yp5pS+55+p6Zi155Sx5ZCE5Liq6L2055qE57yp5pS+57uZ5Ye644CCXG4gICAgICogQHBhcmFtIHZlYyB2ZWN0b3IgdG8gc2NhbGUgYnlcbiAgICAgKi9cbiAgICBwdWJsaWMgc2NhbGUgKHZlYzogVmVjMykge1xuICAgICAgICBjb25zdCB4ID0gdmVjLng7IGNvbnN0IHkgPSB2ZWMueTsgY29uc3QgeiA9IHZlYy56O1xuICAgICAgICB0aGlzLm0wMCAqPSB4O1xuICAgICAgICB0aGlzLm0wMSAqPSB4O1xuICAgICAgICB0aGlzLm0wMiAqPSB4O1xuICAgICAgICB0aGlzLm0wMyAqPSB4O1xuICAgICAgICB0aGlzLm0wNCAqPSB5O1xuICAgICAgICB0aGlzLm0wNSAqPSB5O1xuICAgICAgICB0aGlzLm0wNiAqPSB5O1xuICAgICAgICB0aGlzLm0wNyAqPSB5O1xuICAgICAgICB0aGlzLm0wOCAqPSB6O1xuICAgICAgICB0aGlzLm0wOSAqPSB6O1xuICAgICAgICB0aGlzLm0xMCAqPSB6O1xuICAgICAgICB0aGlzLm0xMSAqPSB6O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gUm90YXRlcyB0aGUgY3VycmVudCBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgZ2l2ZW4gYXhpc1xuICAgICAqIEB6aCDlsIblvZPliY3nn6npmLXlt6bkuZjml4vovaznn6npmLXnmoTnu5PmnpzotYvlgLznu5nlvZPliY3nn6npmLXvvIzml4vovaznn6npmLXnlLHml4vovazovbTlkozml4vovazop5Lluqbnu5nlh7rjgIJcbiAgICAgKiBAcGFyYW0gcmFkIEFuZ2xlIG9mIHJvdGF0aW9uIChpbiByYWRpYW5zKVxuICAgICAqIEBwYXJhbSBheGlzIEF4aXMgb2Ygcm90YXRpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgcm90YXRlIChyYWQ6IG51bWJlciwgYXhpczogVmVjMykge1xuICAgICAgICBsZXQgeCA9IGF4aXMueDsgbGV0IHkgPSBheGlzLnk7IGxldCB6ID0gYXhpcy56O1xuXG4gICAgICAgIGxldCBsZW4gPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KTtcblxuICAgICAgICBpZiAoTWF0aC5hYnMobGVuKSA8IEVQU0lMT04pIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgeCAqPSBsZW47XG4gICAgICAgIHkgKj0gbGVuO1xuICAgICAgICB6ICo9IGxlbjtcblxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIGNvbnN0IHQgPSAxIC0gYztcblxuICAgICAgICBjb25zdCBhMDAgPSB0aGlzLm0wMDsgY29uc3QgYTAxID0gdGhpcy5tMDE7IGNvbnN0IGEwMiA9IHRoaXMubTAyOyBjb25zdCBhMDMgPSB0aGlzLm0wMztcbiAgICAgICAgY29uc3QgYTEwID0gdGhpcy5tMDQ7IGNvbnN0IGExMSA9IHRoaXMubTA1OyBjb25zdCBhMTIgPSB0aGlzLm0wNjsgY29uc3QgYTEzID0gdGhpcy5tMDc7XG4gICAgICAgIGNvbnN0IGEyMCA9IHRoaXMubTA4OyBjb25zdCBhMjEgPSB0aGlzLm0wOTsgY29uc3QgYTIyID0gdGhpcy5tMTA7IGNvbnN0IGEyMyA9IHRoaXMubTExO1xuXG4gICAgICAgIC8vIENvbnN0cnVjdCB0aGUgZWxlbWVudHMgb2YgdGhlIHJvdGF0aW9uIG1hdHJpeFxuICAgICAgICBjb25zdCBiMDAgPSB4ICogeCAqIHQgKyBjOyBjb25zdCBiMDEgPSB5ICogeCAqIHQgKyB6ICogczsgY29uc3QgYjAyID0geiAqIHggKiB0IC0geSAqIHM7XG4gICAgICAgIGNvbnN0IGIxMCA9IHggKiB5ICogdCAtIHogKiBzOyBjb25zdCBiMTEgPSB5ICogeSAqIHQgKyBjOyBjb25zdCBiMTIgPSB6ICogeSAqIHQgKyB4ICogcztcbiAgICAgICAgY29uc3QgYjIwID0geCAqIHogKiB0ICsgeSAqIHM7IGNvbnN0IGIyMSA9IHkgKiB6ICogdCAtIHggKiBzOyBjb25zdCBiMjIgPSB6ICogeiAqIHQgKyBjO1xuXG4gICAgICAgIC8vIFBlcmZvcm0gcm90YXRpb24tc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgICAgIHRoaXMubTAwID0gYTAwICogYjAwICsgYTEwICogYjAxICsgYTIwICogYjAyO1xuICAgICAgICB0aGlzLm0wMSA9IGEwMSAqIGIwMCArIGExMSAqIGIwMSArIGEyMSAqIGIwMjtcbiAgICAgICAgdGhpcy5tMDIgPSBhMDIgKiBiMDAgKyBhMTIgKiBiMDEgKyBhMjIgKiBiMDI7XG4gICAgICAgIHRoaXMubTAzID0gYTAzICogYjAwICsgYTEzICogYjAxICsgYTIzICogYjAyO1xuICAgICAgICB0aGlzLm0wNCA9IGEwMCAqIGIxMCArIGExMCAqIGIxMSArIGEyMCAqIGIxMjtcbiAgICAgICAgdGhpcy5tMDUgPSBhMDEgKiBiMTAgKyBhMTEgKiBiMTEgKyBhMjEgKiBiMTI7XG4gICAgICAgIHRoaXMubTA2ID0gYTAyICogYjEwICsgYTEyICogYjExICsgYTIyICogYjEyO1xuICAgICAgICB0aGlzLm0wNyA9IGEwMyAqIGIxMCArIGExMyAqIGIxMSArIGEyMyAqIGIxMjtcbiAgICAgICAgdGhpcy5tMDggPSBhMDAgKiBiMjAgKyBhMTAgKiBiMjEgKyBhMjAgKiBiMjI7XG4gICAgICAgIHRoaXMubTA5ID0gYTAxICogYjIwICsgYTExICogYjIxICsgYTIxICogYjIyO1xuICAgICAgICB0aGlzLm0xMCA9IGEwMiAqIGIyMCArIGExMiAqIGIyMSArIGEyMiAqIGIyMjtcbiAgICAgICAgdGhpcy5tMTEgPSBhMDMgKiBiMjAgKyBhMTMgKiBiMjEgKyBhMjMgKiBiMjI7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFJldHVybnMgdGhlIHRyYW5zbGF0aW9uIHZlY3RvciBjb21wb25lbnQgb2YgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguXG4gICAgICogQHpoIOS7juW9k+WJjeefqemYteS4reiuoeeul+WHuuS9jeenu+WPmOaNoueahOmDqOWIhu+8jOW5tuS7peWQhOS4qui9tOS4iuS9jeenu+eahOW9ouW8j+i1i+WAvOe7meWHuuWPo+WQkemHj+OAglxuICAgICAqIEBwYXJhbSBvdXQgVmVjdG9yIHRvIHJlY2VpdmUgdHJhbnNsYXRpb24gY29tcG9uZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRUcmFuc2xhdGlvbiAob3V0OiBWZWMzKSB7XG4gICAgICAgIG91dC54ID0gdGhpcy5tMTI7XG4gICAgICAgIG91dC55ID0gdGhpcy5tMTM7XG4gICAgICAgIG91dC56ID0gdGhpcy5tMTQ7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gUmV0dXJucyB0aGUgc2NhbGUgZmFjdG9yIGNvbXBvbmVudCBvZiBhIHRyYW5zZm9ybWF0aW9uIG1hdHJpeFxuICAgICAqIEB6aCDku47lvZPliY3nn6npmLXkuK3orqHnrpflh7rnvKnmlL7lj5jmjaLnmoTpg6jliIbvvIzlubbku6XlkITkuKrovbTkuIrnvKnmlL7nmoTlvaLlvI/otYvlgLznu5nlh7rlj6PlkJHph4/jgIJcbiAgICAgKiBAcGFyYW0gb3V0IFZlY3RvciB0byByZWNlaXZlIHNjYWxlIGNvbXBvbmVudFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRTY2FsZSAob3V0OiBWZWMzKSB7XG4gICAgICAgIGNvbnN0IG0wMCA9IG0zXzEubTAwID0gdGhpcy5tMDA7XG4gICAgICAgIGNvbnN0IG0wMSA9IG0zXzEubTAxID0gdGhpcy5tMDE7XG4gICAgICAgIGNvbnN0IG0wMiA9IG0zXzEubTAyID0gdGhpcy5tMDI7XG4gICAgICAgIGNvbnN0IG0wNCA9IG0zXzEubTAzID0gdGhpcy5tMDQ7XG4gICAgICAgIGNvbnN0IG0wNSA9IG0zXzEubTA0ID0gdGhpcy5tMDU7XG4gICAgICAgIGNvbnN0IG0wNiA9IG0zXzEubTA1ID0gdGhpcy5tMDY7XG4gICAgICAgIGNvbnN0IG0wOCA9IG0zXzEubTA2ID0gdGhpcy5tMDg7XG4gICAgICAgIGNvbnN0IG0wOSA9IG0zXzEubTA3ID0gdGhpcy5tMDk7XG4gICAgICAgIGNvbnN0IG0xMCA9IG0zXzEubTA4ID0gdGhpcy5tMTA7XG4gICAgICAgIG91dC54ID0gTWF0aC5zcXJ0KG0wMCAqIG0wMCArIG0wMSAqIG0wMSArIG0wMiAqIG0wMik7XG4gICAgICAgIG91dC55ID0gTWF0aC5zcXJ0KG0wNCAqIG0wNCArIG0wNSAqIG0wNSArIG0wNiAqIG0wNik7XG4gICAgICAgIG91dC56ID0gTWF0aC5zcXJ0KG0wOCAqIG0wOCArIG0wOSAqIG0wOSArIG0xMCAqIG0xMCk7XG4gICAgICAgIC8vIGFjY291bnQgZm9yIHJlZmVjdGlvbnNcbiAgICAgICAgaWYgKE1hdDMuZGV0ZXJtaW5hbnQobTNfMSkgPCAwKSB7IG91dC54ICo9IC0xOyB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFJldHVybnMgdGhlIHJvdGF0aW9uIGZhY3RvciBjb21wb25lbnQgb2YgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXhcbiAgICAgKiBAemgg5LuO5b2T5YmN55+p6Zi15Lit6K6h566X5Ye65peL6L2s5Y+Y5o2i55qE6YOo5YiG77yM5bm25Lul5Zub5YWD5pWw55qE5b2i5byP6LWL5YC857uZ5Ye65Y+j5Zub5YWD5pWw44CCXG4gICAgICogQHBhcmFtIG91dCBWZWN0b3IgdG8gcmVjZWl2ZSByb3RhdGlvbiBjb21wb25lbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Um90YXRpb24gKG91dDogUXVhdCkge1xuICAgICAgICBjb25zdCB0cmFjZSA9IHRoaXMubTAwICsgdGhpcy5tMDUgKyB0aGlzLm0xMDtcbiAgICAgICAgbGV0IFMgPSAwO1xuXG4gICAgICAgIGlmICh0cmFjZSA+IDApIHtcbiAgICAgICAgICAgIFMgPSBNYXRoLnNxcnQodHJhY2UgKyAxLjApICogMjtcbiAgICAgICAgICAgIG91dC53ID0gMC4yNSAqIFM7XG4gICAgICAgICAgICBvdXQueCA9ICh0aGlzLm0wNiAtIHRoaXMubTA5KSAvIFM7XG4gICAgICAgICAgICBvdXQueSA9ICh0aGlzLm0wOCAtIHRoaXMubTAyKSAvIFM7XG4gICAgICAgICAgICBvdXQueiA9ICh0aGlzLm0wMSAtIHRoaXMubTA0KSAvIFM7XG4gICAgICAgIH0gZWxzZSBpZiAoKHRoaXMubTAwID4gdGhpcy5tMDUpICYmICh0aGlzLm0wMCA+IHRoaXMubTEwKSkge1xuICAgICAgICAgICAgUyA9IE1hdGguc3FydCgxLjAgKyB0aGlzLm0wMCAtIHRoaXMubTA1IC0gdGhpcy5tMTApICogMjtcbiAgICAgICAgICAgIG91dC53ID0gKHRoaXMubTA2IC0gdGhpcy5tMDkpIC8gUztcbiAgICAgICAgICAgIG91dC54ID0gMC4yNSAqIFM7XG4gICAgICAgICAgICBvdXQueSA9ICh0aGlzLm0wMSArIHRoaXMubTA0KSAvIFM7XG4gICAgICAgICAgICBvdXQueiA9ICh0aGlzLm0wOCArIHRoaXMubTAyKSAvIFM7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tMDUgPiB0aGlzLm0xMCkge1xuICAgICAgICAgICAgUyA9IE1hdGguc3FydCgxLjAgKyB0aGlzLm0wNSAtIHRoaXMubTAwIC0gdGhpcy5tMTApICogMjtcbiAgICAgICAgICAgIG91dC53ID0gKHRoaXMubTA4IC0gdGhpcy5tMDIpIC8gUztcbiAgICAgICAgICAgIG91dC54ID0gKHRoaXMubTAxICsgdGhpcy5tMDQpIC8gUztcbiAgICAgICAgICAgIG91dC55ID0gMC4yNSAqIFM7XG4gICAgICAgICAgICBvdXQueiA9ICh0aGlzLm0wNiArIHRoaXMubTA5KSAvIFM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHRoaXMubTEwIC0gdGhpcy5tMDAgLSB0aGlzLm0wNSkgKiAyO1xuICAgICAgICAgICAgb3V0LncgPSAodGhpcy5tMDEgLSB0aGlzLm0wNCkgLyBTO1xuICAgICAgICAgICAgb3V0LnggPSAodGhpcy5tMDggKyB0aGlzLm0wMikgLyBTO1xuICAgICAgICAgICAgb3V0LnkgPSAodGhpcy5tMDYgKyB0aGlzLm0wOSkgLyBTO1xuICAgICAgICAgICAgb3V0LnogPSAwLjI1ICogUztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFJlc2V0cyB0aGUgbWF0cml4IHZhbHVlcyBieSB0aGUgZ2l2ZW4gcm90YXRpb24gcXVhdGVybmlvbiwgdHJhbnNsYXRpb24gdmVjdG9yIGFuZCBzY2FsZSB2ZWN0b3JcbiAgICAgKiBAemgg6YeN572u5b2T5YmN55+p6Zi155qE5YC877yM5L2/5YW26KGo56S65oyH5a6a55qE5peL6L2s44CB57yp5pS+44CB5L2N56e75L6d5qyh57uE5ZCI55qE5Y+Y5o2i44CCXG4gICAgICogQHBhcmFtIHEgUm90YXRpb24gcXVhdGVybmlvblxuICAgICAqIEBwYXJhbSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICAgICAqIEBwYXJhbSBzIFNjYWxpbmcgdmVjdG9yXG4gICAgICogQHJldHVybiBgdGhpc2BcbiAgICAgKi9cbiAgICBwdWJsaWMgZnJvbVJUUyAocTogUXVhdCwgdjogVmVjMywgczogVmVjMykge1xuICAgICAgICBjb25zdCB4ID0gcS54OyBjb25zdCB5ID0gcS55OyBjb25zdCB6ID0gcS56OyBjb25zdCB3ID0gcS53O1xuICAgICAgICBjb25zdCB4MiA9IHggKyB4O1xuICAgICAgICBjb25zdCB5MiA9IHkgKyB5O1xuICAgICAgICBjb25zdCB6MiA9IHogKyB6O1xuXG4gICAgICAgIGNvbnN0IHh4ID0geCAqIHgyO1xuICAgICAgICBjb25zdCB4eSA9IHggKiB5MjtcbiAgICAgICAgY29uc3QgeHogPSB4ICogejI7XG4gICAgICAgIGNvbnN0IHl5ID0geSAqIHkyO1xuICAgICAgICBjb25zdCB5eiA9IHkgKiB6MjtcbiAgICAgICAgY29uc3QgenogPSB6ICogejI7XG4gICAgICAgIGNvbnN0IHd4ID0gdyAqIHgyO1xuICAgICAgICBjb25zdCB3eSA9IHcgKiB5MjtcbiAgICAgICAgY29uc3Qgd3ogPSB3ICogejI7XG4gICAgICAgIGNvbnN0IHN4ID0gcy54O1xuICAgICAgICBjb25zdCBzeSA9IHMueTtcbiAgICAgICAgY29uc3Qgc3ogPSBzLno7XG5cbiAgICAgICAgdGhpcy5tMDAgPSAoMSAtICh5eSArIHp6KSkgKiBzeDtcbiAgICAgICAgdGhpcy5tMDEgPSAoeHkgKyB3eikgKiBzeDtcbiAgICAgICAgdGhpcy5tMDIgPSAoeHogLSB3eSkgKiBzeDtcbiAgICAgICAgdGhpcy5tMDMgPSAwO1xuICAgICAgICB0aGlzLm0wNCA9ICh4eSAtIHd6KSAqIHN5O1xuICAgICAgICB0aGlzLm0wNSA9ICgxIC0gKHh4ICsgenopKSAqIHN5O1xuICAgICAgICB0aGlzLm0wNiA9ICh5eiArIHd4KSAqIHN5O1xuICAgICAgICB0aGlzLm0wNyA9IDA7XG4gICAgICAgIHRoaXMubTA4ID0gKHh6ICsgd3kpICogc3o7XG4gICAgICAgIHRoaXMubTA5ID0gKHl6IC0gd3gpICogc3o7XG4gICAgICAgIHRoaXMubTEwID0gKDEgLSAoeHggKyB5eSkpICogc3o7XG4gICAgICAgIHRoaXMubTExID0gMDtcbiAgICAgICAgdGhpcy5tMTIgPSB2Lng7XG4gICAgICAgIHRoaXMubTEzID0gdi55O1xuICAgICAgICB0aGlzLm0xNCA9IHYuejtcbiAgICAgICAgdGhpcy5tMTUgPSAxO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBSZXNldHMgdGhlIGN1cnJlbnQgbWF0cml4IGZyb20gdGhlIGdpdmVuIHF1YXRlcm5pb24uXG4gICAgICogQHpoIOmHjee9ruW9k+WJjeefqemYteeahOWAvO+8jOS9v+WFtuihqOekuuaMh+WumuWbm+WFg+aVsOihqOekuueahOaXi+i9rOWPmOaNouOAglxuICAgICAqIEBwYXJhbSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cbiAgICAgKiBAcmV0dXJuIGB0aGlzYFxuICAgICAqL1xuICAgIHB1YmxpYyBmcm9tUXVhdCAocTogUXVhdCkge1xuICAgICAgICBjb25zdCB4ID0gcS54OyBjb25zdCB5ID0gcS55OyBjb25zdCB6ID0gcS56OyBjb25zdCB3ID0gcS53O1xuICAgICAgICBjb25zdCB4MiA9IHggKyB4O1xuICAgICAgICBjb25zdCB5MiA9IHkgKyB5O1xuICAgICAgICBjb25zdCB6MiA9IHogKyB6O1xuXG4gICAgICAgIGNvbnN0IHh4ID0geCAqIHgyO1xuICAgICAgICBjb25zdCB5eCA9IHkgKiB4MjtcbiAgICAgICAgY29uc3QgeXkgPSB5ICogeTI7XG4gICAgICAgIGNvbnN0IHp4ID0geiAqIHgyO1xuICAgICAgICBjb25zdCB6eSA9IHogKiB5MjtcbiAgICAgICAgY29uc3QgenogPSB6ICogejI7XG4gICAgICAgIGNvbnN0IHd4ID0gdyAqIHgyO1xuICAgICAgICBjb25zdCB3eSA9IHcgKiB5MjtcbiAgICAgICAgY29uc3Qgd3ogPSB3ICogejI7XG5cbiAgICAgICAgdGhpcy5tMDAgPSAxIC0geXkgLSB6ejtcbiAgICAgICAgdGhpcy5tMDEgPSB5eCArIHd6O1xuICAgICAgICB0aGlzLm0wMiA9IHp4IC0gd3k7XG4gICAgICAgIHRoaXMubTAzID0gMDtcblxuICAgICAgICB0aGlzLm0wNCA9IHl4IC0gd3o7XG4gICAgICAgIHRoaXMubTA1ID0gMSAtIHh4IC0geno7XG4gICAgICAgIHRoaXMubTA2ID0genkgKyB3eDtcbiAgICAgICAgdGhpcy5tMDcgPSAwO1xuXG4gICAgICAgIHRoaXMubTA4ID0genggKyB3eTtcbiAgICAgICAgdGhpcy5tMDkgPSB6eSAtIHd4O1xuICAgICAgICB0aGlzLm0xMCA9IDEgLSB4eCAtIHl5O1xuICAgICAgICB0aGlzLm0xMSA9IDA7XG5cbiAgICAgICAgdGhpcy5tMTIgPSAwO1xuICAgICAgICB0aGlzLm0xMyA9IDA7XG4gICAgICAgIHRoaXMubTE0ID0gMDtcbiAgICAgICAgdGhpcy5tMTUgPSAxO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuY29uc3QgdjNfMSA9IG5ldyBWZWMzKCk7XG5jb25zdCBtM18xID0gbmV3IE1hdDMoKTsiXX0=