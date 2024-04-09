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
        return "You need to install Keplr extension";
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
    // coinType: 118,
    features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
});
exports.default = WalletOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0T3BlcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dhbGxldE9wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHFDQUFzQztBQUN0QywrQ0FBNEM7QUFDNUMsZ0RBQXdCO0FBRXhCLE1BQU0sZUFBZTtJQW9FbkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBaUIsRUFBRSxHQUFRO1FBQ3RELGFBQWE7UUFDYixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsYUFBYTtZQUNiLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFDekIsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUNwRCxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RCw2REFBNkQ7WUFDN0QsYUFBYTtZQUNiLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxnQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RCxNQUFNLE9BQU8sR0FBZ0IsQ0FBQyxNQUFNLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sVUFBVSxHQUFHLE1BQU0sbUJBQVUsQ0FBQyxpQkFBaUIsQ0FDbkQsR0FBRyxFQUNILGFBQWEsRUFDYixPQUFPLENBQUMsT0FBTyxFQUNmO2dCQUNFLFFBQVEsRUFBRSxtQkFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7Z0JBQzNDLGtCQUFrQixFQUFFLENBQUM7Z0JBQ3JCLG9CQUFvQixFQUFFLENBQUM7YUFDeEIsQ0FDRixD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