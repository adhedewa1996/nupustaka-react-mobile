import { POST_VOUCHER, POST_VOUCHER_SUCCESS, POST_BELI_FAILURE, POST_VOUCHER_FAILURE } from '../types';
import { onToken } from '../auth';
import axios from 'axios';

export function postRedeemVoucher(id) {
    return dispatch => {
        onToken().then(res => {
            const AuthStr = 'Bearer ' + res;
            dispatch(postRedeem());
            axios.get(`http://powerful-headland-43561.herokuapp.com/api/auth/voucher/redeem/${id}`, {
                headers: {
                    Authorization: AuthStr
                }
            }).then(response => {
                dispatch(postRedeemSuccess(response.data.data));
            }).catch(err => dispatch(postRedeemFailure(err.data)));
        })
    }
}

function postRedeem() {
    return {
        type: POST_VOUCHER
    }
}

function postRedeemSuccess(voucher) {
    return {
        type: POST_VOUCHER_SUCCESS,
        payload: { voucher }
    }
}

function postRedeemFailure(error) {
    return {
        type: POST_VOUCHER_FAILURE,
        payload: { error }
    }
}