import {
    SELECT_HISTORY
} from '../actions/types';

// const INITIAL_STATE = '';
const INITIAL_STATE = {id: 0};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        
        case SELECT_HISTORY :
            return action.payload;

        default :
            return state;
    }
}