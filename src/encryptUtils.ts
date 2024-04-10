import * as CryptoJS from "crypto-js";
//@ts-ignore
import { Evaluate, ProofHoHash } from "@idena/vrf-js";
//@ts-ignore
import * as Secp256k1 from "@lionello/secp256k1-js";

class EncryptUtils {
  public static privateKey: any;

  public static publicKey: any;

  static async generateKey() {
    if (this.privateKey && this.publicKey) {
      return { privateKey: this.privateKey, publicKey: this.publicKey };
    }
    //@ts-ignore
    const privateKeyBuf = window.crypto.getRandomValues(new Uint8Array(32));
    const privateKey = Secp256k1.uint256(privateKeyBuf, 16);
    const publicKey = Secp256k1.generatePublicKeyFromPrivateKeyData(privateKey);
    this.privateKey = privateKey;
    this.publicKey = publicKey;
    return {
      privateKey,
      publicKey,
    };
  }

  static async signQuestion(data: string, chatSeq: number) {
    if (!this.privateKey || !this.publicKey) {
      return "";
    }
    const str = `${data}|${chatSeq}`;
    const signDataHash = CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
    console.log("signDataHash: ", signDataHash);
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

  static async signPayment(chatSeq: number, totalPayment: any) {
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

  static compressPublicKey(hexX: any, hexY: any) {
    const reformHexX = hexX.length < 64 ? `0${hexX}` : hexX;
    // eslint-disable-next-line no-undef
    const x = BigInt(`0x${reformHexX}`);
    // eslint-disable-next-line no-undef
    const y = BigInt(`0x${hexY}`);
    let compressedPublicKey = "";
    if (y % 2n === 0n) {
      compressedPublicKey = "02" + x.toString(16);
    } else {
      compressedPublicKey = "03" + x.toString(16);
    }
    return compressedPublicKey;
  }

  static generateVrf() {
    const compressedPublicKey = this.compressPublicKey(
      this.publicKey.x,
      this.publicKey.y
    );
    const seed = [1, 2, 3, 4, 5];
    const privateKey = this.privateKey.toString("hex");
    const uint8Array = new Uint8Array(
      privateKey.match(/[\da-f]{2}/gi).map(function (h: any) {
        return parseInt(h, 16);
      })
    );
    const [hash, proof] = this.generateProof(uint8Array, seed);
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
