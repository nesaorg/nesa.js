/// <reference types="node" />
interface ISocket {
    web_socket: WebSocket | null;
    ws_url: string;
    ever_succeeded: boolean;
    socket_open: boolean;
    heartbeat_timer: NodeJS.Timeout | string | number | undefined;
    heartbeat_interval: number;
    init: (handle: {
        ws_url: string;
        onopen: () => void;
        onclose?: (e: Event) => void;
        onerror?: (e: Event) => void;
    }) => (WebSocket | null | undefined);
    heartbeat: Function;
    send: (data: any, callback?: Function) => void;
    close: Function;
    signatureData: string;
}
export declare const socket: ISocket;
export {};
