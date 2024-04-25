import { AccountData } from "@cosmjs/proto-signing";
import { NesaClient } from "./client";
import { GasPrice } from "@cosmjs/stargate";
import { ChainInfo } from "@keplr-wallet/types"
import { defaultChainInfo } from "./default.config";
import EncryptUtils from "./encryptUtils";
import Long from "long";

class WalletOperation {
  static registerSession(modelName: string, lockAmount: string, denom: string, chainInfo?: ChainInfo): Promise<any> {
    EncryptUtils.generateKey();
    return new Promise(async (resolve, reject) => {
      let selectChainInfo = defaultChainInfo;
      if (chainInfo) {
        if (chainInfo?.rpc
          && chainInfo?.rest
          && chainInfo?.feeCurrencies
          && chainInfo?.feeCurrencies.length > 0
          && chainInfo?.feeCurrencies[0]?.coinMinimalDenom) {
          selectChainInfo = chainInfo
        } else {
          reject("Invalid chainInfo, you must provide rpc, rest, feeCurrencies, feeCurrencies");
        }
      }
      if (window?.keplr) {
        const { keplr } = window;
        const { chainId, rpc } = selectChainInfo;
        await keplr.experimentalSuggestChain(selectChainInfo);
        await keplr.enable(selectChainInfo.chainId);
        const offlineSigner = window.getOfflineSigner!(chainId);
        const account: AccountData = (await offlineSigner.getAccounts())[0];
        const nesaClient = await NesaClient.connectWithSigner(
          rpc,
          offlineSigner,
          account.address,
          {
            gasPrice: GasPrice.fromString(
              `0.025${selectChainInfo.feeCurrencies[0].coinMinimalDenom}`
            ),
            estimatedBlockTime: 6,
            estimatedIndexerTime: 5,
          }
        );
        const lockBalance = { denom: denom, amount: lockAmount };
        EncryptUtils.requestVrf().then(async (res) => {
          if (res?.vrf && res?.sessionId) {
            resolve(nesaClient.registerSession(res.sessionId, modelName, lockBalance, res.vrf))
          } else {
            reject(new Error('Vrf seed is null'))
          }
        }).catch((err) => {
          console.log('res-err: ', err)
          reject(err)
        })
      } else {
        reject(new Error("Keplr Wallet plugin not found"));
      }
    })
  }

  static requestAgentInfo(agentName: string, modelName: string, chainInfo?: ChainInfo): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let selectChainInfo = defaultChainInfo;
      if (chainInfo) {
        if (chainInfo?.feeCurrencies[0]?.coinMinimalDenom) {
          selectChainInfo = chainInfo
        } else {
          reject("Invalid chainInfo, you must provide feeCurrencies");
        }
      } else {
        selectChainInfo = defaultChainInfo
      }
      if (window?.keplr) {
        const { keplr } = window;
        const { chainId, rpc } = selectChainInfo;
        await keplr.experimentalSuggestChain(selectChainInfo);
        await keplr.enable(selectChainInfo.chainId);
        const offlineSigner = window.getOfflineSigner!(chainId);
        const account: AccountData = (await offlineSigner.getAccounts())[0];
        NesaClient.connectWithSigner(
          rpc,
          offlineSigner,
          account.address,
          {
            gasPrice: GasPrice.fromString(
              `0.025${selectChainInfo.feeCurrencies[0].coinMinimalDenom}`
            ),
            estimatedBlockTime: 6,
            estimatedIndexerTime: 5,
          }
        ).then((client) => {
          if (client) {
            resolve(client.getInferenceAgent(agentName, modelName, Long.fromNumber(0)))
          } else {
            reject("Client init failed");
          }
        }).catch((err) => {
          reject("Client init failed: " + err?.message);
        })
      } else {
        reject("Keplr Wallet plugin not found");
      }
    })
  }

  static requestParams(chainInfo?: ChainInfo): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let selectChainInfo = defaultChainInfo;
      if (chainInfo) {
        if (chainInfo?.feeCurrencies[0]?.coinMinimalDenom) {
          selectChainInfo = chainInfo
        } else {
          reject("Invalid chainInfo, you must provide feeCurrencies");
        }
      } else {
        selectChainInfo = defaultChainInfo
      }
      if (window?.keplr) {
        const { keplr } = window;
        const { chainId, rpc } = selectChainInfo;
        await keplr.experimentalSuggestChain(selectChainInfo);
        await keplr.enable(selectChainInfo.chainId);
        const offlineSigner = window.getOfflineSigner!(chainId);
        const account: AccountData = (await offlineSigner.getAccounts())[0];
        NesaClient.connectWithSigner(
          rpc,
          offlineSigner,
          account.address,
          {
            gasPrice: GasPrice.fromString(
              `0.025${selectChainInfo.feeCurrencies[0].coinMinimalDenom}`
            ),
            estimatedBlockTime: 6,
            estimatedIndexerTime: 5,
          }
        ).then((client) => {
          if (client) {
            resolve(client.getParams())
          } else {
            reject("Client init failed");
          }
        }).catch((err) => {
          reject("Client init failed: " + err?.message);
        })
      } else {
        reject("Keplr Wallet plugin not found");
      }
    })
  }

  static requestVrfSeed(chainInfo?: ChainInfo): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let selectChainInfo = defaultChainInfo;
      if (chainInfo) {
        if (chainInfo?.feeCurrencies[0]?.coinMinimalDenom) {
          selectChainInfo = chainInfo
        } else {
          reject("Invalid chainInfo, you must provide feeCurrencies");
        }
      } else {
        selectChainInfo = defaultChainInfo
      }
      if (window?.keplr) {
        const { keplr } = window;
        const { chainId, rpc } = selectChainInfo;
        await keplr.experimentalSuggestChain(selectChainInfo);
        await keplr.enable(selectChainInfo.chainId);
        const offlineSigner = window.getOfflineSigner!(chainId);
        const account: AccountData = (await offlineSigner.getAccounts())[0];
        NesaClient.connectWithSigner(
          rpc,
          offlineSigner,
          account.address,
          {
            gasPrice: GasPrice.fromString(
              `0.025${selectChainInfo.feeCurrencies[0].coinMinimalDenom}`
            ),
            estimatedBlockTime: 6,
            estimatedIndexerTime: 5,
          }
        ).then((client) => {
          if (client) {
            resolve(client.getVRFSeed(account.address))
          } else {
            reject("Client init failed");
          }
        }).catch((err) => {
          reject("Client init failed: " + err?.message);
        })
      } else {
        reject("Keplr Wallet plugin not found");
      }
    })
  }
}

export default WalletOperation;
