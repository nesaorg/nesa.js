import * as CryptoJS from "crypto-js";
import { Evaluate } from "@idena/vrf-js";
import * as Secp256k1 from "@lionello/secp256k1-js";
import WalletOperation from "./walletOperation";

class EncryptUtils {
  public static privateKey: any;

  public static publicKey: any;

  public static privateKeyBuf: any;

  static generateKey() {
    const privateKeyBuf = window.crypto.getRandomValues(new Uint8Array(32));
    this.privateKeyBuf = privateKeyBuf;
    const privateKey = Secp256k1.uint256(privateKeyBuf, 16);
    const publicKey = Secp256k1.generatePublicKeyFromPrivateKeyData(privateKey);
    this.privateKey = privateKey;
    this.publicKey = publicKey;
    return {
      privateKey,
      publicKey,
    };
  }

  static sortObjectKeys(obj: Record<string, any>): Record<string, any> {
    if (Array.isArray(obj)) {
      return obj.sort().map(EncryptUtils.sortObjectKeys);
    } else if (typeof obj === "object" && obj !== null) {
      return Object.keys(obj)
        .sort()
        .reduce((acc: Record<string, any>, key) => {
          acc[key] = EncryptUtils.sortObjectKeys(obj[key]);
          return acc;
        }, {});
    }
    return obj;
  }

  static signMessage(message: string, chatSeq: number, isQuestion?: boolean) {
    if (!this.privateKey || !this.publicKey) {
      return "";
    }
    let messageData;
    if (isQuestion) {
      const sortSignDataHash = CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
      messageData = `${sortSignDataHash}|${chatSeq}`;
    } else {
      messageData = `${chatSeq}|${message}`
    }
    const signDataHash = CryptoJS.SHA256(messageData).toString(CryptoJS.enc.Hex);
    const digest = Secp256k1.uint256(signDataHash, 16);
    const signature = Secp256k1.ecsign(this.privateKey, digest);
    let sigV =
      signature.v.toString().length < 2
        ? `0${signature.v.toString()}`
        : signature.v.toString();
    sigV = sigV.length < 2 ? `0${sigV}` : sigV;
    const signatureData = `${signature.r}${signature.s}${sigV}`;
    return signatureData;
  }

  static requestVrf(): Promise<any> {
    return new Promise((resolve, reject) => {
      WalletOperation.requestVrfSeed()
        .then((res) => {
          if (res?.seed) {
            const publicKeyY = BigInt(`0x${this.publicKey.y}`);
            let compressedPublicKey = "";
            if (publicKeyY % 2n === 0n) {
              compressedPublicKey = "02" + this.publicKey.x;
            } else {
              compressedPublicKey = "03" + this.publicKey.x;
            }
            const [hash, proof] = Evaluate(this.privateKeyBuf, res.seed);
            resolve({
              vrf: {
                seed: res.seed,
                proof,
                hashRandom: hash,
              },
              sessionId: compressedPublicKey,
            })
          } else {
            reject(new Error("Vrf seed is null"));
          }
        })
        .catch((err) => {
          console.log('requestVrf-err: ', err)
          reject(err)
        })
    })
  }

  static signHeartbeat(message: string) {
    if (!this.privateKey) {
      return "";
    }
    const signDataHash = CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
    const digest = Secp256k1.uint256(signDataHash, 16);
    const signature = Secp256k1.ecsign(this.privateKey, digest);
    let sigV =
      signature.v.toString().length < 2
        ? `0${signature.v.toString()}`
        : signature.v.toString();
    sigV = sigV.length < 2 ? `0${sigV}` : sigV;
    const signatureData = `${signature.r}${signature.s}${sigV}`;
    console.log('signatureData: ', signatureData)
    return signatureData;
  }
}

export default EncryptUtils;
