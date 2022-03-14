"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputNode_1 = __importDefault(require("../InputNode"));
const type_1 = require("../../../type");
class SampleTexture2DNode extends InputNode_1.default {
    beforeGenreateCode() {
        let viewSlot = this.getSlotWithSlotName('ViewDir');
        if (!(viewSlot === null || viewSlot === void 0 ? void 0 : viewSlot.connectSlot)) {
            this.depVarings.push(type_1.ViewDirectionSpace.Object);
        }
        let normalSlot = this.getSlotWithSlotName('Normal');
        if (!(normalSlot === null || normalSlot === void 0 ? void 0 : normalSlot.connectSlot)) {
            this.depVarings.push(type_1.NormalSpace.Object);
        }
    }
    generateCode() {
        var _a;
        let cubeSlot = this.getSlotWithSlotName('Cube');
        let node = (cubeSlot === null || cubeSlot === void 0 ? void 0 : cubeSlot.connectSlot) && (cubeSlot === null || cubeSlot === void 0 ? void 0 : cubeSlot.connectSlot.node);
        if (!node) {
            return '';
        }
        let V = 'view';
        let N = 'normal';
        let viewSlot = this.getSlotWithSlotName('ViewDir');
        if (viewSlot === null || viewSlot === void 0 ? void 0 : viewSlot.connectSlot) {
            V = viewSlot === null || viewSlot === void 0 ? void 0 : viewSlot.connectSlot.varName;
        }
        let normalSlot = this.getSlotWithSlotName('Normal');
        if (normalSlot === null || normalSlot === void 0 ? void 0 : normalSlot.connectSlot) {
            N = normalSlot === null || normalSlot === void 0 ? void 0 : normalSlot.connectSlot.varName;
        }
        let R = `${this.getOutputVarName(0)}_R`;
        let code = '';
        code += `vec3 ${R} = reflect( -normalize( ${V} ), ${N} );\n`;
        code += `${this.getOutputVarDefine(0)} = texture(${(_a = node.property) === null || _a === void 0 ? void 0 : _a.name}, ${R});\n`;
        return code;
    }
}
exports.default = SampleTexture2DNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FtcGxlQ3ViZW1hcE5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL2lucHV0L3RleHR1cmUvU2FtcGxlQ3ViZW1hcE5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw2REFBcUM7QUFDckMsd0NBQXVHO0FBSXZHLE1BQXFCLG1CQUFvQixTQUFRLG1CQUFTO0lBRXRELGtCQUFrQjtRQUNkLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRCxJQUFJLEVBQUMsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFdBQVcsQ0FBQSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHlCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELElBQUksRUFBQyxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsV0FBVyxDQUFBLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsa0JBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUM7SUFFRCxZQUFZOztRQUNSLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxJQUFJLElBQUksR0FBRyxDQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxXQUFXLE1BQUksUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFdBQVcsQ0FBQyxJQUFvQixDQUFBLENBQUM7UUFDL0UsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7UUFFakIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELElBQUksUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFdBQVcsRUFBRTtZQUN2QixDQUFDLEdBQUcsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUM7U0FDckM7UUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEQsSUFBSSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsV0FBVyxFQUFFO1lBQ3pCLENBQUMsR0FBRyxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQztTQUN2QztRQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFeEMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ2IsSUFBSSxJQUFJLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFBO1FBQzVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsY0FBYyxNQUFBLElBQUksQ0FBQyxRQUFRLDBDQUFFLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQTtRQUNsRixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUF2Q0Qsc0NBdUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElucHV0Tm9kZSBmcm9tIFwiLi4vSW5wdXROb2RlXCI7XG5pbXBvcnQgeyBOb3JtYWxNYXBTcGFjZSwgTm9ybWFsU3BhY2UsIENvbmNyZXRlUHJlY2lzaW9uVHlwZSwgVmlld0RpcmVjdGlvblNwYWNlIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVcIjtcbmltcG9ydCBQcm9wZXJ0eU5vZGUgZnJvbSBcIi4uL1Byb3BlcnR5Tm9kZVwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNhbXBsZVRleHR1cmUyRE5vZGUgZXh0ZW5kcyBJbnB1dE5vZGUge1xuXG4gICAgYmVmb3JlR2VucmVhdGVDb2RlICgpIHtcbiAgICAgICAgbGV0IHZpZXdTbG90ID0gdGhpcy5nZXRTbG90V2l0aFNsb3ROYW1lKCdWaWV3RGlyJyk7XG4gICAgICAgIGlmICghdmlld1Nsb3Q/LmNvbm5lY3RTbG90KSB7XG4gICAgICAgICAgICB0aGlzLmRlcFZhcmluZ3MucHVzaChWaWV3RGlyZWN0aW9uU3BhY2UuT2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbm9ybWFsU2xvdCA9IHRoaXMuZ2V0U2xvdFdpdGhTbG90TmFtZSgnTm9ybWFsJyk7XG4gICAgICAgIGlmICghbm9ybWFsU2xvdD8uY29ubmVjdFNsb3QpIHtcbiAgICAgICAgICAgIHRoaXMuZGVwVmFyaW5ncy5wdXNoKE5vcm1hbFNwYWNlLk9iamVjdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xuICAgICAgICBsZXQgY3ViZVNsb3QgPSB0aGlzLmdldFNsb3RXaXRoU2xvdE5hbWUoJ0N1YmUnKTtcbiAgICAgICAgbGV0IG5vZGUgPSBjdWJlU2xvdD8uY29ubmVjdFNsb3QgJiYgY3ViZVNsb3Q/LmNvbm5lY3RTbG90Lm5vZGUgYXMgUHJvcGVydHlOb2RlO1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBWID0gJ3ZpZXcnO1xuICAgICAgICBsZXQgTiA9ICdub3JtYWwnO1xuXG4gICAgICAgIGxldCB2aWV3U2xvdCA9IHRoaXMuZ2V0U2xvdFdpdGhTbG90TmFtZSgnVmlld0RpcicpO1xuICAgICAgICBpZiAodmlld1Nsb3Q/LmNvbm5lY3RTbG90KSB7XG4gICAgICAgICAgICBWID0gdmlld1Nsb3Q/LmNvbm5lY3RTbG90LnZhck5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5vcm1hbFNsb3QgPSB0aGlzLmdldFNsb3RXaXRoU2xvdE5hbWUoJ05vcm1hbCcpO1xuICAgICAgICBpZiAobm9ybWFsU2xvdD8uY29ubmVjdFNsb3QpIHtcbiAgICAgICAgICAgIE4gPSBub3JtYWxTbG90Py5jb25uZWN0U2xvdC52YXJOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IFIgPSBgJHt0aGlzLmdldE91dHB1dFZhck5hbWUoMCl9X1JgO1xuXG4gICAgICAgIGxldCBjb2RlID0gJydcbiAgICAgICAgY29kZSArPSBgdmVjMyAke1J9ID0gcmVmbGVjdCggLW5vcm1hbGl6ZSggJHtWfSApLCAke059ICk7XFxuYFxuICAgICAgICBjb2RlICs9IGAke3RoaXMuZ2V0T3V0cHV0VmFyRGVmaW5lKDApfSA9IHRleHR1cmUoJHtub2RlLnByb3BlcnR5Py5uYW1lfSwgJHtSfSk7XFxuYFxuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG59XG5cbiJdfQ==