"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
class PosterizeNode extends base_1.ShaderNode {
    generateCode() {
        return `${this.getOutputVarDefine(0)} = floor(${this.getInputValue(0)} / (1. / ${this.getInputValue(1)})) * (1. / ${this.getInputValue(1)});`;
    }
}
exports.default = PosterizeNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zdGVyaXplTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvbWF0aC9hZHZhbmNlZC9Qb3N0ZXJpemVOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQTJDO0FBRTNDLE1BQXFCLGFBQWMsU0FBUSxpQkFBVTtJQUNqRCxZQUFZO1FBQ1IsT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsWUFBWSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGNBQWMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2xKLENBQUM7Q0FDSjtBQUpELGdDQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hhZGVyTm9kZSB9IGZyb20gXCIuLi8uLi8uLi9iYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc3Rlcml6ZU5vZGUgZXh0ZW5kcyBTaGFkZXJOb2RlIHtcbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRPdXRwdXRWYXJEZWZpbmUoMCl9ID0gZmxvb3IoJHt0aGlzLmdldElucHV0VmFsdWUoMCl9IC8gKDEuIC8gJHt0aGlzLmdldElucHV0VmFsdWUoMSl9KSkgKiAoMS4gLyAke3RoaXMuZ2V0SW5wdXRWYWx1ZSgxKX0pO2A7XG4gICAgfVxufVxuIl19