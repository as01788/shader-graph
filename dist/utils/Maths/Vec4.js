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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVjNC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlscy9NYXRocy9WZWM0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLG1DQUFpRDtBQUVqRDs7O0dBR0c7QUFDRixNQUFhLElBQUk7SUFxZGQsWUFBYSxDQUFpQixFQUFFLENBQVUsRUFBRSxDQUFVLEVBQUUsQ0FBVTtRQUM5RCxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDNUIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO2FBQU07WUFDSCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBNWREOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQTBCLENBQU07UUFDL0MsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxJQUFJLENBQTBCLEdBQVEsRUFBRSxDQUFNO1FBQ3hELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxHQUFHLENBQTBCLEdBQVEsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQzNGLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFNO1FBQy9ELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTTtRQUNwRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQU07UUFDcEUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFNO1FBQ2xFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxJQUFJLENBQTBCLEdBQVEsRUFBRSxDQUFNO1FBQ3hELEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBMEIsR0FBUSxFQUFFLENBQU07UUFDekQsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsR0FBRyxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQU07UUFDL0QsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxHQUFHLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTTtRQUMvRCxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBMEIsR0FBUSxFQUFFLENBQU07UUFDekQsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQVM7UUFDN0UsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsV0FBVyxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQU0sRUFBRSxLQUFhO1FBQ3RGLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM1QixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDNUIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBMEIsQ0FBTSxFQUFFLENBQU07UUFDMUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxlQUFlLENBQTBCLENBQU0sRUFBRSxDQUFNO1FBQ2pFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcs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Q0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdEQsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN0RCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsZUFBZSxDQUM1QixHQUFRLEVBQUUsQ0FBVSxFQUFFLENBQVU7UUFDN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdEQsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENB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LEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBMEIsQ0FBTSxFQUFFLENBQU07UUFDOUQsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQTBCLENBQU0sRUFBRSxDQUFNLEVBQUUsT0FBTyxHQUFHLGVBQU87UUFDM0UsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2VBQzdFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2VBQzVFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2VBQzVFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBNENEOzs7T0FHRztJQUNJLEtBQUs7UUFDUixPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBcUJNLEdBQUcsQ0FBRSxDQUFpQixFQUFFLENBQVUsRUFBRSxDQUFVLEVBQUUsQ0FBVTtRQUM3RCxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDNUIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO2FBQU07WUFDSCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFFLEtBQVcsRUFBRSxPQUFPLEdBQUcsZUFBTztRQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFDM0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFDMUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFDMUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSSxRQUFRLENBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLE9BQU8sR0FBRyxlQUFPO1FBQzFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFDL0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2VBQzlFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztlQUM5RSxJQUFJLENBQUMsR0FBRyxD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QUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0MsUUFBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxZQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXQ0IH0gZnJvbSBcIi4vTWF0NFwiO1xyXG5pbXBvcnQgeyBJVmVjNExpa2UsIElNYXQ0TGlrZSwgSVF1YXRMaWtlIH0gZnJvbSBcIi4vdHlwZS1kZWZpbmVcIjtcclxuaW1wb3J0IHsgRVBTSUxPTiwgcmFuZG9tLCBjbGFtcCB9IGZyb20gXCIuL3V0aWxzXCI7XHJcblxyXG4vKipcclxuICogQGVuIFJlcHJlc2VudGF0aW9uIG9mIGZvdXItZGltZW5zaW9uYWwgdmVjdG9ycy5cclxuICogQHpoIOWbm+e7tOWQkemHj+OAglxyXG4gKi9cclxuIGV4cG9ydCBjbGFzcyBWZWM0ICB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFpFUk8gPSBPYmplY3QuZnJlZXplKG5ldyBWZWM0KDAsIDAsIDAsIDApKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgT05FID0gT2JqZWN0LmZyZWV6ZShuZXcgVmVjNCgxLCAxLCAxLCAxKSk7XHJcbiAgICBwdWJsaWMgc3RhdGljIE5FR19PTkUgPSBPYmplY3QuZnJlZXplKG5ldyBWZWM0KC0xLCAtMSwgLTEsIC0xKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gT2J0YWlucyBhIGNsb25lIG9mIHRoZSBnaXZlbiB2ZWN0b3Igb2JqZWN0XHJcbiAgICAgKiBAemgg6I635b6X5oyH5a6a5ZCR6YeP55qE5ou36LSdXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xvbmUgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjNChhLngsIGEueSwgYS56LCBhLncpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENvcHkgdGhlIHRhcmdldCB2ZWN0b3IgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IHZlY3RvciBvYmplY3RcclxuICAgICAqIEB6aCDlpI3liLbnm67moIflkJHph49cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjb3B5IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSBhLng7XHJcbiAgICAgICAgb3V0LnkgPSBhLnk7XHJcbiAgICAgICAgb3V0LnogPSBhLno7XHJcbiAgICAgICAgb3V0LncgPSBhLnc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIHRoZSBvdXQgdmVjdG9yIHdpdGggdGhlIGdpdmVuIHgsIHksIHogYW5kIHcgdmFsdWVzXHJcbiAgICAgKiBAemgg6K6+572u5ZCR6YeP5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyKSB7XHJcbiAgICAgICAgb3V0LnggPSB4O1xyXG4gICAgICAgIG91dC55ID0geTtcclxuICAgICAgICBvdXQueiA9IHo7XHJcbiAgICAgICAgb3V0LncgPSB3O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlIHZlY3RvciBhZGRpdGlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgdmVjdG9yIG9iamVjdFxyXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+WKoOazlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSBhLnggKyBiLng7XHJcbiAgICAgICAgb3V0LnkgPSBhLnkgKyBiLnk7XHJcbiAgICAgICAgb3V0LnogPSBhLnogKyBiLno7XHJcbiAgICAgICAgb3V0LncgPSBhLncgKyBiLnc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBFbGVtZW50LXdpc2UgdmVjdG9yIHN1YnRyYWN0aW9uIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5YeP5rOVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3VidHJhY3QgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gYS54IC0gYi54O1xyXG4gICAgICAgIG91dC55ID0gYS55IC0gYi55O1xyXG4gICAgICAgIG91dC56ID0gYS56IC0gYi56O1xyXG4gICAgICAgIG91dC53ID0gYS53IC0gYi53O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlIHZlY3RvciBtdWx0aXBsaWNhdGlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgdmVjdG9yIG9iamVjdFxyXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+S5mOazlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG11bHRpcGx5IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IGEueCAqIGIueDtcclxuICAgICAgICBvdXQueSA9IGEueSAqIGIueTtcclxuICAgICAgICBvdXQueiA9IGEueiAqIGIuejtcclxuICAgICAgICBvdXQudyA9IGEudyAqIGIudztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEVsZW1lbnQtd2lzZSB2ZWN0b3IgZGl2aXNpb24gYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IHZlY3RvciBvYmplY3RcclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/pmaTms5VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkaXZpZGUgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gYS54IC8gYi54O1xyXG4gICAgICAgIG91dC55ID0gYS55IC8gYi55O1xyXG4gICAgICAgIG91dC56ID0gYS56IC8gYi56O1xyXG4gICAgICAgIG91dC53ID0gYS53IC8gYi53O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gUm91bmRzIHVwIGJ5IGVsZW1lbnRzIG9mIHRoZSB2ZWN0b3IgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IHZlY3RvciBvYmplY3RcclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lkJHkuIrlj5bmlbRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjZWlsIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSBNYXRoLmNlaWwoYS54KTtcclxuICAgICAgICBvdXQueSA9IE1hdGguY2VpbChhLnkpO1xyXG4gICAgICAgIG91dC56ID0gTWF0aC5jZWlsKGEueik7XHJcbiAgICAgICAgb3V0LncgPSBNYXRoLmNlaWwoYS53KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEVsZW1lbnQtd2lzZSByb3VuZHMgZG93biBvZiB0aGUgY3VycmVudCB2ZWN0b3IgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gdGhlIG91dCB2ZWN0b3JcclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lkJHkuIvlj5bmlbRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmbG9vciA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5mbG9vcihhLngpO1xyXG4gICAgICAgIG91dC55ID0gTWF0aC5mbG9vcihhLnkpO1xyXG4gICAgICAgIG91dC56ID0gTWF0aC5mbG9vcihhLnopO1xyXG4gICAgICAgIG91dC53ID0gTWF0aC5mbG9vcihhLncpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgbWluaW11bSB2YWx1ZXMgYnkgZWxlbWVudHMgb2YgdGhlIHZlY3RvciBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byB0aGUgb3V0IHZlY3RvclxyXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+acgOWwj+WAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1pbiA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSBNYXRoLm1pbihhLngsIGIueCk7XHJcbiAgICAgICAgb3V0LnkgPSBNYXRoLm1pbihhLnksIGIueSk7XHJcbiAgICAgICAgb3V0LnogPSBNYXRoLm1pbihhLnosIGIueik7XHJcbiAgICAgICAgb3V0LncgPSBNYXRoLm1pbihhLncsIGIudyk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBtYXhpbXVtIHZhbHVlcyBieSBlbGVtZW50cyBvZiB0aGUgdmVjdG9yIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIHRoZSBvdXQgdmVjdG9yXHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5pyA5aSn5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbWF4IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IE1hdGgubWF4KGEueCwgYi54KTtcclxuICAgICAgICBvdXQueSA9IE1hdGgubWF4KGEueSwgYi55KTtcclxuICAgICAgICBvdXQueiA9IE1hdGgubWF4KGEueiwgYi56KTtcclxuICAgICAgICBvdXQudyA9IE1hdGgubWF4KGEudywgYi53KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgZWxlbWVudC13aXNlIHJvdW5kIHJlc3VsdHMgYW5kIHNhdmUgdG8gdGhlIG91dCB2ZWN0b3JcclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lm5voiI3kupTlhaXlj5bmlbRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByb3VuZCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5yb3VuZChhLngpO1xyXG4gICAgICAgIG91dC55ID0gTWF0aC5yb3VuZChhLnkpO1xyXG4gICAgICAgIG91dC56ID0gTWF0aC5yb3VuZChhLnopO1xyXG4gICAgICAgIG91dC53ID0gTWF0aC5yb3VuZChhLncpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVmVjdG9yIHNjYWxhciBtdWx0aXBsaWNhdGlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgdmVjdG9yIG9iamVjdFxyXG4gICAgICogQHpoIOWQkemHj+agh+mHj+S5mOazlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG11bHRpcGx5U2NhbGFyIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBudW1iZXIpIHtcclxuICAgICAgICBvdXQueCA9IGEueCAqIGI7XHJcbiAgICAgICAgb3V0LnkgPSBhLnkgKiBiO1xyXG4gICAgICAgIG91dC56ID0gYS56ICogYjtcclxuICAgICAgICBvdXQudyA9IGEudyAqIGI7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBFbGVtZW50LXdpc2UgbXVsdGlwbGljYXRpb24gYW5kIGFkZGl0aW9uIHdpdGggdGhlIGVxdWF0aW9uOiBhICsgYiAqIHNjYWxlXHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5LmY5YqgOiBBICsgQiAqIHNjYWxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2NhbGVBbmRBZGQgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgc2NhbGU6IG51bWJlcikge1xyXG4gICAgICAgIG91dC54ID0gYS54ICsgKGIueCAqIHNjYWxlKTtcclxuICAgICAgICBvdXQueSA9IGEueSArIChiLnkgKiBzY2FsZSk7XHJcbiAgICAgICAgb3V0LnogPSBhLnogKyAoYi56ICogc2NhbGUpO1xyXG4gICAgICAgIG91dC53ID0gYS53ICsgKGIudyAqIHNjYWxlKTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGVhbiBkaXN0YW5jZSBvZiB0d28gdmVjdG9yc1xyXG4gICAgICogQHpoIOaxguS4pOWQkemHj+eahOasp+awj+i3neemu1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRpc3RhbmNlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIGNvbnN0IHggPSBiLnggLSBhLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGIueSAtIGEueTtcclxuICAgICAgICBjb25zdCB6ID0gYi56IC0gYS56O1xyXG4gICAgICAgIGNvbnN0IHcgPSBiLncgLSBhLnc7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRlYW4gZGlzdGFuY2Ugb2YgdHdvIHZlY3RvcnNcclxuICAgICAqIEB6aCDmsYLkuKTlkJHph4/nmoTmrKfmsI/ot53nprvlubPmlrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzcXVhcmVkRGlzdGFuY2UgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgY29uc3QgeCA9IGIueCAtIGEueDtcclxuICAgICAgICBjb25zdCB5ID0gYi55IC0gYS55O1xyXG4gICAgICAgIGNvbnN0IHogPSBiLnogLSBhLno7XHJcbiAgICAgICAgY29uc3QgdyA9IGIudyAtIGEudztcclxuICAgICAgICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3JcclxuICAgICAqIEB6aCDmsYLlkJHph4/plb/luqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsZW4gPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCkge1xyXG4gICAgICAgIGNvbnN0IHggPSBhLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGEueTtcclxuICAgICAgICBjb25zdCB6ID0gYS56O1xyXG4gICAgICAgIGNvbnN0IHcgPSBhLnc7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhlIHZlY3RvclxyXG4gICAgICogQHpoIOaxguWQkemHj+mVv+W6puW5s+aWuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxlbmd0aFNxciA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAoYTogT3V0KSB7XHJcbiAgICAgICAgY29uc3QgeCA9IGEueDtcclxuICAgICAgICBjb25zdCB5ID0gYS55O1xyXG4gICAgICAgIGNvbnN0IHogPSBhLno7XHJcbiAgICAgICAgY29uc3QgdyA9IGEudztcclxuICAgICAgICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0cyBlYWNoIGVsZW1lbnQgdG8gaXRzIG5lZ2F0aXZlIHZhbHVlXHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W6LSfXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbmVnYXRlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSAtYS54O1xyXG4gICAgICAgIG91dC55ID0gLWEueTtcclxuICAgICAgICBvdXQueiA9IC1hLno7XHJcbiAgICAgICAgb3V0LncgPSAtYS53O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0cyBlYWNoIGVsZW1lbnQgdG8gaXRzIGludmVyc2UgdmFsdWUsIHplcm8gdmFsdWUgd2lsbCBiZWNvbWUgSW5maW5pdHlcclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lj5blgJLmlbDvvIzmjqXov5EgMCDml7bov5Tlm54gSW5maW5pdHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnZlcnNlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSAxLjAgLyBhLng7XHJcbiAgICAgICAgb3V0LnkgPSAxLjAgLyBhLnk7XHJcbiAgICAgICAgb3V0LnogPSAxLjAgLyBhLno7XHJcbiAgICAgICAgb3V0LncgPSAxLjAgLyBhLnc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIGVhY2ggZWxlbWVudCB0byBpdHMgaW52ZXJzZSB2YWx1ZSwgemVybyB2YWx1ZSB3aWxsIHJlbWFpbiB6ZXJvXHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W5YCS5pWw77yM5o6l6L+RIDAg5pe26L+U5ZueIDBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnZlcnNlU2FmZSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIGNvbnN0IHggPSBhLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGEueTtcclxuICAgICAgICBjb25zdCB6ID0gYS56O1xyXG4gICAgICAgIGNvbnN0IHcgPSBhLnc7XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyh4KSA8IEVQU0lMT04pIHtcclxuICAgICAgICAgICAgb3V0LnggPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dC54ID0gMS4wIC8geDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyh5KSA8IEVQU0lMT04pIHtcclxuICAgICAgICAgICAgb3V0LnkgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dC55ID0gMS4wIC8geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyh6KSA8IEVQU0lMT04pIHtcclxuICAgICAgICAgICAgb3V0LnogPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dC56ID0gMS4wIC8gejtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyh3KSA8IEVQU0lMT04pIHtcclxuICAgICAgICAgICAgb3V0LncgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dC53ID0gMS4wIC8gdztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0cyB0aGUgbm9ybWFsaXplZCB2ZWN0b3IgdG8gdGhlIG91dCB2ZWN0b3JcclxuICAgICAqIEB6aCDlvZLkuIDljJblkJHph49cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBub3JtYWxpemUgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBjb25zdCB4ID0gYS54O1xyXG4gICAgICAgIGNvbnN0IHkgPSBhLnk7XHJcbiAgICAgICAgY29uc3QgeiA9IGEuejtcclxuICAgICAgICBjb25zdCB3ID0gYS53O1xyXG4gICAgICAgIGxldCBsZW4gPSB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdztcclxuICAgICAgICBpZiAobGVuID4gMCkge1xyXG4gICAgICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XHJcbiAgICAgICAgICAgIG91dC54ID0geCAqIGxlbjtcclxuICAgICAgICAgICAgb3V0LnkgPSB5ICogbGVuO1xyXG4gICAgICAgICAgICBvdXQueiA9IHogKiBsZW47XHJcbiAgICAgICAgICAgIG91dC53ID0gdyAqIGxlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0aGUgdmVjdG9yXHJcbiAgICAgKiBAemgg5ZCR6YeP54K556ev77yI5pWw6YeP56ev77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZG90IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIHJldHVybiBhLnggKiBiLnggKyBhLnkgKiBiLnkgKyBhLnogKiBiLnogKyBhLncgKiBiLnc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjdG9ycyB3aXRoIGEgZ2l2ZW4gcmF0aW9cclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/nur/mgKfmj5LlgLzvvJogQSArIHQgKiAoQiAtIEEpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbGVycCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCB0OiBudW1iZXIpIHtcclxuICAgICAgICBvdXQueCA9IGEueCArIHQgKiAoYi54IC0gYS54KTtcclxuICAgICAgICBvdXQueSA9IGEueSArIHQgKiAoYi55IC0gYS55KTtcclxuICAgICAgICBvdXQueiA9IGEueiArIHQgKiAoYi56IC0gYS56KTtcclxuICAgICAgICBvdXQudyA9IGEudyArIHQgKiAoYi53IC0gYS53KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEdlbmVyYXRlcyBhIHVuaWZvcm1seSBkaXN0cmlidXRlZCByYW5kb20gdmVjdG9yIHBvaW50cyBmcm9tIGNlbnRlciB0byB0aGUgc3VyZmFjZSBvZiB0aGUgdW5pdCBzcGhlcmVcclxuICAgICAqIEB6aCDnlJ/miJDkuIDkuKrlnKjljZXkvY3nkIPkvZPkuIrlnYfljIDliIbluIPnmoTpmo/mnLrlkJHph49cclxuICAgICAqIEBwYXJhbSBzY2FsZSB2ZWN0b3IgbGVuZ3RoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmFuZG9tIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgc2NhbGU/OiBudW1iZXIpIHtcclxuICAgICAgICBzY2FsZSA9IHNjYWxlIHx8IDEuMDtcclxuXHJcbiAgICAgICAgY29uc3QgcGhpID0gcmFuZG9tKCkgKiAyLjAgKiBNYXRoLlBJO1xyXG4gICAgICAgIGNvbnN0IGNvc1RoZXRhID0gcmFuZG9tKCkgKiAyIC0gMTtcclxuICAgICAgICBjb25zdCBzaW5UaGV0YSA9IE1hdGguc3FydCgxIC0gY29zVGhldGEgKiBjb3NUaGV0YSk7XHJcblxyXG4gICAgICAgIG91dC54ID0gc2luVGhldGEgKiBNYXRoLmNvcyhwaGkpICogc2NhbGU7XHJcbiAgICAgICAgb3V0LnkgPSBzaW5UaGV0YSAqIE1hdGguc2luKHBoaSkgKiBzY2FsZTtcclxuICAgICAgICBvdXQueiA9IGNvc1RoZXRhICogc2NhbGU7XHJcbiAgICAgICAgb3V0LncgPSAwO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVmVjdG9yIGFuZCBmb3VydGggb3JkZXIgbWF0cml4IG11bHRpcGxpY2F0aW9uXHJcbiAgICAgKiBAemgg5ZCR6YeP5LiO5Zub57u055+p6Zi15LmY5rOVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdHJhbnNmb3JtTWF0NCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgbTogTWF0TGlrZSkge1xyXG4gICAgICAgIGNvbnN0IHggPSBhLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGEueTtcclxuICAgICAgICBjb25zdCB6ID0gYS56O1xyXG4gICAgICAgIGNvbnN0IHcgPSBhLnc7XHJcbiAgICAgICAgb3V0LnggPSBtLm0wMCAqIHggKyBtLm0wNCAqIHkgKyBtLm0wOCAqIHogKyBtLm0xMiAqIHc7XHJcbiAgICAgICAgb3V0LnkgPSBtLm0wMSAqIHggKyBtLm0wNSAqIHkgKyBtLm0wOSAqIHogKyBtLm0xMyAqIHc7XHJcbiAgICAgICAgb3V0LnogPSBtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHogKyBtLm0xNCAqIHc7XHJcbiAgICAgICAgb3V0LncgPSBtLm0wMyAqIHggKyBtLm0wNyAqIHkgKyBtLm0xMSAqIHogKyBtLm0xNSAqIHc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBUcmFuc2Zvcm0gdGhlIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBhZmZpbmUgdHJhbnNmb3JtYXRpb25cclxuICAgICAqIEB6aCDlkJHph4/ku7/lsITlj5jmjaJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2Zvcm1BZmZpbmU8T3V0IGV4dGVuZHMgSVZlYzRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzRMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDRMaWtlPlxyXG4gICAgKG91dDogT3V0LCB2OiBWZWNMaWtlLCBtOiBNYXRMaWtlKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHYueDtcclxuICAgICAgICBjb25zdCB5ID0gdi55O1xyXG4gICAgICAgIGNvbnN0IHogPSB2Lno7XHJcbiAgICAgICAgY29uc3QgdyA9IHYudztcclxuICAgICAgICBvdXQueCA9IG0ubTAwICogeCArIG0ubTAxICogeSArIG0ubTAyICogeiArIG0ubTAzICogdztcclxuICAgICAgICBvdXQueSA9IG0ubTA0ICogeCArIG0ubTA1ICogeSArIG0ubTA2ICogeiArIG0ubTA3ICogdztcclxuICAgICAgICBvdXQueCA9IG0ubTA4ICogeCArIG0ubTA5ICogeSArIG0ubTEwICogeiArIG0ubTExICogdztcclxuICAgICAgICBvdXQudyA9IHYudztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFZlY3RvciBxdWF0ZXJuaW9uIG11bHRpcGxpY2F0aW9uXHJcbiAgICAgKiBAemgg5ZCR6YeP5Zub5YWD5pWw5LmY5rOVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdHJhbnNmb3JtUXVhdCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlLCBRdWF0TGlrZSBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHE6IFF1YXRMaWtlKSB7XHJcbiAgICAgICAgY29uc3QgeyB4LCB5LCB6IH0gPSBhO1xyXG5cclxuICAgICAgICBjb25zdCBfeCA9IHEueDtcclxuICAgICAgICBjb25zdCBfeSA9IHEueTtcclxuICAgICAgICBjb25zdCBfeiA9IHEuejtcclxuICAgICAgICBjb25zdCBfdyA9IHEudztcclxuXHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIHF1YXQgKiB2ZWNcclxuICAgICAgICBjb25zdCBpeCA9IF93ICogeCArIF95ICogeiAtIF96ICogeTtcclxuICAgICAgICBjb25zdCBpeSA9IF93ICogeSArIF96ICogeCAtIF94ICogejtcclxuICAgICAgICBjb25zdCBpeiA9IF93ICogeiArIF94ICogeSAtIF95ICogeDtcclxuICAgICAgICBjb25zdCBpdyA9IC1feCAqIHggLSBfeSAqIHkgLSBfeiAqIHo7XHJcblxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcclxuICAgICAgICBvdXQueCA9IGl4ICogX3cgKyBpdyAqIC1feCArIGl5ICogLV96IC0gaXogKiAtX3k7XHJcbiAgICAgICAgb3V0LnkgPSBpeSAqIF93ICsgaXcgKiAtX3kgKyBpeiAqIC1feCAtIGl4ICogLV96O1xyXG4gICAgICAgIG91dC56ID0gaXogKiBfdyArIGl3ICogLV96ICsgaXggKiAtX3kgLSBpeSAqIC1feDtcclxuICAgICAgICBvdXQudyA9IGEudztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENvbnZlcnRzIHRoZSBnaXZlbiB2ZWN0b3IgdG8gYW4gYXJyYXlcclxuICAgICAqIEB6aCDlkJHph4/ovazmlbDnu4RcclxuICAgICAqIEBwYXJhbSBvZnMgQXJyYXkgU3RhcnQgT2Zmc2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdG9BcnJheSA8T3V0PiAob3V0OiBPdXQsIHY6IElWZWM0TGlrZSwgb2ZzID0gMCkge1xyXG4gICAgICAgIG91dFtvZnMgKyAwXSA9IHYueDtcclxuICAgICAgICBvdXRbb2ZzICsgMV0gPSB2Lnk7XHJcbiAgICAgICAgb3V0W29mcyArIDJdID0gdi56O1xyXG4gICAgICAgIG91dFtvZnMgKyAzXSA9IHYudztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENvbnZlcnRzIHRoZSBnaXZlbiBhcnJheSB0byBhIHZlY3RvclxyXG4gICAgICogQHpoIOaVsOe7hOi9rOWQkemHj1xyXG4gICAgICogQHBhcmFtIG9mcyBBcnJheSBTdGFydCBPZmZzZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhcnIsIG9mcyA9IDApIHtcclxuICAgICAgICBvdXQueCA9IGFycltvZnMgKyAwXTtcclxuICAgICAgICBvdXQueSA9IGFycltvZnMgKyAxXTtcclxuICAgICAgICBvdXQueiA9IGFycltvZnMgKyAyXTtcclxuICAgICAgICBvdXQudyA9IGFycltvZnMgKyAzXTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENoZWNrIHRoZSBlcXVhbGl0eSBvZiB0aGUgdHdvIGdpdmVuIHZlY3RvcnNcclxuICAgICAqIEB6aCDlkJHph4/nrYnku7fliKTmlq1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzdHJpY3RFcXVhbHMgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGEueCA9PT0gYi54ICYmIGEueSA9PT0gYi55ICYmIGEueiA9PT0gYi56ICYmIGEudyA9PT0gYi53O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENoZWNrIHdoZXRoZXIgdGhlIHR3byBnaXZlbiB2ZWN0b3JzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWl2YWxlbnRcclxuICAgICAqIEB6aCDmjpLpmaTmta7ngrnmlbDor6/lt67nmoTlkJHph4/ov5HkvLznrYnku7fliKTmlq1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBlcXVhbHMgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uID0gRVBTSUxPTikge1xyXG4gICAgICAgIHJldHVybiAoTWF0aC5hYnMoYS54IC0gYi54KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLngpLCBNYXRoLmFicyhiLngpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLnkgLSBiLnkpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEueSksIE1hdGguYWJzKGIueSkpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEueiAtIGIueikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS56KSwgTWF0aC5hYnMoYi56KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS53IC0gYi53KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLncpLCBNYXRoLmFicyhiLncpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4geCBjb21wb25lbnQuXHJcbiAgICAgKiBAemggeCDliIbph4/jgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlY2xhcmUgeDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIHkgY29tcG9uZW50LlxyXG4gICAgICogQHpoIHkg5YiG6YeP44CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWNsYXJlIHk6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiB6IGNvbXBvbmVudC5cclxuICAgICAqIEB6aCB6IOWIhumHj+OAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjbGFyZSB6OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gdyBjb21wb25lbnQuXHJcbiAgICAgKiBAemggdyDliIbph4/jgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlY2xhcmUgdzogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChvdGhlcjogVmVjNCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKHg/OiBudW1iZXIsIHk/OiBudW1iZXIsIHo/OiBudW1iZXIsIHc/OiBudW1iZXIpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICh4PzogbnVtYmVyIHwgVmVjNCwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcikge1xyXG4gICAgICAgIGlmICh4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnggPSB4Lng7XHJcbiAgICAgICAgICAgIHRoaXMueSA9IHgueTtcclxuICAgICAgICAgICAgdGhpcy56ID0geC56O1xyXG4gICAgICAgICAgICB0aGlzLncgPSB4Lnc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbiAgICAgICAgICAgIHRoaXMueiA9IHogfHwgMDtcclxuICAgICAgICAgICAgdGhpcy53ID0gdyB8fCAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBjbG9uZSB0aGUgY3VycmVudCBWZWM0IHZhbHVlLlxyXG4gICAgICogQHpoIOWFi+mahuW9k+WJjeWQkemHj+OAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvbmUgKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjNCh0aGlzLngsIHRoaXMueSwgdGhpcy56LCB0aGlzLncpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFNldCB0aGUgY3VycmVudCB2ZWN0b3IgdmFsdWUgd2l0aCB0aGUgZ2l2ZW4gdmVjdG9yLlxyXG4gICAgICogQHpoIOiuvue9ruW9k+WJjeWQkemHj+S9v+WFtuS4juaMh+WumuWQkemHj+ebuOetieOAglxyXG4gICAgICogQHBhcmFtIG90aGVyIFNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqIEByZXR1cm5zIGB0aGlzYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IChvdGhlcjogVmVjNCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0IHRoZSB2YWx1ZSBvZiBlYWNoIGNvbXBvbmVudCBvZiB0aGUgY3VycmVudCB2ZWN0b3IuXHJcbiAgICAgKiBAemgg6K6+572u5b2T5YmN5ZCR6YeP55qE5YW35L2T5YiG6YeP5YC844CCXHJcbiAgICAgKiBAcGFyYW0geCB4IHZhbHVlXHJcbiAgICAgKiBAcGFyYW0geSB5IHZhbHVlXHJcbiAgICAgKiBAcGFyYW0geiB6IHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gdyB3IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCAoeD86IG51bWJlciwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcik7XHJcblxyXG4gICAgcHVibGljIHNldCAoeD86IG51bWJlciB8IFZlYzQsIHk/OiBudW1iZXIsIHo/OiBudW1iZXIsIHc/OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgdGhpcy54ID0geC54O1xyXG4gICAgICAgICAgICB0aGlzLnkgPSB4Lnk7XHJcbiAgICAgICAgICAgIHRoaXMueiA9IHguejtcclxuICAgICAgICAgICAgdGhpcy53ID0geC53O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgICAgICAgICAgdGhpcy55ID0geSB8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLnogPSB6IHx8IDA7XHJcbiAgICAgICAgICAgIHRoaXMudyA9IHcgfHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2hlY2sgd2hldGhlciB0aGUgdmVjdG9yIGFwcHJveGltYXRlbHkgZXF1YWxzIGFub3RoZXIgb25lLlxyXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeWQkemHj+aYr+WQpuWcqOivr+W3ruiMg+WbtOWGheS4juaMh+WumuWQkemHj+ebuOetieOAglxyXG4gICAgICogQHBhcmFtIG90aGVyIFNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSBlcHNpbG9uIFRoZSBlcnJvciBhbGxvd2VkLiBJdGBzIHNob3VsZCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuXHJcbiAgICAgKiBAcmV0dXJucyBSZXR1cm5zIGB0cnVlYCB3aGVuIHRoZSBjb21wb25lbnRzIG9mIGJvdGggdmVjdG9ycyBhcmUgZXF1YWwgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2Ugb2YgZXJyb3I7IG90aGVyd2lzZSBpdCByZXR1cm5zIGBmYWxzZWAuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlcXVhbHMgKG90aGVyOiBWZWM0LCBlcHNpbG9uID0gRVBTSUxPTikge1xyXG4gICAgICAgIHJldHVybiAoTWF0aC5hYnModGhpcy54IC0gb3RoZXIueCkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy54KSwgTWF0aC5hYnMob3RoZXIueCkpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueSAtIG90aGVyLnkpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueSksIE1hdGguYWJzKG90aGVyLnkpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnogLSBvdGhlci56KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLnopLCBNYXRoLmFicyhvdGhlci56KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy53IC0gb3RoZXIudykgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy53KSwgTWF0aC5hYnMob3RoZXIudykpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHRoZSB2ZWN0b3IgYXBwcm94aW1hdGVseSBlcXVhbHMgYW5vdGhlciBvbmUuXHJcbiAgICAgKiBAemgg5Yik5pat5b2T5YmN5ZCR6YeP5piv5ZCm5Zyo6K+v5beu6IyD5Zu05YaF5LiO5oyH5a6a5YiG6YeP55qE5ZCR6YeP55u4562J44CCXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0geiBUaGUgeiB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0gdyBUaGUgdyB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0gZXBzaWxvbiBUaGUgZXJyb3IgYWxsb3dlZC4gSXRgcyBzaG91bGQgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLlxyXG4gICAgICogQHJldHVybnMgUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgY29tcG9uZW50cyBvZiBib3RoIHZlY3RvcnMgYXJlIGVxdWFsIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mIGVycm9yOyBvdGhlcndpc2UgaXQgcmV0dXJucyBgZmFsc2VgLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXF1YWxzNGYgKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlciwgZXBzaWxvbiA9IEVQU0lMT04pIHtcclxuICAgICAgICByZXR1cm4gKE1hdGguYWJzKHRoaXMueCAtIHgpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueCksIE1hdGguYWJzKHgpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnkgLSB5KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLnkpLCBNYXRoLmFicyh5KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy56IC0geikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy56KSwgTWF0aC5hYnMoeikpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMudyAtIHcpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMudyksIE1hdGguYWJzKHcpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2hlY2sgd2hldGhlciB0aGUgY3VycmVudCB2ZWN0b3Igc3RyaWN0bHkgZXF1YWxzIGFub3RoZXIgVmVjNC5cclxuICAgICAqIEB6aCDliKTmlq3lvZPliY3lkJHph4/mmK/lkKbkuI7mjIflrprlkJHph4/nm7jnrYnjgIJcclxuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcmV0dXJucyBSZXR1cm5zIGB0cnVlYCB3aGVuIHRoZSBjb21wb25lbnRzIG9mIGJvdGggdmVjdG9ycyBhcmUgZXF1YWwgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2Ugb2YgZXJyb3I7IG90aGVyd2lzZSBpdCByZXR1cm5zIGBmYWxzZWAuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdHJpY3RFcXVhbHMgKG90aGVyOiBWZWM0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCA9PT0gb3RoZXIueCAmJiB0aGlzLnkgPT09IG90aGVyLnkgJiYgdGhpcy56ID09PSBvdGhlci56ICYmIHRoaXMudyA9PT0gb3RoZXIudztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHRoZSBjdXJyZW50IHZlY3RvciBzdHJpY3RseSBlcXVhbHMgYW5vdGhlciBWZWM0LlxyXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeWQkemHj+aYr+WQpuS4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOetieOAglxyXG4gICAgICogQHBhcmFtIHggVGhlIHggdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHBhcmFtIHogVGhlIHogdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHBhcmFtIHcgVGhlIHcgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHJldHVybnMgUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgY29tcG9uZW50cyBvZiBib3RoIHZlY3RvcnMgYXJlIGVxdWFsIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mIGVycm9yOyBvdGhlcndpc2UgaXQgcmV0dXJucyBgZmFsc2VgLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RyaWN0RXF1YWxzNGYgKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggPT09IHggJiYgdGhpcy55ID09PSB5ICYmIHRoaXMueiA9PT0geiAmJiB0aGlzLncgPT09IHc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlIGxpbmVhciBpbnRlcnBvbGF0aW9uIHJlc3VsdCBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyIG9uZSB3aXRoIGdpdmVuIHJhdGlvLlxyXG4gICAgICogQHpoIOagueaNruaMh+WumueahOaPkuWAvOavlOeOh++8jOS7juW9k+WJjeWQkemHj+WIsOebruagh+WQkemHj+S5i+mXtOWBmuaPkuWAvOOAglxyXG4gICAgICogQHBhcmFtIHRvIFRhcmdldCB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSByYXRpbyBUaGUgaW50ZXJwb2xhdGlvbiBjb2VmZmljaWVudC5UaGUgcmFuZ2UgaXMgWzAsMV0uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsZXJwICh0bzogVmVjNCwgcmF0aW86IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICAgICAgY29uc3QgeSA9IHRoaXMueTtcclxuICAgICAgICBjb25zdCB6ID0gdGhpcy56O1xyXG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLnc7XHJcbiAgICAgICAgdGhpcy54ID0geCArIHJhdGlvICogKHRvLnggLSB4KTtcclxuICAgICAgICB0aGlzLnkgPSB5ICsgcmF0aW8gKiAodG8ueSAtIHkpO1xyXG4gICAgICAgIHRoaXMueiA9IHogKyByYXRpbyAqICh0by56IC0geik7XHJcbiAgICAgICAgdGhpcy53ID0gdyArIHJhdGlvICogKHRvLncgLSB3KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBSZXR1cm4gdGhlIGluZm9ybWF0aW9uIG9mIHRoZSB2ZWN0b3IgaW4gc3RyaW5nXHJcbiAgICAgKiBAemgg6L+U5Zue5b2T5YmN5ZCR6YeP55qE5a2X56ym5Liy6KGo56S644CCXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgc3RyaW5nIHdpdGggdmVjdG9yIGluZm9ybWF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b1N0cmluZyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGAoJHt0aGlzLngudG9GaXhlZCgyKX0sICR7dGhpcy55LnRvRml4ZWQoMil9LCAke3RoaXMuei50b0ZpeGVkKDIpfSwgJHt0aGlzLncudG9GaXhlZCgyKX0pYDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDbGFtcCB0aGUgdmVjdG9yIGJldHdlZW4gbWluSW5jbHVzaXZlIGFuZCBtYXhJbmNsdXNpdmUuXHJcbiAgICAgKiBAemgg6K6+572u5b2T5YmN5ZCR6YeP55qE5YC877yM5L2/5YW25ZCE5Liq5YiG6YeP6YO95aSE5LqO5oyH5a6a55qE6IyD5Zu05YaF44CCXHJcbiAgICAgKiBAcGFyYW0gbWluSW5jbHVzaXZlIE1pbmltdW0gdmFsdWUgYWxsb3dlZFxyXG4gICAgICogQHBhcmFtIG1heEluY2x1c2l2ZSBNYXhpbXVtIHZhbHVlIGFsbG93ZWRcclxuICAgICAqIEByZXR1cm5zIGB0aGlzYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xhbXBmIChtaW5JbmNsdXNpdmU6IFZlYzQsIG1heEluY2x1c2l2ZTogVmVjNCkge1xyXG4gICAgICAgIHRoaXMueCA9IGNsYW1wKHRoaXMueCwgbWluSW5jbHVzaXZlLngsIG1heEluY2x1c2l2ZS54KTtcclxuICAgICAgICB0aGlzLnkgPSBjbGFtcCh0aGlzLnksIG1pbkluY2x1c2l2ZS55LCBtYXhJbmNsdXNpdmUueSk7XHJcbiAgICAgICAgdGhpcy56ID0gY2xhbXAodGhpcy56LCBtaW5JbmNsdXNpdmUueiwgbWF4SW5jbHVzaXZlLnopO1xyXG4gICAgICAgIHRoaXMudyA9IGNsYW1wKHRoaXMudywgbWluSW5jbHVzaXZlLncsIG1heEluY2x1c2l2ZS53KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBBZGRzIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGFub3RoZXIgb25lIGFuZCByZXR1cm4gdGhpc1xyXG4gICAgICogQHpoIOWQkemHj+WKoOazleOAguWwhuW9k+WJjeWQkemHj+S4juaMh+WumuWQkemHj+eahOebuOWKoFxyXG4gICAgICogQHBhcmFtIG90aGVyIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZCAob3RoZXI6IFZlYzQpIHtcclxuICAgICAgICB0aGlzLnggKz0gb3RoZXIueDtcclxuICAgICAgICB0aGlzLnkgKz0gb3RoZXIueTtcclxuICAgICAgICB0aGlzLnogKz0gb3RoZXIuejtcclxuICAgICAgICB0aGlzLncgKz0gb3RoZXIudztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBBZGRzIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGFub3RoZXIgb25lIGFuZCByZXR1cm4gdGhpc1xyXG4gICAgICogQHpoIOWQkemHj+WKoOazleOAguWwhuW9k+WJjeWQkemHj+S4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOWKoFxyXG4gICAgICogQHBhcmFtIHggVGhlIHggdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHBhcmFtIHogVGhlIHogdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHBhcmFtIHcgVGhlIHcgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkNGYgKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCArPSB4O1xyXG4gICAgICAgIHRoaXMueSArPSB5O1xyXG4gICAgICAgIHRoaXMueiArPSB6O1xyXG4gICAgICAgIHRoaXMudyArPSB3O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFN1YnRyYWN0cyBvbmUgdmVjdG9yIGZyb20gdGhpcywgYW5kIHJldHVybnMgdGhpcy5cclxuICAgICAqIEB6aCDlkJHph4/lh4/ms5XjgILlsIblvZPliY3lkJHph4/lh4/ljrvmjIflrprlkJHph49cclxuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdWJ0cmFjdCAob3RoZXI6IFZlYzQpIHtcclxuICAgICAgICB0aGlzLnggLT0gb3RoZXIueDtcclxuICAgICAgICB0aGlzLnkgLT0gb3RoZXIueTtcclxuICAgICAgICB0aGlzLnogLT0gb3RoZXIuejtcclxuICAgICAgICB0aGlzLncgLT0gb3RoZXIudztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTdWJ0cmFjdHMgb25lIHZlY3RvciBmcm9tIHRoaXMsIGFuZCByZXR1cm5zIHRoaXMuXHJcbiAgICAgKiBAemgg5ZCR6YeP5YeP5rOV44CC5bCG5b2T5YmN5ZCR6YeP5YeP5Y675oyH5a6a5YiG6YeP55qE5ZCR6YePXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0geiBUaGUgeiB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0gdyBUaGUgdyB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdWJ0cmFjdDRmICh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCB3OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggLT0geDtcclxuICAgICAgICB0aGlzLnkgLT0geTtcclxuICAgICAgICB0aGlzLnogLT0gejtcclxuICAgICAgICB0aGlzLncgLT0gdztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBNdWx0aXBsaWVzIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGEgbnVtYmVyLCBhbmQgcmV0dXJucyB0aGlzLlxyXG4gICAgICogQHpoIOWQkemHj+aVsOS5mOOAguWwhuW9k+WJjeWQkemHj+aVsOS5mOaMh+Wumuagh+mHj1xyXG4gICAgICogQHBhcmFtIHNjYWxhciBzY2FsYXIgbnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtdWx0aXBseVNjYWxhciAoc2NhbGFyOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHNjYWxhciA9PT0gJ29iamVjdCcpIHsgY29uc29sZS53YXJuKCdzaG91bGQgdXNlIFZlYzQubXVsdGlwbHkgZm9yIHZlY3RvciAqIHZlY3RvciBvcGVyYXRpb24nKTsgfVxyXG4gICAgICAgIHRoaXMueCAqPSBzY2FsYXI7XHJcbiAgICAgICAgdGhpcy55ICo9IHNjYWxhcjtcclxuICAgICAgICB0aGlzLnogKj0gc2NhbGFyO1xyXG4gICAgICAgIHRoaXMudyAqPSBzY2FsYXI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gTXVsdGlwbGllcyB0aGUgY3VycmVudCB2ZWN0b3Igd2l0aCBhbm90aGVyIG9uZSBhbmQgcmV0dXJuIHRoaXNcclxuICAgICAqIEB6aCDlkJHph4/kuZjms5XjgILlsIblvZPliY3lkJHph4/kuZjku6XmjIflrprlkJHph49cclxuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtdWx0aXBseSAob3RoZXI6IFZlYzQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG90aGVyICE9PSAnb2JqZWN0JykgeyBjb25zb2xlLndhcm4oJ3Nob3VsZCB1c2UgVmVjNC5zY2FsZSBmb3IgdmVjdG9yICogc2NhbGFyIG9wZXJhdGlvbicpOyB9XHJcbiAgICAgICAgdGhpcy54ICo9IG90aGVyLng7XHJcbiAgICAgICAgdGhpcy55ICo9IG90aGVyLnk7XHJcbiAgICAgICAgdGhpcy56ICo9IG90aGVyLno7XHJcbiAgICAgICAgdGhpcy53ICo9IG90aGVyLnc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gTXVsdGlwbGllcyB0aGUgY3VycmVudCB2ZWN0b3Igd2l0aCBhbm90aGVyIG9uZSBhbmQgcmV0dXJuIHRoaXNcclxuICAgICAqIEB6aCDlkJHph4/kuZjms5XjgILlsIblvZPliY3lkJHph4/kuI7mjIflrprliIbph4/nmoTlkJHph4/nm7jkuZjnmoTnu5PmnpzotYvlgLznu5nlvZPliY3lkJHph4/jgIJcclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSB6IFRoZSB6IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSB3IFRoZSB3IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIG11bHRpcGx5NGYgKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCAqPSB4O1xyXG4gICAgICAgIHRoaXMueSAqPSB5O1xyXG4gICAgICAgIHRoaXMueiAqPSB6O1xyXG4gICAgICAgIHRoaXMudyAqPSB3O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEVsZW1lbnQtd2lzZWx5IGRpdmlkZXMgdGhpcyB2ZWN0b3Igd2l0aCBhbm90aGVyIG9uZSwgYW5kIHJldHVybiB0aGlzLlxyXG4gICAgICogQHpoIOWQkemHj+mAkOWFg+e0oOebuOmZpOOAguWwhuW9k+WJjeWQkemHj+S4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOmZpOeahOe7k+aenOi1i+WAvOe7meW9k+WJjeWQkemHj+OAglxyXG4gICAgICogQHBhcmFtIG90aGVyIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpdmlkZSAob3RoZXI6IFZlYzQpIHtcclxuICAgICAgICB0aGlzLnggLz0gb3RoZXIueDtcclxuICAgICAgICB0aGlzLnkgLz0gb3RoZXIueTtcclxuICAgICAgICB0aGlzLnogLz0gb3RoZXIuejtcclxuICAgICAgICB0aGlzLncgLz0gb3RoZXIudztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBFbGVtZW50LXdpc2VseSBkaXZpZGVzIHRoaXMgdmVjdG9yIHdpdGggYW5vdGhlciBvbmUsIGFuZCByZXR1cm4gdGhpcy5cclxuICAgICAqIEB6aCDlkJHph4/pgJDlhYPntKDnm7jpmaTjgILlsIblvZPliY3lkJHph4/kuI7mjIflrprliIbph4/nmoTlkJHph4/nm7jpmaTnmoTnu5PmnpzotYvlgLznu5nlvZPliY3lkJHph4/jgIJcclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSB6IFRoZSB6IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSB3IFRoZSB3IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpdmlkZTRmICh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCB3OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggLz0geDtcclxuICAgICAgICB0aGlzLnkgLz0geTtcclxuICAgICAgICB0aGlzLnogLz0gejtcclxuICAgICAgICB0aGlzLncgLz0gdztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIGVhY2ggY29tcG9uZW50IG9mIHRoaXMgdmVjdG9yIHdpdGggaXRzIG5lZ2F0aXZlIHZhbHVlXHJcbiAgICAgKiBAemgg5bCG5b2T5YmN5ZCR6YeP55qE5ZCE5Liq5YiG6YeP5Y+W5Y+NXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZWdhdGl2ZSAoKSB7XHJcbiAgICAgICAgdGhpcy54ID0gLXRoaXMueDtcclxuICAgICAgICB0aGlzLnkgPSAtdGhpcy55O1xyXG4gICAgICAgIHRoaXMueiA9IC10aGlzLno7XHJcbiAgICAgICAgdGhpcy53ID0gLXRoaXMudztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCB3aXRoIGFub3RoZXIgdmVjdG9yXHJcbiAgICAgKiBAemgg5ZCR6YeP54K55LmY44CCXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHJldHVybnMg5b2T5YmN5ZCR6YeP5LiO5oyH5a6a5ZCR6YeP54K55LmY55qE57uT5p6c44CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb3QgKHZlY3RvcjogVmVjNCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2ZWN0b3IueCArIHRoaXMueSAqIHZlY3Rvci55ICsgdGhpcy56ICogdmVjdG9yLnogKyB0aGlzLncgKiB2ZWN0b3IudztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBjcm9zcyBwcm9kdWN0IHdpdGggYW5vdGhlciB2ZWN0b3IuXHJcbiAgICAgKiBAemgg5ZCR6YeP5Y+J5LmY44CC6KeG5b2T5YmN5ZCR6YeP5ZKM5oyH5a6a5ZCR6YeP5Li65LiJ57u05ZCR6YeP77yI6IiN5byDIHcg5YiG6YeP77yJ77yM5bCG5b2T5YmN5ZCR6YeP5bem5Y+J5LmY5oyH5a6a5ZCR6YePXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3Jvc3MgKHZlY3RvcjogVmVjNCkge1xyXG4gICAgICAgIGNvbnN0IHsgeDogYXgsIHk6IGF5LCB6OiBheiB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB7IHg6IGJ4LCB5OiBieSwgejogYnogfSA9IHZlY3RvcjtcclxuXHJcbiAgICAgICAgdGhpcy54ID0gYXkgKiBieiAtIGF6ICogYnk7XHJcbiAgICAgICAgdGhpcy55ID0gYXogKiBieCAtIGF4ICogYno7XHJcbiAgICAgICAgdGhpcy56ID0gYXggKiBieSAtIGF5ICogYng7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gUmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAgICogQHpoIOiuoeeul+WQkemHj+eahOmVv+W6pu+8iOaooe+8ieOAglxyXG4gICAgICogQHJldHVybnMgTGVuZ3RoIG9mIHZlY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbGVuZ3RoICgpIHtcclxuICAgICAgICBjb25zdCB4ID0gdGhpcy54O1xyXG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XHJcbiAgICAgICAgY29uc3QgeiA9IHRoaXMuejtcclxuICAgICAgICBjb25zdCB3ID0gdGhpcy53O1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFJldHVybnMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAgICogQHpoIOiuoeeul+WQkemHj+mVv+W6pu+8iOaooe+8ieeahOW5s+aWueOAglxyXG4gICAgICogQHJldHVybnMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsZW5ndGhTcXIgKCkge1xyXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICAgICAgY29uc3QgeSA9IHRoaXMueTtcclxuICAgICAgICBjb25zdCB6ID0gdGhpcy56O1xyXG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLnc7XHJcbiAgICAgICAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIE5vcm1hbGl6ZSB0aGUgY3VycmVudCB2ZWN0b3IuXHJcbiAgICAgKiBAemgg5bCG5b2T5YmN5ZCR6YeP5b2S5LiA5YyWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBub3JtYWxpemUgKCkge1xyXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICAgICAgY29uc3QgeSA9IHRoaXMueTtcclxuICAgICAgICBjb25zdCB6ID0gdGhpcy56O1xyXG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLnc7XHJcbiAgICAgICAgbGV0IGxlbiA9IHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3O1xyXG4gICAgICAgIGlmIChsZW4gPiAwKSB7XHJcbiAgICAgICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcclxuICAgICAgICAgICAgdGhpcy54ID0geCAqIGxlbjtcclxuICAgICAgICAgICAgdGhpcy55ID0geSAqIGxlbjtcclxuICAgICAgICAgICAgdGhpcy56ID0geiAqIGxlbjtcclxuICAgICAgICAgICAgdGhpcy53ID0gdyAqIGxlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVHJhbnNmb3JtcyB0aGUgdmVjNCB3aXRoIGEgbWF0NFxyXG4gICAgICogQHpoIOW6lOeUqOWbm+e7tOefqemYteWPmOaNouWIsOW9k+WJjeefqemYtVxyXG4gICAgICogQHBhcmFtIG1hdHJpeCBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRyYW5zZm9ybU1hdDQgKG1hdHJpeDogTWF0NCkge1xyXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICAgICAgY29uc3QgeSA9IHRoaXMueTtcclxuICAgICAgICBjb25zdCB6ID0gdGhpcy56O1xyXG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLnc7XHJcbiAgICAgICAgdGhpcy54ID0gbWF0cml4Lm0wMCAqIHggKyBtYXRyaXgubTA0ICogeSArIG1hdHJpeC5tMDggKiB6ICsgbWF0cml4Lm0xMiAqIHc7XHJcbiAgICAgICAgdGhpcy55ID0gbWF0cml4Lm0wMSAqIHggKyBtYXRyaXgubTA1ICogeSArIG1hdHJpeC5tMDkgKiB6ICsgbWF0cml4Lm0xMyAqIHc7XHJcbiAgICAgICAgdGhpcy56ID0gbWF0cml4Lm0wMiAqIHggKyBtYXRyaXgubTA2ICogeSArIG1hdHJpeC5tMTAgKiB6ICsgbWF0cml4Lm0xNCAqIHc7XHJcbiAgICAgICAgdGhpcy53ID0gbWF0cml4Lm0wMyAqIHggKyBtYXRyaXgubTA3ICogeSArIG1hdHJpeC5tMTEgKiB6ICsgbWF0cml4Lm0xNSAqIHc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuIl19