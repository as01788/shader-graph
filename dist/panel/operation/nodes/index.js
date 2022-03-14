"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNode = void 0;
const base_1 = require("../base");
const globby_1 = __importDefault(require("globby"));
const fire_path_1 = __importDefault(require("fire-path"));
let nodePaths = globby_1.default.sync([
    fire_path_1.default.join(__dirname, './**').replace(/\\/g, '/'),
    fire_path_1.default.join(__dirname, '!./index.*').replace(/\\/g, '/'),
]);
let nodes = {};
for (let i = 0; i < nodePaths.length; i++) {
    let nodePath = nodePaths[i];
    let nodeName = fire_path_1.default.basenameNoExt(nodePath);
    nodes[nodeName] = require(nodePath).default;
}
function createNode(data) {
    let type = data.typeInfo;
    let name = type.fullName;
    name = name.replace('UnityEditor.ShaderGraph.', '');
    let ctor = nodes[name];
    if (!ctor) {
        console.warn(`Can not find Node with Name [${name}]`);
        ctor = base_1.ShaderNode;
    }
    return ctor && new ctor(data);
}
exports.createNode = createNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL25vZGVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtDQUFxQztBQUNyQyxvREFBNEI7QUFDNUIsMERBQTZCO0FBRzdCLElBQUksU0FBUyxHQUFHLGdCQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3hCLG1CQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztJQUNoRCxtQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7Q0FDekQsQ0FBQyxDQUFBO0FBQ0YsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdkMsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLElBQUksUUFBUSxHQUFHLG1CQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDO0NBQy9DO0FBRUQsU0FBZ0IsVUFBVSxDQUFFLElBQVM7SUFDakMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXBELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsSUFBSSxHQUFHLENBQUMsQ0FBQTtRQUNyRCxJQUFJLEdBQUcsaUJBQVUsQ0FBQTtLQUNwQjtJQUNELE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFYRCxnQ0FXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUgfSBmcm9tIFwiLi4vYmFzZVwiO1xuaW1wb3J0IGdsb2JieSBmcm9tICdnbG9iYnknO1xuaW1wb3J0IHBhdGggZnJvbSAnZmlyZS1wYXRoJztcblxuXG5sZXQgbm9kZVBhdGhzID0gZ2xvYmJ5LnN5bmMoW1xuICAgIHBhdGguam9pbihfX2Rpcm5hbWUsICcuLyoqJykucmVwbGFjZSgvXFxcXC9nLCAnLycpLCBcbiAgICBwYXRoLmpvaW4oX19kaXJuYW1lLCAnIS4vaW5kZXguKicpLnJlcGxhY2UoL1xcXFwvZywgJy8nKSwgXG5dKVxubGV0IG5vZGVzID0ge307XG5mb3IgKGxldCBpID0gMDsgaSA8IG5vZGVQYXRocy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBub2RlUGF0aCA9IG5vZGVQYXRoc1tpXTtcbiAgICBsZXQgbm9kZU5hbWUgPSBwYXRoLmJhc2VuYW1lTm9FeHQobm9kZVBhdGgpO1xuICAgIG5vZGVzW25vZGVOYW1lXSA9IHJlcXVpcmUobm9kZVBhdGgpLmRlZmF1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb2RlIChkYXRhOiBhbnkpIHtcbiAgICBsZXQgdHlwZSA9IGRhdGEudHlwZUluZm87XG4gICAgbGV0IG5hbWUgPSB0eXBlLmZ1bGxOYW1lO1xuICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoJ1VuaXR5RWRpdG9yLlNoYWRlckdyYXBoLicsICcnKTtcblxuICAgIGxldCBjdG9yID0gbm9kZXNbbmFtZV07IFxuICAgIGlmICghY3Rvcikge1xuICAgICAgICBjb25zb2xlLndhcm4oYENhbiBub3QgZmluZCBOb2RlIHdpdGggTmFtZSBbJHtuYW1lfV1gKVxuICAgICAgICBjdG9yID0gU2hhZGVyTm9kZVxuICAgIH1cbiAgICByZXR1cm4gY3RvciAmJiBuZXcgY3RvcihkYXRhKTtcbn1cbiJdfQ==