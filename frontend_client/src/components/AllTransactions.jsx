import { ethers } from "ethers";
import TransactionCard from "./TransactionCard";

const AllTransactions = ({ data }) => {
  const destructureData = (d) => {
    return {
      id: d[0],
      sender: d[1],
      receipient: d[2],
      amount: d[3],
      message: d[4],
      timestamp: d[5],
      status: d[6],
    };
  };

  return (
    <section id="all-transactions-section">
      <h1>All Transactions</h1>

      <div className="all-transactions-display-container">
        {Array.from(data).map((d) => (
          <TransactionCard key={destructureData(d).id} data={destructureData(d)}/>
        ))}
      </div>
    </section>
  );
};

export default AllTransactions;

/*
  uint256 id;
  address sender;
  address receipient;
  uint256 amount;
  string message;
  uint256 timestamp;
  TransactionStatus status;
*/
