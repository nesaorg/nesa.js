"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = __importStar(require("crypto-js"));
//@ts-ignore
const vrf_js_1 = require("@idena/vrf-js");
//@ts-ignore
const Secp256k1 = __importStar(require("@lionello/secp256k1-js"));
class EncryptUtils {
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
    static async signQuestion(data, chatSeq) {
        if (!this.privateKey || !this.publicKey) {
            return "";
        }
        console.log("this.privateKey1: ", this.privateKey);
        console.log("this.publicKey1: ", this.publicKey);
        const str = `${data}|${chatSeq}`;
        console.log("str: ", str);
        const signDataHash = CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
        console.log("signDataHash: ", signDataHash);
        const digest = Secp256k1.uint256(signDataHash, 16);
        const signature = Secp256k1.ecsign(this.privateKey, digest);
        let sigV = signature.v.toString().length < 2
            ? `0${signature.v.toString()}`
            : signature.v.toString();
        sigV = sigV.length < 2 ? `0${sigV}` : sigV;
        const signatureData = `${signature.r}${signature.s}${sigV}`;
        return signatureData;
    }
    static async signPayment(chatSeq, totalPayment) {
        if (!this.privateKey || !this.publicKey) {
            return "";
        }
        const str = `${chatSeq}|${totalPayment.amount}${totalPayment.denom}`;
        const signDataHash = CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
        const digest = Secp256k1.uint256(signDataHash, 16);
        const signature = Secp256k1.ecsign(this.privateKey, digest);
        let sigV = signature.v.toString().length < 2
            ? `0${signature.v.toString()}`
            : signature.v.toString();
        sigV = sigV.length < 2 ? `0${sigV}` : sigV;
        const signatureData = `${signature.r}${signature.s}${sigV}`;
        return signatureData;
    }
    static generateProof(sk, data) {
        return (0, vrf_js_1.Evaluate)(sk, data);
    }
    static compressPublicKey(hexX, hexY) {
        const reformHexX = hexX.length < 64 ? `0${hexX}` : hexX;
        // eslint-disable-next-line no-undef
        const x = BigInt(`0x${reformHexX}`);
        // eslint-disable-next-line no-undef
        const y = BigInt(`0x${hexY}`);
        let compressedPublicKey = "";
        if (y % 2n === 0n) {
            compressedPublicKey = "02" + x.toString(16);
        }
        else {
            compressedPublicKey = "03" + x.toString(16);
        }
        return compressedPublicKey;
    }
    static generateVrf() {
        const compressedPublicKey = this.compressPublicKey(this.publicKey.x, this.publicKey.y);
        const seed = [1, 2, 3, 4, 5];
        const privateKey = this.privateKey.toString("hex");
        const uint8Array = new Uint8Array(privateKey.match(/[\da-f]{2}/gi).map(function (h) {
            return parseInt(h, 16);
        }));
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
exports.default = EncryptUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcnlwdFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2VuY3J5cHRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBQ3RDLFlBQVk7QUFDWiwwQ0FBc0Q7QUFDdEQsWUFBWTtBQUNaLGtFQUFvRDtBQUVwRCxNQUFNLFlBQVk7SUFLaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXO1FBQ3RCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEUsQ0FBQztRQUNELFlBQVk7UUFDWixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixPQUFPO1lBQ0wsVUFBVTtZQUNWLFNBQVM7U0FDVixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQVksRUFBRSxPQUFlO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3hDLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFH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