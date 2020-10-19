import { GET_CATEGORYBOOK, GET_CATEGORYBOOK_SUCCESS, GET_CATEGORYBOOK_FAILURE } from '../types';
import { onToken } from '../auth';
import axios from 'axios';

export function fetchCategoryBooks(query) {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(getCategoryBooks());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/books?category_id=${query}`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(getCategoryBooksSuccess(response.data.data));
            }).catch(err => dispatch(getCategoryBooksFailure(err.response)));
        })
    }
}

function getCategoryBooks() {
    return {
        type: GET_CATEGORYBOOK
    }
}

function getCategoryBooksSuccess(categoriesbooks) {
    return {
        type: GET_CATEGORYBOOK_SUCCESS,
        payload: { categoriesbooks }
    }
}

function getCategoryBooksFailure(error) {
    return {
        type: GET_CATEGORYBOOK_FAILURE,
        payload: { error }
    }
}