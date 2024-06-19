/* eslint-disable */
import { Params } from "./params";
import {
  Availability,
  InferenceType,
  availabilityFromJSON,
  inferenceTypeFromJSON,
  availabilityToJSON,
  inferenceTypeToJSON,
} from "./orchestrator";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dht.v1";

/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
  /**
   * authority is the address that controls the module (defaults to x/gov unless
   * overwritten).
   */
  authority: string;
  /** NOTE: All parameters must be supplied. */
  params?: Params;
}

/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {}

export interface MsgRegisterModel {
  creator: string;
  modelId: string;
  blockCids: string[];
}

export interface MsgRegisterModelResponse {}

export interface MsgRegisterNode {
  creator: string;
  nodeId: string;
  publicName: string;
  version: string;
  networkAddress: string;
  walletAddress: string;
  vram: Long;
  networkRps: number;
  usingRelay: boolean;
  nextPings: Uint8Array[];
}

export interface MsgRegisterNodeResponse {}

export interface MsgRegisterMiner {
  creator: string;
  nodeId: string;
  startBlock: Long;
  endBlock: Long;
  blockIds: number[];
  torchDtype: string;
  quantType: string;
  cacheTokensLeft: Long;
  inferenceRps: number;
  modelId: string;
}

export interface MsgRegisterMinerResponse {}

export interface MsgRegisterOrchestrator {
  creator: string;
  nodeId: string;
  status: Availability;
  blockCount: Long[];
  minerIds: string[];
  inferenceType: InferenceType;
}

export interface MsgRegisterOrchestratorResponse {}

export interface MsgOrchestratorHeartbeat {
  creator: string;
  nodeId: string;
}

export interface MsgOrchestratorHeartbeatResponse {}

export interface MsgMinerHeartbeat {
  creator: string;
  nodeId: string;
}

export interface MsgMinerHeartbeatResponse {}

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
  return { creator: "", modelId: "", blockCids: [] };
}

