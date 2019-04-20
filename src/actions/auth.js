export const SAVE_TOKEN = 'SAVE_TOKEN';
export const LOG_OUT = 'LOG_OUT';
export const SAVE_USER = 'SAVE_USER';

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

export const saveUser = (user) => {
    return {
        type: SAVE_USER,
        payload: user
    }
}