import EncryptUtils from "./encryptUtils";
import WalletOperation from "./walletOperation";
import { Readable } from "stream-browserify";
import { ChainInfo } from "@keplr-wallet/types"
import { defaultChainInfo, defaultLockAmount, sdkVersion } from "./default.config";
import { socket } from "./socket";
import { BigNumber } from 'bignumber.js';

interface ConfigOptions {
  modelName: string;
  lockAmount?: string;
  chainInfo?: ChainInfo;
}

interface questionTypes {
  messages: any
  stream?: boolean
}

class ChatClient {
  public modelName: string;
  public chainInfo: ChainInfo;
  public lockAmount: string;
  public lockAmountDenom: string;
  private chatQueue: any = [];
  private chatSeq = 0;
  private totalPayment = 1;
  private isChatinging = false;
  private isRegisterSessioning = false;
  private agentUrl = "";
  private assistantRoleName = ""
  constructor(options: ConfigOptions) {
    this.modelName = options.modelName;
    this.chainInfo = options.chainInfo || defaultChainInfo;
    this.lockAmount = options.lockAmount || defaultLockAmount;
    this.lockAmountDenom = ''
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
          const questionStr = JSON.stringify(question);
          if (question.messages && this.assistantRoleName) {
            question.messages = question.messages.map((item: any) => {
              if (item.role === 'assistant') {
                item.role = this.assistantRoleName
              }
              return item
            })
          }
          const signedMessage = EncryptUtils.signMessage(questionStr, this.chatSeq, true);
          if (signedMessage) {
            ws.send(
              JSON.stringify({
                chat_seq: this.chatSeq,
                query: questionStr,
                signature_query: signedMessage,
              })
            );
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
    return new Promise((resolve, reject) => {
      if (!this.checkChainInfo()) {
        reject(new Error("Invalid chainInfo, you must provide rpc, rest, feeCurrencies, feeCurrencies"));
      } else if (!this.modelName) {
        reject(new Error("ModelName is null"));
      } else if (this.isRegisterSessioning) {
        reject(new Error("Registering session, please wait"));
      } else if (!this.lockAmount || new BigNumber(this.lockAmount).isNaN()) {
        reject(new Error("LockAmount invalid value"))
      } else {
        WalletOperation.requestParams(this.chainInfo)
          .then((params) => {
            if (params && params?.params) {
              if (new BigNumber(this.lockAmount).isLessThan(params?.params?.userMinimumLock?.amount)) {
                reject(new Error("LockAmount cannot be less than " + params?.params?.userMinimumLock?.amount))
              } else {
                WalletOperation.registerSession(this.modelName, this.lockAmount, params?.params?.userMinimumLock?.denom, this.chainInfo)
                  .then((result: any) => {
                    console.log('registerSession-result: ', result)
                    if (result?.transactionHash) {
                      WalletOperation.requestAgentInfo(result?.account, this.modelName, this.chainInfo)
                        .then((agentInfo: any) => {
                          console.log('agentInfo: ', agentInfo)
                          if (agentInfo && agentInfo?.inferenceAgents?.length > 0) {
                            const selectAgent = agentInfo?.inferenceAgents[0]
                            let agentWsUrl = selectAgent.url
                            let agentHeartbeatUrl = selectAgent.url
                            if (selectAgent.url?.endsWith("/")) {
                              agentWsUrl = agentWsUrl + 'chat';
                              agentHeartbeatUrl = agentHeartbeatUrl + 'heartbeat';
                            } else {
                              agentWsUrl = agentWsUrl + '/chat';
                              agentHeartbeatUrl = agentHeartbeatUrl + '/heartbeat';
                            }
                            socket.init({
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
                          } else {
                            this.isRegisterSessioning = false;
                            reject(new Error("No agent found"))
                          }
                        })
                        .catch((error) => {
                          console.log("requestAgentInfoError: ", error);
                          reject(error);
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
            } else {
              reject(new Error("Chain configuration loading failed."))
            }
          })
          .catch((error) => {
            reject(error)
          })
      }
    });
  }

  requestChat(question: any) {
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
