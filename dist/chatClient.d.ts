import { ChainInfo } from "@keplr-wallet/types";
interface ConfigOptions {
    modelName: string;
    chainInfo?: ChainInfo;
    lockAmount?: string;
}
interface questionTypes {
    messages: any;
    stream?: boolean;
}
declare class ChatClient {
    modelName: string;
    chainInfo: ChainInfo;
    lockAmount: string;
    private chatQueue;
    private chatSeq;
    private totalPayment;
    private isChatinging;
    private isRegisterSessioning;
    private heartbeatConnecting;
    private agentUrl;
    constructor(options: ConfigOptions);
    version(): string;
    checkChainInfo(): string | false;
    requestChatQueue(readableStream: any, question: questionTypes): void;
    requestSession(): Promise<unknown>;
    requestChat(question: questionTypes): Promise<unknown>;
}
export default ChatClient;