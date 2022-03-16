"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
const utils_1 = require("./utils");
const toFloat = 1 / 255;
/**
 * @en Representation of RGBA colors.<br/>
 * Each color component is an integer value with a range from 0 to 255.<br/>
 * @zh 通过 Red、Green、Blue 颜色通道表示颜色，并通过 Alpha 通道表示不透明度。<br/>
 * 每个通道都为取值范围 [0, 255] 的整数。<br/>
 */
class Color {
    constructor(r, g, b, a) {
        this._val = 0;
        if (typeof r === 'string') {
            this.fromHEX(r);
        }
        else if (g !== undefined) {
            this.set(r, g, b, a);
        }
        else {
            this.set(r);
        }
    }
    /**
     * @en Copy content of a color into another and save the results to out color.
     * @zh 获得指定颜色的拷贝
     */
    static clone(a) {
        const out = new Color();
        if (a._val) {
            out._val = a._val;
        }
        else {
            out._val = ((a.a << 24) >>> 0) + (a.b << 16) + (a.g << 8) + a.r;
        }
        return out;
    }
    /**
     * @en Clone a color and save the results to out color.
     * @zh 复制目标颜色
     */
    static copy(out, a) {
        out.r = a.r;
        out.g = a.g;
        out.b = a.b;
        out.a = a.a;
        return out;
    }
    /**
     * @en Set the components of a color to the given values and save the results to out color.
     * @zh 设置颜色值
     */
    static set(out, r, g, b, a) {
        out.r = r;
        out.g = g;
        out.b = b;
        out.a = a;
        return out;
    }
    /**
     * @en Converts the hexadecimal formal color into rgb formal and save the results to out color.
     * @zh 从十六进制颜色字符串中读入颜色到 out 中
     */
    static fromHEX(out, hexString) {
        hexString = (hexString.indexOf('#') === 0) ? hexString.substring(1) : hexString;
        out.r = parseInt(hexString.substr(0, 2), 16) || 0;
        out.g = parseInt(hexString.substr(2, 2), 16) || 0;
        out.b = parseInt(hexString.substr(4, 2), 16) || 0;
        out.a = parseInt(hexString.substr(6, 2), 16) || 255;
        out._val = ((out.a << 24) >>> 0) + (out.b << 16) + (out.g << 8) + out.r;
        return out;
    }
    /**
     * @en Add two colors by components. And save the results to out color.
     * @zh 逐通道颜色加法
     */
    static add(out, a, b) {
        out.r = a.r + b.r;
        out.g = a.g + b.g;
        out.b = a.b + b.b;
        out.a = a.a + b.a;
        return out;
    }
    /**
     * @en Subtract each components of color b from each components of color a. And save the results to out color.
     * @zh 逐通道颜色减法
     */
    static subtract(out, a, b) {
        out.r = a.r - b.r;
        out.g = a.g - b.g;
        out.b = a.b - b.b;
        out.a = a.a - b.a;
        return out;
    }
    /**
     * @en Multiply each components of two colors. And save the results to out color.
     * @zh 逐通道颜色乘法
     */
    static multiply(out, a, b) {
        out.r = a.r * b.r;
        out.g = a.g * b.g;
        out.b = a.b * b.b;
        out.a = a.a * b.a;
        return out;
    }
    /**
     * @en Divide each components of color a by each components of color b. And save the results to out color.
     * @zh 逐通道颜色除法
     */
    static divide(out, a, b) {
        out.r = a.r / b.r;
        out.g = a.g / b.g;
        out.b = a.b / b.b;
        out.a = a.a / b.a;
        return out;
    }
    /**
     * @en Multiply all channels in a color with the given scale factor, and save the results to out color.
     * @zh 全通道统一缩放颜色
     */
    static scale(out, a, b) {
        out.r = a.r * b;
        out.g = a.g * b;
        out.b = a.b * b;
        out.a = a.a * b;
        return out;
    }
    /**
     * @en Performs a linear interpolation between two colors.
     * @zh 逐通道颜色线性插值：A + t * (B - A)
     */
    static lerp(out, from, to, ratio) {
        let r = from.r;
        let g = from.g;
        let b = from.b;
        let a = from.a;
        r += (to.r - r) * ratio;
        g += (to.g - g) * ratio;
        b += (to.b - b) * ratio;
        a += (to.a - a) * ratio;
        out._val = Math.floor(((a << 24) >>> 0) + (b << 16) + (g << 8) + r);
        return out;
    }
    /**
     * @en Convert a color object to a RGBA array, and save the results to out color.
     * @zh 颜色转数组
     * @param ofs Array Start Offset
     */
    static toArray(out, a, ofs = 0) {
        const scale = (a instanceof Color || a.a > 1) ? 1 / 255 : 1;
        out[ofs + 0] = a.r * scale;
        out[ofs + 1] = a.g * scale;
        out[ofs + 2] = a.b * scale;
        out[ofs + 3] = a.a * scale;
        return out;
    }
    /**
     * @en Sets the given color with RGBA values in an array, and save the results to out color.
     * @zh 数组转颜色
     * @param ofs Array Start Offset
     */
    static fromArray(arr, out, ofs = 0) {
        out.r = arr[ofs + 0] * 255;
        out.g = arr[ofs + 1] * 255;
        out.b = arr[ofs + 2] * 255;
        out.a = arr[ofs + 3] * 255;
        return out;
    }
    /**
     * @en Check whether the two given colors are identical
     * @zh 颜色等价判断
     */
    static strictEquals(a, b) {
        return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
    }
    /**
     * @en Check whether the two given colors are approximately equivalent. Difference of each channel is smaller that the epsilon.
     * @zh 排除浮点数误差的颜色近似等价判断
     */
    static equals(a, b, epsilon = utils_1.EPSILON) {
        return (Math.abs(a.r - b.r) <= epsilon * Math.max(1.0, Math.abs(a.r), Math.abs(b.r))
            && Math.abs(a.g - b.g) <= epsilon * Math.max(1.0, Math.abs(a.g), Math.abs(b.g))
            && Math.abs(a.b - b.b) <= epsilon * Math.max(1.0, Math.abs(a.b), Math.abs(b.b))
            && Math.abs(a.a - b.a) <= epsilon * Math.max(1.0, Math.abs(a.a), Math.abs(b.a)));
    }
    /**
     * @en Convert the given color to a hex color value. And save the results to out color.
     * @zh 获取指定颜色的整型数据表示
     */
    static hex(a) {
        return ((a.r * 255) << 24 | (a.g * 255) << 16 | (a.b * 255) << 8 | a.a * 255) >>> 0;
    }
    /**
     * @en Get or set red channel value.
     * @zh 获取或设置当前颜色的 Red 通道。
     */
    get r() {
        return this._val & 0x000000ff;
    }
    set r(red) {
        red = ~~utils_1.clamp(red, 0, 255);
        this._val = ((this._val & 0xffffff00) | red) >>> 0;
    }
    /**
     * @en Get or set green channel value.
     * @zh 获取或设置当前颜色的 Green 通道。
     */
    get g() {
        return (this._val & 0x0000ff00) >> 8;
    }
    set g(green) {
        green = ~~utils_1.clamp(green, 0, 255);
        this._val = ((this._val & 0xffff00ff) | (green << 8)) >>> 0;
    }
    /**
     * @en Get or set blue channel value.
     * @zh 获取或设置当前颜色的 Blue 通道。
     */
    get b() {
        return (this._val & 0x00ff0000) >> 16;
    }
    set b(blue) {
        blue = ~~utils_1.clamp(blue, 0, 255);
        this._val = ((this._val & 0xff00ffff) | (blue << 16)) >>> 0;
    }
    /** @en Get or set alpha channel value.
     * @zh 获取或设置当前颜色的透明度通道。
     */
    get a() {
        return (this._val & 0xff000000) >>> 24;
    }
    set a(alpha) {
        alpha = ~~utils_1.clamp(alpha, 0, 255);
        this._val = ((this._val & 0x00ffffff) | (alpha << 24)) >>> 0;
    }
    // compatibility with vector interfaces
    get x() { return this.r * toFloat; }
    set x(value) { this.r = value * 255; }
    get y() { return this.g * toFloat; }
    set y(value) { this.g = value * 255; }
    get z() { return this.b * toFloat; }
    set z(value) { this.b = value * 255; }
    get w() { return this.a * toFloat; }
    set w(value) { this.a = value * 255; }
    /**
     * @en Clone a new color from the current color.
     * @zh 克隆当前颜色。
     */
    clone() {
        const ret = new Color();
        ret._val = this._val;
        return ret;
    }
    /**
     * @en Check whether the current color is identical with the given color
     * @zh 判断当前颜色是否与指定颜色相等。
     * @param other Specified color
     * @returns Returns `true` when all channels of both colours are equal; otherwise returns `false`.
     */
    equals(other) {
        return other && this._val === other._val;
    }
    /**
     * @en Calculate linear interpolation result between this color and another one with given ratio。
     * @zh 根据指定的插值比率，从当前颜色到目标颜色之间做插值。
     * @param to Target color
     * @param ratio The interpolation coefficient.The range is [0,1].
     */
    lerp(to, ratio) {
        let r = this.r;
        let g = this.g;
        let b = this.b;
        let a = this.a;
        r += (to.r - r) * ratio;
        g += (to.g - g) * ratio;
        b += (to.b - b) * ratio;
        a += (to.a - a) * ratio;
        this._val = Math.floor(((a << 24) >>> 0) + (b << 16) + (g << 8) + r);
        return this;
    }
    /**
     * @en Convert to string with color informations
     * @zh 返回当前颜色的字符串表示。
     * @returns A string representation of the current color.
     */
    toString() {
        return `rgba(${this.r.toFixed()}, ${this.g.toFixed()}, ${this.b.toFixed()}, ${this.a.toFixed()})`;
    }
    /**
     * @en Convert color to css format.
     * @zh 将当前颜色转换为 CSS 格式。
     * @param opt "rgba", "rgb", "#rgb" or "#rrggbb".
     * @returns CSS format for the current color.
     * @example
     * ```ts
     * let color = cc.Color.BLACK;
     * color.toCSS();          // "rgba(0,0,0,1.00)";
     * color.toCSS("rgba");    // "rgba(0,0,0,1.00)";
     * color.toCSS("rgb");     // "rgba(0,0,0)";
     * color.toCSS("#rgb");    // "#000";
     * color.toCSS("#rrggbb"); // "#000000";
     * ```
     */
    toCSS(opt = 'rgba') {
        if (opt === 'rgba') {
            return `rgba(${this.r},${this.g},${this.b},${(this.a * toFloat).toFixed(2)})`;
        }
        else if (opt === 'rgb') {
            return `rgb(${this.r},${this.g},${this.b})`;
        }
        else {
            return `#${this.toHEX(opt)}`;
        }
    }
    /**
     * @en Read hex string and store color data into the current color object, the hex string must be formatted as rgba or rgb.
     * @zh 从十六进制颜色字符串中读入当前颜色。<br/>
     * 十六进制颜色字符串应该以可选的 "#" 开头，紧跟最多 8 个代表十六进制数字的字符；<br/>
     * 每两个连续字符代表的数值依次作为 Red、Green、Blue 和 Alpha 通道；<br/>
     * 缺省的颜色通道将视为 0；缺省的透明通道将视为 255。<br/>
     * @param hexString the hex string
     * @returns `this`
     */
    fromHEX(hexString) {
        hexString = (hexString.indexOf('#') === 0) ? hexString.substring(1) : hexString;
        const r = parseInt(hexString.substr(0, 2), 16) || 0;
        const g = parseInt(hexString.substr(2, 2), 16) || 0;
        const b = parseInt(hexString.substr(4, 2), 16) || 0;
        const a = parseInt(hexString.substr(6, 2), 16) || 255;
        this._val = ((a << 24) >>> 0) + (b << 16) + (g << 8) + (r | 0);
        return this;
    }
    /**
     * @en convert Color to HEX color string.
     * @zh 转换当前颜色为十六进制颜色字符串。
     * @param fmt "#rrggbb" or "#rrggbbaa".
     * - `'#rrggbbaa'` obtains the hexadecimal value of the Red, Green, Blue, Alpha channels (**two**, high complement 0) and connects them sequentially.
     * - `'#rrggbb'` is similar to `'#rrggbbaa'` but does not include the Alpha channel.
     * @returns the Hex color string
     * @example
     * ```
     * const color = new Color(255, 14, 0, 255);
     * color.toHEX("#rgb");      // "f00";
     * color.toHEX("#rrggbbaa"); // "ff0e00"
     * color.toHEX("#rrggbb");   // "ff0e00ff"
     * ```
     */
    toHEX(fmt = '#rrggbb') {
        const prefix = '0';
        // #rrggbb
        const hex = [
            (this.r < 16 ? prefix : '') + (this.r).toString(16),
            (this.g < 16 ? prefix : '') + (this.g).toString(16),
            (this.b < 16 ? prefix : '') + (this.b).toString(16),
        ];
        const i = -1;
        if (fmt === '#rgb') {
            hex[0] = hex[0][0];
            hex[1] = hex[1][0];
            hex[2] = hex[2][0];
        }
        else if (fmt === '#rrggbbaa') {
            hex.push((this.a < 16 ? prefix : '') + (this.a).toString(16));
        }
        return hex.join('');
    }
    /**
     * @en Convert to rgb value.
     * @zh 将当前颜色转换为 RGB 整数值。
     * @returns RGB integer value. Starting from the lowest valid bit, each 8 bits is the value of the Red, Green, and Blue channels respectively.
     * @example
     * ```
     * const color = Color.YELLOW;
     * color.toRGBValue();
     * ```
     */
    toRGBValue() {
        return this._val & 0x00ffffff;
    }
    /**
     * @en Read HSV model color and convert to RGB color.
     * @zh 从 HSV 颜色中读入当前颜色。
     * @param h H value。
     * @param s S value。
     * @param v V value。
     * @returns `this`
     * @example
     * ```
     * const color = Color.YELLOW;
     * color.fromHSV(0, 0, 1); // Color {r: 255, g: 255, b: 255, a: 255};
     * ```
     */
    fromHSV(h, s, v) {
        let r = 0;
        let g = 0;
        let b = 0;
        if (s === 0) {
            r = g = b = v;
        }
        else if (v === 0) {
            r = g = b = 0;
        }
        else {
            if (h === 1) {
                h = 0;
            }
            h *= 6;
            const i = Math.floor(h);
            const f = h - i;
            const p = v * (1 - s);
            const q = v * (1 - (s * f));
            const t = v * (1 - (s * (1 - f)));
            switch (i) {
                case 0:
                    r = v;
                    g = t;
                    b = p;
                    break;
                case 1:
                    r = q;
                    g = v;
                    b = p;
                    break;
                case 2:
                    r = p;
                    g = v;
                    b = t;
                    break;
                case 3:
                    r = p;
                    g = q;
                    b = v;
                    break;
                case 4:
                    r = t;
                    g = p;
                    b = v;
                    break;
                case 5:
                    r = v;
                    g = p;
                    b = q;
                    break;
            }
        }
        r *= 255;
        g *= 255;
        b *= 255;
        this._val = ((this.a << 24) >>> 0) + (b << 16) + (g << 8) + (r | 0);
        return this;
    }
    /**
     * @en Transform to HSV model color.
     * @zh 转换当前颜色为 HSV 颜色。
     * @returns HSV format color
     * @example
     * ```
     * import { Color } from 'cc';
     * const color = Color.YELLOW;
     * color.toHSV(); // {h: 0.1533864541832669, s: 0.9843137254901961, v: 1}
     * ```
     */
    toHSV() {
        const r = this.r * toFloat;
        const g = this.g * toFloat;
        const b = this.b * toFloat;
        const hsv = { h: 0, s: 0, v: 0 };
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let delta = 0;
        hsv.v = max;
        hsv.s = max ? (max - min) / max : 0;
        if (!hsv.s) {
            hsv.h = 0;
        }
        else {
            delta = max - min;
            if (r === max) {
                hsv.h = (g - b) / delta;
            }
            else if (g === max) {
                hsv.h = 2 + (b - r) / delta;
            }
            else {
                hsv.h = 4 + (r - g) / delta;
            }
            hsv.h /= 6;
            if (hsv.h < 0) {
                hsv.h += 1.0;
            }
        }
        return hsv;
    }
    set(r, g, b, a) {
        if (typeof r === 'object') {
            if (r._val != null) {
                this._val = r._val;
            }
            else {
                g = r.g || 0;
                b = r.b || 0;
                a = typeof r.a === 'number' ? r.a : 255;
                r = r.r || 0;
                this._val = ((a << 24) >>> 0) + (b << 16) + (g << 8) + (r | 0);
            }
        }
        else {
            r = r || 0;
            g = g || 0;
            b = b || 0;
            a = typeof a === 'number' ? a : 255;
            this._val = ((a << 24) >>> 0) + (b << 16) + (g << 8) + (r | 0);
        }
        return this;
    }
    /**
     * @en Multiplies the current color by the specified color.
     * @zh 将当前颜色乘以与指定颜色
     * @param other The specified color.
     */
    multiply(other) {
        const r = ((this._val & 0x000000ff) * other.r) >> 8;
        const g = ((this._val & 0x0000ff00) * other.g) >> 8;
        const b = ((this._val & 0x00ff0000) * other.b) >> 8;
        const a = ((this._val & 0xff000000) >>> 8) * other.a;
        this._val = (a & 0xff000000) | (b & 0x00ff0000) | (g & 0x0000ff00) | (r & 0x000000ff);
        return this;
    }
    _set_r_unsafe(red) {
        this._val = ((this._val & 0xffffff00) | red) >>> 0;
        return this;
    }
    _set_g_unsafe(green) {
        this._val = ((this._val & 0xffff00ff) | (green << 8)) >>> 0;
        return this;
    }
    _set_b_unsafe(blue) {
        this._val = ((this._val & 0xff00ffff) | (blue << 16)) >>> 0;
        return this;
    }
    _set_a_unsafe(alpha) {
        this._val = ((this._val & 0x00ffffff) | (alpha << 24)) >>> 0;
        return this;
    }
}
exports.Color = Color;
Color.WHITE = Object.freeze(new Color(255, 255, 255, 255));
Color.GRAY = Object.freeze(new Color(127, 127, 127, 255));
Color.BLACK = Object.freeze(new Color(0, 0, 0, 255));
Color.TRANSPARENT = Object.freeze(new Color(0, 0, 0, 0));
Color.RED = Object.freeze(new Color(255, 0, 0, 255));
Color.GREEN = Object.freeze(new Color(0, 255, 0, 255));
Color.BLUE = Object.freeze(new Color(0, 0, 255, 255));
Color.CYAN = Object.freeze(new Color(0, 255, 255, 255));
Color.MAGENTA = Object.freeze(new Color(255, 0, 255, 255));
Color.YELLOW = Object.freeze(new Color(255, 255, 0, 255));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvdXRpbHMvTWF0aHMvQ29sb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbUNBQXlDO0FBRXpDLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFFeEI7Ozs7O0dBS0c7QUFDSCxNQUFhLEtBQUs7SUEyUmQsWUFBYSxDQUEyQixFQUFFLENBQVUsRUFBRSxDQUFVLEVBQUUsQ0FBVTtRQTNCckUsU0FBSSxHQUFHLENBQUMsQ0FBQztRQTRCWixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25CO2FBQU0sSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbEM7YUFBTTtZQUNILElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBVSxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBdlJEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQTBCLENBQU07UUFDL0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDUixHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDckI7YUFBTTtZQUNILEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25FO1FBQ0Qs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LEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTTtRQUNwRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQU07UUFDbEUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFTO1FBQ3BFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBMEIsR0FBUSxFQUFFLElBQVMsRUFBRSxFQUFPLEVBQUUsS0FBYTtRQUNuRixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDeEIsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEUsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQU8sR0FBUSxFQUFFLENBQWEsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUN4RCxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDM0IsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMzQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDM0IsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQTBCLEdBQUcsRUFBRSxHQUFRLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDbkUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUMzQixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDM0IsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUMzQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWSxDQUEwQixDQUFNLEVBQUUsQ0FBTTtRQUM5RCxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBMEIsQ0FBTSxFQUFFLENBQU0sRUFBRSxPQUFPLEdBQUcsZUFBTztRQUMzRSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFDN0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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LEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2pELFVBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDaEQsVUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNsRCxhQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JELFlBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29sb3JMaWtlIH0gZnJvbSBcIi4vdHlwZS1kZWZpbmVcIjtcclxuaW1wb3J0IHsgRVBTSUxPTiwgY2xhbXAgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5cclxuY29uc3QgdG9GbG9hdCA9IDEgLyAyNTU7XHJcblxyXG4vKipcclxuICogQGVuIFJlcHJlc2VudGF0aW9uIG9mIFJHQkEgY29sb3JzLjxici8+XHJcbiAqIEVhY2ggY29sb3IgY29tcG9uZW50IGlzIGFuIGludGVnZXIgdmFsdWUgd2l0aCBhIHJhbmdlIGZyb20gMCB0byAyNTUuPGJyLz5cclxuICogQHpoIOmAmui/hyBSZWTjgIFHcmVlbuOAgUJsdWUg6aKc6Imy6YCa6YGT6KGo56S66aKc6Imy77yM5bm26YCa6L+HIEFscGhhIOmAmumBk+ihqOekuuS4jemAj+aYjuW6puOAgjxici8+XHJcbiAqIOavj+S4qumAmumBk+mDveS4uuWPluWAvOiMg+WbtCBbMCwgMjU1XSDnmoTmlbTmlbDjgII8YnIvPlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbG9yIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgV0hJVEUgPSBPYmplY3QuZnJlZXplKG5ldyBDb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgR1JBWSA9IE9iamVjdC5mcmVlemUobmV3IENvbG9yKDEyNywgMTI3LCAxMjcsIDI1NSkpO1xyXG4gICAgcHVibGljIHN0YXRpYyBCTEFDSyA9IE9iamVjdC5mcmVlemUobmV3IENvbG9yKDAsIDAsIDAsIDI1NSkpO1xyXG4gICAgcHVibGljIHN0YXRpYyBUUkFOU1BBUkVOVCA9IE9iamVjdC5mcmVlemUobmV3IENvbG9yKDAsIDAsIDAsIDApKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgUkVEID0gT2JqZWN0LmZyZWV6ZShuZXcgQ29sb3IoMjU1LCAwLCAwLCAyNTUpKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgR1JFRU4gPSBPYmplY3QuZnJlZXplKG5ldyBDb2xvcigwLCAyNTUsIDAsIDI1NSkpO1xyXG4gICAgcHVibGljIHN0YXRpYyBCTFVFID0gT2JqZWN0LmZyZWV6ZShuZXcgQ29sb3IoMCwgMCwgMjU1LCAyNTUpKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ1lBTiA9IE9iamVjdC5mcmVlemUobmV3IENvbG9yKDAsIDI1NSwgMjU1LCAyNTUpKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgTUFHRU5UQSA9IE9iamVjdC5mcmVlemUobmV3IENvbG9yKDI1NSwgMCwgMjU1LCAyNTUpKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgWUVMTE9XID0gT2JqZWN0LmZyZWV6ZShuZXcgQ29sb3IoMjU1LCAyNTUsIDAsIDI1NSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENvcHkgY29udGVudCBvZiBhIGNvbG9yIGludG8gYW5vdGhlciBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgY29sb3IuXHJcbiAgICAgKiBAemgg6I635b6X5oyH5a6a6aKc6Imy55qE5ou36LSdXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xvbmU8T3V0IGV4dGVuZHMgSUNvbG9yTGlrZT4gKGE6IE91dCkge1xyXG4gICAgICAgIGNvbnN0IG91dCA9IG5ldyBDb2xvcigpO1xyXG4gICAgICAgIGlmIChhLl92YWwpIHtcclxuICAgICAgICAgICAgb3V0Ll92YWwgPSBhLl92YWw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0Ll92YWwgPSAoKGEuYSA8PCAyNCkgPj4+IDApICsgKGEuYiA8PCAxNikgKyAoYS5nIDw8IDgpICsgYS5yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENsb25lIGEgY29sb3IgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IGNvbG9yLlxyXG4gICAgICogQHpoIOWkjeWItuebruagh+minOiJslxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvcHk8T3V0IGV4dGVuZHMgSUNvbG9yTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBvdXQuciA9IGEucjtcclxuICAgICAgICBvdXQuZyA9IGEuZztcclxuICAgICAgICBvdXQuYiA9IGEuYjtcclxuICAgICAgICBvdXQuYSA9IGEuYTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIGNvbG9yIHRvIHRoZSBnaXZlbiB2YWx1ZXMgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IGNvbG9yLlxyXG4gICAgICogQHpoIOiuvue9ruminOiJsuWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldDxPdXQgZXh0ZW5kcyBJQ29sb3JMaWtlPiAob3V0OiBPdXQsIHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGE6IG51bWJlcikge1xyXG4gICAgICAgIG91dC5yID0gcjtcclxuICAgICAgICBvdXQuZyA9IGc7XHJcbiAgICAgICAgb3V0LmIgPSBiO1xyXG4gICAgICAgIG91dC5hID0gYTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENvbnZlcnRzIHRoZSBoZXhhZGVjaW1hbCBmb3JtYWwgY29sb3IgaW50byByZ2IgZm9ybWFsIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBjb2xvci5cclxuICAgICAqIEB6aCDku47ljYHlha3ov5vliLbpopzoibLlrZfnrKbkuLLkuK3or7vlhaXpopzoibLliLAgb3V0IOS4rVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21IRVg8T3V0IGV4dGVuZHMgSUNvbG9yTGlrZT4gKG91dDogT3V0LCBoZXhTdHJpbmc6IHN0cmluZykge1xyXG4gICAgICAgIGhleFN0cmluZyA9IChoZXhTdHJpbmcuaW5kZXhPZignIycpID09PSAwKSA/IGhleFN0cmluZy5zdWJzdHJpbmcoMSkgOiBoZXhTdHJpbmc7XHJcbiAgICAgICAgb3V0LnIgPSBwYXJzZUludChoZXhTdHJpbmcuc3Vic3RyKDAsIDIpLCAxNikgfHwgMDtcclxuICAgICAgICBvdXQuZyA9IHBhcnNlSW50KGhleFN0cmluZy5zdWJzdHIoMiwgMiksIDE2KSB8fCAwO1xyXG4gICAgICAgIG91dC5iID0gcGFyc2VJbnQoaGV4U3RyaW5nLnN1YnN0cig0LCAyKSwgMTYpIHx8IDA7XHJcbiAgICAgICAgb3V0LmEgPSBwYXJzZUludChoZXhTdHJpbmcuc3Vic3RyKDYsIDIpLCAxNikgfHwgMjU1O1xyXG4gICAgICAgIG91dC5fdmFsID0gKChvdXQuYSA8PCAyNCkgPj4+IDApICsgKG91dC5iIDw8IDE2KSArIChvdXQuZyA8PCA4KSArIG91dC5yO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQWRkIHR3byBjb2xvcnMgYnkgY29tcG9uZW50cy4gQW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IGNvbG9yLlxyXG4gICAgICogQHpoIOmAkOmAmumBk+minOiJsuWKoOazlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZDxPdXQgZXh0ZW5kcyBJQ29sb3JMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgb3V0LnIgPSBhLnIgKyBiLnI7XHJcbiAgICAgICAgb3V0LmcgPSBhLmcgKyBiLmc7XHJcbiAgICAgICAgb3V0LmIgPSBhLmIgKyBiLmI7XHJcbiAgICAgICAgb3V0LmEgPSBhLmEgKyBiLmE7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBTdWJ0cmFjdCBlYWNoIGNvbXBvbmVudHMgb2YgY29sb3IgYiBmcm9tIGVhY2ggY29tcG9uZW50cyBvZiBjb2xvciBhLiBBbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgY29sb3IuXHJcbiAgICAgKiBAemgg6YCQ6YCa6YGT6aKc6Imy5YeP5rOVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3VidHJhY3Q8T3V0IGV4dGVuZHMgSUNvbG9yTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIG91dC5yID0gYS5yIC0gYi5yO1xyXG4gICAgICAgIG91dC5nID0gYS5nIC0gYi5nO1xyXG4gICAgICAgIG91dC5iID0gYS5iIC0gYi5iO1xyXG4gICAgICAgIG91dC5hID0gYS5hIC0gYi5hO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gTXVsdGlwbHkgZWFjaCBjb21wb25lbnRzIG9mIHR3byBjb2xvcnMuIEFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBjb2xvci5cclxuICAgICAqIEB6aCDpgJDpgJrpgZPpopzoibLkuZjms5VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtdWx0aXBseTxPdXQgZXh0ZW5kcyBJQ29sb3JMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgb3V0LnIgPSBhLnIgKiBiLnI7XHJcbiAgICAgICAgb3V0LmcgPSBhLmcgKiBiLmc7XHJcbiAgICAgICAgb3V0LmIgPSBhLmIgKiBiLmI7XHJcbiAgICAgICAgb3V0LmEgPSBhLmEgKiBiLmE7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBEaXZpZGUgZWFjaCBjb21wb25lbnRzIG9mIGNvbG9yIGEgYnkgZWFjaCBjb21wb25lbnRzIG9mIGNvbG9yIGIuIEFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBjb2xvci5cclxuICAgICAqIEB6aCDpgJDpgJrpgZPpopzoibLpmaTms5VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkaXZpZGU8T3V0IGV4dGVuZHMgSUNvbG9yTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIG91dC5yID0gYS5yIC8gYi5yO1xyXG4gICAgICAgIG91dC5nID0gYS5nIC8gYi5nO1xyXG4gICAgICAgIG91dC5iID0gYS5iIC8gYi5iO1xyXG4gICAgICAgIG91dC5hID0gYS5hIC8gYi5hO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gTXVsdGlwbHkgYWxsIGNoYW5uZWxzIGluIGEgY29sb3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGUgZmFjdG9yLCBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgY29sb3IuXHJcbiAgICAgKiBAemgg5YWo6YCa6YGT57uf5LiA57yp5pS+6aKc6ImyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2NhbGU8T3V0IGV4dGVuZHMgSUNvbG9yTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IG51bWJlcikge1xyXG4gICAgICAgIG91dC5yID0gYS5yICogYjtcclxuICAgICAgICBvdXQuZyA9IGEuZyAqIGI7XHJcbiAgICAgICAgb3V0LmIgPSBhLmIgKiBiO1xyXG4gICAgICAgIG91dC5hID0gYS5hICogYjtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gY29sb3JzLlxyXG4gICAgICogQHpoIOmAkOmAmumBk+minOiJsue6v+aAp+aPkuWAvO+8mkEgKyB0ICogKEIgLSBBKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxlcnA8T3V0IGV4dGVuZHMgSUNvbG9yTGlrZT4gKG91dDogT3V0LCBmcm9tOiBPdXQsIHRvOiBPdXQsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgciA9IGZyb20ucjtcclxuICAgICAgICBsZXQgZyA9IGZyb20uZztcclxuICAgICAgICBsZXQgYiA9IGZyb20uYjtcclxuICAgICAgICBsZXQgYSA9IGZyb20uYTtcclxuICAgICAgICByICs9ICh0by5yIC0gcikgKiByYXRpbztcclxuICAgICAgICBnICs9ICh0by5nIC0gZykgKiByYXRpbztcclxuICAgICAgICBiICs9ICh0by5iIC0gYikgKiByYXRpbztcclxuICAgICAgICBhICs9ICh0by5hIC0gYSkgKiByYXRpbztcclxuICAgICAgICBvdXQuX3ZhbCA9IE1hdGguZmxvb3IoKChhIDw8IDI0KSA+Pj4gMCkgKyAoYiA8PCAxNikgKyAoZyA8PCA4KSArIHIpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ29udmVydCBhIGNvbG9yIG9iamVjdCB0byBhIFJHQkEgYXJyYXksIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBjb2xvci5cclxuICAgICAqIEB6aCDpopzoibLovazmlbDnu4RcclxuICAgICAqIEBwYXJhbSBvZnMgQXJyYXkgU3RhcnQgT2Zmc2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdG9BcnJheTxPdXQ+IChvdXQ6IE91dCwgYTogSUNvbG9yTGlrZSwgb2ZzID0gMCkge1xyXG4gICAgICAgIGNvbnN0IHNjYWxlID0gKGEgaW5zdGFuY2VvZiBDb2xvciB8fCBhLmEgPiAxKSA/IDEgLyAyNTUgOiAxO1xyXG4gICAgICAgIG91dFtvZnMgKyAwXSA9IGEuciAqIHNjYWxlO1xyXG4gICAgICAgIG91dFtvZnMgKyAxXSA9IGEuZyAqIHNjYWxlO1xyXG4gICAgICAgIG91dFtvZnMgKyAyXSA9IGEuYiAqIHNjYWxlO1xyXG4gICAgICAgIG91dFtvZnMgKyAzXSA9IGEuYSAqIHNjYWxlO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gU2V0cyB0aGUgZ2l2ZW4gY29sb3Igd2l0aCBSR0JBIHZhbHVlcyBpbiBhbiBhcnJheSwgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IGNvbG9yLlxyXG4gICAgICogQHpoIOaVsOe7hOi9rOminOiJslxyXG4gICAgICogQHBhcmFtIG9mcyBBcnJheSBTdGFydCBPZmZzZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tQXJyYXk8T3V0IGV4dGVuZHMgSUNvbG9yTGlrZT4gKGFyciwgb3V0OiBPdXQsIG9mcyA9IDApIHtcclxuICAgICAgICBvdXQuciA9IGFycltvZnMgKyAwXSAqIDI1NTtcclxuICAgICAgICBvdXQuZyA9IGFycltvZnMgKyAxXSAqIDI1NTtcclxuICAgICAgICBvdXQuYiA9IGFycltvZnMgKyAyXSAqIDI1NTtcclxuICAgICAgICBvdXQuYSA9IGFycltvZnMgKyAzXSAqIDI1NTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENoZWNrIHdoZXRoZXIgdGhlIHR3byBnaXZlbiBjb2xvcnMgYXJlIGlkZW50aWNhbFxyXG4gICAgICogQHpoIOminOiJsuetieS7t+WIpOaWrVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0cmljdEVxdWFsczxPdXQgZXh0ZW5kcyBJQ29sb3JMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICByZXR1cm4gYS5yID09PSBiLnIgJiYgYS5nID09PSBiLmcgJiYgYS5iID09PSBiLmIgJiYgYS5hID09PSBiLmE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2hlY2sgd2hldGhlciB0aGUgdHdvIGdpdmVuIGNvbG9ycyBhcmUgYXBwcm94aW1hdGVseSBlcXVpdmFsZW50LiBEaWZmZXJlbmNlIG9mIGVhY2ggY2hhbm5lbCBpcyBzbWFsbGVyIHRoYXQgdGhlIGVwc2lsb24uXHJcbiAgICAgKiBAemgg5o6S6Zmk5rWu54K55pWw6K+v5beu55qE6aKc6Imy6L+R5Ly8562J5Lu35Yik5patXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZXF1YWxzPE91dCBleHRlbmRzIElDb2xvckxpa2U+IChhOiBPdXQsIGI6IE91dCwgZXBzaWxvbiA9IEVQU0lMT04pIHtcclxuICAgICAgICByZXR1cm4gKE1hdGguYWJzKGEuciAtIGIucikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5yKSwgTWF0aC5hYnMoYi5yKSlcclxuICAgICAgICAgICAgJiYgTWF0aC5hYnMoYS5nIC0gYi5nKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLmcpLCBNYXRoLmFicyhiLmcpKVxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhhLmIgLSBiLmIpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEuYiksIE1hdGguYWJzKGIuYikpXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEuYSAtIGIuYSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5hKSwgTWF0aC5hYnMoYi5hKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENvbnZlcnQgdGhlIGdpdmVuIGNvbG9yIHRvIGEgaGV4IGNvbG9yIHZhbHVlLiBBbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgY29sb3IuXHJcbiAgICAgKiBAemgg6I635Y+W5oyH5a6a6aKc6Imy55qE5pW05Z6L5pWw5o2u6KGo56S6XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaGV4PE91dCBleHRlbmRzIElDb2xvckxpa2U+IChhOiBPdXQpIHtcclxuICAgICAgICByZXR1cm4gKChhLnIgKiAyNTUpIDw8IDI0IHwgKGEuZyAqIDI1NSkgPDwgMTYgfCAoYS5iICogMjU1KSA8PCA4IHwgYS5hICogMjU1KSA+Pj4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBHZXQgb3Igc2V0IHJlZCBjaGFubmVsIHZhbHVlLlxyXG4gICAgICogQHpoIOiOt+WPluaIluiuvue9ruW9k+WJjeminOiJsueahCBSZWQg6YCa6YGT44CCXHJcbiAgICAgKi9cclxuICAgIGdldCByICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsICYgMHgwMDAwMDBmZjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgciAocmVkKSB7XHJcbiAgICAgICAgcmVkID0gfn5jbGFtcChyZWQsIDAsIDI1NSk7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gKCh0aGlzLl92YWwgJiAweGZmZmZmZjAwKSB8IHJlZCkgPj4+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gR2V0IG9yIHNldCBncmVlbiBjaGFubmVsIHZhbHVlLlxyXG4gICAgICogQHpoIOiOt+WPluaIluiuvue9ruW9k+WJjeminOiJsueahCBHcmVlbiDpgJrpgZPjgIJcclxuICAgICAqL1xyXG4gICAgZ2V0IGcgKCkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5fdmFsICYgMHgwMDAwZmYwMCkgPj4gODtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZyAoZ3JlZW4pIHtcclxuICAgICAgICBncmVlbiA9IH5+Y2xhbXAoZ3JlZW4sIDAsIDI1NSk7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gKCh0aGlzLl92YWwgJiAweGZmZmYwMGZmKSB8IChncmVlbiA8PCA4KSkgPj4+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gR2V0IG9yIHNldCBibHVlIGNoYW5uZWwgdmFsdWUuXHJcbiAgICAgKiBAemgg6I635Y+W5oiW6K6+572u5b2T5YmN6aKc6Imy55qEIEJsdWUg6YCa6YGT44CCXHJcbiAgICAgKi9cclxuICAgIGdldCBiICgpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuX3ZhbCAmIDB4MDBmZjAwMDApID4+IDE2O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBiIChibHVlKSB7XHJcbiAgICAgICAgYmx1ZSA9IH5+Y2xhbXAoYmx1ZSwgMCwgMjU1KTtcclxuICAgICAgICB0aGlzLl92YWwgPSAoKHRoaXMuX3ZhbCAmIDB4ZmYwMGZmZmYpIHwgKGJsdWUgPDwgMTYpKSA+Pj4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGVuIEdldCBvciBzZXQgYWxwaGEgY2hhbm5lbCB2YWx1ZS5cclxuICAgICAqIEB6aCDojrflj5bmiJborr7nva7lvZPliY3popzoibLnmoTpgI/mmI7luqbpgJrpgZPjgIJcclxuICAgICAqL1xyXG4gICAgZ2V0IGEgKCkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5fdmFsICYgMHhmZjAwMDAwMCkgPj4+IDI0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBhIChhbHBoYSkge1xyXG4gICAgICAgIGFscGhhID0gfn5jbGFtcChhbHBoYSwgMCwgMjU1KTtcclxuICAgICAgICB0aGlzLl92YWwgPSAoKHRoaXMuX3ZhbCAmIDB4MDBmZmZmZmYpIHwgKGFscGhhIDw8IDI0KSkgPj4+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29tcGF0aWJpbGl0eSB3aXRoIHZlY3RvciBpbnRlcmZhY2VzXHJcbiAgICBnZXQgeCAoKSB7IHJldHVybiB0aGlzLnIgKiB0b0Zsb2F0OyB9XHJcbiAgICBzZXQgeCAodmFsdWUpIHsgdGhpcy5yID0gdmFsdWUgKiAyNTU7IH1cclxuICAgIGdldCB5ICgpIHsgcmV0dXJuIHRoaXMuZyAqIHRvRmxvYXQ7IH1cclxuICAgIHNldCB5ICh2YWx1ZSkgeyB0aGlzLmcgPSB2YWx1ZSAqIDI1NTsgfVxyXG4gICAgZ2V0IHogKCkgeyByZXR1cm4gdGhpcy5iICogdG9GbG9hdDsgfVxyXG4gICAgc2V0IHogKHZhbHVlKSB7IHRoaXMuYiA9IHZhbHVlICogMjU1OyB9XHJcbiAgICBnZXQgdyAoKSB7IHJldHVybiB0aGlzLmEgKiB0b0Zsb2F0OyB9XHJcbiAgICBzZXQgdyAodmFsdWUpIHsgdGhpcy5hID0gdmFsdWUgKiAyNTU7IH1cclxuXHJcbiAgICBwdWJsaWMgX3ZhbCA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ29uc3RydWN0IGEgc2FtZSBjb2xvciBmcm9tIHRoZSBnaXZlbiBjb2xvclxyXG4gICAgICogQHpoIOaehOmAoOS4juaMh+WumuminOiJsuebuOetieeahOminOiJsuOAglxyXG4gICAgICogQHBhcmFtIG90aGVyIFNwZWNpZmllZCBjb2xvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvciAob3RoZXI6IENvbG9yKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBDb25zdHJ1Y3QgYSBjb2xvciBmb3JtIHRoZSBoZXggY29sb3Igc3RyaW5nXHJcbiAgICAgKiBAemgg55So5Y2B5YWt6L+b5Yi26aKc6Imy5a2X56ym5Liy5Lit5p6E6YCg6aKc6Imy44CCXHJcbiAgICAgKiBAcGFyYW0gaGV4U3RyaW5nIEhleGFkZWNpbWFsIGNvbG9yIHN0cmluZy5cclxuICAgICAqL1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChoZXhTdHJpbmc6IHN0cmluZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ29uc3RydWN0IGEgY29sb3JcclxuICAgICAqIEB6aCDmnoTpgKDlhbfmnInmjIflrprpgJrpgZPnmoTpopzoibLjgIJcclxuICAgICAqIEBwYXJhbSByIHJlZCBjb21wb25lbnQgb2YgdGhlIGNvbG9yLCBkZWZhdWx0IHZhbHVlIGlzIDAuXHJcbiAgICAgKiBAcGFyYW0gZyBncmVlbiBjb21wb25lbnQgb2YgdGhlIGNvbG9yLCBkZWZhdWx0IHZhbHVlIGlzIDAuXHJcbiAgICAgKiBAcGFyYW0gYiBibHVlIGNvbXBvbmVudCBvZiB0aGUgY29sb3IsIGRlZmF1bHQgdmFsdWUgaXMgMC5cclxuICAgICAqIEBwYXJhbSBhIGFscGhhIGNvbXBvbmVudCBvZiB0aGUgY29sb3IsIGRlZmF1bHQgdmFsdWUgaXMgMjU1LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvciAocj86IG51bWJlciwgZz86IG51bWJlciwgYj86IG51bWJlciwgYT86IG51bWJlcik7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKHI/OiBudW1iZXIgfCBDb2xvciB8IHN0cmluZywgZz86IG51bWJlciwgYj86IG51bWJlciwgYT86IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgciA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5mcm9tSEVYKHIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KHIgYXMgbnVtYmVyLCBnLCBiLCBhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldChyIGFzIENvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ2xvbmUgYSBuZXcgY29sb3IgZnJvbSB0aGUgY3VycmVudCBjb2xvci5cclxuICAgICAqIEB6aCDlhYvpmoblvZPliY3popzoibLjgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsb25lICgpIHtcclxuICAgICAgICBjb25zdCByZXQgPSBuZXcgQ29sb3IoKTtcclxuICAgICAgICByZXQuX3ZhbCA9IHRoaXMuX3ZhbDtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENoZWNrIHdoZXRoZXIgdGhlIGN1cnJlbnQgY29sb3IgaXMgaWRlbnRpY2FsIHdpdGggdGhlIGdpdmVuIGNvbG9yXHJcbiAgICAgKiBAemgg5Yik5pat5b2T5YmN6aKc6Imy5piv5ZCm5LiO5oyH5a6a6aKc6Imy55u4562J44CCXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgU3BlY2lmaWVkIGNvbG9yXHJcbiAgICAgKiBAcmV0dXJucyBSZXR1cm5zIGB0cnVlYCB3aGVuIGFsbCBjaGFubmVscyBvZiBib3RoIGNvbG91cnMgYXJlIGVxdWFsOyBvdGhlcndpc2UgcmV0dXJucyBgZmFsc2VgLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXF1YWxzIChvdGhlcjogQ29sb3IpIHtcclxuICAgICAgICByZXR1cm4gb3RoZXIgJiYgdGhpcy5fdmFsID09PSBvdGhlci5fdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENhbGN1bGF0ZSBsaW5lYXIgaW50ZXJwb2xhdGlvbiByZXN1bHQgYmV0d2VlbiB0aGlzIGNvbG9yIGFuZCBhbm90aGVyIG9uZSB3aXRoIGdpdmVuIHJhdGlv44CCXHJcbiAgICAgKiBAemgg5qC55o2u5oyH5a6a55qE5o+S5YC85q+U546H77yM5LuO5b2T5YmN6aKc6Imy5Yiw55uu5qCH6aKc6Imy5LmL6Ze05YGa5o+S5YC844CCXHJcbiAgICAgKiBAcGFyYW0gdG8gVGFyZ2V0IGNvbG9yXHJcbiAgICAgKiBAcGFyYW0gcmF0aW8gVGhlIGludGVycG9sYXRpb24gY29lZmZpY2llbnQuVGhlIHJhbmdlIGlzIFswLDFdLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbGVycCAodG86IENvbG9yLCByYXRpbzogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHIgPSB0aGlzLnI7XHJcbiAgICAgICAgbGV0IGcgPSB0aGlzLmc7XHJcbiAgICAgICAgbGV0IGIgPSB0aGlzLmI7XHJcbiAgICAgICAgbGV0IGEgPSB0aGlzLmE7XHJcbiAgICAgICAgciArPSAodG8uciAtIHIpICogcmF0aW87XHJcbiAgICAgICAgZyArPSAodG8uZyAtIGcpICogcmF0aW87XHJcbiAgICAgICAgYiArPSAodG8uYiAtIGIpICogcmF0aW87XHJcbiAgICAgICAgYSArPSAodG8uYSAtIGEpICogcmF0aW87XHJcbiAgICAgICAgdGhpcy5fdmFsID0gTWF0aC5mbG9vcigoKGEgPDwgMjQpID4+PiAwKSArIChiIDw8IDE2KSArIChnIDw8IDgpICsgcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ29udmVydCB0byBzdHJpbmcgd2l0aCBjb2xvciBpbmZvcm1hdGlvbnNcclxuICAgICAqIEB6aCDov5Tlm57lvZPliY3popzoibLnmoTlrZfnrKbkuLLooajnpLrjgIJcclxuICAgICAqIEByZXR1cm5zIEEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBjdXJyZW50IGNvbG9yLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcgKCkge1xyXG4gICAgICAgIHJldHVybiBgcmdiYSgke1xyXG4gICAgICAgICAgICB0aGlzLnIudG9GaXhlZCgpfSwgJHtcclxuICAgICAgICAgICAgdGhpcy5nLnRvRml4ZWQoKX0sICR7XHJcbiAgICAgICAgICAgIHRoaXMuYi50b0ZpeGVkKCl9LCAke1xyXG4gICAgICAgICAgICB0aGlzLmEudG9GaXhlZCgpfSlgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIENvbnZlcnQgY29sb3IgdG8gY3NzIGZvcm1hdC5cclxuICAgICAqIEB6aCDlsIblvZPliY3popzoibLovazmjaLkuLogQ1NTIOagvOW8j+OAglxyXG4gICAgICogQHBhcmFtIG9wdCBcInJnYmFcIiwgXCJyZ2JcIiwgXCIjcmdiXCIgb3IgXCIjcnJnZ2JiXCIuXHJcbiAgICAgKiBAcmV0dXJucyBDU1MgZm9ybWF0IGZvciB0aGUgY3VycmVudCBjb2xvci5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBgYGB0c1xyXG4gICAgICogbGV0IGNvbG9yID0gY2MuQ29sb3IuQkxBQ0s7XHJcbiAgICAgKiBjb2xvci50b0NTUygpOyAgICAgICAgICAvLyBcInJnYmEoMCwwLDAsMS4wMClcIjtcclxuICAgICAqIGNvbG9yLnRvQ1NTKFwicmdiYVwiKTsgICAgLy8gXCJyZ2JhKDAsMCwwLDEuMDApXCI7XHJcbiAgICAgKiBjb2xvci50b0NTUyhcInJnYlwiKTsgICAgIC8vIFwicmdiYSgwLDAsMClcIjtcclxuICAgICAqIGNvbG9yLnRvQ1NTKFwiI3JnYlwiKTsgICAgLy8gXCIjMDAwXCI7XHJcbiAgICAgKiBjb2xvci50b0NTUyhcIiNycmdnYmJcIik7IC8vIFwiIzAwMDAwMFwiO1xyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b0NTUyAob3B0OiAoJ3JnYmEnIHwgJ3JnYicgfCAnI3JyZ2diYicgfCAnI3JyZ2diYmFhJykgPSAncmdiYScpIHtcclxuICAgICAgICBpZiAob3B0ID09PSAncmdiYScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGByZ2JhKCR7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ9LCR7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmd9LCR7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ9LCR7XHJcbiAgICAgICAgICAgICAgICAodGhpcy5hICogdG9GbG9hdCkudG9GaXhlZCgyKX0pYDtcclxuICAgICAgICB9IGVsc2UgaWYgKG9wdCA9PT0gJ3JnYicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGByZ2IoJHtcclxuICAgICAgICAgICAgICAgIHRoaXMucn0sJHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ30sJHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYn0pYDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYCMke3RoaXMudG9IRVgob3B0KX1gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBSZWFkIGhleCBzdHJpbmcgYW5kIHN0b3JlIGNvbG9yIGRhdGEgaW50byB0aGUgY3VycmVudCBjb2xvciBvYmplY3QsIHRoZSBoZXggc3RyaW5nIG11c3QgYmUgZm9ybWF0dGVkIGFzIHJnYmEgb3IgcmdiLlxyXG4gICAgICogQHpoIOS7juWNgeWFrei/m+WItuminOiJsuWtl+espuS4suS4reivu+WFpeW9k+WJjeminOiJsuOAgjxici8+XHJcbiAgICAgKiDljYHlha3ov5vliLbpopzoibLlrZfnrKbkuLLlupTor6Xku6Xlj6/pgInnmoQgXCIjXCIg5byA5aS077yM57Sn6Lef5pyA5aSaIDgg5Liq5Luj6KGo5Y2B5YWt6L+b5Yi25pWw5a2X55qE5a2X56ym77ybPGJyLz5cclxuICAgICAqIOavj+S4pOS4qui/nue7reWtl+espuS7o+ihqOeahOaVsOWAvOS+neasoeS9nOS4uiBSZWTjgIFHcmVlbuOAgUJsdWUg5ZKMIEFscGhhIOmAmumBk++8mzxici8+XHJcbiAgICAgKiDnvLrnnIHnmoTpopzoibLpgJrpgZPlsIbop4bkuLogMO+8m+e8uuecgeeahOmAj+aYjumAmumBk+WwhuinhuS4uiAyNTXjgII8YnIvPlxyXG4gICAgICogQHBhcmFtIGhleFN0cmluZyB0aGUgaGV4IHN0cmluZ1xyXG4gICAgICogQHJldHVybnMgYHRoaXNgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmcm9tSEVYIChoZXhTdHJpbmc6IHN0cmluZykge1xyXG4gICAgICAgIGhleFN0cmluZyA9IChoZXhTdHJpbmcuaW5kZXhPZignIycpID09PSAwKSA/IGhleFN0cmluZy5zdWJzdHJpbmcoMSkgOiBoZXhTdHJpbmc7XHJcbiAgICAgICAgY29uc3QgciA9IHBhcnNlSW50KGhleFN0cmluZy5zdWJzdHIoMCwgMiksIDE2KSB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGcgPSBwYXJzZUludChoZXhTdHJpbmcuc3Vic3RyKDIsIDIpLCAxNikgfHwgMDtcclxuICAgICAgICBjb25zdCBiID0gcGFyc2VJbnQoaGV4U3RyaW5nLnN1YnN0cig0LCAyKSwgMTYpIHx8IDA7XHJcbiAgICAgICAgY29uc3QgYSA9IHBhcnNlSW50KGhleFN0cmluZy5zdWJzdHIoNiwgMiksIDE2KSB8fCAyNTU7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gKChhIDw8IDI0KSA+Pj4gMCkgKyAoYiA8PCAxNikgKyAoZyA8PCA4KSArIChyIHwgMCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gY29udmVydCBDb2xvciB0byBIRVggY29sb3Igc3RyaW5nLlxyXG4gICAgICogQHpoIOi9rOaNouW9k+WJjeminOiJsuS4uuWNgeWFrei/m+WItuminOiJsuWtl+espuS4suOAglxyXG4gICAgICogQHBhcmFtIGZtdCBcIiNycmdnYmJcIiBvciBcIiNycmdnYmJhYVwiLlxyXG4gICAgICogLSBgJyNycmdnYmJhYSdgIG9idGFpbnMgdGhlIGhleGFkZWNpbWFsIHZhbHVlIG9mIHRoZSBSZWQsIEdyZWVuLCBCbHVlLCBBbHBoYSBjaGFubmVscyAoKip0d28qKiwgaGlnaCBjb21wbGVtZW50IDApIGFuZCBjb25uZWN0cyB0aGVtIHNlcXVlbnRpYWxseS5cclxuICAgICAqIC0gYCcjcnJnZ2JiJ2AgaXMgc2ltaWxhciB0byBgJyNycmdnYmJhYSdgIGJ1dCBkb2VzIG5vdCBpbmNsdWRlIHRoZSBBbHBoYSBjaGFubmVsLlxyXG4gICAgICogQHJldHVybnMgdGhlIEhleCBjb2xvciBzdHJpbmdcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBgYGBcclxuICAgICAqIGNvbnN0IGNvbG9yID0gbmV3IENvbG9yKDI1NSwgMTQsIDAsIDI1NSk7XHJcbiAgICAgKiBjb2xvci50b0hFWChcIiNyZ2JcIik7ICAgICAgLy8gXCJmMDBcIjtcclxuICAgICAqIGNvbG9yLnRvSEVYKFwiI3JyZ2diYmFhXCIpOyAvLyBcImZmMGUwMFwiXHJcbiAgICAgKiBjb2xvci50b0hFWChcIiNycmdnYmJcIik7ICAgLy8gXCJmZjBlMDBmZlwiXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRvSEVYIChmbXQ6ICcjcmdiJyB8ICcjcnJnZ2JiJyB8ICcjcnJnZ2JiYWEnID0gJyNycmdnYmInKSB7XHJcbiAgICAgICAgY29uc3QgcHJlZml4ID0gJzAnO1xyXG4gICAgICAgIC8vICNycmdnYmJcclxuICAgICAgICBjb25zdCBoZXggPSBbXHJcbiAgICAgICAgICAgICh0aGlzLnIgPCAxNiA/IHByZWZpeCA6ICcnKSArICh0aGlzLnIpLnRvU3RyaW5nKDE2KSxcclxuICAgICAgICAgICAgKHRoaXMuZyA8IDE2ID8gcHJlZml4IDogJycpICsgKHRoaXMuZykudG9TdHJpbmcoMTYpLFxyXG4gICAgICAgICAgICAodGhpcy5iIDwgMTYgPyBwcmVmaXggOiAnJykgKyAodGhpcy5iKS50b1N0cmluZygxNiksXHJcbiAgICAgICAgXTtcclxuICAgICAgICBjb25zdCBpID0gLTE7XHJcbiAgICAgICAgaWYgKGZtdCA9PT0gJyNyZ2InKSB7XHJcbiAgICAgICAgICAgIGhleFswXSA9IGhleFswXVswXTtcclxuICAgICAgICAgICAgaGV4WzFdID0gaGV4WzFdWzBdO1xyXG4gICAgICAgICAgICBoZXhbMl0gPSBoZXhbMl1bMF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChmbXQgPT09ICcjcnJnZ2JiYWEnKSB7XHJcbiAgICAgICAgICAgIGhleC5wdXNoKCh0aGlzLmEgPCAxNiA/IHByZWZpeCA6ICcnKSArICh0aGlzLmEpLnRvU3RyaW5nKDE2KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoZXguam9pbignJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQ29udmVydCB0byByZ2IgdmFsdWUuXHJcbiAgICAgKiBAemgg5bCG5b2T5YmN6aKc6Imy6L2s5o2i5Li6IFJHQiDmlbTmlbDlgLzjgIJcclxuICAgICAqIEByZXR1cm5zIFJHQiBpbnRlZ2VyIHZhbHVlLiBTdGFydGluZyBmcm9tIHRoZSBsb3dlc3QgdmFsaWQgYml0LCBlYWNoIDggYml0cyBpcyB0aGUgdmFsdWUgb2YgdGhlIFJlZCwgR3JlZW4sIGFuZCBCbHVlIGNoYW5uZWxzIHJlc3BlY3RpdmVseS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBgYGBcclxuICAgICAqIGNvbnN0IGNvbG9yID0gQ29sb3IuWUVMTE9XO1xyXG4gICAgICogY29sb3IudG9SR0JWYWx1ZSgpO1xyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b1JHQlZhbHVlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsICYgMHgwMGZmZmZmZjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBlbiBSZWFkIEhTViBtb2RlbCBjb2xvciBhbmQgY29udmVydCB0byBSR0IgY29sb3IuXHJcbiAgICAgKiBAemgg5LuOIEhTViDpopzoibLkuK3or7vlhaXlvZPliY3popzoibLjgIJcclxuICAgICAqIEBwYXJhbSBoIEggdmFsdWXjgIJcclxuICAgICAqIEBwYXJhbSBzIFMgdmFsdWXjgIJcclxuICAgICAqIEBwYXJhbSB2IFYgdmFsdWXjgIJcclxuICAgICAqIEByZXR1cm5zIGB0aGlzYFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGBgYFxyXG4gICAgICogY29uc3QgY29sb3IgPSBDb2xvci5ZRUxMT1c7XHJcbiAgICAgKiBjb2xvci5mcm9tSFNWKDAsIDAsIDEpOyAvLyBDb2xvciB7cjogMjU1LCBnOiAyNTUsIGI6IDI1NSwgYTogMjU1fTtcclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZnJvbUhTViAoaDogbnVtYmVyLCBzOiBudW1iZXIsIHY6IG51bWJlcikge1xyXG4gICAgICAgIGxldCByID0gMDtcclxuICAgICAgICBsZXQgZyA9IDA7XHJcbiAgICAgICAgbGV0IGIgPSAwO1xyXG4gICAgICAgIGlmIChzID09PSAwKSB7XHJcbiAgICAgICAgICAgIHIgPSBnID0gYiA9IHY7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHIgPSBnID0gYiA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGggPT09IDEpIHsgaCA9IDA7IH1cclxuICAgICAgICAgICAgaCAqPSA2O1xyXG4gICAgICAgICAgICBjb25zdCBpID0gTWF0aC5mbG9vcihoKTtcclxuICAgICAgICAgICAgY29uc3QgZiA9IGggLSBpO1xyXG4gICAgICAgICAgICBjb25zdCBwID0gdiAqICgxIC0gcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHEgPSB2ICogKDEgLSAocyAqIGYpKTtcclxuICAgICAgICAgICAgY29uc3QgdCA9IHYgKiAoMSAtIChzICogKDEgLSBmKSkpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGkpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgciA9IHY7XHJcbiAgICAgICAgICAgICAgICBnID0gdDtcclxuICAgICAgICAgICAgICAgIGIgPSBwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICByID0gcTtcclxuICAgICAgICAgICAgICAgIGcgPSB2O1xyXG4gICAgICAgICAgICAgICAgYiA9IHA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHIgPSBwO1xyXG4gICAgICAgICAgICAgICAgZyA9IHY7XHJcbiAgICAgICAgICAgICAgICBiID0gdDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgciA9IHA7XHJcbiAgICAgICAgICAgICAgICBnID0gcTtcclxuICAgICAgICAgICAgICAgIGIgPSB2O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICByID0gdDtcclxuICAgICAgICAgICAgICAgIGcgPSBwO1xyXG4gICAgICAgICAgICAgICAgYiA9IHY7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHIgPSB2O1xyXG4gICAgICAgICAgICAgICAgZyA9IHA7XHJcbiAgICAgICAgICAgICAgICBiID0gcTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHIgKj0gMjU1O1xyXG4gICAgICAgIGcgKj0gMjU1O1xyXG4gICAgICAgIGIgKj0gMjU1O1xyXG4gICAgICAgIHRoaXMuX3ZhbCA9ICgodGhpcy5hIDw8IDI0KSA+Pj4gMCkgKyAoYiA8PCAxNikgKyAoZyA8PCA4KSArIChyIHwgMCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gVHJhbnNmb3JtIHRvIEhTViBtb2RlbCBjb2xvci5cclxuICAgICAqIEB6aCDovazmjaLlvZPliY3popzoibLkuLogSFNWIOminOiJsuOAglxyXG4gICAgICogQHJldHVybnMgSFNWIGZvcm1hdCBjb2xvclxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGBgYFxyXG4gICAgICogaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjYyc7XHJcbiAgICAgKiBjb25zdCBjb2xvciA9IENvbG9yLllFTExPVztcclxuICAgICAqIGNvbG9yLnRvSFNWKCk7IC8vIHtoOiAwLjE1MzM4NjQ1NDE4MzI2NjksIHM6IDAuOTg0MzEzNzI1NDkwMTk2MSwgdjogMX1cclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9IU1YgKCkge1xyXG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLnIgKiB0b0Zsb2F0O1xyXG4gICAgICAgIGNvbnN0IGcgPSB0aGlzLmcgKiB0b0Zsb2F0O1xyXG4gICAgICAgIGNvbnN0IGIgPSB0aGlzLmIgKiB0b0Zsb2F0O1xyXG4gICAgICAgIGNvbnN0IGhzdiA9IHsgaDogMCwgczogMCwgdjogMCB9O1xyXG4gICAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KHIsIGcsIGIpO1xyXG4gICAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xyXG4gICAgICAgIGxldCBkZWx0YSA9IDA7XHJcbiAgICAgICAgaHN2LnYgPSBtYXg7XHJcbiAgICAgICAgaHN2LnMgPSBtYXggPyAobWF4IC0gbWluKSAvIG1heCA6IDA7XHJcbiAgICAgICAgaWYgKCFoc3YucykgeyBoc3YuaCA9IDA7IH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRlbHRhID0gbWF4IC0gbWluO1xyXG4gICAgICAgICAgICBpZiAociA9PT0gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBoc3YuaCA9IChnIC0gYikgLyBkZWx0YTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChnID09PSBtYXgpIHtcclxuICAgICAgICAgICAgICAgIGhzdi5oID0gMiArIChiIC0gcikgLyBkZWx0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhzdi5oID0gNCArIChyIC0gZykgLyBkZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBoc3YuaCAvPSA2O1xyXG4gICAgICAgICAgICBpZiAoaHN2LmggPCAwKSB7IGhzdi5oICs9IDEuMDsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaHN2O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIFNldCB0aGUgY29sb3IuXHJcbiAgICAgKiBAemgg6K6+572u5b2T5YmN6aKc6Imy5L2/5YW25LiO5oyH5a6a6aKc6Imy55u4562J44CCXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgVGhlIHNwZWNpZmllZCBjb2xvci5cclxuICAgICAqIEBvdmVybG9hZFxyXG4gICAgICogQHBhcmFtIFtyPTBdIHJlZCBjb21wb25lbnQgb2YgdGhlIGNvbG9yLCB0aGUgcmFuZ2UgaXMgWzAtMjU1XVxyXG4gICAgICogQHBhcmFtIFtnPTBdIGdyZWVuIGNvbXBvbmVudCBvZiB0aGUgY29sb3JcclxuICAgICAqIEBwYXJhbSBbYj0wXSBibHVlIGNvbXBvbmVudCBvZiB0aGUgY29sb3JcclxuICAgICAqIEBwYXJhbSBbYT0yNTVdIGFscGhhIGNvbXBvbmVudCBvZiB0aGUgY29sb3JcclxuICAgICAqIEByZXR1cm5zIEN1cnJlbnQgY29sb3IuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQob3RoZXI6IENvbG9yKTogQ29sb3I7XHJcbiAgICBwdWJsaWMgc2V0KHI/OiBudW1iZXIsIGc/OiBudW1iZXIsIGI/OiBudW1iZXIsIGE/OiBudW1iZXIpOiBDb2xvcjtcclxuICAgIHB1YmxpYyBzZXQgKHI/OiBudW1iZXIgfCBDb2xvciwgZz86IG51bWJlciwgYj86IG51bWJlciwgYT86IG51bWJlcik6IENvbG9yIHtcclxuICAgICAgICBpZiAodHlwZW9mIHIgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGlmIChyLl92YWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsID0gci5fdmFsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZyA9IHIuZyB8fCAwO1xyXG4gICAgICAgICAgICAgICAgYiA9IHIuYiB8fCAwO1xyXG4gICAgICAgICAgICAgICAgYSA9IHR5cGVvZiByLmEgPT09ICdudW1iZXInID8gci5hIDogMjU1O1xyXG4gICAgICAgICAgICAgICAgciA9IHIuciB8fCAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsID0gKChhIDw8IDI0KSA+Pj4gMCkgKyAoYiA8PCAxNikgKyAoZyA8PCA4KSArIChyIHwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByID0gciB8fCAwO1xyXG4gICAgICAgICAgICBnID0gZyB8fCAwO1xyXG4gICAgICAgICAgICBiID0gYiB8fCAwO1xyXG4gICAgICAgICAgICBhID0gdHlwZW9mIGEgPT09ICdudW1iZXInID8gYSA6IDI1NTtcclxuICAgICAgICAgICAgdGhpcy5fdmFsID0gKChhIDw8IDI0KSA+Pj4gMCkgKyAoYiA8PCAxNikgKyAoZyA8PCA4KSArIChyIHwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGVuIE11bHRpcGxpZXMgdGhlIGN1cnJlbnQgY29sb3IgYnkgdGhlIHNwZWNpZmllZCBjb2xvci5cclxuICAgICAqIEB6aCDlsIblvZPliY3popzoibLkuZjku6XkuI7mjIflrprpopzoibJcclxuICAgICAqIEBwYXJhbSBvdGhlciBUaGUgc3BlY2lmaWVkIGNvbG9yLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbXVsdGlwbHkgKG90aGVyOiBDb2xvcikge1xyXG4gICAgICAgIGNvbnN0IHIgPSAoKHRoaXMuX3ZhbCAmIDB4MDAwMDAwZmYpICogb3RoZXIucikgPj4gODtcclxuICAgICAgICBjb25zdCBnID0gKCh0aGlzLl92YWwgJiAweDAwMDBmZjAwKSAqIG90aGVyLmcpID4+IDg7XHJcbiAgICAgICAgY29uc3QgYiA9ICgodGhpcy5fdmFsICYgMHgwMGZmMDAwMCkgKiBvdGhlci5iKSA+PiA4O1xyXG4gICAgICAgIGNvbnN0IGEgPSAoKHRoaXMuX3ZhbCAmIDB4ZmYwMDAwMDApID4+PiA4KSAqIG90aGVyLmE7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gKGEgJiAweGZmMDAwMDAwKSB8IChiICYgMHgwMGZmMDAwMCkgfCAoZyAmIDB4MDAwMGZmMDApIHwgKHIgJiAweDAwMDAwMGZmKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX3NldF9yX3Vuc2FmZSAocmVkKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gKCh0aGlzLl92YWwgJiAweGZmZmZmZjAwKSB8IHJlZCkgPj4+IDA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIF9zZXRfZ191bnNhZmUgKGdyZWVuKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gKCh0aGlzLl92YWwgJiAweGZmZmYwMGZmKSB8IChncmVlbiA8PCA4KSkgPj4+IDA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIF9zZXRfYl91bnNhZmUgKGJsdWUpIHtcclxuICAgICAgICB0aGlzLl92YWwgPSAoKHRoaXMuX3ZhbCAmIDB4ZmYwMGZmZmYpIHwgKGJsdWUgPDwgMTYpKSA+Pj4gMDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX3NldF9hX3Vuc2FmZSAoYWxwaGEpIHtcclxuICAgICAgICB0aGlzLl92YWwgPSAoKHRoaXMuX3ZhbCAmIDB4MDBmZmZmZmYpIHwgKGFscGhhIDw8IDI0KSkgPj4+IDA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn0iXX0=