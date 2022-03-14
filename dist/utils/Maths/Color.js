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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvdXRpbHMvTWF0aHMvQ29sb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbUNBQXlDO0FBRXpDLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFFeEI7Ozs7O0dBS0c7QUFDSCxNQUFhLEtBQUs7SUEyUmQsWUFBYSxDQUEyQixFQUFFLENBQVUsRUFBRSxDQUFVLEVBQUUsQ0FBVTtRQTNCckUsU0FBSSxHQUFHLENBQUMsQ0FBQztRQTRCWixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25CO2FBQU0sSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbEM7YUFBTTtZQUNILElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBVSxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBdlJEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQTBCLENBQU07UUFDL0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDUixHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDckI7YUFBTTtZQUNILEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25FO1FBQ0Qs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LEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQTBCLEdBQVEsRUFBRSxDQUFNLEVBQUUsQ0FBTTtRQUNwRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUEwQixHQUFRLEVBQUUsQ0FBTSxFQUFFLENBQU07UUFDbEUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBMEIsR0FBUSxFQUFFLENBQU0sRUFBRSxDQUFTO1FBQ3BFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBMEIsR0FBUSxFQUFFLElBQVMsRUFBRSxFQUFPLEVBQUUsS0FBYTtRQUNuRixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDeEIsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEUsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQU8sR0FBUSxFQUFFLENBQWEsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUN4RCxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDM0IsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMzQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDM0IsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQTBCLEdBQUcsRUFBRSxHQUFRLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDbkUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUMzQixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDM0IsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUMzQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWSxDQUEwQixDQUFNLEVBQUUsQ0FBTTtRQUM5RCxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBMEIsQ0FBTSxFQUFFLENBQU0sRUFBRSxPQUFPLEdBQUcsZUFBTztRQUMzRSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFDN0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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LEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2pELFVBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDaEQsVUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNsRCxhQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JELFlBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29sb3JMaWtlIH0gZnJvbSBcIi4vdHlwZS1kZWZpbmVcIjtcbmltcG9ydCB7IEVQU0lMT04sIGNsYW1wIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgdG9GbG9hdCA9IDEgLyAyNTU7XG5cbi8qKlxuICogQGVuIFJlcHJlc2VudGF0aW9uIG9mIFJHQkEgY29sb3JzLjxici8+XG4gKiBFYWNoIGNvbG9yIGNvbXBvbmVudCBpcyBhbiBpbnRlZ2VyIHZhbHVlIHdpdGggYSByYW5nZSBmcm9tIDAgdG8gMjU1Ljxici8+XG4gKiBAemgg6YCa6L+HIFJlZOOAgUdyZWVu44CBQmx1ZSDpopzoibLpgJrpgZPooajnpLrpopzoibLvvIzlubbpgJrov4cgQWxwaGEg6YCa6YGT6KGo56S65LiN6YCP5piO5bqm44CCPGJyLz5cbiAqIOavj+S4qumAmumBk+mDveS4uuWPluWAvOiMg+WbtCBbMCwgMjU1XSDnmoTmlbTmlbDjgII8YnIvPlxuICovXG5leHBvcnQgY2xhc3MgQ29sb3Ige1xuICAgIHB1YmxpYyBzdGF0aWMgV0hJVEUgPSBPYmplY3QuZnJlZXplKG5ldyBDb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpKTtcbiAgICBwdWJsaWMgc3RhdGljIEdSQVkgPSBPYmplY3QuZnJlZXplKG5ldyBDb2xvcigxMjcsIDEyNywgMTI3LCAyNTUpKTtcbiAgICBwdWJsaWMgc3RhdGljIEJMQUNLID0gT2JqZWN0LmZyZWV6ZShuZXcgQ29sb3IoMCwgMCwgMCwgMjU1KSk7XG4gICAgcHVibGljIHN0YXRpYyBUUkFOU1BBUkVOVCA9IE9iamVjdC5mcmVlemUobmV3IENvbG9yKDAsIDAsIDAsIDApKTtcbiAgICBwdWJsaWMgc3RhdGljIFJFRCA9IE9iamVjdC5mcmVlemUobmV3IENvbG9yKDI1NSwgMCwgMCwgMjU1KSk7XG4gICAgcHVibGljIHN0YXRpYyBHUkVFTiA9IE9iamVjdC5mcmVlemUobmV3IENvbG9yKDAsIDI1NSwgMCwgMjU1KSk7XG4gICAgcHVibGljIHN0YXRpYyBCTFVFID0gT2JqZWN0LmZyZWV6ZShuZXcgQ29sb3IoMCwgMCwgMjU1LCAyNTUpKTtcbiAgICBwdWJsaWMgc3RhdGljIENZQU4gPSBPYmplY3QuZnJlZXplKG5ldyBDb2xvcigwLCAyNTUsIDI1NSwgMjU1KSk7XG4gICAgcHVibGljIHN0YXRpYyBNQUdFTlRBID0gT2JqZWN0LmZyZWV6ZShuZXcgQ29sb3IoMjU1LCAwLCAyNTUsIDI1NSkpO1xuICAgIHB1YmxpYyBzdGF0aWMgWUVMTE9XID0gT2JqZWN0LmZyZWV6ZShuZXcgQ29sb3IoMjU1LCAyNTUsIDAsIDI1NSkpO1xuXG4gICAgLyoqXG4gICAgICogQGVuIENvcHkgY29udGVudCBvZiBhIGNvbG9yIGludG8gYW5vdGhlciBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgY29sb3IuXG4gICAgICogQHpoIOiOt+W+l+aMh+WumuminOiJsueahOaLt+i0nVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2xvbmU8T3V0IGV4dGVuZHMgSUNvbG9yTGlrZT4gKGE6IE91dCkge1xuICAgICAgICBjb25zdCBvdXQgPSBuZXcgQ29sb3IoKTtcbiAgICAgICAgaWYgKGEuX3ZhbCkge1xuICAgICAgICAgICAgb3V0Ll92YWwgPSBhLl92YWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQuX3ZhbCA9ICgoYS5hIDw8IDI0KSA+Pj4gMCkgKyAoYS5iIDw8IDE2KSArIChhLmcgPDwgOCkgKyBhLnI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ2xvbmUgYSBjb2xvciBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgY29sb3IuXG4gICAgICogQHpoIOWkjeWItuebruagh+minOiJslxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29weTxPdXQgZXh0ZW5kcyBJQ29sb3JMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBvdXQuciA9IGEucjtcbiAgICAgICAgb3V0LmcgPSBhLmc7XG4gICAgICAgIG91dC5iID0gYS5iO1xuICAgICAgICBvdXQuYSA9IGEuYTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgY29sb3IgdG8gdGhlIGdpdmVuIHZhbHVlcyBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgY29sb3IuXG4gICAgICogQHpoIOiuvue9ruminOiJsuWAvFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2V0PE91dCBleHRlbmRzIElDb2xvckxpa2U+IChvdXQ6IE91dCwgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgYTogbnVtYmVyKSB7XG4gICAgICAgIG91dC5yID0gcjtcbiAgICAgICAgb3V0LmcgPSBnO1xuICAgICAgICBvdXQuYiA9IGI7XG4gICAgICAgIG91dC5hID0gYTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ29udmVydHMgdGhlIGhleGFkZWNpbWFsIGZvcm1hbCBjb2xvciBpbnRvIHJnYiBmb3JtYWwgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IGNvbG9yLlxuICAgICAqIEB6aCDku47ljYHlha3ov5vliLbpopzoibLlrZfnrKbkuLLkuK3or7vlhaXpopzoibLliLAgb3V0IOS4rVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZnJvbUhFWDxPdXQgZXh0ZW5kcyBJQ29sb3JMaWtlPiAob3V0OiBPdXQsIGhleFN0cmluZzogc3RyaW5nKSB7XG4gICAgICAgIGhleFN0cmluZyA9IChoZXhTdHJpbmcuaW5kZXhPZignIycpID09PSAwKSA/IGhleFN0cmluZy5zdWJzdHJpbmcoMSkgOiBoZXhTdHJpbmc7XG4gICAgICAgIG91dC5yID0gcGFyc2VJbnQoaGV4U3RyaW5nLnN1YnN0cigwLCAyKSwgMTYpIHx8IDA7XG4gICAgICAgIG91dC5nID0gcGFyc2VJbnQoaGV4U3RyaW5nLnN1YnN0cigyLCAyKSwgMTYpIHx8IDA7XG4gICAgICAgIG91dC5iID0gcGFyc2VJbnQoaGV4U3RyaW5nLnN1YnN0cig0LCAyKSwgMTYpIHx8IDA7XG4gICAgICAgIG91dC5hID0gcGFyc2VJbnQoaGV4U3RyaW5nLnN1YnN0cig2LCAyKSwgMTYpIHx8IDI1NTtcbiAgICAgICAgb3V0Ll92YWwgPSAoKG91dC5hIDw8IDI0KSA+Pj4gMCkgKyAob3V0LmIgPDwgMTYpICsgKG91dC5nIDw8IDgpICsgb3V0LnI7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEFkZCB0d28gY29sb3JzIGJ5IGNvbXBvbmVudHMuIEFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBjb2xvci5cbiAgICAgKiBAemgg6YCQ6YCa6YGT6aKc6Imy5Yqg5rOVXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGQ8T3V0IGV4dGVuZHMgSUNvbG9yTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBvdXQuciA9IGEuciArIGIucjtcbiAgICAgICAgb3V0LmcgPSBhLmcgKyBiLmc7XG4gICAgICAgIG91dC5iID0gYS5iICsgYi5iO1xuICAgICAgICBvdXQuYSA9IGEuYSArIGIuYTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU3VidHJhY3QgZWFjaCBjb21wb25lbnRzIG9mIGNvbG9yIGIgZnJvbSBlYWNoIGNvbXBvbmVudHMgb2YgY29sb3IgYS4gQW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IGNvbG9yLlxuICAgICAqIEB6aCDpgJDpgJrpgZPpopzoibLlh4/ms5VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHN1YnRyYWN0PE91dCBleHRlbmRzIElDb2xvckxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgb3V0LnIgPSBhLnIgLSBiLnI7XG4gICAgICAgIG91dC5nID0gYS5nIC0gYi5nO1xuICAgICAgICBvdXQuYiA9IGEuYiAtIGIuYjtcbiAgICAgICAgb3V0LmEgPSBhLmEgLSBiLmE7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIE11bHRpcGx5IGVhY2ggY29tcG9uZW50cyBvZiB0d28gY29sb3JzLiBBbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgY29sb3IuXG4gICAgICogQHpoIOmAkOmAmumBk+minOiJsuS5mOazlVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbXVsdGlwbHk8T3V0IGV4dGVuZHMgSUNvbG9yTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBvdXQuciA9IGEuciAqIGIucjtcbiAgICAgICAgb3V0LmcgPSBhLmcgKiBiLmc7XG4gICAgICAgIG91dC5iID0gYS5iICogYi5iO1xuICAgICAgICBvdXQuYSA9IGEuYSAqIGIuYTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gRGl2aWRlIGVhY2ggY29tcG9uZW50cyBvZiBjb2xvciBhIGJ5IGVhY2ggY29tcG9uZW50cyBvZiBjb2xvciBiLiBBbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgY29sb3IuXG4gICAgICogQHpoIOmAkOmAmumBk+minOiJsumZpOazlVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZGl2aWRlPE91dCBleHRlbmRzIElDb2xvckxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgb3V0LnIgPSBhLnIgLyBiLnI7XG4gICAgICAgIG91dC5nID0gYS5nIC8gYi5nO1xuICAgICAgICBvdXQuYiA9IGEuYiAvIGIuYjtcbiAgICAgICAgb3V0LmEgPSBhLmEgLyBiLmE7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIE11bHRpcGx5IGFsbCBjaGFubmVscyBpbiBhIGNvbG9yIHdpdGggdGhlIGdpdmVuIHNjYWxlIGZhY3RvciwgYW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IGNvbG9yLlxuICAgICAqIEB6aCDlhajpgJrpgZPnu5/kuIDnvKnmlL7popzoibJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNjYWxlPE91dCBleHRlbmRzIElDb2xvckxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBudW1iZXIpIHtcbiAgICAgICAgb3V0LnIgPSBhLnIgKiBiO1xuICAgICAgICBvdXQuZyA9IGEuZyAqIGI7XG4gICAgICAgIG91dC5iID0gYS5iICogYjtcbiAgICAgICAgb3V0LmEgPSBhLmEgKiBiO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIGNvbG9ycy5cbiAgICAgKiBAemgg6YCQ6YCa6YGT6aKc6Imy57q/5oCn5o+S5YC877yaQSArIHQgKiAoQiAtIEEpXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBsZXJwPE91dCBleHRlbmRzIElDb2xvckxpa2U+IChvdXQ6IE91dCwgZnJvbTogT3V0LCB0bzogT3V0LCByYXRpbzogbnVtYmVyKSB7XG4gICAgICAgIGxldCByID0gZnJvbS5yO1xuICAgICAgICBsZXQgZyA9IGZyb20uZztcbiAgICAgICAgbGV0IGIgPSBmcm9tLmI7XG4gICAgICAgIGxldCBhID0gZnJvbS5hO1xuICAgICAgICByICs9ICh0by5yIC0gcikgKiByYXRpbztcbiAgICAgICAgZyArPSAodG8uZyAtIGcpICogcmF0aW87XG4gICAgICAgIGIgKz0gKHRvLmIgLSBiKSAqIHJhdGlvO1xuICAgICAgICBhICs9ICh0by5hIC0gYSkgKiByYXRpbztcbiAgICAgICAgb3V0Ll92YWwgPSBNYXRoLmZsb29yKCgoYSA8PCAyNCkgPj4+IDApICsgKGIgPDwgMTYpICsgKGcgPDwgOCkgKyByKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ29udmVydCBhIGNvbG9yIG9iamVjdCB0byBhIFJHQkEgYXJyYXksIGFuZCBzYXZlIHRoZSByZXN1bHRzIHRvIG91dCBjb2xvci5cbiAgICAgKiBAemgg6aKc6Imy6L2s5pWw57uEXG4gICAgICogQHBhcmFtIG9mcyBBcnJheSBTdGFydCBPZmZzZXRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRvQXJyYXk8T3V0PiAob3V0OiBPdXQsIGE6IElDb2xvckxpa2UsIG9mcyA9IDApIHtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSAoYSBpbnN0YW5jZW9mIENvbG9yIHx8IGEuYSA+IDEpID8gMSAvIDI1NSA6IDE7XG4gICAgICAgIG91dFtvZnMgKyAwXSA9IGEuciAqIHNjYWxlO1xuICAgICAgICBvdXRbb2ZzICsgMV0gPSBhLmcgKiBzY2FsZTtcbiAgICAgICAgb3V0W29mcyArIDJdID0gYS5iICogc2NhbGU7XG4gICAgICAgIG91dFtvZnMgKyAzXSA9IGEuYSAqIHNjYWxlO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBTZXRzIHRoZSBnaXZlbiBjb2xvciB3aXRoIFJHQkEgdmFsdWVzIGluIGFuIGFycmF5LCBhbmQgc2F2ZSB0aGUgcmVzdWx0cyB0byBvdXQgY29sb3IuXG4gICAgICogQHpoIOaVsOe7hOi9rOminOiJslxuICAgICAqIEBwYXJhbSBvZnMgQXJyYXkgU3RhcnQgT2Zmc2V0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmcm9tQXJyYXk8T3V0IGV4dGVuZHMgSUNvbG9yTGlrZT4gKGFyciwgb3V0OiBPdXQsIG9mcyA9IDApIHtcbiAgICAgICAgb3V0LnIgPSBhcnJbb2ZzICsgMF0gKiAyNTU7XG4gICAgICAgIG91dC5nID0gYXJyW29mcyArIDFdICogMjU1O1xuICAgICAgICBvdXQuYiA9IGFycltvZnMgKyAyXSAqIDI1NTtcbiAgICAgICAgb3V0LmEgPSBhcnJbb2ZzICsgM10gKiAyNTU7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENoZWNrIHdoZXRoZXIgdGhlIHR3byBnaXZlbiBjb2xvcnMgYXJlIGlkZW50aWNhbFxuICAgICAqIEB6aCDpopzoibLnrYnku7fliKTmlq1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHN0cmljdEVxdWFsczxPdXQgZXh0ZW5kcyBJQ29sb3JMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgcmV0dXJuIGEuciA9PT0gYi5yICYmIGEuZyA9PT0gYi5nICYmIGEuYiA9PT0gYi5iICYmIGEuYSA9PT0gYi5hO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDaGVjayB3aGV0aGVyIHRoZSB0d28gZ2l2ZW4gY29sb3JzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWl2YWxlbnQuIERpZmZlcmVuY2Ugb2YgZWFjaCBjaGFubmVsIGlzIHNtYWxsZXIgdGhhdCB0aGUgZXBzaWxvbi5cbiAgICAgKiBAemgg5o6S6Zmk5rWu54K55pWw6K+v5beu55qE6aKc6Imy6L+R5Ly8562J5Lu35Yik5patXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBlcXVhbHM8T3V0IGV4dGVuZHMgSUNvbG9yTGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uID0gRVBTSUxPTikge1xuICAgICAgICByZXR1cm4gKE1hdGguYWJzKGEuciAtIGIucikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5yKSwgTWF0aC5hYnMoYi5yKSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEuZyAtIGIuZykgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5nKSwgTWF0aC5hYnMoYi5nKSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEuYiAtIGIuYikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5iKSwgTWF0aC5hYnMoYi5iKSlcbiAgICAgICAgICAgICYmIE1hdGguYWJzKGEuYSAtIGIuYSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS5hKSwgTWF0aC5hYnMoYi5hKSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDb252ZXJ0IHRoZSBnaXZlbiBjb2xvciB0byBhIGhleCBjb2xvciB2YWx1ZS4gQW5kIHNhdmUgdGhlIHJlc3VsdHMgdG8gb3V0IGNvbG9yLlxuICAgICAqIEB6aCDojrflj5bmjIflrprpopzoibLnmoTmlbTlnovmlbDmja7ooajnpLpcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGhleDxPdXQgZXh0ZW5kcyBJQ29sb3JMaWtlPiAoYTogT3V0KSB7XG4gICAgICAgIHJldHVybiAoKGEuciAqIDI1NSkgPDwgMjQgfCAoYS5nICogMjU1KSA8PCAxNiB8IChhLmIgKiAyNTUpIDw8IDggfCBhLmEgKiAyNTUpID4+PiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBHZXQgb3Igc2V0IHJlZCBjaGFubmVsIHZhbHVlLlxuICAgICAqIEB6aCDojrflj5bmiJborr7nva7lvZPliY3popzoibLnmoQgUmVkIOmAmumBk+OAglxuICAgICAqL1xuICAgIGdldCByICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbCAmIDB4MDAwMDAwZmY7XG4gICAgfVxuXG4gICAgc2V0IHIgKHJlZCkge1xuICAgICAgICByZWQgPSB+fmNsYW1wKHJlZCwgMCwgMjU1KTtcbiAgICAgICAgdGhpcy5fdmFsID0gKCh0aGlzLl92YWwgJiAweGZmZmZmZjAwKSB8IHJlZCkgPj4+IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIEdldCBvciBzZXQgZ3JlZW4gY2hhbm5lbCB2YWx1ZS5cbiAgICAgKiBAemgg6I635Y+W5oiW6K6+572u5b2T5YmN6aKc6Imy55qEIEdyZWVuIOmAmumBk+OAglxuICAgICAqL1xuICAgIGdldCBnICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl92YWwgJiAweDAwMDBmZjAwKSA+PiA4O1xuICAgIH1cblxuICAgIHNldCBnIChncmVlbikge1xuICAgICAgICBncmVlbiA9IH5+Y2xhbXAoZ3JlZW4sIDAsIDI1NSk7XG4gICAgICAgIHRoaXMuX3ZhbCA9ICgodGhpcy5fdmFsICYgMHhmZmZmMDBmZikgfCAoZ3JlZW4gPDwgOCkpID4+PiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBHZXQgb3Igc2V0IGJsdWUgY2hhbm5lbCB2YWx1ZS5cbiAgICAgKiBAemgg6I635Y+W5oiW6K6+572u5b2T5YmN6aKc6Imy55qEIEJsdWUg6YCa6YGT44CCXG4gICAgICovXG4gICAgZ2V0IGIgKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuX3ZhbCAmIDB4MDBmZjAwMDApID4+IDE2O1xuICAgIH1cblxuICAgIHNldCBiIChibHVlKSB7XG4gICAgICAgIGJsdWUgPSB+fmNsYW1wKGJsdWUsIDAsIDI1NSk7XG4gICAgICAgIHRoaXMuX3ZhbCA9ICgodGhpcy5fdmFsICYgMHhmZjAwZmZmZikgfCAoYmx1ZSA8PCAxNikpID4+PiAwO1xuICAgIH1cblxuICAgIC8qKiBAZW4gR2V0IG9yIHNldCBhbHBoYSBjaGFubmVsIHZhbHVlLlxuICAgICAqIEB6aCDojrflj5bmiJborr7nva7lvZPliY3popzoibLnmoTpgI/mmI7luqbpgJrpgZPjgIJcbiAgICAgKi9cbiAgICBnZXQgYSAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5fdmFsICYgMHhmZjAwMDAwMCkgPj4+IDI0O1xuICAgIH1cblxuICAgIHNldCBhIChhbHBoYSkge1xuICAgICAgICBhbHBoYSA9IH5+Y2xhbXAoYWxwaGEsIDAsIDI1NSk7XG4gICAgICAgIHRoaXMuX3ZhbCA9ICgodGhpcy5fdmFsICYgMHgwMGZmZmZmZikgfCAoYWxwaGEgPDwgMjQpKSA+Pj4gMDtcbiAgICB9XG5cbiAgICAvLyBjb21wYXRpYmlsaXR5IHdpdGggdmVjdG9yIGludGVyZmFjZXNcbiAgICBnZXQgeCAoKSB7IHJldHVybiB0aGlzLnIgKiB0b0Zsb2F0OyB9XG4gICAgc2V0IHggKHZhbHVlKSB7IHRoaXMuciA9IHZhbHVlICogMjU1OyB9XG4gICAgZ2V0IHkgKCkgeyByZXR1cm4gdGhpcy5nICogdG9GbG9hdDsgfVxuICAgIHNldCB5ICh2YWx1ZSkgeyB0aGlzLmcgPSB2YWx1ZSAqIDI1NTsgfVxuICAgIGdldCB6ICgpIHsgcmV0dXJuIHRoaXMuYiAqIHRvRmxvYXQ7IH1cbiAgICBzZXQgeiAodmFsdWUpIHsgdGhpcy5iID0gdmFsdWUgKiAyNTU7IH1cbiAgICBnZXQgdyAoKSB7IHJldHVybiB0aGlzLmEgKiB0b0Zsb2F0OyB9XG4gICAgc2V0IHcgKHZhbHVlKSB7IHRoaXMuYSA9IHZhbHVlICogMjU1OyB9XG5cbiAgICBwdWJsaWMgX3ZhbCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ29uc3RydWN0IGEgc2FtZSBjb2xvciBmcm9tIHRoZSBnaXZlbiBjb2xvclxuICAgICAqIEB6aCDmnoTpgKDkuI7mjIflrprpopzoibLnm7jnrYnnmoTpopzoibLjgIJcbiAgICAgKiBAcGFyYW0gb3RoZXIgU3BlY2lmaWVkIGNvbG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IgKG90aGVyOiBDb2xvcik7XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ29uc3RydWN0IGEgY29sb3IgZm9ybSB0aGUgaGV4IGNvbG9yIHN0cmluZ1xuICAgICAqIEB6aCDnlKjljYHlha3ov5vliLbpopzoibLlrZfnrKbkuLLkuK3mnoTpgKDpopzoibLjgIJcbiAgICAgKiBAcGFyYW0gaGV4U3RyaW5nIEhleGFkZWNpbWFsIGNvbG9yIHN0cmluZy5cbiAgICAgKi9cblxuICAgIGNvbnN0cnVjdG9yIChoZXhTdHJpbmc6IHN0cmluZyk7XG5cbiAgICAvKipcbiAgICAgKiBAZW4gQ29uc3RydWN0IGEgY29sb3JcbiAgICAgKiBAemgg5p6E6YCg5YW35pyJ5oyH5a6a6YCa6YGT55qE6aKc6Imy44CCXG4gICAgICogQHBhcmFtIHIgcmVkIGNvbXBvbmVudCBvZiB0aGUgY29sb3IsIGRlZmF1bHQgdmFsdWUgaXMgMC5cbiAgICAgKiBAcGFyYW0gZyBncmVlbiBjb21wb25lbnQgb2YgdGhlIGNvbG9yLCBkZWZhdWx0IHZhbHVlIGlzIDAuXG4gICAgICogQHBhcmFtIGIgYmx1ZSBjb21wb25lbnQgb2YgdGhlIGNvbG9yLCBkZWZhdWx0IHZhbHVlIGlzIDAuXG4gICAgICogQHBhcmFtIGEgYWxwaGEgY29tcG9uZW50IG9mIHRoZSBjb2xvciwgZGVmYXVsdCB2YWx1ZSBpcyAyNTUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IgKHI/OiBudW1iZXIsIGc/OiBudW1iZXIsIGI/OiBudW1iZXIsIGE/OiBudW1iZXIpO1xuXG4gICAgY29uc3RydWN0b3IgKHI/OiBudW1iZXIgfCBDb2xvciB8IHN0cmluZywgZz86IG51bWJlciwgYj86IG51bWJlciwgYT86IG51bWJlcikge1xuICAgICAgICBpZiAodHlwZW9mIHIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmZyb21IRVgocik7XG4gICAgICAgIH0gZWxzZSBpZiAoZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldChyIGFzIG51bWJlciwgZywgYiwgYSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldChyIGFzIENvbG9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDbG9uZSBhIG5ldyBjb2xvciBmcm9tIHRoZSBjdXJyZW50IGNvbG9yLlxuICAgICAqIEB6aCDlhYvpmoblvZPliY3popzoibLjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgY2xvbmUgKCkge1xuICAgICAgICBjb25zdCByZXQgPSBuZXcgQ29sb3IoKTtcbiAgICAgICAgcmV0Ll92YWwgPSB0aGlzLl92YWw7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENoZWNrIHdoZXRoZXIgdGhlIGN1cnJlbnQgY29sb3IgaXMgaWRlbnRpY2FsIHdpdGggdGhlIGdpdmVuIGNvbG9yXG4gICAgICogQHpoIOWIpOaWreW9k+WJjeminOiJsuaYr+WQpuS4juaMh+WumuminOiJsuebuOetieOAglxuICAgICAqIEBwYXJhbSBvdGhlciBTcGVjaWZpZWQgY29sb3JcbiAgICAgKiBAcmV0dXJucyBSZXR1cm5zIGB0cnVlYCB3aGVuIGFsbCBjaGFubmVscyBvZiBib3RoIGNvbG91cnMgYXJlIGVxdWFsOyBvdGhlcndpc2UgcmV0dXJucyBgZmFsc2VgLlxuICAgICAqL1xuICAgIHB1YmxpYyBlcXVhbHMgKG90aGVyOiBDb2xvcikge1xuICAgICAgICByZXR1cm4gb3RoZXIgJiYgdGhpcy5fdmFsID09PSBvdGhlci5fdmFsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDYWxjdWxhdGUgbGluZWFyIGludGVycG9sYXRpb24gcmVzdWx0IGJldHdlZW4gdGhpcyBjb2xvciBhbmQgYW5vdGhlciBvbmUgd2l0aCBnaXZlbiByYXRpb+OAglxuICAgICAqIEB6aCDmoLnmja7mjIflrprnmoTmj5LlgLzmr5TnjofvvIzku47lvZPliY3popzoibLliLDnm67moIfpopzoibLkuYvpl7TlgZrmj5LlgLzjgIJcbiAgICAgKiBAcGFyYW0gdG8gVGFyZ2V0IGNvbG9yXG4gICAgICogQHBhcmFtIHJhdGlvIFRoZSBpbnRlcnBvbGF0aW9uIGNvZWZmaWNpZW50LlRoZSByYW5nZSBpcyBbMCwxXS5cbiAgICAgKi9cbiAgICBwdWJsaWMgbGVycCAodG86IENvbG9yLCByYXRpbzogbnVtYmVyKSB7XG4gICAgICAgIGxldCByID0gdGhpcy5yO1xuICAgICAgICBsZXQgZyA9IHRoaXMuZztcbiAgICAgICAgbGV0IGIgPSB0aGlzLmI7XG4gICAgICAgIGxldCBhID0gdGhpcy5hO1xuICAgICAgICByICs9ICh0by5yIC0gcikgKiByYXRpbztcbiAgICAgICAgZyArPSAodG8uZyAtIGcpICogcmF0aW87XG4gICAgICAgIGIgKz0gKHRvLmIgLSBiKSAqIHJhdGlvO1xuICAgICAgICBhICs9ICh0by5hIC0gYSkgKiByYXRpbztcbiAgICAgICAgdGhpcy5fdmFsID0gTWF0aC5mbG9vcigoKGEgPDwgMjQpID4+PiAwKSArIChiIDw8IDE2KSArIChnIDw8IDgpICsgcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBDb252ZXJ0IHRvIHN0cmluZyB3aXRoIGNvbG9yIGluZm9ybWF0aW9uc1xuICAgICAqIEB6aCDov5Tlm57lvZPliY3popzoibLnmoTlrZfnrKbkuLLooajnpLrjgIJcbiAgICAgKiBAcmV0dXJucyBBIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgY3VycmVudCBjb2xvci5cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9TdHJpbmcgKCkge1xuICAgICAgICByZXR1cm4gYHJnYmEoJHtcbiAgICAgICAgICAgIHRoaXMuci50b0ZpeGVkKCl9LCAke1xuICAgICAgICAgICAgdGhpcy5nLnRvRml4ZWQoKX0sICR7XG4gICAgICAgICAgICB0aGlzLmIudG9GaXhlZCgpfSwgJHtcbiAgICAgICAgICAgIHRoaXMuYS50b0ZpeGVkKCl9KWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENvbnZlcnQgY29sb3IgdG8gY3NzIGZvcm1hdC5cbiAgICAgKiBAemgg5bCG5b2T5YmN6aKc6Imy6L2s5o2i5Li6IENTUyDmoLzlvI/jgIJcbiAgICAgKiBAcGFyYW0gb3B0IFwicmdiYVwiLCBcInJnYlwiLCBcIiNyZ2JcIiBvciBcIiNycmdnYmJcIi5cbiAgICAgKiBAcmV0dXJucyBDU1MgZm9ybWF0IGZvciB0aGUgY3VycmVudCBjb2xvci5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYHRzXG4gICAgICogbGV0IGNvbG9yID0gY2MuQ29sb3IuQkxBQ0s7XG4gICAgICogY29sb3IudG9DU1MoKTsgICAgICAgICAgLy8gXCJyZ2JhKDAsMCwwLDEuMDApXCI7XG4gICAgICogY29sb3IudG9DU1MoXCJyZ2JhXCIpOyAgICAvLyBcInJnYmEoMCwwLDAsMS4wMClcIjtcbiAgICAgKiBjb2xvci50b0NTUyhcInJnYlwiKTsgICAgIC8vIFwicmdiYSgwLDAsMClcIjtcbiAgICAgKiBjb2xvci50b0NTUyhcIiNyZ2JcIik7ICAgIC8vIFwiIzAwMFwiO1xuICAgICAqIGNvbG9yLnRvQ1NTKFwiI3JyZ2diYlwiKTsgLy8gXCIjMDAwMDAwXCI7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgcHVibGljIHRvQ1NTIChvcHQ6ICgncmdiYScgfCAncmdiJyB8ICcjcnJnZ2JiJyB8ICcjcnJnZ2JiYWEnKSA9ICdyZ2JhJykge1xuICAgICAgICBpZiAob3B0ID09PSAncmdiYScpIHtcbiAgICAgICAgICAgIHJldHVybiBgcmdiYSgke1xuICAgICAgICAgICAgICAgIHRoaXMucn0sJHtcbiAgICAgICAgICAgICAgICB0aGlzLmd9LCR7XG4gICAgICAgICAgICAgICAgdGhpcy5ifSwke1xuICAgICAgICAgICAgICAgICh0aGlzLmEgKiB0b0Zsb2F0KS50b0ZpeGVkKDIpfSlgO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdCA9PT0gJ3JnYicpIHtcbiAgICAgICAgICAgIHJldHVybiBgcmdiKCR7XG4gICAgICAgICAgICAgICAgdGhpcy5yfSwke1xuICAgICAgICAgICAgICAgIHRoaXMuZ30sJHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ9KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYCMke3RoaXMudG9IRVgob3B0KX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIFJlYWQgaGV4IHN0cmluZyBhbmQgc3RvcmUgY29sb3IgZGF0YSBpbnRvIHRoZSBjdXJyZW50IGNvbG9yIG9iamVjdCwgdGhlIGhleCBzdHJpbmcgbXVzdCBiZSBmb3JtYXR0ZWQgYXMgcmdiYSBvciByZ2IuXG4gICAgICogQHpoIOS7juWNgeWFrei/m+WItuminOiJsuWtl+espuS4suS4reivu+WFpeW9k+WJjeminOiJsuOAgjxici8+XG4gICAgICog5Y2B5YWt6L+b5Yi26aKc6Imy5a2X56ym5Liy5bqU6K+l5Lul5Y+v6YCJ55qEIFwiI1wiIOW8gOWktO+8jOe0p+i3n+acgOWkmiA4IOS4quS7o+ihqOWNgeWFrei/m+WItuaVsOWtl+eahOWtl+espu+8mzxici8+XG4gICAgICog5q+P5Lik5Liq6L+e57ut5a2X56ym5Luj6KGo55qE5pWw5YC85L6d5qyh5L2c5Li6IFJlZOOAgUdyZWVu44CBQmx1ZSDlkowgQWxwaGEg6YCa6YGT77ybPGJyLz5cbiAgICAgKiDnvLrnnIHnmoTpopzoibLpgJrpgZPlsIbop4bkuLogMO+8m+e8uuecgeeahOmAj+aYjumAmumBk+WwhuinhuS4uiAyNTXjgII8YnIvPlxuICAgICAqIEBwYXJhbSBoZXhTdHJpbmcgdGhlIGhleCBzdHJpbmdcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBwdWJsaWMgZnJvbUhFWCAoaGV4U3RyaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgaGV4U3RyaW5nID0gKGhleFN0cmluZy5pbmRleE9mKCcjJykgPT09IDApID8gaGV4U3RyaW5nLnN1YnN0cmluZygxKSA6IGhleFN0cmluZztcbiAgICAgICAgY29uc3QgciA9IHBhcnNlSW50KGhleFN0cmluZy5zdWJzdHIoMCwgMiksIDE2KSB8fCAwO1xuICAgICAgICBjb25zdCBnID0gcGFyc2VJbnQoaGV4U3RyaW5nLnN1YnN0cigyLCAyKSwgMTYpIHx8IDA7XG4gICAgICAgIGNvbnN0IGIgPSBwYXJzZUludChoZXhTdHJpbmcuc3Vic3RyKDQsIDIpLCAxNikgfHwgMDtcbiAgICAgICAgY29uc3QgYSA9IHBhcnNlSW50KGhleFN0cmluZy5zdWJzdHIoNiwgMiksIDE2KSB8fCAyNTU7XG4gICAgICAgIHRoaXMuX3ZhbCA9ICgoYSA8PCAyNCkgPj4+IDApICsgKGIgPDwgMTYpICsgKGcgPDwgOCkgKyAociB8IDApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gY29udmVydCBDb2xvciB0byBIRVggY29sb3Igc3RyaW5nLlxuICAgICAqIEB6aCDovazmjaLlvZPliY3popzoibLkuLrljYHlha3ov5vliLbpopzoibLlrZfnrKbkuLLjgIJcbiAgICAgKiBAcGFyYW0gZm10IFwiI3JyZ2diYlwiIG9yIFwiI3JyZ2diYmFhXCIuXG4gICAgICogLSBgJyNycmdnYmJhYSdgIG9idGFpbnMgdGhlIGhleGFkZWNpbWFsIHZhbHVlIG9mIHRoZSBSZWQsIEdyZWVuLCBCbHVlLCBBbHBoYSBjaGFubmVscyAoKip0d28qKiwgaGlnaCBjb21wbGVtZW50IDApIGFuZCBjb25uZWN0cyB0aGVtIHNlcXVlbnRpYWxseS5cbiAgICAgKiAtIGAnI3JyZ2diYidgIGlzIHNpbWlsYXIgdG8gYCcjcnJnZ2JiYWEnYCBidXQgZG9lcyBub3QgaW5jbHVkZSB0aGUgQWxwaGEgY2hhbm5lbC5cbiAgICAgKiBAcmV0dXJucyB0aGUgSGV4IGNvbG9yIHN0cmluZ1xuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgXG4gICAgICogY29uc3QgY29sb3IgPSBuZXcgQ29sb3IoMjU1LCAxNCwgMCwgMjU1KTtcbiAgICAgKiBjb2xvci50b0hFWChcIiNyZ2JcIik7ICAgICAgLy8gXCJmMDBcIjtcbiAgICAgKiBjb2xvci50b0hFWChcIiNycmdnYmJhYVwiKTsgLy8gXCJmZjBlMDBcIlxuICAgICAqIGNvbG9yLnRvSEVYKFwiI3JyZ2diYlwiKTsgICAvLyBcImZmMGUwMGZmXCJcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBwdWJsaWMgdG9IRVggKGZtdDogJyNyZ2InIHwgJyNycmdnYmInIHwgJyNycmdnYmJhYScgPSAnI3JyZ2diYicpIHtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gJzAnO1xuICAgICAgICAvLyAjcnJnZ2JiXG4gICAgICAgIGNvbnN0IGhleCA9IFtcbiAgICAgICAgICAgICh0aGlzLnIgPCAxNiA/IHByZWZpeCA6ICcnKSArICh0aGlzLnIpLnRvU3RyaW5nKDE2KSxcbiAgICAgICAgICAgICh0aGlzLmcgPCAxNiA/IHByZWZpeCA6ICcnKSArICh0aGlzLmcpLnRvU3RyaW5nKDE2KSxcbiAgICAgICAgICAgICh0aGlzLmIgPCAxNiA/IHByZWZpeCA6ICcnKSArICh0aGlzLmIpLnRvU3RyaW5nKDE2KSxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgaSA9IC0xO1xuICAgICAgICBpZiAoZm10ID09PSAnI3JnYicpIHtcbiAgICAgICAgICAgIGhleFswXSA9IGhleFswXVswXTtcbiAgICAgICAgICAgIGhleFsxXSA9IGhleFsxXVswXTtcbiAgICAgICAgICAgIGhleFsyXSA9IGhleFsyXVswXTtcbiAgICAgICAgfSBlbHNlIGlmIChmbXQgPT09ICcjcnJnZ2JiYWEnKSB7XG4gICAgICAgICAgICBoZXgucHVzaCgodGhpcy5hIDwgMTYgPyBwcmVmaXggOiAnJykgKyAodGhpcy5hKS50b1N0cmluZygxNikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZXguam9pbignJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIENvbnZlcnQgdG8gcmdiIHZhbHVlLlxuICAgICAqIEB6aCDlsIblvZPliY3popzoibLovazmjaLkuLogUkdCIOaVtOaVsOWAvOOAglxuICAgICAqIEByZXR1cm5zIFJHQiBpbnRlZ2VyIHZhbHVlLiBTdGFydGluZyBmcm9tIHRoZSBsb3dlc3QgdmFsaWQgYml0LCBlYWNoIDggYml0cyBpcyB0aGUgdmFsdWUgb2YgdGhlIFJlZCwgR3JlZW4sIGFuZCBCbHVlIGNoYW5uZWxzIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYFxuICAgICAqIGNvbnN0IGNvbG9yID0gQ29sb3IuWUVMTE9XO1xuICAgICAqIGNvbG9yLnRvUkdCVmFsdWUoKTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBwdWJsaWMgdG9SR0JWYWx1ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWwgJiAweDAwZmZmZmZmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBSZWFkIEhTViBtb2RlbCBjb2xvciBhbmQgY29udmVydCB0byBSR0IgY29sb3IuXG4gICAgICogQHpoIOS7jiBIU1Yg6aKc6Imy5Lit6K+75YWl5b2T5YmN6aKc6Imy44CCXG4gICAgICogQHBhcmFtIGggSCB2YWx1ZeOAglxuICAgICAqIEBwYXJhbSBzIFMgdmFsdWXjgIJcbiAgICAgKiBAcGFyYW0gdiBWIHZhbHVl44CCXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBcbiAgICAgKiBjb25zdCBjb2xvciA9IENvbG9yLllFTExPVztcbiAgICAgKiBjb2xvci5mcm9tSFNWKDAsIDAsIDEpOyAvLyBDb2xvciB7cjogMjU1LCBnOiAyNTUsIGI6IDI1NSwgYTogMjU1fTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBwdWJsaWMgZnJvbUhTViAoaDogbnVtYmVyLCBzOiBudW1iZXIsIHY6IG51bWJlcikge1xuICAgICAgICBsZXQgciA9IDA7XG4gICAgICAgIGxldCBnID0gMDtcbiAgICAgICAgbGV0IGIgPSAwO1xuICAgICAgICBpZiAocyA9PT0gMCkge1xuICAgICAgICAgICAgciA9IGcgPSBiID0gdjtcbiAgICAgICAgfSBlbHNlIGlmICh2ID09PSAwKSB7XG4gICAgICAgICAgICByID0gZyA9IGIgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGggPT09IDEpIHsgaCA9IDA7IH1cbiAgICAgICAgICAgIGggKj0gNjtcbiAgICAgICAgICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKGgpO1xuICAgICAgICAgICAgY29uc3QgZiA9IGggLSBpO1xuICAgICAgICAgICAgY29uc3QgcCA9IHYgKiAoMSAtIHMpO1xuICAgICAgICAgICAgY29uc3QgcSA9IHYgKiAoMSAtIChzICogZikpO1xuICAgICAgICAgICAgY29uc3QgdCA9IHYgKiAoMSAtIChzICogKDEgLSBmKSkpO1xuICAgICAgICAgICAgc3dpdGNoIChpKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgciA9IHY7XG4gICAgICAgICAgICAgICAgZyA9IHQ7XG4gICAgICAgICAgICAgICAgYiA9IHA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByID0gcTtcbiAgICAgICAgICAgICAgICBnID0gdjtcbiAgICAgICAgICAgICAgICBiID0gcDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHIgPSBwO1xuICAgICAgICAgICAgICAgIGcgPSB2O1xuICAgICAgICAgICAgICAgIGIgPSB0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgciA9IHA7XG4gICAgICAgICAgICAgICAgZyA9IHE7XG4gICAgICAgICAgICAgICAgYiA9IHY7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByID0gdDtcbiAgICAgICAgICAgICAgICBnID0gcDtcbiAgICAgICAgICAgICAgICBiID0gdjtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHIgPSB2O1xuICAgICAgICAgICAgICAgIGcgPSBwO1xuICAgICAgICAgICAgICAgIGIgPSBxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHIgKj0gMjU1O1xuICAgICAgICBnICo9IDI1NTtcbiAgICAgICAgYiAqPSAyNTU7XG4gICAgICAgIHRoaXMuX3ZhbCA9ICgodGhpcy5hIDw8IDI0KSA+Pj4gMCkgKyAoYiA8PCAxNikgKyAoZyA8PCA4KSArIChyIHwgMCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBlbiBUcmFuc2Zvcm0gdG8gSFNWIG1vZGVsIGNvbG9yLlxuICAgICAqIEB6aCDovazmjaLlvZPliY3popzoibLkuLogSFNWIOminOiJsuOAglxuICAgICAqIEByZXR1cm5zIEhTViBmb3JtYXQgY29sb3JcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYFxuICAgICAqIGltcG9ydCB7IENvbG9yIH0gZnJvbSAnY2MnO1xuICAgICAqIGNvbnN0IGNvbG9yID0gQ29sb3IuWUVMTE9XO1xuICAgICAqIGNvbG9yLnRvSFNWKCk7IC8vIHtoOiAwLjE1MzM4NjQ1NDE4MzI2NjksIHM6IDAuOTg0MzEzNzI1NDkwMTk2MSwgdjogMX1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBwdWJsaWMgdG9IU1YgKCkge1xuICAgICAgICBjb25zdCByID0gdGhpcy5yICogdG9GbG9hdDtcbiAgICAgICAgY29uc3QgZyA9IHRoaXMuZyAqIHRvRmxvYXQ7XG4gICAgICAgIGNvbnN0IGIgPSB0aGlzLmIgKiB0b0Zsb2F0O1xuICAgICAgICBjb25zdCBoc3YgPSB7IGg6IDAsIHM6IDAsIHY6IDAgfTtcbiAgICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG4gICAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgICAgICBsZXQgZGVsdGEgPSAwO1xuICAgICAgICBoc3YudiA9IG1heDtcbiAgICAgICAgaHN2LnMgPSBtYXggPyAobWF4IC0gbWluKSAvIG1heCA6IDA7XG4gICAgICAgIGlmICghaHN2LnMpIHsgaHN2LmggPSAwOyB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsdGEgPSBtYXggLSBtaW47XG4gICAgICAgICAgICBpZiAociA9PT0gbWF4KSB7XG4gICAgICAgICAgICAgICAgaHN2LmggPSAoZyAtIGIpIC8gZGVsdGE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGcgPT09IG1heCkge1xuICAgICAgICAgICAgICAgIGhzdi5oID0gMiArIChiIC0gcikgLyBkZWx0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaHN2LmggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHN2LmggLz0gNjtcbiAgICAgICAgICAgIGlmIChoc3YuaCA8IDApIHsgaHN2LmggKz0gMS4wOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhzdjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZW4gU2V0IHRoZSBjb2xvci5cbiAgICAgKiBAemgg6K6+572u5b2T5YmN6aKc6Imy5L2/5YW25LiO5oyH5a6a6aKc6Imy55u4562J44CCXG4gICAgICogQHBhcmFtIG90aGVyIFRoZSBzcGVjaWZpZWQgY29sb3IuXG4gICAgICogQG92ZXJsb2FkXG4gICAgICogQHBhcmFtIFtyPTBdIHJlZCBjb21wb25lbnQgb2YgdGhlIGNvbG9yLCB0aGUgcmFuZ2UgaXMgWzAtMjU1XVxuICAgICAqIEBwYXJhbSBbZz0wXSBncmVlbiBjb21wb25lbnQgb2YgdGhlIGNvbG9yXG4gICAgICogQHBhcmFtIFtiPTBdIGJsdWUgY29tcG9uZW50IG9mIHRoZSBjb2xvclxuICAgICAqIEBwYXJhbSBbYT0yNTVdIGFscGhhIGNvbXBvbmVudCBvZiB0aGUgY29sb3JcbiAgICAgKiBAcmV0dXJucyBDdXJyZW50IGNvbG9yLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQob3RoZXI6IENvbG9yKTogQ29sb3I7XG4gICAgcHVibGljIHNldChyPzogbnVtYmVyLCBnPzogbnVtYmVyLCBiPzogbnVtYmVyLCBhPzogbnVtYmVyKTogQ29sb3I7XG4gICAgcHVibGljIHNldCAocj86IG51bWJlciB8IENvbG9yLCBnPzogbnVtYmVyLCBiPzogbnVtYmVyLCBhPzogbnVtYmVyKTogQ29sb3Ige1xuICAgICAgICBpZiAodHlwZW9mIHIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAoci5fdmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWwgPSByLl92YWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGcgPSByLmcgfHwgMDtcbiAgICAgICAgICAgICAgICBiID0gci5iIHx8IDA7XG4gICAgICAgICAgICAgICAgYSA9IHR5cGVvZiByLmEgPT09ICdudW1iZXInID8gci5hIDogMjU1O1xuICAgICAgICAgICAgICAgIHIgPSByLnIgfHwgMDtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWwgPSAoKGEgPDwgMjQpID4+PiAwKSArIChiIDw8IDE2KSArIChnIDw8IDgpICsgKHIgfCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHIgPSByIHx8IDA7XG4gICAgICAgICAgICBnID0gZyB8fCAwO1xuICAgICAgICAgICAgYiA9IGIgfHwgMDtcbiAgICAgICAgICAgIGEgPSB0eXBlb2YgYSA9PT0gJ251bWJlcicgPyBhIDogMjU1O1xuICAgICAgICAgICAgdGhpcy5fdmFsID0gKChhIDw8IDI0KSA+Pj4gMCkgKyAoYiA8PCAxNikgKyAoZyA8PCA4KSArIChyIHwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGVuIE11bHRpcGxpZXMgdGhlIGN1cnJlbnQgY29sb3IgYnkgdGhlIHNwZWNpZmllZCBjb2xvci5cbiAgICAgKiBAemgg5bCG5b2T5YmN6aKc6Imy5LmY5Lul5LiO5oyH5a6a6aKc6ImyXG4gICAgICogQHBhcmFtIG90aGVyIFRoZSBzcGVjaWZpZWQgY29sb3IuXG4gICAgICovXG4gICAgcHVibGljIG11bHRpcGx5IChvdGhlcjogQ29sb3IpIHtcbiAgICAgICAgY29uc3QgciA9ICgodGhpcy5fdmFsICYgMHgwMDAwMDBmZikgKiBvdGhlci5yKSA+PiA4O1xuICAgICAgICBjb25zdCBnID0gKCh0aGlzLl92YWwgJiAweDAwMDBmZjAwKSAqIG90aGVyLmcpID4+IDg7XG4gICAgICAgIGNvbnN0IGIgPSAoKHRoaXMuX3ZhbCAmIDB4MDBmZjAwMDApICogb3RoZXIuYikgPj4gODtcbiAgICAgICAgY29uc3QgYSA9ICgodGhpcy5fdmFsICYgMHhmZjAwMDAwMCkgPj4+IDgpICogb3RoZXIuYTtcbiAgICAgICAgdGhpcy5fdmFsID0gKGEgJiAweGZmMDAwMDAwKSB8IChiICYgMHgwMGZmMDAwMCkgfCAoZyAmIDB4MDAwMGZmMDApIHwgKHIgJiAweDAwMDAwMGZmKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIF9zZXRfcl91bnNhZmUgKHJlZCkge1xuICAgICAgICB0aGlzLl92YWwgPSAoKHRoaXMuX3ZhbCAmIDB4ZmZmZmZmMDApIHwgcmVkKSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIF9zZXRfZ191bnNhZmUgKGdyZWVuKSB7XG4gICAgICAgIHRoaXMuX3ZhbCA9ICgodGhpcy5fdmFsICYgMHhmZmZmMDBmZikgfCAoZ3JlZW4gPDwgOCkpID4+PiAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgX3NldF9iX3Vuc2FmZSAoYmx1ZSkge1xuICAgICAgICB0aGlzLl92YWwgPSAoKHRoaXMuX3ZhbCAmIDB4ZmYwMGZmZmYpIHwgKGJsdWUgPDwgMTYpKSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIF9zZXRfYV91bnNhZmUgKGFscGhhKSB7XG4gICAgICAgIHRoaXMuX3ZhbCA9ICgodGhpcy5fdmFsICYgMHgwMGZmZmZmZikgfCAoYWxwaGEgPDwgMjQpKSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufSJdfQ==