"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encryptUtils_1 = __importDefault(require("./encryptUtils"));
const walletOperation_1 = __importDefault(require("./walletOperation"));
// @ts-ignore
const stream_browserify_1 = require("stream-browserify");
class ChatClient {
    constructor(options) {
        this.chatQueue = [];
        this.chatSeq = -1;
        this.totalPayment = 1;
        this.isChatinging = false;
        this.isRegisterSessioning = false;
        this.agentUrl = "";
        this.modelId = options.modelId;
    }
    requestChatQueue(readableStream, question) {
        this.isChatinging = true;
        this.chatSeq += 1;
        let isFirstChat = true;
        const ws = new WebSocket(this.agentUrl);
        ws.addEventListener("open", () => {
            if (ws.readyState === 1) {
                const signData = encryptUtils_1.default.signQuestion(question, this.chatSeq);
                if (signData) {
                    ws.send(JSON.stringify({
                        chat_seq: this.chatSeq,
                        qn: question,
                        signature_question: signData,
                    }));
                }
                else {
                    readableStream.push({
                        code: 401,
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
                        code: 402,
                        message: "Illegal link",
                    });
                    this.isChatinging = false;
                }
                else {
                    isFirstChat = false;
                }
            }
            else if (event?.data === "[DONE]") {
                ws.close();
                readableStream.push({
                    code: 403,
                    message: event.data,
                });
                this.isChatinging = false;
            }
            else {
                const total_payment = {
                    amount: this.totalPayment,
                    denom: "NES",
                };
                const signaturePayment = encryptUtils_1.default.signPayment(this.chatSeq, total_payment);
                if (signaturePayment) {
                    readableStream.push({
                        code: 200,
                        message: event?.data,
                        total_payment,
                    });
                    const data = JSON.stringify({
                        chat_seq: this.chatSeq,
                        total_payment,
                        signature_payment: signaturePayment,
                    });
                    this.totalPayment += 1;
                    ws.send(data);
                }
                else {
                    readableStream.push({
                        code: 401,
                        message: "No signature found or the signature has expired, please sign again",
                    });
                    ws.close();
                    readableStream.push(null);
                }
            }
        };
        ws.onclose = (error) => {
            console.log("onclose: ", error);
            readableStream.push(null);
            this.isChatinging = false;
            if (this.chatQueue.length > 0) {
                const { readableStream: nextReadableStream, question: nextQuestion } = this.chatQueue.shift();
                this.requestChatQueue(nextReadableStream, nextQuestion);
            }
        };
        ws.onerror = (error) => {
            console.log("websocketOnerror: ", error);
            readableStream.push({
                code: 404,
                message: "Error: Connection failed",
            });
            readableStream.push(null);
            this.isChatinging = false;
            if (this.chatQueue.length > 0) {
                const { readableStream: nextReadableStream, question: nextQuestion } = this.chatQueue.shift();
                this.requestChatQueue(nextReadableStream, nextQuestion);
            }
        };
    }
    requestSession() {
        return new Promise((resolve, reject) => {
            // todo add modelId
            // if (!this.modelId) {
            //   reject(new Error("ModelId is null"));
            // } else
            if (this.isRegisterSessioning) {
                reject(new Error("Registering session, please wait"));
            }
            else {
                const { sessionId, vrf } = encryptUtils_1.default.generateVrf();
                walletOperation_1.default.registerSession(sessionId, vrf)
                    .then((result) => {
                    if (result?.transactionHash) {
                        this.agentUrl = "wss://nesa-agent.tpblock.io/pingws";
                        this.isRegisterSessioning = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jaGF0Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTBDO0FBQzFDLHdFQUFnRDtBQUNoRCxhQUFhO0FBQ2IseURBQTZDO0FBSzdDLE1BQU0sVUFBVTtJQVFkLFlBQVksT0FBc0I7UUFOMUIsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDYixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQix5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDakMsQ0FBQztJQUVELGdCQUFnQixDQUFDLGNBQW1CLEVBQUUsUUFBZ0I7UUFDcEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7UUFDbEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLE1BQU0sRUFBRSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUMvQixJQUFJLEVBQUUsQ0FBQyxVQUFVLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ3hCLE1BQU0sUUFBUSxHQUFHLHNCQUFZLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25FLElBQUksUUFBUSxFQUFFLENBQUM7b0JBQ2IsRUFBRSxDQUFDLElBQUksQ0FDTCxJQUFJLENBQUMsU0FBUyxDQUFDO3dCQUNiLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTzt3QkFDdEIsRUFB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