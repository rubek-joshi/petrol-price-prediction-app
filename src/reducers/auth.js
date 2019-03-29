const initialState = {
    isLoggingIn: false,
    isAuthenticated: false,
    token: '',
    userDetails: {
        full_name: 'Guest'
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}