import { OfflineSigner, Registry } from "@cosmjs/proto-signing";
import {
  defaultRegistryTypes as defaultStargateTypes,
  SigningStargateClient,
  SigningStargateClientOptions,
  GasPrice,
  isDeliverTxFailure,
  Event,
  QueryClient
} from "@cosmjs/stargate";
import { CometClient, connectComet } from "@cosmjs/tendermint-rpc";
import { Logger, NoopLogger } from './logger';
import { createDeliverTxFailureMessage } from './utils';
import {
  MsgRegisterModel,
  MsgRegisterModelResponse,
  MsgRegisterInferenceAgent,
  MsgRegisterInferenceAgentResponse,
  MsgRegisterSession,
  MsgRegisterSessionResponse,
  MsgSubmitPayment,
  VRF,
} from './proto/agent/v1/tx';
import { Payment } from "./proto/agent/v1/genesis";
import { Coin } from "./proto/cosmos/base/v1beta1/coin";
import {AgentExtension, setupAgentExtension} from './queries';
import {
  QueryModelAllResponse,
  QueryModelResponse,
  QueryParamsResponse,
  QueryInferenceAgentResponse,
  QuerySessionResponse,
} from "./proto/agent/v1/query";

export type NesaClientOptions = SigningStargateClientOptions & {
  logger?: Logger;
  gasPrice: GasPrice;
  estimatedBlockTime: number;
  estimatedIndexerTime: number;
};

function nesaRegistry(): Registry {
  return new Registry([
    ...defaultStargateTypes,
    ['/agent.v1.MsgRegisterModel', MsgRegisterModel],
    ['/agent.v1.MsgRegisterInferenceAgent', MsgRegisterInferenceAgent],
    ['/agent.v1.MsgRegisterSession', MsgRegisterSession],
    ['/agent.v1.MsgSubmitPayment', MsgSubmitPayment],
    ['/agent.v1.VRF', VRF],
  ])
}

/// This is the default message result with no extra data
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
}

export class NesaClient{
  public readonly gasPrice: GasPrice;
  public readonly sign: SigningStargateClient;
  public readonly query: QueryClient &
    AgentExtension;
  public readonly tm: CometClient;
  public readonly senderAddress: string;
  public readonly logger: Logger;

  public readonly chainId: string;
  // public readonly revisionNumber: Long;
  public readonly estimatedBlockTime: number;
  public readonly estimatedIndexerTime: number;

  public static async connectWithSigner(
    endpoint: string,
    signer: OfflineSigner,
    senderAddress: string,
    options: NesaClientOptions
  ): Promise<NesaClient> {
    const mergedOptions = {
      ...options,
      registry: nesaRegistry(),
    };
    const signingClient = await SigningStargateClient.connectWithSigner(
      endpoint,
      signer,
      mergedOptions
    );
    const tmClient = await connectComet(endpoint);
    const chainId = await signingClient.getChainId();
    return new NesaClient(
      signingClient,
      tmClient,
      senderAddress,
      chainId,
      options
    );
  }

  private constructor(
    signingClient: SigningStargateClient,
    tmClient: CometClient,
    senderAddress: string,
    chainId: string,
    options: NesaClientOptions
  ){
    this.sign = signingClient;
    this.tm = tmClient;
    this.query = QueryClient.withExtensions(
      tmClient,
      setupAgentExtension
    );
    this.senderAddress = senderAddress;
    this.chainId = chainId;
    // this.revisionNumber = parseRevisionNumber(chainId);

    this.gasPrice = options.gasPrice;
    this.logger = options.logger ?? new NoopLogger();
    this.estimatedBlockTime = options.estimatedBlockTime;
    this.estimatedIndexerTime = options.estimatedIndexerTime;
  }

  public async registerModel(
    // account: string,
    name: string,
    version: string,
  ): Promise<RegisterModelResult> {
    this.logger.verbose(`Register Model`);
    const senderAddress = this.senderAddress;
    const registerModelMsg = {
      typeUrl: '/agent.v1.MsgRegisterModel',
      value: MsgRegisterModel.fromPartial({
        account: senderAddress,
        name,
        version,
      }),
    };
    this.logger.debug('Register Model Message: ', registerModelMsg);
    const result = await this.sign.signAndBroadcast(
      senderAddress,
      [registerModelMsg],
      "auto"
    );
    if(isDeliverTxFailure(result)){
      throw new Error(createDeliverTxFailureMessage(result));
    }

    return {
      events: result.events,
      transactionHash: result.transactionHash,
      height: result.height,
      modelId: Number(MsgRegisterModelResponse.decode(result.msgResponses[0]?.value).modelId)
    };
  }

