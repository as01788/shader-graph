"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputNode_1 = __importDefault(require("../InputNode"));
class TimeNode extends InputNode_1.default {
    generateCode() {
        let Time = this.getOutputSlotWithSlotName('Time');
        let SineTime = this.getOutputSlotWithSlotName('Sine Time');
        let CosineTime = this.getOutputSlotWithSlotName('Cosine Time');
        let DeltaTime = this.getOutputSlotWithSlotName('Delta Time');
        let SmoothDelta = this.getOutputSlotWithSlotName('Smooth Delta');
        let code = '';
        if (Time === null || Time === void 0 ? void 0 : Time.connectSlot) {
            code += `float ${Time.varName} = cc_time.x;`;
        }
        if (SineTime === null || SineTime === void 0 ? void 0 : SineTime.connectSlot) {
            code += `float ${SineTime.varName} = sin(cc_time.x);`;
        }
        if (CosineTime === null || CosineTime === void 0 ? void 0 : CosineTime.connectSlot) {
            code += `float ${CosineTime.varName} = cos(cc_time.x);`;
        }
        if (DeltaTime === null || DeltaTime === void 0 ? void 0 : DeltaTime.connectSlot) {
            code += `float ${DeltaTime.varName} = cc_time.y;`;
        }
        if (SmoothDelta === null || SmoothDelta === void 0 ? void 0 : SmoothDelta.connectSlot) {
            console.warn('Not support smooth delta time');
            code += `float ${SmoothDelta.varName} = cc_time.y;`;
        }
        return code;
    }
}
exports.default = TimeNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZU5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL2lucHV0L2Jhc2ljL1RpbWVOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXFDO0FBRXJDLE1BQXFCLFFBQVMsU0FBUSxtQkFBUztJQUMzQyxZQUFZO1FBQ1IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVqRSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7UUFDYixJQUFJLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxXQUFXLEVBQUU7WUFDbkIsSUFBSSxJQUFJLFNBQVMsSUFBSSxDQUFDLE9BQU8sZUFBZSxDQUFBO1NBQy9DO1FBQ0QsSUFBSSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsV0FBVyxFQUFFO1lBQ3ZCLElBQUksSUFBSSxTQUFTLFFBQVEsQ0FBQyxPQUFPLG9CQUFvQixDQUFBO1NBQ3hEO1FBQ0QsSUFBSSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsV0FBVyxFQUFFO1lBQ3pCLElBQUksSUFBSSxTQUFTLFVBQVUsQ0FBQyxPQUFPLG9CQUFvQixDQUFBO1NBQzFEO1FBQ0QsSUFBSSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsV0FBVyxFQUFFO1lBQ3hCLElBQUksSUFBSSxTQUFTLFNBQVMsQ0FBQyxPQUFPLGVBQWUsQ0FBQTtTQUNwRDtRQUNELElBQUksV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLFdBQVcsRUFBRTtZQUMxQixPQUFPLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDOUMsSUFBSSxJQUFJLFNBQVMsV0FBVyxDQUFDLE9BQU8sZUFBZSxDQUFBO1NBQ3REO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBNUJELDJCQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbnB1dE5vZGUgZnJvbSBcIi4uL0lucHV0Tm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lTm9kZSBleHRlbmRzIElucHV0Tm9kZSB7XG4gICAgZ2VuZXJhdGVDb2RlICgpIHtcbiAgICAgICAgbGV0IFRpbWUgPSB0aGlzLmdldE91dHB1dFNsb3RXaXRoU2xvdE5hbWUoJ1RpbWUnKTtcbiAgICAgICAgbGV0IFNpbmVUaW1lID0gdGhpcy5nZXRPdXRwdXRTbG90V2l0aFNsb3ROYW1lKCdTaW5lIFRpbWUnKTtcbiAgICAgICAgbGV0IENvc2luZVRpbWUgPSB0aGlzLmdldE91dHB1dFNsb3RXaXRoU2xvdE5hbWUoJ0Nvc2luZSBUaW1lJyk7XG4gICAgICAgIGxldCBEZWx0YVRpbWUgPSB0aGlzLmdldE91dHB1dFNsb3RXaXRoU2xvdE5hbWUoJ0RlbHRhIFRpbWUnKTtcbiAgICAgICAgbGV0IFNtb290aERlbHRhID0gdGhpcy5nZXRPdXRwdXRTbG90V2l0aFNsb3ROYW1lKCdTbW9vdGggRGVsdGEnKTtcblxuICAgICAgICBsZXQgY29kZSA9ICcnXG4gICAgICAgIGlmIChUaW1lPy5jb25uZWN0U2xvdCkge1xuICAgICAgICAgICAgY29kZSArPSBgZmxvYXQgJHtUaW1lLnZhck5hbWV9ID0gY2NfdGltZS54O2BcbiAgICAgICAgfVxuICAgICAgICBpZiAoU2luZVRpbWU/LmNvbm5lY3RTbG90KSB7XG4gICAgICAgICAgICBjb2RlICs9IGBmbG9hdCAke1NpbmVUaW1lLnZhck5hbWV9ID0gc2luKGNjX3RpbWUueCk7YFxuICAgICAgICB9XG4gICAgICAgIGlmIChDb3NpbmVUaW1lPy5jb25uZWN0U2xvdCkge1xuICAgICAgICAgICAgY29kZSArPSBgZmxvYXQgJHtDb3NpbmVUaW1lLnZhck5hbWV9ID0gY29zKGNjX3RpbWUueCk7YFxuICAgICAgICB9XG4gICAgICAgIGlmIChEZWx0YVRpbWU/LmNvbm5lY3RTbG90KSB7XG4gICAgICAgICAgICBjb2RlICs9IGBmbG9hdCAke0RlbHRhVGltZS52YXJOYW1lfSA9IGNjX3RpbWUueTtgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKFNtb290aERlbHRhPy5jb25uZWN0U2xvdCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdOb3Qgc3VwcG9ydCBzbW9vdGggZGVsdGEgdGltZScpO1xuICAgICAgICAgICAgY29kZSArPSBgZmxvYXQgJHtTbW9vdGhEZWx0YS52YXJOYW1lfSA9IGNjX3RpbWUueTtgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG59XG5cbiJdfQ==