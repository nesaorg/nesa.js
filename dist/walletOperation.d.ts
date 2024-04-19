import { ChainInfo } from "@keplr-wallet/types";
declare class WalletOperation {
    static registerSession(modelName: string, lockAmount: string, chainInfo?: ChainInfo): Promise<any>;
    static requestAgentInfo(agentName: string, chainInfo?: ChainInfo): Promise<any>;
    static requestAllModel(chainInfo?: ChainInfo, offset?: number, limit?: number, reverse?: boolean): Promise<any>;
    static requestVrfSeed(chainInfo?: ChainInfo): Promise<any>;
}
export default WalletOperation;
