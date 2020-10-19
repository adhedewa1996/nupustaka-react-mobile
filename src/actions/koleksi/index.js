import {
    GET_KOLEKSI,
    GET_KOLEKSI_SUCCESS,
    GET_KOLEKSI_FAILURE
} from '../types';
import { onToken } from '../auth';
import axios from 'axios';

//POST BOOKMARK BOOK
export function fetchKoleksiBook() {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(getKoleksiBook());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/koleksi/book`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(getKoleksiBookSuccess(response.data.data));
            }).catch(err => dispatch(getKoleksiBookFailure(err.response)));
        })
    }
}

function getKoleksiBook() {
    return {
        type: GET_KOLEKSI
    }
}

function getKoleksiBookSuccess(koleksibook) {
    return {
        type: GET_KOLEKSI_SUCCESS,
        payload: { koleksibook }
    }
}

function getKoleksiBookFailure(error) {
    return {
        type: GET_KOLEKSI_FAILURE,
        payload: { error }
    }
}