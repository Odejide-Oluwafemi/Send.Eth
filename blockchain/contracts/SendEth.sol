// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SendEth {
    error SendEth__SentZeroAmount();
    error SendEth__TransferFailed();
    error SendEth__InvalidTransactionId();
    error SendEth__NotAValidTransaction();

    enum TransactionStatus {
        Created,
        Pending,
        Success,
        Failed
    }

    struct Transaction {
        uint256 id;
        address sender;
        address receipient;
        uint256 amount;
        string message;
        uint256 timestamp;
        TransactionStatus status;
    }

    Transaction[] public allTransactions;
    mapping (address user => Transaction[]) private  userTransactions;

    function createTransaction(address _receipient, string memory _message) public payable  {
        if (msg.value == 0) revert SendEth__SentZeroAmount();

        uint256 txId = allTransactions.length + 1;

        Transaction memory transaction = Transaction(
            txId, msg.sender, _receipient, msg.value, _message, block.timestamp, TransactionStatus.Created
        );

        // Process Transaction
        sendTransaction(transaction);
    }

    modifier isValidId(uint256 id) {
        if (id <= 0 || id > allTransactions.length) revert SendEth__InvalidTransactionId();
        _;
    }

    modifier preventReentrancy(TransactionStatus status) {
        if (status != TransactionStatus.Created) revert SendEth__NotAValidTransaction();
        _;
    }

    function sendTransaction(Transaction memory transaction) internal preventReentrancy(transaction.status) {
        transaction.status = TransactionStatus.Pending;

        (bool success, ) = transaction.receipient.call{value: transaction.amount}("");

        if (!success) {
            transaction.status = TransactionStatus.Failed;
            revert SendEth__TransferFailed();
        }
        else {
            transaction.status = TransactionStatus.Success;
        }

        allTransactions.push(transaction);
        userTransactions[msg.sender].push(transaction);
    }

    function getAllUserTransactions(address user) external view returns (Transaction[] memory) {
        return userTransactions[user];
    }

    function getTransactionById(uint256 txId) external isValidId(txId) view returns (Transaction memory) {
        return allTransactions[txId - 1];
    }
}