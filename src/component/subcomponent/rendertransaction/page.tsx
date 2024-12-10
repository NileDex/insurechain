import { useState, useEffect } from "react";
import { useFetchTransactions } from './transaction'; 
import { SimplifiedTransactionDetail } from './transaction';
import { Connection } from '@solana/web3.js'; 
import "./transaction.css"

const TransactionCard = () => {
  const [transactions, setTransactions] = useState<SimplifiedTransactionDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchTransactions = useFetchTransactions();

  // Define the RPC endpoints here
  const RPC_ENDPOINTS = [
    "https://devnet.helius-rpc.com/?api-key=d9ddb0e0-ffa5-423e-9b08-638f40b6fd2e"
  ];

  // Load transactions function
  const loadTransactions = async () => {
    setIsLoading(true); // Start loading
    const connection = new Connection(RPC_ENDPOINTS[0]);
    try {
      const fetchedTransactions = await fetchTransactions(connection, 10);
      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    loadTransactions(); // Initial fetch when component mounts

    // Set up automatic reload every 30 seconds
    const intervalId = setInterval(() => {
      loadTransactions(); // Fetch transactions every 30 seconds
    }, 30000); // 30 seconds

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="transactioncard">
      <div className="titletxn">
        <h4>Transactions</h4>
        <span className="insure">New</span>
      </div>

      {/* Show loading spinner while fetching transactions */}
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p className="text-gray-500">Loading transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <p>No transactions available</p>
      ) : (
        transactions.map((tx) => (
          <div key={tx.signature} className="transaction">
            <div className="transaction-header">
              <span className="transaction-hash">Tx Hash: {tx.signature.slice(0, 8)}...</span>
              <span className={`transaction-status ${tx.status === 'success' ? 'success' : 'failure'}`}>
                {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
              </span>
            </div>
            <div className="transaction-body">
              <div className="transaction-date">Date: {tx.date}</div>
              <div className="transaction-amount">Status: {tx.message}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionCard;
