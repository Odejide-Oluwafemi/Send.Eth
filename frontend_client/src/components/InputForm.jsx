const InputForm = ({sendTransaction}) => {
  return (
    <div id="input-form-container">
      <img src="vite.svg" />

      <div>
        <h2>Make a Transaction</h2>

        <form id="transaction-form" onSubmit={(e) => sendTransaction(e)}>
          <span className="form-group">
            <label htmlFor="receipient-address">Receipient Address:</label>
            <input type="text" name="receipient-address" placeholder="0x..."/>
          </span>

          <span className="form-group">
            <label htmlFor="amount">Amount(ETH):</label>
            <input type="number" min={0} step={0.01} name="amount" placeholder="0.1 ETH"/>
          </span>

          <span className="form-group">
            <label htmlFor="message">Message (max. 100 characters):</label>
            <textarea type="text" name="message" maxLength={100} placeholder="Here's a little something pal :)"/>
          </span>

          <button id="submit-transaction-btn" type="submit">Send <span className="text-orange">Instant</span> Transaction</button>
        </form>
      </div>
    </div>
  );
}

export default InputForm;