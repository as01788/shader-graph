"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
class VoronoiNode extends base_1.ShaderNode {
    generateCode() {
        let uv = this.getInputValue(0);
        let angle = this.getInputValue(1);
        let cell = this.getInputValue(2);
        let data = `
            vec2 uvc = v_uv * ${cell};
            vec2 g = floor(uvc);
            vec2 f = frac(uvc);
            float t = 8.0;
            vec3 res = vec3(8.0,.0,.0);
            float x = .0;
            float y = .0;
            for(int y=-1;y<=1;y++){
                for(int x=-1;x<=1;x++){
                    vec2 lattice = vec2(x,y);

                    vec4 m = vec4(15.27,47.63,99.41,89.98);
                    float frac1 = sin(mul(lattice+g,m))*46839.32;
                    lattice = frac(frac1);

                    vec2 offset = vec2(sin(lattice.y*+${angle})*0.5+0.5,cos(lattice.x*${angle})*0.5+0.5);
                    float d = distance(lattice + ${angle},f);
                    if(d < res.x){
                        res = vec3(d,offset.x,offset.y);
                        x = res.x;
                        y = res.y;
                    }
                }
            }
        `;
        return data;
    }
}
exports.default = VoronoiNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVm9yb25vaU5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL3Byb2NlZHVyYWwvbm9pc2UvVm9yb25vaU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkM7QUFFM0MsTUFBcUIsV0FBWSxTQUFRLGlCQUFVO0lBRS9DLFlBQVk7UUFDUixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqQyxJQUFJLElBQUksR0FBRztnQ0FDYSxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7d0RBZW9CLEtBQUssMkJBQTJCLEtBQUs7bURBQzFDLEtBQUs7Ozs7Ozs7O1NBUS9DLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFwQ0QsOEJBb0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hhZGVyTm9kZSB9IGZyb20gXCIuLi8uLi8uLi9iYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZvcm9ub2lOb2RlIGV4dGVuZHMgU2hhZGVyTm9kZXtcblxuICAgIGdlbmVyYXRlQ29kZSgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgdXYgPSB0aGlzLmdldElucHV0VmFsdWUoMCk7XG4gICAgICAgIGxldCBhbmdsZSA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgxKTtcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLmdldElucHV0VmFsdWUoMik7XG5cbiAgICAgICAgbGV0IGRhdGEgPSBgXG4gICAgICAgICAgICB2ZWMyIHV2YyA9IHZfdXYgKiAke2NlbGx9O1xuICAgICAgICAgICAgdmVjMiBnID0gZmxvb3IodXZjKTtcbiAgICAgICAgICAgIHZlYzIgZiA9IGZyYWModXZjKTtcbiAgICAgICAgICAgIGZsb2F0IHQgPSA4LjA7XG4gICAgICAgICAgICB2ZWMzIHJlcyA9IHZlYzMoOC4wLC4wLC4wKTtcbiAgICAgICAgICAgIGZsb2F0IHggPSAuMDtcbiAgICAgICAgICAgIGZsb2F0IHkgPSAuMDtcbiAgICAgICAgICAgIGZvcihpbnQgeT0tMTt5PD0xO3krKyl7XG4gICAgICAgICAgICAgICAgZm9yKGludCB4PS0xO3g8PTE7eCsrKXtcbiAgICAgICAgICAgICAgICAgICAgdmVjMiBsYXR0aWNlID0gdmVjMih4LHkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZlYzQgbSA9IHZlYzQoMTUuMjcsNDcuNjMsOTkuNDEsODkuOTgpO1xuICAgICAgICAgICAgICAgICAgICBmbG9hdCBmcmFjMSA9IHNpbihtdWwobGF0dGljZStnLG0pKSo0NjgzOS4zMjtcbiAgICAgICAgICAgICAgICAgICAgbGF0dGljZSA9IGZyYWMoZnJhYzEpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZlYzIgb2Zmc2V0ID0gdmVjMihzaW4obGF0dGljZS55Kiske2FuZ2xlfSkqMC41KzAuNSxjb3MobGF0dGljZS54KiR7YW5nbGV9KSowLjUrMC41KTtcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQgZCA9IGRpc3RhbmNlKGxhdHRpY2UgKyAke2FuZ2xlfSxmKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoZCA8IHJlcy54KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IHZlYzMoZCxvZmZzZXQueCxvZmZzZXQueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gcmVzLng7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gcmVzLnk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIGA7XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxufSJdfQ==