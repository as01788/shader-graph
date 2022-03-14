"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vec2 = void 0;
const utils_1 = require("./utils");
const Vec3_1 = require("./Vec3");
class Vec2 {
    constructor(x, y) {
        if (x && typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x || 0;
            this.y = y || 0;
        }
    }
    /**
     * @en Obtains a clone of the given vector object
     * @zh 获得指定向量的拷贝
     */
    static clone(a) {
        return new Vec2(a.x, a.y);
    }
    /**
     * @en Copy the target vector and save the results to out vector object
     * @zh 复制目标向量
     */
    static copy(out, a) {
        out.x = a.x;
        out.y = a.y;
        return out;
    }
    /**
     * @en Sets the out vector with the given x and y values
     * @zh 设置向量值
     */
    static set(out, x, y) {
        out.x = x;
        out.y = y;
        return out;
    }
    /**
     * @en Element-wise vector addition and save the results to out vector object
     * @zh 逐元素向量加法
     */
    static add(out, a, b) {
        out.x = a.x + b.x;
        out.y = a.y + b.y;
        return out;
    }
    /**
     * @en Element-wise vector subtraction and save the results to out vector object
     * @zh 逐元素向量减法
     */
    static subtract(out, a, b) {
        out.x = a.x - b.x;
        out.y = a.y - b.y;
        return out;
    }
    /**
     * @en Element-wise vector multiplication and save the results to out vector object
     * @zh 逐元素向量乘法
     */
    static multiply(out, a, b) {
        out.x = a.x * b.x;
        out.y = a.y * b.y;
        return out;
    }
    /**
     * @en Element-wise vector division and save the results to out vector object
     * @zh 逐元素向量除法
     */
    static divide(out, a, b) {
        out.x = a.x / b.x;
        out.y = a.y / b.y;
        return out;
    }
    /**
     * @en Rounds up by elements of the vector and save the results to out vector object
     * @zh 逐元素向量向上取整
     */
    static ceil(out, a) {
        out.x = Math.ceil(a.x);
        out.y = Math.ceil(a.y);
        return out;
    }
    /**
     * @en Element-wise rounds down of the current vector and save the results to the out vector
     * @zh 逐元素向量向下取整
     */
    static floor(out, a) {
        out.x = Math.floor(a.x);
        out.y = Math.floor(a.y);
        return out;
    }
    /**
     * @en Calculates element-wise minimum values and save to the out vector
     * @zh 逐元素向量最小值
     */
    static min(out, a, b) {
        out.x = Math.min(a.x, b.x);
        out.y = Math.min(a.y, b.y);
        return out;
    }
    /**
     * @en Calculates element-wise maximum values and save to the out vector
     * @zh 逐元素向量最大值
     */
    static max(out, a, b) {
        out.x = Math.max(a.x, b.x);
        out.y = Math.max(a.y, b.y);
        return out;
    }
    /**
     * @en Calculates element-wise round results and save to the out vector
     * @zh 逐元素向量四舍五入取整
     */
    static round(out, a) {
        out.x = Math.round(a.x);
        out.y = Math.round(a.y);
        return out;
    }
    /**
     * @en Vector scalar multiplication and save the results to out vector object
     * @zh 向量标量乘法
     */
    static multiplyScalar(out, a, b) {
        out.x = a.x * b;
        out.y = a.y * b;
        return out;
    }
    /**
     * @en Element-wise multiplication and addition with the equation: a + b * scale
     * @zh 逐元素向量乘加: A + B * scale
     */
    static scaleAndAdd(out, a, b, scale) {
        out.x = a.x + (b.x * scale);
        out.y = a.y + (b.y * scale);
        return out;
    }
    /**
     * @en Calculates the euclidean distance of two vectors
     * @zh 求两向量的欧氏距离
     */
    static distance(a, b) {
        const x = b.x - a.x;
        const y = b.y - a.y;
        return Math.sqrt(x * x + y * y);
    }
    /**
     * @en Calculates the squared euclidean distance of two vectors
     * @zh 求两向量的欧氏距离平方
     */
    static squaredDistance(a, b) {
        const x = b.x - a.x;
        const y = b.y - a.y;
        return x * x + y * y;
    }
    /**
     * @en Calculates the length of the vector
     * @zh 求向量长度
     */
    static len(a) {
        const x = a.x;
        const y = a.y;
        return Math.sqrt(x * x + y * y);
    }
    /**
     * @en Calculates the squared length of the vector
     * @zh 求向量长度平方
     */
    static lengthSqr(a) {
        const x = a.x;
        const y = a.y;
        return x * x + y * y;
    }
    /**
     * @en Sets each element to its negative value
     * @zh 逐元素向量取负
     */
    static negate(out, a) {
        out.x = -a.x;
        out.y = -a.y;
        return out;
    }
    /**
     * @en Sets each element to its inverse value, zero value will become Infinity
     * @zh 逐元素向量取倒数，接近 0 时返回 Infinity
     */
    static inverse(out, a) {
        out.x = 1.0 / a.x;
        out.y = 1.0 / a.y;
        return out;
    }
    /**
     * @en Sets each element to its inverse value, zero value will remain zero
     * @zh 逐元素向量取倒数，接近 0 时返回 0
     */
    static inverseSafe(out, a) {
        const x = a.x;
        const y = a.y;
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
        return out;
    }
    /**
     * @en Sets the normalized vector to the out vector
     * @zh 归一化向量
     */
    static normalize(out, a) {
        const x = a.x;
        const y = a.y;
        let len = x * x + y * y;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            out.x = x * len;
            out.y = y * len;
        }
        return out;
    }
    /**
     * @en Calculates the dot product of the vector
     * @zh 向量点积（数量积）
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }
    static cross(out, a, b) {
        if (out instanceof Vec3_1.Vec3) {
            out.x = out.y = 0;
            out.z = a.x * b.y - a.y * b.x;
            return out;
        }
        else {
            return out.x * a.y - out.y * a.x;
        }
    }
    /**
     * @en Calculates the linear interpolation between two vectors with a given ratio
     * @zh 逐元素向量线性插值： A + t * (B - A)
     */
    static lerp(out, a, b, t) {
        const x = a.x;
        const y = a.y;
        out.x = x + t * (b.x - x);
        out.y = y + t * (b.y - y);
        return out;
    }
    /**
     * @en Generates a uniformly distributed random vector points from center to the surface of the unit sphere
     * @zh 生成一个在单位圆上均匀分布的随机向量
     * @param scale vector length
     */
    static random(out, scale) {
        scale = scale || 1.0;
        const r = utils_1.random() * 2.0 * Math.PI;
        out.x = Math.cos(r) * scale;
        out.y = Math.sin(r) * scale;
        return out;
    }
    /**
     * @en Vector and third order matrix multiplication, will complete the vector with a third value as one
     * @zh 向量与三维矩阵乘法，默认向量第三位为 1。
     */
    static transformMat3(out, a, m) {
        const x = a.x;
        const y = a.y;
        out.x = m.m00 * x + m.m03 * y + m.m06;
        out.y = m.m01 * x + m.m04 * y + m.m07;
        return out;
    }
    /**
     * @en Vector and third order matrix multiplication, will complete the vector with a third and a fourth element as one
     * @zh 向量与四维矩阵乘法，默认向量第三位为 0，第四位为 1。
     */
    static transformMat4(out, a, m) {
        const x = a.x;
        const y = a.y;
        out.x = m.m00 * x + m.m04 * y + m.m12;
        out.y = m.m01 * x + m.m05 * y + m.m13;
        return out;
    }
    /**
     * @en Gets the string representation of the given vector
     * @zh 返回向量的字符串表示
     */
    static str(a) {
        return `Vec2(${a.x}, ${a.y})`;
    }
    /**
     * @en Converts the given vector to an array
     * @zh 向量转数组
     * @param ofs Array Start Offset
     */
    static toArray(out, v, ofs = 0) {
        out[ofs + 0] = v.x;
        out[ofs + 1] = v.y;
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
        return out;
    }
    /**
     * @en Check the equality of the two given vectors
     * @zh 向量等价判断
     */
    static strictEquals(a, b) {
        return a.x === b.x && a.y === b.y;
    }
    /**
     * @en Check whether the two given vectors are approximately equivalent
     * @zh 排除浮点数误差的向量近似等价判断
     */
    static equals(a, b, epsilon = utils_1.EPSILON) {
        return (Math.abs(a.x - b.x)
            <= epsilon * Math.max(1.0, Math.abs(a.x), Math.abs(b.x))
            && Math.abs(a.y - b.y)
                <= epsilon * Math.max(1.0, Math.abs(a.y), Math.abs(b.y)));
    }
    /**
     * @en Calculates the radian angle between two vectors
     * @zh 求两向量夹角弧度
     */
    static angle(a, b) {
        Vec2.normalize(v2_1, a);
        Vec2.normalize(v2_2, b);
        const cosine = Vec2.dot(v2_1, v2_2);
        if (cosine > 1.0) {
            return 0;
        }
        if (cosine < -1.0) {
            return Math.PI;
        }
        return Math.acos(cosine);
    }
    /**
     * @en clone a Vec2 value
     * @zh 克隆当前向量。
     */
    clone() {
        return new Vec2(this.x, this.y);
    }
    set(x, y) {
        if (x && typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x || 0;
            this.y = y || 0;
        }
        return this;
    }
    /**
     * @en Check whether the vector approximately equals another one.
     * @zh 判断当前向量是否在误差范围内与指定向量相等。
     * @param other Specified vector
     * @param epsilon The error allowed. It`s should be a non-negative number.
     * @return Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
     */
    equals(other, epsilon = utils_1.EPSILON) {
        return (Math.abs(this.x - other.x)
            <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(other.x))
            && Math.abs(this.y - other.y)
                <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(other.y)));
    }
    /**
     * @en Check whether the vector approximately equals another one.
     * @zh 判断当前向量是否在误差范围内与指定分量的向量相等。
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     * @param epsilon The error allowed. It`s should be a non-negative number.
     * @return Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
     */
    equals2f(x, y, epsilon = utils_1.EPSILON) {
        return (Math.abs(this.x - x)
            <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(x))
            && Math.abs(this.y - y)
                <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(y)));
    }
    /**
     * @en Check whether the current vector strictly equals another Vec2.
     * @zh 判断当前向量是否与指定向量相等。
     * @param other specified vector
     * @return Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
     */
    strictEquals(other) {
        return other && this.x === other.x && this.y === other.y;
    }
    /**
     * @en Check whether the current vector strictly equals another Vec2.
     * @zh 判断当前向量是否与指定分量的向量相等。
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     * @return Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
     */
    strictEquals2f(x, y) {
        return this.x === x && this.y === y;
    }
    /**
     * @en Transform to string with vector information.
     * @zh 返回当前向量的字符串表示。
     * @returns The string with vector information
     */
    toString() {
        return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
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
        this.x = x + ratio * (to.x - x);
        this.y = y + ratio * (to.y - y);
        return this;
    }
    /**
     * @en Clamp the vector between minInclusive and maxInclusive.
     * @zh 设置当前向量的值，使其各个分量都处于指定的范围内。
     * @param minInclusive Minimum value allowed
     * @param maxInclusive Maximum value allowed
     * @return `this`
     */
    clampf(minInclusive, maxInclusive) {
        this.x = utils_1.clamp(this.x, minInclusive.x, maxInclusive.x);
        this.y = utils_1.clamp(this.y, minInclusive.y, maxInclusive.y);
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
        return this;
    }
    /**
     * @en Adds the current vector with another one and return this
     * @zh 向量加法。将当前向量与指定分量的向量相加
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     */
    add2f(x, y) {
        this.x += x;
        this.y += y;
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
        return this;
    }
    /**
     * @en Subtracts one vector from this, and returns this.
     * @zh 向量减法。将当前向量减去指定分量的向量
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     */
    subtract2f(x, y) {
        this.x -= x;
        this.y -= y;
        return this;
    }
    /**
     * @en Multiplies the current vector with a number, and returns this.
     * @zh 向量数乘。将当前向量数乘指定标量
     * @param scalar scalar number
     */
    multiplyScalar(scalar) {
        if (typeof scalar === 'object') {
            console.warn('should use Vec2.multiply for vector * vector operation');
        }
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    /**
     * @en Multiplies the current vector with another one and return this
     * @zh 向量乘法。将当前向量乘以与指定向量的结果赋值给当前向量。
     * @param other specified vector
     */
    multiply(other) {
        if (typeof other !== 'object') {
            console.warn('should use Vec2.scale for vector * scalar operation');
        }
        this.x *= other.x;
        this.y *= other.y;
        return this;
    }
    /**
     * @en Multiplies the current vector with another one and return this
     * @zh 向量乘法。将当前向量与指定分量的向量相乘的结果赋值给当前向量。
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     */
    multiply2f(x, y) {
        this.x *= x;
        this.y *= y;
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
        return this;
    }
    /**
     * @en Element-wisely divides this vector with another one, and return this.
     * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
     * @param x The x value of specified vector
     * @param y The y value of specified vector
     */
    divide2f(x, y) {
        this.x /= x;
        this.y /= y;
        return this;
    }
    /**
     * @en Sets each component of this vector with its negative value
     * @zh 将当前向量的各个分量取反
     */
    negative() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    /**
     * @en Calculates the dot product with another vector
     * @zh 向量点乘。
     * @param other specified vector
     * @return The result of calculates the dot product with another vector
     */
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
    /**
     * @en Calculates the cross product with another vector.
     * @zh 向量叉乘。
     * @param other specified vector
     * @return `out`
     */
    cross(other) {
        return this.x * other.y - this.y * other.x;
    }
    /**
     * @en Returns the length of this vector.
     * @zh 计算向量的长度（模）。
     * @return Length of vector
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /**
     * @en Returns the squared length of this vector.
     * @zh 计算向量长度（模）的平方。
     * @return the squared length of this vector
     */
    lengthSqr() {
        return this.x * this.x + this.y * this.y;
    }
    /**
     * @en Normalize the current vector.
     * @zh 将当前向量归一化。
     */
    normalize() {
        const x = this.x;
        const y = this.y;
        let len = x * x + y * y;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            this.x *= len;
            this.y *= len;
        }
        return this;
    }
    /**
     * @en Calculates radian angle between two vectors
     * @zh 获取当前向量和指定向量之间的角度。
     * @param other specified vector
     * @return The angle between the current vector and the specified vector (in radians); if there are zero vectors in the current vector and the specified vector, 0 is returned.
     */
    angle(other) {
        const magSqr1 = this.lengthSqr();
        const magSqr2 = other.lengthSqr();
        if (magSqr1 === 0 || magSqr2 === 0) {
            console.warn('Can\'t get angle between zero vector');
            return 0.0;
        }
        const dot = this.dot(other);
        let theta = dot / (Math.sqrt(magSqr1 * magSqr2));
        theta = utils_1.clamp(theta, -1.0, 1.0);
        return Math.acos(theta);
    }
    /**
     * @en Get angle in radian between this and vector with direction.
     * @zh 获取当前向量和指定向量之间的有符号角度。<br/>
     * 有符号角度的取值范围为 (-180, 180]，当前向量可以通过逆时针旋转有符号角度与指定向量同向。<br/>
     * @param other specified vector
     * @return The signed angle between the current vector and the specified vector (in radians); if there is a zero vector in the current vector and the specified vector, 0 is returned.
     */
    signAngle(other) {
        const angle = this.angle(other);
        return this.cross(other) < 0 ? -angle : angle;
    }
    /**
     * @en Rotates the current vector by an angle in radian value
     * @zh 将当前向量的旋转
     * @param radians radius of rotation
     */
    rotate(radians) {
        const x = this.x;
        const y = this.y;
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);
        this.x = cos * x - sin * y;
        this.y = sin * x + cos * y;
        return this;
    }
    /**
     * @en Projects the current vector on another one
     * @zh 计算当前向量在指定向量上的投影向量。
     * @param other specified vector
     */
    project(other) {
        const scalar = this.dot(other) / other.dot(other);
        this.x = other.x * scalar;
        this.y = other.y * scalar;
        return this;
    }
    /**
     * @en Transforms the vec2 with a mat4. 3rd vector component is implicitly '0', 4th vector component is implicitly '1'
     * @zh 将当前向量视为 z 分量为 0、w 分量为 1 的四维向量，<br/>
     * 应用四维矩阵变换到当前矩阵<br/>
     * @param matrix matrix to transform with
     */
    transformMat4(matrix) {
        const x = this.x;
        const y = this.y;
        this.x = matrix.m00 * x + matrix.m04 * y + matrix.m12;
        this.y = matrix.m01 * x + matrix.m05 * y + matrix.m13;
        return this;
    }
}
exports.Vec2 = Vec2;
Vec2.ZERO = Object.freeze(new Vec2(0, 0));
Vec2.ONE = Object.freeze(new Vec2(1, 1));
Vec2.NEG_ONE = Object.freeze(new Vec2(-1, -1));
Vec2.UNIT_X = Object.freeze(new Vec2(1, 0));
Vec2.UNIT_Y = Object.freeze(new Vec2(0, 1));
const v2_1 = new Vec2();
const v2_2 = new Vec2();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVjMi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlscy9NYXRocy9WZWMyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLG1DQUFpRDtBQUNqRCxpQ0FBOEI7QUFHOUIsTUFBYSxJQUFJO0lBd1piLFlBQWEsQ0FBaUIsRUFBRSxDQUFVO1FBQ3RDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEI7YUFBTTtZQUNILElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBelpEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQTBCLENBQU07UUFDL0MsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBMEIsR0FBUSxFQUFFLENBQU07UUFDeEQsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1osT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBMEIsR0FBUSxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQ3JFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixPQUFPLEdBQUcsQ0FBQztJ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QU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QyxXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQWl4QnpELE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hdDQgfSBmcm9tIFwiLi9NYXQ0XCI7XG5pbXBvcnQgeyBJTWF0M0xpa2UsIElNYXQ0TGlrZSwgSVZlYzJMaWtlIH0gZnJvbSBcIi4vdHlwZS1kZWZpbmVcIjtcbmltcG9ydCB7IGNsYW1wLCBFUFNJTE9OLCByYW5kb20gfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgVmVjMyB9IGZyb20gXCIuL1ZlYzNcIjtcblxuXG5leHBvcnQgY2xhc3MgVmVjMntcbiAgICBwdWJsaWMgc3RhdGljIFpFUk8gPSBPYmplY3QuZnJlZXplKG5ldyBWZWMyKDAsIDApKTtcbiAgICBwdWJsaWMgc3RhdGljIE9ORSA9IE9iamVjdC5mcmVlemUobmV3IFZlYzIoMSwgMSkpO1xuICAgIHB1YmxpYyBzdGF0aWMgTkVHX09ORSA9IE9iamVjdC5mcmVlemUobmV3IFZlYzIoLTEsIC0xKSk7XG4gICAgcHVibGljIHN0YXRpYyBVTklUX1ggPSBPYmplY3QuZnJlZXplKG5ldyBWZWMyKDEsIDApKTtcbiAgICBwdWJsaWMgc3RhdGljIFVOSVRfWSA9IE9iamVjdC5mcmVlemUobmV3IFZlYzIoMCwgMSkpO1xuXG4gICAgLyoqXG4gICAgICogQGVuIE9idGFpbnMgYSBjbG9uZSBvZiB0aGUgZ2l2ZW4gdmVjdG9yIG9iamVjdFxuICAgICAqIEB6aCDojrflvpfmjIflrprlkJHph4/nmoTmi7fotJ1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNsb25lIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKGEueCwgYS55KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ29weSB0aGUgdGFyZ2V0IHZlY3RvciBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgdmVjdG9yIG9iamVjdFxuICAgICAqIEB6aCDlpI3liLbnm67moIflkJHph49cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvcHkgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBhLng7XG4gICAgICAgIG91dC55ID0gYS55O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXRzIHRoZSBvdXQgdmVjdG9yIHdpdGggdGhlIGdpdmVuIHggYW5kIHkgdmFsdWVzXG4gICAgICogQHpoIOiuvue9ruWQkemHj+WAvFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2V0IDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgb3V0LnggPSB4O1xuICAgICAgICBvdXQueSA9IHk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEVsZW1lbnQtd2lzZSB2ZWN0b3IgYWRkaXRpb24gYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IHZlY3RvciBvYmplY3RcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5Yqg5rOVXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGQgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBvdXQueCA9IGEueCArIGIueDtcbiAgICAgICAgb3V0LnkgPSBhLnkgKyBiLnk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEVsZW1lbnQtd2lzZSB2ZWN0b3Igc3VidHJhY3Rpb24gYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IHZlY3RvciBvYmplY3RcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5YeP5rOVXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzdWJ0cmFjdCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIG91dC54ID0gYS54IC0gYi54O1xuICAgICAgICBvdXQueSA9IGEueSAtIGIueTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlIHZlY3RvciBtdWx0aXBsaWNhdGlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgdmVjdG9yIG9iamVjdFxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/kuZjms5VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG11bHRpcGx5IDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBhLnggKiBiLng7XG4gICAgICAgIG91dC55ID0gYS55ICogYi55O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBFbGVtZW50LXdpc2UgdmVjdG9yIGRpdmlzaW9uIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+mZpOazlVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZGl2aWRlIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBhLnggLyBiLng7XG4gICAgICAgIG91dC55ID0gYS55IC8gYi55O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBSb3VuZHMgdXAgYnkgZWxlbWVudHMgb2YgdGhlIHZlY3RvciBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgdmVjdG9yIG9iamVjdFxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lkJHkuIrlj5bmlbRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNlaWwgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBNYXRoLmNlaWwoYS54KTtcbiAgICAgICAgb3V0LnkgPSBNYXRoLmNlaWwoYS55KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlIHJvdW5kcyBkb3duIG9mIHRoZSBjdXJyZW50IHZlY3RvciBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byB0aGUgb3V0IHZlY3RvclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lkJHkuIvlj5bmlbRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZsb29yIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIG91dC54ID0gTWF0aC5mbG9vcihhLngpO1xuICAgICAgICBvdXQueSA9IE1hdGguZmxvb3IoYS55KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyBlbGVtZW50LXdpc2UgbWluaW11bSB2YWx1ZXMgYW5kIHNhdmUgdG8gdGhlIG91dCB2ZWN0b3JcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5pyA5bCP5YC8XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBtaW4gPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBvdXQueCA9IE1hdGgubWluKGEueCwgYi54KTtcbiAgICAgICAgb3V0LnkgPSBNYXRoLm1pbihhLnksIGIueSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgZWxlbWVudC13aXNlIG1heGltdW0gdmFsdWVzIGFuZCBzYXZlIHRvIHRoZSBvdXQgdmVjdG9yXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+acgOWkp+WAvFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbWF4IDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBNYXRoLm1heChhLngsIGIueCk7XG4gICAgICAgIG91dC55ID0gTWF0aC5tYXgoYS55LCBiLnkpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIGVsZW1lbnQtd2lzZSByb3VuZCByZXN1bHRzIGFuZCBzYXZlIHRvIHRoZSBvdXQgdmVjdG9yXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+Wbm+iIjeS6lOWFpeWPluaVtFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcm91bmQgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBNYXRoLnJvdW5kKGEueCk7XG4gICAgICAgIG91dC55ID0gTWF0aC5yb3VuZChhLnkpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBWZWN0b3Igc2NhbGFyIG11bHRpcGxpY2F0aW9uIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XG4gICAgICogQHpoIOWQkemHj+agh+mHj+S5mOazlVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbXVsdGlwbHlTY2FsYXIgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IG51bWJlcikge1xuICAgICAgICBvdXQueCA9IGEueCAqIGI7XG4gICAgICAgIG91dC55ID0gYS55ICogYjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlIG11bHRpcGxpY2F0aW9uIGFuZCBhZGRpdGlvbiB3aXRoIHRoZSBlcXVhdGlvbjogYSArIGIgKiBzY2FsZVxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/kuZjliqA6IEEgKyBCICogc2NhbGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNjYWxlQW5kQWRkIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHNjYWxlOiBudW1iZXIpIHtcbiAgICAgICAgb3V0LnggPSBhLnggKyAoYi54ICogc2NhbGUpO1xuICAgICAgICBvdXQueSA9IGEueSArIChiLnkgKiBzY2FsZSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGVhbiBkaXN0YW5jZSBvZiB0d28gdmVjdG9yc1xuICAgICAqIEB6aCDmsYLkuKTlkJHph4/nmoTmrKfmsI/ot53nprtcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGRpc3RhbmNlIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBjb25zdCB4ID0gYi54IC0gYS54O1xuICAgICAgICBjb25zdCB5ID0gYi55IC0gYS55O1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGVhbiBkaXN0YW5jZSBvZiB0d28gdmVjdG9yc1xuICAgICAqIEB6aCDmsYLkuKTlkJHph4/nmoTmrKfmsI/ot53nprvlubPmlrlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNxdWFyZWREaXN0YW5jZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgY29uc3QgeCA9IGIueCAtIGEueDtcbiAgICAgICAgY29uc3QgeSA9IGIueSAtIGEueTtcbiAgICAgICAgcmV0dXJuIHggKiB4ICsgeSAqIHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiB0aGUgdmVjdG9yXG4gICAgICogQHpoIOaxguWQkemHj+mVv+W6plxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbGVuIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueDtcbiAgICAgICAgY29uc3QgeSA9IGEueTtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhlIHZlY3RvclxuICAgICAqIEB6aCDmsYLlkJHph4/plb/luqblubPmlrlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGxlbmd0aFNxciA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0KSB7XG4gICAgICAgIGNvbnN0IHggPSBhLng7XG4gICAgICAgIGNvbnN0IHkgPSBhLnk7XG4gICAgICAgIHJldHVybiB4ICogeCArIHkgKiB5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXRzIGVhY2ggZWxlbWVudCB0byBpdHMgbmVnYXRpdmUgdmFsdWVcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W6LSfXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBuZWdhdGUgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSAtYS54O1xuICAgICAgICBvdXQueSA9IC1hLnk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgZWFjaCBlbGVtZW50IHRvIGl0cyBpbnZlcnNlIHZhbHVlLCB6ZXJvIHZhbHVlIHdpbGwgYmVjb21lIEluZmluaXR5XG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+WPluWAkuaVsO+8jOaOpei/kSAwIOaXtui/lOWbniBJbmZpbml0eVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaW52ZXJzZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBvdXQueCA9IDEuMCAvIGEueDtcbiAgICAgICAgb3V0LnkgPSAxLjAgLyBhLnk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgZWFjaCBlbGVtZW50IHRvIGl0cyBpbnZlcnNlIHZhbHVlLCB6ZXJvIHZhbHVlIHdpbGwgcmVtYWluIHplcm9cbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W5YCS5pWw77yM5o6l6L+RIDAg5pe26L+U5ZueIDBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGludmVyc2VTYWZlIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIGNvbnN0IHggPSBhLng7XG4gICAgICAgIGNvbnN0IHkgPSBhLnk7XG5cbiAgICAgICAgaWYgKE1hdGguYWJzKHgpIDwgRVBTSUxPTikge1xuICAgICAgICAgICAgb3V0LnggPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0LnggPSAxLjAgLyB4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE1hdGguYWJzKHkpIDwgRVBTSUxPTikge1xuICAgICAgICAgICAgb3V0LnkgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0LnkgPSAxLjAgLyB5O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0cyB0aGUgbm9ybWFsaXplZCB2ZWN0b3IgdG8gdGhlIG91dCB2ZWN0b3JcbiAgICAgKiBAemgg5b2S5LiA5YyW5ZCR6YePXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBub3JtYWxpemUgPE91dCBleHRlbmRzIElWZWMyTGlrZSwgVmVjMkxpa2UgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogVmVjMkxpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueDtcbiAgICAgICAgY29uc3QgeSA9IGEueTtcbiAgICAgICAgbGV0IGxlbiA9IHggKiB4ICsgeSAqIHk7XG4gICAgICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgICAgICBvdXQueCA9IHggKiBsZW47XG4gICAgICAgICAgICBvdXQueSA9IHkgKiBsZW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdGhlIHZlY3RvclxuICAgICAqIEB6aCDlkJHph4/ngrnnp6/vvIjmlbDph4/np6/vvIlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGRvdCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgcmV0dXJuIGEueCAqIGIueCArIGEueSAqIGIueTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0aGUgdmVjdG9yXG4gICAgICogQHpoIOWQkemHj+WPieenr++8iOWQkemHj+enr++8ie+8jOazqOaEj+S6jOe7tOWQkemHj+eahOWPieenr+S4uuS4jiBaIOi9tOW5s+ihjOeahOS4iee7tOWQkemHj1xuICAgICAqIEBvdmVycmlkZSAoYTpWZWMyLCBiOlZlYzIpID0+IG51bWJlclxuICAgICAqIEBvdmVycmlkZSBbZGVwcmVjYXRlZF0gKG91dDpWZWMzLCBhOlZlYzIsIGI6VmVjMikgPT4gVmVjM1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3Jvc3MgKGE6IElWZWMyTGlrZSwgYjogSVZlYzJMaWtlKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgQ29uc2lkZXIgdXNlIGFub3RoZXIgb3ZlcnJpZGVzIHBsZWFzZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyb3NzIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IFZlYzMsIGE6IE91dCwgYjogT3V0KTogVmVjMztcblxuICAgIHB1YmxpYyBzdGF0aWMgY3Jvc3MgKG91dDogSVZlYzJMaWtlIHwgVmVjMywgYTogSVZlYzJMaWtlLCBiPzogSVZlYzJMaWtlKSA6IG51bWJlciB8IFZlYzMge1xuICAgICAgICBpZiAob3V0IGluc3RhbmNlb2YgVmVjMykge1xuICAgICAgICAgICAgb3V0LnggPSBvdXQueSA9IDA7XG4gICAgICAgICAgICBvdXQueiA9IGEueCAqIGIhLnkgLSBhLnkgKiBiIS54O1xuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvdXQueCAqIGEueSAtIG91dC55ICogYS54O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlY3RvcnMgd2l0aCBhIGdpdmVuIHJhdGlvXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+e6v+aAp+aPkuWAvO+8miBBICsgdCAqIChCIC0gQSlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGxlcnAgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgdDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHggPSBhLng7XG4gICAgICAgIGNvbnN0IHkgPSBhLnk7XG4gICAgICAgIG91dC54ID0geCArIHQgKiAoYi54IC0geCk7XG4gICAgICAgIG91dC55ID0geSArIHQgKiAoYi55IC0geSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEdlbmVyYXRlcyBhIHVuaWZvcm1seSBkaXN0cmlidXRlZCByYW5kb20gdmVjdG9yIHBvaW50cyBmcm9tIGNlbnRlciB0byB0aGUgc3VyZmFjZSBvZiB0aGUgdW5pdCBzcGhlcmVcbiAgICAgKiBAemgg55Sf5oiQ5LiA5Liq5Zyo5Y2V5L2N5ZyG5LiK5Z2H5YyA5YiG5biD55qE6ZqP5py65ZCR6YePXG4gICAgICogQHBhcmFtIHNjYWxlIHZlY3RvciBsZW5ndGhcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIHNjYWxlPzogbnVtYmVyKSB7XG4gICAgICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuICAgICAgICBjb25zdCByID0gcmFuZG9tKCkgKiAyLjAgKiBNYXRoLlBJO1xuICAgICAgICBvdXQueCA9IE1hdGguY29zKHIpICogc2NhbGU7XG4gICAgICAgIG91dC55ID0gTWF0aC5zaW4ocikgKiBzY2FsZTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVmVjdG9yIGFuZCB0aGlyZCBvcmRlciBtYXRyaXggbXVsdGlwbGljYXRpb24sIHdpbGwgY29tcGxldGUgdGhlIHZlY3RvciB3aXRoIGEgdGhpcmQgdmFsdWUgYXMgb25lXG4gICAgICogQHpoIOWQkemHj+S4juS4iee7tOefqemYteS5mOazle+8jOm7mOiupOWQkemHj+esrOS4ieS9jeS4uiAx44CCXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2Zvcm1NYXQzIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2UsIE1hdExpa2UgZXh0ZW5kcyBJTWF0M0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBtOiBJTWF0M0xpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueDtcbiAgICAgICAgY29uc3QgeSA9IGEueTtcbiAgICAgICAgb3V0LnggPSBtLm0wMCAqIHggKyBtLm0wMyAqIHkgKyBtLm0wNjtcbiAgICAgICAgb3V0LnkgPSBtLm0wMSAqIHggKyBtLm0wNCAqIHkgKyBtLm0wNztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVmVjdG9yIGFuZCB0aGlyZCBvcmRlciBtYXRyaXggbXVsdGlwbGljYXRpb24sIHdpbGwgY29tcGxldGUgdGhlIHZlY3RvciB3aXRoIGEgdGhpcmQgYW5kIGEgZm91cnRoIGVsZW1lbnQgYXMgb25lXG4gICAgICogQHpoIOWQkemHj+S4juWbm+e7tOefqemYteS5mOazle+8jOm7mOiupOWQkemHj+esrOS4ieS9jeS4uiAw77yM56ys5Zub5L2N5Li6IDHjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRyYW5zZm9ybU1hdDQgPE91dCBleHRlbmRzIElWZWMyTGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIG06IElNYXQ0TGlrZSkge1xuICAgICAgICBjb25zdCB4ID0gYS54O1xuICAgICAgICBjb25zdCB5ID0gYS55O1xuICAgICAgICBvdXQueCA9IG0ubTAwICogeCArIG0ubTA0ICogeSArIG0ubTEyO1xuICAgICAgICBvdXQueSA9IG0ubTAxICogeCArIG0ubTA1ICogeSArIG0ubTEzO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBHZXRzIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIHZlY3RvclxuICAgICAqIEB6aCDov5Tlm57lkJHph4/nmoTlrZfnrKbkuLLooajnpLpcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHN0ciA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0KSB7XG4gICAgICAgIHJldHVybiBgVmVjMigke2EueH0sICR7YS55fSlgO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDb252ZXJ0cyB0aGUgZ2l2ZW4gdmVjdG9yIHRvIGFuIGFycmF5XG4gICAgICogQHpoIOWQkemHj+i9rOaVsOe7hFxuICAgICAqIEBwYXJhbSBvZnMgQXJyYXkgU3RhcnQgT2Zmc2V0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0b0FycmF5IDxPdXQ+IChvdXQ6IE91dCwgdjogSVZlYzJMaWtlLCBvZnMgPSAwKSB7XG4gICAgICAgIG91dFtvZnMgKyAwXSA9IHYueDtcbiAgICAgICAgb3V0W29mcyArIDFdID0gdi55O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDb252ZXJ0cyB0aGUgZ2l2ZW4gYXJyYXkgdG8gYSB2ZWN0b3JcbiAgICAgKiBAemgg5pWw57uE6L2s5ZCR6YePXG4gICAgICogQHBhcmFtIG9mcyBBcnJheSBTdGFydCBPZmZzZXRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21BcnJheSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGFyciwgb2ZzID0gMCkge1xuICAgICAgICBvdXQueCA9IGFycltvZnMgKyAwXTtcbiAgICAgICAgb3V0LnkgPSBhcnJbb2ZzICsgMV07XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENoZWNrIHRoZSBlcXVhbGl0eSBvZiB0aGUgdHdvIGdpdmVuIHZlY3RvcnNcbiAgICAgKiBAemgg5ZCR6YeP562J5Lu35Yik5patXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzdHJpY3RFcXVhbHMgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIHJldHVybiBhLnggPT09IGIueCAmJiBhLnkgPT09IGIueTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2hlY2sgd2hldGhlciB0aGUgdHdvIGdpdmVuIHZlY3RvcnMgYXJlIGFwcHJveGltYXRlbHkgZXF1aXZhbGVudFxuICAgICAqIEB6aCDmjpLpmaTmta7ngrnmlbDor6/lt67nmoTlkJHph4/ov5HkvLznrYnku7fliKTmlq1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGVxdWFscyA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0LCBiOiBPdXQsICBlcHNpbG9uID0gRVBTSUxPTikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgTWF0aC5hYnMoYS54IC0gYi54KVxuICAgICAgICAgICAgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS54KSwgTWF0aC5hYnMoYi54KSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEueSAtIGIueSlcbiAgICAgICAgICAgIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEueSksIE1hdGguYWJzKGIueSkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHJhZGlhbiBhbmdsZSBiZXR3ZWVuIHR3byB2ZWN0b3JzXG4gICAgICogQHpoIOaxguS4pOWQkemHj+WkueinkuW8p+W6plxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYW5nbGUgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIFZlYzIubm9ybWFsaXplKHYyXzEsIGEpO1xuICAgICAgICBWZWMyLm5vcm1hbGl6ZSh2Ml8yLCBiKTtcbiAgICAgICAgY29uc3QgY29zaW5lID0gVmVjMi5kb3QodjJfMSwgdjJfMik7XG4gICAgICAgIGlmIChjb3NpbmUgPiAxLjApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3NpbmUgPCAtMS4wKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5QSTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWF0aC5hY29zKGNvc2luZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIHggY29tcG9uZW50LlxuICAgICAqIEB6aCB4IOWIhumHj+OAglxuICAgICAqL1xuICAgIHB1YmxpYyBkZWNsYXJlIHg6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBlbiB5IGNvbXBvbmVudC5cbiAgICAgKiBAemggeSDliIbph4/jgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSB5OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvciAob3RoZXI6IFZlYzIpO1xuXG4gICAgY29uc3RydWN0b3IgKHg/OiBudW1iZXIsIHk/OiBudW1iZXIpO1xuXG4gICAgY29uc3RydWN0b3IgKHg/OiBudW1iZXIgfCBWZWMyLCB5PzogbnVtYmVyKSB7XG4gICAgICAgIGlmICh4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy54ID0geC54O1xuICAgICAgICAgICAgdGhpcy55ID0geC55O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy54ID0geCB8fCAwO1xuICAgICAgICAgICAgdGhpcy55ID0geSB8fCAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIGNsb25lIGEgVmVjMiB2YWx1ZVxuICAgICAqIEB6aCDlhYvpmoblvZPliY3lkJHph4/jgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgY2xvbmUgKCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54LCB0aGlzLnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXQgdGhlIGN1cnJlbnQgdmVjdG9yIHZhbHVlIHdpdGggdGhlIGdpdmVuIHZlY3Rvci5cbiAgICAgKiBAemgg6K6+572u5b2T5YmN5ZCR6YeP5L2/5YW25LiO5oyH5a6a5ZCR6YeP55u4562J44CCXG4gICAgICogQHBhcmFtIG90aGVyIFNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIGB0aGlzYFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgKG90aGVyOiBWZWMyKTtcblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXQgdGhlIHZhbHVlIG9mIGVhY2ggY29tcG9uZW50IG9mIHRoZSBjdXJyZW50IHZlY3Rvci5cbiAgICAgKiBAemgg6K6+572u5b2T5YmN5ZCR6YeP55qE5YW35L2T5YiG6YeP5YC844CCXG4gICAgICogQHBhcmFtIHggeCB2YWx1ZVxuICAgICAqIEBwYXJhbSB5IHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIGB0aGlzYFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgKHg/OiBudW1iZXIsIHk/OiBudW1iZXIpO1xuXG4gICAgcHVibGljIHNldCAoeD86IG51bWJlciB8IFZlYzIsIHk/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4Lng7XG4gICAgICAgICAgICB0aGlzLnkgPSB4Lnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4IHx8IDA7XG4gICAgICAgICAgICB0aGlzLnkgPSB5IHx8IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENoZWNrIHdoZXRoZXIgdGhlIHZlY3RvciBhcHByb3hpbWF0ZWx5IGVxdWFscyBhbm90aGVyIG9uZS5cbiAgICAgKiBAemgg5Yik5pat5b2T5YmN5ZCR6YeP5piv5ZCm5Zyo6K+v5beu6IyD5Zu05YaF5LiO5oyH5a6a5ZCR6YeP55u4562J44CCXG4gICAgICogQHBhcmFtIG90aGVyIFNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gZXBzaWxvbiBUaGUgZXJyb3IgYWxsb3dlZC4gSXRgcyBzaG91bGQgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLlxuICAgICAqIEByZXR1cm4gUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgY29tcG9uZW50cyBvZiBib3RoIHZlY3RvcnMgYXJlIGVxdWFsIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mIGVycm9yOyBvdGhlcndpc2UgaXQgcmV0dXJucyBgZmFsc2VgLlxuICAgICAqL1xuICAgIHB1YmxpYyBlcXVhbHMgKG90aGVyOiBWZWMyLCBlcHNpbG9uID0gRVBTSUxPTikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy54IC0gb3RoZXIueClcbiAgICAgICAgICAgIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueCksIE1hdGguYWJzKG90aGVyLngpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy55IC0gb3RoZXIueSlcbiAgICAgICAgICAgIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueSksIE1hdGguYWJzKG90aGVyLnkpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHRoZSB2ZWN0b3IgYXBwcm94aW1hdGVseSBlcXVhbHMgYW5vdGhlciBvbmUuXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeWQkemHj+aYr+WQpuWcqOivr+W3ruiMg+WbtOWGheS4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOetieOAglxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcGFyYW0geSBUaGUgeSB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIGVwc2lsb24gVGhlIGVycm9yIGFsbG93ZWQuIEl0YHMgc2hvdWxkIGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci5cbiAgICAgKiBAcmV0dXJuIFJldHVybnMgYHRydWVgIHdoZW4gdGhlIGNvbXBvbmVudHMgb2YgYm90aCB2ZWN0b3JzIGFyZSBlcXVhbCB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZSBvZiBlcnJvcjsgb3RoZXJ3aXNlIGl0IHJldHVybnMgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZXF1YWxzMmYgKHg6IG51bWJlciwgeTogbnVtYmVyLCBlcHNpbG9uID0gRVBTSUxPTikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy54IC0geClcbiAgICAgICAgICAgIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueCksIE1hdGguYWJzKHgpKVxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy55IC0geSlcbiAgICAgICAgICAgIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueSksIE1hdGguYWJzKHkpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHRoZSBjdXJyZW50IHZlY3RvciBzdHJpY3RseSBlcXVhbHMgYW5vdGhlciBWZWMyLlxuICAgICAqIEB6aCDliKTmlq3lvZPliY3lkJHph4/mmK/lkKbkuI7mjIflrprlkJHph4/nm7jnrYnjgIJcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEByZXR1cm4gUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgY29tcG9uZW50cyBvZiBib3RoIHZlY3RvcnMgYXJlIGVxdWFsIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mIGVycm9yOyBvdGhlcndpc2UgaXQgcmV0dXJucyBgZmFsc2VgLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdHJpY3RFcXVhbHMgKG90aGVyOiBWZWMyKSB7XG4gICAgICAgIHJldHVybiBvdGhlciAmJiB0aGlzLnggPT09IG90aGVyLnggJiYgdGhpcy55ID09PSBvdGhlci55O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHRoZSBjdXJyZW50IHZlY3RvciBzdHJpY3RseSBlcXVhbHMgYW5vdGhlciBWZWMyLlxuICAgICAqIEB6aCDliKTmlq3lvZPliY3lkJHph4/mmK/lkKbkuI7mjIflrprliIbph4/nmoTlkJHph4/nm7jnrYnjgIJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIHkgVGhlIHkgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEByZXR1cm4gUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgY29tcG9uZW50cyBvZiBib3RoIHZlY3RvcnMgYXJlIGVxdWFsIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mIGVycm9yOyBvdGhlcndpc2UgaXQgcmV0dXJucyBgZmFsc2VgLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdHJpY3RFcXVhbHMyZiAoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCA9PT0geCAmJiB0aGlzLnkgPT09IHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFRyYW5zZm9ybSB0byBzdHJpbmcgd2l0aCB2ZWN0b3IgaW5mb3JtYXRpb24uXG4gICAgICogQHpoIOi/lOWbnuW9k+WJjeWQkemHj+eahOWtl+espuS4suihqOekuuOAglxuICAgICAqIEByZXR1cm5zIFRoZSBzdHJpbmcgd2l0aCB2ZWN0b3IgaW5mb3JtYXRpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9TdHJpbmcgKCkge1xuICAgICAgICByZXR1cm4gYCgke3RoaXMueC50b0ZpeGVkKDIpfSwgJHt0aGlzLnkudG9GaXhlZCgyKX0pYDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlIGxpbmVhciBpbnRlcnBvbGF0aW9uIHJlc3VsdCBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyIG9uZSB3aXRoIGdpdmVuIHJhdGlvLlxuICAgICAqIEB6aCDmoLnmja7mjIflrprnmoTmj5LlgLzmr5TnjofvvIzku47lvZPliY3lkJHph4/liLDnm67moIflkJHph4/kuYvpl7TlgZrmj5LlgLzjgIJcbiAgICAgKiBAcGFyYW0gdG8gVGFyZ2V0IHZlY3RvclxuICAgICAqIEBwYXJhbSByYXRpbyBUaGUgaW50ZXJwb2xhdGlvbiBjb2VmZmljaWVudC5UaGUgcmFuZ2UgaXMgWzAsMV0uXG4gICAgICovXG4gICAgcHVibGljIGxlcnAgKHRvOiBWZWMyLCByYXRpbzogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzLng7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XG4gICAgICAgIHRoaXMueCA9IHggKyByYXRpbyAqICh0by54IC0geCk7XG4gICAgICAgIHRoaXMueSA9IHkgKyByYXRpbyAqICh0by55IC0geSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDbGFtcCB0aGUgdmVjdG9yIGJldHdlZW4gbWluSW5jbHVzaXZlIGFuZCBtYXhJbmNsdXNpdmUuXG4gICAgICogQHpoIOiuvue9ruW9k+WJjeWQkemHj+eahOWAvO+8jOS9v+WFtuWQhOS4quWIhumHj+mDveWkhOS6juaMh+WumueahOiMg+WbtOWGheOAglxuICAgICAqIEBwYXJhbSBtaW5JbmNsdXNpdmUgTWluaW11bSB2YWx1ZSBhbGxvd2VkXG4gICAgICogQHBhcmFtIG1heEluY2x1c2l2ZSBNYXhpbXVtIHZhbHVlIGFsbG93ZWRcbiAgICAgKiBAcmV0dXJuIGB0aGlzYFxuICAgICAqL1xuICAgIHB1YmxpYyBjbGFtcGYgKG1pbkluY2x1c2l2ZTogVmVjMiwgbWF4SW5jbHVzaXZlOiBWZWMyKSB7XG4gICAgICAgIHRoaXMueCA9IGNsYW1wKHRoaXMueCwgbWluSW5jbHVzaXZlLngsIG1heEluY2x1c2l2ZS54KTtcbiAgICAgICAgdGhpcy55ID0gY2xhbXAodGhpcy55LCBtaW5JbmNsdXNpdmUueSwgbWF4SW5jbHVzaXZlLnkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQWRkcyB0aGUgY3VycmVudCB2ZWN0b3Igd2l0aCBhbm90aGVyIG9uZSBhbmQgcmV0dXJuIHRoaXNcbiAgICAgKiBAemgg5ZCR6YeP5Yqg5rOV44CC5bCG5b2T5YmN5ZCR6YeP5LiO5oyH5a6a5ZCR6YeP55qE55u45YqgXG4gICAgICogQHBhcmFtIG90aGVyIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkIChvdGhlcjogVmVjMikge1xuICAgICAgICB0aGlzLnggKz0gb3RoZXIueDtcbiAgICAgICAgdGhpcy55ICs9IG90aGVyLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBBZGRzIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGFub3RoZXIgb25lIGFuZCByZXR1cm4gdGhpc1xuICAgICAqIEB6aCDlkJHph4/liqDms5XjgILlsIblvZPliY3lkJHph4/kuI7mjIflrprliIbph4/nmoTlkJHph4/nm7jliqBcbiAgICAgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIHkgVGhlIHkgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqL1xuICAgIHB1YmxpYyBhZGQyZiAoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54ICs9IHg7XG4gICAgICAgIHRoaXMueSArPSB5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU3VidHJhY3RzIG9uZSB2ZWN0b3IgZnJvbSB0aGlzLCBhbmQgcmV0dXJucyB0aGlzLlxuICAgICAqIEB6aCDlkJHph4/lh4/ms5XjgILlsIblvZPliY3lkJHph4/lh4/ljrvmjIflrprlkJHph49cbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxuICAgICAqL1xuICAgIHB1YmxpYyBzdWJ0cmFjdCAob3RoZXI6IFZlYzIpIHtcbiAgICAgICAgdGhpcy54IC09IG90aGVyLng7XG4gICAgICAgIHRoaXMueSAtPSBvdGhlci55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU3VidHJhY3RzIG9uZSB2ZWN0b3IgZnJvbSB0aGlzLCBhbmQgcmV0dXJucyB0aGlzLlxuICAgICAqIEB6aCDlkJHph4/lh4/ms5XjgILlsIblvZPliY3lkJHph4/lh4/ljrvmjIflrprliIbph4/nmoTlkJHph49cbiAgICAgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIHkgVGhlIHkgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqL1xuICAgIHB1YmxpYyBzdWJ0cmFjdDJmICh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggLT0geDtcbiAgICAgICAgdGhpcy55IC09IHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBNdWx0aXBsaWVzIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGEgbnVtYmVyLCBhbmQgcmV0dXJucyB0aGlzLlxuICAgICAqIEB6aCDlkJHph4/mlbDkuZjjgILlsIblvZPliY3lkJHph4/mlbDkuZjmjIflrprmoIfph49cbiAgICAgKiBAcGFyYW0gc2NhbGFyIHNjYWxhciBudW1iZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgbXVsdGlwbHlTY2FsYXIgKHNjYWxhcjogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NhbGFyID09PSAnb2JqZWN0JykgeyBjb25zb2xlLndhcm4oJ3Nob3VsZCB1c2UgVmVjMi5tdWx0aXBseSBmb3IgdmVjdG9yICogdmVjdG9yIG9wZXJhdGlvbicpOyB9XG4gICAgICAgIHRoaXMueCAqPSBzY2FsYXI7XG4gICAgICAgIHRoaXMueSAqPSBzY2FsYXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBNdWx0aXBsaWVzIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGFub3RoZXIgb25lIGFuZCByZXR1cm4gdGhpc1xuICAgICAqIEB6aCDlkJHph4/kuZjms5XjgILlsIblvZPliY3lkJHph4/kuZjku6XkuI7mjIflrprlkJHph4/nmoTnu5PmnpzotYvlgLznu5nlvZPliY3lkJHph4/jgIJcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxuICAgICAqL1xuICAgIHB1YmxpYyBtdWx0aXBseSAob3RoZXI6IFZlYzIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvdGhlciAhPT0gJ29iamVjdCcpIHsgY29uc29sZS53YXJuKCdzaG91bGQgdXNlIFZlYzIuc2NhbGUgZm9yIHZlY3RvciAqIHNjYWxhciBvcGVyYXRpb24nKTsgfVxuICAgICAgICB0aGlzLnggKj0gb3RoZXIueDtcbiAgICAgICAgdGhpcy55ICo9IG90aGVyLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBNdWx0aXBsaWVzIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGFub3RoZXIgb25lIGFuZCByZXR1cm4gdGhpc1xuICAgICAqIEB6aCDlkJHph4/kuZjms5XjgILlsIblvZPliY3lkJHph4/kuI7mjIflrprliIbph4/nmoTlkJHph4/nm7jkuZjnmoTnu5PmnpzotYvlgLznu5nlvZPliY3lkJHph4/jgIJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHBhcmFtIHkgVGhlIHkgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqL1xuICAgIHB1YmxpYyBtdWx0aXBseTJmICh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggKj0geDtcbiAgICAgICAgdGhpcy55ICo9IHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBFbGVtZW50LXdpc2VseSBkaXZpZGVzIHRoaXMgdmVjdG9yIHdpdGggYW5vdGhlciBvbmUsIGFuZCByZXR1cm4gdGhpcy5cbiAgICAgKiBAemgg5ZCR6YeP6YCQ5YWD57Sg55u46Zmk44CC5bCG5b2T5YmN5ZCR6YeP5LiO5oyH5a6a5YiG6YeP55qE5ZCR6YeP55u46Zmk55qE57uT5p6c6LWL5YC857uZ5b2T5YmN5ZCR6YeP44CCXG4gICAgICogQHBhcmFtIG90aGVyIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKi9cbiAgICBwdWJsaWMgZGl2aWRlIChvdGhlcjogVmVjMikge1xuICAgICAgICB0aGlzLnggLz0gb3RoZXIueDtcbiAgICAgICAgdGhpcy55IC89IG90aGVyLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBFbGVtZW50LXdpc2VseSBkaXZpZGVzIHRoaXMgdmVjdG9yIHdpdGggYW5vdGhlciBvbmUsIGFuZCByZXR1cm4gdGhpcy5cbiAgICAgKiBAemgg5ZCR6YeP6YCQ5YWD57Sg55u46Zmk44CC5bCG5b2T5YmN5ZCR6YeP5LiO5oyH5a6a5YiG6YeP55qE5ZCR6YeP55u46Zmk55qE57uT5p6c6LWL5YC857uZ5b2T5YmN5ZCR6YeP44CCXG4gICAgICogQHBhcmFtIHggVGhlIHggdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHZhbHVlIG9mIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKi9cbiAgICBwdWJsaWMgZGl2aWRlMmYgKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueCAvPSB4O1xuICAgICAgICB0aGlzLnkgLz0geTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFNldHMgZWFjaCBjb21wb25lbnQgb2YgdGhpcyB2ZWN0b3Igd2l0aCBpdHMgbmVnYXRpdmUgdmFsdWVcbiAgICAgKiBAemgg5bCG5b2T5YmN5ZCR6YeP55qE5ZCE5Liq5YiG6YeP5Y+W5Y+NXG4gICAgICovXG4gICAgcHVibGljIG5lZ2F0aXZlICgpIHtcbiAgICAgICAgdGhpcy54ID0gLXRoaXMueDtcbiAgICAgICAgdGhpcy55ID0gLXRoaXMueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IHdpdGggYW5vdGhlciB2ZWN0b3JcbiAgICAgKiBAemgg5ZCR6YeP54K55LmY44CCXG4gICAgICogQHBhcmFtIG90aGVyIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIFRoZSByZXN1bHQgb2YgY2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgd2l0aCBhbm90aGVyIHZlY3RvclxuICAgICAqL1xuICAgIHB1YmxpYyBkb3QgKG90aGVyOiBWZWMyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiBvdGhlci54ICsgdGhpcy55ICogb3RoZXIueTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCB3aXRoIGFub3RoZXIgdmVjdG9yLlxuICAgICAqIEB6aCDlkJHph4/lj4nkuZjjgIJcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxuICAgICAqIEByZXR1cm4gYG91dGBcbiAgICAgKi9cbiAgICBwdWJsaWMgY3Jvc3MgKG90aGVyOiBWZWMyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiBvdGhlci55IC0gdGhpcy55ICogb3RoZXIueDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gUmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxuICAgICAqIEB6aCDorqHnrpflkJHph4/nmoTplb/luqbvvIjmqKHvvInjgIJcbiAgICAgKiBAcmV0dXJuIExlbmd0aCBvZiB2ZWN0b3JcbiAgICAgKi9cbiAgICBwdWJsaWMgbGVuZ3RoICgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBSZXR1cm5zIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICAgKiBAemgg6K6h566X5ZCR6YeP6ZW/5bqm77yI5qih77yJ55qE5bmz5pa544CCXG4gICAgICogQHJldHVybiB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhpcyB2ZWN0b3JcbiAgICAgKi9cbiAgICBwdWJsaWMgbGVuZ3RoU3FyICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gTm9ybWFsaXplIHRoZSBjdXJyZW50IHZlY3Rvci5cbiAgICAgKiBAemgg5bCG5b2T5YmN5ZCR6YeP5b2S5LiA5YyW44CCXG4gICAgICovXG4gICAgcHVibGljIG5vcm1hbGl6ZSAoKSB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzLng7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XG4gICAgICAgIGxldCBsZW4gPSB4ICogeCArIHkgKiB5O1xuICAgICAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgICAgICAgICAgdGhpcy54ICo9IGxlbjtcbiAgICAgICAgICAgIHRoaXMueSAqPSBsZW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENhbGN1bGF0ZXMgcmFkaWFuIGFuZ2xlIGJldHdlZW4gdHdvIHZlY3RvcnNcbiAgICAgKiBAemgg6I635Y+W5b2T5YmN5ZCR6YeP5ZKM5oyH5a6a5ZCR6YeP5LmL6Ze055qE6KeS5bqm44CCXG4gICAgICogQHBhcmFtIG90aGVyIHNwZWNpZmllZCB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIFRoZSBhbmdsZSBiZXR3ZWVuIHRoZSBjdXJyZW50IHZlY3RvciBhbmQgdGhlIHNwZWNpZmllZCB2ZWN0b3IgKGluIHJhZGlhbnMpOyBpZiB0aGVyZSBhcmUgemVybyB2ZWN0b3JzIGluIHRoZSBjdXJyZW50IHZlY3RvciBhbmQgdGhlIHNwZWNpZmllZCB2ZWN0b3IsIDAgaXMgcmV0dXJuZWQuXG4gICAgICovXG4gICAgcHVibGljIGFuZ2xlIChvdGhlcjogVmVjMikge1xuICAgICAgICBjb25zdCBtYWdTcXIxID0gdGhpcy5sZW5ndGhTcXIoKTtcbiAgICAgICAgY29uc3QgbWFnU3FyMiA9IG90aGVyLmxlbmd0aFNxcigpO1xuXG4gICAgICAgIGlmIChtYWdTcXIxID09PSAwIHx8IG1hZ1NxcjIgPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignQ2FuXFwndCBnZXQgYW5nbGUgYmV0d2VlbiB6ZXJvIHZlY3RvcicpO1xuICAgICAgICAgICAgcmV0dXJuIDAuMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRvdCA9IHRoaXMuZG90KG90aGVyKTtcbiAgICAgICAgbGV0IHRoZXRhID0gZG90IC8gKE1hdGguc3FydChtYWdTcXIxICogbWFnU3FyMikpO1xuICAgICAgICB0aGV0YSA9IGNsYW1wKHRoZXRhLCAtMS4wLCAxLjApO1xuICAgICAgICByZXR1cm4gTWF0aC5hY29zKHRoZXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gR2V0IGFuZ2xlIGluIHJhZGlhbiBiZXR3ZWVuIHRoaXMgYW5kIHZlY3RvciB3aXRoIGRpcmVjdGlvbi5cbiAgICAgKiBAemgg6I635Y+W5b2T5YmN5ZCR6YeP5ZKM5oyH5a6a5ZCR6YeP5LmL6Ze055qE5pyJ56ym5Y+36KeS5bqm44CCPGJyLz5cbiAgICAgKiDmnInnrKblj7fop5LluqbnmoTlj5blgLzojIPlm7TkuLogKC0xODAsIDE4MF3vvIzlvZPliY3lkJHph4/lj6/ku6XpgJrov4fpgIbml7bpkojml4vovazmnInnrKblj7fop5LluqbkuI7mjIflrprlkJHph4/lkIzlkJHjgII8YnIvPlxuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXG4gICAgICogQHJldHVybiBUaGUgc2lnbmVkIGFuZ2xlIGJldHdlZW4gdGhlIGN1cnJlbnQgdmVjdG9yIGFuZCB0aGUgc3BlY2lmaWVkIHZlY3RvciAoaW4gcmFkaWFucyk7IGlmIHRoZXJlIGlzIGEgemVybyB2ZWN0b3IgaW4gdGhlIGN1cnJlbnQgdmVjdG9yIGFuZCB0aGUgc3BlY2lmaWVkIHZlY3RvciwgMCBpcyByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2lnbkFuZ2xlIChvdGhlcjogVmVjMikge1xuICAgICAgICBjb25zdCBhbmdsZSA9IHRoaXMuYW5nbGUob3RoZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5jcm9zcyhvdGhlcikgPCAwID8gLWFuZ2xlIDogYW5nbGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFJvdGF0ZXMgdGhlIGN1cnJlbnQgdmVjdG9yIGJ5IGFuIGFuZ2xlIGluIHJhZGlhbiB2YWx1ZVxuICAgICAqIEB6aCDlsIblvZPliY3lkJHph4/nmoTml4vovaxcbiAgICAgKiBAcGFyYW0gcmFkaWFucyByYWRpdXMgb2Ygcm90YXRpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgcm90YXRlIChyYWRpYW5zOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMueTtcblxuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihyYWRpYW5zKTtcbiAgICAgICAgY29uc3QgY29zID0gTWF0aC5jb3MocmFkaWFucyk7XG4gICAgICAgIHRoaXMueCA9IGNvcyAqIHggLSBzaW4gKiB5O1xuICAgICAgICB0aGlzLnkgPSBzaW4gKiB4ICsgY29zICogeTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFByb2plY3RzIHRoZSBjdXJyZW50IHZlY3RvciBvbiBhbm90aGVyIG9uZVxuICAgICAqIEB6aCDorqHnrpflvZPliY3lkJHph4/lnKjmjIflrprlkJHph4/kuIrnmoTmipXlvbHlkJHph4/jgIJcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxuICAgICAqL1xuICAgIHB1YmxpYyBwcm9qZWN0IChvdGhlcjogVmVjMikge1xuICAgICAgICBjb25zdCBzY2FsYXIgPSB0aGlzLmRvdChvdGhlcikgLyBvdGhlci5kb3Qob3RoZXIpO1xuICAgICAgICB0aGlzLnggPSBvdGhlci54ICogc2NhbGFyO1xuICAgICAgICB0aGlzLnkgPSBvdGhlci55ICogc2NhbGFyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0NC4gM3JkIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMCcsIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gICAgICogQHpoIOWwhuW9k+WJjeWQkemHj+inhuS4uiB6IOWIhumHj+S4uiAw44CBdyDliIbph4/kuLogMSDnmoTlm5vnu7TlkJHph4/vvIw8YnIvPlxuICAgICAqIOW6lOeUqOWbm+e7tOefqemYteWPmOaNouWIsOW9k+WJjeefqemYtTxici8+XG4gICAgICogQHBhcmFtIG1hdHJpeCBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAgICAgKi9cbiAgICBwdWJsaWMgdHJhbnNmb3JtTWF0NCAobWF0cml4OiBNYXQ0KSB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzLng7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XG4gICAgICAgIHRoaXMueCA9IG1hdHJpeC5tMDAgKiB4ICsgbWF0cml4Lm0wNCAqIHkgKyBtYXRyaXgubTEyO1xuICAgICAgICB0aGlzLnkgPSBtYXRyaXgubTAxICogeCArIG1hdHJpeC5tMDUgKiB5ICsgbWF0cml4Lm0xMztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5cbmNvbnN0IHYyXzEgPSBuZXcgVmVjMigpO1xuY29uc3QgdjJfMiA9IG5ldyBWZWMyKCk7Il19