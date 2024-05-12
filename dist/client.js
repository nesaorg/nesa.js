"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NesaClient = void 0;
const proto_signing_1 = require("@cosmjs/proto-signing");
const stargate_1 = require("@cosmjs/stargate");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const logger_1 = require("./logger");
const utils_1 = require("./utils");
const tx_1 = require("./codec/agent/v1/tx");
const queries_1 = require("./queries");
const tx_2 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
function nesaRegistry() {
    return new proto_signing_1.Registry([
        ...stargate_1.defaultRegistryTypes,
        ['/agent.v1.MsgUpdateParams', tx_1.MsgUpdateParams],
        ['/agent.v1.MsgRegisterModel', tx_1.MsgRegisterModel],
        ['/agent.v1.MsgRegisterInferenceAgent', tx_1.MsgRegisterInferenceAgent],
        ['/agent.v1.MsgRegisterSession', tx_1.MsgRegisterSession],
        ['/agent.v1.MsgSubmitPayment', tx_1.MsgSubmitPayment],
        ['/agent.v1.VRF', tx_1.VRF],
    ]);
}
class NesaClient {
    static async connectWithSigner(endpoint, signer, senderAddress, chainId, options) {
        const mergedOptions = {
            ...options,
            registry: nesaRegistry(),
        };
        const tmClient = await (0, tendermint_rpc_1.connectComet)(endpoint);
        const signingClient = await stargate_1.SigningStargateClient.createWithSigner(tmClient, signer, mergedOptions);
        if (!chainId) {
            chainId = await signingClient.getChainId();
        }
        return new NesaClient(signingClient, tmClient, senderAddress, chainId, options);
    }
    constructor(signingClient, tmClient, senderAddress, chainId, options) {
        this.sign = signingClient;
        this.tm = tmClient;
        this.query = stargate_1.QueryClient.withExtensions(tmClient, queries_1.setupAgentExtension);
        this.senderAddress = senderAddress;
        this.chainId = chainId;
        // this.revisionNumber = parseRevisionNumber(chainId);
        this.gasPrice = options.gasPrice;
        this.logger = options.logger ?? new logger_1.NoopLogger();
        this.estimatedBlockTime = options.estimatedBlockTime;
        this.estimatedIndexerTime = options.estimatedIndexerTime;
    }
    async updateParams(authority, params) {
        this.logger.verbose('Update Params');
        const senderAddress = this.senderAddress;
        const updateParamsMsg = {
            typeUrl: '/agent.v1.MsgUpdateParams',
            value: tx_1.MsgUpdateParams.fromPartial({
                authority,
                params
            }),
        };
        this.logger.debug('Update Params Message: ', updateParamsMsg);
        const result = await this.sign.signAndBroadcast(senderAddress, [updateParamsMsg], 'auto');
        if ((0, stargate_1.isDeliverTxFailure)(result)) {
            throw new Error((0, utils_1.createDeliverTxFailureMessage)(result));
        }
        return {
            events: result.events,
            transactionHash: result.transactionHash,
            height: result.height,
        };
    }
    async registerModel(
    // account: string,
    name, repositoryUrl) {
        this.logger.verbose(`Register Model`);
        const senderAddress = this.senderAddress;
        const registerModelMsg = {
            typeUrl: '/agent.v1.MsgRegisterModel',
            value: tx_1.MsgRegisterModel.fromPartial({
                account: senderAddress,
                name,
                repositoryUrl,
            }),
        };
        this.logger.debug('Register Model Message: ', registerModelMsg);
        const result = await this.sign.signAndBroadcast(senderAddress, [registerModelMsg], "auto");
        if ((0, stargate_1.isDeliverTxFailure)(result)) {
            throw new Error((0, utils_1.createDeliverTxFailureMessage)(result));
        }
        return {
            events: result.events,
            transactionHash: result.transactionHash,
            height: result.height,
        };
    }
    async registerInferenceAgent(
    // account: string,
    url, version, lockBalance) {
        this.logger.verbose(`Register Inference Agent`);
        const senderAddress = this.senderAddress;
        const registerInferenceAgentMsg = {
            typeUrl: '/agent.v1.MsgRegisterInferenceAgent',
            value: tx_1.MsgRegisterInferenceAgent.fromPartial({
                account: senderAddress,
                url,
                version,
                lockBalance
            }),
        };
        this.logger.debug('Register Model Message: ', registerInferenceAgentMsg);
        const result = await this.sign.signAndBroadcast(senderAddress, [registerInferenceAgentMsg], "auto");
        if ((0, stargate_1.isDeliverTxFailure)(result)) {
            throw new Error((0, utils_1.createDeliverTxFailureMessage)(result));
        }
        return {
            events: result.events,
            transactionHash: result.transactionHash,
            height: result.height
        };
    }
    async broadcastRegisterSession() {
        if (!this.signResult) {
            return new Error('Please sign first');
        }
        if (this.broadcastPromise) {
            return this.broadcastPromise;
        }
        this.broadcastPromise = new Promise((resolve, reject) => {
            this.sign.broadcastTx(Uint8Array.from(tx_2.TxRaw.encode(this.signResult).finish()))
                .then((result) => {
                if ((0, stargate_1.isDeliverTxFailure)(result)) {
                    reject(new Error((0, utils_1.createDeliverTxFailureMessage)(result)));
                }
                else {
                    resolve({
                        events: result.events,
                        transactionHash: result.transactionHash,
                        height: result.height,
                        account: tx_1.MsgRegisterSessionResponse.decode(result.msgResponses[0]?.value).account
                    });
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }
    async signRegisterSession(sessionId, modelName, fee, lockBalance, vrf) {
        this.logger.verbose(`Register Session`);
        const senderAddress = this.senderAddress;
        const registerSessionMsg = {
            typeUrl: '/agent.v1.MsgRegisterSession',
            value: tx_1.MsgRegisterSession.fromPartial({
                account: senderAddress,
                sessionId,
                modelName,
                lockBalance,
                vrf
            }),
        };
        const signResult = await this.sign.sign(senderAddress, [registerSessionMsg], fee, "");
        this.signResult = signResult;
        const hex = Buffer.from(Uint8Array.from(tx_2.TxRaw.encode(this.signResult).finish())).toString('hex');
        this.broadcastRegisterSession();
        return { transactionHash: (0, encoding_1.toHex)((0, crypto_1.sha256)(Buffer.from(hex, 'hex'))).toUpperCase() };
    }
    async registerSession(
    // account: string,
    sessionId, modelName, lockBalance, vrf) {
        this.logger.verbose(`Register Session`);
        const senderAddress = this.senderAddress;
        const registerSessionMsg = {
            typeUrl: '/agent.v1.MsgRegisterSession',
            value: tx_1.MsgRegisterSession.fromPartial({
                account: senderAddress,
                sessionId,
                modelName,
                lockBalance,
                vrf
            }),
        };
        this.logger.debug('Register Session Message: ', registerSessionMsg);
        const result = await this.sign.signAndBroadcast(senderAddress, [registerSessionMsg], "auto");
        if ((0, stargate_1.isDeliverTxFailure)(result)) {
            throw new Error((0, utils_1.createDeliverTxFailureMessage)(result));
        }
        return {
            events: result.events,
            transactionHash: result.transactionHash,
            height: result.height,
            account: tx_1.MsgRegisterSessionResponse.decode(result.msgResponses[0]?.value).account
        };
    }
    async submitPayment(
    // account: string,
    sessionId, signature, payment) {
        this.logger.verbose(`Submit Payment`);
        const senderAddress = this.senderAddress;
        const submitPaymentMsg = {
            typeUrl: '/agent.v1.MsgSubmitPayment',
            value: tx_1.MsgSubmitPayment.fromPartial({
                account: senderAddress,
                sessionId,
                signature,
                payment
            }),
        };
        this.logger.debug('Submit Payment Message: ', submitPaymentMsg);
        const result = await this.sign.signAndBroadcast(senderAddress, [submitPaymentMsg], "auto");
        if ((0, stargate_1.isDeliverTxFailure)(result)) {
            throw new Error((0, utils_1.createDeliverTxFailureMessage)(result));
        }
        return {
            events: result.events,
            transactionHash: result.transactionHash,
            height: result.height,
        };
    }
    async claimSession(
    // account: string,
    sessionId) {
        this.logger.verbose(`Claim Session`);
        const senderAddress = this.senderAddress;
        const claimSessionMsg = {
            typeUrl: '/agent.v1.MsgClaimSession',
            value: tx_1.MsgClaimSession.fromPartial({
                account: senderAddress,
                sessionId
            }),
        };
        this.logger.debug('Claim Session Message: ', claimSessionMsg);
        const result = await this.sign.signAndBroadcast(senderAddress, [claimSessionMsg], "auto");
        if ((0, stargate_1.isDeliverTxFailure)(result)) {
            throw new Error((0, utils_1.createDeliverTxFailureMessage)(result));
        }
        return {
            events: result.events,
            transactionHash: result.transactionHash,
            height: result.height,
        };
    }
    async cancelSession(
    // account: string,
    sessionId) {
        this.logger.verbose(`Cancel Session`);
        const senderAddress = this.senderAddress;
        const cancelSessionMsg = {
            typeUrl: '/agent.v1.MsgCancelSession',
            value: tx_1.MsgCancelSession.fromPartial({
                account: senderAddress,
                sessionId
            }),
        };
        this.logger.debug('Cancel Session Message: ', cancelSessionMsg);
        const result = await this.sign.signAndBroadcast(senderAddress, [cancelSessionMsg], "auto");
        if ((0, stargate_1.isDeliverTxFailure)(result)) {
            throw new Error((0, utils_1.createDeliverTxFailureMessage)(result));
        }
        return {
            events: result.events,
            transactionHash: result.transactionHash,
            height: result.height,
        };
    }
    async getModel(name) {
        const result = await this.query.agent.modelRequest(name);
        return result;
    }
    async getAllModel(key, offset, limit, countTotal, reverse) {
        const result = await this.query.agent.modelRequestAll(key, offset, limit, countTotal, reverse);
        return result;
    }
    async getParams() {
        const result = await this.query.agent.params();
        return result;
    }
    async getInferenceAgent(account, modelName, limit) {
        const result = await this.query.agent.inferenceAgentRequest(account, modelName, limit);
        return result;
    }
    async getSession(sessionId) {
        const result = await this.query.agent.sessionRequest(sessionId);
        return result;
    }
    async getSessionByAgent(account, status, limit, orderDesc, expireTime) {
        const result = await this.query.agent.sessionByAgentRequest(account, status, limit, orderDesc, expireTime);
        return result;
    }
    async getVRFSeed(account) {
        const result = await this.query.agent.VRFSeedRequest(account);
        return result;
    }
}
exports.NesaClient = NesaClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBZ0U7QUFDaEUsK0NBUTBCO0FBQzFCLDJEQUFtRTtBQUNuRSxxQ0FBOEM7QUFDOUMsbUNBQXdEO0FBQ3hELDRDQVU2QjtBQUc3Qix1Q0FBOEQ7QUFXOUQsMERBQTBEO0FBQzFELDJDQUF1QztBQUN2QywrQ0FBeUM7QUFTekMsU0FBUyxZQUFZO0lBQ25CLE9BQU8sSUFBSSx3QkFBUSxDQUFDO1FBQ2xCLEdBQUcsK0JBQW9CO1FBQ3ZCLENBQUMsMkJBQTJCLEVBQUUsb0JBQWUsQ0FBQztRQUM5QyxDQUFDLDRCQUE0QixFQUFFLHFCQUFnQixDQUFDO1FBQ2hELENBQUMscUNBQXFDLEVBQUUsOEJBQXlCLENBQUM7UUFDbEUsQ0FBQyw4QkFBOEIsRUFBRSx1QkFBa0IsQ0FBQztRQUNwRCxDQUFDLDRCQUE0QixFQUFFLHFCQUFnQixDQUFDO1FBQ2hELENBQUMsZUFBZSxFQUFFLFFBQUcsQ0FBQztLQUN2QixDQUFDLENBQUE7QUFDSixDQUFDO0FBZUQsTUFBYSxVQUFVO0lBZ0JkLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQ25DLFFBQWdCLEVBQ2hCLE1BQXFCLEVBQ3JCLGFBQXFCLEVBQ3JCLE9BQTJCLEVBQzNCLE9BQTBCO1FBRTFCLE1BQU0sYUFBYSxHQUFHO1lBQ3BCLEdBQUcsT0FBTztZQUNWLFFBQVEsRUFBRSxZQUFZLEVBQUU7U0FDekIsQ0FBQztRQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBQSw2QkFBWSxFQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sYUFBYSxHQUFHLE1BQU0sZ0NBQXFCLENBQUMsZ0JBQWdCLENBQ2hFLFFBQVEsRUFDUixNQUFNLEVBQ04sYUFBYSxDQUNkLENBQUM7UUFDRixJQUFHLENBQUMsT0FBTyxFQUFDLENBQUM7WUFDWCxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDN0MsQ0FBQztRQUNELE9BQU8sSUFBSSxVQUFVLENBQ25CLGFBQWEsRUFDYixRQUFRLEVBQ1IsYUFBYSxFQUNiLE9BQU8sRUFDUCxPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRCxZQUNFLGFBQW9DLEVBQ3BDLFFBQXFCLEVBQ3JCLGFBQXFCLEVBQ3JCLE9BQWUsRUFDZixPQUEwQjtRQUUxQixJQUFJLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztRQUMxQixJQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFXLENBQUMsY0FBYyxDQUNyQyxRQUFRLEVBQ1IsNkJBQW1CLENBQ3BCLENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixzREFBc0Q7UUFFdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLG1CQUFVLEVBQUUsQ0FBQztRQUNqRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1FBQ3JELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUM7SUFDM0QsQ0FBQztJQUVNLEtBQUssQ0FBQyxZQUFZLENBQ3ZCLFNBQWlCLEVBQ2pCLE1BQWM7UUFFZCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyQyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3pDLE1BQU0sZUFBZSxHQUFHO1lBQ3RCLE9BQU8sRUFBRSwyQkFBMkI7WUFDcEMsS0FBSyxFQUFFLG9CQUFlLENBQUMsV0FBVyxDQUFDO2dCQUNqQyxTQUFTO2dCQUNULE1BQU07YUFDUCxDQUFDO1NBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzlELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FDN0MsYUFBYSxFQUNiLENBQUMsZUFBZSxDQUFDLEVBQ2pCLE1BQU0sQ0FDUCxDQUFDO1FBQ0YsSUFBRyxJQUFBLDZCQUFrQixFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUM7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFBLHFDQUE2QixFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUNELE9BQU87WUFDTCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsZUFBZSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1lBQ3ZDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtTQUN0QixDQUFDO0lBQ0osQ0FBQztJQUVNLEtBQUssQ0FBQyxhQUFhO0lBQ3hCLG1CQUFtQjtJQUNuQixJQUFZLEVBQ1osYUFBcUI7UUFFckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN0QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3pDLE1BQU0sZ0JBQWdCLEdBQUc7WUFDdkIsT0FBTyxFQUFFLDRCQUE0QjtZQUNyQyxLQUFLLEVBQUUscUJBQWdCLENBQUMsV0FBVyxDQUFDO2dCQUNsQyxPQUFPLEVBQUUsYUFBYTtnQkFDdEIsSUFBSTtnQkFDSixhQUFhO2FBQ2QsQ0FBQztTQUNILENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FDN0MsYUFBYSxFQUNiLENBQUMsZ0JBQWdCLENBQUMsRUFDbEIsTUFBTSxDQUNQLENBQUM7UUFDRixJQUFHLElBQUEsNkJBQWtCLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQztZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLElBQUEscUNBQTZCLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBRUQsT0FBTztZQUNMLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixlQUFlLEVBQUUsTUFBTSxDQUFDLGVBQWU7WUFDdkMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1NBQ3RCLENBQUM7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLHNCQUFzQjtJQUNqQyxtQkFBbUI7SUFDbkIsR0FBVyxFQUNYLE9BQWEsRUFDYixXQUFrQjtRQUVsQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDekMsTUFBTSx5QkFBeUIsR0FBRztZQUNoQyxPQUFPLEVBQUUscUNBQXFDO1lBQzlDLEtBQUssRUFBRSw4QkFBeUIsQ0FBQyxXQUFXLENBQUM7Z0JBQzNDLE9BQU8sRUFBRSxhQUFhO2dCQUN0QixHQUFHO2dCQUNILE9BQU87Z0JBQ1AsV0FBVzthQUNaLENBQUM7U0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQUN6RSxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQzdDLGFBQWEsRUFDYixDQUFDLHlCQUF5QixDQUFDLEVBQzNCLE1BQU0sQ0FDUCxDQUFDO1FBQ0YsSUFBRyxJQUFBLDZCQUFrQixFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUM7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFBLHFDQUE2QixFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUVELE9BQU87WUFDTCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsZUFBZSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1lBQ3ZDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtTQUN0QixDQUFDO0lBQ0osQ0FBQztJQUVNLEtBQUssQ0FBQyx3QkFBd0I7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNyQixPQUFPLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUE7UUFDOUIsQ0FBQztRQUNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7aUJBQzNFLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNmLElBQUksSUFBQSw2QkFBa0IsRUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDO29CQUMvQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBQSxxQ0FBNkIsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzFELENBQUM7cUJBQU0sQ0FBQztvQkFDTixPQUFPLENBQUM7d0JBQ04sTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO3dCQUNyQixlQUFlLEVBQUUsTUFBTSxDQUFDLGVBQWU7d0JBQ3ZDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTt3QkFDckIsT0FBTyxFQUFFLCtCQUEwQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU87cUJBQ2xGLENBQUMsQ0FBQTtnQkFDSixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNmLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLG1CQUFtQixDQUM5QixTQUFpQixFQUNqQixTQUFpQixFQUNqQixHQUFXLEVBQ1gsV0FBa0IsRUFDbEIsR0FBUztRQUVULElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN6QyxNQUFNLGtCQUFrQixHQUFHO1lBQ3pCLE9BQU8sRUFBRSw4QkFBOEI7WUFDdkMsS0FBSyxFQUFFLHVCQUFrQixDQUFDLFdBQVcsQ0FBQztnQkFDcEMsT0FBTyxFQUFFLGFBQWE7Z0JBQ3RCLFNBQVM7Z0JBQ1QsU0FBUztnQkFDVCxXQUFXO2dCQUNYLEdBQUc7YUFDSixDQUFDO1NBQ0gsQ0FBQztRQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ3JDLGFBQWEsRUFDYixDQUFDLGtCQUFrQixDQUFDLEVBQ3BCLEdBQUcsRUFDSCxFQUFFLENBQ0gsQ0FBQTtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFBO1FBQzVCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2hHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFBO1FBQy9CLE9BQU8sRUFBRSxlQUFlLEVBQUUsSUFBQSxnQkFBSyxFQUFDLElBQUEsZUFBTSxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFBO0lBQ2xGLENBQUM7SUFFTSxLQUFLLENBQUMsZUFBZTtJQUMxQixtQkFBbUI7SUFDbkIsU0FBaUIsRUFDakIsU0FBaUIsRUFDakIsV0FBa0IsRUFDbEIsR0FBUztRQUVULElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN6QyxNQUFNLGtCQUFrQixHQUFHO1lBQ3pCLE9BQU8sRUFBRSw4QkFBOEI7WUFDdkMsS0FBSyxFQUFFLHVCQUFrQixDQUFDLFdBQVcsQ0FBQztnQkFDcEMsT0FBTyxFQUFFLGFBQWE7Z0JBQ3RCLFNBQVM7Z0JBQ1QsU0FBUztnQkFDVCxXQUFXO2dCQUNYLEdBQUc7YUFDSixDQUFDO1NBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDcEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUM3QyxhQUFhLEVBQ2IsQ0FBQyxrQkFBa0IsQ0FBQyxFQUNwQixNQUFNLENBQ1AsQ0FBQztRQUNGLElBQUcsSUFBQSw2QkFBa0IsRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBQSxxQ0FBNkIsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFFRCxPQUFPO1lBQ0wsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLGVBQWUsRUFBRSxNQUFNLENBQUMsZUFBZTtZQUN2QyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsT0FBTyxFQUFFLCtCQUEwQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU87U0FDbEYsQ0FBQztJQUNKLENBQUM7SUFFTSxLQUFLLENBQUMsYUFBYTtJQUN4QixtQkFBbUI7SUFDbkIsU0FBaUIsRUFDakIsU0FBcUIsRUFDckIsT0FBaUI7UUFFakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN0QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3pDLE1BQU0sZ0JBQWdCLEdBQUc7WUFDdkIsT0FBTyxFQUFFLDRCQUE0QjtZQUNyQyxLQUFLLEVBQUUscUJBQWdCLENBQUMsV0FBVyxDQUFDO2dCQUNsQyxPQUFPLEVBQUUsYUFBYTtnQkFDdEIsU0FBUztnQkFDVCxTQUFTO2dCQUNULE9BQU87YUFDUixDQUFDO1NBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDBCQUEwQixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDaEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUM3QyxhQUFhLEVBQ2IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUNsQixNQUFNLENBQ1AsQ0FBQztRQUNGLElBQUcsSUFBQSw2QkFBa0IsRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBQSxxQ0FBNkIsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFFRCxPQUFPO1lBQ0wsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLGVBQWUsRUFBRSxNQUFNLENBQUMsZUFBZTtZQUN2QyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07U0FDdEIsQ0FBQztJQUNKLENBQUM7SUFFTSxLQUFLLENBQUMsWUFBWTtJQUN2QixtQkFBbUI7SUFDbkIsU0FBaUI7UUFFakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN6QyxNQUFNLGVBQWUsR0FBRztZQUN0QixPQUFPLEVBQUUsMkJBQTJCO1lBQ3BDLEtBQUssRUFBRSxvQkFBZSxDQUFDLFdBQVcsQ0FBQztnQkFDakMsT0FBTyxFQUFFLGFBQWE7Z0JBQ3RCLFNBQVM7YUFDVixDQUFDO1NBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzlELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FDN0MsYUFBYSxFQUNiLENBQUMsZUFBZSxDQUFDLEVBQ2pCLE1BQU0sQ0FDUCxDQUFDO1FBQ0YsSUFBRyxJQUFBLDZCQUFrQixFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUM7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFBLHFDQUE2QixFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUVELE9BQU87WUFDTCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsZUFBZSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1lBQ3ZDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtTQUN0QixDQUFDO0lBQ0osQ0FBQztJQUVNLEtBQUssQ0FBQyxhQUFhO0lBQ3hCLG1CQUFtQjtJQUNuQixTQUFpQjtRQUVqQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDekMsTUFBTSxnQkFBZ0IsR0FBRztZQUN2QixPQUFPLEVBQUUsNEJBQTRCO1lBQ3JDLEtBQUssRUFBRSxxQkFBZ0IsQ0FBQyxXQUFXLENBQUM7Z0JBQ2xDLE9BQU8sRUFBRSxhQUFhO2dCQUN0QixTQUFTO2FBQ1YsQ0FBQztTQUNILENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FDN0MsYUFBYSxFQUNiLENBQUMsZ0JBQWdCLENBQUMsRUFDbEIsTUFBTSxDQUNQLENBQUM7UUFDRixJQUFHLElBQUEsNkJBQWtCLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQztZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLElBQUEscUNBQTZCLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBRUQsT0FBTztZQUNMLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixlQUFlLEVBQUUsTUFBTSxDQUFDLGVBQWU7WUFDdkMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1NBQ3RCLENBQUM7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFZO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQWUsRUFBRSxNQUFZLEVBQUUsS0FBVyxFQUFFLFVBQW1CLEVBQUUsT0FBZ0I7UUFDeEcsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQy9GLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxLQUFLLENBQUMsU0FBUztRQUNwQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9DLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBZSxFQUFFLFNBQWlCLEVBQUUsS0FBVztRQUM1RSxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkYsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBaUI7UUFDdkMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEUsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsTUFBcUIsRUFBRSxLQUFXLEVBQUUsU0FBa0IsRUFBRSxVQUFpQjtRQUN2SCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMzRyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFlO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQWpZRCxnQ0FpWUMifQ==