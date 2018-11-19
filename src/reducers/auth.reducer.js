let token = localStorage.getItem('token');
let user = localStorage.getItem('user');


const initialState = user ? { loggedIn: true, user, token } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                loggingIn: true,
                user: action.user,
                token: action.token
            };

        case 'LOGOUT_SUCCESS':
            return {
                loggingIn: false,
                user: null,
            };

        default:
            return state
    }
}