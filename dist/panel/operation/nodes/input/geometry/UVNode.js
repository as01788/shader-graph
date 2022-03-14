"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
const type_1 = require("../../../type");
class UVNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
    }
    calcConcretePrecision() {
        this.slots.forEach(slot => {
            slot._concretePrecision = 2;
        });
    }
    generateCode() {
        let uvName = 'v_uv';
        if (this.data.m_OutputChannel) {
            uvName = `v_uv${this.data.m_OutputChannel}`;
        }
        return `${this.getOutputVarDefine(0)} = ${uvName};`;
    }
}
exports.default = UVNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVVZOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9pbnB1dC9nZW9tZXRyeS9VVk5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkM7QUFDM0Msd0NBQXNEO0FBRXRELE1BQXFCLE1BQU8sU0FBUSxpQkFBVTtJQUE5Qzs7UUFDSSwwQkFBcUIsR0FBRyw0QkFBcUIsQ0FBQyxLQUFLLENBQUM7SUFleEQsQ0FBQztJQWJHLHFCQUFxQjtRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELFlBQVk7UUFDUixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUMzQixNQUFNLEdBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxNQUFNLEdBQUcsQ0FBQztJQUN4RCxDQUFDO0NBQ0o7QUFoQkQseUJBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hhZGVyTm9kZSB9IGZyb20gXCIuLi8uLi8uLi9iYXNlXCI7XG5pbXBvcnQgeyBDb25jcmV0ZVByZWNpc2lvblR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVVk5vZGUgZXh0ZW5kcyBTaGFkZXJOb2RlIHtcbiAgICBjb25jcmV0ZVByZWNpc2lvblR5cGUgPSBDb25jcmV0ZVByZWNpc2lvblR5cGUuRml4ZWQ7XG5cbiAgICBjYWxjQ29uY3JldGVQcmVjaXNpb24gKCkge1xuICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2goc2xvdCA9PiB7XG4gICAgICAgICAgICBzbG90Ll9jb25jcmV0ZVByZWNpc2lvbiA9IDI7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2VuZXJhdGVDb2RlICgpIHtcbiAgICAgICAgbGV0IHV2TmFtZSA9ICd2X3V2JztcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5tX091dHB1dENoYW5uZWwpIHtcbiAgICAgICAgICAgIHV2TmFtZSA9IGB2X3V2JHt0aGlzLmRhdGEubV9PdXRwdXRDaGFubmVsfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0T3V0cHV0VmFyRGVmaW5lKDApfSA9ICR7dXZOYW1lfTtgO1xuICAgIH1cbn1cblxuIl19