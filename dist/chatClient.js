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
const proto_signing_1 = require("@cosmjs/proto-signing");
class ChatClient {
    constructor(options) {
        this.chatQueue = [];
        this.chatSeq = 0;
        this.totalUsedPayment = 0;
        this.totalSignedPayment = 0;
        this.isChatinging = false;
        this.isRegisterSessioning = false;
        this.agentUrl = "";
        this.assistantRoleName = "";
        this.signaturePayment = {};
        this.modelName = options?.modelName?.toLowerCase() || '';
        this.chainInfo = options.chainInfo || default_config_1.defaultChainInfo;
        this.lockAmount = options.lockAmount || default_config_1.defaultLockAmount;
        this.singlePaymentAmount = options.singlePaymentAmount || default_config_1.defaultSinglePaymentAmount;
        this.lowBalance = options.lowBalance || default_config_1.defaultLowBalance;
        this.lockAmountDenom = '';
        this.walletName = options.walletName || '';
        this.privateKey = options.privateKey || '';
        this.isEverRequestSession = false;
        this.isBrowser = typeof window !== 'undefined';
        this.isBrowser && (window.nesaSdkVersion = default_config_1.sdkVersion);
        this.tokenPrice = 0;
        this.initWallet();
    }
    async initWallet() {
        if (this.lastInitOfflineSignerPromise)
            return this.lastInitOfflineSignerPromise;
        this.lastInitOfflineSignerPromise = (async () => {
            try {
                if (this.isBrowser) {
                    await this.initBrowserWallet();
                }
                else {
                    await this.initNodeWallet();
                }
                this.getNesaClient();
            }
            catch (error) {
                console.error('initOfflineSigner-error: ', error);
                throw error;
            }
        })();
        return this.lastInitOfflineSignerPromise;
    }
    async initBrowserWallet() {
        if (this.walletName === 'npm:@leapwallet/metamask-cosmos-snap') {
            await (0, cosmos_snap_provider_1.suggestChain)(this.chainInfo, { force: false });
            this.offLinesigner = new cosmos_snap_provider_1.CosmjsOfflineSigner(this.chainInfo.chainId);
        }
        else if (window?.keplr) {
            await window.keplr.experimentalSuggestChain(this.chainInfo);
            await window.keplr.enable(this.chainInfo.chainId);
            this.offLinesigner = window.getOfflineSigner(this.chainInfo.chainId);
        }
        else {
            throw new Error('No wallet installed, please install keplr or metamask wallet first');
        }
    }
    async initNodeWallet() {
        if (!this.privateKey) {
            throw new Error('In the node environment, please provide the privateKey');
        }
        const wallet = await proto_signing_1.DirectSecp256k1Wallet.fromKey(Buffer.from(this.privateKey, 'hex'), 'nesa');
        this.offLinesigner = wallet;
    }
    getNesaClient() {
        if (this.lastNesaClientPromise)
            return this.lastNesaClientPromise;
        this.lastNesaClientPromise = new Promise((resolve, reject) => {
            walletOperation_1.default.getNesaClient(this.chainInfo, this.offLinesigner)
                .then((client) => {
                this.nesaClient = client;
                this.getChainParams(client);
                resolve(client);
            })
                .catch((error) => {
                console.error('initNesaClientError: ', error);
                this.lastNesaClientPromise = undefined;
                reject(error);
            });
        });
        return this.lastNesaClientPromise;
    }
    getChainParams(nesaClient) {
        if (this.lastUserMinimumLockPromise)
            return this.lastUserMinimumLockPromise;
        this.lastUserMinimumLockPromise = new Promise((resolve, reject) => {
            walletOperation_1.default.requestParams(nesaClient)
                .then((params) => {
                this.chatProgressReadable?.push({
                    code: 301,
                    message: "Connected to Nesa chain",
                });
                resolve(params);
            })
                .catch((error) => {
                console.error('getChainParamsError: ', error);
                this.lastUserMinimumLockPromise = undefined;
                reject(error);
            });
        });
        return this.lastUserMinimumLockPromise;
    }
    checkChainInfo() {
        return this.chainInfo?.rpc
            && this.chainInfo?.rest
            && this.chainInfo?.feeCurrencies
            && this.chainInfo?.feeCurrencies.length > 0
            && this.chainInfo?.feeCurrencies[0]?.coinMinimalDenom;
    }
    getSignaturePayment() {
        if (this.signaturePayment[this.totalSignedPayment])
            return '';
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
    handleWsClose(event, readableStream) {
        const { reason, wasClean } = event;
        if (this.chatProgressReadable && !this.chatProgressReadable.isClosed) {
            this.chatProgressReadable.push({
                code: 307,
                message: "Task completed, wait for another query",
            });
        }
        if (!wasClean && reason) {
            console.log('WebSocket closed unexpectedly: ', reason);
            if (!readableStream.isClosed) {
                readableStream.push({
                    code: 205,
                    message: reason,
                });
            }
        }
        this.closeStream(readableStream);
        this.isChatinging = false;
        if (this.chatQueue.length > 0) {
            const { readableStream: nextReadableStream, question: nextQuestion } = this.chatQueue.shift();
            this.requestChatQueue(nextReadableStream, nextQuestion);
        }
    }
    handleWsError(error, readableStream) {
        if (this.chatProgressReadable && !this.chatProgressReadable.isClosed) {
            this.chatProgressReadable.push({
                code: 307,
                message: "Task completed, wait for another query",
            });
        }
        if (!readableStream.isClosed) {
            readableStream.push({
                code: 204,
                message: error?.reason || "Error: Connection failed",
            });
        }
        this.closeStream(readableStream);
        this.isChatinging = false;
        if (this.chatQueue.length > 0) {
            const { readableStream: nextReadableStream, question: nextQuestion } = this.chatQueue.shift();
            this.requestChatQueue(nextReadableStream, nextQuestion);
        }
    }
    closeStream(readableStream) {
        if (!readableStream.isClosed) {
            readableStream.push(null); // Signal the end of the stream
            readableStream.isClosed = true; // Mark the stream as closed
        }
    }
    requestChatQueue(readableStream, question) {
        this.isChatinging = true;
        this.chatSeq += 1;
        let messageTimes = 0;
        try {
            let ws;
            if (this.isBrowser) {
                ws = new WebSocket(this.agentUrl);
            }
            else {
                const WebSocket = require('ws');
                ws = new WebSocket(this.agentUrl);
            }
            ws.addEventListener("open", () => {
                if (ws.readyState === 1) {
                    const questionStr = JSON.stringify({
                        stream: true,
                        ...question,
                        model: question?.model?.toLowerCase()
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
                        if (!readableStream.isClosed) {
                            readableStream.push({
                                code: 201,
                                message: "No signature found or the signature has expired, please sign again",
                            });
                            this.closeStream(readableStream);
                        }
                        this.isChatinging = false;
                    }
                }
            });
            ws.onmessage = (event) => {
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
                        this.chatProgressReadable?.push({
                            code: 305,
                            message: "Conducting inference",
                        });
                    }
                    else {
                        ws.close();
                        if (!readableStream.isClosed) {
                            readableStream.push({
                                code: 202,
                                message: "Illegal link",
                            });
                            this.closeStream(readableStream);
                        }
                        this.isChatinging = false;
                    }
                    messageTimes += 1;
                }
                else if (messageJson?.content?.startsWith("[DONE]")) {
                    ws.close();
                    if (!readableStream.isClosed) {
                        readableStream.push({
                            code: 203,
                            message: messageJson?.content?.split("[DONE]")[1],
                        });
                        this.chatProgressReadable?.push({
                            code: 307,
                            message: "Task completed, wait for another query"
                        });
                        this.closeStream(readableStream);
                    }
                    this.isChatinging = false;
                }
                else {
                    if (messageTimes === 1) {
                        this.chatProgressReadable?.push({
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
                    if (!readableStream.isClosed) {
                        readableStream.push({
                            code: 200,
                            message: messageJson?.content,
                            session_id: messageJson?.session_id || '',
                            total_payment,
                        });
                    }
                    this.totalUsedPayment += this.tokenPrice;
                    if (new bignumber_js_1.BigNumber(this.totalUsedPayment).isGreaterThan(this.lockAmount)) {
                        if (!readableStream.isClosed) {
                            readableStream.push({
                                code: 205,
                                message: '{"code":1015,"msg":"balance insufficient"}',
                            });
                            this.closeStream(readableStream);
                        }
                        ws.close();
                    }
                    else if (signedMessage) {
                        const data = JSON.stringify({
                            chat_seq: this.chatSeq,
                            total_payment,
                            signature_payment: signedMessage,
                        });
                        ws.send(data);
                    }
                }
            };
            ws.onclose = (event) => this.handleWsClose(event, readableStream);
            ws.onerror = (error) => this.handleWsError(error, readableStream);
        }
        catch (error) {
            this.chatProgressReadable?.push({
                code: 307,
                message: "Task completed, wait for another query"
            });
            if (!readableStream.isClosed) {
                readableStream.push({
                    code: 207,
                    message: error.message || "Error: Connection failed",
                });
                this.closeStream(readableStream);
            }
            this.isChatinging = false;
            if (this.chatQueue.length > 0) {
                const { readableStream: nextReadableStream, question: nextQuestion } = this.chatQueue.shift();
                this.requestChatQueue(nextReadableStream, nextQuestion);
            }
        }
    }
    requestCloseHeartbeat() {
        socket_1.socket.forceClose = true;
        socket_1.socket.close();
    }
    requestAgentInfo(result, readableStream) {
        if (this.lastGetAgentInfoPromise) {
            return this.lastGetAgentInfoPromise;
        }
        this.lastGetAgentInfoPromise = new Promise((resolve, reject) => {
            walletOperation_1.default.requestAgentInfo(this.nesaClient, result?.account, this.modelName)
                .then((agentInfo) => {
                if (agentInfo && agentInfo?.inferenceAgent) {
                    const selectAgent = agentInfo?.inferenceAgent;
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
                    this.chatProgressReadable?.push({
                        code: 303,
                        message: "Connecting to the validator",
                    });
                    socket_1.socket.init({
                        ws_url: agentHeartbeatUrl,
                        onopen: () => {
                            if (firstInitHeartbeat) {
                                this.agentUrl = agentWsUrl;
                                this.isRegisterSessioning = false;
                                this.chatProgressReadable?.push({
                                    code: 304,
                                    message: "Waiting for query",
                                });
                                if (!readableStream.isClosed)
                                    readableStream.push(null);
                                firstInitHeartbeat = false;
                                resolve(result);
                            }
                        },
                        onerror: () => {
                            if (!readableStream.isClosed) {
                                readableStream.push({
                                    code: 319,
                                    message: 'Agent connection error: ' + selectAgent.url,
                                });
                                readableStream.push(null);
                            }
                            reject(new Error("Agent heartbeat packet connection failed"));
                        }
                    });
                }
                else {
                    this.isRegisterSessioning = false;
                    if (!readableStream.isClosed) {
                        readableStream.push({
                            code: 319,
                            message: 'Agent not found',
                        });
                        readableStream.push(null);
                    }
                    reject(new Error("No agent found"));
                }
            })
                .catch((error) => {
                console.log("requestAgentInfoError: ", error);
                this.lastGetAgentInfoPromise = undefined;
                if (!readableStream.isClosed) {
                    readableStream.push({
                        code: 319,
                        message: 'Agent connection error: ' + (error?.message || error.toString()),
                    });
                    readableStream.push(null);
                }
                reject(error);
            });
        });
        return this.lastGetAgentInfoPromise;
    }
    checkSignBroadcastResult(readableStream) {
        return new Promise((resolve, reject) => {
            if (!this.nesaClient) {
                reject(new Error('Please wait for the requestSession registration result'));
            }
            else {
                this.nesaClient.broadcastRegisterSession()
                    .then((result) => {
                    resolve(this.requestAgentInfo(result, readableStream));
                })
                    .catch((error) => {
                    console.log('checkSignBroadcastResultError: ', error);
                    if (!readableStream.isClosed) {
                        readableStream.push({
                            code: 318,
                            message: error?.message,
                        });
                        readableStream.push(null);
                    }
                    reject(error);
                });
            }
        });
    }
    requestChatStatus() {
        return new Promise((resolve) => {
            const readableStream = new stream_browserify_1.Readable({ objectMode: true });
            readableStream._read = () => { };
            readableStream.push({
                code: 300,
                message: "Connecting to Nesa chain",
            });
            this.chatProgressReadable = readableStream;
            resolve(readableStream);
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
            else if (!this.lockAmount || new bignumber_js_1.BigNumber(this.lockAmount).isNaN() || new bignumber_js_1.BigNumber(this.lockAmount).isLessThan(this.singlePaymentAmount)) {
                reject(new Error("LockAmount invalid value or less than singlePaymentAmount"));
            }
            else {
                this.isEverRequestSession = true;
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
                                this.tokenPrice = params?.params?.tokenPrice?.low;
                                if (new bignumber_js_1.BigNumber(this.lockAmount).isLessThan(params?.params?.userMinimumLock?.amount)) {
                                    if (!readableStream.isClosed) {
                                        readableStream.push({
                                            code: 311,
                                            message: "LockAmount cannot be less than " + params?.params?.userMinimumLock?.amount,
                                        });
                                    }
                                }
                                else {
                                    walletOperation_1.default.registerSession(nesaClient, this.modelName, this.lockAmount, params?.params?.userMinimumLock?.denom, this.chainInfo, this.offLinesigner)
                                        .then((result) => {
                                        console.log('registerSession-result: ', result);
                                        if (result?.transactionHash) {
                                            this.chatProgressReadable?.push({
                                                code: 302,
                                                message: "Choosing an inference validator",
                                            });
                                            if (!readableStream.isClosed) {
                                                readableStream.push({
                                                    code: 200,
                                                    message: result?.transactionHash,
                                                });
                                            }
                                            this.checkSignBroadcastResult(readableStream).catch(() => { });
                                        }
                                        else {
                                            this.isRegisterSessioning = false;
                                            if (!readableStream.isClosed) {
                                                readableStream.push({
                                                    code: 312,
                                                    message: JSON.stringify(result),
                                                });
                                            }
                                        }
                                    })
                                        .catch((error) => {
                                        if (!readableStream.isClosed) {
                                            readableStream.push({
                                                code: 313,
                                                message: error?.message || error.toString()
                                            });
                                        }
                                        this.isRegisterSessioning = false;
                                    });
                                }
                            }
                            else {
                                if (!readableStream.isClosed) {
                                    readableStream.push({
                                        code: 314,
                                        message: JSON.stringify(params),
                                    });
                                }
                            }
                        })
                            .catch((error) => {
                            if (!readableStream.isClosed) {
                                readableStream.push({
                                    code: 315,
                                    message: error?.message || error.toString(),
                                });
                            }
                        });
                    }).catch((error) => {
                        if (!readableStream.isClosed) {
                            readableStream.push({
                                code: 316,
                                message: error?.message || error.toString(),
                            });
                        }
                    });
                }).catch((error) => {
                    if (!readableStream.isClosed) {
                        readableStream.push({
                            code: 317,
                            message: error?.message || error.toString(),
                        });
                    }
                });
            }
        });
    }
    requestChat(question) {
        return new Promise((resolve, reject) => {
            if (!question?.model) {
                reject(new Error('Model is required'));
            }
            else if (this.isRegisterSessioning) {
                reject(new Error("Registering session, please wait"));
            }
            else if (!this.isEverRequestSession) {
                reject(new Error("Please call requestSession first to complete Session registration"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jaGF0Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTBDO0FBQzFDLHdFQUFnRDtBQUNoRCx5REFBNkM7QUFFN0MscURBQWtJO0FBQ2xJLHFDQUFrQztBQUNsQywrQ0FBeUM7QUFDekMsMkVBQXFGO0FBQ3JGLHlEQUE4RDtBQTJCOUQsTUFBTSxVQUFVO0lBNkJkLFlBQVksT0FBc0I7UUFyQjFCLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFDcEIsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUNyQix1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDdkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFRdkIscUJBQWdCLEdBQThCLEVBQUUsQ0FBQztRQU92RCxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3pELElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxpQ0FBZ0IsQ0FBQztRQUN2RCxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksa0NBQWlCLENBQUM7UUFDMUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsSUFBSSwyQ0FBMEIsQ0FBQztRQUNyRixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksa0NBQWlCLENBQUM7UUFDMUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsMkJBQVUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU8sS0FBSyxDQUFDLFVBQVU7UUFDdEIsSUFBSSxJQUFJLENBQUMsNEJBQTRCO1lBQUUsT0FBTyxJQUFJLENBQUMsNEJBQTRCLENBQUM7UUFDaEYsSUFBSSxDQUFDLDRCQUE0QixHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDOUMsSUFBSSxDQUFDO2dCQUNILElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNuQixNQUFNLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUNqQyxDQUFDO3FCQUFNLENBQUM7b0JBQ04sTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQzlCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3ZCLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2xELE1BQU0sS0FBSyxDQUFDO1lBQ2QsQ0FBQztRQUNILENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDTCxPQUFPLElBQUksQ0FBQyw0QkFBNEIsQ0FBQztJQUMzQyxDQUFDO0lBRU8sS0FBSyxDQUFDLGlCQUFpQjtRQUM3QixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssc0NBQXNDLEVBQUUsQ0FBQztZQUMvRCxNQUFNLElBQUEsbUNBQVksRUFBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDBDQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkUsQ0FBQzthQUFNLElBQUksTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO1lBQ3pCLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUQsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLGdCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLElBQUksS0FBSyxDQUFDLG9FQUFvRSxDQUFDLENBQUM7UUFDeEYsQ0FBQztJQUNILENBQUM7SUFFTyxLQUFLLENBQUMsY0FBYztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztRQUM1RSxDQUFDO1FBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxxQ0FBcUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hHLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO0lBQzlCLENBQUM7SUFFTyxhQUFhO1FBQ25CLElBQUksSUFBSSxDQUFDLHFCQUFxQjtZQUFFLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ2xFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzRCx5QkFBZSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUM7aUJBQzlELElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO2dCQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxTQUFTLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDcEMsQ0FBQztJQUVPLGNBQWMsQ0FBQyxVQUFlO1FBQ3BDLElBQUksSUFBSSxDQUFDLDBCQUEwQjtZQUFFLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDO1FBQzVFLElBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNoRSx5QkFBZSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7aUJBQ3RDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNmLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUM7b0JBQzlCLElBQUksRUFBRSxHQUFHO29CQUNULE9BQU8sRUFBRSx5QkFBeUI7aUJBQ25DLENBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxTQUFTLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUM7SUFDekMsQ0FBQztJQUVPLGNBQWM7UUFDcEIsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUc7ZUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJO2VBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYTtlQUM3QixJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztlQUN4QyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQztJQUMxRCxDQUFDO0lBRU8sbUJBQW1CO1FBQ3pCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzlELE1BQU0sZ0JBQWdCLEdBQUcsc0JBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hKLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztRQUNsRSxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7SUFFTyx3QkFBd0I7UUFDOUIsSUFBSSxJQUFJLHdCQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDaEYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxJQUFJLHdCQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0SCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFDRCxJQUFJLElBQUksd0JBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDN0csSUFBSSxJQUFJLHdCQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7Z0JBQzdFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3hELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDcEMsQ0FBQztZQUNELElBQUksSUFBSSx3QkFBUyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDL0csSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxJQUFJLHdCQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4SCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEQsQ0FBQztZQUNELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVPLGFBQWEsQ0FBQyxLQUFpQixFQUFFLGNBQWdFO1FBQ3ZHLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBRW5DLElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7Z0JBQzdCLElBQUksRUFBRSxHQUFHO2dCQUNULE9BQU8sRUFBRSx3Q0FBd0M7YUFDbEQsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxFQUFFLENBQUM7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM3QixjQUFjLENBQUMsSUFBSSxDQUFDO29CQUNsQixJQUFJLEVBQUUsR0FBRztvQkFDVCxPQUFPLEVBQUUsTUFBTTtpQkFDaEIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNILENBQUM7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBRTFCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDOUIsTUFBTSxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM5RixJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDMUQsQ0FBQztJQUNILENBQUM7SUFFTyxhQUFhLENBQUMsS0FBVSxFQUFFLGNBQWdFO1FBQ2hHLElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7Z0JBQzdCLElBQUksRUFBRSxHQUFHO2dCQUNULE9BQU8sRUFBRSx3Q0FBd0M7YUFDbEQsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDN0IsY0FBYyxDQUFDLElBQUksQ0FBQztnQkFDbEIsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLElBQUksMEJBQTBCO2FBQ3JELENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBRTFCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDOUIsTUFBTSxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM5RixJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDMUQsQ0FBQztJQUNILENBQUM7SUFFTyxXQUFXLENBQUMsY0FBZ0U7UUFDbEYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM3QixjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsK0JBQStCO1lBQzFELGNBQWMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsNEJBQTRCO1FBQzlELENBQUM7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsY0FBZ0UsRUFBRSxRQUF1QjtRQUN4RyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztRQUNsQixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7UUFFckIsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFhLENBQUM7WUFDbEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ25CLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsRUFBRSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwQyxDQUFDO1lBRUQsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQy9CLElBQUksRUFBRSxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDeEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzt3QkFDakMsTUFBTSxFQUFFLElBQUk7d0JBQ1osR0FBRyxRQUFRO3dCQUNYLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtxQkFDdEMsQ0FBQyxDQUFDO29CQUVILElBQUksUUFBUSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzt3QkFDaEQsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFOzRCQUN0RCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFLENBQUM7Z0NBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDOzRCQUNyQyxDQUFDOzRCQUNELE9BQU8sSUFBSSxDQUFDO3dCQUNkLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUM7b0JBRUQsTUFBTSxhQUFhLEdBQUcsc0JBQVksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2hGLElBQUksYUFBYSxFQUFFLENBQUM7d0JBQ2xCLEVBQUUsQ0FBQyxJQUFJLENBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQzs0QkFDYixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU87NEJBQ3RCLEtBQUssRUFBRSxXQUFXOzRCQUNsQixlQUFlLEVBQUUsYUFBYTt5QkFDL0IsQ0FBQyxDQUNILENBQUM7b0JBQ0osQ0FBQzt5QkFBTSxDQUFDO3dCQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQzdCLGNBQWMsQ0FBQyxJQUFJLENBQUM7Z0NBQ2xCLElBQUksRUFBRSxHQUFHO2dDQUNULE9BQU8sRUFBRSxvRUFBb0U7NkJBQzlFLENBQUMsQ0FBQzs0QkFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUNuQyxDQUFDO3dCQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO29CQUM1QixDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxXQUFXLENBQUM7Z0JBQ2hCLElBQUksQ0FBQztvQkFDSCxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3RDLElBQUksV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO3dCQUN0QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztvQkFDNUMsQ0FBQztnQkFDSCxDQUFDO2dCQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7b0JBQ2YsV0FBVyxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUM7Z0JBQzVCLENBQUM7Z0JBRUQsSUFBSSxZQUFZLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ3ZCLElBQUksV0FBVyxLQUFLLEtBQUssRUFBRSxDQUFDO3dCQUMxQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDOzRCQUM5QixJQUFJLEVBQUUsR0FBRzs0QkFDVCxPQUFPLEVBQUUsc0JBQXNCO3lCQUNoQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQzt5QkFBTSxDQUFDO3dCQUNOLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDWCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUM3QixjQUFjLENBQUMsSUFBSSxDQUFDO2dDQUNsQixJQUFJLEVBQUUsR0FBRztnQ0FDVCxPQUFPLEVBQUUsY0FBYzs2QkFDeEIsQ0FBQyxDQUFDOzRCQUNILElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBQ25DLENBQUM7d0JBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBQzVCLENBQUM7b0JBQ0QsWUFBWSxJQUFJLENBQUMsQ0FBQztnQkFDcEIsQ0FBQztxQkFBTSxJQUFJLFdBQVcsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7b0JBQ3RELEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDWCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM3QixjQUFjLENBQUMsSUFBSSxDQUFDOzRCQUNsQixJQUFJLEVBQUUsR0FBRzs0QkFDVCxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNsRCxDQUFDLENBQUM7d0JBQ0gsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQzs0QkFDOUIsSUFBSSxFQUFFLEdBQUc7NEJBQ1QsT0FBTyxFQUFFLHdDQUF3Qzt5QkFDbEQsQ0FBQyxDQUFDO3dCQUNILElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ25DLENBQUM7b0JBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzVCLENBQUM7cUJBQU0sQ0FBQztvQkFDTixJQUFJLFlBQVksS0FBSyxDQUFDLEVBQUUsQ0FBQzt3QkFDdkIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQzs0QkFDOUIsSUFBSSxFQUFFLEdBQUc7NEJBQ1QsT0FBTyxFQUFFLHFCQUFxQjt5QkFDL0IsQ0FBQyxDQUFDO3dCQUNILFlBQVksSUFBSSxDQUFDLENBQUM7b0JBQ3BCLENBQUM7b0JBQ0QsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7b0JBQ3RELE1BQU0sYUFBYSxHQUFHO3dCQUNwQixNQUFNLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjt3QkFDL0IsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQjtxQkFDeEQsQ0FBQztvQkFDRixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM3QixjQUFjLENBQUMsSUFBSSxDQUFDOzRCQUNsQixJQUFJLEVBQUUsR0FBRzs0QkFDVCxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU87NEJBQzdCLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxJQUFJLEVBQUU7NEJBQ3pDLGFBQWE7eUJBQ2QsQ0FBQyxDQUFDO29CQUNMLENBQUM7b0JBQ0QsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUM7b0JBQ3pDLElBQUksSUFBSSx3QkFBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQzt3QkFDeEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDN0IsY0FBYyxDQUFDLElBQUksQ0FBQztnQ0FDbEIsSUFBSSxFQUFFLEdBQUc7Z0NBQ1QsT0FBTyxFQUFFLDRDQUE0Qzs2QkFDdEQsQ0FBQyxDQUFDOzRCQUNILElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBQ25DLENBQUM7d0JBQ0QsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNiLENBQUM7eUJBQU0sSUFBSSxhQUFhLEVBQUUsQ0FBQzt3QkFDekIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzs0QkFDMUIsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPOzRCQUN0QixhQUFhOzRCQUNiLGlCQUFpQixFQUFFLGFBQWE7eUJBQ2pDLENBQUMsQ0FBQzt3QkFDSCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoQixDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDLENBQUM7WUFFRixFQUFFLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDOUUsRUFBRSxDQUFDLE9BQU8sR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFekUsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQztnQkFDOUIsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsT0FBTyxFQUFFLHdDQUF3QzthQUNsRCxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM3QixjQUFjLENBQUMsSUFBSSxDQUFDO29CQUNsQixJQUFJLEVBQUUsR0FBRztvQkFDVCxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSwwQkFBMEI7aUJBQ3JELENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ25DLENBQUM7WUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUM5QixNQUFNLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM5RixJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDMUQsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQscUJBQXFCO1FBQ25CLGVBQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGVBQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsTUFBVyxFQUFFLGNBQWdFO1FBQzVGLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFDakMsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUM7UUFDdEMsQ0FBQztRQUNELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM3RCx5QkFBZSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2lCQUMvRSxJQUFJLENBQUMsQ0FBQyxTQUFjLEVBQUUsRUFBRTtnQkFDdkIsSUFBSSxTQUFTLElBQUksU0FBUyxFQUFFLGNBQWMsRUFBRSxDQUFDO29CQUMzQyxNQUFNLFdBQVcsR0FBRyxTQUFTLEVBQUUsY0FBYyxDQUFDO29CQUM5QyxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDO29CQUNqQyxJQUFJLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7b0JBQ3hDLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkMsVUFBVSxHQUFHLFVBQVUsR0FBRyxNQUFNLENBQUM7d0JBQ2pDLGlCQUFpQixHQUFHLGlCQUFpQixHQUFHLFdBQVcsQ0FBQztvQkFDdEQsQ0FBQzt5QkFBTSxDQUFDO3dCQUNOLFVBQVUsR0FBRyxVQUFVLEdBQUcsT0FBTyxDQUFDO3dCQUNsQyxpQkFBaUIsR0FBRyxpQkFBaUIsR0FBRyxZQUFZLENBQUM7b0JBQ3ZELENBQUM7b0JBQ0QsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUM7b0JBQzlCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUM7d0JBQzlCLElBQUksRUFBRSxHQUFHO3dCQUNULE9BQU8sRUFBRSw2QkFBNkI7cUJBQ3ZDLENBQUMsQ0FBQztvQkFDSCxlQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNWLE1BQU0sRUFBRSxpQkFBaUI7d0JBQ3pCLE1BQU0sRUFBRSxHQUFHLEVBQUU7NEJBQ1gsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO2dDQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztnQ0FDM0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztnQ0FDbEMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQztvQ0FDOUIsSUFBSSxFQUFFLEdBQUc7b0NBQ1QsT0FBTyxFQUFFLG1CQUFtQjtpQ0FDN0IsQ0FBQyxDQUFDO2dDQUNILElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUTtvQ0FBRSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUN4RCxrQkFBa0IsR0FBRyxLQUFLLENBQUM7Z0NBQzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDbEIsQ0FBQzt3QkFDSCxDQUFDO3dCQUNELE9BQU8sRUFBRSxHQUFHLEVBQUU7NEJBQ1osSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FDN0IsY0FBYyxDQUFDLElBQUksQ0FBQztvQ0FDbEIsSUFBSSxFQUFFLEdBQUc7b0NBQ1QsT0FBTyxFQUFFLDBCQUEwQixHQUFHLFdBQVcsQ0FBQyxHQUFHO2lDQUN0RCxDQUFDLENBQUM7Z0NBQ0gsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDNUIsQ0FBQzs0QkFDRCxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQyxDQUFDO3dCQUNoRSxDQUFDO3FCQUNGLENBQUMsQ0FBQztnQkFDTCxDQUFDO3FCQUFNLENBQUM7b0JBQ04sSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztvQkFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDN0IsY0FBYyxDQUFDLElBQUksQ0FBQzs0QkFDbEIsSUFBSSxFQUFFLEdBQUc7NEJBQ1QsT0FBTyxFQUFFLGlCQUFpQjt5QkFDM0IsQ0FBQyxDQUFDO3dCQUNILGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVCLENBQUM7b0JBQ0QsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDdEMsQ0FBQztZQUNILENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsU0FBUyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM3QixjQUFjLENBQUMsSUFBSSxDQUFDO3dCQUNsQixJQUFJLEVBQUUsR0FBRzt3QkFDVCxPQUFPLEVBQUUsMEJBQTBCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDM0UsQ0FBQyxDQUFDO29CQUNILGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztJQUN0QyxDQUFDO0lBRUQsd0JBQXdCLENBQUMsY0FBaUU7UUFDeEYsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNyQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQyxDQUFDO1lBQzlFLENBQUM7aUJBQU0sQ0FBQztnQkFDTixJQUFJLENBQUMsVUFBVSxDQUFDLHdCQUF3QixFQUFFO3FCQUN2QyxJQUFJLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtvQkFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDekQsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO29CQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN0RCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM3QixjQUFjLENBQUMsSUFBSSxDQUFDOzRCQUNsQixJQUFJLEVBQUUsR0FBRzs0QkFDVCxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU87eUJBQ3hCLENBQUMsQ0FBQzt3QkFDSCxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1QixDQUFDO29CQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzdCLE1BQU0sY0FBYyxHQUFHLElBQUksNEJBQVEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzFELGNBQWMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLGNBQWMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHO2dCQUNULE9BQU8sRUFBRSwwQkFBMEI7YUFDcEMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGNBQWMsQ0FBQztZQUMzQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDO2dCQUMzQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNkVBQTZFLENBQUMsQ0FBQyxDQUFDO1lBQ25HLENBQUM7aUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUN6QyxDQUFDO2lCQUFNLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLENBQUM7WUFDeEQsQ0FBQztpQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLHdCQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLElBQUksd0JBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7Z0JBQzdJLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDLENBQUM7WUFDakYsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7Z0JBQ2pDLE1BQU0sY0FBYyxHQUFHLElBQUksNEJBQVEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxjQUFjLENBQUMsS0FBSyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDakMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFO3FCQUNkLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ1QsSUFBSSxDQUFDLGFBQWEsRUFBRTt5QkFDakIsSUFBSSxDQUFDLENBQUMsVUFBZSxFQUFFLEVBQUU7d0JBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO3dCQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQzs2QkFDNUIsSUFBSSxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUU7NEJBQ3BCLElBQUksTUFBTSxJQUFJLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQztnQ0FDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUM7Z0NBQ2xELElBQUksSUFBSSx3QkFBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztvQ0FDdkYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3Q0FDN0IsY0FBYyxDQUFDLElBQUksQ0FBQzs0Q0FDbEIsSUFBSSxFQUFFLEdBQUc7NENBQ1QsT0FBTyxFQUFFLGlDQUFpQyxHQUFHLE1BQU0sRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLE1BQU07eUNBQ3JGLENBQUMsQ0FBQztvQ0FDTCxDQUFDO2dDQUNILENBQUM7cUNBQU0sQ0FBQztvQ0FDTix5QkFBZSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUM7eUNBQ3JKLElBQUksQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO3dDQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLE1BQU0sQ0FBQyxDQUFDO3dDQUNoRCxJQUFJLE1BQU0sRUFBRSxlQUFlLEVBQUUsQ0FBQzs0Q0FDNUIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQztnREFDOUIsSUFBSSxFQUFFLEdBQUc7Z0RBQ1QsT0FBTyxFQUFFLGlDQUFpQzs2Q0FDM0MsQ0FBQyxDQUFDOzRDQUNILElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7Z0RBQzdCLGNBQWMsQ0FBQyxJQUFJLENBQUM7b0RBQ2xCLElBQUksRUFBRSxHQUFHO29EQUNULE9BQU8sRUFBRSxNQUFNLEVBQUUsZUFBZTtpREFDakMsQ0FBQyxDQUFDOzRDQUNMLENBQUM7NENBQ0QsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzt3Q0FDakUsQ0FBQzs2Q0FBTSxDQUFDOzRDQUNOLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7NENBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7Z0RBQzdCLGNBQWMsQ0FBQyxJQUFJLENBQUM7b0RBQ2xCLElBQUksRUFBRSxHQUFHO29EQUNULE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztpREFDaEMsQ0FBQyxDQUFDOzRDQUNMLENBQUM7d0NBQ0gsQ0FBQztvQ0FDSCxDQUFDLENBQUM7eUNBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7d0NBQ2YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0Q0FDN0IsY0FBYyxDQUFDLElBQUksQ0FBQztnREFDbEIsSUFBSSxFQUFFLEdBQUc7Z0RBQ1QsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTs2Q0FDNUMsQ0FBQyxDQUFDO3dDQUNMLENBQUM7d0NBQ0QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztvQ0FDcEMsQ0FBQyxDQUFDLENBQUM7Z0NBQ1AsQ0FBQzs0QkFDSCxDQUFDO2lDQUFNLENBQUM7Z0NBQ04sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQ0FDN0IsY0FBYyxDQUFDLElBQUksQ0FBQzt3Q0FDbEIsSUFBSSxFQUFFLEdBQUc7d0NBQ1QsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO3FDQUNoQyxDQUFDLENBQUM7Z0NBQ0wsQ0FBQzs0QkFDSCxDQUFDO3dCQUNILENBQUMsQ0FBQzs2QkFDRCxLQUFLLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRTs0QkFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FDN0IsY0FBYyxDQUFDLElBQUksQ0FBQztvQ0FDbEIsSUFBSSxFQUFFLEdBQUc7b0NBQ1QsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtpQ0FDNUMsQ0FBQyxDQUFDOzRCQUNMLENBQUM7d0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7d0JBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQzdCLGNBQWMsQ0FBQyxJQUFJLENBQUM7Z0NBQ2xCLElBQUksRUFBRSxHQUFHO2dDQUNULE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7NkJBQzVDLENBQUMsQ0FBQzt3QkFDTCxDQUFDO29CQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO29CQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM3QixjQUFjLENBQUMsSUFBSSxDQUFDOzRCQUNsQixJQUFJLEVBQUUsR0FBRzs0QkFDVCxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO3lCQUM1QyxDQUFDLENBQUM7b0JBQ0wsQ0FBQztnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsUUFBdUI7UUFDakMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO2dCQUNyQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7aUJBQU0sSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztnQkFDckMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQztZQUN4RCxDQUFDO2lCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLG1FQUFtRSxDQUFDLENBQUMsQ0FBQztZQUN6RixDQUFDO2lCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzFCLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtxQkFDNUIsSUFBSSxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUU7b0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3pELE1BQU0sY0FBYyxHQUFHLElBQUksNEJBQVEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUMxRCxjQUFjLENBQUMsS0FBSyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDakMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUN4QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDcEQsQ0FBQzt5QkFBTSxDQUFDO3dCQUNOLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ2xELENBQUM7Z0JBQ0gsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSxjQUFjLEdBQUcsSUFBSSw0QkFBUSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzFELGNBQWMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO3FCQUFNLENBQUM7b0JBQ04sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDbEQsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQUVELGtCQUFlLFVBQVUsQ0FBQyJ9