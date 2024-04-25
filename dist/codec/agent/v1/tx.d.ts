import { Params, AgentStatus, Payment } from "./agent";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "agent.v1";
export interface MsgUpdateParams {
    authority: string;
    params?: Params;
}
export interface MsgUpdateParamsResponse {
}
export interface MsgRegisterModel {
    account: string;
    name: string;
    repositoryUrl: string;
}
export interface MsgRegisterModelResponse {
}
export interface MsgRegisterInferenceAgent {
    account: string;
    modelName: string;
    url: string;
    version: Long;
    lockBalance?: Coin;
}
export interface MsgRegisterInferenceAgentResponse {
}
export interface MsgUpdateInferenceAgent {
    account: string;
    modelName: string;
    url: string;
    version: Long;
    lockBalance?: Coin;
    status: AgentStatus;
}
export interface MsgUpdateInferenceAgentResponse {
}
export interface VRF {
    seed: Uint8Array;
    proof: Uint8Array;
    hashRandom: Uint8Array;
}
export interface MsgRegisterSession {
    sessionId: string;
    account: string;
    modelName: string;
    lockBalance?: Coin;
    vrf?: VRF;
}
export interface MsgRegisterSessionResponse {
    account: string;
    modelName: string;
}
export interface MsgSubmitPayment {
    account: string;
    sessionId: string;
    payment?: Payment;
    signature: Uint8Array;
}
export interface MsgSubmitPaymentResponse {
}
export interface MsgClaimSession {
    account: string;
    sessionId: string;
}
export interface MsgClaimSessionResponse {
}
export interface MsgCancelSession {
    account: string;
    sessionId: string;
}
export interface MsgCancelSessionResponse {
}
export declare const MsgUpdateParams: {
    encode(message: MsgUpdateParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams;
    fromJSON(object: any): MsgUpdateParams;
    toJSON(message: MsgUpdateParams): unknown;
    fromPartial<I extends {
        authority?: string | undefined;
        params?: {
            agentMinimumLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            userMinimumLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            sessionTime?: {
                seconds?: string | number | Long.Long | undefined;
                nanos?: number | undefined;
            } | undefined;
            challengeTime?: {
                seconds?: string | number | Long.Long | undefined;
                nanos?: number | undefined;
            } | undefined;
            globalSeed?: Uint8Array | undefined;
            lowestAgentVersion?: string | number | Long.Long | undefined;
            highestAgentVersion?: string | number | Long.Long | undefined;
        } | undefined;
    } & {
        authority?: string | undefined;
        params?: ({
            agentMinimumLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            userMinimumLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            sessionTime?: {
                seconds?: string | number | Long.Long | undefined;
                nanos?: number | undefined;
            } | undefined;
            challengeTime?: {
                seconds?: string | number | Long.Long | undefined;
                nanos?: number | undefined;
            } | undefined;
            globalSeed?: Uint8Array | undefined;
            lowestAgentVersion?: string | number | Long.Long | undefined;
            highestAgentVersion?: string | number | Long.Long | undefined;
        } & {
            agentMinimumLock?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & { [K in Exclude<keyof I["params"]["agentMinimumLock"], keyof Coin>]: never; }) | undefined;
            userMinimumLock?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & { [K_1 in Exclude<keyof I["params"]["userMinimumLock"], keyof Coin>]: never; }) | undefined;
            sessionTime?: ({
                seconds?: string | number | Long.Long | undefined;
                nanos?: number | undefined;
            } & {
                seconds?: string | number | (Long.Long & {
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
                } & { [K_2 in Exclude<keyof I["params"]["sessionTime"]["seconds"], keyof Long.Long>]: never; }) | undefined;
                nanos?: number | undefined;
            } & { [K in Exclude<keyof I["params"]["sessionTime"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
            challengeTime?: ({
                seconds?: string | number | Long.Long | undefined;
                nanos?: number | undefined;
            } & {
                seconds?: string | number | (Long.Long & {
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
                } & { [K_1 in Exclude<keyof I["params"]["challengeTime"]["seconds"], keyof Long.Long>]: never; }) | undefined;
                nanos?: number | undefined;
            } & { [K_2 in Exclude<keyof I["params"]["challengeTime"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
            globalSeed?: Uint8Array | undefined;
            lowestAgentVersion?: string | number | (Long.Long & {
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
            } & { [K_3 in Exclude<keyof I["params"]["lowestAgentVersion"], keyof Long.Long>]: never; }) | undefined;
            highestAgentVersion?: string | number | (Long.Long & {
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
            } & { [K_4 in Exclude<keyof I["params"]["highestAgentVersion"], keyof Long.Long>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["params"], keyof Params>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, keyof MsgUpdateParams>]: never; }>(object: I): MsgUpdateParams;
};
export declare const MsgUpdateParamsResponse: {
    encode(_: MsgUpdateParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse;
    fromJSON(_: any): MsgUpdateParamsResponse;
    toJSON(_: MsgUpdateParamsResponse): unknown;
    fromPartial<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(_: I): MsgUpdateParamsResponse;
};
export declare const MsgRegisterModel: {
    encode(message: MsgRegisterModel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterModel;
    fromJSON(object: any): MsgRegisterModel;
    toJSON(message: MsgRegisterModel): unknown;
    fromPartial<I extends {
        account?: string | undefined;
        name?: string | undefined;
        repositoryUrl?: string | undefined;
    } & {
        account?: string | undefined;
        name?: string | undefined;
        repositoryUrl?: string | undefined;
    } & { [K in Exclude<keyof I, keyof MsgRegisterModel>]: never; }>(object: I): MsgRegisterModel;
};
export declare const MsgRegisterModelResponse: {
    encode(_: MsgRegisterModelResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterModelResponse;
    fromJSON(_: any): MsgRegisterModelResponse;
    toJSON(_: MsgRegisterModelResponse): unknown;
    fromPartial<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(_: I): MsgRegisterModelResponse;
};
export declare const MsgRegisterInferenceAgent: {
    encode(message: MsgRegisterInferenceAgent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterInferenceAgent;
    fromJSON(object: any): MsgRegisterInferenceAgent;
    toJSON(message: MsgRegisterInferenceAgent): unknown;
    fromPartial<I extends {
        account?: string | undefined;
        modelName?: string | undefined;
        url?: string | undefined;
        version?: string | number | Long.Long | undefined;
        lockBalance?: {
            denom?: string | undefined;
            amount?: string | undefined;
        } | undefined;
    } & {
        account?: string | undefined;
        modelName?: string | undefined;
        url?: string | undefined;
        version?: string | number | (Long.Long & {
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
        } & { [K in Exclude<keyof I["version"], keyof Long.Long>]: never; }) | undefined;
        lockBalance?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K_1 in Exclude<keyof I["lockBalance"], keyof Coin>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof MsgRegisterInferenceAgent>]: never; }>(object: I): MsgRegisterInferenceAgent;
};
export declare const MsgRegisterInferenceAgentResponse: {
    encode(_: MsgRegisterInferenceAgentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterInferenceAgentResponse;
    fromJSON(_: any): MsgRegisterInferenceAgentResponse;
    toJSON(_: MsgRegisterInferenceAgentResponse): unknown;
    fromPartial<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(_: I): MsgRegisterInferenceAgentResponse;
};
export declare const MsgUpdateInferenceAgent: {
    encode(message: MsgUpdateInferenceAgent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateInferenceAgent;
    fromJSON(object: any): MsgUpdateInferenceAgent;
    toJSON(message: MsgUpdateInferenceAgent): unknown;
    fromPartial<I extends {
        account?: string | undefined;
        modelName?: string | undefined;
        url?: string | undefined;
        version?: string | number | Long.Long | undefined;
        lockBalance?: {
            denom?: string | undefined;
            amount?: string | undefined;
        } | undefined;
        status?: AgentStatus | undefined;
    } & {
        account?: string | undefined;
        modelName?: string | undefined;
        url?: string | undefined;
        version?: string | number | (Long.Long & {
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
        } & { [K in Exclude<keyof I["version"], keyof Long.Long>]: never; }) | undefined;
        lockBalance?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K_1 in Exclude<keyof I["lockBalance"], keyof Coin>]: never; }) | undefined;
        status?: AgentStatus | undefined;
    } & { [K_2 in Exclude<keyof I, keyof MsgUpdateInferenceAgent>]: never; }>(object: I): MsgUpdateInferenceAgent;
};
export declare const MsgUpdateInferenceAgentResponse: {
    encode(_: MsgUpdateInferenceAgentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateInferenceAgentResponse;
    fromJSON(_: any): MsgUpdateInferenceAgentResponse;
    toJSON(_: MsgUpdateInferenceAgentResponse): unknown;
    fromPartial<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(_: I): MsgUpdateInferenceAgentResponse;
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
        modelName?: string | undefined;
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
        modelName?: string | undefined;
        lockBalance?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K in Exclude<keyof I["lockBalance"], keyof Coin>]: never; }) | undefined;
        vrf?: ({
            seed?: Uint8Array | undefined;
            proof?: Uint8Array | undefined;
            hashRandom?: Uint8Array | undefined;
        } & {
            seed?: Uint8Array | undefined;
            proof?: Uint8Array | undefined;
            hashRandom?: Uint8Array | undefined;
        } & { [K_1 in Exclude<keyof I["vrf"], keyof VRF>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof MsgRegisterSession>]: never; }>(object: I): MsgRegisterSession;
};
export declare const MsgRegisterSessionResponse: {
    encode(message: MsgRegisterSessionResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterSessionResponse;
    fromJSON(object: any): MsgRegisterSessionResponse;
    toJSON(message: MsgRegisterSessionResponse): unknown;
    fromPartial<I extends {
        account?: string | undefined;
        modelName?: string | undefined;
    } & {
        account?: string | undefined;
        modelName?: string | undefined;
    } & { [K in Exclude<keyof I, keyof MsgRegisterSessionResponse>]: never; }>(object: I): MsgRegisterSessionResponse;
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
            contributions?: {
                account?: string | undefined;
                rate?: string | number | Long.Long | undefined;
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
            }[] | undefined;
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
            contributions?: {
                account?: string | undefined;
                rate?: string | number | Long.Long | undefined;
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
            }[] | undefined;
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
            contributions?: ({
                account?: string | undefined;
                rate?: string | number | Long.Long | undefined;
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
            }[] & ({
                account?: string | undefined;
                rate?: string | number | Long.Long | undefined;
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
            } & {
                account?: string | undefined;
                rate?: string | number | (Long.Long & {
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
                } & { [K_2 in Exclude<keyof I["payment"]["contributions"][number]["rate"], keyof Long.Long>]: never; }) | undefined;
                amount?: ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & { [K_3 in Exclude<keyof I["payment"]["contributions"][number]["amount"], keyof Coin>]: never; }) | undefined;
            } & { [K in Exclude<keyof I["payment"]["contributions"][number], keyof import("./agent").PaymentContribution>]: never; })[] & { [K_1 in Exclude<keyof I["payment"]["contributions"], keyof {
                account?: string | undefined;
                rate?: string | number | Long.Long | undefined;
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
            }[]>]: never; }) | undefined;
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
export declare const MsgClaimSession: {
    encode(message: MsgClaimSession, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimSession;
    fromJSON(object: any): MsgClaimSession;
    toJSON(message: MsgClaimSession): unknown;
    fromPartial<I extends {
        account?: string | undefined;
        sessionId?: string | undefined;
    } & {
        account?: string | undefined;
        sessionId?: string | undefined;
    } & { [K in Exclude<keyof I, keyof MsgClaimSession>]: never; }>(object: I): MsgClaimSession;
};
export declare const MsgClaimSessionResponse: {
    encode(_: MsgClaimSessionResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimSessionResponse;
    fromJSON(_: any): MsgClaimSessionResponse;
    toJSON(_: MsgClaimSessionResponse): unknown;
    fromPartial<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(_: I): MsgClaimSessionResponse;
};
export declare const MsgCancelSession: {
    encode(message: MsgCancelSession, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelSession;
    fromJSON(object: any): MsgCancelSession;
    toJSON(message: MsgCancelSession): unknown;
    fromPartial<I extends {
        account?: string | undefined;
        sessionId?: string | undefined;
    } & {
        account?: string | undefined;
        sessionId?: string | undefined;
    } & { [K in Exclude<keyof I, keyof MsgCancelSession>]: never; }>(object: I): MsgCancelSession;
};
export declare const MsgCancelSessionResponse: {
    encode(_: MsgCancelSessionResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelSessionResponse;
    fromJSON(_: any): MsgCancelSessionResponse;
    toJSON(_: MsgCancelSessionResponse): unknown;
    fromPartial<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(_: I): MsgCancelSessionResponse;
};
export interface Msg {
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    RegisterModel(request: MsgRegisterModel): Promise<MsgRegisterModelResponse>;
    RegisterInferenceAgent(request: MsgRegisterInferenceAgent): Promise<MsgRegisterInferenceAgentResponse>;
    UpdateInferenceAgent(request: MsgUpdateInferenceAgent): Promise<MsgUpdateInferenceAgentResponse>;
    RegisterSession(request: MsgRegisterSession): Promise<MsgRegisterSessionResponse>;
    SubmitPayment(request: MsgSubmitPayment): Promise<MsgSubmitPaymentResponse>;
    ClaimSession(request: MsgClaimSession): Promise<MsgClaimSessionResponse>;
    CancelSession(request: MsgCancelSession): Promise<MsgCancelSessionResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    RegisterModel(request: MsgRegisterModel): Promise<MsgRegisterModelResponse>;
    RegisterInferenceAgent(request: MsgRegisterInferenceAgent): Promise<MsgRegisterInferenceAgentResponse>;
    UpdateInferenceAgent(request: MsgUpdateInferenceAgent): Promise<MsgUpdateInferenceAgentResponse>;
    RegisterSession(request: MsgRegisterSession): Promise<MsgRegisterSessionResponse>;
    SubmitPayment(request: MsgSubmitPayment): Promise<MsgSubmitPaymentResponse>;
    ClaimSession(request: MsgClaimSession): Promise<MsgClaimSessionResponse>;
    CancelSession(request: MsgCancelSession): Promise<MsgCancelSessionResponse>;
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
