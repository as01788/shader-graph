"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const type_1 = require("../../type");
class CombineNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
    }
    generateCode() {
        let slotR = this.getSlotWithSlotName('R');
        let slotG = this.getSlotWithSlotName('G');
        let slotB = this.getSlotWithSlotName('B');
        let slotA = this.getSlotWithSlotName('A');
        let slotRGBA = this.getSlotWithSlotName('RGBA');
        let slotRGB = this.getSlotWithSlotName('RGB');
        let slotRG = this.getSlotWithSlotName('RG');
        let code = '';
        if (slotRGBA && slotRGBA.connectSlot) {
            code += `${slotRGBA === null || slotRGBA === void 0 ? void 0 : slotRGBA.varDefine} = vec4(${slotR === null || slotR === void 0 ? void 0 : slotR.slotValue}, ${slotG === null || slotG === void 0 ? void 0 : slotG.slotValue}, ${slotB === null || slotB === void 0 ? void 0 : slotB.slotValue}, ${slotA === null || slotA === void 0 ? void 0 : slotA.slotValue});\n`;
        }
        if (slotRGB && slotRGB.connectSlot) {
            code += `${slotRGB === null || slotRGB === void 0 ? void 0 : slotRGB.varDefine} = vec3(${slotR === null || slotR === void 0 ? void 0 : slotR.slotValue}, ${slotG === null || slotG === void 0 ? void 0 : slotG.slotValue}, ${slotB === null || slotB === void 0 ? void 0 : slotB.slotValue});\n`;
        }
        if (slotRG && slotRG.connectSlot) {
            code += `${slotRG === null || slotRG === void 0 ? void 0 : slotRG.varDefine} = vec2(${slotR === null || slotR === void 0 ? void 0 : slotR.slotValue}, ${slotG === null || slotG === void 0 ? void 0 : slotG.slotValue});\n`;
        }
        return code;
    }
}
exports.default = CombineNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tYmluZU5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL2NoYW5uZWwvQ29tYmluZU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBd0M7QUFDeEMscUNBQW1EO0FBRW5ELE1BQXFCLFdBQVksU0FBUSxpQkFBVTtJQUFuRDs7UUFDSSwwQkFBcUIsR0FBRyw0QkFBcUIsQ0FBQyxLQUFLLENBQUM7SUEyQnhELENBQUM7SUF6QkcsWUFBWTtRQUVSLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUxQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU1QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFFZCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ2xDLElBQUksSUFBSSxHQUFHLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxTQUFTLFdBQVcsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFNBQVMsS0FBSyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsU0FBUyxLQUFLLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxTQUFTLEtBQUssS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFNBQVMsTUFBTSxDQUFDO1NBQ2xJO1FBQ0QsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUNoQyxJQUFJLElBQUksR0FBRyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsU0FBUyxXQUFXLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxTQUFTLEtBQUssS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFNBQVMsS0FBSyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsU0FBUyxNQUFNLENBQUM7U0FDNUc7UUFDRCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO1lBQzlCLElBQUksSUFBSSxHQUFHLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxTQUFTLFdBQVcsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFNBQVMsS0FBSyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsU0FBUyxNQUFNLENBQUM7U0FDdEY7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUE1QkQsOEJBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hhZGVyTm9kZSB9IGZyb20gXCIuLi8uLi9iYXNlXCI7XG5pbXBvcnQgeyBDb25jcmV0ZVByZWNpc2lvblR5cGUgfSBmcm9tIFwiLi4vLi4vdHlwZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21iaW5lTm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xuICAgIGNvbmNyZXRlUHJlY2lzaW9uVHlwZSA9IENvbmNyZXRlUHJlY2lzaW9uVHlwZS5GaXhlZDtcblxuICAgIGdlbmVyYXRlQ29kZSAoKSB7XG5cbiAgICAgICAgbGV0IHNsb3RSID0gdGhpcy5nZXRTbG90V2l0aFNsb3ROYW1lKCdSJyk7XG4gICAgICAgIGxldCBzbG90RyA9IHRoaXMuZ2V0U2xvdFdpdGhTbG90TmFtZSgnRycpO1xuICAgICAgICBsZXQgc2xvdEIgPSB0aGlzLmdldFNsb3RXaXRoU2xvdE5hbWUoJ0InKTtcbiAgICAgICAgbGV0IHNsb3RBID0gdGhpcy5nZXRTbG90V2l0aFNsb3ROYW1lKCdBJyk7XG5cbiAgICAgICAgbGV0IHNsb3RSR0JBID0gdGhpcy5nZXRTbG90V2l0aFNsb3ROYW1lKCdSR0JBJyk7XG4gICAgICAgIGxldCBzbG90UkdCID0gdGhpcy5nZXRTbG90V2l0aFNsb3ROYW1lKCdSR0InKTtcbiAgICAgICAgbGV0IHNsb3RSRyA9IHRoaXMuZ2V0U2xvdFdpdGhTbG90TmFtZSgnUkcnKTtcblxuICAgICAgICBsZXQgY29kZSA9ICcnO1xuXG4gICAgICAgIGlmIChzbG90UkdCQSAmJiBzbG90UkdCQS5jb25uZWN0U2xvdCkge1xuICAgICAgICAgICAgY29kZSArPSBgJHtzbG90UkdCQT8udmFyRGVmaW5lfSA9IHZlYzQoJHtzbG90Uj8uc2xvdFZhbHVlfSwgJHtzbG90Rz8uc2xvdFZhbHVlfSwgJHtzbG90Qj8uc2xvdFZhbHVlfSwgJHtzbG90QT8uc2xvdFZhbHVlfSk7XFxuYDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2xvdFJHQiAmJiBzbG90UkdCLmNvbm5lY3RTbG90KSB7XG4gICAgICAgICAgICBjb2RlICs9IGAke3Nsb3RSR0I/LnZhckRlZmluZX0gPSB2ZWMzKCR7c2xvdFI/LnNsb3RWYWx1ZX0sICR7c2xvdEc/LnNsb3RWYWx1ZX0sICR7c2xvdEI/LnNsb3RWYWx1ZX0pO1xcbmA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNsb3RSRyAmJiBzbG90UkcuY29ubmVjdFNsb3QpIHtcbiAgICAgICAgICAgIGNvZGUgKz0gYCR7c2xvdFJHPy52YXJEZWZpbmV9ID0gdmVjMigke3Nsb3RSPy5zbG90VmFsdWV9LCAke3Nsb3RHPy5zbG90VmFsdWV9KTtcXG5gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG59XG4iXX0=