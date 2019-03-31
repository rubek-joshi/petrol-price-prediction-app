export const GET_RATES = 'GET_RATES';
export const GET_HISTORY = 'GET_HISTORY';

export const getRates = (rates) => {
    return {
        type: GET_RATES,
        payload: rates
    }
}

export const getHistory = (history) => {
    return {
        type: GET_HISTORY,
        payload: history
    }
}