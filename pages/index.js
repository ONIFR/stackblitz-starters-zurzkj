import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const HomePage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkWeb3Availability = async () => {
      setIsWalletInstalled(!!window.ethereum);
    };

    checkWeb3Availability();
  }, []);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (window.ethereum && window.ethereum.selectedAddress) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setIsConnected(true);
          } else {
            setIsConnected(false);
          }
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.error(error);
        setIsConnected(false);
      }
    };

    if (isWalletInstalled) {
      checkConnection();
    }
  }, [isWalletInstalled]);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
      } else {
        console.error('Metamask is not installed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      router.push('/team');
    }
  }, [isConnected, router]);

  return (
    <div>
      {!isConnected && (
        <>
          {!isWalletInstalled && (
            <p>
              You have to install an Etherum wallet. Go the official Etherum's web site.
            </p>
          )}

          {isWalletInstalled && (
            <button className={styles['metamask-button']} onClick={connectWallet}>
              Connect your wallet
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;