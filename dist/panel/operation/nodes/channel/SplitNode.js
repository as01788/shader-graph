"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const type_1 = require("../../type");
class SplitNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
    }
    generateCode() {
        let Value = this.getInputValue(0);
        let code = '';
        let slotR = this.getOutputSlotWithSlotName('R');
        let slotG = this.getOutputSlotWithSlotName('G');
        let slotB = this.getOutputSlotWithSlotName('B');
        let slotA = this.getOutputSlotWithSlotName('A');
        if (slotR && slotR.connectSlot) {
            code += `float ${slotR === null || slotR === void 0 ? void 0 : slotR.varName} = ${Value}.r;\n`;
        }
        if (slotG && slotG.connectSlot) {
            code += `float ${slotG === null || slotG === void 0 ? void 0 : slotG.varName} = ${Value}.g;\n`;
        }
        if (slotB && slotB.connectSlot) {
            code += `float ${slotB === null || slotB === void 0 ? void 0 : slotB.varName} = ${Value}.b;\n`;
        }
        if (slotA && slotA.connectSlot) {
            code += `float ${slotA === null || slotA === void 0 ? void 0 : slotA.varName} = ${Value}.a;\n`;
        }
        return code;
    }
}
exports.default = SplitNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BsaXROb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9jaGFubmVsL1NwbGl0Tm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUF3QztBQUN4QyxxQ0FBbUQ7QUFFbkQsTUFBcUIsU0FBVSxTQUFRLGlCQUFVO0lBQWpEOztRQUNJLDBCQUFxQixHQUFHLDRCQUFxQixDQUFDLEtBQUssQ0FBQztJQXVCeEQsQ0FBQztJQXJCRyxZQUFZO1FBQ1IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUM1QixJQUFJLElBQUksU0FBUyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsT0FBTyxNQUFNLEtBQUssT0FBTyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUM1QixJQUFJLElBQUksU0FBUyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsT0FBTyxNQUFNLEtBQUssT0FBTyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUM1QixJQUFJLElBQUksU0FBUyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsT0FBTyxNQUFNLEtBQUssT0FBTyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUM1QixJQUFJLElBQUksU0FBUyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsT0FBTyxNQUFNLEtBQUssT0FBTyxDQUFDO1NBQ3JEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBeEJELDRCQXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vLi4vYmFzZVwiO1xuaW1wb3J0IHsgQ29uY3JldGVQcmVjaXNpb25UeXBlIH0gZnJvbSBcIi4uLy4uL3R5cGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BsaXROb2RlIGV4dGVuZHMgU2hhZGVyTm9kZSB7XG4gICAgY29uY3JldGVQcmVjaXNpb25UeXBlID0gQ29uY3JldGVQcmVjaXNpb25UeXBlLkZpeGVkO1xuXG4gICAgZ2VuZXJhdGVDb2RlICgpIHtcbiAgICAgICAgbGV0IFZhbHVlID0gdGhpcy5nZXRJbnB1dFZhbHVlKDApO1xuICAgICAgICBsZXQgY29kZSA9ICcnO1xuICAgICAgICBsZXQgc2xvdFIgPSB0aGlzLmdldE91dHB1dFNsb3RXaXRoU2xvdE5hbWUoJ1InKTtcbiAgICAgICAgbGV0IHNsb3RHID0gdGhpcy5nZXRPdXRwdXRTbG90V2l0aFNsb3ROYW1lKCdHJyk7XG4gICAgICAgIGxldCBzbG90QiA9IHRoaXMuZ2V0T3V0cHV0U2xvdFdpdGhTbG90TmFtZSgnQicpO1xuICAgICAgICBsZXQgc2xvdEEgPSB0aGlzLmdldE91dHB1dFNsb3RXaXRoU2xvdE5hbWUoJ0EnKTtcbiAgICAgICAgaWYgKHNsb3RSICYmIHNsb3RSLmNvbm5lY3RTbG90KSB7XG4gICAgICAgICAgICBjb2RlICs9IGBmbG9hdCAke3Nsb3RSPy52YXJOYW1lfSA9ICR7VmFsdWV9LnI7XFxuYDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2xvdEcgJiYgc2xvdEcuY29ubmVjdFNsb3QpIHtcbiAgICAgICAgICAgIGNvZGUgKz0gYGZsb2F0ICR7c2xvdEc/LnZhck5hbWV9ID0gJHtWYWx1ZX0uZztcXG5gO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzbG90QiAmJiBzbG90Qi5jb25uZWN0U2xvdCkge1xuICAgICAgICAgICAgY29kZSArPSBgZmxvYXQgJHtzbG90Qj8udmFyTmFtZX0gPSAke1ZhbHVlfS5iO1xcbmA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNsb3RBICYmIHNsb3RBLmNvbm5lY3RTbG90KSB7XG4gICAgICAgICAgICBjb2RlICs9IGBmbG9hdCAke3Nsb3RBPy52YXJOYW1lfSA9ICR7VmFsdWV9LmE7XFxuYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG59XG4iXX0=