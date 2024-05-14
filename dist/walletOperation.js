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
    static getNesaClient(chainInfo, offlineSigner) {
        return new Promise(async (resolve, reject) => {
            if (offlineSigner) {
                const { chainId, rpc } = chainInfo;
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
                reject(new Error("No wallet installed, please install keplr or metamask wallet first"));
            }
        });
    }
    static registerSession(client, modelName, lockAmount, denom, chainInfo, offlineSigner) {
        encryptUtils_1.default.generateKey();
        return new Promise(async (resolve, reject) => {
            const lockBalance = { denom: denom, amount: lockAmount };
            encryptUtils_1.default.requestVrf(client, chainInfo, offlineSigner).then(async (res) => {
                const fee = {
                    amount: [{ denom: chainInfo.feeCurrencies[0].coinMinimalDenom, amount: "0" }],
                    gas: "100000",
                };
                if (res?.vrf && res?.sessionId) {
                    resolve(client.signRegisterSession(res.sessionId, modelName, fee, lockBalance, res.vrf));
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
    static requestVrfSeed(client, chainInfo, offlineSigner) {
        return new Promise(async (resolve) => {
            const { chainId } = chainInfo;
            console.log('chainId', chainId);
            const account = (await offlineSigner.getAccounts())[0];
            resolve(client.getVRFSeed(account.address));
        });
    }
}
exports.default = WalletOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0T3BlcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dhbGxldE9wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHFDQUFzQztBQUN0QywrQ0FBNEM7QUFFNUMsa0VBQTBDO0FBQzFDLGdEQUF3QjtBQUV4QixNQUFNLGVBQWU7SUFDbkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFvQixFQUFFLGFBQWtCO1FBQzNELE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxJQUFJLGFBQWEsRUFBRSxDQUFDO2dCQUNsQixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztnQkFDbkMsTUFBTSxPQUFPLEdBQWdCLENBQUMsTUFBTSxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEUsbUJBQVUsQ0FBQyxpQkFBaUIsQ0FDMUIsR0FBRyxFQUNILGFBQWEsRUFDYixPQUFPLENBQUMsT0FBTyxFQUNmLE9BQU8sRUFDUDtvQkFDRSxRQUFRLEVBQUUsbUJBQVEsQ0FBQyxVQUFVLENBQzNCLFFBQVEsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUN0RDtvQkFDRCxrQkFBa0IsRUFBRSxDQUFDO29CQUNyQixvQkFBb0IsRUFBRSxDQUFDO2lCQUN4QixDQUNGLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ2hCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDakIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDZixDQUFDLENBQUMsQ0FBQTtZQUNKLENBQUM7aUJBQU0sQ0FBQztnQkFDTixNQUFNLENBQUMsSUFB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