import { ChainInfo } from "@keplr-wallet/types";
interface ConfigOptions {
    modelName: string;
    lockAmount?: string;
    chainInfo?: ChainInfo;
    walletName?: string;
    singlePaymentAmount?: string;
    lowBalance?: string;
    privateKey?: string;
}
interface questionTypes {
    messages: any;
    model: string;
    stream?: boolean;
    frequency_penalty?: any;
    presence_penalty?: any;
    temperature?: any;
    top_p?: any;
}
declare class ChatClient {
    modelName: string;
    chainInfo: ChainInfo;
    lockAmount: string;
    singlePaymentAmount: string;
    lowBalance: string;
    lockAmountDenom: string;
    private walletName;
    private chatQueue;
    private chatSeq;
    private totalUsedPayment;
    private totalSignedPayment;
    private isChatinging;
    private isRegisterSessioning;
    private agentUrl;
    private assistantRoleName;
    private lastNesaClientPromise;
    private lastUserMinimumLockPromise;
    private lastGetAgentInfoPromise;
    private lastInitOfflineSignerPromise;
    private nesaClient;
    private offLinesigner;
    private signaturePayment;
    private isBrowser;
    private privateKey;
    private isEverRequestSession;
    private tokenPrice;
    constructor(options: ConfigOptions);
    initWallet(): any;
    getNesaClient(): any;
    getChainParams(nesaClient: any): any;
    version(): string;
    checkChainInfo(): string | false;
    getSignaturePayment(): any;
    checkSinglePaymentAmount(): any;
    requestChatQueue(readableStream: any, question: questionTypes): void;
    requestCloseHeartbeat(): void;
    requestAgentInfo(result: any, readableStream: any): any;
    checkSignBroadcastResult(readableStream?: any, sessionId?: string): Promise<unknown>;
    requestSession(): Promise<unknown>;
    requestChat(question: questionTypes): Promise<unknown>;
}
export default ChatClient;
