"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
const type_1 = require("../../../type");
class HueNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
    }
    generateCode() {
        let inValue = this.getInputValue(0);
        let data;
        //Degrees
        data = `
        vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
        vec4 P = lerp(vec4(${inValue}.zy, K.wz), vec4(${inValue}.yz, K.xy), step(${inValue}.z, ${inValue}.y));
        vec4 Q = lerp(vec4(P.xyw, ${inValue}.x), vec4(${inValue}.x, P.yzx), step(P.x, ${inValue}.x));
        float D = Q.x - min(Q.w, Q.y);
        float E = 1e-10;
        vec3 hsv = vec3(abs(Q.z + (Q.w - Q.y)/(6.0 * D + E)), D / (Q.x + E), Q.x);
    
        float hue = hsv.x + ${this.getInputValue(1)} / 360.;
        hsv.x = (hue < 0.)
                ? hue + 1.
                : (hue > 1.)
                    ? hue - 1.
                    : hue;
    
        vec4 K2 = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 P2 = abs(frac(hsv.xxx + K2.xyz) * 6.0 - K2.www);
        vec3 ${this.getOutputVarName(0)} =  hsv.z * lerp(K2.xxx, saturate(P2 - K2.xxx), hsv.y); 
        `;
        //TODO Radians
        return data;
        // return `${this.getOutputVarDefine(0)} = ${this.getInputValue(0)} + ${this.getInputValue(1)};`;
    }
}
exports.default = HueNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHVlTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvYXJ0aXN0aWMvYWRqdXN0bWVudC9IdWVOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsd0NBQTJDO0FBQzNDLHdDQUFzRDtBQUV0RCxNQUFxQixPQUFRLFNBQVEsaUJBQVU7SUFBL0M7O1FBQ0ksMEJBQXFCLEdBQXdCLDRCQUFxQixDQUFDLEtBQUssQ0FBQztJQW9DN0UsQ0FBQztJQWxDRyxZQUFZO1FBRVIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQyxJQUFJLElBQUksQ0FBQztRQUdULFNBQVM7UUFDVCxJQUFJLEdBQUc7OzZCQUVjLE9BQU8sb0JBQW9CLE9BQU8sb0JBQW9CLE9BQU8sT0FBTyxPQUFPO29DQUNwRSxPQUFPLGFBQWEsT0FBTyx5QkFBeUIsT0FBTzs7Ozs7OEJBS2pFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7ZUFTcEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztTQUM5QixDQUFDO1FBR0YsY0FBYztRQUVkLE9BQU8sSUFBSSxDQUFDO1FBQ1osaUdBQWlHO0lBQ3JHLENBQUM7Q0FDSjtBQXJDRCwwQkFxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsZXJwIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3V0aWxzL01hdGhzL3V0aWxzXCI7XHJcbmltcG9ydCB7IFZlYzQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vdXRpbHMvTWF0aHMvVmVjNFwiO1xyXG5pbXBvcnQgeyBTaGFkZXJOb2RlIH0gZnJvbSBcIi4uLy4uLy4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgQ29uY3JldGVQcmVjaXNpb25UeXBlIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1ZU5vZGUgZXh0ZW5kcyBTaGFkZXJOb2Rle1xyXG4gICAgY29uY3JldGVQcmVjaXNpb25UeXBlOiBDb25jcmV0ZVByZWNpc2lvblR5cGU9Q29uY3JldGVQcmVjaXNpb25UeXBlLkZpeGVkO1xyXG5cclxuICAgIGdlbmVyYXRlQ29kZSgpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICBsZXQgaW5WYWx1ZSA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgwKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGE7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vRGVncmVlc1xyXG4gICAgICAgIGRhdGEgPSBgXHJcbiAgICAgICAgdmVjNCBLID0gdmVjNCgwLjAsIC0xLjAgLyAzLjAsIDIuMCAvIDMuMCwgLTEuMCk7XHJcbiAgICAgICAgdmVjNCBQID0gbGVycCh2ZWM0KCR7aW5WYWx1ZX0uenksIEsud3opLCB2ZWM0KCR7aW5WYWx1ZX0ueXosIEsueHkpLCBzdGVwKCR7aW5WYWx1ZX0ueiwgJHtpblZhbHVlfS55KSk7XHJcbiAgICAgICAgdmVjNCBRID0gbGVycCh2ZWM0KFAueHl3LCAke2luVmFsdWV9LngpLCB2ZWM0KCR7aW5WYWx1ZX0ueCwgUC55engpLCBzdGVwKFAueCwgJHtpblZhbHVlfS54KSk7XHJcbiAgICAgICAgZmxvYXQgRCA9IFEueCAtIG1pbihRLncsIFEueSk7XHJcbiAgICAgICAgZmxvYXQgRSA9IDFlLTEwO1xyXG4gICAgICAgIHZlYzMgaHN2ID0gdmVjMyhhYnMoUS56ICsgKFEudyAtIFEueSkvKDYuMCAqIEQgKyBFKSksIEQgLyAoUS54ICsgRSksIFEueCk7XHJcbiAgICBcclxuICAgICAgICBmbG9hdCBodWUgPSBoc3YueCArICR7dGhpcy5nZXRJbnB1dFZhbHVlKDEpfSAvIDM2MC47XHJcbiAgICAgICAgaHN2LnggPSAoaHVlIDwgMC4pXHJcbiAgICAgICAgICAgICAgICA/IGh1ZSArIDEuXHJcbiAgICAgICAgICAgICAgICA6IChodWUgPiAxLilcclxuICAgICAgICAgICAgICAgICAgICA/IGh1ZSAtIDEuXHJcbiAgICAgICAgICAgICAgICAgICAgOiBodWU7XHJcbiAgICBcclxuICAgICAgICB2ZWM0IEsyID0gdmVjNCgxLjAsIDIuMCAvIDMuMCwgMS4wIC8gMy4wLCAzLjApO1xyXG4gICAgICAgIHZlYzMgUDIgPSBhYnMoZnJhYyhoc3YueHh4ICsgSzIueHl6KSAqIDYuMCAtIEsyLnd3dyk7XHJcbiAgICAgICAgdmVjMyAke3RoaXMuZ2V0T3V0cHV0VmFyTmFtZSgwKX0gPSAgaHN2LnogKiBsZXJwKEsyLnh4eCwgc2F0dXJhdGUoUDIgLSBLMi54eHgpLCBoc3YueSk7IFxyXG4gICAgICAgIGA7XHJcblxyXG5cclxuICAgICAgICAvL1RPRE8gUmFkaWFuc1xyXG5cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAvLyByZXR1cm4gYCR7dGhpcy5nZXRPdXRwdXRWYXJEZWZpbmUoMCl9ID0gJHt0aGlzLmdldElucHV0VmFsdWUoMCl9ICsgJHt0aGlzLmdldElucHV0VmFsdWUoMSl9O2A7XHJcbiAgICB9XHJcbn0iXX0=