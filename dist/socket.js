"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const encryptUtils_1 = __importDefault(require("./encryptUtils"));
exports.socket = {
    web_socket: null,
    ever_succeeded: false,
    ws_url: "",
    socket_open: false,
    heartbeat_timer: undefined,
    heartbeat_interval: 5000,
    signatureData: '',
    init(handle) {
        exports.socket.ws_url = handle.ws_url;
        exports.socket.web_socket = new WebSocket(exports.socket.ws_url);
        exports.socket.web_socket.onopen = () => {
            exports.socket.socket_open = true;
            exports.socket.ever_succeeded = true;
            exports.socket.heartbeat();
            handle?.onopen && handle.onopen();
        };
        exports.socket.web_socket.onclose = (e) => {
            if (exports.socket.ever_succeeded) {
                clearInterval(exports.socket.heartbeat_timer);
                setTimeout(() => {
                    exports.socket.init(handle);
                }, exports.socket.heartbeat_interval);
                exports.socket.socket_open = false;
                handle?.onclose && handle.onclose(e);
            }
        };
        exports.socket.web_socket.onerror = (e) => {
            handle?.onerror && handle.onerror(e);
        };
        return undefined;
    },
    heartbeat() {
        if (exports.socket.heartbeat_timer) {
            clearInterval(exports.socket.heartbeat_timer);
        }
        exports.socket.heartbeat_timer = setInterval(() => {
            let send_data;
            if (this.signatureData) {
                send_data = {
                    "message": "hello",
                    "signature_message": this.signatureData
                };
            }
            else {
                this.signatureData = encryptUtils_1.default.signHeartbeat("hello");
                send_data = {
                    "message": "hello",
                    "signature_message": this.signatureData
                };
            }
            exports.socket.send(send_data);
        }, exports.socket.heartbeat_interval);
    },
    send(data, callback) {
        if (exports.socket.web_socket && (!!exports.socket.web_socket?.readyState) === exports.socket.socket_open) {
            exports.socket.web_socket.send(JSON.stringify(data));
            callback && callback();
        }
    },
    close() {
        clearInterval(exports.socket.heartbeat_timer);
        exports.socket.web_socket && exports.socket.web_socket.close();
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NvY2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrRUFBMEM7QUFxQjdCLFFBQUEsTUFBTSxHQUFZO0lBQzNCLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLGNBQWMsRUFBRSxLQUFLO0lBQ3JCLE1BQU0sRUFBRSxFQUFFO0lBQ1YsV0FBVyxFQUFFLEtBQUs7SUFDbEIsZUFBZSxFQUFFLFNBQVM7SUFDMUIsa0JBQWtCLEVBQUUsSUFBSTtJQUN4QixhQUFhLEVBQUUsRUFBRTtJQUVqQixJQUFJLENBQUMsTUFBTTtRQUNQLGNBQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM5QixjQUFNLENBQUMsVUFBVSxHQUFHLElBQUksU0FBUyxDQUFDLGNBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxjQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDNUIsY0FBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDMUIsY0FBTSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDN0IsY0FBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25CLE1BQU0sRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ3JDLENBQUMsQ0FBQTtRQUNELGNBQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxjQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3hCLGFBQWEsQ0FBQyxjQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7Z0JBQ3JDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1osY0FBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDdkIsQ0FBQyxFQUFFLGNBQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUM5QixjQUFNLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtnQkFDMUIsTUFBTSxFQUFFLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3hDLENBQUM7UUFDTCxDQUFDLENBQUE7UUFDRCxjQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzlCLE1BQU0sRUFBRSxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN4QyxDQUFDLENBQUE7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksY0FBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3pCLGFBQWEsQ0FBQyxjQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNELGNBQU0sQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUN0QyxJQUFJLFNBQVMsQ0FBQTtZQUNiLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyQixTQUFTLEdBQUc7b0JBQ1IsU0FBUyxFQUFFLE9BQU87b0JBQ2xCLG1CQUFtQixFQUFFLElBQUksQ0FBQyxhQUFhO2lCQUMxQyxDQUFBO1lBQ0wsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsc0JBQVksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ3hELFNBQVMsR0FBRztvQkFDUixTQUFTLEVBQUUsT0FBTztvQkFDbEIsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGFBQWE7aUJBQzFDLENBQUE7WUFDTCxDQUFDO1lBQ0QsY0FBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQixDQUFDLEVBQUUsY0FBTSxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFTLEVBQUUsUUFBbUI7UUFDL0IsSUFBSSxjQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLGNBQU0sQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLEtBQUssY0FBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2hGLGNBQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3QyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7UUFDM0IsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLO1FBQ0QsYUFBYSxDQUFDLGNBQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNyQyxjQUFNLENBQUMsVUFBVSxJQUFJLGNBQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDbEQsQ0FBQztDQUNKLENBQUEifQ==