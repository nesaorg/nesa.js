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
const cosmos_snap_provider_1 = require("@leapwallet/cosmos-snap-provider");
class ChatClient {
    constructor(options) {
        this.chatQueue = [];
        this.chatSeq = 0;
        this.totalPayment = 1;
        this.totalSignatureParment = 0;
        this.isChatinging = false;
        this.isRegisterSessioning = false;
        this.agentUrl = "";
        this.assistantRoleName = "";
        this.modelName = options.modelName;
        this.chainInfo = options.chainInfo || default_config_1.defaultChainInfo;
        this.lockAmount = options.lockAmount || default_config_1.defaultLockAmount;
        this.signaturePayment = {};
        this.singleLockUpAmount = options.singleLockUpAmount || default_config_1.defaultSingleLockUpAmount;
        this.singleLockUpThreshold = options.singleLockUpThreshold || default_config_1.defaultSingleLockUpThreshold;
        this.lockAmountDenom = '';
        this.initOfflineSigner(options.walletName);
    }
    async initOfflineSigner(walletName) {
        try {
            if (walletName === 'npm:@leapwallet/metamask-cosmos-snap') {
                await (0, cosmos_snap_provider_1.suggestChain)(this.chainInfo, { force: false });
                const offlineSigner = new cosmos_snap_provider_1.CosmjsOfflineSigner(this.chainInfo.chainId);
                this.offLineigner = offlineSigner;
            }
            else if (window?.keplr) {
                const { keplr } = window;
                await keplr.experimentalSuggestChain(this.chainInfo);
                await keplr.enable(this.chainInfo.chainId);
                this.offLineigner = window.getOfflineSigner(this.chainInfo.chainId);
            }
            else {
                console.log('No wallet installed, please install keplr or metamask wallet first');
            }
            this.getNesaClient();
        }
        catch (error) {
            console.log('initOfflineSigner-error: ', error);
        }
    }
    getNesaClient() {
        if (this.lastNesaClientPromise) {
            return this.lastNesaClientPromise;
        }
        console.log('Init nesa client');
        this.lastNesaClientPromise = new Promise((resolve) => {
            walletOperation_1.default.getNesaClient(this.chainInfo, this.offLineigner)
                .then((client) => {
                resolve(client);
                this.getChainParams(client);
            })
                .catch((error) => {
                console.log('initNesaClientError: ', error);
                this.lastNesaClientPromise = undefined;
            });
        });
    }
    getChainParams(nesaClient) {
        if (this.lastUserMinimumLockPromise) {
            return this.lastUserMinimumLockPromise;
        }
        console.log('Init params');
        this.lastUserMinimumLockPromise = new Promise((resolve) => {
            walletOperation_1.default.requestParams(nesaClient)
                .then((params) => {
                resolve(params);
            })
                .catch((error) => {
                console.log('getChainParamsError: ', error);
                this.lastUserMinimumLockPromise = undefined;
            });
        });
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
    getSignaturePayment() {
        if (this.signaturePayment[this.totalSignatureParment]) {
            return this.signaturePayment[this.totalSignatureParment];
        }
        const signaturePayment = encryptUtils_1.default.signMessage(`${this.totalSignatureParment}${this.chainInfo.feeCurrencies[0].coinMinimalDenom}`, this.chatSeq, false);
        this.signaturePayment[this.totalSignatureParment] = signaturePayment;
        return signaturePayment;
    }
    checkSingleLockUpAmount() {
        if (new bignumber_js_1.BigNumber(this.totalSignatureParment).isLessThanOrEqualTo(this.singleLockUpThreshold)) {
            this.totalSignatureParment = Number(new bignumber_js_1.BigNumber(this.totalSignatureParment).plus(this.singleLockUpAmount).toFixed(0, 1));
            return this.getSignaturePayment();
        }
        if (new bignumber_js_1.BigNumber(this.totalSignatureParment).minus(this.totalPayment).isLessThanOrEqualTo(this.singleLockUpThreshold)) {
            if (new bignumber_js_1.BigNumber(this.totalSignatureParment).isLessThan(this.totalPayment)) {
                this.totalSignatureParment = Number(this.totalPayment);
                return this.getSignaturePayment();
            }
            // if (new BigNumber(this.totalSignatureParment).plus(this.singleLockUpAmount).isGreaterThan(this.lockAmount)) {
            //   this.totalSignatureParment = Number(this.lockAmount);
            //   return this.getSignaturePayment()
            // }
            this.totalSignatureParment = Number(new bignumber_js_1.BigNumber(this.totalSignatureParment).plus(this.singleLockUpAmount).toFixed(0, 1));
        }
        return this.getSignaturePayment();
    }
    requestChatQueue(readableStream, question) {
        this.isChatinging = true;
        this.chatSeq += 1;
        let isFirstChat = true;
        try {
            const ws = new WebSocket(this.agentUrl);
            ws.addEventListener("open", () => {
                if (ws.readyState === 1) {
                    this.signaturePayment = {};
                    const questionStr = JSON.stringify({
                        stream: true,
                        ...question,
                    });
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
                    const signedMessage = this.checkSingleLockUpAmount();
                    const total_payment = {
                        amount: this.totalSignatureParment,
                        denom: this.chainInfo.feeCurrencies[0].coinMinimalDenom,
                    };
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
    requestAgentInfo(result) {
        if (this.lastGetAgentInfoPromise) {
            return this.lastGetAgentInfoPromise;
        }
        this.lastGetAgentInfoPromise = new Promise((resolve, reject) => {
            walletOperation_1.default.requestAgentInfo(this.nesaClient, result?.account, this.modelName)
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
                this.lastGetAgentInfoPromise = undefined;
                reject(error);
            });
        });
    }
    checkSignBroadcastResult() {
        return new Promise((resolve, reject) => {
            this.nesaClient.broadcastRegisterSession()
                .then((result) => {
                resolve(this.requestAgentInfo(result));
            })
                .catch((error) => {
                console.log('error: ', error);
                reject(error);
            });
        });
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
                this.getNesaClient().then((nesaClient) => {
                    this.nesaClient = nesaClient;
                    this.getChainParams(nesaClient).then((params) => {
                        if (params && params?.params) {
                            if (new bignumber_js_1.BigNumber(this.lockAmount).isLessThan(params?.params?.userMinimumLock?.amount)) {
                                reject(new Error("LockAmount cannot be less than " + params?.params?.userMinimumLock?.amount));
                            }
                            else {
                                walletOperation_1.default.registerSession(nesaClient, this.modelName, this.lockAmount, params?.params?.userMinimumLock?.denom, this.chainInfo, this.offLineigner)
                                    .then((result) => {
                                    console.log('registerSession-result: ', result);
                                    if (result) {
                                        this.checkSignBroadcastResult();
                                        resolve(result);
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
                }).catch((error) => {
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
                this.checkSignBroadcastResult()
                    .then((result) => {
                    console.log('checkSignBroadcastResult-result: ', result);
                    const readableStream = new stream_browserify_1.Readable({ objectMode: true });
                    readableStream._read = () => { };
                    resolve(readableStream);
                    if (this.isChatinging) {
                        this.chatQueue.push({ readableStream, question });
                    }
                    else {
                        this.requestChatQueue(readableStream, question);
                    }
                })
                    .catch((error) => {
                    reject(error);
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jaGF0Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTBDO0FBQzFDLHdFQUFnRDtBQUNoRCx5REFBNkM7QUFFN0MscURBQTRJO0FBQzVJLHFDQUFrQztBQUNsQywrQ0FBeUM7QUFDekMsMkVBQXFGO0FBZ0JyRixNQUFNLFVBQVU7SUFxQmQsWUFBWSxPQUFzQjtRQWQxQixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQiwwQkFBcUIsR0FBRyxDQUFDLENBQUM7UUFDMUIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxzQkFBaUIsR0FBRyxFQUFFLENBQUE7UUFRNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxpQ0FBZ0IsQ0FBQztRQUN2RCxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksa0NBQWlCLENBQUM7UUFDMUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQTtRQUMxQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixJQUFJLDBDQUF5QixDQUFDO1FBQ2xGLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxPQUFPLENBQUMscUJBQXFCLElBQUksNkNBQTRCLENBQUE7UUFDMUYsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUE7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0lBRUQsS0FBSyxDQUFDLGlCQUFpQixD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