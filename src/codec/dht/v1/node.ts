/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dht.v1";

export interface Node {
  nodeId: string;
  publicName: string;
  version: string;
  networkAddress: string;
  walletAddress: string;
  vram: Long;
  networkRps: number;
  nextPings: Uint8Array[];
  usingRelay: boolean;
}

function createBaseNode(): Node {
  return {
    nodeId: "",
    publicName: "",
    version: "",
    networkAddress: "",
    walletAddress: "",
    vram: Long.UZERO,
    networkRps: 0,
    nextPings: [],
    usingRelay: false,
  };
}

export const Node = {
  encode(message: Node, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    if (message.publicName !== "") {
      writer.uint32(18).string(message.publicName);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    if (message.networkAddress !== "") {
      writer.uint32(34).string(message.networkAddress);
    }
    if (message.walletAddress !== "") {
      writer.uint32(42).string(message.walletAddress);
    }
    if (!message.vram.isZero()) {
      writer.uint32(48).uint64(message.vram);
    }
    if (message.networkRps !== 0) {
      writer.uint32(57).double(message.networkRps);
    }
    for (const v of message.nextPings) {
      writer.uint32(66).bytes(v!);
    }
    if (message.usingRelay === true) {
      writer.uint32(72).bool(message.usingRelay);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Node {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nodeId = reader.string();
          break;
        case 2:
          message.publicName = reader.string();
          break;
        case 3:
          message.version = reader.string();
          break;
        case 4:
          message.networkAddress = reader.string();
          break;
        case 5:
          message.walletAddress = reader.string();
          break;
        case 6:
          message.vram = reader.uint64() as Long;
          break;
        case 7:
          message.networkRps = reader.double();
          break;
        case 8:
          message.nextPings.push(reader.bytes());
          break;
        case 9:
          message.usingRelay = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Node {
    return {
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
      publicName: isSet(object.publicName) ? String(object.publicName) : "",
      version: isSet(object.version) ? String(object.version) : "",
      networkAddress: isSet(object.networkAddress)
        ? String(object.networkAddress)
        : "",
      walletAddress: isSet(object.walletAddress)
        ? String(object.walletAddress)
        : "",
      vram: isSet(object.vram) ? Long.fromValue(object.vram) : Long.UZERO,
      networkRps: isSet(object.networkRps) ? Number(object.networkRps) : 0,
      nextPings: Array.isArray(object?.nextPings)
        ? object.nextPings.map((e: any) => bytesFromBase64(e))
        : [],
      usingRelay: isSet(object.usingRelay) ? Boolean(object.usingRelay) : false,
    };
  },

  toJSON(message: Node): unknown {
    const obj: any = {};
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    message.publicName !== undefined && (obj.publicName = message.publicName);
    message.version !== undefined && (obj.version = message.version);
    message.networkAddress !== undefined &&
      (obj.networkAddress = message.networkAddress);
    message.walletAddress !== undefined &&
      (obj.walletAddress = message.walletAddress);
    message.vram !== undefined &&
      (obj.vram = (message.vram || Long.UZERO).toString());
    message.networkRps !== undefined && (obj.networkRps = message.networkRps);
    if (message.nextPings) {
      obj.nextPings = message.nextPings.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array())
      );
    } else {
      obj.nextPings = [];
    }
    message.usingRelay !== undefined && (obj.usingRelay = message.usingRelay);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Node>, I>>(object: I): Node {
    const message = createBaseNode();
    message.nodeId = object.nodeId ?? "";
    message.publicName = object.publicName ?? "";
    message.version = object.version ?? "";
    message.networkAddress = object.networkAddress ?? "";
    message.walletAddress = object.walletAddress ?? "";
    message.vram =
      object.vram !== undefined && object.vram !== null
        ? Long.fromValue(object.vram)
        : Long.UZERO;
    message.networkRps = object.networkRps ?? 0;
    message.nextPings = object.nextPings?.map((e) => e) || [];
    message.usingRelay = object.usingRelay ?? false;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

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
