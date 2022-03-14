"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TextureAssetNode_1 = __importDefault(require("./TextureAssetNode"));
class CubemapAssetNode extends TextureAssetNode_1.default {
    generateCode() {
        return `samplerCube ${this.getOutputVarName(0)} = ${this.getInputValue(0)};`;
    }
}
exports.default = CubemapAssetNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3ViZW1hcEFzc2V0Tm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvaW5wdXQvdGV4dHVyZS9DdWJlbWFwQXNzZXROb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMEVBQWtEO0FBRWxELE1BQXFCLGdCQUFpQixTQUFRLDBCQUFnQjtJQUMxRCxZQUFZO1FBQ1IsT0FBTyxlQUFlLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDakYsQ0FBQztDQUNKO0FBSkQsbUNBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGV4dHVyZUFzc2V0Tm9kZSBmcm9tIFwiLi9UZXh0dXJlQXNzZXROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1YmVtYXBBc3NldE5vZGUgZXh0ZW5kcyBUZXh0dXJlQXNzZXROb2RlIHtcbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xuICAgICAgICByZXR1cm4gYHNhbXBsZXJDdWJlICR7dGhpcy5nZXRPdXRwdXRWYXJOYW1lKDApfSA9ICR7dGhpcy5nZXRJbnB1dFZhbHVlKDApfTtgO1xuICAgIH1cbn1cbiJdfQ==