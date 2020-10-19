import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from '../types';
import { onToken } from '../auth';
import axios from 'axios';

export function fetchUser() {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(getUser());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/user`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(getUserSuccess(response.data.data));
            }).catch(err => dispatch(getUserFailure(err.response)));
        })
    }
}

function getUser() {
    return {
        type: LOGIN_USER
    }
}

function getUserSuccess(user) {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: { user }
    }
}

function getUserFailure(error) {
    return {
        type: LOGIN_USER_FAIL,
        payload: { error }
    }
}