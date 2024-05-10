"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encryptUtils_1 = __importDefault(require("./encryptUtils"));
const walletOperation_1 = __importDefault(require("./walletOperation"));
const stream_browserify_1 = require("stream-browserify");
const default_config_1 = require("./default.config");
const socket_1 = require("./socket");
const bignumber_js_1 = require("bignumber.js");
class ChatClient {
    constructor(options) {
        this.chatQueue = [];
        this.chatSeq = 0;
        this.totalPayment = 1;
        this.isChatinging = false;
        this.isRegisterSessioning = false;
        this.agentUrl = "";
        this.assistantRoleName = "";
        this.modelName = options.modelName;
        this.chainInfo = options.chainInfo || default_config_1.defaultChainInfo;
        this.lockAmount = options.lockAmount || default_config_1.defaultLockAmount;
        this.lockAmountDenom = '';
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
                    const questionStr = JSON.stringify(question);
                    if (question.messages && this.assistantRoleName) {
                        question.messages = question.messages.map((item) => {
                            if (item.role === 'assistant') {
                                item.role = this.assistantRoleName;
                            }
                            return item;
                        });
                    }
                    const signedMessage = encryptUtils_1.default.signMessage(questionStr, this.chatSeq, true);
                    if (signedMessage) {
                        ws.send(JSON.stringify({
                            chat_seq: this.chatSeq,
                            query: questionStr,
                            signature_query: signedMessage,
                        }));
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
                let messageJson;
                try {
                    messageJson = JSON.parse(event?.data);
                    if (messageJson?.role) {
                        this.assistantRoleName = messageJson.role;
                    }
                }
                catch (error) {
                    messageJson = event?.data;
                }
                if (isFirstChat) {
                    if (messageJson !== "ack") {
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
                else if (messageJson?.content?.startsWith("[DONE]")) {
                    ws.close();
                    readableStream.push({
                        code: 203,
                        message: messageJson?.content?.split("[DONE]")[1],
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
                        readableStream.push({
                            code: 200,
                            message: messageJson?.content,
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
                }
                readableStream.push(null);
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
            else if (!this.lockAmount || new bignumber_js_1.BigNumber(this.lockAmount).isNaN()) {
                reject(new Error("LockAmount invalid value"));
            }
            else {
                walletOperation_1.default.requestParams(this.chainInfo)
                    .then((params) => {
                    if (params && params?.params) {
                        if (new bignumber_js_1.BigNumber(this.lockAmount).isLessThan(params?.params?.userMinimumLock?.amount)) {
                            reject(new Error("LockAmount cannot be less than " + params?.params?.userMinimumLock?.amount));
                        }
                        else {
                            walletOperation_1.default.registerSession(this.modelName, this.lockAmount, params?.params?.userMinimumLock?.denom, this.chainInfo)
                                .then((result) => {
                                console.log('registerSession-result: ', result);
                                if (result?.transactionHash) {
                                    walletOperation_1.default.requestAgentInfo(result?.account, this.modelName, this.chainInfo)
                                        .then((agentInfo) => {
                                        console.log('agentInfo: ', agentInfo);
                                        if (agentInfo && agentInfo?.inferenceAgents?.length > 0) {
                                            const selectAgent = agentInfo?.inferenceAgents[0];
                                            let agentWsUrl = selectAgent.url;
                                            let agentHeartbeatUrl = selectAgent.url;
                                            if (selectAgent.url?.endsWith("/")) {
                                                agentWsUrl = agentWsUrl + 'chat';
                                                agentHeartbeatUrl = agentHeartbeatUrl + 'heartbeat';
                                            }
                                            else {
                                                agentWsUrl = agentWsUrl + '/chat';
                                                agentHeartbeatUrl = agentHeartbeatUrl + '/heartbeat';
                                            }
                                            socket_1.socket.init({
                                                ws_url: agentHeartbeatUrl,
                                                onopen: () => {
                                                    this.agentUrl = agentWsUrl;
                                                    this.isRegisterSessioning = false;
                                                    resolve(result);
                                                },
                                                onerror: () => {
                                                    reject(new Error("Agent heartbeat packet connection failed"));
                                                }
                                            });
                                        }
                                        else {
                                            this.isRegisterSessioning = false;
                                            reject(new Error("No agent found"));
                                        }
                                    })
                                        .catch((error) => {
                                        console.log("requestAgentInfoError: ", error);
                                        reject(error);
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
                    }
                    else {
                        reject(new Error("Chain configuration loading failed."));
                    }
                })
                    .catch((error) => {
                    reject(error);
                });
            }
        });
    }
    requestChat(question) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jaGF0Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTBDO0FBQzFDLHdFQUFnRDtBQUNoRCx5REFBNkM7QUFFN0MscURBQW1GO0FBQ25GLHFDQUFrQztBQUNsQywrQ0FBeUM7QUFhekMsTUFBTSxVQUFVO0lBWWQsWUFBWSxPQUFzQjtRQVAxQixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQix5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLHNCQUFpQixHQUFHLEVBQUUsQ0FBQTtRQUU1QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLGlDQUFnQixDQUFDO1FBQ3ZELElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxrQ0FBaUIsQ0FBQztRQUMxRCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQTtJQUMzQixDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sMkJBQVUsQ0FBQztJQUNwQixDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHO2VBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSTtlQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWE7ZUFDN0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUM7ZUFDeEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUE7SUFDekQsQ0FBQztJQUVELGdC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