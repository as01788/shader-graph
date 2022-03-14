"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quat = void 0;
const Mat3_1 = require("./Mat3");
const utils_1 = require("./utils");
const Vec3_1 = require("./Vec3");
/**
 * @en quaternion
 * @zh 四元数
 */
class Quat {
    constructor(x, y, z, w) {
        ;
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
            this.w = w !== null && w !== void 0 ? w : 1;
        }
    }
    /**
     * @en Obtain a copy of the given quaternion
     * @zh 获得指定四元数的拷贝
     */
    static clone(a) {
        return new Quat(a.x, a.y, a.z, a.w);
    }
    /**
     * @en Copy the given quaternion to the out quaternion
     * @zh 复制目标四元数
     */
    static copy(out, a) {
        out.x = a.x;
        out.y = a.y;
        out.z = a.z;
        out.w = a.w;
        return out;
    }
    /**
     * @en Sets the out quaternion with values of each component
     * @zh 设置四元数值
     */
    static set(out, x, y, z, w) {
        out.x = x;
        out.y = y;
        out.z = z;
        out.w = w;
        return out;
    }
    /**
     * @en Sets the out quaternion to an identity quaternion
     * @zh 将目标赋值为单位四元数
     */
    static identity(out) {
        out.x = 0;
        out.y = 0;
        out.z = 0;
        out.w = 1;
        return out;
    }
    /**
     * @en Sets the out quaternion with the shortest path orientation between two vectors, considering both vectors normalized
     * @zh 设置四元数为两向量间的最短路径旋转，默认两向量都已归一化
     */
    static rotationTo(out, a, b) {
        const dot = Vec3_1.Vec3.dot(a, b);
        if (dot < -0.999999) {
            Vec3_1.Vec3.cross(v3_1, Vec3_1.Vec3.UNIT_X, a);
            if (v3_1.length() < 0.000001) {
                Vec3_1.Vec3.cross(v3_1, Vec3_1.Vec3.UNIT_Y, a);
            }
            Vec3_1.Vec3.normalize(v3_1, v3_1);
            Quat.fromAxisAngle(out, v3_1, Math.PI);
            return out;
        }
        else if (dot > 0.999999) {
            out.x = 0;
            out.y = 0;
            out.z = 0;
            out.w = 1;
            return out;
        }
        else {
            Vec3_1.Vec3.cross(v3_1, a, b);
            out.x = v3_1.x;
            out.y = v3_1.y;
            out.z = v3_1.z;
            out.w = 1 + dot;
            return Quat.normalize(out, out);
        }
    }
    /**
     * @en Gets the rotation axis and the arc of rotation from the quaternion
     * @zh 获取四元数的旋转轴和旋转弧度
     * @param outAxis output axis
     * @param q input quaternion
     * @return radius of rotation
     */
    static getAxisAngle(outAxis, q) {
        const rad = Math.acos(q.w) * 2.0;
        const s = Math.sin(rad / 2.0);
        if (s !== 0.0) {
            outAxis.x = q.x / s;
            outAxis.y = q.y / s;
            outAxis.z = q.z / s;
        }
        else {
            // If s is zero, return any axis (no rotation - axis does not matter)
            outAxis.x = 1;
            outAxis.y = 0;
            outAxis.z = 0;
        }
        return rad;
    }
    /**
     * @en Quaternion multiplication and save the results to out quaternion
     * @zh 四元数乘法
     */
    static multiply(out, a, b) {
        const x = a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y;
        const y = a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z;
        const z = a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x;
        const w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;
        out.x = x;
        out.y = y;
        out.z = z;
        out.w = w;
        return out;
    }
    /**
     * @en Quaternion scalar multiplication and save the results to out quaternion
     * @zh 四元数标量乘法
     */
    static multiplyScalar(out, a, b) {
        out.x = a.x * b;
        out.y = a.y * b;
        out.z = a.z * b;
        out.w = a.w * b;
        return out;
    }
    /**
     * @en Quaternion multiplication and addition: A + B * scale
     * @zh 四元数乘加：A + B * scale
     */
    static scaleAndAdd(out, a, b, scale) {
        out.x = a.x + b.x * scale;
        out.y = a.y + b.y * scale;
        out.z = a.z + b.z * scale;
        out.w = a.w + b.w * scale;
        return out;
    }
    /**
     * @en Sets the out quaternion to represent a radian rotation around x axis
     * @zh 绕 X 轴旋转指定四元数
     * @param rad radius of rotation
     */
    static rotateX(out, a, rad) {
        rad *= 0.5;
        const bx = Math.sin(rad);
        const bw = Math.cos(rad);
        const { x, y, z, w } = a;
        out.x = x * bw + w * bx;
        out.y = y * bw + z * bx;
        out.z = z * bw - y * bx;
        out.w = w * bw - x * bx;
        return out;
    }
    /**
     * @en Sets the out quaternion to represent a radian rotation around y axis
     * @zh 绕 Y 轴旋转指定四元数
     * @param rad radius of rotation
     */
    static rotateY(out, a, rad) {
        rad *= 0.5;
        const by = Math.sin(rad);
        const bw = Math.cos(rad);
        const { x, y, z, w } = a;
        out.x = x * bw - z * by;
        out.y = y * bw + w * by;
        out.z = z * bw + x * by;
        out.w = w * bw - y * by;
        return out;
    }
    /**
     * @en Sets the out quaternion to represent a radian rotation around z axis
     * @zh 绕 Z 轴旋转指定四元数
     * @param rad radius of rotation
     */
    static rotateZ(out, a, rad) {
        rad *= 0.5;
        const bz = Math.sin(rad);
        const bw = Math.cos(rad);
        const { x, y, z, w } = a;
        out.x = x * bw + y * bz;
        out.y = y * bw - x * bz;
        out.z = z * bw + w * bz;
        out.w = w * bw - z * bz;
        return out;
    }
    /**
     * @en Sets the out quaternion to represent a radian rotation around a given rotation axis in world space
     * @zh 绕世界空间下指定轴旋转四元数
     * @param axis axis of rotation, normalized by default
     * @param rad radius of rotation
     */
    static rotateAround(out, rot, axis, rad) {
        // get inv-axis (local to rot)
        Quat.invert(qt_1, rot);
        Vec3_1.Vec3.transformQuat(v3_1, axis, qt_1);
        // rotate by inv-axis
        Quat.fromAxisAngle(qt_1, v3_1, rad);
        Quat.multiply(out, rot, qt_1);
        return out;
    }
    /**
     * @en Sets the out quaternion to represent a radian rotation around a given rotation axis in local space
     * @zh 绕本地空间下指定轴旋转四元数
     * @param axis axis of rotation
     * @param rad radius of rotation
     */
    static rotateAroundLocal(out, rot, axis, rad) {
        Quat.fromAxisAngle(qt_1, axis, rad);
        Quat.multiply(out, rot, qt_1);
        return out;
    }
    /**
     * @en Calculates the w component with xyz components, considering the given quaternion normalized
     * @zh 根据 xyz 分量计算 w 分量，默认已归一化
     */
    static calculateW(out, a) {
        out.x = a.x;
        out.y = a.y;
        out.z = a.z;
        out.w = Math.sqrt(Math.abs(1.0 - a.x * a.x - a.y * a.y - a.z * a.z));
        return out;
    }
    /**
     * @en Quaternion dot product (scalar product)
     * @zh 四元数点积（数量积）
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }
    /**
     * @en Element by element linear interpolation: A + t * (B - A)
     * @zh 逐元素线性插值： A + t * (B - A)
     */
    static lerp(out, a, b, t) {
        out.x = a.x + t * (b.x - a.x);
        out.y = a.y + t * (b.y - a.y);
        out.z = a.z + t * (b.z - a.z);
        out.w = a.w + t * (b.w - a.w);
        return out;
    }
    /**
     * @en Spherical quaternion interpolation
     * @zh 四元数球面插值
     */
    static slerp(out, a, b, t) {
        // benchmarks:
        //    http://jsperf.com/quaternion-slerp-implementations
        let scale0 = 0;
        let scale1 = 0;
        let bx = b.x;
        let by = b.y;
        let bz = b.z;
        let bw = b.w;
        // calc cosine
        let cosom = a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
        // adjust signs (if necessary)
        if (cosom < 0.0) {
            cosom = -cosom;
            bx = -bx;
            by = -by;
            bz = -bz;
            bw = -bw;
        }
        // calculate coefficients
        if ((1.0 - cosom) > 0.000001) {
            // standard case (slerp)
            const omega = Math.acos(cosom);
            const sinom = Math.sin(omega);
            scale0 = Math.sin((1.0 - t) * omega) / sinom;
            scale1 = Math.sin(t * omega) / sinom;
        }
        else {
            // "from" and "to" quaternions are very close
            //  ... so we can do a linear interpolation
            scale0 = 1.0 - t;
            scale1 = t;
        }
        // calculate final values
        out.x = scale0 * a.x + scale1 * bx;
        out.y = scale0 * a.y + scale1 * by;
        out.z = scale0 * a.z + scale1 * bz;
        out.w = scale0 * a.w + scale1 * bw;
        return out;
    }
    /**
     * @en Spherical quaternion interpolation with two control points
     * @zh 带两个控制点的四元数球面插值
     */
    static sqlerp(out, a, b, c, d, t) {
        Quat.slerp(qt_1, a, d, t);
        Quat.slerp(qt_2, b, c, t);
        Quat.slerp(out, qt_1, qt_2, 2 * t * (1 - t));
        return out;
    }
    /**
     * @en Sets the inverse of the given quaternion to out quaternion
     * @zh 四元数求逆
     */
    static invert(out, a) {
        const dot = a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
        const invDot = dot ? 1.0 / dot : 0;
        // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0
        out.x = -a.x * invDot;
        out.y = -a.y * invDot;
        out.z = -a.z * invDot;
        out.w = a.w * invDot;
        return out;
    }
    /**
     * @en Conjugating a quaternion, it's equivalent to the inverse of the unit quaternion, but more efficient
     * @zh 求共轭四元数，对单位四元数与求逆等价，但更高效
     */
    static conjugate(out, a) {
        out.x = -a.x;
        out.y = -a.y;
        out.z = -a.z;
        out.w = a.w;
        return out;
    }
    /**
     * @en Calculates the length of the quaternion
     * @zh 求四元数长度
     */
    static len(a) {
        return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w);
    }
    /**
     * @en Calculates the squared length of the quaternion
     * @zh 求四元数长度平方
     */
    static lengthSqr(a) {
        return a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
    }
    /**
     * @en Normalize the given quaternion
     * @zh 归一化四元数
     */
    static normalize(out, a) {
        let len = a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            out.x = a.x * len;
            out.y = a.y * len;
            out.z = a.z * len;
            out.w = a.w * len;
        }
        return out;
    }
    /**
     * @en Calculated the quaternion represents the given coordinates, considering all given vectors are normalized and mutually perpendicular
     * @zh 根据本地坐标轴朝向计算四元数，默认三向量都已归一化且相互垂直
     */
    static fromAxes(out, xAxis, yAxis, zAxis) {
        Mat3_1.Mat3.set(m3_1, xAxis.x, xAxis.y, xAxis.z, yAxis.x, yAxis.y, yAxis.z, zAxis.x, zAxis.y, zAxis.z);
        return Quat.normalize(out, Quat.fromMat3(out, m3_1));
    }
    /**
     * @en Calculates the quaternion with the up direction and the direction of the viewport
     * @zh 根据视口的前方向和上方向计算四元数
     * @param view The view direction, it`s must be normalized.
     * @param up The view up direction, it`s must be normalized, default value is (0, 1, 0).
     */
    static fromViewUp(out, view, up) {
        Mat3_1.Mat3.fromViewUp(m3_1, view, up);
        return Quat.normalize(out, Quat.fromMat3(out, m3_1));
    }
    /**
     * @en Calculates the quaternion from a given rotary shaft and a radian rotation around it.
     * @zh 根据旋转轴和旋转弧度计算四元数
     */
    static fromAxisAngle(out, axis, rad) {
        rad *= 0.5;
        const s = Math.sin(rad);
        out.x = s * axis.x;
        out.y = s * axis.y;
        out.z = s * axis.z;
        out.w = Math.cos(rad);
        return out;
    }
    /**
     * @en Calculates the quaternion with the three-dimensional transform matrix, considering no scale included in the matrix
     * @zh 根据三维矩阵信息计算四元数，默认输入矩阵不含有缩放信息
     */
    static fromMat3(out, m) {
        const { m00, m03: m01, m06: m02, m01: m10, m04: m11, m07: m12, m02: m20, m05: m21, m08: m22, } = m;
        const trace = m00 + m11 + m22;
        if (trace > 0) {
            const s = 0.5 / Math.sqrt(trace + 1.0);
            out.w = 0.25 / s;
            out.x = (m21 - m12) * s;
            out.y = (m02 - m20) * s;
            out.z = (m10 - m01) * s;
        }
        else if ((m00 > m11) && (m00 > m22)) {
            const s = 2.0 * Math.sqrt(1.0 + m00 - m11 - m22);
            out.w = (m21 - m12) / s;
            out.x = 0.25 * s;
            out.y = (m01 + m10) / s;
            out.z = (m02 + m20) / s;
        }
        else if (m11 > m22) {
            const s = 2.0 * Math.sqrt(1.0 + m11 - m00 - m22);
            out.w = (m02 - m20) / s;
            out.x = (m01 + m10) / s;
            out.y = 0.25 * s;
            out.z = (m12 + m21) / s;
        }
        else {
            const s = 2.0 * Math.sqrt(1.0 + m22 - m00 - m11);
            out.w = (m10 - m01) / s;
            out.x = (m02 + m20) / s;
            out.y = (m12 + m21) / s;
            out.z = 0.25 * s;
        }
        return out;
    }
    /**
     * @en Calculates the quaternion with Euler angles, the rotation order is YZX
     * @zh 根据欧拉角信息计算四元数，旋转顺序为 YZX
     */
    static fromEuler(out, x, y, z) {
        x *= halfToRad;
        y *= halfToRad;
        z *= halfToRad;
        const sx = Math.sin(x);
        const cx = Math.cos(x);
        const sy = Math.sin(y);
        const cy = Math.cos(y);
        const sz = Math.sin(z);
        const cz = Math.cos(z);
        out.x = sx * cy * cz + cx * sy * sz;
        out.y = cx * sy * cz + sx * cy * sz;
        out.z = cx * cy * sz - sx * sy * cz;
        out.w = cx * cy * cz - sx * sy * sz;
        return out;
    }
    /**
     * @en Calculates the quaternion with given 2D angle (0, 0, z).
     * @zh 根据 2D 角度（0, 0, z）计算四元数
     *
     * @param out Output quaternion
     * @param z Angle to rotate around Z axis in degrees.
     */
    static fromAngleZ(out, z) {
        z *= halfToRad;
        out.x = out.y = 0;
        out.z = Math.sin(z);
        out.w = Math.cos(z);
        return out;
    }
    /**
     * @en This returns the X-axis vector of the quaternion
     * @zh 返回定义此四元数的坐标系 X 轴向量
     */
    static toAxisX(out, q) {
        const fy = 2.0 * q.y;
        const fz = 2.0 * q.z;
        out.x = 1.0 - fy * q.y - fz * q.z;
        out.y = fy * q.x + fz * q.w;
        out.z = fz * q.x + fy * q.w;
        return out;
    }
    /**
     * @en This returns the Y-axis vector of the quaternion
     * @zh 返回定义此四元数的坐标系 Y 轴向量
     */
    static toAxisY(out, q) {
        const fx = 2.0 * q.x;
        const fy = 2.0 * q.y;
        const fz = 2.0 * q.z;
        out.x = fy * q.x - fz * q.w;
        out.y = 1.0 - fx * q.x - fz * q.z;
        out.z = fz * q.y + fx * q.w;
        return out;
    }
    /**
     * @en This returns the Z-axis vector of the quaternion
     * @zh 返回定义此四元数的坐标系 Z 轴向量
     */
    static toAxisZ(out, q) {
        const fx = 2.0 * q.x;
        const fy = 2.0 * q.y;
        const fz = 2.0 * q.z;
        out.x = fz * q.x - fy * q.w;
        out.y = fz * q.y - fx * q.w;
        out.z = 1.0 - fx * q.x - fy * q.y;
        return out;
    }
    /**
     * @en Converts the quaternion to angles, result angle x, y in the range of [-180, 180], z in the range of [-90, 90] interval, the rotation order is YZX
     * @zh 根据四元数计算欧拉角，返回角度 x, y 在 [-180, 180] 区间内, z 默认在 [-90, 90] 区间内，旋转顺序为 YZX
     * @param outerZ change z value range to [-180, -90] U [90, 180]
     */
    static toEuler(out, q, outerZ) {
        const { x, y, z, w } = q;
        let bank = 0;
        let heading = 0;
        let attitude = 0;
        const test = x * y + z * w;
        if (test > 0.499999) {
            bank = 0; // default to zero
            heading = utils_1.toDegree(2 * Math.atan2(x, w));
            attitude = 90;
        }
        else if (test < -0.499999) {
            bank = 0; // default to zero
            heading = -utils_1.toDegree(2 * Math.atan2(x, w));
            attitude = -90;
        }
        else {
            const sqx = x * x;
            const sqy = y * y;
            const sqz = z * z;
            bank = utils_1.toDegree(Math.atan2(2 * x * w - 2 * y * z, 1 - 2 * sqx - 2 * sqz));
            heading = utils_1.toDegree(Math.atan2(2 * y * w - 2 * x * z, 1 - 2 * sqy - 2 * sqz));
            attitude = utils_1.toDegree(Math.asin(2 * test));
            if (outerZ) {
                bank = -180 * Math.sign(bank + 1e-6) + bank;
                heading = -180 * Math.sign(heading + 1e-6) + heading;
                attitude = 180 * Math.sign(attitude + 1e-6) - attitude;
            }
        }
        out.x = bank;
        out.y = heading;
        out.z = attitude;
        return out;
    }
    /**
     * @en Converts quaternion to an array
     * @zh 四元数转数组
     * @param ofs Array Start Offset
     */
    static toArray(out, q, ofs = 0) {
        out[ofs + 0] = q.x;
        out[ofs + 1] = q.y;
        out[ofs + 2] = q.z;
        out[ofs + 3] = q.w;
        return out;
    }
    /**
     * @en Array to a quaternion
     * @zh 数组转四元数
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
     * @en Check whether two quaternions are equal
     * @zh 四元数等价判断
     */
    static strictEquals(a, b) {
        return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
    }
    /**
     * @en Check whether two quaternions are approximately equal
     * @zh 排除浮点数误差的四元数近似等价判断
     */
    static equals(a, b, epsilon = utils_1.EPSILON) {
        return (Math.abs(a.x - b.x) <= epsilon * Math.max(1.0, Math.abs(a.x), Math.abs(b.x))
            && Math.abs(a.y - b.y) <= epsilon * Math.max(1.0, Math.abs(a.y), Math.abs(b.y))
            && Math.abs(a.z - b.z) <= epsilon * Math.max(1.0, Math.abs(a.z), Math.abs(b.z))
            && Math.abs(a.w - b.w) <= epsilon * Math.max(1.0, Math.abs(a.w), Math.abs(b.w)));
    }
    /**
     * @en clone the current Quat
     * @zh 克隆当前四元数。
     */
    clone() {
        return new Quat(this.x, this.y, this.z, this.w);
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
            this.w = w !== null && w !== void 0 ? w : 1;
        }
        return this;
    }
    /**
     * @en Check whether the quaternion approximately equals another one
     * @zh 判断当前四元数是否在误差范围内与指定向量相等。
     * @param other Comparative quaternion
     * @param epsilon The error allowed. It`s should be a non-negative number.
     * @returns Returns `true' when the components of the two quaternions are equal within the specified error range; otherwise, returns `false'.
     */
    equals(other, epsilon = utils_1.EPSILON) {
        return (Math.abs(this.x - other.x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(other.x))
            && Math.abs(this.y - other.y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(other.y))
            && Math.abs(this.z - other.z) <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(other.z))
            && Math.abs(this.w - other.w) <= epsilon * Math.max(1.0, Math.abs(this.w), Math.abs(other.w)));
    }
    /**
     * @en Check whether the current quaternion strictly equals other quaternion
     * @zh 判断当前四元数是否与指定四元数相等。
     * @param other Comparative quaternion
     * @returns Returns `true' when the components of the two quaternions are equal within the specified error range; otherwise, returns `false'.
     */
    strictEquals(other) {
        return other && this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
    }
    /**
     * @en Convert quaternion to Euler angles
     * @zh 将当前四元数转化为欧拉角（x-y-z）并赋值给出口向量。
     * @param out the output vector
     */
    getEulerAngles(out) {
        return Quat.toEuler(out, this);
    }
    /**
     * @en Calculate the linear interpolation result between this quaternion and another one with given ratio
     * @zh 根据指定的插值比率，从当前四元数到目标四元数之间做线性插值。
     * @param to The target quaternion
     * @param ratio The interpolation coefficient. The range is [0,1].
     */
    lerp(to, ratio) {
        this.x += ratio * (to.x - this.x);
        this.y += ratio * (to.y - this.y);
        this.z += ratio * (to.z - this.z);
        this.w += ratio * (to.w - this.w);
        return this;
    }
    /**
     * @en Calculates the spherical interpolation result between this quaternion and another one with the given ratio
     * @zh 根据指定的插值比率，从当前四元数到目标四元数之间做球面插值。
     * @param to The target quaternion
     * @param ratio The interpolation coefficient. The range is [0,1].
     */
    slerp(to, ratio) {
        return Quat.slerp(this, this, to, ratio);
    }
    /**
     * @en Calculates the length of the quaternion
     * @zh 求四元数长度
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    /**
     * @en Calculates the squared length of the quaternion
     * @zh 求四元数长度平方
     */
    lengthSqr() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
}
exports.Quat = Quat;
Quat.IDENTITY = Object.freeze(new Quat());
const qt_1 = new Quat();
const qt_2 = new Quat();
const v3_1 = new Vec3_1.Vec3();
const m3_1 = new Mat3_1.Mat3();
const halfToRad = 0.5 * Math.PI / 180.0;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlscy9NYXRocy9RdWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUE4QjtBQUU5QixtQ0FBNEM7QUFDNUMsaUNBQThCO0FBRTlCOzs7R0FHRztBQUNGLE1BQWEsSUFBSTtJQTRvQmQsWUFBYSxDQUFzQixFQUFFLENBQVUsRUFBRSxDQUFVLEVBQUUsQ0FBVTtRQUFHLENBQUM7UUFDdkUsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQjthQUFNO1lBQ0gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQUQsQ0FBQyxjQUFELENBQUMsR0FBSSxDQUFDLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBcnBCRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUF5QixDQUFNO1FBQzlDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsSUFB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QXlCLEdBQVEsRUFBRSxDQUFNO1FBQzdELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckUsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBeUIsQ0FBTSxFQUFFLENBQU07UUFDcEQsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxJQUFJLENBQXlCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTSxFQUFFLENBQVM7UUFDMUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFD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QUFDO1FBQ3JCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQXlCLEdBQVEsRUFBRSxDQUFNO1FBQzVELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDYixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNiLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxHQUFHLENBQXlCLENBQU07UUFDNUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsU0FBUyxDQUF5QixDQUFNO1FBQ2xELE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsU0FBUyxDQUF5QixHQUFRLEVBQUUsQ0FBTTtRQUM1RCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdB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SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFFLEdBQWMsRUFBRSxDQUFZO1FBQy9DLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFFLEdBQWMsRUFBRSxDQUFZO1FBQy9DLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxD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LENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBRSxDQUFZLEVBQUUsQ0FBWTtRQUNsRCxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBRSxDQUFZLEVBQUUsQ0FBWSxFQUFFLE9BQU8sR0FBRyxlQUFPO1FBQy9ELE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztlQUM3RSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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QUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXQzIH0gZnJvbSBcIi4vTWF0M1wiO1xuaW1wb3J0IHsgSVF1YXRMaWtlLCBJVmVjM0xpa2UgfSBmcm9tIFwiLi90eXBlLWRlZmluZVwiO1xuaW1wb3J0IHsgdG9EZWdyZWUsIEVQU0lMT04gfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgVmVjMyB9IGZyb20gXCIuL1ZlYzNcIjtcblxuLyoqXG4gKiBAZW4gcXVhdGVybmlvblxuICogQHpoIOWbm+WFg+aVsFxuICovXG4gZXhwb3J0IGNsYXNzIFF1YXQge1xuICAgIHB1YmxpYyBzdGF0aWMgSURFTlRJVFkgPSBPYmplY3QuZnJlZXplKG5ldyBRdWF0KCkpO1xuXG4gICAgLyoqXG4gICAgICogQGVuIE9idGFpbiBhIGNvcHkgb2YgdGhlIGdpdmVuIHF1YXRlcm5pb25cbiAgICAgKiBAemgg6I635b6X5oyH5a6a5Zub5YWD5pWw55qE5ou36LSdXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjbG9uZTxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChhOiBPdXQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBRdWF0KGEueCwgYS55LCBhLnosIGEudyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENvcHkgdGhlIGdpdmVuIHF1YXRlcm5pb24gdG8gdGhlIG91dCBxdWF0ZXJuaW9uXG4gICAgICogQHpoIOWkjeWItuebruagh+Wbm+WFg+aVsFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29weTxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFF1YXRMaWtlIGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IFF1YXRMaWtlKSB7XG4gICAgICAgIG91dC54ID0gYS54O1xuICAgICAgICBvdXQueSA9IGEueTtcbiAgICAgICAgb3V0LnogPSBhLno7XG4gICAgICAgIG91dC53ID0gYS53O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXRzIHRoZSBvdXQgcXVhdGVybmlvbiB3aXRoIHZhbHVlcyBvZiBlYWNoIGNvbXBvbmVudFxuICAgICAqIEB6aCDorr7nva7lm5vlhYPmlbDlgLxcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNldDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyKSB7XG4gICAgICAgIG91dC54ID0geDtcbiAgICAgICAgb3V0LnkgPSB5O1xuICAgICAgICBvdXQueiA9IHo7XG4gICAgICAgIG91dC53ID0gdztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0cyB0aGUgb3V0IHF1YXRlcm5pb24gdG8gYW4gaWRlbnRpdHkgcXVhdGVybmlvblxuICAgICAqIEB6aCDlsIbnm67moIfotYvlgLzkuLrljZXkvY3lm5vlhYPmlbBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGlkZW50aXR5PE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0KSB7XG4gICAgICAgIG91dC54ID0gMDtcbiAgICAgICAgb3V0LnkgPSAwO1xuICAgICAgICBvdXQueiA9IDA7XG4gICAgICAgIG91dC53ID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0cyB0aGUgb3V0IHF1YXRlcm5pb24gd2l0aCB0aGUgc2hvcnRlc3QgcGF0aCBvcmllbnRhdGlvbiBiZXR3ZWVuIHR3byB2ZWN0b3JzLCBjb25zaWRlcmluZyBib3RoIHZlY3RvcnMgbm9ybWFsaXplZFxuICAgICAqIEB6aCDorr7nva7lm5vlhYPmlbDkuLrkuKTlkJHph4/pl7TnmoTmnIDnn63ot6/lvoTml4vovazvvIzpu5jorqTkuKTlkJHph4/pg73lt7LlvZLkuIDljJZcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJvdGF0aW9uVG88T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IFZlY0xpa2UsIGI6IFZlY0xpa2UpIHtcbiAgICAgICAgY29uc3QgZG90ID0gVmVjMy5kb3QoYSwgYik7XG4gICAgICAgIGlmIChkb3QgPCAtMC45OTk5OTkpIHtcbiAgICAgICAgICAgIFZlYzMuY3Jvc3ModjNfMSwgVmVjMy5VTklUX1gsIGEpO1xuICAgICAgICAgICAgaWYgKHYzXzEubGVuZ3RoKCkgPCAwLjAwMDAwMSkge1xuICAgICAgICAgICAgICAgIFZlYzMuY3Jvc3ModjNfMSwgVmVjMy5VTklUX1ksIGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgVmVjMy5ub3JtYWxpemUodjNfMSwgdjNfMSk7XG4gICAgICAgICAgICBRdWF0LmZyb21BeGlzQW5nbGUob3V0LCB2M18xLCBNYXRoLlBJKTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZG90ID4gMC45OTk5OTkpIHtcbiAgICAgICAgICAgIG91dC54ID0gMDtcbiAgICAgICAgICAgIG91dC55ID0gMDtcbiAgICAgICAgICAgIG91dC56ID0gMDtcbiAgICAgICAgICAgIG91dC53ID0gMTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBWZWMzLmNyb3NzKHYzXzEsIGEsIGIpO1xuICAgICAgICAgICAgb3V0LnggPSB2M18xLng7XG4gICAgICAgICAgICBvdXQueSA9IHYzXzEueTtcbiAgICAgICAgICAgIG91dC56ID0gdjNfMS56O1xuICAgICAgICAgICAgb3V0LncgPSAxICsgZG90O1xuICAgICAgICAgICAgcmV0dXJuIFF1YXQubm9ybWFsaXplKG91dCwgb3V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBHZXRzIHRoZSByb3RhdGlvbiBheGlzIGFuZCB0aGUgYXJjIG9mIHJvdGF0aW9uIGZyb20gdGhlIHF1YXRlcm5pb25cbiAgICAgKiBAemgg6I635Y+W5Zub5YWD5pWw55qE5peL6L2s6L205ZKM5peL6L2s5byn5bqmXG4gICAgICogQHBhcmFtIG91dEF4aXMgb3V0cHV0IGF4aXNcbiAgICAgKiBAcGFyYW0gcSBpbnB1dCBxdWF0ZXJuaW9uXG4gICAgICogQHJldHVybiByYWRpdXMgb2Ygcm90YXRpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldEF4aXNBbmdsZTxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXRBeGlzOiBWZWNMaWtlLCBxOiBPdXQpIHtcbiAgICAgICAgY29uc3QgcmFkID0gTWF0aC5hY29zKHEudykgKiAyLjA7XG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQgLyAyLjApO1xuICAgICAgICBpZiAocyAhPT0gMC4wKSB7XG4gICAgICAgICAgICBvdXRBeGlzLnggPSBxLnggLyBzO1xuICAgICAgICAgICAgb3V0QXhpcy55ID0gcS55IC8gcztcbiAgICAgICAgICAgIG91dEF4aXMueiA9IHEueiAvIHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiBzIGlzIHplcm8sIHJldHVybiBhbnkgYXhpcyAobm8gcm90YXRpb24gLSBheGlzIGRvZXMgbm90IG1hdHRlcilcbiAgICAgICAgICAgIG91dEF4aXMueCA9IDE7XG4gICAgICAgICAgICBvdXRBeGlzLnkgPSAwO1xuICAgICAgICAgICAgb3V0QXhpcy56ID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmFkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBRdWF0ZXJuaW9uIG11bHRpcGxpY2F0aW9uIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBxdWF0ZXJuaW9uXG4gICAgICogQHpoIOWbm+WFg+aVsOS5mOazlVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbXVsdGlwbHk8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZV8xIGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZV8yIGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IFF1YXRMaWtlXzEsIGI6IFF1YXRMaWtlXzIpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueCAqIGIudyArIGEudyAqIGIueCArIGEueSAqIGIueiAtIGEueiAqIGIueTtcbiAgICAgICAgY29uc3QgeSA9IGEueSAqIGIudyArIGEudyAqIGIueSArIGEueiAqIGIueCAtIGEueCAqIGIuejtcbiAgICAgICAgY29uc3QgeiA9IGEueiAqIGIudyArIGEudyAqIGIueiArIGEueCAqIGIueSAtIGEueSAqIGIueDtcbiAgICAgICAgY29uc3QgdyA9IGEudyAqIGIudyAtIGEueCAqIGIueCAtIGEueSAqIGIueSAtIGEueiAqIGIuejtcbiAgICAgICAgb3V0LnggPSB4O1xuICAgICAgICBvdXQueSA9IHk7XG4gICAgICAgIG91dC56ID0gejtcbiAgICAgICAgb3V0LncgPSB3O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBRdWF0ZXJuaW9uIHNjYWxhciBtdWx0aXBsaWNhdGlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgcXVhdGVybmlvblxuICAgICAqIEB6aCDlm5vlhYPmlbDmoIfph4/kuZjms5VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG11bHRpcGx5U2NhbGFyPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IG51bWJlcikge1xuICAgICAgICBvdXQueCA9IGEueCAqIGI7XG4gICAgICAgIG91dC55ID0gYS55ICogYjtcbiAgICAgICAgb3V0LnogPSBhLnogKiBiO1xuICAgICAgICBvdXQudyA9IGEudyAqIGI7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFF1YXRlcm5pb24gbXVsdGlwbGljYXRpb24gYW5kIGFkZGl0aW9uOiBBICsgQiAqIHNjYWxlXG4gICAgICogQHpoIOWbm+WFg+aVsOS5mOWKoO+8mkEgKyBCICogc2NhbGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNjYWxlQW5kQWRkPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgc2NhbGU6IG51bWJlcikge1xuICAgICAgICBvdXQueCA9IGEueCArIGIueCAqIHNjYWxlO1xuICAgICAgICBvdXQueSA9IGEueSArIGIueSAqIHNjYWxlO1xuICAgICAgICBvdXQueiA9IGEueiArIGIueiAqIHNjYWxlO1xuICAgICAgICBvdXQudyA9IGEudyArIGIudyAqIHNjYWxlO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXRzIHRoZSBvdXQgcXVhdGVybmlvbiB0byByZXByZXNlbnQgYSByYWRpYW4gcm90YXRpb24gYXJvdW5kIHggYXhpc1xuICAgICAqIEB6aCDnu5UgWCDovbTml4vovazmjIflrprlm5vlhYPmlbBcbiAgICAgKiBAcGFyYW0gcmFkIHJhZGl1cyBvZiByb3RhdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcm90YXRlWDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlcikge1xuICAgICAgICByYWQgKj0gMC41O1xuXG4gICAgICAgIGNvbnN0IGJ4ID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgY29uc3QgYncgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICBjb25zdCB7IHgsIHksIHosIHcgfSA9IGE7XG5cbiAgICAgICAgb3V0LnggPSB4ICogYncgKyB3ICogYng7XG4gICAgICAgIG91dC55ID0geSAqIGJ3ICsgeiAqIGJ4O1xuICAgICAgICBvdXQueiA9IHogKiBidyAtIHkgKiBieDtcbiAgICAgICAgb3V0LncgPSB3ICogYncgLSB4ICogYng7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgdGhlIG91dCBxdWF0ZXJuaW9uIHRvIHJlcHJlc2VudCBhIHJhZGlhbiByb3RhdGlvbiBhcm91bmQgeSBheGlzXG4gICAgICogQHpoIOe7lSBZIOi9tOaXi+i9rOaMh+WumuWbm+WFg+aVsFxuICAgICAqIEBwYXJhbSByYWQgcmFkaXVzIG9mIHJvdGF0aW9uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByb3RhdGVZPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyKSB7XG4gICAgICAgIHJhZCAqPSAwLjU7XG5cbiAgICAgICAgY29uc3QgYnkgPSBNYXRoLnNpbihyYWQpO1xuICAgICAgICBjb25zdCBidyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIGNvbnN0IHsgeCwgeSwgeiwgdyB9ID0gYTtcblxuICAgICAgICBvdXQueCA9IHggKiBidyAtIHogKiBieTtcbiAgICAgICAgb3V0LnkgPSB5ICogYncgKyB3ICogYnk7XG4gICAgICAgIG91dC56ID0geiAqIGJ3ICsgeCAqIGJ5O1xuICAgICAgICBvdXQudyA9IHcgKiBidyAtIHkgKiBieTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0cyB0aGUgb3V0IHF1YXRlcm5pb24gdG8gcmVwcmVzZW50IGEgcmFkaWFuIHJvdGF0aW9uIGFyb3VuZCB6IGF4aXNcbiAgICAgKiBAemgg57uVIFog6L205peL6L2s5oyH5a6a5Zub5YWD5pWwXG4gICAgICogQHBhcmFtIHJhZCByYWRpdXMgb2Ygcm90YXRpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJvdGF0ZVo8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIpIHtcbiAgICAgICAgcmFkICo9IDAuNTtcblxuICAgICAgICBjb25zdCBieiA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIGNvbnN0IGJ3ID0gTWF0aC5jb3MocmFkKTtcbiAgICAgICAgY29uc3QgeyB4LCB5LCB6LCB3IH0gPSBhO1xuXG4gICAgICAgIG91dC54ID0geCAqIGJ3ICsgeSAqIGJ6O1xuICAgICAgICBvdXQueSA9IHkgKiBidyAtIHggKiBiejtcbiAgICAgICAgb3V0LnogPSB6ICogYncgKyB3ICogYno7XG4gICAgICAgIG91dC53ID0gdyAqIGJ3IC0geiAqIGJ6O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXRzIHRoZSBvdXQgcXVhdGVybmlvbiB0byByZXByZXNlbnQgYSByYWRpYW4gcm90YXRpb24gYXJvdW5kIGEgZ2l2ZW4gcm90YXRpb24gYXhpcyBpbiB3b3JsZCBzcGFjZVxuICAgICAqIEB6aCDnu5XkuJbnlYznqbrpl7TkuIvmjIflrprovbTml4vovazlm5vlhYPmlbBcbiAgICAgKiBAcGFyYW0gYXhpcyBheGlzIG9mIHJvdGF0aW9uLCBub3JtYWxpemVkIGJ5IGRlZmF1bHRcbiAgICAgKiBAcGFyYW0gcmFkIHJhZGl1cyBvZiByb3RhdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcm90YXRlQXJvdW5kPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCByb3Q6IE91dCwgYXhpczogVmVjTGlrZSwgcmFkOiBudW1iZXIpIHtcbiAgICAgICAgLy8gZ2V0IGludi1heGlzIChsb2NhbCB0byByb3QpXG4gICAgICAgIFF1YXQuaW52ZXJ0KHF0XzEsIHJvdCk7XG4gICAgICAgIFZlYzMudHJhbnNmb3JtUXVhdCh2M18xLCBheGlzLCBxdF8xKTtcbiAgICAgICAgLy8gcm90YXRlIGJ5IGludi1heGlzXG4gICAgICAgIFF1YXQuZnJvbUF4aXNBbmdsZShxdF8xLCB2M18xLCByYWQpO1xuICAgICAgICBRdWF0Lm11bHRpcGx5KG91dCwgcm90LCBxdF8xKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0cyB0aGUgb3V0IHF1YXRlcm5pb24gdG8gcmVwcmVzZW50IGEgcmFkaWFuIHJvdGF0aW9uIGFyb3VuZCBhIGdpdmVuIHJvdGF0aW9uIGF4aXMgaW4gbG9jYWwgc3BhY2VcbiAgICAgKiBAemgg57uV5pys5Zyw56m66Ze05LiL5oyH5a6a6L205peL6L2s5Zub5YWD5pWwXG4gICAgICogQHBhcmFtIGF4aXMgYXhpcyBvZiByb3RhdGlvblxuICAgICAqIEBwYXJhbSByYWQgcmFkaXVzIG9mIHJvdGF0aW9uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByb3RhdGVBcm91bmRMb2NhbDxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcm90OiBPdXQsIGF4aXM6IFZlY0xpa2UsIHJhZDogbnVtYmVyKSB7XG4gICAgICAgIFF1YXQuZnJvbUF4aXNBbmdsZShxdF8xLCBheGlzLCByYWQpO1xuICAgICAgICBRdWF0Lm11bHRpcGx5KG91dCwgcm90LCBxdF8xKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgdyBjb21wb25lbnQgd2l0aCB4eXogY29tcG9uZW50cywgY29uc2lkZXJpbmcgdGhlIGdpdmVuIHF1YXRlcm5pb24gbm9ybWFsaXplZFxuICAgICAqIEB6aCDmoLnmja4geHl6IOWIhumHj+iuoeeulyB3IOWIhumHj++8jOm7mOiupOW3suW9kuS4gOWMllxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2FsY3VsYXRlVzxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIG91dC54ID0gYS54O1xuICAgICAgICBvdXQueSA9IGEueTtcbiAgICAgICAgb3V0LnogPSBhLno7XG4gICAgICAgIG91dC53ID0gTWF0aC5zcXJ0KE1hdGguYWJzKDEuMCAtIGEueCAqIGEueCAtIGEueSAqIGEueSAtIGEueiAqIGEueikpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBRdWF0ZXJuaW9uIGRvdCBwcm9kdWN0IChzY2FsYXIgcHJvZHVjdClcbiAgICAgKiBAemgg5Zub5YWD5pWw54K556ev77yI5pWw6YeP56ev77yJXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBkb3Q8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgcmV0dXJuIGEueCAqIGIueCArIGEueSAqIGIueSArIGEueiAqIGIueiArIGEudyAqIGIudztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gRWxlbWVudCBieSBlbGVtZW50IGxpbmVhciBpbnRlcnBvbGF0aW9uOiBBICsgdCAqIChCIC0gQSlcbiAgICAgKiBAemgg6YCQ5YWD57Sg57q/5oCn5o+S5YC877yaIEEgKyB0ICogKEIgLSBBKVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbGVycDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHQ6IG51bWJlcikge1xuICAgICAgICBvdXQueCA9IGEueCArIHQgKiAoYi54IC0gYS54KTtcbiAgICAgICAgb3V0LnkgPSBhLnkgKyB0ICogKGIueSAtIGEueSk7XG4gICAgICAgIG91dC56ID0gYS56ICsgdCAqIChiLnogLSBhLnopO1xuICAgICAgICBvdXQudyA9IGEudyArIHQgKiAoYi53IC0gYS53KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU3BoZXJpY2FsIHF1YXRlcm5pb24gaW50ZXJwb2xhdGlvblxuICAgICAqIEB6aCDlm5vlhYPmlbDnkIPpnaLmj5LlgLxcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNsZXJwPE91dCBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2VfMSBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2VfMiBleHRlbmRzIElRdWF0TGlrZT5cbiAgICAob3V0OiBPdXQsIGE6IFF1YXRMaWtlXzEsIGI6IFF1YXRMaWtlXzIsIHQ6IG51bWJlcikge1xuICAgICAgICAvLyBiZW5jaG1hcmtzOlxuICAgICAgICAvLyAgICBodHRwOi8vanNwZXJmLmNvbS9xdWF0ZXJuaW9uLXNsZXJwLWltcGxlbWVudGF0aW9uc1xuXG4gICAgICAgIGxldCBzY2FsZTAgPSAwO1xuICAgICAgICBsZXQgc2NhbGUxID0gMDtcbiAgICAgICAgbGV0IGJ4ID0gYi54O1xuICAgICAgICBsZXQgYnkgPSBiLnk7XG4gICAgICAgIGxldCBieiA9IGIuejtcbiAgICAgICAgbGV0IGJ3ID0gYi53O1xuXG4gICAgICAgIC8vIGNhbGMgY29zaW5lXG4gICAgICAgIGxldCBjb3NvbSA9IGEueCAqIGIueCArIGEueSAqIGIueSArIGEueiAqIGIueiArIGEudyAqIGIudztcbiAgICAgICAgLy8gYWRqdXN0IHNpZ25zIChpZiBuZWNlc3NhcnkpXG4gICAgICAgIGlmIChjb3NvbSA8IDAuMCkge1xuICAgICAgICAgICAgY29zb20gPSAtY29zb207XG4gICAgICAgICAgICBieCA9IC1ieDtcbiAgICAgICAgICAgIGJ5ID0gLWJ5O1xuICAgICAgICAgICAgYnogPSAtYno7XG4gICAgICAgICAgICBidyA9IC1idztcbiAgICAgICAgfVxuICAgICAgICAvLyBjYWxjdWxhdGUgY29lZmZpY2llbnRzXG4gICAgICAgIGlmICgoMS4wIC0gY29zb20pID4gMC4wMDAwMDEpIHtcbiAgICAgICAgICAgIC8vIHN0YW5kYXJkIGNhc2UgKHNsZXJwKVxuICAgICAgICAgICAgY29uc3Qgb21lZ2EgPSBNYXRoLmFjb3MoY29zb20pO1xuICAgICAgICAgICAgY29uc3Qgc2lub20gPSBNYXRoLnNpbihvbWVnYSk7XG4gICAgICAgICAgICBzY2FsZTAgPSBNYXRoLnNpbigoMS4wIC0gdCkgKiBvbWVnYSkgLyBzaW5vbTtcbiAgICAgICAgICAgIHNjYWxlMSA9IE1hdGguc2luKHQgKiBvbWVnYSkgLyBzaW5vbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFwiZnJvbVwiIGFuZCBcInRvXCIgcXVhdGVybmlvbnMgYXJlIHZlcnkgY2xvc2VcbiAgICAgICAgICAgIC8vICAuLi4gc28gd2UgY2FuIGRvIGEgbGluZWFyIGludGVycG9sYXRpb25cbiAgICAgICAgICAgIHNjYWxlMCA9IDEuMCAtIHQ7XG4gICAgICAgICAgICBzY2FsZTEgPSB0O1xuICAgICAgICB9XG4gICAgICAgIC8vIGNhbGN1bGF0ZSBmaW5hbCB2YWx1ZXNcbiAgICAgICAgb3V0LnggPSBzY2FsZTAgKiBhLnggKyBzY2FsZTEgKiBieDtcbiAgICAgICAgb3V0LnkgPSBzY2FsZTAgKiBhLnkgKyBzY2FsZTEgKiBieTtcbiAgICAgICAgb3V0LnogPSBzY2FsZTAgKiBhLnogKyBzY2FsZTEgKiBiejtcbiAgICAgICAgb3V0LncgPSBzY2FsZTAgKiBhLncgKyBzY2FsZTEgKiBidztcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTcGhlcmljYWwgcXVhdGVybmlvbiBpbnRlcnBvbGF0aW9uIHdpdGggdHdvIGNvbnRyb2wgcG9pbnRzXG4gICAgICogQHpoIOW4puS4pOS4quaOp+WItueCueeahOWbm+WFg+aVsOeQg+mdouaPkuWAvFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc3FsZXJwPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgYzogT3V0LCBkOiBPdXQsIHQ6IG51bWJlcikge1xuICAgICAgICBRdWF0LnNsZXJwKHF0XzEsIGEsIGQsIHQpO1xuICAgICAgICBRdWF0LnNsZXJwKHF0XzIsIGIsIGMsIHQpO1xuICAgICAgICBRdWF0LnNsZXJwKG91dCwgcXRfMSwgcXRfMiwgMiAqIHQgKiAoMSAtIHQpKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0cyB0aGUgaW52ZXJzZSBvZiB0aGUgZ2l2ZW4gcXVhdGVybmlvbiB0byBvdXQgcXVhdGVybmlvblxuICAgICAqIEB6aCDlm5vlhYPmlbDmsYLpgIZcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGludmVydDxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFF1YXRMaWtlIGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IFF1YXRMaWtlKSB7XG4gICAgICAgIGNvbnN0IGRvdCA9IGEueCAqIGEueCArIGEueSAqIGEueSArIGEueiAqIGEueiArIGEudyAqIGEudztcbiAgICAgICAgY29uc3QgaW52RG90ID0gZG90ID8gMS4wIC8gZG90IDogMDtcblxuICAgICAgICAvLyBUT0RPOiBXb3VsZCBiZSBmYXN0ZXIgdG8gcmV0dXJuIFswLDAsMCwwXSBpbW1lZGlhdGVseSBpZiBkb3QgPT0gMFxuXG4gICAgICAgIG91dC54ID0gLWEueCAqIGludkRvdDtcbiAgICAgICAgb3V0LnkgPSAtYS55ICogaW52RG90O1xuICAgICAgICBvdXQueiA9IC1hLnogKiBpbnZEb3Q7XG4gICAgICAgIG91dC53ID0gYS53ICogaW52RG90O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDb25qdWdhdGluZyBhIHF1YXRlcm5pb24sIGl0J3MgZXF1aXZhbGVudCB0byB0aGUgaW52ZXJzZSBvZiB0aGUgdW5pdCBxdWF0ZXJuaW9uLCBidXQgbW9yZSBlZmZpY2llbnRcbiAgICAgKiBAemgg5rGC5YWx6L2t5Zub5YWD5pWw77yM5a+55Y2V5L2N5Zub5YWD5pWw5LiO5rGC6YCG562J5Lu377yM5L2G5pu06auY5pWIXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjb25qdWdhdGU8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBvdXQueCA9IC1hLng7XG4gICAgICAgIG91dC55ID0gLWEueTtcbiAgICAgICAgb3V0LnogPSAtYS56O1xuICAgICAgICBvdXQudyA9IGEudztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIHRoZSBxdWF0ZXJuaW9uXG4gICAgICogQHpoIOaxguWbm+WFg+aVsOmVv+W6plxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbGVuPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGEueCAqIGEueCArIGEueSAqIGEueSArIGEueiAqIGEueiArIGEudyAqIGEudyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoZSBxdWF0ZXJuaW9uXG4gICAgICogQHpoIOaxguWbm+WFg+aVsOmVv+W6puW5s+aWuVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbGVuZ3RoU3FyPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCkge1xuICAgICAgICByZXR1cm4gYS54ICogYS54ICsgYS55ICogYS55ICsgYS56ICogYS56ICsgYS53ICogYS53O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBOb3JtYWxpemUgdGhlIGdpdmVuIHF1YXRlcm5pb25cbiAgICAgKiBAemgg5b2S5LiA5YyW5Zub5YWD5pWwXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBub3JtYWxpemU8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBsZXQgbGVuID0gYS54ICogYS54ICsgYS55ICogYS55ICsgYS56ICogYS56ICsgYS53ICogYS53O1xuICAgICAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgICAgICAgICAgb3V0LnggPSBhLnggKiBsZW47XG4gICAgICAgICAgICBvdXQueSA9IGEueSAqIGxlbjtcbiAgICAgICAgICAgIG91dC56ID0gYS56ICogbGVuO1xuICAgICAgICAgICAgb3V0LncgPSBhLncgKiBsZW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlZCB0aGUgcXVhdGVybmlvbiByZXByZXNlbnRzIHRoZSBnaXZlbiBjb29yZGluYXRlcywgY29uc2lkZXJpbmcgYWxsIGdpdmVuIHZlY3RvcnMgYXJlIG5vcm1hbGl6ZWQgYW5kIG11dHVhbGx5IHBlcnBlbmRpY3VsYXJcbiAgICAgKiBAemgg5qC55o2u5pys5Zyw5Z2Q5qCH6L205pyd5ZCR6K6h566X5Zub5YWD5pWw77yM6buY6K6k5LiJ5ZCR6YeP6YO95bey5b2S5LiA5YyW5LiU55u45LqS5Z6C55u0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmcm9tQXhlczxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgeEF4aXM6IFZlY0xpa2UsIHlBeGlzOiBWZWNMaWtlLCB6QXhpczogVmVjTGlrZSkge1xuICAgICAgICBNYXQzLnNldChtM18xLFxuICAgICAgICAgICAgeEF4aXMueCwgeEF4aXMueSwgeEF4aXMueixcbiAgICAgICAgICAgIHlBeGlzLngsIHlBeGlzLnksIHlBeGlzLnosXG4gICAgICAgICAgICB6QXhpcy54LCB6QXhpcy55LCB6QXhpcy56KTtcbiAgICAgICAgcmV0dXJuIFF1YXQubm9ybWFsaXplKG91dCwgUXVhdC5mcm9tTWF0MyhvdXQsIG0zXzEpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgcXVhdGVybmlvbiB3aXRoIHRoZSB1cCBkaXJlY3Rpb24gYW5kIHRoZSBkaXJlY3Rpb24gb2YgdGhlIHZpZXdwb3J0XG4gICAgICogQHpoIOagueaNruinhuWPo+eahOWJjeaWueWQkeWSjOS4iuaWueWQkeiuoeeul+Wbm+WFg+aVsFxuICAgICAqIEBwYXJhbSB2aWV3IFRoZSB2aWV3IGRpcmVjdGlvbiwgaXRgcyBtdXN0IGJlIG5vcm1hbGl6ZWQuXG4gICAgICogQHBhcmFtIHVwIFRoZSB2aWV3IHVwIGRpcmVjdGlvbiwgaXRgcyBtdXN0IGJlIG5vcm1hbGl6ZWQsIGRlZmF1bHQgdmFsdWUgaXMgKDAsIDEsIDApLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVZpZXdVcDxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgdmlldzogVmVjTGlrZSwgdXA/OiBWZWMzKSB7XG4gICAgICAgIE1hdDMuZnJvbVZpZXdVcChtM18xLCB2aWV3LCB1cCk7XG4gICAgICAgIHJldHVybiBRdWF0Lm5vcm1hbGl6ZShvdXQsIFF1YXQuZnJvbU1hdDMob3V0LCBtM18xKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHF1YXRlcm5pb24gZnJvbSBhIGdpdmVuIHJvdGFyeSBzaGFmdCBhbmQgYSByYWRpYW4gcm90YXRpb24gYXJvdW5kIGl0LlxuICAgICAqIEB6aCDmoLnmja7ml4vovazovbTlkozml4vovazlvKfluqborqHnrpflm5vlhYPmlbBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21BeGlzQW5nbGU8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGF4aXM6IFZlY0xpa2UsIHJhZDogbnVtYmVyKSB7XG4gICAgICAgIHJhZCAqPSAwLjU7XG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQpO1xuICAgICAgICBvdXQueCA9IHMgKiBheGlzLng7XG4gICAgICAgIG91dC55ID0gcyAqIGF4aXMueTtcbiAgICAgICAgb3V0LnogPSBzICogYXhpcy56O1xuICAgICAgICBvdXQudyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHF1YXRlcm5pb24gd2l0aCB0aGUgdGhyZWUtZGltZW5zaW9uYWwgdHJhbnNmb3JtIG1hdHJpeCwgY29uc2lkZXJpbmcgbm8gc2NhbGUgaW5jbHVkZWQgaW4gdGhlIG1hdHJpeFxuICAgICAqIEB6aCDmoLnmja7kuInnu7Tnn6npmLXkv6Hmga/orqHnrpflm5vlhYPmlbDvvIzpu5jorqTovpPlhaXnn6npmLXkuI3lkKvmnInnvKnmlL7kv6Hmga9cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21NYXQzPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBtOiBNYXQzKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIG0wMCwgbTAzOiBtMDEsIG0wNjogbTAyLFxuICAgICAgICAgICAgbTAxOiBtMTAsIG0wNDogbTExLCBtMDc6IG0xMixcbiAgICAgICAgICAgIG0wMjogbTIwLCBtMDU6IG0yMSwgbTA4OiBtMjIsXG4gICAgICAgIH0gPSBtO1xuXG4gICAgICAgIGNvbnN0IHRyYWNlID0gbTAwICsgbTExICsgbTIyO1xuXG4gICAgICAgIGlmICh0cmFjZSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAwLjUgLyBNYXRoLnNxcnQodHJhY2UgKyAxLjApO1xuXG4gICAgICAgICAgICBvdXQudyA9IDAuMjUgLyBzO1xuICAgICAgICAgICAgb3V0LnggPSAobTIxIC0gbTEyKSAqIHM7XG4gICAgICAgICAgICBvdXQueSA9IChtMDIgLSBtMjApICogcztcbiAgICAgICAgICAgIG91dC56ID0gKG0xMCAtIG0wMSkgKiBzO1xuICAgICAgICB9IGVsc2UgaWYgKChtMDAgPiBtMTEpICYmIChtMDAgPiBtMjIpKSB7XG4gICAgICAgICAgICBjb25zdCBzID0gMi4wICogTWF0aC5zcXJ0KDEuMCArIG0wMCAtIG0xMSAtIG0yMik7XG5cbiAgICAgICAgICAgIG91dC53ID0gKG0yMSAtIG0xMikgLyBzO1xuICAgICAgICAgICAgb3V0LnggPSAwLjI1ICogcztcbiAgICAgICAgICAgIG91dC55ID0gKG0wMSArIG0xMCkgLyBzO1xuICAgICAgICAgICAgb3V0LnogPSAobTAyICsgbTIwKSAvIHM7XG4gICAgICAgIH0gZWxzZSBpZiAobTExID4gbTIyKSB7XG4gICAgICAgICAgICBjb25zdCBzID0gMi4wICogTWF0aC5zcXJ0KDEuMCArIG0xMSAtIG0wMCAtIG0yMik7XG5cbiAgICAgICAgICAgIG91dC53ID0gKG0wMiAtIG0yMCkgLyBzO1xuICAgICAgICAgICAgb3V0LnggPSAobTAxICsgbTEwKSAvIHM7XG4gICAgICAgICAgICBvdXQueSA9IDAuMjUgKiBzO1xuICAgICAgICAgICAgb3V0LnogPSAobTEyICsgbTIxKSAvIHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzID0gMi4wICogTWF0aC5zcXJ0KDEuMCArIG0yMiAtIG0wMCAtIG0xMSk7XG5cbiAgICAgICAgICAgIG91dC53ID0gKG0xMCAtIG0wMSkgLyBzO1xuICAgICAgICAgICAgb3V0LnggPSAobTAyICsgbTIwKSAvIHM7XG4gICAgICAgICAgICBvdXQueSA9IChtMTIgKyBtMjEpIC8gcztcbiAgICAgICAgICAgIG91dC56ID0gMC4yNSAqIHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBxdWF0ZXJuaW9uIHdpdGggRXVsZXIgYW5nbGVzLCB0aGUgcm90YXRpb24gb3JkZXIgaXMgWVpYXG4gICAgICogQHpoIOagueaNruasp+aLieinkuS/oeaBr+iuoeeul+Wbm+WFg+aVsO+8jOaXi+i9rOmhuuW6j+S4uiBZWlhcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21FdWxlcjxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xuICAgICAgICB4ICo9IGhhbGZUb1JhZDtcbiAgICAgICAgeSAqPSBoYWxmVG9SYWQ7XG4gICAgICAgIHogKj0gaGFsZlRvUmFkO1xuXG4gICAgICAgIGNvbnN0IHN4ID0gTWF0aC5zaW4oeCk7XG4gICAgICAgIGNvbnN0IGN4ID0gTWF0aC5jb3MoeCk7XG4gICAgICAgIGNvbnN0IHN5ID0gTWF0aC5zaW4oeSk7XG4gICAgICAgIGNvbnN0IGN5ID0gTWF0aC5jb3MoeSk7XG4gICAgICAgIGNvbnN0IHN6ID0gTWF0aC5zaW4oeik7XG4gICAgICAgIGNvbnN0IGN6ID0gTWF0aC5jb3Moeik7XG5cbiAgICAgICAgb3V0LnggPSBzeCAqIGN5ICogY3ogKyBjeCAqIHN5ICogc3o7XG4gICAgICAgIG91dC55ID0gY3ggKiBzeSAqIGN6ICsgc3ggKiBjeSAqIHN6O1xuICAgICAgICBvdXQueiA9IGN4ICogY3kgKiBzeiAtIHN4ICogc3kgKiBjejtcbiAgICAgICAgb3V0LncgPSBjeCAqIGN5ICogY3ogLSBzeCAqIHN5ICogc3o7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgcXVhdGVybmlvbiB3aXRoIGdpdmVuIDJEIGFuZ2xlICgwLCAwLCB6KS5cbiAgICAgKiBAemgg5qC55o2uIDJEIOinkuW6pu+8iDAsIDAsIHrvvInorqHnrpflm5vlhYPmlbBcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgT3V0cHV0IHF1YXRlcm5pb25cbiAgICAgKiBAcGFyYW0geiBBbmdsZSB0byByb3RhdGUgYXJvdW5kIFogYXhpcyBpbiBkZWdyZWVzLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZnJvbUFuZ2xlWjxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgejogbnVtYmVyKSB7XG4gICAgICAgIHogKj0gaGFsZlRvUmFkO1xuICAgICAgICBvdXQueCA9IG91dC55ID0gMDtcbiAgICAgICAgb3V0LnogPSBNYXRoLnNpbih6KTtcbiAgICAgICAgb3V0LncgPSBNYXRoLmNvcyh6KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVGhpcyByZXR1cm5zIHRoZSBYLWF4aXMgdmVjdG9yIG9mIHRoZSBxdWF0ZXJuaW9uXG4gICAgICogQHpoIOi/lOWbnuWumuS5ieatpOWbm+WFg+aVsOeahOWdkOagh+ezuyBYIOi9tOWQkemHj1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdG9BeGlzWCAob3V0OiBJVmVjM0xpa2UsIHE6IElRdWF0TGlrZSkge1xuICAgICAgICBjb25zdCBmeSA9IDIuMCAqIHEueTtcbiAgICAgICAgY29uc3QgZnogPSAyLjAgKiBxLno7XG4gICAgICAgIG91dC54ID0gMS4wIC0gZnkgKiBxLnkgLSBmeiAqIHEuejtcbiAgICAgICAgb3V0LnkgPSBmeSAqIHEueCArIGZ6ICogcS53O1xuICAgICAgICBvdXQueiA9IGZ6ICogcS54ICsgZnkgKiBxLnc7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVGhpcyByZXR1cm5zIHRoZSBZLWF4aXMgdmVjdG9yIG9mIHRoZSBxdWF0ZXJuaW9uXG4gICAgICogQHpoIOi/lOWbnuWumuS5ieatpOWbm+WFg+aVsOeahOWdkOagh+ezuyBZIOi9tOWQkemHj1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdG9BeGlzWSAob3V0OiBJVmVjM0xpa2UsIHE6IElRdWF0TGlrZSkge1xuICAgICAgICBjb25zdCBmeCA9IDIuMCAqIHEueDtcbiAgICAgICAgY29uc3QgZnkgPSAyLjAgKiBxLnk7XG4gICAgICAgIGNvbnN0IGZ6ID0gMi4wICogcS56O1xuICAgICAgICBvdXQueCA9IGZ5ICogcS54IC0gZnogKiBxLnc7XG4gICAgICAgIG91dC55ID0gMS4wIC0gZnggKiBxLnggLSBmeiAqIHEuejtcbiAgICAgICAgb3V0LnogPSBmeiAqIHEueSArIGZ4ICogcS53O1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFRoaXMgcmV0dXJucyB0aGUgWi1heGlzIHZlY3RvciBvZiB0aGUgcXVhdGVybmlvblxuICAgICAqIEB6aCDov5Tlm57lrprkuYnmraTlm5vlhYPmlbDnmoTlnZDmoIfns7sgWiDovbTlkJHph49cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRvQXhpc1ogKG91dDogSVZlYzNMaWtlLCBxOiBJUXVhdExpa2UpIHtcbiAgICAgICAgY29uc3QgZnggPSAyLjAgKiBxLng7XG4gICAgICAgIGNvbnN0IGZ5ID0gMi4wICogcS55O1xuICAgICAgICBjb25zdCBmeiA9IDIuMCAqIHEuejtcbiAgICAgICAgb3V0LnggPSBmeiAqIHEueCAtIGZ5ICogcS53O1xuICAgICAgICBvdXQueSA9IGZ6ICogcS55IC0gZnggKiBxLnc7XG4gICAgICAgIG91dC56ID0gMS4wIC0gZnggKiBxLnggLSBmeSAqIHEueTtcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDb252ZXJ0cyB0aGUgcXVhdGVybmlvbiB0byBhbmdsZXMsIHJlc3VsdCBhbmdsZSB4LCB5IGluIHRoZSByYW5nZSBvZiBbLTE4MCwgMTgwXSwgeiBpbiB0aGUgcmFuZ2Ugb2YgWy05MCwgOTBdIGludGVydmFsLCB0aGUgcm90YXRpb24gb3JkZXIgaXMgWVpYXG4gICAgICogQHpoIOagueaNruWbm+WFg+aVsOiuoeeul+asp+aLieinku+8jOi/lOWbnuinkuW6piB4LCB5IOWcqCBbLTE4MCwgMTgwXSDljLrpl7TlhoUsIHog6buY6K6k5ZyoIFstOTAsIDkwXSDljLrpl7TlhoXvvIzml4vovazpobrluo/kuLogWVpYXG4gICAgICogQHBhcmFtIG91dGVyWiBjaGFuZ2UgeiB2YWx1ZSByYW5nZSB0byBbLTE4MCwgLTkwXSBVIFs5MCwgMTgwXVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdG9FdWxlciAob3V0OiBJVmVjM0xpa2UsIHE6IElRdWF0TGlrZSwgb3V0ZXJaPzogYm9vbGVhbikge1xuICAgICAgICBjb25zdCB7IHgsIHksIHosIHcgfSA9IHE7XG4gICAgICAgIGxldCBiYW5rID0gMDtcbiAgICAgICAgbGV0IGhlYWRpbmcgPSAwO1xuICAgICAgICBsZXQgYXR0aXR1ZGUgPSAwO1xuICAgICAgICBjb25zdCB0ZXN0ID0geCAqIHkgKyB6ICogdztcbiAgICAgICAgaWYgKHRlc3QgPiAwLjQ5OTk5OSkge1xuICAgICAgICAgICAgYmFuayA9IDA7IC8vIGRlZmF1bHQgdG8gemVyb1xuICAgICAgICAgICAgaGVhZGluZyA9IHRvRGVncmVlKDIgKiBNYXRoLmF0YW4yKHgsIHcpKTtcbiAgICAgICAgICAgIGF0dGl0dWRlID0gOTA7XG4gICAgICAgIH0gZWxzZSBpZiAodGVzdCA8IC0wLjQ5OTk5OSkge1xuICAgICAgICAgICAgYmFuayA9IDA7IC8vIGRlZmF1bHQgdG8gemVyb1xuICAgICAgICAgICAgaGVhZGluZyA9IC10b0RlZ3JlZSgyICogTWF0aC5hdGFuMih4LCB3KSk7XG4gICAgICAgICAgICBhdHRpdHVkZSA9IC05MDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHNxeCA9IHggKiB4O1xuICAgICAgICAgICAgY29uc3Qgc3F5ID0geSAqIHk7XG4gICAgICAgICAgICBjb25zdCBzcXogPSB6ICogejtcbiAgICAgICAgICAgIGJhbmsgPSB0b0RlZ3JlZShNYXRoLmF0YW4yKDIgKiB4ICogdyAtIDIgKiB5ICogeiwgMSAtIDIgKiBzcXggLSAyICogc3F6KSk7XG4gICAgICAgICAgICBoZWFkaW5nID0gdG9EZWdyZWUoTWF0aC5hdGFuMigyICogeSAqIHcgLSAyICogeCAqIHosIDEgLSAyICogc3F5IC0gMiAqIHNxeikpO1xuICAgICAgICAgICAgYXR0aXR1ZGUgPSB0b0RlZ3JlZShNYXRoLmFzaW4oMiAqIHRlc3QpKTtcbiAgICAgICAgICAgIGlmIChvdXRlclopIHtcbiAgICAgICAgICAgICAgICBiYW5rID0gLTE4MCAqIE1hdGguc2lnbihiYW5rICsgMWUtNikgKyBiYW5rO1xuICAgICAgICAgICAgICAgIGhlYWRpbmcgPSAtMTgwICogTWF0aC5zaWduKGhlYWRpbmcgKyAxZS02KSArIGhlYWRpbmc7XG4gICAgICAgICAgICAgICAgYXR0aXR1ZGUgPSAxODAgKiBNYXRoLnNpZ24oYXR0aXR1ZGUgKyAxZS02KSAtIGF0dGl0dWRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG91dC54ID0gYmFuazsgb3V0LnkgPSBoZWFkaW5nOyBvdXQueiA9IGF0dGl0dWRlO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDb252ZXJ0cyBxdWF0ZXJuaW9uIHRvIGFuIGFycmF5XG4gICAgICogQHpoIOWbm+WFg+aVsOi9rOaVsOe7hFxuICAgICAqIEBwYXJhbSBvZnMgQXJyYXkgU3RhcnQgT2Zmc2V0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0b0FycmF5PE91dD4gKG91dDogT3V0LCBxOiBJUXVhdExpa2UsIG9mcyA9IDApIHtcbiAgICAgICAgb3V0W29mcyArIDBdID0gcS54O1xuICAgICAgICBvdXRbb2ZzICsgMV0gPSBxLnk7XG4gICAgICAgIG91dFtvZnMgKyAyXSA9IHEuejtcbiAgICAgICAgb3V0W29mcyArIDNdID0gcS53O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBBcnJheSB0byBhIHF1YXRlcm5pb25cbiAgICAgKiBAemgg5pWw57uE6L2s5Zub5YWD5pWwXG4gICAgICogQHBhcmFtIG9mcyBBcnJheSBTdGFydCBPZmZzZXRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21BcnJheSAob3V0OiBJUXVhdExpa2UsIGFyciwgb2ZzID0gMCkge1xuICAgICAgICBvdXQueCA9IGFycltvZnMgKyAwXTtcbiAgICAgICAgb3V0LnkgPSBhcnJbb2ZzICsgMV07XG4gICAgICAgIG91dC56ID0gYXJyW29mcyArIDJdO1xuICAgICAgICBvdXQudyA9IGFycltvZnMgKyAzXTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2hlY2sgd2hldGhlciB0d28gcXVhdGVybmlvbnMgYXJlIGVxdWFsXG4gICAgICogQHpoIOWbm+WFg+aVsOetieS7t+WIpOaWrVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc3RyaWN0RXF1YWxzIChhOiBJUXVhdExpa2UsIGI6IElRdWF0TGlrZSkge1xuICAgICAgICByZXR1cm4gYS54ID09PSBiLnggJiYgYS55ID09PSBiLnkgJiYgYS56ID09PSBiLnogJiYgYS53ID09PSBiLnc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENoZWNrIHdoZXRoZXIgdHdvIHF1YXRlcm5pb25zIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsXG4gICAgICogQHpoIOaOkumZpOa1rueCueaVsOivr+W3rueahOWbm+WFg+aVsOi/keS8vOetieS7t+WIpOaWrVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZXF1YWxzIChhOiBJUXVhdExpa2UsIGI6IElRdWF0TGlrZSwgZXBzaWxvbiA9IEVQU0lMT04pIHtcbiAgICAgICAgcmV0dXJuIChNYXRoLmFicyhhLnggLSBiLngpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEueCksIE1hdGguYWJzKGIueCkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLnkgLSBiLnkpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEueSksIE1hdGguYWJzKGIueSkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLnogLSBiLnopIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEueiksIE1hdGguYWJzKGIueikpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLncgLSBiLncpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEudyksIE1hdGguYWJzKGIudykpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4geCBjb21wb25lbnQuXG4gICAgICogQHpoIHgg5YiG6YeP44CCXG4gICAgICovXG4gICAgcHVibGljIGRlY2xhcmUgeDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQGVuIHkgY29tcG9uZW50LlxuICAgICAqIEB6aCB5IOWIhumHj+OAglxuICAgICAqL1xuICAgIHB1YmxpYyBkZWNsYXJlIHk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiB6IGNvbXBvbmVudC5cbiAgICAgKiBAemggeiDliIbph4/jgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSB6OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAZW4gdyBjb21wb25lbnQuXG4gICAgICogQHpoIHcg5YiG6YeP44CCXG4gICAgICovXG4gICAgcHVibGljIGRlY2xhcmUgdzogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IgKG90aGVyOiBRdWF0KTtcblxuICAgIGNvbnN0cnVjdG9yICh4PzogbnVtYmVyLCB5PzogbnVtYmVyLCB6PzogbnVtYmVyLCB3PzogbnVtYmVyKTtcblxuICAgIGNvbnN0cnVjdG9yICh4PzogbnVtYmVyIHwgSVF1YXRMaWtlLCB5PzogbnVtYmVyLCB6PzogbnVtYmVyLCB3PzogbnVtYmVyKSB7O1xuICAgICAgICBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHgueDtcbiAgICAgICAgICAgIHRoaXMueSA9IHgueTtcbiAgICAgICAgICAgIHRoaXMueiA9IHguejtcbiAgICAgICAgICAgIHRoaXMudyA9IHgudztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHggfHwgMDtcbiAgICAgICAgICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgICAgICAgICAgIHRoaXMueiA9IHogfHwgMDtcbiAgICAgICAgICAgIHRoaXMudyA9IHcgPz8gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBjbG9uZSB0aGUgY3VycmVudCBRdWF0XG4gICAgICogQHpoIOWFi+mahuW9k+WJjeWbm+WFg+aVsOOAglxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9uZSAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUXVhdCh0aGlzLngsIHRoaXMueSwgdGhpcy56LCB0aGlzLncpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXQgdmFsdWVzIHdpdGggYW5vdGhlciBxdWF0ZXJuaW9uXG4gICAgICogQHpoIOiuvue9ruW9k+WJjeWbm+WFg+aVsOS9v+WFtuS4juaMh+WumuWbm+WFg+aVsOebuOetieOAglxuICAgICAqIEBwYXJhbSBvdGhlciBTcGVjaWZpZWQgcXVhdGVybmlvblxuICAgICAqIEByZXR1cm5zIGB0aGlzYFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgKG90aGVyOiBRdWF0KTogUXVhdDtcblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXQgdGhlIHZhbHVlIG9mIGVhY2ggY29tcG9uZW50IG9mIHRoZSBjdXJyZW50IHF1YXRlcm5pb25cbiAgICAgKiBAemgg6K6+572u5b2T5YmN5Zub5YWD5pWw5oyH5a6a5YWD57Sg5YC844CCXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgcHVibGljIHNldCAoeD86IG51bWJlciwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcik6IFF1YXQ7XG5cbiAgICBwdWJsaWMgc2V0ICh4PzogbnVtYmVyIHwgUXVhdCwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcikge1xuICAgICAgICBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHgueDtcbiAgICAgICAgICAgIHRoaXMueSA9IHgueTtcbiAgICAgICAgICAgIHRoaXMueiA9IHguejtcbiAgICAgICAgICAgIHRoaXMudyA9IHgudztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHggfHwgMDtcbiAgICAgICAgICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgICAgICAgICAgIHRoaXMueiA9IHogfHwgMDtcbiAgICAgICAgICAgIHRoaXMudyA9IHcgPz8gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2hlY2sgd2hldGhlciB0aGUgcXVhdGVybmlvbiBhcHByb3hpbWF0ZWx5IGVxdWFscyBhbm90aGVyIG9uZVxuICAgICAqIEB6aCDliKTmlq3lvZPliY3lm5vlhYPmlbDmmK/lkKblnKjor6/lt67ojIPlm7TlhoXkuI7mjIflrprlkJHph4/nm7jnrYnjgIJcbiAgICAgKiBAcGFyYW0gb3RoZXIgQ29tcGFyYXRpdmUgcXVhdGVybmlvblxuICAgICAqIEBwYXJhbSBlcHNpbG9uIFRoZSBlcnJvciBhbGxvd2VkLiBJdGBzIHNob3VsZCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuXG4gICAgICogQHJldHVybnMgUmV0dXJucyBgdHJ1ZScgd2hlbiB0aGUgY29tcG9uZW50cyBvZiB0aGUgdHdvIHF1YXRlcm5pb25zIGFyZSBlcXVhbCB3aXRoaW4gdGhlIHNwZWNpZmllZCBlcnJvciByYW5nZTsgb3RoZXJ3aXNlLCByZXR1cm5zIGBmYWxzZScuXG4gICAgICovXG4gICAgcHVibGljIGVxdWFscyAob3RoZXI6IFF1YXQsIGVwc2lsb24gPSBFUFNJTE9OKSB7XG4gICAgICAgIHJldHVybiAoTWF0aC5hYnModGhpcy54IC0gb3RoZXIueCkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy54KSwgTWF0aC5hYnMob3RoZXIueCkpXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnkgLSBvdGhlci55KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLnkpLCBNYXRoLmFicyhvdGhlci55KSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueiAtIG90aGVyLnopIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueiksIE1hdGguYWJzKG90aGVyLnopKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy53IC0gb3RoZXIudykgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy53KSwgTWF0aC5hYnMob3RoZXIudykpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2hlY2sgd2hldGhlciB0aGUgY3VycmVudCBxdWF0ZXJuaW9uIHN0cmljdGx5IGVxdWFscyBvdGhlciBxdWF0ZXJuaW9uXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeWbm+WFg+aVsOaYr+WQpuS4juaMh+WumuWbm+WFg+aVsOebuOetieOAglxuICAgICAqIEBwYXJhbSBvdGhlciBDb21wYXJhdGl2ZSBxdWF0ZXJuaW9uXG4gICAgICogQHJldHVybnMgUmV0dXJucyBgdHJ1ZScgd2hlbiB0aGUgY29tcG9uZW50cyBvZiB0aGUgdHdvIHF1YXRlcm5pb25zIGFyZSBlcXVhbCB3aXRoaW4gdGhlIHNwZWNpZmllZCBlcnJvciByYW5nZTsgb3RoZXJ3aXNlLCByZXR1cm5zIGBmYWxzZScuXG4gICAgICovXG4gICAgcHVibGljIHN0cmljdEVxdWFscyAob3RoZXI6IFF1YXQpIHtcbiAgICAgICAgcmV0dXJuIG90aGVyICYmIHRoaXMueCA9PT0gb3RoZXIueCAmJiB0aGlzLnkgPT09IG90aGVyLnkgJiYgdGhpcy56ID09PSBvdGhlci56ICYmIHRoaXMudyA9PT0gb3RoZXIudztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ29udmVydCBxdWF0ZXJuaW9uIHRvIEV1bGVyIGFuZ2xlc1xuICAgICAqIEB6aCDlsIblvZPliY3lm5vlhYPmlbDovazljJbkuLrmrKfmi4nop5LvvIh4LXkteu+8ieW5tui1i+WAvOe7meWHuuWPo+WQkemHj+OAglxuICAgICAqIEBwYXJhbSBvdXQgdGhlIG91dHB1dCB2ZWN0b3JcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0RXVsZXJBbmdsZXMgKG91dDogVmVjMykge1xuICAgICAgICByZXR1cm4gUXVhdC50b0V1bGVyKG91dCwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZSB0aGUgbGluZWFyIGludGVycG9sYXRpb24gcmVzdWx0IGJldHdlZW4gdGhpcyBxdWF0ZXJuaW9uIGFuZCBhbm90aGVyIG9uZSB3aXRoIGdpdmVuIHJhdGlvXG4gICAgICogQHpoIOagueaNruaMh+WumueahOaPkuWAvOavlOeOh++8jOS7juW9k+WJjeWbm+WFg+aVsOWIsOebruagh+Wbm+WFg+aVsOS5i+mXtOWBmue6v+aAp+aPkuWAvOOAglxuICAgICAqIEBwYXJhbSB0byBUaGUgdGFyZ2V0IHF1YXRlcm5pb25cbiAgICAgKiBAcGFyYW0gcmF0aW8gVGhlIGludGVycG9sYXRpb24gY29lZmZpY2llbnQuIFRoZSByYW5nZSBpcyBbMCwxXS5cbiAgICAgKi9cbiAgICBwdWJsaWMgbGVycCAodG86IFF1YXQsIHJhdGlvOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54ICs9IHJhdGlvICogKHRvLnggLSB0aGlzLngpO1xuICAgICAgICB0aGlzLnkgKz0gcmF0aW8gKiAodG8ueSAtIHRoaXMueSk7XG4gICAgICAgIHRoaXMueiArPSByYXRpbyAqICh0by56IC0gdGhpcy56KTtcbiAgICAgICAgdGhpcy53ICs9IHJhdGlvICogKHRvLncgLSB0aGlzLncpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgc3BoZXJpY2FsIGludGVycG9sYXRpb24gcmVzdWx0IGJldHdlZW4gdGhpcyBxdWF0ZXJuaW9uIGFuZCBhbm90aGVyIG9uZSB3aXRoIHRoZSBnaXZlbiByYXRpb1xuICAgICAqIEB6aCDmoLnmja7mjIflrprnmoTmj5LlgLzmr5TnjofvvIzku47lvZPliY3lm5vlhYPmlbDliLDnm67moIflm5vlhYPmlbDkuYvpl7TlgZrnkIPpnaLmj5LlgLzjgIJcbiAgICAgKiBAcGFyYW0gdG8gVGhlIHRhcmdldCBxdWF0ZXJuaW9uXG4gICAgICogQHBhcmFtIHJhdGlvIFRoZSBpbnRlcnBvbGF0aW9uIGNvZWZmaWNpZW50LiBUaGUgcmFuZ2UgaXMgWzAsMV0uXG4gICAgICovXG4gICAgcHVibGljIHNsZXJwICh0bzogUXVhdCwgcmF0aW86IG51bWJlcikge1xuICAgICAgICByZXR1cm4gUXVhdC5zbGVycCh0aGlzLCB0aGlzLCB0bywgcmF0aW8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgdGhlIHF1YXRlcm5pb25cbiAgICAgKiBAemgg5rGC5Zub5YWD5pWw6ZW/5bqmXG4gICAgICovXG4gICAgcHVibGljIGxlbmd0aCAoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56ICsgdGhpcy53ICogdGhpcy53KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhlIHF1YXRlcm5pb25cbiAgICAgKiBAemgg5rGC5Zub5YWD5pWw6ZW/5bqm5bmz5pa5XG4gICAgICovXG4gICAgcHVibGljIGxlbmd0aFNxciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLnogKyB0aGlzLncgKiB0aGlzLnc7XG4gICAgfVxufVxuXG5jb25zdCBxdF8xID0gbmV3IFF1YXQoKTtcbmNvbnN0IHF0XzIgPSBuZXcgUXVhdCgpO1xuY29uc3QgdjNfMSA9IG5ldyBWZWMzKCk7XG5jb25zdCBtM18xID0gbmV3IE1hdDMoKTtcbmNvbnN0IGhhbGZUb1JhZCA9IDAuNSAqIE1hdGguUEkgLyAxODAuMDsiXX0=