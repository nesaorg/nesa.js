import { AccountData } from "@cosmjs/proto-signing";
import { NesaClient } from "./client";
import { GasPrice } from "@cosmjs/stargate";
import long from "long";

class WalletOperation {
  static getTestnetChainInfo = () => ({
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

  static async registerSession(sessionId: string, vrf: any) {
    // @ts-ignore
    if (window && window.keplr) {
      // @ts-ignore
      const { keplr } = window;
      const { chainId, rpc } = this.getTestnetChainInfo();
      await keplr.experimentalSuggestChain(this.getTestnetChainInfo());
      await keplr.enable(this.getTestnetChainInfo().chainId);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const offlineSigner = window.getOfflineSigner!(chainId);
      const account: AccountData = (await offlineSigner.getAccounts())[0];
      const nesaClient = await NesaClient.connectWithSigner(
        rpc,
        offlineSigner,
        account.address,
        {
          gasPrice: GasPrice.fromString("0.025uatom"),
          estimatedBlockTime: 6,
          estimatedIndexerTime: 5,
        }
      );
      // const result = await nesaClient.registerModel(modelName, modelVersion);
      const modelId = long.fromString("13");
      const lockBalance = {
        denom: "uatom",
        amount: "10",
      };
      return nesaClient.registerSession(sessionId, modelId, lockBalance, vrf);
    }
    return new Error("Keplr Wallet plugin not found");
  }

  static async registerModel(modelName: string, modelVersion: string) {
    // @ts-ignore
    if (window && window.keplr) {
      // @ts-ignore
      const { keplr } = window;
      const { chainId, rpc } = this.getTestnetChainInfo();
      await keplr.experimentalSuggestChain(this.getTestnetChainInfo());
      await keplr.enable(this.getTestnetChainInfo().chainId);
      // @ts-ignore
      const offlineSigner = window.getOfflineSigner!(chainId);
      const account: AccountData = (await offlineSigner.getAccounts())[0];
      const nesaClient = await NesaClient.connectWithSigner(
        rpc,
        offlineSigner,
        account.address,
        {
          gasPrice: GasPrice.fromString("0.025uatom"),
          estimatedBlockTime: 6,
          estimatedIndexerTime: 5,
        }
      );
      await nesaClient.registerModel(modelName, modelVersion);
    }
    return new Error("Keplr Wallet plugin not found");
  }
}

export default WalletOperation;
