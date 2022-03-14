"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputNode_1 = __importDefault(require("../InputNode"));
const type_1 = require("../../../type");
var TextureType;
(function (TextureType) {
    TextureType[TextureType["Default"] = 0] = "Default";
    TextureType[TextureType["Normal"] = 1] = "Normal";
})(TextureType || (TextureType = {}));
var TextureNormalSpace;
(function (TextureNormalSpace) {
    TextureNormalSpace[TextureNormalSpace["Tangent"] = 0] = "Tangent";
    TextureNormalSpace[TextureNormalSpace["Object"] = 1] = "Object";
})(TextureNormalSpace || (TextureNormalSpace = {}));
class SampleTexture2DNode extends InputNode_1.default {
    constructor(data) {
        super(data);
        if (this.data.m_TextureType === TextureType.Normal && this.data.m_NormalMapSpace === TextureNormalSpace.Tangent) {
            this.depVarings.push(type_1.NormalMapSpace, type_1.NormalSpace.World);
        }
    }
    generateCode() {
        let texture = this.getSlotWithSlotName('Texture');
        let rgba = this.getSlotWithSlotName('RGBA');
        let rgbaVarName = rgba === null || rgba === void 0 ? void 0 : rgba.varName;
        let code;
        if (!(texture === null || texture === void 0 ? void 0 : texture.connectSlot)) {
            code = `vec4 ${rgbaVarName} = vec4(1.);\n`;
        }
        else {
            let uv;
            if (!this.inputSlots[1].connectSlot) {
                uv = 'v_uv';
            }
            else {
                uv = this.getInputValue(1);
            }
            code = `vec4 ${rgbaVarName} = texture(${texture === null || texture === void 0 ? void 0 : texture.connectSlot.varName}, ${uv});\n`;
        }
        if (this.data.m_TextureType === TextureType.Normal && this.data.m_NormalMapSpace === type_1.NormalSpace.Tangent) {
            code += `${rgbaVarName}.xyz -= vec3(0.5);\n`;
            code += `${rgbaVarName}.xyz = \n`;
            code += `  ${rgbaVarName}.x * normalize(v_tangent) +\n`;
            code += `  ${rgbaVarName}.y * normalize(v_bitangent) +\n`;
            code += `  ${rgbaVarName}.z * normalize(worldNormal);\n`;
        }
        let r = this.getSlotWithSlotName('R');
        if (r && r.connectSlot) {
            code += `float ${r.varName} = ${rgbaVarName}.r;\n`;
        }
        let g = this.getSlotWithSlotName('g');
        if (g && g.connectSlot) {
            code += `float ${g.varName} = ${rgbaVarName}.g;\n`;
        }
        let b = this.getSlotWithSlotName('b');
        if (b && b.connectSlot) {
            code += `float ${b.varName} = ${rgbaVarName}.b;\n`;
        }
        let a = this.getSlotWithSlotName('a');
        if (a && a.connectSlot) {
            code += `float ${a.varName} = ${rgbaVarName}.a;\n`;
        }
        return code;
    }
}
exports.default = SampleTexture2DNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FtcGxlVGV4dHVyZTJETm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvaW5wdXQvdGV4dHVyZS9TYW1wbGVUZXh0dXJlMkROb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXFDO0FBQ3JDLHdDQUE0RDtBQUU1RCxJQUFLLFdBR0o7QUFIRCxXQUFLLFdBQVc7SUFDWixtREFBTyxDQUFBO0lBQ1AsaURBQU0sQ0FBQTtBQUNWLENBQUMsRUFISSxXQUFXLEtBQVgsV0FBVyxRQUdmO0FBRUQsSUFBSyxrQkFHSjtBQUhELFdBQUssa0JBQWtCO0lBQ25CLGlFQUFPLENBQUE7SUFDUCwrREFBTSxDQUFBO0FBQ1YsQ0FBQyxFQUhJLGtCQUFrQixLQUFsQixrQkFBa0IsUUFHdEI7QUFFRCxNQUFxQixtQkFBb0IsU0FBUSxtQkFBUztJQUN0RCxZQUFhLElBQUk7UUFDYixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLFdBQVcsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7WUFDN0csSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQWMsRUFBRSxrQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQzFEO0lBQ0wsQ0FBQztJQUVELFlBQVk7UUFDUixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTVDLElBQUksV0FBVyxHQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxPQUFPLENBQUM7UUFDaEMsSUFBSSxJQUFJLENBQUM7UUFDVCxJQUFJLEVBQUMsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFdBQVcsQ0FBQSxFQUFFO1lBQ3ZCLElBQUksR0FBRyxRQUFRLFdBQVcsZ0JBQWdCLENBQUM7U0FDOUM7YUFDSTtZQUNELElBQUksRUFBRSxDQUFDO1lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFO2dCQUNqQyxFQUFFLEdBQUcsTUFBTSxDQUFDO2FBQ2Y7aUJBQ0k7Z0JBQ0QsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUI7WUFDRCxJQUFJLEdBQUcsUUFBUSxXQUFXLGNBQWMsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFdBQVcsQ0FBQyxPQUFPLEtBQUssRUFBRSxNQUFNLENBQUM7U0FDckY7UUFHRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLFdBQVcsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxrQkFBVyxDQUFDLE9BQU8sRUFBRTtZQUN0RyxJQUFJLElBQUksR0FBRyxXQUFXLHNCQUFzQixDQUFDO1lBQzdDLElBQUksSUFBSSxHQUFHLFdBQVcsV0FBVyxDQUFDO1lBQ2xDLElBQUksSUFBSSxLQUFLLFdBQVcsK0JBQStCLENBQUM7WUFDeEQsSUFBSSxJQUFJLEtBQUssV0FBVyxpQ0FBaUMsQ0FBQztZQUMxRCxJQUFJLElBQUksS0FBSyxXQUFXLGdDQUFnQyxDQUFDO1NBQzVEO1FBRUQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxXQUFXLE9BQU8sQ0FBQztTQUN0RDtRQUNELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksSUFBSSxTQUFTLENBQUMsQ0FBQyxPQUFPLE1BQU0sV0FBVyxPQUFPLENBQUM7U0FDdEQ7UUFDRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLElBQUksU0FBUyxDQUFDLENBQUMsT0FBTyxNQUFNLFdBQVcsT0FBTyxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxXQUFXLE9BQU8sQ0FBQztTQUN0RDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQXpERCxzQ0F5REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW5wdXROb2RlIGZyb20gXCIuLi9JbnB1dE5vZGVcIjtcbmltcG9ydCB7IE5vcm1hbE1hcFNwYWNlLCBOb3JtYWxTcGFjZSB9IGZyb20gXCIuLi8uLi8uLi90eXBlXCI7XG5cbmVudW0gVGV4dHVyZVR5cGUge1xuICAgIERlZmF1bHQsXG4gICAgTm9ybWFsXG59XG5cbmVudW0gVGV4dHVyZU5vcm1hbFNwYWNlIHtcbiAgICBUYW5nZW50LFxuICAgIE9iamVjdFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTYW1wbGVUZXh0dXJlMkROb2RlIGV4dGVuZHMgSW5wdXROb2RlIHtcbiAgICBjb25zdHJ1Y3RvciAoZGF0YSkge1xuICAgICAgICBzdXBlcihkYXRhKTtcblxuICAgICAgICBpZiAodGhpcy5kYXRhLm1fVGV4dHVyZVR5cGUgPT09IFRleHR1cmVUeXBlLk5vcm1hbCAmJiB0aGlzLmRhdGEubV9Ob3JtYWxNYXBTcGFjZSA9PT0gVGV4dHVyZU5vcm1hbFNwYWNlLlRhbmdlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVwVmFyaW5ncy5wdXNoKE5vcm1hbE1hcFNwYWNlLCBOb3JtYWxTcGFjZS5Xb3JsZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlQ29kZSAoKSB7XG4gICAgICAgIGxldCB0ZXh0dXJlID0gdGhpcy5nZXRTbG90V2l0aFNsb3ROYW1lKCdUZXh0dXJlJyk7XG4gICAgICAgIGxldCByZ2JhID0gdGhpcy5nZXRTbG90V2l0aFNsb3ROYW1lKCdSR0JBJyk7XG5cbiAgICAgICAgbGV0IHJnYmFWYXJOYW1lID0gcmdiYT8udmFyTmFtZTtcbiAgICAgICAgbGV0IGNvZGU7XG4gICAgICAgIGlmICghdGV4dHVyZT8uY29ubmVjdFNsb3QpIHtcbiAgICAgICAgICAgIGNvZGUgPSBgdmVjNCAke3JnYmFWYXJOYW1lfSA9IHZlYzQoMS4pO1xcbmA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgdXY7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5wdXRTbG90c1sxXS5jb25uZWN0U2xvdCkge1xuICAgICAgICAgICAgICAgIHV2ID0gJ3ZfdXYnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXYgPSB0aGlzLmdldElucHV0VmFsdWUoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2RlID0gYHZlYzQgJHtyZ2JhVmFyTmFtZX0gPSB0ZXh0dXJlKCR7dGV4dHVyZT8uY29ubmVjdFNsb3QudmFyTmFtZX0sICR7dXZ9KTtcXG5gO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodGhpcy5kYXRhLm1fVGV4dHVyZVR5cGUgPT09IFRleHR1cmVUeXBlLk5vcm1hbCAmJiB0aGlzLmRhdGEubV9Ob3JtYWxNYXBTcGFjZSA9PT0gTm9ybWFsU3BhY2UuVGFuZ2VudCkge1xuICAgICAgICAgICAgY29kZSArPSBgJHtyZ2JhVmFyTmFtZX0ueHl6IC09IHZlYzMoMC41KTtcXG5gO1xuICAgICAgICAgICAgY29kZSArPSBgJHtyZ2JhVmFyTmFtZX0ueHl6ID0gXFxuYDtcbiAgICAgICAgICAgIGNvZGUgKz0gYCAgJHtyZ2JhVmFyTmFtZX0ueCAqIG5vcm1hbGl6ZSh2X3RhbmdlbnQpICtcXG5gO1xuICAgICAgICAgICAgY29kZSArPSBgICAke3JnYmFWYXJOYW1lfS55ICogbm9ybWFsaXplKHZfYml0YW5nZW50KSArXFxuYDtcbiAgICAgICAgICAgIGNvZGUgKz0gYCAgJHtyZ2JhVmFyTmFtZX0ueiAqIG5vcm1hbGl6ZSh3b3JsZE5vcm1hbCk7XFxuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByID0gdGhpcy5nZXRTbG90V2l0aFNsb3ROYW1lKCdSJyk7XG4gICAgICAgIGlmIChyICYmIHIuY29ubmVjdFNsb3QpIHtcbiAgICAgICAgICAgIGNvZGUgKz0gYGZsb2F0ICR7ci52YXJOYW1lfSA9ICR7cmdiYVZhck5hbWV9LnI7XFxuYDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZyA9IHRoaXMuZ2V0U2xvdFdpdGhTbG90TmFtZSgnZycpO1xuICAgICAgICBpZiAoZyAmJiBnLmNvbm5lY3RTbG90KSB7XG4gICAgICAgICAgICBjb2RlICs9IGBmbG9hdCAke2cudmFyTmFtZX0gPSAke3JnYmFWYXJOYW1lfS5nO1xcbmA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGIgPSB0aGlzLmdldFNsb3RXaXRoU2xvdE5hbWUoJ2InKTtcbiAgICAgICAgaWYgKGIgJiYgYi5jb25uZWN0U2xvdCkge1xuICAgICAgICAgICAgY29kZSArPSBgZmxvYXQgJHtiLnZhck5hbWV9ID0gJHtyZ2JhVmFyTmFtZX0uYjtcXG5gO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhID0gdGhpcy5nZXRTbG90V2l0aFNsb3ROYW1lKCdhJyk7XG4gICAgICAgIGlmIChhICYmIGEuY29ubmVjdFNsb3QpIHtcbiAgICAgICAgICAgIGNvZGUgKz0gYGZsb2F0ICR7YS52YXJOYW1lfSA9ICR7cmdiYVZhck5hbWV9LmE7XFxuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cbn1cblxuIl19