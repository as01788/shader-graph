"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const globby_1 = __importDefault(require("globby"));
const path_1 = __importDefault(require("path"));
const shadergraph_1 = __importDefault(require("../../shadergraph"));
const SubGraphOutputNode_1 = __importDefault(require("./SubGraphOutputNode"));
const PropertyNode_1 = __importDefault(require("../input/PropertyNode"));
const type_1 = require("../../type");
class SubGraphNode extends base_1.ShaderNode {
    constructor(data) {
        super(data);
        this.nodes = [];
        this.nodeMap = new Map;
        this.properties = [];
        this.subgraphOutNode = null;
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
        let name = this.data.m_Name;
        let subgraphPath = path_1.default.join(shadergraph_1.default.subgraphPath, `**/${name}.*`).replace(/\\/g, '/');
        let paths = globby_1.default.sync(subgraphPath);
        paths = paths.filter(p => path_1.default.extname(p).toLowerCase() === '.shadersubgraph');
        if (!paths[0]) {
            console.error(`Can not find sub graph with name [${name}]`);
            return;
        }
        let res = shadergraph_1.default.searchNodes(paths[0]);
        if (!res) {
            return;
        }
        let { properties, nodeMap, nodes, edges } = res;
        this.nodes = nodes;
        this.nodeMap = nodeMap;
        this.properties = properties;
        let subgraphOutNode = nodes.find(n => n instanceof SubGraphOutputNode_1.default);
        if (!subgraphOutNode) {
            console.error(`Can not find SubGraphOutputNode for [${name}]`);
            return;
        }
        this.subgraphOutNode = subgraphOutNode;
    }
    excahngeSubGraphOutNode(outputEdgeSlot) {
        var _a, _b;
        let outputNode = this;
        let outputSlot = this.slotsMap.get(outputEdgeSlot.id);
        let subgraphSlot = (_a = this.subgraphOutNode) === null || _a === void 0 ? void 0 : _a.getSlotWithSlotName(outputSlot === null || outputSlot === void 0 ? void 0 : outputSlot.displayName);
        if (subgraphSlot && subgraphSlot.connectSlot) {
            //@ts-ignore
            outputNode = subgraphSlot.connectSlot.node;
            outputEdgeSlot.id = subgraphSlot.connectSlot.id;
            //@ts-ignore
            outputEdgeSlot.nodeUuid = (_b = subgraphSlot.connectSlot.node) === null || _b === void 0 ? void 0 : _b.uuid;
            if (outputNode && subgraphSlot) {
                subgraphSlot.connectSlots.length = 0;
            }
        }
        return outputNode;
    }
    exchangeSubGraphInputNodes() {
        let inputSlots = this.inputSlots;
        let propertyNodes = this.nodes.filter(n => n instanceof PropertyNode_1.default);
        propertyNodes.forEach(node => {
            let propertySlot = node.outputSlots[0];
            let propertyName = propertySlot.displayName;
            let inputSlot = inputSlots.find(slot => slot.displayName === propertyName);
            if (inputSlot) {
                let outputSlot = inputSlot.connectSlot;
                if (outputSlot) {
                    propertySlot.connectSlots.forEach(inputSlotInSubGraph => {
                        var _a;
                        inputSlotInSubGraph.connectSlot = outputSlot;
                        outputSlot.connectSlots = outputSlot.connectSlots.filter(slot => slot === inputSlot);
                        if (outputSlot.node) {
                            (_a = inputSlotInSubGraph.node) === null || _a === void 0 ? void 0 : _a.addDependency(outputSlot.node);
                            //@ts-ignore
                            outputSlot.node.setPriority(inputSlotInSubGraph.node.priority + 1);
                        }
                    });
                    //@ts-ignore
                    inputSlot.connectSlot = null;
                }
                else {
                    propertySlot.connectSlots.forEach(inputSlotInSubGraph => {
                        var _a;
                        inputSlotInSubGraph.connectSlot = inputSlot;
                        // inputSlot.connectSlots.push(inputSlotInSubGraph);
                        if (inputSlot.node) {
                            (_a = inputSlotInSubGraph.node) === null || _a === void 0 ? void 0 : _a.addDependency(this);
                            //@ts-ignore
                            this.setPriority(inputSlotInSubGraph.node.priority + 1);
                        }
                    });
                }
            }
        });
    }
    generateCode() {
        let code = '';
        let inputSlots = this.inputSlots;
        for (let i = 0; i < inputSlots.length; i++) {
            // if (!inputSlots[i].connectSlot) continue;
            code += `${inputSlots[i].varDefine} = ${inputSlots[i].defaultValue};\n`;
        }
        return code;
    }
}
exports.default = SubGraphNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ViR3JhcGhOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc291cmNlL3BhbmVsL29wZXJhdGlvbi9ub2Rlcy9zdWJncmFwaC9TdWJHcmFwaE5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBbUY7QUFDbkYsb0RBQTJCO0FBQzNCLGdEQUF1QjtBQUN2QixvRUFBNEM7QUFDNUMsOEVBQXNEO0FBQ3RELHlFQUFpRDtBQUNqRCxxQ0FBbUQ7QUFFbkQsTUFBcUIsWUFBYSxTQUFRLGlCQUFVO0lBU2hELFlBQWEsSUFBSTtRQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQVRmLFVBQUssR0FBaUIsRUFBRSxDQUFBO1FBQ3hCLFlBQU8sR0FBNEIsSUFBSSxHQUFHLENBQUE7UUFDMUMsZUFBVSxHQUFvQixFQUFFLENBQUE7UUFFaEMsb0JBQWUsR0FBOEIsSUFBSSxDQUFDO1FBRWxELDBCQUFxQixHQUFHLDRCQUFxQixDQUFDLEtBQUssQ0FBQztRQUtoRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM1QixJQUFJLFlBQVksR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFXLENBQUMsWUFBWSxFQUFFLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNGLElBQUksS0FBSyxHQUFHLGdCQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3JDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxpQkFBaUIsQ0FBQyxDQUFBO1FBQzlFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDWCxPQUFPLENBQUMsS0FBSyxDQUFD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LENBQUM7U0FDM0U7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFwSEQsK0JBb0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hhZGVyTm9kZSwgU2hhZGVyU2xvdCwgU2hhZGVyUHJvcGVyeSwgU2hhZGVyRWRnZVNsb3QgfSBmcm9tIFwiLi4vLi4vYmFzZVwiO1xuaW1wb3J0IGdsb2JieSBmcm9tICdnbG9iYnknXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IFNoYWRlckdyYXBoIGZyb20gXCIuLi8uLi9zaGFkZXJncmFwaFwiO1xuaW1wb3J0IFN1YkdyYXBoT3V0cHV0Tm9kZSBmcm9tIFwiLi9TdWJHcmFwaE91dHB1dE5vZGVcIjtcbmltcG9ydCBQcm9wZXJ0eU5vZGUgZnJvbSBcIi4uL2lucHV0L1Byb3BlcnR5Tm9kZVwiO1xuaW1wb3J0IHsgQ29uY3JldGVQcmVjaXNpb25UeXBlIH0gZnJvbSBcIi4uLy4uL3R5cGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ViR3JhcGhOb2RlIGV4dGVuZHMgU2hhZGVyTm9kZSB7XG4gICAgbm9kZXM6IFNoYWRlck5vZGVbXSA9IFtdXG4gICAgbm9kZU1hcDogTWFwPHN0cmluZywgU2hhZGVyTm9kZT4gPSBuZXcgTWFwXG4gICAgcHJvcGVydGllczogU2hhZGVyUHJvcGVyeVtdID0gW11cblxuICAgIHN1YmdyYXBoT3V0Tm9kZTogU3ViR3JhcGhPdXRwdXROb2RlIHwgbnVsbCA9IG51bGw7XG5cbiAgICBjb25jcmV0ZVByZWNpc2lvblR5cGUgPSBDb25jcmV0ZVByZWNpc2lvblR5cGUuRml4ZWQ7XG5cbiAgICBjb25zdHJ1Y3RvciAoZGF0YSkge1xuICAgICAgICBzdXBlcihkYXRhKVxuXG4gICAgICAgIGxldCBuYW1lID0gdGhpcy5kYXRhLm1fTmFtZTtcbiAgICAgICAgbGV0IHN1YmdyYXBoUGF0aCA9IHBhdGguam9pbihTaGFkZXJHcmFwaC5zdWJncmFwaFBhdGgsIGAqKi8ke25hbWV9LipgKS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XG4gICAgICAgIGxldCBwYXRocyA9IGdsb2JieS5zeW5jKHN1YmdyYXBoUGF0aClcbiAgICAgICAgcGF0aHMgPSBwYXRocy5maWx0ZXIocCA9PiBwYXRoLmV4dG5hbWUocCkudG9Mb3dlckNhc2UoKSA9PT0gJy5zaGFkZXJzdWJncmFwaCcpXG4gICAgICAgIGlmICghcGF0aHNbMF0pIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYENhbiBub3QgZmluZCBzdWIgZ3JhcGggd2l0aCBuYW1lIFske25hbWV9XWApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzID0gU2hhZGVyR3JhcGguc2VhcmNoTm9kZXMocGF0aHNbMF0pO1xuICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHsgcHJvcGVydGllcywgbm9kZU1hcCwgbm9kZXMsIGVkZ2VzIH0gPSByZXM7XG5cbiAgICAgICAgdGhpcy5ub2RlcyA9IG5vZGVzO1xuICAgICAgICB0aGlzLm5vZGVNYXAgPSBub2RlTWFwO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuXG4gICAgICAgIGxldCBzdWJncmFwaE91dE5vZGUgPSBub2Rlcy5maW5kKG4gPT4gbiBpbnN0YW5jZW9mIFN1YkdyYXBoT3V0cHV0Tm9kZSlcbiAgICAgICAgaWYgKCFzdWJncmFwaE91dE5vZGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYENhbiBub3QgZmluZCBTdWJHcmFwaE91dHB1dE5vZGUgZm9yIFske25hbWV9XWApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN1YmdyYXBoT3V0Tm9kZSA9IHN1YmdyYXBoT3V0Tm9kZTtcblxuICAgIH1cblxuICAgIGV4Y2FobmdlU3ViR3JhcGhPdXROb2RlIChvdXRwdXRFZGdlU2xvdDogU2hhZGVyRWRnZVNsb3QpIHtcbiAgICAgICAgbGV0IG91dHB1dE5vZGUgPSB0aGlzIGFzIFNoYWRlck5vZGU7XG5cbiAgICAgICAgbGV0IG91dHB1dFNsb3QgPSB0aGlzLnNsb3RzTWFwLmdldChvdXRwdXRFZGdlU2xvdC5pZCk7XG4gICAgICAgIGxldCBzdWJncmFwaFNsb3QgPSB0aGlzLnN1YmdyYXBoT3V0Tm9kZT8uZ2V0U2xvdFdpdGhTbG90TmFtZShvdXRwdXRTbG90Py5kaXNwbGF5TmFtZSk7XG5cbiAgICAgICAgaWYgKHN1YmdyYXBoU2xvdCAmJiBzdWJncmFwaFNsb3QuY29ubmVjdFNsb3QpIHtcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgb3V0cHV0Tm9kZSA9IHN1YmdyYXBoU2xvdC5jb25uZWN0U2xvdC5ub2RlO1xuICAgICAgICAgICAgb3V0cHV0RWRnZVNsb3QuaWQgPSBzdWJncmFwaFNsb3QuY29ubmVjdFNsb3QuaWQ7XG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgIG91dHB1dEVkZ2VTbG90Lm5vZGVVdWlkID0gc3ViZ3JhcGhTbG90LmNvbm5lY3RTbG90Lm5vZGU/LnV1aWQ7XG4gICAgICAgICAgICBpZiAob3V0cHV0Tm9kZSAmJiBzdWJncmFwaFNsb3QpIHtcbiAgICAgICAgICAgICAgICBzdWJncmFwaFNsb3QuY29ubmVjdFNsb3RzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0cHV0Tm9kZTtcbiAgICB9XG5cbiAgICBleGNoYW5nZVN1YkdyYXBoSW5wdXROb2RlcyAoKSB7XG4gICAgICAgIGxldCBpbnB1dFNsb3RzID0gdGhpcy5pbnB1dFNsb3RzO1xuXG4gICAgICAgIGxldCBwcm9wZXJ0eU5vZGVzID0gdGhpcy5ub2Rlcy5maWx0ZXIobiA9PiBuIGluc3RhbmNlb2YgUHJvcGVydHlOb2RlKTtcbiAgICAgICAgcHJvcGVydHlOb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgbGV0IHByb3BlcnR5U2xvdCA9IG5vZGUub3V0cHV0U2xvdHNbMF07XG4gICAgICAgICAgICBsZXQgcHJvcGVydHlOYW1lID0gcHJvcGVydHlTbG90LmRpc3BsYXlOYW1lO1xuXG4gICAgICAgICAgICBsZXQgaW5wdXRTbG90ID0gaW5wdXRTbG90cy5maW5kKHNsb3QgPT4gc2xvdC5kaXNwbGF5TmFtZSA9PT0gcHJvcGVydHlOYW1lKTtcblxuICAgICAgICAgICAgaWYgKGlucHV0U2xvdCkge1xuICAgICAgICAgICAgICAgIGxldCBvdXRwdXRTbG90ID0gaW5wdXRTbG90LmNvbm5lY3RTbG90O1xuICAgICAgICAgICAgICAgIGlmIChvdXRwdXRTbG90KSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5U2xvdC5jb25uZWN0U2xvdHMuZm9yRWFjaChpbnB1dFNsb3RJblN1YkdyYXBoID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0U2xvdEluU3ViR3JhcGguY29ubmVjdFNsb3QgPSBvdXRwdXRTbG90O1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0U2xvdC5jb25uZWN0U2xvdHMgPSBvdXRwdXRTbG90LmNvbm5lY3RTbG90cy5maWx0ZXIoc2xvdCA9PiBzbG90ID09PSBpbnB1dFNsb3QpO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG91dHB1dFNsb3Qubm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0U2xvdEluU3ViR3JhcGgubm9kZT8uYWRkRGVwZW5kZW5jeShvdXRwdXRTbG90Lm5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFNsb3Qubm9kZS5zZXRQcmlvcml0eShpbnB1dFNsb3RJblN1YkdyYXBoLm5vZGUucHJpb3JpdHkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFNsb3QuY29ubmVjdFNsb3QgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlTbG90LmNvbm5lY3RTbG90cy5mb3JFYWNoKGlucHV0U2xvdEluU3ViR3JhcGggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRTbG90SW5TdWJHcmFwaC5jb25uZWN0U2xvdCA9IGlucHV0U2xvdCE7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnB1dFNsb3QuY29ubmVjdFNsb3RzLnB1c2goaW5wdXRTbG90SW5TdWJHcmFwaCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dFNsb3QhLm5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFNsb3RJblN1YkdyYXBoLm5vZGU/LmFkZERlcGVuZGVuY3kodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQcmlvcml0eShpbnB1dFNsb3RJblN1YkdyYXBoLm5vZGUucHJpb3JpdHkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUNvZGUgKCkge1xuICAgICAgICBsZXQgY29kZSA9ICcnO1xuICAgICAgICBsZXQgaW5wdXRTbG90cyA9IHRoaXMuaW5wdXRTbG90cztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dFNsb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBpZiAoIWlucHV0U2xvdHNbaV0uY29ubmVjdFNsb3QpIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29kZSArPSBgJHtpbnB1dFNsb3RzW2ldLnZhckRlZmluZX0gPSAke2lucHV0U2xvdHNbaV0uZGVmYXVsdFZhbHVlfTtcXG5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cbn1cbiJdfQ==