"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const stargate_1 = require("@cosmjs/stargate");
const long_1 = __importDefault(require("long"));
class WalletOperation {
    static async registerSession(sessionId, vrf) {
        // @ts-ignore
        if (window && window.keplr) {
            // @ts-ignore
            const { keplr } = window;
            const { chainId, rpc } = this.getTestnetChainInfo();
            await keplr.experimentalSuggestChain(this.getTestnetChainInfo());
            await keplr.enable(this.getTestnetChainInfo().chainId);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const offlineSigner = window.getOfflineSigner(chainId);
            const account = (await offlineSigner.getAccounts())[0];
            const nesaClient = await client_1.NesaClient.connectWithSigner(rpc, offlineSigner, account.address, {
                gasPrice: stargate_1.GasPrice.fromString("0.025uatom"),
                estimatedBlockTime: 6,
                estimatedIndexerTime: 5,
            });
            // const result = await nesaClient.registerModel(modelName, modelVersion);
            const modelId = long_1.default.fromString("13");
            const lockBalance = {
                denom: "uatom",
                amount: "10",
            };
            return nesaClient.registerSession(sessionId, modelId, lockBalance, vrf);
        }
        return new Error("Keplr Wallet plugin not found");
    }
    static async registerModel(modelName, modelVersion) {
        // @ts-ignore
        if (window && window.keplr) {
            // @ts-ignore
            const { keplr } = window;
            const { chainId, rpc } = this.getTestnetChainInfo();
            await keplr.experimentalSuggestChain(this.getTestnetChainInfo());
            await keplr.enable(this.getTestnetChainInfo().chainId);
            // @ts-ignore
            const offlineSigner = window.getOfflineSigner(chainId);
            const account = (await offlineSigner.getAccounts())[0];
            const nesaClient = await client_1.NesaClient.connectWithSigner(rpc, offlineSigner, account.address, {
                gasPrice: stargate_1.GasPrice.fromString("0.025uatom"),
                estimatedBlockTime: 6,
                estimatedIndexerTime: 5,
            });
            await nesaClient.registerModel(modelName, modelVersion);
        }
        return new Error("Keplr Wallet plugin not found");
    }
}
WalletOperation.getTestnetChainInfo = () => ({
    chainId: "theta-testnet-001",
    chainName: "theta-testnet-001",
    rpc: "http://47.238.190.19:11007",
    rest: "http://47.238.190.19:9032",
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmospub",
        bech32PrefixValAddr: "cosmosvaloper",
        bech32PrefixValPub: "cosmosvaloperpub",
        bech32PrefixConsAddr: "cosmosvalcons",
        bech32PrefixConsPub: "cosmosvalconspub",
    },
    currencies: [
        {
            coinDenom: "ATOM",
            coinMinimalDenom: "uatom",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
        },
        {
            coinDenom: "THETA",
            coinMinimalDenom: "theta",
            coinDecimals: 0,
        },
        {
            coinDenom: "LAMBDA",
            coinMinimalDenom: "lambda",
            coinDecimals: 0,
        },
        {
            coinDenom: "RHO",
            coinMinimalDenom: "rho",
            coinDecimals: 0,
        },
        {
            coinDenom: "EPSILON",
            coinMinimalDenom: "epsilon",
            coinDecimals: 0,
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "ATOM",
            coinMinimalDenom: "uatom",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
            gasPriceStep: {
                low: 1,
                average: 1,
                high: 1,
            },
        },
    ],
    stakeCurrency: {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinGeckoId: "cosmos",
    },
    features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
});
exports.default = WalletOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0T3BlcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dhbGxldE9wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHFDQUFzQztBQUN0QywrQ0FBNEM7QUFDNUMsZ0RBQXdCO0FBRXhCLE1BQU0sZUFBZTtJQW1FbkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBaUIsRUFBRSxHQUFRO1FBQ3RELGFBQWE7UUFDYixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsYUFBYTtZQUNiLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFDekIsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUNwRCxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RCw2REFBNkQ7WUFDN0QsYUFBYTtZQUNiLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxnQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RCxNQUFNLE9BQU8sR0FBZ0IsQ0FBQyxNQUFNLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sVUFBVSxHQUFHLE1BQU0sbUJBQVUsQ0FBQyxpQkFBaUIsQ0FDbkQsR0FBRyxFQUNILGFBQWEsRUFDYixPQUFPLENBQUMsT0FBTyxFQUNmO2dCQUNFLFFBQVEsRUFBRSxtQkFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7Z0JBQzNDLGtCQUFrQixFQUFFLENBQUM7Z0JBQ3JCLG9CQUFvQixFQUFFLENBQUM7YUFDeEIsQ0FDRixD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