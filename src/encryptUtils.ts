import * as CryptoJS from "crypto-js";
//@ts-ignore
import { Evaluate, ProofHoHash } from "@idena/vrf-js";
//@ts-ignore
import * as Secp256k1 from "@lionello/secp256k1-js";

class EncryptUtils {
  public static privateKey: any;

  public static publicKey: any;

  public static privateKeyBuf: any;

  static generateKey() {
    if (this.privateKey && this.publicKey) {
      return { privateKey: this.privateKey, publicKey: this.publicKey };
    }
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

  static signQuestion(data: string, chatSeq: number) {
    if (!this.privateKey || !this.publicKey) {
      return "";
    }
    const str = `${data}|${chatSeq}`;
    const signDataHash = CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
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

  static signPayment(chatSeq: number, totalPayment: any) {
    if (!this.privateKey || !this.publicKey) {
      return "";
    }
    const str = `${chatSeq}|${totalPayment.amount}${totalPayment.denom}`;
    const signDataHash = CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
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

  static generateProof(sk: any, data: any) {
    return Evaluate(sk, data);
  }

  static generateVrf() {
    this.generateKey();
    const publicKeyY = BigInt(`0x${this.publicKey.y}`);
    let compressedPublicKey = "";
    if (publicKeyY % 2n === 0n) {
      compressedPublicKey = "02" + this.publicKey.x;
    } else {
      compressedPublicKey = "03" + this.publicKey.x;
    }
    const seed = [1, 2, 3, 4, 5];
    const [hash, proof] = this.generateProof(this.privateKeyBuf, seed);
    return {
      vrf: {
        seed,
        proof,
        hashRandom: hash,
      },
      sessionId: compressedPublicKey,
    };
  }
}

export default EncryptUtils;
