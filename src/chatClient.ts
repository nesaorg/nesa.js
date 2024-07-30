import EncryptUtils from "./encryptUtils";
import WalletOperation from "./walletOperation";
import { Readable } from "stream-browserify";
import { ChainInfo } from "@keplr-wallet/types";
import { defaultChainInfo, defaultLockAmount, defaultSinglePaymentAmount, defaultLowBalance, sdkVersion } from "./default.config";
import { socket } from "./socket";
import { BigNumber } from 'bignumber.js';
import { CosmjsOfflineSigner, suggestChain } from '@leapwallet/cosmos-snap-provider';
import { DirectSecp256k1Wallet } from "@cosmjs/proto-signing";

// this is ennoying, but stream-browserify doesn't have a type definition
// node's stream package has a type definition, but it wasn't playing nicely, so not sure if it is compatible
type ReadableStreamWithState = any & { isClosed?: boolean };
 
interface ConfigOptions {
  modelName: string;
  lockAmount?: string;
  chainInfo?: ChainInfo;
  walletName?: string;
  singlePaymentAmount?: string;
  lowBalance?: string;
  privateKey?: string;
}

interface QuestionTypes {
  messages: any;
  model: string;
  stream?: boolean;
  frequency_penalty?: any;
  presence_penalty?: any;
  temperature?: any;
  top_p?: any;
  session_id?: string;
}

class ChatClient {
  public modelName: string;
  public chainInfo: ChainInfo;
  public lockAmount: string;
  public singlePaymentAmount: string;
  public lowBalance: string;
  public lockAmountDenom: string;
  private walletName: string;
  private chatQueue: any = [];
  private chatSeq = 0;
  private totalUsedPayment = 0;
  private totalSignedPayment = 0;
  private isChatinging = false;
  private isRegisterSessioning = false;
  private agentUrl = "";
  private assistantRoleName = "";
  private lastNesaClientPromise: Promise<any> | undefined;
  private lastUserMinimumLockPromise: Promise<any> | undefined;
  private lastGetAgentInfoPromise: Promise<any> | undefined;
  private lastInitOfflineSignerPromise: Promise<any> | undefined;
  private chatProgressReadable: ReadableStreamWithState & { isClosed?: boolean } | undefined;
  private nesaClient: any;
  private offLinesigner: any;
  private signaturePayment: { [key: number]: string } = {};
  private isBrowser: boolean;
  private privateKey: string;
  private isEverRequestSession: boolean;
  private tokenPrice: number;

  constructor(options: ConfigOptions) {
    this.modelName = options?.modelName?.toLowerCase() || '';
    this.chainInfo = options.chainInfo || defaultChainInfo;
    this.lockAmount = options.lockAmount || defaultLockAmount;
    this.singlePaymentAmount = options.singlePaymentAmount || defaultSinglePaymentAmount;
    this.lowBalance = options.lowBalance || defaultLowBalance;
    this.lockAmountDenom = '';
    this.walletName = options.walletName || '';
    this.privateKey = options.privateKey || '';
    this.isEverRequestSession = false;
    this.isBrowser = typeof window !== 'undefined';
    this.isBrowser && (window.nesaSdkVersion = sdkVersion);
    this.tokenPrice = 0;
    this.initWallet();
  }

  private async initWallet(): Promise<void> {
    if (this.lastInitOfflineSignerPromise) return this.lastInitOfflineSignerPromise;
    this.lastInitOfflineSignerPromise = (async () => {
      try {
        if (this.isBrowser) {
          await this.initBrowserWallet();
        } else {
          await this.initNodeWallet();
        }
        this.getNesaClient();
      } catch (error) {
        console.error('initOfflineSigner-error: ', error);
        throw error;
      }
    })();
    return this.lastInitOfflineSignerPromise;
  }

  private async initBrowserWallet(): Promise<void> {
    if (this.walletName === 'npm:@leapwallet/metamask-cosmos-snap') {
      await suggestChain(this.chainInfo, { force: false });
      this.offLinesigner = new CosmjsOfflineSigner(this.chainInfo.chainId);
    } else if (window?.keplr) {
      await window.keplr.experimentalSuggestChain(this.chainInfo);
      await window.keplr.enable(this.chainInfo.chainId);
      this.offLinesigner = window.getOfflineSigner!(this.chainInfo.chainId);
    } else {
      throw new Error('No wallet installed, please install keplr or metamask wallet first');
    }
  }

  private async initNodeWallet(): Promise<void> {
    if (!this.privateKey) {
      throw new Error('In the node environment, please provide the privateKey');
    }
    const wallet = await DirectSecp256k1Wallet.fromKey(Buffer.from(this.privateKey, 'hex'), 'nesa');
    this.offLinesigner = wallet;
  }

