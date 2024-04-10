/* eslint-disable */
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../google/protobuf/timestamp";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "agent.v1";

export interface GenesisState {
  params?: Params;
  startingModelId: Long;
  models: Model[];
  startingAgentId: Long;
  agents: InferenceAgent[];
  sessions: Session[];
}

export interface Params {}

export interface Model {
  id: Long;
  name: string;
  version: string;
}

export interface InferenceAgent {
  id: Long;
  account: string;
  modelId: Long;
  url: string;
  lastHeartbeat?: Date;
}

export interface Payment {
  chatSeq: Long;
  totalPayment?: Coin;
  merkleRoot: Uint8Array;
}

export interface Session {
  sessionId: string;
  account: string;
  modelId: Long;
  agentId: Long;
  lockBalance?: Coin;
  expirationAt?: Date;
  payment?: Payment;
}

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    startingModelId: Long.UZERO,
    models: [],
    startingAgentId: Long.UZERO,
    agents: [],
    sessions: [],
  };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (!message.startingModelId.isZero()) {
      writer.uint32(16).uint64(message.startingModelId);
    }
    for (const v of message.models) {
      Model.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (!message.startingAgentId.isZero()) {
      writer.uint32(32).uint64(message.startingAgentId);
    }
    for (const v of message.agents) {
      InferenceAgent.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.sessions) {
      Session.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.startingModelId = reader.uint64() as Long;
          break;
        case 3:
          message.models.push(Model.decode(reader, reader.uint32()));
          break;
        case 4:
          message.startingAgentId = reader.uint64() as Long;
          break;
        case 5:
          message.agents.push(InferenceAgent.decode(reader, reader.uint32()));
          break;
        case 6:
          message.sessions.push(Session.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      startingModelId: isSet(object.startingModelId)
        ? Long.fromValue(object.startingModelId)
        : Long.UZERO,
      models: Array.isArray(object?.models)
        ? object.models.map((e: any) => Model.fromJSON(e))
        : [],
      startingAgentId: isSet(object.startingAgentId)
        ? Long.fromValue(object.startingAgentId)
        : Long.UZERO,
      agents: Array.isArray(object?.agents)
        ? object.agents.map((e: any) => InferenceAgent.fromJSON(e))
        : [],
      sessions: Array.isArray(object?.sessions)
        ? object.sessions.map((e: any) => Session.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    message.startingModelId !== undefined &&
      (obj.startingModelId = (
        message.startingModelId || Long.UZERO
      ).toString());
    if (message.models) {
      obj.models = message.models.map((e) => (e ? Model.toJSON(e) : undefined));
    } else {
      obj.models = [];
    }
    message.startingAgentId !== undefined &&
      (obj.startingAgentId = (
        message.startingAgentId || Long.UZERO
      ).toString());
    if (message.agents) {
      obj.agents = message.agents.map((e) =>
        e ? InferenceAgent.toJSON(e) : undefined
      );
    } else {
      obj.agents = [];
    }
    if (message.sessions) {
      obj.sessions = message.sessions.map((e) =>
        e ? Session.toJSON(e) : undefined
      );
    } else {
      obj.sessions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I
  ): GenesisState {
    const message = createBaseGenesisState();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    message.startingModelId =
      object.startingModelId !== undefined && object.startingModelId !== null
        ? Long.fromValue(object.startingModelId)
        : Long.UZERO;
    message.models = object.models?.map((e) => Model.fromPartial(e)) || [];
    message.startingAgentId =
      object.startingAgentId !== undefined && object.startingAgentId !== null
        ? Long.fromValue(object.startingAgentId)
        : Long.UZERO;
    message.agents =
      object.agents?.map((e) => InferenceAgent.fromPartial(e)) || [];
    message.sessions =
      object.sessions?.map((e) => Session.fromPartial(e)) || [];
    return message;
  },
};

function createBaseParams(): Params {
  return {};
}

export const Params = {
  encode(_: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): Params {
    return {};
  },

  toJSON(_: Params): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(_: I): Params {
    const message = createBaseParams();
    return message;
  },
};

function createBaseModel(): Model {
  return { id: Long.UZERO, name: "", version: "" };
}

export const Model = {
  encode(message: Model, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Model {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Model {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      name: isSet(object.name) ? String(object.name) : "",
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: Model): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.name !== undefined && (obj.name = message.name);
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Model>, I>>(object: I): Model {
    const message = createBaseModel();
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.name = object.name ?? "";
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseInferenceAgent(): InferenceAgent {
  return {
    id: Long.UZERO,
    account: "",
    modelId: Long.UZERO,
    url: "",
    lastHeartbeat: undefined,
  };
}

export const InferenceAgent = {
  encode(
    message: InferenceAgent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    if (!message.modelId.isZero()) {
      writer.uint32(24).uint64(message.modelId);
    }
    if (message.url !== "") {
      writer.uint32(34).string(message.url);
    }
    if (message.lastHeartbeat !== undefined) {
      Timestamp.encode(
        toTimestamp(message.lastHeartbeat),
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InferenceAgent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInferenceAgent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        case 2:
          message.account = reader.string();
          break;
        case 3:
          message.modelId = reader.uint64() as Long;
          break;
        case 4:
          message.url = reader.string();
          break;
        case 5:
          message.lastHeartbeat = fromTimestamp(
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

  fromJSON(object: any): InferenceAgent {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      account: isSet(object.account) ? String(object.account) : "",
      modelId: isSet(object.modelId)
        ? Long.fromValue(object.modelId)
        : Long.UZERO,
      url: isSet(object.url) ? String(object.url) : "",
      lastHeartbeat: isSet(object.lastHeartbeat)
        ? fromJsonTimestamp(object.lastHeartbeat)
        : undefined,
    };
  },

  toJSON(message: InferenceAgent): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.account !== undefined && (obj.account = message.account);
    message.modelId !== undefined &&
      (obj.modelId = (message.modelId || Long.UZERO).toString());
    message.url !== undefined && (obj.url = message.url);
    message.lastHeartbeat !== undefined &&
      (obj.lastHeartbeat = message.lastHeartbeat.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InferenceAgent>, I>>(
    object: I
  ): InferenceAgent {
    const message = createBaseInferenceAgent();
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.account = object.account ?? "";
    message.modelId =
      object.modelId !== undefined && object.modelId !== null
        ? Long.fromValue(object.modelId)
        : Long.UZERO;
    message.url = object.url ?? "";
    message.lastHeartbeat = object.lastHeartbeat ?? undefined;
    return message;
  },
};

function createBasePayment(): Payment {
  return {
    chatSeq: Long.UZERO,
    totalPayment: undefined,
    merkleRoot: new Uint8Array(),
  };
}

export const Payment = {
  encode(
    message: Payment,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.chatSeq.isZero()) {
      writer.uint32(8).uint64(message.chatSeq);
    }
    if (message.totalPayment !== undefined) {
      Coin.encode(message.totalPayment, writer.uint32(18).fork()).ldelim();
    }
    if (message.merkleRoot.length !== 0) {
      writer.uint32(26).bytes(message.merkleRoot);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Payment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePayment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chatSeq = reader.uint64() as Long;
          break;
        case 2:
          message.totalPayment = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.merkleRoot = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Payment {
    return {
      chatSeq: isSet(object.chatSeq)
        ? Long.fromValue(object.chatSeq)
        : Long.UZERO,
      totalPayment: isSet(object.totalPayment)
        ? Coin.fromJSON(object.totalPayment)
        : undefined,
      merkleRoot: isSet(object.merkleRoot)
        ? bytesFromBase64(object.merkleRoot)
        : new Uint8Array(),
    };
  },

  toJSON(message: Payment): unknown {
    const obj: any = {};
    message.chatSeq !== undefined &&
      (obj.chatSeq = (message.chatSeq || Long.UZERO).toString());
    message.totalPayment !== undefined &&
      (obj.totalPayment = message.totalPayment
        ? Coin.toJSON(message.totalPayment)
        : undefined);
    message.merkleRoot !== undefined &&
      (obj.merkleRoot = base64FromBytes(
        message.merkleRoot !== undefined ? message.merkleRoot : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Payment>, I>>(object: I): Payment {
    const message = createBasePayment();
    message.chatSeq =
      object.chatSeq !== undefined && object.chatSeq !== null
        ? Long.fromValue(object.chatSeq)
        : Long.UZERO;
    message.totalPayment =
      object.totalPayment !== undefined && object.totalPayment !== null
        ? Coin.fromPartial(object.totalPayment)
        : undefined;
    message.merkleRoot = object.merkleRoot ?? new Uint8Array();
    return message;
  },
};

function createBaseSession(): Session {
  return {
    sessionId: "",
    account: "",
    modelId: Long.UZERO,
    agentId: Long.UZERO,
    lockBalance: undefined,
    expirationAt: undefined,
    payment: undefined,
  };
}

export const Session = {
  encode(
    message: Session,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionId !== "") {
      writer.uint32(10).string(message.sessionId);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    if (!message.modelId.isZero()) {
      writer.uint32(24).uint64(message.modelId);
    }
    if (!message.agentId.isZero()) {
      writer.uint32(32).uint64(message.agentId);
    }
    if (message.lockBalance !== undefined) {
      Coin.encode(message.lockBalance, writer.uint32(42).fork()).ldelim();
    }
    if (message.expirationAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.expirationAt),
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.payment !== undefined) {
      Payment.encode(message.payment, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Session {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSession();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sessionId = reader.string();
          break;
        case 2:
          message.account = reader.string();
          break;
        case 3:
          message.modelId = reader.uint64() as Long;
          break;
        case 4:
          message.agentId = reader.uint64() as Long;
          break;
        case 5:
          message.lockBalance = Coin.decode(reader, reader.uint32());
          break;
        case 6:
          message.expirationAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.payment = Payment.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Session {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      account: isSet(object.account) ? String(object.account) : "",
      modelId: isSet(object.modelId)
        ? Long.fromValue(object.modelId)
        : Long.UZERO,
      agentId: isSet(object.agentId)
        ? Long.fromValue(object.agentId)
        : Long.UZERO,
      lockBalance: isSet(object.lockBalance)
        ? Coin.fromJSON(object.lockBalance)
        : undefined,
      expirationAt: isSet(object.expirationAt)
        ? fromJsonTimestamp(object.expirationAt)
        : undefined,
      payment: isSet(object.payment)
        ? Payment.fromJSON(object.payment)
        : undefined,
    };
  },

  toJSON(message: Session): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.account !== undefined && (obj.account = message.account);
    message.modelId !== undefined &&
      (obj.modelId = (message.modelId || Long.UZERO).toString());
    message.agentId !== undefined &&
      (obj.agentId = (message.agentId || Long.UZERO).toString());
    message.lockBalance !== undefined &&
      (obj.lockBalance = message.lockBalance
        ? Coin.toJSON(message.lockBalance)
        : undefined);
    message.expirationAt !== undefined &&
      (obj.expirationAt = message.expirationAt.toISOString());
    message.payment !== undefined &&
      (obj.payment = message.payment
        ? Payment.toJSON(message.payment)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Session>, I>>(object: I): Session {
    const message = createBaseSession();
    message.sessionId = object.sessionId ?? "";
    message.account = object.account ?? "";
    message.modelId =
      object.modelId !== undefined && object.modelId !== null
        ? Long.fromValue(object.modelId)
        : Long.UZERO;
    message.agentId =
      object.agentId !== undefined && object.agentId !== null
        ? Long.fromValue(object.agentId)
        : Long.UZERO;
    message.lockBalance =
      object.lockBalance !== undefined && object.lockBalance !== null
        ? Coin.fromPartial(object.lockBalance)
        : undefined;
    message.expirationAt = object.expirationAt ?? undefined;
    message.payment =
      object.payment !== undefined && object.payment !== null
        ? Payment.fromPartial(object.payment)
        : undefined;
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
