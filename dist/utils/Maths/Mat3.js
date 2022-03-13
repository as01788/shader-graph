"use strict";
/**
 * @en Mathematical 3x3 matrix.
 * @zh 表示三维（3x3）矩阵。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mat3 = void 0;
const utils_1 = require("./utils");
const Vec3_1 = require("./Vec3");
class Mat3 {
    constructor(m00 = 1, m01 = 0, m02 = 0, m03 = 0, m04 = 1, m05 = 0, m06 = 0, m07 = 0, m08 = 1) {
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
        }
    }
    /**
     * @en Clone a matrix and save the results to out matrix
     * @zh 获得指定矩阵的拷贝
     */
    static clone(a) {
        return new Mat3(a.m00, a.m01, a.m02, a.m03, a.m04, a.m05, a.m06, a.m07, a.m08);
    }
    /**
     * @en Copy content of a matrix into another and save the results to out matrix
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
        return out;
    }
    /**
     * @en Sets the elements of a matrix with the given values and save the results to out matrix
     * @zh 设置矩阵值
     */
    static set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
        out.m00 = m00;
        out.m01 = m01;
        out.m02 = m02;
        out.m03 = m10;
        out.m04 = m11;
        out.m05 = m12;
        out.m06 = m20;
        out.m07 = m21;
        out.m08 = m22;
        return out;
    }
    /**
     * @en Reset the out matrix to an identity matrix
     * @zh 将目标赋值为单位矩阵
     */
    static identity(out) {
        out.m00 = 1;
        out.m01 = 0;
        out.m02 = 0;
        out.m03 = 0;
        out.m04 = 1;
        out.m05 = 0;
        out.m06 = 0;
        out.m07 = 0;
        out.m08 = 1;
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
            const a12 = a.m05;
            out.m01 = a.m03;
            out.m02 = a.m06;
            out.m03 = a01;
            out.m05 = a.m07;
            out.m06 = a02;
            out.m07 = a12;
        }
        else {
            out.m00 = a.m00;
            out.m01 = a.m03;
            out.m02 = a.m06;
            out.m03 = a.m01;
            out.m04 = a.m04;
            out.m05 = a.m07;
            out.m06 = a.m02;
            out.m07 = a.m05;
            out.m08 = a.m08;
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
        const a10 = a.m03;
        const a11 = a.m04;
        const a12 = a.m05;
        const a20 = a.m06;
        const a21 = a.m07;
        const a22 = a.m08;
        const b01 = a22 * a11 - a12 * a21;
        const b11 = -a22 * a10 + a12 * a20;
        const b21 = a21 * a10 - a11 * a20;
        // Calculate the determinant
        let det = a00 * b01 + a01 * b11 + a02 * b21;
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
            return out;
        }
        det = 1.0 / det;
        out.m00 = b01 * det;
        out.m01 = (-a22 * a01 + a02 * a21) * det;
        out.m02 = (a12 * a01 - a02 * a11) * det;
        out.m03 = b11 * det;
        out.m04 = (a22 * a00 - a02 * a20) * det;
        out.m05 = (-a12 * a00 + a02 * a10) * det;
        out.m06 = b21 * det;
        out.m07 = (-a21 * a00 + a01 * a20) * det;
        out.m08 = (a11 * a00 - a01 * a10) * det;
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
        const a10 = a.m03;
        const a11 = a.m04;
        const a12 = a.m05;
        const a20 = a.m06;
        const a21 = a.m07;
        const a22 = a.m08;
        return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
    }
    /**
     * @en Multiply two matrices explicitly and save the results to out matrix
     * @zh 矩阵乘法
     */
    static multiply(out, a, b) {
        const a00 = a.m00;
        const a01 = a.m01;
        const a02 = a.m02;
        const a10 = a.m03;
        const a11 = a.m04;
        const a12 = a.m05;
        const a20 = a.m06;
        const a21 = a.m07;
        const a22 = a.m08;
        const b00 = b.m00;
        const b01 = b.m01;
        const b02 = b.m02;
        const b10 = b.m03;
        const b11 = b.m04;
        const b12 = b.m05;
        const b20 = b.m06;
        const b21 = b.m07;
        const b22 = b.m08;
        out.m00 = b00 * a00 + b01 * a10 + b02 * a20;
        out.m01 = b00 * a01 + b01 * a11 + b02 * a21;
        out.m02 = b00 * a02 + b01 * a12 + b02 * a22;
        out.m03 = b10 * a00 + b11 * a10 + b12 * a20;
        out.m04 = b10 * a01 + b11 * a11 + b12 * a21;
        out.m05 = b10 * a02 + b11 * a12 + b12 * a22;
        out.m06 = b20 * a00 + b21 * a10 + b22 * a20;
        out.m07 = b20 * a01 + b21 * a11 + b22 * a21;
        out.m08 = b20 * a02 + b21 * a12 + b22 * a22;
        return out;
    }
    /**
     * @en Take the first third order of the fourth order matrix and multiply by the third order matrix
     * @zh 取四阶矩阵的前三阶，与三阶矩阵相乘
     */
    static multiplyMat4(out, a, b) {
        const a00 = a.m00;
        const a01 = a.m01;
        const a02 = a.m02;
        const a10 = a.m03;
        const a11 = a.m04;
        const a12 = a.m05;
        const a20 = a.m06;
        const a21 = a.m07;
        const a22 = a.m08;
        const b00 = b.m00;
        const b01 = b.m01;
        const b02 = b.m02;
        const b10 = b.m04;
        const b11 = b.m05;
        const b12 = b.m06;
        const b20 = b.m08;
        const b21 = b.m09;
        const b22 = b.m10;
        out.m00 = b00 * a00 + b01 * a10 + b02 * a20;
        out.m01 = b00 * a01 + b01 * a11 + b02 * a21;
        out.m02 = b00 * a02 + b01 * a12 + b02 * a22;
        out.m03 = b10 * a00 + b11 * a10 + b12 * a20;
        out.m04 = b10 * a01 + b11 * a11 + b12 * a21;
        out.m05 = b10 * a02 + b11 * a12 + b12 * a22;
        out.m06 = b20 * a00 + b21 * a10 + b22 * a20;
        out.m07 = b20 * a01 + b21 * a11 + b22 * a21;
        out.m08 = b20 * a02 + b21 * a12 + b22 * a22;
        return out;
    }
    /**
     * @en Multiply a matrix with a translation vector given by a translation offset.
     * @zh 在给定矩阵变换基础上加入变换
     */
    static transform(out, a, v) {
        const a00 = a.m00;
        const a01 = a.m01;
        const a02 = a.m02;
        const a10 = a.m03;
        const a11 = a.m04;
        const a12 = a.m05;
        const a20 = a.m06;
        const a21 = a.m07;
        const a22 = a.m08;
        const x = v.x;
        const y = v.y;
        out.m00 = a00;
        out.m01 = a01;
        out.m02 = a02;
        out.m03 = a10;
        out.m04 = a11;
        out.m05 = a12;
        out.m06 = x * a00 + y * a10 + a20;
        out.m07 = x * a01 + y * a11 + a21;
        out.m08 = x * a02 + y * a12 + a22;
        return out;
    }
    /**
     * @en Multiply a matrix with a scale matrix given by a scale vector and save the results to out matrix
     * @zh 在给定矩阵变换基础上加入新缩放变换
     */
    static scale(out, a, v) {
        const x = v.x;
        const y = v.y;
        out.m00 = x * a.m00;
        out.m01 = x * a.m01;
        out.m02 = x * a.m02;
        out.m03 = y * a.m03;
        out.m04 = y * a.m04;
        out.m05 = y * a.m05;
        out.m06 = a.m06;
        out.m07 = a.m07;
        out.m08 = a.m08;
        return out;
    }
    /**
     * @en Rotates the transform by the given angle and save the results into the out matrix
     * @zh 在给定矩阵变换基础上加入新旋转变换
     * @param rad radius of rotation
     */
    static rotate(out, a, rad) {
        const a00 = a.m00;
        const a01 = a.m01;
        const a02 = a.m02;
        const a10 = a.m03;
        const a11 = a.m04;
        const a12 = a.m05;
        const a20 = a.m06;
        const a21 = a.m07;
        const a22 = a.m08;
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        out.m00 = c * a00 + s * a10;
        out.m01 = c * a01 + s * a11;
        out.m02 = c * a02 + s * a12;
        out.m03 = c * a10 - s * a00;
        out.m04 = c * a11 - s * a01;
        out.m05 = c * a12 - s * a02;
        out.m06 = a20;
        out.m07 = a21;
        out.m08 = a22;
        return out;
    }
    /**
     * @en Copies the first third order matrix of a fourth order matrix to the out third order matrix
     * @zh 取四阶矩阵的前三阶
     */
    static fromMat4(out, a) {
        out.m00 = a.m00;
        out.m01 = a.m01;
        out.m02 = a.m02;
        out.m03 = a.m04;
        out.m04 = a.m05;
        out.m05 = a.m06;
        out.m06 = a.m08;
        out.m07 = a.m09;
        out.m08 = a.m10;
        return out;
    }
    /**
     * @en Sets a third order matrix with view direction and up direction. Then save the results to out matrix
     * @zh 根据视口前方向和上方向计算矩阵
     * @param view The view direction, it`s must be normalized.
     * @param up The view up direction, it`s must be normalized, default value is (0, 1, 0).
     */
    static fromViewUp(out, view, up) {
        if (Vec3_1.Vec3.lengthSqr(view) < utils_1.EPSILON * utils_1.EPSILON) {
            Mat3.identity(out);
            return out;
        }
        up = up || Vec3_1.Vec3.UNIT_Y;
        Vec3_1.Vec3.normalize(v3_1, Vec3_1.Vec3.cross(v3_1, up, view));
        if (Vec3_1.Vec3.lengthSqr(v3_1) < utils_1.EPSILON * utils_1.EPSILON) {
            Mat3.identity(out);
            return out;
        }
        Vec3_1.Vec3.cross(v3_2, view, v3_1);
        Mat3.set(out, v3_1.x, v3_1.y, v3_1.z, v3_2.x, v3_2.y, v3_2.z, view.x, view.y, view.z);
        return out;
    }
    /**
     * @en Sets the given matrix with a translation vector and save the results to out matrix
     * @zh 计算位移矩阵
     */
    static fromTranslation(out, v) {
        out.m00 = 1;
        out.m01 = 0;
        out.m02 = 0;
        out.m03 = 0;
        out.m04 = 1;
        out.m05 = 0;
        out.m06 = v.x;
        out.m07 = v.y;
        out.m08 = 1;
        return out;
    }
    /**
     * @en Sets the given matrix with a scale vector and save the results to out matrix
     * @zh 计算缩放矩阵
     */
    static fromScaling(out, v) {
        out.m00 = v.x;
        out.m01 = 0;
        out.m02 = 0;
        out.m03 = 0;
        out.m04 = v.y;
        out.m05 = 0;
        out.m06 = 0;
        out.m07 = 0;
        out.m08 = 1;
        return out;
    }
    /**
     * @en Sets the given matrix with a given angle and save the results to out matrix
     * @zh 计算旋转矩阵
     */
    static fromRotation(out, rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        out.m00 = c;
        out.m01 = s;
        out.m02 = 0;
        out.m03 = -s;
        out.m04 = c;
        out.m05 = 0;
        out.m06 = 0;
        out.m07 = 0;
        out.m08 = 1;
        return out;
    }
    /**
     * @en Sets the given matrix with the given quaternion and save the results to out matrix
     * @zh 根据四元数旋转信息计算矩阵
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
        out.m03 = yx - wz;
        out.m06 = zx + wy;
        out.m01 = yx + wz;
        out.m04 = 1 - xx - zz;
        out.m07 = zy - wx;
        out.m02 = zx - wy;
        out.m05 = zy + wx;
        out.m08 = 1 - xx - yy;
        return out;
    }
    /**
     * @en Calculates the upper-left 3x3 matrix of a 4x4 matrix's inverse transpose
     * @zh 计算指定四维矩阵的逆转置三维矩阵
     */
    static inverseTransposeMat4(out, a) {
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
        out.m03 = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out.m04 = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out.m05 = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        out.m06 = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out.m07 = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out.m08 = (a30 * b04 - a31 * b02 + a33 * b00) * det;
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
        return out;
    }
    /**
     * @en Adds two matrices after multiplying each element of the second operand by a scalar number. And save the results to out matrix.
     * @zh 逐元素矩阵标量乘加: A + B * scale
     */
    static multiplyScalarAndAdd(out, a, b, scale) {
        out.m00 = b.m00 * scale + a.m00;
        out.m01 = b.m01 * scale + a.m01;
        out.m02 = b.m02 * scale + a.m02;
        out.m03 = b.m03 * scale + a.m03;
        out.m04 = b.m04 * scale + a.m04;
        out.m05 = b.m05 * scale + a.m05;
        out.m06 = b.m06 * scale + a.m06;
        out.m07 = b.m07 * scale + a.m07;
        out.m08 = b.m08 * scale + a.m08;
        return out;
    }
    /**
     * @en Returns whether the specified matrices are equal.
     * @zh 矩阵等价判断
     */
    static strictEquals(a, b) {
        return a.m00 === b.m00 && a.m01 === b.m01 && a.m02 === b.m02
            && a.m03 === b.m03 && a.m04 === b.m04 && a.m05 === b.m05
            && a.m06 === b.m06 && a.m07 === b.m07 && a.m08 === b.m08;
    }
    /**
     * @en Returns whether the specified matrices are approximately equal.
     * @zh 排除浮点数误差的矩阵近似等价判断
     */
    static equals(a, b, epsilon = utils_1.EPSILON) {
        return (Math.abs(a.m00 - b.m00) <= epsilon * Math.max(1.0, Math.abs(a.m00), Math.abs(b.m00))
            && Math.abs(a.m01 - b.m01) <= epsilon * Math.max(1.0, Math.abs(a.m01), Math.abs(b.m01))
            && Math.abs(a.m02 - b.m02) <= epsilon * Math.max(1.0, Math.abs(a.m02), Math.abs(b.m02))
            && Math.abs(a.m03 - b.m03) <= epsilon * Math.max(1.0, Math.abs(a.m03), Math.abs(b.m03))
            && Math.abs(a.m04 - b.m04) <= epsilon * Math.max(1.0, Math.abs(a.m04), Math.abs(b.m04))
            && Math.abs(a.m05 - b.m05) <= epsilon * Math.max(1.0, Math.abs(a.m05), Math.abs(b.m05))
            && Math.abs(a.m06 - b.m06) <= epsilon * Math.max(1.0, Math.abs(a.m06), Math.abs(b.m06))
            && Math.abs(a.m07 - b.m07) <= epsilon * Math.max(1.0, Math.abs(a.m07), Math.abs(b.m07))
            && Math.abs(a.m08 - b.m08) <= epsilon * Math.max(1.0, Math.abs(a.m08), Math.abs(b.m08)));
    }
    /**
     * @en Clone a new matrix from the current matrix.
     * @zh 克隆当前矩阵。
     */
    clone() {
        const t = this;
        return new Mat3(t.m00, t.m01, t.m02, t.m03, t.m04, t.m05, t.m06, t.m07, t.m08);
    }
    set(m00 = 1, m01 = 0, m02 = 0, m03 = 0, m04 = 1, m05 = 0, m06 = 0, m07 = 0, m08 = 1) {
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
            && Math.abs(this.m08 - other.m08) <= epsilon * Math.max(1.0, Math.abs(this.m08), Math.abs(other.m08)));
    }
    /**
     * @en Returns whether the specified matrices are equal.
     * @zh 判断当前矩阵是否与指定矩阵相等。
     * @param other Comparative matrix
     * @return Returns `true' when the elements of both matrices are equal; otherwise returns `false'.
     */
    strictEquals(other) {
        return this.m00 === other.m00 && this.m01 === other.m01 && this.m02 === other.m02
            && this.m03 === other.m03 && this.m04 === other.m04 && this.m05 === other.m05
            && this.m06 === other.m06 && this.m07 === other.m07 && this.m08 === other.m08;
    }
    /**
     * @en Returns a string representation of a matrix.
     * @zh 返回当前矩阵的字符串表示。
     * @return The string representation of this matrix
     */
    toString() {
        const t = this;
        return `[\n${t.m00}, ${t.m01}, ${t.m02},\n${t.m03},\n${t.m04}, ${t.m05},\n${t.m06}, ${t.m07},\n${t.m08}\n`
            + `]`;
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
        this.m04 = 1;
        this.m05 = 0;
        this.m06 = 0;
        this.m07 = 0;
        this.m08 = 1;
        return this;
    }
    /**
     * @en Transposes the current matrix.
     * @zh 计算当前矩阵的转置矩阵。
     */
    transpose() {
        const a01 = this.m01;
        const a02 = this.m02;
        const a12 = this.m05;
        this.m01 = this.m03;
        this.m02 = this.m06;
        this.m03 = a01;
        this.m05 = this.m07;
        this.m06 = a02;
        this.m07 = a12;
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
        const a10 = this.m03;
        const a11 = this.m04;
        const a12 = this.m05;
        const a20 = this.m06;
        const a21 = this.m07;
        const a22 = this.m08;
        const b01 = a22 * a11 - a12 * a21;
        const b11 = -a22 * a10 + a12 * a20;
        const b21 = a21 * a10 - a11 * a20;
        // Calculate the determinant
        let det = a00 * b01 + a01 * b11 + a02 * b21;
        if (det === 0) {
            this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
            return this;
        }
        det = 1.0 / det;
        this.m00 = b01 * det;
        this.m01 = (-a22 * a01 + a02 * a21) * det;
        this.m02 = (a12 * a01 - a02 * a11) * det;
        this.m03 = b11 * det;
        this.m04 = (a22 * a00 - a02 * a20) * det;
        this.m05 = (-a12 * a00 + a02 * a10) * det;
        this.m06 = b21 * det;
        this.m07 = (-a21 * a00 + a01 * a20) * det;
        this.m08 = (a11 * a00 - a01 * a10) * det;
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
        const a10 = this.m03;
        const a11 = this.m04;
        const a12 = this.m05;
        const a20 = this.m06;
        const a21 = this.m07;
        const a22 = this.m08;
        return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
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
        const a10 = this.m03;
        const a11 = this.m04;
        const a12 = this.m05;
        const a20 = this.m06;
        const a21 = this.m07;
        const a22 = this.m08;
        const b00 = mat.m00;
        const b01 = mat.m01;
        const b02 = mat.m02;
        const b10 = mat.m03;
        const b11 = mat.m04;
        const b12 = mat.m05;
        const b20 = mat.m06;
        const b21 = mat.m07;
        const b22 = mat.m08;
        this.m00 = b00 * a00 + b01 * a10 + b02 * a20;
        this.m01 = b00 * a01 + b01 * a11 + b02 * a21;
        this.m02 = b00 * a02 + b01 * a12 + b02 * a22;
        this.m03 = b10 * a00 + b11 * a10 + b12 * a20;
        this.m04 = b10 * a01 + b11 * a11 + b12 * a21;
        this.m05 = b10 * a02 + b11 * a12 + b12 * a22;
        this.m06 = b20 * a00 + b21 * a10 + b22 * a20;
        this.m07 = b20 * a01 + b21 * a11 + b22 * a21;
        this.m08 = b20 * a02 + b21 * a12 + b22 * a22;
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
        return this;
    }
    /**
     * @en Multiply the current matrix with a scale matrix given by a scale vector.
     * @zh 将当前矩阵左乘缩放矩阵的结果赋值给当前矩阵，缩放矩阵由各个轴的缩放给出。
     * @param vec vector to scale by
     */
    scale(vec) {
        const x = vec.x;
        const y = vec.y;
        this.m00 = x * this.m00;
        this.m01 = x * this.m01;
        this.m02 = x * this.m02;
        this.m03 = y * this.m03;
        this.m04 = y * this.m04;
        this.m05 = y * this.m05;
        this.m06 = this.m06;
        this.m07 = this.m07;
        this.m08 = this.m08;
        return this;
    }
    /**
     * @en Rotates the current matrix by the given angle.
     * @zh 将当前矩阵左乘旋转矩阵的结果赋值给当前矩阵，旋转矩阵由旋转轴和旋转角度给出。
     * @param rad radius of rotation
     */
    rotate(rad) {
        const a00 = this.m00;
        const a01 = this.m01;
        const a02 = this.m02;
        const a10 = this.m03;
        const a11 = this.m04;
        const a12 = this.m05;
        const a20 = this.m06;
        const a21 = this.m07;
        const a22 = this.m08;
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        this.m00 = c * a00 + s * a10;
        this.m01 = c * a01 + s * a11;
        this.m02 = c * a02 + s * a12;
        this.m03 = c * a10 - s * a00;
        this.m04 = c * a11 - s * a01;
        this.m05 = c * a12 - s * a02;
        this.m06 = a20;
        this.m07 = a21;
        this.m08 = a22;
        return this;
    }
    /**
     * @en Resets the current matrix from the given quaternion.
     * @zh 重置当前矩阵的值，使其表示指定四元数表示的旋转变换。
     * @param q The quaternion.
     * @returns this
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
        this.m03 = yx - wz;
        this.m06 = zx + wy;
        this.m01 = yx + wz;
        this.m04 = 1 - xx - zz;
        this.m07 = zy - wx;
        this.m02 = zx - wy;
        this.m05 = zy + wx;
        this.m08 = 1 - xx - yy;
        return this;
    }
}
exports.Mat3 = Mat3;
Mat3.IDENTITY = Object.freeze(new Mat3());
const v3_1 = new Vec3_1.Vec3();
const v3_2 = new Vec3_1.Vec3();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0My5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlscy9NYXRocy9NYXQzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7O0dBR0c7OztBQUlILG1DQUFrQztBQUNsQyxpQ0FBOEI7QUFFN0IsTUFBYSxJQUFJO0lBeW9CZCxZQUNJLE1BQXFCLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQ3hDLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUN6QixHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFFekIsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQzNELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUMzRCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDOUQ7YUFBTTtZQUNILElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMs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QUFDLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN0QyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDdEMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFDRCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVoQixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDekMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4QyxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsV0FBVyxDQUEwQixDQUFNO1FBQ3JELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4RCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRXhELE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFNO1FBQ3BFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4RCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRXhELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4RCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRXhELEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRTVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRTVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxZQUFZLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBWTtRQUM5RSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUV4RCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUV4RCxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUU1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUU1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsU0FBUyxDQUFxRCxHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQVU7UUFDcEcsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4RCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0IsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZCxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNkLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWQsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZCxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNkLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBcUQsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFVO1FBQ2hHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRXBCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRXBCLEdBQUcsQ0FBQyxHQUFHLEdBQUcs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QUFHLENBQUM7UUFDM0UsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMzRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRTNFLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWxDLDRCQUE0QjtRQUM1QixJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVoRixJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ04sT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWhCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRXBELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRXBELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRXBELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFRLEdBQVEsRUFBRSxDQUFZLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDeEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDckIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDckIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDckIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQTBCLEdBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDbkUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFNO1FBQy9ELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTTtRQUNwRSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQVM7UUFDN0UsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFD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LEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7ZUFDcEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7ZUFDcEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7ZUFDcEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7ZUFDcEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7ZUFDcEYsSUFBSSxDQUFD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LEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ2xEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBRSxLQUFXLEVBQUUsT0FBTyxHQUFHLGVBQU87UUFDekMsT0FBTyxDQUNILElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQy9GLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3hHLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxZQUFZLENBQUUsS0FBVztRQUM1QixPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRztlQUMxRSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUc7ZUFDMUUsSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDdEYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxRQUFRO1FBQ1gsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2YsT0FBTyxNQUNILENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUN6QixDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsTUFDMUIsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUk7Y0FDNUIsR0FBRyxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxRQUFRO1FBQ1gsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFNBQVM7UUFDWixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDakUsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDVCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDakUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2pFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUVqRSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbkMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWxDLDRCQUE0QjtRQUM1QixJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUU1QyxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEMsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWhCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxD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SUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxRQUFRLENBQUUsR0FBUztRQUN0QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDakUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2pFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUVqRSxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDOUQsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQzlELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUU5RCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUU3QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUU3QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcs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RSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVsQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOztBQTErQkosb0JBMitCQTtBQTErQmlCLGFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztBQTQrQnZELE1BQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7QUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKipcclxuICogQGVuIE1hdGhlbWF0aWNhbCAzeDMgbWF0cml4LlxyXG4gKiBAemgg6KGo56S65LiJ57u077yIM3gz77yJ55+p6Zi144CCXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgUXVhdCB9IGZyb20gXCIuL1F1YXRcIjtcclxuaW1wb3J0IHsgSU1hdDNMaWtlLCBJTWF0NExpa2UsIElWZWMzTGlrZSwgSVZlYzJMaWtlLCBJUXVhdExpa2UgfSBmcm9tIFwiLi90eXBlLWRlZmluZVwiO1xyXG5pbXBvcnQgeyBFUFNJTE9OIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgVmVjMyB9IGZyb20gXCIuL1ZlYzNcIjtcclxuXHJcbiBleHBvcnQgY2xhc3MgTWF0MyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIElERU5USVRZID0gT2JqZWN0LmZyZWV6ZShuZXcgTWF0MygpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDbG9uZSBhIG1hdHJpeCBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XHJcbiAgICAgKiBAemgg6I635b6X5oyH5a6a55+p6Zi155qE5ou36LSdXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xvbmUgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKGE6IE91dCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTWF0MyhcclxuICAgICAgICAgICAgYS5tMDAsIGEubTAxLCBhLm0wMixcclxuICAgICAgICAgICAgYS5tMDMsIGEubTA0LCBhLm0wNSxcclxuICAgICAgICAgICAgYS5tMDYsIGEubTA3LCBhLm0wOCxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENvcHkgY29udGVudCBvZiBhIG1hdHJpeCBpbnRvIGFub3RoZXIgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IG1hdHJpeFxyXG4gICAgICogQHpoIOWkjeWItuebruagh+efqemYtVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvcHkgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBvdXQubTAwID0gYS5tMDA7XHJcbiAgICAgICAgb3V0Lm0wMSA9IGEubTAxO1xyXG4gICAgICAgIG91dC5tMDIgPSBhLm0wMjtcclxuICAgICAgICBvdXQubTAzID0gYS5tMDM7XHJcbiAgICAgICAgb3V0Lm0wNCA9IGEubTA0O1xyXG4gICAgICAgIG91dC5tMDUgPSBhLm0wNTtcclxuICAgICAgICBvdXQubTA2ID0gYS5tMDY7XHJcbiAgICAgICAgb3V0Lm0wNyA9IGEubTA3O1xyXG4gICAgICAgIG91dC5tMDggPSBhLm0wODtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFNldHMgdGhlIGVsZW1lbnRzIG9mIGEgbWF0cml4IHdpdGggdGhlIGdpdmVuIHZhbHVlcyBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XHJcbiAgICAgKiBAemgg6K6+572u55+p6Zi15YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0IDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2U+ICAoXHJcbiAgICAgICAgb3V0OiBPdXQsXHJcbiAgICAgICAgbTAwOiBudW1iZXIsIG0wMTogbnVtYmVyLCBtMDI6IG51bWJlcixcclxuICAgICAgICBtMTA6IG51bWJlciwgbTExOiBudW1iZXIsIG0xMjogbnVtYmVyLFxyXG4gICAgICAgIG0yMDogbnVtYmVyLCBtMjE6IG51bWJlciwgbTIyOiBudW1iZXIsXHJcbiAgICApIHtcclxuICAgICAgICBvdXQubTAwID0gbTAwOyBvdXQubTAxID0gbTAxOyBvdXQubTAyID0gbTAyO1xyXG4gICAgICAgIG91dC5tMDMgPSBtMTA7IG91dC5tMDQgPSBtMTE7IG91dC5tMDUgPSBtMTI7XHJcbiAgICAgICAgb3V0Lm0wNiA9IG0yMDsgb3V0Lm0wNyA9IG0yMTsgb3V0Lm0wOCA9IG0yMjtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFJlc2V0IHRoZSBvdXQgbWF0cml4IHRvIGFuIGlkZW50aXR5IG1hdHJpeFxyXG4gICAgICogQHpoIOWwhuebruagh+i1i+WAvOS4uuWNleS9jeefqemYtVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGlkZW50aXR5IDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2U+IChvdXQ6IE91dCkge1xyXG4gICAgICAgIG91dC5tMDAgPSAxO1xyXG4gICAgICAgIG91dC5tMDEgPSAwO1xyXG4gICAgICAgIG91dC5tMDIgPSAwO1xyXG4gICAgICAgIG91dC5tMDMgPSAwO1xyXG4gICAgICAgIG91dC5tMDQgPSAxO1xyXG4gICAgICAgIG91dC5tMDUgPSAwO1xyXG4gICAgICAgIG91dC5tMDYgPSAwO1xyXG4gICAgICAgIG91dC5tMDcgPSAwO1xyXG4gICAgICAgIG91dC5tMDggPSAxO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVHJhbnNwb3NlcyBhIG1hdHJpeCBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XHJcbiAgICAgKiBAemgg6L2s572u55+p6Zi1XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdHJhbnNwb3NlIDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgLy8gSWYgd2UgYXJlIHRyYW5zcG9zaW5nIG91cnNlbHZlcyB3ZSBjYW4gc2tpcCBhIGZldyBzdGVwcyBidXQgaGF2ZSB0byBjYWNoZSBzb21lIHZhbHVlc1xyXG4gICAgICAgIGlmIChvdXQgPT09IGEpIHtcclxuICAgICAgICAgICAgY29uc3QgYTAxID0gYS5tMDE7XHJcbiAgICAgICAgICAgIGNvbnN0IGEwMiA9IGEubTAyO1xyXG4gICAgICAgICAgICBjb25zdCBhMTIgPSBhLm0wNTtcclxuICAgICAgICAgICAgb3V0Lm0wMSA9IGEubTAzO1xyXG4gICAgICAgICAgICBvdXQubTAyID0gYS5tMDY7XHJcbiAgICAgICAgICAgIG91dC5tMDMgPSBhMDE7XHJcbiAgICAgICAgICAgIG91dC5tMDUgPSBhLm0wNztcclxuICAgICAgICAgICAgb3V0Lm0wNiA9IGEwMjtcclxuICAgICAgICAgICAgb3V0Lm0wNyA9IGExMjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvdXQubTAwID0gYS5tMDA7XHJcbiAgICAgICAgICAgIG91dC5tMDEgPSBhLm0wMztcclxuICAgICAgICAgICAgb3V0Lm0wMiA9IGEubTA2O1xyXG4gICAgICAgICAgICBvdXQubTAzID0gYS5tMDE7XHJcbiAgICAgICAgICAgIG91dC5tMDQgPSBhLm0wNDtcclxuICAgICAgICAgICAgb3V0Lm0wNSA9IGEubTA3O1xyXG4gICAgICAgICAgICBvdXQubTA2ID0gYS5tMDI7XHJcbiAgICAgICAgICAgIG91dC5tMDcgPSBhLm0wNTtcclxuICAgICAgICAgICAgb3V0Lm0wOCA9IGEubTA4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBJbnZlcnRzIGEgbWF0cml4LiBXaGVuIG1hdHJpeCBpcyBub3QgaW52ZXJ0aWJsZSB0aGUgbWF0cml4IHdpbGwgYmUgc2V0IHRvIHplcm9zLlxyXG4gICAgICogQHpoIOefqemYteaxgumAhu+8jOazqOaEj++8jOWcqOefqemYteS4jeWPr+mAhuaXtu+8jOS8mui/lOWbnuS4gOS4quWFqOS4uiAwIOeahOefqemYteOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGludmVydCA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIGNvbnN0IGEwMCA9IGEubTAwOyBjb25zdCBhMDEgPSBhLm0wMTsgY29uc3QgYTAyID0gYS5tMDI7XHJcbiAgICAgICAgY29uc3QgYTEwID0gYS5tMDM7IGNvbnN0IGExMSA9IGEubTA0OyBjb25zdCBhMTIgPSBhLm0wNTtcclxuICAgICAgICBjb25zdCBhMjAgPSBhLm0wNjsgY29uc3QgYTIxID0gYS5tMDc7IGNvbnN0IGEyMiA9IGEubTA4O1xyXG5cclxuICAgICAgICBjb25zdCBiMDEgPSBhMjIgKiBhMTEgLSBhMTIgKiBhMjE7XHJcbiAgICAgICAgY29uc3QgYjExID0gLWEyMiAqIGExMCArIGExMiAqIGEyMDtcclxuICAgICAgICBjb25zdCBiMjEgPSBhMjEgKiBhMTAgLSBhMTEgKiBhMjA7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcclxuICAgICAgICBsZXQgZGV0ID0gYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxO1xyXG5cclxuICAgICAgICBpZiAoZGV0ID09PSAwKSB7XHJcbiAgICAgICAgICAgIG91dC5tMDAgPSAwOyBvdXQubTAxID0gMDsgb3V0Lm0wMiA9IDA7XHJcbiAgICAgICAgICAgIG91dC5tMDMgPSAwOyBvdXQubTA0ID0gMDsgb3V0Lm0wNSA9IDA7XHJcbiAgICAgICAgICAgIG91dC5tMDYgPSAwOyBvdXQubTA3ID0gMDsgb3V0Lm0wOCA9IDA7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRldCA9IDEuMCAvIGRldDtcclxuXHJcbiAgICAgICAgb3V0Lm0wMCA9IGIwMSAqIGRldDtcclxuICAgICAgICBvdXQubTAxID0gKC1hMjIgKiBhMDEgKyBhMDIgKiBhMjEpICogZGV0O1xyXG4gICAgICAgIG91dC5tMDIgPSAoYTEyICogYTAxIC0gYTAyICogYTExKSAqIGRldDtcclxuICAgICAgICBvdXQubTAzID0gYjExICogZGV0O1xyXG4gICAgICAgIG91dC5tMDQgPSAoYTIyICogYTAwIC0gYTAyICogYTIwKSAqIGRldDtcclxuICAgICAgICBvdXQubTA1ID0gKC1hMTIgKiBhMDAgKyBhMDIgKiBhMTApICogZGV0O1xyXG4gICAgICAgIG91dC5tMDYgPSBiMjEgKiBkZXQ7XHJcbiAgICAgICAgb3V0Lm0wNyA9ICgtYTIxICogYTAwICsgYTAxICogYTIwKSAqIGRldDtcclxuICAgICAgICBvdXQubTA4ID0gKGExMSAqIGEwMCAtIGEwMSAqIGExMCkgKiBkZXQ7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdHJpeFxyXG4gICAgICogQHpoIOefqemYteihjOWIl+W8j1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRldGVybWluYW50IDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2U+IChhOiBPdXQpIHtcclxuICAgICAgICBjb25zdCBhMDAgPSBhLm0wMDsgY29uc3QgYTAxID0gYS5tMDE7IGNvbnN0IGEwMiA9IGEubTAyO1xyXG4gICAgICAgIGNvbnN0IGExMCA9IGEubTAzOyBjb25zdCBhMTEgPSBhLm0wNDsgY29uc3QgYTEyID0gYS5tMDU7XHJcbiAgICAgICAgY29uc3QgYTIwID0gYS5tMDY7IGNvbnN0IGEyMSA9IGEubTA3OyBjb25zdCBhMjIgPSBhLm0wODtcclxuXHJcbiAgICAgICAgcmV0dXJuIGEwMCAqIChhMjIgKiBhMTEgLSBhMTIgKiBhMjEpICsgYTAxICogKC1hMjIgKiBhMTAgKyBhMTIgKiBhMjApICsgYTAyICogKGEyMSAqIGExMCAtIGExMSAqIGEyMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gTXVsdGlwbHkgdHdvIG1hdHJpY2VzIGV4cGxpY2l0bHkgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IG1hdHJpeFxyXG4gICAgICogQHpoIOefqemYteS5mOazlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG11bHRpcGx5IDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBjb25zdCBhMDAgPSBhLm0wMDsgY29uc3QgYTAxID0gYS5tMDE7IGNvbnN0IGEwMiA9IGEubTAyO1xyXG4gICAgICAgIGNvbnN0IGExMCA9IGEubTAzOyBjb25zdCBhMTEgPSBhLm0wNDsgY29uc3QgYTEyID0gYS5tMDU7XHJcbiAgICAgICAgY29uc3QgYTIwID0gYS5tMDY7IGNvbnN0IGEyMSA9IGEubTA3OyBjb25zdCBhMjIgPSBhLm0wODtcclxuXHJcbiAgICAgICAgY29uc3QgYjAwID0gYi5tMDA7IGNvbnN0IGIwMSA9IGIubTAxOyBjb25zdCBiMDIgPSBiLm0wMjtcclxuICAgICAgICBjb25zdCBiMTAgPSBiLm0wMzsgY29uc3QgYjExID0gYi5tMDQ7IGNvbnN0IGIxMiA9IGIubTA1O1xyXG4gICAgICAgIGNvbnN0IGIyMCA9IGIubTA2OyBjb25zdCBiMjEgPSBiLm0wNzsgY29uc3QgYjIyID0gYi5tMDg7XHJcblxyXG4gICAgICAgIG91dC5tMDAgPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjA7XHJcbiAgICAgICAgb3V0Lm0wMSA9IGIwMCAqIGEwMSArIGIwMSAqIGExMSArIGIwMiAqIGEyMTtcclxuICAgICAgICBvdXQubTAyID0gYjAwICogYTAyICsgYjAxICogYTEyICsgYjAyICogYTIyO1xyXG5cclxuICAgICAgICBvdXQubTAzID0gYjEwICogYTAwICsgYjExICogYTEwICsgYjEyICogYTIwO1xyXG4gICAgICAgIG91dC5tMDQgPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTEgKyBiMTIgKiBhMjE7XHJcbiAgICAgICAgb3V0Lm0wNSA9IGIxMCAqIGEwMiArIGIxMSAqIGExMiArIGIxMiAqIGEyMjtcclxuXHJcbiAgICAgICAgb3V0Lm0wNiA9IGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGIyMiAqIGEyMDtcclxuICAgICAgICBvdXQubTA3ID0gYjIwICogYTAxICsgYjIxICogYTExICsgYjIyICogYTIxO1xyXG4gICAgICAgIG91dC5tMDggPSBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjI7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBUYWtlIHRoZSBmaXJzdCB0aGlyZCBvcmRlciBvZiB0aGUgZm91cnRoIG9yZGVyIG1hdHJpeCBhbmQgbXVsdGlwbHkgYnkgdGhlIHRoaXJkIG9yZGVyIG1hdHJpeFxyXG4gICAgICogQHpoIOWPluWbm+mYtuefqemYteeahOWJjeS4iemYtu+8jOS4juS4iemYtuefqemYteebuOS5mFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG11bHRpcGx5TWF0NCA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogSU1hdDRMaWtlKSB7XHJcbiAgICAgICAgY29uc3QgYTAwID0gYS5tMDA7IGNvbnN0IGEwMSA9IGEubTAxOyBjb25zdCBhMDIgPSBhLm0wMjtcclxuICAgICAgICBjb25zdCBhMTAgPSBhLm0wMzsgY29uc3QgYTExID0gYS5tMDQ7IGNvbnN0IGExMiA9IGEubTA1O1xyXG4gICAgICAgIGNvbnN0IGEyMCA9IGEubTA2OyBjb25zdCBhMjEgPSBhLm0wNzsgY29uc3QgYTIyID0gYS5tMDg7XHJcblxyXG4gICAgICAgIGNvbnN0IGIwMCA9IGIubTAwOyBjb25zdCBiMDEgPSBiLm0wMTsgY29uc3QgYjAyID0gYi5tMDI7XHJcbiAgICAgICAgY29uc3QgYjEwID0gYi5tMDQ7IGNvbnN0IGIxMSA9IGIubTA1OyBjb25zdCBiMTIgPSBiLm0wNjtcclxuICAgICAgICBjb25zdCBiMjAgPSBiLm0wODsgY29uc3QgYjIxID0gYi5tMDk7IGNvbnN0IGIyMiA9IGIubTEwO1xyXG5cclxuICAgICAgICBvdXQubTAwID0gYjAwICogYTAwICsgYjAxICogYTEwICsgYjAyICogYTIwO1xyXG4gICAgICAgIG91dC5tMDEgPSBiMDAgKiBhMDEgKyBiMDEgKiBhMTEgKyBiMDIgKiBhMjE7XHJcbiAgICAgICAgb3V0Lm0wMiA9IGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMjtcclxuXHJcbiAgICAgICAgb3V0Lm0wMyA9IGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMDtcclxuICAgICAgICBvdXQubTA0ID0gYjEwICogYTAxICsgYjExICogYTExICsgYjEyICogYTIxO1xyXG4gICAgICAgIG91dC5tMDUgPSBiMTAgKiBhMDIgKyBiMTEgKiBhMTIgKyBiMTIgKiBhMjI7XHJcblxyXG4gICAgICAgIG91dC5tMDYgPSBiMjAgKiBhMDAgKyBiMjEgKiBhMTAgKyBiMjIgKiBhMjA7XHJcbiAgICAgICAgb3V0Lm0wNyA9IGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMTtcclxuICAgICAgICBvdXQubTA4ID0gYjIwICogYTAyICsgYjIxICogYTEyICsgYjIyICogYTIyO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gTXVsdGlwbHkgYSBtYXRyaXggd2l0aCBhIHRyYW5zbGF0aW9uIHZlY3RvciBnaXZlbiBieSBhIHRyYW5zbGF0aW9uIG9mZnNldC5cclxuICAgICAqIEB6aCDlnKjnu5nlrprnn6npmLXlj5jmjaLln7rnoYDkuIrliqDlhaXlj5jmjaJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2Zvcm0gPE91dCBleHRlbmRzIElNYXQzTGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHY6IFZlY0xpa2UpIHtcclxuICAgICAgICBjb25zdCBhMDAgPSBhLm0wMDsgY29uc3QgYTAxID0gYS5tMDE7IGNvbnN0IGEwMiA9IGEubTAyO1xyXG4gICAgICAgIGNvbnN0IGExMCA9IGEubTAzOyBjb25zdCBhMTEgPSBhLm0wNDsgY29uc3QgYTEyID0gYS5tMDU7XHJcbiAgICAgICAgY29uc3QgYTIwID0gYS5tMDY7IGNvbnN0IGEyMSA9IGEubTA3OyBjb25zdCBhMjIgPSBhLm0wODtcclxuICAgICAgICBjb25zdCB4ID0gdi54OyBjb25zdCB5ID0gdi55O1xyXG5cclxuICAgICAgICBvdXQubTAwID0gYTAwO1xyXG4gICAgICAgIG91dC5tMDEgPSBhMDE7XHJcbiAgICAgICAgb3V0Lm0wMiA9IGEwMjtcclxuXHJcbiAgICAgICAgb3V0Lm0wMyA9IGExMDtcclxuICAgICAgICBvdXQubTA0ID0gYTExO1xyXG4gICAgICAgIG91dC5tMDUgPSBhMTI7XHJcblxyXG4gICAgICAgIG91dC5tMDYgPSB4ICogYTAwICsgeSAqIGExMCArIGEyMDtcclxuICAgICAgICBvdXQubTA3ID0geCAqIGEwMSArIHkgKiBhMTEgKyBhMjE7XHJcbiAgICAgICAgb3V0Lm0wOCA9IHggKiBhMDIgKyB5ICogYTEyICsgYTIyO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gTXVsdGlwbHkgYSBtYXRyaXggd2l0aCBhIHNjYWxlIG1hdHJpeCBnaXZlbiBieSBhIHNjYWxlIHZlY3RvciBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XHJcbiAgICAgKiBAemgg5Zyo57uZ5a6a55+p6Zi15Y+Y5o2i5Z+656GA5LiK5Yqg5YWl5paw57yp5pS+5Y+Y5o2iXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2NhbGUgPE91dCBleHRlbmRzIElNYXQzTGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHY6IFZlY0xpa2UpIHtcclxuICAgICAgICBjb25zdCB4ID0gdi54OyBjb25zdCB5ID0gdi55O1xyXG5cclxuICAgICAgICBvdXQubTAwID0geCAqIGEubTAwO1xyXG4gICAgICAgIG91dC5tMDEgPSB4ICogYS5tMDE7XHJcbiAgICAgICAgb3V0Lm0wMiA9IHggKiBhLm0wMjtcclxuXHJcbiAgICAgICAgb3V0Lm0wMyA9IHkgKiBhLm0wMztcclxuICAgICAgICBvdXQubTA0ID0geSAqIGEubTA0O1xyXG4gICAgICAgIG91dC5tMDUgPSB5ICogYS5tMDU7XHJcblxyXG4gICAgICAgIG91dC5tMDYgPSBhLm0wNjtcclxuICAgICAgICBvdXQubTA3ID0gYS5tMDc7XHJcbiAgICAgICAgb3V0Lm0wOCA9IGEubTA4O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gUm90YXRlcyB0aGUgdHJhbnNmb3JtIGJ5IHRoZSBnaXZlbiBhbmdsZSBhbmQgc2F2ZSB0aGUgcmVzdWx0cyBpbnRvIHRoZSBvdXQgbWF0cml4XHJcbiAgICAgKiBAemgg5Zyo57uZ5a6a55+p6Zi15Y+Y5o2i5Z+656GA5LiK5Yqg5YWl5paw5peL6L2s5Y+Y5o2iXHJcbiAgICAgKiBAcGFyYW0gcmFkIHJhZGl1cyBvZiByb3RhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJvdGF0ZSA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBhMDAgPSBhLm0wMDsgY29uc3QgYTAxID0gYS5tMDE7IGNvbnN0IGEwMiA9IGEubTAyO1xyXG4gICAgICAgIGNvbnN0IGExMCA9IGEubTAzOyBjb25zdCBhMTEgPSBhLm0wNDsgY29uc3QgYTEyID0gYS5tMDU7XHJcbiAgICAgICAgY29uc3QgYTIwID0gYS5tMDY7IGNvbnN0IGEyMSA9IGEubTA3OyBjb25zdCBhMjIgPSBhLm0wODtcclxuXHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7XHJcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKHJhZCk7XHJcblxyXG4gICAgICAgIG91dC5tMDAgPSBjICogYTAwICsgcyAqIGExMDtcclxuICAgICAgICBvdXQubTAxID0gYyAqIGEwMSArIHMgKiBhMTE7XHJcbiAgICAgICAgb3V0Lm0wMiA9IGMgKiBhMDIgKyBzICogYTEyO1xyXG5cclxuICAgICAgICBvdXQubTAzID0gYyAqIGExMCAtIHMgKiBhMDA7XHJcbiAgICAgICAgb3V0Lm0wNCA9IGMgKiBhMTEgLSBzICogYTAxO1xyXG4gICAgICAgIG91dC5tMDUgPSBjICogYTEyIC0gcyAqIGEwMjtcclxuXHJcbiAgICAgICAgb3V0Lm0wNiA9IGEyMDtcclxuICAgICAgICBvdXQubTA3ID0gYTIxO1xyXG4gICAgICAgIG91dC5tMDggPSBhMjI7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDb3BpZXMgdGhlIGZpcnN0IHRoaXJkIG9yZGVyIG1hdHJpeCBvZiBhIGZvdXJ0aCBvcmRlciBtYXRyaXggdG8gdGhlIG91dCB0aGlyZCBvcmRlciBtYXRyaXhcclxuICAgICAqIEB6aCDlj5blm5vpmLbnn6npmLXnmoTliY3kuInpmLZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tTWF0NCA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGE6IElNYXQ0TGlrZSkge1xyXG4gICAgICAgIG91dC5tMDAgPSBhLm0wMDtcclxuICAgICAgICBvdXQubTAxID0gYS5tMDE7XHJcbiAgICAgICAgb3V0Lm0wMiA9IGEubTAyO1xyXG4gICAgICAgIG91dC5tMDMgPSBhLm0wNDtcclxuICAgICAgICBvdXQubTA0ID0gYS5tMDU7XHJcbiAgICAgICAgb3V0Lm0wNSA9IGEubTA2O1xyXG4gICAgICAgIG91dC5tMDYgPSBhLm0wODtcclxuICAgICAgICBvdXQubTA3ID0gYS5tMDk7XHJcbiAgICAgICAgb3V0Lm0wOCA9IGEubTEwO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0cyBhIHRoaXJkIG9yZGVyIG1hdHJpeCB3aXRoIHZpZXcgZGlyZWN0aW9uIGFuZCB1cCBkaXJlY3Rpb24uIFRoZW4gc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XHJcbiAgICAgKiBAemgg5qC55o2u6KeG5Y+j5YmN5pa55ZCR5ZKM5LiK5pa55ZCR6K6h566X55+p6Zi1XHJcbiAgICAgKiBAcGFyYW0gdmlldyBUaGUgdmlldyBkaXJlY3Rpb24sIGl0YHMgbXVzdCBiZSBub3JtYWxpemVkLlxyXG4gICAgICogQHBhcmFtIHVwIFRoZSB2aWV3IHVwIGRpcmVjdGlvbiwgaXRgcyBtdXN0IGJlIG5vcm1hbGl6ZWQsIGRlZmF1bHQgdmFsdWUgaXMgKDAsIDEsIDApLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21WaWV3VXAgPE91dCBleHRlbmRzIElNYXQzTGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCB2aWV3OiBWZWNMaWtlLCB1cD86IFZlYzMpIHtcclxuICAgICAgICBpZiAoVmVjMy5sZW5ndGhTcXIodmlldykgPCBFUFNJTE9OICogRVBTSUxPTikge1xyXG4gICAgICAgICAgICBNYXQzLmlkZW50aXR5KG91dCk7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cCA9IHVwIHx8IFZlYzMuVU5JVF9ZO1xyXG4gICAgICAgIFZlYzMubm9ybWFsaXplKHYzXzEsIFZlYzMuY3Jvc3ModjNfMSwgdXAsIHZpZXcpKTtcclxuXHJcbiAgICAgICAgaWYgKFZlYzMubGVuZ3RoU3FyKHYzXzEpIDwgRVBTSUxPTiAqIEVQU0lMT04pIHtcclxuICAgICAgICAgICAgTWF0My5pZGVudGl0eShvdXQpO1xyXG4gICAgICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVmVjMy5jcm9zcyh2M18yLCB2aWV3LCB2M18xKTtcclxuICAgICAgICBNYXQzLnNldChcclxuICAgICAgICAgICAgb3V0LFxyXG4gICAgICAgICAgICB2M18xLngsIHYzXzEueSwgdjNfMS56LFxyXG4gICAgICAgICAgICB2M18yLngsIHYzXzIueSwgdjNfMi56LFxyXG4gICAgICAgICAgICB2aWV3LngsIHZpZXcueSwgdmlldy56LFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0cyB0aGUgZ2l2ZW4gbWF0cml4IHdpdGggYSB0cmFuc2xhdGlvbiB2ZWN0b3IgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IG1hdHJpeFxyXG4gICAgICogQHpoIOiuoeeul+S9jeenu+efqemYtVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21UcmFuc2xhdGlvbiA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIHY6IFZlY0xpa2UpIHtcclxuICAgICAgICBvdXQubTAwID0gMTtcclxuICAgICAgICBvdXQubTAxID0gMDtcclxuICAgICAgICBvdXQubTAyID0gMDtcclxuICAgICAgICBvdXQubTAzID0gMDtcclxuICAgICAgICBvdXQubTA0ID0gMTtcclxuICAgICAgICBvdXQubTA1ID0gMDtcclxuICAgICAgICBvdXQubTA2ID0gdi54O1xyXG4gICAgICAgIG91dC5tMDcgPSB2Lnk7XHJcbiAgICAgICAgb3V0Lm0wOCA9IDE7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIHRoZSBnaXZlbiBtYXRyaXggd2l0aCBhIHNjYWxlIHZlY3RvciBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XHJcbiAgICAgKiBAemgg6K6h566X57yp5pS+55+p6Zi1XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVNjYWxpbmcgPE91dCBleHRlbmRzIElNYXQzTGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCB2OiBWZWNMaWtlKSB7XHJcbiAgICAgICAgb3V0Lm0wMCA9IHYueDtcclxuICAgICAgICBvdXQubTAxID0gMDtcclxuICAgICAgICBvdXQubTAyID0gMDtcclxuXHJcbiAgICAgICAgb3V0Lm0wMyA9IDA7XHJcbiAgICAgICAgb3V0Lm0wNCA9IHYueTtcclxuICAgICAgICBvdXQubTA1ID0gMDtcclxuXHJcbiAgICAgICAgb3V0Lm0wNiA9IDA7XHJcbiAgICAgICAgb3V0Lm0wNyA9IDA7XHJcbiAgICAgICAgb3V0Lm0wOCA9IDE7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIHRoZSBnaXZlbiBtYXRyaXggd2l0aCBhIGdpdmVuIGFuZ2xlIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXhcclxuICAgICAqIEB6aCDorqHnrpfml4vovaznn6npmLVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tUm90YXRpb24gPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCByYWQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQpOyBjb25zdCBjID0gTWF0aC5jb3MocmFkKTtcclxuXHJcbiAgICAgICAgb3V0Lm0wMCA9IGM7XHJcbiAgICAgICAgb3V0Lm0wMSA9IHM7XHJcbiAgICAgICAgb3V0Lm0wMiA9IDA7XHJcblxyXG4gICAgICAgIG91dC5tMDMgPSAtcztcclxuICAgICAgICBvdXQubTA0ID0gYztcclxuICAgICAgICBvdXQubTA1ID0gMDtcclxuXHJcbiAgICAgICAgb3V0Lm0wNiA9IDA7XHJcbiAgICAgICAgb3V0Lm0wNyA9IDA7XHJcbiAgICAgICAgb3V0Lm0wOCA9IDE7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIHRoZSBnaXZlbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gcXVhdGVybmlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XHJcbiAgICAgKiBAemgg5qC55o2u5Zub5YWD5pWw5peL6L2s5L+h5oGv6K6h566X55+p6Zi1XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVF1YXQgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCBxOiBJUXVhdExpa2UpIHtcclxuICAgICAgICBjb25zdCB4ID0gcS54OyBjb25zdCB5ID0gcS55OyBjb25zdCB6ID0gcS56OyBjb25zdCB3ID0gcS53O1xyXG4gICAgICAgIGNvbnN0IHgyID0geCArIHg7XHJcbiAgICAgICAgY29uc3QgeTIgPSB5ICsgeTtcclxuICAgICAgICBjb25zdCB6MiA9IHogKyB6O1xyXG5cclxuICAgICAgICBjb25zdCB4eCA9IHggKiB4MjtcclxuICAgICAgICBjb25zdCB5eCA9IHkgKiB4MjtcclxuICAgICAgICBjb25zdCB5eSA9IHkgKiB5MjtcclxuICAgICAgICBjb25zdCB6eCA9IHogKiB4MjtcclxuICAgICAgICBjb25zdCB6eSA9IHogKiB5MjtcclxuICAgICAgICBjb25zdCB6eiA9IHogKiB6MjtcclxuICAgICAgICBjb25zdCB3eCA9IHcgKiB4MjtcclxuICAgICAgICBjb25zdCB3eSA9IHcgKiB5MjtcclxuICAgICAgICBjb25zdCB3eiA9IHcgKiB6MjtcclxuXHJcbiAgICAgICAgb3V0Lm0wMCA9IDEgLSB5eSAtIHp6O1xyXG4gICAgICAgIG91dC5tMDMgPSB5eCAtIHd6O1xyXG4gICAgICAgIG91dC5tMDYgPSB6eCArIHd5O1xyXG5cclxuICAgICAgICBvdXQubTAxID0geXggKyB3ejtcclxuICAgICAgICBvdXQubTA0ID0gMSAtIHh4IC0geno7XHJcbiAgICAgICAgb3V0Lm0wNyA9IHp5IC0gd3g7XHJcblxyXG4gICAgICAgIG91dC5tMDIgPSB6eCAtIHd5O1xyXG4gICAgICAgIG91dC5tMDUgPSB6eSArIHd4O1xyXG4gICAgICAgIG91dC5tMDggPSAxIC0geHggLSB5eTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSB1cHBlci1sZWZ0IDN4MyBtYXRyaXggb2YgYSA0eDQgbWF0cml4J3MgaW52ZXJzZSB0cmFuc3Bvc2VcclxuICAgICAqIEB6aCDorqHnrpfmjIflrprlm5vnu7Tnn6npmLXnmoTpgIbovaznva7kuInnu7Tnn6npmLVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnZlcnNlVHJhbnNwb3NlTWF0NCA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGE6IElNYXQ0TGlrZSkge1xyXG4gICAgICAgIGNvbnN0IGEwMCA9IGEubTAwOyBjb25zdCBhMDEgPSBhLm0wMTsgY29uc3QgYTAyID0gYS5tMDI7IGNvbnN0IGEwMyA9IGEubTAzO1xyXG4gICAgICAgIGNvbnN0IGExMCA9IGEubTA0OyBjb25zdCBhMTEgPSBhLm0wNTsgY29uc3QgYTEyID0gYS5tMDY7IGNvbnN0IGExMyA9IGEubTA3O1xyXG4gICAgICAgIGNvbnN0IGEyMCA9IGEubTA4OyBjb25zdCBhMjEgPSBhLm0wOTsgY29uc3QgYTIyID0gYS5tMTA7IGNvbnN0IGEyMyA9IGEubTExO1xyXG4gICAgICAgIGNvbnN0IGEzMCA9IGEubTEyOyBjb25zdCBhMzEgPSBhLm0xMzsgY29uc3QgYTMyID0gYS5tMTQ7IGNvbnN0IGEzMyA9IGEubTE1O1xyXG5cclxuICAgICAgICBjb25zdCBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XHJcbiAgICAgICAgY29uc3QgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwO1xyXG4gICAgICAgIGNvbnN0IGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcclxuICAgICAgICBjb25zdCBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XHJcbiAgICAgICAgY29uc3QgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExO1xyXG4gICAgICAgIGNvbnN0IGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcclxuICAgICAgICBjb25zdCBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XHJcbiAgICAgICAgY29uc3QgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwO1xyXG4gICAgICAgIGNvbnN0IGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcclxuICAgICAgICBjb25zdCBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzE7XHJcbiAgICAgICAgY29uc3QgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxO1xyXG4gICAgICAgIGNvbnN0IGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxyXG4gICAgICAgIGxldCBkZXQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XHJcblxyXG4gICAgICAgIGlmICghZGV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZXQgPSAxLjAgLyBkZXQ7XHJcblxyXG4gICAgICAgIG91dC5tMDAgPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcclxuICAgICAgICBvdXQubTAxID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XHJcbiAgICAgICAgb3V0Lm0wMiA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xyXG5cclxuICAgICAgICBvdXQubTAzID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XHJcbiAgICAgICAgb3V0Lm0wNCA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xyXG4gICAgICAgIG91dC5tMDUgPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcclxuXHJcbiAgICAgICAgb3V0Lm0wNiA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xyXG4gICAgICAgIG91dC5tMDcgPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcclxuICAgICAgICBvdXQubTA4ID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVHJhbnNmb3JtIGEgbWF0cml4IG9iamVjdCB0byBhIGZsYXQgYXJyYXlcclxuICAgICAqIEB6aCDnn6npmLXovazmlbDnu4RcclxuICAgICAqIEBwYXJhbSBvZnMgQXJyYXkgU3RhcnQgT2Zmc2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdG9BcnJheSA8T3V0PiAob3V0OiBPdXQsIG06IElNYXQzTGlrZSwgb2ZzID0gMCkge1xyXG4gICAgICAgIG91dFtvZnMgKyAwXSA9IG0ubTAwO1xyXG4gICAgICAgIG91dFtvZnMgKyAxXSA9IG0ubTAxO1xyXG4gICAgICAgIG91dFtvZnMgKyAyXSA9IG0ubTAyO1xyXG4gICAgICAgIG91dFtvZnMgKyAzXSA9IG0ubTAzO1xyXG4gICAgICAgIG91dFtvZnMgKyA0XSA9IG0ubTA0O1xyXG4gICAgICAgIG91dFtvZnMgKyA1XSA9IG0ubTA1O1xyXG4gICAgICAgIG91dFtvZnMgKyA2XSA9IG0ubTA2O1xyXG4gICAgICAgIG91dFtvZnMgKyA3XSA9IG0ubTA3O1xyXG4gICAgICAgIG91dFtvZnMgKyA4XSA9IG0ubTA4O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gR2VuZXJhdGVzIG9yIHNldHMgYSBtYXRyaXggd2l0aCBhIGZsYXQgYXJyYXlcclxuICAgICAqIEB6aCDmlbDnu4Tovaznn6npmLVcclxuICAgICAqIEBwYXJhbSBvZnMgQXJyYXkgU3RhcnQgT2Zmc2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbUFycmF5IDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2U+IChvdXQ6IE91dCwgYXJyLCBvZnMgPSAwKSB7XHJcbiAgICAgICAgb3V0Lm0wMCA9IGFycltvZnMgKyAwXTtcclxuICAgICAgICBvdXQubTAxID0gYXJyW29mcyArIDFdO1xyXG4gICAgICAgIG91dC5tMDIgPSBhcnJbb2ZzICsgMl07XHJcbiAgICAgICAgb3V0Lm0wMyA9IGFycltvZnMgKyAzXTtcclxuICAgICAgICBvdXQubTA0ID0gYXJyW29mcyArIDRdO1xyXG4gICAgICAgIG91dC5tMDUgPSBhcnJbb2ZzICsgNV07XHJcbiAgICAgICAgb3V0Lm0wNiA9IGFycltvZnMgKyA2XTtcclxuICAgICAgICBvdXQubTA3ID0gYXJyW29mcyArIDddO1xyXG4gICAgICAgIG91dC5tMDggPSBhcnJbb2ZzICsgOF07XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBBZGRzIHR3byBtYXRyaWNlcyBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg55+p6Zi15Yqg5rOVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkIDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBvdXQubTAwID0gYS5tMDAgKyBiLm0wMDtcclxuICAgICAgICBvdXQubTAxID0gYS5tMDEgKyBiLm0wMTtcclxuICAgICAgICBvdXQubTAyID0gYS5tMDIgKyBiLm0wMjtcclxuICAgICAgICBvdXQubTAzID0gYS5tMDMgKyBiLm0wMztcclxuICAgICAgICBvdXQubTA0ID0gYS5tMDQgKyBiLm0wNDtcclxuICAgICAgICBvdXQubTA1ID0gYS5tMDUgKyBiLm0wNTtcclxuICAgICAgICBvdXQubTA2ID0gYS5tMDYgKyBiLm0wNjtcclxuICAgICAgICBvdXQubTA3ID0gYS5tMDcgKyBiLm0wNztcclxuICAgICAgICBvdXQubTA4ID0gYS5tMDggKyBiLm0wODtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFN1YnRyYWN0cyBtYXRyaXggYiBmcm9tIG1hdHJpeCBhIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXhcclxuICAgICAqIEB6aCDpgJDlhYPntKDnn6npmLXlh4/ms5VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzdWJ0cmFjdCA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgb3V0Lm0wMCA9IGEubTAwIC0gYi5tMDA7XHJcbiAgICAgICAgb3V0Lm0wMSA9IGEubTAxIC0gYi5tMDE7XHJcbiAgICAgICAgb3V0Lm0wMiA9IGEubTAyIC0gYi5tMDI7XHJcbiAgICAgICAgb3V0Lm0wMyA9IGEubTAzIC0gYi5tMDM7XHJcbiAgICAgICAgb3V0Lm0wNCA9IGEubTA0IC0gYi5tMDQ7XHJcbiAgICAgICAgb3V0Lm0wNSA9IGEubTA1IC0gYi5tMDU7XHJcbiAgICAgICAgb3V0Lm0wNiA9IGEubTA2IC0gYi5tMDY7XHJcbiAgICAgICAgb3V0Lm0wNyA9IGEubTA3IC0gYi5tMDc7XHJcbiAgICAgICAgb3V0Lm0wOCA9IGEubTA4IC0gYi5tMDg7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBNdWx0aXBseSBlYWNoIGVsZW1lbnQgb2YgYSBtYXRyaXggYnkgYSBzY2FsYXIgbnVtYmVyIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXhcclxuICAgICAqIEB6aCDnn6npmLXmoIfph4/kuZjms5VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtdWx0aXBseVNjYWxhciA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogbnVtYmVyKSB7XHJcbiAgICAgICAgb3V0Lm0wMCA9IGEubTAwICogYjtcclxuICAgICAgICBvdXQubTAxID0gYS5tMDEgKiBiO1xyXG4gICAgICAgIG91dC5tMDIgPSBhLm0wMiAqIGI7XHJcbiAgICAgICAgb3V0Lm0wMyA9IGEubTAzICogYjtcclxuICAgICAgICBvdXQubTA0ID0gYS5tMDQgKiBiO1xyXG4gICAgICAgIG91dC5tMDUgPSBhLm0wNSAqIGI7XHJcbiAgICAgICAgb3V0Lm0wNiA9IGEubTA2ICogYjtcclxuICAgICAgICBvdXQubTA3ID0gYS5tMDcgKiBiO1xyXG4gICAgICAgIG91dC5tMDggPSBhLm0wOCAqIGI7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBBZGRzIHR3byBtYXRyaWNlcyBhZnRlciBtdWx0aXBseWluZyBlYWNoIGVsZW1lbnQgb2YgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIG51bWJlci4gQW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IG1hdHJpeC5cclxuICAgICAqIEB6aCDpgJDlhYPntKDnn6npmLXmoIfph4/kuZjliqA6IEEgKyBCICogc2NhbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtdWx0aXBseVNjYWxhckFuZEFkZCA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCBzY2FsZTogbnVtYmVyKSB7XHJcbiAgICAgICAgb3V0Lm0wMCA9IGIubTAwICogc2NhbGUgKyBhLm0wMDtcclxuICAgICAgICBvdXQubTAxID0gYi5tMDEgKiBzY2FsZSArIGEubTAxO1xyXG4gICAgICAgIG91dC5tMDIgPSBiLm0wMiAqIHNjYWxlICsgYS5tMDI7XHJcbiAgICAgICAgb3V0Lm0wMyA9IGIubTAzICogc2NhbGUgKyBhLm0wMztcclxuICAgICAgICBvdXQubTA0ID0gYi5tMDQgKiBzY2FsZSArIGEubTA0O1xyXG4gICAgICAgIG91dC5tMDUgPSBiLm0wNSAqIHNjYWxlICsgYS5tMDU7XHJcbiAgICAgICAgb3V0Lm0wNiA9IGIubTA2ICogc2NhbGUgKyBhLm0wNjtcclxuICAgICAgICBvdXQubTA3ID0gYi5tMDcgKiBzY2FsZSArIGEubTA3O1xyXG4gICAgICAgIG91dC5tMDggPSBiLm0wOCAqIHNjYWxlICsgYS5tMDg7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBSZXR1cm5zIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBtYXRyaWNlcyBhcmUgZXF1YWwuXHJcbiAgICAgKiBAemgg55+p6Zi1562J5Lu35Yik5patXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3RyaWN0RXF1YWxzIDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2U+IChhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIHJldHVybiBhLm0wMCA9PT0gYi5tMDAgJiYgYS5tMDEgPT09IGIubTAxICYmIGEubTAyID09PSBiLm0wMlxyXG4gICAgICAgICAgICAmJiBhLm0wMyA9PT0gYi5tMDMgJiYgYS5tMDQgPT09IGIubTA0ICYmIGEubTA1ID09PSBiLm0wNVxyXG4gICAgICAgICAgICAmJiBhLm0wNiA9PT0gYi5tMDYgJiYgYS5tMDcgPT09IGIubTA3ICYmIGEubTA4ID09PSBiLm0wODtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBSZXR1cm5zIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBtYXRyaWNlcyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbC5cclxuICAgICAqIEB6aCDmjpLpmaTmta7ngrnmlbDor6/lt67nmoTnn6npmLXov5HkvLznrYnku7fliKTmlq1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBlcXVhbHMgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uID0gRVBTSUxPTikge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIE1hdGguYWJzKGEubTAwIC0gYi5tMDApIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTAwKSwgTWF0aC5hYnMoYi5tMDApKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0wMSAtIGIubTAxKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0wMSksIE1hdGguYWJzKGIubTAxKSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5tMDIgLSBiLm0wMikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMDIpLCBNYXRoLmFicyhiLm0wMikpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEubTAzIC0gYi5tMDMpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTAzKSwgTWF0aC5hYnMoYi5tMDMpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0wNCAtIGIubTA0KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0wNCksIE1hdGguYWJzKGIubTA0KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5tMDUgLSBiLm0wNSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMDUpLCBNYXRoLmFicyhiLm0wNSkpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEubTA2IC0gYi5tMDYpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTA2KSwgTWF0aC5hYnMoYi5tMDYpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0wNyAtIGIubTA3KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0wNyksIE1hdGguYWJzKGIubTA3KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5tMDggLSBiLm0wOCkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMDgpLCBNYXRoLmFicyhiLm0wOCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMCByb3cgMCBvZiB0aGUgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteesrCAwIOWIl+esrCAwIOihjOeahOWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjbGFyZSBtMDA6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMCByb3cgMSBvZiB0aGUgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteesrCAwIOWIl+esrCAxIOihjOeahOWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjbGFyZSBtMDE6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMCByb3cgMiBvZiB0aGUgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteesrCAwIOWIl+esrCAyIOihjOeahOWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjbGFyZSBtMDI6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMSByb3cgMCBvZiB0aGUgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteesrCAxIOWIl+esrCAwIOihjOeahOWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjbGFyZSBtMDM6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMSByb3cgMSBvZiB0aGUgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteesrCAxIOWIl+esrCAxIOihjOeahOWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjbGFyZSBtMDQ6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMSByb3cgMiBvZiB0aGUgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteesrCAxIOWIl+esrCAyIOihjOeahOWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjbGFyZSBtMDU6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMiByb3cgMCBvZiB0aGUgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteesrCAyIOWIl+esrCAwIOihjOeahOWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjbGFyZSBtMDY6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMiByb3cgMSBvZiB0aGUgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteesrCAyIOWIl+esrCAxIOihjOeahOWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjbGFyZSBtMDc6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMiByb3cgMiBvZiB0aGUgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteesrCAyIOWIl+esrCAyIOihjOeahOWFg+e0oOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjbGFyZSBtMDg6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAob3RoZXI6IE1hdDMpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChcclxuICAgICAgICBtMDA/OiBudW1iZXIsIG0wMT86IG51bWJlciwgbTAyPzogbnVtYmVyLFxyXG4gICAgICAgIG0wMz86IG51bWJlciwgbTA0PzogbnVtYmVyLCBtMDU/OiBudW1iZXIsXHJcbiAgICAgICAgbTA2PzogbnVtYmVyLCBtMDc/OiBudW1iZXIsIG0wOD86IG51bWJlcik7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKFxyXG4gICAgICAgIG0wMDogbnVtYmVyIHwgTWF0MyA9IDEsIG0wMSA9IDAsIG0wMiA9IDAsXHJcbiAgICAgICAgbTAzID0gMCwgbTA0ID0gMSwgbTA1ID0gMCxcclxuICAgICAgICBtMDYgPSAwLCBtMDcgPSAwLCBtMDggPSAxLFxyXG4gICAgKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBtMDAgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubTAwID0gbTAwLm0wMDsgdGhpcy5tMDEgPSBtMDAubTAxOyB0aGlzLm0wMiA9IG0wMC5tMDI7XHJcbiAgICAgICAgICAgIHRoaXMubTAzID0gbTAwLm0wMzsgdGhpcy5tMDQgPSBtMDAubTA0OyB0aGlzLm0wNSA9IG0wMC5tMDU7XHJcbiAgICAgICAgICAgIHRoaXMubTA2ID0gbTAwLm0wNjsgdGhpcy5tMDcgPSBtMDAubTA3OyB0aGlzLm0wOCA9IG0wMC5tMDg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tMDAgPSBtMDA7IHRoaXMubTAxID0gbTAxOyB0aGlzLm0wMiA9IG0wMjtcclxuICAgICAgICAgICAgdGhpcy5tMDMgPSBtMDM7IHRoaXMubTA0ID0gbTA0OyB0aGlzLm0wNSA9IG0wNTtcclxuICAgICAgICAgICAgdGhpcy5tMDYgPSBtMDY7IHRoaXMubTA3ID0gbTA3OyB0aGlzLm0wOCA9IG0wODtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2xvbmUgYSBuZXcgbWF0cml4IGZyb20gdGhlIGN1cnJlbnQgbWF0cml4LlxyXG4gICAgICogQHpoIOWFi+mahuW9k+WJjeefqemYteOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvbmUgKCkge1xyXG4gICAgICAgIGNvbnN0IHQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgTWF0MyhcclxuICAgICAgICAgICAgdC5tMDAsIHQubTAxLCB0Lm0wMixcclxuICAgICAgICAgICAgdC5tMDMsIHQubTA0LCB0Lm0wNSxcclxuICAgICAgICAgICAgdC5tMDYsIHQubTA3LCB0Lm0wOCxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFNldHMgdGhlIG1hdHJpeCB3aXRoIGFub3RoZXIgb25lJ3MgdmFsdWUuXHJcbiAgICAgKiBAemgg6K6+572u5b2T5YmN55+p6Zi15L2/5YW25LiO5oyH5a6a55+p6Zi155u4562J44CCXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgU3BlY2lmaWVkIG1hdHJpeFxyXG4gICAgICogQHJldHVybiB0aGlzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgKG90aGVyOiBNYXQzKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXQgdGhlIG1hdHJpeCB3aXRoIHZhbHVlcyBvZiBhbGwgZWxlbWVudHNcclxuICAgICAqIEB6aCDorr7nva7lvZPliY3nn6npmLXmjIflrprlhYPntKDlgLzjgIJcclxuICAgICAqIEByZXR1cm4gdGhpc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IChtMDA/OiBudW1iZXIsIG0wMT86IG51bWJlciwgbTAyPzogbnVtYmVyLFxyXG4gICAgICAgIG0wMz86IG51bWJlciwgbTA0PzogbnVtYmVyLCBtMDU/OiBudW1iZXIsXHJcbiAgICAgICAgbTA2PzogbnVtYmVyLCBtMDc/OiBudW1iZXIsIG0wOD86IG51bWJlcik7XHJcblxyXG4gICAgcHVibGljIHNldCAobTAwOiBudW1iZXIgfCBNYXQzID0gMSwgbTAxID0gMCwgbTAyID0gMCxcclxuICAgICAgICBtMDMgPSAwLCBtMDQgPSAxLCBtMDUgPSAwLFxyXG4gICAgICAgIG0wNiA9IDAsIG0wNyA9IDAsIG0wOCA9IDEpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG0wMCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgdGhpcy5tMDAgPSBtMDAubTAwOyB0aGlzLm0wMSA9IG0wMC5tMDE7IHRoaXMubTAyID0gbTAwLm0wMjtcclxuICAgICAgICAgICAgdGhpcy5tMDMgPSBtMDAubTAzOyB0aGlzLm0wNCA9IG0wMC5tMDQ7IHRoaXMubTA1ID0gbTAwLm0wNTtcclxuICAgICAgICAgICAgdGhpcy5tMDYgPSBtMDAubTA2OyB0aGlzLm0wNyA9IG0wMC5tMDc7IHRoaXMubTA4ID0gbTAwLm0wODtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm0wMCA9IG0wMDsgdGhpcy5tMDEgPSBtMDE7IHRoaXMubTAyID0gbTAyO1xyXG4gICAgICAgICAgICB0aGlzLm0wMyA9IG0wMzsgdGhpcy5tMDQgPSBtMDQ7IHRoaXMubTA1ID0gbTA1O1xyXG4gICAgICAgICAgICB0aGlzLm0wNiA9IG0wNjsgdGhpcy5tMDcgPSBtMDc7IHRoaXMubTA4ID0gbTA4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBSZXR1cm5zIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBtYXRyaWNlcyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbC5cclxuICAgICAqIEB6aCDliKTmlq3lvZPliY3nn6npmLXmmK/lkKblnKjor6/lt67ojIPlm7TlhoXkuI7mjIflrprnn6npmLXnm7jnrYnjgIJcclxuICAgICAqIEBwYXJhbSBvdGhlciBDb21wYXJhdGl2ZSBtYXRyaXhcclxuICAgICAqIEBwYXJhbSBlcHNpbG9uIFRoZSBlcnJvciBhbGxvd2VkLiBJdGBzIHNob3VsZCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuXHJcbiAgICAgKiBAcmV0dXJuIFJldHVybnMgYHRydWUnIHdoZW4gdGhlIGVsZW1lbnRzIG9mIGJvdGggbWF0cmljZXMgYXJlIGVxdWFsOyBvdGhlcndpc2UgcmV0dXJucyBgZmFsc2UnLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXF1YWxzIChvdGhlcjogTWF0MywgZXBzaWxvbiA9IEVQU0lMT04pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLm0wMCAtIG90aGVyLm0wMCkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMDApLCBNYXRoLmFicyhvdGhlci5tMDApKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0wMSAtIG90aGVyLm0wMSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMDEpLCBNYXRoLmFicyhvdGhlci5tMDEpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0wMiAtIG90aGVyLm0wMikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMDIpLCBNYXRoLmFicyhvdGhlci5tMDIpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0wMyAtIG90aGVyLm0wMykgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMDMpLCBNYXRoLmFicyhvdGhlci5tMDMpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0wNCAtIG90aGVyLm0wNCkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMDQpLCBNYXRoLmFicyhvdGhlci5tMDQpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0wNSAtIG90aGVyLm0wNSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMDUpLCBNYXRoLmFicyhvdGhlci5tMDUpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0wNiAtIG90aGVyLm0wNikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMDYpLCBNYXRoLmFicyhvdGhlci5tMDYpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0wNyAtIG90aGVyLm0wNykgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMDcpLCBNYXRoLmFicyhvdGhlci5tMDcpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0wOCAtIG90aGVyLm0wOCkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMDgpLCBNYXRoLmFicyhvdGhlci5tMDgpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gUmV0dXJucyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgbWF0cmljZXMgYXJlIGVxdWFsLlxyXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeefqemYteaYr+WQpuS4juaMh+WumuefqemYteebuOetieOAglxyXG4gICAgICogQHBhcmFtIG90aGVyIENvbXBhcmF0aXZlIG1hdHJpeFxyXG4gICAgICogQHJldHVybiBSZXR1cm5zIGB0cnVlJyB3aGVuIHRoZSBlbGVtZW50cyBvZiBib3RoIG1hdHJpY2VzIGFyZSBlcXVhbDsgb3RoZXJ3aXNlIHJldHVybnMgYGZhbHNlJy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0cmljdEVxdWFscyAob3RoZXI6IE1hdDMpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tMDAgPT09IG90aGVyLm0wMCAmJiB0aGlzLm0wMSA9PT0gb3RoZXIubTAxICYmIHRoaXMubTAyID09PSBvdGhlci5tMDJcclxuICAgICAgICAgICAgJiYgdGhpcy5tMDMgPT09IG90aGVyLm0wMyAmJiB0aGlzLm0wNCA9PT0gb3RoZXIubTA0ICYmIHRoaXMubTA1ID09PSBvdGhlci5tMDVcclxuICAgICAgICAgICAgJiYgdGhpcy5tMDYgPT09IG90aGVyLm0wNiAmJiB0aGlzLm0wNyA9PT0gb3RoZXIubTA3ICYmIHRoaXMubTA4ID09PSBvdGhlci5tMDg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdHJpeC5cclxuICAgICAqIEB6aCDov5Tlm57lvZPliY3nn6npmLXnmoTlrZfnrKbkuLLooajnpLrjgIJcclxuICAgICAqIEByZXR1cm4gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG1hdHJpeFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcgKCkge1xyXG4gICAgICAgIGNvbnN0IHQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBgW1xcbiR7XHJcbiAgICAgICAgICAgIHQubTAwfSwgJHt0Lm0wMX0sICR7dC5tMDJ9LFxcbiR7XHJcbiAgICAgICAgICAgIHQubTAzfSxcXG4ke3QubTA0fSwgJHt0Lm0wNX0sXFxuJHtcclxuICAgICAgICAgICAgdC5tMDZ9LCAke3QubTA3fSxcXG4ke3QubTA4fVxcbmBcclxuICAgICAgICAgICAgKyBgXWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gc2V0IHRoZSBjdXJyZW50IG1hdHJpeCB0byBhbiBpZGVudGl0eSBtYXRyaXguXHJcbiAgICAgKiBAemgg5bCG5b2T5YmN55+p6Zi16K6+5Li65Y2V5L2N55+p6Zi144CCXHJcbiAgICAgKiBAcmV0dXJuIGB0aGlzYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaWRlbnRpdHkgKCkge1xyXG4gICAgICAgIHRoaXMubTAwID0gMTtcclxuICAgICAgICB0aGlzLm0wMSA9IDA7XHJcbiAgICAgICAgdGhpcy5tMDIgPSAwO1xyXG4gICAgICAgIHRoaXMubTAzID0gMDtcclxuICAgICAgICB0aGlzLm0wNCA9IDE7XHJcbiAgICAgICAgdGhpcy5tMDUgPSAwO1xyXG4gICAgICAgIHRoaXMubTA2ID0gMDtcclxuICAgICAgICB0aGlzLm0wNyA9IDA7XHJcbiAgICAgICAgdGhpcy5tMDggPSAxO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFRyYW5zcG9zZXMgdGhlIGN1cnJlbnQgbWF0cml4LlxyXG4gICAgICogQHpoIOiuoeeul+W9k+WJjeefqemYteeahOi9rOe9ruefqemYteOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdHJhbnNwb3NlICgpIHtcclxuICAgICAgICBjb25zdCBhMDEgPSB0aGlzLm0wMTsgY29uc3QgYTAyID0gdGhpcy5tMDI7IGNvbnN0IGExMiA9IHRoaXMubTA1O1xyXG4gICAgICAgIHRoaXMubTAxID0gdGhpcy5tMDM7XHJcbiAgICAgICAgdGhpcy5tMDIgPSB0aGlzLm0wNjtcclxuICAgICAgICB0aGlzLm0wMyA9IGEwMTtcclxuICAgICAgICB0aGlzLm0wNSA9IHRoaXMubTA3O1xyXG4gICAgICAgIHRoaXMubTA2ID0gYTAyO1xyXG4gICAgICAgIHRoaXMubTA3ID0gYTEyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEludmVydHMgdGhlIGN1cnJlbnQgbWF0cml4LiBXaGVuIG1hdHJpeCBpcyBub3QgaW52ZXJ0aWJsZSB0aGUgbWF0cml4IHdpbGwgYmUgc2V0IHRvIHplcm9zLlxyXG4gICAgICogQHpoIOiuoeeul+W9k+WJjeefqemYteeahOmAhuefqemYteOAguazqOaEj++8jOWcqOefqemYteS4jeWPr+mAhuaXtu+8jOS8mui/lOWbnuS4gOS4quWFqOS4uiAwIOeahOefqemYteOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW52ZXJ0ICgpIHtcclxuICAgICAgICBjb25zdCBhMDAgPSB0aGlzLm0wMDsgY29uc3QgYTAxID0gdGhpcy5tMDE7IGNvbnN0IGEwMiA9IHRoaXMubTAyO1xyXG4gICAgICAgIGNvbnN0IGExMCA9IHRoaXMubTAzOyBjb25zdCBhMTEgPSB0aGlzLm0wNDsgY29uc3QgYTEyID0gdGhpcy5tMDU7XHJcbiAgICAgICAgY29uc3QgYTIwID0gdGhpcy5tMDY7IGNvbnN0IGEyMSA9IHRoaXMubTA3OyBjb25zdCBhMjIgPSB0aGlzLm0wODtcclxuXHJcbiAgICAgICAgY29uc3QgYjAxID0gYTIyICogYTExIC0gYTEyICogYTIxO1xyXG4gICAgICAgIGNvbnN0IGIxMSA9IC1hMjIgKiBhMTAgKyBhMTIgKiBhMjA7XHJcbiAgICAgICAgY29uc3QgYjIxID0gYTIxICogYTEwIC0gYTExICogYTIwO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XHJcbiAgICAgICAgbGV0IGRldCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSArIGEwMiAqIGIyMTtcclxuXHJcbiAgICAgICAgaWYgKGRldCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldCgwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRldCA9IDEuMCAvIGRldDtcclxuXHJcbiAgICAgICAgdGhpcy5tMDAgPSBiMDEgKiBkZXQ7XHJcbiAgICAgICAgdGhpcy5tMDEgPSAoLWEyMiAqIGEwMSArIGEwMiAqIGEyMSkgKiBkZXQ7XHJcbiAgICAgICAgdGhpcy5tMDIgPSAoYTEyICogYTAxIC0gYTAyICogYTExKSAqIGRldDtcclxuICAgICAgICB0aGlzLm0wMyA9IGIxMSAqIGRldDtcclxuICAgICAgICB0aGlzLm0wNCA9IChhMjIgKiBhMDAgLSBhMDIgKiBhMjApICogZGV0O1xyXG4gICAgICAgIHRoaXMubTA1ID0gKC1hMTIgKiBhMDAgKyBhMDIgKiBhMTApICogZGV0O1xyXG4gICAgICAgIHRoaXMubTA2ID0gYjIxICogZGV0O1xyXG4gICAgICAgIHRoaXMubTA3ID0gKC1hMjEgKiBhMDAgKyBhMDEgKiBhMjApICogZGV0O1xyXG4gICAgICAgIHRoaXMubTA4ID0gKGExMSAqIGEwMCAtIGEwMSAqIGExMCkgKiBkZXQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgb2YgdGhlIGN1cnJlbnQgbWF0cml4LlxyXG4gICAgICogQHpoIOiuoeeul+W9k+WJjeefqemYteeahOihjOWIl+W8j+OAglxyXG4gICAgICogQHJldHVybiDlvZPliY3nn6npmLXnmoTooYzliJflvI/jgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRldGVybWluYW50ICgpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGEwMCA9IHRoaXMubTAwOyBjb25zdCBhMDEgPSB0aGlzLm0wMTsgY29uc3QgYTAyID0gdGhpcy5tMDI7XHJcbiAgICAgICAgY29uc3QgYTEwID0gdGhpcy5tMDM7IGNvbnN0IGExMSA9IHRoaXMubTA0OyBjb25zdCBhMTIgPSB0aGlzLm0wNTtcclxuICAgICAgICBjb25zdCBhMjAgPSB0aGlzLm0wNjsgY29uc3QgYTIxID0gdGhpcy5tMDc7IGNvbnN0IGEyMiA9IHRoaXMubTA4O1xyXG5cclxuICAgICAgICByZXR1cm4gYTAwICogKGEyMiAqIGExMSAtIGExMiAqIGEyMSkgKyBhMDEgKiAoLWEyMiAqIGExMCArIGExMiAqIGEyMCkgKyBhMDIgKiAoYTIxICogYTEwIC0gYTExICogYTIwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBBZGRzIHRoZSBjdXJyZW50IG1hdHJpeCBhbmQgYW5vdGhlciBtYXRyaXggdG8gdGhlIGN1cnJlbnQgbWF0cml4LlxyXG4gICAgICogQHpoIOefqemYteWKoOazleOAguWwhuW9k+WJjeefqemYteS4juaMh+WumuefqemYteeahOebuOWKoO+8jOe7k+aenOi/lOWbnue7meW9k+WJjeefqemYteOAglxyXG4gICAgICogQHBhcmFtIG1hdCB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZCAobWF0OiBNYXQzKSB7XHJcbiAgICAgICAgdGhpcy5tMDAgKz0gbWF0Lm0wMDtcclxuICAgICAgICB0aGlzLm0wMSArPSBtYXQubTAxO1xyXG4gICAgICAgIHRoaXMubTAyICs9IG1hdC5tMDI7XHJcbiAgICAgICAgdGhpcy5tMDMgKz0gbWF0Lm0wMztcclxuICAgICAgICB0aGlzLm0wNCArPSBtYXQubTA0O1xyXG4gICAgICAgIHRoaXMubTA1ICs9IG1hdC5tMDU7XHJcbiAgICAgICAgdGhpcy5tMDYgKz0gbWF0Lm0wNjtcclxuICAgICAgICB0aGlzLm0wNyArPSBtYXQubTA3O1xyXG4gICAgICAgIHRoaXMubTA4ICs9IG1hdC5tMDg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU3VidHJhY3RzIGFub3RoZXIgbWF0cml4IGZyb20gdGhlIGN1cnJlbnQgbWF0cml4LlxyXG4gICAgICogQHpoIOiuoeeul+efqemYteWHj+azleOAguWwhuW9k+WJjeefqemYteWHj+WOu+aMh+WumuefqemYteeahOe7k+aenOi1i+WAvOe7meW9k+WJjeefqemYteOAglxyXG4gICAgICogQHBhcmFtIG1hdCB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN1YnRyYWN0IChtYXQ6IE1hdDMpIHtcclxuICAgICAgICB0aGlzLm0wMCAtPSBtYXQubTAwO1xyXG4gICAgICAgIHRoaXMubTAxIC09IG1hdC5tMDE7XHJcbiAgICAgICAgdGhpcy5tMDIgLT0gbWF0Lm0wMjtcclxuICAgICAgICB0aGlzLm0wMyAtPSBtYXQubTAzO1xyXG4gICAgICAgIHRoaXMubTA0IC09IG1hdC5tMDQ7XHJcbiAgICAgICAgdGhpcy5tMDUgLT0gbWF0Lm0wNTtcclxuICAgICAgICB0aGlzLm0wNiAtPSBtYXQubTA2O1xyXG4gICAgICAgIHRoaXMubTA3IC09IG1hdC5tMDc7XHJcbiAgICAgICAgdGhpcy5tMDggLT0gbWF0Lm0wODtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBNdWx0aXBseSB0aGUgY3VycmVudCBtYXRyaXggd2l0aCBhbm90aGVyIG1hdHJpeC5cclxuICAgICAqIEB6aCDnn6npmLXkuZjms5XjgILlsIblvZPliY3nn6npmLXlt6bkuZjmjIflrprnn6npmLXnmoTnu5PmnpzotYvlgLznu5nlvZPliY3nn6npmLXjgIJcclxuICAgICAqIEBwYXJhbSBtYXQgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtdWx0aXBseSAobWF0OiBNYXQzKSB7XHJcbiAgICAgICAgY29uc3QgYTAwID0gdGhpcy5tMDA7IGNvbnN0IGEwMSA9IHRoaXMubTAxOyBjb25zdCBhMDIgPSB0aGlzLm0wMjtcclxuICAgICAgICBjb25zdCBhMTAgPSB0aGlzLm0wMzsgY29uc3QgYTExID0gdGhpcy5tMDQ7IGNvbnN0IGExMiA9IHRoaXMubTA1O1xyXG4gICAgICAgIGNvbnN0IGEyMCA9IHRoaXMubTA2OyBjb25zdCBhMjEgPSB0aGlzLm0wNzsgY29uc3QgYTIyID0gdGhpcy5tMDg7XHJcblxyXG4gICAgICAgIGNvbnN0IGIwMCA9IG1hdC5tMDA7IGNvbnN0IGIwMSA9IG1hdC5tMDE7IGNvbnN0IGIwMiA9IG1hdC5tMDI7XHJcbiAgICAgICAgY29uc3QgYjEwID0gbWF0Lm0wMzsgY29uc3QgYjExID0gbWF0Lm0wNDsgY29uc3QgYjEyID0gbWF0Lm0wNTtcclxuICAgICAgICBjb25zdCBiMjAgPSBtYXQubTA2OyBjb25zdCBiMjEgPSBtYXQubTA3OyBjb25zdCBiMjIgPSBtYXQubTA4O1xyXG5cclxuICAgICAgICB0aGlzLm0wMCA9IGIwMCAqIGEwMCArIGIwMSAqIGExMCArIGIwMiAqIGEyMDtcclxuICAgICAgICB0aGlzLm0wMSA9IGIwMCAqIGEwMSArIGIwMSAqIGExMSArIGIwMiAqIGEyMTtcclxuICAgICAgICB0aGlzLm0wMiA9IGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMjtcclxuXHJcbiAgICAgICAgdGhpcy5tMDMgPSBiMTAgKiBhMDAgKyBiMTEgKiBhMTAgKyBiMTIgKiBhMjA7XHJcbiAgICAgICAgdGhpcy5tMDQgPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTEgKyBiMTIgKiBhMjE7XHJcbiAgICAgICAgdGhpcy5tMDUgPSBiMTAgKiBhMDIgKyBiMTEgKiBhMTIgKyBiMTIgKiBhMjI7XHJcblxyXG4gICAgICAgIHRoaXMubTA2ID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYjIyICogYTIwO1xyXG4gICAgICAgIHRoaXMubTA3ID0gYjIwICogYTAxICsgYjIxICogYTExICsgYjIyICogYTIxO1xyXG4gICAgICAgIHRoaXMubTA4ID0gYjIwICogYTAyICsgYjIxICogYTEyICsgYjIyICogYTIyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIE11bHRpcGx5IGVhY2ggZWxlbWVudCBvZiB0aGUgY3VycmVudCBtYXRyaXggYnkgYSBzY2FsYXIgbnVtYmVyLlxyXG4gICAgICogQHpoIOefqemYteaVsOS5mOOAguWwhuW9k+WJjeefqemYteS4juaMh+Wumuagh+mHj+eahOaVsOS5mOe7k+aenOi1i+WAvOe7meW9k+WJjeefqemYteOAglxyXG4gICAgICogQHBhcmFtIHNjYWxhciBhbW91bnQgdG8gc2NhbGUgdGhlIG1hdHJpeCdzIGVsZW1lbnRzIGJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtdWx0aXBseVNjYWxhciAoc2NhbGFyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm0wMCAqPSBzY2FsYXI7XHJcbiAgICAgICAgdGhpcy5tMDEgKj0gc2NhbGFyO1xyXG4gICAgICAgIHRoaXMubTAyICo9IHNjYWxhcjtcclxuICAgICAgICB0aGlzLm0wMyAqPSBzY2FsYXI7XHJcbiAgICAgICAgdGhpcy5tMDQgKj0gc2NhbGFyO1xyXG4gICAgICAgIHRoaXMubTA1ICo9IHNjYWxhcjtcclxuICAgICAgICB0aGlzLm0wNiAqPSBzY2FsYXI7XHJcbiAgICAgICAgdGhpcy5tMDcgKj0gc2NhbGFyO1xyXG4gICAgICAgIHRoaXMubTA4ICo9IHNjYWxhcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBNdWx0aXBseSB0aGUgY3VycmVudCBtYXRyaXggd2l0aCBhIHNjYWxlIG1hdHJpeCBnaXZlbiBieSBhIHNjYWxlIHZlY3Rvci5cclxuICAgICAqIEB6aCDlsIblvZPliY3nn6npmLXlt6bkuZjnvKnmlL7nn6npmLXnmoTnu5PmnpzotYvlgLznu5nlvZPliY3nn6npmLXvvIznvKnmlL7nn6npmLXnlLHlkITkuKrovbTnmoTnvKnmlL7nu5nlh7rjgIJcclxuICAgICAqIEBwYXJhbSB2ZWMgdmVjdG9yIHRvIHNjYWxlIGJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzY2FsZSAodmVjOiBWZWMzKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHZlYy54OyBjb25zdCB5ID0gdmVjLnk7XHJcblxyXG4gICAgICAgIHRoaXMubTAwID0geCAqIHRoaXMubTAwO1xyXG4gICAgICAgIHRoaXMubTAxID0geCAqIHRoaXMubTAxO1xyXG4gICAgICAgIHRoaXMubTAyID0geCAqIHRoaXMubTAyO1xyXG5cclxuICAgICAgICB0aGlzLm0wMyA9IHkgKiB0aGlzLm0wMztcclxuICAgICAgICB0aGlzLm0wNCA9IHkgKiB0aGlzLm0wNDtcclxuICAgICAgICB0aGlzLm0wNSA9IHkgKiB0aGlzLm0wNTtcclxuXHJcbiAgICAgICAgdGhpcy5tMDYgPSB0aGlzLm0wNjtcclxuICAgICAgICB0aGlzLm0wNyA9IHRoaXMubTA3O1xyXG4gICAgICAgIHRoaXMubTA4ID0gdGhpcy5tMDg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gUm90YXRlcyB0aGUgY3VycmVudCBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlLlxyXG4gICAgICogQHpoIOWwhuW9k+WJjeefqemYteW3puS5mOaXi+i9rOefqemYteeahOe7k+aenOi1i+WAvOe7meW9k+WJjeefqemYte+8jOaXi+i9rOefqemYteeUseaXi+i9rOi9tOWSjOaXi+i9rOinkuW6pue7meWHuuOAglxyXG4gICAgICogQHBhcmFtIHJhZCByYWRpdXMgb2Ygcm90YXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJvdGF0ZSAocmFkOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBhMDAgPSB0aGlzLm0wMDsgY29uc3QgYTAxID0gdGhpcy5tMDE7IGNvbnN0IGEwMiA9IHRoaXMubTAyO1xyXG4gICAgICAgIGNvbnN0IGExMCA9IHRoaXMubTAzOyBjb25zdCBhMTEgPSB0aGlzLm0wNDsgY29uc3QgYTEyID0gdGhpcy5tMDU7XHJcbiAgICAgICAgY29uc3QgYTIwID0gdGhpcy5tMDY7IGNvbnN0IGEyMSA9IHRoaXMubTA3OyBjb25zdCBhMjIgPSB0aGlzLm0wODtcclxuXHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7XHJcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKHJhZCk7XHJcblxyXG4gICAgICAgIHRoaXMubTAwID0gYyAqIGEwMCArIHMgKiBhMTA7XHJcbiAgICAgICAgdGhpcy5tMDEgPSBjICogYTAxICsgcyAqIGExMTtcclxuICAgICAgICB0aGlzLm0wMiA9IGMgKiBhMDIgKyBzICogYTEyO1xyXG5cclxuICAgICAgICB0aGlzLm0wMyA9IGMgKiBhMTAgLSBzICogYTAwO1xyXG4gICAgICAgIHRoaXMubTA0ID0gYyAqIGExMSAtIHMgKiBhMDE7XHJcbiAgICAgICAgdGhpcy5tMDUgPSBjICogYTEyIC0gcyAqIGEwMjtcclxuXHJcbiAgICAgICAgdGhpcy5tMDYgPSBhMjA7XHJcbiAgICAgICAgdGhpcy5tMDcgPSBhMjE7XHJcbiAgICAgICAgdGhpcy5tMDggPSBhMjI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gUmVzZXRzIHRoZSBjdXJyZW50IG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBxdWF0ZXJuaW9uLlxyXG4gICAgICogQHpoIOmHjee9ruW9k+WJjeefqemYteeahOWAvO+8jOS9v+WFtuihqOekuuaMh+WumuWbm+WFg+aVsOihqOekuueahOaXi+i9rOWPmOaNouOAglxyXG4gICAgICogQHBhcmFtIHEgVGhlIHF1YXRlcm5pb24uXHJcbiAgICAgKiBAcmV0dXJucyB0aGlzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmcm9tUXVhdCAocTogUXVhdCkge1xyXG4gICAgICAgIGNvbnN0IHggPSBxLng7IGNvbnN0IHkgPSBxLnk7IGNvbnN0IHogPSBxLno7IGNvbnN0IHcgPSBxLnc7XHJcbiAgICAgICAgY29uc3QgeDIgPSB4ICsgeDtcclxuICAgICAgICBjb25zdCB5MiA9IHkgKyB5O1xyXG4gICAgICAgIGNvbnN0IHoyID0geiArIHo7XHJcblxyXG4gICAgICAgIGNvbnN0IHh4ID0geCAqIHgyO1xyXG4gICAgICAgIGNvbnN0IHl4ID0geSAqIHgyO1xyXG4gICAgICAgIGNvbnN0IHl5ID0geSAqIHkyO1xyXG4gICAgICAgIGNvbnN0IHp4ID0geiAqIHgyO1xyXG4gICAgICAgIGNvbnN0IHp5ID0geiAqIHkyO1xyXG4gICAgICAgIGNvbnN0IHp6ID0geiAqIHoyO1xyXG4gICAgICAgIGNvbnN0IHd4ID0gdyAqIHgyO1xyXG4gICAgICAgIGNvbnN0IHd5ID0gdyAqIHkyO1xyXG4gICAgICAgIGNvbnN0IHd6ID0gdyAqIHoyO1xyXG5cclxuICAgICAgICB0aGlzLm0wMCA9IDEgLSB5eSAtIHp6O1xyXG4gICAgICAgIHRoaXMubTAzID0geXggLSB3ejtcclxuICAgICAgICB0aGlzLm0wNiA9IHp4ICsgd3k7XHJcblxyXG4gICAgICAgIHRoaXMubTAxID0geXggKyB3ejtcclxuICAgICAgICB0aGlzLm0wNCA9IDEgLSB4eCAtIHp6O1xyXG4gICAgICAgIHRoaXMubTA3ID0genkgLSB3eDtcclxuXHJcbiAgICAgICAgdGhpcy5tMDIgPSB6eCAtIHd5O1xyXG4gICAgICAgIHRoaXMubTA1ID0genkgKyB3eDtcclxuICAgICAgICB0aGlzLm0wOCA9IDEgLSB4eCAtIHl5O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCB2M18xID0gbmV3IFZlYzMoKTtcclxuY29uc3QgdjNfMiA9IG5ldyBWZWMzKCk7Il19