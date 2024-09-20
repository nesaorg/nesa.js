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
        this.modelName = options?.modelName?.toLowerCase() || "";
        this.chainInfo = options.chainInfo || default_config_1.defaultChainInfo;
        this.lockAmount = options.lockAmount || default_config_1.defaultLockAmount;
        this.singlePaymentAmount =
            options.singlePaymentAmount || default_config_1.defaultSinglePaymentAmount;
        this.lowBalance = options.lowBalance || default_config_1.defaultLowBalance;
        this.lockAmountDenom = "";
        this.walletName = options.walletName || "";
        this.privateKey = options.privateKey || "";
        this.isEverRequestSession = false;
        this.isBrowser = typeof window !== "undefined";
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
                console.error("initOfflineSigner-error: ", error);
                throw error;
            }
        })();
        return this.lastInitOfflineSignerPromise;
    }
    async initBrowserWallet() {
        if (this.walletName === "npm:@leapwallet/metamask-cosmos-snap") {
            await (0, cosmos_snap_provider_1.suggestChain)(this.chainInfo, { force: false });
            this.offLinesigner = new cosmos_snap_provider_1.CosmjsOfflineSigner(this.chainInfo.chainId);
        }
        else if (window?.keplr) {
            await window.keplr.experimentalSuggestChain(this.chainInfo);
            await window.keplr.enable(this.chainInfo.chainId);
            this.offLinesigner = window.getOfflineSigner(this.chainInfo.chainId);
        }
        else {
            throw new Error("No wallet installed, please install keplr or metamask wallet first");
        }
    }
    async initNodeWallet() {
        if (!this.privateKey) {
            throw new Error("In the node environment, please provide the privateKey");
        }
        const wallet = await proto_signing_1.DirectSecp256k1Wallet.fromKey(Buffer.from(this.privateKey, "hex"), "nesa");
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
                console.error("initNesaClientError: ", error);
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
                if (!this.chatProgressReadable?.isClosed) {
                    this.chatProgressReadable?.push({
                        code: 301,
                        message: "Connected to Nesa chain",
                    });
                }
                resolve(params);
            })
                .catch((error) => {
                console.error("getChainParamsError: ", error);
                this.lastUserMinimumLockPromise = undefined;
                reject(error);
            });
        });
        return this.lastUserMinimumLockPromise;
    }
    checkChainInfo() {
        return (this.chainInfo?.rpc &&
            this.chainInfo?.rest &&
            this.chainInfo?.feeCurrencies &&
            this.chainInfo?.feeCurrencies.length > 0 &&
            this.chainInfo?.feeCurrencies[0]?.coinMinimalDenom);
    }
    getSignaturePayment() {
        if (this.signaturePayment[this.totalSignedPayment])
            return "";
        const signaturePayment = encryptUtils_1.default.signMessage(`${this.totalSignedPayment}${this.chainInfo.feeCurrencies[0].coinMinimalDenom}`, this.chatSeq, false);
        this.signaturePayment[this.totalSignedPayment] = signaturePayment;
        return signaturePayment;
    }
    checkSinglePaymentAmount() {
        if (new bignumber_js_1.BigNumber(this.totalSignedPayment).isLessThanOrEqualTo(this.lowBalance)) {
            this.totalSignedPayment = Number(new bignumber_js_1.BigNumber(this.totalSignedPayment)
                .plus(this.singlePaymentAmount)
                .toFixed(0, 1));
            return this.getSignaturePayment();
        }
        if (new bignumber_js_1.BigNumber(this.totalSignedPayment)
            .minus(this.totalUsedPayment)
            .isLessThanOrEqualTo(this.lowBalance)) {
            if (new bignumber_js_1.BigNumber(this.totalSignedPayment).isLessThan(this.totalUsedPayment)) {
                this.totalSignedPayment = Number(this.totalUsedPayment);
                return this.getSignaturePayment();
            }
            if (new bignumber_js_1.BigNumber(this.totalSignedPayment)
                .plus(this.singlePaymentAmount)
                .isLessThanOrEqualTo(this.lockAmount)) {
                this.totalSignedPayment = Number(new bignumber_js_1.BigNumber(this.totalSignedPayment)
                    .plus(this.singlePaymentAmount)
                    .toFixed(0, 1));
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
            console.log("WebSocket closed unexpectedly: ", reason);
            if (!readableStream?.isClosed) {
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
        try {
            if (this.chatProgressReadable && !this.chatProgressReadable.isClosed) {
                this.chatProgressReadable.push({
                    code: 307,
                    message: "Task completed, wait for another query",
                });
            }
        }
        catch (e) {
            console.error(e);
        }
        try {
            if (!readableStream?.isClosed) {
                readableStream.push({
                    code: 204,
                    message: error?.reason || "Error: Connection failed",
                });
            }
        }
        catch (e) {
            console.error(e);
        }
        this.closeStream(readableStream);
        this.isChatinging = false;
        if (this.chatQueue.length > 0) {
            const { readableStream: nextReadableStream, question: nextQuestion } = this.chatQueue.shift();
            this.requestChatQueue(nextReadableStream, nextQuestion);
        }
    }
    closeStream(readableStream) {
        if (readableStream && !readableStream?.isClosed) {
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
                const WebSocket = require("ws");
                ws = new WebSocket(this.agentUrl);
            }
            ws.addEventListener("open", () => {
                if (ws.readyState === 1) {
                    const questionStr = JSON.stringify({
                        stream: true,
                        ...question,
                        model: question?.model?.toLowerCase(),
                    });
                    if (question.messages && this.assistantRoleName) {
                        question.messages = question.messages.map((item) => {
                            if (item.role === "assistant") {
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
                        if (!readableStream?.isClosed) {
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
                        if (!readableStream?.isClosed) {
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
                    if (!readableStream?.isClosed) {
                        readableStream.push({
                            code: 203,
                            message: messageJson?.content?.split("[DONE]")[1],
                        });
                        this.chatProgressReadable?.push({
                            code: 307,
                            message: "Task completed, wait for another query",
                        });
                        this.closeStream(readableStream);
                    }
                    this.isChatinging = false;
                }
                else {
                    if (messageTimes === 1) {
                        if (!this.chatProgressReadable?.isClosed) {
                            this.chatProgressReadable?.push({
                                code: 306,
                                message: "Receiving responses",
                            });
                        }
                        messageTimes += 1;
                    }
                    const signedMessage = this.checkSinglePaymentAmount();
                    const total_payment = {
                        amount: this.totalSignedPayment,
                        denom: this.chainInfo.feeCurrencies[0].coinMinimalDenom,
                    };
                    if (!readableStream?.isClosed) {
                        readableStream.push({
                            code: 200,
                            message: messageJson?.content,
                            session_id: messageJson?.session_id || "",
                            total_payment,
                        });
                    }
                    this.totalUsedPayment += this.tokenPrice;
                    if (new bignumber_js_1.BigNumber(this.totalUsedPayment).isGreaterThan(this.lockAmount)) {
                        if (!readableStream?.isClosed) {
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
            if (!this.chatProgressReadable?.isClosed) {
                this.chatProgressReadable?.push({
                    code: 307,
                    message: "Task completed, wait for another query",
                });
            }
            if (!readableStream?.isClosed) {
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
                        agentWsUrl = agentWsUrl + "chat";
                        agentHeartbeatUrl = agentHeartbeatUrl + "heartbeat";
                    }
                    else {
                        agentWsUrl = agentWsUrl + "/chat";
                        agentHeartbeatUrl = agentHeartbeatUrl + "/heartbeat";
                    }
                    let firstInitHeartbeat = true;
                    if (!this.chatProgressReadable?.isClosed) {
                        this.chatProgressReadable?.push({
                            code: 303,
                            message: "Connecting to the validator",
                        });
                    }
                    socket_1.socket.init({
                        ws_url: agentHeartbeatUrl,
                        onopen: () => {
                            if (firstInitHeartbeat) {
                                this.agentUrl = agentWsUrl;
                                this.isRegisterSessioning = false;
                                if (!this.chatProgressReadable?.isClosed) {
                                    this.chatProgressReadable?.push({
                                        code: 304,
                                        message: "Waiting for query",
                                    });
                                }
                                if (!readableStream?.isClosed)
                                    readableStream.push(null);
                                firstInitHeartbeat = false;
                                resolve(result);
                            }
                        },
                        onerror: () => {
                            if (!readableStream?.isClosed) {
                                readableStream.push({
                                    code: 319,
                                    message: "Agent connection error: " + selectAgent.url,
                                });
                                readableStream.push(null);
                            }
                            reject(new Error("Agent heartbeat packet connection failed"));
                        },
                    });
                }
                else {
                    this.isRegisterSessioning = false;
                    if (!readableStream?.isClosed) {
                        readableStream.push({
                            code: 319,
                            message: "Agent not found",
                        });
                        readableStream.push(null);
                    }
                    reject(new Error("No agent found"));
                }
            })
                .catch((error) => {
                console.log("requestAgentInfoError: ", error);
                this.lastGetAgentInfoPromise = undefined;
                try {
                    if (!readableStream?.isClosed) {
                        readableStream?.push({
                            code: 319,
                            message: "Agent connection error: " + error?.message ||
                                error.toString(),
                        });
                        readableStream?.push(null);
                    }
                }
                catch (e) {
                    console.error("request agent error", e);
                }
                reject(error);
            });
        });
        return this.lastGetAgentInfoPromise;
    }
    checkSignBroadcastResult(readableStream) {
        return new Promise((resolve, reject) => {
            if (!this.nesaClient) {
                reject(new Error("Please wait for the requestSession registration result"));
            }
            else {
                this.nesaClient
                    .broadcastRegisterSession()
                    .then((result) => {
                    resolve(this.requestAgentInfo(result, readableStream));
                })
                    .catch((error) => {
                    console.log("checkSignBroadcastResultError: ", error);
                    try {
                        if (!readableStream?.isClosed) {
                            readableStream.push({
                                code: 318,
                                message: error?.message,
                            });
                            readableStream.push(null);
                        }
                    }
                    catch (e) {
                        console.error(e);
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
            else if (!this.lockAmount ||
                new bignumber_js_1.BigNumber(this.lockAmount).isNaN() ||
                new bignumber_js_1.BigNumber(this.lockAmount).isLessThan(this.singlePaymentAmount)) {
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
                                    if (!readableStream?.isClosed) {
                                        readableStream.push({
                                            code: 311,
                                            message: "LockAmount cannot be less than " +
                                                params?.params?.userMinimumLock?.amount,
                                        });
                                    }
                                }
                                else {
                                    walletOperation_1.default.registerSession(nesaClient, this.modelName, this.lockAmount, params?.params?.userMinimumLock?.denom, this.chainInfo, this.offLinesigner)
                                        .then((result) => {
                                        console.log("registerSession-result: ", result);
                                        if (result?.transactionHash) {
                                            if (!this.chatProgressReadable?.isClosed) {
                                                this.chatProgressReadable?.push({
                                                    code: 302,
                                                    message: "Choosing an inference validator",
                                                });
                                            }
                                            if (!readableStream?.isClosed) {
                                                readableStream.push({
                                                    code: 200,
                                                    message: result?.transactionHash,
                                                });
                                            }
                                            this.checkSignBroadcastResult(readableStream).catch(() => { });
                                        }
                                        else {
                                            this.isRegisterSessioning = false;
                                            if (!readableStream?.isClosed) {
                                                readableStream.push({
                                                    code: 312,
                                                    message: JSON.stringify(result),
                                                });
                                            }
                                        }
                                    })
                                        .catch((error) => {
                                        try {
                                            if (!readableStream?.isClosed) {
                                                readableStream.push({
                                                    code: 313,
                                                    message: error?.message || error.toString(),
                                                });
                                            }
                                        }
                                        catch (e) {
                                            console.error(e);
                                        }
                                        this.isRegisterSessioning = false;
                                    });
                                }
                            }
                            else {
                                if (!readableStream?.isClosed) {
                                    readableStream.push({
                                        code: 314,
                                        message: JSON.stringify(params),
                                    });
                                }
                            }
                        })
                            .catch((error) => {
                            try {
                                if (!readableStream?.isClosed) {
                                    readableStream.push({
                                        code: 315,
                                        message: error?.message || error.toString(),
                                    });
                                }
                            }
                            catch (e) {
                                console.error(e);
                            }
                        });
                    })
                        .catch((error) => {
                        try {
                            if (!readableStream?.isClosed) {
                                readableStream.push({
                                    code: 316,
                                    message: error?.message || error.toString(),
                                });
                            }
                        }
                        catch (e) {
                            console.error(e);
                        }
                    });
                })
                    .catch((error) => {
                    try {
                        if (!readableStream?.isClosed) {
                            readableStream.push({
                                code: 317,
                                message: error?.message || error.toString(),
                            });
                        }
                    }
                    catch (e) {
                        console.error(e);
                    }
                });
            }
        });
    }
    requestChat(question) {
        return new Promise((resolve, reject) => {
            if (!question?.model) {
                reject(new Error("Model is required"));
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
                    console.log("checkSignBroadcastResult-result: ", result);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jaGF0Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTBDO0FBQzFDLHdFQUFnRDtBQUNoRCx5REFBNkM7QUFFN0MscURBTTBCO0FBQzFCLHFDQUFrQztBQUNsQywrQ0FBeUM7QUFDekMsMkVBRzBDO0FBQzFDLHlEQUE4RDtBQTJCOUQsTUFBTSxVQUFVO0lBK0JkLFlBQVksT0FBc0I7UUF2QjFCLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFDcEIsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUNyQix1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDdkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFVdkIscUJBQWdCLEdBQThCLEVBQUUsQ0FBQztRQU92RCxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3pELElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxpQ0FBZ0IsQ0FBQztRQUN2RCxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksa0NBQWlCLENBQUM7UUFDMUQsSUFBSSxDQUFDLG1CQUFtQjtZQUN0QixPQUFPLENBQUMsbUJBQW1CLElBQUksMkNBQTBCLENBQUM7UUFDNUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLGtDQUFpQixDQUFDO1FBQzFELElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7UUFD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