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
        this.totalUsedPayment = 1;
        this.totalSignedPayment = 0;
        this.isChatinging = false;
        this.isRegisterSessioning = false;
        this.agentUrl = "";
        this.assistantRoleName = "";
        this.modelName = options.modelName;
        this.chainInfo = options.chainInfo || default_config_1.defaultChainInfo;
        this.lockAmount = options.lockAmount || default_config_1.defaultLockAmount;
        this.signaturePayment = {};
        this.singlePaymentAmount = options.singlePaymentAmount || default_config_1.defaultSinglePaymentAmount;
        this.lowBalance = options.lowBalance || default_config_1.defaultLowBalance;
        this.lockAmountDenom = '';
        this.walletName = options.walletName || '';
        window.nesaSdkVersion = default_config_1.sdkVersion;
        this.initWallet();
    }
    initWallet() {
        if (this.lastInitOfflineSignerPromise) {
            return this.lastInitOfflineSignerPromise;
        }
        this.lastInitOfflineSignerPromise = new Promise(async (resolve, reject) => {
            try {
                if (this.walletName === 'npm:@leapwallet/metamask-cosmos-snap') {
                    // await window?.ethereum.request({
                    //   method: 'wallet_requestSnaps',
                    //   params: {
                    //     'npm:@leapwallet/metamask-cosmos-snap': {},
                    //   },
                    // });
                    await (0, cosmos_snap_provider_1.suggestChain)(this.chainInfo, { force: false });
                    const offlineSigner = new cosmos_snap_provider_1.CosmjsOfflineSigner(this.chainInfo.chainId);
                    this.offLinesigner = offlineSigner;
                    resolve(this.offLinesigner);
                    this.getNesaClient();
                }
                else if (window?.keplr) {
                    const { keplr } = window;
                    await keplr.experimentalSuggestChain(this.chainInfo);
                    await keplr.enable(this.chainInfo.chainId);
                    this.offLinesigner = window.getOfflineSigner(this.chainInfo.chainId);
                    resolve(this.offLinesigner);
                    this.getNesaClient();
                }
                else {
                    console.log('No wallet installed, please install keplr or metamask wallet first');
                    reject('No wallet installed, please install keplr or metamask wallet first');
                }
            }
            catch (error) {
                console.log('initOfflineSigner-error: ', error);
                reject(error);
            }
        });
    }
    getNesaClient() {
        if (this.lastNesaClientPromise) {
            return this.lastNesaClientPromise;
        }
        console.log('Init nesa client');
        this.lastNesaClientPromise = new Promise((resolve, reject) => {
            if (this.offLinesigner) {
                walletOperation_1.default.getNesaClient(this.chainInfo, this.offLinesigner)
                    .then((client) => {
                    resolve(client);
                    this.getChainParams(client);
                })
                    .catch((error) => {
                    console.log('initNesaClientError: ', error);
                    this.lastNesaClientPromise = undefined;
                    reject(error);
                });
            }
            else {
                this.lastNesaClientPromise = undefined;
                reject(new Error('Wallet connect error'));
            }
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
        if (this.signaturePayment[this.totalSignedPayment]) {
            return this.signaturePayment[this.totalSignedPayment];
        }
        const signaturePayment = encryptUtils_1.default.signMessage(`${this.totalSignedPayment}${this.chainInfo.feeCurrencies[0].coinMinimalDenom}`, this.chatSeq, false);
        this.signaturePayment[this.totalSignedPayment] = signaturePayment;
        return signaturePayment;
    }
    checkSinglePaymentAmount() {
        if (new bignumber_js_1.BigNumber(this.totalSignedPayment).isLessThanOrEqualTo(this.lowBalance)) {
            this.totalSignedPayment = Number(new bignumber_js_1.BigNumber(this.totalSignedPayment).plus(this.singlePaymentAmount).toFixed(0, 1));
            return this.getSignaturePayment();
        }
        if (new bignumber_js_1.BigNumber(this.totalSignedPayment).minus(this.totalUsedPayment).isLessThanOrEqualTo(this.lowBalance)) {
            if (new bignumber_js_1.BigNumber(this.totalSignedPayment).isLessThan(this.totalUsedPayment)) {
                this.totalSignedPayment = Number(this.totalUsedPayment);
                return this.getSignaturePayment();
            }
            if (new bignumber_js_1.BigNumber(this.totalSignedPayment).plus(this.singlePaymentAmount).isLessThanOrEqualTo(this.lockAmount)) {
                this.totalSignedPayment = Number(new bignumber_js_1.BigNumber(this.totalSignedPayment).plus(this.singlePaymentAmount).toFixed(0, 1));
            }
            else {
                this.totalSignedPayment = Number(this.lockAmount);
            }
            return this.getSignaturePayment();
        }
        return this.getSignaturePayment();
    }
    requestChatQueue(readableStream, question) {
        this.isChatinging = true;
        this.chatSeq += 1;
        let messageTimes = 0;
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
                if (messageTimes === 0) {
                    if (messageJson === "ack") {
                        readableStream.push({
                            code: 305,
                            message: "Conducting inference",
                        });
                    }
                    else {
                        ws.close();
                        readableStream.push({
                            code: 202,
                            message: "Illegal link",
                        });
                        this.isChatinging = false;
                    }
                    messageTimes += 1;
                }
                else if (messageJson?.content?.startsWith("[DONE]")) {
                    ws.close();
                    readableStream.push({
                        code: 203,
                        message: messageJson?.content?.split("[DONE]")[1],
                    });
                    readableStream.push({
                        code: 307,
                        message: "Task completed, wait for another query"
                    });
                    this.isChatinging = false;
                }
                else {
                    if (messageTimes === 1) {
                        readableStream.push({
                            code: 306,
                            message: "Receiving responses",
                        });
                        messageTimes += 1;
                    }
                    const signedMessage = this.checkSinglePaymentAmount();
                    const total_payment = {
                        amount: this.totalSignedPayment,
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
                        this.totalUsedPayment += 1;
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
    requestAgentInfo(result, readableStream) {
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
                    let firstInitHeartbeat = true;
                    readableStream && readableStream.push({
                        code: 303,
                        message: "Connecting to the validator",
                    });
                    socket_1.socket.init({
                        ws_url: agentHeartbeatUrl,
                        onopen: () => {
                            if (firstInitHeartbeat) {
                                this.agentUrl = agentWsUrl;
                                this.isRegisterSessioning = false;
                                readableStream.push({
                                    code: 304,
                                    message: "Waiting for query",
                                });
                                readableStream && readableStream.push(null);
                                firstInitHeartbeat = false;
                                resolve(result);
                            }
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
    checkSignBroadcastResult(readableStream) {
        return new Promise((resolve, reject) => {
            this.nesaClient.broadcastRegisterSession()
                .then((result) => {
                readableStream && readableStream.push({
                    code: 200,
                    message: result?.transactionHash,
                });
                resolve(this.requestAgentInfo(result, readableStream));
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
                const readableStream = new stream_browserify_1.Readable({ objectMode: true });
                readableStream._read = () => { };
                resolve(readableStream);
                this.initWallet()
                    .then(() => {
                    this.getNesaClient()
                        .then((nesaClient) => {
                        this.nesaClient = nesaClient;
                        this.getChainParams(nesaClient)
                            .then((params) => {
                            if (params && params?.params) {
                                readableStream.push({
                                    code: 301,
                                    message: "Connected to Nesa chain",
                                });
                                if (new bignumber_js_1.BigNumber(this.lockAmount).isLessThan(params?.params?.userMinimumLock?.amount)) {
                                    // reject(new Error("LockAmount cannot be less than " + params?.params?.userMinimumLock?.amount))
                                    readableStream.push({
                                        code: 311,
                                        message: "LockAmount cannot be less than " + params?.params?.userMinimumLock?.amount,
                                    });
                                }
                                else {
                                    walletOperation_1.default.registerSession(nesaClient, this.modelName, this.lockAmount, params?.params?.userMinimumLock?.denom, this.chainInfo, this.offLinesigner)
                                        .then((result) => {
                                        console.log('registerSession-result: ', result);
                                        if (result?.transactionHash) {
                                            readableStream.push({
                                                code: 302,
                                                message: "Choosing an inference validator",
                                            });
                                            this.checkSignBroadcastResult(readableStream);
                                            // resolve(result)
                                        }
                                        else {
                                            this.isRegisterSessioning = false;
                                            readableStream.push({
                                                code: 312,
                                                message: JSON.stringify(result),
                                            });
                                            // reject(result);
                                        }
                                    })
                                        .catch((error) => {
                                        readableStream.push({
                                            code: 313,
                                            message: error?.message || error.toString()
                                        });
                                        this.isRegisterSessioning = false;
                                        // reject(error);
                                    });
                                }
                            }
                            else {
                                readableStream.push({
                                    code: 314,
                                    message: JSON.stringify(params),
                                });
                                // reject(new Error("Chain configuration loading failed."))
                            }
                        })
                            .catch((error) => {
                            readableStream.push({
                                code: 315,
                                message: error?.message || error.toString(),
                            });
                            // reject(error)
                        });
                    }).catch((error) => {
                        readableStream.push({
                            code: 316,
                            message: error?.message || error.toString(),
                        });
                        // reject(error)
                    });
                }).catch((error) => {
                    readableStream.push({
                        code: 317,
                        message: error?.message || error.toString(),
                    });
                    // reject(error)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jaGF0Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTBDO0FBQzFDLHdFQUFnRDtBQUNoRCx5REFBNkM7QUFFN0MscURBQWtJO0FBQ2xJLHFDQUFrQztBQUNsQywrQ0FBeUM7QUFDekMsMkVBQXFGO0FBZ0JyRixNQUFNLFVBQVU7SUF1QmQsWUFBWSxPQUFzQjtRQWYxQixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2Qsc0JBQWlCLEdBQUcsRUFBRSxDQUFBO1FBUzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksaUNBQWdCLENBQUM7UUFDdkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLGtDQUFpQixDQUFDO1FBQzFELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUE7UUFDMUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsSUFBSSwyQ0FBMEIsQ0FBQztRQUNyRixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksa0NBQWlCLENBQUE7UUFDekQsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUE7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQTtRQUMxQyxNQUFNLENBQUMsY0FBYyxHQUFHLDJCQUFVLENB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