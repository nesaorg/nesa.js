import { ChainInfo } from "@keplr-wallet/types";
interface ConfigOptions {
    modelName: string;
    lockAmount?: string;
    chainInfo?: ChainInfo;
    walletName?: string;
    singlePaymentAmount?: string;
    lowBalance?: string;
}
interface questionTypes {
    messages: any;
    stream?: boolean;
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
    constructor(options: ConfigOptions);
    initOfflineSigner(): any;
    getNesaClient(): any;
    getChainParams(nesaClient: any): any;
    version(): string;
    checkChainInfo(): string | false;
    getSignaturePayment(): any;
    checkSinglePaymentAmount(): any;
    requestChatQueue(readableStream: any, question: questionTypes): void;
    requestAgentInfo(result: any): any;
    checkSignBroadcastResult(): Promise<unknown>;
    requestSession(): Promise<unknown>;
    requestChat(question: any): Promise<unknown>;
}
export default ChatClient;
