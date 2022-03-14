"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const type_1 = require("../../type");
class PropertyNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
        this.property = null;
        this.isPropertyNode = true;
        // generateCode () {
        //     return `${this.getOutputVarDefine(0)} = ${this.property?.name};`;
        // }
    }
    searchProperties(properties) {
        this.property = properties.find(p => {
            return p.data.m_Guid.m_GuidSerialized === this.data.m_PropertyGuidSerialized;
        });
        if (this.property) {
            this.property.node = this;
        }
    }
}
exports.default = PropertyNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvcGVydHlOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9pbnB1dC9Qcm9wZXJ0eU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBdUQ7QUFDdkQscUNBQW1EO0FBRW5ELE1BQXFCLFlBQWEsU0FBUSxpQkFBVTtJQUFwRDs7UUFDSSwwQkFBcUIsR0FBRyw0QkFBcUIsQ0FBQyxLQUFLLENBQUM7UUFDcEQsYUFBUSxHQUF5QixJQUFJLENBQUM7UUFFdEMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFZdEIsb0JBQW9CO1FBQ3BCLHdFQUF3RTtRQUN4RSxJQUFJO0lBQ1IsQ0FBQztJQWJHLGdCQUFnQixDQUFFLFVBQVU7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztRQUNqRixDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUM3QjtJQUNMLENBQUM7Q0FLSjtBQW5CRCwrQkFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGFkZXJOb2RlLCBTaGFkZXJQcm9wZXJ5IH0gZnJvbSBcIi4uLy4uL2Jhc2VcIjtcbmltcG9ydCB7IENvbmNyZXRlUHJlY2lzaW9uVHlwZSB9IGZyb20gXCIuLi8uLi90eXBlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3BlcnR5Tm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xuICAgIGNvbmNyZXRlUHJlY2lzaW9uVHlwZSA9IENvbmNyZXRlUHJlY2lzaW9uVHlwZS5GaXhlZDtcbiAgICBwcm9wZXJ0eTogU2hhZGVyUHJvcGVyeSB8IG51bGwgPSBudWxsO1xuXG4gICAgaXNQcm9wZXJ0eU5vZGUgPSB0cnVlO1xuXG4gICAgc2VhcmNoUHJvcGVydGllcyAocHJvcGVydGllcykge1xuICAgICAgICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydGllcy5maW5kKHAgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHAuZGF0YS5tX0d1aWQubV9HdWlkU2VyaWFsaXplZCA9PT0gdGhpcy5kYXRhLm1fUHJvcGVydHlHdWlkU2VyaWFsaXplZDtcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAodGhpcy5wcm9wZXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eS5ub2RlID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGdlbmVyYXRlQ29kZSAoKSB7XG4gICAgLy8gICAgIHJldHVybiBgJHt0aGlzLmdldE91dHB1dFZhckRlZmluZSgwKX0gPSAke3RoaXMucHJvcGVydHk/Lm5hbWV9O2A7XG4gICAgLy8gfVxufVxuXG4iXX0=