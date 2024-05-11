/// <reference types="long" />
import { OfflineSigner } from "@cosmjs/proto-signing";
import { SigningStargateClient, SigningStargateClientOptions, GasPrice, Event, QueryClient } from "@cosmjs/stargate";
import { CometClient } from "@cosmjs/tendermint-rpc";
import { Logger } from './logger';
import { VRF } from './codec/agent/v1/tx';
import { Payment, Params, SessionStatus } from "./codec/agent/v1/agent";
import { Coin } from "./codec/cosmos/base/v1beta1/coin";
import { AgentExtension } from './queries';
import { QueryModelAllResponse, QueryModelResponse, QueryParamsResponse, QueryInferenceAgentResponse, QuerySessionResponse, QuerySessionByAgentResponse, QueryVRFSeedResponse } from "./codec/agent/v1/query";
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
export type RegisterSessionResult = MsgResult & {
    readonly account: string;
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
    static connectWithSigner(endpoint: string, signer: OfflineSigner, senderAddress: string, chainId: string | undefined, options: NesaClientOptions): Promise<NesaClient>;
    private constructor();
    updateParams(authority: string, params: Params): Promise<MsgResult>;
    registerModel(name: string, repositoryUrl: string): Promise<MsgResult>;
    registerInferenceAgent(url: string, version: Long, lockBalance?: Coin): Promise<MsgResult>;
    registerSession(sessionId: string, modelName: string, lockBalance?: Coin, vrf?: VRF): Promise<RegisterSessionResult>;
    submitPayment(sessionId: string, signature: Uint8Array, payment?: Payment): Promise<MsgResult>;
    claimSession(sessionId: string): Promise<MsgResult>;
    cancelSession(sessionId: string): Promise<MsgResult>;
    getModel(name: string): Promise<QueryModelResponse>;
    getAllModel(key: Uint8Array, offset: Long, limit: Long, countTotal: boolean, reverse: boolean): Promise<QueryModelAllResponse>;
    getParams(): Promise<QueryParamsResponse>;
    getInferenceAgent(account: string, modelName: string, limit: Long): Promise<QueryInferenceAgentResponse>;
    getSession(sessionId: string): Promise<QuerySessionResponse>;
    getSessionByAgent(account: string, status: SessionStatus, limit: Long, orderDesc: boolean, expireTime?: Date): Promise<QuerySessionByAgentResponse>;
    getVRFSeed(account: string): Promise<QueryVRFSeedResponse>;
}
