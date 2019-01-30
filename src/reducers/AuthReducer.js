import {
    USER_LOGIN_SUCCESS, 
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING, 
    LOGOUT,
    COOKIE_CHECKED
} from '../actions/types';

// const INITIAL_STATE = '';
const INITIAL_STATE = { username: '' , error: '', loading: false, cookie: false, password: '' };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS :
            return {...INITIAL_STATE, username: action.payload.username, email: action.payload.email, cookie: true, password: action.payload.password};
            
        case AUTH_SYSTEM_ERROR :
            return {...INITIAL_STATE, error: action.payload, cookie: true};

        case AUTH_LOADING :
            return { ...state, loading: true};

        case LOGOUT :
            return {...INITIAL_STATE, cookie: true};

        case COOKIE_CHECKED :
            return { ...state, cookie: true }

        default :
            return state;


    }
}