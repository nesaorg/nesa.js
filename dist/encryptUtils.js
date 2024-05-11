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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = __importStar(require("crypto-js"));
const vrf_js_1 = require("@idena/vrf-js");
const Secp256k1 = __importStar(require("@lionello/secp256k1-js"));
const walletOperation_1 = __importDefault(require("./walletOperation"));
class EncryptUtils {
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
    static sortObjectKeys(obj) {
        if (Array.isArray(obj)) {
            return obj.sort().map(EncryptUtils.sortObjectKeys);
        }
        else if (typeof obj === "object" && obj !== null) {
            return Object.keys(obj)
                .sort()
                .reduce((acc, key) => {
                acc[key] = EncryptUtils.sortObjectKeys(obj[key]);
                return acc;
            }, {});
        }
        return obj;
    }
    static signMessage(message, chatSeq, isQuestion) {
        if (!this.privateKey || !this.publicKey) {
            return "";
        }
        let messageData;
        if (isQuestion) {
            const sortSignDataHash = CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
            messageData = `${sortSignDataHash}|${chatSeq}`;
        }
        else {
            messageData = `${chatSeq}|${message}`;
        }
        const signDataHash = CryptoJS.SHA256(messageData).toString(CryptoJS.enc.Hex);
        const digest = Secp256k1.uint256(signDataHash, 16);
        const signature = Secp256k1.ecsign(this.privateKey, digest);
        let sigV = signature.v.toString().length < 2
            ? `0${signature.v.toString()}`
            : signature.v.toString();
        sigV = sigV.length < 2 ? `0${sigV}` : sigV;
        const signatureData = `${signature.r}${signature.s}${sigV}`;
        return signatureData;
    }
    static requestVrf(chainInfo) {
        return new Promise((resolve, reject) => {
            walletOperation_1.default.requestVrfSeed(chainInfo)
                .then((res) => {
                if (res?.seed) {
                    const publicKeyY = BigInt(`0x${this.publicKey.y}`);
                    let compressedPublicKey = "";
                    if (publicKeyY % 2n === 0n) {
                        compressedPublicKey = "02" + this.publicKey.x;
                    }
                    else {
                        compressedPublicKey = "03" + this.publicKey.x;
                    }
                    const [hash, proof] = (0, vrf_js_1.Evaluate)(this.privateKeyBuf, res.seed);
                    resolve({
                        vrf: {
                            seed: res.seed,
                            proof,
                            hashRandom: hash,
                        },
                        sessionId: compressedPublicKey,
                    });
                }
                else {
                    reject(new Error("Vrf seed is null"));
                }
            })
                .catch((err) => {
                console.log('requestVrf-err: ', err);
                reject(err);
            });
        });
    }
    static signHeartbeat(message) {
        if (!this.privateKey) {
            return "";
        }
        const signDataHash = CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
        const digest = Secp256k1.uint256(signDataHash, 16);
        const signature = Secp256k1.ecsign(this.privateKey, digest);
        let sigV = signature.v.toString().length < 2
            ? `0${signature.v.toString()}`
            : signature.v.toString();
        sigV = sigV.length < 2 ? `0${sigV}` : sigV;
        const signatureData = `${signature.r}${signature.s}${sigV}`;
        return signatureData;
    }
}
exports.default = EncryptUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcnlwdFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2VuY3J5cHRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBQ3RDLDBDQUF5QztBQUN6QyxrRUFBb0Q7QUFDcEQsd0VBQWdEO0FBR2hELE1BQU0sWUFBWTtJQU9oQixNQUFNLENBQUMsV0FBVztRQUNoQixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixPQUFPO1lBQ0wsVUFBVTtZQUNWLFNBQVM7U0FDVixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBd0I7UUFDNUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDdkIsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNyRCxDQUFDO2FBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ25ELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ3BCLElBQUksRUFBRTtpQkFDTixNQUFNLENBQUMsQ0FB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