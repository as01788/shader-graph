"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
class StepNode extends base_1.ShaderNode {
    calcConcretePrecision() {
        super.calcConcretePrecision();
    }
    generateCode() {
        let edge = this.getInputValue(0);
        let In = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = step(${edge}, ${In});`;
    }
}
exports.default = StepNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RlcE5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL21hdGgvcm91bmQvU3RlcE5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkM7QUFFM0MsTUFBcUIsUUFBUyxTQUFRLGlCQUFVO0lBQzVDLHFCQUFxQjtRQUNqQixLQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQTtJQUNqQyxDQUFDO0lBQ0QsWUFBWTtRQUNSLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksS0FBSyxFQUFFLElBQUksQ0FBQztJQUNuRSxDQUFDO0NBQ0o7QUFURCwyQkFTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vLi4vLi4vYmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGVwTm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xuICAgIGNhbGNDb25jcmV0ZVByZWNpc2lvbiAoKSB7XG4gICAgICAgIHN1cGVyLmNhbGNDb25jcmV0ZVByZWNpc2lvbigpXG4gICAgfVxuICAgIGdlbmVyYXRlQ29kZSAoKSB7XG4gICAgICAgIGxldCBlZGdlID0gdGhpcy5nZXRJbnB1dFZhbHVlKDApO1xuICAgICAgICBsZXQgSW4gPSB0aGlzLmdldElucHV0VmFsdWUoMSk7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldE91dHB1dFZhckRlZmluZSgwKX0gPSBzdGVwKCR7ZWRnZX0sICR7SW59KTtgO1xuICAgIH1cbn1cbiJdfQ==