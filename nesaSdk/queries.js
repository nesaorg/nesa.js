"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAgentExtension = void 0;
const stargate_1 = require("@cosmjs/stargate");
const query_1 = require("./proto/agent/v1/query");
function setupAgentExtension(base) {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
    const agentQueryService = new query_1.QueryClientImpl(rpc);
    return {
        agent: {
            modelRequest: async (modelId) => {
                return await agentQueryService.ModelRequest({ id: modelId });
            },
            modelRequestAll: async (key, offset, limit, countTotal, reverse) => {
                return await agentQueryService.ModelRequestAll({ pagination: { key, offset, limit, countTotal, reverse } });
            },
            params: async () => {
                return await agentQueryService.Params({});
            },
            inferenceAgentRequest: async (id) => {
                return await agentQueryService.InferenceAgentRequest({ id });
            },
            sessionRequest: async (id) => {
                return await agentQueryService.SessionRequest({ id });
            },
        }
    };
}
exports.setupAgentExtension = setupAgentExtension;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUcwQjtBQUMxQixrREFPZ0M7QUFZaEMsU0FBZ0IsbUJBQW1CLENBQUMsSUFBaUI7SUFDbkQsTUFBTSxHQUFHLEdBQUcsSUFBQSxrQ0FBdUIsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxNQUFNLGlCQUFpQixHQUFHLElBQUksdUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUvQyxPQUFPO1FBQ0wsS0FBSyxFQUFFO1lBQ0wsWUFBWSxFQUFFLEtBQUssRUFBRSxPQUFhLEVBQUUsRUFBRTtnQkFDcEMsT0FBTyxNQUFNLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELENBQUM7WUFDRCxlQUFlLEVBQUUsS0FBSyxFQUFFLEdBQWUsRUFBRSxNQUFZLEVBQUUsS0FBVyxFQUFFLFVBQW1CLEVBQUUsT0FBZ0IsRUFBRSxFQUFFO2dCQUMzRyxPQUFPLE1BQU0saUJBQWlCLENBQUMsZUFBZSxDQUFDLEVBQUMsVUFBVSxFQUFFLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBQyxFQUFDLENBQUMsQ0FBQztZQUMxRyxDQUFDO1lBQ0QsTUFBTSxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUNqQixPQUFPLE1BQU0saUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLENBQUM7WUFDRCxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsRUFBUSxFQUFFLEVBQUU7Z0JBQ3hDLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0QsQ0FBQztZQUNELGNBQWMsRUFBRSxLQUFLLEVBQUUsRUFBVSxFQUFFLEVBQUU7Z0JBQ25DLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELENBQUM7U0FDRjtLQUNGLENBQUE7QUFDSCxDQUFDO0FBdkJELGtEQXVCQyJ9