import EncryptUtils from "./encryptUtils";
import WalletOperation from "./walletOperation";
// @ts-ignore
import { Readable } from "stream-browserify";

interface ConfigOptions {
  modelId: string;
}
class ChatClient {
  public modelId: string;
  private chatQueue: any = [];
  private chatSeq = -1;
  private totalPayment = 1;
  private isChatinging = false;
  private isRegisterSessioning = false;
  private agentUrl = "";
  constructor(options: ConfigOptions) {
    this.modelId = options.modelId;
  }

  requestChatQueue(readableStream: any, question: string) {
    this.isChatinging = true;
    this.chatSeq += 1;
    let isFirstChat = true;
    const ws = new WebSocket(this.agentUrl);
    ws.addEventListener("open", () => {
      if (ws.readyState === 1) {
        const signData = EncryptUtils.signQuestion(question, this.chatSeq);
        if (signData) {
          ws.send(
            JSON.stringify({
              chat_seq: this.chatSeq,
              qn: question,
              signature_question: signData,
            })
          );
        } else {
          readableStream.push({
            code: 401,
            message:
              "No signature found or the signature has expired, please sign again",
          });
          this.isChatinging = false;
          readableStream.push(null);
        }
      }
    });
    ws.onmessage = (event: any) => {
      console.log("onmessage: ", event);
      if (isFirstChat) {
        if (event?.data !== "ack") {
          ws.close();
          readableStream.push({
            code: 402,
            message: "Illegal link",
          });
          this.isChatinging = false;
        } else {
          isFirstChat = false;
        }
      } else if (event?.data === "[DONE]") {
        ws.close();
        readableStream.push({
          code: 403,
          message: event.data,
        });
        this.isChatinging = false;
      } else {
        const total_payment = {
          amount: this.totalPayment,
          denom: "NES",
        };
        const signaturePayment = EncryptUtils.signPayment(
          this.chatSeq,
          total_payment
        );
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
        } else {
          readableStream.push({
            code: 401,
            message:
              "No signature found or the signature has expired, please sign again",
          });
          ws.close();
          readableStream.push(null);
        }
      }
    };
    ws.onclose = (error: any) => {
      console.log("onclose: ", error);
      readableStream.push(null);
      this.isChatinging = false;
      if (this.chatQueue.length > 0) {
        const { readableStream: nextReadableStream, question: nextQuestion } =
          this.chatQueue.shift();
        this.requestChatQueue(nextReadableStream, nextQuestion);
      }
    };
    ws.onerror = (error: any) => {
      console.log("websocketOnerror: ", error);
      readableStream.push({
        code: 404,
        message: "Error: Connection failed",
      });
      readableStream.push(null);
      this.isChatinging = false;
      if (this.chatQueue.length > 0) {
        const { readableStream: nextReadableStream, question: nextQuestion } =
          this.chatQueue.shift();
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
      } else {
        const { sessionId, vrf } = EncryptUtils.generateVrf();
        WalletOperation.registerSession(sessionId, vrf)
          .then((result: any) => {
            if (result?.transactionHash) {
              this.agentUrl = "wss://nesa-agent.tpblock.io/pingws";
              this.isRegisterSessioning = false;
              resolve(result);
            } else {
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

  requestChat(question: string) {
    return new Promise((resolve, reject) => {
      if (this.isRegisterSessioning) {
        reject(new Error("Registering session, please wait"));
      } else if (!this.agentUrl) {
        reject(new Error("Please initiate registration operation first"));
      } else {
        const readableStream = new Readable({ objectMode: true });
        readableStream._read = () => {};
        resolve(readableStream);
        if (this.isChatinging) {
          this.chatQueue.push({ readableStream, question });
        } else {
          this.requestChatQueue(readableStream, question);
        }
      }
    });
  }
}

export default ChatClient;
