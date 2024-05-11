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
                client_1.NesaClient.connectWithSigner(rpc, offlineSigner, account.address, chainId, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0T3BlcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dhbGxldE9wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHFDQUFzQztBQUN0QywrQ0FBNEM7QUFFNUMsa0VBQTBDO0FBQzFDLGdEQUF3QjtBQUV4QixNQUFNLGVBQWU7SUFDbkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFvQjtRQUN2QyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0JBQ2xCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUM7Z0JBQ3pCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO2dCQUNuQyxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsZ0JBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3hELE1BQU0sT0FBTyxHQUFnQixDQUFDLE1BQU0sYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLG1CQUFVLENBQUMsaUJBQWlCLENBQzFCLEdBQUcsRUFDSCxhQUFhLEVBQ2IsT0FBTyxDQUFDLE9BQU8sRUFDZixPQUFPLEVBQ1A7b0JBQ0UsUUFBUSxFQUFFLG1CQUFRLENBQUMsVUFBVSxDQUMzQixRQUFRLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FDdEQ7b0JBQ0Qsa0JBQWtCLEVBQUUsQ0FBQztvQkFDckIsb0JBQW9CLEVBQUUsQ0FBQztpQkFDeEIsQ0FDRixDQUFDLElBQUksQ0FBQyxD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