import ChatClient from "./chatClient";

class NesaSdk {
  public modelId: string;

  constructor(modelId: string) {
    this.modelId = modelId;
  }

  getConfig() {
    return {
      modelId: this.modelId,
    };
  }
}

export { ChatClient };
export default NesaSdk;
