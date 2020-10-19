import {
    POST_BOOKMARK,
    POST_BOOKMARK_SUCCESS,
    POST_BOOKMARK_FAILURE,
    CEK_BOOKMARK,
    CEK_BOOKMARK_SUCCESS,
    CEK_BOOKMARK_FAILURE,
    CEK_BELI_FAILURE
} from '../types';
import { onToken } from '../auth';
import axios from 'axios';

//POST BOOKMARK BOOK
export function fetchBookmarkBook(id) {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(postBookmarkBook());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/bookmark/book/${id}`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(postBookmarkBookSuccess(response.data.data));
            }).catch(err => dispatch(postBookmarkBookFailure(err.response)));
        })
    }
}

function postBookmarkBook() {
    return {
        type: POST_BOOKMARK
    }
}

function postBookmarkBookSuccess(bookmarkbook) {
    return {
        type: POST_BOOKMARK_SUCCESS,
        payload: { bookmarkbook }
    }
}

function postBookmarkBookFailure(error) {
    return {
        type: POST_BOOKMARK_FAILURE,
        payload: { error }
    }
}

//CEK BOOKMARK BOOK
export function fetchCekBookmarkBook(id) {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(getCekBookmarkBook());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/cek/bookmark/book/${id}`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(getCekBookmarkBookSuccess(response.data.data));
            }).catch(err => dispatch(getCekBookmarkBookFailure(err.response)));
        })
    }
}

function getCekBookmarkBook() {
    return {
        type: CEK_BOOKMARK
    }
}

function getCekBookmarkBookSuccess(cekbookmarkbook) {
    return {
        type: CEK_BOOKMARK_SUCCESS,
        payload: { cekbookmarkbook }
    }
}

function getCekBookmarkBookFailure(error) {
    return {
        type: CEK_BELI_FAILURE,
        payload: { error }
    }
}