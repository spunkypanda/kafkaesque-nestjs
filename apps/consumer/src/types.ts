export type DbEvent = {
  address: Buffer;
  block: number;
  block_hash: Buffer;
  tx_hash: Buffer;
  tx_index: number;
  log_index: number;
  timestamp: number;
  from: Buffer;
  to: Buffer;
  amount: string;
  chainId: number;
};
