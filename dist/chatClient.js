"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encryptUtils_1 = __importDefault(require("./encryptUtils"));
const walletOperation_1 = __importDefault(require("./walletOperation"));
const stream_browserify_1 = require("stream-browserify");
const default_config_1 = require("./default.config");
class ChatClient {
    constructor(options) {
        this.chatQueue = [];
        this.chatSeq = 0;
        this.totalPayment = 1;
        this.isChatinging = false;
        this.isRegisterSessioning = false;
        this.agentUrl = "";
        this.modelName = options.modelName;
        this.chainInfo = options.chainInfo || default_config_1.defaultChainInfo;
        this.lockAmount = options.lockAmount || default_config_1.defaultLockAmount;
        this.heartbeatConnecting = true;
    }
    version() {
        return default_config_1.sdkVersion;
    }
    checkChainInfo() {
        return this.chainInfo?.rpc
            && this.chainInfo?.rest
            && this.chainInfo?.feeCurrencies
            && this.chainInfo?.feeCurrencies.length > 0
            && this.chainInfo?.feeCurrencies[0]?.coinMinimalDenom;
    }
    requestChatQueue(readableStream, question) {
        this.isChatinging = true;
        this.chatSeq += 1;
        let isFirstChat = true;
        try {
            const ws = new WebSocket(this.agentUrl);
            ws.addEventListener("open", () => {
                if (ws.readyState === 1) {
                    const questionStr = JSON.stringify({
                        stream: true,
                        ...question,
                        model: this.modelName,
                    });
                    const signedMessage = encryptUtils_1.default.signMessage(questionStr, this.chatSeq, true);
                    if (signedMessage) {
                        if (this.heartbeatConnecting) {
                            ws.send(JSON.stringify({
                                chat_seq: this.chatSeq,
                                query: questionStr,
                                signature_query: signedMessage,
                            }));
                        }
                        else {
                            readableStream.push({
                                code: 206,
                                message: "The connection has been disconnected, please sign again",
                            });
                            this.isChatinging = false;
                            readableStream.push(null);
                        }
                    }
                    else {
                        readableStream.push({
                            code: 201,
                            message: "No signature found or the signature has expired, please sign again",
                        });
                        this.isChatinging = false;
                        readableStream.push(null);
                    }
                }
            });
            ws.onmessage = (event) => {
                console.log("onmessage: ", event);
                if (isFirstChat) {
                    if (event?.data !== "ack") {
                        ws.close();
                        readableStream.push({
                            code: 202,
                            message: "Illegal link",
                        });
                        this.isChatinging = false;
                    }
                    else {
                        isFirstChat = false;
                    }
                }
                else if (event?.data.startsWith("[DONE]")) {
                    ws.close();
                    readableStream.push({
                        code: 203,
                        message: event?.data.split("[DONE]")[1],
                    });
                    this.isChatinging = false;
                }
                else {
                    const total_payment = {
                        amount: this.totalPayment,
                        denom: this.chainInfo.feeCurrencies[0].coinMinimalDenom,
                    };
                    const signedMessage = encryptUtils_1.default.signMessage(`${total_payment.amount}${total_payment.denom}`, this.chatSeq, false);
                    if (signedMessage) {
                        if (this.heartbeatConnecting) {
                            readableStream.push({
                                code: 200,
                                message: event?.data,
                                total_payment,
                            });
                            const data = JSON.stringify({
                                chat_seq: this.chatSeq,
                                total_payment,
                                signature_payment: signedMessage,
                            });
                            this.totalPayment += 1;
                            ws.send(data);
                        }
                        else {
                            readableStream.push({
                                code: 206,
                                message: "The connection has been disconnected, please sign again",
                            });
                            this.isChatinging = false;
                            readableStream.push(null);
                        }
                    }
                    else {
                        readableStream.push({
                            code: 201,
                            message: "No signature found or the signature has expired, please sign again",
                        });
                        ws.close();
                        readableStream.push(null);
                    }
                }
            };
            ws.onclose = (error) => {
                console.log('onclose: ', error);
                if (error?.reason) {
                    readableStream.push({
                        code: 205,
                        message: error?.reason,
                    });
                    readableStream.push(null);
                }
                this.isChatinging = false;
                if (this.chatQueue.length > 0) {
                    const { readableStream: nextReadableStream, question: nextQuestion } = this.chatQueue.shift();
                    this.requestChatQueue(nextReadableStream, nextQuestion);
                }
            };
            ws.onerror = (error) => {
                readableStream.push({
                    code: 204,
                    message: error?.reason || "Error: Connection failed",
                });
                readableStream.push(null);
                this.isChatinging = false;
                if (this.chatQueue.length > 0) {
                    const { readableStream: nextReadableStream, question: nextQuestion } = this.chatQueue.shift();
                    this.requestChatQueue(nextReadableStream, nextQuestion);
                }
            };
        }
        catch (error) {
            console.log('websocketCatchError: ', error);
            readableStream.push({
                code: 207,
                message: error.message || "Error: Connection failed",
            });
            readableStream.push(null);
            this.isChatinging = false;
            if (this.chatQueue.length > 0) {
                const { readableStream: nextReadableStream, question: nextQuestion } = this.chatQueue.shift();
                this.requestChatQueue(nextReadableStream, nextQuestion);
            }
        }
    }
    requestSession() {
        console.log('requestSession: ', this.modelName);
        return new Promise((resolve, reject) => {
            if (!this.checkChainInfo()) {
                reject(new Error("Invalid chainInfo, you must provide rpc, rest, feeCurrencies, feeCurrencies"));
            }
            else if (!this.modelName) {
                reject(new Error("ModelName is null"));
            }
            else if (this.isRegisterSessioning) {
                reject(new Error("Registering session, please wait"));
            }
            else {
                walletOperation_1.default.registerSession(this.modelName, this.lockAmount, this.chainInfo)
                    .then((result) => {
                    console.log('registerSession-result: ', result);
                    if (result?.transactionHash) {
                        walletOperation_1.default.requestAgentInfo(result?.account, this.chainInfo)
                            .then((agentInfo) => {
                            if (agentInfo?.inferenceAgent?.url) {
                                let agentWsUrl = '';
                                // let agentHeartbeatUrl = ''
                                if (agentInfo?.inferenceAgent?.url?.endsWith("/")) {
                                    agentWsUrl = agentInfo?.inferenceAgent?.url + 'chat';
                                    // agentHeartbeatUrl = agentInfo?.inferenceAgent?.url + 'heartbeat';
                                }
                                else {
                                    agentWsUrl = agentInfo?.inferenceAgent?.url + '/chat';
                                    // agentHeartbeatUrl = agentInfo?.inferenceAgent?.url + '/heartbeat';
                                }
                                this.agentUrl = agentWsUrl;
                                this.isRegisterSessioning = false;
                                this.heartbeatConnecting = true;
                                resolve(result);
                                // socket.init({
                                //   ws_url: agentInfo?.inferenceAgent?.url + '/';,
                                //   onopen: () => {
                                //     console.log("heartbeat socket open");
                                //     console.log('this.agentUrl: ', this.agentUrl)
                                //     this.agentUrl = agentInfo?.inferenceAgent?.url;
                                //     // this.agentUrl = "ws://192.168.131.64:17216/chat";
                                //     this.isRegisterSessioning = false;
                                //     this.heartbeatConnecting = true;
                                //     resolve(result);
                                //   },
                                // onclose: (e) => {
                                //   console.log("heartbeat socket onclose12345", e);
                                //   this.heartbeatConnecting = false;
                                //   reject(new Error("Heartbeat socket error"));
                                // },
                                // onerror: (e) => {
                                //   console.log("heartbeat socket error23456", e);
                                //   this.heartbeatConnecting = false;
                                //   reject(new Error("Heartbeat socket error"));
                                // },
                                // });
                            }
                            else {
                                this.isRegisterSessioning = false;
                                this.heartbeatConnecting = true;
                                reject("No agent found");
                            }
                        })
                            .catch((error) => {
                            console.log("requestAgentInfoError: ", error);
                            reject('Request agent info error: ' + error?.message);
                        });
                    }
                    else {
                        this.isRegisterSessioning = false;
                        reject(result);
                    }
                })
                    .catch((error) => {
                    console.log("registerSessionError: ", error);
                    this.isRegisterSessioning = false;
                    reject(error);
                });
            }
        });
    }
    requestChat(question) {
        console.log('this.isRegisterSessioning: ', this.isRegisterSessioning);
        return new Promise((resolve, reject) => {
            if (this.isRegisterSessioning) {
                reject(new Error("Registering session, please wait"));
            }
            else if (!this.agentUrl) {
                reject(new Error("Please initiate registration operation first"));
            }
            else {
                const readableStream = new stream_browserify_1.Readable({ objectMode: true });
                readableStream._read = () => { };
                resolve(readableStream);
                if (this.isChatinging) {
                    this.chatQueue.push({ readableStream, question });
                }
                else {
                    this.requestChatQueue(readableStream, question);
                }
            }
        });
    }
}
exports.default = ChatClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jaGF0Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTBDO0FBQzFDLHdFQUFnRDtBQUNoRCx5REFBNkM7QUFFN0MscURBQW1GO0FBY25GLE1BQU0sVUFBVTtJQVdkLFlBQVksT0FBc0I7UUFQMUIsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBRTdCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxpQ0FBZ0IsQ0FBQztRQUN2RCxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksa0NBQWlCLENBQUM7UUFDMUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQTtJQUNqQyxDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sMkJBQVUsQ0FBQztJQUNwQixDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHO2VBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSTtlQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWE7ZUFDN0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUM7ZUFDeEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUE7SUFDekQsQ0FBQztJQUVELGdCQUFnQixDQUFDLGNBQW1CLEVBQUUsUUFBdUI7UUFDM0QsSUFBSSxDQUFDLFlBQVksR0FB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