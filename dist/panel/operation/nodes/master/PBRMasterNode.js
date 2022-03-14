"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const MasterNode_1 = __importDefault(require("./MasterNode"));
const utils_1 = require("../../utils");
const type_1 = require("../../type");
class PBRMasterNode extends MasterNode_1.default {
    constructor(data) {
        super(data);
        this.vsSlotIndices = ['Vertex Position', 'Vertex Normal', 'Vertex Tangent'];
        this.fsSlotIndices = ['Albedo', 'Normal', 'Emission', 'Metallic', 'Smoothness', 'Occlusion', 'Alpha', 'AlphaClipThreshold'];
        this.templatePath = path_1.default.join(utils_1.shaderTemplatesDir, 'master/PBRMasterNode.effect');
        this.depVarings = [type_1.PositionSpace.World, type_1.NormalSpace.World];
    }
}
exports.default = PBRMasterNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUEJSTWFzdGVyTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvbWFzdGVyL1BCUk1hc3Rlck5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxnREFBd0I7QUFDeEIsOERBQXNDO0FBQ3RDLHVDQUFpRDtBQUNqRCxxQ0FBd0Q7QUFFeEQsTUFBcUIsYUFBYyxTQUFRLG9CQUFVO0lBUWpELFlBQWEsSUFBSTtRQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQVJmLGtCQUFhLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUN2RSxrQkFBYSxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFFdkgsaUJBQVksR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLDBCQUFrQixFQUFFLDZCQUE2QixDQUFDLENBQUM7UUFFNUUsZUFBVSxHQUFHLENBQUMsb0JBQWEsQ0FBQyxLQUFLLEVBQUUsa0JBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUlyRCxDQUFDO0NBQ0o7QUFYRCxnQ0FXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBNYXN0ZXJOb2RlIGZyb20gXCIuL01hc3Rlck5vZGVcIjtcbmltcG9ydCB7IHNoYWRlclRlbXBsYXRlc0RpciB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IE5vcm1hbFNwYWNlLCBQb3NpdGlvblNwYWNlIH0gZnJvbSAnLi4vLi4vdHlwZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBCUk1hc3Rlck5vZGUgZXh0ZW5kcyBNYXN0ZXJOb2RlIHtcbiAgICB2c1Nsb3RJbmRpY2VzID0gWydWZXJ0ZXggUG9zaXRpb24nLCAnVmVydGV4IE5vcm1hbCcsICdWZXJ0ZXggVGFuZ2VudCddO1xuICAgIGZzU2xvdEluZGljZXMgPSBbJ0FsYmVkbycsICdOb3JtYWwnLCAnRW1pc3Npb24nLCAnTWV0YWxsaWMnLCAnU21vb3RobmVzcycsICdPY2NsdXNpb24nLCAnQWxwaGEnLCAnQWxwaGFDbGlwVGhyZXNob2xkJ107XG5cbiAgICB0ZW1wbGF0ZVBhdGggPSBwYXRoLmpvaW4oc2hhZGVyVGVtcGxhdGVzRGlyLCAnbWFzdGVyL1BCUk1hc3Rlck5vZGUuZWZmZWN0Jyk7XG5cbiAgICBkZXBWYXJpbmdzID0gW1Bvc2l0aW9uU3BhY2UuV29ybGQsIE5vcm1hbFNwYWNlLldvcmxkXVxuXG4gICAgY29uc3RydWN0b3IgKGRhdGEpIHtcbiAgICAgICAgc3VwZXIoZGF0YSlcbiAgICB9XG59XG4iXX0=