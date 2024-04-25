"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const stargate_1 = require("@cosmjs/stargate");
const default_config_1 = require("./default.config");
const encryptUtils_1 = __importDefault(require("./encryptUtils"));
const long_1 = __importDefault(require("long"));
class WalletOperation {
    static registerSession(modelName, lockAmount, denom, chainInfo) {
        encryptUtils_1.default.generateKey();
        return new Promise(async (resolve, reject) => {
            let selectChainInfo = default_config_1.defaultChainInfo;
            if (chainInfo) {
                if (chainInfo?.rpc
                    && chainInfo?.rest
                    && chainInfo?.feeCurrencies
                    && chainInfo?.feeCurrencies.length > 0
                    && chainInfo?.feeCurrencies[0]?.coinMinimalDenom) {
                    selectChainInfo = chainInfo;
                }
                else {
                    reject("Invalid chainInfo, you must provide rpc, rest, feeCurrencies, feeCurrencies");
                }
            }
            if (window?.keplr) {
                const { keplr } = window;
                const { chainId, rpc } = selectChainInfo;
                await keplr.experimentalSuggestChain(selectChainInfo);
                await keplr.enable(selectChainInfo.chainId);
                const offlineSigner = window.getOfflineSigner(chainId);
                const account = (await offlineSigner.getAccounts())[0];
                const nesaClient = await client_1.NesaClient.connectWithSigner(rpc, offlineSigner, account.address, {
                    gasPrice: stargate_1.GasPrice.fromString(`0.025${selectChainInfo.feeCurrencies[0].coinMinimalDenom}`),
                    estimatedBlockTime: 6,
                    estimatedIndexerTime: 5,
                });
                const lockBalance = { denom: denom, amount: lockAmount };
                encryptUtils_1.default.requestVrf().then(async (res) => {
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
            let selectChainInfo = default_config_1.defaultChainInfo;
            if (chainInfo) {
                if (chainInfo?.feeCurrencies[0]?.coinMinimalDenom) {
                    selectChainInfo = chainInfo;
                }
                else {
                    reject("Invalid chainInfo, you must provide feeCurrencies");
                }
            }
            else {
                selectChainInfo = default_config_1.defaultChainInfo;
            }
            if (window?.keplr) {
                const { keplr } = window;
                const { chainId, rpc } = selectChainInfo;
                await keplr.experimentalSuggestChain(selectChainInfo);
                await keplr.enable(selectChainInfo.chainId);
                const offlineSigner = window.getOfflineSigner(chainId);
                const account = (await offlineSigner.getAccounts())[0];
                client_1.NesaClient.connectWithSigner(rpc, offlineSigner, account.address, {
                    gasPrice: stargate_1.GasPrice.fromString(`0.025${selectChainInfo.feeCurrencies[0].coinMinimalDenom}`),
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
            let selectChainInfo = default_config_1.defaultChainInfo;
            if (chainInfo) {
                if (chainInfo?.feeCurrencies[0]?.coinMinimalDenom) {
                    selectChainInfo = chainInfo;
                }
                else {
                    reject("Invalid chainInfo, you must provide feeCurrencies");
                }
            }
            else {
                selectChainInfo = default_config_1.defaultChainInfo;
            }
            if (window?.keplr) {
                const { keplr } = window;
                const { chainId, rpc } = selectChainInfo;
                await keplr.experimentalSuggestChain(selectChainInfo);
                await keplr.enable(selectChainInfo.chainId);
                const offlineSigner = window.getOfflineSigner(chainId);
                const account = (await offlineSigner.getAccounts())[0];
                client_1.NesaClient.connectWithSigner(rpc, offlineSigner, account.address, {
                    gasPrice: stargate_1.GasPrice.fromString(`0.025${selectChainInfo.feeCurrencies[0].coinMinimalDenom}`),
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
            let selectChainInfo = default_config_1.defaultChainInfo;
            if (chainInfo) {
                if (chainInfo?.feeCurrencies[0]?.coinMinimalDenom) {
                    selectChainInfo = chainInfo;
                }
                else {
                    reject("Invalid chainInfo, you must provide feeCurrencies");
                }
            }
            else {
                selectChainInfo = default_config_1.defaultChainInfo;
            }
            if (window?.keplr) {
                const { keplr } = window;
                const { chainId, rpc } = selectChainInfo;
                await keplr.experimentalSuggestChain(selectChainInfo);
                await keplr.enable(selectChainInfo.chainId);
                const offlineSigner = window.getOfflineSigner(chainId);
                const account = (await offlineSigner.getAccounts())[0];
                client_1.NesaClient.connectWithSigner(rpc, offlineSigner, account.address, {
                    gasPrice: stargate_1.GasPrice.fromString(`0.025${selectChainInfo.feeCurrencies[0].coinMinimalDenom}`),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0T3BlcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dhbGxldE9wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHFDQUFzQztBQUN0QywrQ0FBNEM7QUFFNUMscURBQW9EO0FBQ3BELGtFQUEwQztBQUMxQyxnREFBd0I7QUFFeEIsTUFBTSxlQUFlO0lBQ25CLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBaUIsRUFBRSxVQUFrQixFQUFFLEtBQWEsRUFBRSxTQUFxQjtRQUNoRyxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzNCLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxJQUFJLGVBQWUsR0FBRyxpQ0FBZ0IsQ0FBQztZQUN2QyxJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUNkLElBQUksU0FBUyxFQUFFLEdBQUc7dUJBQ2IsU0FBUyxFQUFFLElBQUk7dUJBQ2YsU0FBUyxFQUFFLGFBQWE7dUJBQ3hCLFNBQVMsRUFBRSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUM7dUJBQ25DLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDbkQsZUFBZSxHQUFHLFNBQVMsQ0FBQTtnQkFDN0IsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE1BQU0sQ0FBQyw2RUFBNkUsQ0FBQyxDQUFDO2dCQUN4RixDQUFDO1lBQ0gsQ0FBQztZQUNELElBQUksTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO2dCQUNsQixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDO2dCQUN6QixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLGVBQWUsQ0FBQztnQkFDekMsTUFBTSxLQUFLLENBQUMsd0JBQXdCLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sS0FBSyxDQUFDLE1BQU0s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