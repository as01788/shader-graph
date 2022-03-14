"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrecisionName = exports.getValueConcretePrecision = exports.getValueElementStr = exports.getValueElement = exports.getFloatString = exports.getJsonObject = exports.shaderTemplatesDir = void 0;
const type_1 = require("./type");
const path_1 = __importDefault(require("path"));
exports.shaderTemplatesDir = path_1.default.join(__dirname, '../../../static/shader-templates');
function getJsonObject(str) {
    let content;
    try {
        content = JSON.parse(str);
    }
    catch (err) {
        console.error(err);
    }
    return content;
}
exports.getJsonObject = getJsonObject;
function getFloatString(value) {
    if (typeof value !== 'number') {
        return value;
    }
    let str = value + '';
    if (!str.includes('.')) {
        str += '.';
    }
    return str;
}
exports.getFloatString = getFloatString;
let ValueElements = {
    vector: ['x', 'y', 'z', 'w'],
    color: ['r', 'g', 'b', 'a'],
    mat4: ['e00', 'e01', 'e02', 'e03']
};
function getValueElement(value, index) {
    if (typeof value === 'number') {
        return value;
    }
    let elements;
    if (value.x !== undefined) {
        elements = ValueElements.vector;
    }
    else if (value.r !== undefined) {
        elements = ValueElements.color;
    }
    else if (value.e00 !== undefined) {
        elements = ValueElements.mat4;
    }
    return value[elements[index]] || 0;
}
exports.getValueElement = getValueElement;
function getValueElementStr(value, index) {
    return getFloatString(getValueElement(value, index));
}
exports.getValueElementStr = getValueElementStr;
function getValueConcretePrecision(value) {
    let valueConretePresition = 1;
    if (typeof value === 'object') {
        if (value.w !== undefined || value.a !== undefined) {
            valueConretePresition = 4;
        }
        else if (value.z !== undefined || value.b !== undefined) {
            valueConretePresition = 3;
        }
        else if (value.y !== undefined || value.g !== undefined) {
            valueConretePresition = 2;
        }
        else if (value.m_SerializedTexture !== undefined) {
            valueConretePresition = type_1.TextureConcretePrecision.Texture2D;
        }
        else if (value.m_SerializedCubemap !== undefined) {
            valueConretePresition = type_1.TextureConcretePrecision.TextureCube;
        }
    }
    return valueConretePresition;
}
exports.getValueConcretePrecision = getValueConcretePrecision;
function getPrecisionName(precision) {
    let name = '';
    if (precision === 1) {
        name = 'float';
    }
    else if (precision === 2) {
        name = 'vec2';
    }
    else if (precision === 3) {
        name = 'vec3';
    }
    else if (precision === 4) {
        name = 'vec4';
    }
    else if (precision === type_1.TextureConcretePrecision.Texture2D) {
        name = 'sampler2D';
    }
    else if (precision === type_1.TextureConcretePrecision.TextureCube) {
        name = 'samplerCube';
    }
    return name;
}
exports.getPrecisionName = getPrecisionName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlDQUFrRDtBQUNsRCxnREFBd0I7QUFFWCxRQUFBLGtCQUFrQixHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGtDQUFrQyxDQUFDLENBQUE7QUFFMUYsU0FBZ0IsYUFBYSxDQUFFLEdBQVc7SUFDdEMsSUFBSSxPQUFPLENBQUM7SUFDWixJQUFJO1FBQ0EsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDN0I7SUFDRCxPQUFPLEdBQUcsRUFBRTtRQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdEI7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBVEQsc0NBU0M7QUFFRCxTQUFnQixjQUFjLENBQUUsS0FBYTtJQUN6QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUMzQixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELElBQUksR0FBRyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDcEIsR0FBRyxJQUFJLEdBQUcsQ0FBQztLQUNkO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBVkQsd0NBVUM7QUFFRCxJQUFJLGFBQWEsR0FBRztJQUNoQixNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDNUIsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQzNCLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztDQUNyQyxDQUFBO0FBRUQsU0FBZ0IsZUFBZSxDQUFFLEtBQW1CLEVBQUUsS0FBYTtJQUMvRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUMzQixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELElBQUksUUFBUSxDQUFDO0lBRWIsSUFBSSxLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUN2QixRQUFRLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztLQUNuQztTQUNJLElBQUksS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7UUFDNUIsUUFBUSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7S0FDbEM7U0FDSSxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO1FBQzlCLFFBQVEsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO0tBQ2pDO0lBRUQsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFsQkQsMENBa0JDO0FBRUQsU0FBZ0Isa0JBQWtCLENBQUMsS0FBc0IsRUFBRSxLQUFhO0lBQ3BFLE9BQU8sY0FBYyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBRkQsZ0RBRUM7QUFFRCxTQUFnQix5QkFBeUIsQ0FBRSxLQUFLO0lBQzVDLElBQUkscUJBQXFCLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzNCLElBQUksS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDaEQscUJBQXFCLEdBQUcsQ0FBQyxDQUFDO1NBQzdCO2FBQ0ksSUFBSSxLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNyRCxxQkFBcUIsR0FBRyxDQUFDLENBQUM7U0FDN0I7YUFDSSxJQUFJLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ3JELHFCQUFxQixHQUFHLENBQUMsQ0FBQztTQUM3QjthQUNJLElBQUksS0FBSyxDQUFDLG1CQUFtQixLQUFLLFNBQVMsRUFBRTtZQUM5QyxxQkFBcUIsR0FBRywrQkFBd0IsQ0FBQyxTQUFTLENBQUM7U0FDOUQ7YUFDSSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLEVBQUU7WUFDOUMscUJBQXFCLEdBQUcsK0JBQXdCLENBQUMsV0FBVyxDQUFDO1NBQ2hFO0tBQ0o7SUFDRCxPQUFPLHFCQUFxQixDQUFDO0FBQ2pDLENBQUM7QUFwQkQsOERBb0JDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUUsU0FBaUI7SUFDL0MsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2QsSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFO1FBQ2pCLElBQUksR0FBRyxPQUFPLENBQUM7S0FDbEI7U0FDSSxJQUFJLFNBQVMsS0FBSyxDQUFDLEVBQUU7UUFDdEIsSUFBSSxHQUFHLE1BQU0sQ0FBQztLQUNqQjtTQUNJLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTtRQUN0QixJQUFJLEdBQUcsTUFBTSxDQUFDO0tBQ2pCO1NBQ0ksSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLElBQUksR0FBRyxNQUFNLENBQUM7S0FDakI7U0FDSSxJQUFJLFNBQVMsS0FBSywrQkFBd0IsQ0FBQyxTQUFTLEVBQUU7UUFDdkQsSUFBSSxHQUFHLFdBQVcsQ0FBQztLQUN0QjtTQUNJLElBQUksU0FBUyxLQUFLLCtCQUF3QixDQUFDLFdBQVcsRUFBRTtRQUN6RCxJQUFJLEdBQUcsYUFBYSxDQUFDO0tBQ3hCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXJCRCw0Q0FxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0dXJlQ29uY3JldGVQcmVjaXNpb24gfSBmcm9tIFwiLi90eXBlXCI7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGNvbnN0IHNoYWRlclRlbXBsYXRlc0RpciA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8uLi8uLi9zdGF0aWMvc2hhZGVyLXRlbXBsYXRlcycpXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRKc29uT2JqZWN0IChzdHI6IHN0cmluZykge1xuICAgIGxldCBjb250ZW50O1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnRlbnQgPSBKU09OLnBhcnNlKHN0cik7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH1cbiAgICByZXR1cm4gY29udGVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZsb2F0U3RyaW5nICh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGxldCBzdHIgPSB2YWx1ZSArICcnO1xuICAgIGlmICghc3RyLmluY2x1ZGVzKCcuJykpIHtcbiAgICAgICAgc3RyICs9ICcuJztcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cblxubGV0IFZhbHVlRWxlbWVudHMgPSB7XG4gICAgdmVjdG9yOiBbJ3gnLCAneScsICd6JywgJ3cnXSxcbiAgICBjb2xvcjogWydyJywgJ2cnLCAnYicsICdhJ10sXG4gICAgbWF0NDogWydlMDAnLCAnZTAxJywgJ2UwMicsICdlMDMnXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWVFbGVtZW50ICh2YWx1ZTogYW55IHwgbnVtYmVyLCBpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgbGV0IGVsZW1lbnRzO1xuXG4gICAgaWYgKHZhbHVlLnggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlbGVtZW50cyA9IFZhbHVlRWxlbWVudHMudmVjdG9yO1xuICAgIH1cbiAgICBlbHNlIGlmICh2YWx1ZS5yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZWxlbWVudHMgPSBWYWx1ZUVsZW1lbnRzLmNvbG9yO1xuICAgIH1cbiAgICBlbHNlIGlmICh2YWx1ZS5lMDAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlbGVtZW50cyA9IFZhbHVlRWxlbWVudHMubWF0NDtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVbZWxlbWVudHNbaW5kZXhdXSB8fCAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWVFbGVtZW50U3RyKHZhbHVlOiBvYmplY3QgfCBudW1iZXIsIGluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBnZXRGbG9hdFN0cmluZyhnZXRWYWx1ZUVsZW1lbnQodmFsdWUsIGluZGV4KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWYWx1ZUNvbmNyZXRlUHJlY2lzaW9uICh2YWx1ZSkge1xuICAgIGxldCB2YWx1ZUNvbnJldGVQcmVzaXRpb24gPSAxO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmICh2YWx1ZS53ICE9PSB1bmRlZmluZWQgfHwgdmFsdWUuYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YWx1ZUNvbnJldGVQcmVzaXRpb24gPSA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnogIT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5iICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhbHVlQ29ucmV0ZVByZXNpdGlvbiA9IDM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUueSAhPT0gdW5kZWZpbmVkIHx8IHZhbHVlLmcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFsdWVDb25yZXRlUHJlc2l0aW9uID0gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZS5tX1NlcmlhbGl6ZWRUZXh0dXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhbHVlQ29ucmV0ZVByZXNpdGlvbiA9IFRleHR1cmVDb25jcmV0ZVByZWNpc2lvbi5UZXh0dXJlMkQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUubV9TZXJpYWxpemVkQ3ViZW1hcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YWx1ZUNvbnJldGVQcmVzaXRpb24gPSBUZXh0dXJlQ29uY3JldGVQcmVjaXNpb24uVGV4dHVyZUN1YmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlQ29ucmV0ZVByZXNpdGlvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByZWNpc2lvbk5hbWUgKHByZWNpc2lvbjogbnVtYmVyKSB7XG4gICAgbGV0IG5hbWUgPSAnJztcbiAgICBpZiAocHJlY2lzaW9uID09PSAxKSB7XG4gICAgICAgIG5hbWUgPSAnZmxvYXQnO1xuICAgIH1cbiAgICBlbHNlIGlmIChwcmVjaXNpb24gPT09IDIpIHtcbiAgICAgICAgbmFtZSA9ICd2ZWMyJztcbiAgICB9XG4gICAgZWxzZSBpZiAocHJlY2lzaW9uID09PSAzKSB7XG4gICAgICAgIG5hbWUgPSAndmVjMyc7XG4gICAgfVxuICAgIGVsc2UgaWYgKHByZWNpc2lvbiA9PT0gNCkge1xuICAgICAgICBuYW1lID0gJ3ZlYzQnO1xuICAgIH1cbiAgICBlbHNlIGlmIChwcmVjaXNpb24gPT09IFRleHR1cmVDb25jcmV0ZVByZWNpc2lvbi5UZXh0dXJlMkQpIHtcbiAgICAgICAgbmFtZSA9ICdzYW1wbGVyMkQnO1xuICAgIH1cbiAgICBlbHNlIGlmIChwcmVjaXNpb24gPT09IFRleHR1cmVDb25jcmV0ZVByZWNpc2lvbi5UZXh0dXJlQ3ViZSkge1xuICAgICAgICBuYW1lID0gJ3NhbXBsZXJDdWJlJztcbiAgICB9XG4gICAgcmV0dXJuIG5hbWU7XG59XG4iXX0=