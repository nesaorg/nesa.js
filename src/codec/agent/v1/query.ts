/* eslint-disable */
import {
  Params,
  Model,
  InferenceAgent,
  Session,
  SessionStatus,
  sessionStatusFromJSON,
  sessionStatusToJSON,
} from "./agent";
import {
  PageRequest,
  PageResponse,
} from "../../cosmos/base/query/v1beta1/pagination";
import { Timestamp } from "../../google/protobuf/timestamp";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "agent.v1";

export interface QueryParamsRequest {}

export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: Params;
}

export interface QueryModelRequest {
  name: string;
}

export interface QueryModelResponse {
  model?: Model;
}

export interface QueryModelAllRequest {
  pagination?: PageRequest;
}

export interface QueryModelAllResponse {
  models: Model[];
  pagination?: PageResponse;
}

export interface QueryInferenceAgentRequest {
  account: string;
}

export interface QueryInferenceAgentResponse {
  inferenceAgent?: InferenceAgent;
}

export interface QuerySessionRequest {
  id: string;
}

export interface QuerySessionResponse {
  session?: Session;
}

export interface QuerySessionByAgentRequest {
  account: string;
  status: SessionStatus;
  expireTime?: Date;
  limit: Long;
  orderDesc: boolean;
}

export interface QuerySessionByAgentResponse {
  sessions: Session[];
}

export interface QueryVRFSeedRequest {
  account: string;
}

