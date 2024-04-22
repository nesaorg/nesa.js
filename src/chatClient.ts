import EncryptUtils from "./encryptUtils";
import WalletOperation from "./walletOperation";
import { Readable } from "stream-browserify";
import { ChainInfo } from "@keplr-wallet/types"
import { defaultChainInfo, defaultLockAmount, sdkVersion } from "./default.config";
// import { socket } from "./socket";

interface ConfigOptions {
  modelName: string;
  chainInfo?: ChainInfo;
  lockAmount?: string;
}

interface questionTypes {
  messages: any
  stream?: boolean
}

class ChatClient {
  public modelName: string;
  public chainInfo: ChainInfo;
  public lockAmount: string;
  private chatQueue: any = [];
  private chatSeq = 0;
  private totalPayment = 1;
  private isChatinging = false;
  private isRegisterSessioning = false;
  private heartbeatConnecting: any;
  private agentUrl = "";
  private assistantRoleName = ""
  constructor(options: ConfigOptions) {
    this.modelName = options.modelName;
    this.chainInfo = options.chainInfo || defaultChainInfo;
    this.lockAmount = options.lockAmount || defaultLockAmount;
    this.heartbeatConnecting = true
  }

  version() {
    return sdkVersion;
  }

  checkChainInfo() {
    return this.chainInfo?.rpc
      && this.chainInfo?.rest
      && this.chainInfo?.feeCurrencies
      && this.chainInfo?.feeCurrencies.length > 0
      && this.chainInfo?.feeCurrencies[0]?.coinMinimalDenom
  }

  requestChatQueue(readableStream: any, question: questionTypes) {
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
          if (question.messages && this.assistantRoleName) {
            question.messages = question.messages.map((item: any) => {
              if (item.role === 'assistant') {
                item.role = this.assistantRoleName
              }
              return item
            })
          }
          console.log('questionStr: ',questionStr)
          const signedMessage = EncryptUtils.signMessage(questionStr, this.chatSeq, true);
          if (signedMessage) {
            if (this.heartbeatConnecting) {
              ws.send(
                JSON.stringify({
                  chat_seq: this.chatSeq,
                  query: questionStr,
                  signature_query: signedMessage,
                })
              );
            } else {
              readableStream.push({
                code: 206,
                message: "The connection has been disconnected, please sign again",
              });
              this.isChatinging = false;
              readableStream.push(null);
            }
          } else {
            readableStream.push({
              code: 201,
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
        let messageJson
        try {
          messageJson = JSON.parse(event?.data)
          if (messageJson?.role) {
            this.assistantRoleName = messageJson.role
          }
        } catch (error) {
          messageJson = event?.data
        }
        if (isFirstChat) {
          if (messageJson !== "ack") {
            ws.close();
            readableStream.push({
              code: 202,
              message: "Illegal link",
            });
            this.isChatinging = false;
          } else {
            isFirstChat = false;
          }
        } else if (messageJson?.content?.startsWith("[DONE]")) {
          ws.close();
          readableStream.push({
            code: 203,
            message: messageJson?.content?.split("[DONE]")[1],
          });
          this.isChatinging = false;
        } else {
          const total_payment = {
            amount: this.totalPayment,
            denom: this.chainInfo.feeCurrencies[0].coinMinimalDenom,
          };
          const signedMessage = EncryptUtils.signMessage(`${total_payment.amount}${total_payment.denom}`, this.chatSeq, false);
          if (signedMessage) {
            if (this.heartbeatConnecting) {
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
            } else {
              readableStream.push({
                code: 206,
                message: "The connection has been disconnected, please sign again",
              });
              this.isChatinging = false;
              readableStream.push(null);
            }
          } else {
            readableStream.push({
              code: 201,
              message:
                "No signature found or the signature has expired, please sign again",
            });
            ws.close();
            readableStream.push(null);
          }
        }
      };
      ws.onclose = (error: any) => {
        console.log('onclose: ', error)
        if (error?.reason) {
          readableStream.push({
            code: 205,
            message: error?.reason,
          });
        }
        readableStream.push(null);
        this.isChatinging = false;
        if (this.chatQueue.length > 0) {
          const { readableStream: nextReadableStream, question: nextQuestion } =
            this.chatQueue.shift();
          this.requestChatQueue(nextReadableStream, nextQuestion);
        }
      };
      ws.onerror = (error: any) => {
        readableStream.push({
          code: 204,
          message: error?.reason || "Error: Connection failed",
        });
        readableStream.push(null);
        this.isChatinging = false;
        if (this.chatQueue.length > 0) {
          const { readableStream: nextReadableStream, question: nextQuestion } =
            this.chatQueue.shift();
          this.requestChatQueue(nextReadableStream, nextQuestion);
        }
      };
    } catch (error: any) {
      console.log('websocketCatchError: ', error)
      readableStream.push({
        code: 207,
        message: error.message || "Error: Connection failed",
      });
      readableStream.push(null);
      this.isChatinging = false;
      if (this.chatQueue.length > 0) {
        const { readableStream: nextReadableStream, question: nextQuestion } =
          this.chatQueue.shift();
        this.requestChatQueue(nextReadableStream, nextQuestion);
      }
    }
  }

  requestSession() {
    console.log('requestSession: ', this.modelName)
    return new Promise((resolve, reject) => {
      if (!this.checkChainInfo()) {
        reject(new Error("Invalid chainInfo, you must provide rpc, rest, feeCurrencies, feeCurrencies"));
      } else if (!this.modelName) {
        reject(new Error("ModelName is null"));
      } else if (this.isRegisterSessioning) {
        reject(new Error("Registering session, please wait"));
      } else {
        WalletOperation.registerSession(this.modelName, this.lockAmount, this.chainInfo)
          .then((result: any) => {
            console.log('registerSession-result: ', result)
            if (result?.transactionHash) {
              WalletOperation.requestAgentInfo(result?.account, this.chainInfo)
                .then((agentInfo: any) => {
                  if (agentInfo?.inferenceAgent?.url) {
                    let agentWsUrl = ''
                    // let agentHeartbeatUrl = ''
                    if (agentInfo?.inferenceAgent?.url?.endsWith("/")) {
                      agentWsUrl = agentInfo?.inferenceAgent?.url + 'chat';
                      // agentHeartbeatUrl = agentInfo?.inferenceAgent?.url + 'heartbeat';
                    } else {
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
                  } else {
                    this.isRegisterSessioning = false;
                    this.heartbeatConnecting = true;
                    reject("No agent found")
                  }
                })
                .catch((error) => {
                  console.log("requestAgentInfoError: ", error);
                  reject('Request agent info error: ' + error?.message);
                })
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

  requestChat(question: any) {
    console.log('this.isRegisterSessioning: ', this.isRegisterSessioning)
    return new Promise((resolve, reject) => {
      if (this.isRegisterSessioning) {
        reject(new Error("Registering session, please wait"));
      } else if (!this.agentUrl) {
        reject(new Error("Please initiate registration operation first"));
      } else {
        const readableStream = new Readable({ objectMode: true });
        readableStream._read = () => { };
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
