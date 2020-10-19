import {
    POST_BELI,
    POST_BELI_SUCCESS,
    POST_BELI_FAILURE,
    CEK_BELI,
    CEK_BELI_SUCCESS,
    CEK_BELI_FAILURE,
    POST_SEWA,
    POST_SEWA_SUCCESS,
    POST_SEWA_FAILURE,
    CEK_SEWA,
    CEK_SEWA_SUCCESS,
    CEK_SEWA_FAILURE,
    POST_PINJAM,
    POST_PINJAM_SUCCESS,
    POST_PINJAM_FAILURE,
    CEK_PINJAM,
    CEK_PINJAM_SUCCESS,
    CEK_PINJAM_FAILURE
} from '../types';
import { onToken } from '../auth';
import axios from 'axios';

//POST PEMBELIAN BUKU
export function postBeliBook(id) {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(postBeli());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/transaction/beli/${id}`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(postBeliSuccess(response.data.data));
            }).catch(err => dispatch(postBeliFailure(err.data)));
        })
    }
}

function postBeli() {
    return {
        type: POST_BELI
    }
}

function postBeliSuccess(beli) {
    return {
        type: POST_BELI_SUCCESS,
        payload: { beli }
    }
}

function postBeliFailure(error) {
    return {
        type: POST_BELI_FAILURE,
        payload: { error }
    }
}

//CEK PEMBELIAN BUKU
export function fetchCekBeli(id) {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(getCekBeli());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/cek/transaction/beli/${id}`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(getCekBeliSuccess(response.data.data));
            }).catch(err => dispatch(getCekBeliFailure(err.response)));
        })
    }
}

function getCekBeli() {
    return {
        type: CEK_BELI
    }
}

function getCekBeliSuccess(cekbeli) {
    return {
        type: CEK_BELI_SUCCESS,
        payload: { cekbeli }
    }
}

function getCekBeliFailure(error) {
    return {
        type: CEK_BELI_FAILURE,
        payload: { error }
    }
}

//POST PENYEWAAN BUKU
export function postSewaBook(id) {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(postSewa());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/transaction/sewa/${id}`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(postSewaSuccess(response.data.data));
            }).catch(err => dispatch(postSewaFailure(err.data)));
        })
    }
}

function postSewa() {
    return {
        type: POST_SEWA
    }
}

function postSewaSuccess(sewa) {
    return {
        type: POST_SEWA_SUCCESS,
        payload: { sewa }
    }
}

function postSewaFailure(error) {
    return {
        type: POST_SEWA_FAILURE,
        payload: { error }
    }
}

//CEK PENYEWAAN BUKU
export function fetchCekSewa(id) {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(getCekSewa());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/cek/transaction/sewa/${id}`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(getCekSewaSuccess(response.data.data));
            }).catch(err => dispatch(getCekSewaFailure(err.data)));
        })
    }
}

function getCekSewa() {
    return {
        type: CEK_SEWA
    }
}

function getCekSewaSuccess(ceksewa) {
    return {
        type: CEK_SEWA_SUCCESS,
        payload: { ceksewa }
    }
}

function getCekSewaFailure(error) {
    return {
        type: CEK_SEWA_FAILURE,
        payload: { error }
    }
}


//POST PEMINJAMAN BUKU
export function postPinjamBook(id) {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(postPinjam());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/transaction/pinjam/${id}`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(postPinjamSuccess(response.data.data));
            }).catch(err => dispatch(postPinjamFailure(err.data)));
        })
    }
}

function postPinjam() {
    return {
        type: POST_PINJAM
    }
}

function postPinjamSuccess(pinjam) {
    return {
        type: POST_PINJAM_SUCCESS,
        payload: { pinjam }
    }
}

function postPinjamFailure(error) {
    return {
        type: POST_PINJAM_FAILURE,
        payload: { error }
    }
}


//CEK PEMINJAMAN BUKU
export function fetchCekPinjam(id) {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(getCekPinjam());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/cek/transaction/pinjam/${id}`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(getCekPinjamSuccess(response.data.data));
            }).catch(err => dispatch(getCekPinjamFailure(err.data)));
        })
    }
}

function getCekPinjam() {
    return {
        type: CEK_PINJAM
    }
}

function getCekPinjamSuccess(cekpinjam) {
    return {
        type: CEK_PINJAM_SUCCESS,
        payload: { cekpinjam }
    }
}

function getCekPinjamFailure(error) {
    return {
        type: CEK_PINJAM_FAILURE,
        payload: { error }
    }
}