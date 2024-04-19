import { ChainInfo } from "@keplr-wallet/types"
const defaultAgentUrl = "wss://agent.nesa.ai/pingws";
const defaultLockAmount = '1000'
const sdkVersion = '1.0.0'
const defaultChainInfo: ChainInfo = {
    chainId: "nesa-testnet-2",
    chainName: "Nesa Testnet dev 2",
    chainSymbolImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/chain.png",
    rpc: "http://156.249.28.51:11007",
    rest: "http://156.249.28.51:9032",
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
            coinImageUrl:
                "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/nes.png",
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "NES",
            coinMinimalDenom: "unes",
            coinDecimals: 6,
            coinGeckoId: "nesa",
            coinImageUrl:
                "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/nes.png",
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
        coinImageUrl:
            "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/nes.png",
        //@ts-ignore
        gasPriceStep: {},
        features: ["cosmwasm"],
    },
};

export { defaultAgentUrl, defaultLockAmount, defaultChainInfo, sdkVersion };