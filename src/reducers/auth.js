import {SAVE_TOKEN, LOG_OUT, SAVE_USER} from '../actions'

const initialState = {
    isAuthenticated: false,
    token: '',
    userDetails: {
        full_name: 'Guest'
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case SAVE_TOKEN:
            return {
                ...state,
                isAuthenticated: true,
                token: 'Bearer ' + action.payload
            };
        case SAVE_USER:
            return {
                ...state,
                userDetails : {
                    full_name: action.payload
                }
            }
        case LOG_OUT:
            return {
                ...state,
                isAuthenticated: false,
                token: '',
                userDetails: {
                    full_name: 'Guest'
                }
            }
        default:
            return state;
    }
}