"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const encryptUtils_1 = __importDefault(require("./encryptUtils"));
exports.socket = {
    web_socket: null,
    ws_url: "",
    socket_open: false,
    heartbeat_timer: undefined,
    heartbeat_interval: 5000,
    init(handle) {
        exports.socket.ws_url = handle.ws_url;
        console.log('socket: ', exports.socket);
        console.log('socket.web_socket: ', exports.socket.web_socket);
        console.log('socket.ws_url: ', exports.socket.ws_url);
        exports.socket.web_socket = new WebSocket(exports.socket.ws_url);
        exports.socket.web_socket.onopen = () => {
            exports.socket.socket_open = true;
            exports.socket.heartbeat();
            handle?.onopen && handle.onopen();
        };
        exports.socket.web_socket.onclose = (e) => {
            console.log('connection closed (' + e.code + ')');
            clearInterval(exports.socket.heartbeat_timer);
            exports.socket.socket_open = false;
            handle?.onclose && handle.onclose(e);
            setTimeout(() => {
                exports.socket.init(handle);
            }, exports.socket.heartbeat_interval);
        };
        exports.socket.web_socket.onerror = (e) => {
            console.log('connection error (' + e + ')');
            handle?.onerror && handle.onerror(e);
            setTimeout(() => {
                exports.socket.init(handle);
            }, exports.socket.heartbeat_interval);
        };
        return undefined;
    },
    heartbeat() {
        if (exports.socket.heartbeat_timer) {
            clearInterval(exports.socket.heartbeat_timer);
        }
        exports.socket.heartbeat_timer = setInterval(() => {
            const send_data = {
                "message": "hello",
                "signature_message": encryptUtils_1.default.signHeartbeat("hello")
            };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NvY2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrRUFBMEM7QUFtQjdCLFFBQUEsTUFBTSxHQUFZO0lBQzNCLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLE1BQU0sRUFBRSxFQUFFO0lBQ1YsV0FBVyxFQUFFLEtBQUs7SUFDbEIsZUFBZSxFQUFFLFNBQVM7SUFDMUIsa0JBQWtCLEVBQUUsSUFBSTtJQUV4QixJQUFJLENBQUMsTUFBTTtRQUNQLGNBQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxjQUFNLENBQUMsQ0FBQTtRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLGNBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLGNBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM3QyxjQUFNLENBQUMsVUFBVSxHQUFHLElBQUksU0FBUyxDQUFDLGNBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxjQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDNUIsY0FBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDMUIsY0FBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25CLE1BQU0sRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ3JDLENBQUMsQ0FBQTtRQUNELGNBQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO1lBQ2pELGFBQWEsQ0FBQyxjQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDckMsY0FBTSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUE7WUFDMUIsTUFBTSxFQUFFLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3BDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osY0FBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN2QixDQUFDLEVBQUUsY0FBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFBO1FBQ0QsY0FBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQTtZQUMzQyxNQUFNLEVBQUUsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDcEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixjQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3ZCLENBQUMsRUFBRSxjQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUE7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksY0FBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3pCLGFBQWEsQ0FBQyxjQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNELGNBQU0sQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUN0QyxNQUFNLFNBQVMsR0FBRztnQkFDZCxTQUFTLEVBQUUsT0FBTztnQkFDbEIsbUJBQW1CLEVBQUUsc0JBQVksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO2FBQzNELENBQUM7WUFDRixjQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsRUFBRSxjQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQsSUFBSSxDQUFDLElBQVMsRUFBRSxRQUFtQjtRQUMvQixJQUFJLGNBQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBTSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsS0FBSyxjQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEYsY0FBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdDLFFBQVEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMzQixDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUs7UUFDRCxhQUFhLENBQUMsY0FBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3JDLGNBQU0sQ0FBQyxVQUFVLElBQUksY0FBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNsRCxDQUFDO0NBQ0osQ0FBQSJ9