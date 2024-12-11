import { Connection, ParsedTransactionWithMeta, ParsedInstruction } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

export interface SimplifiedTransactionDetail {
  meta: any;
  message: string;
  status: 'success' | 'failure';
  signature: string;
  date: string;
}

export const useFetchTransactions = () => {
  const { publicKey } = useWallet();

  const parseTransaction = (tx: ParsedTransactionWithMeta): string => {
    const instructions = tx.transaction.message.instructions;
    const userPubkey = publicKey?.toBase58();

    let operations = new Set<string>();
    let involvedPrograms = new Set<string>();

    const parseTokenTransfer = (ix: ParsedInstruction) => {
      if (ix.parsed.info.source === userPubkey) {
        operations.add('send');
      } else if (ix.parsed.info.destination === userPubkey) {
        operations.add('receive');
      }
    };

    const parseSystemTransfer = (ix: ParsedInstruction) => {
      if (ix.parsed.info.source === userPubkey) {
        operations.add('send');
      } else if (ix.parsed.info.destination === userPubkey) {
        operations.add('receive');
      }
    };

    for (const ix of instructions) {
      if ('programId' in ix) {
        involvedPrograms.add(ix.programId.toBase58());
      }

      if ('parsed' in ix) {
        if (ix.program === 'spl-token') {
          if (['transfer', 'transferChecked'].includes(ix.parsed.type)) {
            parseTokenTransfer(ix);
          }
        } else if (ix.program === 'system') {
          if (ix.parsed.type === 'transfer') {
            parseSystemTransfer(ix);
          }
        }
      } else if ('data' in ix) {
      }
    }

    // Check for known swap program IDs
    const knownSwapPrograms = [
      'JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB', // Jupiter
      '9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP', // Orca
      'whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc', // Whirlpool
      // Add more swap program IDs as needed
    ];

    if (knownSwapPrograms.some(program => involvedPrograms.has(program))) {
      operations.add('swap');
    }

    if (operations.has('swap')) {
      return "Swapped";
    } else if (operations.has('send') && operations.has('receive')) {
      return "Swapped"; 
    } else if (operations.has('send')) {
      return "Sent";
    } else if (operations.has('receive')) {
      return "Received";
    } else {
      if (involvedPrograms.has('ComputeBudget111111111111111111111111111111')) {
        return "App Integration"; 
      } else if (involvedPrograms.has('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')) {
        return "App Integration"; 
      } else if (involvedPrograms.has('11111111111111111111111111111111')) {
        return "App Integration";
      } else {
        return "App Integration";
      }
    }
  };

  const fetchTransactions = async (
    connection: Connection,
    limit: number = 10
  ): Promise<SimplifiedTransactionDetail[]> => {
    if (!publicKey) {
      throw new Error("Wallet not connected");
    }

    try {
      const signatures = await connection.getSignaturesForAddress(publicKey, { limit });
      const transactions: SimplifiedTransactionDetail[] = [];

      for (const { signature, slot, err } of signatures) {
        const tx = await connection.getParsedTransaction(signature, { maxSupportedTransactionVersion: 0 });

        if (tx) {
          const message = parseTransaction(tx);
          
          const timestamp = await connection.getBlockTime(slot) ?? 0;
          const date = new Date(timestamp * 1000).toLocaleDateString();

          transactions.push({
              message,
              status: err ? 'failure' : 'success',
              signature,
              date,
              meta: undefined
          });
        }
      }

      return transactions;
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      throw error;
    }
  };

  return fetchTransactions;
};