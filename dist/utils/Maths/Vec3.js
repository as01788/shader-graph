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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVjMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlscy9NYXRocy9WZWMzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLG1DQUFpRDtBQUVqRDs7O0dBR0c7QUFDRixNQUFhLElBQUk7SUE0b0JkLFlBQWEsQ0FBaUIsRUFBRSxDQUFVLEVBQUUsQ0FBVTtRQUNsRCxVQUFVO1FBQ1YsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQjthQUFNO1lBQ0gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBNW9CRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsSUFBSSxDQUF5QixHQUFRO1FBQy9DLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQTBCLENBQU07UUFDL0MsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7O09BR0c7SUFDSSxN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LENBQUM7UUFDMUIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDMUIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBeUIsR0FBUSxFQUFFLENBQVksRUFBRSxDQUFZLEVBQUUsQ0FBUztRQUN0RixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBeUIsR0FBUSxFQUFFLEtBQWM7UUFDakUsS0FBSyxHQUFHLEtBQUssSUFBSSxHQUFHLENBQUM7UUFFckIsTUFBTSxHQUFHLEdBQUcsY0FBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDckMsTUFBTSxRQUFRLEdBQUcsY0FBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFFcEQsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDekMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDekMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxhQUFhLENBQTBCLEdBQVEsRUFBRSxDQUFZLEVBQUUsQ0FBWTtRQUNyRixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3BELEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDMUQsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDMUQsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDMUQsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLG1CQUFtQixDQUF5QixHQUFRLEVBQUUsQ0FBWSxFQUFFLENBQVk7UUFDMUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEQsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFD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QyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLG1CQUFtQixDQUF5QixHQUFRLEVBQUUsQ0FBWSxFQUFFLENBQVksRUFBRSxDQUFZLEVBQUUsQ0FBWTtRQUN0SCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxHQUFHLENBQUMsQ0FBQyxHQUFHLENB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QUMsQ0FBQyxDQUFDO2VBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO21CQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDbEUsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLFFBQVEsQ0FBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxPQUFPLEdBQUcsZUFBTztRQUMvRCxPQUFPLENBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNqQixPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztlQUN0RCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO21CQUNwQixPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztlQUN0RCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO21CQUNwQixPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUM1RCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7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QyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLFFBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QyxZQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUEwK0JoRSxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXQ0IH0gZnJvbSBcIi4vTWF0NFwiO1xyXG5pbXBvcnQgeyBJTWF0M0xpa2UsIElNYXQ0TGlrZSwgSVF1YXRMaWtlLCBJVmVjM0xpa2UgfSBmcm9tIFwiLi90eXBlLWRlZmluZVwiO1xyXG5pbXBvcnQgeyBjbGFtcCwgRVBTSUxPTiwgcmFuZG9tIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAZW4gUmVwcmVzZW50YXRpb24gb2YgM0QgdmVjdG9ycyBhbmQgcG9pbnRzLlxyXG4gKiBAemgg5LiJ57u05ZCR6YeP44CCXHJcbiAqL1xyXG4gZXhwb3J0IGNsYXNzIFZlYzMge1xyXG4gICAgcHVibGljIHN0YXRpYyBVTklUX1ggPSBPYmplY3QuZnJlZXplKG5ldyBWZWMzKDEsIDAsIDApKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgVU5JVF9ZID0gT2JqZWN0LmZyZWV6ZShuZXcgVmVjMygwLCAxLCAwKSk7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVOSVRfWiA9IE9iamVjdC5mcmVlemUobmV3IFZlYzMoMCwgMCwgMSkpO1xyXG4gICAgcHVibGljIHN0YXRpYyBSSUdIVCA9IE9iamVjdC5mcmVlemUobmV3IFZlYzMoMSwgMCwgMCkpO1xyXG4gICAgcHVibGljIHN0YXRpYyBVUCA9IE9iamVjdC5mcmVlemUobmV3IFZlYzMoMCwgMSwgMCkpO1xyXG4gICAgcHVibGljIHN0YXRpYyBGT1JXQVJEID0gT2JqZWN0LmZyZWV6ZShuZXcgVmVjMygwLCAwLCAtMSkpOyAvLyB3ZSB1c2UgLXogZm9yIHZpZXctZGlyXHJcbiAgICBwdWJsaWMgc3RhdGljIFpFUk8gPSBPYmplY3QuZnJlZXplKG5ldyBWZWMzKDAsIDAsIDApKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgT05FID0gT2JqZWN0LmZyZWV6ZShuZXcgVmVjMygxLCAxLCAxKSk7XHJcbiAgICBwdWJsaWMgc3RhdGljIE5FR19PTkUgPSBPYmplY3QuZnJlZXplKG5ldyBWZWMzKC0xLCAtMSwgLTEpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiByZXR1cm4gYSBWZWMzIG9iamVjdCB3aXRoIHggPSAwLCB5ID0gMCwgeiA9IDAuXHJcbiAgICAgKiBAemgg5bCG55uu5qCH6LWL5YC85Li66Zu25ZCR6YePXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgemVybzxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gMDtcclxuICAgICAgICBvdXQueSA9IDA7XHJcbiAgICAgICAgb3V0LnogPSAwO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gT2J0YWlucyBhIGNsb25lIG9mIHRoZSBnaXZlbiB2ZWN0b3Igb2JqZWN0XHJcbiAgICAgKiBAemgg6I635b6X5oyH5a6a5ZCR6YeP55qE5ou36LSdXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xvbmUgPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMyhhLngsIGEueSwgYS56KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDb3B5IHRoZSB0YXJnZXQgdmVjdG9yIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XHJcbiAgICAgKiBAemgg5aSN5Yi255uu5qCH5ZCR6YePXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29weTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlYzNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IFZlYzNMaWtlKSB7XHJcbiAgICAgICAgb3V0LnggPSBhLng7XHJcbiAgICAgICAgb3V0LnkgPSBhLnk7XHJcbiAgICAgICAgb3V0LnogPSBhLno7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIHRoZSBvdXQgdmVjdG9yIHdpdGggdGhlIGdpdmVuIHgsIHkgYW5kIHogdmFsdWVzXHJcbiAgICAgKiBAemgg6K6+572u5ZCR6YeP5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0PE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XHJcbiAgICAgICAgb3V0LnggPSB4O1xyXG4gICAgICAgIG91dC55ID0geTtcclxuICAgICAgICBvdXQueiA9IHo7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBFbGVtZW50LXdpc2UgdmVjdG9yIGFkZGl0aW9uIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5Yqg5rOVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIGI6IElWZWMzTGlrZSkge1xyXG4gICAgICAgIG91dC54ID0gYS54ICsgYi54O1xyXG4gICAgICAgIG91dC55ID0gYS55ICsgYi55O1xyXG4gICAgICAgIG91dC56ID0gYS56ICsgYi56O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlIHZlY3RvciBzdWJ0cmFjdGlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgdmVjdG9yIG9iamVjdFxyXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+WHj+azlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN1YnRyYWN0PE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIGI6IElWZWMzTGlrZSkge1xyXG4gICAgICAgIG91dC54ID0gYS54IC0gYi54O1xyXG4gICAgICAgIG91dC55ID0gYS55IC0gYi55O1xyXG4gICAgICAgIG91dC56ID0gYS56IC0gYi56O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlIHZlY3RvciBtdWx0aXBsaWNhdGlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgdmVjdG9yIG9iamVjdFxyXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+S5mOazlSAo5YiG6YeP56evKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG11bHRpcGx5PE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIGI6IElWZWMzTGlrZSkge1xyXG4gICAgICAgIG91dC54ID0gYS54ICogYi54O1xyXG4gICAgICAgIG91dC55ID0gYS55ICogYi55O1xyXG4gICAgICAgIG91dC56ID0gYS56ICogYi56O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlIHZlY3RvciBkaXZpc2lvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgdmVjdG9yIG9iamVjdFxyXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+mZpOazlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRpdmlkZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlLCBiOiBJVmVjM0xpa2UpIHtcclxuICAgICAgICBvdXQueCA9IGEueCAvIGIueDtcclxuICAgICAgICBvdXQueSA9IGEueSAvIGIueTtcclxuICAgICAgICBvdXQueiA9IGEueiAvIGIuejtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFJvdW5kcyB1cCBieSBlbGVtZW50cyBvZiB0aGUgdmVjdG9yIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5ZCR5LiK5Y+W5pW0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2VpbDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlKSB7XHJcbiAgICAgICAgb3V0LnggPSBNYXRoLmNlaWwoYS54KTtcclxuICAgICAgICBvdXQueSA9IE1hdGguY2VpbChhLnkpO1xyXG4gICAgICAgIG91dC56ID0gTWF0aC5jZWlsKGEueik7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBFbGVtZW50LXdpc2Ugcm91bmRzIGRvd24gb2YgdGhlIGN1cnJlbnQgdmVjdG9yIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIHRoZSBvdXQgdmVjdG9yXHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5ZCR5LiL5Y+W5pW0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZmxvb3I8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IElWZWMzTGlrZSkge1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5mbG9vcihhLngpO1xyXG4gICAgICAgIG91dC55ID0gTWF0aC5mbG9vcihhLnkpO1xyXG4gICAgICAgIG91dC56ID0gTWF0aC5mbG9vcihhLnopO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyBlbGVtZW50LXdpc2UgbWluaW11bSB2YWx1ZXMgYW5kIHNhdmUgdG8gdGhlIG91dCB2ZWN0b3JcclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/mnIDlsI/lgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtaW48T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IElWZWMzTGlrZSwgYjogSVZlYzNMaWtlKSB7XHJcbiAgICAgICAgb3V0LnggPSBNYXRoLm1pbihhLngsIGIueCk7XHJcbiAgICAgICAgb3V0LnkgPSBNYXRoLm1pbihhLnksIGIueSk7XHJcbiAgICAgICAgb3V0LnogPSBNYXRoLm1pbihhLnosIGIueik7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIGVsZW1lbnQtd2lzZSBtYXhpbXVtIHZhbHVlcyBhbmQgc2F2ZSB0byB0aGUgb3V0IHZlY3RvclxyXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+acgOWkp+WAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1heDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlLCBiOiBJVmVjM0xpa2UpIHtcclxuICAgICAgICBvdXQueCA9IE1hdGgubWF4KGEueCwgYi54KTtcclxuICAgICAgICBvdXQueSA9IE1hdGgubWF4KGEueSwgYi55KTtcclxuICAgICAgICBvdXQueiA9IE1hdGgubWF4KGEueiwgYi56KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgZWxlbWVudC13aXNlIHJvdW5kIHJlc3VsdHMgYW5kIHNhdmUgdG8gdGhlIG91dCB2ZWN0b3JcclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lm5voiI3kupTlhaXlj5bmlbRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByb3VuZDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlKSB7XHJcbiAgICAgICAgb3V0LnggPSBNYXRoLnJvdW5kKGEueCk7XHJcbiAgICAgICAgb3V0LnkgPSBNYXRoLnJvdW5kKGEueSk7XHJcbiAgICAgICAgb3V0LnogPSBNYXRoLnJvdW5kKGEueik7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWZWN0b3Igc2NhbGFyIG11bHRpcGxpY2F0aW9uIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XHJcbiAgICAgKiBAemgg5ZCR6YeP5qCH6YeP5LmY5rOVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbXVsdGlwbHlTY2FsYXI8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWMzTGlrZSBleHRlbmRzIElWZWMzTGlrZSA+IChvdXQ6IE91dCwgYTogVmVjM0xpa2UsIGI6IG51bWJlcikge1xyXG4gICAgICAgIG91dC54ID0gYS54ICogYjtcclxuICAgICAgICBvdXQueSA9IGEueSAqIGI7XHJcbiAgICAgICAgb3V0LnogPSBhLnogKiBiO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlIG11bHRpcGxpY2F0aW9uIGFuZCBhZGRpdGlvbiB3aXRoIHRoZSBlcXVhdGlvbjogYSArIGIgKiBzY2FsZVxyXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+S5mOWKoDogQSArIEIgKiBzY2FsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNjYWxlQW5kQWRkPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIGI6IElWZWMzTGlrZSwgc2NhbGU6IG51bWJlcikge1xyXG4gICAgICAgIG91dC54ID0gYS54ICsgYi54ICogc2NhbGU7XHJcbiAgICAgICAgb3V0LnkgPSBhLnkgKyBiLnkgKiBzY2FsZTtcclxuICAgICAgICBvdXQueiA9IGEueiArIGIueiAqIHNjYWxlO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgZXVjbGlkZWFuIGRpc3RhbmNlIG9mIHR3byB2ZWN0b3JzXHJcbiAgICAgKiBAemgg5rGC5Lik5ZCR6YeP55qE5qyn5rCP6Led56a7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZGlzdGFuY2UgKGE6IElWZWMzTGlrZSwgYjogSVZlYzNMaWtlKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IGIueCAtIGEueDtcclxuICAgICAgICBjb25zdCB5ID0gYi55IC0gYS55O1xyXG4gICAgICAgIGNvbnN0IHogPSBiLnogLSBhLno7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkZWFuIGRpc3RhbmNlIG9mIHR3byB2ZWN0b3JzXHJcbiAgICAgKiBAemgg5rGC5Lik5ZCR6YeP55qE5qyn5rCP6Led56a75bmz5pa5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3F1YXJlZERpc3RhbmNlIChhOiBJVmVjM0xpa2UsIGI6IElWZWMzTGlrZSkge1xyXG4gICAgICAgIGNvbnN0IHggPSBiLnggLSBhLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGIueSAtIGEueTtcclxuICAgICAgICBjb25zdCB6ID0gYi56IC0gYS56O1xyXG4gICAgICAgIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHo7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3JcclxuICAgICAqIEB6aCDmsYLlkJHph4/plb/luqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsZW4gKGE6IElWZWMzTGlrZSkge1xyXG4gICAgICAgIGNvbnN0IHggPSBhLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGEueTtcclxuICAgICAgICBjb25zdCB6ID0gYS56O1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGUgdmVjdG9yXHJcbiAgICAgKiBAemgg5rGC5ZCR6YeP6ZW/5bqm5bmz5pa5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbGVuZ3RoU3FyIChhOiBJVmVjM0xpa2UpIHtcclxuICAgICAgICBjb25zdCB4ID0gYS54O1xyXG4gICAgICAgIGNvbnN0IHkgPSBhLnk7XHJcbiAgICAgICAgY29uc3QgeiA9IGEuejtcclxuICAgICAgICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFNldHMgZWFjaCBlbGVtZW50IHRvIGl0cyBuZWdhdGl2ZSB2YWx1ZVxyXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+WPlui0n1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG5lZ2F0ZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlKSB7XHJcbiAgICAgICAgb3V0LnggPSAtYS54O1xyXG4gICAgICAgIG91dC55ID0gLWEueTtcclxuICAgICAgICBvdXQueiA9IC1hLno7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIGVhY2ggZWxlbWVudCB0byBpdHMgaW52ZXJzZSB2YWx1ZSwgemVybyB2YWx1ZSB3aWxsIGJlY29tZSBJbmZpbml0eVxyXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+WPluWAkuaVsO+8jOaOpei/kSAwIOaXtui/lOWbniBJbmZpbml0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGludmVydDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlKSB7XHJcbiAgICAgICAgb3V0LnggPSAxLjAgLyBhLng7XHJcbiAgICAgICAgb3V0LnkgPSAxLjAgLyBhLnk7XHJcbiAgICAgICAgb3V0LnogPSAxLjAgLyBhLno7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIGVhY2ggZWxlbWVudCB0byBpdHMgaW52ZXJzZSB2YWx1ZSwgemVybyB2YWx1ZSB3aWxsIHJlbWFpbiB6ZXJvXHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W5YCS5pWw77yM5o6l6L+RIDAg5pe26L+U5ZueIDBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnZlcnRTYWZlPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UpIHtcclxuICAgICAgICBjb25zdCB4ID0gYS54O1xyXG4gICAgICAgIGNvbnN0IHkgPSBhLnk7XHJcbiAgICAgICAgY29uc3QgeiA9IGEuejtcclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHgpIDwgRVBTSUxPTikge1xyXG4gICAgICAgICAgICBvdXQueCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0LnggPSAxLjAgLyB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHkpIDwgRVBTSUxPTikge1xyXG4gICAgICAgICAgICBvdXQueSA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0LnkgPSAxLjAgLyB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHopIDwgRVBTSUxPTikge1xyXG4gICAgICAgICAgICBvdXQueiA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0LnogPSAxLjAgLyB6O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIHRoZSBub3JtYWxpemVkIHZlY3RvciB0byB0aGUgb3V0IHZlY3RvclxyXG4gICAgICogQHpoIOW9kuS4gOWMluWQkemHj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG5vcm1hbGl6ZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IGEueDtcclxuICAgICAgICBjb25zdCB5ID0gYS55O1xyXG4gICAgICAgIGNvbnN0IHogPSBhLno7XHJcblxyXG4gICAgICAgIGxldCBsZW4gPSB4ICogeCArIHkgKiB5ICsgeiAqIHo7XHJcbiAgICAgICAgaWYgKGxlbiA+IDApIHtcclxuICAgICAgICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xyXG4gICAgICAgICAgICBvdXQueCA9IHggKiBsZW47XHJcbiAgICAgICAgICAgIG91dC55ID0geSAqIGxlbjtcclxuICAgICAgICAgICAgb3V0LnogPSB6ICogbGVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoZSB2ZWN0b3JcclxuICAgICAqIEB6aCDlkJHph4/ngrnnp6/vvIjmlbDph4/np6/vvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkb3QgPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCwgYjogSVZlYzNMaWtlKSB7XHJcbiAgICAgICAgcmV0dXJuIGEueCAqIGIueCArIGEueSAqIGIueSArIGEueiAqIGIuejtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHRoZSB2ZWN0b3JcclxuICAgICAqIEB6aCDlkJHph4/lj4nnp6/vvIjlkJHph4/np6/vvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcm9zczxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlLCBiOiBJVmVjM0xpa2UpIHtcclxuICAgICAgICBjb25zdCB7IHg6IGF4LCB5OiBheSwgejogYXogfSA9IGE7XHJcbiAgICAgICAgY29uc3QgeyB4OiBieCwgeTogYnksIHo6IGJ6IH0gPSBiO1xyXG4gICAgICAgIG91dC54ID0gYXkgKiBieiAtIGF6ICogYnk7XHJcbiAgICAgICAgb3V0LnkgPSBheiAqIGJ4IC0gYXggKiBiejtcclxuICAgICAgICBvdXQueiA9IGF4ICogYnkgLSBheSAqIGJ4O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjdG9ycyB3aXRoIGEgZ2l2ZW4gcmF0aW9cclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/nur/mgKfmj5LlgLzvvJogQSArIHQgKiAoQiAtIEEpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbGVycDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlLCBiOiBJVmVjM0xpa2UsIHQ6IG51bWJlcikge1xyXG4gICAgICAgIG91dC54ID0gYS54ICsgdCAqIChiLnggLSBhLngpO1xyXG4gICAgICAgIG91dC55ID0gYS55ICsgdCAqIChiLnkgLSBhLnkpO1xyXG4gICAgICAgIG91dC56ID0gYS56ICsgdCAqIChiLnogLSBhLnopO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gR2VuZXJhdGVzIGEgdW5pZm9ybWx5IGRpc3RyaWJ1dGVkIHJhbmRvbSB2ZWN0b3IgcG9pbnRzIGZyb20gY2VudGVyIHRvIHRoZSBzdXJmYWNlIG9mIHRoZSB1bml0IHNwaGVyZVxyXG4gICAgICogQHpoIOeUn+aIkOS4gOS4quWcqOWNleS9jeeQg+S9k+S4iuWdh+WMgOWIhuW4g+eahOmaj+acuuWQkemHj1xyXG4gICAgICogQHBhcmFtIHNjYWxlIHZlY3RvciBsZW5ndGhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByYW5kb208T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHNjYWxlPzogbnVtYmVyKSB7XHJcbiAgICAgICAgc2NhbGUgPSBzY2FsZSB8fCAxLjA7XHJcblxyXG4gICAgICAgIGNvbnN0IHBoaSA9IHJhbmRvbSgpICogMi4wICogTWF0aC5QSTtcclxuICAgICAgICBjb25zdCBjb3NUaGV0YSA9IHJhbmRvbSgpICogMiAtIDE7XHJcbiAgICAgICAgY29uc3Qgc2luVGhldGEgPSBNYXRoLnNxcnQoMSAtIGNvc1RoZXRhICogY29zVGhldGEpO1xyXG5cclxuICAgICAgICBvdXQueCA9IHNpblRoZXRhICogTWF0aC5jb3MocGhpKSAqIHNjYWxlO1xyXG4gICAgICAgIG91dC55ID0gc2luVGhldGEgKiBNYXRoLnNpbihwaGkpICogc2NhbGU7XHJcbiAgICAgICAgb3V0LnogPSBjb3NUaGV0YSAqIHNjYWxlO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVmVjdG9yIGFuZCBmb3VydGggb3JkZXIgbWF0cml4IG11bHRpcGxpY2F0aW9uLCB3aWxsIGNvbXBsZXRlIHRoZSB2ZWN0b3Igd2l0aCBhIGZvdXJ0aCB2YWx1ZSBhcyBvbmVcclxuICAgICAqIEB6aCDlkJHph4/kuI7lm5vnu7Tnn6npmLXkuZjms5XvvIzpu5jorqTlkJHph4/nrKzlm5vkvY3kuLogMeOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRyYW5zZm9ybU1hdDQgPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIG06IElNYXQ0TGlrZSkge1xyXG4gICAgICAgIGNvbnN0IHggPSBhLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGEueTtcclxuICAgICAgICBjb25zdCB6ID0gYS56O1xyXG4gICAgICAgIGxldCByaHcgPSBtLm0wMyAqIHggKyBtLm0wNyAqIHkgKyBtLm0xMSAqIHogKyBtLm0xNTtcclxuICAgICAgICByaHcgPSByaHcgPyBNYXRoLmFicygxIC8gcmh3KSA6IDE7XHJcbiAgICAgICAgb3V0LnggPSAobS5tMDAgKiB4ICsgbS5tMDQgKiB5ICsgbS5tMDggKiB6ICsgbS5tMTIpICogcmh3O1xyXG4gICAgICAgIG91dC55ID0gKG0ubTAxICogeCArIG0ubTA1ICogeSArIG0ubTA5ICogeiArIG0ubTEzKSAqIHJodztcclxuICAgICAgICBvdXQueiA9IChtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHogKyBtLm0xNCkgKiByaHc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWZWN0b3IgYW5kIGZvdXJ0aCBvcmRlciBtYXRyaXggbXVsdGlwbGljYXRpb24sIHdpbGwgY29tcGxldGUgdGhlIHZlY3RvciB3aXRoIGEgZm91cnRoIGVsZW1lbnQgYXMgb25lXHJcbiAgICAgKiBAemgg5ZCR6YeP5LiO5Zub57u055+p6Zi15LmY5rOV77yM6buY6K6k5ZCR6YeP56ys5Zub5L2N5Li6IDDjgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2Zvcm1NYXQ0Tm9ybWFsPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIG06IElNYXQ0TGlrZSkge1xyXG4gICAgICAgIGNvbnN0IHggPSBhLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGEueTtcclxuICAgICAgICBjb25zdCB6ID0gYS56O1xyXG4gICAgICAgIGxldCByaHcgPSBtLm0wMyAqIHggKyBtLm0wNyAqIHkgKyBtLm0xMSAqIHo7XHJcbiAgICAgICAgcmh3ID0gcmh3ID8gTWF0aC5hYnMoMSAvIHJodykgOiAxO1xyXG4gICAgICAgIG91dC54ID0gKG0ubTAwICogeCArIG0ubTA0ICogeSArIG0ubTA4ICogeikgKiByaHc7XHJcbiAgICAgICAgb3V0LnkgPSAobS5tMDEgKiB4ICsgbS5tMDUgKiB5ICsgbS5tMDkgKiB6KSAqIHJodztcclxuICAgICAgICBvdXQueiA9IChtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHopICogcmh3O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVmVjdG9yIGFuZCB0aGlyZCBvcmRlciBtYXRyaXggbXVsdGlwbGljYXRpb25cclxuICAgICAqIEB6aCDlkJHph4/kuI7kuInnu7Tnn6npmLXkuZjms5VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2Zvcm1NYXQzPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIG06IElNYXQzTGlrZSkge1xyXG4gICAgICAgIGNvbnN0IHggPSBhLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGEueTtcclxuICAgICAgICBjb25zdCB6ID0gYS56O1xyXG4gICAgICAgIG91dC54ID0geCAqIG0ubTAwICsgeSAqIG0ubTAzICsgeiAqIG0ubTA2O1xyXG4gICAgICAgIG91dC55ID0geCAqIG0ubTAxICsgeSAqIG0ubTA0ICsgeiAqIG0ubTA3O1xyXG4gICAgICAgIG91dC56ID0geCAqIG0ubTAyICsgeSAqIG0ubTA1ICsgeiAqIG0ubTA4O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQWZmaW5lIHRyYW5zZm9ybWF0aW9uIHZlY3RvclxyXG4gICAgICogQHpoIOWQkemHj+S7v+WwhOWPmOaNolxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRyYW5zZm9ybUFmZmluZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgdjogSVZlYzNMaWtlLCBtOiBJTWF0NExpa2UpIHtcclxuICAgICAgICBjb25zdCB4ID0gdi54O1xyXG4gICAgICAgIGNvbnN0IHkgPSB2Lnk7XHJcbiAgICAgICAgY29uc3QgeiA9IHYuejtcclxuICAgICAgICBvdXQueCA9IG0ubTAwICogeCArIG0ubTA0ICogeSArIG0ubTA4ICogeiArIG0ubTEyO1xyXG4gICAgICAgIG91dC55ID0gbS5tMDEgKiB4ICsgbS5tMDUgKiB5ICsgbS5tMDkgKiB6ICsgbS5tMTM7XHJcbiAgICAgICAgb3V0LnggPSBtLm0wMiAqIHggKyBtLm0wNiAqIHkgKyBtLm0xMCAqIHogKyBtLm0xNDtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFZlY3RvciBxdWF0ZXJuaW9uIG11bHRpcGxpY2F0aW9uXHJcbiAgICAgKiBAemgg5ZCR6YeP5Zub5YWD5pWw5LmY5rOVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdHJhbnNmb3JtUXVhdDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlLCBxOiBJUXVhdExpa2UpIHtcclxuICAgICAgICAvLyBiZW5jaG1hcmtzOiBodHRwOi8vanNwZXJmLmNvbS9xdWF0ZXJuaW9uLXRyYW5zZm9ybS1WZWMzLWltcGxlbWVudGF0aW9uc1xyXG5cclxuICAgICAgICAvLyBjYWxjdWxhdGUgcXVhdCAqIHZlY1xyXG4gICAgICAgIGNvbnN0IGl4ID0gcS53ICogYS54ICsgcS55ICogYS56IC0gcS56ICogYS55O1xyXG4gICAgICAgIGNvbnN0IGl5ID0gcS53ICogYS55ICsgcS56ICogYS54IC0gcS54ICogYS56O1xyXG4gICAgICAgIGNvbnN0IGl6ID0gcS53ICogYS56ICsgcS54ICogYS55IC0gcS55ICogYS54O1xyXG4gICAgICAgIGNvbnN0IGl3ID0gLXEueCAqIGEueCAtIHEueSAqIGEueSAtIHEueiAqIGEuejtcclxuXHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIHJlc3VsdCAqIGludmVyc2UgcXVhdFxyXG4gICAgICAgIG91dC54ID0gaXggKiBxLncgKyBpdyAqIC1xLnggKyBpeSAqIC1xLnogLSBpeiAqIC1xLnk7XHJcbiAgICAgICAgb3V0LnkgPSBpeSAqIHEudyArIGl3ICogLXEueSArIGl6ICogLXEueCAtIGl4ICogLXEuejtcclxuICAgICAgICBvdXQueiA9IGl6ICogcS53ICsgaXcgKiAtcS56ICsgaXggKiAtcS55IC0gaXkgKiAtcS54O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVHJhbnNmb3JtcyB0aGUgY3VycmVudCB2ZWN0b3Igd2l0aCBnaXZlbiBzY2FsZSwgcm90YXRpb24gYW5kIHRyYW5zbGF0aW9uIGluIG9yZGVyXHJcbiAgICAgKiBAemgg5Lul57yp5pS+IC0+IOaXi+i9rCAtPiDlubPnp7vpobrluo/lj5jmjaLlkJHph49cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2Zvcm1SVFM8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IElWZWMzTGlrZSwgcjogSVF1YXRMaWtlLCB0OiBJVmVjM0xpa2UsIHM6IElWZWMzTGlrZSkge1xyXG4gICAgICAgIGNvbnN0IHggPSBhLnggKiBzLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGEueSAqIHMueTtcclxuICAgICAgICBjb25zdCB6ID0gYS56ICogcy56O1xyXG4gICAgICAgIGNvbnN0IGl4ID0gci53ICogeCArIHIueSAqIHogLSByLnogKiB5O1xyXG4gICAgICAgIGNvbnN0IGl5ID0gci53ICogeSArIHIueiAqIHggLSByLnggKiB6O1xyXG4gICAgICAgIGNvbnN0IGl6ID0gci53ICogeiArIHIueCAqIHkgLSByLnkgKiB4O1xyXG4gICAgICAgIGNvbnN0IGl3ID0gLXIueCAqIHggLSByLnkgKiB5IC0gci56ICogejtcclxuICAgICAgICBvdXQueCA9IGl4ICogci53ICsgaXcgKiAtci54ICsgaXkgKiAtci56IC0gaXogKiAtci55ICsgdC54O1xyXG4gICAgICAgIG91dC55ID0gaXkgKiByLncgKyBpdyAqIC1yLnkgKyBpeiAqIC1yLnggLSBpeCAqIC1yLnogKyB0Lnk7XHJcbiAgICAgICAgb3V0LnogPSBpeiAqIHIudyArIGl3ICogLXIueiArIGl4ICogLXIueSAtIGl5ICogLXIueCArIHQuejtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFRyYW5zZm9ybXMgdGhlIGN1cnJlbnQgdmVjdG9yIHdpdGggZ2l2ZW4gc2NhbGUsIHJvdGF0aW9uIGFuZCB0cmFuc2xhdGlvbiBpbiByZXZlcnNlIG9yZGVyXHJcbiAgICAgKiBAemgg5Lul5bmz56e7IC0+IOaXi+i9rCAtPiDnvKnmlL7pobrluo/pgIblj5jmjaLlkJHph49cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2Zvcm1JbnZlcnNlUlRTPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIHI6IElRdWF0TGlrZSwgdDogSVZlYzNMaWtlLCBzOiBJVmVjM0xpa2UpIHtcclxuICAgICAgICBjb25zdCB4ID0gYS54IC0gdC54O1xyXG4gICAgICAgIGNvbnN0IHkgPSBhLnkgLSB0Lnk7XHJcbiAgICAgICAgY29uc3QgeiA9IGEueiAtIHQuejtcclxuICAgICAgICBjb25zdCBpeCA9IHIudyAqIHggLSByLnkgKiB6ICsgci56ICogeTtcclxuICAgICAgICBjb25zdCBpeSA9IHIudyAqIHkgLSByLnogKiB4ICsgci54ICogejtcclxuICAgICAgICBjb25zdCBpeiA9IHIudyAqIHogLSByLnggKiB5ICsgci55ICogeDtcclxuICAgICAgICBjb25zdCBpdyA9IHIueCAqIHggKyByLnkgKiB5ICsgci56ICogejtcclxuICAgICAgICBvdXQueCA9IChpeCAqIHIudyArIGl3ICogci54ICsgaXkgKiByLnogLSBpeiAqIHIueSkgLyBzLng7XHJcbiAgICAgICAgb3V0LnkgPSAoaXkgKiByLncgKyBpdyAqIHIueSArIGl6ICogci54IC0gaXggKiByLnopIC8gcy55O1xyXG4gICAgICAgIG91dC56ID0gKGl6ICogci53ICsgaXcgKiByLnogKyBpeCAqIHIueSAtIGl5ICogci54KSAvIHMuejtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFJvdGF0ZXMgdGhlIHZlY3RvciB3aXRoIHNwZWNpZmllZCBhbmdsZSBhcm91bmQgWCBheGlzXHJcbiAgICAgKiBAemgg57uVIFgg6L205peL6L2s5ZCR6YeP5oyH5a6a5byn5bqmXHJcbiAgICAgKiBAcGFyYW0gdiByb3RhdGlvbiB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSBvIGNlbnRlciBvZiByb3RhdGlvblxyXG4gICAgICogQHBhcmFtIGEgcmFkaXVzIG9mIHJvdGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcm90YXRlWDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgdjogSVZlYzNMaWtlLCBvOiBJVmVjM0xpa2UsIGE6IG51bWJlcikge1xyXG4gICAgICAgIC8vIFRyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXHJcbiAgICAgICAgY29uc3QgeCA9IHYueCAtIG8ueDtcclxuICAgICAgICBjb25zdCB5ID0gdi55IC0gby55O1xyXG4gICAgICAgIGNvbnN0IHogPSB2LnogLSBvLno7XHJcblxyXG4gICAgICAgIC8vIHBlcmZvcm0gcm90YXRpb25cclxuICAgICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhhKTtcclxuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihhKTtcclxuICAgICAgICBjb25zdCByeCA9IHg7XHJcbiAgICAgICAgY29uc3QgcnkgPSB5ICogY29zIC0geiAqIHNpbjtcclxuICAgICAgICBjb25zdCByeiA9IHkgKiBzaW4gKyB6ICogY29zO1xyXG5cclxuICAgICAgICAvLyB0cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxyXG4gICAgICAgIG91dC54ID0gcnggKyBvLng7XHJcbiAgICAgICAgb3V0LnkgPSByeSArIG8ueTtcclxuICAgICAgICBvdXQueiA9IHJ6ICsgby56O1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFJvdGF0ZXMgdGhlIHZlY3RvciB3aXRoIHNwZWNpZmllZCBhbmdsZSBhcm91bmQgWSBheGlzXHJcbiAgICAgKiBAemgg57uVIFkg6L205peL6L2s5ZCR6YeP5oyH5a6a5byn5bqmXHJcbiAgICAgKiBAcGFyYW0gdiByb3RhdGlvbiB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSBvIGNlbnRlciBvZiByb3RhdGlvblxyXG4gICAgICogQHBhcmFtIGEgcmFkaXVzIG9mIHJvdGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcm90YXRlWTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgdjogSVZlYzNMaWtlLCBvOiBJVmVjM0xpa2UsIGE6IG51bWJlcikge1xyXG4gICAgICAgIC8vIFRyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXHJcbiAgICAgICAgY29uc3QgeCA9IHYueCAtIG8ueDtcclxuICAgICAgICBjb25zdCB5ID0gdi55IC0gby55O1xyXG4gICAgICAgIGNvbnN0IHogPSB2LnogLSBvLno7XHJcblxyXG4gICAgICAgIC8vIHBlcmZvcm0gcm90YXRpb25cclxuICAgICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhhKTtcclxuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihhKTtcclxuICAgICAgICBjb25zdCByeCA9IHogKiBzaW4gKyB4ICogY29zO1xyXG4gICAgICAgIGNvbnN0IHJ5ID0geTtcclxuICAgICAgICBjb25zdCByeiA9IHogKiBjb3MgLSB4ICogc2luO1xyXG5cclxuICAgICAgICAvLyB0cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxyXG4gICAgICAgIG91dC54ID0gcnggKyBvLng7XHJcbiAgICAgICAgb3V0LnkgPSByeSArIG8ueTtcclxuICAgICAgICBvdXQueiA9IHJ6ICsgby56O1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFJvdGF0ZXMgdGhlIHZlY3RvciB3aXRoIHNwZWNpZmllZCBhbmdsZSBhcm91bmQgWiBheGlzXHJcbiAgICAgKiBAemgg57uVIFog6L205peL6L2s5ZCR6YeP5oyH5a6a5byn5bqmXHJcbiAgICAgKiBAcGFyYW0gdiByb3RhdGlvbiB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSBvIGNlbnRlciBvZiByb3RhdGlvblxyXG4gICAgICogQHBhcmFtIGEgcmFkaXVzIG9mIHJvdGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcm90YXRlWjxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgdjogSVZlYzNMaWtlLCBvOiBJVmVjM0xpa2UsIGE6IG51bWJlcikge1xyXG4gICAgICAgIC8vIFRyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXHJcbiAgICAgICAgY29uc3QgeCA9IHYueCAtIG8ueDtcclxuICAgICAgICBjb25zdCB5ID0gdi55IC0gby55O1xyXG4gICAgICAgIGNvbnN0IHogPSB2LnogLSBvLno7XHJcblxyXG4gICAgICAgIC8vIHBlcmZvcm0gcm90YXRpb25cclxuICAgICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhhKTtcclxuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihhKTtcclxuICAgICAgICBjb25zdCByeCA9IHggKiBjb3MgLSB5ICogc2luO1xyXG4gICAgICAgIGNvbnN0IHJ5ID0geCAqIHNpbiArIHkgKiBjb3M7XHJcbiAgICAgICAgY29uc3QgcnogPSB6O1xyXG5cclxuICAgICAgICAvLyB0cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxyXG4gICAgICAgIG91dC54ID0gcnggKyBvLng7XHJcbiAgICAgICAgb3V0LnkgPSByeSArIG8ueTtcclxuICAgICAgICBvdXQueiA9IHJ6ICsgby56O1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENvbnZlcnRzIHRoZSBnaXZlbiB2ZWN0b3IgdG8gYW4gYXJyYXlcclxuICAgICAqIEB6aCDlkJHph4/ovazmlbDnu4RcclxuICAgICAqIEBwYXJhbSBvZnMgQXJyYXkgU3RhcnQgT2Zmc2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdG9BcnJheSA8T3V0PiAob3V0OiBPdXQsIHY6IElWZWMzTGlrZSwgb2ZzID0gMCkge1xyXG4gICAgICAgIG91dFtvZnMgKyAwXSA9IHYueDtcclxuICAgICAgICBvdXRbb2ZzICsgMV0gPSB2Lnk7XHJcbiAgICAgICAgb3V0W29mcyArIDJdID0gdi56O1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENvbnZlcnRzIHRoZSBnaXZlbiBhcnJheSB0byBhIHZlY3RvclxyXG4gICAgICogQHpoIOaVsOe7hOi9rOWQkemHj1xyXG4gICAgICogQHBhcmFtIG9mcyBBcnJheSBTdGFydCBPZmZzZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhcnIsIG9mcyA9IDApIHtcclxuICAgICAgICBvdXQueCA9IGFycltvZnMgKyAwXTtcclxuICAgICAgICBvdXQueSA9IGFycltvZnMgKyAxXTtcclxuICAgICAgICBvdXQueiA9IGFycltvZnMgKyAyXTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENoZWNrIHRoZSBlcXVhbGl0eSBvZiB0aGUgdHdvIGdpdmVuIHZlY3RvcnNcclxuICAgICAqIEB6aCDlkJHph4/nrYnku7fliKTmlq1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzdHJpY3RFcXVhbHMgKGE6IElWZWMzTGlrZSwgYjogSVZlYzNMaWtlKSB7XHJcbiAgICAgICAgcmV0dXJuIGEueCA9PT0gYi54ICYmIGEueSA9PT0gYi55ICYmIGEueiA9PT0gYi56O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENoZWNrIHdoZXRoZXIgdGhlIHR3byBnaXZlbiB2ZWN0b3JzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWl2YWxlbnRcclxuICAgICAqIEB6aCDmjpLpmaTmta7ngrnmlbDor6/lt67nmoTlkJHph4/ov5HkvLznrYnku7fliKTmlq1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBlcXVhbHMgKGE6IElWZWMzTGlrZSwgYjogSVZlYzNMaWtlLCBlcHNpbG9uID0gRVBTSUxPTikge1xyXG4gICAgICAgIGNvbnN0IHsgeDogYTAsIHk6IGExLCB6OiBhMiB9ID0gYTtcclxuICAgICAgICBjb25zdCB7IHg6IGIwLCB5OiBiMSwgejogYjIgfSA9IGI7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgTWF0aC5hYnMoYTAgLSBiMClcclxuICAgICAgICAgICAgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGExIC0gYjEpXHJcbiAgICAgICAgICAgIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhMiAtIGIyKVxyXG4gICAgICAgICAgICA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHJhZGlhbiBhbmdsZSBiZXR3ZWVuIHR3byB2ZWN0b3JzXHJcbiAgICAgKiBAemgg5rGC5Lik5ZCR6YeP5aS56KeS5byn5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYW5nbGUgKGE6IElWZWMzTGlrZSwgYjogSVZlYzNMaWtlKSB7XHJcbiAgICAgICAgVmVjMy5ub3JtYWxpemUodjNfMSwgYSk7XHJcbiAgICAgICAgVmVjMy5ub3JtYWxpemUodjNfMiwgYik7XHJcbiAgICAgICAgY29uc3QgY29zaW5lID0gVmVjMy5kb3QodjNfMSwgdjNfMik7XHJcbiAgICAgICAgaWYgKGNvc2luZSA+IDEuMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvc2luZSA8IC0xLjApIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguUEk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBNYXRoLmFjb3MoY29zaW5lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBwcm9qZWN0aW9uIHZlY3RvciBvbiB0aGUgc3BlY2lmaWVkIHBsYW5lXHJcbiAgICAgKiBAemgg6K6h566X5ZCR6YeP5Zyo5oyH5a6a5bmz6Z2i5LiK55qE5oqV5b2xXHJcbiAgICAgKiBAcGFyYW0gYSBwcm9qZWN0aW9uIHZlY3RvclxyXG4gICAgICogQHBhcmFtIG4gdGhlIG5vcm1hbCBsaW5lIG9mIHNwZWNpZmllZCBwbGFuZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHByb2plY3RPblBsYW5lPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBJVmVjM0xpa2UsIG46IElWZWMzTGlrZSkge1xyXG4gICAgICAgIHJldHVybiBWZWMzLnN1YnRyYWN0KG91dCwgYSwgVmVjMy5wcm9qZWN0KG91dCwgYSwgbikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHByb2plY3Rpb24gb24gdGhlIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqIEB6aCDorqHnrpflkJHph4/lnKjmjIflrprlkJHph4/kuIrnmoTmipXlvbFcclxuICAgICAqIEBwYXJhbSBhIHByb2plY3Rpb24gdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0gbiB0YXJnZXQgdmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcHJvamVjdDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogSVZlYzNMaWtlLCBiOiBJVmVjM0xpa2UpIHtcclxuICAgICAgICBjb25zdCBzcXJMZW4gPSBWZWMzLmxlbmd0aFNxcihiKTtcclxuICAgICAgICBpZiAoc3FyTGVuIDwgMC4wMDAwMDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFZlYzMuc2V0KG91dCwgMCwgMCwgMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFZlYzMubXVsdGlwbHlTY2FsYXIob3V0LCBiLCBWZWMzLmRvdChhLCBiKSAvIHNxckxlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIHggY29tcG9uZW50LlxyXG4gICAgICogQHpoIHgg5YiG6YeP44CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWNsYXJlIHg6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiB5IGNvbXBvbmVudC5cclxuICAgICAqIEB6aCB5IOWIhumHj+OAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjbGFyZSB5OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4geiBjb21wb25lbnQuXHJcbiAgICAgKiBAemggeiDliIbph4/jgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlY2xhcmUgejogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICh2OiBWZWMzKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoeD86IG51bWJlciwgeT86IG51bWJlciwgej86IG51bWJlcik7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKHg/OiBudW1iZXIgfCBWZWMzLCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XHJcbiAgICAgICAgLy9zdXBlcigpO1xyXG4gICAgICAgIGlmICh4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnggPSB4Lng7XHJcbiAgICAgICAgICAgIHRoaXMueSA9IHgueTtcclxuICAgICAgICAgICAgdGhpcy56ID0geC56O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgICAgICAgICAgdGhpcy55ID0geSB8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLnogPSB6IHx8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIGNsb25lIGEgVmVjMyB2YWx1ZVxyXG4gICAgICogQHpoIOWFi+mahuW9k+WJjeWQkemHj+OAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvbmUgKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMyh0aGlzLngsIHRoaXMueSwgdGhpcy56KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXQgdGhlIGN1cnJlbnQgdmVjdG9yIHZhbHVlIHdpdGggdGhlIGdpdmVuIHZlY3Rvci5cclxuICAgICAqIEB6aCDorr7nva7lvZPliY3lkJHph4/kvb/lhbbkuI7mjIflrprlkJHph4/nm7jnrYnjgIJcclxuICAgICAqIEBwYXJhbSBvdGhlciBTcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCAob3RoZXI6IFZlYzMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFNldCB0aGUgdmFsdWUgb2YgZWFjaCBjb21wb25lbnQgb2YgdGhlIGN1cnJlbnQgdmVjdG9yLlxyXG4gICAgICogQHpoIOiuvue9ruW9k+WJjeWQkemHj+eahOWFt+S9k+WIhumHj+WAvOOAglxyXG4gICAgICogQHBhcmFtIHggeCB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHkgeSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHogeiB2YWx1ZVxyXG4gICAgICogQHJldHVybnMgYHRoaXNgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgKHg/OiBudW1iZXIsIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpO1xyXG5cclxuICAgIHB1YmxpYyBzZXQgKHg/OiBudW1iZXIgfCBWZWMzLCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHgueDtcclxuICAgICAgICAgICAgdGhpcy55ID0geC55O1xyXG4gICAgICAgICAgICB0aGlzLnogPSB4Lno7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbiAgICAgICAgICAgIHRoaXMueiA9IHogfHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2hlY2sgd2hldGhlciB0aGUgdmVjdG9yIGFwcHJveGltYXRlbHkgZXF1YWxzIGFub3RoZXIgb25lLlxyXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeWQkemHj+aYr+WQpuWcqOivr+W3ruiMg+WbtOWGheS4juaMh+WumuWQkemHj+ebuOetieOAglxyXG4gICAgICogQHBhcmFtIG90aGVyIFNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSBlcHNpbG9uIFRoZSBlcnJvciBhbGxvd2VkLiBJdGBzIHNob3VsZCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuXHJcbiAgICAgKiBAcmV0dXJucyBSZXR1cm5zIGB0cnVlYCB3aGVuIHRoZSBjb21wb25lbnRzIG9mIGJvdGggdmVjdG9ycyBhcmUgZXF1YWwgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2Ugb2YgZXJyb3I7IG90aGVyd2lzZSBpdCByZXR1cm5zIGBmYWxzZWAuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlcXVhbHMgKG90aGVyOiBWZWMzLCBlcHNpbG9uID0gRVBTSUxPTikge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMueCAtIG90aGVyLngpXHJcbiAgICAgICAgICAgIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueCksIE1hdGguYWJzKG90aGVyLngpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnkgLSBvdGhlci55KVxyXG4gICAgICAgICAgICA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLnkpLCBNYXRoLmFicyhvdGhlci55KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy56IC0gb3RoZXIueilcclxuICAgICAgICAgICAgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy56KSwgTWF0aC5hYnMob3RoZXIueikpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHRoZSB2ZWN0b3IgYXBwcm94aW1hdGVseSBlcXVhbHMgYW5vdGhlciBvbmUuXHJcbiAgICAgKiBAemgg5Yik5pat5b2T5YmN5ZCR6YeP5piv5ZCm5Zyo6K+v5beu6IyD5Zu05YaF5LiO5oyH5a6a5YiG6YeP55qE5ZCR6YeP55u4562J44CCXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0geiBUaGUgeiB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0gZXBzaWxvbiBUaGUgZXJyb3IgYWxsb3dlZC4gSXRgcyBzaG91bGQgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLlxyXG4gICAgICogQHJldHVybnMgUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgY29tcG9uZW50cyBvZiBib3RoIHZlY3RvcnMgYXJlIGVxdWFsIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mIGVycm9yOyBvdGhlcndpc2UgaXQgcmV0dXJucyBgZmFsc2VgLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXF1YWxzM2YgKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIGVwc2lsb24gPSBFUFNJTE9OKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy54IC0geClcclxuICAgICAgICAgICAgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy54KSwgTWF0aC5hYnMoeCkpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueSAtIHkpXHJcbiAgICAgICAgICAgIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueSksIE1hdGguYWJzKHkpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnogLSB6KVxyXG4gICAgICAgICAgICA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLnopLCBNYXRoLmFicyh6KSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENoZWNrIHdoZXRoZXIgdGhlIGN1cnJlbnQgdmVjdG9yIHN0cmljdGx5IGVxdWFscyBhbm90aGVyIFZlYzMuXHJcbiAgICAgKiBAemgg5Yik5pat5b2T5YmN5ZCR6YeP5piv5ZCm5LiO5oyH5a6a5ZCR6YeP55u4562J44CCXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHJldHVybnMgUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgY29tcG9uZW50cyBvZiBib3RoIHZlY3RvcnMgYXJlIGVxdWFsIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mIGVycm9yOyBvdGhlcndpc2UgaXQgcmV0dXJucyBgZmFsc2VgLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RyaWN0RXF1YWxzIChvdGhlcjogVmVjMykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggPT09IG90aGVyLnggJiYgdGhpcy55ID09PSBvdGhlci55ICYmIHRoaXMueiA9PT0gb3RoZXIuejtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHRoZSBjdXJyZW50IHZlY3RvciBzdHJpY3RseSBlcXVhbHMgYW5vdGhlciBWZWMzLlxyXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeWQkemHj+aYr+WQpuS4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOetieOAglxyXG4gICAgICogQHBhcmFtIHggVGhlIHggdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHBhcmFtIHogVGhlIHogdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHJldHVybnMgUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgY29tcG9uZW50cyBvZiBib3RoIHZlY3RvcnMgYXJlIGVxdWFsIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mIGVycm9yOyBvdGhlcndpc2UgaXQgcmV0dXJucyBgZmFsc2VgLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RyaWN0RXF1YWxzM2YgKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ID09PSB4ICYmIHRoaXMueSA9PT0geSAmJiB0aGlzLnogPT09IHo7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVHJhbnNmb3JtIHRvIHN0cmluZyB3aXRoIHZlY3RvciBpbmZvcm1hdGlvbi5cclxuICAgICAqIEB6aCDov5Tlm57lvZPliY3lkJHph4/nmoTlrZfnrKbkuLLooajnpLrjgIJcclxuICAgICAqIEByZXR1cm5zIFRoZSBzdHJpbmcgd2l0aCB2ZWN0b3IgaW5mb3JtYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHRvU3RyaW5nICgpIHtcclxuICAgICAgICByZXR1cm4gYCgke3RoaXMueC50b0ZpeGVkKDIpfSwgJHt0aGlzLnkudG9GaXhlZCgyKX0sICR7dGhpcy56LnRvRml4ZWQoMil9KWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlIGxpbmVhciBpbnRlcnBvbGF0aW9uIHJlc3VsdCBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyIG9uZSB3aXRoIGdpdmVuIHJhdGlvLlxyXG4gICAgICogQHpoIOagueaNruaMh+WumueahOaPkuWAvOavlOeOh++8jOS7juW9k+WJjeWQkemHj+WIsOebruagh+WQkemHj+S5i+mXtOWBmuaPkuWAvOOAglxyXG4gICAgICogQHBhcmFtIHRvIFRhcmdldCB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSByYXRpbyBUaGUgaW50ZXJwb2xhdGlvbiBjb2VmZmljaWVudC5UaGUgcmFuZ2UgaXMgWzAsMV0uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsZXJwICh0bzogVmVjMywgcmF0aW86IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCArPSByYXRpbyAqICh0by54IC0gdGhpcy54KTtcclxuICAgICAgICB0aGlzLnkgKz0gcmF0aW8gKiAodG8ueSAtIHRoaXMueSk7XHJcbiAgICAgICAgdGhpcy56ICs9IHJhdGlvICogKHRvLnogLSB0aGlzLnopO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEFkZHMgdGhlIGN1cnJlbnQgdmVjdG9yIHdpdGggYW5vdGhlciBvbmUgYW5kIHJldHVybiB0aGlzXHJcbiAgICAgKiBAemgg5ZCR6YeP5Yqg5rOV44CC5bCG5b2T5YmN5ZCR6YeP5LiO5oyH5a6a5ZCR6YeP55qE55u45YqgXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkIChvdGhlcjogVmVjMykge1xyXG4gICAgICAgIHRoaXMueCArPSBvdGhlci54O1xyXG4gICAgICAgIHRoaXMueSArPSBvdGhlci55O1xyXG4gICAgICAgIHRoaXMueiArPSBvdGhlci56O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEFkZHMgdGhlIGN1cnJlbnQgdmVjdG9yIHdpdGggYW5vdGhlciBvbmUgYW5kIHJldHVybiB0aGlzXHJcbiAgICAgKiBAemgg5ZCR6YeP5Yqg5rOV44CC5bCG5b2T5YmN5ZCR6YeP5LiO5oyH5a6a5YiG6YeP55qE5ZCR6YeP55u45YqgXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0geiBUaGUgeiB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGQzZiAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCArPSB4O1xyXG4gICAgICAgIHRoaXMueSArPSB5O1xyXG4gICAgICAgIHRoaXMueiArPSB6O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFN1YnRyYWN0cyBvbmUgdmVjdG9yIGZyb20gdGhpcywgYW5kIHJldHVybnMgdGhpcy5cclxuICAgICAqIEB6aCDlkJHph4/lh4/ms5XjgILlsIblvZPliY3lkJHph4/lh4/ljrvmjIflrprlkJHph4/nmoTnu5PmnpzjgIJcclxuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdWJ0cmFjdCAob3RoZXI6IFZlYzMpIHtcclxuICAgICAgICB0aGlzLnggLT0gb3RoZXIueDtcclxuICAgICAgICB0aGlzLnkgLT0gb3RoZXIueTtcclxuICAgICAgICB0aGlzLnogLT0gb3RoZXIuejtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTdWJ0cmFjdHMgb25lIHZlY3RvciBmcm9tIHRoaXMsIGFuZCByZXR1cm5zIHRoaXMuXHJcbiAgICAgKiBAemgg5ZCR6YeP5YeP5rOV44CC5bCG5b2T5YmN5ZCR6YeP5YeP5Y675oyH5a6a5YiG6YeP55qE5ZCR6YePXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0geiBUaGUgeiB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdWJ0cmFjdDNmICh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54IC09IHg7XHJcbiAgICAgICAgdGhpcy55IC09IHk7XHJcbiAgICAgICAgdGhpcy56IC09IHo7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gTXVsdGlwbGllcyB0aGUgY3VycmVudCB2ZWN0b3Igd2l0aCBhIG51bWJlciwgYW5kIHJldHVybnMgdGhpcy5cclxuICAgICAqIEB6aCDlkJHph4/mlbDkuZjjgILlsIblvZPliY3lkJHph4/mlbDkuZjmjIflrprmoIfph49cclxuICAgICAqIEBwYXJhbSBzY2FsYXIgc2NhbGFyIG51bWJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbXVsdGlwbHlTY2FsYXIgKHNjYWxhcjogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzY2FsYXIgPT09ICdvYmplY3QnKSB7IGNvbnNvbGUud2Fybignc2hvdWxkIHVzZSBWZWMzLm11bHRpcGx5IGZvciB2ZWN0b3IgKiB2ZWN0b3Igb3BlcmF0aW9uJyk7IH1cclxuICAgICAgICB0aGlzLnggKj0gc2NhbGFyO1xyXG4gICAgICAgIHRoaXMueSAqPSBzY2FsYXI7XHJcbiAgICAgICAgdGhpcy56ICo9IHNjYWxhcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBNdWx0aXBsaWVzIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGFub3RoZXIgb25lIGFuZCByZXR1cm4gdGhpc1xyXG4gICAgICogQHpoIOWQkemHj+S5mOazleOAguWwhuW9k+WJjeWQkemHj+S5mOS7peS4juaMh+WumuWQkemHj+eahOe7k+aenOi1i+WAvOe7meW9k+WJjeWQkemHj+OAglxyXG4gICAgICogQHBhcmFtIG90aGVyIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIG11bHRpcGx5IChvdGhlcjogVmVjMykge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3RoZXIgIT09ICdvYmplY3QnKSB7IGNvbnNvbGUud2Fybignc2hvdWxkIHVzZSBWZWMzLnNjYWxlIGZvciB2ZWN0b3IgKiBzY2FsYXIgb3BlcmF0aW9uJyk7IH1cclxuICAgICAgICB0aGlzLnggKj0gb3RoZXIueDtcclxuICAgICAgICB0aGlzLnkgKj0gb3RoZXIueTtcclxuICAgICAgICB0aGlzLnogKj0gb3RoZXIuejtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBNdWx0aXBsaWVzIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGFub3RoZXIgb25lIGFuZCByZXR1cm4gdGhpc1xyXG4gICAgICogQHpoIOWQkemHj+S5mOazleOAguWwhuW9k+WJjeWQkemHj+S4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOS5mOeahOe7k+aenOi1i+WAvOe7meW9k+WJjeWQkemHj+OAglxyXG4gICAgICogQHBhcmFtIHggVGhlIHggdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHBhcmFtIHogVGhlIHogdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbXVsdGlwbHkzZiAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCAqPSB4O1xyXG4gICAgICAgIHRoaXMueSAqPSB5O1xyXG4gICAgICAgIHRoaXMueiAqPSB6O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEVsZW1lbnQtd2lzZWx5IGRpdmlkZXMgdGhpcyB2ZWN0b3Igd2l0aCBhbm90aGVyIG9uZSwgYW5kIHJldHVybiB0aGlzLlxyXG4gICAgICogQHpoIOWQkemHj+mAkOWFg+e0oOebuOmZpOOAguWwhuW9k+WJjeWQkemHj+S4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOmZpOeahOe7k+aenOi1i+WAvOe7meW9k+WJjeWQkemHj+OAglxyXG4gICAgICogQHBhcmFtIG90aGVyIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpdmlkZSAob3RoZXI6IFZlYzMpIHtcclxuICAgICAgICB0aGlzLnggLz0gb3RoZXIueDtcclxuICAgICAgICB0aGlzLnkgLz0gb3RoZXIueTtcclxuICAgICAgICB0aGlzLnogLz0gb3RoZXIuejtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBFbGVtZW50LXdpc2VseSBkaXZpZGVzIHRoaXMgdmVjdG9yIHdpdGggYW5vdGhlciBvbmUsIGFuZCByZXR1cm4gdGhpcy5cclxuICAgICAqIEB6aCDlkJHph4/pgJDlhYPntKDnm7jpmaTjgILlsIblvZPliY3lkJHph4/kuI7mjIflrprliIbph4/nmoTlkJHph4/nm7jpmaTnmoTnu5PmnpzotYvlgLznu5nlvZPliY3lkJHph4/jgIJcclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSB6IFRoZSB6IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpdmlkZTNmICh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54IC89IHg7XHJcbiAgICAgICAgdGhpcy55IC89IHk7XHJcbiAgICAgICAgdGhpcy56IC89IHo7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0cyBlYWNoIGNvbXBvbmVudCBvZiB0aGlzIHZlY3RvciB3aXRoIGl0cyBuZWdhdGl2ZSB2YWx1ZVxyXG4gICAgICogQHpoIOWwhuW9k+WJjeWQkemHj+eahOWQhOS4quWIhumHj+WPluWPjVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmVnYXRpdmUgKCkge1xyXG4gICAgICAgIHRoaXMueCA9IC10aGlzLng7XHJcbiAgICAgICAgdGhpcy55ID0gLXRoaXMueTtcclxuICAgICAgICB0aGlzLnogPSAtdGhpcy56O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENsYW1wIHRoZSB2ZWN0b3IgYmV0d2VlbiBtaW5JbmNsdXNpdmUgYW5kIG1heEluY2x1c2l2ZS5cclxuICAgICAqIEB6aCDorr7nva7lvZPliY3lkJHph4/nmoTlgLzvvIzkvb/lhbblkITkuKrliIbph4/pg73lpITkuo7mjIflrprnmoTojIPlm7TlhoXjgIJcclxuICAgICAqIEBwYXJhbSBtaW5JbmNsdXNpdmUgTWluaW11bSB2YWx1ZSBhbGxvd2VkXHJcbiAgICAgKiBAcGFyYW0gbWF4SW5jbHVzaXZlIE1heGltdW0gdmFsdWUgYWxsb3dlZFxyXG4gICAgICogQHJldHVybnMgYHRoaXNgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGFtcGYgKG1pbkluY2x1c2l2ZTogVmVjMywgbWF4SW5jbHVzaXZlOiBWZWMzKSB7XHJcbiAgICAgICAgdGhpcy54ID0gY2xhbXAodGhpcy54LCBtaW5JbmNsdXNpdmUueCwgbWF4SW5jbHVzaXZlLngpO1xyXG4gICAgICAgIHRoaXMueSA9IGNsYW1wKHRoaXMueSwgbWluSW5jbHVzaXZlLnksIG1heEluY2x1c2l2ZS55KTtcclxuICAgICAgICB0aGlzLnogPSBjbGFtcCh0aGlzLnosIG1pbkluY2x1c2l2ZS56LCBtYXhJbmNsdXNpdmUueik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgd2l0aCBhbm90aGVyIHZlY3RvclxyXG4gICAgICogQHpoIOWQkemHj+eCueS5mOOAglxyXG4gICAgICogQHBhcmFtIG90aGVyIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgY2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgd2l0aCBhbm90aGVyIHZlY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG90IChvdGhlcjogVmVjMykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiBvdGhlci54ICsgdGhpcy55ICogb3RoZXIueSArIHRoaXMueiAqIG90aGVyLno7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCB3aXRoIGFub3RoZXIgdmVjdG9yLlxyXG4gICAgICogQHpoIOWQkemHj+WPieS5mOOAguWwhuW9k+WJjeWQkemHj+W3puWPieS5mOaMh+WumuWQkemHj1xyXG4gICAgICogQHBhcmFtIG90aGVyIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyb3NzIChvdGhlcjogVmVjMykge1xyXG4gICAgICAgIGNvbnN0IHsgeDogYXgsIHk6IGF5LCB6OiBheiB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB7IHg6IGJ4LCB5OiBieSwgejogYnogfSA9IG90aGVyO1xyXG5cclxuICAgICAgICB0aGlzLnggPSBheSAqIGJ6IC0gYXogKiBieTtcclxuICAgICAgICB0aGlzLnkgPSBheiAqIGJ4IC0gYXggKiBiejtcclxuICAgICAgICB0aGlzLnogPSBheCAqIGJ5IC0gYXkgKiBieDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXHJcbiAgICAgKiBAemgg6K6h566X5ZCR6YeP55qE6ZW/5bqm77yI5qih77yJ44CCXHJcbiAgICAgKiBAcmV0dXJucyBMZW5ndGggb2YgdmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsZW5ndGggKCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBSZXR1cm5zIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cclxuICAgICAqIEB6aCDorqHnrpflkJHph4/plb/luqbvvIjmqKHvvInnmoTlubPmlrnjgIJcclxuICAgICAqIEByZXR1cm5zIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIHZlY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbGVuZ3RoU3FyICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIE5vcm1hbGl6ZSB0aGUgY3VycmVudCB2ZWN0b3IuXHJcbiAgICAgKiBAemgg5bCG5b2T5YmN5ZCR6YeP5b2S5LiA5YyWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBub3JtYWxpemUgKCkge1xyXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICAgICAgY29uc3QgeSA9IHRoaXMueTtcclxuICAgICAgICBjb25zdCB6ID0gdGhpcy56O1xyXG5cclxuICAgICAgICBsZXQgbGVuID0geCAqIHggKyB5ICogeSArIHogKiB6O1xyXG4gICAgICAgIGlmIChsZW4gPiAwKSB7XHJcbiAgICAgICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcclxuICAgICAgICAgICAgdGhpcy54ID0geCAqIGxlbjtcclxuICAgICAgICAgICAgdGhpcy55ID0geSAqIGxlbjtcclxuICAgICAgICAgICAgdGhpcy56ID0geiAqIGxlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgbWF0NC4gNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcclxuICAgICAqIEB6aCDlsIblvZPliY3lkJHph4/op4bkuLogdyDliIbph4/kuLogMSDnmoTlm5vnu7TlkJHph4/vvIzlupTnlKjlm5vnu7Tnn6npmLXlj5jmjaLliLDlvZPliY3nn6npmLVcclxuICAgICAqIEBwYXJhbSBtYXRyaXggbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0cmFuc2Zvcm1NYXQ0IChtYXRyaXg6IE1hdDQpIHtcclxuICAgICAgICBjb25zdCB4ID0gdGhpcy54O1xyXG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XHJcbiAgICAgICAgY29uc3QgeiA9IHRoaXMuejtcclxuICAgICAgICBsZXQgcmh3ID0gbWF0cml4Lm0wMyAqIHggKyBtYXRyaXgubTA3ICogeSArIG1hdHJpeC5tMTEgKiB6ICsgbWF0cml4Lm0xNTtcclxuICAgICAgICByaHcgPSByaHcgPyAxIC8gcmh3IDogMTtcclxuICAgICAgICB0aGlzLnggPSAobWF0cml4Lm0wMCAqIHggKyBtYXRyaXgubTA0ICogeSArIG1hdHJpeC5tMDggKiB6ICsgbWF0cml4Lm0xMikgKiByaHc7XHJcbiAgICAgICAgdGhpcy55ID0gKG1hdHJpeC5tMDEgKiB4ICsgbWF0cml4Lm0wNSAqIHkgKyBtYXRyaXgubTA5ICogeiArIG1hdHJpeC5tMTMpICogcmh3O1xyXG4gICAgICAgIHRoaXMueiA9IChtYXRyaXgubTAyICogeCArIG1hdHJpeC5tMDYgKiB5ICsgbWF0cml4Lm0xMCAqIHogKyBtYXRyaXgubTE0KSAqIHJodztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5jb25zdCB2M18xID0gbmV3IFZlYzMoKTtcclxuY29uc3QgdjNfMiA9IG5ldyBWZWMzKCk7Il19