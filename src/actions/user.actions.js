import { userService } from '../services/';
import { history } from '../helpers';
import { userConstants } from '../constants';
import { alertActions } from './';


export const userActions = {
    login,
    logout
};



function login(username, password){
    return dispatch => {

        dispatch(request({ username }));

        let apiEndpoint = 'login';
        let payload = {
            username: username,
            password: password
        }

        userService.post(apiEndpoint, payload)
            .then((response)=>{

                if (response && response.data && response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', response.data.user);
                    localStorage.setItem('notification', '');
                    dispatch(setUserDetails(response.data));
                    dispatch(success(response.data.user));
                    history.push('/home');
                }

                else
                {
                    dispatch(failure('error'));
                    dispatch(alertActions.error('username or password is incorrect'));
                }
            })

    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout(){
    return dispatch => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch(logoutUser());
        history.push('/');
    }
}

export function setUserDetails(data){
    return{
        type: "LOGIN_SUCCESS",
        user: data.user,
        token: data.token
    }
}

export function logoutUser(){
    return{
        type: "LOGOUT_SUCCESS",
        user: null,
        token: ''
    }
}