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
} from "./proto/agent/v1/query";

export interface AgentExtension {
  readonly agent: {
    readonly modelRequest: (modelId: Long) => Promise<QueryModelResponse>;
    readonly modelRequestAll: (key: Uint8Array, offset: Long, limit: Long, countTotal: boolean, reverse: boolean) => Promise<QueryModelAllResponse>;
    readonly params: () => Promise<QueryParamsResponse>;
    readonly inferenceAgentRequest: (id: Long) => Promise<QueryInferenceAgentResponse>;
    readonly sessionRequest: (id: string) => Promise<QuerySessionResponse>;
  };
}

export function setupAgentExtension(base: QueryClient): AgentExtension{
  const rpc = createProtobufRpcClient(base);
  const agentQueryService = new ClientQuery(rpc);

  return {
    agent: {
      modelRequest: async (modelId: Long) => {
        return await agentQueryService.ModelRequest({ id: modelId });
      },
      modelRequestAll: async (key: Uint8Array, offset: Long, limit: Long, countTotal: boolean, reverse: boolean) => {
        return await agentQueryService.ModelRequestAll({pagination: {key, offset, limit, countTotal, reverse}});
      },
      params: async () => {
        return await agentQueryService.Params({});
      },
      inferenceAgentRequest: async (id: Long) => {
        return await agentQueryService.InferenceAgentRequest({ id });
      },
      sessionRequest: async (id: string) => {
        return await agentQueryService.SessionRequest({ id });
      },
    }
  }
}