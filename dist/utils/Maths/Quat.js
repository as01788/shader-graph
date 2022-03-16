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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlscy9NYXRocy9RdWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUE4QjtBQUU5QixtQ0FBNEM7QUFDNUMsaUNBQThCO0FBRTlCOzs7R0FHRztBQUNGLE1BQWEsSUFBSTtJQTRvQmQsWUFBYSxDQUFzQixFQUFFLENBQVUsRUFBRSxDQUFVLEVBQUUsQ0FBVTtRQUFHLENBQUM7UUFDdkUsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQjthQUFNO1lBQ0gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQUQsQ0FBQyxjQUFELENBQUMsR0FBSSxDQUFDLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBcnBCRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUF5QixDQUFNO1FBQzlDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsSUFB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QXlCLEdBQVEsRUFBRSxDQUFNO1FBQzdELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckUsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBeUIsQ0FBTSxFQUFFLENBQU07UUFDcEQsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxJQUFJLENBQXlCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTSxFQUFFLENBQVM7UUFDMUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQ2xCLEdBQVEsRUFBRSxDQUFhLEVBQUUsQ0FBYSxFQUFFLENBQVM7UUFDOUMsY0FBYztRQUNkLHdEQUF3RDtRQUV4RCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNiLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDYixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWIsY0FBYztRQUNkLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCw4QkFBOEI7UUFDOUIsSUFBSSxLQUFLLEdBQUcsR0FBRyxFQUFFO1lBQ2IsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ2YsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ1QsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ1QsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ1QsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO1NBQ1o7UUFDRCx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxRQUFRLEVBQUU7WUFDMUIsd0JBQXdCO1lBQ3hCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDN0MsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUN4QzthQUFNO1lBQ0gsNkNBQTZDO1lBQzdDLDJDQUEyQztZQUMzQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNqQixNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2Q7UUFDRCx5QkFBeUI7UUFDekIsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNuQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbkMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRW5DLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQXlCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTSxFQUFFLENBQU0sRUFBRSxDQUFNLEVBQUUsQ0FBUztRQUM1RixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBcUQsR0FBUSxFQUFFLENBQVc7UUFDMUYsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5DLG9FQUFvRTtRQUVwRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDdEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUN0QixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQXlCLEdBQVEsRUFBRSxDQUFNO1FBQzVELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDYixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNiLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxHQUFHLENBQXlCLENBQU07UUFDNUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsU0FBUyxDQUF5QixDQUFNO1FBQ2xELE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsU0FBUyxDQUF5QixHQUFRLEVBQUUsQ0FBTTtRQUM1RCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdB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SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFFLEdBQWMsRUFBRSxDQUFZO1FBQy9DLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFFLEdBQWMsRUFBRSxDQUFZO1FBQy9DLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFFLEdBQWMsRUFBRSxDQUFZO1FBQy9DLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsQyxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBRSxHQUFjLEVBQUUsQ0FBWSxFQUFFLE1BQWdCO1FBQ2pFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxJQUFJLEdBQUcsUUFBUSxFQUFFO1lBQ2pCLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxrQkFBa0I7WUFDNUIsT0FBTyxHQUFHLGdCQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUNqQjthQUFNLElBQUksSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ3pCLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxrQkFBa0I7WUFDNUIsT0FBTyxHQUFHLENBQUMsZ0JBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUM7U0FDbEI7YUFBTTtZQUNILE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLElBQUksR0FBRyxnQkFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUUsT0FBTyxHQUFHLGdCQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3RSxRQUFRLEdBQUcsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksTUFBTSxFQUFFO2dCQUNSLElBQUksR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzVDLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7Z0JBQ3JELFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO2FBQzFEO1NBQ0o7UUFDRCxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDaEQsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQU8sR0FBUSxFQUFFLENBQVksRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUN2RCxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUUsR0FBYyxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNqRCxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBRSxDQUFZLEVBQUUsQ0FBWTtRQUNsRCxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBRSxDQUFZLEVBQUUsQ0FBWSxFQUFFLE9BQU8sR0FBRyxlQUFPO1FBQy9ELE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztlQUM3RSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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QUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXQzIH0gZnJvbSBcIi4vTWF0M1wiO1xyXG5pbXBvcnQgeyBJUXVhdExpa2UsIElWZWMzTGlrZSB9IGZyb20gXCIuL3R5cGUtZGVmaW5lXCI7XHJcbmltcG9ydCB7IHRvRGVncmVlLCBFUFNJTE9OIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgVmVjMyB9IGZyb20gXCIuL1ZlYzNcIjtcclxuXHJcbi8qKlxyXG4gKiBAZW4gcXVhdGVybmlvblxyXG4gKiBAemgg5Zub5YWD5pWwXHJcbiAqL1xyXG4gZXhwb3J0IGNsYXNzIFF1YXQge1xyXG4gICAgcHVibGljIHN0YXRpYyBJREVOVElUWSA9IE9iamVjdC5mcmVlemUobmV3IFF1YXQoKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gT2J0YWluIGEgY29weSBvZiB0aGUgZ2l2ZW4gcXVhdGVybmlvblxyXG4gICAgICogQHpoIOiOt+W+l+aMh+WumuWbm+WFg+aVsOeahOaLt+i0nVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsb25lPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUXVhdChhLngsIGEueSwgYS56LCBhLncpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENvcHkgdGhlIGdpdmVuIHF1YXRlcm5pb24gdG8gdGhlIG91dCBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAemgg5aSN5Yi255uu5qCH5Zub5YWD5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29weTxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFF1YXRMaWtlIGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IFF1YXRMaWtlKSB7XHJcbiAgICAgICAgb3V0LnggPSBhLng7XHJcbiAgICAgICAgb3V0LnkgPSBhLnk7XHJcbiAgICAgICAgb3V0LnogPSBhLno7XHJcbiAgICAgICAgb3V0LncgPSBhLnc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIHRoZSBvdXQgcXVhdGVybmlvbiB3aXRoIHZhbHVlcyBvZiBlYWNoIGNvbXBvbmVudFxyXG4gICAgICogQHpoIOiuvue9ruWbm+WFg+aVsOWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyKSB7XHJcbiAgICAgICAgb3V0LnggPSB4O1xyXG4gICAgICAgIG91dC55ID0geTtcclxuICAgICAgICBvdXQueiA9IHo7XHJcbiAgICAgICAgb3V0LncgPSB3O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0cyB0aGUgb3V0IHF1YXRlcm5pb24gdG8gYW4gaWRlbnRpdHkgcXVhdGVybmlvblxyXG4gICAgICogQHpoIOWwhuebruagh+i1i+WAvOS4uuWNleS9jeWbm+WFg+aVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGlkZW50aXR5PE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSAwO1xyXG4gICAgICAgIG91dC55ID0gMDtcclxuICAgICAgICBvdXQueiA9IDA7XHJcbiAgICAgICAgb3V0LncgPSAxO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0cyB0aGUgb3V0IHF1YXRlcm5pb24gd2l0aCB0aGUgc2hvcnRlc3QgcGF0aCBvcmllbnRhdGlvbiBiZXR3ZWVuIHR3byB2ZWN0b3JzLCBjb25zaWRlcmluZyBib3RoIHZlY3RvcnMgbm9ybWFsaXplZFxyXG4gICAgICogQHpoIOiuvue9ruWbm+WFg+aVsOS4uuS4pOWQkemHj+mXtOeahOacgOefrei3r+W+hOaXi+i9rO+8jOm7mOiupOS4pOWQkemHj+mDveW3suW9kuS4gOWMllxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJvdGF0aW9uVG88T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IFZlY0xpa2UsIGI6IFZlY0xpa2UpIHtcclxuICAgICAgICBjb25zdCBkb3QgPSBWZWMzLmRvdChhLCBiKTtcclxuICAgICAgICBpZiAoZG90IDwgLTAuOTk5OTk5KSB7XHJcbiAgICAgICAgICAgIFZlYzMuY3Jvc3ModjNfMSwgVmVjMy5VTklUX1gsIGEpO1xyXG4gICAgICAgICAgICBpZiAodjNfMS5sZW5ndGgoKSA8IDAuMDAwMDAxKSB7XHJcbiAgICAgICAgICAgICAgICBWZWMzLmNyb3NzKHYzXzEsIFZlYzMuVU5JVF9ZLCBhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBWZWMzLm5vcm1hbGl6ZSh2M18xLCB2M18xKTtcclxuICAgICAgICAgICAgUXVhdC5mcm9tQXhpc0FuZ2xlKG91dCwgdjNfMSwgTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkb3QgPiAwLjk5OTk5OSkge1xyXG4gICAgICAgICAgICBvdXQueCA9IDA7XHJcbiAgICAgICAgICAgIG91dC55ID0gMDtcclxuICAgICAgICAgICAgb3V0LnogPSAwO1xyXG4gICAgICAgICAgICBvdXQudyA9IDE7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgVmVjMy5jcm9zcyh2M18xLCBhLCBiKTtcclxuICAgICAgICAgICAgb3V0LnggPSB2M18xLng7XHJcbiAgICAgICAgICAgIG91dC55ID0gdjNfMS55O1xyXG4gICAgICAgICAgICBvdXQueiA9IHYzXzEuejtcclxuICAgICAgICAgICAgb3V0LncgPSAxICsgZG90O1xyXG4gICAgICAgICAgICByZXR1cm4gUXVhdC5ub3JtYWxpemUob3V0LCBvdXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBHZXRzIHRoZSByb3RhdGlvbiBheGlzIGFuZCB0aGUgYXJjIG9mIHJvdGF0aW9uIGZyb20gdGhlIHF1YXRlcm5pb25cclxuICAgICAqIEB6aCDojrflj5blm5vlhYPmlbDnmoTml4vovazovbTlkozml4vovazlvKfluqZcclxuICAgICAqIEBwYXJhbSBvdXRBeGlzIG91dHB1dCBheGlzXHJcbiAgICAgKiBAcGFyYW0gcSBpbnB1dCBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAcmV0dXJuIHJhZGl1cyBvZiByb3RhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEF4aXNBbmdsZTxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXRBeGlzOiBWZWNMaWtlLCBxOiBPdXQpIHtcclxuICAgICAgICBjb25zdCByYWQgPSBNYXRoLmFjb3MocS53KSAqIDIuMDtcclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkIC8gMi4wKTtcclxuICAgICAgICBpZiAocyAhPT0gMC4wKSB7XHJcbiAgICAgICAgICAgIG91dEF4aXMueCA9IHEueCAvIHM7XHJcbiAgICAgICAgICAgIG91dEF4aXMueSA9IHEueSAvIHM7XHJcbiAgICAgICAgICAgIG91dEF4aXMueiA9IHEueiAvIHM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gSWYgcyBpcyB6ZXJvLCByZXR1cm4gYW55IGF4aXMgKG5vIHJvdGF0aW9uIC0gYXhpcyBkb2VzIG5vdCBtYXR0ZXIpXHJcbiAgICAgICAgICAgIG91dEF4aXMueCA9IDE7XHJcbiAgICAgICAgICAgIG91dEF4aXMueSA9IDA7XHJcbiAgICAgICAgICAgIG91dEF4aXMueiA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gUXVhdGVybmlvbiBtdWx0aXBsaWNhdGlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgcXVhdGVybmlvblxyXG4gICAgICogQHpoIOWbm+WFg+aVsOS5mOazlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG11bHRpcGx5PE91dCBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2VfMSBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2VfMiBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBRdWF0TGlrZV8xLCBiOiBRdWF0TGlrZV8yKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IGEueCAqIGIudyArIGEudyAqIGIueCArIGEueSAqIGIueiAtIGEueiAqIGIueTtcclxuICAgICAgICBjb25zdCB5ID0gYS55ICogYi53ICsgYS53ICogYi55ICsgYS56ICogYi54IC0gYS54ICogYi56O1xyXG4gICAgICAgIGNvbnN0IHogPSBhLnogKiBiLncgKyBhLncgKiBiLnogKyBhLnggKiBiLnkgLSBhLnkgKiBiLng7XHJcbiAgICAgICAgY29uc3QgdyA9IGEudyAqIGIudyAtIGEueCAqIGIueCAtIGEueSAqIGIueSAtIGEueiAqIGIuejtcclxuICAgICAgICBvdXQueCA9IHg7XHJcbiAgICAgICAgb3V0LnkgPSB5O1xyXG4gICAgICAgIG91dC56ID0gejtcclxuICAgICAgICBvdXQudyA9IHc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBRdWF0ZXJuaW9uIHNjYWxhciBtdWx0aXBsaWNhdGlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgcXVhdGVybmlvblxyXG4gICAgICogQHpoIOWbm+WFg+aVsOagh+mHj+S5mOazlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG11bHRpcGx5U2NhbGFyPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IG51bWJlcikge1xyXG4gICAgICAgIG91dC54ID0gYS54ICogYjtcclxuICAgICAgICBvdXQueSA9IGEueSAqIGI7XHJcbiAgICAgICAgb3V0LnogPSBhLnogKiBiO1xyXG4gICAgICAgIG91dC53ID0gYS53ICogYjtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFF1YXRlcm5pb24gbXVsdGlwbGljYXRpb24gYW5kIGFkZGl0aW9uOiBBICsgQiAqIHNjYWxlXHJcbiAgICAgKiBAemgg5Zub5YWD5pWw5LmY5Yqg77yaQSArIEIgKiBzY2FsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNjYWxlQW5kQWRkPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgc2NhbGU6IG51bWJlcikge1xyXG4gICAgICAgIG91dC54ID0gYS54ICsgYi54ICogc2NhbGU7XHJcbiAgICAgICAgb3V0LnkgPSBhLnkgKyBiLnkgKiBzY2FsZTtcclxuICAgICAgICBvdXQueiA9IGEueiArIGIueiAqIHNjYWxlO1xyXG4gICAgICAgIG91dC53ID0gYS53ICsgYi53ICogc2NhbGU7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIHRoZSBvdXQgcXVhdGVybmlvbiB0byByZXByZXNlbnQgYSByYWRpYW4gcm90YXRpb24gYXJvdW5kIHggYXhpc1xyXG4gICAgICogQHpoIOe7lSBYIOi9tOaXi+i9rOaMh+WumuWbm+WFg+aVsFxyXG4gICAgICogQHBhcmFtIHJhZCByYWRpdXMgb2Ygcm90YXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByb3RhdGVYPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmFkICo9IDAuNTtcclxuXHJcbiAgICAgICAgY29uc3QgYnggPSBNYXRoLnNpbihyYWQpO1xyXG4gICAgICAgIGNvbnN0IGJ3ID0gTWF0aC5jb3MocmFkKTtcclxuICAgICAgICBjb25zdCB7IHgsIHksIHosIHcgfSA9IGE7XHJcblxyXG4gICAgICAgIG91dC54ID0geCAqIGJ3ICsgdyAqIGJ4O1xyXG4gICAgICAgIG91dC55ID0geSAqIGJ3ICsgeiAqIGJ4O1xyXG4gICAgICAgIG91dC56ID0geiAqIGJ3IC0geSAqIGJ4O1xyXG4gICAgICAgIG91dC53ID0gdyAqIGJ3IC0geCAqIGJ4O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0cyB0aGUgb3V0IHF1YXRlcm5pb24gdG8gcmVwcmVzZW50IGEgcmFkaWFuIHJvdGF0aW9uIGFyb3VuZCB5IGF4aXNcclxuICAgICAqIEB6aCDnu5UgWSDovbTml4vovazmjIflrprlm5vlhYPmlbBcclxuICAgICAqIEBwYXJhbSByYWQgcmFkaXVzIG9mIHJvdGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcm90YXRlWTxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJhZCAqPSAwLjU7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ5ID0gTWF0aC5zaW4ocmFkKTtcclxuICAgICAgICBjb25zdCBidyA9IE1hdGguY29zKHJhZCk7XHJcbiAgICAgICAgY29uc3QgeyB4LCB5LCB6LCB3IH0gPSBhO1xyXG5cclxuICAgICAgICBvdXQueCA9IHggKiBidyAtIHogKiBieTtcclxuICAgICAgICBvdXQueSA9IHkgKiBidyArIHcgKiBieTtcclxuICAgICAgICBvdXQueiA9IHogKiBidyArIHggKiBieTtcclxuICAgICAgICBvdXQudyA9IHcgKiBidyAtIHkgKiBieTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFNldHMgdGhlIG91dCBxdWF0ZXJuaW9uIHRvIHJlcHJlc2VudCBhIHJhZGlhbiByb3RhdGlvbiBhcm91bmQgeiBheGlzXHJcbiAgICAgKiBAemgg57uVIFog6L205peL6L2s5oyH5a6a5Zub5YWD5pWwXHJcbiAgICAgKiBAcGFyYW0gcmFkIHJhZGl1cyBvZiByb3RhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJvdGF0ZVo8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIpIHtcclxuICAgICAgICByYWQgKj0gMC41O1xyXG5cclxuICAgICAgICBjb25zdCBieiA9IE1hdGguc2luKHJhZCk7XHJcbiAgICAgICAgY29uc3QgYncgPSBNYXRoLmNvcyhyYWQpO1xyXG4gICAgICAgIGNvbnN0IHsgeCwgeSwgeiwgdyB9ID0gYTtcclxuXHJcbiAgICAgICAgb3V0LnggPSB4ICogYncgKyB5ICogYno7XHJcbiAgICAgICAgb3V0LnkgPSB5ICogYncgLSB4ICogYno7XHJcbiAgICAgICAgb3V0LnogPSB6ICogYncgKyB3ICogYno7XHJcbiAgICAgICAgb3V0LncgPSB3ICogYncgLSB6ICogYno7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIHRoZSBvdXQgcXVhdGVybmlvbiB0byByZXByZXNlbnQgYSByYWRpYW4gcm90YXRpb24gYXJvdW5kIGEgZ2l2ZW4gcm90YXRpb24gYXhpcyBpbiB3b3JsZCBzcGFjZVxyXG4gICAgICogQHpoIOe7leS4lueVjOepuumXtOS4i+aMh+Wumui9tOaXi+i9rOWbm+WFg+aVsFxyXG4gICAgICogQHBhcmFtIGF4aXMgYXhpcyBvZiByb3RhdGlvbiwgbm9ybWFsaXplZCBieSBkZWZhdWx0XHJcbiAgICAgKiBAcGFyYW0gcmFkIHJhZGl1cyBvZiByb3RhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJvdGF0ZUFyb3VuZDxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcm90OiBPdXQsIGF4aXM6IFZlY0xpa2UsIHJhZDogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gZ2V0IGludi1heGlzIChsb2NhbCB0byByb3QpXHJcbiAgICAgICAgUXVhdC5pbnZlcnQocXRfMSwgcm90KTtcclxuICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQodjNfMSwgYXhpcywgcXRfMSk7XHJcbiAgICAgICAgLy8gcm90YXRlIGJ5IGludi1heGlzXHJcbiAgICAgICAgUXVhdC5mcm9tQXhpc0FuZ2xlKHF0XzEsIHYzXzEsIHJhZCk7XHJcbiAgICAgICAgUXVhdC5tdWx0aXBseShvdXQsIHJvdCwgcXRfMSk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIHRoZSBvdXQgcXVhdGVybmlvbiB0byByZXByZXNlbnQgYSByYWRpYW4gcm90YXRpb24gYXJvdW5kIGEgZ2l2ZW4gcm90YXRpb24gYXhpcyBpbiBsb2NhbCBzcGFjZVxyXG4gICAgICogQHpoIOe7leacrOWcsOepuumXtOS4i+aMh+Wumui9tOaXi+i9rOWbm+WFg+aVsFxyXG4gICAgICogQHBhcmFtIGF4aXMgYXhpcyBvZiByb3RhdGlvblxyXG4gICAgICogQHBhcmFtIHJhZCByYWRpdXMgb2Ygcm90YXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByb3RhdGVBcm91bmRMb2NhbDxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcm90OiBPdXQsIGF4aXM6IFZlY0xpa2UsIHJhZDogbnVtYmVyKSB7XHJcbiAgICAgICAgUXVhdC5mcm9tQXhpc0FuZ2xlKHF0XzEsIGF4aXMsIHJhZCk7XHJcbiAgICAgICAgUXVhdC5tdWx0aXBseShvdXQsIHJvdCwgcXRfMSk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSB3IGNvbXBvbmVudCB3aXRoIHh5eiBjb21wb25lbnRzLCBjb25zaWRlcmluZyB0aGUgZ2l2ZW4gcXVhdGVybmlvbiBub3JtYWxpemVkXHJcbiAgICAgKiBAemgg5qC55o2uIHh5eiDliIbph4/orqHnrpcgdyDliIbph4/vvIzpu5jorqTlt7LlvZLkuIDljJZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjYWxjdWxhdGVXPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IGEueDtcclxuICAgICAgICBvdXQueSA9IGEueTtcclxuICAgICAgICBvdXQueiA9IGEuejtcclxuICAgICAgICBvdXQudyA9IE1hdGguc3FydChNYXRoLmFicygxLjAgLSBhLnggKiBhLnggLSBhLnkgKiBhLnkgLSBhLnogKiBhLnopKTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFF1YXRlcm5pb24gZG90IHByb2R1Y3QgKHNjYWxhciBwcm9kdWN0KVxyXG4gICAgICogQHpoIOWbm+WFg+aVsOeCueenr++8iOaVsOmHj+enr++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRvdDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIHJldHVybiBhLnggKiBiLnggKyBhLnkgKiBiLnkgKyBhLnogKiBiLnogKyBhLncgKiBiLnc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gRWxlbWVudCBieSBlbGVtZW50IGxpbmVhciBpbnRlcnBvbGF0aW9uOiBBICsgdCAqIChCIC0gQSlcclxuICAgICAqIEB6aCDpgJDlhYPntKDnur/mgKfmj5LlgLzvvJogQSArIHQgKiAoQiAtIEEpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbGVycDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHQ6IG51bWJlcikge1xyXG4gICAgICAgIG91dC54ID0gYS54ICsgdCAqIChiLnggLSBhLngpO1xyXG4gICAgICAgIG91dC55ID0gYS55ICsgdCAqIChiLnkgLSBhLnkpO1xyXG4gICAgICAgIG91dC56ID0gYS56ICsgdCAqIChiLnogLSBhLnopO1xyXG4gICAgICAgIG91dC53ID0gYS53ICsgdCAqIChiLncgLSBhLncpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU3BoZXJpY2FsIHF1YXRlcm5pb24gaW50ZXJwb2xhdGlvblxyXG4gICAgICogQHpoIOWbm+WFg+aVsOeQg+mdouaPkuWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNsZXJwPE91dCBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2VfMSBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2VfMiBleHRlbmRzIElRdWF0TGlrZT5cclxuICAgIChvdXQ6IE91dCwgYTogUXVhdExpa2VfMSwgYjogUXVhdExpa2VfMiwgdDogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gYmVuY2htYXJrczpcclxuICAgICAgICAvLyAgICBodHRwOi8vanNwZXJmLmNvbS9xdWF0ZXJuaW9uLXNsZXJwLWltcGxlbWVudGF0aW9uc1xyXG5cclxuICAgICAgICBsZXQgc2NhbGUwID0gMDtcclxuICAgICAgICBsZXQgc2NhbGUxID0gMDtcclxuICAgICAgICBsZXQgYnggPSBiLng7XHJcbiAgICAgICAgbGV0IGJ5ID0gYi55O1xyXG4gICAgICAgIGxldCBieiA9IGIuejtcclxuICAgICAgICBsZXQgYncgPSBiLnc7XHJcblxyXG4gICAgICAgIC8vIGNhbGMgY29zaW5lXHJcbiAgICAgICAgbGV0IGNvc29tID0gYS54ICogYi54ICsgYS55ICogYi55ICsgYS56ICogYi56ICsgYS53ICogYi53O1xyXG4gICAgICAgIC8vIGFkanVzdCBzaWducyAoaWYgbmVjZXNzYXJ5KVxyXG4gICAgICAgIGlmIChjb3NvbSA8IDAuMCkge1xyXG4gICAgICAgICAgICBjb3NvbSA9IC1jb3NvbTtcclxuICAgICAgICAgICAgYnggPSAtYng7XHJcbiAgICAgICAgICAgIGJ5ID0gLWJ5O1xyXG4gICAgICAgICAgICBieiA9IC1iejtcclxuICAgICAgICAgICAgYncgPSAtYnc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBjb2VmZmljaWVudHNcclxuICAgICAgICBpZiAoKDEuMCAtIGNvc29tKSA+IDAuMDAwMDAxKSB7XHJcbiAgICAgICAgICAgIC8vIHN0YW5kYXJkIGNhc2UgKHNsZXJwKVxyXG4gICAgICAgICAgICBjb25zdCBvbWVnYSA9IE1hdGguYWNvcyhjb3NvbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpbm9tID0gTWF0aC5zaW4ob21lZ2EpO1xyXG4gICAgICAgICAgICBzY2FsZTAgPSBNYXRoLnNpbigoMS4wIC0gdCkgKiBvbWVnYSkgLyBzaW5vbTtcclxuICAgICAgICAgICAgc2NhbGUxID0gTWF0aC5zaW4odCAqIG9tZWdhKSAvIHNpbm9tO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFwiZnJvbVwiIGFuZCBcInRvXCIgcXVhdGVybmlvbnMgYXJlIHZlcnkgY2xvc2VcclxuICAgICAgICAgICAgLy8gIC4uLiBzbyB3ZSBjYW4gZG8gYSBsaW5lYXIgaW50ZXJwb2xhdGlvblxyXG4gICAgICAgICAgICBzY2FsZTAgPSAxLjAgLSB0O1xyXG4gICAgICAgICAgICBzY2FsZTEgPSB0O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjYWxjdWxhdGUgZmluYWwgdmFsdWVzXHJcbiAgICAgICAgb3V0LnggPSBzY2FsZTAgKiBhLnggKyBzY2FsZTEgKiBieDtcclxuICAgICAgICBvdXQueSA9IHNjYWxlMCAqIGEueSArIHNjYWxlMSAqIGJ5O1xyXG4gICAgICAgIG91dC56ID0gc2NhbGUwICogYS56ICsgc2NhbGUxICogYno7XHJcbiAgICAgICAgb3V0LncgPSBzY2FsZTAgKiBhLncgKyBzY2FsZTEgKiBidztcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTcGhlcmljYWwgcXVhdGVybmlvbiBpbnRlcnBvbGF0aW9uIHdpdGggdHdvIGNvbnRyb2wgcG9pbnRzXHJcbiAgICAgKiBAemgg5bim5Lik5Liq5o6n5Yi254K555qE5Zub5YWD5pWw55CD6Z2i5o+S5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3FsZXJwPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgYzogT3V0LCBkOiBPdXQsIHQ6IG51bWJlcikge1xyXG4gICAgICAgIFF1YXQuc2xlcnAocXRfMSwgYSwgZCwgdCk7XHJcbiAgICAgICAgUXVhdC5zbGVycChxdF8yLCBiLCBjLCB0KTtcclxuICAgICAgICBRdWF0LnNsZXJwKG91dCwgcXRfMSwgcXRfMiwgMiAqIHQgKiAoMSAtIHQpKTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFNldHMgdGhlIGludmVyc2Ugb2YgdGhlIGdpdmVuIHF1YXRlcm5pb24gdG8gb3V0IHF1YXRlcm5pb25cclxuICAgICAqIEB6aCDlm5vlhYPmlbDmsYLpgIZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnZlcnQ8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZSBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBRdWF0TGlrZSkge1xyXG4gICAgICAgIGNvbnN0IGRvdCA9IGEueCAqIGEueCArIGEueSAqIGEueSArIGEueiAqIGEueiArIGEudyAqIGEudztcclxuICAgICAgICBjb25zdCBpbnZEb3QgPSBkb3QgPyAxLjAgLyBkb3QgOiAwO1xyXG5cclxuICAgICAgICAvLyBUT0RPOiBXb3VsZCBiZSBmYXN0ZXIgdG8gcmV0dXJuIFswLDAsMCwwXSBpbW1lZGlhdGVseSBpZiBkb3QgPT0gMFxyXG5cclxuICAgICAgICBvdXQueCA9IC1hLnggKiBpbnZEb3Q7XHJcbiAgICAgICAgb3V0LnkgPSAtYS55ICogaW52RG90O1xyXG4gICAgICAgIG91dC56ID0gLWEueiAqIGludkRvdDtcclxuICAgICAgICBvdXQudyA9IGEudyAqIGludkRvdDtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENvbmp1Z2F0aW5nIGEgcXVhdGVybmlvbiwgaXQncyBlcXVpdmFsZW50IHRvIHRoZSBpbnZlcnNlIG9mIHRoZSB1bml0IHF1YXRlcm5pb24sIGJ1dCBtb3JlIGVmZmljaWVudFxyXG4gICAgICogQHpoIOaxguWFsei9reWbm+WFg+aVsO+8jOWvueWNleS9jeWbm+WFg+aVsOS4juaxgumAhuetieS7t++8jOS9huabtOmrmOaViFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbmp1Z2F0ZTxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSAtYS54O1xyXG4gICAgICAgIG91dC55ID0gLWEueTtcclxuICAgICAgICBvdXQueiA9IC1hLno7XHJcbiAgICAgICAgb3V0LncgPSBhLnc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgdGhlIHF1YXRlcm5pb25cclxuICAgICAqIEB6aCDmsYLlm5vlhYPmlbDplb/luqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsZW48T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnogKyBhLncgKiBhLncpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoZSBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAemgg5rGC5Zub5YWD5pWw6ZW/5bqm5bmz5pa5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbGVuZ3RoU3FyPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCkge1xyXG4gICAgICAgIHJldHVybiBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnogKyBhLncgKiBhLnc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gTm9ybWFsaXplIHRoZSBnaXZlbiBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAemgg5b2S5LiA5YyW5Zub5YWD5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbm9ybWFsaXplPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBsZXQgbGVuID0gYS54ICogYS54ICsgYS55ICogYS55ICsgYS56ICogYS56ICsgYS53ICogYS53O1xyXG4gICAgICAgIGlmIChsZW4gPiAwKSB7XHJcbiAgICAgICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcclxuICAgICAgICAgICAgb3V0LnggPSBhLnggKiBsZW47XHJcbiAgICAgICAgICAgIG91dC55ID0gYS55ICogbGVuO1xyXG4gICAgICAgICAgICBvdXQueiA9IGEueiAqIGxlbjtcclxuICAgICAgICAgICAgb3V0LncgPSBhLncgKiBsZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlZCB0aGUgcXVhdGVybmlvbiByZXByZXNlbnRzIHRoZSBnaXZlbiBjb29yZGluYXRlcywgY29uc2lkZXJpbmcgYWxsIGdpdmVuIHZlY3RvcnMgYXJlIG5vcm1hbGl6ZWQgYW5kIG11dHVhbGx5IHBlcnBlbmRpY3VsYXJcclxuICAgICAqIEB6aCDmoLnmja7mnKzlnLDlnZDmoIfovbTmnJ3lkJHorqHnrpflm5vlhYPmlbDvvIzpu5jorqTkuInlkJHph4/pg73lt7LlvZLkuIDljJbkuJTnm7jkupLlnoLnm7RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tQXhlczxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgeEF4aXM6IFZlY0xpa2UsIHlBeGlzOiBWZWNMaWtlLCB6QXhpczogVmVjTGlrZSkge1xyXG4gICAgICAgIE1hdDMuc2V0KG0zXzEsXHJcbiAgICAgICAgICAgIHhBeGlzLngsIHhBeGlzLnksIHhBeGlzLnosXHJcbiAgICAgICAgICAgIHlBeGlzLngsIHlBeGlzLnksIHlBeGlzLnosXHJcbiAgICAgICAgICAgIHpBeGlzLngsIHpBeGlzLnksIHpBeGlzLnopO1xyXG4gICAgICAgIHJldHVybiBRdWF0Lm5vcm1hbGl6ZShvdXQsIFF1YXQuZnJvbU1hdDMob3V0LCBtM18xKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgcXVhdGVybmlvbiB3aXRoIHRoZSB1cCBkaXJlY3Rpb24gYW5kIHRoZSBkaXJlY3Rpb24gb2YgdGhlIHZpZXdwb3J0XHJcbiAgICAgKiBAemgg5qC55o2u6KeG5Y+j55qE5YmN5pa55ZCR5ZKM5LiK5pa55ZCR6K6h566X5Zub5YWD5pWwXHJcbiAgICAgKiBAcGFyYW0gdmlldyBUaGUgdmlldyBkaXJlY3Rpb24sIGl0YHMgbXVzdCBiZSBub3JtYWxpemVkLlxyXG4gICAgICogQHBhcmFtIHVwIFRoZSB2aWV3IHVwIGRpcmVjdGlvbiwgaXRgcyBtdXN0IGJlIG5vcm1hbGl6ZWQsIGRlZmF1bHQgdmFsdWUgaXMgKDAsIDEsIDApLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21WaWV3VXA8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHZpZXc6IFZlY0xpa2UsIHVwPzogVmVjMykge1xyXG4gICAgICAgIE1hdDMuZnJvbVZpZXdVcChtM18xLCB2aWV3LCB1cCk7XHJcbiAgICAgICAgcmV0dXJuIFF1YXQubm9ybWFsaXplKG91dCwgUXVhdC5mcm9tTWF0MyhvdXQsIG0zXzEpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBxdWF0ZXJuaW9uIGZyb20gYSBnaXZlbiByb3Rhcnkgc2hhZnQgYW5kIGEgcmFkaWFuIHJvdGF0aW9uIGFyb3VuZCBpdC5cclxuICAgICAqIEB6aCDmoLnmja7ml4vovazovbTlkozml4vovazlvKfluqborqHnrpflm5vlhYPmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tQXhpc0FuZ2xlPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBheGlzOiBWZWNMaWtlLCByYWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJhZCAqPSAwLjU7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7XHJcbiAgICAgICAgb3V0LnggPSBzICogYXhpcy54O1xyXG4gICAgICAgIG91dC55ID0gcyAqIGF4aXMueTtcclxuICAgICAgICBvdXQueiA9IHMgKiBheGlzLno7XHJcbiAgICAgICAgb3V0LncgPSBNYXRoLmNvcyhyYWQpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgcXVhdGVybmlvbiB3aXRoIHRoZSB0aHJlZS1kaW1lbnNpb25hbCB0cmFuc2Zvcm0gbWF0cml4LCBjb25zaWRlcmluZyBubyBzY2FsZSBpbmNsdWRlZCBpbiB0aGUgbWF0cml4XHJcbiAgICAgKiBAemgg5qC55o2u5LiJ57u055+p6Zi15L+h5oGv6K6h566X5Zub5YWD5pWw77yM6buY6K6k6L6T5YWl55+p6Zi15LiN5ZCr5pyJ57yp5pS+5L+h5oGvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbU1hdDM8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIG06IE1hdDMpIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIG0wMCwgbTAzOiBtMDEsIG0wNjogbTAyLFxyXG4gICAgICAgICAgICBtMDE6IG0xMCwgbTA0OiBtMTEsIG0wNzogbTEyLFxyXG4gICAgICAgICAgICBtMDI6IG0yMCwgbTA1OiBtMjEsIG0wODogbTIyLFxyXG4gICAgICAgIH0gPSBtO1xyXG5cclxuICAgICAgICBjb25zdCB0cmFjZSA9IG0wMCArIG0xMSArIG0yMjtcclxuXHJcbiAgICAgICAgaWYgKHRyYWNlID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBzID0gMC41IC8gTWF0aC5zcXJ0KHRyYWNlICsgMS4wKTtcclxuXHJcbiAgICAgICAgICAgIG91dC53ID0gMC4yNSAvIHM7XHJcbiAgICAgICAgICAgIG91dC54ID0gKG0yMSAtIG0xMikgKiBzO1xyXG4gICAgICAgICAgICBvdXQueSA9IChtMDIgLSBtMjApICogcztcclxuICAgICAgICAgICAgb3V0LnogPSAobTEwIC0gbTAxKSAqIHM7XHJcbiAgICAgICAgfSBlbHNlIGlmICgobTAwID4gbTExKSAmJiAobTAwID4gbTIyKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzID0gMi4wICogTWF0aC5zcXJ0KDEuMCArIG0wMCAtIG0xMSAtIG0yMik7XHJcblxyXG4gICAgICAgICAgICBvdXQudyA9IChtMjEgLSBtMTIpIC8gcztcclxuICAgICAgICAgICAgb3V0LnggPSAwLjI1ICogcztcclxuICAgICAgICAgICAgb3V0LnkgPSAobTAxICsgbTEwKSAvIHM7XHJcbiAgICAgICAgICAgIG91dC56ID0gKG0wMiArIG0yMCkgLyBzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobTExID4gbTIyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyLjAgKiBNYXRoLnNxcnQoMS4wICsgbTExIC0gbTAwIC0gbTIyKTtcclxuXHJcbiAgICAgICAgICAgIG91dC53ID0gKG0wMiAtIG0yMCkgLyBzO1xyXG4gICAgICAgICAgICBvdXQueCA9IChtMDEgKyBtMTApIC8gcztcclxuICAgICAgICAgICAgb3V0LnkgPSAwLjI1ICogcztcclxuICAgICAgICAgICAgb3V0LnogPSAobTEyICsgbTIxKSAvIHM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgcyA9IDIuMCAqIE1hdGguc3FydCgxLjAgKyBtMjIgLSBtMDAgLSBtMTEpO1xyXG5cclxuICAgICAgICAgICAgb3V0LncgPSAobTEwIC0gbTAxKSAvIHM7XHJcbiAgICAgICAgICAgIG91dC54ID0gKG0wMiArIG0yMCkgLyBzO1xyXG4gICAgICAgICAgICBvdXQueSA9IChtMTIgKyBtMjEpIC8gcztcclxuICAgICAgICAgICAgb3V0LnogPSAwLjI1ICogcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgcXVhdGVybmlvbiB3aXRoIEV1bGVyIGFuZ2xlcywgdGhlIHJvdGF0aW9uIG9yZGVyIGlzIFlaWFxyXG4gICAgICogQHpoIOagueaNruasp+aLieinkuS/oeaBr+iuoeeul+Wbm+WFg+aVsO+8jOaXi+i9rOmhuuW6j+S4uiBZWlhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tRXVsZXI8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcclxuICAgICAgICB4ICo9IGhhbGZUb1JhZDtcclxuICAgICAgICB5ICo9IGhhbGZUb1JhZDtcclxuICAgICAgICB6ICo9IGhhbGZUb1JhZDtcclxuXHJcbiAgICAgICAgY29uc3Qgc3ggPSBNYXRoLnNpbih4KTtcclxuICAgICAgICBjb25zdCBjeCA9IE1hdGguY29zKHgpO1xyXG4gICAgICAgIGNvbnN0IHN5ID0gTWF0aC5zaW4oeSk7XHJcbiAgICAgICAgY29uc3QgY3kgPSBNYXRoLmNvcyh5KTtcclxuICAgICAgICBjb25zdCBzeiA9IE1hdGguc2luKHopO1xyXG4gICAgICAgIGNvbnN0IGN6ID0gTWF0aC5jb3Moeik7XHJcblxyXG4gICAgICAgIG91dC54ID0gc3ggKiBjeSAqIGN6ICsgY3ggKiBzeSAqIHN6O1xyXG4gICAgICAgIG91dC55ID0gY3ggKiBzeSAqIGN6ICsgc3ggKiBjeSAqIHN6O1xyXG4gICAgICAgIG91dC56ID0gY3ggKiBjeSAqIHN6IC0gc3ggKiBzeSAqIGN6O1xyXG4gICAgICAgIG91dC53ID0gY3ggKiBjeSAqIGN6IC0gc3ggKiBzeSAqIHN6O1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHF1YXRlcm5pb24gd2l0aCBnaXZlbiAyRCBhbmdsZSAoMCwgMCwgeikuXHJcbiAgICAgKiBAemgg5qC55o2uIDJEIOinkuW6pu+8iDAsIDAsIHrvvInorqHnrpflm5vlhYPmlbBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3V0IE91dHB1dCBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAcGFyYW0geiBBbmdsZSB0byByb3RhdGUgYXJvdW5kIFogYXhpcyBpbiBkZWdyZWVzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21BbmdsZVo8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIHo6IG51bWJlcikge1xyXG4gICAgICAgIHogKj0gaGFsZlRvUmFkO1xyXG4gICAgICAgIG91dC54ID0gb3V0LnkgPSAwO1xyXG4gICAgICAgIG91dC56ID0gTWF0aC5zaW4oeik7XHJcbiAgICAgICAgb3V0LncgPSBNYXRoLmNvcyh6KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFRoaXMgcmV0dXJucyB0aGUgWC1heGlzIHZlY3RvciBvZiB0aGUgcXVhdGVybmlvblxyXG4gICAgICogQHpoIOi/lOWbnuWumuS5ieatpOWbm+WFg+aVsOeahOWdkOagh+ezuyBYIOi9tOWQkemHj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRvQXhpc1ggKG91dDogSVZlYzNMaWtlLCBxOiBJUXVhdExpa2UpIHtcclxuICAgICAgICBjb25zdCBmeSA9IDIuMCAqIHEueTtcclxuICAgICAgICBjb25zdCBmeiA9IDIuMCAqIHEuejtcclxuICAgICAgICBvdXQueCA9IDEuMCAtIGZ5ICogcS55IC0gZnogKiBxLno7XHJcbiAgICAgICAgb3V0LnkgPSBmeSAqIHEueCArIGZ6ICogcS53O1xyXG4gICAgICAgIG91dC56ID0gZnogKiBxLnggKyBmeSAqIHEudztcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBUaGlzIHJldHVybnMgdGhlIFktYXhpcyB2ZWN0b3Igb2YgdGhlIHF1YXRlcm5pb25cclxuICAgICAqIEB6aCDov5Tlm57lrprkuYnmraTlm5vlhYPmlbDnmoTlnZDmoIfns7sgWSDovbTlkJHph49cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0b0F4aXNZIChvdXQ6IElWZWMzTGlrZSwgcTogSVF1YXRMaWtlKSB7XHJcbiAgICAgICAgY29uc3QgZnggPSAyLjAgKiBxLng7XHJcbiAgICAgICAgY29uc3QgZnkgPSAyLjAgKiBxLnk7XHJcbiAgICAgICAgY29uc3QgZnogPSAyLjAgKiBxLno7XHJcbiAgICAgICAgb3V0LnggPSBmeSAqIHEueCAtIGZ6ICogcS53O1xyXG4gICAgICAgIG91dC55ID0gMS4wIC0gZnggKiBxLnggLSBmeiAqIHEuejtcclxuICAgICAgICBvdXQueiA9IGZ6ICogcS55ICsgZnggKiBxLnc7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVGhpcyByZXR1cm5zIHRoZSBaLWF4aXMgdmVjdG9yIG9mIHRoZSBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAemgg6L+U5Zue5a6a5LmJ5q2k5Zub5YWD5pWw55qE5Z2Q5qCH57O7IFog6L205ZCR6YePXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdG9BeGlzWiAob3V0OiBJVmVjM0xpa2UsIHE6IElRdWF0TGlrZSkge1xyXG4gICAgICAgIGNvbnN0IGZ4ID0gMi4wICogcS54O1xyXG4gICAgICAgIGNvbnN0IGZ5ID0gMi4wICogcS55O1xyXG4gICAgICAgIGNvbnN0IGZ6ID0gMi4wICogcS56O1xyXG4gICAgICAgIG91dC54ID0gZnogKiBxLnggLSBmeSAqIHEudztcclxuICAgICAgICBvdXQueSA9IGZ6ICogcS55IC0gZnggKiBxLnc7XHJcbiAgICAgICAgb3V0LnogPSAxLjAgLSBmeCAqIHEueCAtIGZ5ICogcS55O1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENvbnZlcnRzIHRoZSBxdWF0ZXJuaW9uIHRvIGFuZ2xlcywgcmVzdWx0IGFuZ2xlIHgsIHkgaW4gdGhlIHJhbmdlIG9mIFstMTgwLCAxODBdLCB6IGluIHRoZSByYW5nZSBvZiBbLTkwLCA5MF0gaW50ZXJ2YWwsIHRoZSByb3RhdGlvbiBvcmRlciBpcyBZWlhcclxuICAgICAqIEB6aCDmoLnmja7lm5vlhYPmlbDorqHnrpfmrKfmi4nop5LvvIzov5Tlm57op5LluqYgeCwgeSDlnKggWy0xODAsIDE4MF0g5Yy66Ze05YaFLCB6IOm7mOiupOWcqCBbLTkwLCA5MF0g5Yy66Ze05YaF77yM5peL6L2s6aG65bqP5Li6IFlaWFxyXG4gICAgICogQHBhcmFtIG91dGVyWiBjaGFuZ2UgeiB2YWx1ZSByYW5nZSB0byBbLTE4MCwgLTkwXSBVIFs5MCwgMTgwXVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRvRXVsZXIgKG91dDogSVZlYzNMaWtlLCBxOiBJUXVhdExpa2UsIG91dGVyWj86IGJvb2xlYW4pIHtcclxuICAgICAgICBjb25zdCB7IHgsIHksIHosIHcgfSA9IHE7XHJcbiAgICAgICAgbGV0IGJhbmsgPSAwO1xyXG4gICAgICAgIGxldCBoZWFkaW5nID0gMDtcclxuICAgICAgICBsZXQgYXR0aXR1ZGUgPSAwO1xyXG4gICAgICAgIGNvbnN0IHRlc3QgPSB4ICogeSArIHogKiB3O1xyXG4gICAgICAgIGlmICh0ZXN0ID4gMC40OTk5OTkpIHtcclxuICAgICAgICAgICAgYmFuayA9IDA7IC8vIGRlZmF1bHQgdG8gemVyb1xyXG4gICAgICAgICAgICBoZWFkaW5nID0gdG9EZWdyZWUoMiAqIE1hdGguYXRhbjIoeCwgdykpO1xyXG4gICAgICAgICAgICBhdHRpdHVkZSA9IDkwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGVzdCA8IC0wLjQ5OTk5OSkge1xyXG4gICAgICAgICAgICBiYW5rID0gMDsgLy8gZGVmYXVsdCB0byB6ZXJvXHJcbiAgICAgICAgICAgIGhlYWRpbmcgPSAtdG9EZWdyZWUoMiAqIE1hdGguYXRhbjIoeCwgdykpO1xyXG4gICAgICAgICAgICBhdHRpdHVkZSA9IC05MDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzcXggPSB4ICogeDtcclxuICAgICAgICAgICAgY29uc3Qgc3F5ID0geSAqIHk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNxeiA9IHogKiB6O1xyXG4gICAgICAgICAgICBiYW5rID0gdG9EZWdyZWUoTWF0aC5hdGFuMigyICogeCAqIHcgLSAyICogeSAqIHosIDEgLSAyICogc3F4IC0gMiAqIHNxeikpO1xyXG4gICAgICAgICAgICBoZWFkaW5nID0gdG9EZWdyZWUoTWF0aC5hdGFuMigyICogeSAqIHcgLSAyICogeCAqIHosIDEgLSAyICogc3F5IC0gMiAqIHNxeikpO1xyXG4gICAgICAgICAgICBhdHRpdHVkZSA9IHRvRGVncmVlKE1hdGguYXNpbigyICogdGVzdCkpO1xyXG4gICAgICAgICAgICBpZiAob3V0ZXJaKSB7XHJcbiAgICAgICAgICAgICAgICBiYW5rID0gLTE4MCAqIE1hdGguc2lnbihiYW5rICsgMWUtNikgKyBiYW5rO1xyXG4gICAgICAgICAgICAgICAgaGVhZGluZyA9IC0xODAgKiBNYXRoLnNpZ24oaGVhZGluZyArIDFlLTYpICsgaGVhZGluZztcclxuICAgICAgICAgICAgICAgIGF0dGl0dWRlID0gMTgwICogTWF0aC5zaWduKGF0dGl0dWRlICsgMWUtNikgLSBhdHRpdHVkZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBvdXQueCA9IGJhbms7IG91dC55ID0gaGVhZGluZzsgb3V0LnogPSBhdHRpdHVkZTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENvbnZlcnRzIHF1YXRlcm5pb24gdG8gYW4gYXJyYXlcclxuICAgICAqIEB6aCDlm5vlhYPmlbDovazmlbDnu4RcclxuICAgICAqIEBwYXJhbSBvZnMgQXJyYXkgU3RhcnQgT2Zmc2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdG9BcnJheTxPdXQ+IChvdXQ6IE91dCwgcTogSVF1YXRMaWtlLCBvZnMgPSAwKSB7XHJcbiAgICAgICAgb3V0W29mcyArIDBdID0gcS54O1xyXG4gICAgICAgIG91dFtvZnMgKyAxXSA9IHEueTtcclxuICAgICAgICBvdXRbb2ZzICsgMl0gPSBxLno7XHJcbiAgICAgICAgb3V0W29mcyArIDNdID0gcS53O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQXJyYXkgdG8gYSBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAemgg5pWw57uE6L2s5Zub5YWD5pWwXHJcbiAgICAgKiBAcGFyYW0gb2ZzIEFycmF5IFN0YXJ0IE9mZnNldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21BcnJheSAob3V0OiBJUXVhdExpa2UsIGFyciwgb2ZzID0gMCkge1xyXG4gICAgICAgIG91dC54ID0gYXJyW29mcyArIDBdO1xyXG4gICAgICAgIG91dC55ID0gYXJyW29mcyArIDFdO1xyXG4gICAgICAgIG91dC56ID0gYXJyW29mcyArIDJdO1xyXG4gICAgICAgIG91dC53ID0gYXJyW29mcyArIDNdO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2hlY2sgd2hldGhlciB0d28gcXVhdGVybmlvbnMgYXJlIGVxdWFsXHJcbiAgICAgKiBAemgg5Zub5YWD5pWw562J5Lu35Yik5patXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3RyaWN0RXF1YWxzIChhOiBJUXVhdExpa2UsIGI6IElRdWF0TGlrZSkge1xyXG4gICAgICAgIHJldHVybiBhLnggPT09IGIueCAmJiBhLnkgPT09IGIueSAmJiBhLnogPT09IGIueiAmJiBhLncgPT09IGIudztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHR3byBxdWF0ZXJuaW9ucyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbFxyXG4gICAgICogQHpoIOaOkumZpOa1rueCueaVsOivr+W3rueahOWbm+WFg+aVsOi/keS8vOetieS7t+WIpOaWrVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGVxdWFscyAoYTogSVF1YXRMaWtlLCBiOiBJUXVhdExpa2UsIGVwc2lsb24gPSBFUFNJTE9OKSB7XHJcbiAgICAgICAgcmV0dXJuIChNYXRoLmFicyhhLnggLSBiLngpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEueCksIE1hdGguYWJzKGIueCkpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEueSAtIGIueSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS55KSwgTWF0aC5hYnMoYi55KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS56IC0gYi56KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLnopLCBNYXRoLmFicyhiLnopKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLncgLSBiLncpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEudyksIE1hdGguYWJzKGIudykpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiB4IGNvbXBvbmVudC5cclxuICAgICAqIEB6aCB4IOWIhumHj+OAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjbGFyZSB4OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4geSBjb21wb25lbnQuXHJcbiAgICAgKiBAemggeSDliIbph4/jgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlY2xhcmUgeTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIHogY29tcG9uZW50LlxyXG4gICAgICogQHpoIHog5YiG6YeP44CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWNsYXJlIHo6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiB3IGNvbXBvbmVudC5cclxuICAgICAqIEB6aCB3IOWIhumHj+OAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjbGFyZSB3OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG90aGVyOiBRdWF0KTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoeD86IG51bWJlciwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcik7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKHg/OiBudW1iZXIgfCBJUXVhdExpa2UsIHk/OiBudW1iZXIsIHo/OiBudW1iZXIsIHc/OiBudW1iZXIpIHs7XHJcbiAgICAgICAgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHgueDtcclxuICAgICAgICAgICAgdGhpcy55ID0geC55O1xyXG4gICAgICAgICAgICB0aGlzLnogPSB4Lno7XHJcbiAgICAgICAgICAgIHRoaXMudyA9IHgudztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICAgICAgICAgIHRoaXMueSA9IHkgfHwgMDtcclxuICAgICAgICAgICAgdGhpcy56ID0geiB8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLncgPSB3ID8/IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIGNsb25lIHRoZSBjdXJyZW50IFF1YXRcclxuICAgICAqIEB6aCDlhYvpmoblvZPliY3lm5vlhYPmlbDjgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsb25lICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFF1YXQodGhpcy54LCB0aGlzLnksIHRoaXMueiwgdGhpcy53KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXQgdmFsdWVzIHdpdGggYW5vdGhlciBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAemgg6K6+572u5b2T5YmN5Zub5YWD5pWw5L2/5YW25LiO5oyH5a6a5Zub5YWD5pWw55u4562J44CCXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgU3BlY2lmaWVkIHF1YXRlcm5pb25cclxuICAgICAqIEByZXR1cm5zIGB0aGlzYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IChvdGhlcjogUXVhdCk6IFF1YXQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0IHRoZSB2YWx1ZSBvZiBlYWNoIGNvbXBvbmVudCBvZiB0aGUgY3VycmVudCBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAemgg6K6+572u5b2T5YmN5Zub5YWD5pWw5oyH5a6a5YWD57Sg5YC844CCXHJcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCAoeD86IG51bWJlciwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcik6IFF1YXQ7XHJcblxyXG4gICAgcHVibGljIHNldCAoeD86IG51bWJlciB8IFF1YXQsIHk/OiBudW1iZXIsIHo/OiBudW1iZXIsIHc/OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgdGhpcy54ID0geC54O1xyXG4gICAgICAgICAgICB0aGlzLnkgPSB4Lnk7XHJcbiAgICAgICAgICAgIHRoaXMueiA9IHguejtcclxuICAgICAgICAgICAgdGhpcy53ID0geC53O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgICAgICAgICAgdGhpcy55ID0geSB8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLnogPSB6IHx8IDA7XHJcbiAgICAgICAgICAgIHRoaXMudyA9IHcgPz8gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2hlY2sgd2hldGhlciB0aGUgcXVhdGVybmlvbiBhcHByb3hpbWF0ZWx5IGVxdWFscyBhbm90aGVyIG9uZVxyXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeWbm+WFg+aVsOaYr+WQpuWcqOivr+W3ruiMg+WbtOWGheS4juaMh+WumuWQkemHj+ebuOetieOAglxyXG4gICAgICogQHBhcmFtIG90aGVyIENvbXBhcmF0aXZlIHF1YXRlcm5pb25cclxuICAgICAqIEBwYXJhbSBlcHNpbG9uIFRoZSBlcnJvciBhbGxvd2VkLiBJdGBzIHNob3VsZCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuXHJcbiAgICAgKiBAcmV0dXJucyBSZXR1cm5zIGB0cnVlJyB3aGVuIHRoZSBjb21wb25lbnRzIG9mIHRoZSB0d28gcXVhdGVybmlvbnMgYXJlIGVxdWFsIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGVycm9yIHJhbmdlOyBvdGhlcndpc2UsIHJldHVybnMgYGZhbHNlJy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGVxdWFscyAob3RoZXI6IFF1YXQsIGVwc2lsb24gPSBFUFNJTE9OKSB7XHJcbiAgICAgICAgcmV0dXJuIChNYXRoLmFicyh0aGlzLnggLSBvdGhlci54KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLngpLCBNYXRoLmFicyhvdGhlci54KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy55IC0gb3RoZXIueSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy55KSwgTWF0aC5hYnMob3RoZXIueSkpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueiAtIG90aGVyLnopIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueiksIE1hdGguYWJzKG90aGVyLnopKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLncgLSBvdGhlci53KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLncpLCBNYXRoLmFicyhvdGhlci53KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENoZWNrIHdoZXRoZXIgdGhlIGN1cnJlbnQgcXVhdGVybmlvbiBzdHJpY3RseSBlcXVhbHMgb3RoZXIgcXVhdGVybmlvblxyXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeWbm+WFg+aVsOaYr+WQpuS4juaMh+WumuWbm+WFg+aVsOebuOetieOAglxyXG4gICAgICogQHBhcmFtIG90aGVyIENvbXBhcmF0aXZlIHF1YXRlcm5pb25cclxuICAgICAqIEByZXR1cm5zIFJldHVybnMgYHRydWUnIHdoZW4gdGhlIGNvbXBvbmVudHMgb2YgdGhlIHR3byBxdWF0ZXJuaW9ucyBhcmUgZXF1YWwgd2l0aGluIHRoZSBzcGVjaWZpZWQgZXJyb3IgcmFuZ2U7IG90aGVyd2lzZSwgcmV0dXJucyBgZmFsc2UnLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RyaWN0RXF1YWxzIChvdGhlcjogUXVhdCkge1xyXG4gICAgICAgIHJldHVybiBvdGhlciAmJiB0aGlzLnggPT09IG90aGVyLnggJiYgdGhpcy55ID09PSBvdGhlci55ICYmIHRoaXMueiA9PT0gb3RoZXIueiAmJiB0aGlzLncgPT09IG90aGVyLnc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ29udmVydCBxdWF0ZXJuaW9uIHRvIEV1bGVyIGFuZ2xlc1xyXG4gICAgICogQHpoIOWwhuW9k+WJjeWbm+WFg+aVsOi9rOWMluS4uuasp+aLieinku+8iHgteS1677yJ5bm26LWL5YC857uZ5Ye65Y+j5ZCR6YeP44CCXHJcbiAgICAgKiBAcGFyYW0gb3V0IHRoZSBvdXRwdXQgdmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRFdWxlckFuZ2xlcyAob3V0OiBWZWMzKSB7XHJcbiAgICAgICAgcmV0dXJuIFF1YXQudG9FdWxlcihvdXQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZSB0aGUgbGluZWFyIGludGVycG9sYXRpb24gcmVzdWx0IGJldHdlZW4gdGhpcyBxdWF0ZXJuaW9uIGFuZCBhbm90aGVyIG9uZSB3aXRoIGdpdmVuIHJhdGlvXHJcbiAgICAgKiBAemgg5qC55o2u5oyH5a6a55qE5o+S5YC85q+U546H77yM5LuO5b2T5YmN5Zub5YWD5pWw5Yiw55uu5qCH5Zub5YWD5pWw5LmL6Ze05YGa57q/5oCn5o+S5YC844CCXHJcbiAgICAgKiBAcGFyYW0gdG8gVGhlIHRhcmdldCBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAcGFyYW0gcmF0aW8gVGhlIGludGVycG9sYXRpb24gY29lZmZpY2llbnQuIFRoZSByYW5nZSBpcyBbMCwxXS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGxlcnAgKHRvOiBRdWF0LCByYXRpbzogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ICs9IHJhdGlvICogKHRvLnggLSB0aGlzLngpO1xyXG4gICAgICAgIHRoaXMueSArPSByYXRpbyAqICh0by55IC0gdGhpcy55KTtcclxuICAgICAgICB0aGlzLnogKz0gcmF0aW8gKiAodG8ueiAtIHRoaXMueik7XHJcbiAgICAgICAgdGhpcy53ICs9IHJhdGlvICogKHRvLncgLSB0aGlzLncpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHNwaGVyaWNhbCBpbnRlcnBvbGF0aW9uIHJlc3VsdCBiZXR3ZWVuIHRoaXMgcXVhdGVybmlvbiBhbmQgYW5vdGhlciBvbmUgd2l0aCB0aGUgZ2l2ZW4gcmF0aW9cclxuICAgICAqIEB6aCDmoLnmja7mjIflrprnmoTmj5LlgLzmr5TnjofvvIzku47lvZPliY3lm5vlhYPmlbDliLDnm67moIflm5vlhYPmlbDkuYvpl7TlgZrnkIPpnaLmj5LlgLzjgIJcclxuICAgICAqIEBwYXJhbSB0byBUaGUgdGFyZ2V0IHF1YXRlcm5pb25cclxuICAgICAqIEBwYXJhbSByYXRpbyBUaGUgaW50ZXJwb2xhdGlvbiBjb2VmZmljaWVudC4gVGhlIHJhbmdlIGlzIFswLDFdLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2xlcnAgKHRvOiBRdWF0LCByYXRpbzogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIFF1YXQuc2xlcnAodGhpcywgdGhpcywgdG8sIHJhdGlvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgdGhlIHF1YXRlcm5pb25cclxuICAgICAqIEB6aCDmsYLlm5vlhYPmlbDplb/luqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxlbmd0aCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLnogKyB0aGlzLncgKiB0aGlzLncpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoZSBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAemgg5rGC5Zub5YWD5pWw6ZW/5bqm5bmz5pa5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsZW5ndGhTcXIgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLnogKyB0aGlzLncgKiB0aGlzLnc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHF0XzEgPSBuZXcgUXVhdCgpO1xyXG5jb25zdCBxdF8yID0gbmV3IFF1YXQoKTtcclxuY29uc3QgdjNfMSA9IG5ldyBWZWMzKCk7XHJcbmNvbnN0IG0zXzEgPSBuZXcgTWF0MygpO1xyXG5jb25zdCBoYWxmVG9SYWQgPSAwLjUgKiBNYXRoLlBJIC8gMTgwLjA7Il19