"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
class FresnelNode extends base_1.ShaderNode {
    generateCode() {
        let Normal = this.getInputValue(0);
        let ViewDir = this.getInputValue(1);
        let Power = this.getInputValue(2);
        return `${this.getOutputVarDefine(0)} = pow((1.0 - saturate(dot(normalize(${Normal}), normalize(${ViewDir})))), ${Power});`;
    }
}
exports.default = FresnelNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnJlc25lbE5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL21hdGgvdmVjdG9yL0ZyZXNuZWxOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQTJDO0FBRTNDLE1BQXFCLFdBQVksU0FBUSxpQkFBVTtJQUMvQyxZQUFZO1FBQ1IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsd0NBQXdDLE1BQU0sZ0JBQWdCLE9BQU8sU0FBUyxLQUFLLElBQUksQ0FBQztJQUNoSSxDQUFDO0NBQ0o7QUFQRCw4QkFPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vLi4vLi4vYmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcmVzbmVsTm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xuICAgIGdlbmVyYXRlQ29kZSAoKSB7XG4gICAgICAgIGxldCBOb3JtYWwgPSB0aGlzLmdldElucHV0VmFsdWUoMCk7XG4gICAgICAgIGxldCBWaWV3RGlyID0gdGhpcy5nZXRJbnB1dFZhbHVlKDEpO1xuICAgICAgICBsZXQgUG93ZXIgPSB0aGlzLmdldElucHV0VmFsdWUoMik7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldE91dHB1dFZhckRlZmluZSgwKX0gPSBwb3coKDEuMCAtIHNhdHVyYXRlKGRvdChub3JtYWxpemUoJHtOb3JtYWx9KSwgbm9ybWFsaXplKCR7Vmlld0Rpcn0pKSkpLCAke1Bvd2VyfSk7YDtcbiAgICB9XG59XG4iXX0=