import { AccountData } from "@cosmjs/proto-signing";
import { NesaClient } from "./client";
import { GasPrice } from "@cosmjs/stargate";
import { ChainInfo } from "@keplr-wallet/types"
import EncryptUtils from "./encryptUtils";
import Long from "long";

class WalletOperation {
  static getNesaClient(chainInfo: ChainInfo): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (window?.keplr) {
        const { keplr } = window;
        const { chainId, rpc } = chainInfo;
        await keplr.experimentalSuggestChain(chainInfo);
        await keplr.enable(chainId);
        const offlineSigner = window.getOfflineSigner!(chainId);
        const account: AccountData = (await offlineSigner.getAccounts())[0];
        NesaClient.connectWithSigner(
          rpc,
          offlineSigner,
          account.address,
          chainId,
          {
            gasPrice: GasPrice.fromString(
              `0.025${chainInfo.feeCurrencies[0].coinMinimalDenom}`
            ),
            estimatedBlockTime: 6,
            estimatedIndexerTime: 5,
          }
        ).then((client) => {
          resolve(client)
        }).catch((error) => {
          reject(error)
        })
      } else {
        reject(new Error("Keplr Wallet plugin not found"));
      }
    })
  }

  static registerSession(client: any, modelName: string, lockAmount: string, denom: string, chainInfo: ChainInfo): Promise<any> {
    EncryptUtils.generateKey();
    return new Promise(async (resolve, reject) => {
      const lockBalance = { denom: denom, amount: lockAmount };
      EncryptUtils.requestVrf(client, chainInfo).then(async (res) => {
        const fee = {
          amount: [{ denom: chainInfo.feeCurrencies[0].coinMinimalDenom, amount: "0" }],
          gas: "200000",
        }
        if (res?.vrf && res?.sessionId) {
          resolve(client.signRegisterSession(res.sessionId, modelName, fee, lockBalance, res.vrf))
        } else {
          reject(new Error('Vrf seed is null'))
        }
      })
    })
  }

  static requestAgentInfo(client: any, agentName: string, modelName: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (window?.keplr) {
        if (client) {
          resolve(client.getInferenceAgent(agentName, modelName, Long.fromNumber(0)))
        } else {
          reject("Client init failed");
        }
      } else {
        reject("Keplr Wallet plugin not found");
      }
    })
  }

  static requestParams(client: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (window?.keplr) {
        if (client) {
          resolve(client.getParams())
        } else {
          reject("Client init failed");
        }
      } else {
        reject("Keplr Wallet plugin not found");
      }
    })
  }

  static requestVrfSeed(client: any, chainInfo: ChainInfo): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (window?.keplr) {
        const { keplr } = window;
        const { chainId } = chainInfo;
        await keplr.experimentalSuggestChain(chainInfo);
        await keplr.enable(chainId);
        const offlineSigner = window.getOfflineSigner!(chainId);
        const account: AccountData = (await offlineSigner.getAccounts())[0];
        resolve(client.getVRFSeed(account.address))
      } else {
        reject("Keplr Wallet plugin not found");
      }
    })
  }
}

export default WalletOperation;