  public async registerInferenceAgent(
    // account: string,
    modelId: Long,
    url: string,
  ): Promise<RegisterInferenceAgentResult> {
    this.logger.verbose(`Register Inference Agent`);
    const senderAddress = this.senderAddress;
    const registerInferenceAgentMsg = {
      typeUrl: '/agent.v1.MsgRegisterInferenceAgent',
      value: MsgRegisterInferenceAgent.fromPartial({
        account: senderAddress,
        modelId,
        url,
      }),
    };
    this.logger.debug('Register Model Message: ', registerInferenceAgentMsg);
    const result = await this.sign.signAndBroadcast(
      senderAddress,
      [registerInferenceAgentMsg],
      "auto"
    );
    if(isDeliverTxFailure(result)){
      throw new Error(createDeliverTxFailureMessage(result));
    }

    return {
      events: result.events,
      transactionHash: result.transactionHash,
      height: result.height,
      agentId: Number(MsgRegisterInferenceAgentResponse.decode(result.msgResponses[0]?.value).agentId)
    };
  }

  public async registerSession(
    // account: string,
    sessionId: string,
    modelId: Long,
    lockBalance?: Coin,
    vrf?: VRF,
  ): Promise<RegisterInferenceAgentResult> {
    this.logger.verbose(`Register Session`);
    const senderAddress = this.senderAddress;
    const registerSessionMsg = {
      typeUrl: '/agent.v1.MsgRegisterSession',
      value: MsgRegisterSession.fromPartial({
        account: senderAddress,
        sessionId,
        modelId,
        lockBalance,
        vrf
      }),
    };
    this.logger.debug('Register Session Message: ', registerSessionMsg);
    const result = await this.sign.signAndBroadcast(
      senderAddress,
      [registerSessionMsg],
      "auto"
    );
    if(isDeliverTxFailure(result)){
      throw new Error(createDeliverTxFailureMessage(result));
    }

    return {
      events: result.events,
      transactionHash: result.transactionHash,
      height: result.height,
      agentId: Number(MsgRegisterSessionResponse.decode(result.msgResponses[0]?.value).agentId)
    };
  }

  public async submitPayment(
    // account: string,
    sessionId: string,
    signature: Uint8Array,
    payment?: Payment,
  ): Promise<MsgResult> {
    this.logger.verbose(`Submit Payment`);
    const senderAddress = this.senderAddress;
    const submitPaymentMsg = {
      typeUrl: '/agent.v1.MsgSubmitPayment',
      value: MsgSubmitPayment.fromPartial({
        account: senderAddress,
        sessionId,
        signature,
        payment
      }),
    };
    this.logger.debug('Submit Payment Message: ', submitPaymentMsg);
    const result = await this.sign.signAndBroadcast(
      senderAddress,
      [submitPaymentMsg],
      "auto"
    );
    if(isDeliverTxFailure(result)){
      throw new Error(createDeliverTxFailureMessage(result));
    }

    return {
      events: result.events,
      transactionHash: result.transactionHash,
      height: result.height,
    };
  }

  public async getModel(modelId: Long): Promise<QueryModelResponse> {
    const result = await this.query.agent.modelRequest(modelId);
    return result;
  }

  public async getAllModel(key: Uint8Array, offset: Long, limit: Long, countTotal: boolean, reverse: boolean): Promise<QueryModelAllResponse> {
    const result = await this.query.agent.modelRequestAll(key, offset, limit, countTotal, reverse);
    return result;
  }

  public async getParams(): Promise<QueryParamsResponse> {
    const result = await this.query.agent.params();
    return result;
  }

  public async getInferenceAgent(agentId: Long): Promise<QueryInferenceAgentResponse> {
    const result = await this.query.agent.inferenceAgentRequest(agentId);
    return result;
  }

  public async getSession(sessionId: string): Promise<QuerySessionResponse> {
    const result = await this.query.agent.sessionRequest(sessionId);
    return result;
  }
}