"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const editor_exports_1 = require("./utils/editor-exports");
const shadergraph_1 = __importDefault(require("./panel/operation/shadergraph"));
const fire_fs_1 = __importDefault(require("fire-fs"));
const path_1 = __importDefault(require("path"));
/**
 * 插件定义的方法
 * Methods defined by plug-ins
 * 可以在 package.json 里的 contributions 里定义 messages 触发这里的方法
 * And of course, messages can be defined in the contributions section in package.JSON to trigger the method here
 */
exports.methods = {
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            editor_exports_1.Editor.Panel.open('shader-grapgh');
        });
    },
    convert(src, dst, baseDir) {
        return __awaiter(this, void 0, void 0, function* () {
            shadergraph_1.default.subgraphPath = baseDir; //得到shadergraph目录
            let content = shadergraph_1.default.decode(src); //开始转换
            fire_fs_1.default.ensureDirSync(path_1.default.dirname(dst));
            fire_fs_1.default.writeFileSync(dst, content);
            let relPath = path_1.default.relative(editor_exports_1.Editor.Project.path, dst);
            let url = 'db://' + relPath;
            yield editor_exports_1.Editor.Message.request('asset-db', 'refresh-asset', url);
        });
    }
};
/**
 * 启动的时候执行的初始化方法
 * Initialization method performed at startup
 */
exports.load = function () { };
/**
 * 插件被关闭的时候执行的卸载方法
 * Uninstall method performed when the plug-in is closed
 */
exports.unload = function () { };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9icm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQWdEO0FBRWhELGdGQUF3RDtBQUN4RCxzREFBeUI7QUFDekIsZ0RBQXdCO0FBR3hCOzs7OztHQUtHO0FBQ0gsT0FBTyxDQUFDLE9BQU8sR0FBRztJQUNSLElBQUk7O1lBQ04sdUJBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBRSxHQUFXLEVBQUUsR0FBVyxFQUFFLE9BQWU7O1lBQ3BELHFCQUFXLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFBLGlCQUFpQjtZQUNwRCxJQUFJLE9BQU8sR0FBRyxxQkFBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBLE1BQU07WUFDNUMsaUJBQUUsQ0FBQyxhQUFhLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ25DLGlCQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUUvQixJQUFJLE9BQU8sR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDLHVCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0RCxJQUFJLEdBQUcsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQzVCLE1BQU0sdUJBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkUsQ0FBQztLQUFBO0NBQ0osQ0FBQztBQUVGOzs7R0FHRztBQUNILE9BQU8sQ0FBQyxJQUFJLEdBQUcsY0FBWSxDQUFDLENBQUM7QUFFN0I7OztHQUdHO0FBQ0gsT0FBTyxDQUFDLE1BQU0sR0FBRyxjQUFZLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVkaXRvciB9IGZyb20gJy4vdXRpbHMvZWRpdG9yLWV4cG9ydHMnO1xuXG5pbXBvcnQgU2hhZGVyR3JhcGggZnJvbSAnLi9wYW5lbC9vcGVyYXRpb24vc2hhZGVyZ3JhcGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZpcmUtZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cblxuLyoqXG4gKiDmj5Lku7blrprkuYnnmoTmlrnms5VcbiAqIE1ldGhvZHMgZGVmaW5lZCBieSBwbHVnLWluc1xuICog5Y+v5Lul5ZyoIHBhY2thZ2UuanNvbiDph4znmoQgY29udHJpYnV0aW9ucyDph4zlrprkuYkgbWVzc2FnZXMg6Kem5Y+R6L+Z6YeM55qE5pa55rOVXG4gKiBBbmQgb2YgY291cnNlLCBtZXNzYWdlcyBjYW4gYmUgZGVmaW5lZCBpbiB0aGUgY29udHJpYnV0aW9ucyBzZWN0aW9uIGluIHBhY2thZ2UuSlNPTiB0byB0cmlnZ2VyIHRoZSBtZXRob2QgaGVyZVxuICovXG5leHBvcnRzLm1ldGhvZHMgPSB7XG4gICAgYXN5bmMgb3BlbigpIHtcbiAgICAgICAgRWRpdG9yLlBhbmVsLm9wZW4oJ3NoYWRlci1ncmFwZ2gnKTtcbiAgICB9LFxuXG4gICAgYXN5bmMgY29udmVydCAoc3JjOiBzdHJpbmcsIGRzdDogc3RyaW5nLCBiYXNlRGlyOiBzdHJpbmcpIHtcbiAgICAgICAgU2hhZGVyR3JhcGguc3ViZ3JhcGhQYXRoID0gYmFzZURpcjsvL+W+l+WIsHNoYWRlcmdyYXBo55uu5b2VXG4gICAgICAgIGxldCBjb250ZW50ID0gU2hhZGVyR3JhcGguZGVjb2RlKHNyYyk7Ly/lvIDlp4vovazmjaJcbiAgICAgICAgZnMuZW5zdXJlRGlyU3luYyhwYXRoLmRpcm5hbWUoZHN0KSlcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhkc3QsIGNvbnRlbnQpO1xuXG4gICAgICAgIGxldCByZWxQYXRoID0gcGF0aC5yZWxhdGl2ZShFZGl0b3IuUHJvamVjdC5wYXRoLCBkc3QpO1xuICAgICAgICBsZXQgdXJsID0gJ2RiOi8vJyArIHJlbFBhdGg7XG4gICAgICAgIGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ2Fzc2V0LWRiJywgJ3JlZnJlc2gtYXNzZXQnLCB1cmwpO1xuICAgIH1cbn07XG5cbi8qKlxuICog5ZCv5Yqo55qE5pe25YCZ5omn6KGM55qE5Yid5aeL5YyW5pa55rOVXG4gKiBJbml0aWFsaXphdGlvbiBtZXRob2QgcGVyZm9ybWVkIGF0IHN0YXJ0dXBcbiAqL1xuZXhwb3J0cy5sb2FkID0gZnVuY3Rpb24oKSB7fTtcblxuLyoqXG4gKiDmj5Lku7booqvlhbPpl63nmoTml7blgJnmiafooYznmoTljbjovb3mlrnms5VcbiAqIFVuaW5zdGFsbCBtZXRob2QgcGVyZm9ybWVkIHdoZW4gdGhlIHBsdWctaW4gaXMgY2xvc2VkXG4gKi9cbmV4cG9ydHMudW5sb2FkID0gZnVuY3Rpb24oKSB7fTtcbiJdfQ==