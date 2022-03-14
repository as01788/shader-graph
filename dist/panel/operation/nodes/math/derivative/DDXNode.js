"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
class DDXNode extends base_1.ShaderNode {
    generateCode() {
        return `${this.getOutputVarDefine(0)} = dFdx(${this.getInputValue(0)});`;
    }
}
exports.default = DDXNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRERYTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvbWF0aC9kZXJpdmF0aXZlL0REWE5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkM7QUFFM0MsTUFBcUIsT0FBUSxTQUFRLGlCQUFVO0lBQzNDLFlBQVk7UUFDUixPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM3RSxDQUFDO0NBQ0o7QUFKRCwwQkFJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vLi4vLi4vYmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBERFhOb2RlIGV4dGVuZHMgU2hhZGVyTm9kZSB7XG4gICAgZ2VuZXJhdGVDb2RlICgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0T3V0cHV0VmFyRGVmaW5lKDApfSA9IGRGZHgoJHt0aGlzLmdldElucHV0VmFsdWUoMCl9KTtgO1xuICAgIH1cbn1cbiJdfQ==