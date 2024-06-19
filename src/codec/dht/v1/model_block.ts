/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dht.v1";

export interface ModelBlock {
  modelId: string;
  nodeId: string;
  blockId: number;
  cid: string;
}

function createBaseModelBlock(): ModelBlock {
  return { modelId: "", nodeId: "", blockId: 0, cid: "" };
}

export const ModelBlock = {
  encode(
    message: ModelBlock,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.modelId !== "") {
      writer.uint32(10).string(message.modelId);
    }
    if (message.nodeId !== "") {
      writer.uint32(18).string(message.nodeId);
    }
    if (message.blockId !== 0) {
      writer.uint32(24).uint32(message.blockId);
    }
    if (message.cid !== "") {
      writer.uint32(34).string(message.cid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModelBlock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModelBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.modelId = reader.string();
          break;
        case 2:
          message.nodeId = reader.string();
          break;
        case 3:
          message.blockId = reader.uint32();
          break;
        case 4:
          message.cid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModelBlock {
    return {
      modelId: isSet(object.modelId) ? String(object.modelId) : "",
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
      blockId: isSet(object.blockId) ? Number(object.blockId) : 0,
      cid: isSet(object.cid) ? String(object.cid) : "",
    };
  },

  toJSON(message: ModelBlock): unknown {
    const obj: any = {};
    message.modelId !== undefined && (obj.modelId = message.modelId);
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    message.blockId !== undefined &&
      (obj.blockId = Math.round(message.blockId));
    message.cid !== undefined && (obj.cid = message.cid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModelBlock>, I>>(
    object: I
  ): ModelBlock {
    const message = createBaseModelBlock();
    message.modelId = object.modelId ?? "";
    message.nodeId = object.nodeId ?? "";
    message.blockId = object.blockId ?? 0;
    message.cid = object.cid ?? "";
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
