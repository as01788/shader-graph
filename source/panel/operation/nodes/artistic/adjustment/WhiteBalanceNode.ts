import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class WhiteBalanceNode extends ShaderNode{
    concretePrecisionType: ConcretePrecisionType = ConcretePrecisionType.Fixed;
    depChunks = ['artistic'];

    generateCode(): string {
        return `vec3 ${this.getOutputVarName(0)} = whiteBalance(${this.getInputValue(0)},${this.getInputValue(1)},${this.getInputValue(2)});`;
    }
}