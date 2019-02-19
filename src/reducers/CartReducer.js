import {
    CART_LOAD
} from '../actions/types';

const INITIAL_STATE = { total_item: 0 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        
        case CART_LOAD :
            return {total_item: action.payload};

        default :
            return state;
    }
}