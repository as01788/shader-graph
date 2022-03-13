import { lerp } from "../../../../../utils/Maths/utils";
import { Vec4 } from "../../../../../utils/Maths/Vec4";
import { ShaderNode } from "../../../base";

export default class HueNode extends ShaderNode{
    generateCode(): string {

        let K = new Vec4(0,-1/3,2/3,-1);
        let P = new Vec4();
        //Vec4.lerp(P,new Vec4(this.getInputValue(0)))
        

        return `${this.getOutputVarDefine(0)} = ${this.getInputValue(0)} + ${this.getInputValue(1)};`;
    }
}