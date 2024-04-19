"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAgentExtension = void 0;
const stargate_1 = require("@cosmjs/stargate");
const query_1 = require("./codec/agent/v1/query");
function setupAgentExtension(base) {
    const rpc = (0, stargate_1.createProtobufRpcClient)(base);
    const agentQueryService = new query_1.QueryClientImpl(rpc);
    return {
        agent: {
            modelRequest: async (name) => {
                return await agentQueryService.ModelRequest({ name });
            },
            modelRequestAll: async (key, offset, limit, countTotal, reverse) => {
                return await agentQueryService.ModelRequestAll({ pagination: { key, offset, limit, countTotal, reverse } });
            },
            params: async () => {
                return await agentQueryService.Params({});
            },
            inferenceAgentRequest: async (account) => {
                return await agentQueryService.InferenceAgentRequest({ account });
            },
            sessionRequest: async (id) => {
                return await agentQueryService.SessionRequest({ id });
            },
            sessionByAgentRequest: async (account, status, limit, orderDesc, expireTime) => {
                return await agentQueryService.SessionByAgentRequest({ account, status, limit, orderDesc, expireTime });
            },
            VRFSeedRequest: async (account) => {
                return await agentQueryService.VRFSeedRequest({ account });
            }
        }
    };
}
exports.setupAgentExtension = setupAgentExtension;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUcwQjtBQUMxQixrREFTZ0M7QUFpQmhDLFNBQWdCLG1CQUFtQixDQUFDLElBQWlCO0lBQ25ELE1BQU0sR0FBRyxHQUFHLElBQUEsa0NBQXVCLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLHVCQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFL0MsT0FBTztRQUNMLEtBQUssRUFBRTtZQUNMLFlBQVksRUFBRSxLQUFLLEVBQUUsSUFBWSxFQUFFLEVBQUU7Z0JBQ25DLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFDRCxlQUFlLEVBQUUsS0FBSyxFQUFFLEdBQWUsRUFBRSxNQUFZLEVBQUUsS0FBVyxFQUFFLFVBQW1CLEVBQUUsT0FBZ0IsRUFBRSxFQUFFO2dCQUMzRyxPQUFPLE1BQU0saUJBQWlCLENBQUMsZUFBZSxDQUFDLEVBQUMsVUFBVSxFQUFFLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBQyxFQUFDLENBQUMsQ0FBQztZQUMxRyxDQUFDO1lBQ0QsTUFBTSxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUNqQixPQUFPLE1BQU0saUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLENBQUM7WUFDRCxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsT0FBZSxFQUFFLEVBQUU7Z0JBQy9DLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDcEUsQ0FBQztZQUNELGNBQWMsRUFBRSxLQUFLLEVBQUUsRUFBVSxFQUFFLEVBQUU7Z0JBQ25DLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFDRCxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsT0FBZSxFQUFFLE1BQXFCLEVBQUUsS0FBVyxFQUFFLFNBQWtCLEVBQUUsVUFBaUIsRUFBRSxFQUFFO2dCQUMxSCxPQUFPLE1BQU0saUJBQWlCLENBQUMscUJBQXFCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUMxRyxDQUFDO1lBQ0QsY0FBYyxFQUFFLEtBQUssRUFBRSxPQUFlLEVBQUUsRUFBRTtnQkFDeEMsT0FBTyxNQUFNLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDN0QsQ0FBQztTQUNGO0tBQ0YsQ0FBQTtBQUNILENBQUM7QUE3QkQsa0RBNkJDIn0=