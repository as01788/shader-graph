"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
const type_1 = require("../../../type");
class RandomRangeNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
    }
    generateCode() {
        let seed = this.getInputValue(0);
        let min = this.getInputValue(1);
        let max = this.getInputValue(2);
        return `${this.getOutputVarDefine(0)} = randomRange(${seed}, ${min}, ${max});`;
    }
}
exports.default = RandomRangeNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFuZG9tUmFuZ2VOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9tYXRoL3JhbmdlL1JhbmRvbVJhbmdlTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUEyQztBQUMzQyx3Q0FBc0Q7QUFFdEQsTUFBcUIsZUFBZ0IsU0FBUSxpQkFBVTtJQUF2RDs7UUFDSSwwQkFBcUIsR0FBRyw0QkFBcUIsQ0FBQyxLQUFLLENBQUM7SUFReEQsQ0FBQztJQU5HLFlBQVk7UUFDUixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxrQkFBa0IsSUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNuRixDQUFDO0NBQ0o7QUFURCxrQ0FTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vLi4vLi4vYmFzZVwiO1xuaW1wb3J0IHsgQ29uY3JldGVQcmVjaXNpb25UeXBlIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZG9tUmFuZ2VOb2RlIGV4dGVuZHMgU2hhZGVyTm9kZSB7XG4gICAgY29uY3JldGVQcmVjaXNpb25UeXBlID0gQ29uY3JldGVQcmVjaXNpb25UeXBlLkZpeGVkO1xuICAgIFxuICAgIGdlbmVyYXRlQ29kZSAoKSB7XG4gICAgICAgIGxldCBzZWVkID0gdGhpcy5nZXRJbnB1dFZhbHVlKDApO1xuICAgICAgICBsZXQgbWluID0gdGhpcy5nZXRJbnB1dFZhbHVlKDEpO1xuICAgICAgICBsZXQgbWF4ID0gdGhpcy5nZXRJbnB1dFZhbHVlKDIpO1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRPdXRwdXRWYXJEZWZpbmUoMCl9ID0gcmFuZG9tUmFuZ2UoJHtzZWVkfSwgJHttaW59LCAke21heH0pO2A7XG4gICAgfVxufVxuXG4iXX0=