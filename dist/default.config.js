"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sdkVersion = exports.defaultChainInfo = exports.defaultLockAmount = exports.defaultAgentUrl = void 0;
const defaultAgentUrl = "wss://agent.nesa.ai/pingws";
exports.defaultAgentUrl = defaultAgentUrl;
const defaultLockAmount = '1000';
exports.defaultLockAmount = defaultLockAmount;
const sdkVersion = '1.0.0';
exports.sdkVersion = sdkVersion;
const defaultChainInfo = {
    chainId: "nesa-testnet-2",
    chainName: "Nesa Testnet dev 2",
    chainSymbolImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/chain.png",
    rpc: "https://cosmos-rpc.tpblock.io",
    rest: "https://cosmos-rest.tpblock.io",
    nodeProvider: {
        name: "Nesa",
        email: "dev@nesa.ai",
        website: "https://nesa.ai/",
    },
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "nesa",
        bech32PrefixAccPub: "nesa" + "pub",
        bech32PrefixValAddr: "nesa" + "valoper",
        bech32PrefixValPub: "nesa" + "valoperpub",
        bech32PrefixConsAddr: "nesa" + "valcons",
        bech32PrefixConsPub: "nesa" + "valconspub",
    },
    currencies: [
        {
            coinDenom: "NES",
            coinMinimalDenom: "unes",
            coinDecimals: 6,
            coinGeckoId: "nesa",
            coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/nes.png",
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "NES",
            coinMinimalDenom: "unes",
            coinDecimals: 6,
            coinGeckoId: "nesa",
            coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/nes.png",
            gasPriceStep: {
                low: 0.01,
                average: 0.02,
                high: 0.1,
            },
        },
    ],
    stakeCurrency: {
        coinDenom: "NES",
        coinMinimalDenom: "unes",
        coinDecimals: 6,
        coinGeckoId: "nesa",
        coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/nes.png",
        //@ts-ignore
        gasPriceStep: {},
        features: ["cosmwasm"],
    },
};
exports.defaultChainInfo = defaultChainInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGVmYXVsdC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsTUFBTSxlQUFlLEdBQUcsNEJBQTRCLENBQUM7QUFpRTVDLDBDQUFlO0FBaEV4QixNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQTtBQWdFTiw4Q0FBaUI7QUEvRDNDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQTtBQStEcUMsZ0NBQVU7QUE5RHpFLE1BQU0sZ0JBQWdCLEdBQWM7SUFDaEMsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QixTQUFTLEVBQUUsb0JBQW9CO0lBQy9CLG1CQUFtQixFQUNmLDhGQUE4RjtJQUNsRyxHQUFHLEVBQUUsK0JBQStCO0lBQ3BDLElBQUksRUFBRSxnQ0FBZ0M7SUFDdEMsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLE1BQU07UUFDWixLQUFLLEVBQUUsYUFBYTtRQUNwQixPQUFPLEVBQUUsa0JBQWtCO0tBQzlCO0lBRUQsS0FBSyxFQUFFO1FBQ0gsUUFBUSxFQUFFLEdBQUc7S0FDaEI7SUFDRCxZQUFZLEVBQUU7UUFDVixtQkFBbUIsRUFBRSxNQUFNO1FBQzNCLGtCQUFrQixFQUFFLE1BQU0sR0FBRyxLQUFLO1FBQ2xDLG1CQUFtQixFQUFFLE1BQU0sR0FBRyxTQUFTO1FBQ3ZDLGtCQUFrQixFQUFFLE1BQU0sR0FBRyxZQUFZO1FBQ3pDLG9CQUFvQixFQUFFLE1BQU0sR0FBRyxTQUFTO1FBQ3hDLG1CQUFtQixFQUFFLE1BQU0sR0FBRyxZQUFZO0tBQzdDO0lBQ0QsVUFBVSxFQUFFO1FBQ1I7WUFDSSxTQUFTLEVBQUUsS0FBSztZQUNoQixnQkFBZ0IsRUFBRSxNQUFNO1lBQ3hCLFlBQVksRUFBRSxDQUFDO1lBQ2YsV0FBVyxFQUFFLE1BQU07WUFDbkIsWUFBWSxFQUNSLDRGQUE0RjtTQUNuRztLQUNKO0lBQ0QsYUFBYSxFQUFFO1FBQ1g7WUFDSSxTQUFTLEVBQUUsS0FBSztZQUNoQixnQkFBZ0IsRUFBRSxNQUFNO1lBQ3hCLFlBQVksRUFBRSxDQUFDO1lBQ2YsV0FBVyxFQUFFLE1BQU07WUFDbkIsWUFBWSxFQUNSLDRGQUE0RjtZQUNoRyxZQUFZLEVBQUU7Z0JBQ1YsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsSUFBSSxFQUFFLEdBQUc7YUFDWjtTQUNKO0tBQ0o7SUFDRCxhQUFhLEVBQUU7UUFDWCxTQUFTLEVBQUUsS0FBSztRQUNoQixnQkFBZ0IsRUFBRSxNQUFNO1FBQ3hCLFlBQVksRUFBRSxDQUFDO1FBQ2YsV0FBVyxFQUFFLE1BQU07UUFDbkIsWUFBWSxFQUNSLDRGQUE0RjtRQUNoRyxZQUFZO1FBQ1osWUFBWSxFQUFFLEVBQUU7UUFDaEIsUUFBUSxFQUFFLENBQUMsVUFBVSxDQUFDO0tBQ3pCO0NBQ0osQ0FBQztBQUUyQyw0Q0FBZ0IifQ==