export interface QueryVRFSeedResponse {
  seed: Uint8Array;
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

function createBaseQueryModelRequest(): QueryModelRequest {
  return { name: "" };
}

export const QueryModelRequest = {
  encode(
    message: QueryModelRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryModelRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryModelRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: QueryModelRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryModelRequest>, I>>(
    object: I
  ): QueryModelRequest {
    const message = createBaseQueryModelRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseQueryModelResponse(): QueryModelResponse {
  return { model: undefined };
}

export const QueryModelResponse = {
  encode(
    message: QueryModelResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.model !== undefined) {
      Model.encode(message.model, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryModelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModelResponse();
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

  fromJSON(object: any): QueryModelResponse {
    return {
      model: isSet(object.model) ? Model.fromJSON(object.model) : undefined,
    };
  },

  toJSON(message: QueryModelResponse): unknown {
    const obj: any = {};
    message.model !== undefined &&
      (obj.model = message.model ? Model.toJSON(message.model) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryModelResponse>, I>>(
    object: I
  ): QueryModelResponse {
    const message = createBaseQueryModelResponse();
    message.model =
      object.model !== undefined && object.model !== null
        ? Model.fromPartial(object.model)
        : undefined;
    return message;
  },
};

function createBaseQueryModelAllRequest(): QueryModelAllRequest {
  return { pagination: undefined };
}

export const QueryModelAllRequest = {
  encode(
    message: QueryModelAllRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryModelAllRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModelAllRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryModelAllRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryModelAllRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryModelAllRequest>, I>>(
    object: I
  ): QueryModelAllRequest {
    const message = createBaseQueryModelAllRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryModelAllResponse(): QueryModelAllResponse {
  return { models: [], pagination: undefined };
}

export const QueryModelAllResponse = {
  encode(
    message: QueryModelAllResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.models) {
      Model.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryModelAllResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModelAllResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.models.push(Model.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryModelAllResponse {
    return {
      models: Array.isArray(object?.models)
        ? object.models.map((e: any) => Model.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryModelAllResponse): unknown {
    const obj: any = {};
    if (message.models) {
      obj.models = message.models.map((e) => (e ? Model.toJSON(e) : undefined));
    } else {
      obj.models = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryModelAllResponse>, I>>(
    object: I
  ): QueryModelAllResponse {
    const message = createBaseQueryModelAllResponse();
    message.models = object.models?.map((e) => Model.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryInferenceAgentRequest(): QueryInferenceAgentRequest {
  return { account: "" };
}

export const QueryInferenceAgentRequest = {
  encode(
    message: QueryInferenceAgentRequest,
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
  ): QueryInferenceAgentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInferenceAgentRequest();
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

  fromJSON(object: any): QueryInferenceAgentRequest {
    return {
      account: isSet(object.account) ? String(object.account) : "",
    };
  },

  toJSON(message: QueryInferenceAgentRequest): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryInferenceAgentRequest>, I>>(
    object: I
  ): QueryInferenceAgentRequest {
    const message = createBaseQueryInferenceAgentRequest();
    message.account = object.account ?? "";
    return message;
  },
};

function createBaseQueryInferenceAgentResponse(): QueryInferenceAgentResponse {
  return { inferenceAgent: undefined };
}

export const QueryInferenceAgentResponse = {
  encode(
    message: QueryInferenceAgentResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.inferenceAgent !== undefined) {
      InferenceAgent.encode(
        message.inferenceAgent,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryInferenceAgentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInferenceAgentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inferenceAgent = InferenceAgent.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryInferenceAgentResponse {
    return {
      inferenceAgent: isSet(object.inferenceAgent)
        ? InferenceAgent.fromJSON(object.inferenceAgent)
        : undefined,
    };
  },

  toJSON(message: QueryInferenceAgentResponse): unknown {
    const obj: any = {};
    message.inferenceAgent !== undefined &&
      (obj.inferenceAgent = message.inferenceAgent
        ? InferenceAgent.toJSON(message.inferenceAgent)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryInferenceAgentResponse>, I>>(
    object: I
  ): QueryInferenceAgentResponse {
    const message = createBaseQueryInferenceAgentResponse();
    message.inferenceAgent =
      object.inferenceAgent !== undefined && object.inferenceAgent !== null
        ? InferenceAgent.fromPartial(object.inferenceAgent)
        : undefined;
    return message;
  },
};

function createBaseQuerySessionRequest(): QuerySessionRequest {
  return { id: "" };
}

export const QuerySessionRequest = {
  encode(
    message: QuerySessionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySessionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySessionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySessionRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: QuerySessionRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySessionRequest>, I>>(
    object: I
  ): QuerySessionRequest {
    const message = createBaseQuerySessionRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseQuerySessionResponse(): QuerySessionResponse {
  return { session: undefined };
}

export const QuerySessionResponse = {
  encode(
    message: QuerySessionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.session !== undefined) {
      Session.encode(message.session, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QuerySessionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySessionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = Session.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySessionResponse {
    return {
      session: isSet(object.session)
        ? Session.fromJSON(object.session)
        : undefined,
    };
  },

  toJSON(message: QuerySessionResponse): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? Session.toJSON(message.session)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySessionResponse>, I>>(
    object: I
  ): QuerySessionResponse {
    const message = createBaseQuerySessionResponse();
    message.session =
      object.session !== undefined && object.session !== null
        ? Session.fromPartial(object.session)
        : undefined;
    return message;
  },
};

function createBaseQuerySessionByAgentRequest(): QuerySessionByAgentRequest {
  return {
    account: "",
    status: 0,
    expireTime: undefined,
    limit: Long.UZERO,
    orderDesc: false,
  };
}

export const QuerySessionByAgentRequest = {
  encode(
    message: QuerySessionByAgentRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.expireTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.expireTime),
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (!message.limit.isZero()) {
      writer.uint32(32).uint64(message.limit);
    }
    if (message.orderDesc === true) {
      writer.uint32(40).bool(message.orderDesc);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QuerySessionByAgentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySessionByAgentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.expireTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.limit = reader.uint64() as Long;
          break;
        case 5:
          message.orderDesc = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySessionByAgentRequest {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      status: isSet(object.status) ? sessionStatusFromJSON(object.status) : 0,
      expireTime: isSet(object.expireTime)
        ? fromJsonTimestamp(object.expireTime)
        : undefined,
      limit: isSet(object.limit) ? Long.fromValue(object.limit) : Long.UZERO,
      orderDesc: isSet(object.orderDesc) ? Boolean(object.orderDesc) : false,
    };
  },

  toJSON(message: QuerySessionByAgentRequest): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.status !== undefined &&
      (obj.status = sessionStatusToJSON(message.status));
    message.expireTime !== undefined &&
      (obj.expireTime = message.expireTime.toISOString());
    message.limit !== undefined &&
      (obj.limit = (message.limit || Long.UZERO).toString());
    message.orderDesc !== undefined && (obj.orderDesc = message.orderDesc);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySessionByAgentRequest>, I>>(
    object: I
  ): QuerySessionByAgentRequest {
    const message = createBaseQuerySessionByAgentRequest();
    message.account = object.account ?? "";
    message.status = object.status ?? 0;
    message.expireTime = object.expireTime ?? undefined;
    message.limit =
      object.limit !== undefined && object.limit !== null
        ? Long.fromValue(object.limit)
        : Long.UZERO;
    message.orderDesc = object.orderDesc ?? false;
    return message;
  },
};

function createBaseQuerySessionByAgentResponse(): QuerySessionByAgentResponse {
  return { sessions: [] };
}

export const QuerySessionByAgentResponse = {
  encode(
    message: QuerySessionByAgentResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.sessions) {
      Session.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QuerySessionByAgentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySessionByAgentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sessions.push(Session.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySessionByAgentResponse {
    return {
      sessions: Array.isArray(object?.sessions)
        ? object.sessions.map((e: any) => Session.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QuerySessionByAgentResponse): unknown {
    const obj: any = {};
    if (message.sessions) {
      obj.sessions = message.sessions.map((e) =>
        e ? Session.toJSON(e) : undefined
      );
    } else {
      obj.sessions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySessionByAgentResponse>, I>>(
    object: I
  ): QuerySessionByAgentResponse {
    const message = createBaseQuerySessionByAgentResponse();
    message.sessions =
      object.sessions?.map((e) => Session.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryVRFSeedRequest(): QueryVRFSeedRequest {
  return { account: "" };
}

export const QueryVRFSeedRequest = {
  encode(
    message: QueryVRFSeedRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVRFSeedRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVRFSeedRequest();
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

  fromJSON(object: any): QueryVRFSeedRequest {
    return {
      account: isSet(object.account) ? String(object.account) : "",
    };
  },

  toJSON(message: QueryVRFSeedRequest): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryVRFSeedRequest>, I>>(
    object: I
  ): QueryVRFSeedRequest {
    const message = createBaseQueryVRFSeedRequest();
    message.account = object.account ?? "";
    return message;
  },
};

function createBaseQueryVRFSeedResponse(): QueryVRFSeedResponse {
  return { seed: new Uint8Array() };
}

export const QueryVRFSeedResponse = {
  encode(
    message: QueryVRFSeedResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.seed.length !== 0) {
      writer.uint32(10).bytes(message.seed);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryVRFSeedResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVRFSeedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seed = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryVRFSeedResponse {
    return {
      seed: isSet(object.seed)
        ? bytesFromBase64(object.seed)
        : new Uint8Array(),
    };
  },

  toJSON(message: QueryVRFSeedResponse): unknown {
    const obj: any = {};
    message.seed !== undefined &&
      (obj.seed = base64FromBytes(
        message.seed !== undefined ? message.seed : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryVRFSeedResponse>, I>>(
    object: I
  ): QueryVRFSeedResponse {
    const message = createBaseQueryVRFSeedResponse();
    message.seed = object.seed ?? new Uint8Array();
    return message;
  },
};

export interface Query {
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  ModelRequest(request: QueryModelRequest): Promise<QueryModelResponse>;
  ModelRequestAll(
    request: QueryModelAllRequest
  ): Promise<QueryModelAllResponse>;
  InferenceAgentRequest(
    request: QueryInferenceAgentRequest
  ): Promise<QueryInferenceAgentResponse>;
  SessionRequest(request: QuerySessionRequest): Promise<QuerySessionResponse>;
  SessionByAgentRequest(
    request: QuerySessionByAgentRequest
  ): Promise<QuerySessionByAgentResponse>;
  VRFSeedRequest(request: QueryVRFSeedRequest): Promise<QueryVRFSeedResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.ModelRequest = this.ModelRequest.bind(this);
    this.ModelRequestAll = this.ModelRequestAll.bind(this);
    this.InferenceAgentRequest = this.InferenceAgentRequest.bind(this);
    this.SessionRequest = this.SessionRequest.bind(this);
    this.SessionByAgentRequest = this.SessionByAgentRequest.bind(this);
    this.VRFSeedRequest = this.VRFSeedRequest.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("agent.v1.Query", "Params", data);
    return promise.then((data) =>
      QueryParamsResponse.decode(new _m0.Reader(data))
    );
  }

  ModelRequest(request: QueryModelRequest): Promise<QueryModelResponse> {
    const data = QueryModelRequest.encode(request).finish();
    const promise = this.rpc.request("agent.v1.Query", "ModelRequest", data);
    return promise.then((data) =>
      QueryModelResponse.decode(new _m0.Reader(data))
    );
  }

  ModelRequestAll(
    request: QueryModelAllRequest
  ): Promise<QueryModelAllResponse> {
    const data = QueryModelAllRequest.encode(request).finish();
    const promise = this.rpc.request("agent.v1.Query", "ModelRequestAll", data);
    return promise.then((data) =>
      QueryModelAllResponse.decode(new _m0.Reader(data))
    );
  }

  InferenceAgentRequest(
    request: QueryInferenceAgentRequest
  ): Promise<QueryInferenceAgentResponse> {
    const data = QueryInferenceAgentRequest.encode(request).finish();
    const promise = this.rpc.request(
      "agent.v1.Query",
      "InferenceAgentRequest",
      data
    );
    return promise.then((data) =>
      QueryInferenceAgentResponse.decode(new _m0.Reader(data))
    );
  }

  SessionRequest(request: QuerySessionRequest): Promise<QuerySessionResponse> {
    const data = QuerySessionRequest.encode(request).finish();
    const promise = this.rpc.request("agent.v1.Query", "SessionRequest", data);
    return promise.then((data) =>
      QuerySessionResponse.decode(new _m0.Reader(data))
    );
  }

  SessionByAgentRequest(
    request: QuerySessionByAgentRequest
  ): Promise<QuerySessionByAgentResponse> {
    const data = QuerySessionByAgentRequest.encode(request).finish();
    const promise = this.rpc.request(
      "agent.v1.Query",
      "SessionByAgentRequest",
      data
    );
    return promise.then((data) =>
      QuerySessionByAgentResponse.decode(new _m0.Reader(data))
    );
  }

  VRFSeedRequest(request: QueryVRFSeedRequest): Promise<QueryVRFSeedResponse> {
    const data = QueryVRFSeedRequest.encode(request).finish();
    const promise = this.rpc.request("agent.v1.Query", "VRFSeedRequest", data);
    return promise.then((data) =>
      QueryVRFSeedResponse.decode(new _m0.Reader(data))
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
