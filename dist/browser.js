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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9icm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQWdEO0FBRWhELGdGQUF3RDtBQUN4RCxzREFBeUI7QUFDekIsZ0RBQXdCO0FBR3hCOzs7OztHQUtHO0FBQ0gsT0FBTyxDQUFDLE9BQU8sR0FBRztJQUNSLElBQUk7O1lBQ04sdUJBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBRSxHQUFXLEVBQUUsR0FBVyxFQUFFLE9BQWU7O1lBQ3BELHFCQUFXLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFBLGlCQUFpQjtZQUNwRCxJQUFJLE9BQU8sR0FBRyxxQkFBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBLE1BQU07WUFDNUMsaUJBQUUsQ0FBQyxhQUFhLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ25DLGlCQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUUvQixJQUFJLE9BQU8sR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDLHVCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0RCxJQUFJLEdBQUcsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQzVCLE1BQU0sdUJBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkUsQ0FBQztLQUFBO0NBQ0osQ0FBQztBQUVGOzs7R0FHRztBQUNILE9BQU8sQ0FBQyxJQUFJLEdBQUcsY0FBWSxDQUFDLENBQUM7QUFFN0I7OztHQUdHO0FBQ0gsT0FBTyxDQUFDLE1BQU0sR0FBRyxjQUFZLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVkaXRvciB9IGZyb20gJy4vdXRpbHMvZWRpdG9yLWV4cG9ydHMnO1xyXG5cclxuaW1wb3J0IFNoYWRlckdyYXBoIGZyb20gJy4vcGFuZWwvb3BlcmF0aW9uL3NoYWRlcmdyYXBoJztcclxuaW1wb3J0IGZzIGZyb20gJ2ZpcmUtZnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcblxyXG4vKipcclxuICog5o+S5Lu25a6a5LmJ55qE5pa55rOVXHJcbiAqIE1ldGhvZHMgZGVmaW5lZCBieSBwbHVnLWluc1xyXG4gKiDlj6/ku6XlnKggcGFja2FnZS5qc29uIOmHjOeahCBjb250cmlidXRpb25zIOmHjOWumuS5iSBtZXNzYWdlcyDop6blj5Hov5nph4znmoTmlrnms5VcclxuICogQW5kIG9mIGNvdXJzZSwgbWVzc2FnZXMgY2FuIGJlIGRlZmluZWQgaW4gdGhlIGNvbnRyaWJ1dGlvbnMgc2VjdGlvbiBpbiBwYWNrYWdlLkpTT04gdG8gdHJpZ2dlciB0aGUgbWV0aG9kIGhlcmVcclxuICovXHJcbmV4cG9ydHMubWV0aG9kcyA9IHtcclxuICAgIGFzeW5jIG9wZW4oKSB7XHJcbiAgICAgICAgRWRpdG9yLlBhbmVsLm9wZW4oJ3NoYWRlci1ncmFwZ2gnKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgY29udmVydCAoc3JjOiBzdHJpbmcsIGRzdDogc3RyaW5nLCBiYXNlRGlyOiBzdHJpbmcpIHtcclxuICAgICAgICBTaGFkZXJHcmFwaC5zdWJncmFwaFBhdGggPSBiYXNlRGlyOy8v5b6X5Yiwc2hhZGVyZ3JhcGjnm67lvZVcclxuICAgICAgICBsZXQgY29udGVudCA9IFNoYWRlckdyYXBoLmRlY29kZShzcmMpOy8v5byA5aeL6L2s5o2iXHJcbiAgICAgICAgZnMuZW5zdXJlRGlyU3luYyhwYXRoLmRpcm5hbWUoZHN0KSlcclxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGRzdCwgY29udGVudCk7XHJcblxyXG4gICAgICAgIGxldCByZWxQYXRoID0gcGF0aC5yZWxhdGl2ZShFZGl0b3IuUHJvamVjdC5wYXRoLCBkc3QpO1xyXG4gICAgICAgIGxldCB1cmwgPSAnZGI6Ly8nICsgcmVsUGF0aDtcclxuICAgICAgICBhd2FpdCBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdhc3NldC1kYicsICdyZWZyZXNoLWFzc2V0JywgdXJsKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiDlkK/liqjnmoTml7blgJnmiafooYznmoTliJ3lp4vljJbmlrnms5VcclxuICogSW5pdGlhbGl6YXRpb24gbWV0aG9kIHBlcmZvcm1lZCBhdCBzdGFydHVwXHJcbiAqL1xyXG5leHBvcnRzLmxvYWQgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxuLyoqXHJcbiAqIOaPkuS7tuiiq+WFs+mXreeahOaXtuWAmeaJp+ihjOeahOWNuOi9veaWueazlVxyXG4gKiBVbmluc3RhbGwgbWV0aG9kIHBlcmZvcm1lZCB3aGVuIHRoZSBwbHVnLWluIGlzIGNsb3NlZFxyXG4gKi9cclxuZXhwb3J0cy51bmxvYWQgPSBmdW5jdGlvbigpIHt9O1xyXG4iXX0=