/* eslint-disable */
import { Params } from "./params";
import { Model } from "./model";
import {
  PageRequest,
  PageResponse,
} from "../../cosmos/base/query/v1beta1/pagination";
import { Node } from "./node";
import { Miner } from "./miner";
import {
  Orchestrator,
  InferenceType,
  Availability,
  inferenceTypeFromJSON,
  availabilityFromJSON,
  inferenceTypeToJSON,
  availabilityToJSON,
} from "./orchestrator";
import Long from "long";
import { ModelBlock } from "./model_block";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dht.v1";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: Params;
}

export interface QueryGetModelRequest {
  modelId: string;
}

export interface QueryGetModelResponse {
  model?: Model;
}

export interface QueryGetModelBlocksRequest {
  modelId: string;
  pagination?: PageRequest;
}

export interface QueryGetModelBlocksResponse {
  blocks: ModelBlock[];
  pagination?: PageResponse;
}

export interface QueryGetNodeRequest {
  nodeId: string;
}

export interface QueryGetNodeResponse {
  node?: Node;
}

export interface QueryGetMinerRequest {
  nodeId: string;
}

export interface QueryGetMinerResponse {
  miner?: Miner;
  node?: Node;
}

export interface QueryGetOrchestratorRequest {
  nodeId: string;
}

export interface QueryGetOrchestratorResponse {
  orchestrator?: Orchestrator;
  node?: Node;
}

export interface QueryGetAllOrchestratorRequest {
  inferenceType: InferenceType;
  status: Availability;
  limit: number;
  key: Uint8Array;
}

export interface QueryGetAllOrchestratorResponse {
  orchestrators: Orchestrator[];
  nextKey: Uint8Array;
}

export interface QueryGetOrchestratorHeartbeatRequest {
  nodeId: string;
}

export interface QueryGetOrchestratorHeartbeatResponse {
  timestamp: number;
}

export interface QueryGetMinerHeartbeatRequest {
  nodeId: string;
}

