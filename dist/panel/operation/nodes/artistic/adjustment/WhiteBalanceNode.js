"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
const type_1 = require("../../../type");
class WhiteBalanceNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
        this.depChunks = ['artistic'];
    }
    generateCode() {
        return `vec3 ${this.getOutputVarName(0)} = WhiteBalance(${this.getInputValue(0)},${this.getInputValue(1)},${this.getInputValue(2)});`;
    }
}
exports.default = WhiteBalanceNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2hpdGVCYWxhbmNlTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvYXJ0aXN0aWMvYWRqdXN0bWVudC9XaGl0ZUJhbGFuY2VOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQTJDO0FBQzNDLHdDQUFzRDtBQUV0RCxNQUFxQixnQkFBaUIsU0FBUSxpQkFBVTtJQUF4RDs7UUFDSSwwQkFBcUIsR0FBMEIsNEJBQXFCLENBQUMsS0FBSyxDQUFDO1FBQzNFLGNBQVMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBSzdCLENBQUM7SUFIRyxZQUFZO1FBQ1IsT0FBTyxRQUFRLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDMUksQ0FBQztDQUNKO0FBUEQsbUNBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGFkZXJOb2RlIH0gZnJvbSBcIi4uLy4uLy4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgQ29uY3JldGVQcmVjaXNpb25UeXBlIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdoaXRlQmFsYW5jZU5vZGUgZXh0ZW5kcyBTaGFkZXJOb2Rle1xyXG4gICAgY29uY3JldGVQcmVjaXNpb25UeXBlOiBDb25jcmV0ZVByZWNpc2lvblR5cGUgPSBDb25jcmV0ZVByZWNpc2lvblR5cGUuRml4ZWQ7XHJcbiAgICBkZXBDaHVua3MgPSBbJ2FydGlzdGljJ107XHJcblxyXG4gICAgZ2VuZXJhdGVDb2RlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGB2ZWMzICR7dGhpcy5nZXRPdXRwdXRWYXJOYW1lKDApfSA9IFdoaXRlQmFsYW5jZSgke3RoaXMuZ2V0SW5wdXRWYWx1ZSgwKX0sJHt0aGlzLmdldElucHV0VmFsdWUoMSl9LCR7dGhpcy5nZXRJbnB1dFZhbHVlKDIpfSk7YDtcclxuICAgIH1cclxufSJdfQ==