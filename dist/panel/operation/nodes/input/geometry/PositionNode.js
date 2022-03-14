"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
const type_1 = require("../../../type");
class PositionNode extends base_1.ShaderNode {
    constructor(data) {
        super(data);
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
        if (this.data.m_Space === type_1.PositionSpace.Object - type_1.PositionSpace.Object) {
            this.depVarings.push(type_1.PositionSpace.Object);
        }
        else if (this.data.m_Space === type_1.PositionSpace.View - type_1.PositionSpace.Object) {
            this.depVarings.push(type_1.PositionSpace.View);
        }
        else if (this.data.m_Space === type_1.PositionSpace.Tangent - type_1.PositionSpace.Object) {
            console.error('Not support Tangent Position');
            this.depVarings.push(type_1.PositionSpace.Tangent);
        }
        else if (this.data.m_Space === type_1.PositionSpace.World - type_1.PositionSpace.Object) {
            this.depVarings.push(type_1.PositionSpace.World);
        }
        else if (this.data.m_Space === type_1.PositionSpace.AbsoluteWorld - type_1.PositionSpace.Object) {
            this.depVarings.push(type_1.PositionSpace.AbsoluteWorld);
        }
    }
    calcConcretePrecision() {
        this.slots.forEach(slot => {
            slot._concretePrecision = 3;
        });
    }
    generateCode() {
        let name = 'v_pos';
        if (this.data.m_Space === type_1.PositionSpace.Object) {
            name = 'v_pos';
        }
        else if (this.data.m_Space === type_1.PositionSpace.View) {
            name = 'v_viewPos';
        }
        else if (this.data.m_Space === type_1.PositionSpace.Tangent) {
            // name = 'v_tangentPos';
            name = 'v_worldPos';
        }
        else if (this.data.m_Space === type_1.PositionSpace.World) {
            name = 'v_worldPos';
        }
        else if (this.data.m_Space === type_1.PositionSpace.AbsoluteWorld) {
            name = 'v_worldPos';
        }
        return `${this.getOutputVarDefine(0)} = ${name};`;
    }
}
exports.default = PositionNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zaXRpb25Ob2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9pbnB1dC9nZW9tZXRyeS9Qb3NpdGlvbk5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkM7QUFDM0Msd0NBQXFFO0FBR3JFLE1BQXFCLFlBQWEsU0FBUSxpQkFBVTtJQUdoRCxZQUFhLElBQUk7UUFDYixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7UUFIZiwwQkFBcUIsR0FBRyw0QkFBcUIsQ0FBQyxLQUFLLENBQUM7UUFLaEQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxvQkFBYSxDQUFDLE1BQU0sR0FBRyxvQkFBYSxDQUFDLE1BQU0sRUFBRTtZQUNuRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxvQkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlDO2FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxvQkFBYSxDQUFDLElBQUksR0FBRyxvQkFBYSxDQUFDLE1BQU0sRUFBRTtZQUN0RSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxvQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVDO2FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxvQkFBYSxDQUFDLE9BQU8sR0FBRyxvQkFBYSxDQUFDLE1BQU0sRUFBRTtZQUN6RSxPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsb0JBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvQzthQUNJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssb0JBQWEsQ0FBQyxLQUFLLEdBQUcsb0JBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDdkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsb0JBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QzthQUNJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssb0JBQWEsQ0FBQyxhQUFhLEdBQUcsb0JBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDL0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsb0JBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNyRDtJQUNMLENBQUM7SUFFRCxxQkFBcUI7UUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssb0JBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDNUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztTQUNsQjthQUNJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssb0JBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDL0MsSUFBSSxHQUFHLFdBQVcsQ0FBQztTQUN0QjthQUNJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssb0JBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDbEQseUJBQXlCO1lBQ3pCLElBQUksR0FBRyxZQUFZLENBQUM7U0FDdkI7YUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLG9CQUFhLENBQUMsS0FBSyxFQUFFO1lBQ2hELElBQUksR0FBRyxZQUFZLENBQUM7U0FDdkI7YUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLG9CQUFhLENBQUMsYUFBYSxFQUFFO1lBQ3hELElBQUksR0FBRyxZQUFZLENBQUM7U0FDdkI7UUFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO0lBQ3RELENBQUM7Q0FDSjtBQWxERCwrQkFrREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGFkZXJOb2RlIH0gZnJvbSBcIi4uLy4uLy4uL2Jhc2VcIjtcbmltcG9ydCB7IENvbmNyZXRlUHJlY2lzaW9uVHlwZSwgUG9zaXRpb25TcGFjZSB9IGZyb20gXCIuLi8uLi8uLi90eXBlXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zaXRpb25Ob2RlIGV4dGVuZHMgU2hhZGVyTm9kZSB7XG4gICAgY29uY3JldGVQcmVjaXNpb25UeXBlID0gQ29uY3JldGVQcmVjaXNpb25UeXBlLkZpeGVkO1xuXG4gICAgY29uc3RydWN0b3IgKGRhdGEpIHtcbiAgICAgICAgc3VwZXIoZGF0YSlcblxuICAgICAgICBpZiAodGhpcy5kYXRhLm1fU3BhY2UgPT09IFBvc2l0aW9uU3BhY2UuT2JqZWN0IC0gUG9zaXRpb25TcGFjZS5PYmplY3QpIHtcbiAgICAgICAgICAgIHRoaXMuZGVwVmFyaW5ncy5wdXNoKFBvc2l0aW9uU3BhY2UuT2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmRhdGEubV9TcGFjZSA9PT0gUG9zaXRpb25TcGFjZS5WaWV3IC0gUG9zaXRpb25TcGFjZS5PYmplY3QpIHtcbiAgICAgICAgICAgIHRoaXMuZGVwVmFyaW5ncy5wdXNoKFBvc2l0aW9uU3BhY2UuVmlldyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5kYXRhLm1fU3BhY2UgPT09IFBvc2l0aW9uU3BhY2UuVGFuZ2VudCAtIFBvc2l0aW9uU3BhY2UuT2JqZWN0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdOb3Qgc3VwcG9ydCBUYW5nZW50IFBvc2l0aW9uJyk7XG4gICAgICAgICAgICB0aGlzLmRlcFZhcmluZ3MucHVzaChQb3NpdGlvblNwYWNlLlRhbmdlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZGF0YS5tX1NwYWNlID09PSBQb3NpdGlvblNwYWNlLldvcmxkIC0gUG9zaXRpb25TcGFjZS5PYmplY3QpIHtcbiAgICAgICAgICAgIHRoaXMuZGVwVmFyaW5ncy5wdXNoKFBvc2l0aW9uU3BhY2UuV29ybGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZGF0YS5tX1NwYWNlID09PSBQb3NpdGlvblNwYWNlLkFic29sdXRlV29ybGQgLSBQb3NpdGlvblNwYWNlLk9iamVjdCkge1xuICAgICAgICAgICAgdGhpcy5kZXBWYXJpbmdzLnB1c2goUG9zaXRpb25TcGFjZS5BYnNvbHV0ZVdvcmxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbGNDb25jcmV0ZVByZWNpc2lvbiAoKSB7XG4gICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaChzbG90ID0+IHtcbiAgICAgICAgICAgIHNsb3QuX2NvbmNyZXRlUHJlY2lzaW9uID0gMztcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xuICAgICAgICBsZXQgbmFtZSA9ICd2X3Bvcyc7XG4gICAgICAgIGlmICh0aGlzLmRhdGEubV9TcGFjZSA9PT0gUG9zaXRpb25TcGFjZS5PYmplY3QpIHtcbiAgICAgICAgICAgIG5hbWUgPSAndl9wb3MnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZGF0YS5tX1NwYWNlID09PSBQb3NpdGlvblNwYWNlLlZpZXcpIHtcbiAgICAgICAgICAgIG5hbWUgPSAndl92aWV3UG9zJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmRhdGEubV9TcGFjZSA9PT0gUG9zaXRpb25TcGFjZS5UYW5nZW50KSB7XG4gICAgICAgICAgICAvLyBuYW1lID0gJ3ZfdGFuZ2VudFBvcyc7XG4gICAgICAgICAgICBuYW1lID0gJ3Zfd29ybGRQb3MnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZGF0YS5tX1NwYWNlID09PSBQb3NpdGlvblNwYWNlLldvcmxkKSB7XG4gICAgICAgICAgICBuYW1lID0gJ3Zfd29ybGRQb3MnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZGF0YS5tX1NwYWNlID09PSBQb3NpdGlvblNwYWNlLkFic29sdXRlV29ybGQpIHtcbiAgICAgICAgICAgIG5hbWUgPSAndl93b3JsZFBvcyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0T3V0cHV0VmFyRGVmaW5lKDApfSA9ICR7bmFtZX07YDtcbiAgICB9XG59XG5cbiJdfQ==