import { ShaderNode } from "../../../base";

export default class ReplaceColorNode extends ShaderNode{
    
    generateCode(): string {
        return `${this.getOutputVarName(0)} = lerp(${this.getInputValue(2)},${this.getInputValue(0)},saturate((distance(${this.getInputValue(1)},${this.getInputValue(0)})-${this.getInputValue(3)})/max(${this.getInputValue(5)},e-f)))`;
    }
}