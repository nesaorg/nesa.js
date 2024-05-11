"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const stargate_1 = require("@cosmjs/stargate");
const encryptUtils_1 = __importDefault(require("./encryptUtils"));
const long_1 = __importDefault(require("long"));
class WalletOperation {
    static registerSession(modelName, lockAmount, denom, chainInfo) {
        encryptUtils_1.default.generateKey();
        return new Promise(async (resolve, reject) => {
            if (window?.keplr) {
                const { keplr } = window;
                const { chainId, rpc } = chainInfo;
                await keplr.experimentalSuggestChain(chainInfo);
                await keplr.enable(chainId);
                const offlineSigner = window.getOfflineSigner(chainId);
                const account = (await offlineSigner.getAccounts())[0];
                const nesaClient = await client_1.NesaClient.connectWithSigner(rpc, offlineSigner, account.address, {
                    gasPrice: stargate_1.GasPrice.fromString(`0.025${chainInfo.feeCurrencies[0].coinMinimalDenom}`),
                    estimatedBlockTime: 6,
                    estimatedIndexerTime: 5,
                });
                const lockBalance = { denom: denom, amount: lockAmount };
                encryptUtils_1.default.requestVrf(chainInfo).then(async (res) => {
                    if (res?.vrf && res?.sessionId) {
                        resolve(nesaClient.registerSession(res.sessionId, modelName, lockBalance, res.vrf));
                    }
                    else {
                        reject(new Error('Vrf seed is null'));
                    }
                }).catch((err) => {
                    console.log('res-err: ', err);
                    reject(err);
                });
            }
            else {
                reject(new Error("Keplr Wallet plugin not found"));
            }
        });
    }
    static requestAgentInfo(agentName, modelName, chainInfo) {
        return new Promise(async (resolve, reject) => {
            if (window?.keplr) {
                const { keplr } = window;
                const { chainId, rpc } = chainInfo;
                await keplr.experimentalSuggestChain(chainInfo);
                await keplr.enable(chainId);
                const offlineSigner = window.getOfflineSigner(chainId);
                const account = (await offlineSigner.getAccounts())[0];
                client_1.NesaClient.connectWithSigner(rpc, offlineSigner, account.address, {
                    gasPrice: stargate_1.GasPrice.fromString(`0.025${chainInfo.feeCurrencies[0].coinMinimalDenom}`),
                    estimatedBlockTime: 6,
                    estimatedIndexerTime: 5,
                }).then((client) => {
                    if (client) {
                        resolve(client.getInferenceAgent(agentName, modelName, long_1.default.fromNumber(0)));
                    }
                    else {
                        reject("Client init failed");
                    }
                }).catch((err) => {
                    reject("Client init failed: " + err?.message);
                });
            }
            else {
                reject("Keplr Wallet plugin not found");
            }
        });
    }
    static requestParams(chainInfo) {
        return new Promise(async (resolve, reject) => {
            if (window?.keplr) {
                const { keplr } = window;
                const { chainId, rpc } = chainInfo;
                await keplr.experimentalSuggestChain(chainInfo);
                await keplr.enable(chainInfo.chainId);
                const offlineSigner = window.getOfflineSigner(chainId);
                const account = (await offlineSigner.getAccounts())[0];
                client_1.NesaClient.connectWithSigner(rpc, offlineSigner, account.address, {
                    gasPrice: stargate_1.GasPrice.fromString(`0.025${chainInfo.feeCurrencies[0].coinMinimalDenom}`),
                    estimatedBlockTime: 6,
                    estimatedIndexerTime: 5,
                }).then((client) => {
                    if (client) {
                        resolve(client.getParams());
                    }
                    else {
                        reject("Client init failed");
                    }
                }).catch((err) => {
                    reject("Client init failed: " + err?.message);
                });
            }
            else {
                reject("Keplr Wallet plugin not found");
            }
        });
    }
    static requestVrfSeed(chainInfo) {
        return new Promise(async (resolve, reject) => {
            if (window?.keplr) {
                const { keplr } = window;
                const { chainId, rpc } = chainInfo;
                await keplr.experimentalSuggestChain(chainInfo);
                await keplr.enable(chainId);
                const offlineSigner = window.getOfflineSigner(chainId);
                const account = (await offlineSigner.getAccounts())[0];
                client_1.NesaClient.connectWithSigner(rpc, offlineSigner, account.address, {
                    gasPrice: stargate_1.GasPrice.fromString(`0.025${chainInfo.feeCurrencies[0].coinMinimalDenom}`),
                    estimatedBlockTime: 6,
                    estimatedIndexerTime: 5,
                }).then((client) => {
                    if (client) {
                        resolve(client.getVRFSeed(account.address));
                    }
                    else {
                        reject("Client init failed");
                    }
                }).catch((err) => {
                    reject("Client init failed: " + err?.message);
                });
            }
            else {
                reject("Keplr Wallet plugin not found");
            }
        });
    }
}
exports.default = WalletOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0T3BlcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dhbGxldE9wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHFDQUFzQztBQUN0QywrQ0FBNEM7QUFFNUMsa0VBQTBDO0FBQzFDLGdEQUF3QjtBQUV4QixNQUFNLGVBQWU7SUFDbkIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFpQixFQUFFLFVBQWtCLEVBQUUsS0FBYSxFQUFFLFNBQW9CO1FBQy9GLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLElBQUksTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO2dCQUNsQixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDO2dCQUN6QixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztnQkFDbkMsTUFBTSxLQUFLLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGdCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN4RCxNQUFNLE9BQU8sR0FBZ0IsQ0FBQyxNQUFNLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRSxNQUFNLFVBQVUsR0FBRyxNQUFNLG1CQUFVLENBQUMsaUJBQWlCLENBQ25ELEdBQUcsRUFDSCxhQUFhLEVBQ2IsT0FBTyxDQUFDLE9BQU8sRUFDZjtvQkFDRSxRQUFRLEVBQUUsbUJBQVEsQ0FBQyxVQUFVLENBQzNCLFFBQVEsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUN0RDtv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