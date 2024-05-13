import { ChainInfo } from "@keplr-wallet/types";
interface ConfigOptions {
    modelName: string;
    lockAmount?: string;
    chainInfo?: ChainInfo;
    walletName?: string;
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
    private lastGetAgentInfoPromise;
    private nesaClient;
    private offLineigner;
    constructor(options: ConfigOptions);
    initOfflineSigner(walletName: any): Promise<void>;
    getNesaClient(): any;
    getChainParams(nesaClient: any): any;
    version(): string;
    checkChainInfo(): string | false;
    requestChatQueue(readableStream: any, question: questionTypes): void;
    requestAgentInfo(result: any): any;
    checkSignBroadcastResult(): Promise<unknown>;
    requestSession(): Promise<unknown>;
    requestChat(question: any): Promise<unknown>;
}
export default ChatClient;
