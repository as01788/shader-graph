"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
class RejectionNode extends base_1.ShaderNode {
    generateCode() {
        let In = this.getInputValue(0);
        let Normal = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = reflect(${In}, ${Normal});`;
    }
}
exports.default = RejectionNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVmbGVjdGlvbk5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL21hdGgvdmVjdG9yL1JlZmxlY3Rpb25Ob2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQTJDO0FBRTNDLE1BQXFCLGFBQWMsU0FBUSxpQkFBVTtJQUNqRCxZQUFZO1FBQ1IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxLQUFLLE1BQU0sSUFBSSxDQUFDO0lBQ3hFLENBQUM7Q0FDSjtBQU5ELGdDQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hhZGVyTm9kZSB9IGZyb20gXCIuLi8uLi8uLi9iYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlamVjdGlvbk5vZGUgZXh0ZW5kcyBTaGFkZXJOb2RlIHtcbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xuICAgICAgICBsZXQgSW4gPSB0aGlzLmdldElucHV0VmFsdWUoMCk7XG4gICAgICAgIGxldCBOb3JtYWwgPSB0aGlzLmdldElucHV0VmFsdWUoMSk7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldE91dHB1dFZhckRlZmluZSgwKX0gPSByZWZsZWN0KCR7SW59LCAke05vcm1hbH0pO2A7XG4gICAgfVxufVxuIl19