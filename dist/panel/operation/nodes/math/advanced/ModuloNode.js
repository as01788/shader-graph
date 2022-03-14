"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
class ModuloNode extends base_1.ShaderNode {
    calcConcretePrecision() {
        super.calcConcretePrecision();
    }
    generateCode() {
        let A = this.getInputValue(0);
        let B = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = mod(${A}, ${B});`;
    }
}
exports.default = ModuloNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kdWxvTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvbWF0aC9hZHZhbmNlZC9Nb2R1bG9Ob2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQTJDO0FBRTNDLE1BQXFCLFVBQVcsU0FBUSxpQkFBVTtJQUM5QyxxQkFBcUI7UUFDakIsS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUE7SUFDakMsQ0FBQztJQUNELFlBQVk7UUFDUixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDOUQsQ0FBQztDQUNKO0FBVEQsNkJBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGFkZXJOb2RlIH0gZnJvbSBcIi4uLy4uLy4uL2Jhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kdWxvTm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xuICAgIGNhbGNDb25jcmV0ZVByZWNpc2lvbiAoKSB7XG4gICAgICAgIHN1cGVyLmNhbGNDb25jcmV0ZVByZWNpc2lvbigpXG4gICAgfVxuICAgIGdlbmVyYXRlQ29kZSAoKSB7XG4gICAgICAgIGxldCBBID0gdGhpcy5nZXRJbnB1dFZhbHVlKDApO1xuICAgICAgICBsZXQgQiA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgxKTtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0T3V0cHV0VmFyRGVmaW5lKDApfSA9IG1vZCgke0F9LCAke0J9KTtgO1xuICAgIH1cbn1cbiJdfQ==