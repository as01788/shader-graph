"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const shadergraph_1 = __importDefault(require("../../shadergraph"));
const type_1 = require("../../type");
const utils_1 = require("../../utils");
function findConnectNodes(slot, nodes) {
    if (!slot.connectSlot)
        return;
    let connectNode = slot.connectSlot.node;
    if (connectNode) {
        if (!nodes.includes(connectNode)) {
            nodes.push(connectNode);
        }
        else {
            return;
        }
        connectNode.inputSlots.forEach(slot => {
            findConnectNodes(slot, nodes);
        });
    }
}
class MasterNode extends base_1.ShaderNode {
    constructor() {
        super(...arguments);
        this.vsSlotIndices = [];
        this.fsSlotIndices = [];
        this.templatePath = '';
        this.isMasterNode = true;
        this.concretePrecisionType = type_1.ConcretePrecisionType.Fixed;
        this.properties = [];
    }
    getConnectNodes(slotIndices) {
        let inputSlots = [];
        slotIndices.forEach(name => {
            let slot = this.getSlotWithSlotName(name);
            if (slot) {
                inputSlots.push(slot);
            }
        });
        let nodes = [];
        inputSlots.forEach(slot => {
            findConnectNodes(slot, nodes);
        });
        nodes.sort((a, b) => b.priority - a.priority);
        return nodes;
    }
    generateVsCode() {
        let code = ['\n'];
        let nodes = this.getConnectNodes(this.vsSlotIndices);
        nodes.forEach(node => {
            node.generateCode().split('\n').forEach(c => {
                code.push('    ' + c);
            });
        });
        return code.join('\n');
    }
    generateFsCode() {
        let code = ['\n'];
        let nodes = this.getConnectNodes(this.fsSlotIndices);
        nodes.forEach(node => {
            node.generateCode().split('\n').forEach(c => {
                c += ` // ${node.constructor.name}`;
                code.push('    ' + c);
            });
        });
        return code.join('\n');
    }
    generatePropertiesCode() {
        let uniform = '\n';
        let mtl = '\n';
        let uniformSampler = '';
        let properties = this.properties;
        properties.sort((a, b) => {
            return b.concretePrecision - a.concretePrecision;
        });
        let blockUniformCount = 0;
        properties.forEach(p => {
            let precision = '';
            let mtlValue = '';
            let value = p.defaultValue;
            let isColor = value.r !== undefined;
            let x = isColor ? value.r : value.x;
            let y = isColor ? value.g : value.y;
            let z = isColor ? value.b : value.z;
            let w = isColor ? value.a : value.w;
            let concretePrecision = p.node.outputSlots[0].concretePrecision;
            if (concretePrecision === 1) {
                precision = 'float';
                mtlValue = `${value}`;
            }
            else if (concretePrecision === 2) {
                precision = 'vec2';
                mtlValue = `[${x}, ${y}]`;
            }
            else if (concretePrecision === 3) {
                precision = 'vec4';
                mtlValue = `[${x}, ${y}, ${z}, 0]`;
            }
            else if (concretePrecision === 4) {
                precision = 'vec4';
                mtlValue = `[${x}, ${y}, ${z},  ${w}]`;
            }
            else if (concretePrecision === type_1.TextureConcretePrecision.Texture2D) {
                precision = 'sampler2D';
                mtlValue = 'white';
            }
            else if (concretePrecision === type_1.TextureConcretePrecision.TextureCube) {
                precision = 'samplerCube';
                mtlValue = 'white';
            }
            let editorStr = isColor ? `, editor: { type: color }` : '';
            if (concretePrecision < type_1.TextureConcretePrecision.Texture2D) {
                uniform += `    ${precision} ${p.name};\n`;
                blockUniformCount++;
            }
            else {
                uniformSampler += `  uniform ${precision} ${p.name};\n`;
            }
            mtl += `        ${p.name}: { value: ${mtlValue} ${editorStr}}\n`;
        });
        if (blockUniformCount === 0) {
            uniform += '    vec4 empty_value;\n';
        }
        return {
            uniform,
            uniformSampler,
            mtl,
        };
    }
    replaceChunks(code) {
        let depChunks = ['common'];
        let allNodes = shadergraph_1.default.allNodes;
        for (let i = 0; i < allNodes.length; i++) {
            for (let j = 0; j < allNodes[i].length; j++) {
                let node = allNodes[i][j];
                for (let k = 0; k < node.depChunks.length; k++) {
                    if (!depChunks.includes(node.depChunks[k])) {
                        depChunks.push(node.depChunks[k]);
                    }
                }
            }
        }
        let chunkIncludes = '\n';
        let chunks = '\n';
        depChunks.forEach(chunkName => {
            let chunkPath = path_1.default.join(utils_1.shaderTemplatesDir, `chunks/${chunkName}.chunk`);
            let chunk = fs_1.default.readFileSync(chunkPath, 'utf-8');
            if (!chunk) {
                console.error(`Can not find chunk with path [${chunkPath}]`);
                return;
            }
            chunks += chunk + '\n';
            chunkIncludes += `  #include <shader_graph_${chunkName}>\n`;
        });
        code = code.replace('{{chunks}}', chunks);
        code = code.replace('{{vs_chunks}}', chunkIncludes);
        code = code.replace('{{fs_chunks}}', chunkIncludes);
        return code;
    }
    generateVarings(code) {
        let depVarings = [];
        let allNodes = shadergraph_1.default.allNodes;
        allNodes.forEach(nodes => {
            nodes.forEach(node => {
                node.depVarings.forEach(varing => {
                    if (!depVarings.includes(varing)) {
                        depVarings.push(varing);
                    }
                });
            });
        });
        let vs_varing_define = [''];
        let vs_varing = [''];
        let fs_varing_define = [''];
        let fs_varing = [''];
        if (depVarings.includes(type_1.NormalSpace.World) || depVarings.includes(type_1.NormalSpace.View) || depVarings.includes(type_1.NormalSpace.Tangent) || depVarings.includes(type_1.NormalMapSpace)) {
            vs_varing.push('vec3 worldNormal = normalize((matWorldIT * vec4(normal, 0.0)).xyz);');
        }
        if (depVarings.includes(type_1.NormalSpace.View)) {
            vs_varing.push('vec3 viewNormal = normalize((cc_matView * vec4(worldNormal, 0.0)).xyz);');
        }
        if (depVarings.includes(type_1.NormalSpace.Tangent) || depVarings.includes(type_1.NormalMapSpace)) {
            vs_varing.push('v_tangent = normalize((matWorld * vec4(tangent.xyz, 0.0)).xyz);');
            vs_varing.push('v_bitangent = cross(worldNormal, v_tangent) * tangent.w;');
            vs_varing_define.push('out vec3 v_tangent;');
            vs_varing_define.push('out vec3 v_bitangent;');
            fs_varing_define.push('in vec3 v_tangent;');
            fs_varing_define.push('in vec3 v_bitangent;');
        }
        if (depVarings.includes(type_1.ViewDirectionSpace.World) || depVarings.includes(type_1.ViewDirectionSpace.View) || depVarings.includes(type_1.ViewDirectionSpace.Object)) {
            vs_varing.push('vec3 worldView = cc_cameraPos.xyz - worldPosition.xyz;');
        }
        if (depVarings.includes(type_1.ViewDirectionSpace.View)) {
            vs_varing.push('vec3 viewView = (cc_matView * vec4(worldView, 0.0))).xyz;');
        }
        if (depVarings.includes(type_1.ViewDirectionSpace.Object)) {
            vs_varing.push('vec3 view = (matWorldIT * vec4(worldView, 0.0)).xyz;');
        }
        // varing
        if (depVarings.includes(type_1.PositionSpace.Object)) {
            vs_varing_define.push('out vec3 v_pos;');
            vs_varing.push('v_pos = position.xyz;');
            fs_varing_define.push('in vec3 v_pos;');
            fs_varing.push('vec4 position = vec4(v_pos, 1.);');
        }
        if (depVarings.includes(type_1.PositionSpace.View)) {
            vs_varing_define.push('out vec3 v_viewPos;');
            vs_varing.push('v_viewPos = viewPosition.xyz;');
            fs_varing_define.push('in vec3 v_viewPos;');
            fs_varing.push('vec4 viewPosition = vec4(v_viewPos, 1.);');
        }
        if (depVarings.includes(type_1.PositionSpace.World) || depVarings.includes(type_1.PositionSpace.AbsoluteWorld)) {
            vs_varing_define.push('out vec3 v_worldPos;');
            vs_varing.push('v_worldPos = worldPosition.xyz;');
            fs_varing_define.push('in vec3 v_worldPos;');
            fs_varing.push('vec4 worldPosition = vec4(v_worldPos, 1.);');
        }
        if (depVarings.includes(type_1.NormalSpace.Object)) {
            vs_varing_define.push('out vec3 v_normal;');
            vs_varing.push('v_normal = normal;');
            fs_varing_define.push('in vec3 v_normal;');
            fs_varing.push('vec3 normal = v_normal;');
        }
        if (depVarings.includes(type_1.NormalSpace.View)) {
            vs_varing_define.push('out vec3 v_viewNormal;');
            vs_varing.push('v_viewNormal = viewNormal;');
            fs_varing_define.push('in vec3 v_viewNormal;');
            fs_varing.push('vec3 viewNormal = v_viewNormal;');
        }
        if (depVarings.includes(type_1.NormalSpace.World)) {
            vs_varing_define.push('out vec3 v_worldNormal;');
            vs_varing.push('v_worldNormal = worldNormal;');
            fs_varing_define.push('in vec3 v_worldNormal;');
            fs_varing.push('vec3 worldNormal = v_worldNormal;');
        }
        if (depVarings.includes(type_1.NormalSpace.Tangent)) {
        }
        if (depVarings.includes(type_1.ViewDirectionSpace.Object)) {
            vs_varing_define.push('out vec3 v_view;');
            vs_varing.push('v_view = view;');
            fs_varing_define.push('in vec3 v_view;');
            fs_varing.push('vec3 view = v_view;');
        }
        if (depVarings.includes(type_1.ViewDirectionSpace.View)) {
            vs_varing_define.push('out vec3 v_viewView;');
            vs_varing.push('v_viewView = viewView;');
            fs_varing_define.push('in vec3 v_viewView;');
            fs_varing.push('vec3 viewView = v_viewView;');
        }
        if (depVarings.includes(type_1.ViewDirectionSpace.World)) {
            vs_varing_define.push('out vec3 v_worldView;');
            vs_varing.push('v_worldView = worldView;');
            fs_varing_define.push('in vec3 v_worldView;');
            fs_varing.push('vec3 worldView = v_worldView;');
        }
        if (depVarings.includes(type_1.ViewDirectionSpace.Tangent)) {
        }
        code = code.replace('{{vs_varing_define}}', vs_varing_define.map(d => '  ' + d).join('\n'));
        code = code.replace('{{vs_varing}}', vs_varing.map(d => '    ' + d).join('\n'));
        code = code.replace('{{fs_varing_define}}', fs_varing_define.map(d => '  ' + d).join('\n'));
        code = code.replace('{{fs_varing}}', fs_varing.map(d => '    ' + d).join('\n'));
        return code;
    }
    generateCode() {
        let code = fs_1.default.readFileSync(this.templatePath, 'utf-8');
        code = this.generateVarings(code);
        const vsCode = this.generateVsCode();
        const fsCode = this.generateFsCode();
        code = code.replace('{{vs}}', vsCode);
        code = code.replace('{{fs}}', fsCode);
        code = this.replaceChunks(code);
        if (!this.properties || this.properties.length === 0) {
            code = code.replace(/properties: &props/g, '');
            code = code.replace(/properties: \*props/g, '');
        }
        let props = this.generatePropertiesCode();
        code = code.replace('{{properties}}', props.uniform);
        code = code.replace('{{properties_sampler}}', props.uniformSampler);
        code = code.replace('{{properties_mtl}}', props.mtl);
        // old shader graph version do not have vertex slots
        let vertexSlotNames = ['Vertex Position', 'Vertex Normal', 'Vertex Tangent', 'Position'];
        this.inputSlots.forEach(slot => {
            var tempName = `slot_${slot.displayName.replace(/ /g, '_')}`;
            let value;
            if (vertexSlotNames.includes(slot.displayName) || slot.displayName === 'Normal') {
                if (slot.connectSlot) {
                    value = slot.slotValue;
                }
            }
            else {
                value = slot.slotValue;
            }
            let reg = new RegExp(`{{${tempName} *=* *(.*)}}`);
            if (value === undefined) {
                let res = reg.exec(code);
                if (res) {
                    value = res[1];
                }
            }
            code = code.replace(reg, value);
        });
        vertexSlotNames.forEach(name => {
            var tempName = `slot_${name.replace(/ /g, '_')}`;
            let value = '';
            let reg = new RegExp(`{{${tempName} *=* *(.*)}}`);
            let res = reg.exec(code);
            if (res) {
                value = res[1];
            }
            code = code.replace(reg, value);
        });
        return code;
    }
}
exports.default = MasterNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFzdGVyTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NvdXJjZS9wYW5lbC9vcGVyYXRpb24vbm9kZXMvbWFzdGVyL01hc3Rlck5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBbUU7QUFDbkUsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUN4QixvRUFBNEM7QUFDNUMscUNBQTZJO0FBQzdJLHVDQUFpRDtBQUVqRCxTQUFTLGdCQUFnQixDQUFFLElBQWdCLEVBQUUsS0FBbUI7SUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO1FBQUUsT0FBTztJQUU5QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztJQUN4QyxJQUFJLFdBQVcsRUFBRTtRQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzlCLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDM0I7YUFDSTtZQUNELE9BQU87U0FDVjtRQUVELFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xDLGdCQUFnQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQTtLQUNMO0FBQ0wsQ0FBQztBQUVELE1BQXFCLFVBQVcsU0FBUSxpQkFBVTtJQUFsRDs7UUFFSSxrQkFBYSxHQUFhLEVBQUUsQ0FBQztRQUM3QixrQkFBYSxHQUFhLEVBQUUsQ0FBQztRQUU3QixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUVsQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQiwwQkFBcUIsR0FBRyw0QkFBcUIsQ0FBQyxLQUFLLENBQUM7UUFFcEQsZUFBVSxHQUFvQixFQUFFLENBQUM7SUE4VXJDLENBQUM7SUE1VUcsZUFBZSxDQUFFLFdBQXFCO1FBQ2xDLElBQUksVUFBVSxHQUFpQixF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Q0FBQyxDQUFDO2lCQUNsQjthQUNKO1lBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFBO1FBRUYsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzQixJQUFJLFFBQVEsR0FBRyxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDakQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxRQUFRLGNBQWMsQ0FBQyxDQUFDO1lBQ2xELElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQjtZQUNELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQXhWRCw2QkF3VkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGFkZXJOb2RlLCBTaGFkZXJTbG90LCBTaGFkZXJQcm9wZXJ5IH0gZnJvbSBcIi4uLy4uL2Jhc2VcIjtcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBTaGFkZXJHcmFwaCBmcm9tIFwiLi4vLi4vc2hhZGVyZ3JhcGhcIjtcbmltcG9ydCB7IENvbmNyZXRlUHJlY2lzaW9uVHlwZSwgVGV4dHVyZUNvbmNyZXRlUHJlY2lzaW9uLCBOb3JtYWxTcGFjZSwgTm9ybWFsTWFwU3BhY2UsIFZpZXdEaXJlY3Rpb25TcGFjZSwgUG9zaXRpb25TcGFjZSB9IGZyb20gXCIuLi8uLi90eXBlXCI7XG5pbXBvcnQgeyBzaGFkZXJUZW1wbGF0ZXNEaXIgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcblxuZnVuY3Rpb24gZmluZENvbm5lY3ROb2RlcyAoc2xvdDogU2hhZGVyU2xvdCwgbm9kZXM6IFNoYWRlck5vZGVbXSkge1xuICAgIGlmICghc2xvdC5jb25uZWN0U2xvdCkgcmV0dXJuO1xuXG4gICAgbGV0IGNvbm5lY3ROb2RlID0gc2xvdC5jb25uZWN0U2xvdC5ub2RlO1xuICAgIGlmIChjb25uZWN0Tm9kZSkge1xuICAgICAgICBpZiAoIW5vZGVzLmluY2x1ZGVzKGNvbm5lY3ROb2RlKSkge1xuICAgICAgICAgICAgbm9kZXMucHVzaChjb25uZWN0Tm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25uZWN0Tm9kZS5pbnB1dFNsb3RzLmZvckVhY2goc2xvdCA9PiB7XG4gICAgICAgICAgICBmaW5kQ29ubmVjdE5vZGVzKHNsb3QsIG5vZGVzKTtcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hc3Rlck5vZGUgZXh0ZW5kcyBTaGFkZXJOb2RlIHtcblxuICAgIHZzU2xvdEluZGljZXM6IHN0cmluZ1tdID0gW107XG4gICAgZnNTbG90SW5kaWNlczogc3RyaW5nW10gPSBbXTtcblxuICAgIHRlbXBsYXRlUGF0aCA9ICcnO1xuXG4gICAgaXNNYXN0ZXJOb2RlID0gdHJ1ZTtcbiAgICBjb25jcmV0ZVByZWNpc2lvblR5cGUgPSBDb25jcmV0ZVByZWNpc2lvblR5cGUuRml4ZWQ7XG5cbiAgICBwcm9wZXJ0aWVzOiBTaGFkZXJQcm9wZXJ5W10gPSBbXTtcblxuICAgIGdldENvbm5lY3ROb2RlcyAoc2xvdEluZGljZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGxldCBpbnB1dFNsb3RzOiBTaGFkZXJTbG90W10gPSBbXTtcbiAgICAgICAgc2xvdEluZGljZXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5nZXRTbG90V2l0aFNsb3ROYW1lKG5hbWUpXG4gICAgICAgICAgICBpZiAoc2xvdCkge1xuICAgICAgICAgICAgICAgIGlucHV0U2xvdHMucHVzaChzbG90KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgbm9kZXM6IFNoYWRlck5vZGVbXSA9IFtdO1xuICAgICAgICBpbnB1dFNsb3RzLmZvckVhY2goc2xvdCA9PiB7XG4gICAgICAgICAgICBmaW5kQ29ubmVjdE5vZGVzKHNsb3QsIG5vZGVzKTtcbiAgICAgICAgfSlcblxuICAgICAgICBub2Rlcy5zb3J0KChhLCBiKSA9PiBiLnByaW9yaXR5IC0gYS5wcmlvcml0eSk7XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICB9XG5cbiAgICBnZW5lcmF0ZVZzQ29kZSAoKSB7XG4gICAgICAgIGxldCBjb2RlOiBzdHJpbmdbXSA9IFsnXFxuJ107XG5cbiAgICAgICAgbGV0IG5vZGVzID0gdGhpcy5nZXRDb25uZWN0Tm9kZXModGhpcy52c1Nsb3RJbmRpY2VzKTtcbiAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgIG5vZGUuZ2VuZXJhdGVDb2RlKCkuc3BsaXQoJ1xcbicpLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICAgICAgY29kZS5wdXNoKCcgICAgJyArIGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG5cblxuICAgICAgICByZXR1cm4gY29kZS5qb2luKCdcXG4nKTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUZzQ29kZSAoKSB7XG4gICAgICAgIGxldCBjb2RlOiBzdHJpbmdbXSA9IFsnXFxuJ107XG5cbiAgICAgICAgbGV0IG5vZGVzID0gdGhpcy5nZXRDb25uZWN0Tm9kZXModGhpcy5mc1Nsb3RJbmRpY2VzKTtcbiAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgIG5vZGUuZ2VuZXJhdGVDb2RlKCkuc3BsaXQoJ1xcbicpLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICAgICAgYyArPSBgIC8vICR7bm9kZS5jb25zdHJ1Y3Rvci5uYW1lfWBcbiAgICAgICAgICAgICAgICBjb2RlLnB1c2goJyAgICAnICsgYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gY29kZS5qb2luKCdcXG4nKTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZVByb3BlcnRpZXNDb2RlICgpIHtcbiAgICAgICAgbGV0IHVuaWZvcm0gPSAnXFxuJztcbiAgICAgICAgbGV0IG10bCA9ICdcXG4nXG4gICAgICAgIGxldCB1bmlmb3JtU2FtcGxlciA9ICcnO1xuXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5wcm9wZXJ0aWVzO1xuICAgICAgICBwcm9wZXJ0aWVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiLmNvbmNyZXRlUHJlY2lzaW9uIC0gYS5jb25jcmV0ZVByZWNpc2lvbjtcbiAgICAgICAgfSlcblxuICAgICAgICBsZXQgYmxvY2tVbmlmb3JtQ291bnQgPSAwO1xuXG4gICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgIGxldCBwcmVjaXNpb24gPSAnJztcbiAgICAgICAgICAgIGxldCBtdGxWYWx1ZSA9ICcnO1xuXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBwLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgIGxldCBpc0NvbG9yID0gdmFsdWUuciAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgbGV0IHggPSBpc0NvbG9yID8gdmFsdWUuciA6IHZhbHVlLng7XG4gICAgICAgICAgICBsZXQgeSA9IGlzQ29sb3IgPyB2YWx1ZS5nIDogdmFsdWUueTtcbiAgICAgICAgICAgIGxldCB6ID0gaXNDb2xvciA/IHZhbHVlLmIgOiB2YWx1ZS56O1xuICAgICAgICAgICAgbGV0IHcgPSBpc0NvbG9yID8gdmFsdWUuYSA6IHZhbHVlLnc7XG5cbiAgICAgICAgICAgIGxldCBjb25jcmV0ZVByZWNpc2lvbiA9IHAubm9kZSEub3V0cHV0U2xvdHNbMF0uY29uY3JldGVQcmVjaXNpb247XG5cbiAgICAgICAgICAgIGlmIChjb25jcmV0ZVByZWNpc2lvbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHByZWNpc2lvbiA9ICdmbG9hdCc7XG4gICAgICAgICAgICAgICAgbXRsVmFsdWUgPSBgJHt2YWx1ZX1gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb25jcmV0ZVByZWNpc2lvbiA9PT0gMikge1xuICAgICAgICAgICAgICAgIHByZWNpc2lvbiA9ICd2ZWMyJztcbiAgICAgICAgICAgICAgICBtdGxWYWx1ZSA9IGBbJHt4fSwgJHt5fV1gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb25jcmV0ZVByZWNpc2lvbiA9PT0gMykge1xuICAgICAgICAgICAgICAgIHByZWNpc2lvbiA9ICd2ZWM0JztcbiAgICAgICAgICAgICAgICBtdGxWYWx1ZSA9IGBbJHt4fSwgJHt5fSwgJHt6fSwgMF1gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb25jcmV0ZVByZWNpc2lvbiA9PT0gNCkge1xuICAgICAgICAgICAgICAgIHByZWNpc2lvbiA9ICd2ZWM0JztcbiAgICAgICAgICAgICAgICBtdGxWYWx1ZSA9IGBbJHt4fSwgJHt5fSwgJHt6fSwgICR7d31dYFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29uY3JldGVQcmVjaXNpb24gPT09IFRleHR1cmVDb25jcmV0ZVByZWNpc2lvbi5UZXh0dXJlMkQpIHtcbiAgICAgICAgICAgICAgICBwcmVjaXNpb24gPSAnc2FtcGxlcjJEJ1xuICAgICAgICAgICAgICAgIG10bFZhbHVlID0gJ3doaXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29uY3JldGVQcmVjaXNpb24gPT09IFRleHR1cmVDb25jcmV0ZVByZWNpc2lvbi5UZXh0dXJlQ3ViZSkge1xuICAgICAgICAgICAgICAgIHByZWNpc2lvbiA9ICdzYW1wbGVyQ3ViZSdcbiAgICAgICAgICAgICAgICBtdGxWYWx1ZSA9ICd3aGl0ZSdcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGVkaXRvclN0ciA9IGlzQ29sb3IgPyBgLCBlZGl0b3I6IHsgdHlwZTogY29sb3IgfWAgOiAnJ1xuXG4gICAgICAgICAgICBpZiAoY29uY3JldGVQcmVjaXNpb24gPCBUZXh0dXJlQ29uY3JldGVQcmVjaXNpb24uVGV4dHVyZTJEKSB7XG4gICAgICAgICAgICAgICAgdW5pZm9ybSArPSBgICAgICR7cHJlY2lzaW9ufSAke3AubmFtZX07XFxuYDtcbiAgICAgICAgICAgICAgICBibG9ja1VuaWZvcm1Db3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdW5pZm9ybVNhbXBsZXIgKz0gYCAgdW5pZm9ybSAke3ByZWNpc2lvbn0gJHtwLm5hbWV9O1xcbmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtdGwgKz0gYCAgICAgICAgJHtwLm5hbWV9OiB7IHZhbHVlOiAke210bFZhbHVlfSAke2VkaXRvclN0cn19XFxuYFxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChibG9ja1VuaWZvcm1Db3VudCA9PT0gMCkge1xuICAgICAgICAgICAgdW5pZm9ybSArPSAnICAgIHZlYzQgZW1wdHlfdmFsdWU7XFxuJ1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVuaWZvcm0sXG4gICAgICAgICAgICB1bmlmb3JtU2FtcGxlcixcbiAgICAgICAgICAgIG10bCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXBsYWNlQ2h1bmtzIChjb2RlKSB7XG4gICAgICAgIGxldCBkZXBDaHVua3M6IHN0cmluZ1tdID0gWydjb21tb24nXTtcbiAgICAgICAgbGV0IGFsbE5vZGVzID0gU2hhZGVyR3JhcGguYWxsTm9kZXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWxsTm9kZXNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGFsbE5vZGVzW2ldW2pdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbm9kZS5kZXBDaHVua3MubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkZXBDaHVua3MuaW5jbHVkZXMobm9kZS5kZXBDaHVua3Nba10pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBDaHVua3MucHVzaChub2RlLmRlcENodW5rc1trXSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjaHVua0luY2x1ZGVzID0gJ1xcbic7XG4gICAgICAgIGxldCBjaHVua3MgPSAnXFxuJztcbiAgICAgICAgZGVwQ2h1bmtzLmZvckVhY2goY2h1bmtOYW1lID0+IHtcbiAgICAgICAgICAgIGxldCBjaHVua1BhdGggPSBwYXRoLmpvaW4oc2hhZGVyVGVtcGxhdGVzRGlyLCBgY2h1bmtzLyR7Y2h1bmtOYW1lfS5jaHVua2ApO1xuICAgICAgICAgICAgbGV0IGNodW5rID0gZnMucmVhZEZpbGVTeW5jKGNodW5rUGF0aCwgJ3V0Zi04Jyk7XG4gICAgICAgICAgICBpZiAoIWNodW5rKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQ2FuIG5vdCBmaW5kIGNodW5rIHdpdGggcGF0aCBbJHtjaHVua1BhdGh9XWApXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2h1bmtzICs9IGNodW5rICsgJ1xcbic7XG4gICAgICAgICAgICBjaHVua0luY2x1ZGVzICs9IGAgICNpbmNsdWRlIDxzaGFkZXJfZ3JhcGhfJHtjaHVua05hbWV9PlxcbmA7XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSgne3tjaHVua3N9fScsIGNodW5rcyk7XG4gICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoJ3t7dnNfY2h1bmtzfX0nLCBjaHVua0luY2x1ZGVzKTtcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSgne3tmc19jaHVua3N9fScsIGNodW5rSW5jbHVkZXMpO1xuXG4gICAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cblxuICAgIGdlbmVyYXRlVmFyaW5ncyAoY29kZSkge1xuICAgICAgICBsZXQgZGVwVmFyaW5nczogbnVtYmVyW10gPSBbXVxuICAgICAgICBsZXQgYWxsTm9kZXMgPSBTaGFkZXJHcmFwaC5hbGxOb2RlcztcbiAgICAgICAgYWxsTm9kZXMuZm9yRWFjaChub2RlcyA9PiB7XG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGUuZGVwVmFyaW5ncy5mb3JFYWNoKHZhcmluZyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZGVwVmFyaW5ncy5pbmNsdWRlcyh2YXJpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBWYXJpbmdzLnB1c2godmFyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGxldCB2c192YXJpbmdfZGVmaW5lOiBzdHJpbmdbXSA9IFsnJ11cbiAgICAgICAgbGV0IHZzX3ZhcmluZzogc3RyaW5nW10gPSBbJyddXG4gICAgICAgIGxldCBmc192YXJpbmdfZGVmaW5lOiBzdHJpbmdbXSA9IFsnJ11cbiAgICAgICAgbGV0IGZzX3ZhcmluZzogc3RyaW5nW10gPSBbJyddXG5cblxuICAgICAgICBpZiAoZGVwVmFyaW5ncy5pbmNsdWRlcyhOb3JtYWxTcGFjZS5Xb3JsZCkgfHwgZGVwVmFyaW5ncy5pbmNsdWRlcyhOb3JtYWxTcGFjZS5WaWV3KSB8fCBkZXBWYXJpbmdzLmluY2x1ZGVzKE5vcm1hbFNwYWNlLlRhbmdlbnQpIHx8IGRlcFZhcmluZ3MuaW5jbHVkZXMoTm9ybWFsTWFwU3BhY2UpKSB7XG4gICAgICAgICAgICB2c192YXJpbmcucHVzaCgndmVjMyB3b3JsZE5vcm1hbCA9IG5vcm1hbGl6ZSgobWF0V29ybGRJVCAqIHZlYzQobm9ybWFsLCAwLjApKS54eXopOycpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXBWYXJpbmdzLmluY2x1ZGVzKE5vcm1hbFNwYWNlLlZpZXcpKSB7XG4gICAgICAgICAgICB2c192YXJpbmcucHVzaCgndmVjMyB2aWV3Tm9ybWFsID0gbm9ybWFsaXplKChjY19tYXRWaWV3ICogdmVjNCh3b3JsZE5vcm1hbCwgMC4wKSkueHl6KTsnKVxuICAgICAgICB9XG4gICAgICAgIGlmIChkZXBWYXJpbmdzLmluY2x1ZGVzKE5vcm1hbFNwYWNlLlRhbmdlbnQpIHx8IGRlcFZhcmluZ3MuaW5jbHVkZXMoTm9ybWFsTWFwU3BhY2UpKSB7XG4gICAgICAgICAgICB2c192YXJpbmcucHVzaCgndl90YW5nZW50ID0gbm9ybWFsaXplKChtYXRXb3JsZCAqIHZlYzQodGFuZ2VudC54eXosIDAuMCkpLnh5eik7JylcbiAgICAgICAgICAgIHZzX3ZhcmluZy5wdXNoKCd2X2JpdGFuZ2VudCA9IGNyb3NzKHdvcmxkTm9ybWFsLCB2X3RhbmdlbnQpICogdGFuZ2VudC53OycpXG5cbiAgICAgICAgICAgIHZzX3ZhcmluZ19kZWZpbmUucHVzaCgnb3V0IHZlYzMgdl90YW5nZW50OycpXG4gICAgICAgICAgICB2c192YXJpbmdfZGVmaW5lLnB1c2goJ291dCB2ZWMzIHZfYml0YW5nZW50OycpXG5cbiAgICAgICAgICAgIGZzX3ZhcmluZ19kZWZpbmUucHVzaCgnaW4gdmVjMyB2X3RhbmdlbnQ7JylcbiAgICAgICAgICAgIGZzX3ZhcmluZ19kZWZpbmUucHVzaCgnaW4gdmVjMyB2X2JpdGFuZ2VudDsnKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlcFZhcmluZ3MuaW5jbHVkZXMoVmlld0RpcmVjdGlvblNwYWNlLldvcmxkKSB8fCBkZXBWYXJpbmdzLmluY2x1ZGVzKFZpZXdEaXJlY3Rpb25TcGFjZS5WaWV3KSB8fCBkZXBWYXJpbmdzLmluY2x1ZGVzKFZpZXdEaXJlY3Rpb25TcGFjZS5PYmplY3QpKSB7XG4gICAgICAgICAgICB2c192YXJpbmcucHVzaCgndmVjMyB3b3JsZFZpZXcgPSBjY19jYW1lcmFQb3MueHl6IC0gd29ybGRQb3NpdGlvbi54eXo7JylcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVwVmFyaW5ncy5pbmNsdWRlcyhWaWV3RGlyZWN0aW9uU3BhY2UuVmlldykpIHtcbiAgICAgICAgICAgIHZzX3ZhcmluZy5wdXNoKCd2ZWMzIHZpZXdWaWV3ID0gKGNjX21hdFZpZXcgKiB2ZWM0KHdvcmxkVmlldywgMC4wKSkpLnh5ejsnKVxuICAgICAgICB9XG4gICAgICAgIGlmIChkZXBWYXJpbmdzLmluY2x1ZGVzKFZpZXdEaXJlY3Rpb25TcGFjZS5PYmplY3QpKSB7XG4gICAgICAgICAgICB2c192YXJpbmcucHVzaCgndmVjMyB2aWV3ID0gKG1hdFdvcmxkSVQgKiB2ZWM0KHdvcmxkVmlldywgMC4wKSkueHl6OycpXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YXJpbmdcbiAgICAgICAgaWYgKGRlcFZhcmluZ3MuaW5jbHVkZXMoUG9zaXRpb25TcGFjZS5PYmplY3QpKSB7XG4gICAgICAgICAgICB2c192YXJpbmdfZGVmaW5lLnB1c2goJ291dCB2ZWMzIHZfcG9zOycpXG4gICAgICAgICAgICB2c192YXJpbmcucHVzaCgndl9wb3MgPSBwb3NpdGlvbi54eXo7Jyk7XG4gICAgICAgICAgICBmc192YXJpbmdfZGVmaW5lLnB1c2goJ2luIHZlYzMgdl9wb3M7Jyk7XG4gICAgICAgICAgICBmc192YXJpbmcucHVzaCgndmVjNCBwb3NpdGlvbiA9IHZlYzQodl9wb3MsIDEuKTsnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVwVmFyaW5ncy5pbmNsdWRlcyhQb3NpdGlvblNwYWNlLlZpZXcpKSB7XG4gICAgICAgICAgICB2c192YXJpbmdfZGVmaW5lLnB1c2goJ291dCB2ZWMzIHZfdmlld1BvczsnKVxuICAgICAgICAgICAgdnNfdmFyaW5nLnB1c2goJ3Zfdmlld1BvcyA9IHZpZXdQb3NpdGlvbi54eXo7Jyk7XG4gICAgICAgICAgICBmc192YXJpbmdfZGVmaW5lLnB1c2goJ2luIHZlYzMgdl92aWV3UG9zOycpO1xuICAgICAgICAgICAgZnNfdmFyaW5nLnB1c2goJ3ZlYzQgdmlld1Bvc2l0aW9uID0gdmVjNCh2X3ZpZXdQb3MsIDEuKTsnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVwVmFyaW5ncy5pbmNsdWRlcyhQb3NpdGlvblNwYWNlLldvcmxkKSB8fCBkZXBWYXJpbmdzLmluY2x1ZGVzKFBvc2l0aW9uU3BhY2UuQWJzb2x1dGVXb3JsZCkpIHtcbiAgICAgICAgICAgIHZzX3ZhcmluZ19kZWZpbmUucHVzaCgnb3V0IHZlYzMgdl93b3JsZFBvczsnKVxuICAgICAgICAgICAgdnNfdmFyaW5nLnB1c2goJ3Zfd29ybGRQb3MgPSB3b3JsZFBvc2l0aW9uLnh5ejsnKTtcbiAgICAgICAgICAgIGZzX3ZhcmluZ19kZWZpbmUucHVzaCgnaW4gdmVjMyB2X3dvcmxkUG9zOycpO1xuICAgICAgICAgICAgZnNfdmFyaW5nLnB1c2goJ3ZlYzQgd29ybGRQb3NpdGlvbiA9IHZlYzQodl93b3JsZFBvcywgMS4pOycpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXBWYXJpbmdzLmluY2x1ZGVzKE5vcm1hbFNwYWNlLk9iamVjdCkpIHtcbiAgICAgICAgICAgIHZzX3ZhcmluZ19kZWZpbmUucHVzaCgnb3V0IHZlYzMgdl9ub3JtYWw7JylcbiAgICAgICAgICAgIHZzX3ZhcmluZy5wdXNoKCd2X25vcm1hbCA9IG5vcm1hbDsnKTtcbiAgICAgICAgICAgIGZzX3ZhcmluZ19kZWZpbmUucHVzaCgnaW4gdmVjMyB2X25vcm1hbDsnKTtcbiAgICAgICAgICAgIGZzX3ZhcmluZy5wdXNoKCd2ZWMzIG5vcm1hbCA9IHZfbm9ybWFsOycpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXBWYXJpbmdzLmluY2x1ZGVzKE5vcm1hbFNwYWNlLlZpZXcpKSB7XG4gICAgICAgICAgICB2c192YXJpbmdfZGVmaW5lLnB1c2goJ291dCB2ZWMzIHZfdmlld05vcm1hbDsnKVxuICAgICAgICAgICAgdnNfdmFyaW5nLnB1c2goJ3Zfdmlld05vcm1hbCA9IHZpZXdOb3JtYWw7Jyk7XG4gICAgICAgICAgICBmc192YXJpbmdfZGVmaW5lLnB1c2goJ2luIHZlYzMgdl92aWV3Tm9ybWFsOycpO1xuICAgICAgICAgICAgZnNfdmFyaW5nLnB1c2goJ3ZlYzMgdmlld05vcm1hbCA9IHZfdmlld05vcm1hbDsnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVwVmFyaW5ncy5pbmNsdWRlcyhOb3JtYWxTcGFjZS5Xb3JsZCkpIHtcbiAgICAgICAgICAgIHZzX3ZhcmluZ19kZWZpbmUucHVzaCgnb3V0IHZlYzMgdl93b3JsZE5vcm1hbDsnKVxuICAgICAgICAgICAgdnNfdmFyaW5nLnB1c2goJ3Zfd29ybGROb3JtYWwgPSB3b3JsZE5vcm1hbDsnKTtcbiAgICAgICAgICAgIGZzX3ZhcmluZ19kZWZpbmUucHVzaCgnaW4gdmVjMyB2X3dvcmxkTm9ybWFsOycpO1xuICAgICAgICAgICAgZnNfdmFyaW5nLnB1c2goJ3ZlYzMgd29ybGROb3JtYWwgPSB2X3dvcmxkTm9ybWFsOycpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXBWYXJpbmdzLmluY2x1ZGVzKE5vcm1hbFNwYWNlLlRhbmdlbnQpKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVwVmFyaW5ncy5pbmNsdWRlcyhWaWV3RGlyZWN0aW9uU3BhY2UuT2JqZWN0KSkge1xuICAgICAgICAgICAgdnNfdmFyaW5nX2RlZmluZS5wdXNoKCdvdXQgdmVjMyB2X3ZpZXc7JylcbiAgICAgICAgICAgIHZzX3ZhcmluZy5wdXNoKCd2X3ZpZXcgPSB2aWV3OycpO1xuICAgICAgICAgICAgZnNfdmFyaW5nX2RlZmluZS5wdXNoKCdpbiB2ZWMzIHZfdmlldzsnKTtcbiAgICAgICAgICAgIGZzX3ZhcmluZy5wdXNoKCd2ZWMzIHZpZXcgPSB2X3ZpZXc7Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlcFZhcmluZ3MuaW5jbHVkZXMoVmlld0RpcmVjdGlvblNwYWNlLlZpZXcpKSB7XG4gICAgICAgICAgICB2c192YXJpbmdfZGVmaW5lLnB1c2goJ291dCB2ZWMzIHZfdmlld1ZpZXc7JylcbiAgICAgICAgICAgIHZzX3ZhcmluZy5wdXNoKCd2X3ZpZXdWaWV3ID0gdmlld1ZpZXc7Jyk7XG4gICAgICAgICAgICBmc192YXJpbmdfZGVmaW5lLnB1c2goJ2luIHZlYzMgdl92aWV3VmlldzsnKTtcbiAgICAgICAgICAgIGZzX3ZhcmluZy5wdXNoKCd2ZWMzIHZpZXdWaWV3ID0gdl92aWV3VmlldzsnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVwVmFyaW5ncy5pbmNsdWRlcyhWaWV3RGlyZWN0aW9uU3BhY2UuV29ybGQpKSB7XG4gICAgICAgICAgICB2c192YXJpbmdfZGVmaW5lLnB1c2goJ291dCB2ZWMzIHZfd29ybGRWaWV3OycpXG4gICAgICAgICAgICB2c192YXJpbmcucHVzaCgndl93b3JsZFZpZXcgPSB3b3JsZFZpZXc7Jyk7XG4gICAgICAgICAgICBmc192YXJpbmdfZGVmaW5lLnB1c2goJ2luIHZlYzMgdl93b3JsZFZpZXc7Jyk7XG4gICAgICAgICAgICBmc192YXJpbmcucHVzaCgndmVjMyB3b3JsZFZpZXcgPSB2X3dvcmxkVmlldzsnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVwVmFyaW5ncy5pbmNsdWRlcyhWaWV3RGlyZWN0aW9uU3BhY2UuVGFuZ2VudCkpIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSgne3t2c192YXJpbmdfZGVmaW5lfX0nLCB2c192YXJpbmdfZGVmaW5lLm1hcChkID0+ICcgICcgKyBkKS5qb2luKCdcXG4nKSlcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSgne3t2c192YXJpbmd9fScsIHZzX3ZhcmluZy5tYXAoZCA9PiAnICAgICcgKyBkKS5qb2luKCdcXG4nKSlcbiAgICAgICAgXG4gICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoJ3t7ZnNfdmFyaW5nX2RlZmluZX19JywgZnNfdmFyaW5nX2RlZmluZS5tYXAoZCA9PiAnICAnICsgZCkuam9pbignXFxuJykpXG4gICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoJ3t7ZnNfdmFyaW5nfX0nLCBmc192YXJpbmcubWFwKGQgPT4gJyAgICAnICsgZCkuam9pbignXFxuJykpXG5cbiAgICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVDb2RlICgpIHtcbiAgICAgICAgbGV0IGNvZGUgPSBmcy5yZWFkRmlsZVN5bmModGhpcy50ZW1wbGF0ZVBhdGgsICd1dGYtOCcpO1xuXG4gICAgICAgIGNvZGUgPSB0aGlzLmdlbmVyYXRlVmFyaW5ncyhjb2RlKTtcblxuICAgICAgICBjb25zdCB2c0NvZGUgPSB0aGlzLmdlbmVyYXRlVnNDb2RlKCk7XG4gICAgICAgIGNvbnN0IGZzQ29kZSA9IHRoaXMuZ2VuZXJhdGVGc0NvZGUoKTtcblxuICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKCd7e3ZzfX0nLCB2c0NvZGUpO1xuICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKCd7e2ZzfX0nLCBmc0NvZGUpO1xuXG4gICAgICAgIGNvZGUgPSB0aGlzLnJlcGxhY2VDaHVua3MoY29kZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnByb3BlcnRpZXMgfHwgdGhpcy5wcm9wZXJ0aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSgvcHJvcGVydGllczogJnByb3BzL2csICcnKTtcbiAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL3Byb3BlcnRpZXM6IFxcKnByb3BzL2csICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9wcyA9IHRoaXMuZ2VuZXJhdGVQcm9wZXJ0aWVzQ29kZSgpO1xuICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKCd7e3Byb3BlcnRpZXN9fScsIHByb3BzLnVuaWZvcm0pO1xuICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKCd7e3Byb3BlcnRpZXNfc2FtcGxlcn19JywgcHJvcHMudW5pZm9ybVNhbXBsZXIpO1xuICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKCd7e3Byb3BlcnRpZXNfbXRsfX0nLCBwcm9wcy5tdGwpOyBcblxuICAgICAgICBcbiAgICAgICAgLy8gb2xkIHNoYWRlciBncmFwaCB2ZXJzaW9uIGRvIG5vdCBoYXZlIHZlcnRleCBzbG90c1xuICAgICAgICBsZXQgdmVydGV4U2xvdE5hbWVzID0gWydWZXJ0ZXggUG9zaXRpb24nLCAnVmVydGV4IE5vcm1hbCcsICdWZXJ0ZXggVGFuZ2VudCcsICdQb3NpdGlvbiddO1xuXG4gICAgICAgIHRoaXMuaW5wdXRTbG90cy5mb3JFYWNoKHNsb3QgPT4ge1xuICAgICAgICAgICAgdmFyIHRlbXBOYW1lID0gYHNsb3RfJHtzbG90LmRpc3BsYXlOYW1lLnJlcGxhY2UoLyAvZywgJ18nKX1gO1xuICAgICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgICAgaWYgKHZlcnRleFNsb3ROYW1lcy5pbmNsdWRlcyhzbG90LmRpc3BsYXlOYW1lKSB8fCBzbG90LmRpc3BsYXlOYW1lID09PSAnTm9ybWFsJykge1xuICAgICAgICAgICAgICAgIGlmIChzbG90LmNvbm5lY3RTbG90KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gc2xvdC5zbG90VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzbG90LnNsb3RWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHJlZyA9IG5ldyBSZWdFeHAoYHt7JHt0ZW1wTmFtZX0gKj0qICooLiopfX1gKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IHJlZy5leGVjKGNvZGUpO1xuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSByZXNbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZWcsIHZhbHVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIHZlcnRleFNsb3ROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgdmFyIHRlbXBOYW1lID0gYHNsb3RfJHtuYW1lLnJlcGxhY2UoLyAvZywgJ18nKX1gO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gJyc7XG4gICAgICAgICAgICBsZXQgcmVnID0gbmV3IFJlZ0V4cChge3ske3RlbXBOYW1lfSAqPSogKiguKil9fWApO1xuICAgICAgICAgICAgbGV0IHJlcyA9IHJlZy5leGVjKGNvZGUpO1xuICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gcmVzWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZWcsIHZhbHVlKTtcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG59XG4iXX0=