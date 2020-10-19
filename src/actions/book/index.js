import {
    GET_BOOK,
    GET_BOOK_SUCCESS,
    GET_BOOK_FAILURE,
    GET_SIMILARBOOK,
    GET_SIMILARBOOK_SUCCESS,
    GET_SIMILARBOOK_FAILURE
} from '../types';
import { onToken } from '../auth';
import axios from 'axios';

//DETAIL BOOK
export function fetchBook(id) {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(getBook());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/book/detail/${id}`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(getBookSuccess(response.data.data));
            }).catch(err => dispatch(getBookFailure(err.response)));
        })
    }
}

function getBook() {
    return {
        type: GET_BOOK
    }
}

function getBookSuccess(book) {
    return {
        type: GET_BOOK_SUCCESS,
        payload: { book }
    }
}

function getBookFailure(error) {
    return {
        type: GET_BOOK_FAILURE,
        payload: { error }
    }
}

//SIMILAR BOOK ON DETAIL
export function fetchSimilarBook(id) {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(getSimilarBook());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/book/similar/${id}`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(getSimilarBookSuccess(response.data.data));
            }).catch(err => dispatch(getSimilarBookFailure(err.response)));
        })
    }
}

function getSimilarBook() {
    return {
        type: GET_SIMILARBOOK
    }
}

function getSimilarBookSuccess(similarbook) {
    return {
        type: GET_SIMILARBOOK_SUCCESS,
        payload: { similarbook }
    }
}

function getSimilarBookFailure(error) {
    return {
        type: GET_SIMILARBOOK_FAILURE,
        payload: { error }
    }
}