export const MsgRegisterModel = {
  encode(
    message: MsgRegisterModel,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.modelId !== "") {
      writer.uint32(18).string(message.modelId);
    }
    for (const v of message.blockCids) {
      writer.uint32(26).string(v!);
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
          message.creator = reader.string();
          break;
        case 2:
          message.modelId = reader.string();
          break;
        case 3:
          message.blockCids.push(reader.string());
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
      creator: isSet(object.creator) ? String(object.creator) : "",
      modelId: isSet(object.modelId) ? String(object.modelId) : "",
      blockCids: Array.isArray(object?.blockCids)
        ? object.blockCids.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: MsgRegisterModel): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.modelId !== undefined && (obj.modelId = message.modelId);
    if (message.blockCids) {
      obj.blockCids = message.blockCids.map((e) => e);
    } else {
      obj.blockCids = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterModel>, I>>(
    object: I
  ): MsgRegisterModel {
    const message = createBaseMsgRegisterModel();
    message.creator = object.creator ?? "";
    message.modelId = object.modelId ?? "";
    message.blockCids = object.blockCids?.map((e) => e) || [];
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

function createBaseMsgRegisterNode(): MsgRegisterNode {
  return {
    creator: "",
    nodeId: "",
    publicName: "",
    version: "",
    networkAddress: "",
    walletAddress: "",
    vram: Long.UZERO,
    networkRps: 0,
    usingRelay: false,
    nextPings: [],
  };
}

export const MsgRegisterNode = {
  encode(
    message: MsgRegisterNode,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.nodeId !== "") {
      writer.uint32(18).string(message.nodeId);
    }
    if (message.publicName !== "") {
      writer.uint32(26).string(message.publicName);
    }
    if (message.version !== "") {
      writer.uint32(34).string(message.version);
    }
    if (message.networkAddress !== "") {
      writer.uint32(42).string(message.networkAddress);
    }
    if (message.walletAddress !== "") {
      writer.uint32(50).string(message.walletAddress);
    }
    if (!message.vram.isZero()) {
      writer.uint32(56).uint64(message.vram);
    }
    if (message.networkRps !== 0) {
      writer.uint32(65).double(message.networkRps);
    }
    if (message.usingRelay === true) {
      writer.uint32(72).bool(message.usingRelay);
    }
    for (const v of message.nextPings) {
      writer.uint32(82).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterNode {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterNode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.nodeId = reader.string();
          break;
        case 3:
          message.publicName = reader.string();
          break;
        case 4:
          message.version = reader.string();
          break;
        case 5:
          message.networkAddress = reader.string();
          break;
        case 6:
          message.walletAddress = reader.string();
          break;
        case 7:
          message.vram = reader.uint64() as Long;
          break;
        case 8:
          message.networkRps = reader.double();
          break;
        case 9:
          message.usingRelay = reader.bool();
          break;
        case 10:
          message.nextPings.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterNode {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
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
      usingRelay: isSet(object.usingRelay) ? Boolean(object.usingRelay) : false,
      nextPings: Array.isArray(object?.nextPings)
        ? object.nextPings.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: MsgRegisterNode): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
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
    message.usingRelay !== undefined && (obj.usingRelay = message.usingRelay);
    if (message.nextPings) {
      obj.nextPings = message.nextPings.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array())
      );
    } else {
      obj.nextPings = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterNode>, I>>(
    object: I
  ): MsgRegisterNode {
    const message = createBaseMsgRegisterNode();
    message.creator = object.creator ?? "";
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
    message.usingRelay = object.usingRelay ?? false;
    message.nextPings = object.nextPings?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgRegisterNodeResponse(): MsgRegisterNodeResponse {
  return {};
}

export const MsgRegisterNodeResponse = {
  encode(
    _: MsgRegisterNodeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRegisterNodeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterNodeResponse();
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

  fromJSON(_: any): MsgRegisterNodeResponse {
    return {};
  },

  toJSON(_: MsgRegisterNodeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterNodeResponse>, I>>(
    _: I
  ): MsgRegisterNodeResponse {
    const message = createBaseMsgRegisterNodeResponse();
    return message;
  },
};

function createBaseMsgRegisterMiner(): MsgRegisterMiner {
  return {
    creator: "",
    nodeId: "",
    startBlock: Long.UZERO,
    endBlock: Long.UZERO,
    blockIds: [],
    torchDtype: "",
    quantType: "",
    cacheTokensLeft: Long.UZERO,
    inferenceRps: 0,
    modelId: "",
  };
}

export const MsgRegisterMiner = {
  encode(
    message: MsgRegisterMiner,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.nodeId !== "") {
      writer.uint32(18).string(message.nodeId);
    }
    if (!message.startBlock.isZero()) {
      writer.uint32(24).uint64(message.startBlock);
    }
    if (!message.endBlock.isZero()) {
      writer.uint32(32).uint64(message.endBlock);
    }
    writer.uint32(42).fork();
    for (const v of message.blockIds) {
      writer.uint32(v);
    }
    writer.ldelim();
    if (message.torchDtype !== "") {
      writer.uint32(50).string(message.torchDtype);
    }
    if (message.quantType !== "") {
      writer.uint32(58).string(message.quantType);
    }
    if (!message.cacheTokensLeft.isZero()) {
      writer.uint32(64).uint64(message.cacheTokensLeft);
    }
    if (message.inferenceRps !== 0) {
      writer.uint32(73).double(message.inferenceRps);
    }
    if (message.modelId !== "") {
      writer.uint32(82).string(message.modelId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterMiner {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterMiner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.nodeId = reader.string();
          break;
        case 3:
          message.startBlock = reader.uint64() as Long;
          break;
        case 4:
          message.endBlock = reader.uint64() as Long;
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.blockIds.push(reader.uint32());
            }
          } else {
            message.blockIds.push(reader.uint32());
          }
          break;
        case 6:
          message.torchDtype = reader.string();
          break;
        case 7:
          message.quantType = reader.string();
          break;
        case 8:
          message.cacheTokensLeft = reader.uint64() as Long;
          break;
        case 9:
          message.inferenceRps = reader.double();
          break;
        case 10:
          message.modelId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterMiner {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
      startBlock: isSet(object.startBlock)
        ? Long.fromValue(object.startBlock)
        : Long.UZERO,
      endBlock: isSet(object.endBlock)
        ? Long.fromValue(object.endBlock)
        : Long.UZERO,
      blockIds: Array.isArray(object?.blockIds)
        ? object.blockIds.map((e: any) => Number(e))
        : [],
      torchDtype: isSet(object.torchDtype) ? String(object.torchDtype) : "",
      quantType: isSet(object.quantType) ? String(object.quantType) : "",
      cacheTokensLeft: isSet(object.cacheTokensLeft)
        ? Long.fromValue(object.cacheTokensLeft)
        : Long.UZERO,
      inferenceRps: isSet(object.inferenceRps)
        ? Number(object.inferenceRps)
        : 0,
      modelId: isSet(object.modelId) ? String(object.modelId) : "",
    };
  },

  toJSON(message: MsgRegisterMiner): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    message.startBlock !== undefined &&
      (obj.startBlock = (message.startBlock || Long.UZERO).toString());
    message.endBlock !== undefined &&
      (obj.endBlock = (message.endBlock || Long.UZERO).toString());
    if (message.blockIds) {
      obj.blockIds = message.blockIds.map((e) => Math.round(e));
    } else {
      obj.blockIds = [];
    }
    message.torchDtype !== undefined && (obj.torchDtype = message.torchDtype);
    message.quantType !== undefined && (obj.quantType = message.quantType);
    message.cacheTokensLeft !== undefined &&
      (obj.cacheTokensLeft = (
        message.cacheTokensLeft || Long.UZERO
      ).toString());
    message.inferenceRps !== undefined &&
      (obj.inferenceRps = message.inferenceRps);
    message.modelId !== undefined && (obj.modelId = message.modelId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterMiner>, I>>(
    object: I
  ): MsgRegisterMiner {
    const message = createBaseMsgRegisterMiner();
    message.creator = object.creator ?? "";
    message.nodeId = object.nodeId ?? "";
    message.startBlock =
      object.startBlock !== undefined && object.startBlock !== null
        ? Long.fromValue(object.startBlock)
        : Long.UZERO;
    message.endBlock =
      object.endBlock !== undefined && object.endBlock !== null
        ? Long.fromValue(object.endBlock)
        : Long.UZERO;
    message.blockIds = object.blockIds?.map((e) => e) || [];
    message.torchDtype = object.torchDtype ?? "";
    message.quantType = object.quantType ?? "";
    message.cacheTokensLeft =
      object.cacheTokensLeft !== undefined && object.cacheTokensLeft !== null
        ? Long.fromValue(object.cacheTokensLeft)
        : Long.UZERO;
    message.inferenceRps = object.inferenceRps ?? 0;
    message.modelId = object.modelId ?? "";
    return message;
  },
};

function createBaseMsgRegisterMinerResponse(): MsgRegisterMinerResponse {
  return {};
}

export const MsgRegisterMinerResponse = {
  encode(
    _: MsgRegisterMinerResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRegisterMinerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterMinerResponse();
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

  fromJSON(_: any): MsgRegisterMinerResponse {
    return {};
  },

  toJSON(_: MsgRegisterMinerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterMinerResponse>, I>>(
    _: I
  ): MsgRegisterMinerResponse {
    const message = createBaseMsgRegisterMinerResponse();
    return message;
  },
};

function createBaseMsgRegisterOrchestrator(): MsgRegisterOrchestrator {
  return {
    creator: "",
    nodeId: "",
    status: 0,
    blockCount: [],
    minerIds: [],
    inferenceType: 0,
  };
}

export const MsgRegisterOrchestrator = {
  encode(
    message: MsgRegisterOrchestrator,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.nodeId !== "") {
      writer.uint32(18).string(message.nodeId);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    writer.uint32(34).fork();
    for (const v of message.blockCount) {
      writer.uint64(v);
    }
    writer.ldelim();
    for (const v of message.minerIds) {
      writer.uint32(42).string(v!);
    }
    if (message.inferenceType !== 0) {
      writer.uint32(48).int32(message.inferenceType);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRegisterOrchestrator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterOrchestrator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.nodeId = reader.string();
          break;
        case 3:
          message.status = reader.int32() as any;
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.blockCount.push(reader.uint64() as Long);
            }
          } else {
            message.blockCount.push(reader.uint64() as Long);
          }
          break;
        case 5:
          message.minerIds.push(reader.string());
          break;
        case 6:
          message.inferenceType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterOrchestrator {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
      status: isSet(object.status) ? availabilityFromJSON(object.status) : 0,
      blockCount: Array.isArray(object?.blockCount)
        ? object.blockCount.map((e: any) => Long.fromValue(e))
        : [],
      minerIds: Array.isArray(object?.minerIds)
        ? object.minerIds.map((e: any) => String(e))
        : [],
      inferenceType: isSet(object.inferenceType)
        ? inferenceTypeFromJSON(object.inferenceType)
        : 0,
    };
  },

  toJSON(message: MsgRegisterOrchestrator): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    message.status !== undefined &&
      (obj.status = availabilityToJSON(message.status));
    if (message.blockCount) {
      obj.blockCount = message.blockCount.map((e) =>
        (e || Long.UZERO).toString()
      );
    } else {
      obj.blockCount = [];
    }
    if (message.minerIds) {
      obj.minerIds = message.minerIds.map((e) => e);
    } else {
      obj.minerIds = [];
    }
    message.inferenceType !== undefined &&
      (obj.inferenceType = inferenceTypeToJSON(message.inferenceType));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterOrchestrator>, I>>(
    object: I
  ): MsgRegisterOrchestrator {
    const message = createBaseMsgRegisterOrchestrator();
    message.creator = object.creator ?? "";
    message.nodeId = object.nodeId ?? "";
    message.status = object.status ?? 0;
    message.blockCount = object.blockCount?.map((e) => Long.fromValue(e)) || [];
    message.minerIds = object.minerIds?.map((e) => e) || [];
    message.inferenceType = object.inferenceType ?? 0;
    return message;
  },
};

function createBaseMsgRegisterOrchestratorResponse(): MsgRegisterOrchestratorResponse {
  return {};
}

export const MsgRegisterOrchestratorResponse = {
  encode(
    _: MsgRegisterOrchestratorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRegisterOrchestratorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterOrchestratorResponse();
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

  fromJSON(_: any): MsgRegisterOrchestratorResponse {
    return {};
  },

  toJSON(_: MsgRegisterOrchestratorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterOrchestratorResponse>, I>>(
    _: I
  ): MsgRegisterOrchestratorResponse {
    const message = createBaseMsgRegisterOrchestratorResponse();
    return message;
  },
};

function createBaseMsgOrchestratorHeartbeat(): MsgOrchestratorHeartbeat {
  return { creator: "", nodeId: "" };
}

export const MsgOrchestratorHeartbeat = {
  encode(
    message: MsgOrchestratorHeartbeat,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.nodeId !== "") {
      writer.uint32(18).string(message.nodeId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgOrchestratorHeartbeat {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgOrchestratorHeartbeat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.nodeId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgOrchestratorHeartbeat {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
    };
  },

  toJSON(message: MsgOrchestratorHeartbeat): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgOrchestratorHeartbeat>, I>>(
    object: I
  ): MsgOrchestratorHeartbeat {
    const message = createBaseMsgOrchestratorHeartbeat();
    message.creator = object.creator ?? "";
    message.nodeId = object.nodeId ?? "";
    return message;
  },
};

function createBaseMsgOrchestratorHeartbeatResponse(): MsgOrchestratorHeartbeatResponse {
  return {};
}

export const MsgOrchestratorHeartbeatResponse = {
  encode(
    _: MsgOrchestratorHeartbeatResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgOrchestratorHeartbeatResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgOrchestratorHeartbeatResponse();
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

  fromJSON(_: any): MsgOrchestratorHeartbeatResponse {
    return {};
  },

  toJSON(_: MsgOrchestratorHeartbeatResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgOrchestratorHeartbeatResponse>, I>
  >(_: I): MsgOrchestratorHeartbeatResponse {
    const message = createBaseMsgOrchestratorHeartbeatResponse();
    return message;
  },
};

function createBaseMsgMinerHeartbeat(): MsgMinerHeartbeat {
  return { creator: "", nodeId: "" };
}

export const MsgMinerHeartbeat = {
  encode(
    message: MsgMinerHeartbeat,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.nodeId !== "") {
      writer.uint32(18).string(message.nodeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMinerHeartbeat {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMinerHeartbeat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.nodeId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMinerHeartbeat {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
    };
  },

  toJSON(message: MsgMinerHeartbeat): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMinerHeartbeat>, I>>(
    object: I
  ): MsgMinerHeartbeat {
    const message = createBaseMsgMinerHeartbeat();
    message.creator = object.creator ?? "";
    message.nodeId = object.nodeId ?? "";
    return message;
  },
};

function createBaseMsgMinerHeartbeatResponse(): MsgMinerHeartbeatResponse {
  return {};
}

export const MsgMinerHeartbeatResponse = {
  encode(
    _: MsgMinerHeartbeatResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgMinerHeartbeatResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMinerHeartbeatResponse();
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

  fromJSON(_: any): MsgMinerHeartbeatResponse {
    return {};
  },

  toJSON(_: MsgMinerHeartbeatResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMinerHeartbeatResponse>, I>>(
    _: I
  ): MsgMinerHeartbeatResponse {
    const message = createBaseMsgMinerHeartbeatResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  RegisterModel(request: MsgRegisterModel): Promise<MsgRegisterModelResponse>;
  RegisterNode(request: MsgRegisterNode): Promise<MsgRegisterNodeResponse>;
  RegisterMiner(request: MsgRegisterMiner): Promise<MsgRegisterMinerResponse>;
  RegisterOrchestrator(
    request: MsgRegisterOrchestrator
  ): Promise<MsgRegisterOrchestratorResponse>;
  OrchestratorHeartbeat(
    request: MsgOrchestratorHeartbeat
  ): Promise<MsgOrchestratorHeartbeatResponse>;
  MinerHeartbeat(
    request: MsgMinerHeartbeat
  ): Promise<MsgMinerHeartbeatResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UpdateParams = this.UpdateParams.bind(this);
    this.RegisterModel = this.RegisterModel.bind(this);
    this.RegisterNode = this.RegisterNode.bind(this);
    this.RegisterMiner = this.RegisterMiner.bind(this);
    this.RegisterOrchestrator = this.RegisterOrchestrator.bind(this);
    this.OrchestratorHeartbeat = this.OrchestratorHeartbeat.bind(this);
    this.MinerHeartbeat = this.MinerHeartbeat.bind(this);
  }
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("dht.v1.Msg", "UpdateParams", data);
    return promise.then((data) =>
      MsgUpdateParamsResponse.decode(new _m0.Reader(data))
    );
  }

  RegisterModel(request: MsgRegisterModel): Promise<MsgRegisterModelResponse> {
    const data = MsgRegisterModel.encode(request).finish();
    const promise = this.rpc.request("dht.v1.Msg", "RegisterModel", data);
    return promise.then((data) =>
      MsgRegisterModelResponse.decode(new _m0.Reader(data))
    );
  }

  RegisterNode(request: MsgRegisterNode): Promise<MsgRegisterNodeResponse> {
    const data = MsgRegisterNode.encode(request).finish();
    const promise = this.rpc.request("dht.v1.Msg", "RegisterNode", data);
    return promise.then((data) =>
      MsgRegisterNodeResponse.decode(new _m0.Reader(data))
    );
  }

  RegisterMiner(request: MsgRegisterMiner): Promise<MsgRegisterMinerResponse> {
    const data = MsgRegisterMiner.encode(request).finish();
    const promise = this.rpc.request("dht.v1.Msg", "RegisterMiner", data);
    return promise.then((data) =>
      MsgRegisterMinerResponse.decode(new _m0.Reader(data))
    );
  }

  RegisterOrchestrator(
    request: MsgRegisterOrchestrator
  ): Promise<MsgRegisterOrchestratorResponse> {
    const data = MsgRegisterOrchestrator.encode(request).finish();
    const promise = this.rpc.request(
      "dht.v1.Msg",
      "RegisterOrchestrator",
      data
    );
    return promise.then((data) =>
      MsgRegisterOrchestratorResponse.decode(new _m0.Reader(data))
    );
  }

  OrchestratorHeartbeat(
    request: MsgOrchestratorHeartbeat
  ): Promise<MsgOrchestratorHeartbeatResponse> {
    const data = MsgOrchestratorHeartbeat.encode(request).finish();
    const promise = this.rpc.request(
      "dht.v1.Msg",
      "OrchestratorHeartbeat",
      data
    );
    return promise.then((data) =>
      MsgOrchestratorHeartbeatResponse.decode(new _m0.Reader(data))
    );
  }

  MinerHeartbeat(
    request: MsgMinerHeartbeat
  ): Promise<MsgMinerHeartbeatResponse> {
    const data = MsgMinerHeartbeat.encode(request).finish();
    const promise = this.rpc.request("dht.v1.Msg", "MinerHeartbeat", data);
    return promise.then((data) =>
      MsgMinerHeartbeatResponse.decode(new _m0.Reader(data))
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