  private getNesaClient() {
    if (this.lastNesaClientPromise) return this.lastNesaClientPromise;
    this.lastNesaClientPromise = new Promise((resolve, reject) => {
      WalletOperation.getNesaClient(this.chainInfo, this.offLinesigner)
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

  private getChainParams(nesaClient: any) {
    if (this.lastUserMinimumLockPromise) return this.lastUserMinimumLockPromise;
    this.lastUserMinimumLockPromise = new Promise((resolve, reject) => {
      WalletOperation.requestParams(nesaClient)
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

  private checkChainInfo() {
    return this.chainInfo?.rpc
      && this.chainInfo?.rest
      && this.chainInfo?.feeCurrencies
      && this.chainInfo?.feeCurrencies.length > 0
      && this.chainInfo?.feeCurrencies[0]?.coinMinimalDenom;
  }

  private getSignaturePayment() {
    if (this.signaturePayment[this.totalSignedPayment]) return '';
    const signaturePayment = EncryptUtils.signMessage(`${this.totalSignedPayment}${this.chainInfo.feeCurrencies[0].coinMinimalDenom}`, this.chatSeq, false);
    this.signaturePayment[this.totalSignedPayment] = signaturePayment;
    return signaturePayment;
  }

  private checkSinglePaymentAmount() {
    if (new BigNumber(this.totalSignedPayment).isLessThanOrEqualTo(this.lowBalance)) {
      this.totalSignedPayment = Number(new BigNumber(this.totalSignedPayment).plus(this.singlePaymentAmount).toFixed(0, 1));
      return this.getSignaturePayment();
    }
    if (new BigNumber(this.totalSignedPayment).minus(this.totalUsedPayment).isLessThanOrEqualTo(this.lowBalance)) {
      if (new BigNumber(this.totalSignedPayment).isLessThan(this.totalUsedPayment)) {
        this.totalSignedPayment = Number(this.totalUsedPayment);
        return this.getSignaturePayment();
      }
      if (new BigNumber(this.totalSignedPayment).plus(this.singlePaymentAmount).isLessThanOrEqualTo(this.lockAmount)) {
        this.totalSignedPayment = Number(new BigNumber(this.totalSignedPayment).plus(this.singlePaymentAmount).toFixed(0, 1));
      } else {
        this.totalSignedPayment = Number(this.lockAmount);
      }
      return this.getSignaturePayment();
    }
    return this.getSignaturePayment();
  }

  private handleWsClose(event: CloseEvent, readableStream: ReadableStreamWithState & { isClosed?: boolean }) {
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

  private handleWsError(error: any, readableStream: ReadableStreamWithState & { isClosed?: boolean }) {
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

  private closeStream(readableStream: ReadableStreamWithState & { isClosed?: boolean }) {
    if (!readableStream.isClosed) {
      readableStream.push(null); // Signal the end of the stream
      readableStream.isClosed = true; // Mark the stream as closed
    }
  }

  requestChatQueue(readableStream: ReadableStreamWithState & { isClosed?: boolean }, question: QuestionTypes) {
    this.isChatinging = true;
    this.chatSeq += 1;
    let messageTimes = 0;

    try {
      let ws: WebSocket;
      if (this.isBrowser) {
        ws = new WebSocket(this.agentUrl);
      } else {
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
            question.messages = question.messages.map((item: any) => {
              if (item.role === 'assistant') {
                item.role = this.assistantRoleName;
              }
              return item;
            });
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

      ws.onmessage = (event: any) => {
        let messageJson;
        try {
          messageJson = JSON.parse(event?.data);
          if (messageJson?.role) {
            this.assistantRoleName = messageJson.role;
          }
        } catch (error) {
          messageJson = event?.data;
        }

        if (messageTimes === 0) {
          if (messageJson === "ack") {
            this.chatProgressReadable?.push({
              code: 305,
              message: "Conducting inference",
            });
          } else {
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
        } else if (messageJson?.content?.startsWith("[DONE]")) {
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
        } else {
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
          if (new BigNumber(this.totalUsedPayment).isGreaterThan(this.lockAmount)) {
            if (!readableStream.isClosed) {
              readableStream.push({
                code: 205,
                message: '{"code":1015,"msg":"balance insufficient"}',
              });
              this.closeStream(readableStream);
            }
            ws.close();
          } else if (signedMessage) {
            const data = JSON.stringify({
              chat_seq: this.chatSeq,
              total_payment,
              signature_payment: signedMessage,
            });
            ws.send(data);
          }
        }
      };

      ws.onclose = (event: CloseEvent) => this.handleWsClose(event, readableStream);
      ws.onerror = (error: any) => this.handleWsError(error, readableStream);

    } catch (error: any) {
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
    socket.forceClose = true;
    socket.close();
  }

  requestAgentInfo(result: any, readableStream: ReadableStreamWithState & { isClosed?: boolean }) {
    if (this.lastGetAgentInfoPromise) {
      return this.lastGetAgentInfoPromise;
    }
    this.lastGetAgentInfoPromise = new Promise((resolve, reject) => {
      WalletOperation.requestAgentInfo(this.nesaClient, result?.account, this.modelName)
        .then((agentInfo: any) => {
          if (agentInfo && agentInfo?.inferenceAgent) {
            const selectAgent = agentInfo?.inferenceAgent;
            let agentWsUrl = selectAgent.url;
            let agentHeartbeatUrl = selectAgent.url;
            if (selectAgent.url?.endsWith("/")) {
              agentWsUrl = agentWsUrl + 'chat';
              agentHeartbeatUrl = agentHeartbeatUrl + 'heartbeat';
            } else {
              agentWsUrl = agentWsUrl + '/chat';
              agentHeartbeatUrl = agentHeartbeatUrl + '/heartbeat';
            }
            let firstInitHeartbeat = true;
            this.chatProgressReadable?.push({
              code: 303,
              message: "Connecting to the validator",
            });
            socket.init({
              ws_url: agentHeartbeatUrl,
              onopen: () => {
                if (firstInitHeartbeat) {
                  this.agentUrl = agentWsUrl;
                  this.isRegisterSessioning = false;
                  this.chatProgressReadable?.push({
                    code: 304,
                    message: "Waiting for query",
                  });
                  if (!readableStream.isClosed) readableStream.push(null);
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
          } else {
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

  checkSignBroadcastResult(readableStream?: ReadableStreamWithState & { isClosed?: boolean }) {
    return new Promise((resolve, reject) => {
      if (!this.nesaClient) {
        reject(new Error('Please wait for the requestSession registration result'));
      } else {
        this.nesaClient.broadcastRegisterSession()
          .then((result: any) => {
            resolve(this.requestAgentInfo(result, readableStream));
          })
          .catch((error: any) => {
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
      const readableStream = new Readable({ objectMode: true });
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
      } else if (!this.modelName) {
        reject(new Error("ModelName is null"));
      } else if (this.isRegisterSessioning) {
        reject(new Error("Registering session, please wait"));
      } else if (!this.lockAmount || new BigNumber(this.lockAmount).isNaN() || new BigNumber(this.lockAmount).isLessThan(this.singlePaymentAmount)) {
        reject(new Error("LockAmount invalid value or less than singlePaymentAmount"));
      } else {
        this.isEverRequestSession = true;
        const readableStream = new Readable({ objectMode: true });
        readableStream._read = () => { };
        resolve(readableStream);
        this.initWallet()
          .then(() => {
            this.getNesaClient()
              .then((nesaClient: any) => {
                this.nesaClient = nesaClient;
                this.getChainParams(nesaClient)
                  .then((params: any) => {
                    if (params && params?.params) {
                      this.tokenPrice = params?.params?.tokenPrice?.low;
                      if (new BigNumber(this.lockAmount).isLessThan(params?.params?.userMinimumLock?.amount)) {
                        if (!readableStream.isClosed) {
                          readableStream.push({
                            code: 311,
                            message: "LockAmount cannot be less than " + params?.params?.userMinimumLock?.amount,
                          });
                        }
                      } else {
                        WalletOperation.registerSession(nesaClient, this.modelName, this.lockAmount, params?.params?.userMinimumLock?.denom, this.chainInfo, this.offLinesigner)
                          .then((result: any) => {
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
                            } else {
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
                    } else {
                      if (!readableStream.isClosed) {
                        readableStream.push({
                          code: 314,
                          message: JSON.stringify(params),
                        });
                      }
                    }
                  })
                  .catch((error: any) => {
                    if (!readableStream.isClosed) {
                      readableStream.push({
                        code: 315,
                        message: error?.message || error.toString(),
                      });
                    }
                  });
              }).catch((error: any) => {
                if (!readableStream.isClosed) {
                  readableStream.push({
                    code: 316,
                    message: error?.message || error.toString(),
                  });
                }
              });
          }).catch((error: any) => {
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

  requestChat(question: QuestionTypes) {
    return new Promise((resolve, reject) => {
      if (!question?.model) {
        reject(new Error('Model is required'));
      } else if (this.isRegisterSessioning) {
        reject(new Error("Registering session, please wait"));
      } else if (!this.isEverRequestSession) {
        reject(new Error("Please call requestSession first to complete Session registration"));
      } else if (!this.agentUrl) {
        this.checkSignBroadcastResult()
          .then((result: any) => {
            console.log('checkSignBroadcastResult-result: ', result);
            const readableStream = new Readable({ objectMode: true });
            readableStream._read = () => { };
            resolve(readableStream);
            if (this.isChatinging) {
              this.chatQueue.push({ readableStream, question });
            } else {
              this.requestChatQueue(readableStream, question);
            }
          })
          .catch((error) => {
            reject(error);
          });
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
