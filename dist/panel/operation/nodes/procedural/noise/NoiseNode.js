"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
const type_1 = require("../../../type");
class NoiseNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
        this.depChunks = ['noise'];
    }
    generateCode() {
        let uv = this.getInputValue(0);
        let scale = this.getInputValue(1);
        return `${this.getOutputVarDefine(0)} = simpleNoise(${uv}, ${scale});`;
    }
}
exports.default = NoiseNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9pc2VOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9wcm9jZWR1cmFsL25vaXNlL05vaXNlTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUEyQztBQUMzQyx3Q0FBc0Q7QUFFdEQsTUFBcUIsU0FBVSxTQUFRLGlCQUFVO0lBQWpEOztRQUNJLDBCQUFxQixHQUFHLDRCQUFxQixDQUFDLEtBQUssQ0FBQztRQUVwRCxjQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQU96QixDQUFDO0lBTEcsWUFBWTtRQUNSLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLEtBQUssSUFBSSxDQUFDO0lBQzNFLENBQUM7Q0FDSjtBQVZELDRCQVVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hhZGVyTm9kZSB9IGZyb20gXCIuLi8uLi8uLi9iYXNlXCI7XG5pbXBvcnQgeyBDb25jcmV0ZVByZWNpc2lvblR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb2lzZU5vZGUgZXh0ZW5kcyBTaGFkZXJOb2RlIHtcbiAgICBjb25jcmV0ZVByZWNpc2lvblR5cGUgPSBDb25jcmV0ZVByZWNpc2lvblR5cGUuRml4ZWQ7XG5cbiAgICBkZXBDaHVua3MgPSBbJ25vaXNlJ11cblxuICAgIGdlbmVyYXRlQ29kZSAoKSB7XG4gICAgICAgIGxldCB1diA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgwKTtcbiAgICAgICAgbGV0IHNjYWxlID0gdGhpcy5nZXRJbnB1dFZhbHVlKDEpO1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRPdXRwdXRWYXJEZWZpbmUoMCl9ID0gc2ltcGxlTm9pc2UoJHt1dn0sICR7c2NhbGV9KTtgO1xuICAgIH1cbn1cbiJdfQ==