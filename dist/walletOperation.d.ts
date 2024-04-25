import { ChainInfo } from "@keplr-wallet/types";
declare class WalletOperation {
    static registerSession(modelName: string, lockAmount: string, denom: string, chainInfo?: ChainInfo): Promise<any>;
    static requestAgentInfo(agentName: string, modelName: string, chainInfo?: ChainInfo): Promise<any>;
    static requestParams(chainInfo?: ChainInfo): Promise<any>;
    static requestVrfSeed(chainInfo?: ChainInfo): Promise<any>;
}
export default WalletOperation;
