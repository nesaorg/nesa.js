declare class EncryptUtils {
    static privateKey: any;
    static publicKey: any;
    static generateKey(): Promise<{
        privateKey: any;
        publicKey: any;
    }>;
    static signQuestion(data: string, chatSeq: number): Promise<string>;
    static signPayment(chatSeq: number, totalPayment: any): Promise<string>;
    static generateProof(sk: any, data: any): any;
    static compressPublicKey(hexX: any, hexY: any): string;
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
