import axios from 'axios';

export const fetchTransactionSummary = async (token, userId) => {
    try {
        const response = await axios.post(
            'http://127.0.0.1:5000/plaid/transactions/summary',
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
            'http://127.0.0.1:5000/plaid/transactions/monthly-summary',
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
