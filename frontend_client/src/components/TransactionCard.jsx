import { shortenAddress, timestampToLocaleTime, weiToEth } from "../utils";

const TransactionCard = ({ data }) => {
  return (
    <div className="transaction-card-container">
      <div className="transaction-card-you-tag">You</div>
      <div className="card-top-section"></div>
      <div className="card-bottom-section">
        <span className="card-senders-detail">
          <span>
            <p>From:</p> <b>{shortenAddress(data.sender)}</b>
          </span>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M536.4-26.3c9.8-3.5 20.6-1 28 6.3s9.8 18.2 6.3 28l-178 496.9c-5 13.9-18.1 23.1-32.8 23.1-14.2 0-27-8.6-32.3-21.7l-64.2-158c-4.5-11-2.5-23.6 5.2-32.6l94.5-112.4c5.1-6.1 4.7-15-.9-20.6s-14.6-6-20.6-.9L229.2 276.1c-9.1 7.6-21.6 9.6-32.6 5.2L38.1 216.8c-13.1-5.3-21.7-18.1-21.7-32.3 0-14.7 9.2-27.8 23.1-32.8l496.9-178z" />
          </svg>

          <span style={{ textAlign: "right" }}>
            <p>To: </p>
            <b>{shortenAddress(data.receipient)}</b>
          </span>
        </span>

        <span className="card-transaction-details">
          <p>{weiToEth(data.amount)} ETH</p>
          {data.status == 2 ? (
            <svg
              className="transaction-success-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zm0-464a208 208 0 1 0 0 416 208 208 0 1 0 0-416zm70.7 121.9c7.8-10.7 22.8-13.1 33.5-5.3 10.7 7.8 13.1 22.8 5.3 33.5L243.4 366.1c-4.1 5.7-10.5 9.3-17.5 9.8-7 .5-13.9-2-18.8-6.9l-55.9-55.9c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l36 36 105.6-145.2z" />
            </svg>
          ) : data.status == 3 ? (
            <svg
              className="transaction-failed-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z" />
            </svg>
          ) : (
            <svg
              className="transaction-pending-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64l0 11c0 42.4 16.9 83.1 46.9 113.1l67.9 67.9-67.9 67.9C48.9 353.9 32 394.6 32 437l0 11c-17.7 0-32 14.3-32 32s14.3 32 32 32l320 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-11c0-42.4-16.9-83.1-46.9-113.1l-67.9-67.9 67.9-67.9c30-30 46.9-70.7 46.9-113.1l0-11c17.7 0 32-14.3 32-32S369.7 0 352 0L32 0zM96 75l0-11 192 0 0 11c0 25.5-10.1 49.9-28.1 67.9l-67.9 67.9-67.9-67.9C106.1 124.9 96 100.4 96 75z" />
            </svg>
          )}
          <p>{timestampToLocaleTime(data.timestamp)}</p>
        </span>
      </div>
    </div>
  );
};

export default TransactionCard;

/*
  enum TransactionStatus {
    Created,
    Pending,
    Success,
    Failed
  }
*/
