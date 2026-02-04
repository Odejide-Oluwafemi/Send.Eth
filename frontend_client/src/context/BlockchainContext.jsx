import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "../utils";

export const BlockchainContext = createContext();

export const BlockchainContextProvider = ({ children }) => {
  const { ethereum } = window;
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [allTransactions, setAllTransactions] = useState([]);

  const getContract = async () => {
    const provider = new ethers.BrowserProvider(ethereum).provider;
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    setContract(contract);
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Install Metamask!");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Install Metamask!");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error("No Ethereum Object");
    }
  };

  const disconnectWallet = async () => {
    alert("Wallet Disconnected");
    setAccount(null);
  };

  useEffect(() => {
    getContract();
    checkIfWalletIsConnected();
    ethereum?.on("accountsChanged", handleAccountsChanged);
  }, []);

  const handleAccountsChanged = async () => {
    // alert("Account Changed");
    // window.location.reload();
    // checkIfWalletIsConnected();
    // ethereum?.removeListener("accountsChanged", handleAccountsChanged);
  };

  const sendTransaction = async (data) => {
    if (!contract) return alert("An error occured with Smart Contract!");

    try {
      const tx = await contract.createTransaction(
        data["receipient-address"],
        data.message,
        {
          value: ethers.parseEther(data.amount),
        },
      );

      await tx.wait();
    } catch (error) {
      console.error(error);
      alert("Failed to create Transaction!");
    }
  };

  useEffect(() => {
    loadAllTransactions();
  }, [contract]);

  const loadAllTransactions = async () => {
    if (!ethereum) return alert("Install Metamask!");
    if (!contract) return;
    
    let isFinished = false;
    const data = [];

    try {
      while (!isFinished) {
        data.push((await contract?.allTransactions(data.length)));
      }
    }
    catch(error) {
      console.log("No more Data")
      isFinished = true;
    }

    setAllTransactions(data);
  }

  return (
    <BlockchainContext.Provider
      value={{ connectWallet, disconnectWallet, account, sendTransaction, allTransactions }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
