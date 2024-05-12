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
  MsgUpdateParams,
  MsgRegisterModel,
  MsgRegisterInferenceAgent,
  MsgRegisterSession,
  MsgRegisterSessionResponse,
  MsgSubmitPayment,
  VRF,
  MsgClaimSession,
  MsgCancelSession
} from './codec/agent/v1/tx';
import { Payment, Params, SessionStatus } from "./codec/agent/v1/agent";
import { Coin } from "./codec/cosmos/base/v1beta1/coin";
import {AgentExtension, setupAgentExtension} from './queries';
import {
  QueryModelAllResponse,
  QueryModelResponse,
  QueryParamsResponse,
  QueryInferenceAgentResponse,
  QuerySessionResponse,
  QuerySessionByAgentResponse,
  QueryVRFSeedResponse
} from "./codec/agent/v1/query";
import { StdFee } from "@cosmjs/amino";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { sha256 } from '@cosmjs/crypto'
import { toHex } from "@cosmjs/encoding";

export type NesaClientOptions = SigningStargateClientOptions & {
  logger?: Logger;
  gasPrice: GasPrice;
  estimatedBlockTime: number;
  estimatedIndexerTime: number;
};

function nesaRegistry(): Registry {
  return new Registry([
    ...defaultStargateTypes,
    ['/agent.v1.MsgUpdateParams', MsgUpdateParams],
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

export type RegisterSessionResult = MsgResult & {
  readonly account: string;
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
  private broadcastPromise: any
  private signResult: any

  public static async connectWithSigner(
    endpoint: string,
    signer: OfflineSigner,
    senderAddress: string,
    chainId: string | undefined,
    options: NesaClientOptions
  ): Promise<NesaClient> {
    const mergedOptions = {
      ...options,
      registry: nesaRegistry(),
    };
    const tmClient = await connectComet(endpoint);
    const signingClient = await SigningStargateClient.createWithSigner(
      tmClient,
      signer,
      mergedOptions
    );
    if(!chainId){
      chainId = await signingClient.getChainId();
    }
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

  public async updateParams(
    authority: string,
    params: Params
  ): Promise<MsgResult> {
    this.logger.verbose('Update Params');
    const senderAddress = this.senderAddress;
    const updateParamsMsg = {
      typeUrl: '/agent.v1.MsgUpdateParams',
      value: MsgUpdateParams.fromPartial({
        authority,
        params
      }),
    };
    this.logger.debug('Update Params Message: ', updateParamsMsg);
    const result = await this.sign.signAndBroadcast(
      senderAddress,
      [updateParamsMsg],
      'auto'
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

  public async registerModel(
    // account: string,
    name: string,
    repositoryUrl: string,
  ): Promise<MsgResult> {
    this.logger.verbose(`Register Model`);
    const senderAddress = this.senderAddress;
    const registerModelMsg = {
      typeUrl: '/agent.v1.MsgRegisterModel',
      value: MsgRegisterModel.fromPartial({
        account: senderAddress,
        name,
        repositoryUrl,
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
    };
  }

  public async registerInferenceAgent(
    // account: string,
    url: string,
    version: Long,
    lockBalance?: Coin,
  ): Promise<MsgResult> {
    this.logger.verbose(`Register Inference Agent`);
    const senderAddress = this.senderAddress;
    const registerInferenceAgentMsg = {
      typeUrl: '/agent.v1.MsgRegisterInferenceAgent',
      value: MsgRegisterInferenceAgent.fromPartial({
        account: senderAddress,
        url,
        version,
        lockBalance
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
      height: result.height
    };
  }

  public async broadcastRegisterSession() {
    if (!this.signResult) {
      return new Error('Please sign first')
    }
    if (this.broadcastPromise) {
      return this.broadcastPromise
    }
    this.broadcastPromise = new Promise((resolve, reject) => {
      this.sign.broadcastTx(Uint8Array.from(TxRaw.encode(this.signResult).finish()))
        .then((result) => {
          if (isDeliverTxFailure(result)) {
            reject(new Error(createDeliverTxFailureMessage(result)))
          } else {
            resolve({
              events: result.events,
              transactionHash: result.transactionHash,
              height: result.height,
              account: MsgRegisterSessionResponse.decode(result.msgResponses[0]?.value).account
            })
          }
        }).catch((error) => {
          reject(error)
        })
    })
  }

  public async signRegisterSession(
    sessionId: string,
    modelName: string,
    fee: StdFee,
    lockBalance?: Coin,
    vrf?: VRF,
  ): Promise<any> {
    this.logger.verbose(`Register Session`);
    const senderAddress = this.senderAddress;
    const registerSessionMsg = {
      typeUrl: '/agent.v1.MsgRegisterSession',
      value: MsgRegisterSession.fromPartial({
        account: senderAddress,
        sessionId,
        modelName,
        lockBalance,
        vrf
      }),
    };
    const signResult = await this.sign.sign(
      senderAddress,
      [registerSessionMsg],
      fee,
      ""
    )
    this.signResult = signResult
    const hex = Buffer.from(Uint8Array.from(TxRaw.encode(this.signResult).finish())).toString('hex')
    this.broadcastRegisterSession()
    return { transactionHash: toHex(sha256(Buffer.from(hex, 'hex'))).toUpperCase() }
  }

  public async registerSession(
    // account: string,
    sessionId: string,
    modelName: string,
    lockBalance?: Coin,
    vrf?: VRF,
  ): Promise<RegisterSessionResult> {
    this.logger.verbose(`Register Session`);
    const senderAddress = this.senderAddress;
    const registerSessionMsg = {
      typeUrl: '/agent.v1.MsgRegisterSession',
      value: MsgRegisterSession.fromPartial({
        account: senderAddress,
        sessionId,
        modelName,
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
      account: MsgRegisterSessionResponse.decode(result.msgResponses[0]?.value).account
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

  public async claimSession(
    // account: string,
    sessionId: string,
  ): Promise<MsgResult> {
    this.logger.verbose(`Claim Session`);
    const senderAddress = this.senderAddress;
    const claimSessionMsg = {
      typeUrl: '/agent.v1.MsgClaimSession',
      value: MsgClaimSession.fromPartial({
        account: senderAddress,
        sessionId
      }),
    };
    this.logger.debug('Claim Session Message: ', claimSessionMsg);
    const result = await this.sign.signAndBroadcast(
      senderAddress,
      [claimSessionMsg],
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

  public async cancelSession(
    // account: string,
    sessionId: string,
  ): Promise<MsgResult> {
    this.logger.verbose(`Cancel Session`);
    const senderAddress = this.senderAddress;
    const cancelSessionMsg = {
      typeUrl: '/agent.v1.MsgCancelSession',
      value: MsgCancelSession.fromPartial({
        account: senderAddress,
        sessionId
      }),
    };
    this.logger.debug('Cancel Session Message: ', cancelSessionMsg);
    const result = await this.sign.signAndBroadcast(
      senderAddress,
      [cancelSessionMsg],
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

  public async getModel(name: string): Promise<QueryModelResponse> {
    const result = await this.query.agent.modelRequest(name);
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

  public async getInferenceAgent(account: string, modelName: string, limit: Long): Promise<QueryInferenceAgentResponse> {
    const result = await this.query.agent.inferenceAgentRequest(account, modelName, limit);
    return result;
  }

  public async getSession(sessionId: string): Promise<QuerySessionResponse> {
    const result = await this.query.agent.sessionRequest(sessionId);
    return result;
  }

  public async getSessionByAgent(account: string, status: SessionStatus, limit: Long, orderDesc: boolean, expireTime?: Date): Promise<QuerySessionByAgentResponse> {
    const result = await this.query.agent.sessionByAgentRequest(account, status, limit, orderDesc, expireTime);
    return result;
  }

  public async getVRFSeed(account: string): Promise<QueryVRFSeedResponse> {
    const result = await this.query.agent.VRFSeedRequest(account);
    return result;
  }
}
