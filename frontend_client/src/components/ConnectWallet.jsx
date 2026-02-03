import { shortenAddress } from "../utils";

const ConnectWallet = ({connectWallet, disconnectWallet, account}) => {
  const handleConnect = () => {
    if (!account)  connectWallet();
    else disconnectWallet();
  }

  return(
      <button className="primary-btn" onClick={handleConnect}>
        {account ? shortenAddress(account) : "Connect Wallet"}
      </button>
  );
}

export default ConnectWallet;