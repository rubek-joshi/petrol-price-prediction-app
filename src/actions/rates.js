export const GET_RATES = 'GET_RATES';

export const getRates = (rates) => {
    return {
        type: GET_RATES,
        payload: rates
    }
}