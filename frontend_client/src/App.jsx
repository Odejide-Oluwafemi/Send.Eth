import "./styles/app.css";
import { NavBar, Logo, ConnectWallet, InputForm } from "./components";
import { useContext, useState } from "react";
import { BlockchainContext } from "./context/BlockchainContext";
import AllTransactions from "./components/AllTransactions";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const {
    connectWallet,
    disconnectWallet,
    account,
    sendTransaction,
    allTransactions,
    isLoading,
    isValidEtherAmount,
  } = useContext(BlockchainContext);

  const [showInputForm, setShowInputForm] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [transactionDetail, setTransactionDetail] = useState({
    "receipient-address": "",
    amount: "",
    message: "",
  });

  const validTransaction = (data) => {
    if (!data) return false;
    console.log("Data Pass")

    if (!data["receipient-address"] || !data.message || !data.amount)
      return false;

    console.log("Data details pass")

    try {
      isValidEtherAmount(data.amount.toString());
    } catch (e) {
      console.error(e);
      return false;
    }

    return true;
  };

  const handleSendTransaction = async (event) => {
    event.preventDefault();
    if (transactionInProgress)
      return alert("A Transaction is still in progress...");

    const data = new FormData(event.currentTarget);
    const decodedData = {
      "receipient-address": data.get("receipient-address").toString(),
      amount: data.get("amount").toString(),
      message: data.get("message").toString(),
    };
    setTransactionDetail(decodedData);
    console.log(transactionDetail);
    if (!validTransaction(transactionDetail))
      return alert("Fill in the transaction details appropriately");

    setTransactionInProgress(true);

    let success = await sendTransaction(decodedData);

    if (success) alert("Transaction Successful");
    else alert("Transaction Failed");

    setTransactionInProgress(false);
    setTransactionDetail({
      "receipient-address": "",
      amount: "",
      message: "",
    });
  };

  const handleFormShow = async () => {
    if (!account) {
      alert("Connecting Wallet...");
      await connectWallet();
    } else setShowInputForm(true);
  };

  return (
    <>
      <header>
        <Logo />
        <NavBar />
        <ConnectWallet
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          account={account}
        />
      </header>

      <marquee>
        &copy; 2026, Odejide Oluwafemi (Group 1) @
        <b className="text-orangeAccent"> Web3Bridge </b>Cohort XIV{" "}
      </marquee>

      <main>
        <section id="hero-section">
          <div className="hero-left-container">
            <h1>
              Send ETH{" "}
              <span className="text-orangeAccent font-bungee">safely</span> to
              any wallet{" "}
              <span className="text-orangeAccent font-bungee">instantly</span>
            </h1>
            {!showInputForm && (
              <button
                id="try-it-out-btn"
                className="secondary-btn"
                onClick={handleFormShow}
              >
                Try it out now
              </button>
            )}
          </div>

          <div className="hero-right-container">
            {showInputForm == false ? (
              <img src="vite.svg" />
            ) : (
              <InputForm
                sendTransaction={handleSendTransaction}
                setShowInputForm={setShowInputForm}
                transactionInProgress={transactionInProgress}
                transactionDetail={transactionDetail}
                setTransactionDetail={setTransactionDetail}
              />
            )}
          </div>
        </section>

        <section id="web3bridge-section">
          <p>Proudly Web3Bridge</p>
        </section>

        <section id="all-transactions-section">
          <h1>All Transactions</h1>

          <div>
            {allTransactions != [] && (
              <AllTransactions data={allTransactions} />
            )}
            {isLoading && <LoadingSpinner />}
          </div>

          {/* {isLoading ? (
            <LoadingSpinner />
          ) : (
            <AllTransactions data={allTransactions} />
          )} */}
        </section>
      </main>
    </>
  );
};

export default App;
