"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
class Arctangent2Node extends base_1.ShaderNode {
    generateCode() {
        let a = this.getInputValue(0);
        let b = this.getInputValue(0);
        return `${this.getOutputVarDefine(0)} = atan2(${a}, ${b});`;
    }
}
exports.default = Arctangent2Node;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJjdGFuZ2VudDJOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9tYXRoL3RyaWdvbm9tZXRyeS9BcmN0YW5nZW50Mk5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkM7QUFFM0MsTUFBcUIsZUFBZ0IsU0FBUSxpQkFBVTtJQUNuRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ2hFLENBQUM7Q0FDSjtBQU5ELGtDQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hhZGVyTm9kZSB9IGZyb20gXCIuLi8uLi8uLi9iYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFyY3RhbmdlbnQyTm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xuICAgIGdlbmVyYXRlQ29kZSAoKSB7XG4gICAgICAgIGxldCBhID0gdGhpcy5nZXRJbnB1dFZhbHVlKDApO1xuICAgICAgICBsZXQgYiA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgwKTtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0T3V0cHV0VmFyRGVmaW5lKDApfSA9IGF0YW4yKCR7YX0sICR7Yn0pO2A7XG4gICAgfVxufVxuIl19