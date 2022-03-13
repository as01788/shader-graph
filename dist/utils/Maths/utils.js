"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumerableProps = exports.absMax = exports.absMaxComponent = exports.inverseLerp = exports.pingPong = exports.repeat = exports.nextPow2 = exports.pseudoRandomRangeInt = exports.pseudoRandomRange = exports.pseudoRandom = exports.randomRangeInt = exports.randomRange = exports.random = exports.toDegree = exports.toRadian = exports.lerp = exports.clamp01 = exports.clamp = exports.approx = exports.equals = exports.EPSILON = void 0;
const _d2r = Math.PI / 180.0;
const _r2d = 180.0 / Math.PI;
exports.EPSILON = 0.000001;
/**
 * @en Tests whether or not the arguments have approximately the same value, within an absolute<br/>
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less<br/>
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 * @zh 在glMatrix的绝对或相对容差范围内，测试参数是否具有近似相同的值。<br/>
 * EPSILON(小于等于1.0的值采用绝对公差，大于1.0的值采用相对公差)
 * @param a The first number to test.
 * @param b The second number to test.
 * @return True if the numbers are approximately equal, false otherwise.
 */
function equals(a, b) {
    return Math.abs(a - b) <= exports.EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
exports.equals = equals;
/**
 * @en Tests whether or not the arguments have approximately the same value by given maxDiff<br/>
 * @zh 通过给定的最大差异，测试参数是否具有近似相同的值。
 * @param a The first number to test.
 * @param b The second number to test.
 * @param maxDiff Maximum difference.
 * @return True if the numbers are approximately equal, false otherwise.
 */
function approx(a, b, maxDiff) {
    maxDiff = maxDiff || exports.EPSILON;
    return Math.abs(a - b) <= maxDiff;
}
exports.approx = approx;
/**
 * @en Clamps a value between a minimum float and maximum float value.<br/>
 * @zh 返回最小浮点数和最大浮点数之间的一个数值。可以使用 clamp 函数将不断变化的数值限制在范围内。
 * @param val
 * @param min
 * @param max
 */
function clamp(val, min, max) {
    if (min > max) {
        const temp = min;
        min = max;
        max = temp;
    }
    return val < min ? min : val > max ? max : val;
}
exports.clamp = clamp;
/**
 * @en Clamps a value between 0 and 1.<br/>
 * @zh 将值限制在0和1之间。
 * @param val
 */
function clamp01(val) {
    return val < 0 ? 0 : val > 1 ? 1 : val;
}
exports.clamp01 = clamp01;
/**
 * @param from
 * @param to
 * @param ratio - The interpolation coefficient.
 */
function lerp(from, to, ratio) {
    return from + (to - from) * ratio;
}
exports.lerp = lerp;
/**
 * @en Convert Degree To Radian<br/>
 * @zh 把角度换算成弧度。
 * @param {Number} a Angle in Degrees
 */
function toRadian(a) {
    return a * _d2r;
}
exports.toRadian = toRadian;
/**
 * @en Convert Radian To Degree<br/>
 * @zh 把弧度换算成角度。
 * @param {Number} a Angle in Radian
 */
function toDegree(a) {
    return a * _r2d;
}
exports.toDegree = toDegree;
/**
 * @method random
 */
exports.random = Math.random;
/**
 * @en Returns a floating-point random number between min (inclusive) and max (exclusive).<br/>
 * @zh 返回最小(包含)和最大(不包含)之间的浮点随机数。
 * @method randomRange
 * @param min
 * @param max
 * @return The random number.
 */
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}
exports.randomRange = randomRange;
/**
 * @en Returns a random integer between min (inclusive) and max (exclusive).<br/>
 * @zh 返回最小(包含)和最大(不包含)之间的随机整数。
 * @param min
 * @param max
 * @return The random integer.
 */
function randomRangeInt(min, max) {
    return Math.floor(randomRange(min, max));
}
exports.randomRangeInt = randomRangeInt;
/**
 * Linear congruential generator using Hull-Dobell Theorem.
 *
 * @param seed The random seed.
 * @return The pseudo random.
 */
function pseudoRandom(seed) {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280.0;
}
exports.pseudoRandom = pseudoRandom;
/**
 * Returns a floating-point pseudo-random number between min (inclusive) and max (exclusive).
 *
 * @param seed
 * @param min
 * @param max
 * @return The random number.
 */
