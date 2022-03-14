"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
const type_1 = require("../../../type");
class RemapNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
    }
    generateCode() {
        let In = this.getInputValue(0);
        let InMinMax = this.getInputValue(1);
        let OutMinMax = this.getInputValue(2);
        return `${this.getOutputVarDefine(0)} = ${OutMinMax}.x + (${In} - ${InMinMax}.x) * (${OutMinMax}.y - ${OutMinMax}.x) / (${InMinMax}.y - ${InMinMax}.x);`;
    }
}
exports.default = RemapNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVtYXBOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9tYXRoL3JhbmdlL1JlbWFwTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUEyQztBQUMzQyx3Q0FBc0Q7QUFFdEQsTUFBcUIsU0FBVSxTQUFRLGlCQUFVO0lBQWpEOztRQUNJLDBCQUFxQixHQUFHLDRCQUFxQixDQUFDLEtBQUssQ0FBQztJQVF4RCxDQUFDO0lBTkcsWUFBWTtRQUNSLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE1BQU0sU0FBUyxTQUFTLEVBQUUsTUFBTSxRQUFRLFVBQVUsU0FBUyxRQUFRLFNBQVMsVUFBVSxRQUFRLFFBQVEsUUFBUSxNQUFNLENBQUM7SUFDN0osQ0FBQztDQUNKO0FBVEQsNEJBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGFkZXJOb2RlIH0gZnJvbSBcIi4uLy4uLy4uL2Jhc2VcIjtcbmltcG9ydCB7IENvbmNyZXRlUHJlY2lzaW9uVHlwZSB9IGZyb20gXCIuLi8uLi8uLi90eXBlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbWFwTm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xuICAgIGNvbmNyZXRlUHJlY2lzaW9uVHlwZSA9IENvbmNyZXRlUHJlY2lzaW9uVHlwZS5GaXhlZDtcblxuICAgIGdlbmVyYXRlQ29kZSAoKSB7XG4gICAgICAgIGxldCBJbiA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgwKTtcbiAgICAgICAgbGV0IEluTWluTWF4ID0gdGhpcy5nZXRJbnB1dFZhbHVlKDEpO1xuICAgICAgICBsZXQgT3V0TWluTWF4ID0gdGhpcy5nZXRJbnB1dFZhbHVlKDIpO1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRPdXRwdXRWYXJEZWZpbmUoMCl9ID0gJHtPdXRNaW5NYXh9LnggKyAoJHtJbn0gLSAke0luTWluTWF4fS54KSAqICgke091dE1pbk1heH0ueSAtICR7T3V0TWluTWF4fS54KSAvICgke0luTWluTWF4fS55IC0gJHtJbk1pbk1heH0ueCk7YDtcbiAgICB9XG59XG5cbiJdfQ==