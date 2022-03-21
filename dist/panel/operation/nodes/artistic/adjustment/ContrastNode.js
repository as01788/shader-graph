"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
const type_1 = require("../../../type");
class ContrastNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
    }
    generateCode() {
        return `float midpoint = pow(0.5,2.2);\r\nvec3 ${this.getOutputVarName(0)} = (${this.getInputValue(0)} - midpoint) * ${this.getInputValue(1)} + midpoint;`;
    }
}
exports.default = ContrastNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhc3ROb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9hcnRpc3RpYy9hZGp1c3RtZW50L0NvbnRyYXN0Tm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUEyQztBQUMzQyx3Q0FBc0Q7QUFFdEQsTUFBcUIsWUFBYSxTQUFRLGlCQUFVO0lBQXBEOztRQUNJLDBCQUFxQixHQUEwQiw0QkFBcUIsQ0FBQyxLQUFLLENBQUM7SUFJL0UsQ0FBQztJQUhHLFlBQVk7UUFDUixPQUFPLDBDQUEwQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztJQUMvSixDQUFDO0NBQ0o7QUFMRCwrQkFLQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vLi4vLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBDb25jcmV0ZVByZWNpc2lvblR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJhc3ROb2RlIGV4dGVuZHMgU2hhZGVyTm9kZXtcclxuICAgIGNvbmNyZXRlUHJlY2lzaW9uVHlwZTogQ29uY3JldGVQcmVjaXNpb25UeXBlID0gQ29uY3JldGVQcmVjaXNpb25UeXBlLkZpeGVkO1xyXG4gICAgZ2VuZXJhdGVDb2RlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGBmbG9hdCBtaWRwb2ludCA9IHBvdygwLjUsMi4yKTtcXHJcXG52ZWMzICR7dGhpcy5nZXRPdXRwdXRWYXJOYW1lKDApfSA9ICgke3RoaXMuZ2V0SW5wdXRWYWx1ZSgwKX0gLSBtaWRwb2ludCkgKiAke3RoaXMuZ2V0SW5wdXRWYWx1ZSgxKX0gKyBtaWRwb2ludDtgO1xyXG4gICAgfVxyXG59Il19