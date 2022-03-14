"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
const type_1 = require("../../../type");
class SubtractNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Max;
    }
    generateCode() {
        return `${this.getOutputVarDefine(0)} = ${this.getInputValue(0)} - ${this.getInputValue(1)};`;
    }
}
exports.default = SubtractNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VidHJhY3ROb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9tYXRoL2Jhc2ljL1N1YnRyYWN0Tm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUEyQztBQUMzQyx3Q0FBc0Q7QUFFdEQsTUFBcUIsWUFBYSxTQUFRLGlCQUFVO0lBQXBEOztRQUNJLDBCQUFxQixHQUFHLDRCQUFxQixDQUFDLEdBQUcsQ0FBQztJQUt0RCxDQUFDO0lBSEcsWUFBWTtRQUNSLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDbEcsQ0FBQztDQUNKO0FBTkQsK0JBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGFkZXJOb2RlIH0gZnJvbSBcIi4uLy4uLy4uL2Jhc2VcIjtcbmltcG9ydCB7IENvbmNyZXRlUHJlY2lzaW9uVHlwZSB9IGZyb20gXCIuLi8uLi8uLi90eXBlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YnRyYWN0Tm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xuICAgIGNvbmNyZXRlUHJlY2lzaW9uVHlwZSA9IENvbmNyZXRlUHJlY2lzaW9uVHlwZS5NYXg7XG5cbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRPdXRwdXRWYXJEZWZpbmUoMCl9ID0gJHt0aGlzLmdldElucHV0VmFsdWUoMCl9IC0gJHt0aGlzLmdldElucHV0VmFsdWUoMSl9O2A7XG4gICAgfVxufVxuXG4iXX0=