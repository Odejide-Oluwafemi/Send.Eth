import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI, NETWORKS } from "../utils";

export const BlockchainContext = createContext();

export const BlockchainContextProvider = ({ children }) => {
  const { ethereum } = window;
  const provider = new ethers.BrowserProvider(ethereum);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [allTransactions, setAllTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState(null);

  const getContract = async () => {
  if (!provider) return;
  const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
  setContract(contractInstance);
  };

  const isValidEtherAmount = (amount) => {
    try {
      return ethers.parseEther(amount);
    }
    catch(e) {
      return false;
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Install Metamask!");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setAccount(accounts[0]);
        // If a provider signer is available, create a signer-backed contract
        try {
          const signer = await provider.getSigner();
          const signerContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
          setContract(signerContract);
        } catch (e) {
          // ignore: signer may not be available yet
        }
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Install Metamask!");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts) return alert("Please approve Wallet connection");

      setAccount(accounts[0]);
      // Create a contract instance connected to the signer for write calls
      try {
        const signer = await provider.getSigner();
        const signerContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        setContract(signerContract);
      } catch (e) {
        console.error("Failed to create signer-backed contract:", e);
      }
    } catch (error) {
      if (
        error.message.includes(
          "Request of type 'wallet_requestPermissions' already pending",
        )
      )
        return alert("Connection still pending.\nApprove from metamask");
      
      else console.error(error);
    }
  };

  const disconnectWallet = async () => {
    alert("Disconnect wallet from Metamask");
    // setAccount(null);
  };

  useEffect(() => {
    getContract();
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    ethereum?.on("accountsChanged", handleAccountsChanged);
    // provider?.provider?.on("chainChanged", (chainId) => chainChanged(chainId));
    // ethereum?.on("chainChanged", (chainId) => chainChanged(chainId));
    setSelectedNetwork(NETWORKS[getNetwork()]);
    console.log(`Selected Network: ${selectedNetwork}`);
  }, [provider]);

  async function chainChanged(chainId) {
    console.log("New ID: ", chainId);
  }

  const handleAccountsChanged = async () => {
    window.location.reload();
  };

  const sendTransaction = async (data) => {
    if (!ethereum) return alert("Install Metamask!");

    if (!account) {
      await connectWallet();
    }

    try {
      const signer = await provider.getSigner();
      const writableContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await writableContract.createTransaction(
        data["receipient-address"],
        data.message,
        {
          value: ethers.parseEther(data.amount),
        }
      );

      await tx.wait();
      return true;
    } catch (error) {
      return false;
      console.error(error);
      alert("Failed to create Transaction!");
    }
  };

  useEffect(() => {
    loadAllTransactions();
  }, [contract]);

  useEffect(() => {
    console.log(selectedNetwork);
  }, [selectedNetwork]);

  async function getNetwork() {
    if (!provider) return;
    return (await provider?.getNetwork())["chainId"];
  }

  const loadAllTransactions = async () => {
    if (!ethereum) return alert("Install Metamask!");
    if (!contract) return;

    let isFinished = false;
    const data = [];

    try {
      while (!isFinished) {
        data.push(await contract?.allTransactions(data.length));
        setAllTransactions(data);
      }
    } catch (error) {
      isFinished = true;
    }

    setIsLoading(false);
  };

  return (
    <BlockchainContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        account,
        sendTransaction,
        allTransactions,
        isLoading,
        selectedNetwork,
        setSelectedNetwork,
        isValidEtherAmount
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
