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
    static async connectWithSigner(endpoint, signer, senderAddress, options) {
        const mergedOptions = {
            ...options,
            registry: nesaRegistry(),
        };
        const signingClient = await stargate_1.SigningStargateClient.connectWithSigner(endpoint, signer, mergedOptions);
        const tmClient = await (0, tendermint_rpc_1.connectComet)(endpoint);
        const chainId = await signingClient.getChainId();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBZ0U7QUFDaEUsK0NBUTBCO0FBQzFCLDJEQUFtRTtBQUNuRSxxQ0FBOEM7QUFDOUMsbUNBQXdEO0FBQ3hELDRDQVU2QjtBQUc3Qix1Q0FBOEQ7QUFrQjlELFNBQVMsWUFBWTtJQUNuQixPQUFPLElBQUksd0JBQVEsQ0FBQztRQUNsQixHQUFHLCtCQUFvQjtRQUN2QixDQUFDLDJCQUEyQixFQUFFLG9CQUFlLENBQUM7UUFDOUMsQ0FBQyw0QkFBNEIsRUFBRSxxQkFBZ0IsQ0FBQztRQUNoRCxDQUFDLHFDQUFxQyxFQUFFLDhCQUF5QixDQUFDO1FBQ2xFLENBQUMsOEJBQThCLEVBQUUsdUJBQWtCLENBQUM7UUFDcEQsQ0FBQyw0QkFBNEIsRUFBRSxxQkFBZ0IsQ0FBQztRQUNoRCxDQUFDLGVBQWUsRUFBRSxRQUFHLENBQUM7S0FDdkIsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQWVELE1BQWEsVUFBVTtJQWNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQ25DLFFBQWdCLEVBQ2hCLE1BQXFCLEVBQ3JCLGFBQXFCLEVBQ3JCLE9BQTBCO1FBRTFCLE1BQU0sYUFBYSxHQUFHO1lBQ3BCLEdBQUcsT0FBTztZQUNWLFFBQVEsRUFBRSxZQUFZLEVBQUU7U0FDekIsQ0FBQztRQUNGLE1BQU0sYUFBYSxHQUFHLE1BQU0sZ0NBQXFCLENBQUMsaUJBQWlCLENBQ2pFLFFBQVEsRUFDUixNQUFNLEVBQ04sYUFBYSxDQUNkLENBQUM7UUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUEsNkJBQVksRUFBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxNQUFNLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqRCxPQUFPLElBQUksVUFBVSxDQUNuQixhQUFhLEVBQ2IsUUFBUSxFQUNSLGFBQWEs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