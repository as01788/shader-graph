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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVjMi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlscy9NYXRocy9WZWMyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLG1DQUFpRDtBQUNqRCxpQ0FBOEI7QUFHOUIsTUFBYSxJQUFJO0lBd1piLFlBQWEsQ0FBaUIsRUFBRSxDQUFVO1FBQ3RDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEI7YUFBTTtZQUNILElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBelpEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQTBCLENBQU07UUFDL0MsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBMEIsR0FBUSxFQUFFLENBQU07UUFDeEQsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1osT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBMEIsR0FBUSxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQ3JFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsR0FBRyxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQU07UUFDL0QsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFNO1FBQ3BFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTTtRQUNwRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQU07UUFDbEUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBMEIsR0FBUSxFQUFFLENBQU07UUFDeEQsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQTBCLEdBQVEsRUFBRSxDQUFNO1FBQ3pELEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsR0FBRyxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQU07UUFDL0QsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsR0FBRyxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQU07UUFDL0QsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUEwQixHQUFRLEVBQUUsQ0FBTTtRQUN6RCxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLGNBQWMsQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFTO1FBQzdFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsV0FBVyxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQU0sRUFBRSxLQUFhO1FBQ3RGLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM1QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUEwQixDQUFNLEVBQUUsQ0FBTTtRQUMxRCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLGVBQWUsQ0FBMEIsQ0FBTSxFQUFFLENBQU07UUFDakUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBMEIsQ0FBTTtRQUM3QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBMEIsQ0FBTTtRQUNuRCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUEwQixHQUFRLEVBQUUsQ0FBTTtRQUMxRCxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNiLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2IsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBMEIsR0FBUSxFQUFFLENBQU07UUFDM0QsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxXQUFXLENBQTBCLEdBQVEsRUFBRSxDQUFNO1FBQy9ELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWQsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLGVBQU8sRUFBRTtZQUN2QixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNiO2FBQU07WUFDSCxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDbkI7UUFFRCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBTyxFQUFFO1lBQ3ZCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2I7YUFBTTtZQUNILEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNuQjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQXNELEdBQVEsRUFBRSxDQUFXO1FBQzlGLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtZQUNULEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDaEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBMEIsQ0FBTSxFQUFFLENBQU07UUFDckQsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFlTSxNQUFNLENBQUMsS0FBSyxDQUFFLEdBQXFCLEVBQUUsQ0FBWSxFQUFFLENBQWE7UUFDbkUsSUFBSSxHQUFHLFlBQVksV0FBSSxFQUFFO1lBQ3JCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7YUFBTTtZQUNILE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsSUFBSSxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQU0sRUFBRSxDQUFTO1FBQzNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMxQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUEwQixHQUFRLEVBQUUsS0FBYztRQUNsRSxLQUFLLEdBQUcsS0FBSyxJQUFJLEdBQUcsQ0FBQztRQUNyQixNQUFNLENBQUMsR0FBRyxjQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNuQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDNUIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLGFBQWEsQ0FBcUQsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFZO1FBQzFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3RDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN0QyxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsYUFBYSxDQUFxRCxHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQVk7UUFDMUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDdEMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3RDLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxHQUFHLENBQTBCLENBQU07UUFDN0MsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBUSxHQUFRLEVBQUUsQ0FBWSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3hELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQTBCLEdBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDbkUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWSxDQUEwQixDQUFNLEVBQUUsQ0FBTTtRQUM5RCxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQTBCLENBQU0sRUFBRSxDQUFNLEVBQUcsT0FBTyxHQUFHLGVBQU87UUFDNUUsT0FBTyxDQUNILElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2VBQ2hCLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztlQUNyRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzttQkFDbkIsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzNELENBQUM7SUFDTixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBMEIsQ0FBTSxFQUFFLENBQU07UUFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxNQUFNLEdBQUcsR0FBRyxFQUFFO1lBQ2QsT0FBTyxDQUFDLENBQUM7U0FDWjtRQUNELElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUE0QkQ7OztPQUdHO0lBQ0ksS0FBSztRQUNSLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQW1CTSxHQUFHLENBQUUsQ0FBaUIsRUFBRSxDQUFVO1FBQ3JDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEI7YUFBTTtZQUNILElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFFLEtBQVcsRUFBRSxPQUFPLEdBQUcsZUFBTztRQUN6QyxPQUFPLENBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7ZUFDdkIsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2VBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO21CQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDbEUsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksUUFBUSxDQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsT0FBTyxHQUFHLGVBQU87UUFDcEQsT0FBTyxDQUNILElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7ZUFDakIsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFDdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzttQkFDcEIsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDNUQsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLFlBQVksQ0FBRSxLQUFXO1FBQzVCLE9BQU8sS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLGNBQWMsQ0FBRSxDQUFTLEVBQUUsQ0FBUztRQUN2QyxPQUFPLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksUUFBUTtRQUNYLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzFELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLElBQUksQ0FBRSxFQUFRLEVBQUUsS0FBYTtRQUNoQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUUsWUFBa0IsRUFBRSxZQUFrQjtRQUNqRCxJQUFJLENBQUMsQ0FBQyxHQUFHLGFBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxDQUFDLEdBQUcsYUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxHQUFHLENBQUUsS0FBVztRQUNuQixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBRSxDQUFTLEVBQUUsQ0FBUztRQUM5QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxRQUFRLENBQUUsS0FBVztRQUN4QixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLFVBQVUsQ0FBRSxDQUFTLEVBQUUsQ0FBUztRQUNuQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxjQUFjLENBQUUsTUFBYztRQUNqQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0RBQXdELENBQUMsQ0FBQztTQUFFO1FBQzNHLElBQUksQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksUUFBUSxDQUFFLEtBQVc7UUFDeEIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLHFEQUFxRCxDQUFDLENBQUM7U0FBRTtRQUN2RyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLFVBQVUsQ0FBRSxDQUFTLEVBQUUsQ0FBUztRQUNuQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUUsS0FBVztRQUN0QixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLFFBQVEsQ0FBRSxDQUFTLEVBQUUsQ0FBUztRQUNqQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFFBQVE7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxHQUFHLENBQUUsS0FBVztRQUNuQixPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFFLEtBQVc7UUFDckIsT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxTQUFTO1FBQ1osTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDVCxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDZCxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztTQUNqQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBRSxLQUFXO1FBQ3JCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFbEMsSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1lBQ3JELE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLElBQUksS0FBSyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDakQsS0FBSyxHQUFHLGFBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxTQUFTLENBQUUsS0FBVztRQUN6QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUUsT0FBZTtRQUMxQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFakIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksT0FBTyxDQUFFLEtBQVc7UUFDdkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxhQUFhLENBQUUsTUFBWTtRQUM5QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3RELElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUN0RCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOztBQWx4Qkwsb0JBbXhCQztBQWx4QmlCLFNBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLFFBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLFlBQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QyxXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQWl4QnpELE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hdDQgfSBmcm9tIFwiLi9NYXQ0XCI7XHJcbmltcG9ydCB7IElNYXQzTGlrZSwgSU1hdDRMaWtlLCBJVmVjMkxpa2UgfSBmcm9tIFwiLi90eXBlLWRlZmluZVwiO1xyXG5pbXBvcnQgeyBjbGFtcCwgRVBTSUxPTiwgcmFuZG9tIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgVmVjMyB9IGZyb20gXCIuL1ZlYzNcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVmVjMntcclxuICAgIHB1YmxpYyBzdGF0aWMgWkVSTyA9IE9iamVjdC5mcmVlemUobmV3IFZlYzIoMCwgMCkpO1xyXG4gICAgcHVibGljIHN0YXRpYyBPTkUgPSBPYmplY3QuZnJlZXplKG5ldyBWZWMyKDEsIDEpKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgTkVHX09ORSA9IE9iamVjdC5mcmVlemUobmV3IFZlYzIoLTEsIC0xKSk7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVOSVRfWCA9IE9iamVjdC5mcmVlemUobmV3IFZlYzIoMSwgMCkpO1xyXG4gICAgcHVibGljIHN0YXRpYyBVTklUX1kgPSBPYmplY3QuZnJlZXplKG5ldyBWZWMyKDAsIDEpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBPYnRhaW5zIGEgY2xvbmUgb2YgdGhlIGdpdmVuIHZlY3RvciBvYmplY3RcclxuICAgICAqIEB6aCDojrflvpfmjIflrprlkJHph4/nmoTmi7fotJ1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjbG9uZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKGEueCwgYS55KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDb3B5IHRoZSB0YXJnZXQgdmVjdG9yIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XHJcbiAgICAgKiBAemgg5aSN5Yi255uu5qCH5ZCR6YePXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29weSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gYS54O1xyXG4gICAgICAgIG91dC55ID0gYS55O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0cyB0aGUgb3V0IHZlY3RvciB3aXRoIHRoZSBnaXZlbiB4IGFuZCB5IHZhbHVlc1xyXG4gICAgICogQHpoIOiuvue9ruWQkemHj+WAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgb3V0LnggPSB4O1xyXG4gICAgICAgIG91dC55ID0geTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEVsZW1lbnQtd2lzZSB2ZWN0b3IgYWRkaXRpb24gYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IHZlY3RvciBvYmplY3RcclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/liqDms5VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhZGQgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gYS54ICsgYi54O1xyXG4gICAgICAgIG91dC55ID0gYS55ICsgYi55O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlIHZlY3RvciBzdWJ0cmFjdGlvbiBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgdmVjdG9yIG9iamVjdFxyXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+WHj+azlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN1YnRyYWN0IDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IGEueCAtIGIueDtcclxuICAgICAgICBvdXQueSA9IGEueSAtIGIueTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEVsZW1lbnQtd2lzZSB2ZWN0b3IgbXVsdGlwbGljYXRpb24gYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IHZlY3RvciBvYmplY3RcclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/kuZjms5VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtdWx0aXBseSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSBhLnggKiBiLng7XHJcbiAgICAgICAgb3V0LnkgPSBhLnkgKiBiLnk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBFbGVtZW50LXdpc2UgdmVjdG9yIGRpdmlzaW9uIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP6Zmk5rOVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZGl2aWRlIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IGEueCAvIGIueDtcclxuICAgICAgICBvdXQueSA9IGEueSAvIGIueTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFJvdW5kcyB1cCBieSBlbGVtZW50cyBvZiB0aGUgdmVjdG9yIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5ZCR5LiK5Y+W5pW0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2VpbCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5jZWlsKGEueCk7XHJcbiAgICAgICAgb3V0LnkgPSBNYXRoLmNlaWwoYS55KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEVsZW1lbnQtd2lzZSByb3VuZHMgZG93biBvZiB0aGUgY3VycmVudCB2ZWN0b3IgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gdGhlIG91dCB2ZWN0b3JcclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lkJHkuIvlj5bmlbRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmbG9vciA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5mbG9vcihhLngpO1xyXG4gICAgICAgIG91dC55ID0gTWF0aC5mbG9vcihhLnkpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyBlbGVtZW50LXdpc2UgbWluaW11bSB2YWx1ZXMgYW5kIHNhdmUgdG8gdGhlIG91dCB2ZWN0b3JcclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/mnIDlsI/lgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtaW4gPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5taW4oYS54LCBiLngpO1xyXG4gICAgICAgIG91dC55ID0gTWF0aC5taW4oYS55LCBiLnkpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyBlbGVtZW50LXdpc2UgbWF4aW11bSB2YWx1ZXMgYW5kIHNhdmUgdG8gdGhlIG91dCB2ZWN0b3JcclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/mnIDlpKflgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtYXggPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5tYXgoYS54LCBiLngpO1xyXG4gICAgICAgIG91dC55ID0gTWF0aC5tYXgoYS55LCBiLnkpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyBlbGVtZW50LXdpc2Ugcm91bmQgcmVzdWx0cyBhbmQgc2F2ZSB0byB0aGUgb3V0IHZlY3RvclxyXG4gICAgICogQHpoIOmAkOWFg+e0oOWQkemHj+Wbm+iIjeS6lOWFpeWPluaVtFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJvdW5kIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSBNYXRoLnJvdW5kKGEueCk7XHJcbiAgICAgICAgb3V0LnkgPSBNYXRoLnJvdW5kKGEueSk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWZWN0b3Igc2NhbGFyIG11bHRpcGxpY2F0aW9uIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCB2ZWN0b3Igb2JqZWN0XHJcbiAgICAgKiBAemgg5ZCR6YeP5qCH6YeP5LmY5rOVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbXVsdGlwbHlTY2FsYXIgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IG51bWJlcikge1xyXG4gICAgICAgIG91dC54ID0gYS54ICogYjtcclxuICAgICAgICBvdXQueSA9IGEueSAqIGI7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBFbGVtZW50LXdpc2UgbXVsdGlwbGljYXRpb24gYW5kIGFkZGl0aW9uIHdpdGggdGhlIGVxdWF0aW9uOiBhICsgYiAqIHNjYWxlXHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5LmY5YqgOiBBICsgQiAqIHNjYWxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2NhbGVBbmRBZGQgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgc2NhbGU6IG51bWJlcikge1xyXG4gICAgICAgIG91dC54ID0gYS54ICsgKGIueCAqIHNjYWxlKTtcclxuICAgICAgICBvdXQueSA9IGEueSArIChiLnkgKiBzY2FsZSk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBldWNsaWRlYW4gZGlzdGFuY2Ugb2YgdHdvIHZlY3RvcnNcclxuICAgICAqIEB6aCDmsYLkuKTlkJHph4/nmoTmrKfmsI/ot53nprtcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkaXN0YW5jZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBjb25zdCB4ID0gYi54IC0gYS54O1xyXG4gICAgICAgIGNvbnN0IHkgPSBiLnkgLSBhLnk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGVhbiBkaXN0YW5jZSBvZiB0d28gdmVjdG9yc1xyXG4gICAgICogQHpoIOaxguS4pOWQkemHj+eahOasp+awj+i3neemu+W5s+aWuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNxdWFyZWREaXN0YW5jZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBjb25zdCB4ID0gYi54IC0gYS54O1xyXG4gICAgICAgIGNvbnN0IHkgPSBiLnkgLSBhLnk7XHJcbiAgICAgICAgcmV0dXJuIHggKiB4ICsgeSAqIHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3JcclxuICAgICAqIEB6aCDmsYLlkJHph4/plb/luqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsZW4gPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCkge1xyXG4gICAgICAgIGNvbnN0IHggPSBhLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGEueTtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoZSB2ZWN0b3JcclxuICAgICAqIEB6aCDmsYLlkJHph4/plb/luqblubPmlrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsZW5ndGhTcXIgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCkge1xyXG4gICAgICAgIGNvbnN0IHggPSBhLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGEueTtcclxuICAgICAgICByZXR1cm4geCAqIHggKyB5ICogeTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIGVhY2ggZWxlbWVudCB0byBpdHMgbmVnYXRpdmUgdmFsdWVcclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lj5botJ9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBuZWdhdGUgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IC1hLng7XHJcbiAgICAgICAgb3V0LnkgPSAtYS55O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0cyBlYWNoIGVsZW1lbnQgdG8gaXRzIGludmVyc2UgdmFsdWUsIHplcm8gdmFsdWUgd2lsbCBiZWNvbWUgSW5maW5pdHlcclxuICAgICAqIEB6aCDpgJDlhYPntKDlkJHph4/lj5blgJLmlbDvvIzmjqXov5EgMCDml7bov5Tlm54gSW5maW5pdHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnZlcnNlIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSAxLjAgLyBhLng7XHJcbiAgICAgICAgb3V0LnkgPSAxLjAgLyBhLnk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIGVhY2ggZWxlbWVudCB0byBpdHMgaW52ZXJzZSB2YWx1ZSwgemVybyB2YWx1ZSB3aWxsIHJlbWFpbiB6ZXJvXHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W5YCS5pWw77yM5o6l6L+RIDAg5pe26L+U5ZueIDBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnZlcnNlU2FmZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIGNvbnN0IHggPSBhLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGEueTtcclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHgpIDwgRVBTSUxPTikge1xyXG4gICAgICAgICAgICBvdXQueCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0LnggPSAxLjAgLyB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHkpIDwgRVBTSUxPTikge1xyXG4gICAgICAgICAgICBvdXQueSA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0LnkgPSAxLjAgLyB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIHRoZSBub3JtYWxpemVkIHZlY3RvciB0byB0aGUgb3V0IHZlY3RvclxyXG4gICAgICogQHpoIOW9kuS4gOWMluWQkemHj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG5vcm1hbGl6ZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlLCBWZWMyTGlrZSBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBWZWMyTGlrZSkge1xyXG4gICAgICAgIGNvbnN0IHggPSBhLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGEueTtcclxuICAgICAgICBsZXQgbGVuID0geCAqIHggKyB5ICogeTtcclxuICAgICAgICBpZiAobGVuID4gMCkge1xyXG4gICAgICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XHJcbiAgICAgICAgICAgIG91dC54ID0geCAqIGxlbjtcclxuICAgICAgICAgICAgb3V0LnkgPSB5ICogbGVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoZSB2ZWN0b3JcclxuICAgICAqIEB6aCDlkJHph4/ngrnnp6/vvIjmlbDph4/np6/vvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkb3QgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGEueCAqIGIueCArIGEueSAqIGIueTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHRoZSB2ZWN0b3JcclxuICAgICAqIEB6aCDlkJHph4/lj4nnp6/vvIjlkJHph4/np6/vvInvvIzms6jmhI/kuoznu7TlkJHph4/nmoTlj4nnp6/kuLrkuI4gWiDovbTlubPooYznmoTkuInnu7TlkJHph49cclxuICAgICAqIEBvdmVycmlkZSAoYTpWZWMyLCBiOlZlYzIpID0+IG51bWJlclxyXG4gICAgICogQG92ZXJyaWRlIFtkZXByZWNhdGVkXSAob3V0OlZlYzMsIGE6VmVjMiwgYjpWZWMyKSA9PiBWZWMzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3Jvc3MgKGE6IElWZWMyTGlrZSwgYjogSVZlYzJMaWtlKTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgQ29uc2lkZXIgdXNlIGFub3RoZXIgb3ZlcnJpZGVzIHBsZWFzZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcm9zcyA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBWZWMzLCBhOiBPdXQsIGI6IE91dCk6IFZlYzM7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcm9zcyAob3V0OiBJVmVjMkxpa2UgfCBWZWMzLCBhOiBJVmVjMkxpa2UsIGI/OiBJVmVjMkxpa2UpIDogbnVtYmVyIHwgVmVjMyB7XHJcbiAgICAgICAgaWYgKG91dCBpbnN0YW5jZW9mIFZlYzMpIHtcclxuICAgICAgICAgICAgb3V0LnggPSBvdXQueSA9IDA7XHJcbiAgICAgICAgICAgIG91dC56ID0gYS54ICogYiEueSAtIGEueSAqIGIhLng7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG91dC54ICogYS55IC0gb3V0LnkgKiBhLng7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlY3RvcnMgd2l0aCBhIGdpdmVuIHJhdGlvXHJcbiAgICAgKiBAemgg6YCQ5YWD57Sg5ZCR6YeP57q/5oCn5o+S5YC877yaIEEgKyB0ICogKEIgLSBBKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxlcnAgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgdDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IGEueDtcclxuICAgICAgICBjb25zdCB5ID0gYS55O1xyXG4gICAgICAgIG91dC54ID0geCArIHQgKiAoYi54IC0geCk7XHJcbiAgICAgICAgb3V0LnkgPSB5ICsgdCAqIChiLnkgLSB5KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEdlbmVyYXRlcyBhIHVuaWZvcm1seSBkaXN0cmlidXRlZCByYW5kb20gdmVjdG9yIHBvaW50cyBmcm9tIGNlbnRlciB0byB0aGUgc3VyZmFjZSBvZiB0aGUgdW5pdCBzcGhlcmVcclxuICAgICAqIEB6aCDnlJ/miJDkuIDkuKrlnKjljZXkvY3lnIbkuIrlnYfljIDliIbluIPnmoTpmo/mnLrlkJHph49cclxuICAgICAqIEBwYXJhbSBzY2FsZSB2ZWN0b3IgbGVuZ3RoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmFuZG9tIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgc2NhbGU/OiBudW1iZXIpIHtcclxuICAgICAgICBzY2FsZSA9IHNjYWxlIHx8IDEuMDtcclxuICAgICAgICBjb25zdCByID0gcmFuZG9tKCkgKiAyLjAgKiBNYXRoLlBJO1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5jb3MocikgKiBzY2FsZTtcclxuICAgICAgICBvdXQueSA9IE1hdGguc2luKHIpICogc2NhbGU7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWZWN0b3IgYW5kIHRoaXJkIG9yZGVyIG1hdHJpeCBtdWx0aXBsaWNhdGlvbiwgd2lsbCBjb21wbGV0ZSB0aGUgdmVjdG9yIHdpdGggYSB0aGlyZCB2YWx1ZSBhcyBvbmVcclxuICAgICAqIEB6aCDlkJHph4/kuI7kuInnu7Tnn6npmLXkuZjms5XvvIzpu5jorqTlkJHph4/nrKzkuInkvY3kuLogMeOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRyYW5zZm9ybU1hdDMgPE91dCBleHRlbmRzIElWZWMyTGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIG06IElNYXQzTGlrZSkge1xyXG4gICAgICAgIGNvbnN0IHggPSBhLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGEueTtcclxuICAgICAgICBvdXQueCA9IG0ubTAwICogeCArIG0ubTAzICogeSArIG0ubTA2O1xyXG4gICAgICAgIG91dC55ID0gbS5tMDEgKiB4ICsgbS5tMDQgKiB5ICsgbS5tMDc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBWZWN0b3IgYW5kIHRoaXJkIG9yZGVyIG1hdHJpeCBtdWx0aXBsaWNhdGlvbiwgd2lsbCBjb21wbGV0ZSB0aGUgdmVjdG9yIHdpdGggYSB0aGlyZCBhbmQgYSBmb3VydGggZWxlbWVudCBhcyBvbmVcclxuICAgICAqIEB6aCDlkJHph4/kuI7lm5vnu7Tnn6npmLXkuZjms5XvvIzpu5jorqTlkJHph4/nrKzkuInkvY3kuLogMO+8jOesrOWbm+S9jeS4uiAx44CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdHJhbnNmb3JtTWF0NCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgbTogSU1hdDRMaWtlKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IGEueDtcclxuICAgICAgICBjb25zdCB5ID0gYS55O1xyXG4gICAgICAgIG91dC54ID0gbS5tMDAgKiB4ICsgbS5tMDQgKiB5ICsgbS5tMTI7XHJcbiAgICAgICAgb3V0LnkgPSBtLm0wMSAqIHggKyBtLm0wNSAqIHkgKyBtLm0xMztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEdldHMgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gdmVjdG9yXHJcbiAgICAgKiBAemgg6L+U5Zue5ZCR6YeP55qE5a2X56ym5Liy6KGo56S6XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3RyIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQpIHtcclxuICAgICAgICByZXR1cm4gYFZlYzIoJHthLnh9LCAke2EueX0pYDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDb252ZXJ0cyB0aGUgZ2l2ZW4gdmVjdG9yIHRvIGFuIGFycmF5XHJcbiAgICAgKiBAemgg5ZCR6YeP6L2s5pWw57uEXHJcbiAgICAgKiBAcGFyYW0gb2ZzIEFycmF5IFN0YXJ0IE9mZnNldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRvQXJyYXkgPE91dD4gKG91dDogT3V0LCB2OiBJVmVjMkxpa2UsIG9mcyA9IDApIHtcclxuICAgICAgICBvdXRbb2ZzICsgMF0gPSB2Lng7XHJcbiAgICAgICAgb3V0W29mcyArIDFdID0gdi55O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ29udmVydHMgdGhlIGdpdmVuIGFycmF5IHRvIGEgdmVjdG9yXHJcbiAgICAgKiBAemgg5pWw57uE6L2s5ZCR6YePXHJcbiAgICAgKiBAcGFyYW0gb2ZzIEFycmF5IFN0YXJ0IE9mZnNldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21BcnJheSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGFyciwgb2ZzID0gMCkge1xyXG4gICAgICAgIG91dC54ID0gYXJyW29mcyArIDBdO1xyXG4gICAgICAgIG91dC55ID0gYXJyW29mcyArIDFdO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2hlY2sgdGhlIGVxdWFsaXR5IG9mIHRoZSB0d28gZ2l2ZW4gdmVjdG9yc1xyXG4gICAgICogQHpoIOWQkemHj+etieS7t+WIpOaWrVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0cmljdEVxdWFscyA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICByZXR1cm4gYS54ID09PSBiLnggJiYgYS55ID09PSBiLnk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2hlY2sgd2hldGhlciB0aGUgdHdvIGdpdmVuIHZlY3RvcnMgYXJlIGFwcHJveGltYXRlbHkgZXF1aXZhbGVudFxyXG4gICAgICogQHpoIOaOkumZpOa1rueCueaVsOivr+W3rueahOWQkemHj+i/keS8vOetieS7t+WIpOaWrVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGVxdWFscyA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0LCBiOiBPdXQsICBlcHNpbG9uID0gRVBTSUxPTikge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIE1hdGguYWJzKGEueCAtIGIueClcclxuICAgICAgICAgICAgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS54KSwgTWF0aC5hYnMoYi54KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS55IC0gYi55KVxyXG4gICAgICAgICAgICA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLnkpLCBNYXRoLmFicyhiLnkpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2FsY3VsYXRlcyB0aGUgcmFkaWFuIGFuZ2xlIGJldHdlZW4gdHdvIHZlY3RvcnNcclxuICAgICAqIEB6aCDmsYLkuKTlkJHph4/lpLnop5LlvKfluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhbmdsZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBWZWMyLm5vcm1hbGl6ZSh2Ml8xLCBhKTtcclxuICAgICAgICBWZWMyLm5vcm1hbGl6ZSh2Ml8yLCBiKTtcclxuICAgICAgICBjb25zdCBjb3NpbmUgPSBWZWMyLmRvdCh2Ml8xLCB2Ml8yKTtcclxuICAgICAgICBpZiAoY29zaW5lID4gMS4wKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29zaW5lIDwgLTEuMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5QSTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWNvcyhjb3NpbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIHggY29tcG9uZW50LlxyXG4gICAgICogQHpoIHgg5YiG6YeP44CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWNsYXJlIHg6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiB5IGNvbXBvbmVudC5cclxuICAgICAqIEB6aCB5IOWIhumHj+OAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjbGFyZSB5OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG90aGVyOiBWZWMyKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoeD86IG51bWJlciwgeT86IG51bWJlcik7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKHg/OiBudW1iZXIgfCBWZWMyLCB5PzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHgueDtcclxuICAgICAgICAgICAgdGhpcy55ID0geC55O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgICAgICAgICAgdGhpcy55ID0geSB8fCAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBjbG9uZSBhIFZlYzIgdmFsdWVcclxuICAgICAqIEB6aCDlhYvpmoblvZPliY3lkJHph4/jgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsb25lICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFNldCB0aGUgY3VycmVudCB2ZWN0b3IgdmFsdWUgd2l0aCB0aGUgZ2l2ZW4gdmVjdG9yLlxyXG4gICAgICogQHpoIOiuvue9ruW9k+WJjeWQkemHj+S9v+WFtuS4juaMh+WumuWQkemHj+ebuOetieOAglxyXG4gICAgICogQHBhcmFtIG90aGVyIFNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqIEByZXR1cm4gYHRoaXNgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgKG90aGVyOiBWZWMyKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXQgdGhlIHZhbHVlIG9mIGVhY2ggY29tcG9uZW50IG9mIHRoZSBjdXJyZW50IHZlY3Rvci5cclxuICAgICAqIEB6aCDorr7nva7lvZPliY3lkJHph4/nmoTlhbfkvZPliIbph4/lgLzjgIJcclxuICAgICAqIEBwYXJhbSB4IHggdmFsdWVcclxuICAgICAqIEBwYXJhbSB5IHkgdmFsdWVcclxuICAgICAqIEByZXR1cm4gYHRoaXNgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgKHg/OiBudW1iZXIsIHk/OiBudW1iZXIpO1xyXG5cclxuICAgIHB1YmxpYyBzZXQgKHg/OiBudW1iZXIgfCBWZWMyLCB5PzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHgueDtcclxuICAgICAgICAgICAgdGhpcy55ID0geC55O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgICAgICAgICAgdGhpcy55ID0geSB8fCAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHRoZSB2ZWN0b3IgYXBwcm94aW1hdGVseSBlcXVhbHMgYW5vdGhlciBvbmUuXHJcbiAgICAgKiBAemgg5Yik5pat5b2T5YmN5ZCR6YeP5piv5ZCm5Zyo6K+v5beu6IyD5Zu05YaF5LiO5oyH5a6a5ZCR6YeP55u4562J44CCXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgU3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHBhcmFtIGVwc2lsb24gVGhlIGVycm9yIGFsbG93ZWQuIEl0YHMgc2hvdWxkIGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci5cclxuICAgICAqIEByZXR1cm4gUmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGUgY29tcG9uZW50cyBvZiBib3RoIHZlY3RvcnMgYXJlIGVxdWFsIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mIGVycm9yOyBvdGhlcndpc2UgaXQgcmV0dXJucyBgZmFsc2VgLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXF1YWxzIChvdGhlcjogVmVjMiwgZXBzaWxvbiA9IEVQU0lMT04pIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLnggLSBvdGhlci54KVxyXG4gICAgICAgICAgICA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLngpLCBNYXRoLmFicyhvdGhlci54KSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnModGhpcy55IC0gb3RoZXIueSlcclxuICAgICAgICAgICAgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy55KSwgTWF0aC5hYnMob3RoZXIueSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHRoZSB2ZWN0b3IgYXBwcm94aW1hdGVseSBlcXVhbHMgYW5vdGhlciBvbmUuXHJcbiAgICAgKiBAemgg5Yik5pat5b2T5YmN5ZCR6YeP5piv5ZCm5Zyo6K+v5beu6IyD5Zu05YaF5LiO5oyH5a6a5YiG6YeP55qE5ZCR6YeP55u4562J44CCXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0gZXBzaWxvbiBUaGUgZXJyb3IgYWxsb3dlZC4gSXRgcyBzaG91bGQgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLlxyXG4gICAgICogQHJldHVybiBSZXR1cm5zIGB0cnVlYCB3aGVuIHRoZSBjb21wb25lbnRzIG9mIGJvdGggdmVjdG9ycyBhcmUgZXF1YWwgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2Ugb2YgZXJyb3I7IG90aGVyd2lzZSBpdCByZXR1cm5zIGBmYWxzZWAuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlcXVhbHMyZiAoeDogbnVtYmVyLCB5OiBudW1iZXIsIGVwc2lsb24gPSBFUFNJTE9OKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy54IC0geClcclxuICAgICAgICAgICAgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy54KSwgTWF0aC5hYnMoeCkpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMueSAtIHkpXHJcbiAgICAgICAgICAgIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueSksIE1hdGguYWJzKHkpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2hlY2sgd2hldGhlciB0aGUgY3VycmVudCB2ZWN0b3Igc3RyaWN0bHkgZXF1YWxzIGFub3RoZXIgVmVjMi5cclxuICAgICAqIEB6aCDliKTmlq3lvZPliY3lkJHph4/mmK/lkKbkuI7mjIflrprlkJHph4/nm7jnrYnjgIJcclxuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcmV0dXJuIFJldHVybnMgYHRydWVgIHdoZW4gdGhlIGNvbXBvbmVudHMgb2YgYm90aCB2ZWN0b3JzIGFyZSBlcXVhbCB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZSBvZiBlcnJvcjsgb3RoZXJ3aXNlIGl0IHJldHVybnMgYGZhbHNlYC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0cmljdEVxdWFscyAob3RoZXI6IFZlYzIpIHtcclxuICAgICAgICByZXR1cm4gb3RoZXIgJiYgdGhpcy54ID09PSBvdGhlci54ICYmIHRoaXMueSA9PT0gb3RoZXIueTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHRoZSBjdXJyZW50IHZlY3RvciBzdHJpY3RseSBlcXVhbHMgYW5vdGhlciBWZWMyLlxyXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeWQkemHj+aYr+WQpuS4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOetieOAglxyXG4gICAgICogQHBhcmFtIHggVGhlIHggdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHJldHVybiBSZXR1cm5zIGB0cnVlYCB3aGVuIHRoZSBjb21wb25lbnRzIG9mIGJvdGggdmVjdG9ycyBhcmUgZXF1YWwgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2Ugb2YgZXJyb3I7IG90aGVyd2lzZSBpdCByZXR1cm5zIGBmYWxzZWAuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdHJpY3RFcXVhbHMyZiAoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ID09PSB4ICYmIHRoaXMueSA9PT0geTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBUcmFuc2Zvcm0gdG8gc3RyaW5nIHdpdGggdmVjdG9yIGluZm9ybWF0aW9uLlxyXG4gICAgICogQHpoIOi/lOWbnuW9k+WJjeWQkemHj+eahOWtl+espuS4suihqOekuuOAglxyXG4gICAgICogQHJldHVybnMgVGhlIHN0cmluZyB3aXRoIHZlY3RvciBpbmZvcm1hdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcgKCkge1xyXG4gICAgICAgIHJldHVybiBgKCR7dGhpcy54LnRvRml4ZWQoMil9LCAke3RoaXMueS50b0ZpeGVkKDIpfSlgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZSBsaW5lYXIgaW50ZXJwb2xhdGlvbiByZXN1bHQgYmV0d2VlbiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlciBvbmUgd2l0aCBnaXZlbiByYXRpby5cclxuICAgICAqIEB6aCDmoLnmja7mjIflrprnmoTmj5LlgLzmr5TnjofvvIzku47lvZPliY3lkJHph4/liLDnm67moIflkJHph4/kuYvpl7TlgZrmj5LlgLzjgIJcclxuICAgICAqIEBwYXJhbSB0byBUYXJnZXQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0gcmF0aW8gVGhlIGludGVycG9sYXRpb24gY29lZmZpY2llbnQuVGhlIHJhbmdlIGlzIFswLDFdLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbGVycCAodG86IFZlYzIsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB4ID0gdGhpcy54O1xyXG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XHJcbiAgICAgICAgdGhpcy54ID0geCArIHJhdGlvICogKHRvLnggLSB4KTtcclxuICAgICAgICB0aGlzLnkgPSB5ICsgcmF0aW8gKiAodG8ueSAtIHkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENsYW1wIHRoZSB2ZWN0b3IgYmV0d2VlbiBtaW5JbmNsdXNpdmUgYW5kIG1heEluY2x1c2l2ZS5cclxuICAgICAqIEB6aCDorr7nva7lvZPliY3lkJHph4/nmoTlgLzvvIzkvb/lhbblkITkuKrliIbph4/pg73lpITkuo7mjIflrprnmoTojIPlm7TlhoXjgIJcclxuICAgICAqIEBwYXJhbSBtaW5JbmNsdXNpdmUgTWluaW11bSB2YWx1ZSBhbGxvd2VkXHJcbiAgICAgKiBAcGFyYW0gbWF4SW5jbHVzaXZlIE1heGltdW0gdmFsdWUgYWxsb3dlZFxyXG4gICAgICogQHJldHVybiBgdGhpc2BcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsYW1wZiAobWluSW5jbHVzaXZlOiBWZWMyLCBtYXhJbmNsdXNpdmU6IFZlYzIpIHtcclxuICAgICAgICB0aGlzLnggPSBjbGFtcCh0aGlzLngsIG1pbkluY2x1c2l2ZS54LCBtYXhJbmNsdXNpdmUueCk7XHJcbiAgICAgICAgdGhpcy55ID0gY2xhbXAodGhpcy55LCBtaW5JbmNsdXNpdmUueSwgbWF4SW5jbHVzaXZlLnkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEFkZHMgdGhlIGN1cnJlbnQgdmVjdG9yIHdpdGggYW5vdGhlciBvbmUgYW5kIHJldHVybiB0aGlzXHJcbiAgICAgKiBAemgg5ZCR6YeP5Yqg5rOV44CC5bCG5b2T5YmN5ZCR6YeP5LiO5oyH5a6a5ZCR6YeP55qE55u45YqgXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkIChvdGhlcjogVmVjMikge1xyXG4gICAgICAgIHRoaXMueCArPSBvdGhlci54O1xyXG4gICAgICAgIHRoaXMueSArPSBvdGhlci55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIEFkZHMgdGhlIGN1cnJlbnQgdmVjdG9yIHdpdGggYW5vdGhlciBvbmUgYW5kIHJldHVybiB0aGlzXHJcbiAgICAgKiBAemgg5ZCR6YeP5Yqg5rOV44CC5bCG5b2T5YmN5ZCR6YeP5LiO5oyH5a6a5YiG6YeP55qE5ZCR6YeP55u45YqgXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGQyZiAoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggKz0geDtcclxuICAgICAgICB0aGlzLnkgKz0geTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTdWJ0cmFjdHMgb25lIHZlY3RvciBmcm9tIHRoaXMsIGFuZCByZXR1cm5zIHRoaXMuXHJcbiAgICAgKiBAemgg5ZCR6YeP5YeP5rOV44CC5bCG5b2T5YmN5ZCR6YeP5YeP5Y675oyH5a6a5ZCR6YePXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3VidHJhY3QgKG90aGVyOiBWZWMyKSB7XHJcbiAgICAgICAgdGhpcy54IC09IG90aGVyLng7XHJcbiAgICAgICAgdGhpcy55IC09IG90aGVyLnk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU3VidHJhY3RzIG9uZSB2ZWN0b3IgZnJvbSB0aGlzLCBhbmQgcmV0dXJucyB0aGlzLlxyXG4gICAgICogQHpoIOWQkemHj+WHj+azleOAguWwhuW9k+WJjeWQkemHj+WHj+WOu+aMh+WumuWIhumHj+eahOWQkemHj1xyXG4gICAgICogQHBhcmFtIHggVGhlIHggdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3VidHJhY3QyZiAoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggLT0geDtcclxuICAgICAgICB0aGlzLnkgLT0geTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBNdWx0aXBsaWVzIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGEgbnVtYmVyLCBhbmQgcmV0dXJucyB0aGlzLlxyXG4gICAgICogQHpoIOWQkemHj+aVsOS5mOOAguWwhuW9k+WJjeWQkemHj+aVsOS5mOaMh+Wumuagh+mHj1xyXG4gICAgICogQHBhcmFtIHNjYWxhciBzY2FsYXIgbnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtdWx0aXBseVNjYWxhciAoc2NhbGFyOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHNjYWxhciA9PT0gJ29iamVjdCcpIHsgY29uc29sZS53YXJuKCdzaG91bGQgdXNlIFZlYzIubXVsdGlwbHkgZm9yIHZlY3RvciAqIHZlY3RvciBvcGVyYXRpb24nKTsgfVxyXG4gICAgICAgIHRoaXMueCAqPSBzY2FsYXI7XHJcbiAgICAgICAgdGhpcy55ICo9IHNjYWxhcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBNdWx0aXBsaWVzIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGFub3RoZXIgb25lIGFuZCByZXR1cm4gdGhpc1xyXG4gICAgICogQHpoIOWQkemHj+S5mOazleOAguWwhuW9k+WJjeWQkemHj+S5mOS7peS4juaMh+WumuWQkemHj+eahOe7k+aenOi1i+WAvOe7meW9k+WJjeWQkemHj+OAglxyXG4gICAgICogQHBhcmFtIG90aGVyIHNwZWNpZmllZCB2ZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIG11bHRpcGx5IChvdGhlcjogVmVjMikge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3RoZXIgIT09ICdvYmplY3QnKSB7IGNvbnNvbGUud2Fybignc2hvdWxkIHVzZSBWZWMyLnNjYWxlIGZvciB2ZWN0b3IgKiBzY2FsYXIgb3BlcmF0aW9uJyk7IH1cclxuICAgICAgICB0aGlzLnggKj0gb3RoZXIueDtcclxuICAgICAgICB0aGlzLnkgKj0gb3RoZXIueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBNdWx0aXBsaWVzIHRoZSBjdXJyZW50IHZlY3RvciB3aXRoIGFub3RoZXIgb25lIGFuZCByZXR1cm4gdGhpc1xyXG4gICAgICogQHpoIOWQkemHj+S5mOazleOAguWwhuW9k+WJjeWQkemHj+S4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOS5mOeahOe7k+aenOi1i+WAvOe7meW9k+WJjeWQkemHj+OAglxyXG4gICAgICogQHBhcmFtIHggVGhlIHggdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgdmFsdWUgb2Ygc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbXVsdGlwbHkyZiAoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggKj0geDtcclxuICAgICAgICB0aGlzLnkgKj0geTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBFbGVtZW50LXdpc2VseSBkaXZpZGVzIHRoaXMgdmVjdG9yIHdpdGggYW5vdGhlciBvbmUsIGFuZCByZXR1cm4gdGhpcy5cclxuICAgICAqIEB6aCDlkJHph4/pgJDlhYPntKDnm7jpmaTjgILlsIblvZPliY3lkJHph4/kuI7mjIflrprliIbph4/nmoTlkJHph4/nm7jpmaTnmoTnu5PmnpzotYvlgLznu5nlvZPliY3lkJHph4/jgIJcclxuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXZpZGUgKG90aGVyOiBWZWMyKSB7XHJcbiAgICAgICAgdGhpcy54IC89IG90aGVyLng7XHJcbiAgICAgICAgdGhpcy55IC89IG90aGVyLnk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gRWxlbWVudC13aXNlbHkgZGl2aWRlcyB0aGlzIHZlY3RvciB3aXRoIGFub3RoZXIgb25lLCBhbmQgcmV0dXJuIHRoaXMuXHJcbiAgICAgKiBAemgg5ZCR6YeP6YCQ5YWD57Sg55u46Zmk44CC5bCG5b2T5YmN5ZCR6YeP5LiO5oyH5a6a5YiG6YeP55qE5ZCR6YeP55u46Zmk55qE57uT5p6c6LWL5YC857uZ5b2T5YmN5ZCR6YeP44CCXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSB2YWx1ZSBvZiBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXZpZGUyZiAoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggLz0geDtcclxuICAgICAgICB0aGlzLnkgLz0geTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTZXRzIGVhY2ggY29tcG9uZW50IG9mIHRoaXMgdmVjdG9yIHdpdGggaXRzIG5lZ2F0aXZlIHZhbHVlXHJcbiAgICAgKiBAemgg5bCG5b2T5YmN5ZCR6YeP55qE5ZCE5Liq5YiG6YeP5Y+W5Y+NXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZWdhdGl2ZSAoKSB7XHJcbiAgICAgICAgdGhpcy54ID0gLXRoaXMueDtcclxuICAgICAgICB0aGlzLnkgPSAtdGhpcy55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IHdpdGggYW5vdGhlciB2ZWN0b3JcclxuICAgICAqIEB6aCDlkJHph4/ngrnkuZjjgIJcclxuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcmV0dXJuIFRoZSByZXN1bHQgb2YgY2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgd2l0aCBhbm90aGVyIHZlY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG90IChvdGhlcjogVmVjMikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiBvdGhlci54ICsgdGhpcy55ICogb3RoZXIueTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDYWxjdWxhdGVzIHRoZSBjcm9zcyBwcm9kdWN0IHdpdGggYW5vdGhlciB2ZWN0b3IuXHJcbiAgICAgKiBAemgg5ZCR6YeP5Y+J5LmY44CCXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICogQHJldHVybiBgb3V0YFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3Jvc3MgKG90aGVyOiBWZWMyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIG90aGVyLnkgLSB0aGlzLnkgKiBvdGhlci54O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cclxuICAgICAqIEB6aCDorqHnrpflkJHph4/nmoTplb/luqbvvIjmqKHvvInjgIJcclxuICAgICAqIEByZXR1cm4gTGVuZ3RoIG9mIHZlY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbGVuZ3RoICgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gUmV0dXJucyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXHJcbiAgICAgKiBAemgg6K6h566X5ZCR6YeP6ZW/5bqm77yI5qih77yJ55qE5bmz5pa544CCXHJcbiAgICAgKiBAcmV0dXJuIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIHZlY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbGVuZ3RoU3FyICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIE5vcm1hbGl6ZSB0aGUgY3VycmVudCB2ZWN0b3IuXHJcbiAgICAgKiBAemgg5bCG5b2T5YmN5ZCR6YeP5b2S5LiA5YyW44CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBub3JtYWxpemUgKCkge1xyXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICAgICAgY29uc3QgeSA9IHRoaXMueTtcclxuICAgICAgICBsZXQgbGVuID0geCAqIHggKyB5ICogeTtcclxuICAgICAgICBpZiAobGVuID4gMCkge1xyXG4gICAgICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XHJcbiAgICAgICAgICAgIHRoaXMueCAqPSBsZW47XHJcbiAgICAgICAgICAgIHRoaXMueSAqPSBsZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZXMgcmFkaWFuIGFuZ2xlIGJldHdlZW4gdHdvIHZlY3RvcnNcclxuICAgICAqIEB6aCDojrflj5blvZPliY3lkJHph4/lkozmjIflrprlkJHph4/kuYvpl7TnmoTop5LluqbjgIJcclxuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcmV0dXJuIFRoZSBhbmdsZSBiZXR3ZWVuIHRoZSBjdXJyZW50IHZlY3RvciBhbmQgdGhlIHNwZWNpZmllZCB2ZWN0b3IgKGluIHJhZGlhbnMpOyBpZiB0aGVyZSBhcmUgemVybyB2ZWN0b3JzIGluIHRoZSBjdXJyZW50IHZlY3RvciBhbmQgdGhlIHNwZWNpZmllZCB2ZWN0b3IsIDAgaXMgcmV0dXJuZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhbmdsZSAob3RoZXI6IFZlYzIpIHtcclxuICAgICAgICBjb25zdCBtYWdTcXIxID0gdGhpcy5sZW5ndGhTcXIoKTtcclxuICAgICAgICBjb25zdCBtYWdTcXIyID0gb3RoZXIubGVuZ3RoU3FyKCk7XHJcblxyXG4gICAgICAgIGlmIChtYWdTcXIxID09PSAwIHx8IG1hZ1NxcjIgPT09IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdDYW5cXCd0IGdldCBhbmdsZSBiZXR3ZWVuIHplcm8gdmVjdG9yJyk7XHJcbiAgICAgICAgICAgIHJldHVybiAwLjA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkb3QgPSB0aGlzLmRvdChvdGhlcik7XHJcbiAgICAgICAgbGV0IHRoZXRhID0gZG90IC8gKE1hdGguc3FydChtYWdTcXIxICogbWFnU3FyMikpO1xyXG4gICAgICAgIHRoZXRhID0gY2xhbXAodGhldGEsIC0xLjAsIDEuMCk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWNvcyh0aGV0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gR2V0IGFuZ2xlIGluIHJhZGlhbiBiZXR3ZWVuIHRoaXMgYW5kIHZlY3RvciB3aXRoIGRpcmVjdGlvbi5cclxuICAgICAqIEB6aCDojrflj5blvZPliY3lkJHph4/lkozmjIflrprlkJHph4/kuYvpl7TnmoTmnInnrKblj7fop5LluqbjgII8YnIvPlxyXG4gICAgICog5pyJ56ym5Y+36KeS5bqm55qE5Y+W5YC86IyD5Zu05Li6ICgtMTgwLCAxODBd77yM5b2T5YmN5ZCR6YeP5Y+v5Lul6YCa6L+H6YCG5pe26ZKI5peL6L2s5pyJ56ym5Y+36KeS5bqm5LiO5oyH5a6a5ZCR6YeP5ZCM5ZCR44CCPGJyLz5cclxuICAgICAqIEBwYXJhbSBvdGhlciBzcGVjaWZpZWQgdmVjdG9yXHJcbiAgICAgKiBAcmV0dXJuIFRoZSBzaWduZWQgYW5nbGUgYmV0d2VlbiB0aGUgY3VycmVudCB2ZWN0b3IgYW5kIHRoZSBzcGVjaWZpZWQgdmVjdG9yIChpbiByYWRpYW5zKTsgaWYgdGhlcmUgaXMgYSB6ZXJvIHZlY3RvciBpbiB0aGUgY3VycmVudCB2ZWN0b3IgYW5kIHRoZSBzcGVjaWZpZWQgdmVjdG9yLCAwIGlzIHJldHVybmVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2lnbkFuZ2xlIChvdGhlcjogVmVjMikge1xyXG4gICAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5hbmdsZShvdGhlcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3Jvc3Mob3RoZXIpIDwgMCA/IC1hbmdsZSA6IGFuZ2xlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFJvdGF0ZXMgdGhlIGN1cnJlbnQgdmVjdG9yIGJ5IGFuIGFuZ2xlIGluIHJhZGlhbiB2YWx1ZVxyXG4gICAgICogQHpoIOWwhuW9k+WJjeWQkemHj+eahOaXi+i9rFxyXG4gICAgICogQHBhcmFtIHJhZGlhbnMgcmFkaXVzIG9mIHJvdGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByb3RhdGUgKHJhZGlhbnM6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICAgICAgY29uc3QgeSA9IHRoaXMueTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2luID0gTWF0aC5zaW4ocmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgY29zID0gTWF0aC5jb3MocmFkaWFucyk7XHJcbiAgICAgICAgdGhpcy54ID0gY29zICogeCAtIHNpbiAqIHk7XHJcbiAgICAgICAgdGhpcy55ID0gc2luICogeCArIGNvcyAqIHk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gUHJvamVjdHMgdGhlIGN1cnJlbnQgdmVjdG9yIG9uIGFub3RoZXIgb25lXHJcbiAgICAgKiBAemgg6K6h566X5b2T5YmN5ZCR6YeP5Zyo5oyH5a6a5ZCR6YeP5LiK55qE5oqV5b2x5ZCR6YeP44CCXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgc3BlY2lmaWVkIHZlY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcHJvamVjdCAob3RoZXI6IFZlYzIpIHtcclxuICAgICAgICBjb25zdCBzY2FsYXIgPSB0aGlzLmRvdChvdGhlcikgLyBvdGhlci5kb3Qob3RoZXIpO1xyXG4gICAgICAgIHRoaXMueCA9IG90aGVyLnggKiBzY2FsYXI7XHJcbiAgICAgICAgdGhpcy55ID0gb3RoZXIueSAqIHNjYWxhcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQ0LiAzcmQgdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcwJywgNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcclxuICAgICAqIEB6aCDlsIblvZPliY3lkJHph4/op4bkuLogeiDliIbph4/kuLogMOOAgXcg5YiG6YeP5Li6IDEg55qE5Zub57u05ZCR6YeP77yMPGJyLz5cclxuICAgICAqIOW6lOeUqOWbm+e7tOefqemYteWPmOaNouWIsOW9k+WJjeefqemYtTxici8+XHJcbiAgICAgKiBAcGFyYW0gbWF0cml4IG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdHJhbnNmb3JtTWF0NCAobWF0cml4OiBNYXQ0KSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHRoaXMueDtcclxuICAgICAgICBjb25zdCB5ID0gdGhpcy55O1xyXG4gICAgICAgIHRoaXMueCA9IG1hdHJpeC5tMDAgKiB4ICsgbWF0cml4Lm0wNCAqIHkgKyBtYXRyaXgubTEyO1xyXG4gICAgICAgIHRoaXMueSA9IG1hdHJpeC5tMDEgKiB4ICsgbWF0cml4Lm0wNSAqIHkgKyBtYXRyaXgubTEzO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY29uc3QgdjJfMSA9IG5ldyBWZWMyKCk7XHJcbmNvbnN0IHYyXzIgPSBuZXcgVmVjMigpOyJdfQ==