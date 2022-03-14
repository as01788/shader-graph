"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
const type_1 = require("../../../type");
class MultiplyNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Max;
    }
    generateCode() {
        let a = this.getInputValue(0);
        let b = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = ${a} * ${b};`;
    }
}
exports.default = MultiplyNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGlwbHlOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9tYXRoL2Jhc2ljL011bHRpcGx5Tm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUEyQztBQUMzQyx3Q0FBc0Q7QUFFdEQsTUFBcUIsWUFBYSxTQUFRLGlCQUFVO0lBQXBEOztRQUNJLDBCQUFxQixHQUFHLDRCQUFxQixDQUFDLEdBQUcsQ0FBQztJQU90RCxDQUFDO0lBTEcsWUFBWTtRQUNSLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUMxRCxDQUFDO0NBQ0o7QUFSRCwrQkFRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vLi4vLi4vYmFzZVwiO1xuaW1wb3J0IHsgQ29uY3JldGVQcmVjaXNpb25UeXBlIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlwbHlOb2RlIGV4dGVuZHMgU2hhZGVyTm9kZSB7XG4gICAgY29uY3JldGVQcmVjaXNpb25UeXBlID0gQ29uY3JldGVQcmVjaXNpb25UeXBlLk1heDtcbiAgICBcbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xuICAgICAgICBsZXQgYSA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgwKTtcbiAgICAgICAgbGV0IGIgPSB0aGlzLmdldElucHV0VmFsdWUoMSk7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldE91dHB1dFZhckRlZmluZSgwKX0gPSAke2F9ICogJHtifTtgO1xuICAgIH1cbn1cblxuIl19