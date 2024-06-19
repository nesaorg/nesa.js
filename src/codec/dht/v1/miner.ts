/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dht.v1";

export interface Miner {
  nodeId: string;
  startBlock: Long;
  endBlock: Long;
  torchDtype: string;
  quantType: string;
  cacheTokensLeft: Long;
  inferenceRps: number;
  modelId: string;
  validUntil?: Date;
}

function createBaseMiner(): Miner {
  return {
    nodeId: "",
    startBlock: Long.UZERO,
    endBlock: Long.UZERO,
    torchDtype: "",
    quantType: "",
    cacheTokensLeft: Long.UZERO,
    inferenceRps: 0,
    modelId: "",
    validUntil: undefined,
  };
}

export const Miner = {
  encode(message: Miner, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    if (!message.startBlock.isZero()) {
      writer.uint32(16).uint64(message.startBlock);
    }
    if (!message.endBlock.isZero()) {
      writer.uint32(24).uint64(message.endBlock);
    }
    if (message.torchDtype !== "") {
      writer.uint32(34).string(message.torchDtype);
    }
    if (message.quantType !== "") {
      writer.uint32(42).string(message.quantType);
    }
    if (!message.cacheTokensLeft.isZero()) {
      writer.uint32(48).uint64(message.cacheTokensLeft);
    }
    if (message.inferenceRps !== 0) {
      writer.uint32(57).double(message.inferenceRps);
    }
    if (message.modelId !== "") {
      writer.uint32(66).string(message.modelId);
    }
    if (message.validUntil !== undefined) {
      Timestamp.encode(
        toTimestamp(message.validUntil),
        writer.uint32(74).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Miner {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMiner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nodeId = reader.string();
          break;
        case 2:
          message.startBlock = reader.uint64() as Long;
          break;
        case 3:
          message.endBlock = reader.uint64() as Long;
          break;
        case 4:
          message.torchDtype = reader.string();
          break;
        case 5:
          message.quantType = reader.string();
          break;
        case 6:
          message.cacheTokensLeft = reader.uint64() as Long;
          break;
        case 7:
          message.inferenceRps = reader.double();
          break;
        case 8:
          message.modelId = reader.string();
          break;
        case 9:
          message.validUntil = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Miner {
    return {
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
      startBlock: isSet(object.startBlock)
        ? Long.fromValue(object.startBlock)
        : Long.UZERO,
      endBlock: isSet(object.endBlock)
        ? Long.fromValue(object.endBlock)
        : Long.UZERO,
      torchDtype: isSet(object.torchDtype) ? String(object.torchDtype) : "",
      quantType: isSet(object.quantType) ? String(object.quantType) : "",
      cacheTokensLeft: isSet(object.cacheTokensLeft)
        ? Long.fromValue(object.cacheTokensLeft)
        : Long.UZERO,
      inferenceRps: isSet(object.inferenceRps)
        ? Number(object.inferenceRps)
        : 0,
      modelId: isSet(object.modelId) ? String(object.modelId) : "",
      validUntil: isSet(object.validUntil)
        ? fromJsonTimestamp(object.validUntil)
        : undefined,
    };
  },

  toJSON(message: Miner): unknown {
    const obj: any = {};
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    message.startBlock !== undefined &&
      (obj.startBlock = (message.startBlock || Long.UZERO).toString());
    message.endBlock !== undefined &&
      (obj.endBlock = (message.endBlock || Long.UZERO).toString());
    message.torchDtype !== undefined && (obj.torchDtype = message.torchDtype);
    message.quantType !== undefined && (obj.quantType = message.quantType);
    message.cacheTokensLeft !== undefined &&
      (obj.cacheTokensLeft = (
        message.cacheTokensLeft || Long.UZERO
      ).toString());
    message.inferenceRps !== undefined &&
      (obj.inferenceRps = message.inferenceRps);
    message.modelId !== undefined && (obj.modelId = message.modelId);
    message.validUntil !== undefined &&
      (obj.validUntil = message.validUntil.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Miner>, I>>(object: I): Miner {
    const message = createBaseMiner();
    message.nodeId = object.nodeId ?? "";
    message.startBlock =
      object.startBlock !== undefined && object.startBlock !== null
        ? Long.fromValue(object.startBlock)
        : Long.UZERO;
    message.endBlock =
      object.endBlock !== undefined && object.endBlock !== null
        ? Long.fromValue(object.endBlock)
        : Long.UZERO;
    message.torchDtype = object.torchDtype ?? "";
    message.quantType = object.quantType ?? "";
    message.cacheTokensLeft =
      object.cacheTokensLeft !== undefined && object.cacheTokensLeft !== null
        ? Long.fromValue(object.cacheTokensLeft)
        : Long.UZERO;
    message.inferenceRps = object.inferenceRps ?? 0;
    message.modelId = object.modelId ?? "";
    message.validUntil = object.validUntil ?? undefined;
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
