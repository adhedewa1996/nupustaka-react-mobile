import { GET_CATEGORY, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE } from '../types';
import { onToken } from '../auth';
import axios from 'axios';

export function fetchCategory() {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(getCategory());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/categories`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(getCategorySuccess(response.data.data));
            }).catch(err => dispatch(getCategoryFailure(err.response)));
        })
    }
}

function getCategory() {
    return {
        type: GET_CATEGORY
    }
}

function getCategorySuccess(categories) {
    return {
        type: GET_CATEGORY_SUCCESS,
        payload: { categories }
    }
}

function getCategoryFailure(error) {
    return {
        type: GET_CATEGORY_FAILURE,
        payload: { error }
    }
}