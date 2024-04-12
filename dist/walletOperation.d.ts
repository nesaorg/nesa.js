declare class WalletOperation {
    static getTestnetChainInfo: () => {
        chainId: string;
        chainName: string;
        coinMinimalDenom: string;
        rpc: string;
        rest: string;
        bip44: {
            coinType: number;
        };
        bech32Config: {
            bech32PrefixAccAddr: string;
            bech32PrefixAccPub: string;
            bech32PrefixValAddr: string;
            bech32PrefixValPub: string;
            bech32PrefixConsAddr: string;
            bech32PrefixConsPub: string;
        };
        currencies: {
            coinDenom: string;
            coinMinimalDenom: string;
            coinDecimals: number;
            coinGeckoId: string;
        }[];
        feeCurrencies: {
            coinDenom: string;
            coinMinimalDenom: string;
            coinDecimals: number;
            coinGeckoId: string;
            gasPriceStep: {
                low: number;
                average: number;
                high: number;
            };
        }[];
        stakeCurrency: {
            coinDenom: string;
            coinMinimalDenom: string;
            coinDecimals: number;
            coinGeckoId: string;
        };
        features: string[];
    };
    static registerSession(sessionId: string, vrf: any): Promise<import("./client").RegisterInferenceAgentResult | Error>;
    static registerModel(modelName: string, modelVersion: string): Promise<Error>;
}
export default WalletOperation;
