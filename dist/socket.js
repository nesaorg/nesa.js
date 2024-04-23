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
    signatureData: '',
    init(handle) {
        exports.socket.ws_url = handle.ws_url;
        exports.socket.web_socket = new WebSocket(exports.socket.ws_url);
        exports.socket.web_socket.onopen = () => {
            exports.socket.socket_open = true;
            exports.socket.heartbeat();
            handle?.onopen && handle.onopen();
        };
        exports.socket.web_socket.onclose = (e) => {
            clearInterval(exports.socket.heartbeat_timer);
            exports.socket.socket_open = false;
            handle?.onclose && handle.onclose(e);
            setTimeout(() => {
                exports.socket.init(handle);
            }, 5000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NvY2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrRUFBMEM7QUFvQjdCLFFBQUEsTUFBTSxHQUFZO0lBQzNCLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLE1BQU0sRUFBRSxFQUFFO0lBQ1YsV0FBVyxFQUFFLEtBQUs7SUFDbEIsZUFBZSxFQUFFLFNBQVM7SUFDMUIsa0JBQWtCLEVBQUUsSUFBSTtJQUN4QixhQUFhLEVBQUUsRUFBRTtJQUVqQixJQUFJLENBQUMsTUFBTTtRQUNQLGNBQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM5QixjQUFNLENBQUMsVUFBVSxHQUFHLElBQUksU0FBUyxDQUFDLGNBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxjQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDNUIsY0FBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDMUIsY0FBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25CLE1BQU0sRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ3JDLENBQUMsQ0FBQTtRQUNELGNBQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsYUFBYSxDQUFDLGNBQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUNyQyxjQUFNLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtZQUMxQixNQUFNLEVBQUUsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDcEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixjQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3ZCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNiLENBQUMsQ0FBQTtRQUNELGNBQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsTUFBTSxFQUFFLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3hDLENBQUMsQ0FBQTtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxjQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDekIsYUFBYSxDQUFDLGNBQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQ0QsY0FBTSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ3RDLElBQUksU0FBUyxDQUFBO1lBQ2IsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLFNBQVMsR0FBRztvQkFDUixTQUFTLEVBQUUsT0FBTztvQkFDbEIsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGFBQWE7aUJBQzFDLENBQUE7WUFDTCxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osSUFBSSxDQUFDLGFBQWEsR0FBRyxzQkFBWSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDeEQsU0FBUyxHQUFHO29CQUNSLFNBQVMsRUFBRSxPQUFPO29CQUNsQixtQkFBbUIsRUFBRSxJQUFJLENBQUMsYUFBYTtpQkFDMUMsQ0FBQTtZQUNMLENBQUM7WUFDRCxjQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsRUFBRSxjQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQsSUFBSSxDQUFDLElBQVMsRUFBRSxRQUFtQjtRQUMvQixJQUFJLGNBQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBTSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsS0FBSyxjQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEYsY0FBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdDLFFBQVEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMzQixDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUs7UUFDRCxhQUFhLENBQUMsY0FBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3JDLGNBQU0sQ0FBQyxVQUFVLElBQUksY0FBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNsRCxDQUFDO0NBQ0osQ0FBQSJ9