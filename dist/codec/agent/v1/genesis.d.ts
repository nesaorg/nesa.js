import { Params, InnerValues, Model, InferenceAgent, Session, VrfSeed } from "./agent";
import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "agent.v1";
export interface GenesisState {
    params?: Params;
    innerValues?: InnerValues;
    models: Model[];
    agents: InferenceAgent[];
    sessions: Session[];
    vrfSeeds: VrfSeed[];
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
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
        innerValues?: {
            seed?: Uint8Array | undefined;
        } | undefined;
        models?: {
            name?: string | undefined;
            repositoryUrl?: string | undefined;
        }[] | undefined;
        agents?: {
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
            status?: import("./agent").SessionStatus | undefined;
        }[] | undefined;
        vrfSeeds?: {
            account?: string | undefined;
            seed?: Uint8Array | undefined;
        }[] | undefined;
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
        innerValues?: ({
            seed?: Uint8Array | undefined;
        } & {
            seed?: Uint8Array | undefined;
        } & { [K_9 in Exclude<keyof I["innerValues"], "seed">]: never; }) | undefined;
        models?: ({
            name?: string | undefined;
            repositoryUrl?: string | undefined;
        }[] & ({
            name?: string | undefined;
            repositoryUrl?: string | undefined;
        } & {
            name?: string | undefined;
            repositoryUrl?: string | undefined;
        } & { [K_10 in Exclude<keyof I["models"][number], keyof Model>]: never; })[] & { [K_11 in Exclude<keyof I["models"], keyof {
            name?: string | undefined;
            repositoryUrl?: string | undefined;
        }[]>]: never; }) | undefined;
        agents?: ({
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
            } & { [K_12 in Exclude<keyof I["agents"][number]["version"], keyof Long.Long>]: never; }) | undefined;
            status?: import("./agent").AgentStatus | undefined;
            lockBalance?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & { [K_13 in Exclude<keyof I["agents"][number]["lockBalance"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
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
                } & { [K_14 in Exclude<keyof I["agents"][number]["prestige"]["count"], keyof Long.Long>]: never; }) | undefined;
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
                } & { [K_15 in Exclude<keyof I["agents"][number]["prestige"]["total"], keyof Long.Long>]: never; }) | undefined;
            } & { [K_16 in Exclude<keyof I["agents"][number]["prestige"], keyof import("./agent").Prestige>]: never; }) | undefined;
        } & { [K_17 in Exclude<keyof I["agents"][number], keyof InferenceAgent>]: never; })[] & { [K_18 in Exclude<keyof I["agents"], keyof {
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
            status?: import("./agent").SessionStatus | undefined;
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
            status?: import("./agent").SessionStatus | undefined;
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
            } & { [K_19 in Exclude<keyof I["sessions"][number]["userLock"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
            minerLock?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & { [K_20 in Exclude<keyof I["sessions"][number]["minerLock"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
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
                } & { [K_21 in Exclude<keyof I["sessions"][number]["payment"]["chatSeq"], keyof Long.Long>]: never; }) | undefined;
                totalPayment?: ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & { [K_22 in Exclude<keyof I["sessions"][number]["payment"]["totalPayment"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
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
                    } & { [K_23 in Exclude<keyof I["sessions"][number]["payment"]["contributions"][number]["rate"], keyof Long.Long>]: never; }) | undefined;
                    amount?: ({
                        denom?: string | undefined;
                        amount?: string | undefined;
                    } & {
                        denom?: string | undefined;
                        amount?: string | undefined;
                    } & { [K_24 in Exclude<keyof I["sessions"][number]["payment"]["contributions"][number]["amount"], keyof import("../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
                } & { [K_25 in Exclude<keyof I["sessions"][number]["payment"]["contributions"][number], keyof import("./agent").PaymentContribution>]: never; })[] & { [K_26 in Exclude<keyof I["sessions"][number]["payment"]["contributions"], keyof {
                    account?: string | undefined;
                    rate?: string | number | Long.Long | undefined;
                    amount?: {
                        denom?: string | undefined;
                        amount?: string | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_27 in Exclude<keyof I["sessions"][number]["payment"], keyof import("./agent").Payment>]: never; }) | undefined;
            status?: import("./agent").SessionStatus | undefined;
        } & { [K_28 in Exclude<keyof I["sessions"][number], keyof Session>]: never; })[] & { [K_29 in Exclude<keyof I["sessions"], keyof {
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
            status?: import("./agent").SessionStatus | undefined;
        }[]>]: never; }) | undefined;
        vrfSeeds?: ({
            account?: string | undefined;
            seed?: Uint8Array | undefined;
        }[] & ({
            account?: string | undefined;
            seed?: Uint8Array | undefined;
        } & {
            account?: string | undefined;
            seed?: Uint8Array | undefined;
        } & { [K_30 in Exclude<keyof I["vrfSeeds"][number], keyof VrfSeed>]: never; })[] & { [K_31 in Exclude<keyof I["vrfSeeds"], keyof {
            account?: string | undefined;
            seed?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_32 in Exclude<keyof I, keyof GenesisState>]: never; }>(object: I): GenesisState;
};
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
