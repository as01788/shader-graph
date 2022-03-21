"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
const type_1 = require("../../../type");
class SaturationNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
    }
    generateCode() {
        return `float luma = dot(${this.getInputValue(0)},vec3(0.2126729, 0.7151522, 0.0721750));\r\nvec3 ${this.getOutputVarName(0)} = luma+${this.getInputValue(1)}*(${this.getInputValue(0)}-luma);`;
    }
}
exports.default = SaturationNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2F0dXJhdGlvbk5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL2FydGlzdGljL2FkanVzdG1lbnQvU2F0dXJhdGlvbk5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkM7QUFDM0Msd0NBQXNEO0FBRXRELE1BQXFCLGNBQWUsU0FBUSxpQkFBVTtJQUF0RDs7UUFDSSwwQkFBcUIsR0FBd0IsNEJBQXFCLENBQUMsS0FBSyxDQUFDO0lBSzdFLENBQUM7SUFIRyxZQUFZO1FBQ1IsT0FBTyxvQkFBb0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsb0RBQW9ELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNwTSxDQUFDO0NBQ0o7QUFORCxpQ0FNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vLi4vLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBDb25jcmV0ZVByZWNpc2lvblR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2F0dXJhdGlvbk5vZGUgZXh0ZW5kcyBTaGFkZXJOb2Rle1xyXG4gICAgY29uY3JldGVQcmVjaXNpb25UeXBlOiBDb25jcmV0ZVByZWNpc2lvblR5cGU9Q29uY3JldGVQcmVjaXNpb25UeXBlLkZpeGVkO1xyXG5cclxuICAgIGdlbmVyYXRlQ29kZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgZmxvYXQgbHVtYSA9IGRvdCgke3RoaXMuZ2V0SW5wdXRWYWx1ZSgwKX0sdmVjMygwLjIxMjY3MjksIDAuNzE1MTUyMiwgMC4wNzIxNzUwKSk7XFxyXFxudmVjMyAke3RoaXMuZ2V0T3V0cHV0VmFyTmFtZSgwKX0gPSBsdW1hKyR7dGhpcy5nZXRJbnB1dFZhbHVlKDEpfSooJHt0aGlzLmdldElucHV0VmFsdWUoMCl9LWx1bWEpO2A7XHJcbiAgICB9XHJcbn0iXX0=