import { createContext, useEffect, useState } from "react";

export const BlockchainContext = createContext();

export const BlockchainContextProvider = ({ children }) => {
  const { ethereum } = window;
  const [account, setAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Install Metamask!");

      const accounts = await ethereum.request({method: "eth_accounts"});
      if (accounts.length) {
        setAccount(accounts[0]);
      }

    } catch(error) {
      console.error(error);
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Install Metamask!");
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      setAccount(accounts[0]);
    }
    catch(error) {
      console.error(error);
      throw new Error("No Ethereum Object");
    }
  }

  const disconnectWallet = async () => {
    alert("Wallet Disconnect");
    setAccount(null);
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return(
    <BlockchainContext.Provider value={{connectWallet, disconnectWallet, account}}>
      {children}
    </BlockchainContext.Provider>
  );
}