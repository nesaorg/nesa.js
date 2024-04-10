/// <reference types="long" />
import { OfflineSigner } from "@cosmjs/proto-signing";
import { SigningStargateClient, SigningStargateClientOptions, GasPrice, Event, QueryClient } from "@cosmjs/stargate";
import { CometClient } from "@cosmjs/tendermint-rpc";
import { Logger } from './logger';
import { VRF } from './proto/agent/v1/tx';
import { Payment } from "./proto/agent/v1/genesis";
import { Coin } from "./proto/cosmos/base/v1beta1/coin";
import { AgentExtension } from './queries';
import { QueryModelAllResponse, QueryModelResponse, QueryParamsResponse, QueryInferenceAgentResponse, QuerySessionResponse } from "./proto/agent/v1/query";
export type NesaClientOptions = SigningStargateClientOptions & {
    logger?: Logger;
    gasPrice: GasPrice;
    estimatedBlockTime: number;
    estimatedIndexerTime: number;
};
export interface MsgResult {
    readonly events: readonly Event[];
    /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
    readonly transactionHash: string;
    /** block height where this transaction was committed - only set if we send 'block' mode */
    readonly height: number;
}
export type RegisterModelResult = MsgResult & {
    readonly modelId: number;
};
export type RegisterInferenceAgentResult = MsgResult & {
    readonly agentId: number;
};
export type RegisterSessionResult = MsgResult & {
    readonly agentId: number;
};
export declare class NesaClient {
    readonly gasPrice: GasPrice;
    readonly sign: SigningStargateClient;
    readonly query: QueryClient & AgentExtension;
    readonly tm: CometClient;
    readonly senderAddress: string;
    readonly logger: Logger;
    readonly chainId: string;
    readonly estimatedBlockTime: number;
    readonly estimatedIndexerTime: number;
    static connectWithSigner(endpoint: string, signer: OfflineSigner, senderAddress: string, options: NesaClientOptions): Promise<NesaClient>;
    private constructor();
    registerModel(name: string, version: string): Promise<RegisterModelResult>;
    registerInferenceAgent(modelId: Long, url: string): Promise<RegisterInferenceAgentResult>;
    registerSession(sessionId: string, modelId: Long, lockBalance?: Coin, vrf?: VRF): Promise<RegisterInferenceAgentResult>;
    submitPayment(sessionId: string, signature: Uint8Array, payment?: Payment): Promise<MsgResult>;
    getModel(modelId: Long): Promise<QueryModelResponse>;
    getAllModel(key: Uint8Array, offset: Long, limit: Long, countTotal: boolean, reverse: boolean): Promise<QueryModelAllResponse>;
    getParams(): Promise<QueryParamsResponse>;
    getInferenceAgent(agentId: Long): Promise<QueryInferenceAgentResponse>;
    getSession(sessionId: string): Promise<QuerySessionResponse>;
}
