import { lerp } from "../../../../../utils/Maths/utils";
import { Vec4 } from "../../../../../utils/Maths/Vec4";
import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class HueNode extends ShaderNode{
    concretePrecisionType: ConcretePrecisionType=ConcretePrecisionType.Fixed;

    generateCode(): string {

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