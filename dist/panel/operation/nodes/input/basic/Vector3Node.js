"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputNode_1 = __importDefault(require("../InputNode"));
class Vector3Node extends InputNode_1.default {
    generateCode() {
        let x = this.getInputValue(0);
        let y = this.getInputValue(1);
        let z = this.getInputValue(2);
        return `vec3 ${this.getOutputVarName(0)} = vec3(${x}, ${y}, ${z});`;
    }
}
exports.default = Vector3Node;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVjdG9yM05vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL2lucHV0L2Jhc2ljL1ZlY3RvcjNOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXFDO0FBRXJDLE1BQXFCLFdBQVksU0FBUSxtQkFBUztJQUM5QyxZQUFZO1FBQ1IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTyxRQUFRLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3hFLENBQUM7Q0FDSjtBQVBELDhCQU9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElucHV0Tm9kZSBmcm9tIFwiLi4vSW5wdXROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvcjNOb2RlIGV4dGVuZHMgSW5wdXROb2RlIHtcbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xuICAgICAgICBsZXQgeCA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgwKTtcbiAgICAgICAgbGV0IHkgPSB0aGlzLmdldElucHV0VmFsdWUoMSk7XG4gICAgICAgIGxldCB6ID0gdGhpcy5nZXRJbnB1dFZhbHVlKDIpO1xuICAgICAgICByZXR1cm4gYHZlYzMgJHt0aGlzLmdldE91dHB1dFZhck5hbWUoMCl9ID0gdmVjMygke3h9LCAke3l9LCAke3p9KTtgO1xuICAgIH1cbn1cblxuIl19