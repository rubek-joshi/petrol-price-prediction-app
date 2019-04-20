export const SAVE_TOKEN = 'SAVE_TOKEN';
export const LOG_OUT = 'LOG_OUT';

export const saveToken = (token) => {
    return {
        type: SAVE_TOKEN,
        payload: token
    }
}

export const logOut = () => {
    return {
        type: LOG_OUT,
    }
}