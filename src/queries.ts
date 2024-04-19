import {
  createProtobufRpcClient,
  QueryClient,
} from "@cosmjs/stargate";
import {
  QueryClientImpl as ClientQuery,
  QueryModelAllResponse,
  QueryModelResponse,
  QueryParamsResponse,
  QueryInferenceAgentResponse,
  QuerySessionResponse,
  QueryVRFSeedResponse,
  QuerySessionByAgentResponse
} from "./codec/agent/v1/query";
import {
  SessionStatus
} from './codec/agent/v1/agent';

export interface AgentExtension {
  readonly agent: {
    readonly modelRequest: (name: string) => Promise<QueryModelResponse>;
    readonly modelRequestAll: (key: Uint8Array, offset: Long, limit: Long, countTotal: boolean, reverse: boolean) => Promise<QueryModelAllResponse>;
    readonly params: () => Promise<QueryParamsResponse>;
    readonly inferenceAgentRequest: (account: string) => Promise<QueryInferenceAgentResponse>;
    readonly sessionRequest: (id: string) => Promise<QuerySessionResponse>;
    readonly sessionByAgentRequest: (account: string, status: SessionStatus, limit: Long, orderDesc: boolean, expireTime?: Date) => Promise<QuerySessionByAgentResponse>;
    readonly VRFSeedRequest: (account: string) => Promise<QueryVRFSeedResponse>;
  };
}

export function setupAgentExtension(base: QueryClient): AgentExtension{
  const rpc = createProtobufRpcClient(base);
  const agentQueryService = new ClientQuery(rpc);

  return {
    agent: {
      modelRequest: async (name: string) => {
        return await agentQueryService.ModelRequest({ name });
      },
      modelRequestAll: async (key: Uint8Array, offset: Long, limit: Long, countTotal: boolean, reverse: boolean) => {
        return await agentQueryService.ModelRequestAll({pagination: {key, offset, limit, countTotal, reverse}});
      },
      params: async () => {
        return await agentQueryService.Params({});
      },
      inferenceAgentRequest: async (account: string) => {
        return await agentQueryService.InferenceAgentRequest({ account });
      },
      sessionRequest: async (id: string) => {
        return await agentQueryService.SessionRequest({ id });
      },
      sessionByAgentRequest: async (account: string, status: SessionStatus, limit: Long, orderDesc: boolean, expireTime?: Date) => {
        return await agentQueryService.SessionByAgentRequest({ account, status, limit, orderDesc, expireTime });
      },
      VRFSeedRequest: async (account: string) => {
        return await agentQueryService.VRFSeedRequest({ account });
      }
    }
  }
}