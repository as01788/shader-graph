"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShapeNode_1 = __importDefault(require("./ShapeNode"));
class RectangleNode extends ShapeNode_1.default {
    generateCode() {
        let uv = this.getInputValue(0);
        let width = this.getInputValue(1);
        let height = this.getInputValue(2);
        return `${this.getOutputVarDefine(0)} = rect(${uv}, ${width}, ${height});`;
    }
}
exports.default = RectangleNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjdGFuZ2xlTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvcHJvY2VkdXJhbC9zaGFwZS9SZWN0YW5nbGVOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQW9DO0FBRXBDLE1BQXFCLGFBQWMsU0FBUSxtQkFBUztJQUVoRCxZQUFZO1FBQ1IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkMsT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxLQUFLLE1BQU0sSUFBSSxDQUFDO0lBQy9FLENBQUM7Q0FDSjtBQVJELGdDQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoYXBlTm9kZSBmcm9tIFwiLi9TaGFwZU5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdGFuZ2xlTm9kZSBleHRlbmRzIFNoYXBlTm9kZSB7XG4gICAgXG4gICAgZ2VuZXJhdGVDb2RlICgpIHtcbiAgICAgICAgbGV0IHV2ID0gdGhpcy5nZXRJbnB1dFZhbHVlKDApO1xuICAgICAgICBsZXQgd2lkdGggPSB0aGlzLmdldElucHV0VmFsdWUoMSk7XG4gICAgICAgIGxldCBoZWlnaHQgPSB0aGlzLmdldElucHV0VmFsdWUoMik7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldE91dHB1dFZhckRlZmluZSgwKX0gPSByZWN0KCR7dXZ9LCAke3dpZHRofSwgJHtoZWlnaHR9KTtgO1xuICAgIH1cbn1cbiJdfQ==