/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dht.v1";

export enum Availability {
  READY = 0,
  LOADING = 1,
  IDLE = 2,
  UNRECOGNIZED = -1,
}

export function availabilityFromJSON(object: any): Availability {
  switch (object) {
    case 0:
    case "READY":
      return Availability.READY;
    case 1:
    case "LOADING":
      return Availability.LOADING;
    case 2:
    case "IDLE":
      return Availability.IDLE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Availability.UNRECOGNIZED;
  }
}

export function availabilityToJSON(object: Availability): string {
  switch (object) {
    case Availability.READY:
      return "READY";
    case Availability.LOADING:
      return "LOADING";
    case Availability.IDLE:
      return "IDLE";
    case Availability.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum InferenceType {
  DISTRIBUTED = 0,
  NON_DISTRIBUTED = 1,
  UNRECOGNIZED = -1,
}

export function inferenceTypeFromJSON(object: any): InferenceType {
  switch (object) {
    case 0:
    case "DISTRIBUTED":
      return InferenceType.DISTRIBUTED;
    case 1:
    case "NON_DISTRIBUTED":
      return InferenceType.NON_DISTRIBUTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InferenceType.UNRECOGNIZED;
  }
}

export function inferenceTypeToJSON(object: InferenceType): string {
  switch (object) {
    case InferenceType.DISTRIBUTED:
      return "DISTRIBUTED";
    case InferenceType.NON_DISTRIBUTED:
      return "NON_DISTRIBUTED";
    case InferenceType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Orchestrator {
  nodeId: string;
  modelId: string;
  inferenceType: InferenceType;
  status: Availability;
  blockCount: Long[];
  validUntil?: Date;
}

function createBaseOrchestrator(): Orchestrator {
  return {
    nodeId: "",
    modelId: "",
    inferenceType: 0,
    status: 0,
    blockCount: [],
    validUntil: undefined,
  };
}

export const Orchestrator = {
  encode(
    message: Orchestrator,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    if (message.modelId !== "") {
      writer.uint32(18).string(message.modelId);
    }
    if (message.inferenceType !== 0) {
      writer.uint32(24).int32(message.inferenceType);
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    writer.uint32(42).fork();
    for (const v of message.blockCount) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.validUntil !== undefined) {
      Timestamp.encode(
        toTimestamp(message.validUntil),
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Orchestrator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrchestrator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nodeId = reader.string();
          break;
        case 2:
          message.modelId = reader.string();
          break;
        case 3:
          message.inferenceType = reader.int32() as any;
          break;
        case 4:
          message.status = reader.int32() as any;
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.blockCount.push(reader.uint64() as Long);
            }
          } else {
            message.blockCount.push(reader.uint64() as Long);
          }
          break;
        case 6:
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

  fromJSON(object: any): Orchestrator {
    return {
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
      modelId: isSet(object.modelId) ? String(object.modelId) : "",
      inferenceType: isSet(object.inferenceType)
        ? inferenceTypeFromJSON(object.inferenceType)
        : 0,
      status: isSet(object.status) ? availabilityFromJSON(object.status) : 0,
      blockCount: Array.isArray(object?.blockCount)
        ? object.blockCount.map((e: any) => Long.fromValue(e))
        : [],
      validUntil: isSet(object.validUntil)
        ? fromJsonTimestamp(object.validUntil)
        : undefined,
    };
  },

  toJSON(message: Orchestrator): unknown {
    const obj: any = {};
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    message.modelId !== undefined && (obj.modelId = message.modelId);
    message.inferenceType !== undefined &&
      (obj.inferenceType = inferenceTypeToJSON(message.inferenceType));
    message.status !== undefined &&
      (obj.status = availabilityToJSON(message.status));
    if (message.blockCount) {
      obj.blockCount = message.blockCount.map((e) =>
        (e || Long.UZERO).toString()
      );
    } else {
      obj.blockCount = [];
    }
    message.validUntil !== undefined &&
      (obj.validUntil = message.validUntil.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Orchestrator>, I>>(
    object: I
  ): Orchestrator {
    const message = createBaseOrchestrator();
    message.nodeId = object.nodeId ?? "";
    message.modelId = object.modelId ?? "";
    message.inferenceType = object.inferenceType ?? 0;
    message.status = object.status ?? 0;
    message.blockCount = object.blockCount?.map((e) => Long.fromValue(e)) || [];
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
