"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
class ChannelMixerNode extends base_1.ShaderNode {
    generateCode() {
        let data = `
            float t = 0.0;
            float freq = pow(2.0, float(0));
            float amp = pow(0.5, float(3-0));
            t += unity_valueNoise(float2(UV.x*Scale/freq, UV.y*Scale/freq))*amp;

            freq = pow(2.0, float(1));
            amp = pow(0.5, float(3-1));
            t += unity_valueNoise(float2(UV.x*Scale/freq, UV.y*Scale/freq))*amp;

            freq = pow(2.0, float(2));
            amp = pow(0.5, float(3-2));
            t += unity_valueNoise(float2(UV.x*Scale/freq, UV.y*Scale/freq))*amp;

            Out = t;
        `;
        return data;
    }
}
exports.default = ChannelMixerNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbm5lbE1peGVyTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvYXJ0aXN0aWMvYWRqdXN0bWVudC9DaGFubmVsTWl4ZXJOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQTJDO0FBRTNDLE1BQXFCLGdCQUFpQixTQUFRLGlCQUFVO0lBRXBELFlBQVk7UUFDUixJQUFJLElBQUksR0FBRzs7Ozs7Ozs7Ozs7Ozs7O1NBZVYsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQXJCRCxtQ0FxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGFkZXJOb2RlIH0gZnJvbSBcIi4uLy4uLy4uL2Jhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYW5uZWxNaXhlck5vZGUgZXh0ZW5kcyBTaGFkZXJOb2RlIHtcclxuXHJcbiAgICBnZW5lcmF0ZUNvZGUoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgZGF0YSA9IGBcclxuICAgICAgICAgICAgZmxvYXQgdCA9IDAuMDtcclxuICAgICAgICAgICAgZmxvYXQgZnJlcSA9IHBvdygyLjAsIGZsb2F0KDApKTtcclxuICAgICAgICAgICAgZmxvYXQgYW1wID0gcG93KDAuNSwgZmxvYXQoMy0wKSk7XHJcbiAgICAgICAgICAgIHQgKz0gdW5pdHlfdmFsdWVOb2lzZShmbG9hdDIoVVYueCpTY2FsZS9mcmVxLCBVVi55KlNjYWxlL2ZyZXEpKSphbXA7XHJcblxyXG4gICAgICAgICAgICBmcmVxID0gcG93KDIuMCwgZmxvYXQoMSkpO1xyXG4gICAgICAgICAgICBhbXAgPSBwb3coMC41LCBmbG9hdCgzLTEpKTtcclxuICAgICAgICAgICAgdCArPSB1bml0eV92YWx1ZU5vaXNlKGZsb2F0MihVVi54KlNjYWxlL2ZyZXEsIFVWLnkqU2NhbGUvZnJlcSkpKmFtcDtcclxuXHJcbiAgICAgICAgICAgIGZyZXEgPSBwb3coMi4wLCBmbG9hdCgyKSk7XHJcbiAgICAgICAgICAgIGFtcCA9IHBvdygwLjUsIGZsb2F0KDMtMikpO1xyXG4gICAgICAgICAgICB0ICs9IHVuaXR5X3ZhbHVlTm9pc2UoZmxvYXQyKFVWLngqU2NhbGUvZnJlcSwgVVYueSpTY2FsZS9mcmVxKSkqYW1wO1xyXG5cclxuICAgICAgICAgICAgT3V0ID0gdDtcclxuICAgICAgICBgO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG59Il19