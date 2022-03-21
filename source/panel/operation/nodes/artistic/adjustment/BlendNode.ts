import { ShaderNode } from "../../../base";
import { ConcretePrecisionType } from "../../../type";

export default class BlendNode extends ShaderNode{
    concretePrecisionType: ConcretePrecisionType = ConcretePrecisionType.Fixed;

    generateCode(): string {
        //TODO
        return ``;
    }
}