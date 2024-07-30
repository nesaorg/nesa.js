import { ChainInfo } from "@keplr-wallet/types";
type ReadableStreamWithState = any & {
    isClosed?: boolean;
};
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
    private chatProgressReadable;
    private nesaClient;
    private offLinesigner;
    private signaturePayment;
    private isBrowser;
    private privateKey;
    private isEverRequestSession;
    private tokenPrice;
    constructor(options: ConfigOptions);
    private initWallet;
    private initBrowserWallet;
    private initNodeWallet;
    private getNesaClient;
    private getChainParams;
    private checkChainInfo;
    private getSignaturePayment;
    private checkSinglePaymentAmount;
    private handleWsClose;
    private handleWsError;
    private closeStream;
    requestChatQueue(readableStream: ReadableStreamWithState & {
        isClosed?: boolean;
    }, question: QuestionTypes): void;
    requestCloseHeartbeat(): void;
    requestAgentInfo(result: any, readableStream: ReadableStreamWithState & {
        isClosed?: boolean;
    }): Promise<any>;
    checkSignBroadcastResult(readableStream?: ReadableStreamWithState & {
        isClosed?: boolean;
    }): Promise<unknown>;
    requestChatStatus(): Promise<unknown>;
    requestSession(): Promise<unknown>;
    requestChat(question: QuestionTypes): Promise<unknown>;
}
export default ChatClient;
