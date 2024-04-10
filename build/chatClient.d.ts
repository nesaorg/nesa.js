interface ConfigOptions {
    modelId: string;
}
declare class ChatClient {
    modelId: string;
    private chatQueue;
    private chatSeq;
    private totalPayment;
    private isChatinging;
    private isRegisterSessioning;
    private agentUrl;
    constructor(options: ConfigOptions);
    requestChatQueue(readableStream: any, question: string): void;
    requestChat(question: string): Promise<unknown>;
}
export default ChatClient;
