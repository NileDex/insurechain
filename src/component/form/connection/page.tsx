import { Program, AnchorProvider, Wallet } from "@project-serum/anchor";
import { Connection, PublicKey, Commitment } from "@solana/web3.js";
import idl from "./idl.json"; // Ensure path and IDL are correct
import { WalletContextState } from "@solana/wallet-adapter-react";

const programID = new PublicKey("4mqjCqH4AQEZ7pYn9pxTEXwWCnKrcWaD1TsUd668vSNz");
const network =
  "https://devnet.helius-rpc.com/?api-key=d9ddb0e0-ffa5-423e-9b08-638f40b6fd2e";
const opts: { preflightCommitment: Commitment } = {
  preflightCommitment: "confirmed",
};

// Create a new connection
const createConnection = () =>
  new Connection(network, opts.preflightCommitment);

// Function to get the provider
export const getProvider = (wallet: WalletContextState) => {
  if (typeof window === "undefined" || !wallet || !wallet.connected) {
    console.log("Wallet not connected or window object not defined");
    return null;
  }
  const connection = createConnection();
  const provider = new AnchorProvider(
    connection,
    wallet as unknown as Wallet,
    opts
  );
  return provider;
};

// Function to get the program
export const getProgram = (walletContext: WalletContextState) => {
  const provider = getProvider(walletContext);
  if (!provider) {
    console.error("Provider is null");
    return null;
  }
  try {
    const program = new Program(idl as any, programID, provider);
    return program;
  } catch (error) {
    console.error("Failed to initialize program:", error);
    return null;
  }
};