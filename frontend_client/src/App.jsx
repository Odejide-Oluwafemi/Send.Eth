import "./styles/app.css";
import { NavBar, Logo, ConnectWallet, InputForm } from "./components";
import { useContext, useState } from "react";
import { BlockchainContext } from "./context/BlockchainContext";
import AllTransactions from "./components/AllTransactions";

const App = () => {
  const {connectWallet, disconnectWallet, account, sendTransaction, allTransactions} = useContext(BlockchainContext);
  const [showInputForm, setShowInputForm] = useState(false);
  const handleSendTransaction = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    event.currentTarget.reset();

    sendTransaction({
      "receipient-address": data.get("receipient-address").toString(),
      "amount": data.get("amount").toString(),
      "message": data.get("message").toString(),
    });
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
              : <InputForm sendTransaction={handleSendTransaction}/>
            }   
          </div>
        </section>

        <AllTransactions data={allTransactions}/>
      </main>
    </>
  );
};

export default App;