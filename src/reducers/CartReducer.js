import {
    CART_LOAD
} from '../actions/types';

const INITIAL_STATE = { total_item: 0, total_bayar: 0, total_berat: 0, total_buku: 0 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        
        case CART_LOAD :
            return action.payload;

        default :
            return state;
    }
}