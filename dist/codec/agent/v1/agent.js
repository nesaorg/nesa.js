"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VrfSeed = exports.Session = exports.Payment = exports.PaymentContribution = exports.InferenceAgent = exports.Prestige = exports.Model = exports.InnerValues = exports.Params = exports.sessionStatusToJSON = exports.sessionStatusFromJSON = exports.SessionStatus = exports.agentStatusToJSON = exports.agentStatusFromJSON = exports.AgentStatus = exports.protobufPackage = void 0;
/* eslint-disable */
const coin_1 = require("../../cosmos/base/v1beta1/coin");
const duration_1 = require("../../google/protobuf/duration");
const timestamp_1 = require("../../google/protobuf/timestamp");
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "agent.v1";
var AgentStatus;
(function (AgentStatus) {
    AgentStatus[AgentStatus["AGENT_STATUS_ACTIVE"] = 0] = "AGENT_STATUS_ACTIVE";
    AgentStatus[AgentStatus["AGENT_STATUS_INACTIVE"] = 1] = "AGENT_STATUS_INACTIVE";
    AgentStatus[AgentStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(AgentStatus || (exports.AgentStatus = AgentStatus = {}));
function agentStatusFromJSON(object) {
    switch (object) {
        case 0:
        case "AGENT_STATUS_ACTIVE":
            return AgentStatus.AGENT_STATUS_ACTIVE;
        case 1:
        case "AGENT_STATUS_INACTIVE":
            return AgentStatus.AGENT_STATUS_INACTIVE;
        case -1:
        case "UNRECOGNIZED":
        default:
            return AgentStatus.UNRECOGNIZED;
    }
}
exports.agentStatusFromJSON = agentStatusFromJSON;
function agentStatusToJSON(object) {
    switch (object) {
        case AgentStatus.AGENT_STATUS_ACTIVE:
            return "AGENT_STATUS_ACTIVE";
        case AgentStatus.AGENT_STATUS_INACTIVE:
            return "AGENT_STATUS_INACTIVE";
        case AgentStatus.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.agentStatusToJSON = agentStatusToJSON;
var SessionStatus;
(function (SessionStatus) {
    SessionStatus[SessionStatus["SESSION_STATUS_DEFAULT"] = 0] = "SESSION_STATUS_DEFAULT";
    SessionStatus[SessionStatus["SESSION_STATUS_PENDING"] = 1] = "SESSION_STATUS_PENDING";
    SessionStatus[SessionStatus["SESSION_STATUS_SUBMITTED"] = 2] = "SESSION_STATUS_SUBMITTED";
    SessionStatus[SessionStatus["SESSION_STATUS_CHALLENGE"] = 3] = "SESSION_STATUS_CHALLENGE";
    SessionStatus[SessionStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(SessionStatus || (exports.SessionStatus = SessionStatus = {}));
function sessionStatusFromJSON(object) {
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
exports.sessionStatusFromJSON = sessionStatusFromJSON;
function sessionStatusToJSON(object) {
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
exports.sessionStatusToJSON = sessionStatusToJSON;
function createBaseParams() {
    return {
        agentMinimumLock: undefined,
        userMinimumLock: undefined,
        sessionTime: undefined,
        challengeTime: undefined,
        globalSeed: new Uint8Array(),
        lowestAgentVersion: long_1.default.UZERO,
        highestAgentVersion: long_1.default.UZERO,
    };
}
exports.Params = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.agentMinimumLock !== undefined) {
            coin_1.Coin.encode(message.agentMinimumLock, writer.uint32(10).fork()).ldelim();
        }
        if (message.userMinimumLock !== undefined) {
            coin_1.Coin.encode(message.userMinimumLock, writer.uint32(18).fork()).ldelim();
        }
        if (message.sessionTime !== undefined) {
            duration_1.Duration.encode(message.sessionTime, writer.uint32(26).fork()).ldelim();
        }
        if (message.challengeTime !== undefined) {
            duration_1.Duration.encode(message.challengeTime, writer.uint32(34).fork()).ldelim();
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
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.agentMinimumLock = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.userMinimumLock = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.sessionTime = duration_1.Duration.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.challengeTime = duration_1.Duration.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.globalSeed = reader.bytes();
                    break;
                case 6:
                    message.lowestAgentVersion = reader.uint64();
                    break;
                case 7:
                    message.highestAgentVersion = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            agentMinimumLock: isSet(object.agentMinimumLock)
                ? coin_1.Coin.fromJSON(object.agentMinimumLock)
                : undefined,
            userMinimumLock: isSet(object.userMinimumLock)
                ? coin_1.Coin.fromJSON(object.userMinimumLock)
                : undefined,
            sessionTime: isSet(object.sessionTime)
                ? duration_1.Duration.fromJSON(object.sessionTime)
                : undefined,
            challengeTime: isSet(object.challengeTime)
                ? duration_1.Duration.fromJSON(object.challengeTime)
                : undefined,
            globalSeed: isSet(object.globalSeed)
                ? bytesFromBase64(object.globalSeed)
                : new Uint8Array(),
            lowestAgentVersion: isSet(object.lowestAgentVersion)
                ? long_1.default.fromValue(object.lowestAgentVersion)
                : long_1.default.UZERO,
            highestAgentVersion: isSet(object.highestAgentVersion)
                ? long_1.default.fromValue(object.highestAgentVersion)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.agentMinimumLock !== undefined &&
            (obj.agentMinimumLock = message.agentMinimumLock
                ? coin_1.Coin.toJSON(message.agentMinimumLock)
                : undefined);
        message.userMinimumLock !== undefined &&
            (obj.userMinimumLock = message.userMinimumLock
                ? coin_1.Coin.toJSON(message.userMinimumLock)
                : undefined);
        message.sessionTime !== undefined &&
            (obj.sessionTime = message.sessionTime
                ? duration_1.Duration.toJSON(message.sessionTime)
                : undefined);
        message.challengeTime !== undefined &&
            (obj.challengeTime = message.challengeTime
                ? duration_1.Duration.toJSON(message.challengeTime)
                : undefined);
        message.globalSeed !== undefined &&
            (obj.globalSeed = base64FromBytes(message.globalSeed !== undefined ? message.globalSeed : new Uint8Array()));
        message.lowestAgentVersion !== undefined &&
            (obj.lowestAgentVersion = (message.lowestAgentVersion || long_1.default.UZERO).toString());
        message.highestAgentVersion !== undefined &&
            (obj.highestAgentVersion = (message.highestAgentVersion || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseParams();
        message.agentMinimumLock =
            object.agentMinimumLock !== undefined && object.agentMinimumLock !== null
                ? coin_1.Coin.fromPartial(object.agentMinimumLock)
                : undefined;
        message.userMinimumLock =
            object.userMinimumLock !== undefined && object.userMinimumLock !== null
                ? coin_1.Coin.fromPartial(object.userMinimumLock)
                : undefined;
        message.sessionTime =
            object.sessionTime !== undefined && object.sessionTime !== null
                ? duration_1.Duration.fromPartial(object.sessionTime)
                : undefined;
        message.challengeTime =
            object.challengeTime !== undefined && object.challengeTime !== null
                ? duration_1.Duration.fromPartial(object.challengeTime)
                : undefined;
        message.globalSeed = object.globalSeed ?? new Uint8Array();
        message.lowestAgentVersion =
            object.lowestAgentVersion !== undefined &&
                object.lowestAgentVersion !== null
                ? long_1.default.fromValue(object.lowestAgentVersion)
                : long_1.default.UZERO;
        message.highestAgentVersion =
            object.highestAgentVersion !== undefined &&
                object.highestAgentVersion !== null
                ? long_1.default.fromValue(object.highestAgentVersion)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseInnerValues() {
    return { seed: new Uint8Array() };
}
exports.InnerValues = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.seed.length !== 0) {
            writer.uint32(10).bytes(message.seed);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInnerValues();
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
    fromJSON(object) {
        return {
            seed: isSet(object.seed)
                ? bytesFromBase64(object.seed)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.seed !== undefined &&
            (obj.seed = base64FromBytes(message.seed !== undefined ? message.seed : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseInnerValues();
        message.seed = object.seed ?? new Uint8Array();
        return message;
    },
};
function createBaseModel() {
    return { name: "", repositoryUrl: "" };
}
exports.Model = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.repositoryUrl !== "") {
            writer.uint32(18).string(message.repositoryUrl);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
    fromJSON(object) {
        return {
            name: isSet(object.name) ? String(object.name) : "",
            repositoryUrl: isSet(object.repositoryUrl)
                ? String(object.repositoryUrl)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.name !== undefined && (obj.name = message.name);
        message.repositoryUrl !== undefined &&
            (obj.repositoryUrl = message.repositoryUrl);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseModel();
        message.name = object.name ?? "";
        message.repositoryUrl = object.repositoryUrl ?? "";
        return message;
    },
};
function createBasePrestige() {
    return { count: long_1.default.UZERO, total: long_1.default.UZERO };
}
exports.Prestige = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.count.isZero()) {
            writer.uint32(8).uint64(message.count);
        }
        if (!message.total.isZero()) {
            writer.uint32(16).uint64(message.total);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePrestige();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.count = reader.uint64();
                    break;
                case 2:
                    message.total = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            count: isSet(object.count) ? long_1.default.fromValue(object.count) : long_1.default.UZERO,
            total: isSet(object.total) ? long_1.default.fromValue(object.total) : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.count !== undefined &&
            (obj.count = (message.count || long_1.default.UZERO).toString());
        message.total !== undefined &&
            (obj.total = (message.total || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBasePrestige();
        message.count =
            object.count !== undefined && object.count !== null
                ? long_1.default.fromValue(object.count)
                : long_1.default.UZERO;
        message.total =
            object.total !== undefined && object.total !== null
                ? long_1.default.fromValue(object.total)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseInferenceAgent() {
    return {
        account: "",
        modelName: "",
        url: "",
        lastHeartbeat: undefined,
        version: long_1.default.UZERO,
        status: 0,
        lockBalance: undefined,
        prestige: undefined,
    };
}
exports.InferenceAgent = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.account !== "") {
            writer.uint32(10).string(message.account);
        }
        if (message.modelName !== "") {
            writer.uint32(18).string(message.modelName);
        }
        if (message.url !== "") {
            writer.uint32(26).string(message.url);
        }
        if (message.lastHeartbeat !== undefined) {
            timestamp_1.Timestamp.encode(toTimestamp(message.lastHeartbeat), writer.uint32(34).fork()).ldelim();
        }
        if (!message.version.isZero()) {
            writer.uint32(40).uint64(message.version);
        }
        if (message.status !== 0) {
            writer.uint32(48).int32(message.status);
        }
        if (message.lockBalance !== undefined) {
            coin_1.Coin.encode(message.lockBalance, writer.uint32(58).fork()).ldelim();
        }
        if (message.prestige !== undefined) {
            exports.Prestige.encode(message.prestige, writer.uint32(66).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInferenceAgent();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.account = reader.string();
                    break;
                case 2:
                    message.modelName = reader.string();
                    break;
                case 3:
                    message.url = reader.string();
                    break;
                case 4:
                    message.lastHeartbeat = fromTimestamp(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.version = reader.uint64();
                    break;
                case 6:
                    message.status = reader.int32();
                    break;
                case 7:
                    message.lockBalance = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.prestige = exports.Prestige.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            account: isSet(object.account) ? String(object.account) : "",
            modelName: isSet(object.modelName) ? String(object.modelName) : "",
            url: isSet(object.url) ? String(object.url) : "",
            lastHeartbeat: isSet(object.lastHeartbeat)
                ? fromJsonTimestamp(object.lastHeartbeat)
                : undefined,
            version: isSet(object.version)
                ? long_1.default.fromValue(object.version)
                : long_1.default.UZERO,
            status: isSet(object.status) ? agentStatusFromJSON(object.status) : 0,
            lockBalance: isSet(object.lockBalance)
                ? coin_1.Coin.fromJSON(object.lockBalance)
                : undefined,
            prestige: isSet(object.prestige)
                ? exports.Prestige.fromJSON(object.prestige)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.account !== undefined && (obj.account = message.account);
        message.modelName !== undefined && (obj.modelName = message.modelName);
        message.url !== undefined && (obj.url = message.url);
        message.lastHeartbeat !== undefined &&
            (obj.lastHeartbeat = message.lastHeartbeat.toISOString());
        message.version !== undefined &&
            (obj.version = (message.version || long_1.default.UZERO).toString());
        message.status !== undefined &&
            (obj.status = agentStatusToJSON(message.status));
        message.lockBalance !== undefined &&
            (obj.lockBalance = message.lockBalance
                ? coin_1.Coin.toJSON(message.lockBalance)
                : undefined);
        message.prestige !== undefined &&
            (obj.prestige = message.prestige
                ? exports.Prestige.toJSON(message.prestige)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseInferenceAgent();
        message.account = object.account ?? "";
        message.modelName = object.modelName ?? "";
        message.url = object.url ?? "";
        message.lastHeartbeat = object.lastHeartbeat ?? undefined;
        message.version =
            object.version !== undefined && object.version !== null
                ? long_1.default.fromValue(object.version)
                : long_1.default.UZERO;
        message.status = object.status ?? 0;
        message.lockBalance =
            object.lockBalance !== undefined && object.lockBalance !== null
                ? coin_1.Coin.fromPartial(object.lockBalance)
                : undefined;
        message.prestige =
            object.prestige !== undefined && object.prestige !== null
                ? exports.Prestige.fromPartial(object.prestige)
                : undefined;
        return message;
    },
};
function createBasePaymentContribution() {
    return { account: "", rate: long_1.default.UZERO, amount: undefined };
}
exports.PaymentContribution = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.account !== "") {
            writer.uint32(10).string(message.account);
        }
        if (!message.rate.isZero()) {
            writer.uint32(16).uint64(message.rate);
        }
        if (message.amount !== undefined) {
            coin_1.Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePaymentContribution();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.account = reader.string();
                    break;
                case 2:
                    message.rate = reader.uint64();
                    break;
                case 3:
                    message.amount = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            account: isSet(object.account) ? String(object.account) : "",
            rate: isSet(object.rate) ? long_1.default.fromValue(object.rate) : long_1.default.UZERO,
            amount: isSet(object.amount) ? coin_1.Coin.fromJSON(object.amount) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.account !== undefined && (obj.account = message.account);
        message.rate !== undefined &&
            (obj.rate = (message.rate || long_1.default.UZERO).toString());
        message.amount !== undefined &&
            (obj.amount = message.amount ? coin_1.Coin.toJSON(message.amount) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBasePaymentContribution();
        message.account = object.account ?? "";
        message.rate =
            object.rate !== undefined && object.rate !== null
                ? long_1.default.fromValue(object.rate)
                : long_1.default.UZERO;
        message.amount =
            object.amount !== undefined && object.amount !== null
                ? coin_1.Coin.fromPartial(object.amount)
                : undefined;
        return message;
    },
};
function createBasePayment() {
    return {
        chatSeq: long_1.default.UZERO,
        totalPayment: undefined,
        merkleRoot: new Uint8Array(),
        contributions: [],
    };
}
exports.Payment = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.chatSeq.isZero()) {
            writer.uint32(8).uint64(message.chatSeq);
        }
        if (message.totalPayment !== undefined) {
            coin_1.Coin.encode(message.totalPayment, writer.uint32(18).fork()).ldelim();
        }
        if (message.merkleRoot.length !== 0) {
            writer.uint32(26).bytes(message.merkleRoot);
        }
        for (const v of message.contributions) {
            exports.PaymentContribution.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePayment();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chatSeq = reader.uint64();
                    break;
                case 2:
                    message.totalPayment = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.merkleRoot = reader.bytes();
                    break;
                case 4:
                    message.contributions.push(exports.PaymentContribution.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            chatSeq: isSet(object.chatSeq)
                ? long_1.default.fromValue(object.chatSeq)
                : long_1.default.UZERO,
            totalPayment: isSet(object.totalPayment)
                ? coin_1.Coin.fromJSON(object.totalPayment)
                : undefined,
            merkleRoot: isSet(object.merkleRoot)
                ? bytesFromBase64(object.merkleRoot)
                : new Uint8Array(),
            contributions: Array.isArray(object?.contributions)
                ? object.contributions.map((e) => exports.PaymentContribution.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.chatSeq !== undefined &&
            (obj.chatSeq = (message.chatSeq || long_1.default.UZERO).toString());
        message.totalPayment !== undefined &&
            (obj.totalPayment = message.totalPayment
                ? coin_1.Coin.toJSON(message.totalPayment)
                : undefined);
        message.merkleRoot !== undefined &&
            (obj.merkleRoot = base64FromBytes(message.merkleRoot !== undefined ? message.merkleRoot : new Uint8Array()));
        if (message.contributions) {
            obj.contributions = message.contributions.map((e) => e ? exports.PaymentContribution.toJSON(e) : undefined);
        }
        else {
            obj.contributions = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBasePayment();
        message.chatSeq =
            object.chatSeq !== undefined && object.chatSeq !== null
                ? long_1.default.fromValue(object.chatSeq)
                : long_1.default.UZERO;
        message.totalPayment =
            object.totalPayment !== undefined && object.totalPayment !== null
                ? coin_1.Coin.fromPartial(object.totalPayment)
                : undefined;
        message.merkleRoot = object.merkleRoot ?? new Uint8Array();
        message.contributions =
            object.contributions?.map((e) => exports.PaymentContribution.fromPartial(e)) ||
                [];
        return message;
    },
};
function createBaseSession() {
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
exports.Session = {
    encode(message, writer = minimal_1.default.Writer.create()) {
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
            coin_1.Coin.encode(message.userLock, writer.uint32(42).fork()).ldelim();
        }
        if (message.minerLock !== undefined) {
            coin_1.Coin.encode(message.minerLock, writer.uint32(50).fork()).ldelim();
        }
        if (message.expirationAt !== undefined) {
            timestamp_1.Timestamp.encode(toTimestamp(message.expirationAt), writer.uint32(58).fork()).ldelim();
        }
        if (message.payment !== undefined) {
            exports.Payment.encode(message.payment, writer.uint32(66).fork()).ldelim();
        }
        if (message.status !== 0) {
            writer.uint32(72).int32(message.status);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
                    message.userLock = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.minerLock = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.expirationAt = fromTimestamp(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.payment = exports.Payment.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.status = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
            account: isSet(object.account) ? String(object.account) : "",
            modelName: isSet(object.modelName) ? String(object.modelName) : "",
            agentAccount: isSet(object.agentAccount)
                ? String(object.agentAccount)
                : "",
            userLock: isSet(object.userLock)
                ? coin_1.Coin.fromJSON(object.userLock)
                : undefined,
            minerLock: isSet(object.minerLock)
                ? coin_1.Coin.fromJSON(object.minerLock)
                : undefined,
            expirationAt: isSet(object.expirationAt)
                ? fromJsonTimestamp(object.expirationAt)
                : undefined,
            payment: isSet(object.payment)
                ? exports.Payment.fromJSON(object.payment)
                : undefined,
            status: isSet(object.status) ? sessionStatusFromJSON(object.status) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sessionId !== undefined && (obj.sessionId = message.sessionId);
        message.account !== undefined && (obj.account = message.account);
        message.modelName !== undefined && (obj.modelName = message.modelName);
        message.agentAccount !== undefined &&
            (obj.agentAccount = message.agentAccount);
        message.userLock !== undefined &&
            (obj.userLock = message.userLock
                ? coin_1.Coin.toJSON(message.userLock)
                : undefined);
        message.minerLock !== undefined &&
            (obj.minerLock = message.minerLock
                ? coin_1.Coin.toJSON(message.minerLock)
                : undefined);
        message.expirationAt !== undefined &&
            (obj.expirationAt = message.expirationAt.toISOString());
        message.payment !== undefined &&
            (obj.payment = message.payment
                ? exports.Payment.toJSON(message.payment)
                : undefined);
        message.status !== undefined &&
            (obj.status = sessionStatusToJSON(message.status));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSession();
        message.sessionId = object.sessionId ?? "";
        message.account = object.account ?? "";
        message.modelName = object.modelName ?? "";
        message.agentAccount = object.agentAccount ?? "";
        message.userLock =
            object.userLock !== undefined && object.userLock !== null
                ? coin_1.Coin.fromPartial(object.userLock)
                : undefined;
        message.minerLock =
            object.minerLock !== undefined && object.minerLock !== null
                ? coin_1.Coin.fromPartial(object.minerLock)
                : undefined;
        message.expirationAt = object.expirationAt ?? undefined;
        message.payment =
            object.payment !== undefined && object.payment !== null
                ? exports.Payment.fromPartial(object.payment)
                : undefined;
        message.status = object.status ?? 0;
        return message;
    },
};
function createBaseVrfSeed() {
    return { account: "", seed: new Uint8Array() };
}
exports.VrfSeed = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.account !== "") {
            writer.uint32(10).string(message.account);
        }
        if (message.seed.length !== 0) {
            writer.uint32(18).bytes(message.seed);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
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
    fromJSON(object) {
        return {
            account: isSet(object.account) ? String(object.account) : "",
            seed: isSet(object.seed)
                ? bytesFromBase64(object.seed)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.account !== undefined && (obj.account = message.account);
        message.seed !== undefined &&
            (obj.seed = base64FromBytes(message.seed !== undefined ? message.seed : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseVrfSeed();
        message.account = object.account ?? "";
        message.seed = object.seed ?? new Uint8Array();
        return message;
    },
};
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
function bytesFromBase64(b64) {
    if (globalThis.Buffer) {
        return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
    }
    else {
        const bin = globalThis.atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}
function base64FromBytes(arr) {
    if (globalThis.Buffer) {
        return globalThis.Buffer.from(arr).toString("base64");
    }
    else {
        const bin = [];
        arr.forEach((byte) => {
            bin.push(String.fromCharCode(byte));
        });
        return globalThis.btoa(bin.join(""));
    }
}
function toTimestamp(date) {
    const seconds = numberToLong(date.getTime() / 1000);
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = t.seconds.toNumber() * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === "string") {
        return new Date(o);
    }
    else {
        return fromTimestamp(timestamp_1.Timestamp.fromJSON(o));
    }
}
function numberToLong(number) {
    return long_1.default.fromNumber(number);
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29kZWMvYWdlbnQvdjEvYWdlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHlEQUFzRDtBQUN0RCw2REFBMEQ7QUFDMUQsK0RBQTREO0FBQzVELGdEQUF3QjtBQUN4QixpRUFBcUM7QUFFeEIsUUFBQSxlQUFlLEdBQUcsVUFBVSxDQUFDO0FBRTFDLElBQVksV0FJWDtBQUpELFdBQVksV0FBVztJQUNyQiwyRUFBdUIsQ0FBQTtJQUN2QiwrRUFBeUIsQ0FBQTtJQUN6Qiw4REFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSlcsV0FBVywyQkFBWCxXQUFXLFFBSXRCO0FBRUQsU0FBZ0IsbUJBQW1CLENBQUMsTUFBVztJQUM3QyxRQUFRLE1BQU0sRUFBRSxDQUFDO1FBQ2YsS0FBSyxDQUFDLENBQUM7UUFDUCxLQUFLLHFCQUFxQjtZQUN4QixPQUFPLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQztRQUN6QyxLQUFLLENBQUMsQ0FBQztRQUNQLEtBQUssdUJBQXVCO1lBQzFCLE9BQU8sV0FBVyxDQUFDLHFCQUFxQixDQUFDO1FBQzNDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDUixLQUFLLGNBQWMsQ0FBQztRQUNwQjtZQUNFLE9BQU8sV0FBVyxDQUFDLFlBQVksQ0FBQztJQUNwQyxDQUFDO0FBQ0gsQ0FBQztBQWJELGtEQWFDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsTUFBbUI7SUFDbkQsUUFBUSxNQUFNLEVBQUUsQ0FBQztRQUNmLEtBQUssV0FBVyxDQUFDLG1CQUFtQjtZQUNsQyxPQUFPLHFCQUFxQixDQUFDO1FBQy9CLEtBQUssV0FBVyxDQUFDLHFCQUFxQjtZQUNwQyxPQUFPLHVCQUF1QixDQUFDO1FBQ2pDLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQztRQUM5QjtZQUNFLE9BQU8sY0FBYyxDQUFDO0lBQzFCLENBQUM7QUFDSCxD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