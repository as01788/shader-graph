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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0My5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlscy9NYXRocy9NYXQzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7O0dBR0c7OztBQUlILG1DQUFrQztBQUNsQyxpQ0FBOEI7QUFFN0IsTUFBYSxJQUFJO0lBeW9CZCxZQUNJLE1BQXFCLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQ3hDLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUN6QixHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFFekIsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQzNELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUMzRCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDOUQ7YUFBTTtZQUNILElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMs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QUFDLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN0QyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDdEMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFDRCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVoQixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDekMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4QyxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsV0FBVyxDQUEwQixDQUFNO1FBQ3JELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4RCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRXhELE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFNO1FBQ3BFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4RCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRXhELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4RCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRXhELEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRTVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRTVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxZQUFZLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBWTtRQUM5RSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUV4RCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUV4RCxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUU1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUU1QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDNUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsU0FBUyxDQUFxRCxHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQVU7UUFDcEcsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4RCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0IsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZCxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNkLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWQsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZCxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNkLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBcUQsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFVO1FBQ2hHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRXBCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRXBCLEdBQUcsQ0FBQyxHQUFHLEdBQUcs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QUFHLENBQUM7UUFDM0UsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMzRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRTNFLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWxDLDRCQUE0QjtRQUM1QixJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVoRixJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ04sT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWhCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRXBELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRXBELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwRCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRXBELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFRLEdBQVEsRUFBRSxDQUFZLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDeEQsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDckIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDckIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDckIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQTBCLEdBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDbkUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFNO1FBQy9ELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTTtRQUNwRSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQVM7UUFDN0UsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFD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LEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7ZUFDcEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7ZUFDcEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7ZUFDcEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7ZUFDcEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7ZUFDcEYsSUFBSSxDQUFD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LEdBQUcsQ0FBQztZQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ2xEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBRSxLQUFXLEVBQUUsT0FBTyxHQUFHLGVBQU87UUFDekMsT0FBTyxDQUNILElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQy9GLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3hHLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxZQUFZLENBQUUsS0FBVztRQUM1QixPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRztlQUMxRSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUc7ZUFDMUUsSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDdEYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxRQUFRO1FBQ1gsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2YsT0FBTyxNQUNILENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUN6QixDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsTUFDMUIsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUk7Y0FDNUIsR0FBRyxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxRQUFRO1FBQ1gsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFNBQVM7UUFDWixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDakUsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDVCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDakUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2pFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUVqRSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbkMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWxDLDRCQUE0QjtRQUM1QixJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUU1QyxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEMsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWhCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxD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SUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxRQUFRLENBQUUsR0FBUztRQUN0QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDakUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2pFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUVqRSxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDOUQsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQzlELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUU5RCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUU3QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUU3QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcs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RSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVsQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOztBQTErQkosb0JBMitCQTtBQTErQmlCLGFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztBQTQrQnZELE1BQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7QUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiBAZW4gTWF0aGVtYXRpY2FsIDN4MyBtYXRyaXguXG4gKiBAemgg6KGo56S65LiJ57u077yIM3gz77yJ55+p6Zi144CCXG4gKi9cblxuaW1wb3J0IHsgUXVhdCB9IGZyb20gXCIuL1F1YXRcIjtcbmltcG9ydCB7IElNYXQzTGlrZSwgSU1hdDRMaWtlLCBJVmVjM0xpa2UsIElWZWMyTGlrZSwgSVF1YXRMaWtlIH0gZnJvbSBcIi4vdHlwZS1kZWZpbmVcIjtcbmltcG9ydCB7IEVQU0lMT04gfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgVmVjMyB9IGZyb20gXCIuL1ZlYzNcIjtcblxuIGV4cG9ydCBjbGFzcyBNYXQzIHtcbiAgICBwdWJsaWMgc3RhdGljIElERU5USVRZID0gT2JqZWN0LmZyZWV6ZShuZXcgTWF0MygpKTtcblxuICAgIC8qKlxuICAgICAqIEBlbiBDbG9uZSBhIG1hdHJpeCBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XG4gICAgICogQHpoIOiOt+W+l+aMh+WumuefqemYteeahOaLt+i0nVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2xvbmUgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKGE6IE91dCkge1xuICAgICAgICByZXR1cm4gbmV3IE1hdDMoXG4gICAgICAgICAgICBhLm0wMCwgYS5tMDEsIGEubTAyLFxuICAgICAgICAgICAgYS5tMDMsIGEubTA0LCBhLm0wNSxcbiAgICAgICAgICAgIGEubTA2LCBhLm0wNywgYS5tMDgsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENvcHkgY29udGVudCBvZiBhIG1hdHJpeCBpbnRvIGFub3RoZXIgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IG1hdHJpeFxuICAgICAqIEB6aCDlpI3liLbnm67moIfnn6npmLVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvcHkgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgb3V0Lm0wMCA9IGEubTAwO1xuICAgICAgICBvdXQubTAxID0gYS5tMDE7XG4gICAgICAgIG91dC5tMDIgPSBhLm0wMjtcbiAgICAgICAgb3V0Lm0wMyA9IGEubTAzO1xuICAgICAgICBvdXQubTA0ID0gYS5tMDQ7XG4gICAgICAgIG91dC5tMDUgPSBhLm0wNTtcbiAgICAgICAgb3V0Lm0wNiA9IGEubTA2O1xuICAgICAgICBvdXQubTA3ID0gYS5tMDc7XG4gICAgICAgIG91dC5tMDggPSBhLm0wODtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0cyB0aGUgZWxlbWVudHMgb2YgYSBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXhcbiAgICAgKiBAemgg6K6+572u55+p6Zi15YC8XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzZXQgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gIChcbiAgICAgICAgb3V0OiBPdXQsXG4gICAgICAgIG0wMDogbnVtYmVyLCBtMDE6IG51bWJlciwgbTAyOiBudW1iZXIsXG4gICAgICAgIG0xMDogbnVtYmVyLCBtMTE6IG51bWJlciwgbTEyOiBudW1iZXIsXG4gICAgICAgIG0yMDogbnVtYmVyLCBtMjE6IG51bWJlciwgbTIyOiBudW1iZXIsXG4gICAgKSB7XG4gICAgICAgIG91dC5tMDAgPSBtMDA7IG91dC5tMDEgPSBtMDE7IG91dC5tMDIgPSBtMDI7XG4gICAgICAgIG91dC5tMDMgPSBtMTA7IG91dC5tMDQgPSBtMTE7IG91dC5tMDUgPSBtMTI7XG4gICAgICAgIG91dC5tMDYgPSBtMjA7IG91dC5tMDcgPSBtMjE7IG91dC5tMDggPSBtMjI7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFJlc2V0IHRoZSBvdXQgbWF0cml4IHRvIGFuIGlkZW50aXR5IG1hdHJpeFxuICAgICAqIEB6aCDlsIbnm67moIfotYvlgLzkuLrljZXkvY3nn6npmLVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGlkZW50aXR5IDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2U+IChvdXQ6IE91dCkge1xuICAgICAgICBvdXQubTAwID0gMTtcbiAgICAgICAgb3V0Lm0wMSA9IDA7XG4gICAgICAgIG91dC5tMDIgPSAwO1xuICAgICAgICBvdXQubTAzID0gMDtcbiAgICAgICAgb3V0Lm0wNCA9IDE7XG4gICAgICAgIG91dC5tMDUgPSAwO1xuICAgICAgICBvdXQubTA2ID0gMDtcbiAgICAgICAgb3V0Lm0wNyA9IDA7XG4gICAgICAgIG91dC5tMDggPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBUcmFuc3Bvc2VzIGEgbWF0cml4IGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXhcbiAgICAgKiBAemgg6L2s572u55+p6Zi1XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc3Bvc2UgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlIHRyYW5zcG9zaW5nIG91cnNlbHZlcyB3ZSBjYW4gc2tpcCBhIGZldyBzdGVwcyBidXQgaGF2ZSB0byBjYWNoZSBzb21lIHZhbHVlc1xuICAgICAgICBpZiAob3V0ID09PSBhKSB7XG4gICAgICAgICAgICBjb25zdCBhMDEgPSBhLm0wMTtcbiAgICAgICAgICAgIGNvbnN0IGEwMiA9IGEubTAyO1xuICAgICAgICAgICAgY29uc3QgYTEyID0gYS5tMDU7XG4gICAgICAgICAgICBvdXQubTAxID0gYS5tMDM7XG4gICAgICAgICAgICBvdXQubTAyID0gYS5tMDY7XG4gICAgICAgICAgICBvdXQubTAzID0gYTAxO1xuICAgICAgICAgICAgb3V0Lm0wNSA9IGEubTA3O1xuICAgICAgICAgICAgb3V0Lm0wNiA9IGEwMjtcbiAgICAgICAgICAgIG91dC5tMDcgPSBhMTI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQubTAwID0gYS5tMDA7XG4gICAgICAgICAgICBvdXQubTAxID0gYS5tMDM7XG4gICAgICAgICAgICBvdXQubTAyID0gYS5tMDY7XG4gICAgICAgICAgICBvdXQubTAzID0gYS5tMDE7XG4gICAgICAgICAgICBvdXQubTA0ID0gYS5tMDQ7XG4gICAgICAgICAgICBvdXQubTA1ID0gYS5tMDc7XG4gICAgICAgICAgICBvdXQubTA2ID0gYS5tMDI7XG4gICAgICAgICAgICBvdXQubTA3ID0gYS5tMDU7XG4gICAgICAgICAgICBvdXQubTA4ID0gYS5tMDg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBJbnZlcnRzIGEgbWF0cml4LiBXaGVuIG1hdHJpeCBpcyBub3QgaW52ZXJ0aWJsZSB0aGUgbWF0cml4IHdpbGwgYmUgc2V0IHRvIHplcm9zLlxuICAgICAqIEB6aCDnn6npmLXmsYLpgIbvvIzms6jmhI/vvIzlnKjnn6npmLXkuI3lj6/pgIbml7bvvIzkvJrov5Tlm57kuIDkuKrlhajkuLogMCDnmoTnn6npmLXjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGludmVydCA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBjb25zdCBhMDAgPSBhLm0wMDsgY29uc3QgYTAxID0gYS5tMDE7IGNvbnN0IGEwMiA9IGEubTAyO1xuICAgICAgICBjb25zdCBhMTAgPSBhLm0wMzsgY29uc3QgYTExID0gYS5tMDQ7IGNvbnN0IGExMiA9IGEubTA1O1xuICAgICAgICBjb25zdCBhMjAgPSBhLm0wNjsgY29uc3QgYTIxID0gYS5tMDc7IGNvbnN0IGEyMiA9IGEubTA4O1xuXG4gICAgICAgIGNvbnN0IGIwMSA9IGEyMiAqIGExMSAtIGExMiAqIGEyMTtcbiAgICAgICAgY29uc3QgYjExID0gLWEyMiAqIGExMCArIGExMiAqIGEyMDtcbiAgICAgICAgY29uc3QgYjIxID0gYTIxICogYTEwIC0gYTExICogYTIwO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgbGV0IGRldCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSArIGEwMiAqIGIyMTtcblxuICAgICAgICBpZiAoZGV0ID09PSAwKSB7XG4gICAgICAgICAgICBvdXQubTAwID0gMDsgb3V0Lm0wMSA9IDA7IG91dC5tMDIgPSAwO1xuICAgICAgICAgICAgb3V0Lm0wMyA9IDA7IG91dC5tMDQgPSAwOyBvdXQubTA1ID0gMDtcbiAgICAgICAgICAgIG91dC5tMDYgPSAwOyBvdXQubTA3ID0gMDsgb3V0Lm0wOCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9XG4gICAgICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgICAgICBvdXQubTAwID0gYjAxICogZGV0O1xuICAgICAgICBvdXQubTAxID0gKC1hMjIgKiBhMDEgKyBhMDIgKiBhMjEpICogZGV0O1xuICAgICAgICBvdXQubTAyID0gKGExMiAqIGEwMSAtIGEwMiAqIGExMSkgKiBkZXQ7XG4gICAgICAgIG91dC5tMDMgPSBiMTEgKiBkZXQ7XG4gICAgICAgIG91dC5tMDQgPSAoYTIyICogYTAwIC0gYTAyICogYTIwKSAqIGRldDtcbiAgICAgICAgb3V0Lm0wNSA9ICgtYTEyICogYTAwICsgYTAyICogYTEwKSAqIGRldDtcbiAgICAgICAgb3V0Lm0wNiA9IGIyMSAqIGRldDtcbiAgICAgICAgb3V0Lm0wNyA9ICgtYTIxICogYTAwICsgYTAxICogYTIwKSAqIGRldDtcbiAgICAgICAgb3V0Lm0wOCA9IChhMTEgKiBhMDAgLSBhMDEgKiBhMTApICogZGV0O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdHJpeFxuICAgICAqIEB6aCDnn6npmLXooYzliJflvI9cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGRldGVybWluYW50IDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2U+IChhOiBPdXQpIHtcbiAgICAgICAgY29uc3QgYTAwID0gYS5tMDA7IGNvbnN0IGEwMSA9IGEubTAxOyBjb25zdCBhMDIgPSBhLm0wMjtcbiAgICAgICAgY29uc3QgYTEwID0gYS5tMDM7IGNvbnN0IGExMSA9IGEubTA0OyBjb25zdCBhMTIgPSBhLm0wNTtcbiAgICAgICAgY29uc3QgYTIwID0gYS5tMDY7IGNvbnN0IGEyMSA9IGEubTA3OyBjb25zdCBhMjIgPSBhLm0wODtcblxuICAgICAgICByZXR1cm4gYTAwICogKGEyMiAqIGExMSAtIGExMiAqIGEyMSkgKyBhMDEgKiAoLWEyMiAqIGExMCArIGExMiAqIGEyMCkgKyBhMDIgKiAoYTIxICogYTEwIC0gYTExICogYTIwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gTXVsdGlwbHkgdHdvIG1hdHJpY2VzIGV4cGxpY2l0bHkgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IG1hdHJpeFxuICAgICAqIEB6aCDnn6npmLXkuZjms5VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG11bHRpcGx5IDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgY29uc3QgYTAwID0gYS5tMDA7IGNvbnN0IGEwMSA9IGEubTAxOyBjb25zdCBhMDIgPSBhLm0wMjtcbiAgICAgICAgY29uc3QgYTEwID0gYS5tMDM7IGNvbnN0IGExMSA9IGEubTA0OyBjb25zdCBhMTIgPSBhLm0wNTtcbiAgICAgICAgY29uc3QgYTIwID0gYS5tMDY7IGNvbnN0IGEyMSA9IGEubTA3OyBjb25zdCBhMjIgPSBhLm0wODtcblxuICAgICAgICBjb25zdCBiMDAgPSBiLm0wMDsgY29uc3QgYjAxID0gYi5tMDE7IGNvbnN0IGIwMiA9IGIubTAyO1xuICAgICAgICBjb25zdCBiMTAgPSBiLm0wMzsgY29uc3QgYjExID0gYi5tMDQ7IGNvbnN0IGIxMiA9IGIubTA1O1xuICAgICAgICBjb25zdCBiMjAgPSBiLm0wNjsgY29uc3QgYjIxID0gYi5tMDc7IGNvbnN0IGIyMiA9IGIubTA4O1xuXG4gICAgICAgIG91dC5tMDAgPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjA7XG4gICAgICAgIG91dC5tMDEgPSBiMDAgKiBhMDEgKyBiMDEgKiBhMTEgKyBiMDIgKiBhMjE7XG4gICAgICAgIG91dC5tMDIgPSBiMDAgKiBhMDIgKyBiMDEgKiBhMTIgKyBiMDIgKiBhMjI7XG5cbiAgICAgICAgb3V0Lm0wMyA9IGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMDtcbiAgICAgICAgb3V0Lm0wNCA9IGIxMCAqIGEwMSArIGIxMSAqIGExMSArIGIxMiAqIGEyMTtcbiAgICAgICAgb3V0Lm0wNSA9IGIxMCAqIGEwMiArIGIxMSAqIGExMiArIGIxMiAqIGEyMjtcblxuICAgICAgICBvdXQubTA2ID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYjIyICogYTIwO1xuICAgICAgICBvdXQubTA3ID0gYjIwICogYTAxICsgYjIxICogYTExICsgYjIyICogYTIxO1xuICAgICAgICBvdXQubTA4ID0gYjIwICogYTAyICsgYjIxICogYTEyICsgYjIyICogYTIyO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBUYWtlIHRoZSBmaXJzdCB0aGlyZCBvcmRlciBvZiB0aGUgZm91cnRoIG9yZGVyIG1hdHJpeCBhbmQgbXVsdGlwbHkgYnkgdGhlIHRoaXJkIG9yZGVyIG1hdHJpeFxuICAgICAqIEB6aCDlj5blm5vpmLbnn6npmLXnmoTliY3kuInpmLbvvIzkuI7kuInpmLbnn6npmLXnm7jkuZhcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG11bHRpcGx5TWF0NCA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogSU1hdDRMaWtlKSB7XG4gICAgICAgIGNvbnN0IGEwMCA9IGEubTAwOyBjb25zdCBhMDEgPSBhLm0wMTsgY29uc3QgYTAyID0gYS5tMDI7XG4gICAgICAgIGNvbnN0IGExMCA9IGEubTAzOyBjb25zdCBhMTEgPSBhLm0wNDsgY29uc3QgYTEyID0gYS5tMDU7XG4gICAgICAgIGNvbnN0IGEyMCA9IGEubTA2OyBjb25zdCBhMjEgPSBhLm0wNzsgY29uc3QgYTIyID0gYS5tMDg7XG5cbiAgICAgICAgY29uc3QgYjAwID0gYi5tMDA7IGNvbnN0IGIwMSA9IGIubTAxOyBjb25zdCBiMDIgPSBiLm0wMjtcbiAgICAgICAgY29uc3QgYjEwID0gYi5tMDQ7IGNvbnN0IGIxMSA9IGIubTA1OyBjb25zdCBiMTIgPSBiLm0wNjtcbiAgICAgICAgY29uc3QgYjIwID0gYi5tMDg7IGNvbnN0IGIyMSA9IGIubTA5OyBjb25zdCBiMjIgPSBiLm0xMDtcblxuICAgICAgICBvdXQubTAwID0gYjAwICogYTAwICsgYjAxICogYTEwICsgYjAyICogYTIwO1xuICAgICAgICBvdXQubTAxID0gYjAwICogYTAxICsgYjAxICogYTExICsgYjAyICogYTIxO1xuICAgICAgICBvdXQubTAyID0gYjAwICogYTAyICsgYjAxICogYTEyICsgYjAyICogYTIyO1xuXG4gICAgICAgIG91dC5tMDMgPSBiMTAgKiBhMDAgKyBiMTEgKiBhMTAgKyBiMTIgKiBhMjA7XG4gICAgICAgIG91dC5tMDQgPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTEgKyBiMTIgKiBhMjE7XG4gICAgICAgIG91dC5tMDUgPSBiMTAgKiBhMDIgKyBiMTEgKiBhMTIgKyBiMTIgKiBhMjI7XG5cbiAgICAgICAgb3V0Lm0wNiA9IGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGIyMiAqIGEyMDtcbiAgICAgICAgb3V0Lm0wNyA9IGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMTtcbiAgICAgICAgb3V0Lm0wOCA9IGIyMCAqIGEwMiArIGIyMSAqIGExMiArIGIyMiAqIGEyMjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gTXVsdGlwbHkgYSBtYXRyaXggd2l0aCBhIHRyYW5zbGF0aW9uIHZlY3RvciBnaXZlbiBieSBhIHRyYW5zbGF0aW9uIG9mZnNldC5cbiAgICAgKiBAemgg5Zyo57uZ5a6a55+p6Zi15Y+Y5o2i5Z+656GA5LiK5Yqg5YWl5Y+Y5o2iXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2Zvcm0gPE91dCBleHRlbmRzIElNYXQzTGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHY6IFZlY0xpa2UpIHtcbiAgICAgICAgY29uc3QgYTAwID0gYS5tMDA7IGNvbnN0IGEwMSA9IGEubTAxOyBjb25zdCBhMDIgPSBhLm0wMjtcbiAgICAgICAgY29uc3QgYTEwID0gYS5tMDM7IGNvbnN0IGExMSA9IGEubTA0OyBjb25zdCBhMTIgPSBhLm0wNTtcbiAgICAgICAgY29uc3QgYTIwID0gYS5tMDY7IGNvbnN0IGEyMSA9IGEubTA3OyBjb25zdCBhMjIgPSBhLm0wODtcbiAgICAgICAgY29uc3QgeCA9IHYueDsgY29uc3QgeSA9IHYueTtcblxuICAgICAgICBvdXQubTAwID0gYTAwO1xuICAgICAgICBvdXQubTAxID0gYTAxO1xuICAgICAgICBvdXQubTAyID0gYTAyO1xuXG4gICAgICAgIG91dC5tMDMgPSBhMTA7XG4gICAgICAgIG91dC5tMDQgPSBhMTE7XG4gICAgICAgIG91dC5tMDUgPSBhMTI7XG5cbiAgICAgICAgb3V0Lm0wNiA9IHggKiBhMDAgKyB5ICogYTEwICsgYTIwO1xuICAgICAgICBvdXQubTA3ID0geCAqIGEwMSArIHkgKiBhMTEgKyBhMjE7XG4gICAgICAgIG91dC5tMDggPSB4ICogYTAyICsgeSAqIGExMiArIGEyMjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gTXVsdGlwbHkgYSBtYXRyaXggd2l0aCBhIHNjYWxlIG1hdHJpeCBnaXZlbiBieSBhIHNjYWxlIHZlY3RvciBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XG4gICAgICogQHpoIOWcqOe7meWumuefqemYteWPmOaNouWfuuehgOS4iuWKoOWFpeaWsOe8qeaUvuWPmOaNolxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2NhbGUgPE91dCBleHRlbmRzIElNYXQzTGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHY6IFZlY0xpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IHYueDsgY29uc3QgeSA9IHYueTtcblxuICAgICAgICBvdXQubTAwID0geCAqIGEubTAwO1xuICAgICAgICBvdXQubTAxID0geCAqIGEubTAxO1xuICAgICAgICBvdXQubTAyID0geCAqIGEubTAyO1xuXG4gICAgICAgIG91dC5tMDMgPSB5ICogYS5tMDM7XG4gICAgICAgIG91dC5tMDQgPSB5ICogYS5tMDQ7XG4gICAgICAgIG91dC5tMDUgPSB5ICogYS5tMDU7XG5cbiAgICAgICAgb3V0Lm0wNiA9IGEubTA2O1xuICAgICAgICBvdXQubTA3ID0gYS5tMDc7XG4gICAgICAgIG91dC5tMDggPSBhLm0wODtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gUm90YXRlcyB0aGUgdHJhbnNmb3JtIGJ5IHRoZSBnaXZlbiBhbmdsZSBhbmQgc2F2ZSB0aGUgcmVzdWx0cyBpbnRvIHRoZSBvdXQgbWF0cml4XG4gICAgICogQHpoIOWcqOe7meWumuefqemYteWPmOaNouWfuuehgOS4iuWKoOWFpeaWsOaXi+i9rOWPmOaNolxuICAgICAqIEBwYXJhbSByYWQgcmFkaXVzIG9mIHJvdGF0aW9uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByb3RhdGUgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGEwMCA9IGEubTAwOyBjb25zdCBhMDEgPSBhLm0wMTsgY29uc3QgYTAyID0gYS5tMDI7XG4gICAgICAgIGNvbnN0IGExMCA9IGEubTAzOyBjb25zdCBhMTEgPSBhLm0wNDsgY29uc3QgYTEyID0gYS5tMDU7XG4gICAgICAgIGNvbnN0IGEyMCA9IGEubTA2OyBjb25zdCBhMjEgPSBhLm0wNzsgY29uc3QgYTIyID0gYS5tMDg7XG5cbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhyYWQpO1xuXG4gICAgICAgIG91dC5tMDAgPSBjICogYTAwICsgcyAqIGExMDtcbiAgICAgICAgb3V0Lm0wMSA9IGMgKiBhMDEgKyBzICogYTExO1xuICAgICAgICBvdXQubTAyID0gYyAqIGEwMiArIHMgKiBhMTI7XG5cbiAgICAgICAgb3V0Lm0wMyA9IGMgKiBhMTAgLSBzICogYTAwO1xuICAgICAgICBvdXQubTA0ID0gYyAqIGExMSAtIHMgKiBhMDE7XG4gICAgICAgIG91dC5tMDUgPSBjICogYTEyIC0gcyAqIGEwMjtcblxuICAgICAgICBvdXQubTA2ID0gYTIwO1xuICAgICAgICBvdXQubTA3ID0gYTIxO1xuICAgICAgICBvdXQubTA4ID0gYTIyO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDb3BpZXMgdGhlIGZpcnN0IHRoaXJkIG9yZGVyIG1hdHJpeCBvZiBhIGZvdXJ0aCBvcmRlciBtYXRyaXggdG8gdGhlIG91dCB0aGlyZCBvcmRlciBtYXRyaXhcbiAgICAgKiBAemgg5Y+W5Zub6Zi255+p6Zi155qE5YmN5LiJ6Zi2XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmcm9tTWF0NCA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGE6IElNYXQ0TGlrZSkge1xuICAgICAgICBvdXQubTAwID0gYS5tMDA7XG4gICAgICAgIG91dC5tMDEgPSBhLm0wMTtcbiAgICAgICAgb3V0Lm0wMiA9IGEubTAyO1xuICAgICAgICBvdXQubTAzID0gYS5tMDQ7XG4gICAgICAgIG91dC5tMDQgPSBhLm0wNTtcbiAgICAgICAgb3V0Lm0wNSA9IGEubTA2O1xuICAgICAgICBvdXQubTA2ID0gYS5tMDg7XG4gICAgICAgIG91dC5tMDcgPSBhLm0wOTtcbiAgICAgICAgb3V0Lm0wOCA9IGEubTEwO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXRzIGEgdGhpcmQgb3JkZXIgbWF0cml4IHdpdGggdmlldyBkaXJlY3Rpb24gYW5kIHVwIGRpcmVjdGlvbi4gVGhlbiBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXhcbiAgICAgKiBAemgg5qC55o2u6KeG5Y+j5YmN5pa55ZCR5ZKM5LiK5pa55ZCR6K6h566X55+p6Zi1XG4gICAgICogQHBhcmFtIHZpZXcgVGhlIHZpZXcgZGlyZWN0aW9uLCBpdGBzIG11c3QgYmUgbm9ybWFsaXplZC5cbiAgICAgKiBAcGFyYW0gdXAgVGhlIHZpZXcgdXAgZGlyZWN0aW9uLCBpdGBzIG11c3QgYmUgbm9ybWFsaXplZCwgZGVmYXVsdCB2YWx1ZSBpcyAoMCwgMSwgMCkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmcm9tVmlld1VwIDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgdmlldzogVmVjTGlrZSwgdXA/OiBWZWMzKSB7XG4gICAgICAgIGlmIChWZWMzLmxlbmd0aFNxcih2aWV3KSA8IEVQU0lMT04gKiBFUFNJTE9OKSB7XG4gICAgICAgICAgICBNYXQzLmlkZW50aXR5KG91dCk7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9XG5cbiAgICAgICAgdXAgPSB1cCB8fCBWZWMzLlVOSVRfWTtcbiAgICAgICAgVmVjMy5ub3JtYWxpemUodjNfMSwgVmVjMy5jcm9zcyh2M18xLCB1cCwgdmlldykpO1xuXG4gICAgICAgIGlmIChWZWMzLmxlbmd0aFNxcih2M18xKSA8IEVQU0lMT04gKiBFUFNJTE9OKSB7XG4gICAgICAgICAgICBNYXQzLmlkZW50aXR5KG91dCk7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9XG5cbiAgICAgICAgVmVjMy5jcm9zcyh2M18yLCB2aWV3LCB2M18xKTtcbiAgICAgICAgTWF0My5zZXQoXG4gICAgICAgICAgICBvdXQsXG4gICAgICAgICAgICB2M18xLngsIHYzXzEueSwgdjNfMS56LFxuICAgICAgICAgICAgdjNfMi54LCB2M18yLnksIHYzXzIueixcbiAgICAgICAgICAgIHZpZXcueCwgdmlldy55LCB2aWV3LnosXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0cyB0aGUgZ2l2ZW4gbWF0cml4IHdpdGggYSB0cmFuc2xhdGlvbiB2ZWN0b3IgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IG1hdHJpeFxuICAgICAqIEB6aCDorqHnrpfkvY3np7vnn6npmLVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21UcmFuc2xhdGlvbiA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIHY6IFZlY0xpa2UpIHtcbiAgICAgICAgb3V0Lm0wMCA9IDE7XG4gICAgICAgIG91dC5tMDEgPSAwO1xuICAgICAgICBvdXQubTAyID0gMDtcbiAgICAgICAgb3V0Lm0wMyA9IDA7XG4gICAgICAgIG91dC5tMDQgPSAxO1xuICAgICAgICBvdXQubTA1ID0gMDtcbiAgICAgICAgb3V0Lm0wNiA9IHYueDtcbiAgICAgICAgb3V0Lm0wNyA9IHYueTtcbiAgICAgICAgb3V0Lm0wOCA9IDE7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgdGhlIGdpdmVuIG1hdHJpeCB3aXRoIGEgc2NhbGUgdmVjdG9yIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXhcbiAgICAgKiBAemgg6K6h566X57yp5pS+55+p6Zi1XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmcm9tU2NhbGluZyA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIHY6IFZlY0xpa2UpIHtcbiAgICAgICAgb3V0Lm0wMCA9IHYueDtcbiAgICAgICAgb3V0Lm0wMSA9IDA7XG4gICAgICAgIG91dC5tMDIgPSAwO1xuXG4gICAgICAgIG91dC5tMDMgPSAwO1xuICAgICAgICBvdXQubTA0ID0gdi55O1xuICAgICAgICBvdXQubTA1ID0gMDtcblxuICAgICAgICBvdXQubTA2ID0gMDtcbiAgICAgICAgb3V0Lm0wNyA9IDA7XG4gICAgICAgIG91dC5tMDggPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXRzIHRoZSBnaXZlbiBtYXRyaXggd2l0aCBhIGdpdmVuIGFuZ2xlIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBtYXRyaXhcbiAgICAgKiBAemgg6K6h566X5peL6L2s55+p6Zi1XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmcm9tUm90YXRpb24gPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCByYWQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKTsgY29uc3QgYyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICAgICAgb3V0Lm0wMCA9IGM7XG4gICAgICAgIG91dC5tMDEgPSBzO1xuICAgICAgICBvdXQubTAyID0gMDtcblxuICAgICAgICBvdXQubTAzID0gLXM7XG4gICAgICAgIG91dC5tMDQgPSBjO1xuICAgICAgICBvdXQubTA1ID0gMDtcblxuICAgICAgICBvdXQubTA2ID0gMDtcbiAgICAgICAgb3V0Lm0wNyA9IDA7XG4gICAgICAgIG91dC5tMDggPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXRzIHRoZSBnaXZlbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gcXVhdGVybmlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XG4gICAgICogQHpoIOagueaNruWbm+WFg+aVsOaXi+i9rOS/oeaBr+iuoeeul+efqemYtVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVF1YXQgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCBxOiBJUXVhdExpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IHEueDsgY29uc3QgeSA9IHEueTsgY29uc3QgeiA9IHEuejsgY29uc3QgdyA9IHEudztcbiAgICAgICAgY29uc3QgeDIgPSB4ICsgeDtcbiAgICAgICAgY29uc3QgeTIgPSB5ICsgeTtcbiAgICAgICAgY29uc3QgejIgPSB6ICsgejtcblxuICAgICAgICBjb25zdCB4eCA9IHggKiB4MjtcbiAgICAgICAgY29uc3QgeXggPSB5ICogeDI7XG4gICAgICAgIGNvbnN0IHl5ID0geSAqIHkyO1xuICAgICAgICBjb25zdCB6eCA9IHogKiB4MjtcbiAgICAgICAgY29uc3QgenkgPSB6ICogeTI7XG4gICAgICAgIGNvbnN0IHp6ID0geiAqIHoyO1xuICAgICAgICBjb25zdCB3eCA9IHcgKiB4MjtcbiAgICAgICAgY29uc3Qgd3kgPSB3ICogeTI7XG4gICAgICAgIGNvbnN0IHd6ID0gdyAqIHoyO1xuXG4gICAgICAgIG91dC5tMDAgPSAxIC0geXkgLSB6ejtcbiAgICAgICAgb3V0Lm0wMyA9IHl4IC0gd3o7XG4gICAgICAgIG91dC5tMDYgPSB6eCArIHd5O1xuXG4gICAgICAgIG91dC5tMDEgPSB5eCArIHd6O1xuICAgICAgICBvdXQubTA0ID0gMSAtIHh4IC0geno7XG4gICAgICAgIG91dC5tMDcgPSB6eSAtIHd4O1xuXG4gICAgICAgIG91dC5tMDIgPSB6eCAtIHd5O1xuICAgICAgICBvdXQubTA1ID0genkgKyB3eDtcbiAgICAgICAgb3V0Lm0wOCA9IDEgLSB4eCAtIHl5O1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHVwcGVyLWxlZnQgM3gzIG1hdHJpeCBvZiBhIDR4NCBtYXRyaXgncyBpbnZlcnNlIHRyYW5zcG9zZVxuICAgICAqIEB6aCDorqHnrpfmjIflrprlm5vnu7Tnn6npmLXnmoTpgIbovaznva7kuInnu7Tnn6npmLVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGludmVyc2VUcmFuc3Bvc2VNYXQ0IDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2U+IChvdXQ6IE91dCwgYTogSU1hdDRMaWtlKSB7XG4gICAgICAgIGNvbnN0IGEwMCA9IGEubTAwOyBjb25zdCBhMDEgPSBhLm0wMTsgY29uc3QgYTAyID0gYS5tMDI7IGNvbnN0IGEwMyA9IGEubTAzO1xuICAgICAgICBjb25zdCBhMTAgPSBhLm0wNDsgY29uc3QgYTExID0gYS5tMDU7IGNvbnN0IGExMiA9IGEubTA2OyBjb25zdCBhMTMgPSBhLm0wNztcbiAgICAgICAgY29uc3QgYTIwID0gYS5tMDg7IGNvbnN0IGEyMSA9IGEubTA5OyBjb25zdCBhMjIgPSBhLm0xMDsgY29uc3QgYTIzID0gYS5tMTE7XG4gICAgICAgIGNvbnN0IGEzMCA9IGEubTEyOyBjb25zdCBhMzEgPSBhLm0xMzsgY29uc3QgYTMyID0gYS5tMTQ7IGNvbnN0IGEzMyA9IGEubTE1O1xuXG4gICAgICAgIGNvbnN0IGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMDtcbiAgICAgICAgY29uc3QgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwO1xuICAgICAgICBjb25zdCBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTA7XG4gICAgICAgIGNvbnN0IGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMTtcbiAgICAgICAgY29uc3QgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExO1xuICAgICAgICBjb25zdCBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTI7XG4gICAgICAgIGNvbnN0IGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMDtcbiAgICAgICAgY29uc3QgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwO1xuICAgICAgICBjb25zdCBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzA7XG4gICAgICAgIGNvbnN0IGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMTtcbiAgICAgICAgY29uc3QgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxO1xuICAgICAgICBjb25zdCBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgICAgICBsZXQgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gICAgICAgIGlmICghZGV0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBkZXQgPSAxLjAgLyBkZXQ7XG5cbiAgICAgICAgb3V0Lm0wMCA9IChhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDkpICogZGV0O1xuICAgICAgICBvdXQubTAxID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gICAgICAgIG91dC5tMDIgPSAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldDtcblxuICAgICAgICBvdXQubTAzID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gICAgICAgIG91dC5tMDQgPSAoYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3KSAqIGRldDtcbiAgICAgICAgb3V0Lm0wNSA9IChhMDEgKiBiMDggLSBhMDAgKiBiMTAgLSBhMDMgKiBiMDYpICogZGV0O1xuXG4gICAgICAgIG91dC5tMDYgPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcbiAgICAgICAgb3V0Lm0wNyA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xuICAgICAgICBvdXQubTA4ID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVHJhbnNmb3JtIGEgbWF0cml4IG9iamVjdCB0byBhIGZsYXQgYXJyYXlcbiAgICAgKiBAemgg55+p6Zi16L2s5pWw57uEXG4gICAgICogQHBhcmFtIG9mcyBBcnJheSBTdGFydCBPZmZzZXRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRvQXJyYXkgPE91dD4gKG91dDogT3V0LCBtOiBJTWF0M0xpa2UsIG9mcyA9IDApIHtcbiAgICAgICAgb3V0W29mcyArIDBdID0gbS5tMDA7XG4gICAgICAgIG91dFtvZnMgKyAxXSA9IG0ubTAxO1xuICAgICAgICBvdXRbb2ZzICsgMl0gPSBtLm0wMjtcbiAgICAgICAgb3V0W29mcyArIDNdID0gbS5tMDM7XG4gICAgICAgIG91dFtvZnMgKyA0XSA9IG0ubTA0O1xuICAgICAgICBvdXRbb2ZzICsgNV0gPSBtLm0wNTtcbiAgICAgICAgb3V0W29mcyArIDZdID0gbS5tMDY7XG4gICAgICAgIG91dFtvZnMgKyA3XSA9IG0ubTA3O1xuICAgICAgICBvdXRbb2ZzICsgOF0gPSBtLm0wODtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gR2VuZXJhdGVzIG9yIHNldHMgYSBtYXRyaXggd2l0aCBhIGZsYXQgYXJyYXlcbiAgICAgKiBAemgg5pWw57uE6L2s55+p6Zi1XG4gICAgICogQHBhcmFtIG9mcyBBcnJheSBTdGFydCBPZmZzZXRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21BcnJheSA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGFyciwgb2ZzID0gMCkge1xuICAgICAgICBvdXQubTAwID0gYXJyW29mcyArIDBdO1xuICAgICAgICBvdXQubTAxID0gYXJyW29mcyArIDFdO1xuICAgICAgICBvdXQubTAyID0gYXJyW29mcyArIDJdO1xuICAgICAgICBvdXQubTAzID0gYXJyW29mcyArIDNdO1xuICAgICAgICBvdXQubTA0ID0gYXJyW29mcyArIDRdO1xuICAgICAgICBvdXQubTA1ID0gYXJyW29mcyArIDVdO1xuICAgICAgICBvdXQubTA2ID0gYXJyW29mcyArIDZdO1xuICAgICAgICBvdXQubTA3ID0gYXJyW29mcyArIDddO1xuICAgICAgICBvdXQubTA4ID0gYXJyW29mcyArIDhdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBBZGRzIHR3byBtYXRyaWNlcyBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XG4gICAgICogQHpoIOmAkOWFg+e0oOefqemYteWKoOazlVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkIDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgb3V0Lm0wMCA9IGEubTAwICsgYi5tMDA7XG4gICAgICAgIG91dC5tMDEgPSBhLm0wMSArIGIubTAxO1xuICAgICAgICBvdXQubTAyID0gYS5tMDIgKyBiLm0wMjtcbiAgICAgICAgb3V0Lm0wMyA9IGEubTAzICsgYi5tMDM7XG4gICAgICAgIG91dC5tMDQgPSBhLm0wNCArIGIubTA0O1xuICAgICAgICBvdXQubTA1ID0gYS5tMDUgKyBiLm0wNTtcbiAgICAgICAgb3V0Lm0wNiA9IGEubTA2ICsgYi5tMDY7XG4gICAgICAgIG91dC5tMDcgPSBhLm0wNyArIGIubTA3O1xuICAgICAgICBvdXQubTA4ID0gYS5tMDggKyBiLm0wODtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU3VidHJhY3RzIG1hdHJpeCBiIGZyb20gbWF0cml4IGEgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IG1hdHJpeFxuICAgICAqIEB6aCDpgJDlhYPntKDnn6npmLXlh4/ms5VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHN1YnRyYWN0IDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgb3V0Lm0wMCA9IGEubTAwIC0gYi5tMDA7XG4gICAgICAgIG91dC5tMDEgPSBhLm0wMSAtIGIubTAxO1xuICAgICAgICBvdXQubTAyID0gYS5tMDIgLSBiLm0wMjtcbiAgICAgICAgb3V0Lm0wMyA9IGEubTAzIC0gYi5tMDM7XG4gICAgICAgIG91dC5tMDQgPSBhLm0wNCAtIGIubTA0O1xuICAgICAgICBvdXQubTA1ID0gYS5tMDUgLSBiLm0wNTtcbiAgICAgICAgb3V0Lm0wNiA9IGEubTA2IC0gYi5tMDY7XG4gICAgICAgIG91dC5tMDcgPSBhLm0wNyAtIGIubTA3O1xuICAgICAgICBvdXQubTA4ID0gYS5tMDggLSBiLm0wODtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gTXVsdGlwbHkgZWFjaCBlbGVtZW50IG9mIGEgbWF0cml4IGJ5IGEgc2NhbGFyIG51bWJlciBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgbWF0cml4XG4gICAgICogQHpoIOefqemYteagh+mHj+S5mOazlVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbXVsdGlwbHlTY2FsYXIgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IG51bWJlcikge1xuICAgICAgICBvdXQubTAwID0gYS5tMDAgKiBiO1xuICAgICAgICBvdXQubTAxID0gYS5tMDEgKiBiO1xuICAgICAgICBvdXQubTAyID0gYS5tMDIgKiBiO1xuICAgICAgICBvdXQubTAzID0gYS5tMDMgKiBiO1xuICAgICAgICBvdXQubTA0ID0gYS5tMDQgKiBiO1xuICAgICAgICBvdXQubTA1ID0gYS5tMDUgKiBiO1xuICAgICAgICBvdXQubTA2ID0gYS5tMDYgKiBiO1xuICAgICAgICBvdXQubTA3ID0gYS5tMDcgKiBiO1xuICAgICAgICBvdXQubTA4ID0gYS5tMDggKiBiO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBBZGRzIHR3byBtYXRyaWNlcyBhZnRlciBtdWx0aXBseWluZyBlYWNoIGVsZW1lbnQgb2YgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIG51bWJlci4gQW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IG1hdHJpeC5cbiAgICAgKiBAemgg6YCQ5YWD57Sg55+p6Zi15qCH6YeP5LmY5YqgOiBBICsgQiAqIHNjYWxlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBtdWx0aXBseVNjYWxhckFuZEFkZCA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCBzY2FsZTogbnVtYmVyKSB7XG4gICAgICAgIG91dC5tMDAgPSBiLm0wMCAqIHNjYWxlICsgYS5tMDA7XG4gICAgICAgIG91dC5tMDEgPSBiLm0wMSAqIHNjYWxlICsgYS5tMDE7XG4gICAgICAgIG91dC5tMDIgPSBiLm0wMiAqIHNjYWxlICsgYS5tMDI7XG4gICAgICAgIG91dC5tMDMgPSBiLm0wMyAqIHNjYWxlICsgYS5tMDM7XG4gICAgICAgIG91dC5tMDQgPSBiLm0wNCAqIHNjYWxlICsgYS5tMDQ7XG4gICAgICAgIG91dC5tMDUgPSBiLm0wNSAqIHNjYWxlICsgYS5tMDU7XG4gICAgICAgIG91dC5tMDYgPSBiLm0wNiAqIHNjYWxlICsgYS5tMDY7XG4gICAgICAgIG91dC5tMDcgPSBiLm0wNyAqIHNjYWxlICsgYS5tMDc7XG4gICAgICAgIG91dC5tMDggPSBiLm0wOCAqIHNjYWxlICsgYS5tMDg7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFJldHVybnMgd2hldGhlciB0aGUgc3BlY2lmaWVkIG1hdHJpY2VzIGFyZSBlcXVhbC5cbiAgICAgKiBAemgg55+p6Zi1562J5Lu35Yik5patXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzdHJpY3RFcXVhbHMgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIHJldHVybiBhLm0wMCA9PT0gYi5tMDAgJiYgYS5tMDEgPT09IGIubTAxICYmIGEubTAyID09PSBiLm0wMlxuICAgICAgICAgICAgJiYgYS5tMDMgPT09IGIubTAzICYmIGEubTA0ID09PSBiLm0wNCAmJiBhLm0wNSA9PT0gYi5tMDVcbiAgICAgICAgICAgICYmIGEubTA2ID09PSBiLm0wNiAmJiBhLm0wNyA9PT0gYi5tMDcgJiYgYS5tMDggPT09IGIubTA4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBSZXR1cm5zIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBtYXRyaWNlcyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbC5cbiAgICAgKiBAemgg5o6S6Zmk5rWu54K55pWw6K+v5beu55qE55+p6Zi16L+R5Ly8562J5Lu35Yik5patXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBlcXVhbHMgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uID0gRVBTSUxPTikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgTWF0aC5hYnMoYS5tMDAgLSBiLm0wMCkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMDApLCBNYXRoLmFicyhiLm0wMCkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0wMSAtIGIubTAxKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0wMSksIE1hdGguYWJzKGIubTAxKSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEubTAyIC0gYi5tMDIpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTAyKSwgTWF0aC5hYnMoYi5tMDIpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5tMDMgLSBiLm0wMykgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMDMpLCBNYXRoLmFicyhiLm0wMykpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0wNCAtIGIubTA0KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0wNCksIE1hdGguYWJzKGIubTA0KSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEubTA1IC0gYi5tMDUpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTA1KSwgTWF0aC5hYnMoYi5tMDUpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5tMDYgLSBiLm0wNikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5tMDYpLCBNYXRoLmFicyhiLm0wNikpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLm0wNyAtIGIubTA3KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLm0wNyksIE1hdGguYWJzKGIubTA3KSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEubTA4IC0gYi5tMDgpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEubTA4KSwgTWF0aC5hYnMoYi5tMDgpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMCByb3cgMCBvZiB0aGUgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXnrKwgMCDliJfnrKwgMCDooYznmoTlhYPntKDjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSBtMDA6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMCByb3cgMSBvZiB0aGUgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXnrKwgMCDliJfnrKwgMSDooYznmoTlhYPntKDjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSBtMDE6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMCByb3cgMiBvZiB0aGUgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXnrKwgMCDliJfnrKwgMiDooYznmoTlhYPntKDjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSBtMDI6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMSByb3cgMCBvZiB0aGUgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXnrKwgMSDliJfnrKwgMCDooYznmoTlhYPntKDjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSBtMDM6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMSByb3cgMSBvZiB0aGUgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXnrKwgMSDliJfnrKwgMSDooYznmoTlhYPntKDjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSBtMDQ6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMSByb3cgMiBvZiB0aGUgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXnrKwgMSDliJfnrKwgMiDooYznmoTlhYPntKDjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSBtMDU6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMiByb3cgMCBvZiB0aGUgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXnrKwgMiDliJfnrKwgMCDooYznmoTlhYPntKDjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSBtMDY6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMiByb3cgMSBvZiB0aGUgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXnrKwgMiDliJfnrKwgMSDooYznmoTlhYPntKDjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSBtMDc6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiBWYWx1ZSBhdCBjb2x1bW4gMiByb3cgMiBvZiB0aGUgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXnrKwgMiDliJfnrKwgMiDooYznmoTlhYPntKDjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSBtMDg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yIChvdGhlcjogTWF0Myk7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIG0wMD86IG51bWJlciwgbTAxPzogbnVtYmVyLCBtMDI/OiBudW1iZXIsXG4gICAgICAgIG0wMz86IG51bWJlciwgbTA0PzogbnVtYmVyLCBtMDU/OiBudW1iZXIsXG4gICAgICAgIG0wNj86IG51bWJlciwgbTA3PzogbnVtYmVyLCBtMDg/OiBudW1iZXIpO1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICBtMDA6IG51bWJlciB8IE1hdDMgPSAxLCBtMDEgPSAwLCBtMDIgPSAwLFxuICAgICAgICBtMDMgPSAwLCBtMDQgPSAxLCBtMDUgPSAwLFxuICAgICAgICBtMDYgPSAwLCBtMDcgPSAwLCBtMDggPSAxLFxuICAgICkge1xuICAgICAgICBpZiAodHlwZW9mIG0wMCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMubTAwID0gbTAwLm0wMDsgdGhpcy5tMDEgPSBtMDAubTAxOyB0aGlzLm0wMiA9IG0wMC5tMDI7XG4gICAgICAgICAgICB0aGlzLm0wMyA9IG0wMC5tMDM7IHRoaXMubTA0ID0gbTAwLm0wNDsgdGhpcy5tMDUgPSBtMDAubTA1O1xuICAgICAgICAgICAgdGhpcy5tMDYgPSBtMDAubTA2OyB0aGlzLm0wNyA9IG0wMC5tMDc7IHRoaXMubTA4ID0gbTAwLm0wODtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubTAwID0gbTAwOyB0aGlzLm0wMSA9IG0wMTsgdGhpcy5tMDIgPSBtMDI7XG4gICAgICAgICAgICB0aGlzLm0wMyA9IG0wMzsgdGhpcy5tMDQgPSBtMDQ7IHRoaXMubTA1ID0gbTA1O1xuICAgICAgICAgICAgdGhpcy5tMDYgPSBtMDY7IHRoaXMubTA3ID0gbTA3OyB0aGlzLm0wOCA9IG0wODtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDbG9uZSBhIG5ldyBtYXRyaXggZnJvbSB0aGUgY3VycmVudCBtYXRyaXguXG4gICAgICogQHpoIOWFi+mahuW9k+WJjeefqemYteOAglxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9uZSAoKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IE1hdDMoXG4gICAgICAgICAgICB0Lm0wMCwgdC5tMDEsIHQubTAyLFxuICAgICAgICAgICAgdC5tMDMsIHQubTA0LCB0Lm0wNSxcbiAgICAgICAgICAgIHQubTA2LCB0Lm0wNywgdC5tMDgsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgdGhlIG1hdHJpeCB3aXRoIGFub3RoZXIgb25lJ3MgdmFsdWUuXG4gICAgICogQHpoIOiuvue9ruW9k+WJjeefqemYteS9v+WFtuS4juaMh+WumuefqemYteebuOetieOAglxuICAgICAqIEBwYXJhbSBvdGhlciBTcGVjaWZpZWQgbWF0cml4XG4gICAgICogQHJldHVybiB0aGlzXG4gICAgICovXG4gICAgcHVibGljIHNldCAob3RoZXI6IE1hdDMpO1xuXG4gICAgLyoqXG4gICAgICogQGVuIFNldCB0aGUgbWF0cml4IHdpdGggdmFsdWVzIG9mIGFsbCBlbGVtZW50c1xuICAgICAqIEB6aCDorr7nva7lvZPliY3nn6npmLXmjIflrprlhYPntKDlgLzjgIJcbiAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IChtMDA/OiBudW1iZXIsIG0wMT86IG51bWJlciwgbTAyPzogbnVtYmVyLFxuICAgICAgICBtMDM/OiBudW1iZXIsIG0wND86IG51bWJlciwgbTA1PzogbnVtYmVyLFxuICAgICAgICBtMDY/OiBudW1iZXIsIG0wNz86IG51bWJlciwgbTA4PzogbnVtYmVyKTtcblxuICAgIHB1YmxpYyBzZXQgKG0wMDogbnVtYmVyIHwgTWF0MyA9IDEsIG0wMSA9IDAsIG0wMiA9IDAsXG4gICAgICAgIG0wMyA9IDAsIG0wNCA9IDEsIG0wNSA9IDAsXG4gICAgICAgIG0wNiA9IDAsIG0wNyA9IDAsIG0wOCA9IDEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtMDAgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLm0wMCA9IG0wMC5tMDA7IHRoaXMubTAxID0gbTAwLm0wMTsgdGhpcy5tMDIgPSBtMDAubTAyO1xuICAgICAgICAgICAgdGhpcy5tMDMgPSBtMDAubTAzOyB0aGlzLm0wNCA9IG0wMC5tMDQ7IHRoaXMubTA1ID0gbTAwLm0wNTtcbiAgICAgICAgICAgIHRoaXMubTA2ID0gbTAwLm0wNjsgdGhpcy5tMDcgPSBtMDAubTA3OyB0aGlzLm0wOCA9IG0wMC5tMDg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm0wMCA9IG0wMDsgdGhpcy5tMDEgPSBtMDE7IHRoaXMubTAyID0gbTAyO1xuICAgICAgICAgICAgdGhpcy5tMDMgPSBtMDM7IHRoaXMubTA0ID0gbTA0OyB0aGlzLm0wNSA9IG0wNTtcbiAgICAgICAgICAgIHRoaXMubTA2ID0gbTA2OyB0aGlzLm0wNyA9IG0wNzsgdGhpcy5tMDggPSBtMDg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFJldHVybnMgd2hldGhlciB0aGUgc3BlY2lmaWVkIG1hdHJpY2VzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsLlxuICAgICAqIEB6aCDliKTmlq3lvZPliY3nn6npmLXmmK/lkKblnKjor6/lt67ojIPlm7TlhoXkuI7mjIflrprnn6npmLXnm7jnrYnjgIJcbiAgICAgKiBAcGFyYW0gb3RoZXIgQ29tcGFyYXRpdmUgbWF0cml4XG4gICAgICogQHBhcmFtIGVwc2lsb24gVGhlIGVycm9yIGFsbG93ZWQuIEl0YHMgc2hvdWxkIGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci5cbiAgICAgKiBAcmV0dXJuIFJldHVybnMgYHRydWUnIHdoZW4gdGhlIGVsZW1lbnRzIG9mIGJvdGggbWF0cmljZXMgYXJlIGVxdWFsOyBvdGhlcndpc2UgcmV0dXJucyBgZmFsc2UnLlxuICAgICAqL1xuICAgIHB1YmxpYyBlcXVhbHMgKG90aGVyOiBNYXQzLCBlcHNpbG9uID0gRVBTSUxPTik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy5tMDAgLSBvdGhlci5tMDApIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTAwKSwgTWF0aC5hYnMob3RoZXIubTAwKSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMubTAxIC0gb3RoZXIubTAxKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLm0wMSksIE1hdGguYWJzKG90aGVyLm0wMSkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0wMiAtIG90aGVyLm0wMikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMDIpLCBNYXRoLmFicyhvdGhlci5tMDIpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMDMgLSBvdGhlci5tMDMpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTAzKSwgTWF0aC5hYnMob3RoZXIubTAzKSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMubTA0IC0gb3RoZXIubTA0KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLm0wNCksIE1hdGguYWJzKG90aGVyLm0wNCkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0wNSAtIG90aGVyLm0wNSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMDUpLCBNYXRoLmFicyhvdGhlci5tMDUpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy5tMDYgLSBvdGhlci5tMDYpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMubTA2KSwgTWF0aC5hYnMob3RoZXIubTA2KSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMubTA3IC0gb3RoZXIubTA3KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLm0wNyksIE1hdGguYWJzKG90aGVyLm0wNykpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLm0wOCAtIG90aGVyLm0wOCkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy5tMDgpLCBNYXRoLmFicyhvdGhlci5tMDgpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBSZXR1cm5zIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBtYXRyaWNlcyBhcmUgZXF1YWwuXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeefqemYteaYr+WQpuS4juaMh+WumuefqemYteebuOetieOAglxuICAgICAqIEBwYXJhbSBvdGhlciBDb21wYXJhdGl2ZSBtYXRyaXhcbiAgICAgKiBAcmV0dXJuIFJldHVybnMgYHRydWUnIHdoZW4gdGhlIGVsZW1lbnRzIG9mIGJvdGggbWF0cmljZXMgYXJlIGVxdWFsOyBvdGhlcndpc2UgcmV0dXJucyBgZmFsc2UnLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdHJpY3RFcXVhbHMgKG90aGVyOiBNYXQzKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm0wMCA9PT0gb3RoZXIubTAwICYmIHRoaXMubTAxID09PSBvdGhlci5tMDEgJiYgdGhpcy5tMDIgPT09IG90aGVyLm0wMlxuICAgICAgICAgICAgJiYgdGhpcy5tMDMgPT09IG90aGVyLm0wMyAmJiB0aGlzLm0wNCA9PT0gb3RoZXIubTA0ICYmIHRoaXMubTA1ID09PSBvdGhlci5tMDVcbiAgICAgICAgICAgICYmIHRoaXMubTA2ID09PSBvdGhlci5tMDYgJiYgdGhpcy5tMDcgPT09IG90aGVyLm0wNyAmJiB0aGlzLm0wOCA9PT0gb3RoZXIubTA4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0cml4LlxuICAgICAqIEB6aCDov5Tlm57lvZPliY3nn6npmLXnmoTlrZfnrKbkuLLooajnpLrjgIJcbiAgICAgKiBAcmV0dXJuIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBtYXRyaXhcbiAgICAgKi9cbiAgICBwdWJsaWMgdG9TdHJpbmcgKCkge1xuICAgICAgICBjb25zdCB0ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGBbXFxuJHtcbiAgICAgICAgICAgIHQubTAwfSwgJHt0Lm0wMX0sICR7dC5tMDJ9LFxcbiR7XG4gICAgICAgICAgICB0Lm0wM30sXFxuJHt0Lm0wNH0sICR7dC5tMDV9LFxcbiR7XG4gICAgICAgICAgICB0Lm0wNn0sICR7dC5tMDd9LFxcbiR7dC5tMDh9XFxuYFxuICAgICAgICAgICAgKyBgXWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIHNldCB0aGUgY3VycmVudCBtYXRyaXggdG8gYW4gaWRlbnRpdHkgbWF0cml4LlxuICAgICAqIEB6aCDlsIblvZPliY3nn6npmLXorr7kuLrljZXkvY3nn6npmLXjgIJcbiAgICAgKiBAcmV0dXJuIGB0aGlzYFxuICAgICAqL1xuICAgIHB1YmxpYyBpZGVudGl0eSAoKSB7XG4gICAgICAgIHRoaXMubTAwID0gMTtcbiAgICAgICAgdGhpcy5tMDEgPSAwO1xuICAgICAgICB0aGlzLm0wMiA9IDA7XG4gICAgICAgIHRoaXMubTAzID0gMDtcbiAgICAgICAgdGhpcy5tMDQgPSAxO1xuICAgICAgICB0aGlzLm0wNSA9IDA7XG4gICAgICAgIHRoaXMubTA2ID0gMDtcbiAgICAgICAgdGhpcy5tMDcgPSAwO1xuICAgICAgICB0aGlzLm0wOCA9IDE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBUcmFuc3Bvc2VzIHRoZSBjdXJyZW50IG1hdHJpeC5cbiAgICAgKiBAemgg6K6h566X5b2T5YmN55+p6Zi155qE6L2s572u55+p6Zi144CCXG4gICAgICovXG4gICAgcHVibGljIHRyYW5zcG9zZSAoKSB7XG4gICAgICAgIGNvbnN0IGEwMSA9IHRoaXMubTAxOyBjb25zdCBhMDIgPSB0aGlzLm0wMjsgY29uc3QgYTEyID0gdGhpcy5tMDU7XG4gICAgICAgIHRoaXMubTAxID0gdGhpcy5tMDM7XG4gICAgICAgIHRoaXMubTAyID0gdGhpcy5tMDY7XG4gICAgICAgIHRoaXMubTAzID0gYTAxO1xuICAgICAgICB0aGlzLm0wNSA9IHRoaXMubTA3O1xuICAgICAgICB0aGlzLm0wNiA9IGEwMjtcbiAgICAgICAgdGhpcy5tMDcgPSBhMTI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBJbnZlcnRzIHRoZSBjdXJyZW50IG1hdHJpeC4gV2hlbiBtYXRyaXggaXMgbm90IGludmVydGlibGUgdGhlIG1hdHJpeCB3aWxsIGJlIHNldCB0byB6ZXJvcy5cbiAgICAgKiBAemgg6K6h566X5b2T5YmN55+p6Zi155qE6YCG55+p6Zi144CC5rOo5oSP77yM5Zyo55+p6Zi15LiN5Y+v6YCG5pe277yM5Lya6L+U5Zue5LiA5Liq5YWo5Li6IDAg55qE55+p6Zi144CCXG4gICAgICovXG4gICAgcHVibGljIGludmVydCAoKSB7XG4gICAgICAgIGNvbnN0IGEwMCA9IHRoaXMubTAwOyBjb25zdCBhMDEgPSB0aGlzLm0wMTsgY29uc3QgYTAyID0gdGhpcy5tMDI7XG4gICAgICAgIGNvbnN0IGExMCA9IHRoaXMubTAzOyBjb25zdCBhMTEgPSB0aGlzLm0wNDsgY29uc3QgYTEyID0gdGhpcy5tMDU7XG4gICAgICAgIGNvbnN0IGEyMCA9IHRoaXMubTA2OyBjb25zdCBhMjEgPSB0aGlzLm0wNzsgY29uc3QgYTIyID0gdGhpcy5tMDg7XG5cbiAgICAgICAgY29uc3QgYjAxID0gYTIyICogYTExIC0gYTEyICogYTIxO1xuICAgICAgICBjb25zdCBiMTEgPSAtYTIyICogYTEwICsgYTEyICogYTIwO1xuICAgICAgICBjb25zdCBiMjEgPSBhMjEgKiBhMTAgLSBhMTEgKiBhMjA7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgICAgICBsZXQgZGV0ID0gYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxO1xuXG4gICAgICAgIGlmIChkZXQgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgICAgIHRoaXMubTAwID0gYjAxICogZGV0O1xuICAgICAgICB0aGlzLm0wMSA9ICgtYTIyICogYTAxICsgYTAyICogYTIxKSAqIGRldDtcbiAgICAgICAgdGhpcy5tMDIgPSAoYTEyICogYTAxIC0gYTAyICogYTExKSAqIGRldDtcbiAgICAgICAgdGhpcy5tMDMgPSBiMTEgKiBkZXQ7XG4gICAgICAgIHRoaXMubTA0ID0gKGEyMiAqIGEwMCAtIGEwMiAqIGEyMCkgKiBkZXQ7XG4gICAgICAgIHRoaXMubTA1ID0gKC1hMTIgKiBhMDAgKyBhMDIgKiBhMTApICogZGV0O1xuICAgICAgICB0aGlzLm0wNiA9IGIyMSAqIGRldDtcbiAgICAgICAgdGhpcy5tMDcgPSAoLWEyMSAqIGEwMCArIGEwMSAqIGEyMCkgKiBkZXQ7XG4gICAgICAgIHRoaXMubTA4ID0gKGExMSAqIGEwMCAtIGEwMSAqIGExMCkgKiBkZXQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiB0aGUgY3VycmVudCBtYXRyaXguXG4gICAgICogQHpoIOiuoeeul+W9k+WJjeefqemYteeahOihjOWIl+W8j+OAglxuICAgICAqIEByZXR1cm4g5b2T5YmN55+p6Zi155qE6KGM5YiX5byP44CCXG4gICAgICovXG4gICAgcHVibGljIGRldGVybWluYW50ICgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBhMDAgPSB0aGlzLm0wMDsgY29uc3QgYTAxID0gdGhpcy5tMDE7IGNvbnN0IGEwMiA9IHRoaXMubTAyO1xuICAgICAgICBjb25zdCBhMTAgPSB0aGlzLm0wMzsgY29uc3QgYTExID0gdGhpcy5tMDQ7IGNvbnN0IGExMiA9IHRoaXMubTA1O1xuICAgICAgICBjb25zdCBhMjAgPSB0aGlzLm0wNjsgY29uc3QgYTIxID0gdGhpcy5tMDc7IGNvbnN0IGEyMiA9IHRoaXMubTA4O1xuXG4gICAgICAgIHJldHVybiBhMDAgKiAoYTIyICogYTExIC0gYTEyICogYTIxKSArIGEwMSAqICgtYTIyICogYTEwICsgYTEyICogYTIwKSArIGEwMiAqIChhMjEgKiBhMTAgLSBhMTEgKiBhMjApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBBZGRzIHRoZSBjdXJyZW50IG1hdHJpeCBhbmQgYW5vdGhlciBtYXRyaXggdG8gdGhlIGN1cnJlbnQgbWF0cml4LlxuICAgICAqIEB6aCDnn6npmLXliqDms5XjgILlsIblvZPliY3nn6npmLXkuI7mjIflrprnn6npmLXnmoTnm7jliqDvvIznu5Pmnpzov5Tlm57nu5nlvZPliY3nn6npmLXjgIJcbiAgICAgKiBAcGFyYW0gbWF0IHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqL1xuICAgIHB1YmxpYyBhZGQgKG1hdDogTWF0Mykge1xuICAgICAgICB0aGlzLm0wMCArPSBtYXQubTAwO1xuICAgICAgICB0aGlzLm0wMSArPSBtYXQubTAxO1xuICAgICAgICB0aGlzLm0wMiArPSBtYXQubTAyO1xuICAgICAgICB0aGlzLm0wMyArPSBtYXQubTAzO1xuICAgICAgICB0aGlzLm0wNCArPSBtYXQubTA0O1xuICAgICAgICB0aGlzLm0wNSArPSBtYXQubTA1O1xuICAgICAgICB0aGlzLm0wNiArPSBtYXQubTA2O1xuICAgICAgICB0aGlzLm0wNyArPSBtYXQubTA3O1xuICAgICAgICB0aGlzLm0wOCArPSBtYXQubTA4O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU3VidHJhY3RzIGFub3RoZXIgbWF0cml4IGZyb20gdGhlIGN1cnJlbnQgbWF0cml4LlxuICAgICAqIEB6aCDorqHnrpfnn6npmLXlh4/ms5XjgILlsIblvZPliY3nn6npmLXlh4/ljrvmjIflrprnn6npmLXnmoTnu5PmnpzotYvlgLznu5nlvZPliY3nn6npmLXjgIJcbiAgICAgKiBAcGFyYW0gbWF0IHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqL1xuICAgIHB1YmxpYyBzdWJ0cmFjdCAobWF0OiBNYXQzKSB7XG4gICAgICAgIHRoaXMubTAwIC09IG1hdC5tMDA7XG4gICAgICAgIHRoaXMubTAxIC09IG1hdC5tMDE7XG4gICAgICAgIHRoaXMubTAyIC09IG1hdC5tMDI7XG4gICAgICAgIHRoaXMubTAzIC09IG1hdC5tMDM7XG4gICAgICAgIHRoaXMubTA0IC09IG1hdC5tMDQ7XG4gICAgICAgIHRoaXMubTA1IC09IG1hdC5tMDU7XG4gICAgICAgIHRoaXMubTA2IC09IG1hdC5tMDY7XG4gICAgICAgIHRoaXMubTA3IC09IG1hdC5tMDc7XG4gICAgICAgIHRoaXMubTA4IC09IG1hdC5tMDg7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBNdWx0aXBseSB0aGUgY3VycmVudCBtYXRyaXggd2l0aCBhbm90aGVyIG1hdHJpeC5cbiAgICAgKiBAemgg55+p6Zi15LmY5rOV44CC5bCG5b2T5YmN55+p6Zi15bem5LmY5oyH5a6a55+p6Zi155qE57uT5p6c6LWL5YC857uZ5b2T5YmN55+p6Zi144CCXG4gICAgICogQHBhcmFtIG1hdCB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKi9cbiAgICBwdWJsaWMgbXVsdGlwbHkgKG1hdDogTWF0Mykge1xuICAgICAgICBjb25zdCBhMDAgPSB0aGlzLm0wMDsgY29uc3QgYTAxID0gdGhpcy5tMDE7IGNvbnN0IGEwMiA9IHRoaXMubTAyO1xuICAgICAgICBjb25zdCBhMTAgPSB0aGlzLm0wMzsgY29uc3QgYTExID0gdGhpcy5tMDQ7IGNvbnN0IGExMiA9IHRoaXMubTA1O1xuICAgICAgICBjb25zdCBhMjAgPSB0aGlzLm0wNjsgY29uc3QgYTIxID0gdGhpcy5tMDc7IGNvbnN0IGEyMiA9IHRoaXMubTA4O1xuXG4gICAgICAgIGNvbnN0IGIwMCA9IG1hdC5tMDA7IGNvbnN0IGIwMSA9IG1hdC5tMDE7IGNvbnN0IGIwMiA9IG1hdC5tMDI7XG4gICAgICAgIGNvbnN0IGIxMCA9IG1hdC5tMDM7IGNvbnN0IGIxMSA9IG1hdC5tMDQ7IGNvbnN0IGIxMiA9IG1hdC5tMDU7XG4gICAgICAgIGNvbnN0IGIyMCA9IG1hdC5tMDY7IGNvbnN0IGIyMSA9IG1hdC5tMDc7IGNvbnN0IGIyMiA9IG1hdC5tMDg7XG5cbiAgICAgICAgdGhpcy5tMDAgPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjA7XG4gICAgICAgIHRoaXMubTAxID0gYjAwICogYTAxICsgYjAxICogYTExICsgYjAyICogYTIxO1xuICAgICAgICB0aGlzLm0wMiA9IGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMjtcblxuICAgICAgICB0aGlzLm0wMyA9IGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMDtcbiAgICAgICAgdGhpcy5tMDQgPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTEgKyBiMTIgKiBhMjE7XG4gICAgICAgIHRoaXMubTA1ID0gYjEwICogYTAyICsgYjExICogYTEyICsgYjEyICogYTIyO1xuXG4gICAgICAgIHRoaXMubTA2ID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYjIyICogYTIwO1xuICAgICAgICB0aGlzLm0wNyA9IGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMTtcbiAgICAgICAgdGhpcy5tMDggPSBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBNdWx0aXBseSBlYWNoIGVsZW1lbnQgb2YgdGhlIGN1cnJlbnQgbWF0cml4IGJ5IGEgc2NhbGFyIG51bWJlci5cbiAgICAgKiBAemgg55+p6Zi15pWw5LmY44CC5bCG5b2T5YmN55+p6Zi15LiO5oyH5a6a5qCH6YeP55qE5pWw5LmY57uT5p6c6LWL5YC857uZ5b2T5YmN55+p6Zi144CCXG4gICAgICogQHBhcmFtIHNjYWxhciBhbW91bnQgdG8gc2NhbGUgdGhlIG1hdHJpeCdzIGVsZW1lbnRzIGJ5XG4gICAgICovXG4gICAgcHVibGljIG11bHRpcGx5U2NhbGFyIChzY2FsYXI6IG51bWJlcikge1xuICAgICAgICB0aGlzLm0wMCAqPSBzY2FsYXI7XG4gICAgICAgIHRoaXMubTAxICo9IHNjYWxhcjtcbiAgICAgICAgdGhpcy5tMDIgKj0gc2NhbGFyO1xuICAgICAgICB0aGlzLm0wMyAqPSBzY2FsYXI7XG4gICAgICAgIHRoaXMubTA0ICo9IHNjYWxhcjtcbiAgICAgICAgdGhpcy5tMDUgKj0gc2NhbGFyO1xuICAgICAgICB0aGlzLm0wNiAqPSBzY2FsYXI7XG4gICAgICAgIHRoaXMubTA3ICo9IHNjYWxhcjtcbiAgICAgICAgdGhpcy5tMDggKj0gc2NhbGFyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gTXVsdGlwbHkgdGhlIGN1cnJlbnQgbWF0cml4IHdpdGggYSBzY2FsZSBtYXRyaXggZ2l2ZW4gYnkgYSBzY2FsZSB2ZWN0b3IuXG4gICAgICogQHpoIOWwhuW9k+WJjeefqemYteW3puS5mOe8qeaUvuefqemYteeahOe7k+aenOi1i+WAvOe7meW9k+WJjeefqemYte+8jOe8qeaUvuefqemYteeUseWQhOS4qui9tOeahOe8qeaUvue7meWHuuOAglxuICAgICAqIEBwYXJhbSB2ZWMgdmVjdG9yIHRvIHNjYWxlIGJ5XG4gICAgICovXG4gICAgcHVibGljIHNjYWxlICh2ZWM6IFZlYzMpIHtcbiAgICAgICAgY29uc3QgeCA9IHZlYy54OyBjb25zdCB5ID0gdmVjLnk7XG5cbiAgICAgICAgdGhpcy5tMDAgPSB4ICogdGhpcy5tMDA7XG4gICAgICAgIHRoaXMubTAxID0geCAqIHRoaXMubTAxO1xuICAgICAgICB0aGlzLm0wMiA9IHggKiB0aGlzLm0wMjtcblxuICAgICAgICB0aGlzLm0wMyA9IHkgKiB0aGlzLm0wMztcbiAgICAgICAgdGhpcy5tMDQgPSB5ICogdGhpcy5tMDQ7XG4gICAgICAgIHRoaXMubTA1ID0geSAqIHRoaXMubTA1O1xuXG4gICAgICAgIHRoaXMubTA2ID0gdGhpcy5tMDY7XG4gICAgICAgIHRoaXMubTA3ID0gdGhpcy5tMDc7XG4gICAgICAgIHRoaXMubTA4ID0gdGhpcy5tMDg7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBSb3RhdGVzIHRoZSBjdXJyZW50IG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUuXG4gICAgICogQHpoIOWwhuW9k+WJjeefqemYteW3puS5mOaXi+i9rOefqemYteeahOe7k+aenOi1i+WAvOe7meW9k+WJjeefqemYte+8jOaXi+i9rOefqemYteeUseaXi+i9rOi9tOWSjOaXi+i9rOinkuW6pue7meWHuuOAglxuICAgICAqIEBwYXJhbSByYWQgcmFkaXVzIG9mIHJvdGF0aW9uXG4gICAgICovXG4gICAgcHVibGljIHJvdGF0ZSAocmFkOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgYTAwID0gdGhpcy5tMDA7IGNvbnN0IGEwMSA9IHRoaXMubTAxOyBjb25zdCBhMDIgPSB0aGlzLm0wMjtcbiAgICAgICAgY29uc3QgYTEwID0gdGhpcy5tMDM7IGNvbnN0IGExMSA9IHRoaXMubTA0OyBjb25zdCBhMTIgPSB0aGlzLm0wNTtcbiAgICAgICAgY29uc3QgYTIwID0gdGhpcy5tMDY7IGNvbnN0IGEyMSA9IHRoaXMubTA3OyBjb25zdCBhMjIgPSB0aGlzLm0wODtcblxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICAgICAgdGhpcy5tMDAgPSBjICogYTAwICsgcyAqIGExMDtcbiAgICAgICAgdGhpcy5tMDEgPSBjICogYTAxICsgcyAqIGExMTtcbiAgICAgICAgdGhpcy5tMDIgPSBjICogYTAyICsgcyAqIGExMjtcblxuICAgICAgICB0aGlzLm0wMyA9IGMgKiBhMTAgLSBzICogYTAwO1xuICAgICAgICB0aGlzLm0wNCA9IGMgKiBhMTEgLSBzICogYTAxO1xuICAgICAgICB0aGlzLm0wNSA9IGMgKiBhMTIgLSBzICogYTAyO1xuXG4gICAgICAgIHRoaXMubTA2ID0gYTIwO1xuICAgICAgICB0aGlzLm0wNyA9IGEyMTtcbiAgICAgICAgdGhpcy5tMDggPSBhMjI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBSZXNldHMgdGhlIGN1cnJlbnQgbWF0cml4IGZyb20gdGhlIGdpdmVuIHF1YXRlcm5pb24uXG4gICAgICogQHpoIOmHjee9ruW9k+WJjeefqemYteeahOWAvO+8jOS9v+WFtuihqOekuuaMh+WumuWbm+WFg+aVsOihqOekuueahOaXi+i9rOWPmOaNouOAglxuICAgICAqIEBwYXJhbSBxIFRoZSBxdWF0ZXJuaW9uLlxuICAgICAqIEByZXR1cm5zIHRoaXNcbiAgICAgKi9cbiAgICBwdWJsaWMgZnJvbVF1YXQgKHE6IFF1YXQpIHtcbiAgICAgICAgY29uc3QgeCA9IHEueDsgY29uc3QgeSA9IHEueTsgY29uc3QgeiA9IHEuejsgY29uc3QgdyA9IHEudztcbiAgICAgICAgY29uc3QgeDIgPSB4ICsgeDtcbiAgICAgICAgY29uc3QgeTIgPSB5ICsgeTtcbiAgICAgICAgY29uc3QgejIgPSB6ICsgejtcblxuICAgICAgICBjb25zdCB4eCA9IHggKiB4MjtcbiAgICAgICAgY29uc3QgeXggPSB5ICogeDI7XG4gICAgICAgIGNvbnN0IHl5ID0geSAqIHkyO1xuICAgICAgICBjb25zdCB6eCA9IHogKiB4MjtcbiAgICAgICAgY29uc3QgenkgPSB6ICogeTI7XG4gICAgICAgIGNvbnN0IHp6ID0geiAqIHoyO1xuICAgICAgICBjb25zdCB3eCA9IHcgKiB4MjtcbiAgICAgICAgY29uc3Qgd3kgPSB3ICogeTI7XG4gICAgICAgIGNvbnN0IHd6ID0gdyAqIHoyO1xuXG4gICAgICAgIHRoaXMubTAwID0gMSAtIHl5IC0geno7XG4gICAgICAgIHRoaXMubTAzID0geXggLSB3ejtcbiAgICAgICAgdGhpcy5tMDYgPSB6eCArIHd5O1xuXG4gICAgICAgIHRoaXMubTAxID0geXggKyB3ejtcbiAgICAgICAgdGhpcy5tMDQgPSAxIC0geHggLSB6ejtcbiAgICAgICAgdGhpcy5tMDcgPSB6eSAtIHd4O1xuXG4gICAgICAgIHRoaXMubTAyID0genggLSB3eTtcbiAgICAgICAgdGhpcy5tMDUgPSB6eSArIHd4O1xuICAgICAgICB0aGlzLm0wOCA9IDEgLSB4eCAtIHl5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmNvbnN0IHYzXzEgPSBuZXcgVmVjMygpO1xuY29uc3QgdjNfMiA9IG5ldyBWZWMzKCk7Il19