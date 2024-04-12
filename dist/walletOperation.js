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
        if (window?.keplr) {
            const { keplr } = window;
            const { chainId, rpc } = this.getTestnetChainInfo();
            await keplr.experimentalSuggestChain(this.getTestnetChainInfo());
            await keplr.enable(this.getTestnetChainInfo().chainId);
            const offlineSigner = window.getOfflineSigner(chainId);
            const account = (await offlineSigner.getAccounts())[0];
            const nesaClient = await client_1.NesaClient.connectWithSigner(rpc, offlineSigner, account.address, {
                gasPrice: stargate_1.GasPrice.fromString(`0.025${this.getTestnetChainInfo().coinMinimalDenom}`),
                estimatedBlockTime: 6,
                estimatedIndexerTime: 5,
            });
            // const result = await nesaClient.registerModel(modelName, modelVersion);
            const modelId = long_1.default.fromString("13");
            const lockBalance = {
                denom: this.getTestnetChainInfo().coinMinimalDenom,
                amount: "10",
            };
            return nesaClient.registerSession(sessionId, modelId, lockBalance, vrf);
        }
        return new Error("Keplr Wallet plugin not found");
    }
    static async registerModel(modelName, modelVersion) {
        if (window && window.keplr) {
            const { keplr } = window;
            const { chainId, rpc } = this.getTestnetChainInfo();
            await keplr.experimentalSuggestChain(this.getTestnetChainInfo());
            await keplr.enable(this.getTestnetChainInfo().chainId);
            const offlineSigner = window.getOfflineSigner(chainId);
            const account = (await offlineSigner.getAccounts())[0];
            const nesaClient = await client_1.NesaClient.connectWithSigner(rpc, offlineSigner, account.address, {
                gasPrice: stargate_1.GasPrice.fromString(`0.025${this.getTestnetChainInfo().coinMinimalDenom}`),
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
    coinMinimalDenom: "uatom",
    rpc: "https://cosmos-rpc.tpblock.io",
    rest: "https://cosmos-rest.tpblock.io",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0T3BlcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dhbGxldE9wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHFDQUFzQztBQUN0QywrQ0FBNEM7QUFDNUMsZ0RBQXdCO0FBRXhCLE1BQU0sZUFBZTtJQWdEbkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBaUIsRUFBRSxHQUFRO1FBQ3RELElBQUksTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFDekIsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUNwRCxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsZ0JBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEQsTUFBTSxPQUFPLEdBQWdCLENBQUMsTUFBTSxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRSxNQUFNLFVBQVUsR0FBRyxNQUFNLG1CQUFVLENBQUMsaUJBQWlCLENBQ25ELEdBQUcsRUFDSCxhQUFhLEVBQ2IsT0FBTyxDQUFDLE9BQU8sRUFDZjtnQkFDRSxRQUFRLEVBQUUsbUJBQVEsQ0FBQyxVQUFVLENBQzNCLFFBQVEsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FDdEQ7Z0JBQ0Qsa0JBQWtCLEVBQUUsQ0FBQztnQkFDckIsb0JBQW9CLEVBQUUsQ0FBQzthQUN4QixDQUNGLENBQUM7WUFDRiwwRUFB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