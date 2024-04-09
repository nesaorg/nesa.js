/// <reference types="long" />
import { QueryClient } from "@cosmjs/stargate";
import { QueryModelAllResponse, QueryModelResponse, QueryParamsResponse, QueryInferenceAgentResponse, QuerySessionResponse } from "./proto/agent/v1/query";
export interface AgentExtension {
    readonly agent: {
        readonly modelRequest: (modelId: Long) => Promise<QueryModelResponse>;
        readonly modelRequestAll: (key: Uint8Array, offset: Long, limit: Long, countTotal: boolean, reverse: boolean) => Promise<QueryModelAllResponse>;
        readonly params: () => Promise<QueryParamsResponse>;
        readonly inferenceAgentRequest: (id: Long) => Promise<QueryInferenceAgentResponse>;
        readonly sessionRequest: (id: string) => Promise<QuerySessionResponse>;
    };
}
export declare function setupAgentExtension(base: QueryClient): AgentExtension;
