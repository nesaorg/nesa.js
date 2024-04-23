import EncryptUtils from "./encryptUtils";

interface ISocket {
    web_socket: WebSocket | null,
    ws_url: string,
    socket_open: boolean,
    heartbeat_timer: NodeJS.Timeout | string | number | undefined,
    heartbeat_interval: number,
    init: (handle: {
        ws_url: string,
        onopen: () => void;
        onclose?: (e: Event) => void;
        onerror?: (e: Event) => void;
    }) => (WebSocket | null | undefined),
    heartbeat: Function,
    send: (data: any, callback?: Function) => void
    close: Function,
    signatureData: string
}

export const socket: ISocket = {
    web_socket: null,
    ws_url: "",
    socket_open: false,
    heartbeat_timer: undefined,
    heartbeat_interval: 5000,
    signatureData: '',

    init(handle) {
        socket.ws_url = handle.ws_url;
        socket.web_socket = new WebSocket(socket.ws_url);
        socket.web_socket.onopen = () => {
            socket.socket_open = true;
            socket.heartbeat();
            handle?.onopen && handle.onopen()
        }
        socket.web_socket.onclose = (e) => {
            clearInterval(socket.heartbeat_timer)
            socket.socket_open = false
            handle?.onclose && handle.onclose(e)
            setTimeout(() => {
                socket.init(handle)
            }, 5000);
        }
        socket.web_socket.onerror = (e) => {
            handle?.onerror && handle.onerror(e)
        }
        return undefined;
    },

    heartbeat() {
        if (socket.heartbeat_timer) {
            clearInterval(socket.heartbeat_timer);
        }
        socket.heartbeat_timer = setInterval(() => {
            let send_data
            if (this.signatureData) {
                send_data = {
                    "message": "hello",
                    "signature_message": this.signatureData
                }
            } else {
                this.signatureData = EncryptUtils.signHeartbeat("hello")
                send_data = {
                    "message": "hello",
                    "signature_message": this.signatureData
                }
            }
            socket.send(send_data);
        }, socket.heartbeat_interval)
    },

    send(data: any, callback?: Function) {
        if (socket.web_socket && (!!socket.web_socket?.readyState) === socket.socket_open) {
            socket.web_socket.send(JSON.stringify(data));
            callback && callback();
        }
    },

    close() {
        clearInterval(socket.heartbeat_timer)
        socket.web_socket && socket.web_socket.close()
    },
}
