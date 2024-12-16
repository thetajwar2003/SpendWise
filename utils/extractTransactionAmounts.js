/**
 * Extracts the amounts from an array of transactions.
 * @param {Array} transactions - The array of transaction objects.
 * @returns {Array} - An array of amounts.
 */
export function extractTransactionAmounts(transactions) {
    if (!Array.isArray(transactions)) {
        throw new Error("Input must be an array of transactions.");
    }

    return transactions.map(transaction => transaction.amount);
}