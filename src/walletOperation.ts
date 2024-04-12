import { AccountData } from "@cosmjs/proto-signing";
import { NesaClient } from "./client";
import { GasPrice } from "@cosmjs/stargate";
import long from "long";

class WalletOperation {
  static getTestnetChainInfo = () => ({
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

  static async registerSession(sessionId: string, vrf: any) {
    if (window?.keplr) {
      const { keplr } = window;
      const { chainId, rpc } = this.getTestnetChainInfo();
      await keplr.experimentalSuggestChain(this.getTestnetChainInfo());
      await keplr.enable(this.getTestnetChainInfo().chainId);
      const offlineSigner = window.getOfflineSigner!(chainId);
      const account: AccountData = (await offlineSigner.getAccounts())[0];
      const nesaClient = await NesaClient.connectWithSigner(
        rpc,
        offlineSigner,
        account.address,
        {
          gasPrice: GasPrice.fromString(
            `0.025${this.getTestnetChainInfo().coinMinimalDenom}`
          ),
          estimatedBlockTime: 6,
          estimatedIndexerTime: 5,
        }
      );
      // const result = await nesaClient.registerModel(modelName, modelVersion);
      const modelId = long.fromString("13");
      const lockBalance = {
        denom: this.getTestnetChainInfo().coinMinimalDenom,
        amount: "10",
      };
      return nesaClient.registerSession(sessionId, modelId, lockBalance, vrf);
    }
    return new Error("Keplr Wallet plugin not found");
  }

  static async registerModel(modelName: string, modelVersion: string) {
    if (window && window.keplr) {
      const { keplr } = window;
      const { chainId, rpc } = this.getTestnetChainInfo();
      await keplr.experimentalSuggestChain(this.getTestnetChainInfo());
      await keplr.enable(this.getTestnetChainInfo().chainId);
      const offlineSigner = window.getOfflineSigner!(chainId);
      const account: AccountData = (await offlineSigner.getAccounts())[0];
      const nesaClient = await NesaClient.connectWithSigner(
        rpc,
        offlineSigner,
        account.address,
        {
          gasPrice: GasPrice.fromString(
            `0.025${this.getTestnetChainInfo().coinMinimalDenom}`
          ),
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
