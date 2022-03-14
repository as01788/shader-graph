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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvdXRpbHMvTWF0aHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7QUFFN0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7QUFFaEIsUUFBQSxPQUFPLEdBQUcsUUFBUSxDQUFDO0FBRWhDOzs7Ozs7Ozs7R0FTRztBQUNILFNBQWdCLE1BQU0sQ0FBRSxDQUFTLEVBQUUsQ0FBUztJQUN4QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLGVBQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRixDQUFDO0FBRkQsd0JBRUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsTUFBTSxDQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsT0FBZTtJQUN6RCxPQUFPLEdBQUcsT0FBTyxJQUFJLGVBQU8sQ0FBQztJQUM3QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQztBQUN0QyxDQUFDO0FBSEQsd0JBR0M7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFnQixLQUFLLENBQUUsR0FBVyxFQUFFLEdBQVcsRUFBRSxHQUFXO0lBQ3hELElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRTtRQUNYLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNqQixHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQztLQUNkO0lBRUQsT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFDLENB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ZDtLQUNKO1NBQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN0QyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDZDtTQUFNO1FBQ0gsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2Q7QUFDTCxDQUFDO0FBWkQsMENBWUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsTUFBTSxDQUFFLENBQVMsRUFBRSxDQUFTO0lBQ3hDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxDQUFDO0tBQ1o7U0FBTTtRQUNILE9BQU8sQ0FBQyxDQUFDO0tBQ1o7QUFDTCxDQUFDO0FBTkQsd0JBTUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsZUFBZSxDQUFFLFNBQVMsRUFBRSxLQUFlO0lBQ3ZELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNsQixNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFKRCwwQ0FJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElWZWMzTGlrZSB9IGZyb20gXCIuL3R5cGUtZGVmaW5lXCI7XG5cbmNvbnN0IF9kMnIgPSBNYXRoLlBJIC8gMTgwLjA7XG5cbmNvbnN0IF9yMmQgPSAxODAuMCAvIE1hdGguUEk7XG5cbmV4cG9ydCBjb25zdCBFUFNJTE9OID0gMC4wMDAwMDE7XG5cbi8qKlxuICogQGVuIFRlc3RzIHdoZXRoZXIgb3Igbm90IHRoZSBhcmd1bWVudHMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIHZhbHVlLCB3aXRoaW4gYW4gYWJzb2x1dGU8YnIvPlxuICogb3IgcmVsYXRpdmUgdG9sZXJhbmNlIG9mIGdsTWF0cml4LkVQU0lMT04gKGFuIGFic29sdXRlIHRvbGVyYW5jZSBpcyB1c2VkIGZvciB2YWx1ZXMgbGVzczxici8+XG4gKiB0aGFuIG9yIGVxdWFsIHRvIDEuMCwgYW5kIGEgcmVsYXRpdmUgdG9sZXJhbmNlIGlzIHVzZWQgZm9yIGxhcmdlciB2YWx1ZXMpXG4gKiBAemgg5ZyoZ2xNYXRyaXjnmoTnu53lr7nmiJbnm7jlr7nlrrnlt67ojIPlm7TlhoXvvIzmtYvor5Xlj4LmlbDmmK/lkKblhbfmnInov5HkvLznm7jlkIznmoTlgLzjgII8YnIvPlxuICogRVBTSUxPTijlsI/kuo7nrYnkuo4xLjDnmoTlgLzph4fnlKjnu53lr7nlhazlt67vvIzlpKfkuo4xLjDnmoTlgLzph4fnlKjnm7jlr7nlhazlt64pXG4gKiBAcGFyYW0gYSBUaGUgZmlyc3QgbnVtYmVyIHRvIHRlc3QuXG4gKiBAcGFyYW0gYiBUaGUgc2Vjb25kIG51bWJlciB0byB0ZXN0LlxuICogQHJldHVybiBUcnVlIGlmIHRoZSBudW1iZXJzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMgKGE6IG51bWJlciwgYjogbnVtYmVyKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhKSwgTWF0aC5hYnMoYikpO1xufVxuXG4vKipcbiAqIEBlbiBUZXN0cyB3aGV0aGVyIG9yIG5vdCB0aGUgYXJndW1lbnRzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSB2YWx1ZSBieSBnaXZlbiBtYXhEaWZmPGJyLz5cbiAqIEB6aCDpgJrov4fnu5nlrprnmoTmnIDlpKflt67lvILvvIzmtYvor5Xlj4LmlbDmmK/lkKblhbfmnInov5HkvLznm7jlkIznmoTlgLzjgIJcbiAqIEBwYXJhbSBhIFRoZSBmaXJzdCBudW1iZXIgdG8gdGVzdC5cbiAqIEBwYXJhbSBiIFRoZSBzZWNvbmQgbnVtYmVyIHRvIHRlc3QuXG4gKiBAcGFyYW0gbWF4RGlmZiBNYXhpbXVtIGRpZmZlcmVuY2UuXG4gKiBAcmV0dXJuIFRydWUgaWYgdGhlIG51bWJlcnMgYXJlIGFwcHJveGltYXRlbHkgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcHJveCAoYTogbnVtYmVyLCBiOiBudW1iZXIsIG1heERpZmY6IG51bWJlcikge1xuICAgIG1heERpZmYgPSBtYXhEaWZmIHx8IEVQU0lMT047XG4gICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8PSBtYXhEaWZmO1xufVxuXG4vKipcbiAqIEBlbiBDbGFtcHMgYSB2YWx1ZSBiZXR3ZWVuIGEgbWluaW11bSBmbG9hdCBhbmQgbWF4aW11bSBmbG9hdCB2YWx1ZS48YnIvPlxuICogQHpoIOi/lOWbnuacgOWwj+a1rueCueaVsOWSjOacgOWkp+a1rueCueaVsOS5i+mXtOeahOS4gOS4quaVsOWAvOOAguWPr+S7peS9v+eUqCBjbGFtcCDlh73mlbDlsIbkuI3mlq3lj5jljJbnmoTmlbDlgLzpmZDliLblnKjojIPlm7TlhoXjgIJcbiAqIEBwYXJhbSB2YWxcbiAqIEBwYXJhbSBtaW5cbiAqIEBwYXJhbSBtYXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wICh2YWw6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gICAgaWYgKG1pbiA+IG1heCkge1xuICAgICAgICBjb25zdCB0ZW1wID0gbWluO1xuICAgICAgICBtaW4gPSBtYXg7XG4gICAgICAgIG1heCA9IHRlbXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbCA8IG1pbiA/IG1pbiA6IHZhbCA+IG1heCA/IG1heCA6IHZhbDtcbn1cblxuLyoqXG4gKiBAZW4gQ2xhbXBzIGEgdmFsdWUgYmV0d2VlbiAwIGFuZCAxLjxici8+XG4gKiBAemgg5bCG5YC86ZmQ5Yi25ZyoMOWSjDHkuYvpl7TjgIJcbiAqIEBwYXJhbSB2YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wMDEgKHZhbDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHZhbCA8IDAgPyAwIDogdmFsID4gMSA/IDEgOiB2YWw7XG59XG5cbi8qKlxuICogQHBhcmFtIGZyb21cbiAqIEBwYXJhbSB0b1xuICogQHBhcmFtIHJhdGlvIC0gVGhlIGludGVycG9sYXRpb24gY29lZmZpY2llbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsZXJwIChmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIHJhdGlvOiBudW1iZXIpIHtcbiAgICByZXR1cm4gZnJvbSArICh0byAtIGZyb20pICogcmF0aW87XG59XG5cbi8qKlxuICogQGVuIENvbnZlcnQgRGVncmVlIFRvIFJhZGlhbjxici8+XG4gKiBAemgg5oqK6KeS5bqm5o2i566X5oiQ5byn5bqm44CCXG4gKiBAcGFyYW0ge051bWJlcn0gYSBBbmdsZSBpbiBEZWdyZWVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1JhZGlhbiAoYTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGEgKiBfZDJyO1xufVxuXG4vKipcbiAqIEBlbiBDb252ZXJ0IFJhZGlhbiBUbyBEZWdyZWU8YnIvPlxuICogQHpoIOaKiuW8p+W6puaNoueul+aIkOinkuW6puOAglxuICogQHBhcmFtIHtOdW1iZXJ9IGEgQW5nbGUgaW4gUmFkaWFuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0RlZ3JlZSAoYTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGEgKiBfcjJkO1xufVxuXG4vKipcbiAqIEBtZXRob2QgcmFuZG9tXG4gKi9cbmV4cG9ydCBjb25zdCByYW5kb20gPSBNYXRoLnJhbmRvbTtcblxuLyoqXG4gKiBAZW4gUmV0dXJucyBhIGZsb2F0aW5nLXBvaW50IHJhbmRvbSBudW1iZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoZXhjbHVzaXZlKS48YnIvPlxuICogQHpoIOi/lOWbnuacgOWwjyjljIXlkKsp5ZKM5pyA5aSnKOS4jeWMheWQqynkuYvpl7TnmoTmta7ngrnpmo/mnLrmlbDjgIJcbiAqIEBtZXRob2QgcmFuZG9tUmFuZ2VcbiAqIEBwYXJhbSBtaW5cbiAqIEBwYXJhbSBtYXhcbiAqIEByZXR1cm4gVGhlIHJhbmRvbSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21SYW5nZSAobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbn1cblxuLyoqXG4gKiBAZW4gUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGV4Y2x1c2l2ZSkuPGJyLz5cbiAqIEB6aCDov5Tlm57mnIDlsI8o5YyF5ZCrKeWSjOacgOWkpyjkuI3ljIXlkKsp5LmL6Ze055qE6ZqP5py65pW05pWw44CCXG4gKiBAcGFyYW0gbWluXG4gKiBAcGFyYW0gbWF4XG4gKiBAcmV0dXJuIFRoZSByYW5kb20gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVJhbmdlSW50IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihyYW5kb21SYW5nZShtaW4sIG1heCkpO1xufVxuXG4vKipcbiAqIExpbmVhciBjb25ncnVlbnRpYWwgZ2VuZXJhdG9yIHVzaW5nIEh1bGwtRG9iZWxsIFRoZW9yZW0uXG4gKlxuICogQHBhcmFtIHNlZWQgVGhlIHJhbmRvbSBzZWVkLlxuICogQHJldHVybiBUaGUgcHNldWRvIHJhbmRvbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBzZXVkb1JhbmRvbSAoc2VlZDogbnVtYmVyKSB7XG4gICAgc2VlZCA9IChzZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcbiAgICByZXR1cm4gc2VlZCAvIDIzMzI4MC4wO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmbG9hdGluZy1wb2ludCBwc2V1ZG8tcmFuZG9tIG51bWJlciBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChleGNsdXNpdmUpLlxuICpcbiAqIEBwYXJhbSBzZWVkXG4gKiBAcGFyYW0gbWluXG4gKiBAcGFyYW0gbWF4XG4gKiBAcmV0dXJuIFRoZSByYW5kb20gbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHNldWRvUmFuZG9tUmFuZ2UgKHNlZWQ6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHBzZXVkb1JhbmRvbShzZWVkKSAqIChtYXggLSBtaW4pICsgbWluO1xufVxuXG4vKipcbiAqIEBlbiBSZXR1cm5zIGEgcHNldWRvLXJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGV4Y2x1c2l2ZSkuPGJyLz5cbiAqIEB6aCDov5Tlm57mnIDlsI8o5YyF5ZCrKeWSjOacgOWkpyjkuI3ljIXlkKsp5LmL6Ze055qE5rWu54K55Lyq6ZqP5py65pWw44CCXG4gKiBAcGFyYW0gc2VlZFxuICogQHBhcmFtIG1pblxuICogQHBhcmFtIG1heFxuICogQHJldHVybiBUaGUgcmFuZG9tIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwc2V1ZG9SYW5kb21SYW5nZUludCAoc2VlZDogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihwc2V1ZG9SYW5kb21SYW5nZShzZWVkLCBtaW4sIG1heCkpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIG5leHQgcG93ZXIgb2YgdHdvIGZvciB0aGUgdmFsdWUuPGJyLz5cbiAqXG4gKiBAcGFyYW0gdmFsXG4gKiBAcmV0dXJuIFRoZSB0aGUgbmV4dCBwb3dlciBvZiB0d28uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuZXh0UG93MiAodmFsOiBudW1iZXIpIHtcbiAgICAtLXZhbDtcbiAgICB2YWwgPSAodmFsID4+IDEpIHwgdmFsO1xuICAgIHZhbCA9ICh2YWwgPj4gMikgfCB2YWw7XG4gICAgdmFsID0gKHZhbCA+PiA0KSB8IHZhbDtcbiAgICB2YWwgPSAodmFsID4+IDgpIHwgdmFsO1xuICAgIHZhbCA9ICh2YWwgPj4gMTYpIHwgdmFsO1xuICAgICsrdmFsO1xuICAgIHJldHVybiB2YWw7XG59XG5cbi8qKlxuICogQGVuIFJldHVybnMgZmxvYXQgcmVtYWluZGVyIGZvciB0IC8gbGVuZ3RoLjxici8+XG4gKiBAemgg6L+U5ZuedCAvIGxlbmd0aOeahOa1rueCueS9meaVsOOAglxuICogQHBhcmFtIHQgVGltZSBzdGFydCBhdCAwLlxuICogQHBhcmFtIGxlbmd0aCBUaW1lIG9mIG9uZSBjeWNsZS5cbiAqIEByZXR1cm4gVGhlIFRpbWUgd3JhcHBlZCBpbiB0aGUgZmlyc3QgY3ljbGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBlYXQgKHQ6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdCAtIE1hdGguZmxvb3IodCAvIGxlbmd0aCkgKiBsZW5ndGg7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aW1lIHdyYXBwZWQgaW4gcGluZy1wb25nIG1vZGUuXG4gKlxuICogQHBhcmFtIHQgVGltZSBzdGFydCBhdCAwLlxuICogQHBhcmFtIGxlbmd0aCBUaW1lIG9mIG9uZSBjeWNsZS5cbiAqIEByZXR1cm4gVGhlIHRpbWUgd3JhcHBlZCBpbiB0aGUgZmlyc3QgY3ljbGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwaW5nUG9uZyAodDogbnVtYmVyLCBsZW5ndGg6IG51bWJlcikge1xuICAgIHQgPSByZXBlYXQodCwgbGVuZ3RoICogMik7XG4gICAgdCA9IGxlbmd0aCAtIE1hdGguYWJzKHQgLSBsZW5ndGgpO1xuICAgIHJldHVybiB0O1xufVxuXG4vKipcbiAqIEBlbiBSZXR1cm5zIHJhdGlvIG9mIGEgdmFsdWUgd2l0aGluIGEgZ2l2ZW4gcmFuZ2UuPGJyLz5cbiAqIEB6aCDov5Tlm57nu5nlrprojIPlm7TlhoXnmoTlgLznmoTmr5TnjofjgIJcbiAqIEBwYXJhbSBmcm9tIFN0YXJ0IHZhbHVlLlxuICogQHBhcmFtIHRvIEVuZCB2YWx1ZS5cbiAqIEBwYXJhbSB2YWx1ZSBHaXZlbiB2YWx1ZS5cbiAqIEByZXR1cm4gVGhlIHJhdGlvIGJldHdlZW4gW2Zyb20sIHRvXS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2VMZXJwIChmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpIHtcbiAgICByZXR1cm4gKHZhbHVlIC0gZnJvbSkgLyAodG8gLSBmcm9tKTtcbn1cblxuLyoqXG4gKiBAemgg5a+55omA5pyJ5YiG6YeP55qE57ud5a+55YC86L+b6KGM5q+U6L6D5aSn5bCP77yM6L+U5Zue57ud5a+55YC85pyA5aSn55qE5YiG6YeP44CCXG4gKiBAcGFyYW0gdiDnsbsgVmVjMyDnu5PmnoRcbiAqIEByZXR1cm5zIOe7neWvueWAvOacgOWkp+eahOWIhumHj1xuICovXG5leHBvcnQgZnVuY3Rpb24gYWJzTWF4Q29tcG9uZW50ICh2OiBJVmVjM0xpa2UpIHtcbiAgICBpZiAoTWF0aC5hYnModi54KSA+IE1hdGguYWJzKHYueSkpIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHYueCkgPiBNYXRoLmFicyh2LnopKSB7XG4gICAgICAgICAgICByZXR1cm4gdi54O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHYuejtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoTWF0aC5hYnModi55KSA+IE1hdGguYWJzKHYueikpIHtcbiAgICAgICAgcmV0dXJuIHYueTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdi56O1xuICAgIH1cbn1cblxuLyoqXG4gKiBAemgg5a+5IGEgYiDnmoTnu53lr7nlgLzov5vooYzmr5TovoPlpKflsI/vvIzov5Tlm57nu53lr7nlgLzmnIDlpKfnmoTlgLzjgIJcbiAqIEBwYXJhbSBhIG51bWJlclxuICogQHBhcmFtIGIgbnVtYmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhYnNNYXggKGE6IG51bWJlciwgYjogbnVtYmVyKSB7XG4gICAgaWYgKE1hdGguYWJzKGEpID4gTWF0aC5hYnMoYikpIHtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgfVxufVxuXG4vKipcbiAqIEBlblxuICogTWFrZSB0aGUgYXR0cmlidXRlcyBvZiB0aGUgc3BlY2lmaWVkIGNsYXNzIGF2YWlsYWJsZSB0byBiZSBlbnVtZXJhdGVkXG4gKiBAemhcbiAqIOS9v+aMh+Wumuexu+eahOeJueWumuWxnuaAp+WPr+iiq+aemuS4vlxuICogQHBhcmFtIHByb3RvdHlwZSBJbmhlcml0IHRoZSBwcm90b3R5cGUgY2hhaW4gb2YgdGhlIFZhbHVlVHlwZSBjbGFzc1xuICogQHBhcmFtIGF0dHJzIExpc3Qgb2YgYXR0cmlidXRlcyB0aGF0IG5lZWQgdG8gYmUgZW51bWVyYXRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZW51bWVyYWJsZVByb3BzIChwcm90b3R5cGUsIGF0dHJzOiBzdHJpbmdbXSkge1xuICAgIGF0dHJzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICB9KTtcbn1cblxuXG5kZWNsYXJlIGludGVyZmFjZSBJV3JpdGFibGVBcnJheUxpa2U8VD4ge1xuICAgIHJlYWRvbmx5IGxlbmd0aDogbnVtYmVyO1xuICAgIFtpbmRleDogbnVtYmVyXTogVDtcbn1cbiJdfQ==