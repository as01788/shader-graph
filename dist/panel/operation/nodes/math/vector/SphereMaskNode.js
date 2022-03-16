"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
class SphereMaskNode extends base_1.ShaderNode {
    generateCode() {
        let Coords = this.getInputValue(0);
        let Center = this.getInputValue(1);
        let Radius = this.getInputValue(1);
        let Hardness = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = 1 - saturate((distance(${Coords}, ${Center}) - ${Radius}) / (1 - ${Hardness}));`;
    }
}
exports.default = SphereMaskNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BoZXJlTWFza05vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL21hdGgvdmVjdG9yL1NwaGVyZU1hc2tOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQTJDO0FBRTNDLE1BQXFCLGNBQWUsU0FBUSxpQkFBVTtJQUNsRCxZQUFZO1FBQ1IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyw2QkFBNkIsTUFBTSxLQUFLLE1BQU0sT0FBTyxNQUFNLFlBQVksUUFBUSxLQUFLLENBQUM7SUFDN0gsQ0FBQztDQUNKO0FBUkQsaUNBUUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGFkZXJOb2RlIH0gZnJvbSBcIi4uLy4uLy4uL2Jhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaGVyZU1hc2tOb2RlIGV4dGVuZHMgU2hhZGVyTm9kZSB7XHJcbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xyXG4gICAgICAgIGxldCBDb29yZHMgPSB0aGlzLmdldElucHV0VmFsdWUoMCk7XHJcbiAgICAgICAgbGV0IENlbnRlciA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgxKTtcclxuICAgICAgICBsZXQgUmFkaXVzID0gdGhpcy5nZXRJbnB1dFZhbHVlKDEpO1xyXG4gICAgICAgIGxldCBIYXJkbmVzcyA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgxKTtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRPdXRwdXRWYXJEZWZpbmUoMCl9ID0gMSAtIHNhdHVyYXRlKChkaXN0YW5jZSgke0Nvb3Jkc30sICR7Q2VudGVyfSkgLSAke1JhZGl1c30pIC8gKDEgLSAke0hhcmRuZXNzfSkpO2A7XHJcbiAgICB9XHJcbn1cclxuIl19