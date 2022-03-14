'use strict';
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
exports.mounted = exports.methods = exports.init = exports.components = exports.computed = exports.watch = exports.data = void 0;
const fire_path_1 = __importDefault(require("fire-path"));
const fire_fs_1 = __importDefault(require("fire-fs"));
const shadergraph_1 = __importDefault(require("../operation/shadergraph"));
const editor_exports_1 = require("../../utils/editor-exports");
const globby = require('globby');
const projectPath = editor_exports_1.Editor.Project.path;
exports.data = {
    directories: []
};
exports.watch = {};
exports.computed = {};
exports.components = {};
function convertToProjectRelative(absolutePath) {
    if (fire_path_1.default.contains(projectPath, absolutePath)) {
        absolutePath = 'db://project/' + fire_path_1.default.relative(projectPath, absolutePath);
    }
    return absolutePath;
}
function convertToProjectAbsolute(relativePath) {
    if (relativePath.startsWith('db://project/')) {
        relativePath = relativePath.replace('db://project/', '');
        relativePath = fire_path_1.default.join(projectPath, relativePath);
    }
    return relativePath;
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        exports.data.directories = (yield editor_exports_1.Editor.Profile.getConfig('shader-graph', 'directories')) || [];
        exports.data.directories.forEach(d => {
            d.src = convertToProjectAbsolute(d.src);
            d.dst = convertToProjectAbsolute(d.dst);
        });
    });
}
exports.init = init;
exports.methods = {
    saveEdit() {
        const vm = this;
        let directories = vm.directories.map(d => {
            d = Object.assign({}, d);
            d.src = convertToProjectRelative(d.src);
            d.dst = convertToProjectRelative(d.dst);
            return d;
        });
        editor_exports_1.Editor.Profile.setConfig('shader-graph', 'directories', directories);
    },
    onGenerate() {
        exports.data.directories.forEach(data => {
            if (!data.enabled)
                return;
            let destDir = data.dst;
            let graphDir = data.src;
            shadergraph_1.default.subgraphPath = graphDir;
            let paths = globby.sync([
                fire_path_1.default.join(graphDir, '**/*.shadergraph').replace(/\\/g, '/'),
                fire_path_1.default.join(graphDir, '**/*.ShaderGraph').replace(/\\/g, '/')
            ]);
            paths.forEach(graphPath => {
                let relPath = fire_path_1.default.relative(graphDir, graphPath);
                let content = shadergraph_1.default.decode(graphPath);
                let dstPath = fire_path_1.default.join(destDir, fire_path_1.default.dirname(relPath), fire_path_1.default.basenameNoExt(graphPath) + '.effect');
                fire_fs_1.default.ensureDirSync(fire_path_1.default.dirname(dstPath));
                fire_fs_1.default.writeFileSync(dstPath, content);
                relPath = fire_path_1.default.relative(projectPath, dstPath);
                let url = 'db://' + relPath;
                editor_exports_1.Editor.Message.request('asset-db', 'refresh-asset', url);
            });
        });
    },
    remove(d) {
        let index = exports.data.directories.indexOf(d);
        if (index !== -1) {
            exports.data.directories.splice(index, 1);
            this.saveEdit();
        }
    },
    onAdd() {
        exports.data.directories.push({
            src: '',
            dst: fire_path_1.default.join(projectPath, 'assets'),
            enabled: true,
        });
        this.saveEdit();
    },
};
function mounted() { }
exports.mounted = mounted;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9wYW5lbC9jb21wb25lbnRzL21hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUFDYiwwREFBNkI7QUFDN0Isc0RBQXlCO0FBQ3pCLDJFQUFtRDtBQUNuRCwrREFBb0Q7QUFFcEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLE1BQU0sV0FBVyxHQUFHLHVCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztBQVEzQixRQUFBLElBQUksR0FBRztJQUNoQixXQUFXLEVBQUUsRUFBc0I7Q0FDdEMsQ0FBQztBQUVXLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUVYLFFBQUEsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVkLFFBQUEsVUFBVSxHQUFHLEVBQ3pCLENBQUM7QUFFRixTQUFTLHdCQUF3QixDQUFFLFlBQW9CO0lBQ25ELElBQUksbUJBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxFQUFFO1FBQzFDLFlBQVksR0FBRyxlQUFlLEdBQUcsbUJBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFBO0tBQzVFO0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQztBQUVELFNBQVMsd0JBQXdCLENBQUUsWUFBb0I7SUFDbkQsSUFBSSxZQUFZLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQzFDLFlBQVksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6RCxZQUFZLEdBQUcsbUJBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQ3ZEO0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQztBQUVELFNBQXNCLElBQUk7O1FB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R0FBRyxDQUFDLENBQUM7WUFDN0QsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNMLElBQUksS0FBSyxHQUFHLFlBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2QsWUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFRCxLQUFLO1FBQ0QsWUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDbEIsR0FBRyxFQUFFLEVBQUU7WUFDUCxHQUFHLEVBQUUsbUJBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztZQUNyQyxPQUFPLEVBQUUsSUFBSTtTQUNoQixDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztDQUNKLENBQUM7QUFHRixTQUFnQixPQUFPLEtBQU0sQ0FBQztBQUE5QiwwQkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5pbXBvcnQgcGF0aCBmcm9tICdmaXJlLXBhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZpcmUtZnMnO1xuaW1wb3J0IFNoYWRlckdyYXBoIGZyb20gJy4uL29wZXJhdGlvbi9zaGFkZXJncmFwaCc7XG5pbXBvcnQgeyBFZGl0b3IgfSBmcm9tICcuLi8uLi91dGlscy9lZGl0b3ItZXhwb3J0cyc7XG5cbmNvbnN0IGdsb2JieSA9IHJlcXVpcmUoJ2dsb2JieScpO1xuXG5jb25zdCBwcm9qZWN0UGF0aCA9IEVkaXRvci5Qcm9qZWN0LnBhdGg7XG5cbmludGVyZmFjZSBEaXJlY3RvcnR5UGFpciB7XG4gICAgZW5hYmxlZDogYm9vbGVhbixcbiAgICBzcmM6IHN0cmluZyxcbiAgICBkc3Q6IHN0cmluZyxcbn1cblxuZXhwb3J0IGNvbnN0IGRhdGEgPSB7XG4gICAgZGlyZWN0b3JpZXM6IFtdIGFzIERpcmVjdG9ydHlQYWlyW11cbn07XG5cbmV4cG9ydCBjb25zdCB3YXRjaCA9IHt9O1xuXG5leHBvcnQgY29uc3QgY29tcHV0ZWQgPSB7fTtcblxuZXhwb3J0IGNvbnN0IGNvbXBvbmVudHMgPSB7XG59O1xuXG5mdW5jdGlvbiBjb252ZXJ0VG9Qcm9qZWN0UmVsYXRpdmUgKGFic29sdXRlUGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKHBhdGguY29udGFpbnMocHJvamVjdFBhdGgsIGFic29sdXRlUGF0aCkpIHtcbiAgICAgICAgYWJzb2x1dGVQYXRoID0gJ2RiOi8vcHJvamVjdC8nICsgcGF0aC5yZWxhdGl2ZShwcm9qZWN0UGF0aCwgYWJzb2x1dGVQYXRoKVxuICAgIH1cbiAgICByZXR1cm4gYWJzb2x1dGVQYXRoO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0VG9Qcm9qZWN0QWJzb2x1dGUgKHJlbGF0aXZlUGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKHJlbGF0aXZlUGF0aC5zdGFydHNXaXRoKCdkYjovL3Byb2plY3QvJykpIHtcbiAgICAgICAgcmVsYXRpdmVQYXRoID0gcmVsYXRpdmVQYXRoLnJlcGxhY2UoJ2RiOi8vcHJvamVjdC8nLCAnJyk7XG4gICAgICAgIHJlbGF0aXZlUGF0aCA9IHBhdGguam9pbihwcm9qZWN0UGF0aCwgcmVsYXRpdmVQYXRoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlbGF0aXZlUGF0aDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQgKCkge1xuICAgIGRhdGEuZGlyZWN0b3JpZXMgPSBhd2FpdCBFZGl0b3IuUHJvZmlsZS5nZXRDb25maWcoJ3NoYWRlci1ncmFwaCcsICdkaXJlY3RvcmllcycpIHx8IFtdO1xuXG4gICAgZGF0YS5kaXJlY3Rvcmllcy5mb3JFYWNoKGQgPT4ge1xuICAgICAgICBkLnNyYyA9IGNvbnZlcnRUb1Byb2plY3RBYnNvbHV0ZShkLnNyYyk7XG4gICAgICAgIGQuZHN0ID0gY29udmVydFRvUHJvamVjdEFic29sdXRlKGQuZHN0KTtcbiAgICB9KVxufVxuXG5leHBvcnQgY29uc3QgbWV0aG9kcyA9IHtcbiAgICBzYXZlRWRpdCAoKSB7XG4gICAgICAgIGNvbnN0IHZtOiBhbnkgPSB0aGlzO1xuICAgICAgICBsZXQgZGlyZWN0b3JpZXMgPSB2bS5kaXJlY3Rvcmllcy5tYXAoZCA9PiB7XG4gICAgICAgICAgICBkID0gT2JqZWN0LmFzc2lnbih7fSwgZCk7XG5cbiAgICAgICAgICAgIGQuc3JjID0gY29udmVydFRvUHJvamVjdFJlbGF0aXZlKGQuc3JjKTtcbiAgICAgICAgICAgIGQuZHN0ID0gY29udmVydFRvUHJvamVjdFJlbGF0aXZlKGQuZHN0KTtcblxuICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEVkaXRvci5Qcm9maWxlLnNldENvbmZpZygnc2hhZGVyLWdyYXBoJywgJ2RpcmVjdG9yaWVzJywgZGlyZWN0b3JpZXMpO1xuICAgIH0sXG5cbiAgICBvbkdlbmVyYXRlICgpIHtcbiAgICAgICAgZGF0YS5kaXJlY3Rvcmllcy5mb3JFYWNoKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYgKCFkYXRhLmVuYWJsZWQpIHJldHVybjtcblxuICAgICAgICAgICAgbGV0IGRlc3REaXIgPSBkYXRhLmRzdDtcblxuICAgICAgICAgICAgbGV0IGdyYXBoRGlyID0gZGF0YS5zcmM7XG4gICAgICAgICAgICBTaGFkZXJHcmFwaC5zdWJncmFwaFBhdGggPSBncmFwaERpcjtcbiAgICAgICAgICAgIGxldCBwYXRocyA9IGdsb2JieS5zeW5jKFtcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4oZ3JhcGhEaXIsICcqKi8qLnNoYWRlcmdyYXBoJykucmVwbGFjZSgvXFxcXC9nLCAnLycpLFxuICAgICAgICAgICAgICAgIHBhdGguam9pbihncmFwaERpciwgJyoqLyouU2hhZGVyR3JhcGgnKS5yZXBsYWNlKC9cXFxcL2csICcvJylcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBwYXRocy5mb3JFYWNoKGdyYXBoUGF0aCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlbFBhdGggPSBwYXRoLnJlbGF0aXZlKGdyYXBoRGlyLCBncmFwaFBhdGgpO1xuICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gU2hhZGVyR3JhcGguZGVjb2RlKGdyYXBoUGF0aCk7XG4gICAgICAgICAgICAgICAgbGV0IGRzdFBhdGggPSBwYXRoLmpvaW4oZGVzdERpciwgcGF0aC5kaXJuYW1lKHJlbFBhdGgpLCBwYXRoLmJhc2VuYW1lTm9FeHQoZ3JhcGhQYXRoKSArICcuZWZmZWN0Jyk7XG4gICAgICAgICAgICAgICAgZnMuZW5zdXJlRGlyU3luYyhwYXRoLmRpcm5hbWUoZHN0UGF0aCkpXG4gICAgICAgICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhkc3RQYXRoLCBjb250ZW50KTtcblxuICAgICAgICAgICAgICAgIHJlbFBhdGggPSBwYXRoLnJlbGF0aXZlKHByb2plY3RQYXRoLCBkc3RQYXRoKTtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gJ2RiOi8vJyArIHJlbFBhdGg7XG4gICAgICAgICAgICAgICAgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnYXNzZXQtZGInLCAncmVmcmVzaC1hc3NldCcsIHVybCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICByZW1vdmUgKGQpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gZGF0YS5kaXJlY3Rvcmllcy5pbmRleE9mKGQpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBkYXRhLmRpcmVjdG9yaWVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLnNhdmVFZGl0KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25BZGQgKCkge1xuICAgICAgICBkYXRhLmRpcmVjdG9yaWVzLnB1c2goe1xuICAgICAgICAgICAgc3JjOiAnJyxcbiAgICAgICAgICAgIGRzdDogcGF0aC5qb2luKHByb2plY3RQYXRoLCAnYXNzZXRzJyksXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuc2F2ZUVkaXQoKTtcbiAgICB9LFxufTtcblxuXG5leHBvcnQgZnVuY3Rpb24gbW91bnRlZCAoKSB7IH1cbiJdfQ==