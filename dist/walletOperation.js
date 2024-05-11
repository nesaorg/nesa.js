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
    static getNesaClient(chainInfo) {
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
                    resolve(client);
                }).catch((error) => {
                    reject(error);
                });
            }
            else {
                reject(new Error("Keplr Wallet plugin not found"));
            }
        });
    }
    static registerSession(client, modelName, lockAmount, denom, chainInfo) {
        encryptUtils_1.default.generateKey();
        return new Promise(async (resolve, reject) => {
            const lockBalance = { denom: denom, amount: lockAmount };
            encryptUtils_1.default.requestVrf(client, chainInfo).then(async (res) => {
                if (res?.vrf && res?.sessionId) {
                    resolve(client.registerSession(res.sessionId, modelName, lockBalance, res.vrf));
                }
                else {
                    reject(new Error('Vrf seed is null'));
                }
            });
        });
    }
    static requestAgentInfo(client, agentName, modelName) {
        return new Promise(async (resolve, reject) => {
            if (window?.keplr) {
                if (client) {
                    resolve(client.getInferenceAgent(agentName, modelName, long_1.default.fromNumber(0)));
                }
                else {
                    reject("Client init failed");
                }
            }
            else {
                reject("Keplr Wallet plugin not found");
            }
        });
    }
    static requestParams(client) {
        return new Promise(async (resolve, reject) => {
            if (window?.keplr) {
                if (client) {
                    resolve(client.getParams());
                }
                else {
                    reject("Client init failed");
                }
            }
            else {
                reject("Keplr Wallet plugin not found");
            }
        });
    }
    static requestVrfSeed(client, chainInfo) {
        return new Promise(async (resolve, reject) => {
            if (window?.keplr) {
                const { keplr } = window;
                const { chainId } = chainInfo;
                await keplr.experimentalSuggestChain(chainInfo);
                await keplr.enable(chainId);
                const offlineSigner = window.getOfflineSigner(chainId);
                const account = (await offlineSigner.getAccounts())[0];
                resolve(client.getVRFSeed(account.address));
            }
            else {
                reject("Keplr Wallet plugin not found");
            }
        });
    }
}
exports.default = WalletOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0T3BlcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dhbGxldE9wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHFDQUFzQztBQUN0QywrQ0FBNEM7QUFFNUMsa0VBQTBDO0FBQzFDLGdEQUF3QjtBQUV4QixNQUFNLGVBQWU7SUFDbkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFvQjtRQUN2QyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0JBQ2xCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUM7Z0JBQ3pCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO2dCQUNuQyxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsZ0JBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3hELE1BQU0sT0FBTyxHQUFnQixDQUFDLE1BQU0sYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLG1CQUFVLENBQUMsaUJBQWlCLENBQzFCLEdBQUcsRUFDSCxhQUFhLEVBQ2IsT0FBTyxDQUFDLE9BQU8sRUFDZjtvQkFDRSxRQUFRLEVBQUUsbUJBQVEsQ0FBQyxVQUFVLENBQzNCLFFBQVEsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUN0RDtvQkFDRCxrQkFBa0IsRUFBRSxDQUFDO29CQUNyQixvQkFBb0IsRUFBRSxDQUFDO2lCQUN4QixDQUNGLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxF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