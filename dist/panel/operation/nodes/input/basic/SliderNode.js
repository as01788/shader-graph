"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputNode_1 = __importDefault(require("../InputNode"));
const utils_1 = require("../../../utils");
class SliderNode extends InputNode_1.default {
    constructor() {
        super(...arguments);
        this.fixedConcretePrecision = 1;
    }
    generateCode() {
        let slot = this.slots[0];
        let value = utils_1.getFloatString(this.data.m_Value.x);
        return `${slot.varDefine} = ${value};`;
    }
}
exports.default = SliderNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGVyTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvaW5wdXQvYmFzaWMvU2xpZGVyTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZEQUFxQztBQUVyQywwQ0FBZ0Q7QUFFaEQsTUFBcUIsVUFBVyxTQUFRLG1CQUFTO0lBQWpEOztRQUNJLDJCQUFzQixHQUFHLENBQUMsQ0FBQztJQU8vQixDQUFDO0lBTEcsWUFBWTtRQUNSLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxLQUFLLEdBQUcsc0JBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRCxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsTUFBTSxLQUFLLEdBQUcsQ0FBQztJQUMzQyxDQUFDO0NBQ0o7QUFSRCw2QkFRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbnB1dE5vZGUgZnJvbSBcIi4uL0lucHV0Tm9kZVwiO1xuaW1wb3J0IHsgQ29uY3JldGVQcmVjaXNpb25UeXBlIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVcIjtcbmltcG9ydCB7IGdldEZsb2F0U3RyaW5nIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlck5vZGUgZXh0ZW5kcyBJbnB1dE5vZGUge1xuICAgIGZpeGVkQ29uY3JldGVQcmVjaXNpb24gPSAxO1xuXG4gICAgZ2VuZXJhdGVDb2RlICgpIHtcbiAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzWzBdO1xuICAgICAgICBsZXQgdmFsdWUgPSBnZXRGbG9hdFN0cmluZyh0aGlzLmRhdGEubV9WYWx1ZS54KTtcbiAgICAgICAgcmV0dXJuIGAke3Nsb3QudmFyRGVmaW5lfSA9ICR7dmFsdWV9O2A7XG4gICAgfVxufVxuXG4iXX0=