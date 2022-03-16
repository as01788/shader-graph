"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
class HueNode extends base_1.ShaderNode {
    generateCode() {
        let data = `
        vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
        vec4 P = lerp(vec4(s.albedo.bg, K.wz), vec4(s.albedo.gb, K.xy), step(s.albedo.b, s.albedo.g));
        vec4 Q = lerp(vec4(P.xyw, s.albedo.r), vec4(s.albedo.r, P.yzx), step(P.x, s.albedo.r));
        float D = Q.x - min(Q.w, Q.y);
        float E = 1e-10;
        vec3 hsv = vec3(abs(Q.z + (Q.w - Q.y)/(6.0 * D + E)), D / (Q.x + E), Q.x);
    
        float hue = hsv.x + ${this.getInputValue(0)} / 360.;
        hsv.x = (hue < 0.)
                ? hue + 1.
                : (hue > 1.)
                    ? hue - 1.
                    : hue;
    
        vec4 K2 = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 P2 = abs(frac(hsv.xxx + K2.xyz) * 6.0 - K2.www);
        ${this.getOutputVarDefine(0)} =  hsv.z * lerp(K2.xxx, saturate(P2 - K2.xxx), hsv.y); 
        `;
        return data;
        // return `${this.getOutputVarDefine(0)} = ${this.getInputValue(0)} + ${this.getInputValue(1)};`;
    }
}
exports.default = HueNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHVlTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvYXJ0aXN0aWMvYWRqdXN0bWVudC9IdWVOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsd0NBQTJDO0FBRTNDLE1BQXFCLE9BQVEsU0FBUSxpQkFBVTtJQUMzQyxZQUFZO1FBRVIsSUFBSSxJQUFJLEdBQUc7Ozs7Ozs7OzhCQVFXLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7VUFTekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztTQUMzQixDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUM7UUFDWixpR0FBaUc7SUFDckcsQ0FBQztDQUNKO0FBekJELDBCQXlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxlcnAgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vdXRpbHMvTWF0aHMvdXRpbHNcIjtcclxuaW1wb3J0IHsgVmVjNCB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi91dGlscy9NYXRocy9WZWM0XCI7XHJcbmltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vLi4vLi4vYmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHVlTm9kZSBleHRlbmRzIFNoYWRlck5vZGV7XHJcbiAgICBnZW5lcmF0ZUNvZGUoKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSBgXHJcbiAgICAgICAgdmVjNCBLID0gdmVjNCgwLjAsIC0xLjAgLyAzLjAsIDIuMCAvIDMuMCwgLTEuMCk7XHJcbiAgICAgICAgdmVjNCBQID0gbGVycCh2ZWM0KHMuYWxiZWRvLmJnLCBLLnd6KSwgdmVjNChzLmFsYmVkby5nYiwgSy54eSksIHN0ZXAocy5hbGJlZG8uYiwgcy5hbGJlZG8uZykpO1xyXG4gICAgICAgIHZlYzQgUSA9IGxlcnAodmVjNChQLnh5dywgcy5hbGJlZG8uciksIHZlYzQocy5hbGJlZG8uciwgUC55engpLCBzdGVwKFAueCwgcy5hbGJlZG8ucikpO1xyXG4gICAgICAgIGZsb2F0IEQgPSBRLnggLSBtaW4oUS53LCBRLnkpO1xyXG4gICAgICAgIGZsb2F0IEUgPSAxZS0xMDtcclxuICAgICAgICB2ZWMzIGhzdiA9IHZlYzMoYWJzKFEueiArIChRLncgLSBRLnkpLyg2LjAgKiBEICsgRSkpLCBEIC8gKFEueCArIEUpLCBRLngpO1xyXG4gICAgXHJcbiAgICAgICAgZmxvYXQgaHVlID0gaHN2LnggKyAke3RoaXMuZ2V0SW5wdXRWYWx1ZSgwKX0gLyAzNjAuO1xyXG4gICAgICAgIGhzdi54ID0gKGh1ZSA8IDAuKVxyXG4gICAgICAgICAgICAgICAgPyBodWUgKyAxLlxyXG4gICAgICAgICAgICAgICAgOiAoaHVlID4gMS4pXHJcbiAgICAgICAgICAgICAgICAgICAgPyBodWUgLSAxLlxyXG4gICAgICAgICAgICAgICAgICAgIDogaHVlO1xyXG4gICAgXHJcbiAgICAgICAgdmVjNCBLMiA9IHZlYzQoMS4wLCAyLjAgLyAzLjAsIDEuMCAvIDMuMCwgMy4wKTtcclxuICAgICAgICB2ZWMzIFAyID0gYWJzKGZyYWMoaHN2Lnh4eCArIEsyLnh5eikgKiA2LjAgLSBLMi53d3cpO1xyXG4gICAgICAgICR7dGhpcy5nZXRPdXRwdXRWYXJEZWZpbmUoMCl9ID0gIGhzdi56ICogbGVycChLMi54eHgsIHNhdHVyYXRlKFAyIC0gSzIueHh4KSwgaHN2LnkpOyBcclxuICAgICAgICBgO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIC8vIHJldHVybiBgJHt0aGlzLmdldE91dHB1dFZhckRlZmluZSgwKX0gPSAke3RoaXMuZ2V0SW5wdXRWYWx1ZSgwKX0gKyAke3RoaXMuZ2V0SW5wdXRWYWx1ZSgxKX07YDtcclxuICAgIH1cclxufSJdfQ==