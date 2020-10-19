import {
    POST_SEARCH,
    POST_SEARCH_FAILURE,
    POST_SEARCH_SUCCESS,
    POST_SEARCHTEXT,
    POST_SEARCHTEXT_FAILURE,
    POST_SEARCHTEXT_SUCCESS,
} from '../types';
import { onToken } from '../auth';
import axios from 'axios';

//POST SEARCH BOOK
export function fetchSearchBooks(query) {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(getSearchBooks());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/books?title=${query}`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(getSearchBooksSuccess(response.data.data));
            }).catch(err => dispatch(getSearchBooksFailure(err.response)));
        })
    }
}

function getSearchBooks() {
    return {
        type: POST_SEARCH
    }
}

function getSearchBooksSuccess(searchbooks) {
    return {
        type: POST_SEARCH_SUCCESS,
        payload: { searchbooks }
    }
}

function getSearchBooksFailure(error) {
    return {
        type: POST_SEARCH_FAILURE,
        payload: { error }
    }
}


//POST SEARCH TEXT
export function fetchSearchText(query, id) {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(getSearchText());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/text?query=${query}&book=${id}`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(getSearchTextSuccess(response.data.data));
            }).catch(err => dispatch(getSearchTextFailure(err.response)));
        })
    }
}

function getSearchText() {
    return {
        type: POST_SEARCHTEXT
    }
}

function getSearchTextSuccess(searchtext) {
    return {
        type: POST_SEARCHTEXT_SUCCESS,
        payload: { searchtext }
    }
}

function getSearchTextFailure(error) {
    return {
        type: POST_SEARCHTEXT_FAILURE,
        payload: { error }
    }
}