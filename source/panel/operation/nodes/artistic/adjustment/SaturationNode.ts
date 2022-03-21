import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class SaturationNode extends ShaderNode{
    concretePrecisionType: ConcretePrecisionType=ConcretePrecisionType.Fixed;

    generateCode(): string {
        return `float luma = dot(${this.getInputValue(0)},vec3(0.2126729, 0.7151522, 0.0721750));\r\nvec3 ${this.getOutputVarName(0)} = luma+${this.getInputValue(1)}*(${this.getInputValue(0)}-luma);`;
    }
}