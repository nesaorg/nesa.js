import { DeliverTxResponse } from '@cosmjs/stargate';

export function createDeliverTxFailureMessage(
  result: DeliverTxResponse,
): string {
  return `Error when broadcasting tx ${result.transactionHash} at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`;
}