export interface QueryGetMinerHeartbeatResponse {
  timestamp: number;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(
    _: QueryParamsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(
    _: I
  ): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(
    object: I
  ): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseQueryGetModelRequest(): QueryGetModelRequest {
  return { modelId: "" };
}

export const QueryGetModelRequest = {
  encode(
    message: QueryGetModelRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.modelId !== "") {
      writer.uint32(10).string(message.modelId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetModelRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetModelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.modelId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetModelRequest {
    return {
      modelId: isSet(object.modelId) ? String(object.modelId) : "",
    };
  },

  toJSON(message: QueryGetModelRequest): unknown {
    const obj: any = {};
    message.modelId !== undefined && (obj.modelId = message.modelId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetModelRequest>, I>>(
    object: I
  ): QueryGetModelRequest {
    const message = createBaseQueryGetModelRequest();
    message.modelId = object.modelId ?? "";
    return message;
  },
};

function createBaseQueryGetModelResponse(): QueryGetModelResponse {
  return { model: undefined };
}

export const QueryGetModelResponse = {
  encode(
    message: QueryGetModelResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.model !== undefined) {
      Model.encode(message.model, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetModelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetModelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.model = Model.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetModelResponse {
    return {
      model: isSet(object.model) ? Model.fromJSON(object.model) : undefined,
    };
  },

  toJSON(message: QueryGetModelResponse): unknown {
    const obj: any = {};
    message.model !== undefined &&
      (obj.model = message.model ? Model.toJSON(message.model) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetModelResponse>, I>>(
    object: I
  ): QueryGetModelResponse {
    const message = createBaseQueryGetModelResponse();
    message.model =
      object.model !== undefined && object.model !== null
        ? Model.fromPartial(object.model)
        : undefined;
    return message;
  },
};

function createBaseQueryGetModelBlocksRequest(): QueryGetModelBlocksRequest {
  return { modelId: "", pagination: undefined };
}

export const QueryGetModelBlocksRequest = {
  encode(
    message: QueryGetModelBlocksRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.modelId !== "") {
      writer.uint32(10).string(message.modelId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetModelBlocksRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetModelBlocksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.modelId = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetModelBlocksRequest {
    return {
      modelId: isSet(object.modelId) ? String(object.modelId) : "",
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryGetModelBlocksRequest): unknown {
    const obj: any = {};
    message.modelId !== undefined && (obj.modelId = message.modelId);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetModelBlocksRequest>, I>>(
    object: I
  ): QueryGetModelBlocksRequest {
    const message = createBaseQueryGetModelBlocksRequest();
    message.modelId = object.modelId ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryGetModelBlocksResponse(): QueryGetModelBlocksResponse {
  return { blocks: [], pagination: undefined };
}

export const QueryGetModelBlocksResponse = {
  encode(
    message: QueryGetModelBlocksResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.blocks) {
      ModelBlock.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetModelBlocksResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetModelBlocksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blocks.push(ModelBlock.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetModelBlocksResponse {
    return {
      blocks: Array.isArray(object?.blocks)
        ? object.blocks.map((e: any) => ModelBlock.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryGetModelBlocksResponse): unknown {
    const obj: any = {};
    if (message.blocks) {
      obj.blocks = message.blocks.map((e) =>
        e ? ModelBlock.toJSON(e) : undefined
      );
    } else {
      obj.blocks = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetModelBlocksResponse>, I>>(
    object: I
  ): QueryGetModelBlocksResponse {
    const message = createBaseQueryGetModelBlocksResponse();
    message.blocks = object.blocks?.map((e) => ModelBlock.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryGetNodeRequest(): QueryGetNodeRequest {
  return { nodeId: "" };
}

export const QueryGetNodeRequest = {
  encode(
    message: QueryGetNodeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetNodeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetNodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nodeId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetNodeRequest {
    return {
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
    };
  },

  toJSON(message: QueryGetNodeRequest): unknown {
    const obj: any = {};
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetNodeRequest>, I>>(
    object: I
  ): QueryGetNodeRequest {
    const message = createBaseQueryGetNodeRequest();
    message.nodeId = object.nodeId ?? "";
    return message;
  },
};

function createBaseQueryGetNodeResponse(): QueryGetNodeResponse {
  return { node: undefined };
}

export const QueryGetNodeResponse = {
  encode(
    message: QueryGetNodeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.node !== undefined) {
      Node.encode(message.node, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetNodeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetNodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.node = Node.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetNodeResponse {
    return {
      node: isSet(object.node) ? Node.fromJSON(object.node) : undefined,
    };
  },

  toJSON(message: QueryGetNodeResponse): unknown {
    const obj: any = {};
    message.node !== undefined &&
      (obj.node = message.node ? Node.toJSON(message.node) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetNodeResponse>, I>>(
    object: I
  ): QueryGetNodeResponse {
    const message = createBaseQueryGetNodeResponse();
    message.node =
      object.node !== undefined && object.node !== null
        ? Node.fromPartial(object.node)
        : undefined;
    return message;
  },
};

function createBaseQueryGetMinerRequest(): QueryGetMinerRequest {
  return { nodeId: "" };
}

export const QueryGetMinerRequest = {
  encode(
    message: QueryGetMinerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetMinerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetMinerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nodeId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetMinerRequest {
    return {
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
    };
  },

  toJSON(message: QueryGetMinerRequest): unknown {
    const obj: any = {};
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetMinerRequest>, I>>(
    object: I
  ): QueryGetMinerRequest {
    const message = createBaseQueryGetMinerRequest();
    message.nodeId = object.nodeId ?? "";
    return message;
  },
};

function createBaseQueryGetMinerResponse(): QueryGetMinerResponse {
  return { miner: undefined, node: undefined };
}

export const QueryGetMinerResponse = {
  encode(
    message: QueryGetMinerResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.miner !== undefined) {
      Miner.encode(message.miner, writer.uint32(10).fork()).ldelim();
    }
    if (message.node !== undefined) {
      Node.encode(message.node, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetMinerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetMinerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.miner = Miner.decode(reader, reader.uint32());
          break;
        case 2:
          message.node = Node.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetMinerResponse {
    return {
      miner: isSet(object.miner) ? Miner.fromJSON(object.miner) : undefined,
      node: isSet(object.node) ? Node.fromJSON(object.node) : undefined,
    };
  },

  toJSON(message: QueryGetMinerResponse): unknown {
    const obj: any = {};
    message.miner !== undefined &&
      (obj.miner = message.miner ? Miner.toJSON(message.miner) : undefined);
    message.node !== undefined &&
      (obj.node = message.node ? Node.toJSON(message.node) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetMinerResponse>, I>>(
    object: I
  ): QueryGetMinerResponse {
    const message = createBaseQueryGetMinerResponse();
    message.miner =
      object.miner !== undefined && object.miner !== null
        ? Miner.fromPartial(object.miner)
        : undefined;
    message.node =
      object.node !== undefined && object.node !== null
        ? Node.fromPartial(object.node)
        : undefined;
    return message;
  },
};

function createBaseQueryGetOrchestratorRequest(): QueryGetOrchestratorRequest {
  return { nodeId: "" };
}

export const QueryGetOrchestratorRequest = {
  encode(
    message: QueryGetOrchestratorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetOrchestratorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetOrchestratorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nodeId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetOrchestratorRequest {
    return {
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
    };
  },

  toJSON(message: QueryGetOrchestratorRequest): unknown {
    const obj: any = {};
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetOrchestratorRequest>, I>>(
    object: I
  ): QueryGetOrchestratorRequest {
    const message = createBaseQueryGetOrchestratorRequest();
    message.nodeId = object.nodeId ?? "";
    return message;
  },
};

function createBaseQueryGetOrchestratorResponse(): QueryGetOrchestratorResponse {
  return { orchestrator: undefined, node: undefined };
}

export const QueryGetOrchestratorResponse = {
  encode(
    message: QueryGetOrchestratorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.orchestrator !== undefined) {
      Orchestrator.encode(
        message.orchestrator,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.node !== undefined) {
      Node.encode(message.node, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetOrchestratorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetOrchestratorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orchestrator = Orchestrator.decode(reader, reader.uint32());
          break;
        case 2:
          message.node = Node.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetOrchestratorResponse {
    return {
      orchestrator: isSet(object.orchestrator)
        ? Orchestrator.fromJSON(object.orchestrator)
        : undefined,
      node: isSet(object.node) ? Node.fromJSON(object.node) : undefined,
    };
  },

  toJSON(message: QueryGetOrchestratorResponse): unknown {
    const obj: any = {};
    message.orchestrator !== undefined &&
      (obj.orchestrator = message.orchestrator
        ? Orchestrator.toJSON(message.orchestrator)
        : undefined);
    message.node !== undefined &&
      (obj.node = message.node ? Node.toJSON(message.node) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetOrchestratorResponse>, I>>(
    object: I
  ): QueryGetOrchestratorResponse {
    const message = createBaseQueryGetOrchestratorResponse();
    message.orchestrator =
      object.orchestrator !== undefined && object.orchestrator !== null
        ? Orchestrator.fromPartial(object.orchestrator)
        : undefined;
    message.node =
      object.node !== undefined && object.node !== null
        ? Node.fromPartial(object.node)
        : undefined;
    return message;
  },
};

function createBaseQueryGetAllOrchestratorRequest(): QueryGetAllOrchestratorRequest {
  return { inferenceType: 0, status: 0, limit: 0, key: new Uint8Array() };
}

export const QueryGetAllOrchestratorRequest = {
  encode(
    message: QueryGetAllOrchestratorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.inferenceType !== 0) {
      writer.uint32(8).int32(message.inferenceType);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.limit !== 0) {
      writer.uint32(32).uint32(message.limit);
    }
    if (message.key.length !== 0) {
      writer.uint32(42).bytes(message.key);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetAllOrchestratorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAllOrchestratorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inferenceType = reader.int32() as any;
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 4:
          message.limit = reader.uint32();
          break;
        case 5:
          message.key = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAllOrchestratorRequest {
    return {
      inferenceType: isSet(object.inferenceType)
        ? inferenceTypeFromJSON(object.inferenceType)
        : 0,
      status: isSet(object.status) ? availabilityFromJSON(object.status) : 0,
      limit: isSet(object.limit) ? Number(object.limit) : 0,
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
    };
  },

  toJSON(message: QueryGetAllOrchestratorRequest): unknown {
    const obj: any = {};
    message.inferenceType !== undefined &&
      (obj.inferenceType = inferenceTypeToJSON(message.inferenceType));
    message.status !== undefined &&
      (obj.status = availabilityToJSON(message.status));
    message.limit !== undefined && (obj.limit = Math.round(message.limit));
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAllOrchestratorRequest>, I>>(
    object: I
  ): QueryGetAllOrchestratorRequest {
    const message = createBaseQueryGetAllOrchestratorRequest();
    message.inferenceType = object.inferenceType ?? 0;
    message.status = object.status ?? 0;
    message.limit = object.limit ?? 0;
    message.key = object.key ?? new Uint8Array();
    return message;
  },
};

function createBaseQueryGetAllOrchestratorResponse(): QueryGetAllOrchestratorResponse {
  return { orchestrators: [], nextKey: new Uint8Array() };
}

export const QueryGetAllOrchestratorResponse = {
  encode(
    message: QueryGetAllOrchestratorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.orchestrators) {
      Orchestrator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.nextKey.length !== 0) {
      writer.uint32(18).bytes(message.nextKey);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetAllOrchestratorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAllOrchestratorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orchestrators.push(
            Orchestrator.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.nextKey = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAllOrchestratorResponse {
    return {
      orchestrators: Array.isArray(object?.orchestrators)
        ? object.orchestrators.map((e: any) => Orchestrator.fromJSON(e))
        : [],
      nextKey: isSet(object.nextKey)
        ? bytesFromBase64(object.nextKey)
        : new Uint8Array(),
    };
  },

  toJSON(message: QueryGetAllOrchestratorResponse): unknown {
    const obj: any = {};
    if (message.orchestrators) {
      obj.orchestrators = message.orchestrators.map((e) =>
        e ? Orchestrator.toJSON(e) : undefined
      );
    } else {
      obj.orchestrators = [];
    }
    message.nextKey !== undefined &&
      (obj.nextKey = base64FromBytes(
        message.nextKey !== undefined ? message.nextKey : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAllOrchestratorResponse>, I>>(
    object: I
  ): QueryGetAllOrchestratorResponse {
    const message = createBaseQueryGetAllOrchestratorResponse();
    message.orchestrators =
      object.orchestrators?.map((e) => Orchestrator.fromPartial(e)) || [];
    message.nextKey = object.nextKey ?? new Uint8Array();
    return message;
  },
};

function createBaseQueryGetOrchestratorHeartbeatRequest(): QueryGetOrchestratorHeartbeatRequest {
  return { nodeId: "" };
}

export const QueryGetOrchestratorHeartbeatRequest = {
  encode(
    message: QueryGetOrchestratorHeartbeatRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetOrchestratorHeartbeatRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetOrchestratorHeartbeatRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nodeId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetOrchestratorHeartbeatRequest {
    return {
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
    };
  },

  toJSON(message: QueryGetOrchestratorHeartbeatRequest): unknown {
    const obj: any = {};
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryGetOrchestratorHeartbeatRequest>, I>
  >(object: I): QueryGetOrchestratorHeartbeatRequest {
    const message = createBaseQueryGetOrchestratorHeartbeatRequest();
    message.nodeId = object.nodeId ?? "";
    return message;
  },
};

function createBaseQueryGetOrchestratorHeartbeatResponse(): QueryGetOrchestratorHeartbeatResponse {
  return { timestamp: 0 };
}

export const QueryGetOrchestratorHeartbeatResponse = {
  encode(
    message: QueryGetOrchestratorHeartbeatResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).int32(message.timestamp);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetOrchestratorHeartbeatResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetOrchestratorHeartbeatResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetOrchestratorHeartbeatResponse {
    return {
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
    };
  },

  toJSON(message: QueryGetOrchestratorHeartbeatResponse): unknown {
    const obj: any = {};
    message.timestamp !== undefined &&
      (obj.timestamp = Math.round(message.timestamp));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryGetOrchestratorHeartbeatResponse>, I>
  >(object: I): QueryGetOrchestratorHeartbeatResponse {
    const message = createBaseQueryGetOrchestratorHeartbeatResponse();
    message.timestamp = object.timestamp ?? 0;
    return message;
  },
};

function createBaseQueryGetMinerHeartbeatRequest(): QueryGetMinerHeartbeatRequest {
  return { nodeId: "" };
}

export const QueryGetMinerHeartbeatRequest = {
  encode(
    message: QueryGetMinerHeartbeatRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetMinerHeartbeatRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetMinerHeartbeatRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nodeId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetMinerHeartbeatRequest {
    return {
      nodeId: isSet(object.nodeId) ? String(object.nodeId) : "",
    };
  },

  toJSON(message: QueryGetMinerHeartbeatRequest): unknown {
    const obj: any = {};
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetMinerHeartbeatRequest>, I>>(
    object: I
  ): QueryGetMinerHeartbeatRequest {
    const message = createBaseQueryGetMinerHeartbeatRequest();
    message.nodeId = object.nodeId ?? "";
    return message;
  },
};

function createBaseQueryGetMinerHeartbeatResponse(): QueryGetMinerHeartbeatResponse {
  return { timestamp: 0 };
}

export const QueryGetMinerHeartbeatResponse = {
  encode(
    message: QueryGetMinerHeartbeatResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).int32(message.timestamp);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetMinerHeartbeatResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetMinerHeartbeatResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetMinerHeartbeatResponse {
    return {
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
    };
  },

  toJSON(message: QueryGetMinerHeartbeatResponse): unknown {
    const obj: any = {};
    message.timestamp !== undefined &&
      (obj.timestamp = Math.round(message.timestamp));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetMinerHeartbeatResponse>, I>>(
    object: I
  ): QueryGetMinerHeartbeatResponse {
    const message = createBaseQueryGetMinerHeartbeatResponse();
    message.timestamp = object.timestamp ?? 0;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  GetModel(request: QueryGetModelRequest): Promise<QueryGetModelResponse>;
  /** Queries a list of GetModelBlocks items. */
  GetModelBlocks(
    request: QueryGetModelBlocksRequest
  ): Promise<QueryGetModelBlocksResponse>;
  /** Queries a list of GetNode items. */
  GetNode(request: QueryGetNodeRequest): Promise<QueryGetNodeResponse>;
  /** Queries a list of GetMiner items. */
  GetMiner(request: QueryGetMinerRequest): Promise<QueryGetMinerResponse>;
  /** Queries a list of GetOrchestrator items. */
  GetOrchestrator(
    request: QueryGetOrchestratorRequest
  ): Promise<QueryGetOrchestratorResponse>;
  GetAllOrchestrator(
    request: QueryGetAllOrchestratorRequest
  ): Promise<QueryGetAllOrchestratorResponse>;
  /** Queries a list of GetOrchestratorHeartbeat items. */
  GetOrchestratorHeartbeat(
    request: QueryGetOrchestratorHeartbeatRequest
  ): Promise<QueryGetOrchestratorHeartbeatResponse>;
  /** Queries a list of GetMinerHeartbeat items. */
  GetMinerHeartbeat(
    request: QueryGetMinerHeartbeatRequest
  ): Promise<QueryGetMinerHeartbeatResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.GetModel = this.GetModel.bind(this);
    this.GetModelBlocks = this.GetModelBlocks.bind(this);
    this.GetNode = this.GetNode.bind(this);
    this.GetMiner = this.GetMiner.bind(this);
    this.GetOrchestrator = this.GetOrchestrator.bind(this);
    this.GetAllOrchestrator = this.GetAllOrchestrator.bind(this);
    this.GetOrchestratorHeartbeat = this.GetOrchestratorHeartbeat.bind(this);
    this.GetMinerHeartbeat = this.GetMinerHeartbeat.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("dht.v1.Query", "Params", data);
    return promise.then((data) =>
      QueryParamsResponse.decode(new _m0.Reader(data))
    );
  }

  GetModel(request: QueryGetModelRequest): Promise<QueryGetModelResponse> {
    const data = QueryGetModelRequest.encode(request).finish();
    const promise = this.rpc.request("dht.v1.Query", "GetModel", data);
    return promise.then((data) =>
      QueryGetModelResponse.decode(new _m0.Reader(data))
    );
  }

  GetModelBlocks(
    request: QueryGetModelBlocksRequest
  ): Promise<QueryGetModelBlocksResponse> {
    const data = QueryGetModelBlocksRequest.encode(request).finish();
    const promise = this.rpc.request("dht.v1.Query", "GetModelBlocks", data);
    return promise.then((data) =>
      QueryGetModelBlocksResponse.decode(new _m0.Reader(data))
    );
  }

  GetNode(request: QueryGetNodeRequest): Promise<QueryGetNodeResponse> {
    const data = QueryGetNodeRequest.encode(request).finish();
    const promise = this.rpc.request("dht.v1.Query", "GetNode", data);
    return promise.then((data) =>
      QueryGetNodeResponse.decode(new _m0.Reader(data))
    );
  }

  GetMiner(request: QueryGetMinerRequest): Promise<QueryGetMinerResponse> {
    const data = QueryGetMinerRequest.encode(request).finish();
    const promise = this.rpc.request("dht.v1.Query", "GetMiner", data);
    return promise.then((data) =>
      QueryGetMinerResponse.decode(new _m0.Reader(data))
    );
  }

  GetOrchestrator(
    request: QueryGetOrchestratorRequest
  ): Promise<QueryGetOrchestratorResponse> {
    const data = QueryGetOrchestratorRequest.encode(request).finish();
    const promise = this.rpc.request("dht.v1.Query", "GetOrchestrator", data);
    return promise.then((data) =>
      QueryGetOrchestratorResponse.decode(new _m0.Reader(data))
    );
  }

  GetAllOrchestrator(
    request: QueryGetAllOrchestratorRequest
  ): Promise<QueryGetAllOrchestratorResponse> {
    const data = QueryGetAllOrchestratorRequest.encode(request).finish();
    const promise = this.rpc.request(
      "dht.v1.Query",
      "GetAllOrchestrator",
      data
    );
    return promise.then((data) =>
      QueryGetAllOrchestratorResponse.decode(new _m0.Reader(data))
    );
  }

  GetOrchestratorHeartbeat(
    request: QueryGetOrchestratorHeartbeatRequest
  ): Promise<QueryGetOrchestratorHeartbeatResponse> {
    const data = QueryGetOrchestratorHeartbeatRequest.encode(request).finish();
    const promise = this.rpc.request(
      "dht.v1.Query",
      "GetOrchestratorHeartbeat",
      data
    );
    return promise.then((data) =>
      QueryGetOrchestratorHeartbeatResponse.decode(new _m0.Reader(data))
    );
  }

  GetMinerHeartbeat(
    request: QueryGetMinerHeartbeatRequest
  ): Promise<QueryGetMinerHeartbeatResponse> {
    const data = QueryGetMinerHeartbeatRequest.encode(request).finish();
    const promise = this.rpc.request("dht.v1.Query", "GetMinerHeartbeat", data);
    return promise.then((data) =>
      QueryGetMinerHeartbeatResponse.decode(new _m0.Reader(data))
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
