import ChatClient from "./chatClient";
declare class NesaSdk {
    modelId: string;
    constructor(modelId: string);
    getConfig(): {
        modelId: string;
    };
}
export { ChatClient };
export default NesaSdk;
