"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TextureAssetNode_1 = __importDefault(require("./TextureAssetNode"));
class Texture2DAssetNode extends TextureAssetNode_1.default {
    generateCode() {
        return `sampler2D ${this.getOutputVarName(0)} = ${this.getInputValue(0)};`;
    }
}
exports.default = Texture2DAssetNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dHVyZTJEQXNzZXROb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9pbnB1dC90ZXh0dXJlL1RleHR1cmUyREFzc2V0Tm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBFQUFrRDtBQUVsRCxNQUFxQixrQkFBbUIsU0FBUSwwQkFBZ0I7SUFDNUQsWUFBWTtRQUNSLE9BQU8sYUFBYSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQy9FLENBQUM7Q0FDSjtBQUpELHFDQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRleHR1cmVBc3NldE5vZGUgZnJvbSBcIi4vVGV4dHVyZUFzc2V0Tm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0dXJlMkRBc3NldE5vZGUgZXh0ZW5kcyBUZXh0dXJlQXNzZXROb2RlIHtcbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xuICAgICAgICByZXR1cm4gYHNhbXBsZXIyRCAke3RoaXMuZ2V0T3V0cHV0VmFyTmFtZSgwKX0gPSAke3RoaXMuZ2V0SW5wdXRWYWx1ZSgwKX07YDtcbiAgICB9XG59XG4iXX0=