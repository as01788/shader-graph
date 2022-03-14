"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const type_1 = require("../../type");
class RotateNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
        this.depChunks = ['uv'];
    }
    generateCode() {
        let UV;
        if (!this.inputSlots[0].connectSlot) {
            UV = 'v_uv';
        }
        else {
            UV = this.getInputValue(0);
        }
        let Center = this.getInputValue(1);
        let Rotation = this.getInputValue(2);
        return `vec2 ${this.getOutputVarName(0)} = rotateCoordinates(${UV}, ${Center}, ${Rotation});`;
    }
}
exports.default = RotateNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm90YXRlTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvdXYvUm90YXRlTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUF3QztBQUN4QyxxQ0FBbUQ7QUFFbkQsTUFBcUIsVUFBVyxTQUFRLGlCQUFVO0lBQWxEOztRQUNJLDBCQUFxQixHQUFHLDRCQUFxQixDQUFDLEtBQUssQ0FBQztRQUNwRCxjQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQWN0QixDQUFDO0lBWkcsWUFBWTtRQUNSLElBQUksRUFBRSxDQUFDO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFO1lBQ2pDLEVBQUUsR0FBRyxNQUFNLENBQUM7U0FDZjthQUNJO1lBQ0QsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUI7UUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsT0FBTyxRQUFRLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxNQUFNLEtBQUssUUFBUSxJQUFJLENBQUM7SUFDbEcsQ0FBQztDQUNKO0FBaEJELDZCQWdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vLi4vYmFzZVwiO1xuaW1wb3J0IHsgQ29uY3JldGVQcmVjaXNpb25UeXBlIH0gZnJvbSBcIi4uLy4uL3R5cGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm90YXRlTm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xuICAgIGNvbmNyZXRlUHJlY2lzaW9uVHlwZSA9IENvbmNyZXRlUHJlY2lzaW9uVHlwZS5GaXhlZDtcbiAgICBkZXBDaHVua3MgPSBbJ3V2J11cblxuICAgIGdlbmVyYXRlQ29kZSAoKSB7XG4gICAgICAgIGxldCBVVjtcbiAgICAgICAgaWYgKCF0aGlzLmlucHV0U2xvdHNbMF0uY29ubmVjdFNsb3QpIHtcbiAgICAgICAgICAgIFVWID0gJ3ZfdXYnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgVVYgPSB0aGlzLmdldElucHV0VmFsdWUoMCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IENlbnRlciA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgxKTtcbiAgICAgICAgbGV0IFJvdGF0aW9uID0gdGhpcy5nZXRJbnB1dFZhbHVlKDIpO1xuICAgICAgICByZXR1cm4gYHZlYzIgJHt0aGlzLmdldE91dHB1dFZhck5hbWUoMCl9ID0gcm90YXRlQ29vcmRpbmF0ZXMoJHtVVn0sICR7Q2VudGVyfSwgJHtSb3RhdGlvbn0pO2A7XG4gICAgfVxufVxuIl19