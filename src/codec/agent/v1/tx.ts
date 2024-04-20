/* eslint-disable */
import { Params, Payment } from "./agent";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "agent.v1";

export interface MsgUpdateParams {
  authority: string;
  params?: Params;
}

export interface MsgUpdateParamsResponse {}

export interface MsgRegisterModel {
  account: string;
  name: string;
  repositoryUrl: string;
}

export interface MsgRegisterModelResponse {}

export interface MsgRegisterInferenceAgent {
  account: string;
  url: string;
  version: Long;
  lockBalance?: Coin;
}

export interface MsgRegisterInferenceAgentResponse {}

export interface MsgUpdateInferenceAgent {
  account: string;
  url: string;
  version: Long;
  lockBalance?: Coin;
}

export interface MsgUpdateInferenceAgentResponse {}

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
}

export interface MsgSubmitPayment {
  account: string;
  sessionId: string;
  payment?: Payment;
  signature: Uint8Array;
}

export interface MsgSubmitPaymentResponse {}

export interface MsgClaimSession {
  account: string;
  sessionId: string;
}

export interface MsgClaimSessionResponse {}

export interface MsgCancelSession {
  account: string;
  sessionId: string;
}

export interface MsgCancelSessionResponse {}

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { authority: "", params: undefined };
}

