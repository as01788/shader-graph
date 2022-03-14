"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputNode_1 = __importDefault(require("../InputNode"));
class ColorNode extends InputNode_1.default {
    constructor() {
        super(...arguments);
        this.fixedConcretePrecision = 4;
    }
    generateCode() {
        let r, g, b, a;
        if (this.inputSlots.length !== 0) {
            r = this.getInputValue(0);
            g = this.getInputValue(1);
            b = this.getInputValue(2);
            a = this.getInputValue(3);
        }
        else {
            let color = this.data.m_Color.color;
            r = color.r;
            g = color.g;
            b = color.b;
            a = color.a;
        }
        return `vec4 ${this.getOutputVarName(0)} = vec4(${r}, ${g}, ${b}, ${a});`;
    }
}
exports.default = ColorNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sb3JOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9pbnB1dC9iYXNpYy9Db2xvck5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw2REFBcUM7QUFFckMsTUFBcUIsU0FBVSxTQUFRLG1CQUFTO0lBQWhEOztRQUNJLDJCQUFzQixHQUFHLENBQUMsQ0FBQztJQW9CL0IsQ0FBQztJQWxCRyxZQUFZO1FBQ1IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDZixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM5QixDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QjthQUNJO1lBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ3BDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1osQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWixDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNaLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ2Y7UUFFRCxPQUFPLFFBQVEsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQzlFLENBQUM7Q0FDSjtBQXJCRCw0QkFxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW5wdXROb2RlIGZyb20gXCIuLi9JbnB1dE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3JOb2RlIGV4dGVuZHMgSW5wdXROb2RlIHtcbiAgICBmaXhlZENvbmNyZXRlUHJlY2lzaW9uID0gNDtcblxuICAgIGdlbmVyYXRlQ29kZSAoKSB7XG4gICAgICAgIGxldCByLCBnLCBiLCBhO1xuICAgICAgICBpZiAodGhpcy5pbnB1dFNsb3RzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgciA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgwKTtcbiAgICAgICAgICAgIGcgPSB0aGlzLmdldElucHV0VmFsdWUoMSk7XG4gICAgICAgICAgICBiID0gdGhpcy5nZXRJbnB1dFZhbHVlKDIpO1xuICAgICAgICAgICAgYSA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMuZGF0YS5tX0NvbG9yLmNvbG9yO1xuICAgICAgICAgICAgciA9IGNvbG9yLnI7XG4gICAgICAgICAgICBnID0gY29sb3IuZztcbiAgICAgICAgICAgIGIgPSBjb2xvci5iO1xuICAgICAgICAgICAgYSA9IGNvbG9yLmE7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBgdmVjNCAke3RoaXMuZ2V0T3V0cHV0VmFyTmFtZSgwKX0gPSB2ZWM0KCR7cn0sICR7Z30sICR7Yn0sICR7YX0pO2A7XG4gICAgfVxufVxuXG4iXX0=