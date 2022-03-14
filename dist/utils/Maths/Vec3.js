"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vec3 = void 0;
const utils_1 = require("./utils");
/**
 * @en Representation of 3D vectors and points.
 * @zh 三维向量。
 */
class Vec3 {
    constructor(x, y, z) {
        //super();
        if (x && typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        }
        else {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        }
    }
    /**
     * @en return a Vec3 object with x = 0, y = 0, z = 0.
     * @zh 将目标赋值为零向量
     */
    static zero(out) {
        out.x = 0;
        out.y = 0;
        out.z = 0;
        return out;
    }
    /**
     * @en Obtains a clone of the given vector object
     * @zh 获得指定向量的拷贝
     */
    static clone(a) {
        return new Vec3(a.x, a.y, a.z);
    }
    /**
     * @en Copy the target vector and save the results to out vector object
     * @zh 复制目标向量
     */
    static copy(out, a) {
        out.x = a.x;
        out.y = a.y;
        out.z = a.z;
        return out;
    }
    /**
     * @en Sets the out vector with the given x, y and z values
     * @zh 设置向量值
     */
    static set(out, x, y, z) {
        out.x = x;
        out.y = y;
        out.z = z;
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
        return out;
    }
    /**
     * @en Element-wise vector multiplication and save the results to out vector object
     * @zh 逐元素向量乘法 (分量积)
     */
    static multiply(out, a, b) {
        out.x = a.x * b.x;
        out.y = a.y * b.y;
        out.z = a.z * b.z;
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
        return out;
    }
    /**
     * @en Calculates element-wise minimum values and save to the out vector
     * @zh 逐元素向量最小值
     */
    static min(out, a, b) {
        out.x = Math.min(a.x, b.x);
        out.y = Math.min(a.y, b.y);
        out.z = Math.min(a.z, b.z);
        return out;
    }
    /**
     * @en Calculates element-wise maximum values and save to the out vector
     * @zh 逐元素向量最大值
     */
    static max(out, a, b) {
        out.x = Math.max(a.x, b.x);
        out.y = Math.max(a.y, b.y);
        out.z = Math.max(a.z, b.z);
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
        return out;
    }
    /**
     * @en Element-wise multiplication and addition with the equation: a + b * scale
     * @zh 逐元素向量乘加: A + B * scale
     */
    static scaleAndAdd(out, a, b, scale) {
        out.x = a.x + b.x * scale;
        out.y = a.y + b.y * scale;
        out.z = a.z + b.z * scale;
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
        return Math.sqrt(x * x + y * y + z * z);
    }
    /**
     * @en Calculates the squared euclidean distance of two vectors
     * @zh 求两向量的欧氏距离平方
     */
    static squaredDistance(a, b) {
        const x = b.x - a.x;
        const y = b.y - a.y;
        const z = b.z - a.z;
        return x * x + y * y + z * z;
    }
    /**
     * @en Calculates the length of the vector
     * @zh 求向量长度
     */
    static len(a) {
        const x = a.x;
        const y = a.y;
        const z = a.z;
        return Math.sqrt(x * x + y * y + z * z);
    }
    /**
     * @en Calculates the squared length of the vector
     * @zh 求向量长度平方
     */
    static lengthSqr(a) {
        const x = a.x;
        const y = a.y;
        const z = a.z;
        return x * x + y * y + z * z;
    }
    /**
     * @en Sets each element to its negative value
     * @zh 逐元素向量取负
     */
    static negate(out, a) {
        out.x = -a.x;
        out.y = -a.y;
        out.z = -a.z;
        return out;
    }
    /**
     * @en Sets each element to its inverse value, zero value will become Infinity
     * @zh 逐元素向量取倒数，接近 0 时返回 Infinity
     */
    static invert(out, a) {
        out.x = 1.0 / a.x;
        out.y = 1.0 / a.y;
        out.z = 1.0 / a.z;
        return out;
    }
    /**
     * @en Sets each element to its inverse value, zero value will remain zero
     * @zh 逐元素向量取倒数，接近 0 时返回 0
     */
    static invertSafe(out, a) {
        const x = a.x;
        const y = a.y;
        const z = a.z;
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
        let len = x * x + y * y + z * z;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            out.x = x * len;
            out.y = y * len;
            out.z = z * len;
        }
        return out;
    }
    /**
     * @en Calculates the dot product of the vector
     * @zh 向量点积（数量积）
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    /**
     * @en Calculates the cross product of the vector
     * @zh 向量叉积（向量积）
     */
    static cross(out, a, b) {
        const { x: ax, y: ay, z: az } = a;
        const { x: bx, y: by, z: bz } = b;
        out.x = ay * bz - az * by;
        out.y = az * bx - ax * bz;
        out.z = ax * by - ay * bx;
        return out;
    }
    /**
     * @en Calculates the linear interpolation between two vectors with a given ratio
     * @zh 逐元素向量线性插值： A + t * (B - A)
     */
    static lerp(out, a, b, t) {
        out.x = a.x + t * (b.x - a.x);
        out.y = a.y + t * (b.y - a.y);
        out.z = a.z + t * (b.z - a.z);
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
        return out;
    }
    /**
     * @en Vector and fourth order matrix multiplication, will complete the vector with a fourth value as one
     * @zh 向量与四维矩阵乘法，默认向量第四位为 1。
     */
    static transformMat4(out, a, m) {
        const x = a.x;
        const y = a.y;
        const z = a.z;
        let rhw = m.m03 * x + m.m07 * y + m.m11 * z + m.m15;
        rhw = rhw ? Math.abs(1 / rhw) : 1;
        out.x = (m.m00 * x + m.m04 * y + m.m08 * z + m.m12) * rhw;
        out.y = (m.m01 * x + m.m05 * y + m.m09 * z + m.m13) * rhw;
        out.z = (m.m02 * x + m.m06 * y + m.m10 * z + m.m14) * rhw;
        return out;
    }
    /**
     * @en Vector and fourth order matrix multiplication, will complete the vector with a fourth element as one
     * @zh 向量与四维矩阵乘法，默认向量第四位为 0。
     */
    static transformMat4Normal(out, a, m) {
        const x = a.x;
        const y = a.y;
        const z = a.z;
        let rhw = m.m03 * x + m.m07 * y + m.m11 * z;
        rhw = rhw ? Math.abs(1 / rhw) : 1;
        out.x = (m.m00 * x + m.m04 * y + m.m08 * z) * rhw;
        out.y = (m.m01 * x + m.m05 * y + m.m09 * z) * rhw;
        out.z = (m.m02 * x + m.m06 * y + m.m10 * z) * rhw;
        return out;
    }
    /**
     * @en Vector and third order matrix multiplication
     * @zh 向量与三维矩阵乘法
     */
    static transformMat3(out, a, m) {
        const x = a.x;
        const y = a.y;
        const z = a.z;
        out.x = x * m.m00 + y * m.m03 + z * m.m06;
        out.y = x * m.m01 + y * m.m04 + z * m.m07;
        out.z = x * m.m02 + y * m.m05 + z * m.m08;
        return out;
    }
    /**
     * @en Affine transformation vector
     * @zh 向量仿射变换
     */
    static transformAffine(out, v, m) {
        const x = v.x;
        const y = v.y;
        const z = v.z;
        out.x = m.m00 * x + m.m04 * y + m.m08 * z + m.m12;
        out.y = m.m01 * x + m.m05 * y + m.m09 * z + m.m13;
        out.x = m.m02 * x + m.m06 * y + m.m10 * z + m.m14;
        return out;
    }
    /**
     * @en Vector quaternion multiplication
     * @zh 向量四元数乘法
     */
    static transformQuat(out, a, q) {
        // benchmarks: http://jsperf.com/quaternion-transform-Vec3-implementations
        // calculate quat * vec
        const ix = q.w * a.x + q.y * a.z - q.z * a.y;
        const iy = q.w * a.y + q.z * a.x - q.x * a.z;
        const iz = q.w * a.z + q.x * a.y - q.y * a.x;
        const iw = -q.x * a.x - q.y * a.y - q.z * a.z;
        // calculate result * inverse quat
        out.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;
        out.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;
        out.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;
        return out;
    }
    /**
     * @en Transforms the current vector with given scale, rotation and translation in order
     * @zh 以缩放 -> 旋转 -> 平移顺序变换向量
     */
    static transformRTS(out, a, r, t, s) {
        const x = a.x * s.x;
        const y = a.y * s.y;
        const z = a.z * s.z;
        const ix = r.w * x + r.y * z - r.z * y;
        const iy = r.w * y + r.z * x - r.x * z;
        const iz = r.w * z + r.x * y - r.y * x;
        const iw = -r.x * x - r.y * y - r.z * z;
        out.x = ix * r.w + iw * -r.x + iy * -r.z - iz * -r.y + t.x;
        out.y = iy * r.w + iw * -r.y + iz * -r.x - ix * -r.z + t.y;
        out.z = iz * r.w + iw * -r.z + ix * -r.y - iy * -r.x + t.z;
        return out;
    }
    /**
     * @en Transforms the current vector with given scale, rotation and translation in reverse order
     * @zh 以平移 -> 旋转 -> 缩放顺序逆变换向量
     */
    static transformInverseRTS(out, a, r, t, s) {
        const x = a.x - t.x;
        const y = a.y - t.y;
        const z = a.z - t.z;
        const ix = r.w * x - r.y * z + r.z * y;
        const iy = r.w * y - r.z * x + r.x * z;
        const iz = r.w * z - r.x * y + r.y * x;
        const iw = r.x * x + r.y * y + r.z * z;
        out.x = (ix * r.w + iw * r.x + iy * r.z - iz * r.y) / s.x;
        out.y = (iy * r.w + iw * r.y + iz * r.x - ix * r.z) / s.y;
        out.z = (iz * r.w + iw * r.z + ix * r.y - iy * r.x) / s.z;
        return out;
    }
    /**
     * @en Rotates the vector with specified angle around X axis
     * @zh 绕 X 轴旋转向量指定弧度
     * @param v rotation vector
     * @param o center of rotation
     * @param a radius of rotation
     */
    static rotateX(out, v, o, a) {
        // Translate point to the origin
        const x = v.x - o.x;
        const y = v.y - o.y;
        const z = v.z - o.z;
        // perform rotation
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        const rx = x;
        const ry = y * cos - z * sin;
        const rz = y * sin + z * cos;
        // translate to correct position
        out.x = rx + o.x;
        out.y = ry + o.y;
        out.z = rz + o.z;
        return out;
    }
    /**
     * @en Rotates the vector with specified angle around Y axis
     * @zh 绕 Y 轴旋转向量指定弧度
     * @param v rotation vector
     * @param o center of rotation
     * @param a radius of rotation
     */
    static rotateY(out, v, o, a) {
        // Translate point to the origin
        const x = v.x - o.x;
        const y = v.y - o.y;
        const z = v.z - o.z;
        // perform rotation
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        const rx = z * sin + x * cos;
        const ry = y;
        const rz = z * cos - x * sin;
        // translate to correct position
        out.x = rx + o.x;
        out.y = ry + o.y;
        out.z = rz + o.z;
        return out;
    }
    /**
     * @en Rotates the vector with specified angle around Z axis
     * @zh 绕 Z 轴旋转向量指定弧度
     * @param v rotation vector
     * @param o center of rotation
     * @param a radius of rotation
     */
    static rotateZ(out, v, o, a) {
        // Translate point to the origin
        const x = v.x - o.x;
        const y = v.y - o.y;
        const z = v.z - o.z;
        // perform rotation
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        const rx = x * cos - y * sin;
        const ry = x * sin + y * cos;
        const rz = z;
        // translate to correct position
        out.x = rx + o.x;
        out.y = ry + o.y;
        out.z = rz + o.z;
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
        return out;
    }
    /**
     * @en Check the equality of the two given vectors
     * @zh 向量等价判断
     */
    static strictEquals(a, b) {
        return a.x === b.x && a.y === b.y && a.z === b.z;
    }
    /**
     * @en Check whether the two given vectors are approximately equivalent
     * @zh 排除浮点数误差的向量近似等价判断
     */
    static equals(a, b, epsilon = utils_1.EPSILON) {
        const { x: a0, y: a1, z: a2 } = a;
        const { x: b0, y: b1, z: b2 } = b;
        return (Math.abs(a0 - b0)
            <= epsilon * Math.max(1.0, Math.abs(a0), Math.abs(b0))
            && Math.abs(a1 - b1)
                <= epsilon * Math.max(1.0, Math.abs(a1), Math.abs(b1))
            && Math.abs(a2 - b2)
                <= epsilon * Math.max(1.0, Math.abs(a2), Math.abs(b2)));
    }
    /**
     * @en Calculates the radian angle between two vectors
     * @zh 求两向量夹角弧度
     */
    static angle(a, b) {
        Vec3.normalize(v3_1, a);
        Vec3.normalize(v3_2, b);
        const cosine = Vec3.dot(v3_1, v3_2);
        if (cosine > 1.0) {
            return 0;
        }
        if (cosine < -1.0) {
            return Math.PI;
        }
        return Math.acos(cosine);
    }
    /**
     * @en Calculates the projection vector on the specified plane
     * @zh 计算向量在指定平面上的投影
     * @param a projection vector
     * @param n the normal line of specified plane
     */
    static projectOnPlane(out, a, n) {
        return Vec3.subtract(out, a, Vec3.project(out, a, n));
    }
    /**
     * @en Calculates the projection on the specified vector
     * @zh 计算向量在指定向量上的投影
     * @param a projection vector
     * @param n target vector
     */
    static project(out, a, b) {
        const sqrLen = Vec3.lengthSqr(b);
        if (sqrLen < 0.000001) {
            return Vec3.set(out, 0, 0, 0);
        }
        else {
            return Vec3.multiplyScalar(out, b, Vec3.dot(a, b) / sqrLen);
        }
    }
    /**
     * @en clone a Vec3 value
     * @zh 克隆当前向量。
     */
    clone() {
        return new Vec3(this.x, this.y, this.z);
    }
    set(x, y, z) {
        if (x && typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        }
        else {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
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
        return (Math.abs(this.x - other.x)
            <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(other.x))
            && Math.abs(this.y - other.y)
                <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(other.y))
            && Math.abs(this.z - other.z)
                <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(other.z)));
    }
    /**
     * @en Check whether the vector approximately equals another one.
     * @zh 判断当前向量是否在误差范围内与指定分量的向量相等。
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     * @param z The z value of specified vector
     * @param epsilon The error allowed. It`s should be a non-negative number.
     * @returns Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
     */
    equals3f(x, y, z, epsilon = utils_1.EPSILON) {
        return (Math.abs(this.x - x)
            <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(x))
            && Math.abs(this.y - y)
                <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(y))
            && Math.abs(this.z - z)
                <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(z)));
    }
    /**
     * @en Check whether the current vector strictly equals another Vec3.
     * @zh 判断当前向量是否与指定向量相等。
     * @param other specified vector
     * @returns Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
     */
    strictEquals(other) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }
    /**
     * @en Check whether the current vector strictly equals another Vec3.
     * @zh 判断当前向量是否与指定分量的向量相等。
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     * @param z The z value of specified vector
     * @returns Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
     */
    strictEquals3f(x, y, z) {
        return this.x === x && this.y === y && this.z === z;
    }
    /**
     * @en Transform to string with vector information.
     * @zh 返回当前向量的字符串表示。
     * @returns The string with vector information
     */
    toString() {
        return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)})`;
    }
    /**
     * @en Calculate linear interpolation result between this vector and another one with given ratio.
     * @zh 根据指定的插值比率，从当前向量到目标向量之间做插值。
     * @param to Target vector
     * @param ratio The interpolation coefficient.The range is [0,1].
     */
    lerp(to, ratio) {
        this.x += ratio * (to.x - this.x);
        this.y += ratio * (to.y - this.y);
        this.z += ratio * (to.z - this.z);
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
        return this;
    }
    /**
     * @en Adds the current vector with another one and return this
     * @zh 向量加法。将当前向量与指定分量的向量相加
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     * @param z The z value of specified vector
     */
    add3f(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
        return this;
    }
    /**
     * @en Subtracts one vector from this, and returns this.
     * @zh 向量减法。将当前向量减去指定向量的结果。
     * @param other specified vector
     */
    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }
    /**
     * @en Subtracts one vector from this, and returns this.
     * @zh 向量减法。将当前向量减去指定分量的向量
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     * @param z The z value of specified vector
     */
    subtract3f(x, y, z) {
        this.x -= x;
        this.y -= y;
        this.z -= z;
        return this;
    }
    /**
     * @en Multiplies the current vector with a number, and returns this.
     * @zh 向量数乘。将当前向量数乘指定标量
     * @param scalar scalar number
     */
    multiplyScalar(scalar) {
        if (typeof scalar === 'object') {
            console.warn('should use Vec3.multiply for vector * vector operation');
        }
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }
    /**
     * @en Multiplies the current vector with another one and return this
     * @zh 向量乘法。将当前向量乘以与指定向量的结果赋值给当前向量。
     * @param other specified vector
     */
    multiply(other) {
        if (typeof other !== 'object') {
            console.warn('should use Vec3.scale for vector * scalar operation');
        }
        this.x *= other.x;
        this.y *= other.y;
        this.z *= other.z;
        return this;
    }
    /**
     * @en Multiplies the current vector with another one and return this
     * @zh 向量乘法。将当前向量与指定分量的向量相乘的结果赋值给当前向量。
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     * @param z The z value of specified vector
     */
    multiply3f(x, y, z) {
        this.x *= x;
        this.y *= y;
        this.z *= z;
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
        return this;
    }
    /**
     * @en Element-wisely divides this vector with another one, and return this.
     * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     * @param z The z value of specified vector
     */
    divide3f(x, y, z) {
        this.x /= x;
        this.y /= y;
        this.z /= z;
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
        return this;
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
        return this;
    }
    /**
     * @en Calculates the dot product with another vector
     * @zh 向量点乘。
     * @param other specified vector
     * @returns The result of calculates the dot product with another vector
     */
    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
    /**
     * @en Calculates the cross product with another vector.
     * @zh 向量叉乘。将当前向量左叉乘指定向量
     * @param other specified vector
     */
    cross(other) {
        const { x: ax, y: ay, z: az } = this;
        const { x: bx, y: by, z: bz } = other;
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
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    /**
     * @en Returns the squared length of this vector.
     * @zh 计算向量长度（模）的平方。
     * @returns the squared length of this vector
     */
    lengthSqr() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    /**
     * @en Normalize the current vector.
     * @zh 将当前向量归一化
     */
    normalize() {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        let len = x * x + y * y + z * z;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            this.x = x * len;
            this.y = y * len;
            this.z = z * len;
        }
        return this;
    }
    /**
     * @en Transforms the vec3 with a mat4. 4th vector component is implicitly '1'
     * @zh 将当前向量视为 w 分量为 1 的四维向量，应用四维矩阵变换到当前矩阵
     * @param matrix matrix to transform with
     */
    transformMat4(matrix) {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        let rhw = matrix.m03 * x + matrix.m07 * y + matrix.m11 * z + matrix.m15;
        rhw = rhw ? 1 / rhw : 1;
        this.x = (matrix.m00 * x + matrix.m04 * y + matrix.m08 * z + matrix.m12) * rhw;
        this.y = (matrix.m01 * x + matrix.m05 * y + matrix.m09 * z + matrix.m13) * rhw;
        this.z = (matrix.m02 * x + matrix.m06 * y + matrix.m10 * z + matrix.m14) * rhw;
        return this;
    }
}
exports.Vec3 = Vec3;
Vec3.UNIT_X = Object.freeze(new Vec3(1, 0, 0));
Vec3.UNIT_Y = Object.freeze(new Vec3(0, 1, 0));
Vec3.UNIT_Z = Object.freeze(new Vec3(0, 0, 1));
Vec3.RIGHT = Object.freeze(new Vec3(1, 0, 0));
Vec3.UP = Object.freeze(new Vec3(0, 1, 0));
Vec3.FORWARD = Object.freeze(new Vec3(0, 0, -1)); // we use -z for view-dir
Vec3.ZERO = Object.freeze(new Vec3(0, 0, 0));
Vec3.ONE = Object.freeze(new Vec3(1, 1, 1));
Vec3.NEG_ONE = Object.freeze(new Vec3(-1, -1, -1));
const v3_1 = new Vec3();
const v3_2 = new Vec3();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVjMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlscy9NYXRocy9WZWMzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLG1DQUFpRDtBQUVqRDs7O0dBR0c7QUFDRixNQUFhLElBQUk7SUE0b0JkLFlBQWEsQ0FBaUIsRUFBRSxDQUFVLEVBQUUsQ0FBVTtRQUNsRCxVQUFVO1FBQ1YsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQjthQUFNO1lBQ0gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBNW9CRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsSUFBSSxDQUF5QixHQUFRO1FBQy9DLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQTBCLENBQU07UUFDL0MsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7O09BR0c7SUFDSSxN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LENBQUM7UUFDMUIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDMUIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBeUIsR0FBUSxFQUFFLENBQVksRUFBRSxDQUFZLEVBQUUsQ0FBUztRQUN0RixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBeUIsR0FBUSxFQUFFLEtBQWM7UUFDakUsS0FBSyxHQUFHLEtBQUssSUFBSSxHQUFHLENBQUM7UUFFckIsTUFBTSxHQUFHLEdBQUcsY0FBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDckMsTUFBTSxRQUFRLEdBQUcsY0FBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFFcEQsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDekMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDekMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxhQUFhLENBQTBCLEdBQVEsRUFBRSxDQUFZLEVBQUUsQ0FBWTtRQUNyRixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3BELEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDMUQsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDMUQsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDMUQsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLG1CQUFtQixDQUF5QixHQUFRLEVBQUUsQ0FBWSxFQUFFLENBQVk7UUFDMUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEQsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFD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QyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLG1CQUFtQixDQUF5QixHQUFRLEVBQUUsQ0FBWSxFQUFFLENBQVksRUFBRSxDQUFZLEVBQUUsQ0FBWTtRQUN0SCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxHQUFHLENBQUMsQ0FBQyxHQUFHLENB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QUMsQ0FBQyxDQUFDO2VBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO21CQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDbEUsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLFFBQVEsQ0FBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxPQUFPLEdBQUcsZUFBTztRQUMvRCxPQUFPLENBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNqQixPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztlQUN0RCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO21CQUNwQixPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztlQUN0RCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO21CQUNwQixPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUM1RCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7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QyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLFFBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QyxZQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUEwK0JoRSxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXQ0IH0gZnJvbSBcIi4vTWF0NFwiO1xuaW1wb3J0IHsgSU1hdDNMaWtlLCBJTWF0NExpa2UsIElRdWF0TGlrZSwgSVZlYzNMaWtlIH0gZnJvbSBcIi4vdHlwZS1kZWZpbmVcIjtcbmltcG9ydCB7IGNsYW1wLCBFUFNJTE9OLCByYW5kb20gfSBmcm9tIFwiLi91dGlsc1wiO1xuXG4vKipcbiAqIEBlbiBSZXByZXNlbnRhdGlvbiBvZiAzRCB2ZWN0b3JzIGFuZCBwb2ludHMuXG4gKiBAemgg5LiJ57u05ZCR6YeP44CCXG4gKi9cbiBleHBvcnQgY2xhc3MgVmVjMyB7XG4gICAgcHVibGljIHN0YXRpYyBVTklUX1ggPSBPYmplY3QuZnJlZXplKG5ldyBWZWMzKDEsIDAsIDApKTtcbiAgICBwdWJsaWMgc3RhdGljIFVOSVRfWSA9IE9iamVjdC5mcmVlemUobmV3IFZlYzMoMCwgMSwgMCkpO1xuICAgIHB1YmxpYyBzdGF0aWMgVU5JVF9aID0gT2JqZWN0LmZyZWV6ZShuZXcgVmVjMygwLCAwLCAxKSk7XG4gICAgcHVibGljIHN0YXRpYyBSSUdIVCA9IE9iamVjdC5mcmVlemUobmV3IFZlYzMoMSwgMCwgMCkpO1xuICAgIHB1YmxpYyBzdGF0aWMgVVAgPSBPYmplY3QuZnJlZXplKG5ldyBWZWMzKDAsIDEsIDApKTtcbiAgICBwdWJsaWMgc3RhdGljIEZPUldBUkQgPSBPYmplY3QuZnJlZXplKG5ldyBWZWMzKDAsIDAsIC0xKSk7IC8vIHdlIHVzZSAteiBmb3Igdmlldy1kaXJcbiAgICBwdWJsaWMgc3RhdGljIFpFUk8gPSBPYmplY3QuZnJlZXplKG5ldyBWZWMzKDAsIDAsIDApKTtcbiAgICBwdWJsaWMgc3RhdGljIE9ORSA9IE9iamVjdC5mcmVlemUobmV3IFZlYzMoMSwgMSwgMSkpO1xuICAgIHB1YmxpYyBzdGF0aWMgTkVHX09ORSA9IE9iamVjdC5mcmVlemUobmV3IFZlYzMoLTEsIC0xLCAtMSkpO1xuXG4gICAgLyoqXG4gICAgICogQGVuIHJldHVybiBhIFZlYzMgb2JqZWN0IHdpdGggeCA9IDAsIHkgPSAwLCB6ID0gMC5cbiAgICAgKiBAemgg5bCG55uu5qCH6LWL5YC85Li66Zu25ZCR6YePXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB6ZXJvPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0KSB7XG4gICAgICAgIG91dC54ID0gMDtcbiAgICAgICAgb3V0LnkgPSAwO1xuICAgICAgICBvdXQueiA9IDA7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIE9idGFpbnMgYSBjbG9uZSBvZiB0aGUgZ2l2ZW4gdmVjdG9yIG9iamVjdFxuICAgICAqIEB6aCDojrflvpfmjIflrprlkJHph4/nmoTmi7fotJ1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNsb25lIDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChhOiBPdXQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMzKGEueCwgYS55LCBhLnopO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDb3B5IHRoZSB0YXJnZXQgdmVjdG9yIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XG4gICAgICogQHpoIOWkjeWItuebruagh+WQkemHj1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29weTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlYzNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IFZlYzNMaWtlKSB7XG4gICAgICAgIG91dC54ID0gYS54O1xuICAgICAgICBvdXQueSA9IGEueTtcbiAgICAgICAgb3V0LnogPSBhLno7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgdGhlIG91dCB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4geCwgeSBhbmQgeiB2YWx1ZXNcbiAgICAgKiBAemgg6K6+572u5ZCR6YeP5YC8XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzZXQ8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcbiAgICAgICAgb3V0LnggPSB4O1xuICAgICAgICBvdXQueSA9IHk7XG4gICAgICAgIG91dC56ID0gejtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlIHZlY3RvciBhZGRpdGlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgdmVjdG9yIG9iamVjdFxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/liqDms5VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlLCBiOiBJVmVjM0xpa2UpIHtcbiAgICAgICAgb3V0LnggPSBhLnggKyBiLng7XG4gICAgICAgIG91dC55ID0gYS55ICsgYi55O1xuICAgICAgICBvdXQueiA9IGEueiArIGIuejtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlIHZlY3RvciBzdWJ0cmFjdGlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgdmVjdG9yIG9iamVjdFxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lh4/ms5VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHN1YnRyYWN0PE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIGI6IElWZWMzTGlrZSkge1xuICAgICAgICBvdXQueCA9IGEueCAtIGIueDtcbiAgICAgICAgb3V0LnkgPSBhLnkgLSBiLnk7XG4gICAgICAgIG91dC56ID0gYS56IC0gYi56O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBFbGVtZW50LXdpc2UgdmVjdG9yIG11bHRpcGxpY2F0aW9uIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+S5mOazlSAo5YiG6YeP56evKVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbXVsdGlwbHk8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IElWZWMzTGlrZSwgYjogSVZlYzNMaWtlKSB7XG4gICAgICAgIG91dC54ID0gYS54ICogYi54O1xuICAgICAgICBvdXQueSA9IGEueSAqIGIueTtcbiAgICAgICAgb3V0LnogPSBhLnogKiBiLno7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEVsZW1lbnQtd2lzZSB2ZWN0b3IgZGl2aXNpb24gYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IHZlY3RvciBvYmplY3RcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP6Zmk5rOVXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBkaXZpZGU8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IElWZWMzTGlrZSwgYjogSVZlYzNMaWtlKSB7XG4gICAgICAgIG91dC54ID0gYS54IC8gYi54O1xuICAgICAgICBvdXQueSA9IGEueSAvIGIueTtcbiAgICAgICAgb3V0LnogPSBhLnogLyBiLno7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFJvdW5kcyB1cCBieSBlbGVtZW50cyBvZiB0aGUgdmVjdG9yIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+WQkeS4iuWPluaVtFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2VpbDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlKSB7XG4gICAgICAgIG91dC54ID0gTWF0aC5jZWlsKGEueCk7XG4gICAgICAgIG91dC55ID0gTWF0aC5jZWlsKGEueSk7XG4gICAgICAgIG91dC56ID0gTWF0aC5jZWlsKGEueik7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEVsZW1lbnQtd2lzZSByb3VuZHMgZG93biBvZiB0aGUgY3VycmVudCB2ZWN0b3IgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gdGhlIG91dCB2ZWN0b3JcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5ZCR5LiL5Y+W5pW0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmbG9vcjxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlKSB7XG4gICAgICAgIG91dC54ID0gTWF0aC5mbG9vcihhLngpO1xuICAgICAgICBvdXQueSA9IE1hdGguZmxvb3IoYS55KTtcbiAgICAgICAgb3V0LnogPSBNYXRoLmZsb29yKGEueik7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgZWxlbWVudC13aXNlIG1pbmltdW0gdmFsdWVzIGFuZCBzYXZlIHRvIHRoZSBvdXQgdmVjdG9yXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+acgOWwj+WAvFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbWluPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIGI6IElWZWMzTGlrZSkge1xuICAgICAgICBvdXQueCA9IE1hdGgubWluKGEueCwgYi54KTtcbiAgICAgICAgb3V0LnkgPSBNYXRoLm1pbihhLnksIGIueSk7XG4gICAgICAgIG91dC56ID0gTWF0aC5taW4oYS56LCBiLnopO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIGVsZW1lbnQtd2lzZSBtYXhpbXVtIHZhbHVlcyBhbmQgc2F2ZSB0byB0aGUgb3V0IHZlY3RvclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/mnIDlpKflgLxcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG1heDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlLCBiOiBJVmVjM0xpa2UpIHtcbiAgICAgICAgb3V0LnggPSBNYXRoLm1heChhLngsIGIueCk7XG4gICAgICAgIG91dC55ID0gTWF0aC5tYXgoYS55LCBiLnkpO1xuICAgICAgICBvdXQueiA9IE1hdGgubWF4KGEueiwgYi56KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyBlbGVtZW50LXdpc2Ugcm91bmQgcmVzdWx0cyBhbmQgc2F2ZSB0byB0aGUgb3V0IHZlY3RvclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lm5voiI3kupTlhaXlj5bmlbRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJvdW5kPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UpIHtcbiAgICAgICAgb3V0LnggPSBNYXRoLnJvdW5kKGEueCk7XG4gICAgICAgIG91dC55ID0gTWF0aC5yb3VuZChhLnkpO1xuICAgICAgICBvdXQueiA9IE1hdGgucm91bmQoYS56KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVmVjdG9yIHNjYWxhciBtdWx0aXBsaWNhdGlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgdmVjdG9yIG9iamVjdFxuICAgICAqIEB6aCDlkJHph4/moIfph4/kuZjms5VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG11bHRpcGx5U2NhbGFyPE91dCBleHRlbmRzIElWZWMzTGlrZSwgVmVjM0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2UgPiAob3V0OiBPdXQsIGE6IFZlYzNMaWtlLCBiOiBudW1iZXIpIHtcbiAgICAgICAgb3V0LnggPSBhLnggKiBiO1xuICAgICAgICBvdXQueSA9IGEueSAqIGI7XG4gICAgICAgIG91dC56ID0gYS56ICogYjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlIG11bHRpcGxpY2F0aW9uIGFuZCBhZGRpdGlvbiB3aXRoIHRoZSBlcXVhdGlvbjogYSArIGIgKiBzY2FsZVxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/kuZjliqA6IEEgKyBCICogc2NhbGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNjYWxlQW5kQWRkPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIGI6IElWZWMzTGlrZSwgc2NhbGU6IG51bWJlcikge1xuICAgICAgICBvdXQueCA9IGEueCArIGIueCAqIHNjYWxlO1xuICAgICAgICBvdXQueSA9IGEueSArIGIueSAqIHNjYWxlO1xuICAgICAgICBvdXQueiA9IGEueiArIGIueiAqIHNjYWxlO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBldWNsaWRlYW4gZGlzdGFuY2Ugb2YgdHdvIHZlY3RvcnNcbiAgICAgKiBAemgg5rGC5Lik5ZCR6YeP55qE5qyn5rCP6Led56a7XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBkaXN0YW5jZSAoYTogSVZlYzNMaWtlLCBiOiBJVmVjM0xpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IGIueCAtIGEueDtcbiAgICAgICAgY29uc3QgeSA9IGIueSAtIGEueTtcbiAgICAgICAgY29uc3QgeiA9IGIueiAtIGEuejtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGVhbiBkaXN0YW5jZSBvZiB0d28gdmVjdG9yc1xuICAgICAqIEB6aCDmsYLkuKTlkJHph4/nmoTmrKfmsI/ot53nprvlubPmlrlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNxdWFyZWREaXN0YW5jZSAoYTogSVZlYzNMaWtlLCBiOiBJVmVjM0xpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IGIueCAtIGEueDtcbiAgICAgICAgY29uc3QgeSA9IGIueSAtIGEueTtcbiAgICAgICAgY29uc3QgeiA9IGIueiAtIGEuejtcbiAgICAgICAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogejtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3JcbiAgICAgKiBAemgg5rGC5ZCR6YeP6ZW/5bqmXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBsZW4gKGE6IElWZWMzTGlrZSkge1xuICAgICAgICBjb25zdCB4ID0gYS54O1xuICAgICAgICBjb25zdCB5ID0gYS55O1xuICAgICAgICBjb25zdCB6ID0gYS56O1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoZSB2ZWN0b3JcbiAgICAgKiBAemgg5rGC5ZCR6YeP6ZW/5bqm5bmz5pa5XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBsZW5ndGhTcXIgKGE6IElWZWMzTGlrZSkge1xuICAgICAgICBjb25zdCB4ID0gYS54O1xuICAgICAgICBjb25zdCB5ID0gYS55O1xuICAgICAgICBjb25zdCB6ID0gYS56O1xuICAgICAgICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXRzIGVhY2ggZWxlbWVudCB0byBpdHMgbmVnYXRpdmUgdmFsdWVcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W6LSfXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBuZWdhdGU8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IElWZWMzTGlrZSkge1xuICAgICAgICBvdXQueCA9IC1hLng7XG4gICAgICAgIG91dC55ID0gLWEueTtcbiAgICAgICAgb3V0LnogPSAtYS56O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXRzIGVhY2ggZWxlbWVudCB0byBpdHMgaW52ZXJzZSB2YWx1ZSwgemVybyB2YWx1ZSB3aWxsIGJlY29tZSBJbmZpbml0eVxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lj5blgJLmlbDvvIzmjqXov5EgMCDml7bov5Tlm54gSW5maW5pdHlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGludmVydDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlKSB7XG4gICAgICAgIG91dC54ID0gMS4wIC8gYS54O1xuICAgICAgICBvdXQueSA9IDEuMCAvIGEueTtcbiAgICAgICAgb3V0LnogPSAxLjAgLyBhLno7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgZWFjaCBlbGVtZW50IHRvIGl0cyBpbnZlcnNlIHZhbHVlLCB6ZXJvIHZhbHVlIHdpbGwgcmVtYWluIHplcm9cbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W5YCS5pWw77yM5o6l6L+RIDAg5pe26L+U5ZueIDBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGludmVydFNhZmU8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IElWZWMzTGlrZSkge1xuICAgICAgICBjb25zdCB4ID0gYS54O1xuICAgICAgICBjb25zdCB5ID0gYS55O1xuICAgICAgICBjb25zdCB6ID0gYS56O1xuXG4gICAgICAgIGlmIChNYXRoLmFicyh4KSA8IEVQU0lMT04pIHtcbiAgICAgICAgICAgIG91dC54ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dC54ID0gMS4wIC8geDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChNYXRoLmFicyh5KSA8IEVQU0lMT04pIHtcbiAgICAgICAgICAgIG91dC55ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dC55ID0gMS4wIC8geTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChNYXRoLmFicyh6KSA8IEVQU0lMT04pIHtcbiAgICAgICAgICAgIG91dC56ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dC56ID0gMS4wIC8gejtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgdGhlIG5vcm1hbGl6ZWQgdmVjdG9yIHRvIHRoZSBvdXQgdmVjdG9yXG4gICAgICogQHpoIOW9kuS4gOWMluWQkemHj1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbm9ybWFsaXplPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueDtcbiAgICAgICAgY29uc3QgeSA9IGEueTtcbiAgICAgICAgY29uc3QgeiA9IGEuejtcblxuICAgICAgICBsZXQgbGVuID0geCAqIHggKyB5ICogeSArIHogKiB6O1xuICAgICAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgICAgICAgICAgb3V0LnggPSB4ICogbGVuO1xuICAgICAgICAgICAgb3V0LnkgPSB5ICogbGVuO1xuICAgICAgICAgICAgb3V0LnogPSB6ICogbGVuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoZSB2ZWN0b3JcbiAgICAgKiBAemgg5ZCR6YeP54K556ev77yI5pWw6YeP56ev77yJXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBkb3QgPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCwgYjogSVZlYzNMaWtlKSB7XG4gICAgICAgIHJldHVybiBhLnggKiBiLnggKyBhLnkgKiBiLnkgKyBhLnogKiBiLno7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGNyb3NzIHByb2R1Y3Qgb2YgdGhlIHZlY3RvclxuICAgICAqIEB6aCDlkJHph4/lj4nnp6/vvIjlkJHph4/np6/vvIlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyb3NzPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIGI6IElWZWMzTGlrZSkge1xuICAgICAgICBjb25zdCB7IHg6IGF4LCB5OiBheSwgejogYXogfSA9IGE7XG4gICAgICAgIGNvbnN0IHsgeDogYngsIHk6IGJ5LCB6OiBieiB9ID0gYjtcbiAgICAgICAgb3V0LnggPSBheSAqIGJ6IC0gYXogKiBieTtcbiAgICAgICAgb3V0LnkgPSBheiAqIGJ4IC0gYXggKiBiejtcbiAgICAgICAgb3V0LnogPSBheCAqIGJ5IC0gYXkgKiBieDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjdG9ycyB3aXRoIGEgZ2l2ZW4gcmF0aW9cbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP57q/5oCn5o+S5YC877yaIEEgKyB0ICogKEIgLSBBKVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbGVycDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlLCBiOiBJVmVjM0xpa2UsIHQ6IG51bWJlcikge1xuICAgICAgICBvdXQueCA9IGEueCArIHQgKiAoYi54IC0gYS54KTtcbiAgICAgICAgb3V0LnkgPSBhLnkgKyB0ICogKGIueSAtIGEueSk7XG4gICAgICAgIG91dC56ID0gYS56ICsgdCAqIChiLnogLSBhLnopO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBHZW5lcmF0ZXMgYSB1bmlmb3JtbHkgZGlzdHJpYnV0ZWQgcmFuZG9tIHZlY3RvciBwb2ludHMgZnJvbSBjZW50ZXIgdG8gdGhlIHN1cmZhY2Ugb2YgdGhlIHVuaXQgc3BoZXJlXG4gICAgICogQHpoIOeUn+aIkOS4gOS4quWcqOWNleS9jeeQg+S9k+S4iuWdh+WMgOWIhuW4g+eahOmaj+acuuWQkemHj1xuICAgICAqIEBwYXJhbSBzY2FsZSB2ZWN0b3IgbGVuZ3RoXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByYW5kb208T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHNjYWxlPzogbnVtYmVyKSB7XG4gICAgICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuXG4gICAgICAgIGNvbnN0IHBoaSA9IHJhbmRvbSgpICogMi4wICogTWF0aC5QSTtcbiAgICAgICAgY29uc3QgY29zVGhldGEgPSByYW5kb20oKSAqIDIgLSAxO1xuICAgICAgICBjb25zdCBzaW5UaGV0YSA9IE1hdGguc3FydCgxIC0gY29zVGhldGEgKiBjb3NUaGV0YSk7XG5cbiAgICAgICAgb3V0LnggPSBzaW5UaGV0YSAqIE1hdGguY29zKHBoaSkgKiBzY2FsZTtcbiAgICAgICAgb3V0LnkgPSBzaW5UaGV0YSAqIE1hdGguc2luKHBoaSkgKiBzY2FsZTtcbiAgICAgICAgb3V0LnogPSBjb3NUaGV0YSAqIHNjYWxlO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBWZWN0b3IgYW5kIGZvdXJ0aCBvcmRlciBtYXRyaXggbXVsdGlwbGljYXRpb24sIHdpbGwgY29tcGxldGUgdGhlIHZlY3RvciB3aXRoIGEgZm91cnRoIHZhbHVlIGFzIG9uZVxuICAgICAqIEB6aCDlkJHph4/kuI7lm5vnu7Tnn6npmLXkuZjms5XvvIzpu5jorqTlkJHph4/nrKzlm5vkvY3kuLogMeOAglxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdHJhbnNmb3JtTWF0NCA8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IElWZWMzTGlrZSwgbTogSU1hdDRMaWtlKSB7XG4gICAgICAgIGNvbnN0IHggPSBhLng7XG4gICAgICAgIGNvbnN0IHkgPSBhLnk7XG4gICAgICAgIGNvbnN0IHogPSBhLno7XG4gICAgICAgIGxldCByaHcgPSBtLm0wMyAqIHggKyBtLm0wNyAqIHkgKyBtLm0xMSAqIHogKyBtLm0xNTtcbiAgICAgICAgcmh3ID0gcmh3ID8gTWF0aC5hYnMoMSAvIHJodykgOiAxO1xuICAgICAgICBvdXQueCA9IChtLm0wMCAqIHggKyBtLm0wNCAqIHkgKyBtLm0wOCAqIHogKyBtLm0xMikgKiByaHc7XG4gICAgICAgIG91dC55ID0gKG0ubTAxICogeCArIG0ubTA1ICogeSArIG0ubTA5ICogeiArIG0ubTEzKSAqIHJodztcbiAgICAgICAgb3V0LnogPSAobS5tMDIgKiB4ICsgbS5tMDYgKiB5ICsgbS5tMTAgKiB6ICsgbS5tMTQpICogcmh3O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBWZWN0b3IgYW5kIGZvdXJ0aCBvcmRlciBtYXRyaXggbXVsdGlwbGljYXRpb24sIHdpbGwgY29tcGxldGUgdGhlIHZlY3RvciB3aXRoIGEgZm91cnRoIGVsZW1lbnQgYXMgb25lXG4gICAgICogQHpoIOWQkemHj+S4juWbm+e7tOefqemYteS5mOazle+8jOm7mOiupOWQkemHj+esrOWbm+S9jeS4uiAw44CCXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2Zvcm1NYXQ0Tm9ybWFsPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIG06IElNYXQ0TGlrZSkge1xuICAgICAgICBjb25zdCB4ID0gYS54O1xuICAgICAgICBjb25zdCB5ID0gYS55O1xuICAgICAgICBjb25zdCB6ID0gYS56O1xuICAgICAgICBsZXQgcmh3ID0gbS5tMDMgKiB4ICsgbS5tMDcgKiB5ICsgbS5tMTEgKiB6O1xuICAgICAgICByaHcgPSByaHcgPyBNYXRoLmFicygxIC8gcmh3KSA6IDE7XG4gICAgICAgIG91dC54ID0gKG0ubTAwICogeCArIG0ubTA0ICogeSArIG0ubTA4ICogeikgKiByaHc7XG4gICAgICAgIG91dC55ID0gKG0ubTAxICogeCArIG0ubTA1ICogeSArIG0ubTA5ICogeikgKiByaHc7XG4gICAgICAgIG91dC56ID0gKG0ubTAyICogeCArIG0ubTA2ICogeSArIG0ubTEwICogeikgKiByaHc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFZlY3RvciBhbmQgdGhpcmQgb3JkZXIgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgICogQHpoIOWQkemHj+S4juS4iee7tOefqemYteS5mOazlVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdHJhbnNmb3JtTWF0MzxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlLCBtOiBJTWF0M0xpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueDtcbiAgICAgICAgY29uc3QgeSA9IGEueTtcbiAgICAgICAgY29uc3QgeiA9IGEuejtcbiAgICAgICAgb3V0LnggPSB4ICogbS5tMDAgKyB5ICogbS5tMDMgKyB6ICogbS5tMDY7XG4gICAgICAgIG91dC55ID0geCAqIG0ubTAxICsgeSAqIG0ubTA0ICsgeiAqIG0ubTA3O1xuICAgICAgICBvdXQueiA9IHggKiBtLm0wMiArIHkgKiBtLm0wNSArIHogKiBtLm0wODtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQWZmaW5lIHRyYW5zZm9ybWF0aW9uIHZlY3RvclxuICAgICAqIEB6aCDlkJHph4/ku7/lsITlj5jmjaJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRyYW5zZm9ybUFmZmluZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgdjogSVZlYzNMaWtlLCBtOiBJTWF0NExpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IHYueDtcbiAgICAgICAgY29uc3QgeSA9IHYueTtcbiAgICAgICAgY29uc3QgeiA9IHYuejtcbiAgICAgICAgb3V0LnggPSBtLm0wMCAqIHggKyBtLm0wNCAqIHkgKyBtLm0wOCAqIHogKyBtLm0xMjtcbiAgICAgICAgb3V0LnkgPSBtLm0wMSAqIHggKyBtLm0wNSAqIHkgKyBtLm0wOSAqIHogKyBtLm0xMztcbiAgICAgICAgb3V0LnggPSBtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHogKyBtLm0xNDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVmVjdG9yIHF1YXRlcm5pb24gbXVsdGlwbGljYXRpb25cbiAgICAgKiBAemgg5ZCR6YeP5Zub5YWD5pWw5LmY5rOVXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2Zvcm1RdWF0PE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIHE6IElRdWF0TGlrZSkge1xuICAgICAgICAvLyBiZW5jaG1hcmtzOiBodHRwOi8vanNwZXJmLmNvbS9xdWF0ZXJuaW9uLXRyYW5zZm9ybS1WZWMzLWltcGxlbWVudGF0aW9uc1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjXG4gICAgICAgIGNvbnN0IGl4ID0gcS53ICogYS54ICsgcS55ICogYS56IC0gcS56ICogYS55O1xuICAgICAgICBjb25zdCBpeSA9IHEudyAqIGEueSArIHEueiAqIGEueCAtIHEueCAqIGEuejtcbiAgICAgICAgY29uc3QgaXogPSBxLncgKiBhLnogKyBxLnggKiBhLnkgLSBxLnkgKiBhLng7XG4gICAgICAgIGNvbnN0IGl3ID0gLXEueCAqIGEueCAtIHEueSAqIGEueSAtIHEueiAqIGEuejtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgcmVzdWx0ICogaW52ZXJzZSBxdWF0XG4gICAgICAgIG91dC54ID0gaXggKiBxLncgKyBpdyAqIC1xLnggKyBpeSAqIC1xLnogLSBpeiAqIC1xLnk7XG4gICAgICAgIG91dC55ID0gaXkgKiBxLncgKyBpdyAqIC1xLnkgKyBpeiAqIC1xLnggLSBpeCAqIC1xLno7XG4gICAgICAgIG91dC56ID0gaXogKiBxLncgKyBpdyAqIC1xLnogKyBpeCAqIC1xLnkgLSBpeSAqIC1xLng7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFRyYW5zZm9ybXMgdGhlIGN1cnJlbnQgdmVjdG9yIHdpdGggZ2l2ZW4gc2NhbGUsIHJvdGF0aW9uIGFuZCB0cmFuc2xhdGlvbiBpbiBvcmRlclxuICAgICAqIEB6aCDku6XnvKnmlL4gLT4g5peL6L2sIC0+IOW5s+enu+mhuuW6j+WPmOaNouWQkemHj1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdHJhbnNmb3JtUlRTPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIHI6IElRdWF0TGlrZSwgdDogSVZlYzNMaWtlLCBzOiBJVmVjM0xpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueCAqIHMueDtcbiAgICAgICAgY29uc3QgeSA9IGEueSAqIHMueTtcbiAgICAgICAgY29uc3QgeiA9IGEueiAqIHMuejtcbiAgICAgICAgY29uc3QgaXggPSByLncgKiB4ICsgci55ICogeiAtIHIueiAqIHk7XG4gICAgICAgIGNvbnN0IGl5ID0gci53ICogeSArIHIueiAqIHggLSByLnggKiB6O1xuICAgICAgICBjb25zdCBpeiA9IHIudyAqIHogKyByLnggKiB5IC0gci55ICogeDtcbiAgICAgICAgY29uc3QgaXcgPSAtci54ICogeCAtIHIueSAqIHkgLSByLnogKiB6O1xuICAgICAgICBvdXQueCA9IGl4ICogci53ICsgaXcgKiAtci54ICsgaXkgKiAtci56IC0gaXogKiAtci55ICsgdC54O1xuICAgICAgICBvdXQueSA9IGl5ICogci53ICsgaXcgKiAtci55ICsgaXogKiAtci54IC0gaXggKiAtci56ICsgdC55O1xuICAgICAgICBvdXQueiA9IGl6ICogci53ICsgaXcgKiAtci56ICsgaXggKiAtci55IC0gaXkgKiAtci54ICsgdC56O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBUcmFuc2Zvcm1zIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGdpdmVuIHNjYWxlLCByb3RhdGlvbiBhbmQgdHJhbnNsYXRpb24gaW4gcmV2ZXJzZSBvcmRlclxuICAgICAqIEB6aCDku6XlubPnp7sgLT4g5peL6L2sIC0+IOe8qeaUvumhuuW6j+mAhuWPmOaNouWQkemHj1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdHJhbnNmb3JtSW52ZXJzZVJUUzxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlLCByOiBJUXVhdExpa2UsIHQ6IElWZWMzTGlrZSwgczogSVZlYzNMaWtlKSB7XG4gICAgICAgIGNvbnN0IHggPSBhLnggLSB0Lng7XG4gICAgICAgIGNvbnN0IHkgPSBhLnkgLSB0Lnk7XG4gICAgICAgIGNvbnN0IHogPSBhLnogLSB0Lno7XG4gICAgICAgIGNvbnN0IGl4ID0gci53ICogeCAtIHIueSAqIHogKyByLnogKiB5O1xuICAgICAgICBjb25zdCBpeSA9IHIudyAqIHkgLSByLnogKiB4ICsgci54ICogejtcbiAgICAgICAgY29uc3QgaXogPSByLncgKiB6IC0gci54ICogeSArIHIueSAqIHg7XG4gICAgICAgIGNvbnN0IGl3ID0gci54ICogeCArIHIueSAqIHkgKyByLnogKiB6O1xuICAgICAgICBvdXQueCA9IChpeCAqIHIudyArIGl3ICogci54ICsgaXkgKiByLnogLSBpeiAqIHIueSkgLyBzLng7XG4gICAgICAgIG91dC55ID0gKGl5ICogci53ICsgaXcgKiByLnkgKyBpeiAqIHIueCAtIGl4ICogci56KSAvIHMueTtcbiAgICAgICAgb3V0LnogPSAoaXogKiByLncgKyBpdyAqIHIueiArIGl4ICogci55IC0gaXkgKiByLngpIC8gcy56O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBSb3RhdGVzIHRoZSB2ZWN0b3Igd2l0aCBzcGVjaWZpZWQgYW5nbGUgYXJvdW5kIFggYXhpc1xuICAgICAqIEB6aCDnu5UgWCDovbTml4vovazlkJHph4/mjIflrprlvKfluqZcbiAgICAgKiBAcGFyYW0gdiByb3RhdGlvbiB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gbyBjZW50ZXIgb2Ygcm90YXRpb25cbiAgICAgKiBAcGFyYW0gYSByYWRpdXMgb2Ygcm90YXRpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJvdGF0ZVg8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHY6IElWZWMzTGlrZSwgbzogSVZlYzNMaWtlLCBhOiBudW1iZXIpIHtcbiAgICAgICAgLy8gVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cbiAgICAgICAgY29uc3QgeCA9IHYueCAtIG8ueDtcbiAgICAgICAgY29uc3QgeSA9IHYueSAtIG8ueTtcbiAgICAgICAgY29uc3QgeiA9IHYueiAtIG8uejtcblxuICAgICAgICAvLyBwZXJmb3JtIHJvdGF0aW9uXG4gICAgICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKGEpO1xuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihhKTtcbiAgICAgICAgY29uc3QgcnggPSB4O1xuICAgICAgICBjb25zdCByeSA9IHkgKiBjb3MgLSB6ICogc2luO1xuICAgICAgICBjb25zdCByeiA9IHkgKiBzaW4gKyB6ICogY29zO1xuXG4gICAgICAgIC8vIHRyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG4gICAgICAgIG91dC54ID0gcnggKyBvLng7XG4gICAgICAgIG91dC55ID0gcnkgKyBvLnk7XG4gICAgICAgIG91dC56ID0gcnogKyBvLno7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gUm90YXRlcyB0aGUgdmVjdG9yIHdpdGggc3BlY2lmaWVkIGFuZ2xlIGFyb3VuZCBZIGF4aXNcbiAgICAgKiBAemgg57uVIFkg6L205peL6L2s5ZCR6YeP5oyH5a6a5byn5bqmXG4gICAgICogQHBhcmFtIHYgcm90YXRpb24gdmVjdG9yXG4gICAgICogQHBhcmFtIG8gY2VudGVyIG9mIHJvdGF0aW9uXG4gICAgICogQHBhcmFtIGEgcmFkaXVzIG9mIHJvdGF0aW9uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByb3RhdGVZPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCB2OiBJVmVjM0xpa2UsIG86IElWZWMzTGlrZSwgYTogbnVtYmVyKSB7XG4gICAgICAgIC8vIFRyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gICAgICAgIGNvbnN0IHggPSB2LnggLSBvLng7XG4gICAgICAgIGNvbnN0IHkgPSB2LnkgLSBvLnk7XG4gICAgICAgIGNvbnN0IHogPSB2LnogLSBvLno7XG5cbiAgICAgICAgLy8gcGVyZm9ybSByb3RhdGlvblxuICAgICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhhKTtcbiAgICAgICAgY29uc3Qgc2luID0gTWF0aC5zaW4oYSk7XG4gICAgICAgIGNvbnN0IHJ4ID0geiAqIHNpbiArIHggKiBjb3M7XG4gICAgICAgIGNvbnN0IHJ5ID0geTtcbiAgICAgICAgY29uc3QgcnogPSB6ICogY29zIC0geCAqIHNpbjtcblxuICAgICAgICAvLyB0cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICAgICAgICBvdXQueCA9IHJ4ICsgby54O1xuICAgICAgICBvdXQueSA9IHJ5ICsgby55O1xuICAgICAgICBvdXQueiA9IHJ6ICsgby56O1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFJvdGF0ZXMgdGhlIHZlY3RvciB3aXRoIHNwZWNpZmllZCBhbmdsZSBhcm91bmQgWiBheGlzXG4gICAgICogQHpoIOe7lSBaIOi9tOaXi+i9rOWQkemHj+aMh+WumuW8p+W6plxuICAgICAqIEBwYXJhbSB2IHJvdGF0aW9uIHZlY3RvclxuICAgICAqIEBwYXJhbSBvIGNlbnRlciBvZiByb3RhdGlvblxuICAgICAqIEBwYXJhbSBhIHJhZGl1cyBvZiByb3RhdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcm90YXRlWjxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgdjogSVZlYzNMaWtlLCBvOiBJVmVjM0xpa2UsIGE6IG51bWJlcikge1xuICAgICAgICAvLyBUcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuICAgICAgICBjb25zdCB4ID0gdi54IC0gby54O1xuICAgICAgICBjb25zdCB5ID0gdi55IC0gby55O1xuICAgICAgICBjb25zdCB6ID0gdi56IC0gby56O1xuXG4gICAgICAgIC8vIHBlcmZvcm0gcm90YXRpb25cbiAgICAgICAgY29uc3QgY29zID0gTWF0aC5jb3MoYSk7XG4gICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKGEpO1xuICAgICAgICBjb25zdCByeCA9IHggKiBjb3MgLSB5ICogc2luO1xuICAgICAgICBjb25zdCByeSA9IHggKiBzaW4gKyB5ICogY29zO1xuICAgICAgICBjb25zdCByeiA9IHo7XG5cbiAgICAgICAgLy8gdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cbiAgICAgICAgb3V0LnggPSByeCArIG8ueDtcbiAgICAgICAgb3V0LnkgPSByeSArIG8ueTtcbiAgICAgICAgb3V0LnogPSByeiArIG8uejtcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDb252ZXJ0cyB0aGUgZ2l2ZW4gdmVjdG9yIHRvIGFuIGFycmF5XG4gICAgICogQHpoIOWQkemHj+i9rOaVsOe7hFxuICAgICAqIEBwYXJhbSBvZnMgQXJyYXkgU3RhcnQgT2Zmc2V0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0b0FycmF5IDxPdXQ+IChvdXQ6IE91dCwgdjogSVZlYzNMaWtlLCBvZnMgPSAwKSB7XG4gICAgICAgIG91dFtvZnMgKyAwXSA9IHYueDtcbiAgICAgICAgb3V0W29mcyArIDFdID0gdi55O1xuICAgICAgICBvdXRbb2ZzICsgMl0gPSB2Lno7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ29udmVydHMgdGhlIGdpdmVuIGFycmF5IHRvIGEgdmVjdG9yXG4gICAgICogQHpoIOaVsOe7hOi9rOWQkemHj1xuICAgICAqIEBwYXJhbSBvZnMgQXJyYXkgU3RhcnQgT2Zmc2V0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhcnIsIG9mcyA9IDApIHtcbiAgICAgICAgb3V0LnggPSBhcnJbb2ZzICsgMF07XG4gICAgICAgIG91dC55ID0gYXJyW29mcyArIDFdO1xuICAgICAgICBvdXQueiA9IGFycltvZnMgKyAyXTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2hlY2sgdGhlIGVxdWFsaXR5IG9mIHRoZSB0d28gZ2l2ZW4gdmVjdG9yc1xuICAgICAqIEB6aCDlkJHph4/nrYnku7fliKTmlq1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHN0cmljdEVxdWFscyAoYTogSVZlYzNMaWtlLCBiOiBJVmVjM0xpa2UpIHtcbiAgICAgICAgcmV0dXJuIGEueCA9PT0gYi54ICYmIGEueSA9PT0gYi55ICYmIGEueiA9PT0gYi56O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHRoZSB0d28gZ2l2ZW4gdmVjdG9ycyBhcmUgYXBwcm94aW1hdGVseSBlcXVpdmFsZW50XG4gICAgICogQHpoIOaOkumZpOa1rueCueaVsOivr+W3rueahOWQkemHj+i/keS8vOetieS7t+WIpOaWrVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZXF1YWxzIChhOiBJVmVjM0xpa2UsIGI6IElWZWMzTGlrZSwgZXBzaWxvbiA9IEVQU0lMT04pIHtcbiAgICAgICAgY29uc3QgeyB4OiBhMCwgeTogYTEsIHo6IGEyIH0gPSBhO1xuICAgICAgICBjb25zdCB7IHg6IGIwLCB5OiBiMSwgejogYjIgfSA9IGI7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBNYXRoLmFicyhhMCAtIGIwKVxuICAgICAgICAgICAgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhMSAtIGIxKVxuICAgICAgICAgICAgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhMiAtIGIyKVxuICAgICAgICAgICAgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHJhZGlhbiBhbmdsZSBiZXR3ZWVuIHR3byB2ZWN0b3JzXG4gICAgICogQHpoIOaxguS4pOWQkemHj+WkueinkuW8p+W6plxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYW5nbGUgKGE6IElWZWMzTGlrZSwgYjogSVZlYzNMaWtlKSB7XG4gICAgICAgIFZlYzMubm9ybWFsaXplKHYzXzEsIGEpO1xuICAgICAgICBWZWMzLm5vcm1hbGl6ZSh2M18yLCBiKTtcbiAgICAgICAgY29uc3QgY29zaW5lID0gVmVjMy5kb3QodjNfMSwgdjNfMik7XG4gICAgICAgIGlmIChjb3NpbmUgPiAxLjApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3NpbmUgPCAtMS4wKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5QSTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWF0aC5hY29zKGNvc2luZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHByb2plY3Rpb24gdmVjdG9yIG9uIHRoZSBzcGVjaWZpZWQgcGxhbmVcbiAgICAgKiBAemgg6K6h566X5ZCR6YeP5Zyo5oyH5a6a5bmz6Z2i5LiK55qE5oqV5b2xXG4gICAgICogQHBhcmFtIGEgcHJvamVjdGlvbiB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gbiB0aGUgbm9ybWFsIGxpbmUgb2Ygc3BlY2lmaWVkIHBsYW5lXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBwcm9qZWN0T25QbGFuZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlLCBuOiBJVmVjM0xpa2UpIHtcbiAgICAgICAgcmV0dXJuIFZlYzMuc3VidHJhY3Qob3V0LCBhLCBWZWMzLnByb2plY3Qob3V0LCBhLCBuKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHByb2plY3Rpb24gb24gdGhlIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAemgg6K6h566X5ZCR6YeP5Zyo5oyH5a6a5ZCR6YeP5LiK55qE5oqV5b2xXG4gICAgICogQHBhcmFtIGEgcHJvamVjdGlvbiB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gbiB0YXJnZXQgdmVjdG9yXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBwcm9qZWN0PE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIGI6IElWZWMzTGlrZSkge1xuICAgICAgICBjb25zdCBzcXJMZW4gPSBWZWMzLmxlbmd0aFNxcihiKTtcbiAgICAgICAgaWYgKHNxckxlbiA8IDAuMDAwMDAxKSB7XG4gICAgICAgICAgICByZXR1cm4gVmVjMy5zZXQob3V0LCAwLCAwLCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBWZWMzLm11bHRpcGx5U2NhbGFyKG91dCwgYiwgVmVjMy5kb3QoYSwgYikgLyBzcXJMZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIHggY29tcG9uZW50LlxuICAgICAqIEB6aCB4IOWIhumHj+OAglxuICAgICAqL1xuICAgIHB1YmxpYyBkZWNsYXJlIHg6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiB5IGNvbXBvbmVudC5cbiAgICAgKiBAemggeSDliIbph4/jgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSB5OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAZW4geiBjb21wb25lbnQuXG4gICAgICogQHpoIHog5YiG6YeP44CCXG4gICAgICovXG4gICAgcHVibGljIGRlY2xhcmUgejogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IgKHY6IFZlYzMpO1xuXG4gICAgY29uc3RydWN0b3IgKHg/OiBudW1iZXIsIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpO1xuXG4gICAgY29uc3RydWN0b3IgKHg/OiBudW1iZXIgfCBWZWMzLCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XG4gICAgICAgIC8vc3VwZXIoKTtcbiAgICAgICAgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4Lng7XG4gICAgICAgICAgICB0aGlzLnkgPSB4Lnk7XG4gICAgICAgICAgICB0aGlzLnogPSB4Lno7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4IHx8IDA7XG4gICAgICAgICAgICB0aGlzLnkgPSB5IHx8IDA7XG4gICAgICAgICAgICB0aGlzLnogPSB6IHx8IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gY2xvbmUgYSBWZWMzIHZhbHVlXG4gICAgICogQHpoIOWFi+mahuW9k+WJjeWQkemHj+OAglxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9uZSAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMyh0aGlzLngsIHRoaXMueSwgdGhpcy56KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0IHRoZSBjdXJyZW50IHZlY3RvciB2YWx1ZSB3aXRoIHRoZSBnaXZlbiB2ZWN0b3IuXG4gICAgICogQHpoIOiuvue9ruW9k+WJjeWQkemHj+S9v+WFtuS4juaMh+WumuWQkemHj+ebuOetieOAglxuICAgICAqIEBwYXJhbSBvdGhlciBTcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgcHVibGljIHNldCAob3RoZXI6IFZlYzMpO1xuXG4gICAgLyoqXG4gICAgICogQGVuIFNldCB0aGUgdmFsdWUgb2YgZWFjaCBjb21wb25lbnQgb2YgdGhlIGN1cnJlbnQgdmVjdG9yLlxuICAgICAqIEB6aCDorr7nva7lvZPliY3lkJHph4/nmoTlhbfkvZPliIbph4/lgLzjgIJcbiAgICAgKiBAcGFyYW0geCB4IHZhbHVlXG4gICAgICogQHBhcmFtIHkgeSB2YWx1ZVxuICAgICAqIEBwYXJhbSB6IHogdmFsdWVcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0ICh4PzogbnVtYmVyLCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKTtcblxuICAgIHB1YmxpYyBzZXQgKHg/OiBudW1iZXIgfCBWZWMzLCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XG4gICAgICAgIGlmICh4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy54ID0geC54O1xuICAgICAgICAgICAgdGhpcy55ID0geC55O1xuICAgICAgICAgICAgdGhpcy56ID0geC56O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy54ID0geCB8fCAwO1xuICAgICAgICAgICAgdGhpcy55ID0geSB8fCAwO1xuICAgICAgICAgICAgdGhpcy56ID0geiB8fCAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHRoZSB2ZWN0b3IgYXBwcm94aW1hdGVseSBlcXVhbHMgYW5vdGhlciBvbmUuXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeWQkemHj+aYr+WQpuWcqOivr+W3ruiMg+WbtOWGheS4juaMh+WumuWQkemHj+ebuOetieOAglxuICAgICAqIEBwYXJhbSBvdGhlciBTcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIGVwc2lsb24gVGhlIGVycm9yIGFsbG93ZWQuIEl0YHMgc2hvdWxkIGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyBSZXR1cm5zIGB0cnVlYCB3aGVuIHRoZSBjb21wb25lbnRzIG9mIGJvdGggdmVjdG9ycyBhcmUgZXF1YWwgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2Ugb2YgZXJyb3I7IG90aGVyd2lzZSBpdCByZXR1cm5zIGBmYWxzZWAuXG4gICAgICovXG4gICAgcHVibGljIGVxdWFscyAob3RoZXI6IFZlYzMsIGVwc2lsb24gPSBFUFNJTE9OKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLnggLSBvdGhlci54KVxuICAgICAgICAgICAgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy54KSwgTWF0aC5hYnMob3RoZXIueCkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnkgLSBvdGhlci55KVxuICAgICAgICAgICAgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy55KSwgTWF0aC5hYnMob3RoZXIueSkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnogLSBvdGhlci56KVxuICAgICAgICAgICAgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy56KSwgTWF0aC5hYnMob3RoZXIueikpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENoZWNrIHdoZXRoZXIgdGhlIHZlY3RvciBhcHByb3hpbWF0ZWx5IGVxdWFscyBhbm90aGVyIG9uZS5cbiAgICAgKiBAemgg5Yik5pat5b2T5YmN5ZCR6YeP5piv5ZCm5Zyo6K+v5beu6IyD5Zu05YaF5LiO5oyH5a6a5YiG6YeP55qE5ZCR6YeP55u4562J44CCXG4gICAgICogQHBhcmFtIHggVGhlIHggdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcGFyYW0geiBUaGUgeiB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIGVwc2lsb24gVGhlIGVycm9yIGFsbG93ZWQuIEl0YHMgc2hvdWxkIGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyBSZXR1cm5zIGB0cnVlYCB3aGVuIHRoZSBjb21wb25lbnRzIG9mIGJvdGggdmVjdG9ycyBhcmUgZXF1YWwgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2Ugb2YgZXJyb3I7IG90aGVyd2lzZSBpdCByZXR1cm5zIGBmYWxzZWAuXG4gICAgICovXG4gICAgcHVibGljIGVxdWFsczNmICh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCBlcHNpbG9uID0gRVBTSUxPTikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy54IC0geClcbiAgICAgICAgICAgIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueCksIE1hdGguYWJzKHgpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy55IC0geSlcbiAgICAgICAgICAgIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueSksIE1hdGguYWJzKHkpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy56IC0geilcbiAgICAgICAgICAgIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueiksIE1hdGguYWJzKHopKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHRoZSBjdXJyZW50IHZlY3RvciBzdHJpY3RseSBlcXVhbHMgYW5vdGhlciBWZWMzLlxuICAgICAqIEB6aCDliKTmlq3lvZPliY3lkJHph4/mmK/lkKbkuI7mjIflrprlkJHph4/nm7jnrYnjgIJcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEByZXR1cm5zIFJldHVybnMgYHRydWVgIHdoZW4gdGhlIGNvbXBvbmVudHMgb2YgYm90aCB2ZWN0b3JzIGFyZSBlcXVhbCB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZSBvZiBlcnJvcjsgb3RoZXJ3aXNlIGl0IHJldHVybnMgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RyaWN0RXF1YWxzIChvdGhlcjogVmVjMykge1xuICAgICAgICByZXR1cm4gdGhpcy54ID09PSBvdGhlci54ICYmIHRoaXMueSA9PT0gb3RoZXIueSAmJiB0aGlzLnogPT09IG90aGVyLno7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENoZWNrIHdoZXRoZXIgdGhlIGN1cnJlbnQgdmVjdG9yIHN0cmljdGx5IGVxdWFscyBhbm90aGVyIFZlYzMuXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeWQkemHj+aYr+WQpuS4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOetieOAglxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcGFyYW0geSBUaGUgeSB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIHogVGhlIHogdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEByZXR1cm5zIFJldHVybnMgYHRydWVgIHdoZW4gdGhlIGNvbXBvbmVudHMgb2YgYm90aCB2ZWN0b3JzIGFyZSBlcXVhbCB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZSBvZiBlcnJvcjsgb3RoZXJ3aXNlIGl0IHJldHVybnMgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RyaWN0RXF1YWxzM2YgKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCA9PT0geCAmJiB0aGlzLnkgPT09IHkgJiYgdGhpcy56ID09PSB6O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBUcmFuc2Zvcm0gdG8gc3RyaW5nIHdpdGggdmVjdG9yIGluZm9ybWF0aW9uLlxuICAgICAqIEB6aCDov5Tlm57lvZPliY3lkJHph4/nmoTlrZfnrKbkuLLooajnpLrjgIJcbiAgICAgKiBAcmV0dXJucyBUaGUgc3RyaW5nIHdpdGggdmVjdG9yIGluZm9ybWF0aW9uXG4gICAgICovXG4gICAgcHVibGljIHRvU3RyaW5nICgpIHtcbiAgICAgICAgcmV0dXJuIGAoJHt0aGlzLngudG9GaXhlZCgyKX0sICR7dGhpcy55LnRvRml4ZWQoMil9LCAke3RoaXMuei50b0ZpeGVkKDIpfSlgO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGUgbGluZWFyIGludGVycG9sYXRpb24gcmVzdWx0IGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXIgb25lIHdpdGggZ2l2ZW4gcmF0aW8uXG4gICAgICogQHpoIOagueaNruaMh+WumueahOaPkuWAvOavlOeOh++8jOS7juW9k+WJjeWQkemHj+WIsOebruagh+WQkemHj+S5i+mXtOWBmuaPkuWAvOOAglxuICAgICAqIEBwYXJhbSB0byBUYXJnZXQgdmVjdG9yXG4gICAgICogQHBhcmFtIHJhdGlvIFRoZSBpbnRlcnBvbGF0aW9uIGNvZWZmaWNpZW50LlRoZSByYW5nZSBpcyBbMCwxXS5cbiAgICAgKi9cbiAgICBwdWJsaWMgbGVycCAodG86IFZlYzMsIHJhdGlvOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54ICs9IHJhdGlvICogKHRvLnggLSB0aGlzLngpO1xuICAgICAgICB0aGlzLnkgKz0gcmF0aW8gKiAodG8ueSAtIHRoaXMueSk7XG4gICAgICAgIHRoaXMueiArPSByYXRpbyAqICh0by56IC0gdGhpcy56KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEFkZHMgdGhlIGN1cnJlbnQgdmVjdG9yIHdpdGggYW5vdGhlciBvbmUgYW5kIHJldHVybiB0aGlzXG4gICAgICogQHpoIOWQkemHj+WKoOazleOAguWwhuW9k+WJjeWQkemHj+S4juaMh+WumuWQkemHj+eahOebuOWKoFxuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICovXG4gICAgcHVibGljIGFkZCAob3RoZXI6IFZlYzMpIHtcbiAgICAgICAgdGhpcy54ICs9IG90aGVyLng7XG4gICAgICAgIHRoaXMueSArPSBvdGhlci55O1xuICAgICAgICB0aGlzLnogKz0gb3RoZXIuejtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEFkZHMgdGhlIGN1cnJlbnQgdmVjdG9yIHdpdGggYW5vdGhlciBvbmUgYW5kIHJldHVybiB0aGlzXG4gICAgICogQHpoIOWQkemHj+WKoOazleOAguWwhuW9k+WJjeWQkemHj+S4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOWKoFxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcGFyYW0geSBUaGUgeSB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIHogVGhlIHogdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqL1xuICAgIHB1YmxpYyBhZGQzZiAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggKz0geDtcbiAgICAgICAgdGhpcy55ICs9IHk7XG4gICAgICAgIHRoaXMueiArPSB6O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU3VidHJhY3RzIG9uZSB2ZWN0b3IgZnJvbSB0aGlzLCBhbmQgcmV0dXJucyB0aGlzLlxuICAgICAqIEB6aCDlkJHph4/lh4/ms5XjgILlsIblvZPliY3lkJHph4/lh4/ljrvmjIflrprlkJHph4/nmoTnu5PmnpzjgIJcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxuICAgICAqL1xuICAgIHB1YmxpYyBzdWJ0cmFjdCAob3RoZXI6IFZlYzMpIHtcbiAgICAgICAgdGhpcy54IC09IG90aGVyLng7XG4gICAgICAgIHRoaXMueSAtPSBvdGhlci55O1xuICAgICAgICB0aGlzLnogLT0gb3RoZXIuejtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFN1YnRyYWN0cyBvbmUgdmVjdG9yIGZyb20gdGhpcywgYW5kIHJldHVybnMgdGhpcy5cbiAgICAgKiBAemgg5ZCR6YeP5YeP5rOV44CC5bCG5b2T5YmN5ZCR6YeP5YeP5Y675oyH5a6a5YiG6YeP55qE5ZCR6YePXG4gICAgICogQHBhcmFtIHggVGhlIHggdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcGFyYW0geiBUaGUgeiB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICovXG4gICAgcHVibGljIHN1YnRyYWN0M2YgKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54IC09IHg7XG4gICAgICAgIHRoaXMueSAtPSB5O1xuICAgICAgICB0aGlzLnogLT0gejtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIE11bHRpcGxpZXMgdGhlIGN1cnJlbnQgdmVjdG9yIHdpdGggYSBudW1iZXIsIGFuZCByZXR1cm5zIHRoaXMuXG4gICAgICogQHpoIOWQkemHj+aVsOS5mOOAguWwhuW9k+WJjeWQkemHj+aVsOS5mOaMh+Wumuagh+mHj1xuICAgICAqIEBwYXJhbSBzY2FsYXIgc2NhbGFyIG51bWJlclxuICAgICAqL1xuICAgIHB1YmxpYyBtdWx0aXBseVNjYWxhciAoc2NhbGFyOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzY2FsYXIgPT09ICdvYmplY3QnKSB7IGNvbnNvbGUud2Fybignc2hvdWxkIHVzZSBWZWMzLm11bHRpcGx5IGZvciB2ZWN0b3IgKiB2ZWN0b3Igb3BlcmF0aW9uJyk7IH1cbiAgICAgICAgdGhpcy54ICo9IHNjYWxhcjtcbiAgICAgICAgdGhpcy55ICo9IHNjYWxhcjtcbiAgICAgICAgdGhpcy56ICo9IHNjYWxhcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIE11bHRpcGxpZXMgdGhlIGN1cnJlbnQgdmVjdG9yIHdpdGggYW5vdGhlciBvbmUgYW5kIHJldHVybiB0aGlzXG4gICAgICogQHpoIOWQkemHj+S5mOazleOAguWwhuW9k+WJjeWQkemHj+S5mOS7peS4juaMh+WumuWQkemHj+eahOe7k+aenOi1i+WAvOe7meW9k+WJjeWQkemHj+OAglxuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICovXG4gICAgcHVibGljIG11bHRpcGx5IChvdGhlcjogVmVjMykge1xuICAgICAgICBpZiAodHlwZW9mIG90aGVyICE9PSAnb2JqZWN0JykgeyBjb25zb2xlLndhcm4oJ3Nob3VsZCB1c2UgVmVjMy5zY2FsZSBmb3IgdmVjdG9yICogc2NhbGFyIG9wZXJhdGlvbicpOyB9XG4gICAgICAgIHRoaXMueCAqPSBvdGhlci54O1xuICAgICAgICB0aGlzLnkgKj0gb3RoZXIueTtcbiAgICAgICAgdGhpcy56ICo9IG90aGVyLno7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBNdWx0aXBsaWVzIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGFub3RoZXIgb25lIGFuZCByZXR1cm4gdGhpc1xuICAgICAqIEB6aCDlkJHph4/kuZjms5XjgILlsIblvZPliY3lkJHph4/kuI7mjIflrprliIbph4/nmoTlkJHph4/nm7jkuZjnmoTnu5PmnpzotYvlgLznu5nlvZPliY3lkJHph4/jgIJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIHkgVGhlIHkgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEBwYXJhbSB6IFRoZSB6IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKi9cbiAgICBwdWJsaWMgbXVsdGlwbHkzZiAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggKj0geDtcbiAgICAgICAgdGhpcy55ICo9IHk7XG4gICAgICAgIHRoaXMueiAqPSB6O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlbHkgZGl2aWRlcyB0aGlzIHZlY3RvciB3aXRoIGFub3RoZXIgb25lLCBhbmQgcmV0dXJuIHRoaXMuXG4gICAgICogQHpoIOWQkemHj+mAkOWFg+e0oOebuOmZpOOAguWwhuW9k+WJjeWQkemHj+S4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOmZpOeahOe7k+aenOi1i+WAvOe7meW9k+WJjeWQkemHj+OAglxuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICovXG4gICAgcHVibGljIGRpdmlkZSAob3RoZXI6IFZlYzMpIHtcbiAgICAgICAgdGhpcy54IC89IG90aGVyLng7XG4gICAgICAgIHRoaXMueSAvPSBvdGhlci55O1xuICAgICAgICB0aGlzLnogLz0gb3RoZXIuejtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEVsZW1lbnQtd2lzZWx5IGRpdmlkZXMgdGhpcyB2ZWN0b3Igd2l0aCBhbm90aGVyIG9uZSwgYW5kIHJldHVybiB0aGlzLlxuICAgICAqIEB6aCDlkJHph4/pgJDlhYPntKDnm7jpmaTjgILlsIblvZPliY3lkJHph4/kuI7mjIflrprliIbph4/nmoTlkJHph4/nm7jpmaTnmoTnu5PmnpzotYvlgLznu5nlvZPliY3lkJHph4/jgIJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIHkgVGhlIHkgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEBwYXJhbSB6IFRoZSB6IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKi9cbiAgICBwdWJsaWMgZGl2aWRlM2YgKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54IC89IHg7XG4gICAgICAgIHRoaXMueSAvPSB5O1xuICAgICAgICB0aGlzLnogLz0gejtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgZWFjaCBjb21wb25lbnQgb2YgdGhpcyB2ZWN0b3Igd2l0aCBpdHMgbmVnYXRpdmUgdmFsdWVcbiAgICAgKiBAemgg5bCG5b2T5YmN5ZCR6YeP55qE5ZCE5Liq5YiG6YeP5Y+W5Y+NXG4gICAgICovXG4gICAgcHVibGljIG5lZ2F0aXZlICgpIHtcbiAgICAgICAgdGhpcy54ID0gLXRoaXMueDtcbiAgICAgICAgdGhpcy55ID0gLXRoaXMueTtcbiAgICAgICAgdGhpcy56ID0gLXRoaXMuejtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENsYW1wIHRoZSB2ZWN0b3IgYmV0d2VlbiBtaW5JbmNsdXNpdmUgYW5kIG1heEluY2x1c2l2ZS5cbiAgICAgKiBAemgg6K6+572u5b2T5YmN5ZCR6YeP55qE5YC877yM5L2/5YW25ZCE5Liq5YiG6YeP6YO95aSE5LqO5oyH5a6a55qE6IyD5Zu05YaF44CCXG4gICAgICogQHBhcmFtIG1pbkluY2x1c2l2ZSBNaW5pbXVtIHZhbHVlIGFsbG93ZWRcbiAgICAgKiBAcGFyYW0gbWF4SW5jbHVzaXZlIE1heGltdW0gdmFsdWUgYWxsb3dlZFxuICAgICAqIEByZXR1cm5zIGB0aGlzYFxuICAgICAqL1xuICAgIHB1YmxpYyBjbGFtcGYgKG1pbkluY2x1c2l2ZTogVmVjMywgbWF4SW5jbHVzaXZlOiBWZWMzKSB7XG4gICAgICAgIHRoaXMueCA9IGNsYW1wKHRoaXMueCwgbWluSW5jbHVzaXZlLngsIG1heEluY2x1c2l2ZS54KTtcbiAgICAgICAgdGhpcy55ID0gY2xhbXAodGhpcy55LCBtaW5JbmNsdXNpdmUueSwgbWF4SW5jbHVzaXZlLnkpO1xuICAgICAgICB0aGlzLnogPSBjbGFtcCh0aGlzLnosIG1pbkluY2x1c2l2ZS56LCBtYXhJbmNsdXNpdmUueik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCB3aXRoIGFub3RoZXIgdmVjdG9yXG4gICAgICogQHpoIOWQkemHj+eCueS5mOOAglxuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiBjYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCB3aXRoIGFub3RoZXIgdmVjdG9yXG4gICAgICovXG4gICAgcHVibGljIGRvdCAob3RoZXI6IFZlYzMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIG90aGVyLnggKyB0aGlzLnkgKiBvdGhlci55ICsgdGhpcy56ICogb3RoZXIuejtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCB3aXRoIGFub3RoZXIgdmVjdG9yLlxuICAgICAqIEB6aCDlkJHph4/lj4nkuZjjgILlsIblvZPliY3lkJHph4/lt6blj4nkuZjmjIflrprlkJHph49cbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxuICAgICAqL1xuICAgIHB1YmxpYyBjcm9zcyAob3RoZXI6IFZlYzMpIHtcbiAgICAgICAgY29uc3QgeyB4OiBheCwgeTogYXksIHo6IGF6IH0gPSB0aGlzO1xuICAgICAgICBjb25zdCB7IHg6IGJ4LCB5OiBieSwgejogYnogfSA9IG90aGVyO1xuXG4gICAgICAgIHRoaXMueCA9IGF5ICogYnogLSBheiAqIGJ5O1xuICAgICAgICB0aGlzLnkgPSBheiAqIGJ4IC0gYXggKiBiejtcbiAgICAgICAgdGhpcy56ID0gYXggKiBieSAtIGF5ICogYng7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXG4gICAgICogQHpoIOiuoeeul+WQkemHj+eahOmVv+W6pu+8iOaooe+8ieOAglxuICAgICAqIEByZXR1cm5zIExlbmd0aCBvZiB2ZWN0b3JcbiAgICAgKi9cbiAgICBwdWJsaWMgbGVuZ3RoICgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLnopO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBSZXR1cm5zIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICAgKiBAemgg6K6h566X5ZCR6YeP6ZW/5bqm77yI5qih77yJ55qE5bmz5pa544CCXG4gICAgICogQHJldHVybnMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yXG4gICAgICovXG4gICAgcHVibGljIGxlbmd0aFNxciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLno7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIE5vcm1hbGl6ZSB0aGUgY3VycmVudCB2ZWN0b3IuXG4gICAgICogQHpoIOWwhuW9k+WJjeWQkemHj+W9kuS4gOWMllxuICAgICAqL1xuICAgIHB1YmxpYyBub3JtYWxpemUgKCkge1xuICAgICAgICBjb25zdCB4ID0gdGhpcy54O1xuICAgICAgICBjb25zdCB5ID0gdGhpcy55O1xuICAgICAgICBjb25zdCB6ID0gdGhpcy56O1xuXG4gICAgICAgIGxldCBsZW4gPSB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG4gICAgICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgICAgICB0aGlzLnggPSB4ICogbGVuO1xuICAgICAgICAgICAgdGhpcy55ID0geSAqIGxlbjtcbiAgICAgICAgICAgIHRoaXMueiA9IHogKiBsZW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDQuIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gICAgICogQHpoIOWwhuW9k+WJjeWQkemHj+inhuS4uiB3IOWIhumHj+S4uiAxIOeahOWbm+e7tOWQkemHj++8jOW6lOeUqOWbm+e7tOefqemYteWPmOaNouWIsOW9k+WJjeefqemYtVxuICAgICAqIEBwYXJhbSBtYXRyaXggbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gICAgICovXG4gICAgcHVibGljIHRyYW5zZm9ybU1hdDQgKG1hdHJpeDogTWF0NCkge1xuICAgICAgICBjb25zdCB4ID0gdGhpcy54O1xuICAgICAgICBjb25zdCB5ID0gdGhpcy55O1xuICAgICAgICBjb25zdCB6ID0gdGhpcy56O1xuICAgICAgICBsZXQgcmh3ID0gbWF0cml4Lm0wMyAqIHggKyBtYXRyaXgubTA3ICogeSArIG1hdHJpeC5tMTEgKiB6ICsgbWF0cml4Lm0xNTtcbiAgICAgICAgcmh3ID0gcmh3ID8gMSAvIHJodyA6IDE7XG4gICAgICAgIHRoaXMueCA9IChtYXRyaXgubTAwICogeCArIG1hdHJpeC5tMDQgKiB5ICsgbWF0cml4Lm0wOCAqIHogKyBtYXRyaXgubTEyKSAqIHJodztcbiAgICAgICAgdGhpcy55ID0gKG1hdHJpeC5tMDEgKiB4ICsgbWF0cml4Lm0wNSAqIHkgKyBtYXRyaXgubTA5ICogeiArIG1hdHJpeC5tMTMpICogcmh3O1xuICAgICAgICB0aGlzLnogPSAobWF0cml4Lm0wMiAqIHggKyBtYXRyaXgubTA2ICogeSArIG1hdHJpeC5tMTAgKiB6ICsgbWF0cml4Lm0xNCkgKiByaHc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuXG5cbmNvbnN0IHYzXzEgPSBuZXcgVmVjMygpO1xuY29uc3QgdjNfMiA9IG5ldyBWZWMzKCk7Il19