export const MsgUpdateParams = {
  encode(
    message: MsgUpdateParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(
    object: I
  ): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse = {
  encode(
    _: MsgUpdateParamsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
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

  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },

  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(
    _: I
  ): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

function createBaseMsgRegisterModel(): MsgRegisterModel {
  return { account: "", name: "", repositoryUrl: "" };
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
    if (message.repositoryUrl !== "") {
      writer.uint32(26).string(message.repositoryUrl);
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
          message.repositoryUrl = reader.string();
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
      repositoryUrl: isSet(object.repositoryUrl)
        ? String(object.repositoryUrl)
        : "",
    };
  },

  toJSON(message: MsgRegisterModel): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.name !== undefined && (obj.name = message.name);
    message.repositoryUrl !== undefined &&
      (obj.repositoryUrl = message.repositoryUrl);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterModel>, I>>(
    object: I
  ): MsgRegisterModel {
    const message = createBaseMsgRegisterModel();
    message.account = object.account ?? "";
    message.name = object.name ?? "";
    message.repositoryUrl = object.repositoryUrl ?? "";
    return message;
  },
};

function createBaseMsgRegisterModelResponse(): MsgRegisterModelResponse {
  return {};
}

export const MsgRegisterModelResponse = {
  encode(
    _: MsgRegisterModelResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRegisterModelResponse {
    return {};
  },

  toJSON(_: MsgRegisterModelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterModelResponse>, I>>(
    _: I
  ): MsgRegisterModelResponse {
    const message = createBaseMsgRegisterModelResponse();
    return message;
  },
};

function createBaseMsgRegisterInferenceAgent(): MsgRegisterInferenceAgent {
  return { account: "", url: "", version: Long.UZERO, lockBalance: undefined };
}

export const MsgRegisterInferenceAgent = {
  encode(
    message: MsgRegisterInferenceAgent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (!message.version.isZero()) {
      writer.uint32(24).uint64(message.version);
    }
    if (message.lockBalance !== undefined) {
      Coin.encode(message.lockBalance, writer.uint32(34).fork()).ldelim();
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
          message.url = reader.string();
          break;
        case 3:
          message.version = reader.uint64() as Long;
          break;
        case 4:
          message.lockBalance = Coin.decode(reader, reader.uint32());
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
      url: isSet(object.url) ? String(object.url) : "",
      version: isSet(object.version)
        ? Long.fromValue(object.version)
        : Long.UZERO,
      lockBalance: isSet(object.lockBalance)
        ? Coin.fromJSON(object.lockBalance)
        : undefined,
    };
  },

  toJSON(message: MsgRegisterInferenceAgent): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.url !== undefined && (obj.url = message.url);
    message.version !== undefined &&
      (obj.version = (message.version || Long.UZERO).toString());
    message.lockBalance !== undefined &&
      (obj.lockBalance = message.lockBalance
        ? Coin.toJSON(message.lockBalance)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterInferenceAgent>, I>>(
    object: I
  ): MsgRegisterInferenceAgent {
    const message = createBaseMsgRegisterInferenceAgent();
    message.account = object.account ?? "";
    message.url = object.url ?? "";
    message.version =
      object.version !== undefined && object.version !== null
        ? Long.fromValue(object.version)
        : Long.UZERO;
    message.lockBalance =
      object.lockBalance !== undefined && object.lockBalance !== null
        ? Coin.fromPartial(object.lockBalance)
        : undefined;
    return message;
  },
};

function createBaseMsgRegisterInferenceAgentResponse(): MsgRegisterInferenceAgentResponse {
  return {};
}

export const MsgRegisterInferenceAgentResponse = {
  encode(
    _: MsgRegisterInferenceAgentResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRegisterInferenceAgentResponse {
    return {};
  },

  toJSON(_: MsgRegisterInferenceAgentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgRegisterInferenceAgentResponse>, I>
  >(_: I): MsgRegisterInferenceAgentResponse {
    const message = createBaseMsgRegisterInferenceAgentResponse();
    return message;
  },
};

function createBaseMsgUpdateInferenceAgent(): MsgUpdateInferenceAgent {
  return { account: "", url: "", version: Long.UZERO, lockBalance: undefined };
}

export const MsgUpdateInferenceAgent = {
  encode(
    message: MsgUpdateInferenceAgent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (!message.version.isZero()) {
      writer.uint32(24).uint64(message.version);
    }
    if (message.lockBalance !== undefined) {
      Coin.encode(message.lockBalance, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateInferenceAgent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateInferenceAgent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.url = reader.string();
          break;
        case 3:
          message.version = reader.uint64() as Long;
          break;
        case 4:
          message.lockBalance = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateInferenceAgent {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      url: isSet(object.url) ? String(object.url) : "",
      version: isSet(object.version)
        ? Long.fromValue(object.version)
        : Long.UZERO,
      lockBalance: isSet(object.lockBalance)
        ? Coin.fromJSON(object.lockBalance)
        : undefined,
    };
  },

  toJSON(message: MsgUpdateInferenceAgent): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.url !== undefined && (obj.url = message.url);
    message.version !== undefined &&
      (obj.version = (message.version || Long.UZERO).toString());
    message.lockBalance !== undefined &&
      (obj.lockBalance = message.lockBalance
        ? Coin.toJSON(message.lockBalance)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateInferenceAgent>, I>>(
    object: I
  ): MsgUpdateInferenceAgent {
    const message = createBaseMsgUpdateInferenceAgent();
    message.account = object.account ?? "";
    message.url = object.url ?? "";
    message.version =
      object.version !== undefined && object.version !== null
        ? Long.fromValue(object.version)
        : Long.UZERO;
    message.lockBalance =
      object.lockBalance !== undefined && object.lockBalance !== null
        ? Coin.fromPartial(object.lockBalance)
        : undefined;
    return message;
  },
};

function createBaseMsgUpdateInferenceAgentResponse(): MsgUpdateInferenceAgentResponse {
  return {};
}

export const MsgUpdateInferenceAgentResponse = {
  encode(
    _: MsgUpdateInferenceAgentResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateInferenceAgentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateInferenceAgentResponse();
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

  fromJSON(_: any): MsgUpdateInferenceAgentResponse {
    return {};
  },

  toJSON(_: MsgUpdateInferenceAgentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateInferenceAgentResponse>, I>>(
    _: I
  ): MsgUpdateInferenceAgentResponse {
    const message = createBaseMsgUpdateInferenceAgentResponse();
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
    modelName: "",
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
    if (message.modelName !== "") {
      writer.uint32(26).string(message.modelName);
    }
    if (message.lockBalance !== undefined) {
      Coin.encode(message.lockBalance, writer.uint32(34).fork()).ldelim();
    }
    if (message.vrf !== undefined) {
      VRF.encode(message.vrf, writer.uint32(42).fork()).ldelim();
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
          message.modelName = reader.string();
          break;
        case 4:
          message.lockBalance = Coin.decode(reader, reader.uint32());
          break;
        case 5:
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
      modelName: isSet(object.modelName) ? String(object.modelName) : "",
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
    message.modelName !== undefined && (obj.modelName = message.modelName);
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
    message.modelName = object.modelName ?? "";
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
  return { account: "" };
}

export const MsgRegisterSessionResponse = {
  encode(
    message: MsgRegisterSessionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
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
          message.account = reader.string();
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
      account: isSet(object.account) ? String(object.account) : "",
    };
  },

  toJSON(message: MsgRegisterSessionResponse): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterSessionResponse>, I>>(
    object: I
  ): MsgRegisterSessionResponse {
    const message = createBaseMsgRegisterSessionResponse();
    message.account = object.account ?? "";
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

function createBaseMsgClaimSession(): MsgClaimSession {
  return { account: "", sessionId: "" };
}

export const MsgClaimSession = {
  encode(
    message: MsgClaimSession,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.sessionId !== "") {
      writer.uint32(18).string(message.sessionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimSession {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimSession();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.sessionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimSession {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
    };
  },

  toJSON(message: MsgClaimSession): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimSession>, I>>(
    object: I
  ): MsgClaimSession {
    const message = createBaseMsgClaimSession();
    message.account = object.account ?? "";
    message.sessionId = object.sessionId ?? "";
    return message;
  },
};

function createBaseMsgClaimSessionResponse(): MsgClaimSessionResponse {
  return {};
}

export const MsgClaimSessionResponse = {
  encode(
    _: MsgClaimSessionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgClaimSessionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimSessionResponse();
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

  fromJSON(_: any): MsgClaimSessionResponse {
    return {};
  },

  toJSON(_: MsgClaimSessionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimSessionResponse>, I>>(
    _: I
  ): MsgClaimSessionResponse {
    const message = createBaseMsgClaimSessionResponse();
    return message;
  },
};

function createBaseMsgCancelSession(): MsgCancelSession {
  return { account: "", sessionId: "" };
}

export const MsgCancelSession = {
  encode(
    message: MsgCancelSession,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.sessionId !== "") {
      writer.uint32(18).string(message.sessionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelSession {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelSession();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.sessionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCancelSession {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
    };
  },

  toJSON(message: MsgCancelSession): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelSession>, I>>(
    object: I
  ): MsgCancelSession {
    const message = createBaseMsgCancelSession();
    message.account = object.account ?? "";
    message.sessionId = object.sessionId ?? "";
    return message;
  },
};

function createBaseMsgCancelSessionResponse(): MsgCancelSessionResponse {
  return {};
}

export const MsgCancelSessionResponse = {
  encode(
    _: MsgCancelSessionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCancelSessionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelSessionResponse();
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

  fromJSON(_: any): MsgCancelSessionResponse {
    return {};
  },

  toJSON(_: MsgCancelSessionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelSessionResponse>, I>>(
    _: I
  ): MsgCancelSessionResponse {
    const message = createBaseMsgCancelSessionResponse();
    return message;
  },
};

export interface Msg {
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  RegisterModel(request: MsgRegisterModel): Promise<MsgRegisterModelResponse>;
  RegisterInferenceAgent(
    request: MsgRegisterInferenceAgent
  ): Promise<MsgRegisterInferenceAgentResponse>;
  UpdateInferenceAgent(
    request: MsgUpdateInferenceAgent
  ): Promise<MsgUpdateInferenceAgentResponse>;
  RegisterSession(
    request: MsgRegisterSession
  ): Promise<MsgRegisterSessionResponse>;
  SubmitPayment(request: MsgSubmitPayment): Promise<MsgSubmitPaymentResponse>;
  ClaimSession(request: MsgClaimSession): Promise<MsgClaimSessionResponse>;
  CancelSession(request: MsgCancelSession): Promise<MsgCancelSessionResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UpdateParams = this.UpdateParams.bind(this);
    this.RegisterModel = this.RegisterModel.bind(this);
    this.RegisterInferenceAgent = this.RegisterInferenceAgent.bind(this);
    this.UpdateInferenceAgent = this.UpdateInferenceAgent.bind(this);
    this.RegisterSession = this.RegisterSession.bind(this);
    this.SubmitPayment = this.SubmitPayment.bind(this);
    this.ClaimSession = this.ClaimSession.bind(this);
    this.CancelSession = this.CancelSession.bind(this);
  }
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("agent.v1.Msg", "UpdateParams", data);
    return promise.then((data) =>
      MsgUpdateParamsResponse.decode(new _m0.Reader(data))
    );
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

  UpdateInferenceAgent(
    request: MsgUpdateInferenceAgent
  ): Promise<MsgUpdateInferenceAgentResponse> {
    const data = MsgUpdateInferenceAgent.encode(request).finish();
    const promise = this.rpc.request(
      "agent.v1.Msg",
      "UpdateInferenceAgent",
      data
    );
    return promise.then((data) =>
      MsgUpdateInferenceAgentResponse.decode(new _m0.Reader(data))
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

  ClaimSession(request: MsgClaimSession): Promise<MsgClaimSessionResponse> {
    const data = MsgClaimSession.encode(request).finish();
    const promise = this.rpc.request("agent.v1.Msg", "ClaimSession", data);
    return promise.then((data) =>
      MsgClaimSessionResponse.decode(new _m0.Reader(data))
    );
  }

  CancelSession(request: MsgCancelSession): Promise<MsgCancelSessionResponse> {
    const data = MsgCancelSession.encode(request).finish();
    const promise = this.rpc.request("agent.v1.Msg", "CancelSession", data);
    return promise.then((data) =>
      MsgCancelSessionResponse.decode(new _m0.Reader(data))
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