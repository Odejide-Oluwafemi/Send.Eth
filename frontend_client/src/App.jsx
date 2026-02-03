import "./styles/app.css";
import { NavBar, Logo, ConnectWallet, InputForm } from "./components";
import { useContext, useState } from "react";
import { BlockchainContext } from "./context/BlockchainContext";

const App = () => {
  const {connectWallet, disconnectWallet, account} = useContext(BlockchainContext);
  const [showInputForm, setShowInputForm] = useState(false);
  const [transactionData, setTransactionData] = useState({
    "receipient-address": "",
    "amount": "",
    "message": "",
    "keyword": "" 
  });

  const sendTransaction = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setTransactionData({
      "receipient-address": data.get("receipient-address").toString(),
      "amount": parseFloat(data.get("amount")),
      "message": data.get("message").toString(),
      "keyword": data.get("keyword").toString(),
    });

    event.currentTarget.reset();
  }

  return (
    <>
      <header>
        <Logo />
        <NavBar />
        <ConnectWallet connectWallet={connectWallet} disconnectWallet={disconnectWallet} account={account}/>
      </header>

      <main>
        <section id="hero-section">
          <div className="hero-left-container">
            <h1>
              Send ETH{" "}
              <span className="text-orangeAccent font-bungee">safely</span> to
              any wallet{" "}
              <span className="text-orangeAccent font-bungee">instantly</span>
            </h1>
            {!showInputForm && <button id="try-it-out-btn" className="secondary-btn" onClick={() => setShowInputForm(true)}>Try it out now</button>}
          </div>

          <div className="hero-right-container">
            {showInputForm == false ?
              <img src="vite.svg" />
              : <InputForm sendTransaction={sendTransaction}/>
            }   
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
