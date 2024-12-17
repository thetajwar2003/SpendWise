import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchTransactionSummary = async (token, userId) => {
    try {
        const response = await axios.post(
            `${ API_URL }/plaid/transactions/summary`,
            { user_id: userId },
            {
                headers: {
                    Authorization: `Bearer ${ token }`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching transaction summary:', error);
        throw error;
    }
};

export const fetchMonthlySummary = async (access_token, user_id) => {
    try {
        const response = await axios.post(
            `${ API_URL }/plaid/transactions/monthly-summary`,
            { user_id },
            {
                headers: {
                    Authorization: `Bearer ${ access_token }`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.monthly_summary;
    } catch (error) {
        console.error('Error fetching monthly summary:', error);
        throw error;
    }
};

export const fetchExpenseCategories = async (access_token, user_id) => {
    const response = await axios.post(`${ API_URL }/plaid/transactions/expense-categories`, {
        user_id,
    }, {
        headers: {
            Authorization: `Bearer ${ access_token }`,
        },
    });

    return response.data;
};

export const fetchUserBankAccounts = async (accessToken, userId) => {
    const response = await fetch(`${ API_URL }/plaid/get_user_bank_info`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ accessToken }`,
        },
        body: JSON.stringify({ user_id: userId }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user bank accounts');
    }

    const data = await response.json();
    return data.accounts.filter((account) => account.type == 'depository'); // Exclude loans
};

export async function fetchAccountDetails(accessToken, userId, accountId) {
    const response = await fetch(`${ API_URL }/plaid/get_account_details`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ accessToken }`,
        },
        body: JSON.stringify({ user_id: userId, account_id: accountId }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch account details');
    }

    return await response.json();
}
