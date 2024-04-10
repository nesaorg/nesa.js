/* eslint-disable */
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Payment } from "./genesis";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "agent.v1";

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

export interface MsgSubmitPaymentResponse {}

function createBaseMsgRegisterModel(): MsgRegisterModel {
  return { account: "", name: "", version: "" };
}

export const MsgRegisterModel = {
  encode(
    message: MsgRegisterModel,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterModel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterModel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
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

  fromJSON(object: any): MsgRegisterModel {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      name: isSet(object.name) ? String(object.name) : "",
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: MsgRegisterModel): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.name !== undefined && (obj.name = message.name);
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterModel>, I>>(
    object: I
  ): MsgRegisterModel {
    const message = createBaseMsgRegisterModel();
    message.account = object.account ?? "";
    message.name = object.name ?? "";
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseMsgRegisterModelResponse(): MsgRegisterModelResponse {
  return { modelId: Long.UZERO };
}

export const MsgRegisterModelResponse = {
  encode(
    message: MsgRegisterModelResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.modelId.isZero()) {
      writer.uint32(8).uint64(message.modelId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRegisterModelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterModelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.modelId = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterModelResponse {
    return {
      modelId: isSet(object.modelId)
        ? Long.fromValue(object.modelId)
        : Long.UZERO,
    };
  },

  toJSON(message: MsgRegisterModelResponse): unknown {
    const obj: any = {};
    message.modelId !== undefined &&
      (obj.modelId = (message.modelId || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterModelResponse>, I>>(
    object: I
  ): MsgRegisterModelResponse {
    const message = createBaseMsgRegisterModelResponse();
    message.modelId =
      object.modelId !== undefined && object.modelId !== null
        ? Long.fromValue(object.modelId)
        : Long.UZERO;
    return message;
  },
};

function createBaseMsgRegisterInferenceAgent(): MsgRegisterInferenceAgent {
  return { account: "", modelId: Long.UZERO, url: "" };
}

export const MsgRegisterInferenceAgent = {
  encode(
    message: MsgRegisterInferenceAgent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (!message.modelId.isZero()) {
      writer.uint32(16).uint64(message.modelId);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRegisterInferenceAgent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterInferenceAgent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.modelId = reader.uint64() as Long;
          break;
        case 3:
          message.url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterInferenceAgent {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      modelId: isSet(object.modelId)
        ? Long.fromValue(object.modelId)
        : Long.UZERO,
      url: isSet(object.url) ? String(object.url) : "",
    };
  },

  toJSON(message: MsgRegisterInferenceAgent): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.modelId !== undefined &&
      (obj.modelId = (message.modelId || Long.UZERO).toString());
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterInferenceAgent>, I>>(
    object: I
  ): MsgRegisterInferenceAgent {
    const message = createBaseMsgRegisterInferenceAgent();
    message.account = object.account ?? "";
    message.modelId =
      object.modelId !== undefined && object.modelId !== null
        ? Long.fromValue(object.modelId)
        : Long.UZERO;
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseMsgRegisterInferenceAgentResponse(): MsgRegisterInferenceAgentResponse {
  return { agentId: Long.UZERO };
}

export const MsgRegisterInferenceAgentResponse = {
  encode(
    message: MsgRegisterInferenceAgentResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.agentId.isZero()) {
      writer.uint32(8).uint64(message.agentId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRegisterInferenceAgentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterInferenceAgentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.agentId = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterInferenceAgentResponse {
    return {
      agentId: isSet(object.agentId)
        ? Long.fromValue(object.agentId)
        : Long.UZERO,
    };
  },

  toJSON(message: MsgRegisterInferenceAgentResponse): unknown {
    const obj: any = {};
    message.agentId !== undefined &&
      (obj.agentId = (message.agentId || Long.UZERO).toString());
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgRegisterInferenceAgentResponse>, I>
  >(object: I): MsgRegisterInferenceAgentResponse {
    const message = createBaseMsgRegisterInferenceAgentResponse();
    message.agentId =
      object.agentId !== undefined && object.agentId !== null
        ? Long.fromValue(object.agentId)
        : Long.UZERO;
    return message;
  },
};

function createBaseVRF(): VRF {
  return {
    seed: new Uint8Array(),
    proof: new Uint8Array(),
    hashRandom: new Uint8Array(),
  };
}

export const VRF = {
  encode(message: VRF, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.seed.length !== 0) {
      writer.uint32(10).bytes(message.seed);
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.hashRandom.length !== 0) {
      writer.uint32(26).bytes(message.hashRandom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VRF {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVRF();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seed = reader.bytes();
          break;
        case 2:
          message.proof = reader.bytes();
          break;
        case 3:
          message.hashRandom = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VRF {
    return {
      seed: isSet(object.seed)
        ? bytesFromBase64(object.seed)
        : new Uint8Array(),
      proof: isSet(object.proof)
        ? bytesFromBase64(object.proof)
        : new Uint8Array(),
      hashRandom: isSet(object.hashRandom)
        ? bytesFromBase64(object.hashRandom)
        : new Uint8Array(),
    };
  },

  toJSON(message: VRF): unknown {
    const obj: any = {};
    message.seed !== undefined &&
      (obj.seed = base64FromBytes(
        message.seed !== undefined ? message.seed : new Uint8Array()
      ));
    message.proof !== undefined &&
      (obj.proof = base64FromBytes(
        message.proof !== undefined ? message.proof : new Uint8Array()
      ));
    message.hashRandom !== undefined &&
      (obj.hashRandom = base64FromBytes(
        message.hashRandom !== undefined ? message.hashRandom : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VRF>, I>>(object: I): VRF {
    const message = createBaseVRF();
    message.seed = object.seed ?? new Uint8Array();
    message.proof = object.proof ?? new Uint8Array();
    message.hashRandom = object.hashRandom ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgRegisterSession(): MsgRegisterSession {
  return {
    sessionId: "",
    account: "",
    modelId: Long.UZERO,
    lockBalance: undefined,
    vrf: undefined,
  };
}

export const MsgRegisterSession = {
  encode(
    message: MsgRegisterSession,
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
    if (message.lockBalance !== undefined) {
      Coin.encode(message.lockBalance, writer.uint32(42).fork()).ldelim();
    }
    if (message.vrf !== undefined) {
      VRF.encode(message.vrf, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterSession {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterSession();
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
        case 5:
          message.lockBalance = Coin.decode(reader, reader.uint32());
          break;
        case 6:
          message.vrf = VRF.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterSession {
    return {
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      account: isSet(object.account) ? String(object.account) : "",
      modelId: isSet(object.modelId)
        ? Long.fromValue(object.modelId)
        : Long.UZERO,
      lockBalance: isSet(object.lockBalance)
        ? Coin.fromJSON(object.lockBalance)
        : undefined,
      vrf: isSet(object.vrf) ? VRF.fromJSON(object.vrf) : undefined,
    };
  },

  toJSON(message: MsgRegisterSession): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.account !== undefined && (obj.account = message.account);
    message.modelId !== undefined &&
      (obj.modelId = (message.modelId || Long.UZERO).toString());
    message.lockBalance !== undefined &&
      (obj.lockBalance = message.lockBalance
        ? Coin.toJSON(message.lockBalance)
        : undefined);
    message.vrf !== undefined &&
      (obj.vrf = message.vrf ? VRF.toJSON(message.vrf) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterSession>, I>>(
    object: I
  ): MsgRegisterSession {
    const message = createBaseMsgRegisterSession();
    message.sessionId = object.sessionId ?? "";
    message.account = object.account ?? "";
    message.modelId =
      object.modelId !== undefined && object.modelId !== null
        ? Long.fromValue(object.modelId)
        : Long.UZERO;
    message.lockBalance =
      object.lockBalance !== undefined && object.lockBalance !== null
        ? Coin.fromPartial(object.lockBalance)
        : undefined;
    message.vrf =
      object.vrf !== undefined && object.vrf !== null
        ? VRF.fromPartial(object.vrf)
        : undefined;
    return message;
  },
};

function createBaseMsgRegisterSessionResponse(): MsgRegisterSessionResponse {
  return { agentId: Long.UZERO };
}

export const MsgRegisterSessionResponse = {
  encode(
    message: MsgRegisterSessionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.agentId.isZero()) {
      writer.uint32(8).uint64(message.agentId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRegisterSessionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterSessionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.agentId = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterSessionResponse {
    return {
      agentId: isSet(object.agentId)
        ? Long.fromValue(object.agentId)
        : Long.UZERO,
    };
  },

  toJSON(message: MsgRegisterSessionResponse): unknown {
    const obj: any = {};
    message.agentId !== undefined &&
      (obj.agentId = (message.agentId || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterSessionResponse>, I>>(
    object: I
  ): MsgRegisterSessionResponse {
    const message = createBaseMsgRegisterSessionResponse();
    message.agentId =
      object.agentId !== undefined && object.agentId !== null
        ? Long.fromValue(object.agentId)
        : Long.UZERO;
    return message;
  },
};

function createBaseMsgSubmitPayment(): MsgSubmitPayment {
  return {
    account: "",
    sessionId: "",
    payment: undefined,
    signature: new Uint8Array(),
  };
}

export const MsgSubmitPayment = {
  encode(
    message: MsgSubmitPayment,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.sessionId !== "") {
      writer.uint32(18).string(message.sessionId);
    }
    if (message.payment !== undefined) {
      Payment.encode(message.payment, writer.uint32(26).fork()).ldelim();
    }
    if (message.signature.length !== 0) {
      writer.uint32(34).bytes(message.signature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitPayment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitPayment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.sessionId = reader.string();
          break;
        case 3:
          message.payment = Payment.decode(reader, reader.uint32());
          break;
        case 4:
          message.signature = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSubmitPayment {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      payment: isSet(object.payment)
        ? Payment.fromJSON(object.payment)
        : undefined,
      signature: isSet(object.signature)
        ? bytesFromBase64(object.signature)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgSubmitPayment): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.payment !== undefined &&
      (obj.payment = message.payment
        ? Payment.toJSON(message.payment)
        : undefined);
    message.signature !== undefined &&
      (obj.signature = base64FromBytes(
        message.signature !== undefined ? message.signature : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubmitPayment>, I>>(
    object: I
  ): MsgSubmitPayment {
    const message = createBaseMsgSubmitPayment();
    message.account = object.account ?? "";
    message.sessionId = object.sessionId ?? "";
    message.payment =
      object.payment !== undefined && object.payment !== null
        ? Payment.fromPartial(object.payment)
        : undefined;
    message.signature = object.signature ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgSubmitPaymentResponse(): MsgSubmitPaymentResponse {
  return {};
}

export const MsgSubmitPaymentResponse = {
  encode(
    _: MsgSubmitPaymentResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSubmitPaymentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitPaymentResponse();
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

  fromJSON(_: any): MsgSubmitPaymentResponse {
    return {};
  },

  toJSON(_: MsgSubmitPaymentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubmitPaymentResponse>, I>>(
    _: I
  ): MsgSubmitPaymentResponse {
    const message = createBaseMsgSubmitPaymentResponse();
    return message;
  },
};

export interface Msg {
  RegisterModel(request: MsgRegisterModel): Promise<MsgRegisterModelResponse>;
  RegisterInferenceAgent(
    request: MsgRegisterInferenceAgent
  ): Promise<MsgRegisterInferenceAgentResponse>;
  RegisterSession(
    request: MsgRegisterSession
  ): Promise<MsgRegisterSessionResponse>;
  SubmitPayment(request: MsgSubmitPayment): Promise<MsgSubmitPaymentResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.RegisterModel = this.RegisterModel.bind(this);
    this.RegisterInferenceAgent = this.RegisterInferenceAgent.bind(this);
    this.RegisterSession = this.RegisterSession.bind(this);
    this.SubmitPayment = this.SubmitPayment.bind(this);
  }
  RegisterModel(request: MsgRegisterModel): Promise<MsgRegisterModelResponse> {
    const data = MsgRegisterModel.encode(request).finish();
    const promise = this.rpc.request("agent.v1.Msg", "RegisterModel", data);
    return promise.then((data) =>
      MsgRegisterModelResponse.decode(new _m0.Reader(data))
    );
  }

  RegisterInferenceAgent(
    request: MsgRegisterInferenceAgent
  ): Promise<MsgRegisterInferenceAgentResponse> {
    const data = MsgRegisterInferenceAgent.encode(request).finish();
    const promise = this.rpc.request(
      "agent.v1.Msg",
      "RegisterInferenceAgent",
      data
    );
    return promise.then((data) =>
      MsgRegisterInferenceAgentResponse.decode(new _m0.Reader(data))
    );
  }

  RegisterSession(
    request: MsgRegisterSession
  ): Promise<MsgRegisterSessionResponse> {
    const data = MsgRegisterSession.encode(request).finish();
    const promise = this.rpc.request("agent.v1.Msg", "RegisterSession", data);
    return promise.then((data) =>
      MsgRegisterSessionResponse.decode(new _m0.Reader(data))
    );
  }

  SubmitPayment(request: MsgSubmitPayment): Promise<MsgSubmitPaymentResponse> {
    const data = MsgSubmitPayment.encode(request).finish();
    const promise = this.rpc.request("agent.v1.Msg", "SubmitPayment", data);
    return promise.then((data) =>
      MsgSubmitPaymentResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
