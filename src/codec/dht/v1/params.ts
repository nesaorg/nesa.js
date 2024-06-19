/* eslint-disable */
import { Duration } from "../../google/protobuf/duration";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dht.v1";

/** Params defines the parameters for the module. */
export interface Params {
  orchestratorValidTime?: Duration;
  minerValidTime?: Duration;
  adminAccount: string;
}

function createBaseParams(): Params {
  return {
    orchestratorValidTime: undefined,
    minerValidTime: undefined,
    adminAccount: "",
  };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.orchestratorValidTime !== undefined) {
      Duration.encode(
        message.orchestratorValidTime,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.minerValidTime !== undefined) {
      Duration.encode(
        message.minerValidTime,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.adminAccount !== "") {
      writer.uint32(26).string(message.adminAccount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orchestratorValidTime = Duration.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.minerValidTime = Duration.decode(reader, reader.uint32());
          break;
        case 3:
          message.adminAccount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      orchestratorValidTime: isSet(object.orchestratorValidTime)
        ? Duration.fromJSON(object.orchestratorValidTime)
        : undefined,
      minerValidTime: isSet(object.minerValidTime)
        ? Duration.fromJSON(object.minerValidTime)
        : undefined,
      adminAccount: isSet(object.adminAccount)
        ? String(object.adminAccount)
        : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.orchestratorValidTime !== undefined &&
      (obj.orchestratorValidTime = message.orchestratorValidTime
        ? Duration.toJSON(message.orchestratorValidTime)
        : undefined);
    message.minerValidTime !== undefined &&
      (obj.minerValidTime = message.minerValidTime
        ? Duration.toJSON(message.minerValidTime)
        : undefined);
    message.adminAccount !== undefined &&
      (obj.adminAccount = message.adminAccount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.orchestratorValidTime =
      object.orchestratorValidTime !== undefined &&
      object.orchestratorValidTime !== null
        ? Duration.fromPartial(object.orchestratorValidTime)
        : undefined;
    message.minerValidTime =
      object.minerValidTime !== undefined && object.minerValidTime !== null
        ? Duration.fromPartial(object.minerValidTime)
        : undefined;
    message.adminAccount = object.adminAccount ?? "";
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
