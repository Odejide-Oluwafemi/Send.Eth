// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SendEth {
    error SendEth__SentZeroAmount();
    error SendEth__TransferFailed();
    error SendEth__InvalidTransactionId();
    error SendEth__TransactionPending();

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
    mapping (address user => mapping (uint256 id => Transaction)) private  userTransactionById;

    function createTransaction(address _receipient, string memory _message) public payable  {
        if (msg.value == 0) revert SendEth__SentZeroAmount();
        uint256 txId = allTransactions.length + 1;

        Transaction memory transaction = Transaction(
            txId, msg.sender, _receipient, msg.value, _message, block.timestamp, TransactionStatus.Created
        );

        // State Changes
        allTransactions.push(transaction);
        userTransactions[msg.sender].push(transaction);
        userTransactionById[msg.sender][txId] = transaction;

        // Process Transaction
        sendTransaction(transaction);
    }

    modifier isValidId(uint256 id) {
        if (id <= 0 || id > allTransactions.length) revert SendEth__InvalidTransactionId();
        _;
    }

    modifier preventReentrancy(TransactionStatus status) {
        if (status != TransactionStatus.Created) revert SendEth__TransactionPending();
        _;
    }

    function sendTransaction(Transaction memory transaction) internal isValidId(transaction.id) preventReentrancy(transaction.status) {
        userTransactionById[transaction.sender][transaction.id].status = TransactionStatus.Pending;

        (bool success, ) = transaction.receipient.call{value: transaction.amount}("");

        if (!success) {
            userTransactionById[transaction.sender][transaction.id].status = TransactionStatus.Failed;
            revert SendEth__TransferFailed();
        }
    }

    function getAllUserTransactions(address user) external view returns (Transaction[] memory) {
        return userTransactions[user];
    }

    function getSpecificUserTransaction(address user, uint256 txId) external isValidId(txId) view returns (Transaction memory) {
        return userTransactionById[user][txId];
    }
}