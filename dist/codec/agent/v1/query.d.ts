import { Params, Model, Session, SessionStatus, InferenceAgent } from "./agent";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "agent.v1";
export interface QueryParamsRequest {
}
export interface QueryParamsResponse {
    /** params defines the parameters of the module. */
    params?: Params;
}
export interface QueryModelRequest {
    name: string;
}
export interface QueryModelResponse {
    model?: Model;
}
export interface QueryModelAllRequest {
    pagination?: PageRequest;
}
export interface QueryModelAllResponse {
    models: Model[];
    pagination?: PageResponse;
}
export interface QueryInferenceAgentRequest {
    account: string;
    modelName: string;
    limit: Long;
}
export interface QueryInferenceAgentResponse {
    inferenceAgents: InferenceAgent[];
}
export interface QuerySessionRequest {
    id: string;
}
export interface QuerySessionResponse {
    session?: Session;
}
export interface QuerySessionByAgentRequest {
    account: string;
    status: SessionStatus;
    expireTime?: Date;
    limit: Long;
    orderDesc: boolean;
}
export interface QuerySessionByAgentResponse {
    sessions: Session[];
}
export interface QueryVRFSeedRequest {
    account: string;
}
export interface QueryVRFSeedResponse {
    seed: Uint8Array;
}
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    fromPartial<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(_: I): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    fromPartial<I extends {
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
            } & { [K in Exclude<keyof I["params"]["agentMinimumLock"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
            userMinimumLock?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & { [K_1 in Exclude<keyof I["params"]["userMinimumLock"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
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
            } & { [K_3 in Exclude<keyof I["params"]["sessionTime"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
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
                } & { [K_4 in Exclude<keyof I["params"]["challengeTime"]["seconds"], keyof Long.Long>]: never; }) | undefined;
                nanos?: number | undefined;
            } & { [K_5 in Exclude<keyof I["params"]["challengeTime"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
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
            } & { [K_6 in Exclude<keyof I["params"]["lowestAgentVersion"], keyof Long.Long>]: never; }) | undefined;
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
            } & { [K_7 in Exclude<keyof I["params"]["highestAgentVersion"], keyof Long.Long>]: never; }) | undefined;
        } & { [K_8 in Exclude<keyof I["params"], keyof Params>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I, "params">]: never; }>(object: I): QueryParamsResponse;
};
export declare const QueryModelRequest: {
    encode(message: QueryModelRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryModelRequest;
    fromJSON(object: any): QueryModelRequest;
    toJSON(message: QueryModelRequest): unknown;
    fromPartial<I extends {
        name?: string | undefined;
    } & {
        name?: string | undefined;
    } & { [K in Exclude<keyof I, "name">]: never; }>(object: I): QueryModelRequest;
};
export declare const QueryModelResponse: {
    encode(message: QueryModelResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryModelResponse;
    fromJSON(object: any): QueryModelResponse;
    toJSON(message: QueryModelResponse): unknown;
    fromPartial<I extends {
        model?: {
            name?: string | undefined;
            repositoryUrl?: string | undefined;
        } | undefined;
    } & {
        model?: ({
            name?: string | undefined;
            repositoryUrl?: string | undefined;
        } & {
            name?: string | undefined;
            repositoryUrl?: string | undefined;
        } & { [K in Exclude<keyof I["model"], keyof Model>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "model">]: never; }>(object: I): QueryModelResponse;
};
export declare const QueryModelAllRequest: {
    encode(message: QueryModelAllRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryModelAllRequest;
    fromJSON(object: any): QueryModelAllRequest;
    toJSON(message: QueryModelAllRequest): unknown;
    fromPartial<I extends {
        pagination?: {
            key?: Uint8Array | undefined;
            offset?: string | number | Long.Long | undefined;
            limit?: string | number | Long.Long | undefined;
            countTotal?: boolean | undefined;
            reverse?: boolean | undefined;
        } | undefined;
    } & {
        pagination?: ({
            key?: Uint8Array | undefined;
            offset?: string | number | Long.Long | undefined;
            limit?: string | number | Long.Long | undefined;
            countTotal?: boolean | undefined;
            reverse?: boolean | undefined;
        } & {
            key?: Uint8Array | undefined;
            offset?: string | number | (Long.Long & {
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
            } & { [K in Exclude<keyof I["pagination"]["offset"], keyof Long.Long>]: never; }) | undefined;
            limit?: string | number | (Long.Long & {
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
            } & { [K_1 in Exclude<keyof I["pagination"]["limit"], keyof Long.Long>]: never; }) | undefined;
            countTotal?: boolean | undefined;
            reverse?: boolean | undefined;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageRequest>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "pagination">]: never; }>(object: I): QueryModelAllRequest;
};
export declare const QueryModelAllResponse: {
    encode(message: QueryModelAllResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryModelAllResponse;
    fromJSON(object: any): QueryModelAllResponse;
    toJSON(message: QueryModelAllResponse): unknown;
    fromPartial<I extends {
        models?: {
            name?: string | undefined;
            repositoryUrl?: string | undefined;
        }[] | undefined;
        pagination?: {
            nextKey?: Uint8Array | undefined;
            total?: string | number | Long.Long | undefined;
        } | undefined;
    } & {
        models?: ({
            name?: string | undefined;
            repositoryUrl?: string | undefined;
        }[] & ({
            name?: string | undefined;
            repositoryUrl?: string | undefined;
        } & {
            name?: string | undefined;
            repositoryUrl?: string | undefined;
        } & { [K in Exclude<keyof I["models"][number], keyof Model>]: never; })[] & { [K_1 in Exclude<keyof I["models"], keyof {
            name?: string | undefined;
            repositoryUrl?: string | undefined;
        }[]>]: never; }) | undefined;
        pagination?: ({
            nextKey?: Uint8Array | undefined;
            total?: string | number | Long.Long | undefined;
        } & {
            nextKey?: Uint8Array | undefined;
            total?: string | number | (Long.Long & {
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
            } & { [K_2 in Exclude<keyof I["pagination"]["total"], keyof Long.Long>]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof QueryModelAllResponse>]: never; }>(object: I): QueryModelAllResponse;
};
export declare const QueryInferenceAgentRequest: {
    encode(message: QueryInferenceAgentRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryInferenceAgentRequest;
    fromJSON(object: any): QueryInferenceAgentRequest;
    toJSON(message: QueryInferenceAgentRequest): unknown;
    fromPartial<I extends {
        account?: string | undefined;
        modelName?: string | undefined;
        limit?: string | number | Long.Long | undefined;
    } & {
        account?: string | undefined;
        modelName?: string | undefined;
        limit?: string | number | (Long.Long & {
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
        } & { [K in Exclude<keyof I["limit"], keyof Long.Long>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof QueryInferenceAgentRequest>]: never; }>(object: I): QueryInferenceAgentRequest;
};
export declare const QueryInferenceAgentResponse: {
    encode(message: QueryInferenceAgentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryInferenceAgentResponse;
    fromJSON(object: any): QueryInferenceAgentResponse;
    toJSON(message: QueryInferenceAgentResponse): unknown;
    fromPartial<I extends {
        inferenceAgents?: {
            account?: string | undefined;
            modelName?: string | undefined;
            url?: string | undefined;
            lastHeartbeat?: Date | undefined;
            version?: string | number | Long.Long | undefined;
            status?: import("./agent").AgentStatus | undefined;
            lockBalance?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            prestige?: {
                count?: string | number | Long.Long | undefined;
                total?: string | number | Long.Long | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        inferenceAgents?: ({
            account?: string | undefined;
            modelName?: string | undefined;
            url?: string | undefined;
            lastHeartbeat?: Date | undefined;
            version?: string | number | Long.Long | undefined;
            status?: import("./agent").AgentStatus | undefined;
            lockBalance?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            prestige?: {
                count?: string | number | Long.Long | undefined;
                total?: string | number | Long.Long | undefined;
            } | undefined;
        }[] & ({
            account?: string | undefined;
            modelName?: string | undefined;
            url?: string | undefined;
            lastHeartbeat?: Date | undefined;
            version?: string | number | Long.Long | undefined;
            status?: import("./agent").AgentStatus | undefined;
            lockBalance?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            prestige?: {
                count?: string | number | Long.Long | undefined;
                total?: string | number | Long.Long | undefined;
            } | undefined;
        } & {
            account?: string | undefined;
            modelName?: string | undefined;
            url?: string | undefined;
            lastHeartbeat?: Date | undefined;
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
            } & { [K in Exclude<keyof I["inferenceAgents"][number]["version"], keyof Long.Long>]: never; }) | undefined;
            status?: import("./agent").AgentStatus | undefined;
            lockBalance?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & { [K_1 in Exclude<keyof I["inferenceAgents"][number]["lockBalance"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
            prestige?: ({
                count?: string | number | Long.Long | undefined;
                total?: string | number | Long.Long | undefined;
            } & {
                count?: string | number | (Long.Long & {
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
                } & { [K_2 in Exclude<keyof I["inferenceAgents"][number]["prestige"]["count"], keyof Long.Long>]: never; }) | undefined;
                total?: string | number | (Long.Long & {
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
                } & { [K_3 in Exclude<keyof I["inferenceAgents"][number]["prestige"]["total"], keyof Long.Long>]: never; }) | undefined;
            } & { [K_4 in Exclude<keyof I["inferenceAgents"][number]["prestige"], keyof import("./agent").Prestige>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["inferenceAgents"][number], keyof InferenceAgent>]: never; })[] & { [K_6 in Exclude<keyof I["inferenceAgents"], keyof {
            account?: string | undefined;
            modelName?: string | undefined;
            url?: string | undefined;
            lastHeartbeat?: Date | undefined;
            version?: string | number | Long.Long | undefined;
            status?: import("./agent").AgentStatus | undefined;
            lockBalance?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            prestige?: {
                count?: string | number | Long.Long | undefined;
                total?: string | number | Long.Long | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I, "inferenceAgents">]: never; }>(object: I): QueryInferenceAgentResponse;
};
export declare const QuerySessionRequest: {
    encode(message: QuerySessionRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySessionRequest;
    fromJSON(object: any): QuerySessionRequest;
    toJSON(message: QuerySessionRequest): unknown;
    fromPartial<I extends {
        id?: string | undefined;
    } & {
        id?: string | undefined;
    } & { [K in Exclude<keyof I, "id">]: never; }>(object: I): QuerySessionRequest;
};
export declare const QuerySessionResponse: {
    encode(message: QuerySessionResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySessionResponse;
    fromJSON(object: any): QuerySessionResponse;
    toJSON(message: QuerySessionResponse): unknown;
    fromPartial<I extends {
        session?: {
            sessionId?: string | undefined;
            account?: string | undefined;
            modelName?: string | undefined;
            agentAccount?: string | undefined;
            userLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            minerLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            expirationAt?: Date | undefined;
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
            status?: SessionStatus | undefined;
        } | undefined;
    } & {
        session?: ({
            sessionId?: string | undefined;
            account?: string | undefined;
            modelName?: string | undefined;
            agentAccount?: string | undefined;
            userLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            minerLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            expirationAt?: Date | undefined;
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
            status?: SessionStatus | undefined;
        } & {
            sessionId?: string | undefined;
            account?: string | undefined;
            modelName?: string | undefined;
            agentAccount?: string | undefined;
            userLock?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & { [K in Exclude<keyof I["session"]["userLock"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
            minerLock?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & { [K_1 in Exclude<keyof I["session"]["minerLock"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
            expirationAt?: Date | undefined;
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
                } & { [K_2 in Exclude<keyof I["session"]["payment"]["chatSeq"], keyof Long.Long>]: never; }) | undefined;
                totalPayment?: ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & { [K_3 in Exclude<keyof I["session"]["payment"]["totalPayment"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
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
                    } & { [K_4 in Exclude<keyof I["session"]["payment"]["contributions"][number]["rate"], keyof Long.Long>]: never; }) | undefined;
                    amount?: ({
                        denom?: string | undefined;
                        amount?: string | undefined;
                    } & {
                        denom?: string | undefined;
                        amount?: string | undefined;
                    } & { [K_5 in Exclude<keyof I["session"]["payment"]["contributions"][number]["amount"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
                } & { [K_6 in Exclude<keyof I["session"]["payment"]["contributions"][number], keyof import("./agent").PaymentContribution>]: never; })[] & { [K_7 in Exclude<keyof I["session"]["payment"]["contributions"], keyof {
                    account?: string | undefined;
                    rate?: string | number | Long.Long | undefined;
                    amount?: {
                        denom?: string | undefined;
                        amount?: string | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_8 in Exclude<keyof I["session"]["payment"], keyof import("./agent").Payment>]: never; }) | undefined;
            status?: SessionStatus | undefined;
        } & { [K_9 in Exclude<keyof I["session"], keyof Session>]: never; }) | undefined;
    } & { [K_10 in Exclude<keyof I, "session">]: never; }>(object: I): QuerySessionResponse;
};
export declare const QuerySessionByAgentRequest: {
    encode(message: QuerySessionByAgentRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySessionByAgentRequest;
    fromJSON(object: any): QuerySessionByAgentRequest;
    toJSON(message: QuerySessionByAgentRequest): unknown;
    fromPartial<I extends {
        account?: string | undefined;
        status?: SessionStatus | undefined;
        expireTime?: Date | undefined;
        limit?: string | number | Long.Long | undefined;
        orderDesc?: boolean | undefined;
    } & {
        account?: string | undefined;
        status?: SessionStatus | undefined;
        expireTime?: Date | undefined;
        limit?: string | number | (Long.Long & {
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
        } & { [K in Exclude<keyof I["limit"], keyof Long.Long>]: never; }) | undefined;
        orderDesc?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I, keyof QuerySessionByAgentRequest>]: never; }>(object: I): QuerySessionByAgentRequest;
};
export declare const QuerySessionByAgentResponse: {
    encode(message: QuerySessionByAgentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySessionByAgentResponse;
    fromJSON(object: any): QuerySessionByAgentResponse;
    toJSON(message: QuerySessionByAgentResponse): unknown;
    fromPartial<I extends {
        sessions?: {
            sessionId?: string | undefined;
            account?: string | undefined;
            modelName?: string | undefined;
            agentAccount?: string | undefined;
            userLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            minerLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            expirationAt?: Date | undefined;
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
            status?: SessionStatus | undefined;
        }[] | undefined;
    } & {
        sessions?: ({
            sessionId?: string | undefined;
            account?: string | undefined;
            modelName?: string | undefined;
            agentAccount?: string | undefined;
            userLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            minerLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            expirationAt?: Date | undefined;
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
            status?: SessionStatus | undefined;
        }[] & ({
            sessionId?: string | undefined;
            account?: string | undefined;
            modelName?: string | undefined;
            agentAccount?: string | undefined;
            userLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            minerLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            expirationAt?: Date | undefined;
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
            status?: SessionStatus | undefined;
        } & {
            sessionId?: string | undefined;
            account?: string | undefined;
            modelName?: string | undefined;
            agentAccount?: string | undefined;
            userLock?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & { [K in Exclude<keyof I["sessions"][number]["userLock"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
            minerLock?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & { [K_1 in Exclude<keyof I["sessions"][number]["minerLock"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
            expirationAt?: Date | undefined;
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
                } & { [K_2 in Exclude<keyof I["sessions"][number]["payment"]["chatSeq"], keyof Long.Long>]: never; }) | undefined;
                totalPayment?: ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & { [K_3 in Exclude<keyof I["sessions"][number]["payment"]["totalPayment"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
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
                    } & { [K_4 in Exclude<keyof I["sessions"][number]["payment"]["contributions"][number]["rate"], keyof Long.Long>]: never; }) | undefined;
                    amount?: ({
                        denom?: string | undefined;
                        amount?: string | undefined;
                    } & {
                        denom?: string | undefined;
                        amount?: string | undefined;
                    } & { [K_5 in Exclude<keyof I["sessions"][number]["payment"]["contributions"][number]["amount"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
                } & { [K_6 in Exclude<keyof I["sessions"][number]["payment"]["contributions"][number], keyof import("./agent").PaymentContribution>]: never; })[] & { [K_7 in Exclude<keyof I["sessions"][number]["payment"]["contributions"], keyof {
                    account?: string | undefined;
                    rate?: string | number | Long.Long | undefined;
                    amount?: {
                        denom?: string | undefined;
                        amount?: string | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_8 in Exclude<keyof I["sessions"][number]["payment"], keyof import("./agent").Payment>]: never; }) | undefined;
            status?: SessionStatus | undefined;
        } & { [K_9 in Exclude<keyof I["sessions"][number], keyof Session>]: never; })[] & { [K_10 in Exclude<keyof I["sessions"], keyof {
            sessionId?: string | undefined;
            account?: string | undefined;
            modelName?: string | undefined;
            agentAccount?: string | undefined;
            userLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            minerLock?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            expirationAt?: Date | undefined;
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
            status?: SessionStatus | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_11 in Exclude<keyof I, "sessions">]: never; }>(object: I): QuerySessionByAgentResponse;
};
export declare const QueryVRFSeedRequest: {
    encode(message: QueryVRFSeedRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryVRFSeedRequest;
    fromJSON(object: any): QueryVRFSeedRequest;
    toJSON(message: QueryVRFSeedRequest): unknown;
    fromPartial<I extends {
        account?: string | undefined;
    } & {
        account?: string | undefined;
    } & { [K in Exclude<keyof I, "account">]: never; }>(object: I): QueryVRFSeedRequest;
};
export declare const QueryVRFSeedResponse: {
    encode(message: QueryVRFSeedResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryVRFSeedResponse;
    fromJSON(object: any): QueryVRFSeedResponse;
    toJSON(message: QueryVRFSeedResponse): unknown;
    fromPartial<I extends {
        seed?: Uint8Array | undefined;
    } & {
        seed?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "seed">]: never; }>(object: I): QueryVRFSeedResponse;
};
export interface Query {
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    ModelRequest(request: QueryModelRequest): Promise<QueryModelResponse>;
    ModelRequestAll(request: QueryModelAllRequest): Promise<QueryModelAllResponse>;
    InferenceAgentRequest(request: QueryInferenceAgentRequest): Promise<QueryInferenceAgentResponse>;
    SessionRequest(request: QuerySessionRequest): Promise<QuerySessionResponse>;
    SessionByAgentRequest(request: QuerySessionByAgentRequest): Promise<QuerySessionByAgentResponse>;
    VRFSeedRequest(request: QueryVRFSeedRequest): Promise<QueryVRFSeedResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    ModelRequest(request: QueryModelRequest): Promise<QueryModelResponse>;
    ModelRequestAll(request: QueryModelAllRequest): Promise<QueryModelAllResponse>;
    InferenceAgentRequest(request: QueryInferenceAgentRequest): Promise<QueryInferenceAgentResponse>;
    SessionRequest(request: QuerySessionRequest): Promise<QuerySessionResponse>;
    SessionByAgentRequest(request: QuerySessionByAgentRequest): Promise<QuerySessionByAgentResponse>;
    VRFSeedRequest(request: QueryVRFSeedRequest): Promise<QueryVRFSeedResponse>;
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
