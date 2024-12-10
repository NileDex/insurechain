import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { CoinbaseWalletAdapter, MathWalletAdapter, PhantomWalletAdapter, SolflareWalletAdapter, TrustWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';


// This is the component we created earlier
const WalletConnectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const network = React.useMemo(() => clusterApiUrl('devnet'), []);
    const wallets = useMemo(
        () => [
          new PhantomWalletAdapter(),
          new SolflareWalletAdapter(),
          new MathWalletAdapter(),
          new TrustWalletAdapter(),
          new CoinbaseWalletAdapter(),
        ],
        [network]
      );


    return (
        <ConnectionProvider endpoint={network}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
  
    );
};

export default WalletConnectionProvider;