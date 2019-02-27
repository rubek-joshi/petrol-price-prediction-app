const initialState = {
    isLoggingIn: false,
    isAuthenticated: false,
    token: '',
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}