/* eslint-disable */
import { Params } from "./params";
import Long from "long";
import { Model } from "./model";
import { Node } from "./node";
import { Miner } from "./miner";
import { Orchestrator } from "./orchestrator";
import { ModelBlock } from "./model_block";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dht.v1";

export interface OrchestratorMiner {
  orchestratorId: string;
  minerId: string;
}

/** GenesisState defines the dht module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters of the module. */
  params?: Params;
  model: Model[];
  node: Node[];
  miner: Miner[];
  orchestrator: Orchestrator[];
  orchestratorMiner: OrchestratorMiner[];
  modelBlock: ModelBlock[];
}

function createBaseOrchestratorMiner(): OrchestratorMiner {
  return { orchestratorId: "", minerId: "" };
}

export const OrchestratorMiner = {
  encode(
    message: OrchestratorMiner,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.orchestratorId !== "") {
      writer.uint32(10).string(message.orchestratorId);
    }
    if (message.minerId !== "") {
      writer.uint32(18).string(message.minerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrchestratorMiner {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrchestratorMiner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orchestratorId = reader.string();
          break;
        case 2:
          message.minerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OrchestratorMiner {
    return {
      orchestratorId: isSet(object.orchestratorId)
        ? String(object.orchestratorId)
        : "",
      minerId: isSet(object.minerId) ? String(object.minerId) : "",
    };
  },

  toJSON(message: OrchestratorMiner): unknown {
    const obj: any = {};
    message.orchestratorId !== undefined &&
      (obj.orchestratorId = message.orchestratorId);
    message.minerId !== undefined && (obj.minerId = message.minerId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OrchestratorMiner>, I>>(
    object: I
  ): OrchestratorMiner {
    const message = createBaseOrchestratorMiner();
    message.orchestratorId = object.orchestratorId ?? "";
    message.minerId = object.minerId ?? "";
    return message;
  },
};

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    model: [],
    node: [],
    miner: [],
    orchestrator: [],
    orchestratorMiner: [],
    modelBlock: [],
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
    for (const v of message.model) {
      Model.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.node) {
      Node.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.miner) {
      Miner.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.orchestrator) {
      Orchestrator.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.orchestratorMiner) {
      OrchestratorMiner.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.modelBlock) {
      ModelBlock.encode(v!, writer.uint32(58).fork()).ldelim();
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
          message.model.push(Model.decode(reader, reader.uint32()));
          break;
        case 3:
          message.node.push(Node.decode(reader, reader.uint32()));
          break;
        case 4:
          message.miner.push(Miner.decode(reader, reader.uint32()));
          break;
        case 5:
          message.orchestrator.push(
            Orchestrator.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.orchestratorMiner.push(
            OrchestratorMiner.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.modelBlock.push(ModelBlock.decode(reader, reader.uint32()));
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
      model: Array.isArray(object?.model)
        ? object.model.map((e: any) => Model.fromJSON(e))
        : [],
      node: Array.isArray(object?.node)
        ? object.node.map((e: any) => Node.fromJSON(e))
        : [],
      miner: Array.isArray(object?.miner)
        ? object.miner.map((e: any) => Miner.fromJSON(e))
        : [],
      orchestrator: Array.isArray(object?.orchestrator)
        ? object.orchestrator.map((e: any) => Orchestrator.fromJSON(e))
        : [],
      orchestratorMiner: Array.isArray(object?.orchestratorMiner)
        ? object.orchestratorMiner.map((e: any) =>
            OrchestratorMiner.fromJSON(e)
          )
        : [],
      modelBlock: Array.isArray(object?.modelBlock)
        ? object.modelBlock.map((e: any) => ModelBlock.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.model) {
      obj.model = message.model.map((e) => (e ? Model.toJSON(e) : undefined));
    } else {
      obj.model = [];
    }
    if (message.node) {
      obj.node = message.node.map((e) => (e ? Node.toJSON(e) : undefined));
    } else {
      obj.node = [];
    }
    if (message.miner) {
      obj.miner = message.miner.map((e) => (e ? Miner.toJSON(e) : undefined));
    } else {
      obj.miner = [];
    }
    if (message.orchestrator) {
      obj.orchestrator = message.orchestrator.map((e) =>
        e ? Orchestrator.toJSON(e) : undefined
      );
    } else {
      obj.orchestrator = [];
    }
    if (message.orchestratorMiner) {
      obj.orchestratorMiner = message.orchestratorMiner.map((e) =>
        e ? OrchestratorMiner.toJSON(e) : undefined
      );
    } else {
      obj.orchestratorMiner = [];
    }
    if (message.modelBlock) {
      obj.modelBlock = message.modelBlock.map((e) =>
        e ? ModelBlock.toJSON(e) : undefined
      );
    } else {
      obj.modelBlock = [];
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
    message.model = object.model?.map((e) => Model.fromPartial(e)) || [];
    message.node = object.node?.map((e) => Node.fromPartial(e)) || [];
    message.miner = object.miner?.map((e) => Miner.fromPartial(e)) || [];
    message.orchestrator =
      object.orchestrator?.map((e) => Orchestrator.fromPartial(e)) || [];
    message.orchestratorMiner =
      object.orchestratorMiner?.map((e) => OrchestratorMiner.fromPartial(e)) ||
      [];
    message.modelBlock =
      object.modelBlock?.map((e) => ModelBlock.fromPartial(e)) || [];
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
