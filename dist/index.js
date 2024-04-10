"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatClient = void 0;
const chatClient_1 = __importDefault(require("./chatClient"));
exports.ChatClient = chatClient_1.default;
class NesaSdk {
    constructor(modelId) {
        this.modelId = modelId;
    }
    getConfig() {
        return {
            modelId: this.modelId,
        };
    }
}
exports.default = NesaSdk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOERBQXNDO0FBZ0I3QixxQkFoQkYsb0JBQVUsQ0FnQkU7QUFkbkIsTUFBTSxPQUFPO0lBR1gsWUFBWSxPQUFlO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBR0Qsa0JBQWUsT0FBTyxDQUFDIn0=