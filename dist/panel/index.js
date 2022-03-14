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
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.beforeClose = exports.ready = exports.messages = exports.methods = exports.$ = exports.template = exports.style = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const Vue = require('vue/dist/vue.js');
Vue.config.productionTip = false;
Vue.config.devtools = false;
let panel = null;
let $vm;
exports.style = fs_1.readFileSync(path_1.join(__dirname, '../index.css'), 'utf8');
exports.template = fs_1.readFileSync(path_1.join(__dirname, '../../static/template/index.html'), 'utf8');
exports.$ = {
    shadergraph: '.shadergraph',
};
exports.methods = {};
exports.messages = {};
function ready(tab, params) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        panel = this;
        const manager = require('./components/manager');
        manager.el = panel.$.shadergraph;
        yield manager.init();
        $vm = new Vue(manager);
    });
}
exports.ready = ready;
// 关闭之前需要获取当前的焦点元素将其焦点丢失以触发 ui 组件的 confirm 事件保存配置
function beforeClose() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.beforeClose = beforeClose;
function close() {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.close = close;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvcGFuZWwvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7QUFFYiwyQkFBc0M7QUFDdEMsK0JBQTRCO0FBRTVCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3ZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztBQUNqQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFFNUIsSUFBSSxLQUFLLEdBQVEsSUFBSSxDQUFDO0FBQ3RCLElBQUksR0FBUSxDQUFDO0FBQ0EsUUFBQSxLQUFLLEdBQUcsaUJBQVksQ0FBQyxXQUFJLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBRTlELFFBQUEsUUFBUSxHQUFHLGlCQUFZLENBQUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxrQ0FBa0MsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBRXJGLFFBQUEsQ0FBQyxHQUFHO0lBQ2IsV0FBVyxFQUFFLGNBQWM7Q0FDOUIsQ0FBQztBQUdXLFFBQUEsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNiLFFBQUEsUUFBUSxHQUFHLEVBRXZCLENBQUM7QUFFRixTQUFzQixLQUFLLENBQUMsR0FBVyxFQUFFLE1BQVc7O1FBRWhELGFBQWE7UUFDYixLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUNqQyxNQUFNLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVyQixHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQztDQUFBO0FBVkQsc0JBVUM7QUFFRCxpREFBaUQ7QUFDakQsU0FBc0IsV0FBVzs7SUFFakMsQ0FBQztDQUFBO0FBRkQsa0NBRUM7QUFFRCxTQUFzQixLQUFLOzBEQUFJLENBQUM7Q0FBQTtBQUFoQyxzQkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBmcywgeyByZWFkRmlsZVN5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5cbmNvbnN0IFZ1ZSA9IHJlcXVpcmUoJ3Z1ZS9kaXN0L3Z1ZS5qcycpO1xuVnVlLmNvbmZpZy5wcm9kdWN0aW9uVGlwID0gZmFsc2U7XG5WdWUuY29uZmlnLmRldnRvb2xzID0gZmFsc2U7XG5cbmxldCBwYW5lbDogYW55ID0gbnVsbDtcbmxldCAkdm06IGFueTtcbmV4cG9ydCBjb25zdCBzdHlsZSA9IHJlYWRGaWxlU3luYyhqb2luKF9fZGlybmFtZSwgJy4uL2luZGV4LmNzcycpLCAndXRmOCcpO1xuXG5leHBvcnQgY29uc3QgdGVtcGxhdGUgPSByZWFkRmlsZVN5bmMoam9pbihfX2Rpcm5hbWUsICcuLi8uLi9zdGF0aWMvdGVtcGxhdGUvaW5kZXguaHRtbCcpLCAndXRmOCcpO1xuXG5leHBvcnQgY29uc3QgJCA9IHtcbiAgICBzaGFkZXJncmFwaDogJy5zaGFkZXJncmFwaCcsXG59O1xuXG5cbmV4cG9ydCBjb25zdCBtZXRob2RzID0ge307XG5leHBvcnQgY29uc3QgbWVzc2FnZXMgPSB7XG4gICAgXG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZHkodGFiOiBzdHJpbmcsIHBhcmFtczogYW55KSB7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcGFuZWwgPSB0aGlzO1xuXG4gICAgY29uc3QgbWFuYWdlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tYW5hZ2VyJyk7XG4gICAgbWFuYWdlci5lbCA9IHBhbmVsLiQuc2hhZGVyZ3JhcGg7XG4gICAgYXdhaXQgbWFuYWdlci5pbml0KCk7XG4gICBcbiAgICAkdm0gPSBuZXcgVnVlKG1hbmFnZXIpO1xufVxuXG4vLyDlhbPpl63kuYvliY3pnIDopoHojrflj5blvZPliY3nmoTnhKbngrnlhYPntKDlsIblhbbnhKbngrnkuKLlpLHku6Xop6blj5EgdWkg57uE5Lu255qEIGNvbmZpcm0g5LqL5Lu25L+d5a2Y6YWN572uXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYmVmb3JlQ2xvc2UoKSB7XG5cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsb3NlKCkge31cbiJdfQ==