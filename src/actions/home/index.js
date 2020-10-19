import { GET_DISPLAYBOOK, GET_DISPLAYBOOK_SUCCESS, GET_DISPLAYBOOK_FAILURE } from '../types';
import { onToken } from '../auth';
import axios from 'axios';

export function fetchDisplayBooks() {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(getDisplayBooks());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/display`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(getDisplayBooksSuccess(response.data.data));
            }).catch(err => dispatch(getDisplayBooksFailure(err.response)));
        })
    }
}

function getDisplayBooks() {
    return {
        type: GET_DISPLAYBOOK
    }
}

function getDisplayBooksSuccess(displaybooks) {
    return {
        type: GET_DISPLAYBOOK_SUCCESS,
        payload: { displaybooks }
    }
}

function getDisplayBooksFailure(error) {
    return {
        type: GET_DISPLAYBOOK_FAILURE,
        payload: { error }
    }
}