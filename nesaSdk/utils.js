"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeliverTxFailureMessage = void 0;
function createDeliverTxFailureMessage(result) {
    return `Error when broadcasting tx ${result.transactionHash} at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`;
}
exports.createDeliverTxFailureMessage = createDeliverTxFailureMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBZ0IsNkJBQTZCLENBQzNDLE1BQXlCO0lBRXpCLE9BQU8sOEJBQThCLE1BQU0sQ0FBQyxlQUFlLGNBQWMsTUFBTSxDQUFDLE1BQU0sV0FBVyxNQUFNLENBQUMsSUFBSSxjQUFjLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM1SSxDQUFDO0FBSkQsc0VBSUMifQ==