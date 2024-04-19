/* eslint-disable */
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Duration } from "../../google/protobuf/duration";
import { Timestamp } from "../../google/protobuf/timestamp";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "agent.v1";

export enum AgentStatus {
  AGENT_STATUS_ACTIVE = 0,
  AGENT_STATUS_UPDATING = 1,
  AGENT_STATUS_INACTIVE = 2,
  UNRECOGNIZED = -1,
}

export function agentStatusFromJSON(object: any): AgentStatus {
  switch (object) {
    case 0:
    case "AGENT_STATUS_ACTIVE":
      return AgentStatus.AGENT_STATUS_ACTIVE;
    case 1:
    case "AGENT_STATUS_UPDATING":
      return AgentStatus.AGENT_STATUS_UPDATING;
    case 2:
    case "AGENT_STATUS_INACTIVE":
      return AgentStatus.AGENT_STATUS_INACTIVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AgentStatus.UNRECOGNIZED;
  }
}

export function agentStatusToJSON(object: AgentStatus): string {
  switch (object) {
    case AgentStatus.AGENT_STATUS_ACTIVE:
      return "AGENT_STATUS_ACTIVE";
    case AgentStatus.AGENT_STATUS_UPDATING:
      return "AGENT_STATUS_UPDATING";
    case AgentStatus.AGENT_STATUS_INACTIVE:
      return "AGENT_STATUS_INACTIVE";
    case AgentStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum SessionStatus {
  SESSION_STATUS_DEFAULT = 0,
  SESSION_STATUS_PENDING = 1,
  SESSION_STATUS_SUBMITTED = 2,
  SESSION_STATUS_CHALLENGE = 3,
  UNRECOGNIZED = -1,
}

export function sessionStatusFromJSON(object: any): SessionStatus {
  switch (object) {
    case 0:
    case "SESSION_STATUS_DEFAULT":
      return SessionStatus.SESSION_STATUS_DEFAULT;
    case 1:
    case "SESSION_STATUS_PENDING":
      return SessionStatus.SESSION_STATUS_PENDING;
    case 2:
    case "SESSION_STATUS_SUBMITTED":
      return SessionStatus.SESSION_STATUS_SUBMITTED;
    case 3:
    case "SESSION_STATUS_CHALLENGE":
      return SessionStatus.SESSION_STATUS_CHALLENGE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SessionStatus.UNRECOGNIZED;
  }
}

export function sessionStatusToJSON(object: SessionStatus): string {
  switch (object) {
    case SessionStatus.SESSION_STATUS_DEFAULT:
      return "SESSION_STATUS_DEFAULT";
    case SessionStatus.SESSION_STATUS_PENDING:
      return "SESSION_STATUS_PENDING";
    case SessionStatus.SESSION_STATUS_SUBMITTED:
      return "SESSION_STATUS_SUBMITTED";
    case SessionStatus.SESSION_STATUS_CHALLENGE:
      return "SESSION_STATUS_CHALLENGE";
    case SessionStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Params {
  agentMinimumLock?: Coin;
  userMinimumLock?: Coin;
  sessionTime?: Duration;
  challengeTime?: Duration;
  globalSeed: Uint8Array;
  lowestAgentVersion: Long;
  highestAgentVersion: Long;
}

export interface Model {
  name: string;
  repositoryUrl: string;
}

export interface Prestige {
  count: Long;
  total: Long;
}

export interface InferenceAgent {
  account: string;
  url: string;
  lastHeartbeat?: Date;
  version: Long;
  status: AgentStatus;
  lockBalance?: Coin;
  prestige?: Prestige;
}

export interface PaymentContribution {
  account: string;
  rate: Long;
}

export interface Payment {
  chatSeq: Long;
  totalPayment?: Coin;
  merkleRoot: Uint8Array;
  contributions: PaymentContribution[];
}

export interface Session {
  sessionId: string;
  account: string;
  modelName: string;
  agentAccount: string;
  userLock?: Coin;
  minerLock?: Coin;
  expirationAt?: Date;
  payment?: Payment;
  status: SessionStatus;
}

export interface VrfSeed {
  account: string;
  seed: Uint8Array;
}

function createBaseParams(): Params {
  return {
    agentMinimumLock: undefined,
    userMinimumLock: undefined,
    sessionTime: undefined,
    challengeTime: undefined,
    globalSeed: new Uint8Array(),
    lowestAgentVersion: Long.UZERO,
    highestAgentVersion: Long.UZERO,
  };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.agentMinimumLock !== undefined) {
      Coin.encode(message.agentMinimumLock, writer.uint32(10).fork()).ldelim();
    }
    if (message.userMinimumLock !== undefined) {
      Coin.encode(message.userMinimumLock, writer.uint32(18).fork()).ldelim();
    }
    if (message.sessionTime !== undefined) {
      Duration.encode(message.sessionTime, writer.uint32(26).fork()).ldelim();
    }
    if (message.challengeTime !== undefined) {
      Duration.encode(message.challengeTime, writer.uint32(34).fork()).ldelim();
    }
    if (message.globalSeed.length !== 0) {
      writer.uint32(42).bytes(message.globalSeed);
    }
    if (!message.lowestAgentVersion.isZero()) {
      writer.uint32(48).uint64(message.lowestAgentVersion);
    }
    if (!message.highestAgentVersion.isZero()) {
      writer.uint32(56).uint64(message.highestAgentVersion);
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
          message.agentMinimumLock = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.userMinimumLock = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.sessionTime = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.challengeTime = Duration.decode(reader, reader.uint32());
          break;
        case 5:
          message.globalSeed = reader.bytes();
          break;
        case 6:
          message.lowestAgentVersion = reader.uint64() as Long;
          break;
        case 7:
          message.highestAgentVersion = reader.uint64() as Long;
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
      agentMinimumLock: isSet(object.agentMinimumLock)
        ? Coin.fromJSON(object.agentMinimumLock)
        : undefined,
      userMinimumLock: isSet(object.userMinimumLock)
        ? Coin.fromJSON(object.userMinimumLock)
        : undefined,
      sessionTime: isSet(object.sessionTime)
        ? Duration.fromJSON(object.sessionTime)
        : undefined,
      challengeTime: isSet(object.challengeTime)
        ? Duration.fromJSON(object.challengeTime)
        : undefined,
      globalSeed: isSet(object.globalSeed)
        ? bytesFromBase64(object.globalSeed)
        : new Uint8Array(),
      lowestAgentVersion: isSet(object.lowestAgentVersion)
        ? Long.fromValue(object.lowestAgentVersion)
        : Long.UZERO,
      highestAgentVersion: isSet(object.highestAgentVersion)
        ? Long.fromValue(object.highestAgentVersion)
        : Long.UZERO,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.agentMinimumLock !== undefined &&
      (obj.agentMinimumLock = message.agentMinimumLock
        ? Coin.toJSON(message.agentMinimumLock)
        : undefined);
    message.userMinimumLock !== undefined &&
      (obj.userMinimumLock = message.userMinimumLock
        ? Coin.toJSON(message.userMinimumLock)
        : undefined);
    message.sessionTime !== undefined &&
      (obj.sessionTime = message.sessionTime
        ? Duration.toJSON(message.sessionTime)
        : undefined);
    message.challengeTime !== undefined &&
      (obj.challengeTime = message.challengeTime
        ? Duration.toJSON(message.challengeTime)
        : undefined);
    message.globalSeed !== undefined &&
      (obj.globalSeed = base64FromBytes(
        message.globalSeed !== undefined ? message.globalSeed : new Uint8Array()
      ));
    message.lowestAgentVersion !== undefined &&
      (obj.lowestAgentVersion = (
        message.lowestAgentVersion || Long.UZERO
      ).toString());
    message.highestAgentVersion !== undefined &&
      (obj.highestAgentVersion = (
        message.highestAgentVersion || Long.UZERO
      ).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.agentMinimumLock =
      object.agentMinimumLock !== undefined && object.agentMinimumLock !== null
        ? Coin.fromPartial(object.agentMinimumLock)
        : undefined;
    message.userMinimumLock =
      object.userMinimumLock !== undefined && object.userMinimumLock !== null
        ? Coin.fromPartial(object.userMinimumLock)
        : undefined;
    message.sessionTime =
      object.sessionTime !== undefined && object.sessionTime !== null
        ? Duration.fromPartial(object.sessionTime)
        : undefined;
    message.challengeTime =
      object.challengeTime !== undefined && object.challengeTime !== null
        ? Duration.fromPartial(object.challengeTime)
        : undefined;
    message.globalSeed = object.globalSeed ?? new Uint8Array();
    message.lowestAgentVersion =
      object.lowestAgentVersion !== undefined &&
      object.lowestAgentVersion !== null
        ? Long.fromValue(object.lowestAgentVersion)
        : Long.UZERO;
    message.highestAgentVersion =
      object.highestAgentVersion !== undefined &&
      object.highestAgentVersion !== null
        ? Long.fromValue(object.highestAgentVersion)
        : Long.UZERO;
    return message;
  },
};

function createBaseModel(): Model {
  return { name: "", repositoryUrl: "" };
}

export const Model = {
  encode(message: Model, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.repositoryUrl !== "") {
      writer.uint32(18).string(message.repositoryUrl);
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
          message.name = reader.string();
          break;
        case 2:
          message.repositoryUrl = reader.string();
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
      name: isSet(object.name) ? String(object.name) : "",
      repositoryUrl: isSet(object.repositoryUrl)
        ? String(object.repositoryUrl)
        : "",
    };
  },

  toJSON(message: Model): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.repositoryUrl !== undefined &&
      (obj.repositoryUrl = message.repositoryUrl);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Model>, I>>(object: I): Model {
    const message = createBaseModel();
    message.name = object.name ?? "";
    message.repositoryUrl = object.repositoryUrl ?? "";
    return message;
  },
};

function createBasePrestige(): Prestige {
  return { count: Long.UZERO, total: Long.UZERO };
}

export const Prestige = {
  encode(
    message: Prestige,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.count.isZero()) {
      writer.uint32(8).uint64(message.count);
    }
    if (!message.total.isZero()) {
      writer.uint32(16).uint64(message.total);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Prestige {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrestige();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.count = reader.uint64() as Long;
          break;
        case 2:
          message.total = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Prestige {
    return {
      count: isSet(object.count) ? Long.fromValue(object.count) : Long.UZERO,
      total: isSet(object.total) ? Long.fromValue(object.total) : Long.UZERO,
    };
  },

  toJSON(message: Prestige): unknown {
    const obj: any = {};
    message.count !== undefined &&
      (obj.count = (message.count || Long.UZERO).toString());
    message.total !== undefined &&
      (obj.total = (message.total || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Prestige>, I>>(object: I): Prestige {
    const message = createBasePrestige();
    message.count =
      object.count !== undefined && object.count !== null
        ? Long.fromValue(object.count)
        : Long.UZERO;
    message.total =
      object.total !== undefined && object.total !== null
        ? Long.fromValue(object.total)
        : Long.UZERO;
    return message;
  },
};

function createBaseInferenceAgent(): InferenceAgent {
  return {
    account: "",
    url: "",
    lastHeartbeat: undefined,
    version: Long.UZERO,
    status: 0,
    lockBalance: undefined,
    prestige: undefined,
  };
}

export const InferenceAgent = {
  encode(
    message: InferenceAgent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.lastHeartbeat !== undefined) {
      Timestamp.encode(
        toTimestamp(message.lastHeartbeat),
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (!message.version.isZero()) {
      writer.uint32(32).uint64(message.version);
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    if (message.lockBalance !== undefined) {
      Coin.encode(message.lockBalance, writer.uint32(50).fork()).ldelim();
    }
    if (message.prestige !== undefined) {
      Prestige.encode(message.prestige, writer.uint32(58).fork()).ldelim();
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
          message.account = reader.string();
          break;
        case 2:
          message.url = reader.string();
          break;
        case 3:
          message.lastHeartbeat = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.version = reader.uint64() as Long;
          break;
        case 5:
          message.status = reader.int32() as any;
          break;
        case 6:
          message.lockBalance = Coin.decode(reader, reader.uint32());
          break;
        case 7:
          message.prestige = Prestige.decode(reader, reader.uint32());
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
      account: isSet(object.account) ? String(object.account) : "",
      url: isSet(object.url) ? String(object.url) : "",
      lastHeartbeat: isSet(object.lastHeartbeat)
        ? fromJsonTimestamp(object.lastHeartbeat)
        : undefined,
      version: isSet(object.version)
        ? Long.fromValue(object.version)
        : Long.UZERO,
      status: isSet(object.status) ? agentStatusFromJSON(object.status) : 0,
      lockBalance: isSet(object.lockBalance)
        ? Coin.fromJSON(object.lockBalance)
        : undefined,
      prestige: isSet(object.prestige)
        ? Prestige.fromJSON(object.prestige)
        : undefined,
    };
  },

  toJSON(message: InferenceAgent): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.url !== undefined && (obj.url = message.url);
    message.lastHeartbeat !== undefined &&
      (obj.lastHeartbeat = message.lastHeartbeat.toISOString());
    message.version !== undefined &&
      (obj.version = (message.version || Long.UZERO).toString());
    message.status !== undefined &&
      (obj.status = agentStatusToJSON(message.status));
    message.lockBalance !== undefined &&
      (obj.lockBalance = message.lockBalance
        ? Coin.toJSON(message.lockBalance)
        : undefined);
    message.prestige !== undefined &&
      (obj.prestige = message.prestige
        ? Prestige.toJSON(message.prestige)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InferenceAgent>, I>>(
    object: I
  ): InferenceAgent {
    const message = createBaseInferenceAgent();
    message.account = object.account ?? "";
    message.url = object.url ?? "";
    message.lastHeartbeat = object.lastHeartbeat ?? undefined;
    message.version =
      object.version !== undefined && object.version !== null
        ? Long.fromValue(object.version)
        : Long.UZERO;
    message.status = object.status ?? 0;
    message.lockBalance =
      object.lockBalance !== undefined && object.lockBalance !== null
        ? Coin.fromPartial(object.lockBalance)
        : undefined;
    message.prestige =
      object.prestige !== undefined && object.prestige !== null
        ? Prestige.fromPartial(object.prestige)
        : undefined;
    return message;
  },
};

function createBasePaymentContribution(): PaymentContribution {
  return { account: "", rate: Long.UZERO };
}

export const PaymentContribution = {
  encode(
    message: PaymentContribution,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (!message.rate.isZero()) {
      writer.uint32(16).uint64(message.rate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PaymentContribution {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePaymentContribution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.rate = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PaymentContribution {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      rate: isSet(object.rate) ? Long.fromValue(object.rate) : Long.UZERO,
    };
  },

  toJSON(message: PaymentContribution): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.rate !== undefined &&
      (obj.rate = (message.rate || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PaymentContribution>, I>>(
    object: I
  ): PaymentContribution {
    const message = createBasePaymentContribution();
    message.account = object.account ?? "";
    message.rate =
      object.rate !== undefined && object.rate !== null
        ? Long.fromValue(object.rate)
        : Long.UZERO;
    return message;
  },
};

function createBasePayment(): Payment {
  return {
    chatSeq: Long.UZERO,
    totalPayment: undefined,
    merkleRoot: new Uint8Array(),
    contributions: [],
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
    for (const v of message.contributions) {
      PaymentContribution.encode(v!, writer.uint32(34).fork()).ldelim();
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
        case 4:
          message.contributions.push(
            PaymentContribution.decode(reader, reader.uint32())
          );
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
      contributions: Array.isArray(object?.contributions)
        ? object.contributions.map((e: any) => PaymentContribution.fromJSON(e))
        : [],
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
    if (message.contributions) {
      obj.contributions = message.contributions.map((e) =>
        e ? PaymentContribution.toJSON(e) : undefined
      );
    } else {
      obj.contributions = [];
    }
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
    message.contributions =
      object.contributions?.map((e) => PaymentContribution.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseSession(): Session {
  return {
    sessionId: "",
    account: "",
    modelName: "",
    agentAccount: "",
    userLock: undefined,
    minerLock: undefined,
    expirationAt: undefined,
    payment: undefined,
    status: 0,
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
    if (message.modelName !== "") {
      writer.uint32(26).string(message.modelName);
    }
    if (message.agentAccount !== "") {
      writer.uint32(34).string(message.agentAccount);
    }
    if (message.userLock !== undefined) {
      Coin.encode(message.userLock, writer.uint32(42).fork()).ldelim();
    }
    if (message.minerLock !== undefined) {
      Coin.encode(message.minerLock, writer.uint32(50).fork()).ldelim();
    }
    if (message.expirationAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.expirationAt),
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.payment !== undefined) {
      Payment.encode(message.payment, writer.uint32(66).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(72).int32(message.status);
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
          message.modelName = reader.string();
          break;
        case 4:
          message.agentAccount = reader.string();
          break;
        case 5:
          message.userLock = Coin.decode(reader, reader.uint32());
          break;
        case 6:
          message.minerLock = Coin.decode(reader, reader.uint32());
          break;
        case 7:
          message.expirationAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 8:
          message.payment = Payment.decode(reader, reader.uint32());
          break;
        case 9:
          message.status = reader.int32() as any;
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
      modelName: isSet(object.modelName) ? String(object.modelName) : "",
      agentAccount: isSet(object.agentAccount)
        ? String(object.agentAccount)
        : "",
      userLock: isSet(object.userLock)
        ? Coin.fromJSON(object.userLock)
        : undefined,
      minerLock: isSet(object.minerLock)
        ? Coin.fromJSON(object.minerLock)
        : undefined,
      expirationAt: isSet(object.expirationAt)
        ? fromJsonTimestamp(object.expirationAt)
        : undefined,
      payment: isSet(object.payment)
        ? Payment.fromJSON(object.payment)
        : undefined,
      status: isSet(object.status) ? sessionStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: Session): unknown {
    const obj: any = {};
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.account !== undefined && (obj.account = message.account);
    message.modelName !== undefined && (obj.modelName = message.modelName);
    message.agentAccount !== undefined &&
      (obj.agentAccount = message.agentAccount);
    message.userLock !== undefined &&
      (obj.userLock = message.userLock
        ? Coin.toJSON(message.userLock)
        : undefined);
    message.minerLock !== undefined &&
      (obj.minerLock = message.minerLock
        ? Coin.toJSON(message.minerLock)
        : undefined);
    message.expirationAt !== undefined &&
      (obj.expirationAt = message.expirationAt.toISOString());
    message.payment !== undefined &&
      (obj.payment = message.payment
        ? Payment.toJSON(message.payment)
        : undefined);
    message.status !== undefined &&
      (obj.status = sessionStatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Session>, I>>(object: I): Session {
    const message = createBaseSession();
    message.sessionId = object.sessionId ?? "";
    message.account = object.account ?? "";
    message.modelName = object.modelName ?? "";
    message.agentAccount = object.agentAccount ?? "";
    message.userLock =
      object.userLock !== undefined && object.userLock !== null
        ? Coin.fromPartial(object.userLock)
        : undefined;
    message.minerLock =
      object.minerLock !== undefined && object.minerLock !== null
        ? Coin.fromPartial(object.minerLock)
        : undefined;
    message.expirationAt = object.expirationAt ?? undefined;
    message.payment =
      object.payment !== undefined && object.payment !== null
        ? Payment.fromPartial(object.payment)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseVrfSeed(): VrfSeed {
  return { account: "", seed: new Uint8Array() };
}

export const VrfSeed = {
  encode(
    message: VrfSeed,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.seed.length !== 0) {
      writer.uint32(18).bytes(message.seed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VrfSeed {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVrfSeed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.seed = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VrfSeed {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      seed: isSet(object.seed)
        ? bytesFromBase64(object.seed)
        : new Uint8Array(),
    };
  },

  toJSON(message: VrfSeed): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.seed !== undefined &&
      (obj.seed = base64FromBytes(
        message.seed !== undefined ? message.seed : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VrfSeed>, I>>(object: I): VrfSeed {
    const message = createBaseVrfSeed();
    message.account = object.account ?? "";
    message.seed = object.seed ?? new Uint8Array();
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