function pseudoRandomRange(seed, min, max) {
    return pseudoRandom(seed) * (max - min) + min;
}
exports.pseudoRandomRange = pseudoRandomRange;
/**
 * @en Returns a pseudo-random integer between min (inclusive) and max (exclusive).<br/>
 * @zh 返回最小(包含)和最大(不包含)之间的浮点伪随机数。
 * @param seed
 * @param min
 * @param max
 * @return The random integer.
 */
function pseudoRandomRangeInt(seed, min, max) {
    return Math.floor(pseudoRandomRange(seed, min, max));
}
exports.pseudoRandomRangeInt = pseudoRandomRangeInt;
/**
 * Returns the next power of two for the value.<br/>
 *
 * @param val
 * @return The the next power of two.
 */
function nextPow2(val) {
    --val;
    val = (val >> 1) | val;
    val = (val >> 2) | val;
    val = (val >> 4) | val;
    val = (val >> 8) | val;
    val = (val >> 16) | val;
    ++val;
    return val;
}
exports.nextPow2 = nextPow2;
/**
 * @en Returns float remainder for t / length.<br/>
 * @zh 返回t / length的浮点余数。
 * @param t Time start at 0.
 * @param length Time of one cycle.
 * @return The Time wrapped in the first cycle.
 */
function repeat(t, length) {
    return t - Math.floor(t / length) * length;
}
exports.repeat = repeat;
/**
 * Returns time wrapped in ping-pong mode.
 *
 * @param t Time start at 0.
 * @param length Time of one cycle.
 * @return The time wrapped in the first cycle.
 */
function pingPong(t, length) {
    t = repeat(t, length * 2);
    t = length - Math.abs(t - length);
    return t;
}
exports.pingPong = pingPong;
/**
 * @en Returns ratio of a value within a given range.<br/>
 * @zh 返回给定范围内的值的比率。
 * @param from Start value.
 * @param to End value.
 * @param value Given value.
 * @return The ratio between [from, to].
 */
function inverseLerp(from, to, value) {
    return (value - from) / (to - from);
}
exports.inverseLerp = inverseLerp;
/**
 * @zh 对所有分量的绝对值进行比较大小，返回绝对值最大的分量。
 * @param v 类 Vec3 结构
 * @returns 绝对值最大的分量
 */
function absMaxComponent(v) {
    if (Math.abs(v.x) > Math.abs(v.y)) {
        if (Math.abs(v.x) > Math.abs(v.z)) {
            return v.x;
        }
        else {
            return v.z;
        }
    }
    else if (Math.abs(v.y) > Math.abs(v.z)) {
        return v.y;
    }
    else {
        return v.z;
    }
}
exports.absMaxComponent = absMaxComponent;
/**
 * @zh 对 a b 的绝对值进行比较大小，返回绝对值最大的值。
 * @param a number
 * @param b number
 */
function absMax(a, b) {
    if (Math.abs(a) > Math.abs(b)) {
        return a;
    }
    else {
        return b;
    }
}
exports.absMax = absMax;
/**
 * @en
 * Make the attributes of the specified class available to be enumerated
 * @zh
 * 使指定类的特定属性可被枚举
 * @param prototype Inherit the prototype chain of the ValueType class
 * @param attrs List of attributes that need to be enumerated
 */
