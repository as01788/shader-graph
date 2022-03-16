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
            float vx = .0;
            float vy = .0;
            for(float y=-1.;y<=1.;y++){
                for(float x=-1.;x<=1.;x++){
                    vec2 lattice = vec2(x,y);

                    mat2 m = mat2(15.27,47.63,99.41,89.98);
                    vec2 o = (lattice+g) * m;
                    float f1 = sin(o.x);
                    float f2 = sin(o.y);
                    lattice = frac(vec2(f1,f2)*46839.32);

                    vec2 offset = vec2(sin(lattice.y*+${angle})*0.5+0.5,cos(lattice.x*${angle})*0.5+0.5);
                    float d = distance(lattice + ${angle},f);
                    if(d < res.x){
                        res = vec3(d,offset.x,offset.y);
                        vx = res.x;
                        vy = res.y;
                    }
                }
            }
        `;
        return `${data}\r\n${this.getOutputVarDefine(0)}=vx;\r\n${this.getOutputVarDefine(1)}=vy`;
    }
}
exports.default = VoronoiNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVm9yb25vaU5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL3Byb2NlZHVyYWwvbm9pc2UvVm9yb25vaU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkM7QUFFM0MsTUFBcUIsV0FBWSxTQUFRLGlCQUFVO0lBRS9DLFlBQVk7UUFDUixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqQyxJQUFJLElBQUksR0FBRztnQ0FDYSxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozt3REFpQm9CLEtBQUssMkJBQTJCLEtBQUs7bURBQzFDLEtBQUs7Ozs7Ozs7O1NBUS9DLENBQUM7UUFFRixPQUFPLEdBQUcsSUFBSSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM5RixDQUFDO0NBQ0o7QUF0Q0QsOEJBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hhZGVyTm9kZSB9IGZyb20gXCIuLi8uLi8uLi9iYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWb3Jvbm9pTm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xyXG5cclxuICAgIGdlbmVyYXRlQ29kZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB1diA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgwKTtcclxuICAgICAgICBsZXQgYW5nbGUgPSB0aGlzLmdldElucHV0VmFsdWUoMSk7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLmdldElucHV0VmFsdWUoMik7XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gYFxyXG4gICAgICAgICAgICB2ZWMyIHV2YyA9IHZfdXYgKiAke2NlbGx9O1xyXG4gICAgICAgICAgICB2ZWMyIGcgPSBmbG9vcih1dmMpO1xyXG4gICAgICAgICAgICB2ZWMyIGYgPSBmcmFjKHV2Yyk7XHJcbiAgICAgICAgICAgIGZsb2F0IHQgPSA4LjA7XHJcbiAgICAgICAgICAgIHZlYzMgcmVzID0gdmVjMyg4LjAsLjAsLjApO1xyXG4gICAgICAgICAgICBmbG9hdCB2eCA9IC4wO1xyXG4gICAgICAgICAgICBmbG9hdCB2eSA9IC4wO1xyXG4gICAgICAgICAgICBmb3IoZmxvYXQgeT0tMS47eTw9MS47eSsrKXtcclxuICAgICAgICAgICAgICAgIGZvcihmbG9hdCB4PS0xLjt4PD0xLjt4Kyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHZlYzIgbGF0dGljZSA9IHZlYzIoeCx5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWF0MiBtID0gbWF0MigxNS4yNyw0Ny42Myw5OS40MSw4OS45OCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVjMiBvID0gKGxhdHRpY2UrZykgKiBtO1xyXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0IGYxID0gc2luKG8ueCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQgZjIgPSBzaW4oby55KTtcclxuICAgICAgICAgICAgICAgICAgICBsYXR0aWNlID0gZnJhYyh2ZWMyKGYxLGYyKSo0NjgzOS4zMik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZlYzIgb2Zmc2V0ID0gdmVjMihzaW4obGF0dGljZS55Kiske2FuZ2xlfSkqMC41KzAuNSxjb3MobGF0dGljZS54KiR7YW5nbGV9KSowLjUrMC41KTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCBkID0gZGlzdGFuY2UobGF0dGljZSArICR7YW5nbGV9LGYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGQgPCByZXMueCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IHZlYzMoZCxvZmZzZXQueCxvZmZzZXQueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ4ID0gcmVzLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ5ID0gcmVzLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2RhdGF9XFxyXFxuJHt0aGlzLmdldE91dHB1dFZhckRlZmluZSgwKX09dng7XFxyXFxuJHt0aGlzLmdldE91dHB1dFZhckRlZmluZSgxKX09dnlgO1xyXG4gICAgfVxyXG59Il19