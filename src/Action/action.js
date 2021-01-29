import { SAVE_LOCAL, API_URL, SAVE_GLOBAL } from '../Constants/constant'

import { toast } from "react-toastify";

export function fetchLocal(payload) {
    return function (dispatch) {
        const base = payload
        return fetch(API_URL+base).then(response => response.json())
            .then(resp => {
                dispatch({
                    type: SAVE_LOCAL,
                    payload: resp
                })
            }
            ).catch(error => toast.error(error.message));
    }
}

export function fetchGlobal(payload) {
    return function (dispatch) {
        const base = payload
        return fetch(API_URL+base).then(response => response.json())
            .then(resp => {
                dispatch({
                    type: SAVE_GLOBAL,
                    payload: resp
                })
            }
            ).catch(error => toast.error(error.message));
    }
}
