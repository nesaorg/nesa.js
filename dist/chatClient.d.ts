import { ChainInfo } from "@keplr-wallet/types";
interface ConfigOptions {
    modelName: string;
    lockAmount?: string;
    chainInfo?: ChainInfo;
}
interface questionTypes {
    messages: any;
    stream?: boolean;
}
declare class ChatClient {
    modelName: string;
    chainInfo: ChainInfo;
    lockAmount: string;
    lockAmountDenom: string;
    private chatQueue;
    private chatSeq;
    private totalPayment;
    private isChatinging;
    private isRegisterSessioning;
    private agentUrl;
    private assistantRoleName;
    private lastNesaClientPromise;
    private lastUserMinimumLockPromise;
    constructor(options: ConfigOptions);
    getNesaClient(): any;
    getChainParams(nesaClient: any): any;
    version(): string;
    checkChainInfo(): string | false;
    requestChatQueue(readableStream: any, question: questionTypes): void;
    requestSession(): Promise<unknown>;
    requestChat(question: any): Promise<unknown>;
}
export default ChatClient;
