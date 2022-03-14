"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vec4 = void 0;
const utils_1 = require("./utils");
/**
 * @en Representation of four-dimensional vectors.
 * @zh 四维向量。
 */
class Vec4 {
    constructor(x, y, z, w) {
        if (x && typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            this.w = x.w;
        }
        else {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.w = w || 0;
        }
    }
    /**
     * @en Obtains a clone of the given vector object
     * @zh 获得指定向量的拷贝
     */
    static clone(a) {
        return new Vec4(a.x, a.y, a.z, a.w);
    }
    /**
     * @en Copy the target vector and save the results to out vector object
     * @zh 复制目标向量
     */
    static copy(out, a) {
        out.x = a.x;
        out.y = a.y;
        out.z = a.z;
        out.w = a.w;
        return out;
    }
    /**
     * @en Sets the out vector with the given x, y, z and w values
     * @zh 设置向量值
     */
    static set(out, x, y, z, w) {
        out.x = x;
        out.y = y;
        out.z = z;
        out.w = w;
        return out;
    }
    /**
     * @en Element-wise vector addition and save the results to out vector object
     * @zh 逐元素向量加法
     */
    static add(out, a, b) {
        out.x = a.x + b.x;
        out.y = a.y + b.y;
        out.z = a.z + b.z;
        out.w = a.w + b.w;
        return out;
    }
    /**
     * @en Element-wise vector subtraction and save the results to out vector object
     * @zh 逐元素向量减法
     */
    static subtract(out, a, b) {
        out.x = a.x - b.x;
        out.y = a.y - b.y;
        out.z = a.z - b.z;
        out.w = a.w - b.w;
        return out;
    }
    /**
     * @en Element-wise vector multiplication and save the results to out vector object
     * @zh 逐元素向量乘法
     */
    static multiply(out, a, b) {
        out.x = a.x * b.x;
        out.y = a.y * b.y;
        out.z = a.z * b.z;
        out.w = a.w * b.w;
        return out;
    }
    /**
     * @en Element-wise vector division and save the results to out vector object
     * @zh 逐元素向量除法
     */
    static divide(out, a, b) {
        out.x = a.x / b.x;
        out.y = a.y / b.y;
        out.z = a.z / b.z;
        out.w = a.w / b.w;
        return out;
    }
    /**
     * @en Rounds up by elements of the vector and save the results to out vector object
     * @zh 逐元素向量向上取整
     */
    static ceil(out, a) {
        out.x = Math.ceil(a.x);
        out.y = Math.ceil(a.y);
        out.z = Math.ceil(a.z);
        out.w = Math.ceil(a.w);
        return out;
    }
    /**
     * @en Element-wise rounds down of the current vector and save the results to the out vector
     * @zh 逐元素向量向下取整
     */
    static floor(out, a) {
        out.x = Math.floor(a.x);
        out.y = Math.floor(a.y);
        out.z = Math.floor(a.z);
        out.w = Math.floor(a.w);
        return out;
    }
    /**
     * @en Calculates the minimum values by elements of the vector and save the results to the out vector
     * @zh 逐元素向量最小值
     */
    static min(out, a, b) {
        out.x = Math.min(a.x, b.x);
        out.y = Math.min(a.y, b.y);
        out.z = Math.min(a.z, b.z);
        out.w = Math.min(a.w, b.w);
        return out;
    }
    /**
     * @en Calculates the maximum values by elements of the vector and save the results to the out vector
     * @zh 逐元素向量最大值
     */
    static max(out, a, b) {
        out.x = Math.max(a.x, b.x);
        out.y = Math.max(a.y, b.y);
        out.z = Math.max(a.z, b.z);
        out.w = Math.max(a.w, b.w);
        return out;
    }
    /**
     * @en Calculates element-wise round results and save to the out vector
     * @zh 逐元素向量四舍五入取整
     */
    static round(out, a) {
        out.x = Math.round(a.x);
        out.y = Math.round(a.y);
        out.z = Math.round(a.z);
        out.w = Math.round(a.w);
        return out;
    }
    /**
     * @en Vector scalar multiplication and save the results to out vector object
     * @zh 向量标量乘法
     */
    static multiplyScalar(out, a, b) {
        out.x = a.x * b;
        out.y = a.y * b;
        out.z = a.z * b;
        out.w = a.w * b;
        return out;
    }
    /**
     * @en Element-wise multiplication and addition with the equation: a + b * scale
     * @zh 逐元素向量乘加: A + B * scale
     */
    static scaleAndAdd(out, a, b, scale) {
        out.x = a.x + (b.x * scale);
        out.y = a.y + (b.y * scale);
        out.z = a.z + (b.z * scale);
        out.w = a.w + (b.w * scale);
        return out;
    }
    /**
     * @en Calculates the euclidean distance of two vectors
     * @zh 求两向量的欧氏距离
     */
    static distance(a, b) {
        const x = b.x - a.x;
        const y = b.y - a.y;
        const z = b.z - a.z;
        const w = b.w - a.w;
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }
    /**
     * @en Calculates the squared euclidean distance of two vectors
     * @zh 求两向量的欧氏距离平方
     */
    static squaredDistance(a, b) {
        const x = b.x - a.x;
        const y = b.y - a.y;
        const z = b.z - a.z;
        const w = b.w - a.w;
        return x * x + y * y + z * z + w * w;
    }
    /**
     * @en Calculates the length of the vector
     * @zh 求向量长度
     */
    static len(a) {
        const x = a.x;
        const y = a.y;
        const z = a.z;
        const w = a.w;
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }
    /**
     * @en Calculates the squared length of the vector
     * @zh 求向量长度平方
     */
    static lengthSqr(a) {
        const x = a.x;
        const y = a.y;
        const z = a.z;
        const w = a.w;
        return x * x + y * y + z * z + w * w;
    }
    /**
     * @en Sets each element to its negative value
     * @zh 逐元素向量取负
     */
    static negate(out, a) {
        out.x = -a.x;
        out.y = -a.y;
        out.z = -a.z;
        out.w = -a.w;
        return out;
    }
    /**
     * @en Sets each element to its inverse value, zero value will become Infinity
     * @zh 逐元素向量取倒数，接近 0 时返回 Infinity
     */
    static inverse(out, a) {
        out.x = 1.0 / a.x;
        out.y = 1.0 / a.y;
        out.z = 1.0 / a.z;
        out.w = 1.0 / a.w;
        return out;
    }
    /**
     * @en Sets each element to its inverse value, zero value will remain zero
     * @zh 逐元素向量取倒数，接近 0 时返回 0
     */
    static inverseSafe(out, a) {
        const x = a.x;
        const y = a.y;
        const z = a.z;
        const w = a.w;
        if (Math.abs(x) < utils_1.EPSILON) {
            out.x = 0;
        }
        else {
            out.x = 1.0 / x;
        }
        if (Math.abs(y) < utils_1.EPSILON) {
            out.y = 0;
        }
        else {
            out.y = 1.0 / y;
        }
        if (Math.abs(z) < utils_1.EPSILON) {
            out.z = 0;
        }
        else {
            out.z = 1.0 / z;
        }
        if (Math.abs(w) < utils_1.EPSILON) {
            out.w = 0;
        }
        else {
            out.w = 1.0 / w;
        }
        return out;
    }
    /**
     * @en Sets the normalized vector to the out vector
     * @zh 归一化向量
     */
    static normalize(out, a) {
        const x = a.x;
        const y = a.y;
        const z = a.z;
        const w = a.w;
        let len = x * x + y * y + z * z + w * w;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            out.x = x * len;
            out.y = y * len;
            out.z = z * len;
            out.w = w * len;
        }
        return out;
    }
    /**
     * @en Calculates the dot product of the vector
     * @zh 向量点积（数量积）
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }
    /**
     * @en Calculates the linear interpolation between two vectors with a given ratio
     * @zh 逐元素向量线性插值： A + t * (B - A)
     */
    static lerp(out, a, b, t) {
        out.x = a.x + t * (b.x - a.x);
        out.y = a.y + t * (b.y - a.y);
        out.z = a.z + t * (b.z - a.z);
        out.w = a.w + t * (b.w - a.w);
        return out;
    }
    /**
     * @en Generates a uniformly distributed random vector points from center to the surface of the unit sphere
     * @zh 生成一个在单位球体上均匀分布的随机向量
     * @param scale vector length
     */
    static random(out, scale) {
        scale = scale || 1.0;
        const phi = utils_1.random() * 2.0 * Math.PI;
        const cosTheta = utils_1.random() * 2 - 1;
        const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
        out.x = sinTheta * Math.cos(phi) * scale;
        out.y = sinTheta * Math.sin(phi) * scale;
        out.z = cosTheta * scale;
        out.w = 0;
        return out;
    }
    /**
     * @en Vector and fourth order matrix multiplication
     * @zh 向量与四维矩阵乘法
     */
    static transformMat4(out, a, m) {
        const x = a.x;
        const y = a.y;
        const z = a.z;
        const w = a.w;
        out.x = m.m00 * x + m.m04 * y + m.m08 * z + m.m12 * w;
        out.y = m.m01 * x + m.m05 * y + m.m09 * z + m.m13 * w;
        out.z = m.m02 * x + m.m06 * y + m.m10 * z + m.m14 * w;
        out.w = m.m03 * x + m.m07 * y + m.m11 * z + m.m15 * w;
        return out;
    }
    /**
     * @en Transform the vector with the given affine transformation
     * @zh 向量仿射变换
     */
    static transformAffine(out, v, m) {
        const x = v.x;
        const y = v.y;
        const z = v.z;
        const w = v.w;
        out.x = m.m00 * x + m.m01 * y + m.m02 * z + m.m03 * w;
        out.y = m.m04 * x + m.m05 * y + m.m06 * z + m.m07 * w;
        out.x = m.m08 * x + m.m09 * y + m.m10 * z + m.m11 * w;
        out.w = v.w;
        return out;
    }
    /**
     * @en Vector quaternion multiplication
     * @zh 向量四元数乘法
     */
    static transformQuat(out, a, q) {
        const { x, y, z } = a;
        const _x = q.x;
        const _y = q.y;
        const _z = q.z;
        const _w = q.w;
        // calculate quat * vec
        const ix = _w * x + _y * z - _z * y;
        const iy = _w * y + _z * x - _x * z;
        const iz = _w * z + _x * y - _y * x;
        const iw = -_x * x - _y * y - _z * z;
        // calculate result * inverse quat
        out.x = ix * _w + iw * -_x + iy * -_z - iz * -_y;
        out.y = iy * _w + iw * -_y + iz * -_x - ix * -_z;
        out.z = iz * _w + iw * -_z + ix * -_y - iy * -_x;
        out.w = a.w;
        return out;
    }
    /**
     * @en Converts the given vector to an array
     * @zh 向量转数组
     * @param ofs Array Start Offset
     */
    static toArray(out, v, ofs = 0) {
        out[ofs + 0] = v.x;
        out[ofs + 1] = v.y;
        out[ofs + 2] = v.z;
        out[ofs + 3] = v.w;
        return out;
    }
    /**
     * @en Converts the given array to a vector
     * @zh 数组转向量
     * @param ofs Array Start Offset
     */
    static fromArray(out, arr, ofs = 0) {
        out.x = arr[ofs + 0];
        out.y = arr[ofs + 1];
        out.z = arr[ofs + 2];
        out.w = arr[ofs + 3];
        return out;
    }
    /**
     * @en Check the equality of the two given vectors
     * @zh 向量等价判断
     */
    static strictEquals(a, b) {
        return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
    }
    /**
     * @en Check whether the two given vectors are approximately equivalent
     * @zh 排除浮点数误差的向量近似等价判断
     */
    static equals(a, b, epsilon = utils_1.EPSILON) {
        return (Math.abs(a.x - b.x) <= epsilon * Math.max(1.0, Math.abs(a.x), Math.abs(b.x))
            && Math.abs(a.y - b.y) <= epsilon * Math.max(1.0, Math.abs(a.y), Math.abs(b.y))
            && Math.abs(a.z - b.z) <= epsilon * Math.max(1.0, Math.abs(a.z), Math.abs(b.z))
            && Math.abs(a.w - b.w) <= epsilon * Math.max(1.0, Math.abs(a.w), Math.abs(b.w)));
    }
    /**
     * @en clone the current Vec4 value.
     * @zh 克隆当前向量。
     */
    clone() {
        return new Vec4(this.x, this.y, this.z, this.w);
    }
    set(x, y, z, w) {
        if (x && typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            this.w = x.w;
        }
        else {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.w = w || 0;
        }
        return this;
    }
    /**
     * @en Check whether the vector approximately equals another one.
     * @zh 判断当前向量是否在误差范围内与指定向量相等。
     * @param other Specified vector
     * @param epsilon The error allowed. It`s should be a non-negative number.
     * @returns Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
     */
    equals(other, epsilon = utils_1.EPSILON) {
        return (Math.abs(this.x - other.x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(other.x))
            && Math.abs(this.y - other.y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(other.y))
            && Math.abs(this.z - other.z) <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(other.z))
            && Math.abs(this.w - other.w) <= epsilon * Math.max(1.0, Math.abs(this.w), Math.abs(other.w)));
    }
    /**
     * @en Check whether the vector approximately equals another one.
     * @zh 判断当前向量是否在误差范围内与指定分量的向量相等。
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     * @param z The z value of specified vector
     * @param w The w value of specified vector
     * @param epsilon The error allowed. It`s should be a non-negative number.
     * @returns Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
     */
    equals4f(x, y, z, w, epsilon = utils_1.EPSILON) {
        return (Math.abs(this.x - x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(x))
            && Math.abs(this.y - y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(y))
            && Math.abs(this.z - z) <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(z))
            && Math.abs(this.w - w) <= epsilon * Math.max(1.0, Math.abs(this.w), Math.abs(w)));
    }
    /**
     * @en Check whether the current vector strictly equals another Vec4.
     * @zh 判断当前向量是否与指定向量相等。
     * @param other specified vector
     * @returns Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
     */
    strictEquals(other) {
        return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
    }
    /**
     * @en Check whether the current vector strictly equals another Vec4.
     * @zh 判断当前向量是否与指定分量的向量相等。
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     * @param z The z value of specified vector
     * @param w The w value of specified vector
     * @returns Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
     */
    strictEquals4f(x, y, z, w) {
        return this.x === x && this.y === y && this.z === z && this.w === w;
    }
    /**
     * @en Calculate linear interpolation result between this vector and another one with given ratio.
     * @zh 根据指定的插值比率，从当前向量到目标向量之间做插值。
     * @param to Target vector
     * @param ratio The interpolation coefficient.The range is [0,1].
     */
    lerp(to, ratio) {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;
        this.x = x + ratio * (to.x - x);
        this.y = y + ratio * (to.y - y);
        this.z = z + ratio * (to.z - z);
        this.w = w + ratio * (to.w - w);
        return this;
    }
    /**
     * @en Return the information of the vector in string
     * @zh 返回当前向量的字符串表示。
     * @returns The string with vector information
     */
    toString() {
        return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)}, ${this.w.toFixed(2)})`;
    }
    /**
     * @en Clamp the vector between minInclusive and maxInclusive.
     * @zh 设置当前向量的值，使其各个分量都处于指定的范围内。
     * @param minInclusive Minimum value allowed
     * @param maxInclusive Maximum value allowed
     * @returns `this`
     */
    clampf(minInclusive, maxInclusive) {
        this.x = utils_1.clamp(this.x, minInclusive.x, maxInclusive.x);
        this.y = utils_1.clamp(this.y, minInclusive.y, maxInclusive.y);
        this.z = utils_1.clamp(this.z, minInclusive.z, maxInclusive.z);
        this.w = utils_1.clamp(this.w, minInclusive.w, maxInclusive.w);
        return this;
    }
    /**
     * @en Adds the current vector with another one and return this
     * @zh 向量加法。将当前向量与指定向量的相加
     * @param other specified vector
     */
    add(other) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        this.w += other.w;
        return this;
    }
    /**
     * @en Adds the current vector with another one and return this
     * @zh 向量加法。将当前向量与指定分量的向量相加
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     * @param z The z value of specified vector
     * @param w The w value of specified vector
     */
    add4f(x, y, z, w) {
        this.x += x;
        this.y += y;
        this.z += z;
        this.w += w;
        return this;
    }
    /**
     * @en Subtracts one vector from this, and returns this.
     * @zh 向量减法。将当前向量减去指定向量
     * @param other specified vector
     */
    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        this.w -= other.w;
        return this;
    }
    /**
     * @en Subtracts one vector from this, and returns this.
     * @zh 向量减法。将当前向量减去指定分量的向量
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     * @param z The z value of specified vector
     * @param w The w value of specified vector
     */
    subtract4f(x, y, z, w) {
        this.x -= x;
        this.y -= y;
        this.z -= z;
        this.w -= w;
        return this;
    }
    /**
     * @en Multiplies the current vector with a number, and returns this.
     * @zh 向量数乘。将当前向量数乘指定标量
     * @param scalar scalar number
     */
    multiplyScalar(scalar) {
        if (typeof scalar === 'object') {
            console.warn('should use Vec4.multiply for vector * vector operation');
        }
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }
    /**
     * @en Multiplies the current vector with another one and return this
     * @zh 向量乘法。将当前向量乘以指定向量
     * @param other specified vector
     */
    multiply(other) {
        if (typeof other !== 'object') {
            console.warn('should use Vec4.scale for vector * scalar operation');
        }
        this.x *= other.x;
        this.y *= other.y;
        this.z *= other.z;
        this.w *= other.w;
        return this;
    }
    /**
     * @en Multiplies the current vector with another one and return this
     * @zh 向量乘法。将当前向量与指定分量的向量相乘的结果赋值给当前向量。
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     * @param z The z value of specified vector
     * @param w The w value of specified vector
     */
    multiply4f(x, y, z, w) {
        this.x *= x;
        this.y *= y;
        this.z *= z;
        this.w *= w;
        return this;
    }
    /**
     * @en Element-wisely divides this vector with another one, and return this.
     * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
     * @param other specified vector
     */
    divide(other) {
        this.x /= other.x;
        this.y /= other.y;
        this.z /= other.z;
        this.w /= other.w;
        return this;
    }
    /**
     * @en Element-wisely divides this vector with another one, and return this.
     * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     * @param z The z value of specified vector
     * @param w The w value of specified vector
     */
    divide4f(x, y, z, w) {
        this.x /= x;
        this.y /= y;
        this.z /= z;
        this.w /= w;
        return this;
    }
    /**
     * @en Sets each component of this vector with its negative value
     * @zh 将当前向量的各个分量取反
     */
    negative() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;
    }
    /**
     * @en Calculates the dot product with another vector
     * @zh 向量点乘。
     * @param other specified vector
     * @returns 当前向量与指定向量点乘的结果。
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z + this.w * vector.w;
    }
    /**
     * @en Calculates the cross product with another vector.
     * @zh 向量叉乘。视当前向量和指定向量为三维向量（舍弃 w 分量），将当前向量左叉乘指定向量
     * @param other specified vector
     */
    cross(vector) {
        const { x: ax, y: ay, z: az } = this;
        const { x: bx, y: by, z: bz } = vector;
        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;
        return this;
    }
    /**
     * @en Returns the length of this vector.
     * @zh 计算向量的长度（模）。
     * @returns Length of vector
     */
    length() {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }
    /**
     * @en Returns the squared length of this vector.
     * @zh 计算向量长度（模）的平方。
     * @returns the squared length of this vector
     */
    lengthSqr() {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;
        return x * x + y * y + z * z + w * w;
    }
    /**
     * @en Normalize the current vector.
     * @zh 将当前向量归一化
     */
    normalize() {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;
        let len = x * x + y * y + z * z + w * w;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            this.x = x * len;
            this.y = y * len;
            this.z = z * len;
            this.w = w * len;
        }
        return this;
    }
    /**
     * @en Transforms the vec4 with a mat4
     * @zh 应用四维矩阵变换到当前矩阵
     * @param matrix matrix to transform with
     */
    transformMat4(matrix) {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;
        this.x = matrix.m00 * x + matrix.m04 * y + matrix.m08 * z + matrix.m12 * w;
        this.y = matrix.m01 * x + matrix.m05 * y + matrix.m09 * z + matrix.m13 * w;
        this.z = matrix.m02 * x + matrix.m06 * y + matrix.m10 * z + matrix.m14 * w;
        this.w = matrix.m03 * x + matrix.m07 * y + matrix.m11 * z + matrix.m15 * w;
        return this;
    }
}
exports.Vec4 = Vec4;
Vec4.ZERO = Object.freeze(new Vec4(0, 0, 0, 0));
Vec4.ONE = Object.freeze(new Vec4(1, 1, 1, 1));
Vec4.NEG_ONE = Object.freeze(new Vec4(-1, -1, -1, -1));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVjNC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlscy9NYXRocy9WZWM0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLG1DQUFpRDtBQUVqRDs7O0dBR0c7QUFDRixNQUFhLElBQUk7SUFxZGQsWUFBYSxDQUFpQixFQUFFLENBQVUsRUFBRSxDQUFVLEVBQUUsQ0FBVTtRQUM5RCxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDNUIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO2FBQU07WUFDSCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBNWREOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQTBCLENBQU07UUFDL0MsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxJQUFJLENBQTBCLEdBQVEsRUFBRSxDQUFNO1FBQ3hELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxHQUFHLENBQTBCLEdBQVEsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQzNGLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFNO1FBQy9ELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTTtRQUNwRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQU07UUFDcEUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFNO1FBQ2xFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxJQUFJLENBQTBCLEdBQVEsRUFBRSxDQUFNO1FBQ3hELEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBMEIsR0FBUSxFQUFFLENBQU07UUFDekQsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsR0FBRyxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQU07UUFDL0QsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxHQUFHLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTTtRQUMvRCxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBMEIsR0FBUSxFQUFFLENBQU07UUFDekQsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQVM7UUFDN0UsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsV0FBVyxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQU0sRUFBRSxLQUFhO1FBQ3RGLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM1QixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDNUIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBMEIsQ0FBTSxFQUFFLENBQU07UUFDMUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxlQUFlLENBQTBCLENBQU0sRUFBRSxDQUFNO1FBQ2pFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxHQUFHLENBQTBCLENBQU07UUFDN0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQTBCLENBQU07UUFDbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBMEIsR0FBUSxFQUFFLENBQU07UUFDMUQsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDYixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNiLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDYixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUEwQixHQUFRLEVBQUUsQ0FBTTtRQUMzRCxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxXQUFXLENBQTBCLEdBQVEsRUFBRSxDQUFNO1FBQy9ELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFZCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBTyxFQUFFO1lBQ3ZCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2I7YUFBTTtZQUNILEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNuQjtRQUVELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxlQUFPLEVBQUU7WUFDdkIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDYjthQUFNO1lBQ0gsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ25CO1FBRUQsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLGVBQU8sRUFBRTtZQUN2QixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNiO2FBQU07WUFDSCxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDbkI7UUFFRCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBTyxFQUFFO1lBQ3ZCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2I7YUFBTTtZQUNILEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNuQjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQTBCLEdBQVEsRUFBRSxDQUFNO1FBQzdELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtZQUNULEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNoQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDbkI7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsR0FBRyxDQUEwQixDQUFNLEVBQUUsQ0FBTTtRQUNyRCxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFNLEVBQUUsQ0FBUztRQUMzRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQTBCLEdBQVEsRUFBRSxLQUFjO1FBQ2xFLEtBQUssR0FBRyxLQUFLLElBQUksR0FBRyxDQUFDO1FBRXJCLE1BQU0sR0FBRyxHQUFHLGNBQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sUUFBUSxHQUFHLGNBQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBRXBELEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN6QixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxhQUFhLENBQXFELEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBVTtRQUN4RyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN0RCxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdEQsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN0RCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsZUFBZSxDQUM1QixHQUFRLEVBQUUsQ0FBVSxFQUFFLENBQVU7UUFDN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdEQsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENB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LEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBMEIsQ0FBTSxFQUFFLENBQU07UUFDOUQsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQTBCLENBQU0sRUFBRSxDQUFNLEVBQUUsT0FBTyxHQUFHLGVBQU87UUFDM0UsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2VBQzdFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2VBQzVFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2VBQzVFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBNENEOzs7T0FHRztJQUNJLEtBQUs7UUFDUixPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBcUJNLEdBQUcsQ0FBRSxDQUFpQixFQUFFLENBQVUsRUFBRSxDQUFVLEVBQUUsQ0FBVTtRQUM3RCxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDNUIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO2FBQU07WUFDSCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFFLEtBQVcsRUFBRSxPQUFPLEdBQUcsZUFBTztRQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFDM0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFDMUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFDMUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSSxRQUFRLENBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLE9BQU8sR0FBRyxlQUFPO1FBQzFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFDL0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2VBQzlFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztlQUM5RSxJQUFJLENBQUMsR0FBRyxD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QUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0MsUUFBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxZQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXQ0IH0gZnJvbSBcIi4vTWF0NFwiO1xuaW1wb3J0IHsgSVZlYzRMaWtlLCBJTWF0NExpa2UsIElRdWF0TGlrZSB9IGZyb20gXCIuL3R5cGUtZGVmaW5lXCI7XG5pbXBvcnQgeyBFUFNJTE9OLCByYW5kb20sIGNsYW1wIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuLyoqXG4gKiBAZW4gUmVwcmVzZW50YXRpb24gb2YgZm91ci1kaW1lbnNpb25hbCB2ZWN0b3JzLlxuICogQHpoIOWbm+e7tOWQkemHj+OAglxuICovXG4gZXhwb3J0IGNsYXNzIFZlYzQgIHtcbiAgICBwdWJsaWMgc3RhdGljIFpFUk8gPSBPYmplY3QuZnJlZXplKG5ldyBWZWM0KDAsIDAsIDAsIDApKTtcbiAgICBwdWJsaWMgc3RhdGljIE9ORSA9IE9iamVjdC5mcmVlemUobmV3IFZlYzQoMSwgMSwgMSwgMSkpO1xuICAgIHB1YmxpYyBzdGF0aWMgTkVHX09ORSA9IE9iamVjdC5mcmVlemUobmV3IFZlYzQoLTEsIC0xLCAtMSwgLTEpKTtcblxuICAgIC8qKlxuICAgICAqIEBlbiBPYnRhaW5zIGEgY2xvbmUgb2YgdGhlIGdpdmVuIHZlY3RvciBvYmplY3RcbiAgICAgKiBAemgg6I635b6X5oyH5a6a5ZCR6YeP55qE5ou36LSdXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjbG9uZSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAoYTogT3V0KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjNChhLngsIGEueSwgYS56LCBhLncpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDb3B5IHRoZSB0YXJnZXQgdmVjdG9yIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XG4gICAgICogQHpoIOWkjeWItuebruagh+WQkemHj1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29weSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBvdXQueCA9IGEueDtcbiAgICAgICAgb3V0LnkgPSBhLnk7XG4gICAgICAgIG91dC56ID0gYS56O1xuICAgICAgICBvdXQudyA9IGEudztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0cyB0aGUgb3V0IHZlY3RvciB3aXRoIHRoZSBnaXZlbiB4LCB5LCB6IGFuZCB3IHZhbHVlc1xuICAgICAqIEB6aCDorr7nva7lkJHph4/lgLxcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNldCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlcikge1xuICAgICAgICBvdXQueCA9IHg7XG4gICAgICAgIG91dC55ID0geTtcbiAgICAgICAgb3V0LnogPSB6O1xuICAgICAgICBvdXQudyA9IHc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEVsZW1lbnQtd2lzZSB2ZWN0b3IgYWRkaXRpb24gYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IHZlY3RvciBvYmplY3RcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5Yqg5rOVXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGQgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBvdXQueCA9IGEueCArIGIueDtcbiAgICAgICAgb3V0LnkgPSBhLnkgKyBiLnk7XG4gICAgICAgIG91dC56ID0gYS56ICsgYi56O1xuICAgICAgICBvdXQudyA9IGEudyArIGIudztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlIHZlY3RvciBzdWJ0cmFjdGlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgdmVjdG9yIG9iamVjdFxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lh4/ms5VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHN1YnRyYWN0IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBhLnggLSBiLng7XG4gICAgICAgIG91dC55ID0gYS55IC0gYi55O1xuICAgICAgICBvdXQueiA9IGEueiAtIGIuejtcbiAgICAgICAgb3V0LncgPSBhLncgLSBiLnc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEVsZW1lbnQtd2lzZSB2ZWN0b3IgbXVsdGlwbGljYXRpb24gYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IHZlY3RvciBvYmplY3RcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5LmY5rOVXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBtdWx0aXBseSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIG91dC54ID0gYS54ICogYi54O1xuICAgICAgICBvdXQueSA9IGEueSAqIGIueTtcbiAgICAgICAgb3V0LnogPSBhLnogKiBiLno7XG4gICAgICAgIG91dC53ID0gYS53ICogYi53O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBFbGVtZW50LXdpc2UgdmVjdG9yIGRpdmlzaW9uIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+mZpOazlVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZGl2aWRlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBhLnggLyBiLng7XG4gICAgICAgIG91dC55ID0gYS55IC8gYi55O1xuICAgICAgICBvdXQueiA9IGEueiAvIGIuejtcbiAgICAgICAgb3V0LncgPSBhLncgLyBiLnc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFJvdW5kcyB1cCBieSBlbGVtZW50cyBvZiB0aGUgdmVjdG9yIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+WQkeS4iuWPluaVtFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2VpbCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBvdXQueCA9IE1hdGguY2VpbChhLngpO1xuICAgICAgICBvdXQueSA9IE1hdGguY2VpbChhLnkpO1xuICAgICAgICBvdXQueiA9IE1hdGguY2VpbChhLnopO1xuICAgICAgICBvdXQudyA9IE1hdGguY2VpbChhLncpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBFbGVtZW50LXdpc2Ugcm91bmRzIGRvd24gb2YgdGhlIGN1cnJlbnQgdmVjdG9yIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIHRoZSBvdXQgdmVjdG9yXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+WQkeS4i+WPluaVtFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZmxvb3IgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBNYXRoLmZsb29yKGEueCk7XG4gICAgICAgIG91dC55ID0gTWF0aC5mbG9vcihhLnkpO1xuICAgICAgICBvdXQueiA9IE1hdGguZmxvb3IoYS56KTtcbiAgICAgICAgb3V0LncgPSBNYXRoLmZsb29yKGEudyk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIG1pbmltdW0gdmFsdWVzIGJ5IGVsZW1lbnRzIG9mIHRoZSB2ZWN0b3IgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gdGhlIG91dCB2ZWN0b3JcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5pyA5bCP5YC8XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBtaW4gPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBvdXQueCA9IE1hdGgubWluKGEueCwgYi54KTtcbiAgICAgICAgb3V0LnkgPSBNYXRoLm1pbihhLnksIGIueSk7XG4gICAgICAgIG91dC56ID0gTWF0aC5taW4oYS56LCBiLnopO1xuICAgICAgICBvdXQudyA9IE1hdGgubWluKGEudywgYi53KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgbWF4aW11bSB2YWx1ZXMgYnkgZWxlbWVudHMgb2YgdGhlIHZlY3RvciBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byB0aGUgb3V0IHZlY3RvclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/mnIDlpKflgLxcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG1heCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIG91dC54ID0gTWF0aC5tYXgoYS54LCBiLngpO1xuICAgICAgICBvdXQueSA9IE1hdGgubWF4KGEueSwgYi55KTtcbiAgICAgICAgb3V0LnogPSBNYXRoLm1heChhLnosIGIueik7XG4gICAgICAgIG91dC53ID0gTWF0aC5tYXgoYS53LCBiLncpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIGVsZW1lbnQtd2lzZSByb3VuZCByZXN1bHRzIGFuZCBzYXZlIHRvIHRoZSBvdXQgdmVjdG9yXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+Wbm+iIjeS6lOWFpeWPluaVtFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcm91bmQgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBNYXRoLnJvdW5kKGEueCk7XG4gICAgICAgIG91dC55ID0gTWF0aC5yb3VuZChhLnkpO1xuICAgICAgICBvdXQueiA9IE1hdGgucm91bmQoYS56KTtcbiAgICAgICAgb3V0LncgPSBNYXRoLnJvdW5kKGEudyk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFZlY3RvciBzY2FsYXIgbXVsdGlwbGljYXRpb24gYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IHZlY3RvciBvYmplY3RcbiAgICAgKiBAemgg5ZCR6YeP5qCH6YeP5LmY5rOVXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBtdWx0aXBseVNjYWxhciA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogbnVtYmVyKSB7XG4gICAgICAgIG91dC54ID0gYS54ICogYjtcbiAgICAgICAgb3V0LnkgPSBhLnkgKiBiO1xuICAgICAgICBvdXQueiA9IGEueiAqIGI7XG4gICAgICAgIG91dC53ID0gYS53ICogYjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlIG11bHRpcGxpY2F0aW9uIGFuZCBhZGRpdGlvbiB3aXRoIHRoZSBlcXVhdGlvbjogYSArIGIgKiBzY2FsZVxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/kuZjliqA6IEEgKyBCICogc2NhbGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNjYWxlQW5kQWRkIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHNjYWxlOiBudW1iZXIpIHtcbiAgICAgICAgb3V0LnggPSBhLnggKyAoYi54ICogc2NhbGUpO1xuICAgICAgICBvdXQueSA9IGEueSArIChiLnkgKiBzY2FsZSk7XG4gICAgICAgIG91dC56ID0gYS56ICsgKGIueiAqIHNjYWxlKTtcbiAgICAgICAgb3V0LncgPSBhLncgKyAoYi53ICogc2NhbGUpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBldWNsaWRlYW4gZGlzdGFuY2Ugb2YgdHdvIHZlY3RvcnNcbiAgICAgKiBAemgg5rGC5Lik5ZCR6YeP55qE5qyn5rCP6Led56a7XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBkaXN0YW5jZSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgY29uc3QgeCA9IGIueCAtIGEueDtcbiAgICAgICAgY29uc3QgeSA9IGIueSAtIGEueTtcbiAgICAgICAgY29uc3QgeiA9IGIueiAtIGEuejtcbiAgICAgICAgY29uc3QgdyA9IGIudyAtIGEudztcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkZWFuIGRpc3RhbmNlIG9mIHR3byB2ZWN0b3JzXG4gICAgICogQHpoIOaxguS4pOWQkemHj+eahOasp+awj+i3neemu+W5s+aWuVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc3F1YXJlZERpc3RhbmNlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBjb25zdCB4ID0gYi54IC0gYS54O1xuICAgICAgICBjb25zdCB5ID0gYi55IC0gYS55O1xuICAgICAgICBjb25zdCB6ID0gYi56IC0gYS56O1xuICAgICAgICBjb25zdCB3ID0gYi53IC0gYS53O1xuICAgICAgICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiB0aGUgdmVjdG9yXG4gICAgICogQHpoIOaxguWQkemHj+mVv+W6plxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbGVuIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueDtcbiAgICAgICAgY29uc3QgeSA9IGEueTtcbiAgICAgICAgY29uc3QgeiA9IGEuejtcbiAgICAgICAgY29uc3QgdyA9IGEudztcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoZSB2ZWN0b3JcbiAgICAgKiBAemgg5rGC5ZCR6YeP6ZW/5bqm5bmz5pa5XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBsZW5ndGhTcXIgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCkge1xuICAgICAgICBjb25zdCB4ID0gYS54O1xuICAgICAgICBjb25zdCB5ID0gYS55O1xuICAgICAgICBjb25zdCB6ID0gYS56O1xuICAgICAgICBjb25zdCB3ID0gYS53O1xuICAgICAgICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgZWFjaCBlbGVtZW50IHRvIGl0cyBuZWdhdGl2ZSB2YWx1ZVxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lj5botJ9cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG5lZ2F0ZSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBvdXQueCA9IC1hLng7XG4gICAgICAgIG91dC55ID0gLWEueTtcbiAgICAgICAgb3V0LnogPSAtYS56O1xuICAgICAgICBvdXQudyA9IC1hLnc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgZWFjaCBlbGVtZW50IHRvIGl0cyBpbnZlcnNlIHZhbHVlLCB6ZXJvIHZhbHVlIHdpbGwgYmVjb21lIEluZmluaXR5XG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+WPluWAkuaVsO+8jOaOpei/kSAwIOaXtui/lOWbniBJbmZpbml0eVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaW52ZXJzZSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBvdXQueCA9IDEuMCAvIGEueDtcbiAgICAgICAgb3V0LnkgPSAxLjAgLyBhLnk7XG4gICAgICAgIG91dC56ID0gMS4wIC8gYS56O1xuICAgICAgICBvdXQudyA9IDEuMCAvIGEudztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0cyBlYWNoIGVsZW1lbnQgdG8gaXRzIGludmVyc2UgdmFsdWUsIHplcm8gdmFsdWUgd2lsbCByZW1haW4gemVyb1xuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lj5blgJLmlbDvvIzmjqXov5EgMCDml7bov5Tlm54gMFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaW52ZXJzZVNhZmUgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueDtcbiAgICAgICAgY29uc3QgeSA9IGEueTtcbiAgICAgICAgY29uc3QgeiA9IGEuejtcbiAgICAgICAgY29uc3QgdyA9IGEudztcblxuICAgICAgICBpZiAoTWF0aC5hYnMoeCkgPCBFUFNJTE9OKSB7XG4gICAgICAgICAgICBvdXQueCA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQueCA9IDEuMCAvIHg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTWF0aC5hYnMoeSkgPCBFUFNJTE9OKSB7XG4gICAgICAgICAgICBvdXQueSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQueSA9IDEuMCAvIHk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTWF0aC5hYnMoeikgPCBFUFNJTE9OKSB7XG4gICAgICAgICAgICBvdXQueiA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQueiA9IDEuMCAvIHo7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTWF0aC5hYnModykgPCBFUFNJTE9OKSB7XG4gICAgICAgICAgICBvdXQudyA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQudyA9IDEuMCAvIHc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXRzIHRoZSBub3JtYWxpemVkIHZlY3RvciB0byB0aGUgb3V0IHZlY3RvclxuICAgICAqIEB6aCDlvZLkuIDljJblkJHph49cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG5vcm1hbGl6ZSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBjb25zdCB4ID0gYS54O1xuICAgICAgICBjb25zdCB5ID0gYS55O1xuICAgICAgICBjb25zdCB6ID0gYS56O1xuICAgICAgICBjb25zdCB3ID0gYS53O1xuICAgICAgICBsZXQgbGVuID0geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHc7XG4gICAgICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgICAgICBvdXQueCA9IHggKiBsZW47XG4gICAgICAgICAgICBvdXQueSA9IHkgKiBsZW47XG4gICAgICAgICAgICBvdXQueiA9IHogKiBsZW47XG4gICAgICAgICAgICBvdXQudyA9IHcgKiBsZW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdGhlIHZlY3RvclxuICAgICAqIEB6aCDlkJHph4/ngrnnp6/vvIjmlbDph4/np6/vvIlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGRvdCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgcmV0dXJuIGEueCAqIGIueCArIGEueSAqIGIueSArIGEueiAqIGIueiArIGEudyAqIGIudztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjdG9ycyB3aXRoIGEgZ2l2ZW4gcmF0aW9cbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP57q/5oCn5o+S5YC877yaIEEgKyB0ICogKEIgLSBBKVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbGVycCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCB0OiBudW1iZXIpIHtcbiAgICAgICAgb3V0LnggPSBhLnggKyB0ICogKGIueCAtIGEueCk7XG4gICAgICAgIG91dC55ID0gYS55ICsgdCAqIChiLnkgLSBhLnkpO1xuICAgICAgICBvdXQueiA9IGEueiArIHQgKiAoYi56IC0gYS56KTtcbiAgICAgICAgb3V0LncgPSBhLncgKyB0ICogKGIudyAtIGEudyk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEdlbmVyYXRlcyBhIHVuaWZvcm1seSBkaXN0cmlidXRlZCByYW5kb20gdmVjdG9yIHBvaW50cyBmcm9tIGNlbnRlciB0byB0aGUgc3VyZmFjZSBvZiB0aGUgdW5pdCBzcGhlcmVcbiAgICAgKiBAemgg55Sf5oiQ5LiA5Liq5Zyo5Y2V5L2N55CD5L2T5LiK5Z2H5YyA5YiG5biD55qE6ZqP5py65ZCR6YePXG4gICAgICogQHBhcmFtIHNjYWxlIHZlY3RvciBsZW5ndGhcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIHNjYWxlPzogbnVtYmVyKSB7XG4gICAgICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuXG4gICAgICAgIGNvbnN0IHBoaSA9IHJhbmRvbSgpICogMi4wICogTWF0aC5QSTtcbiAgICAgICAgY29uc3QgY29zVGhldGEgPSByYW5kb20oKSAqIDIgLSAxO1xuICAgICAgICBjb25zdCBzaW5UaGV0YSA9IE1hdGguc3FydCgxIC0gY29zVGhldGEgKiBjb3NUaGV0YSk7XG5cbiAgICAgICAgb3V0LnggPSBzaW5UaGV0YSAqIE1hdGguY29zKHBoaSkgKiBzY2FsZTtcbiAgICAgICAgb3V0LnkgPSBzaW5UaGV0YSAqIE1hdGguc2luKHBoaSkgKiBzY2FsZTtcbiAgICAgICAgb3V0LnogPSBjb3NUaGV0YSAqIHNjYWxlO1xuICAgICAgICBvdXQudyA9IDA7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFZlY3RvciBhbmQgZm91cnRoIG9yZGVyIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgICAqIEB6aCDlkJHph4/kuI7lm5vnu7Tnn6npmLXkuZjms5VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRyYW5zZm9ybU1hdDQgPE91dCBleHRlbmRzIElWZWM0TGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIG06IE1hdExpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueDtcbiAgICAgICAgY29uc3QgeSA9IGEueTtcbiAgICAgICAgY29uc3QgeiA9IGEuejtcbiAgICAgICAgY29uc3QgdyA9IGEudztcbiAgICAgICAgb3V0LnggPSBtLm0wMCAqIHggKyBtLm0wNCAqIHkgKyBtLm0wOCAqIHogKyBtLm0xMiAqIHc7XG4gICAgICAgIG91dC55ID0gbS5tMDEgKiB4ICsgbS5tMDUgKiB5ICsgbS5tMDkgKiB6ICsgbS5tMTMgKiB3O1xuICAgICAgICBvdXQueiA9IG0ubTAyICogeCArIG0ubTA2ICogeSArIG0ubTEwICogeiArIG0ubTE0ICogdztcbiAgICAgICAgb3V0LncgPSBtLm0wMyAqIHggKyBtLm0wNyAqIHkgKyBtLm0xMSAqIHogKyBtLm0xNSAqIHc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFRyYW5zZm9ybSB0aGUgdmVjdG9yIHdpdGggdGhlIGdpdmVuIGFmZmluZSB0cmFuc2Zvcm1hdGlvblxuICAgICAqIEB6aCDlkJHph4/ku7/lsITlj5jmjaJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRyYW5zZm9ybUFmZmluZTxPdXQgZXh0ZW5kcyBJVmVjNExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjNExpa2UsIE1hdExpa2UgZXh0ZW5kcyBJTWF0NExpa2U+XG4gICAgKG91dDogT3V0LCB2OiBWZWNMaWtlLCBtOiBNYXRMaWtlKSB7XG4gICAgICAgIGNvbnN0IHggPSB2Lng7XG4gICAgICAgIGNvbnN0IHkgPSB2Lnk7XG4gICAgICAgIGNvbnN0IHogPSB2Lno7XG4gICAgICAgIGNvbnN0IHcgPSB2Lnc7XG4gICAgICAgIG91dC54ID0gbS5tMDAgKiB4ICsgbS5tMDEgKiB5ICsgbS5tMDIgKiB6ICsgbS5tMDMgKiB3O1xuICAgICAgICBvdXQueSA9IG0ubTA0ICogeCArIG0ubTA1ICogeSArIG0ubTA2ICogeiArIG0ubTA3ICogdztcbiAgICAgICAgb3V0LnggPSBtLm0wOCAqIHggKyBtLm0wOSAqIHkgKyBtLm0xMCAqIHogKyBtLm0xMSAqIHc7XG4gICAgICAgIG91dC53ID0gdi53O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBWZWN0b3IgcXVhdGVybmlvbiBtdWx0aXBsaWNhdGlvblxuICAgICAqIEB6aCDlkJHph4/lm5vlhYPmlbDkuZjms5VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRyYW5zZm9ybVF1YXQgPE91dCBleHRlbmRzIElWZWM0TGlrZSwgUXVhdExpa2UgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBxOiBRdWF0TGlrZSkge1xuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IGE7XG5cbiAgICAgICAgY29uc3QgX3ggPSBxLng7XG4gICAgICAgIGNvbnN0IF95ID0gcS55O1xuICAgICAgICBjb25zdCBfeiA9IHEuejtcbiAgICAgICAgY29uc3QgX3cgPSBxLnc7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHF1YXQgKiB2ZWNcbiAgICAgICAgY29uc3QgaXggPSBfdyAqIHggKyBfeSAqIHogLSBfeiAqIHk7XG4gICAgICAgIGNvbnN0IGl5ID0gX3cgKiB5ICsgX3ogKiB4IC0gX3ggKiB6O1xuICAgICAgICBjb25zdCBpeiA9IF93ICogeiArIF94ICogeSAtIF95ICogeDtcbiAgICAgICAgY29uc3QgaXcgPSAtX3ggKiB4IC0gX3kgKiB5IC0gX3ogKiB6O1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcbiAgICAgICAgb3V0LnggPSBpeCAqIF93ICsgaXcgKiAtX3ggKyBpeSAqIC1feiAtIGl6ICogLV95O1xuICAgICAgICBvdXQueSA9IGl5ICogX3cgKyBpdyAqIC1feSArIGl6ICogLV94IC0gaXggKiAtX3o7XG4gICAgICAgIG91dC56ID0gaXogKiBfdyArIGl3ICogLV96ICsgaXggKiAtX3kgLSBpeSAqIC1feDtcbiAgICAgICAgb3V0LncgPSBhLnc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENvbnZlcnRzIHRoZSBnaXZlbiB2ZWN0b3IgdG8gYW4gYXJyYXlcbiAgICAgKiBAemgg5ZCR6YeP6L2s5pWw57uEXG4gICAgICogQHBhcmFtIG9mcyBBcnJheSBTdGFydCBPZmZzZXRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRvQXJyYXkgPE91dD4gKG91dDogT3V0LCB2OiBJVmVjNExpa2UsIG9mcyA9IDApIHtcbiAgICAgICAgb3V0W29mcyArIDBdID0gdi54O1xuICAgICAgICBvdXRbb2ZzICsgMV0gPSB2Lnk7XG4gICAgICAgIG91dFtvZnMgKyAyXSA9IHYuejtcbiAgICAgICAgb3V0W29mcyArIDNdID0gdi53O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDb252ZXJ0cyB0aGUgZ2l2ZW4gYXJyYXkgdG8gYSB2ZWN0b3JcbiAgICAgKiBAemgg5pWw57uE6L2s5ZCR6YePXG4gICAgICogQHBhcmFtIG9mcyBBcnJheSBTdGFydCBPZmZzZXRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21BcnJheSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGFyciwgb2ZzID0gMCkge1xuICAgICAgICBvdXQueCA9IGFycltvZnMgKyAwXTtcbiAgICAgICAgb3V0LnkgPSBhcnJbb2ZzICsgMV07XG4gICAgICAgIG91dC56ID0gYXJyW29mcyArIDJdO1xuICAgICAgICBvdXQudyA9IGFycltvZnMgKyAzXTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2hlY2sgdGhlIGVxdWFsaXR5IG9mIHRoZSB0d28gZ2l2ZW4gdmVjdG9yc1xuICAgICAqIEB6aCDlkJHph4/nrYnku7fliKTmlq1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHN0cmljdEVxdWFscyA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgcmV0dXJuIGEueCA9PT0gYi54ICYmIGEueSA9PT0gYi55ICYmIGEueiA9PT0gYi56ICYmIGEudyA9PT0gYi53O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHRoZSB0d28gZ2l2ZW4gdmVjdG9ycyBhcmUgYXBwcm94aW1hdGVseSBlcXVpdmFsZW50XG4gICAgICogQHpoIOaOkumZpOa1rueCueaVsOivr+W3rueahOWQkemHj+i/keS8vOetieS7t+WIpOaWrVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZXF1YWxzIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQsIGI6IE91dCwgZXBzaWxvbiA9IEVQU0lMT04pIHtcbiAgICAgICAgcmV0dXJuIChNYXRoLmFicyhhLnggLSBiLngpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEueCksIE1hdGguYWJzKGIueCkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLnkgLSBiLnkpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEueSksIE1hdGguYWJzKGIueSkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLnogLSBiLnopIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEueiksIE1hdGguYWJzKGIueikpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLncgLSBiLncpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEudyksIE1hdGguYWJzKGIudykpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4geCBjb21wb25lbnQuXG4gICAgICogQHpoIHgg5YiG6YeP44CCXG4gICAgICovXG4gICAgcHVibGljIGRlY2xhcmUgeDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQGVuIHkgY29tcG9uZW50LlxuICAgICAqIEB6aCB5IOWIhumHj+OAglxuICAgICAqL1xuICAgIHB1YmxpYyBkZWNsYXJlIHk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiB6IGNvbXBvbmVudC5cbiAgICAgKiBAemggeiDliIbph4/jgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSB6OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAZW4gdyBjb21wb25lbnQuXG4gICAgICogQHpoIHcg5YiG6YeP44CCXG4gICAgICovXG4gICAgcHVibGljIGRlY2xhcmUgdzogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IgKG90aGVyOiBWZWM0KTtcblxuICAgIGNvbnN0cnVjdG9yICh4PzogbnVtYmVyLCB5PzogbnVtYmVyLCB6PzogbnVtYmVyLCB3PzogbnVtYmVyKTtcblxuICAgIGNvbnN0cnVjdG9yICh4PzogbnVtYmVyIHwgVmVjNCwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcikge1xuICAgICAgICBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHgueDtcbiAgICAgICAgICAgIHRoaXMueSA9IHgueTtcbiAgICAgICAgICAgIHRoaXMueiA9IHguejtcbiAgICAgICAgICAgIHRoaXMudyA9IHgudztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHggfHwgMDtcbiAgICAgICAgICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgICAgICAgICAgIHRoaXMueiA9IHogfHwgMDtcbiAgICAgICAgICAgIHRoaXMudyA9IHcgfHwgMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBjbG9uZSB0aGUgY3VycmVudCBWZWM0IHZhbHVlLlxuICAgICAqIEB6aCDlhYvpmoblvZPliY3lkJHph4/jgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgY2xvbmUgKCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlYzQodGhpcy54LCB0aGlzLnksIHRoaXMueiwgdGhpcy53KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0IHRoZSBjdXJyZW50IHZlY3RvciB2YWx1ZSB3aXRoIHRoZSBnaXZlbiB2ZWN0b3IuXG4gICAgICogQHpoIOiuvue9ruW9k+WJjeWQkemHj+S9v+WFtuS4juaMh+WumuWQkemHj+ebuOetieOAglxuICAgICAqIEBwYXJhbSBvdGhlciBTcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgcHVibGljIHNldCAob3RoZXI6IFZlYzQpO1xuXG4gICAgLyoqXG4gICAgICogQGVuIFNldCB0aGUgdmFsdWUgb2YgZWFjaCBjb21wb25lbnQgb2YgdGhlIGN1cnJlbnQgdmVjdG9yLlxuICAgICAqIEB6aCDorr7nva7lvZPliY3lkJHph4/nmoTlhbfkvZPliIbph4/lgLzjgIJcbiAgICAgKiBAcGFyYW0geCB4IHZhbHVlXG4gICAgICogQHBhcmFtIHkgeSB2YWx1ZVxuICAgICAqIEBwYXJhbSB6IHogdmFsdWVcbiAgICAgKiBAcGFyYW0gdyB3IHZhbHVlXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgcHVibGljIHNldCAoeD86IG51bWJlciwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcik7XG5cbiAgICBwdWJsaWMgc2V0ICh4PzogbnVtYmVyIHwgVmVjNCwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcikge1xuICAgICAgICBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHgueDtcbiAgICAgICAgICAgIHRoaXMueSA9IHgueTtcbiAgICAgICAgICAgIHRoaXMueiA9IHguejtcbiAgICAgICAgICAgIHRoaXMudyA9IHgudztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHggfHwgMDtcbiAgICAgICAgICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgICAgICAgICAgIHRoaXMueiA9IHogfHwgMDtcbiAgICAgICAgICAgIHRoaXMudyA9IHcgfHwgMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2hlY2sgd2hldGhlciB0aGUgdmVjdG9yIGFwcHJveGltYXRlbHkgZXF1YWxzIGFub3RoZXIgb25lLlxuICAgICAqIEB6aCDliKTmlq3lvZPliY3lkJHph4/mmK/lkKblnKjor6/lt67ojIPlm7TlhoXkuI7mjIflrprlkJHph4/nm7jnrYnjgIJcbiAgICAgKiBAcGFyYW0gb3RoZXIgU3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEBwYXJhbSBlcHNpbG9uIFRoZSBlcnJvciBhbGxvd2VkLiBJdGBzIHNob3VsZCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuXG4gICAgICogQHJldHVybnMgUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgY29tcG9uZW50cyBvZiBib3RoIHZlY3RvcnMgYXJlIGVxdWFsIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mIGVycm9yOyBvdGhlcndpc2UgaXQgcmV0dXJucyBgZmFsc2VgLlxuICAgICAqL1xuICAgIHB1YmxpYyBlcXVhbHMgKG90aGVyOiBWZWM0LCBlcHNpbG9uID0gRVBTSUxPTikge1xuICAgICAgICByZXR1cm4gKE1hdGguYWJzKHRoaXMueCAtIG90aGVyLngpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueCksIE1hdGguYWJzKG90aGVyLngpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy55IC0gb3RoZXIueSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy55KSwgTWF0aC5hYnMob3RoZXIueSkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnogLSBvdGhlci56KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLnopLCBNYXRoLmFicyhvdGhlci56KSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMudyAtIG90aGVyLncpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMudyksIE1hdGguYWJzKG90aGVyLncpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENoZWNrIHdoZXRoZXIgdGhlIHZlY3RvciBhcHByb3hpbWF0ZWx5IGVxdWFscyBhbm90aGVyIG9uZS5cbiAgICAgKiBAemgg5Yik5pat5b2T5YmN5ZCR6YeP5piv5ZCm5Zyo6K+v5beu6IyD5Zu05YaF5LiO5oyH5a6a5YiG6YeP55qE5ZCR6YeP55u4562J44CCXG4gICAgICogQHBhcmFtIHggVGhlIHggdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcGFyYW0geiBUaGUgeiB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIHcgVGhlIHcgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEBwYXJhbSBlcHNpbG9uIFRoZSBlcnJvciBhbGxvd2VkLiBJdGBzIHNob3VsZCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuXG4gICAgICogQHJldHVybnMgUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgY29tcG9uZW50cyBvZiBib3RoIHZlY3RvcnMgYXJlIGVxdWFsIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mIGVycm9yOyBvdGhlcndpc2UgaXQgcmV0dXJucyBgZmFsc2VgLlxuICAgICAqL1xuICAgIHB1YmxpYyBlcXVhbHM0ZiAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyLCBlcHNpbG9uID0gRVBTSUxPTikge1xuICAgICAgICByZXR1cm4gKE1hdGguYWJzKHRoaXMueCAtIHgpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueCksIE1hdGguYWJzKHgpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy55IC0geSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy55KSwgTWF0aC5hYnMoeSkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnogLSB6KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLnopLCBNYXRoLmFicyh6KSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMudyAtIHcpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMudyksIE1hdGguYWJzKHcpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENoZWNrIHdoZXRoZXIgdGhlIGN1cnJlbnQgdmVjdG9yIHN0cmljdGx5IGVxdWFscyBhbm90aGVyIFZlYzQuXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeWQkemHj+aYr+WQpuS4juaMh+WumuWQkemHj+ebuOetieOAglxuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHJldHVybnMgUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgY29tcG9uZW50cyBvZiBib3RoIHZlY3RvcnMgYXJlIGVxdWFsIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mIGVycm9yOyBvdGhlcndpc2UgaXQgcmV0dXJucyBgZmFsc2VgLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdHJpY3RFcXVhbHMgKG90aGVyOiBWZWM0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggPT09IG90aGVyLnggJiYgdGhpcy55ID09PSBvdGhlci55ICYmIHRoaXMueiA9PT0gb3RoZXIueiAmJiB0aGlzLncgPT09IG90aGVyLnc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENoZWNrIHdoZXRoZXIgdGhlIGN1cnJlbnQgdmVjdG9yIHN0cmljdGx5IGVxdWFscyBhbm90aGVyIFZlYzQuXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeWQkemHj+aYr+WQpuS4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOetieOAglxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcGFyYW0geSBUaGUgeSB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIHogVGhlIHogdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEBwYXJhbSB3IFRoZSB3IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcmV0dXJucyBSZXR1cm5zIGB0cnVlYCB3aGVuIHRoZSBjb21wb25lbnRzIG9mIGJvdGggdmVjdG9ycyBhcmUgZXF1YWwgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2Ugb2YgZXJyb3I7IG90aGVyd2lzZSBpdCByZXR1cm5zIGBmYWxzZWAuXG4gICAgICovXG4gICAgcHVibGljIHN0cmljdEVxdWFsczRmICh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCB3OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCA9PT0geCAmJiB0aGlzLnkgPT09IHkgJiYgdGhpcy56ID09PSB6ICYmIHRoaXMudyA9PT0gdztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlIGxpbmVhciBpbnRlcnBvbGF0aW9uIHJlc3VsdCBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyIG9uZSB3aXRoIGdpdmVuIHJhdGlvLlxuICAgICAqIEB6aCDmoLnmja7mjIflrprnmoTmj5LlgLzmr5TnjofvvIzku47lvZPliY3lkJHph4/liLDnm67moIflkJHph4/kuYvpl7TlgZrmj5LlgLzjgIJcbiAgICAgKiBAcGFyYW0gdG8gVGFyZ2V0IHZlY3RvclxuICAgICAqIEBwYXJhbSByYXRpbyBUaGUgaW50ZXJwb2xhdGlvbiBjb2VmZmljaWVudC5UaGUgcmFuZ2UgaXMgWzAsMV0uXG4gICAgICovXG4gICAgcHVibGljIGxlcnAgKHRvOiBWZWM0LCByYXRpbzogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzLng7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XG4gICAgICAgIGNvbnN0IHogPSB0aGlzLno7XG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLnc7XG4gICAgICAgIHRoaXMueCA9IHggKyByYXRpbyAqICh0by54IC0geCk7XG4gICAgICAgIHRoaXMueSA9IHkgKyByYXRpbyAqICh0by55IC0geSk7XG4gICAgICAgIHRoaXMueiA9IHogKyByYXRpbyAqICh0by56IC0geik7XG4gICAgICAgIHRoaXMudyA9IHcgKyByYXRpbyAqICh0by53IC0gdyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBSZXR1cm4gdGhlIGluZm9ybWF0aW9uIG9mIHRoZSB2ZWN0b3IgaW4gc3RyaW5nXG4gICAgICogQHpoIOi/lOWbnuW9k+WJjeWQkemHj+eahOWtl+espuS4suihqOekuuOAglxuICAgICAqIEByZXR1cm5zIFRoZSBzdHJpbmcgd2l0aCB2ZWN0b3IgaW5mb3JtYXRpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9TdHJpbmcgKCkge1xuICAgICAgICByZXR1cm4gYCgke3RoaXMueC50b0ZpeGVkKDIpfSwgJHt0aGlzLnkudG9GaXhlZCgyKX0sICR7dGhpcy56LnRvRml4ZWQoMil9LCAke3RoaXMudy50b0ZpeGVkKDIpfSlgO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDbGFtcCB0aGUgdmVjdG9yIGJldHdlZW4gbWluSW5jbHVzaXZlIGFuZCBtYXhJbmNsdXNpdmUuXG4gICAgICogQHpoIOiuvue9ruW9k+WJjeWQkemHj+eahOWAvO+8jOS9v+WFtuWQhOS4quWIhumHj+mDveWkhOS6juaMh+WumueahOiMg+WbtOWGheOAglxuICAgICAqIEBwYXJhbSBtaW5JbmNsdXNpdmUgTWluaW11bSB2YWx1ZSBhbGxvd2VkXG4gICAgICogQHBhcmFtIG1heEluY2x1c2l2ZSBNYXhpbXVtIHZhbHVlIGFsbG93ZWRcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBwdWJsaWMgY2xhbXBmIChtaW5JbmNsdXNpdmU6IFZlYzQsIG1heEluY2x1c2l2ZTogVmVjNCkge1xuICAgICAgICB0aGlzLnggPSBjbGFtcCh0aGlzLngsIG1pbkluY2x1c2l2ZS54LCBtYXhJbmNsdXNpdmUueCk7XG4gICAgICAgIHRoaXMueSA9IGNsYW1wKHRoaXMueSwgbWluSW5jbHVzaXZlLnksIG1heEluY2x1c2l2ZS55KTtcbiAgICAgICAgdGhpcy56ID0gY2xhbXAodGhpcy56LCBtaW5JbmNsdXNpdmUueiwgbWF4SW5jbHVzaXZlLnopO1xuICAgICAgICB0aGlzLncgPSBjbGFtcCh0aGlzLncsIG1pbkluY2x1c2l2ZS53LCBtYXhJbmNsdXNpdmUudyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBBZGRzIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGFub3RoZXIgb25lIGFuZCByZXR1cm4gdGhpc1xuICAgICAqIEB6aCDlkJHph4/liqDms5XjgILlsIblvZPliY3lkJHph4/kuI7mjIflrprlkJHph4/nmoTnm7jliqBcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxuICAgICAqL1xuICAgIHB1YmxpYyBhZGQgKG90aGVyOiBWZWM0KSB7XG4gICAgICAgIHRoaXMueCArPSBvdGhlci54O1xuICAgICAgICB0aGlzLnkgKz0gb3RoZXIueTtcbiAgICAgICAgdGhpcy56ICs9IG90aGVyLno7XG4gICAgICAgIHRoaXMudyArPSBvdGhlci53O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQWRkcyB0aGUgY3VycmVudCB2ZWN0b3Igd2l0aCBhbm90aGVyIG9uZSBhbmQgcmV0dXJuIHRoaXNcbiAgICAgKiBAemgg5ZCR6YeP5Yqg5rOV44CC5bCG5b2T5YmN5ZCR6YeP5LiO5oyH5a6a5YiG6YeP55qE5ZCR6YeP55u45YqgXG4gICAgICogQHBhcmFtIHggVGhlIHggdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcGFyYW0geiBUaGUgeiB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIHcgVGhlIHcgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqL1xuICAgIHB1YmxpYyBhZGQ0ZiAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueCArPSB4O1xuICAgICAgICB0aGlzLnkgKz0geTtcbiAgICAgICAgdGhpcy56ICs9IHo7XG4gICAgICAgIHRoaXMudyArPSB3O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU3VidHJhY3RzIG9uZSB2ZWN0b3IgZnJvbSB0aGlzLCBhbmQgcmV0dXJucyB0aGlzLlxuICAgICAqIEB6aCDlkJHph4/lh4/ms5XjgILlsIblvZPliY3lkJHph4/lh4/ljrvmjIflrprlkJHph49cbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxuICAgICAqL1xuICAgIHB1YmxpYyBzdWJ0cmFjdCAob3RoZXI6IFZlYzQpIHtcbiAgICAgICAgdGhpcy54IC09IG90aGVyLng7XG4gICAgICAgIHRoaXMueSAtPSBvdGhlci55O1xuICAgICAgICB0aGlzLnogLT0gb3RoZXIuejtcbiAgICAgICAgdGhpcy53IC09IG90aGVyLnc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTdWJ0cmFjdHMgb25lIHZlY3RvciBmcm9tIHRoaXMsIGFuZCByZXR1cm5zIHRoaXMuXG4gICAgICogQHpoIOWQkemHj+WHj+azleOAguWwhuW9k+WJjeWQkemHj+WHj+WOu+aMh+WumuWIhumHj+eahOWQkemHj1xuICAgICAqIEBwYXJhbSB4IFRoZSB4IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcGFyYW0geSBUaGUgeSB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIHogVGhlIHogdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEBwYXJhbSB3IFRoZSB3IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKi9cbiAgICBwdWJsaWMgc3VidHJhY3Q0ZiAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueCAtPSB4O1xuICAgICAgICB0aGlzLnkgLT0geTtcbiAgICAgICAgdGhpcy56IC09IHo7XG4gICAgICAgIHRoaXMudyAtPSB3O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gTXVsdGlwbGllcyB0aGUgY3VycmVudCB2ZWN0b3Igd2l0aCBhIG51bWJlciwgYW5kIHJldHVybnMgdGhpcy5cbiAgICAgKiBAemgg5ZCR6YeP5pWw5LmY44CC5bCG5b2T5YmN5ZCR6YeP5pWw5LmY5oyH5a6a5qCH6YePXG4gICAgICogQHBhcmFtIHNjYWxhciBzY2FsYXIgbnVtYmVyXG4gICAgICovXG4gICAgcHVibGljIG11bHRpcGx5U2NhbGFyIChzY2FsYXI6IG51bWJlcikge1xuICAgICAgICBpZiAodHlwZW9mIHNjYWxhciA9PT0gJ29iamVjdCcpIHsgY29uc29sZS53YXJuKCdzaG91bGQgdXNlIFZlYzQubXVsdGlwbHkgZm9yIHZlY3RvciAqIHZlY3RvciBvcGVyYXRpb24nKTsgfVxuICAgICAgICB0aGlzLnggKj0gc2NhbGFyO1xuICAgICAgICB0aGlzLnkgKj0gc2NhbGFyO1xuICAgICAgICB0aGlzLnogKj0gc2NhbGFyO1xuICAgICAgICB0aGlzLncgKj0gc2NhbGFyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gTXVsdGlwbGllcyB0aGUgY3VycmVudCB2ZWN0b3Igd2l0aCBhbm90aGVyIG9uZSBhbmQgcmV0dXJuIHRoaXNcbiAgICAgKiBAemgg5ZCR6YeP5LmY5rOV44CC5bCG5b2T5YmN5ZCR6YeP5LmY5Lul5oyH5a6a5ZCR6YePXG4gICAgICogQHBhcmFtIG90aGVyIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKi9cbiAgICBwdWJsaWMgbXVsdGlwbHkgKG90aGVyOiBWZWM0KSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3RoZXIgIT09ICdvYmplY3QnKSB7IGNvbnNvbGUud2Fybignc2hvdWxkIHVzZSBWZWM0LnNjYWxlIGZvciB2ZWN0b3IgKiBzY2FsYXIgb3BlcmF0aW9uJyk7IH1cbiAgICAgICAgdGhpcy54ICo9IG90aGVyLng7XG4gICAgICAgIHRoaXMueSAqPSBvdGhlci55O1xuICAgICAgICB0aGlzLnogKj0gb3RoZXIuejtcbiAgICAgICAgdGhpcy53ICo9IG90aGVyLnc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBNdWx0aXBsaWVzIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGFub3RoZXIgb25lIGFuZCByZXR1cm4gdGhpc1xuICAgICAqIEB6aCDlkJHph4/kuZjms5XjgILlsIblvZPliY3lkJHph4/kuI7mjIflrprliIbph4/nmoTlkJHph4/nm7jkuZjnmoTnu5PmnpzotYvlgLznu5nlvZPliY3lkJHph4/jgIJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIHkgVGhlIHkgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEBwYXJhbSB6IFRoZSB6IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gdyBUaGUgdyB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICovXG4gICAgcHVibGljIG11bHRpcGx5NGYgKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggKj0geDtcbiAgICAgICAgdGhpcy55ICo9IHk7XG4gICAgICAgIHRoaXMueiAqPSB6O1xuICAgICAgICB0aGlzLncgKj0gdztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEVsZW1lbnQtd2lzZWx5IGRpdmlkZXMgdGhpcyB2ZWN0b3Igd2l0aCBhbm90aGVyIG9uZSwgYW5kIHJldHVybiB0aGlzLlxuICAgICAqIEB6aCDlkJHph4/pgJDlhYPntKDnm7jpmaTjgILlsIblvZPliY3lkJHph4/kuI7mjIflrprliIbph4/nmoTlkJHph4/nm7jpmaTnmoTnu5PmnpzotYvlgLznu5nlvZPliY3lkJHph4/jgIJcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxuICAgICAqL1xuICAgIHB1YmxpYyBkaXZpZGUgKG90aGVyOiBWZWM0KSB7XG4gICAgICAgIHRoaXMueCAvPSBvdGhlci54O1xuICAgICAgICB0aGlzLnkgLz0gb3RoZXIueTtcbiAgICAgICAgdGhpcy56IC89IG90aGVyLno7XG4gICAgICAgIHRoaXMudyAvPSBvdGhlci53O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlbHkgZGl2aWRlcyB0aGlzIHZlY3RvciB3aXRoIGFub3RoZXIgb25lLCBhbmQgcmV0dXJuIHRoaXMuXG4gICAgICogQHpoIOWQkemHj+mAkOWFg+e0oOebuOmZpOOAguWwhuW9k+WJjeWQkemHj+S4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOmZpOeahOe7k+aenOi1i+WAvOe7meW9k+WJjeWQkemHj+OAglxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcGFyYW0geSBUaGUgeSB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIHogVGhlIHogdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEBwYXJhbSB3IFRoZSB3IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKi9cbiAgICBwdWJsaWMgZGl2aWRlNGYgKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggLz0geDtcbiAgICAgICAgdGhpcy55IC89IHk7XG4gICAgICAgIHRoaXMueiAvPSB6O1xuICAgICAgICB0aGlzLncgLz0gdztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgZWFjaCBjb21wb25lbnQgb2YgdGhpcyB2ZWN0b3Igd2l0aCBpdHMgbmVnYXRpdmUgdmFsdWVcbiAgICAgKiBAemgg5bCG5b2T5YmN5ZCR6YeP55qE5ZCE5Liq5YiG6YeP5Y+W5Y+NXG4gICAgICovXG4gICAgcHVibGljIG5lZ2F0aXZlICgpIHtcbiAgICAgICAgdGhpcy54ID0gLXRoaXMueDtcbiAgICAgICAgdGhpcy55ID0gLXRoaXMueTtcbiAgICAgICAgdGhpcy56ID0gLXRoaXMuejtcbiAgICAgICAgdGhpcy53ID0gLXRoaXMudztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IHdpdGggYW5vdGhlciB2ZWN0b3JcbiAgICAgKiBAemgg5ZCR6YeP54K55LmY44CCXG4gICAgICogQHBhcmFtIG90aGVyIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcmV0dXJucyDlvZPliY3lkJHph4/kuI7mjIflrprlkJHph4/ngrnkuZjnmoTnu5PmnpzjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgZG90ICh2ZWN0b3I6IFZlYzQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHZlY3Rvci54ICsgdGhpcy55ICogdmVjdG9yLnkgKyB0aGlzLnogKiB2ZWN0b3IueiArIHRoaXMudyAqIHZlY3Rvci53O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBjcm9zcyBwcm9kdWN0IHdpdGggYW5vdGhlciB2ZWN0b3IuXG4gICAgICogQHpoIOWQkemHj+WPieS5mOOAguinhuW9k+WJjeWQkemHj+WSjOaMh+WumuWQkemHj+S4uuS4iee7tOWQkemHj++8iOiIjeW8gyB3IOWIhumHj++8ie+8jOWwhuW9k+WJjeWQkemHj+W3puWPieS5mOaMh+WumuWQkemHj1xuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICovXG4gICAgcHVibGljIGNyb3NzICh2ZWN0b3I6IFZlYzQpIHtcbiAgICAgICAgY29uc3QgeyB4OiBheCwgeTogYXksIHo6IGF6IH0gPSB0aGlzO1xuICAgICAgICBjb25zdCB7IHg6IGJ4LCB5OiBieSwgejogYnogfSA9IHZlY3RvcjtcblxuICAgICAgICB0aGlzLnggPSBheSAqIGJ6IC0gYXogKiBieTtcbiAgICAgICAgdGhpcy55ID0gYXogKiBieCAtIGF4ICogYno7XG4gICAgICAgIHRoaXMueiA9IGF4ICogYnkgLSBheSAqIGJ4O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gUmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxuICAgICAqIEB6aCDorqHnrpflkJHph4/nmoTplb/luqbvvIjmqKHvvInjgIJcbiAgICAgKiBAcmV0dXJucyBMZW5ndGggb2YgdmVjdG9yXG4gICAgICovXG4gICAgcHVibGljIGxlbmd0aCAoKSB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzLng7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XG4gICAgICAgIGNvbnN0IHogPSB0aGlzLno7XG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLnc7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBSZXR1cm5zIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICAgKiBAemgg6K6h566X5ZCR6YeP6ZW/5bqm77yI5qih77yJ55qE5bmz5pa544CCXG4gICAgICogQHJldHVybnMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yXG4gICAgICovXG4gICAgcHVibGljIGxlbmd0aFNxciAoKSB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzLng7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XG4gICAgICAgIGNvbnN0IHogPSB0aGlzLno7XG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLnc7XG4gICAgICAgIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gTm9ybWFsaXplIHRoZSBjdXJyZW50IHZlY3Rvci5cbiAgICAgKiBAemgg5bCG5b2T5YmN5ZCR6YeP5b2S5LiA5YyWXG4gICAgICovXG4gICAgcHVibGljIG5vcm1hbGl6ZSAoKSB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzLng7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XG4gICAgICAgIGNvbnN0IHogPSB0aGlzLno7XG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLnc7XG4gICAgICAgIGxldCBsZW4gPSB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdztcbiAgICAgICAgaWYgKGxlbiA+IDApIHtcbiAgICAgICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICAgICAgICAgIHRoaXMueCA9IHggKiBsZW47XG4gICAgICAgICAgICB0aGlzLnkgPSB5ICogbGVuO1xuICAgICAgICAgICAgdGhpcy56ID0geiAqIGxlbjtcbiAgICAgICAgICAgIHRoaXMudyA9IHcgKiBsZW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFRyYW5zZm9ybXMgdGhlIHZlYzQgd2l0aCBhIG1hdDRcbiAgICAgKiBAemgg5bqU55So5Zub57u055+p6Zi15Y+Y5o2i5Yiw5b2T5YmN55+p6Zi1XG4gICAgICogQHBhcmFtIG1hdHJpeCBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAgICAgKi9cbiAgICBwdWJsaWMgdHJhbnNmb3JtTWF0NCAobWF0cml4OiBNYXQ0KSB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzLng7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XG4gICAgICAgIGNvbnN0IHogPSB0aGlzLno7XG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLnc7XG4gICAgICAgIHRoaXMueCA9IG1hdHJpeC5tMDAgKiB4ICsgbWF0cml4Lm0wNCAqIHkgKyBtYXRyaXgubTA4ICogeiArIG1hdHJpeC5tMTIgKiB3O1xuICAgICAgICB0aGlzLnkgPSBtYXRyaXgubTAxICogeCArIG1hdHJpeC5tMDUgKiB5ICsgbWF0cml4Lm0wOSAqIHogKyBtYXRyaXgubTEzICogdztcbiAgICAgICAgdGhpcy56ID0gbWF0cml4Lm0wMiAqIHggKyBtYXRyaXgubTA2ICogeSArIG1hdHJpeC5tMTAgKiB6ICsgbWF0cml4Lm0xNCAqIHc7XG4gICAgICAgIHRoaXMudyA9IG1hdHJpeC5tMDMgKiB4ICsgbWF0cml4Lm0wNyAqIHkgKyBtYXRyaXgubTExICogeiArIG1hdHJpeC5tMTUgKiB3O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iXX0=