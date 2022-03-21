import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class ContrastNode extends ShaderNode{
    concretePrecisionType: ConcretePrecisionType = ConcretePrecisionType.Fixed;
    generateCode(): string {
        return `float midpoint = pow(0.5,2.2);\r\nvec3 ${this.getOutputVarName(0)} = (${this.getInputValue(0)} - midpoint) * ${this.getInputValue(1)} + midpoint;`;
    }
}