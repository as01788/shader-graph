"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
class VoronoiNode extends base_1.ShaderNode {
    generateCode() {
        let uv = this.getInputValue(0);
        let angle = this.getInputValue(1);
        let cell = this.getInputValue(2);
        let data = `
            vec2 uvc = ${uv} * ${cell};
            vec2 g = floor(uvc);
            vec2 f = uvc - floor(uvc);
            float t = 8.0;
            vec3 res = vec3(8.0,.0,.0);
            for(int y=-1;y<=1;y++){
                for(int x=-1;x<=1;x++){
                    vec2 lattice = vec2(x,y);

                    vec4 m = vec4(15.27,47.63,99.41,89.98);
                    float frac1 = sin(mul(lattice+g,m))*46839.32;
                    lattice = frac1 - floor(frac1);

                    vec2 offset = vec2(sin(lattice.y*+${angle})*0.5+0.5,cos(lattice.x*${angle})*0.5+0.5);
                    float d = distance(lattice + ${angle},f);
                    if(d < res.x){
                        res = vec3(d,offset.x,offset.y);
                        ${this.getOutputVarDefine(0)} = res.x;
                        ${this.getOutputVarDefine(1)} = res.y;
                    }
                }
            }
        `;
        return data;
    }
}
exports.default = VoronoiNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVm9yb25vaU5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL3Byb2NlZHVyYWwvbm9pc2UvVm9yb25vaU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkM7QUFFM0MsTUFBcUIsV0FBWSxTQUFRLGlCQUFVO0lBRS9DLFlBQVk7UUFDUixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqQyxJQUFJLElBQUksR0FBRzt5QkFDTSxFQUFFLE1BQU0sSUFBSTs7Ozs7Ozs7Ozs7Ozt3REFhbUIsS0FBSywyQkFBMkIsS0FBSzttREFDMUMsS0FBSzs7OzBCQUc5QixJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDOzBCQUMxQixJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDOzs7O1NBSTNDLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFsQ0QsOEJBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hhZGVyTm9kZSB9IGZyb20gXCIuLi8uLi8uLi9iYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWb3Jvbm9pTm9kZSBleHRlbmRzIFNoYWRlck5vZGV7XHJcblxyXG4gICAgZ2VuZXJhdGVDb2RlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHV2ID0gdGhpcy5nZXRJbnB1dFZhbHVlKDApO1xyXG4gICAgICAgIGxldCBhbmdsZSA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgxKTtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgyKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSBgXHJcbiAgICAgICAgICAgIHZlYzIgdXZjID0gJHt1dn0gKiAke2NlbGx9O1xyXG4gICAgICAgICAgICB2ZWMyIGcgPSBmbG9vcih1dmMpO1xyXG4gICAgICAgICAgICB2ZWMyIGYgPSB1dmMgLSBmbG9vcih1dmMpO1xyXG4gICAgICAgICAgICBmbG9hdCB0ID0gOC4wO1xyXG4gICAgICAgICAgICB2ZWMzIHJlcyA9IHZlYzMoOC4wLC4wLC4wKTtcclxuICAgICAgICAgICAgZm9yKGludCB5PS0xO3k8PTE7eSsrKXtcclxuICAgICAgICAgICAgICAgIGZvcihpbnQgeD0tMTt4PD0xO3grKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVjMiBsYXR0aWNlID0gdmVjMih4LHkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2ZWM0IG0gPSB2ZWM0KDE1LjI3LDQ3LjYzLDk5LjQxLDg5Ljk4KTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCBmcmFjMSA9IHNpbihtdWwobGF0dGljZStnLG0pKSo0NjgzOS4zMjtcclxuICAgICAgICAgICAgICAgICAgICBsYXR0aWNlID0gZnJhYzEgLSBmbG9vcihmcmFjMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZlYzIgb2Zmc2V0ID0gdmVjMihzaW4obGF0dGljZS55Kiske2FuZ2xlfSkqMC41KzAuNSxjb3MobGF0dGljZS54KiR7YW5nbGV9KSowLjUrMC41KTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCBkID0gZGlzdGFuY2UobGF0dGljZSArICR7YW5nbGV9LGYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGQgPCByZXMueCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IHZlYzMoZCxvZmZzZXQueCxvZmZzZXQueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5nZXRPdXRwdXRWYXJEZWZpbmUoMCl9ID0gcmVzLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5nZXRPdXRwdXRWYXJEZWZpbmUoMSl9ID0gcmVzLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbn0iXX0=