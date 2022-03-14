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
        let radius = this.getInputValue(3);
        return `${this.getOutputVarDefine(0)} = reoundRect(${uv}, ${width}, ${height}, ${radius});`;
    }
}
exports.default = RectangleNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91bmRlZFJlY3RhbmdsZU5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL3Byb2NlZHVyYWwvc2hhcGUvUm91bmRlZFJlY3RhbmdsZU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0REFBb0M7QUFFcEMsTUFBcUIsYUFBYyxTQUFRLG1CQUFTO0lBQ2hELFlBQVk7UUFDUixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLEtBQUssS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNLElBQUksQ0FBQztJQUNoRyxDQUFDO0NBQ0o7QUFSRCxnQ0FRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGFwZU5vZGUgZnJvbSBcIi4vU2hhcGVOb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3RhbmdsZU5vZGUgZXh0ZW5kcyBTaGFwZU5vZGUge1xuICAgIGdlbmVyYXRlQ29kZSAoKSB7XG4gICAgICAgIGxldCB1diA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgwKTtcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5nZXRJbnB1dFZhbHVlKDEpO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5nZXRJbnB1dFZhbHVlKDIpO1xuICAgICAgICBsZXQgcmFkaXVzID0gdGhpcy5nZXRJbnB1dFZhbHVlKDMpO1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRPdXRwdXRWYXJEZWZpbmUoMCl9ID0gcmVvdW5kUmVjdCgke3V2fSwgJHt3aWR0aH0sICR7aGVpZ2h0fSwgJHtyYWRpdXN9KTtgO1xuICAgIH1cbn1cbiJdfQ==