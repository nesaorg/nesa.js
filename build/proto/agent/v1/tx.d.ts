import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Payment } from "./genesis";
import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "agent.v1";
export interface MsgRegisterModel {
    account: string;
    name: string;
    version: string;
}
export interface MsgRegisterModelResponse {
    modelId: Long;
}
export interface MsgRegisterInferenceAgent {
    account: string;
    modelId: Long;
    url: string;
}
export interface MsgRegisterInferenceAgentResponse {
    agentId: Long;
}
export interface VRF {
    seed: Uint8Array;
    proof: Uint8Array;
    hashRandom: Uint8Array;
}
export interface MsgRegisterSession {
    sessionId: string;
    account: string;
    modelId: Long;
    lockBalance?: Coin;
    vrf?: VRF;
}
export interface MsgRegisterSessionResponse {
    agentId: Long;
}
export interface MsgSubmitPayment {
    account: string;
    sessionId: string;
    payment?: Payment;
    signature: Uint8Array;
}
export interface MsgSubmitPaymentResponse {
}
export declare const MsgRegisterModel: {
    encode(message: MsgRegisterModel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterModel;
    fromJSON(object: any): MsgRegisterModel;
    toJSON(message: MsgRegisterModel): unknown;
    fromPartial<I extends {
        account?: string | undefined;
        name?: string | undefined;
        version?: string | undefined;
    } & {
        account?: string | undefined;
        name?: string | undefined;
        version?: string | undefined;
    } & { [K in Exclude<keyof I, keyof MsgRegisterModel>]: never; }>(object: I): MsgRegisterModel;
};
export declare const MsgRegisterModelResponse: {
    encode(message: MsgRegisterModelResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterModelResponse;
    fromJSON(object: any): MsgRegisterModelResponse;
    toJSON(message: MsgRegisterModelResponse): unknown;
    fromPartial<I extends {
        modelId?: string | number | Long.Long | undefined;
    } & {
        modelId?: string | number | (Long.Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long.Long) => Long.Long;
            and: (other: string | number | Long.Long) => Long.Long;
            compare: (other: string | number | Long.Long) => number;
            comp: (other: string | number | Long.Long) => number;
            divide: (divisor: string | number | Long.Long) => Long.Long;
            div: (divisor: string | number | Long.Long) => Long.Long;
            equals: (other: string | number | Long.Long) => boolean;
            eq: (other: string | number | Long.Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long.Long) => boolean;
            gt: (other: string | number | Long.Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
            gte: (other: string | number | Long.Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            lessThan: (other: string | number | Long.Long) => boolean;
            lt: (other: string | number | Long.Long) => boolean;
            lessThanOrEqual: (other: string | number | Long.Long) => boolean;
            lte: (other: string | number | Long.Long) => boolean;
            modulo: (other: string | number | Long.Long) => Long.Long;
            mod: (other: string | number | Long.Long) => Long.Long;
            multiply: (multiplier: string | number | Long.Long) => Long.Long;
            mul: (multiplier: string | number | Long.Long) => Long.Long;
            negate: () => Long.Long;
            neg: () => Long.Long;
            not: () => Long.Long;
            notEquals: (other: string | number | Long.Long) => boolean;
            neq: (other: string | number | Long.Long) => boolean;
            or: (other: string | number | Long.Long) => Long.Long;
            shiftLeft: (numBits: number | Long.Long) => Long.Long;
            shl: (numBits: number | Long.Long) => Long.Long;
            shiftRight: (numBits: number | Long.Long) => Long.Long;
            shr: (numBits: number | Long.Long) => Long.Long;
            shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
            shru: (numBits: number | Long.Long) => Long.Long;
            subtract: (subtrahend: string | number | Long.Long) => Long.Long;
            sub: (subtrahend: string | number | Long.Long) => Long.Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean | undefined) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long.Long;
            toString: (radix?: number | undefined) => string;
            toUnsigned: () => Long.Long;
            xor: (other: string | number | Long.Long) => Long.Long;
        } & { [K in Exclude<keyof I["modelId"], keyof Long.Long>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "modelId">]: never; }>(object: I): MsgRegisterModelResponse;
};
export declare const MsgRegisterInferenceAgent: {
    encode(message: MsgRegisterInferenceAgent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterInferenceAgent;
    fromJSON(object: any): MsgRegisterInferenceAgent;
    toJSON(message: MsgRegisterInferenceAgent): unknown;
    fromPartial<I extends {
        account?: string | undefined;
        modelId?: string | number | Long.Long | undefined;
        url?: string | undefined;
    } & {
        account?: string | undefined;
        modelId?: string | number | (Long.Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long.Long) => Long.Long;
            and: (other: string | number | Long.Long) => Long.Long;
            compare: (other: string | number | Long.Long) => number;
            comp: (other: string | number | Long.Long) => number;
            divide: (divisor: string | number | Long.Long) => Long.Long;
            div: (divisor: string | number | Long.Long) => Long.Long;
            equals: (other: string | number | Long.Long) => boolean;
            eq: (other: string | number | Long.Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long.Long) => boolean;
            gt: (other: string | number | Long.Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
            gte: (other: string | number | Long.Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            lessThan: (other: string | number | Long.Long) => boolean;
            lt: (other: string | number | Long.Long) => boolean;
            lessThanOrEqual: (other: string | number | Long.Long) => boolean;
            lte: (other: string | number | Long.Long) => boolean;
            modulo: (other: string | number | Long.Long) => Long.Long;
            mod: (other: string | number | Long.Long) => Long.Long;
            multiply: (multiplier: string | number | Long.Long) => Long.Long;
            mul: (multiplier: string | number | Long.Long) => Long.Long;
            negate: () => Long.Long;
            neg: () => Long.Long;
            not: () => Long.Long;
            notEquals: (other: string | number | Long.Long) => boolean;
            neq: (other: string | number | Long.Long) => boolean;
            or: (other: string | number | Long.Long) => Long.Long;
            shiftLeft: (numBits: number | Long.Long) => Long.Long;
            shl: (numBits: number | Long.Long) => Long.Long;
            shiftRight: (numBits: number | Long.Long) => Long.Long;
            shr: (numBits: number | Long.Long) => Long.Long;
            shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
            shru: (numBits: number | Long.Long) => Long.Long;
            subtract: (subtrahend: string | number | Long.Long) => Long.Long;
            sub: (subtrahend: string | number | Long.Long) => Long.Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean | undefined) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long.Long;
            toString: (radix?: number | undefined) => string;
            toUnsigned: () => Long.Long;
            xor: (other: string | number | Long.Long) => Long.Long;
        } & { [K in Exclude<keyof I["modelId"], keyof Long.Long>]: never; }) | undefined;
        url?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof MsgRegisterInferenceAgent>]: never; }>(object: I): MsgRegisterInferenceAgent;
};
export declare const MsgRegisterInferenceAgentResponse: {
    encode(message: MsgRegisterInferenceAgentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterInferenceAgentResponse;
    fromJSON(object: any): MsgRegisterInferenceAgentResponse;
    toJSON(message: MsgRegisterInferenceAgentResponse): unknown;
    fromPartial<I extends {
        agentId?: string | number | Long.Long | undefined;
    } & {
        agentId?: string | number | (Long.Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long.Long) => Long.Long;
            and: (other: string | number | Long.Long) => Long.Long;
            compare: (other: string | number | Long.Long) => number;
            comp: (other: string | number | Long.Long) => number;
            divide: (divisor: string | number | Long.Long) => Long.Long;
            div: (divisor: string | number | Long.Long) => Long.Long;
            equals: (other: string | number | Long.Long) => boolean;
            eq: (other: string | number | Long.Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long.Long) => boolean;
            gt: (other: string | number | Long.Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
            gte: (other: string | number | Long.Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            lessThan: (other: string | number | Long.Long) => boolean;
            lt: (other: string | number | Long.Long) => boolean;
            lessThanOrEqual: (other: string | number | Long.Long) => boolean;
            lte: (other: string | number | Long.Long) => boolean;
            modulo: (other: string | number | Long.Long) => Long.Long;
            mod: (other: string | number | Long.Long) => Long.Long;
            multiply: (multiplier: string | number | Long.Long) => Long.Long;
            mul: (multiplier: string | number | Long.Long) => Long.Long;
            negate: () => Long.Long;
            neg: () => Long.Long;
            not: () => Long.Long;
            notEquals: (other: string | number | Long.Long) => boolean;
            neq: (other: string | number | Long.Long) => boolean;
            or: (other: string | number | Long.Long) => Long.Long;
            shiftLeft: (numBits: number | Long.Long) => Long.Long;
            shl: (numBits: number | Long.Long) => Long.Long;
            shiftRight: (numBits: number | Long.Long) => Long.Long;
            shr: (numBits: number | Long.Long) => Long.Long;
            shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
            shru: (numBits: number | Long.Long) => Long.Long;
            subtract: (subtrahend: string | number | Long.Long) => Long.Long;
            sub: (subtrahend: string | number | Long.Long) => Long.Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean | undefined) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long.Long;
            toString: (radix?: number | undefined) => string;
            toUnsigned: () => Long.Long;
            xor: (other: string | number | Long.Long) => Long.Long;
        } & { [K in Exclude<keyof I["agentId"], keyof Long.Long>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "agentId">]: never; }>(object: I): MsgRegisterInferenceAgentResponse;
};
export declare const VRF: {
    encode(message: VRF, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): VRF;
    fromJSON(object: any): VRF;
    toJSON(message: VRF): unknown;
    fromPartial<I extends {
        seed?: Uint8Array | undefined;
        proof?: Uint8Array | undefined;
        hashRandom?: Uint8Array | undefined;
    } & {
        seed?: Uint8Array | undefined;
        proof?: Uint8Array | undefined;
        hashRandom?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof VRF>]: never; }>(object: I): VRF;
};
export declare const MsgRegisterSession: {
    encode(message: MsgRegisterSession, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterSession;
    fromJSON(object: any): MsgRegisterSession;
    toJSON(message: MsgRegisterSession): unknown;
    fromPartial<I extends {
        sessionId?: string | undefined;
        account?: string | undefined;
        modelId?: string | number | Long.Long | undefined;
        lockBalance?: {
            denom?: string | undefined;
            amount?: string | undefined;
        } | undefined;
        vrf?: {
            seed?: Uint8Array | undefined;
            proof?: Uint8Array | undefined;
            hashRandom?: Uint8Array | undefined;
        } | undefined;
    } & {
        sessionId?: string | undefined;
        account?: string | undefined;
        modelId?: string | number | (Long.Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long.Long) => Long.Long;
            and: (other: string | number | Long.Long) => Long.Long;
            compare: (other: string | number | Long.Long) => number;
            comp: (other: string | number | Long.Long) => number;
            divide: (divisor: string | number | Long.Long) => Long.Long;
            div: (divisor: string | number | Long.Long) => Long.Long;
            equals: (other: string | number | Long.Long) => boolean;
            eq: (other: string | number | Long.Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long.Long) => boolean;
            gt: (other: string | number | Long.Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
            gte: (other: string | number | Long.Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            lessThan: (other: string | number | Long.Long) => boolean;
            lt: (other: string | number | Long.Long) => boolean;
            lessThanOrEqual: (other: string | number | Long.Long) => boolean;
            lte: (other: string | number | Long.Long) => boolean;
            modulo: (other: string | number | Long.Long) => Long.Long;
            mod: (other: string | number | Long.Long) => Long.Long;
            multiply: (multiplier: string | number | Long.Long) => Long.Long;
            mul: (multiplier: string | number | Long.Long) => Long.Long;
            negate: () => Long.Long;
            neg: () => Long.Long;
            not: () => Long.Long;
            notEquals: (other: string | number | Long.Long) => boolean;
            neq: (other: string | number | Long.Long) => boolean;
            or: (other: string | number | Long.Long) => Long.Long;
            shiftLeft: (numBits: number | Long.Long) => Long.Long;
            shl: (numBits: number | Long.Long) => Long.Long;
            shiftRight: (numBits: number | Long.Long) => Long.Long;
            shr: (numBits: number | Long.Long) => Long.Long;
            shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
            shru: (numBits: number | Long.Long) => Long.Long;
            subtract: (subtrahend: string | number | Long.Long) => Long.Long;
            sub: (subtrahend: string | number | Long.Long) => Long.Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean | undefined) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long.Long;
            toString: (radix?: number | undefined) => string;
            toUnsigned: () => Long.Long;
            xor: (other: string | number | Long.Long) => Long.Long;
        } & { [K in Exclude<keyof I["modelId"], keyof Long.Long>]: never; }) | undefined;
        lockBalance?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K_1 in Exclude<keyof I["lockBalance"], keyof Coin>]: never; }) | undefined;
        vrf?: ({
            seed?: Uint8Array | undefined;
            proof?: Uint8Array | undefined;
            hashRandom?: Uint8Array | undefined;
        } & {
            seed?: Uint8Array | undefined;
            proof?: Uint8Array | undefined;
            hashRandom?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I["vrf"], keyof VRF>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof MsgRegisterSession>]: never; }>(object: I): MsgRegisterSession;
};
export declare const MsgRegisterSessionResponse: {
    encode(message: MsgRegisterSessionResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterSessionResponse;
    fromJSON(object: any): MsgRegisterSessionResponse;
    toJSON(message: MsgRegisterSessionResponse): unknown;
    fromPartial<I extends {
        agentId?: string | number | Long.Long | undefined;
    } & {
        agentId?: string | number | (Long.Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long.Long) => Long.Long;
            and: (other: string | number | Long.Long) => Long.Long;
            compare: (other: string | number | Long.Long) => number;
            comp: (other: string | number | Long.Long) => number;
            divide: (divisor: string | number | Long.Long) => Long.Long;
            div: (divisor: string | number | Long.Long) => Long.Long;
            equals: (other: string | number | Long.Long) => boolean;
            eq: (other: string | number | Long.Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long.Long) => boolean;
            gt: (other: string | number | Long.Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
            gte: (other: string | number | Long.Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            lessThan: (other: string | number | Long.Long) => boolean;
            lt: (other: string | number | Long.Long) => boolean;
            lessThanOrEqual: (other: string | number | Long.Long) => boolean;
            lte: (other: string | number | Long.Long) => boolean;
            modulo: (other: string | number | Long.Long) => Long.Long;
            mod: (other: string | number | Long.Long) => Long.Long;
            multiply: (multiplier: string | number | Long.Long) => Long.Long;
            mul: (multiplier: string | number | Long.Long) => Long.Long;
            negate: () => Long.Long;
            neg: () => Long.Long;
            not: () => Long.Long;
            notEquals: (other: string | number | Long.Long) => boolean;
            neq: (other: string | number | Long.Long) => boolean;
            or: (other: string | number | Long.Long) => Long.Long;
            shiftLeft: (numBits: number | Long.Long) => Long.Long;
            shl: (numBits: number | Long.Long) => Long.Long;
            shiftRight: (numBits: number | Long.Long) => Long.Long;
            shr: (numBits: number | Long.Long) => Long.Long;
            shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
            shru: (numBits: number | Long.Long) => Long.Long;
            subtract: (subtrahend: string | number | Long.Long) => Long.Long;
            sub: (subtrahend: string | number | Long.Long) => Long.Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean | undefined) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long.Long;
            toString: (radix?: number | undefined) => string;
            toUnsigned: () => Long.Long;
            xor: (other: string | number | Long.Long) => Long.Long;
        } & { [K in Exclude<keyof I["agentId"], keyof Long.Long>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "agentId">]: never; }>(object: I): MsgRegisterSessionResponse;
};
export declare const MsgSubmitPayment: {
    encode(message: MsgSubmitPayment, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitPayment;
    fromJSON(object: any): MsgSubmitPayment;
    toJSON(message: MsgSubmitPayment): unknown;
    fromPartial<I extends {
        account?: string | undefined;
        sessionId?: string | undefined;
        payment?: {
            chatSeq?: string | number | Long.Long | undefined;
            totalPayment?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            merkleRoot?: Uint8Array | undefined;
        } | undefined;
        signature?: Uint8Array | undefined;
    } & {
        account?: string | undefined;
        sessionId?: string | undefined;
        payment?: ({
            chatSeq?: string | number | Long.Long | undefined;
            totalPayment?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            merkleRoot?: Uint8Array | undefined;
        } & {
            chatSeq?: string | number | (Long.Long & {
                high: number;
                low: number;
                unsigned: boolean;
                add: (addend: string | number | Long.Long) => Long.Long;
                and: (other: string | number | Long.Long) => Long.Long;
                compare: (other: string | number | Long.Long) => number;
                comp: (other: string | number | Long.Long) => number;
                divide: (divisor: string | number | Long.Long) => Long.Long;
                div: (divisor: string | number | Long.Long) => Long.Long;
                equals: (other: string | number | Long.Long) => boolean;
                eq: (other: string | number | Long.Long) => boolean;
                getHighBits: () => number;
                getHighBitsUnsigned: () => number;
                getLowBits: () => number;
                getLowBitsUnsigned: () => number;
                getNumBitsAbs: () => number;
                greaterThan: (other: string | number | Long.Long) => boolean;
                gt: (other: string | number | Long.Long) => boolean;
                greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
                gte: (other: string | number | Long.Long) => boolean;
                isEven: () => boolean;
                isNegative: () => boolean;
                isOdd: () => boolean;
                isPositive: () => boolean;
                isZero: () => boolean;
                lessThan: (other: string | number | Long.Long) => boolean;
                lt: (other: string | number | Long.Long) => boolean;
                lessThanOrEqual: (other: string | number | Long.Long) => boolean;
                lte: (other: string | number | Long.Long) => boolean;
                modulo: (other: string | number | Long.Long) => Long.Long;
                mod: (other: string | number | Long.Long) => Long.Long;
                multiply: (multiplier: string | number | Long.Long) => Long.Long;
                mul: (multiplier: string | number | Long.Long) => Long.Long;
                negate: () => Long.Long;
                neg: () => Long.Long;
                not: () => Long.Long;
                notEquals: (other: string | number | Long.Long) => boolean;
                neq: (other: string | number | Long.Long) => boolean;
                or: (other: string | number | Long.Long) => Long.Long;
                shiftLeft: (numBits: number | Long.Long) => Long.Long;
                shl: (numBits: number | Long.Long) => Long.Long;
                shiftRight: (numBits: number | Long.Long) => Long.Long;
                shr: (numBits: number | Long.Long) => Long.Long;
                shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
                shru: (numBits: number | Long.Long) => Long.Long;
                subtract: (subtrahend: string | number | Long.Long) => Long.Long;
                sub: (subtrahend: string | number | Long.Long) => Long.Long;
                toInt: () => number;
                toNumber: () => number;
                toBytes: (le?: boolean | undefined) => number[];
                toBytesLE: () => number[];
                toBytesBE: () => number[];
                toSigned: () => Long.Long;
                toString: (radix?: number | undefined) => string;
                toUnsigned: () => Long.Long;
                xor: (other: string | number | Long.Long) => Long.Long;
            } & { [K in Exclude<keyof I["payment"]["chatSeq"], keyof Long.Long>]: never; }) | undefined;
            totalPayment?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & { [K_1 in Exclude<keyof I["payment"]["totalPayment"], keyof Coin>]: never; }) | undefined;
            merkleRoot?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I["payment"], keyof Payment>]: never; }) | undefined;
        signature?: Uint8Array | undefined;
    } & { [K_3 in Exclude<keyof I, keyof MsgSubmitPayment>]: never; }>(object: I): MsgSubmitPayment;
};
export declare const MsgSubmitPaymentResponse: {
    encode(_: MsgSubmitPaymentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitPaymentResponse;
    fromJSON(_: any): MsgSubmitPaymentResponse;
    toJSON(_: MsgSubmitPaymentResponse): unknown;
    fromPartial<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(_: I): MsgSubmitPaymentResponse;
};
export interface Msg {
    RegisterModel(request: MsgRegisterModel): Promise<MsgRegisterModelResponse>;
    RegisterInferenceAgent(request: MsgRegisterInferenceAgent): Promise<MsgRegisterInferenceAgentResponse>;
    RegisterSession(request: MsgRegisterSession): Promise<MsgRegisterSessionResponse>;
    SubmitPayment(request: MsgSubmitPayment): Promise<MsgSubmitPaymentResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    RegisterModel(request: MsgRegisterModel): Promise<MsgRegisterModelResponse>;
    RegisterInferenceAgent(request: MsgRegisterInferenceAgent): Promise<MsgRegisterInferenceAgentResponse>;
    RegisterSession(request: MsgRegisterSession): Promise<MsgRegisterSessionResponse>;
    SubmitPayment(request: MsgSubmitPayment): Promise<MsgSubmitPaymentResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
