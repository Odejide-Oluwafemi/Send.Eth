import LoadingSpinner from "./LoadingSpinner";
import SelectNetwork from "./SelectNetwork";

const InputForm = ({
  sendTransaction,
  setShowInputForm,
  transactionInProgress,
  transactionDetail,
  setTransactionDetail,
}) => {
  return (
    <div id="input-form-container">
      <img src="vite.svg" />

      <div>
        <SelectNetwork />
        <h2>Make a Transaction</h2>

        {transactionInProgress ? (
          <LoadingSpinner message="Transaction in Progress" />
        ) : (
          <form id="transaction-form" onSubmit={(e) => sendTransaction(e)}>
            <span className="form-group">
              <label htmlFor="receipient-address">Receipient Address:</label>
              <input
                type="text"
                name="receipient-address"
                placeholder="0x..."
                defaultValue={
                  transactionDetail
                    ? transactionDetail["receipient-address"].toString()
                    : ""
                }
                onChange={(e) =>
                  setTransactionDetail((prev) => ({
                    ...prev,
                    "receipient-address": e.target.value.toString(),
                  }))
                }
              />
            </span>

            <span className="form-group">
              <label htmlFor="amount">Amount(ETH):</label>
              <input
                type="number"
                min={0}
                step={0.000001}
                name="amount"
                placeholder="0.1 ETH"
                defaultValue={transactionDetail ? transactionDetail.amount : ""}
                onChange={(e) => {
                  if (parseFloat(e.target.value))
                  {
                      setTransactionDetail((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }));
                  }
                  // let amount;

                  // try {
                  //   amount = BigInt(e.target.value.toString());
                  // }catch(error) {return;}
                  // setTransactionDetail((prev) => ({
                  //   ...prev,
                  //   amount: amount,
                  // }));
                }
                }
              />
            </span>

            <span className="form-group">
              <label htmlFor="message">Message (max. 20 characters):</label>
              <textarea
                type="text"
                name="message"
                maxLength={20}
                placeholder="Here's a little something pal :)"
                // defaultValue={transactionDetail ? transactionDetail.message.toString() : ""}
                onChange={(e) =>
                  setTransactionDetail((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
              />
            </span>

            <button id="submit-transaction-btn" type="submit">
              Send <span className="text-orange">Instant</span> Transaction
            </button>
          </form>
        )}
      </div>

      <input
        className="hide-form-btn"
        type="button"
        value="Hide"
        onClick={() => setShowInputForm(false)}
      />
    </div>
  );
};

export default InputForm;
