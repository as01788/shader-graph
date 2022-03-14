"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
const type_1 = require("../../../type");
class AddNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Max;
    }
    generateCode() {
        return `${this.getOutputVarDefine(0)} = ${this.getInputValue(0)} + ${this.getInputValue(1)};`;
    }
}
exports.default = AddNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvbWF0aC9iYXNpYy9BZGROb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQTJDO0FBQzNDLHdDQUFzRDtBQUV0RCxNQUFxQixPQUFRLFNBQVEsaUJBQVU7SUFBL0M7O1FBQ0ksMEJBQXFCLEdBQUcsNEJBQXFCLENBQUMsR0FBRyxDQUFDO0lBS3RELENBQUM7SUFIRyxZQUFZO1FBQ1IsT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNsRyxDQUFDO0NBQ0o7QUFORCwwQkFNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vLi4vLi4vYmFzZVwiO1xuaW1wb3J0IHsgQ29uY3JldGVQcmVjaXNpb25UeXBlIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkTm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xuICAgIGNvbmNyZXRlUHJlY2lzaW9uVHlwZSA9IENvbmNyZXRlUHJlY2lzaW9uVHlwZS5NYXg7XG5cbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRPdXRwdXRWYXJEZWZpbmUoMCl9ID0gJHt0aGlzLmdldElucHV0VmFsdWUoMCl9ICsgJHt0aGlzLmdldElucHV0VmFsdWUoMSl9O2A7XG4gICAgfVxufVxuXG4iXX0=