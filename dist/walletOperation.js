"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const stargate_1 = require("@cosmjs/stargate");
const long_1 = __importDefault(require("long"));
const default_config_1 = require("./default.config");
const encryptUtils_1 = __importDefault(require("./encryptUtils"));
class WalletOperation {
    static registerSession(modelName, lockAmount, chainInfo) {
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
                const lockBalance = {
                    denom: selectChainInfo.feeCurrencies[0].coinMinimalDenom,
                    amount: lockAmount,
                };
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
    static requestAgentInfo(agentName, chainInfo) {
        console.log('agentId: ', agentName);
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
                console.log('account: ', account);
                client_1.NesaClient.connectWithSigner(rpc, offlineSigner, account.address, {
                    gasPrice: stargate_1.GasPrice.fromString(`0.025${selectChainInfo.feeCurrencies[0].coinMinimalDenom}`),
                    estimatedBlockTime: 6,
                    estimatedIndexerTime: 5,
                }).then((client) => {
                    console.log('nesaClient: ', client);
                    if (client) {
                        const encoder = new TextEncoder();
                        console.log('encoder.encode: ', encoder.encode('0'));
                        console.log('e1ncoder.encode: ', encoder.encode(''));
                        resolve(client.getInferenceAgent(agentName));
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
    static requestAllModel(chainInfo, offset, limit, reverse) {
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
                    console.log('nesaClient: ', client);
                    if (client) {
                        const encoder = new TextEncoder();
                        client.getAllModel(encoder.encode(''), long_1.default.fromNumber(offset || 0), long_1.default.fromNumber(limit || 0), true, !!reverse)
                            .then((res) => { resolve(res); })
                            .catch((err) => { reject(err); });
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
                console.log('account: ', account);
                client_1.NesaClient.connectWithSigner(rpc, offlineSigner, account.address, {
                    gasPrice: stargate_1.GasPrice.fromString(`0.025${selectChainInfo.feeCurrencies[0].coinMinimalDenom}`),
                    estimatedBlockTime: 6,
                    estimatedIndexerTime: 5,
                }).then((client) => {
                    console.log('nesaClient: ', client);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0T3BlcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dhbGxldE9wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHFDQUFzQztBQUN0QywrQ0FBNEM7QUFDNUMsZ0RBQXdCO0FBRXhCLHFEQUFvRDtBQUNwRCxrRUFBMEM7QUFFMUMsTUFBTSxlQUFlO0lBQ25CLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBaUIsRUFBRSxVQUFrQixFQUFFLFNBQXFCO1FBQ2pGLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLElBQUksZUFBZSxHQUFHLGlDQUFnQixDQUFDO1lBQ3ZDLElBQUksU0FBUyxFQUFFLENBQUM7Z0JBQ2QsSUFBSSxTQUFTLEVBQUUsR0FBRzt1QkFDYixTQUFTLEVBQUUsSUFBSTt1QkFDZixTQUFTLEVBQUUsYUFBYTt1QkFDeEIsU0FBUyxFQUFFLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQzt1QkFDbkMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO29CQUNuRCxlQUFlLEdBQUcsU0FBUyxDQUFBO2dCQUM3QixDQUFDO3FCQUFNLENBQUM7b0JBQ04sTUFBTSxDQUFDLDZFQUE2RSxDQUFDLENBQUM7Z0JBQ3hGLENBQUM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0JBQ2xCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUM7Z0JBQ3pCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsZUFBZSxDQUFDO2dCQUN6QyxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDdEQsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUs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