function enumerableProps(prototype, attrs) {
    attrs.forEach((key) => {
        Object.defineProperty(prototype, key, { enumerable: true });
    });
}
exports.enumerableProps = enumerableProps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvdXRpbHMvTWF0aHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7QUFFN0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7QUFFaEIsUUFBQSxPQUFPLEdBQUcsUUFBUSxDQUFDO0FBRWhDOzs7Ozs7Ozs7R0FTRztBQUNILFNBQWdCLE1BQU0sQ0FBRSxDQUFTLEVBQUUsQ0FBUztJQUN4QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLGVBQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRixDQUFDO0FBRkQsd0JBRUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsTUFBTSxDQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsT0FBZTtJQUN6RCxPQUFPLEdBQUcsT0FBTyxJQUFJLGVBQU8sQ0FBQztJQUM3QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQztBQUN0QyxDQUFDO0FBSEQsd0JBR0M7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFnQixLQUFLLENBQUUsR0FBVyxFQUFFLEdBQVcsRUFBRSxHQUFXO0lBQ3hELElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRTtRQUNYLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNqQixHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQztLQUNkO0lBRUQsT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFDLENB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ZDtLQUNKO1NBQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN0QyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDZDtTQUFNO1FBQ0gsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2Q7QUFDTCxDQUFDO0FBWkQsMENBWUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsTUFBTSxDQUFFLENBQVMsRUFBRSxDQUFTO0lBQ3hDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxDQUFDO0tBQ1o7U0FBTTtRQUNILE9BQU8sQ0FBQyxDQUFDO0tBQ1o7QUFDTCxDQUFDO0FBTkQsd0JBTUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsZUFBZSxDQUFFLFNBQVMsRUFBRSxLQUFlO0lBQ3ZELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNsQixNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFKRCwwQ0FJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElWZWMzTGlrZSB9IGZyb20gXCIuL3R5cGUtZGVmaW5lXCI7XHJcblxyXG5jb25zdCBfZDJyID0gTWF0aC5QSSAvIDE4MC4wO1xyXG5cclxuY29uc3QgX3IyZCA9IDE4MC4wIC8gTWF0aC5QSTtcclxuXHJcbmV4cG9ydCBjb25zdCBFUFNJTE9OID0gMC4wMDAwMDE7XHJcblxyXG4vKipcclxuICogQGVuIFRlc3RzIHdoZXRoZXIgb3Igbm90IHRoZSBhcmd1bWVudHMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIHZhbHVlLCB3aXRoaW4gYW4gYWJzb2x1dGU8YnIvPlxyXG4gKiBvciByZWxhdGl2ZSB0b2xlcmFuY2Ugb2YgZ2xNYXRyaXguRVBTSUxPTiAoYW4gYWJzb2x1dGUgdG9sZXJhbmNlIGlzIHVzZWQgZm9yIHZhbHVlcyBsZXNzPGJyLz5cclxuICogdGhhbiBvciBlcXVhbCB0byAxLjAsIGFuZCBhIHJlbGF0aXZlIHRvbGVyYW5jZSBpcyB1c2VkIGZvciBsYXJnZXIgdmFsdWVzKVxyXG4gKiBAemgg5ZyoZ2xNYXRyaXjnmoTnu53lr7nmiJbnm7jlr7nlrrnlt67ojIPlm7TlhoXvvIzmtYvor5Xlj4LmlbDmmK/lkKblhbfmnInov5HkvLznm7jlkIznmoTlgLzjgII8YnIvPlxyXG4gKiBFUFNJTE9OKOWwj+S6juetieS6jjEuMOeahOWAvOmHh+eUqOe7neWvueWFrOW3ru+8jOWkp+S6jjEuMOeahOWAvOmHh+eUqOebuOWvueWFrOW3rilcclxuICogQHBhcmFtIGEgVGhlIGZpcnN0IG51bWJlciB0byB0ZXN0LlxyXG4gKiBAcGFyYW0gYiBUaGUgc2Vjb25kIG51bWJlciB0byB0ZXN0LlxyXG4gKiBAcmV0dXJuIFRydWUgaWYgdGhlIG51bWJlcnMgYXJlIGFwcHJveGltYXRlbHkgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMgKGE6IG51bWJlciwgYjogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEpLCBNYXRoLmFicyhiKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZW4gVGVzdHMgd2hldGhlciBvciBub3QgdGhlIGFyZ3VtZW50cyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgdmFsdWUgYnkgZ2l2ZW4gbWF4RGlmZjxici8+XHJcbiAqIEB6aCDpgJrov4fnu5nlrprnmoTmnIDlpKflt67lvILvvIzmtYvor5Xlj4LmlbDmmK/lkKblhbfmnInov5HkvLznm7jlkIznmoTlgLzjgIJcclxuICogQHBhcmFtIGEgVGhlIGZpcnN0IG51bWJlciB0byB0ZXN0LlxyXG4gKiBAcGFyYW0gYiBUaGUgc2Vjb25kIG51bWJlciB0byB0ZXN0LlxyXG4gKiBAcGFyYW0gbWF4RGlmZiBNYXhpbXVtIGRpZmZlcmVuY2UuXHJcbiAqIEByZXR1cm4gVHJ1ZSBpZiB0aGUgbnVtYmVycyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcHJveCAoYTogbnVtYmVyLCBiOiBudW1iZXIsIG1heERpZmY6IG51bWJlcikge1xyXG4gICAgbWF4RGlmZiA9IG1heERpZmYgfHwgRVBTSUxPTjtcclxuICAgIHJldHVybiBNYXRoLmFicyhhIC0gYikgPD0gbWF4RGlmZjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBlbiBDbGFtcHMgYSB2YWx1ZSBiZXR3ZWVuIGEgbWluaW11bSBmbG9hdCBhbmQgbWF4aW11bSBmbG9hdCB2YWx1ZS48YnIvPlxyXG4gKiBAemgg6L+U5Zue5pyA5bCP5rWu54K55pWw5ZKM5pyA5aSn5rWu54K55pWw5LmL6Ze055qE5LiA5Liq5pWw5YC844CC5Y+v5Lul5L2/55SoIGNsYW1wIOWHveaVsOWwhuS4jeaWreWPmOWMlueahOaVsOWAvOmZkOWItuWcqOiMg+WbtOWGheOAglxyXG4gKiBAcGFyYW0gdmFsXHJcbiAqIEBwYXJhbSBtaW5cclxuICogQHBhcmFtIG1heFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wICh2YWw6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICBpZiAobWluID4gbWF4KSB7XHJcbiAgICAgICAgY29uc3QgdGVtcCA9IG1pbjtcclxuICAgICAgICBtaW4gPSBtYXg7XHJcbiAgICAgICAgbWF4ID0gdGVtcDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsIDwgbWluID8gbWluIDogdmFsID4gbWF4ID8gbWF4IDogdmFsO1xyXG59XHJcblxyXG4vKipcclxuICogQGVuIENsYW1wcyBhIHZhbHVlIGJldHdlZW4gMCBhbmQgMS48YnIvPlxyXG4gKiBAemgg5bCG5YC86ZmQ5Yi25ZyoMOWSjDHkuYvpl7TjgIJcclxuICogQHBhcmFtIHZhbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wMDEgKHZhbDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdmFsIDwgMCA/IDAgOiB2YWwgPiAxID8gMSA6IHZhbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSBmcm9tXHJcbiAqIEBwYXJhbSB0b1xyXG4gKiBAcGFyYW0gcmF0aW8gLSBUaGUgaW50ZXJwb2xhdGlvbiBjb2VmZmljaWVudC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsZXJwIChmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBmcm9tICsgKHRvIC0gZnJvbSkgKiByYXRpbztcclxufVxyXG5cclxuLyoqXHJcbiAqIEBlbiBDb252ZXJ0IERlZ3JlZSBUbyBSYWRpYW48YnIvPlxyXG4gKiBAemgg5oqK6KeS5bqm5o2i566X5oiQ5byn5bqm44CCXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBhIEFuZ2xlIGluIERlZ3JlZXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b1JhZGlhbiAoYTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gYSAqIF9kMnI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZW4gQ29udmVydCBSYWRpYW4gVG8gRGVncmVlPGJyLz5cclxuICogQHpoIOaKiuW8p+W6puaNoueul+aIkOinkuW6puOAglxyXG4gKiBAcGFyYW0ge051bWJlcn0gYSBBbmdsZSBpbiBSYWRpYW5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0RlZ3JlZSAoYTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gYSAqIF9yMmQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbWV0aG9kIHJhbmRvbVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJhbmRvbSA9IE1hdGgucmFuZG9tO1xyXG5cclxuLyoqXHJcbiAqIEBlbiBSZXR1cm5zIGEgZmxvYXRpbmctcG9pbnQgcmFuZG9tIG51bWJlciBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChleGNsdXNpdmUpLjxici8+XHJcbiAqIEB6aCDov5Tlm57mnIDlsI8o5YyF5ZCrKeWSjOacgOWkpyjkuI3ljIXlkKsp5LmL6Ze055qE5rWu54K56ZqP5py65pWw44CCXHJcbiAqIEBtZXRob2QgcmFuZG9tUmFuZ2VcclxuICogQHBhcmFtIG1pblxyXG4gKiBAcGFyYW0gbWF4XHJcbiAqIEByZXR1cm4gVGhlIHJhbmRvbSBudW1iZXIuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tUmFuZ2UgKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBlbiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoZXhjbHVzaXZlKS48YnIvPlxyXG4gKiBAemgg6L+U5Zue5pyA5bCPKOWMheWQqynlkozmnIDlpKco5LiN5YyF5ZCrKeS5i+mXtOeahOmaj+acuuaVtOaVsOOAglxyXG4gKiBAcGFyYW0gbWluXHJcbiAqIEBwYXJhbSBtYXhcclxuICogQHJldHVybiBUaGUgcmFuZG9tIGludGVnZXIuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tUmFuZ2VJbnQgKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IocmFuZG9tUmFuZ2UobWluLCBtYXgpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpbmVhciBjb25ncnVlbnRpYWwgZ2VuZXJhdG9yIHVzaW5nIEh1bGwtRG9iZWxsIFRoZW9yZW0uXHJcbiAqXHJcbiAqIEBwYXJhbSBzZWVkIFRoZSByYW5kb20gc2VlZC5cclxuICogQHJldHVybiBUaGUgcHNldWRvIHJhbmRvbS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwc2V1ZG9SYW5kb20gKHNlZWQ6IG51bWJlcikge1xyXG4gICAgc2VlZCA9IChzZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcclxuICAgIHJldHVybiBzZWVkIC8gMjMzMjgwLjA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgZmxvYXRpbmctcG9pbnQgcHNldWRvLXJhbmRvbSBudW1iZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoZXhjbHVzaXZlKS5cclxuICpcclxuICogQHBhcmFtIHNlZWRcclxuICogQHBhcmFtIG1pblxyXG4gKiBAcGFyYW0gbWF4XHJcbiAqIEByZXR1cm4gVGhlIHJhbmRvbSBudW1iZXIuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHNldWRvUmFuZG9tUmFuZ2UgKHNlZWQ6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gcHNldWRvUmFuZG9tKHNlZWQpICogKG1heCAtIG1pbikgKyBtaW47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZW4gUmV0dXJucyBhIHBzZXVkby1yYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChleGNsdXNpdmUpLjxici8+XHJcbiAqIEB6aCDov5Tlm57mnIDlsI8o5YyF5ZCrKeWSjOacgOWkpyjkuI3ljIXlkKsp5LmL6Ze055qE5rWu54K55Lyq6ZqP5py65pWw44CCXHJcbiAqIEBwYXJhbSBzZWVkXHJcbiAqIEBwYXJhbSBtaW5cclxuICogQHBhcmFtIG1heFxyXG4gKiBAcmV0dXJuIFRoZSByYW5kb20gaW50ZWdlci5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwc2V1ZG9SYW5kb21SYW5nZUludCAoc2VlZDogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKHBzZXVkb1JhbmRvbVJhbmdlKHNlZWQsIG1pbiwgbWF4KSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBuZXh0IHBvd2VyIG9mIHR3byBmb3IgdGhlIHZhbHVlLjxici8+XHJcbiAqXHJcbiAqIEBwYXJhbSB2YWxcclxuICogQHJldHVybiBUaGUgdGhlIG5leHQgcG93ZXIgb2YgdHdvLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5leHRQb3cyICh2YWw6IG51bWJlcikge1xyXG4gICAgLS12YWw7XHJcbiAgICB2YWwgPSAodmFsID4+IDEpIHwgdmFsO1xyXG4gICAgdmFsID0gKHZhbCA+PiAyKSB8IHZhbDtcclxuICAgIHZhbCA9ICh2YWwgPj4gNCkgfCB2YWw7XHJcbiAgICB2YWwgPSAodmFsID4+IDgpIHwgdmFsO1xyXG4gICAgdmFsID0gKHZhbCA+PiAxNikgfCB2YWw7XHJcbiAgICArK3ZhbDtcclxuICAgIHJldHVybiB2YWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZW4gUmV0dXJucyBmbG9hdCByZW1haW5kZXIgZm9yIHQgLyBsZW5ndGguPGJyLz5cclxuICogQHpoIOi/lOWbnnQgLyBsZW5ndGjnmoTmta7ngrnkvZnmlbDjgIJcclxuICogQHBhcmFtIHQgVGltZSBzdGFydCBhdCAwLlxyXG4gKiBAcGFyYW0gbGVuZ3RoIFRpbWUgb2Ygb25lIGN5Y2xlLlxyXG4gKiBAcmV0dXJuIFRoZSBUaW1lIHdyYXBwZWQgaW4gdGhlIGZpcnN0IGN5Y2xlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlcGVhdCAodDogbnVtYmVyLCBsZW5ndGg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHQgLSBNYXRoLmZsb29yKHQgLyBsZW5ndGgpICogbGVuZ3RoO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aW1lIHdyYXBwZWQgaW4gcGluZy1wb25nIG1vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB0IFRpbWUgc3RhcnQgYXQgMC5cclxuICogQHBhcmFtIGxlbmd0aCBUaW1lIG9mIG9uZSBjeWNsZS5cclxuICogQHJldHVybiBUaGUgdGltZSB3cmFwcGVkIGluIHRoZSBmaXJzdCBjeWNsZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwaW5nUG9uZyAodDogbnVtYmVyLCBsZW5ndGg6IG51bWJlcikge1xyXG4gICAgdCA9IHJlcGVhdCh0LCBsZW5ndGggKiAyKTtcclxuICAgIHQgPSBsZW5ndGggLSBNYXRoLmFicyh0IC0gbGVuZ3RoKTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG4vKipcclxuICogQGVuIFJldHVybnMgcmF0aW8gb2YgYSB2YWx1ZSB3aXRoaW4gYSBnaXZlbiByYW5nZS48YnIvPlxyXG4gKiBAemgg6L+U5Zue57uZ5a6a6IyD5Zu05YaF55qE5YC855qE5q+U546H44CCXHJcbiAqIEBwYXJhbSBmcm9tIFN0YXJ0IHZhbHVlLlxyXG4gKiBAcGFyYW0gdG8gRW5kIHZhbHVlLlxyXG4gKiBAcGFyYW0gdmFsdWUgR2l2ZW4gdmFsdWUuXHJcbiAqIEByZXR1cm4gVGhlIHJhdGlvIGJldHdlZW4gW2Zyb20sIHRvXS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlTGVycCAoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gKHZhbHVlIC0gZnJvbSkgLyAodG8gLSBmcm9tKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEB6aCDlr7nmiYDmnInliIbph4/nmoTnu53lr7nlgLzov5vooYzmr5TovoPlpKflsI/vvIzov5Tlm57nu53lr7nlgLzmnIDlpKfnmoTliIbph4/jgIJcclxuICogQHBhcmFtIHYg57G7IFZlYzMg57uT5p6EXHJcbiAqIEByZXR1cm5zIOe7neWvueWAvOacgOWkp+eahOWIhumHj1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFic01heENvbXBvbmVudCAodjogSVZlYzNMaWtlKSB7XHJcbiAgICBpZiAoTWF0aC5hYnModi54KSA+IE1hdGguYWJzKHYueSkpIHtcclxuICAgICAgICBpZiAoTWF0aC5hYnModi54KSA+IE1hdGguYWJzKHYueikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHYueDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdi56O1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoTWF0aC5hYnModi55KSA+IE1hdGguYWJzKHYueikpIHtcclxuICAgICAgICByZXR1cm4gdi55O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdi56O1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogQHpoIOWvuSBhIGIg55qE57ud5a+55YC86L+b6KGM5q+U6L6D5aSn5bCP77yM6L+U5Zue57ud5a+55YC85pyA5aSn55qE5YC844CCXHJcbiAqIEBwYXJhbSBhIG51bWJlclxyXG4gKiBAcGFyYW0gYiBudW1iZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhYnNNYXggKGE6IG51bWJlciwgYjogbnVtYmVyKSB7XHJcbiAgICBpZiAoTWF0aC5hYnMoYSkgPiBNYXRoLmFicyhiKSkge1xyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gYjtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBlblxyXG4gKiBNYWtlIHRoZSBhdHRyaWJ1dGVzIG9mIHRoZSBzcGVjaWZpZWQgY2xhc3MgYXZhaWxhYmxlIHRvIGJlIGVudW1lcmF0ZWRcclxuICogQHpoXHJcbiAqIOS9v+aMh+Wumuexu+eahOeJueWumuWxnuaAp+WPr+iiq+aemuS4vlxyXG4gKiBAcGFyYW0gcHJvdG90eXBlIEluaGVyaXQgdGhlIHByb3RvdHlwZSBjaGFpbiBvZiB0aGUgVmFsdWVUeXBlIGNsYXNzXHJcbiAqIEBwYXJhbSBhdHRycyBMaXN0IG9mIGF0dHJpYnV0ZXMgdGhhdCBuZWVkIHRvIGJlIGVudW1lcmF0ZWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbnVtZXJhYmxlUHJvcHMgKHByb3RvdHlwZSwgYXR0cnM6IHN0cmluZ1tdKSB7XHJcbiAgICBhdHRycy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuZGVjbGFyZSBpbnRlcmZhY2UgSVdyaXRhYmxlQXJyYXlMaWtlPFQ+IHtcclxuICAgIHJlYWRvbmx5IGxlbmd0aDogbnVtYmVyO1xyXG4gICAgW2luZGV4OiBudW1iZXJdOiBUO1xyXG59XHJcbiJdfQ==