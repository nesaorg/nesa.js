interface ConfigOptions {
    modelId: string;
}
declare class ChatSDK {
    modelId: string;
    constructor(options: ConfigOptions);
    private chatQueue;
    private isChatinging;
    private chatSeq;
    private totalPayment;
    private isRegisterSessioning;
    private agentUrl;
    getConfig(): {
        modelId: string;
    };
    requestChatQueue(readableStream: any, question: string): void;
    requestChat(question: string): Promise<unknown>;
}
export default ChatSDK;
