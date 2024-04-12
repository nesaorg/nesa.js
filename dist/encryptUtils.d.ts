declare class EncryptUtils {
    static privateKey: any;
    static publicKey: any;
    static privateKeyBuf: any;
    static generateKey(): {
        privateKey: any;
        publicKey: any;
    };
    static signQuestion(data: string, chatSeq: number): string;
    static signPayment(chatSeq: number, totalPayment: any): string;
    static generateProof(sk: any, data: any): any;
    static generateVrf(): {
        vrf: {
            seed: number[];
            proof: any;
            hashRandom: any;
        };
        sessionId: string;
    };
}
export default EncryptUtils;
